import mongoose from 'mongoose';
import Category from '@/models/Category';
import { CATEGORIES_DATA } from '@/lib/categories';

export default async function handler(req, res) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect('mongodb+srv://wetaworkinc_db_user:edL6Ph6E5n4ppiJE@cluster0.xp05ath.mongodb.net/wetawork?retryWrites=true&w=majority');
  }
  
  try {
    // Check if we already seeded to avoid duplicates
    const count = await Category.countDocuments();
    if (count > 0 && req.query.force !== 'true') {
      return res.status(200).json({ message: 'Categories already seeded.' });
    }

    if (req.query.force === 'true') {
      await Category.deleteMany({});
    }

    const categoriesArray = Object.values(CATEGORIES_DATA).map(cat => {
      const subcategoriesFormatted = Object.entries(cat.subcategories).map(([subName, services]) => ({
        name: subName,
        services: services
      }));

      return {
        categoryId: cat.id,
        label: cat.label,
        color: cat.color,
        icon: cat.icon,
        subcategories: subcategoriesFormatted,
        image: '',
        details: ''
      };
    });

    await Category.insertMany(categoriesArray);
    res.status(200).json({ success: true, message: 'Seeded successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
