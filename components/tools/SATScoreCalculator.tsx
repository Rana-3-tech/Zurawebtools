import React, { useState, useMemo, useCallback, useEffect, Fragment, Component, ErrorInfo, ReactNode } from 'react';
import type { ScoreState, ScaledScores, TestMode, Difficulty, Preset, FAQItem, ConversionTable } from '../types';
import { MAX_RAW_SCORES, PAPER_RW_CONVERSION, PAPER_MATH_CONVERSION, DIGITAL_RW_CONVERSION, DIGITAL_MATH_CONVERSION, SAT_TO_ACT_CONCORDANCE, SAT_PERCENTILES, FAQ_DATA } from '../constants';
import TableOfContents, { TOCSection } from '../TableOfContents';

// --- Error Boundary Component ---
interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class SATCalculatorErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('SAT Calculator Error:', error, errorInfo);
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
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 text-left">
                                <summary className="text-sm text-slate-500 cursor-pointer hover:text-slate-700">Error Details</summary>
                                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto max-h-40 bg-slate-50 dark:bg-slate-900 p-2 rounded">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// --- Helper Functions ---
const getClosestValue = (table: Record<number, number>, value: number): number => {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  if (keys.length === 0) return 200; // fallback
  
  const closestKey = keys.reduce((prev, curr) => 
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
  return table[closestKey];
};

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

// --- SVG Icons (Moved outside component) ---
const CheckIcon = ({ className = "h-4 w-4" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="SAT score validation checkmark icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const ClipboardIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Copy SAT score results to clipboard icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const DownloadIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="Download SAT score report CSV icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const UserIcon = ({ className = "h-5 w-5" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="SAT test taker student profile icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const ChartBarIcon = ({ className = "w-12 h-12" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-label="SAT percentile ranking chart icon"><path d="M11.5 6.25a.75.75 0 01.75.75v8.5a.75.75 0 01-1.5 0v-8.5a.75.75 0 01.75-.75zM8 8.25a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 018 8.25zM4.5 10.25a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5a.75.75 0 01.75-.75zM15 4.25a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V5a.75.75 0 01.75-.75z" /></svg>;
const ChevronDownIcon = ({ className = "w-5 h-5 transition-transform duration-300 group-open:rotate-180" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-label="Expand SAT score details dropdown icon"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;
const TwitterIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share SAT score on Twitter icon"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.93 4.93 0 004.6 3.42 9.86 9.86 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>;
const FacebookIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share SAT score on Facebook icon"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>;
const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Share SAT score on WhatsApp icon"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.78.46 3.45 1.28 4.95L2 22l5.25-1.38c1.45.77 3.06 1.18 4.79 1.18h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.4 12.01c-.18.43-1.01.8-1.39.84-.38.04-1.01.03-1.56-.29-.55-.32-1.37-.88-2.52-2.03-1.15-1.15-1.88-2.12-2.12-2.52-.24-.4-.01-.63.18-.82.19-.19.4-.5.59-.69.19-.19.26-.32.18-.5s-.83-1.99-1.14-2.73c-.31-.74-.63-.64-.87-.64-.24 0-.5.09-.69.28-.19.19-.73.71-.93 1.25-.2.54-.39 1.27.09 2.11.48.84 1.52 2.53 3.69 4.7 2.17 2.17 3.19 2.59 3.86 2.78.67.19 1.27.16 1.75-.12.48-.28 1.02-1.27 1.16-1.75.14-.48.14-.9.09-1.01s-.18-.19-.36-.37z" /></svg>;
const PercentageIcon = ({ className = "w-8 h-8" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="SAT percentile calculator icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4H8C6.9 4 6 4.9 6 6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V6C18 4.9 17.1 4 16 4ZM8.5 7.5C9.33 7.5 10 8.17 10 9C10 9.83 9.33 10.5 8.5 10.5C7.67 10.5 7 9.83 7 9C7 8.17 7.67 7.5 8.5 7.5ZM15.5 16.5C14.67 16.5 14 15.83 14 15C14 14.17 14.67 13.5 15.5 13.5C16.33 13.5 17 14.17 17 15C17 15.83 16.33 16.5 15.5 16.5ZM16 12H8V10L16 6V8H8V10H16V12Z" /></svg>;
const TimeDiffIcon = ({ className = "w-8 h-8" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="SAT test time calculator icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" /></svg>;
const FabricIcon = ({ className = "w-8 h-8" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-label="SAT score layers visualization icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17L12 12L2 17ZM2 12L12 17L22 12L12 7L2 12Z" /></svg>;


// --- InputField Component (Moved outside) ---
const InputField = ({ label, field, value, max, error, onChange }: { 
    label: string; 
    field: keyof ScoreState; 
    value: number | null; 
    max: number; 
    error?: string;
    onChange: (field: keyof ScoreState, value: string) => void;
}) => {
    const fieldStr = String(field);
    return (
        <div className="flex-1">
            <label htmlFor={fieldStr} className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
            <input
                type="number"
                id={fieldStr}
                name={fieldStr}
                value={value ?? ''}
                onChange={(e) => onChange(field, e.target.value)}
                placeholder={`e.g. ${Math.floor(max * 0.7)}`}
                min="0"
                max={max}
                className={`mt-1 block w-full rounded-md bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 focus:ring-opacity-50 transition duration-150 ease-in-out text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium text-lg px-4 py-2.5 ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}`}
            />
            {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};


const SATScoreCalculator: React.FC = () => {
    // --- State Management ---
    const [scores, setScores] = useState<ScoreState>({ readingWriting: null, mathNoCalc: null, mathCalc: null, mathCombined: null });

    // TOC sections configuration
    const tocSections: TOCSection[] = [
        {
            id: 'examples',
            emoji: '📝',
            title: 'Examples',
            subtitle: 'Try presets',
            gradientFrom: 'from-blue-50',
            gradientTo: 'to-indigo-50',
            hoverBorder: 'border-indigo-400',
            hoverText: 'text-indigo-600'
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
            id: 'about-sat',
            emoji: '📚',
            title: 'About SAT',
            subtitle: 'Understanding',
            gradientFrom: 'from-green-50',
            gradientTo: 'to-emerald-50',
            hoverBorder: 'border-green-400',
            hoverText: 'text-green-600'
        },
        {
            id: 'how-to-calculate',
            emoji: '🧮',
            title: 'How to Calculate',
            subtitle: 'Step-by-step',
            gradientFrom: 'from-orange-50',
            gradientTo: 'to-amber-50',
            hoverBorder: 'border-orange-400',
            hoverText: 'text-orange-600'
        },
        {
            id: 'score-ranges',
            emoji: '📊',
            title: 'Score Ranges',
            subtitle: 'What they mean',
            gradientFrom: 'from-cyan-50',
            gradientTo: 'to-blue-50',
            hoverBorder: 'border-cyan-400',
            hoverText: 'text-cyan-600'
        },
        {
            id: 'faq',
            emoji: '❓',
            title: 'FAQs',
            subtitle: 'Common questions',
            gradientFrom: 'from-violet-50',
            gradientTo: 'to-purple-50',
            hoverBorder: 'border-violet-400',
            hoverText: 'text-violet-600'
        }
    ];
    const [testMode, setTestMode] = useState<TestMode>('digital');
    const [difficulty, setDifficulty] = useState<Difficulty>('auto');
    const [isMathCombined, setIsMathCombined] = useState<boolean>(true);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const maxMathRaw = testMode === 'digital' ? MAX_RAW_SCORES.mathCombinedDigital : MAX_RAW_SCORES.mathCombinedPaper;

    // --- Memoized Calculations ---
    const calculationResult = useMemo<{ scores: ScaledScores; finalDifficulty: Difficulty } | null>(() => {
        const rwRaw = scores.readingWriting ?? -1;
        let mathRaw: number;

        if (isMathCombined) {
            mathRaw = scores.mathCombined ?? -1;
        } else {
            const noCalc = scores.mathNoCalc ?? -1;
            const calc = scores.mathCalc ?? -1;
            // Only consider invalid if both are null/unset
            mathRaw = (noCalc === -1 && calc === -1) ? -1 : Math.max(noCalc, 0) + Math.max(calc, 0);
        }

        if (rwRaw < 0 || mathRaw < 0) return null;

        let scaledRW: number;
        let scaledMath: number;
        let finalDifficulty: Difficulty = difficulty;

        if (testMode === 'digital') {
            if (difficulty === 'auto') {
                // Section-specific difficulty detection with equal weighting
                const rwPercentage = rwRaw / MAX_RAW_SCORES.readingWriting;
                const mathPercentage = mathRaw / MAX_RAW_SCORES.mathCombinedDigital;
                const overallPercentage = (rwPercentage + mathPercentage) / 2;
                
                if (overallPercentage >= 0.75) finalDifficulty = 'hard';
                else if (overallPercentage <= 0.35) finalDifficulty = 'easy';
                else finalDifficulty = 'normal';
            }
            scaledRW = DIGITAL_RW_CONVERSION[finalDifficulty as 'easy'|'normal'|'hard'][rwRaw] ?? 200;
            scaledMath = DIGITAL_MATH_CONVERSION[finalDifficulty as 'easy'|'normal'|'hard'][mathRaw] ?? 200;
        } else { // paper
            finalDifficulty = 'normal'; // Paper doesn't have difficulty
            scaledRW = PAPER_RW_CONVERSION[rwRaw] ?? 200;
            scaledMath = PAPER_MATH_CONVERSION[mathRaw] ?? 200;
        }

        return {
            scores: {
                readingWriting: scaledRW,
                math: scaledMath,
                total: scaledRW + scaledMath
            },
            finalDifficulty: finalDifficulty
        };
    }, [scores, testMode, difficulty, isMathCombined]);

    const percentile = useMemo(() => {
        if (!calculationResult) return null;
        return getClosestValue(SAT_PERCENTILES, calculationResult.scores.total);
    }, [calculationResult]);

    const actEquivalent = useMemo(() => {
        if (!calculationResult) return null;
        return getClosestValue(SAT_TO_ACT_CONCORDANCE, calculationResult.scores.total);
    }, [calculationResult]);
    
    // --- Event Handlers ---
    const handleInputChange = useCallback((field: keyof ScoreState, value: string) => {
        if (value === '') {
            setScores(prev => ({ ...prev, [field]: null }));
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field as string];
                return newErrors;
            });
            return;
        }
        
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;
        
        let maxVal;
        switch(field) {
            case 'readingWriting': maxVal = MAX_RAW_SCORES.readingWriting; break;
            case 'mathNoCalc': maxVal = MAX_RAW_SCORES.mathNoCalc; break;
            case 'mathCalc': maxVal = MAX_RAW_SCORES.mathCalc; break;
            case 'mathCombined': maxVal = maxMathRaw; break;
            default: maxVal = Infinity;
        }
    
        if (numValue < 0 || numValue > maxVal) {
            setErrors(prev => ({ ...prev, [field]: `Must be between 0 and ${maxVal}` }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field as string];
                return newErrors;
            });
            setScores(prev => ({ ...prev, [field]: numValue }));
        }
    }, [maxMathRaw]);

    const handleReset = useCallback(() => {
        setScores({ readingWriting: null, mathNoCalc: null, mathCalc: null, mathCombined: null });
        setErrors({});
        setTestMode('digital');
        setDifficulty('auto');
        setIsMathCombined(true);
    }, []);

    const handleApplyPreset = useCallback((preset: Preset) => {
        setTestMode('digital');
        setIsMathCombined(true);
        setDifficulty('auto');
        setErrors({});
        switch (preset) {
            case '1200':
                setScores({ readingWriting: 33, mathNoCalc: null, mathCalc: null, mathCombined: 25 });
                break;
            case '1400':
                setScores({ readingWriting: 45, mathNoCalc: null, mathCalc: null, mathCombined: 35 });
                break;
            case '1500':
                setScores({ readingWriting: 50, mathNoCalc: null, mathCalc: null, mathCombined: 40 });
                break;
        }
    }, []);
    
    const handleCopyToClipboard = useCallback(() => {
        if (!calculationResult) return;
        const resultText = `SAT Score Report\nMode: ${testMode.charAt(0).toUpperCase() + testMode.slice(1)}\n\nTotal Score: ${calculationResult.scores.total}\nReading & Writing: ${calculationResult.scores.readingWriting}\nMath: ${calculationResult.scores.math}\n\nEst. Percentile: ${percentile}th\nEst. ACT Equivalent: ${actEquivalent}`;
        navigator.clipboard.writeText(resultText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [calculationResult, percentile, actEquivalent, testMode]);
    
    const handleExportCSV = useCallback(() => {
        if (!calculationResult) return;
        const headers = "\"Category\",\"Score\"\n";
        const rows = [
            `\"Test Mode\",\"${testMode.charAt(0).toUpperCase() + testMode.slice(1)}\"`,
            `\"Total Score\",\"${calculationResult.scores.total}\"`,
            `\"Reading & Writing Score\",\"${calculationResult.scores.readingWriting}\"`,
            `\"Math Score\",\"${calculationResult.scores.math}\"`,
            `\"Estimated Percentile\",\"${percentile}%\"`,
            `\"Estimated ACT Equivalent\",\"${actEquivalent}\"`,
            `\"Difficulty Level\",\"${calculationResult.finalDifficulty}\"`,
            `\"Raw R&W Score\",\"${scores.readingWriting ?? 'N/A'}\"`,
            `\"Raw Math Score\",\"${isMathCombined ? (scores.mathCombined ?? 'N/A') : ((scores.mathNoCalc ?? 0) + (scores.mathCalc ?? 0))}\"`,
            `\"Generated\",\"${new Date().toLocaleString()}\"` 
        ];
        const csvContent = "data:text/csv;charset=utf-8," + headers + rows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `sat_score_report_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [calculationResult, percentile, actEquivalent, testMode, scores, isMathCombined]);
    
    const getShareUrl = useCallback((platform: 'twitter' | 'facebook' | 'whatsapp') => {
        if (!calculationResult) return '#';
        const url = 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator';
        const text = `I just estimated my SAT score using the ZuraWebTools calculator! My estimated score is ${calculationResult.scores.total}. Check it out:`;
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(url);

        switch (platform) {
            case 'twitter':
                return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            case 'whatsapp':
                return `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        }
    }, [calculationResult]);

    // --- Side Effects for SEO and JSON-LD ---
    useEffect(() => {
        document.title = "SAT Score Calculator 2026 - Digital SAT Converter";
        
        // Set HTML lang attribute
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
        const metaDesc = setMeta('description', "Free SAT score calculator for Digital SAT 2025-2026. Convert raw scores to scaled (200-800) instantly. Get percentiles, ACT equivalents & downloadable reports.");
        const metaKeywords = setMeta('keywords', "SAT score calculator, digital SAT 2024, raw to scaled score converter, SAT percentile calculator, ACT to SAT conversion, SAT score estimator, college entrance exam calculator, standardized test scores");
        const metaAuthor = setMeta('author', 'ZuraWebTools');
        const metaRobots = setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
        const canonicalLink = setLink('canonical', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator');
        
        // Open Graph Meta Tags
        const ogTitle = setMeta('og:title', 'Free SAT Score Calculator 2025-2026 - Digital SAT Converter', true);
        const ogDesc = setMeta('og:description', 'Calculate your SAT score instantly! Convert raw scores to scaled scores (200-800), get percentile rankings, ACT equivalents, and detailed score reports for Digital SAT 2025-2026.', true);
        const ogType = setMeta('og:type', 'website', true);
        const ogUrl = setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator', true);
        const ogLocale = setMeta('og:locale', 'en_US', true);
        const ogSiteName = setMeta('og:site_name', 'ZuraWebTools', true);
        const ogImage = setMeta('og:image', 'https://zurawebtools.com/images/sat-calculator-preview.jpg', true);
        const ogImageAlt = setMeta('og:image:alt', 'SAT Score Calculator Interface - Digital SAT 2025-2026', true);
        
        // Twitter Card Meta Tags
        const twitterCard = setMeta('twitter:card', 'summary_large_image');
        const twitterTitle = setMeta('twitter:title', 'Free SAT Score Calculator 2025-2026 - Digital SAT Converter');
        const twitterDesc = setMeta('twitter:description', 'Calculate your SAT score instantly! Convert raw scores to scaled scores, get percentiles & ACT equivalents. Free online tool for Digital SAT 2025-2026.');
        const twitterImage = setMeta('twitter:image', 'https://zurawebtools.com/images/sat-calculator-preview.jpg');
        const twitterSite = setMeta('twitter:site', '@ZuraWebTools');
        
        // Additional SEO Meta Tags
        const robots = setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        const googlebot = setMeta('googlebot', 'index, follow');
        const viewport = setMeta('viewport', 'width=device-width, initial-scale=1.0');
        const language = setMeta('language', 'English');
        const contentLanguage = setMeta('content-language', 'en-US');
        
        // Set HTML lang attribute
        document.documentElement.setAttribute('lang', 'en');

        
        const jsonLdScript = document.createElement('script');
        jsonLdScript.type = 'application/ld+json';
        jsonLdScript.id = 'json-ld-sat-calculator';
        const faqJsonLd = FAQ_DATA.map(item => ({
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
              "name": "SAT Score Calculator",
              "applicationCategory": "EducationApplication",
              "applicationSubCategory": "Exam Score Calculator",
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
                "url": "https://zurawebtools.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://zurawebtools.com/images/logo.png"
                },
                "sameAs": [
                  "https://twitter.com/ZuraWebTools",
                  "https://facebook.com/ZuraWebTools"
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
              },
              "description": "Free SAT Score Calculator for Digital SAT 2025–2026. Convert raw SAT answers to scaled scores instantly and get your total out of 1600 with percentile estimates.",
              "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator",
              "keywords": "SAT score calculator, digital SAT 2024, raw to scaled score converter, SAT percentile calculator, ACT to SAT conversion, SAT score estimator",
              "datePublished": "2024-01-15",
              "dateModified": "2024-11-08",
              "inLanguage": "en-US",
              "browserRequirements": "Requires JavaScript. Requires HTML5.",
              "softwareVersion": "2.0",
              "author": {
                "@type": "Organization",
                "name": "ZuraWebTools"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "SAT Score Calculator - Convert Raw to Scaled Scores",
              "description": "Free online SAT score calculator for Digital SAT 2025-2026. Instantly convert raw scores to scaled scores with percentile rankings and ACT equivalents.",
              "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator",
              "inLanguage": "en-US",
              "isPartOf": {
                "@type": "WebSite",
                "name": "ZuraWebTools",
                "url": "https://zurawebtools.com"
              },
              "about": {
                "@type": "Thing",
                "name": "SAT Test Preparation",
                "description": "Educational tool for SAT test score calculation and college admissions preparation"
              },
              "datePublished": "2024-01-15",
              "dateModified": "2024-11-08",
              "author": {
                "@type": "Organization",
                "name": "ZuraWebTools"
              }
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
                        "name": "Tools",
                        "item": "https://zurawebtools.com/tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Education & Exam Tools",
                        "item": "https://zurawebtools.com/education-and-exam-tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "SAT Score Calculator",
                        "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator"
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqJsonLd
            },
            {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to use the SAT Score Calculator",
                "description": "Learn how to calculate your SAT score from raw scores using our free online calculator",
                "image": "https://zurawebtools.com/images/sat-calculator-tutorial.jpg",
                "totalTime": "PT2M",
                "estimatedCost": {
                  "@type": "MonetaryAmount",
                  "currency": "USD",
                  "value": "0"
                },
                "tool": {
                  "@type": "HowToTool",
                  "name": "SAT Score Calculator by ZuraWebTools"
                },
                "step": [
                    { 
                      "@type": "HowToStep",
                      "position": 1,
                      "name": "Select Test Mode",
                      "text": "Choose between 'Digital SAT' and 'Paper SAT' based on the test you took.",
                      "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator#step1"
                    },
                    { 
                      "@type": "HowToStep",
                      "position": 2,
                      "name": "Enter Raw Scores",
                      "text": "Input the number of correct answers for the Reading & Writing and Math sections.",
                      "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator#step2"
                    },
                    { 
                      "@type": "HowToStep",
                      "position": 3,
                      "name": "Adjust Difficulty (Optional)",
                      "text": "For the Digital SAT, you can select a test difficulty or leave it on 'Auto' for an estimate.",
                      "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator#step3"
                    },
                    { 
                      "@type": "HowToStep",
                      "position": 4,
                      "name": "View Results",
                      "text": "Your scaled section scores, total score, estimated percentile, and ACT equivalent will be displayed instantly.",
                      "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator#step4"
                    }
                ]
            }
        ]);
        document.head.appendChild(jsonLdScript);

        return () => {
            document.title = 'ZuraWebTools'; // Or your default title
            if (metaDesc) metaDesc.remove();
            if (metaKeywords) metaKeywords.remove();
            if (metaAuthor) metaAuthor.remove();
            if (canonicalLink) canonicalLink.remove();
            if (ogTitle) ogTitle.remove();
            if (ogDesc) ogDesc.remove();
            if (ogType) ogType.remove();
            if (ogUrl) ogUrl.remove();
            if (ogSiteName) ogSiteName.remove();
            if (ogImage) ogImage.remove();
            if (ogImageAlt) ogImageAlt.remove();
            if (twitterCard) twitterCard.remove();
            if (twitterTitle) twitterTitle.remove();
            if (twitterDesc) twitterDesc.remove();
            if (twitterImage) twitterImage.remove();
            if (twitterSite) twitterSite.remove();
            if (robots) robots.remove();
            if (googlebot) googlebot.remove();
            if (viewport) viewport.remove();
            if (language) language.remove();
            if (contentLanguage) contentLanguage.remove();
            if (jsonLdScript) jsonLdScript.remove();
            document.documentElement.removeAttribute('lang');
        };
    }, []);

    // --- Render Functions ---
    const renderWhatIfSlider = (label: string, field: keyof ScoreState, value: number | null, max: number) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(field, e.target.value);
        };
        const fieldStr = String(field);

        return (
            <div className="space-y-2">
                <label htmlFor={`${fieldStr}-slider`} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                </label>
                <input
                    id={`${fieldStr}-slider`}
                    type="range"
                    min="0"
                    max={max}
                    value={value ?? 0}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-[#001BB7]"
                    disabled={calculationResult === null}
                />
                <div className="text-center font-semibold text-[#001BB7] dark:text-[#60A5FA]">{value ?? 0} / {max}</div>
            </div>
        );
    };

    // Helper function for score-based colors
    const getScoreColor = (score: number) => {
        if (score >= 1400) return "text-green-600 dark:text-green-400"; // Excellent
        if (score >= 1200) return "text-blue-600 dark:text-blue-400"; // Good
        if (score >= 1000) return "text-amber-600 dark:text-amber-400"; // Average
        return "text-red-600 dark:text-red-400"; // Needs improvement
    };

    const renderConversionTable = (table: ConversionTable) => {
        const sortedKeys = Object.keys(table).map(Number).sort((a, b) => b - a); // Sort from highest raw to lowest

        return (
            <div className="h-48 overflow-y-auto rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-1 text-xs shadow-inner">
                <div className="grid grid-cols-2 gap-x-4 sticky top-0 bg-slate-100 dark:bg-slate-700 p-1 rounded-t-sm font-bold text-slate-700 dark:text-slate-200 z-10">
                    <div className="text-center">Raw Score</div>
                    <div className="text-center">Scaled Score</div>
                </div>
                <div className="relative">
                    {sortedKeys.map((key, index) => (
                        <div key={key} className={`grid grid-cols-2 gap-x-4 p-1 rounded-sm ${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}>
                            <div className="text-center text-slate-600 dark:text-slate-300">{key}</div>
                            <div className="text-center font-medium text-slate-800 dark:text-slate-100">{table[key]}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    let rwTable: ConversionTable | null = null;
    let mathTable: ConversionTable | null = null;

    if (calculationResult) {
        if (testMode === 'digital') {
            rwTable = DIGITAL_RW_CONVERSION[calculationResult.finalDifficulty as 'easy'|'normal'|'hard'];
            mathTable = DIGITAL_MATH_CONVERSION[calculationResult.finalDifficulty as 'easy'|'normal'|'hard'];
        } else {
            rwTable = PAPER_RW_CONVERSION;
            mathTable = PAPER_MATH_CONVERSION;
        }
    }
    
    return (
        <>
            <style>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
            <main className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
            <div className="w-full max-w-6xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Free SAT Score Calculator 2025-2026</span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Convert raw SAT scores to scaled scores instantly. Get accurate percentile rankings and ACT equivalents for the Digital SAT.</p>
                </header>

                <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* Left Side: Inputs */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
                        <div>
                             <label className="block text-base font-semibold text-slate-900 dark:text-white mb-2">Test Mode</label>
                             <div className="flex gap-1 rounded-lg bg-slate-100 dark:bg-slate-900/50 p-1">
                                <button onClick={() => setTestMode('digital')} className={`w-full py-2 px-3 rounded-md text-sm font-semibold transition-all duration-200 ${testMode === 'digital' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50'}`}>Digital (2025-2026)</button>
                                <button onClick={() => setTestMode('paper')} className={`w-full py-2 px-3 rounded-md text-sm font-semibold transition-all duration-200 ${testMode === 'paper' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/50'}`}>Paper</button>
                             </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">How to Convert SAT Raw Scores to Scaled Scores</h2>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Raw Scores</h3>
                            <InputField 
                                label="Reading & Writing Raw Correct" 
                                field="readingWriting"
                                value={scores.readingWriting}
                                max={MAX_RAW_SCORES.readingWriting}
                                error={errors.readingWriting}
                                onChange={handleInputChange}
                            />

                            {isMathCombined ? (
                                <InputField 
                                    label={`Math Raw Correct (Total)`} 
                                    field="mathCombined"
                                    value={scores.mathCombined}
                                    max={maxMathRaw}
                                    error={errors.mathCombined}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <div className="flex gap-4">
                                    <InputField label="Math No-Calc" field="mathNoCalc" value={scores.mathNoCalc} max={MAX_RAW_SCORES.mathNoCalc} error={errors.mathNoCalc} onChange={handleInputChange} />
                                    <InputField label="Math Calc" field="mathCalc" value={scores.mathCalc} max={MAX_RAW_SCORES.mathCalc} error={errors.mathCalc} onChange={handleInputChange} />
                                </div>
                            )}

                             <div className="flex items-center pt-2">
                                <input type="checkbox" id="autosum" checked={isMathCombined} onChange={(e) => setIsMathCombined(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 dark:bg-slate-700 dark:border-slate-600" />
                                <label htmlFor="autosum" className="ml-3 block text-sm text-slate-900 dark:text-slate-300">Use Combined Math Score</label>
                            </div>
                        </div>

                        {testMode === 'digital' && (
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Difficulty Adjustment</label>
                                <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 sm:text-sm rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium">
                                    <option value="auto">Auto (Recommended)</option>
                                    <option value="easy">Easy Module</option>
                                    <option value="normal">Normal Module</option>
                                    <option value="hard">Hard Module</option>
                                </select>
                            </div>
                        )}
                        
                         <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Example Presets</label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                <button onClick={() => handleApplyPreset('1200')} className="text-sm py-2 px-2 bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition font-medium text-slate-700 dark:text-slate-200">~1200</button>
                                <button onClick={() => handleApplyPreset('1400')} className="text-sm py-2 px-2 bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition font-medium text-slate-700 dark:text-slate-200">~1400</button>
                                <button onClick={() => handleApplyPreset('1500')} className="text-sm py-2 px-2 bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition font-medium text-slate-700 dark:text-slate-200">~1500</button>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                            <button onClick={handleReset} className="w-full justify-center text-center py-2.5 px-5 text-sm font-medium text-slate-700 focus:outline-none bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:z-10 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-700 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-600">Reset All Fields</button>
                        </div>
                    </div>

                    {/* Right Side: Results */}
                    <div className="lg:col-span-3 bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-6" aria-live="polite" aria-atomic="true">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Estimated SAT Score & Percentile Ranking</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Digital SAT 2025-2026 Score Conversion Results</p>
                        </div>
                        {calculationResult ? (
                            <div className="space-y-6">
                                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800/50" role="status" aria-label={`Your total SAT score is ${calculationResult.scores.total} out of 1600`}>
                                    <div className={`text-7xl lg:text-8xl font-extrabold ${getScoreColor(calculationResult.scores.total)} transition-all duration-300`}>
                                        {calculationResult.scores.total}
                                    </div>
                                    <div className="text-lg font-medium text-slate-600 dark:text-slate-400">out of 1600</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{calculationResult.scores.readingWriting}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Reading & Writing</div>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{calculationResult.scores.math}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Math</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center border-t border-slate-200 dark:border-slate-700 pt-6">
                                     <div className="p-4">
                                        <div className="text-3xl font-semibold text-slate-800 dark:text-slate-200">{percentile}<span className="text-lg text-slate-500 dark:text-slate-400">%</span></div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Est. Percentile</div>
                                    </div>
                                    <div className="p-4">
                                        <div className="text-3xl font-semibold text-slate-800 dark:text-slate-200">{actEquivalent}</div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">Est. ACT Equivalent</div>
                                    </div>
                                </div>
                                <details className="group bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                    <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                        <span>Explain Score Conversion</span>
                                        <ChevronDownIcon />
                                    </summary>
                                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 space-y-4">
                                        <div>
                                          <p><strong>Mode:</strong> {testMode === 'digital' ? `Digital SAT (Difficulty: ${calculationResult.finalDifficulty})` : 'Paper SAT'}</p>
                                          <p><strong>Reading/Writing Raw:</strong> {scores.readingWriting} → <strong>Scaled:</strong> {calculationResult.scores.readingWriting}</p>
                                          <p><strong>Math Raw:</strong> {isMathCombined ? scores.mathCombined : (scores.mathNoCalc ?? 0) + (scores.mathCalc ?? 0)} → <strong>Scaled:</strong> {calculationResult.scores.math}</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="font-semibold text-center mb-2 text-slate-800 dark:text-slate-100">Reading & Writing Table</h4>
                                                {rwTable && renderConversionTable(rwTable)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-center mb-2 text-slate-800 dark:text-slate-100">Math Table</h4>
                                                {mathTable && renderConversionTable(mathTable)}
                                            </div>
                                        </div>
                                        <p className="text-xs pt-2 italic text-slate-500 dark:text-slate-400">*Scores are estimated based on standard conversion tables. Official scores may vary.</p>
                                    </div>
                                </details>
                                <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                                    <h3 className="text-lg font-semibold text-center text-slate-800 dark:text-slate-200">SAT Score "What-If" Simulator</h3>
                                    {renderWhatIfSlider('Reading & Writing Raw', 'readingWriting', scores.readingWriting, MAX_RAW_SCORES.readingWriting)}
                                    {isMathCombined ? (
                                        renderWhatIfSlider('Math Raw (Combined)', 'mathCombined', scores.mathCombined, maxMathRaw)
                                    ) : (
                                        <>
                                            {renderWhatIfSlider('Math No-Calc Raw', 'mathNoCalc', scores.mathNoCalc, MAX_RAW_SCORES.mathNoCalc)}
                                            {renderWhatIfSlider('Math Calc Raw', 'mathCalc', scores.mathCalc, MAX_RAW_SCORES.mathCalc)}
                                        </>
                                    )}
                                </div>

                            </div>
                        ) : (
                            <div className="text-center py-20 px-6">
                                <div className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500">
                                    <ChartBarIcon />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Enter Your SAT Raw Scores Above</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your Digital SAT score conversion results will appear here instantly.</p>
                            </div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                                <button onClick={handleCopyToClipboard} disabled={!calculationResult} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 dark:focus:ring-slate-600 transition-colors">
                                    {copied ? <CheckIcon /> : <ClipboardIcon />} {copied ? 'Copied!' : 'Copy'}
                                </button>
                                <button onClick={handleExportCSV} disabled={!calculationResult} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg border border-slate-200 hover:bg-slate-200 focus:ring-4 focus:ring-slate-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 dark:focus:ring-slate-600 transition-colors">
                                    <DownloadIcon /> Export CSV
                                </button>
                                <button onClick={() => setIsPremiumModalOpen(true)} disabled={!calculationResult} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-blue-800 transition-colors shadow-sm hover:shadow-md">
                                    <UserIcon /> Save Report
                                </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Below-the-fold Content */}
            <div className="w-full max-w-4xl mx-auto mt-16 space-y-12">
                {/* Table of Contents */}
                <TableOfContents sections={tocSections} />

                {/* Quick Examples Section */}
                <section id="examples" className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Try These Example Scores</h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">Click any preset to instantly see the calculated SAT score and percentile ranking</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <button 
                            onClick={() => {
                                setTestMode('digital');
                                setIsMathCombined(true);
                                setDifficulty('auto');
                                setScores({ readingWriting: 54, mathNoCalc: null, mathCalc: null, mathCombined: 44 });
                                setErrors({});
                            }}
                            className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-left group"
                        >
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">1600</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">🏆 Perfect Score</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">All questions correct (54 R&W + 44 Math)</p>
                        </button>

                        <button 
                            onClick={() => {
                                setTestMode('digital');
                                setIsMathCombined(true);
                                setDifficulty('auto');
                                setScores({ readingWriting: 50, mathNoCalc: null, mathCalc: null, mathCombined: 40 });
                                setErrors({});
                            }}
                            className="p-6 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-left group"
                        >
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">~1500</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">🎓 Ivy League Target</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Competitive for top universities</p>
                        </button>

                        <button 
                            onClick={() => {
                                setTestMode('digital');
                                setIsMathCombined(true);
                                setDifficulty('auto');
                                setScores({ readingWriting: 45, mathNoCalc: null, mathCalc: null, mathCombined: 35 });
                                setErrors({});
                            }}
                            className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-left group"
                        >
                            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">~1400</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">⭐ Excellent Score</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">93rd-99th percentile nationwide</p>
                        </button>

                        <button 
                            onClick={() => {
                                setTestMode('digital');
                                setIsMathCombined(true);
                                setDifficulty('auto');
                                setScores({ readingWriting: 33, mathNoCalc: null, mathCalc: null, mathCombined: 25 });
                                setErrors({});
                            }}
                            className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-left group"
                        >
                            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">~1200</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">👍 Good Score</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">70th-92nd percentile range</p>
                        </button>

                        <button 
                            onClick={() => {
                                setTestMode('digital');
                                setIsMathCombined(true);
                                setDifficulty('auto');
                                setScores({ readingWriting: 27, mathNoCalc: null, mathCalc: null, mathCombined: 22 });
                                setErrors({});
                            }}
                            className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-left group"
                        >
                            <div className="text-3xl font-bold text-slate-600 dark:text-slate-300 mb-2">~1050</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">📊 Average Score</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Around 50th percentile (median)</p>
                        </button>

                        <button 
                            onClick={() => {
                                setTestMode('paper');
                                setIsMathCombined(false);
                                setDifficulty('normal');
                                setScores({ readingWriting: 45, mathNoCalc: 15, mathCalc: 23, mathCombined: null });
                                setErrors({});
                            }}
                            className="p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border-2 border-cyan-200 dark:border-cyan-700 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300 text-left group"
                        >
                            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">~1350</div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">📝 Paper SAT Example</div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Old format with No-Calc + Calc sections</p>
                        </button>
                    </div>
                </section>

                {/* Benefits Section */}
                <section id="benefits" className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Why Use Our Free SAT Score Calculator & Converter?</h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">Get instant, accurate SAT score estimates with features designed for modern test-takers</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700/50">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Instant Results</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Real-time score calculation as you type. No waiting, no sign-up required. Get your scaled scores (200-800) and total score (400-1600) immediately.</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700/50">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Comprehensive Analysis</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Beyond basic scoring, get percentile rankings, ACT score concordance, and downloadable CSV reports. Perfect for tracking progress over time.</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-700/50">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Digital SAT Adaptive</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Unique adaptive difficulty detection for Digital SAT 2025-2026. Automatically adjusts for Easy, Normal, or Hard module performance.</p>
                        </div>
                    </div>
                </section>
                
                <section id="about-sat" className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About the Digital SAT</h2>
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">The <strong>Digital SAT</strong>, introduced in 2024, represents a major shift from the traditional paper-and-pencil <strong>standardized test</strong>. It's an <strong>adaptive test</strong> administered on a computer, meaning the difficulty of the second module in each section (Reading & Writing, and Math) adjusts based on your performance in the first module.</p>
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">This makes the test shorter (about 2 hours instead of 3) and aims to provide a more precise measure of your skills for <strong>college admissions</strong>. Our <strong>SAT score calculator</strong> is updated to reflect the structure of this new test format, helping students with <strong>test preparation</strong> and score estimation.</p>
                </section>
                
                <section id="how-to-calculate" className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">How to Calculate SAT Scores from Raw Scores</h2>
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">Understanding <strong>how SAT scores are calculated</strong> is key to interpreting your performance on this <strong>college entrance exam</strong>. The <strong>score conversion process</strong> involves three main steps:</p>
                    
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center text-lg">1</div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Determine Your Raw Score</h3>
                                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-3">This is simply the number of questions you answered correctly in each section. There are no penalties for incorrect answers on the SAT.</p>
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Example:</p>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">• Reading & Writing: 45 correct out of 54 questions</p>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">• Math: 38 correct out of 44 questions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/10 dark:to-blue-900/10 rounded-xl p-6 border border-sky-200 dark:border-sky-800/30">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center text-lg">2</div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Convert to a Scaled Score</h3>
                                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-3">Your raw score for each section is then converted to a scaled score on a 200-800 point scale. This conversion uses "equating," which adjusts for slight differences in difficulty between test versions.</p>
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Example Conversion:</p>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">• Raw Score 45 (R&W) → Scaled Score: <span className="font-bold text-blue-600 dark:text-blue-400">650</span></p>
                                        <p className="text-sm text-slate-700 dark:text-slate-300">• Raw Score 38 (Math) → Scaled Score: <span className="font-bold text-purple-600 dark:text-purple-400">680</span></p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">*Our calculator uses these conversion tables automatically</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center text-lg">3</div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Calculate Your Total Score</h3>
                                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-3">Your two section scores (Reading & Writing, and Math) are added together to get your total SAT score, which ranges from 400 to 1600.</p>
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">Final Calculation:</p>
                                        <div className="flex items-center justify-center gap-3 text-lg font-bold">
                                            <span className="text-blue-600 dark:text-blue-400">650</span>
                                            <span className="text-slate-400">+</span>
                                            <span className="text-purple-600 dark:text-purple-400">680</span>
                                            <span className="text-slate-400">=</span>
                                            <span className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">1330</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center italic">Total SAT Score</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-600 dark:text-slate-400"><span className="font-semibold text-slate-900 dark:text-white">💡 Pro Tip:</span> Use the "What-If" simulator above to see how different raw scores affect your final SAT score!</p>
                    </div>
                </section>
                
                <section id="score-ranges" className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SAT Score Ranges & What They Mean</h2>
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">Understanding your <strong>SAT score range</strong> helps you set realistic goals for <strong>college admissions</strong>. Here's a breakdown of <strong>what is a good SAT score</strong> in 2024:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">1400-1600</div>
                            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">Excellent Score</div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Competitive for Ivy League and top-tier universities. Places you in the 93rd-99th percentile nationwide.</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">1200-1390</div>
                            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">Good Score</div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Competitive for most colleges and many scholarship opportunities. Places you in the 70th-92nd percentile.</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">1000-1190</div>
                            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">Average Score</div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Meets requirements for many state universities and community colleges. 37th-69th percentile range.</p>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-800 dark:text-blue-200"><strong>💡 Pro Tip:</strong> Use our calculator above to see how different raw scores translate to these ranges. Understanding the <strong>raw SAT score to scaled score conversion</strong> helps you set targeted <strong>score improvement</strong> goals.</p>
                    </div>
                </section>
                
                <section id="faq" className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 scroll-mt-24">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions (FAQ)</h2>
                    <div className="space-y-4">
                        {FAQ_DATA.map((faq, index) => (
                            <details key={index} className="group p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
                                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-slate-900 dark:text-white text-base">
                                    {faq.question}
                                    <ChevronDownIcon />
                                </summary>
                                <p className="mt-3 text-base text-slate-700 dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="text-center bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Share Your Score</h3>
                    <div className="flex justify-center items-center gap-4">
                        <a href={getShareUrl('twitter')} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors text-slate-700 dark:text-slate-200"><TwitterIcon /></a>
                        <a href={getShareUrl('facebook')} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors text-slate-700 dark:text-slate-200"><FacebookIcon /></a>
                        <a href={getShareUrl('whatsapp')} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors text-slate-700 dark:text-slate-200"><WhatsAppIcon /></a>
                    </div>
                </section>

                <section className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="/math-and-calculation-tools/percentage-change-calculator" className="block p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 transition-all hover:border-blue-300 dark:hover:border-blue-700">
                            <PercentageIcon className="h-8 w-8 text-[#001BB7]" />
                            <h4 className="mt-3 font-semibold text-slate-900 dark:text-white">Percentage Change Calculator</h4>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Calculate percentage increase or decrease between numbers.</p>
                        </a>
                         <a href="/math-and-calculation-tools/time-difference-calculator" className="block p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 transition-all hover:border-blue-300 dark:hover:border-blue-700">
                            <TimeDiffIcon className="h-8 w-8 text-purple-600" />
                            <h4 className="mt-3 font-semibold text-slate-900 dark:text-white">Date Difference Calculator</h4>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Calculate duration between two dates accurately.</p>
                        </a>
                         <a href="/math-and-calculation-tools/fabric-costing-tool" className="block p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:shadow-lg hover:-translate-y-1 transition-all hover:border-blue-300 dark:hover:border-blue-700">
                            <FabricIcon className="h-8 w-8 text-blue-600" />
                            <h4 className="mt-3 font-semibold text-slate-900 dark:text-white">Fabric Costing Calculator</h4>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Professional fabric costing for textile engineers.</p>
                        </a>
                    </div>
                </section>
                
                <section className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-8">
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        Students calculating SAT scores may also find our 
                        <a href="/tools/uc-berkeley-gpa-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">UC Berkeley GPA Calculator</a> 
                        and 
                        <a href="/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">LSAC GPA Calculator</a> 
                        useful for academic planning.
                    </p>
                </section>
                
                <footer className="text-center text-sm text-slate-500 dark:text-slate-400 pt-8 border-t border-slate-200 dark:border-slate-700 space-y-3">
                    <p><strong>Disclaimer:</strong> This <strong>SAT score estimator</strong> is for estimation purposes only and is not affiliated with the College Board. Scores are based on approximated conversion tables. Official scores may vary.</p>
                    <p><strong>Data Sources:</strong> Official concordance tables from the <a href="https://collegereadiness.collegeboard.org/sat" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">College Board</a> and <a href="https://www.act.org/content/act/en/products-and-services/the-act/scores/act-sat-concordance.html" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ACT, Inc.</a></p>
                    <p><strong>Additional Resources:</strong> <a href="https://www.khanacademy.org/test-prep/sat" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Khan Academy SAT Prep</a> | <a href="https://satsuite.collegeboard.org/digital/digital-practice-preparation" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Official SAT Practice Tests</a></p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Last Updated: November 8, 2025</p>
                    <p>&copy; {new Date().getFullYear()} <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">ZuraWebTools</a>. All rights reserved. | <a href="/tools" className="text-blue-600 dark:text-blue-400 hover:underline">All Tools</a> | <a href="/tools/math-and-calculation" className="text-blue-600 dark:text-blue-400 hover:underline">Math & Calculation Tools</a></p>
                </footer>
            </div>

            {isPremiumModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity" onClick={() => setIsPremiumModalOpen(false)}>
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 max-w-md w-full m-4 text-center border border-slate-200 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/50 dark:to-sky-900/50">
                            <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Unlock Pro Features</h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">Upgrade to ZuraWebTools Pro to supercharge your test prep.</p>
                        <ul className="mt-6 space-y-3 text-left text-slate-700 dark:text-slate-300">
                            <li className="flex items-center gap-3"><CheckIcon className="h-4 w-4 text-blue-600" /> Save and track unlimited score reports</li>
                            <li className="flex items-center gap-3"><CheckIcon className="h-4 w-4 text-blue-600" /> View historical score trends with charts</li>
                            <li className="flex items-center gap-3"><CheckIcon className="h-4 w-4 text-blue-600" /> Export professional PDF reports</li>
                            <li className="flex items-center gap-3"><CheckIcon className="h-4 w-4 text-blue-600" /> Advanced percentile analysis</li>
                        </ul>
                        <div className="mt-8">
                            <button className="w-full py-3 px-6 text-white font-semibold bg-gradient-to-r from-[#001BB7] to-[#60A5FA] rounded-lg hover:from-blue-700 hover:to-sky-500 transition-colors shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">Start Free Trial</button>
                            <button onClick={() => setIsPremiumModalOpen(false)} className="mt-4 text-sm text-slate-500 dark:text-slate-400 hover:underline">Maybe later</button>
                        </div>
                    </div>
                </div>
            )}
            </main>
        </>
    );
};

// Wrap with Error Boundary for production safety
const SATScoreCalculatorWithErrorBoundary: React.FC = () => (
    <SATCalculatorErrorBoundary>
        <SATScoreCalculator />
    </SATCalculatorErrorBoundary>
);

export default SATScoreCalculatorWithErrorBoundary;
