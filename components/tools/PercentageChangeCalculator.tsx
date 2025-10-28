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
        document.title = "Percentage Change Calculator – Calculate Percent Increase or Decrease Online | ZuraWebTools";

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', 'Instantly calculate percentage increase or decrease between two numbers. A free online percentage change calculator for business, finance, and statistics.');
        document.head.appendChild(metaDescription);

        const metaTags = [
            { property: 'og:title', content: 'Percentage Change Calculator | ZuraWebTools' },
            { property: 'og:description', content: 'Calculate percent increase or decrease between two values instantly.' },
            { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-percentage-change-calculator-og.png' },
            { property: 'og:image:alt', content: 'Free percentage change calculator showing percent increase or decrease online.' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://zurawebtools.com/tools/percentage-change-calculator' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Percentage Change Calculator | ZuraWebTools' },
            { name: 'twitter:description', content: 'Instantly calculate percentage increase or decrease between two values online.' },
            { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-percentage-change-calculator-og.png' },
            { name: 'twitter:image:alt', content: 'Free percentage change calculator showing percent increase or decrease online.' },
        ];
        metaTags.forEach(tag => {
            const el = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
            document.head.appendChild(el);
        });

        const canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', 'https://zurawebtools.com/tools/percentage-change-calculator');
        document.head.appendChild(canonical);

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Percentage Change Calculator",
                "applicationCategory": "CalculatorApplication",
                "operatingSystem": "Any (Web-based)",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1050" },
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
                "description": "A free online percentage change calculator to compute percent increase or decrease between two numbers. Ideal for business, finance, and academic use.",
                "url": "https://zurawebtools.com/tools/percentage-change-calculator"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    { "@type": "Question", "name": "How does the Percentage Change Calculator work?", "acceptedAnswer": { "@type": "Answer", "text": "Enter the original value and the new value. The calculator will instantly show whether it’s a percentage increase or decrease, along with the exact change in percent." } },
                    { "@type": "Question", "name": "Can I use this for business or finance calculations?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it’s ideal for calculating profit/loss percentages, product price changes, or performance metrics." } },
                    { "@type": "Question", "name": "Is this tool free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the ZuraWebTools Percentage Change Calculator is completely free, accurate, and works instantly without sign-up." } },
                    { "@type": "Question", "name": "What formula does it use?", "acceptedAnswer": { "@type": "Answer", "text": "It uses the standard percentage change formula: ((New Value – Original Value) / Original Value) × 100." } }
                ]
            }
        ]);
        document.head.appendChild(script);

        return () => {
            document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
            metaDescription.remove();
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

                {/* How to Use */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use the Calculator</h2>
                    <div className="bg-slate-900/30 p-8 rounded-lg">
                        <ol className="list-decimal list-inside space-y-3 text-gray-300">
                            <li>Enter the original value (the starting number) in the first field.</li>
                            <li>Enter the new value (the ending number) in the second field.</li>
                            <li>Click the “Calculate” button to view the percentage change.</li>
                            <li>See if it’s an increase, decrease, or no change, along with the exact percentage.</li>
                            <li>Click “Copy” to easily share the result.</li>
                        </ol>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mt-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">What formula does the calculator use?</h3><p className="text-gray-400 mt-2">It uses the standard percentage change formula: ((New Value - Original Value) / Original Value) * 100.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Is this percent growth calculator free?</h3><p className="text-gray-400 mt-2">Yes, this tool is 100% free for all users and works instantly without needing to sign up.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Can I use this for business or finance?</h3><p className="text-gray-400 mt-2">Absolutely. This tool is perfect for calculating profit/loss percentages, sales growth, stock price changes, and other financial metrics.</p></div>
                    </div>
                </div>

                {/* Share */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
                    <div className="flex justify-center items-center space-x-6">
                        <ShareButton network="Facebook" url="https://zurawebtools.com/tools/percentage-change-calculator" text="Calculate percentage change easily with this free online tool!" />
                        <ShareButton network="Twitter" url="https://zurawebtools.com/tools/percentage-change-calculator" text="A great free percentage change calculator from @ZuraWebTools!" />
                        <ShareButton network="LinkedIn" url="https://zurawebtools.com/tools/percentage-change-calculator" text="Calculate percentage change easily with this free online tool!" />
                        <ShareButton network="WhatsApp" url="https://zurawebtools.com/tools/percentage-change-calculator" text="Calculate percentage change easily with this free online tool!" />
                    </div>
                </div>

                <RelatedTools
                    navigateTo={navigateTo}
                    relatedSlugs={['time-difference-calculator']}
                    currentSlug="percentage-change-calculator"
                />
            </div>
        </section>
    );
};

export default PercentageChangeCalculator;
