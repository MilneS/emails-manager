import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("email-manager");
    switch (req.method) {
      case "GET":
        const user = await db
          .collection("users")
          .findOne({ email: req.headers.email });
        res.json(user);
        break;
      case "POST":
        const userData = JSON.parse(req.body);
        const createUser = await db.collection("users").insertOne(userData);
        res.json(createUser);
        break;
      case "PUT":
        const updatedUserData = JSON.parse(req.body);
        const updateUser = await db
          .collection("users")
          .updateOne(
            { email: updatedUserData.email },
            { $set: { token: updatedUserData.token } }
          );
        res.json(updateUser);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
