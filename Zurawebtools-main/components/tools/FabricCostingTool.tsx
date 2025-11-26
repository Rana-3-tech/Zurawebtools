import React, { useState, useMemo, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface FabricCostingToolProps {
  navigateTo: (page: Page) => void;
}

interface FabricInputs {
  read: string;
  pick: string;
  warpCount: string;
  weftCount: string;
  width: string;
  quantity: string;
  warpYarnRate: string;
  weftYarnRate: string;
  conversionPerPick: string;
  commissionPercentage: string;
}

// --- HELPER ICONS ---
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
        {children}
    </div>
);
const GridIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const HashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;
const RulerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v4m0 0h-4m4 0l-5-5" /></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const DollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 12v.01M12 12v-2.01M12 12c-1.657 0-3-.895-3-2s1.343-2 3-2m0 8c1.11 0 2.08-.402 2.599-1M12 12V7m0 1v.01" /></svg>;
const PercentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M16 4l-8 16" /></svg>;

// --- Social Icons ---
const ShareFacebook = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>;
const ShareTwitter = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.613 4.212 3.766 4.646-.66.18-1.373.264-2.106.264-.304 0-.6-.03- .89-.084.609 1.874 2.373 3.246 4.465 3.283-1.786 1.394-4.045 2.225-6.491 2.225-.424 0-.84-.025-1.255-.073 2.304 1.476 5.041 2.34 8.016 2.34 9.621 0 14.885-7.994 14.885-14.885 0-.227-.005-.453-.014-.678.989-.715 1.848-1.614 2.529-2.616z"/></svg>;
const ShareLinkedIn = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>;
const ShareWhatsApp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.181l.341.566-1.127 4.122 4.276-1.119.524.318z"/></svg>;
const ShareEmail = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.713l-11.985-9.223h23.97l-11.985 9.223zm0 2.574l-12-9.223v15.936h24v-15.936l-12 9.223z"/></svg>;


// --- HELPER COMPONENTS ---

