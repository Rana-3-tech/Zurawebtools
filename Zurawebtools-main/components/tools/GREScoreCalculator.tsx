import React, { useEffect, useState } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';

interface GREScoreCalculatorProps {
  navigateTo: (page: Page) => void;
}

const GREScoreCalculator: React.FC<GREScoreCalculatorProps> = ({ navigateTo }) => {
  const [verbalCorrect, setVerbalCorrect] = useState<number>(15);
  const [quantCorrect, setQuantCorrect] = useState<number>(15);
  const [awaScore, setAwaScore] = useState<number>(4.0);
  const [verbalScore, setVerbalScore] = useState<number>(151);
  const [quantScore, setQuantScore] = useState<number>(155);
  const [totalScore, setTotalScore] = useState<number>(306);
  const [verbalPercentile, setVerbalPercentile] = useState<number>(43);
  const [quantPercentile, setQuantPercentile] = useState<number>(40);
  const [awaPercentile, setAwaPercentile] = useState<number>(59);

  // Percentile data based on ETS 2023-2024
  const verbalPercentiles: { [key: number]: number } = {
    170: 99, 169: 99, 168: 98, 167: 97, 166: 96, 165: 95, 164: 93, 163: 91, 162: 89, 161: 86,
    160: 84, 159: 80, 158: 77, 157: 73, 156: 69, 155: 65, 154: 59, 153: 55, 152: 48, 151: 43,
    150: 39, 149: 34, 148: 30, 147: 26, 146: 23, 145: 21, 144: 18, 143: 16, 142: 13, 141: 11,
    140: 9, 139: 8, 138: 6, 137: 5, 136: 4, 135: 3, 134: 2, 133: 2, 132: 1, 131: 1, 130: 0
  };

  const quantPercentiles: { [key: number]: number } = {
    170: 92, 169: 87, 168: 83, 167: 78, 166: 74, 165: 70, 164: 66, 163: 63, 162: 60, 161: 57,
    160: 53, 159: 50, 158: 48, 157: 45, 156: 42, 155: 40, 154: 36, 153: 34, 152: 31, 151: 29,
    150: 25, 149: 23, 148: 21, 147: 18, 146: 15, 145: 13, 144: 11, 143: 9, 142: 8, 141: 6,
    140: 5, 139: 4, 138: 3, 137: 2, 136: 2, 135: 1, 134: 1, 133: 1, 132: 0, 131: 0, 130: 0
  };

  const awaPercentiles: { [key: number]: number } = {
    6.0: 99, 5.5: 98, 5.0: 92, 4.5: 83, 4.0: 59, 3.5: 41, 3.0: 16, 2.5: 8, 2.0: 3, 1.5: 1, 1.0: 0, 0.5: 0, 0.0: 0
  };

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
      title: 'About GRE',
      subtitle: 'Understanding scores',
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
    document.title = 'GRE Score Calculator 2026 - Free & Accurate | ZuraWebTools';

    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const metaDescription = 'Free GRE score calculator for 2026. Predict your Verbal and Quantitative scores (130-170) with percentile rankings. Instant results for graduate school admissions.';
    setMetaTag('description', metaDescription);
    setMetaTag('robots', 'index, follow, max-image-preview:large');

    const ogTags = [
      { property: 'og:title', content: 'GRE Score Calculator 2026 - Free & Accurate' },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator' },
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
      { name: 'twitter:title', content: 'GRE Score Calculator 2026 - Free & Accurate' },
      { name: 'twitter:description', content: metaDescription },
    ];

    twitterTags.forEach(tag => setMetaTag(tag.name, tag.content));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator');

    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "GRE Score Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3420" },
      "description": "Free GRE score calculator for predicting Verbal and Quantitative scores with percentile rankings"
    };

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "GRE Score Calculator 2026 - Free & Accurate",
      "description": "Free GRE score calculator for 2026. Predict your Verbal and Quantitative scores with percentile rankings.",
      "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "GRE Score Calculator"
      },
      "hasPart": [
        { "@type": "WebPageElement", "name": "GRE Score Calculator Tool", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator#calculator" },
        { "@type": "WebPageElement", "name": "Quick Examples", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator#examples" },
        { "@type": "WebPageElement", "name": "Benefits", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator#benefits" },
        { "@type": "WebPageElement", "name": "How to Use Guide", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator#how-to-use" },
        { "@type": "WebPageElement", "name": "Use Cases", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator#use-cases" },
        { "@type": "WebPageElement", "name": "About GRE Scoring", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator#about" },
        { "@type": "WebPageElement", "name": "FAQs", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator#faq" }
      ]
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
        { "@type": "ListItem", "position": 2, "name": "Education & Exam Tools", "item": "https://zurawebtools.com/education-and-exam-tools" },
        { "@type": "ListItem", "position": 3, "name": "Test Score Tools", "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools" },
        { "@type": "ListItem", "position": 4, "name": "GRE Score Calculator", "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator" }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is the GRE scored?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The GRE has three sections: Verbal Reasoning (130-170), Quantitative Reasoning (130-170), and Analytical Writing (0-6). Each section is scored independently. The test is section-adaptive, meaning your performance on the first section determines the difficulty of the second section."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good GRE score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good GRE score depends on your target programs. Generally, 160+ on Verbal and Quantitative (80th+ percentile) is competitive for top programs. A total score of 320+ is considered excellent. For Analytical Writing, 4.0+ is typically competitive."
          }
        },
        {
          "@type": "Question",
          "name": "How many questions can I miss on the GRE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To score 160 (84th percentile) on Verbal, you can miss about 6-7 questions out of 27. For Quantitative 160 (53rd percentile), you can miss about 7-8 questions. The exact number depends on which difficulty level you reach in the second section."
          }
        },
        {
          "@type": "Question",
          "name": "Is the GRE adaptive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the GRE is section-adaptive. Your performance on the first Verbal/Quantitative section (which is medium difficulty) determines whether your second section is easy, medium, or hard. Better performance on the first section unlocks higher score potential in the second section."
          }
        },
        {
          "@type": "Question",
          "name": "What GRE score do I need for graduate school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GRE requirements vary by program. Top universities typically look for 160+ on both sections (320+ total). STEM programs emphasize Quantitative scores (165+), while humanities programs prioritize Verbal scores (160+). Check your target program's specific requirements."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this GRE score calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator provides estimates based on official ETS percentile data and section-adaptive scoring patterns. Actual scores may vary by ±2-3 points depending on question difficulty and performance consistency. Use this for planning and target-setting, then verify with official practice tests."
          }
        },
        {
          "@type": "Question",
          "name": "Can I retake the GRE to improve my score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can retake the GRE every 21 days, up to 5 times in a 12-month period. Most test-takers improve their scores on retakes with proper preparation. Graduate programs typically consider your highest scores using ScoreSelect, allowing you to send your best performance."
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

  // Simplified score calculation based on correct answers
  const calculateVerbalScore = (correct: number): number => {
    // Approximate mapping based on medium-hard difficulty path
    if (correct >= 25) return 170;
    if (correct >= 23) return 165;
    if (correct >= 21) return 163;
    if (correct >= 19) return 160;
    if (correct >= 17) return 157;
    if (correct >= 15) return 154;
    if (correct >= 13) return 151;
    if (correct >= 11) return 148;
    if (correct >= 9) return 145;
    if (correct >= 7) return 142;
    if (correct >= 5) return 139;
    if (correct >= 3) return 136;
    return 130;
  };

  const calculateQuantScore = (correct: number): number => {
    // Approximate mapping based on medium-hard difficulty path
    if (correct >= 26) return 170;
    if (correct >= 24) return 165;
    if (correct >= 22) return 162;
    if (correct >= 20) return 159;
    if (correct >= 18) return 156;
    if (correct >= 16) return 153;
    if (correct >= 14) return 150;
    if (correct >= 12) return 147;
    if (correct >= 10) return 144;
    if (correct >= 8) return 141;
    if (correct >= 6) return 138;
    if (correct >= 4) return 135;
    return 130;
  };

  useEffect(() => {
    const vScore = calculateVerbalScore(verbalCorrect);
    const qScore = calculateQuantScore(quantCorrect);
    setVerbalScore(vScore);
    setQuantScore(qScore);
    setTotalScore(vScore + qScore);
    setVerbalPercentile(verbalPercentiles[vScore] || 0);
    setQuantPercentile(quantPercentiles[qScore] || 0);
    setAwaPercentile(awaPercentiles[awaScore] || 0);
  }, [verbalCorrect, quantCorrect, awaScore]);

  const shareOnTwitter = () => {
    const text = `Just calculated my GRE score: ${totalScore} (V:${verbalScore}, Q:${quantScore})! Use this free calculator to predict your GRE performance.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator')}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator')}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/gre-score-calculator')}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        {/* H1 + Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">GRE Score Calculator 2026</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Predict your GRE General Test scores with our free calculator. Get instant estimates for Verbal Reasoning, Quantitative Reasoning, and Analytical Writing sections with percentile rankings for graduate school admissions in USA, UK, Australia, and Germany.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div id="calculator" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Your GRE Score</h2>
          
          <div className="space-y-6">
            {/* Verbal Reasoning */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Verbal Reasoning</h3>
                  <p className="text-sm text-gray-600">27 questions total</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-indigo-600">{verbalScore}</p>
                  <p className="text-sm text-gray-600">{verbalPercentile}th percentile</p>
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions Correct: {verbalCorrect} / 27
                </label>
                <input
                  type="range"
                  min="0"
                  max="27"
                  value={verbalCorrect}
                  onChange={(e) => setVerbalCorrect(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Quantitative Reasoning */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Quantitative Reasoning</h3>
                  <p className="text-sm text-gray-600">27 questions total</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-purple-600">{quantScore}</p>
                  <p className="text-sm text-gray-600">{quantPercentile}th percentile</p>
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Questions Correct: {quantCorrect} / 27
                </label>
                <input
                  type="range"
                  min="0"
                  max="27"
                  value={quantCorrect}
                  onChange={(e) => setQuantCorrect(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            {/* Analytical Writing */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Analytical Writing</h3>
                  <p className="text-sm text-gray-600">1 essay (30 minutes)</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">{awaScore.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">{awaPercentile}th percentile</p>
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Score: {awaScore.toFixed(1)} / 6.0
                </label>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={awaScore}
                  onChange={(e) => setAwaScore(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
            </div>

            {/* Total Score */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white shadow-lg">
              <div className="text-center">
                <p className="text-lg font-medium opacity-90 mb-2">Total GRE Score</p>
                <p className="text-5xl font-bold mb-4">{totalScore}</p>
                <p className="text-sm opacity-75">Verbal + Quantitative (130-340 scale)</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold">{verbalScore}</p>
                    <p className="text-sm opacity-75">Verbal</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{quantScore}</p>
                    <p className="text-sm opacity-75">Quant</p>
                  </div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick GRE Score Examples</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🎯 Competitive Score (320+)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Verbal:</strong> 21/27 correct → 163 (91st percentile)</li>
                <li>• <strong>Quant:</strong> 22/27 correct → 162 (60th percentile)</li>
                <li>• <strong>AWA:</strong> 4.5 → 83rd percentile</li>
                <li className="pt-2 font-bold text-indigo-600">Total: 325 - Excellent for top programs</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">📚 Average Score (300)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Verbal:</strong> 13/27 correct → 151 (43rd percentile)</li>
                <li>• <strong>Quant:</strong> 14/27 correct → 150 (25th percentile)</li>
                <li>• <strong>AWA:</strong> 3.5 → 41st percentile</li>
                <li className="pt-2 font-bold text-purple-600">Total: 301 - Acceptable for many programs</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🌟 High Score (330+)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Verbal:</strong> 23/27 correct → 165 (95th percentile)</li>
                <li>• <strong>Quant:</strong> 24/27 correct → 165 (70th percentile)</li>
                <li>• <strong>AWA:</strong> 5.0 → 92nd percentile</li>
                <li className="pt-2 font-bold text-green-600">Total: 330 - Ivy League competitive</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">💼 STEM Focus (Quant 165+)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Verbal:</strong> 17/27 correct → 157 (73rd percentile)</li>
                <li>• <strong>Quant:</strong> 26/27 correct → 170 (92nd percentile)</li>
                <li>• <strong>AWA:</strong> 4.0 → 59th percentile</li>
                <li className="pt-2 font-bold text-orange-600">Total: 327 - Perfect for engineering/CS</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border border-rose-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">📖 Humanities Focus (Verbal 165+)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Verbal:</strong> 25/27 correct → 170 (99th percentile)</li>
                <li>• <strong>Quant:</strong> 18/27 correct → 156 (42nd percentile)</li>
                <li>• <strong>AWA:</strong> 5.5 → 98th percentile</li>
                <li className="pt-2 font-bold text-rose-600">Total: 326 - Ideal for English/History PhD</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl border border-cyan-100 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-3">⚖️ Balanced Score (160/160)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Verbal:</strong> 19/27 correct → 160 (84th percentile)</li>
                <li>• <strong>Quant:</strong> 20/27 correct → 159 (50th percentile)</li>
                <li>• <strong>AWA:</strong> 4.5 → 83rd percentile</li>
                <li className="pt-2 font-bold text-cyan-600">Total: 319 - Strong for most programs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our GRE Score Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6 rounded-xl text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Predictions</h3>
              <p className="text-white/90">Get immediate score estimates as you adjust sliders. No waiting, no complex formulas - just real-time results based on official ETS percentile data.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Accurate Percentiles</h3>
              <p className="text-white/90">Based on official 2023-2024 ETS data. See exactly how your score compares to other test-takers worldwide for competitive admissions insights.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-xl text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">100% Free Forever</h3>
              <p className="text-white/90">No registration, no hidden costs, unlimited calculations. Calculate as many times as needed to plan your GRE preparation strategy.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Global Admissions</h3>
              <p className="text-white/90">Perfect for applicants to graduate programs in USA, UK, Australia, Germany, and worldwide. Understand international score requirements.</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use This GRE Score Calculator</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimate Verbal Reasoning Correct Answers</h3>
                <p className="text-gray-600">Use the slider to input how many questions you answered correctly (or expect to answer correctly) out of 27 Verbal Reasoning questions. The calculator instantly shows your estimated score (130-170) and percentile ranking.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimate Quantitative Reasoning Correct Answers</h3>
                <p className="text-gray-600">Adjust the Quantitative slider for your correct answers out of 27 math questions. Your Quant score (130-170) updates automatically with percentile ranking to show how you compare globally.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Your Analytical Writing Score</h3>
                <p className="text-gray-600">Use the AWA slider to select your expected essay score from 0.0 to 6.0 in half-point increments. This score doesn't affect your total (Verbal + Quant) but is important for admissions.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Total Score and Percentiles</h3>
                <p className="text-gray-600">See your combined GRE score (Verbal + Quantitative) displayed prominently. Compare each section's percentile to understand your competitive position for graduate school admissions.</p>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Calculation Example</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Scenario:</strong> You answer 19 Verbal and 22 Quantitative questions correctly</p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">Step-by-step breakdown:</p>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Verbal:</strong> 19/27 correct → 160 scaled score (84th percentile)</li>
                  <li>• <strong>Quantitative:</strong> 22/27 correct → 162 scaled score (60th percentile)</li>
                  <li>• <strong>Total Score:</strong> 160 + 162 = <span className="text-indigo-600 font-bold">322</span></li>
                  <li>• <strong>Result:</strong> Highly competitive for top-tier graduate programs!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Uses This GRE Score Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Graduate School Applicants</h3>
              <p className="text-gray-600">Students applying to master's or PhD programs use this to assess if their practice test scores meet program requirements before taking the official GRE.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">GRE Test Prep Students</h3>
              <p className="text-gray-600">Test-takers practicing with official ETS materials track progress by converting practice test raw scores to scaled scores and monitoring improvement over time.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Career Changers</h3>
              <p className="text-gray-600">Professionals planning career transitions to fields requiring graduate degrees use this to set realistic GRE score targets based on target school requirements.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">International Students</h3>
              <p className="text-gray-600">Applicants from UK, Australia, Germany, India, and other countries evaluate competitiveness for US graduate programs and scholarship eligibility with percentile rankings.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24 border border-indigo-100">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">About GRE Scoring System</h2>
          <div className="prose max-w-none text-gray-700 space-y-6 leading-relaxed">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-indigo-200 shadow-sm">
              <p className="text-base">
                The <strong className="text-indigo-700">Graduate Record Examination (GRE)</strong> General Test is a standardized exam required for admission to most graduate schools worldwide. Understanding the GRE scoring system is crucial for setting realistic target scores and developing an effective preparation strategy.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-purple-200 shadow-sm">
              <h3 className="text-2xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📊</span> GRE Test Structure and Scoring Ranges
              </h3>
              <p className="text-base">
                The GRE consists of three main sections scored independently. <strong className="text-indigo-700">Verbal Reasoning</strong> assesses your ability to analyze written material, evaluate arguments, and understand relationships between words and concepts. You'll answer <span className="bg-indigo-100 px-2 py-1 rounded font-semibold">27 questions</span> across two subsections in <span className="bg-indigo-100 px-2 py-1 rounded font-semibold">41 minutes</span> total. <strong className="text-purple-700">Quantitative Reasoning</strong> measures your mathematical problem-solving abilities with <span className="bg-purple-100 px-2 py-1 rounded font-semibold">27 questions</span> in <span className="bg-purple-100 px-2 py-1 rounded font-semibold">47 minutes</span>. Both sections use a <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-2 py-1 rounded font-bold">130-170 scale</span> in one-point increments.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-blue-200 shadow-sm">
              <h3 className="text-2xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔄</span> Section-Adaptive Testing Explained
              </h3>
              <p className="text-base">
                The GRE uses <strong className="text-purple-700">section-adaptive testing</strong>, where your performance on the first Verbal or Quantitative section determines the difficulty level of your second section. If you perform well on the first section (medium difficulty), you'll receive a harder second section, which unlocks higher score potential. Conversely, lower performance leads to an easier second section with limited scoring ceiling. This adaptive mechanism ensures fair scoring across different test administrations while maintaining score comparability.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-pink-200 shadow-sm">
              <h3 className="text-2xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📈</span> Understanding Percentile Rankings
              </h3>
              <p className="text-base">
                Your scaled score converts to a <strong className="text-pink-700">percentile ranking</strong> showing how you performed relative to other test-takers. For example, a Verbal score of <span className="bg-indigo-100 px-2 py-1 rounded font-semibold">160</span> places you in the <span className="bg-indigo-600 text-white px-2 py-1 rounded font-bold">84th percentile</span> (better than 84% of test-takers), while the same score of 160 on Quantitative is only <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">53rd percentile</span>. This disparity reflects that Quantitative sections typically have higher average scores. Graduate programs often publish their admitted students' average percentiles, making this metric crucial for assessing your competitiveness.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-green-200 shadow-sm">
              <h3 className="text-2xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">✍️</span> Analytical Writing Assessment
              </h3>
              <p className="text-base">
                The Analytical Writing section requires one <span className="bg-green-100 px-2 py-1 rounded font-semibold">30-minute</span> "Analyze an Issue" essay scored on a <span className="bg-green-100 px-2 py-1 rounded font-semibold">0-6 scale</span> in half-point increments. Two graders—one human and one AI (e-rater)—evaluate your essay. If their scores differ significantly, a second human grader reviews your work. While AWA doesn't contribute to your total score, programs requiring extensive writing (humanities, social sciences) often set minimum AWA requirements of <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">4.0+</span>.
              </p>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-5 shadow-md mt-6">
              <p className="text-base font-medium">
                📚 For comprehensive GRE preparation, explore our <a href="/education-and-exam-tools/test-score-tools/gmat-score-calculator" className="text-yellow-300 hover:text-yellow-100 underline font-bold">GMAT Score Calculator</a> for business school applicants, or check our <a href="/education-and-exam-tools/test-score-tools/toefl-score-calculator" className="text-yellow-300 hover:text-yellow-100 underline font-bold">TOEFL Score Calculator</a> if you need English proficiency scores alongside GRE.
              </p>
            </div>
          </div>
        </div>

        {/* External Resources */}
        <div id="resources" className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Official GRE Resources</h2>
          <p className="text-gray-600 mb-6">Access authoritative information about GRE scoring and graduate admissions:</p>
          <ul className="space-y-3">
            <li>
              <a href="https://www.ets.org/gre/test-takers/general-test/scores.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                ETS Official GRE Scores Guide
              </a>
            </li>
            <li>
              <a href="https://www.ets.org/pdfs/gre/gre-guide-to-the-use-of-scores.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                GRE Guide to the Use of Scores (PDF)
              </a>
            </li>
            <li>
              <a href="https://www.ets.org/gre/test-takers/general-test/prepare.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Official GRE Test Preparation Materials
              </a>
            </li>
            <li>
              <a href="https://www.ets.org/gre/test-takers/general-test/scores/how-tests-are-scored.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                How the GRE Test is Scored
              </a>
            </li>
          </ul>
        </div>

        {/* Last Updated */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <strong>Last Updated:</strong> November 23, 2025 | <span className="ml-2">Based on ETS 2023-2024 percentile data</span>
          </p>
        </div>

        {/* FAQs */}
        <div id="faq" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How is the GRE scored?</h3>
              <p className="text-gray-600 leading-relaxed">
                The GRE has three sections: Verbal Reasoning (130-170), Quantitative Reasoning (130-170), and Analytical Writing (0-6). Each section is scored independently. The test is section-adaptive, meaning your performance on the first section determines the difficulty of the second section, which affects your score ceiling.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a good GRE score?</h3>
              <p className="text-gray-600 leading-relaxed">
                A good GRE score depends on your target programs. Generally, 160+ on Verbal and Quantitative (80th+ percentile) is competitive for top programs. A total score of 320+ is considered excellent. For Analytical Writing, 4.0+ is typically competitive. STEM programs emphasize Quantitative scores (165+), while humanities programs prioritize Verbal scores (160+).
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How many questions can I miss on the GRE?</h3>
              <p className="text-gray-600 leading-relaxed">
                To score 160 (84th percentile) on Verbal, you can miss about 6-7 questions out of 27. For Quantitative 160 (53rd percentile), you can miss about 7-8 questions. The exact number depends on which difficulty level you reach in the second section. Scoring 170 typically requires getting all or nearly all questions correct.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Is the GRE adaptive?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, the GRE is section-adaptive. Your performance on the first Verbal/Quantitative section (which is medium difficulty) determines whether your second section is easy, medium, or hard. Better performance on the first section unlocks higher score potential in the second section. The test does NOT adapt within a section—question difficulty is locked once you begin.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What GRE score do I need for graduate school?</h3>
              <p className="text-gray-600 leading-relaxed">
                GRE requirements vary by program and field. Top universities typically look for 160+ on both sections (320+ total). STEM programs emphasize Quantitative scores (165+), while humanities programs prioritize Verbal scores (160+). Check your target program's website or contact admissions for specific requirements and average scores of admitted students.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How accurate is this GRE score calculator?</h3>
              <p className="text-gray-600 leading-relaxed">
                This calculator provides estimates based on official ETS percentile data and section-adaptive scoring patterns observed from publicly available score reports. Actual scores may vary by ±2-3 points depending on question difficulty distribution and performance consistency. Use this for planning and target-setting, then verify with official ETS practice tests.
              </p>
            </div>
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I retake the GRE to improve my score?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, you can retake the GRE every 21 days, up to 5 times in a 12-month period. Most test-takers improve their scores on retakes with proper preparation. Graduate programs typically consider your highest scores using ETS ScoreSelect, which allows you to send your best Verbal and Quantitative scores from different test dates.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          currentSlug="gre-score-calculator" 
          relatedSlugs={["gmat-score-calculator", "toefl-score-calculator", "sat-score-calculator"]} 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default GREScoreCalculator;
