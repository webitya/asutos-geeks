import dbConnect from '../../../lib/mongodb';
import Professional from '../../../models/Professional';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const professionals = await Professional.find({});
        res.status(200).json({ success: true, data: professionals });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const professional = await Professional.create(req.body);
        res.status(201).json({ success: true, data: professional });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
