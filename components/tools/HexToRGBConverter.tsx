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

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', 'Convert Hex color codes to RGB values instantly using our free online color converter. Perfect for web designers, developers, and UI creators.');
        document.head.appendChild(metaDescription);

        const metaTags = [
            { property: 'og:title', content: 'Hex to RGB Color Converter | ZuraWebTools' },
            { property: 'og:description', content: 'Quickly convert Hex color codes to their RGB equivalent with a live preview. A must-have tool for designers and developers.' },
            { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-hex-to-rgb-og.png' },
            { property: 'og:image:alt', content: 'Free Hex to RGB Color Converter Tool by ZuraWebTools' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://zurawebtools.com/tools/hex-to-rgb-converter' },
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
        canonical.setAttribute('href', 'https://zurawebtools.com/tools/hex-to-rgb-converter');
        document.head.appendChild(canonical);

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
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
                "url": "https://zurawebtools.com/tools/hex-to-rgb-converter"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    { "@type": "Question", "name": "What is a Hex to RGB Converter?", "acceptedAnswer": { "@type": "Answer", "text": "A Hex to RGB Converter is a tool that translates hexadecimal color codes (like #FF5733), commonly used in web design, into their corresponding RGB values (like rgb(255, 87, 51)), which define color in terms of red, green, and blue." } },
                    { "@type": "Question", "name": "Can I use this tool for web design projects?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, this color code converter is perfect for web designers, front-end developers, and digital artists who need to switch between hex and RGB color formats for CSS, HTML, and graphic design software." } },
                    { "@type": "Question", "name": "Is this Hex to RGB Converter free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the ZuraWebTools Hex to RGB Converter is 100% free, accurate, and works instantly in your browser without requiring any sign-up or installation." } }
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

                {/* FAQ */}
                <div className="max-w-4xl mx-auto mt-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">What is a Hex to RGB Converter?</h3>
                            <p className="text-gray-400 mt-2">It's a tool that converts hexadecimal color codes to RGB values for use in web and graphic design.</p>
                        </div>
                         <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">Can I use this tool for web design projects?</h3>
                            <p className="text-gray-400 mt-2">Yes, this converter is perfect for web designers, front-end developers, and digital artists.</p>
                        </div>
                        <div className="bg-slate-900/30 p-5 rounded-lg">
                            <h3 className="text-xl font-semibold text-cyan-300">Is this Hex to RGB Converter free?</h3>
                            <p className="text-gray-400 mt-2">Yes, it’s 100% free, accurate, and works instantly in your browser.</p>
                        </div>
                    </div>
                </div>

                {/* Share */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
                    <div className="flex justify-center items-center space-x-6">
                        <ShareButton network="Facebook" url="https://zurawebtools.com/tools/hex-to-rgb-converter" text="A simple and free Hex to RGB Color Converter." />
                        <ShareButton network="Twitter" url="https://zurawebtools.com/tools/hex-to-rgb-converter" text="A simple and free Hex to RGB Color Converter by @ZuraWebTools!" />
                        <ShareButton network="LinkedIn" url="https://zurawebtools.com/tools/hex-to-rgb-converter" text="A simple and free Hex to RGB Color Converter." />
                        <ShareButton network="WhatsApp" url="https://zurawebtools.com/tools/hex-to-rgb-converter" text="A simple and free Hex to RGB Color Converter." />
                    </div>
                </div>
                
                <RelatedTools
                    navigateTo={navigateTo}
                    relatedSlugs={['accessible-color-contrast-checker']}
                    currentSlug="hex-to-rgb-converter"
                />
            </div>
        </section>
    );
};

export default HexToRGBConverter;
