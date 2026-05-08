"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Clock3, Send, Car, Plane } from "lucide-react";

type PlanValue = "starter" | "pro";
type ModeValue = "track" | "air";

const PLAN_OPTIONS: Record<
  PlanValue,
  { label: string; oldPrice: string; newPrice: string }
> = {
  starter: {
    label: "Starter Plan",
    oldPrice: "₹999",
    newPrice: "₹39"
  },
  pro: {
    label: "Pro Plan",
    oldPrice: "₹2999",
    newPrice: "₹199"
  }
};

const WHATSAPP_NUMBER = "6238668846";
const TRACK_MODE_IMAGE = "/photos/rc_image/rc_car.webp";
const AIR_MODE_IMAGE = "/photos/rc_image/rc_drone.webp";

function formatTo12Hour(time24: string) {
  const [rawHour, rawMinute] = time24.split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return time24;
  }

  const period = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 || 12;
  return `${normalizedHour}:${String(minute).padStart(2, "0")} ${period}`;
}

const TIME_MIN = "07:00";
const TIME_MAX = "20:00";
const TIME_STEP_SECONDS = 60;
const TIME_RANGE_MESSAGE = "Please choose a time between 7:00 AM and 8:00 PM.";

function parseTimeToMinutes(time24: string) {
  const [rawHour, rawMinute] = time24.split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return null;
  }

  return hour * 60 + minute;
}

function isTimeInAllowedRange(time24: string) {
  const currentMinutes = parseTimeToMinutes(time24);
  const minMinutes = parseTimeToMinutes(TIME_MIN);
  const maxMinutes = parseTimeToMinutes(TIME_MAX);

  if (currentMinutes === null || minMinutes === null || maxMinutes === null) {
    return false;
  }

  return currentMinutes >= minMinutes && currentMinutes <= maxMinutes;
}

const openNativeTimePicker = (input: HTMLInputElement) => {
  const pickerInput = input as HTMLInputElement & { showPicker?: () => void };
  if (typeof pickerInput.showPicker !== "function") {
    return;
  }

  try {
    pickerInput.showPicker();
  } catch {
    // Ignore browsers that block programmatic picker open.
  }
};

