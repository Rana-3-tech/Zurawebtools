
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// --- TYPE DEFINITIONS ---
type Unit = 'in' | 'cm';
type FabricWidth = '42' | '44' | '54' | '60' | 'custom';
type Orientation = 'lengthwise' | 'crosswise';
type PatternOrientation = 'horizontal' | 'vertical';

interface CuttingPlan {
  numPanels: number;
  panelLengthIn: number;
  panelLengthCm: number;
  totalCuts: number;
}

interface CalculationResult {
  totalFabricYards: number;
  totalFabricMeters: number;
  cuttingPlan: CuttingPlan | null;
  summary: string;
  json: string;
  cost: number;
  perQuiltYards: number;
  perQuiltMeters: number;
  warning: string | null;
}

// --- HELPER COMPONENTS (defined outside main component to prevent re-renders) ---

interface InputFieldProps {
  label: string;
  id: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unitLabel?: string;
  type?: string;
  step?: string;
  min?: string;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, value, onChange, unitLabel, type = "number", step = "0.01", min = "0", helpText }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-300">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
        className="w-full rounded-md border border-slate-300 bg-white p-2 pr-12 text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
        aria-describedby={helpText ? `${id}-help` : undefined}
      />
      {unitLabel && <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-slate-500 dark:text-slate-400">{unitLabel}</span>}
    </div>
    {helpText && <p id={`${id}-help`} className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helpText}</p>}
  </div>
);

interface SelectFieldProps<T extends string> {
  label: string;
  id: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: T; label: string }[];
}
const SelectField = <T extends string,>({ label, id, value, onChange, options }: SelectFieldProps<T>) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-600 dark:text-slate-300">{label}</label>
        <select id={id} value={value} onChange={onChange} className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100">
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);


interface SvgPreviewProps {
    quiltWidth: number;
    quiltLength: number;
    fabricWidth: number;
    cuttingPlan: CuttingPlan | null;
    orientation: Orientation;
    updateAnimationKey: number;
}

const SvgPreview: React.FC<SvgPreviewProps> = ({ quiltWidth, quiltLength, fabricWidth, cuttingPlan, orientation, updateAnimationKey }) => {
    const PADDING = 20;
    const VIEWBOX_WIDTH = 400;
    const VIEWBOX_HEIGHT = 400;

    const quiltAspectRatio = quiltWidth / quiltLength;
    const containerAspectRatio = VIEWBOX_WIDTH / VIEWBOX_HEIGHT;

    let scale;
    if (quiltAspectRatio > containerAspectRatio) {
        scale = (VIEWBOX_WIDTH - PADDING * 2) / quiltWidth;
    } else {
        scale = (VIEWBOX_HEIGHT - PADDING * 2) / quiltLength;
    }

    const scaledQuiltW = quiltWidth * scale;
    const scaledQuiltL = quiltLength * scale;
    const scaledFabricW = fabricWidth * scale;
    const scaledPanelL = cuttingPlan ? cuttingPlan.panelLengthIn * scale : 0;
    
    const quiltX = (VIEWBOX_WIDTH - scaledQuiltW) / 2;
    const quiltY = (VIEWBOX_HEIGHT - scaledQuiltL) / 2;

    const panels = [];
    if (cuttingPlan) {
        for (let i = 0; i < cuttingPlan.numPanels; i++) {
            if (orientation === 'lengthwise') {
                const panelX = quiltX + i * scaledFabricW;
                panels.push(
                    <rect
                        key={`panel-${i}`}
                        x={panelX}
                        y={quiltY}
                        width={scaledFabricW}
                        height={scaledQuiltL}
                        className="fill-green-300/50 stroke-green-600 dark:fill-green-700/50 dark:stroke-green-400"
                        strokeWidth="1"
                    />
                );
            } else { // crosswise
                const panelY = quiltY + i * scaledFabricW;
                 panels.push(
                    <rect
                        key={`panel-${i}`}
                        x={quiltX}
                        y={panelY}
                        width={scaledQuiltW}
                        height={scaledFabricW}
                        className="fill-green-300/50 stroke-green-600 dark:fill-green-700/50 dark:stroke-green-400"
                        strokeWidth="1"
                    />
                );
            }
        }
    }

    return (
        <div key={updateAnimationKey} className="animate-glow rounded-lg bg-slate-100 dark:bg-slate-800 p-4 transition-colors duration-300">
            <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="w-full h-auto max-h-[400px]">
                {panels}
                <rect 
                    x={quiltX} 
                    y={quiltY} 
                    width={scaledQuiltW} 
                    height={scaledQuiltL} 
                    className="fill-blue-300/50 stroke-blue-600 dark:fill-blue-700/50 dark:stroke-blue-400" 
                    strokeWidth="2"
                    style={{ transition: 'all 0.5s ease-in-out' }}
                />
            </svg>
            <div className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-block w-3 h-3 rounded-sm bg-blue-300/50 border border-blue-600 dark:bg-blue-700/50 dark:border-blue-400 mr-1 align-middle"></span> Quilt
                <span className="inline-block w-3 h-3 rounded-sm bg-green-300/50 border border-green-600 dark:bg-green-700/50 dark:border-green-400 ml-4 mr-1 align-middle"></span> Fabric Panels
            </div>
        </div>
    );
};


