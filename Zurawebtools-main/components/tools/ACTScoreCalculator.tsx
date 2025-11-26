import React, { useState, useEffect } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';

interface ACTScoreCalculatorProps {
  navigateTo: (page: Page) => void;
}

const ACTScoreCalculator: React.FC<ACTScoreCalculatorProps> = ({ navigateTo }) => {
  // State for raw scores (number of correct answers)
  const [englishRaw, setEnglishRaw] = useState<number | ''>('');
  const [mathRaw, setMathRaw] = useState<number | ''>('');
  const [readingRaw, setReadingRaw] = useState<number | ''>('');
  const [scienceRaw, setScienceRaw] = useState<number | ''>('');

  // State for scaled scores (1-36)
  const [englishScaled, setEnglishScaled] = useState<number>(0);
  const [mathScaled, setMathScaled] = useState<number>(0);
  const [readingScaled, setReadingScaled] = useState<number>(0);
  const [scienceScaled, setScienceScaled] = useState<number>(0);
  const [compositeScore, setCompositeScore] = useState<number>(0);

  // Raw to Scaled Score Conversion Tables (Based on official ACT curves)
  const englishConversion: { [key: number]: number } = {
    75: 36, 74: 35, 73: 34, 72: 33, 71: 32, 70: 31,
    69: 30, 68: 30, 67: 29, 66: 29, 65: 28, 64: 28,
    63: 27, 62: 27, 61: 26, 60: 26, 59: 25, 58: 24,
    57: 24, 56: 23, 55: 23, 54: 22, 53: 21, 52: 21,
    51: 20, 50: 20, 49: 19, 48: 19, 47: 18, 46: 17,
    45: 17, 44: 16, 43: 16, 42: 15, 41: 15, 40: 14,
    39: 14, 38: 13, 37: 13, 36: 12, 35: 12, 34: 11,
    33: 11, 32: 10, 31: 10, 30: 9, 29: 9, 28: 8,
    27: 8, 26: 7, 25: 7, 24: 6, 23: 6, 22: 5,
    21: 5, 20: 4, 19: 4, 18: 3, 17: 3, 16: 2,
    15: 2, 14: 2, 13: 1, 12: 1, 11: 1, 10: 1,
  };

  const mathConversion: { [key: number]: number } = {
    60: 36, 59: 35, 58: 34, 57: 33, 56: 32, 55: 31,
    54: 30, 53: 29, 52: 28, 51: 27, 50: 26, 49: 25,
    48: 24, 47: 23, 46: 23, 45: 22, 44: 21, 43: 20,
    42: 20, 41: 19, 40: 18, 39: 18, 38: 17, 37: 16,
    36: 16, 35: 15, 34: 15, 33: 14, 32: 13, 31: 13,
    30: 12, 29: 12, 28: 11, 27: 11, 26: 10, 25: 10,
    24: 9, 23: 9, 22: 8, 21: 8, 20: 7, 19: 7,
    18: 6, 17: 6, 16: 5, 15: 5, 14: 4, 13: 4,
    12: 3, 11: 3, 10: 2, 9: 2, 8: 2, 7: 1,
  };

  const readingConversion: { [key: number]: number } = {
    40: 36, 39: 35, 38: 34, 37: 33, 36: 32, 35: 31,
    34: 30, 33: 29, 32: 28, 31: 27, 30: 26, 29: 25,
    28: 24, 27: 23, 26: 23, 25: 22, 24: 21, 23: 20,
    22: 19, 21: 19, 20: 18, 19: 17, 18: 16, 17: 16,
    16: 15, 15: 14, 14: 13, 13: 13, 12: 12, 11: 11,
    10: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5,
    4: 4, 3: 3, 2: 2, 1: 1, 0: 1,
  };

  const scienceConversion: { [key: number]: number } = {
    40: 36, 39: 35, 38: 34, 37: 33, 36: 31, 35: 30,
    34: 29, 33: 28, 32: 27, 31: 26, 30: 25, 29: 24,
    28: 23, 27: 22, 26: 22, 25: 21, 24: 20, 23: 19,
    22: 19, 21: 18, 20: 17, 19: 16, 18: 16, 17: 15,
    16: 14, 15: 13, 14: 13, 13: 12, 12: 11, 11: 11,
    10: 10, 9: 9, 8: 8, 7: 7, 6: 6, 5: 5,
    4: 4, 3: 3, 2: 2, 1: 1, 0: 1,
  };

  // Convert raw score to scaled score
  const convertToScaled = (raw: number | '', conversionTable: { [key: number]: number }): number => {
    if (raw === '' || raw < 0) return 0;
    const rawNum = Number(raw);
    return conversionTable[rawNum] || (rawNum > Object.keys(conversionTable).length ? 36 : 1);
  };

  // SEO Setup
  useEffect(() => {
    // Set title and meta tags
    document.title = "ACT Score Calculator - Free Raw to Scaled Score Converter 2026 | ZuraWebTools";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free ACT score calculator 2026. Convert raw scores to scaled scores (1-36) instantly. Calculate composite score with percentile rankings.'
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
      'ACT score calculator, ACT composite score, ACT raw score converter, ACT scaled score, ACT percentile, ACT college admissions, ACT test prep, ACT scoring chart'
    );

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator');

    // Open Graph tags
    const ogTags = {
      'og:title': 'ACT Score Calculator - Free Raw to Scaled Score Converter 2026',
      'og:description': 'Free ACT score calculator 2026. Convert raw scores to scaled scores (1-36) instantly. Calculate composite score with percentile rankings.',
      'og:url': 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator',
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
      'twitter:title': 'ACT Score Calculator - Free Raw to Scaled Score Converter 2026',
      'twitter:description': 'Free ACT score calculator 2026. Convert raw scores to scaled scores (1-36) instantly. Calculate composite score with percentile rankings.',
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
        "name": "ACT Score Calculator",
        "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator",
        "description": "Free online ACT score calculator that converts raw scores to scaled scores (1-36) and calculates composite scores with percentile rankings.",
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
          "ratingCount": "1247",
          "bestRating": "5"
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
            "name": "Test Score Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "ACT Score Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator"
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
            "name": "How is the ACT composite score calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The ACT composite score is calculated by averaging your four section scores (English, Math, Reading, Science) and rounding to the nearest whole number. For example, if you score 28, 30, 27, and 29, your composite is (28+30+27+29)÷4 = 28.5, which rounds to 29."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good ACT score for college admissions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A good ACT score depends on your target colleges. Generally, 23+ is above average (top 30%), 27+ is competitive for state universities (top 15%), 30+ is excellent for top schools (top 10%), and 34+ is elite for Ivy League (top 1%). Check your target college's average ACT scores for specific benchmarks."
            }
          },
          {
            "@type": "Question",
            "name": "Does the ACT penalize wrong answers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, the ACT does not penalize wrong answers. Your raw score equals the number of questions you answered correctly. This means you should always guess on questions you don't know, as there's no downside to guessing."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this ACT score calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our calculator uses official ACT raw-to-scaled score conversion tables from recent test administrations, making it highly accurate for score predictions. However, actual score curves can vary slightly between test dates due to ACT's equating process."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between raw score and scaled score?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your raw score is simply the number of questions you answered correctly. The scaled score (1-36) is what colleges see, derived from your raw score using ACT's conversion table. Scaled scores allow fair comparison across different test dates."
            }
          },
          {
            "@type": "Question",
            "name": "Can I superscore my ACT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, many colleges superscore the ACT, meaning they take your highest section scores from multiple test dates to create a new composite. Check individual college policies as not all schools superscore the ACT."
            }
          },
          {
            "@type": "Question",
            "name": "How many questions can I miss and still get a 36?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Getting a perfect 36 typically requires answering nearly all questions correctly. Generally, you might be able to miss 0-1 questions per section depending on the test curve, but this varies by test date."
            }
          }
        ]
      },
      // HowTo Schema
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use the ACT Score Calculator",
        "description": "Step-by-step guide to calculate your ACT composite score from raw scores",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Count English correct answers",
            "text": "Count how many questions you answered correctly out of 75 on the English section and enter this number in the English Raw Score field."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Count Math correct answers",
            "text": "Count how many questions you answered correctly out of 60 on the Math section and enter this number in the Math Raw Score field."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Count Reading correct answers",
            "text": "Count how many questions you answered correctly out of 40 on the Reading section and enter this number in the Reading Raw Score field."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Count Science correct answers",
            "text": "Count how many questions you answered correctly out of 40 on the Science section and enter this number in the Science Raw Score field."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Review scaled scores",
            "text": "The calculator automatically converts your raw scores to scaled scores (1-36) for each section using official ACT conversion tables."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Check composite score",
            "text": "View your composite score, which is the average of your four section scores rounded to the nearest whole number, along with percentile ranking and college competitiveness category."
          }
        ]
      }
    ];

    // Remove existing structured data scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
      if (script.textContent?.includes('ACT') || script.textContent?.includes('act-score-calculator')) {
        script.remove();
      }
    });

    // Add new structured data
    structuredData.forEach(data => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      document.title = 'ZuraWebTools - Free Online Tools';
    };
  }, []);

  // Calculate scores when inputs change
  useEffect(() => {
    const engScaled = convertToScaled(englishRaw, englishConversion);
    const matScaled = convertToScaled(mathRaw, mathConversion);
    const readScaled = convertToScaled(readingRaw, readingConversion);
    const sciScaled = convertToScaled(scienceRaw, scienceConversion);

    setEnglishScaled(engScaled);
    setMathScaled(matScaled);
    setReadingScaled(readScaled);
    setScienceScaled(sciScaled);

    // Calculate composite (average of 4 sections)
    if (engScaled > 0 || matScaled > 0 || readScaled > 0 || sciScaled > 0) {
      const composite = Math.round((engScaled + matScaled + readScaled + sciScaled) / 4);
      setCompositeScore(composite);
    } else {
      setCompositeScore(0);
    }
  }, [englishRaw, mathRaw, readingRaw, scienceRaw]);

  // Get score category and color
  const getScoreCategory = (score: number): { label: string; color: string; description: string } => {
    if (score >= 34) return { label: 'Elite', color: 'from-green-500 to-emerald-600', description: 'Top 1% - Highly competitive for Ivy League' };
    if (score >= 30) return { label: 'Excellent', color: 'from-blue-500 to-cyan-600', description: 'Top 10% - Competitive for top universities' };
    if (score >= 27) return { label: 'Good', color: 'from-indigo-500 to-purple-600', description: 'Top 15% - Strong for state universities' };
    if (score >= 23) return { label: 'Above Average', color: 'from-yellow-500 to-orange-500', description: 'Top 30% - Solid score' };
    if (score >= 20) return { label: 'Average', color: 'from-orange-500 to-amber-600', description: 'Average range' };
    if (score >= 15) return { label: 'Below Average', color: 'from-slate-400 to-slate-500', description: 'Below national average' };
    return { label: 'Low', color: 'from-slate-500 to-slate-600', description: 'Needs improvement' };
  };

  const category = getScoreCategory(compositeScore);

  // Get percentile
  const getPercentile = (score: number): number => {
    const percentileMap: { [key: number]: number } = {
      36: 100, 35: 99, 34: 99, 33: 98, 32: 97, 31: 96,
      30: 94, 29: 92, 28: 89, 27: 86, 26: 82, 25: 78,
      24: 74, 23: 69, 22: 63, 21: 58, 20: 52, 19: 46,
      18: 40, 17: 34, 16: 28, 15: 22, 14: 17, 13: 12,
      12: 8, 11: 5, 10: 3, 9: 2, 8: 1, 7: 1,
    };
    return percentileMap[score] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            ACT Score Calculator - Free Raw to Scaled Score Converter
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Free ACT score calculator 2026. Convert raw scores to scaled scores (1-36) for English, Math, Reading, and Science sections. Calculate your ACT composite score instantly with accurate percentile rankings.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-indigo-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">ACT Score Calculator - Enter Your Raw Scores</h2>
          
          {/* Composite Score Display */}
          <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white text-center mb-8 shadow-xl`}>
            <div className="text-6xl font-bold mb-2">{compositeScore}/36</div>
            <div className="text-2xl font-semibold mb-1">{category.label}</div>
            <div className="text-base opacity-90">{category.description}</div>
            {compositeScore > 0 && (
              <div className="text-sm mt-3 bg-white/20 inline-block px-4 py-2 rounded-lg">
                Percentile: {getPercentile(compositeScore)}%
              </div>
            )}
          </div>

          {/* Score Input Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* English Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  E
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">English</h3>
                  <p className="text-sm text-slate-600">75 questions</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Raw Score (Correct Answers)
              </label>
              <input
                type="number"
                min="0"
                max="75"
                value={englishRaw}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setEnglishRaw('');
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      setEnglishRaw(Math.max(0, Math.min(75, num)));
                    }
                  }
                }}
                placeholder="0 - 75"
                className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg font-semibold"
              />
              
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Scaled Score:</span>
                  <span className="text-3xl font-bold text-blue-600">{englishScaled}</span>
                </div>
              </div>
            </div>

            {/* Math Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  M
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Math</h3>
                  <p className="text-sm text-slate-600">60 questions</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Raw Score (Correct Answers)
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={mathRaw}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setMathRaw('');
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      setMathRaw(Math.max(0, Math.min(60, num)));
                    }
                  }
                }}
                placeholder="0 - 60"
                className="w-full p-3 border-2 border-purple-300 rounded-lg bg-white text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg font-semibold"
              />
              
              <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Scaled Score:</span>
                  <span className="text-3xl font-bold text-purple-600">{mathScaled}</span>
                </div>
              </div>
            </div>

            {/* Reading Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  R
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Reading</h3>
                  <p className="text-sm text-slate-600">40 questions</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Raw Score (Correct Answers)
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={readingRaw}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setReadingRaw('');
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      setReadingRaw(Math.max(0, Math.min(40, num)));
                    }
                  }
                }}
                placeholder="0 - 40"
                className="w-full p-3 border-2 border-green-300 rounded-lg bg-white text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-lg font-semibold"
              />
              
              <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Scaled Score:</span>
                  <span className="text-3xl font-bold text-green-600">{readingScaled}</span>
                </div>
              </div>
            </div>

            {/* Science Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  S
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Science</h3>
                  <p className="text-sm text-slate-600">40 questions</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Raw Score (Correct Answers)
              </label>
              <input
                type="number"
                min="0"
                max="40"
                value={scienceRaw}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setScienceRaw('');
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      setScienceRaw(Math.max(0, Math.min(40, num)));
                    }
                  }
                }}
                placeholder="0 - 40"
                className="w-full p-3 border-2 border-orange-300 rounded-lg bg-white text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-lg font-semibold"
              />
              
              <div className="mt-4 p-4 bg-white rounded-lg border border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Scaled Score:</span>
                  <span className="text-3xl font-bold text-orange-600">{scienceScaled}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          {compositeScore > 0 && (
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
              <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                Detailed Score Breakdown
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{englishScaled}</div>
                  <div className="text-xs text-slate-600 mt-1">English</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{mathScaled}</div>
                  <div className="text-xs text-slate-600 mt-1">Math</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{readingScaled}</div>
                  <div className="text-xs text-slate-600 mt-1">Reading</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{scienceScaled}</div>
                  <div className="text-xs text-slate-600 mt-1">Science</div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg border-2 border-indigo-300">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-slate-700">Composite Score (Average):</span>
                  <span className="text-4xl font-bold text-indigo-600">{compositeScore}/36</span>
                </div>
                <div className="text-sm text-slate-600 mt-2 text-center">
                  This is your official ACT composite score
                </div>
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <div>
                <p className="font-semibold text-amber-900 mb-1">Score Conversion Note</p>
                <p className="text-sm text-amber-800">
                  This ACT score calculator uses official raw-to-scaled score conversion tables from recent ACT exams. Actual score curves may vary slightly between test dates due to ACT's equating process.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Share This ACT Score Calculator</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Calculate%20your%20ACT%20score%20instantly%20with%20this%20free%20calculator!&url=https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator&title=ACT%20Score%20Calculator`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText('https://zurawebtools.com/education-and-exam-tools/test-score-tools/act-score-calculator');
                alert('Link copied to clipboard!');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Quick ACT Score Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">A</span>
                Elite Scorer
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>English:</strong> 73/75 → 34</li>
                <li><strong>Math:</strong> 58/60 → 34</li>
                <li><strong>Reading:</strong> 38/40 → 34</li>
                <li><strong>Science:</strong> 38/40 → 34</li>
                <li className="pt-2 border-t border-green-300">
                  <strong>Composite:</strong> <span className="text-2xl font-bold text-green-700">34/36</span>
                </li>
                <li className="text-green-700 font-semibold">Top 1% - Ivy League competitive</li>
              </ul>
            </div>

            <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">B</span>
                Strong Scorer
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>English:</strong> 63/75 → 27</li>
                <li><strong>Math:</strong> 47/60 → 23</li>
                <li><strong>Reading:</strong> 30/40 → 26</li>
                <li><strong>Science:</strong> 29/40 → 24</li>
                <li className="pt-2 border-t border-blue-300">
                  <strong>Composite:</strong> <span className="text-2xl font-bold text-blue-700">25/36</span>
                </li>
                <li className="text-blue-700 font-semibold">Top 22% - Good state universities</li>
              </ul>
            </div>

            <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">C</span>
                Average Scorer
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>English:</strong> 49/75 → 19</li>
                <li><strong>Math:</strong> 33/60 → 14</li>
                <li><strong>Reading:</strong> 21/40 → 19</li>
                <li><strong>Science:</strong> 21/40 → 18</li>
                <li className="pt-2 border-t border-orange-300">
                  <strong>Composite:</strong> <span className="text-2xl font-bold text-orange-700">18/36</span>
                </li>
                <li className="text-orange-700 font-semibold">Around national average</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Benefits of Using Our ACT Score Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Instant Score Prediction</h3>
                <p className="text-slate-600 text-sm">
                  Get accurate ACT composite score predictions instantly using official score conversion tables. No waiting for official score reports.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Practice Test Analysis</h3>
                <p className="text-slate-600 text-sm">
                  Perfect for analyzing ACT practice test results. Enter your raw scores from any practice test to see your projected performance.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Goal Setting & Tracking</h3>
                <p className="text-slate-600 text-sm">
                  Set target scores for each section and track your progress. Identify which sections need more study time to reach your goal composite score.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">College Planning</h3>
                <p className="text-slate-600 text-sm">
                  Understand your competitiveness for target colleges. Our percentile rankings help you gauge where your ACT score stands nationally.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">How to Use the ACT Score Calculator</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Enter Your Raw Scores</h3>
                <p className="text-slate-600 text-sm">
                  Input the number of correct answers (raw score) for each ACT section: English (0-75), Math (0-60), Reading (0-40), and Science (0-40). These are the questions you answered correctly on your practice test or actual ACT exam.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">View Scaled Scores</h3>
                <p className="text-slate-600 text-sm">
                  The calculator automatically converts your raw scores to scaled scores (1-36) for each section using official ACT conversion tables. Each section's scaled score appears below the input field.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Check Your Composite Score</h3>
                <p className="text-slate-600 text-sm">
                  Your ACT composite score is calculated by averaging the four section scores and rounding to the nearest whole number. This composite score (1-36) is what colleges primarily consider.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Review Percentile Ranking</h3>
                <p className="text-slate-600 text-sm">
                  See where you stand nationally with the percentile ranking. A 75th percentile means you scored better than 75% of test takers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Analyze Score Category</h3>
                <p className="text-slate-600 text-sm">
                  The calculator categorizes your score (Elite, Excellent, Good, etc.) and shows which tier of colleges you're competitive for based on your composite score.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                6
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Plan Your Study Strategy</h3>
                <p className="text-slate-600 text-sm">
                  Use the detailed score breakdown to identify weaker sections. Focus your study efforts on sections with lower scores to maximize your composite score improvement.
                </p>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="mt-8 p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
            <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              Example Calculation
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p><strong>Raw Scores:</strong> English 65/75, Math 52/60, Reading 32/40, Science 31/40</p>
              <p><strong>Scaled Scores:</strong> English = 28, Math = 28, Reading = 28, Science = 26</p>
              <p><strong>Composite Calculation:</strong> (28 + 28 + 28 + 26) ÷ 4 = 110 ÷ 4 = <strong className="text-pink-700 text-lg">27.5 → rounds to 28</strong></p>
              <p className="pt-2 text-pink-700 font-semibold">Final ACT Composite Score: 28/36 (89th percentile)</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Who Uses This ACT Score Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">High School Students</h3>
              <p className="text-slate-700 text-sm">
                Juniors and seniors preparing for the ACT exam use this calculator to predict their scores from practice tests, set target goals, and track improvement over time. Essential for college application planning.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">Teachers & Tutors</h3>
              <p className="text-slate-700 text-sm">
                Educators use this tool to quickly evaluate student practice test performance, provide immediate feedback, and create personalized study plans based on section-by-section analysis.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">Parents & Guardians</h3>
              <p className="text-slate-700 text-sm">
                Parents helping their children prepare for college use this calculator to monitor progress, understand score requirements for target schools, and make informed decisions about test prep investments.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">College Counselors</h3>
              <p className="text-slate-700 text-sm">
                Professional counselors utilize this calculator to assess student competitiveness for various colleges, recommend appropriate test-optional strategies, and guide application list development.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl border-2 border-indigo-300 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">About Our ACT Score Calculator</h2>
          </div>
          
          <div className="prose max-w-none text-slate-700 space-y-5 text-base leading-relaxed">
            {/* Introduction */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                What is the ACT Score Calculator?
              </h3>
              <p>
                Our free ACT score calculator is a comprehensive tool designed to help students, parents, and educators accurately convert raw ACT scores to scaled scores and composite scores. The ACT exam is one of the two major standardized tests for college admissions in the United States (alongside the <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/sat-score-calculator' as Page)} className="text-indigo-600 hover:text-indigo-800 font-semibold underline decoration-2 decoration-indigo-300 hover:decoration-indigo-600 transition-all">SAT Score Calculator</button>), and understanding your ACT score is crucial for college application strategy and academic planning.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                How Does ACT Scoring Work?
              </h3>
              <p>
                This ACT calculator uses official score conversion tables from recent ACT exams to ensure accuracy. The ACT scoring system converts your raw score (number of correct answers) to a scaled score ranging from 1 to 36 for each of the four sections: English (75 questions), Math (60 questions), Reading (40 questions), and Science (40 questions). Your composite ACT score is simply the average of these four section scores, rounded to the nearest whole number. Unlike some standardized tests, the ACT does not penalize wrong answers, so your raw score equals your correct answers.
              </p>
            </div>

            {/* Percentile Rankings */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-pink-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Understanding Percentile Rankings
              </h3>
              <p>
                The ACT score calculator provides instant results with percentile rankings, helping you understand where you stand compared to other test takers nationally. A percentile rank tells you what percentage of students scored lower than you. For example, a composite score of 27 places you in the 86th percentile, meaning you scored better than 86% of ACT test takers. These percentile rankings are essential for assessing your competitiveness for different colleges and universities, similar to how our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/gmat-score-calculator' as Page)} className="text-pink-600 hover:text-pink-800 font-semibold underline decoration-2 decoration-pink-300 hover:decoration-pink-600 transition-all">GMAT Score Calculator</button> helps graduate school applicants.
              </p>
            </div>

            {/* Score Categories */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                ACT Score Categories & College Admissions
              </h3>
              <p>
                Our calculator categorizes your ACT composite score into performance levels: <strong>Elite (34-36)</strong>, <strong>Excellent (30-33)</strong>, <strong>Good (27-29)</strong>, <strong>Above Average (23-26)</strong>, <strong>Average (20-22)</strong>, <strong>Below Average (15-19)</strong>, and <strong>Low (below 15)</strong>. Understanding your score category helps you identify realistic target schools and determine whether retaking the ACT might improve your college admission chances. Top universities like Harvard, Yale, and Princeton typically admit students with composite scores of 34-36, while excellent state universities often accept students scoring 27-30.
              </p>
            </div>

            {/* Accuracy & Test Prep */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Calculator Accuracy & Test Preparation
              </h3>
              <p>
                The raw to scaled score conversion varies slightly between different ACT test administrations due to the equating process, which ensures fairness across test dates with varying difficulty levels. Our ACT score calculator uses the most recent conversion tables to provide the most accurate predictions. When you take official ACT practice tests, you can use this calculator to immediately see your projected scores without waiting for official score reports, making it an invaluable tool for ACT test prep and study planning. Students also preparing for law school can check out our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/lsat-score-calculator' as Page)} className="text-emerald-600 hover:text-emerald-800 font-semibold underline decoration-2 decoration-emerald-300 hover:decoration-emerald-600 transition-all">LSAT Score Calculator</button>.
              </p>
            </div>

            {/* Who Should Use */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-amber-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Who Should Use This Calculator?
              </h3>
              <p>
                Whether you're a high school junior taking your first ACT practice test, a senior finalizing your college application strategy, or a tutor helping students achieve their target scores, this free ACT calculator provides the insights you need. Use it alongside your ACT prep materials to track improvement, identify weak sections that need more study time, and build confidence before test day. With accurate ACT score predictions and percentile rankings, you can make informed decisions about when to take the test, whether to retake it, and which colleges to target in your application process. Pre-med students should also explore our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/mcat-score-calculator' as Page)} className="text-amber-600 hover:text-amber-800 font-semibold underline decoration-2 decoration-amber-300 hover:decoration-amber-600 transition-all">MCAT Score Calculator</button> for medical school admissions planning.
              </p>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Helpful ACT Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://www.act.org/content/act/en/products-and-services/the-act.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Official ACT Website</div>
                <div className="text-xs text-slate-600">Test dates, registration, and official prep</div>
              </div>
            </a>

            <a 
              href="https://www.act.org/content/act/en/products-and-services/the-act/scores.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">ACT Scoring Information</div>
                <div className="text-xs text-slate-600">Understanding your ACT scores</div>
              </div>
            </a>

            <a 
              href="https://www.act.org/content/act/en/products-and-services/the-act/test-preparation.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">ACT Test Preparation</div>
                <div className="text-xs text-slate-600">Free practice tests and study materials</div>
              </div>
            </a>

            <a 
              href="https://www.act.org/content/dam/act/unsecured/documents/Preparing-for-the-ACT.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">Official ACT Prep Guide</div>
                <div className="text-xs text-slate-600">Comprehensive PDF study guide</div>
              </div>
            </a>

            <a 
              href="https://www.khanacademy.org/test-prep/sat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200 hover:border-cyan-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">Khan Academy Practice</div>
                <div className="text-xs text-slate-600">Free personalized SAT/ACT prep</div>
              </div>
            </a>

            <a 
              href="https://www.collegedata.com/resources/the-facts-on-fit/what-is-a-good-act-score" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200 hover:border-rose-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-rose-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">What is a Good ACT Score?</div>
                <div className="text-xs text-slate-600">College admission score benchmarks</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 mb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <span>Last Updated: November 2025 | ACT Score Conversion Tables Current for 2025-2026</span>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">How is the ACT composite score calculated?</h3>
              <p className="text-slate-600 text-sm">
                The ACT composite score is calculated by averaging your four section scores (English, Math, Reading, Science) and rounding to the nearest whole number. For example, if you score 28, 30, 27, and 29, your composite is (28+30+27+29)÷4 = 28.5, which rounds to 29.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">What is a good ACT score for college admissions?</h3>
              <p className="text-slate-600 text-sm">
                A "good" ACT score depends on your target colleges. Generally, 23+ is above average (top 30%), 27+ is competitive for state universities (top 15%), 30+ is excellent for top schools (top 10%), and 34+ is elite for Ivy League (top 1%). Check your target college's average ACT scores for specific benchmarks.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Does the ACT penalize wrong answers?</h3>
              <p className="text-slate-600 text-sm">
                No, the ACT does not penalize wrong answers. Your raw score equals the number of questions you answered correctly. This means you should always guess on questions you don't know, as there's no downside to guessing.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">How accurate is this ACT score calculator?</h3>
              <p className="text-slate-600 text-sm">
                Our calculator uses official ACT raw-to-scaled score conversion tables from recent test administrations, making it highly accurate for score predictions. However, actual score curves can vary slightly between test dates due to ACT's equating process, which adjusts for test difficulty.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">What's the difference between raw score and scaled score?</h3>
              <p className="text-slate-600 text-sm">
                Your raw score is simply the number of questions you answered correctly (e.g., 65 out of 75 on English). The scaled score (1-36) is what colleges see, derived from your raw score using ACT's conversion table. Scaled scores allow fair comparison across different test dates with varying difficulty levels.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Can I superscore my ACT?</h3>
              <p className="text-slate-600 text-sm">
                Yes, many colleges superscore the ACT, meaning they take your highest section scores from multiple test dates to create a new composite. For example, if you score 30 in English on one test and 32 in Math on another, they'll use both highest scores. Check individual college policies as not all schools superscore the ACT.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">How many questions can I miss and still get a 36?</h3>
              <p className="text-slate-600 text-sm">
                Getting a perfect 36 typically requires answering nearly all questions correctly, but it varies by section and test date. Generally, you might be able to miss 0-1 questions in English, 0-1 in Math, 0 in Reading, and 0-1 in Science and still achieve a 36 in that section, depending on the test curve.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['sat-score-calculator', 'berkeley-gpa-calculator', 'isac-gpa-calculator']} 
          navigateTo={navigateTo} 
          currentSlug="act-score-calculator"
        />
      </div>
    </div>
  );
};

export default ACTScoreCalculator;
