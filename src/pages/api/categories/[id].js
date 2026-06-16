import mongoose from 'mongoose';
import Category from '@/models/Category';

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb+srv://wetaworkinc_db_user:edL6Ph6E5n4ppiJE@cluster0.xp05ath.mongodb.net/wetawork?retryWrites=true&w=majority');
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Find by the categoryId string (e.g. "finance-accounting") not the Mongo _id
      const category = await Category.findOne({ categoryId: id });
      if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
