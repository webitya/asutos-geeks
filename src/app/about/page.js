export default function About() {
  const stats = [
    { label: 'Verified Experts', value: '5,000+' },
    { label: 'Services Delivered', value: '50k+' },
    { label: 'Happy Customers', value: '10k+' },
    { label: 'Cities Covered', value: '25+' },
  ];

  const values = [
    { title: 'Trust', desc: 'Every professional on our platform undergoes a rigorous verification process.' },
    { title: 'Quality', desc: 'We maintain high standards through customer ratings and periodic quality checks.' },
    { title: 'Empowerment', desc: 'Focused on creating digital opportunities for local workers and women.' },
    { title: 'Innovation', desc: 'Using technology to make service booking as simple as a single click.' },
  ];

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* Hero Section */}
      <section className="bg-gray-50 px-4 sm:px-10 lg:px-16 py-12 border-b border-gray-100">
        <div className="max-w-full mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Redefining Local Services with <span className="text-primary">Wetawork</span>
            </h1>
            <p className="text-base text-gray-500 font-medium leading-relaxed max-w-xl">
              We started with a simple vision: to bridge the gap between skilled local talent and the people who need them most.
            </p>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
            <div className="h-56 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=600" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="h-56 rounded-2xl overflow-hidden shadow-lg translate-y-6">
              <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-gray-100 p-8 rounded-[2rem] shadow-soft">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-3xl font-bold text-primary mb-1">{stat.value}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-primary p-10 rounded-[2rem] text-white">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              To empower local workers and simplify service booking for everyone. We bridge the gap between skilled professionals and those who need their expertise.
            </p>
          </div>
          <div className="bg-accent p-10 rounded-[2rem] text-white">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-orange-100 text-sm leading-relaxed">
              We envision a future where every household has instant access to trusted services, and every skilled worker has a platform to thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 sm:px-10 lg:px-16 pt-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Our Values</h2>
          <p className="text-gray-500 text-sm font-medium">Built on trust, quality, and commitment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((val, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-gray-50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold mb-4 group-hover:scale-105 transition-transform text-sm">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{val.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Women Empowerment Detail */}
      <section className="px-4 sm:px-10 lg:px-16 pt-8">
        <div className="bg-foreground text-white rounded-[2.5rem] p-10 lg:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-12" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">Empowering Women.</h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">
                A core pillar of Wetawork is the financial independence of women. We digitize skills like tailoring and cooking for home-based professionals.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <span className="block text-xl font-bold text-white mb-1">500+</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Female Pros</span>
                </div>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <span className="block text-xl font-bold text-white mb-1">Direct</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Payments</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" alt="" className="rounded-[2rem] shadow-xl" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
