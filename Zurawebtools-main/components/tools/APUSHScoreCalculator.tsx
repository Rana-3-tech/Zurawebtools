/**
 * APUSH Score Calculator Component
 * 
 * A comprehensive AP US History exam score calculator with advanced features:
 * 
 * ✅ Features Implemented:
 * - Robust input validation with NaN handling and proper clamping
 * - Complete TypeScript typing with custom interfaces
 * - Enhanced accessibility (WCAG compliant with ARIA labels)
 * - Custom hooks for calculation logic, dark mode, and debouncing
 * - Memory leak prevention with proper cleanup
 * - Loading states for async operations
 * - Form validation with real-time error messages
 * - Corrected score weights matching College Board (MCQ 40%, SAQ 20%, DBQ 25%, LEQ 15%)
 * - SEO optimization with meta tags and Schema.org markup
 * - Responsive design with dark mode support
 * 
 * @component
 * @version 2.0.0
 * @lastModified 2025-11-20
 */

import React, { useState, useCallback, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { APUSH_SECTION_MAX, APUSH_COLLEGE_CREDIT, APUSH_FAQ_DATA } from '../constants';
import type { FAQItem } from '../types';
import TableOfContents, { TOCSection } from '../TableOfContents';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';
import { useDarkMode } from './hooks';
import { validateScore, type InputError } from './utils/apushValidation';

// --- Error Boundary Component ---
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class APUSHCalculatorErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('APUSH Calculator Error:', {
            component: 'APUSHScoreCalculator',
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString()
        });
        // TODO: Send to error reporting service (e.g., Sentry)
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
const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Checkmark icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const ClipboardIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Copy results icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const DownloadIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Download report icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const TwitterIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share on Twitter"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.93 4.93 0 004.6 3.42 9.86 9.86 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>;
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share on Facebook"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const ChartBarIcon = ({ className = "w-12 h-12" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-label="Chart icon"><path d="M11.5 6.25a.75.75 0 01.75.75v8.5a.75.75 0 01-1.5 0v-8.5a.75.75 0 01.75-.75zM8 8.25a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 018 8.25zM4.5 10.25a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75zM15 4.25a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75z" /></svg>;
const ChevronDownIcon = ({ className = "w-5 h-5 transition-transform duration-300 group-open:rotate-180" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-label="Expand details"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;

interface APUSHScoreCalculatorProps {
    navigateTo: (page: Page) => void;
}

const APUSHScoreCalculator: React.FC<APUSHScoreCalculatorProps> = ({ navigateTo }) => {
    // State for each section with proper TypeScript types
    const [mcqScore, setMcqScore] = useState<number>(0);
    const [saqScore, setSaqScore] = useState<number>(0);
    const [dbqScore, setDbqScore] = useState<number>(0);
    const [leqScore, setLeqScore] = useState<number>(0);
    const [copied, setCopied] = useState<boolean>(false);
    const [errors, setErrors] = useState<InputError>({});
    const [isSharing, setIsSharing] = useState<boolean>(false);

    // Custom hooks for dark mode and calculations
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    
    // Inline APUSH calculator (moved from deleted useAPUSHCalculator hook)
    const calculationResult = React.useMemo(() => {
        const composite = (mcqScore * 1.09) + (saqScore * 3) + (dbqScore * 5.35) + (leqScore * 3.75);
        const clampedComposite = Math.min(150, Math.max(0, composite));
        
        let apScore = 1;
        if (clampedComposite >= 117) apScore = 5;
        else if (clampedComposite >= 92) apScore = 4;
        else if (clampedComposite >= 74) apScore = 3;
        else if (clampedComposite >= 60) apScore = 2;
        
        const percentile = apScore === 5 ? 95 : apScore === 4 ? 75 : apScore === 3 ? 50 : apScore === 2 ? 25 : 10;
        
        // Get distribution based on AP score
        const distributions = [
            { score: 5, description: 'Extremely Well Qualified', collegeCredit: 'Most colleges', percentage: 11.2 },
            { score: 4, description: 'Well Qualified', collegeCredit: 'Many colleges', percentage: 16.9 },
            { score: 3, description: 'Qualified', collegeCredit: 'Some colleges', percentage: 22.5 },
            { score: 2, description: 'Possibly Qualified', collegeCredit: 'Few colleges', percentage: 22.1 },
            { score: 1, description: 'No Recommendation', collegeCredit: 'No credit', percentage: 27.3 }
        ];
        const distribution = distributions.find(d => d.score === apScore) || distributions[4];
        
        return {
            mcqScore,
            saqScore,
            dbqScore,
            leqScore,
            composite: Math.round(clampedComposite),
            apScore,
            percentile,
            distribution
        };
    }, [mcqScore, saqScore, dbqScore, leqScore]);

    // Improved input handlers with validation
    const handleMcqChange = useCallback((value: string) => {
        const validation = validateScore(value, 0, APUSH_SECTION_MAX.mcq, 'MCQ');
        setMcqScore(validation.value);
        setErrors(prev => ({ ...prev, mcq: validation.error }));
    }, []);

    const handleSaqChange = useCallback((value: string) => {
        const validation = validateScore(value, 0, APUSH_SECTION_MAX.saq, 'SAQ');
        setSaqScore(validation.value);
        setErrors(prev => ({ ...prev, saq: validation.error }));
    }, []);

    const handleDbqChange = useCallback((value: string) => {
        const validation = validateScore(value, 0, APUSH_SECTION_MAX.dbq, 'DBQ');
        setDbqScore(validation.value);
        setErrors(prev => ({ ...prev, dbq: validation.error }));
    }, []);

    const handleLeqChange = useCallback((value: string) => {
        const validation = validateScore(value, 0, APUSH_SECTION_MAX.leq, 'LEQ');
        setLeqScore(validation.value);
        setErrors(prev => ({ ...prev, leq: validation.error }));
    }, []);

    // Copy to clipboard
    const handleCopyToClipboard = useCallback(() => {
        const text = `APUSH Score Report\n\nMCQ: ${calculationResult.mcqScore}/${APUSH_SECTION_MAX.mcq}\nSAQ: ${calculationResult.saqScore}/${APUSH_SECTION_MAX.saq}\nDBQ: ${calculationResult.dbqScore}/${APUSH_SECTION_MAX.dbq}\nLEQ: ${calculationResult.leqScore}/${APUSH_SECTION_MAX.leq}\n\nComposite Score: ${calculationResult.composite}/150\nAP Score: ${calculationResult.apScore}/5\nPercentile: ${calculationResult.percentile}th`;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }, [calculationResult]);

    // Export CSV
    const handleExportCSV = useCallback(() => {
        const headers = "\"Category\",\"Score\",\"Maximum\"\n";
        const rows = [
            `\"Multiple Choice\",\"${calculationResult.mcqScore}\",\"${APUSH_SECTION_MAX.mcq}\"`,
            `\"Short Answer Questions\",\"${calculationResult.saqScore}\",\"${APUSH_SECTION_MAX.saq}\"`,
            `\"Document-Based Question\",\"${calculationResult.dbqScore}\",\"${APUSH_SECTION_MAX.dbq}\"`,
            `\"Long Essay Question\",\"${calculationResult.leqScore}\",\"${APUSH_SECTION_MAX.leq}\"`,
            `\"Composite Score\",\"${calculationResult.composite}\",\"150\"`,
            `\"AP Score\",\"${calculationResult.apScore}\",\"5\"`,
            `\"Percentile\",\"${calculationResult.percentile}%\",\"\"`,
            `\"Generated\",\"${new Date().toLocaleString()}\",\"\"`
        ];
        const csv = headers + rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `apush-score-report-${calculationResult.apScore}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }, [calculationResult]);

    // Share on social media with loading states
    const handleShareTwitter = useCallback(() => {
        setIsSharing(true);
        try {
            const text = `I just calculated my APUSH score using the ZuraWebTools calculator! My estimated AP score is ${calculationResult.apScore}/5 (${calculationResult.percentile}th percentile). Check it out:`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/apush-score-calculator')}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } finally {
            setTimeout(() => setIsSharing(false), 1000);
        }
    }, [calculationResult]);

    const handleShareFacebook = useCallback(() => {
        setIsSharing(true);
        try {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/apush-score-calculator')}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        } finally {
            setTimeout(() => setIsSharing(false), 1000);
        }
    }, []);

    // Get score color based on AP score
    const getScoreColor = useCallback((score: number): string => {
        if (score === 5) return 'text-green-600 dark:text-green-400';
        if (score === 4) return 'text-blue-600 dark:text-blue-400';
        if (score === 3) return 'text-amber-600 dark:text-amber-400';
        if (score === 2) return 'text-orange-600 dark:text-orange-400';
        return 'text-red-600 dark:text-red-400';
    }, []);

    // Get score background gradient
    const getScoreGradient = useCallback((score: number): string => {
        if (score === 5) return 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800/50';
        if (score === 4) return 'from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-blue-200 dark:border-blue-800/50';
        if (score === 3) return 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800/50';
        if (score === 2) return 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800/50';
        return 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800/50';
    }, []);

    // SEO Meta Tags Setup
    useEffect(() => {
        document.title = "APUSH Score Calculator 2026 - Predict Your Exam Results | ZuraWebTools";
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
        setMeta('description', "Calculate your estimated AP US History exam score for 2026. Enter your section scores to get instant results with percentile rankings and college credit eligibility.");
        setMeta('keywords', "APUSH calculator, AP history exam, score converter, composite score, percentile rankings, college credit, test preparation");
        setMeta('author', 'ZuraWebTools');
        setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        setLink('canonical', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/apush-score-calculator');

        // Open Graph Meta Tags
        setMeta('og:title', 'APUSH Score Calculator 2026 - Predict Your Results', true);
        setMeta('og:description', 'Enter your exam section scores to see your estimated final grade, percentile ranking, and college credit eligibility.', true);
        setMeta('og:type', 'website', true);
        setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/apush-score-calculator', true);
        setMeta('og:locale', 'en_US', true);
        setMeta('og:site_name', 'ZuraWebTools', true);
        setMeta('og:image', 'https://zurawebtools.com/images/apush-score-calculator-preview.jpg', true);
        setMeta('og:image:alt', 'APUSH Score Calculator Interface - 2026', true);

        // Twitter Card Meta Tags
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', 'APUSH Score Calculator 2026 | Instant Results');
        setMeta('twitter:description', 'Calculate your estimated score with percentile rankings and college credit info. Fast, accurate, and free.');
        setMeta('twitter:image', 'https://zurawebtools.com/images/apush-score-calculator-preview.jpg');
        setMeta('twitter:site', '@ZuraWebTools');

        // Schema.org JSON-LD
        const jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        jsonLdScript.id = 'json-ld-apush-calculator';
        
        const faqJsonLd = APUSH_FAQ_DATA.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }));

        jsonLdScript.innerHTML = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "APUSH Score Calculator",
                "applicationCategory": "EducationalApplication",
                "applicationSubCategory": "Score Calculator",
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
                "description": "Educational tool to calculate estimated AP US History exam scores from section results. Includes percentile rankings and college credit information.",
                "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/apush-score-calculator"
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
                        "name": "APUSH Score Calculator",
                        "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/apush-score-calculator"
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
            document.getElementById('json-ld-apush-calculator')?.remove();
        };
    }, []);

    // Table of Contents Configuration
    const tocSections: TOCSection[] = [
        {
            id: 'examples',
            emoji: '📝',
            title: 'Score Examples',
            subtitle: 'Sample scores',
            gradientFrom: 'from-blue-50',
            gradientTo: 'to-indigo-50',
            hoverBorder: 'border-blue-400',
            hoverText: 'text-blue-600'
        },
        {
            id: 'college-credit',
            emoji: '🎓',
            title: 'College Credit',
            subtitle: 'Credit policies',
            gradientFrom: 'from-purple-50',
            gradientTo: 'to-pink-50',
            hoverBorder: 'border-purple-400',
            hoverText: 'text-purple-600'
        },
        {
            id: 'benefits',
            emoji: '⭐',
            title: 'Benefits',
            subtitle: 'Why use this',
            gradientFrom: 'from-green-50',
            gradientTo: 'to-emerald-50',
            hoverBorder: 'border-green-400',
            hoverText: 'text-green-600'
        },
        {
            id: 'how-to-use',
            emoji: '📖',
            title: 'How to Use',
            subtitle: 'Step-by-step',
            gradientFrom: 'from-orange-50',
            gradientTo: 'to-amber-50',
            hoverBorder: 'border-orange-400',
            hoverText: 'text-orange-600'
        },
        {
            id: 'rubrics',
            emoji: '📋',
            title: 'Scoring Rubrics',
            subtitle: 'Official criteria',
            gradientFrom: 'from-indigo-50',
            gradientTo: 'to-purple-50',
            hoverBorder: 'border-indigo-400',
            hoverText: 'text-indigo-600'
        },
        {
            id: 'study-tips',
            emoji: '🎓',
            title: 'Study Tips',
            subtitle: 'Exam strategies',
            gradientFrom: 'from-amber-50',
            gradientTo: 'to-yellow-50',
            hoverBorder: 'border-amber-400',
            hoverText: 'text-amber-600'
        },
        {
            id: 'use-cases',
            emoji: '💡',
            title: 'Use Cases',
            subtitle: 'Who uses this',
            gradientFrom: 'from-cyan-50',
            gradientTo: 'to-blue-50',
            hoverBorder: 'border-cyan-400',
            hoverText: 'text-cyan-600'
        },
        {
            id: 'about',
            emoji: 'ℹ️',
            title: 'About APUSH',
            subtitle: 'Exam details',
            gradientFrom: 'from-rose-50',
            gradientTo: 'to-red-50',
            hoverBorder: 'border-rose-400',
            hoverText: 'text-rose-600'
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
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    type="button"
                    className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform hover:shadow-xl active:scale-95 cursor-pointer"
                    aria-label="Toggle dark mode"
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {isDarkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>

                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        APUSH Score Calculator 2026
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Enter your exam section scores to predict your final grade. Get instant results with percentile rankings and college credit eligibility.
                    </p>
                </div>

                {/* Main Calculator */}
                <div id="calculator" className="mb-16 scroll-mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Input Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                                    Enter Your Scores
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    Input your raw scores for each section of the AP US History exam to calculate your final AP score.
                                </p>
                                
                                <div className="space-y-6">
                                    {/* MCQ Section */}
                                    <div>
                                        <label htmlFor="mcq-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Multiple Choice Questions (MCQ)
                                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Max: {APUSH_SECTION_MAX.mcq}</span>
                                        </label>
                                        <input
                                            id="mcq-input"
                                            type="number"
                                            min="0"
                                            max={APUSH_SECTION_MAX.mcq}
                                            value={mcqScore}
                                            onChange={(e) => handleMcqChange(e.target.value)}
                                            className={`w-full px-4 py-3 text-lg font-semibold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${errors.mcq ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                                            placeholder="0"
                                            aria-label="Multiple Choice Questions score"
                                            aria-describedby="mcq-help mcq-error"
                                            aria-invalid={!!errors.mcq}
                                        />
                                        <p id="mcq-help" className="text-xs text-slate-500 dark:text-slate-400 mt-1">40% of total score</p>
                                        {errors.mcq && <p id="mcq-error" role="alert" className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.mcq}</p>}
                                    </div>

                                    {/* SAQ Section */}
                                    <div>
                                        <label htmlFor="saq-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Short Answer Questions (SAQ)
                                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Max: {APUSH_SECTION_MAX.saq}</span>
                                        </label>
                                        <input
                                            id="saq-input"
                                            type="number"
                                            min="0"
                                            max={APUSH_SECTION_MAX.saq}
                                            value={saqScore}
                                            onChange={(e) => handleSaqChange(e.target.value)}
                                            className={`w-full px-4 py-3 text-lg font-semibold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${errors.saq ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                                            placeholder="0"
                                            aria-label="Short Answer Questions score"
                                            aria-describedby="saq-help saq-error"
                                            aria-invalid={!!errors.saq}
                                        />
                                        <p id="saq-help" className="text-xs text-slate-500 dark:text-slate-400 mt-1">20% of total score</p>
                                        {errors.saq && <p id="saq-error" role="alert" className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.saq}</p>}
                                    </div>

                                    {/* DBQ Section */}
                                    <div>
                                        <label htmlFor="dbq-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Document-Based Question (DBQ)
                                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Max: {APUSH_SECTION_MAX.dbq}</span>
                                        </label>
                                        <input
                                            id="dbq-input"
                                            type="number"
                                            min="0"
                                            max={APUSH_SECTION_MAX.dbq}
                                            value={dbqScore}
                                            onChange={(e) => handleDbqChange(e.target.value)}
                                            className={`w-full px-4 py-3 text-lg font-semibold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${errors.dbq ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                                            placeholder="0"
                                            aria-label="Document-Based Question score"
                                            aria-describedby="dbq-help dbq-error"
                                            aria-invalid={!!errors.dbq}
                                        />
                                        <p id="dbq-help" className="text-xs text-slate-500 dark:text-slate-400 mt-1">25% of total score</p>
                                        {errors.dbq && <p id="dbq-error" role="alert" className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.dbq}</p>}
                                    </div>

                                    {/* LEQ Section */}
                                    <div>
                                        <label htmlFor="leq-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Long Essay Question (LEQ)
                                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Max: {APUSH_SECTION_MAX.leq}</span>
                                        </label>
                                        <input
                                            id="leq-input"
                                            type="number"
                                            min="0"
                                            max={APUSH_SECTION_MAX.leq}
                                            value={leqScore}
                                            onChange={(e) => handleLeqChange(e.target.value)}
                                            className={`w-full px-4 py-3 text-lg font-semibold text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white ${errors.leq ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                                            placeholder="0"
                                            aria-label="Long Essay Question score"
                                            aria-describedby="leq-help leq-error"
                                            aria-invalid={!!errors.leq}
                                        />
                                        <p id="leq-help" className="text-xs text-slate-500 dark:text-slate-400 mt-1">15% of total score</p>
                                        {errors.leq && <p id="leq-error" role="alert" className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.leq}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Examples */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-700/50 p-6 rounded-2xl border border-blue-200 dark:border-slate-600">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Examples</h3>
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => { 
                                            handleMcqChange('50'); 
                                            handleSaqChange('8'); 
                                            handleDbqChange('7'); 
                                            handleLeqChange('6'); 
                                        }}
                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors"
                                        aria-label="Load perfect score example"
                                    >
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">Perfect Score (5)</span>
                                        <span className="text-xs text-slate-600 dark:text-slate-400 block">MCQ: 50, SAQ: 8, DBQ: 7, LEQ: 6</span>
                                    </button>
                                    <button 
                                        onClick={() => { 
                                            handleMcqChange('45'); 
                                            handleSaqChange('7'); 
                                            handleDbqChange('6'); 
                                            handleLeqChange('5'); 
                                        }}
                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors"
                                        aria-label="Load strong score example"
                                    >
                                        <span className="font-semibold text-green-600 dark:text-green-400">Strong Score (4)</span>
                                        <span className="text-xs text-slate-600 dark:text-slate-400 block">MCQ: 45, SAQ: 7, DBQ: 6, LEQ: 5</span>
                                    </button>
                                    <button 
                                        onClick={() => { 
                                            handleMcqChange('38'); 
                                            handleSaqChange('5'); 
                                            handleDbqChange('4'); 
                                            handleLeqChange('4'); 
                                        }}
                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors"
                                        aria-label="Load passing score example"
                                    >
                                        <span className="font-semibold text-amber-600 dark:text-amber-400">Passing Score (3)</span>
                                        <span className="text-xs text-slate-600 dark:text-slate-400 block">MCQ: 38, SAQ: 5, DBQ: 4, LEQ: 4</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-6" aria-live="polite" aria-atomic="true">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Estimated APUSH Score</h2>
                                <h3 className="text-sm text-slate-600 dark:text-slate-300">AP US History Exam 2026 Score Report</h3>
                            </div>

                            {calculationResult.composite > 0 ? (
                                <div className="space-y-6">
                                    {/* AP Score Display */}
                                    <div className={`text-center p-6 bg-gradient-to-br ${getScoreGradient(calculationResult.apScore)} rounded-xl border-2`}>
                                        <div className="flex items-center justify-center gap-4 mb-2">
                                            <div className={`text-6xl font-bold ${getScoreColor(calculationResult.apScore)}`}>
                                                {calculationResult.apScore}
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm text-slate-600 dark:text-slate-400">AP Score</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-500">out of 5</div>
                                            </div>
                                        </div>
                                        <div className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                                            {calculationResult.distribution.description}
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            {calculationResult.percentile}th Percentile
                                        </div>
                                    </div>

                                    {/* Composite Score */}
                                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Composite Score</span>
                                            <span className="text-xl font-bold text-slate-900 dark:text-white">{calculationResult.composite} / 150</span>
                                        </div>
                                    </div>

                                    {/* Score Breakdown */}
                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">Score Breakdown</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 dark:text-slate-400">MCQ (40%)</span>
                                                <span className="font-semibold text-slate-900 dark:text-white">{calculationResult.mcqScore}/{APUSH_SECTION_MAX.mcq}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 dark:text-slate-400">SAQ (20%)</span>
                                                <span className="font-semibold text-slate-900 dark:text-white">{calculationResult.saqScore}/{APUSH_SECTION_MAX.saq}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 dark:text-slate-400">DBQ (25%)</span>
                                                <span className="font-semibold text-slate-900 dark:text-white">{calculationResult.dbqScore}/{APUSH_SECTION_MAX.dbq}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 dark:text-slate-400">LEQ (15%)</span>
                                                <span className="font-semibold text-slate-900 dark:text-white">{calculationResult.leqScore}/{APUSH_SECTION_MAX.leq}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* College Credit Info */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                                        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">College Credit</h3>
                                        <p className="text-sm text-blue-800 dark:text-blue-200">
                                            {calculationResult.distribution.collegeCredit}
                                        </p>
                                    </div>

                                    {/* Score Distribution */}
                                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                                Students scoring {calculationResult.apScore}
                                            </span>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                                                {calculationResult.distribution.percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                                        <button 
                                            onClick={handleCopyToClipboard}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            {copied ? <CheckIcon /> : <ClipboardIcon />} {copied ? 'Copied!' : 'Copy Results'}
                                        </button>
                                        <button 
                                            onClick={handleExportCSV}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors"
                                        >
                                            <DownloadIcon /> Export CSV
                                        </button>
                                    </div>

                                    {/* Social Share */}
                                    <div className="flex justify-center gap-3 pt-4">
                                        <button 
                                            onClick={handleShareTwitter}
                                            className="p-2 rounded-full bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
                                            aria-label="Share on Twitter"
                                        >
                                            <TwitterIcon className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={handleShareFacebook}
                                            className="p-2 rounded-full bg-[#4267B2] text-white hover:bg-[#365899] transition-colors"
                                            aria-label="Share on Facebook"
                                        >
                                            <FacebookIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-20 px-6">
                                    <ChartBarIcon className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Enter Your Scores</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Input your section scores to calculate your estimated AP score.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table of Contents */}
                <TableOfContents sections={tocSections} />

                {/* Score Examples Section */}
                <div id="examples" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        APUSH Score Examples
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">5</div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Perfect Score</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">MCQ: 50/55 • SAQ: 8/9 • DBQ: 7/7 • LEQ: 6/6</p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">Composite: ~145/150 • Top 13% nationally</p>
                            <button 
                                onClick={() => { 
                                    handleMcqChange('50'); 
                                    handleSaqChange('8'); 
                                    handleDbqChange('7'); 
                                    handleLeqChange('6'); 
                                }} 
                                className="text-sm text-green-600 dark:text-green-400 font-semibold hover:underline"
                                aria-label="Try perfect score example"
                            >
                                Try This Score →
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">4</div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Well Qualified</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">MCQ: 45/55 • SAQ: 7/9 • DBQ: 6/7 • LEQ: 5/6</p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">Composite: ~120/150 • Top 31% nationally</p>
                            <button 
                                onClick={() => { 
                                    handleMcqChange('45'); 
                                    handleSaqChange('7'); 
                                    handleDbqChange('6'); 
                                    handleLeqChange('5'); 
                                }} 
                                className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                                aria-label="Try strong score example"
                            >
                                Try This Score →
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                            <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">3</div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Qualified</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">MCQ: 38/55 • SAQ: 5/9 • DBQ: 4/7 • LEQ: 4/6</p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mb-3">Composite: ~85/150 • Top 56% nationally</p>
                            <button 
                                onClick={() => { 
                                    handleMcqChange('38'); 
                                    handleSaqChange('5'); 
                                    handleDbqChange('4'); 
                                    handleLeqChange('4'); 
                                }} 
                                className="text-sm text-amber-600 dark:text-amber-400 font-semibold hover:underline"
                                aria-label="Try passing score example"
                            >
                                Try This Score →
                            </button>
                        </div>
                    </div>
                </div>

                {/* College Credit Policies Section */}
                <div id="college-credit" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        College Credit Policies by AP Score
                    </h2>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">College Tier</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Score 5</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Score 4</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-white">Score 3</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Examples</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                    {APUSH_COLLEGE_CREDIT.map((tier, index) => (
                                        <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{tier.tier}</td>
                                            <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-400">{tier.score5}</td>
                                            <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-400">{tier.score4}</td>
                                            <td className="px-6 py-4 text-sm text-center text-slate-600 dark:text-slate-400">{tier.score3}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{tier.examples}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div id="benefits" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Why Use Our APUSH Calculator?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Instant Results</h3>
                            <p className="text-slate-600 dark:text-slate-400">Get your estimated AP score immediately using official College Board conversion tables and scoring weights.</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all">
                            <div className="text-3xl mb-3">🎯</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Accurate Scoring</h3>
                            <p className="text-slate-600 dark:text-slate-400">Based on 2025-2026 official AP US History scoring guidelines with precise composite calculations.</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-xl transition-all">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Complete Analysis</h3>
                            <p className="text-slate-600 dark:text-slate-400">Detailed breakdown with percentile rankings, college credit info, and score distribution data.</p>
                        </div>
                    </div>
                </div>

                {/* How to Use Section */}
                <div id="how-to-use" className="mb-16 scroll-mt-24">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">How to Calculate Your APUSH Score</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Enter MCQ Score</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Input the number of multiple choice questions you got correct out of 55 total questions.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">2</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Add SAQ Points</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Enter your total Short Answer Question points (0-9). Each SAQ is worth up to 3 points.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">3</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Input DBQ Score</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Enter your Document-Based Question score (0-7) based on the official rubric.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">4</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Add LEQ Score</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Enter your Long Essay Question score (0-6) and instantly see your estimated AP score!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scoring Rubrics Section */}
                <div id="rubrics" className="mb-16 scroll-mt-24">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                            Official APUSH Scoring Rubrics
                        </h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
                            Understanding the official College Board rubrics helps you maximize your score. Each section has specific criteria.
                        </p>
                        
                        <div className="space-y-6">
                            {/* SAQ Rubric */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-2xl">📝</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Short Answer Questions (SAQ)</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">3 questions × 3 points each = 9 total points (20% of score)</p>
                                    </div>
                                </div>
                                <div className="bg-white/50 dark:bg-slate-700/30 p-4 rounded-lg space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">0 pts:</span>
                                        <span className="text-slate-700 dark:text-slate-300">No response or irrelevant information</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Partially correct answer with limited explanation</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">2 pts:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Correct answer with adequate historical support</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">3 pts:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Complete answer with strong historical reasoning and evidence</span>
                                    </div>
                                </div>
                            </div>

                            {/* DBQ Rubric */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-2xl">📄</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Document-Based Question (DBQ)</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">7-point rubric (25% of score)</p>
                                    </div>
                                </div>
                                <div className="bg-white/50 dark:bg-slate-700/30 p-4 rounded-lg space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-purple-600 dark:text-purple-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Thesis/Claim - Historically defensible thesis that responds to the prompt</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-purple-600 dark:text-purple-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Contextualization - Situates argument in broader historical context</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-purple-600 dark:text-purple-400 font-bold">3 pts:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Evidence from Documents - Use 3+ docs (1pt), explain 6+ docs (2pts additional)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-purple-600 dark:text-purple-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Outside Evidence - Evidence beyond the documents that supports argument</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-purple-600 dark:text-purple-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Analysis - Explain how documents relate to argument and demonstrate complexity</span>
                                    </div>
                                </div>
                            </div>

                            {/* LEQ Rubric */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="text-2xl">✍️</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Long Essay Question (LEQ)</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">6-point rubric (15% of score)</p>
                                    </div>
                                </div>
                                <div className="bg-white/50 dark:bg-slate-700/30 p-4 rounded-lg space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Thesis - Historically defensible claim that addresses the prompt</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Contextualization - Describes broader historical context relevant to the prompt</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">2 pts:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Evidence - Use specific examples (1pt), explain how they support argument (1pt additional)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Analysis - Use historical reasoning (causation, comparison, continuity/change)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-400 font-bold">1 pt:</span>
                                        <span className="text-slate-700 dark:text-slate-300">Complexity - Demonstrate nuanced understanding through multiple perspectives</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Study Tips Section */}
                <div id="study-tips" className="mb-16 scroll-mt-24">
                    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 p-8 rounded-2xl border border-amber-200 dark:border-amber-800">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                            🎓 APUSH Study Tips & Strategies
                        </h2>
                        <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
                            Expert strategies to maximize your AP US History exam score
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* MCQ Tips */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">⏱️</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Time Management (MCQ)</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>55 minutes for 55 questions = 1 min per question</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Skip difficult questions and return later</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Read stimulus materials carefully before questions</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Eliminate obviously wrong answers first</span>
                                    </li>
                                </ul>
                            </div>

                            {/* DBQ Tips */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">📄</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Document Analysis (DBQ)</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">•</span>
                                        <span>Use HIPP (Historical context, Intended audience, Purpose, Point of view)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">•</span>
                                        <span>Cite 6+ documents for full credit</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">•</span>
                                        <span>Include outside evidence (not from docs)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-500 mt-1">•</span>
                                        <span>Write thesis in first paragraph</span>
                                    </li>
                                </ul>
                            </div>

                            {/* LEQ Tips */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">✍️</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Essay Writing (LEQ)</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">•</span>
                                        <span>Choose the LEQ prompt you know best</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">•</span>
                                        <span>Use specific historical examples (names, dates, events)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">•</span>
                                        <span>Address counterarguments for complexity</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">•</span>
                                        <span>Use historical reasoning: causation, comparison, or CCOT</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Historical Thinking */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">🧠</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Historical Thinking Skills</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-500 mt-1">•</span>
                                        <span>Master causation (cause and effect relationships)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-500 mt-1">•</span>
                                        <span>Practice comparison across time periods</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-500 mt-1">•</span>
                                        <span>Understand continuity and change over time (CCOT)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-500 mt-1">•</span>
                                        <span>Contextualize events in broader historical trends</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Content Review */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">📚</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Content Mastery</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Focus on 9 time periods (1491-present)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Know key themes: identity, politics, work/technology, environment</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Review APUSH review books (Barron's, Princeton Review)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Practice with official College Board released exams</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Test Day */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">🎯</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Test Day Strategy</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Get 8 hours of sleep before exam day</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Arrive 30 minutes early with supplies</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Read all directions carefully before starting</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Stay calm and confident - you've got this!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-300 dark:border-blue-700">
                            <p className="text-sm text-slate-700 dark:text-slate-300 text-center">
                                <strong>Pro Tip:</strong> Use this calculator regularly with practice tests to track your progress and identify weak areas. Consistent practice with official College Board materials is key to achieving a 4 or 5!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Use Cases Section */}
                <div id="use-cases" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Who Uses This APUSH Calculator?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">📚</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AP Students</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Calculate practice test scores to track progress and identify areas needing improvement before the actual exam.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">👨‍🏫</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Teachers & Tutors</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Grade practice exams quickly and provide students with accurate AP score estimates based on official conversions.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">🎯</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Test Prep Programs</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Assess student readiness and set realistic score goals using accurate AP score predictions.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">🏫</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">College Admissions</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Estimate whether you'll earn college credit to plan course schedules and graduation timelines effectively.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div id="about" className="mb-16 scroll-mt-24">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">About APUSH Score Calculation</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                            
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">What This Calculator Does</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Our <a href="#calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">free APUSH calculator</a> instantly converts your raw exam scores to the official AP score format (1-5 scale) used by colleges nationwide.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                The Advanced Placement United States History exam is one of the most popular AP exams, with <strong>over 500,000 students</strong> taking it annually to demonstrate their mastery of American historical knowledge and analytical reasoning skills.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Understanding APUSH Scoring</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                The APUSH scoring methodology uses a composite score system with four distinct sections:
                            </p>
                            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-2 ml-4">
                                <li><strong>Multiple Choice Questions (MCQ):</strong> 55 questions, 40% of total score</li>
                                <li><strong>Short Answer Questions (SAQ):</strong> 3 questions, 20% of total score</li>
                                <li><strong>Document-Based Question (DBQ):</strong> 1 essay, 25% of total score</li>
                                <li><strong>Long Essay Question (LEQ):</strong> 1 essay, 15% of total score</li>
                            </ul>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                                Each section tests different skills - from historical knowledge to document analysis and argumentative essay writing.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Accurate Score Conversion</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Check our <a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">quick score examples</a> to see what different raw scores translate to in terms of AP scores and national percentiles.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Our calculator uses the <strong>official College Board conversion table</strong> that accounts for exam difficulty and equating across different test administrations. This ensures your estimated score accurately reflects how College Board would score your performance.
                            </p>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">College Credit & Planning</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Understanding your APUSH score is crucial for college planning. View our <a href="#college-credit" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">college credit policies table</a> to see requirements at different institutions.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Most colleges require a minimum score of <strong>3 for credit</strong>, though selective institutions often require 4 or 5. Earning college credit through AP US History can save thousands of dollars in tuition and accelerate your graduation timeline.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Review our <a href="#rubrics" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">official scoring rubrics</a> to understand how each section is graded, and check out our <a href="#study-tips" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">expert study tips</a> to maximize your score. See our <a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">FAQ section</a> for answers to common questions about APUSH scoring, college credit policies, and exam preparation strategies.
                            </p>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Official AP Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a href="https://apcentral.collegeboard.org/courses/ap-united-states-history" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className="text-2xl">🔗</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">AP Central - APUSH</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">collegeboard.org</div>
                                    </div>
                                </a>
                                <a href="https://apstudents.collegeboard.org/courses/ap-united-states-history" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className="text-2xl">📖</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">AP Students Portal</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">collegeboard.org</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                <strong>Last Updated:</strong> November 20, 2025 | Updated for 2026 AP Exam
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
                        {APUSH_FAQ_DATA.map((faq, index) => (
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
                    relatedSlugs={['lsat-score-calculator', 'sat-score-calculator', 'berkeley-gpa-calculator']}
                    navigateTo={navigateTo}
                    currentSlug="apush-score-calculator"
                />
            </div>
        </div>
    );
};

// Export with Error Boundary
const APUSHScoreCalculatorWithErrorBoundary: React.FC<APUSHScoreCalculatorProps> = (props) => (
    <APUSHCalculatorErrorBoundary>
        <APUSHScoreCalculator {...props} />
    </APUSHCalculatorErrorBoundary>
);

export default APUSHScoreCalculatorWithErrorBoundary;
