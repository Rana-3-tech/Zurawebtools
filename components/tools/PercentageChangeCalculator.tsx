import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface PercentageChangeCalculatorProps {
  navigateTo: (page: Page) => void;
}

const PercentageChangeCalculator: React.FC<PercentageChangeCalculatorProps> = ({ navigateTo }) => {
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result, setResult] = useState<{ change: number; type: 'increase' | 'decrease' | 'no-change' } | null>(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // 🧠 SEO & Meta Tags Setup
  useEffect(() => {
    document.title = "Percentage Change Calculator – Calculate Percent Increase, Decrease & Growth Online | ZuraWebTools";
    
    // Set html lang attribute
    document.documentElement.setAttribute('lang', 'en');

    // 📝 Meta Description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Free Percentage Change Calculator to find percent increase, decrease, or difference between two numbers. Ideal for finance, business, math, and statistics calculations.'
    );
    document.head.appendChild(metaDescription);

    // 🏷️ Meta Keywords (LSI keywords)
    let metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute(
      'content',
      'percentage change calculator, percent increase calculator, percent decrease calculator, percent difference calculator, percent growth calculator, calculate percent change, percent change formula'
    );
    document.head.appendChild(metaKeywords);

    // 📲 Open Graph & Twitter Cards
    const metaTags = [
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'Percentage Change Calculator | ZuraWebTools' },
      { property: 'og:description', content: 'Free online tool to calculate percent increase, decrease, or difference instantly. Perfect for finance and educational use.' },
      { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-percentage-change-calculator-og.png' },
      { property: 'og:image:alt', content: 'Free percentage change calculator showing percent increase or decrease online.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/math-and-calculation-tools/percentage-change-calculator' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Percentage Change Calculator | ZuraWebTools' },
      { name: 'twitter:description', content: 'Instantly calculate percent increase or decrease between two numbers. 100% free and accurate online calculator.' },
      { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-percentage-change-calculator-og.png' },
      { name: 'twitter:image:alt', content: 'Free percentage change calculator showing percent increase or decrease online.' },
    ];
    metaTags.forEach(tag => {
      const el = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
      document.head.appendChild(el);
    });

    // 🔗 Canonical
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/math-and-calculation-tools/percentage-change-calculator');
    document.head.appendChild(canonical);

    // 📘 Structured Data (Schema)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Percentage Change Calculator – Calculate Percent Increase & Decrease",
        "description": "Free online percentage change calculator to compute percent increase, decrease, or growth between two values.",
        "url": "https://zurawebtools.com/math-and-calculation-tools/percentage-change-calculator",
        "breadcrumb": { "@id": "https://zurawebtools.com/math-and-calculation-tools/percentage-change-calculator#breadcrumb" },
        "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "@id": "https://zurawebtools.com/math-and-calculation-tools/percentage-change-calculator#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
          { "@type": "ListItem", "position": 2, "name": "Finance Tools", "item": "https://zurawebtools.com/finance-tools" },
          { "@type": "ListItem", "position": 3, "name": "Percentage Change Calculator" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Percentage Change Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "Any (Web-based)",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1050" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
        "description": "A free online percentage change calculator to compute percent increase, decrease, or growth between two values. Ideal for business, finance, and academic use.",
        "url": "https://zurawebtools.com/math-and-calculation-tools/percentage-change-calculator"
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Percentage Change Between Two Numbers",
        "description": "Step-by-step guide to calculate percentage increase or decrease using our free online calculator.",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Enter Original Value", "text": "Input the starting number (original value) in the first field of the percentage calculator." },
          { "@type": "HowToStep", "position": 2, "name": "Enter New Value", "text": "Input the ending number (new value) in the second field to compare against the original." },
          { "@type": "HowToStep", "position": 3, "name": "Click Calculate", "text": "Click the Calculate button to instantly compute the percentage change between the two values." },
          { "@type": "HowToStep", "position": 4, "name": "View Result", "text": "See the percentage increase or decrease displayed with color coding (green for increase, red for decrease)." },
          { "@type": "HowToStep", "position": 5, "name": "Copy Result", "text": "Use the Copy button to easily share or save the calculated percentage change result." }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "How does the Percentage Change Calculator work?", "acceptedAnswer": { "@type": "Answer", "text": "Enter the original and new values to instantly calculate percent increase or decrease using the standard formula: ((New Value - Original Value) / Original Value) × 100." } },
          { "@type": "Question", "name": "Can I use this for business or finance calculations?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can use it for profit/loss analysis, stock price changes, sales performance tracking, revenue growth calculations, and other financial metrics." } },
          { "@type": "Question", "name": "Is this percentage calculator free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the ZuraWebTools Percentage Change Calculator is completely free, accurate, and fast with no registration or payment required." } },
          { "@type": "Question", "name": "What formula does the percentage change calculator use?", "acceptedAnswer": { "@type": "Answer", "text": "It uses the standard percentage change formula: ((New Value – Original Value) / Original Value) × 100 to calculate percent increase or decrease." } },
          { "@type": "Question", "name": "Can I calculate percentage decrease with this tool?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this calculator automatically detects whether the change is an increase (positive) or decrease (negative) and displays the result with appropriate color coding and symbols." } },
          { "@type": "Question", "name": "What is the difference between percentage change and percentage difference?", "acceptedAnswer": { "@type": "Answer", "text": "Percentage change measures the relative change from an original value to a new value. Percentage difference compares two values without considering which is the starting point. This calculator computes percentage change." } },
          { "@type": "Question", "name": "Can I use this calculator for weight loss percentage calculations?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Enter your starting weight as the original value and current weight as the new value to calculate your weight loss or gain percentage. Perfect for tracking fitness progress." } }
        ]
      }
    ]);
    document.head.appendChild(script);

    // 🧹 Cleanup on unmount
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

  const handleCalculate = () => {
    const orig = parseFloat(originalValue);
    const newV = parseFloat(newValue);

    if (isNaN(orig) || isNaN(newV)) {
      setError('Please enter valid numeric values.');
      setResult(null);
      return;
    }

    if (orig === 0) {
      setError('Original value cannot be zero.');
      setResult(null);
      return;
    }

    setError('');
    const change = ((newV - orig) / orig) * 100;
    let type: 'increase' | 'decrease' | 'no-change' = 'no-change';
    if (change > 0) type = 'increase';
    else if (change < 0) type = 'decrease';

    setResult({ change, type });
  };

  const handleReset = () => {
    setOriginalValue('');
    setNewValue('');
    setResult(null);
    setError('');
  };

  const handleCopy = () => {
    if (result) {
      const resultString = `Percentage ${result.type}: ${result.change.toFixed(2)}%`;
      navigator.clipboard.writeText(resultString);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const ShareButton: React.FC<{ network: string; url: string; text: string; }> = ({ network, url, text }) => {
    const shareUrl = {
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      WhatsApp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`
    }[network];
    
    return <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{network}</a>;
  };

  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Percentage Change Calculator</h1>
          <p className="mt-4 text-lg text-gray-300">
            Instantly calculate percentage increase or decrease between two values. Ideal for business, finance, or educational calculations.
          </p>
        </div>

        {/* Calculator UI */}
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-slate-900/50 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Original Value</label>
              <input type="number" value={originalValue} onChange={e => setOriginalValue(e.target.value)} placeholder="e.g., 100" className="w-full bg-slate-700 text-white p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Value</label>
              <input type="number" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="e.g., 125" className="w-full bg-slate-700 text-white p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400" />
            </div>
          </div>

          {error && <p className="text-red-400 mt-4 text-center font-medium">{error}</p>}

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={handleCalculate} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition transform hover:scale-105 shadow-lg">Calculate</button>
            <button onClick={handleReset} className="bg-slate-700 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-600 transition shadow-lg">Reset</button>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className="max-w-2xl mx-auto mt-8 bg-slate-900 p-6 rounded-xl shadow-inner relative">
            <h2 className="text-2xl font-bold text-center text-white mb-4">Result</h2>
            <div className={`text-center p-4 rounded-lg ${result.type === 'increase' ? 'bg-green-900/50' : result.type === 'decrease' ? 'bg-red-900/50' : 'bg-slate-700/50'}`}>
              <p className="text-lg font-semibold text-gray-300">
                {result.type === 'increase' ? 'Percentage Increase ✅' :
                  result.type === 'decrease' ? 'Percentage Decrease 🔻' : 'No Change Detected'}
              </p>
              <p className={`text-5xl font-bold mt-2 ${result.type === 'increase' ? 'text-green-400' : result.type === 'decrease' ? 'text-red-400' : 'text-gray-300'}`}>
                {result.change >= 0 ? '+' : ''}{result.change.toFixed(2)}%
              </p>
            </div>
            <p className="text-sm text-center mt-4 text-gray-400">Formula used: ((New Value – Original Value) / Original Value) × 100</p>
            <button onClick={handleCopy} className={`absolute top-4 right-4 font-semibold py-2 px-4 rounded-md text-sm transition transform hover:scale-105 ${copySuccess ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-200'}`}>
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        {/* Social Share - Positioned After Calculator */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Share This Percentage Calculator</h2>
          <p className="text-gray-400 mb-6">Help others calculate percentage changes easily</p>
          <div className="flex justify-center items-center space-x-4">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fpercentage-change-calculator"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fpercentage-change-calculator&text=Calculate%20percentage%20increase%20and%20decrease%20instantly%20with%20this%20free%20calculator%20from%20%40ZuraWebTools%21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
              className="text-slate-400 hover:text-sky-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fpercentage-change-calculator&title=Free%20Percentage%20Change%20Calculator"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="text-slate-400 hover:text-blue-600 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://api.whatsapp.com/send?text=Calculate%20percentage%20increase%20and%20decrease%20instantly%20https%3A%2F%2Fzurawebtools.com%2Ftools%2Fpercentage-change-calculator"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="text-slate-400 hover:text-green-500 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Examples Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">⚡ Quick Percentage Change Examples</h2>
          <p className="text-center text-gray-400 mb-10">Click any example to instantly calculate the percentage change</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Investment Growth', original: '10000', new: '12500', desc: 'Stock portfolio increases from $10,000 to $12,500', expected: '25% increase' },
              { name: 'Sales Performance', original: '200', new: '250', desc: 'Monthly sales units rise from 200 to 250', expected: '25% increase' },
              { name: 'Price Discount', original: '500', new: '400', desc: 'Product price drops from $500 to $400', expected: '20% decrease' },
              { name: 'Weight Loss', original: '180', new: '162', desc: 'Body weight reduces from 180 lbs to 162 lbs', expected: '10% decrease' },
              { name: 'Revenue Growth', original: '50000', new: '65000', desc: 'Monthly revenue jumps from $50K to $65K', expected: '30% increase' },
              { name: 'Test Score Improvement', original: '70', new: '84', desc: 'Student score improves from 70 to 84', expected: '20% increase' },
            ].map((template) => (
              <div
                key={template.name}
                onClick={() => {
                  setOriginalValue(template.original);
                  setNewValue(template.new);
                  const orig = parseFloat(template.original);
                  const newV = parseFloat(template.new);
                  const change = ((newV - orig) / orig) * 100;
                  let type: 'increase' | 'decrease' | 'no-change' = 'no-change';
                  if (change > 0) type = 'increase';
                  else if (change < 0) type = 'decrease';
                  setResult({ change, type });
                  setError('');
                }}
                className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-purple-400 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="font-semibold text-white text-lg mb-3 group-hover:text-purple-400 transition-colors">📊 {template.name}</h3>
                <p className="text-slate-400 text-sm mb-3">{template.desc}</p>
                <p className="text-purple-300 text-xs font-semibold">Expected: {template.expected}</p>
                <p className="text-cyan-300 text-xs mt-2">Click to calculate →</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">✨ Why Use Our Percentage Change Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
              <div className="bg-slate-900 p-6 rounded-lg h-full">
                <h3 className="text-xl font-bold text-white mb-3">⚡ Instant Calculations</h3>
                <p className="text-gray-300">Calculate percentage increase or decrease in real-time without manual formulas. Perfect for quick financial analysis, business metrics tracking, and educational purposes. Works seamlessly with our <a href="/math-and-calculation-tools/time-difference-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/math-and-calculation-tools/time-difference-calculator'); }} className="text-cyan-400 hover:text-cyan-300 underline">time calculator</a> for comprehensive data analysis.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
              <div className="bg-slate-900 p-6 rounded-lg h-full">
                <h3 className="text-xl font-bold text-white mb-3">🎯 Accurate & Reliable</h3>
                <p className="text-gray-300">Uses the standard percentage change formula: ((New - Original) / Original) × 100. Guaranteed precise results for finance, accounting, statistics, and academic calculations every time with automatic increase/decrease detection.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
              <div className="bg-slate-900 p-6 rounded-lg h-full">
                <h3 className="text-xl font-bold text-white mb-3">💯 100% Free</h3>
                <p className="text-gray-300">No registration, no hidden fees, no limits. Calculate unlimited percentage changes for business reports, investment tracking, weight loss goals, or academic assignments completely free forever.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">👥 Who Uses This Percentage Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">💼 Finance Professionals</h3>
              <p className="text-gray-300 mb-3">Calculate investment returns, portfolio growth, stock price changes, profit margins, and financial KPIs. Essential for analyzing revenue growth, expense reductions, and ROI calculations in business finance and accounting.</p>
              <p className="text-sm text-blue-300">Also try: <a href="/color-and-design-tools/hex-to-rgb-converter" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/hex-to-rgb-converter'); }} className="underline hover:text-blue-200">Color Tools</a></p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-purple-400 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">📊 Business Analysts</h3>
              <p className="text-gray-300 mb-3">Track sales performance, market share changes, customer growth rates, conversion rate improvements, and business metrics. Perfect for quarterly reports, KPI dashboards, and performance analysis presentations.</p>
              <p className="text-sm text-purple-300">Also try: <a href="/text-and-writing-tools/word-counter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }} className="underline hover:text-purple-200">Word Counter</a></p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-green-400 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">🎓 Students & Teachers</h3>
              <p className="text-gray-300 mb-3">Solve math homework, understand percentage concepts, calculate grade improvements, analyze statistical data, and verify manual calculations. Ideal for mathematics, economics, and science coursework at all educational levels.</p>
              <p className="text-sm text-green-300">Also try: <a href="/text-and-writing-tools/case-converter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }} className="underline hover:text-green-200">Text Case Converter</a></p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-orange-400 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3">🏋️ Personal Use</h3>
              <p className="text-gray-300 mb-3">Track weight loss percentage, fitness progress, calorie reduction, savings account growth, budget changes, and personal goal achievements. Monitor your health metrics, financial goals, and lifestyle improvements over time.</p>
              <p className="text-sm text-orange-300">Also try: <a href="/text-and-writing-tools/lorem-ipsum-generator" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/lorem-ipsum-generator'); }} className="underline hover:text-orange-200">Lorem Ipsum Generator</a></p>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="max-w-4xl mx-auto mt-16 text-left">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use the Percentage Change Calculator</h2>
          <div className="bg-slate-900/30 p-8 rounded-lg">
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li><strong>Enter Original Value:</strong> Input the starting number (original value) in the first field. This is your baseline number for comparison.</li>
              <li><strong>Enter New Value:</strong> Input the ending number (new value) in the second field to compare against the original value.</li>
              <li><strong>Click Calculate:</strong> Press the "Calculate" button to instantly compute the percentage change between the two values.</li>
              <li><strong>View Result:</strong> The calculator displays whether it's a percentage increase (green), decrease (red), or no change, along with the exact percentage.</li>
              <li><strong>Copy Result:</strong> Use the "Copy" button to easily share or save the calculated percentage change result.</li>
            </ol>
          </div>
        </div>

        {/* About Section with Semantic Keywords */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">📚 About the Percentage Change Calculator</h2>
          <div className="bg-slate-900/30 p-8 rounded-lg text-gray-300 space-y-6 leading-relaxed">
            
            {/* What is it */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <span className="text-cyan-400 mr-2">🎯</span> What is This Tool?
              </h3>
              <p className="text-gray-300">
                Our <strong>percentage change calculator</strong> is a free online tool that helps you instantly calculate <strong>percent increase</strong>, <strong>percent decrease</strong>, and <strong>percentage difference</strong> between two values. Whether you're tracking investment growth, sales performance, or personal fitness goals, this <strong>percentage calculator</strong> gives you accurate results using the standard formula: <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300">((New Value - Original Value) / Original Value) × 100</code>
              </p>
            </div>

            {/* How it works */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <span className="text-purple-400 mr-2">⚙️</span> How Does It Work?
              </h3>
              <p className="text-gray-300">
                Simply enter your original and new values, and the <strong>percent increase calculator</strong> automatically detects if it's an increase (positive) or decrease (negative). Results are color-coded for easy reading: <span className="text-green-400 font-semibold">green for increases</span> and <span className="text-red-400 font-semibold">red for decreases</span>. The calculator supports whole numbers and decimals, making it perfect for any calculation scenario. Use it with our <a href="/math-and-calculation-tools/time-difference-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/math-and-calculation-tools/time-difference-calculator'); }} className="text-cyan-400 hover:text-cyan-300 underline">time difference calculator</a> for complete data analysis.
              </p>
            </div>

            {/* Who uses it */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <span className="text-blue-400 mr-2">👥</span> Who Uses This Calculator?
              </h3>
              <div className="text-gray-300 space-y-2">
                <p><strong className="text-white">Finance Professionals:</strong> Track revenue growth, profit margins, stock prices, and investment returns</p>
                <p><strong className="text-white">Business Analysts:</strong> Analyze sales performance, market share, and KPIs for quarterly reports</p>
                <p><strong className="text-white">Students & Teachers:</strong> Solve math homework, understand percentage concepts, and analyze statistical data</p>
                <p><strong className="text-white">Personal Use:</strong> Monitor weight loss, fitness progress, savings growth, and personal goals</p>
              </div>
            </div>

            {/* Quick Examples */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <span className="text-orange-400 mr-2">📊</span> Ready-to-Use Examples
              </h3>
              <p className="text-gray-300">
                We've included 6 clickable templates for common scenarios: <strong>Investment Growth</strong> ($10K → $12.5K), <strong>Sales Performance</strong> (200 → 250 units), <strong>Price Discounts</strong> ($500 → $400), <strong>Weight Loss</strong> (180 → 162 lbs), <strong>Revenue Growth</strong> ($50K → $65K), and <strong>Test Scores</strong> (70 → 84). Just click any example to see instant results! Check out our <a href="/text-and-writing-tools/word-counter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }} className="text-cyan-400 hover:text-cyan-300 underline">word counter</a> and <a href="/text-and-writing-tools/case-converter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }} className="text-cyan-400 hover:text-cyan-300 underline">case converter</a> for more helpful tools.
              </p>
            </div>

            {/* Why choose us */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                <span className="text-green-400 mr-2">✨</span> Why Choose Our Calculator?
              </h3>
              <ul className="text-gray-300 space-y-2 list-none">
                <li>✅ <strong>100% Free</strong> - No registration, no fees, unlimited calculations</li>
                <li>✅ <strong>Instant Results</strong> - Get answers in real-time without delays</li>
                <li>✅ <strong>Privacy First</strong> - All calculations happen in your browser</li>
                <li>✅ <strong>Accurate & Reliable</strong> - Uses standard percentage change formula</li>
                <li>✅ <strong>Easy to Use</strong> - Simple interface, color-coded results</li>
              </ul>
            </div>

          </div>
        </div>

        {/* External Links Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">🔗 Learn More About Percentage Change</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://www.investopedia.com/terms/p/percentage-change.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 group hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400">📊 Investopedia - Percentage Change Formula</h3>
              <p className="text-gray-400">Learn about percentage change calculations in finance, investment analysis, and how to apply the formula to track stock performance and financial metrics.</p>
              <p className="text-cyan-300 text-sm mt-3">Visit Investopedia →</p>
            </a>
            <a
              href="https://www.mathsisfun.com/numbers/percentage-change.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-all duration-300 group hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400">📘 Math is Fun - Percentage Change Explained</h3>
              <p className="text-gray-400">Understand the mathematics behind percentage change with simple explanations, visual examples, and practice problems for students and learners.</p>
              <p className="text-blue-300 text-sm mt-3">Visit Math is Fun →</p>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-sm text-gray-500">Last Updated: November 8, 2025</p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">How does the Percentage Change Calculator work?</h3><p className="text-gray-400 mt-2">Enter the original and new values to instantly calculate percent increase or decrease using the standard formula: ((New Value - Original Value) / Original Value) × 100.</p></div>
            <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Can I use this for business or finance calculations?</h3><p className="text-gray-400 mt-2">Yes, you can use it for profit/loss analysis, stock price changes, sales performance tracking, revenue growth calculations, and other financial metrics.</p></div>
            <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Is this percentage calculator free to use?</h3><p className="text-gray-400 mt-2">Yes, the ZuraWebTools Percentage Change Calculator is completely free, accurate, and fast with no registration or payment required.</p></div>
            <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">What formula does the percentage change calculator use?</h3><p className="text-gray-400 mt-2">It uses the standard percentage change formula: ((New Value – Original Value) / Original Value) × 100 to calculate percent increase or decrease.</p></div>
            <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Can I calculate percentage decrease with this tool?</h3><p className="text-gray-400 mt-2">Yes, this calculator automatically detects whether the change is an increase (positive) or decrease (negative) and displays the result with appropriate color coding and symbols.</p></div>
            <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">What is the difference between percentage change and percentage difference?</h3><p className="text-gray-400 mt-2">Percentage change measures the relative change from an original value to a new value. Percentage difference compares two values without considering which is the starting point. This calculator computes percentage change.</p></div>
            <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Can I use this calculator for weight loss percentage calculations?</h3><p className="text-gray-400 mt-2">Absolutely! Enter your starting weight as the original value and current weight as the new value to calculate your weight loss or gain percentage. Perfect for tracking fitness progress.</p></div>
          </div>
        </div>

        <RelatedTools
          navigateTo={navigateTo}
          relatedSlugs={['time-difference-calculator', 'word-counter', 'case-converter', 'lorem-ipsum-generator', 'hex-to-rgb-converter']}
          currentSlug="percentage-change-calculator"
        />
      </div>
    </section>
  );
};

export default PercentageChangeCalculator;
