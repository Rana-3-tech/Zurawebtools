import React, { useState, useEffect, useCallback, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface UKGPAGuideProps {
  navigateTo: (page: Page) => void;
}

interface Module {
  name: string;
  credits: number;
  percentage: number;
}

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};

const UKGPAGuide: React.FC<UKGPAGuideProps> = ({ navigateTo }) => {
  const [modules, setModules] = useState<Module[]>([
    { name: '', credits: 20, percentage: 0 }
  ]);
  const [ukClassification, setUkClassification] = useState<string>('');
  const [usGPA, setUsGPA] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string>('');

  // SEO setup
  useEffect(() => {
    document.title = "UK Grading System to US GPA Conversion Guide | First Class, 2:1, 2:2 to GPA";
    
    // Remove existing meta tags
    const existingMeta = document.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]');
    existingMeta.forEach(tag => tag.remove());

    // Meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Complete UK to US GPA conversion guide. Convert First Class Honours, 2:1, 2:2, Third Class to 4.0 GPA scale. Includes Russell Group, Oxbridge percentages, ECTS credits, and Masters classifications.';
    document.head.appendChild(metaDescription);

    // Canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/uk-gpa-system-guide';
    document.head.appendChild(canonical);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'UK Grading System to US GPA Conversion Guide | First Class, 2:1, 2:2 to GPA' },
      { property: 'og:description', content: 'Complete UK to US GPA conversion guide. Convert First Class Honours, 2:1, 2:2, Third Class to 4.0 GPA scale. Includes Russell Group, Oxbridge, ECTS credits, Masters classifications.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/uk-gpa-system-guide' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-image-uk-gpa-guide.png' }
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
      { name: 'twitter:title', content: 'UK Grading System to US GPA Conversion Guide' },
      { name: 'twitter:description', content: 'Convert First Class, 2:1, 2:2 to US GPA. Complete guide with Russell Group, Oxbridge standards, ECTS credits, and Masters classifications.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/og-image-uk-gpa-guide.png' }
    ];
    twitterTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // JSON-LD Schemas
    // 1. BreadcrumbList Schema
    const breadcrumbSchema = {
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
          "name": "UK GPA System Explained",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/uk-gpa-system-guide"
        }
      ]
    };

    // 2. HowTo Schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Convert UK Grades to US GPA",
      "description": "Step-by-step guide to convert UK degree classifications (First Class, 2:1, 2:2, Third) and percentage marks to US 4.0 GPA scale",
      "totalTime": "PT5M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Identify Your UK Classification",
          "text": "Determine your degree classification: First Class Honours (70-100%), Upper Second 2:1 (60-69%), Lower Second 2:2 (50-59%), or Third Class (40-49%)."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Use the Conversion Table",
          "text": "First Class (70%+) = 3.7-4.0 GPA, 2:1 (60-69%) = 3.0-3.6 GPA, 2:2 (50-59%) = 2.3-2.9 GPA, Third (40-49%) = 1.7-2.2 GPA."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Module Credits",
          "text": "List all your modules with their credits (CATs) and percentage marks. Weight each module by credits to get accurate average."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Convert Credits to US System",
          "text": "Use formula: UK CATs ÷ 2 = US semester credits. For example, 20 CATs = 10 US credits, 120 CATs per year = 60 US credits."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Consider University Prestige",
          "text": "For Oxbridge and Russell Group universities, grades may be evaluated higher by US admissions. A 2:1 from Oxford may equal 3.7+ GPA perception."
        }
      ]
    };

    // 3. FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good UK degree classification for US graduate school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For competitive US graduate programs, you typically need at least an Upper Second (2:1), which converts to approximately 3.0-3.6 GPA. A First Class Honours (70%+) is equivalent to 3.7-4.0 GPA and makes you competitive for top programs. For PhD programs at Harvard, Stanford, MIT, etc., a First from a Russell Group university is usually expected, though a high 2:1 (67-69%) from Oxbridge may also be considered."
          }
        },
        {
          "@type": "Question",
          "name": "Why is 70% considered excellent in UK but only average in US?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The UK and US use fundamentally different grading philosophies. In the UK, marking criteria reserve 90-100% for 'perfect' work, which is nearly impossible to achieve. 70-80% represents outstanding work that exceeds all learning objectives. In the US, 90-100% (A) is expected for students who master the material. UK 70% means 'you've mastered everything and shown original thinking' versus US 90% meaning 'you've mastered everything required.'"
          }
        },
        {
          "@type": "Question",
          "name": "Do US universities understand UK degree classifications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, most US graduate admissions offices are familiar with UK classifications, especially at top universities that regularly admit international students. However, you should still include an explanation in your application. Services like WES (World Education Services) or ECE (Educational Credential Evaluators) can provide official GPA conversions for $100-200. For competitive programs, also mention your university's ranking."
          }
        },
        {
          "@type": "Question",
          "name": "Is a UK 2:2 (50-59%) accepted by US universities?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Lower Second (2:2) converts to approximately 2.3-2.9 GPA, which is below the typical 3.0 minimum for most US graduate programs. However, you can strengthen your application with: (1) Strong GRE/GMAT scores, (2) Relevant work experience (2-3+ years), (3) Research publications or professional achievements, (4) Compelling personal statement, (5) Strong recommendation letters. Some less selective programs or professional Masters will accept 2:2 with experience."
          }
        },
        {
          "@type": "Question",
          "name": "How do I convert UK credits (CATs) to US semester hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use the formula: UK CATs ÷ 2 = US semester credits. For example, a 20 CAT module = 10 US credits, and 120 CATs per year = 60 US credits (two full semesters). UK undergraduate degrees are 360 CATs total (3 years) = 180 US credits, while US Bachelor's degrees require 120 credits over 4 years."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between UK Honours and Ordinary degrees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A UK Honours degree (BA Hons, BSc Hons) requires 360 credits with 120 at Level 6 (final year) and is classified (1st, 2:1, 2:2, 3rd). An Ordinary degree has 300 credits with no classification - just Pass. In US applications, Honours degrees are standard and expected. An Ordinary degree may raise questions and typically converts to 2.0-2.5 GPA."
          }
        },
        {
          "@type": "Question",
          "name": "Does Oxbridge grade differently than other UK universities?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Oxford and Cambridge have notoriously strict marking standards. Scores above 80% are extremely rare, and 75%+ is considered exceptional. A 2:1 (60-69%) from Oxbridge is often viewed by US admissions as equivalent to 3.5-3.8 GPA from a top US school. Many Oxbridge graduates with 2:1 degrees successfully enter Harvard, Stanford, MIT PhD programs."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get my UK degree converted to an official US GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, through credential evaluation services. The most recognized are: (1) WES (World Education Services) - $205 course-by-course evaluation, (2) ECE (Educational Credential Evaluators) - $150-225, (3) SpanTran - $90-200. These services review your transcript and provide an official GPA calculation that US universities accept. For competitive programs, WES is most trusted."
          }
        },
        {
          "@type": "Question",
          "name": "How do UK Masters classifications convert to US GPAs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UK taught Masters use three classifications: (1) Distinction (70%+) = 3.7-4.0 GPA - required for competitive PhD programs, (2) Merit (60-69%) = 3.3-3.6 GPA - acceptable for most US opportunities, (3) Pass (50-59%) = 3.0-3.2 GPA - meets minimum requirements. Note that many UK programs don't award Distinction/Merit at all - just Pass/Fail."
          }
        },
        {
          "@type": "Question",
          "name": "Do US employers understand UK degree classifications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It varies significantly. Large multinational companies understand UK grades well. For smaller US companies, you should explain: 'I graduated with First Class Honours (equivalent to 3.8-4.0 GPA), the highest undergraduate classification awarded to the top 20% of UK students.' On your resume, write: 'BA Economics, First Class Honours (equiv. 3.8 GPA)' or 'BSc Computer Science, Upper Second Class Honours (equiv. 3.5 GPA)'."
          }
        }
      ]
    };

    // 4. WebPage Schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "UK Grading System to US GPA Conversion Guide",
      "description": "Complete guide to converting UK degree classifications (First Class, 2:1, 2:2, Third) and percentage marks to US 4.0 GPA scale. Includes Russell Group comparisons, Oxbridge standards, ECTS credits, Masters classifications, and comprehensive FAQs.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/uk-gpa-system-guide",
      "publisher": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zurawebtools.com/logo.png"
        }
      },
      "datePublished": "2025-12-16",
      "dateModified": "2025-12-16",
      "inLanguage": "en-US",
      "keywords": "uk gpa conversion, first class honours gpa, 2:1 gpa equivalent, uk to us gpa, ects to us credits, russell group gpa, oxbridge grades, uk masters classification",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "UK to US GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    };

    // Insert JSON-LD schemas
    const schemas = [breadcrumbSchema, howToSchema, faqSchema, webPageSchema];
    const scriptTags: HTMLScriptElement[] = [];
    
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scriptTags.push(script);
    });

    return () => {
      existingMeta.forEach(tag => tag.remove());
      if (canonical.parentNode) canonical.remove();
      scriptTags.forEach(script => {
        if (script.parentNode) script.remove();
      });
    };
  }, []);

  // Popular UK modules
  const popularUKModules = [
    'Research Methods',
    'Dissertation/Project',
    'Statistics',
    'Core Theory',
    'Advanced Seminar',
    'Independent Study',
    'Laboratory Work',
    'Field Work',
    'International Placement',
    'Professional Practice'
  ];

  // UK percentage to US GPA conversion
  const percentageToGPA = (percentage: number): number => {
    if (percentage >= 90) return 4.0;  // Exceptional (rare in UK)
    if (percentage >= 80) return 4.0;  // First Class Honours high
    if (percentage >= 70) return 3.7;  // First Class Honours
    if (percentage >= 65) return 3.3;  // Upper Second (2:1) high
    if (percentage >= 60) return 3.0;  // Upper Second (2:1)
    if (percentage >= 55) return 2.7;  // Lower Second (2:2) high
    if (percentage >= 50) return 2.3;  // Lower Second (2:2)
    if (percentage >= 45) return 2.0;  // Third Class Honours
    if (percentage >= 40) return 1.7;  // Pass/Ordinary Degree
    if (percentage >= 35) return 1.0;  // Fail (sometimes compensated)
    return 0.0;
  };

  // Get UK classification from average percentage
  const getUKClassification = (avgPercentage: number): string => {
    if (avgPercentage >= 70) return 'First Class Honours (1st)';
    if (avgPercentage >= 60) return 'Upper Second Class Honours (2:1)';
    if (avgPercentage >= 50) return 'Lower Second Class Honours (2:2)';
    if (avgPercentage >= 40) return 'Third Class Honours (3rd)';
    if (avgPercentage >= 35) return 'Ordinary Degree (Pass)';
    return 'Fail';
  };

  // Calculate overall GPA
  const calculateGPA = useCallback(() => {
    setError('');
    
    // Validation
    const validModules = modules.filter(m => m.percentage > 0 && m.credits > 0);
    
    if (validModules.length === 0) {
      setError('Please add at least one module with a valid percentage and credits.');
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      try {
        let totalWeightedGPA = 0;
        let totalCredits = 0;
        let totalWeightedPercentage = 0;

        validModules.forEach(module => {
          if (module.percentage < 0 || module.percentage > 100) {
            throw new Error(`Module "${module.name || 'Unnamed'}" has invalid percentage (${module.percentage}%). Must be 0-100.`);
          }
          if (module.credits <= 0 || module.credits > 240) {
            throw new Error(`Module "${module.name || 'Unnamed'}" has invalid credits (${module.credits}). Must be 1-240.`);
          }

          const gpa = percentageToGPA(module.percentage);
          totalWeightedGPA += gpa * module.credits;
          totalWeightedPercentage += module.percentage * module.credits;
          totalCredits += module.credits;
        });

        const finalGPA = totalCredits > 0 ? totalWeightedGPA / totalCredits : 0;
        const avgPercentage = totalCredits > 0 ? totalWeightedPercentage / totalCredits : 0;

        if (!isFinite(finalGPA) || isNaN(finalGPA)) {
          throw new Error('Calculation error. Please check your inputs.');
        }

        setUsGPA(Math.round(finalGPA * 100) / 100);
        setUkClassification(getUKClassification(avgPercentage));
        setShowResults(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during calculation');
        setShowResults(false);
      } finally {
        setIsCalculating(false);
      }
    }, 800);
  }, [modules]);

  // Update module
  const updateModule = useCallback((index: number, field: keyof Module, value: string | number) => {
    setModules(prev => {
      const updated = [...prev];
      if (field === 'name') {
        updated[index][field] = sanitizeInput(value as string);
      } else if (field === 'credits') {
        const credits = parseInt(value as string) || 0;
        updated[index][field] = Math.min(Math.max(credits, 0), 240);
      } else if (field === 'percentage') {
        const percentage = parseFloat(value as string) || 0;
        updated[index][field] = Math.min(Math.max(percentage, 0), 100);
      }
      return updated;
    });
    setShowResults(false);
    setError('');
  }, []);

  // Add module
  const addModule = useCallback(() => {
    setModules(prev => [...prev, { name: '', credits: 20, percentage: 0 }]);
  }, []);

  // Remove module
  const removeModule = useCallback((index: number) => {
    if (modules.length > 1) {
      setModules(prev => prev.filter((_, i) => i !== index));
      setShowResults(false);
    }
  }, [modules.length]);

  // Reset calculator
  const resetCalculator = useCallback(() => {
    setModules([{ name: '', credits: 20, percentage: 0 }]);
    setUkClassification('');
    setUsGPA(0);
    setShowResults(false);
    setError('');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            UK Grading System to US GPA Conversion Guide
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Convert UK degree classifications (<span className="text-blue-600 font-semibold">First Class Honours</span>, <span className="text-blue-600 font-semibold">2:1</span>, <span className="text-blue-600 font-semibold">2:2</span>, <span className="text-blue-600 font-semibold">Third Class</span>) to US 4.0 GPA scale. 
            Includes <span className="text-indigo-600 font-semibold">Russell Group</span>, <span className="text-indigo-600 font-semibold">Oxbridge</span> percentages, <span className="text-indigo-600 font-semibold">ECTS credits</span>, and <span className="text-indigo-600 font-semibold">Masters classifications</span>.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-500 hover:text-red-700 font-bold text-xl"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* UK to GPA Calculator Tool */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ukCalcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#ukCalcGrad)" />
              <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="url(#ukCalcGrad)" opacity="0.7" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">UK to US GPA Converter</h2>
          </div>

          <button
            onClick={addModule}
            className="w-full mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Module
          </button>

          <div className="space-y-6">
            {modules.map((module, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                
                {/* Module Name */}
                <div className="md:col-span-5">
                  <label htmlFor={`module-name-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Module Name
                  </label>
                  <input
                    type="text"
                    id={`module-name-${index}`}
                    value={module.name}
                    onChange={(e) => updateModule(index, 'name', e.target.value)}
                    placeholder="e.g., Research Methods"
                    list={`uk-modules-${index}`}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                  />
                  <datalist id={`uk-modules-${index}`}>
                    {popularUKModules.map(moduleName => (
                      <option key={moduleName} value={moduleName} />
                    ))}
                  </datalist>
                </div>

                {/* Credits */}
                <div className="md:col-span-3">
                  <label htmlFor={`module-credits-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Credits (CATs)
                  </label>
                  <input
                    type="number"
                    id={`module-credits-${index}`}
                    value={module.credits || ''}
                    onChange={(e) => updateModule(index, 'credits', e.target.value)}
                    min="0"
                    max="240"
                    step="10"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">UK: 10-60 CATs</p>
                </div>

                {/* Percentage */}
                <div className="md:col-span-3">
                  <label htmlFor={`module-percentage-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Mark (%)
                  </label>
                  <input
                    type="number"
                    id={`module-percentage-${index}`}
                    value={module.percentage || ''}
                    onChange={(e) => updateModule(index, 'percentage', e.target.value)}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 mt-1">0-100%</p>
                </div>

                {/* Remove Button */}
                {modules.length > 1 && (
                  <div className="md:col-span-1 flex items-end">
                    <button
                      onClick={() => removeModule(index)}
                      className="w-full md:w-auto px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
                      title="Remove Module"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Converting...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Calculate US GPA
                </>
              )}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 sm:flex-none bg-gray-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-lg"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">Conversion Results</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UK Classification Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <h3 className="text-xl font-bold">UK Classification</h3>
                </div>
                <p className="text-4xl font-bold mb-2">{ukClassification}</p>
                <p className="text-blue-100 text-sm">Based on weighted average</p>
              </div>

              {/* US GPA Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-bold">US GPA Equivalent</h3>
                </div>
                <p className="text-4xl font-bold mb-2">{usGPA.toFixed(2)}/4.0</p>
                <p className="text-indigo-100 text-sm">4.0 scale conversion</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12" id="quick-nav">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">Quick Navigation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { num: 1, title: 'Conversion Tables', subtitle: 'Percentage → GPA → Class', id: 'conversion-tables' },
              { num: 2, title: 'UK Grading System', subtitle: '1st, 2:1, 2:2, 3rd Explained', id: 'uk-grading' },
              { num: 3, title: 'Masters Classifications', subtitle: 'Distinction, Merit, Pass', id: 'masters' },
              { num: 4, title: 'Credit Systems', subtitle: 'CATs, ECTS, US Credits', id: 'credits' },
              { num: 5, title: 'Russell Group vs Others', subtitle: 'Grading Variations', id: 'russell-group' },
              { num: 6, title: 'FAQs', subtitle: 'Common Questions', id: 'faqs' }
            ].map(item => (
              <a
                key={item.num}
                href={`#${item.id}`}
                className="group bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm mr-3 group-hover:scale-110 transition-transform duration-200">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Conversion Tables Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 scroll-mt-20" id="conversion-tables">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Complete UK to US GPA Conversion Tables</h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Understanding the UK grading system is crucial for US university applications. Unlike the US 4.0 GPA scale, UK universities use <span className="text-blue-600 font-semibold">percentage marks</span> and <span className="text-blue-600 font-semibold">degree classifications</span>. Here's the comprehensive conversion guide.
          </p>

          {/* Main Conversion Table */}
          <div className="overflow-x-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Bachelor's Degree Classifications</h3>
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">UK Percentage</th>
                  <th className="px-6 py-4 text-left font-bold">UK Classification</th>
                  <th className="px-6 py-4 text-left font-bold">US GPA (4.0 Scale)</th>
                  <th className="px-6 py-4 text-left font-bold">US Letter Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { percent: '90-100%', classification: 'First Class Honours (Exceptional)', gpa: '4.0', letter: 'A+' },
                  { percent: '80-89%', classification: 'First Class Honours (High)', gpa: '4.0', letter: 'A' },
                  { percent: '70-79%', classification: 'First Class Honours (1st)', gpa: '3.7-3.9', letter: 'A-', highlight: true },
                  { percent: '65-69%', classification: 'Upper Second (2:1) High', gpa: '3.3-3.6', letter: 'B+' },
                  { percent: '60-64%', classification: 'Upper Second (2:1)', gpa: '3.0-3.2', letter: 'B', highlight: true },
                  { percent: '55-59%', classification: 'Lower Second (2:2) High', gpa: '2.7-2.9', letter: 'B-' },
                  { percent: '50-54%', classification: 'Lower Second (2:2)', gpa: '2.3-2.6', letter: 'C+', highlight: true },
                  { percent: '45-49%', classification: 'Third Class Honours (3rd)', gpa: '2.0-2.2', letter: 'C' },
                  { percent: '40-44%', classification: 'Third Class/Pass', gpa: '1.7-1.9', letter: 'C-' },
                  { percent: '35-39%', classification: 'Ordinary Degree/Fail', gpa: '1.0-1.6', letter: 'D' },
                  { percent: '0-34%', classification: 'Fail', gpa: '0.0', letter: 'F' }
                ].map((row, idx) => (
                  <tr key={idx} className={`${row.highlight ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors duration-150`}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.percent}</td>
                    <td className="px-6 py-4 text-gray-700">{row.classification}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600">{row.gpa}</td>
                    <td className="px-6 py-4 text-gray-700">{row.letter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Important: Grading Standards Differ</h4>
                <p className="text-gray-700 leading-relaxed">
                  In the UK, marks above <strong>70% are exceptional</strong> and rare. A First Class Honours (70-100%) is considered equivalent to a 3.7-4.0 GPA in the US system. UK universities typically have stricter marking criteria, with 90%+ being almost impossible to achieve in humanities subjects.
                </p>
              </div>
            </div>
          </div>

          {/* Simplified Quick Reference */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { uk: 'First Class (70%+)', us: '3.7-4.0 GPA', desc: 'Excellent/Outstanding', color: 'from-yellow-400 to-amber-500' },
                { uk: '2:1 (60-69%)', us: '3.0-3.6 GPA', desc: 'Good/Above Average', color: 'from-blue-400 to-indigo-500' },
                { uk: '2:2 (50-59%)', us: '2.3-2.9 GPA', desc: 'Satisfactory/Average', color: 'from-green-400 to-emerald-500' },
                { uk: 'Third (40-49%)', us: '1.7-2.2 GPA', desc: 'Pass/Below Average', color: 'from-orange-400 to-red-500' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-500">
                  <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold mb-2 bg-gradient-to-r ${item.color}`}>
                    {item.uk}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{item.us}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* UK Grading System Explained */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 scroll-mt-20" id="uk-grading">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding the UK Grading System</h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            The UK uses a <span className="text-blue-600 font-semibold">classification system</span> rather than GPA for undergraduate degrees. Here's what each classification means and how UK universities award degrees.
          </p>

          {/* Classification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* First Class Honours */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300 shadow-md hover:shadow-xl transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">First Class Honours (1st)</h3>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">
                <strong className="text-yellow-700">70-100%</strong> - The highest undergraduate classification. Demonstrates exceptional understanding and original thinking. Required for competitive PhD programs and research positions.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="text-gray-700"><strong>US Equivalent:</strong> 3.7-4.0 GPA (A-/A/A+)</p>
                <p className="text-gray-700 mt-1"><strong>Typical:</strong> Top 15-20% of students</p>
              </div>
            </div>

            {/* Upper Second (2:1) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300 shadow-md hover:shadow-xl transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Upper Second (2:1)</h3>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">
                <strong className="text-blue-700">60-69%</strong> - Most common classification for successful students. Shows strong understanding and good analytical skills. Minimum requirement for most postgraduate programs and graduate jobs.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="text-gray-700"><strong>US Equivalent:</strong> 3.0-3.6 GPA (B/B+/A-)</p>
                <p className="text-gray-700 mt-1"><strong>Typical:</strong> 40-50% of students</p>
              </div>
            </div>

            {/* Lower Second (2:2) */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 shadow-md hover:shadow-xl transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Lower Second (2:2)</h3>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">
                <strong className="text-green-700">50-59%</strong> - Acceptable standard showing adequate understanding. Still qualifies for many jobs and some postgraduate programs (with relevant experience). Often called a "Desmond" (2:2).
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="text-gray-700"><strong>US Equivalent:</strong> 2.3-2.9 GPA (C+/B-/B)</p>
                <p className="text-gray-700 mt-1"><strong>Typical:</strong> 25-30% of students</p>
              </div>
            </div>

            {/* Third Class */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-300 shadow-md hover:shadow-xl transition-all duration-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Third Class (3rd)</h3>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed">
                <strong className="text-orange-700">40-49%</strong> - Pass degree but below typical expectations. Shows basic understanding but limited depth. May limit career and postgraduate opportunities. Rare classification (5-10% of students).
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="text-gray-700"><strong>US Equivalent:</strong> 1.7-2.2 GPA (C-/C/C+)</p>
                <p className="text-gray-700 mt-1"><strong>Typical:</strong> 5-10% of students</p>
              </div>
            </div>
          </div>

          {/* How UK Degrees Are Classified */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How UK Degrees Are Classified</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Weighted Averages</h4>
                  <p className="text-gray-700">Most UK universities weight final year modules more heavily (typically 40-50% of final degree), second year 30-40%, and first year 10-20% or not counted at all.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Borderline Classifications</h4>
                  <p className="text-gray-700">Students on classification boundaries (e.g., 68-69% for 2:1/1st) may be awarded the higher class if they have sufficient credits at that level or strong performance in final year.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Module Credits</h4>
                  <p className="text-gray-700">Each module has a credit value (typically 10-40 CATs). Your overall percentage is calculated by weighting each module mark by its credit value and year weighting.</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</span>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Dissertation Impact</h4>
                  <p className="text-gray-700">Final year dissertations/projects often carry 40-60 credits (double or triple a regular module) and can significantly impact your final classification.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Masters Classifications */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 scroll-mt-20" id="masters">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Masters Degree Classifications (Taught Programs)</h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            UK taught Masters programs (MA, MSc, LLM, MBA) use a different classification system than undergraduate degrees. Here's the breakdown and US GPA equivalents.
          </p>

          {/* Masters Conversion Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">UK Percentage</th>
                  <th className="px-6 py-4 text-left font-bold">Masters Classification</th>
                  <th className="px-6 py-4 text-left font-bold">US GPA (4.0 Scale)</th>
                  <th className="px-6 py-4 text-left font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { percent: '70-100%', classification: 'Distinction', gpa: '3.7-4.0 (A)', desc: 'Outstanding achievement, highest level', highlight: true },
                  { percent: '60-69%', classification: 'Merit', gpa: '3.3-3.6 (B+/A-)', desc: 'Very good performance, above average', highlight: true },
                  { percent: '50-59%', classification: 'Pass', gpa: '3.0-3.2 (B)', desc: 'Satisfactory completion, meets standards' },
                  { percent: '40-49%', classification: 'Fail (sometimes Pass)', gpa: '2.0-2.9 (C)', desc: 'Below standards, may need resits' },
                  { percent: '0-39%', classification: 'Fail', gpa: '0.0-1.9 (D/F)', desc: 'Does not meet program requirements' }
                ].map((row, idx) => (
                  <tr key={idx} className={`${row.highlight ? 'bg-purple-50' : 'hover:bg-gray-50'} transition-colors duration-150`}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.percent}</td>
                    <td className="px-6 py-4 font-bold text-purple-600">{row.classification}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.gpa}</td>
                    <td className="px-6 py-4 text-gray-700">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Masters Classification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
              <div className="text-4xl font-bold mb-2">Distinction</div>
              <div className="text-purple-100 text-lg mb-4">70%+</div>
              <p className="text-sm leading-relaxed">Equivalent to First Class Honours. Essential for PhD applications and academic careers. Typically 10-20% of Masters students achieve this.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-4xl font-bold mb-2">Merit</div>
              <div className="text-blue-100 text-lg mb-4">60-69%</div>
              <p className="text-sm leading-relaxed">Equivalent to 2:1. Good performance recognized by employers and PhD programs. Around 30-40% of Masters students achieve Merit.</p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <div className="text-4xl font-bold mb-2">Pass</div>
              <div className="text-green-100 text-lg mb-4">50-59%</div>
              <p className="text-sm leading-relaxed">Successful completion. No classification on degree certificate, but still a valid Masters degree. Most common outcome (40-50%).</p>
            </div>
          </div>

          {/* Important Note for Masters */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Masters Grading Notes</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Many UK Masters programs don't award Merit/Distinction classifications at all - only Pass/Fail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Dissertation typically worth 60 credits (half your Masters) and heavily weighted</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Some universities require 70%+ dissertation mark for Distinction even with 70%+ overall</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Research Masters (MRes, MPhil) typically don't use classifications - graded as Pass/Fail only</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Systems Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 scroll-mt-20" id="credits">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UK Credit Systems: CATs, ECTS, and US Credits</h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Understanding credit conversion is crucial for study abroad programs and US university transfer applications. Here's how UK CATs compare to European ECTS and US semester credits.
          </p>

          {/* Credit Conversion Table */}
          <div className="overflow-x-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Credit System Comparison</h3>
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">UK CATs</th>
                  <th className="px-6 py-4 text-left font-bold">ECTS Credits</th>
                  <th className="px-6 py-4 text-left font-bold">US Semester Hours</th>
                  <th className="px-6 py-4 text-left font-bold">Typical Module</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { cats: '10 CATs', ects: '5 ECTS', us: '2.5 credits', module: 'Small module/half course' },
                  { cats: '15 CATs', ects: '7.5 ECTS', us: '3-4 credits', module: 'Standard semester module', highlight: true },
                  { cats: '20 CATs', ects: '10 ECTS', us: '5 credits', module: 'Standard UK module', highlight: true },
                  { cats: '30 CATs', ects: '15 ECTS', us: '7.5 credits', module: 'Large module/double' },
                  { cats: '40 CATs', ects: '20 ECTS', us: '10 credits', module: 'Major project' },
                  { cats: '60 CATs', ects: '30 ECTS', us: '15 credits', module: 'Dissertation/thesis' },
                  { cats: '120 CATs', ects: '60 ECTS', us: '30 credits', module: 'Full academic year' }
                ].map((row, idx) => (
                  <tr key={idx} className={`${row.highlight ? 'bg-cyan-50' : 'hover:bg-gray-50'} transition-colors duration-150`}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.cats}</td>
                    <td className="px-6 py-4 text-gray-700">{row.ects}</td>
                    <td className="px-6 py-4 font-semibold text-blue-600">{row.us}</td>
                    <td className="px-6 py-4 text-gray-700">{row.module}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Credit System Explanation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">UK</span>
                CATs Credits
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>120 CATs</strong> per year (full-time)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>360 CATs</strong> for 3-year degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>180 CATs</strong> for Masters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Typical module: <strong>10-20 CATs</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>1 CAT = 10 study hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">EU</span>
                ECTS Credits
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>60 ECTS</strong> per year (full-time)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>180 ECTS</strong> for 3-year degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>90-120 ECTS</strong> for Masters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Typical course: <strong>5-10 ECTS</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>1 ECTS = 25-30 study hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">US</span>
                Semester Hours
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>30 credits</strong> per year (15/semester)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>120 credits</strong> for 4-year degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>30-60 credits</strong> for Masters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Typical course: <strong>3-4 credits</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>1 credit = 1 contact hour/week</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Conversion Formula */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Conversion Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold mb-2">UK CATs → US Credits:</p>
                <p className="text-2xl font-bold text-purple-600">CATs ÷ 2 = US Credits</p>
                <p className="text-sm mt-2 text-gray-600">Example: 20 CATs ÷ 2 = 10 US credits</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold mb-2">ECTS → US Credits:</p>
                <p className="text-2xl font-bold text-purple-600">ECTS ÷ 2 = US Credits</p>
                <p className="text-sm mt-2 text-gray-600">Example: 10 ECTS ÷ 2 = 5 US credits</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold mb-2">UK CATs → ECTS:</p>
                <p className="text-2xl font-bold text-purple-600">CATs ÷ 2 = ECTS</p>
                <p className="text-sm mt-2 text-gray-600">Example: 20 CATs ÷ 2 = 10 ECTS</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold mb-2">Full UK Year → US:</p>
                <p className="text-2xl font-bold text-purple-600">120 CATs = 60 US credits</p>
                <p className="text-sm mt-2 text-gray-600">Two full US semesters</p>
              </div>
            </div>
          </div>
        </div>

        {/* Russell Group vs Other UK Universities */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 scroll-mt-20" id="russell-group">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Russell Group vs Other UK Universities</h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            While all UK universities follow the same classification system, grading standards and expectations can vary. <span className="text-blue-600 font-semibold">Russell Group universities</span> (24 research-intensive institutions) often have more rigorous marking criteria.
          </p>

          {/* Russell Group Universities List */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">24</span>
              Russell Group Universities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'University of Oxford',
                'University of Cambridge',
                'Imperial College London',
                'University College London (UCL)',
                'London School of Economics (LSE)',
                'King\'s College London',
                'University of Edinburgh',
                'University of Manchester',
                'University of Bristol',
                'University of Warwick',
                'University of Glasgow',
                'University of Birmingham',
                'University of Leeds',
                'University of Sheffield',
                'University of Nottingham',
                'University of Southampton',
                'Newcastle University',
                'University of Liverpool',
                'Cardiff University',
                'Queen Mary University of London',
                'University of Exeter',
                'Durham University',
                'Queen\'s University Belfast',
                'University of York'
              ].map((uni, idx) => (
                <div key={idx} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700 text-sm font-medium">{uni}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grading Differences Table */}
          <div className="overflow-x-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Grading Standard Variations</h3>
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Aspect</th>
                  <th className="px-6 py-4 text-left font-bold">Oxbridge (Oxford/Cambridge)</th>
                  <th className="px-6 py-4 text-left font-bold">Russell Group</th>
                  <th className="px-6 py-4 text-left font-bold">Other Universities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { 
                    aspect: 'First Class Rate',
                    oxbridge: '25-35% (highly selective)',
                    russell: '20-30% typical',
                    other: '15-25% typical'
                  },
                  { 
                    aspect: 'Average Mark for 70%',
                    oxbridge: 'Very rare, exceptional work',
                    russell: 'Outstanding, original research',
                    other: 'Excellent performance'
                  },
                  { 
                    aspect: 'Grade Inflation',
                    oxbridge: 'Minimal, strict standards',
                    russell: 'Moderate controls',
                    other: 'Variable by institution'
                  },
                  { 
                    aspect: 'US GPA Perception',
                    oxbridge: '2:1 = 3.7+ GPA perception',
                    russell: '2:1 = 3.5+ GPA perception',
                    other: '2:1 = 3.3+ GPA perception'
                  },
                  { 
                    aspect: 'Marking Rigor',
                    oxbridge: 'Extremely strict',
                    russell: 'Very strict',
                    other: 'Standard UK criteria'
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.aspect}</td>
                    <td className="px-6 py-4 text-gray-700">{row.oxbridge}</td>
                    <td className="px-6 py-4 text-gray-700">{row.russell}</td>
                    <td className="px-6 py-4 text-gray-700">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* University Type Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-3">Oxbridge</h3>
              <p className="text-purple-100 text-sm mb-4">Oxford & Cambridge</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Tutorial/supervision system</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>80%+ extremely rare</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>2:1 highly competitive</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>International reputation boost</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-3">Russell Group</h3>
              <p className="text-blue-100 text-sm mb-4">24 Research Universities</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Research-focused teaching</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>75%+ rare but achievable</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Strong academic standards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Well-recognized globally</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-3">Other UK Unis</h3>
              <p className="text-green-100 text-sm mb-4">Modern & Post-92</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Practical, career-focused</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Higher marks more common</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Varied marking standards</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Strong regional reputation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Note on University Prestige */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">US Admissions Context Matters</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  When evaluating UK transcripts, US graduate schools and employers consider university prestige alongside grades:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span>A <strong>2:1 from Oxford/Cambridge</strong> may be viewed as equivalent to <strong>3.7-3.9 GPA</strong> from a top US university</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span>A <strong>First from a Russell Group</strong> university typically equals <strong>3.8-4.0 GPA</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span>Grades from less selective UK universities may be evaluated closer to the standard conversion (2:1 = 3.0-3.3)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span><strong>Always mention your university's ranking</strong> and prestige in US applications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 scroll-mt-20" id="faqs">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">What is a good UK degree classification for US graduate school?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For <strong>competitive US graduate programs</strong>, you typically need at least an <strong>Upper Second (2:1)</strong>, which converts to approximately <strong>3.0-3.6 GPA</strong>. A <strong>First Class Honours (70%+)</strong> is equivalent to <strong>3.7-4.0 GPA</strong> and makes you competitive for top programs. For PhD programs at Harvard, Stanford, MIT, etc., a First from a Russell Group university is usually expected, though a high 2:1 (67-69%) from Oxbridge may also be considered.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Why is 70% considered excellent in UK but only average in US?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The UK and US use fundamentally different grading philosophies. In the UK, <strong>marking criteria reserve 90-100% for "perfect" work</strong>, which is nearly impossible to achieve. The scale assumes room for improvement even at high levels. <strong>70-80% represents outstanding work</strong> that exceeds all learning objectives. In the US, <strong>90-100% (A) is expected</strong> for students who master the material. Think of UK 70% as "you've mastered everything and shown original thinking" versus US 90% as "you've mastered everything required."
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Do US universities understand UK degree classifications?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, most <strong>US graduate admissions offices are familiar</strong> with UK classifications, especially at top universities that regularly admit international students. However, <strong>you should still include an explanation</strong> in your application. Services like <strong>WES (World Education Services)</strong> or <strong>ECE (Educational Credential Evaluators)</strong> can provide official GPA conversions for a fee ($100-200). For <strong>competitive programs, also mention your university's ranking</strong> (e.g., "First Class Honours from Oxford, ranked #3 globally").
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Is a UK 2:2 (50-59%) accepted by US universities?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A <strong>Lower Second (2:2)</strong> converts to approximately <strong>2.3-2.9 GPA</strong>, which is below the typical <strong>3.0 minimum</strong> for most US graduate programs. However, <strong>it's not impossible</strong>. You can strengthen your application with: <strong>(1)</strong> Strong GRE/GMAT scores, <strong>(2)</strong> Relevant work experience (2-3+ years), <strong>(3)</strong> Research publications or professional achievements, <strong>(4)</strong> Compelling personal statement explaining circumstances, <strong>(5)</strong> Strong recommendation letters. Some <strong>less selective programs or professional Masters</strong> will accept 2:2 with experience.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">How do I convert UK credits (CATs) to US semester hours?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Use the formula: <strong>UK CATs ÷ 2 = US semester credits</strong>. For example, a <strong>20 CAT module = 10 US credits</strong>, and <strong>120 CATs per year = 60 US credits</strong> (two full semesters). UK undergraduate degrees are <strong>360 CATs total (3 years) = 180 US credits</strong>, while US Bachelor's degrees require <strong>120 credits over 4 years</strong>. For study abroad, most UK universities offer <strong>60 CATs per semester (30 US credits)</strong>. Always verify with your home university's study abroad office for official transfer credit policies.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between UK Honours and Ordinary degrees?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A <strong>UK Honours degree</strong> (BA Hons, BSc Hons) requires <strong>360 credits with 120 at Level 6 (final year)</strong> and is classified (1st, 2:1, 2:2, 3rd). An <strong>Ordinary degree</strong> has <strong>300 credits with no classification</strong> - just "Pass." Students who fail to meet Honours requirements (e.g., fail dissertation, don't complete enough Level 6 credits, or score 35-39% overall) receive an Ordinary degree. <strong>In US applications, Honours degrees are standard</strong> and expected. An Ordinary degree may raise questions and typically converts to <strong>2.0-2.5 GPA</strong>. Some Scottish universities offer 4-year Honours degrees.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Does Oxbridge grade differently than other UK universities?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes. <strong>Oxford and Cambridge have notoriously strict marking standards</strong>. Scores above <strong>80% are extremely rare</strong>, and <strong>75%+ is considered exceptional</strong>. The tutorial/supervision system involves one-on-one feedback from world experts, leading to harsher assessment. A <strong>2:1 (60-69%) from Oxbridge</strong> is often viewed by US admissions as equivalent to <strong>3.5-3.8 GPA from a top US school</strong>. Many Oxbridge graduates with 2:1 degrees successfully enter Harvard, Stanford, MIT PhD programs. <strong>Always contextualize your Oxbridge grades</strong> in applications by mentioning the university's grading rigor and your class ranking if available.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Can I get my UK degree converted to an official US GPA?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yes, through <strong>credential evaluation services</strong>. The most recognized are: <strong>(1) WES (World Education Services)</strong> - $205 course-by-course evaluation, <strong>(2) ECE (Educational Credential Evaluators)</strong> - $150-225, <strong>(3) SpanTran</strong> - $90-200. These services review your transcript and provide an <strong>official GPA calculation</strong> that US universities accept. The evaluation takes 2-4 weeks. <strong>For competitive programs, WES is most trusted</strong>. Note: These are <strong>estimates only</strong> - final admission decisions consider university prestige, grade context, and other factors beyond the numerical GPA.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 9 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">How do UK Masters classifications convert to US GPAs?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    UK taught Masters use three classifications: <strong>(1) Distinction (70%+) = 3.7-4.0 GPA</strong> - required for competitive PhD programs, <strong>(2) Merit (60-69%) = 3.3-3.6 GPA</strong> - acceptable for most US opportunities, <strong>(3) Pass (50-59%) = 3.0-3.2 GPA</strong> - meets minimum requirements. Note that <strong>many UK programs don't award Distinction/Merit</strong> at all - just Pass/Fail. <strong>For PhD applications to top US schools</strong>, you typically need Distinction or high Merit (65%+). <strong>Professional Masters (MBA, MPA)</strong> may have different standards and weight work experience more heavily than grades.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ 10 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Do US employers understand UK degree classifications?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>It varies significantly</strong>. Large multinational companies with UK operations (Google, Microsoft, McKinsey, Goldman Sachs) understand UK grades well. <strong>For smaller US companies, you should explain</strong>: "I graduated with First Class Honours (equivalent to 3.8-4.0 GPA), the highest undergraduate classification awarded to the top 20% of UK students." On your resume, you can write: <strong>"BA Economics, First Class Honours (equiv. 3.8 GPA)"</strong> or <strong>"BSc Computer Science, Upper Second Class Honours (equiv. 3.5 GPA)"</strong>. <strong>For professional roles, emphasize skills and experience</strong> over grades after your first job. Many US employers care more about your university's reputation (Oxford, Cambridge, LSE) than your exact classification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedTools 
          relatedSlugs={[
            'oxford-gpa-calculator',
            'cambridge-gpa-calculator',
            'imperial-college-gpa-calculator',
            'ucl-gpa-calculator',
            'lse-gpa-calculator',
            'edinburgh-gpa-calculator',
            'college-gpa-calculator',
            'graduate-school-gpa-calculator'
          ]}
          currentSlug="uk-gpa-system-guide"
          navigateTo={navigateTo}
        />
      </div>
    </div>
  );
};

export default UKGPAGuide;
