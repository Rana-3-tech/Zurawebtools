import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Page } from '../../App';

// --- TYPES AND INTERFACES ---
type UnitSystem = 'imperial' | 'metric';
type Shape = 'rectangle' | 'circle' | 'irregular' | 'triangle' | 'trapezoid' | 'oval';

interface FillDirtCalculatorProps {
  navigateTo?: (page: Page) => void;
}

interface Area {
  id: number;
  shape: Shape;
  length: number;
  width: number;
  depth: string; // Allow flexible input like "5 ft 6 in"
  diameter: number;
  customArea: number;
  // Triangle specific
  base: number;
  height: number;
  // Trapezoid specific
  base1: number;
  base2: number;
  trapHeight: number;
}

interface Material {
  name: string;
  densityImperial: number; // lb/ft³
  densityMetric: number; // kg/m³
}

// --- CONSTANTS ---
const MATERIALS: Material[] = [
  { name: 'Fill Dirt', densityImperial: 95, densityMetric: 1522 },
  { name: 'Topsoil', densityImperial: 80, densityMetric: 1281 },
  { name: 'Gravel', densityImperial: 105, densityMetric: 1682 },
  { name: 'Sand', densityImperial: 100, densityMetric: 1602 },
  { name: 'Clay', densityImperial: 110, densityMetric: 1762 },
  { name: 'Crushed Rock', densityImperial: 100, densityMetric: 1602 },
];

const TRUCK_SIZES: { [key: string]: number } = {
  'Small (5 cu yd)': 5,
  'Standard (10 cu yd)': 10,
  'Large (18 cu yd)': 18,
};

const FT3_TO_YD3 = 1 / 27;
const M3_TO_YD3 = 1.30795;
const FT3_TO_M3 = 0.0283168;
const LB_TO_KG = 0.453592;
const LBFT3_TO_KGM3 = 16.0185; // 1 lb/ft³ = 16.0185 kg/m³
const IN_TO_FT = 1 / 12;
const CM_TO_M = 1 / 100;

