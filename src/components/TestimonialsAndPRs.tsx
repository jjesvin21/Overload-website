import React from 'react';
import { Award, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const TestimonialsAndPRs: React.FC = () => {
  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Powerlifter & Track Athlete',
      quote:
        'Overload eliminated all the cluttered bloat of traditional fitness apps. Seeing my historical PR targets right before my top set helped me add 15kg to my total in 6 weeks.',
      metric: '+15 kg Total PR',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Hybrid Athlete',
      quote:
        'The local privacy model is unmatched. My data stays strictly on my phone, and exporting CSVs directly to my trainer’s Claude pipeline takes literally two taps.',
      metric: '100% Privacy',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'David Chen',
      role: 'Bodybuilding Competitor',
      quote:
        'The annual consistency heatmap keeps me accountable every single day. The Liquid Glass aesthetic is hands down the cleanest interface in any fitness app.',
      metric: '365 Day Streak',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section id="prs" className="py-28 px-6 md:px-12 bg-black relative border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-xs uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            ATHLETE WALL OF FAME
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            TRUSTED BY <span className="text-[#D4AF37]">SERIOUS ATHLETES</span>
          </h2>
          <p className="text-base text-zinc-400 font-normal">
            Designed for lifters who prioritize performance metrics, privacy, and continuous overload progression.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl space-y-6 flex flex-col justify-between relative group">
              <Quote className="w-8 h-8 text-[#FC4C02]/40" />

              <p className="text-sm text-zinc-300 leading-relaxed font-normal italic">
                "{item.quote}"
              </p>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#FC4C02]/40"
                  />
                  <div>
                    <div className="font-bold text-sm text-white">{item.name}</div>
                    <div className="text-[11px] font-mono text-zinc-400">{item.role}</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-mono text-xs font-bold border border-[#D4AF37]/30">
                  {item.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Release Notes Spotlight Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-[#FC4C02] font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> RELEASE HIGHLIGHTS
            </div>
            <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
              LIQUID GLASS & SPLITS ENGINE UPDATE
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DCC71]" /> Refactored Groups to "Splits"
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DCC71]" /> Time-based CSV Export Filtering
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DCC71]" /> Real-time GitHub Heatmap Volume
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2DCC71]" /> Sunset Rose / Strava Glass Theme
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-6 rounded-2xl bg-black border border-white/10 text-center space-y-2 box-glow-orange w-full">
              <div className="font-mono text-xs text-zinc-400">CURRENT ENGINE VERSION</div>
              <div className="font-mono text-3xl font-extrabold text-[#FC4C02]">LATEST</div>
              <div className="font-mono text-[11px] text-[#2DCC71]">STABLE PRODUCTION BUILD</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
