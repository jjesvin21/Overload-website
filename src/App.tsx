import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoFeatures } from './components/BentoFeatures';
import { ConsistencyHeatmap } from './components/ConsistencyHeatmap';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';

export function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-black text-[#e5e2e1] font-sans selection:bg-[#FC4C02] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenDownload={() => setDownloadOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Sections */}
      <main>
        <Hero
          onOpenDownload={() => setDownloadOpen(true)}
        />
        <BentoFeatures soundEnabled={soundEnabled} />
        <ConsistencyHeatmap />
      </main>

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenDownload={() => setDownloadOpen(true)} />
    </div>
  );
}

export default App;
