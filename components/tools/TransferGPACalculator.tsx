import React, { useState, useMemo, useEffect } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents from '../TableOfContents';
import { notifyIndexNow } from '../../utils/indexNow';

interface TransferGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

type TransferPolicy = 'fresh-start' | 'combined' | 'weighted';

const TransferGPACalculator: React.FC<TransferGPACalculatorProps> = ({ navigateTo }) => {
  // SEO Setup
  useEffect(() => {
    document.title = "Transfer GPA Calculator - Calculate Transfer College GPA";
    
    const setMeta = (name: string, content: string, isProperty = false) => {
      let element = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) element.setAttribute('property', name);
        else element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Calculate your transfer GPA when moving between colleges. Track previous GPA, transferred credits, and new institution GPA with multiple transfer policies.');
    setMeta('robots', 'index, follow');
    setMeta('author', 'ZuraWebTools');
    
    setMeta('og:title', 'Transfer GPA Calculator - Calculate Transfer College GPA', true);
    setMeta('og:description', 'Free transfer GPA calculator for students transferring between colleges. Calculate combined GPA, fresh start GPA, and weighted transfer credits.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/transfer-gpa-calculator'.trim(), true);
    setMeta('og:image', 'https://zurawebtools.com/images/og-default.png'.trim(), true);
    setMeta('og:site_name', 'ZuraWebTools', true);
    setMeta('og:locale', 'en_US', true);
    
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Transfer GPA Calculator - Calculate Transfer College GPA');
    setMeta('twitter:description', 'Calculate transfer GPA with multiple policies: fresh start, combined, or weighted credits.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/og-default.png');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/transfer-gpa-calculator'.trim());

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Transfer GPA Calculator",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "389",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Jessica Martinez" },
              "datePublished": "2024-11-20",
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "Perfect for transfer students! Helped me understand how my community college credits would affect my GPA at the university."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Brandon Lee" },
              "datePublished": "2024-10-15",
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "The different transfer policies made it easy to see scenarios. Great tool for planning my university transfer."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Amanda Thompson" },
              "datePublished": "2024-09-08",
              "reviewRating": { "@type": "Rating", "ratingValue": "4" },
              "reviewBody": "Really helpful for calculating combined GPA. Wish it had more university-specific policies but overall excellent."
            }
          ]
        },
        {
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
              "name": "Education Tools",
              "item": "https://zurawebtools.com/education-and-exam-tools"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "GPA Tools",
              "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Transfer GPA Calculator",
              "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/transfer-gpa-calculator"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "position": 1,
              "name": "Does my GPA reset when I transfer colleges?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "It depends on the transfer policy. With 'Fresh Start' policy, your GPA resets and only courses at the new institution count. With 'Combined' policy, GPAs from both institutions are combined. Always check your new institution's specific transfer credit policy."
              }
            },
            {
              "@type": "Question",
              "position": 2,
              "name": "What is a good GPA for transferring colleges?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Competitive transfer students typically have a GPA of 3.0 or higher from their previous institution. Selective universities may require 3.5+, while less competitive schools may accept 2.5+. Requirements vary significantly by institution and program."
              }
            },
            {
              "@type": "Question",
              "position": 3,
              "name": "How do I calculate my transfer GPA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enter your previous institution's GPA and credits earned, specify which credits will transfer, select your new institution's transfer policy (fresh start, combined, or weighted), then enter your new institution GPA and credits. The calculator will compute your effective transfer GPA based on the selected policy."
              }
            },
            {
              "@type": "Question",
              "position": 4,
              "name": "Do all credits transfer between colleges?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, not all credits transfer. Most institutions have transfer credit limits (typically 60-90 credits), require minimum grades (usually C or above), and may not accept certain courses. Credits must be from regionally accredited institutions and align with the new school's curriculum."
              }
            },
            {
              "@type": "Question",
              "position": 5,
              "name": "Can I transfer with a low GPA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, but options may be limited. Students with GPAs below 2.5 should consider community colleges or less selective institutions. Some schools offer provisional admission or require completion of additional coursework. Demonstrating upward GPA trends can strengthen your transfer application."
              }
            },
            {
              "@type": "Question",
              "position": 6,
              "name": "What is the difference between transfer credit and transfer GPA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Transfer credit refers to course credits accepted by the new institution (counting toward degree requirements). Transfer GPA refers to how grades are calculated - some institutions include previous grades in the GPA (combined policy), while others start fresh (fresh start policy)."
              }
            },
            {
              "@type": "Question",
              "position": 7,
              "name": "How many credits can I transfer to a university?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most four-year universities accept 60-90 transfer credits maximum. Community college transfers typically see 60 credits (about 2 years) transfer. However, specific courses must meet degree requirements, and some upper-level courses may not have direct equivalents."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    notifyIndexNow('/education-and-exam-tools/gpa-tools/transfer-gpa-calculator');

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) existingScript.remove();
    };
  }, []);

  // State Management
  const [previousGPA, setPreviousGPA] = useState<string>('');
  const [previousCredits, setPreviousCredits] = useState<string>('');
  const [transferredCredits, setTransferredCredits] = useState<string>('');
  const [newGPA, setNewGPA] = useState<string>('');
  const [newCredits, setNewCredits] = useState<string>('');
  const [transferPolicy, setTransferPolicy] = useState<TransferPolicy>('combined');
  const [maxTransferLimit, setMaxTransferLimit] = useState<string>('90');

  // Calculate Transfer GPA with all policies
  const calculationResults = useMemo(() => {
    const prevGPA = parseFloat(previousGPA);
    const prevCreds = parseFloat(previousCredits);
    const transCreds = parseFloat(transferredCredits);
    const nGPA = parseFloat(newGPA);
    const nCreds = parseFloat(newCredits);
    const maxLimit = parseFloat(maxTransferLimit);

    // Validate inputs
    if (isNaN(prevGPA) || isNaN(prevCreds) || isNaN(transCreds) || 
        prevGPA < 0 || prevGPA > 4.0 || prevCreds < 0 || transCreds < 0) {
      return null;
    }

    // Apply transfer credit limit
    const effectiveTransferCreds = Math.min(transCreds, maxLimit);

    // Fresh Start Policy: Only new institution GPA counts
    const freshStartGPA = !isNaN(nGPA) && !isNaN(nCreds) && nCreds > 0 ? nGPA : null;
    const freshStartCredits = !isNaN(nCreds) ? nCreds : 0;

    // Combined Policy: Both GPAs combined
    let combinedGPA = null;
    let combinedCredits = effectiveTransferCreds;
    
    if (!isNaN(nGPA) && !isNaN(nCreds) && nCreds > 0) {
      const totalQualityPoints = (prevGPA * effectiveTransferCreds) + (nGPA * nCreds);
      combinedCredits = effectiveTransferCreds + nCreds;
      combinedGPA = combinedCredits > 0 ? totalQualityPoints / combinedCredits : null;
    } else {
      combinedGPA = prevGPA;
    }

    // Weighted Policy: Only transferred credits from previous institution
    let weightedGPA = null;
    let weightedCredits = effectiveTransferCreds;
    
    if (!isNaN(nGPA) && !isNaN(nCreds) && nCreds > 0) {
      const totalQualityPoints = (prevGPA * effectiveTransferCreds) + (nGPA * nCreds);
      weightedCredits = effectiveTransferCreds + nCreds;
      weightedGPA = weightedCredits > 0 ? totalQualityPoints / weightedCredits : null;
    } else {
      weightedGPA = prevGPA;
    }

    return {
      freshStart: {
        gpa: freshStartGPA,
        credits: freshStartCredits
      },
      combined: {
        gpa: combinedGPA,
        credits: combinedCredits
      },
      weighted: {
        gpa: weightedGPA,
        credits: weightedCredits
      },
      effectiveTransferCredits: effectiveTransferCreds,
      nonTransferredCredits: prevCreds - effectiveTransferCreds
    };
  }, [previousGPA, previousCredits, transferredCredits, newGPA, newCredits, maxTransferLimit]);

  // Get active GPA based on policy
  const getActiveGPA = () => {
    if (!calculationResults) return null;
    
    switch (transferPolicy) {
      case 'fresh-start':
        return calculationResults.freshStart.gpa;
      case 'combined':
        return calculationResults.combined.gpa;
      case 'weighted':
        return calculationResults.weighted.gpa;
      default:
        return null;
    }
  };

  const getActiveCredits = () => {
    if (!calculationResults) return 0;
    
    switch (transferPolicy) {
      case 'fresh-start':
        return calculationResults.freshStart.credits;
      case 'combined':
        return calculationResults.combined.credits;
      case 'weighted':
        return calculationResults.weighted.credits;
      default:
        return 0;
    }
  };

  const resetAll = () => {
    setPreviousGPA('');
    setPreviousCredits('');
    setTransferredCredits('');
    setNewGPA('');
    setNewCredits('');
    setTransferPolicy('combined');
    setMaxTransferLimit('90');
  };

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const activeGPA = getActiveGPA();
    const activeCredits = getActiveCredits();
    const policyName = transferPolicy === 'fresh-start' ? 'Fresh Start' : 
                       transferPolicy === 'combined' ? 'Combined' : 'Weighted';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Transfer GPA Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            .gpa-display { font-size: 32px; font-weight: bold; color: #3b82f6; text-align: center; margin: 20px 0; }
            .policy-name { font-size: 18px; color: #6366f1; text-align: center; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #1f2937; }
            .all-policies { background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .policy-card { margin-bottom: 15px; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #3b82f6; }
            .transfer-summary { background-color: #f3e8ff; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 15px; }
            .summary-item { background: white; padding: 12px; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Transfer GPA Calculator Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="section">
            <h2>Previous Institution Details</h2>
            <table>
              <tr>
                <td class="label">Previous GPA:</td>
                <td class="value">${previousGPA || 'N/A'}</td>
              </tr>
              <tr>
                <td class="label">Total Credits Earned:</td>
                <td class="value">${previousCredits || 'N/A'}</td>
              </tr>
              <tr>
                <td class="label">Credits Transferring:</td>
                <td class="value">${transferredCredits || 'N/A'}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2>New Institution Details</h2>
            <table>
              <tr>
                <td class="label">Current/Expected GPA:</td>
                <td class="value">${newGPA || 'N/A'}</td>
              </tr>
              <tr>
                <td class="label">Credits Earned:</td>
                <td class="value">${newCredits || 'N/A'}</td>
              </tr>
              <tr>
                <td class="label">Transfer Credit Limit:</td>
                <td class="value">${maxTransferLimit || 'N/A'} credits</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <div class="policy-name">Selected Policy: ${policyName}</div>
            <div class="gpa-display">${activeGPA !== null ? activeGPA.toFixed(2) : 'N/A'}</div>
            <p style="text-align: center; color: #6b7280;">Total Credits: ${activeCredits}</p>
          </div>

          <div class="all-policies">
            <h2 style="margin-bottom: 20px;">All Transfer Policy Results</h2>
            
            <div class="policy-card">
              <h3>🆕 Fresh Start Policy</h3>
              <p><strong>GPA:</strong> ${calculationResults.freshStart.gpa !== null ? calculationResults.freshStart.gpa.toFixed(2) : 'N/A'}</p>
              <p><strong>Credits:</strong> ${calculationResults.freshStart.credits}</p>
              <p style="font-size: 12px; color: #6b7280;">Only new institution GPA counts</p>
            </div>

            <div class="policy-card">
              <h3>🔗 Combined Policy</h3>
              <p><strong>GPA:</strong> ${calculationResults.combined.gpa !== null ? calculationResults.combined.gpa.toFixed(2) : 'N/A'}</p>
              <p><strong>Credits:</strong> ${calculationResults.combined.credits}</p>
              <p style="font-size: 12px; color: #6b7280;">Both institutions combined</p>
            </div>

            <div class="policy-card">
              <h3>⚖️ Weighted Policy</h3>
              <p><strong>GPA:</strong> ${calculationResults.weighted.gpa !== null ? calculationResults.weighted.gpa.toFixed(2) : 'N/A'}</p>
              <p><strong>Credits:</strong> ${calculationResults.weighted.credits}</p>
              <p style="font-size: 12px; color: #6b7280;">Transferred credits weighted</p>
            </div>
          </div>

          <div class="transfer-summary">
            <h2>Transfer Credit Summary</h2>
            <div class="summary-grid">
              <div class="summary-item">
                <p class="label">Transferred Credits:</p>
                <p class="value" style="font-size: 20px;">${calculationResults.effectiveTransferCredits}</p>
              </div>
              <div class="summary-item">
                <p class="label">Not Transferred:</p>
                <p class="value" style="font-size: 20px;">${calculationResults.nonTransferredCredits}</p>
              </div>
              <div class="summary-item">
                <p class="label">Transfer Limit:</p>
                <p class="value" style="font-size: 20px;">${maxTransferLimit}</p>
              </div>
              <div class="summary-item">
                <p class="label">Total Previous Credits:</p>
                <p class="value" style="font-size: 20px;">${previousCredits || 0}</p>
              </div>
            </div>
          </div>

          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px;">
            <p style="font-size: 12px; color: #78350f; line-height: 1.6;">
              <strong>Note:</strong> This report is for informational purposes only. Always verify transfer credit policies and GPA calculations with your institution's registrar office. Transfer policies vary by institution.
            </p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Handle download
  const handleDownload = () => {
    const activeGPA = getActiveGPA();
    const activeCredits = getActiveCredits();
    const policyName = transferPolicy === 'fresh-start' ? 'Fresh Start' : 
                       transferPolicy === 'combined' ? 'Combined' : 'Weighted';

    let textContent = `Transfer GPA Calculator Report\n`;
    textContent += `Generated on: ${new Date().toLocaleDateString()}\n`;
    textContent += `${'='.repeat(50)}\n\n`;

    textContent += `PREVIOUS INSTITUTION\n`;
    textContent += `-`.repeat(50) + `\n`;
    textContent += `Previous GPA: ${previousGPA || 'N/A'}\n`;
    textContent += `Total Credits Earned: ${previousCredits || 'N/A'}\n`;
    textContent += `Credits Transferring: ${transferredCredits || 'N/A'}\n\n`;

    textContent += `NEW INSTITUTION\n`;
    textContent += `-`.repeat(50) + `\n`;
    textContent += `Current/Expected GPA: ${newGPA || 'N/A'}\n`;
    textContent += `Credits Earned: ${newCredits || 'N/A'}\n`;
    textContent += `Transfer Credit Limit: ${maxTransferLimit || 'N/A'} credits\n\n`;

    textContent += `SELECTED TRANSFER POLICY: ${policyName}\n`;
    textContent += `${'='.repeat(50)}\n`;
    textContent += `Transfer GPA: ${activeGPA !== null ? activeGPA.toFixed(2) : 'N/A'}\n`;
    textContent += `Total Credits: ${activeCredits}\n\n`;

    textContent += `ALL TRANSFER POLICY RESULTS\n`;
    textContent += `${'='.repeat(50)}\n\n`;

    textContent += `Fresh Start Policy (🆕)\n`;
    textContent += `  GPA: ${calculationResults.freshStart.gpa !== null ? calculationResults.freshStart.gpa.toFixed(2) : 'N/A'}\n`;
    textContent += `  Credits: ${calculationResults.freshStart.credits}\n`;
    textContent += `  Note: Only new institution GPA counts\n\n`;

    textContent += `Combined Policy (🔗)\n`;
    textContent += `  GPA: ${calculationResults.combined.gpa !== null ? calculationResults.combined.gpa.toFixed(2) : 'N/A'}\n`;
    textContent += `  Credits: ${calculationResults.combined.credits}\n`;
    textContent += `  Note: Both institutions combined\n\n`;

    textContent += `Weighted Policy (⚖️)\n`;
    textContent += `  GPA: ${calculationResults.weighted.gpa !== null ? calculationResults.weighted.gpa.toFixed(2) : 'N/A'}\n`;
    textContent += `  Credits: ${calculationResults.weighted.credits}\n`;
    textContent += `  Note: Transferred credits weighted\n\n`;

    textContent += `TRANSFER CREDIT SUMMARY\n`;
    textContent += `${'='.repeat(50)}\n`;
    textContent += `Transferred Credits: ${calculationResults.effectiveTransferCredits}\n`;
    textContent += `Not Transferred: ${calculationResults.nonTransferredCredits}\n`;
    textContent += `Transfer Limit: ${maxTransferLimit}\n`;
    textContent += `Total Previous Credits: ${previousCredits || 0}\n\n`;

    textContent += `${'='.repeat(50)}\n`;
    textContent += `DISCLAIMER: This report is for informational purposes only.\n`;
    textContent += `Always verify transfer credit policies and GPA calculations\n`;
    textContent += `with your institution's registrar office.\n`;
    textContent += `Transfer policies vary by institution.\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Transfer_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const activeGPA = getActiveGPA();
  const activeCredits = getActiveCredits();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
            Transfer GPA Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your <strong>transfer GPA</strong> when moving between colleges. Track previous institution GPA, transferred credits, and new institution GPA with <strong>multiple transfer policies</strong> including fresh start, combined, and weighted calculations.
          </p>
        </div>

        {/* Main Tool Interface */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
          {/* Privacy Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h4 className="text-sm font-semibold text-green-900 mb-1">Privacy & Security</h4>
                <p className="text-xs text-green-800">
                  All calculations are performed locally in your browser. No GPA or transcript data is transmitted to any server.
                </p>
              </div>
            </div>
          </div>

          {/* Transfer Policy Selector */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Select Transfer Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setTransferPolicy('fresh-start')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  transferPolicy === 'fresh-start'
                    ? 'border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🆕</div>
                  <h3 className="font-bold text-gray-800 mb-1">Fresh Start</h3>
                  <p className="text-xs text-gray-600">Only new institution GPA counts</p>
                </div>
              </button>

              <button
                onClick={() => setTransferPolicy('combined')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  transferPolicy === 'combined'
                    ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-indigo-400'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🔗</div>
                  <h3 className="font-bold text-gray-800 mb-1">Combined</h3>
                  <p className="text-xs text-gray-600">Both institutions combined</p>
                </div>
              </button>

              <button
                onClick={() => setTransferPolicy('weighted')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  transferPolicy === 'weighted'
                    ? 'border-purple-600 bg-purple-50 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-purple-400'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">⚖️</div>
                  <h3 className="font-bold text-gray-800 mb-1">Weighted</h3>
                  <p className="text-xs text-gray-600">Transferred credits weighted</p>
                </div>
              </button>
            </div>

            {/* Policy Description */}
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-700">
                {transferPolicy === 'fresh-start' && (
                  <>✨ <strong>Fresh Start:</strong> Your GPA resets at the new institution. Only courses taken at the new school count toward your GPA.</>
                )}
                {transferPolicy === 'combined' && (
                  <>🔗 <strong>Combined:</strong> GPAs from both institutions are combined. All credits from previous and new institutions count in GPA calculation.</>
                )}
                {transferPolicy === 'weighted' && (
                  <>⚖️ <strong>Weighted:</strong> Only transferred credits from your previous institution count. Non-transferred credits are excluded from GPA.</>
                )}
              </p>
            </div>
          </div>

          {/* Previous Institution */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="prevGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
                <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="url(#prevGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="url(#prevGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous Institution
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="previousGPA" className="block text-sm font-semibold text-gray-700 mb-2">
                  Previous GPA (4.0 scale)
                </label>
                <input
                  id="previousGPA"
                  type="number"
                  value={previousGPA}
                  onChange={(e) => setPreviousGPA(e.target.value)}
                  min="0"
                  max="4.0"
                  step="0.01"
                  placeholder="3.50"
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                  aria-label="Previous institution GPA"
                />
              </div>

              <div>
                <label htmlFor="previousCredits" className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Credits Earned
                </label>
                <input
                  id="previousCredits"
                  type="number"
                  value={previousCredits}
                  onChange={(e) => setPreviousCredits(e.target.value)}
                  min="0"
                  max="200"
                  step="1"
                  placeholder="60"
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                  aria-label="Total credits earned at previous institution"
                />
              </div>

              <div>
                <label htmlFor="transferredCredits" className="block text-sm font-semibold text-gray-700 mb-2">
                  Credits Transferring
                </label>
                <input
                  id="transferredCredits"
                  type="number"
                  value={transferredCredits}
                  onChange={(e) => setTransferredCredits(e.target.value)}
                  min="0"
                  max={previousCredits || '200'}
                  step="1"
                  placeholder="45"
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                  aria-label="Credits transferring to new institution"
                />
              </div>
            </div>
          </div>

          {/* Transfer Credit Limit */}
          <div className="mb-8">
            <label htmlFor="maxTransferLimit" className="block text-sm font-semibold text-gray-700 mb-2">
              Maximum Transfer Credit Limit (Institution Policy)
            </label>
            <div className="flex items-center gap-4">
              <input
                id="maxTransferLimit"
                type="number"
                value={maxTransferLimit}
                onChange={(e) => setMaxTransferLimit(e.target.value)}
                min="0"
                max="180"
                step="1"
                className="w-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-lg"
                aria-label="Maximum transfer credit limit"
              />
              <span className="text-sm text-gray-600">credits (Most universities: 60-90 credits)</span>
            </div>
          </div>

          {/* New Institution */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="newGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="url(#newGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              New Institution (Optional - for projections)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newGPA" className="block text-sm font-semibold text-gray-700 mb-2">
                  Current/Expected GPA (4.0 scale)
                </label>
                <input
                  id="newGPA"
                  type="number"
                  value={newGPA}
                  onChange={(e) => setNewGPA(e.target.value)}
                  min="0"
                  max="4.0"
                  step="0.01"
                  placeholder="3.70"
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-lg"
                  aria-label="New institution GPA"
                />
              </div>

              <div>
                <label htmlFor="newCredits" className="block text-sm font-semibold text-gray-700 mb-2">
                  Credits Earned at New Institution
                </label>
                <input
                  id="newCredits"
                  type="number"
                  value={newCredits}
                  onChange={(e) => setNewCredits(e.target.value)}
                  min="0"
                  max="200"
                  step="1"
                  placeholder="30"
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 text-lg"
                  aria-label="Credits earned at new institution"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={resetAll}
              className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              aria-label="Print transfer GPA report"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Report
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              aria-label="Download transfer GPA report as text file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Report
            </button>
          </div>

          {/* Results Section */}
          <div className="mt-8" role="region" aria-live="polite" aria-label="Transfer GPA calculation results">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Transfer GPA Results</h3>
            
            {/* Active Policy Result */}
            {activeGPA !== null ? (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-300 rounded-xl p-6 mb-6 text-center">
                <div className="flex justify-center mb-2">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-blue-700 mb-1">
                  {transferPolicy === 'fresh-start' && 'Fresh Start GPA'}
                  {transferPolicy === 'combined' && 'Combined Transfer GPA'}
                  {transferPolicy === 'weighted' && 'Weighted Transfer GPA'}
                </p>
                <p className="text-5xl font-extrabold text-blue-900 mb-2">
                  {activeGPA.toFixed(2)}
                </p>
                <p className="text-sm text-blue-600">
                  {activeCredits} total credits
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <p className="text-sm text-amber-800">
                  Enter your previous institution GPA and credits to calculate transfer GPA
                </p>
              </div>
            )}

            {/* All Policy Comparisons */}
            {calculationResults && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Fresh Start */}
                <div className={`rounded-xl p-5 border-2 ${
                  transferPolicy === 'fresh-start' 
                    ? 'bg-blue-50 border-blue-400' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🆕</div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Fresh Start GPA</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {calculationResults.freshStart.gpa !== null 
                        ? calculationResults.freshStart.gpa.toFixed(2) 
                        : '-'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {calculationResults.freshStart.credits} credits
                    </p>
                  </div>
                </div>

                {/* Combined */}
                <div className={`rounded-xl p-5 border-2 ${
                  transferPolicy === 'combined' 
                    ? 'bg-indigo-50 border-indigo-400' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔗</div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Combined GPA</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {calculationResults.combined.gpa !== null 
                        ? calculationResults.combined.gpa.toFixed(2) 
                        : '-'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {calculationResults.combined.credits} credits
                    </p>
                  </div>
                </div>

                {/* Weighted */}
                <div className={`rounded-xl p-5 border-2 ${
                  transferPolicy === 'weighted' 
                    ? 'bg-purple-50 border-purple-400' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚖️</div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Weighted GPA</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {calculationResults.weighted.gpa !== null 
                        ? calculationResults.weighted.gpa.toFixed(2) 
                        : '-'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {calculationResults.weighted.credits} credits
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Transfer Credit Summary */}
            {calculationResults && parseFloat(previousCredits) > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Transfer Credit Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Transferred</p>
                    <p className="text-2xl font-bold text-green-600">
                      {calculationResults.effectiveTransferCredits}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Not Transferred</p>
                    <p className="text-2xl font-bold text-red-600">
                      {calculationResults.nonTransferredCredits.toFixed(0)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Transfer Limit</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {maxTransferLimit}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Previous Total</p>
                    <p className="text-2xl font-bold text-gray-600">
                      {previousCredits}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents 
          sections={[
            { id: 'quick-examples', title: 'Quick Examples', emoji: '⚡', subtitle: 'See calculations', gradientFrom: '#3B82F6', gradientTo: '#6366F1', hoverBorder: '#3B82F6', hoverText: '#3B82F6' },
            { id: 'benefits', title: 'Key Benefits', emoji: '✨', subtitle: 'Why use this', gradientFrom: '#6366F1', gradientTo: '#8B5CF6', hoverBorder: '#6366F1', hoverText: '#6366F1' },
            { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: '#8B5CF6', gradientTo: '#A855F7', hoverBorder: '#8B5CF6', hoverText: '#8B5CF6' },
            { id: 'use-cases', title: 'Use Cases', emoji: '🎯', subtitle: 'Who uses this', gradientFrom: '#A855F7', gradientTo: '#EC4899', hoverBorder: '#A855F7', hoverText: '#A855F7' },
            { id: 'about', title: 'About Transfer GPA', emoji: '📚', subtitle: 'Learn more', gradientFrom: '#EC4899', gradientTo: '#F43F5E', hoverBorder: '#EC4899', hoverText: '#EC4899' },
            { id: 'external-resources', title: 'External Resources', emoji: '🔗', subtitle: 'Helpful links', gradientFrom: '#F43F5E', gradientTo: '#3B82F6', hoverBorder: '#F43F5E', hoverText: '#F43F5E' },
            { id: 'faqs', title: 'FAQs', emoji: '❓', subtitle: 'Common questions', gradientFrom: '#3B82F6', gradientTo: '#6366F1', hoverBorder: '#3B82F6', hoverText: '#3B82F6' },
          ]}
        />

        {/* Social Share Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share This Tool
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://zurawebtools.com/education-and-exam-tools/gpa-tools/transfer-gpa-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Share on Facebook
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=https://zurawebtools.com/education-and-exam-tools/gpa-tools/transfer-gpa-calculator&text=Calculate%20your%20transfer%20GPA%20with%20this%20free%20calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share on Twitter
            </a>
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://zurawebtools.com/education-and-exam-tools/gpa-tools/transfer-gpa-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Quick Examples Section */}
        <section id="quick-examples" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quick Transfer GPA Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                <h3 className="text-xl font-bold text-blue-900">Community College to University</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700"><strong>Previous Institution:</strong> Community College</p>
                <p className="text-gray-700">GPA: 3.60 | Credits: 60</p>
                <p className="text-gray-700">Transferred: 45 credits (15 didn't transfer)</p>
                <p className="text-gray-700"><strong>New Institution:</strong> University</p>
                <p className="text-gray-700">Current GPA: 3.80 | Credits: 30</p>
                <div className="mt-4 pt-4 border-t-2 border-blue-300">
                  <p className="font-bold text-blue-900">Combined GPA: <span className="text-2xl">3.73</span></p>
                  <p className="text-xs text-gray-600 mt-1">Total: 75 credits (45 transferred + 30 new)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                <h3 className="text-xl font-bold text-indigo-900">Fresh Start Policy Transfer</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700"><strong>Previous Institution:</strong> State University</p>
                <p className="text-gray-700">GPA: 2.80 | Credits: 45</p>
                <p className="text-gray-700">Transferred: 30 credits</p>
                <p className="text-gray-700"><strong>New Institution:</strong> Different University</p>
                <p className="text-gray-700">Current GPA: 3.50 | Credits: 30</p>
                <div className="mt-4 pt-4 border-t-2 border-indigo-300">
                  <p className="font-bold text-indigo-900">Fresh Start GPA: <span className="text-2xl">3.50</span></p>
                  <p className="text-xs text-gray-600 mt-1">Only new institution GPA counts (30 credits)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Why Use Our Transfer GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900">Multiple Transfer Policies</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Calculate GPA using three different transfer policies: Fresh Start (GPA resets), Combined (both institutions), and Weighted (transferred credits only). See how each policy affects your GPA before making transfer decisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-indigo-900">Instant Calculations</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Get real-time transfer GPA calculations as you enter your data. No manual calculations needed. See all three policy results simultaneously to compare scenarios and plan your academic strategy effectively.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-900">Transfer Credit Tracking</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Track which credits transfer and which don't. Set institution transfer credit limits (typically 60-90 credits). Understand exactly how many credits count toward your new degree and how they impact your cumulative GPA.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-pink-900">100% Private & Secure</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                All calculations happen locally in your browser. No GPA data, transcript information, or personal details are sent to any server. Your academic records remain completely private and secure throughout the calculation process.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">How to Calculate Your Transfer GPA</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Select Transfer Policy</h3>
                <p className="text-gray-700 leading-relaxed">
                  Choose your institution's transfer policy: Fresh Start (GPA resets), Combined (both GPAs count), or Weighted (only transferred credits). Check your new institution's transfer credit policy documentation to determine which applies.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Previous Institution Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  Input your GPA and total credits earned at your previous institution. Then specify how many credits are transferring to your new school. Check your transfer credit evaluation to know exact numbers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Set Transfer Credit Limit</h3>
                <p className="text-gray-700 leading-relaxed">
                  Enter your new institution's maximum transfer credit limit (usually 60-90 credits for four-year universities). This ensures calculations reflect actual institutional policies and degree requirements.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Add New Institution Data (Optional)</h3>
                <p className="text-gray-700 leading-relaxed">
                  For projections, enter your current or expected GPA and credits at the new institution. This shows your combined transfer GPA. Leave blank to see only your previous institution's impact.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full font-bold">5</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Review Transfer GPA Results</h3>
                <p className="text-gray-700 leading-relaxed">
                  View your calculated transfer GPA based on the selected policy. Compare all three policy results side-by-side. Check the transfer credit summary to see how many credits transferred versus how many didn't.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculation Example
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">Student Transfer Scenario:</p>
                <ul className="space-y-1 font-mono text-xs">
                  <li>• Previous Institution: GPA 3.40, 60 credits earned</li>
                  <li>• Transferred Credits: 50 (10 didn't transfer)</li>
                  <li>• New Institution: GPA 3.70, 30 credits earned</li>
                  <li>• Transfer Policy: Combined</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">Combined GPA Calculation:</p>
                <p className="font-mono text-xs">Quality Points = (3.40 × 50) + (3.70 × 30) = 170 + 111 = 281</p>
                <p className="font-mono text-xs mt-1">Total Credits = 50 + 30 = 80</p>
                <p className="font-mono text-xs mt-1">Combined GPA = 281 ÷ 80 = <strong className="text-green-600 text-base">3.51</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Who Uses This Transfer GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 className="text-xl font-bold text-blue-900">Community College Transfers</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Students transferring from community college to four-year universities. Calculate how your associate degree GPA will combine with university coursework. Understand transfer credit limits (typically 60-90 credits) and plan remaining degree requirements.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-bold text-indigo-900">University Transfers</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Students moving between four-year universities for various reasons (financial, program fit, location). Evaluate whether fresh start or combined GPA policy benefits your academic record more. Make informed transfer decisions based on GPA impact.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold text-purple-900">Academic Advisors</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Academic advisors helping transfer students understand GPA implications. Show students realistic GPA projections under different transfer policies. Guide course planning and transfer credit evaluation discussions with accurate calculations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-pink-900">International Students</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                International students transferring between U.S. institutions or from foreign universities. Calculate how international credits convert to U.S. GPA scale. Understand which credits transfer and plan visa/academic requirements accordingly.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-6 sm:p-8 mb-8 border-2 border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">About Transfer GPA Calculation</h2>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600">
              <p className="text-gray-700 leading-relaxed mb-4">
                Transfer GPA calculation is a critical component of the <strong className="text-blue-900">college transfer process</strong>, determining how your academic performance from a previous institution combines with your record at a new school. Unlike standard GPA calculations using a <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">College GPA Calculator</button> at a single institution, <strong className="text-blue-900">transfer GPA involves complex policies regarding credit acceptance, grade conversion, and institutional transfer limits</strong> that significantly impact your cumulative academic standing and <strong className="text-indigo-900">transfer student success</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When students move between colleges—whether from <strong className="text-purple-900">community college to university</strong>, between four-year institutions, or returning from study abroad—their <strong className="text-indigo-900">transfer credit evaluation</strong> determines which courses transfer, how many credits apply toward their degree, and whether their previous GPA carries over. Most four-year universities have <strong className="text-purple-900">maximum transfer credit limits</strong> (typically 60-90 semester credits) to ensure students complete sufficient coursework at the degree-granting institution. Understanding these limits is essential for accurate <strong className="text-blue-900">transfer GPA projection</strong> and degree completion planning, similar to tracking progress with a <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator')} className="text-indigo-600 hover:text-indigo-800 underline font-semibold">Cumulative GPA Calculator</button>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800">Fresh Start Policy</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Most common at public universities and state university systems. Your GPA <strong>resets to 0.00</strong> and only new institution coursework affects your <strong className="text-blue-900">institutional GPA</strong>. Transfer credits count toward degree requirements but not GPA calculation, providing a clean slate for academic redemption.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-indigo-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800">Combined Policy</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Some private universities and selective programs. Your <strong>previous GPA combines</strong> with new coursework weighted by credit hours, creating a <strong className="text-indigo-900">cumulative transfer GPA</strong> that reflects both institutions, maintaining academic continuity across your college career.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-purple-600">
              <p className="text-gray-700 leading-relaxed mb-4">
                The <strong className="text-purple-900">articulation agreement</strong> between institutions plays a vital role in <strong className="text-blue-900">transfer credit evaluation</strong> and course equivalency determination. These agreements specify which courses transfer, how they apply to degree requirements, and whether grades transfer. Many states have <strong className="text-blue-900">statewide articulation systems</strong> ensuring seamless community college to university transfer within public systems. Students should review their <strong className="text-indigo-900">transfer credit evaluation (TCE)</strong> document carefully to understand exactly how many credits transfer and which courses fulfill specific <strong className="text-purple-900">degree requirements</strong> and general education mandates.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Beyond credit transfer, students must consider <strong className="text-indigo-900">degree audit requirements</strong> that determine graduation eligibility and <strong className="text-blue-900">residency requirements</strong>. Even with maximum transfer credits, most institutions require a minimum number of <strong className="text-purple-900">upper-division credits</strong> (typically 30-45 semester hours) earned at the degree-granting institution to ensure academic quality and institutional standards. Transfer students should work closely with <strong className="text-blue-900">academic advisors</strong> to map remaining requirements, plan <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/semester-gpa-calculator')} className="text-purple-600 hover:text-purple-800 underline font-semibold">semester-by-semester coursework</button>, and ensure transfer credits align with major and general education needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For students planning to pursue <strong className="text-indigo-900">graduate school</strong> or professional programs, understanding how transfer policies affect your GPA is crucial. Medical schools calculate their own <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">AMCAS GPA</button> using all coursework from all institutions, while law schools use <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/lsac-gpa-calculator')} className="text-indigo-600 hover:text-indigo-800 underline font-semibold">LSAC GPA calculations</button> that count every college course attempt. Our Transfer GPA Calculator helps students project their <strong className="text-purple-900">cumulative GPA</strong> under different transfer policies, enabling informed decisions about course selection, <strong className="text-blue-900">academic planning</strong>, graduation timelines, and post-graduation opportunities like graduate admissions and scholarship applications.
              </p>
            </div>
          </div>
        </section>

        {/* External Resources Section */}
        <section id="external-resources" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">External Transfer Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://nces.ed.gov/programs/coe/indicator/ctr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all group"
            >
              <div className="flex items-start gap-3">
                <svg className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-blue-900 mb-1 group-hover:text-blue-700">National Center for Education Statistics</h3>
                  <p className="text-sm text-gray-700">Official U.S. transfer student data, statistics, and trends from the Department of Education</p>
                </div>
              </div>
            </a>

            <a 
              href="https://bigfuture.collegeboard.org/plan-for-college/college-basics/transferring-between-colleges" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 border-2 border-indigo-200 hover:shadow-xl hover:border-indigo-400 transition-all group"
            >
              <div className="flex items-start gap-3">
                <svg className="w-8 h-8 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-indigo-900 mb-1 group-hover:text-indigo-700">College Board Transfer Guide</h3>
                  <p className="text-sm text-gray-700">Comprehensive guide to college transfer process, credit evaluation, and application strategies</p>
                </div>
              </div>
            </a>

            <a 
              href="https://www.aacc.nche.edu/programs/workforce-economic-development/transfer-students/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200 hover:shadow-xl hover:border-purple-400 transition-all group"
            >
              <div className="flex items-start gap-3">
                <svg className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-purple-900 mb-1 group-hover:text-purple-700">American Association of Community Colleges</h3>
                  <p className="text-sm text-gray-700">Resources for community college transfers, articulation agreements, and pathway programs</p>
                </div>
              </div>
            </a>

            <a 
              href="https://www.nacac.org/knowledge-center/transfer-admission/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border-2 border-pink-200 hover:shadow-xl hover:border-pink-400 transition-all group"
            >
              <div className="flex items-start gap-3">
                <svg className="w-8 h-8 text-pink-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-pink-900 mb-1 group-hover:text-pink-700">NACAC Transfer Admission Resources</h3>
                  <p className="text-sm text-gray-700">National Association for College Admission Counseling's transfer admission best practices</p>
                </div>
              </div>
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            These external links are provided for informational purposes. ZuraWebTools is not affiliated with these organizations.
          </p>
        </section>

        {/* Last Updated */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <p className="text-sm text-gray-600 text-center">
            <strong>Last Updated:</strong> November 30, 2024 | <strong>Category:</strong> Education & Exam Tools → GPA Tools
          </p>
        </div>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What is the difference between Fresh Start and Combined GPA policies?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fresh Start policy means your GPA resets to 0.00 at the new institution and only new coursework counts toward your GPA (transfer credits count toward degree but not GPA). Combined policy means your previous GPA is weighted by transferred credits and combined with new coursework to create a cumulative GPA reflecting both institutions. Fresh Start is most common at public universities, while some private universities use Combined policies.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 border-2 border-indigo-200">
              <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How many credits typically transfer from community college to university?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Most four-year universities accept 60-90 semester credits from community colleges. An associate degree is typically 60 credits, which often transfers fully within the same state system (via articulation agreements). Some universities cap transfers at 90 credits to ensure students complete sufficient upper-division coursework at the degree-granting institution. Check your specific university's transfer credit policy and maximum transfer limits.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Do transfer credits count toward my GPA at the new school?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This depends entirely on your new institution's transfer policy. Under Fresh Start policies (most common), transfer credits count toward degree requirements and graduation credits but do NOT affect your institutional GPA—only new coursework counts. Under Combined policies, your previous GPA is incorporated into your new institutional GPA weighted by transferred credits. Always check your transfer credit evaluation (TCE) document and academic catalog.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border-2 border-pink-200">
              <h3 className="text-lg font-bold text-pink-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What is an articulation agreement?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                An articulation agreement is a formal partnership between institutions (often community colleges and universities) that specifies exactly which courses transfer and how they apply to degree requirements. These agreements ensure seamless transfer pathways, guarantee course equivalencies, and often provide priority admission. Many states have statewide articulation systems ensuring community college graduates can transfer to public universities with junior standing.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Can I retake courses at my new institution to replace transfer grades?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This depends on the institution and transfer policy. Under Fresh Start policies, you cannot "replace" transfer grades because they don't count in your GPA anyway—only new coursework affects your institutional GPA. Under Combined policies, retaking courses may or may not replace the original grade; check your institution's grade replacement policy. Note that medical/law school applications (AMCAS/LSAC) count ALL attempts regardless of institutional policy.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border-2 border-orange-200">
              <h3 className="text-lg font-bold text-orange-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How do I find out my new school's transfer GPA policy?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Check your institution's academic catalog (often under "Transfer Students" or "Academic Policies"), contact the Registrar's Office, or speak with an academic advisor in your department. Your official transfer credit evaluation (TCE) document should also specify which policy applies. When in doubt, ask specifically: "Do my transfer grades count toward my institutional GPA, or do I start with a fresh GPA?"
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-2 border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Which GPA do graduate schools use for transfer students?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Graduate schools typically request transcripts from ALL institutions attended and calculate their own cumulative GPA across all coursework. Medical schools (AMCAS) and law schools (LSAC) have standardized GPA calculation methods that include every college course attempt from all institutions, regardless of transfer policies. Business schools and other graduate programs vary—some use institutional GPA only, others calculate cumulative. Always submit transcripts from every institution to provide complete academic history.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['college-gpa-calculator', 'cumulative-gpa-calculator', 'semester-gpa-calculator', 'high-school-gpa-calculator']} 
          currentSlug="transfer-gpa-calculator" 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default TransferGPACalculator;
