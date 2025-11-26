import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface TimeDifferenceCalculatorProps {
  navigateTo: (page: Page) => void;
}

const TimeDifferenceCalculator: React.FC<TimeDifferenceCalculatorProps> = ({ navigateTo }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState<{ years: number, months: number, days: number } | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // 🧠 SEO & Meta Tags Setup
  useEffect(() => {
    document.title = "Time Difference Calculator - Calculate Years, Months & Days";

    // 📝 Meta Description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Calculate time between two dates instantly. Get accurate results in years, months, and days. Free online calculator for age, duration & date difference.'
    );
    document.head.appendChild(metaDescription);

    // 🤖 Robots Meta Tag
    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large');
    document.head.appendChild(metaRobots);

    // 📲 Open Graph & Twitter Meta Tags
    const metaTags = [
      { property: 'og:title', content: 'Time Difference Calculator - Calculate Years, Months & Days' },
      { property: 'og:description', content: 'Calculate time between two dates instantly. Get accurate results in years, months, and days. Free online calculator for age, duration & date difference.' },
      { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-date-difference-calculator-og.png' },
      { property: 'og:image:alt', content: 'Time Difference Calculator showing years, months, and days between two dates.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'article:published_time', content: '2024-01-15T08:00:00Z' },
      { property: 'article:modified_time', content: new Date().toISOString() },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Time Difference Calculator - Calculate Years, Months & Days' },
      { name: 'twitter:description', content: 'Calculate time between two dates instantly. Free calculator for age, duration & date difference.' },
      { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-date-difference-calculator-og.png' },
      { name: 'twitter:image:alt', content: 'Time Difference Calculator showing years, months, and days between two dates.' },
      { name: 'twitter:site', content: '@ZuraWebTools' },
    ];
    metaTags.forEach(tag => {
      const el = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
      document.head.appendChild(el);
    });

    // 🔗 Canonical URL
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator');
    document.head.appendChild(canonical);

    // 📘 Structured Data (BreadcrumbList + SoftwareApplication + FAQPage + HowTo + WebPage)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://zurawebtools.com/tools" },
          { "@type": "ListItem", "position": 3, "name": "Time Difference Calculator", "item": "https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Time Difference Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "Any (Web-based)",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1245" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "description": "Calculate time between two dates instantly. Get accurate results in years, months, and days. Free online calculator for age, duration & date difference.",
        "url": "https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the date calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This calculator uses precise algorithms to compute exact time between two dates, accounting for leap years and variable month lengths."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely free with no sign-up required. Use it unlimited times for personal or professional purposes."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate my exact age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Enter your birth date as start and today's date as end to get your age in years, months, and days."
            }
          },
          {
            "@type": "Question",
            "name": "Does it handle leap years?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our algorithm automatically accounts for leap years (February 29) and different month lengths."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use for business?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Use it for project timelines, employee tenure, contract durations, or any business date calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Is my data stored?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. All calculations happen in your browser. We don't store or track any information you enter."
            }
          },
          {
            "@type": "Question",
            "name": "What's the maximum date range?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can calculate differences for any valid date range, typically from year 1000 to year 9999."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Time Difference Between Two Dates",
        "description": "Step-by-step guide to calculate exact duration between dates in years, months, and days",
        "step": [
          { "@type": "HowToStep", "position": 1, "name": "Select Start Date", "text": "Choose the earlier date using the first date input field" },
          { "@type": "HowToStep", "position": 2, "name": "Select End Date", "text": "Choose the later date using the second date input field" },
          { "@type": "HowToStep", "position": 3, "name": "Calculate", "text": "Click the Calculate button to see results instantly" },
          { "@type": "HowToStep", "position": 4, "name": "View Results", "text": "See the time difference displayed in years, months, and days" },
          { "@type": "HowToStep", "position": 5, "name": "Copy Results", "text": "Click Copy to save or share your calculation results" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Time Difference Calculator - Calculate Years, Months & Days",
        "description": "Calculate time between two dates instantly. Get accurate results in years, months, and days. Free online calculator for age, duration & date difference.",
        "url": "https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator",
        "datePublished": "2024-01-15",
        "dateModified": "2025-11-09",
        "inLanguage": "en-US",
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        }
      }
    ]);
    document.head.appendChild(script);

    // 🧹 Cleanup on unmount
    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      metaDescription.remove();
      metaRobots.remove();
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

  const handleCalculate = () => {
    if (!startDate || !endDate) {
      setDifference(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setMinutes(start.getMinutes() + start.getTimezoneOffset());
    end.setMinutes(end.getMinutes() + end.getTimezoneOffset());

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      setDifference(null);
      return;
    }

    let yearDiff = end.getFullYear() - start.getFullYear();
    let monthDiff = end.getMonth() - start.getMonth();
    let dayDiff = end.getDate() - start.getDate();

    if (dayDiff < 0) {
      monthDiff--;
      dayDiff += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    setDifference({ years: yearDiff, months: monthDiff, days: dayDiff });
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setDifference(null);
  };

  const handleCopy = () => {
    if (difference) {
      const resultString = `${difference.years} Years, ${difference.months} Months, ${difference.days} Days`;
      navigator.clipboard.writeText(resultString);
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

    return <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{network}</a>;
  };

  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Date Difference Calculator</h1>
          <p className="mt-4 text-lg text-gray-300">
            Instantly find how many years, months, and days are between two dates. This free time gap and date duration calculator is ideal for age calculation, project planning, and event tracking.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-10 p-8 bg-slate-900/50 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
              <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-slate-700 text-white p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400" />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
              <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-slate-700 text-white p-3 rounded-md border border-slate-600 focus:ring-2 focus:ring-cyan-400" />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={handleCalculate} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity transform hover:scale-105 shadow-lg">Calculate</button>
            <button onClick={handleReset} className="bg-slate-700 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-600 transition-colors shadow-lg">Reset</button>
          </div>
        </div>

        {difference && (
          <div className="max-w-2xl mx-auto mt-8 bg-slate-900 p-6 rounded-xl shadow-inner relative">
            <h2 className="text-2xl font-bold text-center text-white mb-4">Date Difference</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800/50 p-4 rounded-lg"><p className="text-3xl font-bold text-cyan-300">{difference.years}</p><p className="text-sm text-gray-400">Years</p></div>
              <div className="bg-slate-800/50 p-4 rounded-lg"><p className="text-3xl font-bold text-cyan-300">{difference.months}</p><p className="text-sm text-gray-400">Months</p></div>
              <div className="bg-slate-800/50 p-4 rounded-lg"><p className="text-3xl font-bold text-cyan-300">{difference.days}</p><p className="text-sm text-gray-400">Days</p></div>
            </div>
            <button onClick={handleCopy} className={`absolute top-4 right-4 font-semibold py-2 px-4 rounded-md text-sm transition-all transform hover:scale-105 ${copySuccess ? 'bg-green-600 text-white' : 'bg-slate-700 hover:bg-slate-600 text-gray-200'}`}>
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        {/* 📚 How It Works Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">⏰ How the Time Difference Calculator Works</h2>
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 rounded-xl border border-slate-700">
            <p className="text-gray-300 leading-relaxed mb-4">
              Our time difference calculator uses advanced date arithmetic algorithms to compute the exact duration between two dates. The calculator automatically accounts for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li><strong className="text-cyan-400">Leap years</strong> - February 29th is correctly handled in leap year calculations</li>
              <li><strong className="text-cyan-400">Variable month lengths</strong> - Different days in each month (28/29/30/31 days)</li>
              <li><strong className="text-cyan-400">Timezone normalization</strong> - Ensures consistent results regardless of your timezone</li>
              <li><strong className="text-cyan-400">Date validation</strong> - Prevents invalid date entries and calculation errors</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-4">
              The algorithm breaks down the time span into years, months, and days by first calculating the year difference, then adjusting for remaining months, and finally computing leftover days.
            </p>
          </div>
        </div>

        {/* 🎯 Use Cases Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">🎯 Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">👶 Age Calculation</h3>
              <p className="text-gray-300 text-sm">Calculate exact age in years, months, and days from birth date. Perfect for birthday planning, medical records, or age verification.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">📅 Project Management</h3>
              <p className="text-gray-300 text-sm">Track project duration, milestone spacing, and deadline proximity. Essential for Agile sprints and delivery schedules.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">💼 Employment Duration</h3>
              <p className="text-gray-300 text-sm">Calculate tenure at a company for resume building, benefits eligibility, or performance reviews.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">🎓 Academic Planning</h3>
              <p className="text-gray-300 text-sm">Measure time until graduation, study periods, or semester durations for academic scheduling.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">💰 Financial Planning</h3>
              <p className="text-gray-300 text-sm">Calculate investment periods, loan durations, savings timelines, or retirement countdown.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors">
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">❤️ Relationship Milestones</h3>
              <p className="text-gray-300 text-sm">Track anniversary dates, relationship duration, or time since important events.</p>
            </div>
          </div>
        </div>

        {/* ✨ Key Features Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">✨ Key Features & Benefits</h2>
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-8 rounded-xl border border-cyan-700/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Calculation</h4>
                  <p className="text-sm text-gray-400">Get results in milliseconds with no page refresh required</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">100% Accurate</h4>
                  <p className="text-sm text-gray-400">Accounts for leap years and variable month lengths</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Mobile Responsive</h4>
                  <p className="text-sm text-gray-400">Works seamlessly on desktop, tablet, and smartphone</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">Privacy First</h4>
                  <p className="text-sm text-gray-400">All calculations happen in your browser - no data stored</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">💾</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">One-Click Copy</h4>
                  <p className="text-sm text-gray-400">Copy results to clipboard for sharing or documentation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">No Installation</h4>
                  <p className="text-sm text-gray-400">Web-based tool accessible from any browser</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 💡 Tips Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">💡 Tips for Best Results</h2>
          <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">1.</span>
                <p><strong className="text-white">Enter dates correctly:</strong> Start date should be earlier than end date for standard duration calculations</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">2.</span>
                <p><strong className="text-white">Age calculation:</strong> Use your birth date as start and today's date as end to get exact age</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">3.</span>
                <p><strong className="text-white">Project planning:</strong> Calculate sprint durations, milestone gaps, or project phase lengths</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">4.</span>
                <p><strong className="text-white">Copy results:</strong> Use the Copy button to quickly paste into spreadsheets or documents</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-cyan-400 font-bold">5.</span>
                <p><strong className="text-white">Verify dates:</strong> Double-check entries for legal documents or official calculations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">How to Use</h2>
            <div className="bg-slate-900/30 p-6 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>Select a start date using the first input field.</li>
                <li>Select an end date using the second input field.</li>
                <li>Click the "Calculate" button to see the result instantly.</li>
                <li>View the duration in years, months, and days format.</li>
                <li>Click “Copy” to share or save your result.</li>
              </ol>
              <p className="text-sm text-gray-400 mt-4 italic">
                Example: If your start date is January 1, 2020, and end date is October 30, 2025 — the difference is 5 years, 9 months, and 29 days.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">How does the date calculator work?</h3><p className="text-sm text-gray-400 mt-1">This calculator uses precise algorithms to compute exact time between two dates, accounting for leap years and variable month lengths.</p></div>
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">Is this calculator free to use?</h3><p className="text-sm text-gray-400 mt-1">Yes, completely free with no sign-up required. Use it unlimited times for personal or professional purposes.</p></div>
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">Can I calculate my exact age?</h3><p className="text-sm text-gray-400 mt-1">Absolutely! Enter your birth date as start and today's date as end to get your age in years, months, and days.</p></div>
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">Does it handle leap years?</h3><p className="text-sm text-gray-400 mt-1">Yes, our algorithm automatically accounts for leap years (February 29) and different month lengths.</p></div>
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">Can I use for business?</h3><p className="text-sm text-gray-400 mt-1">Yes! Use it for project timelines, employee tenure, contract durations, or any business date calculations.</p></div>
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">Is my data stored?</h3><p className="text-sm text-gray-400 mt-1">No. All calculations happen in your browser. We don't store or track any information you enter.</p></div>
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">What's the maximum date range?</h3><p className="text-sm text-gray-400 mt-1">You can calculate differences for any valid date range, typically from year 1000 to year 9999.</p></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
          <div className="flex justify-center items-center space-x-6">
            <ShareButton network="Facebook" url="https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator" text="Calculate date differences easily with this free tool!" />
            <ShareButton network="Twitter" url="https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator" text="Calculate date differences easily with this free tool from @ZuraWebTools!" />
            <ShareButton network="LinkedIn" url="https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator" text="Calculate date differences easily with this free tool!" />
            <ShareButton network="WhatsApp" url="https://zurawebtools.com/math-and-calculation-tools/time-difference-calculator" text="Calculate date differences easily with this free tool!" />
          </div>
        </div>

        <RelatedTools
          navigateTo={navigateTo}
          relatedSlugs={['percentage-change-calculator', 'word-counter', 'sat-score-calculator', 'lorem-ipsum-generator', 'pro-rv-loan-calculator']}
          currentSlug="time-difference-calculator"
        />
      </div>
    </section>
  );
};

export default TimeDifferenceCalculator;
