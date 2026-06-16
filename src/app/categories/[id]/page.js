'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoryDetails({ params }) {
  const { id } = params;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategory(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-black text-gray-800 mb-4">Category Not Found</h1>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-full font-bold">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
        {category.image ? (
          <img 
            src={category.image} 
            alt={category.label} 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${category.color} opacity-80`}></div>
        )}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <span className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/30">
            {category.icon === 'bank' && '🏦'}
            {category.icon === 'scale' && '⚖️'}
            {category.icon === 'video' && '🎥'}
            {category.icon === 'palette' && '🎨'}
            {category.icon === 'building' && '🏗️'}
            {category.icon === 'briefcase' && '💼'}
            {category.icon === 'laptop' && '💻'}
            {category.icon === 'music' && '🎵'}
            {category.icon === 'truck' && '🚚'}
            {category.icon === 'users' && '👥'}
            {category.icon === 'lightbulb' && '💡'}
            {category.icon === 'flask' && '🧪'}
            {category.icon === 'graduation-cap' && '🎓'}
            {category.icon === 'pen-tool' && '✍️'}
            {category.icon === 'heart' && '❤️'}
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-4">{category.label}</h1>
          <p className="text-white/90 font-medium max-w-2xl text-lg drop-shadow">
            Find the perfect professional for your {category.label.toLowerCase()} needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {category.details ? (
            <div 
              className="prose prose-lg prose-blue max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-gray-100"
              dangerouslySetInnerHTML={{ __html: category.details }}
            />
          ) : (
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft border border-gray-100 text-center">
              <p className="text-gray-500 font-medium">Detailed description coming soon.</p>
            </div>
          )}
        </div>

        {/* Subcategories Sidebar */}
        <div>
          <div className="bg-white p-8 rounded-3xl shadow-soft border border-gray-100 sticky top-24">
            <h3 className="font-black text-xl mb-6 flex items-center gap-2">
              <span>🗂️</span> Explore Topics
            </h3>
            
            <div className="space-y-6">
              {category.subcategories?.map((sub, i) => (
                <div key={i}>
                  <h4 className="font-bold text-gray-800 mb-3">{sub.name}</h4>
                  <ul className="space-y-2">
                    {sub.services?.map((service, j) => (
                      <li key={j}>
                        <Link href={`/professionals?service=${encodeURIComponent(service)}`} className="text-sm text-gray-500 hover:text-primary hover:translate-x-1 transition-all inline-block">
                          • {service}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
