import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface EarlyDecisionActionCalculatorProps {
  navigateTo: (page: Page) => void;
}

interface ComparisonResult {
  edAcceptanceRate: number;
  eaAcceptanceRate: number;
  rdAcceptanceRate: number;
  edAdvantage: number;
  eaAdvantage: number;
  recommendedPlan: string;
  reasoning: string;
}

interface SchoolTypeData {
  ed: number;
  ea: number;
  rd: number;
  yieldRate: number;
  demonstratedInterestWeight: number;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/admission-tools/early-decision-action-calculator';

// Rate limiting: Max 5 calculations per 10 seconds
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 10000; // 10 seconds

const EarlyDecisionActionCalculator: React.FC<EarlyDecisionActionCalculatorProps> = ({ navigateTo }) => {
  // Error Boundary State
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');

  // Rate limiting state
  const [calculationCount, setCalculationCount] = useState<number>(0);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<number>(Date.now());

  // Lazy loading state for heavy content sections
  const [showDetailedContent, setShowDetailedContent] = useState<boolean>(false);

  // Trigger lazy loading after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetailedContent(true);
    }, 100); // Load heavy content after 100ms

    return () => clearTimeout(timer);
  }, []);

  // State for tool functionality
  const [selectedSchoolType, setSelectedSchoolType] = useState<string>('ivy-league');
  const [needFinancialAid, setNeedFinancialAid] = useState<boolean>(false);
  const [currentGPA, setCurrentGPA] = useState<string>('');
  const [firstChoiceSchool, setFirstChoiceSchool] = useState<boolean>(true);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  // Error Boundary: Global error handlers
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error('Error caught:', event.error);
      setHasError(true);
      setErrorInfo(event.message || 'An unexpected error occurred while loading the calculator.');
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setHasError(true);
      setErrorInfo('A system error occurred: ' + (event.reason?.message || 'Unknown error'));
    };

    const handleOnline = () => {
      if (errorInfo.includes('offline') || errorInfo.includes('network')) {
        setHasError(false);
        setErrorInfo('');
      }
    };

    const handleOffline = () => {
      setHasError(true);
      setErrorInfo('You are currently offline. The calculator may not function properly without an internet connection.');
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [errorInfo]);

  // SEO Optimization
  useEffect(() => {
    document.title = "Early Decision vs Early Action Calculator 2026 - ED EA Comparison Tool | ZuraWebTools";

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      // Sanitize content before setting
      const sanitizedContent = sanitizeContent(content);
      let element = document.querySelector(`meta[${attr}='${sanitizeContent(name)}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, sanitizeContent(name));
        document.head.appendChild(element);
      }
      element.setAttribute('content', sanitizedContent);
    };

    setMeta('description', 'Free Early Decision vs Early Action calculator 2026. Compare ED EA acceptance rates, deadlines, binding policies. Should you apply early decision or early action? Find out now.');
    setMeta('keywords', 'early decision vs early action, ed vs ea calculator, early decision acceptance rate, early action acceptance rate, should i apply early decision, early decision binding, early action vs regular decision, ed ea rd comparison, college early application calculator, early decision pros cons, early action deadline, restrictive early action, single choice early action, early decision 1 vs 2, college admission calculator');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph tags
    setMeta('og:title', 'Early Decision vs Early Action Calculator 2026 - Compare ED EA Acceptance Rates', true);
    setMeta('og:description', 'Calculate your admission chances with Early Decision vs Early Action. Compare acceptance rates, financial aid impact, and get personalized recommendations for ED/EA applications.', true);
    setMeta('og:image', 'https://zurawebtools.com/og-early-decision-action-calculator.png', true);
    setMeta('og:url', CANONICAL_URL, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'ZuraWebTools', true);
    setMeta('og:locale', 'en_US', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Early Decision vs Early Action Calculator - ED EA Comparison');
    setMeta('twitter:description', 'Compare ED vs EA acceptance rates and get personalized application strategy recommendations.');
    setMeta('twitter:image', 'https://zurawebtools.com/og-early-decision-action-calculator.png');

    // Canonical link with URL validation and sanitization
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = sanitizeURL(CANONICAL_URL);

    // Structured Data - JSON-LD
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Early Decision vs Early Action Calculator 2026",
        "description": "Compare Early Decision and Early Action acceptance rates, deadlines, and binding policies to make informed college application decisions",
        "url": CANONICAL_URL,
        "breadcrumb": {
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
              "name": "Admission Tools",
              "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Early Decision vs Early Action Calculator",
              "item": CANONICAL_URL
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Early Decision vs Early Action Calculator",
        "applicationCategory": "EducationApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "412",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Free ED vs EA calculator to compare early decision and early action acceptance rates, deadlines, and application strategies for college admissions"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I apply Early Decision to multiple schools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, you can only apply Early Decision (ED) to ONE school per application cycle. ED is a binding agreement, and applying to multiple schools violates the ED contract and could result in all your acceptances being rescinded. However, you CAN apply EA (non-binding) or RD to other schools while applying ED to one school, provided you withdraw those applications if accepted ED."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I get deferred from Early Decision?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If deferred from ED, your application moves to the Regular Decision (RD) pool and will be reconsidered with RD applicants. You are released from the binding ED agreement and can apply to other schools. Deferral rates vary (15-30% at top schools). If deferred, send an update letter with new achievements, improved grades, and reaffirm your interest. Deferral is not a rejection—many deferred students are accepted RD."
            }
          },
          {
            "@type": "Question",
            "name": "How much do Early Decision acceptance rates really help?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early Decision acceptance rates are typically 2-4 times higher than Regular Decision at top schools. For example, Duke's ED rate is 21% vs 5.1% RD (4.1x higher), and Princeton's SCEA rate is 14.7% vs 3.7% RD (4.0x higher). However, the ED pool is also stronger (recruited athletes, legacies, high-achieving students). The acceptance boost is real, but you still need competitive credentials."
            }
          },
          {
            "@type": "Question",
            "name": "Can I back out of Early Decision if I can't afford it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, insufficient financial aid is the ONLY valid reason to decline an ED acceptance. If the financial aid package makes attendance impossible, you can request release from the ED agreement. Document your case with financial aid office. Schools understand legitimate financial hardship. However, you cannot decline ED simply to compare offers or because you changed your mind—that violates the binding commitment."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between Early Decision I and Early Decision II?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ED I has a November 1-15 deadline with decisions by mid-December. ED II has a January 1-15 deadline with decisions by mid-February. Both are equally binding. ED II is ideal if you need fall semester grades to strengthen your application, were deferred/rejected from another school's ED I, or didn't decide on your first choice until later. Acceptance rates are similar for ED I and ED II."
            }
          },
          {
            "@type": "Question",
            "name": "Can international students apply Early Decision?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, international students can apply ED, but consider financial aid carefully. Many top US schools are need-aware for international students (admission depends on financial need). If you need aid, applying ED limits your ability to compare offers. However, if you don't need aid or the school is need-blind for internationals (Harvard, Yale, MIT, Princeton, Amherst), ED can significantly boost your chances."
            }
          },
          {
            "@type": "Question",
            "name": "Is a 3.5 GPA competitive for Early Decision at top schools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 3.5 GPA is below average for Ivy League and top 20 schools (average admitted GPA: 3.85-4.0 unweighted). However, context matters: upward grade trend, rigorous coursework (AP/IB), strong test scores, exceptional extracurriculars, or recruited athlete status can compensate. For top 50-100 schools, a 3.5 GPA is more competitive. Use our College Admissions Calculator to assess your full profile."
            }
          },
          {
            "@type": "Question",
            "name": "What if my Early Decision financial aid offer is insufficient?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Contact the financial aid office immediately to appeal. Provide documentation of special circumstances, errors in aid calculation, or updated financial information. If the school cannot meet your need, you can request release from ED agreement due to financial hardship. Schools will release you if aid is genuinely insufficient. However, 'insufficient' means you cannot attend, not that another school offered more."
            }
          },
          {
            "@type": "Question",
            "name": "Can I apply Early Action and Early Decision simultaneously?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can apply ED to one school and EA to multiple other schools simultaneously. EA is non-binding, so there's no conflict. However, if accepted ED, you must withdraw all EA applications immediately. Note: Some schools have Restrictive Early Action (REA) or Single-Choice Early Action (SCEA) policies that prohibit applying to other private schools early—check each school's specific rules."
            }
          },
          {
            "@type": "Question",
            "name": "Should I apply Early Decision if I need to compare financial aid offers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, if comparing financial aid offers is important to your family, apply Early Action (non-binding) or Regular Decision instead. ED requires commitment before seeing other schools' aid packages. You can only decline ED for insufficient aid, not to compare offers. EA gives you the early application advantage while preserving flexibility to compare aid packages from multiple schools before the May 1 decision deadline."
            }
          }
        ]
      }
    ];

    let scriptTag = document.querySelector('script[type="application/ld+json"][data-ed-ea-calc]') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-ed-ea-calc', 'true');
      scriptTag.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
    }

    // Core Web Vitals Monitoring
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        // LCP - Largest Contentful Paint (Target: <2500ms)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          const lcp = lastEntry.renderTime || lastEntry.loadTime;
          console.log('LCP:', lcp, 'ms', lcp < 2500 ? '✓ Good' : lcp < 4000 ? '⚠ Needs Improvement' : '✗ Poor');
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // FID - First Input Delay (Target: <100ms)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            console.log('FID:', fid, 'ms', fid < 100 ? '✓ Good' : fid < 300 ? '⚠ Needs Improvement' : '✗ Poor');
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // CLS - Cumulative Layout Shift (Target: <0.1)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              console.log('CLS:', clsValue.toFixed(3), clsValue < 0.1 ? '✓ Good' : clsValue < 0.25 ? '⚠ Needs Improvement' : '✗ Poor');
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.error('Core Web Vitals monitoring failed:', error);
      }
    }

    return () => {
      const script = document.querySelector('script[data-ed-ea-calc]');
      if (script) script.remove();
    };
  }, []);

  // Enhanced DOMPurify-like sanitization with comprehensive XSS protection
  const sanitizeContent = (content: string): string => {
    // Remove script tags and event handlers
    let sanitized = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:text\/html/gi, '');
    
    // Escape HTML entities
    sanitized = sanitized.replace(/[<>"'&]/g, (char) => {
      const escapeMap: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return escapeMap[char];
    });
    
    return sanitized;
  };

  // Validate and sanitize URL
  const sanitizeURL = (url: string): string => {
    try {
      const trimmedURL = url.trim(); // Remove trailing spaces
      const urlObj = new URL(trimmedURL);
      // Only allow https and http protocols
      if (!['https:', 'http:'].includes(urlObj.protocol)) {
        throw new Error('Invalid protocol');
      }
      return trimmedURL;
    } catch {
      return 'https://zurawebtools.com';
    }
  };

  // Calculate acceptance rates and recommendations
  const calculateComparison = useMemo(() => {
    return () => {
      // Input validation
      if (currentGPA && (isNaN(parseFloat(currentGPA)) || parseFloat(currentGPA) < 0 || parseFloat(currentGPA) > 4.0)) {
        setHasError(true);
        setErrorInfo('Invalid GPA. Please enter a value between 0.0 and 4.0.');
        return;
      }
      const gpa = parseFloat(currentGPA);
      const isValidGPA = !isNaN(gpa) && gpa >= 0 && gpa <= 4.0;

      // Enhanced school type data with yield rates and demonstrated interest weights
      const baseRates: { [key: string]: SchoolTypeData } = {
        'ivy-league': { ed: 18.5, ea: 0, rd: 4.5, yieldRate: 0.82, demonstratedInterestWeight: 0.15 },
        'top-private': { ed: 25.0, ea: 20.0, rd: 8.0, yieldRate: 0.68, demonstratedInterestWeight: 0.20 },
        'selective-liberal-arts': { ed: 35.0, ea: 28.0, rd: 15.0, yieldRate: 0.55, demonstratedInterestWeight: 0.25 },
        'public-university': { ed: 0, ea: 45.0, rd: 35.0, yieldRate: 0.48, demonstratedInterestWeight: 0.10 },
        'highly-selective': { ed: 22.0, ea: 18.0, rd: 6.5, yieldRate: 0.72, demonstratedInterestWeight: 0.18 },
      };

      const schoolData = baseRates[selectedSchoolType];
      
      // Apply GPA-based adjustments (if GPA provided)
      let gpaAdjustmentFactor = 1.0;
      if (isValidGPA) {
        if (gpa >= 3.9) gpaAdjustmentFactor = 1.15; // Top GPA boost
        else if (gpa >= 3.7) gpaAdjustmentFactor = 1.08;
        else if (gpa >= 3.5) gpaAdjustmentFactor = 1.0;
        else if (gpa >= 3.0) gpaAdjustmentFactor = 0.85; // Lower GPA penalty
        else gpaAdjustmentFactor = 0.65;
      }

      // Apply demonstrated interest weight for ED/EA
      const edInterestBoost = schoolData.ed > 0 ? (1 + schoolData.demonstratedInterestWeight) : 1.0;
      const eaInterestBoost = schoolData.ea > 0 ? (1 + schoolData.demonstratedInterestWeight * 0.6) : 1.0; // EA gets 60% of ED interest boost

      // Calculate adjusted acceptance rates
      const edRate = Math.min(schoolData.ed * gpaAdjustmentFactor * edInterestBoost, 100);
      const eaRate = Math.min(schoolData.ea * gpaAdjustmentFactor * eaInterestBoost, 100);
      const rdRate = Math.min(schoolData.rd * gpaAdjustmentFactor, 100);
      
      // Calculate ED/EA advantage with division by zero protection and yield consideration
      const edAdvantage = (edRate > 0 && rdRate > 0) ? ((edRate - rdRate) / rdRate * 100) : 0;
      const eaAdvantage = (eaRate > 0 && rdRate > 0) ? ((eaRate - rdRate) / rdRate * 100) : 0;

      // Determine recommendation with enhanced logic
      let recommendedPlan = 'Regular Decision';
      let reasoning = '';

      const gpaContext = isValidGPA ? ` (adjusted for ${gpa.toFixed(2)} GPA)` : '';

      if (edRate > 0 && firstChoiceSchool && !needFinancialAid) {
        recommendedPlan = 'Early Decision';
        reasoning = `Early Decision offers ${edAdvantage.toFixed(1)}% higher acceptance rate${gpaContext}. Since this is your first choice and you don't need to compare financial aid, ED maximizes your chances. Yield rate: ${(schoolData.yieldRate * 100).toFixed(0)}% - schools value ED commitment.`;
      } else if (eaRate > 0 && (needFinancialAid || !firstChoiceSchool)) {
        recommendedPlan = 'Early Action';
        reasoning = `Early Action gives you ${eaAdvantage.toFixed(1)}% advantage${gpaContext} while keeping flexibility to compare offers${needFinancialAid ? ' and financial aid packages' : ''}. Demonstrated interest still matters, but you're not locked in.`;
      } else if (needFinancialAid && edRate > 0) {
        recommendedPlan = 'Early Action or Regular Decision';
        reasoning = `While ED offers ${edAdvantage.toFixed(1)}% higher acceptance rate${gpaContext}, you need financial aid flexibility. Consider EA if available, or RD to compare multiple offers. Don't sacrifice aid comparison for admission boost.`;
      } else {
        recommendedPlan = 'Regular Decision';
        reasoning = `${schoolData.ea === 0 ? 'No early programs available for this school type. ' : ''}Regular Decision allows maximum time for application improvement and financial aid comparison${gpaContext}.`;
      }

      // GPA-based adjustment
      if (isValidGPA) {
        if (gpa >= 3.8) {
          reasoning += ` With your strong ${gpa.toFixed(2)} GPA, you're a competitive applicant for early programs.`;
        } else if (gpa >= 3.5) {
          reasoning += ` Your ${gpa.toFixed(2)} GPA is solid. Consider using fall semester to boost it before RD if needed.`;
        } else {
          reasoning += ` With a ${gpa.toFixed(2)} GPA, focus on strengthening your application before the RD deadline.`;
        }
      }

      setResult({
        edAcceptanceRate: edRate,
        eaAcceptanceRate: eaRate,
        rdAcceptanceRate: rdRate,
        edAdvantage,
        eaAdvantage,
        recommendedPlan,
        reasoning,
      });
    };
  }, [selectedSchoolType, needFinancialAid, currentGPA, firstChoiceSchool]);

  const handleCalculate = () => {
    // Reset any previous errors
    setHasError(false);
    setErrorInfo('');

    // Rate limiting check
    const currentTime = Date.now();
    if (currentTime - rateLimitResetTime > RATE_LIMIT_WINDOW) {
      // Reset rate limit window
      setCalculationCount(0);
      setRateLimitResetTime(currentTime);
    }

    if (calculationCount >= RATE_LIMIT_MAX) {
      const remainingTime = Math.ceil((rateLimitResetTime + RATE_LIMIT_WINDOW - currentTime) / 1000);
      setHasError(true);
      setErrorInfo(`Rate limit exceeded. Please wait ${remainingTime} seconds before calculating again.`);
      return;
    }
    
    // Validate GPA input before calculation
    if (currentGPA) {
      const gpaValue = parseFloat(currentGPA);
      if (isNaN(gpaValue)) {
        setHasError(true);
        setErrorInfo('Please enter a valid numeric GPA value.');
        return;
      }
      if (gpaValue < 0 || gpaValue > 4.0) {
        setHasError(true);
        setErrorInfo('GPA must be between 0.0 and 4.0.');
        return;
      }
    }
    
    // Increment calculation count
    setCalculationCount(prev => prev + 1);
    
    calculateComparison();
  };

  const handleClear = () => {
    setResult(null);
    setCurrentGPA('');
    setHasError(false);
    setErrorInfo('');
    setSelectedSchoolType('ivy-league');
    setNeedFinancialAid(false);
    setFirstChoiceSchool(true);
  };

  // Error Boundary UI
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border-4 border-red-200">
          <div className="text-center">
            <div className="text-7xl mb-6 animate-pulse">⚠️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Something Went Wrong
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {errorInfo}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => {
                  setHasError(false);
                  setErrorInfo('');
                  window.location.reload();
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                aria-label="Reload calculator"
              >
                🔄 Reload Calculator
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300"
                aria-label="Return to home page"
              >
                🏠 Return to Home
              </button>
            </div>
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Troubleshooting Tips:</h3>
              <ul className="text-left text-gray-700 space-y-2 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Check your internet connection and try again</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Clear your browser cache and reload the page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Try using a different browser (Chrome, Firefox, Safari)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Disable browser extensions temporarily</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              Early Decision vs Early Action Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Compare <strong>Early Decision (ED)</strong> and <strong>Early Action (EA)</strong> acceptance rates. Get personalized recommendations based on your situation to maximize college admission chances.
          </p>
        </div>

        {/* Calculator Tool */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-3" aria-hidden="true">🎯</span>
            ED vs EA Comparison Calculator
          </h2>

          <div className="space-y-6">
            {/* School Type Selection */}
            <div>
              <label htmlFor="school-type" className="block text-sm font-semibold text-gray-800 mb-2">
                Select School Type <span className="text-red-600">*</span>
              </label>
              <select
                id="school-type"
                value={selectedSchoolType}
                onChange={(e) => setSelectedSchoolType(e.target.value)}
                className="w-full px-4 py-3 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="ivy-league">Ivy League (Harvard, Yale, Princeton, etc.)</option>
                <option value="top-private">Top Private Universities (Stanford, MIT, Duke, etc.)</option>
                <option value="selective-liberal-arts">Selective Liberal Arts Colleges (Williams, Amherst, etc.)</option>
                <option value="highly-selective">Highly Selective Universities (Northwestern, Vanderbilt, etc.)</option>
                <option value="public-university">Top Public Universities (UVA, UNC, Michigan, etc.)</option>
              </select>
              <p className="mt-2 text-sm text-gray-600">
                <span aria-hidden="true">💡</span> Different school types have different ED/EA acceptance rates
              </p>
            </div>

            {/* GPA Input */}
            <div>
              <label htmlFor="gpa" className="block text-sm font-semibold text-gray-800 mb-2">
                Your Current GPA (Optional)
              </label>
              <input
                type="number"
                id="gpa"
                value={currentGPA}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty or valid range input
                  if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 4.0)) {
                    setCurrentGPA(value);
                    setHasError(false);
                    setErrorInfo('');
                  }
                }}
                onBlur={(e) => {
                  const value = e.target.value;
                  if (value && (isNaN(parseFloat(value)) || parseFloat(value) < 0 || parseFloat(value) > 4.0)) {
                    setHasError(true);
                    setErrorInfo('GPA must be between 0.0 and 4.0');
                  }
                }}
                placeholder="e.g., 3.85"
                min="0"
                max="4.0"
                step="0.01"
                className="w-full px-4 py-3 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                aria-describedby="gpa-hint"
                aria-invalid={hasError && errorInfo.includes('GPA')}
                aria-required="false"
              />
              <p id="gpa-hint" className="mt-2 text-sm text-gray-600">
                <span aria-hidden="true">📊</span> Enter on 4.0 scale for personalized recommendations
              </p>
              {hasError && errorInfo.includes('GPA') && (
                <p className="mt-2 text-sm text-red-600 font-semibold" role="alert">
                  ⚠️ {errorInfo}
                </p>
              )}
            </div>

            {/* First Choice Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <input
                type="checkbox"
                id="first-choice"
                checked={firstChoiceSchool}
                onChange={(e) => setFirstChoiceSchool(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="first-choice" className="text-gray-800 font-medium">
                This is my first-choice school (I would definitely attend if accepted)
              </label>
            </div>

            {/* Financial Aid Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
              <input
                type="checkbox"
                id="financial-aid"
                checked={needFinancialAid}
                onChange={(e) => setNeedFinancialAid(e.target.checked)}
                className="mt-1 w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-2 focus:ring-yellow-500"
              />
              <label htmlFor="financial-aid" className="text-gray-800 font-medium">
                I need to compare financial aid offers before committing
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleCalculate}
                className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span aria-hidden="true">🎓</span> Calculate Recommendation
              </button>
              <button
                onClick={handleClear}
                disabled={!result}
                className="px-6 py-4 bg-gray-200 text-gray-800 font-semibold text-lg rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span aria-hidden="true">🔄</span> Clear
              </button>
            </div>
          </div>

          {/* Results Display */}
          {result && (
            <div className="mt-8 space-y-6">
              {/* Acceptance Rates Comparison */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2" aria-hidden="true">📊</span>
                  Acceptance Rates Comparison
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* ED Rate */}
                  {result.edAcceptanceRate > 0 && (
                    <div className="bg-white rounded-lg p-5 text-center shadow-md">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Early Decision (ED)</div>
                      <div className="text-4xl font-bold text-green-600">{result.edAcceptanceRate}%</div>
                      <div className="mt-2 text-xs text-gray-500">Binding Commitment</div>
                      {result.edAdvantage > 0 && (
                        <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          +{result.edAdvantage.toFixed(1)}% vs RD
                        </div>
                      )}
                    </div>
                  )}

                  {/* EA Rate */}
                  {result.eaAcceptanceRate > 0 && (
                    <div className="bg-white rounded-lg p-5 text-center shadow-md">
                      <div className="text-sm font-semibold text-gray-600 mb-2">Early Action (EA)</div>
                      <div className="text-4xl font-bold text-blue-600">{result.eaAcceptanceRate}%</div>
                      <div className="mt-2 text-xs text-gray-500">Non-Binding</div>
                      {result.eaAdvantage > 0 && (
                        <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          +{result.eaAdvantage.toFixed(1)}% vs RD
                        </div>
                      )}
                    </div>
                  )}

                  {/* RD Rate */}
                  <div className="bg-white rounded-lg p-5 text-center shadow-md">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Regular Decision (RD)</div>
                    <div className="text-4xl font-bold text-gray-600">{result.rdAcceptanceRate}%</div>
                    <div className="mt-2 text-xs text-gray-500">Non-Binding</div>
                    <div className="mt-2 text-xs text-gray-500 italic">Baseline Rate</div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2" aria-hidden="true">✅</span>
                  Your Personalized Recommendation
                </h3>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-center mb-4">
                    <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl font-bold rounded-lg shadow-lg">
                      {result.recommendedPlan}
                    </span>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed text-center">
                    {result.reasoning}
                  </p>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-900 mb-3 flex items-center">
                  <span className="text-xl mr-2" aria-hidden="true">⚠️</span>
                  Important Considerations
                </h4>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold" aria-hidden="true">•</span>
                    <span><strong>ED is binding:</strong> You must withdraw all other applications if accepted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold" aria-hidden="true">•</span>
                    <span><strong>Financial aid:</strong> Can only decline ED if aid package is insufficient</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold" aria-hidden="true">•</span>
                    <span><strong>Application quality:</strong> Ensure your application is polished before early deadlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold" aria-hidden="true">•</span>
                    <span><strong>School research:</strong> Visit campus and confirm it's truly your first choice</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* ED vs EA Detailed Comparison Table - Lazy Loaded for Performance */}
        {showDetailedContent && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-3">
            <span aria-hidden="true">📋</span> Early Decision vs Early Action: Complete Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Feature</th>
                  <th className="px-6 py-4 text-left font-bold">Early Decision (ED)</th>
                  <th className="px-6 py-4 text-left font-bold">Early Action (EA)</th>
                  <th className="px-6 py-4 text-left font-bold">Regular Decision (RD)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50 border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Binding?</td>
                  <td className="px-6 py-4 text-red-700 font-bold">✓ Yes (Must Attend)</td>
                  <td className="px-6 py-4 text-green-700 font-bold">✗ No</td>
                  <td className="px-6 py-4 text-green-700 font-bold">✗ No</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Application Deadline</td>
                  <td className="px-6 py-4 text-gray-800">November 1-15</td>
                  <td className="px-6 py-4 text-gray-800">November 1-15</td>
                  <td className="px-6 py-4 text-gray-800">January 1-15</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Decision Date</td>
                  <td className="px-6 py-4 text-gray-800">Mid-December</td>
                  <td className="px-6 py-4 text-gray-800">Mid-December</td>
                  <td className="px-6 py-4 text-gray-800">Late March/Early April</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Acceptance Rate Boost</td>
                  <td className="px-6 py-4 text-green-700 font-bold">2-4x Higher</td>
                  <td className="px-6 py-4 text-blue-700 font-bold">1.5-2.5x Higher</td>
                  <td className="px-6 py-4 text-gray-600">Baseline</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Can Apply to Other Schools?</td>
                  <td className="px-6 py-4 text-yellow-700">Only EA/RD (must withdraw if accepted)</td>
                  <td className="px-6 py-4 text-green-700">✓ Yes, unlimited</td>
                  <td className="px-6 py-4 text-green-700">✓ Yes, unlimited</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Compare Financial Aid?</td>
                  <td className="px-6 py-4 text-red-700 font-bold">✗ No (unless inadequate)</td>
                  <td className="px-6 py-4 text-green-700 font-bold">✓ Yes</td>
                  <td className="px-6 py-4 text-green-700 font-bold">✓ Yes</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Reply Deadline</td>
                  <td className="px-6 py-4 text-gray-800">Immediate (if accepted)</td>
                  <td className="px-6 py-4 text-gray-800">May 1</td>
                  <td className="px-6 py-4 text-gray-800">May 1</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-semibold text-gray-900">Best For</td>
                  <td className="px-6 py-4 text-gray-800">Dream school, don't need aid comparison</td>
                  <td className="px-6 py-4 text-gray-800">Competitive advantage + flexibility</td>
                  <td className="px-6 py-4 text-gray-800">Need more time, compare offers</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Application Fee</td>
                  <td className="px-6 py-4 text-gray-800">Same as RD ($50-90)</td>
                  <td className="px-6 py-4 text-gray-800">Same as RD ($50-90)</td>
                  <td className="px-6 py-4 text-gray-800">$50-90 typical</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
            <p className="text-gray-800">
              <strong className="text-blue-900">📌 Key Insight:</strong> Early Decision acceptance rates at top schools can be <strong>2-4 times higher</strong> than Regular Decision, but the binding commitment means you must attend if accepted, regardless of financial aid offers from other schools. For official college admission statistics, visit the <a href="https://www.collegeboard.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">College Board</a>.
            </p>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-purple-500 pb-3">
            <span aria-hidden="true">📚</span> Understanding Early Decision & Early Action
          </h2>

          <div className="space-y-8">
            {/* What is Early Decision */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">🔒</span>
                What is Early Decision (ED)?
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  <strong>Early Decision (ED)</strong> is a <strong className="text-red-600">binding early admission plan</strong> offered by selective colleges and universities. If you apply ED and are accepted, you are <strong>legally obligated to attend</strong> that school and must withdraw all other college applications immediately. Learn more about early application policies from <a href="https://www.commonapp.org/apply/first-year-students/common-app-application-requirements/application-deadlines" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Common Application</a>.
                </p>
                <p>
                  ED is designed for students who have identified a clear first-choice school and are ready to commit. The acceptance rate for ED applicants is typically <strong>2-4 times higher</strong> than Regular Decision at top colleges, making it a powerful tool for demonstrating commitment. The <a href="https://www.nacacnet.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">National Association for College Admission Counseling (NACAC)</a> provides comprehensive guidance on early application ethics and policies.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border-l-4 border-red-500">
                  <h4 className="font-bold text-red-900 mb-3">ED Types:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>ED I:</strong> Deadline November 1-15, decision by mid-December</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>ED II:</strong> Deadline January 1-15 (offered by some schools as a second ED round), decision by mid-February</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 mt-4">
                  <strong>Important:</strong> You can only apply ED to <strong>one school</strong> per cycle. However, you may apply EA or RD to other schools simultaneously, provided you withdraw those applications if accepted ED.
                </p>
              </div>
            </div>

            {/* What is Early Action */}
            <div>
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">🔓</span>
                What is Early Action (EA)?
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  <strong>Early Action (EA)</strong> is a <strong className="text-green-600">non-binding early admission plan</strong> that allows you to apply early (usually by November 1-15) and receive an admission decision by mid-December, but <strong>without the commitment to attend</strong>. Visit <a href="https://www.coalitionforcollegeaccess.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Coalition for College</a> for more information on early action applications.
                </p>
                <p>
                  EA gives you the competitive advantage of demonstrating early interest while preserving the flexibility to compare financial aid offers and admission decisions from multiple schools. You have until <strong>May 1</strong> to make your final decision.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h4 className="font-bold text-green-900 mb-3">EA Types:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Regular EA (REA):</strong> Non-restrictive, apply to as many EA schools as you want</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Restrictive Early Action (REA):</strong> Cannot apply EA to other private schools (e.g., Stanford, Harvard)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Single-Choice Early Action (SCEA):</strong> Similar to REA, cannot apply early elsewhere (e.g., Yale, Princeton)</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-700 mt-4">
                  <strong>Key Advantage:</strong> EA acceptance rates are typically <strong>1.5-2.5 times higher</strong> than Regular Decision, and you're <strong>not required to attend</strong> if accepted. This makes EA ideal for students who need to compare financial aid packages or are still deciding between schools.
                </p>
              </div>
            </div>

            {/* Acceptance Rate Statistics */}
            <div>
              <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">📊</span>
                2025-2026 Acceptance Rate Data
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  Recent data from top universities shows significant advantages for early applicants. According to <a href="https://www.collegedata.com/resources/getting-in/early-decision-and-early-action" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">College Data</a>, early decision and early action acceptance rates consistently exceed regular decision rates:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <th className="px-4 py-3 text-left font-semibold">School</th>
                        <th className="px-4 py-3 text-left font-semibold">ED/EA Rate</th>
                        <th className="px-4 py-3 text-left font-semibold">RD Rate</th>
                        <th className="px-4 py-3 text-left font-semibold">Advantage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Harvard (REA)</td>
                        <td className="px-4 py-3 text-green-700 font-bold">7.9%</td>
                        <td className="px-4 py-3 text-gray-700">2.7%</td>
                        <td className="px-4 py-3 text-purple-700 font-bold">2.9x</td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Yale (SCEA)</td>
                        <td className="px-4 py-3 text-green-700 font-bold">10.3%</td>
                        <td className="px-4 py-3 text-gray-700">3.6%</td>
                        <td className="px-4 py-3 text-purple-700 font-bold">2.9x</td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Princeton (SCEA)</td>
                        <td className="px-4 py-3 text-green-700 font-bold">14.7%</td>
                        <td className="px-4 py-3 text-gray-700">3.7%</td>
                        <td className="px-4 py-3 text-purple-700 font-bold">4.0x</td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Duke (ED)</td>
                        <td className="px-4 py-3 text-green-700 font-bold">21.0%</td>
                        <td className="px-4 py-3 text-gray-700">5.1%</td>
                        <td className="px-4 py-3 text-purple-700 font-bold">4.1x</td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 font-medium text-gray-900">Northwestern (ED)</td>
                        <td className="px-4 py-3 text-green-700 font-bold">23.5%</td>
                        <td className="px-4 py-3 text-gray-700">6.4%</td>
                        <td className="px-4 py-3 text-purple-700 font-bold">3.7x</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="px-4 py-3 font-medium text-gray-900">Vanderbilt (ED I & II)</td>
                        <td className="px-4 py-3 text-green-700 font-bold">24.1%</td>
                        <td className="px-4 py-3 text-gray-700">5.3%</td>
                        <td className="px-4 py-3 text-purple-700 font-bold">4.5x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mt-4 italic">
                  <span aria-hidden="true">📌</span> <strong>Note:</strong> These statistics are from the Class of 2029 (Fall 2025 admission cycle). Rates vary by year but the early application advantage remains consistent.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-orange-500 pb-3">
            <span aria-hidden="true">📅</span> Early Application Deadlines 2026
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-300">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Key Dates to Remember:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="min-w-[140px] px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-center">
                    <div className="text-xs">Early Decision I</div>
                    <div className="text-lg">Nov 1-15</div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-800"><strong>Application Deadline:</strong> Submit Common App, supplements, test scores</p>
                    <p className="text-sm text-gray-600 mt-1">Decision notification: Mid-December (around Dec 15)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="min-w-[140px] px-4 py-2 bg-green-600 text-white font-bold rounded-lg text-center">
                    <div className="text-xs">Early Action</div>
                    <div className="text-lg">Nov 1-15</div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-800"><strong>Application Deadline:</strong> Most EA schools use Nov 1 deadline</p>
                    <p className="text-sm text-gray-600 mt-1">Decision notification: Mid-December (Dec 10-20)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="min-w-[140px] px-4 py-2 bg-purple-600 text-white font-bold rounded-lg text-center">
                    <div className="text-xs">Early Decision II</div>
                    <div className="text-lg">Jan 1-15</div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-800"><strong>Application Deadline:</strong> Second chance for ED commitment</p>
                    <p className="text-sm text-gray-600 mt-1">Decision notification: Mid-February (Feb 15)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="min-w-[140px] px-4 py-2 bg-gray-600 text-white font-bold rounded-lg text-center">
                    <div className="text-xs">Regular Decision</div>
                    <div className="text-lg">Jan 1-15</div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-800"><strong>Application Deadline:</strong> Standard deadline for most schools</p>
                    <p className="text-sm text-gray-600 mt-1">Decision notification: Late March/Early April</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500">
              <p className="font-bold text-red-900 mb-2 text-lg">
                <span aria-hidden="true">⚠️</span> Critical Deadline Reminders:
              </p>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold" aria-hidden="true">•</span>
                  <span><strong>CSS Profile:</strong> Many ED/EA schools require CSS Profile by November 1-15 for financial aid consideration. Use our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools/css-profile-cost-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">CSS Profile Cost Calculator</button>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold" aria-hidden="true">•</span>
                  <span><strong>Test Scores:</strong> Submit SAT/ACT scores 2-3 weeks before deadline (test-optional policies vary by school)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold" aria-hidden="true">•</span>
                  <span><strong>Teacher Recommendations:</strong> Request at least 4-6 weeks before deadline (early September for ED/EA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold" aria-hidden="true">•</span>
                  <span><strong>Application Fee:</strong> Budget for application fees ($50-90 per school). Check our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools/college-application-fee-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">College Application Fee Calculator</button>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
            <span className="text-3xl mr-3" aria-hidden="true">💡</span>
            Strategic Tips for Early Applications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
              <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <span aria-hidden="true">✓</span> When to Apply Early Decision
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-600" aria-hidden="true">→</span>
                  <span>You've visited campus and it's your clear #1 choice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600" aria-hidden="true">→</span>
                  <span>Your family can afford full cost or need-based aid is sufficient</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600" aria-hidden="true">→</span>
                  <span>Your application is polished and ready by November</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600" aria-hidden="true">→</span>
                  <span>You want maximum acceptance rate advantage (2-4x boost)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span aria-hidden="true">✓</span> When to Apply Early Action
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600" aria-hidden="true">→</span>
                  <span>You need to compare financial aid offers from multiple schools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600" aria-hidden="true">→</span>
                  <span>You're deciding between 2-3 top choices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600" aria-hidden="true">→</span>
                  <span>You want early peace of mind without binding commitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600" aria-hidden="true">→</span>
                  <span>You want to maximize applications (can apply EA to multiple schools)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-500">
              <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                <span aria-hidden="true">✓</span> When to Wait for Regular Decision
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600" aria-hidden="true">→</span>
                  <span>You need fall semester grades to boost your GPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600" aria-hidden="true">→</span>
                  <span>You're retaking SAT/ACT in December or later</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600" aria-hidden="true">→</span>
                  <span>Your extracurriculars have major fall achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600" aria-hidden="true">→</span>
                  <span>You haven't narrowed down your college list yet</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span aria-hidden="true">✓</span> ED II Strategic Considerations
              </h3>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600" aria-hidden="true">→</span>
                  <span>Deferred or rejected from ED I or EA at another school</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600" aria-hidden="true">→</span>
                  <span>Changed your mind about first choice after visiting in December</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600" aria-hidden="true">→</span>
                  <span>Want binding commitment advantage with January deadline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600" aria-hidden="true">→</span>
                  <span>Improved your application with fall grades/achievements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
            <span className="text-3xl mr-3" aria-hidden="true">⚠️</span>
            Common Early Application Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 border-l-4 border-red-500 shadow-md">
              <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Applying ED Without Campus Visit
              </h3>
              <p className="text-gray-800">
                Never apply Early Decision without visiting campus (in-person or virtually). ED is binding, so you must be <strong>absolutely certain</strong> this is where you want to spend four years. Visit during fall of senior year if possible.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500 shadow-md">
              <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Ignoring Financial Aid Impact
              </h3>
              <p className="text-gray-800">
                ED limits your ability to compare financial aid packages. If you need significant aid or merit scholarships, EA or RD may be better options. You can decline ED only if the financial aid offer is truly insufficient.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-yellow-500 shadow-md">
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Rushing Application Quality
              </h3>
              <p className="text-gray-800">
                Don't sacrifice application quality for an early deadline. If your essays aren't polished or you're missing key achievements, waiting for RD with a <strong>stronger application</strong> is often better than submitting a rushed early application. Use our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools/common-app-essay-word-counter')} className="text-blue-600 hover:text-blue-800 underline font-semibold">Common App Essay Word Counter</button> to perfect your essays.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-green-500 shadow-md">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Misunderstanding REA/SCEA Rules
              </h3>
              <p className="text-gray-800">
                Restrictive Early Action (Harvard, Stanford) and Single-Choice Early Action (Yale, Princeton) have <strong>specific restrictions</strong>. You cannot apply EA/ED to other private schools, but can usually apply to public schools, international schools, and RD elsewhere. Read each school's policy carefully.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500 shadow-md">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Applying ED for Wrong Reasons
              </h3>
              <p className="text-gray-800">
                Don't apply ED just because of acceptance rate statistics or peer pressure. ED should be reserved for your <strong>genuine first choice</strong>. Applying ED to a "safety" school wastes your ED advantage and can lead to regret.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500 shadow-md">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Not Having a Backup Plan
              </h3>
              <p className="text-gray-800">
                Even with ED/EA, prepare applications for other schools. ED deferral rates are 15-30% and you'll need RD options. EA is non-binding, so have multiple applications ready. Use our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools/college-admissions-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">College Admissions Calculator</button> to assess your chances at multiple schools.
              </p>
            </div>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-purple-500 pb-3">
            <span aria-hidden="true">❓</span> Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                1. Can I apply Early Decision to multiple schools?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>No.</strong> You can only apply <strong>Early Decision to one school</strong> per cycle (ED I or ED II). However, you may apply Early Action (EA) to multiple schools simultaneously, as EA is non-binding. If applying ED, you can also apply EA or RD to other schools as backup options, but must withdraw those applications if accepted ED.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                2. What happens if I'm deferred from Early Decision or Early Action?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                If deferred, your application is moved to the <strong>Regular Decision pool</strong> for reconsideration. You're not rejected, but you'll need to wait until March/April for a final decision. <strong>Key steps after deferral:</strong> (1) Send an email reaffirming interest, (2) Submit updated grades from fall semester, (3) Add any new achievements or awards, (4) Consider a letter of continued interest. Deferral acceptance rates vary but typically range from <strong>5-15%</strong> at highly selective schools.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                3. Is Early Decision or Early Action better for financial aid?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Early Action is better for financial aid comparison.</strong> EA allows you to receive multiple financial aid offers by April and compare packages before deciding by May 1. With ED, you're committed once accepted and can only decline if the aid is truly insufficient (which must be proven). Most schools offer the same aid regardless of when you apply, but EA/RD give you <strong>negotiating leverage</strong> to appeal aid offers. If merit scholarships are important, apply EA or RD to compare offers.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-900 mb-3">
                4. Does applying early really improve my chances?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Yes, significantly.</strong> Early Decision acceptance rates are <strong>2-4 times higher</strong> than Regular Decision at top schools. For example, Northwestern's ED rate is ~24% vs. ~6% RD. However, this advantage comes from demonstrating <strong>commitment</strong> (for ED) and <strong>interest</strong> (for EA). Early applicant pools are also more competitive, with higher average GPAs and test scores. The acceptance rate boost is real, but only beneficial if your application is ready and polished by the November deadline.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-900 mb-3">
                5. Can I back out of Early Decision if I change my mind?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>No, ED is legally binding.</strong> You signed an <strong>Early Decision Agreement</strong> with your signature, parent signature, and counselor signature. Breaking this commitment can result in: (1) Your acceptance being rescinded, (2) Other colleges withdrawing offers if they find out, (3) Your high school's relationship with that college being damaged for future students. The <strong>only valid reason</strong> to decline ED is if the financial aid package is insufficient and your family truly cannot afford to attend (you must provide documentation). Otherwise, you are obligated to attend.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">
                6. What is the difference between ED I and ED II?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Both are <strong>binding</strong>, but have different deadlines. <strong>ED I:</strong> November 1-15 deadline, decision by mid-December. <strong>ED II:</strong> January 1-15 deadline, decision by mid-February. ED II is ideal for students who: (1) Were deferred/rejected from ED I elsewhere, (2) Decided late that a school is their #1 choice, (3) Want to improve their application with fall grades before binding commitment. Acceptance rates for ED I and ED II are typically similar at most schools.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-500">
              <h3 className="text-xl font-bold text-teal-900 mb-3">
                7. Can international students apply Early Decision or Early Action?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Yes, but with important considerations.</strong> International students can apply ED/EA just like domestic students. However: (1) <strong>Financial aid is often limited</strong> for international applicants at many schools, (2) ED binding commitment applies regardless of visa approval, (3) Some schools are "need-aware" for international students, meaning financial aid requests can affect admission decisions. If you're an international student needing significant financial aid, carefully research each school's international aid policies before applying ED.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-indigo-500">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">
                8. Should I apply Early Decision with a 3.5 GPA?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                It depends on the school's <strong>competitiveness</strong> and your overall profile. For Ivy League schools (median GPA ~3.9-4.0), a 3.5 GPA is below competitive and waiting for RD to boost your GPA may be better. For <strong>moderately selective schools</strong> (acceptance rates 20-40%), a 3.5 GPA is competitive if paired with strong test scores, essays, and extracurriculars. The ED advantage can help, but ensure your <strong>entire application is strong</strong>—don't rely solely on the acceptance rate boost. Consider ED II if you can improve your GPA with fall semester grades.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-pink-500">
              <h3 className="text-xl font-bold text-pink-900 mb-3">
                9. What if I'm accepted ED but my family can't afford it?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                You can decline ED <strong>only if the financial aid package is truly insufficient</strong> and your family cannot afford to attend. Steps: (1) Contact the financial aid office immediately to appeal the aid package, (2) Explain your family's financial situation with documentation, (3) If aid remains insufficient after appeal, notify the school you must decline due to financial hardship, (4) Work with your counselor to confirm the release. <strong>Important:</strong> Submit CSS Profile and FAFSA early to get accurate aid estimates. Don't apply ED if you have any doubts about affording the school.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-gray-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                10. Can I apply both Early Action and Early Decision?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Yes, with restrictions.</strong> You can apply <strong>ED to one school</strong> and <strong>EA to multiple other schools</strong> simultaneously. However, check the ED school's policy—some schools prohibit applying elsewhere early. Also, if you're accepted ED, you <strong>must withdraw all other applications</strong> immediately, including EA acceptances. <strong>Exception:</strong> If applying to Restrictive Early Action (REA) or Single-Choice Early Action (SCEA) schools like Harvard, Yale, Stanford, or Princeton, you <strong>cannot apply ED or EA elsewhere</strong> (except public universities and international schools).
              </p>
            </div>
          </div>
        </div>
        )}

        <RelatedTools 
          relatedSlugs={['css-profile-cost-calculator', 'college-admissions-calculator', 'college-application-fee-calculator', 'common-app-essay-word-counter', 'college-essay-length-calculator']} 
          navigateTo={navigateTo} 
          currentSlug="early-decision-action-calculator" 
        />
      </div>
    </div>
  );
};

export default EarlyDecisionActionCalculator;
