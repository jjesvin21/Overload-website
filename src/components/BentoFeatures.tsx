import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Download, Award, Zap, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BentoFeaturesProps {
  soundEnabled: boolean;
}

export const BentoFeatures: React.FC<BentoFeaturesProps> = ({ soundEnabled }) => {
  const [privacyEnabled, setPrivacyEnabled] = useState(true);
  const [testWeight, setTestWeight] = useState(100);
  const [testReps, setTestReps] = useState(8);

  // Trigger PR Celebration Confetti
  const triggerPRCelebration = () => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5 note
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch (e) {
        // Audio fallback
      }
    }

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FC4C02', '#D4AF37', '#ffffff'],
    });
  };

  // CSV Export Download Simulation
  const handleDownloadSampleCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Date,Exercise,Set,Weight_KG,Reps,RPE,PR_Achieved,Split\n' +
      '2026-08-27,Barbell Bench Press,1,100.0,8,8,NO,Push\n' +
      '2026-08-27,Barbell Bench Press,2,102.5,8,9,YES,Push\n' +
      '2026-08-27,Incline Dumbbell Press,1,36.0,10,8.5,NO,Push\n' +
      '2026-08-27,Overhead Press,1,65.0,6,9,YES,Push';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'OVERLOAD_Workout_Export_Sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculated1RM = Math.round(testWeight * (1 + testReps / 30));

  return (
    <section id="features" className="py-28 px-6 md:px-12 bg-charcoal relative border-t border-white/10">
      {/* Background Liquid Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FC4C02]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FC4C02]/10 border border-[#FC4C02]/30 text-[#FC4C02] font-mono text-xs uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            ENGINEERED FOR HIGH PERFORMANCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            A TECHNICAL COCKPIT FOR YOUR <span className="text-[#FC4C02] text-glow-orange">TRAINING</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 font-normal">
            Everything required to smash personal records and quantify progressive overload. Zero bloat, zero cloud dependency.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Progressive Overload Engine */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden space-y-6">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FC4C02]/15 blur-[50px] rounded-full group-hover:bg-[#FC4C02]/25 transition-colors" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#FC4C02]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                Progressive Overload Engine
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Intelligent mid-set overlays calculate target weight and rep jumps from historical maxes.
              </p>
            </div>

            {/* Interactive Overload Mini Slider */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">BENCH PRESS TARGET</span>
                <span className="text-[#FC4C02] font-bold">1RM: {calculated1RM} kg</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-300 font-mono">
                  <span>Weight: {testWeight} kg</span>
                  <span>Reps: {testReps}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="range"
                    min="60"
                    max="180"
                    value={testWeight}
                    onChange={(e) => setTestWeight(Number(e.target.value))}
                    className="w-full accent-[#FC4C02] cursor-pointer"
                  />
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={testReps}
                    onChange={(e) => setTestReps(Number(e.target.value))}
                    className="w-full accent-[#FC4C02] cursor-pointer"
                  />
                </div>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 bg-zinc-900/90 p-2 rounded flex justify-between">
                <span>Last Session: 97.5 kg x 8</span>
                <span className="text-[#2DCC71] font-bold">+2.5 kg Overload</span>
              </div>
            </div>
          </div>

          {/* Card 2: Local Privacy First (2 Columns) */}
          <div className="glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-between group relative overflow-hidden space-y-6">
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#2DCC71]/10 blur-[60px] rounded-full group-hover:bg-[#2DCC71]/20 transition-colors" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#2DCC71]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                  Local-First Encrypted Vault
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Your training records belong solely to you. Stored locally via SQLite with zero cloud dependencies or mandatory tracking accounts.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                    <Check className="w-4 h-4 text-[#2DCC71]" /> 100% Offline Capable
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                    <Check className="w-4 h-4 text-[#2DCC71]" /> Instant Load Speeds (&lt;10ms)
                  </div>
                </div>
              </div>

              {/* Interactive Privacy Toggle Panel */}
              <div className="p-6 rounded-xl bg-black/70 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-zinc-300">LOCAL VAULT MODE</span>
                  <button
                    onClick={() => setPrivacyEnabled(!privacyEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                      privacyEnabled ? 'bg-[#2DCC71] justify-end' : 'bg-zinc-700 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-black shadow" />
                  </button>
                </div>
                <div className="font-mono text-xs p-3 rounded bg-zinc-900 border border-white/5 space-y-1">
                  <div className="text-zinc-400">Database Engine: <span className="text-white">Android Room / SQLite</span></div>
                  <div className="text-zinc-400">Cloud Sync: <span className="text-[#2DCC71]">DISABLED (Zero Leak)</span></div>
                  <div className="text-zinc-400">Encryption: <span className="text-white">AES-256 Local Key</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Universal CSV Export (2 Columns) */}
          <div className="glass-card p-8 rounded-2xl md:col-span-2 flex flex-col justify-between group relative overflow-hidden space-y-6">
            <div className="absolute top-1/2 -left-10 w-48 h-48 bg-[#D4AF37]/10 blur-[60px] rounded-full group-hover:bg-[#D4AF37]/20 transition-colors" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                  Universal CSV Export
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Export complete workout histories seamlessly to CSV format. Analyze trends in Excel, Google Sheets, Claude AI, or custom Python pipelines.
                </p>
                <button
                  onClick={handleDownloadSampleCSV}
                  className="px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-xs uppercase flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Sample CSV
                </button>
              </div>

              {/* Code Snippet Box */}
              <div className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto space-y-1">
                <div className="text-zinc-500">// Structured CSV Schema</div>
                <div className="text-[#FC4C02]">Date,Exercise,Set,Weight_KG,Reps,RPE</div>
                <div className="text-zinc-300">2026-08-27,Squat,1,140.0,5,8</div>
                <div className="text-zinc-300">2026-08-27,Squat,2,145.0,5,8.5</div>
                <div className="text-[#2DCC71]">2026-08-27,Squat,3,150.0,5,9.5 [PR]</div>
              </div>
            </div>
          </div>

          {/* Card 4: PR Gold Recognition & Sound */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden space-y-6">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#D4AF37]/15 blur-[40px] rounded-full group-hover:bg-[#D4AF37]/25 transition-colors" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                PR Recognition Vault
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Automatic multi-rep record detection with visual gold accents & celebratory haptics.
              </p>
            </div>

            <button
              onClick={triggerPRCelebration}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FC4C02] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 box-glow-gold cursor-pointer"
            >
              <Award className="w-4 h-4" /> TEST PR CELEBRATION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
