'use client';
import { useState, useEffect } from 'react';

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    // We don't have a GET for all contacts yet, let's assume we create one or just use stats API for now.
    // Actually, I'll create a dedicated API route for this or modify the contact API.
    // For now, I'll fetch from the stats API which returns recent, but I should really have a full list.
    const res = await fetch('/api/admin/stats');
    const data = await res.json();
    if (data.success) setContacts(data.recent.contacts);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const res = await fetch(`/api/admin/delete?type=contact&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setContacts(contacts.filter(c => c._id !== id));
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Inquiries</h1>
          <p className="text-gray-500 text-sm mt-1">Review messages from customers and partners.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-black">
              <th className="px-8 py-4">Sender</th>
              <th className="px-8 py-4">Message</th>
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{contact.name}</span>
                      <span className="text-xs text-gray-400">{contact.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-500 text-sm max-w-md">
                    <p className="line-clamp-2">{contact.message}</p>
                  </td>
                  <td className="px-8 py-5 text-gray-400 text-xs">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-400 hover:text-red-600 font-bold text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="p-8 text-center text-gray-400">No inquiries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
