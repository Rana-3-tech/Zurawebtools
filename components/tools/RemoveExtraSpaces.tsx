import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
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

  // 🧠 Enhanced SEO & Meta Tags Setup
  useEffect(() => {
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
      { property: 'og:url', content: 'https://zurawebtools.com/tools/remove-extra-spaces' },
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
    canonical.setAttribute('href', 'https://zurawebtools.com/tools/remove-extra-spaces');
    document.head.appendChild(canonical);

    // 📜 JSON-LD (SoftwareApplication + FAQ)
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
        "url": "https://zurawebtools.com/tools/remove-extra-spaces"
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
        <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="inputText" className="block text-lg font-semibold mb-2 text-gray-200">
              Input Text
            </label>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-1 rounded-xl shadow-2xl">
              <textarea
                id="inputText"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here to remove extra spaces..."
                className="w-full h-72 p-4 text-base bg-slate-900 text-gray-200 rounded-lg border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-cyan-400/50 transition resize-y"
                aria-label="Input text area"
              />
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
                placeholder="Your cleaned text will appear here..."
                className="w-full h-72 p-4 text-base bg-slate-900 text-gray-300 rounded-lg border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-slate-500/50 transition resize-y cursor-not-allowed"
                aria-label="Output text area"
              />
            </div>
          </div>
        </div>

        {/* Options and Buttons */}
        <div className="max-w-6xl mx-auto mt-6 bg-slate-900/50 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Options</h3>
              <div className="space-y-3">
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

            <div className="md:col-span-2 flex flex-wrap justify-center md:justify-end gap-4">
              <button
                onClick={handleRemoveAllWhitespace}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Remove All Whitespace
              </button>
              <button
                onClick={handleCopy}
                className={`font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  copySuccess ? 'bg-green-600 text-white' : 'bg-cyan-500 text-white hover:bg-cyan-600'
                }`}
              >
                {copySuccess ? 'Copied!' : 'Copy Result'}
              </button>
              <button
                onClick={handleClear}
                className="bg-slate-700 text-white font-bold py-3 px-6 rounded-full hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                How does this Remove Extra Spaces tool work?
              </h3>
              <p className="text-gray-400 mt-2">
                The tool processes your text directly in your browser and removes redundant spaces, blank lines, and tabs based on your preferences. No data ever leaves your device.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                Is this whitespace remover free to use?
              </h3>
              <p className="text-gray-400 mt-2">
                Yes! This online space cleaner is 100% free to use. You can use it anytime to format your text for SEO, blogs, or clean code snippets.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-300">
                Can I use it to format text for SEO or blogs?
              </h3>
              <p className="text-gray-400 mt-2">
                Absolutely! Clean, consistent text formatting helps improve your on-page SEO and makes blog content more readable for search engines and visitors.
              </p>
            </div>
          </div>
        </div>

        <RelatedTools
          navigateTo={navigateTo}
          relatedSlugs={['word-counter', 'case-converter', 'json-formatter']}
          currentSlug="remove-extra-spaces"
        />
      </div>
    </section>
  );
};

export default RemoveExtraSpaces;
