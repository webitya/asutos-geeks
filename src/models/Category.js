import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'from-gray-500 to-gray-600',
  },
  icon: {
    type: String,
    default: 'briefcase',
  },
  subcategories: [{
    name: String,
    services: [String]
  }],
  image: {
    type: String,
    default: '',
  },
  details: {
    type: String,
    default: '',
  }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
