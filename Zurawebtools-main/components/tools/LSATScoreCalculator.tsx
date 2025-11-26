import React, { useState, useMemo, useCallback, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { MAX_LSAT_RAW_SCORE, LSAT_CONVERSION_TABLE, LSAT_PERCENTILES, LAW_SCHOOL_TIERS, LSAT_FAQ_DATA } from '../constants';
import type { FAQItem } from '../types';
import TableOfContents, { TOCSection } from '../TableOfContents';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

// --- Error Boundary Component ---
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class LSATCalculatorErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('LSAT Calculator Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
                    <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 text-center">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">We're sorry, but the calculator encountered an error. Please refresh the page to try again.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}


// --- Icon Components ---
const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="LSAT score validation checkmark icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const ClipboardIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Copy LSAT score results to clipboard icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const DownloadIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Download LSAT score report CSV icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const TwitterIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share LSAT score on Twitter icon"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.93 4.93 0 004.6 3.42 9.86 9.86 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>;
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share LSAT score on Facebook icon"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const ChartBarIcon = ({ className = "w-12 h-12" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-label="LSAT percentile ranking chart icon"><path d="M11.5 6.25a.75.75 0 01.75.75v8.5a.75.75 0 01-1.5 0v-8.5a.75.75 0 01.75-.75zM8 8.25a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 018 8.25zM4.5 10.25a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75zM15 4.25a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75z" /></svg>;
const ChevronDownIcon = ({ className = "w-5 h-5 transition-transform duration-300 group-open:rotate-180" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-label="Expand LSAT score details dropdown icon"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;

interface LSATScoreCalculatorProps {
    navigateTo: (page: Page) => void;
}

const LSATScoreCalculator: React.FC<LSATScoreCalculatorProps> = ({ navigateTo }) => {
    const [rawScore, setRawScore] = useState<number>(0);
    const [whatIfScore, setWhatIfScore] = useState<number>(0);
    const [copied, setCopied] = useState(false);

    // Calculate scaled score, percentile, and law school tier
    const calculationResult = useMemo(() => {
        const scaledScore = LSAT_CONVERSION_TABLE[rawScore] || 120;
        const percentile = LSAT_PERCENTILES[scaledScore] || 0;
        
        let tier = LAW_SCHOOL_TIERS.belowAverage;
        if (scaledScore >= LAW_SCHOOL_TIERS.t14.min) tier = LAW_SCHOOL_TIERS.t14;
        else if (scaledScore >= LAW_SCHOOL_TIERS.topRegional.min) tier = LAW_SCHOOL_TIERS.topRegional;
        else if (scaledScore >= LAW_SCHOOL_TIERS.regional.min) tier = LAW_SCHOOL_TIERS.regional;
        else if (scaledScore >= LAW_SCHOOL_TIERS.safety.min) tier = LAW_SCHOOL_TIERS.safety;

        return { scaledScore, percentile, tier, rawScore };
    }, [rawScore]);

    const whatIfResult = useMemo(() => {
        const targetRaw = Math.min(MAX_LSAT_RAW_SCORE, Math.max(0, whatIfScore));
        const scaledScore = LSAT_CONVERSION_TABLE[targetRaw] || 120;
        const percentile = LSAT_PERCENTILES[scaledScore] || 0;
        const improvement = scaledScore - calculationResult.scaledScore;
        return { scaledScore, percentile, improvement, rawScore: targetRaw };
    }, [whatIfScore, calculationResult.scaledScore]);

    // Copy to clipboard
    const handleCopyToClipboard = useCallback(() => {
        const text = `LSAT Score Report\n\nRaw Score: ${calculationResult.rawScore}/${MAX_LSAT_RAW_SCORE}\nScaled Score: ${calculationResult.scaledScore}/180\nPercentile: ${calculationResult.percentile}th\nLaw School Tier: ${calculationResult.tier.label}`;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [calculationResult]);

    // Export CSV
    const handleExportCSV = useCallback(() => {
        const headers = "\"Category\",\"Score\"\n";
        const rows = [
            `\"Raw Score\",\"${calculationResult.rawScore}/${MAX_LSAT_RAW_SCORE}\"`,
            `\"Scaled Score\",\"${calculationResult.scaledScore}/180\"`,
            `\"Percentile\",\"${calculationResult.percentile}%\"`,
            `\"Law School Tier\",\"${calculationResult.tier.label}\"`,
            `\"Generated\",\"${new Date().toLocaleString()}\"`
        ];
        const csv = headers + rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lsat-score-report-${calculationResult.scaledScore}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }, [calculationResult]);

    // Share on social media
    const handleShareTwitter = useCallback(() => {
        const text = `I just calculated my LSAT score using the ZuraWebTools calculator! My estimated score is ${calculationResult.scaledScore}/180 (${calculationResult.percentile}th percentile). Check it out:`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/lsat-score-calculator')}`;
        window.open(url, '_blank');
    }, [calculationResult]);

    const handleShareFacebook = useCallback(() => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/lsat-score-calculator')}`;
        window.open(url, '_blank');
    }, []);

    // Get score color based on tier
    const getScoreColor = useCallback((score: number): string => {
        if (score >= 168) return 'text-green-600 dark:text-green-400';
        if (score >= 160) return 'text-blue-600 dark:text-blue-400';
        if (score >= 155) return 'text-amber-600 dark:text-amber-400';
        if (score >= 145) return 'text-orange-600 dark:text-orange-400';
        return 'text-slate-600 dark:text-slate-400';
    }, []);

    // SEO Meta Tags Setup
    useEffect(() => {
        document.title = "LSAT Score Calculator 2026 - Raw to Scaled Converter | ZuraWebTools";
        document.documentElement.setAttribute('lang', 'en');

        const setMeta = (name: string, content: string, isProperty = false) => {
            const attr = isProperty ? 'property' : 'name';
            let element = document.querySelector(`meta[${attr}='${name}']`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
            return element;
        };

        const setLink = (rel: string, href: string) => {
            let element = document.querySelector(`link[rel='${rel}']`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', rel);
                document.head.appendChild(element);
            }
            element.setAttribute('href', href);
            return element;
        };

        // Standard Meta Tags
        setMeta('description', "Free LSAT score calculator for law school admissions 2026. Convert raw scores to scaled scores (120-180) instantly. Get percentile rankings, T14 law school targets, and detailed admission analysis.");
        setMeta('keywords', "LSAT score calculator, LSAT raw score converter, law school admission test calculator, LSAT percentile, LSAT scaled score, law school admissions, LSAT prep, law school calculator");
        setMeta('author', 'ZuraWebTools');
        setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        setLink('canonical', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/lsat-score-calculator');

        // Open Graph Meta Tags
        setMeta('og:title', 'LSAT Score Calculator 2026 - Raw to Scaled Converter', true);
        setMeta('og:description', 'Calculate your LSAT score instantly! Convert raw scores to scaled scores (120-180), get percentile rankings, and law school target analysis for LSAT 2026.', true);
        setMeta('og:type', 'website', true);
        setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/lsat-score-calculator', true);
        setMeta('og:locale', 'en_US', true);
        setMeta('og:site_name', 'ZuraWebTools', true);
        setMeta('og:image', 'https://zurawebtools.com/images/lsat-calculator-preview.jpg', true);
        setMeta('og:image:alt', 'LSAT Score Calculator Interface - Law School Admission Test 2026', true);

        // Twitter Card Meta Tags
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', 'LSAT Score Calculator 2026 - Raw to Scaled Converter');
        setMeta('twitter:description', 'Calculate your LSAT score instantly! Convert raw scores to scaled scores, get percentiles & law school targets. Free online tool for LSAT 2026.');
        setMeta('twitter:image', 'https://zurawebtools.com/images/lsat-calculator-preview.jpg');
        setMeta('twitter:site', '@ZuraWebTools');

        // Schema.org JSON-LD
        const jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        jsonLdScript.id = 'json-ld-lsat-calculator';
        const faqJsonLd = LSAT_FAQ_DATA.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }));

        jsonLdScript.innerHTML = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "LSAT Score Calculator",
                "applicationCategory": "EducationApplication",
                "applicationSubCategory": "Law School Admission Test Calculator",
                "operatingSystem": "Any (Web-based)",
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
                },
                "description": "Free LSAT score calculator for law school admissions. Convert raw scores to scaled scores (120-180) with percentile rankings and law school target analysis.",
                "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/lsat-score-calculator"
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
                        "name": "Education & Exam Tools",
                        "item": "https://zurawebtools.com/education-and-exam-tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Test Score Tools",
                        "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LSAT Score Calculator",
                        "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/lsat-score-calculator"
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqJsonLd
            }
        ]);
        document.head.appendChild(jsonLdScript);

        return () => {
            document.title = 'ZuraWebTools';
            const metasToRemove = [
                'description', 'keywords', 'author', 'robots',
                'og:title', 'og:description', 'og:type', 'og:url', 'og:locale', 'og:site_name', 'og:image', 'og:image:alt',
                'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:site'
            ];
            metasToRemove.forEach(name => {
                const el = document.querySelector(`meta[name='${name}'], meta[property='${name}']`);
                if (el) el.remove();
            });
            document.getElementById('json-ld-lsat-calculator')?.remove();
        };
    }, []);

    // Table of Contents sections
    const tocSections: TOCSection[] = [
        {
            id: 'examples',
            emoji: '📝',
            title: 'Examples',
            subtitle: 'Quick samples',
            gradientFrom: 'from-blue-50',
            gradientTo: 'to-indigo-50',
            hoverBorder: 'border-blue-400',
            hoverText: 'text-blue-600'
        },
        {
            id: 'benefits',
            emoji: '⭐',
            title: 'Benefits',
            subtitle: 'Why use this',
            gradientFrom: 'from-purple-50',
            gradientTo: 'to-pink-50',
            hoverBorder: 'border-purple-400',
            hoverText: 'text-purple-600'
        },
        {
            id: 'how-to-use',
            emoji: '📖',
            title: 'How to Use',
            subtitle: 'Step-by-step',
            gradientFrom: 'from-green-50',
            gradientTo: 'to-emerald-50',
            hoverBorder: 'border-green-400',
            hoverText: 'text-green-600'
        },
        {
            id: 'use-cases',
            emoji: '💡',
            title: 'Use Cases',
            subtitle: 'Who uses this',
            gradientFrom: 'from-orange-50',
            gradientTo: 'to-amber-50',
            hoverBorder: 'border-orange-400',
            hoverText: 'text-orange-600'
        },
        {
            id: 'about',
            emoji: 'ℹ️',
            title: 'About',
            subtitle: 'LSAT scoring',
            gradientFrom: 'from-cyan-50',
            gradientTo: 'to-blue-50',
            hoverBorder: 'border-cyan-400',
            hoverText: 'text-cyan-600'
        },
        {
            id: 'faq',
            emoji: '❓',
            title: 'FAQ',
            subtitle: 'Common questions',
            gradientFrom: 'from-violet-50',
            gradientTo: 'to-purple-50',
            hoverBorder: 'border-violet-400',
            hoverText: 'text-violet-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        LSAT Score Calculator 2026
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Free raw to scaled score converter for Law School Admission Test. Calculate your LSAT score (120-180), get percentile rankings, and analyze law school targets instantly.
                    </p>
                </div>

                {/* Main Calculator Section */}
                <div id="calculator" className="mb-16 scroll-mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left Side: Input Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                                    Enter Your LSAT Raw Score
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    Enter the number of questions you answered correctly (0-{MAX_LSAT_RAW_SCORE})
                                </p>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Questions Correct (Raw Score)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max={MAX_LSAT_RAW_SCORE}
                                            value={rawScore}
                                            onChange={(e) => setRawScore(Math.min(MAX_LSAT_RAW_SCORE, Math.max(0, parseInt(e.target.value) || 0)))}
                                            className="w-full px-4 py-3 text-lg font-semibold text-center border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                            placeholder="0"
                                        />
                                        <div className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                                            Out of {MAX_LSAT_RAW_SCORE} questions
                                        </div>
                                    </div>

                                    {/* Slider */}
                                    <div>
                                        <input
                                            type="range"
                                            min="0"
                                            max={MAX_LSAT_RAW_SCORE}
                                            value={rawScore}
                                            onChange={(e) => setRawScore(parseInt(e.target.value))}
                                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Quick Score Examples */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-700/50 p-6 rounded-2xl border border-blue-200 dark:border-slate-600">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Examples</h3>
                                <div className="space-y-2">
                                    <button onClick={() => setRawScore(89)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors">
                                        <span className="font-semibold text-green-600 dark:text-green-400">170</span>
                                        <span className="text-slate-600 dark:text-slate-300 ml-2">(~89 correct)</span>
                                    </button>
                                    <button onClick={() => setRawScore(77)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors">
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">160</span>
                                        <span className="text-slate-600 dark:text-slate-300 ml-2">(~77 correct)</span>
                                    </button>
                                    <button onClick={() => setRawScore(63)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors">
                                        <span className="font-semibold text-amber-600 dark:text-amber-400">150</span>
                                        <span className="text-slate-600 dark:text-slate-300 ml-2">(~63 correct)</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Results Section */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-6" aria-live="polite" aria-atomic="true">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Estimated LSAT Score</h2>
                                <h3 className="text-sm text-slate-600 dark:text-slate-300">Law School Admission Test 2026 Score Report</h3>
                            </div>

                            {rawScore > 0 ? (
                                <div className="space-y-6">
                                    {/* Main Score Display */}
                                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/50" role="status" aria-label={`Your LSAT scaled score is ${calculationResult.scaledScore} out of 180`}>
                                        <div className={`text-7xl lg:text-8xl font-extrabold ${getScoreColor(calculationResult.scaledScore)} transition-all duration-300`}>
                                            {calculationResult.scaledScore}
                                        </div>
                                        <div className="text-lg font-medium text-slate-600 dark:text-slate-400">out of 180</div>
                                        <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: `${calculationResult.tier.color}20`, color: calculationResult.tier.color }}>
                                            {calculationResult.tier.label}
                                        </div>
                                    </div>

                                    {/* Percentile and Raw Score */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{calculationResult.percentile}th</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">Percentile</div>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{calculationResult.rawScore}/{MAX_LSAT_RAW_SCORE}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">Raw Score</div>
                                        </div>
                                    </div>

                                    {/* What-If Simulator */}
                                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800/50">
                                        <h3 className="text-lg font-semibold text-center text-slate-800 dark:text-slate-200 mb-4">
                                            LSAT Score "What-If" Simulator
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 text-center">
                                            What if you got {whatIfScore} questions correct?
                                        </p>
                                        <input
                                            type="range"
                                            min="0"
                                            max={MAX_LSAT_RAW_SCORE}
                                            value={whatIfScore}
                                            onChange={(e) => setWhatIfScore(parseInt(e.target.value))}
                                            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                        />
                                        <div className="mt-4 text-center">
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                {whatIfResult.scaledScore}/180
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                                {whatIfResult.improvement > 0 ? `+${whatIfResult.improvement}` : whatIfResult.improvement} points
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                                        <button onClick={handleCopyToClipboard} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors">
                                            {copied ? <CheckIcon /> : <ClipboardIcon />} {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                        <button onClick={handleExportCSV} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors">
                                            <DownloadIcon /> Export CSV
                                        </button>
                                    </div>

                                    {/* Social Share */}
                                    <div className="flex justify-center gap-3 pt-4">
                                        <button onClick={handleShareTwitter} className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors" aria-label="Share on Twitter">
                                            <TwitterIcon className="w-5 h-5" />
                                        </button>
                                        <button onClick={handleShareFacebook} className="p-2 rounded-full bg-[#4267B2] text-white hover:bg-[#365899] transition-colors" aria-label="Share on Facebook">
                                            <FacebookIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20 px-6">
                                    <div className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500">
                                        <ChartBarIcon />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Enter Your LSAT Raw Score Above</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your LSAT score conversion results will appear here instantly.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table of Contents */}
                <TableOfContents sections={tocSections} />

                {/* Law School Tiers Section */}
                <div id="law-school-tiers" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        LSAT Score Ranges by Law School Tier
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.values(LAW_SCHOOL_TIERS).slice(0, 4).map((tier, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 hover:shadow-xl transition-all duration-300" style={{ borderColor: tier.color }}>
                                <div className="text-3xl font-bold mb-2" style={{ color: tier.color }}>
                                    {tier.min}-{tier.max}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{tier.label}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {idx === 0 && "Harvard, Yale, Stanford, Columbia"}
                                    {idx === 1 && "Vanderbilt, Georgetown, UCLA"}
                                    {idx === 2 && "Top state and regional schools"}
                                    {idx === 3 && "Good acceptance opportunities"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Examples Section */}
                <div id="examples" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        LSAT Score Examples - What Does Each Score Mean?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">170+</div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Elite Score</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">~89-90+ correct answers. Opens doors to Harvard, Yale, Stanford Law. 97.5th percentile or higher.</p>
                            <button onClick={() => setRawScore(89)} className="text-sm text-green-600 dark:text-green-400 font-semibold hover:underline">Try This Score →</button>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">160</div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Competitive Score</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">~77 correct answers. Strong for top regional schools like Georgetown, UCLA. 80th percentile.</p>
                            <button onClick={() => setRawScore(77)} className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">Try This Score →</button>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">150</div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Median Score</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">~63 correct answers. National median. Good for many accredited law schools. 44th percentile.</p>
                            <button onClick={() => setRawScore(63)} className="text-sm text-amber-600 dark:text-amber-400 font-semibold hover:underline">Try This Score →</button>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div id="benefits" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Why Use Our Free LSAT Score Calculator?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Instant Results</h3>
                            <p className="text-slate-600 dark:text-slate-400">Get your scaled LSAT score (120-180) and percentile ranking instantly. No registration or email required.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Law School Targets</h3>
                            <p className="text-slate-600 dark:text-slate-400">Match your score to T14, top regional, and safety schools. See exactly where you stand for admissions.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-xl transition-all">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">What-If Scenarios</h3>
                            <p className="text-slate-600 dark:text-slate-400">Simulate score improvements. See how answering 5 more questions correctly impacts your law school options.</p>
                        </div>
                    </div>
                </div>

                {/* How to Use Section */}
                <div id="how-to-use" className="mb-16 scroll-mt-24">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">How to Use the LSAT Calculator</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Enter Raw Score</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Input the number of questions you answered correctly (0-{MAX_LSAT_RAW_SCORE})</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">2</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">View Scaled Score</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">See your 120-180 scaled score and percentile ranking instantly</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">3</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Analyze Law School Targets</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Check which law school tiers match your score range</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">4</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Export & Share</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Copy results, export to CSV, or share on social media</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Use Cases Section */}
                <div id="use-cases" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Who Uses the LSAT Score Calculator?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">👨‍🎓</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pre-Law Students</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Planning law school applications? Use this calculator to convert practice test raw scores to scaled scores and identify target schools within your score range.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">📚</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">LSAT Test Takers</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Taking official or practice LSATs? Calculate your score immediately after completing a test to track progress and measure improvement over time.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">🎓</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Law School Advisors</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Counseling students on law school admissions? Quickly demonstrate score impacts and help students set realistic target schools based on LSAT performance.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">💼</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Career Changers</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Considering law school after working? Evaluate your practice test scores and understand what LSAT performance is needed for your target law schools.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About LSAT Scoring Section */}
                <div id="about" className="mb-16 scroll-mt-24">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">Understanding LSAT Scoring & Law School Admissions</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                The <strong>Law School Admission Test (LSAT)</strong> is a standardized test administered by the <strong>Law School Admission Council (LSAC)</strong> and is a crucial component of law school admissions in the United States, Canada, and beyond. The LSAT measures critical reading comprehension, analytical reasoning skills, logical reasoning abilities, and argumentative writing proficiency—all essential competencies for success in law school and legal practice. Our <a href="#calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">free LSAT calculator</a> helps you instantly convert your raw score to the official scaled score format used by ABA-accredited law schools.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                <strong>LSAT scoring methodology</strong> uses a scaled score system ranging from <strong>120 to 180</strong>, with the national median score typically falling around 150-151. Your scaled score is calculated by converting your raw score (the total number of questions answered correctly) using an official LSAC conversion table that accounts for test difficulty and equating across different test administrations. There is <strong>no penalty for incorrect answers or guessing</strong>, so it's strategically beneficial to attempt every question. You can see <a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">quick score examples</a> showing what different raw scores translate to in terms of scaled scores and national percentiles.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                The LSAT consists of multiple sections: two <strong>Logical Reasoning</strong> sections, one <strong>Reading Comprehension</strong> section, one <strong>Analytical Reasoning (Logic Games)</strong> section, plus an unscored experimental section and an unscored writing sample. Approximately 100-101 questions contribute to your final scaled score. Use our <a href="#how-to-use" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">step-by-step guide</a> to learn how to calculate your score from practice tests.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                <strong>Percentile rankings</strong> show how your score compares to other test takers. For example, a score of 170 places you in the 97.5th percentile, meaning you scored higher than 97.5% of test takers. Top law schools (T14 schools like Harvard, Yale, Stanford) typically admit students with scores of 168-175+, while competitive regional schools may accept scores in the 155-167 range. Check our <a href="#law-school-tiers" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">law school tier breakdown</a> to see where your score stands for different types of law schools.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                Law school admissions use LSAT scores alongside your <strong>undergraduate GPA</strong>, personal statements, letters of recommendation, and work experience. The <strong>LSAC Credential Assembly Service (CAS)</strong> standardizes your academic records and LSAT score into a comprehensive report for law schools. Many schools use <strong>index scores</strong> combining LSAT and GPA to determine admission competitiveness. Understanding your <a href="#use-cases" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">specific use case</a>—whether you're a pre-law student, career changer, or working with an advisor—can help you better strategize your law school applications.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400">
                                This calculator uses official LSAC conversion tables to provide accurate scaled scores, percentile rankings, and law school tier matching. Whether you're taking the <strong>LSAT for the first time</strong> or planning a retake to improve your score (you can take it up to 3 times per year, 5 times in 5 years, and 7 times total), understanding your score is the first step toward law school success. Explore the <a href="#benefits" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">key benefits</a> of using our calculator, or check the <a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">FAQ section</a> for answers to common LSAT scoring questions.
                            </p>
                        </div>
                        
                        {/* External Authority Links */}
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Official LSAT Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a href="https://www.lsac.org/lsat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className="text-2xl">🔗</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">LSAC Official Site</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">lsac.org - Test information & registration</div>
                                    </div>
                                </a>
                                <a href="https://www.lsac.org/lsat/lsat-dates-deadlines-score-release-dates" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className="text-2xl">📅</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">LSAT Test Dates</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Official test schedule & score release</div>
                                    </div>
                                </a>
                                <a href="https://www.lsac.org/lsat/prep" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className="text-2xl">📖</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">LSAT Prep Resources</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">Official practice tests & study materials</div>
                                    </div>
                                </a>
                                <a href="https://www.americanbar.org/groups/legal_education/resources/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className="text-2xl">⚖️</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">ABA Law Schools</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">American Bar Association accreditation</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Last Updated */}
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                <strong>Last Updated:</strong> November 20, 2025 | LSAT conversion tables updated for 2025-2026 test cycle
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div id="faq" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {LSAT_FAQ_DATA.map((faq, index) => (
                            <details key={index} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all">
                                <summary className="flex justify-between items-center cursor-pointer px-6 py-4 text-lg font-semibold text-slate-900 dark:text-white list-none">
                                    <span>{faq.question}</span>
                                    <ChevronDownIcon />
                                </summary>
                                <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Related Tools */}
                <RelatedTools 
                    relatedSlugs={['sat-score-calculator', 'lsac-gpa-calculator', 'college-gpa-calculator']}
                    navigateTo={navigateTo}
                    currentSlug="lsat-score-calculator"
                />
            </div>
        </div>
    );
};

// Export with Error Boundary
const LSATScoreCalculatorWithErrorBoundary: React.FC<LSATScoreCalculatorProps> = (props) => (
    <LSATCalculatorErrorBoundary>
        <LSATScoreCalculator {...props} />
    </LSATCalculatorErrorBoundary>
);

export default LSATScoreCalculatorWithErrorBoundary;
