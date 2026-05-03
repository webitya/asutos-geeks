import Link from 'next/link';

export default function Footer() {
  const categories = [
    'Electrician', 'Painter', 'Developer', 'Tailoring', 'Home Services', 'Cleaning', 'Plumbing'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
    )},
    { name: 'Twitter', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
    )},
    { name: 'Instagram', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    )}
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-full mx-auto px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-primary">Asutos</span>
              <span className="text-3xl font-bold text-accent">Geeks</span>
            </Link>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm mb-8">
              Smart Services. Skilled People. Empowered Homes. We are India's most trusted platform for high-quality local services.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <Link href={`/professionals?category=${cat}`} className="hover:text-primary transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Get in Touch</Link></li>
              <li><Link href="/join" className="hover:text-primary transition-colors">Become a Professional</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">User Login</Link></li>
              <li><Link href="/admin/login" className="text-accent hover:underline font-bold">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">Join 10,000+ people getting our weekly service tips.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
              />
              <button className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-primary/10">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-xs text-gray-400">© 2026 Asutos Geeks. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-xs text-gray-400 hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-xs text-gray-400 hover:text-primary">Terms of Use</Link>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Powered by</span>
            <a href="https://webitya.com" target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary font-black tracking-tighter hover:underline">WEBITYA</a>
          </div>

        </div>
      </div>
    </footer>
  );
}

