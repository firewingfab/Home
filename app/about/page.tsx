"use client";

import { Heart, Mail, MapPin, Phone, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="vision" 
          className="mb-32"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-8 md:mb-12">VISION</h1>
          <div className="glass p-8 md:p-12 rounded-3xl md:rounded-[3rem] border-brand-accent/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Rocket className="w-32 h-32" />
            </div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-300 relative z-10">
              Inspired by the life and vision of <span className="text-brand-accent font-bold">Dr. APJ Abdul Kalam</span>, FirewingFab aims to democratize aerospace and robotics education for every student in India. 
            </p>
            <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
              <p className="text-lg text-slate-400">
                We believe that innovation shouldn&apos;t be limited to elite institutions. By providing affordable hardware, free community access, and practical learning paths, we are building the next generation of Indian innovators.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">CONTACT US</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-6 md:p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center">
                  <Mail className="text-brand-accent w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                  <p className="font-bold">firewingfab@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Phone className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Phone</p>
                  <p className="font-bold">+91 99 61 638 639</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <MapPin className="text-purple-400 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                  <p className="font-bold">Kadavoor, Ernakulam - 686671</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-red-400 w-10 h-10 animate-pulse fill-current" />
              </div>
              <h3 className="text-xl font-bold mb-2">Powered by Abhram</h3>
              <p className="text-slate-400 text-sm">Building tools for the thinkers and doers of tomorrow.</p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
