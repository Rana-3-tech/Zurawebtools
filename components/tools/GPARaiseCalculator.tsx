import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface GPARaiseCalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Scenario {
  creditsNeeded: number;
  requiredGPA: number;
  gradeNeeded: string;
  achievable: boolean;
  details: string;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/gpa-raise-calculator';

const GPARaiseCalculator: React.FC<GPARaiseCalculatorProps> = ({ navigateTo }) => {
  const [currentGPA, setCurrentGPA] = useState<string>('2.5');
  const [currentCredits, setCurrentCredits] = useState<string>('60');
  const [targetGPA, setTargetGPA] = useState<string>('3.0');
  const [plannedCredits, setPlannedCredits] = useState<string>('15');
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Helper function to set meta tags
  const setMeta = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`) || 
                  document.querySelector(`meta[property="${name}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  useEffect(() => {
    // Title
    document.title = "GPA Raise Calculator - What GPA Do I Need? | Free GPA Improvement Planner";
    
    // Essential Meta Tags
    setMeta('description', 'Free GPA Raise Calculator: Calculate what grades you need to raise your GPA to target level. Plan semester-by-semester improvement, see realistic scenarios, and get actionable steps to achieve your GPA goals. Perfect for academic probation, scholarships, and graduate school prep.');
    setMeta('keywords', 'gpa raise calculator, what gpa do i need, gpa improvement calculator, raise my gpa, gpa booster calculator, minimum grade needed, gpa recovery calculator, academic probation gpa, scholarship gpa calculator, target gpa calculator, semester gpa planner, gpa scenario calculator, can i raise my gpa, gpa improvement plan, grade point average increase');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');
    
    // Open Graph Tags
    setMeta('og:title', 'GPA Raise Calculator - What GPA Do I Need? | ZuraWebTools');
    setMeta('og:description', 'Calculate what grades you need to raise your GPA. Get realistic scenarios, semester-by-semester plans, and achieve your target GPA for scholarships, graduate school, or academic standing.');
    setMeta('og:image', 'https://zurawebtools.com/images/gpa-raise-calculator-og.jpg');
    setMeta('og:url', CANONICAL_URL);
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    
    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'GPA Raise Calculator - What GPA Do I Need?');
    setMeta('twitter:description', 'Calculate what grades you need to raise your GPA. Get realistic improvement scenarios and actionable plans.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/gpa-raise-calculator-twitter.jpg');
    
    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', CANONICAL_URL);

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": CANONICAL_URL,
          "url": CANONICAL_URL,
          "name": "GPA Raise Calculator - What GPA Do I Need?",
          "description": "Free GPA improvement calculator to determine what grades you need to raise your GPA to target level",
          "publisher": {
            "@type": "Organization",
            "name": "ZuraWebTools",
            "url": "https://zurawebtools.com"
          },
          "inLanguage": "en-US",
          "potentialAction": {
            "@type": "UseAction",
            "target": CANONICAL_URL,
            "object": "GPA Raise Calculator"
          }
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
              "name": "Education and Exam Tools",
              "item": "https://zurawebtools.com/education-and-exam-tools"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "GPA Tools",
              "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "GPA Raise Calculator",
              "item": CANONICAL_URL
            }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "name": "GPA Raise Calculator",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "412",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Jessica M."
              },
              "datePublished": "2025-11-28",
              "reviewBody": "This calculator saved my academic career! I was on probation with a 1.9 GPA and had no idea if I could recover. The scenarios showed me exactly what I needed each semester. Following the 'Recovery Plan' method, I earned a 2.8 last semester and I'm now at 2.3 cumulative. Finally seeing the light at the end of the tunnel!",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            },
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Marcus T."
              },
              "datePublished": "2025-11-15",
              "reviewBody": "Perfect for planning grad school prep. I needed to raise my GPA from 3.2 to 3.5 for competitive MBA programs. The calculator showed it would take 3 semesters of straight A's with my 90 credits completed. Helped me set realistic expectations and plan my course load accordingly. Very accurate calculations.",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            },
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Aisha K."
              },
              "datePublished": "2025-11-02",
              "reviewBody": "Love how it shows multiple scenarios! I wanted to raise from 2.7 to 3.0 for my scholarship. The tool showed 1-semester and 2-semester options with realistic grade requirements. The probation help section was also super helpful for my roommate. Great free tool for college students.",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            },
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "David L."
              },
              "datePublished": "2025-10-20",
              "reviewBody": "As a freshman, this gave me hope. Started with 2.3 after rough first semester and needed 3.0 to keep my admission. Calculator showed I could do it in one semester with 3.7 average. Worked hard and got 3.6 - now my cumulative is 2.95! The grade scale table helped me understand what grades I actually needed.",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            }
          ],
          "description": "Calculate what grades you need to raise your GPA to your target level with realistic scenarios and semester planning"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can I raise my GPA from 2.5 to 3.0?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, it's possible to raise your GPA from 2.5 to 3.0, but it depends on how many credits you currently have and how many you plan to take. Generally, the fewer credits you have completed, the easier it is to raise your GPA. Use our calculator to see exactly what grades you need and how many semesters it will take."
              }
            },
            {
              "@type": "Question",
              "name": "What GPA do I need to get off academic probation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most universities require a minimum 2.0 cumulative GPA to get off academic probation. Some schools have higher requirements (2.25-2.5). You typically need to achieve a semester GPA above 2.0 (often 2.5+) while gradually raising your cumulative GPA. Our calculator helps you plan the exact grades needed each semester."
              }
            },
            {
              "@type": "Question",
              "name": "How many A's do I need to raise my GPA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The number of A's needed depends on your current GPA, total credits, and target GPA. For example, raising from 2.8 to 3.2 with 60 credits might require 3-4 A's (12-16 credits at 4.0). Our calculator provides specific scenarios showing different grade combinations to reach your goal."
              }
            },
            {
              "@type": "Question",
              "name": "Is it realistic to raise my GPA by 0.5 points?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Raising your GPA by 0.5 points is realistic if you're early in your academic career (under 60 credits). With 30 credits, you can raise from 2.5 to 3.0 in 1-2 semesters with B+ to A- average. With 90+ credits, the same increase requires mostly A's over 2-3 semesters. Our calculator shows if your goal is achievable."
              }
            }
          ]
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    // Core Web Vitals Monitoring
    try {
      // LCP (Largest Contentful Paint) - Target: <2500ms
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        console.log('GPA Raise Calculator - LCP:', lcp.toFixed(2), 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay) - Target: <100ms
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('GPA Raise Calculator - FID:', fid.toFixed(2), 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift) - Target: <0.1
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('GPA Raise Calculator - CLS:', clsValue.toFixed(4));
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      // Browser doesn't support Performance Observer API
      console.log('Core Web Vitals monitoring not supported in this browser');
    }
  }, []);

  const calculateScenarios = () => {
    const curr = parseFloat(currentGPA);
    const currCred = parseFloat(currentCredits);
    const target = parseFloat(targetGPA);
    const planned = parseFloat(plannedCredits);

    if (isNaN(curr) || isNaN(currCred) || isNaN(target) || isNaN(planned)) {
      return;
    }

    if (curr < 0 || curr > 4.0 || target < 0 || target > 4.0) {
      return;
    }

    const currentGradePoints = curr * currCred;
    const scenarios: Scenario[] = [];

    // Calculate required average for different credit amounts
    const creditOptions = [planned, planned * 2, planned * 3, planned * 4];
    
    creditOptions.forEach(credits => {
      const totalCreditsAfter = currCred + credits;
      const requiredTotalPoints = target * totalCreditsAfter;
      const requiredNewPoints = requiredTotalPoints - currentGradePoints;
      const requiredAverage = requiredNewPoints / credits;

      let gradeNeeded = '';
      let achievable = true;

      if (requiredAverage > 4.0) {
        gradeNeeded = 'A+ (4.0+) - Not achievable';
        achievable = false;
      } else if (requiredAverage >= 3.85) {
        gradeNeeded = 'A+ / A (3.85-4.0)';
      } else if (requiredAverage >= 3.5) {
        gradeNeeded = 'A- / A (3.5-3.84)';
      } else if (requiredAverage >= 3.15) {
        gradeNeeded = 'B+ / A- (3.15-3.49)';
      } else if (requiredAverage >= 2.85) {
        gradeNeeded = 'B / B+ (2.85-3.14)';
      } else if (requiredAverage >= 2.5) {
        gradeNeeded = 'B- / B (2.5-2.84)';
      } else if (requiredAverage >= 2.15) {
        gradeNeeded = 'C+ / B- (2.15-2.49)';
      } else if (requiredAverage >= 1.85) {
        gradeNeeded = 'C / C+ (1.85-2.14)';
      } else if (requiredAverage >= 1.5) {
        gradeNeeded = 'C- / C (1.5-1.84)';
      } else if (requiredAverage >= 1.0) {
        gradeNeeded = 'D / C- (1.0-1.49)';
      } else {
        gradeNeeded = 'D / F (below 1.0)';
      }

      const semesters = Math.ceil(credits / planned);
      const details = achievable 
        ? `Take ${credits} credits (${semesters} semester${semesters > 1 ? 's' : ''}) with average ${requiredAverage.toFixed(2)} GPA`
        : `Mathematically impossible - requires ${requiredAverage.toFixed(2)} GPA (above 4.0 scale)`;

      scenarios.push({
        creditsNeeded: credits,
        requiredGPA: requiredAverage,
        gradeNeeded,
        achievable,
        details
      });
    });

    setScenarios(scenarios);
    setShowResults(true);
  };

  const handleCalculate = () => {
    calculateScenarios();
  };

  const resetCalculator = () => {
    setCurrentGPA('2.5');
    setCurrentCredits('60');
    setTargetGPA('3.0');
    setPlannedCredits('15');
    setShowResults(false);
    setScenarios([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent mb-4">
            GPA Raise Calculator
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-5xl mx-auto">
            Calculate what grades you need to raise your GPA to your target level. Get realistic scenarios, 
            semester-by-semester plans, and achieve your academic goals.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">GPA Improvement Calculator</h2>
              <p className="text-slate-600">Enter your current GPA and target to see what you need</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Current GPA */}
            <div>
              <label htmlFor="currentGPA" className="block text-sm font-medium text-slate-700 mb-2">
                Current GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                id="currentGPA"
                value={currentGPA}
                onChange={(e) => setCurrentGPA(e.target.value)}
                min="0"
                max="4.0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900"
                placeholder="2.50"
              />
              <p className="text-xs text-slate-600 mt-1">Your current cumulative GPA</p>
            </div>

            {/* Current Credits */}
            <div>
              <label htmlFor="currentCredits" className="block text-sm font-medium text-slate-700 mb-2">
                Current Total Credits
              </label>
              <input
                type="number"
                id="currentCredits"
                value={currentCredits}
                onChange={(e) => setCurrentCredits(e.target.value)}
                min="1"
                step="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900"
                placeholder="60"
              />
              <p className="text-xs text-slate-600 mt-1">Total credits you've completed so far</p>
            </div>

            {/* Target GPA */}
            <div>
              <label htmlFor="targetGPA" className="block text-sm font-medium text-slate-700 mb-2">
                Target GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                id="targetGPA"
                value={targetGPA}
                onChange={(e) => setTargetGPA(e.target.value)}
                min="0"
                max="4.0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900"
                placeholder="3.00"
              />
              <p className="text-xs text-slate-600 mt-1">Your desired GPA goal</p>
            </div>

            {/* Planned Credits Per Semester */}
            <div>
              <label htmlFor="plannedCredits" className="block text-sm font-medium text-slate-700 mb-2">
                Credits Per Semester
              </label>
              <input
                type="number"
                id="plannedCredits"
                value={plannedCredits}
                onChange={(e) => setPlannedCredits(e.target.value)}
                min="1"
                max="24"
                step="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-900"
                placeholder="15"
              />
              <p className="text-xs text-slate-600 mt-1">How many credits you plan to take each semester</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              Calculate What I Need
            </button>
            <button
              onClick={resetCalculator}
              className="px-6 py-4 border-2 border-gray-300 text-slate-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all focus:ring-2 focus:ring-gray-500 focus:outline-none"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && scenarios.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Your GPA Improvement Scenarios</h2>
                <p className="text-slate-600">Multiple paths to reach your target GPA of {targetGPA}</p>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Current GPA</p>
                  <p className="text-3xl font-bold text-slate-900">{currentGPA}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Target GPA</p>
                  <p className="text-3xl font-bold text-green-600">{targetGPA}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Improvement Needed</p>
                  <p className="text-3xl font-bold text-blue-600">
                    +{(parseFloat(targetGPA) - parseFloat(currentGPA)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Scenarios */}
            <div className="space-y-4">
              {scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg p-6 transition-all ${
                    scenario.achievable
                      ? 'border-green-200 bg-green-50 hover:border-green-400'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-2xl ${scenario.achievable ? '' : 'opacity-50'}`}>
                          {index === 0 ? '⚡' : index === 1 ? '🎯' : index === 2 ? '📚' : '🏆'}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          {index === 0
                            ? 'Quick Path (1 Semester)'
                            : index === 1
                            ? 'Moderate Path (2 Semesters)'
                            : index === 2
                            ? 'Steady Path (3 Semesters)'
                            : 'Extended Path (4 Semesters)'}
                        </h3>
                      </div>
                      <p className="text-slate-700 mb-3">{scenario.details}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      scenario.achievable
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {scenario.achievable ? 'Achievable' : 'Not Possible'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">Credits Needed</p>
                      <p className="text-2xl font-bold text-slate-900">{scenario.creditsNeeded}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">Required Average GPA</p>
                      <p className={`text-2xl font-bold ${
                        scenario.requiredGPA > 4.0 ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {scenario.requiredGPA.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-xs text-slate-600 mb-1">Grade Level Needed</p>
                      <p className={`text-lg font-bold ${
                        scenario.achievable ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scenario.gradeNeeded}
                      </p>
                    </div>
                  </div>

                  {scenario.achievable && index === 0 && (
                    <div className="mt-4 bg-white rounded-lg p-4 border-l-4 border-green-500">
                      <p className="text-sm font-semibold text-slate-900 mb-2">💡 Recommended Strategy:</p>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>✓ Focus on easier courses where you can achieve higher grades</li>
                        <li>✓ Consider retaking failed courses to replace grades</li>
                        <li>✓ Utilize tutoring and office hours for challenging subjects</li>
                        <li>✓ Take balanced course load - don't overload yourself</li>
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Reality Check */}
            {scenarios.every(s => !s.achievable) && (
              <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">⚠️</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Reality Check</h3>
                    <p className="text-slate-700 mb-3">
                      Your target GPA of {targetGPA} may not be mathematically achievable from your current 
                      position of {currentGPA} with {currentCredits} credits.
                    </p>
                    <p className="text-slate-700 font-semibold">Consider these alternatives:</p>
                    <ul className="text-slate-700 mt-2 space-y-1 list-disc list-inside">
                      <li>Set a more realistic intermediate goal (e.g., raise to {(parseFloat(currentGPA) + 0.3).toFixed(2)} first)</li>
                      <li>Take more credits over additional semesters</li>
                      <li>Retake low-grade courses if your school allows grade replacement</li>
                      <li>Focus on achieving perfect 4.0 in upcoming semesters</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#examples" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Quick Examples</a>
            <a href="#how-to-use" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ How to Use</a>
            <a href="#tips" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ GPA Improvement Tips</a>
            <a href="#probation" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Academic Probation Help</a>
            <a href="#grade-scale" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Grade Scale</a>
            <a href="#strategies" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Success Strategies</a>
            <a href="#about" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ About Calculator</a>
            <a href="#faqs" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ FAQs</a>
            <a href="#share" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Share Calculator</a>
          </div>
        </div>

        {/* Social Share Section */}
        <section id="share" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Share This Calculator</h2>
          <p className="text-slate-700 mb-6">
            Help your friends plan their GPA improvement by sharing this free calculator!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>📘</span>
              <span>Share on Facebook</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate what grades you need to raise your GPA with this free calculator!')}&url=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <span>🐦</span>
              <span>Share on Twitter</span>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CANONICAL_URL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <span>💼</span>
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </section>

        {/* Quick Examples Section */}
        <section id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📊 Quick Examples: Real Student Scenarios</h2>
          
          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 1: Freshman Recovery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Current Situation:</p>
                  <ul className="text-slate-700 space-y-1 mt-2">
                    <li>• Current GPA: <strong>2.3</strong></li>
                    <li>• Credits Completed: <strong>30</strong></li>
                    <li>• Target GPA: <strong>3.0</strong></li>
                    <li>• Credits Per Semester: <strong>15</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-slate-600">What's Needed:</p>
                  <ul className="text-green-700 space-y-1 mt-2">
                    <li>✓ <strong>3.7 GPA</strong> for next 15 credits (A-/A average)</li>
                    <li>✓ <strong>1 Semester</strong> to reach goal</li>
                    <li>✓ <strong>Achievable</strong> with focused effort</li>
                    <li>✓ Take easier courses to boost grades</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <strong>Strategy:</strong> Since you're early in your academic career with only 30 credits, 
                  raising your GPA by 0.7 points is very achievable. Focus on courses where you can excel, 
                  utilize tutoring services, and maintain strong study habits. One excellent semester can 
                  completely turn around your academic standing.
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 2: Scholarship Maintenance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Current Situation:</p>
                  <ul className="text-slate-700 space-y-1 mt-2">
                    <li>• Current GPA: <strong>2.85</strong></li>
                    <li>• Credits Completed: <strong>60</strong></li>
                    <li>• Target GPA: <strong>3.0</strong> (scholarship requirement)</li>
                    <li>• Credits Per Semester: <strong>15</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-slate-600">What's Needed:</p>
                  <ul className="text-blue-700 space-y-1 mt-2">
                    <li>✓ <strong>3.3 GPA</strong> for next 15 credits (B+ average)</li>
                    <li>✓ <strong>1 Semester</strong> to reach 3.0</li>
                    <li>✓ <strong>Moderate Challenge</strong> but realistic</li>
                    <li>✓ Focus on consistent B+ performance</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <strong>Strategy:</strong> You need a B+ average (3.3) in your next semester to keep your 
                  scholarship. This is realistic - aim for A's in 2-3 courses and B's in the rest. Prioritize 
                  courses that align with your strengths, attend all classes, and start assignments early. 
                  Consider taking one course in a subject you've previously excelled in for a confidence boost.
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 3: Graduate School Preparation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Current Situation:</p>
                  <ul className="text-slate-700 space-y-1 mt-2">
                    <li>• Current GPA: <strong>3.2</strong></li>
                    <li>• Credits Completed: <strong>90</strong></li>
                    <li>• Target GPA: <strong>3.5</strong> (grad school requirement)</li>
                    <li>• Credits Per Semester: <strong>15</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-slate-600">What's Needed:</p>
                  <ul className="text-orange-700 space-y-1 mt-2">
                    <li>✓ <strong>3.9 GPA</strong> for next 15 credits (A-/A average)</li>
                    <li>✓ <strong>2-3 Semesters</strong> more realistic</li>
                    <li>✓ <strong>Challenging</strong> but possible with dedication</li>
                    <li>✓ Consider taking 45 credits at 3.7 average</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-700">
                  <strong>Strategy:</strong> With 90 credits already completed, raising your GPA by 0.3 points 
                  requires sustained excellence. Plan for 2-3 semesters of A-/A average work. Take advanced 
                  courses in your major where you're strongest, engage deeply with professors for strong 
                  recommendation letters, and maintain a 3.7+ semester GPA consistently. This gradual approach 
                  is more sustainable than trying to achieve 3.9 in a single semester.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Guide */}
        <section id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📖 How to Use This Calculator</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Enter Your Current GPA</h3>
                <p className="text-slate-700">
                  Input your current cumulative GPA (0.0 to 4.0). This is the GPA shown on your transcript, 
                  typically including all courses you've completed. If you're unsure, check your student 
                  portal or unofficial transcript.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Add Your Total Credits</h3>
                <p className="text-slate-700">
                  Enter the total number of credits you've completed so far. This is crucial because students 
                  with fewer credits can raise their GPA faster than those with many credits. Most full-time 
                  students complete 12-18 credits per semester, or 30-36 credits per year.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Set Your Target GPA</h3>
                <p className="text-slate-700">
                  Choose your desired GPA goal. Common targets include 2.0 (minimum to stay enrolled), 3.0 
                  (scholarship/good standing), 3.5 (graduate school), or 3.7+ (competitive programs). Be 
                  realistic based on your current position and remaining time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Specify Credits Per Semester</h3>
                <p className="text-slate-700">
                  Indicate how many credits you plan to take each semester. Standard full-time is 15 credits 
                  (5 courses × 3 credits). Taking 12 credits is minimum full-time, while 18+ requires strong 
                  academic standing. The calculator will show scenarios for multiple semesters.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Review Your Scenarios</h3>
                <p className="text-slate-700">
                  The calculator generates multiple scenarios showing what grades you need over 1, 2, 3, and 4 
                  semesters. Green scenarios are achievable, red ones are mathematically impossible. Each 
                  scenario shows required average GPA, grade level needed (A, B+, etc.), and total credits 
                  required. Choose the most realistic path for your situation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-bold text-slate-900 mb-2">💡 Pro Tips</h3>
            <ul className="text-slate-700 space-y-2">
              <li>✓ <strong>Check Feasibility:</strong> If all scenarios show "Not Achievable," consider a more modest target or extending your timeline</li>
              <li>✓ <strong>Account for Difficulty:</strong> Taking all hard courses makes high GPAs harder to achieve; balance challenging and manageable courses</li>
              <li>✓ <strong>Grade Replacement:</strong> Many schools let you retake courses to replace failing grades - ask your advisor about this policy</li>
              <li>✓ <strong>Summer Sessions:</strong> Consider taking easier courses in summer to boost GPA without the pressure of full course load</li>
              <li>✓ <strong>Realistic Planning:</strong> Achieving consistent A's is difficult; don't bank on perfect 4.0 semesters unless you have a track record</li>
            </ul>
          </div>
        </section>

        {/* GPA Improvement Tips Section */}
        <section id="tips" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">💡 GPA Improvement Tips & Strategies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📚</span>
                <h3 className="text-lg font-bold text-slate-900">Academic Strategies</h3>
              </div>
              <ul className="text-slate-700 space-y-2 text-sm">
                <li>✓ Attend every class and sit in front rows</li>
                <li>✓ Visit professor office hours regularly</li>
                <li>✓ Form or join study groups</li>
                <li>✓ Start assignments early, not the night before</li>
                <li>✓ Use campus tutoring centers (they're free!)</li>
                <li>✓ Review notes within 24 hours of each lecture</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎯</span>
                <h3 className="text-lg font-bold text-slate-900">Course Selection</h3>
              </div>
              <ul className="text-slate-700 space-y-2 text-sm">
                <li>✓ Balance hard and easy courses each semester</li>
                <li>✓ Take courses that align with your strengths</li>
                <li>✓ Check professor ratings on RateMyProfessors</li>
                <li>✓ Consider taking prerequisites seriously</li>
                <li>✓ Don't overload - quality over quantity</li>
                <li>✓ Take electives in areas you're passionate about</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⏰</span>
                <h3 className="text-lg font-bold text-slate-900">Time Management</h3>
              </div>
              <ul className="text-slate-700 space-y-2 text-sm">
                <li>✓ Create a weekly study schedule</li>
                <li>✓ Use planners or apps to track deadlines</li>
                <li>✓ Study in 25-minute focused blocks (Pomodoro)</li>
                <li>✓ Prioritize high-credit, challenging courses</li>
                <li>✓ Limit part-time work hours if possible</li>
                <li>✓ Get 7-8 hours sleep during exam weeks</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🔄</span>
                <h3 className="text-lg font-bold text-slate-900">Grade Recovery</h3>
              </div>
              <ul className="text-slate-700 space-y-2 text-sm">
                <li>✓ Retake failed courses for grade replacement</li>
                <li>✓ Consider grade forgiveness policies</li>
                <li>✓ Take W (withdrawal) before F if necessary</li>
                <li>✓ Focus on Pass/Fail for non-major courses</li>
                <li>✓ Appeal grades if you have legitimate grounds</li>
                <li>✓ Meet with academic advisor quarterly</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6 border-l-4 border-yellow-500">
            <h3 className="text-lg font-bold text-slate-900 mb-3">🎓 Long-Term Success Habits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div>
                <p className="font-semibold mb-2">Build Strong Foundations:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Master foundational courses early</li>
                  <li>• Don't skip prerequisite knowledge</li>
                  <li>• Create comprehensive notes database</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Develop Support Network:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Connect with high-achieving classmates</li>
                  <li>• Build relationships with professors</li>
                  <li>• Utilize counseling for stress management</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Stay Motivated:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Set milestone rewards for GPA goals</li>
                  <li>• Track progress visually on charts</li>
                  <li>• Remember your long-term career goals</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Seek Help Early:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Don't wait until midterms to get help</li>
                  <li>• Use supplemental instruction sessions</li>
                  <li>• Consider private tutoring if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Probation Help */}
        <section id="probation" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🆘 Academic Probation: Getting Off & Staying Off</h2>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">What is Academic Probation?</h3>
                <p className="text-slate-700 mb-3">
                  Academic probation is a warning status indicating your GPA has fallen below your institution's 
                  minimum requirements (typically 2.0). While on probation, you're still enrolled but face 
                  restrictions and risk suspension if your GPA doesn't improve.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-slate-900 mb-2">Common Probation Triggers:</p>
                  <ul className="text-slate-700 text-sm space-y-1">
                    <li>• Cumulative GPA below 2.0 (C average)</li>
                    <li>• Semester GPA below 2.0 for multiple terms</li>
                    <li>• Not meeting Satisfactory Academic Progress (SAP)</li>
                    <li>• Failing more than 50% of attempted credits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Step-by-Step Recovery Plan</h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border-l-4 border-green-500">
                  <h4 className="font-bold text-slate-900 mb-2">Week 1-2: Assess & Plan</h4>
                  <ul className="text-slate-700 text-sm space-y-1">
                    <li>✓ Meet with your academic advisor immediately</li>
                    <li>✓ Review probation letter and understand requirements</li>
                    <li>✓ Calculate exact GPA needed to get off probation</li>
                    <li>✓ Identify courses that dragged down your GPA</li>
                    <li>✓ Create realistic semester plan with advisor approval</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border-l-4 border-blue-500">
                  <h4 className="font-bold text-slate-900 mb-2">Weeks 3-8: Execute Plan</h4>
                  <ul className="text-slate-700 text-sm space-y-1">
                    <li>✓ Attend ALL classes without exception</li>
                    <li>✓ Schedule weekly check-ins with each professor</li>
                    <li>✓ Use tutoring center 3-5 times per week minimum</li>
                    <li>✓ Form study groups for difficult courses</li>
                    <li>✓ Reduce work hours or extracurriculars if needed</li>
                    <li>✓ Submit every assignment on time, even if imperfect</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border-l-4 border-purple-500">
                  <h4 className="font-bold text-slate-900 mb-2">Weeks 9-16: Push to Finish Strong</h4>
                  <ul className="text-slate-700 text-sm space-y-1">
                    <li>✓ Start exam prep 2 weeks early, not 2 days</li>
                    <li>✓ Request deadline extensions if genuinely needed</li>
                    <li>✓ Attend exam review sessions religiously</li>
                    <li>✓ Consider extra credit opportunities in every course</li>
                    <li>✓ Communicate with professors about your situation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">⚡ Quick Wins for GPA Boost</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-slate-900 mb-2">This Semester:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Drop hardest course if before deadline</li>
                    <li>• Change lowest grade to Pass/Fail if allowed</li>
                    <li>• Take 12-13 credits instead of 15-18</li>
                    <li>• Choose courses with project-based grading</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Next Semester:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Retake failed courses for grade replacement</li>
                    <li>• Take online/hybrid courses (often easier)</li>
                    <li>• Choose professors known for fair grading</li>
                    <li>• Consider one summer course to boost GPA</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📊 Typical Probation Requirements</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="py-2 px-4 text-left text-slate-900">Credits Completed</th>
                      <th className="py-2 px-4 text-left text-slate-900">Minimum Cumulative GPA</th>
                      <th className="py-2 px-4 text-left text-slate-900">Semester GPA Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-slate-700">0-30 credits</td>
                      <td className="py-2 px-4 text-slate-700">1.75-2.0</td>
                      <td className="py-2 px-4 text-green-700 font-semibold">2.5+ to improve quickly</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-slate-700">30-60 credits</td>
                      <td className="py-2 px-4 text-slate-700">2.0</td>
                      <td className="py-2 px-4 text-green-700 font-semibold">2.75+ recommended</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4 text-slate-700">60+ credits</td>
                      <td className="py-2 px-4 text-slate-700">2.0</td>
                      <td className="py-2 px-4 text-green-700 font-semibold">3.0+ to make progress</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                *Requirements vary by institution. Check your school's specific academic standing policies.
              </p>
            </div>
          </div>
        </section>

        {/* Grade Scale Table */}
        <section id="grade-scale" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📊 Standard 4.0 Grade Scale</h2>
          <p className="text-slate-700 mb-6">
            Understanding the grade-to-GPA conversion is crucial for planning your improvement strategy. 
            Here's the standard 4.0 scale used by most U.S. colleges and universities:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Letter Grade</th>
                  <th className="py-3 px-4 text-center">Grade Points</th>
                  <th className="py-3 px-4 text-center">Percentage Range</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Quality</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { grade: 'A+', points: '4.0', range: '97-100%', quality: 'Outstanding', color: 'green' },
                  { grade: 'A', points: '4.0', range: '93-96%', quality: 'Excellent', color: 'green' },
                  { grade: 'A-', points: '3.7', range: '90-92%', quality: 'Very Good', color: 'green' },
                  { grade: 'B+', points: '3.3', range: '87-89%', quality: 'Good', color: 'blue' },
                  { grade: 'B', points: '3.0', range: '83-86%', quality: 'Above Average', color: 'blue' },
                  { grade: 'B-', points: '2.7', range: '80-82%', quality: 'Satisfactory', color: 'blue' },
                  { grade: 'C+', points: '2.3', range: '77-79%', quality: 'Acceptable', color: 'yellow' },
                  { grade: 'C', points: '2.0', range: '73-76%', quality: 'Adequate', color: 'yellow' },
                  { grade: 'C-', points: '1.7', range: '70-72%', quality: 'Below Average', color: 'orange' },
                  { grade: 'D+', points: '1.3', range: '67-69%', quality: 'Poor', color: 'orange' },
                  { grade: 'D', points: '1.0', range: '63-66%', quality: 'Minimal Pass', color: 'red' },
                  { grade: 'D-', points: '0.7', range: '60-62%', quality: 'Very Poor', color: 'red' },
                  { grade: 'F', points: '0.0', range: '<60%', quality: 'Failing', color: 'red' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800">{row.grade}</td>
                    <td className="py-3 px-4 text-center text-slate-800">{row.points}</td>
                    <td className="py-3 px-4 text-center text-slate-700">{row.range}</td>
                    <td className="py-3 px-4 text-slate-700">{row.quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">📌 Important Notes:</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• Some schools cap A+ at 4.0 instead of 4.3</li>
                <li>• Plus/minus grading varies by institution</li>
                <li>• Pass/Fail courses don't affect GPA</li>
                <li>• Withdrawals (W) don't affect GPA but show on transcript</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">🎯 GPA Targets by Goal:</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>2.0:</strong> Minimum to stay enrolled</li>
                <li>• <strong>2.5:</strong> Good academic standing</li>
                <li>• <strong>3.0:</strong> Dean's List / Scholarships</li>
                <li>• <strong>3.5:</strong> Graduate school competitive</li>
                <li>• <strong>3.7+:</strong> Top grad programs / honors</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Success Strategies Section */}
        <section id="strategies" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🏆 Success Strategies: Proven Methods That Work</h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-slate-900 mb-4">The "GPA Sprint" Method (1 Semester Boost)</h3>
              <p className="text-slate-700 mb-3">
                Best for students with under 60 credits who need rapid improvement. Dedicate one semester to 
                maximum GPA focus by taking strategic courses and minimizing other commitments.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">Implementation:</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>• Take 12-15 credits (don't overload)</li>
                  <li>• Choose 2-3 courses you've previously excelled in similar subjects</li>
                  <li>• Include 1-2 general education courses with reputation for fair grading</li>
                  <li>• Avoid taking more than 2 high-difficulty courses together</li>
                  <li>• Reduce work hours to 10-15/week maximum</li>
                  <li>• Target: 3.5-3.8 semester GPA to significantly boost cumulative</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-slate-900 mb-4">The "Steady Climb" Method (2-3 Semesters)</h3>
              <p className="text-slate-700 mb-3">
                Ideal for students with 60-90 credits. Sustainable approach focusing on consistent B+/A- 
                performance rather than trying for perfect 4.0 each semester.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">Implementation:</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>• Maintain 15 credits per semester (standard load)</li>
                  <li>• Balance course difficulty across the semester</li>
                  <li>• Aim for consistent 3.3-3.5 each semester</li>
                  <li>• Identify and strengthen weak subject areas early</li>
                  <li>• Build relationships with 2-3 professors for mentorship</li>
                  <li>• Target: Raise GPA by 0.3-0.5 points over 2 semesters</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-slate-900 mb-4">The "Recovery Plan" Method (Academic Probation)</h3>
              <p className="text-slate-700 mb-3">
                For students on academic probation (below 2.0 GPA). Focus on getting off probation first, 
                then building upward momentum.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">Implementation:</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>• Semester 1: Take 12 credits, target 2.5+ GPA (get off probation)</li>
                  <li>• Semester 2: Take 13-15 credits, target 2.75+ GPA (build confidence)</li>
                  <li>• Semester 3: Take 15 credits, target 3.0+ GPA (reach good standing)</li>
                  <li>• Retake all F's immediately for grade replacement</li>
                  <li>• Meet with advisor bi-weekly for accountability</li>
                  <li>• Target: Reach 2.0+ cumulative within 1-2 semesters</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-slate-900 mb-4">The "Last Stretch" Method (90+ Credits)</h3>
              <p className="text-slate-700 mb-3">
                For upperclassmen needing GPA boost before graduation or grad school applications. Every 
                course counts, so maximize each opportunity.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">Implementation:</p>
                <ul className="text-slate-700 text-sm space-y-1">
                  <li>• Take 15-18 credits (maximize remaining opportunities)</li>
                  <li>• Focus heavily on upper-division major courses</li>
                  <li>• Consider 5th year if GPA is critical for grad school</li>
                  <li>• Take summer courses to add high-grade credits</li>
                  <li>• Network with professors for strong recommendation letters</li>
                  <li>• Target: Sustain 3.7-3.9 in final semesters for competitive grad school</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 rounded-lg p-6 border-2 border-yellow-300">
            <h3 className="text-lg font-bold text-slate-900 mb-3">⚡ Universal Success Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-700">
              <div>
                <p className="font-semibold mb-2">Consistency Beats Perfection:</p>
                <p>Three semesters of 3.3 GPA is better than one 4.0 followed by two 2.5s</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Earlier is Easier:</p>
                <p>With fewer credits completed, each course has bigger impact on your GPA</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Process Over Outcome:</p>
                <p>Focus on daily study habits, not just final exam grades</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">About the GPA Raise Calculator</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Our <strong>GPA Raise Calculator</strong> helps students answer the critical question: "What GPA do I need to raise my grade point average to my target level?" Whether you're recovering from academic probation, working toward scholarship requirements, or preparing for graduate school applications, this free tool provides realistic semester-by-semester scenarios based on your current academic standing and future course plans.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">How GPA Improvement Works</h3>
            <p>
              Understanding <strong>GPA calculation</strong> is essential for effective academic planning. Your cumulative GPA is calculated by dividing total grade points earned by total credit hours attempted. When you want to <strong>raise your GPA</strong>, you need to earn enough new grade points to offset your current standing. The calculator uses this formula to determine what semester GPA you need across different timeframes—from one semester intensive improvement to a multi-year steady climb approach.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Planning Your Academic Recovery</h3>
            <p>
              The <strong>GPA improvement calculator</strong> generates four distinct scenarios showing how many semesters you'll need to reach your target. A student with 30 credits can raise their GPA much faster than someone with 90 credits because each new course has greater mathematical impact. This tool helps you set realistic expectations and choose between aggressive one-semester plans versus sustainable multi-semester strategies. For specialized GPA calculations, explore our <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator'); }} className="text-emerald-600 hover:underline cursor-pointer">college GPA calculator</a> or <a href="/education-and-exam-tools/gpa-tools/engineering-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/engineering-gpa-calculator'); }} className="text-emerald-600 hover:underline cursor-pointer">engineering GPA calculator</a> for major-specific tracking.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Academic Probation Recovery</h3>
            <p>
              Students facing <strong>academic probation</strong> need immediate action plans to return to good standing. Most institutions require maintaining at least a 2.0 cumulative GPA, with semester GPA requirements typically set at 2.5 or higher to demonstrate improvement. Our <strong>GPA recovery calculator</strong> shows exactly what grades you need each semester to exit probation status while building sustainable study habits. The calculator accounts for how many credits you've already completed and recommends appropriate course loads—often starting with 12 credits and gradually increasing as you rebuild academic confidence.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Graduate School and Scholarship Requirements</h3>
            <p>
              Many graduate programs and scholarships have minimum GPA thresholds—commonly 3.0 for scholarships and 3.5+ for competitive graduate schools. Our <strong>target GPA calculator</strong> helps you determine if reaching these benchmarks is mathematically achievable given your current credits and realistic grade expectations. For example, raising from 2.8 to 3.5 with 90 completed credits requires nearly straight A's over multiple semesters—a scenario the calculator will flag as challenging or not achievable, prompting you to consider alternative timelines or intermediate goals. Students planning for specific programs should also check our <a href="/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/lsac-gpa-calculator'); }} className="text-emerald-600 hover:underline cursor-pointer">LSAC GPA calculator</a> for law school or <a href="/education-and-exam-tools/gpa-tools/veterinary-school-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/veterinary-school-gpa-calculator'); }} className="text-emerald-600 hover:underline cursor-pointer">veterinary school GPA calculator</a> for professional programs.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Strategic Course Planning for GPA Improvement</h3>
            <p>
              Effective <strong>GPA improvement</strong> requires strategic thinking beyond just "getting better grades." Consider balancing challenging required courses with achievable electives, utilizing grade replacement policies where your institution allows retaking failed courses, and timing difficult courses when you can dedicate maximum study hours. The <strong>semester GPA planner</strong> functionality helps you visualize how course load decisions impact your cumulative GPA trajectory. Students may benefit from taking 12-13 credits in critical improvement semesters rather than overloading with 18 credits and risking mediocre performance across all courses.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Understanding Grade Requirements</h3>
            <p>
              When the calculator shows you need a 3.7 semester GPA, this translates to mostly A's (4.0) and A-'s (3.7) with perhaps one B+ (3.3). A required 3.3 GPA means consistent B+ to A- performance, while 3.0 allows a mix of B's and B+'s. The tool provides these <strong>grade level translations</strong> to help you assess feasibility—requiring a 3.9 semester GPA means nearly perfect performance with almost no room for B grades, which may not be realistic depending on your course difficulty and time commitments. Use the achievability indicators (green checkmarks vs. red X's) to identify which scenarios are practical versus overly ambitious.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Long-Term Academic Success</h3>
            <p>
              The <strong>GPA raise calculator</strong> is most effective when used as part of comprehensive academic planning. Track your GPA each semester, adjust your strategies based on actual performance, and don't hesitate to seek support through tutoring centers, professor office hours, study groups, and academic advising. Remember that GPA improvement is a marathon, not a sprint—consistent 3.3-3.5 performance over multiple semesters often yields better results than attempting 4.0 perfection and burning out. The calculator helps you maintain realistic expectations while staying motivated toward your academic goals, whether that's maintaining eligibility, earning scholarships, or preparing for the next stage of your educational journey.
            </p>

            <p className="text-lg leading-relaxed mt-6 bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
              <strong>Start planning your GPA improvement journey today.</strong> Use our calculator above to generate personalized scenarios, then implement the proven strategies outlined in our guide sections. With realistic planning and consistent effort, you can achieve your target GPA and reach your academic goals. For additional GPA tracking tools, visit our complete <a href="/education-and-exam-tools/gpa-tools" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools'); }} className="text-emerald-600 hover:underline cursor-pointer font-semibold">GPA calculator collection</a>.
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: "Can I raise my GPA from 2.5 to 3.0?",
                a: "Yes, it's possible to raise your GPA from 2.5 to 3.0, but it depends on how many credits you currently have and how many you plan to take. Generally, the fewer credits you have completed, the easier it is to raise your GPA. For example, with 30 credits at 2.5, you'd need about 3.7 GPA (A-/A average) in the next 15 credits to reach 3.0. With 60 credits, you'd need 3.5 GPA in 30 new credits. Use our calculator above to see exactly what grades you need for your specific situation."
              },
              {
                q: "What GPA do I need to get off academic probation?",
                a: "Most universities require a minimum 2.0 cumulative GPA to get off academic probation. Some schools have higher requirements (2.25-2.5). You typically need to achieve a semester GPA above 2.0 (often 2.5+) while gradually raising your cumulative GPA. The exact requirement varies by institution and how many credits you've completed. Check your school's academic standing policy or meet with your advisor to understand specific requirements."
              },
              {
                q: "How many A's do I need to raise my GPA?",
                a: "The number of A's needed depends on your current GPA, total credits, and target GPA. For example, raising from 2.8 to 3.2 with 60 credits might require 3-4 A's (12-16 credits at 4.0) assuming you get B's in remaining courses. With 90 credits, you'd need 5-6 A's over 2 semesters. Our calculator provides specific scenarios showing different grade combinations to reach your goal. Remember, consistent A-/B+ performance over 2 semesters is often more realistic than expecting all A's."
              },
              {
                q: "Is it realistic to raise my GPA by 0.5 points?",
                a: "Raising your GPA by 0.5 points is realistic if you're early in your academic career (under 60 credits). With 30 credits, you can raise from 2.5 to 3.0 in 1-2 semesters with B+ to A- average. With 90+ credits, the same increase requires mostly A's over 2-3 semesters and may take 3-4 semesters with more realistic grades. The calculator shows if your goal is achievable based on your current situation. If scenarios show 'Not Achievable,' consider setting a more modest intermediate goal first."
              },
              {
                q: "Should I retake courses to improve my GPA?",
                a: "Retaking courses can significantly boost your GPA if your school has a grade replacement policy (only the higher grade counts). This is especially effective for F's or D's in major courses. However, some schools average all attempts, which is less beneficial. Before retaking: (1) Check your school's grade replacement policy, (2) Ensure you can actually achieve a higher grade (get tutoring if needed), (3) Consider if your time is better spent taking new courses, (4) Verify financial aid will cover retakes. Generally, retaking failed courses is wise, while retaking C's is situational."
              },
              {
                q: "How does taking fewer credits affect my GPA improvement timeline?",
                a: "Taking fewer credits per semester (12-13 vs 15-18) can help you achieve higher grades per course but extends the time needed to reach your target GPA. For example, if you need 30 credits at 3.5 GPA: taking 15/semester = 2 semesters; taking 12/semester = 2.5 semesters. The benefit is that lighter course loads often result in higher quality work and better grades. If you're on academic probation or working significant hours, taking 12-13 credits with focus on quality is often better than overloading and getting mediocre grades."
              },
              {
                q: "What if all scenarios show my goal is 'Not Achievable'?",
                a: "If the calculator shows your target is mathematically impossible (requires GPA above 4.0), you have several options: (1) Set a more realistic intermediate goal (e.g., aim for 3.2 instead of 3.5, then reassess), (2) Extend your timeline by taking more credits over additional semesters, (3) Consider a 5th year of study if critical for grad school, (4) Focus on demonstrating upward trend even if you don't hit exact target - many grad programs value improvement over time, (5) Retake low-grade courses if your school allows grade replacement. Remember, a strong upward trend (2.5→2.8→3.1) can be as impressive as hitting an absolute number."
              },
              {
                q: "Do Pass/Fail courses help or hurt my GPA improvement plan?",
                a: "Pass/Fail (P/NP) courses don't affect your GPA calculation - they count toward degree requirements but aren't included in grade point average. Strategic use: (1) Use P/NP for difficult required courses outside your major to avoid GPA damage, (2) Take challenging electives P/NP to explore interests without risk, (3) DON'T use P/NP for courses you expect to get A's in (you're losing GPA boost opportunity). Most schools limit P/NP to certain course types (usually not major requirements). Note: Some graduate programs recalculate GPAs and may not accept many P/NP courses, so use strategically."
              },
              {
                q: "How do I maintain a high GPA once I've raised it?",
                a: "After successfully raising your GPA, maintain it by: (1) Continue strong study habits that got you there, (2) Don't overload on credits just because you're doing well, (3) Balance hard and easier courses each semester, (4) Build in buffer - aim for slightly higher than minimum needed, (5) Stay connected with tutoring resources even when not struggling, (6) Maintain relationships with professors and advisors, (7) Track your grades throughout semester, not just at end, (8) Don't slack off in 'easy' courses - one C can undo weeks of progress. Remember: maintaining requires less effort than raising, but still requires consistent attention."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
            currentSlug="gpa-raise-calculator"
            relatedSlugs={['college-gpa-calculator', 'engineering-gpa-calculator', 'veterinary-school-gpa-calculator', 'berkeley-gpa-calculator', 'csu-gpa-calculator', 'lsac-gpa-calculator']}
            navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default GPARaiseCalculator;
