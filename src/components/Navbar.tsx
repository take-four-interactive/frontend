import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Home, Facebook, Eye, ChevronDown, BookOpen } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <nav className="relative z-50 bg-white shadow-md flex flex-col font-sans w-full">
      {/* Top blue bar */}
      <div className="bg-[#22338b] h-8 w-full flex justify-end items-center px-4 md:px-8">
        <button className="bg-white text-[#22338b] w-6 h-6 flex items-center justify-center font-bold text-xs mr-2">
          A
        </button>
        <button className="bg-white text-[#22338b] w-6 h-6 flex items-center justify-center font-bold text-xs">
          A+
        </button>
        {/* Hidden Admin Link */}
        <Link to="/admin" className="sr-only">
          Panel Admina
        </Link>
      </div>

      {/* Middle logo bar */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-8">

        {/* Left: Logos */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="flex flex-col items-center relative">
            {/* Custom stylized MOSIR LEŻAJSK logo approximation */}
            <div className="absolute -top-4 -right-2 w-16 h-8 border-t-4 border-blue-400 rounded-[50%] opacity-50"></div>
            <div className="absolute -top-3 -right-2 w-16 h-8 border-t-4 border-orange-400 rounded-[50%] opacity-50"></div>
            <span className="text-[#22338b] font-black tracking-tighter text-3xl leading-none z-10">MOSiR</span>
            <span className="text-orange-500 font-bold text-[10px] tracking-widest relative -top-1 z-10 border-t border-orange-500 pt-[1px]">LEŻAJSK</span>
          </Link>

          <Link to="/">
            <div className="flex flex-col justify-center">
              <span className="text-[#22338b] font-bold text-lg md:text-2xl leading-none">Miejski Ośrodek Sportu</span>
              <span className="text-[#22338b] font-bold text-lg md:text-2xl leading-tight">
                i Rekreacji <span className="font-normal">w Leżajsku</span>
              </span>
            </div>
          </Link>
        </div>


        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-[#3b5998] hover:opacity-80">
            <Facebook size={24} strokeWidth={2.5} />
          </a>
          <a href="#" className="flex items-center text-[#ab1212] font-bold text-xl hover:opacity-80">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-[#ab1212] border-b-[8px] border-b-transparent mr-1"></div>
            bip
          </a>
          <button className="bg-black text-yellow-400 p-1 rounded-sm hover:opacity-80">
            <Eye size={24} />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 text-[#22338b]" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Bottom navigation links */}
      <div className="bg-[#f8f9fa] border-t border-gray-200 w-full hidden md:block">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-center gap-6 py-3">
          <Link to="/" className="text-[#22338b] hover:text-blue-700 transition-colors">
            <Home size={20} />
          </Link>
          <a href="#" className="font-bold text-sm tracking-wide text-gray-900 hover:text-[#22338b] transition-colors">AKTUALNOŚCI</a>
          <a href="#" className="font-bold text-sm tracking-wide text-gray-900 hover:text-[#22338b] transition-colors">CENNIK</a>
          <a href="#" className="font-bold text-sm tracking-wide text-gray-900 hover:text-[#22338b] transition-colors flex items-center gap-1">
            NASZE OBIEKTY <ChevronDown size={14} strokeWidth={3} />
          </a>
          <a href="#" className="font-bold text-sm tracking-wide text-gray-900 hover:text-[#22338b] transition-colors">GALERIA</a>
          <a href="#" className="font-bold text-sm tracking-wide text-gray-900 hover:text-[#22338b] transition-colors">KONTAKT</a>
          <a href="#" className="font-bold text-sm tracking-wide text-gray-900 hover:text-[#22338b] transition-colors">ZAJĘCIA GRUPOWE</a>
          <Link to="/znajdz-rezerwacje" className="font-bold text-sm tracking-wide text-gray-900 hover:text-[#22338b] transition-colors">MOJE REZERWACJE</Link>
          <Link to="/rezerwacja" className="font-bold text-sm tracking-wide text-white bg-[#22338b] hover:bg-blue-800 transition-colors px-4 py-1.5 rounded-md ml-2">ZAREZERWUJ</Link>
        </div>
      </div>

      {/* Mobile navigation links (Dropdown) */}
      {open && (
        <div className="md:hidden bg-[#f8f9fa] border-t border-gray-200 px-4 pb-4 pt-2 flex flex-col gap-2">
          <Link to="/" onClick={() => setOpen(false)} className="font-bold text-sm py-2 text-gray-900 flex items-center gap-2">
            <Home size={18} /> Strona główna
          </Link>
          <a href="#" className="font-bold text-sm py-2 text-gray-900 border-t border-gray-200">AKTUALNOŚCI</a>
          <a href="#" className="font-bold text-sm py-2 text-gray-900 border-t border-gray-200">CENNIK</a>
          <a href="#" className="font-bold text-sm py-2 text-gray-900 border-t border-gray-200 flex justify-between">
            NASZE OBIEKTY <ChevronDown size={16} />
          </a>
          <a href="#" className="font-bold text-sm py-2 text-gray-900 border-t border-gray-200">GALERIA</a>
          <a href="#" className="font-bold text-sm py-2 text-gray-900 border-t border-gray-200">KONTAKT</a>
          <a href="#" className="font-bold text-sm py-2 text-gray-900 border-t border-gray-200">ZAJĘCIA GRUPOWE</a>
          <Link to="/znajdz-rezerwacje" onClick={() => setOpen(false)} className="font-bold text-sm py-2 text-gray-900 border-t border-gray-200">MOJE REZERWACJE</Link>
          <Link to="/rezerwacja" onClick={() => setOpen(false)} className="font-bold text-sm py-2 text-[#22338b] border-t border-gray-200">ZAREZERWUJ</Link>

          <div className="flex items-center gap-4 mt-4 border-t border-gray-200 pt-4">
            <a href="#" className="text-[#3b5998]">
              <Facebook size={24} />
            </a>
            <a href="#" className="flex items-center text-[#ab1212] font-bold text-xl">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-[#ab1212] border-b-[8px] border-b-transparent mr-1"></div>
              bip
            </a>
            <button className="bg-black text-yellow-400 p-1 rounded-sm">
              <Eye size={24} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
