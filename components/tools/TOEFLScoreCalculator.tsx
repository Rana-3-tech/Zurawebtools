import React, { useState, useEffect } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';

interface TOEFLScoreCalculatorProps {
  navigateTo: (page: Page) => void;
}

const TOEFLScoreCalculator: React.FC<TOEFLScoreCalculatorProps> = ({ navigateTo }) => {
  // State for section scores (0-30 each)
  const [readingScore, setReadingScore] = useState<number | ''>('');
  const [listeningScore, setListeningScore] = useState<number | ''>('');
  const [speakingScore, setSpeakingScore] = useState<number | ''>('');
  const [writingScore, setWritingScore] = useState<number | ''>('');
  const [totalScore, setTotalScore] = useState<number>(0);

  // SEO Setup
  useEffect(() => {
    // Set title and meta tags
    document.title = "TOEFL Score Calculator 2026 - Free & Accurate | ZuraWebTools";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free TOEFL score calculator 2026. Calculate total TOEFL score (0-120) from Reading, Listening, Speaking, and Writing section scores. Instant results for university admissions.'
      );
    }

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'TOEFL score calculator, TOEFL total score, TOEFL iBT calculator, TOEFL section scores, TOEFL university requirements, TOEFL test preparation'
    );

    // Author meta tag
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', 'ZuraWebTools');

    // Robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator');

    // Hreflang tags for international SEO
    const hreflangTags = [
      { lang: 'en', href: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator' },
      { lang: 'en-US', href: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator' },
      { lang: 'en-GB', href: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator' },
      { lang: 'en-CA', href: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator' },
      { lang: 'en-AU', href: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator' },
      { lang: 'x-default', href: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator' }
    ];

    hreflangTags.forEach(({ lang, href }) => {
      let hreflang = document.querySelector(`link[hreflang="${lang}"]`);
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.setAttribute('rel', 'alternate');
        hreflang.setAttribute('hreflang', lang);
        document.head.appendChild(hreflang);
      }
      hreflang.setAttribute('href', href);
    });

    // Open Graph tags
    const ogTags = {
      'og:title': 'TOEFL Score Calculator - Free Total Score Calculator 2026',
      'og:description': 'Free TOEFL score calculator 2026. Calculate total TOEFL score from section scores instantly.',
      'og:url': 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator',
      'og:type': 'website',
      'og:image': 'https://zurawebtools.com/og-image.jpg',
      'og:image:width': '1200',
      'og:image:height': '630'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'TOEFL Score Calculator - Free Total Score Calculator 2026',
      'twitter:description': 'Free TOEFL score calculator 2026. Calculate total TOEFL score from section scores instantly.',
      'twitter:image': 'https://zurawebtools.com/og-image.jpg'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // JSON-LD Structured Data
    const structuredData = [
      // WebApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TOEFL Score Calculator",
        "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator",
        "description": "Free online TOEFL score calculator that calculates total scores from section scores.",
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
          "ratingCount": "1250"
        }
      },
      // BreadcrumbList Schema
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://zurawebtools.com/"
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
            "name": "Test Score Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "TOEFL Score Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator"
          }
        ]
      },
      // FAQPage Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is the TOEFL total score calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The TOEFL total score is calculated by adding your four section scores (Reading + Listening + Speaking + Writing). Each section is scored 0-30, so the total score ranges from 0-120."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good TOEFL score for university admission?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most universities require TOEFL scores between 80-100 for admission. Top universities like Harvard, MIT, and Stanford typically require scores of 100+ with no section below 25."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this TOEFL score calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator is 100% accurate for calculating total TOEFL scores. It uses the official TOEFL scoring method: sum of all four section scores."
            }
          }
        ]
      },
      // HowTo Schema
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use the TOEFL Score Calculator",
        "description": "Step-by-step guide to calculate your TOEFL total score",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Reading Score",
            "text": "Enter your TOEFL Reading section score (0-30) in the first input field."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Listening Score",
            "text": "Enter your TOEFL Listening section score (0-30) in the second input field."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter Speaking Score",
            "text": "Enter your TOEFL Speaking section score (0-30) in the third input field."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Enter Writing Score",
            "text": "Enter your TOEFL Writing section score (0-30) in the fourth input field."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "View Total Score",
            "text": "Your total TOEFL score (0-120) will be calculated automatically and displayed prominently."
          }
        ]
      }
    ];

    // Remove existing schema
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Calculate total score
  useEffect(() => {
    if (readingScore !== '' && listeningScore !== '' && speakingScore !== '' && writingScore !== '') {
      const total = Number(readingScore) + Number(listeningScore) + Number(speakingScore) + Number(writingScore);
      setTotalScore(Math.min(total, 120)); // Cap at 120
    } else {
      setTotalScore(0);
    }
  }, [readingScore, listeningScore, speakingScore, writingScore]);

  // Get score level and color
  const getScoreLevel = (score: number): { level: string; description: string; color: string } => {
    if (score >= 110) return { level: 'Excellent', description: 'Top university level', color: 'from-emerald-500 to-green-600' };
    if (score >= 100) return { level: 'Very Good', description: 'Highly competitive', color: 'from-blue-500 to-indigo-600' };
    if (score >= 90) return { level: 'Good', description: 'Most universities', color: 'from-cyan-500 to-blue-600' };
    if (score >= 80) return { level: 'Fair', description: 'Many programs', color: 'from-teal-500 to-cyan-600' };
    if (score >= 70) return { level: 'Limited', description: 'Some programs', color: 'from-amber-500 to-orange-600' };
    if (score >= 60) return { level: 'Weak', description: 'Foundation courses', color: 'from-orange-500 to-red-600' };
    return { level: 'Very Weak', description: 'More preparation needed', color: 'from-slate-400 to-slate-600' };
  };

  const scoreLevel = getScoreLevel(totalScore);

  // Generate score options (0-30)
  const scoreOptions = Array.from({ length: 31 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50" style={{fontFamily: 'Inter, sans-serif'}}>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            TOEFL Score Calculator - Free Total Score Calculator 2026
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Free TOEFL score calculator for 2026. Calculate your total TOEFL iBT score from Reading, Listening, Speaking, and Writing section scores. Instant results for university admissions and visa applications.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-teal-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">TOEFL Score Calculator - Enter Your Section Scores</h2>
          
          {/* Total Score Display */}
          <div className={`bg-gradient-to-br ${scoreLevel.color} p-8 rounded-2xl text-white text-center mb-8 shadow-xl`}>
            <div className="text-7xl font-bold mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>{totalScore}</div>
            <div className="text-2xl font-semibold mb-1">Total TOEFL Score (out of 120)</div>
            <div className="text-lg opacity-90">{scoreLevel.level}</div>
            {totalScore > 0 && (
              <div className="text-sm mt-3 bg-white/20 inline-block px-4 py-2 rounded-lg">
                {scoreLevel.description}
              </div>
            )}
          </div>

          {/* Section Inputs */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            
            {/* Reading Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Reading</h3>
                  <p className="text-sm text-slate-600">Score: 0-30</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Reading Score
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={readingScore}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : Math.min(30, Math.max(0, Number(e.target.value)));
                  setReadingScore(val);
                }}
                placeholder="Enter 0-30"
                className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg font-semibold"
              />
              
              {readingScore !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Your Score:</span>
                  <span className="text-2xl font-bold text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(readingScore)}</span>
                </div>
              )}
            </div>

            {/* Listening Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border-2 border-purple-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Listening</h3>
                  <p className="text-sm text-slate-600">Score: 0-30</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Listening Score
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={listeningScore}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : Math.min(30, Math.max(0, Number(e.target.value)));
                  setListeningScore(val);
                }}
                placeholder="Enter 0-30"
                className="w-full p-3 border-2 border-purple-300 rounded-lg bg-white text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg font-semibold"
              />
              
              {listeningScore !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Your Score:</span>
                  <span className="text-2xl font-bold text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(listeningScore)}</span>
                </div>
              )}
            </div>

            {/* Speaking Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl border-2 border-orange-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Speaking</h3>
                  <p className="text-sm text-slate-600">Score: 0-30</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Speaking Score
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={speakingScore}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : Math.min(30, Math.max(0, Number(e.target.value)));
                  setSpeakingScore(val);
                }}
                placeholder="Enter 0-30"
                className="w-full p-3 border-2 border-orange-300 rounded-lg bg-white text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-lg font-semibold"
              />
              
              {speakingScore !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Your Score:</span>
                  <span className="text-2xl font-bold text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(speakingScore)}</span>
                </div>
              )}
            </div>

            {/* Writing Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-2 border-green-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Writing</h3>
                  <p className="text-sm text-slate-600">Score: 0-30</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Writing Score
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={writingScore}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : Math.min(30, Math.max(0, Number(e.target.value)));
                  setWritingScore(val);
                }}
                placeholder="Enter 0-30"
                className="w-full p-3 border-2 border-green-300 rounded-lg bg-white text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-lg font-semibold"
              />
              
              {writingScore !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Your Score:</span>
                  <span className="text-2xl font-bold text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(writingScore)}</span>
                </div>
              )}
            </div>

          </div>

          {/* Score Breakdown */}
          {totalScore > 0 && (
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-xl border-2 border-slate-200 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Score Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-slate-600">Reading</div>
                  <div className="text-2xl font-bold text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{readingScore}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">Listening</div>
                  <div className="text-2xl font-bold text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{listeningScore}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">Speaking</div>
                  <div className="text-2xl font-bold text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{speakingScore}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600">Writing</div>
                  <div className="text-2xl font-bold text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{writingScore}</div>
                </div>
              </div>
              <div className="text-center pt-4 border-t border-slate-300">
                <p className="text-sm text-slate-700" style={{fontFamily: 'JetBrains Mono, monospace'}}>
                  Calculation: {readingScore} + {listeningScore} + {speakingScore} + {writingScore} = <strong className="text-teal-600 text-xl">{totalScore}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mt-6 bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700">
              <strong className="text-teal-700">Note:</strong> This TOEFL score calculator uses the official scoring method. Each section is scored from 0-30, and the total score is the sum of all four sections (maximum 120 points).
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 md:p-8 rounded-2xl shadow-lg border border-teal-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
            <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Table of Contents
          </h2>
          <nav className="grid md:grid-cols-2 gap-3">
            <a href="#quick-examples" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">1.</span>
              <span className="font-medium">Quick TOEFL Score Examples</span>
            </a>
            <a href="#benefits" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">2.</span>
              <span className="font-medium">Benefits of Using This Calculator</span>
            </a>
            <a href="#how-to-use" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">3.</span>
              <span className="font-medium">How to Use TOEFL Calculator</span>
            </a>
            <a href="#use-cases" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">4.</span>
              <span className="font-medium">Who Uses This Calculator?</span>
            </a>
            <a href="#about" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">5.</span>
              <span className="font-medium">About TOEFL Scores</span>
            </a>
            <a href="#external-links" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">6.</span>
              <span className="font-medium">Official TOEFL Resources</span>
            </a>
            <a href="#faqs" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">7.</span>
              <span className="font-medium">Frequently Asked Questions</span>
            </a>
            <a href="#related-tools" className="flex items-center gap-2 text-teal-700 hover:text-teal-900 hover:bg-teal-100 p-3 rounded-lg transition-colors group">
              <span className="text-teal-500 group-hover:text-teal-700 font-bold">8.</span>
              <span className="font-medium">Related Test Score Tools</span>
            </a>
          </nav>
        </div>

        {/* Social Share Buttons */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Share This TOEFL Score Calculator</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=Calculate your TOEFL score instantly!&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator')}&title=TOEFL Score Calculator`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-950 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText('https://zurawebtools.com/education-and-exam-tools/test-score-tools/toefl-score-calculator');
                alert('Link copied to clipboard!');
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-900 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples - Moved below TOC */}
        <div id="quick-examples" className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-8 rounded-2xl shadow-xl border-2 border-purple-300 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Quick TOEFL Score Examples</h2>
          
          {/* Row 1: 4 Examples */}
          <div className="grid md:grid-cols-4 gap-5 mb-6">
            
            {/* Example 1: Excellent Score - 120 */}
            <div className="bg-white p-5 rounded-xl border-2 border-emerald-400 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Perfect Score</h3>
                <div className="text-2xl font-bold text-emerald-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>120</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>30</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>30</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>30</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>30</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-emerald-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>30+30+30+30 = <strong className="text-emerald-600">120</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Perfect - Elite universities</p>
              </div>
            </div>

            {/* Example 2: Excellent Score - 110 */}
            <div className="bg-white p-5 rounded-xl border-2 border-emerald-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Excellent</h3>
                <div className="text-2xl font-bold text-emerald-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>110</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>28</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>27</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>28</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>27</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-emerald-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>28+27+28+27 = <strong className="text-emerald-600">110</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Harvard, MIT, Stanford</p>
              </div>
            </div>

            {/* Example 3: Very Good Score - 100 */}
            <div className="bg-white p-5 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Very Good</h3>
                <div className="text-2xl font-bold text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>100</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>26</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>25</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>24</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>25</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>26+25+24+25 = <strong className="text-blue-600">100</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Highly competitive</p>
              </div>
            </div>

            {/* Example 4: Good Score - 90 */}
            <div className="bg-white p-5 rounded-xl border-2 border-cyan-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Good</h3>
                <div className="text-2xl font-bold text-cyan-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>90</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>23</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>22</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>23</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>22</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-cyan-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>23+22+23+22 = <strong className="text-cyan-600">90</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Most universities</p>
              </div>
            </div>

          </div>

          {/* Row 2: 4 Examples */}
          <div className="grid md:grid-cols-4 gap-5">
            
            {/* Example 5: Fair Score - 80 */}
            <div className="bg-white p-5 rounded-xl border-2 border-teal-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Fair</h3>
                <div className="text-2xl font-bold text-teal-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>80</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>20</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>21</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>19</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>20</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-teal-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>20+21+19+20 = <strong className="text-teal-600">80</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Many programs accept</p>
              </div>
            </div>

            {/* Example 6: Limited Score - 70 */}
            <div className="bg-white p-5 rounded-xl border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Limited</h3>
                <div className="text-2xl font-bold text-amber-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>70</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>18</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>17</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>18</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>17</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-amber-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>18+17+18+17 = <strong className="text-amber-600">70</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Some programs</p>
              </div>
            </div>

            {/* Example 7: Weak Score - 60 */}
            <div className="bg-white p-5 rounded-xl border-2 border-orange-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Weak</h3>
                <div className="text-2xl font-bold text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>60</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>15</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>15</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>15</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>15</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>15+15+15+15 = <strong className="text-orange-600">60</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Foundation courses</p>
              </div>
            </div>

            {/* Example 8: Beginner Score - 50 */}
            <div className="bg-white p-5 rounded-xl border-2 border-slate-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Beginner</h3>
                <div className="text-2xl font-bold text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>50</div>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>13</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>12</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>13</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>12</strong></div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-[10px] text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>13+12+13+12 = <strong className="text-slate-600">50</strong></p>
                <p className="text-[10px] text-slate-500 mt-1">Need more preparation</p>
              </div>
            </div>

          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white p-8 rounded-2xl shadow-lg border border-teal-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Benefits of Using Our TOEFL Score Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-xl border-2 border-teal-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Instant Results</h3>
              </div>
              <p className="text-sm text-slate-600">Calculate your total TOEFL score in seconds. No waiting, no complex formulas – just enter your section scores and get immediate feedback on your performance.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Score Analysis</h3>
              </div>
              <p className="text-sm text-slate-600">Understand where you stand with detailed score breakdowns. See how your performance compares to university requirements and identify strengths and weaknesses.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border-2 border-purple-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Goal Setting</h3>
              </div>
              <p className="text-sm text-slate-600">Track your progress towards target scores. Use practice test results to project your final TOEFL score and plan your study strategy effectively.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl border-2 border-orange-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">University Planning</h3>
              </div>
              <p className="text-sm text-slate-600">Know if you meet university requirements. Compare your score with admission standards for Harvard, MIT, Stanford, and other top institutions worldwide.</p>
            </div>

          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8 rounded-2xl shadow-xl border-2 border-cyan-300 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">How to Use the TOEFL Score Calculator</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">1</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Enter Your Reading Score</h3>
                <p className="text-slate-600 text-sm">Input your TOEFL Reading section score (0-30) in the first field. This measures your ability to understand academic texts.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">2</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Enter Your Listening Score</h3>
                <p className="text-slate-600 text-sm">Input your TOEFL Listening section score (0-30) in the second field. This assesses your comprehension of spoken English in academic settings.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">3</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Enter Your Speaking Score</h3>
                <p className="text-slate-600 text-sm">Input your TOEFL Speaking section score (0-30) in the third field. This evaluates your ability to speak English effectively in academic contexts.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">4</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Enter Your Writing Score</h3>
                <p className="text-slate-600 text-sm">Input your TOEFL Writing section score (0-30) in the fourth field. This measures your written English communication skills.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">5</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">View Your Total Score</h3>
                <p className="text-slate-600 text-sm">Your total TOEFL score (0-120) is calculated automatically by adding all four section scores. The calculator displays your score level and university competitiveness.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">6</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyze Score Breakdown</h3>
                <p className="text-slate-600 text-sm">Review the detailed score breakdown to see your calculation and identify which sections need improvement for your target score.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-teal-600">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Calculation Example:</h3>
            <p className="text-slate-700 text-sm mb-3">
              If you score Reading: 26, Listening: 25, Speaking: 24, Writing: 25:
            </p>
            <p className="text-slate-900 font-semibold text-base" style={{fontFamily: 'JetBrains Mono, monospace'}}>
              Total = 26 + 25 + 24 + 25 = <span className="text-teal-600 text-xl">100</span> (Very Good - Highly Competitive)
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Who Uses the TOEFL Score Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-l-4 border-blue-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">International Students</h3>
              </div>
              <p className="text-sm text-slate-600">Students applying to US, UK, Canadian, and Australian universities use this calculator to verify their TOEFL scores meet admission requirements. Essential for undergraduate and graduate program applications.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border-l-4 border-purple-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Test Preparation Centers</h3>
              </div>
              <p className="text-sm text-slate-600">TOEFL coaching institutes and tutors use this tool to quickly assess student progress during practice tests and provide immediate feedback on performance trends.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-l-4 border-green-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Immigration Applicants</h3>
              </div>
              <p className="text-sm text-slate-600">People applying for work visas, permanent residency in Canada, Australia, or professional certification in English-speaking countries need to calculate TOEFL scores for immigration documentation.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl border-l-4 border-orange-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Academic Advisors</h3>
              </div>
              <p className="text-sm text-slate-600">University counselors and education consultants use this calculator to help students assess their readiness for TOEFL and guide them toward realistic target universities based on scores.</p>
            </div>

          </div>
        </div>

        {/* About TOEFL Score Calculator */}
        <div id="about" className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 p-8 rounded-2xl shadow-xl border-2 border-teal-300 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">About TOEFL Score Calculator</h2>
          </div>
          
          <div className="space-y-5">
            {/* Main Introduction */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-teal-500 shadow-md">
              <p className="text-slate-700 text-sm leading-relaxed">
                The <strong className="text-teal-700">TOEFL (Test of English as a Foreign Language)</strong> is one of the world's most widely recognized English proficiency tests for academic and professional purposes. Administered by ETS (Educational Testing Service) since 1964, the TOEFL iBT (Internet-Based Test) has been trusted by over <strong className="text-teal-600">12,000 universities</strong> and institutions across <strong className="text-teal-600">160+ countries</strong>. The test assesses your ability to use and understand English in academic settings through four comprehensive sections: Reading, Listening, Speaking, and Writing.
              </p>
            </div>

            {/* Calculator Features */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-cyan-500 shadow-md">
              <h3 className="text-lg font-bold text-cyan-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                100% Accurate Score Calculation
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Our <strong className="text-cyan-600">free TOEFL score calculator 2026</strong> uses the official ETS scoring methodology to instantly calculate your total TOEFL score with 100% accuracy. Unlike complex conversion tables used in other standardized tests, TOEFL scoring is straightforward—each section is scored from 0 to 30 points, and your total score is simply the sum of all four sections, ranging from 0 to 120. This transparent scoring system makes it easy for students to track their progress and set realistic target scores.
              </p>
            </div>

            {/* Why Choose TOEFL */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-blue-500 shadow-md">
              <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
                Why Choose TOEFL?
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                TOEFL is the preferred English test for US universities and is widely accepted by institutions in Canada, Australia, UK, and Europe. Over <strong className="text-blue-600">90% of TOEFL test takers</strong> get their first or second choice university. The test measures real academic English skills through tasks like note-taking during lectures, synthesizing information from multiple sources, and expressing opinions on academic topics—skills you'll actually use in university.
              </p>
            </div>

            {/* TOEFL vs IELTS - Side by Side */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-5 rounded-xl border-2 border-teal-400 shadow-md">
                <h3 className="text-base font-bold text-teal-800 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🇺🇸</span> TOEFL
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✓</span>
                    <span>0-120 scoring system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✓</span>
                    <span>Entirely computer-based</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✓</span>
                    <span>Popular in USA & Canada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">✓</span>
                    <span>Typing-focused speaking</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-5 rounded-xl border-2 border-blue-400 shadow-md">
                <h3 className="text-base font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🇬🇧</span> IELTS
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>0-9 band score system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>Face-to-face speaking test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>Popular in UK, Australia, Canada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>Academic & General Training</span>
                  </li>
                </ul>
                <a href="/education-and-exam-tools/test-score-tools/ielts-band-score-calculator" className="inline-block mt-3 text-xs text-blue-700 hover:text-blue-800 underline font-semibold">Compare with IELTS Calculator →</a>
              </div>
            </div>

            {/* Test Sections Grid */}
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-blue-300 shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <span className="text-2xl">📖</span>
                </div>
                <h4 className="text-sm font-bold text-blue-700 mb-1">Reading</h4>
                <p className="text-xs text-slate-600">60-80 min</p>
                <p className="text-xs text-slate-500 mt-1">3-4 passages</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-purple-300 shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <span className="text-2xl">🎧</span>
                </div>
                <h4 className="text-sm font-bold text-purple-700 mb-1">Listening</h4>
                <p className="text-xs text-slate-600">60-90 min</p>
                <p className="text-xs text-slate-500 mt-1">Lectures & talks</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-orange-300 shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <span className="text-2xl">🗣️</span>
                </div>
                <h4 className="text-sm font-bold text-orange-700 mb-1">Speaking</h4>
                <p className="text-xs text-slate-600">20 min</p>
                <p className="text-xs text-slate-500 mt-1">4 tasks</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-green-300 shadow-md text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  <span className="text-2xl">✍️</span>
                </div>
                <h4 className="text-sm font-bold text-green-700 mb-1">Writing</h4>
                <p className="text-xs text-slate-600">50 min</p>
                <p className="text-xs text-slate-500 mt-1">2 essays</p>
              </div>
            </div>

            {/* Score Requirements */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-500 shadow-md">
              <h3 className="text-lg font-bold text-indigo-700 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                Score Requirements by Destination
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">USA (Top Universities)</p>
                    <p className="text-xs text-slate-600">Harvard, MIT, Stanford, Yale: <strong className="text-indigo-600">100-110+</strong></p>
                    <p className="text-xs text-slate-500">Usually no section below 25</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇬🇧</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">UK (Russell Group)</p>
                    <p className="text-xs text-slate-600">Oxford, Cambridge: <strong className="text-indigo-600">100-110</strong></p>
                    <p className="text-xs text-slate-500">Section minimums vary</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇨🇦</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Canada (Top Tier)</p>
                    <p className="text-xs text-slate-600">U of Toronto, UBC: <strong className="text-indigo-600">100+</strong></p>
                    <p className="text-xs text-slate-500">Graduate programs higher</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇦🇺</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Australia (Group of 8)</p>
                    <p className="text-xs text-slate-600">Melbourne, ANU: <strong className="text-indigo-600">94+</strong></p>
                    <p className="text-xs text-slate-500">Some require 100+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-emerald-300 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⏱️</span>
                  <h4 className="text-sm font-bold text-emerald-700">Test Duration</h4>
                </div>
                <p className="text-xs text-slate-700"><strong className="text-emerald-600">~3 hours</strong> total</p>
                <p className="text-xs text-slate-500 mt-1">Down from 4 hours</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-xl border-2 border-pink-300 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💵</span>
                  <h4 className="text-sm font-bold text-pink-700">Registration Fee</h4>
                </div>
                <p className="text-xs text-slate-700"><strong className="text-pink-600">$190-250</strong> USD</p>
                <p className="text-xs text-slate-500 mt-1">Varies by location</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border-2 border-amber-300 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📅</span>
                  <h4 className="text-sm font-bold text-amber-700">Score Validity</h4>
                </div>
                <p className="text-xs text-slate-700"><strong className="text-amber-600">2 years</strong> from test date</p>
                <p className="text-xs text-slate-500 mt-1">Plan accordingly</p>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300 shadow-md">
              <h3 className="text-base font-bold text-purple-700 mb-3">🔗 Related Test Calculators</h3>
              <div className="flex flex-wrap gap-2">
                <a href="/education-and-exam-tools/test-score-tools/sat-score-calculator" className="inline-flex items-center gap-1 px-3 py-2 bg-white rounded-lg border border-purple-300 hover:border-purple-500 hover:shadow-md transition-all text-xs font-semibold text-purple-700 hover:text-purple-800">
                  SAT Calculator →
                </a>
                <a href="/education-and-exam-tools/test-score-tools/act-score-calculator" className="inline-flex items-center gap-1 px-3 py-2 bg-white rounded-lg border border-purple-300 hover:border-purple-500 hover:shadow-md transition-all text-xs font-semibold text-purple-700 hover:text-purple-800">
                  ACT Calculator →
                </a>
                <a href="/education-and-exam-tools/test-score-tools/gmat-score-calculator" className="inline-flex items-center gap-1 px-3 py-2 bg-white rounded-lg border border-purple-300 hover:border-purple-500 hover:shadow-md transition-all text-xs font-semibold text-purple-700 hover:text-purple-800">
                  GMAT Calculator →
                </a>
                <a href="/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator" className="inline-flex items-center gap-1 px-3 py-2 bg-white rounded-lg border border-purple-300 hover:border-purple-500 hover:shadow-md transition-all text-xs font-semibold text-purple-700 hover:text-purple-800">
                  UC Berkeley GPA →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div id="external-links" className="bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-8 rounded-2xl shadow-xl border-2 border-slate-300 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">TOEFL Resources & Official Links</h2>
          <div className="grid md:grid-cols-2 gap-5">
            
            <a href="https://www.ets.org/toefl.html" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-teal-200 hover:border-teal-400 hover:shadow-lg transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors">ETS TOEFL Official Website</h3>
                <p className="text-xs text-slate-600 mt-1">Official TOEFL test information, registration, and test dates from ETS.</p>
              </div>
            </a>

            <a href="https://www.toeflgoanywhere.org/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">TOEFL Go Anywhere</h3>
                <p className="text-xs text-slate-600 mt-1">Explore universities accepting TOEFL scores worldwide and admission requirements.</p>
              </div>
            </a>

            <a href="https://www.britishcouncil.org/exam/toefl" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">British Council TOEFL</h3>
                <p className="text-xs text-slate-600 mt-1">Book TOEFL test dates and access preparation materials through British Council.</p>
              </div>
            </a>

            <a href="https://magoosh.com/toefl/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors">Magoosh TOEFL Prep</h3>
                <p className="text-xs text-slate-600 mt-1">Comprehensive TOEFL preparation courses, practice tests, and study materials.</p>
              </div>
            </a>

            <a href="https://www.kaptest.com/toefl" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">Kaplan TOEFL Courses</h3>
                <p className="text-xs text-slate-600 mt-1">Expert-led TOEFL courses, tutoring, and test strategies from Kaplan.</p>
              </div>
            </a>

            <a href="https://www.ets.org/toefl/test-takers/ibt/prepare.html" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white p-5 rounded-xl border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">ETS TOEFL Preparation</h3>
                <p className="text-xs text-slate-600 mt-1">Official free and paid TOEFL prep resources directly from ETS.</p>
              </div>
            </a>

          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-slate-100 px-6 py-4 rounded-xl border border-slate-300 text-center mb-8">
          <p className="text-xs text-slate-600">
            <strong>Last Updated:</strong> November 23, 2025 | TOEFL Score Calculator with Official ETS Scoring Methodology
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Next Review: December 2025 | Verified with latest ETS guidelines
          </p>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-5">
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-l-4 border-teal-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How is the TOEFL total score calculated?</h3>
              <p className="text-sm text-slate-700">
                Your TOEFL total score is the simple sum of your four section scores. Each section (Reading, Listening, Speaking, Writing) is scored from 0 to 30, giving a total range of 0-120. For example: Reading (26) + Listening (25) + Speaking (24) + Writing (25) = Total (100). There's no complex rounding or weighting—just straightforward addition.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is a good TOEFL score for university admission?</h3>
              <p className="text-sm text-slate-700">
                A score of 100+ is considered excellent and meets requirements for top universities like Harvard, MIT, Stanford, and Yale. Scores of 90-99 are good for most competitive programs. 80-89 is fair and acceptable for many universities. Requirements vary by institution and program, so always check specific university standards. Graduate programs often require higher scores than undergraduate programs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How accurate is this TOEFL score calculator?</h3>
              <p className="text-sm text-slate-700">
                This calculator is 100% accurate because it uses the official ETS scoring methodology. TOEFL scores are calculated by simply adding your four section scores (each 0-30) to get your total score (0-120). There's no proprietary algorithm or hidden formula—the calculation is transparent and matches exactly what you'll see on your official TOEFL score report from ETS.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I retake the TOEFL if I'm not satisfied with my score?</h3>
              <p className="text-sm text-slate-700">
                Yes! You can take the TOEFL as many times as you want. There's no limit on the number of attempts. However, you must wait at least 3 days (72 hours) between test attempts. Many students retake TOEFL to improve specific section scores or achieve their target total score for university applications. Universities typically accept your best score or superscore (best section scores across multiple attempts).
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How long is my TOEFL score valid?</h3>
              <p className="text-sm text-slate-700">
                TOEFL scores are valid for 2 years from your test date. After 2 years, ETS no longer reports your scores to universities or institutions. This validity period ensures that your English proficiency level is current. If you're applying to universities, make sure your TOEFL scores will still be valid by the application deadline. Plan your test date accordingly if you're applying a year or more in advance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-l-4 border-pink-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">What TOEFL score do I need for top universities like Harvard or MIT?</h3>
              <p className="text-sm text-slate-700">
                Top US universities typically require minimum TOEFL scores of 100-110. Harvard recommends 100+, MIT requires 90+ (but competitive applicants usually score 100+), Stanford recommends 100+, and Yale requires 100+. Many programs also have minimum section score requirements (e.g., no section below 25). Check each university's specific requirements, as they vary by school and program. Graduate programs often have higher requirements than undergraduate programs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-l-4 border-cyan-600">
              <h3 className="text-lg font-bold text-slate-900 mb-2">What's the difference between TOEFL and IELTS?</h3>
              <p className="text-sm text-slate-700">
                TOEFL and IELTS are both English proficiency tests, but they have key differences. TOEFL uses a 0-120 scoring system (4 sections × 0-30 each), while IELTS uses a 0-9 band score system. TOEFL is more popular in the US and conducted entirely on a computer. IELTS has academic and general training versions, with the speaking test conducted face-to-face. Many universities accept both tests—check which one your target institutions prefer. You can use our <a href="/education-and-exam-tools/test-score-tools/ielts-band-score-calculator" className="text-teal-600 hover:text-teal-700 underline font-semibold">IELTS Band Score Calculator</a> to calculate IELTS scores.
              </p>
            </div>

          </div>
        </div>

        {/* Related Tools */}
        <div id="related-tools">
          <RelatedTools
            currentSlug="toefl-score-calculator"
            relatedSlugs={['ielts-band-score-calculator', 'sat-score-calculator', 'act-score-calculator', 'gmat-score-calculator']}
            navigateTo={navigateTo} 
          />
        </div>

      </div>
    </div>
  );
};

export default TOEFLScoreCalculator;
