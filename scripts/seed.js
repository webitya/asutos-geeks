const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://wetaworkinc_db_user:edL6Ph6E5n4ppiJE@cluster0.xp05ath.mongodb.net/wetawork?retryWrites=true&w=majority';

const CategorySchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  color: { type: String, default: 'from-gray-500 to-gray-600' },
  icon: { type: String, default: 'briefcase' },
  subcategories: [{ name: String, services: [String] }],
  image: { type: String, default: '' },
  details: { type: String, default: '' }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const CATEGORIES_DATA = {
  "Finance & Accounting": {
    "label": "Finance & Accounting",
    "id": "finance-accounting",
    "color": "from-purple-500 to-indigo-600",
    "icon": "bank",
    "subcategories": {
      "Corporate Bookkeeping & Cloud Accounting": [
        "\"Catch-up & Clean-Up\" Bookkeeping",
        "Accounts Payable & Receivable (AP/AR)",
        "Payroll Administration"
      ],
      "Finance Modeling & Valuation": [
        "3-Statement Finance Modeling",
        "Startup & Pitch Deck Financials",
        "Project Finance & Underwriting"
      ]
    }
  },
  "Legal": {
    "label": "Legal",
    "id": "legal",
    "color": "from-violet-600 to-fuchsia-600",
    "icon": "scale",
    "subcategories": {
      "Corporate & Contract Law": [
        "Commercial Contract Drafting"
      ]
    }
  }
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    // We will just do a quick parse of the original file to get all data instead of copying it all here
    // Wait, since this is node, we can't easily import ES modules if it's not setup. 
    // I'll read the categories.js file and parse it.
  } catch (err) {
    console.error(err);
  }
}
seed();
