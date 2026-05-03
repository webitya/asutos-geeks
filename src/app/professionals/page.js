'use client';
import { useState, useEffect } from 'react';
import ProfessionalCard from '@/components/ProfessionalCard';

export default function Professionals() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const categories = ['All', 'Electrician', 'Painter', 'Developer', 'Tailoring', 'Home Services', 'AC Repair', 'Cleaning'];

  useEffect(() => {
    const fetchPros = async () => {
      try {
        const res = await fetch('/api/professionals');
        const data = await res.json();
        if (data.success) {
          setProfessionals(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPros();
  }, []);

  const filteredPros = professionals.filter(pro => {
    const matchesCategory = activeCategory === 'All' || pro.skill === activeCategory;
    const matchesSearch = pro.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pro.skill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = pro.location.toLowerCase().includes(locationQuery.toLowerCase());
    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 pb-20">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 px-4 sm:px-10 lg:px-16 py-8">
        <div className="max-w-full mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Find Verified Professionals</h1>
              <p className="text-gray-500 text-sm font-medium">Browse through our network of vetted experts ready to help you.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="bg-primary/5 text-primary px-4 py-2 rounded-xl font-bold text-xs border border-primary/10">
                {professionals.length} Experts
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-1 rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 flex flex-col md:flex-row items-center gap-1 max-w-5xl mx-auto -mb-16 relative z-20">
            <div className="flex-grow flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100 w-full md:w-auto">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Skill or name..." 
                className="w-full focus:outline-none text-sm font-medium text-foreground placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-grow flex items-center gap-2 px-4 py-3 w-full md:w-auto">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Location..." 
                className="w-full focus:outline-none text-sm font-medium text-foreground placeholder:text-gray-400"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 w-full md:w-auto">
              Search
            </button>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-10 lg:px-16 pt-24 max-w-full mx-auto w-full">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Categories</h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 rounded-2xl text-xs font-black transition-all text-left flex items-center justify-between group ${
                    activeCategory === cat 
                    ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  {cat}
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${activeCategory === cat ? 'bg-white' : 'bg-transparent group-hover:bg-primary'}`} />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <main className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filteredPros.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredPros.map((pro) => (
                <ProfessionalCard key={pro._id} professional={pro} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-foreground mb-3">No professionals found</h3>
              <p className="text-gray-400 font-medium max-w-sm mx-auto">We couldn't find any experts matching your current search or location filters.</p>
              <button 
                onClick={() => {setActiveCategory('All'); setSearchQuery(''); setLocationQuery('');}}
                className="mt-8 text-primary font-black text-sm underline hover:text-blue-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
