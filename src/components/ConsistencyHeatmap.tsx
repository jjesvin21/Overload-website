import React, { useState, useMemo } from 'react';
import { Calendar, Flame, Trophy, Activity, Info, BarChart2 } from 'lucide-react';

interface DayData {
  date: string;
  count: number; // 0 to 4 intensity level
  volume: number; // kg
  sets: number;
  prs: number;
  split: string;
}

export const ConsistencyHeatmap: React.FC = () => {
  const [activeCell, setActiveCell] = useState<DayData | null>(null);

  // Generate 52 weeks x 7 days dataset
  const heatmapData = useMemo(() => {
    const days: DayData[] = [];
    const splits = ['Push', 'Pull', 'Legs', 'Upper', 'Lower'];

    // Seed pseudo-random workout history for consistent demo
    for (let i = 0; i < 364; i++) {
      const monthIdx = Math.floor(i / 30);
      const dayNum = (i % 30) + 1;
      const dateStr = `2026-${String(monthIdx + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

      // Simulate training schedule (e.g. 4-5 days per week)
      const dayOfWeek = i % 7;
      const isRestDay = dayOfWeek === 2 || dayOfWeek === 6;

      if (isRestDay && Math.random() > 0.15) {
        days.push({ date: dateStr, count: 0, volume: 0, sets: 0, prs: 0, split: 'Rest' });
      } else {
        const intensity = Math.floor(Math.random() * 4) + 1;
        const volume = Math.floor(Math.random() * 8000) + 12000;
        const sets = Math.floor(Math.random() * 8) + 12;
        const prs = Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0;
        const split = splits[i % splits.length];

        days.push({ date: dateStr, count: intensity, volume, sets, prs, split });
      }
    }
    return days;
  }, []);

  // Stats calculation
  const totalVolume = useMemo(() => heatmapData.reduce((acc, curr) => acc + curr.volume, 0), [heatmapData]);
  const activeDays = useMemo(() => heatmapData.filter((d) => d.count > 0).length, [heatmapData]);
  const totalPRs = useMemo(() => heatmapData.reduce((acc, curr) => acc + curr.prs, 0), [heatmapData]);
  const consistencyRate = Math.round((activeDays / 364) * 100);

  // Cell Color mapping
  const getCellBg = (count: number) => {
    switch (count) {
      case 1:
        return 'bg-[#FC4C02]/25 border border-[#FC4C02]/30';
      case 2:
        return 'bg-[#FC4C02]/50 border border-[#FC4C02]/50';
      case 3:
        return 'bg-[#FC4C02]/75 shadow-sm shadow-[#FC4C02]/40';
      case 4:
        return 'bg-[#FC4C02] shadow-md shadow-[#FC4C02]/60';
      default:
        return 'bg-zinc-900/60 border border-white/5';
    }
  };

  return (
    <section id="heatmap" className="py-28 px-6 md:px-12 bg-black relative border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FC4C02]/10 border border-[#FC4C02]/30 text-[#FC4C02] font-mono text-xs uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" />
              ANNUAL CONSISTENCY MAP
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              CONSISTENCY IS <span className="text-[#FC4C02] text-glow-orange">KING.</span>
            </h2>
            <p className="text-base text-zinc-400 font-normal">
              Visualize volume output and training frequency across the entire year. Click any day square for granular set metrics.
            </p>
          </div>
        </div>

        {/* Heatmap Card Container */}
        <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <BarChart2 className="w-5 h-5 text-[#FC4C02]" />
              <span className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                TRAINING VOLUME HEATMAP (2026)
              </span>
            </div>

            {/* Intensity Legend */}
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span>Less</span>
              <div className="w-3.5 h-3.5 rounded-sm bg-zinc-900 border border-white/10" />
              <div className="w-3.5 h-3.5 rounded-sm bg-[#FC4C02]/25" />
              <div className="w-3.5 h-3.5 rounded-sm bg-[#FC4C02]/50" />
              <div className="w-3.5 h-3.5 rounded-sm bg-[#FC4C02]/75" />
              <div className="w-3.5 h-3.5 rounded-sm bg-[#FC4C02]" />
              <span>More</span>
            </div>
          </div>

          {/* Grid Layout (52 Weeks Horizontal Scrollable Grid) */}
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[760px] space-y-2">
              {/* Months Header Row */}
              <div className="grid grid-cols-12 text-xs font-mono text-zinc-500 pl-6">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>

              {/* Day Grid Rows (7 rows for Mon-Sun) */}
              <div className="flex items-start gap-2">
                <div className="flex flex-col justify-between h-[112px] font-mono text-[10px] text-zinc-500 pr-2">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>

                <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-1">
                  {heatmapData.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCell(day)}
                      className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 cursor-pointer ${getCellBg(
                        day.count
                      )} ${activeCell?.date === day.date ? 'ring-2 ring-white scale-125' : ''}`}
                      title={`${day.date}: ${day.volume.toLocaleString()} kg (${day.sets} sets)`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Cell Inspector Footer */}
          {activeCell ? (
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-[#FC4C02]/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FC4C02]/20 flex items-center justify-center border border-[#FC4C02]/40 text-[#FC4C02]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-zinc-400">INSPECTING SESSION DATA</div>
                  <div className="font-mono text-sm font-bold text-white">{activeCell.date} — {activeCell.split} Split</div>
                </div>
              </div>
              <div className="flex items-center gap-6 font-mono text-xs">
                <div>
                  <span className="text-zinc-400">Volume: </span>
                  <span className="text-[#FC4C02] font-bold">{activeCell.volume.toLocaleString()} kg</span>
                </div>
                <div>
                  <span className="text-zinc-400">Sets: </span>
                  <span className="text-white font-bold">{activeCell.sets}</span>
                </div>
                <div>
                  <span className="text-zinc-400">PRs: </span>
                  <span className="text-[#D4AF37] font-bold">{activeCell.prs} records</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 text-center font-mono text-xs text-zinc-500 flex items-center justify-center gap-2">
              <Info className="w-4 h-4 text-[#FC4C02]" /> Click any day block above to inspect session volume & personal records.
            </div>
          )}
        </div>

        {/* Summary Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#FC4C02]" /> TOTAL VOLUME LOGGED
            </div>
            <div className="font-mono text-2xl font-black text-white">
              {(totalVolume / 1000).toFixed(1)}k <span className="text-xs text-zinc-400">kg</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#FC4C02]" /> ACTIVE WORKOUTS
            </div>
            <div className="font-mono text-2xl font-black text-white">
              {activeDays} <span className="text-xs text-zinc-400">sessions</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" /> PRS UNLOCKED
            </div>
            <div className="font-mono text-2xl font-black text-[#D4AF37]">
              {totalPRs} <span className="text-xs text-zinc-400">records</span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-1">
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#2DCC71]" /> CONSISTENCY RATE
            </div>
            <div className="font-mono text-2xl font-black text-[#2DCC71]">
              {consistencyRate}% <span className="text-xs text-zinc-400">annual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
