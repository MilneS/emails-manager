import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("email-manager");
    const templates = await db.collection("templates").find({authorId:req.headers.email}).toArray();
    res.json(templates);
  } catch (e) {
    console.error(e);
  }
};
