"use client";

import { useEffect, useRef, useState } from "react";
import { Send, MessageCircle, Loader2 } from "lucide-react";

export default function JoinPage() {
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMountedRef = useRef(false);
  const activeSubmitControllerRef = useRef<AbortController | null>(null);

  const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/KSWdUwGWWkGATnPZ3dv0nT";

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      activeSubmitControllerRef.current?.abort();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    // Honeypot check
    if ((formData.get('website') as string)?.trim()) return;

    const displayOnHome = formData.get('display_on_home') === 'yes';
    if (displayOnHome) {
      const username = (formData.get('username') as string)?.trim();
      if (!username) {
        setStatus({ type: 'error', message: 'Please enter your username to display in the Home page Dreamers section.' });
        return;
      }
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    activeSubmitControllerRef.current = controller;

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      const result = await response.json().catch(() => ({}));
      if (!isMountedRef.current) return;

      if (!response.ok) {
        setStatus({ type: 'error', message: result?.message || 'Submission failed. Please try again, or contact us.' });
        return;
      }

      form.reset();
      setStatus({ type: 'success', message: 'Thanks! Your details were submitted successfully.' });
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return;
      if (!isMountedRef.current) return;
      console.error(err);
      setStatus({ type: 'error', message: 'Submission failed. Please try again, or contact us.' });
    } finally {
      if (activeSubmitControllerRef.current === controller) {
        activeSubmitControllerRef.current = null;
      }
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="container mx-auto px-6 pt-32 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">JOIN <span className="text-gradient">THE CLUB</span></h1>
          <p className="text-slate-400 mt-4">Fill your details. We’ll contact you and add you to our community updates.</p>
        </div>

        <div className="glass rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="name">Name</label>
                <input id="name" name="name" required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" required inputMode="tel" className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="+91 9XXXXXXXXX" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="name@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="institute">College / School</label>
                <input id="institute" name="institute" required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="Your institute name" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="location">Location</label>
                <input id="location" name="location" required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="City, State" />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="pincode">Pincode</label>
                <input id="pincode" name="pincode" required inputMode="numeric" pattern="^[0-9]{4,10}$" className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="e.g. 560001" />
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-xl font-bold mb-1">Your Dream / Vision</h2>
              <p className="text-sm text-slate-400">Tell us what you want to build. You can also choose to display it on the Home page.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="username">Username</label>
                <input id="username" name="username" className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="@yourname" />
                <p className="text-xs text-slate-500 mt-2">Shown publicly only if you enable display below.</p>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="category">Category</label>
                <select id="category" name="category" required defaultValue="" className="w-full px-4 py-3 rounded-2xl bg-white/5 text-slate-100 border border-white/10 focus:border-brand-accent/60 focus:outline-none [&>option]:bg-white [&>option]:text-slate-900">
                  <option value="" disabled>Select a category</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Drone">Drone</option>
                  <option value="Robot">Robot</option>
                  <option value="IOT">IOT</option>
                  <option value="Software">Software</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Rover">Rover</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="subcategory">Subcategory</label>
                <input id="subcategory" name="subcategory" required className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none" placeholder="FPV, Arduino, AI, etc." />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="note">Note</label>
                <textarea id="note" name="note" required rows={2} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none resize-none" placeholder="Short note about your idea"></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2" htmlFor="dream">Dream / Vision</label>
              <textarea id="dream" name="dream" required rows={4} className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none resize-none" placeholder="Example: I want to build an FPV drone that can map my campus and help during emergencies."></textarea>
            </div>

            <div className="flex items-start gap-3 glass rounded-2xl p-4 border border-white/10">
              <input id="display_on_home" name="display_on_home" value="yes" type="checkbox" className="mt-1 w-5 h-5 accent-orange-500" />
              <label htmlFor="display_on_home" className="text-sm text-slate-300 leading-relaxed">
                I confirm that my <span className="text-white font-semibold">name, username, and dream</span> can be displayed on the Home page Dreamers section.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-2">
              <p className="text-xs text-slate-500">By submitting, you agree to be contacted by FirewingFab.</p>
              <button disabled={isSubmitting} type="submit" className="px-8 py-4 bg-brand-accent hover:bg-orange-500 text-white rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {status.type && (
              <div className={`mt-4 text-sm flex flex-col gap-3 ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                <div>{status.message}</div>
                {status.type === 'success' && (
                  <a href={WHATSAPP_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-bold transition-colors w-full sm:w-fit">
                    Join WhatsApp Community <MessageCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </form>

          <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-xs text-slate-400">
              Thank you, We will update you soon...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
