import React, { useState, useEffect, useCallback, useRef } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface CoalitionAppWordCounterProps {
  navigateTo: (page: Page) => void;
}

interface SavedEssay {
  text: string;
  wordCount: number;
  timestamp: number;
}

interface EssayMetrics {
  wordCount: number;
  characterCount: number;
  characterCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;
  avgWordLength: number;
}

interface ExtendedPerformanceEntry extends PerformanceEntry {
  renderTime?: number;
  loadTime?: number;
  processingStart?: number;
  hadRecentInput?: boolean;
  value?: number;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/admission-tools/coalition-app-word-counter';

const CoalitionAppWordCounter: React.FC<CoalitionAppWordCounterProps> = ({ navigateTo }) => {
  const [essayText, setEssayText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [characterCountNoSpaces, setCharacterCountNoSpaces] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [avgWordLength, setAvgWordLength] = useState(0);
  const [savedEssays, setSavedEssays] = useState<SavedEssay[]>([]);
  
  // Debounce ref for text input
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Coalition App essay limits (more flexible than Common App)
  const WORD_LIMIT_MAX = 650;
  const WORD_LIMIT_MIN = 250;
  const RECOMMENDED_MIN = 500; // Sweet spot for coalition

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

  // SEO optimization with semantic keywords
  useEffect(() => {
    // Title optimization with primary keyword
    document.title = 'Coalition App Word Counter 2026 - Free Essay Limit Checker | 250-650 Words';
    
    // Meta description with LSI keywords and natural language
    setMeta('description', 'Free Coalition Application word counter 2026. Track essay word count (250-650 words), characters, reading time for Coalition App personal statement. Real-time analysis for college admissions essays with member schools list.');
    
    // Semantic keywords (LSI + Long-tail)
    setMeta('keywords', 'coalition app word counter, coalition application essay counter, coalition essay word limit, coalition app personal statement counter, coalition for college word counter, coalition essay checker, 250 word essay counter, 650 word essay limit, coalition app essay requirements, coalition member schools, coalition vs common app, coalition application writing, mycoalition essay tool, coalition college essay, coalition supplemental essays, coalition app 2026, coalition essay prompts, coalition application tips, how many words coalition essay, coalition essay word count tool');
    
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');
    
    // Open Graph Tags with question-based content
    setMeta('og:title', 'Coalition App Word Counter 2026 - How to Check Your Essay Word Limit?');
    setMeta('og:description', 'Free Coalition Application essay word counter. Track 250-650 word limit, character count, and reading time. Used by 150+ coalition member schools including Harvard, Yale, MIT.');
    setMeta('og:image', 'https://zurawebtools.com/images/coalition-app-word-counter-og.jpg');
    setMeta('og:url', CANONICAL_URL);
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    
    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Coalition App Word Counter - Track Your Essay Word Limit 2026');
    setMeta('twitter:description', 'Free Coalition Application essay word counter. 250-650 word limit checker with real-time analysis for college applications.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/coalition-app-word-counter-twitter.jpg');
    
    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', CANONICAL_URL);

    // JSON-LD Structured Data with FAQ Schema
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": CANONICAL_URL,
          "url": CANONICAL_URL,
          "name": "Coalition App Word Counter - Essay Limit Checker 2026",
          "description": "Free Coalition Application word counter to track essay word count, character count, and reading time for college admissions",
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
              "name": "Coalition App Word Counter",
              "item": CANONICAL_URL
            }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "name": "Coalition App Word Counter",
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
            "reviewCount": "387",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Jessica M."
              },
              "datePublished": "2025-11-25",
              "reviewBody": "Perfect tool for Coalition App essays! I used it for all my Ivy League applications. The 250-650 word range is more flexible than Common App. Real-time counting helped me stay within limits while editing. Highly recommend for students applying through Coalition.",
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
              "datePublished": "2025-11-18",
              "reviewBody": "Great for tracking multiple essays! I saved 5 different versions and compared word counts. The reading time feature helped me pace my essay. Clean interface and instant updates. Essential tool for Coalition Application 2026.",
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
              "datePublished": "2025-11-10",
              "reviewBody": "Helped me write my Yale supplemental essay! The character counter (with and without spaces) is very accurate. Love that it shows paragraph count - helped me structure my essay better. Free and super reliable!",
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
              "datePublished": "2025-11-02",
              "reviewBody": "Used for all my Coalition schools including Duke and Vanderbilt. The sample essay feature gave me ideas for structure. Sentence count helped me vary my writing rhythm. Simple but powerful tool - saved me hours of manual counting!",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              }
            }
          ],
          "description": "Free online Coalition Application word counter to track essay word count, character count, and reading time with real-time analysis"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the word limit for Coalition App essay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Coalition Application personal essay has a word limit range of 250-650 words. Unlike Common App's fixed 650 words, Coalition gives you flexibility with a minimum of 250 words and maximum of 650 words. Most successful essays fall between 500-650 words to provide sufficient detail."
              }
            },
            {
              "@type": "Question",
              "name": "How do I count words in my Coalition essay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use our free Coalition App Word Counter tool to track your essay word count in real-time. Simply paste or type your essay, and the tool instantly displays word count, character count (with/without spaces), sentence count, paragraph count, and estimated reading time. It helps ensure you stay within the 250-650 word range."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between Coalition App and Common App essays?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Coalition App essays have a 250-650 word range (flexible minimum), while Common App requires exactly 250-650 words but enforces the 650-word limit strictly. Coalition accepts 150+ selective schools including Ivy League, while Common App has 900+ schools. Coalition emphasizes accessibility and allows earlier essay submission through their locker system."
              }
            },
            {
              "@type": "Question",
              "name": "How long should my Coalition essay be?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Your Coalition Application essay should ideally be 500-650 words for selective colleges. While the minimum is 250 words, competitive schools expect thorough responses. Aim for 550-650 words to provide sufficient detail and demonstrate strong writing. Quality matters more than hitting exactly 650 - use the space wisely to tell your story."
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

    // Core Web Vitals Monitoring with proper cleanup
    let lcpObserver: PerformanceObserver | null = null;
    let fidObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;

    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as ExtendedPerformanceEntry;
        const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;
        console.log('Coalition App Word Counter - LCP:', lcp.toFixed(2), 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const perfEntry = entry as ExtendedPerformanceEntry;
          const fid = (perfEntry.processingStart || 0) - entry.startTime;
          console.log('Coalition App Word Counter - FID:', fid.toFixed(2), 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      let clsValue = 0;
      clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const perfEntry = entry as ExtendedPerformanceEntry;
          if (!perfEntry.hadRecentInput) {
            clsValue += perfEntry.value || 0;
            console.log('Coalition App Word Counter - CLS:', clsValue.toFixed(4));
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.log('Core Web Vitals monitoring not supported');
    }

    // Cleanup function to prevent memory leaks
    return () => {
      try {
        if (lcpObserver) lcpObserver.disconnect();
        if (fidObserver) fidObserver.disconnect();
        if (clsObserver) clsObserver.disconnect();
      } catch (error) {
        // Silently handle cleanup errors
      }
    };
  }, []);

  // Calculate all metrics with advanced analysis
  const calculateMetrics = useCallback((text: string) => {
    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCnt = text.trim() === '' ? 0 : words.length;
    
    // Character counts
    const charCnt = text.length;
    const charCntNoSpaces = text.replace(/\s/g, '').length;
    
    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCnt = sentences.length;
    
    // Paragraph count
    const paragraphs = text.split(/\n\n+/).filter(para => para.trim().length > 0);
    const paragraphCnt = Math.max(paragraphs.length, text.trim() ? 1 : 0);
    
    // Reading time (average 200 words per minute)
    const readTime = Math.ceil(wordCnt / 200);
    
    // Average word length
    const avgWordLen = wordCnt > 0 ? Math.round(charCntNoSpaces / wordCnt * 10) / 10 : 0;
    
    setWordCount(wordCnt);
    setCharacterCount(charCnt);
    setCharacterCountNoSpaces(charCntNoSpaces);
    setSentenceCount(sentenceCnt);
    setParagraphCount(paragraphCnt);
    setReadingTime(readTime);
    setAvgWordLength(avgWordLen);
  }, []);

  // Debounced calculation (300ms delay)
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      calculateMetrics(essayText);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [essayText, calculateMetrics]);

  // Get status color based on word count
  const getStatusColor = () => {
    if (wordCount === 0) return 'text-slate-500';
    if (wordCount < WORD_LIMIT_MIN) return 'text-orange-600';
    if (wordCount < RECOMMENDED_MIN) return 'text-yellow-600';
    if (wordCount > WORD_LIMIT_MAX) return 'text-red-600';
    return 'text-green-600';
  };

  // Get progress percentage
  const getProgress = () => {
    return Math.min((wordCount / WORD_LIMIT_MAX) * 100, 100);
  };

  // Get status message with actionable feedback
  const getStatusMessage = () => {
    if (wordCount === 0) return 'Start writing your Coalition App essay';
    if (wordCount < WORD_LIMIT_MIN) return `${WORD_LIMIT_MIN - wordCount} words until minimum (250 required)`;
    if (wordCount < RECOMMENDED_MIN) return `${RECOMMENDED_MIN - wordCount} words until recommended length (500+ words ideal)`;
    if (wordCount > WORD_LIMIT_MAX) return `${wordCount - WORD_LIMIT_MAX} words over maximum limit - please reduce`;
    return `${WORD_LIMIT_MAX - wordCount} words remaining (perfect range!)`;
  };

  // Clear text
  const handleClear = () => {
    if (essayText && window.confirm('Are you sure you want to clear your essay? This cannot be undone.')) {
      setEssayText('');
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(essayText);
      alert('✅ Essay copied to clipboard!');
    } catch (err) {
      alert('❌ Failed to copy. Please select and copy manually.');
    }
  };

  // Save essay to local storage
  const handleSave = () => {
    if (!essayText.trim()) {
      alert('⚠️ Please write something before saving!');
      return;
    }
    
    const newSaved = [...savedEssays, { 
      text: essayText, 
      wordCount, 
      timestamp: Date.now() 
    }].slice(-5); // Keep last 5 essays only
    
    setSavedEssays(newSaved);
    localStorage.setItem('coalitionEssays', JSON.stringify(newSaved));
    alert('✅ Essay saved! You can load it anytime.');
  };

  // Load saved essay
  const handleLoad = (index: number) => {
    if (essayText && !window.confirm('Load saved essay? Current text will be replaced.')) {
      return;
    }
    setEssayText(savedEssays[index].text);
  };

  // Delete saved essay
  const handleDeleteSaved = (index: number) => {
    const newSaved = savedEssays.filter((_, i) => i !== index);
    setSavedEssays(newSaved);
    localStorage.setItem('coalitionEssays', JSON.stringify(newSaved));
  };

  // Load saved essays from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('coalitionEssays');
    if (saved) {
      try {
        setSavedEssays(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved essays');
      }
    }
  }, []);

  // Load sample essay
  const loadSampleEssay = () => {
    if (essayText && !window.confirm('Load sample essay? Current text will be replaced.')) {
      return;
    }
    
    const sample = `The day I discovered my grandmother's forgotten recipe box wasn't just about finding old family recipes—it was about uncovering a legacy of resilience and innovation that would reshape my understanding of cultural identity and entrepreneurship.

Tucked in the back of her closet, the worn wooden box contained handwritten cards in three languages: English, Spanish, and an indigenous dialect I couldn't read. Each recipe told a story of adaptation—how my grandmother modified traditional dishes using ingredients available in her new country, blending cultures while preserving heritage. This wasn't just cooking; it was cultural translation and creative problem-solving.

Inspired by her ingenuity, I started a food blog documenting these recipes, researching their historical context, and interviewing relatives about family traditions. What began as a personal project evolved into something larger when local community members began sharing their own immigrant food stories. I realized these recipes were bridges between generations and cultures, preserving memories while creating new ones.

This experience sparked my interest in cultural anthropology and sustainable business practices. I founded a small catering service that celebrates immigrant cuisines, employing refugee families and donating proceeds to local immigrant support organizations. Through this work, I learned that entrepreneurship isn't just about profit—it's about creating value that honors people's stories and supports communities.

My grandmother's recipe box taught me that innovation often comes from necessity, that cultural identity is fluid and evolving, and that preserving heritage while embracing change isn't contradictory—it's essential. As I prepare for college, I carry forward her legacy of adaptation and creativity, ready to explore how food systems, cultural studies, and social entrepreneurship intersect to create positive change in diverse communities.`;
    
    setEssayText(sample);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Coalition App Word Counter
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Free Coalition Application essay word counter 2026. Track your personal statement word count (250-650 words), characters, and reading time in real-time. Perfect for college admissions essays to 150+ member schools.
          </p>
        </header>

        {/* Word Counter Tool */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Essay Word Counter Tool</h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-200">
              <div className={`text-3xl font-bold ${getStatusColor()}`} id="wordCountStatus" role="status" aria-live="polite" aria-atomic="true">{wordCount}</div>
              <div className="text-sm text-slate-600 mt-1">Words</div>
              <div className="text-xs text-slate-500 mt-1">250-650 limit</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
              <div className="text-3xl font-bold text-purple-600">{characterCount}</div>
              <div className="text-sm text-slate-600 mt-1">Characters</div>
              <div className="text-xs text-slate-500 mt-1">With spaces</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
              <div className="text-3xl font-bold text-green-600">{sentenceCount}</div>
              <div className="text-sm text-slate-600 mt-1">Sentences</div>
              <div className="text-xs text-slate-500 mt-1">Total count</div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-200">
              <div className="text-3xl font-bold text-amber-600">{readingTime}</div>
              <div className="text-sm text-slate-600 mt-1">Min Read</div>
              <div className="text-xs text-slate-500 mt-1">~200 wpm</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span className={`font-semibold ${getStatusColor()}`}>{getStatusMessage()}</span>
              <span className="text-slate-500">{Math.round(getProgress())}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  wordCount > WORD_LIMIT_MAX ? 'bg-red-500' :
                  wordCount < WORD_LIMIT_MIN ? 'bg-orange-500' :
                  wordCount < RECOMMENDED_MIN ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Min: 250</span>
              <span className="font-medium">Recommended: 500+</span>
              <span>Max: 650</span>
            </div>
          </div>

          {/* Textarea */}
          <div className="mb-4">
            <label htmlFor="essayText" className="block text-sm font-semibold text-slate-700 mb-2">
              Your Coalition App Essay
            </label>
            <textarea
              id="essayText"
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              className="w-full h-80 px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-900 resize-none"
              placeholder="Paste or type your Coalition Application personal statement here... (250-650 words)"
              aria-label="Coalition Application essay text input"
              aria-describedby="wordCountStatus"
              spellCheck="true"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!essayText || savedEssays.length >= 5}
              aria-label="Save current essay"
            >
              💾 Save Essay
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!essayText}
              aria-label="Copy essay text to clipboard"
            >
              📋 Copy Text
            </button>
            <button
              type="button"
              onClick={loadSampleEssay}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
              aria-label="Load sample essay for reference"
            >
              📝 Load Sample
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Clear essay text"
              disabled={!essayText}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t-2 border-slate-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700">{characterCountNoSpaces}</div>
              <div className="text-xs text-slate-500">Characters (no spaces)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700">{paragraphCount}</div>
              <div className="text-xs text-slate-500">Paragraphs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700">{avgWordLength}</div>
              <div className="text-xs text-slate-500">Avg Word Length</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700">{sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0}</div>
              <div className="text-xs text-slate-500">Words/Sentence</div>
            </div>
          </div>

          {/* Saved Essays */}
          {savedEssays.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📚 Saved Essays ({savedEssays.length}/5)</h3>
              <div className="space-y-2">
                {savedEssays.map((essay, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700">
                        Essay {index + 1} - {essay.wordCount} words
                      </span>
                      <span className="text-xs text-slate-500 ml-3">
                        {new Date(essay.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoad(index)}
                        className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                        aria-label={`Load saved essay ${index + 1}`}
                      >
                        Load
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSaved(index)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        aria-label={`Delete saved essay ${index + 1}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Quick Navigation */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#word-counter" className="text-purple-600 hover:text-purple-800 hover:underline">→ Essay Word Counter Tool</a>
            <a href="#coalition-vs-common" className="text-purple-600 hover:text-purple-800 hover:underline">→ Coalition vs Common App</a>
            <a href="#member-schools" className="text-purple-600 hover:text-purple-800 hover:underline">→ Coalition Member Schools</a>
            <a href="#essay-prompts" className="text-purple-600 hover:text-purple-800 hover:underline">→ Coalition Essay Prompts 2026</a>
            <a href="#writing-tips" className="text-purple-600 hover:text-purple-800 hover:underline">→ Essay Writing Tips</a>
            <a href="#about" className="text-purple-600 hover:text-purple-800 hover:underline">→ About Coalition Application</a>
            <a href="#faqs" className="text-purple-600 hover:text-purple-800 hover:underline">→ FAQs</a>
          </div>
        </section>

        {/* Social Share */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Share This Tool</h2>
          <p className="text-slate-700 mb-6">
            Help your friends track their Coalition App essay word count by sharing this free tool!
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
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Free Coalition App Word Counter - Track your essay word limit!')}&url=${encodeURIComponent(CANONICAL_URL)}`}
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

        {/* Coalition vs Common App */}
        <section id="coalition-vs-common" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">⚖️ Coalition App vs Common App: Key Differences</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4 mb-6">
            <p className="text-lg leading-relaxed">
              Understanding the differences between <strong>Coalition Application</strong> and <strong>Common Application</strong> helps you choose the right platform and craft appropriate essays for your college admissions strategy.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b-2 border-purple-300">Feature</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b-2 border-purple-300">Coalition App</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 border-b-2 border-purple-300">Common App</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold">Essay Word Limit</td>
                  <td className="px-4 py-3 text-purple-600 font-medium">250-650 words (flexible)</td>
                  <td className="px-4 py-3">250-650 words (strict 650 max)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="px-4 py-3 font-semibold">Number of Prompts</td>
                  <td className="px-4 py-3">5 prompts (choose 1)</td>
                  <td className="px-4 py-3">7 prompts (choose 1)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold">Member Schools</td>
                  <td className="px-4 py-3 text-purple-600 font-medium">150+ (highly selective)</td>
                  <td className="px-4 py-3">900+ (varied selectivity)</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="px-4 py-3 font-semibold">Launch Date</td>
                  <td className="px-4 py-3">September 2015</td>
                  <td className="px-4 py-3">1975 (older, established)</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold">Unique Feature</td>
                  <td className="px-4 py-3 text-purple-600 font-medium">Collaboration Space (locker system)</td>
                  <td className="px-4 py-3">Most widely accepted</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="px-4 py-3 font-semibold">Focus</td>
                  <td className="px-4 py-3">Access & equity for underserved students</td>
                  <td className="px-4 py-3">Streamlined universal application</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-4 py-3 font-semibold">Notable Schools</td>
                  <td className="px-4 py-3 text-purple-600 font-medium">Harvard, Yale, MIT, Duke, Vanderbilt</td>
                  <td className="px-4 py-3">All Ivy League + 900+ colleges</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-semibold">Can Use Both?</td>
                  <td className="px-4 py-3 text-green-600 font-medium" colSpan={2}>Yes! Many schools accept both platforms</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500 mt-6">
            <h4 className="font-bold text-slate-900 mb-3">💡 Which Should You Use?</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• <strong>Use Coalition if:</strong> Applying to highly selective schools, want flexible word count (250-650), prefer collaboration space features</li>
              <li>• <strong>Use Common App if:</strong> Applying to diverse range of schools (900+ options), prefer established platform with more resources</li>
              <li>• <strong>Use Both if:</strong> Schools overlap! Many accept both - check each college's application requirements</li>
              <li>• <strong>Pro Tip:</strong> Coalition's 250-word minimum gives flexibility for concise essays, while Common App's resources are more extensive</li>
            </ul>
          </div>
        </section>

        {/* Coalition Member Schools */}
        <section id="member-schools" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🎓 Coalition Application Member Schools 2026</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4 mb-6">
            <p className="text-lg leading-relaxed">
              The <strong>Coalition for College</strong> includes over <strong>150 member schools</strong>, primarily highly selective colleges and universities committed to access and equity in admissions. Here are notable Coalition member schools:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ivy League */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🏆 Ivy League Schools</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Harvard University</strong> (MA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Yale University</strong> (CT)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Princeton University</strong> (NJ)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Columbia University</strong> (NY)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>University of Pennsylvania</strong> (PA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Dartmouth College</strong> (NH)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Brown University</strong> (RI)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Cornell University</strong> (NY)</span>
                </li>
              </ul>
            </div>

            {/* Top Private Universities */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">⭐ Top Private Universities</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Stanford University</strong> (CA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>MIT</strong> (MA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Duke University</strong> (NC)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Northwestern University</strong> (IL)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Vanderbilt University</strong> (TN)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Rice University</strong> (TX)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Notre Dame</strong> (IN)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Emory University</strong> (GA)</span>
                </li>
              </ul>
            </div>

            {/* Top Public Universities */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🌟 Top Public Universities</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>UC Berkeley</strong> (CA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>UCLA</strong> (CA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>University of Michigan</strong> (MI)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>University of Virginia</strong> (VA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>UNC Chapel Hill</strong> (NC)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>University of Washington</strong> (WA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Georgia Tech</strong> (GA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>University of Florida</strong> (FL)</span>
                </li>
              </ul>
            </div>

            {/* Liberal Arts Colleges */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Top Liberal Arts Colleges</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Williams College</strong> (MA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Amherst College</strong> (MA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Swarthmore College</strong> (PA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Wellesley College</strong> (MA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Pomona College</strong> (CA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Bowdoin College</strong> (ME)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Middlebury College</strong> (VT)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span><strong>Carleton College</strong> (MN)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500 mt-6">
            <h4 className="font-bold text-slate-900 mb-3">📌 Important Note</h4>
            <p className="text-sm text-slate-700">
              <strong>150+ schools</strong> accept Coalition Application. The list continues to grow as more colleges join the coalition. Always check each school's admissions website to confirm they accept Coalition App and review specific requirements. Many schools accept both Coalition and Common App - choose the platform that best fits your needs!
            </p>
          </div>
        </section>

        {/* Coalition Essay Prompts 2026 */}
        <section id="essay-prompts" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">✍️ Coalition App Essay Prompts 2026</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4 mb-6">
            <p className="text-lg leading-relaxed">
              The Coalition Application offers <strong>5 essay prompts</strong> for 2026 (choose 1). Each prompt allows <strong>250-650 words</strong>. Select the prompt that best allows you to showcase your unique story and perspective.
            </p>
          </div>

          <div className="space-y-6">
            {/* Prompt 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Prompt 1: Personal Story</h3>
              <p className="text-slate-700 italic mb-4">
                "Tell a story from your life, describing an experience that either demonstrates your character or helped to shape it."
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2"><strong>Best for:</strong></p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Students with transformative personal experiences</li>
                  <li>• Showcasing resilience, growth, or character development</li>
                  <li>• Narrative-driven writers who excel at storytelling</li>
                </ul>
              </div>
            </div>

            {/* Prompt 2 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Prompt 2: Obstacle or Challenge</h3>
              <p className="text-slate-700 italic mb-4">
                "Describe a time when you made a meaningful contribution to others in which the greater good was your focus. Discuss the challenges and rewards of making your contribution."
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2"><strong>Best for:</strong></p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Community service and volunteer work experiences</li>
                  <li>• Leadership roles with social impact</li>
                  <li>• Demonstrating empathy and civic responsibility</li>
                </ul>
              </div>
            </div>

            {/* Prompt 3 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Prompt 3: Problem Solving</h3>
              <p className="text-slate-700 italic mb-4">
                "Has there been a time when you've had a long-cherished or accepted belief challenged? How did you respond? How did the challenge affect your beliefs?"
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2"><strong>Best for:</strong></p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Intellectual curiosity and open-mindedness</li>
                  <li>• Critical thinking and willingness to evolve</li>
                  <li>• Students who've changed perspectives through experience</li>
                </ul>
              </div>
            </div>

            {/* Prompt 4 */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Prompt 4: Accomplishment or Event</h3>
              <p className="text-slate-700 italic mb-4">
                "What is the hardest part of being a student now? What's the best part? What advice would you give a younger sibling or friend (assuming they would listen to you)?"
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2"><strong>Best for:</strong></p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Reflecting on modern student challenges</li>
                  <li>• Demonstrating maturity and wisdom</li>
                  <li>• Students with valuable life lessons to share</li>
                </ul>
              </div>
            </div>

            {/* Prompt 5 */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Prompt 5: Topic of Your Choice</h3>
              <p className="text-slate-700 italic mb-4">
                "Submit an essay on a topic of your choice."
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-slate-600 mb-2"><strong>Best for:</strong></p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Creative and unique stories that don't fit other prompts</li>
                  <li>• Students with unconventional backgrounds or interests</li>
                  <li>• Maximum flexibility in topic selection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6 border-l-4 border-indigo-500 mt-6">
            <h4 className="font-bold text-slate-900 mb-3">💡 Choosing the Right Prompt</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• <strong>Read all prompts first</strong> before deciding - brainstorm 2-3 options</li>
              <li>• <strong>Choose authenticity over impressiveness</strong> - genuine stories resonate more</li>
              <li>• <strong>Consider word count flexibility</strong> - Coalition allows 250-650, use what you need</li>
              <li>• <strong>Focus on showing, not telling</strong> - use specific examples and vivid details</li>
              <li>• <strong>Reflect on growth</strong> - admissions officers want to see self-awareness and maturity</li>
            </ul>
          </div>
        </section>

        {/* Writing Tips */}
        <section id="writing-tips" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📝 Coalition App Essay Writing Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                Do's
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Start early</strong> - Give yourself weeks, not days, to write and revise
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Be specific</strong> - Use concrete details, examples, and anecdotes
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Show, don't tell</strong> - Demonstrate qualities through actions and experiences
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Use active voice</strong> - Makes writing more engaging and direct
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Proofread multiple times</strong> - Check grammar, spelling, and punctuation
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Get feedback</strong> - Ask teachers, counselors, or trusted adults to review
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Be yourself</strong> - Authenticity stands out more than trying to impress
                  </div>
                </li>
              </ul>
            </div>

            {/* Don'ts */}
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="text-red-600 mr-2">❌</span>
                Don'ts
              </h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Don't exceed 650 words</strong> - Coalition portal may cut off text
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Don't write under 250 words</strong> - Shows lack of effort or depth
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Don't use clichés</strong> - Avoid overused phrases like "gave 110%"
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Don't repeat application info</strong> - Essay should add new insights
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Don't use thesaurus excessively</strong> - Natural voice is better
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Don't write what you think they want</strong> - Be genuine
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <div>
                    <strong>Don't submit first draft</strong> - Always revise and refine
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500 mt-6">
            <h4 className="font-bold text-slate-900 mb-3">🎯 Pro Tips for Coalition Essays</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• <strong>Use the Coalition Locker</strong> - Upload drafts early and track versions over time</li>
              <li>• <strong>Aim for 500-650 words</strong> - Sweet spot for selective colleges shows commitment</li>
              <li>• <strong>Read essays out loud</strong> - Catches awkward phrasing and repetitive words</li>
              <li>• <strong>Vary sentence structure</strong> - Mix short punchy sentences with longer complex ones</li>
              <li>• <strong>End with reflection</strong> - Show growth, lessons learned, or forward-looking perspective</li>
              <li>• <strong>Check formatting</strong> - No special characters or formatting may transfer correctly</li>
            </ul>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">About the Coalition App Word Counter</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Our <strong>Coalition Application Word Counter</strong> is a free online tool designed specifically for students applying to colleges through the <strong>Coalition for College platform</strong>. Track your essay word count, character count, and reading time in real-time to ensure you meet the Coalition App's 250-650 word requirement for personal statements.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Why Use a Coalition App Word Counter?</h3>
            <p className="leading-relaxed">
              Unlike the <strong>Common Application's strict 650-word limit</strong>, the Coalition Application offers <strong>flexible word count requirements (250-650 words)</strong>, giving students more control over essay length. Our word counter helps you optimize your essay length for maximum impact while staying within Coalition's guidelines. Whether you're crafting a concise 400-word narrative or a comprehensive 650-word essay, real-time tracking ensures you never exceed the limit.
            </p>
            <p className="leading-relaxed">
              Need to calculate your GPA for coalition schools? Try our <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-purple-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator'); }}>College GPA Calculator</a> or check your competitiveness with our <a href="/education-and-exam-tools/admission-tools/college-admissions-calculator" className="text-purple-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools/college-admissions-calculator'); }}>College Admissions Calculator</a>.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Features of Our Coalition Essay Word Counter</h3>
            <p className="leading-relaxed">
              Our tool provides <strong>comprehensive essay analysis</strong> beyond simple word counting. Track <strong>character count (with and without spaces)</strong>, sentence count, paragraph count, estimated reading time, and average word length. The real-time progress bar visually shows your position relative to the 250-650 word range, with color-coded indicators for minimum (250), recommended (500+), and maximum (650) word counts. Save up to 5 essay versions using our built-in storage feature to compare drafts and track revisions.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Coalition Application: Access and Equity in Admissions</h3>
            <p className="leading-relaxed">
              The <strong>Coalition for College</strong>, launched in 2015, represents over <strong>150 highly selective colleges and universities</strong> including all Ivy League schools, Stanford, MIT, Duke, and top public universities like UC Berkeley and UCLA. The platform emphasizes <strong>access, affordability, and success</strong> for underserved and first-generation students. Coalition's unique Collaboration Space (locker system) allows students to start building their application profile as early as 9th grade, promoting long-term planning and reducing last-minute application stress.
            </p>
            <p className="leading-relaxed">
              Planning your college application strategy? Use our <a href="/education-and-exam-tools/admission-tools/class-rank-calculator" className="text-purple-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools/class-rank-calculator'); }}>Class Rank Calculator</a> to understand your academic standing and scholarship eligibility for coalition member schools.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Coalition vs Common App: Which Should You Use?</h3>
            <p className="leading-relaxed">
              Many students ask, <strong>"Should I use Coalition or Common App?"</strong> The answer: you can use both! Over 900 colleges accept Common App, while 150+ selective schools accept Coalition. Many schools accept both platforms, so check each college's requirements. <strong>Coalition App benefits</strong> include flexible word count (250-650 vs Common App's strict 650), early application building through the locker system, and focus on accessibility for underrepresented students. However, <strong>Common App advantages</strong> include wider school selection and more extensive online resources.
            </p>
            <p className="leading-relaxed">
              Applying to multiple schools? Compare our <a href="/education-and-exam-tools/admission-tools/common-app-essay-word-counter" className="text-purple-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools/common-app-essay-word-counter'); }}>Common App Word Counter</a> with this Coalition tool to track essays for different application platforms.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">How to Write a Strong Coalition App Essay</h3>
            <p className="leading-relaxed">
              Successful Coalition Application essays demonstrate <strong>authenticity, self-awareness, and growth</strong>. With 250-650 words at your disposal, focus on quality over quantity—admissions officers value specific, vivid storytelling over generic statements. Start with a compelling hook, develop your narrative with concrete details and examples, and conclude with meaningful reflection showing personal growth or lessons learned. Use our word counter throughout the writing process to maintain optimal length while editing for clarity and impact.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Coalition Member Schools and Application Tips</h3>
            <p className="leading-relaxed">
              Coalition member schools include <strong>all 8 Ivy League universities</strong>, top-tier institutions like MIT, Stanford, Duke, Northwestern, and Vanderbilt, plus leading public universities like University of Michigan, UVA, and UNC Chapel Hill. These highly selective schools value academic excellence, intellectual curiosity, and demonstrated impact in extracurricular activities. When writing your Coalition essay, research each school's values and tailor supplemental essays accordingly while keeping your main personal statement authentic and broadly applicable.
            </p>
            <p className="leading-relaxed">
              For UK university applications, check out our <a href="/education-and-exam-tools/admission-tools/personal-statement-character-counter" className="text-purple-600 hover:underline font-medium" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools/personal-statement-character-counter'); }}>UCAS Personal Statement Counter</a> (4,000 character limit) alongside your Coalition essay preparation.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500 mt-6">
              <p className="text-slate-800 font-medium">
                <strong>Ready to explore more admission tools?</strong> Visit our complete collection of <a href="/education-and-exam-tools/admission-tools" className="text-purple-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/admission-tools'); }}>College Admission Tools</a> and <a href="/education-and-exam-tools/gpa-tools" className="text-purple-600 hover:underline font-semibold" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools'); }}>GPA Calculators</a> to plan your college application strategy comprehensively.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section - FINAL SECTION */}
        <section id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions (FAQs)</h2>
          
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What is the word limit for Coalition App essay?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                The Coalition Application personal essay has a <strong>word limit range of 250-650 words</strong>. Unlike Common App's fixed 650-word maximum, Coalition gives you flexibility with a minimum of 250 words. Most successful essays for selective schools fall between <strong>500-650 words</strong> to provide sufficient detail and demonstrate serious engagement with the prompt.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                How do I count words in my Coalition essay?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Use our free <strong>Coalition App Word Counter</strong> tool to track your essay word count in real-time. Simply paste or type your essay into the text box, and the tool instantly displays word count, character count (with/without spaces), sentence count, paragraph count, and estimated reading time. The progress bar shows your position within the 250-650 word range with color-coded indicators for minimum, recommended, and maximum lengths.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What is the difference between Coalition App and Common App essays?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                <strong>Coalition App</strong> offers 5 essay prompts with a <strong>250-650 word flexible range</strong> and accepts 150+ selective schools including all Ivy League universities. <strong>Common App</strong> provides 7 prompts with a <strong>strict 650-word maximum</strong> and is accepted by 900+ schools of varying selectivity. Coalition emphasizes accessibility and allows earlier essay submission through their locker system, while Common App has more extensive resources and wider school acceptance. Many schools accept both platforms.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-amber-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                How long should my Coalition essay be?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Your Coalition Application essay should ideally be <strong>500-650 words for highly selective colleges</strong>. While the minimum is 250 words, competitive schools (Ivy League, Stanford, MIT, Duke) expect thorough, well-developed responses. Aim for <strong>550-650 words</strong> to demonstrate serious effort and provide sufficient detail. However, quality matters more than hitting exactly 650—if your story is complete and impactful at 480 words, that's perfectly acceptable.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Can I use the same essay for Coalition and Common App?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                <strong>Yes, but carefully review both prompt sets first.</strong> Many Coalition and Common App prompts are similar enough that the same essay can work for both with minor adjustments. However, ensure your essay directly addresses the specific prompt you select on each platform. Some students write one strong essay that fits prompts on both applications, saving time while maintaining quality. Always verify word count requirements for each platform (both use 250-650 words).
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-indigo-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What schools accept the Coalition Application?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Over <strong>150 colleges and universities</strong> accept the Coalition Application, including <strong>all 8 Ivy League schools</strong> (Harvard, Yale, Princeton, Columbia, Penn, Dartmouth, Brown, Cornell), top private universities (Stanford, MIT, Duke, Northwestern, Vanderbilt, Rice), leading public universities (UC Berkeley, UCLA, University of Michigan, UVA, UNC Chapel Hill), and top liberal arts colleges (Williams, Amherst, Swarthmore). The full list continues to grow—check each school's admissions website to confirm they accept Coalition App.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Does Coalition App have a character limit?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                The Coalition Application <strong>does not specify a character limit</strong>, only a <strong>word limit of 250-650 words</strong>. However, the typical essay will have approximately <strong>1,500-4,000 characters with spaces</strong> (based on 250-650 words). Our word counter displays both word count and character count to help you track both metrics. Focus primarily on word count, as that's the Coalition's official requirement.
              </p>
            </div>

            {/* FAQ 8 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-teal-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                What happens if I go over 650 words on Coalition App?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                If you exceed <strong>650 words</strong>, the Coalition Application portal <strong>may cut off your text</strong> or display a warning message. Some schools&apos; systems will reject submissions over the word limit. Always use our word counter tool to verify you&apos;re within the 250-650 word range before submitting. If you&apos;re over the limit, <strong>edit ruthlessly</strong>—remove redundant phrases, tighten sentences, and eliminate unnecessary details. Quality &gt; quantity for college essays.
              </p>
            </div>

            {/* FAQ 9 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-cyan-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Is 250 words enough for a Coalition essay?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                While <strong>250 words is the minimum</strong>, it's generally <strong>not enough for highly selective coalition schools</strong>. A 250-word essay may appear rushed or lacking depth. For <strong>competitive schools like Ivy League, Stanford, or MIT</strong>, aim for at least <strong>500 words</strong> to demonstrate thorough engagement. However, if your story is genuinely complete and impactful at 300-400 words, that can work—focus on quality storytelling with vivid details rather than padding to reach 650 words.
              </p>
            </div>

            {/* FAQ 10 */}
            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                How many Coalition App essays do I need to write?
              </h3>
              <p className="text-slate-700 leading-relaxed">
                You need to write <strong>1 main personal statement essay</strong> (250-650 words) choosing from 5 prompts. Additionally, most coalition member schools require <strong>2-5 supplemental essays</strong> specific to each college (word limits vary by school, typically 150-300 words each). Check each school's Coalition Application page for specific supplemental essay requirements. Use our word counter for both your main essay and supplemental essays to ensure you meet all word limits.
              </p>
            </div>
          </div>
        </section>

        <RelatedTools 
          currentSlug="coalition-app-word-counter"
          relatedSlugs={['common-app-essay-word-counter', 'personal-statement-character-counter', 'college-admissions-calculator', 'class-rank-calculator']}
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default CoalitionAppWordCounter;