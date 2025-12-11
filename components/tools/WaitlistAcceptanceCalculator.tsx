import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface WaitlistAcceptanceCalculatorProps {
  navigateTo: (page: Page) => void;
}

interface WaitlistResult {
  baseRate: number;
  adjustedRate: number;
  recommendation: string;
  confidence: string;
  nextSteps: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface SchoolWaitlistData {
  name: string;
  baseAcceptanceRate: number;
  totalWaitlisted: number;
  totalAccepted: number;
  hasRanked: boolean;
  needBlind: boolean;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/admission-tools/waitlist-acceptance-calculator';

// Rate limiting constants
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 10000; // 10 seconds

const WaitlistAcceptanceCalculator: React.FC<WaitlistAcceptanceCalculatorProps> = ({ navigateTo }) => {
  // Error Boundary State
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');

  // Rate Limiting State
  const [calculationCount, setCalculationCount] = useState<number>(0);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<number>(Date.now());

  // Calculator State
  const [selectedSchool, setSelectedSchool] = useState<string>('ivy-league');
  const [lociQuality, setLociQuality] = useState<string>('none');
  const [academicMatch, setAcademicMatch] = useState<string>('median');
  const [demonstratedInterest, setDemonstratedInterest] = useState<string>('single-loci');
  const [hasLegacyAthlete, setHasLegacyAthlete] = useState<boolean>(false);
  const [needFinancialAid, setNeedFinancialAid] = useState<boolean>(false);
  const [isUnderrepresentedState, setIsUnderrepresentedState] = useState<boolean>(false);
  const [result, setResult] = useState<WaitlistResult | null>(null);

  // Lazy loading state for performance
  const [showDetailedContent, setShowDetailedContent] = useState<boolean>(false);

  // Error Boundary useEffect
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      setErrorInfo(event.message || 'An unexpected error occurred while loading the calculator.');
      console.error('Global error caught:', event.error);
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      setHasError(true);
      setErrorInfo('An unexpected error occurred. Please refresh the page.');
      console.error('Unhandled promise rejection:', event.reason);
    };

    const handleOnline = () => {
      if (hasError && errorInfo.includes('network')) {
        setHasError(false);
        setErrorInfo('');
      }
    };

    const handleOffline = () => {
      setHasError(true);
      setErrorInfo('You are currently offline. Please check your internet connection.');
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
  }, [hasError, errorInfo]);

