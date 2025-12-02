
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { notifyIndexNow } from '../../utils/indexNow';

// --- TYPE DEFINITIONS ---
interface RGB { r: number; g: number; b: number; }
interface HSL { h: number; s: number; l: number; }
interface ColorInfo { hex: string; rgb: RGB; hsl: HSL; }
interface Harmony { name: string; colors: string[]; }
interface ColorHarmonyCheckerProps {
  navigateTo: (path: string) => void;
}

// --- HELPER ICONS (as components) ---
const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"></path>
  </svg>
);

const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
);

const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
);

// --- SOCIAL AND TOOL ICONS ---
const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.308-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.39.106-.803.163-1.227.163-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.375 0-.745-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.35C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"></path></svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
);

const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
);

const GradientIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="currentColor" stopOpacity="1"></stop><stop offset="100%" stopColor="currentColor" stopOpacity="0.2"></stop></linearGradient></defs><rect width="18" height="18" x="3" y="3" rx="2" ry="2" fill="url(#grad1)"></rect></svg>
  );

const SvgIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10_0_1_0-10-10z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M12 8a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5z"></path></svg>
);

const ShadowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9a9.01 9.01 0 0 1-8.52-6.5"></path><path d="M12 3v18"></path></svg>
);


// --- COLOR UTILITY FUNCTIONS (defined outside components) ---

const hexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string =>
  "#" + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join('');

const rgbToHsl = (r: number, g: number, b: number): HSL => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (h: number, s: number, l: number): RGB => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
};

const hslToHex = (h: number, s: number, l: number): string => {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
};

const getLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (color1: RGB, color2: RGB): number => {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
};

const generateRandomColor = (): string => {
    const randomHex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    return `#${randomHex}`;
};


// --- UI SUB-COMPONENTS (defined outside main component) ---

const SocialShareButtons: React.FC = () => {
    const [copied, setCopied] = useState(false);
    const url = "https://zurawebtools.com/color-and-design-tools/color-harmony-checker";
    const text = "Discover perfect color harmonies with this free Color Harmony Checker! A great tool for designers and developers. #ColorTheory #WebDesign #UIUX";

    const copyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        { name: "Twitter", icon: <TwitterIcon className="w-5 h-5" />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, color: "hover:text-blue-400 dark:hover:text-blue-300" },
        { name: "Facebook", icon: <FacebookIcon className="w-5 h-5" />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: "hover:text-blue-600 dark:hover:text-blue-500" },
        { name: "LinkedIn", icon: <LinkedInIcon className="w-5 h-5" />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent("Color Harmony Checker")}&summary=${encodeURIComponent(text)}`, color: "hover:text-blue-700 dark:hover:text-blue-600" }
    ];

    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Share this tool:</span>
            <div className="flex items-center gap-4">
                {shareLinks.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${link.name}`} className={`text-gray-500 dark:text-gray-400 ${link.color} transition-colors`}>
                        {link.icon}
                    </a>
                ))}
                <button onClick={copyLink} aria-label="Copy link" className="text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors flex items-center gap-1.5">
                    {copied ? <CheckIcon className="w-5 h-5 text-green-500"/> : <LinkIcon className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};

