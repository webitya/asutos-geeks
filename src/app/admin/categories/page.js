'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const seedCategories = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/admin/seed-categories?force=true');
      const data = await res.json();
      if (data.success) {
        alert('Categories seeded successfully!');
        fetchCategories();
      } else {
        alert('Failed to seed categories: ' + data.error);
      }
    } catch (err) {
      alert('Error seeding categories.');
    } finally {
      setSeeding(false);
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-soft border border-gray-100">
        <div>
          <h2 className="text-2xl font-black text-foreground">Categories</h2>
          <p className="text-gray-500 text-sm mt-1">Manage platform categories and their details</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-bold text-gray-500 text-sm uppercase">Category</th>
              <th className="p-4 font-bold text-gray-500 text-sm uppercase">Subcategories</th>
              <th className="p-4 font-bold text-gray-500 text-sm uppercase">Image Setup</th>
              <th className="p-4 font-bold text-gray-500 text-sm uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No categories found. Click "Seed Initial Data" to load defaults.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${cat.color} flex items-center justify-center text-white`}>
                        {cat.icon === 'bank' && '🏦'}
                        {cat.icon === 'scale' && '⚖️'}
                        {cat.icon === 'video' && '🎥'}
                        {cat.icon === 'palette' && '🎨'}
                        {cat.icon === 'building' && '🏗️'}
                        {cat.icon === 'briefcase' && '💼'}
                        {cat.icon === 'laptop' && '💻'}
                        {cat.icon === 'music' && '🎵'}
                        {cat.icon === 'truck' && '🚚'}
                        {cat.icon === 'users' && '👥'}
                        {cat.icon === 'lightbulb' && '💡'}
                        {cat.icon === 'flask' && '🧪'}
                        {cat.icon === 'graduation-cap' && '🎓'}
                        {cat.icon === 'pen-tool' && '✍️'}
                        {cat.icon === 'heart' && '❤️'}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{cat.label}</p>
                        <p className="text-xs text-gray-400 font-mono">{cat.categoryId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-600">
                    {cat.subcategories?.length || 0} Topics
                  </td>
                  <td className="p-4">
                    {cat.image ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">Uploaded</span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">Missing</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link 
                      href={`/admin/categories/edit/${cat._id}`}
                      className="inline-block px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg font-bold text-sm transition-colors"
                    >
                      Edit Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
