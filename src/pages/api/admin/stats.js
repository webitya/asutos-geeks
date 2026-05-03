import dbConnect from '../../../lib/mongodb';
import Professional from '../../../models/Professional';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const prosCount = await Professional.countDocuments();
    const contactsCount = await Contact.countDocuments();
    
    // Get recent data
    const recentPros = await Professional.find().sort({ createdAt: -1 }).limit(5);
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({ 
      success: true, 
      stats: {
        pros: prosCount,
        contacts: contactsCount
      },
      recent: {
        pros: recentPros,
        contacts: recentContacts
      }
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}
