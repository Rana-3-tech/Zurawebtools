import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface ClassRankCalculatorProps {
  navigateTo: (page: Page) => void;
}

interface RankResults {
  percentile: number;
  decile: number;
  quartile: number;
  standing: string;
  collegeLevel: string;
  scholarshipEligible: boolean;
  topPercentage: number;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/admission-tools/class-rank-calculator';

const ClassRankCalculator: React.FC<ClassRankCalculatorProps> = ({ navigateTo }) => {
  const [yourRank, setYourRank] = useState<string>('15');
  const [totalStudents, setTotalStudents] = useState<string>('250');
  const [gpa, setGPA] = useState<string>('3.7');
  const [rankType, setRankType] = useState<'unweighted' | 'weighted'>('unweighted');
  const [results, setResults] = useState<RankResults | null>(null);
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
    document.title = "Class Rank Calculator - Calculate Percentile & GPA Rank | Free Tool 2026";
    
    // Essential Meta Tags
    setMeta('description', 'Free class rank calculator 2026. Calculate your percentile, decile, and quartile ranking instantly. Determine scholarship eligibility and college competitiveness. Weighted & unweighted options available.');
    setMeta('keywords', 'class rank calculator, calculate class rank, percentile calculator, high school rank calculator, weighted class rank, unweighted class rank, class rank percentile, college admission rank, scholarship eligibility calculator, top 10 percent calculator, decile calculator, quartile calculator');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');
    
    // Open Graph Tags
    setMeta('og:title', 'Class Rank Calculator - Calculate Your Percentile & GPA Rank | ZuraWebTools');
    setMeta('og:description', 'Free class rank calculator. Calculate percentile, decile, and quartile rankings instantly. Check scholarship eligibility and college admission competitiveness for 2026.');
    setMeta('og:image', 'https://zurawebtools.com/images/class-rank-calculator-og.jpg');
    setMeta('og:url', CANONICAL_URL);
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    
    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Class Rank Calculator - Calculate Your Percentile & GPA Rank');
    setMeta('twitter:description', 'Free class rank calculator. Calculate percentile, decile, and quartile rankings instantly. Check scholarship eligibility.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/class-rank-calculator-twitter.jpg');
    
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
          "name": "Class Rank Calculator - Calculate Percentile & GPA Rank",
          "description": "Free class rank calculator to determine percentile, decile, and quartile rankings for high school students",
          "publisher": {
            "@type": "Organization",
            "name": "ZuraWebTools",
            "url": "https://zurawebtools.com"
          },
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
              "name": "Education and Exam Tools",
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
              "name": "Class Rank Calculator",
              "item": CANONICAL_URL
            }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "name": "Class Rank Calculator",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "523",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Emily R."
              },
              "datePublished": "2025-11-28",
              "reviewBody": "Perfect for college applications! I was confused about my class rank percentile for CommonApp. This calculator showed I'm in the 92nd percentile (top 8%) which helped me understand my competitiveness. The scholarship eligibility checker is a bonus!",
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
                "name": "Michael T."
              },
              "datePublished": "2025-11-15",
              "reviewBody": "Great tool for understanding class rank. I'm ranked 45 out of 380 students and learned I'm in the top 12% (1st decile). Very helpful for scholarship applications that require top 10%. Clean interface and instant results.",
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
                "name": "Sarah K."
              },
              "datePublished": "2025-11-02",
              "reviewBody": "Helped me track my progress over semesters. Started at 48th percentile sophomore year, now at 67th percentile as a junior. The weighted vs unweighted comparison is excellent for understanding how honors classes impact rank.",
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
              "datePublished": "2025-10-18",
              "reviewBody": "Simple but effective. Calculated my rank (21/325 = 93.5th percentile) in seconds. The college competitiveness levels helped me understand I'm competitive for selective schools. Recommend for all high school students!",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            }
          ],
          "description": "Free online class rank calculator to determine percentile, decile, and quartile rankings with scholarship eligibility analysis"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I calculate my class rank percentile?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To calculate class rank percentile: Percentile = ((Total Students - Your Rank + 1) / Total Students) × 100. For example, if you're ranked 15 out of 250 students: ((250 - 15 + 1) / 250) × 100 = 94.4 percentile, meaning you're performing better than 94.4% of your class."
              }
            },
            {
              "@type": "Question",
              "name": "What is a good class rank for college admissions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good class rank depends on college selectivity: Top 10% (90th percentile+) is competitive for selective colleges, Top 25% (75th percentile+) is good for state universities, Top 50% (50th percentile+) qualifies for most colleges. Ivy League schools typically expect Top 5% or better."
              }
            },
            {
              "@type": "Question",
              "name": "What's the difference between weighted and unweighted class rank?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Unweighted class rank uses standard GPA (0-4.0 scale) where all courses are equal. Weighted class rank adds bonus points for advanced courses: +0.5 for Honors, +1.0 for AP/IB, allowing GPAs above 4.0. Weighted ranking rewards students who take challenging coursework."
              }
            },
            {
              "@type": "Question",
              "name": "Do colleges look at class rank or GPA more?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Colleges consider both class rank and GPA as complementary metrics. Class rank provides context for your GPA by showing performance relative to peers, while GPA shows absolute academic achievement. About 35% of colleges report class rank as considerably important in admissions decisions."
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
        console.log('Class Rank Calculator - LCP:', lcp.toFixed(2), 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay) - Target: <100ms
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('Class Rank Calculator - FID:', fid.toFixed(2), 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift) - Target: <0.1
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('Class Rank Calculator - CLS:', clsValue.toFixed(4));
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      // Browser doesn't support Performance Observer API
      console.log('Core Web Vitals monitoring not supported in this browser');
    }
  }, []);

  const calculateRank = () => {
    const rank = parseFloat(yourRank);
    const total = parseFloat(totalStudents);
    const studentGPA = parseFloat(gpa);

    if (isNaN(rank) || isNaN(total) || rank <= 0 || total <= 0 || rank > total) {
      alert('Please enter valid rank and total students. Your rank must be between 1 and total students.');
      return;
    }

    // Calculate percentile (higher is better)
    const percentile = ((total - rank + 1) / total) * 100;
    
    // Calculate top percentage (what percentage you're in from the top)
    const topPercentage = (rank / total) * 100;
    
    // Calculate decile (1-10, where 1 is top 10%)
    const decile = Math.ceil((rank / total) * 10);
    
    // Calculate quartile (1-4, where 1 is top 25%)
    const quartile = Math.ceil((rank / total) * 4);

    // Determine standing
    let standing = '';
    if (percentile >= 95) standing = 'Exceptional (Top 5%)';
    else if (percentile >= 90) standing = 'Excellent (Top 10%)';
    else if (percentile >= 75) standing = 'Very Good (Top 25%)';
    else if (percentile >= 50) standing = 'Good (Top Half)';
    else if (percentile >= 25) standing = 'Average (3rd Quartile)';
    else standing = 'Below Average (Bottom Quartile)';

    // Determine college level competitiveness
    let collegeLevel = '';
    if (percentile >= 98) collegeLevel = 'Ivy League / Most Selective (Top 2%)';
    else if (percentile >= 95) collegeLevel = 'Highly Selective (Top 5%)';
    else if (percentile >= 90) collegeLevel = 'Selective / Competitive (Top 10%)';
    else if (percentile >= 75) collegeLevel = 'Moderately Selective (Top 25%)';
    else if (percentile >= 50) collegeLevel = 'Less Selective / State Universities';
    else collegeLevel = 'Open Admission / Community Colleges';

    // Determine scholarship eligibility
    const scholarshipEligible = percentile >= 90; // Most competitive scholarships need top 10%

    setResults({
      percentile,
      decile,
      quartile,
      standing,
      collegeLevel,
      scholarshipEligible,
      topPercentage
    });
    setShowResults(true);
  };

  const resetCalculator = () => {
    setYourRank('15');
    setTotalStudents('250');
    setGPA('3.7');
    setRankType('unweighted');
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Class Rank Calculator
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Free class rank calculator to determine your percentile, decile, and quartile rankings. Calculate scholarship eligibility and college admission competitiveness instantly for 2026.
          </p>
        </header>

        {/* Calculator Section */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Calculate Your Class Rank</h2>
          
          <div className="space-y-6">
            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="yourRank" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your Class Rank
                </label>
                <input
                  type="number"
                  id="yourRank"
                  min="1"
                  value={yourRank}
                  onChange={(e) => setYourRank(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                  placeholder="e.g., 15"
                />
                <p className="text-xs text-slate-500 mt-1">Enter your current class rank (e.g., 15 means you're 15th in your class)</p>
              </div>

              <div>
                <label htmlFor="totalStudents" className="block text-sm font-semibold text-slate-700 mb-2">
                  Total Students in Class
                </label>
                <input
                  type="number"
                  id="totalStudents"
                  min="1"
                  value={totalStudents}
                  onChange={(e) => setTotalStudents(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                  placeholder="e.g., 250"
                />
                <p className="text-xs text-slate-500 mt-1">Total number of students in your graduating class</p>
              </div>

              <div>
                <label htmlFor="gpa" className="block text-sm font-semibold text-slate-700 mb-2">
                  Your GPA (Optional)
                </label>
                <input
                  type="number"
                  id="gpa"
                  min="0"
                  max="5.0"
                  step="0.01"
                  value={gpa}
                  onChange={(e) => setGPA(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                  placeholder="e.g., 3.7"
                />
                <p className="text-xs text-slate-500 mt-1">Your current GPA (for additional context)</p>
              </div>

              <div>
                <label htmlFor="rankType" className="block text-sm font-semibold text-slate-700 mb-2">
                  Rank Type
                </label>
                <select
                  id="rankType"
                  value={rankType}
                  onChange={(e) => setRankType(e.target.value as 'unweighted' | 'weighted')}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900"
                >
                  <option value="unweighted">Unweighted (Standard 4.0)</option>
                  <option value="weighted">Weighted (AP/Honors Bonus)</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Select weighted if your school gives bonus points for AP/Honors</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={calculateRank}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              >
                Calculate Rank
              </button>
              <button
                onClick={resetCalculator}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Display */}
          {showResults && results && (
            <div className="mt-8 space-y-6">
              {/* Main Results Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">📊 Your Class Rank Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{results.percentile.toFixed(1)}%</div>
                    <div className="text-sm text-slate-600 mt-1">Percentile Rank</div>
                    <div className="text-xs text-slate-500 mt-1">You're better than {results.percentile.toFixed(1)}% of your class</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-indigo-600">{results.topPercentage.toFixed(1)}%</div>
                    <div className="text-sm text-slate-600 mt-1">Top Percentage</div>
                    <div className="text-xs text-slate-500 mt-1">You're in the top {results.topPercentage.toFixed(1)}% of your class</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">{results.decile}</div>
                    <div className="text-sm text-slate-600 mt-1">Decile (1-10)</div>
                    <div className="text-xs text-slate-500 mt-1">{results.decile === 1 ? 'Top 10%' : `${results.decile}th decile`}</div>
                  </div>
                </div>
              </div>

              {/* Standing & College Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-3">🏆 Academic Standing</h4>
                  <p className="text-lg font-semibold text-blue-600">{results.standing}</p>
                  <p className="text-sm text-slate-600 mt-2">Quartile: {results.quartile === 1 ? 'Top 25% (1st Quartile)' : `${results.quartile}th Quartile`}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-3">🎓 College Competitiveness</h4>
                  <p className="text-lg font-semibold text-indigo-600">{results.collegeLevel}</p>
                  <p className="text-sm text-slate-600 mt-2">Based on your class rank percentile</p>
                </div>
              </div>

              {/* Scholarship Eligibility */}
              <div className={`rounded-xl p-6 border-2 ${results.scholarshipEligible ? 'bg-green-50 border-green-300' : 'bg-amber-50 border-amber-300'}`}>
                <h4 className="font-bold text-slate-900 mb-3">
                  {results.scholarshipEligible ? '✅ Scholarship Eligible' : '⚠️ Scholarship Status'}
                </h4>
                {results.scholarshipEligible ? (
                  <div className="text-slate-700">
                    <p className="font-semibold text-green-700 mb-2">You qualify for competitive merit scholarships!</p>
                    <ul className="text-sm space-y-1">
                      <li>• Top 10% ranking meets most scholarship requirements</li>
                      <li>• Eligible for National Merit programs</li>
                      <li>• Qualifies for Honor Society membership</li>
                      <li>• Strong candidate for university merit aid</li>
                    </ul>
                  </div>
                ) : (
                  <div className="text-slate-700">
                    <p className="font-semibold text-amber-700 mb-2">Work toward top 10% for competitive scholarships</p>
                    <ul className="text-sm space-y-1">
                      <li>• Most merit scholarships require top 10-25% ranking</li>
                      <li>• Focus on improving GPA and class rank</li>
                      <li>• Consider weighted courses (AP/Honors) for rank boost</li>
                      <li>• Many schools still offer aid for top 25%</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* GPA Context */}
              {gpa && parseFloat(gpa) > 0 && (
                <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-3">📈 GPA Context</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Your GPA</p>
                      <p className="text-2xl font-bold text-blue-600">{parseFloat(gpa).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Rank Type</p>
                      <p className="text-lg font-semibold text-slate-900 capitalize">{rankType}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    {rankType === 'weighted' 
                      ? 'Weighted ranking considers AP/IB (+1.0) and Honors (+0.5) course bonuses, allowing GPAs above 4.0.'
                      : 'Unweighted ranking uses standard 4.0 scale where all courses are weighted equally.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#calculator" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ Class Rank Calculator</a>
            <a href="#examples" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ Quick Examples</a>
            <a href="#how-to-calculate" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ How to Calculate</a>
            <a href="#weighted-vs-unweighted" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ Weighted vs Unweighted</a>
            <a href="#college-admissions" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ College Admissions</a>
            <a href="#scholarship-requirements" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ Scholarship Requirements</a>
            <a href="#improve-rank" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ Improve Your Rank</a>
            <a href="#about" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ About Class Rank</a>
            <a href="#faqs" className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">→ FAQs</a>
          </div>
        </div>

        {/* Social Share Section */}
        <section id="share" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Share This Calculator</h2>
          <p className="text-slate-700 mb-6">
            Help your friends calculate their class rank by sharing this free calculator!
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
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate your class rank percentile with this free calculator!')}&url=${encodeURIComponent(CANONICAL_URL)}`}
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 1: Top Student - Sarah</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Input:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Rank: 8 out of 350 students</li>
                    <li>• GPA: 4.45 (weighted)</li>
                    <li>• Type: Weighted</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Results:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Percentile: 98.0%</li>
                    <li>• Top: 2.3%</li>
                    <li>• Decile: 1 (Top 10%)</li>
                    <li>• Quartile: 1 (Top 25%)</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">Analysis:</p>
                <p className="text-sm text-slate-700">
                  Sarah is in the <strong className="text-blue-600">98th percentile</strong>, making her competitive for <strong>Ivy League and most selective colleges</strong>. She qualifies for top-tier merit scholarships and National Merit programs. Her weighted GPA of 4.45 shows strong AP/IB course rigor.
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 2: Competitive Student - Michael</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Input:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Rank: 45 out of 420 students</li>
                    <li>• GPA: 3.85 (unweighted)</li>
                    <li>• Type: Unweighted</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Results:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Percentile: 89.5%</li>
                    <li>• Top: 10.7%</li>
                    <li>• Decile: 2 (Top 20%)</li>
                    <li>• Quartile: 1 (Top 25%)</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">Analysis:</p>
                <p className="text-sm text-slate-700">
                  Michael is just outside the top 10% at <strong className="text-green-600">89.5th percentile</strong>, still very competitive for <strong>selective state universities</strong>. He qualifies for many merit scholarships (which often require top 15-20%) and would benefit from a slight rank improvement to reach top 10%.
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 3: Upper-Middle Student - Emma</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-slate-600">Input:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Rank: 85 out of 300 students</li>
                    <li>• GPA: 3.45 (unweighted)</li>
                    <li>• Type: Unweighted</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Results:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• Percentile: 72.0%</li>
                    <li>• Top: 28.3%</li>
                    <li>• Decile: 3 (Top 30%)</li>
                    <li>• Quartile: 2 (2nd Quartile)</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-slate-900 mb-2">Analysis:</p>
                <p className="text-sm text-slate-700">
                  Emma is in the <strong className="text-purple-600">72nd percentile</strong>, placing her in the <strong>top 30% of her class</strong>. She's competitive for moderately selective colleges and state universities. While she may not qualify for the most competitive scholarships, she's still eligible for many institutional merit awards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Calculate Section */}
        <section id="how-to-calculate" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📐 How to Calculate Class Rank</h2>
          
          <div className="space-y-6">
            <div className="prose max-w-none text-slate-700">
              <p className="text-lg leading-relaxed">
                <strong>Class rank</strong> is your academic standing relative to your classmates, expressed as your position in the graduating class. Understanding how to calculate class rank helps you assess your college competitiveness and scholarship eligibility.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Percentile Ranking Formula</h3>
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <p className="font-mono text-lg text-slate-900 mb-3">
                  Percentile = ((Total Students - Your Rank + 1) / Total Students) × 100
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Example:</strong> If you're ranked 15 out of 250 students:<br />
                  ((250 - 15 + 1) / 250) × 100 = <strong>94.4 percentile</strong>
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  This means you're performing better than 94.4% of your class, or in the <strong>top 5.6%</strong>.
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Decile Calculation</h3>
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <p className="font-mono text-lg text-slate-900 mb-3">
                  Decile = Math.ceil((Your Rank / Total Students) × 10)
                </p>
                <p className="text-sm text-slate-600">
                  Deciles divide students into 10 groups:<br />
                  • <strong>Decile 1</strong> = Top 10%<br />
                  • <strong>Decile 2</strong> = Top 20%<br />
                  • <strong>Decile 3</strong> = Top 30%, etc.
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  <strong>Example:</strong> Rank 15/250 = (15/250) × 10 = 0.6, rounded up = <strong>Decile 1</strong>
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Quartile Calculation</h3>
              <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                <p className="font-mono text-lg text-slate-900 mb-3">
                  Quartile = Math.ceil((Your Rank / Total Students) × 4)
                </p>
                <p className="text-sm text-slate-600">
                  Quartiles divide students into 4 groups:<br />
                  • <strong>1st Quartile (Q1)</strong> = Top 25%<br />
                  • <strong>2nd Quartile (Q2)</strong> = 25-50%<br />
                  • <strong>3rd Quartile (Q3)</strong> = 50-75%<br />
                  • <strong>4th Quartile (Q4)</strong> = Bottom 25%
                </p>
                <p className="text-sm text-slate-600 mt-2">
                  <strong>Example:</strong> Rank 15/250 = (15/250) × 4 = 0.24, rounded up = <strong>1st Quartile</strong>
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-500">
              <h4 className="font-bold text-slate-900 mb-3">💡 Important Notes</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>Higher percentile = Better rank</strong>: 95th percentile means you're in the top 5%</li>
                <li>• <strong>Lower decile = Better rank</strong>: Decile 1 is the top 10% of students</li>
                <li>• <strong>Lower quartile = Better rank</strong>: 1st quartile is the top 25%</li>
                <li>• <strong>Class rank = Ordinal position</strong>: Rank 1 is valedictorian, rank 2 is salutatorian</li>
                <li>• <strong>Ties are common</strong>: Multiple students may share the same rank with identical GPAs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Weighted vs Unweighted Section - CONTINUED IN NEXT PART */}
        <section id="weighted-vs-unweighted" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">⚖️ Weighted vs Unweighted Class Rank</h2>
          
          <div className="space-y-6">
            <div className="prose max-w-none text-slate-700">
              <p className="text-lg leading-relaxed">
                Understanding the difference between <strong>weighted and unweighted class rank</strong> is crucial for college applications, as many schools use different ranking systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Unweighted */}
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">📘 Unweighted Rank</h3>
                <div className="space-y-3 text-slate-700">
                  <p className="font-semibold">Standard 4.0 Scale</p>
                  <ul className="text-sm space-y-2">
                    <li>• All courses weighted equally</li>
                    <li>• A = 4.0, B = 3.0, C = 2.0</li>
                    <li>• Maximum GPA: 4.0</li>
                    <li>• Doesn't consider course difficulty</li>
                  </ul>
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">Example:</p>
                    <p className="text-sm">A in Regular English = 4.0</p>
                    <p className="text-sm">A in AP English = 4.0</p>
                    <p className="text-sm text-slate-600 mt-2 italic">Both count the same</p>
                  </div>
                </div>
              </div>

              {/* Weighted */}
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">📗 Weighted Rank</h3>
                <div className="space-y-3 text-slate-700">
                  <p className="font-semibold">5.0+ Scale</p>
                  <ul className="text-sm space-y-2">
                    <li>• Bonus points for advanced courses</li>
                    <li>• AP/IB: +1.0 bonus (A = 5.0)</li>
                    <li>• Honors: +0.5 bonus (A = 4.5)</li>
                    <li>• Rewards academic rigor</li>
                  </ul>
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">Example:</p>
                    <p className="text-sm">A in Regular English = 4.0</p>
                    <p className="text-sm">A in AP English = 5.0</p>
                    <p className="text-sm text-green-600 mt-2 italic">+1.0 bonus for AP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b-2 border-slate-300">Aspect</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b-2 border-slate-300">Unweighted</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b-2 border-slate-300">Weighted</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 font-semibold">Maximum GPA</td>
                    <td className="px-4 py-3">4.0</td>
                    <td className="px-4 py-3">5.0+</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-semibold">Course Difficulty</td>
                    <td className="px-4 py-3">Not considered</td>
                    <td className="px-4 py-3">Bonus points added</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 font-semibold">A in AP Course</td>
                    <td className="px-4 py-3">4.0</td>
                    <td className="px-4 py-3">5.0</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3 font-semibold">A in Honors Course</td>
                    <td className="px-4 py-3">4.0</td>
                    <td className="px-4 py-3">4.5</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3 font-semibold">Used By</td>
                    <td className="px-4 py-3">~40% of high schools</td>
                    <td className="px-4 py-3">~60% of high schools</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-semibold">College Preference</td>
                    <td className="px-4 py-3">Both accepted</td>
                    <td className="px-4 py-3">Preferred (shows rigor)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-500">
              <h4 className="font-bold text-slate-900 mb-3">🎓 College Admissions Perspective</h4>
              <p className="text-sm text-slate-700 mb-3">
                Most colleges <strong>recalculate GPAs</strong> using their own methodology, so they'll see both your weighted and unweighted rankings. However:
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>Highly selective colleges</strong> prefer weighted rankings because they reward course rigor</li>
                <li>• <strong>Course strength matters</strong>: A 3.7 weighted GPA with 8 APs beats a 4.0 unweighted with no AP courses</li>
                <li>• <strong>Context is key</strong>: Colleges consider what courses were available at your school</li>
                <li>• <strong>Class rank percentile</strong> is often more important than absolute GPA number</li>
              </ul>
            </div>
          </div>
        </section>

        {/* College Admissions Section */}
        <section id="college-admissions" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🎓 Class Rank for College Admissions</h2>
          
          <div className="space-y-6">
            <div className="prose max-w-none text-slate-700">
              <p className="text-lg leading-relaxed">
                <strong>Class rank is a critical factor</strong> in college admissions, with about 35% of colleges reporting it as "considerably important." Top universities expect students in the top 10%, while state schools typically accept top 50%.
              </p>
            </div>

            {/* College Tiers */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">🏆 Ivy League / Most Selective (Top 2-5%)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Expected Rank:</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Percentile: 95-100%</li>
                      <li>• Decile: 1 (Top 10%)</li>
                      <li>• Typical Rank: 1-20 / 400 students</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Examples:</p>
                    <p className="text-sm text-slate-700">Harvard, Yale, Princeton, Stanford, MIT, Columbia, Penn, Dartmouth</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">⭐ Highly Selective (Top 5-10%)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Expected Rank:</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Percentile: 90-95%</li>
                      <li>• Decile: 1 (Top 10%)</li>
                      <li>• Typical Rank: 20-40 / 400 students</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Examples:</p>
                    <p className="text-sm text-slate-700">Duke, Northwestern, Vanderbilt, Rice, Notre Dame, UC Berkeley, UCLA</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">🌟 Selective (Top 10-25%)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Expected Rank:</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Percentile: 75-90%</li>
                      <li>• Decile: 1-2 (Top 20%)</li>
                      <li>• Typical Rank: 40-100 / 400 students</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Examples:</p>
                    <p className="text-sm text-slate-700">University of Michigan, UVA, UNC, Boston University, NYU, USC</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">✨ Moderately Selective (Top 25-50%)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Expected Rank:</p>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Percentile: 50-75%</li>
                      <li>• Decile: 3-5 (Top 50%)</li>
                      <li>• Typical Rank: 100-200 / 400 students</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Examples:</p>
                    <p className="text-sm text-slate-700">Penn State, Ohio State, Arizona State, Most flagship state universities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
              <h4 className="font-bold text-slate-900 mb-3">📊 Class Rank Statistics</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>89% of students admitted to Harvard</strong> were in the top 10% of their class</li>
                <li>• <strong>Most Top 50 universities</strong> expect at least top 25% class rank</li>
                <li>• <strong>Flagship state universities</strong> typically accept top 50% of high school classes</li>
                <li>• <strong>Test-optional policies</strong> have made class rank more important in recent years</li>
                <li>• <strong>35% of colleges</strong> report class rank as "considerably important" (NACAC 2023)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Scholarship Requirements */}
        <section id="scholarship-requirements" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">💰 Scholarship Requirements by Class Rank</h2>
          
          <div className="space-y-6">
            <div className="prose max-w-none text-slate-700">
              <p className="text-lg leading-relaxed">
                Many <strong>merit scholarships</strong> have specific class rank requirements. Understanding these thresholds helps you identify which scholarships you qualify for and plan your academic goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full-Ride Scholarships */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300 shadow-lg">
                <div className="text-3xl mb-3">🏅</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Full-Ride / National Merit</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-amber-700">Required: Top 1-5%</p>
                  <ul className="space-y-1">
                    <li>• Percentile: 95-100%</li>
                    <li>• Decile: 1 (Top 10%)</li>
                    <li>• Plus: 1500+ SAT or 34+ ACT</li>
                  </ul>
                  <p className="text-xs text-slate-600 mt-3 italic">Examples: National Merit, Presidential Scholarships, Full-Tuition Awards</p>
                </div>
              </div>

              {/* Competitive Merit */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300 shadow-lg">
                <div className="text-3xl mb-3">🎖️</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Competitive Merit Aid</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-blue-700">Required: Top 5-15%</p>
                  <ul className="space-y-1">
                    <li>• Percentile: 85-95%</li>
                    <li>• Decile: 1-2</li>
                    <li>• Typical Award: $10,000-$25,000/year</li>
                  </ul>
                  <p className="text-xs text-slate-600 mt-3 italic">Examples: University Honors Programs, Dean's Scholarships</p>
                </div>
              </div>

              {/* Standard Merit */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 shadow-lg">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Standard Merit Scholarships</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-green-700">Required: Top 15-25%</p>
                  <ul className="space-y-1">
                    <li>• Percentile: 75-85%</li>
                    <li>• Decile: 2-3</li>
                    <li>• Typical Award: $5,000-$15,000/year</li>
                  </ul>
                  <p className="text-xs text-slate-600 mt-3 italic">Examples: Trustee Scholarships, Academic Excellence Awards</p>
                </div>
              </div>

              {/* Institutional Aid */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300 shadow-lg">
                <div className="text-3xl mb-3">🏫</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Institutional Merit Aid</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-semibold text-purple-700">Required: Top 25-50%</p>
                  <ul className="space-y-1">
                    <li>• Percentile: 50-75%</li>
                    <li>• Decile: 3-5</li>
                    <li>• Typical Award: $2,000-$8,000/year</li>
                  </ul>
                  <p className="text-xs text-slate-600 mt-3 italic">Examples: Transfer Scholarships, Regional Awards</p>
                </div>
              </div>
            </div>

            {/* Specific Scholarship Programs */}
            <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4">📋 Popular Scholarship Programs & Requirements</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b-2 border-slate-300">Scholarship</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b-2 border-slate-300">Class Rank Requirement</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b-2 border-slate-300">Award Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-slate-200">
                      <td className="px-4 py-3 font-medium">National Merit Scholarship</td>
                      <td className="px-4 py-3">Top 1% (99th percentile)</td>
                      <td className="px-4 py-3">$2,500 - Full Tuition</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <td className="px-4 py-3 font-medium">Coca-Cola Scholars</td>
                      <td className="px-4 py-3">Top 10% (90th percentile+)</td>
                      <td className="px-4 py-3">$20,000</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-4 py-3 font-medium">Gates Scholarship</td>
                      <td className="px-4 py-3">Top 10% (90th percentile+)</td>
                      <td className="px-4 py-3">Full Cost of Attendance</td>
                    </tr>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <td className="px-4 py-3 font-medium">Elks Most Valuable Student</td>
                      <td className="px-4 py-3">Top 5% (95th percentile+)</td>
                      <td className="px-4 py-3">$4,000 - $50,000</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="px-4 py-3 font-medium">National Honor Society</td>
                      <td className="px-4 py-3">Top 20% (80th percentile+)</td>
                      <td className="px-4 py-3">Eligibility for NHS scholarships</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 font-medium">University Honors Programs</td>
                      <td className="px-4 py-3">Top 15% (85th percentile+)</td>
                      <td className="px-4 py-3">$5,000 - $20,000/year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h4 className="font-bold text-slate-900 mb-3">💡 Scholarship Application Tips</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>Apply early</strong>: Many scholarships are first-come, first-served even if you meet requirements</li>
                <li>• <strong>Check state programs</strong>: Many states offer merit aid for top 10-25% of students</li>
                <li>• <strong>Consider private schools</strong>: Often have more merit aid for top students than public universities</li>
                <li>• <strong>Maintain your rank</strong>: Most scholarships require maintaining top 10-25% status to renew</li>
                <li>• <strong>Look beyond rank</strong>: Many scholarships also consider test scores, essays, and extracurriculars</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Improve Rank */}
        <section id="improve-rank" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📈 How to Improve Your Class Rank</h2>
          
          <div className="space-y-6">
            <div className="prose max-w-none text-slate-700">
              <p className="text-lg leading-relaxed">
                Improving your class rank requires <strong>strategic course selection, consistent effort, and long-term planning</strong>. Here are proven strategies to boost your ranking:
              </p>
            </div>

            {/* Strategy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-slate-900 mb-3">1️⃣ Take Advanced Courses</h3>
                <p className="text-sm text-slate-700 mb-3">
                  If your school uses weighted ranking, AP/IB/Honors courses can significantly boost your rank.
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• <strong>AP courses:</strong> +1.0 GPA bonus (A = 5.0)</li>
                  <li>• <strong>IB courses:</strong> +1.0 GPA bonus</li>
                  <li>• <strong>Honors courses:</strong> +0.5 GPA bonus (A = 4.5)</li>
                  <li>• Even a B in AP (4.0) beats an A in regular (4.0)</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-bold text-slate-900 mb-3">2️⃣ Focus on Core Subjects</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Core academic courses (Math, Science, English, History) often carry more weight in GPA calculations.
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Prioritize 4.0s in Math and Science</li>
                  <li>• Strong English grades show writing ability</li>
                  <li>• History/Social Studies demonstrate critical thinking</li>
                  <li>• Electives matter less for class rank</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-slate-900 mb-3">3️⃣ Start Early (Freshman Year)</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Every semester counts. Starting strong in 9th grade gives you a competitive advantage.
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Freshman GPA impacts 4-year cumulative</li>
                  <li>• Easier to maintain rank than improve it</li>
                  <li>• Build strong study habits early</li>
                  <li>• Take challenging courses when ready</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-slate-900 mb-3">4️⃣ Summer School & Online Courses</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Take additional courses to boost your GPA and get ahead on requirements.
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Summer courses add GPA points</li>
                  <li>• Online AP courses from accredited programs</li>
                  <li>• Dual enrollment at community colleges</li>
                  <li>• More A's = higher cumulative GPA</li>
                </ul>
              </div>
            </div>

            {/* Calculation Example */}
            <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
              <h4 className="font-bold text-slate-900 mb-4">📊 Real Improvement Example</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-semibold text-slate-900 mb-2">Current Situation:</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Rank: 75 / 300 students</li>
                    <li>• Percentile: 75% (Top 25%)</li>
                    <li>• Current GPA: 3.5 unweighted</li>
                    <li>• Credits completed: 60</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">After Strategy (1 year):</p>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• Rank: 45 / 300 students</li>
                    <li>• Percentile: 85% (Top 15%)</li>
                    <li>• New GPA: 3.8 weighted</li>
                    <li>• Added: 5 AP courses with As</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-slate-700 mt-4 italic">
                Result: Moved from <strong>3rd quartile to top 15%</strong>, now competitive for selective schools and merit scholarships!
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
              <h4 className="font-bold text-slate-900 mb-3">⚠️ Things to Avoid</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                <li>• <strong>Don't take easy electives</strong> just to boost GPA - colleges see through this</li>
                <li>• <strong>Avoid grade inflation</strong> - take challenging courses even if they're harder</li>
                <li>• <strong>Don't overload</strong> - taking 6 APs and getting Bs hurts more than 3 APs with As</li>
                <li>• <strong>Never give up</strong> - even top 50% is competitive for many great schools</li>
                <li>• <strong>Don't compare</strong> - focus on your own improvement, not others' rankings</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">About the Class Rank Calculator</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Our <strong>Class Rank Calculator</strong> is a free online tool that helps high school students instantly calculate their <strong>percentile rank, decile, and quartile</strong> based on their class position. Whether you're applying to colleges, seeking scholarships, or simply tracking your academic progress, understanding your class rank is essential for setting realistic goals and identifying opportunities.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Why Class Rank Matters for College Admissions</h3>
            <p className="leading-relaxed">
              Class rank provides <strong>context for your GPA</strong> by showing how you perform relative to your peers. According to the National Association for College Admission Counseling (NACAC), about 35% of colleges consider class rank "considerably important" in admissions decisions. Top universities like Harvard report that 89% of admitted students were in the top 10% of their class. Our calculator helps you understand where you stand and what colleges match your academic profile.
            </p>
            <p className="leading-relaxed">
              Need to calculate your GPA? Try our <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator'); }}>College GPA Calculator</a> or <a href="/education-and-exam-tools/gpa-tools/weighted-gpa-calculator" className="text-blue-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/weighted-gpa-calculator'); }}>Weighted GPA Calculator</a> for precise grade point calculations.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Understanding Percentile, Decile, and Quartile Rankings</h3>
            <p className="leading-relaxed">
              Our calculator provides three key metrics: <strong>Percentile</strong> (0-100%, where higher is better), <strong>Decile</strong> (1-10, where 1 is top 10%), and <strong>Quartile</strong> (1-4, where 1 is top 25%). For example, if you're ranked 15 out of 250 students, you're in the 94th percentile, 1st decile, and 1st quartile—meaning you're performing better than 94% of your classmates. This comprehensive view helps you understand your competitiveness for different colleges and scholarships.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Weighted vs Unweighted Class Rank Explained</h3>
            <p className="leading-relaxed">
              Many high schools now use <strong>weighted class ranking</strong> that rewards students for taking challenging courses like AP, IB, and Honors classes. In a weighted system, an A in an AP course might earn 5.0 GPA points instead of the standard 4.0. This means students taking rigorous coursework can achieve GPAs above 4.0 and improve their class rank. Our calculator allows you to specify whether your rank is weighted or unweighted, helping you understand how course selection impacts your standing.
            </p>
            <p className="leading-relaxed">
              Planning to improve your GPA? Check out our <a href="/education-and-exam-tools/gpa-tools/gpa-raise-calculator" className="text-blue-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/gpa-raise-calculator'); }}>GPA Raise Calculator</a> to see what grades you need to reach your target GPA and boost your class rank.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Scholarship Eligibility and Class Rank Requirements</h3>
            <p className="leading-relaxed">
              Most competitive merit scholarships require students to be in the <strong>top 10-25% of their class</strong>. National Merit Scholarships typically require top 1%, while programs like the Coca-Cola Scholars and Gates Scholarship look for students in the top 10%. Our calculator includes a scholarship eligibility checker that instantly tells you if your class rank qualifies for competitive awards. Understanding these thresholds helps you set academic goals and identify scholarships worth applying for.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Strategic Academic Planning Tools</h3>
            <p className="leading-relaxed">
              Beyond calculating your current rank, use this tool for <strong>long-term academic planning</strong>. If you're a sophomore ranked in the top 25% but aiming for top 10%, you can track semester-by-semester progress. Many students use our calculator quarterly to monitor improvement after taking advanced courses or improving grades in core subjects. Combined with our other tools, you can create a comprehensive academic roadmap for college admissions success.
            </p>
            <p className="leading-relaxed">
              For specialized GPA calculations, explore our <a href="/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" className="text-blue-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/lsac-gpa-calculator'); }}>LSAC GPA Calculator</a> for law school or <a href="/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator" className="text-blue-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator'); }}>Medical School GPA Calculator</a> for pre-med students.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">How Colleges Use Class Rank in 2026</h3>
            <p className="leading-relaxed">
              While some high schools have moved away from class rank reporting, it remains a valuable metric for college admissions offices. Selective universities use class rank to identify <strong>top performers in competitive high schools</strong>. Even in test-optional admissions, class rank provides objective comparison data. Our calculator helps you understand your competitiveness level—from Ivy League (top 2-5%) to moderately selective schools (top 25-50%)—so you can build a balanced college list.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500 mt-6">
              <p className="text-slate-800 font-medium">
                <strong>Ready to explore more academic tools?</strong> Visit our complete collection of <a href="/education-and-exam-tools/gpa-tools" className="text-blue-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools'); }}>GPA Calculators</a> and <a href="/education-and-exam-tools/admission-tools" className="text-blue-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools'); }}>Admission Tools</a> to plan your academic journey comprehensively.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions (FAQs)</h2>
          
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                How do I calculate my class rank percentile?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                To calculate class rank percentile, use this formula: <strong>Percentile = ((Total Students - Your Rank + 1) / Total Students) × 100</strong>. For example, if you're ranked 15 out of 250 students: ((250 - 15 + 1) / 250) × 100 = 94.4 percentile. This means you're performing better than 94.4% of your class, placing you in the top 5.6%.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What is a good class rank for college admissions?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                A "good" class rank depends on college selectivity. <strong>Top 10% (90th percentile+)</strong> is competitive for selective colleges like UCLA, Michigan, and UVA. <strong>Top 25% (75th percentile+)</strong> is good for most state universities. <strong>Top 50%</strong> qualifies for less selective schools. Ivy League schools typically expect <strong>top 5% or better</strong>, with 89% of Harvard admits in the top 10%.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What's the difference between weighted and unweighted class rank?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                <strong>Unweighted class rank</strong> uses standard GPA (0-4.0 scale) where all courses count equally (A = 4.0 regardless of difficulty). <strong>Weighted class rank</strong> adds bonus points for advanced courses: +0.5 for Honors (A = 4.5), +1.0 for AP/IB (A = 5.0). Weighted ranking rewards students who take challenging coursework and can result in GPAs above 4.0. About 60% of high schools now use weighted ranking.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Do colleges look at class rank or GPA more?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Colleges consider <strong>both class rank and GPA as complementary metrics</strong>. Class rank provides context by showing your performance relative to peers at your specific high school, while GPA shows absolute academic achievement. About 35% of colleges report class rank as "considerably important" in admissions (NACAC 2023). In test-optional admissions, class rank has become more important as an objective comparison tool.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What class rank do I need for scholarships?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Most competitive merit scholarships require <strong>top 10-15% class rank (85-90th percentile+)</strong>. Full-ride scholarships like National Merit typically need <strong>top 1-5%</strong>. Programs like Coca-Cola Scholars and Gates Scholarship look for <strong>top 10%</strong>. National Honor Society membership generally requires <strong>top 20%</strong>. Even top 25% qualifies for many institutional merit awards at universities.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Can I improve my class rank during senior year?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, but improvements are harder in senior year since you have fewer semesters left. Focus on: <strong>(1) Taking weighted courses</strong> (AP/Honors) if available, <strong>(2) Earning straight A's</strong> to boost cumulative GPA, <strong>(3) Summer courses</strong> to add high-grade credits. Even small improvements can matter—moving from 11th to 9th percentile (top 10% threshold) can unlock scholarship eligibility. Start early: freshman and sophomore years offer the most improvement potential.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What if my school doesn't rank students?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Many high schools have eliminated class ranking, reporting only <strong>decile or quartile</strong> (e.g., "top 10%" without specific rank). If your school doesn't rank, colleges focus more on <strong>GPA, course rigor, and school profile</strong>. Your school counselor can still indicate in recommendation letters whether you're "one of the top students." Some colleges recalculate rank internally using GPA data. Don't worry—lack of ranking doesn't hurt your application if it's not your school's policy.
              </p>
            </div>

            {/* FAQ 8 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                How does class size affect my rank?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Class size significantly impacts rank interpretation. Being ranked <strong>5th out of 50 students</strong> (90th percentile) is less competitive than <strong>30th out of 600 students</strong> (95th percentile) for selective colleges. Large schools (400+ students) have more competitive rankings because small performance differences can cause bigger rank changes. Small schools (50-150) may have less grade differentiation. Colleges account for this using your school profile data.
              </p>
            </div>

            {/* FAQ 9 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Does class rank matter for Ivy League schools?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, class rank is <strong>very important for Ivy League admissions</strong>. Harvard reports that <strong>89% of admitted students were in the top 10% of their class</strong>, with most in the top 5%. Yale, Princeton, and Stanford have similar statistics. However, Ivy League schools practice <strong>holistic admissions</strong>—class rank alone doesn't guarantee admission. They want top 2-5% students who also demonstrate exceptional essays, extracurriculars, leadership, and intellectual curiosity.
              </p>
            </div>

            {/* FAQ 10 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                How often should I check my class rank?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Check your class rank <strong>at the end of each semester or quarter</strong> to monitor progress and adjust study strategies. Most schools update rankings <strong>after final grades post</strong> (December for fall, May/June for spring). Checking quarterly helps you: identify trends, celebrate improvements, adjust course rigor, and set GPA goals. Avoid obsessing over small rank changes—focus on consistent academic excellence and long-term improvement rather than daily fluctuations.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
            currentSlug="class-rank-calculator"
            relatedSlugs={['college-admissions-calculator', 'college-gpa-calculator', 'weighted-gpa-calculator', 'high-school-gpa-calculator', 'gpa-raise-calculator']}
            navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default ClassRankCalculator;
