import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import UserModel from "./models/users";
import ActiveSession from "./models/activeSession";
import { MONGO_DB_URI, secret, reqAuth } from "./helper";
export class User {
  constructor() {
    this.#connect();
  }

  // connect mongoose to mongodb
  #connect() {
    mongoose.set("strictQuery", false);
    try {
      mongoose.connect(MONGO_DB_URI);
    } catch (err) {
      console.log(err);
    }
  }

  // create a new user
  async create(name, email, password, gender, phoneNumber) {
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return { success: false, msg: "wrong email format" };
    }
    if (password.length < 8) {
      return { success: false, msg: "password is too short" };
    }
    if (
      phoneNumber &&
      !phoneNumber.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/im)
    ) {
      return { success: false, msg: "wrong phone number format" };
    }
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return { success: false, msg: "Email already exists" };
    }
    const promise = new Promise((resolve, reject) => {
      bcrypt.genSalt(10, async function (err, salt) {
        if (err) {
          reject({ success: false, msg: "Error at genSalt", error: err });
        } else {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              reject({ success: false, msg: "Error at hash", error: err });
            } else {
              var err,
                newUser = await UserModel.create({
                  name: name,
                  email: email,
                  password: hash,
                  gender: gender,
                  phoneNumber: phoneNumber,
                });
              if (err) {
                reject({
                  success: false,
                  msg: "Error at database",
                  error: err,
                });
              } else {
                var userId = newUser._id.toString();
                resolve({
                  success: true,
                  msg: "The user was succesfully registered",
                  userId: userId,
                });
              }
            }
          });
        }
      });
    });
    return promise;
  }

  // login
  async login(email, password) {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return { success: false, msg: "Wrong credentials" };
    }
    const promise = new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, async function (err, res) {
        if (err) {
          reject({ success: false, msg: "Error at compare", error: err });
        } else {
          if (res) {
            const token = Jwt.sign(user.toJSON(), secret, {
              expiresIn: 86400, // 1 saptamana
            });
            await ActiveSession.deleteMany({ userId: user._id });
            await ActiveSession.create({ token: token, userId: user._id });
            user.password = null;
            resolve({ success: true, user: user, token: token });
          } else {
            resolve({ success: false, msg: "incorrect user or password" });
          }
        }
      });
    });
    return promise;
  }

  // get a user by his token
  async getUserByToken(token) {
    const activeSession = await reqAuth(token);
    if (!activeSession.success) {
      return { success: false, msg: activeSession.msg };
    }

    const user = await UserModel.findById(activeSession.userId);

    if (!user) {
      return { success: false, msg: "user not logged in or not found" };
    }
    return { success: true, user: user };
  }

  // logout
  async logout(token) {
    try {
      await ActiveSession.deleteMany({ token: token });
      return { success: true };
    } catch (err) {
      return { success: false, msg: "error at logout", error: err };
    }
  }

  // update User
  async updateUser(token, updatedUser) {
    const sessionStatus = await this.getUserByToken(token);
    if (!sessionStatus.success) {
      return { success: false, msg: sessionStatus.msg };
    }
    const user = sessionStatus.user;
    if (!user) {
      return { success: false, msg: "user not found" };
    }

    const dataToSet = {};
    if (updatedUser.name != null) {
      dataToSet.name = updatedUser.name;
    }

    if (updatedUser.email != null) {
      if (!updatedUser.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        return { success: false, msg: "fields validations error" };
      }
      dataToSet.email = updatedUser.email;
    }

    if (updatedUser.gender != null) {
      dataToSet.gender = updatedUser.gender;
    }

    if (updatedUser.phoneNumber != null) {
      if (
        !updatedUser.phoneNumber.match(
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/im
        )
      ) {
        return { success: false, msg: "fields validations error" };
      }
      dataToSet.phoneNumber = phoneNumber;
    }

    const newValues = { $set: dataToSet };
    try {
      await UserModel.updateOne({ _id: user._id }, newValues);
      return { success: true, msg: "update completed" };
    } catch (err) {
      return { success: false, msg: "error at update", error: err };
    }
  }
}
