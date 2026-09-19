import React, { useState } from 'react';
import SiteHeader from './components/SiteHeader';
import HeroSection from './components/HeroSection';
import RegionalReality from './components/RegionalReality';
import ClinicalTherapy from './components/ClinicalTherapy';
import OfflineEngine from './components/OfflineEngine';
import CaregiverTelemetry from './components/CaregiverTelemetry';
import FieldWalkthrough from './components/FieldWalkthrough';
import ResearchEvidence from './components/ResearchEvidence';
import SiteFooter from './components/SiteFooter';
import { sound } from './lib/audio';

export default function App() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
  };

  return (
    <div className="min-h-screen bg-paper text-charcoal-900 flex flex-col font-sans selection:bg-tea-600 selection:text-white antialiased">
      {/* Navigation Header */}
      <SiteHeader isMuted={isMuted} toggleMute={toggleMute} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero with Interactive Dual-Mode Stage */}
        <HeroSection />

        {/* 2. The Ground Reality in North East India */}
        <RegionalReality />

        {/* 3. The 4 Clinically Validated Cognitive Stimulation Therapy (CST) Pillars */}
        <ClinicalTherapy />

        {/* 4. The Offline Engine & Edge ML Architecture */}
        <OfflineEngine />

        {/* 5. Caregiver & ASHA Worker Clinical Telemetry Hub */}
        <CaregiverTelemetry />

        {/* 6. Step-by-Step Field Walkthrough */}
        <FieldWalkthrough />

        {/* 7. Peer-Reviewed Research & Clinical Citations */}
        <ResearchEvidence />
      </main>

      {/* Dignified Footer */}
      <SiteFooter />
    </div>
  );
}
