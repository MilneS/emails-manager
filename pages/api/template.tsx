import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("email-manager");
    switch (req.method) {
      case "GET":
        const template = await db
          .collection("templates")
          .findOne({ id: req.headers.id });
        res.json(template);
        break;
      case "POST":
        const templateData= JSON.parse(req.body)
        const createTemplate = await db
          .collection("templates")
          .insertOne(templateData);
        res.json(createTemplate);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
