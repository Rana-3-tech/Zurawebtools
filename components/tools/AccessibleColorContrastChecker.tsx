import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

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
      'Check color contrast ratios for accessibility compliance (WCAG AA/AAA). Free online contrast checker for designers, developers, and accessibility testing.'
    );
    document.head.appendChild(metaDescription);

    const metaTags = [
      { property: 'og:title', content: 'Accessible Color Contrast Checker | ZuraWebTools' },
      { property: 'og:description', content: 'Ensure your web content is readable by everyone with this free WCAG color contrast accessibility tool.' },
      { property: 'og:image', content: 'https://zurawebtools.com/assets/og-accessible-color-contrast-checker.webp' },
      { property: 'og:image:alt', content: 'Free Accessible Color Contrast Checker showing WCAG compliance results' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:url', content: 'https://zurawebtools.com/tools/accessible-color-contrast-checker' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Accessible Color Contrast Checker | ZuraWebTools' },
      { name: 'twitter:description', content: 'Free WCAG contrast checker to test color accessibility for designers and developers.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/assets/og-accessible-color-contrast-checker.webp' },
      { name: 'twitter:image:alt', content: 'Free Accessible Color Contrast Checker showing WCAG compliance results' },
    ];

    metaTags.forEach(tag => {
      const el = document.createElement('meta');
      Object.entries(tag).forEach(([k, v]) => el.setAttribute(k, v));
      document.head.appendChild(el);
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://zurawebtools.com/tools/accessible-color-contrast-checker';
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1270' },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', name: 'ZuraWebTools', url: 'https://zurawebtools.com' },
        description: 'A free WCAG color contrast checker that helps designers and developers test color accessibility for text and UI elements.',
        url: 'https://zurawebtools.com/tools/accessible-color-contrast-checker',
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
              text: 'A color contrast checker calculates the contrast ratio between two colors and determines whether they meet WCAG accessibility standards.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is color contrast important?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Color contrast ensures that text and UI elements are readable by users with visual impairments, making websites accessible for all.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the WCAG contrast ratio levels?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'WCAG 2.1 defines contrast ratio thresholds: AA (4.5:1 for normal text, 3:1 for large text) and AAA (7:1 for normal text, 4.5:1 for large text).',
            },
          },
        ],
      },
    ]);
    document.head.appendChild(script);

    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
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

        {/* How to Use */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">How to Use the Contrast Checker</h2>
          <div className="bg-slate-900/30 p-8 rounded-lg">
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>Select your foreground and background colors using color pickers or hex inputs.</li>
              <li>View the live preview and contrast ratio instantly.</li>
              <li>Ensure your design meets WCAG AA or AAA accessibility standards.</li>
              <li>Copy the contrast ratio for documentation or audits.</li>
            </ol>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">What is a color contrast checker?</h3>
              <p className="text-gray-400 mt-2">It calculates the contrast ratio between two colors and checks if they meet WCAG standards.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-300">Why is color contrast important?</h3>
              <p className="text-gray-400 mt-2">Good contrast ensures your text and elements are readable for everyone, including visually impaired users.</p>
            </div>
          </div>
        </div>

        {/* 🔗 Share Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
          <div className="flex justify-center items-center space-x-6">
            <ShareButton network="Facebook" url="https://zurawebtools.com/tools/accessible-color-contrast-checker" text="Check your website's WCAG color contrast easily with this free tool!" />
            <ShareButton network="Twitter" url="https://zurawebtools.com/tools/accessible-color-contrast-checker" text="Free WCAG color contrast checker by @ZuraWebTools!" />
            <ShareButton network="LinkedIn" url="https://zurawebtools.com/tools/accessible-color-contrast-checker" text="Ensure your website colors meet WCAG accessibility standards." />
            <ShareButton network="WhatsApp" url="https://zurawebtools.com/tools/accessible-color-contrast-checker" text="Free WCAG color contrast checker tool by ZuraWebTools." />
          </div>
        </div>
        
        <RelatedTools
            navigateTo={navigateTo}
            relatedSlugs={['hex-to-rgb-converter']}
            currentSlug="accessible-color-contrast-checker"
        />
      </div>
    </section>
  );
};

export default AccessibleColorContrastChecker;
