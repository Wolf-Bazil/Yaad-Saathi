import React, { useState } from 'react';
import SiteHeader from './components/SiteHeader';
import AgentHero from './components/AgentHero';
import DisparityBento from './components/DisparityBento';
import ClinicalPillars from './components/ClinicalPillars';
import AiArchitectureSection from './components/AiArchitectureSection';
import TelemetryPreview from './components/TelemetryPreview';
import OfflineEngineSection from './components/OfflineEngineSection';
import DemoScriptRunner from './components/DemoScriptRunner';
import ResearchCitations from './components/ResearchCitations';
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
    <div className="min-h-screen bg-paper text-charcoal-900 flex flex-col">
      {/* Top Floating Glass Navigation */}
      <SiteHeader isMuted={isMuted} toggleMute={toggleMute} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Interactive Dual-Mode Stage */}
        <AgentHero />

        {/* The Ground Reality in NER (Bento Grid) */}
        <DisparityBento />

        {/* The 4 Clinically Validated Cognitive Stimulation Pillars */}
        <ClinicalPillars />

        {/* Two-Layer AI & Psychometric Engine */}
        <AiArchitectureSection />

        {/* Caregiver & ASHA Worker Clinical Telemetry */}
        <TelemetryPreview />

        {/* The Airplane Mode Kill-Test & Offline Engine */}
        <OfflineEngineSection />

        {/* The 3-Minute SIH Hackathon Jury Walkthrough */}
        <DemoScriptRunner />

        {/* Verified Research & Clinical Citations */}
        <ResearchCitations />
      </main>

      {/* Global High-Craft Footer */}
      <SiteFooter />
    </div>
  );
}
