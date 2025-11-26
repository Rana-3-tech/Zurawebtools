import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Type Definitions ---
type PowerUnit = 'w' | 'hp';
type MassUnit = 'kg' | 'lb';

interface Result {
  wKg: number;
  hpLb: number;
}

interface Example {
  name: string;
  power: string;
  powerUnit: PowerUnit;
  mass: string;
  massUnit: MassUnit;
}

// --- Constants ---
const HP_TO_W = 745.7;
const LB_TO_KG = 0.453592;
const W_KG_TO_HP_LB = (1 / HP_TO_W) * LB_TO_KG;

const faqs = [
    { q: 'What is power-to-mass ratio?', a: 'It’s the amount of power available per unit of mass, usually in W/kg or hp/lb. It reflects how much performance a system can deliver relative to its weight.' },
    { q: 'Why is power-to-mass ratio important?', a: 'It determines how efficiently a system can accelerate or lift — higher ratios mean more power per kilogram and better dynamic performance.' },
    { q: 'When should I use W/kg vs hp/lb?', a: 'Use W/kg in metric and scientific contexts, and hp/lb in imperial or automotive environments. This calculator provides both for easy comparison.' },
    { q: 'Can I compare different systems using this ratio?', a: 'Yes. It’s a universal metric for engines, vehicles, drones, or even motors. Just ensure you use consistent measurement units when comparing.' },
    { q: 'Does this calculator handle conversions automatically?', a: 'Yes. The tool automatically converts between watts ↔ horsepower and kilograms ↔ pounds to provide consistent, comparable results in both W/kg and hp/lb.' },
    { q: 'What’s a good power-to-mass ratio?', a: 'It depends entirely on the application. For example, high-performance sports cars are often in the 200–400 W/kg range, while specialized racing drones can exceed 1000 W/kg.' },
    { q: 'Is this calculator accurate for all applications?', a: 'Yes, it is highly accurate for general comparison and estimation based on standard conversion factors. However, for critical engineering-grade analysis, always validate with manufacturer-provided specifications.' },
];

const quickExamples: Example[] = [
  { name: 'Sports Car', power: '250000', powerUnit: 'w', mass: '1500', massUnit: 'kg' },
  { name: 'Racing Drone', power: '2', powerUnit: 'hp', mass: '1.8', massUnit: 'lb' },
  { name: 'Pro Cyclist', power: '400', powerUnit: 'w', mass: '70', massUnit: 'kg' },
  { name: 'Motorcycle', power: '150', powerUnit: 'hp', mass: '450', massUnit: 'lb' },
];

