'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState({ stats: { pros: 0, contacts: 0 }, recent: { pros: [], contacts: [] } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.ok ? res.json() : { success: false })
      .then(d => {
        if (d && d.success) setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const cards = [
    { label: 'Total Professionals', value: data.stats.pros, icon: '👨‍🔧', color: 'bg-blue-500', path: '/admin/professionals' },
    { label: 'Contact Submissions', value: data.stats.contacts, icon: '📩', color: 'bg-orange-500', path: '/admin/contacts' },
    { label: 'New This Week', value: data.recent.pros.length + data.recent.contacts.length, icon: '📈', color: 'bg-indigo-500', path: '#' },
    { label: 'Avg Rating', value: '4.8', icon: '⭐', color: 'bg-yellow-500', path: '#' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <Link key={i} href={card.path} className="bg-white p-6 rounded-3xl shadow-soft border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-gray-200`}>
                {card.icon}
              </div>
              <span className="text-gray-400 text-xs font-bold uppercase">View All</span>
            </div>
            <h3 className="text-3xl font-black text-foreground">{card.value}</h3>
            <p className="text-gray-500 font-bold text-sm mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Professionals */}
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-lg">Recent Professionals</h3>
            <Link href="/admin/professionals" className="text-primary text-sm font-bold hover:underline">View All</Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.recent.pros.map((pro) => (
                <div key={pro._id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                  <img src={pro.image} alt={pro.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{pro.name}</h4>
                    <p className="text-xs text-gray-500">{pro.skill} • {pro.location}</p>
                  </div>
                  <span className="bg-green-100 text-green-600 text-[10px] font-black uppercase px-2 py-1 rounded">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-lg">New Inquiries</h3>
            <Link href="/admin/contacts" className="text-primary text-sm font-bold hover:underline">View All</Link>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {data.recent.contacts.map((contact) => (
                <div key={contact._id} className="p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm">{contact.name}</h4>
                    <span className="text-[10px] text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{contact.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
