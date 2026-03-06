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
  Pause,
  Activity,
  Heart,
  Music,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Info,
  Shield,
  X
} from 'lucide-react';

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

const OnboardingStep = ({ children, stepIndex, totalSteps }: { children: React.ReactNode; stepIndex: number; totalSteps: number; key?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full"
  >
    <div className="mb-8 flex items-center gap-3">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: i <= stepIndex ? '100%' : '0%' }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
          />
        </div>
      ))}
    </div>
    {children}
  </motion.div>
);

const ScenarioCard = ({ icon: Icon, title, subtitle, selected, onClick, color }: {
  key?: string; icon: any; title: string; subtitle: string; selected: boolean; onClick: () => void; color: string;
}) => {
  const colorStyles: Record<string, { border: string; bg: string; iconBg: string; iconText: string; shadow: string }> = {
    emerald: { border: 'border-emerald-500/60', bg: 'bg-emerald-500/10', iconBg: 'bg-emerald-500/20', iconText: 'text-emerald-400', shadow: 'shadow-emerald-500/10' },
    blue: { border: 'border-blue-500/60', bg: 'bg-blue-500/10', iconBg: 'bg-blue-500/20', iconText: 'text-blue-400', shadow: 'shadow-blue-500/10' },
    orange: { border: 'border-orange-500/60', bg: 'bg-orange-500/10', iconBg: 'bg-orange-500/20', iconText: 'text-orange-400', shadow: 'shadow-orange-500/10' },
    purple: { border: 'border-purple-500/60', bg: 'bg-purple-500/10', iconBg: 'bg-purple-500/20', iconText: 'text-purple-400', shadow: 'shadow-purple-500/10' },
    rose: { border: 'border-rose-500/60', bg: 'bg-rose-500/10', iconBg: 'bg-rose-500/20', iconText: 'text-rose-400', shadow: 'shadow-rose-500/10' },
    amber: { border: 'border-amber-500/60', bg: 'bg-amber-500/10', iconBg: 'bg-amber-500/20', iconText: 'text-amber-400', shadow: 'shadow-amber-500/10' },
  };
  const c = colorStyles[color] || colorStyles.emerald;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative p-4 rounded-2xl border text-left transition-all duration-200 w-full ${
        selected
          ? `${c.bg} ${c.border} shadow-lg ${c.shadow} ring-1 ${c.border}`
          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl ${selected ? c.iconBg : 'bg-white/10'} flex items-center justify-center shrink-0 transition-colors`}>
          <Icon className={`w-5 h-5 ${selected ? c.iconText : 'text-zinc-500'} transition-colors`} />
        </div>
        <div className="min-w-0">
          <p className={`font-bold text-sm ${selected ? 'text-white' : 'text-zinc-300'} transition-colors`}>{title}</p>
          <p className="text-xs text-zinc-500 leading-snug mt-0.5">{subtitle}</p>
        </div>
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <CheckCircle2 className={`w-4 h-4 ${c.iconText}`} />
        </motion.div>
      )}
    </motion.button>
  );
};

const Onboarding = ({ onComplete }: { onComplete: (profile: UserProfile) => void }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [selections, setSelections] = useState<Set<string>>(new Set());
  const [enhancements, setEnhancements] = useState<Set<string>>(new Set());
  const [sensitivity, setSensitivity] = useState(50);
  const [complexity, setComplexity] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [profileReady, setProfileReady] = useState(false);
  const totalSteps = 5;

  const toggleSelection = (id: string) => {
    setSelections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleEnhancement = (id: string) => {
    setEnhancements(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const buildProfile = (): UserProfile => {
    const needs: string[] = [];

    if (selections.has('vocals-first')) needs.push('Enhanced Bass');
    if (selections.has('easy-listening')) needs.push('Reduced Sensory');
    if (selections.has('feel-rhythm')) needs.push('Haptic Mode');
    if (selections.has('see-sound')) needs.push('Haptic Mode');
    if (selections.has('words-matter')) needs.push('Dual Lyrics View');

    if (enhancements.has('smooth-surprises')) needs.push('Reduced Sensory');
    if (enhancements.has('simpler-words')) needs.push('Simplified Lyrics');
    if (enhancements.has('show-lyrics')) needs.push('Dual Lyrics View');
    if (enhancements.has('feel-physically')) needs.push('Haptic Mode');
    if (enhancements.has('speech-practice')) needs.push('Standard');
    if (enhancements.has('minimal-focus')) needs.push('Focus Mode');
    if (enhancements.has('context-help')) needs.push('Emotion Translation');

    const uniqueNeeds = [...new Set(needs)];

    let sens: "low" | "medium" | "high" = "medium";
    if (sensitivity < 33) sens = "high";
    else if (sensitivity > 66) sens = "low";

    return {
      name,
      needs: uniqueNeeds,
      sensoryProfile: {
        sensitivity: sens,
        triggers: [],
      },
      speechGoals: enhancements.has('speech-practice') ? ['phoneme-practice'] : [],
      visualPreference: "dark",
    };
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setProfileReady(true);
    }, 2500);
  };

  const handleFinish = () => {
    onComplete(buildProfile());
  };

  const generatedProfile = buildProfile();

  const profileTraits = [
    ...(generatedProfile.needs.includes('Reduced Sensory') ? ['Gentle Sound Shaping'] : []),
    ...(generatedProfile.needs.includes('Haptic Mode') ? ['Rhythm You Can Feel'] : []),
    ...(generatedProfile.needs.includes('Dual Lyrics View') ? ['Visual Lyrics'] : []),
    ...(generatedProfile.needs.includes('Focus Mode') ? ['Distraction-Free Listening'] : []),
    ...(generatedProfile.needs.includes('Enhanced Bass') ? ['Voice-Forward Mix'] : []),
    ...(generatedProfile.needs.includes('Simplified Lyrics') ? ['Clear Language'] : []),
    ...(generatedProfile.needs.includes('Emotion Translation') ? ['Contextual Meaning'] : []),
    ...(generatedProfile.speechGoals.length > 0 ? ['Speech-Friendly Playback'] : []),
    ...(generatedProfile.sensoryProfile.sensitivity === 'high' ? ['Extra Comfort Mode'] : []),
  ];

  const recommendedModules = [
    ...(selections.has('easy-listening') || enhancements.has('smooth-surprises') ? ['SensePlay'] : []),
    ...(selections.has('see-sound') || selections.has('feel-rhythm') || enhancements.has('feel-physically') ? ['SoundCanvas'] : []),
    ...(enhancements.has('speech-practice') ? ['VoiceJourney'] : []),
    ...(selections.has('words-matter') || enhancements.has('simpler-words') || enhancements.has('context-help') ? ['LyricBridge'] : []),
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 md:p-8 font-sans relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <OnboardingStep key="welcome" stepIndex={0} totalSteps={totalSteps}>
              <div className="text-center space-y-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mx-auto flex items-center justify-center border border-white/20 shadow-2xl"
                >
                  <Music className="w-10 h-10 text-white" />
                </motion.div>

                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Music Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Barriers</span>
                  </h1>
                  <p className="text-zinc-400 text-lg max-w-md mx-auto">
                    We'll build a personalized sound profile so every track adapts to you.
                  </p>
                </div>

                <div className="max-w-xs mx-auto space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="What should we call you?"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all text-center text-lg"
                    />
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full px-6 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    Build My Sound Profile <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-zinc-600">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">AI-powered personalization</span>
                  </div>
                </div>
              </div>
            </OnboardingStep>
          )}

          {step === 1 && (
            <OnboardingStep key="experience" stepIndex={1} totalSteps={totalSteps}>
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white">How do you enjoy music?</h2>
                  <p className="text-zinc-400 text-sm">Pick everything that sounds like you. No wrong answers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ScenarioCard
                    icon={Volume2}
                    title="I love every detail"
                    subtitle="Give me the full experience, all instruments, all layers."
                    selected={selections.has('full-spectrum')}
                    onClick={() => toggleSelection('full-spectrum')}
                    color="emerald"
                  />
                  <ScenarioCard
                    icon={Mic2}
                    title="Vocals come first"
                    subtitle="The voice is what moves me. I want it front and center."
                    selected={selections.has('vocals-first')}
                    onClick={() => toggleSelection('vocals-first')}
                    color="blue"
                  />
                  <ScenarioCard
                    icon={Heart}
                    title="Easy on the ears"
                    subtitle="I prefer softer, smoother sounds without sudden surprises."
                    selected={selections.has('easy-listening')}
                    onClick={() => toggleSelection('easy-listening')}
                    color="rose"
                  />
                  <ScenarioCard
                    icon={Activity}
                    title="Feel the rhythm"
                    subtitle="I connect through bass, beats, and physical vibration."
                    selected={selections.has('feel-rhythm')}
                    onClick={() => toggleSelection('feel-rhythm')}
                    color="orange"
                  />
                  <ScenarioCard
                    icon={Eye}
                    title="See the sound"
                    subtitle="I want to experience music through colors, shapes, and motion."
                    selected={selections.has('see-sound')}
                    onClick={() => toggleSelection('see-sound')}
                    color="purple"
                  />
                  <ScenarioCard
                    icon={BookOpen}
                    title="Words matter most"
                    subtitle="Lyrics and their meaning are everything to me."
                    selected={selections.has('words-matter')}
                    onClick={() => toggleSelection('words-matter')}
                    color="amber"
                  />
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(0)} className="px-5 py-3 text-zinc-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-all flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </OnboardingStep>
          )}

          {step === 2 && (
            <OnboardingStep key="enhance" stepIndex={2} totalSteps={totalSteps}>
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white">What would make music better for you?</h2>
                  <p className="text-zinc-400 text-sm">These are ways our AI can adapt the experience in real time.</p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: 'smooth-surprises', icon: Shield, title: 'Smooth out surprises', subtitle: 'Reduce sudden loud moments, harsh frequencies, and jarring transitions.', color: 'emerald' },
                    { id: 'simpler-words', icon: BookOpen, title: 'Make lyrics easier to follow', subtitle: 'Simplify complex language and metaphors into clearer words.', color: 'blue' },
                    { id: 'show-lyrics', icon: Eye, title: 'Show the words as they play', subtitle: 'Display synced lyrics so I can read along with the music.', color: 'purple' },
                    { id: 'feel-physically', icon: Activity, title: 'Let me feel it physically', subtitle: 'Translate the music into vibrations and haptic patterns.', color: 'orange' },
                    { id: 'speech-practice', icon: Mic2, title: 'Help me practice speaking', subtitle: 'Use song lyrics as a fun way to work on pronunciation.', color: 'rose' },
                    { id: 'minimal-focus', icon: Sparkles, title: 'Keep it minimal and focused', subtitle: 'Remove distractions and simplify the interface.', color: 'emerald' },
                    { id: 'context-help', icon: Info, title: 'Help me understand cultural references', subtitle: 'Explain idioms, slang, and references I might not know.', color: 'amber' },
                  ].map(item => (
                    <ScenarioCard
                      key={item.id}
                      icon={item.icon}
                      title={item.title}
                      subtitle={item.subtitle}
                      selected={enhancements.has(item.id)}
                      onClick={() => toggleEnhancement(item.id)}
                      color={item.color}
                    />
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(1)} className="px-5 py-3 text-zinc-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-all flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </OnboardingStep>
          )}

          {step === 3 && (
            <OnboardingStep key="tune" stepIndex={3} totalSteps={totalSteps}>
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-white">Fine-tune your comfort zone</h2>
                  <p className="text-zinc-400 text-sm">Adjust these sliders to set your starting preferences. You can always change them later.</p>
                </div>

                <div className="space-y-8 max-w-md mx-auto">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Sound Intensity</p>
                        <p className="text-xs text-zinc-500">How much sonic energy feels right?</p>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sensitivity}
                      onChange={(e) => setSensitivity(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wide">
                      <span>Gentle & calm</span>
                      <span>Full power</span>
                    </div>
                  </div>

                  <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Detail Level</p>
                        <p className="text-xs text-zinc-500">How much information and complexity do you want?</p>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={complexity}
                      onChange={(e) => setComplexity(Number(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wide">
                      <span>Simple & clear</span>
                      <span>Rich & detailed</span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-400/90 leading-relaxed">
                        Our AI will continuously learn from your listening patterns and refine these settings automatically over time.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(2)} className="px-5 py-3 text-zinc-400 hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => { setStep(4); handleGenerate(); }}
                    className="px-6 py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Generate My Profile
                  </button>
                </div>
              </div>
            </OnboardingStep>
          )}

          {step === 4 && (
            <OnboardingStep key="profile" stepIndex={4} totalSteps={totalSteps}>
              <div className="space-y-8 text-center">
                {isGenerating && !profileReady && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8 py-12"
                  >
                    <div className="relative w-24 h-24 mx-auto">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 border-2 border-transparent border-t-emerald-400 border-r-blue-400 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-2 border-2 border-transparent border-b-purple-400 border-l-rose-400 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2">Building your sound profile...</h2>
                      <p className="text-zinc-500 text-sm">Our AI is analyzing your preferences</p>
                    </div>
                  </motion.div>
                )}

                {profileReady && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="w-16 h-16 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 rounded-2xl mx-auto flex items-center justify-center border border-white/20 mb-4"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white">
                        {name ? `${name}'s` : 'Your'} Sound Profile
                      </h2>
                      <p className="text-zinc-400 text-sm mt-1">Here's how we'll adapt every track for you</p>
                    </div>

                    {profileTraits.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                        {profileTraits.map((trait, i) => (
                          <motion.span
                            key={trait}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-zinc-300"
                          >
                            {trait}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {recommendedModules.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-5 bg-white/5 rounded-2xl border border-white/10 max-w-sm mx-auto text-left"
                      >
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-3">Recommended for you</p>
                        <div className="space-y-2">
                          {[...new Set(recommendedModules)].map(mod => {
                            const moduleInfo: Record<string, { icon: any; desc: string; color: string }> = {
                              SensePlay: { icon: Volume2, desc: 'Sensory-adaptive playback', color: 'text-emerald-400' },
                              SoundCanvas: { icon: Ear, desc: 'Visual & haptic music', color: 'text-orange-400' },
                              VoiceJourney: { icon: Mic2, desc: 'Speech through music', color: 'text-blue-400' },
                              LyricBridge: { icon: BookOpen, desc: 'Lyrics made clear', color: 'text-rose-400' },
                            };
                            const info = moduleInfo[mod];
                            if (!info) return null;
                            return (
                              <div key={mod} className="flex items-center gap-3 p-2">
                                <info.icon className={`w-4 h-4 ${info.color}`} />
                                <div>
                                  <p className="text-sm font-bold text-white">{mod}</p>
                                  <p className="text-[11px] text-zinc-500">{info.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="pt-2 space-y-3"
                    >
                      <button
                        onClick={handleFinish}
                        className="w-full max-w-xs mx-auto px-6 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-base hover:bg-zinc-100 transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        Enter My Experience <ArrowRight className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setStep(1)}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-medium"
                      >
                        Adjust my answers
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </OnboardingStep>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ModuleCard = ({ title, icon: Icon, description, color, onClick, active }: any) => {
  const colorMap: Record<string, { bg: string; text: string; border: string; ring: string; activeBg: string }> = {
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/50', ring: 'ring-emerald-500/20', activeBg: 'bg-emerald-500/10' },
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50', ring: 'ring-blue-500/20', activeBg: 'bg-blue-500/10' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50', ring: 'ring-orange-500/20', activeBg: 'bg-orange-500/10' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50', ring: 'ring-purple-500/20', activeBg: 'bg-purple-500/10' },
    rose: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/50', ring: 'ring-rose-500/20', activeBg: 'bg-rose-500/10' },
  };

  const c = colorMap[color] || colorMap.emerald;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative p-5 rounded-2xl border text-left transition-all duration-300 ${
        active
        ? `${c.activeBg} backdrop-blur-xl ${c.border} shadow-xl ring-2 ${c.ring}`
        : 'bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 shadow-lg'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${c.text}`} />
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-white text-sm">{title}</h3>
          <p className="text-xs text-zinc-500 leading-snug mt-0.5 line-clamp-2">{description}</p>
        </div>
      </div>
      {active && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className={`w-4 h-4 ${c.text}`} />
        </div>
      )}
    </motion.button>
  );
};

const ModuleExperience = ({ module, profile, onBack, selectedSong }: { module: any, profile: UserProfile, onBack: () => void, selectedSong: any }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState('Standard');
  const [insightIndex, setInsightIndex] = useState(0);
  const [mutedStems, setMutedStems] = useState<Set<string>>(new Set());

  const colorMap: Record<string, { bg: string; text: string }> = {
    emerald: { bg: 'bg-emerald-600', text: 'text-emerald-500' },
    blue: { bg: 'bg-blue-600', text: 'text-blue-500' },
    orange: { bg: 'bg-orange-600', text: 'text-orange-500' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-500' },
    rose: { bg: 'bg-rose-600', text: 'text-rose-500' },
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
      "Spatial audio active: Positioning artist center-stage with crowd surround at 360 degrees.",
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

  useEffect(() => {
    if (module.id === 'senseplay') {
      if (mode === 'Calm') {
        setMutedStems(new Set(['Drums']));
      } else if (mode === 'Focus') {
        setMutedStems(new Set(['Other']));
      } else {
        setMutedStems(new Set());
      }
    }
  }, [mode, module.id]);

  const getModes = () => {
    if (module.id === 'senseplay') return ['Calm', 'Focus', 'Sensory-Safe'];
    if (module.id === 'soundcanvas') return ['Visual Only', 'Haptic Only', 'Full Immersion'];
    if (module.id === 'voicejourney') return ['Practice', 'Challenge', 'Assessment'];
    if (module.id === 'stageforall') return ['Standard', 'Audio Described', 'Sensory Safe'];
    if (module.id === 'lyricbridge') return ['Simplified', 'Contextual', 'Sign Notation'];
    return ['Standard', 'Enhanced'];
  };

  const activeColor = colorMap[module.color] || colorMap.emerald;

  const toggleStem = (label: string) => {
    setMutedStems(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const renderVisualizer = () => {
    if (!isPlaying) {
      return (
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-28 h-28 bg-zinc-800 rounded-3xl mx-auto mb-5 flex items-center justify-center"
          >
            <module.icon className={`w-10 h-10 ${activeColor.text}`} />
          </motion.div>
          <h3 className="text-white font-bold text-lg">{module.title} Engine</h3>
          <p className="text-zinc-500 text-sm mt-1">Ready to process...</p>
          <button
            onClick={() => setIsPlaying(true)}
            className="mt-6 px-6 py-2.5 bg-white text-zinc-900 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-all flex items-center gap-2 mx-auto"
          >
            <Play className="w-4 h-4 fill-current" /> Initialize Session
          </button>
        </div>
      );
    }

    switch (module.id) {
      case 'senseplay':
        const stems = [
          { label: 'Vocals', color: 'bg-rose-400', barColor: 'bg-rose-500', textColor: 'text-rose-400', ringColor: 'ring-rose-500/30', heights: [35, 75, 50, 85, 35] },
          { label: 'Drums', color: 'bg-blue-400', barColor: 'bg-blue-500', textColor: 'text-blue-400', ringColor: 'ring-blue-500/30', heights: [20, 95, 15, 90, 20] },
          { label: 'Bass', color: 'bg-emerald-400', barColor: 'bg-emerald-500', textColor: 'text-emerald-400', ringColor: 'ring-emerald-500/30', heights: [45, 65, 40, 70, 45] },
          { label: 'Other', color: 'bg-amber-400', barColor: 'bg-amber-500', textColor: 'text-amber-400', ringColor: 'ring-amber-500/30', heights: [15, 45, 25, 50, 15] }
        ];

        const waveformBars = 40;

        return (
          <div className="absolute inset-0 flex flex-col bg-zinc-950">
            <div className="flex justify-between items-center px-5 pt-4 pb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                {mode} Profile Active
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Demucs v4</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-5 gap-4">
              <div className="h-20 bg-white/[0.03] rounded-xl border border-white/5 px-3 py-2 relative overflow-hidden">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-400/60 z-10" />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-emerald-400" />
                </div>
                <div className="flex items-center justify-center gap-[2px] h-full">
                  {[...Array(waveformBars)].map((_, i) => {
                    const distFromCenter = Math.abs(i - waveformBars / 2);
                    const baseHeight = Math.max(15, 80 - distFromCenter * 3);
                    const isMuted = mutedStems.has('Vocals') && mutedStems.has('Drums') && mutedStems.has('Bass') && mutedStems.has('Other');
                    return (
                      <motion.div
                        key={i}
                        animate={{ height: isMuted ? '10%' : [`${baseHeight - 10}%`, `${baseHeight + 10}%`, `${baseHeight - 10}%`] }}
                        transition={{ repeat: Infinity, duration: 0.4 + (i % 5) * 0.1, ease: "easeInOut", delay: i * 0.02 }}
                        className={`w-[2px] rounded-full ${i < waveformBars / 2 ? 'bg-emerald-400/40' : 'bg-emerald-400/80'}`}
                      />
                    );
                  })}
                </div>
                <div className="absolute bottom-1 left-3 right-3 flex justify-between text-[9px] font-mono text-zinc-600">
                  <span>01:42</span>
                  <span>03:23</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {stems.map((stem, i) => {
                  const isMuted = mutedStems.has(stem.label);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleStem(stem.label)}
                      className={`relative rounded-xl border p-2.5 transition-all ${
                        isMuted
                          ? 'bg-white/[0.02] border-white/5'
                          : `bg-white/[0.04] border-white/10 ring-1 ${stem.ringColor}`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isMuted ? 'text-zinc-600' : stem.textColor}`}>
                          {stem.label}
                        </span>
                        <div className={`w-1.5 h-1.5 rounded-full ${isMuted ? 'bg-zinc-700' : stem.color} ${isMuted ? '' : 'animate-pulse'}`} />
                      </div>

                      <div className="flex items-end gap-[2px] h-10">
                        {[...Array(8)].map((_, j) => (
                          <motion.div
                            key={j}
                            animate={{
                              height: isMuted ? '12%' : [`${20 + Math.random() * 30}%`, `${50 + Math.random() * 50}%`, `${20 + Math.random() * 30}%`]
                            }}
                            transition={{ repeat: isMuted ? 0 : Infinity, duration: 0.3 + j * 0.05, ease: "easeInOut" }}
                            className={`flex-1 rounded-sm ${isMuted ? 'bg-zinc-800' : stem.barColor} transition-colors`}
                          />
                        ))}
                      </div>

                      <div className="mt-1.5 flex items-center justify-between">
                        <span className={`text-[9px] font-bold uppercase ${isMuted ? 'text-red-400/70' : 'text-zinc-500'}`}>
                          {isMuted ? 'Muted' : 'Live'}
                        </span>
                        <span className={`text-[9px] font-mono ${isMuted ? 'text-zinc-700' : 'text-zinc-500'}`}>
                          {isMuted ? '0%' : `${70 + i * 8}%`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <p className="text-[11px] text-emerald-400 font-medium">
                    {mode === 'Calm' ? 'Harsh cymbals and sibilance reduced by 12dB for comfort.' : mode === 'Focus' ? 'Non-essential instruments lowered to enhance vocal clarity.' : 'Dynamic range compressed to prevent sudden loud transients.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'soundcanvas':
        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-zinc-950">
            <motion.div
              animate={{
                scale: mode === 'Full Immersion' ? [1, 1.5, 1] : [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                opacity: mode === 'Haptic Only' ? 0.1 : 0.4
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute w-[150%] h-[150%] bg-gradient-to-tr from-orange-500/30 via-purple-500/20 to-yellow-400/30 blur-[100px]"
            />

            <div className="relative z-10 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: mode === 'Haptic Only' ? 1 : [1, 1.2, 1],
                  borderColor: ['rgba(255,255,255,0.1)', 'rgba(249,115,22,0.5)', 'rgba(255,255,255,0.1)']
                }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="absolute w-64 h-64 border-4 rounded-full"
              />

              <motion.div
                animate={{
                  scale: mode === 'Haptic Only' ? 1 : [1, 1.1, 1],
                  borderColor: ['rgba(255,255,255,0.2)', 'rgba(168,85,247,0.6)', 'rgba(255,255,255,0.2)']
                }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="absolute w-48 h-48 border-4 rounded-full"
              />

              <motion.div
                animate={{
                  scale: mode === 'Haptic Only' ? 1 : [1, 1.3, 1],
                  backgroundColor: ['rgba(255,255,255,0.1)', 'rgba(250,204,21,0.8)', 'rgba(255,255,255,0.1)']
                }}
                transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full backdrop-blur-md border border-white/30 shadow-[0_0_40px_rgba(250,204,21,0.4)]"
              />
            </div>

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

            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${mode !== 'Visual Only' ? 'bg-orange-500 animate-pulse' : 'bg-zinc-600'}`} />
                <div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-0.5">Haptic Engine</p>
                  <p className="text-xs text-white font-medium leading-none">{mode !== 'Visual Only' ? 'Syncing to Bass' : 'Disabled'}</p>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mb-0.5">Color Palette</p>
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
          <div className="w-full max-w-md space-y-6 p-6 relative">
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                {mode} Mode
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Listening</span>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-3 text-center">Target Phoneme</p>
                <div className="flex justify-center gap-3">
                  {['S', 'T', 'CH', 'TH'].map(p => (
                    <button
                      key={p}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
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

              <div className="h-32 bg-zinc-900/80 rounded-2xl border border-white/10 p-3 relative overflow-hidden flex flex-col justify-end">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-blue-500/10 border-y border-blue-500/20" />

                <div className="flex items-end justify-between gap-0.5 h-full relative z-10">
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

              <div className="text-center space-y-1">
                <p className="text-white text-base font-medium">
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
          <div className="w-full h-full flex flex-col p-6 relative">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-rose-500/20">
                {mode} Mode Active
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6">
              {songLyrics.lines.map((line, idx) => {
                const isActive = idx === (selectedSong.title === "Levitating" ? 2 : 1);
                return (
                  <div key={idx} className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-30 blur-[1px] scale-95'}`}>
                    <p className="text-base md:text-lg text-zinc-400 font-medium mb-1">
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
                        className="text-xl md:text-2xl text-white font-bold"
                      >
                        {line.adapt}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {mode === 'Contextual' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 right-6 max-w-xs bg-zinc-800/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl z-10"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-1">AI Context Note</p>
                    <p className="text-white font-bold text-sm mb-1">"{songLyrics.explanation.word}"</p>
                    <p className="text-zinc-400 text-xs leading-relaxed">{songLyrics.explanation.meaning}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {mode === 'Sign Notation' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 right-6 bg-zinc-800/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 z-10"
              >
                 <div className="text-3xl bg-white/5 p-2 rounded-xl">*</div>
                 <div className="text-3xl bg-white/5 p-2 rounded-xl">*</div>
                 <div className="text-3xl bg-white/5 p-2 rounded-xl">*</div>
                 <div className="ml-2 text-xs text-zinc-400 font-bold uppercase tracking-widest">ASL Gloss<br/><span className="text-white">FEEL CONNECT MUSIC</span></div>
              </motion.div>
            )}
          </div>
        );
      case 'stageforall':
        return (
          <div className="w-full h-full flex flex-col p-6 relative overflow-hidden bg-zinc-950">
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

            <div className="relative z-10 flex justify-between items-center mb-6">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-purple-500/20">
                {mode} Mode
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Live Spatial Engine</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center relative z-10">
              <div className="relative w-56 h-56 border-2 border-white/10 rounded-full flex items-center justify-center mb-6">
                <div className="absolute w-full h-full border border-white/5 rounded-full scale-75" />
                <div className="absolute w-full h-full border border-white/5 rounded-full scale-50" />

                <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20" />

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

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute w-1/2 h-full origin-bottom-right right-1/2 bottom-1/2 bg-gradient-to-r from-transparent to-purple-500/20"
                  style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 0)' }}
                />
              </div>

              {mode === 'Audio Described' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/60 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl max-w-md text-center"
                >
                  <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
                    <Volume2 className="w-3 h-3" /> Audio Description Active
                  </p>
                  <p className="text-white text-sm font-medium leading-relaxed">
                    "The stage lights dim to a deep blue. The artist walks slowly towards the center microphone, raising one hand to the cheering crowd."
                  </p>
                </motion.div>
              )}

              {mode === 'Sensory Safe' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-2xl max-w-md text-center mt-4">
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3" /> Protection Active
                  </p>
                  <p className="text-emerald-400/80 text-xs leading-relaxed">
                    Strobe lighting effects smoothed. Sudden crowd noise spikes compressed in real-time.
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
                className="w-28 h-28 rounded-3xl mx-auto mb-5 flex items-center justify-center bg-zinc-800"
              >
                <module.icon className={`w-10 h-10 ${activeColor.text}`} />
              </motion.div>
            </div>
            <h3 className="text-white font-bold text-lg">Session Active</h3>
            <p className="text-emerald-400 text-sm mt-1 font-mono">ADAPTIVE LAYER: OPTIMAL</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#0a0a0a] z-50 overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
              <img src={selectedSong.image} alt={selectedSong.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">{selectedSong.title}</p>
              <p className="text-[10px] text-zinc-400 mt-0.5 leading-none">{selectedSong.artist}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-6">
            <div className="aspect-video bg-zinc-950 rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center border border-white/10">
              {renderVisualizer()}
            </div>

            {isPlaying && (
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <button onClick={() => setIsPlaying(false)} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-zinc-900 shadow-lg hover:bg-zinc-100 transition-colors shrink-0">
                  <Pause className="w-4 h-4" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{selectedSong.title} - {selectedSong.artist}</p>
                  <p className="text-[10px] text-zinc-500">{module.title} -- {mode} mode</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Live</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <h4 className="font-bold text-white text-sm mb-3">Adaptation Modes</h4>
                <div className="space-y-1.5">
                  {getModes().map(m => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`w-full p-3 rounded-xl text-left text-sm font-bold transition-all ${
                        mode === m
                        ? `${activeColor.bg} text-white shadow-lg`
                        : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <h4 className="font-bold text-white text-sm mb-3">Real-time Metrics</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Sensory Load', value: isPlaying ? '12%' : '0%', color: 'bg-emerald-500' },
                    { label: 'Phoneme Density', value: isPlaying ? 'High' : '-', color: 'bg-blue-500' },
                    { label: 'Haptic Intensity', value: isPlaying ? 'Medium' : '-', color: 'bg-orange-500' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase mb-1">
                        <span>{stat.label}</span>
                        <span>{stat.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isPlaying ? '70%' : '0%' }}
                          className={`h-full ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
              <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> AI Insights
              </h4>
              <AnimatePresence mode="wait">
                <motion.div
                  key={insightIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3 bg-white/5 rounded-xl border border-white/10"
                >
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1.5">
                    {isPlaying ? 'Live Analysis' : 'Pre-Session'}
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-300 italic">
                    {isPlaying
                      ? (moduleInsights[module.id]?.[insightIndex] || "Analyzing stems...")
                      : "Initialize session to begin real-time adaptation."
                    }
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Accessibility Score</p>
                <div className="text-2xl font-bold text-emerald-400">{isPlaying ? '98/100' : '--'}</div>
              </div>
            </div>

            <div className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <h4 className="font-bold text-white text-sm mb-3">Quick Feedback</h4>
              <p className="text-[11px] text-zinc-400 mb-3">How comfortable is this adaptation?</p>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { label: 'Too Intense', value: 'intense' },
                  { label: 'Needs Tweak', value: 'tweak' },
                  { label: 'Comfortable', value: 'comfortable' },
                  { label: 'Perfect', value: 'perfect' }
                ].map((fb) => (
                  <button
                    key={fb.value}
                    className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                  >
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-center leading-tight">{fb.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[11px] text-zinc-400 mb-2">Adjust intensity:</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-1 text-[10px] font-bold text-zinc-500 uppercase">
                  <span>Less</span>
                  <span>More</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <h4 className="font-bold text-white text-sm mb-3">How it works</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our engine separates the track into 4 stems (Vocals, Drums, Bass, Other) using Demucs v4, then applies your accessibility profile in real-time.
              </p>
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
    { title: "Shape of You", artist: "Ed Sheeran", album: "Divide", image: "https://picsum.photos/seed/shapeofyou/200/200" },
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
      description: 'Sensory-adaptive music for neurodivergent listeners.',
    },
    {
      id: 'voicejourney',
      title: 'VoiceJourney',
      icon: Mic2,
      color: 'blue',
      description: 'AI-powered speech therapy through music.',
    },
    {
      id: 'soundcanvas',
      title: 'SoundCanvas',
      icon: Ear,
      color: 'orange',
      description: 'Visual & haptic translation for Deaf/HoH.',
    }
  ];

  const activeModuleData = modules.find(m => m.id === activeModule);

  const handleLaunch = () => {
    if (activeModule) {
      setShowExperience(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      <header className="sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Music className="text-zinc-900 w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Amplify Access</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Active</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
              <Settings className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="p-2 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
              <User className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back{profile.name ? `, ${profile.name}` : ''}</h1>
          <p className="text-zinc-400 text-sm mt-1">Select a track and module to begin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">WMG Catalog</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {songs.map((song) => (
                  <motion.button
                    key={song.title}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedSong(song)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedSong.title === song.title
                      ? 'bg-white/10 backdrop-blur-xl border-emerald-500/50 shadow-lg ring-1 ring-emerald-500/20'
                      : 'bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="aspect-square bg-zinc-800 rounded-xl mb-2 overflow-hidden">
                      <img src={song.image} alt={song.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <p className="font-bold text-white text-xs truncate">{song.title}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{song.artist}</p>
                  </motion.button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Choose a Module</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {modules.map((m) => (
                  <ModuleCard
                    key={m.id}
                    {...m}
                    active={activeModule === m.id}
                    onClick={() => setActiveModule(m.id)}
                  />
                ))}
              </div>
            </section>

            <AnimatePresence mode="wait">
              {activeModule && activeModuleData && (
                <motion.section
                  key={activeModule}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                >
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-${activeModuleData.color}-500/20 flex items-center justify-center`}>
                        <activeModuleData.icon className={`w-5 h-5 text-${activeModuleData.color}-400`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{activeModuleData.title}</h3>
                        <p className="text-xs text-zinc-400">{activeModuleData.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 mb-5">
                    <div className="w-14 h-14 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                      <img src={selectedSong.image} alt="Album Art" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white text-sm">{selectedSong.title}</p>
                      <p className="text-xs text-zinc-400">{selectedSong.artist} -- {selectedSong.album}</p>
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '45%' }}
                          className={`h-full bg-${activeModuleData.color}-500`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleLaunch}
                      className={`flex-1 py-3 bg-${activeModuleData.color}-500 text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2`}
                    >
                      <Play className="w-4 h-4 fill-current" /> Launch Experience
                    </button>
                    <button className="px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-zinc-400 hover:bg-white/20 transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <aside className="space-y-4">
            <div className="p-5 bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
              <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> AI Adaptations
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Stem Separation', status: 'Optimal', icon: Volume2 },
                  { label: 'Dynamic Range', status: 'Compressed (4:1)', icon: Activity },
                  { label: 'Haptic Mapping', status: 'Synced', icon: Ear },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-xs font-medium text-zinc-300">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {profile.needs.length > 0 && (
              <div className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <h3 className="font-bold text-white text-sm mb-3">Your Profile</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.needs.map(n => (
                    <span key={n} className="px-2 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase text-zinc-300">{n}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <h3 className="font-bold text-white text-sm mb-2">How it works</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Select a track from the WMG catalog, choose an accessibility module, and launch the experience. The AI adapts the music in real-time to your sensory profile.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 lg:px-8 py-8 mt-8 border-t border-white/5 flex justify-between items-center relative z-10">
        <p className="text-xs text-zinc-500">Amplify Access -- Warner Music Group x Presidio</p>
        <div className="flex gap-6 text-xs font-bold uppercase tracking-widest text-zinc-600">
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </footer>

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
    <div className="min-h-screen bg-[#0a0a0a]">
      {!onboarded ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard profile={profile} />
      )}
    </div>
  );
}
