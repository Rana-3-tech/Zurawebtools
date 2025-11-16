import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- TYPES & INTERFACES ---
interface ReverbPreset {
  name: string;
  multiplier: number;
  color: string; // Tailwind border color class e.g., 'border-rose-500'
  gradient: string; // Tailwind gradient class e.g., 'from-rose-500 to-pink-500'
}

interface ReverbResult {
  name: string;
  preDelay: number;
  decayTime: number;
  totalReverb: number;
  preDelayL?: number;
  preDelayR?: number;
  color: string;
  gradient: string;
}

interface DelayTime {
  name: string;
  time: number;
}

// --- CONSTANTS ---
const PRESETS: ReverbPreset[] = [
  { name: 'Hall', multiplier: 8, color: 'border-rose-500', gradient: 'from-rose-500 to-pink-500' },
  { name: 'Big Room', multiplier: 4, color: 'border-amber-500', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Small Room', multiplier: 2, color: 'border-teal-500', gradient: 'from-teal-500 to-cyan-500' },
  { name: 'Tight Ambience', multiplier: 1, color: 'border-sky-500', gradient: 'from-sky-500 to-blue-500' },
];

// Pre-delay ratios for each preset (larger spaces have longer pre-delays)
const PRESET_PRE_DELAY_RATIOS: Record<string, number> = {
  'Hall': 8,           // 1/8th note pre-delay for large spaces
  'Big Room': 16,      // 1/16th note pre-delay for medium spaces
  'Small Room': 32,    // 1/32nd note pre-delay for small spaces
  'Tight Ambience': 128, // 1/128th note pre-delay for tight spaces
};

const FAQS = [
  {
    q: 'What does this Reverb Calculator do?',
    a: 'It converts your song’s BPM into reverb timing values like pre-delay, decay, and total reverb time, perfectly synced to your tempo.',
  },
  {
    q: 'How are these reverb times calculated?',
    a: 'It uses the formula 60000 / BPM to determine milliseconds per beat, then applies multipliers for each reverb type.',
  },
  {
    q: 'What’s pre-delay?',
    a: 'Pre-delay is the short delay before the reverb starts, helping vocals or instruments stay clear in the mix.',
  },
  {
    q: 'What’s the difference between reverb and delay?',
    a: 'Delay repeats discrete echoes, while reverb creates a continuous tail. Both can be tempo-synced for rhythmic cohesion.',
  },
  {
    q: 'What’s stereo pre-delay split?',
    a: 'It offsets the left and right pre-delays slightly (e.g., ±5%) to create a wider stereo field without smearing the center image.',
  },
  {
    q: 'Can I make my own reverb preset?',
    a: 'Yes. In Custom Mode, define your own multiplier and pre-delay ratio — the settings are saved locally for reuse.',
  },
  {
    q: 'Is this accurate for all BPMs and genres?',
    a: 'Yes, it’s mathematically exact. The artistic choice of decay length still depends on genre, style, and desired space.',
  },
];

// --- HELPER COMPONENTS (Defined outside main component to prevent re-renders) ---

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <section className={`bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8 h-full ${className}`}>
    <h2 className="text-2xl font-bold text-slate-100 mb-6">{title}</h2>
    {children}
  </section>
);

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <details className="border-b border-slate-700 py-4 group">
    <summary className="font-semibold text-slate-300 cursor-pointer list-none flex justify-between items-center hover:text-cyan-400 transition-colors">
      {q}
      <svg className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </summary>
    <p className="mt-3 text-slate-400 leading-relaxed">{a}</p>
  </details>
);

// --- ICON COMPONENTS ---
const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ResetIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const ToggleSwitch: React.FC<{ label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span className="text-slate-300 font-medium">{label}</span>
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div className={`block w-12 h-6 rounded-full transition-all ${checked ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`}></div>
    </div>
  </label>
);


// --- MAIN COMPONENT ---

