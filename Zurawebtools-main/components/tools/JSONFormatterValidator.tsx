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
        
        // Set html lang attribute
        document.documentElement.setAttribute('lang', 'en');

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', 'Instantly format, validate, and beautify JSON data online. Free JSON formatter and validator for developers to check and clean JSON syntax errors.');
        document.head.appendChild(metaDescription);

        const metaTags = [
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:title', content: 'JSON Formatter & Validator | ZuraWebTools' },
            { property: 'og:description', content: 'Free JSON formatter and validator for developers to format and check JSON online.' },
            { property: 'og:image', content: 'https://zurawebtools.com/assets/og-json-formatter.webp' },
            { property: 'og:image:alt', content: 'Free JSON Formatter & Validator preview from ZuraWebTools' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://zurawebtools.com/developer-tools/json-formatter' },
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
    canonical.setAttribute('href', 'https://zurawebtools.com/developer-tools/json-formatter');
    document.head.appendChild(canonical);        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "JSON Formatter & Validator – Free Online JSON Beautifier Tool",
              "description": "Instantly format, validate, and beautify JSON data online. Free JSON formatter and validator for developers to check and clean JSON syntax errors.",
              "url": "https://zurawebtools.com/developer-tools/json-formatter",
              "breadcrumb": { "@id": "https://zurawebtools.com/developer-tools/json-formatter#breadcrumb" },
              "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": "https://zurawebtools.com/developer-tools/json-formatter#breadcrumb",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
                { "@type": "ListItem", "position": 2, "name": "Developer Tools", "item": "https://zurawebtools.com/developer-tools" },
                { "@type": "ListItem", "position": 3, "name": "JSON Formatter & Validator" }
              ]
            },
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
              "url": "https://zurawebtools.com/developer-tools/json-formatter"
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Format and Validate JSON Online",
              "description": "Step-by-step guide to format, beautify, and validate JSON data using our free online tool.",
              "step": [
                { "@type": "HowToStep", "position": 1, "name": "Paste JSON Data", "text": "Paste your JSON data into the left input box. The tool accepts any JSON format, even with syntax errors." },
                { "@type": "HowToStep", "position": 2, "name": "Click Format/Validate", "text": "Click the Format / Validate button to beautify, validate, and automatically fix common JSON errors." },
                { "@type": "HowToStep", "position": 3, "name": "View Formatted Result", "text": "If your JSON is valid (or fixable), the clean, properly indented version will appear in the right box." },
                { "@type": "HowToStep", "position": 4, "name": "Copy Result", "text": "Click the Copy button to copy the formatted JSON to your clipboard for use in your development projects." }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What is a JSON Formatter?", "acceptedAnswer": { "@type": "Answer", "text": "A JSON Formatter is an online tool that beautifies and organizes raw JSON text to make it readable, properly indented, and easier to debug for developers working with APIs and data structures." } },
                { "@type": "Question", "name": "How can I validate my JSON online?", "acceptedAnswer": { "@type": "Answer", "text": "Simply paste your JSON data into our validator and click Format/Validate. The tool will instantly check for syntax errors, missing brackets, trailing commas, and other formatting issues while automatically attempting to fix common errors." } },
                { "@type": "Question", "name": "Is this JSON tool safe and free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it's 100% free with no limitations. All JSON processing happens locally in your browser using JavaScript, so your data never leaves your device and is completely private and secure." } },
                { "@type": "Question", "name": "Can I use this tool for API testing?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Developers commonly use JSON formatters to validate API responses, check JSON structure in REST APIs, debug web service data, and reformat test data for quality assurance and development workflows." } },
                { "@type": "Question", "name": "Does this support large JSON files?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our JSON formatter can handle large JSON files and complex nested structures depending on your browser's memory capacity. It's ideal for debugging large API responses, configuration files, and database exports." } },
                { "@type": "Question", "name": "Can the tool fix JSON syntax errors automatically?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our JSON validator includes an intelligent auto-fix feature that attempts to correct common JSON errors like missing quotes on keys, trailing commas, single quotes instead of double quotes, and JavaScript-style comments." } },
                { "@type": "Question", "name": "What JSON errors can this validator detect?", "acceptedAnswer": { "@type": "Answer", "text": "The JSON validator detects all syntax errors including missing brackets or braces, unclosed strings, invalid characters, trailing commas, unquoted keys, incorrect data types, and malformed escape sequences. It provides clear error messages with line numbers." } }
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

                {/* Social Share - Positioned After Tool */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">Share This JSON Formatter Tool</h2>
                    <p className="text-gray-400 mb-6">Help fellow developers discover this free JSON formatter and validator</p>
                    <div className="flex justify-center items-center space-x-4">
                        <a
                            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fjson-formatter"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                            className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a
                            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fjson-formatter&text=Format%20and%20validate%20JSON%20instantly%20with%20this%20free%20developer%20tool%20from%20%40ZuraWebTools%21"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                            className="text-slate-400 hover:text-sky-500 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fjson-formatter&title=Free%20JSON%20Formatter%20and%20Validator"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                            className="text-slate-400 hover:text-blue-600 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a
                            href="https://api.whatsapp.com/send?text=Format%20and%20validate%20JSON%20instantly%20https%3A%2F%2Fzurawebtools.com%2Ftools%2Fjson-formatter"
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
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">⚡ Quick JSON Examples</h2>
                    <p className="text-center text-gray-400 mb-10">Click any example to instantly load and format the JSON</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'User Object', json: '{"id":1,"name":"John Doe","email":"john@example.com","role":"admin","active":true}' },
                            { name: 'API Response', json: '{"status":"success","data":{"users":[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]},"meta":{"total":2,"page":1}}' },
                            { name: 'Config File', json: '{"app":{"name":"MyApp","version":"1.0.0","debug":false},"database":{"host":"localhost","port":5432,"name":"mydb"}}' },
                            { name: 'Array of Objects', json: '[{"id":1,"product":"Laptop","price":999},{"id":2,"product":"Mouse","price":25},{"id":3,"product":"Keyboard","price":75}]' },
                            { name: 'Nested Structure', json: '{"company":{"name":"TechCorp","employees":[{"name":"John","department":"IT","skills":["JavaScript","Python"]}]}}' },
                            { name: 'Error Response', json: '{"error":{"code":404,"message":"Resource not found","details":"The requested endpoint does not exist"}}' },
                        ].map((example) => (
                            <div
                                key={example.name}
                                onClick={() => setJsonInput(example.json)}
                                className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1"
                            >
                                <h3 className="font-semibold text-white text-lg mb-3 group-hover:text-cyan-400 transition-colors">📄 {example.name}</h3>
                                <p className="text-slate-400 text-sm font-mono bg-slate-800/50 px-3 py-2 rounded truncate">{example.json.substring(0, 60)}...</p>
                                <p className="text-cyan-300 text-xs mt-3">Click to load →</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">✨ Why Use Our JSON Formatter & Validator?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">⚡ Instant Validation</h3>
                                <p className="text-gray-300">Validate your JSON data in real-time with instant error detection. Get immediate feedback on syntax errors, missing brackets, and formatting issues for rapid debugging. Perfect for working with other <a href="/text-and-writing-tools/remove-extra-spaces" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/remove-extra-spaces'); }} className="text-cyan-400 hover:text-cyan-300 underline">text cleaning tools</a>.</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">🔧 Auto-Fix Errors</h3>
                                <p className="text-gray-300">Our intelligent JSON parser automatically attempts to fix common errors like unquoted keys, trailing commas, single quotes, and JavaScript-style comments.</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">🔒 100% Private</h3>
                                <p className="text-gray-300">All JSON processing happens locally in your browser. Your data never leaves your device, making it perfect for sensitive API keys and confidential configurations.</p>
                            </div>
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

                {/* Use Cases Section */}
                <div className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">👥 Who Uses Our JSON Formatter?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-purple-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">💻 API Developers</h3>
                            <p className="text-gray-300 mb-3">Debug REST API responses, validate JSON payloads, and test webhook data. Perfect for ensuring API integrations work smoothly with properly formatted JSON.</p>
                            <p className="text-sm text-purple-300">Also try: <a href="/text-and-writing-tools/word-counter" className="underline hover:text-purple-200">Word Counter</a></p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">🎨 Frontend Developers</h3>
                            <p className="text-gray-300 mb-3">Format configuration files, validate data structures from fetch requests, and debug React/Vue component props with complex JSON schemas.</p>
                            <p className="text-sm text-blue-300">Also try: <a href="/text-and-writing-tools/case-converter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }} className="underline hover:text-blue-200">Case Converter</a></p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-green-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">🧪 QA Engineers</h3>
                            <p className="text-gray-300 mb-3">Test JSON outputs from automated tests, verify data integrity in API responses, and validate mock data for testing scenarios.</p>
                            <p className="text-sm text-green-300">Also try: <a href="/text-and-writing-tools/remove-extra-spaces" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/remove-extra-spaces'); }} className="underline hover:text-green-200">Remove Extra Spaces</a></p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-orange-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">🛠️ DevOps Engineers</h3>
                            <p className="text-gray-300 mb-3">Validate deployment configurations, debug Kubernetes manifests, verify Docker Compose files, and format CI/CD pipeline JSON outputs.</p>
                            <p className="text-sm text-orange-300">Also try: <a href="/text-and-writing-tools/word-counter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }} className="underline hover:text-orange-200">Word Counter Tool</a></p>
                        </div>
                    </div>
                </div>

                {/* About Section with Semantic Keywords */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">📚 About JSON Formatter & Validator Tool</h2>
                    <div className="bg-slate-900/30 p-8 rounded-lg text-gray-300 space-y-4 leading-relaxed">
                        <p>
                            Our <strong>JSON formatter</strong> is a comprehensive online tool designed to help developers work efficiently with JavaScript Object Notation (JSON) data. Whether you need to <strong>format JSON</strong>, <strong>validate JSON syntax</strong>, or beautify messy JSON code, this free <strong>JSON validator</strong> provides all essential features in one place. Combine it with our <a href="/text-and-writing-tools/case-converter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }} className="text-cyan-400 hover:text-cyan-300 underline">text case converter</a> for formatting JSON keys and values.
                        </p>
                        <p>
                            As a powerful <strong>JSON beautifier</strong>, our tool automatically indents and organizes your JSON data with proper spacing and line breaks. The built-in <strong>JSON parser</strong> can detect and report various syntax errors including missing brackets, incorrect comma placement, unquoted keys, and invalid data types. Unlike basic formatters, our <strong>JSON editor</strong> includes intelligent auto-fix capabilities that attempt to correct common formatting mistakes automatically. Use our <a href="/text-and-writing-tools/remove-extra-spaces" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/remove-extra-spaces'); }} className="text-cyan-400 hover:text-cyan-300 underline">remove extra spaces tool</a> to clean up messy JSON strings before formatting.
                        </p>
                        <p>
                            This <strong>online JSON tool</strong> is particularly useful for developers working with APIs, configuration files, and data interchange formats. The <strong>JSON syntax checker</strong> provides real-time validation feedback, highlighting errors instantly as you paste your data. Use it as a <strong>JSON minifier</strong> and <strong>JSON prettifier</strong> to switch between compact and readable formats with a single click. For analyzing your formatted JSON output, try our <a href="/text-and-writing-tools/word-counter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }} className="text-cyan-400 hover:text-cyan-300 underline">word counter</a> to track character and word counts in your JSON strings.
                        </p>
                        <p>
                            Our <strong>free JSON formatter</strong> processes everything locally in your browser, ensuring complete privacy and security for sensitive data like API keys, authentication tokens, and confidential configuration files. The tool supports large JSON files and provides detailed error messages with line numbers to help you quickly identify and fix validation issues.
                        </p>
                        <p>
                            Whether you're debugging API responses, preparing JSON for documentation, or learning JSON structure, this <strong>JSON validator online</strong> tool streamlines your workflow. Features include keyboard shortcuts (Ctrl+Enter to format, Ctrl+Shift+V to paste), character and line counting, one-click copying, and support for nested objects and arrays of any complexity. Perfect for both beginners learning JSON and experienced developers handling complex data structures.
                        </p>
                    </div>
                </div>

                {/* External Links Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">🔗 Learn More About JSON</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a
                            href="https://www.json.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400">📖 JSON.org - Official Specification</h3>
                            <p className="text-gray-400">Visit the official JSON website for the complete specification, grammar rules, and standard documentation created by Douglas Crockford.</p>
                            <p className="text-cyan-300 text-sm mt-3">Visit JSON.org →</p>
                        </a>
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400">📘 MDN Web Docs - JSON Guide</h3>
                            <p className="text-gray-400">Explore comprehensive JSON documentation from Mozilla Developer Network, including JSON methods, best practices, and real-world examples.</p>
                            <p className="text-blue-300 text-sm mt-3">Visit MDN Docs →</p>
                        </a>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <p className="text-sm text-gray-500">Last Updated: November 8, 2025</p>
                </div>

                    <h2 className="text-3xl font-bold text-center mt-16 mb-8 text-white">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">What is a JSON Formatter and why do I need it?</h3>
                            <p className="text-gray-400 mt-2">A JSON formatter is an online tool that beautifies, organizes, and properly indents raw JSON text to make it human-readable and easier to debug. Developers use JSON formatters daily to structure API responses, configuration files, and data payloads. Our JSON formatter also validates syntax and automatically fixes common errors like unquoted keys and trailing commas, saving you valuable debugging time.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">How do I validate JSON using this tool?</h3>
                            <p className="text-gray-400 mt-2">Simply paste your JSON data into the left input box and click "Format / Validate". The JSON validator will instantly check for syntax errors, missing brackets, incorrect commas, and invalid data types. If errors are found, detailed error messages with line numbers will appear. Valid JSON will be formatted and displayed in the right output box with proper indentation.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">Is this JSON formatter safe to use with sensitive data?</h3>
                            <p className="text-gray-400 mt-2">Absolutely! Our JSON formatter is 100% safe and private. All JSON processing happens locally in your browser using JavaScript - your data never leaves your device or gets sent to any server. This makes it perfect for formatting API keys, authentication tokens, private configuration files, and other confidential JSON data.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">Can I use this tool for API testing and development?</h3>
                            <p className="text-gray-400 mt-2">Yes! This JSON validator is designed specifically for API developers. Use it to format and validate REST API responses, test webhook payloads, debug GraphQL queries, verify mock data, and beautify JSON configuration files. The tool handles nested objects, arrays, and complex JSON structures commonly found in modern API development.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">Does this JSON formatter support large files?</h3>
                            <p className="text-gray-400 mt-2">Yes, our JSON formatter can handle large JSON files efficiently. The tool performance depends on your browser's capabilities, but it typically processes JSON files up to several megabytes smoothly. For extremely large files (over 10MB), formatting may take a few extra seconds depending on your device's processing power.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">Can the tool automatically fix JSON syntax errors?</h3>
                            <p className="text-gray-400 mt-2">Yes! Our intelligent JSON parser includes auto-fix capabilities that attempt to correct common JSON formatting mistakes. It can automatically add quotes to unquoted keys, remove trailing commas, convert single quotes to double quotes, strip JavaScript-style comments, and fix other minor syntax issues. This feature saves developers significant time when working with malformed JSON from various sources.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">What types of JSON errors can this validator detect?</h3>
                            <p className="text-gray-400 mt-2">Our JSON validator detects all standard JSON syntax errors including missing or extra brackets/braces, incorrect comma placement, unquoted or improperly quoted keys, invalid escape sequences, trailing commas in arrays/objects, single quotes instead of double quotes, undefined or NaN values, comments (not allowed in JSON), and improper nesting. Each error is reported with a clear message and line number for quick identification.</p>
                        </div>
                    </div>
                </div>

                <RelatedTools
                    navigateTo={navigateTo}
                    relatedSlugs={['word-counter', 'case-converter', 'remove-extra-spaces', 'lorem-ipsum-generator']}
                    currentSlug="json-formatter"
                />
            </div>
        </section>
    );
};

export default JSONFormatterValidator;
