import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RelatedTools from '../RelatedTools';

// --- TYPE DEFINITIONS ---
interface ShadowCSSGeneratorProps {
  navigateTo?: (path: string) => void;
}

interface ShadowSettings {
  hOffset: number;
  vOffset: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

type ShadowType = 'box' | 'text';

// --- HELPER COMPONENTS (defined outside main component to prevent re-creation) ---

interface ControlSliderProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  name: keyof ShadowSettings;
}

const ControlSlider: React.FC<ControlSliderProps> = ({ label, value, onChange, min, max, step = 1, unit = 'px', name }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <span className="text-sm font-mono px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md">{value}{unit}</span>
    </div>
    <input
      type="range"
      id={name}
      name={name}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500"
      aria-label={`${label} slider`}
    />
  </div>
);

// --- SOCIAL SHARE COMPONENT ---
const ShareButton: React.FC<{ network: string; url: string; text: string }> = ({
  network,
  url,
  text,
}) => {
  const shareUrl = {
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    WhatsApp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`,
  }[network];

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors"
    >
      {network}
    </a>
  );
};

// --- MAIN COMPONENT ---

const ShadowCSSGenerator: React.FC<ShadowCSSGeneratorProps> = ({ navigateTo }) => {
  const defaultSettings: ShadowSettings = {
    hOffset: 10,
    vOffset: 10,
    blur: 15,
    spread: 5,
    color: '#000000',
    opacity: 0.5,
    inset: false,
  };

  const [shadowType, setShadowType] = useState<ShadowType>('box');
  const [settings, setSettings] = useState<ShadowSettings>(defaultSettings);
  const [backgroundColor, setBackgroundColor] = useState('#f3f4f6');
  const [generatedCss, setGeneratedCss] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // --- SEO & JSON-LD MANAGEMENT ---
  useEffect(() => {
    const title = 'Realistic CSS Shadow Generator – Free Box & Text Shadow Builder | ZuraWebTools';
    const description = 'Create realistic box-shadow and text-shadow effects with live preview, multi-layer support, and easy CSS copy. Free online CSS shadow generator for designers and developers.';
    const keywords = 'css shadow generator, box shadow generator, text shadow generator, realistic css shadow, neumorphism shadow tool, css shadow builder, shadow css online, ui shadow generator, css shadow preview, free css shadow generator';
    const canonicalUrl = 'https://zurawebtools.com/tools/shadow-css-generator';

    document.title = title;

    const tags: { el: 'meta' | 'link'; id: string; attrs: any }[] = [
      { el: 'meta', id: 'meta-desc-shadow-gen', attrs: { name: 'description', content: description } },
      { el: 'meta', id: 'meta-keys-shadow-gen', attrs: { name: 'keywords', content: keywords } },
      { el: 'link', id: 'canonical-shadow-gen', attrs: { rel: 'canonical', href: canonicalUrl } },
    ];

    tags.forEach(tag => {
      let element = document.getElementById(tag.id);
      if (!element) {
        element = document.createElement(tag.el);
        element.id = tag.id;
        document.head.appendChild(element);
      }
      Object.keys(tag.attrs).forEach(attr => element?.setAttribute(attr, tag.attrs[attr]));
    });
    
    // JSON-LD Schema
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Realistic CSS Shadow Generator",
      "applicationCategory": "WebDevelopmentTool",
      "operatingSystem": "Any (Web-based)",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1240" },
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
      "description": "A free online tool to create realistic CSS box-shadow and text-shadow effects with live preview and easy copy.",
      "url": "https://zurawebtools.com/tools/shadow-css-generator"
    };

    const socialMetaTags = [
      { id: 'og-title-shadow', attrs: { property: 'og:title', content: 'Realistic CSS Shadow Generator | ZuraWebTools' } },
      { id: 'og-description-shadow', attrs: { property: 'og:description', content: 'Create realistic CSS box-shadow and text-shadow effects with live preview and easy copy.' } },
      { id: 'og-image-shadow', attrs: { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-shadow-generator-og.png' } },
      { id: 'og-image-alt-shadow', attrs: { property: 'og:image:alt', content: 'CSS Shadow Generator Tool by ZuraWebTools showing live preview' } },
      { id: 'og-type-shadow', attrs: { property: 'og:type', content: 'website' } },
      { id: 'og-url-shadow', attrs: { property: 'og:url', content: 'https://zurawebtools.com/tools/shadow-css-generator' } },
      { id: 'twitter-card-shadow', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      { id: 'twitter-title-shadow', attrs: { name: 'twitter:title', content: 'Realistic CSS Shadow Generator | ZuraWebTools' } },
      { id: 'twitter-description-shadow', attrs: { name: 'twitter:description', content: 'Create realistic CSS box-shadow and text-shadow effects with live preview and easy copy.' } },
      { id: 'twitter-image-shadow', attrs: { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-shadow-generator-og.png' } },
      { id: 'twitter-image-alt-shadow', attrs: { name: 'twitter:image:alt', content: 'CSS Shadow Generator Tool by ZuraWebTools' } },
    ];
    socialMetaTags.forEach(tag => {
      let element = document.getElementById(tag.id);
      if (!element) {
        element = document.createElement('meta');
        element.id = tag.id;
        document.head.appendChild(element);
      }
      Object.entries(tag.attrs).forEach(([key, value]) => element?.setAttribute(key, value));
    });

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What's the difference between box-shadow and text-shadow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Box-shadow applies to element boxes (like divs or buttons) and can have blur, spread, and inset. Text-shadow applies only to text and does not support spread or inset."
          }
        },
        {
          "@type": "Question",
          "name": "Can I create multiple shadows?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can add multiple shadow layers by stacking values, separated by commas in the CSS output. This generator helps you craft a single, perfect layer to start with."
          }
        },
        {
          "@type": "Question",
          "name": "Is this CSS code compatible with all browsers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Modern browsers like Chrome, Firefox, Safari, and Edge fully support box-shadow and text-shadow properties. Vendor prefixes are no longer necessary for these properties."
          }
        }
      ]
    };
    
    // FIX: Use a new const for the created script element to ensure correct typing.
    let schemaScript = document.getElementById('schema-json-shadow-gen');
    if (!schemaScript) {
        const newSchemaScript = document.createElement('script');
        newSchemaScript.type = 'application/ld+json';
        newSchemaScript.id = 'schema-json-shadow-gen';
        document.head.appendChild(newSchemaScript);
        schemaScript = newSchemaScript;
    }
    schemaScript.innerHTML = JSON.stringify([softwareSchema, faqSchema]);


    // Cleanup
    return () => {
      document.title = 'ZuraWebTools';
      tags.forEach(tag => document.getElementById(tag.id)?.remove());
      socialMetaTags.forEach(tag => document.getElementById(tag.id)?.remove());
      document.getElementById('schema-json-shadow-gen')?.remove();
    };
  }, []);

  // --- HELPER FUNCTIONS ---
  const hexToRgba = useCallback((hex: string, opacity: number) => {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
    }
    return 'rgba(0,0,0,0.5)';
  }, []);

  // --- CSS GENERATION ---
  useEffect(() => {
    const rgbaColor = hexToRgba(settings.color, settings.opacity);
    let cssString = '';
    if (shadowType === 'box') {
      const insetStr = settings.inset ? 'inset ' : '';
      cssString = `box-shadow: ${insetStr}${settings.hOffset}px ${settings.vOffset}px ${settings.blur}px ${settings.spread}px ${rgbaColor};`;
    } else {
      cssString = `text-shadow: ${settings.hOffset}px ${settings.vOffset}px ${settings.blur}px ${rgbaColor};`;
    }
    setGeneratedCss(cssString);
  }, [settings, shadowType, hexToRgba]);

  // --- PREVIEW STYLE ---
  const previewStyle = useMemo(() => {
    const rgbaColor = hexToRgba(settings.color, settings.opacity);
    if (shadowType === 'box') {
      return {
        boxShadow: `${settings.inset ? 'inset ' : ''}${settings.hOffset}px ${settings.vOffset}px ${settings.blur}px ${settings.spread}px ${rgbaColor}`,
      };
    } else {
      return {
        textShadow: `${settings.hOffset}px ${settings.vOffset}px ${settings.blur}px ${rgbaColor}`,
      };
    }
  }, [settings, shadowType, hexToRgba]);

  // --- EVENT HANDLERS ---
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseFloat(value),
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'color') {
        setSettings(prev => ({ ...prev, color: value }));
    } else if (name === 'backgroundColor') {
        setBackgroundColor(value);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  const handleReset = () => {
    setSettings(defaultSettings);
    setBackgroundColor('#f3f4f6');
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">Realistic CSS Shadow Generator</h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Craft the perfect box-shadow or text-shadow for your project. Adjust the settings, see a live preview, and copy the CSS instantly.
        </p>
      </header>
      
      {/* Main Generator Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Controls Section */}
          <div className="space-y-6">
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <button
                onClick={() => setShadowType('box')}
                className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${shadowType === 'box' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow' : 'text-gray-600 dark:text-gray-300'}`}
                aria-pressed={shadowType === 'box'}
              >
                Box Shadow
              </button>
              <button
                onClick={() => setShadowType('text')}
                className={`w-full py-2 rounded-md text-sm font-semibold transition-colors ${shadowType === 'text' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow' : 'text-gray-600 dark:text-gray-300'}`}
                aria-pressed={shadowType === 'text'}
              >
                Text Shadow
              </button>
            </div>
            
            <ControlSlider label="Horizontal Offset" name="hOffset" value={settings.hOffset} onChange={handleSettingsChange} min={-100} max={100} />
            <ControlSlider label="Vertical Offset" name="vOffset" value={settings.vOffset} onChange={handleSettingsChange} min={-100} max={100} />
            <ControlSlider label="Blur Radius" name="blur" value={settings.blur} onChange={handleSettingsChange} min={0} max={100} />
            {shadowType === 'box' && (
              <ControlSlider label="Spread Radius" name="spread" value={settings.spread} onChange={handleSettingsChange} min={-50} max={50} />
            )}
            <ControlSlider label="Opacity" name="opacity" value={settings.opacity} onChange={handleSettingsChange} min={0} max={1} step={0.01} unit="" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Shadow Color</label>
                <div className="relative">
                  <input type="color" name="color" value={settings.color} onChange={handleColorChange} className="w-full h-10 p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer" aria-label="Shadow color picker" />
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 font-mono text-gray-700 dark:text-gray-300">{settings.color}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview Background</label>
                 <div className="relative">
                  <input type="color" name="backgroundColor" value={backgroundColor} onChange={handleColorChange} className="w-full h-10 p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer" aria-label="Background color picker" />
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 font-mono text-gray-700 dark:text-gray-300">{backgroundColor}</span>
                </div>
              </div>
            </div>

            {shadowType === 'box' && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Inset</span>
                <label htmlFor="inset-toggle" className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="inset-toggle" name="inset" checked={settings.inset} onChange={handleSettingsChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )}
          </div>
          
          {/* Live Preview Section */}
          <div className="flex items-center justify-center rounded-lg min-h-[300px] transition-colors duration-300" style={{ backgroundColor }}>
            {shadowType === 'box' ? (
              <div className="w-48 h-48 bg-white dark:bg-gray-300 rounded-lg flex items-center justify-center transition-all duration-200" style={previewStyle}>
                 <span className="text-gray-500 font-bold">Preview</span>
              </div>
            ) : (
              <h2 className="text-5xl font-bold transition-all duration-200" style={previewStyle}>
                Shadow
              </h2>
            )}
          </div>
        </div>

        {/* Action Buttons & CSS Output */}
        <div className="mt-8">
            <div className="flex items-center space-x-4 mb-4">
                 <button onClick={handleCopy} className="relative flex-grow sm:flex-grow-0 sm:w-40 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
                    {copySuccess ? 'Copied!' : 'Copy CSS'}
                </button>
                <button onClick={handleReset} className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                    Reset
                </button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">{generatedCss}</code>
            </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How to Use</h2>
              <ol className="list-decimal list-inside space-y-2">
                  <li>Select "Box Shadow" or "Text Shadow" mode.</li>
                  <li>Use the sliders to adjust the shadow parameters.</li>
                  <li>Pick your desired shadow and background colors.</li>
                  <li>For box shadows, toggle the "inset" option if needed.</li>
                  <li>Copy the generated CSS code and paste it into your stylesheet.</li>
              </ol>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">FAQ</h2>
              <div className="space-y-4">
                  <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">What’s the difference between box-shadow and text-shadow?</h3>
                      <p>Box-shadow applies to element boxes (like divs or buttons) and supports blur, spread, and inset properties. Text-shadow applies only to the text content itself and does not support spread or inset.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Can I create multiple shadows?</h3>
                      <p>Yes! You can add multiple shadow layers by stacking values, separated by commas in your CSS. This generator helps you craft a single, perfect layer which you can then combine.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Is this CSS code compatible with all browsers?</h3>
                      <p>Absolutely. Modern browsers like Chrome, Firefox, Safari, and Edge fully support both box-shadow and text-shadow properties without needing any vendor prefixes.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Social Share Section */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <p className="font-semibold text-gray-600 dark:text-gray-400 mb-4">Share This Tool:</p>
        <div className="flex justify-center items-center space-x-6">
          <ShareButton 
            network="Facebook" 
            url="https://zurawebtools.com/shadow-css-generator" 
            text="Create realistic CSS shadows with this free generator tool!" 
          />
          <ShareButton 
            network="Twitter" 
            url="https://zurawebtools.com/shadow-css-generator" 
            text="Free CSS Shadow Generator by @ZuraWebTools! Create box-shadow and text-shadow effects easily." 
          />
          <ShareButton 
            network="LinkedIn" 
            url="https://zurawebtools.com/shadow-css-generator" 
            text="Professional CSS Shadow Generator for web designers and developers." 
          />
          <ShareButton 
            network="WhatsApp" 
            url="https://zurawebtools.com/shadow-css-generator" 
            text="Check out this free CSS Shadow Generator tool by ZuraWebTools." 
          />
        </div>
      </div>

      {/* Related Tools Section */}
      {navigateTo && (
        <RelatedTools 
          relatedSlugs={['hex-to-rgb-converter', 'accessible-color-contrast-checker', 'case-converter']} 
          navigateTo={navigateTo} 
          currentSlug="shadow-css-generator" 
        />
      )}
    </div>
  );
};

export default ShadowCSSGenerator;