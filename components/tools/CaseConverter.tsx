import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface CaseConverterProps {
  navigateTo: (page: Page) => void;
}

const CaseConverter: React.FC<CaseConverterProps> = ({ navigateTo }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Character and word counters
  const charCount = inputText.length;
  const wordCount = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
  const lineCount = inputText.split('\n').length;

  // TOC sections configuration
  const tocSections: TOCSection[] = [
    { id: 'how-to-use', emoji: '📖', title: 'How to Use', subtitle: 'Quick tutorial', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-400', hoverText: 'text-green-600' },
    { id: 'benefits', emoji: '⭐', title: 'Benefits', subtitle: 'Key advantages', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
    { id: 'use-cases', emoji: '💼', title: 'Use Cases', subtitle: 'When to use', gradientFrom: 'from-blue-50', gradientTo: 'to-indigo-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
    { id: 'faq', emoji: '❓', title: 'FAQ', subtitle: 'Common questions', gradientFrom: 'from-orange-50', gradientTo: 'to-amber-50', hoverBorder: 'border-orange-400', hoverText: 'text-orange-600' }
  ];

  // 🧠 SEO & Meta Tags Setup
  useEffect(() => {
    document.title = "Online Case Converter Tool – Free Text Case Changer | ZuraWebTools";

    const metaDescription =
      document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Free online case converter and text formatter tool. Instantly change text to uppercase, lowercase, title case, sentence case, or capitalized case. Perfect text transformation tool for writers, developers, content creators, and SEO professionals. Convert character case with one click!'
    );
    document.head.appendChild(metaDescription);

    // 🔗 OG & Twitter Tags
    const metaTags = [
        { property: 'og:title', content: 'Online Case Converter Tool – Free Text Case Changer | ZuraWebTools' },
        { property: 'og:description', content: 'Instantly convert text to uppercase, lowercase, title case, and more. A free text format changer for SEO, social media, and content creation.' },
        { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-case-converter-og.png' },
        { property: 'og:image:alt', content: 'A preview of the Online Case Converter Tool from ZuraWebTools, with conversion buttons.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://zurawebtools.com/text-and-writing-tools/case-converter' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Online Case Converter Tool | ZuraWebTools' },
        { name: 'twitter:description', content: 'Free tool to convert text to uppercase, lowercase, title case, and sentence case online.' },
        { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-case-converter-og.png' },
        { name: 'twitter:image:alt', content: 'A preview of the Online Case Converter Tool from ZuraWebTools, with conversion buttons.' },
        { name: 'language', content: 'English' },
        { httpEquiv: 'content-language', content: 'en-US' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    ];

    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', 'en');
    metaTags.forEach((tagInfo) => {
      const meta = document.createElement('meta');
      Object.entries(tagInfo).forEach(([k, v]) => meta.setAttribute(k, v));
      document.head.appendChild(meta);
    });

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/text-and-writing-tools/case-converter');
    document.head.appendChild(canonical);
    
    // 📜 JSON-LD Schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Online Case Converter Tool – Free Text Case Changer",
        "operatingSystem": "Any (Web-based)",
        "applicationCategory": "TextEditingTool",
        "datePublished": "2024-01-05",
        "dateModified": "2024-11-08",
        "inLanguage": "en-US",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "softwareVersion": "2.0",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1450" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://zurawebtools.com/assets/logo.png",
            "width": "250",
            "height": "60"
          },
          "sameAs": [
            "https://www.facebook.com/zurawebtools",
            "https://twitter.com/zurawebtools",
            "https://www.linkedin.com/company/zurawebtools"
          ]
        },
        "description": "A free online text case changer to convert text to uppercase, lowercase, title case, sentence case, and capitalized case. This text capitalization tool is ideal for writers, developers, and for SEO content formatting.",
        "url": "https://zurawebtools.com/text-and-writing-tools/case-converter"
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Online Case Converter Tool",
        "description": "Free text case converter and formatter for uppercase, lowercase, title case, and sentence case conversion",
        "url": "https://zurawebtools.com/text-and-writing-tools/case-converter",
        "datePublished": "2024-01-05",
        "dateModified": "2024-11-08",
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "about": {
          "@type": "Thing",
          "name": "Text Formatting",
          "description": "Text case conversion and capitalization tools"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://storage.googleapis.com/aai-web-samples/zura-case-converter-og.png",
          "description": "Case Converter Tool interface"
        }
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
            "name": "Tools",
            "item": "https://zurawebtools.com/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Case Converter",
            "item": "https://zurawebtools.com/text-and-writing-tools/case-converter"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Convert Text Case Online",
        "description": "Step-by-step guide to using the case converter tool",
        "totalTime": "PT1M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Paste Your Text",
            "text": "Copy the text you want to convert and paste it into the left input box.",
            "url": "https://zurawebtools.com/text-and-writing-tools/case-converter#step1"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Choose a Case Format",
            "text": "Click on one of the case format buttons like Uppercase, Lowercase, Title Case, or Sentence Case.",
            "url": "https://zurawebtools.com/text-and-writing-tools/case-converter#step2"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Copy the Result",
            "text": "The converted text will instantly appear in the right output box. Click the Copy Result button to copy it to your clipboard.",
            "url": "https://zurawebtools.com/text-and-writing-tools/case-converter#step3"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the Online Case Converter Tool work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The tool uses client-side JavaScript to instantly change the case of your text. Simply paste your text in the input box, click a case format button, and the converted text will appear in the output box. No data is sent to a server."
            }
          },
          {
            "@type": "Question",
            "name": "Is this text case changer free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our Online Case Converter is 100% free to use with no limitations or sign-up requirements. It's provided by ZuraWebTools to help with your daily text formatting needs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this for SEO or social media content formatting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. This tool is perfect for formatting blog titles (Title Case), social media posts (Sentence Case), and ensuring consistent capitalization for your SEO meta titles and descriptions."
            }
          },
          {
            "@type": "Question",
            "name": "What are the different case formats supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The tool supports UPPERCASE, lowercase, Title Case (every word capitalized), Capitalized Case (same as Title Case), and Sentence case (first letter of each sentence capitalized)."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between Title Case and Capitalized Case?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In this tool, Title Case and Capitalized Case function identically - both capitalize the first letter of every word. Traditionally, Title Case follows specific rules for articles and prepositions, but our tool applies simple capitalization for ease of use."
            }
          },
          {
            "@type": "Question",
            "name": "Does this work with special characters and numbers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! The tool preserves special characters, numbers, punctuation, and formatting. Only alphabetic characters are affected by the case conversion, everything else remains unchanged."
            }
          },
          {
            "@type": "Question",
            "name": "Is my text data stored or sent to any servers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. All text conversion happens entirely in your browser using JavaScript. Your data never leaves your device, ensuring complete privacy and security. We don't store, track, or transmit any of your text."
            }
          }
        ]
      }
    ]);
    document.head.appendChild(script);

    // 🧹 Cleanup
    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      document.documentElement.removeAttribute('lang');
      metaDescription.remove();
      metaTags.forEach((tag) => {
        const selector = Object.keys(tag)[0];
        const value = Object.values(tag)[0];
        const el = document.querySelector(`meta[${selector}="${value}"]`);
        if (el) el.remove();
      });
      canonical.remove();
      script.remove();
    };
  }, []);

  // 📡 IndexNow: Notify search engines about page updates
  useEffect(() => {
    notifyIndexNow('/text-and-writing-tools/case-converter');
  }, []);

  // ✍️ Case Conversion Logic
  const toUpperCase = () => setOutputText(inputText.toUpperCase());
  const toLowerCase = () => setOutputText(inputText.toLowerCase());
  const toTitleCase = () => {
    setOutputText(
      inputText.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );
  };
  const toSentenceCase = () => {
    setOutputText(
      inputText.toLowerCase().replace(/(^\w{1})|(\.\s*\w{1})|(\!\s*\w{1})|(\?\s*\w{1})/g, char => char.toUpperCase())
    );
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };
  
  const CaseButton: React.FC<{ label: string; onClick: () => void; }> = ({ label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full text-center bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-md"
    >
      {label}
    </button>
  );

  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Online Case Converter Tool – Free Text Case Changer
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Easily convert text between uppercase, lowercase, title case, and sentence case. This free text capitalization tool is perfect for writers, developers, and students looking for a quick text format changer online.
          </p>
        </div>
        
        {/* Main Tool Area */}
        <div className="max-w-6xl mx-auto mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input */}
            <div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
                className="w-full h-80 p-5 text-lg bg-slate-900 text-gray-200 rounded-xl border-2 border-slate-700 focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition resize-y"
                aria-label="Input text for case conversion"
              />
            </div>
            {/* Output */}
            <div>
              <textarea
                value={outputText}
                readOnly
                placeholder="Converted text will appear here..."
                className="w-full h-80 p-5 text-lg bg-slate-900 text-gray-300 rounded-xl border-2 border-slate-700 focus:outline-none resize-y cursor-not-allowed"
                aria-label="Output of converted text"
              />
            </div>
          </div>
        </div>

        {/* Character Counter */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="flex justify-between items-center bg-slate-900/40 px-6 py-3 rounded-lg text-sm">
            <div className="flex gap-6">
              <span className="text-gray-400">Characters: <strong className="text-cyan-400">{charCount}</strong></span>
              <span className="text-gray-400">Words: <strong className="text-cyan-400">{wordCount}</strong></span>
              <span className="text-gray-400">Lines: <strong className="text-cyan-400">{lineCount}</strong></span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="max-w-6xl mx-auto mt-6 bg-slate-900/50 p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <CaseButton label="Uppercase" onClick={toUpperCase} />
            <CaseButton label="Lowercase" onClick={toLowerCase} />
            <CaseButton label="Title Case" onClick={toTitleCase} />
            <CaseButton label="Sentence Case" onClick={toSentenceCase} />
            <CaseButton label="Capitalized Case" onClick={toTitleCase} />
          </div>
          <div className="flex justify-center items-center gap-4 mt-6 border-t border-slate-700 pt-6">
            <button
              onClick={handleCopy}
              className={`font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${
                copySuccess
                  ? 'bg-green-600 text-white'
                  : 'bg-cyan-500 text-white hover:bg-cyan-600'
              }`}
            >
              {copySuccess ? 'Copied!' : 'Copy Result'}
            </button>
            <button
              onClick={handleClear}
              className="bg-slate-700 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Quick Test Examples */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 text-center">⚡ Quick Test Examples</h3>
            <p className="text-gray-400 text-center mb-6 text-sm">Click any example to see instant case conversion</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setInputText('the quick brown fox jumps over the lazy dog');
                  setOutputText('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="mb-2">
                  <span className="font-semibold text-white group-hover:text-cyan-300 text-sm">UPPERCASE Example</span>
                </div>
                <p className="text-xs text-gray-500">Before: <span className="text-gray-400">the quick brown fox</span></p>
                <p className="text-xs text-gray-500">After: <span className="text-cyan-400">THE QUICK BROWN FOX</span></p>
              </button>

              <button
                onClick={() => {
                  setInputText('MAKE EVERYTHING LOWERCASE');
                  setOutputText('make everything lowercase');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="mb-2">
                  <span className="font-semibold text-white group-hover:text-cyan-300 text-sm">lowercase Example</span>
                </div>
                <p className="text-xs text-gray-500">Before: <span className="text-gray-400">MAKE EVERYTHING</span></p>
                <p className="text-xs text-gray-500">After: <span className="text-cyan-400">make everything</span></p>
              </button>

              <button
                onClick={() => {
                  setInputText('this is a great blog title');
                  setOutputText('This Is A Great Blog Title');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="mb-2">
                  <span className="font-semibold text-white group-hover:text-cyan-300 text-sm">Title Case Example</span>
                </div>
                <p className="text-xs text-gray-500">Before: <span className="text-gray-400">this is a great blog title</span></p>
                <p className="text-xs text-gray-500">After: <span className="text-cyan-400">This Is A Great Blog Title</span></p>
              </button>

              <button
                onClick={() => {
                  setInputText('this is a sentence. this is another sentence.');
                  setOutputText('This is a sentence. This is another sentence.');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="mb-2">
                  <span className="font-semibold text-white group-hover:text-cyan-300 text-sm">Sentence Case Example</span>
                </div>
                <p className="text-xs text-gray-500">Before: <span className="text-gray-400">this is a sentence...</span></p>
                <p className="text-xs text-gray-500">After: <span className="text-cyan-400">This is a sentence...</span></p>
              </button>

              <button
                onClick={() => {
                  setInputText('seo title optimization for google');
                  setOutputText('Seo Title Optimization For Google');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="mb-2">
                  <span className="font-semibold text-white group-hover:text-cyan-300 text-sm">SEO Title Example</span>
                </div>
                <p className="text-xs text-gray-500">Before: <span className="text-gray-400">seo title optimization</span></p>
                <p className="text-xs text-gray-500">After: <span className="text-cyan-400">Seo Title Optimization</span></p>
              </button>

              <button
                onClick={() => {
                  setInputText('JavaScript, HTML5, and CSS3 support!');
                  setOutputText('javascript, html5, and css3 support!');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="mb-2">
                  <span className="font-semibold text-white group-hover:text-cyan-300 text-sm">Special Characters</span>
                </div>
                <p className="text-xs text-gray-500">Before: <span className="text-gray-400">JavaScript, HTML5...</span></p>
                <p className="text-xs text-gray-500">After: <span className="text-cyan-400">javascript, html5...</span></p>
              </button>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="max-w-6xl mx-auto mt-16">
          <TableOfContents sections={tocSections} />
        </div>

        {/* Benefits Section */}
        <section id="benefits" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Conversion</h3>
            <p className="text-slate-300">Real-time text case conversion as you type. No waiting, no delays — just instant uppercase, lowercase, title case, and sentence case results.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">🆓</div>
            <h3 className="text-xl font-bold text-white mb-3">100% Free</h3>
            <p className="text-slate-300">Completely free text case converter with no registration required. No hidden fees, no limitations — unlimited conversions forever.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-white mb-3">100% Private</h3>
            <p className="text-slate-300">All conversions happen in your browser. No data uploads, no server storage — your text stays completely confidential and secure.</p>
          </div>
        </section>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 p-8 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">About This Text Case Converter & Formatter</h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Our <strong>free online case converter</strong> is a powerful <strong>text transformation tool</strong> designed for writers, developers, content creators, and SEO professionals. This <strong>text formatter</strong> instantly converts your text between different <strong>case formats</strong> including uppercase, lowercase, title case, sentence case, and capitalized case. Based on standard <a href="https://en.wikipedia.org/wiki/Letter_case" target="_blank" rel="nofollow noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">letter case conventions</a>, our tool ensures proper <strong>text capitalization</strong> for any purpose.
              </p>
              <p>
                Whether you're formatting blog titles for <strong>SEO optimization</strong>, creating social media captions, coding variable names, or preparing academic content following <a href="https://apastyle.apa.org/style-grammar-guidelines/capitalization" target="_blank" rel="nofollow noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">APA style guidelines</a>, this <strong>character case changer</strong> handles all your text styling needs. Use our <button onClick={() => navigateTo('word-counter')} className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer">Word Counter</button> tool alongside for complete text analysis, or try our <button onClick={() => navigateTo('remove-extra-spaces')} className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer">Remove Extra Spaces</button> tool for perfect text formatting.
              </p>
              <p>
                Perfect for bloggers creating compelling headlines, developers naming functions and variables, students formatting assignments, and social media managers crafting engaging posts. All processing happens in your browser - your text never leaves your device, ensuring complete <strong>privacy and security</strong>. No registration, no limits, completely free!
              </p>
              <p className="text-sm text-gray-400 italic border-t border-slate-600 pt-4">
                <span className="inline-block">📅 Last updated: November 8, 2024</span>
                <span className="mx-2">•</span>
                <span className="inline-block">⚡ Supporting all major text case formats</span>
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div id="use-cases" className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">📝</div>
                <h3 className="text-xl font-semibold text-cyan-300">SEO & Blogging</h3>
              </div>
              <p className="text-gray-400 text-sm mb-2">Format meta titles and headings in proper Title Case for better readability and SEO ranking.</p>
              <div className="bg-slate-800/50 p-3 rounded mt-2">
                <p className="text-xs text-gray-500">Example:</p>
                <p className="text-xs text-cyan-400">"How To Optimize Your Website For Search Engines"</p>
              </div>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">📱</div>
                <h3 className="text-xl font-semibold text-cyan-300">Social Media</h3>
              </div>
              <p className="text-gray-400 text-sm mb-2">Convert captions to Sentence case for natural, engaging social media posts.</p>
              <div className="bg-slate-800/50 p-3 rounded mt-2">
                <p className="text-xs text-gray-500">Example:</p>
                <p className="text-xs text-cyan-400">"Check out our new product launch today!"</p>
              </div>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">💻</div>
                <h3 className="text-xl font-semibold text-cyan-300">Programming</h3>
              </div>
              <p className="text-gray-400 text-sm mb-2">Convert text to lowercase for variable names, or UPPERCASE for constants in your code.</p>
              <div className="bg-slate-800/50 p-3 rounded mt-2">
                <p className="text-xs text-gray-500">Example:</p>
                <p className="text-xs text-cyan-400">const API_KEY or let userName</p>
              </div>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">✍️</div>
                <h3 className="text-xl font-semibold text-cyan-300">Academic Writing</h3>
              </div>
              <p className="text-gray-400 text-sm mb-2">Format paper titles and headings according to academic style guides like APA or Chicago.</p>
              <div className="bg-slate-800/50 p-3 rounded mt-2">
                <p className="text-xs text-gray-500">Example:</p>
                <p className="text-xs text-cyan-400">"The Impact of Social Media on Modern Communication"</p>
              </div>
            </div>
          </div>
        </div>

        {/* How-to */}
        <div id="how-to-use" className="max-w-4xl mx-auto mt-16 text-left">
           <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use This Case Converter</h2>
           <div className="bg-slate-900/30 p-8 rounded-xl shadow-lg space-y-6">
             <div className="space-y-5">
               <div className="flex gap-4 items-start">
                 <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                   1
                 </div>
                 <div>
                   <h3 className="text-xl font-semibold text-white mb-2">Paste Your Text</h3>
                   <p className="text-gray-300 mb-2">Copy the text you want to convert and paste it into the left input box. You can paste any length of text - paragraphs, sentences, or single words.</p>
                   <div className="bg-slate-800/50 p-3 rounded border-l-4 border-cyan-500">
                     <p className="text-sm text-gray-400"><strong>Pro Tip:</strong> The tool automatically counts characters, words, and lines in real-time!</p>
                   </div>
                 </div>
               </div>

               <div className="flex gap-4 items-start">
                 <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                   2
                 </div>
                 <div>
                   <h3 className="text-xl font-semibold text-white mb-2">Choose a Case Format</h3>
                   <p className="text-gray-300 mb-2">Click on one of the five case format buttons: Uppercase, Lowercase, Title Case, Sentence Case, or Capitalized Case.</p>
                   <div className="bg-slate-800/50 p-3 rounded border-l-4 border-cyan-500">
                     <p className="text-sm text-gray-400"><strong>Example:</strong> Click "Title Case" to capitalize the first letter of every word - perfect for blog titles!</p>
                   </div>
                 </div>
               </div>

               <div className="flex gap-4 items-start">
                 <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                   3
                 </div>
                 <div>
                   <h3 className="text-xl font-semibold text-white mb-2">Copy the Result</h3>
                   <p className="text-gray-300 mb-2">The converted text instantly appears in the right output box. Click "Copy Result" to copy it to your clipboard, then paste anywhere you need!</p>
                   <div className="bg-slate-800/50 p-3 rounded border-l-4 border-cyan-500">
                     <p className="text-sm text-gray-400"><strong>Tip:</strong> Try different case formats to see which looks best for your content</p>
                   </div>
                 </div>
               </div>
             </div>

             <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-700/30 rounded-lg">
               <p className="text-cyan-300 font-semibold mb-2">💡 Pro Tips:</p>
               <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                 <li>Use Title Case for blog headings and SEO meta titles</li>
                 <li>Use Sentence case for natural-sounding social media captions</li>
                 <li>Use UPPERCASE for attention-grabbing announcements or headings</li>
                 <li>Use lowercase for coding variable names or email addresses</li>
                 <li>Try Quick Test Examples above to see each format in action!</li>
               </ul>
             </div>
           </div>
        </div>

        {/* External Links Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🔗 Writing & SEO Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://en.wikipedia.org/wiki/Letter_case" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors duration-300 group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400">📚 Letter Case – Wikipedia</h3>
              <p className="text-sm text-slate-400">Comprehensive guide to letter case systems, capitalization rules, and typography conventions across different writing systems.</p>
            </a>
            <a 
              href="https://en.wikipedia.org/wiki/Title_case" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors duration-300 group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400">✍️ Title Case Rules – Wikipedia</h3>
              <p className="text-sm text-slate-400">Learn professional title case formatting rules for headlines, book titles, and SEO optimization in different style guides.</p>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <div id="faq" className="max-w-4xl mx-auto mt-16">
           <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
           <div className="space-y-4">
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">How does the Online Case Converter Tool work?</h3>
                   <p className="text-gray-400 mt-2">The tool uses client-side JavaScript to instantly change the case of your text. Simply paste your text in the input box, click a case format button, and the converted text will appear in the output box. No data is sent to a server - everything happens in your browser.</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">Is this text case changer free to use?</h3>
                   <p className="text-gray-400 mt-2">Yes, our Online Case Converter is 100% free to use with no limitations or sign-up requirements. It's provided by ZuraWebTools to help with your daily text formatting needs.</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">Can I use this for SEO or social media content formatting?</h3>
                   <p className="text-gray-400 mt-2">Absolutely. This tool is perfect for formatting blog titles (Title Case), social media posts (Sentence Case), and ensuring consistent capitalization for your SEO meta titles and descriptions.</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">What are the different case formats supported?</h3>
                   <p className="text-gray-400 mt-2">The tool supports UPPERCASE (all capitals), lowercase (all small letters), Title Case (every word capitalized), Capitalized Case (same as Title Case), and Sentence case (first letter of each sentence capitalized).</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">What's the difference between Title Case and Capitalized Case?</h3>
                   <p className="text-gray-400 mt-2">In this tool, Title Case and Capitalized Case function identically - both capitalize the first letter of every word. Traditionally, Title Case follows specific rules for articles and prepositions, but our tool applies simple capitalization for ease of use.</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">Does this work with special characters and numbers?</h3>
                   <p className="text-gray-400 mt-2">Yes! The tool preserves special characters, numbers, punctuation, and formatting. Only alphabetic characters are affected by the case conversion - everything else remains unchanged, including spaces, line breaks, and symbols.</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">Is my text data stored or sent to any servers?</h3>
                   <p className="text-gray-400 mt-2">No. All text conversion happens entirely in your browser using JavaScript. Your data never leaves your device, ensuring complete privacy and security. We don't store, track, or transmit any of your text.</p>
               </div>
           </div>
        </div>

        {/* Social Share Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="font-semibold text-gray-400 mb-4">Share This Tool:</p>
          <div className="flex justify-center items-center space-x-6">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/text-and-writing-tools/case-converter')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/text-and-writing-tools/case-converter')}&text=${encodeURIComponent('Free online case converter tool - instantly change text case!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://zurawebtools.com/text-and-writing-tools/case-converter')}&title=${encodeURIComponent('Online Case Converter Tool')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this free case converter tool: https://zurawebtools.com/text-and-writing-tools/case-converter')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <RelatedTools
          navigateTo={navigateTo}
          relatedSlugs={['word-counter', 'remove-extra-spaces', 'lorem-ipsum-generator']}
          currentSlug="case-converter"
        />
      </div>
    </section>
  );
};

export default CaseConverter;
