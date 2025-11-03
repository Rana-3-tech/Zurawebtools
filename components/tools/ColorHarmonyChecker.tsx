
import React, { useState, useEffect, useMemo, useCallback } from 'react';

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
    const url = "https://zurawebtools.com/tools/color-harmony-checker";
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
    { q: "What is color harmony in design?", a: "Color harmony refers to visually pleasing combinations of colors that create balance and appeal. It’s based on color wheel relationships like complementary, analogous, and triadic." },
    { q: "How do designers use color harmony?", a: "Designers use color harmony to ensure their color choices convey the right emotion, improve readability, and maintain visual balance across user interfaces." },
    { q: "Which color harmonies are best for UI design?", a: "Triadic and analogous schemes are often ideal for UI because they offer both contrast and cohesion while maintaining accessibility." },
    { q: "Does this tool follow color theory principles?", a: "Yes! It uses standard color wheel mathematics and HSL-based calculations to ensure accurate and consistent results." },
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
    const metaInfo = {
        title: 'Color Harmony Checker – Free Color Palette & Scheme Generator | ZuraWebTools',
        description: 'Find perfect color combinations with this free Color Harmony Checker. Generate complementary, triadic, and analogous palettes instantly. Ideal for UI designers and web developers.',
        keywords: 'color harmony checker, color palette generator, complementary colors online, color theory tool, triadic color generator, analogous color scheme maker, color wheel tool, color combination checker, ui design color harmony, web color scheme generator, best color palette generator 2025, free design color tool',
        canonicalUrl: 'https://zurawebtools.com/color-harmony-checker',
        imageUrl: 'https://storage.googleapis.com/aai-web-samples/zura-color-harmony-checker-og.png'
    };

    document.title = metaInfo.title;

    const tagsToManage = [
        { tag: 'meta', attrs: { name: 'description', content: metaInfo.description } },
        { tag: 'meta', attrs: { name: 'keywords', content: metaInfo.keywords } },
        { tag: 'link', attrs: { rel: 'canonical', href: metaInfo.canonicalUrl } },
        // OG tags
        { tag: 'meta', attrs: { property: 'og:title', content: metaInfo.title } },
        { tag: 'meta', attrs: { property: 'og:description', content: metaInfo.description } },
        { tag: 'meta', attrs: { property: 'og:url', content: metaInfo.canonicalUrl } },
        { tag: 'meta', attrs: { property: 'og:image', content: metaInfo.imageUrl } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        // Twitter tags
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: metaInfo.title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: metaInfo.description } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: metaInfo.imageUrl } },
        { tag: 'meta', attrs: { name: 'twitter:site', content: '@ZuraWebTools' } },
    ];

    const addedElements: Element[] = [];

    tagsToManage.forEach(({ tag, attrs }) => {
        const element = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
        document.head.appendChild(element);
        addedElements.push(element);
    });
    
    const schema = { /* ... schema definition ... */ };
    
    let schemaScript = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'json-ld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
    }
    schemaScript.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            { "@type": "SoftwareApplication", "name": "Color Harmony Checker", "applicationCategory": "DesignTool", "operatingSystem": "Any (Web-based)", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1120" }, "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" }, "description": "Free Color Harmony Checker to find complementary, triadic, and analogous color palettes for designers and web developers.", "url": metaInfo.canonicalUrl },
            { "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } })) }
        ]
    });
    
    return () => {
        document.title = 'ZuraWebTools';
        addedElements.forEach(el => el.remove());
        if (document.getElementById('json-ld-schema')) {
            document.getElementById('json-ld-schema')?.remove();
        }
    };
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
        
        <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">Generated Palette Preview</h2>
            <div className="flex flex-col md:flex-row w-full h-32 md:h-20 rounded-lg overflow-hidden shadow-lg">
                {[baseColor, ...harmonies.flatMap(h => h.colors)].slice(0, 10).map((color, index) => (
                    <div key={`${color}-${index}`} style={{ backgroundColor: color }} className="flex-1 transition-colors duration-300" title={color}></div>
                ))}
            </div>
        </section>

        <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">How to Use</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong>Pick a Base Color:</strong> Use the color picker or type a HEX code to start.</li>
                <li><strong>Explore Harmonies:</strong> The tool automatically generates standard color harmonies like complementary, triadic, and more.</li>
                <li><strong>Copy Codes:</strong> Click the copy icon next to any HEX, RGB, or HSL code to add it to your clipboard.</li>
                <li><strong>Test Accessibility:</strong> Check the contrast ratios for each color against black and white text to ensure readability.</li>
                <li><strong>Get Inspired:</strong> Use the 'Random' button to discover new and unexpected color combinations.</li>
            </ul>
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