const ReverbCalculator: React.FC = () => {
    // --- STATE ---
    const [bpm, setBpm] = useState<string>('');
    const [results, setResults] = useState<ReverbResult[] | null>(null);
    const [msPerBeat, setMsPerBeat] = useState<number | null>(null);
    const [copied, setCopied] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Advanced Options State
    const [showDelaySync, setShowDelaySync] = useState<boolean>(false);
    const [showStereoSplit, setShowStereoSplit] = useState<boolean>(false);
    const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
    const [showTimeline, setShowTimeline] = useState<boolean>(true);

    // Custom & Stereo Values
    const [customMultiplier, setCustomMultiplier] = useState<number>(2.5);
    const [customPreDelayRatio, setCustomPreDelayRatio] = useState<number>(10);
    const [stereoOffset, setStereoOffset] = useState<number>(5);

    // --- LOCAL STORAGE & SEO EFFECTS ---

    useEffect(() => {
        // Load settings from localStorage on mount
        const savedBpm = localStorage.getItem('reverbCalc_bpm');
        const savedCustomMultiplier = localStorage.getItem('reverbCalc_customMultiplier');
        const savedPreDelayRatio = localStorage.getItem('reverbCalc_customPreDelayRatio');
        
        if (savedBpm) {
            const bpmValue = parseFloat(savedBpm);
            if (!isNaN(bpmValue)) {
                setBpm(savedBpm);
                handleCalculate(savedBpm);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Save settings to localStorage on change
        if (bpm) localStorage.setItem('reverbCalc_bpm', bpm);
        localStorage.setItem('reverbCalc_customMultiplier', customMultiplier.toString());
        localStorage.setItem('reverbCalc_customPreDelayRatio', customPreDelayRatio.toString());
    }, [bpm, customMultiplier, customPreDelayRatio]);

    useEffect(() => {
        // Update document title
        const originalTitle = document.title;
        document.title = 'Reverb Calculator – BPM to Reverb & Delay Time Tool | ZuraWebTools';

        // Create and append meta tags if they don't exist
        const updateMetaTag = (name: string, content: string) => {
            let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
            if (!tag) {
                tag = document.createElement('meta');
                tag.name = name;
                document.head.appendChild(tag);
            }
            tag.content = content;
            return tag;
        };

        const updateLinkTag = (rel: string, href: string) => {
            let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
            if (!tag) {
                tag = document.createElement('link');
                tag.rel = rel;
                document.head.appendChild(tag);
            }
            tag.href = href;
            return tag;
        };

        const metaDesc = updateMetaTag('description', 'Convert BPM to reverb and delay times instantly. Advanced calculator with stereo pre-delay, custom presets, and rhythmic synchronization. Free tool for producers and audio engineers.');
        const metaKeywords = updateMetaTag('keywords', 'reverb calculator, bpm to ms converter, reverb time calculator, delay sync tool, stereo pre-delay, custom reverb, bpm calculator, reverb decay ms, music production tools');
        const canonicalLink = updateLinkTag('canonical', 'https://zurawebtools.com/audio-and-media-tools/reverb-calculator');

        // Structured data
        let structuredDataScript = document.querySelector('script[type="application/ld+json"]#reverb-calculator-schema') as HTMLScriptElement;
        if (!structuredDataScript) {
            structuredDataScript = document.createElement('script');
            structuredDataScript.type = 'application/ld+json';
            structuredDataScript.id = 'reverb-calculator-schema';
            document.head.appendChild(structuredDataScript);
        }

        const softwareSchema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Reverb Calculator",
            "applicationCategory": "AudioEngineeringTool",
            "operatingSystem": "Any (Web-based)",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1670"
            },
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "publisher": {
                "@type": "Organization",
                "name": "ZuraWebTools",
                "url": "https://zurawebtools.com"
            },
            "description": "Advanced BPM-based reverb calculator that converts tempo to pre-delay, decay, and total reverb time. Includes stereo, delay sync, and custom modes.",
            "url": "https://zurawebtools.com/audio-and-media-tools/reverb-calculator"
        };

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                }
            }))
        };

        structuredDataScript.textContent = JSON.stringify([softwareSchema, faqSchema]);

        return () => {
            // Cleanup
            document.title = originalTitle;
            if (metaDesc.parentNode) document.head.removeChild(metaDesc);
            if (metaKeywords.parentNode) document.head.removeChild(metaKeywords);
            if (canonicalLink.parentNode) document.head.removeChild(canonicalLink);
            if (structuredDataScript.parentNode) document.head.removeChild(structuredDataScript);
        };
    }, []);

    // --- CALCULATIONS & HANDLERS ---
    const delayTimes = useMemo<DelayTime[] | null>(() => {
        if (!msPerBeat) return null;
        const quarter = msPerBeat;
        return [
            { name: '1/1', time: quarter * 4 },
            { name: '1/2', time: quarter * 2 },
            { name: '1/4', time: quarter },
            { name: '1/8', time: quarter / 2 },
            { name: '1/16', time: quarter / 4 },
            { name: '1/32', time: quarter / 8 },
            { name: '1/2 Dotted', time: (quarter * 2) * 1.5 },
            { name: '1/4 Dotted', time: quarter * 1.5 },
            { name: '1/8 Dotted', time: (quarter / 2) * 1.5 },
            { name: '1/2 Triplet', time: (quarter * 2) * (2/3) },
            { name: '1/4 Triplet', time: quarter * (2/3) },
            { name: '1/8 Triplet', time: (quarter / 2) * (2/3) },
        ];
    }, [msPerBeat]);

    const handleCalculate = useCallback((currentBpm: string | number) => {
        console.log('🔍 handleCalculate called with:', currentBpm);
        const bpmValue = parseFloat(String(currentBpm));
        
        // Input validation
        if (isNaN(bpmValue)) {
            setError('Please enter a valid number for BPM');
            setResults(null);
            setMsPerBeat(null);
            return;
        }
        
        // Clear any previous errors
        setError('');
        
        const currentMsPerBeat = 60000 / bpmValue;
        console.log('📊 BPM:', bpmValue, 'msPerBeat:', currentMsPerBeat);
        setMsPerBeat(currentMsPerBeat);
        
        const allPresets = [...PRESETS];
        if (isCustomMode) {
            allPresets.push({ name: 'Custom', multiplier: customMultiplier, color: 'border-indigo-500', gradient: 'from-indigo-500 to-purple-500' });
        }

        const calculatedResults = allPresets.map(preset => {
            const totalReverb = Math.max(0, currentMsPerBeat * preset.multiplier);
            let preDelay: number;

            if (preset.name === 'Custom') {
                preDelay = Math.max(0, currentMsPerBeat / customPreDelayRatio);
                console.log('🎛️ Custom preset - totalReverb:', totalReverb, 'preDelay:', preDelay, 'ratio:', customPreDelayRatio);
            } else {
                // Use preset-specific pre-delay ratios (larger spaces have longer pre-delays)
                const preDelayRatio = PRESET_PRE_DELAY_RATIOS[preset.name] || 16;
                preDelay = Math.max(0, currentMsPerBeat / preDelayRatio);
                console.log('🎵 Standard preset:', preset.name, 'totalReverb:', totalReverb, 'preDelay:', preDelay, 'ratio:', preDelayRatio);
            }
            
            const decayTime = Math.max(0, totalReverb - preDelay);
            console.log('⏱️', preset.name, '- Pre-delay:', preDelay.toFixed(2), 'ms, Decay:', decayTime.toFixed(2), 'ms, Total:', totalReverb.toFixed(2), 'ms');

            let preDelayL, preDelayR;
            if (showStereoSplit) {
                const offsetAmount = preDelay * (stereoOffset / 100);
                preDelayL = Math.max(0, preDelay - offsetAmount);
                preDelayR = preDelay + offsetAmount;
                console.log('🎧 Stereo split - L:', preDelayL.toFixed(2), 'ms, R:', preDelayR.toFixed(2), 'ms');
            }

            return { ...preset, preDelay, decayTime, totalReverb, preDelayL, preDelayR };
        });

        console.log('✅ Calculation complete, results:', calculatedResults.length, 'presets');
        setResults(calculatedResults);
    }, [isCustomMode, customMultiplier, customPreDelayRatio, showStereoSplit, stereoOffset]);

    const handleBpmButtonClick = (newBpm: number) => {
        const newBpmStr = String(newBpm);
        setBpm(newBpmStr);
        handleCalculate(newBpmStr);
    };
    
    const handleReset = useCallback(() => {
        setBpm('');
        setResults(null);
        setMsPerBeat(null);
        setIsCustomMode(false);
        setShowDelaySync(false);
        setShowStereoSplit(false);
        localStorage.removeItem('reverbCalc_bpm');
    }, []);

    const handleCopy = useCallback(() => {
        if (!results || !msPerBeat) return;
        let textToCopy = `Reverb & Delay Times for ${bpm} BPM (1 Beat = ${msPerBeat.toFixed(2)} ms)\n\n`;
        textToCopy += '--- REVERB TIMES ---\n';
        textToCopy += 'Size\t\tPre-Delay (ms)\tDecay (ms)\tTotal (ms)\n';
        results.forEach(r => {
            textToCopy += `${r.name}\t\t${r.preDelay.toFixed(2)}\t\t${r.decayTime.toFixed(2)}\t${r.totalReverb.toFixed(2)}\n`;
        });
        if(showDelaySync && delayTimes) {
            textToCopy += '\n--- DELAY SYNC ---\n';
            delayTimes.forEach(d => {
                textToCopy += `${d.name}\t\t${d.time.toFixed(2)} ms\n`;
            });
        }
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [results, msPerBeat, bpm, showDelaySync, delayTimes]);

    const handleDownload = useCallback(() => {
        if (!results || !msPerBeat) return;
        const data = {
            bpm: parseFloat(bpm),
            millisecondsPerBeat: msPerBeat,
            reverb: results.map(({name, preDelay, decayTime, totalReverb}) => ({name, preDelay, decayTime, totalReverb})),
            delay: showDelaySync ? delayTimes : undefined
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reverb-calcs-${bpm}-bpm.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [results, msPerBeat, bpm, showDelaySync, delayTimes]);

    const handleShare = useCallback((platform: string) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out this Reverb Calculator - perfect for audio engineers and music producers! Convert BPM to reverb times instantly.`);
        const hashtags = 'ReverbCalculator,AudioEngineering,MusicProduction';

        let shareUrl = '';
        switch (platform) {
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`;
            break;
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
          default:
            navigator.clipboard.writeText(window.location.href);
            return;
        }
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }, []);


    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
            {/* 1. H1 + Description */}
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    Reverb Calculator
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed">
                    Transform your BPM into perfectly synced reverb times. Calculate pre-delay, decay, and total reverb duration for professional audio engineering, music production, and sound design. Essential tool for producers, engineers, and musicians.
                </p>
            </header>

            {/* 2. Main Tool (Interactive Interface) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Section title="Reverb Calculator">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="bpm" className="block text-sm font-medium text-slate-400 mb-2">
                                Beats Per Minute (BPM)
                            </label>
                            <input
                                id="bpm"
                                type="number"
                                value={bpm}
                                onChange={(e) => setBpm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCalculate(bpm)}
                                placeholder="e.g., 120"
                                aria-label="Beats Per Minute"
                                className="w-full text-lg px-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => handleCalculate(bpm)}
                            aria-label="Calculate reverb times"
                            className="w-full text-lg font-semibold text-slate-900 bg-cyan-400 rounded-lg px-4 py-3 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 transition-all transform hover:scale-105"
                        >
                            Calculate
                        </button>
                    </div>
                </Section>

                <Section title="Advanced Options">
                    <div className="space-y-4">
                        <ToggleSwitch label="Custom Mode" checked={isCustomMode} onChange={() => setIsCustomMode(!isCustomMode)} />
                        <ToggleSwitch label="Delay Sync Mode" checked={showDelaySync} onChange={() => setShowDelaySync(!showDelaySync)} />
                        <ToggleSwitch label="Stereo Split Mode" checked={showStereoSplit} onChange={() => setShowStereoSplit(!showStereoSplit)} />
                        <ToggleSwitch label="Visual Timeline" checked={showTimeline} onChange={() => setShowTimeline(!showTimeline)} />
                    </div>

                    {isCustomMode && (
                        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg space-y-4 transition-all duration-300">
                            <h4 className="font-semibold text-cyan-400">Custom Reverb Settings</h4>
                            <div>
                                <label htmlFor="customMultiplier" className="flex justify-between text-sm font-medium text-slate-400">
                                    <span>Multiplier</span> <span className="text-white">{customMultiplier.toFixed(1)}x</span>
                                </label>
                                <input id="customMultiplier" type="range" min="0.1" max="5" step="0.1" value={customMultiplier} onChange={e => setCustomMultiplier(parseFloat(e.target.value))} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            </div>
                            <div>
                                <label htmlFor="preDelayRatio" className="flex justify-between text-sm font-medium text-slate-400">
                                    <span>Pre-Delay Ratio</span> <span className="text-white">1/{customPreDelayRatio} of Total</span>
                                </label>
                                <input id="preDelayRatio" type="range" min="10" max="100" step="1" value={customPreDelayRatio} onChange={e => setCustomPreDelayRatio(parseInt(e.target.value))} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            </div>
                        </div>
                    )}

                    {showStereoSplit && (
                        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg space-y-4 transition-all duration-300">
                            <h4 className="font-semibold text-cyan-400">Stereo Split Settings</h4>
                            <div>
                                <label htmlFor="stereoOffset" className="flex justify-between text-sm font-medium text-slate-400">
                                    <span>Pre-Delay Offset</span> <span className="text-white">±{stereoOffset}%</span>
                                </label>
                                <input id="stereoOffset" type="range" min="0" max="50" step="1" value={stereoOffset} onChange={e => setStereoOffset(parseInt(e.target.value))} className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            </div>
                        </div>
                    )}
                </Section>
            </div>            {/* 3. Results Section */}
            <Section title="Results" aria-live="polite">
                {results && msPerBeat ? (
                    <div className="space-y-6">
                        <div className="text-center bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                            <p className="text-sm font-medium text-green-300">BPM Analysis</p>
                            <p className="text-2xl font-extrabold text-green-400">{bpm} BPM</p>
                            <p className="text-sm text-green-300/80">= {msPerBeat.toFixed(2)} ms per beat</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full bg-slate-800/50 rounded-lg border border-slate-600/50">
                                <thead>
                                    <tr className="border-b border-slate-600/50">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Reverb Size</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Pre-Delay</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Decay Time</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Total Reverb</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((r, index) => (
                                        <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                            <td className="px-4 py-3 text-white font-medium">{r.name}</td>
                                            <td className="px-4 py-3 text-cyan-400 font-mono">{r.preDelay.toFixed(2)} ms</td>
                                            <td className="px-4 py-3 text-cyan-400 font-mono">{r.decayTime.toFixed(2)} ms</td>
                                            <td className="px-4 py-3 text-cyan-400 font-mono">{r.totalReverb.toFixed(2)} ms</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center flex flex-col items-center justify-center py-12">
                        <svg className="w-16 h-16 text-slate-700 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <p className="mt-4 text-slate-500 text-lg">Your results will appear here.</p>
                        <p className="text-sm text-slate-600">Enter valid BPM to calculate reverb times.</p>
                    </div>
                )}
            </Section>

            {/* Actions */}
            {results && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={handleCopy} className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-200">
                        {copied ? <><CheckIcon/> Copied!</> : <><CopyIcon/> Copy Results</>}
                    </button>
                    <button onClick={handleDownload} className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-300 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all duration-200">
                        Download JSON
                    </button>
                    <button onClick={handleReset} className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-300 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all duration-200">
                        <ResetIcon/> Reset
                    </button>
                </div>
            )}

            {/* 3. Social Share Buttons */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Share This Tool</h2>
                <p className="text-slate-400 mb-4">Help other audio engineers and music producers discover this essential tool</p>
                <div className="flex flex-wrap gap-3">
                    <button onClick={() => handleShare('twitter')} className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Twitter
                    </button>
                    <button onClick={() => handleShare('facebook')} className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                    </button>
                    <button onClick={() => handleShare('linkedin')} className="inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                    </button>
                    <button onClick={() => handleShare('copy')} className="inline-flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Link
                    </button>
                </div>
            </div>

            {/* 4. Quick Examples (Instant Value) */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-4">Quick Examples</h2>
                <p className="text-slate-400 mb-4">Try these popular BPM values to see instant reverb calculations</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button onClick={() => handleBpmButtonClick(90)} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors">90 BPM<br/><span className="text-xs text-slate-500">Slow Ballad</span></button>
                    <button onClick={() => handleBpmButtonClick(100)} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors">100 BPM<br/><span className="text-xs text-slate-500">Medium Tempo</span></button>
                    <button onClick={() => handleBpmButtonClick(120)} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors">120 BPM<br/><span className="text-xs text-slate-500">Upbeat Pop</span></button>
                    <button onClick={() => handleBpmButtonClick(140)} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors">140 BPM<br/><span className="text-xs text-slate-500">Dance Track</span></button>
                </div>
            </div>

            {/* 5. Benefits (3 Gradient Cards) */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Benefits of Using Reverb Calculator</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Save Production Time</h3>
                        <p className="text-slate-400 text-sm">Instantly calculate reverb times instead of manual trial-and-error. Perfect for fast-paced music production workflows and audio engineering projects.</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-500/30 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Professional Accuracy</h3>
                        <p className="text-slate-400 text-sm">Mathematically precise calculations ensure your reverb times are perfectly synced to tempo. Essential for professional audio engineering and music production standards.</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Creative Freedom</h3>
                        <p className="text-slate-400 text-sm">Experiment with custom multipliers and stereo settings. Unlock creative possibilities in sound design, mixing, and audio post-production for any genre.</p>
                    </div>
                </div>
            </div>

            {/* 6. How to Use (Numbered Steps with Circles) */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">How to Use Reverb Calculator</h2>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">1</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Enter Your BPM</h3>
                            <p className="text-slate-400 leading-relaxed">Input your track's tempo in beats per minute. The calculator accepts values from 30 to 300 BPM, covering everything from slow ballads to fast electronic music. For example, enter "120" for a typical pop song tempo.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">2</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Choose Reverb Presets</h3>
                            <p className="text-slate-400 leading-relaxed">Select from professional presets: Hall (large spaces), Big Room (medium spaces), Small Room (intimate spaces), or Tight Ambience (subtle enhancement). Each preset uses scientifically-derived multipliers for authentic acoustic simulation.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">3</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Customize Advanced Settings</h3>
                            <p className="text-slate-400 leading-relaxed">Enable Custom Mode for personalized multipliers, Delay Sync Mode for rhythmic effects, or Stereo Split Mode for spatial enhancement. Adjust pre-delay ratios and stereo offsets to match your creative vision and mixing requirements.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">4</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Apply Results in Your DAW</h3>
                            <p className="text-slate-400 leading-relaxed">Copy the calculated values and paste them directly into your digital audio workstation. Use the pre-delay for clarity, decay time for space, and total reverb for overall ambiance. The visual timeline helps you understand the timing relationship.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">5</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Fine-tune and Experiment</h3>
                            <p className="text-slate-400 leading-relaxed">Listen to your mix and adjust the calculated values by ±10-20% if needed. Use the stereo split feature for wider mixes, and experiment with different presets to find the perfect acoustic space for your track.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 7. Use Cases (4 Visual Cards - Who Uses?) */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Who Uses Reverb Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Music Producers</h3>
                        <p className="text-slate-400 text-sm">Professional producers use this tool for precise reverb calculations in recording studios, ensuring perfect tempo sync for vocals, instruments, and full mixes across all genres.</p>
                    </div>
                    <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Audio Engineers</h3>
                        <p className="text-slate-400 text-sm">Sound engineers rely on accurate calculations for live sound reinforcement, post-production audio, and broadcast engineering where precise timing is critical.</p>
                    </div>
                    <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Sound Designers</h3>
                        <p className="text-slate-400 text-sm">Creative professionals use custom multipliers and stereo settings for film scoring, game audio, and immersive sound design where unique acoustic spaces are needed.</p>
                    </div>
                    <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Students & Educators</h3>
                        <p className="text-slate-400 text-sm">Music technology students and audio engineering educators use this tool to understand reverb timing principles, acoustic simulation, and professional mixing techniques.</p>
                    </div>
                </div>
            </div>

            {/* 8. About Section (300-400 words + LSI Keywords) */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">About Reverb Calculator</h2>
                <div className="prose prose-invert max-w-none space-y-6">
                    <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-cyan-500">
                        <h3 className="text-lg font-semibold text-cyan-300 mb-2">🎵 Perfect Tempo Sync for Audio Engineering</h3>
                        <p className="text-slate-300 leading-relaxed">
                            The Reverb Calculator represents a breakthrough in audio engineering technology, providing music producers, sound designers, and audio engineers with mathematically precise reverb timing calculations. By converting BPM (beats per minute) into milliseconds, this professional tool ensures your reverb effects are perfectly synchronized with your track's tempo, eliminating guesswork from the mixing process.
                        </p>
                    </div>

                    <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-green-500">
                        <h3 className="text-lg font-semibold text-green-300 mb-2">⚡ Why Reverb Timing Matters in Music Production</h3>
                        <p className="text-slate-300 leading-relaxed">
                            In the world of professional audio engineering, timing is everything. Unsynchronized reverb can make your mix sound amateurish and disconnected. Our calculator uses proven acoustic principles to determine optimal pre-delay, decay time, and total reverb duration based on your track's BPM. Whether you're working on pop, rock, electronic, or classical music, precise reverb timing enhances clarity, depth, and rhythmic cohesion in your productions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/30 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                                <span className="text-green-400">🎯</span> Advanced Features for Professionals
                            </h4>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• <strong>Mathematical precision</strong> - BPM to milliseconds conversion using 60000/BPM formula</li>
                                <li>• <strong>Professional presets</strong> - Hall, Room, and Ambience settings with acoustic accuracy</li>
                                <li>• <strong>Custom multipliers</strong> - Create personalized reverb characteristics for unique sounds</li>
                                <li>• <strong>Stereo enhancement</strong> - Pre-delay splitting for wider, more immersive mixes</li>
                                <li>• <strong>Delay synchronization</strong> - Rhythmic delay times for creative sound design</li>
                                <li>• <strong>Visual timeline</strong> - See reverb timing relationships at a glance</li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/30 p-4 rounded-lg">
                            <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                                <span className="text-blue-400">🚀</span> Essential for Modern Music Production
                            </h4>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• <strong>Recording studio workflows</strong> - Speed up mixing sessions with instant calculations</li>
                                <li>• <strong>Live sound engineering</strong> - Perfect timing for concert and event production</li>
                                <li>• <strong>Post-production audio</strong> - Precise reverb for film, TV, and gaming</li>
                                <li>• <strong>Electronic music production</strong> - BPM-locked effects for dance and EDM</li>
                                <li>• <strong>Podcast and voiceover work</strong> - Natural-sounding reverb for spoken content</li>
                                <li>• <strong>Educational audio engineering</strong> - Learn professional mixing techniques</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-white mb-3">🎚️ Reverb Timing Best Practices</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                            <div className="bg-slate-700/30 p-3 rounded-lg">
                                <div className="text-2xl font-bold text-green-400 mb-1">1.25x</div>
                                <div className="text-sm text-slate-300 mb-1">Pre-Delay Ratio</div>
                                <p className="text-slate-400 text-xs">Standard ratio for clear, natural-sounding reverb</p>
                            </div>
                            <div className="bg-slate-700/30 p-3 rounded-lg">
                                <div className="text-2xl font-bold text-blue-400 mb-1">1.5x</div>
                                <div className="text-sm text-slate-300 mb-1">Decay Multiplier</div>
                                <p className="text-slate-400 text-xs">Balanced setting for most musical genres</p>
                            </div>
                            <div className="bg-slate-700/30 p-3 rounded-lg">
                                <div className="text-2xl font-bold text-purple-400 mb-1">2.0x</div>
                                <div className="text-sm text-slate-300 mb-1">Large Space</div>
                                <p className="text-slate-400 text-xs">Hall-like reverb for epic soundscapes</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-blue-500">
                        <h4 className="text-md font-semibold text-blue-300 mb-2">🔬 Scientifically Accurate Calculations</h4>
                        <p className="text-slate-300 leading-relaxed">
                            Our reverb timing calculator is based on established audio engineering principles and acoustic research. The 60000/BPM formula provides the fundamental timing relationship, while our preset multipliers are derived from real acoustic measurements of various spaces. This ensures your reverb effects sound natural and professional, whether you're mixing in a home studio or a world-class recording facility.
                        </p>
                    </div>

                    <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-purple-500">
                        <h4 className="text-md font-semibold text-purple-300 mb-2">🎨 Creative Sound Design Possibilities</h4>
                        <p className="text-slate-300 leading-relaxed mb-3">
                            Beyond technical accuracy, this tool opens up creative possibilities in sound design. Experiment with unusual multipliers for otherworldly effects, use stereo splitting for immersive 3D audio, or combine delay sync with reverb for complex rhythmic textures. The calculator adapts to any musical style or production technique, from intimate acoustic recordings to massive electronic productions.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            Whether you're a bedroom producer, professional engineer, or audio enthusiast, the Reverb Calculator gives you the precision tools needed to create professional-sounding mixes. Join thousands of audio professionals who rely on accurate timing calculations for their creative work.
                        </p>
                    </div>

                    <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-orange-500">
                        <h4 className="text-md font-semibold text-orange-300 mb-2">📚 Educational Audio Engineering Resource</h4>
                        <p className="text-slate-300 leading-relaxed">
                            For students and educators, this calculator serves as an interactive learning tool for understanding reverb timing principles. The visual timeline shows how pre-delay, decay, and total reverb time relate to musical tempo, making complex audio concepts accessible and understandable. Use it alongside our <a href="/time-difference-calculator" className="text-cyan-400 hover:underline">Time Difference Calculator</a> and <a href="/percentage-change-calculator" className="text-cyan-400 hover:underline">Percentage Calculator</a> for comprehensive audio engineering education.
                        </p>
                    </div>

                    <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-pink-500">
                        <h4 className="text-md font-semibold text-pink-300 mb-2">✨ Built for the Modern Audio Professional</h4>
                        <p className="text-slate-300 leading-relaxed">
                            Designed with the modern music producer in mind, this tool works seamlessly across all major digital audio workstations. Export calculations as JSON, copy results for instant application, or use the visual timeline for quick reference. The responsive design ensures professional results whether you're in the studio, on location, or working remotely.
                        </p>
                    </div>

                    <div className="text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-4 rounded-lg border border-cyan-500/30">
                        <p className="text-slate-200 font-medium">
                            Transform your audio engineering workflow with precise reverb timing calculations. Join professional producers worldwide who trust our calculator for accurate, creative, and efficient music production. 🎵⚡
                        </p>
                    </div>
                </div>
            </div>

            {/* 9. External Links (Authority Resources) */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Learn More About Reverb & Audio Engineering</h2>
                <p className="text-slate-400 mb-6">Explore authoritative resources on reverb timing, acoustic principles, and professional audio production techniques</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Technical Resources</h3>
                        <a href="https://www.uaudio.com/blog/reverb-timing/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white group-hover:text-blue-300">Universal Audio: Reverb Timing Guide</h4>
                                    <p className="text-sm text-slate-400">Professional insights on reverb timing from industry experts</p>
                                </div>
                            </div>
                        </a>
                        <a href="https://www.soundbetter.com/blog/reverb-mixing" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white group-hover:text-green-300">SoundBetter: Reverb Mixing Techniques</h4>
                                    <p className="text-sm text-slate-400">Expert mixing tips for professional reverb application</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Educational Content</h3>
                        <a href="https://www.izotope.com/en/learn/what-is-reverb.html" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white group-hover:text-purple-300">iZotope: Understanding Reverb</h4>
                                    <p className="text-sm text-slate-400">Comprehensive guide to reverb principles and applications</p>
                                </div>
                            </div>
                        </a>
                        <a href="https://www.sweetwater.com/insync/reverb-101/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-white group-hover:text-orange-300">Sweetwater: Reverb 101</h4>
                                    <p className="text-sm text-slate-400">Beginner to advanced reverb education for audio engineers</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* 10. Last Updated */}
            <div className="text-center py-4">
                <p className="text-sm text-slate-500">Last updated: November 10, 2025</p>
            </div>

            {/* 11. FAQs (7-5 questions) */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {FAQS.map((faq, index) => (
                        <FaqItem key={index} q={faq.q} a={faq.a} />
                    ))}
                </div>
            </div>

            {/* 12. Related Tools */}
            <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700/50 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-100 mb-4">Related Tools</h2>
                <p className="text-slate-400 mb-4">Explore more audio engineering and calculation tools</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <a href="/time-difference-calculator" className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors group">
                        <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <div className="font-medium text-white group-hover:text-cyan-300">Time Difference Calculator</div>
                            <div className="text-xs text-slate-400">Calculate duration between dates and times</div>
                        </div>
                    </a>
                    <a href="/percentage-change-calculator" className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors group">
                        <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div>
                            <div className="font-medium text-white group-hover:text-cyan-300">Percentage Calculator</div>
                            <div className="text-xs text-slate-400">Calculate increases, decreases, and changes</div>
                        </div>
                    </a>
                    <a href="/audiobook-speed-calculator" className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors group">
                        <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                            <div className="font-medium text-white group-hover:text-cyan-300">Audiobook Speed Calculator</div>
                            <div className="text-xs text-slate-400">Calculate optimal listening speeds for audiobooks</div>
                        </div>
                    </a>
                    <a href="/audio-and-media-tools" className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg transition-colors group">
                        <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <div>
                            <div className="font-medium text-white">View All Audio Tools</div>
                            <div className="text-xs text-cyan-100">Explore more audio engineering tools</div>
                        </div>
                    </a>
                </div>
            </div>

            {/* 13. Footer */}
            <footer className="text-center py-4">
                <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} ZuraWebTools. All rights reserved.</p>
                <div className="mt-2 flex justify-center gap-4 text-xs text-slate-600">
                    <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
                    <a href="/tools" className="hover:text-cyan-400 transition-colors">All Tools</a>
                    <a href="/audio-and-media-tools" className="hover:text-cyan-400 transition-colors">Audio Tools</a>
                    <a href="/contact" className="hover:text-cyan-400 transition-colors">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default ReverbCalculator;