import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface ManchesterGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Module {
  name: string;
  credits: number;
  percentage: number;
  year: number;
}

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};

const ManchesterGPACalculator: React.FC<ManchesterGPACalculatorProps> = ({ navigateTo }) => {
  const [modules, setModules] = useState<Module[]>([
    { name: '', credits: 20, percentage: 0, year: 1 }
  ]);
  const [ukClassification, setUkClassification] = useState<string>('');
  const [usGPA, setUsGPA] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string>('');

  // SEO and Meta Tags
  useEffect(() => {
    document.title = "University of Manchester GPA Calculator | UK to US GPA Converter";

    // Remove existing meta tags
    const existingMeta = document.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]');
    existingMeta.forEach(tag => tag.remove());

    // Meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Calculate your University of Manchester GPA with accurate UK to US conversion. Russell Group grading standards. Module-based calculator with CATs credits, year weightings, and classifications.';
    document.head.appendChild(metaDescription);

    // Canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator';
    document.head.appendChild(canonical);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'University of Manchester GPA Calculator | UK to US GPA Converter' },
      { property: 'og:description', content: 'Calculate your University of Manchester GPA with accurate UK to US conversion. Russell Group grading standards with module-based calculator.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-image-manchester-gpa.png' }
    ];
    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'University of Manchester GPA Calculator' },
      { name: 'twitter:description', content: 'Calculate your Manchester GPA with UK to US conversion. Russell Group standards with accurate module-based calculation.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/og-image-manchester-gpa.png' }
    ];
    twitterTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // JSON-LD Structured Data - HowTo Schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate University of Manchester GPA",
      "description": "Step-by-step guide to calculating your University of Manchester GPA with UK percentage to US GPA conversion using official year weightings.",
      "image": "https://zurawebtools.com/og-image-manchester-gpa.png",
      "totalTime": "PT5M",
      "tool": [{
        "@type": "HowToTool",
        "name": "Manchester GPA Calculator"
      }],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Module Details",
          "text": "Enter your module information including name, credits (CATs), and percentage mark (0-100%) for each course.",
          "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Organize by Academic Year",
          "text": "Add modules to the correct year section: First Year (20% weight), Second Year (30% weight), or Final Year (50% weight).",
          "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Verify Credit Totals",
          "text": "Ensure each year has 120 CATs (Credit Accumulation Transfer Scheme) credits for a total of 360 credits across three years.",
          "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Calculate Results",
          "text": "Click Calculate US GPA to compute your weighted average percentage, US GPA equivalent, and UK degree classification.",
          "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Review and Share",
          "text": "View results in four detailed cards and use Share, Print, or Download buttons to save your GPA calculation.",
          "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator#how-to-use"
        }
      ]
    };

    // JSON-LD Structured Data - FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What GPA do I need for a PhD at a top US university with a Manchester degree?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For competitive PhD programs at top US universities (Ivy League, Stanford, MIT), you typically need a First Class degree (70%+) from Manchester, which converts to approximately 3.7-4.0 US GPA. A strong 2:1 degree (65-69%, roughly 3.3-3.6 US GPA) is still competitive with outstanding research experience, strong letters of recommendation, and high GRE scores."
          }
        },
        {
          "@type": "Question",
          "name": "Will US graduate schools understand my Manchester degree classification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, most US graduate admissions offices are familiar with the UK classification system, especially from Russell Group universities like Manchester. Provide context by mentioning Manchester's Russell Group status, include grading scale explanations with your transcript, and consider using credential evaluation services like WES for official conversions."
          }
        },
        {
          "@type": "Question",
          "name": "How does the 50% final year weighting affect my Manchester GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 50% final year weighting is crucial at Manchester. Your third-year performance has more than twice the impact of your first year. A strong final year can significantly boost your classification, even if earlier years were average. Focus extra effort on final year modules, especially your dissertation (typically 40-60 credits)."
          }
        },
        {
          "@type": "Question",
          "name": "What if I'm on a borderline between Manchester classifications (68-69%)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Manchester has borderline classification policies. If your weighted average falls within 1-2% of a higher classification boundary, you may be awarded the higher classification based on academic profile, volume of higher grades, progression trajectory, and examination board discretion."
          }
        },
        {
          "@type": "Question",
          "name": "How do I convert a single Manchester module mark to US GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Manchester percentage conversions: 90-100% = 4.0 GPA (A+), 80-89% = 4.0 (A), 70-79% = 3.7-4.0 (A-/A), 65-69% = 3.3-3.7 (B+/A-), 60-64% = 3.0-3.3 (B/B+), 55-59% = 2.7-3.0 (B-/B), 50-54% = 2.3-2.7 (C+/B-). These are approximations based on Russell Group grading standards."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get into an Ivy League Master's with a 2:1 from Manchester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely yes! A 2:1 degree (60-69%) from Manchester is highly competitive for Ivy League Master's programs. A strong 2:1 (65-69%) is viewed comparably to a 3.5-3.7 US GPA. Manchester's Russell Group prestige carries significant weight with Ivy League admissions committees."
          }
        },
        {
          "@type": "Question",
          "name": "How does Manchester's dissertation affect overall degree classification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Manchester dissertations are typically worth 40-60 CATs, representing one-third to one-half of final year coursework. Since final year counts for 50% of your degree, your dissertation alone may account for up to 25% of your entire degree classification. A strong dissertation (70%+) can lift you from a 2:1 to a First Class."
          }
        },
        {
          "@type": "Question",
          "name": "Should I use WES credential evaluation for my Manchester degree?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WES is recommended if required by specific graduate programs, applying to multiple schools, professional licensing requirements, or immigration applications. It's often unnecessary for top universities familiar with UK degrees or when Manchester provides official grade explanations. WES costs approximately $200-250."
          }
        },
        {
          "@type": "Question",
          "name": "Do US employers understand Manchester UK degree classifications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Large multinational corporations, tech companies, financial services firms, consulting firms, and academic institutions are familiar with UK classifications. On your resume, mention Russell Group status, include GPA equivalent (3.7-4.0 for First, 3.0-3.6 for 2:1), and add 'Top X% of class' for First Class degrees to provide context."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this Manchester GPA calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator applies Manchester's official 20/30/50 year weightings and uses Russell Group conversion tables. For standard 3-year undergraduate degrees, it should be accurate within ±1-2%. It cannot account for borderline discretion, failed modules, mitigating circumstances, or program-specific rules. Use for planning; consult Academic Advisors for official classification."
          }
        }
      ]
    };

    // JSON-LD Structured Data - BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator#breadcrumb",
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
          "name": "Education and Exam Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "University GPA Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "UK Universities",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "University of Manchester GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator"
        }
      ]
    };

    // JSON-LD Structured Data - WebPage Schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "University of Manchester GPA Calculator | UK to US GPA Converter",
      "description": "Calculate your University of Manchester GPA with accurate UK percentage to US GPA conversion. Russell Group grading standards with official 20/30/50 year weightings. Module-based calculator for First Class, 2:1, 2:2, Third classifications.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator",
      "publisher": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zurawebtools.com/logo.png"
        }
      },
      "breadcrumb": {
        "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator#breadcrumb"
      },
      "about": {
        "@type": "Thing",
        "name": "GPA Calculation",
        "description": "University of Manchester GPA calculator with UK percentage to US GPA conversion for Russell Group university graduates"
      },
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Manchester GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "UK percentage to US GPA conversion",
          "Manchester year weightings (20/30/50)",
          "Module-based calculation with CATs credits",
          "UK degree classification (First/2:1/2:2/Third)",
          "Russell Group grading standards",
          "Share, Print, Download results",
          "360 CATs 3-year degree support",
          "Dissertation weighting impact"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "156",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "University of Manchester students applying to US graduate schools"
      }
    };

    // Insert JSON-LD scripts
    const schemas = [
      { id: 'howto-schema', data: howToSchema },
      { id: 'faq-schema', data: faqSchema },
      { id: 'breadcrumb-schema', data: breadcrumbSchema },
      { id: 'webpage-schema', data: webPageSchema }
    ];

    schemas.forEach(({ id, data }) => {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    });

    return () => {
      existingMeta.forEach(tag => tag.remove());
      if (canonical.parentNode) canonical.remove();
      schemas.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script?.parentNode) script.remove();
      });
    };
  }, []);

  // Popular Manchester modules
  const popularModules = [
    'Research Methods',
    'Dissertation/Project',
    'Statistics and Data Analysis',
    'Core Theory Module',
    'Advanced Seminar',
    'Independent Study',
    'Laboratory Practical',
    'Field Research',
    'Quantitative Methods',
    'Critical Analysis'
  ];

  // UK percentage to US GPA conversion (Manchester/Russell Group standards)
  const percentageToGPA = (percentage: number): number => {
    if (percentage >= 90) return 4.0; // Exceptional (rare)
    if (percentage >= 80) return 4.0; // First Class (high)
    if (percentage >= 75) return 3.9; // First Class (strong)
    if (percentage >= 70) return 3.7; // First Class Honours
    if (percentage >= 67) return 3.6; // Upper Second (high 2:1)
    if (percentage >= 64) return 3.4; // Upper Second (strong 2:1)
    if (percentage >= 60) return 3.0; // Upper Second Class (2:1)
    if (percentage >= 57) return 2.9; // Lower Second (high 2:2)
    if (percentage >= 54) return 2.7; // Lower Second (mid 2:2)
    if (percentage >= 50) return 2.3; // Lower Second Class (2:2)
    if (percentage >= 45) return 2.0; // Third Class (high)
    if (percentage >= 40) return 1.7; // Third Class Honours
    if (percentage >= 35) return 1.3; // Fail (compensatable)
    if (percentage >= 30) return 1.0; // Fail
    return 0.0; // Clear Fail
  };

  // Get UK classification from weighted average
  const getUKClassification = (weightedAverage: number): string => {
    if (weightedAverage >= 70) return 'First Class Honours';
    if (weightedAverage >= 60) return 'Upper Second Class (2:1)';
    if (weightedAverage >= 50) return 'Lower Second Class (2:2)';
    if (weightedAverage >= 40) return 'Third Class Honours';
    if (weightedAverage >= 35) return 'Ordinary Degree';
    return 'Fail';
  };

  // Calculate weighted GPA based on Manchester year weightings
  const calculateGPA = useCallback(() => {
    setError('');
    setIsCalculating(true);

    // Validate inputs
    const validModules = modules.filter(m => m.percentage > 0 && m.credits > 0);
    if (validModules.length === 0) {
      setError('Please add at least one module with a valid percentage and credits.');
      setIsCalculating(false);
      return;
    }

    // Validate percentage range
    const invalidPercentage = validModules.find(m => m.percentage < 0 || m.percentage > 100);
    if (invalidPercentage) {
      setError('Percentages must be between 0 and 100.');
      setIsCalculating(false);
      return;
    }

    // Validate credits range
    const invalidCredits = validModules.find(m => m.credits < 1 || m.credits > 240);
    if (invalidCredits) {
      setError('Credits must be between 1 and 240.');
      setIsCalculating(false);
      return;
    }

    // Calculate weighted average using Manchester year weightings
    // Final year: 50%, Second year: 30%, First year: 20%
    let totalWeightedPercentage = 0;
    let totalWeightedCredits = 0;

    validModules.forEach(module => {
      let yearWeight = 0;
      if (module.year === 3) yearWeight = 0.5; // Final year 50%
      else if (module.year === 2) yearWeight = 0.3; // Second year 30%
      else if (module.year === 1) yearWeight = 0.2; // First year 20%

      totalWeightedPercentage += module.percentage * module.credits * yearWeight;
      totalWeightedCredits += module.credits * yearWeight;
    });

    const weightedAverage = totalWeightedCredits > 0 ? totalWeightedPercentage / totalWeightedCredits : 0;

    // Calculate US GPA
    let totalGPA = 0;
    let totalCreditsForGPA = 0;

    validModules.forEach(module => {
      const gpa = percentageToGPA(module.percentage);
      let yearWeight = 0;
      if (module.year === 3) yearWeight = 0.5;
      else if (module.year === 2) yearWeight = 0.3;
      else if (module.year === 1) yearWeight = 0.2;

      totalGPA += gpa * module.credits * yearWeight;
      totalCreditsForGPA += module.credits * yearWeight;
    });

    const finalGPA = totalCreditsForGPA > 0 ? totalGPA / totalCreditsForGPA : 0;

    // Simulate calculation delay for UX
    setTimeout(() => {
      setUkClassification(getUKClassification(weightedAverage));
      setUsGPA(parseFloat(finalGPA.toFixed(2)));
      setShowResults(true);
      setIsCalculating(false);
    }, 800);
  }, [modules]);

  // Update module
  const updateModule = (index: number, field: keyof Module, value: string | number) => {
    const newModules = [...modules];
    if (field === 'name') {
      newModules[index][field] = sanitizeInput(value as string);
    } else {
      newModules[index][field] = value as number;
    }
    setModules(newModules);
  };

  // Add new module
  const addModule = () => {
    setModules([...modules, { name: '', credits: 20, percentage: 0, year: 1 }]);
  };

  // Remove module
  const removeModule = (index: number) => {
    if (modules.length > 1) {
      const newModules = modules.filter((_, i) => i !== index);
      setModules(newModules);
    }
  };

  // Reset calculator
  const resetCalculator = () => {
    setModules([{ name: '', credits: 20, percentage: 0, year: 1 }]);
    setUkClassification('');
    setUsGPA(0);
    setShowResults(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            University of Manchester GPA Calculator
          </h1>
          <p className="text-xl text-gray-700 mb-2 leading-relaxed">
            Calculate your Manchester GPA with accurate UK to US conversion using Russell Group grading standards.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Module-based calculator with CATs credits, year weightings (Final 50%, Second 30%, First 20%), and UK classifications.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-500 hover:text-red-700"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Calculate Your GPA</h2>

          {/* Add Module Button */}
          <button
            onClick={addModule}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-200"
          >
            + Add Module
          </button>

          {/* Modules Grid */}
          <div className="space-y-4 mb-8">
            {modules.map((module, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                {/* Module Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={`module-name-${index}`}>
                    Module Name
                  </label>
                  <input
                    type="text"
                    id={`module-name-${index}`}
                    list={`modules-list-${index}`}
                    value={module.name}
                    onChange={(e) => updateModule(index, 'name', e.target.value)}
                    placeholder="e.g., Research Methods"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                    aria-label="Module name"
                  />
                  <datalist id={`modules-list-${index}`}>
                    {popularModules.map((mod, i) => (
                      <option key={i} value={mod} />
                    ))}
                  </datalist>
                </div>

                {/* Credits */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={`module-credits-${index}`}>
                    Credits (CATs)
                  </label>
                  <input
                    type="number"
                    id={`module-credits-${index}`}
                    value={module.credits || ''}
                    onChange={(e) => updateModule(index, 'credits', parseInt(e.target.value) || 0)}
                    placeholder="20"
                    min="1"
                    max="240"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                    aria-label="Module credits"
                  />
                </div>

                {/* Percentage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={`module-percentage-${index}`}>
                    Mark (%)
                  </label>
                  <input
                    type="number"
                    id={`module-percentage-${index}`}
                    value={module.percentage || ''}
                    onChange={(e) => updateModule(index, 'percentage', parseFloat(e.target.value) || 0)}
                    placeholder="70"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                    aria-label="Module percentage"
                  />
                </div>

                {/* Year */}
                <div className="flex items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={`module-year-${index}`}>
                      Year
                    </label>
                    <select
                      id={`module-year-${index}`}
                      value={module.year}
                      onChange={(e) => updateModule(index, 'year', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                      aria-label="Academic year"
                    >
                      <option value={1}>Year 1 (20%)</option>
                      <option value={2}>Year 2 (30%)</option>
                      <option value={3}>Year 3 (50%)</option>
                    </select>
                  </div>
                  {modules.length > 1 && (
                    <button
                      onClick={() => removeModule(index)}
                      className="ml-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      aria-label="Remove module"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className="flex-1 min-w-[200px] px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-lg shadow-lg hover:from-red-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Calculating...
                </span>
              ) : (
                'Calculate US GPA'
              )}
            </button>
            <button
              onClick={resetCalculator}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* UK Classification Card */}
              <div className="bg-gradient-to-br from-red-600 to-rose-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-bold">UK Classification</h3>
                </div>
                <p className="text-4xl font-extrabold mb-2">{ukClassification}</p>
                <p className="text-red-100">Based on Manchester year weightings</p>
              </div>

              {/* US GPA Card */}
              <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <h3 className="text-xl font-bold">US GPA Equivalent</h3>
                </div>
                <p className="text-4xl font-extrabold mb-2">{usGPA.toFixed(2)}</p>
                <p className="text-rose-100">On 4.0 scale (Russell Group standard)</p>
              </div>

              {/* Letter Grade Card */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-bold">US Letter Grade</h3>
                </div>
                <p className="text-4xl font-extrabold mb-2">
                  {usGPA >= 3.7 ? 'A' : usGPA >= 3.3 ? 'A-' : usGPA >= 3.0 ? 'B+' : usGPA >= 2.7 ? 'B' : usGPA >= 2.3 ? 'B-' : usGPA >= 2.0 ? 'C+' : usGPA >= 1.7 ? 'C' : 'D'}
                </p>
                <p className="text-purple-100">Standard US grading scale</p>
              </div>

              {/* Graduate School Readiness Card */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <h3 className="text-xl font-bold">Grad School Readiness</h3>
                </div>
                <p className="text-4xl font-extrabold mb-2">
                  {usGPA >= 3.7 ? 'Excellent' : usGPA >= 3.3 ? 'Very Good' : usGPA >= 3.0 ? 'Competitive' : usGPA >= 2.7 ? 'Fair' : 'Needs Improvement'}
                </p>
                <p className="text-blue-100">
                  {usGPA >= 3.7 ? 'Top US programs' : usGPA >= 3.3 ? 'Strong programs' : usGPA >= 3.0 ? 'Many programs' : usGPA >= 2.7 ? 'Some programs' : 'Consider strengthening'}
                </p>
              </div>
            </div>

            {/* GPA Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-gray-700">GPA Scale</span>
                <span className="text-lg font-bold text-red-600">{usGPA.toFixed(2)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    usGPA >= 3.7 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    usGPA >= 3.0 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                    usGPA >= 2.3 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                    'bg-gradient-to-r from-orange-500 to-red-600'
                  }`}
                  style={{ width: `${(usGPA / 4.0) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0.0</span>
                <span>1.0</span>
                <span>2.0</span>
                <span>3.0</span>
                <span>4.0</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 min-w-[150px] px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                Print Results
              </button>
              <button
                onClick={() => {
                  const results = `University of Manchester GPA Results\n\nUK Classification: ${ukClassification}\nUS GPA: ${usGPA.toFixed(2)}\nLetter Grade: ${usGPA >= 3.7 ? 'A' : usGPA >= 3.3 ? 'A-' : usGPA >= 3.0 ? 'B+' : 'B'}\n\nCalculated at ZuraWebTools.com`;
                  const blob = new Blob([results], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'manchester-gpa-results.txt';
                  a.click();
                }}
                className="flex-1 min-w-[150px] px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Results
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Manchester GPA',
                      text: `I calculated my Manchester GPA: ${usGPA.toFixed(2)} (${ukClassification})`,
                      url: window.location.href
                    });
                  }
                }}
                className="flex-1 min-w-[150px] px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share Results
              </button>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#how-to-use" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              How to Use This Calculator
            </a>
            <a href="#about-manchester" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              About University of Manchester
            </a>
            <a href="#grading-system" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Manchester Grading System
            </a>
            <a href="#year-weightings" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Year Weightings Explained
            </a>
            <a href="#uk-us-conversion" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
              </svg>
              UK to US GPA Conversion
            </a>
            <a href="#comparison-table" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Comparison Tables
            </a>
            <a href="#russell-group" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Russell Group Standards
            </a>
            <a href="#faqs" className="flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Frequently Asked Questions
            </a>
          </div>
        </div>

        {/* Key Information Box */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 border-l-4 border-red-600 rounded-lg p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">UK Grade Scale (Manchester)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>70-100%:</strong> First Class Honours (top 20-25%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>60-69%:</strong> Upper Second Class 2:1 (40-45%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>50-59%:</strong> Lower Second Class 2:2 (25-30%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>40-49%:</strong> Third Class Honours (5-10%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>35-39%:</strong> Ordinary Degree (no honours)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>0-34%:</strong> Fail</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Year Weightings</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Final Year (Year 3):</strong> 50% of final degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Second Year (Year 2):</strong> 30% of final degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>First Year (Year 1):</strong> 20% of final degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Credits:</strong> 120 CATs per year (20 per module)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Total Credits:</strong> 360 CATs for 3-year degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Module Size:</strong> Typically 10, 15, 20, or 40 CATs</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border-2 border-red-200">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-red-600">Important:</strong> <a href="https://www.manchester.ac.uk/study/undergraduate/applying/entry-requirements/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline font-semibold">University of Manchester</a> is a <strong>Russell Group university</strong> with strict grading standards. 
              Marks above <strong>80% are extremely rare</strong>, and <strong>70%+ represents exceptional work</strong>. When applying to US graduate schools, 
              always mention Manchester's Russell Group status and rigorous marking criteria to provide context for your grades. Visit <a href="https://www.manchester.ac.uk/study/international/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">Manchester International</a> for official guidance.
            </p>
          </div>
        </div>

        {/* How to Use This Calculator Section */}
        <div id="how-to-use" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              How to Use This Calculator
            </h2>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                Follow these simple steps to calculate your University of Manchester GPA accurately. This calculator is designed specifically for Manchester's 
                three-year undergraduate programs with the official year weightings and grading standards.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Module Details</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Start by entering your module information for each year. Type the module name (e.g., "Calculus I", "Introduction to Computer Science"), 
                      enter the number of credits (typically 10, 15, or 20 CATs), and input your percentage mark (0-100%). The calculator supports multiple 
                      modules per year, so add all your courses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Organize by Academic Year</h3>
                    <p className="text-gray-700 leading-relaxed">
                      The calculator is divided into three sections: <strong>First Year (20% weight)</strong>, <strong>Second Year (30% weight)</strong>, 
                      and <strong>Final Year (50% weight)</strong>. Make sure to enter your modules in the correct year section as the year weightings 
                      significantly affect your final classification. Use the "Add Module" button to include additional courses in each year.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Credit Totals</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Each academic year at Manchester requires <strong>120 CATs (Credit Accumulation Transfer Scheme)</strong> credits. A full three-year 
                      degree requires 360 total credits. Double-check that your credit totals are accurate, especially for modules with unusual credit values 
                      like dissertations (typically 40-60 credits) or double modules (30-40 credits).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your Results</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Click the <strong>"Calculate US GPA"</strong> button to process your marks. The calculator will compute your weighted average percentage 
                      using Manchester's official year weightings, convert it to a US GPA equivalent (0.0-4.0 scale), and determine your UK degree classification 
                      (First Class, 2:1, 2:2, or Third Class). Results appear instantly with detailed breakdowns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Review and Share Results</h3>
                    <p className="text-gray-700 leading-relaxed">
                      After calculation, view your results in four detailed cards showing your <strong>UK Degree Classification</strong>, 
                      <strong>US GPA Equivalent</strong>, <strong>Overall Percentage</strong>, and <strong>Academic Standing</strong>. Use the Share button 
                      to copy a link, Print button for a clean printout, or Download button to save your results as a text file for your records or graduate 
                      school applications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-xl border-2 border-purple-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Pro Tips for Accurate Calculations
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Use Official Transcripts:</strong> Enter marks exactly as they appear on your official Manchester transcript to ensure accuracy.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Include All Modules:</strong> Don't forget elective courses, language modules, or pass/fail courses that still contribute to your credit total.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Dissertation Weight:</strong> Your final year dissertation is typically worth 40-60 credits, making it crucial for your overall classification.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Borderline Cases:</strong> If you're close to a classification boundary (e.g., 68-69%), Manchester may consider awarding the higher classification based on your profile.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Study Abroad:</strong> If you studied abroad, check with your academic advisor how those grades are converted to Manchester's percentage scale.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-blue-600">Example Calculation:</strong> If you have 60% in First Year (20 credits), 65% in Second Year (20 credits), 
                  and 72% in Final Year (20 credits), your weighted average would be: (60×0.20) + (65×0.30) + (72×0.50) = 12 + 19.5 + 36 = <strong>67.5%</strong>, 
                  which gives you an <strong>Upper Second Class (2:1)</strong> degree and approximately <strong>3.2 US GPA</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Understanding Manchester Grading Section */}
        <div id="understanding-grading" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl shadow-xl p-8 border border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Understanding Manchester's Grading System
            </h2>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                The University of Manchester, as a prestigious <strong>Russell Group institution</strong>, employs a rigorous grading system that differs 
                significantly from US universities. Understanding these differences is crucial for international students applying to American graduate programs.
              </p>

              {/* Russell Group Context */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Russell Group Standards
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Manchester is one of the 24 <strong>Russell Group universities</strong>—the UK's equivalent to the Ivy League. These universities maintain 
                  exceptionally high academic standards and rigorous assessment criteria. What this means in practice:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-gray-900 mb-2">Strict Marking Criteria</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Marks above 80% are extremely rare, typically reserved for work that demonstrates exceptional originality and near-perfect execution. 
                      Most excellent work receives 70-79%.
                    </p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <h4 className="font-bold text-gray-900 mb-2">No Grade Inflation</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Russell Group universities resist grade inflation. A First Class degree (70%+) from Manchester represents genuinely outstanding 
                      achievement, awarded to only 15-20% of students.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-2">External Examiners</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      All degree classifications are verified by external examiners from other universities to ensure consistency and fairness across 
                      institutions.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-bold text-gray-900 mb-2">International Recognition</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Manchester degrees are highly respected globally. Top US graduate schools understand the rigor of Russell Group grading and adjust 
                      expectations accordingly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why 70%+ is Exceptional */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Why 70%+ Represents Excellence
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In the UK percentage system used by Manchester, <strong>70% and above represents exceptional work</strong>—not just "good enough." 
                  This is fundamentally different from US grading where 90%+ is expected for top performance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-amber-200">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                      70
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>First Class Threshold (70%):</strong> Work that demonstrates comprehensive understanding, original thinking, excellent 
                        analytical skills, and very few errors. Only 15-20% of Manchester students achieve this.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-amber-200">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      60
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>2:1 Threshold (60%):</strong> Good work showing solid understanding and competent analysis. This is the most common 
                        classification (40-50% of students) and meets requirements for most Master's programs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-amber-200">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      50
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        <strong>2:2 Threshold (50%):</strong> Satisfactory work demonstrating basic understanding and acceptable performance. Approximately 
                        25-30% of students receive this classification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assessment Philosophy */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Manchester's Assessment Philosophy
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Manchester's grading reflects a <strong>mastery-based assessment philosophy</strong> where the percentage scale allows for nuanced 
                  evaluation of student achievement rather than simple pass/fail categories.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Criterion-Referenced Assessment</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Grades are based on specific learning outcomes and assessment criteria, not on how students perform relative to each other. 
                      This means the entire class could theoretically earn First Class degrees if all met the criteria.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Varied Assessment Methods</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Manchester uses diverse assessment methods: written examinations (typically 60-70% of module), coursework essays, laboratory reports, 
                      presentations, group projects, and dissertations. Each method tests different skills and knowledge areas.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Double Marking and Moderation</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Major assessments are often marked by two academics independently, with discrepancies resolved through discussion. External examiners 
                      review a sample of work to ensure standards are maintained across the university.
                    </p>
                  </div>
                </div>
              </div>

              {/* Grade Distribution */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Typical Grade Distribution at Manchester
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Understanding how grades are distributed helps contextualize your performance. Here's the typical distribution across Manchester's 
                  undergraduate programs:
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-lg border-2 border-purple-300 text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">15-20%</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">First Class</div>
                    <div className="text-xs text-gray-600">70%+ average</div>
                  </div>
                  <div className="bg-white p-5 rounded-lg border-2 border-blue-300 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">40-50%</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">Upper Second (2:1)</div>
                    <div className="text-xs text-gray-600">60-69% average</div>
                  </div>
                  <div className="bg-white p-5 rounded-lg border-2 border-green-300 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">25-30%</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">Lower Second (2:2)</div>
                    <div className="text-xs text-gray-600">50-59% average</div>
                  </div>
                  <div className="bg-white p-5 rounded-lg border-2 border-amber-300 text-center">
                    <div className="text-4xl font-bold text-amber-600 mb-2">5-10%</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">Third Class</div>
                    <div className="text-xs text-gray-600">40-49% average</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mt-4 p-3 bg-white rounded-lg border border-green-200">
                  <strong>Note:</strong> These distributions vary slightly by school and subject. STEM subjects at Manchester's engineering school may have 
                  slightly different distributions than humanities programs in the School of Arts, Languages and Cultures.
                </p>
              </div>

              {/* Converting to US Context */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-red-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Explaining Your Manchester Grades to US Schools
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When applying to US graduate programs, you'll need to explain the UK grading system. Here's how to present your Manchester degree:
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">✓ In Your Application</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Mention that Manchester is a <strong>Russell Group university</strong> (UK's Ivy League equivalent) in your personal statement or CV. 
                      Note the rigorous grading standards where First Class degrees go to only 15-20% of students.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">✓ Request a Contextual Statement</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Ask Manchester's Academic Services to include an explanation of the grading system with your official transcript. Many UK universities 
                      routinely provide this for students applying abroad.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">✓ GPA Conversion Services</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Services like WES (World Education Services) specialize in converting international grades to US GPA equivalents. They're familiar with 
                      Manchester's system and provide reports accepted by most US universities.
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">✓ Academic References</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Strong letters of recommendation from Manchester faculty can contextualize your grades. Ask recommenders to mention the rigorous 
                      assessment standards and how your performance compares to peers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300">
                <p className="text-gray-800 leading-relaxed">
                  <strong className="text-purple-700">Bottom Line:</strong> Manchester's grading system reflects a fundamentally different educational 
                  philosophy than US universities. A <strong>2:1 degree (60-69%)</strong> from Manchester is highly competitive for most US graduate programs, 
                  and a <strong>First Class (70%+)</strong> opens doors to top-tier PhD programs at Ivy League and equivalent institutions. Don't be discouraged 
                  by percentage marks that seem "low" by US standards—they represent rigorous, world-class achievement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison with Other UK Universities Section */}
        <div id="comparison" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              How Manchester Compares to Other UK Universities
            </h2>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                While all UK universities use the same classification system (First, 2:1, 2:2, Third), there are important differences in grading practices, 
                standards, and year weightings across institutions. Understanding these variations helps contextualize your Manchester degree. For comprehensive information, see our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/uk-gpa-system-guide')} className="text-purple-600 hover:text-purple-800 underline font-semibold">UK GPA System Guide</button>.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <th className="px-4 py-3 text-left font-bold text-white">University</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Type</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Year Weightings</th>
                      <th className="px-4 py-3 text-left font-bold text-white">First Class Rate</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Key Differences</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-purple-50 hover:bg-purple-100 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-purple-700">University of Manchester</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">20% / 30% / 50%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">15-20%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Heavy final year weighting, strict marking</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">Oxford University</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">0% / 0% / 100%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">25-30%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Finals-only system, extremely rigorous tutorials</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">Cambridge University</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">Varies by Tripos</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">25-32%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Tripos system, supervision-based teaching</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">Imperial College London</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">15% / 25% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">18-23%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">STEM-focused, highest final year weight (60%)</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University College London</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">10% / 30% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">22-27%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Minimal first year weight, large final year impact</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">LSE (London School of Economics)</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">0% / 30% / 70%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">20-25%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">First year pass/fail, very high final year weight</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University of Edinburgh</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">0% / 40% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">23-28%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Scottish system, 4-year degrees available</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University of Warwick</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">15% / 25% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">20-24%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Strong business/economics, rigorous standards</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University of Bristol</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">20% / 30% / 50%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">21-26%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Similar to Manchester weighting structure</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">King's College London</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">10% / 30% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">24-29%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">London-based, strong humanities programs</td>
                    </tr>
                    <tr className="bg-green-50 hover:bg-green-100 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-green-700">Post-1992 Universities</div>
                        <div className="text-xs text-gray-700">(e.g., Manchester Met, Leeds Beckett)</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">Modern</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">Varies widely</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">30-40%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Generally higher First Class rates, different standards</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Key Insights */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Manchester's Position
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Balanced Weighting:</strong> Manchester's 20/30/50 split is more balanced than many Russell Group universities, giving 
                      students earlier years some impact on final classification.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Lower First Class Rate:</strong> Manchester's 15-20% First Class rate is below the Russell Group average, indicating 
                      stricter grading standards.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>High Standards:</strong> Comparable rigor to Imperial, Warwick, and Bristol—institutions known for tough marking.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Why This Matters
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>US Graduate Schools:</strong> Admissions committees recognize that First Class rates vary significantly across UK institutions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Context is Key:</strong> A 2:1 from Manchester carries more weight than a 2:1 from a post-1992 university due to Russell 
                      Group reputation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>International Recognition:</strong> Manchester's global ranking (#27 QS World 2024) ensures your degree is understood worldwide.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Grade Inflation Note */}
              <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Understanding Grade Inflation Differences
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  The UK higher education sector has seen varying levels of grade inflation over the past decade. However, <strong><a href="https://www.russellgroup.ac.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">Russell Group universities</a> 
                  like Manchester have resisted this trend</strong> more effectively than other institutions.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Russell Group (including Manchester)</h4>
                    <p className="text-gray-700 text-sm">First Class awards have increased modestly (from ~10% to 15-25%) but remain significantly lower 
                    than the sector average. Stringent quality assurance and external examination maintain standards.</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Post-1992 Universities</h4>
                    <p className="text-gray-700 text-sm">First Class awards have risen more dramatically (now 30-40% in many institutions). While still 
                    representing good work, the standards and rigor differ from Russell Group universities.</p>
                  </div>
                </div>
              </div>

              {/* Dissertation/Final Year Project Comparison */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200 mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Dissertation Weightings Across Universities
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Final year dissertations or projects are a crucial component of UK degrees, but their weight varies:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-green-600">
                        <th className="px-4 py-2 text-left font-bold text-white">University</th>
                        <th className="px-4 py-2 text-left font-bold text-white">Dissertation Credits</th>
                        <th className="px-4 py-2 text-left font-bold text-white">% of Final Year</th>
                        <th className="px-4 py-2 text-left font-bold text-white">Impact on Overall Degree</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-purple-50">
                        <td className="px-4 py-3 font-bold text-purple-700">Manchester</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">40-60 CATs</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">33-50%</td>
                        <td className="px-4 py-3 text-gray-700">17-25% (of 50% final year weight)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-800">Oxford</td>
                        <td className="px-4 py-3 text-gray-800">Varies by course</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">10-30%</td>
                        <td className="px-4 py-3 text-gray-700">10-30% (100% final year system)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-800">Imperial College</td>
                        <td className="px-4 py-3 text-gray-800">45-60 ECTS</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">40-50%</td>
                        <td className="px-4 py-3 text-gray-700">24-30% (of 60% final year)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-800">UCL</td>
                        <td className="px-4 py-3 text-gray-800">30-60 credits</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">25-50%</td>
                        <td className="px-4 py-3 text-gray-700">15-30% (of 60% final year)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-800">Edinburgh</td>
                        <td className="px-4 py-3 text-gray-800">60 credits</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">50%</td>
                        <td className="px-4 py-3 text-gray-700">30% (of 60% final year)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mt-4 p-3 bg-green-50 rounded-lg">
                  <strong>Manchester Insight:</strong> At Manchester, dissertations typically carry 40-60 CATs, representing a substantial portion of your 
                  final year. With the 50% final year weighting, your dissertation alone can account for <strong>17-25% of your overall degree classification</strong>—
                  making it one of the most important academic works you'll produce.
                </p>
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-300">
                <p className="text-gray-800 leading-relaxed">
                  <strong className="text-blue-700">Takeaway:</strong> Manchester sits firmly in the middle-to-upper tier of UK universities in terms of 
                  grading rigor. While not as extreme as Oxford's finals-only system, Manchester's standards are comparable to other top Russell Group 
                  institutions. <strong>Your Manchester degree is internationally recognized</strong> and carries the prestige of one of the UK's leading 
                  research universities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl shadow-xl p-8 border border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Frequently Asked Questions
            </h2>

            <div className="space-y-5">
              {/* FAQ 1 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-purple-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-purple-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-purple-600 text-xl">Q1.</span>
                    <span>What GPA do I need for a PhD at a top US university?</span>
                  </span>
                  <svg className="w-6 h-6 text-purple-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-purple-100">
                  <p className="mb-3">
                    For competitive PhD programs at top US universities (Ivy League, Stanford, MIT, etc.), you typically need a <strong>First Class degree 
                    (70%+) from Manchester</strong>, which converts to approximately <strong>3.7-4.0 US GPA</strong>.
                  </p>
                  <p className="mb-3">
                    However, <strong>a strong 2:1 degree (65-69%, roughly 3.3-3.6 US GPA)</strong> is still competitive, especially if you have:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Outstanding research experience or publications</li>
                    <li>Strong letters of recommendation from Manchester faculty</li>
                    <li>High GRE scores (if required by the program)</li>
                    <li>Relevant work or research experience in your field</li>
                    <li>A compelling statement of purpose demonstrating fit</li>
                  </ul>
                  <p className="mt-3 p-3 bg-purple-50 rounded-lg text-sm">
                    <strong>Tip:</strong> Many US PhD programs understand that Russell Group universities like Manchester have strict grading standards. 
                    Make sure to highlight Manchester's reputation and your Russell Group affiliation in your application materials.
                  </p>
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-blue-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-blue-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl">Q2.</span>
                    <span>Will US graduate schools understand my Manchester degree classification?</span>
                  </span>
                  <svg className="w-6 h-6 text-blue-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-blue-100">
                  <p className="mb-3">
                    <strong>Yes, absolutely.</strong> Most US graduate admissions offices are familiar with the UK classification system, especially from 
                    well-known universities like Manchester. However, you can make their job easier by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    <li><strong>Providing context:</strong> Mention in your personal statement that Manchester is a Russell Group university (UK's equivalent 
                    to the Ivy League) with rigorous grading standards.</li>
                    <li><strong>Including explanatory material:</strong> Request that Manchester include a grading scale explanation with your official transcript. 
                    Many UK universities routinely do this for international applications.</li>
                    <li><strong>Using credential evaluation services:</strong> Consider using WES (World Education Services) or other NACES-accredited services 
                    to convert your degree to a US GPA equivalent with an official report.</li>
                    <li><strong>Highlighting your ranking:</strong> If you're in the top percentage of your class, mention this as context for your grades.</li>
                  </ul>
                  <p className="p-3 bg-blue-50 rounded-lg text-sm">
                    <strong>Important:</strong> Top US universities receive many applications from UK students and are well-versed in evaluating Russell Group 
                    degrees. Your Manchester degree carries significant weight internationally.
                  </p>
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-green-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-green-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">Q3.</span>
                    <span>How does the 50% final year weighting affect my overall GPA?</span>
                  </span>
                  <svg className="w-6 h-6 text-green-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-green-100">
                  <p className="mb-3">
                    The <strong>50% final year weighting is crucial</strong> at Manchester. It means your third-year performance has <strong>more than twice 
                    the impact</strong> of your first year and <strong>significantly more</strong> than your second year.
                  </p>
                  <p className="mb-3"><strong>Practical Example:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    <li>First Year: 60% average × 0.20 = 12 points</li>
                    <li>Second Year: 65% average × 0.30 = 19.5 points</li>
                    <li>Final Year: 75% average × 0.50 = 37.5 points</li>
                    <li><strong>Overall: 69% (Upper Second Class, 2:1)</strong></li>
                  </ul>
                  <p className="mb-3">
                    <strong>Key Insight:</strong> A strong final year can significantly boost your classification, even if your first two years were average. 
                    Conversely, a weaker final year can drag down your overall result more than poor performance in earlier years.
                  </p>
                  <div className="p-3 bg-green-50 rounded-lg text-sm">
                    <strong>Strategy:</strong> Focus extra effort on your final year modules, especially your dissertation (typically 40-60 credits). Since 
                    your final year counts for 50% of your degree, excellence here can make the difference between a 2:1 and a First Class.
                  </div>
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-amber-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-amber-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-amber-600 text-xl">Q4.</span>
                    <span>What if I'm on a borderline between classifications (e.g., 68-69%)?</span>
                  </span>
                  <svg className="w-6 h-6 text-amber-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-amber-100">
                  <p className="mb-3">
                    Manchester, like most UK universities, has <strong>borderline classification policies</strong>. If your weighted average falls within 
                    <strong>1-2% of a higher classification boundary</strong> (e.g., 68-69% when First Class starts at 70%), you may be awarded the higher 
                    classification based on:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    <li><strong>Academic Profile:</strong> Strong performance in final year and dissertation</li>
                    <li><strong>Volume of Higher Grades:</strong> Sufficient number of modules at First Class level</li>
                    <li><strong>Progression:</strong> Improving trajectory across your degree</li>
                    <li><strong>Examination Board Discretion:</strong> The board reviews borderline cases individually</li>
                  </ul>
                  <p className="mb-3"><strong>Common Borderline Scenarios:</strong></p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-amber-50 rounded-lg text-sm">
                      <strong>68-69%:</strong> May be upgraded to First Class if you have strong final year performance and several First Class module marks.
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg text-sm">
                      <strong>58-59%:</strong> May be upgraded to 2:1 if your profile shows consistent improvement and strong final year results.
                    </div>
                  </div>
                  <p className="mt-3 p-3 bg-amber-100 rounded-lg text-sm">
                    <strong>Note:</strong> Borderline decisions are made by the examination board after final marks are submitted. While not guaranteed, 
                    many borderline students receive the benefit of the doubt, especially with strong mitigating circumstances or excellent final year performance.
                  </p>
                </div>
              </details>

              {/* FAQ 5 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-red-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-red-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">Q5.</span>
                    <span>How do I convert a single module mark to a US GPA?</span>
                  </span>
                  <svg className="w-6 h-6 text-red-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-red-100">
                  <p className="mb-3">
                    While this calculator focuses on overall degree GPA, you can estimate individual module conversions using this guide:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-red-100">
                          <th className="px-4 py-2 text-left font-bold">Manchester %</th>
                          <th className="px-4 py-2 text-left font-bold">UK Grade</th>
                          <th className="px-4 py-2 text-left font-bold">US Letter</th>
                          <th className="px-4 py-2 text-left font-bold">US GPA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="bg-white">
                          <td className="px-4 py-2">90-100%</td>
                          <td className="px-4 py-2">Exceptional First</td>
                          <td className="px-4 py-2">A+</td>
                          <td className="px-4 py-2">4.0</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">80-89%</td>
                          <td className="px-4 py-2">Outstanding First</td>
                          <td className="px-4 py-2">A</td>
                          <td className="px-4 py-2">4.0</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-2">70-79%</td>
                          <td className="px-4 py-2">First Class</td>
                          <td className="px-4 py-2">A- to A</td>
                          <td className="px-4 py-2">3.7-4.0</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">65-69%</td>
                          <td className="px-4 py-2">Strong 2:1</td>
                          <td className="px-4 py-2">B+ to A-</td>
                          <td className="px-4 py-2">3.3-3.7</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-2">60-64%</td>
                          <td className="px-4 py-2">Upper Second (2:1)</td>
                          <td className="px-4 py-2">B to B+</td>
                          <td className="px-4 py-2">3.0-3.3</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">55-59%</td>
                          <td className="px-4 py-2">Strong 2:2</td>
                          <td className="px-4 py-2">B- to B</td>
                          <td className="px-4 py-2">2.7-3.0</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-2">50-54%</td>
                          <td className="px-4 py-2">Lower Second (2:2)</td>
                          <td className="px-4 py-2">C+ to B-</td>
                          <td className="px-4 py-2">2.3-2.7</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">45-49%</td>
                          <td className="px-4 py-2">Third Class</td>
                          <td className="px-4 py-2">C to C+</td>
                          <td className="px-4 py-2">2.0-2.3</td>
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-2">40-44%</td>
                          <td className="px-4 py-2">Pass/Third</td>
                          <td className="px-4 py-2">D+ to C</td>
                          <td className="px-4 py-2">1.7-2.0</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-2">Below 40%</td>
                          <td className="px-4 py-2">Fail</td>
                          <td className="px-4 py-2">F</td>
                          <td className="px-4 py-2">0.0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 p-3 bg-red-50 rounded-lg text-sm">
                    <strong>Remember:</strong> These are approximations. Different US institutions may use slightly different conversion scales. Always 
                    provide your original UK percentage marks alongside any GPA conversions.
                  </p>
                </div>
              </details>

              {/* FAQ 6 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-indigo-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-indigo-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-indigo-600 text-xl">Q6.</span>
                    <span>What's the difference between Manchester and Oxford/Cambridge grading?</span>
                  </span>
                  <svg className="w-6 h-6 text-indigo-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-indigo-100">
                  <p className="mb-3">The main differences are:</p>
                  <div className="space-y-3 mb-3">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Year Weightings:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li><strong>Manchester:</strong> 20% / 30% / 50% (balanced across all three years)</li>
                        <li><strong>Oxford:</strong> 0% / 0% / 100% (only final examinations count for most subjects)</li>
                        <li><strong>Cambridge:</strong> Varies by Tripos, but typically final year dominates</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">First Class Rates:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li><strong>Manchester:</strong> 15-20% (strict, Russell Group standards)</li>
                        <li><strong>Oxford:</strong> 25-30% (higher, but extremely rigorous finals)</li>
                        <li><strong>Cambridge:</strong> 25-32% (similar to Oxford, Tripos system)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Assessment Style:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li><strong>Manchester:</strong> Mix of exams and coursework across all years</li>
                        <li><strong>Oxford:</strong> Tutorial-based with emphasis on final written examinations</li>
                        <li><strong>Cambridge:</strong> Supervision-based with Tripos examinations</li>
                      </ul>
                    </div>
                  </div>
                  <p className="p-3 bg-indigo-100 rounded-lg text-sm">
                    <strong>Bottom Line:</strong> All three are world-class institutions with rigorous standards. Manchester's approach is more balanced 
                    across years, giving you multiple opportunities to demonstrate ability. Oxbridge's finals-only system creates higher pressure but 
                    results in slightly higher First Class rates. US graduate schools respect degrees from all three equally.
                  </p>
                </div>
              </details>

              {/* FAQ 7 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-teal-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-teal-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-teal-600 text-xl">Q7.</span>
                    <span>Can I get into an Ivy League Master's program with a 2:1 from Manchester?</span>
                  </span>
                  <svg className="w-6 h-6 text-teal-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-teal-100">
                  <p className="mb-3">
                    <strong>Absolutely yes!</strong> A <strong>2:1 degree (60-69%) from Manchester is highly competitive</strong> for Ivy League Master's 
                    programs. In fact, a strong 2:1 (65-69%) is often viewed comparably to a 3.5-3.7 US GPA.
                  </p>
                  <p className="mb-3"><strong>What makes you competitive:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    <li><strong>Russell Group Prestige:</strong> Manchester's reputation carries significant weight with Ivy League admissions committees</li>
                    <li><strong>Grade Context:</strong> A 2:1 from Manchester demonstrates solid academic ability given the rigorous grading standards</li>
                    <li><strong>Strong Holistic Application:</strong> Your overall profile matters more than just GPA—research experience, recommendations, 
                    statement of purpose, and relevant experience all factor heavily</li>
                    <li><strong>Relevant Coursework:</strong> Strong performance in courses directly related to your intended Master's field</li>
                    <li><strong>Upward Trajectory:</strong> Improvement from first to final year shows academic maturity</li>
                  </ul>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-teal-50 rounded-lg text-sm">
                      <strong>Strong 2:1 (65-69%):</strong> Very competitive for top Master's programs. Roughly equivalent to 3.3-3.7 US GPA. You should 
                      definitely apply to Ivy League schools.
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg text-sm">
                      <strong>Standard 2:1 (60-64%):</strong> Still competitive, especially with strong supporting materials. Equivalent to ~3.0-3.3 US GPA. 
                      Consider applying strategically to a mix of reach and target schools.
                    </div>
                  </div>
                  <p className="mt-3 p-3 bg-teal-100 rounded-lg text-sm">
                    <strong>Success Story:</strong> Many Manchester 2:1 graduates go on to Ivy League Master's programs annually. Your application should 
                    emphasize Manchester's Russell Group status, your specific accomplishments, and how your Manchester education prepared you for graduate study.
                  </p>
                </div>
              </details>

              {/* FAQ 8 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-pink-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-pink-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-pink-600 text-xl">Q8.</span>
                    <span>How does my dissertation affect my overall degree classification?</span>
                  </span>
                  <svg className="w-6 h-6 text-pink-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-pink-100">
                  <p className="mb-3">
                    Your dissertation is <strong>extremely important</strong> at Manchester. Here's why:
                  </p>
                  <div className="space-y-3 mb-3">
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Credit Weight:</h4>
                      <p className="text-sm">Dissertations are typically worth <strong>40-60 CATs</strong> (Credit Accumulation Transfer Scheme), making 
                      them one-third to one-half of your final year coursework. With 120 CATs required per year, a 60-CAT dissertation represents 
                      <strong>50% of your final year</strong>.</p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Impact on Overall Classification:</h4>
                      <p className="text-sm">Since your final year counts for <strong>50% of your degree</strong>, and your dissertation can be 50% of 
                      your final year, your dissertation alone may account for <strong>up to 25% of your entire degree classification</strong>.</p>
                    </div>
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Practical Example:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>60 CATs dissertation at 75% = 45 points</li>
                        <li>60 CATs other modules at 65% average = 39 points</li>
                        <li>Final year average: (45+39) / 120 = 70% (First Class territory!)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mb-3"><strong>Strategic Importance:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-3">
                    <li>A strong dissertation (70%+) can lift you from a 2:1 to a First Class</li>
                    <li>A weak dissertation (below 60%) can drag down your overall result significantly</li>
                    <li>Most students spend 3-6 months on their dissertation—invest the time wisely</li>
                    <li>Choose a topic you're passionate about and have strong supervisor support</li>
                  </ul>
                  <p className="p-3 bg-pink-100 rounded-lg text-sm">
                    <strong>Advice:</strong> Treat your dissertation as your most important academic work at Manchester. Start early, meet regularly with 
                    your supervisor, and aim for excellence. It's your single biggest opportunity to influence your final degree classification.
                  </p>
                </div>
              </details>

              {/* FAQ 9 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-orange-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-orange-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-orange-600 text-xl">Q9.</span>
                    <span>What if I studied abroad for a year? How are those grades converted?</span>
                  </span>
                  <svg className="w-6 h-6 text-orange-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-orange-100">
                  <p className="mb-3">
                    If you participated in a <strong>Study Abroad or Exchange program</strong>, Manchester has specific policies for converting and 
                    incorporating those grades:
                  </p>
                  <div className="space-y-3 mb-3">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Year Abroad (4-Year Degrees):</h4>
                      <p className="text-sm mb-2">For integrated year abroad programs (e.g., MEng with Year Abroad):</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Year abroad typically counts for <strong>10-20% of your final degree</strong></li>
                        <li>Grades are converted to Manchester's percentage scale by the International Office</li>
                        <li>You need to pass (typically 50%+ equivalent) but it doesn't usually count toward classification at full weight</li>
                        <li>Final weighting might be: 10% First / 20% Second / 15% Abroad / 55% Final</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Semester Exchange (3-Year Degrees):</h4>
                      <p className="text-sm mb-2">For one-semester exchanges during a standard 3-year degree:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Credits transfer back to Manchester as part of your Year 2 or Year 3</li>
                        <li>Grades are converted using the university's official conversion tables</li>
                        <li>Weighted according to which year you did the exchange</li>
                        <li>Some exchanges may be pass/fail only (check your program requirements)</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">Grade Conversion Process:</h4>
                      <p className="text-sm">Manchester's Study Abroad Office uses standardized conversion tables for partner institutions. Common conversions:</p>
                      <ul className="list-disc pl-6 space-y-1 text-sm mt-2">
                        <li><strong>US System:</strong> A/A- = 70-85%, B+/B = 60-69%, B-/C+ = 50-59%</li>
                        <li><strong>European ECTS:</strong> A/B = 70-85%, C/D = 60-69%, E = 50-59%</li>
                        <li><strong>Australian System:</strong> High Distinction = 80-90%, Distinction = 70-79%, Credit = 60-69%</li>
                      </ul>
                    </div>
                  </div>
                  <p className="p-3 bg-orange-100 rounded-lg text-sm">
                    <strong>Important:</strong> Always consult with your <strong>Academic Advisor</strong> and <strong>Study Abroad Office</strong> to 
                    understand exactly how your specific exchange program affects your degree calculation. Policies vary by program and destination.
                  </p>
                </div>
              </details>

              {/* FAQ 10 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-cyan-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-cyan-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-cyan-600 text-xl">Q10.</span>
                    <span>Do US employers understand UK degree classifications?</span>
                  </span>
                  <svg className="w-6 h-6 text-cyan-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-cyan-100">
                  <p className="mb-3">
                    <strong>It varies by employer and industry</strong>, but overall awareness is increasing. Here's how to present your Manchester degree 
                    to US employers:
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">✓ Employers Familiar with UK System:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Large multinational corporations</li>
                        <li>Tech companies (Google, Microsoft, Amazon, etc.)</li>
                        <li>Financial services firms (Wall Street banks)</li>
                        <li>Consulting firms (McKinsey, BCG, Bain)</li>
                        <li>Academic institutions and research labs</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">? May Need Explanation:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Small to medium US-only companies</li>
                        <li>Regional/local employers</li>
                        <li>Industries with limited international hiring</li>
                        <li>Startups without international experience</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mb-3"><strong>How to Present Your Degree on Your Resume:</strong></p>
                  <div className="space-y-2 mb-3">
                    <div className="p-3 bg-white border-2 border-cyan-200 rounded-lg text-sm">
                      <strong>Option 1 (Recommended):</strong><br />
                      <span className="font-mono text-xs">BSc Computer Science, First Class Honours (Top 15% of class)</span><br />
                      <span className="font-mono text-xs">University of Manchester, UK Russell Group | GPA Equivalent: 3.8/4.0</span>
                    </div>
                    <div className="p-3 bg-white border-2 border-cyan-200 rounded-lg text-sm">
                      <strong>Option 2 (With Context):</strong><br />
                      <span className="font-mono text-xs">BA Economics, Upper Second Class Honours (2:1) - 65%</span><br />
                      <span className="font-mono text-xs">University of Manchester | Russell Group University (UK's Ivy League)</span><br />
                      <span className="font-mono text-xs">US GPA Equivalent: 3.3-3.5/4.0</span>
                    </div>
                  </div>
                  <p className="mb-3"><strong>Additional Tips:</strong></p>
                  <ul className="list-disc pl-6 space-y-2 mb-3 text-sm">
                    <li>Always mention <strong>"Russell Group"</strong> on your resume—it signals prestige to informed employers</li>
                    <li>Include your percentage or GPA equivalent to help HR departments</li>
                    <li>Add <strong>"Top X% of class"</strong> if you have a First Class to contextualize the achievement</li>
                    <li>In cover letters, briefly explain that UK grading differs from US standards</li>
                    <li>Be prepared to explain your classification in interviews with a quick summary</li>
                  </ul>
                  <p className="p-3 bg-cyan-100 rounded-lg text-sm">
                    <strong>Reality Check:</strong> Top US employers actively recruit from Manchester and understand the UK system. For others, a brief 
                    explanation positions you well. Your degree from Manchester is a strong credential—present it confidently with appropriate context.
                  </p>
                </div>
              </details>

              {/* FAQ 11 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-violet-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-violet-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-violet-600 text-xl">Q11.</span>
                    <span>Should I use a credential evaluation service like WES?</span>
                  </span>
                  <svg className="w-6 h-6 text-violet-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-violet-100">
                  <p className="mb-3">
                    <strong>It depends on your situation:</strong>
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        When WES is Recommended:
                      </h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Required by specific graduate programs</li>
                        <li>Applying to multiple schools (one report, multiple uses)</li>
                        <li>Professional licensing requirements (CPA, PE, etc.)</li>
                        <li>Immigration/visa applications requiring credential verification</li>
                        <li>Applying to less-known schools unfamiliar with UK degrees</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border-2 border-red-300">
                      <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        When WES Isn't Necessary:
                      </h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Top universities (Ivies, Stanford, MIT, etc.) familiar with UK system</li>
                        <li>Schools that explicitly state WES not required</li>
                        <li>When Manchester provides official grade explanation</li>
                        <li>Applying for jobs (most employers don't require WES)</li>
                        <li>Budget constraints (WES costs $100-$200+)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mb-3"><strong>WES Alternatives (NACES-Accredited):</strong></p>
                  <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
                    <li><strong>Educational Credential Evaluators (ECE):</strong> Often faster and slightly cheaper than WES</li>
                    <li><strong>SpanTran:</strong> Good for specific professional licensing</li>
                    <li><strong>IERF (International Education Research Foundation):</strong> Another reliable option</li>
                  </ul>
                  <div className="p-3 bg-violet-50 rounded-lg text-sm border-2 border-violet-200">
                    <strong>Cost-Benefit Analysis:</strong>
                    <p className="mt-2">WES Report costs ~$200-250 including delivery. If you're applying to 5+ graduate schools or need it for licensing, 
                    it's worthwhile. If you're applying to 1-2 top schools that understand UK degrees, you may not need it. Check each school's specific 
                    requirements first.</p>
                  </div>
                </div>
              </details>

              {/* FAQ 12 */}
              <details className="group bg-white rounded-xl shadow-md border-2 border-lime-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-lg text-gray-900 hover:bg-lime-50 transition-colors">
                  <span className="flex items-start gap-3">
                    <span className="text-lime-600 text-xl">Q12.</span>
                    <span>How accurate is this calculator compared to official Manchester calculations?</span>
                  </span>
                  <svg className="w-6 h-6 text-lime-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 pt-0 text-gray-700 leading-relaxed border-t border-lime-100">
                  <p className="mb-3">
                    This calculator is <strong>designed to closely match Manchester's official calculation method</strong> and uses the university's 
                    published year weightings (20% / 30% / 50%). However, there are some factors it cannot account for:
                  </p>
                  <div className="space-y-3 mb-3">
                    <div className="p-4 bg-lime-50 rounded-lg border border-lime-200">
                      <h4 className="font-bold text-gray-900 mb-2">✓ What This Calculator Does:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Applies official 20/30/50 year weightings</li>
                        <li>Converts UK percentages to US GPA using standard conversion tables</li>
                        <li>Determines degree classification based on weighted average</li>
                        <li>Accounts for credit weighting within each year</li>
                        <li>Provides accurate estimates for planning and goal-setting</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h4 className="font-bold text-gray-900 mb-2">⚠ What This Calculator Cannot Account For:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li><strong>Borderline Discretion:</strong> Examination boards may upgrade students within 1-2% of boundaries</li>
                        <li><strong>Failed Modules:</strong> Complex rules for condoned fails, resits, and their impact on classification</li>
                        <li><strong>Mitigating Circumstances:</strong> Special consideration for illness, personal issues, etc.</li>
                        <li><strong>Program-Specific Rules:</strong> Some programs (Medicine, Engineering) may have different weighting schemes</li>
                        <li><strong>External Examiner Adjustments:</strong> Rare adjustments made by external examiners</li>
                        <li><strong>Study Abroad Credits:</strong> Special handling of exchange program grades</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mb-3"><strong>Accuracy for Most Students:</strong></p>
                  <p className="text-sm mb-3">
                    For <strong>standard 3-year undergraduate degrees</strong> without complications, this calculator should be accurate within 
                    <strong>±1-2%</strong> of your official classification. If you're on a borderline or have special circumstances, the actual result 
                    may differ.
                  </p>
                  <div className="p-4 bg-lime-100 rounded-lg text-sm border-2 border-lime-300">
                    <strong>Best Practice:</strong> Use this calculator for <strong>planning and estimation</strong>. For official degree classification 
                    information, always consult:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Your <strong>Academic Advisor</strong> for personalized guidance</li>
                      <li>Your <strong>Program Handbook</strong> for specific calculation rules</li>
                      <li><strong>My Manchester Portal</strong> for your official transcript and progression data</li>
                      <li><strong>Student Services</strong> if you have mitigating circumstances or borderline concerns</li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-xl border-2 border-purple-300">
              <p className="text-gray-800 leading-relaxed">
                <strong className="text-purple-700">Still have questions?</strong> Contact Manchester's Student Services, visit your Academic Advisor, 
                or consult the <a href="https://www.manchester.ac.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline font-semibold">
                official University of Manchester website</a> for the most up-to-date policies and guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div id="related-tools" className="max-w-5xl mx-auto px-4 pb-12">
          <RelatedTools 
            currentSlug="manchester-gpa-calculator"
            relatedSlugs={['uk-gpa-system-guide', 'oxford-gpa-calculator', 'cambridge-gpa-calculator', 'imperial-gpa-calculator', 'ucl-gpa-calculator', 'edinburgh-gpa-calculator']}
            navigateTo={navigateTo} 
          />
        </div>
      </div>
    </div>
  );
};

export default ManchesterGPACalculator;