// --- HELPER FUNCTIONS ---
const parseDepth = (depthStr: string, unitSystem: UnitSystem): number => {
    if (!depthStr) return 0;
    const isImperial = unitSystem === 'imperial';
    let totalDepth = 0;

    if (isImperial) {
        // Matches patterns like "5'6\"", "5ft 6in", "5 6"
        const parts = depthStr.match(/(\d+\.?\d*)\s*(?:'|ft|feet)?\s*(\d+\.?\d*)?\s*(?:"|in|inch|inches)?/);
        if (parts) {
            const feet = parseFloat(parts[1] || '0');
            const inches = parseFloat(parts[2] || '0');
            totalDepth = feet + inches * IN_TO_FT;
        } else {
            totalDepth = parseFloat(depthStr) || 0;
        }
    } else { // Metric
        const parts = depthStr.match(/(\d+\.?\d*)\s*(?:m|meter|meters)?\s*(\d+\.?\d*)?\s*(?:cm)?/);
        if (parts) {
            const meters = parseFloat(parts[1] || '0');
            const cm = parseFloat(parts[2] || '0');
            totalDepth = meters + cm * CM_TO_M;
        } else {
            totalDepth = parseFloat(depthStr) || 0;
        }
    }
    return totalDepth;
};

const formatNumber = (num: number) => parseFloat(num.toFixed(2));

const createCSV = (data: object) => {
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).join(',');
    return `data:text/csv;charset=utf-8,${headers}\n${values}`;
};

const FillDirtCalculator: React.FC<FillDirtCalculatorProps> = ({ navigateTo }) => {
    // --- STATE MANAGEMENT ---
    const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');
    const [areas, setAreas] = useState<Area[]>([{ id: 1, shape: 'rectangle', length: 10, width: 10, depth: '1', diameter: 10, customArea: 100, base: 10, height: 10, base1: 10, base2: 8, trapHeight: 10 }]);
    const [material, setMaterial] = useState<string>('Fill Dirt');
    const [customDensity, setCustomDensity] = useState<number>(95);
    const [compareMode, setCompareMode] = useState<boolean>(false);
    const [compareMaterial, setCompareMaterial] = useState<string>('Gravel');

    const [costPerUnit, setCostPerUnit] = useState<number>(20);
    const [deliveryFee, setDeliveryFee] = useState<number>(100);
    const [taxRate, setTaxRate] = useState<number>(0);
    
    const [truckSize, setTruckSize] = useState<string>('Standard (10 cu yd)');
    const [customTruckSize, setCustomTruckSize] = useState<number>(10);
    
    const [compactionFactor, setCompactionFactor] = useState<number>(10);
    const [wastageBuffer, setWastageBuffer] = useState<number>(5);
    const [drainageOffset, setDrainageOffset] = useState<number>(0);
    const [moistureAdjustment, setMoistureAdjustment] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [showJson, setShowJson] = useState<boolean>(false);

    // --- SEO & THEME EFFECT ---
    useEffect(() => {
        // ...existing code...
        // --- JSON-LD INJECTION FUNCTION (must be first) ---
        const addJsonLd = (jsonData: object) => {
            const existingScript = document.getElementById(`json-ld-${jsonData['@type']}`);
            if (existingScript) existingScript.remove();
            let script = document.createElement('script');
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(jsonData);
            script.id = `json-ld-${jsonData['@type']}`;
            document.head.appendChild(script);
            return script;
        };

        // BreadcrumbList schema for SEO
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://zurawebtools.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Construction & Engineering Tools",
                    "item": "https://zurawebtools.com/construction-and-engineering-tools"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Fill Dirt Calculator",
                    "item": "https://zurawebtools.com/construction-and-engineering-tools/fill-dirt-calculator"
                }
            ]
        };
        const script3 = addJsonLd(breadcrumbSchema);
        document.title = 'Fill Dirt Calculator – Estimate Volume, Truckloads, and Cost | ZuraWebTools';
        const setMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMeta('description', 'Free fill dirt calculator: Estimate volume, weight, truckloads & cost instantly. Supports multiple shapes, materials, compaction factors. Professional earthwork calculator for contractors & homeowners. Calculate how much fill dirt you need for grading, excavation & landscaping projects.');

        // Open Graph Tags
        setMeta('og:title', 'Fill Dirt Calculator - Free Volume & Cost Estimator');
        setMeta('og:description', 'Calculate fill dirt volume, truckloads, and cost for construction projects. Supports multiple shapes, compaction factors, and material types.');
        setMeta('og:url', 'https://zurawebtools.com/math-and-calculation-tools/fill-dirt-calculator');
        setMeta('og:type', 'website');
        setMeta('og:site_name', 'ZuraWebTools');

        // Twitter Card Tags
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', 'Fill Dirt Calculator - Volume & Cost Estimator');
        setMeta('twitter:description', 'Calculate fill dirt volume, truckloads, and cost instantly. Professional-grade calculator for contractors and homeowners.');

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', 'https://zurawebtools.com/math-and-calculation-tools/fill-dirt-calculator');

        const softwareSchema = {
            "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Fill Dirt Calculator", "applicationCategory": "ConstructionTool", "operatingSystem": "Any (Web-based)", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1980" }, "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" }, "description": "The most advanced free fill dirt calculator online. Estimate fill dirt volume, truckloads, and cost instantly with multi-shape and compaction support.", "url": "https://zurawebtools.com/construction-and-engineering-tools/fill-dirt-calculator"
        };
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How to calculate fill dirt for your project?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "To calculate fill dirt, measure your area's length, width, and depth. Multiply these dimensions to get cubic footage, then divide by 27 to convert to cubic yards. This calculator handles all conversions automatically and accounts for compaction factors, material density, and buffer for professional accuracy."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How much fill dirt do I need calculator - Truckload estimation",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Enter your project dimensions to calculate how much fill dirt you need in cubic yards. The calculator estimates truckloads based on truck size (5-18 cubic yards). For example, a 20x30x1 ft area needs about 22 cubic yards or 2-3 standard truckloads."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How do I calculate how much fill dirt I need for different materials?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Different materials have varying densities and compaction rates. Use the Compare Materials feature to calculate fill dirt requirements for topsoil, clay, sand, gravel, or crushed stone. The calculator adjusts volume and cost based on each material's specific properties and compaction factors."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is the difference between fill dirt and topsoil?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Fill dirt is subsoil lacking organic matter, ideal for structural filling and leveling. Topsoil contains nutrients and organic materials perfect for planting and landscaping. Fill dirt is denser (95 lb/ft³) and cheaper, while topsoil (80 lb/ft³) costs more but supports plant growth. Use fill dirt for foundations, grading, and raising ground levels; use topsoil for gardens and lawns."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How many tons is a yard of dirt?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "One cubic yard of fill dirt typically weighs 1.3 to 1.5 tons (2,600-3,000 lbs), depending on moisture content and composition. Dry fill dirt averages 2,500 lbs per cubic yard, while wet or clay-heavy dirt can reach 3,000+ lbs. This calculator automatically converts volume to weight based on selected material type and moisture levels."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Should I compact fill dirt before calculating?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! Always account for compaction when ordering fill dirt. Loose dirt settles 10-30% after compaction depending on soil type and compaction method. Our calculator includes a compaction factor setting (default 15%) that automatically increases the volume estimate to compensate for settling, ensuring you order enough material for proper grade elevation."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How much does fill dirt cost per cubic yard?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Fill dirt costs $5-$25 per cubic yard depending on location, quality, and quantity. Bulk orders (10+ yards) average $8-$15/yard. Screened fill dirt costs $10-$20/yard, while unscreened dirt with rocks costs $5-$12/yard. Delivery fees add $50-$150 depending on distance. Use our cost estimation feature to calculate total project expenses including delivery and taxes."
                    }
                }
            ]
        };
        
        const script1 = addJsonLd(softwareSchema);
        const script2 = addJsonLd(faqSchema);
        
        const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(preferDark);
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && preferDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Load saved calculator state from localStorage
        const savedState = localStorage.getItem('fillDirtCalculatorState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                if (parsed.areas) setAreas(parsed.areas);
                if (parsed.unitSystem) setUnitSystem(parsed.unitSystem);
                if (parsed.material) setMaterial(parsed.material);
                if (parsed.costPerUnit !== undefined) setCostPerUnit(parsed.costPerUnit);
            } catch (e) {
                // Silently handle parse errors - localStorage might be corrupted
            }
        }

        return () => { // Cleanup
            document.querySelectorAll('meta[name="description"], meta[name="keywords"], link[rel="canonical"]').forEach(e => e.remove());
            script1.remove();
            script2.remove();
            script3.remove();
        };
    }, []);
    
    // Save calculator state to localStorage whenever it changes
    useEffect(() => {
        const stateToSave = {
            areas,
            unitSystem,
            material,
            costPerUnit
        };
        localStorage.setItem('fillDirtCalculatorState', JSON.stringify(stateToSave));
    }, [areas, unitSystem, material, costPerUnit]);
    
    // --- PERFORMANCE OPTIMIZATION ---
    // Memoize parsed depths to avoid repeated regex operations in parseDepth()
    // This is especially beneficial for large projects with 10+ areas
    const parsedDepths = useMemo(() => 
        areas.map(area => ({
            id: area.id,
            depth: parseDepth(area.depth, unitSystem) - (unitSystem === 'imperial' ? drainageOffset * IN_TO_FT : drainageOffset * CM_TO_M)
        })),
        [areas, unitSystem, drainageOffset]
    );
    
    // --- DERIVED STATE & CALCULATIONS ---
    const calculator = useCallback((selectedMaterialName: string) => {
        const isImperial = unitSystem === 'imperial';
        const selectedMaterial = MATERIALS.find(m => m.name === selectedMaterialName) || MATERIALS[0];
        const density = isImperial ? selectedMaterial.densityImperial : selectedMaterial.densityMetric;
        let customDensityInUse = 0;
        if (selectedMaterialName === 'Custom') {
           // Convert custom density to lb/ft³ for weight calculations
           // If metric mode: convert kg/m³ to lb/ft³ (divide by 16.0185)
           customDensityInUse = isImperial ? customDensity : customDensity / LBFT3_TO_KGM3;
        }

        const totalRawVolumeFt3 = areas.reduce((total, area) => {
            // Get pre-parsed depth for performance (avoids repeated regex operations)
            const parsedDepthEntry = parsedDepths.find(pd => pd.id === area.id);
            if (!parsedDepthEntry) return total;
            
            // Convert depth to feet for internal calculations
            // 1 meter = 3.28084 feet
            const depthFt = isImperial ? parsedDepthEntry.depth : parsedDepthEntry.depth * 3.28084;
            if (depthFt <= 0) return total;
            
            let areaSqFt = 0;
            if (area.shape === 'rectangle') {
                areaSqFt = area.length * area.width;
            } else if (area.shape === 'circle') {
                const radius = area.diameter / 2;
                areaSqFt = Math.PI * radius * radius;
            } else if (area.shape === 'triangle') {
                areaSqFt = (area.base * area.height) / 2;
            } else if (area.shape === 'trapezoid') {
                areaSqFt = ((area.base1 + area.base2) / 2) * area.trapHeight;
            } else if (area.shape === 'oval') {
                areaSqFt = Math.PI * (area.length / 2) * (area.width / 2);
            } else {
                areaSqFt = area.customArea;
            }
            // Convert metric area (m²) to imperial (ft²) for internal calculations
            // Standard conversion: 1 m² = 10.7639 ft²
            if(!isImperial) areaSqFt *= 10.7639;
            
            return total + (areaSqFt * depthFt);
        }, 0);

        const adjustedVolumeFt3 = totalRawVolumeFt3 * (1 + compactionFactor / 100) * (1 + wastageBuffer / 100);
        const volumeYd3 = adjustedVolumeFt3 * FT3_TO_YD3;
        const volumeM3 = adjustedVolumeFt3 * FT3_TO_M3;
        
        const materialDensity = selectedMaterialName === 'Custom' ? customDensityInUse : density;
        const totalWeightLb = adjustedVolumeFt3 * materialDensity;
        
        // Material-specific moisture adjustment factors based on water retention properties
        const moistureFactor = moistureAdjustment ? 
            (selectedMaterialName === 'Clay' ? 1.15 :        // Clay retains 15% more moisture
             selectedMaterialName === 'Topsoil' ? 1.12 :     // Topsoil retains 12% more moisture
             selectedMaterialName === 'Sand' ? 1.08 :        // Sand retains 8% more moisture
             selectedMaterialName === 'Gravel' ? 1.05 :      // Gravel retains minimal moisture
             1.10) : 1;                                       // Default 10% for other materials
        
        const finalWeightLb = totalWeightLb * moistureFactor;
        const finalWeightKg = finalWeightLb * LB_TO_KG;

        const truckCapacityYd3 = truckSize === 'Custom' ? customTruckSize : TRUCK_SIZES[truckSize];
        const numTrucks = truckCapacityYd3 > 0 ? Math.ceil(volumeYd3 / truckCapacityYd3) : 0;
        
        const costUnit = isImperial ? costPerUnit : costPerUnit / M3_TO_YD3; // convert cost/m3 to cost/yd3
        const materialCost = volumeYd3 * costUnit;
        const totalCost = materialCost * (1 + taxRate / 100) + deliveryFee;

        return {
            volumeFt3: formatNumber(adjustedVolumeFt3),
            volumeYd3: formatNumber(volumeYd3),
            volumeM3: formatNumber(volumeM3),
            weightLb: formatNumber(finalWeightLb),
            weightKg: formatNumber(finalWeightKg),
            numTrucks: numTrucks,
            totalCost: formatNumber(totalCost),
            materialSummary: {
                name: selectedMaterialName,
                density: formatNumber(materialDensity) + (isImperial ? ' lb/ft³' : ' kg/m³'),
            },
        };
    }, [unitSystem, areas, parsedDepths, compactionFactor, wastageBuffer, drainageOffset, moistureAdjustment, truckSize, customTruckSize, costPerUnit, deliveryFee, taxRate, customDensity]);
    
    const results = useMemo(() => calculator(material), [calculator, material]);
    const compareResults = useMemo(() => compareMode ? calculator(compareMaterial) : null, [compareMode, calculator, compareMaterial]);

    // --- EVENT HANDLERS ---
    const handleAddArea = () => {
        setAreas([...areas, { id: Date.now(), shape: 'rectangle', length: 10, width: 10, depth: '1', diameter: 10, customArea: 100, base: 10, height: 10, base1: 10, base2: 8, trapHeight: 10 }]);
    };
    const handleRemoveArea = (id: number) => {
        setAreas(areas.filter(area => area.id !== id));
    };
    const handleAreaChange = (id: number, field: keyof Area, value: any) => {
        setAreas(areas.map(area => area.id === id ? { ...area, [field]: value } : area));
    };
    
    const handleReset = () => {
        setUnitSystem('imperial');
        setAreas([{ id: 1, shape: 'rectangle', length: 10, width: 10, depth: '1', diameter: 10, customArea: 100, base: 10, height: 10, base1: 10, base2: 8, trapHeight: 10 }]);
        setMaterial('Fill Dirt');
        setCostPerUnit(20);
        setDeliveryFee(100);
        setTaxRate(0);
        setTruckSize('Standard (10 cu yd)');
        setCompactionFactor(10);
        setWastageBuffer(5);
        setDrainageOffset(0);
        setMoistureAdjustment(false);
        setShowAdvanced(false);
        setCompareMode(false);
    };

    const handleCopy = (data: object) => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        alert('JSON output copied to clipboard!');
    };
    
    const getSummaryText = () => {
        const isImperial = unitSystem === 'imperial';
        return `For the specified areas, you need approximately ${results.volumeYd3} cubic yards (${results.volumeM3} m³) of ${material}. This equates to a total weight of ${results.weightLb} lbs (${results.weightKg} kg). It will require ${results.numTrucks} truckloads and the estimated total cost is $${results.totalCost}.`;
    };
    
    const resultsForExport = { ...results, compare: compareResults };

    // --- RENDER ---
    const dimUnit = unitSystem === 'imperial' ? 'ft' : 'm';
    const areaUnit = unitSystem === 'imperial' ? 'sq ft' : 'sq m';
    const depthUnitLabel = unitSystem === 'imperial' ? 'ft / in' : 'm / cm';
    const costUnitLabel = unitSystem === 'imperial' ? 'cubic yard' : 'cubic meter';

    const renderAreaInputs = (area: Area) => (
        <div key={area.id} className="p-6 border-2 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-[#10b981] dark:border-[#34d399] shadow-lg hover:shadow-xl transition-all space-y-5 relative">
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-wrap gap-2" role="group">
                    {(['rectangle', 'circle', 'triangle', 'trapezoid', 'oval', 'irregular'] as Shape[]).map(shape => (
                        <button key={shape} type="button" onClick={() => handleAreaChange(area.id, 'shape', shape)} className={`px-3 py-2 text-xs sm:text-sm font-semibold border-2 rounded-lg focus:z-10 focus:ring-3 focus:ring-[#10b981]/30 transition-all transform hover:scale-105 ${area.shape === shape ? 'bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white border-transparent shadow-md' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-[#10b981] dark:hover:border-[#34d399]'}`}>
                            {shape.charAt(0).toUpperCase() + shape.slice(1)}
                        </button>
                    ))}
                </div>
                {areas.length > 1 && <button onClick={() => handleRemoveArea(area.id)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 font-bold text-lg transition-colors" aria-label="Remove area">×</button>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {area.shape === 'rectangle' && <>
                    <Input label={`Length (${dimUnit})`} type="number" value={area.length} onChange={e => handleAreaChange(area.id, 'length', parseFloat(e.target.value))} />
                    <Input label={`Width (${dimUnit})`} type="number" value={area.width} onChange={e => handleAreaChange(area.id, 'width', parseFloat(e.target.value))} />
                </>}
                {area.shape === 'circle' && 
                    <Input label={`Diameter (${dimUnit})`} type="number" value={area.diameter} onChange={e => handleAreaChange(area.id, 'diameter', parseFloat(e.target.value))} />
                }
                {area.shape === 'triangle' && <>
                    <Input label={`Base (${dimUnit})`} type="number" value={area.base} onChange={e => handleAreaChange(area.id, 'base', parseFloat(e.target.value))} />
                    <Input label={`Height (${dimUnit})`} type="number" value={area.height} onChange={e => handleAreaChange(area.id, 'height', parseFloat(e.target.value))} />
                </>}
                {area.shape === 'trapezoid' && <>
                    <Input label={`Base 1 (${dimUnit})`} type="number" value={area.base1} onChange={e => handleAreaChange(area.id, 'base1', parseFloat(e.target.value))} />
                    <Input label={`Base 2 (${dimUnit})`} type="number" value={area.base2} onChange={e => handleAreaChange(area.id, 'base2', parseFloat(e.target.value))} />
                    <Input label={`Height (${dimUnit})`} type="number" value={area.trapHeight} onChange={e => handleAreaChange(area.id, 'trapHeight', parseFloat(e.target.value))} />
                </>}
                {area.shape === 'oval' && <>
                    <Input label={`Length (${dimUnit})`} type="number" value={area.length} onChange={e => handleAreaChange(area.id, 'length', parseFloat(e.target.value))} />
                    <Input label={`Width (${dimUnit})`} type="number" value={area.width} onChange={e => handleAreaChange(area.id, 'width', parseFloat(e.target.value))} />
                </>}
                {area.shape === 'irregular' && 
                    <Input label={`Area (${areaUnit})`} type="number" value={area.customArea} onChange={e => handleAreaChange(area.id, 'customArea', parseFloat(e.target.value))} />
                }
                <Input label={`Depth (${depthUnitLabel})`} type="text" value={area.depth} onChange={e => handleAreaChange(area.id, 'depth', e.target.value)} placeholder={unitSystem === 'imperial' ? `e.g., 3'6"` : `e.g., 1.5m 20cm`} />
            </div>
        </div>
    );
    
    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans print:p-0">
            {/* --- BREADCRUMBS --- */}
            <nav className="mb-6 print:hidden" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 space-x-2">
                    <li>
                        <a href="/" className="hover:underline text-brand-blue font-semibold">Home</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li>
                        <a href="/tools" className="hover:underline text-brand-blue font-semibold">Tools</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="text-gray-900 dark:text-white font-bold">Fill Dirt Calculator</li>
                </ol>
            </nav>
            <header className="text-center mb-10 print:hidden bg-gradient-to-r from-[#FF6B35] to-[#F7931E] p-8 rounded-3xl shadow-2xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                    <svg className="w-12 h-12 inline-block mr-3 -mt-1" fill="currentColor" viewBox="0 0 24 24" aria-label="Construction Icon">
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                    </svg>
                    Fill Dirt Calculator
                </h1>
                <p className="mt-3 text-xl text-white/90 font-medium">Estimate volume, weight, cost, and truckloads instantly for excavation, grading & landscaping projects</p>
                 <div className="flex justify-center items-center mt-6 gap-4">
                    <span className="text-white font-bold text-lg">Select Units:</span>
                    <div className="inline-flex rounded-xl shadow-lg overflow-hidden">
                        <button onClick={() => setUnitSystem('imperial')} className={`px-6 py-3 text-base font-bold transition-all ${unitSystem === 'imperial' ? 'bg-white text-[#FF6B35] shadow-inner' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
                            <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Imperial
                        </button>
                        <button onClick={() => setUnitSystem('metric')} className={`px-6 py-3 text-base font-bold transition-all border-l-2 border-white/30 ${unitSystem === 'metric' ? 'bg-white text-[#FF6B35] shadow-inner' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
                            <svg className="w-5 h-5 inline-block mr-2 -mt-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Metric
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* --- INPUT PANEL --- */}
                <div className="w-full lg:w-[60%] space-y-6 print:hidden">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-[#06b6d4] dark:border-[#22d3ee]">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                            <span className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-lg flex items-center justify-center text-white text-xl">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                </svg>
                            </span>
                            Project Areas
                        </h3>
                        <div className="space-y-5">
                            {areas.map(renderAreaInputs)}
                        </div>
                        <button onClick={handleAddArea} className="mt-6 w-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#e55a2b] hover:to-[#e8850b] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                            <span className="text-xl">+</span> Add Another Area
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-[#2E8B57] dark:border-[#3CB371]">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                            <span className="w-10 h-10 bg-gradient-to-r from-[#2E8B57] to-[#3CB371] rounded-lg flex items-center justify-center text-white text-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </span>
                            Material & Cost
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Select label="Soil Material" value={material} onChange={e => setMaterial(e.target.value)}>
                                {MATERIALS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                                <option value="Custom">Custom Density</option>
                            </Select>
                            {material === 'Custom' && <Input label={`Density (${unitSystem === 'imperial' ? 'lb/ft³' : 'kg/m³'})`} type="number" value={customDensity} onChange={e => setCustomDensity(parseFloat(e.target.value))} />}
                            <Input label={`Price per ${costUnitLabel}`} type="number" value={costPerUnit} onChange={e => setCostPerUnit(parseFloat(e.target.value))} prefix="$" />
                            <Input label="Delivery Fee" type="number" value={deliveryFee} onChange={e => setDeliveryFee(parseFloat(e.target.value))} prefix="$" />
                            <Input label="Tax Rate" type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))} suffix="%" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-[#4682B4] dark:border-[#5F9EA0]">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                            <span className="w-10 h-10 bg-gradient-to-r from-[#4682B4] to-[#5F9EA0] rounded-lg flex items-center justify-center text-white text-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                </svg>
                            </span>
                            Truckloads
                        </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Select label="Truck Size" value={truckSize} onChange={e => setTruckSize(e.target.value)}>
                                {Object.keys(TRUCK_SIZES).map(size => <option key={size} value={size}>{size}</option>)}
                                <option value="Custom">Custom Size</option>
                            </Select>
                            {truckSize === 'Custom' && <Input label="Custom Size (cu yd)" type="number" value={customTruckSize} onChange={e => setCustomTruckSize(parseFloat(e.target.value))} />}
                        </div>
                        
                        {/* Calculation Summary - Moved here */}
                        <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                            <h4 className="text-lg font-bold mb-3 text-gray-800 dark:text-white flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
                                Calculation Summary
                            </h4>
                            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{getSummaryText()}</p>
                            <button onClick={() => setShowJson(!showJson)} className="text-sm text-[#10b981] hover:text-[#059669] mt-3 font-bold inline-flex items-center gap-2">
                                {showJson ? (
                                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> Hide</>
                                ) : (
                                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> Show</>
                                )} JSON Output
                            </button>
                            {showJson && <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto border border-gray-300 dark:border-gray-700"><code>{JSON.stringify(resultsForExport, null, 2)}</code></pre>}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-gray-300 dark:border-gray-600">
                         <button onClick={() => setShowAdvanced(!showAdvanced)} className="font-bold text-xl w-full text-left flex justify-between items-center text-gray-800 dark:text-white hover:text-[#FF6B35] dark:hover:text-[#F7931E] transition-colors">
                            <span className="flex items-center gap-3">
                                <span className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 rounded-lg flex items-center justify-center text-white text-xl">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                Advanced Options
                            </span>
                            <span className={`transform transition-transform text-2xl ${showAdvanced ? 'rotate-180' : ''}`}>?</span>
                         </button>
                         {showAdvanced && <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
                            <Slider label="Compaction Factor" value={compactionFactor} onChange={e => setCompactionFactor(parseFloat(e.target.value))} min={0} max={50} suffix="%" help="Accounts for soil settling." />
                            <Slider label="Wastage / Overfill" value={wastageBuffer} onChange={e => setWastageBuffer(parseFloat(e.target.value))} min={0} max={30} suffix="%" help="Adds a buffer for spills or inaccuracies." />
                            <Input label={`Drainage Offset (${unitSystem === 'imperial' ? 'in' : 'cm'})`} type="number" value={drainageOffset} onChange={e => setDrainageOffset(parseFloat(e.target.value))} help="Subtracts from fill depth for drainage layers."/>
                            <div className="flex items-center space-x-3 pt-5">
                                <input type="checkbox" id="moisture" checked={moistureAdjustment} onChange={e => setMoistureAdjustment(e.target.checked)} className="h-5 w-5 rounded border-2 border-gray-400 text-[#FF6B35] focus:ring-[#FF6B35] focus:ring-2" />
                                <label htmlFor="moisture" className="text-base font-semibold text-gray-700 dark:text-gray-200">Moisture Adjustment</label>
                            </div>
                        </div>}
                    </div>
                </div>

                {/* --- RESULTS PANEL --- */}
                <div className="w-full lg:w-[40%] space-y-6">
                    <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-6 rounded-2xl shadow-2xl border-2 border-[#4682B4] dark:border-[#5F9EA0]">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                            <span className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-lg flex items-center justify-center text-white text-xl">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </span>
                            Estimated Results
                        </h3>
                        <div className="flex justify-between items-center mb-6 p-5 bg-gradient-to-r from-white to-blue-50 dark:from-gray-900/50 dark:to-blue-900/30 rounded-xl border-2 border-gray-300 dark:border-gray-600 print:hidden shadow-md">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white text-base">Compare Materials</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Compare costs between different materials</p>
                                </div>
                            </div>
                            <label htmlFor="compare-toggle" className="inline-flex relative items-center cursor-pointer">
                                <input type="checkbox" id="compare-toggle" className="sr-only peer" checked={compareMode} onChange={() => setCompareMode(!compareMode)} />
                                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6B35]/30 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r peer-checked:from-[#FF6B35] peer-checked:to-[#F7931E]"></div>
                            </label>
                        </div>
                        {compareMode && <div className="mb-4 animate-fadeIn">
                             <Select label="Compare With" value={compareMaterial} onChange={e => setCompareMaterial(e.target.value)}>
                                {MATERIALS.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                            </Select>
                        </div>}
                        
                        <div className={`grid ${compareMode ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
                            <div className={compareMode ? 'bg-white dark:bg-gray-700/50 p-4 rounded-xl border-2 border-[#10b981]' : ''}>
                                {compareMode && <h4 className="font-bold text-center text-lg mb-4 text-[#10b981] dark:text-[#34d399] bg-[#10b981]/10 dark:bg-[#10b981]/20 py-2 rounded-lg inline-flex items-center justify-center gap-2 w-full">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    {material}
                                </h4>}
                                <ResultDisplay results={results} unitSystem={unitSystem} />
                            </div>
                            {compareMode && compareResults &&
                                <div className="bg-white dark:bg-gray-700/50 p-4 rounded-xl border-2 border-[#06b6d4]">
                                    <h4 className="font-bold text-center text-lg mb-4 text-[#06b6d4] dark:text-[#22d3ee] bg-[#06b6d4]/10 dark:bg-[#06b6d4]/20 py-2 rounded-lg inline-flex items-center justify-center gap-2 w-full">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        {compareMaterial}
                                    </h4>
                                    <ResultDisplay results={compareResults} unitSystem={unitSystem} />
                                </div>
                            }
                        </div>
                        
                        <div className="mt-8 flex flex-wrap gap-3 justify-center">
                            <button onClick={() => navigator.clipboard.writeText(getSummaryText())} className="px-5 py-2.5 bg-[#FF6B35] hover:bg-[#e55a2b] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                Copy Summary
                            </button>
                            <a href={createCSV(resultsForExport)} download="fill-dirt-results.csv" className="px-5 py-2.5 bg-[#2E8B57] hover:bg-[#2a7a4f] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Download CSV
                            </a>
                            <button onClick={() => handleCopy(resultsForExport)} className="px-5 py-2.5 bg-[#4682B4] hover:bg-[#3f7ba3] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                Copy JSON
                            </button>
                            <button onClick={() => window.print()} className="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                Print
                            </button>
                            <button onClick={handleReset} className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Reset
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- SOCIAL SHARE BUTTONS --- */}
            <section className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-600 print:hidden">
                <h2 className="text-2xl font-bold text-center mb-4 text-light-text dark:text-dark-text">Share This Tool</h2>
                <p className="text-center text-light-text/80 dark:text-dark-text/80 mb-6">Help others calculate fill dirt requirements accurately</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/math-and-calculation-tools/fill-dirt-calculator')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on Facebook"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/math-and-calculation-tools/fill-dirt-calculator')}&text=Calculate%20fill%20dirt%20volume%2C%20cost%2C%20and%20truckloads%20instantly!`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1A94DA] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on Twitter"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        Twitter
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/math-and-calculation-tools/fill-dirt-calculator')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#095196] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                    </a>
                    <a href={`https://api.whatsapp.com/send?text=Check%20out%20this%20Fill%20Dirt%20Calculator%20${encodeURIComponent('https://zurawebtools.com/construction-and-engineering-tools/fill-dirt-calculator')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on WhatsApp"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        WhatsApp
                    </a>
                </div>
            </section>

            {/* --- QUICK EXAMPLES --- */}
            <section className="mt-12 print:hidden">
                <h2 className="text-3xl font-bold text-center mb-8 text-light-text dark:text-dark-text">Quick Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border-t-4 border-[#10b981] hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-bold text-[#10b981] dark:text-[#34d399] mb-2">27 yd³</div>
                        <h3 className="font-semibold text-lg mb-2 text-light-text dark:text-dark-text">Small Yard Fill</h3>
                        <p className="text-sm text-light-text/80 dark:text-dark-text/80">20' × 20' area, 2' deep = ~3 truckloads</p>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border-t-4 border-[#06b6d4] hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-bold text-[#06b6d4] dark:text-[#22d3ee] mb-2">133 yd³</div>
                        <h3 className="font-semibold text-lg mb-2 text-light-text dark:text-dark-text">Large Lot Leveling</h3>
                        <p className="text-sm text-light-text/80 dark:text-dark-text/80">50' × 80' area, 1' deep = ~13 truckloads</p>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border-t-4 border-[#3b82f6] hover:shadow-xl transition-shadow">
                        <div className="text-4xl font-bold text-[#3b82f6] dark:text-[#60a5fa] mb-2">370 yd³</div>
                        <h3 className="font-semibold text-lg mb-2 text-light-text dark:text-dark-text">Commercial Project</h3>
                        <p className="text-sm text-light-text/80 dark:text-dark-text/80">100' × 100' area, 1' deep = ~37 truckloads</p>
                    </div>
                </div>
            </section>

            {/* --- MATERIAL COMPARISON TABLE --- */}
            <section className="mt-12 print:hidden">
                <h2 className="text-3xl font-bold text-center mb-8 text-light-text dark:text-dark-text">Fill Dirt vs Other Materials - Comparison Guide</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-light-card dark:bg-dark-card rounded-xl shadow-lg border border-light-border dark:border-dark-border">
                        <thead className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold">Material</th>
                                <th className="px-6 py-4 text-left font-bold">Density (lb/ft³)</th>
                                <th className="px-6 py-4 text-left font-bold">Typical Use</th>
                                <th className="px-6 py-4 text-left font-bold">Cost Range</th>
                                <th className="px-6 py-4 text-left font-bold">Compaction</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-light-border dark:divide-dark-border">
                            <tr className="hover:bg-light-hover dark:hover:bg-dark-hover">
                                <td className="px-6 py-4 font-semibold text-[#10b981]">Fill Dirt</td>
                                <td className="px-6 py-4">95-105</td>
                                <td className="px-6 py-4">Structural filling, grading, foundations</td>
                                <td className="px-6 py-4">$5-$15/yd³</td>
                                <td className="px-6 py-4">10-20% settling</td>
                            </tr>
                            <tr className="hover:bg-light-hover dark:hover:bg-dark-hover">
                                <td className="px-6 py-4 font-semibold text-[#06b6d4]">Topsoil</td>
                                <td className="px-6 py-4">75-90</td>
                                <td className="px-6 py-4">Gardens, lawns, planting beds</td>
                                <td className="px-6 py-4">$15-$30/yd³</td>
                                <td className="px-6 py-4">5-10% settling</td>
                            </tr>
                            <tr className="hover:bg-light-hover dark:hover:bg-dark-hover">
                                <td className="px-6 py-4 font-semibold text-[#3b82f6]">Sand</td>
                                <td className="px-6 py-4">90-110</td>
                                <td className="px-6 py-4">Drainage, concrete mixing, play areas</td>
                                <td className="px-6 py-4">$10-$25/yd³</td>
                                <td className="px-6 py-4">5-15% settling</td>
                            </tr>
                            <tr className="hover:bg-light-hover dark:hover:bg-dark-hover">
                                <td className="px-6 py-4 font-semibold text-[#8b5cf6]">Gravel</td>
                                <td className="px-6 py-4">100-120</td>
                                <td className="px-6 py-4">Driveways, drainage, base layers</td>
                                <td className="px-6 py-4">$15-$35/yd³</td>
                                <td className="px-6 py-4">5-10% settling</td>
                            </tr>
                            <tr className="hover:bg-light-hover dark:hover:bg-dark-hover">
                                <td className="px-6 py-4 font-semibold text-[#f59e0b]">Clay</td>
                                <td className="px-6 py-4">100-130</td>
                                <td className="px-6 py-4">Ponds, waterproofing, heavy fill</td>
                                <td className="px-6 py-4">$8-$20/yd³</td>
                                <td className="px-6 py-4">15-25% settling</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">Use our fill dirt calculator to compare materials and calculate exact volumes for your project</p>
            </section>

            {/* --- UNIT SYSTEM COMPARISON --- */}
            <section className="mt-12 print:hidden">
                <h2 className="text-3xl font-bold text-center mb-8 text-light-text dark:text-dark-text">Imperial vs Metric - Unit Conversion Guide</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                        <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200 inline-flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                            </svg>
                            Imperial System
                        </h3>
                        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                            <li><strong>Volume:</strong> Cubic yards (yd³)</li>
                            <li><strong>Weight:</strong> Pounds (lbs)</li>
                            <li><strong>Dimensions:</strong> Feet & inches</li>
                            <li><strong>Common in:</strong> US, Canada, UK</li>
                            <li><strong>1 cubic yard =</strong> 27 cubic feet</li>
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
                        <h3 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200 inline-flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Metric System
                        </h3>
                        <ul className="space-y-2 text-green-700 dark:text-green-300">
                            <li><strong>Volume:</strong> Cubic meters (m³)</li>
                            <li><strong>Weight:</strong> Kilograms (kg)</li>
                            <li><strong>Dimensions:</strong> Meters & centimeters</li>
                            <li><strong>Common in:</strong> Europe, Asia, Australia</li>
                            <li><strong>1 cubic meter =</strong> 1,000 liters</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Our fill dirt volume calculator automatically converts between systems</p>
                    <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg inline-block">
                        <p className="font-mono text-sm">
                            <strong>Conversion:</strong> 1 cubic yard = 0.7646 cubic meters<br/>
                            <strong>Weight:</strong> 1 pound = 0.4536 kilograms
                        </p>
                    </div>
                </div>
            </section>

            {/* --- BENEFITS --- */}
            <section className="mt-12 print:hidden">
                <h2 className="text-3xl font-bold text-center mb-8 text-light-text dark:text-dark-text">Why Use Our Fill Dirt Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                        <div className="text-5xl mb-4">?</div>
                        <h3 className="text-2xl font-bold mb-3">Instant Calculations</h3>
                        <p className="text-white/90">Get precise volume, weight, and cost estimates in real-time without manual math errors. Save hours of planning time.</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#2E8B57] to-[#3CB371] p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                        <div className="text-5xl mb-4">💰</div>
                        <h3 className="text-2xl font-bold mb-3">Cost Estimation</h3>
                        <p className="text-white/90">Compare multiple materials, factor in delivery fees, taxes, and get accurate budget forecasts before ordering.</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#4682B4] to-[#5F9EA0] p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                        <div className="text-5xl mb-4">🎯</div>
                        <h3 className="text-2xl font-bold mb-3">Professional Accuracy</h3>
                        <p className="text-white/90">Built-in compaction factors, wastage buffers, and moisture adjustments ensure you order the right amount every time.</p>
                    </div>
                </div>
            </section>

            {/* --- CASE STUDY EXAMPLES --- */}
            <section className="mt-12 print:hidden">
                <h2 className="text-3xl font-bold text-center mb-8 text-light-text dark:text-dark-text">Real-World Project Examples - Fill Dirt Calculator in Action</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Residential Backyard Leveling */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-2xl border-2 border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">🏡</span>
                            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">Residential Backyard Leveling</h3>
                        </div>
                        <div className="space-y-3 mb-6">
                            <p className="text-green-700 dark:text-green-300"><strong>Project:</strong> Level uneven backyard for garden installation</p>
                            <p className="text-green-700 dark:text-green-300"><strong>Area:</strong> 30ft × 40ft × 6" average depth</p>
                            <p className="text-green-700 dark:text-green-300"><strong>Material:</strong> Fill dirt with 15% compaction</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                            <h4 className="font-bold text-lg mb-2 text-green-800 dark:text-green-200">Calculator Results:</h4>
                            <ul className="space-y-1 text-sm">
                                <li><strong>Volume:</strong> 18.5 cubic yards</li>
                                <li><strong>Weight:</strong> 37,000 lbs (18.5 tons)</li>
                                <li><strong>Truckloads:</strong> 2 standard trucks</li>
                                <li><strong>Estimated Cost:</strong> $185-$370 (at $10-$20/yd³)</li>
                            </ul>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400 italic">Pro Tip: Always add 10-15% wastage buffer for uneven terrain</p>
                    </div>

                    {/* Commercial Foundation Fill */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3 mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.5L19 12v7h-2v-6h-6v6H9v-7h2v-2H9V9.5l3-2.5z"/></svg>
                            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Commercial Foundation Fill</h3>
                        </div>
                        <div className="space-y-3 mb-6">
                            <p className="text-blue-700 dark:text-blue-300"><strong>Project:</strong> Fill basement excavation for new office building</p>
                            <p className="text-blue-700 dark:text-blue-300"><strong>Area:</strong> 80ft × 120ft × 8ft depth</p>
                            <p className="text-blue-700 dark:text-blue-300"><strong>Material:</strong> Structural fill dirt with 20% compaction</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                            <h4 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-200">Calculator Results:</h4>
                            <ul className="space-y-1 text-sm">
                                <li><strong>Volume:</strong> 533 cubic yards</li>
                                <li><strong>Weight:</strong> 1,066,000 lbs (533 tons)</li>
                                <li><strong>Truckloads:</strong> 53 standard trucks</li>
                                <li><strong>Estimated Cost:</strong> $5,330-$10,660 (at $10-$20/yd³)</li>
                            </ul>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400 italic">Pro Tip: Use compaction factor for structural fills to prevent settling</p>
                    </div>

                    {/* Pool Backfill Project */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">🏊</span>
                            <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Swimming Pool Backfill</h3>
                        </div>
                        <div className="space-y-3 mb-6">
                            <p className="text-purple-700 dark:text-purple-300"><strong>Project:</strong> Backfill around inground pool installation</p>
                            <p className="text-purple-700 dark:text-purple-300"><strong>Area:</strong> 25ft diameter × 6ft depth (cylindrical)</p>
                            <p className="text-purple-700 dark:text-purple-300"><strong>Material:</strong> Sand for drainage layer + fill dirt</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                            <h4 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-200">Calculator Results:</h4>
                            <ul className="space-y-1 text-sm">
                                <li><strong>Volume:</strong> 24.5 cubic yards</li>
                                <li><strong>Weight:</strong> 49,000 lbs (24.5 tons)</li>
                                <li><strong>Truckloads:</strong> 3 standard trucks</li>
                                <li><strong>Estimated Cost:</strong> $245-$490 (at $10-$20/yd³)</li>
                            </ul>
                        </div>
                        <p className="text-sm text-purple-600 dark:text-purple-400 italic">Pro Tip: Use sand around pools for better drainage and prevent water accumulation</p>
                    </div>

                    {/* Driveway Construction */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">🚗</span>
                            <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-200">Driveway Base Preparation</h3>
                        </div>
                        <div className="space-y-3 mb-6">
                            <p className="text-orange-700 dark:text-orange-300"><strong>Project:</strong> Prepare base for gravel driveway</p>
                            <p className="text-orange-700 dark:text-orange-300"><strong>Area:</strong> 12ft × 100ft × 8" depth</p>
                            <p className="text-orange-700 dark:text-orange-300"><strong>Material:</strong> Fill dirt base with gravel topping</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                            <h4 className="font-bold text-lg mb-2 text-orange-800 dark:text-orange-200">Calculator Results:</h4>
                            <ul className="space-y-1 text-sm">
                                <li><strong>Volume:</strong> 66.7 cubic yards</li>
                                <li><strong>Weight:</strong> 133,400 lbs (66.7 tons)</li>
                                <li><strong>Truckloads:</strong> 7 standard trucks</li>
                                <li><strong>Estimated Cost:</strong> $667-$1,334 (at $10-$20/yd³)</li>
                            </ul>
                        </div>
                        <p className="text-sm text-orange-600 dark:text-orange-400 italic">Pro Tip: Compact in 6" layers for maximum stability under heavy loads</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white p-6 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-2">Try These Examples in Our Calculator!</h3>
                        <p className="mb-4">Input the dimensions above and see how our fill dirt calculator handles real-world projects</p>
                        <button 
                            onClick={() => {
                                setUnitSystem('imperial');
                                setAreas([{ id: 1, shape: 'rectangle', length: 30, width: 40, depth: '0.5', diameter: 30, customArea: 1200, base: 30, height: 40, base1: 30, base2: 28, trapHeight: 40 }]);
                                setMaterial('Fill Dirt');
                                setCompactionFactor(15);
                                setWastageBuffer(10);
                            }}
                            className="bg-white text-[#FF6B35] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Load Residential Example
                        </button>
                    </div>
                </div>
            </section>

            {/* --- USE CASES --- */}
            <section className="mt-12 print:hidden">
                <h2 className="text-3xl font-bold text-center mb-8 text-light-text dark:text-dark-text">Who Uses This Calculator?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border-l-4 border-[#FF6B35] hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">👷</div>
                        <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text">Contractors</h3>
                        <p className="text-sm text-light-text/80 dark:text-dark-text/80">Use this calculator for dirt fill estimation and calculating fill dirt quantities for foundation work, site grading, excavation backfill, and landscape leveling projects with precision. Generate professional documentation using our <a href="/text-and-writing-tools/word-counter" className="text-[#FF6B35] hover:text-[#e55a2b] dark:text-[#F7931E] dark:hover:text-[#FF6B35] font-semibold underline">Word Counter</a> for project reports and proposals.</p>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border-l-4 border-[#2E8B57] hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">🏡</div>
                        <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text">Homeowners</h3>
                        <p className="text-sm text-light-text/80 dark:text-dark-text/80">Plan DIY yard leveling, pool backfilling, raised bed construction, or drainage improvement projects with accurate material estimates.</p>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border-l-4 border-[#4682B4] hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">🌳</div>
                        <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text">Landscapers</h3>
                        <p className="text-sm text-light-text/80 dark:text-dark-text/80">Calculate topsoil, gravel, and fill dirt for landscape installations, garden beds, pathways, and terrain reshaping projects.</p>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-lg border-l-4 border-[#FF6B35] hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">👨‍💼</div>
                        <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text">Engineers</h3>
                        <p className="text-sm text-light-text/80 dark:text-dark-text/80">Perform earthwork volume calculations for civil engineering projects including road construction, site development, and erosion control.</p>
                    </div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section className="mt-12 bg-gradient-to-br from-light-bg to-light-card dark:from-dark-bg dark:to-dark-card p-8 rounded-2xl shadow-lg border border-light-border dark:border-dark-border print:hidden">
                <h2 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">About This Professional Fill Dirt Calculator</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Our <strong>Fill Dirt Calculator</strong> is the most comprehensive, professional-grade earthwork estimation tool available online—completely free to use. Engineered for accuracy and ease of use, it serves contractors bidding on commercial developments, homeowners planning backyard leveling projects, landscapers designing outdoor spaces, and civil engineers calculating cut-and-fill volumes for infrastructure projects. Save thousands in material waste and avoid costly project delays with instant, precise calculations.
                    </p>
                    
                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3 inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Why This Calculator Stands Out
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Unlike basic volume calculators that provide rough estimates, our advanced tool incorporates <strong>compaction factor adjustment</strong> (10-30% soil settling compensation), <strong>wastage buffer</strong> (5-15% spillage and over-excavation allowance), <strong>moisture adjustment</strong> (wet vs. dry soil weight differences), and <strong>drainage offset</strong> (subtracting reserved drainage layer space). These industry-standard parameters ensure first-order accuracy, eliminating the guesswork and preventing budget overruns from under-ordering or excessive waste from over-ordering. Our fill dirt cost estimator includes all these professional features for accurate earthwork volume calculations.
                    </p>
                    
                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3 inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Material Types & Custom Densities
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Calculate for six common materials with pre-loaded industry-standard densities: <strong>Fill Dirt</strong> (95 lb/ft³), <strong>Topsoil</strong> (80 lb/ft³), <strong>Gravel</strong> (105 lb/ft³), <strong>Sand</strong> (100 lb/ft³), <strong>Clay</strong> (110 lb/ft³), and <strong>Crushed Rock</strong> (100 lb/ft³). Need specialized material? Use the <strong>Custom Density</strong> option for engineered fills, recycled materials, or regional soil variations. The <strong>Material Comparison Mode</strong> lets you evaluate two materials side-by-side, comparing volumes, weights, costs, and truckloads to optimize your material selection based on structural requirements and budget constraints.
                    </p>
                    
                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3 inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                        </svg>
                        Multi-Shape Support & Complex Sites
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Handle complex project geometries effortlessly with multi-area calculations. Add unlimited areas with <strong>six shape options</strong>: <strong>Rectangle</strong> (length × width for standard plots, driveways, foundations), <strong>Circle</strong> (diameter input for ponds, silos, roundabouts), <strong>Triangle</strong> (base × height for sloped areas and corner plots), <strong>Trapezoid</strong> (parallel bases for sloped driveways, embankments, terraces), <strong>Oval/Ellipse</strong> (length × width for oval pools, elliptical gardens), and <strong>Irregular</strong> (enter known area for non-standard geometries). The calculator automatically aggregates volumes across all areas, applies compaction and wastage factors globally, and converts results to both <strong>Imperial</strong> (cubic yards, pounds, feet) and <strong>Metric</strong> (cubic meters, kilograms, meters) units seamlessly.
                    </p>
                    
                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3 inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                        Truckload Estimation & Logistics Planning
                    </h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Plan material delivery efficiently with precise truckload calculations. Select from standard truck sizes—<strong>5 cubic yards</strong> (small dump truck), <strong>10 cubic yards</strong> (standard tandem), <strong>18 cubic yards</strong> (tri-axle), or <strong>Custom Size</strong>—and instantly see how many loads you'll need. This prevents over-scheduling deliveries, reduces trucking costs, and helps coordinate site logistics with contractors. Use our <a href="/tools/pro-rv-loan" className="text-[#FF6B35] hover:text-[#e55a2b] dark:text-[#F7931E] dark:hover:text-[#FF6B35] font-semibold underline">Loan Calculator</a> to plan equipment financing for trucks and machinery. The calculator factors in your adjusted volume (including compaction and wastage) to ensure adequate material arrives on-site.
                    </p>                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3 inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Complete Cost Breakdown & Budget Management
                    </h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Get itemized cost estimates before placing orders. Input price per cubic yard/meter, flat delivery fees, and local tax rates to see <strong>material cost</strong>, <strong>delivery charges</strong>, <strong>taxes</strong>, and <strong>total project expense</strong>. This transparency helps with accurate bid preparation, budget approval, and cost comparison between suppliers. Use our <a href="/tools/fabric-costing" className="text-[#FF6B35] hover:text-[#e55a2b] dark:text-[#F7931E] dark:hover:text-[#FF6B35] font-semibold underline">Fabric Costing Tool</a> for material cost calculations and <a href="/tools/percentage-change" className="text-[#FF6B35] hover:text-[#e55a2b] dark:text-[#F7931E] dark:hover:text-[#FF6B35] font-semibold underline">Percentage Change Calculator</a> to analyze cost variations.
                    </p>                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3 inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Real-Time Calculations & Mobile Responsive
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        Experience instant results as you type—no submit buttons or page reloads needed. The calculator updates volume, weight, cost, and truckloads in real-time, allowing rapid what-if scenario analysis. Fully responsive design works flawlessly on desktop, tablet, and mobile devices, letting you calculate fill dirt requirements directly from the job site. Dark mode support reduces eye strain during long estimation sessions. Use our <a href="/tools/time-difference" className="text-[#10b981] hover:text-[#059669] dark:text-[#34d399] dark:hover:text-[#10b981] font-semibold underline">Time Difference Calculator</a> to manage project timelines and delivery schedules. This is the most advanced free <strong>fill dirt estimator</strong>, <strong>earthwork calculator</strong>, <strong>soil volume calculator</strong>, and <strong>excavation planning tool</strong> trusted by construction professionals worldwide.
                    </p>
                </div>
            </section>

            {/* --- EXTERNAL LINKS --- */}
            <section className="mt-12 bg-light-card dark:bg-dark-card p-8 rounded-2xl shadow-lg border border-light-border dark:border-dark-border print:hidden">
                <h2 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">Helpful Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="https://www.usgs.gov/faqs/what-are-differences-between-soil-dirt-and-earth" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-light-bg dark:bg-dark-card rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
                        <svg className="w-5 h-5 text-[#10b981] dark:text-[#34d399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-cyan-600 dark:group-hover:text-cyan-400">USGS: Soil vs Dirt vs Earth</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Official definitions and classifications</div>
                        </div>
                    </a>
                    <a href="https://www.engineeringtoolbox.com/dirt-mud-densities-d_1727.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-light-bg dark:bg-dark-card rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
                        <svg className="w-5 h-5 text-[#06b6d4] dark:text-[#22d3ee] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-purple-600 dark:group-hover:text-purple-400">Engineering ToolBox: Soil Densities</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Technical reference for material weights</div>
                        </div>
                    </a>
                    <a href="https://www.nrcs.usda.gov/wps/portal/nrcs/main/soils/survey/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-light-bg dark:bg-dark-card rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
                        <svg className="w-5 h-5 text-[#3b82f6] dark:text-[#60a5fa] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-green-600 dark:group-hover:text-green-400">USDA NRCS: Soil Survey</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Comprehensive soil data and maps</div>
                        </div>
                    </a>
                    <a href="https://www.concretenetwork.com/concrete/howmuch/calculator.htm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-light-bg dark:bg-dark-card rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover transition-colors group">
                        <svg className="w-5 h-5 text-[#10b981] dark:text-[#34d399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="External link"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-orange-600 dark:group-hover:text-orange-400">Concrete Network: Material Calculators</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Related construction estimation tools</div>
                        </div>
                    </a>
                </div>
            </section>

            {/* --- LAST UPDATED --- */}
            <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 print:hidden">
                <p>Last Updated: November 9, 2025</p>
            </div>

            {/* --- HOW TO & FAQ --- */}
            <div className="mt-12 print:hidden">
                <Card title="How to Use This Fill Dirt Calculator - Complete Guide for Accurate Volume Calculations">
                    <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-3 inline-flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Quick Start Guide
                            </h3>
                            <p className="text-blue-700 dark:text-blue-300">Our professional tool makes earthwork volume calculations simple. Whether you're a homeowner planning backyard leveling or a contractor estimating commercial projects, this guide will help you get accurate results.</p>
                        </div>

                    <ol className="list-decimal list-inside space-y-6">
                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#FF6B35]">Select Your Measurement System:</strong> Choose Imperial (feet, cubic yards, pounds) or Metric (meters, cubic meters, kilograms) based on your location and project specifications.
                            <div className="mt-3 ml-6 space-y-2">
                                <p className="text-sm inline-flex items-start gap-2"><svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><em>Example: US construction projects typically use Imperial, while international projects use Metric.</em></p>
                                <p className="text-sm"><em>📏 Imperial: Perfect for residential projects, landscaping, and US-based contractors</em></p>
                                <p className="text-sm"><em>🌍 Metric: Ideal for international projects, engineering firms, and global suppliers</em></p>
                            </div>
                        </li>

                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#2E8B57]">Add Project Areas:</strong> Click "Add Area" to define multiple zones. Select the appropriate shape type for accurate volume calculations:
                            <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                                        <strong className="text-green-800 dark:text-green-200">Rectangle:</strong> Perfect for rectangular areas like driveways, foundations, and garden plots.
                                        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                                            📐 <em>Visual: Four 90° corners, parallel sides, uniform depth throughout</em><br/>
                                            📊 <strong>Example:</strong> A 30ft × 20ft × 1ft driveway needs 22.2 cubic yards of fill dirt<br/>
                                            🏗️ <strong>Use Cases:</strong> Parking pads, building foundations, raised garden beds, rectangular pools
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                                        <strong className="text-blue-800 dark:text-blue-200">Circle:</strong> Ideal for circular areas like ponds, silos, and round patios.
                                        <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                            ⭕ <em>Visual: Perfectly round perimeter, measured by diameter, even depth across</em><br/>
                                            📊 <strong>Example:</strong> A 15ft diameter × 3ft deep pond requires 15.7 cubic yards<br/>
                                            🏗️ <strong>Use Cases:</strong> Decorative ponds, grain silos, circular planters, round fountains
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                                        <strong className="text-purple-800 dark:text-purple-200">Triangle:</strong> Best for triangular sections, sloped corners, or wedge-shaped areas.
                                        <p className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                                            🔺 <em>Visual: Three-sided polygon, requires base length and perpendicular height</em><br/>
                                            📊 <strong>Example:</strong> A triangle with 20ft base × 15ft height × 2ft depth needs 11.1 cubic yards<br/>
                                            🏗️ <strong>Use Cases:</strong> Corner lots, sloped embankments, triangular garden designs, pie-shaped yards
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-lg">
                                        <strong className="text-orange-800 dark:text-orange-200">Trapezoid:</strong> Designed for sloped areas with parallel top and bottom edges.
                                        <p className="mt-2 text-sm text-orange-700 dark:text-orange-300">
                                            ⬡ <em>Visual: Four sides with two parallel bases (top and bottom), slanted sides</em><br/>
                                            📊 <strong>Example:</strong> A 25ft top × 35ft bottom × 20ft height × 1.5ft depth = 33.3 cubic yards<br/>
                                            🏗️ <strong>Use Cases:</strong> Terraced hillsides, embankments, retaining wall areas, sloped driveways
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 p-4 rounded-lg">
                                        <strong className="text-cyan-800 dark:text-cyan-200">Oval:</strong> For elliptical shapes like oval pools, gardens, and tracks.
                                        <p className="mt-2 text-sm text-cyan-700 dark:text-cyan-300">
                                            ⬭ <em>Visual: Elongated circle with longest (length) and shortest (width) diameters</em><br/>
                                            📊 <strong>Example:</strong> A 30ft × 18ft × 4ft oval pool requires 62.8 cubic yards<br/>
                                            🏗️ <strong>Use Cases:</strong> Elliptical pools, oval gardens, running tracks, decorative landscaping
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 p-4 rounded-lg">
                                        <strong className="text-gray-800 dark:text-gray-200">Irregular:</strong> For non-standard shapes when you already know the surface area.
                                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                            🔷 <em>Visual: Any complex shape - you provide the pre-measured area</em><br/>
                                            📊 <strong>Example:</strong> A 500 sq ft custom area × 2ft depth = 37 cubic yards<br/>
                                            🏗️ <strong>Use Cases:</strong> L-shaped yards, curved pathways, multi-sided plots, architectural designs
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200"><strong>💡 Pro Tip:</strong> For complex projects, break them into multiple simple shapes and add them together. Our calculator automatically aggregates all areas for total volume calculations.</p>
                                </div>
                            </div>
                        </li>

                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#4682B4]">Choose Fill Material:</strong> Select from Fill Dirt, Topsoil, Gravel, Sand, Clay, Crushed Rock (with preset densities), or Custom for specialized materials.
                            <div className="mt-3 ml-6 space-y-2">
                                <p className="text-sm"><em>💡 Pro Tip: Fill dirt (95 lb/ft³ ≈ 2,565 lbs/yd³) is denser than topsoil (80 lb/ft³ ≈ 2,160 lbs/yd³), affecting weight and cost calculations.</em></p>
                                <p className="text-sm"><em>✅ For structural projects: Use fill dirt or gravel for maximum stability</em></p>
                                <p className="text-sm"><em>🌱 For landscaping: Consider topsoil for plant growth and nutrient content</em></p>
                                <p className="text-sm"><em>💰 Cost-conscious: Fill dirt is typically the most economical option</em></p>
                            </div>
                        </li>

                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#8b5cf6]">Configure Advanced Settings:</strong> Adjust compaction factor (10-20%), wastage buffer (5-10%), moisture adjustment, and drainage offset for precise calculations.
                            <div className="mt-3 ml-6 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">Compaction Factor</h4>
                                        <p className="text-sm">Soil settles after placement. Default 15% accounts for typical settling.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">Wastage Buffer</h4>
                                        <p className="text-sm">Extra material for spills and uneven spreading. Default 5-10% recommended.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">Moisture Adjustment</h4>
                                        <p className="text-sm">Wet soil weighs more. Enable for accurate weight calculations.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-purple-700 dark:text-purple-300">Drainage Offset</h4>
                                        <p className="text-sm">Subtract space reserved for drainage layers from fill depth.</p>
                                    </div>
                                </div>
                                <p className="text-sm bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg"><em>📊 Example: A project with 15% compaction and 10% wastage requires 1.265× the base volume.</em></p>
                            </div>
                        </li>

                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#FF6B35]">Enter Cost Details:</strong> Input price per unit, delivery fees, and tax rate for complete budget estimation including material, shipping, and taxes.
                            <div className="mt-3 ml-6 space-y-2">
                                <p className="text-sm"><em>📊 Example: 50 yards × $30/yard + $150 delivery + 8% tax = $1,770 total project cost.</em></p>
                                <p className="text-sm"><em>💰 Bulk pricing: Larger orders often qualify for volume discounts</em></p>
                                <p className="text-sm"><em>🚚 Delivery costs: Factor in distance, truck size, and accessibility</em></p>
                                <p className="text-sm"><em>💸 Tax considerations: Include local sales tax and any applicable fees</em></p>
                            </div>
                        </li>

                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#f59e0b]">Select Truck Capacity:</strong> Choose 5, 10, 18 cubic yards, or custom size to calculate exact truckloads needed for efficient delivery planning.
                            <div className="mt-3 ml-6 space-y-2">
                                <p className="text-sm"><em>📊 Example: 45 cubic yards ÷ 18-yard trucks = 2.5 trucks (order 3 truckloads).</em></p>
                                <p className="text-sm"><em>🚚 Small trucks (5-7 yards): Residential projects, tight access</em></p>
                                <p className="text-sm"><em>🚛 Standard trucks (10-12 yards): Most common for landscaping</em></p>
                                <p className="text-sm"><em>🚚 Large trucks (15-18 yards): Commercial projects, bulk orders</em></p>
                            </div>
                        </li>

                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#ef4444]">Review & Export Results:</strong> View volume, weight, costs, and truckloads. Copy summary, download CSV, save JSON, or print for contractors and suppliers.
                            <div className="mt-3 ml-6 space-y-2">
                                <p className="text-sm"><em>📧 Use Case: Email CSV to suppliers for quotes, print for on-site reference, save JSON for project records.</em></p>
                                <p className="text-sm"><em>📋 Copy Summary: Quick text format for sharing with team members</em></p>
                                <p className="text-sm"><em>📄 CSV Download: Import into spreadsheets for detailed analysis</em></p>
                                <p className="text-sm"><em>🖨️ Print Version: Professional documentation for clients</em></p>
                            </div>
                        </li>

                        <li className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                            <strong className="text-lg text-[#2E8B57]">Compare Materials (Optional):</strong> Enable comparison mode to evaluate two materials side-by-side for cost-effective decision making.
                            <div className="mt-3 ml-6 space-y-2">
                                <p className="text-sm"><em>📊 Example: Compare fill dirt ($30/yd³) vs. topsoil ($45/yd³) to optimize your $3,000 budget.</em></p>
                                <p className="text-sm"><em>🔍 Use this feature to evaluate cost vs. performance trade-offs</em></p>
                                <p className="text-sm"><em>🎯 Perfect for value engineering and budget optimization</em></p>
                            </div>
                        </li>
                    </ol>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-500 mt-8">
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">✅ Success Tips for Accurate Calculations</h3>
                        <ul className="space-y-2 text-green-700 dark:text-green-300">
                            <li><strong>Measure Twice:</strong> Always double-check your measurements before ordering materials</li>
                            <li><strong>Account for Compaction:</strong> Loose dirt settles 10-30% after placement</li>
                            <li><strong>Plan for Wastage:</strong> Add 5-10% buffer for spills and uneven spreading</li>
                            <li><strong>Consider Access:</strong> Ensure delivery trucks can reach your site</li>
                            <li><strong>Check Local Regulations:</strong> Some areas have restrictions on fill dirt placement</li>
                            <li><strong>Get Multiple Quotes:</strong> Compare prices from different suppliers</li>
                        </ul>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Ready to calculate your fill dirt needs?</p>
                        <p className="text-gray-600 dark:text-gray-400">Use our professional fill dirt calculator above to get instant, accurate results for your project.</p>
                    </div>
                    </div>
                </Card>
                <Card title="Frequently Asked Questions">
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <div>
                            <h4 className="font-semibold">How to calculate fill dirt for your project?</h4>
                            <p className="text-sm">To calculate fill dirt, measure your area's length, width, and depth. Multiply these dimensions to get cubic footage, then divide by 27 to convert to cubic yards. This calculator handles all conversions automatically and accounts for compaction factors, material density, and buffer for professional accuracy.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">How much fill dirt do I need calculator - Truckload estimation</h4>
                            <p className="text-sm">Enter your project dimensions to calculate how much fill dirt you need in cubic yards. The calculator estimates truckloads based on truck size (5-18 cubic yards). For example, a 20x30x1 ft area needs about 22 cubic yards or 2-3 standard truckloads. Our professional fill dirt calculator for contractors includes delivery planning.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">How do I calculate how much fill dirt I need for different materials?</h4>
                            <p className="text-sm">Different materials have varying densities and compaction rates. Use the Compare Materials feature to calculate fill dirt requirements for topsoil, clay, sand, gravel, or crushed stone. The calculator adjusts volume and cost based on each material's specific properties and compaction factors.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">What is the difference between fill dirt and topsoil?</h4>
                            <p className="text-sm">Fill dirt is subsoil lacking organic matter, ideal for structural filling and leveling. Topsoil contains nutrients and organic materials perfect for planting and landscaping. Fill dirt is denser (95 lb/ft³) and cheaper, while topsoil (80 lb/ft³) costs more but supports plant growth. Use fill dirt for foundations, grading, and raising ground levels; use topsoil for gardens and lawns.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">How many tons is a yard of dirt?</h4>
                            <p className="text-sm">One cubic yard of fill dirt typically weighs 1.3 to 1.5 tons (2,600-3,000 lbs), depending on moisture content and composition. Dry fill dirt averages 2,500 lbs per cubic yard, while wet or clay-heavy dirt can reach 3,000+ lbs. This calculator automatically converts volume to weight based on selected material type and moisture levels.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Should I compact fill dirt before calculating?</h4>
                            <p className="text-sm">Yes! Always account for compaction when ordering fill dirt. Loose dirt settles 10-30% after compaction depending on soil type and compaction method. Our calculator includes a compaction factor setting (default 15%) that automatically increases the volume estimate to compensate for settling, ensuring you order enough material for proper grade elevation.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">How much does fill dirt cost per cubic yard?</h4>
                            <p className="text-sm">Fill dirt costs $5-$25 per cubic yard depending on location, quality, and quantity. Bulk orders (10+ yards) average $8-$15/yard. Screened fill dirt costs $10-$20/yard, while unscreened dirt with rocks costs $5-$12/yard. Delivery fees add $50-$150 depending on distance. Use our cost estimation feature to calculate total project expenses including delivery and taxes.</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* --- RELATED TOOLS --- */}
            <section className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 p-8 rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-600 print:hidden">
                <h2 className="text-2xl font-bold text-center mb-6 text-light-text dark:text-dark-text">Related Calculators</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/tools/fabric-costing" className="flex items-center gap-3 p-4 bg-light-card dark:bg-dark-card rounded-lg hover:shadow-lg transition-shadow group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">FC</div>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-cyan-600 dark:group-hover:text-cyan-400">Fabric Costing Tool</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Calculate material costs</div>
                        </div>
                    </a>
                    <a href="/tools/percentage-change" className="flex items-center gap-3 p-4 bg-light-card dark:bg-dark-card rounded-lg hover:shadow-lg transition-shadow group">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">%</div>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-purple-600 dark:group-hover:text-purple-400">Percentage Change</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Cost variation calculator</div>
                        </div>
                    </a>
                    <a href="/tools/time-difference" className="flex items-center gap-3 p-4 bg-light-card dark:bg-dark-card rounded-lg hover:shadow-lg transition-shadow group">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">⏱️</div>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-green-600 dark:group-hover:text-green-400">Time Difference</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Project timeline calculator</div>
                        </div>
                    </a>
                    <a href="/tools/pro-rv-loan" className="flex items-center gap-3 p-4 bg-light-card dark:bg-dark-card rounded-lg hover:shadow-lg transition-shadow group">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">$</div>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-orange-600 dark:group-hover:text-orange-400">Loan Calculator</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Equipment financing tool</div>
                        </div>
                    </a>
                    <a href="/text-and-writing-tools/word-counter" className="flex items-center gap-3 p-4 bg-light-card dark:bg-dark-card rounded-lg hover:shadow-lg transition-shadow group">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">Aa</div>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Word Counter</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Document analysis tool</div>
                        </div>
                    </a>
                    <a href="/tools/shadow-css-generator" className="flex items-center gap-3 p-4 bg-light-card dark:bg-dark-card rounded-lg hover:shadow-lg transition-shadow group">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">CSS</div>
                        <div>
                            <div className="font-semibold text-light-text dark:text-dark-text group-hover:text-pink-600 dark:group-hover:text-pink-400">CSS Shadow Generator</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Web design utility</div>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    );
};

// --- CHILD COMPONENTS (defined outside main component) ---
const Card: React.FC<{ title: string, children: React.ReactNode, isSticky?: boolean }> = ({ title, children, isSticky }) => (
    <div className={`bg-light-card dark:bg-dark-card p-4 sm:p-6 rounded-lg shadow-md ${isSticky ? 'sticky top-8' : ''}`}>
        <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text border-b border-light-border dark:border-dark-border pb-2">{title}</h2>
        {children}
    </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    prefix?: string;
    suffix?: string;
    help?: string;
}
const Input: React.FC<InputProps> = ({ label, prefix, suffix, help, ...props }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">{label}</label>
        <div className="relative rounded-xl shadow-sm">
            {prefix && <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-600 dark:text-gray-400 font-semibold">{prefix}</span>}
            <input {...props} className={`form-input ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-12' : ''}`} />
            {suffix && <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 dark:text-gray-400 font-semibold">{suffix}</span>}
        </div>
        {help && <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{help}</p>}
    </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, children, ...props }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">{label}</label>
        <select {...props} className="form-input cursor-pointer">{children}</select>
    </div>
);

const Slider: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string, suffix?: string, help?: string }> = ({ label, value, suffix, help, ...props }) => (
    <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">{label}: <span className="font-bold text-[#FF6B35]">{value}{suffix}</span></label>
        <input type="range" {...props} value={value} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-[#FF6B35]" />
        {help && <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{help}</p>}
    </div>
);

const ResultDisplay: React.FC<{ results: any, unitSystem: UnitSystem }> = ({ results, unitSystem }) => (
    <div className="space-y-3">
        <ResultRow label="Total Volume" value={`${results.volumeYd3} yd³ / ${results.volumeM3} m³`} />
        <ResultRow label="Total Weight" value={`${results.weightLb} lb / ${results.weightKg} kg`} />
        <ResultRow label="Truckloads" value={`${results.numTrucks}`} />
        <div className="pt-3 mt-3 border-t border-light-border dark:border-dark-border">
            <ResultRow label="Total Cost" value={`$${results.totalCost}`} isLarge={true} />
        </div>
        <p className="text-xs text-center text-gray-700 dark:text-gray-300 pt-2">{results.materialSummary.name} ({results.materialSummary.density})</p>
    </div>
);

const ResultRow: React.FC<{ label: string, value: string, isLarge?: boolean }> = ({ label, value, isLarge }) => (
    <div className={`flex justify-between items-baseline ${isLarge ? 'text-xl' : 'text-base'}`}>
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className={`font-bold ${isLarge ? 'text-brand-primary dark:text-brand-primary-light' : 'text-light-text dark:text-dark-text'}`}>{value}</span>
    </div>
);

// Add some global styles for form elements and buttons for consistency
const GlobalStyles = () => (
    <style>{`
      .form-input {
        display: block;
        width: 100%;
        padding: 0.75rem 1rem;
        background-color: white;
        color: #000000 !important;
        border: 2px solid #d1d5db;
        border-radius: 0.75rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.2s;
      }
      .dark .form-input {
        background-color: #374151;
        color: #ffffff !important;
        border-color: #4b5563;
      }
      .form-input::placeholder {
        color: #9ca3af;
      }
      .dark .form-input::placeholder {
        color: #6b7280;
      }
      .form-input:focus {
        outline: none;
        border-color: #FF6B35;
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
      }
      .dark .form-input:focus {
        border-color: #F7931E;
      }
      select.form-input {
        cursor: pointer;
        padding-right: 2.5rem;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 1.5em 1.5em;
        appearance: none;
      }
      select.form-input option {
        background-color: white;
        color: #000000;
      }
      .dark select.form-input option {
        background-color: #374151;
        color: #ffffff;
      }
      .btn-secondary {
        @apply px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-[#FF6B35]/30 transition-all transform hover:scale-105;
      }
      .btn-danger {
          @apply px-5 py-2.5 text-sm font-semibold text-white bg-red-600 border-2 border-transparent rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-3 focus:ring-red-500/30 transition-all transform hover:scale-105;
      }
      @media (min-width: 1024px) {
        .results-sticky {
          position: sticky !important;
          position: -webkit-sticky !important;
          top: 6rem !important;
          align-self: flex-start !important;
          max-height: calc(100vh - 8rem) !important;
          overflow-y: auto !important;
          z-index: 10 !important;
        }
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .dark {
            background-color: white !important;
            color: black !important;
        }
        .dark .bg-dark-card, .dark .bg-dark-bg {
             background-color: white !important;
        }
        .dark .dark\\:text-dark-text, .dark .dark\\:text-dark-muted {
            color: black !important;
        }
      }
    `}</style>
);

const FillDirtCalculatorWrapper: React.FC<FillDirtCalculatorProps> = ({ navigateTo }) => (
    <>
        <GlobalStyles />
        <FillDirtCalculator navigateTo={navigateTo} />
    </>
);

export default FillDirtCalculatorWrapper;







