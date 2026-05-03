'use client';
import { useState, useEffect } from 'react';

export default function ManageProfessionals() {
  const [pros, setPros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPros();
  }, []);

  const fetchPros = async () => {
    const res = await fetch('/api/professionals');
    const data = await res.json();
    if (data.success) setPros(data.data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this professional?')) return;
    
    try {
      const res = await fetch(`/api/admin/delete?type=professional&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPros(pros.filter(p => p._id !== id));
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manage Professionals</h1>
          <p className="text-gray-500 text-sm mt-1">Review and manage service providers on the platform.</p>
        </div>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search pros..." 
            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-black">
              <th className="px-8 py-4">Professional</th>
              <th className="px-8 py-4">Skill</th>
              <th className="px-8 py-4">Location</th>
              <th className="px-8 py-4">Rating</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : pros.length > 0 ? (
              pros.map((pro) => (
                <tr key={pro._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={pro.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-foreground">{pro.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-blue-50 text-primary text-[10px] font-black uppercase px-2 py-1 rounded">
                      {pro.skill}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-gray-500 text-sm">{pro.location}</td>
                  <td className="px-8 py-5 font-bold text-sm">⭐ {pro.rating.toFixed(1)}</td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDelete(pro._id)}
                      className="text-red-400 hover:text-red-600 font-bold text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="p-8 text-center text-gray-400">No professionals found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