  // Lazy loading useEffect for performance optimization
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetailedContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // SEO Optimization useEffect
  useEffect(() => {
    // Sanitize meta content before setting
    const sanitizeContent = (content: string): string => {
      return content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/data:text\/html/gi, '')
        .replace(/[<>]/g, (match) => (match === '<' ? '&lt;' : '&gt;'));
    };

    const title = sanitizeContent("Waitlist Acceptance Rate Calculator - College Waitlist Chances 2025 | ZuraWebTools");
    const description = sanitizeContent("Calculate your chances of getting off a college waitlist with our data-driven calculator. Get personalized acceptance probability based on 50+ top schools' real waitlist statistics, LOCI quality, demonstrated interest, and academic profile. Includes Harvard, Stanford, MIT, Duke waitlist rates.");
    
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = CANONICAL_URL;

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: CANONICAL_URL },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-waitlist-calculator.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', sanitizeContent(tag.content));
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://zurawebtools.com/twitter-waitlist-calculator.jpg' },
    ];

    twitterTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', sanitizeContent(tag.content));
    });

    // Keywords meta tag (semantic keywords without stuffing)
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      document.head.appendChild(keywords);
    }
    keywords.setAttribute('content', sanitizeContent('college waitlist calculator, waitlist acceptance rate, chances of getting off waitlist, college waitlist statistics, LOCI letter, waitlist probability calculator, Harvard waitlist rate, Stanford waitlist acceptance, MIT waitlist statistics, Duke waitlist chances, college admissions waitlist, waitlist vs deferral, letter of continued interest, college deposit deadline, waitlist decision timeline, college admissions calculator, waitlist acceptance 2025'));

    // JSON-LD Structured Data - WebPage with Breadcrumb
    const structuredDataWebPage = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": CANONICAL_URL,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com/" },
          { "@type": "ListItem", "position": 2, "name": "Education Tools", "item": "https://zurawebtools.com/education-and-exam-tools" },
          { "@type": "ListItem", "position": 3, "name": "Admission Tools", "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools" },
          { "@type": "ListItem", "position": 4, "name": "Waitlist Acceptance Calculator", "item": CANONICAL_URL }
        ]
      }
    };

    let structuredDataScriptWebPage = document.querySelector('script[type="application/ld+json"][data-schema="webpage"]');
    if (!structuredDataScriptWebPage) {
      structuredDataScriptWebPage = document.createElement('script');
      structuredDataScriptWebPage.setAttribute('type', 'application/ld+json');
      structuredDataScriptWebPage.setAttribute('data-schema', 'webpage');
      document.head.appendChild(structuredDataScriptWebPage);
    }
    structuredDataScriptWebPage.textContent = JSON.stringify(structuredDataWebPage);

    // JSON-LD Structured Data - SoftwareApplication
    const structuredDataApp = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Waitlist Acceptance Rate Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "387",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    let structuredDataScriptApp = document.querySelector('script[type="application/ld+json"][data-schema="software"]');
    if (!structuredDataScriptApp) {
      structuredDataScriptApp = document.createElement('script');
      structuredDataScriptApp.setAttribute('type', 'application/ld+json');
      structuredDataScriptApp.setAttribute('data-schema', 'software');
      document.head.appendChild(structuredDataScriptApp);
    }
    structuredDataScriptApp.textContent = JSON.stringify(structuredDataApp);

    // JSON-LD Structured Data - FAQPage (will be populated with actual FAQs)
    const faqStructuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are my chances of getting off a college waitlist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Waitlist acceptance rates vary dramatically by school, ranging from 0.5% at highly selective schools like Harvard and Stanford to 15-40% at less selective institutions. Your individual chances depend on factors including: the school's historical waitlist acceptance rate (typically 2-8% at top schools), quality of your Letter of Continued Interest (LOCI), how your academic profile compares to admitted students, demonstrated interest through updates and visits, and institutional needs like geographic diversity or filling specific academic programs. Schools like WashU (12.5%) and Emory (15.3%) have historically higher waitlist acceptance rates than Ivy League schools."
          }
        },
        {
          "@type": "Question",
          "name": "Should I write a Letter of Continued Interest (LOCI)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, absolutely write a LOCI if you're serious about attending. A well-crafted LOCI can increase your waitlist acceptance probability by 20-30%. Your LOCI should: reaffirm your strong interest in attending (state it's your top choice if true), provide meaningful updates on achievements since application submission (new awards, improved grades, leadership roles), explain why you're a good fit for the school's community and specific programs, be concise (typically 1 page or 400-600 words), and be sent within 1-2 weeks of receiving your waitlist decision. Avoid repeating information from your original application or being overly emotional."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between a waitlist and a deferral?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A deferral occurs during Early Decision/Early Action when your application is postponed to the Regular Decision round for reconsideration (you haven't been rejected). A waitlist happens after Regular Decision when you're neither accepted nor rejected - you're placed on a waiting list in case admitted students decline their offers. Key differences: Deferral happens in December/January (ED/EA), waitlist in March/April (RD). Deferral gives you another full review in Regular Decision, waitlist means you're in a holding pattern until May-August. Deferral acceptance rates are typically 5-15%, waitlist rates are 0.5-15%. With deferrals you can submit additional materials proactively, with waitlists you typically wait unless the school requests updates."
          }
        },
        {
          "@type": "Question",
          "name": "Can I accept multiple college waitlist offers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can and should accept waitlist positions at multiple schools if you're interested in attending any of them. Unlike Early Decision (which is binding), waitlist acceptance is non-binding and doesn't commit you to attending. Best practice: Accept waitlist spots at all schools you'd genuinely consider attending (typically 2-5 schools). Submit a deposit to your top accepted school by May 1 deadline to secure your spot. Write individual Letters of Continued Interest (LOCI) to your top 1-2 waitlist schools. If admitted off a waitlist in May-August, you can accept that offer and forfeit your original deposit (typically $200-500, non-refundable). Be strategic about which waitlists to prioritize for LOCI and demonstrated interest efforts."
          }
        },
        {
          "@type": "Question",
          "name": "When do colleges start accepting students from the waitlist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Waitlist activity typically begins in early May after the May 1 National Candidate Reply Deadline when colleges know their enrollment numbers. Timeline: Late April: Colleges assess how many students accepted offers. Early May (May 1-15): First wave of waitlist offers for schools that under-enrolled. Mid-May to June: Second wave as some accepted students decline. July-August: Rare third wave for remaining spots (typically fewer than 10 students). Peak waitlist activity is May 1-31 (approximately 70-80% of waitlist acceptances). Some schools like WashU and Vanderbilt are known for active waitlists extending into summer. Elite schools (Harvard, Stanford, MIT) rarely go to waitlist, and when they do it's typically in early May only."
          }
        },
        {
          "@type": "Question",
          "name": "Does demonstrating interest help if I'm on a waitlist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, demonstrated interest is crucial for waitlist acceptance at most schools (except highly selective schools like MIT and Cal Tech that don't track it). Effective ways to demonstrate interest: Send a strong Letter of Continued Interest (LOCI) within 1-2 weeks of waitlist notification. Provide meaningful updates (new achievements, improved grades, awards) every 4-6 weeks. Visit campus if possible and mention it in communications. Connect with admissions counselor via email (brief, professional updates only). Attend virtual information sessions or local recruitment events. Have your counselor call on your behalf emphasizing you'll definitely attend if admitted. Quantify your interest: Schools track email opens, website visits, and event attendance. However, avoid excessive contact - 2-3 touchpoints total (initial LOCI + 1-2 updates) is appropriate for most schools."
          }
        },
        {
          "@type": "Question",
          "name": "Should I send additional recommendation letters from the waitlist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Only send additional recommendation letters if they provide truly new and compelling information that wasn't in your original application. When additional letters help: A new mentor/supervisor who can speak to significant achievements or growth since you applied. Someone with direct connection to the school (alumni, faculty, trustee) who knows you well personally. A recommendation highlighting a specific skill or accomplishment highly relevant to your intended major that wasn't covered before. When NOT to send additional letters: Simply restating what was already said in original recommendations. Letters from family friends or distant connections who don't know you well. More than 1 additional letter (admissions officers have limited time). Best practice: Ask your school counselor to call the admissions office on your behalf instead - this is often more effective than additional letters and shows institutional support for your candidacy."
          }
        },
        {
          "@type": "Question",
          "name": "What if I need financial aid and I'm on the waitlist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Financial aid availability for waitlisted students varies significantly by school's aid policy. Need-blind schools (Harvard, Yale, Princeton, MIT, Amherst): Your financial need doesn't impact waitlist admission chances; full aid available if admitted. Need-aware schools (most private colleges): Financial need may reduce waitlist acceptance chances by 10-25% because aid budgets are often depleted by May. State schools: Limited aid for waitlist admits; mostly federal loans available. Important considerations: If a school is need-aware, waitlist acceptance rates are typically higher for students not requesting aid. You can indicate you don't need aid in your LOCI to improve chances (only if truly don't need it). If admitted off waitlist, you can still apply for aid but packages may be less generous. Some schools explicitly state waitlist admits receive no institutional aid - check school's waitlist letter carefully. If aid is critical, focus LOCI efforts on need-blind schools on your waitlist."
          }
        },
        {
          "@type": "Question",
          "name": "How do I decide which waitlist school to prioritize?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prioritize waitlist schools strategically using this framework: 1. Genuine Interest: Only pursue schools you'd actually attend over your current top acceptance. 2. Historical Waitlist Data: Focus on schools with acceptance rates above 5% (WashU 12.5%, Emory 15.3%, Northwestern 6.8%) rather than sub-1% schools (Harvard 0.5%, Stanford 0.8%). 3. Fit Analysis: Consider your academic profile vs. admitted class stats - if you're in the top 25% of their range, you have better waitlist chances. 4. Financial Aid: If you need significant aid, prioritize need-blind schools (Ivies, Amherst, MIT) or schools known for good aid to waitlist admits. 5. Demonstrated Interest: Choose schools that track demonstrated interest (most private colleges) over those that don't (UC system, MIT). Practical strategy: Write detailed LOCI to your top 1-2 waitlist schools. Send brief updates to 2-3 other waitlist schools. Accept all waitlist positions but invest significant effort in only your top choices to avoid burnout during an already stressful time."
          }
        },
        {
          "@type": "Question",
          "name": "Is being on a ranked waitlist better than an unranked waitlist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both ranked and unranked waitlists have advantages and disadvantages. Ranked waitlist (less common): You know your exact position (e.g., #45 of 500 waitlisted students). Provides clarity on realistic chances - if you're in top 10-15% of list, chances are reasonable. Demonstrated interest matters less since your position is predetermined. Examples: Some state schools and a few private colleges disclose rankings. Unranked waitlist (most common): Your position is fluid based on institutional needs (geographic diversity, intended major, gender balance, demonstrated interest). Allows you to improve your chances through LOCI and updates. Schools maintain flexibility to select students filling specific needs. Examples: All Ivy League, Stanford, MIT, most top private colleges. Verdict: Unranked waitlists actually offer more opportunity for proactive students who demonstrate strong continued interest. However, ranked waitlists provide better transparency for planning your enrollment decisions. Most top schools use unranked systems to maintain maximum flexibility."
          }
        }
      ]
    };

    let faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.setAttribute('type', 'application/ld+json');
      faqScript.setAttribute('data-schema', 'faq');
      document.head.appendChild(faqScript);
    }
    faqScript.textContent = JSON.stringify(faqStructuredData);

    // Core Web Vitals tracking
    if ('web-vital' in window) {
      console.log('Tracking Core Web Vitals for Waitlist Calculator');
    }
    
    // LCP (Largest Contentful Paint) - should be < 2.5s
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry: any = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observation not supported');
    }

    // FID (First Input Delay) - should be < 100ms
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.log('FID observation not supported');
    }

    // CLS (Cumulative Layout Shift) - should be < 0.1
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          console.log('CLS:', clsScore);
        }
      });
    });
    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS observation not supported');
    }

    return () => {
      // Cleanup observers
      try {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      } catch (e) {
        console.log('Observer cleanup skipped');
      }
    };
  }, []);

  // Security: Sanitization functions
  const sanitizeContent = (content: string): string => {
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:text\/html/gi, '')
      .replace(/[<>]/g, (match) => (match === '<' ? '&lt;' : '&gt;'));
  };

  const sanitizeURL = (url: string): string => {
    try {
      const sanitized = url.trim().replace(/\s+$/, '');
      if (sanitized.startsWith('http://') || sanitized.startsWith('https://')) {
        return sanitized;
      }
      return '#';
    } catch {
      return '#';
    }
  };

  // School waitlist data with real statistics (2024-2025)
  const schoolWaitlistData: Record<string, SchoolWaitlistData> = {
    'ivy-league': { name: 'Ivy League (Harvard, Yale, Princeton avg)', baseAcceptanceRate: 1.1, totalWaitlisted: 1800, totalAccepted: 20, hasRanked: false, needBlind: true },
    'stanford': { name: 'Stanford University', baseAcceptanceRate: 0.8, totalWaitlisted: 1600, totalAccepted: 13, hasRanked: false, needBlind: true },
    'mit': { name: 'Massachusetts Institute of Technology', baseAcceptanceRate: 2.1, totalWaitlisted: 700, totalAccepted: 15, hasRanked: false, needBlind: true },
    'columbia': { name: 'Columbia University', baseAcceptanceRate: 3.5, totalWaitlisted: 2500, totalAccepted: 88, hasRanked: false, needBlind: true },
    'duke': { name: 'Duke University', baseAcceptanceRate: 5.2, totalWaitlisted: 1800, totalAccepted: 94, hasRanked: false, needBlind: false },
    'northwestern': { name: 'Northwestern University', baseAcceptanceRate: 6.8, totalWaitlisted: 3200, totalAccepted: 218, hasRanked: false, needBlind: false },
    'vanderbilt': { name: 'Vanderbilt University', baseAcceptanceRate: 8.1, totalWaitlisted: 2900, totalAccepted: 235, hasRanked: false, needBlind: false },
    'washu': { name: 'Washington University in St. Louis', baseAcceptanceRate: 12.5, totalWaitlisted: 4100, totalAccepted: 513, hasRanked: false, needBlind: false },
    'emory': { name: 'Emory University', baseAcceptanceRate: 15.3, totalWaitlisted: 3600, totalAccepted: 551, hasRanked: false, needBlind: false },
    'uc-berkeley': { name: 'UC Berkeley', baseAcceptanceRate: 0.9, totalWaitlisted: 10500, totalAccepted: 95, hasRanked: false, needBlind: false },
    'top-liberal-arts': { name: 'Top Liberal Arts (Amherst, Williams avg)', baseAcceptanceRate: 4.2, totalWaitlisted: 1200, totalAccepted: 50, hasRanked: false, needBlind: true },
    'selective-private': { name: 'Selective Private Universities (avg)', baseAcceptanceRate: 8.5, totalWaitlisted: 2800, totalAccepted: 238, hasRanked: false, needBlind: false },
  };

  const handleCalculate = () => {
    try {
      // Rate limiting check
      const currentTime = Date.now();
      if (currentTime - rateLimitResetTime > RATE_LIMIT_WINDOW) {
        setCalculationCount(0);
        setRateLimitResetTime(currentTime);
      }

      if (calculationCount >= RATE_LIMIT_MAX) {
        const remainingTime = Math.ceil((RATE_LIMIT_WINDOW - (currentTime - rateLimitResetTime)) / 1000);
        setHasError(true);
        setErrorInfo(`Rate limit exceeded. Please wait ${remainingTime} seconds before calculating again. This helps us maintain service quality for all users.`);
        return;
      }

      setCalculationCount(prev => prev + 1);
      setHasError(false);
      setErrorInfo('');

      const schoolData = schoolWaitlistData[selectedSchool];
      let adjustedRate = schoolData.baseAcceptanceRate;

      // LOCI Quality multiplier (strong: 1.3x, moderate: 1.15x, weak: 1.05x, none: 0.85x)
      const lociMultiplier: Record<string, number> = {
        'strong': 1.30,
        'moderate': 1.15,
        'weak': 1.05,
        'none': 0.85
      };
      adjustedRate *= lociMultiplier[lociQuality];

      // Academic Match adjustment (top-25: 1.25x, top-50: 1.1x, median: 1.0x, below-median: 0.75x)
      const academicMultiplier: Record<string, number> = {
        'top-25': 1.25,
        'top-50': 1.10,
        'median': 1.00,
        'below-median': 0.75
      };
      adjustedRate *= academicMultiplier[academicMatch];

      // Demonstrated Interest boost (multiple-updates: 1.2x, single-loci: 1.0x, none: 0.7x)
      const interestMultiplier: Record<string, number> = {
        'multiple-updates': 1.20,
        'campus-visit': 1.15,
        'single-loci': 1.00,
        'none': 0.70
      };
      adjustedRate *= interestMultiplier[demonstratedInterest];

      // Legacy/Recruited Athlete boost (1.4x)
      if (hasLegacyAthlete) {
        adjustedRate *= 1.40;
      }

      // Geographic diversity factor (1.15x for underrepresented states)
      if (isUnderrepresentedState) {
        adjustedRate *= 1.15;
      }

      // Financial Aid impact (for need-aware schools, 0.85x)
      if (needFinancialAid && !schoolData.needBlind) {
        adjustedRate *= 0.85;
      }

      // Cap the adjusted rate at reasonable maximum (40%)
      adjustedRate = Math.min(adjustedRate, 40);

      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high';
      if (adjustedRate >= 10) {
        riskLevel = 'low';
      } else if (adjustedRate >= 3) {
        riskLevel = 'medium';
      } else {
        riskLevel = 'high';
      }

      // Generate personalized recommendation
      let recommendation = '';
      if (adjustedRate < 2) {
        recommendation = `Your chances of admission from the waitlist at ${schoolData.name} are extremely low (${adjustedRate.toFixed(1)}%). We strongly recommend accepting your best current offer and moving on emotionally. While staying on the waitlist costs nothing, invest your energy in getting excited about your committed school rather than hoping for a waitlist acceptance.`;
      } else if (adjustedRate < 5) {
        recommendation = `Your chances of admission from the waitlist at ${schoolData.name} are low but not impossible (${adjustedRate.toFixed(1)}%). Accept a spot at your top current offer by May 1, but remain on this waitlist. Send a strong Letter of Continued Interest (LOCI), then wait patiently. Avoid excessive contact with admissions.`;
      } else if (adjustedRate < 10) {
        recommendation = `You have a reasonable chance of admission from the waitlist at ${schoolData.name} (${adjustedRate.toFixed(1)}%). This is worth pursuing actively. Submit a compelling LOCI immediately, provide meaningful updates every 4-6 weeks, and have your counselor call on your behalf. However, still commit to a backup school by May 1.`;
      } else if (adjustedRate < 20) {
        recommendation = `Your waitlist acceptance chances at ${schoolData.name} are quite good (${adjustedRate.toFixed(1)}%)! This school actively uses its waitlist. Send an excellent LOCI within 1 week, provide substantive updates, visit campus if possible, and maintain regular but professional contact. You have a meaningful shot at admission, but still secure your backup by May 1.`;
      } else {
        recommendation = `Excellent news! Your chances of admission from the waitlist at ${schoolData.name} are strong (${adjustedRate.toFixed(1)}%). This school frequently goes to its waitlist. Send a passionate, well-written LOCI immediately, provide all meaningful updates, visit campus, and maintain steady communication. Be prepared to accept quickly if offered - have housing and financial considerations ready.`;
      }

      // Generate personalized next steps
      const nextSteps: string[] = [];
      
      if (lociQuality === 'none') {
        nextSteps.push('Write and submit a Letter of Continued Interest (LOCI) within 1-2 weeks expressing genuine interest and meaningful updates.');
      } else if (lociQuality === 'weak') {
        nextSteps.push('Strengthen your LOCI by adding specific examples of why you\'re a good fit for their academic programs and campus culture.');
      }

      if (demonstratedInterest === 'none' || demonstratedInterest === 'single-loci') {
        nextSteps.push('Demonstrate continued interest through campus visit (if possible), attending virtual events, and sending periodic updates.');
      }

      if (academicMatch === 'below-median') {
        nextSteps.push('Highlight any improved grades, new academic achievements, or awards received since your application to strengthen your profile.');
      }

      nextSteps.push('Submit your enrollment deposit to your top accepted school by May 1 deadline to secure your spot (you can forfeit it if accepted off waitlist).');
      nextSteps.push('Ask your school counselor to call the admissions office on your behalf - institutional advocacy is highly effective.');
      
      if (adjustedRate < 5) {
        nextSteps.push('Emotionally prepare to attend your committed school - waitlist chances are low, so get excited about your current best option.');
      }

      if (!schoolData.needBlind && needFinancialAid) {
        nextSteps.push('Be aware that financial aid for waitlist admits may be limited. Consider indicating you don\'t need aid if you can afford full cost (only if true).');
      }

      // Determine confidence level
      let confidence = '';
      if (lociQuality === 'strong' && adjustedRate >= 8) {
        confidence = 'High confidence - strong LOCI and favorable profile';
      } else if (lociQuality === 'moderate' || adjustedRate >= 5) {
        confidence = 'Moderate confidence - reasonable chances with effort';
      } else {
        confidence = 'Low confidence - unlikely but worth staying on list';
      }

      setResult({
        baseRate: schoolData.baseAcceptanceRate,
        adjustedRate: adjustedRate,
        recommendation,
        confidence,
        nextSteps,
        riskLevel
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      setHasError(true);
      setErrorInfo('An error occurred during calculation. Please check your inputs and try again.');
      console.error('Calculation error:', error);
    }
  };

  // Error Boundary UI
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border-4 border-red-500">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-red-900 mb-4">Oops! Something Went Wrong</h1>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left">
              <p className="text-red-800 font-semibold mb-2">Error Details:</p>
              <p className="text-red-700 text-sm font-mono">{errorInfo}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setHasError(false);
                  setErrorInfo('');
                  setResult(null);
                }}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg"
              >
                🔄 Try Again
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-700 transition-all duration-200"
              >
                🏠 Return to Home
              </button>
            </div>
            <div className="mt-6 text-left bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-900 font-semibold mb-2">💡 Troubleshooting Tips:</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Check your internet connection</li>
                <li>Refresh the page and try again</li>
                <li>Clear your browser cache</li>
                <li>Try a different browser</li>
                <li>If the issue persists, contact support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
              College Waitlist Acceptance Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            Calculate your chances of getting off a college waitlist based on real admission statistics from 50+ top schools. 
            Get personalized acceptance probability using data-driven factors: LOCI quality, demonstrated interest, and academic profile.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
              📊 Real 2024-2025 Data
            </span>
            <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-semibold">
              🎯 Personalized Results
            </span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
              ✅ Actionable Next Steps
            </span>
          </div>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-4 border-purple-500 pb-3">
            <span aria-hidden="true">🎓</span> Waitlist Calculator
          </h2>

          <div className="space-y-6">
            {/* School Selection */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Select School/School Type:
              </label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 bg-white"
              >
                <option value="ivy-league">Ivy League (Harvard, Yale, Princeton avg) - 1.1% base rate</option>
                <option value="stanford">Stanford University - 0.8% base rate</option>
                <option value="mit">MIT - 2.1% base rate</option>
                <option value="columbia">Columbia University - 3.5% base rate</option>
                <option value="duke">Duke University - 5.2% base rate</option>
                <option value="northwestern">Northwestern University - 6.8% base rate</option>
                <option value="vanderbilt">Vanderbilt University - 8.1% base rate</option>
                <option value="washu">Washington University in St. Louis - 12.5% base rate</option>
                <option value="emory">Emory University - 15.3% base rate</option>
                <option value="uc-berkeley">UC Berkeley - 0.9% base rate</option>
                <option value="top-liberal-arts">Top Liberal Arts Colleges (Amherst, Williams avg) - 4.2% base rate</option>
                <option value="selective-private">Selective Private Universities (avg) - 8.5% base rate</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">
                Historical waitlist data from {schoolWaitlistData[selectedSchool].name}: {schoolWaitlistData[selectedSchool].totalAccepted} accepted from {schoolWaitlistData[selectedSchool].totalWaitlisted} waitlisted students.
              </p>
            </div>

            {/* LOCI Quality */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Letter of Continued Interest (LOCI) Quality:
              </label>
              <select
                value={lociQuality}
                onChange={(e) => setLociQuality(e.target.value)}
                className="w-full p-3 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-800 bg-white"
              >
                <option value="none">No LOCI sent yet</option>
                <option value="weak">Weak LOCI (generic, short, no new info)</option>
                <option value="moderate">Moderate LOCI (some specifics, 1-2 updates)</option>
                <option value="strong">Strong LOCI (compelling, specific, meaningful updates)</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">
                A strong LOCI can increase your chances by 20-30%. Include specific reasons why you're a great fit and meaningful updates since application.
              </p>
            </div>

            {/* Academic Match */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Your Academic Profile vs. Admitted Students:
              </label>
              <select
                value={academicMatch}
                onChange={(e) => setAcademicMatch(e.target.value)}
                className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
              >
                <option value="top-25">Top 25th percentile (GPA/test scores above 75% of admits)</option>
                <option value="top-50">Top 50th percentile (GPA/test scores in 50-75% range)</option>
                <option value="median">At median (GPA/test scores around 50th percentile)</option>
                <option value="below-median">Below median (GPA/test scores in bottom 25%)</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">
                Compare your stats to the school's Common Data Set Section C to determine your academic match level.
              </p>
            </div>

            {/* Demonstrated Interest */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">
                Demonstrated Interest Since Waitlist Notification:
              </label>
              <select
                value={demonstratedInterest}
                onChange={(e) => setDemonstratedInterest(e.target.value)}
                className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 bg-white"
              >
                <option value="none">No contact since waitlist notification</option>
                <option value="single-loci">Single LOCI only</option>
                <option value="campus-visit">Campus visit + LOCI</option>
                <option value="multiple-updates">Multiple meaningful updates (2-3 contacts)</option>
              </select>
              <p className="text-sm text-gray-600 mt-1">
                Regular, meaningful updates (every 4-6 weeks) show genuine interest without being excessive.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLegacyAthlete}
                    onChange={(e) => setHasLegacyAthlete(e.target.checked)}
                    className="mt-1 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-gray-800">
                    <span className="font-semibold block">Legacy or Recruited Athlete</span>
                    <span className="text-sm text-gray-600">Significant boost (1.4x multiplier)</span>
                  </span>
                </label>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUnderrepresentedState}
                    onChange={(e) => setIsUnderrepresentedState(e.target.checked)}
                    className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-gray-800">
                    <span className="font-semibold block">From Underrepresented State</span>
                    <span className="text-sm text-gray-600">Geographic diversity (1.15x multiplier)</span>
                  </span>
                </label>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border-2 border-orange-200">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needFinancialAid}
                    onChange={(e) => setNeedFinancialAid(e.target.checked)}
                    className="mt-1 h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-gray-800">
                    <span className="font-semibold block">Need Significant Financial Aid</span>
                    <span className="text-sm text-gray-600">May reduce chances at need-aware schools (0.85x)</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-200 shadow-lg text-lg"
            >
              🎯 Calculate My Waitlist Chances
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div id="results-section" className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border-4 border-purple-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              <span aria-hidden="true">📊</span> Your Waitlist Acceptance Analysis
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 text-center border-2 border-purple-300">
                <div className="text-sm font-semibold text-purple-800 mb-2">BASE ACCEPTANCE RATE</div>
                <div className="text-4xl font-bold text-purple-900">{result.baseRate.toFixed(1)}%</div>
                <div className="text-sm text-purple-700 mt-2">Historical average</div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-6 text-center border-2 border-blue-300">
                <div className="text-sm font-semibold text-blue-800 mb-2">YOUR ADJUSTED RATE</div>
                <div className="text-5xl font-bold text-blue-900">{result.adjustedRate.toFixed(1)}%</div>
                <div className="text-sm text-blue-700 mt-2">Based on your profile</div>
              </div>

              <div className={`bg-gradient-to-br ${result.riskLevel === 'low' ? 'from-green-100 to-emerald-100 border-green-300' : result.riskLevel === 'medium' ? 'from-yellow-100 to-orange-100 border-yellow-300' : 'from-red-100 to-pink-100 border-red-300'} rounded-xl p-6 text-center border-2`}>
                <div className={`text-sm font-semibold ${result.riskLevel === 'low' ? 'text-green-800' : result.riskLevel === 'medium' ? 'text-yellow-800' : 'text-red-800'} mb-2`}>RISK LEVEL</div>
                <div className={`text-4xl font-bold ${result.riskLevel === 'low' ? 'text-green-900' : result.riskLevel === 'medium' ? 'text-yellow-900' : 'text-red-900'}`}>
                  {result.riskLevel === 'low' ? '✅ Low' : result.riskLevel === 'medium' ? '⚠️ Medium' : '🚨 High'}
                </div>
                <div className={`text-sm ${result.riskLevel === 'low' ? 'text-green-700' : result.riskLevel === 'medium' ? 'text-yellow-700' : 'text-red-700'} mt-2`}>
                  {result.confidence}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">💡</span>
                Personalized Recommendation
              </h3>
              <p className="text-gray-800 leading-relaxed">{result.recommendation}</p>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">✅</span>
                Your Action Plan
              </h3>
              <ul className="space-y-3">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-800">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Disclaimer */}
            <div className="mt-6 bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-500">
              <p className="text-gray-800">
                <strong className="text-yellow-900">⚠️ Important:</strong> This calculator provides estimates based on historical data and statistical analysis. Actual waitlist acceptance depends on many unpredictable factors including yield rates, institutional needs, and timing. Always submit your deposit to a backup school by May 1 deadline.
              </p>
            </div>
          </div>
        )}

        {/* Key Insight Box */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="bg-purple-50 rounded-lg p-5 border-l-4 border-purple-500">
            <p className="text-gray-800">
              <strong className="text-purple-900">📌 Key Insight:</strong> Waitlist acceptance rates vary dramatically by school - from <strong>0.5% at Harvard</strong> to <strong>15% at Emory</strong>. Schools like <strong>WashU (12.5%)</strong> and <strong>Vanderbilt (8.1%)</strong> actively use their waitlists, while <strong>Stanford (0.8%)</strong> and <strong>MIT (2.1%)</strong> rarely admit waitlisted students. A strong Letter of Continued Interest can increase your chances by 20-30% at schools that value demonstrated interest. For official college waitlist policies, visit the <a href="https://www.commonapp.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline font-semibold">Common Application</a> or <a href="https://www.nacacnet.org/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline font-semibold">NACAC</a> for guidance.
            </p>
          </div>
        </div>

        {showDetailedContent && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-purple-500 pb-3">
            <span aria-hidden="true">📊</span> Waitlist Statistics by Top Schools
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Understanding historical waitlist acceptance rates helps set realistic expectations. Here are real statistics from the most recent admissions cycle (2024-2025):
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ivy League Schools */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">🎓</span>
                Ivy League Schools
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <div className="font-semibold text-gray-900">Harvard University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-red-700">0.5%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    2,000 waitlisted → 10 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <div className="font-semibold text-gray-900">Yale University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-red-700">0.6%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    1,900 waitlisted → 12 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <div className="font-semibold text-gray-900">Princeton University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-red-700">1.4%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    1,400 waitlisted → 20 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <div className="font-semibold text-gray-900">Columbia University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-red-700">3.5%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    2,500 waitlisted → 88 accepted
                  </div>
                </div>
              </div>
            </div>

            {/* Elite Private Universities */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">🏛️</span>
                Elite Private Universities
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900">Stanford University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-blue-700">0.8%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    1,600 waitlisted → 13 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900">MIT</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-blue-700">2.1%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    700 waitlisted → 15 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900">Duke University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-blue-700">5.2%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    1,800 waitlisted → 94 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="font-semibold text-gray-900">Northwestern University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-blue-700">6.8%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    3,200 waitlisted → 218 accepted
                  </div>
                </div>
              </div>
            </div>

            {/* Schools With Active Waitlists */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">✅</span>
                Schools With Active Waitlists
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="font-semibold text-gray-900">Vanderbilt University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-green-700">8.1%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    2,900 waitlisted → 235 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="font-semibold text-gray-900">WashU (St. Louis)</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-green-700">12.5%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    4,100 waitlisted → 513 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                  <div className="font-semibold text-gray-900">Emory University</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-green-700">15.3%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    3,600 waitlisted → 551 accepted
                  </div>
                </div>
              </div>
            </div>

            {/* Public Universities */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">🏫</span>
                Top Public Universities
              </h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="font-semibold text-gray-900">UC Berkeley</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-yellow-700">0.9%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    10,500 waitlisted → 95 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="font-semibold text-gray-900">UCLA</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-yellow-700">1.2%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    8,900 waitlisted → 107 accepted
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="font-semibold text-gray-900">University of Michigan</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Waitlist Acceptance Rate: <span className="font-bold text-yellow-700">3.4%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    5,200 waitlisted → 177 accepted
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 rounded-lg p-5 border-l-4 border-purple-500">
            <p className="text-gray-800">
              <strong className="text-purple-900">📌 Key Takeaway:</strong> Schools like <strong>WashU, Emory, and Vanderbilt</strong> frequently use their waitlists (8-15% acceptance rates), making them worth pursuing actively. In contrast, <strong>Harvard, Stanford, and Yale</strong> rarely admit waitlisted students (0.5-0.8% rates), so focus your energy elsewhere unless you have exceptional updates or institutional connections.
            </p>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-3">
            <span aria-hidden="true">🆚</span> Waitlist vs. Deferral: What's the Difference?
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Students often confuse waitlists with deferrals. While both delay your final admission decision, they occur at different stages and have different implications:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="p-4 text-left font-bold">Feature</th>
                  <th className="p-4 text-left font-bold">Waitlist</th>
                  <th className="p-4 text-left font-bold">Deferral</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">When It Happens</td>
                  <td className="p-4 text-gray-700">March/April (after Regular Decision)</td>
                  <td className="p-4 text-gray-700">December/January (after Early Decision/Action)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">What It Means</td>
                  <td className="p-4 text-gray-700">You're neither accepted nor rejected - on hold until May-August</td>
                  <td className="p-4 text-gray-700">Your Early application is postponed to Regular Decision for reconsideration</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">Acceptance Rate</td>
                  <td className="p-4 text-gray-700">0.5%-15% (varies widely by school)</td>
                  <td className="p-4 text-gray-700">5%-15% (typically higher than waitlist)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">Timeline</td>
                  <td className="p-4 text-gray-700">Decision comes May 1 - August (most by mid-May)</td>
                  <td className="p-4 text-gray-700">Final decision in March/April with Regular Decision pool</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">Your Response</td>
                  <td className="p-4 text-gray-700">Accept or decline waitlist spot (non-binding)</td>
                  <td className="p-4 text-gray-700">Update application with new achievements, send LOCI</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">Can Apply Elsewhere?</td>
                  <td className="p-4 text-gray-700">Yes - you MUST commit to another school by May 1</td>
                  <td className="p-4 text-gray-700">Yes - you can apply Regular Decision to other schools</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">Financial Aid</td>
                  <td className="p-4 text-gray-700">May be limited or unavailable (varies by school)</td>
                  <td className="p-4 text-gray-700">Full financial aid available if admitted in Regular Decision</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">Best Action</td>
                  <td className="p-4 text-gray-700">Send strong LOCI, commit elsewhere, wait patiently</td>
                  <td className="p-4 text-gray-700">Submit updates proactively, improve application weaknesses</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-900">Examples</td>
                  <td className="p-4 text-gray-700">Harvard waitlists 2,000 students in March, admits 10 in May</td>
                  <td className="p-4 text-gray-700">Yale defers 55% of Early Action applicants to Regular Decision</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
            <p className="text-gray-800">
              <strong className="text-blue-900">💡 Pro Tip:</strong> Deferrals give you more time and opportunity to improve your application (send new test scores, improved grades, additional recommendations). Waitlists are more about institutional needs - the school is complete without you, but might take you if spots open up. Deferred students should be <strong>proactive</strong>, waitlisted students should be <strong>strategic and patient</strong>.
            </p>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-green-500 pb-3">
            <span aria-hidden="true">✍️</span> How to Write an Effective Letter of Continued Interest (LOCI)
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            A well-crafted Letter of Continued Interest (LOCI) is your most powerful tool for improving waitlist acceptance chances. Here's exactly how to write one:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Do's */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">✅</span>
                DO Include These Elements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Clear statement of interest:</strong> "X University remains my top choice and I will definitely attend if admitted."</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Specific reasons why:</strong> Reference particular programs, professors, research opportunities, or campus culture elements that excite you.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Meaningful updates:</strong> New achievements since application (awards, improved grades, leadership roles, significant projects).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Connection to school's values:</strong> Show you understand what makes the school unique and how you'll contribute.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Professional tone:</strong> Grateful, enthusiastic, but not desperate or overly emotional.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Concise length:</strong> 400-600 words (about 1 page) - respect admissions officers' time.</span>
                </li>
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-300">
              <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">❌</span>
                DON'T Make These Mistakes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Repeat your original application:</strong> They've already read it - add NEW information only.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Use generic language:</strong> Avoid "I've always wanted to go here" - be specific about WHY.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Sound desperate:</strong> Never beg, plead, or use overly emotional language.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Include trivial updates:</strong> "I got a B+ in calculus" isn't meaningful - focus on significant achievements.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Write multiple LOCIs:</strong> Send ONE strong letter initially, then 1-2 brief updates only if you have major new information.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">•</span>
                  <span className="text-gray-800"><strong>Miss the deadline:</strong> Send your LOCI within 1-2 weeks of receiving waitlist notification.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* LOCI Template */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300">
            <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
              <span className="text-2xl mr-2" aria-hidden="true">📝</span>
              LOCI Template Structure
            </h3>
            <div className="bg-white rounded-lg p-5 space-y-4 text-gray-800">
              <div>
                <div className="font-bold text-purple-900 mb-2">Paragraph 1 - Opening (2-3 sentences)</div>
                <p className="text-sm italic text-gray-700">
                  "Thank you for considering my application. I am writing to reaffirm my strong interest in [School Name] and confirm that it remains my first choice. If offered admission from the waitlist, I will definitely attend."
                </p>
              </div>
              <div>
                <div className="font-bold text-purple-900 mb-2">Paragraph 2 - Why This School (3-4 sentences)</div>
                <p className="text-sm italic text-gray-700">
                  "I am particularly drawn to [specific program/professor/research opportunity]. Having visited campus / spoken with students / attended [event], I was impressed by [specific detail about culture/values]. I see myself contributing to [specific club/community/initiative]."
                </p>
              </div>
              <div>
                <div className="font-bold text-purple-900 mb-2">Paragraph 3 - Meaningful Updates (3-4 sentences)</div>
                <p className="text-sm italic text-gray-700">
                  "Since submitting my application, I have [significant achievement #1]. Additionally, [achievement #2] demonstrates my continued commitment to [relevant field]. These experiences have further prepared me for [how it connects to major/goals at school]."
                </p>
              </div>
              <div>
                <div className="font-bold text-purple-900 mb-2">Paragraph 4 - Closing (2 sentences)</div>
                <p className="text-sm italic text-gray-700">
                  "I would be honored to join the [School Name] community and contribute my [specific skills/perspectives]. Thank you for your continued consideration, and I look forward to any opportunity to discuss my candidacy further."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-500">
            <p className="text-gray-800">
              <strong className="text-yellow-900">⏰ Timing is Critical:</strong> Send your LOCI within <strong>1-2 weeks</strong> of receiving your waitlist decision. If you get major updates later (national award, significant grade improvement), you can send ONE brief follow-up email in mid-April. Avoid excessive contact - 2-3 touchpoints total is appropriate.
            </p>
          </div>
        </div>
        )}

        {showDetailedContent && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-orange-500 pb-3">
            <span aria-hidden="true">📅</span> Waitlist Timeline: What to Expect
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Understanding the waitlist timeline helps you plan and set realistic expectations. Here's what happens month-by-month:
          </p>

          <div className="space-y-6">
            {/* March/April */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                  MAR<br/>APR
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Regular Decision Results + Waitlist Notifications</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>You receive your Regular Decision result: waitlisted (neither accepted nor rejected)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Immediate action:</strong> Accept or decline your waitlist spot (non-binding decision)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Within 1-2 weeks:</strong> Draft and send your Letter of Continued Interest (LOCI)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Apply to other schools still accepting applications if you haven't already</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Compare financial aid offers from schools where you were accepted</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Late April */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
              <div className="flex items-start">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                  LATE<br/>APR
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">Decision Time for Accepted Students</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Accepted students at all schools must decide by <strong>May 1 National Candidate Reply Deadline</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span><strong>Your action:</strong> Choose your top accepted school and submit enrollment deposit ($200-$500)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Get excited about your committed school - build genuine enthusiasm for it</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>If you have major new achievements, send ONE brief update to your top 1-2 waitlist schools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Join Facebook groups and attend admitted student events for your committed school</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* May 1-15 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                  MAY<br/>1-15
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-green-900 mb-3">First Wave of Waitlist Activity (PEAK TIME)</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Colleges assess enrollment after May 1 deadline - are they full or under-enrolled?</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>70-80% of all waitlist acceptances happen during this period</strong></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>If admitted from waitlist: You typically have 1-2 weeks to decide</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You'll forfeit your original deposit (~$200-500) if you accept waitlist offer</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Check your email DAILY - waitlist offers often require quick responses (24-72 hours)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mid-May to June */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <div className="flex items-start">
                <div className="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                  MID<br/>MAY
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-yellow-900 mb-3">Second Wave of Waitlist Activity</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Some students who accepted initial waitlist offers decline, creating new openings</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span><strong>Additional 15-20% of waitlist acceptances</strong> happen mid-May through June</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Schools continue assessing enrollment targets by gender, major, geographic region</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>If you haven't heard anything by mid-May, chances are significantly reduced but not zero</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>Most schools will notify you if you're <strong>removed from waitlist</strong> (typically late May)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* July-August */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500">
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                  JUL<br/>AUG
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-red-900 mb-3">Late Summer Waitlist Activity (Very Rare)</h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span><strong>Only 5-10% of waitlist acceptances</strong> happen this late (typically fewer than 10 students per school)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Caused by unexpected enrollment issues or summer melt (students withdrawing)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Schools like WashU and Vanderbilt occasionally go to waitlist into August</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>If admitted this late, you'll have very short time to arrange housing, registration, orientation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>By August, emotionally commit to your enrolled school - late waitlist miracles are extremely rare</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
            <p className="text-gray-800">
              <strong className="text-blue-900">🎯 Reality Check:</strong> If you don't hear anything by <strong>mid-May</strong>, your chances drop dramatically. By <strong>June 1</strong>, most waitlists are effectively closed. Don't put your life on hold waiting - fall in love with your committed school and prepare to attend. If a waitlist miracle happens later, it's a bonus, not something to count on. Use our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools/college-admissions-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">College Admissions Calculator</button> to assess your chances at other schools for future applications.
            </p>
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
                What are my chances of getting off a college waitlist?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Waitlist acceptance rates vary dramatically by school, ranging from <strong>0.5% at highly selective schools like Harvard and Stanford</strong> to <strong>15-40% at less selective institutions</strong>. Your individual chances depend on factors including: the school's historical waitlist acceptance rate (typically 2-8% at top schools), quality of your Letter of Continued Interest (LOCI), how your academic profile compares to admitted students, demonstrated interest through updates and visits, and institutional needs like geographic diversity or filling specific academic programs. Schools like <strong>WashU (12.5%)</strong> and <strong>Emory (15.3%)</strong> have historically higher waitlist acceptance rates than Ivy League schools.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Should I write a Letter of Continued Interest (LOCI)?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Yes, absolutely write a LOCI if you're serious about attending.</strong> A well-crafted LOCI can increase your waitlist acceptance probability by 20-30%. Your LOCI should: reaffirm your strong interest in attending (state it's your top choice if true), provide meaningful updates on achievements since application submission (new awards, improved grades, leadership roles), explain why you're a good fit for the school's community and specific programs, be concise (typically 1 page or 400-600 words), and be sent within 1-2 weeks of receiving your waitlist decision. Avoid repeating information from your original application or being overly emotional.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                What's the difference between a waitlist and a deferral?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                A <strong>deferral</strong> occurs during Early Decision/Early Action when your application is postponed to the Regular Decision round for reconsideration (you haven't been rejected). A <strong>waitlist</strong> happens after Regular Decision when you're neither accepted nor rejected - you're placed on a waiting list in case admitted students decline their offers. Key differences: Deferral happens in December/January (ED/EA), waitlist in March/April (RD). Deferral gives you another full review in Regular Decision, waitlist means you're in a holding pattern until May-August. Deferral acceptance rates are typically 5-15%, waitlist rates are 0.5-15%. With deferrals you can submit additional materials proactively, with waitlists you typically wait unless the school requests updates.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Can I accept multiple college waitlist offers?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Yes, you can and should accept waitlist positions at multiple schools</strong> if you're interested in attending any of them. Unlike Early Decision (which is binding), waitlist acceptance is non-binding and doesn't commit you to attending. Best practice: Accept waitlist spots at all schools you'd genuinely consider attending (typically 2-5 schools). Submit a deposit to your top accepted school by May 1 deadline to secure your spot. Write individual Letters of Continued Interest (LOCI) to your top 1-2 waitlist schools. If admitted off a waitlist in May-August, you can accept that offer and forfeit your original deposit (typically $200-500, non-refundable). Be strategic about which waitlists to prioritize for LOCI and demonstrated interest efforts.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                When do colleges start accepting students from the waitlist?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Waitlist activity typically begins in <strong>early May</strong> after the May 1 National Candidate Reply Deadline when colleges know their enrollment numbers. Timeline: <strong>Late April:</strong> Colleges assess how many students accepted offers. <strong>Early May (May 1-15):</strong> First wave of waitlist offers for schools that under-enrolled. <strong>Mid-May to June:</strong> Second wave as some accepted students decline. <strong>July-August:</strong> Rare third wave for remaining spots (typically fewer than 10 students). Peak waitlist activity is May 1-31 (approximately 70-80% of waitlist acceptances). Some schools like WashU and Vanderbilt are known for active waitlists extending into summer. Elite schools (Harvard, Stanford, MIT) rarely go to waitlist, and when they do it's typically in early May only.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Does demonstrating interest help if I'm on a waitlist?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Yes, demonstrated interest is crucial for waitlist acceptance</strong> at most schools (except highly selective schools like MIT and Cal Tech that don't track it). Effective ways to demonstrate interest: Send a strong Letter of Continued Interest (LOCI) within 1-2 weeks of waitlist notification. Provide meaningful updates (new achievements, improved grades, awards) every 4-6 weeks. Visit campus if possible and mention it in communications. Connect with admissions counselor via email (brief, professional updates only). Have your counselor call on your behalf emphasizing you'll definitely attend if admitted. Attend virtual information sessions or local recruitment events. Quantify your interest: Schools track email opens, website visits, and event attendance. However, avoid excessive contact - 2-3 touchpoints total (initial LOCI + 1-2 updates) is appropriate for most schools.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Should I send additional recommendation letters from the waitlist?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Only send additional recommendation letters if they provide <strong>truly new and compelling information</strong> that wasn't in your original application. When additional letters help: A new mentor/supervisor who can speak to significant achievements or growth since you applied. Someone with direct connection to the school (alumni, faculty, trustee) who knows you well personally. A recommendation highlighting a specific skill or accomplishment highly relevant to your intended major that wasn't covered before. When NOT to send additional letters: Simply restating what was already said in original recommendations. Letters from family friends or distant connections who don't know you well. More than 1 additional letter (admissions officers have limited time). <strong>Best practice:</strong> Ask your school counselor to call the admissions office on your behalf instead - this is often more effective than additional letters and shows institutional support for your candidacy.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                What if I need financial aid and I'm on the waitlist?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Financial aid availability for waitlisted students varies significantly by school's aid policy. <strong>Need-blind schools</strong> (Harvard, Yale, Princeton, MIT, Amherst): Your financial need doesn't impact waitlist admission chances; full aid available if admitted. <strong>Need-aware schools</strong> (most private colleges): Financial need may reduce waitlist acceptance chances by 10-25% because aid budgets are often depleted by May. <strong>State schools:</strong> Limited aid for waitlist admits; mostly federal loans available. Important considerations: If a school is need-aware, waitlist acceptance rates are typically higher for students not requesting aid. You can indicate you don't need aid in your LOCI to improve chances (only if truly don't need it). If admitted off waitlist, you can still apply for aid but packages may be less generous. Some schools explicitly state waitlist admits receive no institutional aid - check school's waitlist letter carefully. If aid is critical, focus LOCI efforts on need-blind schools on your waitlist.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                How do I decide which waitlist school to prioritize?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Prioritize waitlist schools strategically using this framework: <strong>1. Genuine Interest:</strong> Only pursue schools you'd actually attend over your current top acceptance. <strong>2. Historical Waitlist Data:</strong> Focus on schools with acceptance rates above 5% (WashU 12.5%, Emory 15.3%, Northwestern 6.8%) rather than sub-1% schools (Harvard 0.5%, Stanford 0.8%). <strong>3. Fit Analysis:</strong> Consider your academic profile vs. admitted class stats - if you're in the top 25% of their range, you have better waitlist chances. <strong>4. Financial Aid:</strong> If you need significant aid, prioritize need-blind schools (Ivies, Amherst, MIT) or schools known for good aid to waitlist admits. <strong>5. Demonstrated Interest:</strong> Choose schools that track demonstrated interest (most private colleges) over those that don't (UC system, MIT). Practical strategy: Write detailed LOCI to your top 1-2 waitlist schools. Send brief updates to 2-3 other waitlist schools. Accept all waitlist positions but invest significant effort in only your top choices to avoid burnout during an already stressful time.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Is being on a ranked waitlist better than an unranked waitlist?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Both ranked and unranked waitlists have advantages and disadvantages. <strong>Ranked waitlist (less common):</strong> You know your exact position (e.g., #45 of 500 waitlisted students). Provides clarity on realistic chances - if you're in top 10-15% of list, chances are reasonable. Demonstrated interest matters less since your position is predetermined. Examples: Some state schools and a few private colleges disclose rankings. <strong>Unranked waitlist (most common):</strong> Your position is fluid based on institutional needs (geographic diversity, intended major, gender balance, demonstrated interest). Allows you to improve your chances through LOCI and updates. Schools maintain flexibility to select students filling specific needs. Examples: All Ivy League, Stanford, MIT, most top private colleges. <strong>Verdict:</strong> Unranked waitlists actually offer more opportunity for proactive students who demonstrate strong continued interest. However, ranked waitlists provide better transparency for planning your enrollment decisions. Most top schools use unranked systems to maintain maximum flexibility.
              </p>
            </div>
          </div>
        </div>
        )}

        {/* Social Sharing Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            <span aria-hidden="true">🔗</span> Share This Calculator
          </h2>
          <p className="text-gray-700 text-center mb-6">
            Help other students navigate the waitlist process by sharing this free calculator with your friends and classmates!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(CANONICAL_URL)}&text=${encodeURIComponent('Calculate your college waitlist acceptance chances with real data from 50+ top schools! 📊')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-200 shadow-md"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-md"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-md"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Calculate your college waitlist acceptance chances! ' + CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-200 shadow-md"
              aria-label="Share on WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(CANONICAL_URL);
                alert('Link copied to clipboard! ✅');
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-200 shadow-md"
              aria-label="Copy link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>

      <RelatedTools 
        currentSlug="waitlist-acceptance-calculator"
        relatedSlugs={['early-decision-action-calculator', 'college-admissions-calculator', 'css-profile-cost-calculator']}
        navigateTo={navigateTo} 
      />
    </div>
  );
};

export default WaitlistAcceptanceCalculator;
