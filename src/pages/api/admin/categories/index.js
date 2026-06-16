import mongoose from 'mongoose';
import Category from '@/models/Category';

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb+srv://wetaworkinc_db_user:edL6Ph6E5n4ppiJE@cluster0.xp05ath.mongodb.net/wetawork?retryWrites=true&w=majority');
  }

  if (req.method === 'GET') {
    try {
      const categories = await Category.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
