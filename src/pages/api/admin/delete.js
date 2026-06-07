import dbConnect from '@/lib/mongodb';
import Professional from '@/models/Professional';
import Contact from '@/models/Contact';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ message: 'Method not allowed' });

  const { type, id } = req.query;
  await dbConnect();

  try {
    if (type === 'professional') {
      await Professional.findByIdAndDelete(id);
    } else if (type === 'contact') {
      await Contact.findByIdAndDelete(id);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid type' });
    }

    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}
