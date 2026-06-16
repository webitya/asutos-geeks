'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditCategory({ params }) {
  const { id } = params;
  const router = useRouter();
  
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ details: '', image: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategory(data.data);
          setFormData({
            details: data.data.details || '',
            image: data.data.image || ''
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: reader.result })
        });
        const data = await response.json();
        if (data.success) {
          setFormData(prev => ({ ...prev, image: data.url }));
        } else {
          alert('Upload failed: ' + data.message);
        }
      } catch (err) {
        alert('Upload error');
      } finally {
        setUploading(false);
      }
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        alert('Category updated successfully!');
        router.push('/admin/categories');
      } else {
        alert('Update failed: ' + data.error);
      }
    } catch (err) {
      alert('Error updating category');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading category details...</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/categories" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors">
          ←
        </Link>
        <div>
          <h2 className="text-2xl font-black text-foreground">Edit Category: {category.label}</h2>
          <p className="text-gray-500 text-sm mt-1">Update banner images and details page content.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
        <form onSubmit={handleSave} className="p-8 space-y-8">
          
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category Banner Image</label>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <span className="text-3xl">🖼️</span>
                    <span className="font-bold text-primary hover:underline">
                      {uploading ? 'Uploading...' : 'Click to Upload Image'}
                    </span>
                    <span className="text-xs text-gray-400">High quality JPG, PNG (Max 5MB)</span>
                  </label>
                </div>
              </div>
              {formData.image && (
                <div className="w-64 h-32 rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Details Page Content (HTML / Text)</label>
            <p className="text-xs text-gray-400 mb-3">This content will be shown on the public category details page. You can use standard HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc.</p>
            <textarea 
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-sm min-h-[300px]"
              placeholder="<h2>Why choose this category?</h2><p>Here are some great details...</p>"
            />
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              href="/admin/categories"
              className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
