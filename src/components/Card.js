import Link from 'next/link';

export default function Card({ title, icon, color = 'bg-primary' }) {
  return (
    <Link href={`/professionals?category=${title}`} className="group block">
      <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-100 flex flex-col items-center text-center">
        <div className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">Book Expert {title}s</p>
      </div>
    </Link>
  );
}
