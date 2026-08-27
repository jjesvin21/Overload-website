import React from 'react';
import { X, Smartphone, Download } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const apkUrl = "https://github.com/jjesvin21/Overload/releases/download/v1.0.0/app-release.apk";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FC4C02]/20 flex items-center justify-center border border-[#FC4C02]/40 text-[#FC4C02]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-white uppercase tracking-tight">DOWNLOAD OVERLOAD</h3>
              <p className="font-mono text-xs text-zinc-400">OFFICIAL ANDROID RELEASE</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Box */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-5">
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#2DCC71] font-bold uppercase">
              Android APK (v1.0.0 Direct Download)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal">
              Download the standalone signed APK file directly. Instant installation, zero subscriptions, 100% local privacy model.
            </p>
          </div>

          <a
            href={apkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-[#FC4C02] hover:bg-[#e04300] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-[#FC4C02]/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" /> Download Official APK (v1.0.0)
          </a>
        </div>
      </div>
    </div>
  );
};
