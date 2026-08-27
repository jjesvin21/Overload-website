import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

interface SetLog {
  id: string;
  setNum: number;
  weight: number;
  reps: number;
  rpe: number;
  isPR: boolean;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ isOpen, onClose, soundEnabled }) => {
  const [selectedExercise, setSelectedExercise] = useState('Incline Barbell Bench Press');
  const [sets, setSets] = useState<SetLog[]>([
    { id: '1', setNum: 1, weight: 80, reps: 10, rpe: 7.5, isPR: false },
    { id: '2', setNum: 2, weight: 85, reps: 8, rpe: 8.5, isPR: false },
  ]);

  const [inputWeight, setInputWeight] = useState(90);
  const [inputReps, setInputReps] = useState(8);
  const [inputRpe, setInputRpe] = useState(9);
  const [prBanner, setPrBanner] = useState<string | null>(null);

  // Timer ticker simulation
  const [seconds, setSeconds] = useState(2534);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAddSet = () => {
    const newSetNum = sets.length + 1;
    const isPR = inputWeight >= 90;

    const newSet: SetLog = {
      id: Date.now().toString(),
      setNum: newSetNum,
      weight: inputWeight,
      reps: inputReps,
      rpe: inputRpe,
      isPR,
    };

    setSets([...sets, newSet]);

    if (isPR) {
      setPrBanner(`NEW PERSONAL RECORD! ${inputWeight} kg x ${inputReps} REPS (+5.0 kg Overload)`);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FC4C02', '#D4AF37', '#ffffff'],
      });

      if (soundEnabled) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.25); // C6
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        } catch (e) {}
      }

      setTimeout(() => setPrBanner(null), 4000);
    }
  };

  const handleDeleteSet = (id: string) => {
    setSets(sets.filter((s) => s.id !== id));
  };

  const totalVolume = sets.reduce((acc, curr) => acc + curr.weight * curr.reps, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Container Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0e0e0e] border border-white/15 rounded-3xl overflow-hidden shadow-2xl space-y-0">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#FC4C02] animate-ping" />
            <div>
              <div className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                OVERLOAD COCKPIT DEMO <span className="text-[#FC4C02] font-mono text-[10px]">[LIVE]</span>
              </div>
              <div className="font-mono text-[11px] text-zinc-400">
                ACTIVE WORKOUT TIMER: <span className="text-[#2DCC71]">{formatTimer(seconds)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PR Banner Alert */}
        {prBanner && (
          <div className="bg-gradient-to-r from-[#FC4C02] to-[#D4AF37] text-black px-6 py-2.5 font-mono text-xs font-extrabold flex items-center justify-between animate-bounce">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" /> {prBanner}
            </span>
            <Sparkles className="w-4 h-4" />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Exercise Selector */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-zinc-400 uppercase">SELECT EXERCISE TO LOG</label>
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-[#FC4C02] focus:outline-none"
            >
              <option value="Incline Barbell Bench Press">Incline Barbell Bench Press</option>
              <option value="Weighted Pull Ups">Weighted Pull Ups (+15 kg)</option>
              <option value="Dumbbell Lateral Raise">Dumbbell Lateral Raise</option>
              <option value="Romanian Deadlift">Romanian Deadlift</option>
            </select>
          </div>

          {/* Active Sets Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
              <span>COMPLETED SETS ({sets.length})</span>
              <span>TOTAL VOLUME: <span className="text-[#FC4C02] font-bold">{totalVolume.toLocaleString()} kg</span></span>
            </div>

            <div className="space-y-2">
              {sets.map((s) => (
                <div
                  key={s.id}
                  className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs transition-all ${
                    s.isPR
                      ? 'bg-[#FC4C02]/15 border-[#FC4C02]/60 text-white'
                      : 'bg-zinc-900/80 border-white/10 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-[11px] text-zinc-400">
                      #{s.setNum}
                    </span>
                    <span className="font-bold text-sm text-white">
                      {s.weight} kg <span className="text-zinc-400 font-normal">x</span> {s.reps} reps
                    </span>
                    {s.isPR && (
                      <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-black font-extrabold text-[10px]">
                        PR UNLOCKED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">RPE {s.rpe}</span>
                    <button
                      onClick={() => handleDeleteSet(s.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input New Set Bar */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
            <div className="font-mono text-xs font-bold text-zinc-300 uppercase">LOG NEXT SET</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-mono text-[10px] text-zinc-400 uppercase">WEIGHT (KG)</label>
                <input
                  type="number"
                  value={inputWeight}
                  onChange={(e) => setInputWeight(Number(e.target.value))}
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-[#FC4C02]"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-zinc-400 uppercase">REPS</label>
                <input
                  type="number"
                  value={inputReps}
                  onChange={(e) => setInputReps(Number(e.target.value))}
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-[#FC4C02]"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-zinc-400 uppercase">RPE</label>
                <input
                  type="number"
                  step="0.5"
                  value={inputRpe}
                  onChange={(e) => setInputRpe(Number(e.target.value))}
                  className="w-full bg-black border border-white/15 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-[#FC4C02]"
                />
              </div>
            </div>

            <button
              onClick={handleAddSet}
              className="w-full py-3 rounded-xl bg-[#FC4C02] hover:bg-[#e04300] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all box-glow-orange"
            >
              <Plus className="w-4 h-4" /> LOG SET TO LOCAL VAULT
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-zinc-900/90 border-t border-white/10 flex justify-between items-center">
          <div className="font-mono text-[11px] text-zinc-400">
            LOCAL STORAGE: <span className="text-[#2DCC71]">0.4 MB / 100% OFFLINE</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 text-white font-mono text-xs hover:bg-zinc-700 transition-colors"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
