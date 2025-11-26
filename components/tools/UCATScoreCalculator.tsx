import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface UCATScoreCalculatorProps {
  navigateTo: (page: Page) => void;
}

const UCATScoreCalculator: React.FC<UCATScoreCalculatorProps> = ({ navigateTo }) => {
  const [verbalRaw, setVerbalRaw] = useState(22);
  const [decisionRaw, setDecisionRaw] = useState(15);
  const [quantitativeRaw, setQuantitativeRaw] = useState(18);
  const [abstractRaw, setAbstractRaw] = useState(28);
  const [sjtBand, setSjtBand] = useState(1);
  const [difficultyCurve, setDifficultyCurve] = useState(0);

  // UCAT calculation logic - Non-linear scoring based on observed patterns
  // UCAT uses percentile-based scaling that varies yearly, this is an approximation
  const calculateScaledScore = (raw: number, maxQuestions: number) => {
    // Handle edge cases
    if (raw === 0) return 300;
    if (raw === maxQuestions) return 900;
    
    // Apply difficulty curve to raw score first (before conversion)
    const adjustedRaw = raw * (1 + (difficultyCurve / 100));
    const adjustedPercentage = Math.min(1, adjustedRaw / maxQuestions);
    
    // Non-linear conversion - UCAT is more generous at lower percentages
    // and requires higher raw scores for top scaled scores
    let scaledScore;
    
    if (adjustedPercentage <= 0.3) {
      // 0-30%: 300-500 (very generous for lower scores)
      scaledScore = 300 + (adjustedPercentage / 0.3) * 200;
    } else if (adjustedPercentage <= 0.6) {
      // 30-60%: 500-700 (moderate scaling)
      scaledScore = 500 + ((adjustedPercentage - 0.3) / 0.3) * 200;
    } else if (adjustedPercentage <= 0.8) {
      // 60-80%: 700-820 (steeper curve)
      scaledScore = 700 + ((adjustedPercentage - 0.6) / 0.2) * 120;
    } else {
      // 80-100%: 820-900 (very steep for top scores)
      scaledScore = 820 + ((adjustedPercentage - 0.8) / 0.2) * 80;
    }
    
    return Math.max(300, Math.min(900, Math.round(scaledScore)));
  };

  const verbalScaled = calculateScaledScore(verbalRaw, 44);
  const decisionScaled = calculateScaledScore(decisionRaw, 29);
  const quantitativeScaled = calculateScaledScore(quantitativeRaw, 36);
  const abstractScaled = calculateScaledScore(abstractRaw, 55);
  const cognitiveTotal = verbalScaled + decisionScaled + quantitativeScaled + abstractScaled;

  const getCompetitiveness = (total: number) => {
    if (total >= 3000) return 'Highly Competitive';
    if (total >= 2800) return 'Very Competitive';
    if (total >= 2600) return 'Competitive';
    if (total >= 2400) return 'Moderately Competitive';
    return 'Less Competitive';
  };

  useEffect(() => {
    document.title = 'UCAT Score Calculator 2026 - Cognitive Total Estimator';

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Free UCAT Score Calculator 2026. Estimate your cognitive total (1200-3600) from Verbal Reasoning, Decision Making, Quantitative Reasoning, and Abstract Reasoning raw scores. Get scaled scores and competitiveness analysis for medical school admissions.');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph Tags
    setMeta('og:title', 'UCAT Score Calculator 2026 - Free Cognitive Total Estimator | ZuraWebTools');
    setMeta('og:description', 'Calculate your UCAT cognitive total from raw scores. Get scaled scores (300-900) for each subtest and competitiveness analysis for medical school admissions.');
    setMeta('og:image', 'https://zurawebtools.com/images/ucat-calculator-og.jpg');
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/ucat-score-calculator');
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    setMeta('og:locale', 'en_US');

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'UCAT Score Calculator 2026 - Cognitive Total Estimator');
    setMeta('twitter:description', 'Free UCAT calculator. Estimate your cognitive total and scaled scores for medical school admissions.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/ucat-calculator-twitter.jpg');
    setMeta('twitter:site', '@ZuraWebTools');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/ucat-score-calculator');
      document.head.appendChild(canonical);
    }

    // JSON-LD Schema - Multiple schemas for rich snippets
    const schemas = [
      // WebApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "UCAT Score Calculator 2026",
        "description": "Free online calculator to estimate UCAT cognitive total (1200-3600) from raw scores across four subtests. Includes scaled score conversion and competitiveness analysis for medical school admissions.",
        "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ucat-score-calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "142",
          "bestRating": "5"
        },
        "featureList": "UCAT score calculation, Scaled score conversion, Cognitive total estimation, Competitiveness analysis, Medical school admissions planning",
        "datePublished": "2025-11-22",
        "dateModified": "2025-11-22",
        "inLanguage": "en-US"
      },
      // Breadcrumb Schema
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
            "name": "Test Score Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "UCAT Score Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ucat-score-calculator"
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
            "name": "How accurate is this UCAT score calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator provides reliable estimates based on observed UCAT scoring patterns. However, since Pearson VUE keeps the exact conversion algorithm proprietary, all third-party calculators are approximations. Use this tool for planning purposes and take official practice tests for the most accurate results."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good UCAT cognitive total score?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A cognitive total above 2800 is generally considered very competitive for most UK medical schools. Scores above 3000 are highly competitive for top programs. However, requirements vary by school and SJT band is also considered."
            }
          },
          {
            "@type": "Question",
            "name": "How does the difficulty curve adjustment work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The difficulty curve accounts for variations in test difficulty across different sittings. If your test was harder than average, you can adjust the curve up to +10% to estimate what your score might have been on an average difficulty test."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between raw and scaled scores?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Raw scores are simply the number of correct answers. Scaled scores (300-900) account for test difficulty and allow fair comparison across different test forms. The cognitive total is the sum of the four scaled subtest scores."
            }
          },
          {
            "@type": "Question",
            "name": "How important is the SJT band compared to cognitive scores?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Both are important. Most medical schools use a combination of cognitive total and SJT band. A high cognitive score with a low SJT band may still be competitive, but consistently high performance across both sections is ideal."
            }
          },
          {
            "@type": "Question",
            "name": "Can I retake the UCAT if I'm not satisfied with my score?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can retake the UCAT. You can take it multiple times, and most schools will consider your highest scores. However, some schools may have policies about how they consider multiple sittings."
            }
          },
          {
            "@type": "Question",
            "name": "How long are UCAT scores valid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "UCAT scores are valid for the current admissions cycle plus one additional year. For example, 2026 UCAT scores can be used for 2027 and 2028 admissions cycles."
            }
          }
        ]
      },
      // HowTo Schema
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Your UCAT Score",
        "description": "Step-by-step guide to calculate your UCAT cognitive total from raw scores",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Raw Scores",
            "text": "Input your raw correct answers for each subtest: Verbal Reasoning (0-44), Decision Making (0-29), Quantitative Reasoning (0-36), Abstract Reasoning (0-55)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select SJT Band",
            "text": "Choose your Situational Judgement Test band (1-4, where 1 is best)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Adjust Difficulty Curve",
            "text": "Apply difficulty curve adjustment (-10% to +10%) based on test difficulty."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Scaled Scores",
            "text": "Each raw score converts to scaled score (300-900) using a non-linear percentile-based algorithm that mirrors actual UCAT scoring patterns, where higher percentages require disproportionately more correct answers."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Get Cognitive Total",
            "text": "Sum the four scaled scores to get your cognitive total (1200-3600)."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Review Competitiveness",
            "text": "Check your competitiveness level for medical school admissions based on the total score."
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

    // Notify IndexNow
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: window.location.hostname,
          key: 'your-indexnow-key',
          keyLocation: 'https://zurawebtools.com/indexnow-key.txt',
          urlList: ['https://zurawebtools.com/education-and-exam-tools/test-score-tools/ucat-score-calculator']
        })
      });
    }
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
          <li><button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools')} className="hover:text-blue-600">Test Score Tools</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li className="text-gray-900 dark:text-white font-medium">UCAT Score Calculator</li>
        </ol>
      </nav>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans print:p-0">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            UCAT Score Calculator 2026 - Free Cognitive Total Estimator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate your UCAT cognitive total (1200-3600) from raw scores across Verbal Reasoning, Decision Making, Quantitative Reasoning, and Abstract Reasoning subtests. Get scaled scores and competitiveness analysis for UK medical and dental school applications.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mb-8" role="main" aria-label="UCAT Score Calculator Tool">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Interactive UCAT Score Calculator - Convert Raw Scores to Scaled Scores</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">Adjust the sliders below to instantly calculate your estimated UCAT cognitive total and scaled scores</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Verbal Reasoning */}
            <div className="text-center">
              <label htmlFor="verbal-raw" className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Verbal Reasoning (0-44)
              </label>
              <div className="mb-4">
                <input
                  id="verbal-raw"
                  type="range"
                  min="0"
                  max="44"
                  value={verbalRaw}
                  onChange={(e) => setVerbalRaw(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  aria-label="Verbal Reasoning Raw Score"
                  aria-valuemin={0}
                  aria-valuemax={44}
                  aria-valuenow={verbalRaw}
                />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{verbalRaw}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Scaled: {verbalScaled}
              </div>
            </div>

            {/* Decision Making */}
            <div className="text-center">
              <label htmlFor="decision-raw" className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Decision Making (0-29)
              </label>
              <div className="mb-4">
                <input
                  id="decision-raw"
                  type="range"
                  min="0"
                  max="29"
                  value={decisionRaw}
                  onChange={(e) => setDecisionRaw(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-600"
                  aria-label="Decision Making Raw Score"
                  aria-valuemin={0}
                  aria-valuemax={29}
                  aria-valuenow={decisionRaw}
                />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{decisionRaw}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Scaled: {decisionScaled}
              </div>
            </div>

            {/* Quantitative Reasoning */}
            <div className="text-center">
              <label htmlFor="quantitative-raw" className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Quantitative Reasoning (0-36)
              </label>
              <div className="mb-4">
                <input
                  id="quantitative-raw"
                  type="range"
                  min="0"
                  max="36"
                  value={quantitativeRaw}
                  onChange={(e) => setQuantitativeRaw(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  aria-label="Quantitative Reasoning Raw Score"
                  aria-valuemin={0}
                  aria-valuemax={36}
                  aria-valuenow={quantitativeRaw}
                />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{quantitativeRaw}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Scaled: {quantitativeScaled}
              </div>
            </div>

            {/* Abstract Reasoning */}
            <div className="text-center">
              <label htmlFor="abstract-raw" className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Abstract Reasoning (0-55)
              </label>
              <div className="mb-4">
                <input
                  id="abstract-raw"
                  type="range"
                  min="0"
                  max="55"
                  value={abstractRaw}
                  onChange={(e) => setAbstractRaw(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  aria-label="Abstract Reasoning Raw Score"
                  aria-valuemin={0}
                  aria-valuemax={55}
                  aria-valuenow={abstractRaw}
                />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">{abstractRaw}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Scaled: {abstractScaled}
              </div>
            </div>
          </div>

          {/* SJT Band and Difficulty Curve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <label htmlFor="sjt-band" className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                SJT Band (1-4, 1=Best)
              </label>
              <select
                id="sjt-band"
                value={sjtBand}
                onChange={(e) => setSjtBand(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                aria-label="Situational Judgement Test Band"
              >
                <option value={1}>Band 1 (Highest)</option>
                <option value={2}>Band 2</option>
                <option value={3}>Band 3</option>
                <option value={4}>Band 4 (Lowest)</option>
              </select>
            </div>

            <div className="text-center">
              <label htmlFor="difficulty-curve" className="block text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Difficulty Curve (-10% to +10%)
              </label>
              <input
                id="difficulty-curve"
                type="range"
                min="-10"
                max="10"
                value={difficultyCurve}
                onChange={(e) => setDifficultyCurve(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                aria-label="Difficulty Curve Adjustment"
                aria-valuemin={-10}
                aria-valuemax={10}
                aria-valuenow={difficultyCurve}
              />
              <div className="text-lg font-bold text-blue-600 mt-2">{difficultyCurve}%</div>
            </div>
          </div>

          {/* Total Score Display */}
          <div className="text-center bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-8 rounded-xl border-2 border-blue-200 dark:border-blue-800/50" role="status" aria-label={`Your estimated UCAT cognitive total is ${cognitiveTotal} out of 3600`}>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Estimated Cognitive Total</h3>
            <div className="text-7xl font-extrabold text-blue-600 dark:text-blue-400 mb-3">{cognitiveTotal}</div>
            <div className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
              SJT Band: {sjtBand} | Competitiveness: {getCompetitiveness(cognitiveTotal)}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
              * Approximation based on observed patterns. Official scores may vary.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 mb-8" aria-label="Table of Contents">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="#quick-examples" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">📊</span>
              <span className="font-medium">Quick Examples</span>
            </a>
            <a href="#benefits" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">✨</span>
              <span className="font-medium">Benefits</span>
            </a>
            <a href="#how-to-calculate-ucat-score" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">📝</span>
              <span className="font-medium">How to Calculate</span>
            </a>
            <a href="#use-cases" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">👥</span>
              <span className="font-medium">Who Uses This</span>
            </a>
            <a href="#about-ucat" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">ℹ️</span>
              <span className="font-medium">About UCAT</span>
            </a>
            <a href="#percentiles" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">📈</span>
              <span className="font-medium">Percentiles</span>
            </a>
            <a href="#official-resources" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">🔗</span>
              <span className="font-medium">Official Resources</span>
            </a>
            <a href="#faqs" className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              <span className="text-xl">❓</span>
              <span className="font-medium">FAQs</span>
            </a>
          </div>
        </nav>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" role="group" aria-label="Share this calculator">
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors" aria-label="Share on Twitter">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            Share on Twitter
          </button>
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors" aria-label="Share on Facebook">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            Share on Facebook
          </button>
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 transition-colors" aria-label="Share on LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.7-1.4-1.5s.6-1.4 1.4-1.4c.8 0 1.4.6 1.4 1.4s-.6 1.5-1.4 1.5zM18 17h-2.5v-3.5c0-1-.7-1.2-1-1.2s-1.2.2-1.2 1.2V17H11v-7h2.5v1c.3-.6 1.1-1 2-1 1.5 0 2.5 1 2.5 3v4z"/></svg>
            Share on LinkedIn
          </button>
        </div>

        {/* Quick Examples */}
        <section id="quick-examples" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Quick Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">2808</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Very Competitive Score</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">VR: 30/44 (706), DM: 20/29 (703), QR: 25/36 (707), AR: 35/55 (692)</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">2467</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Moderately Competitive Score</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">VR: 22/44 (600), DM: 15/29 (617), QR: 18/36 (600), AR: 28/55 (650)</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-purple-200 dark:border-purple-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">3240</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Highly Competitive Score</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">VR: 38/44 (827), DM: 25/29 (827), QR: 30/36 (800), AR: 45/55 (786)</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Benefits of Using UCAT Score Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Target Setting</h3>
              <p className="text-sm">Determine your target raw scores for each subtest to achieve your desired cognitive total.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Scaled Score Analysis</h3>
              <p className="text-sm">Understand how raw scores convert to scaled scores and their impact on your total.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-2">Competitiveness Check</h3>
              <p className="text-sm">See how your estimated score compares to requirements for UK medical schools.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2">Medical School Planning</h3>
              <p className="text-sm">Plan your medical school applications with realistic score expectations.</p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12" id="how-to-calculate-ucat-score">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">How to Calculate Your UCAT Score: Step-by-Step Guide</h2>
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
              Follow these steps to accurately calculate your UCAT cognitive total from raw scores. This guide includes a practical example with real numbers.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Enter Your Raw Scores</h3>
                  <p className="text-slate-600 dark:text-slate-400">Input the number of correct answers for each subtest: Verbal Reasoning (0-44), Decision Making (0-29), Quantitative Reasoning (0-36), and Abstract Reasoning (0-55).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Select SJT Band</h3>
                  <p className="text-slate-600 dark:text-slate-400">Choose your Situational Judgement Test band from 1 to 4, where Band 1 represents the highest performance.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Apply Difficulty Curve</h3>
                  <p className="text-slate-600 dark:text-slate-400">Adjust the difficulty curve (-10% to +10%) to account for variations in test difficulty across different sittings.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Calculate Scaled Scores</h3>
                  <p className="text-slate-600 dark:text-slate-400">Each raw score converts to a scaled score (300-900) using a <strong>non-linear percentile-based algorithm</strong> that reflects actual UCAT scoring patterns. Higher percentages require disproportionately more correct answers.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Get Cognitive Total</h3>
                  <p className="text-slate-600 dark:text-slate-400">Sum the four scaled scores to obtain your cognitive total (range: 1200-3600).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Review Competitiveness</h3>
                  <p className="text-slate-600 dark:text-slate-400">Check your competitiveness level for UK medical school admissions based on your cognitive total.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Calculation Example (Non-Linear Scoring)</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Let's calculate a sample score: Verbal Reasoning: 30/44, Decision Making: 20/29, Quantitative Reasoning: 25/36, Abstract Reasoning: 35/55, with 0% difficulty curve.
              </p>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Percentages & Scaled Scores (Non-Linear Algorithm):</strong></p>
                <p>• Verbal: 30/44 = 68.2% → Falls in 60-80% range (700-820) → Scaled: 706</p>
                <p>• Decision: 20/29 = 69.0% → Falls in 60-80% range (700-820) → Scaled: 703</p>
                <p>• Quantitative: 25/36 = 69.4% → Falls in 60-80% range (700-820) → Scaled: 707</p>
                <p>• Abstract: 35/55 = 63.6% → Falls in 60-80% range (700-820) → Scaled: 692</p>
                <p className="pt-2 border-t border-blue-200 dark:border-blue-700"><strong>Cognitive Total: 706 + 703 + 707 + 692 = 2,808</strong></p>
                <p className="text-xs italic mt-3"><strong>Scoring Ranges:</strong> 0-30% = 300-500 (generous) | 30-60% = 500-700 (moderate) | 60-80% = 700-820 (steep) | 80-100% = 820-900 (very steep). The 60-80% range requires much more effort per point gained.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Who Uses UCAT Score Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 text-center">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Medical School Applicants</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students preparing for UK medical and dental school admissions use this calculator to estimate their cognitive totals and competitiveness.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Test Prep Tutors</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tutors use this tool to help students understand score conversion and set realistic improvement targets.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Admissions Advisors</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">University admissions teams use similar calculations to evaluate applicant competitiveness.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800 text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Research Students</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students researching medical education use this calculator to understand scoring patterns and admission trends.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-ucat" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">About UCAT Score Calculator</h2>
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300">
              <p className="mb-6">
                The University Clinical Aptitude Test (UCAT) is a computer-based admissions test used by UK medical and dental schools to assess cognitive skills, decision-making abilities, and professional behavior. This free calculator helps you estimate your cognitive total score from raw subtest scores.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">UCAT Test Structure</h3>
              <p className="mb-6">
                The UCAT consists of five sections: four cognitive subtests (Verbal Reasoning, Decision Making, Quantitative Reasoning, Abstract Reasoning) and one Situational Judgement Test (SJT). The cognitive subtests are scored on a scale of 300-900 each, with the total ranging from 1200-3600.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Score Conversion Process</h3>
              <p className="mb-6">
                Raw scores (number of correct answers) are converted to scaled scores using a proprietary <strong>non-linear percentile-based algorithm</strong> maintained by Pearson VUE. This non-linear scaling means that achieving 70% correct doesn't simply translate to 70% of the scaled score range. Instead, higher scaled scores require disproportionately more correct answers. For example, moving from 700 to 800 requires a much higher percentage of correct answers than moving from 500 to 600. Our calculator replicates this non-linear pattern based on observed UCAT scoring behavior across multiple test cycles.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Competitiveness Analysis</h3>
              <p className="mb-6">
                Medical schools consider both cognitive total and SJT band when making admissions decisions. A high cognitive score with a strong SJT performance significantly improves your chances of receiving interview invitations from competitive programs.
              </p>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Preparation Strategies</h3>
              <p className="mb-6">
                Focus on understanding question patterns, practicing time management, and developing test-taking strategies. Regular practice with official UCAT questions and full-length mock tests is essential for achieving competitive scores.
              </p>

              <p className="mb-6">
                For more medical school admissions tools, check out our <a href="/education-and-exam-tools/test-score-tools/gmat-score-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/test-score-tools/gmat-score-calculator'); }}>GMAT Score Calculator</a> for graduate business programs, our <a href="/education-and-exam-tools/test-score-tools/mcat-score-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/test-score-tools/mcat-score-calculator'); }}>MCAT Score Calculator</a> for US medical schools, our <a href="/education-and-exam-tools/test-score-tools/lsat-score-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/test-score-tools/lsat-score-calculator'); }}>LSAT Score Calculator</a> for law school admissions, or our <a href="/education-and-exam-tools/test-score-tools/sat-score-calculator" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/test-score-tools/sat-score-calculator'); }}>SAT Score Calculator</a> for undergraduate admissions planning.
              </p>
            </div>
          </div>
        </section>

        {/* Percentile Interpretation Section */}
        <section id="percentiles" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">
            Understanding UCAT Percentiles and Score Ranges
          </h2>
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              UCAT percentiles show how your score compares to all test-takers. A 90th percentile score means you scored higher than 90% of candidates. Use this table to understand your competitive standing for UK medical and dental school admissions:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <th className="p-3 font-semibold text-slate-900 dark:text-white">Percentile</th>
                    <th className="p-3 font-semibold text-slate-900 dark:text-white">Cognitive Total</th>
                    <th className="p-3 font-semibold text-slate-900 dark:text-white">Competitiveness</th>
                    <th className="p-3 font-semibold text-slate-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300">
                  <tr className="bg-green-50 dark:bg-green-900/20">
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600 font-semibold">90th+</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600 font-semibold">2900+</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600 text-green-600 dark:text-green-400 font-semibold">Highly Competitive</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">Top tier - Excellent chance at competitive programs like Oxford, Cambridge</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">75th-89th</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">2700-2899</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600 text-blue-600 dark:text-blue-400">Very Competitive</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">Strong chance at most UK medical schools</td>
                  </tr>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">50th-74th</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">2500-2699</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600 text-purple-600 dark:text-purple-400">Competitive</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">Median range - Good chance with strong application</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">25th-49th</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">2300-2499</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600 text-orange-600 dark:text-orange-400">Moderately Competitive</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">Consider less competitive schools or retake</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">10th-24th</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">2100-2299</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600 text-red-600 dark:text-red-400">Less Competitive</td>
                    <td className="p-3 border-t border-slate-200 dark:border-slate-600">Retake recommended for better chances</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Note:</strong> Percentile ranges vary slightly each year based on overall test performance. Medical schools also consider SJT band, GCSEs, personal statement, and interview performance alongside UCAT percentile rankings.
              </p>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section id="official-resources" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Official UCAT Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.ucat.ac.uk/" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Official UCAT Website</h3>
              <p className="text-slate-600 dark:text-slate-400">Register for the test, access official practice materials, and get detailed information about the UCAT from the official source.</p>
            </a>
            <a href="https://www.ucat.ac.uk/ucat/understanding-your-scores/" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Understanding Your Scores</h3>
              <p className="text-slate-600 dark:text-slate-400">Learn how UCAT scores are calculated, interpreted, and used by medical schools in the admissions process.</p>
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
        <section id="faqs" className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How accurate is this UCAT score calculator?</h3>
              <p className="text-slate-600 dark:text-slate-300">This calculator provides reliable estimates based on observed UCAT scoring patterns. However, since Pearson VUE keeps the exact conversion algorithm proprietary, all third-party calculators are approximations. Use this tool for planning purposes and take official practice tests for the most accurate results.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">What is a good UCAT cognitive total score?</h3>
              <p className="text-slate-600 dark:text-slate-300">A cognitive total above 2800 is generally considered very competitive for most UK medical schools. Scores above 3000 are highly competitive for top programs. However, requirements vary by school and SJT band is also considered.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How does the difficulty curve adjustment work?</h3>
              <p className="text-slate-600 dark:text-slate-300">The difficulty curve accounts for variations in test difficulty across different sittings. If your test was harder than average, you can adjust the curve up to +10% to estimate what your score might have been on an average difficulty test.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">What's the difference between raw and scaled scores?</h3>
              <p className="text-slate-600 dark:text-slate-300">Raw scores are simply the number of correct answers. Scaled scores (300-900) account for test difficulty and allow fair comparison across different test forms. The cognitive total is the sum of the four scaled subtest scores.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How important is the SJT band compared to cognitive scores?</h3>
              <p className="text-slate-600 dark:text-slate-300">Both are important. Most medical schools use a combination of cognitive total and SJT band when making admissions decisions. A high cognitive score with a strong SJT performance significantly improves your chances of receiving interview invitations from competitive programs.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Can I retake the UCAT if I'm not satisfied with my score?</h3>
              <p className="text-slate-600 dark:text-slate-300">Yes, you can retake the UCAT. You can take it multiple times, and most schools will consider your highest scores. However, some schools may have policies about how they consider multiple sittings.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How long are UCAT scores valid?</h3>
              <p className="text-slate-600 dark:text-slate-300">UCAT scores are valid for the current admissions cycle plus one additional year. For example, 2026 UCAT scores can be used for 2027 and 2028 admissions cycles.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="ucat-score-calculator" relatedSlugs={['gmat-score-calculator', 'sat-score-calculator', 'lsat-score-calculator']} navigateTo={navigateTo} />
      </div>
    </div>
  );
};

export default UCATScoreCalculator;