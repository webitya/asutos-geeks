const fs = require('fs');

const data = fs.readFileSync('updatedcategories.txt', 'utf8');
const lines = data.split('\n');

const categories = {};
let currentCategory = null;
let currentSubcategory = null;

const colors = [
  "from-purple-500 to-indigo-600",
  "from-violet-600 to-fuchsia-600",
  "from-fuchsia-500 to-pink-600",
  "from-indigo-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-teal-500 to-emerald-600",
  "from-amber-500 to-orange-600",
  "from-red-500 to-rose-600",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-purple-600",
  "from-emerald-500 to-green-600",
  "from-sky-500 to-blue-600"
];

const icons = [
  "bank", "scale", "video", "palette", "building", "briefcase", "laptop",
  "music", "truck", "users", "lightbulb", "flask", "graduation-cap",
  "pen-tool", "heart"
];

let catIdx = 0;

for (let line of lines) {
  line = line.trim();
  if (line.startsWith('## ') && !line.match(/## [A-Z]\./)) {
    // Top-level category
    const catMatch = line.match(/##\s+\d+\.\s+(.+)/);
    if (catMatch) {
      let catName = catMatch[1].trim();
      
      // format title case properly, e.g. "FINANCE & ACCOUNTING" -> "Finance & Accounting"
      catName = catName.split(' ').map(word => {
        if (word.toUpperCase() === 'HR') return 'HR';
        if (word.toUpperCase() === 'IT') return 'IT';
        if (word === '&') return '&';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
      
      currentCategory = catName;
      categories[currentCategory] = {
        label: currentCategory,
        id: currentCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        color: colors[catIdx % colors.length],
        icon: icons[catIdx % icons.length],
        subcategories: {}
      };
      catIdx++;
      currentSubcategory = null;
    }
  } else if (line.startsWith('### ') && currentCategory) {
    const subMatch = line.match(/###\s+\d+\.\d+\s+(.+)/);
    if (subMatch) {
      currentSubcategory = subMatch[1].trim();
      categories[currentCategory].subcategories[currentSubcategory] = [];
    }
  } else if (line.startsWith('- ') && currentCategory && currentSubcategory) {
    const item = line.substring(2).trim();
    // remove markdown bold or italic if any, though the items don't have much of it.
    categories[currentCategory].subcategories[currentSubcategory].push(item);
  } else if (line.startsWith('# SHEET 2')) {
    break; // We only care about Sheet 1 for categories.js
  }
}

const output = `export const CATEGORIES_DATA = ${JSON.stringify(categories, null, 2)};

export const ALL_SERVICES = Object.values(CATEGORIES_DATA).reduce((acc, cat) => {
  Object.values(cat.subcategories).forEach(services => {
    services.forEach(service => {
      if (!acc.includes(service)) {
        acc.push(service);
      }
    });
  });
  return acc;
}, []);
`;

fs.writeFileSync('src/lib/categories.js', output, 'utf8');
console.log('Categories successfully generated and written to src/lib/categories.js');
