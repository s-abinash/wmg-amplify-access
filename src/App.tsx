import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  Eye, 
  Ear, 
  Mic2, 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  Settings, 
  Play, 
  Activity,
  Heart,
  Music,
  User,
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react';

// --- Types ---
interface UserProfile {
  name: string;
  needs: string[];
  sensoryProfile: {
    sensitivity: "low" | "medium" | "high";
    triggers: string[];
  };
  speechGoals: string[];
  visualPreference: "high-contrast" | "standard" | "dark";
}

const INITIAL_PROFILE: UserProfile = {
  name: "",
  needs: [],
  sensoryProfile: {
    sensitivity: "medium",
    triggers: [],
  },
  speechGoals: [],
  visualPreference: "standard",
};

// --- Components ---

const Onboarding = ({ onComplete }: { onComplete: (profile: UserProfile) => void }) => {
  const [step, setStep] = useState<'entry' | 'setup'>('entry');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  const handleComplete = () => {
    onComplete(profile);
  };

  if (step === 'entry') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl mx-auto flex items-center justify-center border border-white/20 shadow-2xl"
            >
              <Music className="w-12 h-12 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            >
              Music Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Barriers</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-zinc-400 max-w-lg mx-auto"
            >
              Experience the WMG catalog adapted perfectly to your sensory, cognitive, and linguistic preferences.
            </motion.p>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => setStep('setup')}
              className="px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-lg hover:bg-zinc-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5" /> Personalize My Experience
            </button>
            <button 
              onClick={handleComplete}
              className="px-8 py-4 bg-white/10 text-white backdrop-blur-md border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Continue with Default <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED] p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Accessibility Setup</h2>
          <p className="text-zinc-500">Configure your personal adaptation layer.</p>
        </div>

        <div className="space-y-8">
          {/* Hearing Mode */}
          <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Ear className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Hearing Mode</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['Standard', 'Enhanced Bass', 'Reduced Sensory', 'Haptic Mode'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setProfile(p => ({ ...p, needs: p.needs.includes(opt) ? p.needs.filter(n => n !== opt) : [...p.needs, opt] }))}
                  className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left ${
                    profile.needs.includes(opt)
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-zinc-50 text-zinc-600 border-black/5 hover:border-blue-500/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Language Mode */}
          <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Language Mode</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['Original', 'Emotion Translation', 'Singable Localization', 'Dual Lyrics View'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setProfile(p => ({ ...p, needs: p.needs.includes(opt) ? p.needs.filter(n => n !== opt) : [...p.needs, opt] }))}
                  className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left ${
                    profile.needs.includes(opt)
                    ? 'bg-rose-600 text-white border-rose-600 shadow-lg'
                    : 'bg-zinc-50 text-zinc-600 border-black/5 hover:border-rose-500/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Cognitive Mode */}
          <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Cognitive Mode</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Focus Mode', 'Calm Mode', 'Simplified Lyrics'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setProfile(p => ({ ...p, needs: p.needs.includes(opt) ? p.needs.filter(n => n !== opt) : [...p.needs, opt] }))}
                  className={`p-4 rounded-2xl border text-sm font-bold transition-all text-left ${
                    profile.needs.includes(opt)
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                    : 'bg-zinc-50 text-zinc-600 border-black/5 hover:border-emerald-500/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <button 
            onClick={handleComplete}
            className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl flex items-center gap-2"
          >
            Create Profile & Enter <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ title, icon: Icon, description, color, onClick, active }: any) => {
  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-500 ring-emerald-500/20',
    blue: 'bg-blue-50 text-blue-600 border-blue-500 ring-blue-500/20',
    orange: 'bg-orange-50 text-orange-600 border-orange-500 ring-orange-500/20',
    purple: 'bg-purple-50 text-purple-600 border-purple-500 ring-purple-500/20',
    rose: 'bg-rose-50 text-rose-600 border-rose-500 ring-rose-500/20',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-6 rounded-3xl border text-left transition-all duration-300 ${
        active 
        ? `bg-white ${colorClasses[color].split(' ').slice(2).join(' ')} shadow-lg ring-2` 
        : 'bg-white border-black/5 hover:border-black/10 shadow-sm'
      }`}
    >
      <div className={`w-12 h-12 rounded-2xl ${colorClasses[color].split(' ').slice(0, 2).join(' ')} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-zinc-900 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
      {active && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 className={`w-5 h-5 ${colorClasses[color].split(' ')[1]}`} />
        </div>
      )}
    </motion.button>
  );
};

const ModuleExperience = ({ module, profile, onBack, selectedSong }: { module: any, profile: UserProfile, onBack: () => void, selectedSong: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('Standard');
  const [insightIndex, setInsightIndex] = useState(0);
  const [lyricIndex, setLyricIndex] = useState(0);

  const colorClasses: Record<string, string> = {
    emerald: 'bg-emerald-600 text-emerald-500 border-emerald-500 ring-emerald-500/20',
    blue: 'bg-blue-600 text-blue-500 border-blue-500 ring-blue-500/20',
    orange: 'bg-orange-600 text-orange-500 border-orange-500 ring-orange-500/20',
    purple: 'bg-purple-600 text-purple-500 border-purple-500 ring-purple-500/20',
    rose: 'bg-rose-600 text-rose-500 border-rose-500 ring-rose-500/20',
  };

  const moduleInsights: Record<string, string[]> = {
    senseplay: [
      "High-frequency synth layers detected. Applying 8kHz low-pass filter for sensory safety.",
      "Sudden transient spike at 01:45 smoothed to maintain consistent dynamic range.",
      "Vocal stem enhanced by +3dB to improve focus and clarity against background layers.",
      "Rhythmic pulse alignment active: Sidechain compression anchoring attention to the beat."
    ],
    voicejourney: [
      "Target phoneme /s/ detected in chorus. Increasing vocal stem clarity for practice.",
      "BPM adjusted to 110% of original to match your current speech therapy pace.",
      "Real-time feedback active: Analyzing your pronunciation of 'start' against reference stem.",
      "Phoneme density is high in this section. Slowing playback by 10% for better articulation."
    ],
    soundcanvas: [
      "Bass frequencies mapped to deep haptic pulses (200ms) for rhythmic grounding.",
      "Melodic contour translated to chroma hue rotation: C-Major (Red) to G-Major (Blue).",
      "Vocal energy driving particle river flow speed. Visualizing emotional intensity.",
      "Drum onsets triggering geometric bursts. Kick = Circle, Snare = Triangle."
    ],
    stageforall: [
      "Strobe lighting detected in video stream. Applying real-time smoothing filter.",
      "Spatial audio active: Positioning artist center-stage with crowd surround at 360°.",
      "Audio description generated for instrumental break: 'Artist walks to the edge of the stage'.",
      "Crowd energy stem isolated and enhanced to provide social emotional context."
    ],
    lyricbridge: [
      "Simplified lyrics active: Rewriting complex metaphors for grade 3 reading level.",
      "Cultural context found: Explaining the 'Bed-Stuy' reference in the second verse.",
      "Sign notation generated for chorus: 'LOVE FIND WE PLACE HOPE NONE'.",
      "Emotional transcreation active: Preserving feeling over literal word-for-word translation."
    ]
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setInsightIndex((prev) => (prev + 1) % (moduleInsights[module.id]?.length || 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, module.id]);

  const getModes = () => {
    if (module.id === 'senseplay') return ['Calm', 'Focus', 'Sensory-Safe'];
    if (module.id === 'soundcanvas') return ['Visual Only', 'Haptic Only', 'Full Immersion'];
    if (module.id === 'voicejourney') return ['Practice', 'Challenge', 'Assessment'];
    if (module.id === 'stageforall') return ['Standard', 'Audio Described', 'Sensory Safe'];
    if (module.id === 'lyricbridge') return ['Simplified', 'Contextual', 'Sign Notation'];
    return ['Standard', 'Enhanced'];
  };

  const activeColor = colorClasses[module.color] || colorClasses.emerald;

  const renderVisualizer = () => {
    if (!isPlaying) {
      return (
        <div className="text-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-32 h-32 bg-zinc-800 rounded-3xl mx-auto mb-6 flex items-center justify-center"
          >
            <module.icon className={`w-12 h-12 ${activeColor.split(' ')[1]}`} />
          </motion.div>
          <h3 className="text-white font-bold text-xl">{module.title} Engine</h3>
          <p className="text-zinc-500 text-sm mt-2">Ready to process WMG Catalog Stems...</p>
          <button 
            onClick={() => setIsPlaying(true)}
            className="mt-8 px-8 py-3 bg-white text-zinc-900 rounded-xl font-bold hover:bg-zinc-100 transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-current" /> Initialize Session
          </button>
        </div>
      );
    }

    switch (module.id) {
      case 'senseplay':
        return (
          <div className="w-full max-w-md space-y-8 p-8 relative">
            <div className="flex justify-between items-center mb-8">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                {mode} Profile Active
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Live Demucs v4</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 h-48 items-end">
              {[
                { label: 'Vocals', active: true, color: 'bg-rose-400', height: [40, 80, 40] },
                { label: 'Drums', active: mode !== 'Calm', color: 'bg-blue-400', height: mode === 'Calm' ? 10 : [20, 90, 20] },
                { label: 'Bass', active: true, color: 'bg-emerald-400', height: [30, 60, 30] },
                { label: 'Other', active: mode !== 'Focus', color: 'bg-amber-400', height: mode === 'Focus' ? 10 : [20, 50, 20] }
              ].map((stem, i) => (
                <div key={i} className="flex flex-col items-center gap-4 relative group cursor-pointer">
                  {/* Stem Volume Slider (Visual) */}
                  <div className="w-12 h-full bg-white/5 rounded-2xl relative overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                    <motion.div 
                      animate={{ 
                        height: stem.active ? stem.height : 10,
                        opacity: stem.active ? 1 : 0.3
                      }}
                      transition={{ repeat: Infinity, duration: 1 + i * 0.2, ease: "easeInOut" }}
                      className={`absolute bottom-0 w-full ${stem.color} rounded-xl`}
                    />
                  </div>
                  
                  {/* Stem Label & Status */}
                  <div className="text-center">
                    <p className={`text-xs font-bold uppercase tracking-widest transition-colors ${stem.active ? 'text-white' : 'text-zinc-600'}`}>
                      {stem.label}
                    </p>
                    <p className="text-[9px] text-zinc-500 uppercase mt-1">
                      {stem.active ? 'Active' : 'Muted'}
                    </p>
                  </div>

                  {/* Hover Tooltip */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
                    {stem.active ? 'Adjust Volume' : 'Unmute Stem'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-emerald-400 font-bold mb-1">
                    {mode === 'Calm' ? 'High Frequencies Dampened' : mode === 'Focus' ? 'Background Noise Isolated' : 'Sensory-Safe Compression Applied'}
                  </p>
                  <p className="text-xs text-emerald-400/70 leading-relaxed">
                    {mode === 'Calm' ? 'Harsh cymbals and sharp vocal sibilance have been reduced by 12dB to prevent sensory overload.' : mode === 'Focus' ? 'Non-essential instruments muted to enhance vocal clarity and rhythmic structure.' : 'Dynamic range compressed to prevent sudden loud transients.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'soundcanvas':
        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Background Ambient Glow */}
            <motion.div 
              animate={{ 
                scale: mode === 'Full Immersion' ? [1, 1.5, 1] : [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                opacity: mode === 'Haptic Only' ? 0.1 : 0.4
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute w-[150%] h-[150%] bg-gradient-to-tr from-orange-500/30 via-purple-500/20 to-yellow-400/30 blur-[100px]"
            />

            {/* Central Visualizer */}
            <div className="relative z-10 flex items-center justify-center">
              {/* Outer Ring (Bass) */}
              <motion.div 
                animate={{ 
                  scale: mode === 'Haptic Only' ? 1 : [1, 1.2, 1],
                  borderColor: ['rgba(255,255,255,0.1)', 'rgba(249,115,22,0.5)', 'rgba(255,255,255,0.1)']
                }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="absolute w-64 h-64 border-4 rounded-full"
              />
              
              {/* Middle Ring (Mids/Vocals) */}
              <motion.div 
                animate={{ 
                  scale: mode === 'Haptic Only' ? 1 : [1, 1.1, 1],
                  borderColor: ['rgba(255,255,255,0.2)', 'rgba(168,85,247,0.6)', 'rgba(255,255,255,0.2)']
                }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="absolute w-48 h-48 border-4 rounded-full"
              />

              {/* Inner Core (Highs/Drums) */}
              <motion.div 
                animate={{ 
                  scale: mode === 'Haptic Only' ? 1 : [1, 1.3, 1],
                  backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(250,204,21,0.8)', 'rgba(255,255,255,0.1)']
                }}
                transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full backdrop-blur-md border border-white/30 shadow-[0_0_40px_rgba(250,204,21,0.4)]"
              />
            </div>

            {/* Particle Effects (Full Immersion Only) */}
            {mode === 'Full Immersion' && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: "50%", y: "50%", 
                      opacity: 0, scale: 0 
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}%`, 
                      y: `${Math.random() * 100}%`,
                      opacity: [0, 1, 0],
                      scale: [0, Math.random() * 2 + 1, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: Math.random() * 2 + 1,
                      delay: Math.random() * 2
                    }}
                    className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
                  />
                ))}
              </div>
            )}

            {/* Status Overlays */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${mode !== 'Visual Only' ? 'bg-orange-500 animate-pulse' : 'bg-zinc-600'}`} />
                <div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1">Haptic Engine</p>
                  <p className="text-xs text-white font-medium leading-none">{mode !== 'Visual Only' ? 'Syncing to Bass' : 'Disabled'}</p>
                </div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-1">Color Palette</p>
                  <p className="text-xs text-white font-medium leading-none">Synesthesia: Warm</p>
                </div>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'voicejourney':
        return (
          <div className="w-full max-w-md space-y-8 p-8 relative">
            <div className="flex justify-between items-center mb-8">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                {mode} Mode
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Listening</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Target Phoneme Selection */}
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-3 text-center">Target Phoneme</p>
                <div className="flex justify-center gap-3">
                  {['S', 'T', 'CH', 'TH'].map(p => (
                    <button 
                      key={p} 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl transition-all ${
                        p === 'S' 
                        ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110 border-2 border-blue-400' 
                        : 'bg-zinc-800/50 text-zinc-500 border border-white/5 hover:bg-zinc-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Pitch/Pronunciation Visualizer */}
              <div className="h-40 bg-zinc-900/80 rounded-3xl border border-white/10 p-4 relative overflow-hidden flex flex-col justify-end">
                {/* Target Zone Guide */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-blue-500/10 border-y border-blue-500/20" />
                
                <div className="flex items-end justify-between gap-1 h-full relative z-10">
                  {[...Array(30)].map((_, i) => {
                    const isRecent = i > 20;
                    const height = isRecent ? Math.random() * 60 + 20 : Math.random() * 20 + 10;
                    const isTargetHit = isRecent && height > 40 && height < 60;
                    
                    return (
                      <motion.div
                        key={i}
                        animate={{ height: `${height}%` }}
                        transition={{ repeat: Infinity, duration: 0.1, delay: i * 0.01 }}
                        className={`w-full rounded-t-sm ${
                          isTargetHit ? 'bg-emerald-400' : isRecent ? 'bg-blue-400' : 'bg-zinc-700'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Feedback & Instructions */}
              <div className="text-center space-y-2">
                <p className="text-white text-lg font-medium">
                  {mode === 'Practice' ? 'Sing along to the highlighted "S" sounds...' : mode === 'Challenge' ? 'Hit the target pitch for the "S" sound!' : 'Assessing your pronunciation...'}
                </p>
                <p className="text-blue-400/80 text-sm">
                  {mode === 'Practice' ? 'Focus on clear articulation.' : mode === 'Challenge' ? 'Keep it in the blue zone.' : 'Speak naturally.'}
                </p>
              </div>
            </div>
          </div>
        );
      case 'lyricbridge':
        const songLyrics = selectedSong.title === "Levitating" ? {
          lines: [
            { orig: "If you wanna run away with me, I know a galaxy", adapt: "If you want to leave with me, I know a special place" },
            { orig: "And I can take you for a ride", adapt: "And I can show you around" },
            { orig: "I had a premonition that we fell into a rhythm", adapt: "I had a feeling that we connected perfectly", highlight: "premonition" },
            { orig: "Where the music don't stop for life", adapt: "Where the fun never ends" }
          ],
          explanation: { word: "premonition", meaning: "A strong feeling that something is about to happen, used here to mean a strong intuition about their connection." }
        } : {
          lines: [
            { orig: "I'm in love with the shape of you", adapt: "I really like how you look" },
            { orig: "We push and pull like a magnet do", adapt: "We are drawn to each other like magnets", highlight: "magnet" },
            { orig: "Although my heart is falling too", adapt: "Even though I am falling in love" }
          ],
          explanation: { word: "magnet", meaning: "A piece of iron that attracts other iron. Used here to describe a strong, invisible attraction between two people." }
        };

        return (
          <div className="w-full h-full flex flex-col p-8 relative">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-rose-500/20">
                {mode} Mode Active
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8">
              {songLyrics.lines.map((line, idx) => {
                const isActive = idx === (selectedSong.title === "Levitating" ? 2 : 1);
                return (
                  <div key={idx} className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-30 blur-[1px] scale-95'}`}>
                    <p className="text-lg md:text-xl text-zinc-400 font-medium mb-2">
                      {line.orig.split(' ').map((word, wIdx) => {
                        const isHighlighted = line.highlight && word.toLowerCase().includes(line.highlight.toLowerCase());
                        return (
                          <span key={wIdx} className={isHighlighted ? 'text-rose-400 border-b border-dashed border-rose-400 pb-1 cursor-pointer' : ''}>
                            {word}{' '}
                          </span>
                        );
                      })}
                    </p>
                    {mode !== 'Standard' && isActive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-2xl md:text-4xl text-white font-bold"
                      >
                        {line.adapt}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Context Popover */}
            {mode === 'Contextual' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 right-8 max-w-sm bg-zinc-800/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl z-10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-1">AI Context Note</p>
                    <p className="text-white font-bold text-lg mb-1">"{songLyrics.explanation.word}"</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{songLyrics.explanation.meaning}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Sign Notation Mode */}
            {mode === 'Sign Notation' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 right-8 bg-zinc-800/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4 z-10"
              >
                 <div className="text-4xl bg-white/5 p-3 rounded-2xl">✨</div>
                 <div className="text-4xl bg-white/5 p-3 rounded-2xl">🤝</div>
                 <div className="text-4xl bg-white/5 p-3 rounded-2xl">🎶</div>
                 <div className="ml-2 text-xs text-zinc-400 font-bold uppercase tracking-widest">ASL Gloss<br/><span className="text-white">FEEL CONNECT MUSIC</span></div>
              </motion.div>
            )}
          </div>
        );
      case 'stageforall':
        return (
          <div className="w-full h-full flex flex-col p-8 relative overflow-hidden bg-zinc-950">
            {/* Stage Visualization */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen">
              <motion.div 
                animate={{ 
                  scale: mode === 'Sensory Safe' ? [1, 1.05, 1] : [1, 1.2, 1],
                  opacity: mode === 'Sensory Safe' ? 0.3 : 0.6
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
              />
              {mode !== 'Sensory Safe' && (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute w-full h-full border-[1px] border-purple-500/10 rounded-full border-dashed"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute w-[80%] h-[80%] border-[1px] border-pink-500/10 rounded-full border-dotted"
                  />
                </>
              )}
            </div>

            <div className="relative z-10 flex justify-between items-center mb-8">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-purple-500/20">
                {mode} Mode
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Live Spatial Engine</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center relative z-10">
              {/* Spatial Audio Radar */}
              <div className="relative w-64 h-64 border-2 border-white/10 rounded-full flex items-center justify-center mb-8">
                <div className="absolute w-full h-full border border-white/5 rounded-full scale-75" />
                <div className="absolute w-full h-full border border-white/5 rounded-full scale-50" />
                
                {/* User Position */}
                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20" />
                
                {/* Audio Sources */}
                {[
                  { label: 'Lead Vocal', angle: 0, distance: 40, color: 'bg-rose-400' },
                  { label: 'Drums', angle: 180, distance: 70, color: 'bg-blue-400' },
                  { label: 'Crowd L', angle: -60, distance: 90, color: 'bg-purple-400', pulse: true },
                  { label: 'Crowd R', angle: 60, distance: 90, color: 'bg-purple-400', pulse: true }
                ].map((source, i) => {
                  const x = Math.sin(source.angle * Math.PI / 180) * source.distance;
                  const y = -Math.cos(source.angle * Math.PI / 180) * source.distance;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute flex flex-col items-center"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      <motion.div 
                        animate={source.pulse ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
                        transition={{ repeat: Infinity, duration: 1.5 + i * 0.2 }}
                        className={`w-3 h-3 rounded-full ${source.color} ${source.pulse ? 'shadow-[0_0_10px_currentColor]' : ''}`}
                      />
                      <span className="text-[8px] text-zinc-400 uppercase tracking-widest mt-1 absolute top-full whitespace-nowrap bg-black/50 px-1 rounded">
                        {source.label}
                      </span>
                    </motion.div>
                  );
                })}
                
                {/* Radar Sweep */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute w-1/2 h-full origin-bottom-right right-1/2 bottom-1/2 bg-gradient-to-r from-transparent to-purple-500/20"
                  style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 0)' }}
                />
              </div>

              {/* Audio Description Subtitles */}
              {mode === 'Audio Described' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/60 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl max-w-lg text-center"
                >
                  <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                    <Volume2 className="w-3 h-3" /> Audio Description Active
                  </p>
                  <p className="text-white text-lg font-medium leading-relaxed">
                    "The stage lights dim to a deep blue. The artist walks slowly towards the center microphone, raising one hand to the cheering crowd."
                  </p>
                </motion.div>
              )}
              
              {/* Sensory Safe Status */}
              {mode === 'Sensory Safe' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-2xl max-w-lg text-center mt-8">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3" /> Protection Active
                  </p>
                  <p className="text-emerald-400/80 text-sm leading-relaxed">
                    Strobe lighting effects have been smoothed in the video feed. Sudden crowd noise spikes are being compressed in real-time.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className={`w-32 h-32 rounded-3xl mx-auto mb-6 flex items-center justify-center bg-zinc-800`}
              >
                <module.icon className={`w-12 h-12 ${activeColor.split(' ')[1]}`} />
              </motion.div>
              <div className="absolute -inset-4 border border-white/5 rounded-[40px] animate-pulse" />
            </div>
            <h3 className="text-white font-bold text-xl">Session Active</h3>
            <p className="text-emerald-400 text-sm mt-2 font-mono">ADAPTIVE LAYER: OPTIMAL</p>
          </div>
        );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#F5F2ED] z-50 overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto p-6 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Dashboard
          </button>
          
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-black/5 shadow-sm">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src={selectedSong.image} alt={selectedSong.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 leading-none">{selectedSong.title}</p>
              <p className="text-[10px] text-zinc-500 mt-1 leading-none">{selectedSong.artist}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Visualizer / Interface */}
            <div className="aspect-video bg-zinc-900 rounded-[40px] shadow-2xl relative overflow-hidden flex items-center justify-center border-8 border-white">
              {renderVisualizer()}
              
              {/* Overlay Controls */}
              {isPlaying && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                  <button onClick={() => setIsPlaying(false)} className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-zinc-900 shadow-lg hover:bg-zinc-100 transition-colors">
                    <div className="w-4 h-4 bg-current" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm">
                <h4 className="font-bold text-zinc-900 mb-4">Adaptation Modes</h4>
                <div className="grid grid-cols-1 gap-2">
                  {getModes().map(m => (
                    <button 
                      key={m}
                      onClick={() => setMode(m)}
                      className={`p-4 rounded-2xl text-left text-sm font-bold transition-all ${
                        mode === m 
                        ? `${activeColor.split(' ')[0]} text-white shadow-lg` 
                        : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-black/5 shadow-sm">
                <h4 className="font-bold text-zinc-900 mb-4">Real-time Metrics</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Sensory Load', value: isPlaying ? '12%' : '0%', color: 'emerald' },
                    { label: 'Phoneme Density', value: isPlaying ? 'High' : '-', color: 'blue' },
                    { label: 'Haptic Intensity', value: isPlaying ? 'Medium' : '-', color: 'orange' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase mb-1">
                        <span>{stat.label}</span>
                        <span>{stat.value}</span>
                      </div>
                      <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: isPlaying ? '70%' : '0%' }}
                          className={`h-full bg-${stat.color}-500`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-zinc-900 rounded-[40px] text-white">
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" /> AI Insights
              </h4>
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={insightIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2">
                      {isPlaying ? 'Live Analysis' : 'Pre-Session Analysis'}
                    </p>
                    <p className="text-sm leading-relaxed text-zinc-300 italic">
                      {isPlaying 
                        ? (moduleInsights[module.id]?.[insightIndex] || "Analyzing stems...")
                        : "Initialize session to begin real-time accessibility adaptation."
                      }
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2">Accessibility Score</p>
                  <div className="text-3xl font-bold text-emerald-400">{isPlaying ? '98/100' : '--'}</div>
                  <p className="text-[10px] text-zinc-500 mt-1">Optimized for your profile</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white rounded-[40px] border border-black/5 shadow-sm">
              <h4 className="font-bold text-zinc-900 mb-6">Module Documentation</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">How it works</p>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Our core engine separates the track into 4 stems (Vocals, Drums, Bass, Other) using Demucs v4.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">Customization</p>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-1">
                      Adjust your profile settings anytime to refine the AI adaptation layer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Feedback UI */}
            <div className="p-8 bg-white rounded-[40px] border border-black/5 shadow-sm">
              <h4 className="font-bold text-zinc-900 mb-6">Quick Feedback</h4>
              <p className="text-xs text-zinc-500 mb-4">How comfortable is this adaptation?</p>
              <div className="flex justify-between gap-2">
                {[
                  { emoji: '😣', label: 'Too Intense', value: 'intense' },
                  { emoji: '😕', label: 'Needs Tweak', value: 'tweak' },
                  { emoji: '😌', label: 'Comfortable', value: 'comfortable' },
                  { emoji: '✨', label: 'Perfect', value: 'perfect' }
                ].map((fb) => (
                  <button
                    key={fb.value}
                    onClick={() => {
                      // In a real app, this would send feedback to the backend
                      // and potentially trigger an immediate AI adaptation.
                      console.log(`Feedback submitted: ${fb.value}`);
                      // Show a quick toast or visual confirmation here if desired
                    }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-black/5 flex-1"
                  >
                    <span className="text-2xl">{fb.emoji}</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-center">{fb.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-black/5">
                <p className="text-xs text-zinc-500 mb-4">Adjust intensity manually:</p>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="50"
                  className={`w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-${activeColor.split(' ')[0].replace('bg-', '')}`}
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-zinc-400 uppercase">
                  <span>Less</span>
                  <span>More</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>

  );
};

const Dashboard = ({ profile }: { profile: UserProfile }) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showExperience, setShowExperience] = useState(false);
  const [selectedSong, setSelectedSong] = useState({
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    image: "https://picsum.photos/seed/levitating/200/200"
  });

  const songs = [
    { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", image: "https://picsum.photos/seed/levitating/200/200" },
    { title: "Shape of You", artist: "Ed Sheeran", album: "÷ (Divide)", image: "https://picsum.photos/seed/shapeofyou/200/200" },
    { title: "About Damn Time", artist: "Lizzo", album: "Special", image: "https://picsum.photos/seed/aboutdamntime/200/200" },
    { title: "24K Magic", artist: "Bruno Mars", album: "24K Magic", image: "https://picsum.photos/seed/24kmagic/200/200" },
    { title: "Higher Power", artist: "Coldplay", album: "Music of the Spheres", image: "https://picsum.photos/seed/higherpower/200/200" },
  ];

  const modules = [
    {
      id: 'senseplay',
      title: 'SensePlay',
      icon: Volume2,
      color: 'emerald',
      description: 'Sensory-adaptive music for neurodivergent listeners. Calm, Focus, and Safe modes.',
    },
    {
      id: 'voicejourney',
      title: 'VoiceJourney',
      icon: Mic2,
      color: 'blue',
      description: 'AI-powered speech therapy through music. Personalized phoneme pathways.',
    },
    {
      id: 'soundcanvas',
      title: 'SoundCanvas',
      icon: Ear,
      color: 'orange',
      description: 'Visual & haptic translation for Deaf/HoH. See and feel the music.',
    }
  ];

  const activeModuleData = modules.find(m => m.id === activeModule);

  return (
    <div className="min-h-screen bg-[#F5F2ED] p-6 lg:p-12 font-sans">
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Amplify Access Layer Active</span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Welcome back, {profile.name}</h1>
          <p className="text-zinc-500 mt-2">Your universal accessibility layer is ready. Select a module to begin.</p>
        </div>
        <div className="flex gap-4">
          <button className="p-3 bg-white rounded-2xl border border-black/5 shadow-sm hover:bg-zinc-50 transition-colors">
            <Settings className="w-5 h-5 text-zinc-600" />
          </button>
          <button className="p-3 bg-white rounded-2xl border border-black/5 shadow-sm hover:bg-zinc-50 transition-colors">
            <User className="w-5 h-5 text-zinc-600" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <ModuleCard 
              key={m.id} 
              {...m} 
              active={activeModule === m.id}
              onClick={() => setActiveModule(m.id)}
            />
          ))}
          
          {/* Quick Stats / Status Card */}
          <div className="p-6 rounded-3xl bg-zinc-900 text-white flex flex-col justify-between min-h-[200px]">
            <div>
              <h3 className="font-bold text-lg mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Core Engine</span>
                  <span className="text-emerald-400 font-mono">ONLINE</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Stem Separation</span>
                  <span className="text-emerald-400 font-mono">READY</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Haptic Sync</span>
                  <span className="text-emerald-400 font-mono">ACTIVE</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-2">Current Profile</p>
              <div className="flex flex-wrap gap-2">
                {profile.needs.map(n => (
                  <span key={n} className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase">{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Tracks */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <Music className="w-6 h-6 text-emerald-500" /> Recommended WMG Tracks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {songs.map((song) => (
              <motion.button
                key={song.title}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedSong(song)}
                className={`p-4 rounded-3xl border text-left transition-all ${
                  selectedSong.title === song.title 
                  ? 'bg-white border-emerald-500 shadow-lg ring-2 ring-emerald-500/20' 
                  : 'bg-white border-black/5 hover:border-black/10 shadow-sm'
                }`}
              >
                <div className="aspect-square bg-zinc-100 rounded-2xl mb-4 overflow-hidden">
                  <img src={song.image} alt={song.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <p className="font-bold text-zinc-900 text-sm truncate">{song.title}</p>
                <p className="text-xs text-zinc-500 truncate">{song.artist}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Module Preview */}
        <AnimatePresence mode="wait">
          {activeModule && activeModuleData && (
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 p-8 bg-white rounded-[40px] border border-black/5 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <Music className="w-32 h-32 text-zinc-50 opacity-[0.03] rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-${activeModuleData.color}-50 flex items-center justify-center`}>
                    <activeModuleData.icon className={`w-8 h-8 text-${activeModuleData.color}-600`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900">{activeModuleData.title}</h2>
                    <p className="text-zinc-500">Active Session • WMG Catalog Integration</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="p-6 bg-zinc-50 rounded-3xl border border-black/5">
                      <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                        <Play className="w-4 h-4 fill-current" /> Now Playing
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-zinc-200 rounded-xl overflow-hidden">
                          <img src={selectedSong.image} alt="Album Art" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{selectedSong.title}</p>
                          <p className="text-sm text-zinc-500">{selectedSong.artist} • {selectedSong.album}</p>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '45%' }}
                            className={`h-full bg-${activeModuleData.color}-500`}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                          <span>01:42</span>
                          <span>03:23</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setShowExperience(true)}
                        className={`flex-1 py-4 bg-${activeModuleData.color}-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all`}
                      >
                        Launch Full Experience
                      </button>
                      <button className="px-6 py-4 bg-white border border-black/5 rounded-2xl font-bold text-zinc-600 hover:bg-zinc-50 transition-all">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold text-zinc-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" /> AI Adaptations
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Stem Separation', status: 'Optimal', icon: Volume2 },
                        { label: 'Dynamic Range', status: 'Compressed (4:1)', icon: Activity },
                        { label: 'Haptic Mapping', status: 'Synced', icon: Ear },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4 text-zinc-400" />
                            <span className="text-sm font-medium text-zinc-700">{item.label}</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showExperience && activeModuleData && (
          <ModuleExperience 
            module={activeModuleData} 
            profile={profile} 
            onBack={() => setShowExperience(false)} 
            selectedSong={selectedSong}
          />
        )}
      </AnimatePresence>

      <footer className="max-w-7xl mx-auto mt-24 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
            <Music className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-zinc-900">Amplify Access</p>
            <p className="text-xs text-zinc-500">© 2025 Warner Music Group x Presidio</p>
          </div>
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#" className="hover:text-zinc-900 transition-colors">Documentation</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {!onboarded ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard profile={profile} />
      )}
    </div>
  );
}
