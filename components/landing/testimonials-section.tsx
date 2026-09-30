"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Quolix transformed our deployment pipeline. What used to take hours now happens in seconds.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Meridian Labs",
    metric: "10x faster deployments",
  },
  {
    quote: "The developer experience is unmatched. Our team's productivity has never been higher.",
    author: "Marcus Webb",
    role: "Engineering Lead",
    company: "Flux Systems",
    metric: "40% more features shipped",
  },
  {
    quote: "Finally, infrastructure that scales with our ambition. Zero downtime since we switched.",
    author: "Elena Rodriguez",
    role: "VP Engineering",
    company: "Beacon AI",
    metric: "99.99% uptime",
  },
  {
    quote: "The integrations are seamless. We connected our entire stack in a single afternoon.",
    author: "James Liu",
    role: "Founder",
    company: "Prism Analytics",
    metric: "50+ integrations used",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const switchTestimonial = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsAnimating(false);
    }, 250);
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + testimonials.length) % testimonials.length;
    switchTestimonial(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % testimonials.length;
    switchTestimonial(nextIdx);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section 
      className="relative py-32 lg:py-40 border-t border-foreground/10 lg:pb-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            What people say
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-foreground/15 text-muted-foreground bg-foreground/[0.03]">
            Made by Quolytech
          </span>
          <div className="flex-1 h-px bg-foreground/10" />
          <span className="font-mono text-xs text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main Quote */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <blockquote
              className={`transition-all duration-300 min-h-[140px] ${
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-foreground">
                "{activeTestimonial.quote}"
              </p>
            </blockquote>

            {/* Author */}
            <div
              className={`mt-12 flex items-center gap-6 transition-all duration-300 delay-100 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <span className="font-display text-2xl text-foreground">
                  {activeTestimonial.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{activeTestimonial.author}</p>
                <p className="text-muted-foreground">
                  {activeTestimonial.role}, {activeTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Metric Highlight */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div
              className={`p-8 border border-foreground/10 transition-all duration-300 ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                Key Result
              </span>
              <p className="font-display text-3xl md:text-4xl text-foreground">
                {activeTestimonial.metric}
              </p>
            </div>

            {/* Navigation Dots and Arrow Controls */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => switchTestimonial(idx)}
                    className={`h-2 transition-all duration-300 cursor-pointer ${
                      idx === activeIndex
                        ? "w-8 bg-foreground"
                        : "w-2 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors cursor-pointer"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors cursor-pointer"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Company Logos Marquee Label */}
        <div className="mt-24 pt-12 border-t border-foreground/10">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8 text-center">
            Trusted by forward-thinking teams
          </p>
        </div>
      </div>
      
      {/* Full-width marquee outside container */}
      <div className="w-full">
        <div className="flex gap-16 items-center marquee hover:[animation-play-state:paused] cursor-pointer">
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex gap-16 items-center shrink-0">
              {["Meridian Labs", "Flux Systems", "Beacon AI", "Prism Analytics", "Nova Tech", "Quantum Corp", "Atlas Digital", "Vertex Labs"].map(
                (company) => (
                  <span
                    key={`${setIdx}-${company}`}
                    className="font-display text-xl md:text-2xl text-foreground/30 whitespace-nowrap hover:text-foreground transition-colors duration-300"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
