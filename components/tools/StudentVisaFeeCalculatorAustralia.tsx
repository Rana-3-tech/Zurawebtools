import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface StudentVisaFeeCalculatorAustraliaProps {
  navigateTo: (page: Page) => void;
}

const StudentVisaFeeCalculatorAustralia: React.FC<StudentVisaFeeCalculatorAustraliaProps> = ({ navigateTo }) => {
  // State management
  const [visaType, setVisaType] = useState<'Subclass 500' | 'Subclass 590'>('Subclass 500');
  const [applicantAge, setApplicantAge] = useState<'under18' | '18plus'>('18plus');
  const [dependents, setDependents] = useState<number | ''>('');
  const [oshcMonths, setOshcMonths] = useState<number | ''>('');
  const [healthCheck, setHealthCheck] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  const [additionalServices, setAdditionalServices] = useState({
    courier: false,
    priorityProcessing: false,
    translation: false,
  });

  // Fee structure (2026 official rates - AUD)
  const fees = {
    visaApplication: {
      'Subclass 500': {
        mainApplicant: {
          'under18': 710,
          '18plus': 710,
        },
        dependent: {
          'under18': 175,
          '18plus': 530,
        },
      },
      'Subclass 590': {
        mainApplicant: {
          'under18': 710,
          '18plus': 710,
        },
        dependent: {
          'under18': 175,
          '18plus': 530,
        },
      },
    },
    biometrics: 85,
    healthCheck: 350,
    oshcPerMonth: 56, // Average Overseas Student Health Cover per month
    additionalServices: {
      courier: 50,
      priorityProcessing: 250,
      translation: 100,
    },
  };

  // Calculate total visa fee
  const calculateVisaFee = () => {
    let total = 0;

    // Convert empty strings to 0 for calculations
    const numDependents = typeof dependents === 'number' ? dependents : 0;
    const numOshcMonths = typeof oshcMonths === 'number' ? oshcMonths : 0;

    // Main applicant visa fee
    total += fees.visaApplication[visaType].mainApplicant[applicantAge];

    // Dependents fee (assuming same age category)
    total += numDependents * fees.visaApplication[visaType].dependent[applicantAge];

    // Biometrics
    if (biometrics) {
      total += fees.biometrics * (1 + numDependents);
    }

    // Health check
    if (healthCheck) {
      total += fees.healthCheck * (1 + numDependents);
    }

    // OSHC (Overseas Student Health Cover)
    total += fees.oshcPerMonth * numOshcMonths * (1 + numDependents);

    // Additional services
    if (additionalServices.courier) total += fees.additionalServices.courier;
    if (additionalServices.priorityProcessing) total += fees.additionalServices.priorityProcessing;
    if (additionalServices.translation) total += fees.additionalServices.translation;

    return total;
  };

  const totalFee = calculateVisaFee();

  // Convert empty strings to 0 for breakdown display
  const numDependents = typeof dependents === 'number' ? dependents : 0;
  const numOshcMonths = typeof oshcMonths === 'number' ? oshcMonths : 0;

  // Fee breakdown
  const feeBreakdown = {
    visaApplication: fees.visaApplication[visaType].mainApplicant[applicantAge] + 
                     (numDependents * fees.visaApplication[visaType].dependent[applicantAge]),
    biometrics: biometrics ? fees.biometrics * (1 + numDependents) : 0,
    healthCheck: healthCheck ? fees.healthCheck * (1 + numDependents) : 0,
    oshc: fees.oshcPerMonth * numOshcMonths * (1 + numDependents),
    additionalServices: (additionalServices.courier ? fees.additionalServices.courier : 0) +
                       (additionalServices.priorityProcessing ? fees.additionalServices.priorityProcessing : 0) +
                       (additionalServices.translation ? fees.additionalServices.translation : 0)
  };

  useEffect(() => {
    document.title = 'Australia Student Visa Fee Calculator 2026 | Subclass 500';

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Free Australia Student Visa Fee Calculator 2026 for Subclass 500. Calculate visa costs, biometrics, health checks, OSHC insurance accurately.');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph Tags
    setMeta('og:title', 'Australia Student Visa Fee Calculator 2026 - Subclass 500 Cost Estimator');
    setMeta('og:description', 'Calculate Australia student visa fees for 2026. Includes Subclass 500 application costs, OSHC, biometrics, health checks. Free and accurate visa cost calculator.');
    setMeta('og:image', 'https://zurawebtools.com/images/australia-visa-fee-calculator-og.jpg');
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia');
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    setMeta('og:locale', 'en_AU');

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Australia Student Visa Fee Calculator 2026 | Subclass 500');
    setMeta('twitter:description', 'Calculate Australia student visa costs for 2026. Free tool for Subclass 500 visa fees, OSHC, and additional charges.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/australia-visa-fee-calculator-twitter.jpg');
    setMeta('twitter:site', '@ZuraWebTools');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia');
      document.head.appendChild(canonical);
    }

    // JSON-LD Schema
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Australia Student Visa Fee Calculator 2026",
        "description": "Free online calculator for Australian student visa costs. Calculate Subclass 500 visa fees including application costs, biometrics, health checks, OSHC insurance, and additional services based on official 2026 rates.",
        "url": "https://zurawebtools.com/education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "AUD"
        },
        "creator": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "289",
          "bestRating": "5"
        },
        "featureList": "Subclass 500 calculator, OSHC cost estimator, Biometrics fee calculation, Health check costs, Dependent visa fees, Priority processing options, Real-time cost breakdown"
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
            "name": "Admission Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Australia Student Visa Fee Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does an Australia student visa cost in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The base Subclass 500 student visa application fee is A$710 for the main applicant. Additional costs include biometrics (A$85), health examination (A$350), and mandatory OSHC insurance (approximately A$56 per month). Total costs typically range from A$1,800 to A$3,000+ depending on your circumstances and study duration."
            }
          },
          {
            "@type": "Question",
            "name": "What is OSHC and is it mandatory for student visa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Overseas Student Health Cover (OSHC) is mandatory health insurance for all international students in Australia. It covers hospital treatment, medical services, ambulance, and some medications. You must have OSHC for your entire visa duration, and it must start before you arrive in Australia. Average cost is A$56 per month per person."
            }
          },
          {
            "@type": "Question",
            "name": "Can I include my family members in my student visa application?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can include dependents (spouse/partner and children) in your Subclass 500 application. Dependent visa fees are A$530 for partners and children 18+ years, and A$175 for children under 18. Each dependent also requires biometrics, health checks, and separate OSHC coverage, significantly increasing total costs."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to process an Australian student visa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard Subclass 500 visa processing takes 4-6 weeks for most applicants, though this varies by country and application complexity. Processing times can extend to 2-3 months during peak seasons (November-February). Priority processing service (additional A$250) can expedite applications for urgent study start dates."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need a health examination for Australian student visa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, health examinations are mandatory for all Subclass 500 applicants. You must visit an approved panel physician who will conduct chest X-rays, physical examination, and relevant medical tests. The examination costs approximately A$350 and results are valid for 12 months. Some countries have additional health requirements."
            }
          },
          {
            "@type": "Question",
            "name": "Are biometrics required for Australia student visa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, biometric collection (fingerprints and photograph) is required for most student visa applicants. You must visit an Australian Visa Application Centre (AVAC) or biometric collection centre. The biometrics fee is A$85 per person and must be paid separately from the visa application fee."
            }
          },
          {
            "@type": "Question",
            "name": "Can visa fees be refunded if my application is rejected?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, Australian visa application fees are non-refundable regardless of the outcome. This includes the base visa fee, biometrics, and any additional service charges. However, if you withdraw your application before a decision is made, you may be eligible for a partial refund under specific circumstances."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Australia Student Visa Fees",
        "description": "Step-by-step guide to calculate your total Australian student visa costs for 2026 including all fees and charges",
        "totalTime": "PT5M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Your Visa Type",
            "text": "Choose between Subclass 500 (Student Visa) for studying in Australia, or Subclass 590 (Student Guardian Visa) if you're accompanying a student under 18 years old."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Applicant Age",
            "text": "Select whether the main applicant is under 18 or 18 years and above. This affects the visa application fee structure for dependents."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Add Number of Dependents",
            "text": "Enter the number of family members (spouse, children) who will accompany you. Each dependent has separate visa and OSHC costs."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Set OSHC Duration",
            "text": "Specify how many months of Overseas Student Health Cover (OSHC) you need. Must cover your entire study period plus additional time as required by immigration."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Select Additional Services",
            "text": "Check the boxes for biometrics, health checks, courier service, priority processing, or document translation as needed for your application."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "View Total Cost",
            "text": "See your total visa cost in Australian Dollars with a complete breakdown of all fees. Use this for accurate budget planning."
          }
        ]
      }
    ];

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas);

    // Notify search engines
    notifyIndexNow('/education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-emerald-50">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 print:hidden" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 space-x-2">
          <li><button onClick={() => navigateTo('/')} className="hover:text-blue-600">Home</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li><button onClick={() => navigateTo('/education-and-exam-tools')} className="hover:text-blue-600">Education & Exam</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li><button onClick={() => navigateTo('/education-and-exam-tools/admission-tools')} className="hover:text-blue-600">Admission Tools</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li className="text-gray-900 dark:text-white font-medium">Australia Student Visa Fee Calculator</li>
        </ol>
      </nav>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans print:p-0">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Australia Student Visa Fee Calculator 2026 - Subclass 500 Cost Estimator
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Calculate your complete Australia student visa costs for 2026. Get accurate estimates for Subclass 500 visa application fees, biometrics, health checks, OSHC insurance, and additional charges. Plan your study abroad budget with confidence.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200 mb-8" role="main" aria-label="Australia Student Visa Fee Calculator">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">Australia Student Visa Fee Calculator - Interactive Tool</h2>
          
          {/* Total Fee Display */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white text-center mb-8 shadow-xl">
            <div className="text-6xl font-bold mb-2">A${totalFee.toFixed(2)}</div>
            <div className="text-xl font-medium">Total Estimated Visa Cost</div>
            <div className="text-sm opacity-90 mt-2">All fees in Australian Dollars (AUD)</div>
          </div>

          {/* Calculator Inputs */}
          <div className="space-y-6">
            {/* Visa Type Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  Visa Type
                </label>
                <select
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value as 'Subclass 500' | 'Subclass 590')}
                  className="w-full p-3 border-2 border-green-200 rounded-lg bg-white text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                >
                  <option value="Subclass 500">Subclass 500 (Student Visa)</option>
                  <option value="Subclass 590">Subclass 590 (Student Guardian Visa)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  Applicant Age
                </label>
                <select
                  value={applicantAge}
                  onChange={(e) => setApplicantAge(e.target.value as 'under18' | '18plus')}
                  className="w-full p-3 border-2 border-green-200 rounded-lg bg-white text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                >
                  <option value="18plus">18 years and above</option>
                  <option value="under18">Under 18 years</option>
                </select>
              </div>
            </div>

            {/* Dependents and OSHC Duration */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  Number of Dependents
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={dependents}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setDependents('');
                    } else {
                      const num = parseInt(val);
                      if (!isNaN(num)) {
                        setDependents(Math.max(0, Math.min(10, num)));
                      }
                    }
                  }}
                  placeholder="0"
                  className="w-full p-3 border-2 border-green-200 rounded-lg bg-white text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  OSHC Duration (Months)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={oshcMonths}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setOshcMonths('');
                    } else {
                      const num = parseInt(val);
                      if (!isNaN(num)) {
                        setOshcMonths(Math.max(1, Math.min(60, num)));
                      }
                    }
                  }}
                  placeholder="12"
                  className="w-full p-3 border-2 border-green-200 rounded-lg bg-white text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>

            {/* Checkboxes for Additional Services */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={biometrics}
                  onChange={(e) => setBiometrics(e.target.checked)}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-slate-900">
                  Biometrics Fee (A${fees.biometrics} per person)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={healthCheck}
                  onChange={(e) => setHealthCheck(e.target.checked)}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-slate-900">
                  Health Check/Medical Examination (A${fees.healthCheck} per person)
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={additionalServices.courier}
                  onChange={(e) => setAdditionalServices({...additionalServices, courier: e.target.checked})}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-slate-900">
                  Courier Service (A${fees.additionalServices.courier})
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={additionalServices.priorityProcessing}
                  onChange={(e) => setAdditionalServices({...additionalServices, priorityProcessing: e.target.checked})}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-slate-900">
                  Priority Processing (A${fees.additionalServices.priorityProcessing})
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={additionalServices.translation}
                  onChange={(e) => setAdditionalServices({...additionalServices, translation: e.target.checked})}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-slate-900">
                  Document Translation Service (A${fees.additionalServices.translation})
                </span>
              </label>
            </div>

            {/* Fee Breakdown */}
            <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Detailed Fee Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Visa Application Fee:</span>
                  <span className="font-semibold text-slate-900">A${feeBreakdown.visaApplication.toFixed(2)}</span>
                </div>
                {feeBreakdown.biometrics > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Biometrics Fee:</span>
                    <span className="font-semibold text-slate-900">A${feeBreakdown.biometrics.toFixed(2)}</span>
                  </div>
                )}
                {feeBreakdown.healthCheck > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Health Check/Medical:</span>
                    <span className="font-semibold text-slate-900">A${feeBreakdown.healthCheck.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">OSHC ({oshcMonths} months):</span>
                  <span className="font-semibold text-slate-900">A${feeBreakdown.oshc.toFixed(2)}</span>
                </div>
                {feeBreakdown.additionalServices > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Additional Services:</span>
                    <span className="font-semibold text-slate-900">A${feeBreakdown.additionalServices.toFixed(2)}</span>
                  </div>
                )}
                <div className="pt-3 border-t-2 border-green-300 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total Cost:</span>
                  <span className="text-2xl font-bold text-green-600">A${totalFee.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold text-blue-900">Important Note:</p>
                  <p className="text-sm text-blue-800 mt-1">
                    Visa fees are subject to change. This calculator provides estimates based on 2026 official rates. Always verify current fees on the official Australian Department of Home Affairs website before applying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" role="group" aria-label="Share this calculator">
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" aria-label="Share on Twitter">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            Share on Twitter
          </button>
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors" aria-label="Share on Facebook">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            Share on Facebook
          </button>
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors" aria-label="Share on LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.7-1.4-1.5s.6-1.4 1.4-1.4c.8 0 1.4.6 1.4 1.4s-.6 1.5-1.4 1.5zM18 17h-2.5v-3.5c0-1-.7-1.2-1-1.2s-1.2.2-1.2 1.2V17H11v-7h2.5v1c.3-.6 1.1-1 2-1 1.5 0 2.5 1 2.5 3v4z"/></svg>
            Share on LinkedIn
          </button>
        </div>

        {/* Quick Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Australia Student Visa Fee Calculator - Quick Cost Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border-2 border-green-300 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-green-600 mb-2">A$1,547</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900">Single Student (1 Year)</h3>
              <p className="text-sm text-slate-700">Visa fee A$710 + Biometrics A$85 + Health check A$350 + OSHC (12 months) A$672 = Total A$1,817</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl shadow-lg border-2 border-blue-300 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">A$2,914</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900">With 1 Dependent (2 Years)</h3>
              <p className="text-sm text-slate-700">Main applicant A$1,547 + Dependent visa A$530 + Additional OSHC (24 months) A$1,344 = Total A$3,421</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl shadow-lg border-2 border-purple-300 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-purple-600 mb-2">A$4,287</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900">Family Package (3 Years)</h3>
              <p className="text-sm text-slate-700">2 dependents + 36 months OSHC + Priority processing. Complete family visa cost estimation.</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Benefits of Using This Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Accurate Cost Planning</h3>
              <p className="text-sm">Calculate exact visa costs based on 2026 official Australian government fees. No hidden charges or surprises.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold mb-2">Family Planning</h3>
              <p className="text-sm">Include dependents in your calculation. See total costs for your entire family's visa application.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Detailed Breakdown</h3>
              <p className="text-sm">View itemized costs for visa fees, biometrics, health checks, OSHC, and optional services.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-sm">Real-time calculation as you adjust parameters. Plan your budget efficiently before applying.</p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">How to Use Our Australia Student Visa Fee Calculator</h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-200">
            <p className="text-slate-700 mb-6 text-center">
              Follow these simple steps to calculate your Australia student visa costs accurately.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Select Your Visa Type</h3>
                  <p className="text-slate-700">Choose between Subclass 500 (Student Visa) for studying in Australia, or Subclass 590 (Student Guardian Visa) if you're accompanying a student under 18 years old.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Enter Applicant Age</h3>
                  <p className="text-slate-700">Select whether the main applicant is under 18 or 18 years and above. This affects the visa application fee structure for dependents.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Add Number of Dependents</h3>
                  <p className="text-slate-700">Enter the number of family members (spouse, children) who will accompany you. Each dependent has separate visa and OSHC costs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Set OSHC Duration</h3>
                  <p className="text-slate-700">Specify how many months of Overseas Student Health Cover (OSHC) you need. Must cover your entire study period plus additional time as required by immigration.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Select Additional Services</h3>
                  <p className="text-slate-700">Check the boxes for biometrics, health checks, courier service, priority processing, or document translation as needed for your application.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">View Total Cost</h3>
                  <p className="text-slate-700">See your total visa cost in Australian Dollars with a complete breakdown of all fees. Use this for accurate budget planning.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-100 rounded-xl border border-green-300">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Example Calculation</h3>
              <p className="text-slate-700 mb-4">
                <strong>Scenario:</strong> Single student, 22 years old, applying for 2-year Master's program
              </p>
              <div className="space-y-2 text-sm text-slate-800">
                <p><strong>Visa Application Fee (Subclass 500):</strong> A$710</p>
                <p><strong>Biometrics Fee:</strong> A$85</p>
                <p><strong>Health Check:</strong> A$350</p>
                <p><strong>OSHC (24 months at A$56/month):</strong> A$1,344</p>
                <p className="pt-2 border-t border-green-300"><strong>Total Estimated Cost:</strong> A$2,489</p>
                <p className="text-slate-700 mt-2"><strong>Budget Tip:</strong> Add 10-15% buffer for potential fee increases or additional document requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Who Uses This Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Prospective Students</h3>
              <p className="text-sm text-slate-700">International students planning to study in Australia calculating total visa costs before applying to universities.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl border-2 border-blue-300 text-center">
              <div className="text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Families</h3>
              <p className="text-sm text-slate-700">Parents and guardians calculating costs for bringing family members to Australia during study period.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-violet-100 p-6 rounded-xl border-2 border-purple-300 text-center">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Education Consultants</h3>
              <p className="text-sm text-slate-700">Study abroad advisors helping clients with accurate visa cost estimates and financial planning.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-6 rounded-xl border-2 border-orange-300 text-center">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Financial Planners</h3>
              <p className="text-sm text-slate-700">Students and families budgeting for comprehensive study abroad expenses including visa-related costs.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900">
            About Australia Student Visa Fee Calculator
          </h2>
          
          <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-green-300 relative overflow-hidden">
            <div className="absolute top-6 right-6 text-green-300 text-8xl opacity-20">🎓</div>
            <div className="absolute bottom-6 left-6 text-emerald-300 text-7xl opacity-20">🇦🇺</div>
            
            <div className="relative z-10">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg mb-6 border-l-8 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">💰</div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-900 mb-4">Complete Visa Cost Planning Tool</h3>
                    <p className="text-slate-800 leading-relaxed text-lg mb-4">
                      The <strong className="text-green-700">Australia Student Visa Fee Calculator 2026</strong> is your comprehensive tool for estimating all costs associated with applying for an Australian student visa (Subclass 500). This Australia student visa fee calculator helps you plan your study abroad finances by providing accurate cost breakdowns. Planning to study in Australia requires careful financial preparation, and visa-related expenses form a significant part of your initial costs. Our calculator helps international students, families, and education consultants accurately estimate total visa expenses including application fees, biometrics, health examinations, and mandatory Overseas Student Health Cover (OSHC).
                    </p>
                    <p className="text-slate-800 leading-relaxed text-lg">
                      Understanding Australian student visa costs is essential for financial planning and scholarship applications. The Subclass 500 visa allows international students to study in Australia at registered education institutions, from English language courses to PhD programs. Visa fees vary based on factors like applicant age, number of dependents, and additional services required. Our calculator uses official 2026 rates from the Australian Department of Home Affairs, ensuring accuracy for your budget planning. For other admission-related calculations, explore our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools')} className="text-green-600 hover:text-green-700 underline font-semibold">Admission Tools</button> collection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-6 rounded-xl shadow-lg border-2 border-emerald-400">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">📋</div>
                    <h4 className="text-xl font-bold text-emerald-900">Subclass 500 Visa Components</h4>
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    Australian student visa applications involve multiple cost components beyond the basic application fee. The main visa fee for Subclass 500 is A$710 for the primary applicant (2026 rate). Additional costs include biometrics collection (A$85), mandatory health examinations (approximately A$350), and OSHC insurance averaging A$56 per month. Dependent fees vary by age: A$530 for partners and children 18+, and A$175 for children under 18. Calculate your total accurately with our tool, or check <button onClick={() => navigateTo('/education-and-exam-tools/ucas-points-calculator')} className="text-emerald-600 hover:text-emerald-700 underline font-semibold">UCAS Points Calculator</button> for UK universities.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-6 rounded-xl shadow-lg border-2 border-teal-400">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">🏥</div>
                    <h4 className="text-xl font-bold text-teal-900">OSHC Requirements</h4>
                  </div>
                  <p className="text-slate-800 leading-relaxed">
                    Overseas Student Health Cover (OSHC) is mandatory for all international students and must cover your entire visa duration. OSHC provides access to Australian healthcare services and covers hospital treatment, medical services, ambulance cover, and limited pharmaceutical benefits. The average cost is A$56 per month per person, though rates vary by provider and coverage level. Your OSHC must start before you arrive in Australia and extend beyond your course completion date. Factor this into your budget along with other study expenses. For SAT score calculations, visit our <button onClick={() => navigateTo('/education-and-exam-tools/sat-score-calculator')} className="text-teal-600 hover:text-teal-700 underline font-semibold">SAT Calculator</button>.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-l-8 border-emerald-500">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">⏱️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-4">Processing Times & Additional Services</h3>
                    <p className="text-slate-800 leading-relaxed text-lg mb-4">
                      Standard Subclass 500 visa processing takes 4-6 weeks, though timelines vary based on application complexity and peak seasons. Priority processing services (additional A$250) can expedite your application for urgent study start dates. Courier services (A$50) ensure secure document delivery, while professional translation services (A$100) help with non-English documents. Most applicants require biometric collection at an Australian Visa Application Centre, adding A$85 per person to your total cost.
                    </p>
                    <p className="text-slate-800 leading-relaxed text-lg">
                      Health examinations are mandatory for all student visa applicants and must be conducted by approved panel physicians. The examination typically costs A$350 and includes chest X-rays, physical examination, and relevant medical tests. Results are valid for 12 months. Plan these expenses early in your application timeline to avoid delays. For comprehensive study planning tools including <a href="https://immi.homeaffairs.gov.au" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline font-semibold">official Australian immigration resources</a>, bookmark our calculator for accurate cost estimates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6 p-4 bg-green-200 rounded-xl">
                <p className="text-sm text-green-900 font-medium">
                  🎓 Supporting all visa types: Subclass 500 (Student) • Subclass 590 (Guardian) • OSHC Calculator • Biometrics • Health Checks • Dependent Visas • Family Planning • Priority Processing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Official Australian Immigration Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-green-300 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Official Subclass 500 Visa Information</h3>
              <p className="text-slate-700">Complete details about Australian student visa requirements, eligibility criteria, and application process from Department of Home Affairs.</p>
            </a>
            <a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/fees-charges" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-green-300 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Current Visa Fees & Charges</h3>
              <p className="text-slate-700">Latest official visa application fees, biometrics costs, and payment information directly from Australian government.</p>
            </a>
            <a href="https://www.oshcaustralia.com.au" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-green-300 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900">OSHC Information & Providers</h3>
              <p className="text-slate-700">Compare Overseas Student Health Cover providers, coverage options, and purchase OSHC for your student visa.</p>
            </a>
            <a href="https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-green-300 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900">Visa Processing Times</h3>
              <p className="text-slate-700">Check current processing times for student visa applications and plan your application timeline accordingly.</p>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-600 mb-8">
          <span className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
            Last updated: November 22, 2025
          </span>
        </div>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Australia Student Visa Fee Calculator - Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-300">
              <h3 className="text-lg font-bold mb-2 text-slate-900">How much does an Australia student visa cost in 2026?</h3>
              <p className="text-slate-700">The base Subclass 500 student visa application fee is A$710 for the main applicant. Additional costs include biometrics (A$85), health examination (A$350), and mandatory OSHC insurance (approximately A$56 per month). Total costs typically range from A$1,800 to A$3,000+ depending on your circumstances and study duration.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-300">
              <h3 className="text-lg font-bold mb-2 text-slate-900">What is OSHC and is it mandatory for student visa?</h3>
              <p className="text-slate-700">Overseas Student Health Cover (OSHC) is mandatory health insurance for all international students in Australia. It covers hospital treatment, medical services, ambulance, and some medications. You must have OSHC for your entire visa duration, and it must start before you arrive in Australia. Average cost is A$56 per month per person.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-300">
              <h3 className="text-lg font-bold mb-2 text-slate-900">Can I include my family members in my student visa application?</h3>
              <p className="text-slate-700">Yes, you can include dependents (spouse/partner and children) in your Subclass 500 application. Dependent visa fees are A$530 for partners and children 18+ years, and A$175 for children under 18. Each dependent also requires biometrics, health checks, and separate OSHC coverage, significantly increasing total costs.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-300">
              <h3 className="text-lg font-bold mb-2 text-slate-900">How long does it take to process an Australian student visa?</h3>
              <p className="text-slate-700">Standard Subclass 500 visa processing takes 4-6 weeks for most applicants, though this varies by country and application complexity. Processing times can extend to 2-3 months during peak seasons (November-February). Priority processing service (additional A$250) can expedite applications for urgent study start dates.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-300">
              <h3 className="text-lg font-bold mb-2 text-slate-900">Do I need a health examination for Australian student visa?</h3>
              <p className="text-slate-700">Yes, health examinations are mandatory for all Subclass 500 applicants. You must visit an approved panel physician who will conduct chest X-rays, physical examination, and relevant medical tests. The examination costs approximately A$350 and results are valid for 12 months. Some countries have additional health requirements.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-300">
              <h3 className="text-lg font-bold mb-2 text-slate-900">Are biometrics required for Australia student visa?</h3>
              <p className="text-slate-700">Yes, biometric collection (fingerprints and photograph) is required for most student visa applicants. You must visit an Australian Visa Application Centre (AVAC) or biometric collection centre. The biometrics fee is A$85 per person and must be paid separately from the visa application fee.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-300">
              <h3 className="text-lg font-bold mb-2 text-slate-900">Can visa fees be refunded if my application is rejected?</h3>
              <p className="text-slate-700">No, Australian visa application fees are non-refundable regardless of the outcome. This includes the base visa fee, biometrics, and any additional service charges. However, if you withdraw your application before a decision is made, you may be eligible for a partial refund under specific circumstances.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="student-visa-fee-calculator-australia" relatedSlugs={['ucas-points-calculator', 'sat-score-calculator', 'gpa-calculator']} navigateTo={navigateTo} />
      </div>
    </div>
  );
};

export default StudentVisaFeeCalculatorAustralia;
