'use client';
import { useState, useEffect, Suspense } from 'react';
import ProfessionalCard from '@/components/ProfessionalCard';
import { CATEGORIES_DATA } from '@/lib/categories';
import { useSearchParams } from 'next/navigation';

function ProfessionalsContent() {
  const searchParams = useSearchParams();
  const urlSkill = searchParams.get('skill');
  const urlLocation = searchParams.get('location');
  const urlCategory = searchParams.get('category');

  const [prevUrlSkill, setPrevUrlSkill] = useState(urlSkill);
  const [prevUrlLocation, setPrevUrlLocation] = useState(urlLocation);
  const [prevUrlCategory, setPrevUrlCategory] = useState(urlCategory);

  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState(urlCategory || 'All');
  const [searchQuery, setSearchQuery] = useState(urlSkill || '');
  const [locationQuery, setLocationQuery] = useState(urlLocation || '');

  if (urlSkill !== prevUrlSkill) {
    setPrevUrlSkill(urlSkill);
    if (urlSkill) setSearchQuery(urlSkill);
  }
  if (urlLocation !== prevUrlLocation) {
    setPrevUrlLocation(urlLocation);
    if (urlLocation) setLocationQuery(urlLocation);
  }
  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    if (urlCategory) setActiveCategory(urlCategory);
  }

  const categoryLabels = ['All', ...Object.keys(CATEGORIES_DATA)];

  useEffect(() => {
    const fetchPros = async () => {
      try {
        const res = await fetch('/api/professionals');
        const data = await res.json();
        if (data.success) setProfessionals(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPros();
  }, []);

  const filteredPros = professionals.filter(pro => {
    let matchesCategory = true;
    if (activeCategory !== 'All') {
      const categoryData = CATEGORIES_DATA[activeCategory];
      if (categoryData) {
        const allCategorySkills = [];
        Object.values(categoryData.subcategories).forEach(subList => {
           allCategorySkills.push(...subList);
        });
        matchesCategory = allCategorySkills.includes(pro.skill) || pro.skill === activeCategory;
      } else {
        let foundInSubTitle = false;
        for (const ind of Object.values(CATEGORIES_DATA)) {
           if (ind.subcategories[activeCategory]) {
              foundInSubTitle = true;
              matchesCategory = ind.subcategories[activeCategory].includes(pro.skill);
              break;
           }
        }
        if (!foundInSubTitle) {
          matchesCategory = pro.skill === activeCategory;
        }
      }
    }

    const matchesSearch =
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.skill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = pro.location.toLowerCase().includes(locationQuery.toLowerCase());
    
    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 px-4 sm:px-10 lg:px-16 py-10 gradient-hero">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-10">
            <div className="max-w-2xl">
              <span className="text-[10px] font-normal uppercase tracking-widest text-primary mb-2 block">Talent Marketplace</span>
              <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2 leading-tight">Find Verified Professionals</h1>
              <p className="text-gray-400 text-sm font-normal">Browse our curated network of vetted specialists ready to get to work.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="bg-primary-light text-primary px-5 py-2 rounded-xl font-normal text-xs border border-purple-100">
                {professionals.length} Experts
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-1 rounded-2xl shadow-premium border border-purple-50 flex flex-col md:flex-row items-center gap-1 max-w-5xl mx-auto -mb-16 relative z-20">
            <div className="flex-grow flex items-center gap-2.5 px-5 py-3.5 border-b md:border-b-0 md:border-r border-gray-100 w-full md:w-auto">
              <svg className="w-4 h-4 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Skill or role..."
                className="w-full focus:outline-none text-xs font-normal text-foreground placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-grow flex items-center gap-2.5 px-5 py-3.5 w-full md:w-auto">
              <svg className="w-4 h-4 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="Location..."
                className="w-full focus:outline-none text-xs font-normal text-foreground placeholder:text-gray-400"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-normal text-xs transition-all shadow-lg shadow-primary/20 w-full md:w-auto">
              Search Experts
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-10 lg:px-16 pt-24 max-w-7xl mx-auto w-full">

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-6">
            <div>
              <h3 className="text-[10px] font-normal text-gray-400 uppercase tracking-widest mb-4">Industry</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categoryLabels.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-[11px] font-normal transition-all text-left ${
                      activeCategory === cat
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'bg-gray-50 text-gray-500 hover:bg-primary-light hover:text-primary border border-transparent hover:border-purple-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {activeCategory !== 'All' && CATEGORIES_DATA[activeCategory] && (
              <div>
                <h3 className="text-[10px] font-normal text-gray-400 uppercase tracking-widest mb-4">Specializations</h3>
                <div className="space-y-1">
                  {Object.keys(CATEGORIES_DATA[activeCategory].subcategories).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSearchQuery(sub)}
                      className="w-full text-left px-4 py-2 rounded-xl text-[11px] font-normal text-gray-500 hover:bg-primary-light hover:text-primary transition-all"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Results */}
        <main className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-[2rem] h-80 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : filteredPros.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPros.map((pro) => (
                <ProfessionalCard key={pro._id} professional={pro} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[2.5rem] border border-gray-100">
              <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">No professionals found</h3>
              <p className="text-gray-400 font-normal max-w-sm mx-auto text-sm mb-6">
                No experts match your current filters. Try adjusting your search or selecting a different category.
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); setLocationQuery(''); }}
                className="text-primary font-normal text-xs underline hover:text-primary-hover"
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

export default function Professionals() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading professionals...</div>}>
      <ProfessionalsContent />
    </Suspense>
  );
}
