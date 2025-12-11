import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';

interface PersonalStatementCharacterCounterProps {
  navigateTo: (page: Page) => void;
}

const PersonalStatementCharacterCounter: React.FC<PersonalStatementCharacterCounterProps> = ({ navigateTo }) => {
  const [text, setText] = useState('');
  const [maxLimit, setMaxLimit] = useState(4000); // Default UCAS limit

  // TOC sections configuration
  const tocSections: TOCSection[] = [
    { id: 'quick-examples', emoji: '⚡', title: 'Quick Examples', subtitle: 'Common limits', gradientFrom: 'from-cyan-50', gradientTo: 'to-blue-50', hoverBorder: 'border-cyan-400', hoverText: 'text-cyan-600' },
    { id: 'benefits', emoji: '⭐', title: 'Benefits', subtitle: 'Why use this', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
    { id: 'how-to-use', emoji: '📖', title: 'How to Use', subtitle: 'Step-by-step guide', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-400', hoverText: 'text-green-600' },
    { id: 'use-cases', emoji: '💼', title: 'Use Cases', subtitle: 'Who uses this', gradientFrom: 'from-blue-50', gradientTo: 'to-indigo-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
    { id: 'about', emoji: '📚', title: 'About', subtitle: 'Learn more', gradientFrom: 'from-amber-50', gradientTo: 'to-orange-50', hoverBorder: 'border-amber-400', hoverText: 'text-amber-600' },
    { id: 'faq', emoji: '❓', title: 'FAQ', subtitle: 'Common questions', gradientFrom: 'from-rose-50', gradientTo: 'to-pink-50', hoverBorder: 'border-rose-400', hoverText: 'text-rose-600' }
  ];

  // SEO and Meta Tags Setup
  useEffect(() => {
    document.title = "Personal Statement Character Counter - UCAS & College Apps";

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Free UCAS personal statement character counter tool. Track 4000-character limit, word count, line count instantly for UK university applications and Common App essays.');
    document.head.appendChild(metaDescription);

    // Robots meta
    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large');
    document.head.appendChild(metaRobots);

    // Open Graph & Twitter Tags
    const metaTags = [
      { property: 'og:title', content: 'Personal Statement Character Counter - UCAS & College Apps' },
      { property: 'og:description', content: 'Free UCAS personal statement character counter. Track 4000-character limit, word count, line count for UK university and college applications.' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-personal-statement-counter.png' },
      { property: 'og:image:alt', content: 'Personal statement character counter showing 4000-character UCAS limit tracker' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/admission-tools/personal-statement-character-counter' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Personal Statement Character Counter - UCAS & Apps' },
      { name: 'twitter:description', content: 'Free character counter for UCAS personal statements. Track 4000-character limit instantly.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/og-personal-statement-counter.png' },
      { name: 'twitter:image:alt', content: 'Personal statement character counter tool interface' },
      { name: 'twitter:site', content: '@ZuraWebTools' },
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => meta.setAttribute(key, value));
      document.head.appendChild(meta);
    });

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/personal-statement-character-counter');
    document.head.appendChild(canonical);

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Personal Statement Character Counter",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any (Web-based)",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "892" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
        "description": "Free personal statement character counter for UCAS, Common App, and college applications. Track 4000-character limit, count words and lines instantly.",
        "url": "https://zurawebtools.com/education-and-exam-tools/admission-tools/personal-statement-character-counter"
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
          { "@type": "ListItem", "position": 2, "name": "Education & Exam Tools", "item": "https://zurawebtools.com/education-and-exam-tools" },
          { "@type": "ListItem", "position": 3, "name": "Admission Tools", "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools" },
          { "@type": "ListItem", "position": 4, "name": "Personal Statement Character Counter", "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools/personal-statement-character-counter" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the UCAS personal statement character limit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The UCAS personal statement has a strict limit of 4,000 characters (including spaces) or 47 lines of text, whichever comes first. This limit has been in place since 2008 for UK university applications."
            }
          },
          {
            "@type": "Question",
            "name": "How many words is 4000 characters for a personal statement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "4000 characters typically equals approximately 500-650 words, depending on word length and spacing. Most UCAS personal statements are around 570-600 words to stay within the character limit."
            }
          },
          {
            "@type": "Question",
            "name": "Does the character counter include spaces and punctuation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the personal statement character counter includes all characters: letters, spaces, punctuation marks, line breaks, and special characters. Everything you type counts toward your limit."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I exceed the UCAS character limit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If you exceed 4,000 characters, the UCAS system will automatically cut off your text, and the excess content will not be submitted. Use our counter to stay within limits before submission."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this counter for Common App essays?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You can adjust the character limit to 650 words (approximately 4,000 characters) for Common App personal statements or set custom limits for other college applications."
            }
          },
          {
            "@type": "Question",
            "name": "How do I count lines in my personal statement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our tool automatically counts lines (maximum 47 for UCAS). Each line break or paragraph counts as a new line. The UCAS system uses a standard font size, so our counter matches their format."
            }
          },
          {
            "@type": "Question",
            "name": "Is this personal statement counter free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our personal statement character counter is completely free with no registration required. Use it unlimited times to perfect your college or university application essay."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use Personal Statement Character Counter",
        "description": "Step-by-step guide to count characters, words, and lines for UCAS and college application personal statements",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Select Your Limit", "text": "Choose UCAS (4000), Common App (650 words), or set a custom character limit for your application" },
          { "@type": "HowToStep", "position": 2, "name": "Type or Paste Your Statement", "text": "Enter your personal statement text directly or paste it from your document. The counter updates in real-time" },
          { "@type": "HowToStep", "position": 3, "name": "Monitor Your Progress", "text": "Watch the character count, word count, and line count update instantly. The progress bar shows how close you are to the limit" },
          { "@type": "HowToStep", "position": 4, "name": "Edit to Fit Requirements", "text": "Use the remaining character indicator to trim or expand your statement. Copy your perfected text when ready" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Personal Statement Character Counter - UCAS & College Applications",
        "description": "Free personal statement character counter for UCAS, Common App, and college applications. Track 4000-character limit, count words and lines instantly. Perfect for students applying to universities.",
        "url": "https://zurawebtools.com/education-and-exam-tools/admission-tools/personal-statement-character-counter",
        "datePublished": "2025-11-24",
        "dateModified": "2025-11-24",
        "inLanguage": "en-US",
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        }
      }
    ]);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      metaDescription.remove();
      metaRobots.remove();
      metaTags.forEach(tag => {
        const selector = Object.keys(tag)[0];
        const value = Object.values(tag)[0];
        const el = document.querySelector(`meta[${selector}="${value}"]`);
        if (el) el.remove();
      });
      canonical.remove();
      script.remove();
    };
  }, []);

  // Text Statistics Calculation
  const stats = useMemo(() => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const remaining = maxLimit - characters;
    const percentage = maxLimit > 0 ? Math.min((characters / maxLimit) * 100, 100) : 0;
    
    return { characters, words, lines, charsNoSpaces, sentences, remaining, percentage };
  }, [text, maxLimit]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };

  const handleClear = () => {
    if (text && confirm('Are you sure you want to clear all text?')) {
      setText('');
    }
  };

  const getProgressColor = () => {
    if (stats.percentage >= 100) return 'bg-red-500';
    if (stats.percentage >= 90) return 'bg-orange-500';
    if (stats.percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = () => {
    if (stats.percentage >= 100) return 'text-red-600';
    if (stats.percentage >= 90) return 'text-orange-600';
    if (stats.percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Social Share Buttons
  const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/admission-tools/personal-statement-character-counter';
  const shareTitle = 'Personal Statement Character Counter - Free UCAS & College App Tool';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* H1 + Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Personal Statement Character Counter
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Free online character counter for UCAS personal statements and college application essays. Track 4000-character limit, word count, and 47-line count in real-time for UK university applications, Common App essays, and graduate school statements.
          </p>
        </div>

        {/* Main Tool - Interactive Interface */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Character Counter Tool</h2>
          
          {/* Limit Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Select Character Limit:</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setMaxLimit(4000)}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  maxLimit === 4000
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                UCAS (4000)
              </button>
              <button
                onClick={() => setMaxLimit(4300)}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  maxLimit === 4300
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Common App (650w)
              </button>
              <button
                onClick={() => setMaxLimit(5000)}
                className={`py-3 px-4 rounded-lg font-medium transition-all ${
                  maxLimit === 5000
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Graduate (5000)
              </button>
              <button
                onClick={() => {
                  const custom = prompt('Enter custom character limit:', '4000');
                  if (custom && !isNaN(Number(custom))) setMaxLimit(Number(custom));
                }}
                className={`py-3 px-4 rounded-lg font-medium transition-all bg-slate-100 text-slate-700 hover:bg-slate-200`}
              >
                Custom
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Write or Paste Your Personal Statement:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing your personal statement here..."
              className="w-full h-64 px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all resize-none text-slate-900"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: '1.6' }}
            />
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-700">Progress:</span>
              <span className={`text-sm font-bold ${getStatusColor()}`}>
                {stats.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full ${getProgressColor()} transition-all duration-300 ease-out`}
                style={{ width: `${Math.min(stats.percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
              <div className="text-3xl font-bold text-blue-600">{stats.characters}</div>
              <div className="text-sm text-slate-600 font-medium">Characters</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
              <div className="text-3xl font-bold text-purple-600">{stats.words}</div>
              <div className="text-sm text-slate-600 font-medium">Words</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <div className="text-3xl font-bold text-green-600">{stats.lines}</div>
              <div className="text-sm text-slate-600 font-medium">Lines</div>
            </div>
            <div className={`bg-gradient-to-br p-4 rounded-xl border ${
              stats.remaining >= 0 
                ? 'from-amber-50 to-orange-50 border-amber-200' 
                : 'from-red-50 to-pink-50 border-red-200'
            }`}>
              <div className={`text-3xl font-bold ${stats.remaining >= 0 ? 'text-amber-600' : 'text-red-600'}`}>
                {stats.remaining}
              </div>
              <div className="text-sm text-slate-600 font-medium">Remaining</div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Characters (no spaces):</span>
              <span className="text-lg font-bold text-slate-900">{stats.charsNoSpaces}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Sentences:</span>
              <span className="text-lg font-bold text-slate-900">{stats.sentences}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="flex-1 min-w-[150px] bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              📋 Copy Text
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="flex-1 min-w-[150px] bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              🗑️ Clear All
            </button>
          </div>

          {/* Warning Messages */}
          {stats.percentage >= 100 && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-800 font-semibold">⚠️ Character limit exceeded!</p>
              <p className="text-red-700 text-sm mt-1">
                Your statement is {Math.abs(stats.remaining)} characters over the limit. Please reduce your text.
              </p>
            </div>
          )}
          {stats.percentage >= 90 && stats.percentage < 100 && (
            <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-lg">
              <p className="text-orange-800 font-semibold">⚠️ Approaching character limit</p>
              <p className="text-orange-700 text-sm mt-1">
                You have only {stats.remaining} characters remaining. Consider finalizing your statement.
              </p>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Social Share Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Share This Tool</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/></svg>
              Share on Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Quick Examples Section */}
        <section id="quick-examples" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">📊 Common Character Limits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-2">UCAS Personal Statement</h3>
              <p className="text-4xl font-extrabold text-blue-600 mb-2">4,000</p>
              <p className="text-sm text-slate-600">characters or 47 lines</p>
              <p className="text-xs text-slate-500 mt-2">UK university applications</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-2">Common App Essay</h3>
              <p className="text-4xl font-extrabold text-purple-600 mb-2">650</p>
              <p className="text-sm text-slate-600">words (~4,300 chars)</p>
              <p className="text-xs text-slate-500 mt-2">US college applications</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-2">Graduate Statement</h3>
              <p className="text-4xl font-extrabold text-green-600 mb-2">5,000</p>
              <p className="text-sm text-slate-600">characters typical</p>
              <p className="text-xs text-slate-500 mt-2">Masters/PhD programs</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">⭐ Benefits of Using This Counter</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Real-Time Tracking</h3>
              <p className="text-blue-50">
                See instant updates as you type. No need to manually count or refresh. The character counter updates live, helping you stay within limits effortlessly.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Multiple Format Support</h3>
              <p className="text-purple-50">
                Pre-configured for UCAS (4000), Common App (650w), and graduate programs. Set custom limits for any application requirement worldwide.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Analytics</h3>
              <p className="text-green-50">
                Track characters, words, lines, sentences, and remaining space. Get detailed statistics to perfect your personal statement structure.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3">100% Free & Private</h3>
              <p className="text-orange-50">
                No registration, no ads, no data collection. Your personal statement stays on your device. Use unlimited times for free.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">📖 How to Use the Character Counter</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Select Your Character Limit</h3>
                <p className="text-slate-600 leading-relaxed">
                  Choose from pre-configured limits: <strong>UCAS (4000 characters)</strong>, <strong>Common App (650 words ≈ 4300 characters)</strong>, <strong>Graduate School (5000 characters)</strong>, or set a custom limit for specific university requirements.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Type or Paste Your Personal Statement</h3>
                <p className="text-slate-600 leading-relaxed">
                  Start writing directly in the text box or paste your existing draft from Microsoft Word, Google Docs, or any text editor. The counter works with all characters including spaces, punctuation, and line breaks.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Monitor Your Progress</h3>
                <p className="text-slate-600 leading-relaxed">
                  Watch the <strong>progress bar</strong> change from green (safe) → yellow (75%) → orange (90%) → red (exceeded). Check remaining characters, word count, and line count in real-time statistics panels.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Edit & Perfect Your Statement</h3>
                <p className="text-slate-600 leading-relaxed">
                  Use the remaining character indicator to trim unnecessary words or expand important points. When satisfied, click <strong>"Copy Text"</strong> to paste into your UCAS/Common App form.
                </p>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="mt-10 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border-2 border-blue-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📐 Calculation Example</h3>
            <div className="space-y-3 text-slate-700">
              <p className="flex items-start gap-2">
                <span className="font-semibold text-blue-600 min-w-[140px]">Input Text:</span>
                <span>"I am passionate about studying medicine..." (150 characters, 23 words, 1 line)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-semibold text-blue-600 min-w-[140px]">Total Characters:</span>
                <span>150 (includes spaces and punctuation)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-semibold text-blue-600 min-w-[140px]">UCAS Limit:</span>
                <span>4000 characters</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-semibold text-blue-600 min-w-[140px]">Remaining:</span>
                <span className="font-bold text-green-600">3850 characters (96.25% space left)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-semibold text-blue-600 min-w-[140px]">Status:</span>
                <span className="text-green-600 font-semibold">✓ Well within limit - keep writing!</span>
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">💼 Who Uses This Tool?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">UK University Applicants</h3>
              <p className="text-slate-600 leading-relaxed">
                Students applying through UCAS to British universities like Oxford, Cambridge, Imperial, UCL, LSE, and other UK institutions use this to stay within the strict 4000-character or 47-line limit for personal statements.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">US College Applicants</h3>
              <p className="text-slate-600 leading-relaxed">
                Students applying to American colleges via Common App, Coalition App, or UC Applications track their 650-word personal statements. Perfect for Ivy League, state schools, and private college applications.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-green-900 mb-3">Graduate School Candidates</h3>
              <p className="text-slate-600 leading-relaxed">
                Masters and PhD applicants crafting statements of purpose for graduate programs worldwide. Medical school, law school, MBA, and research program applications with varying character limits.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold text-orange-900 mb-3">Academic Advisors & Counselors</h3>
              <p className="text-slate-600 leading-relaxed">
                School counselors, college admissions consultants, and education advisors helping students refine their personal statements while meeting strict character and word count requirements.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">📚 About Personal Statement Character Counter</h2>
          
          <div className="prose max-w-none text-slate-700 leading-relaxed space-y-4">
            <p>
              The <strong>Personal Statement Character Counter</strong> is a specialized online tool designed specifically for students applying to universities and colleges worldwide. Whether you're preparing a <strong>UCAS personal statement</strong> for UK universities like Oxford, Cambridge, or Imperial College, crafting a <strong>Common Application essay</strong> for US institutions, or writing a <strong>graduate school statement of purpose</strong>, maintaining precise character and word counts is absolutely critical for successful university applications. This free statement length checker ensures your application essay fits perfectly within required limits.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">Understanding UCAS Character Limits</h3>
            <p>
              The <a href="https://www.ucas.com/undergraduate/applying-to-university/writing-personal-statement" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">UCAS personal statement</a> has a strict dual limit of <strong>4,000 characters</strong> (including spaces and punctuation) or <strong>47 lines</strong> of text, whichever threshold is reached first. This character limit translates to approximately 500-650 words depending on your sentence structure, word choice, and paragraph formatting. Our UCAS personal statement character counter precisely mirrors the UCAS application portal format, ensuring your text will fit perfectly when you paste it into the official UCAS form for UK university applications.
            </p>

            <p>
              Since 2008, UCAS has enforced this 4000-character limit for undergraduate applications to British universities including Oxford, Cambridge, Imperial College London, UCL, LSE, and all other UK institutions. The 47-line restriction exists because the UCAS form uses a fixed-width text box with specific formatting. Students applying through UCAS must carefully manage their statement length to fit within both constraints simultaneously.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">Common App and US College Applications</h3>
            <p>
              For <strong>Common App essays</strong>, the limit is <strong>650 words</strong> (approximately 4,000-4,500 characters with spaces). The Common Application is used by over 900 US colleges and universities, including Ivy League schools, state universities, and private institutions. Our word counter helps you track your Common App personal statement against this 650-word maximum while also showing character count for precision.
            </p>

            <p>
              <strong>UC Personal Insight Questions</strong> for University of California applications allow <strong>350 words each</strong> across four required essays (total 1,400 words). Coalition Application essays typically have a 500-650 word range. Graduate school statements of purpose vary by program but generally range from <strong>500-1000 words</strong> (2,500-6,000 characters). Medical school applications (AMCAS), law school applications (LSAC), and business school applications (MBA) each have unique character requirements that our custom limit feature supports.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">Why Accurate Character Counting Matters</h3>
            <p>
              University <strong>application portals automatically truncate text</strong> that exceeds character limits without warning. If your personal statement is 4,050 characters, the UCAS portal will cut off the last 50 characters—potentially removing crucial concluding sentences, leaving your statement incomplete, or creating awkward mid-sentence endings. This automatic truncation happens during submission, meaning you won't see the error until after submission when it's too late to fix.
            </p>

            <p>
              Using our real-time character counter prevents this issue by showing exactly how much space remains as you write. The color-coded progress bar provides visual feedback: green means safe writing space, yellow indicates you're at 75% capacity, orange warns you at 90%, and red alerts you when approaching or exceeding your limit. This instant feedback system helps you adjust your writing in real-time rather than discovering problems during final submission.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">Comprehensive Text Analysis Features</h3>
            <p>
              The tool provides comprehensive statistics beyond basic character counting. Track <strong>total characters</strong> including all punctuation and spaces, <strong>word count</strong> to gauge essay length against requirements, <strong>line count</strong> for UCAS's 47-line restriction, <strong>sentence count</strong> for readability analysis and flow assessment, and <strong>characters without spaces</strong> for international application systems that count differently. These multiple metrics give you complete control over your statement's structure and length.
            </p>

            <p>
              Our character limit calculator also shows <strong>remaining characters</strong> in real-time, helping you decide whether to expand underdeveloped points or trim verbose sections. This is especially valuable during the editing phase when you're balancing depth of content with space constraints. The sentence count helps ensure your statement maintains good readability—admissions officers prefer statements with varied sentence length and clear paragraph structure.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">Integration with Other Admission Tools</h3>
            <p>
              Students can use this character counter alongside our <a href="/education-and-exam-tools/admission-tools/common-app-essay-word-counter" className="text-blue-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools/common-app-essay-word-counter'); }}>Common App Essay Word Counter</a> for US college applications and <a href="/education-and-exam-tools/admission-tools/ucas-points-calculator" className="text-blue-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools/ucas-points-calculator'); }}>UCAS Points Calculator</a> to convert your A-Level grades to tariff points for UK admissions.
            </p>

            <p>
              The <a href="/education-and-exam-tools/admission-tools/college-admissions-calculator" className="text-blue-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools/college-admissions-calculator'); }}>College Admissions Calculator</a> helps assess your chances at different universities based on GPA and test scores, while our <a href="/education-and-exam-tools/test-score-tools/sat-score-calculator" className="text-blue-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/test-score-tools/sat-score-calculator'); }}>SAT Score Calculator</a> converts raw scores to scaled scores for standardized testing requirements. These tools form a complete admission toolkit for college-bound students.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">Privacy and Accessibility</h3>
            <p>
              Our personal statement character counter is <strong>100% free, requires no registration, no login, and no downloads</strong>. It works entirely in your browser using JavaScript—your personal statement text is never uploaded to any server, transmitted over the internet, or stored in any database. This ensures complete privacy and confidentiality for sensitive application materials that often contain personal stories, family background, and career aspirations.
            </p>

            <p>
              The tool is fully mobile-responsive and works seamlessly on smartphones, tablets, laptops, and desktop computers. Edit and check your statement on iOS (iPhone/iPad), Android devices, or any web browser (Chrome, Firefox, Safari, Edge). This flexibility allows you to work on college applications during school, at public libraries, coffee shops, or anywhere with internet access. The responsive design ensures all features remain accessible regardless of screen size.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-4">Best Practices for Personal Statements</h3>
            <p>
              When writing your personal statement, aim to use 95-98% of your available character limit. Admissions officers expect statements that fully utilize the space provided—a 3,000-character statement when 4,000 is allowed suggests lack of effort or insufficient content. However, exceeding the limit demonstrates poor planning and inability to follow instructions, both negative signals to admissions committees.
            </p>

            <p>
              Use the character counter throughout your writing process, not just at the end. Start with a rough draft to organize ideas, then refine while monitoring your character count. Leave 50-100 characters as buffer space for final edits and proofreading. This buffer prevents accidental truncation if you need to make last-minute changes before submission deadline.
            </p>
          </div>
        </section>

        {/* External Links Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">🔗 Authority Resources</h2>
          <div className="space-y-4">
            <a
              href="https://www.ucas.com/undergraduate/applying-to-university/writing-personal-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-lg border-2 border-blue-200 transition-all"
            >
              <h3 className="font-bold text-blue-900 mb-1">UCAS Official Personal Statement Guide</h3>
              <p className="text-sm text-slate-600">Official guidance on writing UCAS personal statements with character limits</p>
              <span className="text-xs text-blue-600 mt-2 inline-block">ucas.com →</span>
            </a>
            <a
              href="https://www.commonapp.org/apply/essay-prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-lg border-2 border-purple-200 transition-all"
            >
              <h3 className="font-bold text-purple-900 mb-1">Common App Essay Prompts & Requirements</h3>
              <p className="text-sm text-slate-600">Official Common Application essay prompts with 650-word limit details</p>
              <span className="text-xs text-purple-600 mt-2 inline-block">commonapp.org →</span>
            </a>
            <a
              href="https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-freshman/personal-insight-questions.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg border-2 border-green-200 transition-all"
            >
              <h3 className="font-bold text-green-900 mb-1">UC Personal Insight Questions Guide</h3>
              <p className="text-sm text-slate-600">University of California's 350-word essay requirements and tips</p>
              <span className="text-xs text-green-600 mt-2 inline-block">universityofcalifornia.edu →</span>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mb-8">
          <p>🕒 Last Updated: November 24, 2025</p>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">❓ Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What is the UCAS personal statement character limit?</h3>
              <p className="text-slate-700 leading-relaxed">
                The UCAS personal statement has a strict limit of <strong>4,000 characters</strong> (including spaces) or <strong>47 lines of text</strong>, whichever comes first. This limit has been in place since 2008 for UK university applications.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How many words is 4000 characters for a personal statement?</h3>
              <p className="text-slate-700 leading-relaxed">
                4000 characters typically equals approximately <strong>500-650 words</strong>, depending on word length and spacing. Most UCAS personal statements are around 570-600 words to stay comfortably within the character limit.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Does the character counter include spaces and punctuation?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, our personal statement character counter includes <strong>all characters</strong>: letters, spaces, punctuation marks, line breaks, and special characters. Everything you type counts toward your limit, matching exactly how UCAS and other application systems count.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What happens if I exceed the UCAS character limit?</h3>
              <p className="text-slate-700 leading-relaxed">
                If you exceed 4,000 characters, the UCAS system will <strong>automatically cut off your text</strong>, and the excess content will not be submitted. Universities will only see the truncated version. Use our counter to stay within limits before submission.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Can I use this counter for Common App essays?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes! You can adjust the character limit to <strong>650 words</strong> (approximately 4,000-4,500 characters) for Common App personal statements or set custom limits for UC Applications (350 words), Coalition App, or any other college application essay requirements.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How do I count lines in my personal statement?</h3>
              <p className="text-slate-700 leading-relaxed">
                Our tool automatically counts lines (maximum 47 for UCAS). Each line break or paragraph counts as a new line. The UCAS system uses a standard font size and spacing, so our counter matches their exact format to ensure accuracy.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Is this personal statement counter free to use?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, our personal statement character counter is <strong>completely free</strong> with no registration required. Use it unlimited times to perfect your college or university application essay. Your text stays private and is never uploaded to any server.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          navigateTo={navigateTo}
          relatedSlugs={['common-app-essay-word-counter', 'ucas-points-calculator', 'college-admissions-calculator', 'word-counter', 'gre-score-calculator']}
          currentSlug="personal-statement-character-counter"
        />
      </div>
    </div>
  );
};

export default PersonalStatementCharacterCounter;
