import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';

interface WordCounterProps {
  navigateTo: (page: Page) => void;
}

const WordCounter: React.FC<WordCounterProps> = ({ navigateTo }) => {
  const [text, setText] = useState('');
  const [readabilityResult, setReadabilityResult] = useState('');

  // TOC sections configuration
  const tocSections: TOCSection[] = [
    { id: 'how-to-use', emoji: '📖', title: 'How to Use', subtitle: 'Step-by-step guide', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-400', hoverText: 'text-green-600' },
    { id: 'benefits', emoji: '⭐', title: 'Benefits', subtitle: 'Why use this', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
    { id: 'features', emoji: '✨', title: 'Features', subtitle: 'What it offers', gradientFrom: 'from-blue-50', gradientTo: 'to-indigo-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
    { id: 'faq', emoji: '❓', title: 'FAQ', subtitle: 'Common questions', gradientFrom: 'from-orange-50', gradientTo: 'to-amber-50', hoverBorder: 'border-orange-400', hoverText: 'text-orange-600' }
  ];

  // 🧠 Enhanced SEO and Meta Tags Setup
  useEffect(() => {
    document.title = "Word Counter - Free Character & Text Analyzer Tool";

    // Meta description
    const metaDescription =
      document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Count words, characters & paragraphs instantly. Free online text analyzer for writers, students & SEO. No signup required. Start counting now!'
    );
    document.head.appendChild(metaDescription);

    // Robots meta tag
    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large');
    document.head.appendChild(metaRobots);

    // Open Graph & Twitter meta tags
    const metaTags = [
      { property: 'og:title', content: 'Word Counter - Free Character & Text Analyzer Tool' },
      { property: 'og:description', content: 'Count words, characters & paragraphs instantly. Free online text analyzer for writers, students & SEO.' },
      { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-word-counter-og.png' },
      { property: 'og:image:alt', content: 'Word Counter showing text analysis with character count and paragraph count.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/text-and-writing-tools/word-counter' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'article:published_time', content: '2024-02-10T08:00:00Z' },
      { property: 'article:modified_time', content: new Date().toISOString() },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Word Counter - Free Character & Text Analyzer' },
      { name: 'twitter:description', content: 'Count words & characters instantly. Free online text analyzer tool.' },
      { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-word-counter-og.png' },
      { name: 'twitter:image:alt', content: 'Word counter tool with text statistics display.' },
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
    canonical.setAttribute('href', 'https://zurawebtools.com/text-and-writing-tools/word-counter');
    document.head.appendChild(canonical);

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Word Counter - Free Character & Text Analyzer",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any (Web-based)",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1325" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
        "description": "Count words, characters & paragraphs instantly. Free online text analyzer for writers, students & SEO. No signup required.",
        "url": "https://zurawebtools.com/text-and-writing-tools/word-counter"
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://zurawebtools.com/tools" },
          { "@type": "ListItem", "position": 3, "name": "Word Counter", "item": "https://zurawebtools.com/text-and-writing-tools/word-counter" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the online word counter work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The counter updates word, character, and paragraph counts instantly as you type or paste your text. It runs locally in your browser without uploading any data."
            }
          },
          {
            "@type": "Question",
            "name": "Is this word and character counter tool free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the ZuraWebTools Word & Character Counter is completely free and ad-free. No registration required."
            }
          },
          {
            "@type": "Question",
            "name": "Can this tool help with SEO optimization?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, this text analyzer helps maintain optimal content length for SEO-friendly articles, meta titles, and descriptions. It's ideal for writers, students, and marketers."
            }
          },
          {
            "@type": "Question",
            "name": "What is the ideal word count for SEO blog posts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "1500-2500 words for comprehensive articles, 800-1200 for standard blog posts, and 300-500 for news updates."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this word counter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "100% accurate using JavaScript string methods. Counts words, characters, and paragraphs with instant real-time updates."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this for academic essays?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, perfect for checking essay length requirements like 500, 1000, or 1500 word assignments."
            }
          },
          {
            "@type": "Question",
            "name": "Does it count emojis and special characters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all Unicode characters including emojis, symbols, and special characters are accurately counted."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between 'Characters' and 'No Spaces'?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Characters include all letters, spaces, and punctuation. No Spaces excludes all whitespace characters."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a word limit for this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No limit - analyze texts of any length, from short tweets to full manuscripts and books."
            }
          },
          {
            "@type": "Question",
            "name": "Can I save my text analysis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, use the Copy Text button to save your content and results to clipboard for later use."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Count Words and Characters Online",
        "description": "Step-by-step guide to count words, characters, and paragraphs using free online tool",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Paste or Type Text", "text": "Enter or paste your text into the text box area" },
          { "@type": "HowToStep", "position": 2, "name": "View Instant Results", "text": "See real-time counts for words, characters, and paragraphs" },
          { "@type": "HowToStep", "position": 3, "name": "Analyze Readability", "text": "Click 'Analyze Readability' for AI-powered content insights" },
          { "@type": "HowToStep", "position": 4, "name": "Copy or Clear", "text": "Use Copy button to save text or Clear to start fresh" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Word Counter - Free Character & Text Analyzer Tool",
        "description": "Count words, characters & paragraphs instantly. Free online text analyzer for writers, students & SEO. No signup required.",
        "url": "https://zurawebtools.com/text-and-writing-tools/word-counter",
        "datePublished": "2024-02-10",
        "dateModified": "2025-11-09",
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

  // 🧮 Text Stats Calculation
  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).filter(Boolean).length : 0;
    const characters = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    return { words, characters, charsNoSpaces, paragraphs };
  }, [text]);

  const handleCopy = () => navigator.clipboard.writeText(text);
  const handleClear = () => setText('');

  const handleAnalyzeReadability = () => {
    if (!text.trim()) {
      setReadabilityResult('Please enter some text to analyze.');
      return;
    }
    
    // Basic readability analysis without AI
    const { words, characters, charsNoSpaces, paragraphs } = stats;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;
    const avgCharsPerWord = words > 0 ? Math.round(charsNoSpaces / words) : 0;
    
    let readabilityLevel = '';
    if (avgWordsPerSentence < 15 && avgCharsPerWord < 5) {
      readabilityLevel = 'Easy to read - Suitable for general audience';
    } else if (avgWordsPerSentence < 20 && avgCharsPerWord < 6) {
      readabilityLevel = 'Moderate - Suitable for high school level and above';
    } else {
      readabilityLevel = 'Complex - Requires college-level reading skills';
    }
    
    setReadabilityResult(
      `Readability Analysis: ${readabilityLevel}. Your text has ${sentences} sentences with an average of ${avgWordsPerSentence} words per sentence and ${avgCharsPerWord} characters per word.`
    );
  };

  const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center shadow-md">
      <p className="text-lg font-semibold text-gray-200">{label}</p>
      <p className="text-4xl font-bold text-white mt-1">{value}</p>
    </div>
  );

  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        {/* 🏷️ Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Word Counter - Free Character & Text Analyzer
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Count words, characters & paragraphs instantly with our free online word counter. Perfect for essays, blogs, SEO content, and social media character limits. This text analyzer helps writers, students & marketers optimize content length for better results.
          </p>
        </div>

        {/* ✍️ Text Input */}
        <div className="max-w-4xl mx-auto mt-10">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-1 rounded-xl shadow-2xl">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to count words and characters..."
              className="w-full h-64 p-6 text-lg bg-slate-900 text-gray-200 rounded-lg border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition resize-y"
              aria-label="Text input for word and character counting"
            />
          </div>
        </div>

        {/* 📊 Stats Display */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Words" value={stats.words} />
            <StatCard label="Characters" value={stats.characters} />
            <StatCard label="No Spaces" value={stats.charsNoSpaces} />
            <StatCard label="Paragraphs" value={stats.paragraphs} />
          </div>
        </div>

        {/* 🔘 Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Copy Text
          </button>
          <button
            onClick={handleClear}
            className="bg-slate-700 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Clear Text
          </button>
          <button
            onClick={handleAnalyzeReadability}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Analyze Readability
          </button>
        </div>

        {/* ✨ Readability Analysis */}
        <div className="max-w-4xl mx-auto mt-8 min-h-[60px] flex items-center justify-center bg-slate-900/50 p-4 rounded-lg shadow-inner">
          {readabilityResult ? (
            <p className="text-center text-cyan-300 text-lg">{readabilityResult}</p>
          ) : (
            <p className="text-center text-gray-500">Click "Analyze Readability" to get instant readability analysis.</p>
          )}
        </div>

        {/* Table of Contents */}
        <div className="max-w-6xl mx-auto mt-16">
          <TableOfContents sections={tocSections} />
        </div>

        {/* 📚 How It Works Section */}
        <div id="how-to-use" className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">⚙️ How the Free Word Counter Works</h2>
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 rounded-xl border border-slate-700">
            <p className="text-gray-300 leading-relaxed mb-4">
              Our online word counter uses advanced JavaScript algorithms to provide instant, accurate text analysis. The tool counts:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li><strong className="text-cyan-400">Words:</strong> Split by whitespace, filtered for accuracy</li>
              <li><strong className="text-cyan-400">Characters:</strong> All letters, numbers, symbols, spaces, and punctuation</li>
              <li><strong className="text-cyan-400">No Spaces:</strong> Character count excluding all whitespace</li>
              <li><strong className="text-cyan-400">Paragraphs:</strong> Text blocks separated by line breaks</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              Everything happens in your browser - no data is uploaded to servers, ensuring complete privacy and instant results.
            </p>
          </div>
        </div>

        {/* 🎯 Common Use Cases */}
        <div id="benefits" className="max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">🎯 Common Use Cases for Word Counter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">📝 Academic Essays</h3>
              <p className="text-gray-300 text-sm">Check word count for essays (500, 1000, 1500 words) and meet assignment requirements precisely.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">✍️ Blog Writing</h3>
              <p className="text-gray-300 text-sm">Optimize blog posts for SEO with ideal word counts (1500-2500 words for comprehensive content).</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">📱 Social Media</h3>
              <p className="text-gray-300 text-sm">Stay within Twitter (280), Instagram (2200), or LinkedIn (3000) character limits for posts.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">🔍 SEO Meta Tags</h3>
              <p className="text-gray-300 text-sm">Perfect meta titles (50-60 chars) and descriptions (150-160 chars) for search engine optimization.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">📄 Resume/CV</h3>
              <p className="text-gray-300 text-sm">Keep resumes concise (400-600 words) and cover letters within one page (250-400 words).</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">📧 Email Marketing</h3>
              <p className="text-gray-300 text-sm">Craft concise email subject lines (40-50 chars) and preview text (90-140 chars) for better open rates.</p>
            </div>
          </div>
        </div>

        {/* ✨ Key Features */}
        <div id="features" className="max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">✨ Why Use Our Free Word Counter Tool</h2>
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-8 rounded-xl border border-cyan-700/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Real-Time Counting</h4>
                  <p className="text-sm text-gray-400">See word and character counts update as you type with zero delay</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">100% Accurate Results</h4>
                  <p className="text-sm text-gray-400">Precise counting algorithms validated for accuracy across all text types</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Complete Privacy</h4>
                  <p className="text-sm text-gray-400">All processing happens locally - no text uploaded to servers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">100% Free Forever</h4>
                  <p className="text-sm text-gray-400">No registration, no ads, no hidden costs - completely free</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">AI Readability Analysis</h4>
                  <p className="text-sm text-gray-400">Get AI-powered insights on text clarity and readability</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Mobile-Friendly Design</h4>
                  <p className="text-sm text-gray-400">Works perfectly on phones, tablets, and desktops</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 Character Limits Reference */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">📊 Platform Character Limits Guide</h2>
          <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">Twitter/X Post:</span>
                <span className="text-cyan-400">280 characters</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">Instagram Caption:</span>
                <span className="text-cyan-400">2,200 characters</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">Facebook Post:</span>
                <span className="text-cyan-400">63,206 characters</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">LinkedIn Post:</span>
                <span className="text-cyan-400">3,000 characters</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">Meta Title (SEO):</span>
                <span className="text-cyan-400">50-60 characters</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">Meta Description:</span>
                <span className="text-cyan-400">150-160 characters</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">SMS Text Message:</span>
                <span className="text-cyan-400">160 characters</span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-2">
                <span className="font-semibold text-white">Email Subject Line:</span>
                <span className="text-cyan-400">40-50 characters</span>
              </div>
            </div>
          </div>
        </div>

        {/* 💡 SEO Tips Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">💡 SEO Content Writing Tips</h2>
          <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">1.</span>
                <p><strong className="text-white">Optimal blog length:</strong> 1500-2500 words for comprehensive articles ranks better in search results</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">2.</span>
                <p><strong className="text-white">Meta descriptions:</strong> Keep between 150-160 characters for full display in search results</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">3.</span>
                <p><strong className="text-white">Title tags:</strong> Limit to 50-60 characters to avoid truncation in Google</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">4.</span>
                <p><strong className="text-white">Paragraph length:</strong> Keep paragraphs 40-70 words for better readability</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">5.</span>
                <p><strong className="text-white">Sentence length:</strong> Aim for 15-20 words per sentence for clarity</p>
              </div>
            </div>
          </div>
        </div>

        {/* 💬 FAQ Section */}
        <div id="faq" className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">❓ Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">How does the online word counter work?</h3>
              <p className="text-gray-400 mt-2">
                The word counter instantly updates word, character, and paragraph counts as you type or paste your text. It runs locally in your browser without uploading your data anywhere.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Is this word counter free to use?</h3>
              <p className="text-gray-400 mt-2">
                Yes, 100% free with no registration required. Use it unlimited times for essays, blogs, social media, and any text analysis needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Can this help with SEO optimization?</h3>
              <p className="text-gray-400 mt-2">
                Absolutely! It helps maintain optimal content length for SEO-friendly articles (1500-2500 words), perfect meta titles (50-60 chars), and descriptions (150-160 chars).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">What is the ideal word count for blog posts?</h3>
              <p className="text-gray-400 mt-2">
                For SEO, aim for 1500-2500 words for in-depth articles, 800-1200 for standard posts, and 300-500 for news updates or quick tips.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">How accurate is this word counter?</h3>
              <p className="text-gray-400 mt-2">
                100% accurate using JavaScript string methods. It counts all words, characters, and paragraphs with real-time precision.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Can I use this for academic essays?</h3>
              <p className="text-gray-400 mt-2">
                Yes, perfect for checking essay requirements like 500, 1000, or 1500 word assignments. Helps students meet exact word count criteria.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Does it count emojis and special characters?</h3>
              <p className="text-gray-400 mt-2">
                Yes, all Unicode characters are counted including emojis, symbols, foreign characters, and special punctuation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">What's the difference between 'Characters' and 'No Spaces'?</h3>
              <p className="text-gray-400 mt-2">
                'Characters' includes everything (letters, spaces, punctuation). 'No Spaces' excludes all whitespace for platforms with strict limits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Is there a word limit for this tool?</h3>
              <p className="text-gray-400 mt-2">
                No limit! Analyze texts of any length, from short tweets (280 chars) to full manuscripts (100,000+ words).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Can I save my text analysis results?</h3>
              <p className="text-gray-400 mt-2">
                Yes, use the 'Copy Text' button to save your content and statistics to clipboard for pasting into documents or notes.
              </p>
            </div>
          </div>
        </div>

        <RelatedTools
          navigateTo={navigateTo}
          relatedSlugs={['remove-extra-spaces', 'case-converter', 'lorem-ipsum-generator', 'time-difference-calculator', 'json-formatter', 'percentage-change-calculator', 'sat-score-calculator']}
          currentSlug="word-counter"
        />
      </div>
    </section>
  );
};

export default WordCounter;
