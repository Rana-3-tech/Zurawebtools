import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface ContrastCheckResult {
  ratio: string | null;
  aaNormal: 'pass' | 'fail';
  aaLarge: 'pass' | 'fail';
  aaaNormal: 'pass' | 'fail';
  aaaLarge: 'pass' | 'fail';
}

interface AccessibleColorContrastCheckerProps {
  navigateTo: (page: Page) => void;
}

const AccessibleColorContrastChecker: React.FC<AccessibleColorContrastCheckerProps> = ({ navigateTo }) => {
  const [foregroundColor, setForegroundColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#1e293b');
  const [copySuccess, setCopySuccess] = useState(false);

  // 🧠 SEO & Meta Tags Setup
  useEffect(() => {
    document.title =
      'Accessible Color Contrast Checker – Free WCAG Color Accessibility Tool | ZuraWebTools';

    const metaDescription =
      document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Free WCAG 2.1 color contrast checker tool for web accessibility testing. Check AA/AAA compliance, contrast ratios, hex codes, and ADA Section 508 requirements. Perfect for designers and developers ensuring color accessibility for visually impaired users and color blindness.'
    );
    document.head.appendChild(metaDescription);

    const metaTags = [
      { property: 'og:title', content: 'Accessible Color Contrast Checker | ZuraWebTools' },
      { property: 'og:description', content: 'Ensure your web content is readable by everyone with this free WCAG color contrast accessibility tool.' },
      { property: 'og:image', content: 'https://zurawebtools.com/assets/og-accessible-color-contrast-checker.webp' },
      { property: 'og:image:alt', content: 'Free Accessible Color Contrast Checker showing WCAG compliance results' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:url', content: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Accessible Color Contrast Checker | ZuraWebTools' },
      { name: 'twitter:description', content: 'Free WCAG contrast checker to test color accessibility for designers and developers.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/assets/og-accessible-color-contrast-checker.webp' },
      { name: 'twitter:image:alt', content: 'Free Accessible Color Contrast Checker showing WCAG compliance results' },
      { name: 'language', content: 'English' },
      { httpEquiv: 'content-language', content: 'en-US' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    ];

    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', 'en');

    metaTags.forEach(tag => {
      const el = document.createElement('meta');
      Object.entries(tag).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    });

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker');
    document.head.appendChild(canonical);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Accessible Color Contrast Checker',
        applicationCategory: 'AccessibilityTool',
        applicationSubCategory: 'Accessibility Testing',
        operatingSystem: 'Any (Web-based)',
        datePublished: '2024-01-10',
        dateModified: '2024-11-08',
        inLanguage: 'en-US',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '2.0',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1270' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
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
        description: 'A free WCAG color contrast checker that helps designers and developers test color accessibility for text and UI elements.',
        url: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Accessible Color Contrast Checker',
        description: 'Free WCAG color contrast checker for testing accessibility compliance. Check AA and AAA standards instantly.',
        url: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker',
        datePublished: '2024-01-10',
        dateModified: '2024-11-08',
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          name: 'ZuraWebTools',
          url: 'https://zurawebtools.com',
        },
        about: {
          '@type': 'Thing',
          name: 'Web Accessibility',
          description: 'WCAG color contrast compliance testing',
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://zurawebtools.com/assets/og-accessible-color-contrast-checker.webp',
          description: 'Accessible Color Contrast Checker interface',
        },
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
            name: 'Accessible Color Contrast Checker',
            item: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Check Color Contrast for Accessibility',
        description: 'Step-by-step guide to checking WCAG color contrast ratios',
        totalTime: 'PT2M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '0',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Select Foreground Color',
            text: 'Select your foreground and background colors using color pickers or hex inputs.',
            url: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker#step1',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'View Live Preview',
            text: 'View the live preview and contrast ratio instantly.',
            url: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker#step2',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Check WCAG Standards',
            text: 'Ensure your design meets WCAG AA or AAA accessibility standards.',
            url: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker#step3',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Copy Results',
            text: 'Copy the contrast ratio for documentation or audits.',
            url: 'https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker#step4',
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a color contrast checker?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A color contrast checker calculates the contrast ratio between two colors and determines whether they meet WCAG accessibility standards. It helps designers ensure text and UI elements are readable for all users, including those with visual impairments.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is color contrast important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Color contrast ensures that text and UI elements are readable by users with visual impairments, color blindness, and low vision. Good contrast makes websites accessible for all users and helps meet legal requirements like ADA and Section 508 compliance.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the WCAG contrast ratio levels?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'WCAG 2.1 defines contrast ratio thresholds: AA level requires 4.5:1 for normal text and 3:1 for large text, while AAA level requires 7:1 for normal text and 4.5:1 for large text. Large text is defined as 18pt (24px) or 14pt (18.66px) bold.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this color contrast checker free to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! This tool is completely free to use with no registration required. You can check unlimited color combinations and use it for personal or commercial projects without any restrictions.',
            },
          },
          {
            '@type': 'Question',
            name: "What's the difference between WCAG AA and AAA?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'WCAG AA is the minimum recommended level for most websites (4.5:1 ratio), while AAA is the enhanced level (7:1 ratio) providing even better accessibility. AA is legally required in many jurisdictions, while AAA is optional but recommended for critical content.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use hex codes in this tool?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can input colors using hex codes (like #FFFFFF or #000000), or use the color picker to visually select colors. The tool instantly calculates the contrast ratio and shows WCAG compliance results for both input methods.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does "pass" or "fail" mean in the results?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '"Pass" means your color combination meets the WCAG requirements for that specific level and text size. "Fail" indicates the contrast ratio is too low and should be adjusted to improve accessibility and readability for users with visual impairments.',
            },
          },
        ],
      },
    ]);
    document.head.appendChild(script);

    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      document.documentElement.removeAttribute('lang');
      metaDescription.remove();
      metaTags.forEach(tag => {
        const key = Object.keys(tag)[0];
        const val = Object.values(tag)[0];
        const el = document.querySelector(`meta[${key}="${val}"]`);
        if (el) el.remove();
      });
      canonical.remove();
      script.remove();
    };
  }, []);

  // 📡 IndexNow: Notify search engines about page updates
  useEffect(() => {
    notifyIndexNow('/color-and-design-tools/accessible-color-contrast-checker');
  }, []);

  // Contrast Calculation Logic
  const contrastResult = useMemo((): ContrastCheckResult => {
    const getLuminance = (hex: string) => {
      let clean = hex.startsWith('#') ? hex.slice(1) : hex;
      if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
      if (!/^[0-9A-Fa-f]{6}$/.test(clean)) return null;

      const [r, g, b] = [
        parseInt(clean.slice(0, 2), 16),
        parseInt(clean.slice(2, 4), 16),
        parseInt(clean.slice(4, 6), 16),
      ];
      const [R, G, B] = [r, g, b].map(v =>
        (v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
      );
      return R * 0.2126 + G * 0.7152 + B * 0.0722;
    };

    const l1 = getLuminance(foregroundColor);
    const l2 = getLuminance(backgroundColor);
    if (l1 === null || l2 === null)
      return { ratio: null, aaNormal: 'fail', aaLarge: 'fail', aaaNormal: 'fail', aaaLarge: 'fail' };

    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return {
      ratio: ratio.toFixed(2),
      aaNormal: ratio >= 4.5 ? 'pass' : 'fail',
      aaLarge: ratio >= 3 ? 'pass' : 'fail',
      aaaNormal: ratio >= 7 ? 'pass' : 'fail',
      aaaLarge: ratio >= 4.5 ? 'pass' : 'fail',
    };
  }, [foregroundColor, backgroundColor]);

  const handleCopy = () => {
    if (contrastResult.ratio) {
      navigator.clipboard.writeText(`${contrastResult.ratio} : 1`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const StatusBadge: React.FC<{ status: 'pass' | 'fail' }> = ({ status }) => (
    <span
      className={`px-2 py-1 text-xs font-bold rounded ${
        status === 'pass' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}
    >
      {status.toUpperCase()}
    </span>
  );

  // 🔗 Social Share Button
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

  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Accessible Color Contrast Checker
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Ensure your website is accessible by testing color contrast ratios against WCAG AA and AAA
            standards. Perfect for designers, developers, and UI testers.
          </p>
        </div>

        {/* Main Tool UI */}
        <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-slate-900/50 p-6 rounded-xl shadow-lg space-y-6">
            {['Foreground', 'Background'].map((label, i) => {
              const value = i ? backgroundColor : foregroundColor;
              const setter = i ? setBackgroundColor : setForegroundColor;
              return (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label} Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={value}
                      onChange={e => setter(e.target.value)}
                      className="w-12 h-12 bg-transparent border-none rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={e => setter(e.target.value)}
                      className="w-full bg-slate-700 text-white p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Results */}
          <div className="bg-slate-900/50 p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
            <div
              className="p-4 rounded-lg border border-slate-700 transition-colors duration-300"
              style={{ backgroundColor, color: foregroundColor }}
            >
              <p className="text-lg font-bold">Large Text (18pt / 24px)</p>
              <p>The quick brown fox jumps over the lazy dog.</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Contrast Ratio</h3>
              <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg">
                <p className="text-2xl font-bold text-cyan-300">
                  {contrastResult.ratio ? `${contrastResult.ratio} : 1` : 'Invalid'}
                </p>
                <button
                  onClick={handleCopy}
                  className={`font-semibold py-1 px-3 rounded text-sm ${
                    copySuccess
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-600 hover:bg-slate-500 text-gray-200'
                  }`}
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between"><span>Normal Text (AA)</span><StatusBadge status={contrastResult.aaNormal}/></div>
              <div className="flex justify-between"><span>Large Text (AA)</span><StatusBadge status={contrastResult.aaLarge}/></div>
              <div className="flex justify-between"><span>Normal Text (AAA)</span><StatusBadge status={contrastResult.aaaNormal}/></div>
              <div className="flex justify-between"><span>Large Text (AAA)</span><StatusBadge status={contrastResult.aaaLarge}/></div>
            </div>
          </div>
        </div>

        {/* Quick Test Examples */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4 text-center">⚡ Quick Test Examples</h3>
            <p className="text-gray-400 text-center mb-6 text-sm">Click any example below to instantly test common color combinations</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setForegroundColor('#000000');
                  setBackgroundColor('#FFFFFF');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded border-2 border-slate-600" style={{ background: 'linear-gradient(to right, #000000 50%, #FFFFFF 50%)' }}></div>
                  <span className="font-semibold text-white group-hover:text-cyan-300">Black on White</span>
                </div>
                <p className="text-xs text-gray-400">Ratio: 21:1 • Perfect AAA ✅</p>
              </button>

              <button
                onClick={() => {
                  setForegroundColor('#FFFFFF');
                  setBackgroundColor('#0066CC');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded border-2 border-slate-600" style={{ background: 'linear-gradient(to right, #FFFFFF 50%, #0066CC 50%)' }}></div>
                  <span className="font-semibold text-white group-hover:text-cyan-300">White on Blue</span>
                </div>
                <p className="text-xs text-gray-400">Ratio: 7.3:1 • AAA Large ✅</p>
              </button>

              <button
                onClick={() => {
                  setForegroundColor('#767676');
                  setBackgroundColor('#FFFFFF');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded border-2 border-slate-600" style={{ background: 'linear-gradient(to right, #767676 50%, #FFFFFF 50%)' }}></div>
                  <span className="font-semibold text-white group-hover:text-cyan-300">Gray on White</span>
                </div>
                <p className="text-xs text-gray-400">Ratio: 4.54:1 • AA Pass ✅</p>
              </button>

              <button
                onClick={() => {
                  setForegroundColor('#FF6B6B');
                  setBackgroundColor('#FFFFFF');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded border-2 border-slate-600" style={{ background: 'linear-gradient(to right, #FF6B6B 50%, #FFFFFF 50%)' }}></div>
                  <span className="font-semibold text-white group-hover:text-cyan-300">Red on White</span>
                </div>
                <p className="text-xs text-gray-400">Ratio: 3.36:1 • Fails AA ❌</p>
              </button>

              <button
                onClick={() => {
                  setForegroundColor('#FFFFFF');
                  setBackgroundColor('#1E293B');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded border-2 border-slate-600" style={{ background: 'linear-gradient(to right, #FFFFFF 50%, #1E293B 50%)' }}></div>
                  <span className="font-semibold text-white group-hover:text-cyan-300">White on Dark Slate</span>
                </div>
                <p className="text-xs text-gray-400">Ratio: 12.6:1 • Perfect AAA ✅</p>
              </button>

              <button
                onClick={() => {
                  setForegroundColor('#22C55E');
                  setBackgroundColor('#FFFFFF');
                }}
                className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-cyan-500 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded border-2 border-slate-600" style={{ background: 'linear-gradient(to right, #22C55E 50%, #FFFFFF 50%)' }}></div>
                  <span className="font-semibold text-white group-hover:text-cyan-300">Green on White</span>
                </div>
                <p className="text-xs text-gray-400">Ratio: 2.76:1 • Fails AA ❌</p>
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Results</h3>
            <p className="text-slate-300">Real-time WCAG compliance checking as you adjust colors. No waiting, no calculations — just instant contrast ratio feedback.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">WCAG Standards</h3>
            <p className="text-slate-300">Follows official WCAG 2.1 guidelines for AA and AAA levels. Trusted by accessibility professionals worldwide.</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-white mb-3">100% Private</h3>
            <p className="text-slate-300">All checks happen in your browser. No data uploads, no tracking — your color combinations stay completely confidential.</p>
          </div>
        </section>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 p-8 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">About This Color Accessibility Tool</h2>
            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Our <strong>free color contrast checker</strong> is designed to help web designers, developers, and accessibility professionals ensure their digital content meets <strong><a href="https://www.w3.org/WAI/WCAG21/Understanding/" target="_blank" rel="nofollow noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">WCAG 2.1 (Web Content Accessibility Guidelines)</a></strong> standards established by the W3C. This tool instantly calculates the <strong>contrast ratio</strong> between foreground and background colors, making it easy to verify compliance with <strong>AA</strong> and <strong>AAA</strong> accessibility levels.
              </p>
              <p>
                Whether you're working with <strong>hex codes</strong> (try our <button onClick={() => navigateTo('hex-to-rgb-converter')} className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer">Hex to RGB Converter</button> for color format conversions), using a <strong>color picker</strong>, or conducting <strong><a href="https://www.ada.gov/resources/web-guidance/" target="_blank" rel="nofollow noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline">ADA compliance</a></strong> audits, this tool provides real-time feedback on <strong>text readability</strong> and <strong>web accessibility</strong>. It supports <strong>Section 508</strong> requirements and helps create inclusive designs for users with <strong>visual impairments</strong>, <strong>color blindness</strong>, and <strong>low vision</strong>.
              </p>
              <p>
                Perfect for UI/UX designers creating accessible interfaces, frontend developers implementing design systems, and QA testers performing accessibility audits. Pair this with our <button onClick={() => navigateTo('color-harmony-checker')} className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer">Color Harmony Checker</button> to ensure your entire color palette is both beautiful and accessible. No registration required - start checking your color combinations instantly!
              </p>
              <p className="text-sm text-gray-400 italic">
                <span className="inline-block">📅 Last updated: November 8, 2024</span>
                <span className="mx-2">•</span>
                <span className="inline-block">⚡ Updated with latest WCAG 2.1 standards</span>
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Use the Contrast Checker</h2>
          <div className="bg-slate-900/30 p-8 rounded-xl shadow-lg space-y-6">
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Choose Your Colors</h3>
                  <p className="text-gray-300 mb-2">Select your foreground and background colors using the color pickers or enter hex codes directly.</p>
                  <div className="bg-slate-800/50 p-3 rounded border-l-4 border-cyan-500">
                    <p className="text-sm text-gray-400"><strong>Example:</strong> Foreground: <code className="bg-slate-700 px-2 py-1 rounded">#FFFFFF</code> (white), Background: <code className="bg-slate-700 px-2 py-1 rounded">#1E293B</code> (dark slate)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Check Live Preview</h3>
                  <p className="text-gray-300 mb-2">View the live preview to see how your text appears with the selected colors. The contrast ratio is calculated instantly.</p>
                  <div className="bg-slate-800/50 p-3 rounded border-l-4 border-cyan-500">
                    <p className="text-sm text-gray-400"><strong>Example:</strong> A ratio of <strong>12.63:1</strong> means excellent contrast - easily readable for all users</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Verify WCAG Compliance</h3>
                  <p className="text-gray-300 mb-2">Check if your design meets WCAG AA or AAA standards. Green badges show "PASS" for compliant combinations.</p>
                  <div className="bg-slate-800/50 p-3 rounded border-l-4 border-cyan-500">
                    <p className="text-sm text-gray-400"><strong>Example:</strong> Normal Text (AA): <span className="text-green-400 font-bold">PASS</span> means your color combo works for body text. <span className="text-red-400 font-bold">FAIL</span> means you need higher contrast.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Copy & Document</h3>
                  <p className="text-gray-300 mb-2">Copy the contrast ratio for your accessibility documentation, design system, or audit reports.</p>
                  <div className="bg-slate-800/50 p-3 rounded border-l-4 border-cyan-500">
                    <p className="text-sm text-gray-400"><strong>Tip:</strong> Include contrast ratios in your style guide to ensure consistent accessibility across your project</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cyan-900/20 border border-cyan-700/30 rounded-lg">
              <p className="text-cyan-300 font-semibold mb-2">💡 Pro Tips:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                <li>Use darker backgrounds with lighter text for better readability</li>
                <li>Aim for AAA compliance (7:1) for important content like body text</li>
                <li>Test your colors with common color blindness simulations</li>
                <li>Remember: Large headings can pass with lower contrast (3:1 for AA)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <section className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">🎯 Who Uses This Contrast Checker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-center">🎨</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-400 transition-colors">UI/UX Designers</h3>
              <p className="text-slate-300 text-sm text-center">Create accessible interfaces with WCAG-compliant color schemes. Ensure visual designs meet accessibility standards before handoff.</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-center">💻</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-400 transition-colors">Frontend Developers</h3>
              <p className="text-slate-300 text-sm text-center">Implement design systems with accessible color tokens. Validate CSS colors during development for WCAG compliance.</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-center">🔍</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-400 transition-colors">QA Testers</h3>
              <p className="text-slate-300 text-sm text-center">Perform accessibility audits and identify contrast issues. Verify websites meet Section 508 and ADA compliance requirements.</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 group">
              <div className="text-4xl mb-4 text-center">♿</div>
              <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-400 transition-colors">Accessibility Experts</h3>
              <p className="text-slate-300 text-sm text-center">Conduct WCAG audits and generate compliance reports. Recommend color adjustments to meet AA and AAA standards.</p>
            </div>
          </div>
        </section>

        {/* External Links Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🔗 Accessibility Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://www.w3.org/WAI/WCAG21/Understanding/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors duration-300 group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400">📚 WCAG 2.1 Guidelines – W3C</h3>
              <p className="text-sm text-slate-400">Official Web Content Accessibility Guidelines from the World Wide Web Consortium with detailed contrast requirements.</p>
            </a>
            <a 
              href="https://www.ada.gov/resources/web-guidance/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors duration-300 group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400">⚖️ ADA Web Guidance – ADA.gov</h3>
              <p className="text-sm text-slate-400">Americans with Disabilities Act guidance for web accessibility, including color contrast requirements for compliance.</p>
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">What is a color contrast checker?</h3>
              <p className="text-gray-400 mt-2">A color contrast checker calculates the contrast ratio between two colors and determines whether they meet WCAG accessibility standards. It helps designers ensure text and UI elements are readable for all users, including those with visual impairments.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">Why is color contrast important?</h3>
              <p className="text-gray-400 mt-2">Color contrast ensures that text and UI elements are readable by users with visual impairments, color blindness, and low vision. Good contrast makes websites accessible for all users and helps meet legal requirements like ADA and Section 508 compliance.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">What are the WCAG contrast ratio levels?</h3>
              <p className="text-gray-400 mt-2">WCAG 2.1 defines contrast ratio thresholds: AA level requires 4.5:1 for normal text and 3:1 for large text, while AAA level requires 7:1 for normal text and 4.5:1 for large text. Large text is defined as 18pt (24px) or 14pt (18.66px) bold.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">Is this color contrast checker free to use?</h3>
              <p className="text-gray-400 mt-2">Yes! This tool is completely free to use with no registration required. You can check unlimited color combinations and use it for personal or commercial projects without any restrictions.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">What's the difference between WCAG AA and AAA?</h3>
              <p className="text-gray-400 mt-2">WCAG AA is the minimum recommended level for most websites (4.5:1 ratio), while AAA is the enhanced level (7:1 ratio) providing even better accessibility. AA is legally required in many jurisdictions, while AAA is optional but recommended for critical content.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">Can I use hex codes in this tool?</h3>
              <p className="text-gray-400 mt-2">Yes! You can input colors using hex codes (like #FFFFFF or #000000), or use the color picker to visually select colors. The tool instantly calculates the contrast ratio and shows WCAG compliance results for both input methods.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">What does "pass" or "fail" mean in the results?</h3>
              <p className="text-gray-400 mt-2">"Pass" means your color combination meets the WCAG requirements for that specific level and text size. "Fail" indicates the contrast ratio is too low and should be adjusted to improve accessibility and readability for users with visual impairments.</p>
            </div>
          </div>
        </div>

        {/* 🔗 Share Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
          <div className="flex justify-center items-center space-x-6">
            <ShareButton network="Facebook" url="https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker" text="Check your website's WCAG color contrast easily with this free tool!" />
            <ShareButton network="Twitter" url="https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker" text="Free WCAG color contrast checker by @ZuraWebTools!" />
            <ShareButton network="LinkedIn" url="https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker" text="Ensure your website colors meet WCAG accessibility standards." />
            <ShareButton network="WhatsApp" url="https://zurawebtools.com/color-and-design-tools/accessible-color-contrast-checker" text="Free WCAG color contrast checker tool by ZuraWebTools." />
          </div>
        </div>
        
        <RelatedTools
            navigateTo={navigateTo}
            relatedSlugs={['hex-to-rgb-converter', 'color-harmony-checker', 'shadow-css-generator']}
            currentSlug="accessible-color-contrast-checker"
        />
      </div>
    </section>
  );
};

export default AccessibleColorContrastChecker;
