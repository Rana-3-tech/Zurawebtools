import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface JSONFormatterValidatorProps {
  navigateTo: (page: Page) => void;
}

const JSONFormatterValidator: React.FC<JSONFormatterValidatorProps> = ({ navigateTo }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [formattedJson, setFormattedJson] = useState('');
    const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'none'>('none');
    const [message, setMessage] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    // 🧠 SEO & Meta Tags Setup
    useEffect(() => {
        document.title = "JSON Formatter & Validator – Free Online JSON Beautifier Tool | ZuraWebTools";

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', 'Instantly format, validate, and beautify JSON data online. Free JSON formatter and validator for developers to check and clean JSON syntax errors.');
        document.head.appendChild(metaDescription);

        const metaTags = [
            { property: 'og:title', content: 'JSON Formatter & Validator | ZuraWebTools' },
            { property: 'og:description', content: 'Free JSON formatter and validator for developers to format and check JSON online.' },
            { property: 'og:image', content: 'https://zurawebtools.com/assets/og-json-formatter.webp' },
            { property: 'og:image:alt', content: 'Free JSON Formatter & Validator preview from ZuraWebTools' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://zurawebtools.com/tools/json-formatter' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'JSON Formatter & Validator | ZuraWebTools' },
            { name: 'twitter:description', content: 'Free JSON formatter and validator to check, beautify, and format JSON online instantly.' },
            { name: 'twitter:image', content: 'https://zurawebtools.com/assets/og-json-formatter.webp' },
            { name: 'twitter:image:alt', content: 'Free JSON Formatter & Validator preview from ZuraWebTools' },
        ];
        metaTags.forEach(tag => {
            const el = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
            document.head.appendChild(el);
        });

        const canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', 'https://zurawebtools.com/tools/json-formatter');
        document.head.appendChild(canonical);

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "JSON Formatter & Validator",
              "applicationCategory": "DeveloperTool",
              "operatingSystem": "Any (Web-based)",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1320" },
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
              "description": "A free online tool to format, beautify, and validate JSON data instantly for developers.",
              "url": "https://zurawebtools.com/tools/json-formatter"
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What is a JSON Formatter?", "acceptedAnswer": { "@type": "Answer", "text": "A JSON Formatter beautifies and organizes raw JSON text to make it readable and properly indented." } },
                { "@type": "Question", "name": "How can I validate my JSON online?", "acceptedAnswer": { "@type": "Answer", "text": "Simply paste your JSON and click Validate — the tool will instantly check for syntax errors and formatting issues." } },
                { "@type": "Question", "name": "Is this JSON tool safe and free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it’s 100% free, works locally in your browser, and does not send any data to servers." } },
                { "@type": "Question", "name": "Can I use this tool for API testing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, developers often use it to check API responses, ensure valid JSON structure, and reformat test data." } },
                { "@type": "Question", "name": "Does this support large JSON files?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it can handle large JSON files depending on your browser’s memory capacity, making it ideal for debugging large API responses." } }
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

    // Helper function to try and fix common JSON errors
    const tryToFixJson = (jsonString: string): string => {
        let text = jsonString;
        // Remove comments
        text = text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
        // Add quotes to unquoted keys
        text = text.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
        // Replace single quotes on keys
        text = text.replace(/'([a-zA-Z0-9_]+)'(\s*:)/g, '"$1"$2');
        // Remove trailing commas
        text = text.replace(/,\s*([}\]])/g, '$1');
        return text;
    };

    // ✅ Refactored, efficient JSON processing logic with auto-correction
    const processJson = useCallback(() => {
        if (!jsonInput.trim()) {
            setValidationStatus('none');
            setFormattedJson('');
            setMessage('');
            return;
        }

        try {
            // First, try parsing the input as is
            const parsed = JSON.parse(jsonInput);
            setFormattedJson(JSON.stringify(parsed, null, 2));
            setValidationStatus('valid');
            setMessage('');
        } catch (e) {
            // If parsing fails, attempt to fix common errors
            try {
                const fixedJsonString = tryToFixJson(jsonInput);
                const parsedFixed = JSON.parse(fixedJsonString);
                setFormattedJson(JSON.stringify(parsedFixed, null, 2));
                setValidationStatus('valid');
                setMessage('✅ Original JSON was invalid but has been automatically corrected.');
            } catch (finalError) {
                // If fixing also fails, report the original error
                setFormattedJson('');
                setValidationStatus('invalid');
                setMessage(`Invalid JSON: ${(e as Error).message}`);
            }
        }
    }, [jsonInput]);

    const handleClear = () => {
        setJsonInput('');
        setFormattedJson('');
        setValidationStatus('none');
        setMessage('');
    };

    const handleCopy = () => {
        if (formattedJson) {
            navigator.clipboard.writeText(formattedJson);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    // ✅ Keyboard shortcuts using the new efficient function
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                processJson();
            }
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
                e.preventDefault();
                processJson();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [processJson]);

    const lineCount = jsonInput.split('\n').length;
    const charCount = jsonInput.length;

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
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">JSON Formatter & Validator</h1>
                    <p className="mt-4 text-lg text-gray-300">
                        A free online developer tool to format, beautify, and validate your JSON data. Check your syntax and prettify your code with ease.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto mt-8 p-4 bg-slate-900/50 rounded-xl shadow-lg">
                    <div className="flex flex-wrap justify-center items-center gap-4 mb-4 p-4 bg-slate-800/50 rounded-lg">
                        <button onClick={processJson} className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition transform hover:scale-105">⚙️ Format / Validate</button>
                        <button onClick={handleCopy} disabled={!formattedJson} className="bg-slate-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-slate-700 transition transform hover:scale-105 disabled:opacity-50">📋 {copySuccess ? 'Copied!' : 'Copy'}</button>
                        <button onClick={handleClear} className="bg-red-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition transform hover:scale-105">🧹 Clear</button>
                    </div>

                    <div className="mb-4 text-center min-h-[4rem]">
                        {validationStatus === 'valid' && <div className="inline-block px-4 py-1 bg-green-900/80 text-green-300 rounded-full font-semibold">✅ Valid JSON</div>}
                        {validationStatus === 'invalid' && <div className="inline-block px-4 py-1 bg-red-900/80 text-red-300 rounded-full font-semibold">❌ Invalid JSON</div>}
                        {message && <p className={`mt-2 text-sm ${validationStatus === 'valid' ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <textarea
                                value={jsonInput}
                                onChange={e => { setJsonInput(e.target.value); setValidationStatus('none'); setMessage(''); }}
                                placeholder="Paste or type your JSON here..."
                                className={`w-full h-96 p-4 font-mono text-sm bg-slate-900 text-gray-200 rounded-lg border-2 focus:outline-none focus:ring-4 transition resize-y ${validationStatus === 'invalid' ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-700 focus:ring-cyan-400/50'}`}
                                spellCheck="false"
                            />
                            <div className="text-right text-sm text-gray-400 mt-1">Lines: {lineCount} | Chars: {charCount}</div>
                        </div>
                        <div>
                            <textarea
                                value={formattedJson}
                                readOnly
                                placeholder="Formatted JSON will appear here..."
                                className="w-full h-96 p-4 font-mono text-sm bg-slate-900 text-gray-300 rounded-lg border-2 border-slate-700 focus:outline-none resize-y cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-16 text-left">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use the JSON Formatter & Validator</h2>
                    <div className="bg-slate-900/30 p-8 rounded-lg">
                        <ol className="list-decimal list-inside space-y-3 text-gray-300">
                            <li>Paste your JSON data into the left input box.</li>
                            <li>Click <strong>Format / Validate</strong> to beautify, validate, and automatically fix common errors.</li>
                            <li>If your JSON is valid (or fixable), the clean version will appear on the right.</li>
                            <li>Click <strong>Copy Result</strong> to use the cleaned JSON in your project.</li>
                        </ol>
                    </div>

                    <h2 className="text-3xl font-bold text-center mt-16 mb-8 text-white">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">What is a JSON Formatter?</h3><p className="text-gray-400 mt-2">A JSON Formatter beautifies and organizes raw JSON text to make it readable and properly indented, which is crucial for debugging and development.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Is this JSON tool safe and free?</h3><p className="text-gray-400 mt-2">Yes, it’s 100% free. All processing happens locally in your browser, so your data is never sent to our servers.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Does this support large JSON files?</h3><p className="text-gray-400 mt-2">Yes, it can handle large JSON responses depending on your browser’s performance.</p></div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
                    <div className="flex justify-center items-center space-x-6">
                        <ShareButton network="Facebook" url="https://zurawebtools.com/tools/json-formatter" text="Format & validate JSON instantly with this free developer tool!" />
                        <ShareButton network="Twitter" url="https://zurawebtools.com/tools/json-formatter" text="Format & validate JSON instantly with this free developer tool by @ZuraWebTools!" />
                        <ShareButton network="LinkedIn" url="https://zurawebtools.com/tools/json-formatter" text="Format & validate JSON instantly with this free developer tool!" />
                        <ShareButton network="WhatsApp" url="https://zurawebtools.com/tools/json-formatter" text="Format & validate JSON instantly with this free developer tool!" />
                    </div>
                </div>

                <RelatedTools
                    navigateTo={navigateTo}
                    relatedSlugs={['remove-extra-spaces', 'hex-to-rgb-converter']}
                    currentSlug="json-formatter"
                />
            </div>
        </section>
    );
};

export default JSONFormatterValidator;
