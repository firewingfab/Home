"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const handleScroll = () => {
      if (!isMountedRef.current) return;
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      isMountedRef.current = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" }
  ];

  const logoUrl = "https://ik.imagekit.io/b3s3mttie3/Firewings%20/firewingfab_logo";

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-500 ${scrolled ? 'py-3 md:py-4' : 'py-4 md:py-6'}`}>
        <div className="container mx-auto">
          <div className={`flex items-center justify-between rounded-full px-5 md:px-8 py-2.5 transition-all duration-500 ${
            scrolled 
              ? 'bg-[#0a192f]/70 backdrop-blur-sm border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'bg-white/5 backdrop-blur-sm border border-white/5'
          }`}>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-[3.25rem] h-[3.25rem] rounded-xl overflow-hidden flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Image src={logoUrl} alt="FirewingFab" width={52} height={52} className="w-full h-full object-cover object-center scale-[1.3]" />
              </div>
              <span className="text-lg md:text-xl font-black tracking-tighter uppercase hidden sm:block">
                FIREWING<span className="text-brand-accent">FAB</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold uppercase tracking-widest transition-colors relative ${
                      isActive ? "text-brand-accent" : "text-slate-300 hover:text-brand-accent"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/join"
                className="hidden sm:block px-6 py-2 bg-brand-accent text-white rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-brand-accent/20"
              >
                Join Club
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 glass rounded-xl flex items-center justify-center text-brand-light"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] ${isMobileMenuOpen ? "block" : "hidden"}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-brand-blue/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-xs bg-brand-blue border-l border-white/10 p-10 flex flex-col transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-[3.25rem] h-[3.25rem] rounded-xl overflow-hidden flex items-center justify-center">
                <Image src={logoUrl} alt="FirewingFab" width={52} height={52} className="w-full h-full object-cover object-center scale-[1.3]" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">
                FIREWING<span className="text-brand-accent">FAB</span>
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-bold uppercase tracking-widest ${
                    isActive ? "text-brand-accent" : "text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto">
            <Link
              href="/join"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-4 bg-brand-accent text-white rounded-2xl font-bold text-lg"
            >
              Join Club
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
