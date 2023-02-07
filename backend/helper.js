import activeSession from "./models/activeSession";

async function reqAuth(token) {
  const session = await activeSession.find({ token: token });
  if (session.length === 1) {
    return {
      success: true,
      msg: "token authorized",
      userId: session[0].userId,
    };
  } else {
    return {
      success: false,
      msg: "User is not logged on or session expired",
      userId: undefined,
    };
  }
}

export const MONGO_DB_URI =
  "mongodb+srv://Virgil993:SjljSZMJmkEkqKB2@cluster0.znunadm.mongodb.net/toDo";

export const secret = "secretkey";

export default reqAuth;
