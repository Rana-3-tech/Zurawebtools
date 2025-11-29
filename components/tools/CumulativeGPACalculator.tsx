import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface CumulativeGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Semester {
  id: number;
  name: string;
  semesterGPA: number;
  creditsEarned: number;
}

const CumulativeGPACalculator: React.FC<CumulativeGPACalculatorProps> = ({ navigateTo }) => {
  // Constants
  const MAX_GPA = 4.0;
  const MIN_GPA = 0.0;
  const MAX_CREDITS = 30;
  const MIN_CREDITS = 0;

  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, name: 'Semester 1', semesterGPA: 0, creditsEarned: 0 },
    { id: 2, name: 'Semester 2', semesterGPA: 0, creditsEarned: 0 },
  ]);
  const [cumulativeGPA, setCumulativeGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [validationError, setValidationError] = useState<string>('');

  // Add semester
  const addSemester = () => {
    const newId = semesters.length > 0 ? Math.max(...semesters.map(s => s.id)) + 1 : 1;
    const semesterNumber = semesters.length + 1;
    setSemesters([...semesters, { 
      id: newId, 
      name: `Semester ${semesterNumber}`, 
      semesterGPA: 0, 
      creditsEarned: 0 
    }]);
  };

  // Remove semester
  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== id));
    }
  };

  // Update semester with improved validation
  const updateSemester = (id: number, field: keyof Semester, value: string | number) => {
    setValidationError('');
    
    if (field === 'semesterGPA') {
      const numValue = typeof value === 'number' ? value : parseFloat(value as string);
      // Check for NaN or invalid range
      if (isNaN(numValue)) {
        setValidationError('Please enter a valid GPA number');
        return;
      }
      if (numValue < MIN_GPA || numValue > MAX_GPA) {
        setValidationError(`GPA must be between ${MIN_GPA} and ${MAX_GPA}`);
        return;
      }
    }
    
    if (field === 'creditsEarned') {
      const numValue = typeof value === 'number' ? value : parseFloat(value as string);
      // Check for NaN or invalid range
      if (isNaN(numValue)) {
        setValidationError('Please enter a valid number of credits');
        return;
      }
      if (numValue < MIN_CREDITS || numValue > MAX_CREDITS) {
        setValidationError(`Credits must be between ${MIN_CREDITS} and ${MAX_CREDITS}`);
        return;
      }
    }
    
    setSemesters(semesters.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  // Calculate Cumulative GPA - Memoized for performance
  const calculateCumulativeGPA = useCallback(() => {
    const validSemesters = semesters.filter(s => s.semesterGPA > 0 && s.creditsEarned > 0);
    
    if (validSemesters.length === 0) {
      setCumulativeGPA(null);
      setTotalCredits(0);
      return;
    }

    // Cumulative GPA = Sum of (Semester GPA × Credits) / Total Credits
    const totalQualityPoints = validSemesters.reduce((sum, semester) => {
      return sum + (semester.semesterGPA * semester.creditsEarned);
    }, 0);

    const totalCreditsEarned = validSemesters.reduce((sum, s) => sum + s.creditsEarned, 0);
    
    if (totalCreditsEarned > 0) {
      // Use toFixed for precise rounding to avoid floating-point errors
      const calculatedGPA = parseFloat((totalQualityPoints / totalCreditsEarned).toFixed(2));
      setCumulativeGPA(calculatedGPA);
      setTotalCredits(totalCreditsEarned);
    }
  }, [semesters]);

  // Reset
  const resetAll = () => {
    setSemesters([
      { id: 1, name: 'Semester 1', semesterGPA: 0, creditsEarned: 0 },
      { id: 2, name: 'Semester 2', semesterGPA: 0, creditsEarned: 0 },
    ]);
    setCumulativeGPA(null);
    setTotalCredits(0);
  };

  // Print functionality with HTML sanitization and pop-up blocker detection
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups for this site to print your report.');
      return;
    }

    const validSemesters = semesters.filter(s => s.semesterGPA > 0 && s.creditsEarned > 0);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cumulative GPA Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .gpa-display { font-size: 24px; font-weight: bold; color: #3b82f6; text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .result { background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Cumulative GPA Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Semester</th>
                <th>Semester GPA</th>
                <th>Credits Earned</th>
                <th>Quality Points</th>
              </tr>
            </thead>
            <tbody>
              ${validSemesters.map(semester => {
                // Sanitize semester name to prevent XSS - escape all HTML entities
                const sanitizedName = semester.name
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
                const qualityPoints = semester.semesterGPA * semester.creditsEarned;
                return `
                <tr>
                  <td>${sanitizedName}</td>
                  <td>${semester.semesterGPA.toFixed(2)}</td>
                  <td>${semester.creditsEarned}</td>
                  <td>${qualityPoints.toFixed(2)}</td>
                </tr>
              `}).join('')}
            </tbody>
          </table>

          <div class="result">
            <h2>Results</h2>
            ${cumulativeGPA !== null ? `
              <div class="gpa-display">Cumulative GPA: ${cumulativeGPA.toFixed(2)} / 4.0</div>
              <p style="text-align: center;"><strong>Total Credits Earned:</strong> ${totalCredits}</p>
            ` : ''}
          </div>

          <p style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            Generated by ZuraWebTools - Cumulative GPA Calculator
          </p>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Download function
  const handleDownload = () => {
    const validSemesters = semesters.filter(s => s.semesterGPA > 0 && s.creditsEarned > 0);
    
    let content = 'CUMULATIVE GPA REPORT\n';
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    content += '═══════════════════════════════════════════════════════════\n\n';
    
    content += 'SEMESTER BREAKDOWN:\n\n';
    validSemesters.forEach(semester => {
      const qualityPoints = semester.semesterGPA * semester.creditsEarned;
      content += `${semester.name}:\n`;
      content += `  Semester GPA: ${semester.semesterGPA.toFixed(2)}\n`;
      content += `  Credits Earned: ${semester.creditsEarned}\n`;
      content += `  Quality Points: ${qualityPoints.toFixed(2)}\n\n`;
    });

    content += '═══════════════════════════════════════════════════════════\n\n';
    content += 'CUMULATIVE RESULTS:\n';
    content += `Cumulative GPA: ${cumulativeGPA?.toFixed(2) || 'N/A'} / 4.0\n`;
    content += `Total Credits Earned: ${totalCredits}\n\n`;
    content += '═══════════════════════════════════════════════════════════\n';
    content += 'Generated by ZuraWebTools\n';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cumulative_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SEO setup - Guard with useRef to run once per route
  const seoInitialized = React.useRef(false);

  useEffect(() => {
    if (seoInitialized.current) return;
    seoInitialized.current = true;

    document.title = "Cumulative GPA Calculator - Track Overall GPA | Free";

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Calculate your cumulative GPA across multiple semesters. Free cumulative GPA calculator for college and high school students. Track overall academic performance instantly.');
    setMeta('keywords', 'cumulative GPA calculator, calculate cumulative GPA, overall GPA calculator, college cumulative GPA, cumulative grade point average, semester GPA tracker, academic GPA calculator, GPA across semesters, total GPA calculator, lifetime GPA calculator');

    // Open Graph tags
    setMeta('og:title', 'Cumulative GPA Calculator - Track Overall GPA | Free Tool', true);
    setMeta('og:description', 'Free cumulative GPA calculator to track your overall academic performance across multiple semesters. Calculate cumulative GPA instantly with print/download options.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator', true);
    setMeta('og:image', 'https://zurawebtools.com/og-cumulative-gpa-calculator.png', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Cumulative GPA Calculator - Track Overall GPA');
    setMeta('twitter:description', 'Calculate your cumulative GPA across all semesters. Free tool with instant results.');
    setMeta('twitter:image', 'https://zurawebtools.com/og-cumulative-gpa-calculator.png');

    // Canonical link (fixed to use absolute URL)
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator';

    // JSON-LD structured data
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'Cumulative GPA Calculator',
          'description': 'Free online cumulative GPA calculator to track overall academic performance across multiple semesters for college and high school students.',
          'url': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'Any',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'featureList': [
            'Calculate cumulative GPA across multiple semesters',
            'Track total credits earned',
            'Print GPA reports',
            'Download results as text file',
            'Mobile-optimized interface',
            'Instant GPA calculations'
          ]
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://zurawebtools.com'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Education & Exam Tools',
              'item': 'https://zurawebtools.com/education-and-exam-tools'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': 'GPA Tools',
              'item': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools'
            },
            {
              '@type': 'ListItem',
              'position': 4,
              'name': 'Cumulative GPA Calculator',
              'item': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What is cumulative GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Cumulative GPA is your overall grade point average calculated across all semesters or terms you have completed. It represents your total academic performance throughout your entire academic career, not just a single semester.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How is cumulative GPA calculated?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Cumulative GPA is calculated by dividing the total quality points earned (sum of each semester GPA multiplied by credits earned) by the total number of credits earned across all semesters. Formula: Cumulative GPA = Total Quality Points / Total Credits.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is the difference between semester GPA and cumulative GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Semester GPA is your grade point average for a single term, while cumulative GPA is your overall GPA across all completed semesters. Cumulative GPA gives a broader view of your long-term academic performance.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can cumulative GPA go down?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, cumulative GPA can decrease if you earn a semester GPA lower than your current cumulative GPA. However, it becomes harder to change cumulative GPA as you complete more credits because more semesters contribute to the overall average.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is a good cumulative GPA for college?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'A cumulative GPA of 3.0 or higher is generally considered good for college. A 3.5+ is excellent and competitive for graduate schools and scholarships. Requirements vary by institution, major, and career goals.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do colleges look at cumulative GPA or semester GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Colleges primarily focus on cumulative GPA as it reflects overall academic performance. However, they also review semester GPAs to identify trends, improvement, or decline in academic performance over time.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How can I raise my cumulative GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'To raise cumulative GPA, earn higher semester GPAs in future terms, take additional courses to add more credits with better grades, and consider retaking courses where you received low grades if your institution allows grade replacement.'
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    // Notify search engines
    notifyIndexNow('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator');

    return () => {
      const metas = document.querySelectorAll('meta[name^="description"], meta[name^="keywords"], meta[property^="og:"], meta[name^="twitter:"]');
      metas.forEach(meta => meta.remove());
      if (canonical) canonical.remove();
      if (script) script.remove();
    };
  }, []);

  // Table of Contents sections
  const tocSections: TOCSection[] = [
    { id: 'calculator', title: 'GPA Calculator', emoji: '🧮', subtitle: 'Calculate cumulative GPA', gradientFrom: '#3b82f6', gradientTo: '#06b6d4', hoverBorder: 'border-blue-500', hoverText: 'text-blue-600' },
    { id: 'examples', title: 'Quick Examples', emoji: '⚡', subtitle: 'Sample calculations', gradientFrom: '#8b5cf6', gradientTo: '#ec4899', hoverBorder: 'border-purple-500', hoverText: 'text-purple-600' },
    { id: 'benefits', title: 'Benefits', emoji: '✨', subtitle: 'Why use this tool', gradientFrom: '#10b981', gradientTo: '#3b82f6', hoverBorder: 'border-green-500', hoverText: 'text-green-600' },
    { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: '#f59e0b', gradientTo: '#ef4444', hoverBorder: 'border-orange-500', hoverText: 'text-orange-600' },
    { id: 'use-cases', title: 'Use Cases', emoji: '🎯', subtitle: 'Who uses this', gradientFrom: '#06b6d4', gradientTo: '#8b5cf6', hoverBorder: 'border-cyan-500', hoverText: 'text-cyan-600' },
    { id: 'about', title: 'About', emoji: '📚', subtitle: 'Understanding cumulative GPA', gradientFrom: '#ec4899', gradientTo: '#f59e0b', hoverBorder: 'border-pink-500', hoverText: 'text-pink-600' },
    { id: 'faq', title: 'FAQs', emoji: '❓', subtitle: 'Common questions', gradientFrom: '#ef4444', gradientTo: '#10b981', hoverBorder: 'border-red-500', hoverText: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cumulative GPA Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Calculate your cumulative GPA across multiple semesters with our free online calculator. 
            Track your overall academic performance and total credits earned instantly. Perfect for college 
            and high school students monitoring their lifetime GPA.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div id="calculator" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🧮</span>
            Calculate Your Cumulative GPA
          </h2>

          {validationError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 rounded-lg">
              ⚠️ {validationError}
            </div>
          )}

          <div className="space-y-4 mb-6">
            {semesters.map((semester, index) => (
              <div key={semester.id} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <label htmlFor={`semester-name-${semester.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Semester Name
                  </label>
                  <input
                    id={`semester-name-${semester.id}`}
                    type="text"
                    value={semester.name}
                    onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-gray-900"
                    placeholder="e.g., Fall 2024"
                    aria-label={`Semester ${index + 1} name`}
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor={`semester-gpa-${semester.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Semester GPA (0.0 - 4.0)
                  </label>
                  <input
                    id={`semester-gpa-${semester.id}`}
                    type="number"
                    min="0"
                    max="4.0"
                    step="0.01"
                    value={semester.semesterGPA || ''}
                    onChange={(e) => updateSemester(semester.id, 'semesterGPA', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-gray-900"
                    placeholder="3.50"
                    aria-label={`Semester ${index + 1} GPA`}
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor={`semester-credits-${semester.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Credits Earned
                  </label>
                  <input
                    id={`semester-credits-${semester.id}`}
                    type="number"
                    min="0"
                    max="30"
                    step="0.5"
                    value={semester.creditsEarned || ''}
                    onChange={(e) => updateSemester(semester.id, 'creditsEarned', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-gray-900"
                    placeholder="15"
                    aria-label={`Semester ${index + 1} credits earned`}
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => removeSemester(semester.id)}
                    disabled={semesters.length === 1}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Remove semester ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={addSemester}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all font-medium"
            >
              + Add Semester
            </button>
            <button
              onClick={calculateCumulativeGPA}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all font-medium shadow-md"
            >
              Calculate Cumulative GPA
            </button>
            <button
              onClick={resetAll}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-all font-medium"
            >
              Reset
            </button>
          </div>

          {cumulativeGPA !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">Your Cumulative GPA</p>
                <p className="text-5xl font-bold mb-2">{cumulativeGPA.toFixed(2)}</p>
                <p className="text-xl">out of 4.0</p>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <p className="text-lg">
                    <span className="font-semibold">Total Credits Earned:</span> {totalCredits}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  🖨️ Print Report
                </button>
                <button
                  onClick={handleDownload}
                  className="px-5 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  📥 Download TXT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <div className="mb-8">
          <TableOfContents sections={tocSections} />
        </div>

        {/* Social Share Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Share This Tool
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Calculate your cumulative GPA with this free tool!&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] focus:ring-2 focus:ring-[#1DA1F2] focus:ring-offset-2 transition-all font-medium"
              aria-label="Share on Twitter (opens in new tab)"
            >
              🐦 Share on Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] focus:ring-2 focus:ring-[#4267B2] focus:ring-offset-2 transition-all font-medium"
              aria-label="Share on Facebook (opens in new tab)"
            >
              📘 Share on Facebook
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#006399] focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 transition-all font-medium"
              aria-label="Share on LinkedIn (opens in new tab)"
            >
              💼 Share on LinkedIn
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-all font-medium"
              aria-label="Copy link to clipboard"
            >
              🔗 Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="examples" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Quick Examples
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3.75</div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Excellent Performance</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Sem 1: 3.8 GPA × 15 credits<br/>
                Sem 2: 3.7 GPA × 15 credits<br/>
                = 3.75 cumulative GPA
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3.25</div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Good Performance</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Sem 1: 3.0 GPA × 12 credits<br/>
                Sem 2: 3.5 GPA × 15 credits<br/>
                = 3.28 cumulative GPA
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">3.50</div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Steady Progress</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                4 semesters × 3.5 GPA<br/>
                15 credits each term<br/>
                = 3.50 cumulative GPA
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ✨ Benefits of Using This Calculator
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Track Academic Progress</h3>
              <p>Monitor your cumulative GPA across all semesters to see your overall academic trajectory and identify areas for improvement.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Set GPA Goals</h3>
              <p>Plan what grades you need in future semesters to reach your target cumulative GPA for graduation, scholarships, or graduate school.</p>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-2">Scholarship Eligibility</h3>
              <p>Verify if your cumulative GPA meets scholarship requirements and track your eligibility for merit-based financial aid programs.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-red-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
              <p>Calculate your cumulative GPA on any device. Our responsive design works perfectly on smartphones, tablets, and desktops.</p>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📖 How to Use the Cumulative GPA Calculator
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Enter Semesters</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Input your semester names, GPA, and credits earned for each completed term.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Add More Terms</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Click "Add Semester" to include additional terms in your cumulative GPA calculation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Calculate GPA</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Click "Calculate Cumulative GPA" to see your overall GPA and total credits earned.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Export Results</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Print or download your cumulative GPA report for your records or applications.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📐 Calculation Example</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="font-semibold">Example: Calculate cumulative GPA for 3 semesters</p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2 font-mono text-sm">
                <p>Semester 1: 3.8 GPA × 15 credits = 57.0 quality points</p>
                <p>Semester 2: 3.5 GPA × 15 credits = 52.5 quality points</p>
                <p>Semester 3: 3.6 GPA × 12 credits = 43.2 quality points</p>
                <p className="border-t border-gray-300 dark:border-gray-600 pt-2">Total: 152.7 quality points ÷ 42 credits</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">Cumulative GPA = 3.64</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div id="use-cases" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🎯 Who Uses This Calculator?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">🎓</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">College Students</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Track cumulative GPA across multiple semesters for graduation requirements, dean's list eligibility, 
                and graduate school applications. Essential for monitoring academic standing.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">📚</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">High School Students</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Calculate overall high school GPA for college applications and scholarship opportunities. 
                Monitor academic progress across all four years of high school.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">💼</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transfer Students</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Combine GPAs from multiple institutions to calculate overall cumulative GPA for transfer 
                applications and verify transfer credit impact on academic standing.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">👨‍🏫</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Academic Advisors</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Help students understand their cumulative GPA trajectory, set realistic academic goals, 
                and plan course loads to maintain or improve overall academic performance.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Cumulative GPA Calculation
          </h2>
          
          <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The <strong>Cumulative GPA Calculator</strong> is a free online tool designed to help students calculate 
              their overall grade point average across multiple semesters or academic terms. Unlike semester GPA which 
              measures performance in a single term, cumulative GPA represents your total academic achievement throughout 
              your entire educational journey.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              What is Cumulative Grade Point Average?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Cumulative GPA is calculated by dividing the total <strong>quality points</strong> earned across all 
              semesters by the total number of <strong>credit hours</strong> attempted. Quality points are calculated 
              by multiplying your semester GPA by the credits earned in that term. This weighted average ensures that 
              semesters with more credits have a greater impact on your overall GPA.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Free Cumulative GPA Tracker for Academic Success
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our calculator is completely free and designed for both <strong>high school students</strong> and 
              <strong> college students</strong> tracking their academic progress. Whether you're monitoring your 
              GPA for <a href="/education-and-exam-tools/gpa-tools/college-admissions-calculator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">college admissions</a>, 
              scholarship eligibility, or graduate school applications, this tool provides instant and accurate results. 
              The calculator supports up to 20 semesters, making it perfect for tracking multi-year academic performance.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Why Cumulative GPA Matters for Students
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your cumulative GPA is one of the most important metrics in higher education. It determines your 
              <strong> academic standing</strong>, eligibility for <strong>honor societies</strong> like Phi Beta Kappa, 
              qualification for <strong>merit-based scholarships</strong>, and admission to competitive graduate programs. 
              Many employers also request cumulative GPA information during the hiring process, especially for entry-level 
              positions requiring recent graduates.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              How to Calculate Cumulative GPA: Step-by-Step
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The formula for cumulative GPA is straightforward: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              Cumulative GPA = Total Quality Points ÷ Total Credits Earned</code>. To find total quality points, 
              multiply each semester's GPA by its credit hours, then sum all values. Our <a href="/education-and-exam-tools/gpa-tools/semester-gpa-calculator" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">semester GPA calculator</a> can 
              help you calculate individual term GPAs before combining them into your cumulative average.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Cumulative vs. Semester GPA: Key Differences
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              While <strong>semester GPA</strong> reflects your academic performance in a single term, cumulative GPA 
              provides a broader view of your overall academic achievement. Semester GPA can fluctuate significantly 
              based on course difficulty and workload, but cumulative GPA changes more gradually as it incorporates 
              all completed coursework. Students often use both metrics together to identify trends in their academic 
              performance and set improvement goals.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Using GPA Calculator for Long-Term Planning
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Strategic GPA management is crucial for achieving your academic goals. Our calculator helps you understand 
              how future semesters will impact your cumulative GPA, allowing you to plan <strong>course selection</strong> 
              and <strong>study strategies</strong> effectively. By tracking your GPA trends over time, you can identify 
              whether you need to adjust your academic approach, seek tutoring support, or reduce course load to maintain 
              a competitive cumulative GPA for your career aspirations.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6 mt-8 border-l-4 border-blue-500">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 GPA Scale Standards</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <p className="font-semibold mb-1">🇺🇸 United States:</p>
                  <p>4.0 scale (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0)</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🌍 International Standards:</p>
                  <p>Most institutions convert to 4.0 scale equivalents</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                <strong>Pro Tip:</strong> Most graduate schools and employers expect cumulative GPA on the 4.0 scale. 
                If your institution uses a different scale, use our conversion tools to standardize your GPA reporting.
              </p>
            </div>
          </div>
        </div>

        {/* External Links Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔗 External Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.collegeboard.org/admission-and-aid/understanding-gpa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">📖</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">College Board - Understanding GPA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Official guide to GPA systems</div>
              </div>
            </a>

            <a
              href="https://www.nacac.org/knowledge-center/college-planning-resources/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">🎓</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">NACAC College Planning</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Academic planning resources</div>
              </div>
            </a>

            <a
              href="https://www.usnews.com/education/best-colleges/articles/what-is-a-good-college-gpa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">US News - Good College GPA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">GPA benchmarks and standards</div>
              </div>
            </a>

            <a
              href="https://bigfuture.collegeboard.org/plan-for-college/college-basics/how-to-convert-gpa-to-a-4-0-scale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">🔢</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">GPA Scale Conversion</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Convert GPA to 4.0 scale</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          Last Updated: November 29, 2025
        </div>

        {/* FAQ Section */}
        <div id="faq" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ❓ Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                What is cumulative GPA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cumulative GPA is your overall grade point average calculated across all semesters or terms you have 
                completed. It represents your total academic performance throughout your entire academic career, not 
                just a single semester.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                How is cumulative GPA calculated?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cumulative GPA is calculated by dividing the total quality points earned (sum of each semester GPA 
                multiplied by credits earned) by the total number of credits earned across all semesters. Formula: 
                Cumulative GPA = Total Quality Points / Total Credits.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                What is the difference between semester GPA and cumulative GPA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Semester GPA is your grade point average for a single term, while cumulative GPA is your overall GPA 
                across all completed semesters. Cumulative GPA gives a broader view of your long-term academic performance.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Can cumulative GPA go down?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, cumulative GPA can decrease if you earn a semester GPA lower than your current cumulative GPA. 
                However, it becomes harder to change cumulative GPA as you complete more credits because more semesters 
                contribute to the overall average.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                What is a good cumulative GPA for college?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A cumulative GPA of 3.0 or higher is generally considered good for college. A 3.5+ is excellent and 
                competitive for graduate schools and scholarships. Requirements vary by institution, major, and career goals.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Do colleges look at cumulative GPA or semester GPA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Colleges primarily focus on cumulative GPA as it reflects overall academic performance. However, they 
                also review semester GPAs to identify trends, improvement, or decline in academic performance over time.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                How can I raise my cumulative GPA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To raise cumulative GPA, earn higher semester GPAs in future terms, take additional courses to add more 
                credits with better grades, and consider retaking courses where you received low grades if your institution 
                allows grade replacement.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mb-8">
          <RelatedTools 
            relatedSlugs={['college-gpa-calculator', 'semester-gpa-calculator', 'weighted-gpa-calculator', 'unweighted-gpa-calculator']} 
            navigateTo={navigateTo} 
            currentSlug="cumulative-gpa-calculator"
          />
        </div>

      </div>
    </div>
  );
};

export default CumulativeGPACalculator;
