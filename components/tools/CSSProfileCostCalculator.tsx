import React, { useState, useEffect, useRef, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface CSSProfileCostCalculatorProps {
  navigateTo: (page: Page) => void;
}

interface CostBreakdown {
  numberOfSchools: number;
  initialFee: number;
  additionalSchoolsFee: number;
  totalCost: number;
  feeWaiverEligible: boolean;
  finalCost: number;
}

interface SavedCalculation {
  id: string;
  numberOfSchools: number;
  householdIncome: string;
  householdSize: number;
  totalCost: number;
  feeWaiverEligible: boolean;
  timestamp: number;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/admission-tools/css-profile-cost-calculator';

// CSS Profile Fee Structure 2026
const INITIAL_SCHOOL_FEE = 25;
const ADDITIONAL_SCHOOL_FEE = 16;

// Fee Waiver Income Thresholds 2026 (based on family size)
const FEE_WAIVER_THRESHOLDS: { [key: number]: number } = {
  1: 27180,
  2: 36620,
  3: 46060,
  4: 55500,
  5: 64940,
  6: 74380,
  7: 83820,
  8: 93260,
};

const CSSProfileCostCalculator: React.FC<CSSProfileCostCalculatorProps> = ({ navigateTo }) => {
  const [numberOfSchools, setNumberOfSchools] = useState<number>(6);
  const [householdIncome, setHouseholdIncome] = useState<string>('');
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [showFeeWaiverChecker, setShowFeeWaiverChecker] = useState<boolean>(false);
  // costBreakdown is now calculated via useMemo below
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  // SEO Optimization
  useEffect(() => {
    document.title = "CSS Profile Cost Calculator 2026 - Fee Waiver Eligibility Checker | ZuraWebTools";

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}='${name}']`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Free CSS Profile cost calculator 2026. Calculate fees ($25 + $16/school), check fee waiver eligibility by income. 400+ colleges require CSS Profile.');
    setMeta('keywords', 'css profile cost calculator, css profile fees 2026, college board css profile cost, how much does css profile cost, css profile fee waiver, css profile calculator, css profile cost per school, css profile vs fafsa cost, css profile application fee, css profile price, css profile fee waiver eligibility, css profile cost breakdown, how to pay for css profile, css profile financial aid, css profile fee waiver income limits, css profile international student fees, css profile deadline, colleges that require css profile, css profile application cost, css profile registration fee, css profile total cost, css profile fee waiver requirements, css profile college board fees, css profile expense calculator, css profile budget calculator');
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph tags
    setMeta('og:title', 'CSS Profile Cost Calculator 2026 - Fee Waiver Eligibility Checker', true);
    setMeta('og:description', 'Calculate CSS Profile fees instantly. $25 first school + $16 each additional school. Check fee waiver eligibility based on household income. 400+ colleges require CSS Profile.', true);
    setMeta('og:image', 'https://zurawebtools.com/og-css-profile-calculator.png', true);
    setMeta('og:url', CANONICAL_URL, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'ZuraWebTools', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'CSS Profile Cost Calculator 2026 - Fee Waiver Checker');
    setMeta('twitter:description', 'Free CSS Profile fee calculator. Calculate total costs ($25 + $16/school), check fee waiver eligibility instantly.');
    setMeta('twitter:image', 'https://zurawebtools.com/og-css-profile-calculator.png');

    // Canonical link
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = CANONICAL_URL;

    // Structured Data - JSON-LD with duplicate prevention
    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "CSS Profile Cost Calculator 2026",
        "description": "Calculate CSS Profile application fees and check fee waiver eligibility based on household income",
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
              "name": "CSS Profile Cost Calculator",
              "item": CANONICAL_URL
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CSS Profile Cost Calculator",
        "applicationCategory": "FinanceApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "387",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Free CSS Profile cost calculator with fee waiver eligibility checker for college financial aid applications"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does the CSS Profile cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The CSS Profile costs $25 for the first college and $16 for each additional college. For example, applying to 6 schools costs $105 total ($25 + 5×$16). Fee waivers are available for students whose families earn less than $100,000 annually and meet income eligibility criteria."
            }
          },
          {
            "@type": "Question",
            "name": "How do I qualify for a CSS Profile fee waiver?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You automatically qualify for a CSS Profile fee waiver if: (1) You received an SAT fee waiver, (2) You're enrolled in a federal free or reduced-price lunch program, (3) Your family income falls below USDA Income Eligibility Guidelines, or (4) You're an orphan/ward of the court under 24 years old. The waiver covers up to 8 colleges."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between CSS Profile and FAFSA cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FAFSA is completely free to submit to unlimited schools. CSS Profile charges $25 for the first school and $16 per additional school. However, CSS Profile collects more detailed financial information and is required by 400+ private colleges for institutional aid, while FAFSA is used for federal aid by all schools."
            }
          },
          {
            "@type": "Question",
            "name": "Which colleges require the CSS Profile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Over 400 colleges require CSS Profile, primarily private institutions and some public universities. Top schools include Harvard, Yale, Stanford, MIT, Duke, Northwestern, Vanderbilt, USC, and all Ivy League schools. Check College Board's CSS Profile website for a complete list of participating schools."
            }
          }
        ]
      }
    ];

    let scriptTag = document.querySelector('script[type="application/ld+json"][data-css-profile]') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-css-profile', 'true');
      scriptTag.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
    }

    // Load saved calculations from localStorage with error handling
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('css_profile_calculations');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setSavedCalculations(parsed);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load saved calculations:', error);
    }

    // Performance monitoring
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const perfObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('Performance entry:', entry.name, entry.startTime);
          }
        });
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
      } catch (error) {
        console.error('PerformanceObserver error:', error);
      }
    }

    return () => {
      const script = document.querySelector('script[data-css-profile]');
      if (script) script.remove();
    };
  }, []);

  // Calculate total cost with useMemo for performance
  const costBreakdown = useMemo(() => {
    if (numberOfSchools <= 0) return null;

    const initialFee = INITIAL_SCHOOL_FEE;
    const additionalSchools = numberOfSchools - 1;
    const additionalFee = additionalSchools > 0 ? additionalSchools * ADDITIONAL_SCHOOL_FEE : 0;
    const totalCost = initialFee + additionalFee;

    // Check fee waiver eligibility
    const income = parseFloat(householdIncome.replace(/[^0-9.]/g, ''));
    const threshold = FEE_WAIVER_THRESHOLDS[householdSize] || FEE_WAIVER_THRESHOLDS[8] + ((householdSize - 8) * 9440);
    const feeWaiverEligible = !isNaN(income) && income <= threshold;

    return {
      numberOfSchools,
      initialFee,
      additionalSchoolsFee: additionalFee,
      totalCost,
      feeWaiverEligible,
      finalCost: feeWaiverEligible ? 0 : totalCost,
    };
  }, [numberOfSchools, householdIncome, householdSize]);

  // Save calculation
  const handleSaveCalculation = () => {
    if (!costBreakdown) return;

    const newCalculation: SavedCalculation = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      numberOfSchools,
      householdIncome,
      householdSize,
      totalCost: costBreakdown.totalCost,
      feeWaiverEligible: costBreakdown.feeWaiverEligible,
      timestamp: Date.now(),
    };

    const updatedCalculations = [newCalculation, ...savedCalculations].slice(0, 10);
    setSavedCalculations(updatedCalculations);

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('css_profile_calculations', JSON.stringify(updatedCalculations));
      }
    } catch (error) {
      console.error('Failed to save calculation:', error);
    }

    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  // Delete saved calculation
  const handleDeleteCalculation = (id: string) => {
    const updatedCalculations = savedCalculations.filter(calc => calc.id !== id);
    setSavedCalculations(updatedCalculations);

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('css_profile_calculations', JSON.stringify(updatedCalculations));
      }
    } catch (error) {
      console.error('Failed to delete calculation:', error);
    }
  };

  // Load saved calculation
  const handleLoadCalculation = (calc: SavedCalculation) => {
    setNumberOfSchools(calc.numberOfSchools);
    setHouseholdIncome(calc.householdIncome);
    setHouseholdSize(calc.householdSize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Print function
  const handlePrint = () => {
    if (!costBreakdown) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CSS Profile Cost Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #3b82f6; padding-bottom: 20px; }
            .header h1 { color: #1e40af; margin: 0; font-size: 28px; }
            .header p { color: #64748b; margin: 10px 0 0 0; }
            .summary { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #3b82f6; }
            .summary h2 { color: #1e40af; margin-top: 0; font-size: 22px; }
            .cost-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
            .cost-item:last-child { border-bottom: none; font-weight: bold; font-size: 18px; color: #1e40af; }
            .cost-label { color: #475569; }
            .cost-value { color: #0f172a; font-weight: 600; }
            .waiver-box { background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981; }
            .waiver-box.not-eligible { background: #fee2e2; border-color: #ef4444; }
            .waiver-text { color: #065f46; font-weight: 600; font-size: 16px; margin: 0; }
            .waiver-text.not-eligible { color: #991b1b; }
            .breakdown { margin: 25px 0; }
            .breakdown h3 { color: #1e40af; font-size: 18px; margin-bottom: 15px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            .info-table td { padding: 10px; border: 1px solid #e2e8f0; }
            .info-table td:first-child { background: #f8fafc; font-weight: 600; color: #475569; width: 40%; }
            .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>CSS Profile Cost Report</h1>
            <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div class="summary">
            <h2>Cost Summary</h2>
            <div class="cost-item">
              <span class="cost-label">Number of Schools:</span>
              <span class="cost-value">${costBreakdown.numberOfSchools}</span>
            </div>
            <div class="cost-item">
              <span class="cost-label">Initial School Fee:</span>
              <span class="cost-value">$${costBreakdown.initialFee.toFixed(2)}</span>
            </div>
            ${costBreakdown.additionalSchoolsFee > 0 ? `
            <div class="cost-item">
              <span class="cost-label">Additional Schools (${costBreakdown.numberOfSchools - 1} × $${ADDITIONAL_SCHOOL_FEE}):</span>
              <span class="cost-value">$${costBreakdown.additionalSchoolsFee.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="cost-item">
              <span class="cost-label">Total CSS Profile Cost:</span>
              <span class="cost-value">$${costBreakdown.totalCost.toFixed(2)}</span>
            </div>
          </div>

          <div class="waiver-box ${costBreakdown.feeWaiverEligible ? '' : 'not-eligible'}">
            <p class="waiver-text ${costBreakdown.feeWaiverEligible ? '' : 'not-eligible'}">
              ${costBreakdown.feeWaiverEligible 
                ? '✓ Fee Waiver Eligible - Your final cost is $0.00' 
                : '✗ Not Fee Waiver Eligible - Full payment required'}
            </p>
          </div>

          ${householdIncome ? `
          <div class="breakdown">
            <h3>Household Information</h3>
            <table class="info-table">
              <tr>
                <td>Household Income</td>
                <td>$${parseFloat(householdIncome.replace(/[^0-9.]/g, '')).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Household Size</td>
                <td>${householdSize} members</td>
              </tr>
              <tr>
                <td>Income Threshold for Fee Waiver</td>
                <td>$${(FEE_WAIVER_THRESHOLDS[householdSize] || FEE_WAIVER_THRESHOLDS[8] + ((householdSize - 8) * 9440)).toLocaleString()}</td>
              </tr>
            </table>
          </div>
          ` : ''}

          <div class="breakdown">
            <h3>Important Notes</h3>
            <ul>
              <li>CSS Profile fees are non-refundable once submitted to colleges</li>
              <li>Fee waivers cover up to 8 college applications</li>
              <li>Payment methods: Credit card, debit card, or PayPal</li>
              <li>International students may have different fee structures</li>
              <li>Check individual college deadlines as CSS Profile timing varies</li>
            </ul>
          </div>

          <div class="footer">
            <p>Generated by ZuraWebTools - CSS Profile Cost Calculator</p>
            <p>Visit https://zurawebtools.com for more free tools</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Download function
  const handleDownload = () => {
    if (!costBreakdown) return;

    let textContent = `CSS PROFILE COST CALCULATOR REPORT\n`;
    textContent += `${'='.repeat(50)}\n`;
    textContent += `Generated on: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}\n\n`;

    textContent += `COST BREAKDOWN\n`;
    textContent += `${'-'.repeat(50)}\n`;
    textContent += `Number of Schools: ${costBreakdown.numberOfSchools}\n`;
    textContent += `Initial School Fee: $${costBreakdown.initialFee.toFixed(2)}\n`;
    if (costBreakdown.additionalSchoolsFee > 0) {
      textContent += `Additional Schools (${costBreakdown.numberOfSchools - 1} × $${ADDITIONAL_SCHOOL_FEE}): $${costBreakdown.additionalSchoolsFee.toFixed(2)}\n`;
    }
    textContent += `Total CSS Profile Cost: $${costBreakdown.totalCost.toFixed(2)}\n\n`;

    textContent += `FEE WAIVER STATUS\n`;
    textContent += `${'-'.repeat(50)}\n`;
    if (costBreakdown.feeWaiverEligible) {
      textContent += `✓ Fee Waiver Eligible - Your final cost is $0.00\n\n`;
    } else {
      textContent += `✗ Not Fee Waiver Eligible - Full payment required: $${costBreakdown.totalCost.toFixed(2)}\n\n`;
    }

    if (householdIncome) {
      textContent += `HOUSEHOLD INFORMATION\n`;
      textContent += `${'-'.repeat(50)}\n`;
      textContent += `Household Income: $${parseFloat(householdIncome.replace(/[^0-9.]/g, '')).toLocaleString()}\n`;
      textContent += `Household Size: ${householdSize} members\n`;
      const threshold = FEE_WAIVER_THRESHOLDS[householdSize] || FEE_WAIVER_THRESHOLDS[8] + ((householdSize - 8) * 9440);
      textContent += `Income Threshold for Fee Waiver: $${threshold.toLocaleString()}\n\n`;
    }

    textContent += `IMPORTANT NOTES\n`;
    textContent += `${'-'.repeat(50)}\n`;
    textContent += `- CSS Profile fees are non-refundable once submitted\n`;
    textContent += `- Fee waivers cover up to 8 college applications\n`;
    textContent += `- Payment methods: Credit card, debit card, or PayPal\n`;
    textContent += `- International students may have different fee structures\n`;
    textContent += `- Check individual college deadlines\n\n`;

    textContent += `${'='.repeat(50)}\n`;
    textContent += `Generated by ZuraWebTools - CSS Profile Cost Calculator\n`;
    textContent += `Visit https://zurawebtools.com for more free tools\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CSS_Profile_Cost_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clear all inputs
  const handleClear = () => {
    setNumberOfSchools(6);
    setHouseholdIncome('');
    setHouseholdSize(4);
    setShowFeeWaiverChecker(false);
    // costBreakdown will automatically recalculate via useMemo
  };

  // Format income input
  const handleIncomeChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue) {
      const formatted = parseInt(numericValue).toLocaleString();
      setHouseholdIncome(formatted);
    } else {
      setHouseholdIncome('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CSS Profile Cost Calculator 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-4xl mx-auto">
            Calculate College Board CSS Profile application fees instantly. Check fee waiver eligibility based on household income. Free calculator for college financial aid applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span aria-hidden="true">💰</span> $25 First School + $16 Each Additional
            </span>
            <span className="flex items-center gap-1">
              <span aria-hidden="true">🎓</span> 400+ Colleges Require CSS Profile
            </span>
            <span className="flex items-center gap-1">
              <span aria-hidden="true">✅</span> Fee Waiver Checker Included
            </span>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="text-3xl mr-3" aria-hidden="true">🧮</span>
            Calculate Your CSS Profile Costs
          </h2>

          {/* Number of Schools Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              How many colleges are you applying to?
            </label>
            <div className="flex items-center gap-4 mb-4">
              <input
                type="range"
                min="1"
                max="20"
                value={numberOfSchools}
                onChange={(e) => setNumberOfSchools(parseInt(e.target.value))}
                className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="text-3xl font-bold text-blue-600 min-w-[60px] text-center">
                {numberOfSchools}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>1 school</span>
              <span>10 schools</span>
              <span>20 schools</span>
            </div>
          </div>

          {/* Fee Waiver Checker Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowFeeWaiverChecker(!showFeeWaiverChecker)}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span aria-hidden="true">{showFeeWaiverChecker ? '✓' : '📋'}</span>
              {showFeeWaiverChecker ? 'Fee Waiver Checker Active' : 'Check Fee Waiver Eligibility'}
            </button>
          </div>

          {/* Fee Waiver Checker Section */}
          {showFeeWaiverChecker && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <span className="text-2xl mr-2" aria-hidden="true">💚</span>
                Fee Waiver Eligibility Checker
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual Household Income (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                    <input
                      type="text"
                      value={householdIncome}
                      onChange={(e) => handleIncomeChange(e.target.value)}
                      placeholder="e.g., 55,000"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Household Size (Number of People)
                  </label>
                  <select
                    value={householdSize}
                    onChange={(e) => setHouseholdSize(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                      <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic">
                <span aria-hidden="true">ℹ️</span> Fee waiver income thresholds are based on USDA Income Eligibility Guidelines. Automatic eligibility also applies to SAT fee waiver recipients and students in free/reduced lunch programs.
              </p>
            </div>
          )}

          {/* Cost Breakdown Display */}
          {costBreakdown && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">💵</span>
                Your CSS Profile Cost Breakdown
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-700 font-medium">First School Fee:</span>
                  <span className="text-xl font-bold text-gray-900">${costBreakdown.initialFee.toFixed(2)}</span>
                </div>

                {costBreakdown.additionalSchoolsFee > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-gray-700 font-medium">
                      Additional Schools ({costBreakdown.numberOfSchools - 1} × ${ADDITIONAL_SCHOOL_FEE}):
                    </span>
                    <span className="text-xl font-bold text-gray-900">${costBreakdown.additionalSchoolsFee.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-t-2 border-blue-300 mt-2">
                  <span className="text-lg font-bold text-gray-900">Total CSS Profile Cost:</span>
                  <span className="text-3xl font-bold text-blue-600">${costBreakdown.totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Fee Waiver Status */}
              {costBreakdown.feeWaiverEligible ? (
                <div 
                  className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center"
                  role="status"
                  aria-label="Fee waiver eligible - your cost is zero dollars"
                >
                  <p className="text-green-800 font-bold text-xl flex items-center justify-center gap-2">
                    <span aria-hidden="true">🎉</span> Congratulations! You're eligible for a fee waiver!
                  </p>
                  <p className="text-green-700 mt-2 text-lg">
                    Your final cost: <span className="font-bold text-2xl">$0.00</span>
                  </p>
                  <p className="text-green-600 text-sm mt-2">
                    Fee waiver covers up to 8 colleges. Additional schools beyond 8 will cost $16 each.
                  </p>
                </div>
              ) : householdIncome ? (
                <div 
                  className="bg-orange-100 border-2 border-orange-500 rounded-lg p-4 text-center"
                  role="status"
                  aria-label="Not eligible for fee waiver - full payment required"
                >
                  <p className="text-orange-800 font-bold text-lg flex items-center justify-center gap-2">
                    <span aria-hidden="true">ℹ️</span> Not eligible for fee waiver based on income
                  </p>
                  <p className="text-orange-700 mt-2">
                    Full payment required: <span className="font-bold text-xl">${costBreakdown.totalCost.toFixed(2)}</span>
                  </p>
                  <p className="text-orange-600 text-sm mt-2">
                    You may still qualify through other criteria (SAT fee waiver, free lunch program, orphan/ward status).
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleSaveCalculation}
              disabled={!costBreakdown}
              title="Save current calculation to browser storage"
              className="flex-1 min-w-[140px] px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span aria-hidden="true">💾</span> Save Calculation
            </button>
            
            <button
              onClick={handlePrint}
              disabled={!costBreakdown}
              title="Print cost breakdown report"
              className="flex-1 min-w-[140px] px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span aria-hidden="true">🖨️</span> Print Report
            </button>
            
            <button
              onClick={handleDownload}
              disabled={!costBreakdown}
              title="Download cost breakdown as text file"
              className="flex-1 min-w-[140px] px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span aria-hidden="true">📥</span> Download
            </button>
            
            <button
              onClick={handleClear}
              title="Clear all inputs"
              className="flex-1 min-w-[140px] px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span aria-hidden="true">🗑️</span> Clear
            </button>
          </div>

          {/* Save Success Message */}
          {showSaveSuccess && (
            <div className="mt-4 bg-green-100 border-2 border-green-500 rounded-lg p-3 text-center">
              <p className="text-green-800 font-semibold">
                <span aria-hidden="true">✓</span> Calculation saved successfully!
              </p>
            </div>
          )}
        </div>

        {/* Comparison Table Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            title={showComparison ? 'Hide cost comparison' : 'Show cost comparison'}
            className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span aria-hidden="true">📊</span> {showComparison ? 'Hide' : 'Show'} Cost Comparison by Number of Schools
          </button>
        </div>

        {/* Cost Comparison Table */}
        {showComparison && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-3xl mr-3" aria-hidden="true">📊</span>
              CSS Profile Cost Comparison Table
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Number of Schools</th>
                    <th className="px-4 py-3 text-left font-semibold">Initial Fee</th>
                    <th className="px-4 py-3 text-left font-semibold">Additional Schools Fee</th>
                    <th className="px-4 py-3 text-left font-semibold">Total Cost</th>
                    <th className="px-4 py-3 text-left font-semibold">With Fee Waiver</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((schools, index) => {
                    const additionalFee = schools > 1 ? (schools - 1) * ADDITIONAL_SCHOOL_FEE : 0;
                    const total = INITIAL_SCHOOL_FEE + additionalFee;
                    const withWaiver = schools <= 8 ? 0 : (schools - 8) * ADDITIONAL_SCHOOL_FEE;
                    
                    return (
                      <tr 
                        key={schools} 
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-900">{schools}</td>
                        <td className="px-4 py-3 text-gray-800">${INITIAL_SCHOOL_FEE}.00</td>
                        <td className="px-4 py-3 text-gray-800">${additionalFee}.00</td>
                        <td className="px-4 py-3 font-bold text-blue-600">${total}.00</td>
                        <td className="px-4 py-3 font-bold text-green-600">${withWaiver}.00</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-gray-600 italic">
              <span aria-hidden="true">💡</span> Note: Fee waiver covers up to 8 colleges. Schools beyond 8 cost $16 each even with fee waiver.
            </p>
          </div>
        )}

        {/* Saved Calculations */}
        {savedCalculations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-3xl mr-3" aria-hidden="true">📚</span>
              Saved Calculations ({savedCalculations.length})
            </h2>

            <div className="grid gap-4">
              {savedCalculations.map((calc) => (
                <div 
                  key={calc.id}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border-2 border-gray-200 hover:border-blue-400 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-600">
                        {new Date(calc.timestamp).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="font-bold text-xl text-blue-600 mt-1">
                        ${calc.totalCost.toFixed(2)}
                        {calc.feeWaiverEligible && <span className="ml-2 text-green-600 text-sm">(Fee Waiver Eligible)</span>}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoadCalculation(calc)}
                        title="Load this calculation into calculator"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <span aria-hidden="true">📂</span> Load
                      </button>
                      <button
                        onClick={() => handleDeleteCalculation(calc.id)}
                        title="Delete this saved calculation"
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <span aria-hidden="true">🗑️</span> Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-700">
                      <strong>Schools:</strong> {calc.numberOfSchools}
                    </span>
                    {calc.householdIncome && (
                      <>
                        <span className="text-gray-700">
                          <strong>Income:</strong> ${calc.householdIncome}
                        </span>
                        <span className="text-gray-700">
                          <strong>Household Size:</strong> {calc.householdSize}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Sharing */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            <span aria-hidden="true">📤</span> Share This Tool
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Help other students calculate CSS Profile costs and find fee waivers!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=Calculate CSS Profile fees instantly! Check fee waiver eligibility. Free tool: ${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Twitter"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold rounded-lg hover:from-sky-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span aria-hidden="true">🐦</span> Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on Facebook"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span aria-hidden="true">📘</span> Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on LinkedIn"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span aria-hidden="true">💼</span> LinkedIn
            </a>
            <a
              href={`https://wa.me/?text=CSS Profile Cost Calculator - Calculate fees and check fee waiver eligibility: ${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Share on WhatsApp"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span aria-hidden="true">💬</span> WhatsApp
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(CANONICAL_URL);
                alert('Link copied to clipboard!');
              }}
              title="Copy link to clipboard"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span aria-hidden="true">🔗</span> Copy Link
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
            <span className="text-3xl mr-3" aria-hidden="true">💡</span>
            Quick Tips for CSS Profile Applications
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
              <span className="text-gray-800"><strong>Apply Early:</strong> CSS Profile opens October 1st. Submit as soon as possible after deadlines open to maximize aid eligibility.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
              <span className="text-gray-800"><strong>Use Fee Waivers:</strong> If eligible, fee waivers cover up to 8 colleges automatically—saving you up to $137.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
              <span className="text-gray-800"><strong>Gather Documents:</strong> Have tax returns, W-2s, bank statements, and investment records ready before starting.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
              <span className="text-gray-800"><strong>Check College Deadlines:</strong> CSS Profile deadlines vary by school. Some are as early as November for Early Decision/Action.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
              <span className="text-gray-800"><strong>Non-Refundable:</strong> Fees are non-refundable once submitted. Double-check your college list before paying.</span>
            </li>
          </ul>
        </div>

        {/* About CSS Profile */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-3">
            <span aria-hidden="true">📚</span> About CSS Profile & Cost Structure
          </h2>

          <div className="space-y-8">
            {/* What is CSS Profile */}
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">📝</span>
                What is the CSS Profile?
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  The <strong>CSS Profile (College Scholarship Service Profile)</strong> is an online financial aid application created and administered by the College Board. Unlike the FAFSA (Free Application for Federal Student Aid), which is used to determine eligibility for federal aid, the CSS Profile is used by approximately <strong>400 colleges, universities, and scholarship programs</strong> to award their own institutional financial aid.
                </p>
                <p>
                  The CSS Profile collects more detailed financial information than the FAFSA, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Home equity value</li>
                  <li>Parent and student assets (savings, investments, real estate)</li>
                  <li>Non-custodial parent financial information (if parents are divorced/separated)</li>
                  <li>Small business and farm details</li>
                  <li>Medical and dental expenses</li>
                  <li>Sibling educational expenses</li>
                </ul>
                <p>
                  This comprehensive approach allows colleges to create a more accurate financial aid package tailored to your family's specific circumstances. Schools that use CSS Profile typically have larger endowments and can offer more generous need-based aid.
                </p>
              </div>
            </div>

            {/* CSS Profile Fee Structure */}
            <div>
              <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">💰</span>
                CSS Profile Fee Structure 2026
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  The CSS Profile charges the following fees for the 2025-2026 academic year:
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="text-blue-600 font-bold text-2xl" aria-hidden="true">•</span>
                      <span><strong className="text-blue-900">$25.00</strong> for the <strong>first college or program</strong></span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-blue-600 font-bold text-2xl" aria-hidden="true">•</span>
                      <span><strong className="text-blue-900">$16.00</strong> for <strong>each additional college or program</strong></span>
                    </li>
                  </ul>
                </div>
                <p>
                  <strong>Examples:</strong>
                </p>
                <ul className="list-none space-y-2 bg-gray-50 rounded-lg p-4">
                  <li><strong>1 school:</strong> $25.00</li>
                  <li><strong>3 schools:</strong> $25 + (2 × $16) = $57.00</li>
                  <li><strong>6 schools:</strong> $25 + (5 × $16) = $105.00</li>
                  <li><strong>10 schools:</strong> $25 + (9 × $16) = $169.00</li>
                </ul>
                <p className="text-red-700 font-semibold">
                  <span aria-hidden="true">⚠️</span> Important: CSS Profile fees are <strong>non-refundable</strong>. Once you submit your application to a college, you cannot get a refund even if you decide not to apply to that school.
                </p>
              </div>
            </div>

            {/* CSS Profile vs FAFSA Cost */}
            <div>
              <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">⚖️</span>
                CSS Profile vs FAFSA: Cost Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      <th className="px-6 py-4 text-left font-semibold">CSS Profile</th>
                      <th className="px-6 py-4 text-left font-semibold">FAFSA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Application Cost</td>
                      <td className="px-6 py-4 text-gray-800">$25 + $16 per school</td>
                      <td className="px-6 py-4 text-green-700 font-bold">FREE</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold text-gray-900">Number of Schools</td>
                      <td className="px-6 py-4 text-gray-800">Unlimited (pay per school)</td>
                      <td className="px-6 py-4 text-gray-800">Up to 20 schools (free)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Fee Waiver Available</td>
                      <td className="px-6 py-4 text-green-700">Yes (income-based)</td>
                      <td className="px-6 py-4 text-gray-500">N/A (already free)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold text-gray-900">Who Uses It</td>
                      <td className="px-6 py-4 text-gray-800">400+ colleges (mostly private)</td>
                      <td className="px-6 py-4 text-gray-800">All colleges & federal aid</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900">Purpose</td>
                      <td className="px-6 py-4 text-gray-800">Institutional aid</td>
                      <td className="px-6 py-4 text-gray-800">Federal & state aid</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-4 font-semibold text-gray-900">Detail Level</td>
                      <td className="px-6 py-4 text-gray-800">Very detailed</td>
                      <td className="px-6 py-4 text-gray-800">Basic financial info</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-gray-700 italic">
                <span aria-hidden="true">💡</span> <strong>Pro Tip:</strong> You should complete <strong>both</strong> CSS Profile and FAFSA if your colleges require CSS Profile. FAFSA is always free and required for federal aid (grants, loans, work-study).
              </p>
            </div>

            {/* Fee Waiver Eligibility */}
            <div>
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">🎫</span>
                Fee Waiver Eligibility Criteria
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  The College Board offers <strong>automatic fee waivers</strong> for the CSS Profile to students who meet any of the following criteria:
                </p>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-300">
                  <h4 className="font-bold text-green-900 mb-3 text-lg">Automatic Eligibility:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
                      <span>You received an <strong>SAT fee waiver</strong> from the College Board</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
                      <span>You are enrolled in or eligible for the <strong>Federal Free or Reduced Price Lunch program</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
                      <span>Your annual <strong>family income falls below the USDA Income Eligibility Guidelines</strong> (see table below)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 font-bold text-xl" aria-hidden="true">✓</span>
                      <span>You are an <strong>orphan or ward of the court</strong> who is younger than 24 years old</span>
                    </li>
                  </ul>
                </div>

                <h4 className="font-bold text-gray-900 mt-6 mb-3 text-lg">Income Eligibility Thresholds (2026):</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <th className="px-4 py-3 text-left font-semibold">Household Size</th>
                        <th className="px-4 py-3 text-left font-semibold">Maximum Annual Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(FEE_WAIVER_THRESHOLDS).map(([size, income], index) => (
                        <tr key={size} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 font-medium text-gray-900">{size} {parseInt(size) === 1 ? 'person' : 'people'}</td>
                          <td className="px-4 py-3 text-gray-800 font-semibold">${income.toLocaleString()}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100">
                        <td className="px-4 py-3 font-medium text-gray-700 italic">Each additional person</td>
                        <td className="px-4 py-3 text-gray-700 italic">Add $9,440</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500 mt-4">
                  <p className="font-semibold text-blue-900 mb-2">
                    <span aria-hidden="true">🎉</span> Fee Waiver Coverage:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Covers <strong>up to 8 colleges or programs</strong></li>
                    <li>Automatically applied when you create your CSS Profile account</li>
                    <li>Additional schools beyond 8 cost $16 each (even with fee waiver)</li>
                    <li>No separate application required—eligibility is determined automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Colleges that Require CSS Profile */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">🏛️</span>
                Which Colleges Require CSS Profile?
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  Over <strong>400 colleges, universities, and scholarship programs</strong> require the CSS Profile for financial aid consideration. These institutions are primarily <strong>private colleges</strong> with substantial endowments that offer generous need-based financial aid packages.
                </p>

                <h4 className="font-bold text-gray-900 mt-4 mb-3">Top CSS Profile Schools Include:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-2 border-blue-200">
                    <h5 className="font-bold text-blue-900 mb-3 text-lg">Ivy League Schools (All 8):</h5>
                    <ul className="space-y-2 text-gray-800">
                      <li><span aria-hidden="true">🎓</span> Harvard University</li>
                      <li><span aria-hidden="true">🎓</span> Yale University</li>
                      <li><span aria-hidden="true">🎓</span> Princeton University</li>
                      <li><span aria-hidden="true">🎓</span> Columbia University</li>
                      <li><span aria-hidden="true">🎓</span> University of Pennsylvania</li>
                      <li><span aria-hidden="true">🎓</span> Brown University</li>
                      <li><span aria-hidden="true">🎓</span> Dartmouth College</li>
                      <li><span aria-hidden="true">🎓</span> Cornell University</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border-2 border-purple-200">
                    <h5 className="font-bold text-purple-900 mb-3 text-lg">Other Top Private Universities:</h5>
                    <ul className="space-y-2 text-gray-800">
                      <li><span aria-hidden="true">🎓</span> Stanford University</li>
                      <li><span aria-hidden="true">🎓</span> MIT</li>
                      <li><span aria-hidden="true">🎓</span> Duke University</li>
                      <li><span aria-hidden="true">🎓</span> Northwestern University</li>
                      <li><span aria-hidden="true">🎓</span> University of Chicago</li>
                      <li><span aria-hidden="true">🎓</span> Vanderbilt University</li>
                      <li><span aria-hidden="true">🎓</span> Rice University</li>
                      <li><span aria-hidden="true">🎓</span> USC (University of Southern California)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-500 mt-4">
                  <p className="font-semibold text-yellow-900 mb-2">
                    <span aria-hidden="true">🔍</span> How to Check if Your College Requires CSS Profile:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-yellow-800">
                    <li>Visit the <strong>College Board CSS Profile website</strong></li>
                    <li>Go to the "Participating Institutions" page</li>
                    <li>Search for your college by name or browse alphabetically</li>
                    <li>Check the college's financial aid website for specific requirements and deadlines</li>
                  </ol>
                </div>

                <p className="text-gray-700 mt-4">
                  <strong>Note:</strong> Some <strong>public universities</strong> also use CSS Profile, particularly for out-of-state students or special scholarship programs. Always check your specific colleges' financial aid requirements.
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">💳</span>
                How to Pay for CSS Profile
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  The College Board accepts the following payment methods for CSS Profile fees:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 text-center border-2 border-blue-300">
                    <span className="text-4xl mb-3 block" aria-hidden="true">💳</span>
                    <h4 className="font-bold text-blue-900 text-lg mb-2">Credit Card</h4>
                    <p className="text-gray-700 text-sm">Visa, Mastercard, American Express, Discover</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 text-center border-2 border-green-300">
                    <span className="text-4xl mb-3 block" aria-hidden="true">💰</span>
                    <h4 className="font-bold text-green-900 text-lg mb-2">Debit Card</h4>
                    <p className="text-gray-700 text-sm">Any debit card with Visa or Mastercard logo</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 text-center border-2 border-purple-300">
                    <span className="text-4xl mb-3 block" aria-hidden="true">📧</span>
                    <h4 className="font-bold text-purple-900 text-lg mb-2">PayPal</h4>
                    <p className="text-gray-700 text-sm">Link your PayPal account for payment</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-5 border-l-4 border-red-500 mt-4">
                  <p className="font-semibold text-red-900 mb-2">
                    <span aria-hidden="true">⚠️</span> Important Payment Information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-red-800">
                    <li><strong>Non-refundable:</strong> Once payment is processed, you cannot get a refund</li>
                    <li><strong>Pay per submission:</strong> You're charged when you submit to each college</li>
                    <li><strong>International cards:</strong> Most international credit/debit cards are accepted</li>
                    <li><strong>Payment issues:</strong> Contact College Board customer service for payment errors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* International Students */}
            <div>
              <h3 className="text-2xl font-bold text-teal-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">🌍</span>
                CSS Profile for International Students
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  <strong>International students</strong> can use CSS Profile to apply for financial aid at participating U.S. colleges. However, there are some important differences:
                </p>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border-2 border-teal-300">
                  <h4 className="font-bold text-teal-900 mb-3">Key Points for International Students:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-teal-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Same fees apply:</strong> $25 first school + $16 per additional school</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Limited fee waivers:</strong> International students typically do NOT qualify for CSS Profile fee waivers (unless they meet specific criteria)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Need-aware admissions:</strong> Many colleges are "need-aware" for international students, meaning financial aid requests may affect admission decisions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Currency conversion:</strong> Report all financial information in U.S. dollars (use current exchange rates)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-teal-600 font-bold text-xl" aria-hidden="true">•</span>
                      <span><strong>Additional documentation:</strong> Some schools may require translated tax documents or certified financial statements</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 mt-4">
                  <strong>Tip:</strong> Check each college's international student financial aid policy carefully. Some schools offer generous aid to international students, while others offer limited or no aid.
                </p>
              </div>
            </div>

            {/* Deadlines */}
            <div>
              <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center">
                <span className="text-3xl mr-3" aria-hidden="true">📅</span>
                CSS Profile Deadlines 2026
              </h3>
              <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
                <p>
                  CSS Profile deadlines <strong>vary by college</strong>. Unlike the FAFSA (which has a single federal deadline), each college sets its own CSS Profile deadline.
                </p>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border-2 border-orange-300">
                  <h4 className="font-bold text-orange-900 mb-3">Typical Deadline Timeline:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-orange-600 font-bold" aria-hidden="true">📌</span>
                      <span><strong>Early Decision/Early Action:</strong> November 1-15, 2025</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-600 font-bold" aria-hidden="true">📌</span>
                      <span><strong>Regular Decision (Priority):</strong> January 15 - February 15, 2026</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-600 font-bold" aria-hidden="true">📌</span>
                      <span><strong>Regular Decision (Final):</strong> March 1 - March 15, 2026</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-orange-600 font-bold" aria-hidden="true">📌</span>
                      <span><strong>Transfer Students:</strong> Varies widely (check individual colleges)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-100 rounded-lg p-5 border-l-4 border-red-600 mt-4">
                  <p className="font-bold text-red-900 mb-2 text-lg">
                    <span aria-hidden="true">⚠️</span> CRITICAL: Missing the Deadline
                  </p>
                  <p className="text-red-800">
                    If you miss a college's CSS Profile deadline, you may <strong>forfeit institutional financial aid</strong> for that year. While you can still complete CSS Profile late, you may only be considered for remaining aid funds, which are often limited. <strong>Always submit before the deadline!</strong>
                  </p>
                </div>

                <p className="text-gray-700 mt-4">
                  <strong>How to find your deadlines:</strong>
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-800 ml-4">
                  <li>Check each college's financial aid website</li>
                  <li>Look for "CSS Profile Deadline" or "Financial Aid Priority Deadline"</li>
                  <li>Add deadlines to your calendar with reminders 2 weeks before</li>
                  <li>Submit at least 1-2 weeks early to allow for processing</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center">
            <span className="text-3xl mr-3" aria-hidden="true">⚠️</span>
            Common CSS Profile Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 border-l-4 border-red-500 shadow-md">
              <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Paying Before Checking Fee Waiver Eligibility
              </h3>
              <p className="text-gray-800">
                Always check if you qualify for a fee waiver <strong>before</strong> submitting. Once you pay, you can't get a refund even if you were eligible for a waiver. The fee waiver checker is built into the CSS Profile application.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500 shadow-md">
              <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Submitting to Schools You're Not Applying To
              </h3>
              <p className="text-gray-800">
                CSS Profile fees are non-refundable. Don't waste money submitting to "maybe" schools or schools you're unlikely to attend. Finalize your college list before paying for CSS Profile submissions.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-yellow-500 shadow-md">
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Missing Individual College Deadlines
              </h3>
              <p className="text-gray-800">
                Each college has its own CSS Profile deadline. Missing a deadline can cost you thousands in institutional aid. Create a deadline calendar and submit at least 1-2 weeks early.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-green-500 shadow-md">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Not Completing FAFSA
              </h3>
              <p className="text-gray-800">
                CSS Profile does <strong>NOT</strong> replace FAFSA. You must complete <strong>both</strong> forms. FAFSA is required for federal aid (Pell Grants, federal loans, work-study), while CSS Profile determines institutional aid. Complete both!
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500 shadow-md">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Entering Inaccurate Financial Information
              </h3>
              <p className="text-gray-800">
                CSS Profile requires detailed financial data. Estimate carefully if you don't have exact figures (you can update later). Inaccurate information can delay aid packages or result in verification audits.
              </p>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500 shadow-md">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span aria-hidden="true">❌</span> Not Saving Your Application ID
              </h3>
              <p className="text-gray-800">
                After submitting, save your CSS Profile Application ID. You'll need it to check submission status, make corrections, or add more colleges later. Print or screenshot your confirmation page.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-purple-500 pb-3">
            <span aria-hidden="true">❓</span> Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                1. How much does the CSS Profile cost in 2026?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                The CSS Profile costs <strong>$25 for the first college</strong> and <strong>$16 for each additional college</strong>. For example, if you apply to 6 schools, the total cost is $105 ($25 + 5×$16). Fee waivers are available for eligible students based on household income, covering up to 8 colleges.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                2. How do I qualify for a CSS Profile fee waiver?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                You automatically qualify if you: (1) received an SAT fee waiver, (2) are enrolled in free/reduced-price lunch program, (3) have family income below USDA guidelines (e.g., $55,500 for a family of 4), or (4) are an orphan/ward under 24. The fee waiver covers up to 8 colleges and is applied automatically when you create your account.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                3. Is CSS Profile free like FAFSA?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                No, CSS Profile charges fees ($25 + $16 per school), while <strong>FAFSA is completely free</strong>. However, you should complete <strong>both</strong> forms if your colleges require CSS Profile. FAFSA determines federal aid eligibility (grants, loans, work-study), while CSS Profile helps colleges award their own institutional aid from endowments.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-900 mb-3">
                4. Which colleges require the CSS Profile?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Over 400 colleges require CSS Profile, including all Ivy League schools (Harvard, Yale, Princeton, Columbia, Penn, Brown, Dartmouth, Cornell), Stanford, MIT, Duke, Northwestern, Vanderbilt, Rice, USC, and University of Chicago. Most are private colleges with large endowments. Check College Board's "Participating Institutions" page for a complete list.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-900 mb-3">
                5. Are CSS Profile fees refundable?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>No, CSS Profile fees are non-refundable</strong> once you submit your application to a college. Even if you change your mind about applying to a school after submitting CSS Profile, you cannot get a refund. Double-check your college list before paying to avoid wasting money on schools you won't apply to.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-indigo-500">
              <h3 className="text-xl font-bold text-indigo-900 mb-3">
                6. Can I add more colleges later after submitting CSS Profile?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Yes, you can add additional colleges to your CSS Profile <strong>at any time</strong> after your initial submission. Each additional college costs $16 (or is free if you have remaining fee waiver coverage). Simply log back into your CSS Profile account and select "Add Colleges" to submit to more schools.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-500">
              <h3 className="text-xl font-bold text-teal-900 mb-3">
                7. Do international students pay the same CSS Profile fees?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Yes, international students pay the <strong>same fees</strong> ($25 + $16 per school). However, most international students do NOT qualify for fee waivers unless they meet specific eligibility criteria. International credit/debit cards and PayPal are accepted for payment. Note that many colleges are "need-aware" for international students.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-pink-500">
              <h3 className="text-xl font-bold text-pink-900 mb-3">
                8. When is the CSS Profile deadline for 2026?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                CSS Profile deadlines <strong>vary by college</strong>. Early Decision/Action deadlines are typically November 1-15, 2025. Regular Decision priority deadlines are usually January 15 - February 15, 2026. Check each college's financial aid website for exact deadlines. Missing the deadline may result in losing institutional aid eligibility.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">
                9. What payment methods does CSS Profile accept?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                CSS Profile accepts <strong>credit cards</strong> (Visa, Mastercard, American Express, Discover), <strong>debit cards</strong> (with Visa/Mastercard logo), and <strong>PayPal</strong>. International payment cards are accepted. Payment is processed immediately when you submit your application to each college.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-gray-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                10. How can I reduce my CSS Profile costs?
              </h3>
              <p className="text-gray-800 leading-relaxed">
                To minimize costs: (1) <strong>Check fee waiver eligibility</strong> before paying, (2) <strong>Narrow your college list</strong> to schools you're serious about applying to, (3) <strong>Don't submit to "safety" schools</strong> that don't offer good aid, (4) <strong>Prioritize colleges with generous aid</strong> (many meet 100% demonstrated need), and (5) <strong>Complete FAFSA first</strong> (it's free and may be sufficient for some schools).
              </p>
            </div>
          </div>
        </div>

        <RelatedTools 
          relatedSlugs={['college-application-fee-calculator', 'college-essay-length-calculator', 'common-app-essay-word-counter', 'college-admissions-calculator', 'personal-statement-character-counter']} 
          navigateTo={navigateTo} 
          currentSlug="css-profile-cost-calculator" 
        />
      </div>
    </div>
  );
};

export default CSSProfileCostCalculator;
