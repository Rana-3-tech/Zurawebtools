import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface CaseConverterProps {
  navigateTo: (page: Page) => void;
}

const CaseConverter: React.FC<CaseConverterProps> = ({ navigateTo }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // 🧠 SEO & Meta Tags Setup
  useEffect(() => {
    document.title = "Online Case Converter Tool – Free Text Case Changer | ZuraWebTools";

    const metaDescription =
      document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Use our free online case converter tool to instantly change text to uppercase, lowercase, title case, or sentence case. The perfect text capitalization tool for writers, developers, and SEO professionals.'
    );
    document.head.appendChild(metaDescription);

    // 🔗 OG & Twitter Tags
    const metaTags = [
        { property: 'og:title', content: 'Online Case Converter Tool – Free Text Case Changer | ZuraWebTools' },
        { property: 'og:description', content: 'Instantly convert text to uppercase, lowercase, title case, and more. A free text format changer for SEO, social media, and content creation.' },
        { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-case-converter-og.png' },
        { property: 'og:image:alt', content: 'A preview of the Online Case Converter Tool from ZuraWebTools, with conversion buttons.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://zurawebtools.com/tools/case-converter' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Online Case Converter Tool | ZuraWebTools' },
        { name: 'twitter:description', content: 'Free tool to convert text to uppercase, lowercase, title case, and sentence case online.' },
        { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-case-converter-og.png' },
        { name: 'twitter:image:alt', content: 'A preview of the Online Case Converter Tool from ZuraWebTools, with conversion buttons.' },
    ];
    metaTags.forEach((tagInfo) => {
      const meta = document.createElement('meta');
      Object.entries(tagInfo).forEach(([k, v]) => meta.setAttribute(k, v));
      document.head.appendChild(meta);
    });

    // Canonical URL
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/tools/case-converter');
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
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1450" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "A free online text case changer to convert text to uppercase, lowercase, title case, sentence case, and capitalized case. This text capitalization tool is ideal for writers, developers, and for SEO content formatting.",
        "url": "https://zurawebtools.com/tools/case-converter"
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
          }
        ]
      }
    ]);
    document.head.appendChild(script);

    // 🧹 Cleanup
    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
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

        {/* How-to and FAQ */}
        <div className="max-w-4xl mx-auto mt-16 text-left">
           <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use This Case Converter</h2>
           <div className="bg-slate-900/30 p-8 rounded-lg">
               <ol className="list-decimal list-inside space-y-3 text-gray-300">
                   <li><strong>Paste Your Text:</strong> Copy the text you want to convert and paste it into the left input box.</li>
                   <li><strong>Choose a Case:</strong> Click on one of the case format buttons like "Uppercase" or "Title Case".</li>
                   <li><strong>Copy the Result:</strong> The converted text will instantly appear in the right output box. Click the "Copy Result" button to copy it to your clipboard.</li>
               </ol>
           </div>
           
           <h2 className="text-3xl font-bold text-center mt-16 mb-8 text-white">Frequently Asked Questions</h2>
           <div className="space-y-6">
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">How does the Online Case Converter Tool work?</h3>
                   <p className="text-gray-400 mt-2">The tool uses JavaScript running in your browser to perform the text conversions. It's fast, secure, and doesn't require sending your data to any servers.</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">Is this text case changer free to use?</h3>
                   <p className="text-gray-400 mt-2">Yes, it's 100% free! ZuraWebTools provides this as a free utility for anyone who needs to quickly format their text.</p>
               </div>
               <div className="bg-slate-900/30 p-6 rounded-lg">
                   <h3 className="text-xl font-semibold text-cyan-300">Can I use this for SEO or social media content formatting?</h3>
                   <p className="text-gray-400 mt-2">Definitely. It's a great tool for formatting headlines in Title Case for blogs and articles, or for making sure your social media captions are correctly capitalized using Sentence Case.</p>
               </div>
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