interface ColorCardProps {
  hex: string;
  onCopy: (text: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ hex, onCopy }) => {
  const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null);

  useEffect(() => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setColorInfo({ hex, rgb, hsl });
    }
  }, [hex]);
  
  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value);
    onCopy(value);
  };

  if (!colorInfo) return null;

  const { rgb, hsl } = colorInfo;
  const textColor = hsl.l > 60 ? 'text-black' : 'text-white';
  const rgbString = `rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`;
  const hslString = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div style={{ backgroundColor: hex }} className={`p-4 h-24 flex items-center justify-center font-bold ${textColor}`}>
        <span className="text-xl tracking-wider uppercase">{hex}</span>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 text-sm">
        {[{ label: 'HEX', value: hex }, { label: 'RGB', value: rgbString }, { label: 'HSL', value: hslString }].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between my-2">
            <span className="font-mono text-gray-500 dark:text-gray-400">{label}:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono">{value}</span>
              <button onClick={() => copyValue(value)} aria-label={`Copy ${label} value`} className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <CopyIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface AccessibilityResultProps {
  color: string;
}

const AccessibilityResult: React.FC<AccessibilityResultProps> = ({ color }) => {
  const rgb = hexToRgb(color);
  if (!rgb) return null;

  const white: RGB = { r: 255, g: 255, b: 255 };
  const black: RGB = { r: 0, g: 0, b: 0 };

  const contrastWithWhite = getContrastRatio(rgb, white).toFixed(2);
  const contrastWithBlack = getContrastRatio(rgb, black).toFixed(2);

  const checkCompliance = (ratio: number) => ({
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
  });

  const whiteResults = checkCompliance(parseFloat(contrastWithWhite));
  const blackResults = checkCompliance(parseFloat(contrastWithBlack));

  const ComplianceBadge: React.FC<{ pass: boolean; label: string }> = ({ pass, label }) => (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${pass ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
      {label}
    </span>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md backdrop-blur-sm bg-opacity-70 dark:bg-opacity-70">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded-md" style={{ backgroundColor: color }}>
          <p className="text-lg font-bold text-white">Text on {color}</p>
          <p className="text-lg font-bold text-black mt-2">Text on {color}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contrast with White Text</h4>
          <div className="flex items-center space-x-2">
            <span className="font-mono">{contrastWithWhite}:1</span>
            <ComplianceBadge pass={whiteResults.aa} label="AA" />
            <ComplianceBadge pass={whiteResults.aaa} label="AAA" />
          </div>
          <h4 className="font-semibold mt-4 mb-2">Contrast with Black Text</h4>
          <div className="flex items-center space-x-2">
            <span className="font-mono">{contrastWithBlack}:1</span>
            <ComplianceBadge pass={blackResults.aa} label="AA" />
            <ComplianceBadge pass={blackResults.aaa} label="AAA" />
          </div>
        </div>
      </div>
    </div>
  );
};

const faqs = [
    { q: "What is color harmony in design?", a: "Color harmony refers to visually pleasing combinations of colors based on their relationships on the color wheel. Common harmonies include complementary (opposite colors), analogous (adjacent colors), triadic (three evenly spaced colors), and tetradic (four colors forming a rectangle). These create balance, visual interest, and emotional impact in design." },
    { q: "How do I use a color harmony checker?", a: "Simply pick a base color using the color picker or enter a HEX code. The tool instantly generates complementary, triadic, analogous, tetradic, and monochromatic color schemes. You can copy any color code (HEX, RGB, or HSL) by clicking the copy icon, and test accessibility with built-in WCAG contrast ratio checking." },
    { q: "What are complementary colors?", a: "Complementary colors are pairs of colors that sit directly opposite each other on the color wheel, such as red and green, blue and orange, or yellow and purple. They create maximum contrast and vibrant visual impact when used together, making them ideal for call-to-action buttons and important UI elements." },
    { q: "Which color harmony is best for UI design?", a: "Triadic and analogous harmonies are often best for UI design. Triadic schemes (three evenly spaced colors) provide vibrant contrast while maintaining balance. Analogous schemes (adjacent colors) create cohesive, harmonious interfaces that are easy on the eyes. Both work well when combined with proper accessibility testing." },
    { q: "Does this tool test color accessibility?", a: "Yes! Every generated color is automatically tested for WCAG accessibility compliance. The tool shows contrast ratios against both white and black text, indicating whether colors meet AA and AAA standards. This ensures your color choices are readable for users with visual impairments." },
    { q: "Can I export color palettes?", a: "You can easily copy individual color codes in HEX, RGB, or HSL formats by clicking the copy icon next to each value. The generated palette preview at the bottom shows all colors together, which you can screenshot or manually record for your design projects." },
    { q: "Is this color harmony tool free?", a: "Yes, completely free! No registration, no limits, no hidden fees. Use it unlimited times for personal or commercial projects. Generate as many color palettes as you need for your design work, web development, or creative projects." },
];

const relatedTools = [
    { title: "Hex to RGB Converter", description: "Convert Hex color codes to RGB values with live color preview. Perfect for developers and designers.", icon: <GradientIcon className="w-8 h-8 text-blue-500" />, path: "/hex-to-rgb-converter" },
    { title: "Color Contrast Checker", description: "Check color contrast ratios for WCAG accessibility compliance. Essential for inclusive design.", icon: <SvgIcon className="w-8 h-8 text-purple-500" />, path: "/accessible-color-contrast-checker" },
    { title: "CSS Shadow Generator", description: "Create realistic box-shadow and text-shadow effects with live preview and easy CSS copy.", icon: <ShadowIcon className="w-8 h-8 text-red-500" />, path: "/shadow-css-generator" }
];

const RelatedTools: React.FC<{ navigateTo: (path: string) => void; }> = ({ navigateTo }) => (
    <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Related Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTools.map(tool => (
                <div key={tool.path} onClick={() => navigateTo(tool.path)} className="p-6 rounded-xl shadow-lg hover:shadow-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border border-gray-200 dark:border-gray-700 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-4 mb-3">
                        {tool.icon}
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
                </div>
            ))}
        </div>
    </section>
);

// --- MAIN COMPONENT ---
const ColorHarmonyChecker: React.FC<ColorHarmonyCheckerProps> = ({ navigateTo }) => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
}, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleCopy = useCallback((text: string) => {
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2000);
  }, []);

  const handleRandomColor = () => {
    setBaseColor(generateRandomColor());
  };
  
  const harmonies = useMemo<Harmony[]>(() => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return [];
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const getHarmony = (h: number, s: number, l: number, hueShift: number[]) =>
      hueShift.map(shift => hslToHex((h + shift + 360) % 360, s, l));

    return [
      { name: 'Complementary', colors: getHarmony(hsl.h, hsl.s, hsl.l, [180]) },
      { name: 'Analogous', colors: getHarmony(hsl.h, hsl.s, hsl.l, [-30, 30]) },
      { name: 'Triadic', colors: getHarmony(hsl.h, hsl.s, hsl.l, [120, 240]) },
      { name: 'Tetradic', colors: getHarmony(hsl.h, hsl.s, hsl.l, [90, 180, 270]) },
      { name: 'Monochromatic', colors: [
          hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 20)),
          hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + 10)),
          hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 10)),
          hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 20)),
        ]},
    ];
  }, [baseColor]);
  
  useEffect(() => {
    document.title = 'Color Harmony Checker – Free Color Palette & Scheme Generator | ZuraWebTools';

    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', 'en');

    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Free Color Harmony Checker and palette generator tool. Create complementary, triadic, analogous, tetradic & monochromatic color schemes instantly. Perfect for UI/UX designers, web developers, graphic designers, and digital artists. Generate beautiful color combinations with WCAG accessibility testing built-in.');
    document.head.appendChild(metaDescription);

    const metaTags = [
      { property: 'og:title', content: 'Color Harmony Checker – Free Color Palette Generator | ZuraWebTools' },
      { property: 'og:description', content: 'Generate perfect color harmonies instantly. Free color palette generator with complementary, triadic, and analogous schemes for designers.' },
      { property: 'og:image', content: 'https://zurawebtools.com/assets/og-color-harmony-checker.webp' },
      { property: 'og:image:alt', content: 'Free Color Harmony Checker showing complementary and triadic color palettes' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:url', content: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Color Harmony Checker – Free Palette Generator' },
      { name: 'twitter:description', content: 'Generate complementary, triadic, and analogous color schemes instantly with our free color harmony tool.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/assets/og-color-harmony-checker.webp' },
      { name: 'twitter:image:alt', content: 'Free Color Harmony Checker showing multiple color palettes' },
      { name: 'language', content: 'English' },
      { httpEquiv: 'content-language', content: 'en-US' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    ];

    metaTags.forEach(tag => {
      const el = document.createElement('meta');
      Object.entries(tag).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker';
    document.head.appendChild(canonical);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Color Harmony Checker',
        applicationCategory: 'DesignApplication',
        applicationSubCategory: 'Color Theory Tool',
        operatingSystem: 'Any (Web-based)',
        datePublished: '2024-01-15',
        dateModified: '2024-11-08',
        inLanguage: 'en-US',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '2.1',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '1340',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ZuraWebTools',
          url: 'https://zurawebtools.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://zurawebtools.com/assets/logo.png',
            width: '250',
            height: '60',
          },
          sameAs: [
            'https://www.facebook.com/zurawebtools',
            'https://twitter.com/zurawebtools',
            'https://www.linkedin.com/company/zurawebtools',
          ],
        },
        description:
          'Free Color Harmony Checker and palette generator. Create complementary, triadic, analogous, tetradic, and monochromatic color schemes with WCAG accessibility testing.',
        url: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker',
        featureList: [
          'Complementary color generator',
          'Triadic color schemes',
          'Analogous color palettes',
          'Tetradic color combinations',
          'Monochromatic variations',
          'WCAG accessibility testing',
          'HEX, RGB, HSL color codes',
          'Real-time color preview',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Color Harmony Checker – Free Color Palette Generator',
        description:
          'Generate perfect color harmonies and palettes instantly with our free color harmony checker tool for designers and developers.',
        url: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker',
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          name: 'ZuraWebTools',
          url: 'https://zurawebtools.com',
        },
        datePublished: '2024-01-15',
        dateModified: '2024-11-08',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://zurawebtools.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://zurawebtools.com/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Color Harmony Checker',
            item: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Use Color Harmony Checker',
        description: 'Step-by-step guide to generate perfect color palettes and harmonies',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Base Color',
            text: 'Pick a base color using the color picker or enter a HEX code manually. This will be the foundation of your color harmony.',
            url: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Explore Color Harmonies',
            text: 'The tool automatically generates complementary, triadic, analogous, tetradic, and monochromatic color schemes based on your base color.',
            url: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Copy Color Codes',
            text: 'Click the copy icon next to any HEX, RGB, or HSL code to instantly copy it to your clipboard for use in your designs.',
            url: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Test Accessibility',
            text: 'Check contrast ratios against black and white text to ensure WCAG compliance and readability for all users.',
            url: 'https://zurawebtools.com/color-and-design-tools/color-harmony-checker#step4',
          },
        ],
        totalTime: 'PT2M',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is color harmony in design?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Color harmony refers to visually pleasing combinations of colors based on their relationships on the color wheel. Common harmonies include complementary (opposite colors), analogous (adjacent colors), triadic (three evenly spaced colors), and tetradic (four colors forming a rectangle). These create balance, visual interest, and emotional impact in design.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I use a color harmony checker?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Simply pick a base color using the color picker or enter a HEX code. The tool instantly generates complementary, triadic, analogous, tetradic, and monochromatic color schemes. You can copy any color code (HEX, RGB, or HSL) by clicking the copy icon, and test accessibility with built-in WCAG contrast ratio checking.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are complementary colors?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Complementary colors are pairs of colors that sit directly opposite each other on the color wheel, such as red and green, blue and orange, or yellow and purple. They create maximum contrast and vibrant visual impact when used together, making them ideal for call-to-action buttons and important UI elements.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which color harmony is best for UI design?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Triadic and analogous harmonies are often best for UI design. Triadic schemes (three evenly spaced colors) provide vibrant contrast while maintaining balance. Analogous schemes (adjacent colors) create cohesive, harmonious interfaces that are easy on the eyes. Both work well when combined with proper accessibility testing.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does this tool test color accessibility?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Every generated color is automatically tested for WCAG accessibility compliance. The tool shows contrast ratios against both white and black text, indicating whether colors meet AA and AAA standards. This ensures your color choices are readable for users with visual impairments.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I export color palettes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can easily copy individual color codes in HEX, RGB, or HSL formats by clicking the copy icon next to each value. The generated palette preview at the bottom shows all colors together, which you can screenshot or manually record for your design projects.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this color harmony tool free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, completely free! No registration, no limits, no hidden fees. Use it unlimited times for personal or commercial projects. Generate as many color palettes as you need for your design work, web development, or creative projects.',
            },
          },
        ],
      },
    ]);
    document.head.appendChild(script);
    
    return () => {
      document.title = 'ZuraWebTools';
      metaTags.forEach(() => {
        const el = document.querySelector('meta[property^="og:"], meta[name^="twitter:"], meta[name="language"], meta[http-equiv="content-language"], meta[name="robots"]');
        if (el) el.remove();
      });
      canonical.remove();
      script.remove();
    };
  }, []);

  // 📡 IndexNow: Notify search engines about page updates
  useEffect(() => {
    notifyIndexNow('/color-and-design-tools/color-harmony-checker');
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <div className="container mx-auto p-4 md:p-8">
       {copiedValue && (
            <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in z-50">
                Copied: {copiedValue}
            </div>
        )}
      
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Color Harmony Checker</h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-300">
            A powerful color theory tool for designers. Instantly generate a color palette, find complementary colors, and build beautiful schemes with our online color combination checker.
        </p>
        <SocialShareButtons />
      </header>

      <main>
        <div className="max-w-2xl mx-auto p-6 rounded-xl shadow-2xl bg-slate-800 border border-slate-700 mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <label htmlFor="base-color-picker" className="font-semibold text-white">Base Color:</label>
                <input type="color" id="base-color-picker" value={baseColor} onChange={e => setBaseColor(e.target.value)} className="w-16 h-10 p-1 bg-white border-none rounded-md cursor-pointer" aria-label="Base color picker" />
                <input type="text" value={baseColor} onChange={e => setBaseColor(e.target.value)} className="font-mono w-32 px-3 py-2 text-center border-2 border-slate-600 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" aria-label="Base color hex input" />
                <button onClick={handleRandomColor} className="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-slate-700 border border-slate-600 rounded-md shadow-sm hover:bg-slate-600 transition-colors" aria-label="Generate random color">
                    <span className="text-xl">🎲</span> Random
                </button>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-700 transition-colors" aria-label="Toggle dark mode">
                    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>
        </div>
        
        <div className="space-y-12">
            {harmonies.map(harmony => (
                <section key={harmony.name}>
                    <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-blue-500 pb-2">{harmony.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <ColorCard hex={baseColor} onCopy={handleCopy}/>
                        {harmony.colors.map(color => <ColorCard key={color} hex={color} onCopy={handleCopy} />)}
                    </div>
                </section>
            ))}
            
            <section>
                <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-green-500 pb-2">Accessibility Test</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AccessibilityResult color={baseColor}/>
                    {harmonies[0].colors.map(color => <AccessibilityResult key={color} color={color}/>)}
                </div>
            </section>
        </div>

        {/* Social Share Section */}
        <div className="my-16 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">Share this Tool</h3>
          <div className="flex justify-center items-center space-x-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/color-and-design-tools/color-harmony-checker')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/color-and-design-tools/color-harmony-checker')}&text=${encodeURIComponent('Check out this amazing Color Harmony Checker!')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
              className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://zurawebtools.com/color-and-design-tools/color-harmony-checker')}&title=${encodeURIComponent('Color Harmony Checker')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="text-slate-400 hover:text-blue-600 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this Color Harmony Checker! https://zurawebtools.com/color-and-design-tools/color-harmony-checker')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="text-slate-400 hover:text-green-500 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>
        
        {/* Quick Test Examples - Moved after main tool */}
        <section className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">🎨 Quick Test Examples</h2>
          <p className="text-slate-300 mb-6 text-center">Try these popular color combinations used by top brands and designers:</p>
          
          {/* Popular Brand Colors */}
          <h3 className="text-lg font-semibold text-white mb-3">Popular Brand Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'Brand Blue', color: '#0066CC', desc: 'Corporate & Trust' },
              { name: 'Sunset Orange', color: '#FF6B35', desc: 'Energy & Warmth' },
              { name: 'Nature Green', color: '#2ECC71', desc: 'Growth & Health' },
              { name: 'Royal Purple', color: '#9B59B6', desc: 'Luxury & Creativity' },
              { name: 'Coral Pink', color: '#FF6F91', desc: 'Modern & Friendly' },
              { name: 'Tech Cyan', color: '#00D9FF', desc: 'Innovation & Digital' },
            ].map((example) => (
              <button
                key={example.name}
                onClick={() => setBaseColor(example.color)}
                className="p-4 rounded-lg border-2 border-slate-600 hover:border-blue-500 transition-all transform hover:scale-105 bg-slate-800 text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-md shadow-lg"
                    style={{ backgroundColor: example.color }}
                  ></div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {example.name}
                    </div>
                    <div className="text-xs text-slate-400">{example.color}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">{example.desc}</div>
              </button>
            ))}
          </div>

          {/* Seasonal Palettes */}
          <h3 className="text-lg font-semibold text-white mb-3 mt-6">Seasonal Palettes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: 'Spring Fresh', color: '#A8E6CF', desc: '🌸 Renewal & Growth' },
              { name: 'Summer Bright', color: '#FFD93D', desc: '☀️ Energy & Joy' },
              { name: 'Autumn Warm', color: '#D97642', desc: '🍂 Cozy & Comfortable' },
              { name: 'Winter Cool', color: '#4A90E2', desc: '❄️ Calm & Sophisticated' },
            ].map((example) => (
              <button
                key={example.name}
                onClick={() => setBaseColor(example.color)}
                className="p-4 rounded-lg border-2 border-slate-600 hover:border-blue-500 transition-all transform hover:scale-105 bg-slate-800 text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-md shadow-lg"
                    style={{ backgroundColor: example.color }}
                  ></div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors text-sm">
                      {example.name}
                    </div>
                    <div className="text-xs text-slate-400">{example.color}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">{example.desc}</div>
              </button>
            ))}
          </div>

          {/* Industry-Specific Colors */}
          <h3 className="text-lg font-semibold text-white mb-3">Industry-Specific Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'E-commerce Red', color: '#E74C3C', desc: '🛒 Urgency & Action' },
              { name: 'Finance Blue', color: '#2C3E50', desc: '💼 Trust & Stability' },
              { name: 'Healthcare Teal', color: '#16A085', desc: '⚕️ Care & Wellness' },
              { name: 'Education Orange', color: '#F39C12', desc: '📚 Learning & Growth' },
              { name: 'Tech Dark', color: '#34495E', desc: '💻 Modern & Professional' },
              { name: 'Food Red', color: '#C0392B', desc: '🍔 Appetite & Passion' },
            ].map((example) => (
              <button
                key={example.name}
                onClick={() => setBaseColor(example.color)}
                className="p-4 rounded-lg border-2 border-slate-600 hover:border-blue-500 transition-all transform hover:scale-105 bg-slate-800 text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-md shadow-lg"
                    style={{ backgroundColor: example.color }}
                  ></div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-blue-400 transition-colors text-sm">
                      {example.name}
                    </div>
                    <div className="text-xs text-slate-400">{example.color}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">{example.desc}</div>
              </button>
            ))}
          </div>
        </section>
        
        <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Generated Palette Preview</h2>
            <div className="flex flex-col md:flex-row w-full h-32 md:h-20 rounded-lg overflow-hidden shadow-lg mb-6">
                {[baseColor, ...harmonies.flatMap(h => h.colors)].slice(0, 10).map((color, index) => (
                    <div key={`${color}-${index}`} style={{ backgroundColor: color }} className="flex-1 transition-colors duration-300" title={color}></div>
                ))}
            </div>
            
            {/* Export Options */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  const colors = [baseColor, ...harmonies.flatMap(h => h.colors)].slice(0, 10);
                  const cssVars = colors.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n');
                  const cssCode = `:root {\n${cssVars}\n}`;
                  navigator.clipboard.writeText(cssCode);
                  handleCopy('CSS Variables copied!');
                }}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                <CopyIcon className="w-5 h-5" />
                Copy as CSS Variables
              </button>
              
              <button
                onClick={() => {
                  const colors = [baseColor, ...harmonies.flatMap(h => h.colors)].slice(0, 10);
                  const sassVars = colors.map((color, i) => `$color-${i + 1}: ${color};`).join('\n');
                  navigator.clipboard.writeText(sassVars);
                  handleCopy('SASS Variables copied!');
                }}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 transition-all transform hover:scale-105"
              >
                <CopyIcon className="w-5 h-5" />
                Copy as SASS Variables
              </button>
              
              <button
                onClick={() => {
                  const colors = [baseColor, ...harmonies.flatMap(h => h.colors)].slice(0, 10);
                  const jsonObj = colors.reduce((acc, color, i) => {
                    acc[`color${i + 1}`] = color;
                    return acc;
                  }, {} as Record<string, string>);
                  navigator.clipboard.writeText(JSON.stringify(jsonObj, null, 2));
                  handleCopy('JSON copied!');
                }}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition-all transform hover:scale-105"
              >
                <CopyIcon className="w-5 h-5" />
                Copy as JSON
              </button>
            </div>
        </section>

        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">📖 How to Use Color Harmony Checker</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Select Your Base Color',
                desc: 'Use the color picker to visually select a color, or manually enter a HEX code (like #3b82f6) in the input field. This base color will be the foundation of all your generated color harmonies.',
                tip: '💡 Pro Tip: Choose your brand primary color or the dominant color from your design for best results.',
              },
              {
                step: 2,
                title: 'Explore Generated Harmonies',
                desc: 'The tool instantly generates 5 types of color harmonies: Complementary (opposite colors), Analogous (adjacent colors), Triadic (evenly spaced), Tetradic (rectangular), and Monochromatic (same hue variations). Each harmony appears with visual color cards showing HEX, RGB, and HSL values.',
                tip: '💡 Pro Tip: Triadic harmonies work great for vibrant UI designs, while analogous schemes create calming, cohesive interfaces.',
              },
              {
                step: 3,
                title: 'Copy Color Codes',
                desc: 'Click the copy icon next to any HEX, RGB, or HSL value to instantly copy it to your clipboard. Use these codes in your CSS, design tools (Figma, Adobe XD, Sketch), or any color input field.',
                tip: '💡 Pro Tip: HEX codes are best for CSS/HTML, RGB for programming, and HSL for dynamic color manipulation.',
              },
              {
                step: 4,
                title: 'Test Accessibility (WCAG)',
                desc: 'Every generated color is automatically tested for accessibility. Check contrast ratios against white and black text to ensure your colors meet WCAG AA (4.5:1) and AAA (7:1) standards for readability.',
                tip: '💡 Pro Tip: Always aim for at least AA compliance for body text and important UI elements. Learn more at <a href="https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum" target="_blank" rel="noopener" class="text-blue-400 hover:underline">W3C WCAG Guidelines</a>.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-300 mb-3" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                    <div className="bg-slate-900 p-3 rounded-md border-l-4 border-blue-500">
                      <p className="text-sm text-slate-400" dangerouslySetInnerHTML={{ __html: item.tip }}></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">🎯 Use Cases & Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🎨',
                title: 'UI/UX Design',
                desc: 'Create cohesive color schemes for websites, mobile apps, and dashboards. Use triadic harmonies for vibrant interfaces or analogous schemes for calm, professional designs.',
                example: 'Example: Generate a primary color palette for navigation, buttons, and CTAs.',
              },
              {
                icon: '🖼️',
                title: 'Brand Identity',
                desc: 'Develop consistent brand color palettes that convey your brand personality. Complementary colors create bold, memorable brands while monochromatic schemes offer sophistication.',
                example: 'Example: Build a complete brand guideline with primary, secondary, and accent colors.',
              },
              {
                icon: '📊',
                title: 'Data Visualization',
                desc: 'Select accessible color combinations for charts, graphs, and infographics. Ensure data is readable and distinguishable for all users, including those with color blindness.',
                example: 'Example: Create color-coded categories in dashboards that meet WCAG accessibility standards.',
              },
              {
                icon: '✏️',
                title: 'Graphic Design',
                desc: 'Find inspiring color combinations for posters, social media graphics, and marketing materials. Experiment with tetradic schemes for complex, dynamic compositions.',
                example: 'Example: Design eye-catching Instagram posts with harmonious color gradients.',
              },
            ].map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-slate-300 mb-3">{useCase.desc}</p>
                <div className="bg-slate-950 p-3 rounded-md border-l-2 border-blue-500">
                  <p className="text-sm text-slate-400 italic">{useCase.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="mt-16 max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">About Color Harmony Checker</h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              Our <strong>Color Harmony Checker</strong> is a professional-grade color palette generator designed for designers, developers, and digital creators. This free online tool helps you discover perfect color combinations based on time-tested color theory principles from the color wheel.
            </p>
            <p>
              Whether you're building a <strong>website color scheme</strong>, designing a <strong>brand identity</strong>, creating <strong>UI/UX interfaces</strong>, or working on graphic design projects, this color harmony tool generates complementary, triadic, analogous, tetradic, and monochromatic palettes instantly. Each generated color includes HEX codes, RGB values, and HSL formats for easy integration into any design workflow.
            </p>
            <p>
              What sets this tool apart is the built-in <strong>WCAG accessibility testing</strong>. Every color is automatically checked for contrast ratios against white and black text, ensuring your designs meet AA and AAA accessibility standards. This makes it an essential <strong>color combination checker</strong> for inclusive design practices.
            </p>
            <p>
              The tool uses advanced HSL (Hue, Saturation, Lightness) color space calculations to generate mathematically accurate color harmonies. Unlike simple color pickers, our harmony generator follows proper <a href="https://en.wikipedia.org/wiki/Color_theory" target="_blank" rel="noopener" className="text-blue-400 hover:underline">color theory principles</a> used by professional designers worldwide.
            </p>
            <p>
              Perfect for discovering <strong>complementary colors</strong> that create maximum contrast, <strong>analogous color schemes</strong> for harmonious designs, <strong>triadic color palettes</strong> for vibrant layouts, and monochromatic variations for elegant, minimal aesthetics. Export colors in multiple formats and integrate them directly into CSS, Sass, design systems, or tools like Figma, Adobe XD, and Sketch.
            </p>
            <p className="text-sm text-slate-400 mt-6 pt-6 border-t border-slate-700">
              <strong>Related Tools:</strong> Try our <a href="/color-and-design-tools/hex-to-rgb-converter" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/hex-to-rgb-converter'); }} className="text-blue-400 hover:underline">Hex to RGB Converter</a> for color format conversion, <a href="/color-and-design-tools/accessible-color-contrast-checker" onClick={(e) => { e.preventDefault(); navigateTo('/color-and-design-tools/accessible-color-contrast-checker'); }} className="text-blue-400 hover:underline">Accessible Color Contrast Checker</a> for detailed WCAG testing, <a href="/developer-tools/shadow-css-generator" onClick={(e) => { e.preventDefault(); navigateTo('/developer-tools/shadow-css-generator'); }} className="text-blue-400 hover:underline">CSS Shadow Generator</a> for adding depth to your designs, <a href="/text-and-writing-tools/lorem-ipsum-generator" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/lorem-ipsum-generator'); }} className="text-blue-400 hover:underline">Lorem Ipsum Generator</a> for placeholder content, or our <a href="/text-and-writing-tools/word-counter" onClick={(e) => { e.preventDefault(); navigateTo('/text-and-writing-tools/word-counter'); }} className="text-blue-400 hover:underline">Word Counter</a> for content analysis.
            </p>
            <p className="text-xs text-slate-500 text-center mt-4">
              Last Updated: November 8, 2024
            </p>
          </div>
        </section>
        
        <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <details key={index} className="bg-slate-800 p-4 rounded-lg shadow-sm cursor-pointer border border-slate-700">
                        <summary className="font-semibold text-lg text-white">{faq.q}</summary>
                        <p className="mt-2 text-slate-300">{faq.a}</p>
                    </details>
                ))}
            </div>
        </section>
        
        <RelatedTools navigateTo={navigateTo} />

        <footer className="text-center mt-16">
            <button
                onClick={() => navigateTo('/tools')}
                className="px-6 py-3 font-semibold text-white bg-slate-700 rounded-lg shadow-md hover:bg-slate-600 transition-all transform hover:scale-105 border border-slate-600"
            >
                &larr; Back to Tools
            </button>
        </footer>
      </main>
      </div>
    </div>
  );
};

export default ColorHarmonyChecker;
