export default function ProfessionalCard({ professional }) {
  const { name, skill, location, image, rating } = professional;

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-primary/20 transition-all duration-500 group flex flex-col hover:shadow-2xl hover:shadow-primary/5">
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-primary flex items-center gap-1 shadow-sm border border-white/20">
          <span className="text-accent text-xs">★</span> {rating.toFixed(1)}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
            {skill}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-black text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">{name}</h3>
            <div className="flex items-center gap-1.5 text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-wide">{location}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-inner">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 text-[8px] flex items-center justify-center font-bold overflow-hidden">
                <img src={`https://i.pravatar.cc/50?img=${i+10}`} alt="" />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-gray-400">12+ recent bookings</span>
        </div>
        
        <button className="mt-auto w-full py-4 rounded-2xl bg-gray-50 text-foreground font-black text-xs hover:bg-primary hover:text-white transition-all duration-500 border border-gray-100 hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/10">
          Book Service Now
        </button>
      </div>
    </div>
  );
}
