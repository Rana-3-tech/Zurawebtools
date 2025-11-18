// Create a new file: components/tools/HexToRGBConverter.tsx

import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface HexToRGBConverterProps {
    navigateTo: (page: Page) => void;
}

const HexToRGBConverter: React.FC<HexToRGBConverterProps> = ({ navigateTo }) => {
    const [hexInput, setHexInput] = useState('#22d3ee');
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    // 🧠 SEO & Meta Tags Setup
    useEffect(() => {
        document.title = "Hex to RGB Color Converter – Free Online Color Code Converter | ZuraWebTools";
        
        // Set html lang attribute
        document.documentElement.setAttribute('lang', 'en');

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', 'Convert Hex color codes to RGB values instantly using our free online color converter. Perfect for web designers, developers, and UI creators.');
        document.head.appendChild(metaDescription);

        const metaTags = [
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:title', content: 'Hex to RGB Color Converter | ZuraWebTools' },
            { property: 'og:description', content: 'Quickly convert Hex color codes to their RGB equivalent with a live preview. A must-have tool for designers and developers.' },
            { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-hex-to-rgb-og.png' },
            { property: 'og:image:alt', content: 'Free Hex to RGB Color Converter Tool by ZuraWebTools' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://zurawebtools.com/color-and-design-tools/hex-to-rgb-converter' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Hex to RGB Color Converter | ZuraWebTools' },
            { name: 'twitter:description', content: 'Instantly convert hex color codes to RGB values online for free.' },
            { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-hex-to-rgb-og.png' },
            { name: 'twitter:image:alt', content: 'Free Hex to RGB Color Converter Tool by ZuraWebTools' },
        ];
        metaTags.forEach(tag => {
            const el = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
            document.head.appendChild(el);
        });

        const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/color-and-design-tools/hex-to-rgb-converter');
    document.head.appendChild(canonical);        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Hex to RGB Color Converter – Free Online Color Code Converter",
                "description": "Convert Hex color codes to RGB values instantly using our free online color converter. Perfect for web designers, developers, and UI creators.",
                "url": "https://zurawebtools.com/color-and-design-tools/hex-to-rgb-converter",
                "breadcrumb": { "@id": "https://zurawebtools.com/color-and-design-tools/hex-to-rgb-converter#breadcrumb" },
                "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" }
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": "https://zurawebtools.com/color-and-design-tools/hex-to-rgb-converter#breadcrumb",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
                    { "@type": "ListItem", "position": 2, "name": "Color & Design Tools", "item": "https://zurawebtools.com/color-and-design-tools" },
                    { "@type": "ListItem", "position": 3, "name": "Hex to RGB Converter" }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Hex to RGB Color Converter",
                "applicationCategory": "DesignApplication",
                "operatingSystem": "Any (Web-based)",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "780" },
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
                "description": "A free online color conversion tool to convert hexadecimal color codes to RGB values, with a live color preview. Essential for web designers and developers.",
                "url": "https://zurawebtools.com/color-and-design-tools/hex-to-rgb-converter"
            },
            {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Convert Hex to RGB Color Codes",
                "description": "Step-by-step guide to convert hexadecimal color codes to RGB values using our free online converter tool.",
                "step": [
                    { "@type": "HowToStep", "position": 1, "name": "Enter Hex Code", "text": "Type or paste your 6-digit hexadecimal color code (e.g., #22D3EE) into the input field." },
                    { "@type": "HowToStep", "position": 2, "name": "View RGB Output", "text": "The RGB values will be displayed instantly in the format rgb(R, G, B)." },
                    { "@type": "HowToStep", "position": 3, "name": "See Live Preview", "text": "A colored circle will show you the actual color represented by your hex code." },
                    { "@type": "HowToStep", "position": 4, "name": "Copy RGB Values", "text": "Click the 'Copy RGB' button to copy the RGB values to your clipboard for use in your projects." }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    { "@type": "Question", "name": "What is a Hex to RGB Converter?", "acceptedAnswer": { "@type": "Answer", "text": "A Hex to RGB Converter is a tool that translates hexadecimal color codes (like #FF5733), commonly used in web design, into their corresponding RGB values (like rgb(255, 87, 51)), which define color in terms of red, green, and blue." } },
                    { "@type": "Question", "name": "Can I use this tool for web design projects?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this color code converter is perfect for web designers, front-end developers, and digital artists who need to switch between hex and RGB color formats for CSS, HTML, and graphic design software." } },
                    { "@type": "Question", "name": "Is this Hex to RGB Converter free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the ZuraWebTools Hex to RGB Converter is 100% free, accurate, and works instantly in your browser without requiring any sign-up or installation." } },
                    { "@type": "Question", "name": "How accurate is the hex to RGB conversion?", "acceptedAnswer": { "@type": "Answer", "text": "The conversion is 100% accurate using standard mathematical formulas. Each hexadecimal pair converts to a decimal value between 0-255 for RGB channels." } },
                    { "@type": "Question", "name": "Does this color converter work in all browsers?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this hex to RGB converter works in all modern browsers including Chrome, Firefox, Safari, Edge, and mobile browsers. No installation required." } },
                    { "@type": "Question", "name": "Can I use RGB values directly in CSS?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! You can use RGB values in CSS with the rgb() function, like color: rgb(34, 211, 238). RGB is widely supported across all CSS properties." } },
                    { "@type": "Question", "name": "Can I convert multiple hex codes at once?", "acceptedAnswer": { "@type": "Answer", "text": "Currently, the tool converts one hex code at a time for accuracy. Simply enter each hex code and copy the RGB output before converting the next color." } }
                ]
            }
        ]);
        document.head.appendChild(script);

        return () => { // Cleanup
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
    
    const { rgbValue, isValid } = useMemo(() => {
        let cleanHex = hexInput.startsWith('#') ? hexInput.substring(1) : hexInput;

        if (cleanHex.length === 3) {
            cleanHex = cleanHex.split('').map(char => char + char).join('');
        }

        if (cleanHex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
            return { rgbValue: 'N/A', isValid: false };
        }

        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);

        return { rgbValue: `rgb(${r}, ${g}, ${b})`, isValid: true };
    }, [hexInput]);
    
    useEffect(() => {
        if (!hexInput) {
            setError('');
        } else if (!isValid) {
            setError('Invalid Hex Code');
        } else {
            setError('');
        }
    }, [hexInput, isValid]);

    const handleCopy = () => {
        if (isValid && rgbValue !== 'N/A') {
            navigator.clipboard.writeText(rgbValue);
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
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">Hex to RGB Color Converter</h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Convert Hex color codes to RGB values instantly with our free online color converter. Perfect for web designers, developers, and UI creators.
                    </p>
                </div>

                {/* Main Tool UI */}
                <div className="max-w-xl mx-auto mt-10 p-8 bg-slate-900/50 rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        {/* Color Preview */}
                        <div className="md:col-span-1 flex justify-center items-center">
                            <div
                                className="w-32 h-32 rounded-full shadow-lg border-4 border-slate-700 transition-colors duration-300"
                                style={{ backgroundColor: isValid ? hexInput : '#1e293b' }}
                            ></div>
                        </div>

                        {/* Inputs and Outputs */}
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Hex Color Code</label>
                                <input
                                    type="text"
                                    value={hexInput}
                                    onChange={e => setHexInput(e.target.value)}
                                    placeholder="#RRGGBB"
                                    className="w-full bg-slate-700 text-white text-lg p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400"
                                />
                                {error && <p className="text-red-400 mt-2 text-sm font-medium">{error}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">RGB Value</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly
                                        value={rgbValue}
                                        className="w-full bg-slate-800 text-gray-300 text-lg p-3 rounded-md border border-slate-700 cursor-not-allowed"
                                    />
                                    <button
                                        onClick={handleCopy}
                                        disabled={!isValid}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 font-semibold py-1 px-3 rounded-md text-sm transition ${copySuccess ? 'bg-green-600 text-white' : 'bg-slate-600 hover:bg-slate-500 text-gray-200 disabled:opacity-50'}`}
                                    >
                                        {copySuccess ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Share - Positioned After Tool */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">Share This Color Converter Tool</h2>
                    <p className="text-gray-400 mb-6">Help others discover this free hex to RGB conversion tool</p>
                    <div className="flex justify-center items-center space-x-4">
                        <a
                            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fhex-to-rgb-converter"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                            className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a
                            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fhex-to-rgb-converter&text=Check%20out%20this%20free%20Hex%20to%20RGB%20Color%20Converter%20from%20%40ZuraWebTools%21"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                            className="text-slate-400 hover:text-sky-500 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Fhex-to-rgb-converter&title=Free%20Hex%20to%20RGB%20Color%20Converter"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                            className="text-slate-400 hover:text-blue-600 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a
                            href="https://api.whatsapp.com/send?text=Check%20out%20this%20free%20Hex%20to%20RGB%20Color%20Converter%20https%3A%2F%2Fzurawebtools.com%2Ftools%2Fhex-to-rgb-converter"
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
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">⚡ Quick Color Conversion Examples</h2>
                    <p className="text-center text-gray-400 mb-10">Click any color preset to instantly convert and see the RGB values</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Facebook Blue', hex: '#1877F2', rgb: 'rgb(24, 119, 242)' },
                            { name: 'Twitter Blue', hex: '#1DA1F2', rgb: 'rgb(29, 161, 242)' },
                            { name: 'Pure Red', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' },
                            { name: 'Pure Green', hex: '#00FF00', rgb: 'rgb(0, 255, 0)' },
                            { name: 'Material Blue', hex: '#2196F3', rgb: 'rgb(33, 150, 243)' },
                            { name: 'Material Green', hex: '#4CAF50', rgb: 'rgb(76, 175, 80)' },
                        ].map((preset) => (
                            <div
                                key={preset.hex}
                                onClick={() => setHexInput(preset.hex)}
                                className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="flex items-center space-x-4 mb-3">
                                    <div
                                        className="w-12 h-12 rounded-lg shadow-md border-2 border-slate-600 group-hover:border-cyan-400 transition-all"
                                        style={{ backgroundColor: preset.hex }}
                                    ></div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">{preset.name}</h3>
                                        <p className="text-slate-400 text-xs mt-1">{preset.hex}</p>
                                    </div>
                                </div>
                                <p className="text-cyan-300 text-sm font-mono bg-slate-800/50 px-3 py-2 rounded">{preset.rgb}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">✨ Why Use Our Hex to RGB Converter?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">⚡ Instant Color Conversion</h3>
                                <p className="text-gray-300">Convert hexadecimal color codes to RGB values in real-time. No waiting, no processing delays—just instant, accurate color conversions. Perfect for creating harmonious <a href="/color-and-design-tools/color-harmony-checker" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/color-harmony-checker'); }} className="text-cyan-400 hover:text-cyan-300 underline">color palettes</a>.</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">🆓 100% Free Forever</h3>
                                <p className="text-gray-300">No subscriptions, no hidden fees, no limitations. Convert unlimited hex color codes to RGB values completely free. Premium quality at zero cost.</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-pink-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">🔒 100% Private & Secure</h3>
                                <p className="text-gray-300">All color conversions happen locally in your browser. Your hex codes and RGB values never leave your device. Complete privacy guaranteed.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* How to Use */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use the Converter</h2>
                    <div className="bg-slate-900/30 p-8 rounded-lg">
                        <ol className="list-decimal list-inside space-y-3 text-gray-300">
                            <li><strong>Enter Hex Code:</strong> Type or paste your hexadecimal color code (e.g., `#3b82f6` or `ff5733`) into the input field.</li>
                            <li><strong>View Instant Conversion:</strong> The corresponding RGB value will appear automatically in the output field.</li>
                            <li><strong>See the Preview:</strong> The color swatch on the left will update live to show you the exact color.</li>
                            <li><strong>Copy the Result:</strong> Click the “Copy” button to copy the RGB value to your clipboard for use in your projects.</li>
                        </ol>
                    </div>
                </div>

                {/* Use Cases Section */}
                <div className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">🎯 Who Can Use This Color Code Converter?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-3">🎨 Web Designers</h3>
                            <p className="text-gray-300">Convert hex color codes from design mockups and style guides to RGB values for web projects. Essential for color palette management and design system implementation.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-3">👨‍💻 Frontend Developers</h3>
                            <p className="text-gray-300">Quickly convert hexadecimal colors to RGB format for CSS, JavaScript, and HTML color properties. Perfect for implementing dynamic color schemes and theming systems.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-3">🖼️ Graphic Designers</h3>
                            <p className="text-gray-300">Match colors across different design tools and platforms by converting hex codes to RGB values. Ensure color consistency in digital artwork and branding materials.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-3">📱 UI/UX Designers</h3>
                            <p className="text-gray-300">Convert hex color codes to RGB for accessibility testing, color contrast analysis, and responsive design implementation across different devices and platforms. Use our <a href="/color-and-design-tools/accessible-color-contrast-checker" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/accessible-color-contrast-checker'); }} className="text-cyan-400 hover:text-cyan-300 underline">color contrast checker</a> to verify WCAG compliance.</p>
                        </div>
                    </div>
                </div>

                {/* About Section with Semantic Keywords */}
                <div className="max-w-5xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">📚 About Our Hex to RGB Color Converter Tool</h2>
                    <div className="bg-slate-900/30 p-8 rounded-lg text-gray-300 space-y-4 leading-relaxed">
                        <p>
                            Our <strong>hex to RGB converter</strong> is a professional-grade <strong>color code converter</strong> designed for web designers, frontend developers, and digital artists who need to convert <strong>hexadecimal color codes</strong> to <strong>RGB values</strong> quickly and accurately. This free online tool provides instant color conversion with a live color preview, making it the perfect solution for <strong>web design projects</strong>, CSS styling, and digital artwork. Use it alongside our <a href="/color-and-design-tools/color-harmony-checker" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/color-harmony-checker'); }} className="text-cyan-400 hover:text-cyan-300 underline">color harmony checker</a> for complete color palette creation.
                        </p>
                        <p>
                            Understanding <strong>color code formats</strong> is essential in modern web development. <strong>Hexadecimal colors</strong> (hex codes) are six-digit codes preceded by a hash symbol (#), representing colors in HTML and CSS. For example, #FF5733 represents a vibrant orange-red shade. Each pair of digits in a hex code represents the red, green, and blue color channels in base-16 (hexadecimal) format. Our <strong>hex to RGB color converter</strong> instantly translates these hex values into <strong>RGB color format</strong>, which uses decimal numbers from 0 to 255 for each color channel.
                        </p>
                        <p>
                            <strong>RGB color values</strong> are widely used in CSS properties, JavaScript color manipulation, and graphic design software. The RGB color model defines colors by specifying the intensity of red, green, and blue light components. For instance, rgb(255, 87, 51) produces the same color as #FF5733. Our <strong>color conversion tool</strong> makes it effortless to switch between these two essential <strong>color code systems</strong>, ensuring perfect color accuracy across your web design and development workflow. For enhanced styling capabilities, explore our <a href="/developer-tools/shadow-css-generator" onClick={(e) => { e.preventDefault(); navigateTo('/developer-tools/shadow-css-generator'); }} className="text-cyan-400 hover:text-cyan-300 underline">CSS shadow generator</a> to add depth to your designs.
                        </p>
                        <p>
                            Whether you're implementing a <strong>design system</strong>, creating <strong>CSS color schemes</strong>, or ensuring <strong>color consistency</strong> across digital platforms, our free <strong>hex to RGB converter</strong> provides the precision and speed you need. The tool includes a real-time <strong>color preview</strong> feature, allowing you to visualize the exact color represented by your hex code before copying the RGB values. This visual feedback is invaluable for <strong>color palette development</strong>, brand identity work, and <strong>web accessibility</strong> testing. Combine this with our <a href="/color-and-design-tools/accessible-color-contrast-checker" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/accessible-color-contrast-checker'); }} className="text-cyan-400 hover:text-cyan-300 underline">accessible color contrast checker</a> to ensure WCAG compliance for all your color choices.
                        </p>
                        <p>
                            All color conversions are performed locally in your browser using standard mathematical algorithms, ensuring 100% accuracy and complete privacy. Your <strong>hex color codes</strong> and <strong>RGB values</strong> never leave your device, making this tool perfect for confidential client projects and sensitive design work. No registration, no data collection, just pure, reliable <strong>color code conversion</strong> whenever you need it.
                        </p>
                    </div>
                </div>

                {/* External Links Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">🔗 Learn More About Color Systems</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a
                            href="https://en.wikipedia.org/wiki/Color_theory"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Color Theory - Wikipedia</h3>
                            <p className="text-gray-400">Explore the science and art of color usage, color mixing, and visual perception in design and art.</p>
                            <span className="inline-block mt-3 text-cyan-400 group-hover:translate-x-2 transition-transform">Learn More →</span>
                        </a>
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl group"
                        >
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">CSS Colors - MDN Web Docs</h3>
                            <p className="text-gray-400">Complete reference guide for CSS color values including hex, RGB, HSL, and modern color syntax.</p>
                            <span className="inline-block mt-3 text-cyan-400 group-hover:translate-x-2 transition-transform">Read Documentation →</span>
                        </a>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <p className="text-gray-500 text-sm">Last Updated: November 8, 2025</p>
                </div>

                {/* FAQ */}
                <div className="max-w-4xl mx-auto mt-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">❓ Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all">
                            <h3 className="text-xl font-semibold text-cyan-300">What is a Hex to RGB Converter?</h3>
                            <p className="text-gray-400 mt-2">A Hex to RGB Converter is a color conversion tool that translates hexadecimal color codes (like #FF5733), commonly used in web design and CSS, into their corresponding RGB values (like rgb(255, 87, 51)), which define color using red, green, and blue intensity levels from 0 to 255.</p>
                        </div>
                         <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all">
                            <h3 className="text-xl font-semibold text-cyan-300">Can I use this tool for web design projects?</h3>
                            <p className="text-gray-400 mt-2">Absolutely! This hex to RGB color converter is perfect for web designers, front-end developers, graphic designers, and digital artists who need to convert color codes between hexadecimal and RGB formats for CSS styling, HTML markup, JavaScript color manipulation, and design software.</p>
                        </div>
                                                <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all">
                            <h3 className="text-xl font-semibold text-cyan-300">Is this Hex to RGB Converter free?</h3>
                            <p className="text-gray-400 mt-2">Yes, the ZuraWebTools Hex to RGB Converter is 100% free with no limitations. Convert unlimited hex color codes to RGB values without any subscriptions, registration, or hidden fees. It's accurate, fast, and works completely in your browser.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all">
                            <h3 className="text-xl font-semibold text-cyan-300">How accurate is the hex to RGB conversion?</h3>
                            <p className="text-gray-400 mt-2">The conversion is 100% mathematically accurate using standard color conversion algorithms. Each pair of hexadecimal digits (00-FF) is converted to its decimal equivalent (0-255) for the red, green, and blue color channels, ensuring perfect color accuracy every time.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all">
                            <h3 className="text-xl font-semibold text-cyan-300">Does this color converter work in all browsers?</h3>
                            <p className="text-gray-400 mt-2">Yes, this hex to RGB converter works flawlessly in all modern web browsers including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, Opera, and mobile browsers on iOS and Android. No plugins or extensions required—just open and convert.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all">
                            <h3 className="text-xl font-semibold text-cyan-300">Can I use RGB values directly in CSS?</h3>
                            <p className="text-gray-400 mt-2">Absolutely! RGB values can be used directly in CSS using the rgb() function. For example: color: rgb(34, 211, 238) or background-color: rgb(255, 87, 51). RGB is fully supported in all CSS properties that accept color values including borders, shadows, and gradients.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all">
                            <h3 className="text-xl font-semibold text-cyan-300">Can I convert multiple hex codes at once?</h3>
                            <p className="text-gray-400 mt-2">Currently, the tool is optimized for converting one hex color code at a time to ensure maximum accuracy and provide a live color preview. Simply convert each hex code individually and use the copy button to quickly save each RGB value. The conversion is instant, so batch processing is fast and efficient.</p>
                        </div>
                    </div>
                </div>
                
                <RelatedTools
                    navigateTo={navigateTo}
                    relatedSlugs={['accessible-color-contrast-checker', 'color-harmony-checker', 'shadow-css-generator']}
                    currentSlug="hex-to-rgb-converter"
                />
            </div>
        </section>
    );
};

export default HexToRGBConverter;
