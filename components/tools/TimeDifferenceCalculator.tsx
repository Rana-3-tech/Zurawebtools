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
    document.title = "Date Difference Calculator – Find Days, Months & Years Between Two Dates | ZuraWebTools";

    // 📝 Meta Description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute(
      'content',
      'Free Date Difference Calculator to calculate time duration between two dates in days, months, and years. Ideal for age calculation, project planning, event tracking, and date span analysis.'
    );
    document.head.appendChild(metaDescription);

    // 🏷️ Meta Keywords (LSI-enhanced)
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute(
      'content',
      'date difference calculator, date duration calculator, days between two dates, date span calculator, date interval calculator, time gap calculator, age calculator, event date calculator, project duration calculator'
    );
    document.head.appendChild(metaKeywords);

    // 📲 Open Graph & Twitter Meta Tags
    const metaTags = [
      { property: 'og:title', content: 'Date Difference Calculator | ZuraWebTools' },
      { property: 'og:description', content: 'Instantly find days, months, and years between two dates using this free date duration calculator. Perfect for age, project, or event calculations.' },
      { property: 'og:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-date-difference-calculator-og.png' },
      { property: 'og:image:alt', content: 'Free Date Difference Calculator showing years, months, and days between two dates.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/tools/time-difference-calculator' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Date Difference Calculator | ZuraWebTools' },
      { name: 'twitter:description', content: 'Free online tool to calculate the time gap between two dates in years, months, and days. Ideal for age and project duration calculations.' },
      { name: 'twitter:image', content: 'https://storage.googleapis.com/aai-web-samples/zura-date-difference-calculator-og.png' },
      { name: 'twitter:image:alt', content: 'Free Date Difference Calculator showing years, months, and days between two dates.' },
    ];
    metaTags.forEach(tag => {
      const el = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
      document.head.appendChild(el);
    });

    // 🔗 Canonical URL
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/tools/time-difference-calculator');
    document.head.appendChild(canonical);

    // 📘 Structured Data (SoftwareApplication + FAQPage)
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Date Difference Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "Any (Web-based)",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "980" },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "description": "A free online date difference calculator that calculates the number of days, months, and years between two dates. Ideal for age calculation, event planning, and project timelines.",
        "url": "https://zurawebtools.com/tools/time-difference-calculator"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the Date Difference Calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This date duration calculator computes the time gap between two dates accurately, accounting for leap years and month length variations."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this to calculate my age?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can use this age calculator feature by entering your birth date and the current date to get your age in years, months, and days."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ZuraWebTools offers this date difference calculator completely free, accurate, and instant for both personal and professional use."
            }
          },
          {
            "@type": "Question",
            "name": "What can I use the Date Difference Calculator for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can use it to calculate project durations, event planning timelines, or find the number of days between any two dates easily."
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
            <h2 className="text-2xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">How does it work?</h3><p className="text-sm text-gray-400 mt-1">This date duration calculator accurately finds the number of days, months, and years between two dates, accounting for leap years.</p></div>
              <div className="bg-slate-900/30 p-4 rounded-lg"><h3 className="font-semibold text-cyan-300">Is this calculator free?</h3><p className="text-sm text-gray-400 mt-1">Yes, this tool is 100% free and works instantly without sign-up.</p></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="font-semibold text-gray-400 mb-2">Share This Tool:</p>
          <div className="flex justify-center items-center space-x-6">
            <ShareButton network="Facebook" url="https://zurawebtools.com/tools/time-difference-calculator" text="Calculate date differences easily with this free tool!" />
            <ShareButton network="Twitter" url="https://zurawebtools.com/tools/time-difference-calculator" text="Calculate date differences easily with this free tool from @ZuraWebTools!" />
            <ShareButton network="LinkedIn" url="https://zurawebtools.com/tools/time-difference-calculator" text="Calculate date differences easily with this free tool!" />
            <ShareButton network="WhatsApp" url="https://zurawebtools.com/tools/time-difference-calculator" text="Calculate date differences easily with this free tool!" />
          </div>
        </div>

        <RelatedTools
          navigateTo={navigateTo}
          relatedSlugs={['percentage-change-calculator']}
          currentSlug="time-difference-calculator"
        />
      </div>
    </section>
  );
};

export default TimeDifferenceCalculator;
