import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Page } from '../../App';
import TableOfContents from '../TableOfContents';

interface NottinghamGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Module {
  id: string;
  name: string;
  credits: number;
  percentage: number;
  year: number;
}

interface CalculationResult {
  weightedAverage: number;
  classification: string;
  usGPA: number;
  gpaRange: string;
  isBorderline: boolean;
  totalCredits: number;
  year1Average: number;
  year2Average: number;
  year3Average: number;
}

const NottinghamGPACalculator: React.FC<NottinghamGPACalculatorProps> = ({ navigateTo }) => {
  const [modules, setModules] = useState<Module[]>([
    { id: '1', name: '', credits: 20, percentage: 0, year: 1 }
  ]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Input sanitization to prevent XSS attacks
  const sanitizeInput = useCallback((input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .slice(0, 100); // Limit length
  }, []);

  // SEO Metadata
  useEffect(() => {
    const title = "University of Nottingham Grade Calculator | UK to US GPA";
    const description = "Unofficial University of Nottingham grade calculator. Convert UK percentage marks to US GPA with accurate 0/33/67 weighting system for Russell Group applications.";
    const canonicalUrl = "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator";

    document.title = title;

    // Remove existing meta tags
    const metaTags = ['description', 'keywords', 'author', 'robots'];
    metaTags.forEach(name => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      if (existing) existing.remove();
    });

    // Set new meta tags
    const meta = {
      description,
      keywords: "nottingham grade calculator, university of nottingham grade calculator, uk to us gpa, nottingham percentage to gpa, russell group grade calculator, nottingham grade conversion, uk degree classification gpa",
      author: "ZuraWebTools",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    };

    Object.entries(meta).forEach(([name, content]) => {
      const metaTag = document.createElement('meta');
      metaTag.name = name;
      metaTag.content = content;
      document.head.appendChild(metaTag);
    });

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: 'https://zurawebtools.com/og-nottingham-grade.png' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:locale', content: 'en_US' }
    ];

    document.querySelectorAll('meta[property^="og:"]').forEach(el => el.remove());
    ogTags.forEach(({ property, content }) => {
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', property);
      metaTag.content = content;
      document.head.appendChild(metaTag);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: 'https://zurawebtools.com/twitter-nottingham-grade.png' }
    ];

    document.querySelectorAll('meta[name^="twitter:"]').forEach(el => el.remove());
    twitterTags.forEach(({ name, content }) => {
      const metaTag = document.createElement('meta');
      metaTag.name = name;
      metaTag.content = content;
      document.head.appendChild(metaTag);
    });

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Structured Data - WebPage
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      }
    };

    // Structured Data - SoftwareApplication
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "University of Nottingham Grade Calculator",
      "applicationCategory": "EducationalApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "operatingSystem": "Web Browser"
    };

    // Structured Data - EducationalOrganization
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "University of Nottingham",
      "url": "https://www.nottingham.ac.uk",
      "sameAs": [
        "https://en.wikipedia.org/wiki/University_of_Nottingham"
      ]
    };

    // Structured Data - BreadcrumbList
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
          "name": "Education & Exam Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "University GPA Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "UK Universities",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "University of Nottingham Grade Calculator",
          "item": canonicalUrl
        }
      ]
    };

    // Structured Data - FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is this calculator official?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, this is an unofficial tool created for informational purposes. While we use Nottingham's official weighting system (0/33/67), final degree classifications are determined by the university's examination board and may consider additional factors beyond numerical calculations."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to enter Year 1 marks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While Year 1 marks don't count toward your final classification, you can still enter them for a complete academic record. The calculator will show your Year 1 average but won't include it in your weighted average or classification calculation."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the US GPA conversion?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide GPA ranges rather than exact values because there's no universal UK-to-US conversion standard. The ranges we use (e.g., First Class = 3.7-4.0) are widely accepted by US graduate schools and follow common conversion guidelines used by credential evaluation services."
          }
        },
        {
          "@type": "Question",
          "name": "What if I'm on a borderline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If your weighted average is within 1% of a classification boundary, the calculator will flag this as a borderline case. Nottingham's examination board automatically reviews borderline cases and may exercise discretion to award the higher classification based on your overall academic profile."
          }
        },
        {
          "@type": "Question",
          "name": "How many credits should I have per year?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most Nottingham undergraduate programs require 120 credits per year (360 credits total for a three-year degree). Modules typically range from 10 to 40 credits, with core modules often being 20 credits and dissertations 30-40 credits."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this for postgraduate programs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator is designed for undergraduate degrees only. Postgraduate programs (Master's, PhD) may use different grading systems and weighting structures. Check with your department for specific guidance."
          }
        },
        {
          "@type": "Question",
          "name": "What about international campuses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nottingham has campuses in Malaysia and China that may use slightly different grading systems. This calculator is based on the UK campus policies. International campus students should verify with their local academic office."
          }
        },
        {
          "@type": "Question",
          "name": "How do resit marks affect my GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Resit marks are typically capped at the pass mark (40% or 50% depending on your year). Enter the actual mark you received after the resit, and the calculator will process it normally. However, be aware that some universities or employers may look unfavorably on resit marks."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate my projected GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can enter your actual marks for completed years and estimated marks for future modules to see what final classification you're on track to achieve. This is helpful for setting academic goals and planning your study strategy."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I verify my official GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your official degree classification and transcript should be obtained from Nottingham's Student Services or your department's academic office. For applications requiring certified transcripts, contact the university directly."
          }
        }
      ]
    };

    // Remove existing schema scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());

    // Add new schema scripts
    const schemaScripts: HTMLScriptElement[] = [];
    [webPageSchema, softwareSchema, orgSchema, breadcrumbSchema, faqSchema].forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      schemaScripts.push(script);
    });

    // Cleanup function to prevent memory leaks
    return () => {
      // Remove meta tags
      document.querySelectorAll('meta[name="description"], meta[name="keywords"], meta[name="author"], meta[name="robots"]').forEach(el => el.remove());
      document.querySelectorAll('meta[property^="og:"]').forEach(el => el.remove());
      document.querySelectorAll('meta[name^="twitter:"]').forEach(el => el.remove());
      
      // Remove schema scripts
      schemaScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  // Helper Functions
  const percentageToGPA = useCallback((percentage: number): number => {
    // Midpoints for each range
    if (percentage >= 70) return 3.85; // First Class: 3.7-4.0
    if (percentage >= 60) return 3.35; // Upper Second (2:1): 3.0-3.7
    if (percentage >= 50) return 2.35; // Lower Second (2:2): 2.0-3.0
    if (percentage >= 40) return 1.5;  // Third Class: 1.0-2.0
    return 0.5; // Below 40: 0.0-1.0
  }, []);

  const getGPARange = useCallback((percentage: number): string => {
    if (percentage >= 70) return "3.7 - 4.0";
    if (percentage >= 60) return "3.0 - 3.7";
    if (percentage >= 50) return "2.0 - 3.0";
    if (percentage >= 40) return "1.0 - 2.0";
    return "0.0 - 1.0";
  }, []);

  const getClassification = useCallback((percentage: number): string => {
    if (percentage >= 70) return "First Class Honours";
    if (percentage >= 60) return "Upper Second Class Honours (2:1)";
    if (percentage >= 50) return "Lower Second Class Honours (2:2)";
    if (percentage >= 40) return "Third Class Honours";
    return "Fail";
  }, []);

  const isBorderlineScore = useCallback((percentage: number): boolean => {
    // Nottingham considers scores within 1% of classification boundary
    const boundaries = [70, 60, 50, 40];
    return boundaries.some(boundary => 
      Math.abs(percentage - boundary) <= 1 && percentage < boundary
    );
  }, []);

  // Module Management
  const addModule = useCallback(() => {
    const newModule: Module = {
      id: Date.now().toString(),
      name: '',
      credits: 20,
      percentage: 0,
      year: 1
    };
    setModules(prev => [...prev, newModule]);
  }, []);

  const removeModule = useCallback((id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
  }, []);

  const updateModule = useCallback((id: string, field: keyof Module, value: string | number) => {
    try {
      let sanitizedValue = value;
      
      // Sanitize string inputs
      if (field === 'name' && typeof value === 'string') {
        sanitizedValue = sanitizeInput(value);
      }
      
      // Validate numeric inputs
      if (field === 'percentage' && typeof value === 'number') {
        sanitizedValue = Math.max(0, Math.min(100, value)); // Clamp between 0-100
      }
      
      if (field === 'credits' && typeof value === 'number') {
        const validCredits = [10, 15, 20, 30, 40];
        if (!validCredits.includes(value)) {
          sanitizedValue = 20; // Default to 20 if invalid
        }
      }
      
      if (field === 'year' && typeof value === 'number') {
        sanitizedValue = Math.max(1, Math.min(3, value)); // Clamp between 1-3
      }
      
      setModules(prev => prev.map(m => 
        m.id === id ? { ...m, [field]: sanitizedValue } : m
      ));
      
      // Clear any previous errors
      setError(null);
    } catch (err) {
      setError('Failed to update module. Please try again.');
      console.error('Error updating module:', err);
    }
  }, [sanitizeInput]);

  // Clear all modules
  const clearAll = useCallback(() => {
    setModules([{ id: Date.now().toString(), name: '', credits: 20, percentage: 0, year: 1 }]);
    setResult(null);
    setShowSuccess(false);
  }, []);

  // Calculate Grade
  const calculateGPA = useCallback(() => {
    try {
      setIsCalculating(true);
      setShowSuccess(false);
      setError(null);

    setTimeout(() => {
      // Filter valid modules
      const validModules = modules.filter(m => 
        m.percentage > 0 && m.credits > 0
      );

      if (validModules.length === 0) {
        alert('Please add at least one module with valid marks and credits.');
        setIsCalculating(false);
        return;
      }

      // Separate by year
      const year1Modules = validModules.filter(m => m.year === 1);
      const year2Modules = validModules.filter(m => m.year === 2);
      const year3Modules = validModules.filter(m => m.year === 3);

      // Calculate year averages
      const calculateYearAverage = (yearModules: Module[]) => {
        if (yearModules.length === 0) return 0;
        const totalCredits = yearModules.reduce((sum, m) => sum + m.credits, 0);
        const weightedSum = yearModules.reduce((sum, m) => sum + (m.percentage * m.credits), 0);
        return totalCredits > 0 ? weightedSum / totalCredits : 0;
      };

      const year1Avg = calculateYearAverage(year1Modules);
      const year2Avg = calculateYearAverage(year2Modules);
      const year3Avg = calculateYearAverage(year3Modules);

      // Nottingham weighting: Year 1 = 0%, Year 2 = 33.33%, Year 3 = 66.67%
      const weightedAverage = (year2Avg * 0.3333) + (year3Avg * 0.6667);

      const classification = getClassification(weightedAverage);
      const usGPA = percentageToGPA(weightedAverage);
      const gpaRange = getGPARange(weightedAverage);
      const isBorderline = isBorderlineScore(weightedAverage);
      const totalCredits = validModules.reduce((sum, m) => sum + m.credits, 0);

      setResult({
        weightedAverage,
        classification,
        usGPA,
        gpaRange,
        isBorderline,
        totalCredits,
        year1Average: year1Avg,
        year2Average: year2Avg,
        year3Average: year3Avg
      });

      setIsCalculating(false);
      setShowSuccess(true);

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }, 800);
    } catch (err) {
      setError('Calculation failed. Please check your inputs and try again.');
      console.error('Calculation error:', err);
      setIsCalculating(false);
      setResult(null);
    }
  }, [modules, getClassification, percentageToGPA, getGPARange, isBorderlineScore]);

  // Download Results
  const downloadResults = useCallback(() => {
    if (!result) return;

    const content = `UNIVERSITY OF NOTTINGHAM GRADE CALCULATION RESULTS
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════════════
FINAL RESULTS
═══════════════════════════════════════════════════

Weighted Average: ${result.weightedAverage.toFixed(2)}%
UK Classification: ${result.classification}
US GPA: ${result.usGPA.toFixed(2)} / 4.0
GPA Range: ${result.gpaRange}
${result.isBorderline ? '⚠️ Borderline Case (within 1% of boundary)' : ''}

═══════════════════════════════════════════════════
YEAR BREAKDOWN
═══════════════════════════════════════════════════

Year 1 Average: ${result.year1Average.toFixed(2)}% (0% weighting - Not counted)
Year 2 Average: ${result.year2Average.toFixed(2)}% (33.33% weighting)
Year 3 Average: ${result.year3Average.toFixed(2)}% (66.67% weighting)

Total Credits Entered: ${result.totalCredits}

═══════════════════════════════════════════════════
MODULE DETAILS
═══════════════════════════════════════════════════

${modules.filter(m => m.percentage > 0).map(m => 
  `${m.name || 'Unnamed Module'} | Year ${m.year} | ${m.credits} credits | ${m.percentage}%`
).join('\n')}

═══════════════════════════════════════════════════
WEIGHTING SYSTEM
═══════════════════════════════════════════════════

University of Nottingham uses the following weighting:
• Year 1: 0% (Does not count towards final classification)
• Year 2: 33.33%
• Year 3: 66.67%

Final Weighted Average = (Year 2 × 0.3333) + (Year 3 × 0.6667)

═══════════════════════════════════════════════════
UK CLASSIFICATION BOUNDARIES
═══════════════════════════════════════════════════

First Class Honours: 70% and above
Upper Second (2:1): 60-69%
Lower Second (2:2): 50-59%
Third Class: 40-49%
Fail: Below 40%

═══════════════════════════════════════════════════
DISCLAIMER
═══════════════════════════════════════════════════

This is an UNOFFICIAL calculator for informational purposes only.
Not affiliated with the University of Nottingham.

Borderline policies and final classifications are determined by
the university's examination board and may consider additional factors.

Generated by ZuraWebTools.com
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Nottingham-Grade-Results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [result, modules]);

  // Print Results
  const printResults = useCallback(() => {
    if (!result) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write('<!DOCTYPE html>');
    printWindow.document.write(`
      <html>
      <head>
        <title>Nottingham GPA Results</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            color: #004d40;
            border-bottom: 3px solid #00796b;
            padding-bottom: 10px;
          }
          h2 {
            color: #00796b;
            margin-top: 30px;
          }
          .result-box {
            background: #f5f5f5;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #00796b;
          }
          .warning {
            background: #fff3cd;
            border-left-color: #ffc107;
            padding: 10px;
            margin: 10px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          th {
            background: #00796b;
            color: white;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #ddd;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <h1>University of Nottingham GPA Calculation Results</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>

        <h2>Final Results</h2>
        <div class="result-box">
          <p><strong>Weighted Average:</strong> ${result.weightedAverage.toFixed(2)}%</p>
          <p><strong>UK Classification:</strong> ${result.classification}</p>
          <p><strong>US GPA:</strong> ${result.usGPA.toFixed(2)} / 4.0</p>
          <p><strong>GPA Range:</strong> ${result.gpaRange}</p>
        </div>

        ${result.isBorderline ? '<div class="warning">⚠️ <strong>Borderline Case:</strong> Your score is within 1% of a classification boundary. The examination board may exercise discretion.</div>' : ''}

        <h2>Year Breakdown</h2>
        <table>
          <tr>
            <th>Year</th>
            <th>Average</th>
            <th>Weighting</th>
          </tr>
          <tr>
            <td>Year 1</td>
            <td>${result.year1Average.toFixed(2)}%</td>
            <td>0% (Not counted)</td>
          </tr>
          <tr>
            <td>Year 2</td>
            <td>${result.year2Average.toFixed(2)}%</td>
            <td>33.33%</td>
          </tr>
          <tr>
            <td>Year 3</td>
            <td>${result.year3Average.toFixed(2)}%</td>
            <td>66.67%</td>
          </tr>
        </table>

        <h2>Module Details</h2>
        <table>
          <tr>
            <th>Module Name</th>
            <th>Year</th>
            <th>Credits</th>
            <th>Percentage</th>
          </tr>
          ${modules.filter(m => m.percentage > 0).map(m => `
          <tr>
            <td>${m.name || 'Unnamed Module'}</td>
            <td>Year ${m.year}</td>
            <td>${m.credits}</td>
            <td>${m.percentage}%</td>
          </tr>
          `).join('')}
        </table>

        <div class="footer">
          <p><strong>DISCLAIMER:</strong> This is an unofficial calculator for informational purposes only. Not affiliated with the University of Nottingham. Final classifications are determined by the university's examination board.</p>
          <p>Generated by ZuraWebTools.com</p>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }, [result, modules]);

  // Share Results
  const shareResults = useCallback(async () => {
    if (!result) return;

    const shareText = `I calculated my University of Nottingham GPA: ${result.usGPA.toFixed(2)}/4.0 (${result.classification}) using ZuraWebTools!`;
    const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nottingham GPA Results',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Results copied to clipboard!');
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            University of Nottingham Grade Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-2">
            Convert your UK percentage marks to US GPA format with our accurate Russell Group calculator. Uses the official 0/33/67 weighting system.
          </p>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto">
            Free tool for international applications, graduate school admissions, and academic transcript conversion.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 mb-6 animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
                aria-label="Dismiss error"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Calculator Section */}
        <div id="calculator" className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-6">Enter Your Module Information</h2>

          <div className="space-y-4 mb-6">
            {modules.map((module, index) => (
              <div key={module.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Module {index + 1}</h3>
                  {modules.length > 1 && (
                    <button
                      onClick={() => removeModule(module.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                      aria-label={`Remove module ${index + 1}`}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor={`module-name-${module.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Module Name
                    </label>
                    <input
                      id={`module-name-${module.id}`}
                      type="text"
                      value={module.name}
                      onChange={(e) => updateModule(module.id, 'name', e.target.value)}
                      placeholder="e.g., Mathematics"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      aria-label={`Module ${index + 1} name`}
                    />
                  </div>

                  <div>
                    <label htmlFor={`module-year-${module.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <select
                      id={`module-year-${module.id}`}
                      value={module.year}
                      onChange={(e) => updateModule(module.id, 'year', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      aria-label={`Module ${index + 1} year`}
                    >
                      <option value={1}>Year 1</option>
                      <option value={2}>Year 2</option>
                      <option value={3}>Year 3</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`module-credits-${module.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Credits
                    </label>
                    <select
                      id={`module-credits-${module.id}`}
                      value={module.credits}
                      onChange={(e) => updateModule(module.id, 'credits', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      aria-label={`Module ${index + 1} credits`}
                    >
                      <option value={10}>10 credits</option>
                      <option value={15}>15 credits</option>
                      <option value={20}>20 credits</option>
                      <option value={30}>30 credits</option>
                      <option value={40}>40 credits</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`module-percentage-${module.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Percentage (%)
                    </label>
                    <input
                      id={`module-percentage-${module.id}`}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={module.percentage || ''}
                      onChange={(e) => updateModule(module.id, 'percentage', parseFloat(e.target.value) || 0)}
                      placeholder="0-100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900"
                      aria-label={`Module ${index + 1} percentage`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={addModule}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium transition-colors"
              aria-label="Add another module"
            >
              + Add Module
            </button>

            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 focus:ring-4 focus:ring-teal-300 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              aria-label="Calculate grade"
              aria-busy={isCalculating}
            >
              {isCalculating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="animate-pulse">Calculating your grade...</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calculate Grade
                </span>
              )}
            </button>

            <button
              onClick={clearAll}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium transition-colors"
              aria-label="Clear all modules"
            >
              Clear All
            </button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg animate-fade-in">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-green-800">
                  GPA calculated successfully! See results below.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div id="results-section" className="mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Results</h2>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Weighted Average Card */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Weighted Average</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-5xl font-bold mb-1">{result.weightedAverage.toFixed(2)}%</p>
                <p className="text-teal-100 text-sm">Based on 0/33/67 weighting system</p>
              </div>

              {/* US GPA Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">US GPA</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <p className="text-5xl font-bold mb-1">{result.usGPA.toFixed(2)}</p>
                <p className="text-emerald-100 text-sm">Range: {result.gpaRange}</p>
              </div>

              {/* Classification Card */}
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">UK Classification</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-3xl font-bold mb-2">{result.classification}</p>
                {result.isBorderline && (
                  <div className="bg-cyan-400 bg-opacity-30 rounded-lg p-3 mt-3">
                    <p className="text-sm font-medium">⚠️ Borderline Case Detected</p>
                    <p className="text-sm text-cyan-50 mt-1">
                      Your score is within 1% of a classification boundary. The examination board may exercise discretion in determining your final classification.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Year Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Year Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Year 1: {result.year1Average.toFixed(2)}% (0% weighting - Not counted)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gray-400 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(result.year1Average, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Year 2: {result.year2Average.toFixed(2)}% (33.33% weighting)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-teal-500 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(result.year2Average, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Year 3: {result.year3Average.toFixed(2)}% (66.67% weighting)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-emerald-600 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(result.year3Average, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={downloadResults}
                className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium transition-colors"
                aria-label="Download results as text file"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Results
              </button>

              <button
                onClick={printResults}
                className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium transition-colors"
                aria-label="Print results"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Results
              </button>

              <button
                onClick={shareResults}
                className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium transition-colors"
                aria-label="Share results"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Results
              </button>
            </div>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Unofficial Tool</p>
              <p className="text-sm text-amber-700">
                This calculator is not affiliated with the University of Nottingham. Final degree classifications are determined by the university's examination board and may consider additional factors beyond numerical calculations.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-8">
          <TableOfContents sections={[
            { id: 'calculator', title: 'Nottingham Grade Calculator', emoji: '🧮', subtitle: 'Convert UK marks to US GPA', gradientFrom: '#0d9488', gradientTo: '#10b981', hoverBorder: '#0d9488', hoverText: '#0d9488' },
            { id: 'grading-system', title: 'Nottingham Grading System', emoji: '📚', subtitle: 'UK classification boundaries', gradientFrom: '#14b8a6', gradientTo: '#10b981', hoverBorder: '#14b8a6', hoverText: '#14b8a6' },
            { id: 'how-to-use', title: 'How to Use This Calculator', emoji: '📝', subtitle: 'Step-by-step guide', gradientFrom: '#0d9488', gradientTo: '#06b6d4', hoverBorder: '#0d9488', hoverText: '#0d9488' },
            { id: 'understanding', title: 'Understanding the System', emoji: '🎓', subtitle: 'Nottingham weighting explained', gradientFrom: '#10b981', gradientTo: '#14b8a6', hoverBorder: '#10b981', hoverText: '#10b981' },
            { id: 'comparison', title: 'University Comparisons', emoji: '📊', subtitle: 'Compare with other UK universities', gradientFrom: '#0d9488', gradientTo: '#10b981', hoverBorder: '#0d9488', hoverText: '#0d9488' },
            { id: 'faqs', title: 'Frequently Asked Questions', emoji: '❓', subtitle: 'Common questions answered', gradientFrom: '#14b8a6', gradientTo: '#06b6d4', hoverBorder: '#14b8a6', hoverText: '#14b8a6' },
            { id: 'related-tools', title: 'Related Grade Calculators', emoji: '🔗', subtitle: 'Other university calculators', gradientFrom: '#10b981', gradientTo: '#0d9488', hoverBorder: '#10b981', hoverText: '#10b981' }
          ]} />
        </div>

        {/* Social Share Buttons */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Share This Calculator</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate your University of Nottingham GPA with this free tool!')}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-5 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>

            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator')}&title=${encodeURIComponent('University of Nottingham Grade Calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-5 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Calculate your University of Nottingham GPA: https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              aria-label="Share on WhatsApp"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>

            <a
              href={`https://reddit.com/submit?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator')}&title=${encodeURIComponent('University of Nottingham Grade Calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              aria-label="Share on Reddit"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              Reddit
            </a>
          </div>
        </div>

        {/* Key Information Box */}
        <div id="grading-system" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nottingham Grading System</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">UK Classification Boundaries</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">First Class Honours:</span>
                    <span className="text-gray-700"> 70% and above</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">Upper Second (2:1):</span>
                    <span className="text-gray-700"> 60-69%</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">Lower Second (2:2):</span>
                    <span className="text-gray-700"> 50-59%</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">Third Class:</span>
                    <span className="text-gray-700"> 40-49%</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">Fail:</span>
                    <span className="text-gray-700"> Below 40%</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Year Weighting</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">Year 1:</span>
                    <span className="text-gray-700"> 0% (Not counted)</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">Year 2:</span>
                    <span className="text-gray-700"> 33.33% weight</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-3 h-3 bg-emerald-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-gray-900">Year 3:</span>
                    <span className="text-gray-700"> 66.67% weight</span>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Year 1 marks do not count toward your final degree classification at Nottingham, but you must pass to progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Calculator</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Module Details</h3>
                <p className="text-gray-700">
                  Input your module name, select the year (1, 2, or 3), choose the credit value (typically 10, 15, 20, 30, or 40 credits), and enter your percentage mark for each module.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Add All Your Modules</h3>
                <p className="text-gray-700">
                  Click "Add Module" to enter additional modules. You can add as many modules as you need across all three years of your degree.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-700">
                  Click "Calculate Grade" to process your results. The calculator applies Nottingham's official 0/33/67 weighting system automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold mr-4">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Review Your Results</h3>
                <p className="text-gray-700">
                  View your weighted average, UK classification, US GPA, and year-by-year breakdown. You can download, print, or share your results for applications.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 Pro Tip:</strong> Most Nottingham students should aim for 120 credits per year. Standard modules are typically 10, 15, or 20 credits each, with dissertation modules often worth 30-40 credits.
            </p>
          </div>
        </div>

        {/* About Nottingham GPA System */}
        <div id="understanding" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding the University of Nottingham GPA System</h2>

          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">What Makes Nottingham's System Unique?</h3>
            <p className="text-gray-700 mb-4">
              The University of Nottingham uses a three-year undergraduate degree structure with a distinctive weighting system. Unlike some UK universities that count all years equally, Nottingham follows a <strong>0/33/67 model</strong> where your first year doesn't count toward your final classification, but you must pass it to progress.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Why Year 1 Doesn't Count</h3>
            <p className="text-gray-700 mb-4">
              Nottingham's policy of not counting Year 1 marks toward your final degree classification is designed to give students time to adjust to university-level study. This approach recognizes that students often need time to adapt to new teaching methods, independent learning, and higher academic standards. However, you still need to pass your first-year modules to continue your studies.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">The 0/33/67 Weighting Formula</h3>
            <p className="text-gray-700 mb-4">
              Your final degree classification is calculated using this formula:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-teal-500 mb-4">
              <p className="font-mono text-sm text-gray-800">
                <strong>Final Average = (Year 2 Average × 0.3333) + (Year 3 Average × 0.6667)</strong>
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              This means your final year carries twice the weight of your second year, reflecting the increased difficulty and specialization of final-year modules.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Russell Group Recognition</h3>
            <p className="text-gray-700 mb-4">
              As a member of the prestigious <strong>Russell Group</strong>, the University of Nottingham is recognized globally for academic excellence. The university is also part of the <strong>Sutton Trust 30</strong>, identifying it as one of the most selective UK universities. These distinctions mean Nottingham degrees carry significant weight in international applications and graduate school admissions.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Converting to US GPA</h3>
            <p className="text-gray-700 mb-4">
              When applying to US graduate schools or international programs, you'll need to convert your UK percentage marks to the 4.0 GPA scale. This calculator uses widely accepted conversion ranges:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>First Class (70%+):</strong> 3.7 - 4.0 GPA</li>
              <li><strong>Upper Second (60-69%):</strong> 3.0 - 3.7 GPA</li>
              <li><strong>Lower Second (50-59%):</strong> 2.0 - 3.0 GPA</li>
              <li><strong>Third Class (40-49%):</strong> 1.0 - 2.0 GPA</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Note that we provide GPA <strong>ranges</strong> rather than exact values because there's no universal conversion standard. Different institutions may interpret UK grades differently.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Borderline Policy</h3>
            <p className="text-gray-700 mb-4">
              If your weighted average falls within <strong>1% of a classification boundary</strong> (e.g., 69.0-69.9% for First Class), your case will be automatically reviewed by the examination board. The board has discretion to award the higher classification based on factors such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Profile of marks (improvement trend across years)</li>
              <li>Performance in core modules</li>
              <li>Academic circumstances and mitigating factors</li>
              <li>Overall academic record</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Nottingham's borderline policy is considered <strong>more generous</strong> than some other Russell Group universities, with the 1% threshold being wider than Oxford or Cambridge's approach.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div id="comparison" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Nottingham Compares to Other UK Universities</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold border border-teal-700">University</th>
                  <th className="px-4 py-3 text-left font-semibold border border-teal-700">Year 1 Weight</th>
                  <th className="px-4 py-3 text-left font-semibold border border-teal-700">Year 2 Weight</th>
                  <th className="px-4 py-3 text-left font-semibold border border-teal-700">Year 3 Weight</th>
                  <th className="px-4 py-3 text-left font-semibold border border-teal-700">Borderline Policy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-teal-50">
                  <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-300">Nottingham</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">0%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">33.33%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">66.67%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">Within 1%</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-300">Leeds</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">0%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">33.33%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">66.67%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">Discretionary</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-300">Manchester</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">0%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">25%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">75%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">Within 2%</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-300">Birmingham</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">0%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">40%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">60%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">Within 1%</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-300">Oxford</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">0%</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">Varies</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">Varies</td>
                  <td className="px-4 py-3 text-gray-700 border border-gray-300">Within 0.5%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Weighting systems can vary by faculty or degree program. Always check your specific program handbook for official policies.
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is this calculator official?</h3>
              <p className="text-gray-700">
                No, this is an <strong>unofficial tool</strong> created for informational purposes. While we use Nottingham's official weighting system (0/33/67), final degree classifications are determined by the university's examination board and may consider additional factors beyond numerical calculations.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do I need to enter Year 1 marks?</h3>
              <p className="text-gray-700">
                While Year 1 marks don't count toward your final classification, you can still enter them for a complete academic record. The calculator will show your Year 1 average but won't include it in your weighted average or classification calculation.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How accurate is the US GPA conversion?</h3>
              <p className="text-gray-700">
                We provide <strong>GPA ranges</strong> rather than exact values because there's no universal UK-to-US conversion standard. The ranges we use (e.g., First Class = 3.7-4.0) are widely accepted by US graduate schools and follow common conversion guidelines used by credential evaluation services.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What if I'm on a borderline?</h3>
              <p className="text-gray-700">
                If your weighted average is within 1% of a classification boundary, the calculator will flag this as a borderline case. Nottingham's examination board automatically reviews borderline cases and may exercise discretion to award the higher classification based on your overall academic profile.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How many credits should I have per year?</h3>
              <p className="text-gray-700">
                Most Nottingham undergraduate programs require <strong>120 credits per year</strong> (360 credits total for a three-year degree). Modules typically range from 10 to 40 credits, with core modules often being 20 credits and dissertations 30-40 credits.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I use this for postgraduate programs?</h3>
              <p className="text-gray-700">
                This calculator is designed for <strong>undergraduate degrees only</strong>. Postgraduate programs (Master's, PhD) may use different grading systems and weighting structures. Check with your department for specific guidance.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What about international campuses?</h3>
              <p className="text-gray-700">
                Nottingham has campuses in Malaysia and China that may use slightly different grading systems. This calculator is based on the <strong>UK campus</strong> policies. International campus students should verify with their local academic office.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do resit marks affect my GPA?</h3>
              <p className="text-gray-700">
                Resit marks are typically capped at the pass mark (40% or 50% depending on your year). Enter the actual mark you received after the resit, and the calculator will process it normally. However, be aware that some universities or employers may look unfavorably on resit marks.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I calculate my projected GPA?</h3>
              <p className="text-gray-700">
                Yes! You can enter your actual marks for completed years and estimated marks for future modules to see what final classification you're on track to achieve. This is helpful for setting academic goals and planning your study strategy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Where can I verify my official GPA?</h3>
              <p className="text-gray-700">
                Your official degree classification and transcript should be obtained from Nottingham's <strong>Student Services</strong> or your department's academic office. For applications requiring certified transcripts, contact the university directly.
              </p>
            </div>
          </div>
        </div>

        {/* Internal Links Section */}
        <div id="related-tools" className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl shadow-lg p-6 sm:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Grade Calculators</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/leeds-gpa-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Leeds Grade Calculator</h3>
              <p className="text-sm text-gray-600">Calculate Leeds University grades with UK weighting</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Manchester Grade Calculator</h3>
              <p className="text-sm text-gray-600">Calculate Manchester University grades with 0/25/75 weighting</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Birmingham Grade Calculator</h3>
              <p className="text-sm text-gray-600">Birmingham University grade converter tool</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk-gpa-guide')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">UK GPA Guide</h3>
              <p className="text-sm text-gray-600">Complete guide to UK grading systems</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/college-gpa-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">College GPA Calculator</h3>
              <p className="text-sm text-gray-600">General college GPA calculator for US students</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Cumulative GPA Calculator</h3>
              <p className="text-sm text-gray-600">Track your overall GPA across multiple terms</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/gpa-raise-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">GPA Raise Calculator</h3>
              <p className="text-sm text-gray-600">Plan how to improve your GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/high-school-gpa-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">High School GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate your high school GPA accurately</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/graduate-school-gpa-calculator')}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-left border border-gray-200 hover:border-teal-400"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Graduate School GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate graduate-level GPA for advanced degrees</p>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-4">
              Need help understanding UK vs US grading systems?
            </p>
            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools')}
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium transition-colors"
            >
              View All GPA Tools
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* External Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Official Resources & External Links</h2>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">University of Nottingham Official Website</h3>
              <p className="text-sm text-gray-600 mb-2">Visit the official university website for academic policies and degree regulations.</p>
              <a 
                href="https://www.nottingham.ac.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
              >
                Visit Website
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">Russell Group Universities</h3>
              <p className="text-sm text-gray-600 mb-2">Learn about the Russell Group and its member universities' academic standards.</p>
              <a 
                href="https://russellgroup.ac.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
              >
                Russell Group Info
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">WES Credential Evaluation</h3>
              <p className="text-sm text-gray-600 mb-2">Professional credential evaluation service for US university applications.</p>
              <a 
                href="https://www.wes.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
              >
                WES Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2">UCAS Tariff Points</h3>
              <p className="text-sm text-gray-600 mb-2">Understanding UK qualification comparisons and UCAS points system.</p>
              <a 
                href="https://www.ucas.com/ucas/tariff-calculator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-centers"
              >
                UCAS Calculator
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NottinghamGPACalculator;
