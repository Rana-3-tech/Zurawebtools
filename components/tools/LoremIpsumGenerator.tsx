import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';

// Data for text generation
const loremIpsumWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');
const randomEnglishWords = "the of and to a in is it you that he was for on are with as I his they be at one have this from or had by hot but some what there we can out other were all your when up use word how said an each she which do their time if will way about many then them write would like so these her long make thing see him two has look more day could go come did number sound no most people my over know water than call first who may down side been now find any new part take get place made live where after back little only round man year came show every good me give our under name very through just form sentence great think say help low line differ turn cause much mean before move right boy old too same tell does set three want air well also play small end put home read hand port large spell add even land here must big high such follow act why ask men change went light kind off need house picture try us again animal point mother world near build self earth father".split(' ');

interface LoremIpsumGeneratorProps {
  navigateTo: (page: Page) => void;
}

const LoremIpsumGenerator: React.FC<LoremIpsumGeneratorProps> = ({ navigateTo }) => {
    const [numParagraphs, setNumParagraphs] = useState(3);
    const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
    const [textType, setTextType] = useState<'lorem' | 'english'>('lorem');
    const [generatedText, setGeneratedText] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    // TOC sections configuration
    const tocSections: TOCSection[] = [
      { id: 'how-to-use', emoji: '📖', title: 'How to Use', subtitle: 'Generate text', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-400', hoverText: 'text-green-600' },
      { id: 'benefits', emoji: '⭐', title: 'Benefits', subtitle: 'Why use Lorem', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
      { id: 'use-cases', emoji: '💼', title: 'Use Cases', subtitle: 'When to use', gradientFrom: 'from-blue-50', gradientTo: 'to-indigo-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
      { id: 'faq', emoji: '❓', title: 'FAQ', subtitle: 'Get answers', gradientFrom: 'from-orange-50', gradientTo: 'to-amber-50', hoverBorder: 'border-orange-400', hoverText: 'text-orange-600' }
    ];

    // 🧠 SEO & Meta Tags Setup
    useEffect(() => {
        document.title = "Online Lorem Ipsum Generator – Free Placeholder Text Creator | ZuraWebTools";
        
        // Set html lang attribute
        document.documentElement.setAttribute('lang', 'en');

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', 'Generate dummy text for mockups, design layouts, and content previews. Our free placeholder text generator creates Lorem Ipsum or random English paragraphs instantly for designers and developers.');
        document.head.appendChild(metaDescription);

        const metaTags = [
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:title', content: 'Online Lorem Ipsum Generator – Free Placeholder Text Creator | ZuraWebTools' },
            { property: 'og:description', content: 'Instantly generate placeholder text for your designs. Create Lorem Ipsum or random dummy text for websites, mockups, and more.' },
            { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-lorem-ipsum-og.png' },
            { property: 'og:image:alt', content: 'A preview of the Online Lorem Ipsum Generator from ZuraWebTools, showing generated placeholder text.' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://zurawebtools.com/text-and-writing-tools/lorem-ipsum-generator' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Online Lorem Ipsum Generator | ZuraWebTools' },
            { name: 'twitter:description', content: 'Free placeholder text and dummy content generator for designers and developers.' },
            { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-lorem-ipsum-og.png' },
            { name: 'twitter:image:alt', content: 'A preview of the Online Lorem Ipsum Generator from ZuraWebTools, showing generated placeholder text.' },
        ];
        metaTags.forEach(tag => {
            const el = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
            document.head.appendChild(el);
        });

        const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/text-and-writing-tools/lorem-ipsum-generator');
    document.head.appendChild(canonical);        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Online Lorem Ipsum Generator – Free Placeholder Text Creator",
              "description": "Generate dummy text for mockups, design layouts, and content previews. Free placeholder text generator for designers and developers.",
              "url": "https://zurawebtools.com/text-and-writing-tools/lorem-ipsum-generator",
              "breadcrumb": { "@id": "https://zurawebtools.com/text-and-writing-tools/lorem-ipsum-generator#breadcrumb" },
              "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": "https://zurawebtools.com/text-and-writing-tools/lorem-ipsum-generator#breadcrumb",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
                { "@type": "ListItem", "position": 2, "name": "Design Tools", "item": "https://zurawebtools.com/design-tools" },
                { "@type": "ListItem", "position": 3, "name": "Lorem Ipsum Generator" }
              ]
            },
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Online Lorem Ipsum Generator – Free Placeholder Text Creator",
                "operatingSystem": "Any (Web-based)",
                "applicationCategory": "DeveloperTool",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2150" },
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "description": "A free online lorem ipsum generator to create placeholder text for designers and developers. Generate dummy content, mockup text, and fake text for websites and layouts.",
                "url": "https://zurawebtools.com/text-and-writing-tools/lorem-ipsum-generator"
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Generate Lorem Ipsum Placeholder Text",
              "description": "Step-by-step guide to generate Lorem Ipsum dummy text for your design projects.",
              "step": [
                { "@type": "HowToStep", "position": 1, "name": "Set Paragraphs", "text": "Choose how many paragraphs of Lorem Ipsum text you need (1-20 paragraphs)." },
                { "@type": "HowToStep", "position": 2, "name": "Set Words per Paragraph", "text": "Select the number of words per paragraph (5-200 words) to match your layout needs." },
                { "@type": "HowToStep", "position": 3, "name": "Choose Text Type", "text": "Toggle between Classic Lorem Ipsum or Random English text for more realistic placeholder content." },
                { "@type": "HowToStep", "position": 4, "name": "Generate and Copy", "text": "Click Generate Text button, then use the Copy button to paste your placeholder text into your design." }
              ]
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    { "@type": "Question", "name": "What is a Lorem Ipsum Generator?", "acceptedAnswer": { "@type": "Answer", "text": "A Lorem Ipsum Generator is a tool that creates placeholder text (also known as dummy text or filler text) used by designers and developers to fill in content areas in a design mockup or website layout before the final content is ready." } },
                    { "@type": "Question", "name": "Is this placeholder text generator free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the ZuraWebTools Lorem Ipsum Generator is completely free to use without any limitations. You can generate as much dummy text as you need for your projects." } },
                    { "@type": "Question", "name": "Can I generate random English text instead of Latin?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Our tool includes a toggle to switch between classic 'Lorem Ipsum' (pseudo-Latin) and 'Random English' text, which uses common English words to create more realistic-looking paragraphs." } },
                    { "@type": "Question", "name": "Does this Lorem Ipsum Generator work offline?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, since all the text generation logic runs directly in your browser using JavaScript, the tool works perfectly even without an internet connection after the page has loaded." } },
                    { "@type": "Question", "name": "What is Lorem Ipsum text used for in web design?", "acceptedAnswer": { "@type": "Answer", "text": "Lorem Ipsum placeholder text is used by web designers and developers to visualize how actual content will look in a layout. It helps focus on design elements like typography, spacing, and layout structure without being distracted by meaningful content during the mockup phase." } },
                    { "@type": "Question", "name": "How many paragraphs of Lorem Ipsum do I need for my design?", "acceptedAnswer": { "@type": "Answer", "text": "The number of paragraphs depends on your layout. Blog posts typically need 3-5 paragraphs, landing pages might need 2-3, product descriptions often use 1-2 paragraphs, and long-form articles may require 8-15 paragraphs. Our generator allows up to 20 paragraphs with customizable word counts." } },
                    { "@type": "Question", "name": "Is Lorem Ipsum text copyright free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, Lorem Ipsum text is completely copyright-free and in the public domain. It's derived from a scrambled passage of Latin text from Cicero's work written in 45 BC. You can use generated Lorem Ipsum placeholder text freely in any personal or commercial project without attribution." } }
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

    const generateParagraph = (wordsArray: string[], wordCount: number) => {
        let paragraph = '';
        for (let i = 0; i < wordCount; i++) {
            paragraph += wordsArray[Math.floor(Math.random() * wordsArray.length)] + ' ';
        }
        return paragraph.trim().charAt(0).toUpperCase() + paragraph.trim().slice(1) + '.';
    };

    const handleGenerate = useCallback(() => {
        const sourceWords = textType === 'lorem' ? loremIpsumWords : randomEnglishWords;
        let result = '';
        for (let i = 0; i < numParagraphs; i++) {
            result += generateParagraph(sourceWords, wordsPerParagraph) + '\n\n';
        }
        setGeneratedText(result.trim());
    }, [numParagraphs, wordsPerParagraph, textType]);
    
    useEffect(() => {
        handleGenerate();
    }, [handleGenerate]);

    const handleCopy = () => {
        if (generatedText) {
            navigator.clipboard.writeText(generatedText);
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
        
        return <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{network}</a>
    }

    return (
        <section className="py-20 bg-slate-800 text-gray-200">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white">Online Lorem Ipsum Generator – Free Placeholder Text Creator</h1>
                    <p className="mt-4 text-lg text-gray-300">
                        Instantly create dummy text for your design mockups, website layouts, and content previews. Our free placeholder text generator is the perfect tool for designers and developers needing a quick SEO text filler.
                    </p>
                </div>

                {/* Controls */}
                <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-900/50 rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Paragraphs</label>
                            <input type="number" min="1" max="20" value={numParagraphs} onChange={e => setNumParagraphs(parseInt(e.target.value))} className="w-full bg-slate-700 text-white p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Words / Paragraph</label>
                            <input type="number" min="5" max="200" step="5" value={wordsPerParagraph} onChange={e => setWordsPerParagraph(parseInt(e.target.value))} className="w-full bg-slate-700 text-white p-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Text Type</label>
                            <div className="flex bg-slate-700 rounded-md p-1">
                                <button onClick={() => setTextType('lorem')} className={`w-1/2 py-1 rounded ${textType === 'lorem' ? 'bg-cyan-500' : ''}`}>Classic</button>
                                <button onClick={() => setTextType('english')} className={`w-1/2 py-1 rounded ${textType === 'english' ? 'bg-cyan-500' : ''}`}>English</button>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <button onClick={handleGenerate} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-10 rounded-full hover:opacity-90 transition-opacity transform hover:scale-105 shadow-lg">
                            Generate Text
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="max-w-4xl mx-auto mt-8">
                    <div className="relative bg-slate-900 p-6 rounded-xl border border-slate-700 min-h-[200px] shadow-inner">
                        <p className="whitespace-pre-wrap text-gray-300">{generatedText}</p>
                        <button onClick={handleCopy} className={`absolute top-4 right-4 font-semibold py-2 px-4 rounded-md text-sm transition-all transform hover:scale-105 ${copySuccess ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-200'}`}>
                            {copySuccess ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Social Share - Positioned After Tool */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-6">Share This Lorem Ipsum Generator Tool</h2>
                    <p className="text-gray-400 mb-6">Help fellow designers and developers discover this free placeholder text generator</p>
                    <div className="flex justify-center items-center space-x-4">
                        <a
                            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzurawebtools.com%2Ftools%2Florem-ipsum-generator"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                            className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a
                            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Florem-ipsum-generator&text=Generate%20Lorem%20Ipsum%20placeholder%20text%20instantly%20with%20this%20free%20tool%20from%20%40ZuraWebTools%21"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                            className="text-slate-400 hover:text-sky-500 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fzurawebtools.com%2Ftools%2Florem-ipsum-generator&title=Free%20Lorem%20Ipsum%20Generator"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                            className="text-slate-400 hover:text-blue-600 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a
                            href="https://api.whatsapp.com/send?text=Generate%20Lorem%20Ipsum%20placeholder%20text%20instantly%20https%3A%2F%2Fzurawebtools.com%2Ftools%2Florem-ipsum-generator"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on WhatsApp"
                            className="text-slate-400 hover:text-green-500 transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </a>
                    </div>
                </div>

                {/* Table of Contents */}
                <div className="max-w-6xl mx-auto mt-16">
                    <TableOfContents sections={tocSections} />
                </div>

                {/* Quick Examples Section */}
                <div className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">⚡ Quick Lorem Ipsum Templates</h2>
                    <p className="text-center text-gray-400 mb-10">Click any template to instantly load preset configurations</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: 'Blog Post', paragraphs: 5, words: 100, desc: '5 paragraphs, 100 words each - Perfect for blog articles' },
                            { name: 'Product Description', paragraphs: 2, words: 75, desc: '2 paragraphs, 75 words - Ideal for e-commerce products' },
                            { name: 'Email Template', paragraphs: 3, words: 60, desc: '3 paragraphs, 60 words - Great for email marketing' },
                            { name: 'Landing Page', paragraphs: 4, words: 80, desc: '4 paragraphs, 80 words - Website landing sections' },
                            { name: 'Long Article', paragraphs: 10, words: 120, desc: '10 paragraphs, 120 words - In-depth content pieces' },
                            { name: 'Short Bio', paragraphs: 1, words: 50, desc: '1 paragraph, 50 words - Quick author bio or intro' },
                        ].map((template) => (
                            <div
                                key={template.name}
                                onClick={() => {
                                    setNumParagraphs(template.paragraphs);
                                    setWordsPerParagraph(template.words);
                                    handleGenerate();
                                }}
                                className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-purple-400 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1"
                            >
                                <h3 className="font-semibold text-white text-lg mb-3 group-hover:text-purple-400 transition-colors">📄 {template.name}</h3>
                                <p className="text-slate-400 text-sm mb-3">{template.desc}</p>
                                <p className="text-purple-300 text-xs">Click to load →</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits Section */}
                <div id="benefits" className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">✨ Why Use Our Lorem Ipsum Generator?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">⚡ Time-Saving</h3>
                                <p className="text-gray-300">Instantly generate Lorem Ipsum placeholder text without typing manually. Perfect for designers and developers who need dummy text quickly for mockups, wireframes, and prototypes. Compatible with tools like our <a href="/text-and-writing-tools/word-counter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }} className="text-cyan-400 hover:text-cyan-300 underline">word counter</a>.</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">🎨 Design Focused</h3>
                                <p className="text-gray-300">Lorem Ipsum text is specifically designed to maintain natural letter distribution, allowing you to focus on visual layout and typography without meaningful content distractions in your design process.</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-1 rounded-xl shadow-lg hover:shadow-2xl transition-shadow hover:-translate-y-1 duration-300">
                            <div className="bg-slate-900 p-6 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-3">⚙️ Fully Customizable</h3>
                                <p className="text-gray-300">Control paragraphs, words per paragraph, and toggle between Classic Lorem Ipsum or Random English text. Generate exactly the placeholder text length you need for any project.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Use Cases Section */}
                <div id="use-cases" className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">👥 Who Uses Lorem Ipsum Generators?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">🎨 Web Designers</h3>
                            <p className="text-gray-300 mb-3">Create website mockups, landing page designs, and UI layouts with realistic Lorem Ipsum placeholder text to demonstrate typography, spacing, and visual hierarchy before final content arrives.</p>
                            <p className="text-sm text-blue-300">Also try: <a href="/color-and-design-tools/hex-to-rgb-converter" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/hex-to-rgb-converter'); }} className="underline hover:text-blue-200">Color Converter</a></p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-purple-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">🖼️ UI/UX Designers</h3>
                            <p className="text-gray-300 mb-3">Design wireframes, prototypes, and user interfaces with dummy text to test readability, content flow, and layout balance without being distracted by actual content meaning.</p>
                            <p className="text-sm text-purple-300">Also try: <a href="/text-and-writing-tools/case-converter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }} className="underline hover:text-purple-200">Text Case Converter</a></p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-green-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">✍️ Content Writers</h3>
                            <p className="text-gray-300 mb-3">Use Lorem Ipsum filler text as temporary placeholders in content management systems, blog templates, and article drafts to visualize final layout and structure before writing actual content.</p>
                            <p className="text-sm text-green-300">Also try: <a href="/text-and-writing-tools/remove-extra-spaces" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/remove-extra-spaces'); }} className="underline hover:text-green-200">Remove Extra Spaces</a></p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-orange-400 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-3">💻 Developers</h3>
                            <p className="text-gray-300 mb-3">Test frontend layouts, responsive designs, and database content displays with Lorem Ipsum sample text to ensure proper rendering, overflow handling, and dynamic content integration.</p>
                            <p className="text-sm text-orange-300">Also try: <a href="/developer-tools/json-formatter" onClick={(e) => { e.preventDefault(); navigateTo('/developer-tools/json-formatter'); }} className="underline hover:text-orange-200">JSON Formatter</a></p>
                        </div>
                    </div>
                </div>

                {/* How to Use Section */}
                <div id="how-to-use" className="max-w-4xl mx-auto mt-16 text-left">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use the Lorem Ipsum Generator</h2>
                    <div className="bg-slate-900/30 p-8 rounded-lg">
                        <ol className="list-decimal list-inside space-y-3 text-gray-300">
                            <li><strong>Set Paragraphs:</strong> Choose how many paragraphs of Lorem Ipsum text you need (1-20 paragraphs).</li>
                            <li><strong>Set Words per Paragraph:</strong> Select the number of words per paragraph (5-200 words) to match your layout.</li>
                            <li><strong>Choose Text Type:</strong> Toggle between Classic Lorem Ipsum or Random English text for realistic content.</li>
                            <li><strong>Generate Text:</strong> Click the "Generate Text" button to create your placeholder content.</li>
                            <li><strong>Copy Result:</strong> Click the Copy button to paste your Lorem Ipsum text into your project.</li>
                        </ol>
                    </div>
                </div>

                {/* About Section with Semantic Keywords */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">📚 About Lorem Ipsum Generator Tool</h2>
                    <div className="bg-slate-900/30 p-8 rounded-lg text-gray-300 space-y-4 leading-relaxed">
                        <p>
                            Our <strong>Lorem Ipsum generator</strong> is a comprehensive online tool designed to create <strong>placeholder text</strong> for designers, developers, and content creators. Whether you need <strong>dummy text</strong> for mockups, wireframes, or website layouts, this free <strong>Lorem Ipsum text</strong> generator provides customizable options to match your exact requirements. Generate classic Lorem Ipsum paragraphs or switch to Random English text for more realistic <strong>filler text</strong> in your designs. Combine it with our <a href="/text-and-writing-tools/word-counter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }} className="text-cyan-400 hover:text-cyan-300 underline">word counter tool</a> to track the exact length of your generated placeholder content.
                        </p>
                        <p>
                            As a powerful <strong>Lorem Ipsum online</strong> generator, our tool offers complete control over text generation. You can specify the number of paragraphs (1-20) and words per paragraph (5-200) to create <strong>sample text</strong> that perfectly fits your layout dimensions. The <strong>mock text generator</strong> uses authentic Lorem Ipsum vocabulary derived from Cicero's "de Finibus Bonorum et Malorum" written in 45 BC, maintaining natural letter frequency distribution that resembles real content. Unlike basic placeholder tools, our <strong>text placeholder</strong> generator includes an intelligent Random English mode for creating more realistic-looking dummy content. Use our <a href="/text-and-writing-tools/case-converter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/case-converter'); }} className="text-cyan-400 hover:text-cyan-300 underline">case converter</a> to adjust the capitalization of your generated Lorem Ipsum text.
                        </p>
                        <p>
                            This <strong>fake text generator</strong> is particularly valuable for web designers creating landing pages, blog templates, and e-commerce product layouts. The <strong>Lorem Ipsum tool</strong> helps visualize typography, spacing, and content hierarchy without meaningful text distractions during the design phase. Our <strong>dummy content generator</strong> processes everything locally in your browser, ensuring instant generation without server delays. The tool supports both Classic Latin-based Lorem Ipsum and Random English text modes, giving you flexibility to choose <strong>design placeholder text</strong> that best suits your project needs. For cleaning up text formatting issues, try our <a href="/text-and-writing-tools/remove-extra-spaces" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/remove-extra-spaces'); }} className="text-cyan-400 hover:text-cyan-300 underline">remove extra spaces tool</a> to perfect your placeholder content.
                        </p>
                        <p>
                            Our <strong>Lorem Ipsum creator</strong> includes convenient preset templates for common use cases like blog posts (5 paragraphs × 100 words), product descriptions (2 paragraphs × 75 words), email templates (3 paragraphs × 60 words), landing pages (4 paragraphs × 80 words), long articles (10 paragraphs × 120 words), and short bios (1 paragraph × 50 words). Simply click any template to instantly load pre-configured settings and generate appropriate <strong>mockup text</strong> for your specific project type. The one-click copy button lets you quickly paste <strong>Lorem Ipsum paragraphs</strong> into your design software, content management system, or code editor.
                        </p>
                        <p>
                            Whether you're a professional web designer working on client projects, a UI/UX designer creating interactive prototypes, a content writer structuring blog templates, or a frontend developer testing responsive layouts, this <strong>random text generator</strong> streamlines your workflow. The tool is completely free with no registration required, no usage limits, and works perfectly offline after initial page load. Generate unlimited <strong>placeholder text</strong> for Figma designs, Adobe XD mockups, WordPress themes, HTML/CSS layouts, and any project requiring temporary dummy content before final copy arrives.
                        </p>
                    </div>
                </div>

                {/* External Links Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">🔗 Learn More About Lorem Ipsum</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a
                            href="https://en.wikipedia.org/wiki/Lorem_ipsum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-cyan-400 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400">📖 Wikipedia - Lorem Ipsum History</h3>
                            <p className="text-gray-400">Explore the fascinating history and origin of Lorem Ipsum placeholder text, including its roots in classical Latin literature from 45 BC.</p>
                            <p className="text-cyan-300 text-sm mt-3">Visit Wikipedia →</p>
                        </a>
                        <a
                            href="https://www.lipsum.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-400 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400">📘 Lipsum.com - Original Source</h3>
                            <p className="text-gray-400">Visit the original Lorem Ipsum generator website, providing authentic placeholder text since 1994 for designers worldwide.</p>
                            <p className="text-blue-300 text-sm mt-3">Visit Lipsum.com →</p>
                        </a>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="max-w-4xl mx-auto mt-12 text-center">
                    <p className="text-sm text-gray-500">Last Updated: November 8, 2025</p>
                </div>

                {/* FAQ */}
                <div id="faq" className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">What is a Lorem Ipsum Generator?</h3><p className="text-gray-400 mt-2">It's a tool that creates placeholder or 'dummy' text for designers and developers to use in layouts and mockups before final content is available.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Is this placeholder text generator free to use?</h3><p className="text-gray-400 mt-2">Yes, this tool is 100% free. You can generate as much text as you need for any project.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Can I generate random English text instead of Latin?</h3><p className="text-gray-400 mt-2">Absolutely! Just use the 'Text Type' toggle to switch from 'Classic' Lorem Ipsum to 'English' for more realistic placeholder content.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Does this Lorem Ipsum Generator work offline?</h3><p className="text-gray-400 mt-2">Yes, since all the text generation logic runs directly in your browser using JavaScript, the tool works perfectly even without an internet connection after the page has loaded.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">What is Lorem Ipsum text used for in web design?</h3><p className="text-gray-400 mt-2">Lorem Ipsum placeholder text is used by web designers and developers to visualize how actual content will look in a layout. It helps focus on design elements like typography, spacing, and layout structure without being distracted by meaningful content during the mockup phase.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">How many paragraphs of Lorem Ipsum do I need for my design?</h3><p className="text-gray-400 mt-2">The number of paragraphs depends on your layout. Blog posts typically need 3-5 paragraphs, landing pages might need 2-3, product descriptions often use 1-2 paragraphs, and long-form articles may require 8-15 paragraphs. Our generator allows up to 20 paragraphs with customizable word counts.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Is Lorem Ipsum text copyright free?</h3><p className="text-gray-400 mt-2">Yes, Lorem Ipsum text is completely copyright-free and in the public domain. It's derived from a scrambled passage of Latin text from Cicero's work written in 45 BC. You can use generated Lorem Ipsum placeholder text freely in any personal or commercial project without attribution.</p></div>
                    </div>
                </div>

                <RelatedTools
                    navigateTo={navigateTo}
                    relatedSlugs={['word-counter', 'case-converter', 'remove-extra-spaces', 'json-formatter', 'hex-to-rgb-converter']}
                    currentSlug="lorem-ipsum-generator"
                />
            </div>
        </section>
    );
};

export default LoremIpsumGenerator;
