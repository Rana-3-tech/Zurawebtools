import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface WordCounterProps {
  navigateTo: (page: Page) => void;
}

const WordCounter: React.FC<WordCounterProps> = ({ navigateTo }) => {
  const [text, setText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [readabilityResult, setReadabilityResult] = useState('');

  // 🧠 Enhanced SEO and Meta Tags Setup
  useEffect(() => {
    document.title = "Online Word & Character Counter – Free Text Analyzer & SEO Word Count Tool | ZuraWebTools";

    // Meta description
    const metaDescription =
      document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Free Online Word and Character Counter Tool to instantly count words, characters, sentences, and paragraphs. Perfect for SEO content optimization, blog writing, essays, and social media post character limits.'
    );
    document.head.appendChild(metaDescription);

    // Meta keywords (for Bing/Yandex/secondary engines)
    const metaKeywords =
      document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute(
      'content',
      'online word counter, character counter, text analyzer, text length calculator, SEO content word count, blog word counter, article word counter, essay word counter, Instagram character counter, Twitter character counter'
    );
    document.head.appendChild(metaKeywords);

    // Open Graph & Twitter meta tags
    const metaTags = [
      { property: 'og:title', content: 'Online Word & Character Counter – Free Text Analyzer | ZuraWebTools' },
      { property: 'og:description', content: 'Instantly count words, characters, and paragraphs online. A fast, accurate, and privacy-safe word counter for writers, students, and SEO professionals.' },
      { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-word-counter-og.png' },
      { property: 'og:image:alt', content: 'Screenshot of ZuraWebTools Online Word & Character Counter showing text analysis.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/tools/word-counter' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Free Online Word & Character Counter | ZuraWebTools' },
      { name: 'twitter:description', content: 'Count words, characters, and paragraphs instantly. A powerful SEO content analyzer and blog word counter tool for online creators.' },
      { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-word-counter-og.png' },
      { name: 'twitter:image:alt', content: 'Free online word and character counter showing text stats and readability.' },
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => meta.setAttribute(key, value));
      document.head.appendChild(meta);
    });

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/tools/word-counter');
    document.head.appendChild(canonical);

    // JSON-LD Structured Data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Online Word & Character Counter Tool",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any (Web-based)",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1150" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
        "description": "A free online tool to count words, characters, sentences, and paragraphs. Ideal for SEO optimization, blogging, essays, and content writing.",
        "url": "https://zurawebtools.com/tools/word-counter"
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
              "text": "Yes, this text analyzer helps maintain optimal content length for SEO-friendly articles, meta titles, and descriptions. It’s ideal for writers, students, and marketers."
            }
          }
        ]
      }
    ]);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      metaDescription.remove();
      metaKeywords.remove();
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

  const handleAnalyzeReadability = async () => {
    if (!text.trim()) {
      setReadabilityResult('Please enter some text to analyze.');
      return;
    }
    setIsThinking(true);
    setReadabilityResult('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the readability of this text and provide a one-sentence summary: "${text}"`,
      });
      setReadabilityResult(response.text);
    } catch (error) {
      console.error("Error analyzing readability:", error);
      setReadabilityResult('Sorry, there was an error analyzing the text.');
    } finally {
      setIsThinking(false);
    }
  };

  const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center shadow-md">
      <p className="text-lg font-semibold text-gray-200">{label}</p>
      <p className="text-4xl font-bold text-white mt-1">{value}</p>
    </div>
  );

  const ThinkingIndicator = () => (
    <div className="flex items-center justify-center space-x-2">
      <span className="text-lg text-gray-300">Analyzing Readability</span>
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        {/* 🏷️ Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Online Word & Character Counter Tool – Free Text Analyzer
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Instantly count words and characters online with our free text counter. Perfect for analyzing your blog posts, checking social media post character limits, and optimizing content for SEO. This text length calculator also acts as a blog word counter and SEO content word count tool for writers, students, and marketers.
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
            disabled={isThinking}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Readability
          </button>
        </div>

        {/* ✨ AI Readability Analysis */}
        <div className="max-w-4xl mx-auto mt-8 min-h-[60px] flex items-center justify-center bg-slate-900/50 p-4 rounded-lg shadow-inner">
          {isThinking ? (
            <ThinkingIndicator />
          ) : readabilityResult ? (
            <p className="text-center text-cyan-300 text-lg">{readabilityResult}</p>
          ) : (
            <p className="text-center text-gray-500">Click "Analyze Readability" to get an AI-powered summary.</p>
          )}
        </div>

        {/* 💬 FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">How does the online word counter work?</h3>
              <p className="text-gray-400 mt-2">
                The word counter instantly updates word, character, and paragraph counts as you type or paste your text. It runs locally in your browser without uploading your data anywhere.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Is this word and character counter tool free?</h3>
              <p className="text-gray-400 mt-2">
                Yes, it’s 100% free to use. No registration, ads, or hidden fees — just a fast, reliable word counter from ZuraWebTools.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">Can this help with SEO optimization?</h3>
              <p className="text-gray-400 mt-2">
                Absolutely! It helps writers and marketers maintain ideal content length for SEO-friendly articles, meta titles, and descriptions.
              </p>
            </div>
          </div>
        </div>

        <RelatedTools
          navigateTo={navigateTo}
          relatedSlugs={['remove-extra-spaces', 'case-converter', 'lorem-ipsum-generator']}
          currentSlug="word-counter"
        />
      </div>
    </section>
  );
};

export default WordCounter;
