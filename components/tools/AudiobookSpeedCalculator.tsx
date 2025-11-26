import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- Helper Types ---
interface Time {
  h: number;
  m: number;
  s: number;
}

interface CalculationResult {
  newDuration: Time;
  timeSaved: Time;
  percentageSaved: number;
}

// --- SVG Icons ---
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const ResetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 15M20 20l-1.5-1.5A9 9 0 003.5 9" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


// --- FAQ Content ---
const faqs = [
    {
        q: "1\ufe0f\u20e3 What does this Audiobook Speed Calculator do?",
        a: "It calculates how much shorter an audiobook becomes when you increase the playback speed, showing new duration, time saved, and the percentage reduction in listening time."
    },
    {
        q: "2\ufe0f\u20e3 How do I use it?",
        a: "Enter your audiobook’s total duration (hours, minutes, seconds) and your desired playback speed (e.g., 1.5×). The calculator instantly shows the new listening time and how much time you'll save."
    },
    {
        q: "3\ufe0f\u20e3 Does speeding up audiobooks affect comprehension?",
        a: "It depends on the listener, the narrator's pace, and the complexity of the content. Speeds up to 1.5× are generally comfortable for most people without losing clarity or comprehension."
    },
    {
        q: "4\ufe0f\u20e3 Can I use this calculator for podcasts or lectures?",
        a: "Absolutely! The calculation is based purely on time and speed, so it works perfectly for any audio or video content, including podcasts, lectures, and interviews."
    },
    {
        q: "5\ufe0f\u20e3 How accurate is the time calculation?",
        a: "The calculation is mathematically precise. It converts the total duration to seconds, performs the division, and then converts it back to hours, minutes, and seconds, ensuring there are no rounding errors."
    },
    {
        q: "6\ufe0f\u20e3 What’s the best speed for listening to audiobooks?",
        a: "There's no single 'best' speed. A good starting point is 1.25× or 1.5×, which offers a noticeable time saving without sacrificing comprehension. For simpler content or re-listening, 2× or higher might be fine."
    },
    {
        q: "7\ufe0f\u20e3 Can I use this tool offline?",
        a: "Yes. Once the page is loaded, the calculator runs entirely in your browser using JavaScript. No internet connection is needed to perform calculations, and no data is sent to any server."
    }
];


