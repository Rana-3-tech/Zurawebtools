import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
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

    // 🧠 SEO & Meta Tags Setup
    useEffect(() => {
        document.title = "Online Lorem Ipsum Generator – Free Placeholder Text Creator | ZuraWebTools";

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', 'Generate dummy text for mockups, design layouts, and content previews. Our free placeholder text generator creates Lorem Ipsum or random English paragraphs instantly for designers and developers.');
        document.head.appendChild(metaDescription);

        const metaTags = [
            { property: 'og:title', content: 'Online Lorem Ipsum Generator – Free Placeholder Text Creator | ZuraWebTools' },
            { property: 'og:description', content: 'Instantly generate placeholder text for your designs. Create Lorem Ipsum or random dummy text for websites, mockups, and more.' },
            { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-lorem-ipsum-og.png' },
            { property: 'og:image:alt', content: 'A preview of the Online Lorem Ipsum Generator from ZuraWebTools, showing generated placeholder text.' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://zurawebtools.com/tools/lorem-ipsum-generator' },
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
        canonical.setAttribute('href', 'https://zurawebtools.com/tools/lorem-ipsum-generator');
        document.head.appendChild(canonical);

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Online Lorem Ipsum Generator – Free Placeholder Text Creator",
                "operatingSystem": "Any (Web-based)",
                "applicationCategory": "DeveloperTool",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2150" },
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "description": "A free online lorem ipsum generator to create placeholder text for designers and developers. Generate dummy content, mockup text, and fake text for websites and layouts.",
                "url": "https://zurawebtools.com/tools/lorem-ipsum-generator"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    { "@type": "Question", "name": "What is a Lorem Ipsum Generator?", "acceptedAnswer": { "@type": "Answer", "text": "A Lorem Ipsum Generator is a tool that creates placeholder text (also known as dummy text or filler text) used by designers and developers to fill in content areas in a design mockup or website layout before the final content is ready." } },
                    { "@type": "Question", "name": "Is this placeholder text generator free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the ZuraWebTools Lorem Ipsum Generator is completely free to use without any limitations. You can generate as much dummy text as you need for your projects." } },
                    { "@type": "Question", "name": "Can I generate random English text instead of Latin?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Our tool includes a toggle to switch between classic 'Lorem Ipsum' (pseudo-Latin) and 'Random English' text, which uses common English words to create more realistic-looking paragraphs." } },
                    { "@type": "Question", "name": "Does this Lorem Ipsum Generator work offline?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, since all the text generation logic runs directly in your browser using JavaScript, the tool works perfectly even without an internet connection after the page has loaded." } }
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

                {/* Share */}
                <div className="max-w-4xl mx-auto mt-8 text-center">
                    <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
                    <div className="flex justify-center items-center space-x-6">
                       <ShareButton network="Facebook" url="https://zurawebtools.com/tools/lorem-ipsum-generator" text="Check out this free Lorem Ipsum Generator!"/>
                       <ShareButton network="Twitter" url="https://zurawebtools.com/tools/lorem-ipsum-generator" text="Check out this free Lorem Ipsum Generator from @ZuraWebTools!"/>
                       <ShareButton network="LinkedIn" url="https://zurawebtools.com/tools/lorem-ipsum-generator" text="Check out this free Lorem Ipsum Generator!"/>
                       <ShareButton network="WhatsApp" url="https://zurawebtools.com/tools/lorem-ipsum-generator" text="Check out this free Lorem Ipsum Generator!"/>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">What is a Lorem Ipsum Generator?</h3><p className="text-gray-400 mt-2">It's a tool that creates placeholder or 'dummy' text for designers and developers to use in layouts and mockups before final content is available.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Is this placeholder text generator free to use?</h3><p className="text-gray-400 mt-2">Yes, this tool is 100% free. You can generate as much text as you need for any project.</p></div>
                        <div className="bg-slate-900/30 p-5 rounded-lg"><h3 className="text-xl font-semibold text-cyan-300">Can I generate random English text instead of Latin?</h3><p className="text-gray-400 mt-2">Absolutely! Just use the 'Text Type' toggle to switch from 'Classic' Lorem Ipsum to 'English' for more realistic placeholder content.</p></div>
                    </div>
                </div>

                <RelatedTools
                    navigateTo={navigateTo}
                    relatedSlugs={['word-counter', 'case-converter']}
                    currentSlug="lorem-ipsum-generator"
                />
            </div>
        </section>
    );
};

export default LoremIpsumGenerator;