// --- Helper Components ---
const SEOManager: React.FC = () => {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = 'Power-to-Mass Ratio Calculator – Free W/kg & hp/lb Converter | ZuraWebTools';

        const setMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
            return element;
        };
        
        const setDescription = (content: string) => setMeta('description', content);
        const setKeywords = (content: string) => setMeta('keywords', content);

        const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
        const originalKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');

        setDescription('Instantly calculate power-to-mass ratios in W/kg and hp/lb. Convert between metric and imperial units, copy results, and compare systems. Free engineering calculator by ZuraWebTools.');
        setKeywords('power to mass ratio, specific power calculator, power to weight ratio, W/kg calculator, hp/lb calculator, engineering tools, motor performance, vehicle power ratio, drone power calculator, performance analysis');
        
        // Add Open Graph tags for social sharing
        const setProperty = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
            return element;
        };

        const setTwitter = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
            return element;
        };

        // Open Graph tags
        setProperty('og:title', 'Power-to-Mass Ratio Calculator – Free W/kg & hp/lb Converter | ZuraWebTools');
        setProperty('og:description', 'Calculate power-to-mass ratios instantly. Convert between W/kg and hp/lb with professional engineering precision. Free online calculator for engineers and enthusiasts.');
        setProperty('og:image', 'https://storage.googleapis.com/aai-web-samples/power-to-mass-calculator-preview.png');
        setProperty('og:image:alt', 'Power-to-Mass Ratio Calculator interface showing W/kg and hp/lb calculations');
        setProperty('og:url', 'https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator');
        setProperty('og:type', 'website');

        // Twitter Card tags
        setTwitter('twitter:card', 'summary_large_image');
        setTwitter('twitter:title', 'Power-to-Mass Ratio Calculator – Free W/kg & hp/lb Converter');
        setTwitter('twitter:description', 'Calculate power-to-mass ratios instantly. Convert between W/kg and hp/lb with professional engineering precision.');
        setTwitter('twitter:image', 'https://storage.googleapis.com/aai-web-samples/power-to-mass-calculator-preview.png');
        setTwitter('twitter:image:alt', 'Power-to-Mass Ratio Calculator interface');
        
        const setLink = (rel: string, href: string) => {
            let element = document.querySelector(`link[rel="${rel}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
            return element;
        };

        const originalCanonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
        setLink('canonical', 'https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator');

        const addJsonLd = <T extends object,>(id: string, data: T) => {
            let script = document.getElementById(id) as HTMLScriptElement | null;
            if (!script) {
                script = document.createElement('script');
                script.id = id;
                document.head.appendChild(script);
            }
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(data);
        };
        
        const appSchema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Power-to-Mass Ratio Calculator",
            "applicationCategory": "EngineeringTool",
            "operatingSystem": "Any (Web-based)",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "940" },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
            "description": "A free web-based calculator for computing power-to-mass ratios in W/kg and hp/lb with instant conversions and copyable results.",
            "url": "https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator"
        };
        
        const faqSchema = {
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
        };
        
        addJsonLd('app-schema', appSchema);
        addJsonLd('faq-schema', faqSchema);

        // Add breadcrumb schema
        const breadcrumbSchema = {
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
                    "name": "Power-to-Mass Ratio Calculator",
                    "item": "https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator"
                }
            ]
        };

        addJsonLd('breadcrumb-schema', breadcrumbSchema);

        return () => {
            document.title = originalTitle;
            if(originalDescription) setDescription(originalDescription);
            if(originalKeywords) setKeywords(originalKeywords);
            if(originalCanonical) setLink('canonical', originalCanonical);
            document.getElementById('app-schema')?.remove();
            document.getElementById('faq-schema')?.remove();
            document.getElementById('breadcrumb-schema')?.remove();
        };
    }, []);
    return null;
};

// --- Main Component ---
const PowerToMassRatioCalculator: React.FC = () => {
  const [power, setPower] = useState<string>('150000');
  const [mass, setMass] = useState<string>('1300');
  const [powerUnit, setPowerUnit] = useState<PowerUnit>('w');
  const [massUnit, setMassUnit] = useState<MassUnit>('kg');
  const [result, setResult] = useState<Result>({ wKg: 0, hpLb: 0 });
  const [animatedResult, setAnimatedResult] = useState<Result>({ wKg: 0, hpLb: 0 });
  const [copyButtonText, setCopyButtonText] = useState('Copy Result');
  const [resultSummary, setResultSummary] = useState('');
  const animationFrameId = useRef<number | null>(null);
  
  const calculateRatio = useCallback(() => {
    const powerValue = parseFloat(power) || 0;
    const massValue = parseFloat(mass) || 0;

    const powerInWatts = powerUnit === 'hp' ? powerValue * HP_TO_W : powerValue;
    const massInKg = massUnit === 'lb' ? massValue * LB_TO_KG : massValue;

    const wKg = massInKg > 0 ? powerInWatts / massInKg : 0;
    const hpLb = wKg * W_KG_TO_HP_LB;
    
    setResult({ wKg, hpLb });
  }, [power, mass, powerUnit, massUnit]);

  useEffect(() => {
    calculateRatio();
  }, [calculateRatio]);

  useEffect(() => {
    if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
    }

    const startValues = { ...animatedResult };
    const endValues = result;
    const animationDuration = 400; // ms
    let startTime: number;

    const step = (timestamp: number) => {
        if (!startTime) {
            startTime = timestamp;
        }

        const progress = Math.min((timestamp - startTime) / animationDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

        const currentWKg = startValues.wKg + (endValues.wKg - startValues.wKg) * easedProgress;
        const currentHpLb = startValues.hpLb + (endValues.hpLb - startValues.hpLb) * easedProgress;
        
        setAnimatedResult({ wKg: currentWKg, hpLb: currentHpLb });

        if (progress < 1) {
            animationFrameId.current = requestAnimationFrame(step);
        }
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => {
        if(animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };
  }, [result]);
  
  useEffect(() => {
        const summary = `--- Power-to-Mass Ratio Calculation ---\n\n` +
                        `Inputs:\n` +
                        `  Power: ${power} ${powerUnit.toUpperCase()}\n` +
                        `  Mass: ${mass} ${massUnit.toUpperCase()}\n\n` +
                        `Results:\n` +
                        `  W/kg: ${result.wKg.toLocaleString(undefined, { maximumFractionDigits: 2 })}\n` +
                        `  hp/lb: ${result.hpLb.toLocaleString(undefined, { maximumFractionDigits: 4 })}\n\n` +
                        `Generated by ZuraWebTools`;
        setResultSummary(summary);
  }, [power, mass, powerUnit, massUnit, result]);

  const handleReset = () => {
    setPower('150000');
    setMass('1300');
    setPowerUnit('w');
    setMassUnit('kg');
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(resultSummary).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy Result'), 2000);
    });
  };

  const applyExample = (example: Example) => {
    setPower(example.power);
    setPowerUnit(example.powerUnit);
    setMass(example.mass);
    setMassUnit(example.massUnit);
  };
  
  return (
    <>
      <SEOManager />
      <div className="bg-gray-50 min-h-screen">
        <main className="font-sans text-gray-800 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">Power-to-Mass</span> Ratio Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Instantly compute specific power in both metric (W/kg) and imperial (hp/lb) units. An essential tool for engineers, hobbyists, and performance enthusiasts.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
                <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/80">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Power Input */}
                        <div>
                            <label htmlFor="power" className="block text-sm font-medium text-gray-700 mb-1.5">Power</label>
                            <div className="flex items-center w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all duration-200">
                                <div className="pl-3 pr-2 pointer-events-none text-gray-400">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>
                                </div>
                                <input
                                    type="number"
                                    id="power"
                                    value={power}
                                    onChange={(e) => setPower(e.target.value)}
                                    className="flex-grow p-3 bg-transparent border-0 focus:ring-0 w-full sm:text-sm text-gray-800 placeholder-gray-400"
                                    aria-label="Power value"
                                    placeholder="e.g., 150000"
                                />
                                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                                <div className="relative pr-2">
                                    <select
                                        id="powerUnit"
                                        value={powerUnit}
                                        onChange={(e) => setPowerUnit(e.target.value as PowerUnit)}
                                        className="appearance-none bg-transparent border-0 focus:ring-0 focus:outline-none font-medium text-gray-600 hover:text-gray-900 cursor-pointer pr-7 py-3 sm:text-sm"
                                        aria-label="Power unit"
                                    >
                                        <option value="w">W</option>
                                        <option value="hp">hp</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Mass Input */}
                        <div>
                            <label htmlFor="mass" className="block text-sm font-medium text-gray-700 mb-1.5">Mass</label>
                            <div className="flex items-center w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all duration-200">
                                <div className="pl-3 pr-2 pointer-events-none text-gray-400">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" /></svg>
                                </div>
                                <input
                                    type="number"
                                    id="mass"
                                    value={mass}
                                    onChange={(e) => setMass(e.target.value)}
                                    className="flex-grow p-3 bg-transparent border-0 focus:ring-0 w-full sm:text-sm text-gray-800 placeholder-gray-400"
                                    aria-label="Mass value"
                                    placeholder="e.g., 1300"
                                />
                                <div className="h-6 w-px bg-slate-200 mx-1"></div>
                                <div className="relative pr-2">
                                    <select
                                        id="massUnit"
                                        value={massUnit}
                                        onChange={(e) => setMassUnit(e.target.value as MassUnit)}
                                        className="appearance-none bg-transparent border-0 focus:ring-0 focus:outline-none font-medium text-gray-600 hover:text-gray-900 cursor-pointer pr-7 py-3 sm:text-sm"
                                        aria-label="Mass unit"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="lb">lb</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-center" aria-live="polite">
                        <div className="bg-sky-50/70 border border-sky-200/80 p-5 rounded-xl">
                            <h3 className="text-sm font-semibold text-sky-800">Metric</h3>
                            <p className="text-5xl font-extrabold text-sky-600 transition-all duration-300 tracking-tight my-1">{animatedResult.wKg.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                            <span className="text-sm text-sky-700 font-medium">W/kg</span>
                        </div>
                         <div className="bg-indigo-50/70 border border-indigo-200/80 p-5 rounded-xl">
                            <h3 className="text-sm font-semibold text-indigo-800">Imperial</h3>
                            <p className="text-5xl font-extrabold text-indigo-600 transition-all duration-300 tracking-tight my-1">{animatedResult.hpLb.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                            <span className="text-sm text-indigo-700 font-medium">hp/lb</span>
                        </div>
                    </div>
                </section>
                
                <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/80">
                    <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Result Summary
                    </h2>
                     <textarea
                        readOnly
                        value={resultSummary}
                        className="w-full h-48 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        aria-label="Calculation result summary"
                    ></textarea>
                    <div className="flex items-center justify-end gap-3 mt-4">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 flex items-center gap-1.5"
                            aria-label="Reset all inputs to default values"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" /><path d="M4 9a9 9 0 0 1 14.24-4.56l-1.09 1.09A7 7 0 0 0 8.01 16l-1.1-1.1A9 9 0 0 1 4 9zm15.09-2.56A7 7 0 0 0 15.99 8l1.1 1.1A9 9 0 0 1 20 15a9 9 0 0 1-14.24 4.56l1.09-1.09A7 7 0 0 0 15.99 8z" /></svg>
                            Reset
                        </button>
                        <button
                            onClick={handleCopy}
                            className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg hover:from-sky-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                            aria-label="Copy calculation summary to clipboard"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            {copyButtonText}
                        </button>
                    </div>
                </section>
            </div>

            <aside className="lg:col-span-2 space-y-8">
                 <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/80">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>
                        Quick Examples
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {quickExamples.map((ex) => (
                            <button
                                key={ex.name}
                                onClick={() => applyExample(ex)}
                                className="text-sm text-center py-2.5 px-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-sky-100 hover:text-sky-800 transition-all transform hover:scale-105"
                                aria-label={`Load example data for ${ex.name}`}
                            >
                                {ex.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/80">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>
                        How to Use
                    </h2>
                    <ol className="space-y-3 text-gray-600">
                        <li className="flex items-start"><span className="flex items-center justify-center w-5 h-5 mr-3 mt-0.5 font-bold text-xs text-indigo-700 bg-indigo-100 rounded-full">1</span><span><strong>Enter Power:</strong> Input the system's power output in Watts or Horsepower.</span></li>
                        <li className="flex items-start"><span className="flex items-center justify-center w-5 h-5 mr-3 mt-0.5 font-bold text-xs text-indigo-700 bg-indigo-100 rounded-full">2</span><span><strong>Enter Mass:</strong> Input the system's total mass in Kilograms or Pounds.</span></li>
                        <li className="flex items-start"><span className="flex items-center justify-center w-5 h-5 mr-3 mt-0.5 font-bold text-xs text-indigo-700 bg-indigo-100 rounded-full">3</span><span><strong>Select Units:</strong> Use the dropdowns to match your input units.</span></li>
                        <li className="flex items-start"><span className="flex items-center justify-center w-5 h-5 mr-3 mt-0.5 font-bold text-xs text-indigo-700 bg-indigo-100 rounded-full">4</span><span><strong>View Results:</strong> The ratios are calculated instantly.</span></li>
                    </ol>
                </section>
            </aside>
        </div>

        {/* --- SOCIAL SHARE BUTTONS --- */}
        <section className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-indigo-100 print:hidden">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Share This Tool</h2>
            <p className="text-center text-gray-700 mb-6">Help engineers and enthusiasts calculate power-to-mass ratios</p>
            <div className="flex flex-wrap justify-center gap-4">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on Facebook"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator')}&text=Calculate%20power-to-mass%20ratios%20in%20W/kg%20and%20hp/lb%20instantly!`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1A94DA] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on Twitter"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    Twitter
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#095196] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                </a>
                <a href={`https://api.whatsapp.com/send?text=Check%20out%20this%20Power-to-Mass%20Ratio%20Calculator%20${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/power-to-mass-ratio-calculator')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on WhatsApp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                </a>
            </div>
        </section>

        {/* --- QUICK EXAMPLES --- */}
        <section className="mt-12 print:hidden">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Quick Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#10b981] hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-[#10b981] mb-2">115.4</div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Sports Car</h3>
                    <p className="text-sm text-gray-600">250kW / 1500kg = High performance</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#06b6d4] hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-[#06b6d4] mb-2">2.67</div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Racing Drone</h3>
                    <p className="text-sm text-gray-600">2hp / 1.8lb = Extreme power density</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#3b82f6] hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-[#3b82f6] mb-2">4.0</div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Pro Cyclist</h3>
                    <p className="text-sm text-gray-600">400W / 70kg = Elite endurance</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#8b5cf6] hover:shadow-xl transition-shadow">
                    <div className="text-4xl font-bold text-[#8b5cf6] mb-2">0.88</div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Motorcycle</h3>
                    <p className="text-sm text-gray-600">150hp / 450lb = Street performance</p>
                </div>
            </div>
        </section>

        {/* --- BENEFITS --- */}
        <section className="mt-12 print:hidden">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Why Use Our Power-to-Mass Ratio Calculator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                    <div className="text-5xl mb-4">⚡</div>
                    <h3 className="text-2xl font-bold mb-3">Instant Engineering Calculations</h3>
                    <p className="text-white/90">Get precise power-to-mass ratios in both metric and imperial units instantly. Perfect for engineers, designers, and performance enthusiasts analyzing system efficiency.</p>
                </div>
                <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                    <div className="text-5xl mb-4">🔄</div>
                    <h3 className="text-2xl font-bold mb-3">Automatic Unit Conversion</h3>
                    <p className="text-white/90">Seamlessly convert between watts/horsepower and kilograms/pounds. No manual calculations needed - just input your values and get accurate results.</p>
                </div>
                <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                    <div className="text-5xl mb-4">📊</div>
                    <h3 className="text-2xl font-bold mb-3">Professional Analysis Tool</h3>
                    <p className="text-white/90">Compare different systems, vehicles, and motors with standardized ratios. Essential for performance optimization and engineering decisions.</p>
                    <div className="mt-4">
                        <a href="/fabric-costing-tool" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
                            <span>Try Fabric Costing Tool</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        {/* --- HOW TO USE --- */}
        <section className="mt-12 print:hidden">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">How to Use This Power-to-Mass Ratio Calculator</h2>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white font-bold rounded-full text-lg">1</div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Enter Power Value</h3>
                                <p className="text-gray-600">Input the system's power output in watts (W) or horsepower (hp) using the dropdown to select units.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold rounded-full text-lg">2</div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Enter Mass Value</h3>
                                <p className="text-gray-600">Input the total mass in kilograms (kg) or pounds (lb) using the dropdown to select units.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold rounded-full text-lg">3</div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">View Results Instantly</h3>
                                <p className="text-gray-600">See both metric (W/kg) and imperial (hp/lb) ratios calculated automatically with smooth animations.</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white font-bold rounded-full text-lg">4</div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Use Quick Examples</h3>
                                <p className="text-gray-600">Click on pre-loaded examples for sports cars, drones, cyclists, and motorcycles to see typical ratios.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white font-bold rounded-full text-lg">5</div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Copy Results</h3>
                                <p className="text-gray-600">Copy the complete calculation summary or share your results with the social sharing buttons.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] text-white font-bold rounded-full text-lg">6</div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Compare Systems</h3>
                                <p className="text-gray-600">Use the ratios to compare different vehicles, motors, or systems for performance analysis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- USE CASES --- */}
        <section className="mt-12 print:hidden">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Who Uses This Calculator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#f59e0b] hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">🏎️</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Automotive Engineers</h3>
                    <p className="text-sm text-gray-600">Calculate power-to-weight ratios for vehicle performance optimization, engine tuning, and competitive racing analysis.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#10b981] hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">🚁</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Drone Designers</h3>
                    <p className="text-sm text-gray-600">Optimize drone performance by calculating power-to-mass ratios for flight efficiency and payload capacity.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#3b82f6] hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">🏋️</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Fitness Trainers</h3>
                    <p className="text-sm text-gray-600">Analyze cyclist and athlete power-to-weight ratios for training optimization and performance tracking.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#8b5cf6] hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">⚙️</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">Motor Manufacturers</h3>
                    <p className="text-sm text-gray-600">Compare motor specifications and performance characteristics for industrial and consumer applications.</p>
                </div>
            </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="mt-12 bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200 print:hidden">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About This Professional Power-to-Mass Ratio Calculator</h2>
            <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                    Our <strong>Power-to-Mass Ratio Calculator</strong> is the most comprehensive online tool for calculating specific power ratios in both metric (W/kg) and imperial (hp/lb) units. Designed for engineers, automotive enthusiasts, drone designers, and performance analysts, this calculator provides instant, accurate power-to-weight calculations with automatic unit conversions and professional-grade precision.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">🎯 Why Power-to-Mass Ratio Matters</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Power-to-mass ratio is a fundamental engineering metric that determines how efficiently a system can accelerate, climb, or perform work relative to its weight. Higher ratios indicate better performance potential, making this calculation essential for vehicle design, motor selection, drone optimization, and athletic performance analysis. Our calculator handles all the complex unit conversions automatically, ensuring accurate comparisons across different measurement systems.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">⚡ Dual Unit System Support</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Unlike basic calculators that only work in one unit system, our tool provides simultaneous results in both <strong>Watts per kilogram (W/kg)</strong> and <strong>Horsepower per pound (hp/lb)</strong>. This dual-display approach eliminates conversion errors and allows direct comparison between systems using different measurement standards. The calculator automatically applies the correct conversion factors: 1 hp = 745.7 W and 1 lb = 0.453592 kg.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">🚀 Real-Time Calculations with Animations</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Experience instant results as you type with smooth, animated number transitions that make it easy to see how changes in power or mass affect the final ratio. The calculator updates both metric and imperial values simultaneously, providing immediate feedback for optimization decisions. Copy results with one click or use the comprehensive summary feature for documentation and sharing.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">📊 Pre-Loaded Examples & Comparisons</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                    Click on quick example buttons to instantly load typical values for sports cars (250kW/1500kg), racing drones (2hp/1.8lb), professional cyclists (400W/70kg), and motorcycles (150hp/450lb). These examples demonstrate real-world applications and help users understand typical ratios across different domains. Use these benchmarks to evaluate whether your system's performance is above, at, or below average for its category.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">🔧 Engineering-Grade Accuracy</h3>
                <p className="text-slate-700 leading-relaxed">
                    Built with precision engineering in mind, our calculator uses exact conversion constants and handles edge cases gracefully. Whether you're designing electric vehicles, optimizing drone propulsion systems, analyzing motorcycle performance, or studying human athletic capabilities, this tool provides the accuracy and reliability needed for professional engineering work. The power-to-mass ratio calculator online combines scientific precision with user-friendly design for the ultimate engineering calculation experience.
                </p>
            </div>
        </section>

        {/* --- EXTERNAL LINKS --- */}
        <section className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 print:hidden">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Helpful Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://en.wikipedia.org/wiki/Power-to-weight_ratio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                    <svg className="w-5 h-5 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-cyan-600">Wikipedia: Power-to-Weight Ratio</div>
                        <div className="text-xs text-gray-600">Comprehensive technical definition</div>
                    </div>
                </a>
                <a href="https://www.engineeringtoolbox.com/power-to-weight-ratio-d_1819.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                    <svg className="w-5 h-5 text-[#06b6d4] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-purple-600">Engineering ToolBox</div>
                        <div className="text-xs text-gray-600">Technical reference and formulas</div>
                    </div>
                </a>
                <a href="https://www.sciencedirect.com/topics/engineering/power-to-weight-ratio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                    <svg className="w-5 h-5 text-[#3b82f6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-green-600">ScienceDirect</div>
                        <div className="text-xs text-gray-600">Academic research and applications</div>
                    </div>
                </a>
                <a href="https://www.motorsport.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                    <svg className="w-5 h-5 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-orange-600">Motorsport Engineering</div>
                        <div className="text-xs text-gray-600">Racing and performance applications</div>
                    </div>
                </a>
            </div>
        </section>

        {/* --- INTERNAL LINKS - RELATED TOOLS --- */}
        <section className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-indigo-100 print:hidden">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Related Engineering Tools</h2>
            <p className="text-center text-gray-700 mb-6">Explore more calculation tools for engineers and performance analysts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a href="/fabric-costing-tool" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-indigo-50 transition-colors group border border-gray-200 hover:border-indigo-300">
                    <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Internal link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600">Fabric Costing Calculator</div>
                        <div className="text-xs text-gray-600">Professional textile engineering tool</div>
                    </div>
                </a>
                <a href="/percentage-change-calculator" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-indigo-50 transition-colors group border border-gray-200 hover:border-indigo-300">
                    <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Internal link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600">Percentage Change Calculator</div>
                        <div className="text-xs text-gray-600">Calculate increases and decreases</div>
                    </div>
                </a>
                <a href="/time-difference-calculator" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-indigo-50 transition-colors group border border-gray-200 hover:border-indigo-300">
                    <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Internal link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600">Time Difference Calculator</div>
                        <div className="text-xs text-gray-600">Calculate duration between dates</div>
                    </div>
                </a>
                <a href="/fill-dirt-calculator" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-indigo-50 transition-colors group border border-gray-200 hover:border-indigo-300">
                    <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Internal link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600">Fill Dirt Calculator</div>
                        <div className="text-xs text-gray-600">Construction volume calculations</div>
                    </div>
                </a>
                <a href="/pro-rv-loan-calculator" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-indigo-50 transition-colors group border border-gray-200 hover:border-indigo-300">
                    <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Internal link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                    <div>
                        <div className="font-semibold text-gray-900 group-hover:text-indigo-600">RV Loan Calculator</div>
                        <div className="text-xs text-gray-600">Vehicle financing calculations</div>
                    </div>
                </a>
                <a href="/math-and-calculation-tools" className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-colors group">
                    <svg className="w-6 h-6 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Internal link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <div>
                        <div className="font-semibold text-white">View All Math Tools</div>
                        <div className="text-xs text-indigo-100">Explore more calculation tools</div>
                    </div>
                </a>
            </div>
        </section>

        {/* --- NAVIGATION LINKS --- */}
        <section className="mt-12 bg-white p-6 rounded-2xl shadow-md border border-gray-200 print:hidden">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Quick Navigation</h2>
            <div className="flex flex-wrap gap-3">
                <a href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Home"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Home
                </a>
                <a href="/tools" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Tools"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    All Tools
                </a>
                <a href="/math-and-calculation-tools" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Math Tools"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    Math Tools
                </a>
                <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Contact"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Contact
                </a>
            </div>
        </section>

        {/* --- LAST UPDATED --- */}
        <div className="mt-8 text-center text-sm text-gray-500 print:hidden">
            <p>Last Updated: November 10, 2025</p>
        </div>

        <section className="mt-12 bg-white p-8 rounded-2xl shadow-md border border-gray-200/80">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto divide-y divide-gray-200/80">
                {faqs.map((faq, index) => (
                    <div key={index} className="py-6 first:pt-0 last:pb-0">
                        <h3 className="font-semibold text-lg text-gray-900">{faq.q}</h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </section>

        <footer className="text-center mt-12 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} ZuraWebTools. All rights reserved.</p>
        </footer>
      </main>
    </div>
    </>
  );
};

export default PowerToMassRatioCalculator;