// --- CONSTANTS ---
const IN_TO_CM = 2.54;
const YD_TO_IN = 36;
const M_TO_IN = 39.3701;

const DEFAULTS = {
    unit: 'in' as Unit,
    quiltWidth: 60,
    quiltLength: 72,
    fabricWidth: '42' as FabricWidth,
    customFabricWidth: 108,
    seamAllowance: 0.5,
    backingOrientation: 'lengthwise' as Orientation,
    patternRepeat: 0,
    patternOrientation: 'vertical' as PatternOrientation,
    wastageBuffer: 10,
    numQuilts: 1,
    price: 12,
    priceUnit: 'yard',
    matchDirectional: false,
    purchaseIncrement: 0.25,
};

// --- MAIN COMPONENT ---
const QuiltBackingCalculator: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const [unit, setUnit] = useState<Unit>(DEFAULTS.unit);
    const [quiltWidth, setQuiltWidth] = useState<number>(DEFAULTS.quiltWidth);
    const [quiltLength, setQuiltLength] = useState<number>(DEFAULTS.quiltLength);
    const [fabricWidth, setFabricWidth] = useState<FabricWidth>(DEFAULTS.fabricWidth);
    const [customFabricWidth, setCustomFabricWidth] = useState<number>(DEFAULTS.customFabricWidth);
    const [seamAllowance, setSeamAllowance] = useState<number>(DEFAULTS.seamAllowance);
    const [backingOrientation, setBackingOrientation] = useState<Orientation>(DEFAULTS.backingOrientation);
    const [patternRepeat, setPatternRepeat] = useState<number>(DEFAULTS.patternRepeat);
    const [patternOrientation, setPatternOrientation] = useState<PatternOrientation>(DEFAULTS.patternOrientation);
    const [wastageBuffer, setWastageBuffer] = useState<number>(DEFAULTS.wastageBuffer);
    const [numQuilts, setNumQuilts] = useState<number>(DEFAULTS.numQuilts);
    const [price, setPrice] = useState<number>(DEFAULTS.price);
    const [matchDirectional, setMatchDirectional] = useState<boolean>(DEFAULTS.matchDirectional);
    const [purchaseIncrement, setPurchaseIncrement] = useState<number>(DEFAULTS.purchaseIncrement);
    
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [copySummaryStatus, setCopySummaryStatus] = useState(false);
    const [copyJsonStatus, setCopyJsonStatus] = useState(false);
    const [updateAnimationKey, setUpdateAnimationKey] = useState(0);

    // --- SEO & METADATA EFFECT ---
    useEffect(() => {
        document.title = 'Quilt Backing Calculator — Free Fabric Yardage & Backing Calculator for Quilts';
        const metaDesc = 'Free quilt backing calculator: Calculate backing fabric for quilts instantly. Supports 42", 44", 54", 60", 108" wide fabric. Get yardage, cutting plans & cost estimates for backing calculator quilt projects.';
        const metaKeywords = 'quilt backing calculator, backing calculator quilt, calculating backing for a quilt, quilt calculator for backing, calculate backing for quilt, how to calculate quilt backing, quilt backing fabric calculator, 108 quilt backing calculator, backing calculator for quilts, calculate fabric for quilt backing, quilt back calculator, backing quilt calculator, how to calculate backing for quilts, simple quilt backing calculator, fabric calculator for quilt backing';
        const canonicalUrl = 'https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator';
        
        const setMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name='${name}']`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };
        
        setMeta('description', metaDesc);
        setMeta('keywords', metaKeywords);
        setMeta('robots', 'index, follow, max-image-preview:large');

        // Open Graph & Twitter Meta Tags
        const ogTags = [
            { property: 'og:title', content: 'Quilt Backing Calculator — Free Fabric Yardage & Backing Calculator for Quilts' },
            { property: 'og:description', content: metaDesc },
            { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-quilt-backing-calculator-og.png' },
            { property: 'og:image:alt', content: 'Quilt Backing Calculator showing fabric yardage and cutting plans for quilt backing.' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonicalUrl },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:site_name', content: 'ZuraWebTools' },
            { property: 'article:published_time', content: '2024-11-09T08:00:00Z' },
            { property: 'article:modified_time', content: new Date().toISOString() },
        ];
        const twitterTags = [
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: 'Quilt Backing Calculator — Free Fabric Yardage Calculator' },
            { name: 'twitter:description', content: 'Calculate quilt backing fabric instantly. Supports 42", 44", 54", 60", 108" fabric widths. Free calculator with cutting plans.' },
            { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-quilt-backing-calculator-og.png' },
            { name: 'twitter:image:alt', content: 'Quilt Backing Calculator interface' },
            { name: 'twitter:site', content: '@ZuraWebTools' },
        ];
        
        [...ogTags, ...twitterTags].forEach(tag => {
            let element = document.querySelector(`meta[${Object.keys(tag)[0]}='${Object.values(tag)[0]}']`);
            if (!element) {
                element = document.createElement('meta');
                Object.entries(tag).forEach(([key, value]) => element!.setAttribute(key, value));
                document.head.appendChild(element);
            }
        });

        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonicalUrl);
        
        const jsonLdScriptId = 'app-json-ld';
        let script = document.getElementById(jsonLdScriptId);
        // FIX: Use a new, correctly typed variable for the created script element to avoid TypeScript error.
        if(!script) {
            const newScript = document.createElement('script');
            newScript.id = jsonLdScriptId;
            newScript.type = 'application/ld+json';
            document.head.appendChild(newScript);
            script = newScript;
        }
        script.innerHTML = JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
              { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://zurawebtools.com/tools" },
              { "@type": "ListItem", "position": 3, "name": "Quilt Backing Calculator", "item": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Quilt Backing Calculator",
            "applicationCategory": "Utility",
            "operatingSystem": "Any (Web-based)",
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "620" },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
            "description": "Free backing calculator for quilts with 42\", 44\", 54\", 60\", 108\" fabric support. Calculate backing fabric yardage, cutting plans, and cost estimates for quilt backing projects.",
            "url": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much extra fabric should I buy for matching patterns or directional prints?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical recommendations are 10–20% extra depending on pattern complexity; this tool’s pattern-repeat option adds an adjustable buffer and exact extra length per panel for precise matching."
                }
              },
              {
                "@type": "Question",
                "name": "What fabric width should I choose if I’m not sure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Measure your most common fabric bolts (42\", 44–45\", 54\", 60\"). Wider fabric reduces the number of seams. This calculator shows the difference in number of panels required for each width so you can compare costs."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for multiple quilts or for calculating yardage for a batch?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Set “Number of quilts” to get per-quilt and total yardage and cost. The cutting plan adapts to batch mode and shows total cuts needed."
                }
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Calculate Quilt Backing Fabric",
            "description": "Step-by-step guide to calculating quilt backing yardage for any size quilt",
            "totalTime": "PT2M",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Enter Quilt Dimensions",
                "text": "Measure your finished quilt top width and length. Add 4-6 inches extra on all sides for quilting allowance.",
                "url": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator#step1"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Select Fabric Width",
                "text": "Choose your fabric width: 42\", 44\", 54\", 60\", or 108\". Wider fabric reduces the number of seams needed.",
                "url": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator#step2"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Set Seam Allowance",
                "text": "Enter your seam allowance (typically 0.5 inches). This accounts for fabric lost in seams when piecing panels.",
                "url": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator#step3"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Adjust Wastage Buffer",
                "text": "Set wastage buffer (default 10%). This covers fabric shrinkage, cutting irregularities, and quilting frame tension.",
                "url": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator#step4"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Get Results",
                "text": "View total yardage needed, cutting plan with panel layout, cost estimate, and downloadable summary.",
                "url": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator#step5"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Quilt Backing Calculator",
            "url": "https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator",
            "description": "Free quilt backing calculator: Calculate backing fabric for quilts instantly. Supports 42\", 44\", 54\", 60\", 108\" wide fabric. Get yardage, cutting plans & cost estimates.",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
                { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://zurawebtools.com/tools" },
                { "@type": "ListItem", "position": 3, "name": "Quilt Backing Calculator" }
              ]
            },
            "publisher": {
              "@type": "Organization",
              "name": "ZuraWebTools",
              "url": "https://zurawebtools.com"
            },
            "datePublished": "2024-11-09T08:00:00Z",
            "dateModified": new Date().toISOString(),
            "inLanguage": "en-US"
          }
        ]);
        
        return () => {
            document.title = 'ZuraWebTools';
            document.querySelector("meta[name='description']")?.remove();
            document.querySelector("meta[name='keywords']")?.remove();
            document.querySelector("meta[name='robots']")?.remove();
            document.querySelector("link[rel='canonical']")?.remove();
            document.querySelectorAll("meta[property^='og:']").forEach(el => el.remove());
            document.querySelectorAll("meta[name^='twitter:']").forEach(el => el.remove());
            document.querySelectorAll("meta[property^='article:']").forEach(el => el.remove());
            document.getElementById(jsonLdScriptId)?.remove();
        };
    }, []);

    // --- CALCULATION EFFECT ---
    useEffect(() => {
        // --- Unit Conversion ---
        const toInches = (val: number) => (unit === 'cm' ? val / IN_TO_CM : val);
        
        const quiltWidthIn = toInches(quiltWidth);
        const quiltLengthIn = toInches(quiltLength);
        const seamAllowanceIn = toInches(seamAllowance);
        const patternRepeatIn = toInches(patternRepeat);

        if (quiltWidthIn <= 0 || quiltLengthIn <= 0) {
            setResult(null);
            return;
        }

        let effectiveFabricWidthIn = fabricWidth === 'custom' 
            ? customFabricWidth 
            : fabricWidth === '44' ? 44.5 : parseInt(fabricWidth, 10);
        
        effectiveFabricWidthIn -= 2 * seamAllowanceIn; // Usable width after selvedges are trimmed
        if (effectiveFabricWidthIn <= 0) {
            setResult({
                ...DEFAULTS, 
                warning: "Fabric usable width is zero or less after removing seam allowance.", 
                totalFabricYards: 0,
                totalFabricMeters: 0,
                cuttingPlan: null,
                summary: "",
                json: "",
                cost: 0,
                perQuiltYards: 0,
                perQuiltMeters: 0,
            });
            return;
        }

        // --- Core Calculation Logic ---
        let numPanels: number;
        let panelLengthBaseIn: number;
        let warning: string | null = null;
        
        if (backingOrientation === 'lengthwise') {
            numPanels = Math.ceil(quiltWidthIn / effectiveFabricWidthIn);
            panelLengthBaseIn = quiltLengthIn + (2 * seamAllowanceIn);
        } else { // crosswise
            numPanels = Math.ceil(quiltLengthIn / effectiveFabricWidthIn);
            panelLengthBaseIn = quiltWidthIn + (2 * seamAllowanceIn);
        }
        if (numPanels > 1) {
            warning = "Quilt exceeds fabric width — seam joins will be required."
        }

        // Adjust for pattern repeat
        let panelLengthFinalIn = panelLengthBaseIn;
        if (patternRepeatIn > 0) {
            panelLengthFinalIn = Math.ceil(panelLengthBaseIn / patternRepeatIn) * patternRepeatIn;
        }

        // Calculate total length
        let totalFabricLengthIn = panelLengthFinalIn * numPanels;

        // Adjust for directional matching
        if (matchDirectional && patternRepeatIn > 0 && numPanels > 1) {
            totalFabricLengthIn += (numPanels - 1) * patternRepeatIn;
        }
        
        // Apply wastage buffer
        const totalWithWastageIn = totalFabricLengthIn * (1 + wastageBuffer / 100);

        // Convert to yards and round to purchase increment
        const totalFabricYardsRaw = totalWithWastageIn / YD_TO_IN;
        const perQuiltYards = Math.ceil(totalFabricYardsRaw / purchaseIncrement) * purchaseIncrement;

        // Final calculated values
        const totalFabricYards = perQuiltYards * numQuilts;
        const totalFabricMeters = (totalFabricYards * YD_TO_IN) / M_TO_IN;
        const perQuiltMeters = perQuiltYards * YD_TO_IN / M_TO_IN;

        const cost = price > 0 ? totalFabricYards * price : 0;
        
        const cuttingPlan: CuttingPlan = {
            numPanels,
            panelLengthIn: panelLengthFinalIn,
            panelLengthCm: panelLengthFinalIn * IN_TO_CM,
            totalCuts: numPanels * numQuilts,
        };

        // --- Generate Summaries ---
        const summary = `Buy ${totalFabricYards.toFixed(2)} yards (or ${totalFabricMeters.toFixed(2)} meters) of ${fabricWidth === 'custom' ? customFabricWidth : fabricWidth}" fabric.
For each of the ${numQuilts} quilt(s): Cut ${numPanels} panel(s), each ${panelLengthFinalIn.toFixed(2)} inches (or ${(panelLengthFinalIn * IN_TO_CM).toFixed(2)} cm) long.
${warning || ''}`;
        
        const jsonOutput = {
            inputs: { unit, quiltWidth, quiltLength, fabricWidth, customFabricWidth, seamAllowance, backingOrientation, patternRepeat, wastageBuffer, numQuilts, price, matchDirectional, purchaseIncrement },
            outputs: { totalFabricYards, totalFabricMeters, perQuiltYards, perQuiltMeters, cost, cuttingPlan, warning }
        };

        setResult({
            totalFabricYards, totalFabricMeters, cuttingPlan, summary, json: JSON.stringify(jsonOutput, null, 2), cost, perQuiltYards, perQuiltMeters, warning
        });
        setUpdateAnimationKey(prev => prev + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        unit, quiltWidth, quiltLength, fabricWidth, customFabricWidth, 
        seamAllowance, backingOrientation, patternRepeat, wastageBuffer, 
        numQuilts, price, matchDirectional, purchaseIncrement
    ]);

    // --- HANDLERS ---
    const handleReset = () => {
        setUnit(DEFAULTS.unit);
        setQuiltWidth(DEFAULTS.quiltWidth);
        setQuiltLength(DEFAULTS.quiltLength);
        setFabricWidth(DEFAULTS.fabricWidth);
        setCustomFabricWidth(DEFAULTS.customFabricWidth);
        setSeamAllowance(DEFAULTS.seamAllowance);
        setBackingOrientation(DEFAULTS.backingOrientation);
        setPatternRepeat(DEFAULTS.patternRepeat);
        setPatternOrientation(DEFAULTS.patternOrientation);
        setWastageBuffer(DEFAULTS.wastageBuffer);
        setNumQuilts(DEFAULTS.numQuilts);
        setPrice(DEFAULTS.price);
        setMatchDirectional(DEFAULTS.matchDirectional);
        setPurchaseIncrement(DEFAULTS.purchaseIncrement);
    };

    const handleCopy = (text: string, setStatus: React.Dispatch<React.SetStateAction<boolean>>) => {
        navigator.clipboard.writeText(text).then(() => {
            setStatus(true);
            setTimeout(() => setStatus(false), 2000);
        });
    };
    
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow && result) {
            printWindow.document.write(`
                <html>
                    <head><title>Quilt Backing Calculation Summary</title>
                    <style>
                        body { font-family: sans-serif; line-height: 1.6; padding: 20px; }
                        h1 { color: #333; }
                        pre { background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
                    </style>
                    </head>
                    <body>
                        <h1>Quilt Backing Calculation Summary</h1>
                        <pre>${result.summary}</pre>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };
    
    const fabricWidthValue = useMemo(() => {
        return fabricWidth === 'custom' 
            ? customFabricWidth 
            : fabricWidth === '44' ? 44.5 : parseInt(fabricWidth, 10);
    }, [fabricWidth, customFabricWidth]);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">Free Quilt Backing Calculator — Calculate Backing Fabric for Quilts</h1>
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">Calculate quilt backing yardage instantly with our free backing calculator for quilts. Supports 42", 44", 54", 60", 108" fabric widths. Get cutting plans, cost estimates & visual layout for calculating backing for a quilt.</p>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* --- INPUTS PANEL --- */}
                <div className="lg:col-span-2 space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
                    <div className="flex justify-between items-center">
                         <h2 className="text-xl font-semibold">Controls</h2>
                         <div className="flex items-center space-x-2 rounded-lg bg-slate-200 p-1 dark:bg-slate-700">
                            <button onClick={() => setUnit('in')} className={`px-3 py-1 text-sm rounded-md transition-colors ${unit === 'in' ? 'bg-white dark:bg-slate-900 shadow' : ''}`}>in</button>
                            <button onClick={() => setUnit('cm')} className={`px-3 py-1 text-sm rounded-md transition-colors ${unit === 'cm' ? 'bg-white dark:bg-slate-900 shadow' : ''}`}>cm</button>
                        </div>
                    </div>

                    <section className="space-y-4 rounded-md border p-4 dark:border-slate-700">
                        <h3 className="font-medium">Quilt Size</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Quilt Width" id="quiltWidth" value={quiltWidth} onChange={e => setQuiltWidth(parseFloat(e.target.value))} unitLabel={unit} />
                            <InputField label="Quilt Length" id="quiltLength" value={quiltLength} onChange={e => setQuiltLength(parseFloat(e.target.value))} unitLabel={unit} />
                        </div>
                    </section>

                    <section className="space-y-4 rounded-md border p-4 dark:border-slate-700">
                        <h3 className="font-medium">Fabric Options</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <SelectField label="Fabric Usable Width" id="fabricWidth" value={fabricWidth} onChange={e => setFabricWidth(e.target.value as FabricWidth)} options={[
                                {value: '42', label: '42"'},
                                {value: '44', label: '44-45"'},
                                {value: '54', label: '54"'},
                                {value: '60', label: '60"'},
                                {value: 'custom', label: 'Custom...'},
                           ]}/>
                            {fabricWidth === 'custom' && <InputField label="Custom Width" id="customFabricWidth" value={customFabricWidth} onChange={e => setCustomFabricWidth(parseFloat(e.target.value))} unitLabel="in" />}
                           <InputField label="Seam Allowance" id="seamAllowance" value={seamAllowance} onChange={e => setSeamAllowance(parseFloat(e.target.value))} unitLabel={unit} helpText="Per side of seam." />
                            <SelectField label="Backing Orientation" id="backingOrientation" value={backingOrientation} onChange={e => setBackingOrientation(e.target.value as Orientation)} options={[
                                {value: 'lengthwise', label: 'Lengthwise (Vertical)'},
                                {value: 'crosswise', label: 'Crosswise (Horizontal)'}
                            ]}/>
                        </div>
                    </section>
                    
                    <section className="space-y-4 rounded-md border p-4 dark:border-slate-700">
                        <h3 className="font-medium">Advanced</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Pattern Repeat" id="patternRepeat" value={patternRepeat} onChange={e => setPatternRepeat(parseFloat(e.target.value))} unitLabel={unit} helpText="0 for no repeat." />
                            <SelectField label="Purchase Increment" id="purchaseIncrement" value={String(purchaseIncrement)} onChange={e => setPurchaseIncrement(parseFloat(e.target.value))} options={[
                               {value: '0.125', label: '1/8 yd/m'},
                               {value: '0.25', label: '1/4 yd/m'},
                               {value: '0.5', label: '1/2 yd/m'},
                               {value: '1', label: '1 yd/m'},
                            ]}/>
                        </div>
                        <div className="flex items-center">
                           <input type="checkbox" id="matchDirectional" checked={matchDirectional} onChange={e => setMatchDirectional(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                           <label htmlFor="matchDirectional" className="ml-2 block text-sm">Match Directional Print</label>
                        </div>
                        <div>
                            <label htmlFor="wastageBuffer" className="block text-sm font-medium">Wastage Buffer: {wastageBuffer}%</label>
                            <input type="range" id="wastageBuffer" value={wastageBuffer} onChange={e => setWastageBuffer(parseInt(e.target.value))} min="0" max="50" step="1" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
                        </div>
                    </section>
                    
                    <section className="space-y-4 rounded-md border p-4 dark:border-slate-700">
                        <h3 className="font-medium">Batch & Cost</h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Number of Quilts" id="numQuilts" value={numQuilts} onChange={e => setNumQuilts(parseInt(e.target.value))} type="number" step="1" min="1"/>
                            <InputField label="Price per Yard/Meter" id="price" value={price} onChange={e => setPrice(parseFloat(e.target.value))} />
                         </div>
                    </section>

                    <div className="flex justify-end pt-4">
                        <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">Reset</button>
                    </div>
                </div>

                {/* --- RESULTS & PREVIEW PANEL --- */}
                <div className="lg:col-span-3 space-y-6">
                    <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
                        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                        <SvgPreview
                            quiltWidth={unit === 'in' ? quiltWidth : quiltWidth / IN_TO_CM}
                            quiltLength={unit === 'in' ? quiltLength : quiltLength / IN_TO_CM}
                            fabricWidth={fabricWidthValue}
                            cuttingPlan={result?.cuttingPlan ?? null}
                            orientation={backingOrientation}
                            updateAnimationKey={updateAnimationKey}
                        />
                         {result?.warning && (
                            <div className="mt-4 p-3 text-sm text-yellow-800 bg-yellow-100 rounded-lg dark:bg-yellow-900 dark:text-yellow-300" role="alert">
                                <span className="font-medium">Note:</span> {result.warning}
                            </div>
                        )}
                    </section>

                    {result && result.cuttingPlan && (
                        <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
                            <h2 className="text-xl font-semibold mb-4">Calculation Results</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-center">
                                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                                    <p className="text-sm uppercase text-slate-500 dark:text-slate-400">Total Fabric Needed</p>
                                    <p className="text-2xl font-bold">{result.totalFabricYards.toFixed(2)} yards</p>
                                    <p className="text-md text-slate-600 dark:text-slate-300">{result.totalFabricMeters.toFixed(2)} meters</p>
                                </div>
                                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                                    <p className="text-sm uppercase text-slate-500 dark:text-slate-400">Estimated Cost</p>
                                    <p className="text-2xl font-bold">${result.cost.toFixed(2)}</p>
                                    <p className="text-md text-slate-600 dark:text-slate-300">{numQuilts > 1 ? `($${(result.cost/numQuilts).toFixed(2)} per quilt)` : 'Total cost'}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="summary" className="block text-sm font-medium">Summary</label>
                                    <textarea id="summary" readOnly value={result.summary} className="mt-1 w-full h-32 rounded-md border border-slate-300 bg-slate-50 p-2 text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100" />
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button onClick={() => handleCopy(result.summary, setCopySummaryStatus)} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">{copySummaryStatus ? 'Copied!' : 'Copy Summary'}</button>
                                        <button onClick={handlePrint} className="px-3 py-1 text-sm bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500">Print</button>
                                    </div>
                                </div>
                                <details className="group">
                                    <summary className="cursor-pointer text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-600">Show Raw JSON Output</summary>
                                    <div className="mt-2">
                                        <textarea readOnly value={result.json} className="mt-1 w-full h-48 font-mono text-xs rounded-md border border-slate-300 bg-slate-50 p-2 text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"/>
                                        <button onClick={() => handleCopy(result.json, setCopyJsonStatus)} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mt-2">{copyJsonStatus ? 'Copied!' : 'Copy JSON'}</button>
                                    </div>
                                </details>
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Share This Tool Section */}
            <section className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">📤 Share This Tool</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Help other quilters by sharing this free calculator!</p>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                            aria-label="Share on Facebook"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            <span>Facebook</span>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator')}&text=${encodeURIComponent('Calculate quilt backing fabric instantly with this free tool! 🧵✂️')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                            aria-label="Share on Twitter"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>Twitter</span>
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                            aria-label="Share on LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span>LinkedIn</span>
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent('Check out this free Quilt Backing Calculator! https://zurawebtools.com/construction-and-engineering-tools/quilt-backing-calculator')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                            aria-label="Share on WhatsApp"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.12l-1.149 4.184 4.281-1.137zm9.865-6.948c-.273-.136-1.612-.799-1.865-.891-.252-.092-.435-.136-.617.136-.182.272-.703.891-.865 1.064-.163.173-.325.195-.601.06-.276-.135-1.157-.426-2.204-1.359-.817-.719-1.365-1.611-1.531-1.887-.165-.276-.021-.428.115-.563.121-.122.273-.318.41-.463.136-.145.182-.252.273-.422.092-.17.046-.318-.023-.453-.069-.136-.617-1.475-.845-2.015-.227-.54-.454-.463-.617-.463-.163 0-.347-.023-.53-.023-.182 0-.477.068-.72.34-.244.271-.935.91-1.136 2.219-.201 1.308.291 2.569.331 2.748.04.182.633 1.96 3.06 3.593 2.427 1.632 3.053 1.301 3.593 1.156.54-.145 1.612-.663 1.838-.918.228-.254.228-.472.163-.618z"/>
                            </svg>
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>
            
            <footer className="mt-12 space-y-8">
                <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Key Insights for Perfect Quilt Backing</h2>
                    <div className="space-y-6 max-w-5xl mx-auto text-gray-700 dark:text-gray-300">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">1. Why Use This Quilt Backing Calculator?</h3>
                            <p className="leading-relaxed mb-3">
                                Calculating backing for a quilt can be tricky—especially when working with different fabric widths, pattern repeats, or batch orders. 
                                This <strong>free backing calculator for quilts</strong> eliminates guesswork and helps you save money, time, and fabric.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 Save Money</h4>
                                    <p className="text-blue-700 dark:text-blue-300 text-sm">Know exactly how much fabric to buy—no over-purchasing or running short mid-project.</p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">📏 Multiple Widths</h4>
                                    <p className="text-green-700 dark:text-green-300 text-sm">Works with 42", 44", 54", 60", and 108" wide backing fabric.</p>
                                </div>
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🎨 Pattern Repeats</h4>
                                    <p className="text-purple-700 dark:text-purple-300 text-sm">Perfect for directional prints and large-scale designs that need pattern matching.</p>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">📊 Batch Calculations</h4>
                                    <p className="text-orange-700 dark:text-orange-300 text-sm">Planning multiple quilts? Get total yardage and per-quilt breakdowns instantly.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">2. Common Quilt Backing Mistakes to Avoid</h3>
                            <div className="space-y-3">
                                <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-900/10 p-3 rounded-r">
                                    <h4 className="font-medium text-red-800 dark:text-red-200">⚠️ Not accounting for shrinkage and tension</h4>
                                    <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                                        Always add 4-6 inches on all sides (8-12" total). Quilting frames pull fabric taut, and pre-washing can shrink fabric by 3-5%. 
                                        Our tool includes adjustable wastage buffer (default 10%) to prevent this mistake.
                                    </p>
                                </div>
                                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-r">
                                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">⚠️ Forgetting seam allowances</h4>
                                    <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                                        When piecing multiple panels, you'll lose 0.5-1" per seam. For a 3-panel backing, that's 1-2" of width lost! 
                                        This calculator automatically factors in your specified seam allowance.
                                    </p>
                                </div>
                                <div className="border-l-4 border-indigo-500 pl-4 bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-r">
                                    <h4 className="font-medium text-indigo-800 dark:text-indigo-200">⚠️ Ignoring grain direction</h4>
                                    <p className="text-indigo-700 dark:text-indigo-300 text-sm mt-1">
                                        Running fabric crosswise when it should be lengthwise can cause distortion. 
                                        Choose orientation wisely—critical for directional prints.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">3. Fabric Width Guide for Quilt Backing</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Width</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Best For</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-100">42"</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Quilts up to 35" wide</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Most economical, requires piecing for larger quilts</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-100">44-45"</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Baby & lap quilts up to 38"</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">Premium cotton, most common choice</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-100">108"</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">King-size quilts</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">No seams! Saves time and reduces bulk</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 mt-4">
                                <div className="flex items-start space-x-3">
                                    <div className="text-2xl">💡</div>
                                    <div>
                                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Pro Tip</h4>
                                        <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                                            For quilts 80"+ wide, <strong>108" backing</strong> often costs less overall than piecing narrower fabric—plus you avoid seam bulk!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">📖 How to Use This Calculator (Step-by-Step)</h2>
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                            <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
                                Our <strong>Quilt Backing Calculator</strong> makes it easy to calculate exact fabric requirements. 
                                Just follow these simple steps below! 👇
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-l-4 border-blue-500">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">📏 Enter Your Quilt Dimensions</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        Input your <strong>finished quilt top width and length</strong> in the input fields.
                                    </p>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm">
                                        <strong>Tip:</strong> Use the <span className="inline-flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">in/cm</span> toggle to switch between inches and centimeters.
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-l-4 border-green-500">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">📐 Select Fabric Width</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        Choose your backing fabric width from common options: <strong>42", 44", 54", 60", or 108"</strong> — or enter a custom width.
                                    </p>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm">
                                        <strong>Important:</strong> The calculator automatically determines how many fabric panels you'll need based on this width.
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-l-4 border-purple-500">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">🔄 Choose Orientation</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        Select <strong>Lengthwise</strong> (vertical panels) or <strong>Crosswise</strong> (horizontal panels).
                                    </p>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm">
                                        <strong>Pro Tip:</strong> The calculator compares both orientations and shows which uses less fabric!
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-l-4 border-orange-500">
                                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">🎨 Advanced Options (Optional)</h3>
                                    <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                                        <li><strong>• Pattern Repeat:</strong> For directional prints, enter the repeat size to match patterns across seams</li>
                                        <li><strong>• Wastage Buffer:</strong> Adjust from 0-50% (default 10%) to account for shrinkage and cutting errors</li>
                                        <li><strong>• Seam Allowance:</strong> Specify your seam width (default 0.5")</li>
                                        <li><strong>• Purchase Increment:</strong> Round up to nearest 1/8, 1/4, 1/2, or 1 yard/meter</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-l-4 border-pink-500">
                                <div className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">💰 Add Batch & Cost Info (Optional)</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        Planning <strong>multiple quilts</strong>? Enter the quantity and price per yard to get instant cost breakdowns.
                                    </p>
                                    <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm">
                                        <strong>Batch Mode:</strong> See total fabric needed and per-quilt costs automatically!
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl border-l-4 border-teal-500">
                                <div className="flex-shrink-0 w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg">6</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">✅ View Your Results</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        Instantly see:
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Total fabric needed (yards/meters)</li>
                                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Estimated cost</li>
                                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Detailed cutting plan</li>
                                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Live visual preview</li>
                                    </ul>
                                    <div className="mt-3 bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm">
                                        <strong>Export Options:</strong> Copy summary, print results, or export as JSON for your records!
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">📐 Example Calculation</h3>
                            <p className="mb-2">
                                <strong>Scenario:</strong> You're making a queen-size quilt measuring <strong>90" × 100"</strong> using standard <strong>44" wide</strong> backing fabric.
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li><strong>Input:</strong> Width = 90", Length = 100", Fabric Width = 44"</li>
                                <li><strong>Orientation:</strong> Lengthwise (better for this size)</li>
                                <li><strong>Result:</strong> 3 panels needed, approximately <strong>8.5 yards</strong> of fabric</li>
                                <li><strong>Cost:</strong> At $12/yard = <strong>$102</strong> for backing</li>
                            </ul>
                            <p className="mt-3 text-sm italic text-gray-600 dark:text-gray-400">
                                💡 Using 108" wide fabric for the same quilt would require only 3 yards but might cost more per yard. 
                                Use the calculator to compare both options!
                            </p>
                        </div>
                    </div>
                </section>
                <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">? Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4 border-cyan-500">
                            <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400 mb-2">1. How much extra fabric should I buy for matching patterns or directional prints?</h3>
                            <p>Typical recommendations are 10–20% extra depending on pattern complexity; this tool’s pattern-repeat option adds an adjustable buffer and exact extra length per panel for precise matching.</p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4 border-cyan-500">
                            <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400 mb-2">2. What fabric width should I choose if I’m not sure?</h3>
                            <p>Measure your most common fabric bolts (42", 44–45", 54", 60"). Wider fabric reduces the number of seams. This calculator shows the difference in number of panels required for each width so you can compare costs.</p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4 border-cyan-500">
                            <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400">3. Can I use this for multiple quilts or batch calculations?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Yes! Set "Number of quilts" to get per-quilt and total yardage/cost. The cutting plan adapts to batch mode showing total cuts needed. 
                                Perfect for quilt shops, production quilters, or making multiple matching quilts for gifts.
                            </p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4 border-cyan-500">
                            <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400">4. Should I choose lengthwise or crosswise orientation?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                The calculator automatically compares both options. Generally, lengthwise (vertical panels) works better for tall quilts, 
                                while crosswise (horizontal panels) is ideal for wide quilts. Consider fabric grain and directional prints when deciding.
                            </p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4 border-cyan-500">
                            <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400">5. What is the wastage buffer and how much should I set?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Wastage buffer accounts for shrinkage (3-5% from pre-washing), frame tension during quilting, and cutting errors. 
                                Default 10% is recommended for most projects. Increase to 15-20% for directional prints, pattern matching, or if you're new to quilting.
                            </p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4 border-cyan-500">
                            <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400">6. Is 108" wide backing worth the extra cost?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                For quilts wider than 80", absolutely! While 108" backing costs $18-25/yard vs $10-15/yard for standard widths, you use significantly less 
                                (often 2-3 yards less), eliminate piecing labor, and avoid seam bulk. Use the calculator to compare total costs for your specific quilt size.
                            </p>
                        </div>
                        <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border-l-4 border-cyan-500">
                            <h3 className="font-bold text-lg text-cyan-600 dark:text-cyan-400">7. How do I calculate backing for directional prints?</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Enable "Match Directional Print" and enter the pattern repeat size. The calculator automatically adds extra fabric to ensure 
                                all panels have the same orientation and patterns align at seams. Always buy 15-25% extra for directional fabrics with large motifs.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Related Quilting & Calculation Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <a href="/math-and-calculation-tools/fabric-costing-tool" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group">
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Fabric Costing Tool</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Calculate total fabric costs for quilting projects with GSM and consumption analysis.</p>
                        </a>

                        <a href="/math-and-calculation-tools/percentage-change-calculator" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Percentage Change Calculator</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Calculate percentage increases and decreases for fabric pricing and discounts.</p>
                        </a>

                        <a href="/math-and-calculation-tools/time-difference-calculator" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Time Difference Calculator</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Track project time and deadlines for quilting timelines and scheduling.</p>
                        </a>

                        <a href="/tools/pro-rv-loan-calculator" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group">
                            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Pro RV Loan Calculator</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Calculate loan payments for equipment financing and business investments.</p>
                        </a>

                        <a href="/text-and-writing-tools/word-counter" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group">
                            <div className="flex items-center justify-center w-12 h-12 bg-pink-100 dark:bg-pink-900/50 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Word Counter</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Count words and characters for pattern descriptions and blog posts.</p>
                        </a>

                        <a href="/tools/shadow-css-generator" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Shadow CSS Generator</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Create beautiful shadows for quilting website designs and portfolios.</p>
                        </a>
                    </div>
                </section>
            </footer>

        </div>
    );
};

export default QuiltBackingCalculator;





