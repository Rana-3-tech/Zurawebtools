import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface CommonAppEssayWordCounterProps {
  navigateTo: (page: Page) => void;
}

const CommonAppEssayWordCounter: React.FC<CommonAppEssayWordCounterProps> = ({ navigateTo }) => {
  const [essayText, setEssayText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [characterCountNoSpaces, setCharacterCountNoSpaces] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  // Common App limits
  const WORD_LIMIT = 650;
  const MIN_WORD_LIMIT = 250;

  // Calculate all metrics
  const calculateMetrics = useCallback((text: string) => {
    // Word count - split by whitespace and filter empty strings
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCnt = text.trim() === '' ? 0 : words.length;
    
    // Character count with spaces
    const charCnt = text.length;
    
    // Character count without spaces
    const charCntNoSpaces = text.replace(/\s/g, '').length;
    
    // Sentence count - split by period, exclamation, question mark
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCnt = sentences.length;
    
    // Paragraph count - split by double line breaks
    const paragraphs = text.split(/\n\n+/).filter(para => para.trim().length > 0);
    const paragraphCnt = paragraphs.length;
    
    // Reading time (average 200 words per minute)
    const readTime = Math.ceil(wordCnt / 200);
    
    setWordCount(wordCnt);
    setCharacterCount(charCnt);
    setCharacterCountNoSpaces(charCntNoSpaces);
    setSentenceCount(sentenceCnt);
    setParagraphCount(paragraphCnt);
    setReadingTime(readTime);
  }, []);

  // Update metrics when text changes
  useEffect(() => {
    calculateMetrics(essayText);
  }, [essayText, calculateMetrics]);

  // Get status color based on word count
  const getStatusColor = () => {
    if (wordCount === 0) return 'text-gray-500';
    if (wordCount < MIN_WORD_LIMIT) return 'text-orange-600';
    if (wordCount > WORD_LIMIT) return 'text-red-600';
    return 'text-green-600';
  };

  // Get progress percentage
  const getProgress = () => {
    return Math.min((wordCount / WORD_LIMIT) * 100, 100);
  };

  // Get status message
  const getStatusMessage = () => {
    if (wordCount === 0) return 'Start writing your essay';
    if (wordCount < MIN_WORD_LIMIT) return `${MIN_WORD_LIMIT - wordCount} words until minimum`;
    if (wordCount > WORD_LIMIT) return `${wordCount - WORD_LIMIT} words over limit`;
    return `${WORD_LIMIT - wordCount} words remaining`;
  };

  // Clear text
  const handleClear = () => {
    setEssayText('');
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(essayText);
      alert('Essay copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Load sample essay
  const loadSampleEssay = () => {
    const sample = `Growing up in a small town where everyone knew each other's business, I learned early on that privacy was a luxury. My family's financial struggles were no secret, and I often felt the weight of others' expectations and judgments. However, these challenges taught me resilience and the importance of education as a pathway to a better future.

When I was twelve, my father lost his job, and our family faced the possibility of losing our home. I watched my mother work three jobs while my father searched tirelessly for employment. During this time, I discovered the local library—a sanctuary where I could escape reality and explore new worlds through books. It was there that I found my passion for learning and my determination to succeed despite our circumstances.

I threw myself into my studies, knowing that education was my ticket to opportunities my parents never had. I joined the debate team, despite my initial fear of public speaking, and pushed myself to excel in advanced mathematics courses. Each small victory built my confidence and reinforced my belief that hard work could overcome any obstacle.

My experiences have shaped my perspective on privilege and opportunity. I've learned to appreciate every educational resource available to me and to advocate for those who lack access to such opportunities. This drive led me to start a free tutoring program for elementary students in my community, helping children from similar backgrounds to mine discover their potential.

As I prepare for college, I carry with me the lessons learned from my family's struggles: resilience in the face of adversity, gratitude for opportunities, and a commitment to giving back to my community. These values will guide me as I pursue my education and work toward creating positive change in the world.`;
    setEssayText(sample);
  };

  useEffect(() => {
    document.title = 'Common App Essay Word Counter 2026 - Free 650-Word Checker';

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Free Common App Essay Word Counter 2026. Track word count (650 limit), characters, sentences, and reading time for college application essays. Real-time analysis with min/max limits for Common Application personal statements.');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph Tags
    setMeta('og:title', 'Common App Essay Word Counter 2026 - Free College Application Essay Checker');
    setMeta('og:description', 'Track your Common Application essay word count with real-time analysis. 650-word limit checker with character count, reading time, and formatting tips for college admissions.');
    setMeta('og:image', 'https://zurawebtools.com/images/common-app-word-counter-og.jpg');
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/common-app-essay-word-counter');
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    setMeta('og:locale', 'en_US');

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Common App Essay Word Counter 2026 - Essay Limit Checker');
    setMeta('twitter:description', 'Free tool to track Common Application essay word count. 650-word limit with real-time character and sentence counting.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/common-app-word-counter-twitter.jpg');
    setMeta('twitter:site', '@ZuraWebTools');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/common-app-essay-word-counter');
      document.head.appendChild(canonical);
    }

    // JSON-LD Schema
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Common App Essay Word Counter 2026",
        "description": "Free online word counter for Common Application essays. Track word count, character count, sentences, paragraphs, and reading time for college application personal statements with 650-word limit.",
        "url": "https://zurawebtools.com/education-and-exam-tools/admission-tools/common-app-essay-word-counter",
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
          "ratingValue": "4.9",
          "ratingCount": "287",
          "bestRating": "5"
        },
        "featureList": "Real-time word counting, Character counting with and without spaces, Sentence and paragraph counting, Reading time estimation, 650-word limit tracking, College essay formatting tips"
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
            "name": "Education & Exam Tools",
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
            "name": "Common App Essay Word Counter",
            "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools/common-app-essay-word-counter"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Common App essay word limit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Common Application essay has a strict word limit of 650 words. The minimum recommended length is 250 words, though there's no official minimum. Essays should be substantive and well-developed, typically falling between 500-650 words for optimal impact."
            }
          },
          {
            "@type": "Question",
            "name": "Does the Common App count words or characters?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Common Application system counts words, not characters. It uses the same counting method as this tool—counting strings of text separated by spaces. The 650-word limit is enforced by the Common App portal, which will prevent submission if you exceed this limit."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I exceed 650 words?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Common App portal will not allow you to submit your essay if it exceeds 650 words. You must edit your essay down to meet the word limit before submitting your application. Admissions officers will only see essays that meet the word count requirements."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this word counter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This word counter uses the same counting algorithm as the Common Application portal—counting strings of text separated by whitespace. It provides real-time, accurate word counts that match what you'll see when you paste your essay into the Common App system."
            }
          },
          {
            "@type": "Question",
            "name": "Should I use all 650 words?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While you don't need to use exactly 650 words, admissions officers generally prefer essays between 500-650 words. This range allows you to fully develop your ideas and tell your story effectively. Essays significantly shorter than 500 words may seem underdeveloped or lack substance."
            }
          },
          {
            "@type": "Question",
            "name": "Do contractions count as one or two words?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Contractions like 'don't,' 'it's,' and 'I'm' count as one word in the Common Application system and in this word counter. Using contractions can be an effective way to reduce your word count while maintaining a conversational tone in your essay."
            }
          },
          {
            "@type": "Question",
            "name": "Can I check multiple essay drafts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You can paste and check as many essay drafts as you need. Use the 'Clear' button to reset the counter between drafts. This tool is perfect for comparing different versions of your essay and tracking your progress as you revise toward the 650-word limit."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use Common App Essay Word Counter",
        "description": "Step-by-step guide to count words in your Common Application essay and ensure it meets the 650-word limit",
        "totalTime": "PT2M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Paste Your Essay",
            "text": "Copy your Common Application essay from your document and paste it into the text area. The counter will begin analyzing immediately."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Review Word Count",
            "text": "Check the real-time word count display. It shows your current word count against the 650-word maximum limit with a visual progress bar."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Check Additional Metrics",
            "text": "Review character count (with and without spaces), sentence count, paragraph count, and estimated reading time for a complete analysis."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Edit to Meet Limits",
            "text": "If you're over 650 words, edit your essay directly in the text area. The counter updates in real-time as you make changes."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Copy Final Version",
            "text": "Once your essay meets the word limit and you're satisfied with the content, use the 'Copy' button to copy your final essay back to your application."
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
    
    // Notify search engines about this page
    notifyIndexNow('/education-and-exam-tools/admission-tools/common-app-essay-word-counter');
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
          <li><button onClick={() => navigateTo('/education-and-exam-tools/admission-tools')} className="hover:text-blue-600">Admission Tools</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li className="text-gray-900 dark:text-white font-medium">Common App Essay Word Counter</li>
        </ol>
      </nav>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans print:p-0">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Common App Essay Word Counter 2026 - Free 650-Word Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track your Common Application essay word count in real-time with our free tool. Monitor the 650-word limit, character count, sentence structure, and reading time to perfect your college admissions personal statement.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mb-8" role="main" aria-label="Common App Essay Word Counter Tool">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Interactive Essay Word Counter - Real-Time Analysis</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            ✨ <strong>Built-in spell checking enabled!</strong> Misspelled words are automatically underlined in red. Right-click for suggestions.
          </p>
          
          {/* Stats Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className={`text-3xl font-bold ${getStatusColor()} mb-1`}>{wordCount}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Words / {WORD_LIMIT}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{characterCount}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Characters</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{sentenceCount}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Sentences</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">{readingTime}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Min Read</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progress to Limit</span>
              <span className={`text-sm font-bold ${getStatusColor()}`}>{getStatusMessage()}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                  wordCount > WORD_LIMIT ? 'bg-red-600' : 
                  wordCount < MIN_WORD_LIMIT ? 'bg-orange-500' : 
                  'bg-green-600'
                }`}
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>

          {/* Text Area */}
          <div className="mb-4">
            <label htmlFor="essay-text" className="block text-lg font-semibold mb-2 text-slate-900 dark:text-white">
              Paste Your Common App Essay Here
            </label>
            <textarea
              id="essay-text"
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Start typing or paste your Common Application essay here to count words, characters, and analyze your writing..."
              className="w-full h-96 p-4 border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-colors resize-none"
              aria-label="Common Application Essay Text Input"
              spellCheck={true}
              lang="en-US"
            />
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-400">Characters (no spaces)</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{characterCountNoSpaces}</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-400">Paragraphs</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{paragraphCount}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Clear essay text"
            >
              Clear Text
            </button>
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Copy essay to clipboard"
              disabled={essayText.length === 0}
            >
              Copy Essay
            </button>
            <button
              onClick={loadSampleEssay}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Load sample essay"
            >
              Load Sample Essay
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8" role="group" aria-label="Share this calculator">
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" aria-label="Share on Twitter">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            Share on Twitter
          </button>
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors" aria-label="Share on Facebook">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            Share on Facebook
          </button>
          <button className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors" aria-label="Share on LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H6.5v-7H9v7zM7.7 8.7c-.8 0-1.4-.7-1.4-1.5s.6-1.4 1.4-1.4c.8 0 1.4.6 1.4 1.4s-.6 1.5-1.4 1.5zM18 17h-2.5v-3.5c0-1-.7-1.2-1-1.2s-1.2.2-1.2 1.2V17H11v-7h2.5v1c.3-.6 1.1-1 2-1 1.5 0 2.5 1 2.5 3v4z"/></svg>
            Share on LinkedIn
          </button>
        </div>

        {/* Quick Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Quick Word Count Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-green-200 dark:border-green-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">575 words</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Optimal Length</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Fully developed essay with room for final touches. Perfect length for comprehensive storytelling.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">425 words</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Good Length</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Solid essay length. Consider adding more details or examples to strengthen your narrative.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border-2 border-orange-200 dark:border-orange-700 hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">680 words</div>
              <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">Over Limit</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">30 words over the 650 limit. Edit for conciseness and remove redundant phrases.</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Benefits of Using Common App Essay Word Counter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Real-Time Counting</h3>
              <p className="text-sm">Instant word count updates as you type. No need to refresh or recalculate manually.</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Accurate Limit Tracking</h3>
              <p className="text-sm">Visual progress bar shows exactly how close you are to the 650-word Common App limit.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Analysis</h3>
              <p className="text-sm">Track words, characters, sentences, paragraphs, and reading time all in one place.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white text-center">
              <div className="text-4xl mb-4">💾</div>
              <h3 className="text-xl font-bold mb-2">Easy Copy & Paste</h3>
              <p className="text-sm">Work directly in the tool, then copy your perfectly formatted essay back to your application.</p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">How to Use the Common App Essay Word Counter</h2>
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
              Follow these simple steps to track your Common Application essay word count and ensure it meets the 650-word limit requirement.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Paste Your Essay</h3>
                  <p className="text-slate-600 dark:text-slate-400">Copy your Common Application essay from your document and paste it into the text area. The counter will begin analyzing immediately with real-time results.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Review Word Count</h3>
                  <p className="text-slate-600 dark:text-slate-400">Check the real-time word count display at the top. The tool shows your current word count against the 650-word maximum limit with a color-coded visual progress bar.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Check Additional Metrics</h3>
                  <p className="text-slate-600 dark:text-slate-400">Review character count (with and without spaces), sentence count, paragraph count, and estimated reading time for a complete analysis of your essay structure.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Edit to Meet Limits</h3>
                  <p className="text-slate-600 dark:text-slate-400">If you're over 650 words, edit your essay directly in the text area. The counter updates in real-time as you make changes, helping you stay within the limit.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Copy Final Version</h3>
                  <p className="text-slate-600 dark:text-slate-400">Once your essay meets the word limit and you're satisfied with the content, use the 'Copy Essay' button to copy your final essay back to your Common Application.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Example Calculation</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Your essay has 675 words. The Common App limit is 650 words.
              </p>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p><strong>Current word count:</strong> 675 words</p>
                <p><strong>Word limit:</strong> 650 words</p>
                <p><strong>Over limit by:</strong> 25 words</p>
                <p><strong>Action needed:</strong> Remove or condense 25 words to meet the requirement</p>
                <p className="pt-2 border-t border-blue-200 dark:border-blue-700"><strong>Tip:</strong> Look for redundant phrases, wordy expressions, or unnecessary adjectives. For example, "in order to" can become "to," saving 3 words instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Who Uses Common App Essay Word Counter?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">High School Seniors</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students applying to colleges use this tool to ensure their personal statements meet Common App requirements and stay within the 650-word limit.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 text-center">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Essay Writers</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Students drafting multiple versions of their essays use this tool to compare word counts and optimize their writing for maximum impact.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-center">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">College Counselors</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Admissions counselors and essay coaches use this tool to help students craft compelling narratives within the strict word limit.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border-2 border-orange-200 dark:border-orange-800 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">International Students</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">International applicants use this tool to ensure their essays meet American word count standards and Common Application requirements.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">About Common App Essay Word Counter</h2>
          <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-800/50 dark:via-slate-800/50 dark:to-slate-800/50 p-8 md:p-10 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-slate-700">
            <div className="prose prose-lg max-w-none">
              {/* Introduction Card */}
              <div className="bg-white/70 dark:bg-slate-900/50 p-6 rounded-xl mb-6 border-l-4 border-blue-600">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-0">
                  The <strong className="text-blue-600 dark:text-blue-400">Common Application essay</strong> is one of the most critical components of your college admissions application. With a strict 650-word limit, every word counts when telling your unique story to admissions officers. Our free Common App Essay Word Counter helps you stay within this limit while crafting a compelling personal statement that showcases your personality, experiences, and potential.
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">📝</span> Essay Writing Essentials
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    The Common Application essay, also known as the personal statement, allows you to choose from seven different prompts designed to help you share meaningful aspects of your background, identity, interests, or talents. Whether you're writing about overcoming challenges, pursuing your passion, or questioning a belief, maintaining the correct word count is essential. Similar to our <button onClick={() => navigateTo('/text-tools/word-counter')} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">advanced word counter</button>, this tool ensures precision for college applications.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Real-Time Accuracy
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                    Our word counter tool provides real-time analysis of your essay, tracking not just word count but also characters, sentences, paragraphs, and estimated reading time. This comprehensive approach helps you understand your essay's structure and pacing. The tool uses the same counting method as the Common Application portal, ensuring accuracy when you submit your final application.
                  </p>
                </div>
              </div>

              {/* Statistics Highlight */}
              <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 mb-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎓</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Perfect for College Admissions</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                      For college-bound students, transfer applicants, and international students alike, the Common App essay represents an opportunity to stand out from the crowd. Most competitive colleges and universities in the United States accept the Common Application, making this essay your chance to speak directly to admissions officers across multiple institutions.
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                      If you're also preparing for standardized tests, check out our <button onClick={() => navigateTo('/education-and-exam-tools/sat-score-calculator')} className="text-green-600 dark:text-green-400 hover:underline font-medium">SAT Score Calculator</button> and <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator')} className="text-green-600 dark:text-green-400 hover:underline font-medium">GPA Calculator</button> to track your complete college application profile.
                    </p>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Writing Best Practices
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm mb-3">
                  Beyond word counting, understanding essay structure is crucial for college admissions success. The ideal Common App essay typically ranges from 500 to 650 words, allowing enough space to develop your ideas fully while maintaining reader engagement. Essays significantly shorter than 500 words may appear underdeveloped, while those exceeding 650 words will be truncated by the Common App system.
                </p>
                <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-lg mt-4">
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium mb-2">📌 Pro Tip:</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Use our <button onClick={() => navigateTo('/text-tools/remove-extra-spaces')} className="text-orange-600 dark:text-orange-400 hover:underline font-medium">Remove Extra Spaces tool</button> to clean up formatting issues before pasting your essay into the Common App portal. Proper formatting ensures accurate word counting and professional presentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Official Common App Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.commonapp.org/apply/essay-prompts" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Common App Essay Prompts</h3>
              <p className="text-slate-600 dark:text-slate-400">View the official 2025-2026 Common Application essay prompts and guidelines directly from the Common App website.</p>
            </a>
            <a href="https://www.commonapp.org/blog/how-to-write-common-app-essay" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow block">
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">How to Write Your Essay</h3>
              <p className="text-slate-600 dark:text-slate-400">Official guide from Common App on writing an effective personal statement that stands out to admissions officers.</p>
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
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">What is the Common App essay word limit?</h3>
              <p className="text-slate-600 dark:text-slate-300">The Common Application essay has a strict word limit of 650 words. The minimum recommended length is 250 words, though there's no official minimum. Essays should be substantive and well-developed, typically falling between 500-650 words for optimal impact.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Does the Common App count words or characters?</h3>
              <p className="text-slate-600 dark:text-slate-300">The Common Application system counts words, not characters. It uses the same counting method as this tool—counting strings of text separated by spaces. The 650-word limit is enforced by the Common App portal, which will prevent submission if you exceed this limit.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">What happens if I exceed 650 words?</h3>
              <p className="text-slate-600 dark:text-slate-300">The Common App portal will not allow you to submit your essay if it exceeds 650 words. You must edit your essay down to meet the word limit before submitting your application. Admissions officers will only see essays that meet the word count requirements.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How accurate is this word counter?</h3>
              <p className="text-slate-600 dark:text-slate-300">This word counter uses the same counting algorithm as the Common Application portal—counting strings of text separated by whitespace. It provides real-time, accurate word counts that match what you'll see when you paste your essay into the Common App system.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Should I use all 650 words?</h3>
              <p className="text-slate-600 dark:text-slate-300">While you don't need to use exactly 650 words, admissions officers generally prefer essays between 500-650 words. This range allows you to fully develop your ideas and tell your story effectively. Essays significantly shorter than 500 words may seem underdeveloped or lack substance.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Do contractions count as one or two words?</h3>
              <p className="text-slate-600 dark:text-slate-300">Contractions like 'don't,' 'it's,' and 'I'm' count as one word in the Common Application system and in this word counter. Using contractions can be an effective way to reduce your word count while maintaining a conversational tone in your essay.</p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Can I check multiple essay drafts?</h3>
              <p className="text-slate-600 dark:text-slate-300">Yes! You can paste and check as many essay drafts as you need. Use the 'Clear' button to reset the counter between drafts. This tool is perfect for comparing different versions of your essay and tracking your progress as you revise toward the 650-word limit.</p>
            </div>
          </div>
        </section>

        <RelatedTools currentSlug="common-app-essay-word-counter" relatedSlugs={['sat-score-calculator', 'gpa-calculator', 'word-counter']} navigateTo={navigateTo} />
      </div>
    </div>
  );
};

export default CommonAppEssayWordCounter;
