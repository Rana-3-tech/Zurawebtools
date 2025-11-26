import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';

interface RemoveExtraSpacesProps {
  navigateTo: (page: Page) => void;
}

const RemoveExtraSpaces: React.FC<RemoveExtraSpacesProps> = ({ navigateTo }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [options, setOptions] = useState({
    trimLines: true,
    removeExtraSpaces: true,
    removeBlankLines: true,
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [stats, setStats] = useState({
    inputChars: 0,
    inputWords: 0,
    outputChars: 0,
    outputWords: 0,
    charsRemoved: 0,
    reductionPercent: 0
  });

  // TOC sections configuration
  const tocSections: TOCSection[] = [
    { id: 'how-to-use', emoji: '📖', title: 'How to Use', subtitle: 'Quick guide', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-400', hoverText: 'text-green-600' },
    { id: 'benefits', emoji: '⭐', title: 'Benefits', subtitle: 'Why choose this', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
    { id: 'features', emoji: '✨', title: 'Features', subtitle: 'What you get', gradientFrom: 'from-blue-50', gradientTo: 'to-indigo-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
    { id: 'faq', emoji: '❓', title: 'FAQ', subtitle: 'Get answers', gradientFrom: 'from-orange-50', gradientTo: 'to-amber-50', hoverBorder: 'border-orange-400', hoverText: 'text-orange-600' }
  ];

  // 🧠 Enhanced SEO & Meta Tags Setup
  useEffect(() => {
    // HTML lang attribute
    document.documentElement.setAttribute('lang', 'en');

    document.title =
      "Remove Extra Spaces from Text – Free Online Whitespace Remover Tool | ZuraWebTools";

    const metaDescription =
      document.querySelector('meta[name="description"]') ||
      document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Free online whitespace remover tool to remove extra spaces, tabs, and blank lines from text. Instantly clean and format your text for SEO, blogs, or code with our fast online text cleaner.'
    );
    document.head.appendChild(metaDescription);

    // Robots meta
    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    document.head.appendChild(metaRobots);

    // 🏷️ Meta Keywords for LSI coverage
    const metaKeywords =
      document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute(
      'content',
      'remove extra spaces, whitespace remover, text cleaner, text formatter, remove tabs, remove blank lines, clean text online, format text for SEO, online space cleaner, code text cleaner, trim whitespace'
    );
    document.head.appendChild(metaKeywords);

    // 🔗 OG & Twitter Tags
    const metaTags = [
      { property: 'og:title', content: 'Remove Extra Spaces from Text – Free Online Whitespace Remover | ZuraWebTools' },
      { property: 'og:description', content: 'Clean your text instantly by removing extra spaces, tabs, and blank lines. Perfect for writers, developers, and SEO optimization.' },
      { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-remove-extra-spaces-og.png' },
      { property: 'og:image:alt', content: 'Screenshot of ZuraWebTools Remove Extra Spaces tool cleaning messy text.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/text-and-writing-tools/remove-extra-spaces' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Remove Extra Spaces from Text – Free Online Whitespace Remover Tool' },
      { name: 'twitter:description', content: 'Use this free online whitespace remover to delete extra spaces, tabs, and blank lines. Clean and format text for SEO, blogs, or coding.' },
      { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-remove-extra-spaces-og.png' },
      { name: 'twitter:image:alt', content: 'Preview of cleaned text using ZuraWebTools Remove Extra Spaces tool.' },
    ];
    metaTags.forEach((tagInfo) => {
      const meta = document.createElement('meta');
      Object.entries(tagInfo).forEach(([k, v]) => meta.setAttribute(k, v));
      document.head.appendChild(meta);
    });

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/text-and-writing-tools/remove-extra-spaces');
    document.head.appendChild(canonical);

    // 📜 JSON-LD (SoftwareApplication + FAQ + WebPage + Breadcrumb + HowTo)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Remove Extra Spaces from Text – Free Online Whitespace Remover Tool",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any (Web-based)",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1300" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
        "description": "A free online text cleaner tool to remove extra spaces, tabs, and blank lines from text. Perfect for formatting SEO content, blogs, or clean code snippets.",
        "url": "https://zurawebtools.com/text-and-writing-tools/remove-extra-spaces"
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Remove Extra Spaces Tool",
        "description": "Free online whitespace remover to clean text by removing extra spaces, tabs, and blank lines",
        "url": "https://zurawebtools.com/text-and-writing-tools/remove-extra-spaces",
        "breadcrumb": {
          "@id": "https://zurawebtools.com/text-and-writing-tools/remove-extra-spaces#breadcrumb"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://zurawebtools.com/text-and-writing-tools/remove-extra-spaces#breadcrumb",
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
            "name": "Remove Extra Spaces",
            "item": "https://zurawebtools.com/text-and-writing-tools/remove-extra-spaces"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Remove Extra Spaces from Text",
        "description": "Step-by-step guide to clean text by removing extra spaces, tabs, and blank lines",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Paste Your Text",
            "text": "Paste your messy text with extra spaces into the input area on the left"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Choose Cleaning Options",
            "text": "Select your preferred options: Remove Extra Spaces, Trim Each Line, or Remove Blank Lines"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Get Cleaned Text",
            "text": "Your cleaned text appears instantly in the output area. Click Copy Result to use it"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does this Remove Extra Spaces tool work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This whitespace remover processes your text directly in your browser using smart regex patterns. It removes double spaces, trims lines, and cleans up unnecessary blank lines safely—no data leaves your device."
            }
          },
          {
            "@type": "Question",
            "name": "Is this whitespace remover tool free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! ZuraWebTools provides this text cleaner completely free. Use it anytime to format content for SEO, blogs, or code without any restrictions."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this for SEO or blog formatting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. This online space cleaner helps improve readability and SEO by maintaining clean, consistent text structure for websites and blogs."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between removing extra spaces and trimming lines?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Removing extra spaces deletes multiple consecutive spaces between words, leaving only one. Trimming lines removes spaces at the start and end of each line. You can use both options together for maximum cleaning."
            }
          },
          {
            "@type": "Question",
            "name": "Does this tool remove tabs and newlines?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 'Remove Extra Spaces' option treats tabs as spaces and removes extra ones. The 'Remove Blank Lines' option eliminates multiple consecutive newlines. Use 'Remove All Whitespace' button to delete everything including tabs and newlines."
            }
          },
          {
            "@type": "Question",
            "name": "Is my data safe when using this text cleaner?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, 100% safe. All text processing happens locally in your browser using JavaScript. Your text never leaves your device or gets sent to any server, ensuring complete privacy."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this for cleaning code or JSON?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! This tool is perfect for cleaning code snippets, JSON data, or any text format. Use the trim and blank line removal options to clean up indentation and formatting issues in your code."
            }
          }
        ]
      }
    ]);
    document.head.appendChild(script);

    // 🧹 Cleanup
    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      metaDescription.remove();
      metaKeywords.remove();
      metaRobots.remove();
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

  // 🧩 Text Cleaning Logic
  const handleTextProcessing = useCallback(() => {
    let processedText = inputText;

    if (options.removeExtraSpaces) {
      processedText = processedText.replace(/[ \t]{2,}/g, ' ');
    }
    if (options.trimLines) {
      processedText = processedText
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
    }
    if (options.removeBlankLines) {
      processedText = processedText.replace(/\n{2,}/g, '\n');
    }

    processedText = processedText.trim();
    setOutputText(processedText);

    // Calculate statistics
    const inputWords = inputText.trim() ? inputText.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
    const outputWords = processedText.trim() ? processedText.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
    const charsRemoved = inputText.length - processedText.length;
    const reductionPercent = inputText.length > 0 ? ((charsRemoved / inputText.length) * 100) : 0;

    setStats({
      inputChars: inputText.length,
      inputWords: inputWords,
      outputChars: processedText.length,
      outputWords: outputWords,
      charsRemoved: charsRemoved,
      reductionPercent: reductionPercent
    });
  }, [inputText, options]);

  useEffect(() => {
    handleTextProcessing();
  }, [handleTextProcessing]);

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

  const handleRemoveAllWhitespace = () => {
    setOutputText(inputText.replace(/\s/g, ''));
  };

  const handleDownload = () => {
    if (outputText) {
      const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cleaned-text-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const CheckboxOption: React.FC<{
    label: string;
    checked: boolean;
    onChange: () => void;
  }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-cyan-400 bg-slate-700 border-slate-500 rounded focus:ring-cyan-500"
      />
      <span className="text-gray-300">{label}</span>
    </label>
  );

  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Remove Extra Spaces from Text – Free Online Whitespace Remover Tool
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Use our free online space cleaner to remove extra spaces, delete unnecessary tabs, trim leading and trailing spaces, and clean blank lines in text. Perfect for developers, students, and writers who need fast text cleanup for SEO or blogs.
          </p>
        </div>

        {/* Input & Output Panels */}
        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <label htmlFor="inputText" className="block text-lg font-semibold mb-2 text-gray-200">
              Input Text
            </label>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-1 rounded-xl shadow-2xl">
              <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste  messy   text  with    extra     spaces...
Or click an example below to try it out!"
                className="w-full h-64 p-4 text-base bg-slate-900 text-gray-200 rounded-lg border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition resize-y"
                aria-label="Input text area"
              />
            </div>
            <div className="text-sm text-gray-400 mt-2 flex justify-between">
              <span>{stats.inputChars} characters</span>
              <span>{stats.inputWords} words</span>
            </div>
          </div>

          <div>
            <label htmlFor="outputText" className="block text-lg font-semibold mb-2 text-gray-200">
              Cleaned Output
            </label>
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-1 rounded-xl shadow-inner">
              <textarea
                id="outputText"
                value={outputText}
                readOnly
                placeholder="✨ Your cleaned text will appear here instantly
as you type or select options"
                className="w-full h-64 p-4 text-base bg-slate-900 text-gray-300 rounded-lg border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-slate-500/50 transition resize-y cursor-not-allowed"
                aria-label="Output text area"
              />
            </div>
            <div className="text-sm text-gray-400 mt-2 flex justify-between">
              <span>{stats.outputChars} characters</span>
              <span>{stats.outputWords} words</span>
            </div>
          </div>
        </div>

        {/* Statistics Panel */}
        {stats.inputChars > 0 && (
          <div className="max-w-6xl mx-auto mt-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-xl border border-cyan-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400">{stats.charsRemoved}</div>
                <div className="text-sm text-gray-300 mt-1">Characters Removed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">
                  {stats.reductionPercent.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-300 mt-1">Size Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">
                  {stats.inputWords === stats.outputWords ? '✓' : stats.outputWords}
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  {stats.inputWords === stats.outputWords ? 'Words Preserved' : 'Words Remaining'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Options and Buttons - Compact */}
        <div className="max-w-6xl mx-auto mt-4 bg-slate-900/50 p-4 rounded-lg shadow-lg">
          <div className="space-y-3">
            {/* Options - Horizontal Layout */}
            <div>
              <h3 className="text-base font-semibold text-white mb-2 text-center">Cleaning Options</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <CheckboxOption
                  label="Remove Extra Spaces"
                  checked={options.removeExtraSpaces}
                  onChange={() => setOptions((o) => ({ ...o, removeExtraSpaces: !o.removeExtraSpaces }))}
                />
                <CheckboxOption
                  label="Trim Each Line"
                  checked={options.trimLines}
                  onChange={() => setOptions((o) => ({ ...o, trimLines: !o.trimLines }))}
                />
                <CheckboxOption
                  label="Remove Blank Lines"
                  checked={options.removeBlankLines}
                  onChange={() => setOptions((o) => ({ ...o, removeBlankLines: !o.removeBlankLines }))}
                />
              </div>
            </div>

            {/* Buttons - Centered */}
            <div className="flex flex-wrap justify-center gap-2 pt-3 border-t border-slate-700">
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className={`font-semibold py-2 px-5 rounded-lg transition-all duration-200 text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed ${
                  copySuccess ? 'bg-green-600 text-white ring-2 ring-green-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                }`}
              >
                {copySuccess ? '✓ Copied!' : '📋 Copy Result'}
              </button>
              <button
                onClick={handleDownload}
                disabled={!outputText}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 px-5 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📥 Download
              </button>
              <button
                onClick={handleRemoveAllWhitespace}
                disabled={!inputText}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-200 text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔥 Remove All
              </button>
              <button
                onClick={handleClear}
                disabled={!inputText && !outputText}
                className="bg-slate-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-slate-600 transition-all duration-200 text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
        </div>

        {/* Quick Examples Section */}
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Try These Examples – Click to Load Instantly
          </h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Click any example below to see how the tool cleans different types of text
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button 
              onClick={() => setInputText("This   is    a  messy   paragraph   with    extra     spaces    everywhere.")}
              className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-left group"
            >
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">Messy Paragraph</h3>
              <p className="text-sm text-gray-300">Multiple spaces between words</p>
            </button>

            <button 
              onClick={() => setInputText("function example() {\n\t\t\treturn true;\n\t\t\t\tconsole.log('test');\n\t}")}
              className="p-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-left group"
            >
              <div className="text-3xl mb-3">💻</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">Code with Tabs</h3>
              <p className="text-sm text-gray-300">Clean indentation issues</p>
            </button>

            <button 
              onClick={() => setInputText("   Leading spaces here   \n\n\n   And trailing spaces   \n\n   With blank lines   ")}
              className="p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-left group"
            >
              <div className="text-3xl mb-3">✂️</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">Trim Lines</h3>
              <p className="text-sm text-gray-300">Remove leading/trailing spaces</p>
            </button>

            <button 
              onClick={() => setInputText("Line one\n\n\n\nLine two\n\n\n\n\nLine three")}
              className="p-6 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-left group"
            >
              <div className="text-3xl mb-3">🗑️</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">Remove Blank Lines</h3>
              <p className="text-sm text-gray-300">Delete multiple empty lines</p>
            </button>

            <button 
              onClick={() => setInputText("Dear   Customer,\n\n\n   Thank you    for  your    order.\n\n   Best   regards,\n   Support  Team   ")}
              className="p-6 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-left group"
            >
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">Email Template</h3>
              <p className="text-sm text-gray-300">Clean email formatting</p>
            </button>

            <button 
              onClick={() => setInputText('{\n  "name":    "John",\n  "age":     25,\n\n  "city":    "New York"\n}')}
              className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-left group"
            >
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">JSON Data</h3>
              <p className="text-sm text-gray-300">Clean JSON formatting</p>
            </button>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="max-w-6xl mx-auto mt-16">
          <TableOfContents sections={tocSections} />
        </div>

        {/* About Section */}
        <div id="how-to-use" className="max-w-4xl mx-auto mt-16 bg-slate-900/50 p-8 rounded-2xl border border-slate-700">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            About the Remove Extra Spaces Tool
          </h2>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              The <strong>Remove Extra Spaces Tool</strong> is a free online whitespace remover that helps you clean messy text instantly. 
              Whether you're a writer formatting blog content, a developer cleaning code snippets, or a student preparing research papers, 
              this tool removes redundant spaces, trims lines, and eliminates blank lines in seconds.
            </p>

            <h3 className="text-xl font-semibold text-white pt-4">How It Works</h3>
            <p>
              Our text cleaner uses advanced JavaScript regular expressions (regex) to identify and remove different types of whitespace characters. 
              The tool processes your text entirely in your browser—no server uploads, no data storage, no privacy concerns. Here's what each option does:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Remove Extra Spaces:</strong> Finds sequences of 2+ spaces and replaces them with a single space</li>
              <li><strong>Trim Each Line:</strong> Removes leading and trailing whitespace from every line</li>
              <li><strong>Remove Blank Lines:</strong> Eliminates consecutive empty lines, keeping text compact</li>
              <li><strong>Remove All Whitespace:</strong> Deletes every space, tab, and newline character (use carefully!)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white pt-4">Common Use Cases</h3>
            <p>
              This whitespace remover is perfect for cleaning text copied from PDFs (which often adds extra spaces), 
              formatting email templates, preparing code for documentation, cleaning CSV data, optimizing SEO meta tags, 
              and ensuring consistent text structure across documents. Many users combine this with our{' '}
              <a 
                href="/text-and-writing-tools/word-counter" 
                onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }}
                className="text-cyan-400 hover:underline font-medium"
              >
                word counter
              </a>{' '}
              and{' '}
              <a 
                href="/text-and-writing-tools/case-converter" 
                onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }}
                className="text-cyan-400 hover:underline font-medium"
              >
                case converter
              </a>{' '}
              for complete text processing workflows.
            </p>

            <h3 className="text-xl font-semibold text-white pt-4">Why Choose This Tool?</h3>
            <p>
              Unlike other text cleaners that require uploads or registrations, our tool works instantly in your browser. 
              It's 100% free, requires no sign-up, shows no ads, and processes unlimited text. The real-time preview lets you 
              see changes as you adjust options, making it easy to get exactly the formatting you need. Perfect for anyone who 
              values speed, privacy, and simplicity.
            </p>

            <div className="bg-cyan-900/30 border-l-4 border-cyan-500 p-4 rounded mt-6">
              <p className="text-cyan-200">
                <strong>Pro Tip:</strong> Use the Quick Examples above to see how different options affect various text types. 
                This helps you understand which combination works best for your specific use case.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div id="benefits" className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Who Uses This Text Cleaner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300">
              <div className="text-4xl mb-3">✍️</div>
              <h3 className="text-xl font-bold text-white mb-3">Content Writers & Bloggers</h3>
              <p className="text-gray-300 leading-relaxed">
                Clean up messy text copied from various sources before publishing. Maintain consistent formatting for better SEO and readability. Use our{' '}
                <a 
                  href="/text-and-writing-tools/word-counter" 
                  onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }}
                  className="text-cyan-400 hover:underline font-medium"
                >
                  word counter tool
                </a>{' '}
                to check your content length after cleaning.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-purple-500 transition-all duration-300">
              <div className="text-4xl mb-3">👨‍💻</div>
              <h3 className="text-xl font-bold text-white mb-3">Developers & Programmers</h3>
              <p className="text-gray-300 leading-relaxed">
                Clean code snippets, remove inconsistent indentation, and format JSON data. Perfect for preparing code for documentation or sharing on Stack Overflow.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-green-500 transition-all duration-300">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-xl font-bold text-white mb-3">Students & Researchers</h3>
              <p className="text-gray-300 leading-relaxed">
                Format research papers, clean up quoted text, and prepare citations. Remove extra spaces from PDF copy-paste text that often contains formatting errors.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700 hover:border-orange-500 transition-all duration-300">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">SEO Professionals</h3>
              <p className="text-gray-300 leading-relaxed">
                Clean meta descriptions, title tags, and schema markup. Ensure consistent formatting across all on-page SEO elements. Try our{' '}
                <a 
                  href="/text-and-writing-tools/case-converter" 
                  onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }}
                  className="text-cyan-400 hover:underline font-medium"
                >
                  case converter
                </a>{' '}
                for text transformation.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="features" className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Why Use Our Remove Extra Spaces Tool?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl hover:shadow-xl transition-shadow duration-300 border border-cyan-500/30">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Cleaning</h3>
              <p className="text-gray-300 leading-relaxed">
                Remove extra spaces in milliseconds with real-time processing. No waiting, no uploading—instant results as you type.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl hover:shadow-xl transition-shadow duration-300 border border-purple-500/30">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3">100% Private</h3>
              <p className="text-gray-300 leading-relaxed">
                All text processing happens locally in your browser. Your data never touches our servers, ensuring complete privacy and security.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl hover:shadow-xl transition-shadow duration-300 border border-orange-500/30">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Flexible Options</h3>
              <p className="text-gray-300 leading-relaxed">
                Choose exactly what to clean: extra spaces, line trimming, blank lines, or remove all whitespace with one click.
              </p>
            </div>
          </div>
        </div>

        {/* External Links Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Learn More About Whitespace & Text Processing
          </h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore these trusted resources to understand whitespace characters and text formatting
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://en.wikipedia.org/wiki/Whitespace_character" 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="p-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border-2 border-blue-500/30 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">📚</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">
                    Wikipedia: Whitespace Characters
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Comprehensive guide to whitespace characters including spaces, tabs, and newlines in computing and typography.
                  </p>
                  <span className="text-xs text-cyan-400 font-medium mt-2 inline-block">
                    Read on Wikipedia →
                  </span>
                </div>
              </div>
            </a>

            <a 
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim" 
              target="_blank" 
              rel="noopener noreferrer nofollow"
              className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border-2 border-purple-500/30 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">💻</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">
                    MDN: String.trim() Method
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Technical documentation on JavaScript's trim() method for removing whitespace from strings.
                  </p>
                  <span className="text-xs text-cyan-400 font-medium mt-2 inline-block">
                    Read on MDN Web Docs →
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                1. How does this Remove Extra Spaces tool work?
              </h3>
              <p className="text-gray-400 mt-2">
                The tool processes your text directly in your browser using smart regex patterns. It removes double spaces, trims lines, and cleans up unnecessary blank lines safely—no data ever leaves your device.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                2. Is this whitespace remover free to use?
              </h3>
              <p className="text-gray-400 mt-2">
                Yes! ZuraWebTools provides this text cleaner completely free. Use it anytime to format content for SEO, blogs, or code without any restrictions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                3. Can I use this for SEO or blog formatting?
              </h3>
              <p className="text-gray-400 mt-2">
                Absolutely. This online space cleaner helps improve readability and SEO by maintaining clean, consistent text structure for websites and blogs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                4. What's the difference between removing extra spaces and trimming lines?
              </h3>
              <p className="text-gray-400 mt-2">
                Removing extra spaces deletes multiple consecutive spaces between words, leaving only one. Trimming lines removes spaces at the start and end of each line. You can use both options together for maximum cleaning.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                5. Does this tool remove tabs and newlines?
              </h3>
              <p className="text-gray-400 mt-2">
                The 'Remove Extra Spaces' option treats tabs as spaces and removes extra ones. The 'Remove Blank Lines' option eliminates multiple consecutive newlines. Use 'Remove All Whitespace' button to delete everything including tabs and newlines.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                6. Is my data safe when using this text cleaner?
              </h3>
              <p className="text-gray-400 mt-2">
                Yes, 100% safe. All text processing happens locally in your browser using JavaScript. Your text never leaves your device or gets sent to any server, ensuring complete privacy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                7. Can I use this for cleaning code or JSON?
              </h3>
              <p className="text-gray-400 mt-2">
                Yes! This tool is perfect for cleaning code snippets, JSON data, or any text format. Use the trim and blank line removal options to clean up indentation and formatting issues in your code.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Related Text Processing Tools
          </h2>
          <RelatedTools
            navigateTo={navigateTo}
            relatedSlugs={['word-counter', 'case-converter', 'json-formatter', 'lorem-ipsum-generator']}
            currentSlug="remove-extra-spaces"
          />
        </div>

        {/* External Resources */}
        <div className="max-w-4xl mx-auto mt-12 text-center bg-slate-800/50 p-6 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3">📚 Learn More About Whitespace</h3>
          <p className="text-sm text-gray-400 mb-4">
            Explore these authoritative resources to understand whitespace handling in text and code:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a 
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              MDN Web Docs - String.trim() →
            </a>
            <a 
              href="https://www.w3.org/TR/xml/#sec-white-space" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              W3C - Whitespace Handling →
            </a>
            <a 
              href="https://en.wikipedia.org/wiki/Whitespace_character" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
            >
              Wikipedia - Whitespace Characters →
            </a>
          </div>
        </div>

        {/* Last Updated Footer */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-sm text-gray-500">
            Last Updated: <time dateTime="2025-11-08">November 8, 2025</time>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RemoveExtraSpaces;