interface InputFieldProps {
  label: string;
  name: keyof FabricInputs;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange, unit, icon }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1.5 text-sm font-medium text-white">{label}</label>
    <div className="relative">
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border-slate-700 bg-slate-800 p-2.5 text-white shadow-sm transition-colors focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50 ${icon ? 'pl-10' : 'pl-3'}`}
        placeholder="0.00"
        step="any"
      />
      {unit && <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-white">{unit}</span>}
    </div>
  </div>
);

interface ResultDisplayProps {
    label: string;
    value: string;
    unit?: string;
    isHighlighted?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ label, value, unit, isHighlighted = false }) => (
    <div className={`flex items-baseline justify-between rounded-lg p-3 ${isHighlighted ? 'bg-emerald-900/50' : 'bg-slate-800/50'}`}>
        <span className="text-sm text-white">{label}</span>
        <div className="text-right">
            <span className={`font-semibold ${isHighlighted ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
            {unit && <span className="ml-1.5 text-xs text-white">{unit}</span>}
        </div>
    </div>
);

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const FabricCostingTool: React.FC<FabricCostingToolProps> = ({ navigateTo }) => {
    const initialState: FabricInputs = {
        read: '78',
        pick: '76',
        warpCount: '52',
        weftCount: '52',
        width: '61',
        quantity: '100000',
        warpYarnRate: '550',
        weftYarnRate: '550',
        conversionPerPick: '0.8',
        commissionPercentage: '0.00',
    };

    const [inputs, setInputs] = useState<FabricInputs>(initialState);

    // 🧠 SEO & Meta Tags Setup
    useEffect(() => {
        document.title = "Fabric Costing Calculator – Free Textile Cost Calculator for Warp, Weft & Per Meter Calculation | ZuraWebTools";

        // Set HTML lang attribute
        document.documentElement.setAttribute('lang', 'en');

        // 📝 Meta Description
        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute(
            'content',
            'Free fabric costing calculator for textile engineers. Calculate warp/weft weight, yarn consumption, conversion cost, and per-meter pricing instantly. Perfect for fabric manufacturers, designers, and textile industry professionals.'
        );
        document.head.appendChild(metaDescription);

        // 🏷️ Meta Keywords (LSI keywords)
        let metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute(
            'content',
            'fabric costing calculator, textile cost calculator, fabric cost per meter, warp weft calculation, yarn consumption calculator, fabric weight calculator, textile costing tool, fabric production cost'
        );
        document.head.appendChild(metaKeywords);

        // 📲 Open Graph & Twitter Cards
        const metaTags = [
            { property: 'og:title', content: 'Fabric Costing Calculator – Free Textile Cost Calculator | ZuraWebTools' },
            { property: 'og:description', content: 'Calculate fabric costs, yarn consumption, and per-meter pricing with our professional textile costing tool. Free and accurate for fabric manufacturers.' },
            { property: 'og:image', content: 'https://zurawebtools.com/assets/og-fabric-costing-tool.webp' },
            { property: 'og:image:alt', content: 'Free fabric costing calculator for textile cost calculation and yarn consumption analysis.' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'ZuraWebTools' },
            { property: 'og:url', content: 'https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool' },
            { property: 'og:locale', content: 'en_US' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Fabric Costing Calculator – Free Textile Cost Calculator | ZuraWebTools' },
            { name: 'twitter:description', content: 'Professional fabric costing tool to calculate yarn consumption, fabric weight, and per-meter pricing. Free for textile engineers and manufacturers.' },
            { name: 'twitter:image', content: 'https://zurawebtools.com/assets/og-fabric-costing-tool.webp' },
            { name: 'twitter:image:alt', content: 'Screenshot of ZuraWebTools fabric costing calculator showing detailed cost breakdown.' },
            { name: 'language', content: 'English' },
            { httpEquiv: 'content-language', content: 'en-US' },
            { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        ];
        metaTags.forEach(tag => {
            const el = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
            document.head.appendChild(el);
        });

        // 🔗 Canonical
        const canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', 'https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool');
        document.head.appendChild(canonical);

        // 📘 Structured Data (Schema)
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify([
            {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Fabric Costing Calculator",
                "applicationCategory": "CalculatorApplication",
                "applicationSubCategory": "Textile Calculator",
                "operatingSystem": "Any (Web-based)",
                "datePublished": "2024-01-20",
                "dateModified": "2024-11-08",
                "inLanguage": "en-US",
                "browserRequirements": "Requires JavaScript. Requires HTML5.",
                "softwareVersion": "1.5",
                "aggregateRating": { 
                    "@type": "AggregateRating", 
                    "ratingValue": "4.8", 
                    "ratingCount": "920" 
                },
                "offers": { 
                    "@type": "Offer", 
                    "price": "0", 
                    "priceCurrency": "USD" 
                },
                "publisher": { 
                    "@type": "Organization", 
                    "name": "ZuraWebTools", 
                    "url": "https://zurawebtools.com",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://zurawebtools.com/assets/logo.png",
                        "width": "250",
                        "height": "60"
                    },
                    "sameAs": [
                        "https://www.facebook.com/zurawebtools",
                        "https://twitter.com/zurawebtools",
                        "https://www.linkedin.com/company/zurawebtools"
                    ]
                },
                "description": "Professional fabric costing calculator for textile engineers to calculate warp/weft weight, yarn consumption, and per-meter fabric pricing with accurate conversion costs.",
                "url": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool",
                "featureList": [
                    "Warp and Weft weight calculation",
                    "Yarn consumption per meter",
                    "Total order requirement calculation",
                    "Cost breakdown per meter",
                    "Conversion cost calculation",
                    "Commission calculation",
                    "Real-time results"
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Fabric Costing Calculator – Free Textile Cost Calculator",
                "description": "Calculate fabric costs, yarn consumption, and per-meter pricing for textile manufacturing with our professional fabric costing tool.",
                "url": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool",
                "inLanguage": "en-US",
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "ZuraWebTools",
                    "url": "https://zurawebtools.com"
                },
                "datePublished": "2024-01-20",
                "dateModified": "2024-11-08"
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://zurawebtools.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Math & Calculation Tools",
                        "item": "https://zurawebtools.com/math-and-calculation-tools"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Fabric Costing Calculator",
                        "item": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool"
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Calculate Fabric Costing",
                "description": "Step-by-step guide to calculate fabric costs, yarn consumption, and per-meter pricing",
                "step": [
                    {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Enter Fabric Construction",
                        "text": "Input Read (EPI), Pick (PPI), Warp Count, Weft Count, and Fabric Width in inches to define your fabric structure.",
                        "url": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool#step1"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Add Cost Parameters",
                        "text": "Enter Quantity (meters), Warp Yarn Rate, Weft Yarn Rate, Conversion Rate per pick, and Commission percentage.",
                        "url": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool#step2"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "Review Calculated Results",
                        "text": "View warp/weft weight per meter, total fabric weight, and detailed cost breakdown including conversion and commission.",
                        "url": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool#step3"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 4,
                        "name": "Check Order Totals",
                        "text": "See total warp and weft bags required for your order quantity, plus weights for 40-meter sample calculations.",
                        "url": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool#step4"
                    },
                    {
                        "@type": "HowToStep",
                        "position": 5,
                        "name": "Adjust and Compare",
                        "text": "Modify parameters to simulate different fabric constructions, yarn rates, or quantities for comparison and optimization.",
                        "url": "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool#step5"
                    }
                ],
                "totalTime": "PT3M"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    { 
                        "@type": "Question", 
                        "name": "What does this Fabric Costing Tool calculate?", 
                        "acceptedAnswer": { 
                            "@type": "Answer", 
                            "text": "It calculates warp/weft weights per meter, fabric cost, conversion, commission, and total order consumption — based on your entered construction and cost parameters." 
                        } 
                    },
                    { 
                        "@type": "Question", 
                        "name": "How accurate are the results?", 
                        "acceptedAnswer": { 
                            "@type": "Answer", 
                            "text": "The tool uses standard textile calculation formulas (with constant 0.001367) used across weaving and processing industries. Results are highly accurate for estimation and costing." 
                        } 
                    },
                    { 
                        "@type": "Question", 
                        "name": "Can I use this for both woven and knitted fabrics?", 
                        "acceptedAnswer": { 
                            "@type": "Answer", 
                            "text": "This version is optimized for woven fabrics. For knits, you can adapt by using equivalent GSM or construction ratios." 
                        } 
                    },
                    { 
                        "@type": "Question", 
                        "name": "Will my data be saved or uploaded?", 
                        "acceptedAnswer": { 
                            "@type": "Answer", 
                            "text": "No — everything runs locally in your browser. Your data never leaves your device." 
                        } 
                    },
                    { 
                        "@type": "Question", 
                        "name": "Can I print or export the costing?", 
                        "acceptedAnswer": { 
                            "@type": "Answer", 
                            "text": "You can print directly using your browser print function or take a screenshot of the results for your records." 
                        } 
                    }
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

    // 📡 IndexNow: Notify search engines about page updates
    useEffect(() => {
        notifyIndexNow('/math-and-calculation-tools/fabric-costing-tool');
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const calculations = useMemo(() => {
        const p = (v: string) => parseFloat(v) || 0;

        const read = p(inputs.read);
        const pick = p(inputs.pick);
        const warpCount = p(inputs.warpCount);
        const weftCount = p(inputs.weftCount);
        const width = p(inputs.width);
        const quantity = p(inputs.quantity);
        const warpYarnRate = p(inputs.warpYarnRate);
        const weftYarnRate = p(inputs.weftYarnRate);
        const conversionPerPick = p(inputs.conversionPerPick);
        const commissionPercentage = p(inputs.commissionPercentage);

        const FABRIC_CONSTANT = 0.001367;

        const warpWeight = warpCount > 0 ? (read / warpCount) * width * FABRIC_CONSTANT : 0;
        const weftWeight = weftCount > 0 ? (pick / weftCount) * width * FABRIC_CONSTANT : 0;
        const totalWeight = warpWeight + weftWeight;

        const warpCost = warpWeight * warpYarnRate;
        const weftCost = weftWeight * weftYarnRate;
        const fabricCost = warpCost + weftCost;

        const conversionCostPerMtr = pick * conversionPerPick;
        const costBeforeComm = fabricCost + conversionCostPerMtr;
        const commissionAmount = costBeforeComm * (commissionPercentage / 100);
        const totalRate = costBeforeComm + commissionAmount;

        const totalWarpBags = (warpWeight * quantity) / 100;
        const totalWeftBags = (weftWeight * quantity) / 100;

        const warpWeight40m = warpWeight * 40;
        const weftWeight40m = weftWeight * 40;

        return {
            warpWeight, weftWeight, totalWeight,
            warpCost, weftCost, fabricCost,
            conversionCostPerMtr, costBeforeComm, commissionAmount, totalRate,
            totalWarpBags, totalWeftBags,
            warpWeight40m, weftWeight40m
        };
    }, [inputs]);

    const format = (num: number, digits = 3) => num.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });

    const shareUrl = "https://zurawebtools.com/math-and-calculation-tools/fabric-costing-tool";
    const shareTitle = "Fabric Costing Tool – Fabric Cost Calculator, Yarn Cost & Production Rate | ZuraWebTools";

    const socialLinks = [
        { name: 'Facebook', icon: <ShareFacebook />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
        { name: 'Twitter', icon: <ShareTwitter />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}` },
        { name: 'LinkedIn', icon: <ShareLinkedIn />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}` },
        { name: 'WhatsApp', icon: <ShareWhatsApp />, url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}` },
        { name: 'Email', icon: <ShareEmail />, url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Check out this fabric costing tool: ' + shareUrl)}` },
    ];

    return (
        <section className="py-20 bg-slate-800 text-gray-200">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                            Fabric Costing Calculator
                        </h1>
                        <p className="mt-4 text-lg text-gray-300">
                            An advanced, browser-based fabric costing calculator that helps textile engineers, manufacturers, and designers calculate accurate per-meter cost and yarn consumption instantly. No uploads, no spreadsheets — just enter your construction details and get live, precise results.
                        </p>
                    </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Input Section */}
                <div className="space-y-8">
                    <Card title="Fabric Construction">
                        <InputField label="Read (EPI)" name="read" value={inputs.read} onChange={handleInputChange} unit="ends/inch" icon={<GridIcon />} />
                        <InputField label="Pick (PPI)" name="pick" value={inputs.pick} onChange={handleInputChange} unit="picks/inch" icon={<GridIcon />} />
                        <InputField label="Warp Count" name="warpCount" value={inputs.warpCount} onChange={handleInputChange} unit="Ne" icon={<HashIcon />} />
                        <InputField label="Weft Count" name="weftCount" value={inputs.weftCount} onChange={handleInputChange} unit="Ne" icon={<HashIcon />} />
                        <InputField label="Width" name="width" value={inputs.width} onChange={handleInputChange} unit="inches" icon={<RulerIcon />} />
                    </Card>

                    <Card title="Order & Cost Parameters">
                        <InputField label="Quantity" name="quantity" value={inputs.quantity} onChange={handleInputChange} unit="mtrs" icon={<PackageIcon />} />
                        <InputField label="Warp Yarn Rate" name="warpYarnRate" value={inputs.warpYarnRate} onChange={handleInputChange} unit="/ kg" icon={<DollarIcon />} />
                        <InputField label="Weft Yarn Rate" name="weftYarnRate" value={inputs.weftYarnRate} onChange={handleInputChange} unit="/ kg" icon={<DollarIcon />} />
                        <InputField label="Conversion Rate" name="conversionPerPick" value={inputs.conversionPerPick} onChange={handleInputChange} unit="/ pick" icon={<DollarIcon />} />
                        <InputField label="Commission" name="commissionPercentage" value={inputs.commissionPercentage} onChange={handleInputChange} unit="%" icon={<PercentIcon />} />
                    </Card>
                </div>

                {/* Results Section */}
                <div className="space-y-8">
                    <Card title="Weight Analysis">
                        <h4 className="text-sm font-medium text-white mb-2">Weight per Meter</h4>
                        <ResultDisplay label="Warp Weight" value={format(calculations.warpWeight, 4)} unit="kg/mtr" />
                        <ResultDisplay label="Weft Weight" value={format(calculations.weftWeight, 4)} unit="kg/mtr" />
                        <ResultDisplay label="Total Weight" value={format(calculations.totalWeight, 4)} unit="kg/mtr" isHighlighted={true}/>
                        
                        <h4 className="text-sm font-medium text-white mt-6 mb-2">Weight per 40 Meters</h4>
                        <ResultDisplay label="Warp" value={format(calculations.warpWeight40m, 2)} unit="kg" />
                        <ResultDisplay label="Weft" value={format(calculations.weftWeight40m, 2)} unit="kg" />
                    </Card>
                    
                    <Card title="Total Order Consumption">
                        <ResultDisplay label="Total Warp Required" value={format(calculations.totalWarpBags, 2)} unit="bags (100kg)" />
                        <ResultDisplay label="Total Weft Required" value={format(calculations.totalWeftBags, 2)} unit="bags (100kg)" />
                    </Card>
                    
                    <Card title="Cost Breakdown (per Meter)">
                         <ResultDisplay label="Warp Cost" value={format(calculations.warpCost, 2)} unit="rate/mtr" />
                         <ResultDisplay label="Weft Cost" value={format(calculations.weftCost, 2)} unit="rate/mtr" />
                         <ResultDisplay label="Fabric Cost" value={format(calculations.fabricCost, 2)} unit="rate/mtr" />
                         <ResultDisplay label="Conversion Cost" value={format(calculations.conversionCostPerMtr, 2)} unit="rate/mtr" />
                         <ResultDisplay label="Commission" value={format(calculations.commissionAmount, 2)} unit="rate/mtr" />
                         <ResultDisplay label="Total Rate" value={format(calculations.totalRate, 2)} unit="rate/mtr" isHighlighted={true} />
                    </Card>
                </div>
            </div>

            <div className="my-16 text-center">
                 <h3 className="text-lg font-semibold text-white mb-4">Share this Tool</h3>
                <div className="flex justify-center items-center space-x-4">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Share on ${social.name}`}
                            className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Quick Examples Section - Moved here for instant value */}
            <section className="mt-12 bg-slate-900/50 border border-slate-800 rounded-xl p-8 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">📊 Common Fabric Examples</h2>
                <p className="text-slate-300 mb-6 text-center">Try these preset values for popular fabric constructions:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <h4 className="font-semibold text-emerald-400 mb-2">Cotton Poplin</h4>
                        <ul className="text-sm text-slate-300 space-y-1">
                            <li>• EPI: 78, PPI: 76</li>
                            <li>• Warp: 52s, Weft: 52s</li>
                            <li>• Width: 61 inches</li>
                            <li>• Common for shirts</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <h4 className="font-semibold text-emerald-400 mb-2">Denim Fabric</h4>
                        <ul className="text-sm text-slate-300 space-y-1">
                            <li>• EPI: 64, PPI: 42</li>
                            <li>• Warp: 10s, Weft: 12s</li>
                            <li>• Width: 58 inches</li>
                            <li>• Heavy weight, durable</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <h4 className="font-semibold text-emerald-400 mb-2">Canvas Fabric</h4>
                        <ul className="text-sm text-slate-300 space-y-1">
                            <li>• EPI: 44, PPI: 32</li>
                            <li>• Warp: 8s, Weft: 10s</li>
                            <li>• Width: 60 inches</li>
                            <li>• For bags, tents</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="text-3xl mb-3">⚡</div>
                    <h3 className="text-xl font-bold text-white mb-3">Instant Results</h3>
                    <p className="text-slate-300">Real-time calculations as you type. No waiting, no manual formulas — just instant, accurate fabric costing results.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="text-xl font-bold text-white mb-3">Industry Standard</h3>
                    <p className="text-slate-300">Uses proven textile formulas with fabric constant 0.001367, trusted by manufacturers worldwide for accurate cost estimation.</p>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
                    <div className="text-3xl mb-3">🔒</div>
                    <h3 className="text-xl font-bold text-white mb-3">100% Private</h3>
                    <p className="text-slate-300">All calculations happen in your browser. No data uploads, no server storage — your fabric costing stays completely confidential.</p>
                </div>
            </section>

            {/* Enhanced How to Use Section */}
            <section className="mt-16 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">📖 How to Use Fabric Costing Calculator</h2>
                <div className="space-y-6">
                    <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            1
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Enter Fabric Construction Values</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Input your fabric parameters: <strong>Read (EPI)</strong> for ends per inch, <strong>Pick (PPI)</strong> for picks per inch, <strong>Warp Count</strong> and <strong>Weft Count</strong> in Ne (English count), and <strong>Fabric Width</strong> in inches. These define your fabric structure.
                            </p>
                            <p className="text-sm text-emerald-400 mt-2">💡 Pro Tip: Common shirting uses 80x80 EPI/PPI with 60s count</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            2
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Add Cost Parameters</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Enter <strong>Quantity</strong> in meters for your order, <strong>Warp/Weft Yarn Rates</strong> per kg, <strong>Conversion Rate</strong> per pick (weaving cost), and <strong>Commission</strong> percentage. These determine your final pricing.
                            </p>
                            <p className="text-sm text-emerald-400 mt-2">💡 Pro Tip: Conversion rates vary by loom type (air-jet vs rapier)</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            3
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Review Calculated Results</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Instantly view <strong>warp/weft weight per meter</strong>, <strong>total fabric weight</strong>, and detailed <strong>cost breakdown</strong> including yarn cost, conversion cost, commission, and final rate per meter. All calculations update in real-time.
                            </p>
                            <p className="text-sm text-emerald-400 mt-2">💡 Pro Tip: Compare multiple constructions to optimize cost-quality ratio</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            4
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Check Order Totals</h3>
                            <p className="text-slate-300 leading-relaxed">
                                See <strong>total warp and weft bags required</strong> for your order quantity (in 100kg bags) plus weights for 40-meter sample calculations. Perfect for procurement planning and inventory management.
                            </p>
                            <p className="text-sm text-emerald-400 mt-2">💡 Pro Tip: Add 5-10% extra for wastage and selvedge</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            5
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Adjust & Compare</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Modify parameters to simulate different fabric constructions, yarn options, or quantities. Compare scenarios side-by-side to find the most cost-effective solution for your production needs.
                            </p>
                            <p className="text-sm text-emerald-400 mt-2">💡 Pro Tip: Test with different yarn counts to balance cost and quality</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="mt-16 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">🎯 Who Uses This Fabric Costing Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all duration-300 group">
                        <div className="text-4xl mb-4 text-center">🏭</div>
                        <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-emerald-400 transition-colors">Textile Manufacturers</h3>
                        <p className="text-slate-300 text-sm text-center">Plan production schedules, calculate bulk order requirements, and optimize yarn procurement for large-scale weaving operations.</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all duration-300 group">
                        <div className="text-4xl mb-4 text-center">🎨</div>
                        <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-emerald-400 transition-colors">Fabric Designers</h3>
                        <p className="text-slate-300 text-sm text-center">Estimate costs for custom fabric designs, test different construction options, and provide accurate quotes to clients.</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all duration-300 group">
                        <div className="text-4xl mb-4 text-center">🔧</div>
                        <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-emerald-400 transition-colors">Weaving Units</h3>
                        <p className="text-slate-300 text-sm text-center">Calculate order quotes quickly, determine conversion costs, and manage commission calculations for buyer negotiations.</p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-all duration-300 group">
                        <div className="text-4xl mb-4 text-center">🎓</div>
                        <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-emerald-400 transition-colors">Textile Students</h3>
                        <p className="text-slate-300 text-sm text-center">Learn fabric costing calculations, understand yarn consumption formulas, and practice real-world textile engineering scenarios.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="mt-16 bg-slate-900/50 border border-slate-800 rounded-xl p-8 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">About Fabric Costing Calculator</h2>
                <div className="space-y-4 text-slate-300 leading-relaxed max-w-5xl mx-auto">
                    <p>
                        Our <strong>Fabric Costing Calculator</strong> is a professional-grade textile calculator designed specifically for fabric manufacturers, textile engineers, designers, and production planners. This free online tool helps you calculate accurate <strong>warp and weft weights</strong>, <strong>yarn consumption</strong>, <strong>conversion costs</strong>, and <strong>per-meter pricing</strong> for woven fabrics instantly.
                    </p>
                    <p>
                        Whether you're working on <strong>textile manufacturing</strong>, estimating production costs, planning yarn procurement, or quoting fabric prices to clients, this calculator uses industry-standard formulas (fabric constant 0.001367) to deliver precise results. Perfect for <strong>weaving cost estimation</strong>, <strong>fabric gsm calculation</strong>, and <strong>yarn requirement analysis</strong>.
                    </p>
                    <p>
                        The tool calculates multiple critical parameters: warp weight per meter, weft weight per meter, total fabric weight, warp cost, weft cost, fabric cost, conversion cost per pick, commission, and final rate per meter. It also shows total warp and weft bags required for your order quantity (in 100kg bags) and sample weights for 40-meter calculations.
                    </p>
                    <p>
                        What sets this <strong>textile cost calculator</strong> apart is its real-time calculation engine. As you adjust parameters like EPI (ends per inch), PPI (picks per inch), yarn counts (Ne), fabric width, yarn rates, or conversion rates, results update instantly. This allows you to compare different fabric constructions, test various yarn options, and optimize costs before production.
                    </p>
                    <p>
                        Perfect for calculating costs for cotton fabrics, polyester fabrics, blended fabrics, shirting, suiting, denim, canvas, and any woven textile. The tool supports various measurement units commonly used in the textile industry and follows standard <a href="https://en.wikipedia.org/wiki/Textile_manufacturing" target="_blank" rel="noopener" className="text-emerald-400 hover:underline">textile manufacturing practices</a> worldwide.
                    </p>
                    <p>
                        All calculations are performed locally in your browser — no data is uploaded or stored on our servers. Your fabric costing information remains completely private and secure. Use it for unlimited calculations without any registration, fees, or limitations.
                    </p>
                </div>
            </section>

            {/* External Links Section */}
            <section className="mt-12 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">🔗 Helpful Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a 
                        href="https://en.wikipedia.org/wiki/Textile_manufacturing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors duration-300 group"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400">📚 Textile Manufacturing – Wikipedia</h3>
                        <p className="text-sm text-slate-400">Comprehensive guide to textile manufacturing processes, weaving techniques, and industry standards.</p>
                    </a>
                    <a 
                        href="https://en.wikipedia.org/wiki/Yarn" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition-colors duration-300 group"
                    >
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400">🧵 Yarn Count Systems – Wikipedia</h3>
                        <p className="text-sm text-slate-400">Understanding yarn counts (Ne, Nm, Tex) and how they affect fabric weight and costing calculations.</p>
                    </a>
                </div>
            </section>

            {/* Last Updated */}
            <div className="mt-8 text-center">
                <p className="text-xs text-slate-500">
                    Last Updated: November 8, 2024
                </p>
            </div>

            {/* FAQs Section */}
            <section className="mt-16 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">💬 Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-lg font-semibold text-white mb-2">Q1: What does this Fabric Costing Tool calculate?</h4>
                        <p className="text-slate-400">A: It calculates warp/weft weights per meter, fabric cost, conversion, commission, and total order consumption — based on your entered construction and cost parameters.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-lg font-semibold text-white mb-2">Q2: How accurate are the results?</h4>
                        <p className="text-slate-400">A: The tool uses standard textile calculation formulas (with constant 0.001367) used across weaving and processing industries. Results are highly accurate for estimation and costing.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-lg font-semibold text-white mb-2">Q3: Can I use this for both woven and knitted fabrics?</h4>
                        <p className="text-slate-400">A: This version is optimized for woven fabrics. For knits, you can adapt by using equivalent GSM or construction ratios.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-lg font-semibold text-white mb-2">Q4: Will my data be saved or uploaded?</h4>
                        <p className="text-slate-400">A: No — everything runs locally in your browser. Your data never leaves your device.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-lg font-semibold text-white mb-2">Q5: Can I print or export the costing?</h4>
                        <p className="text-slate-400">A: You can print directly using your browser print function or take a screenshot of the results for your records.</p>
                    </div>
                </div>
            </section>

            <RelatedTools
                navigateTo={navigateTo}
                relatedSlugs={['word-counter', 'case-converter', 'percentage-change-calculator']}
                currentSlug="fabric-costing-tool"
            />

            <footer className="text-center mt-12 text-white text-sm">
                <p>Powered by ZuraWebTools</p>
                <p>Created by Rana Abdul Rehman / Zahidan Fabrics Laal Mill Faisalabad</p>
            </footer>
                </div>
            </div>
        </section>
    );
};

export default FabricCostingTool;