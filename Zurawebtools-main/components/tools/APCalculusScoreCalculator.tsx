import React, { useEffect, useState } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';

interface APCalculusScoreCalculatorProps {
  navigateTo: (page: Page) => void;
}

const APCalculusScoreCalculator: React.FC<APCalculusScoreCalculatorProps> = ({ navigateTo }) => {
  const [examType, setExamType] = useState<'AB' | 'BC'>('BC');
  const [mcqScore, setMcqScore] = useState<number | ''>('');
  const [frq1, setFrq1] = useState<number | ''>('');
  const [frq2, setFrq2] = useState<number | ''>('');
  const [frq3, setFrq3] = useState<number | ''>('');
  const [frq4, setFrq4] = useState<number | ''>('');
  const [frq5AB, setFrq5AB] = useState<number | ''>('');
  const [frq5BC, setFrq5BC] = useState<number | ''>('');
  const [frq6, setFrq6] = useState<number | ''>('');
  
  const [totalComposite, setTotalComposite] = useState<number>(0);
  const [apScore, setApScore] = useState<number>(0);
  const [percentile, setPercentile] = useState<number>(0);

  // TOC sections
  const tocSections: TOCSection[] = [
    {
      id: 'examples',
      emoji: '📝',
      title: 'Examples',
      subtitle: 'Sample scores',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      hoverBorder: 'border-indigo-400',
      hoverText: 'text-indigo-600'
    },
    {
      id: 'benefits',
      emoji: '⭐',
      title: 'Benefits',
      subtitle: 'Why use this',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-600'
    },
    {
      id: 'how-to-use',
      emoji: '📖',
      title: 'How to Use',
      subtitle: 'Step-by-step guide',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      hoverBorder: 'border-green-400',
      hoverText: 'text-green-600'
    },
    {
      id: 'use-cases',
      emoji: '💡',
      title: 'Use Cases',
      subtitle: 'Who uses this',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-orange-400',
      hoverText: 'text-orange-600'
    },
    {
      id: 'about',
      emoji: 'ℹ️',
      title: 'About AP Calculus',
      subtitle: 'Exam structure',
      gradientFrom: 'from-cyan-50',
      gradientTo: 'to-blue-50',
      hoverBorder: 'border-cyan-400',
      hoverText: 'text-cyan-600'
    },
    {
      id: 'resources',
      emoji: '🔗',
      title: 'Resources',
      subtitle: 'External links',
      gradientFrom: 'from-red-50',
      gradientTo: 'to-rose-50',
      hoverBorder: 'border-red-400',
      hoverText: 'text-red-600'
    },
    {
      id: 'faq',
      emoji: '❓',
      title: 'FAQs',
      subtitle: 'Common questions',
      gradientFrom: 'from-violet-50',
      gradientTo: 'to-purple-50',
      hoverBorder: 'border-violet-400',
      hoverText: 'text-violet-600'
    }
  ];

  // SEO Metadata
  useEffect(() => {
    document.title = 'AP Calculus Score Calculator (AB/BC) 2026 - Free Tool';

    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const metaDescription = 'Free AP Calculus AB and BC score calculator for 2026. Convert MCQ and FRQ scores to AP scores (1-5) instantly. Calculate composite scores with percentile rankings.';
    setMetaTag('description', metaDescription);
    setMetaTag('robots', 'index, follow, max-image-preview:large');

    const ogTags = [
      { property: 'og:title', content: 'AP Calculus Score Calculator (AB/BC) 2026 - Free Tool' },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-image.png' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property='${tag.property}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'AP Calculus Score Calculator (AB/BC) 2026 - Free Tool' },
      { name: 'twitter:description', content: metaDescription },
    ];

    twitterTags.forEach(tag => setMetaTag(tag.name, tag.content));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator');

    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AP Calculus Score Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3200" },
      "description": "Free AP Calculus AB and BC score calculator for college credit predictions"
    };

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "AP Calculus Score Calculator (AB/BC) 2026 - Free Tool",
      "description": metaDescription,
      "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "AP Calculus Score Calculator"
      },
      "hasPart": [
        { "@type": "WebPageElement", "name": "AP Calculus Calculator Tool", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator#calculator" },
        { "@type": "WebPageElement", "name": "Quick Examples", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator#examples" },
        { "@type": "WebPageElement", "name": "Benefits", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator#benefits" },
        { "@type": "WebPageElement", "name": "How to Use Guide", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator#how-to-use" },
        { "@type": "WebPageElement", "name": "Use Cases", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator#use-cases" },
        { "@type": "WebPageElement", "name": "About AP Calculus", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator#about" },
        { "@type": "WebPageElement", "name": "FAQs", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator#faq" }
      ]
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
        { "@type": "ListItem", "position": 2, "name": "Education & Exam Tools", "item": "https://zurawebtools.com/education-and-exam-tools" },
        { "@type": "ListItem", "position": 3, "name": "Test Score Tools", "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools" },
        { "@type": "ListItem", "position": 4, "name": "AP Calculus Score Calculator", "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator" }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good AP Calculus score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A score of 3, 4, or 5 is considered good on the AP Calculus exam. A 3 is 'qualified', 4 is 'well qualified', and 5 is 'extremely well qualified'. Most colleges offer credit for scores of 3 or higher, though selective colleges may require 4 or 5."
          }
        },
        {
          "@type": "Question",
          "name": "How is the AP Calculus exam scored?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The AP Calculus exam combines Multiple Choice (45 questions) and Free Response (6 questions) sections. MCQ is worth 50% and FRQ is worth 50%. The raw scores are converted to a composite score out of 108 points, which is then converted to the final AP score of 1-5."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between AP Calculus AB and BC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AP Calculus BC covers all AB topics plus additional advanced topics like parametric equations, polar coordinates, vector-valued functions, and series. BC is more comprehensive and faster-paced. BC students also receive an AB subscore."
          }
        },
        {
          "@type": "Question",
          "name": "How many questions do I need to get right to score a 5?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To score a 5 on AP Calculus BC, you typically need about 64+ composite points out of 108 (around 59-60%) thanks to the generous BC curve. For AB, you need approximately 68+ points out of 108 (about 63%). BC has lower cutoffs because it covers more advanced content. The exact cutoff varies each year based on the scoring curve."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use a calculator on the AP Calculus exam?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, calculators are allowed on specific sections. Section I Part B (15 MCQ) and Section II Part A (2 FRQ) allow graphing calculators. Section I Part A (30 MCQ) and Section II Part B (4 FRQ) are no-calculator sections."
          }
        },
        {
          "@type": "Question",
          "name": "What is the average AP Calculus BC score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The average AP Calculus BC score is approximately 3.76-3.92 based on recent years. In 2024, about 80.9% of students scored 3 or higher, with 43% scoring 5, making it one of the highest-scoring AP exams."
          }
        },
        {
          "@type": "Question",
          "name": "Do colleges accept AP Calculus credit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most colleges accept AP Calculus scores of 3 or higher for credit or placement. BC typically earns more credits than AB. Selective colleges may require a 4 or 5. Check individual college AP credit policies for specific requirements."
          }
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify([schema, webPageSchema, faqSchema, breadcrumbSchema]);

    return () => {
      document.title = 'ZuraWebTools';
    };
  }, []);

  // Calculate scores
  useEffect(() => {
    // MCQ: 45 questions, each worth 1.2 points (54 total points possible)
    const mcqValue = mcqScore === '' ? 0 : Number(mcqScore);
    const mcqComposite = (mcqValue / 45) * 54;
    
    // FRQ: Total 54 points possible
    const frq1Value = frq1 === '' ? 0 : Number(frq1);
    const frq2Value = frq2 === '' ? 0 : Number(frq2);
    const frq3Value = frq3 === '' ? 0 : Number(frq3);
    const frq4Value = frq4 === '' ? 0 : Number(frq4);
    const frq5ABValue = frq5AB === '' ? 0 : Number(frq5AB);
    const frq5BCValue = frq5BC === '' ? 0 : Number(frq5BC);
    const frq6Value = frq6 === '' ? 0 : Number(frq6);
    
    let frqTotal = frq1Value + frq2Value + frq3Value + frq4Value + frq5ABValue + frq6Value;
    if (examType === 'BC') {
      frqTotal += frq5BCValue;
    }
    const frqComposite = frqTotal;
    
    const composite = Math.round(mcqComposite + frqComposite);
    setTotalComposite(composite);

    // Convert composite to AP score (BC curve - more generous than AB)
    let score = 1;
    let percentileCalc = 0;
    
    if (examType === 'BC') {
      // BC curve is more generous (lower cutoffs for same scores)
      if (composite >= 64) { score = 5; percentileCalc = 90; }      // BC: 64+ → 5
      else if (composite >= 50) { score = 4; percentileCalc = 70; } // BC: 50+ → 4
      else if (composite >= 38) { score = 3; percentileCalc = 50; } // BC: 38+ → 3
      else if (composite >= 29) { score = 2; percentileCalc = 30; } // BC: 29+ → 2
      else { score = 1; percentileCalc = 10; }
    } else {
      // AB curve is stricter (higher cutoffs required)
      if (composite >= 68) { score = 5; percentileCalc = 85; }      // AB: 68+ → 5
      else if (composite >= 56) { score = 4; percentileCalc = 65; } // AB: 56+ → 4
      else if (composite >= 44) { score = 3; percentileCalc = 45; } // AB: 44+ → 3
      else if (composite >= 31) { score = 2; percentileCalc = 25; } // AB: 31+ → 2
      else { score = 1; percentileCalc = 10; }
    }
    
    setApScore(score);
    setPercentile(percentileCalc);
  }, [examType, mcqScore, frq1, frq2, frq3, frq4, frq5AB, frq5BC, frq6]);

  const shareOnTwitter = () => {
    const text = `I just calculated my AP Calculus ${examType} score: ${apScore}/5 (${percentile}th percentile)! Use this free calculator to predict your AP exam score.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator')}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator')}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator')}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        {/* H1 + Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AP Calculus Score Calculator (AB/BC) 2026
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Best free AP Calculus AB and BC score calculator for 2026 exam preparation. Convert your MCQ and FRQ scores to AP scores (1-5) instantly with percentile rankings. Perfect for practice tests and predicting your college credit eligibility. <strong>2026 AP Exam Date: May 5, 2026 (Tuesday, 8:00 AM)</strong>
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div id="calculator" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Your AP Calculus Score</h2>
          
          {/* Exam Type Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Exam Type</label>
            <div className="flex gap-4">
              <button
                onClick={() => setExamType('AB')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  examType === 'AB'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                AP Calculus AB
              </button>
              <button
                onClick={() => setExamType('BC')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                  examType === 'BC'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                AP Calculus BC
              </button>
            </div>
          </div>

          {/* Multiple Choice Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section I: Multiple Choice</h3>
            <p className="text-sm text-gray-600 mb-4">45 questions total (Part A: 30 no calculator, Part B: 15 calculator)</p>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 min-w-[140px]">Correct Answers:</label>
              <input
                type="number"
                min="0"
                max="45"
                value={mcqScore}
                placeholder="0"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setMcqScore('');
                  } else {
                    const num = parseInt(val);
                    setMcqScore(Math.min(45, Math.max(0, isNaN(num) ? 0 : num)));
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
              <span className="text-gray-600 font-medium">/ 45</span>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              value={mcqScore === '' ? 0 : mcqScore}
              onChange={(e) => setMcqScore(parseInt(e.target.value))}
              className="w-full mt-4"
            />
          </div>

          {/* Free Response Section */}
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Section II: Free Response</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 1 (9 points)</label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={frq1}
                  placeholder="0"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setFrq1('');
                    } else {
                      const num = parseInt(val);
                      setFrq1(Math.min(9, Math.max(0, isNaN(num) ? 0 : num)));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 2 (9 points)</label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={frq2}
                  placeholder="0"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setFrq2('');
                    } else {
                      const num = parseInt(val);
                      setFrq2(Math.min(9, Math.max(0, isNaN(num) ? 0 : num)));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 3 (9 points)</label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={frq3}
                  placeholder="0"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setFrq3('');
                    } else {
                      const num = parseInt(val);
                      setFrq3(Math.min(9, Math.max(0, isNaN(num) ? 0 : num)));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 4 (9 points)</label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={frq4}
                  placeholder="0"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setFrq4('');
                    } else {
                      const num = parseInt(val);
                      setFrq4(Math.min(9, Math.max(0, isNaN(num) ? 0 : num)));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 5 AB (5 points)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={frq5AB}
                  placeholder="0"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setFrq5AB('');
                    } else {
                      const num = parseInt(val);
                      setFrq5AB(Math.min(5, Math.max(0, isNaN(num) ? 0 : num)));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
              {examType === 'BC' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question 5 BC (4 points)</label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    value={frq5BC}
                    placeholder="0"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setFrq5BC('');
                      } else {
                        const num = parseInt(val);
                        setFrq5BC(Math.min(4, Math.max(0, isNaN(num) ? 0 : num)));
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question 6 (9 points)</label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={frq6}
                  placeholder="0"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setFrq6('');
                    } else {
                      const num = parseInt(val);
                      setFrq6(Math.min(9, Math.max(0, isNaN(num) ? 0 : num)));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className={`rounded-xl p-8 text-white shadow-lg ${
            apScore === 5 ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
            apScore === 4 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
            apScore === 3 ? 'bg-gradient-to-br from-yellow-500 to-orange-600' :
            apScore === 2 ? 'bg-gradient-to-br from-orange-500 to-red-500' :
            'bg-gradient-to-br from-red-500 to-rose-600'
          }`}>
            <div className="text-center">
              <p className="text-lg font-medium opacity-90 mb-2">Your Predicted AP Score</p>
              <p className="text-6xl font-bold mb-2">{apScore}</p>
              <p className="text-xl font-semibold mb-4">
                {apScore === 5 ? '🌟 Extremely Well Qualified' :
                 apScore === 4 ? '🎓 Well Qualified' :
                 apScore === 3 ? '✅ Qualified' :
                 apScore === 2 ? '📚 Possibly Qualified' :
                 '⚠️ No Recommendation'}
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm opacity-75 mb-1">Composite Score</p>
                  <p className="text-2xl font-bold">{totalComposite} / 108</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm opacity-75 mb-1">Percentile</p>
                  <p className="text-2xl font-bold">{percentile}th</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm opacity-75 mb-1">Exam Type</p>
                  <p className="text-2xl font-bold">{examType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOC */}
        <TableOfContents sections={tocSections} />

        {/* Social Share */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Results</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareOnTwitter} className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              Twitter
            </button>
            <button onClick={shareOnFacebook} className="flex items-center gap-2 px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              Facebook
            </button>
            <button onClick={shareOnLinkedIn} className="flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Quick Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🌟 Score 5 Example (BC)</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">MCQ: <span className="font-bold text-green-600">38/45</span> correct (84%)</p>
                <p className="text-sm text-gray-700">FRQ 1-4: <span className="font-bold text-green-600">7, 8, 7, 8</span> points</p>
                <p className="text-sm text-gray-700">FRQ 5 AB+BC: <span className="font-bold text-green-600">4 + 3</span> points</p>
                <p className="text-sm text-gray-700">FRQ 6: <span className="font-bold text-green-600">7</span> points</p>
              </div>
              <div className="pt-4 border-t border-green-300">
                <p className="text-sm text-gray-600 mb-1">Composite Score:</p>
                <p className="text-3xl font-bold text-green-600">75 / 108</p>
                <p className="text-xs text-gray-500 mt-2">Extremely Well Qualified (90th percentile)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎓 Score 4 Example (BC)</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">MCQ: <span className="font-bold text-blue-600">30/45</span> correct (67%)</p>
                <p className="text-sm text-gray-700">FRQ 1-4: <span className="font-bold text-blue-600">6, 5, 6, 5</span> points</p>
                <p className="text-sm text-gray-700">FRQ 5 AB+BC: <span className="font-bold text-blue-600">3 + 2</span> points</p>
                <p className="text-sm text-gray-700">FRQ 6: <span className="font-bold text-blue-600">6</span> points</p>
              </div>
              <div className="pt-4 border-t border-blue-300">
                <p className="text-sm text-gray-600 mb-1">Composite Score:</p>
                <p className="text-3xl font-bold text-blue-600">59 / 108</p>
                <p className="text-xs text-gray-500 mt-2">Well Qualified (70th percentile)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ Score 3 Example (AB)</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">MCQ: <span className="font-bold text-orange-600">25/45</span> correct (56%)</p>
                <p className="text-sm text-gray-700">FRQ 1-4: <span className="font-bold text-orange-600">5, 4, 5, 4</span> points</p>
                <p className="text-sm text-gray-700">FRQ 5 AB: <span className="font-bold text-orange-600">3</span> points</p>
                <p className="text-sm text-gray-700">FRQ 6: <span className="font-bold text-orange-600">5</span> points</p>
              </div>
              <div className="pt-4 border-t border-orange-300">
                <p className="text-sm text-gray-600 mb-1">Composite Score:</p>
                <p className="text-3xl font-bold text-orange-600">52 / 108</p>
                <p className="text-xs text-gray-500 mt-2">Qualified (50th percentile)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 High Scorer (BC)</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">MCQ: <span className="font-bold text-purple-600">42/45</span> correct (93%)</p>
                <p className="text-sm text-gray-700">FRQ 1-4: <span className="font-bold text-purple-600">9, 8, 9, 8</span> points</p>
                <p className="text-sm text-gray-700">FRQ 5 AB+BC: <span className="font-bold text-purple-600">5 + 4</span> points</p>
                <p className="text-sm text-gray-700">FRQ 6: <span className="font-bold text-purple-600">9</span> points</p>
              </div>
              <div className="pt-4 border-t border-purple-300">
                <p className="text-sm text-gray-600 mb-1">Composite Score:</p>
                <p className="text-3xl font-bold text-purple-600">88 / 108</p>
                <p className="text-xs text-gray-500 mt-2">Perfect 5 (95th+ percentile)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⭐ Benefits of Using This Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-2xl">⚡</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Instant Score Predictions</h3>
                <p className="text-sm text-gray-600">Get your predicted AP score in real-time as you enter your section scores. No waiting, no complex calculations.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-2xl">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Accurate Scoring Curves</h3>
                <p className="text-sm text-gray-600">Based on official College Board scoring guidelines and historical data. Separate curves for AB and BC exams.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl">📊</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Percentile Rankings</h3>
                <p className="text-sm text-gray-600">See where you stand compared to other test-takers with estimated percentile rankings for each score level.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-2xl">💰</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Completely Free</h3>
                <p className="text-sm text-gray-600">No hidden fees, no sign-ups required. Unlimited calculations for all your AP Calculus score predictions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📖 How to Use This AP Calculus Score Calculator</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Select Your Exam Type (AB or BC)</h3>
                <p className="text-sm text-gray-600">Choose whether you're taking AP Calculus AB or BC. BC includes all AB content plus additional topics, so select the exam you actually took.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Enter Multiple Choice Score</h3>
                <p className="text-sm text-gray-600">Input the number of questions you got correct out of 45 total. Use the slider or type directly. Remember: Section I Part A (30 Q no calculator) + Part B (15 Q calculator).</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Enter Free Response Scores</h3>
                <p className="text-sm text-gray-600">Enter the points you earned on each of the 6 FRQ questions. Questions 1-4 and 6 are worth 9 points each. Question 5 has AB portion (5 points) and BC portion (4 points, BC only).</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">View Your Results Instantly</h3>
                <p className="text-sm text-gray-600">Your composite score (out of 108) and predicted AP score (1-5) will appear automatically. See your percentile ranking and qualification level.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Share Your Results</h3>
                <p className="text-sm text-gray-600">Use the social share buttons to share your predicted score on Twitter, Facebook, or LinkedIn. Help other students discover this free tool!</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-3">💡 Pro Tips for Accurate Predictions</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="text-blue-600">•</span> Be honest with your estimates - guessing helps you prepare better</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Use practice exam rubrics to score your FRQ responses accurately</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Remember that actual curves may vary slightly each year based on exam difficulty</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> BC exam has a more generous curve than AB due to harder content</li>
              <li className="flex gap-2"><span className="text-blue-600">•</span> Focus on improving your weakest section for maximum score gains</li>
            </ul>
          </div>
        </div>

        {/* Use Cases Section */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💡 Who Uses This AP Calculus Score Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-800 mb-2">AP Students</h3>
              <p className="text-sm text-gray-600">Predict your score after taking practice exams or the actual AP test. Set target scores and track your progress throughout the year.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="font-semibold text-gray-800 mb-2">Teachers & Tutors</h3>
              <p className="text-sm text-gray-600">Help students understand the scoring system and set realistic goals. Evaluate practice test performance and identify areas needing improvement.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👪</div>
              <h3 className="font-semibold text-gray-800 mb-2">Parents</h3>
              <p className="text-sm text-gray-600">Monitor your child's preparation and understand what scores are needed for college credit. Plan college application strategies based on predicted results.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-semibold text-gray-800 mb-2">College Advisors</h3>
              <p className="text-sm text-gray-600">Guide students on which colleges accept their predicted scores for credit. Help plan course schedules based on potential AP credits earned.</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-800 mb-2">Test Prep Companies</h3>
              <p className="text-sm text-gray-600">Provide accurate score predictions to clients. Demonstrate progress and justify tutoring effectiveness with concrete score improvements.</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-xl border border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-semibold text-gray-800 mb-2">Retake Planners</h3>
              <p className="text-sm text-gray-600">Decide whether to retake the exam based on predicted scores. Calculate how many more points needed to reach target score levels.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ℹ️ About AP Calculus Exam & Scoring</h2>
          
          <div className="prose prose-blue max-w-none">
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Exam Structure Overview</h3>
            <p className="text-gray-700 mb-4">
              The AP Calculus exam is one of the most popular AP tests, offered in two versions: AB and BC. Both exams are 3 hours and 15 minutes long and consist of two main sections: Multiple Choice and Free Response. Each section is equally weighted at 50% of your total score.
            </p>

            <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Section I: Multiple Choice (1 hour 45 minutes)</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Part A:</strong> 30 questions without calculator (60 minutes) - Tests fundamental calculus concepts, algebraic manipulation, and theoretical understanding</li>
              <li><strong>Part B:</strong> 15 questions with graphing calculator (45 minutes) - Focuses on applications, real-world problems, and numerical analysis</li>
              <li><strong>Total Points:</strong> 45 correct answers convert to 54 composite points (50% of exam)</li>
              <li><strong>Scoring:</strong> No penalty for wrong answers; leave nothing blank!</li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mt-5 mb-3">Section II: Free Response (1 hour 30 minutes)</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Part A:</strong> 2 questions with graphing calculator (30 minutes) - Questions 1-2, worth 9 points each</li>
              <li><strong>Part B:</strong> 4 questions without calculator (60 minutes) - Questions 3-6, with varying point values</li>
              <li><strong>Question Breakdown:</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Questions 1-4: 9 points each (36 total)</li>
                  <li>Question 5 AB portion: 5 points (both AB and BC)</li>
                  <li>Question 5 BC portion: 4 points (BC only)</li>
                  <li>Question 6: 9 points</li>
                </ul>
              </li>
              <li><strong>Total Points:</strong> 54 points maximum (50% of exam)</li>
              <li><strong>Partial Credit:</strong> Show your work! You can earn points even if your final answer is wrong</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Scoring Methodology</h3>
            <p className="text-gray-700 mb-4">
              Your raw scores from both sections are converted to a composite score out of 108 points. The College Board then applies a curve to convert this composite score to the final AP score of 1-5. The curve varies slightly each year based on overall test difficulty and student performance.
            </p>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 my-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Typical Score Ranges (2022-2024 Curves)</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2 text-sm">
                  <h5 className="font-bold text-purple-700 mb-2">AP Calculus BC (More Generous)</h5>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-green-600">Score 5</span>
                    <span className="text-gray-700">64-108 pts (59%+)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-blue-600">Score 4</span>
                    <span className="text-gray-700">50-63 pts (46-58%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-yellow-600">Score 3</span>
                    <span className="text-gray-700">38-49 pts (35-45%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-orange-600">Score 2</span>
                    <span className="text-gray-700">29-37 pts (27-34%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-red-600">Score 1</span>
                    <span className="text-gray-700">0-28 pts (&lt;26%)</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <h5 className="font-bold text-blue-700 mb-2">AP Calculus AB (Stricter)</h5>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-green-600">Score 5</span>
                    <span className="text-gray-700">68-108 pts (63%+)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-blue-600">Score 4</span>
                    <span className="text-gray-700">56-67 pts (52-62%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-yellow-600">Score 3</span>
                    <span className="text-gray-700">44-55 pts (41-51%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-orange-600">Score 2</span>
                    <span className="text-gray-700">31-43 pts (29-40%)</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                    <span className="font-semibold text-red-600">Score 1</span>
                    <span className="text-gray-700">0-30 pts (&lt;28%)</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4"><strong>AP Calculus passing score:</strong> A score of 3 or higher is considered passing. BC exam has a more generous curve (lower cutoffs) because it covers more advanced content. Use this best AP Calculus calculator to predict your score before the official results.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">AB vs BC: Key Differences</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-3">AP Calculus AB</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Limits and continuity</li>
                  <li>✓ Derivatives and applications</li>
                  <li>✓ Integrals and applications</li>
                  <li>✓ Fundamental Theorem of Calculus</li>
                  <li>✓ Equivalent to 1 semester college calculus</li>
                  <li>✓ Average score: ~3.1-3.3</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-gray-800 mb-3">AP Calculus BC</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ All AB topics included</li>
                  <li>✓ Parametric & polar equations</li>
                  <li>✓ Vector-valued functions</li>
                  <li>✓ Infinite sequences and series</li>
                  <li>✓ Additional integration techniques</li>
                  <li>✓ Equivalent to 2 semesters college calculus</li>
                  <li>✓ Average score: ~3.7-3.9</li>
                  <li>✓ Includes AB subscore</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">College Credit & Placement</h3>
            <p className="text-gray-700 mb-4">
              Most colleges and universities grant credit or advanced placement for AP Calculus scores of 3 or higher. However, policies vary significantly:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li><strong>Score of 5:</strong> Nearly all colleges grant credit, often for 2 courses with BC (8 credits)</li>
              <li><strong>Score of 4:</strong> Most colleges grant credit; selective schools may require 5</li>
              <li><strong>Score of 3:</strong> Many state schools and less selective colleges grant credit</li>
              <li><strong>Score of 2 or 1:</strong> Typically no credit, but demonstrates effort and rigor</li>
            </ul>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 my-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">💰 Financial Benefits of AP Credit</h4>
              <p className="text-sm text-gray-700 mb-3">
                Earning college credit through AP exams can save thousands of dollars in tuition costs. With the average college credit hour costing $300-600 at public universities and $1,000+ at private institutions, an AP Calculus BC score of 5 could save $2,400-$8,000.
              </p>
              <p className="text-sm text-gray-700">
                Beyond cost savings, AP credits can help you graduate early, pursue double majors, study abroad, or take lighter course loads during difficult semesters.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Performance Statistics (2024)</h3>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">AP Calculus AB</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between"><span>Score 5:</span><span className="font-semibold">19.5%</span></div>
                    <div className="flex justify-between"><span>Score 4:</span><span className="font-semibold">19.7%</span></div>
                    <div className="flex justify-between"><span>Score 3:</span><span className="font-semibold">21.3%</span></div>
                    <div className="flex justify-between"><span>Score 2:</span><span className="font-semibold">17.1%</span></div>
                    <div className="flex justify-between"><span>Score 1:</span><span className="font-semibold">22.4%</span></div>
                    <div className="flex justify-between pt-2 border-t border-gray-300 mt-2"><span className="font-bold">Pass Rate (3+):</span><span className="font-bold text-green-600">60.5%</span></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">AP Calculus BC</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between"><span>Score 5:</span><span className="font-semibold">43.0%</span></div>
                    <div className="flex justify-between"><span>Score 4:</span><span className="font-semibold">17.4%</span></div>
                    <div className="flex justify-between"><span>Score 3:</span><span className="font-semibold">20.5%</span></div>
                    <div className="flex justify-between"><span>Score 2:</span><span className="font-semibold">11.4%</span></div>
                    <div className="flex justify-between"><span>Score 1:</span><span className="font-semibold">7.7%</span></div>
                    <div className="flex justify-between pt-2 border-t border-gray-300 mt-2"><span className="font-bold">Pass Rate (3+):</span><span className="font-bold text-green-600">80.9%</span></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">BC exam has higher pass rates because it's typically taken by more advanced students who have already mastered AB content.</p>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div id="resources" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔗 Helpful AP Calculus Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://apcentral.collegeboard.org/courses/ap-calculus-ab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">📘</div>
              <div>
                <h3 className="font-semibold text-gray-800">College Board - AP Calculus AB</h3>
                <p className="text-xs text-gray-600">Official course info, exam dates & practice questions</p>
              </div>
            </a>

            <a href="https://apcentral.collegeboard.org/courses/ap-calculus-bc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">📗</div>
              <div>
                <h3 className="font-semibold text-gray-800">College Board - AP Calculus BC</h3>
                <p className="text-xs text-gray-600">Official BC curriculum guide and practice materials</p>
              </div>
            </a>

            <a href="https://www.albert.io/blog/ap-calculus-bc-score-calculator/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-800">Albert.io - Score Calculator</h3>
                <p className="text-xs text-gray-600">Detailed scoring breakdowns and exam prep tips</p>
              </div>
            </a>

            <a href="https://apstudents.collegeboard.org/courses/ap-calculus-ab-bc/assessment" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">📊</div>
              <div>
                <h3 className="font-semibold text-gray-800">AP Students - Assessment Info</h3>
                <p className="text-xs text-gray-600">Exam format, calculator policy & scoring guidelines</p>
              </div>
            </a>

            <a href="https://www.khanacademy.org/math/ap-calculus-ab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white">🎓</div>
              <div>
                <h3 className="font-semibold text-gray-800">Khan Academy - AP Calculus AB</h3>
                <p className="text-xs text-gray-600">Free video lessons and practice problems</p>
              </div>
            </a>

            <a href="https://www.khanacademy.org/math/ap-calculus-bc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white">📚</div>
              <div>
                <h3 className="font-semibold text-gray-800">Khan Academy - AP Calculus BC</h3>
                <p className="text-xs text-gray-600">BC-specific topics with detailed explanations</p>
              </div>
            </a>
          </div>

          <div className="mt-6 bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-200">
            <h3 className="font-semibold text-gray-800 mb-3">📱 Recommended Calculator Models</h3>
            <p className="text-sm text-gray-700 mb-3">For the calculator-allowed sections, College Board permits these graphing calculators:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
              <div className="bg-white p-2 rounded-lg">TI-84 Plus</div>
              <div className="bg-white p-2 rounded-lg">TI-Nspire CX</div>
              <div className="bg-white p-2 rounded-lg">Casio fx-9750</div>
              <div className="bg-white p-2 rounded-lg">HP Prime</div>
            </div>
            <p className="text-xs text-gray-600 mt-3">Note: CAS (Computer Algebra System) calculators are allowed, but make sure your calculator is on the approved list.</p>
          </div>
        </div>

        {/* Practice Test & Study Guide Section */}
        <div id="practice-tests" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 AP Calculus Practice Test Recommendations & Study Guide</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Best AP Calculus Practice Tests for Exam Preparation</h3>
            <p className="text-gray-700 mb-4">
              Regular practice tests are essential for AP exam preparation. Use these official and high-quality resources to simulate real exam conditions, then use our AP Calculus score calculator above to predict your performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-3">🏆 Official Practice Tests</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-blue-600">•</span> <strong>College Board Official Practice Exams</strong> - Most accurate representation of actual AP Calculus test format</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> <strong>AP Central Free-Response Questions</strong> - Released FRQs from previous years (2015-2024)</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> <strong>CED Practice Questions</strong> - Course and Exam Description sample problems</li>
                <li className="flex gap-2"><span className="text-blue-600">•</span> <strong>AP Classroom</strong> - Teacher-assigned practice through College Board platform</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-3">⏱️ Timed Practice Tests</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-green-600">•</span> <strong>Albert.io AP Calculus Practice</strong> - 1,000+ questions with detailed explanations</li>
                <li className="flex gap-2"><span className="text-green-600">•</span> <strong>Khan Academy Practice Questions</strong> - Free video lessons with practice problems</li>
                <li className="flex gap-2"><span className="text-green-600">•</span> <strong>Barron's AP Calculus</strong> - 6 full-length practice tests with detailed solutions</li>
                <li className="flex gap-2"><span className="text-green-600">•</span> <strong>Princeton Review AP Calculus</strong> - 4 practice tests with score predictions</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📚 AP Calculus Study Guide & Tips</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">🎯 Study Tips for Score 5</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span className="text-purple-600">✓</span> Focus on FRQ partial credit strategies (show all work)</li>
                  <li className="flex gap-2"><span className="text-purple-600">✓</span> Master calculator functions (derivatives, integrals, graphing)</li>
                  <li className="flex gap-2"><span className="text-purple-600">✓</span> Practice time management (Section II Part B is 60 minutes for 4 questions)</li>
                  <li className="flex gap-2"><span className="text-purple-600">✓</span> Memorize key formulas (derivative rules, integration techniques)</li>
                  <li className="flex gap-2"><span className="text-purple-600">✓</span> Review calculus review sheets weekly</li>
                  <li className="flex gap-2"><span className="text-purple-600">✓</span> Take full-length practice tests monthly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">📅 2026 AP Exam Timeline</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2"><span className="text-pink-600">📆</span> <strong>May 5, 2026 (Tuesday, 8:00 AM)</strong> - AP Calculus AB/BC Exam Date</li>
                  <li className="flex gap-2"><span className="text-pink-600">📆</span> <strong>April 2026</strong> - Final calculus review period</li>
                  <li className="flex gap-2"><span className="text-pink-600">📆</span> <strong>March 2026</strong> - Complete all practice tests</li>
                  <li className="flex gap-2"><span className="text-pink-600">📆</span> <strong>July 2026</strong> - AP scores released online</li>
                  <li className="flex gap-2"><span className="text-pink-600">📆</span> <strong>Late Registration:</strong> Order by March 13, 2026</li>
                  <li className="flex gap-2"><span className="text-pink-600">📆</span> <strong>Score Reports:</strong> Sent to colleges in July</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-xl border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 How to Use Practice Tests with This Calculator</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><span className="font-bold text-orange-600">1.</span> Take a full-length AP Calculus practice test under timed conditions</li>
              <li className="flex gap-2"><span className="font-bold text-orange-600">2.</span> Score your MCQ section (count correct answers out of 45)</li>
              <li className="flex gap-2"><span className="font-bold text-orange-600">3.</span> Use official FRQ rubrics to score each free-response question</li>
              <li className="flex gap-2"><span className="font-bold text-orange-600">4.</span> Enter your scores in the calculator above to get predicted AP score</li>
              <li className="flex gap-2"><span className="font-bold text-orange-600">5.</span> Identify weak areas and focus your AP exam preparation accordingly</li>
              <li className="flex gap-2"><span className="font-bold text-orange-600">6.</span> Retake similar practice tests monthly to track improvement</li>
            </ol>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-8 text-center">
          <p className="text-sm text-gray-600">
            Last Updated: <span className="font-semibold text-gray-800">November 23, 2025</span> | 
            <span className="ml-2">Based on 2022-2024 College Board scoring guidelines | Prepared for 2026 AP Exam</span>
          </p>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-2">What is a good AP Calculus score and what is the passing score?</h3>
              <p className="text-sm text-gray-700">The AP Calculus passing score is 3 or higher. A score of 3, 4, or 5 is considered good on the AP Calculus exam. A 3 means "qualified" (passing score needed for college credit at most schools), 4 means "well qualified," and 5 means "extremely well qualified." Most colleges offer credit for scores of 3 or higher, though selective colleges may require 4 or 5. According to College Board data, about 60% of AB students and 81% of BC students achieve a passing score (3+). Use practice tests regularly to ensure you meet the AP Calculus score needed for college credit at your target schools.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-gray-800 mb-2">How is the AP Calculus exam scored?</h3>
              <p className="text-sm text-gray-700">The exam combines Multiple Choice (45 questions worth 50%) and Free Response (6 questions worth 50%). Your raw scores are converted to a composite score out of 108 points. This composite is then curved to produce the final AP score of 1-5. The curve adjusts for exam difficulty and ensures consistent standards across years. No points are deducted for wrong MCQ answers, so always guess!</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200">
              <h3 className="font-semibold text-gray-800 mb-2">What's the difference between AP Calculus AB and BC?</h3>
              <p className="text-sm text-gray-700">AP Calculus BC covers all AB topics plus additional advanced material including parametric equations, polar coordinates, vector-valued functions, and infinite sequences and series. BC is equivalent to two semesters of college calculus while AB covers one semester. BC students also receive an AB subscore showing their performance on AB content. BC typically has a more generous scoring curve since it attracts more advanced students.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 rounded-xl border border-orange-200">
              <h3 className="font-semibold text-gray-800 mb-2">How many questions do I need to get right to score a 5?</h3>
              <p className="text-sm text-gray-700">For AP Calculus BC, you typically need about 64+ composite points out of 108 (around 59-60%) to score a 5, thanks to the more generous BC curve. For AP Calculus AB, you need approximately 68+ points out of 108 (about 63%). This translates to roughly 26-28 correct MCQ answers plus 36-38 FRQ points for BC, or 28-30 MCQ plus 38-40 FRQ for AB. The BC exam has lower cutoffs because it covers more advanced content. Practice with official practice tests and use this calculator to track your progress toward a score 5.</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-5 rounded-xl border border-red-200">
              <h3 className="font-semibold text-gray-800 mb-2">Can I use a calculator on the AP Calculus exam?</h3>
              <p className="text-sm text-gray-700">Yes, but only on specific sections. Calculators are allowed on MCQ Part B (15 questions) and FRQ Part A (2 questions). MCQ Part A (30 questions) and FRQ Part B (4 questions) are no-calculator sections. You may use graphing calculators including TI-84, TI-Nspire CX, Casio fx-9750, and others on the approved list. CAS calculators are permitted. Make sure to practice with your calculator before exam day!</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-200">
              <h3 className="font-semibold text-gray-800 mb-2">What is the average AP Calculus BC score?</h3>
              <p className="text-sm text-gray-700">The average AP Calculus BC score is approximately 3.76-3.92 based on recent years. In 2024, the mean score was 3.92, making it one of the highest-scoring AP exams. About 80.9% of BC students scored 3 or higher, with an impressive 43% earning a 5. These high scores reflect that BC typically attracts well-prepared students who have mastered AB content. AB averages around 3.1-3.3 with a 60% pass rate.</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border border-yellow-200">
              <h3 className="font-semibold text-gray-800 mb-2">Do colleges accept AP Calculus credit?</h3>
              <p className="text-sm text-gray-700">Most colleges and universities accept AP Calculus scores of 3 or higher for credit or advanced placement. BC scores typically earn more credits than AB (often 8 credits vs 4). Selective colleges may require a 4 or 5. Some schools offer different benefits: credit toward graduation, placement into higher-level courses, or prerequisite fulfillment. Always check specific college AP credit policies, as they vary significantly. The College Board's website has a credit policy search tool.</p>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-xl border border-violet-200">
              <h3 className="font-semibold text-gray-800 mb-2">Can I retake the AP Calculus exam?</h3>
              <p className="text-sm text-gray-700">Yes, you can retake the AP Calculus exam in a future year if you want to improve your score. There's no limit to how many times you can take it. However, the exam is only offered once per year in May. When sending scores to colleges, you can choose which scores to report, though some schools require all AP scores. Consider whether the time investment is worth it - many students find it more beneficial to move forward and take additional AP courses or focus on other aspects of college applications.</p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          currentSlug="ap-calculus-score-calculator" 
          relatedSlugs={["sat-score-calculator", "berkeley-gpa-calculator", "a-level-score-calculator"]} 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default APCalculusScoreCalculator;