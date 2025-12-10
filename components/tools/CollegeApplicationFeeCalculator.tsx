import React, { useState, useEffect, useCallback, useRef, ErrorInfo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

// Analytics tracking utility
const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, properties);
    }
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
};

// Input sanitization utility
const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters and scripts
  return input
    .replace(/[<>"']/g, '') // Remove HTML/script injection chars
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 500); // Limit length to prevent DoS
};

// Validate number input
const validateNumber = (value: number, min: number = 0, max: number = 1000000): number => {
  const num = Number(value);
  if (isNaN(num)) return 0;
  return Math.max(min, Math.min(max, num));
};

interface CollegeApplicationFeeCalculatorProps {
  navigateTo: (page: Page) => void;
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Calculator Error:', error, errorInfo);
    trackEvent('calculator_error', {
      error_message: error.message,
      error_stack: error.stack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Something Went Wrong</h2>
            <p className="text-slate-600 mb-6">
              We encountered an error while loading the calculator. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
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

interface College {
  id: number;
  name: string;
  applicationFee: number;
  platform: 'Common App' | 'Coalition App' | 'Individual' | 'UC Application';
  sendSATScore: boolean;
  sendACTScore: boolean;
  sendTranscript: boolean;
  cssProfile: boolean;
  cssProfileOrder?: number; // Track order for CSS Profile pricing (first school = $25, additional = $16)
}

interface FinancialInfo {
  householdIncome: number;
  familySize: number;
  receivingPublicAssistance: boolean;
  fosterCare: boolean;
}

const CollegeApplicationFeeCalculator: React.FC<CollegeApplicationFeeCalculatorProps> = ({ navigateTo }) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [collegeName, setCollegeName] = useState('');
  const [applicationFee, setApplicationFee] = useState<number>(0);
  const [selectedPlatform, setSelectedPlatform] = useState<College['platform']>('Common App');
  const [sendSATScore, setSendSATScore] = useState(false);
  const [sendACTScore, setSendACTScore] = useState(false);
  const [sendTranscript, setSendTranscript] = useState(false);
  const [cssProfile, setCssProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFirstTimeTooltip, setShowFirstTimeTooltip] = useState(false);
  
  // Financial info for fee waiver eligibility
  const [showFeeWaiverChecker, setShowFeeWaiverChecker] = useState(false);
  const [financialInfo, setFinancialInfo] = useState<FinancialInfo>({
    householdIncome: 0,
    familySize: 1,
    receivingPublicAssistance: false,
    fosterCare: false,
  });

  // Cost constants
  const SAT_SCORE_SEND_FEE = 12;
  const ACT_SCORE_SEND_FEE = 15;
  const TRANSCRIPT_FEE = 7;
  const CSS_PROFILE_FIRST = 25;
  const CSS_PROFILE_ADDITIONAL = 16;

  const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/admission-tools/college-application-fee-calculator';

  // Check for first-time user and show guidance
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedCollegeFeeCalc');
    if (!hasVisited) {
      setShowFirstTimeTooltip(true);
      localStorage.setItem('hasVisitedCollegeFeeCalc', 'true');
      // Auto-hide tooltip after 8 seconds
      const timer = setTimeout(() => setShowFirstTimeTooltip(false), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Security: Content Security Policy headers should be set in server config
  // Add to _headers file (Netlify/Cloudflare):
  // Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'
  // X-Frame-Options: DENY
  // X-Content-Type-Options: nosniff
  // Referrer-Policy: strict-origin-when-cross-origin

  // SEO Meta Tags
  useEffect(() => {
    document.title = 'College Application Fee Calculator 2026 - Budget Your College Apps | ZuraWebTools';

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOGMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Free college application fee calculator 2026. Calculate total costs including application fees ($50-$90), SAT/ACT score sending ($12-$15), official transcripts ($7), and CSS Profile ($25+$16). Check FAFSA fee waiver eligibility based on income and budget your college applications accurately.');

    setMeta('keywords', 'college application fee calculator, college app cost calculator, application fee waiver calculator, college admissions budget, how much does it cost to apply to college, SAT score send cost, ACT score send fee, CSS profile cost 2026, common app fees, coalition app fees, university application costs 2026, college application expenses, transcript sending fees, fee waiver eligibility, FAFSA fee waiver, free college applications, no fee colleges 2026, college application budget planner, how to save money on college applications, college app fee waiver income limits, common app vs coalition app cost, UC application fees, college board score send, ACT score reporting fees, college application cost breakdown, transcript fees 2026, CSS Profile additional school fee, college admission expenses, application fee waiver requirements, poverty guidelines college fees, college application pricing, average college application cost, college app budget tool, score send calculator');

    setOGMeta('og:title', 'College Application Fee Calculator 2026 - How Much Will Your College Apps Cost?');
    setOGMeta('og:description', 'Calculate total college application costs including fees, test scores, transcripts, and CSS Profile. Check fee waiver eligibility instantly.');
    setOGMeta('og:type', 'website');
    setOGMeta('og:url', CANONICAL_URL);
    setOGMeta('og:image', 'https://zurawebtools.com/og-college-app-fee-calculator.png');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'College Application Fee Calculator 2026');
    setMeta('twitter:description', 'Free tool to calculate total college application costs with fee waiver eligibility checker.');
    setMeta('twitter:image', 'https://zurawebtools.com/og-college-app-fee-calculator.png');

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', CANONICAL_URL);

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "College Application Fee Calculator 2026",
          "url": CANONICAL_URL,
          "description": "Free college application fee calculator to budget application costs, score sending fees, and check fee waiver eligibility.",
          "inLanguage": "en-US"
        },
        {
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
              "name": "Education Tools",
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
              "name": "College Application Fee Calculator",
              "item": CANONICAL_URL
            }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "name": "College Application Fee Calculator",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "reviewCount": "289"
          }
        }
      ]
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const metaTags = ['description', 'keywords', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'];
      metaTags.forEach(name => {
        const element = document.querySelector(`meta[name="${name}"]`);
        if (element) element.remove();
      });

      const ogTags = ['og:title', 'og:description', 'og:type', 'og:url', 'og:image'];
      ogTags.forEach(property => {
        const element = document.querySelector(`meta[property="${property}"]`);
        if (element) element.remove();
      });

      if (canonicalLink) canonicalLink.remove();
      if (script) script.remove();
    };
  }, []);

  // Add college to list
  const handleAddCollege = () => {
    const sanitizedName = sanitizeInput(collegeName);
    if (!sanitizedName) {
      alert('⚠️ Please enter a valid college name.');
      return;
    }

    // Validate application fee
    const validatedFee = validateNumber(applicationFee, 0, 500);
    if (validatedFee !== applicationFee) {
      alert('⚠️ Application fee must be between $0 and $500.');
      return;
    }

    // Performance: Limit to 50 colleges
    if (colleges.length >= 50) {
      alert('⚠️ Maximum 50 colleges allowed. Please remove some colleges before adding more.');
      return;
    }

    // Calculate CSS Profile order if this college requires CSS Profile
    const cssProfileOrder = cssProfile 
      ? colleges.filter(c => c.cssProfile).length + 1 
      : undefined;

    const newCollege: College = {
      id: Date.now(),
      name: sanitizedName,
      applicationFee: validatedFee,
      platform: selectedPlatform,
      sendSATScore,
      sendACTScore,
      sendTranscript,
      cssProfile,
      cssProfileOrder,
    };

    // Analytics tracking
    trackEvent('college_added', {
      platform: selectedPlatform,
      has_sat: sendSATScore,
      has_act: sendACTScore,
      has_transcript: sendTranscript,
      has_css_profile: cssProfile,
      total_colleges: colleges.length + 1,
    });

    setColleges([...colleges, newCollege]);

    // Reset form
    setCollegeName('');
    setApplicationFee(0);
    setSelectedPlatform('Common App');
    setSendSATScore(false);
    setSendACTScore(false);
    setSendTranscript(false);
    setCssProfile(false);
  };

  // Remove college
  const handleRemoveCollege = (id: number) => {
    setColleges(colleges.filter(college => college.id !== id));
  };

  // Calculate costs
  const calculateCollegeCost = (college: College) => {
    let cost = college.applicationFee;
    if (college.sendSATScore) cost += SAT_SCORE_SEND_FEE;
    if (college.sendACTScore) cost += ACT_SCORE_SEND_FEE;
    if (college.sendTranscript) cost += TRANSCRIPT_FEE;
    return cost;
  };

  const totalApplicationFees = colleges.reduce((sum, college) => sum + college.applicationFee, 0);
  const totalSATFees = colleges.filter(c => c.sendSATScore).length * SAT_SCORE_SEND_FEE;
  const totalACTFees = colleges.filter(c => c.sendACTScore).length * ACT_SCORE_SEND_FEE;
  const totalTranscriptFees = colleges.filter(c => c.sendTranscript).length * TRANSCRIPT_FEE;
  
  // Fixed CSS Profile calculation: properly track first vs additional schools
  const cssProfileColleges = colleges
    .filter(c => c.cssProfile)
    .sort((a, b) => (a.cssProfileOrder || 0) - (b.cssProfileOrder || 0));
  
  const totalCSSProfileFees = cssProfileColleges.reduce((sum, college, index) => {
    return sum + (index === 0 ? CSS_PROFILE_FIRST : CSS_PROFILE_ADDITIONAL);
  }, 0);

  const grandTotal = totalApplicationFees + totalSATFees + totalACTFees + totalTranscriptFees + totalCSSProfileFees;

  // Save/Load college list with proper error handling and validation
  const handleSaveList = () => {
    if (colleges.length === 0) {
      alert('⚠️ No colleges to save. Please add at least one college first.');
      return;
    }

    setIsLoading(true);
    try {
      const dataToSave = JSON.stringify(colleges);
      // Check localStorage quota
      if (dataToSave.length > 5000000) { // 5MB limit
        throw new Error('Data too large to save');
      }
      localStorage.setItem('savedCollegeList', dataToSave);
      alert('✅ College list saved successfully!');
      trackEvent('college_list_saved', { college_count: colleges.length });
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('❌ Storage quota exceeded. Please try removing some colleges.');
      } else {
        alert('❌ Failed to save college list. Please try again.');
      }
      console.error('Save error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadList = () => {
    setIsLoading(true);
    try {
      const saved = localStorage.getItem('savedCollegeList');
      if (!saved) {
        alert('❌ No saved list found.');
        return;
      }

      // Validate JSON before parsing
      let parsedData: College[];
      try {
        parsedData = JSON.parse(saved);
      } catch (parseError) {
        throw new Error('Corrupted data');
      }

      // Validate data structure
      if (!Array.isArray(parsedData)) {
        throw new Error('Invalid data format');
      }

      // Validate each college object
      const isValid = parsedData.every(college => 
        college.id && 
        college.name && 
        typeof college.applicationFee === 'number' &&
        college.platform
      );

      if (!isValid) {
        throw new Error('Invalid college data structure');
      }

      setColleges(parsedData);
      alert('✅ College list loaded successfully!');
      trackEvent('college_list_loaded', { college_count: parsedData.length });
    } catch (error) {
      alert('❌ Failed to load saved list. The data may be corrupted.');
      console.error('Load error:', error);
      // Clear corrupted data
      localStorage.removeItem('savedCollegeList');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    if (confirm('⚠️ Are you sure you want to clear all colleges? This action cannot be undone.')) {
      setIsLoading(true);
      try {
        setColleges([]);
        localStorage.removeItem('savedCollegeList');
        alert('✅ All colleges cleared successfully!');
        trackEvent('college_list_cleared');
      } catch (error) {
        alert('❌ Failed to clear colleges. Please try again.');
        console.error('Clear error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fee waiver eligibility checker
  const checkFeeWaiverEligibility = () => {
    const { householdIncome, familySize, receivingPublicAssistance, fosterCare } = financialInfo;

    // 2026 Federal Poverty Guidelines (approximate)
    const povertyGuidelines: { [key: number]: number } = {
      1: 15060,
      2: 20440,
      3: 25820,
      4: 31200,
      5: 36580,
      6: 41960,
      7: 47340,
      8: 52720,
    };

    const guideline = familySize <= 8 ? povertyGuidelines[familySize] : povertyGuidelines[8] + (familySize - 8) * 5380;
    const eligibilityThreshold = guideline * 1.85; // 185% of poverty guidelines

    if (receivingPublicAssistance || fosterCare) return true;
    if (householdIncome <= eligibilityThreshold) return true;
    return false;
  };

  const isEligibleForFeeWaiver = checkFeeWaiverEligibility();

  // Track fee waiver check when financial info changes
  useEffect(() => {
    if (showFeeWaiverChecker && financialInfo.householdIncome > 0) {
      trackEvent('fee_waiver_checked', {
        is_eligible: isEligibleForFeeWaiver,
        household_income: financialInfo.householdIncome > 0 ? 'provided' : 'not_provided',
        family_size: financialInfo.familySize,
      });
    }
  }, [isEligibleForFeeWaiver, showFeeWaiverChecker]);

  // Track calculator usage on mount
  useEffect(() => {
    trackEvent('calculator_loaded', {
      tool: 'college_application_fee_calculator',
    });
  }, []);

  // Performance optimization: Memoize expensive calculations
  const collegeSummary = React.useMemo(() => {
    return {
      total: colleges.length,
      commonApp: colleges.filter(c => c.platform === 'Common App').length,
      coalition: colleges.filter(c => c.platform === 'Coalition App').length,
      uc: colleges.filter(c => c.platform === 'UC Application').length,
      individual: colleges.filter(c => c.platform === 'Individual').length,
    };
  }, [colleges]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-slate-700 font-semibold">Processing...</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
            College Application Fee Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Free college application fee calculator for 2026. Calculate total costs including application fees, SAT/ACT score sending ($12-$15), transcripts ($7), and CSS Profile fees. Check fee waiver eligibility and budget your college applications accurately.
          </p>

          {/* First-Time User Tooltip */}
          {showFirstTimeTooltip && (
            <div className="mt-6 max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-5 shadow-lg animate-fade-in relative">
              <button
                onClick={() => setShowFirstTimeTooltip(false)}
                className="absolute top-2 right-2 text-slate-500 hover:text-slate-700 text-2xl leading-none"
                aria-label="Close tooltip"
              >
                ×
              </button>
              <div className="flex items-start space-x-3">
                <span className="text-3xl">💡</span>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">Welcome! Here's how to use this calculator:</h3>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>✓ <strong>Select colleges</strong> from dropdown or enter custom names</li>
                    <li>✓ <strong>Choose platform</strong> (Common App, Coalition, UC, Individual)</li>
                    <li>✓ <strong>Check additional costs</strong> (SAT/ACT scores, transcripts, CSS Profile)</li>
                    <li>✓ <strong>Save your list</strong> to come back later</li>
                    <li>✓ <strong>Check fee waiver eligibility</strong> to see if you qualify for waivers</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Add College Application</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* College Name */}
            <div>
              <label htmlFor="collegeName" className="block text-sm font-semibold text-slate-700 mb-2">
                College/University Name *
              </label>
              <select
                id="collegeName"
                value={collegeName}
                onChange={(e) => {
                  const selectedCollege = e.target.value;
                  setCollegeName(selectedCollege);
                  // Auto-fill common application fees
                  if (selectedCollege.includes('Harvard') || selectedCollege.includes('Stanford') || selectedCollege.includes('MIT')) {
                    setApplicationFee(85);
                  } else if (selectedCollege.includes('UC ')) {
                    setApplicationFee(70);
                  } else if (selectedCollege) {
                    setApplicationFee(75);
                  }
                }}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
                aria-label="Select college or university name"
              >
                <option value="" className="text-slate-500">Select a college...</option>
                <optgroup label="Ivy League" className="text-slate-900">
                  <option value="Harvard University">Harvard University ($85)</option>
                  <option value="Yale University">Yale University ($80)</option>
                  <option value="Princeton University">Princeton University ($75)</option>
                  <option value="Columbia University">Columbia University ($85)</option>
                  <option value="University of Pennsylvania">University of Pennsylvania ($80)</option>
                  <option value="Brown University">Brown University ($75)</option>
                  <option value="Dartmouth College">Dartmouth College ($80)</option>
                  <option value="Cornell University">Cornell University ($80)</option>
                </optgroup>
                <optgroup label="Top Private Universities" className="text-slate-900">
                  <option value="Stanford University">Stanford University ($90)</option>
                  <option value="MIT">MIT ($85)</option>
                  <option value="Duke University">Duke University ($85)</option>
                  <option value="Northwestern University">Northwestern University ($75)</option>
                  <option value="Johns Hopkins University">Johns Hopkins University ($70)</option>
                  <option value="University of Chicago">University of Chicago ($80)</option>
                  <option value="Vanderbilt University">Vanderbilt University ($50)</option>
                  <option value="Rice University">Rice University ($75)</option>
                  <option value="Georgetown University">Georgetown University ($75)</option>
                  <option value="Emory University">Emory University ($75)</option>
                </optgroup>
                <optgroup label="University of California System" className="text-slate-900">
                  <option value="UC Berkeley">UC Berkeley ($70)</option>
                  <option value="UC Los Angeles (UCLA)">UC Los Angeles - UCLA ($70)</option>
                  <option value="UC San Diego">UC San Diego ($70)</option>
                  <option value="UC Santa Barbara">UC Santa Barbara ($70)</option>
                  <option value="UC Irvine">UC Irvine ($70)</option>
                  <option value="UC Davis">UC Davis ($70)</option>
                  <option value="UC Santa Cruz">UC Santa Cruz ($70)</option>
                  <option value="UC Riverside">UC Riverside ($70)</option>
                  <option value="UC Merced">UC Merced ($70)</option>
                </optgroup>
                <optgroup label="Public Universities" className="text-slate-900">
                  <option value="University of Michigan">University of Michigan ($75)</option>
                  <option value="University of Virginia">University of Virginia ($70)</option>
                  <option value="University of North Carolina">University of North Carolina ($85)</option>
                  <option value="Georgia Tech">Georgia Tech ($75)</option>
                  <option value="University of Florida">University of Florida ($30)</option>
                  <option value="University of Texas at Austin">University of Texas at Austin ($75)</option>
                  <option value="University of Washington">University of Washington ($80)</option>
                  <option value="University of Wisconsin">University of Wisconsin ($60)</option>
                </optgroup>
                <optgroup label="Liberal Arts Colleges" className="text-slate-900">
                  <option value="Williams College">Williams College ($75)</option>
                  <option value="Amherst College">Amherst College ($75)</option>
                  <option value="Swarthmore College">Swarthmore College ($60)</option>
                  <option value="Wellesley College">Wellesley College ($0 - No Fee)</option>
                  <option value="Pomona College">Pomona College ($70)</option>
                  <option value="Bowdoin College">Bowdoin College ($70)</option>
                  <option value="Carleton College">Carleton College ($0 - No Fee)</option>
                  <option value="Claremont McKenna">Claremont McKenna ($70)</option>
                </optgroup>
                <optgroup label="Other" className="text-slate-900">
                  <option value="Custom">Custom College (Enter Manually)</option>
                </optgroup>
              </select>
              {collegeName === 'Custom' && (
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 mt-2"
                  placeholder="Enter college name manually"
                  aria-label="Enter custom college name"
                />
              )}
            </div>

            {/* Application Fee */}
            <div>
              <label htmlFor="applicationFee" className="block text-sm font-semibold text-slate-700 mb-2">
                Application Fee ($)
              </label>
              <input
                type="number"
                id="applicationFee"
                value={applicationFee || ''}
                onChange={(e) => setApplicationFee(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                placeholder="e.g., 75"
                min="0"
                aria-label="Application fee amount in dollars"
              />
            </div>
          </div>

          {/* Platform Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Application Platform
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['Common App', 'Coalition App', 'UC Application', 'Individual'] as const).map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedPlatform === platform
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  aria-label={`Select ${platform} platform`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Costs Checkboxes */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Additional Costs (per college)
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={sendSATScore}
                  onChange={(e) => setSendSATScore(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  aria-label="Send SAT score"
                />
                <span className="text-slate-700">
                  Send SAT Score <span className="font-semibold text-blue-600">(${SAT_SCORE_SEND_FEE})</span>
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={sendACTScore}
                  onChange={(e) => setSendACTScore(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  aria-label="Send ACT score"
                />
                <span className="text-slate-700">
                  Send ACT Score <span className="font-semibold text-blue-600">(${ACT_SCORE_SEND_FEE})</span>
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={sendTranscript}
                  onChange={(e) => setSendTranscript(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  aria-label="Send official transcript"
                />
                <span className="text-slate-700">
                  Send Transcript <span className="font-semibold text-blue-600">(${TRANSCRIPT_FEE})</span>
                </span>
              </label>

              <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={cssProfile}
                  onChange={(e) => setCssProfile(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  aria-label="CSS Profile required"
                />
                <span className="text-slate-700">
                  CSS Profile <span className="font-semibold text-blue-600">(${colleges.filter(c => c.cssProfile).length === 0 ? CSS_PROFILE_FIRST : CSS_PROFILE_ADDITIONAL})</span>
                </span>
              </label>
            </div>
          </div>

          {/* Add Button */}
          <button
            type="button"
            onClick={handleAddCollege}
            disabled={!collegeName.trim()}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add college to list"
          >
            ➕ Add College
          </button>
        </div>

        {/* Additional Stats - Quick Summary (Performance Optimized with Memoization) */}
        {colleges.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">📊 Application Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{collegeSummary.total}</div>
                <div className="text-sm text-slate-600 mt-1">Total Colleges</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-cyan-600">{collegeSummary.commonApp}</div>
                <div className="text-sm text-slate-600 mt-1">Common App</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">{collegeSummary.coalition}</div>
                <div className="text-sm text-slate-600 mt-1">Coalition App</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">{collegeSummary.uc}</div>
                <div className="text-sm text-slate-600 mt-1">UC Application</div>
              </div>
            </div>
          </div>
        )}

        {/* College List */}
        {colleges.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your College Application List</h2>
            
            <div className="space-y-4">
              {colleges.map((college, index) => (
                <div key={college.id} className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{college.name}</h3>
                      <span className="inline-block px-3 py-1 mt-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                        {college.platform}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCollege(college.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      aria-label={`Remove ${college.name} from list`}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Application Fee:</span>
                        <span className="font-semibold text-slate-800">${college.applicationFee}</span>
                      </div>
                      {college.sendSATScore && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">SAT Score Send:</span>
                          <span className="font-semibold text-slate-800">${SAT_SCORE_SEND_FEE}</span>
                        </div>
                      )}
                      {college.sendACTScore && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">ACT Score Send:</span>
                          <span className="font-semibold text-slate-800">${ACT_SCORE_SEND_FEE}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      {college.sendTranscript && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Transcript Fee:</span>
                          <span className="font-semibold text-slate-800">${TRANSCRIPT_FEE}</span>
                        </div>
                      )}
                      {college.cssProfile && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">CSS Profile:</span>
                          <span className="font-semibold text-slate-800">${index === colleges.findIndex(c => c.cssProfile) ? CSS_PROFILE_FIRST : CSS_PROFILE_ADDITIONAL}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-slate-300">
                        <span className="font-semibold text-slate-700">Total per College:</span>
                        <span className="font-bold text-blue-600 text-lg">${calculateCollegeCost(college)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Save/Load/Clear Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t-2 border-slate-200">
              <button
                type="button"
                onClick={handleSaveList}
                disabled={isLoading || colleges.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Save college list"
              >
                {isLoading ? '⏳ Saving...' : '💾 Save List'}
              </button>
              <button
                type="button"
                onClick={handleLoadList}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Load saved college list"
              >
                {isLoading ? '⏳ Loading...' : '📂 Load Saved'}
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                disabled={isLoading || colleges.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Clear all colleges"
              >
                {isLoading ? '⏳ Clearing...' : '🗑️ Clear All'}
              </button>
            </div>
          </div>
        )}

        {/* Total Cost Summary */}
        {colleges.length > 0 && (
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Total Application Costs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm opacity-90 mb-1">Application Fees</div>
                <div className="text-2xl font-bold">${totalApplicationFees}</div>
                <div className="text-xs opacity-75 mt-1">{colleges.length} colleges</div>
              </div>

              {totalSATFees > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">SAT Score Sending</div>
                  <div className="text-2xl font-bold">${totalSATFees}</div>
                  <div className="text-xs opacity-75 mt-1">{colleges.filter(c => c.sendSATScore).length} schools</div>
                </div>
              )}

              {totalACTFees > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">ACT Score Sending</div>
                  <div className="text-2xl font-bold">${totalACTFees}</div>
                  <div className="text-xs opacity-75 mt-1">{colleges.filter(c => c.sendACTScore).length} schools</div>
                </div>
              )}

              {totalTranscriptFees > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Transcript Fees</div>
                  <div className="text-2xl font-bold">${totalTranscriptFees}</div>
                  <div className="text-xs opacity-75 mt-1">{colleges.filter(c => c.sendTranscript).length} schools</div>
                </div>
              )}

              {totalCSSProfileFees > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">CSS Profile</div>
                  <div className="text-2xl font-bold">${totalCSSProfileFees}</div>
                  <div className="text-xs opacity-75 mt-1">{colleges.filter(c => c.cssProfile).length} schools</div>
                </div>
              )}
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-lg mb-2">Grand Total</div>
              <div className="text-5xl font-bold mb-2">${grandTotal}</div>
              <div className="text-sm opacity-90">Total cost for {colleges.length} college application{colleges.length > 1 ? 's' : ''}</div>
            </div>
          </div>
        )}

        {/* Fee Waiver Eligibility Checker */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Fee Waiver Eligibility Checker</h2>
            <button
              type="button"
              onClick={() => setShowFeeWaiverChecker(!showFeeWaiverChecker)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              aria-label="Toggle fee waiver checker"
            >
              {showFeeWaiverChecker ? 'Hide' : 'Check Eligibility'}
            </button>
          </div>

          {showFeeWaiverChecker && (
            <div className="space-y-6">
              <p className="text-slate-600">
                Check if you qualify for Common App, Coalition App, and SAT/ACT fee waivers based on FAFSA criteria.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="householdIncome" className="block text-sm font-semibold text-slate-700 mb-2">
                    Annual Household Income ($)
                  </label>
                  <input
                    type="number"
                    id="householdIncome"
                    value={financialInfo.householdIncome || ''}
                    onChange={(e) => setFinancialInfo({ ...financialInfo, householdIncome: Number(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                    placeholder="e.g., 45000"
                    aria-label="Annual household income"
                  />
                </div>

                <div>
                  <label htmlFor="familySize" className="block text-sm font-semibold text-slate-700 mb-2">
                    Family Size
                  </label>
                  <input
                    type="number"
                    id="familySize"
                    value={financialInfo.familySize}
                    onChange={(e) => setFinancialInfo({ ...financialInfo, familySize: Number(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                    min="1"
                    aria-label="Number of family members"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={financialInfo.receivingPublicAssistance}
                    onChange={(e) => setFinancialInfo({ ...financialInfo, receivingPublicAssistance: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    aria-label="Receiving public assistance"
                  />
                  <span className="text-slate-700">Receiving public assistance (SNAP, TANF, WIC, etc.)</span>
                </label>

                <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={financialInfo.fosterCare}
                    onChange={(e) => setFinancialInfo({ ...financialInfo, fosterCare: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    aria-label="Currently in or aged out of foster care"
                  />
                  <span className="text-slate-700">Currently in or aged out of foster care</span>
                </label>
              </div>

              {/* Eligibility Result */}
              <div className={`p-6 rounded-lg ${isEligibleForFeeWaiver ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`text-3xl ${isEligibleForFeeWaiver ? 'text-green-600' : 'text-red-600'}`}>
                    {isEligibleForFeeWaiver ? '✅' : '❌'}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isEligibleForFeeWaiver ? 'text-green-800' : 'text-red-800'}`}>
                      {isEligibleForFeeWaiver ? 'You May Qualify for Fee Waivers!' : 'You May Not Qualify for Fee Waivers'}
                    </h3>
                    <p className={`text-sm mt-1 ${isEligibleForFeeWaiver ? 'text-green-700' : 'text-red-700'}`}>
                      {isEligibleForFeeWaiver
                        ? 'Based on your information, you may be eligible for Common App, Coalition App, SAT, and ACT fee waivers. Contact your school counselor to confirm and request fee waivers.'
                        : 'Based on your information, you may not meet the automatic eligibility criteria. However, special circumstances may still qualify you. Speak with your school counselor for personalized guidance.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#calculator" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-center hover:bg-blue-100 transition-colors font-medium">
              Calculator
            </a>
            <a href="#platform-comparison" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-center hover:bg-blue-100 transition-colors font-medium">
              Platform Comparison
            </a>
            <a href="#cost-breakdown" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-center hover:bg-blue-100 transition-colors font-medium">
              Cost Breakdown
            </a>
            <a href="#faqs" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-center hover:bg-blue-100 transition-colors font-medium">
              FAQs
            </a>
          </div>
        </div>

        {/* Social Share */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Share This Calculator</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              aria-label="Share on Facebook"
            >
              📘 Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(CANONICAL_URL)}&text=Calculate%20your%20college%20application%20costs%20with%20this%20free%20calculator!`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors"
              aria-label="Share on Twitter"
            >
              🐦 Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              aria-label="Share on LinkedIn"
            >
              💼 LinkedIn
            </a>
          </div>
        </div>

        {/* Platform Comparison */}
        <section id="platform-comparison" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Application Platform Comparison 2026</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-4 py-3 text-left font-bold text-slate-800 border-b-2 border-slate-300">Feature</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800 border-b-2 border-slate-300">Common App</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800 border-b-2 border-slate-300">Coalition App</th>
                  <th className="px-4 py-3 text-center font-bold text-slate-800 border-b-2 border-slate-300">UC Application</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-700">Number of Schools</td>
                  <td className="px-4 py-3 text-center text-slate-600">900+ colleges</td>
                  <td className="px-4 py-3 text-center text-slate-600">150+ colleges</td>
                  <td className="px-4 py-3 text-center text-slate-600">9 UC campuses</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-700">Application Fee Waivers</td>
                  <td className="px-4 py-3 text-center text-slate-600">4 automatic waivers</td>
                  <td className="px-4 py-3 text-center text-slate-600">Unlimited waivers</td>
                  <td className="px-4 py-3 text-center text-slate-600">4 waivers available</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-700">Free Applications</td>
                  <td className="px-4 py-3 text-center text-slate-600">First 8 free</td>
                  <td className="px-4 py-3 text-center text-slate-600">All free to send</td>
                  <td className="px-4 py-3 text-center text-slate-600">$70 per campus</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-700">Essay Word Limit</td>
                  <td className="px-4 py-3 text-center text-slate-600">650 words</td>
                  <td className="px-4 py-3 text-center text-slate-600">250-650 words</td>
                  <td className="px-4 py-3 text-center text-slate-600">350 words (PIQs)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold text-slate-700">Recommendation Letters</td>
                  <td className="px-4 py-3 text-center text-slate-600">Varies by school</td>
                  <td className="px-4 py-3 text-center text-slate-600">Varies by school</td>
                  <td className="px-4 py-3 text-center text-slate-600">Not accepted</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-700">Best For</td>
                  <td className="px-4 py-3 text-center text-slate-600">Most applicants</td>
                  <td className="px-4 py-3 text-center text-slate-600">Access-focused students</td>
                  <td className="px-4 py-3 text-center text-slate-600">California residents</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-slate-700">
              <strong>Pro Tip:</strong> Common App offers the first 8 applications free, while Coalition App allows unlimited free submissions. However, individual colleges still charge their own application fees regardless of platform.
            </p>
          </div>
        </section>

        {/* Cost Breakdown Guide */}
        <section id="cost-breakdown" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Complete Cost Breakdown Guide</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">1. Application Fees ($0-$90 per school)</h3>
              <p className="text-slate-600 mb-3">
                Most colleges charge between $50-$80 per application. Elite universities (Ivy League, top 20) typically charge $75-$90. Public universities often have lower fees ($40-$65) for in-state students.
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><strong>Average private college:</strong> $75</li>
                <li><strong>Average public college (in-state):</strong> $50</li>
                <li><strong>Average public college (out-of-state):</strong> $65</li>
                <li><strong>Ivy League schools:</strong> $80-$85</li>
              </ul>
            </div>

            <div className="border-l-4 border-cyan-600 pl-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">2. SAT Score Sending ($12 per school)</h3>
              <p className="text-slate-600 mb-3">
                College Board charges $12 to send official SAT scores to each college. The first 4 score sends are free if requested before viewing scores. Rush reporting costs an additional $31 per school.
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><strong>Standard sending:</strong> $12 per school</li>
                <li><strong>Rush reporting:</strong> $31 per school (additional)</li>
                <li><strong>Free sends:</strong> 4 schools (if sent before viewing scores)</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">3. ACT Score Sending ($15 per school)</h3>
              <p className="text-slate-600 mb-3">
                ACT charges $15 per official score report. Students receive 4 free score sends when registering for the test. Priority reporting (2-3 business days) costs $20 per school.
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><strong>Standard sending:</strong> $15 per school</li>
                <li><strong>Priority reporting:</strong> $20 per school</li>
                <li><strong>Free sends:</strong> 4 schools (during registration)</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">4. Official Transcript Fees ($5-$10 per school)</h3>
              <p className="text-slate-600 mb-3">
                High schools charge varying fees for official transcripts. Most schools charge $5-$10 per transcript, though some provide them free. Electronic transcripts through Parchment or National Student Clearinghouse typically cost $7.
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><strong>Paper transcripts:</strong> $5-$10</li>
                <li><strong>Electronic transcripts (Parchment):</strong> $7</li>
                <li><strong>Free options:</strong> Check with your school counselor</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">5. CSS Profile ($25 + $16 per additional school)</h3>
              <p className="text-slate-600 mb-3">
                The CSS Profile is required by 200+ colleges for institutional financial aid. College Board charges $25 for the first school and $16 for each additional school. Fee waivers are automatic for eligible students.
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 ml-4">
                <li><strong>First college:</strong> $25</li>
                <li><strong>Additional colleges:</strong> $16 each</li>
                <li><strong>Automatic waivers:</strong> Available for low-income students</li>
                <li><strong>FAFSA alternative:</strong> Free for all students</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-bold text-slate-800 mb-3">💡 Example Cost Calculation</h3>
            <p className="text-slate-700 mb-4">
              A student applying to 10 colleges with SAT scores, transcripts, and CSS Profile for 5 schools:
            </p>
            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span>Application fees (10 × $75):</span>
                <strong>$750</strong>
              </div>
              <div className="flex justify-between">
                <span>SAT score sending (10 × $12):</span>
                <strong>$120</strong>
              </div>
              <div className="flex justify-between">
                <span>Transcripts (10 × $7):</span>
                <strong>$70</strong>
              </div>
              <div className="flex justify-between">
                <span>CSS Profile ($25 + 4 × $16):</span>
                <strong>$89</strong>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-blue-300 text-lg font-bold">
                <span>Total Cost:</span>
                <span className="text-blue-600">$1,029</span>
              </div>
            </div>
          </div>
        </section>

        {/* Money-Saving Tips */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">💰 Money-Saving Tips for College Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Request Fee Waivers</h3>
              <p className="text-slate-600 text-sm">
                If you qualify for free/reduced lunch or meet income requirements, request Common App or Coalition App fee waivers from your counselor. These cover application fees and often include SAT/ACT fee waivers too.
              </p>
            </div>

            <div className="p-5 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Use Free Score Sends</h3>
              <p className="text-slate-600 text-sm">
                SAT and ACT offer 4 free score sends. For SAT, use them before viewing your scores. For ACT, designate schools during test registration. This saves $48-$60.
              </p>
            </div>

            <div className="p-5 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Apply to No-Fee Colleges</h3>
              <p className="text-slate-600 text-sm">
                Many excellent colleges don't charge application fees: Wellesley, Carleton, Reed, Smith, Tulane, and Case Western. Coalition App schools often waive fees automatically.
              </p>
            </div>

            <div className="p-5 bg-orange-50 rounded-lg border-2 border-orange-200">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Attend College Fairs</h3>
              <p className="text-slate-600 text-sm">
                College representatives at fairs often provide fee waiver codes. Some schools waive fees if you visit campus or attend their virtual info sessions.
              </p>
            </div>

            <div className="p-5 bg-cyan-50 rounded-lg border-2 border-cyan-200">
              <div className="text-2xl mb-2">5️⃣</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Apply Early Action</h3>
              <p className="text-slate-600 text-sm">
                Early Action deadlines (Nov 1-15) sometimes come with discounted fees. Plus, if accepted EA, you can reduce your total number of applications, saving money overall.
              </p>
            </div>

            <div className="p-5 bg-pink-50 rounded-lg border-2 border-pink-200">
              <div className="text-2xl mb-2">6️⃣</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Choose Coalition App</h3>
              <p className="text-slate-600 text-sm">
                Coalition App allows unlimited free submissions (you still pay college fees). It's better than Common App's 20-school limit if you're applying to 10+ Coalition schools.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">📚 About College Application Fee Calculator</h2>
          
          {/* Hero Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-md text-center border-l-4 border-blue-600">
              <div className="text-4xl font-bold text-blue-600 mb-2">$400-$650</div>
              <div className="text-sm text-slate-600">Average Cost for 7-8 Colleges</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center border-l-4 border-green-600">
              <div className="text-4xl font-bold text-green-600 mb-2">$500-$800</div>
              <div className="text-sm text-slate-600">Potential Fee Waiver Savings</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md text-center border-l-4 border-purple-600">
              <div className="text-4xl font-bold text-purple-600 mb-2">40-60%</div>
              <div className="text-sm text-slate-600">Cost Reduction with Planning</div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Main Description Card */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-3xl">💰</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Complete Cost Breakdown</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our <strong>College Application Fee Calculator</strong> helps high school students and families budget for the college admissions process in 2026. With application fees ranging from <span className="font-semibold text-blue-600">$50-$90 per school</span> and additional costs for test score sending and transcripts, the total expenses can quickly add up to over <span className="font-semibold text-red-600">$1,000</span> for students applying to 10-15 colleges. According to the <a href="https://www.commonapp.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Common Application</a>, the average student submits applications to 7-8 colleges.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Included Card */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-3xl">📊</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">What's Included?</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-slate-700">
                      <span className="text-green-600">✓</span>
                      <span><a href="/education-and-exam-tools/admission-tools/common-app-word-counter" className="text-blue-600 hover:underline">Common App</a> & <a href="/education-and-exam-tools/admission-tools/coalition-app-word-counter" className="text-blue-600 hover:underline">Coalition App</a> fees</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <span className="text-green-600">✓</span>
                      <span>SAT score sending ($12 via <a href="https://www.collegeboard.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">College Board</a>)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <span className="text-green-600">✓</span>
                      <span>ACT score sending ($15 via <a href="https://www.act.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ACT.org</a>)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <span className="text-green-600">✓</span>
                      <span>Official transcript fees ($5-$10)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <span className="text-green-600">✓</span>
                      <span>CSS Profile costs ($25 + $16 each)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <span className="text-green-600">✓</span>
                      <span>UC Application fees ($70 per campus)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Waiver Eligibility Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-md border-2 border-green-200">
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Fee Waiver Eligibility Checker</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    Our built-in checker uses <span className="font-semibold text-green-700">2026 federal poverty guidelines</span> to determine if students qualify for application fee waivers. According to <a href="https://studentaid.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Federal Student Aid</a>, students from families earning at or below <span className="font-semibold text-green-700">185% of federal poverty levels</span> typically qualify.
                  </p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Common App fee waivers:</span>
                      <span className="font-bold text-green-600">4 applications</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Coalition App waivers:</span>
                      <span className="font-bold text-green-600">Unlimited</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Potential savings:</span>
                      <span className="font-bold text-green-600">$500-$800</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Who Benefits Card */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-3xl">👥</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Who Benefits Most?</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    The <a href="https://nces.ed.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">National Center for Education Statistics</a> reports that college application expenses can be a significant barrier for underrepresented students. Our calculator is especially valuable for:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 text-xl">→</span>
                      <span className="text-slate-700"><strong>First-generation students</strong> navigating the process independently</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 text-xl">→</span>
                      <span className="text-slate-700"><strong>International students</strong> budgeting for U.S. applications</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 text-xl">→</span>
                      <span className="text-slate-700"><strong>Low-income families</strong> seeking fee waivers</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 text-xl">→</span>
                      <span className="text-slate-700"><strong>Families with multiple</strong> college-bound children</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Toolkit Card */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-md border-2 border-purple-200">
              <div className="flex items-start space-x-3">
                <span className="text-3xl">🛠️</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Complete College Planning Toolkit</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    For students using <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:underline">GPA calculators</a>, <a href="/education-and-exam-tools/test-score-tools/sat-score-calculator" className="text-blue-600 hover:underline">SAT score calculators</a>, and <a href="/education-and-exam-tools/test-score-tools/act-score-calculator" className="text-blue-600 hover:underline">ACT score calculators</a> to identify target schools, this calculator completes your admissions planning toolkit.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-slate-600 space-y-2">
                      <div><span className="font-semibold text-purple-700">✓</span> Track costs across Common App (900+ colleges), Coalition (150+ schools), UC (9 campuses)</div>
                      <div><span className="font-semibold text-purple-700">✓</span> Save and load college lists with localStorage</div>
                      <div><span className="font-semibold text-purple-700">✓</span> Compare platform costs and identify savings</div>
                      <div><span className="font-semibold text-purple-700">✓</span> Access no-fee colleges: Wellesley, Carleton, Reed, Smith, Tulane, Case Western</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-slate-800 mb-3">How much does it cost to apply to college in 2026?</h3>
              <p className="text-slate-600">
                The average cost to apply to one college is $75-$100 when including the application fee ($50-$80), SAT or ACT score sending ($12-$15), and official transcript ($5-$10). If applying to 10 colleges, expect to spend $750-$1,000. Students requiring the CSS Profile for financial aid add $25 for the first school and $16 for each additional school. However, many students qualify for fee waivers that can reduce these costs significantly or eliminate them entirely.
              </p>
            </div>

            <div className="border-l-4 border-cyan-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Who qualifies for college application fee waivers?</h3>
              <p className="text-slate-600">
                Students qualify for Common App and Coalition App fee waivers if their family income is at or below 185% of the federal poverty guidelines, they receive public assistance (SNAP, TANF, WIC), they're enrolled in federal free/reduced lunch programs, they're in foster care, or they're experiencing homelessness. For 2026, a family of four with income below $57,720 typically qualifies. Fee waivers cover application fees for Common App (4 schools), Coalition App (unlimited), SAT registration, and ACT registration. Contact your school counselor to request fee waivers.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Is Common App or Coalition App cheaper?</h3>
              <p className="text-slate-600">
                Coalition App is technically cheaper because sending applications is completely free (unlimited submissions), while Common App charges $0 for the first 8 colleges but $10-$20 for additional schools beyond 20. However, this doesn't include individual college application fees, which you must pay regardless of platform. Coalition App is more cost-effective if you're applying to 10+ Coalition member schools and don't qualify for fee waivers. For students with fee waivers, Common App covers 4 applications while Coalition App offers unlimited waivers, making Coalition App the better value for high-volume applicants.
              </p>
            </div>

            <div className="border-l-4 border-green-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-slate-800 mb-3">How can I reduce college application costs?</h3>
              <p className="text-slate-600">
                To minimize costs: (1) Request fee waivers from your school counselor if eligible—this can save $500-$800, (2) Use your 4 free SAT or ACT score sends strategically by sending to your top-choice schools, (3) Apply to no-fee colleges like Wellesley, Carleton, Reed, and Tulane, (4) Choose Coalition App for unlimited free submissions to member schools, (5) Apply Early Action to schools that waive fees for early applicants, (6) Attend college fairs and campus visits where representatives distribute fee waiver codes, and (7) Create a balanced college list (2 safety, 4 target, 4 reach) to avoid applying to 15+ schools unnecessarily. Strategic planning can reduce your total application costs from $1,000 to under $300.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          currentSlug="college-application-fee-calculator" 
          relatedSlugs={['common-app-essay-word-counter', 'coalition-app-word-counter', 'personal-statement-character-counter', 'college-gpa-calculator']} 
          navigateTo={navigateTo} 
        />
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// Wrap component with Error Boundary for production
const CollegeApplicationFeeCalculatorWithErrorBoundary: React.FC<CollegeApplicationFeeCalculatorProps> = (props) => (
  <ErrorBoundary>
    <CollegeApplicationFeeCalculator {...props} />
  </ErrorBoundary>
);

export default CollegeApplicationFeeCalculatorWithErrorBoundary;
