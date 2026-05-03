import dbConnect from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    try {
      const contact = await Contact.create(req.body);
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
