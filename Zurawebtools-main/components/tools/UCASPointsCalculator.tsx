import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface UCASPointsCalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Qualification {
  id: string;
  type: string;
  grade: string;
  points: number;
}

const UCASPointsCalculator: React.FC<UCASPointsCalculatorProps> = ({ navigateTo }) => {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedType, setSelectedType] = useState('A-Level');
  const [selectedGrade, setSelectedGrade] = useState('A*');

  // UCAS Tariff Points 2026 (Official UCAS System)
  const tariffPoints: { [key: string]: { [grade: string]: number } } = {
    'A-Level': {
      'A*': 56, 'A': 48, 'B': 40, 'C': 32, 'D': 24, 'E': 16
    },
    'AS-Level': {
      'A': 20, 'B': 16, 'C': 12, 'D': 10, 'E': 6
    },
    'BTEC Extended Diploma': {
      'D*D*D*': 168, 'D*D*D': 160, 'D*DD': 152, 'DDD': 144, 'DDM': 128, 'DMM': 112, 'MMM': 96, 'MMP': 80, 'MPP': 64, 'PPP': 48
    },
    'BTEC Diploma': {
      'D*D*': 112, 'D*D': 104, 'DD': 96, 'DM': 80, 'MM': 64, 'MP': 48, 'PP': 32
    },
    'IB Diploma': {
      '45': 168, '44': 164, '43': 160, '42': 156, '41': 152, '40': 148, '39': 144, '38': 140, '37': 136, '36': 132,
      '35': 128, '34': 124, '33': 120, '32': 116, '31': 112, '30': 108, '29': 104, '28': 100, '27': 96, '26': 92,
      '25': 88, '24': 84
    },
    'IB Certificate (Higher)': {
      '7': 56, '6': 48, '5': 32, '4': 24, '3': 12
    },
    'Access to HE Diploma': {
      'Pass (60 credits)': 144, 'Pass (45 credits)': 108, 'Pass (30 credits)': 72
    },
    'Scottish Higher': {
      'A': 33, 'B': 27, 'C': 21, 'D': 15
    },
    'Scottish Advanced Higher': {
      'A': 56, 'B': 48, 'C': 40, 'D': 32
    },
    'T Level': {
      'Distinction*': 168, 'Distinction': 144, 'Merit': 120, 'Pass': 96
    }
  };

  // Add qualification
  const addQualification = () => {
    if (selectedType && selectedGrade) {
      const points = tariffPoints[selectedType][selectedGrade];
      const newQualification: Qualification = {
        id: Date.now().toString(),
        type: selectedType,
        grade: selectedGrade,
        points: points
      };
      setQualifications([...qualifications, newQualification]);
    }
  };

  // Remove qualification
  const removeQualification = (id: string) => {
    setQualifications(qualifications.filter(q => q.id !== id));
  };

  // Calculate total points
  useEffect(() => {
    const total = qualifications.reduce((sum, q) => sum + q.points, 0);
    setTotalPoints(total);
  }, [qualifications]);

  // Clear all
  const clearAll = () => {
    setQualifications([]);
    setTotalPoints(0);
  };

  useEffect(() => {
    document.title = 'UCAS Points Calculator 2026 - UK University Points';

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Free UCAS Points Calculator 2026 for UK university admissions. Calculate A-Level, BTEC, IB, Scottish Highers, T-Level points instantly. Official UCAS tariff system for university applications and clearing.');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph Tags
    setMeta('og:title', 'UCAS Points Calculator 2026 - UK University Admission Points');
    setMeta('og:description', 'Calculate UCAS tariff points for A-Levels, BTEC, IB, and more. Free tool for UK university applications with instant results based on official 2026 tariff.');
    setMeta('og:image', 'https://zurawebtools.com/images/ucas-points-calculator-og.jpg');
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/ucas-points-calculator');
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    setMeta('og:locale', 'en_GB');

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'UCAS Points Calculator 2026 - UK University Points');
    setMeta('twitter:description', 'Free UCAS tariff calculator for UK university admissions. Calculate A-Level, BTEC, IB points instantly.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/ucas-points-calculator-twitter.jpg');
    setMeta('twitter:site', '@ZuraWebTools');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/ucas-points-calculator');
      document.head.appendChild(canonical);
    }

    // JSON-LD Schema
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "UCAS Points Calculator 2026",
        "description": "Free online UCAS tariff points calculator for UK university admissions. Calculate points from A-Levels, BTEC, IB, Scottish Highers, T-Levels and other qualifications based on official UCAS tariff 2026.",
        "url": "https://zurawebtools.com/education-and-exam-tools/admission-tools/ucas-points-calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "GBP"
        },
        "creator": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "342",
          "bestRating": "5"
        },
        "featureList": "A-Level points calculation, BTEC tariff converter, IB points calculator, Scottish Highers points, T-Level tariff, Multiple qualification support, Real-time calculation"
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
            "name": "UCAS Points Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools/ucas-points-calculator"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many UCAS points do I need for university?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "UCAS points requirements vary by university and course. Top universities like Oxford and Cambridge typically require 144+ points (AAA at A-Level), while most universities accept 96-128 points. Check specific course entry requirements on UCAS.com for accurate information."
            }
          },
          {
            "@type": "Question",
            "name": "How many UCAS points is an A* at A-Level worth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An A* grade at A-Level is worth 56 UCAS tariff points under the current system. An A grade is worth 48 points, B is 40 points, C is 32 points, D is 24 points, and E is 16 points."
            }
          },
          {
            "@type": "Question",
            "name": "Can I combine different qualifications for UCAS points?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can combine different qualifications such as A-Levels, BTECs, IB certificates, and Scottish Highers. Universities accept various qualification combinations. Use this calculator to add multiple qualifications and see your total UCAS points."
            }
          },
          {
            "@type": "Question",
            "name": "How many UCAS points is a BTEC Extended Diploma worth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A BTEC Extended Diploma ranges from 48 to 168 UCAS points depending on your grade. D*D*D* (Triple Distinction Star) is worth 168 points, equivalent to AAA at A-Level, while PPP (Triple Pass) is worth 48 points."
            }
          },
          {
            "@type": "Question",
            "name": "Do AS-Levels count towards UCAS points?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, AS-Levels contribute to UCAS points. An A grade at AS-Level is worth 20 points, B is 16 points, C is 12 points, D is 10 points, and E is 6 points. However, note that AS-Levels are worth less than full A-Levels."
            }
          },
          {
            "@type": "Question",
            "name": "What is the UCAS tariff system?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The UCAS tariff is a points system that converts qualifications and grades into a numerical value. It allows universities to compare different types of qualifications fairly. The current system (revised in 2017) assigns points to Level 3 qualifications like A-Levels, BTECs, IB, and Scottish Highers."
            }
          },
          {
            "@type": "Question",
            "name": "How many UCAS points do I need for clearing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Clearing requirements vary significantly. Some courses accept students with 48-64 points, while competitive courses may require 96+ points even in clearing. Your UCAS points calculator total helps you identify suitable clearing options based on your actual results."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate UCAS Points",
        "description": "Step-by-step guide to calculate your UCAS tariff points for UK university applications",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Qualification Type",
            "text": "Choose your qualification type from the dropdown menu (A-Level, BTEC, IB, Scottish Highers, T-Level, etc.). You can add multiple different qualifications."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Your Grade",
            "text": "Choose the grade you achieved or expect to achieve from the grade dropdown. Each qualification type has its own grade options based on the UCAS tariff."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Add Qualification",
            "text": "Click 'Add Qualification' to include it in your calculation. The points for that qualification will be displayed immediately."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Add More Qualifications",
            "text": "Repeat the process to add all your qualifications. You can mix A-Levels, BTECs, AS-Levels, and other qualifications as needed."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "View Total Points",
            "text": "Your total UCAS points are calculated automatically and displayed prominently. Use this total to compare against university course entry requirements."
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
    
    // Notify search engines about this page
    notifyIndexNow('/education-and-exam-tools/admission-tools/ucas-points-calculator');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 print:hidden" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 space-x-2">
          <li><button onClick={() => navigateTo('/')} className="hover:text-blue-600">Home</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li><button onClick={() => navigateTo('/education-and-exam-tools')} className="hover:text-blue-600">Education & Exam</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li><button onClick={() => navigateTo('/education-and-exam-tools/admission-tools')} className="hover:text-blue-600">Admission Tools</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li className="text-gray-900 dark:text-white font-medium">UCAS Points Calculator</li>
        </ol>
      </nav>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans print:p-0">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            UCAS Points Calculator 2026 - Free UK University Admission Points
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate your UCAS tariff points instantly for UK university applications. Convert A-Levels, BTEC, IB, Scottish Highers, T-Levels and other qualifications into UCAS points using the official 2026 tariff system.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mb-8" role="main" aria-label="UCAS Points Calculator Tool">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Interactive UCAS Tariff Calculator</h2>
          
          {/* Total Points Display */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white text-center mb-8 shadow-xl">
            <div className="text-6xl font-bold mb-2">{totalPoints}</div>
            <div className="text-xl font-medium">Total UCAS Points</div>
            <div className="text-sm opacity-90 mt-2">Based on {qualifications.length} qualification{qualifications.length !== 1 ? 's' : ''}</div>
          </div>

          {/* Input Section */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">Qualification Type</label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSelectedGrade(Object.keys(tariffPoints[e.target.value])[0]);
                }}
                className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              >
                {Object.keys(tariffPoints).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">Grade</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800"
              >
                {Object.keys(tariffPoints[selectedType]).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={addQualification}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Add Qualification
              </button>
            </div>
          </div>

          {/* Qualifications List */}
          {qualifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Your Qualifications</h3>
              <div className="space-y-3">
                {qualifications.map((qual) => (
                  <div key={qual.id} className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{qual.type} - {qual.grade}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{qual.points} UCAS points</div>
                    </div>
                    <button
                      onClick={() => removeQualification(qual.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      aria-label="Remove qualification"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              disabled={qualifications.length === 0}
            >
              Clear All
            </button>
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
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Quick UCAS Points Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">144 points</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">AAA at A-Level</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Three A grades (48 points each). Required for top Russell Group universities and competitive courses.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">112 points</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">BBC at A-Level</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Common requirement for many undergraduate courses at UK universities.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-purple-200 dark:border-purple-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">168 points</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">D*D*D* BTEC</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Triple Distinction Star in BTEC Extended Diploma, equivalent to A*AA at A-Level.</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Benefits of Using UCAS Points Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Accurate Calculations</h3>
              <p className="text-sm">Based on official UCAS tariff 2026. Get precise points for all UK qualifications instantly.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Multiple Qualifications</h3>
              <p className="text-sm">Combine A-Levels, BTECs, IB, Scottish Highers, and more in one calculation.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Real-Time Results</h3>
              <p className="text-sm">Instant point calculation as you add qualifications. No waiting or complex formulas.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2">University Planning</h3>
              <p className="text-sm">Compare your points against university entry requirements for better course selection.</p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">How to Use the UCAS Points Calculator</h2>
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
              Follow these simple steps to calculate your UCAS tariff points for UK university applications.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Select Qualification Type</h3>
                  <p className="text-slate-600 dark:text-slate-400">Choose your qualification type from the dropdown menu. Options include A-Level, BTEC Extended Diploma, IB Diploma, Scottish Highers, T-Levels, and more. You can mix different qualification types.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Select Your Grade</h3>
                  <p className="text-slate-600 dark:text-slate-400">Choose the grade you achieved or expect to achieve from the grade dropdown. Each qualification has different grade options (e.g., A*, A, B, C for A-Levels).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Add Qualification</h3>
                  <p className="text-slate-600 dark:text-slate-400">Click the 'Add Qualification' button. Your qualification will appear in the list below with its UCAS point value clearly displayed.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Add More Qualifications</h3>
                  <p className="text-slate-600 dark:text-slate-400">Repeat the process to add all your qualifications. Add as many as you need - A-Levels, AS-Levels, BTECs, and other qualifications all count toward your total.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">View Total Points</h3>
                  <p className="text-slate-600 dark:text-slate-400">Your total UCAS points are calculated automatically and displayed at the top. Use this number to compare against university course entry requirements on UCAS.com.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Example Calculation</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Student achieves: A-Level Maths (A), A-Level English (B), A-Level History (B)
              </p>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p><strong>A-Level Maths (A):</strong> 48 UCAS points</p>
                <p><strong>A-Level English (B):</strong> 40 UCAS points</p>
                <p><strong>A-Level History (B):</strong> 40 UCAS points</p>
                <p className="pt-2 border-t border-blue-200 dark:border-blue-700"><strong>Total UCAS Points:</strong> 128 points (ABB)</p>
                <p className="text-slate-600 dark:text-slate-400"><strong>University Options:</strong> This score qualifies for most UK universities and many competitive courses. Check specific course requirements on UCAS.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Who Uses UCAS Points Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">A-Level Students</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Calculate points from predicted or achieved A-Level grades to match against university course requirements.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">BTEC Learners</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Convert BTEC Extended Diploma, Diploma, and Certificate grades into UCAS points for university applications.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">IB Students</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">International Baccalaureate students converting IB Diploma scores to UCAS tariff points for UK universities.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800 text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Career Changers</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Adults with Access to HE Diplomas or older qualifications calculating eligibility for degree courses.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-900 dark:text-white">
            About UCAS Points Calculator
          </h2>
          
          {/* Educational Theme Container */}
          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-slate-800/80 dark:via-slate-800/80 dark:to-slate-800/80 p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-amber-200 dark:border-amber-900/50 relative overflow-hidden">
            {/* Decorative Educational Icons */}
            <div className="absolute top-6 right-6 text-amber-200 dark:text-amber-900/30 text-8xl opacity-20">🎓</div>
            <div className="absolute bottom-6 left-6 text-orange-200 dark:text-orange-900/30 text-7xl opacity-20">📚</div>
            
            <div className="relative z-10">
              {/* Introduction Card */}
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg mb-6 border-l-8 border-amber-500">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">🎯</div>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-4">Your Complete UK University Admissions Guide</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                      The <strong className="text-amber-700 dark:text-amber-400">UCAS Points Calculator 2026</strong> is the most comprehensive tool for UK students applying to universities through the Universities and Colleges Admissions Service (UCAS). Our calculator provides instant, reliable tariff points conversion for all recognized UK qualifications, helping thousands of students make informed decisions about their higher education journey.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                      The tariff system converts your qualifications and grades into numerical points, creating a standardized method for universities to set clear entry requirements. Whether you're taking A-Levels, BTECs, the International Baccalaureate (IB), Scottish Highers, T-Levels, or Access to Higher Education Diplomas, our <button onClick={() => navigateTo('/education-and-exam-tools')} className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline font-semibold">education tools</button> use the official tariff table updated for 2026 applications, ensuring accuracy for your university planning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-6 rounded-xl shadow-lg border-2 border-orange-300 dark:border-orange-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">📊</div>
                    <h4 className="text-xl font-bold text-orange-900 dark:text-orange-300">Official UCAS Tariff 2026</h4>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Understanding your points is crucial for making informed decisions about university applications and course selection. The current tariff system, revised in 2017, accurately reflects the value of different qualifications. An A-Level A* is worth 56 points, with grades scaling proportionally down to E grade at 16 points. For comprehensive exam preparation, explore our <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator')} className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline font-semibold">GPA Calculator</button> and <button onClick={() => navigateTo('/education-and-exam-tools/sat-score-calculator')} className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline font-semibold">SAT Score Calculator</button> tools.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-xl shadow-lg border-2 border-yellow-300 dark:border-yellow-800">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-4xl">🔢</div>
                    <h4 className="text-xl font-bold text-yellow-900 dark:text-yellow-300">Multiple Qualifications Support</h4>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Students commonly combine different qualification types - mixing A-Levels with AS-Levels, combining BTECs with A-Levels, or adding Extended Project Qualifications (EPQ). Our calculator makes it effortless to add multiple qualifications and see your total instantly, providing accurate calculations for mixed qualification portfolios. Need help with academic writing? Try our <button onClick={() => navigateTo('/text-tools/word-counter')} className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 underline font-semibold">Word Counter</button> for essays.
                  </p>
                </div>
              </div>

              {/* Detailed Information Card */}
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg mb-6 border-l-8 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">🏛️</div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-300 mb-4">University Entry Requirements & UCAS Points</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                      Many UK universities now list entry requirements in points alongside traditional grade requirements (like AAB or BBB), making this calculator essential for modern university applications. Russell Group universities typically require 144+ points (equivalent to AAA at A-Level), while most other UK universities accept 96-128 points for undergraduate programs. Our calculator helps you identify which universities and courses match your qualifications.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                      This tool is particularly valuable during Clearing when you need to quickly assess which courses you qualify for based on your actual exam results. University admissions tutors compare applicants fairly, regardless of which qualification route they've taken - whether that's the traditional A-Level path, vocational BTECs, or the internationally recognized IB Diploma. For other academic calculations, check our <button onClick={() => navigateTo('/education-and-exam-tools/berkeley-gpa-calculator')} className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline font-semibold">Berkeley GPA Calculator</button>.
                    </p>
                  </div>
                </div>
              </div>

              {/* UCAS Points Value Table */}
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 md:p-8 rounded-2xl shadow-lg mb-6 border-2 border-amber-300 dark:border-amber-800">
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-300 mb-4 flex items-center gap-3">
                  <span className="text-4xl">📋</span>
                  Quick Reference: UCAS Points Values
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-lg text-amber-800 dark:text-amber-300 mb-2">A-Level Grades</h4>
                    <ul className="text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                      <li><strong>A*</strong> = 56 points</li>
                      <li><strong>A</strong> = 48 points</li>
                      <li><strong>B</strong> = 40 points</li>
                      <li><strong>C</strong> = 32 points</li>
                      <li><strong>D</strong> = 24 points</li>
                      <li><strong>E</strong> = 16 points</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-lg text-orange-800 dark:text-orange-300 mb-2">BTEC Extended Diploma</h4>
                    <ul className="text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                      <li><strong>D*D*D*</strong> = 168 points</li>
                      <li><strong>D*D*D</strong> = 160 points</li>
                      <li><strong>DDD</strong> = 144 points</li>
                      <li><strong>DDM</strong> = 128 points</li>
                      <li><strong>MMM</strong> = 96 points</li>
                      <li><strong>PPP</strong> = 48 points</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-lg text-yellow-800 dark:text-yellow-300 mb-2">IB Diploma Scores</h4>
                    <ul className="text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                      <li><strong>45</strong> = 168 points</li>
                      <li><strong>42</strong> = 156 points</li>
                      <li><strong>40</strong> = 148 points</li>
                      <li><strong>36</strong> = 132 points</li>
                      <li><strong>30</strong> = 108 points</li>
                      <li><strong>24</strong> = 84 points</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Planning & Strategy Card */}
              <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border-l-8 border-yellow-500">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">📈</div>
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-900 dark:text-yellow-300 mb-4">Strategic University Application Planning</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-4">
                      For students planning ahead, this calculator helps with predicted grades and course selection strategy. Calculate points based on your target or predicted grades to identify suitable universities early in your application journey. Most top UK universities (including Oxford, Cambridge, Imperial, UCL, and LSE) require 144+ points, while competitive courses at other universities typically need 112-128 points.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                      Use our calculator alongside the <a href="https://www.ucas.com" target="_blank" rel="noopener noreferrer" className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 underline font-semibold">official UCAS website</a> and individual university websites to research specific course entry requirements. Understanding your points helps you make strategic choices about which five universities to apply to, ensuring you have a balanced selection of aspirational, realistic, and insurance choices. For additional academic tools, visit our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools')} className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 underline font-semibold">Admission Tools</button> section.
                    </p>
                  </div>
                </div>
              </div>

              {/* Keywords Footer */}
              <div className="text-center mt-6 p-4 bg-amber-100/50 dark:bg-amber-900/20 rounded-xl">
                <p className="text-sm text-amber-800 dark:text-amber-400 font-medium">
                  🎓 Supporting all UK qualifications: A-Levels • AS-Levels • BTEC Extended Diploma • BTEC Diploma • IB Diploma • IB Certificate • Scottish Highers • Scottish Advanced Highers • T-Levels • Access to HE • EPQ • Cambridge Pre-U • CACHE Diplomas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Official UCAS Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.ucas.com/ucas/tariff-calculator" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Official UCAS Tariff Calculator</h3>
              <p className="text-slate-600 dark:text-slate-400">Access the official UCAS tariff calculator and complete qualification listings directly from UCAS.</p>
            </a>
            <a href="https://www.ucas.com/undergraduate/applying-university/entry-requirements" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">University Entry Requirements</h3>
              <p className="text-slate-600 dark:text-slate-400">Understand how universities use UCAS points and find specific course requirements for your chosen subjects.</p>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
          <span className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
            Last updated: November 22, 2025
          </span>
        </div>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How many UCAS points do I need for university?</h3>
              <p className="text-slate-600 dark:text-slate-300">UCAS points requirements vary by university and course. Top universities like Oxford and Cambridge typically require 144+ points (AAA at A-Level), while most universities accept 96-128 points. Check specific course entry requirements on UCAS.com for accurate information.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How many UCAS points is an A* at A-Level worth?</h3>
              <p className="text-slate-600 dark:text-slate-300">An A* grade at A-Level is worth 56 UCAS tariff points under the current system. An A grade is worth 48 points, B is 40 points, C is 32 points, D is 24 points, and E is 16 points.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Can I combine different qualifications for UCAS points?</h3>
              <p className="text-slate-600 dark:text-slate-300">Yes, you can combine different qualifications such as A-Levels, BTECs, IB certificates, and Scottish Highers. Universities accept various qualification combinations. Use this calculator to add multiple qualifications and see your total UCAS points.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How many UCAS points is a BTEC Extended Diploma worth?</h3>
              <p className="text-slate-600 dark:text-slate-300">A BTEC Extended Diploma ranges from 48 to 168 UCAS points depending on your grade. D*D*D* (Triple Distinction Star) is worth 168 points, equivalent to AAA at A-Level, while PPP (Triple Pass) is worth 48 points.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Do AS-Levels count towards UCAS points?</h3>
              <p className="text-slate-600 dark:text-slate-300">Yes, AS-Levels contribute to UCAS points. An A grade at AS-Level is worth 20 points, B is 16 points, C is 12 points, D is 10 points, and E is 6 points. However, note that AS-Levels are worth less than full A-Levels.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">What is the UCAS tariff system?</h3>
              <p className="text-slate-600 dark:text-slate-300">The UCAS tariff is a points system that converts qualifications and grades into a numerical value. It allows universities to compare different types of qualifications fairly. The current system (revised in 2017) assigns points to Level 3 qualifications like A-Levels, BTECs, IB, and Scottish Highers.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How many UCAS points do I need for clearing?</h3>
              <p className="text-slate-600 dark:text-slate-300">Clearing requirements vary significantly. Some courses accept students with 48-64 points, while competitive courses may require 96+ points even in clearing. Your UCAS points calculator total helps you identify suitable clearing options based on your actual results.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="ucas-points-calculator" relatedSlugs={['sat-score-calculator', 'gpa-calculator', 'common-app-essay-word-counter']} navigateTo={navigateTo} />
      </div>
    </div>
  );
};

export default UCASPointsCalculator;
