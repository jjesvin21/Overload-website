import React, { useState } from 'react';
import { Calculator, Target, Sparkles } from 'lucide-react';

export const OverloadCalculator: React.FC = () => {
  const [exercise, setExercise] = useState('Bench Press');
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(8);
  const [rpe, setRpe] = useState(8.5);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  // Epley 1RM Formula: Weight * (1 + Reps/30)
  const epley1RM = Math.round(weight * (1 + reps / 30));
  // Brzycki 1RM Formula: Weight * (36 / (37 - Reps))
  const brzycki1RM = Math.round(weight * (36 / (37 - reps)));

  const recommendedMicroLoad = Math.round((weight + (unit === 'kg' ? 2.5 : 5)) * 10) / 10;
  const recommendedReps = reps + 1;

  return (
    <section id="calculator" className="py-28 px-6 md:px-12 bg-charcoal relative border-t border-white/10">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FC4C02]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FC4C02]/10 border border-[#FC4C02]/30 text-[#FC4C02] font-mono text-xs uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" />
            1RM & OVERLOAD SIMULATOR
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            CALCULATE YOUR NEXT <span className="text-[#FC4C02] text-glow-orange">OVERLOAD TARGET</span>
          </h2>
          <p className="text-base text-zinc-400 font-normal">
            Input your current working set weight and reps to predict your true 1-Rep Max and generate next session targets.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Input Card */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-sm font-bold text-white uppercase">INPUT WORKING SET DATA</span>
              <div className="flex bg-zinc-900 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setUnit('kg')}
                  className={`px-3 py-1 font-mono text-xs rounded transition-all cursor-pointer ${
                    unit === 'kg' ? 'bg-[#FC4C02] text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  KG
                </button>
                <button
                  onClick={() => setUnit('lbs')}
                  className={`px-3 py-1 font-mono text-xs rounded transition-all cursor-pointer ${
                    unit === 'lbs' ? 'bg-[#FC4C02] text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  LBS
                </button>
              </div>
            </div>

            {/* Exercise Selector */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-zinc-400 uppercase">EXERCISE NAME</label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-[#FC4C02] focus:outline-none"
              >
                <option value="Bench Press">Barbell Bench Press</option>
                <option value="Barbell Squat">Barbell Squat</option>
                <option value="Deadlift">Conventional Deadlift</option>
                <option value="Overhead Press">Standing Overhead Press</option>
                <option value="Incline Dumbbell Press">Incline Dumbbell Press</option>
                <option value="Barbell Row">Barbell Pendlay Row</option>
              </select>
            </div>

            {/* Weight Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-zinc-400 uppercase">WORKING WEIGHT</span>
                <span className="text-[#FC4C02] font-bold text-base">
                  {weight} {unit}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="2.5"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#FC4C02] cursor-pointer"
              />
            </div>

            {/* Reps Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-zinc-400 uppercase">REPETITIONS</span>
                <span className="text-white font-bold text-base">{reps} REPS</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="w-full accent-[#FC4C02] cursor-pointer"
              />
            </div>

            {/* RPE Slider */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-zinc-400 uppercase">RPE (RATING OF PERCEIVED EXERTION)</span>
                <span className="text-[#D4AF37] font-bold text-base">RPE {rpe}</span>
              </div>
              <input
                type="range"
                min="6"
                max="10"
                step="0.5"
                value={rpe}
                onChange={(e) => setRpe(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="text-[11px] font-mono text-zinc-500 flex justify-between">
                <span>RPE 6 (Easy)</span>
                <span>RPE 8 (2 Reps Left)</span>
                <span>RPE 10 (Max Out)</span>
              </div>
            </div>
          </div>

          {/* Results Output Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card-orange p-6 sm:p-8 rounded-2xl space-y-6">
              <div className="flex items-center gap-2 text-[#FC4C02] font-mono text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4" /> ESTIMATED 1-REP MAX (1RM)
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
                  <div className="font-mono text-xs text-zinc-400">EPLEY FORMULA</div>
                  <div className="font-mono text-3xl font-black text-white">
                    {epley1RM} <span className="text-sm font-normal text-zinc-400">{unit}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1">
                  <div className="font-mono text-xs text-zinc-400">BRZYCKI FORMULA</div>
                  <div className="font-mono text-3xl font-black text-[#D4AF37]">
                    {brzycki1RM} <span className="text-sm font-normal text-zinc-400">{unit}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Next Session Target */}
              <div className="p-5 rounded-xl bg-black/80 border border-[#FC4C02]/40 space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-300 uppercase flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-[#FC4C02]" /> NEXT SESSION OVERLOAD STRATEGY
                  </span>
                  <span className="text-[#2DCC71] font-bold">RECOMMENDED</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-zinc-900/90 border border-white/10 space-y-1">
                    <div className="font-mono text-[11px] text-zinc-400">OPTION A: MICRO-LOAD</div>
                    <div className="font-mono text-lg font-bold text-white flex items-center justify-between">
                      <span>{recommendedMicroLoad} {unit}</span>
                      <span className="text-xs text-[#2DCC71]">x {reps} reps</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-900/90 border border-white/10 space-y-1">
                    <div className="font-mono text-[11px] text-zinc-400">OPTION B: REP PROGRESSION</div>
                    <div className="font-mono text-lg font-bold text-white flex items-center justify-between">
                      <span>{weight} {unit}</span>
                      <span className="text-xs text-[#FC4C02]">x {recommendedReps} reps</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-Week Projected Strength Trend */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-zinc-400 flex items-center justify-between">
                  <span>PROJECTED 4-WEEK PROGRESSION</span>
                  <span className="text-[#2DCC71]">+7.5% Strength Gain</span>
                </div>
                <div className="h-16 flex items-end gap-2 pt-2">
                  {[
                    { week: 'W1', val: weight },
                    { week: 'W2', val: weight + (unit === 'kg' ? 2.5 : 5) },
                    { week: 'W3', val: weight + (unit === 'kg' ? 5 : 10) },
                    { week: 'W4 (PR)', val: weight + (unit === 'kg' ? 7.5 : 15) },
                  ].map((bar, i) => (
                    <div key={bar.week} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          i === 3 ? 'bg-[#FC4C02] shadow-lg shadow-[#FC4C02]/50' : 'bg-zinc-800'
                        }`}
                        style={{ height: `${40 + i * 15}%` }}
                      />
                      <span className="font-mono text-[10px] text-zinc-400">{bar.week}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
