"use client";

import { motion } from "framer-motion";
import { Clock, Info, Plane, Car } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  { id: "rc-air", title: "RC Air", description: "Master the skies with our FPV drone building kit.", difficulty: "Intermediate", cost: "₹0,000", image: "/photos/IMG_7883.webp", status: "Coming Soon" },
  { id: "rc-track", title: "RC Track", description: "Build high-speed racing cars and line-following bots.", difficulty: "Beginner", cost: "₹0,000", image: "/photos/IMG_0613.webp", status: "Coming Soon" }
];

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-6 pt-32 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <h1 className="text-4xl md:text-7xl font-black mb-6">PROJECTS</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          From the ground to the sky, build the future of mobility and robotics.
        </p>
      </motion.div>

      <div className="space-y-32">
        {PROJECTS.map((project, idx) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
          >
            <div className="flex-1 relative group w-full">
              <div className="absolute -inset-4 bg-brand-accent/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 95vw"
                  className="object-cover"
                />
                <div className="absolute top-6 right-6 bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {project.status}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 text-brand-accent">
                {project.id === 'rc-air' ? <Plane className="w-8 h-8" /> : <Car className="w-8 h-8" />}
                <h2 className="text-3xl md:text-4xl font-bold">{project.title}</h2>
              </div>
              
              <p className="text-xl text-slate-400 leading-relaxed">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-2xl">
                  <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Difficulty</span>
                  <span className="font-bold">{project.difficulty}</span>
                </div>
                <div className="glass p-4 rounded-2xl">
                  <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Estimated Cost</span>
                  <span className="font-bold">{project.cost}</span>
                </div>
              </div>

              <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex gap-4">
                <Info className="text-blue-400 shrink-0 w-6 h-6" />
                <p className="text-sm text-blue-100/80 italic">
                  Inspired by the spirit of innovation.
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
