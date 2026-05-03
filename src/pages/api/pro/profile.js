import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

import dbConnect from "../../../lib/mongodb";
import Professional from "../../../models/Professional";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const profile = await Professional.findOne({ userId: session.user.id });
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const profile = await Professional.findOneAndUpdate(
          { userId: session.user.id },
          { ...req.body, userId: session.user.id },
          { upsert: true, new: true }
        );
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
