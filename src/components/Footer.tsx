import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const logoUrl = "https://ik.imagekit.io/b3s3mttie3/Firewings%20/firewingfab_logo";

  return (
    <footer className="bg-brand-blue border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-[7.1rem] h-[7.1rem] rounded-lg overflow-hidden flex items-center justify-center">
                <Image src={logoUrl} alt="FirewingFab" width={113} height={113} className="w-full h-full object-cover object-center" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">
                FIREWING<span className="text-brand-accent">FAB</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Inspired by APJ Abdul Kalam. Empowering the next generation of RC builders and aerospace innovators in India.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/firewingfab/" aria-label="Instagram" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand-accent transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9A3.5 3.5 0 0 0 20 16.5v-9A3.5 3.5 0 0 0 16.5 4Z"/>
                  <path fill="currentColor" d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand-accent transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="currentColor" d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.3l.7-3H14V9c0-.6.4-1 1-1Z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-brand-accent transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M21 8.5A2.5 2.5 0 0 0 18.5 6h-13A2.5 2.5 0 0 0 3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path fill="currentColor" d="M11 10v4l4-2-4-2Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link href="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
              <li><Link href="/projects" className="hover:text-brand-accent transition-colors">Projects</Link></li>
              <li><Link href="/community" className="hover:text-brand-accent transition-colors">Community</Link></li>
              <li><Link href="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Contact</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> firewingfab@gmail.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 99 61 638 639</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 FirewingFab. All rights reserved.</p>
          <p className="flex items-center gap-1">Powered by <span className="text-slate-300 font-bold">Abhram & Developers</span></p>
        </div>
      </div>
    </footer>
  );
}