export default function RcEventPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState<PlanValue>("starter");
  const [mode, setMode] = useState<ModeValue>("track");
  const [eventTime, setEventTime] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const timeInput = event.currentTarget.querySelector<HTMLInputElement>("#time");
    const submittedTime = timeInput?.value ?? eventTime;

    if (!isTimeInAllowedRange(submittedTime)) {
      if (timeInput) {
        timeInput.setCustomValidity(TIME_RANGE_MESSAGE);
        timeInput.reportValidity();
      }
      return;
    }

    if (timeInput) {
      timeInput.setCustomValidity("");
    }

    setIsRedirecting(true);

    const selectedPlan = PLAN_OPTIONS[plan];
    const modeLabel = mode === "track" ? "Track" : "Air";
    const message = [
      "*RC Car Event Registration*",
      "",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Plan: ~${selectedPlan.oldPrice}~ ${selectedPlan.newPrice}`,
      `Mode: ${modeLabel}`,
      `Preferred Time: ${formatTo12Hour(submittedTime)}`
    ].join("\n");

    const whatsappTarget = WHATSAPP_NUMBER.replace(/\D/g, "").length === 10
      ? `91${WHATSAPP_NUMBER.replace(/\D/g, "")}`
      : WHATSAPP_NUMBER.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${whatsappTarget}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <main className="container mx-auto px-6 pt-32 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            RC Event <span className="text-gradient">Registration</span>
          </h1>
          <p className="text-slate-400 mt-4">
            Fill the form and continue to WhatsApp with your details auto-filled.
          </p>
        </div>

        <div className="glass rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 border-white/10">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                inputMode="tel"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent/60 focus:outline-none"
                placeholder="+91 9XXXXXXXXX"
              />
            </div>

            <fieldset>
              <legend className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-3">
                Plan
              </legend>
              <div className="grid md:grid-cols-2 gap-4">
                {(Object.keys(PLAN_OPTIONS) as PlanValue[]).map((planValue) => {
                  const option = PLAN_OPTIONS[planValue];
                  const isSelected = plan === planValue;

                  return (
                    <label
                      key={planValue}
                      className={`rounded-2xl border p-4 cursor-pointer transition-colors ${
                        isSelected
                          ? "border-2 border-white/80 bg-white/10"
                          : "border-white/10 bg-white/5 hover:border-brand-accent/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={planValue}
                        checked={isSelected}
                        onChange={() => setPlan(planValue)}
                        className="sr-only"
                      />
                      <p className="text-sm font-bold tracking-wide text-white mb-2">{option.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400 line-through">{option.oldPrice}</span>
                        <span className="inline-flex rounded-full bg-emerald-500/15 px-2.5 py-1 text-base font-bold text-emerald-400">
                          {option.newPrice}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-3">
                Mode
              </legend>
              <div className="grid md:grid-cols-2 gap-4">
                <label
                  className={`rounded-2xl border p-4 cursor-pointer transition-colors ${
                    mode === "track"
                      ? "relative overflow-hidden border-2 border-white/80 shadow-lg shadow-black/40"
                      : "relative overflow-hidden border-white/10 hover:border-brand-accent/30"
                  }`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={TRACK_MODE_IMAGE}
                      alt="Track mode background"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 ${mode === "track" ? "bg-black/42" : "bg-black/50"}`} />
                  </div>
                  <input
                    type="radio"
                    name="mode"
                    value="track"
                    checked={mode === "track"}
                    onChange={() => setMode("track")}
                    className="sr-only"
                  />
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center">
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div className="rounded-lg bg-black/70 px-3 py-2 border border-white/10 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
                      <p className="text-base font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Track</p>
                      <p className="text-xs text-slate-200">Race on ground circuit</p>
                    </div>
                  </div>
                </label>

                <label
                  className={`rounded-2xl border p-4 cursor-pointer transition-colors ${
                    mode === "air"
                      ? "relative overflow-hidden border-2 border-white/80 shadow-lg shadow-black/40"
                      : "relative overflow-hidden border-white/10 hover:border-brand-accent/30"
                  }`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={AIR_MODE_IMAGE}
                      alt="Air mode background"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 ${mode === "air" ? "bg-black/42" : "bg-black/50"}`} />
                  </div>
                  <input
                    type="radio"
                    name="mode"
                    value="air"
                    checked={mode === "air"}
                    onChange={() => setMode("air")}
                    className="sr-only"
                  />
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center">
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <div className="rounded-lg bg-black/70 px-3 py-2 border border-white/10 backdrop-blur-sm shadow-[0_6px_18px_rgba(0,0,0,0.45)]">
                      <p className="text-base font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Air</p>
                      <p className="text-xs text-slate-200">Flight mode challenge</p>
                    </div>
                  </div>
                </label>
              </div>
            </fieldset>

            <div>
              <label
                className="block text-sm font-bold uppercase tracking-widest text-slate-300 mb-2"
                htmlFor="time"
              >
                Time
              </label>
              <div className="w-full md:w-80">
                <div className="relative">
                  <Clock3 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
                  <input
                    id="time"
                    type="time"
                    value={eventTime}
                    onClick={(e) => openNativeTimePicker(e.currentTarget)}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      setEventTime(nextValue);
                      if (!nextValue || isTimeInAllowedRange(nextValue)) {
                        e.target.setCustomValidity("");
                        return;
                      }
                      e.target.setCustomValidity(TIME_RANGE_MESSAGE);
                    }}
                    min={TIME_MIN}
                    max={TIME_MAX}
                    step={TIME_STEP_SECONDS}
                    required
                    className="w-full cursor-pointer pl-11 pr-4 py-3.5 rounded-2xl bg-white/8 border border-white/20 focus:border-brand-accent/60 focus:outline-none text-slate-100"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-2 inline-flex items-center gap-1.5">
                <Clock3 className="w-3.5 h-3.5" />
                Choose any time between 7:00 AM and 8:00 PM.
              </p>
            </div>

            <button
              disabled={isRedirecting}
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-brand-accent hover:bg-orange-500 text-white rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{isRedirecting ? "Redirecting..." : "Submit Registration"}</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}


