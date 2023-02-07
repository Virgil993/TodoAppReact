import mongoose from "mongoose";
import TaskModel from "./models/tasks";
import { MONGO_DB_URI, reqAuth } from "./helper";

export class Task {
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

  async getAll(token) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }

    const elements = await TaskModel.find({});
    return { success: true, elements: elements };
  }

  async getById(token, id) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    const element = await TaskModel.findById(id);
    if (!element) {
      return { success: false, msg: "Element not found by given id" };
    }
    return { success: true, elements: element };
  }

  async create(token, title, description) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (title == null || description == null) {
      return { success: false, msg: "required fields are empty" };
    }
    const newObj = await TaskModel.create({
      title: title,
      description: description,
      status: false,
    });
    return { success: true, elemId: newObj._id };
  }

  async update(token, id, title, description, status) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (!id) {
      return { success: false, msg: "Required fields are empty" };
    }
    const dataToSet = {};

    if (title != null) {
      dataToSet.title = title;
    }

    if (description != null) {
      dataToSet.description = description;
    }

    if (status != null) {
      dataToSet.status = status;
    }

    const newValues = { $set: dataToSet };
    const item = await TaskModel.updateOne({ _id: id }, newValues);
    if (!item) {
      return { success: false, msg: "Element does not exists" };
    }
    return { success: true };
  }

  async delete(token, id) {
    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return { success: false, msg: authObject.msg };
    }
    if (!id) {
      return { success: false, msg: "Required fields are empty" };
    }
    await TaskModel.deleteMany({ _id: id });
    return { success: true };
  }
}
