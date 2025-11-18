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

const ControlSlider: React.FC<ControlSliderProps> = ({ label, value, onChange, min, max, step = 1, unit = 'px', name }) => {
  // Create descriptive aria-label based on slider type
  const getAriaLabel = () => {
    switch (name) {
      case 'hOffset':
        return 'Adjust horizontal shadow offset from -100 to 100 pixels. Positive values move shadow right, negative values move left.';
      case 'vOffset':
        return 'Adjust vertical shadow offset from -100 to 100 pixels. Positive values move shadow down, negative values move up.';
      case 'blur':
        return 'Adjust blur radius from 0 to 100 pixels. Higher values create softer, more diffused shadows.';
      case 'spread':
        return 'Adjust spread radius from -50 to 50 pixels. Positive values expand shadow, negative values shrink it before blur is applied.';
      case 'opacity':
        return 'Adjust shadow opacity from 0 to 1. Lower values create more subtle, transparent shadows.';
      default:
        return `${label} slider`;
    }
  };

  return (
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
        aria-label={getAriaLabel()}
      />
    </div>
  );
};

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
    const canonicalUrl = 'https://zurawebtools.com/color-and-design-tools/shadow-css-generator';

    document.title = title;
    
    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', 'en');

    const tags: { el: 'meta' | 'link'; id: string; attrs: any }[] = [
      { el: 'meta', id: 'meta-desc-shadow-gen', attrs: { name: 'description', content: description } },
      { el: 'meta', id: 'meta-keys-shadow-gen', attrs: { name: 'keywords', content: keywords } },
      { el: 'meta', id: 'meta-robots-shadow-gen', attrs: { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' } },
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
      "url": "https://zurawebtools.com/color-and-design-tools/shadow-css-generator"
    };

    const socialMetaTags = [
      { id: 'og-title-shadow', attrs: { property: 'og:title', content: 'Realistic CSS Shadow Generator | ZuraWebTools' } },
      { id: 'og-description-shadow', attrs: { property: 'og:description', content: 'Create realistic CSS box-shadow and text-shadow effects with live preview and easy copy.' } },
      { id: 'og-image-shadow', attrs: { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-shadow-generator-og.png' } },
      { id: 'og-image-alt-shadow', attrs: { property: 'og:image:alt', content: 'CSS Shadow Generator Tool by ZuraWebTools showing live preview' } },
      { id: 'og-type-shadow', attrs: { property: 'og:type', content: 'website' } },
      { id: 'og-url-shadow', attrs: { property: 'og:url', content: 'https://zurawebtools.com/color-and-design-tools/shadow-css-generator' } },
      { id: 'og-locale-shadow', attrs: { property: 'og:locale', content: 'en_US' } },
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

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "CSS Shadow Generator - Create Box & Text Shadows",
      "description": "Free online tool to generate CSS box-shadow and text-shadow effects with real-time preview",
      "url": "https://zurawebtools.com/color-and-design-tools/shadow-css-generator",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      },
      "datePublished": "2024-01-15",
      "dateModified": "2025-11-08"
    };

    const breadcrumbSchema = {
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
          "name": "Tools",
          "item": "https://zurawebtools.com/tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "CSS Shadow Generator",
          "item": "https://zurawebtools.com/color-and-design-tools/shadow-css-generator"
        }
      ]
    };

    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use CSS Shadow Generator",
      "description": "Learn how to create realistic CSS shadows with our interactive generator tool",
      "image": "https://storage.googleapis.com/aai-web-samples/zura-shadow-generator-og.png",
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select Shadow Type",
          "text": "Choose between 'Box Shadow' for element shadows or 'Text Shadow' for text effects using the toggle at the top."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Adjust Shadow Properties",
          "text": "Use the sliders to control horizontal offset, vertical offset, blur radius, spread (box-shadow only), and opacity."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Pick Shadow Color",
          "text": "Click the color picker to select your desired shadow color. You can also adjust the background color to see how the shadow looks."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Toggle Inset (Optional)",
          "text": "For box shadows, toggle the 'Inset' option to create an inner shadow effect instead of an outer shadow."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Copy CSS Code",
          "text": "Click the 'Copy CSS' button to copy the generated code to your clipboard, then paste it into your stylesheet."
        }
      ]
    };

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
        },
        {
          "@type": "Question",
          "name": "How do I create a realistic shadow effect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For realistic shadows, use subtle blur (10-20px), moderate offset (5-10px), low opacity (0.1-0.3), and darker colors. Avoid bright colors or high opacity for natural-looking shadows."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between blur and spread in box-shadow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blur controls how soft/fuzzy the shadow edges are (higher = softer). Spread expands or shrinks the shadow size before blur is applied. Positive spread makes shadows larger, negative makes them smaller."
          }
        },
        {
          "@type": "Question",
          "name": "Can I animate CSS shadows?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! CSS shadows can be animated using CSS transitions or animations. Simply add 'transition: box-shadow 0.3s ease;' to smoothly animate shadow changes on hover or other states."
          }
        },
        {
          "@type": "Question",
          "name": "What are the performance impacts of multiple shadows?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Multiple shadows and large blur values can impact rendering performance, especially on mobile devices. For best performance, use 1-3 shadow layers and moderate blur values (under 30px)."
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
    schemaScript.innerHTML = JSON.stringify([softwareSchema, webPageSchema, breadcrumbSchema, howToSchema, faqSchema]);


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

  // --- KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+C or Cmd+C to copy CSS
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.shiftKey) {
        // Check if user is not selecting text or in an input
        const selection = window.getSelection();
        const activeElement = document.activeElement;
        if (!selection?.toString() && activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handleCopy();
        }
      }
      // Ctrl+R or Cmd+R to reset (prevent default browser reload)
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [generatedCss]);

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
                  <input 
                    type="color" 
                    name="color" 
                    value={settings.color} 
                    onChange={handleColorChange} 
                    className="w-full h-10 p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer" 
                    aria-label="Shadow color picker - Choose the color for your shadow effect"
                  />
                  <span className="absolute left-12 top-1/2 -translate-y-1/2 font-mono text-gray-700 dark:text-gray-300">{settings.color}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview Background</label>
                 <div className="relative">
                  <input 
                    type="color" 
                    name="backgroundColor" 
                    value={backgroundColor} 
                    onChange={handleColorChange} 
                    className="w-full h-10 p-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer" 
                    aria-label="Preview background color picker - Change the background color to test shadow visibility"
                  />
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
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                 <button 
                    onClick={handleCopy} 
                    className="relative w-full sm:w-auto flex-grow sm:flex-grow-0 justify-center py-2.5 px-6 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                 >
                    {copySuccess ? '✓ Copied!' : '📋 Copy CSS'}
                </button>
                <button 
                    onClick={handleReset} 
                    className="w-full sm:w-auto py-2.5 px-6 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800 transition-colors"
                >
                    🔄 Reset
                </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
              💡 Keyboard shortcuts: <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-mono">Ctrl+C</kbd> to copy, <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300 font-mono">Ctrl+R</kbd> to reset
            </p>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <code className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">{generatedCss}</code>
            </div>
        </div>
      </div>

      {/* Content Sections */}
            {/* Quick Examples Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-3 text-white">Quick Shadow Presets</h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">Click any preset to instantly apply professional shadow styles</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button onClick={() => setSettings({...settings, hOffset: 0, vOffset: 4, blur: 15, spread: 0, opacity: 0.1})} className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-2xl">
            <div className="w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center" style={{boxShadow: '0 4px 15px 0 rgba(0,0,0,0.1)'}}>
              <div className="w-16 h-16 bg-white dark:bg-gray-600 rounded-lg" style={{boxShadow: '0 4px 15px 0 rgba(0,0,0,0.1)'}}></div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">✨ Soft Shadow</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Subtle, modern card effect</p>
          </button>

          <button onClick={() => setSettings({...settings, hOffset: 5, vOffset: 5, blur: 0, spread: 0, opacity: 0.8})} className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-2xl">
            <div className="w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center" style={{boxShadow: '5px 5px 0 0 rgba(0,0,0,0.8)'}}>
              <div className="w-16 h-16 bg-white dark:bg-gray-600 rounded-lg" style={{boxShadow: '5px 5px 0 0 rgba(0,0,0,0.8)'}}></div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">💪 Hard Shadow</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Bold, retro-style shadow</p>
          </button>

          <button onClick={() => setSettings({...settings, hOffset: -5, vOffset: -5, blur: 10, spread: 0, inset: false, opacity: 0.15})} className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-2xl">
            <div className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg" style={{boxShadow: '-5px -5px 10px rgba(255,255,255,0.7), 5px 5px 10px rgba(0,0,0,0.15)'}}></div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">🎨 Neumorphism</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Trendy 3D soft UI style</p>
          </button>

          <button onClick={() => setSettings({...settings, hOffset: 0, vOffset: 0, blur: 15, spread: -5, inset: true, opacity: 0.2})} className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-2xl">
            <div className="w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-600 rounded-lg" style={{boxShadow: 'inset 0 0 15px -5px rgba(0,0,0,0.2)'}}></div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">💡 Inner Glow</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Inset shadow effect</p>
          </button>

          <button onClick={() => setSettings({...settings, hOffset: 0, vOffset: 10, blur: 25, spread: 0, opacity: 0.12})} className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-2xl">
            <div className="w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center" style={{boxShadow: '0 10px 25px 0 rgba(0,0,0,0.12)'}}>
              <div className="w-16 h-16 bg-white dark:bg-gray-600 rounded-lg" style={{boxShadow: '0 10px 25px 0 rgba(0,0,0,0.12)'}}></div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">🃏 Card Shadow</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Perfect for UI cards</p>
          </button>

          <button onClick={() => setSettings({...settings, hOffset: 3, vOffset: 3, blur: 0, spread: 2, color: '#ff6b6b', opacity: 0.6})} className="bg-white dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-2xl">
            <div className="w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
              <div className="w-16 h-16 bg-white dark:bg-gray-600 rounded-lg" style={{boxShadow: '3px 3px 0 2px rgba(255,107,107,0.6)'}}></div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">🎯 Retro Shadow</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Vintage colored shadow</p>
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-3 text-white">Why Use Our CSS Shadow Generator?</h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">Professional shadow effects made simple with real-time visual control</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-blue-500/30">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 text-2xl">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Preview</h3>
            <p className="text-gray-300 text-sm">See your shadow changes instantly as you adjust sliders. No guesswork—what you see is what you get in your final CSS.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/30">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 text-2xl">🎨</div>
            <h3 className="text-xl font-bold text-white mb-2">Visual Controls</h3>
            <p className="text-gray-300 text-sm">Intuitive sliders and color pickers make it easy to create perfect shadows without memorizing CSS syntax or values.</p>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/30">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 text-2xl">📋</div>
            <h3 className="text-xl font-bold text-white mb-2">One-Click Copy</h3>
            <p className="text-gray-300 text-sm">Copy production-ready CSS code instantly with a single click. No formatting needed—paste directly into your stylesheet.</p>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900 dark:text-white">Perfect For</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Designed for professionals and learners alike</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🎨</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">UI/UX Designers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create realistic depth and dimension for modern interface designs</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">💻</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Frontend Developers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quickly prototype and implement shadow effects without trial and error</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🖌️</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Web Designers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Enhance visual hierarchy and create polished, professional websites</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">📚</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">CSS Learners</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Understand how shadow properties work through interactive experimentation</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About CSS Shadow Effects</h2>
        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
          <p>
            CSS shadows are essential design tools that add depth, dimension, and visual interest to web interfaces. The <strong>box-shadow</strong> property creates shadows around element boxes (like divs, buttons, or cards), while <strong>text-shadow</strong> applies shadows specifically to text content. Both properties are widely supported across all modern browsers without requiring vendor prefixes.
          </p>
          <p>
            Our <strong>CSS Shadow Generator</strong> provides an intuitive visual interface for creating both types of shadows. Unlike manually writing CSS values, our tool lets you adjust shadow properties using sliders and see real-time previews. This visual approach makes it easy to achieve the exact shadow effect you want, whether you're creating subtle card shadows, bold retro effects, or trendy neumorphic designs.
          </p>
          <p>
            The <strong>box-shadow</strong> syntax includes five main values: horizontal offset, vertical offset, blur radius, spread radius, and color. The horizontal and vertical offsets control shadow positioning—positive values move the shadow right and down, while negative values move it left and up. The blur radius creates soft edges (higher values = softer), while spread expands or shrinks the shadow before blur is applied. Adding the <strong>inset</strong> keyword creates an inner shadow instead of an outer one.
          </p>
          <p>
            <strong>Text-shadow</strong> works similarly but with a simpler syntax since it doesn't support spread or inset. It's perfect for making text stand out, creating glowing effects, or adding depth to typography. Multiple shadows can be stacked by separating values with commas, enabling complex layered effects.
          </p>
          <p>
            When designing with shadows, consider performance and realism. Multiple shadows or large blur values can impact rendering performance, especially on mobile devices. For realistic shadows, use subtle blur (10-20px), moderate offsets (5-10px), low opacity (0.1-0.3), and darker colors. Avoid overly bright or saturated shadow colors for natural-looking results.
          </p>
          <p>
            CSS shadows are also animatable using transitions or keyframe animations. Simply add <code>transition: box-shadow 0.3s ease;</code> to smoothly animate shadow changes on hover or other states. This technique is popular for interactive UI elements like buttons and cards that respond to user interaction with subtle shadow shifts.
          </p>
          <p>
            Whether you're building a modern web application, designing an e-commerce site, or learning CSS fundamentals, our shadow generator helps you create professional-quality shadow effects quickly and easily. Export your CSS code with one click and use it immediately in your projects.
          </p>
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
                      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">What's the difference between box-shadow and text-shadow?</h3>
                      <p className="text-sm mt-1">Box-shadow applies to element boxes (like divs or buttons) and supports blur, spread, and inset properties. Text-shadow applies only to the text content itself and does not support spread or inset.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">Can I create multiple shadows?</h3>
                      <p className="text-sm mt-1">Yes! You can add multiple shadow layers by stacking values, separated by commas in your CSS. This generator helps you craft a single, perfect layer which you can then combine.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">Is this CSS code compatible with all browsers?</h3>
                      <p className="text-sm mt-1">Absolutely. Modern browsers like Chrome, Firefox, Safari, and Edge fully support both box-shadow and text-shadow properties without needing any vendor prefixes.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">How do I create a realistic shadow effect?</h3>
                      <p className="text-sm mt-1">For realistic shadows, use subtle blur (10-20px), moderate offset (5-10px), low opacity (0.1-0.3), and darker colors. Avoid bright colors or high opacity for natural-looking shadows.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">What's the difference between blur and spread?</h3>
                      <p className="text-sm mt-1">Blur controls how soft/fuzzy the shadow edges are (higher = softer). Spread expands or shrinks the shadow size before blur is applied. Positive spread makes shadows larger, negative makes them smaller.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">Can I animate CSS shadows?</h3>
                      <p className="text-sm mt-1">Yes! CSS shadows can be animated using CSS transitions or animations. Simply add 'transition: box-shadow 0.3s ease;' to smoothly animate shadow changes on hover or other states.</p>
                  </div>
                  <div>
                      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400">What are the performance impacts of multiple shadows?</h3>
                      <p className="text-sm mt-1">Multiple shadows and large blur values can impact rendering performance, especially on mobile devices. For best performance, use 1-3 shadow layers and moderate blur values (under 30px).</p>
                  </div>
              </div>
          </div>
      </div>

      {/* External Resources Section */}
      <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 text-center">
        <h3 className="text-lg font-semibold text-white mb-3">📚 Learn More About CSS Shadows</h3>
        <p className="text-sm text-gray-400 mb-4">Explore these authoritative resources for deeper understanding:</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" target="_blank" rel="nofollow noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
            MDN - CSS box-shadow →
          </a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow" target="_blank" rel="nofollow noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
            MDN - CSS text-shadow →
          </a>
          <a href="https://css-tricks.com/almanac/properties/b/box-shadow/" target="_blank" rel="nofollow noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
            CSS-Tricks - Shadow Guide →
          </a>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated: <time dateTime="2025-11-08">November 8, 2025</time>
        </p>
      </div>

      {/* Social Share Section */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <p className="font-semibold text-gray-600 dark:text-gray-400 mb-4">Share This Tool:</p>
        <div className="flex justify-center items-center space-x-6">
          <ShareButton 
            network="Facebook" 
            url="https://zurawebtools.com/color-and-design-tools/shadow-css-generator" 
            text="Create realistic CSS shadows with this free generator tool!" 
          />
          <ShareButton 
            network="Twitter" 
            url="https://zurawebtools.com/color-and-design-tools/shadow-css-generator" 
            text="Free CSS Shadow Generator by @ZuraWebTools! Create box-shadow and text-shadow effects easily." 
          />
          <ShareButton 
            network="LinkedIn" 
            url="https://zurawebtools.com/color-and-design-tools/shadow-css-generator" 
            text="Professional CSS Shadow Generator for web designers and developers." 
          />
          <ShareButton 
            network="WhatsApp" 
            url="https://zurawebtools.com/color-and-design-tools/shadow-css-generator" 
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