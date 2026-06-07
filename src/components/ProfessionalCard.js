export default function ProfessionalCard({ professional }) {
  const { name, skill, location, image, rating } = professional;

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-purple-100 transition-all duration-500 group flex flex-col hover:shadow-[0_20px_60px_-15px_rgba(109,40,217,0.12)]">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-normal text-primary flex items-center gap-1 shadow-sm">
          <span className="text-accent">★</span> {typeof rating === 'number' ? rating.toFixed(1) : rating}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-primary text-white text-[9px] font-normal uppercase tracking-wide px-2.5 py-1 rounded-md shadow-lg">
            {skill}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">{name}</h3>
            <div className="flex items-center gap-1.5 text-gray-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] font-normal tracking-wide">{location}</span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                <img src={`https://i.pravatar.cc/50?img=${i + 10}`} alt="" />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-normal text-gray-400">12+ recent bookings</span>
        </div>

        <button className="mt-auto w-full py-3.5 rounded-xl bg-primary-light text-primary font-normal text-xs hover:bg-primary hover:text-white transition-all duration-300 border border-purple-100 hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/10">
          Book Expert Now
        </button>
      </div>
    </div>
  );
}
