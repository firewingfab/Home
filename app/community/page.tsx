"use client";

import { motion } from "framer-motion";
import { MessageCircle, Trophy, ArrowRight, Star, Award } from "lucide-react";
import Image from "next/image";

const SUCCESS_STORIES = [
  { name: "Arjun Sharma", project: "Autonomous FPV Drone", achievement: "Won 1st Prize at National Drone Tech 2024", story: "Built a custom drone from scratch using Firewing boards. Won the district competition and now mentoring 10+ juniors.", image: "https://picsum.photos/seed/student1/400/300" },
  { name: "Priya Patel", project: "IoT Smart Car", achievement: "Innovation Award - State Science Fair", story: "Developed a gesture-controlled RC car. Her project was recognized for its unique control system and efficiency.", image: "https://picsum.photos/seed/student2/400/300" },
  { name: "Rahul Verma", project: "Fixed Wing Glider", achievement: "Longest Flight Duration Record (Local Club)", story: "Designed an aerodynamic glider that stayed in the air for 15 minutes. Inspired by Kalam's aerospace vision.", image: "https://picsum.photos/seed/student3/400/300" },
  { name: "Ananya Singh", project: "AI Obstacle Avoidance Bot", achievement: "Top 10 - Tech Innovators India", story: "Integrated AI with robotics to create a bot that navigates complex terrains autonomously. A true engineering marvel.", image: "https://picsum.photos/seed/student4/400/300" },
  { name: "Vikram Reddy", project: "Solar Powered Drone", achievement: "Green Tech Excellence Award", story: "Pioneered a solar-charging system for long-endurance surveillance drones. Reducing carbon footprint in tech.", image: "https://picsum.photos/seed/student5/400/300" },
  { name: "Sanya Malhotra", project: "Underwater ROV", achievement: "Best Marine Project 2023", story: "Built an affordable remotely operated vehicle for marine exploration. Inspiring girls to take up STEM.", image: "https://picsum.photos/seed/student6/400/300" }
];

export default function CommunityPage() {
  return (
    <main className="container mx-auto px-6 pt-32 pb-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
          DON&apos;T BUILD <span className="text-gradient">ALONE</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Connect with thousands of builders, share your progress, and learn from the best.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border-brand-accent/20 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
            <MessageCircle className="text-green-400 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Join Our WhatsApp Group</h2>
          <p className="text-slate-400 mb-8">Get instant help, share photos of your builds, and stay updated on local meetups.</p>
          <a href="https://chat.whatsapp.com/KSWdUwGWWkGATnPZ3dv0nT" target="_blank" rel="noopener noreferrer" className="mt-auto px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold transition-colors w-full">
            Join WhatsApp
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] border-blue-500/20 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
            <Trophy className="text-blue-400 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Challenge</h2>
          <p className="text-slate-400 mb-8">Coming Soon.</p>
          <button className="mt-auto px-8 py-4 bg-brand-accent hover:bg-orange-500 text-white rounded-2xl font-bold transition-colors w-full">
            Register Now
          </button>
        </motion.div>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">Achievements</h2>
          <button className="text-brand-accent font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUCCESS_STORIES.map((story, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 shrink-0">
                  <Image src={story.image} alt={story.name} fill className="rounded-full object-cover border-2 border-brand-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{story.name}</h3>
                  <p className="text-sm text-slate-500">{story.project}</p>
                </div>
              </div>
              
              <div className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-lg text-xs font-bold inline-block mb-4 flex items-center gap-1 w-fit">
                <Award className="w-3 h-3" />
                {story.achievement}
              </div>

              <p className="text-slate-400 text-sm italic leading-relaxed relative z-10">
                &quot;{story.story}&quot;
              </p>

              <div className="absolute top-4 right-4 text-brand-accent/20 z-0">
                <Star className="w-10 h-10 fill-current" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
