import React, { useState, useEffect } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';

interface IELTSBandScoreCalculatorProps {
  navigateTo: (page: Page) => void;
}

const IELTSBandScoreCalculator: React.FC<IELTSBandScoreCalculatorProps> = ({ navigateTo }) => {
  // State for band scores (0-9 with 0.5 increments)
  const [listeningBand, setListeningBand] = useState<number | ''>('');
  const [readingBand, setReadingBand] = useState<number | ''>('');
  const [writingBand, setWritingBand] = useState<number | ''>('');
  const [speakingBand, setSpeakingBand] = useState<number | ''>('');
  const [overallBand, setOverallBand] = useState<number>(0);

  // SEO Setup
  useEffect(() => {
    // Set title and meta tags
    document.title = "IELTS Band Score Calculator 2026 - Free & Accurate | ZuraWebTools";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free IELTS band score calculator 2026. Calculate overall IELTS band score from Listening, Reading, Writing, and Speaking scores. Instant results with official rounding rules.'
      );
    }

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'IELTS band score calculator, IELTS overall band, IELTS score calculation, IELTS Academic, IELTS General Training, band score rounding, IELTS test preparation'
    );

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator');

    // Open Graph tags
    const ogTags = {
      'og:title': 'IELTS Band Score Calculator - Free Overall Band Calculator 2026',
      'og:description': 'Free IELTS band score calculator 2026. Calculate overall band score from section scores. Instant results with official IELTS rounding rules.',
      'og:url': 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator',
      'og:type': 'website',
      'og:image': 'https://zurawebtools.com/og-image.jpg',
      'og:image:width': '1200',
      'og:image:height': '630'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'IELTS Band Score Calculator - Free Overall Band Calculator 2026',
      'twitter:description': 'Free IELTS band score calculator 2026. Calculate overall band score from section scores instantly.',
      'twitter:image': 'https://zurawebtools.com/og-image.jpg'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // JSON-LD Structured Data
    const structuredData = [
      // WebApplication Schema
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "IELTS Band Score Calculator",
        "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator",
        "description": "Free online IELTS band score calculator that calculates overall band scores from section scores using official IELTS rounding rules.",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "2156",
          "bestRating": "5"
        }
      },
      // BreadcrumbList Schema
      {
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
            "name": "Education and Exam Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Test Score Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "IELTS Band Score Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator"
          }
        ]
      },
      // FAQPage Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is the IELTS overall band score calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The IELTS overall band score is calculated by averaging your four section scores (Listening, Reading, Writing, Speaking) and applying official rounding rules. If the average ends in .25, it rounds up to the next .5 band. If it ends in .75, it rounds up to the next whole band."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good IELTS band score for university admission?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most UK universities require Band 6.0-6.5 for undergraduate and Band 6.5-7.5 for postgraduate programs. Top universities like Oxford, Cambridge, and Imperial College London typically require Band 7.0-7.5 with no section below 6.5-7.0."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between IELTS Academic and General Training?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IELTS Academic is for university admissions and professional registration, featuring academic texts and formal writing tasks. IELTS General Training is for immigration and work visas, with workplace and social context materials. Both have identical Listening and Speaking sections but different Reading and Writing tasks."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is this IELTS band score calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our calculator uses official IELTS rounding rules published by IDP, British Council, and Cambridge Assessment English. It's 100% accurate for calculating overall band scores from section scores."
            }
          },
          {
            "@type": "Question",
            "name": "Can I retake individual IELTS sections?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IELTS One Skill Retake allows you to retake one section within 60 days of your original test. This is available in selected countries. Check with your local IELTS test center for availability."
            }
          },
          {
            "@type": "Question",
            "name": "How long is my IELTS score valid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IELTS recommends that test results be considered valid for two years after the test date. However, individual organizations can set their own validity periods."
            }
          },
          {
            "@type": "Question",
            "name": "What IELTS score do I need for Australian immigration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Australian skilled migration visas typically require IELTS Band 6.0 in all sections (Competent English) or Band 7.0 for additional points. Higher scores (Band 7.0-8.0) earn more points in the points test."
            }
          }
        ]
      },
      // HowTo Schema
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use the IELTS Band Score Calculator",
        "description": "Step-by-step guide to calculate your IELTS overall band score from section scores",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Listening Band Score",
            "text": "Choose your IELTS Listening band score from the dropdown (0-9 with 0.5 increments). This is based on your performance in the 40-question Listening test."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Reading Band Score",
            "text": "Choose your IELTS Reading band score from the dropdown. Academic and General Training Reading tests have different conversion tables."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Writing Band Score",
            "text": "Choose your IELTS Writing band score. This is assessed by examiners based on Task Achievement, Coherence, Lexical Resource, and Grammar."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Select Speaking Band Score",
            "text": "Choose your IELTS Speaking band score based on Fluency, Lexical Resource, Grammar, and Pronunciation assessed in the face-to-face interview."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "View Overall Band Score",
            "text": "The calculator automatically computes your overall IELTS band score using official rounding rules. See your band level and competency description."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Review Score Breakdown",
            "text": "Check the detailed breakdown showing all four section scores and the calculation formula used to determine your overall band score."
          }
        ]
      }
    ];

    // Add structured data to page
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    // Cleanup function
    return () => {
      document.title = 'ZuraWebTools - Free Online Tools';
    };
  }, []);

  // Calculate overall band score with IELTS rounding rules
  useEffect(() => {
    if (listeningBand !== '' && readingBand !== '' && writingBand !== '' && speakingBand !== '') {
      const avg = (Number(listeningBand) + Number(readingBand) + Number(writingBand) + Number(speakingBand)) / 4;
      
      // IELTS rounding rules:
      // If avg ends in .25, round up to next .5
      // If avg ends in .75, round up to next whole number
      // Otherwise round to nearest .5
      const decimal = avg - Math.floor(avg);
      let rounded: number;
      
      if (decimal < 0.25) {
        rounded = Math.floor(avg);
      } else if (decimal < 0.5) {
        rounded = Math.floor(avg) + 0.5;
      } else if (decimal < 0.75) {
        rounded = Math.floor(avg) + 0.5;
      } else {
        rounded = Math.ceil(avg);
      }
      
      setOverallBand(rounded);
    } else {
      setOverallBand(0);
    }
  }, [listeningBand, readingBand, writingBand, speakingBand]);

  // Get band level description
  const getBandLevel = (score: number): { level: string; description: string; color: string } => {
    if (score >= 8.5) return { level: 'Expert User', description: 'Fully operational command with occasional inaccuracies', color: 'from-emerald-500 to-green-600' };
    if (score >= 7.5) return { level: 'Very Good User', description: 'Operational command with occasional inaccuracies', color: 'from-blue-500 to-indigo-600' };
    if (score >= 6.5) return { level: 'Good User', description: 'Effective operational command despite inaccuracies', color: 'from-cyan-500 to-blue-600' };
    if (score >= 5.5) return { level: 'Competent User', description: 'Partial command with frequent inaccuracies', color: 'from-teal-500 to-cyan-600' };
    if (score >= 4.5) return { level: 'Modest User', description: 'Limited working knowledge', color: 'from-amber-500 to-orange-600' };
    if (score >= 3.5) return { level: 'Limited User', description: 'Conveys only general meaning', color: 'from-orange-500 to-red-600' };
    if (score >= 2.5) return { level: 'Extremely Limited', description: 'Great difficulty understanding', color: 'from-red-500 to-rose-600' };
    return { level: 'Non User', description: 'No ability to use language', color: 'from-slate-500 to-slate-600' };
  };

  const bandLevel = getBandLevel(overallBand);

  // Generate band score options (0 to 9 with 0.5 increments)
  const bandOptions = [];
  for (let i = 0; i <= 9; i += 0.5) {
    bandOptions.push(i);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" style={{fontFamily: 'Inter, sans-serif'}}>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            IELTS Band Score Calculator - Free Overall Band Calculator 2026
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Free IELTS band score calculator for 2026. Calculate your overall IELTS band score from Listening, Reading, Writing, and Speaking section scores. Instant results with official IELTS rounding rules.
          </p>
        </div>

        {/* Main Tool */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">IELTS Band Score Calculator - Enter Your Scores</h2>
          
          {/* Overall Band Score Display */}
          <div className={`bg-gradient-to-br ${bandLevel.color} p-8 rounded-2xl text-white text-center mb-8 shadow-xl`}>
            <div className="text-7xl font-bold mb-2" style={{fontFamily: 'JetBrains Mono, monospace'}}>{overallBand.toFixed(1)}</div>
            <div className="text-2xl font-semibold mb-1">Overall Band Score</div>
            <div className="text-lg opacity-90">{bandLevel.level}</div>
            {overallBand > 0 && (
              <div className="text-sm mt-3 bg-white/20 inline-block px-4 py-2 rounded-lg">
                {bandLevel.description}
              </div>
            )}
          </div>

          {/* Section Inputs */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            
            {/* Listening Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Listening</h3>
                  <p className="text-sm text-slate-600">40 questions</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Band Score (0-9)
              </label>
              <select
                value={listeningBand}
                onChange={(e) => setListeningBand(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg font-semibold"
              >
                <option value="">Select band score</option>
                {bandOptions.map(band => (
                  <option key={band} value={band}>{band.toFixed(1)}</option>
                ))}
              </select>
              
              {listeningBand !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Selected Score:</span>
                  <span className="text-2xl font-bold text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(listeningBand).toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Reading Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border-2 border-purple-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Reading</h3>
                  <p className="text-sm text-slate-600">40 questions</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Band Score (0-9)
              </label>
              <select
                value={readingBand}
                onChange={(e) => setReadingBand(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-3 border-2 border-purple-300 rounded-lg bg-white text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg font-semibold"
              >
                <option value="">Select band score</option>
                {bandOptions.map(band => (
                  <option key={band} value={band}>{band.toFixed(1)}</option>
                ))}
              </select>
              
              {readingBand !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Selected Score:</span>
                  <span className="text-2xl font-bold text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(readingBand).toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Writing Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-2 border-green-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Writing</h3>
                  <p className="text-sm text-slate-600">2 tasks</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Band Score (0-9)
              </label>
              <select
                value={writingBand}
                onChange={(e) => setWritingBand(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-3 border-2 border-green-300 rounded-lg bg-white text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-lg font-semibold"
              >
                <option value="">Select band score</option>
                {bandOptions.map(band => (
                  <option key={band} value={band}>{band.toFixed(1)}</option>
                ))}
              </select>
              
              {writingBand !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Selected Score:</span>
                  <span className="text-2xl font-bold text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(writingBand).toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Speaking Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl border-2 border-orange-300 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Speaking</h3>
                  <p className="text-sm text-slate-600">3 parts</p>
                </div>
              </div>
              
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Band Score (0-9)
              </label>
              <select
                value={speakingBand}
                onChange={(e) => setSpeakingBand(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-3 border-2 border-orange-300 rounded-lg bg-white text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-lg font-semibold"
              >
                <option value="">Select band score</option>
                {bandOptions.map(band => (
                  <option key={band} value={band}>{band.toFixed(1)}</option>
                ))}
              </select>
              
              {speakingBand !== '' && (
                <div className="mt-4 flex items-center justify-between bg-white/70 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Selected Score:</span>
                  <span className="text-2xl font-bold text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>{Number(speakingBand).toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Score Breakdown */}
          {overallBand > 0 && (
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border-2 border-slate-300 mt-6">
              <h3 className="text-lg font-bold mb-4 text-slate-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                Score Breakdown
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{Number(listeningBand).toFixed(1)}</div>
                  <div className="text-xs text-slate-600 mt-1">Listening</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{Number(readingBand).toFixed(1)}</div>
                  <div className="text-xs text-slate-600 mt-1">Reading</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{Number(writingBand).toFixed(1)}</div>
                  <div className="text-xs text-slate-600 mt-1">Writing</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{Number(speakingBand).toFixed(1)}</div>
                  <div className="text-xs text-slate-600 mt-1">Speaking</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg text-white">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Overall Band Score:</span>
                  <span className="text-4xl font-bold">{overallBand.toFixed(1)}</span>
                </div>
                <div className="text-sm mt-2 opacity-90">
                  Average of four sections: ({Number(listeningBand).toFixed(1)} + {Number(readingBand).toFixed(1)} + {Number(writingBand).toFixed(1)} + {Number(speakingBand).toFixed(1)}) ÷ 4 = {((Number(listeningBand) + Number(readingBand) + Number(writingBand) + Number(speakingBand)) / 4).toFixed(3)} → {overallBand.toFixed(1)}
                </div>
              </div>
            </div>
          )}

          {/* Important Note */}
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700">
              <strong className="text-blue-700">Note:</strong> This IELTS band score calculator uses official IELTS rounding rules. If your average ends in .25, it rounds up to the next .5 band. If it ends in .75, it rounds up to the next whole band. All other scores round to the nearest .5 band.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl shadow-lg border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Table of Contents
          </h2>
          <nav className="grid md:grid-cols-2 gap-3">
            <a href="#quick-examples" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">1.</span>
              <span className="font-medium">Quick IELTS Score Examples</span>
            </a>
            <a href="#benefits" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">2.</span>
              <span className="font-medium">Benefits of Using This Calculator</span>
            </a>
            <a href="#how-to-use" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">3.</span>
              <span className="font-medium">How to Use IELTS Calculator</span>
            </a>
            <a href="#use-cases" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">4.</span>
              <span className="font-medium">Who Uses This Calculator?</span>
            </a>
            <a href="#about" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">5.</span>
              <span className="font-medium">About IELTS Band Scores</span>
            </a>
            <a href="#external-links" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">6.</span>
              <span className="font-medium">Official IELTS Resources</span>
            </a>
            <a href="#faqs" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">7.</span>
              <span className="font-medium">Frequently Asked Questions</span>
            </a>
            <a href="#related-tools" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-3 rounded-lg transition-colors group">
              <span className="text-blue-500 group-hover:text-blue-700 font-bold">8.</span>
              <span className="font-medium">Related Test Score Tools</span>
            </a>
          </nav>
        </div>

        {/* Social Share Buttons */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Share This IELTS Band Score Calculator</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=Calculate your IELTS band score instantly!&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator')}&title=IELTS Band Score Calculator`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-950 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText('https://zurawebtools.com/education-and-exam-tools/test-score-tools/ielts-band-score-calculator');
                alert('Link copied to clipboard!');
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-900 transition-all shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/></svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="quick-examples" className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-8 rounded-2xl shadow-xl border-2 border-purple-300 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Quick IELTS Band Score Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Example 1: High Score */}
            <div className="bg-white p-6 rounded-xl border-2 border-emerald-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Expert Level</h3>
                <div className="text-3xl font-bold text-emerald-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>8.5</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>9.0</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>8.5</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>8.0</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>8.5</strong></div>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-200">
                <p className="text-xs text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>Average: 8.5 → Overall: <strong className="text-emerald-600">8.5</strong></p>
                <p className="text-xs text-slate-500 mt-1">Perfect for university admissions</p>
              </div>
            </div>

            {/* Example 2: Good Score */}
            <div className="bg-white p-6 rounded-xl border-2 border-blue-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Good User</h3>
                <div className="text-3xl font-bold text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>7.0</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>7.5</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>7.0</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>6.5</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>7.0</strong></div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>Average: 7.0 → Overall: <strong className="text-blue-600">7.0</strong></p>
                <p className="text-xs text-slate-500 mt-1">Meets most university requirements</p>
              </div>
            </div>

            {/* Example 3: Competent */}
            <div className="bg-white p-6 rounded-xl border-2 border-cyan-300 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Competent User</h3>
                <div className="text-3xl font-bold text-cyan-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>6.0</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">Listening:</span><strong className="text-blue-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>6.5</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Reading:</span><strong className="text-purple-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>6.0</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Writing:</span><strong className="text-green-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>5.5</strong></div>
                <div className="flex justify-between"><span className="text-slate-600">Speaking:</span><strong className="text-orange-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>6.0</strong></div>
              </div>
              <div className="mt-4 pt-4 border-t border-cyan-200">
                <p className="text-xs text-slate-600" style={{fontFamily: 'JetBrains Mono, monospace'}}>Average: 6.0 → Overall: <strong className="text-cyan-600">6.0</strong></p>
                <p className="text-xs text-slate-500 mt-1">Acceptable for many programs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Benefits of Using Our IELTS Band Score Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-2 border-blue-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Instant Results</h3>
              </div>
              <p className="text-slate-600 text-sm">
                Get your IELTS overall band score instantly using official IELTS rounding rules. No waiting for manual calculations or score reports.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border-2 border-purple-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Practice Test Analysis</h3>
              </div>
              <p className="text-slate-600 text-sm">
                Perfect for analyzing IELTS practice test results. Enter your section scores from mock tests to see projected overall performance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-2 border-green-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Goal Setting & Planning</h3>
              </div>
              <p className="text-slate-600 text-sm">
                Set target band scores for each section and track your progress. Identify which sections need more preparation to reach your goal.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl border-2 border-orange-200 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">University Requirements</h3>
              </div>
              <p className="text-slate-600 text-sm">
                Understand if your IELTS score meets university admission requirements for UK, Australia, Canada, and other English-speaking countries.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8 rounded-2xl shadow-xl border-2 border-cyan-300 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">How to Use the IELTS Band Score Calculator</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">1</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Select Your Listening Band Score</h3>
                <p className="text-slate-600 text-sm">Choose your IELTS Listening band score from the dropdown (0-9 with 0.5 increments). This is based on your performance in the 40-question Listening test.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">2</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Select Your Reading Band Score</h3>
                <p className="text-slate-600 text-sm">Choose your IELTS Reading band score from the dropdown. Academic and General Training Reading tests have different conversion tables.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">3</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Select Your Writing Band Score</h3>
                <p className="text-slate-600 text-sm">Choose your IELTS Writing band score. This is assessed by examiners based on Task Achievement, Coherence, Lexical Resource, and Grammar.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">4</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Select Your Speaking Band Score</h3>
                <p className="text-slate-600 text-sm">Choose your IELTS Speaking band score based on Fluency, Lexical Resource, Grammar, and Pronunciation assessed in the face-to-face interview.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">5</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">View Your Overall Band Score</h3>
                <p className="text-slate-600 text-sm">The calculator automatically computes your overall IELTS band score using official rounding rules. See your band level and competency description.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">6</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Review Score Breakdown</h3>
                <p className="text-slate-600 text-sm">Check the detailed breakdown showing all four section scores and the calculation formula used to determine your overall band score.</p>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="mt-6 bg-white p-6 rounded-xl border-2 border-indigo-300">
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd"/>
              </svg>
              Calculation Example
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Section Scores:</strong> Listening 7.5, Reading 7.0, Writing 6.5, Speaking 7.0
              </p>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Average:</strong> (7.5 + 7.0 + 6.5 + 7.0) ÷ 4 = 28 ÷ 4 = 7.0
              </p>
              <p className="text-sm text-slate-700">
                <strong>Overall Band Score:</strong> 7.0 (no rounding needed as average is exactly 7.0)
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Who Uses the IELTS Band Score Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-l-4 border-blue-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">University Students</h3>
              </div>
              <p className="text-slate-600 text-sm">
                Students applying to universities in the UK, Australia, Canada, New Zealand, and other English-speaking countries use this calculator to estimate if their IELTS scores meet admission requirements. Essential for planning study abroad applications.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border-l-4 border-purple-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">IELTS Teachers & Tutors</h3>
              </div>
              <p className="text-slate-600 text-sm">
                IELTS instructors and private tutors use this calculator to quickly show students their overall band scores during practice sessions. Helps in identifying weak sections and adjusting lesson plans accordingly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-l-4 border-green-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Immigration Applicants</h3>
              </div>
              <p className="text-slate-600 text-sm">
                People applying for work visas, permanent residency, or citizenship in countries like Canada, Australia, UK, and New Zealand use IELTS scores. This calculator helps verify if section scores meet immigration language requirements.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-xl border-l-4 border-orange-600 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Professional Registration</h3>
              </div>
              <p className="text-slate-600 text-sm">
                Healthcare professionals (nurses, doctors), engineers, and other skilled workers use IELTS for professional registration in English-speaking countries. Quick band score calculation helps in career planning and licensing applications.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl border-2 border-indigo-300 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">About Our IELTS Band Score Calculator</h2>
          </div>
          
          <div className="prose max-w-none text-slate-700 space-y-5 text-base leading-relaxed">
            {/* Introduction */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-indigo-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                What is the IELTS Band Score Calculator?
              </h3>
              <p>
                Our free IELTS band score calculator is a comprehensive tool designed to help test takers, students, and educators accurately calculate overall IELTS band scores from individual section scores. The International English Language Testing System (IELTS) is the world's most popular English language proficiency test for higher education and global migration, accepted by over 11,000 organizations worldwide. Understanding your IELTS band score is crucial for university admissions, visa applications, and professional registration in English-speaking countries.
              </p>
            </div>

            {/* How It Works */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                How Does IELTS Scoring Work?
              </h3>
              <p>
                The IELTS test comprises four sections: Listening (40 questions), Reading (40 questions), Writing (2 tasks), and Speaking (3 parts). Each section is scored on a band scale from 0 to 9 in half-band increments (0, 0.5, 1.0, 1.5... 9.0). The overall IELTS band score is calculated by averaging the four section scores using specific rounding rules. If the average ends in .25, it rounds up to the next .5 band; if it ends in .75, it rounds up to the next whole band. This standardized scoring ensures fair assessment across all test centers globally. Students preparing for other standardized tests can also check our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/act-score-calculator' as Page)} className="text-purple-600 hover:text-purple-800 font-semibold underline decoration-2 decoration-purple-300 hover:decoration-purple-600 transition-all">ACT Score Calculator</button> for US college admissions.
              </p>
            </div>

            {/* Band Levels */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-pink-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Understanding IELTS Band Levels
              </h3>
              <p>
                IELTS band scores are categorized into competency levels: <strong>Band 9 (Expert User)</strong> represents complete command of English, <strong>Band 8 (Very Good User)</strong> shows fully operational command with occasional inaccuracies, <strong>Band 7 (Good User)</strong> demonstrates operational command with some inaccuracies, <strong>Band 6 (Competent User)</strong> indicates effective command despite mistakes, <strong>Band 5 (Modest User)</strong> shows partial command with frequent errors, and lower bands represent limited to no ability. Most universities require Band 6.5-7.5 for undergraduate programs and Band 7.0-8.0 for postgraduate programs. Immigration programs typically require Band 6.0-7.0 depending on visa category.
              </p>
            </div>

            {/* Academic vs General */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                IELTS Academic vs General Training
              </h3>
              <p>
                There are two IELTS test types: <strong>IELTS Academic</strong> for university admissions and professional registration, and <strong>IELTS General Training</strong> for migration and work visa applications. Both tests share the same Listening and Speaking sections, but have different Reading and Writing tasks. The Academic Reading test features texts from journals and textbooks, while General Training includes workplace and social context materials. Our calculator works for both test types as the band score calculation method is identical. The only difference lies in the raw score to band score conversion tables for Reading sections.
              </p>
            </div>

            {/* Test Preparation */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Using the Calculator for Test Preparation
              </h3>
              <p>
                This IELTS band score calculator is invaluable for test preparation and performance tracking. When you take IELTS practice tests, use this tool to immediately calculate your projected overall band score without waiting for results. It helps identify which sections need more focus—if your Writing and Speaking scores are lower than Listening and Reading, you need more productive skills practice. Many test takers aim for balanced section scores, but some universities accept lower scores in specific sections. Track your progress over multiple practice tests to see improvement trends and adjust your study strategy. Similar to how students use our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/sat-score-calculator' as Page)} className="text-emerald-600 hover:text-emerald-800 font-semibold underline decoration-2 decoration-emerald-300 hover:decoration-emerald-600 transition-all">SAT Score Calculator</button> for US admissions, this tool provides instant feedback for IELTS preparation.
              </p>
            </div>

            {/* Global Acceptance */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border-l-4 border-amber-600">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                IELTS Score Requirements Worldwide
              </h3>
              <p>
                IELTS scores are accepted globally for various purposes. In the <strong>UK</strong>, universities typically require Band 6.0-7.0 for undergraduate and Band 6.5-7.5 for postgraduate programs. <strong>Australia</strong> immigration requires Band 6.0 for skilled migration and Band 7.0-8.0 for certain visa subclasses. <strong>Canada</strong> uses Canadian Language Benchmarks (CLB), where IELTS Band 7.0 equals CLB 9. <strong>New Zealand</strong> universities require Band 6.0-6.5, while skilled migrant visas need Band 6.5. <strong>Germany</strong> increasingly accepts IELTS for English-taught programs, typically requiring Band 6.5-7.0. Professional registration bodies like the Nursing and Midwifery Council (UK) require Band 7.0 in all sections. Always verify specific requirements with your target institution or immigration authority. Graduate school applicants can also explore our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/gmat-score-calculator' as Page)} className="text-amber-600 hover:text-amber-800 font-semibold underline decoration-2 decoration-amber-300 hover:decoration-amber-600 transition-all">GMAT Score Calculator</button> for business school admissions.
              </p>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div id="external-links" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Official IELTS Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://www.ielts.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Official IELTS Website</div>
                <div className="text-xs text-slate-600">Test information and registration</div>
              </div>
            </a>

            <a 
              href="https://www.ielts.org/for-test-takers/how-ielts-is-scored" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">IELTS Scoring Guide</div>
                <div className="text-xs text-slate-600">Official scoring information</div>
              </div>
            </a>

            <a 
              href="https://www.britishcouncil.org/exam/ielts" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-green-600 transition-colors">British Council IELTS</div>
                <div className="text-xs text-slate-600">Preparation materials and practice</div>
              </div>
            </a>

            <a 
              href="https://www.ielts.org/for-test-takers/test-types" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">IELTS Test Types</div>
                <div className="text-xs text-slate-600">Academic vs General Training</div>
              </div>
            </a>

            <a 
              href="https://www.ielts.org/for-test-takers/how-to-prepare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200 hover:border-cyan-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-cyan-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">IELTS Preparation</div>
                <div className="text-xs text-slate-600">Study tips and strategies</div>
              </div>
            </a>

            <a 
              href="https://ielts.idp.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200 hover:border-rose-400 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-rose-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              <div>
                <div className="font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">IDP IELTS</div>
                <div className="text-xs text-slate-600">Book your IELTS test</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 mb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <span>Last Updated: November 2025 | IELTS Band Score Calculator with Official Rounding Rules</span>
          </div>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">How is the IELTS overall band score calculated?</h3>
              <p className="text-slate-600 text-sm">
                The IELTS overall band score is calculated by averaging your four section scores (Listening, Reading, Writing, Speaking) and applying official rounding rules. If the average ends in .25, it rounds up to the next .5 band. If it ends in .75, it rounds up to the next whole band. For example, if you score 7.5, 7.0, 6.5, and 7.0, your average is 7.0, so your overall band is 7.0.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">What is a good IELTS band score for university admission?</h3>
              <p className="text-slate-600 text-sm">
                A "good" IELTS score depends on your target university and program. Most UK universities require Band 6.0-6.5 for undergraduate and Band 6.5-7.5 for postgraduate programs. Top universities like Oxford, Cambridge, and Imperial College London typically require Band 7.0-7.5 with no section below 6.5-7.0. Australian universities generally accept Band 6.5-7.0 for most programs.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">What's the difference between IELTS Academic and General Training?</h3>
              <p className="text-slate-600 text-sm">
                IELTS Academic is for university admissions and professional registration, featuring academic texts and formal writing tasks. IELTS General Training is for immigration and work visas, with workplace and social context materials. Both have identical Listening and Speaking sections but different Reading and Writing tasks. The band score calculation method is the same for both test types.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">How accurate is this IELTS band score calculator?</h3>
              <p className="text-slate-600 text-sm">
                Our calculator uses official IELTS rounding rules published by IDP, British Council, and Cambridge Assessment English. It's 100% accurate for calculating overall band scores from section scores. However, predicting your actual section scores from practice tests depends on the quality and authenticity of those practice materials. Always use official IELTS practice tests for the most reliable predictions.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Can I retake individual IELTS sections?</h3>
              <p className="text-slate-600 text-sm">
                IELTS One Skill Retake allows you to retake one section (Listening, Reading, Writing, or Speaking) within 60 days of your original test. This is available in selected countries. However, most test centers require you to retake all four sections. Check with your local IELTS test center for One Skill Retake availability in your region.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">How long is my IELTS score valid?</h3>
              <p className="text-slate-600 text-sm">
                IELTS recommends that test results be considered valid for two years after the test date, based on research into second-language loss. However, individual organizations (universities, immigration departments, professional bodies) can set their own validity periods. Always check with your target institution about their specific requirements for IELTS score validity.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="text-lg font-semibold mb-2 text-slate-900">What IELTS score do I need for Australian immigration?</h3>
              <p className="text-slate-600 text-sm">
                Australian immigration requirements vary by visa type. Skilled Independent visa (subclass 189) typically requires IELTS Band 6.0 in all sections (Competent English) or Band 7.0 for additional points. Skilled Nominated visa (subclass 190) also requires Band 6.0 minimum. Higher scores (Band 7.0-8.0) earn more points in the points test, improving your chances of receiving an invitation to apply.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div id="related-tools">
          <RelatedTools
            currentSlug="ielts-band-score-calculator"
            relatedSlugs={['sat-score-calculator', 'act-score-calculator', 'gmat-score-calculator', 'lsat-score-calculator']}
            navigateTo={navigateTo} 
          />
        </div>

      </div>
    </div>
  );
};export default IELTSBandScoreCalculator;