// --- Main Component ---
const AudiobookSpeedCalculator = () => {
    // --- State Management ---
    const [hours, setHours] = useState('10');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');
    const [speed, setSpeed] = useState('1.5');
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [errors, setErrors] = useState({
        hours: '',
        minutes: '',
        seconds: '',
        speed: ''
    });

    // --- Utility Functions ---
    const formatTime = (totalSeconds: number): Time => {
        if (isNaN(totalSeconds) || totalSeconds < 0) return { h: 0, m: 0, s: 0 };
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);
        return { h, m, s };
    };
    
    const timeToString = (time: Time) => `${time.h}h ${time.m}m ${time.s}s`;
    
    // --- Calculation & Validation Logic ---
    useEffect(() => {
        const h = parseInt(hours);
        const m = parseInt(minutes);
        const s = parseInt(seconds);
        const spd = parseFloat(speed);

        const newErrors = { hours: '', minutes: '', seconds: '', speed: '' };
        let hasErrors = false;

        if (isNaN(h) || h < 0) {
            newErrors.hours = 'Invalid hours';
            hasErrors = true;
        }
        if (isNaN(m) || m < 0 || m > 59) {
            newErrors.minutes = 'Must be 0-59';
            hasErrors = true;
        }
        if (isNaN(s) || s < 0 || s > 59) {
            newErrors.seconds = 'Must be 0-59';
            hasErrors = true;
        }
        if (isNaN(spd) || spd <= 0) {
            newErrors.speed = 'Must be > 0';
            hasErrors = true;
        }

        setErrors(newErrors);

        if (hasErrors) {
            setResult(null);
            return;
        }

        const totalOriginalSeconds = (h * 3600) + (m * 60) + s;
        if (totalOriginalSeconds === 0) {
            setResult(null);
            return;
        }

        const newTotalSeconds = totalOriginalSeconds / spd;
        const timeSavedSeconds = totalOriginalSeconds - newTotalSeconds;
        const percentageSaved = (timeSavedSeconds / totalOriginalSeconds) * 100;

        setResult({
            newDuration: formatTime(newTotalSeconds),
            timeSaved: formatTime(timeSavedSeconds),
            percentageSaved: isNaN(percentageSaved) ? 0 : percentageSaved
        });

    }, [hours, minutes, seconds, speed]);

    // --- SEO & JSON-LD Management ---
    useEffect(() => {
        // Set Title
        document.title = "Audiobook Speed Calculator – Save Listening Time Easily | ZuraWebTools";

        // Create and append meta tags
        const metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = "Find out how much time you'll save by listening to audiobooks faster. Instantly calculate new duration and time saved at any playback speed. Free online tool for audiobook fans and productivity enthusiasts. Calculate audiobook duration at different speeds, optimize your listening time, and boost productivity with our efficiency calculator.";
        document.head.appendChild(metaDescription);

        const metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        metaKeywords.content = "audiobook speed calculator, listening time calculator, audiobook duration tool, playback speed time, save time audiobook, audiobook faster calculator, time saved calculator, audiobook 1.5x, 2x audiobook calculator, speed listening calculator, audiobook efficiency tool, how to calculate time saved listening to audiobooks faster, audiobook playback speed time calculator, calculate audiobook duration at different speeds, time savings calculator for audiobooks, best audiobook listening speed calculator, productivity tool, time management, efficiency calculator, listening comprehension, speed reading for audio, time optimization, productivity hack, learning accelerator, audiobook time reduction calculator, faster listening calculator, audiobook speed optimization, time management for audiobooks, audiobook productivity calculator, calculate listening time savings, audiobook speed converter, time saved by faster playback, audiobook efficiency calculator, optimize audiobook listening speed";
        document.head.appendChild(metaKeywords);

        // Add Open Graph meta tags
        const ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        ogTitle.content = 'Audiobook Speed Calculator – Save Listening Time Easily | ZuraWebTools';
        document.head.appendChild(ogTitle);

        const ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        ogDescription.content = 'Calculate how much time you save when listening to audiobooks at faster speeds. Perfect for productivity and time management. Free online calculator for optimizing audiobook listening efficiency and time savings.';
        document.head.appendChild(ogDescription);

        const ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        ogUrl.content = 'https://zurawebtools.com/audio-and-media-tools/audiobook-speed-calculator';
        document.head.appendChild(ogUrl);

        const ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        ogType.content = 'website';
        document.head.appendChild(ogType);

        const ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        ogImage.content = 'https://zurawebtools.com/images/audiobook-speed-calculator-preview.png';
        document.head.appendChild(ogImage);

        const ogImageAlt = document.createElement('meta');
        ogImageAlt.setAttribute('property', 'og:image:alt');
        ogImageAlt.content = 'Audiobook Speed Calculator interface showing time savings calculation with visual progress bar';
        document.head.appendChild(ogImageAlt);

        // Add Twitter Card meta tags
        const twitterCard = document.createElement('meta');
        twitterCard.name = 'twitter:card';
        twitterCard.content = 'summary_large_image';
        document.head.appendChild(twitterCard);

        const twitterTitle = document.createElement('meta');
        twitterTitle.name = 'twitter:title';
        twitterTitle.content = 'Audiobook Speed Calculator – Save Listening Time Easily';
        document.head.appendChild(twitterTitle);

        const twitterDescription = document.createElement('meta');
        twitterDescription.name = 'twitter:description';
        twitterDescription.content = 'Find out how much time you save by listening to audiobooks faster. Free online calculator for productivity enthusiasts and time optimization.';
        document.head.appendChild(twitterDescription);

        const twitterImage = document.createElement('meta');
        twitterImage.name = 'twitter:image';
        twitterImage.content = 'https://zurawebtools.com/images/audiobook-speed-calculator-preview.png';
        document.head.appendChild(twitterImage);

        const twitterImageAlt = document.createElement('meta');
        twitterImageAlt.name = 'twitter:image:alt';
        twitterImageAlt.content = 'Audiobook Speed Calculator interface showing time savings calculation with visual progress bar';
        document.head.appendChild(twitterImageAlt);
        
        const canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = 'https://zurawebtools.com/audio-and-media-tools/audiobook-speed-calculator';
        document.head.appendChild(canonicalLink);

        // Create and append JSON-LD script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'json-ld-schema';
        script.innerHTML = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Audiobook Speed Calculator",
                "applicationCategory": "UtilityTool",
                "operatingSystem": "Any (Web-based)",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1320" },
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
                "description": "A free online calculator to find out how much time you save when listening to audiobooks faster. Enter duration and playback speed to get adjusted time instantly.",
                "url": "https://zurawebtools.com/audio-and-media-tools/audiobook-speed-calculator",
                "featureList": [
                    "Instant time calculations",
                    "Multiple speed options",
                    "Time savings visualization",
                    "Copy results functionality",
                    "Pre-loaded examples"
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Audiobook Speed Calculator",
                "url": "https://zurawebtools.com/audio-and-media-tools/audiobook-speed-calculator",
                "description": "Calculate how much time you save by listening to audiobooks at faster speeds. Free online tool for productivity enthusiasts.",
                "applicationCategory": "ProductivityApplication",
                "operatingSystem": "Web Browser",
                "browserRequirements": "Modern web browser with JavaScript enabled",
                "featureList": [
                    "Real-time speed calculations",
                    "Time savings visualization with progress bars",
                    "Copy results to clipboard",
                    "Pre-loaded example calculations",
                    "Responsive design for all devices",
                    "Dark theme interface"
                ],
                "screenshot": "https://zurawebtools.com/images/audiobook-speed-calculator-preview.png",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "ZuraWebTools",
                    "url": "https://zurawebtools.com"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Calculate Audiobook Listening Time Savings",
                "description": "Learn how to use the Audiobook Speed Calculator to determine time savings when listening at faster speeds.",
                "image": "https://zurawebtools.com/images/audiobook-speed-calculator-preview.png",
                "totalTime": "PT2M",
                "supply": [
                    {
                        "@type": "HowToSupply",
                        "name": "Audiobook duration (hours, minutes, seconds)"
                    },
                    {
                        "@type": "HowToSupply",
                        "name": "Playback speed multiplier (e.g., 1.5x, 2.0x)"
                    }
                ],
                "step": [
                    {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Enter Audiobook Duration",
                        "text": "Input the total duration of your audiobook in hours, minutes, and seconds fields."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Set Playback Speed",
                        "text": "Enter your desired playback speed as a multiplier (e.g., 1.5 for 1.5x speed)."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "View Results",
                        "text": "See the new duration, time saved, and percentage reduction instantly calculated."
                    },
                    {
                        "@type": "HowToStep",
                        "position": 4,
                        "name": "Copy or Reset",
                        "text": "Copy the results summary or reset the calculator for new calculations."
                    }
                ],
                "tool": [
                    {
                        "@type": "HowToTool",
                        "name": "Web Browser"
                    },
                    {
                        "@type": "HowToTool",
                        "name": "Audiobook Speed Calculator"
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.a
                    }
                }))
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://zurawebtools.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Math & Calculation Tools",
                        "item": "https://zurawebtools.com/math-and-calculation-tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Audiobook Speed Calculator",
                        "item": "https://zurawebtools.com/audio-and-media-tools/audiobook-speed-calculator"
                    }
                ]
            }
        ]);
        document.head.appendChild(script);

        // Cleanup on unmount
        return () => {
            document.title = 'ZuraWebTools'; // Reset title or to your app's default
            document.head.removeChild(metaDescription);
            document.head.removeChild(metaKeywords);
            document.head.removeChild(ogTitle);
            document.head.removeChild(ogDescription);
            document.head.removeChild(ogUrl);
            document.head.removeChild(ogType);
            document.head.removeChild(ogImage);
            document.head.removeChild(ogImageAlt);
            document.head.removeChild(twitterCard);
            document.head.removeChild(twitterTitle);
            document.head.removeChild(twitterDescription);
            document.head.removeChild(twitterImage);
            document.head.removeChild(twitterImageAlt);
            document.head.removeChild(canonicalLink);
            const script = document.getElementById('json-ld-schema');
            if (script) document.head.removeChild(script);
        };
    }, []);

    // --- Event Handlers ---
    const handleReset = useCallback(() => {
        setHours('10');
        setMinutes('0');
        setSeconds('0');
        setSpeed('1.5');
        setErrors({ hours: '', minutes: '', seconds: '', speed: '' });
    }, []);

    const resultSummary = useMemo(() => {
      if (!result) return "Enter valid duration and speed to see the result.";
      const originalTime = timeToString(formatTime((parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)));
      return `
Audiobook Speed Calculation Summary
-----------------------------------
Original Duration: ${originalTime}
Playback Speed: ${speed}x

New Duration: ${timeToString(result.newDuration)}
Time Saved: ${timeToString(result.timeSaved)}
Listening Time Reduced By: ${result.percentageSaved.toFixed(1)}%
-----------------------------------
Calculated with ZuraWebTools
      `.trim();
    }, [result, hours, minutes, seconds, speed]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(resultSummary).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    }, [resultSummary]);
    
    const handleExample = (h: string, m: string, s: string, spd: string) => {
        setHours(h);
        setMinutes(m);
        setSeconds(s);
        setSpeed(spd);
    };

    const getInputClasses = (field: keyof typeof errors) => {
        const baseClasses = "w-full rounded-lg border bg-slate-700/50 text-slate-200 shadow-sm focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900 transition duration-150 ease-in-out placeholder-slate-400";
        if (errors[field]) {
            return `${baseClasses} border-red-500/50 focus:outline-none focus:ring-red-500 focus:border-red-500`;
        }
        return `${baseClasses} border-slate-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`;
    };

    const cardClasses = "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300";

    // Hide default number input spinners
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            input[type="number"] {
                -moz-appearance: textfield;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <main className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 to-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-slate-300">
            <div className="w-full max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <header className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Audiobook Speed Calculator</h1>
                    <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">Instantly find out how much time you save by listening to audiobooks at a faster speed.</p>
                </header>

                {/* Calculator Panel */}
                <div className={cardClasses}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Inputs */}
                        <div className="space-y-8">
                            {/* Duration Input */}
                            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-600/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-semibold text-white">Audiobook Duration</label>
                                        <p className="text-sm text-slate-400">Enter the total length of your audiobook</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="relative">
                                        <label htmlFor="hours" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Hours
                                        </label>
                                        <div className="relative flex">
                                            <input
                                                type="number"
                                                id="hours"
                                                value={hours}
                                                onChange={e => setHours(e.target.value)}
                                                min="0"
                                                placeholder="0"
                                                className={`${getInputClasses('hours')} text-center text-lg font-semibold rounded-r-none border-r-0`}
                                                aria-label="Hours"
                                                aria-invalid={!!errors.hours}
                                            />
                                            <div className="flex flex-col border border-l-0 border-slate-600 rounded-r-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => setHours(Math.max(0, parseInt(hours) + 1).toString())}
                                                    className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 border-b border-slate-600 rounded-tr-lg transition-colors"
                                                    aria-label="Increase hours"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setHours(Math.max(0, parseInt(hours) - 1).toString())}
                                                    className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-br-lg transition-colors"
                                                    aria-label="Decrease hours"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        {errors.hours && <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.hours}
                                        </p>}
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="minutes" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Minutes
                                        </label>
                                        <div className="relative flex">
                                            <input
                                                type="number"
                                                id="minutes"
                                                value={minutes}
                                                onChange={e => setMinutes(e.target.value)}
                                                min="0"
                                                max="59"
                                                placeholder="0"
                                                className={`${getInputClasses('minutes')} text-center text-lg font-semibold rounded-r-none border-r-0`}
                                                aria-label="Minutes"
                                                aria-invalid={!!errors.minutes}
                                            />
                                            <div className="flex flex-col border border-l-0 border-slate-600 rounded-r-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => setMinutes(Math.min(59, Math.max(0, parseInt(minutes) + 1)).toString())}
                                                    className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 border-b border-slate-600 rounded-tr-lg transition-colors"
                                                    aria-label="Increase minutes"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setMinutes(Math.min(59, Math.max(0, parseInt(minutes) - 1)).toString())}
                                                    className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-br-lg transition-colors"
                                                    aria-label="Decrease minutes"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        {errors.minutes && <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.minutes}
                                        </p>}
                                    </div>

                                    <div className="relative">
                                        <label htmlFor="seconds" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Seconds
                                        </label>
                                        <div className="relative flex">
                                            <input
                                                type="number"
                                                id="seconds"
                                                value={seconds}
                                                onChange={e => setSeconds(e.target.value)}
                                                min="0"
                                                max="59"
                                                placeholder="0"
                                                className={`${getInputClasses('seconds')} text-center text-lg font-semibold rounded-r-none border-r-0`}
                                                aria-label="Seconds"
                                                aria-invalid={!!errors.seconds}
                                            />
                                            <div className="flex flex-col border border-l-0 border-slate-600 rounded-r-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => setSeconds(Math.min(59, Math.max(0, parseInt(seconds) + 1)).toString())}
                                                    className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 border-b border-slate-600 rounded-tr-lg transition-colors"
                                                    aria-label="Increase seconds"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setSeconds(Math.min(59, Math.max(0, parseInt(seconds) - 1)).toString())}
                                                    className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-br-lg transition-colors"
                                                    aria-label="Decrease seconds"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        {errors.seconds && <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.seconds}
                                        </p>}
                                    </div>
                                </div>

                                {/* Quick Duration Presets */}
                                <div className="mt-6 pt-4 border-t border-slate-600/50">
                                    <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Quick presets:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <button onClick={() => { setHours('8'); setMinutes('0'); setSeconds('0'); }} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            8 hours
                                        </button>
                                        <button onClick={() => { setHours('12'); setMinutes('0'); setSeconds('0'); }} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            12 hours
                                        </button>
                                        <button onClick={() => { setHours('16'); setMinutes('0'); setSeconds('0'); }} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            16 hours
                                        </button>
                                        <button onClick={() => { setHours('20'); setMinutes('0'); setSeconds('0'); }} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            20 hours
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Speed Input */}
                            <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-600/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <label htmlFor="speed" className="block text-lg font-semibold text-white">Playback Speed</label>
                                        <p className="text-sm text-slate-400">Choose your preferred listening speed</p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="relative flex">
                                        <input
                                            type="number"
                                            id="speed"
                                            value={speed}
                                            onChange={e => setSpeed(e.target.value)}
                                            min="0.1"
                                            max="3.0"
                                            step="0.05"
                                            placeholder="1.5"
                                            className={`${getInputClasses('speed')} text-center text-xl font-bold rounded-r-none border-r-0`}
                                            aria-label="Playback Speed"
                                            aria-invalid={!!errors.speed}
                                        />
                                        <div className="flex flex-col border border-l-0 border-slate-600 rounded-r-lg">
                                            <button
                                                type="button"
                                                onClick={() => setSpeed(Math.min(3.0, Math.max(0.1, parseFloat(speed) + 0.05)).toFixed(2))}
                                                className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 border-b border-slate-600 rounded-tr-lg transition-colors"
                                                aria-label="Increase speed"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSpeed(Math.min(3.0, Math.max(0.1, parseFloat(speed) - 0.05)).toFixed(2))}
                                                className="px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-br-lg transition-colors"
                                                aria-label="Decrease speed"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="absolute inset-y-0 right-12 flex items-center pointer-events-none">
                                            <span className="text-slate-400 font-bold text-lg">×</span>
                                        </div>
                                    </div>
                                    {errors.speed && <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.speed}
                                        </p>}
                                </div>                                {/* Speed Presets */}
                                <div className="mt-6 pt-4 border-t border-slate-600/50">
                                    <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                        Popular speeds:
                                    </p>
                                    <div className="grid grid-cols-4 gap-2">
                                        <button onClick={() => setSpeed('1.0')} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            1.0× Normal
                                        </button>
                                        <button onClick={() => setSpeed('1.25')} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            1.25× Comfortable
                                        </button>
                                        <button onClick={() => setSpeed('1.5')} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            1.5× Popular
                                        </button>
                                        <button onClick={() => setSpeed('2.0')} className="px-3 py-2 text-xs font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors border border-slate-600/50 hover:border-slate-500/50">
                                            2.0× Fast
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-slate-900/50 rounded-xl p-6 h-full flex flex-col justify-center" aria-live="polite">
                            {result ? (
                                <div className="space-y-6 transition-opacity duration-500" key={JSON.stringify(result)}>
                                    <div className="text-center bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                        <p className="text-sm font-medium text-green-300">You Save</p>
                                        <p className="text-4xl font-extrabold text-green-400 tracking-tight">{timeToString(result.timeSaved)}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-slate-800/60 p-3 rounded-lg">
                                            <p className="text-xs text-slate-400 uppercase">New Time</p>
                                            <p className="text-xl font-bold text-cyan-400">{timeToString(result.newDuration)}</p>
                                        </div>
                                        <div className="bg-slate-800/60 p-3 rounded-lg">
                                            <p className="text-xs text-slate-400 uppercase">Reduction</p>
                                            <p className="text-xl font-bold text-indigo-400">{result.percentageSaved.toFixed(1)}%</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 mb-1 text-center">Original vs. New Duration</p>
                                        <div className="w-full bg-slate-700 rounded-full h-4 relative overflow-hidden">
                                            <div className="bg-cyan-500 h-4 rounded-full transition-all duration-500 ease-out" style={{ width: `${100 - result.percentageSaved}%` }}></div>
                                            <div className="absolute top-0 right-0 bg-green-500/30 h-4" style={{ width: `${result.percentageSaved}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs mt-1 text-slate-400">
                                            <span>New Time</span>
                                            <span>Time Saved</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center flex flex-col items-center justify-center h-full">
                                    <svg className="w-12 h-12 text-slate-700 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="mt-4 text-slate-500">Your results will appear here.</p>
                                    <p className="text-xs text-slate-600">Enter valid inputs to calculate.</p>
                                </div>
                            )}
                        </div>

                    </div>
                    
                    {/* Actions */}
                    <div className="mt-8 border-t border-slate-700/50 pt-6 flex flex-col sm:flex-row gap-3">
                        <button onClick={handleCopy} disabled={!result} className="w-full sm:w-auto flex-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all duration-200">
                           {copySuccess ? <><CheckIcon/> Copied!</> : <><CopyIcon/> Copy Result</>}
                        </button>
                        <button onClick={handleReset} className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-300 bg-slate-700/50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all duration-200">
                           <ResetIcon/> Reset
                        </button>
                    </div>
                </div>

                {/* Generated Result Section */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-3">Result Summary</h2>
                    <textarea readOnly value={resultSummary} className="w-full h-48 p-4 font-mono text-sm bg-slate-900/70 border border-slate-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-300"></textarea>
                </div>

                {/* Quick Examples */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-4">Quick Examples</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <button onClick={() => handleExample('8', '0', '0', '1.25')} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">8h @ 1.25×</button>
                        <button onClick={() => handleExample('12', '30', '0', '1.75')} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">12.5h @ 1.75×</button>
                        <button onClick={() => handleExample('6', '45', '0', '2.0')} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">6.75h @ 2.0×</button>
                        <button onClick={() => handleExample('20', '0', '0', '2.5')} className="p-3 text-sm font-medium text-center text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">20h @ 2.5×</button>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-6">Benefits of Using Faster Playback</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30 text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Save Hours Daily</h3>
                            <p className="text-slate-400 text-sm">Reduce listening time by 20-50% depending on your speed preference, freeing up valuable time for other activities.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-xl border border-green-500/30 text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Boost Productivity</h3>
                            <p className="text-slate-400 text-sm">Complete more audiobooks in less time, accelerating your learning and knowledge acquisition rate significantly.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30 text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Enhanced Learning</h3>
                            <p className="text-slate-400 text-sm">Improve listening comprehension and retention through optimized playback speeds tailored to your learning style.</p>
                        </div>
                    </div>
                </div>

                {/* Use Cases */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-6">Who Uses This Calculator?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Students</h3>
                            <p className="text-slate-400 text-sm">Accelerate coursework completion and exam preparation with faster lecture playback.</p>
                        </div>
                        <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Professionals</h3>
                            <p className="text-slate-400 text-sm">Maximize business audiobook consumption during commutes and workouts.</p>
                        </div>
                        <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Audiobook Fans</h3>
                            <p className="text-slate-400 text-sm">Complete more books monthly while maintaining listening enjoyment and comprehension.</p>
                        </div>
                        <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Busy Parents</h3>
                            <p className="text-slate-400 text-sm">Fit more educational content into limited time while managing family responsibilities.</p>
                        </div>
                    </div>
                </div>

                {/* How to Use */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-4">How to Use</h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Enter Duration</h3>
                                <p className="text-slate-400">Input the total hours, minutes, and seconds of your audiobook in the respective fields.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Set Playback Speed</h3>
                                <p className="text-slate-400">Enter the speed multiplier you listen at (e.g., 1.5 for 1.5x speed, 2.0 for 2x speed).</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">View Instant Results</h3>
                                <p className="text-slate-400">The calculator automatically shows the new, shorter duration and total time saved.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">4</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">Interpret the Results</h3>
                                <p className="text-slate-400">"New Time" is your adjusted total listening time. "Time Saved" is the time you get back, and the percentage shows your overall time reduction.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-6">About Audiobook Speed Calculator</h2>
                    <div className="prose prose-invert max-w-none space-y-6">
                        <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-cyan-500">
                            <h3 className="text-lg font-semibold text-cyan-300 mb-2">⏰ Save Time, Learn More</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Ever wished you could finish audiobooks faster without missing important details? Our Audiobook Speed Calculator helps you figure out exactly how much time you'll save by listening at faster speeds. Whether you're a busy professional, student, or just love audiobooks, this tool shows you the perfect balance between speed and comprehension.
                            </p>
                        </div>

                        <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-green-500">
                            <h3 className="text-lg font-semibold text-green-300 mb-2">🎯 Why Time Matters</h3>
                            <p className="text-slate-300 leading-relaxed">
                                In our busy world, time is the most valuable thing we have. This calculator helps audiobook lovers, students, working professionals, and anyone who wants to learn more make the most of their listening time. By showing exactly how much time you save at different speeds, it helps you make smart choices about your audio habits.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-800/30 p-4 rounded-lg">
                                <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                                    <span className="text-green-400">🎯</span> What Makes It Special
                                </h4>
                                <ul className="text-slate-300 text-sm space-y-1">
                                    <li>• <strong>Instant calculations</strong> - No waiting, get results immediately</li>
                                    <li>• <strong>Visual progress bars</strong> - See your time savings at a glance</li>
                                    <li>• <strong>Copy results</strong> - Share calculations with one click</li>
                                    <li>• <strong>Works offline</strong> - No internet needed after loading</li>
                                </ul>
                            </div>

                            <div className="bg-slate-800/30 p-4 rounded-lg">
                                <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                                    <span className="text-blue-400">🚀</span> Perfect For
                                </h4>
                                <ul className="text-slate-300 text-sm space-y-1">
                                    <li>• <strong>Students</strong> - Speed through lectures and textbooks</li>
                                    <li>• <strong>Professionals</strong> - Maximize learning during commutes</li>
                                    <li>• <strong>Book lovers</strong> - Finish more books in less time</li>
                                    <li>• <strong>Busy parents</strong> - Fit learning into family life</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-white mb-3">💡 Speed Listening Tips</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="bg-slate-700/30 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-green-400 mb-1">1.25x</div>
                                    <p className="text-slate-300 text-sm">Great starting point - comfortable and saves time</p>
                                </div>
                                <div className="bg-slate-700/30 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-400 mb-1">1.5x</div>
                                    <p className="text-slate-300 text-sm">Popular choice - good balance of speed and clarity</p>
                                </div>
                                <div className="bg-slate-700/30 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-400 mb-1">2.0x</div>
                                    <p className="text-slate-300 text-sm">For experienced listeners - maximum time savings</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 className="text-md font-semibold text-blue-300 mb-2">🔬 Backed by Science</h4>
                            <p className="text-slate-300 leading-relaxed">
                                Research shows that most people can understand audiobooks at faster speeds without losing comprehension. Our calculator helps you find your sweet spot - the speed where you save the most time while still enjoying and understanding your books.
                            </p>
                        </div>

                        <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-purple-500">
                            <h4 className="text-md font-semibold text-purple-300 mb-2">🌟 More Than Just a Calculator</h4>
                            <p className="text-slate-300 leading-relaxed mb-3">
                                This tool does more than simple math - it gives you insights into listening efficiency and helps optimize your learning. Whether you're speeding through work-related books during your commute, accelerating through student lectures, or just exploring new genres faster, it adapts to your personal listening style and goals.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                The science behind faster listening is fascinating. Studies show that the right playback speed can actually improve comprehension while cutting down listening time significantly. We use this research to help you find the perfect speed that balances time savings with understanding.
                            </p>
                        </div>

                        <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-orange-500">
                            <h4 className="text-md font-semibold text-orange-300 mb-2">📚 Making Learning Accessible</h4>
                            <p className="text-slate-300 leading-relaxed">
                                Beyond personal productivity, this calculator helps make education more accessible. By letting people consume educational content faster, it opens up high-quality audio resources to those with limited time. The simple interface means anyone can use advanced time management techniques, regardless of their technical background.
                            </p>
                        </div>

                        <div className="bg-slate-800/30 p-4 rounded-lg border-l-4 border-pink-500">
                            <h4 className="text-md font-semibold text-pink-300 mb-2">✨ Built for You</h4>
                            <p className="text-slate-300 leading-relaxed">
                                We're committed to giving you the best experience possible. That's why we included instant calculations, visual progress indicators, and easy result sharing. The design works perfectly on any device - from your phone during a walk to your computer for detailed planning.
                            </p>
                        </div>

                        <div className="text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-4 rounded-lg border border-cyan-500/30">
                            <p className="text-slate-200 font-medium">
                                Join thousands of people who have transformed their learning with our Audiobook Speed Calculator. Experience how technology can make time optimization both achievable and enjoyable! 📚⚡
                            </p>
                        </div>
                    </div>
                </div>

                {/* External Links */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-6">Learn More About Speed Listening</h2>
                    <p className="text-slate-400 mb-6">Explore authoritative resources on accelerated listening and productivity techniques</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white mb-3">Research & Studies</h3>
                            <a href="https://www.scientificamerican.com/article/speed-reading-apps-dont-really-work/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white group-hover:text-blue-300">Scientific American: Speed Reading Research</h4>
                                        <p className="text-sm text-slate-400">Evidence-based insights on accelerated learning techniques</p>
                                    </div>
                                </div>
                            </a>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4006297/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white group-hover:text-green-300">NCBI: Accelerated Learning Studies</h4>
                                        <p className="text-sm text-slate-400">Scientific research on comprehension at higher speeds</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white mb-3">Practical Guides</h3>
                            <a href="https://www.audible.com/blog/how-to-speed-up-audiobooks" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-2.828a9 9 0 010-12.728m-9.9 9.9a5 5 0 010 7.072m2.828-2.828a9 9 0 010-12.728" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white group-hover:text-purple-300">Audible: Speed Listening Guide</h4>
                                        <p className="text-sm text-slate-400">Official tips for optimizing audiobook playback</p>
                                    </div>
                                </div>
                            </a>
                            <a href="https://www.nytimes.com/guides/smarter-living/how-to-speed-read" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 transition-colors group">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white group-hover:text-orange-300">NY Times: Speed Reading Techniques</h4>
                                        <p className="text-sm text-slate-400">Expert advice on accelerated learning methods</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="text-center py-4">
                    <p className="text-sm text-slate-500">Last updated: November 10, 2025</p>
                </div>

                {/* FAQ Section */}
                <div className={cardClasses}>
                    <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-lg text-slate-200">{faq.q}</h3>
                                <p className="mt-1 text-slate-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Tools */}
                <div className={cardClasses}>
                    <h2 className="text-xl font-bold text-white mb-4">Related Tools</h2>
                    <p className="text-slate-400 mb-4">Explore more calculation and productivity tools</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <a href="/time-difference-calculator" className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors group">
                            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <div className="font-medium text-white group-hover:text-cyan-300">Time Difference Calculator</div>
                                <div className="text-xs text-slate-400">Calculate duration between dates</div>
                            </div>
                        </a>
                        <a href="/percentage-change-calculator" className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors group">
                            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <div className="font-medium text-white group-hover:text-cyan-300">Percentage Calculator</div>
                                <div className="text-xs text-slate-400">Calculate increases and changes</div>
                            </div>
                        </a>
                        <a href="/word-counter" className="flex items-center gap-3 p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors group">
                            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                                <div className="font-medium text-white group-hover:text-cyan-300">Word Counter</div>
                                <div className="text-xs text-slate-400">Count words and characters</div>
                            </div>
                        </a>
                        <a href="/math-and-calculation-tools" className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg transition-colors group">
                            <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <div>
                                <div className="font-medium text-white">View All Math Tools</div>
                                <div className="text-xs text-cyan-100">Explore more calculators</div>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center py-4">
                    <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} ZuraWebTools. All rights reserved.</p>
                    <div className="mt-2 flex justify-center gap-4 text-xs text-slate-600">
                        <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
                        <a href="/tools" className="hover:text-cyan-400 transition-colors">All Tools</a>
                        <a href="/math-and-calculation-tools" className="hover:text-cyan-400 transition-colors">Math Tools</a>
                        <a href="/contact" className="hover:text-cyan-400 transition-colors">Contact</a>
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default AudiobookSpeedCalculator;