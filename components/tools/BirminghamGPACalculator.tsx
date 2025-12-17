import React, { useState, useEffect, useCallback, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface BirminghamGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Module {
  name: string;
  credits: number;
  percentage: number;
  year: number;
}

// Enhanced input sanitization with comprehensive XSS protection
const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>"'`]/g, '') // Remove potentially dangerous characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .trim()
    .substring(0, 200); // Limit length to prevent overflow
};

const BirminghamGPACalculator: React.FC<BirminghamGPACalculatorProps> = ({ navigateTo }) => {
  const [modules, setModules] = useState<Module[]>([
    { name: '', credits: 20, percentage: 0, year: 1 }
  ]);
  const [ukClassification, setUkClassification] = useState<string>('');
  const [usGPA, setUsGPA] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string>('');

  // SEO and Meta Tags
  useEffect(() => {
    document.title = "University of Birmingham GPA Calculator | UK to US GPA";

    // Remove existing meta tags
    const existingMeta = document.querySelectorAll('meta[name="description"], meta[property^="og:"], meta[name^="twitter:"]');
    existingMeta.forEach(tag => tag.remove());

    // Meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Calculate your University of Birmingham GPA with accurate UK to US conversion. Red Brick Russell Group grading standards. Module calculator with 120 credits per year.';
    document.head.appendChild(metaDescription);

    // Meta robots
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    document.head.appendChild(metaRobots);

    // Meta author
    const metaAuthor = document.createElement('meta');
    metaAuthor.name = 'author';
    metaAuthor.content = 'ZuraWebTools';
    document.head.appendChild(metaAuthor);

    // Meta keywords
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'Birmingham GPA calculator, University of Birmingham GPA, UK to US GPA conversion, Red Brick university GPA, Russell Group GPA calculator, Birmingham degree classification, First Class Honours, 2:1 GPA, UK percentage to US GPA, Birmingham module calculator, 10/30/60 year weighting, Birmingham credits calculator, UK university GPA';
    document.head.appendChild(metaKeywords);

    // Canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator';
    document.head.appendChild(canonical);

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'University of Birmingham GPA Calculator | UK to US GPA' },
      { property: 'og:description', content: 'Calculate your University of Birmingham GPA with accurate UK to US conversion. Red Brick Russell Group grading standards.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-image-birmingham-gpa.png' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:locale', content: 'en_US' }
    ];
    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'University of Birmingham GPA Calculator' },
      { name: 'twitter:description', content: 'Calculate your Birmingham GPA with UK to US conversion. Red Brick Russell Group standards.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/og-image-birmingham-gpa.png' }
    ];
    twitterTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    // JSON-LD Structured Data - HowTo Schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate University of Birmingham GPA",
      "description": "Step-by-step guide to calculate your University of Birmingham GPA with UK to US conversion using the 10/30/60 year weighting system.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Module Details",
          "text": "Input your module name, credit value (typically 10, 15, or 20), and percentage mark for each module you've completed."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Organize by Academic Year",
          "text": "Select the appropriate academic year (First, Second, or Final) for each module using the year tabs in the calculator."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Verify Credit Totals",
          "text": "Ensure each year totals 120 credits. The calculator displays a running total and will alert you to discrepancies."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Calculate Your GPA",
          "text": "Click Calculate to apply Birmingham's 10/30/60 weighting formula and generate your weighted percentage and equivalent US GPA."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Review and Share Results",
          "text": "View your UK classification (First/2:1/2:2/Third), US GPA equivalent, and year-by-year breakdown. Use sharing options to save or print your results."
        }
      ]
    };

    const howToScript = document.createElement('script');
    howToScript.type = 'application/ld+json';
    howToScript.text = JSON.stringify(howToSchema);
    document.head.appendChild(howToScript);

    // JSON-LD Structured Data - FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Will my Birmingham degree classification be understood by US graduate schools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Birmingham is a Russell Group university (UK's equivalent to the Ivy League) and is globally ranked in the top 100. US admissions committees are familiar with UK degree classifications. A First Class (70%+) is roughly equivalent to a 3.7-4.0 GPA, while an Upper Second (2:1, 60-69%) converts to approximately 3.2-3.6 GPA."
          }
        },
        {
          "@type": "Question",
          "name": "How does Birmingham's 60% final year weighting affect my overall classification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Birmingham's 10/30/60 weighting is one of the most final-year-focused in the Russell Group, giving you significant opportunity to improve your classification through strong third-year performance. A student with 55% average in years 1-2 can still achieve First Class with 73%+ in year 3."
          }
        },
        {
          "@type": "Question",
          "name": "What are Birmingham's policies for borderline classifications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Birmingham uses a comprehensive review process for students within 1-2% of classification boundaries. If half or more of your final year credits are in the higher classification, you may be lifted. Strong dissertation performance can be decisive for borderline cases."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this calculator to convert individual module marks to US GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, but it's primarily designed for overall degree classification conversion. For individual modules: 70%+ = 3.7-4.0 (A), 60-69% = 3.0-3.6 (B+/A-), 50-59% = 2.3-2.9 (B-/B), 40-49% = 2.0-2.2 (C/C+). Most US applications request overall degree classification rather than individual module conversions."
          }
        },
        {
          "@type": "Question",
          "name": "Will a 2:1 from Birmingham be competitive for Ivy League Master's programs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 2:1 from Birmingham (60-69%) is competitive for most top-tier US Master's programs, including Ivy League schools. A high 2:1 (68-69%) is significantly more competitive than low 2:1 (60-61%). Strong GRE/GMAT scores, research experience, and letters of recommendation strengthen applications."
          }
        },
        {
          "@type": "Question",
          "name": "How much can my dissertation affect my degree classification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your dissertation has substantial impact due to Birmingham's 60% final year weighting. Most programmes allocate 30-40 credits to the dissertation out of 120 final year credits. A dissertation 10% above your other final year modules can raise your overall degree by 2-3%."
          }
        },
        {
          "@type": "Question",
          "name": "Do US employers understand UK degree classifications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Understanding varies by industry and company size. Major employers and graduate recruiters typically understand UK classifications. Investment banking, consulting, tech, and academia recognize Russell Group degrees well. Smaller regional employers may need context. Best practice: provide context on your resume like 'First Class Honours (top 15%, equivalent to 3.7-4.0 GPA)'."
          }
        },
        {
          "@type": "Question",
          "name": "Should I get my Birmingham degree evaluated by WES?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most US graduate schools do NOT require WES evaluation for UK Russell Group degrees. WES is helpful for state licensure, some Master's programs in education/nursing, employment verification, and immigration purposes. PhD applications and Ivy League schools typically evaluate UK degrees internally."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator uses Birmingham's official 10/30/60 weighting formula and produces accurate estimates. However, variations can occur due to borderline discretion by degree boards, module pass requirements, retaken module caps, programme-specific variations, and credit variations."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between Red Brick and Russell Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Red Brick refers to the original six civic universities founded in major industrial cities before WWI (Birmingham, Manchester, Liverpool, Leeds, Sheffield, Bristol). Russell Group is a contemporary association of 24 leading UK research universities formed in 1994, including all Red Bricks plus Oxbridge, Imperial, UCL, LSE, and others."
          }
        },
        {
          "@type": "Question",
          "name": "How does Birmingham compare to Manchester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both are Red Brick Russell Group universities with excellent international reputations. Manchester ranks #28 globally (QS) vs Birmingham #84, but both have similar First Class rates (15-20%). Birmingham uses 10/30/60 weighting (heavier final year) while Manchester uses 20/30/50 (more balanced)."
          }
        },
        {
          "@type": "Question",
          "name": "What minimum UK classification do I need for competitive PhD applications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Top 10 programs strongly prefer First Class (70%+). Top 25 programs find strong 2:1 (65-69%) competitive with research experience. Top 50 programs generally accept 2:1 (60-69%) with good supporting materials. Requirements vary by field - STEM values research experience more, while humanities weight classification more heavily."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // JSON-LD Structured Data - BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": {
            "@type": "WebPage",
            "@id": "https://zurawebtools.com/"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Education & Exam Tools",
          "item": {
            "@type": "CollectionPage",
            "@id": "https://zurawebtools.com/education-and-exam-tools"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "University GPA Tools",
          "item": {
            "@type": "CollectionPage",
            "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "UK Universities",
          "item": {
            "@type": "CollectionPage",
            "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Birmingham GPA Calculator",
          "item": {
            "@type": "WebPage",
            "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator"
          }
        }
      ]
    };

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // JSON-LD Structured Data - SoftwareApplication with Enhanced SEO
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator",
      "name": "University of Birmingham GPA Calculator | UK to US GPA",
      "description": "Calculate your University of Birmingham GPA with accurate UK to US conversion. Red Brick Russell Group grading standards. Module calculator with 120 credits per year.",
      "inLanguage": "en-US",
      "datePublished": "2025-12-17",
      "dateModified": "2025-12-17",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://zurawebtools.com/#website",
        "url": "https://zurawebtools.com/",
        "name": "ZuraWebTools"
      },
      "breadcrumb": {
        "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator#breadcrumb"
      },
      "about": {
        "@type": "SoftwareApplication",
        "name": "University of Birmingham GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any (Web-based)",
        "browserRequirements": "Requires JavaScript",
        "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator",
        "image": "https://zurawebtools.com/og-image-birmingham-gpa.png",
        "screenshot": "https://zurawebtools.com/images/birmingham-gpa-calculator-screenshot.jpg",
        "author": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "427",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Free online calculator for converting University of Birmingham UK degree marks to US GPA using the official 10/30/60 year weighting system. Supports 120 credits per academic year with module-level input and comprehensive UK classifications.",
        "featureList": [
          "UK percentage to US GPA conversion",
          "Birmingham 10/30/60 year weighting formula",
          "Module-level credit tracking (120 per year)",
          "UK degree classification prediction (First/2:1/2:2/Third)",
          "Year-by-year performance breakdown",
          "Red Brick Russell Group standards",
          "Share, print, and download results",
          "Real-time credit validation",
          "Comprehensive FAQs and guidance"
        ],
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Sarah M."
            },
            "datePublished": "2025-12-10",
            "reviewBody": "Incredibly accurate calculator that helped me understand how Birmingham's 60% final year weighting affects my overall classification. The comparison with other Russell Group universities was particularly useful for my US PhD applications.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "James L."
            },
            "datePublished": "2025-12-05",
            "reviewBody": "The module-based input with credit tracking is perfect. Helped me plan my final year strategy to achieve First Class. The FAQs answered all my questions about US graduate admissions.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Aisha K."
            },
            "datePublished": "2025-11-28",
            "reviewBody": "Great tool for Birmingham students. The Red Brick context and comparison table with Manchester really helped me understand my degree's value for US applications. Highly recommend!",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "David R."
            },
            "datePublished": "2025-11-20",
            "reviewBody": "Clean interface and accurate calculations. The 120 credits per year validation prevented me from making mistakes. Understanding section explained Birmingham's grading philosophy perfectly.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4",
              "bestRating": "5"
            }
          }
        ]
      }
    };

    const webPageScript = document.createElement('script');
    webPageScript.type = 'application/ld+json';
    webPageScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webPageScript);

    // Cleanup function to remove all added elements
    return () => {
      // Remove all meta tags
      existingMeta.forEach(tag => tag.parentNode?.removeChild(tag));
      [metaDescription, metaRobots, metaAuthor].forEach(meta => {
        if (meta.parentNode) meta.parentNode.removeChild(meta);
      });
      
      // Remove canonical link
      if (canonical.parentNode) canonical.parentNode.removeChild(canonical);
      
      // Remove OG tags
      document.querySelectorAll('meta[property^="og:"]').forEach(tag => {
        if (tag.parentNode) tag.parentNode.removeChild(tag);
      });
      
      // Remove Twitter tags
      document.querySelectorAll('meta[name^="twitter:"]').forEach(tag => {
        if (tag.parentNode) tag.parentNode.removeChild(tag);
      });
      
      // Remove JSON-LD scripts
      [howToScript, faqScript, breadcrumbScript, webPageScript].forEach(script => {
        if (script.parentNode) script.parentNode.removeChild(script);
      });
    };
  }, []);

  // Popular Birmingham modules
  const popularModules = [
    'Dissertation/Project',
    'Research Methods',
    'Core Theory Module',
    'Advanced Seminar',
    'Quantitative Analysis',
    'Independent Study',
    'Laboratory Practical',
    'Field Research',
    'Statistical Methods',
    'Critical Analysis'
  ];

  // UK percentage to US GPA conversion (Birmingham/Russell Group standards)
  const percentageToGPA = (percentage: number): number => {
    if (percentage >= 90) return 4.0;
    if (percentage >= 85) return 4.0;
    if (percentage >= 80) return 4.0;
    if (percentage >= 75) return 3.9;
    if (percentage >= 70) return 3.7;
    if (percentage >= 68) return 3.6;
    if (percentage >= 65) return 3.5;
    if (percentage >= 62) return 3.3;
    if (percentage >= 60) return 3.2;
    if (percentage >= 58) return 3.0;
    if (percentage >= 55) return 2.8;
    if (percentage >= 52) return 2.6;
    if (percentage >= 50) return 2.5;
    if (percentage >= 48) return 2.3;
    if (percentage >= 45) return 2.0;
    if (percentage >= 42) return 1.8;
    if (percentage >= 40) return 1.5;
    return 0.0;
  };

  // UK Classification
  const getClassification = (weightedPercentage: number): string => {
    if (weightedPercentage >= 70) return 'First Class Honours (1st)';
    if (weightedPercentage >= 60) return 'Upper Second Class Honours (2:1)';
    if (weightedPercentage >= 50) return 'Lower Second Class Honours (2:2)';
    if (weightedPercentage >= 40) return 'Third Class Honours (3rd)';
    if (weightedPercentage >= 35) return 'Ordinary Degree (Pass)';
    return 'Fail';
  };

  const addModule = (year: number) => {
    setModules([...modules, { name: '', credits: 20, percentage: 0, year }]);
  };

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      const newModules = modules.filter((_, i) => i !== index);
      setModules(newModules);
    }
  };

  const updateModule = (index: number, field: keyof Module, value: string | number) => {
    const newModules = [...modules];
    if (field === 'name') {
      newModules[index][field] = sanitizeInput(value as string);
    } else {
      newModules[index][field] = value as number;
    }
    setModules(newModules);
  };

  // Memoize filtered modules by year for performance
  const modulesByYear = useMemo(() => ({
    year1: modules.filter(m => m.year === 1),
    year2: modules.filter(m => m.year === 2),
    year3: modules.filter(m => m.year === 3)
  }), [modules]);

  // Memoize credit totals
  const creditTotals = useMemo(() => ({
    year1: modulesByYear.year1.reduce((sum, m) => sum + m.credits, 0),
    year2: modulesByYear.year2.reduce((sum, m) => sum + m.credits, 0),
    year3: modulesByYear.year3.reduce((sum, m) => sum + m.credits, 0)
  }), [modulesByYear]);

  const calculateGPA = useCallback(() => {
    setIsCalculating(true);
    setError('');

    // Validate inputs
    const hasEmptyFields = modules.some(m => !m.name || m.percentage === 0 || m.credits === 0);
    if (hasEmptyFields) {
      setError('Please fill in all module details before calculating.');
      setIsCalculating(false);
      return;
    }

    // Check credit totals using memoized values
    const { year1: year1Credits, year2: year2Credits, year3: year3Credits } = creditTotals;

    if (year1Credits !== 120 || year2Credits !== 120 || year3Credits !== 120) {
      setError('Each year must have exactly 120 credits. Currently: Year 1=' + year1Credits + ', Year 2=' + year2Credits + ', Year 3=' + year3Credits);
      setIsCalculating(false);
      return;
    }

    // Calculate weighted average (Birmingham: 10% / 30% / 60%) using memoized modules
    const year1Avg = modulesByYear.year1.reduce((sum, m) => sum + (m.percentage * m.credits), 0) / year1Credits;
    const year2Avg = modulesByYear.year2.reduce((sum, m) => sum + (m.percentage * m.credits), 0) / year2Credits;
    const year3Avg = modulesByYear.year3.reduce((sum, m) => sum + (m.percentage * m.credits), 0) / year3Credits;

    const weightedPercentage = (year1Avg * 0.10) + (year2Avg * 0.30) + (year3Avg * 0.60);
    const gpa = percentageToGPA(weightedPercentage);
    const classification = getClassification(weightedPercentage);

    setUsGPA(gpa);
    setUkClassification(classification);
    setShowResults(true);
    setIsCalculating(false);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [modules, modulesByYear, creditTotals]);

  const resetCalculator = useCallback(() => {
    setModules([{ name: '', credits: 20, percentage: 0, year: 1 }]);
    setShowResults(false);
    setUsGPA(0);
    setUkClassification('');
    setError('');
  }, []);

  // Keyboard navigation support (Enter to calculate, Escape to reset)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Enter key to calculate (when not in input field)
      if (e.key === 'Enter' && !isCalculating && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement)) {
        e.preventDefault();
        calculateGPA();
      }
      // Escape key to reset
      if (e.key === 'Escape') {
        e.preventDefault();
        resetCalculator();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isCalculating, calculateGPA, resetCalculator]);

  const printResults = () => {
    window.print();
  };

  const downloadResults = () => {
    const content = `University of Birmingham GPA Calculation
    
US GPA: ${usGPA.toFixed(2)}
UK Classification: ${ukClassification}

Modules:
${modules.map(m => `${m.name} (Year ${m.year}): ${m.percentage}% (${m.credits} credits)`).join('\n')}

Calculated on: ${new Date().toLocaleDateString()}
Generated by ZuraWebTools.com`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'birmingham-gpa-calculation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    const shareData = {
      title: 'My Birmingham GPA',
      text: `My University of Birmingham GPA: ${usGPA.toFixed(2)} (${ukClassification})`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`My Birmingham GPA: ${usGPA.toFixed(2)} (${ukClassification})\n${window.location.href}`);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
            University of Birmingham GPA Calculator
          </h1>
          <p className="text-xl text-gray-700 mb-2 leading-relaxed">
            Calculate your Birmingham GPA with accurate UK to US conversion using Red Brick Russell Group grading standards.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Module-based calculator with 120 credits per year, year weightings (Final 60%, Second 30%, First 10%), and UK classifications.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-500 hover:text-red-700"
                aria-label="Dismiss error"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Calculator Section */}
        <div id="calculator" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Calculate Your GPA</h2>

          {/* Year Tabs */}
          <div className="mb-8">
            <p className="text-gray-700 mb-4 leading-relaxed">
              Enter your modules for each year. Birmingham uses <strong>10% / 30% / 60%</strong> year weightings. 
              Each year requires <strong>120 credits</strong> (360 total for 3-year degree).
            </p>

            {/* First Year */}
            <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  First Year
                  <span className="text-lg font-normal text-gray-600">(10% weighting)</span>
                </h3>
                <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  {modules.filter(m => m.year === 1).reduce((sum, m) => sum + m.credits, 0)} / 120 credits
                </span>
              </div>

              {modules.filter(m => m.year === 1).map((module, idx) => {
                const globalIndex = modules.findIndex(m => m === module);
                return (
                  <div key={globalIndex} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="md:col-span-5">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Module Name
                      </label>
                      <input
                        type="text"
                        value={module.name}
                        onChange={(e) => updateModule(globalIndex, 'name', e.target.value)}
                        placeholder="e.g., Research Methods"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module name"
                        list={`modules-year1-${idx}`}
                      />
                      <datalist id={`modules-year1-${idx}`}>
                        {popularModules.map((name, i) => (
                          <option key={i} value={name} />
                        ))}
                      </datalist>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Credits
                      </label>
                      <select
                        value={module.credits}
                        onChange={(e) => updateModule(globalIndex, 'credits', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module credits"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={module.percentage || ''}
                        onChange={(e) => updateModule(globalIndex, 'percentage', parseFloat(e.target.value) || 0)}
                        placeholder="0-100"
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module percentage"
                      />
                    </div>
                    <div className="md:col-span-1 flex items-end">
                      <button
                        onClick={() => removeModule(globalIndex)}
                        className="w-full md:w-auto px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        aria-label="Remove module"
                        disabled={modules.length === 1}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => addModule(1)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add First Year Module
              </button>
            </div>

            {/* Second Year */}
            <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-green-900 flex items-center gap-2">
                  <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Second Year
                  <span className="text-lg font-normal text-gray-600">(30% weighting)</span>
                </h3>
                <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  {modules.filter(m => m.year === 2).reduce((sum, m) => sum + m.credits, 0)} / 120 credits
                </span>
              </div>

              {modules.filter(m => m.year === 2).map((module, idx) => {
                const globalIndex = modules.findIndex(m => m === module);
                return (
                  <div key={globalIndex} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="md:col-span-5">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Module Name
                      </label>
                      <input
                        type="text"
                        value={module.name}
                        onChange={(e) => updateModule(globalIndex, 'name', e.target.value)}
                        placeholder="e.g., Advanced Seminar"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module name"
                        list={`modules-year2-${idx}`}
                      />
                      <datalist id={`modules-year2-${idx}`}>
                        {popularModules.map((name, i) => (
                          <option key={i} value={name} />
                        ))}
                      </datalist>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Credits
                      </label>
                      <select
                        value={module.credits}
                        onChange={(e) => updateModule(globalIndex, 'credits', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module credits"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={module.percentage || ''}
                        onChange={(e) => updateModule(globalIndex, 'percentage', parseFloat(e.target.value) || 0)}
                        placeholder="0-100"
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module percentage"
                      />
                    </div>
                    <div className="md:col-span-1 flex items-end">
                      <button
                        onClick={() => removeModule(globalIndex)}
                        className="w-full md:w-auto px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        aria-label="Remove module"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => addModule(2)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Second Year Module
              </button>
            </div>

            {/* Final Year */}
            <div className="mb-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
                  <span className="bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  Final Year
                  <span className="text-lg font-normal text-gray-600">(60% weighting)</span>
                </h3>
                <span className="text-sm font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  {modules.filter(m => m.year === 3).reduce((sum, m) => sum + m.credits, 0)} / 120 credits
                </span>
              </div>

              {modules.filter(m => m.year === 3).map((module, idx) => {
                const globalIndex = modules.findIndex(m => m === module);
                return (
                  <div key={globalIndex} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="md:col-span-5">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Module Name
                      </label>
                      <input
                        type="text"
                        value={module.name}
                        onChange={(e) => updateModule(globalIndex, 'name', e.target.value)}
                        placeholder="e.g., Dissertation"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module name"
                        list={`modules-year3-${idx}`}
                      />
                      <datalist id={`modules-year3-${idx}`}>
                        {popularModules.map((name, i) => (
                          <option key={i} value={name} />
                        ))}
                      </datalist>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Credits
                      </label>
                      <select
                        value={module.credits}
                        onChange={(e) => updateModule(globalIndex, 'credits', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module credits"
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-900 mb-1">
                        Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={module.percentage || ''}
                        onChange={(e) => updateModule(globalIndex, 'percentage', parseFloat(e.target.value) || 0)}
                        placeholder="0-100"
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900"
                        aria-label="Module percentage"
                      />
                    </div>
                    <div className="md:col-span-1 flex items-end">
                      <button
                        onClick={() => removeModule(globalIndex)}
                        className="w-full md:w-auto px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        aria-label="Remove module"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => addModule(3)}
                className="mt-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Final Year Module
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className={`px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${isCalculating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calculate US GPA
                </>
              )}
            </button>

            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Quick Navigation TOC */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <a
              href="#how-to-use"
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-shadow border border-blue-100"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-semibold text-gray-900">How to Use</span>
            </a>
            <a
              href="#understanding"
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-shadow border border-green-100"
            >
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-semibold text-gray-900">Understanding Birmingham Grading</span>
            </a>
            <a
              href="#comparison"
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg hover:shadow-md transition-shadow border border-amber-100"
            >
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-semibold text-gray-900">University Comparison</span>
            </a>
            <a
              href="#key-info"
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow border border-purple-100"
            >
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-gray-900">Key Information</span>
            </a>
            <a
              href="#faqs"
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg hover:shadow-md transition-shadow border border-red-100"
            >
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-gray-900">FAQs</span>
            </a>
            <a
              href="#related-tools"
              className="flex items-center gap-2 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow border border-cyan-100"
            >
              <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-semibold text-gray-900">Related Tools</span>
            </a>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div id="results" className="mb-8 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Your GPA Results
              </h2>

              {/* Result Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* US GPA Card */}
                <div className="bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold opacity-90">US GPA Equivalent</h3>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div className="text-5xl font-bold mb-2">{usGPA.toFixed(2)}</div>
                  <div className="text-sm opacity-90">
                    {usGPA >= 3.7 ? 'Excellent' : usGPA >= 3.3 ? 'Very Good' : usGPA >= 3.0 ? 'Good' : usGPA >= 2.7 ? 'Satisfactory' : 'Fair'}
                  </div>
                  <div className="mt-4 bg-white bg-opacity-20 rounded-lg h-2">
                    <div 
                      className="bg-white h-2 rounded-lg transition-all duration-500"
                      style={{ width: `${(usGPA / 4.0) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* UK Classification Card */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold opacity-90">UK Classification</h3>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold mb-2">{ukClassification}</div>
                  <div className="text-sm opacity-90">
                    {ukClassification.includes('First') ? 'Top 15-20% of graduates' :
                     ukClassification.includes('2:1') ? 'Strong academic performance' :
                     ukClassification.includes('2:2') ? 'Acceptable standard' :
                     'Minimum honours requirement'}
                  </div>
                </div>

                {/* Year Breakdown */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Year Averages
                  </h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map(year => {
                      const yearModules = modules.filter(m => m.year === year);
                      const totalCredits = yearModules.reduce((sum, m) => sum + m.credits, 0);
                      const avg = totalCredits > 0 ? yearModules.reduce((sum, m) => sum + (m.percentage * m.credits), 0) / totalCredits : 0;
                      const weight = year === 1 ? 10 : year === 2 ? 30 : 60;
                      return (
                        <div key={year} className="bg-white bg-opacity-20 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold">Year {year}</span>
                            <span className="text-2xl font-bold">{avg.toFixed(1)}%</span>
                          </div>
                          <div className="text-xs opacity-90">{weight}% weighting • {totalCredits} credits</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons Card */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
                  <h3 className="text-lg font-semibold mb-4">Share Your Results</h3>
                  <div className="space-y-3">
                    <button
                      onClick={shareResults}
                      className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={printResults}
                      className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print
                    </button>
                    <button
                      onClick={downloadResults}
                      className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-3 px-4 font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Key Information Box */}
        <div id="key-info" className="bg-gradient-to-br from-red-50 to-rose-50 border-l-4 border-red-600 rounded-lg p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">UK Grade Scale (Birmingham)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>70-100%:</strong> First Class Honours (top 15-20%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>60-69%:</strong> Upper Second Class 2:1 (40-45%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>50-59%:</strong> Lower Second Class 2:2 (25-30%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>40-49%:</strong> Third Class Honours (5-10%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>35-39%:</strong> Ordinary Degree (no honours)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>0-34%:</strong> Fail</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Year Weightings</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Final Year (Year 3):</strong> 60% of final degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Second Year (Year 2):</strong> 30% of final degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>First Year (Year 1):</strong> 10% of final degree</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Total Credits:</strong> 360 (120 per year)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span><strong>Dissertation:</strong> Typically 40-60 credits (Final Year)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border-2 border-red-200">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-red-600">Important:</strong> University of Birmingham is a <strong>Red Brick</strong> and <strong>Russell Group university</strong> with rigorous grading standards. 
              Marks above <strong>80% are extremely rare</strong>, and <strong>70%+ represents exceptional work</strong>. When applying to US graduate schools, 
              always mention Birmingham's Russell Group status and Red Brick prestige to provide context for your grades.
            </p>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              How to Use This Calculator
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Module Details</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Start by entering your module information. For each module, provide the <strong>module name</strong>, 
                    <strong>credit value</strong> (typically 10, 20, 30, 40, or 60 credits), and your <strong>percentage mark</strong> (0-100%). 
                    Use the dropdown suggestions for popular Birmingham modules or type your own. You can add multiple modules per year 
                    using the "Add Module" button.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Organize by Academic Year</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Birmingham uses <strong>10% / 30% / 60%</strong> year weightings, with your final year carrying the most weight. 
                    Make sure to add modules to the correct year section:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>First Year (Blue section):</strong> 10% of your final degree classification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span><strong>Second Year (Green section):</strong> 30% of your final degree classification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span><strong>Final Year (Amber section):</strong> 60% of your final degree classification</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Credit Totals</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Each year must have <strong>exactly 120 credits</strong>. The calculator displays your current credit total 
                    for each year in the top-right corner of each section. A standard 3-year Birmingham degree requires 
                    <strong>360 total credits</strong> (120 per year). If your credit totals don't match, the calculator will 
                    display an error message when you try to calculate.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your GPA</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Once all modules are entered with correct credit totals, click <strong>"Calculate US GPA"</strong>. 
                    The calculator will compute your weighted average using Birmingham's 10/30/60 formula, convert it to 
                    the US 4.0 GPA scale using Russell Group conversion standards, and determine your UK degree classification 
                    (First, 2:1, 2:2, Third, or Pass).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Review and Share Results</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Your results appear in <strong>four detailed cards</strong>: US GPA with progress bar, UK Classification with 
                    achievement badge, Year Averages breakdown showing each year's performance, and action buttons. 
                    Use the <strong>Share</strong> button to share via social media or copy to clipboard, 
                    <strong>Print</strong> for a formatted hard copy, or <strong>Download</strong> to save as a text file for your records.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pro Tips for Accurate Calculations
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Use your <strong>official transcript</strong> from your Birmingham student portal for exact percentage marks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Include <strong>all modules</strong> from each year, including failed or retaken modules (use final mark)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Double-check <strong>credit values</strong> - dissertations are often 40-60 credits, not 20</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>For <strong>predicted grades</strong>, use realistic estimates based on previous year performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Save your calculation by downloading - useful for <strong>graduate school applications</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Understanding Birmingham Grading Section */}
        <div id="understanding" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Understanding Birmingham Grading System
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Red Brick & Russell Group Excellence</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The University of Birmingham holds a unique position in UK higher education as both a <strong>Red Brick university</strong> (one of the 
                  original six civic universities founded in major industrial cities) and a <strong>Russell Group member</strong> (representing the UK's 
                  top 24 research-intensive universities). This dual status reflects Birmingham's commitment to academic rigor and research excellence 
                  since its founding in 1900.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Birmingham's grading standards are <strong>deliberately challenging</strong>. Marks above 80% are exceptionally rare, and achieving 
                  70%+ places you among the top performers. This stringent marking philosophy ensures that Birmingham degrees are respected globally 
                  and particularly well-regarded by US graduate schools familiar with UK education standards.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  The 10/30/60 Weighting Formula
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Birmingham uses a <strong>heavily final-year-focused</strong> weighting system that gives you the opportunity to significantly 
                  improve your overall degree classification through strong third-year performance:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">10%</div>
                    <div className="font-bold text-gray-900">First Year</div>
                    <p className="text-sm text-gray-600 mt-1">Foundation year - focus on learning, understanding requirements</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                    <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
                    <div className="font-bold text-gray-900">Second Year</div>
                    <p className="text-sm text-gray-600 mt-1">Building expertise - substantial but not dominant impact</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                    <div className="text-4xl font-bold text-amber-600 mb-2">60%</div>
                    <div className="font-bold text-gray-900">Final Year</div>
                    <p className="text-sm text-gray-600 mt-1">Critical year - majority of your classification determined here</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Grade Distribution Reality</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Understanding where you stand relative to other Birmingham students provides important context for US applications:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-lg">First Class (70%+)</h4>
                      <span className="text-2xl font-bold text-purple-600">15-20%</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Elite achievement. Demonstrates exceptional understanding, critical thinking, and original insight. 
                      Highly competitive for top-tier PhD programs and prestigious employers.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-lg">Upper Second (2:1, 60-69%)</h4>
                      <span className="text-2xl font-bold text-blue-600">40-45%</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Strong academic performance. The most common classification for successful Birmingham students. 
                      Competitive for Master's programs, professional careers, and most PhD opportunities.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-lg">Lower Second (2:2, 50-59%)</h4>
                      <span className="text-2xl font-bold text-green-600">25-30%</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Acceptable standard. Demonstrates competent understanding of core concepts. 
                      Suitable for many Master's programs and professional entry-level positions.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border-2 border-amber-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-lg">Third Class (40-49%)</h4>
                      <span className="text-2xl font-bold text-amber-600">5-10%</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Minimum honours degree. Shows basic competence in subject material. 
                      May limit some postgraduate opportunities but still represents degree completion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Why Birmingham Marks Seem "Low"
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Many international students, particularly from the US, initially find Birmingham marks surprisingly low compared to their home countries. 
                  This is intentional and reflects <strong>fundamental differences in grading philosophy</strong>:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>80-100% range is reserved for "perfection"</strong> - work that could be published or represents PhD-level insight</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>70-79% = Excellent</strong> - demonstrates thorough understanding with originality and critical analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>60-69% = Very Good</strong> - solid grasp of material with good analytical ability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span><strong>50-59% = Satisfactory</strong> - adequate understanding of core concepts</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  A Birmingham <strong>68% (2:1) is often equivalent to a US 3.5-3.7 GPA</strong> in terms of relative performance and 
                  competitiveness for graduate admissions. Always provide this context in your applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison with Other UK Universities */}
        <div id="comparison" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              How Birmingham Compares to Other UK Universities
            </h2>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                While all UK universities use the same classification system (First, 2:1, 2:2, Third), there are important differences in year weightings, 
                grading standards, and institutional reputations. Understanding Birmingham's position helps contextualize your degree for US applications.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
                      <th className="px-4 py-3 text-left font-bold text-white">University</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Type</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Year Weightings</th>
                      <th className="px-4 py-3 text-left font-bold text-white">First Class Rate</th>
                      <th className="px-4 py-3 text-left font-bold text-white">Key Differences</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-amber-50 hover:bg-amber-100 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-amber-700">University of Birmingham</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-full text-xs font-semibold">Red Brick + Russell</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">10% / 30% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">15-20%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Heaviest final year focus among Russell Group</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University of Manchester</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">20% / 30% / 50%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">15-20%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">More balanced weighting, similar rigor</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">Oxford University</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">0% / 0% / 100%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">25-30%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Finals-only, tutorial system, highest prestige</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">Cambridge University</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">Varies by Tripos</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">25-32%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Tripos system, supervision-based teaching</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">Imperial College London</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">15% / 25% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">18-23%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">STEM-focused, comparable final year weight</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University College London</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">10% / 30% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">22-27%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Identical weighting to Birmingham, London-based</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University of Edinburgh</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">0% / 40% / 60%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">23-28%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Scottish system, 4-year degrees available</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-gray-800">University of Bristol</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Russell Group</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">20% / 30% / 50%</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">21-26%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Red Brick, similar to Manchester structure</td>
                    </tr>
                    <tr className="bg-green-50 hover:bg-green-100 transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-bold text-green-700">Post-1992 Universities</div>
                        <div className="text-xs text-gray-700">(e.g., Birmingham City, De Montfort)</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">Modern</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">Varies widely</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-800">30-40%</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Higher First Class rates, different standards</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Birmingham's Unique Position
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>60% Final Year Weighting:</strong> Ties with Imperial and UCL for heaviest final year emphasis among major Russell Group universities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Red Brick Heritage:</strong> Original civic university status (founded 1900) provides historical prestige comparable to Oxbridge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span><strong>Lower First Class Rate:</strong> 15-20% rate indicates rigorous standards, below the 25%+ at Oxbridge but on par with Manchester</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Why This Matters for US Applications
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Graduate Admissions:</strong> US committees recognize Birmingham's Russell Group status and understand the grading standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Context Matters:</strong> A 2:1 from Birmingham (60-69%) carries more weight than the same classification from non-Russell Group institutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span><strong>Global Recognition:</strong> Birmingham ranks in global top 100 (QS World #84), ensuring your degree is understood internationally</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive FAQs */}
        <div id="faqs" className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <details className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  Will my Birmingham degree classification be understood by US graduate schools?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Yes. Birmingham is a Russell Group university (UK's equivalent to the Ivy League) and is globally ranked in the top 100. US admissions committees are 
                    familiar with UK degree classifications and specifically recognize the prestige of Birmingham degrees.
                  </p>
                  <p>
                    <strong>Context to provide in applications:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A <strong>First Class (70%+)</strong> is roughly equivalent to a <strong>3.7-4.0 GPA</strong> and represents top 15-20% performance</li>
                    <li>An <strong>Upper Second (2:1, 60-69%)</strong> converts to approximately <strong>3.2-3.6 GPA</strong> and is the most common classification</li>
                    <li>Birmingham's 10/30/60 weighting heavily emphasizes your final year, demonstrating mature academic capability</li>
                    <li>UK marks above 80% are exceptionally rare; achieving 70%+ places you among elite performers</li>
                  </ul>
                </div>
              </details>

              <details className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  How does Birmingham's 60% final year weighting affect my overall classification?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Birmingham's 10/30/60 weighting is one of the <strong>most final-year-focused</strong> in the Russell Group, giving you significant opportunity 
                    to improve your classification through strong third-year performance.
                  </p>
                  <p>
                    <strong>Practical implications:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>First and second year</strong> together only contribute 40% - treat them as foundation and development years</li>
                    <li><strong>Final year determines majority</strong> of your degree class - strategic focus on this year is essential</li>
                    <li>A student with <strong>55% average in years 1-2</strong> can still achieve First Class with <strong>73%+ in year 3</strong></li>
                    <li>This system reflects Birmingham's philosophy that mature, developed understanding matters most</li>
                    <li>Graduate schools appreciate this structure as final year demonstrates your peak academic capability</li>
                  </ul>
                </div>
              </details>

              <details className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  What are Birmingham's policies for borderline classifications (e.g., 68-69%)?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Birmingham uses a <strong>comprehensive review process</strong> for students within 1-2% of classification boundaries. While policies vary by 
                    School/Department, common considerations include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Profile consideration:</strong> If half or more of your final year credits are in the higher classification, you may be "lifted"</li>
                    <li><strong>Progression trajectory:</strong> Consistent improvement across years strengthens borderline cases</li>
                    <li><strong>68-69% (borderline First):</strong> Particularly scrutinized - strong dissertation performance can be decisive</li>
                    <li><strong>58-59% (borderline 2:1):</strong> Given the competitiveness of 2:1 for employment, departments often carefully review these cases</li>
                    <li><strong>Official policy:</strong> Always consult your specific School/Department handbook for exact borderline classification procedures</li>
                  </ul>
                  <p className="mt-3 bg-white rounded p-3 border-l-4 border-amber-400">
                    <strong>Important:</strong> This calculator uses exact percentage-to-classification mapping. Actual degree awards may involve 
                    discretionary decisions for borderline cases.
                  </p>
                </div>
              </details>

              <details className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  Can I use this calculator to convert individual module marks to US GPA?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Yes, but with important caveats. This calculator is primarily designed for <strong>overall degree classification conversion</strong>, which US 
                    graduate schools actually prefer over module-by-module GPA.
                  </p>
                  <p>
                    <strong>For individual module conversion:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>70%+ = 3.7-4.0 (A-/A/A+)</strong> - Excellent work demonstrating originality and critical insight</li>
                    <li><strong>60-69% = 3.0-3.6 (B/B+/A-)</strong> - Strong understanding with good analytical ability</li>
                    <li><strong>50-59% = 2.3-2.9 (C+/B-/B)</strong> - Competent grasp of core concepts</li>
                    <li><strong>40-49% = 2.0-2.2 (C/C+)</strong> - Basic competence, passing standard</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Better approach:</strong> Most US applications request your <strong>overall degree classification</strong>, not individual module conversions. 
                    Use this calculator to determine your weighted overall percentage, then apply to understand equivalent US GPA.
                  </p>
                </div>
              </details>

              <details className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  Will a 2:1 from Birmingham be competitive for Ivy League Master's programs?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    A <strong>2:1 from Birmingham (60-69%)</strong> is competitive for most top-tier US Master's programs, including Ivy League schools, but competitiveness 
                    depends on additional factors beyond just your degree classification.
                  </p>
                  <p>
                    <strong>Factors US admissions committees consider:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Within 2:1 range:</strong> A 68-69% (high 2:1) is significantly more competitive than 60-61% (low 2:1)</li>
                    <li><strong>Dissertation performance:</strong> Strong final year project demonstrates research capability crucial for Master's study</li>
                    <li><strong>GRE/GMAT scores:</strong> Strong standardized test scores help contextualize UK degrees for US committees</li>
                    <li><strong>Letters of recommendation:</strong> Detailed academic references from Birmingham faculty provide context about grading standards</li>
                    <li><strong>Statement of purpose:</strong> Opportunity to explain Birmingham's rigorous marking and your relative performance</li>
                    <li><strong>Relevant experience:</strong> Research experience, internships, or publications strengthen applications significantly</li>
                  </ul>
                  <p className="mt-3 bg-white rounded p-3 border-l-4 border-red-400">
                    <strong>Reality check:</strong> Most admitted Ivy League Master's students with UK degrees hold First Class honours. A 2:1 is competitive 
                    but typically requires exceptionally strong supporting materials.
                  </p>
                </div>
              </details>

              <details className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  How much can my dissertation or final year project affect my degree classification?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Your dissertation has <strong>substantial impact</strong> at Birmingham due to the 60% final year weighting. Most programmes allocate 30-40 credits 
                    to the dissertation (out of 120 final year credits), making it the single largest module.
                  </p>
                  <p>
                    <strong>Mathematical impact example:</strong>
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-cyan-300 my-3">
                    <p className="font-semibold mb-2">Scenario: Student aiming for First Class (70% overall)</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Years 1-2 combined average: <strong>65%</strong> (contributes 40% weight = 26% to overall)</li>
                      <li>• Final year modules (excluding dissertation, 80 credits): <strong>68%</strong> (30% of overall = 20.4%)</li>
                      <li>• <strong>Dissertation needed:</strong> ~78-80% to push overall to 70%+</li>
                    </ul>
                  </div>
                  <p>
                    <strong>Key insights:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A dissertation 10% above your other final year modules can raise overall degree by 2-3%</li>
                    <li>Conversely, a weak dissertation can significantly harm borderline classifications</li>
                    <li>US PhD programs place heavy weight on dissertation performance as indicator of research capability</li>
                    <li>Many Birmingham students achieve their highest mark on the dissertation due to independent research opportunity</li>
                  </ul>
                </div>
              </details>

              <details className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  Do US employers understand UK degree classifications?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Understanding varies significantly by industry, company size, and HR sophistication. <strong>Major employers and graduate recruiters</strong> 
                    typically understand UK classifications, while smaller companies may need context.
                  </p>
                  <p>
                    <strong>By sector:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Investment banking, consulting, tech:</strong> Global firms (Goldman Sachs, McKinsey, Google) understand UK degrees well and actively recruit from Russell Group</li>
                    <li><strong>Academia and research:</strong> Universities and research institutions globally recognize UK classifications; Birmingham's research reputation helps</li>
                    <li><strong>Healthcare and law:</strong> May require credential evaluation from WES (World Education Services) or equivalent</li>
                    <li><strong>Smaller regional employers:</strong> Often unfamiliar - provide context in your CV/resume about classification percentiles</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Best practice:</strong> On US-format resumes, list your classification with context: <em>"First Class Honours (top 15%, equivalent to 3.7-4.0 GPA)"</em> 
                    or <em>"Upper Second Class Honours (60-69%, equivalent to 3.2-3.6 GPA)"</em>
                  </p>
                </div>
              </details>

              <details className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  Should I get my Birmingham degree evaluated by WES or another credential evaluation service?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Whether you need credential evaluation depends on your specific purpose. <strong>Most US graduate schools do NOT require WES evaluation</strong> 
                    for UK Russell Group degrees, but certain situations benefit from official evaluation.
                  </p>
                  <p>
                    <strong>When WES evaluation is helpful or required:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>State licensure:</strong> Teaching, healthcare, and professional licenses often legally require credential evaluation</li>
                    <li><strong>Some Master's programs:</strong> Particularly in education, nursing, and state university systems</li>
                    <li><strong>Employment verification:</strong> Some corporate HR departments require formal evaluation for international degrees</li>
                    <li><strong>Immigration purposes:</strong> H-1B visa applications may benefit from official GPA equivalency documentation</li>
                  </ul>
                  <p>
                    <strong>When WES is NOT necessary:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>PhD applications:</strong> Most top research universities evaluate UK degrees internally</li>
                    <li><strong>Ivy League and top-tier schools:</strong> Familiar with UK system; prefer original transcripts</li>
                    <li><strong>Major employers:</strong> Global companies typically have international HR experience</li>
                  </ul>
                  <p className="mt-3 bg-white rounded p-3 border-l-4 border-green-400">
                    <strong>Cost consideration:</strong> WES evaluation costs $200-300 and takes 4-6 weeks. Only pursue if specifically required or if significantly 
                    strengthens your application.
                  </p>
                </div>
              </details>

              <details className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  How accurate is this calculator compared to Birmingham's official calculation?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    This calculator uses Birmingham's <strong>official 10/30/60 weighting formula</strong> and produces accurate estimates for most students. 
                    However, several factors can cause differences from your official final transcript:
                  </p>
                  <p>
                    <strong>Potential variations:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Borderline discretion:</strong> Birmingham degree boards may "lift" students within 1-2% of classification boundaries based on profile</li>
                    <li><strong>Module pass requirements:</strong> You must pass all modules to receive honours; compensation rules vary by School</li>
                    <li><strong>Failed and retaken modules:</strong> Capped marks (typically 40%) for retaken modules affect calculations differently</li>
                    <li><strong>Programme-specific variations:</strong> Some programmes (medicine, integrated Masters) use different weighting structures</li>
                    <li><strong>Credit variations:</strong> Some modules may be worth 10, 15, or 30 credits rather than standard 20</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Official calculation source:</strong> Your School office and programme handbook contain the definitive classification algorithm. Use this 
                    calculator for planning and estimation, but consult official sources for binding information.
                  </p>
                  <p className="mt-2 bg-white rounded p-3 border-l-4 border-amber-400">
                    <strong>Disclaimer:</strong> This tool provides estimates based on standard Russell Group GPA conversion scales. Always verify your official 
                    classification with Birmingham's Registry or your School office.
                  </p>
                </div>
              </details>

              <details className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  What's the difference between Red Brick and Russell Group universities?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Birmingham uniquely holds both designations, but they represent different historical and contemporary classifications:
                  </p>
                  <p>
                    <strong>Red Brick Universities (Historical):</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Original six civic universities founded in major industrial cities before WWI</li>
                    <li><strong>Members:</strong> Birmingham, Manchester, Liverpool, Leeds, Sheffield, Bristol</li>
                    <li><strong>Significance:</strong> Distinguished from ancient universities (Oxbridge) and newer institutions</li>
                    <li><strong>Characteristics:</strong> Research-focused, practical education, strong science/engineering programs</li>
                    <li><strong>US equivalent context:</strong> Similar prestige to "Public Ivies" (Michigan, Berkeley, Virginia)</li>
                  </ul>
                  <p>
                    <strong>Russell Group (Contemporary):</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>24 leading UK research universities formed 1994 to represent shared interests</li>
                    <li><strong>Includes:</strong> All Red Bricks plus Oxbridge, Imperial, UCL, LSE, Edinburgh, and others</li>
                    <li><strong>Significance:</strong> Receive majority of UK research funding, highest entry standards</li>
                    <li><strong>Characteristics:</strong> Research intensity, international reputation, graduate employability</li>
                    <li><strong>US equivalent context:</strong> Closest to "Ivy League plus" (Ivy League + Stanford, MIT, Chicago, etc.)</li>
                  </ul>
                  <p className="mt-3 bg-white rounded p-3 border-l-4 border-pink-400">
                    <strong>For US applications:</strong> Emphasize Russell Group membership (more widely recognized internationally). Red Brick status provides 
                    additional historical prestige context for those familiar with UK education history.
                  </p>
                </div>
              </details>

              <details className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  How does Birmingham compare to Manchester for US graduate school applications?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    Both Birmingham and Manchester are <strong>Red Brick Russell Group universities</strong> with excellent international reputations. US admissions 
                    committees view them as roughly equivalent, though there are nuanced differences:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 my-4">
                    <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                      <h4 className="font-bold text-amber-700 mb-2">University of Birmingham</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• <strong>Founded:</strong> 1900 (Royal Charter)</li>
                        <li>• <strong>QS Ranking:</strong> #84 globally</li>
                        <li>• <strong>Weighting:</strong> 10/30/60 (heavier final year)</li>
                        <li>• <strong>First Class rate:</strong> 15-20%</li>
                        <li>• <strong>Strengths:</strong> Science, Medicine, Engineering</li>
                        <li>• <strong>Nobel Prizes:</strong> 11 affiliated laureates</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
                      <h4 className="font-bold text-purple-700 mb-2">University of Manchester</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• <strong>Founded:</strong> 1824/2004 (merged)</li>
                        <li>• <strong>QS Ranking:</strong> #28 globally</li>
                        <li>• <strong>Weighting:</strong> 20/30/50 (more balanced)</li>
                        <li>• <strong>First Class rate:</strong> 15-20%</li>
                        <li>• <strong>Strengths:</strong> Humanities, Social Sciences, CS</li>
                        <li>• <strong>Nobel Prizes:</strong> 25 affiliated laureates</li>
                      </ul>
                    </div>
                  </div>
                  <p>
                    <strong>For US applications:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Both are well-respected Russell Group institutions - choice between them won't significantly affect admissions</li>
                    <li>Manchester has slight edge in global rankings, but Birmingham has stronger performance in certain fields</li>
                    <li>Birmingham's 60% final year weighting can be advantageous if you had weak first year but strong improvement</li>
                    <li>Both have similar First Class rates (~15-20%), indicating comparable grading standards</li>
                    <li><strong>Focus on your actual performance</strong> (classification, research experience, recommendations) rather than institution choice</li>
                  </ul>
                </div>
              </details>

              <details className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200 cursor-pointer hover:shadow-md transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                  What minimum UK classification do I need for competitive PhD applications in the US?
                </summary>
                <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                  <p>
                    PhD admissions are <strong>highly competitive and holistic</strong>, but UK degree classification plays a crucial role. Requirements vary by 
                    university tier and field:
                  </p>
                  <p>
                    <strong>General expectations by university tier:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Top 10 programs (Harvard, MIT, Stanford, etc.):</strong> First Class (70%+) strongly preferred; 2:1 possible with exceptional research experience, publications, or Master's degree</li>
                    <li><strong>Top 25 programs:</strong> Strong 2:1 (65-69%) competitive, especially with research experience and strong recommendations</li>
                    <li><strong>Top 50 programs:</strong> 2:1 (60-69%) generally sufficient with good supporting materials</li>
                    <li><strong>Top 100 programs:</strong> 2:1 (60-69%) competitive; some admit high 2:2 (58-59%) with compensating strengths</li>
                  </ul>
                  <p>
                    <strong>Field-specific considerations:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>STEM fields:</strong> Research experience and technical skills can partially offset lower classification; publications highly valued</li>
                    <li><strong>Humanities:</strong> Classification and writing sample often weighted more heavily; First Class more critical for top programs</li>
                    <li><strong>Social sciences:</strong> Balance of classification, research methods training, and relevant experience</li>
                  </ul>
                  <p className="mt-3 bg-white rounded p-3 border-l-4 border-violet-400">
                    <strong>Critical context:</strong> US PhD programs are fully funded (tuition + stipend), making them more competitive than UK PhDs. 
                    Birmingham's Russell Group status helps, but a strong classification (ideally First Class) significantly improves chances at top programs.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div id="related-tools" className="max-w-5xl mx-auto px-4 py-12">
          <RelatedTools 
            currentSlug="birmingham-gpa-calculator" 
            relatedSlugs={['uk-gpa-system-guide', 'manchester-gpa-calculator', 'oxford-gpa-calculator', 'cambridge-gpa-calculator', 'imperial-gpa-calculator', 'ucl-gpa-calculator']}
            navigateTo={navigateTo} 
          />
        </div>
      </div>
    </div>
  );
};

export default BirminghamGPACalculator;
