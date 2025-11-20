/**
 * ZURAWEBTOOLS TOOL TEMPLATE
 * 
 * Complete template for creating new tools with:
 * - Error Boundary for production safety
 * - Full SEO optimization (95+ score)
 * - 13-section standardized layout
 * - Accessibility features (ARIA labels, semantic HTML)
 * - Dark mode support
 * - Responsive design (max-w-5xl)
 * - Internal linking
 * - Schema.org structured data
 * - Social sharing
 * - Export functionality
 * 
 * INSTRUCTIONS:
 * 1. Copy this template
 * 2. Replace all [TOOL_NAME] placeholders with your tool name (e.g., "LSAT Score Calculator")
 * 3. Replace all [TOOL_SLUG] with URL-friendly slug (e.g., "lsat-score-calculator")
 * 4. Replace all [TOOL_DESCRIPTION] with tool description
 * 5. Replace all [CATEGORY] with category name (e.g., "Education & Exam Tools")
 * 6. Implement your tool logic in the marked sections
 * 7. Update constants.ts with tool-specific data
 * 8. Register in data/tools.tsx
 * 9. Add route in App.tsx
 */

import React, { useState, useMemo, useCallback, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import TableOfContents, { TOCSection } from './components/TableOfContents';
import RelatedTools from './components/RelatedTools';
import { Page } from './App';

// ============================================================================
// ERROR BOUNDARY COMPONENT (Keep as-is)
// ============================================================================
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ToolErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[TOOL_NAME] Error:', error, errorInfo);
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
                        <p className="text-slate-600 dark:text-slate-400 mb-6">We're sorry, but the tool encountered an error. Please refresh the page to try again.</p>
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

// ============================================================================
// ICON COMPONENTS (Add your custom icons here)
// ============================================================================
const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Checkmark icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const ClipboardIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Copy to clipboard icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const DownloadIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Download icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const TwitterIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share on Twitter icon"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.93 4.93 0 004.6 3.42 9.86 9.86 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>;
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share on Facebook icon"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const ChevronDownIcon = ({ className = "w-5 h-5 transition-transform duration-300 group-open:rotate-180" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-label="Expand dropdown icon"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;

// ============================================================================
// MAIN COMPONENT INTERFACE
// ============================================================================
interface ToolNameProps {
    navigateTo: (page: Page) => void;
}

const ToolName: React.FC<ToolNameProps> = ({ navigateTo }) => {
    // ========================================================================
    // STATE MANAGEMENT (Customize for your tool)
    // ========================================================================
    const [inputValue, setInputValue] = useState<string>('');
    const [result, setResult] = useState<any>(null);
    const [copied, setCopied] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('darkMode');
            return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    // ========================================================================
    // COMPUTATION LOGIC (Replace with your tool's logic)
    // ========================================================================
    const calculatedResult = useMemo(() => {
        // TODO: Implement your calculation/processing logic
        if (!inputValue) return null;
        
        // Example: Replace with actual logic
        return {
            output: inputValue.toUpperCase(),
            metadata: {
                length: inputValue.length,
                // Add more metadata as needed
            }
        };
    }, [inputValue]);

    // ========================================================================
    // DARK MODE HANDLER
    // ========================================================================
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // ========================================================================
    // UTILITY FUNCTIONS
    // ========================================================================
    const handleCopyToClipboard = useCallback(() => {
        if (!calculatedResult) return;
        
        const text = `[TOOL_NAME] Results\n\nOutput: ${calculatedResult.output}`;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [calculatedResult]);

    const handleExportCSV = useCallback(() => {
        if (!calculatedResult) return;
        
        const headers = "\"Category\",\"Value\"\n";
        const rows = [
            `\"Input\",\"${inputValue}\"`,
            `\"Output\",\"${calculatedResult.output}\"`,
            `\"Generated\",\"${new Date().toLocaleString()}\"`
        ];
        const csv = headers + rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `[TOOL_SLUG]-results-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }, [calculatedResult, inputValue]);

    const handleShareTwitter = useCallback(() => {
        const text = `I just used the [TOOL_NAME] on ZuraWebTools! Check it out:`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/[CATEGORY]/[TOOL_SLUG]')}`;
        window.open(url, '_blank');
    }, []);

    const handleShareFacebook = useCallback(() => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/[CATEGORY]/[TOOL_SLUG]')}`;
        window.open(url, '_blank');
    }, []);

    // ========================================================================
    // SEO META TAGS SETUP (Customize all placeholders)
    // ========================================================================
    useEffect(() => {
        document.title = "[TOOL_NAME] 2025 - [TOOL_DESCRIPTION] | ZuraWebTools";
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
        setMeta('description', "[TOOL_DESCRIPTION] - Free online tool. [Add key features and benefits in 155-160 characters]");
        setMeta('keywords', "[primary keyword], [secondary keyword], [tool name], [category], [related terms]");
        setMeta('author', 'ZuraWebTools');
        setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        setLink('canonical', 'https://zurawebtools.com/[CATEGORY]/[TOOL_SLUG]');

        // Open Graph Meta Tags
        setMeta('og:title', '[TOOL_NAME] 2025 - [TOOL_DESCRIPTION]', true);
        setMeta('og:description', '[Compelling description for social sharing - 120-150 characters]', true);
        setMeta('og:type', 'website', true);
        setMeta('og:url', 'https://zurawebtools.com/[CATEGORY]/[TOOL_SLUG]', true);
        setMeta('og:locale', 'en_US', true);
        setMeta('og:site_name', 'ZuraWebTools', true);
        setMeta('og:image', 'https://zurawebtools.com/images/[TOOL_SLUG]-preview.jpg', true);
        setMeta('og:image:alt', '[TOOL_NAME] Interface - [Year]', true);

        // Twitter Card Meta Tags
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', '[TOOL_NAME] 2025 - [TOOL_DESCRIPTION]');
        setMeta('twitter:description', '[Compelling description for Twitter - 120-150 characters]');
        setMeta('twitter:image', 'https://zurawebtools.com/images/[TOOL_SLUG]-preview.jpg');
        setMeta('twitter:site', '@ZuraWebTools');

        // Schema.org JSON-LD
        const jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        jsonLdScript.id = 'json-ld-[TOOL_SLUG]';
        
        // TODO: Add FAQ data if applicable
        const faqJsonLd: any[] = []; // Replace with actual FAQ items

        jsonLdScript.innerHTML = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "[TOOL_NAME]",
                "applicationCategory": "UtilityApplication",
                "applicationSubCategory": "[Tool Category]",
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
                "description": "[TOOL_DESCRIPTION]",
                "url": "https://zurawebtools.com/[CATEGORY]/[TOOL_SLUG]"
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
                        "name": "[CATEGORY]",
                        "item": "https://zurawebtools.com/[CATEGORY]"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "[TOOL_NAME]",
                        "item": "https://zurawebtools.com/[CATEGORY]/[TOOL_SLUG]"
                    }
                ]
            },
            ...(faqJsonLd.length > 0 ? [{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqJsonLd
            }] : [])
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
            document.getElementById('json-ld-[TOOL_SLUG]')?.remove();
        };
    }, []);

    // ========================================================================
    // TABLE OF CONTENTS CONFIGURATION
    // ========================================================================
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
            subtitle: 'Tool details',
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

    // ========================================================================
    // RENDER
    // ========================================================================
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                {/* ============================================================
                    DARK MODE TOGGLE BUTTON (Fixed Position)
                    ============================================================ */}
                <button
                    onClick={toggleDarkMode}
                    className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
                    aria-label="Toggle dark mode"
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

                {/* ============================================================
                    SECTION 1: HERO SECTION
                    ============================================================ */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        [TOOL_NAME] 2025
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        [Tool description - 1-2 sentences explaining what the tool does and its key benefits]
                    </p>
                </div>

                {/* ============================================================
                    SECTION 2: MAIN TOOL INTERFACE
                    ============================================================ */}
                <div id="calculator" className="mb-16 scroll-mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* LEFT SIDE: INPUT SECTION */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                                    Input Section
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                    [Instructions for using the tool]
                                </p>
                                
                                {/* TODO: Add your input fields here */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Input Label
                                        </label>
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="w-full px-4 py-3 text-lg font-semibold text-center border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                            placeholder="Enter value..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* QUICK EXAMPLES */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-700/50 p-6 rounded-2xl border border-blue-200 dark:border-slate-600">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Examples</h3>
                                <div className="space-y-2">
                                    {/* TODO: Add example buttons */}
                                    <button onClick={() => setInputValue('Example 1')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-600/50 transition-colors">
                                        <span className="font-semibold text-blue-600 dark:text-blue-400">Example 1</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: RESULTS SECTION */}
                        <div className="lg:col-span-3 bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-6" aria-live="polite" aria-atomic="true">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Results</h2>
                                <h3 className="text-sm text-slate-600 dark:text-slate-300">[Tool Name] Output</h3>
                            </div>

                            {calculatedResult ? (
                                <div className="space-y-6">
                                    {/* TODO: Display your results here */}
                                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/50">
                                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            {calculatedResult.output}
                                        </div>
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                                        <button onClick={handleCopyToClipboard} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors">
                                            {copied ? <CheckIcon /> : <ClipboardIcon />} {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                        <button onClick={handleExportCSV} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors">
                                            <DownloadIcon /> Export CSV
                                        </button>
                                    </div>

                                    {/* SOCIAL SHARE */}
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
                                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Enter Input Above</h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your results will appear here instantly.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 3: TABLE OF CONTENTS
                    ============================================================ */}
                <TableOfContents sections={tocSections} />

                {/* ============================================================
                    SECTION 4: QUICK EXAMPLES
                    ============================================================ */}
                <div id="examples" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        [TOOL_NAME] Examples
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* TODO: Add 3 example cards */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">Example 1</div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Title</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Description of example</p>
                            <button onClick={() => setInputValue('Example')} className="text-sm text-green-600 dark:text-green-400 font-semibold hover:underline">Try This →</button>
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 5: BENEFITS
                    ============================================================ */}
                <div id="benefits" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Why Use [TOOL_NAME]?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* TODO: Add 3 benefit cards */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Benefit 1</h3>
                            <p className="text-slate-600 dark:text-slate-400">Description of benefit</p>
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 6: HOW TO USE
                    ============================================================ */}
                <div id="how-to-use" className="mb-16 scroll-mt-24">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">How to Use [TOOL_NAME]</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* TODO: Add 4 steps */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Step 1</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 7: USE CASES
                    ============================================================ */}
                <div id="use-cases" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Who Uses [TOOL_NAME]?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* TODO: Add 4 use case cards */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">👨‍💼</div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">User Type 1</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Description of use case</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 8: ABOUT (300-400 WORDS WITH INTERNAL LINKS)
                    ============================================================ */}
                <div id="about" className="mb-16 scroll-mt-24">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">About [TOOL_NAME]</h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            {/* TODO: Write 300-400 word description with:
                                - Tool overview and purpose
                                - Key features and benefits
                                - How it works (technical details)
                                - Industry/use case context
                                - LSI keywords naturally integrated
                                - Internal links to other sections (#calculator, #examples, #benefits, etc.)
                            */}
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                [First paragraph introducing the tool and its purpose. Include primary keywords naturally. Add internal link to <a href="#calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">the calculator</a>.]
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                [Second paragraph explaining how it works. Include technical details and LSI keywords. Link to <a href="#examples" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">examples</a>.]
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">
                                [Third paragraph covering key features and benefits. Link to <a href="#benefits" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">benefits section</a>.]
                            </p>
                            <p className="text-slate-600 dark:text-slate-400">
                                [Fourth paragraph with use cases and target audience. Link to <a href="#use-cases" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">use cases</a> and <a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">FAQ section</a>.]
                            </p>
                        </div>
                        
                        {/* EXTERNAL AUTHORITY LINKS (Optional) */}
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Official Resources</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* TODO: Add relevant external links */}
                                <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <span className="text-2xl">🔗</span>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">Resource Name</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">example.com</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* LAST UPDATED */}
                        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                <strong>Last Updated:</strong> November 20, 2025 | Updated for 2025
                            </p>
                        </div>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 9: FAQ
                    ============================================================ */}
                <div id="faq" className="mb-16 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center bg-gradient-to-r from-[#001BB7] to-[#60A5FA] bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {/* TODO: Add 5-7 FAQ items */}
                        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-all">
                            <summary className="flex justify-between items-center cursor-pointer px-6 py-4 text-lg font-semibold text-slate-900 dark:text-white list-none">
                                <span>Question 1?</span>
                                <ChevronDownIcon />
                            </summary>
                            <div className="px-6 pb-4 text-slate-600 dark:text-slate-400">
                                Answer to question 1
                            </div>
                        </details>
                    </div>
                </div>

                {/* ============================================================
                    SECTION 10: RELATED TOOLS
                    ============================================================ */}
                <RelatedTools 
                    relatedSlugs={['tool-1-slug', 'tool-2-slug', 'tool-3-slug']}
                    navigateTo={navigateTo}
                    currentSlug="[TOOL_SLUG]"
                />
            </div>
        </div>
    );
};

// ============================================================================
// EXPORT WITH ERROR BOUNDARY
// ============================================================================
const ToolNameWithErrorBoundary: React.FC<ToolNameProps> = (props) => (
    <ToolErrorBoundary>
        <ToolName {...props} />
    </ToolErrorBoundary>
);

export default ToolNameWithErrorBoundary;
