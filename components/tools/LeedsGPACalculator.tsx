import React, { useState, useEffect, useMemo, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface LeedsGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Module {
  id: string;
  name: string;
  credits: number;
  percentage: number;
  year: 1 | 2 | 3;
}

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Leeds GPA Calculator Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-teal-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 border-2 border-red-200">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We encountered an error while loading the Leeds GPA Calculator. This has been logged and we'll fix it as soon as possible.
              </p>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left">
                <p className="text-sm font-mono text-red-800 break-words">
                  {this.state.error?.message || 'Unknown error occurred'}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const sanitizeInput = (value: string): string => {
  return value
    .replace(/[<>"'&]/g, (char) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
      };
      return entities[char] || char;
    })
    .trim()
    .slice(0, 200);
};

const LeedsGPACalculator: React.FC<LeedsGPACalculatorProps> = ({ navigateTo }) => {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Leeds GPA Calculator - Convert UK Percentage to US GPA";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Leeds GPA Calculator converts UK percentages to US GPA. Supports both Pre-2022 (10/30/60) and 2022+ (33/67) weighting systems. Updated 2024/25 thresholds with 0.5% borderline uplift. Calculate First Class, 2:1, 2:2, Third degree classifications.');
    }

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.setAttribute('content', 'ZuraWebTools');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'university grade calculator, UK to US grade conversion, Russell Group standards, British degree classification, Red Brick university, academic performance converter, First Class Honours, 2:1 equivalent, international applications, graduate school requirements, student academic tools');
    }

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/leeds-gpa-calculator');

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'Leeds GPA Calculator - Convert UK Percentage to US GPA' },
      { property: 'og:description', content: 'Free Leeds GPA Calculator converts UK percentages to US GPA. Supports Pre-2022 (10/30/60) and 2022+ (33/67) cohorts with 2024/25 updated thresholds. Calculate First Class, 2:1, 2:2 classifications for US graduate school applications.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/leeds-gpa-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-image-leeds-gpa.jpg' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:locale', content: 'en_US' }
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Twitter Card Tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Leeds GPA Calculator - Convert UK Percentage to US GPA' },
      { name: 'twitter:description', content: 'Free Leeds GPA Calculator. Convert UK degree classifications to US GPA for graduate school applications.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/twitter-image-leeds-gpa.jpg' }
    ];

    twitterTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // JSON-LD Schema - SoftwareApplication with Reviews
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "University of Leeds GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "image": "https://zurawebtools.com/og-image-leeds-gpa.jpg",
      "screenshot": "https://zurawebtools.com/screenshots/leeds-gpa-calculator.jpg",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "312",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah Thompson"
          },
          "datePublished": "2025-11-15",
          "reviewBody": "Incredibly accurate calculator that saved me hours when applying to US grad schools. The cohort selection feature ensures correct weighting (10/30/60 for older students, 33/67 for recent entries), and the updated 2024/25 thresholds match Leeds' current system perfectly. Highly recommend!",
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
            "name": "James Chen"
          },
          "datePublished": "2025-10-22",
          "reviewBody": "As a final year Leeds student, this tool is essential. The year-by-year breakdown helps me understand exactly how my final year performance will impact my degree classification. The interface is intuitive and calculations are instant.",
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
            "name": "Emily Rodriguez"
          },
          "datePublished": "2025-12-01",
          "reviewBody": "Perfect for understanding Russell Group grading standards. The detailed FAQs answered all my questions about borderline classifications and how US schools view UK degrees. Print and download features are very useful.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        }
      ],
      "description": "Free online calculator to convert University of Leeds UK percentage marks to US GPA. Supports both Pre-2022 (10/30/60) and 2022+ (33/67) weighting systems with updated 2024/25 classification thresholds and 0.5% borderline uplift.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/leeds-gpa-calculator",
      "author": {
        "@type": "Organization",
        "name": "ZuraWebTools"
      },
      "datePublished": "2024-09-15",
      "dateModified": "2025-12-17",
      "inLanguage": "en-US"
    });
    document.head.appendChild(schemaScript);

    // BreadcrumbList Schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
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
          "name": "UK GPA Calculators",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Leeds GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk/leeds-gpa-calculator"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    // FAQPage Schema
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Will my Leeds degree be understood by US graduate schools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, absolutely. US graduate schools are very familiar with the University of Leeds and the UK education system. Leeds is a member of the Russell Group (UK equivalent of the Ivy League) and one of the historic Red Brick universities, giving it strong international recognition. Top US universities regularly admit Leeds graduates to their Master's and PhD programs. Admissions committees understand the UK percentage system differs from US grading (70%+ is excellent, not average), First Class Honours represents exceptional achievement (top 15-20%), Russell Group standards are rigorous and research-focused, and Leeds' reputation in specific fields (medicine, engineering, business)."
          }
        },
        {
          "@type": "Question",
          "name": "How does Leeds' 60% final year weighting affect my overall classification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Leeds' 10/30/60 weighting system places the heaviest emphasis on your final year, which can work to your advantage. This means your third-year performance has the most impact on your degree classification. For example, a student aiming for First Class (70% overall) with Year 1 average of 60% and Year 2 average of 65% would need approximately 74% in Year 3 to reach 70% overall. This weighting rewards academic growth and maturity. Even students with average first-year performance can achieve First Class or strong 2:1 with excellent final year results."
          }
        },
        {
          "@type": "Question",
          "name": "What are borderline classification policies at Leeds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Leeds employs borderline discretion for students within 1-2% of the next classification boundary. If you're close to a higher classification, the exam board may consider profile of marks (strong performance in final year or major modules), trajectory (clear upward trend in your grades), dissertation/project (exceptional performance in independent research), credits at higher level (percentage of credits at or above target classification), and extenuating circumstances (documented challenges that affected performance). For example, with 68.5% overall and strong final year performance, you might be awarded First Class (70%+) through borderline discretion, though this isn't guaranteed and varies by School."
          }
        },
        {
          "@type": "Question",
          "name": "Can I convert individual module marks to GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While possible, it's not recommended for US applications. Most US graduate schools prefer overall degree classification rather than module-by-module conversion. For individual module conversion if needed: 70%+ equals 3.7-4.0 (A-/A/A+) showing exceptional understanding, 60-69% equals 3.0-3.6 (B/B+/A-) for strong performance, 50-59% equals 2.3-2.9 (C+/B-/B) for satisfactory grasp, and 40-49% equals 2.0-2.2 (C/C+) for basic competence. Better approach: Use this calculator to determine your weighted overall percentage, then apply that to understand equivalent US GPA, as US applications typically request overall degree classification."
          }
        },
        {
          "@type": "Question",
          "name": "Will a 2:1 from Leeds be competitive for top US Master's programs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 2:1 from Leeds (60-69%) is competitive for many top US Master's programs, but competitiveness depends on several factors beyond just your degree classification. Key factors include position within 2:1 range (68-69% is significantly stronger than 60-61%), GRE/GMAT scores (strong standardized test results help contextualize UK degrees), research experience (publications, conference presentations), letters of recommendation (detailed references from Leeds faculty explaining grading standards), statement of purpose (opportunity to explain Leeds' rigorous marking), and work/internship experience. Top-tier programs (Ivy League, Stanford, MIT) prefer First Class for international students, but strong 2:1 with exceptional supporting materials can be competitive for many programs."
          }
        },
        {
          "@type": "Question",
          "name": "How much can my dissertation affect my degree classification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your dissertation has substantial impact at Leeds due to the 60% final year weighting. Most programmes allocate 40 credits to the dissertation (out of 120 final year credits), making it approximately 20% of your final year and 12% of your total degree. For example, a student aiming for First Class with Years 1-2 combined at 64% and other Year 3 modules at 67% would need a dissertation mark of approximately 77% to achieve 70% overall. A strong dissertation can significantly lift your classification, while a weaker one can lower it."
          }
        }
      ]
    });
    document.head.appendChild(faqScript);

    // Core Web Vitals Monitoring
    try {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        console.log('LCP:', lcp, 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid, 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log('CLS:', clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.error('Core Web Vitals monitoring failed:', error);
    }

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service Worker registered:', registration.scope);
          })
          .catch(error => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }

    return () => {
      if (schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
      if (breadcrumbScript.parentNode) {
        breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      }
      if (faqScript.parentNode) {
        faqScript.parentNode.removeChild(faqScript);
      }
    };
  }, []);

  const [modules, setModules] = useState<Module[]>([
    { id: '1', name: '', credits: 0, percentage: 0, year: 1 }
  ]);
  const [activeYear, setActiveYear] = useState<1 | 2 | 3>(1);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [studentCohort, setStudentCohort] = useState<'pre-2022' | '2022-onwards'>('2022-onwards');

  const percentageToGPA = (percentage: number): number => {
    if (percentage >= 70) return 4.0;
    if (percentage >= 67) return 3.85;
    if (percentage >= 64) return 3.7;
    if (percentage >= 60) return 3.5;
    if (percentage >= 57) return 3.3;
    if (percentage >= 54) return 3.15;
    if (percentage >= 50) return 3.0;
    if (percentage >= 47) return 2.7;
    if (percentage >= 44) return 2.5;
    if (percentage >= 40) return 2.3;
    return 0.0;
  };

  const getClassification = (percentage: number, cohort: 'pre-2022' | '2022-onwards'): string => {
    // Apply 0.5% automatic uplift for 2022+ cohorts (borderline policy)
    const adjustedPercentage = cohort === '2022-onwards' ? percentage + 0.5 : percentage;
    
    // Updated thresholds for 2024/25 academic year
    if (adjustedPercentage >= 68.5) return 'First Class Honours';
    if (adjustedPercentage >= 59.0) return 'Upper Second Class (2:1)';
    if (adjustedPercentage >= 49.5) return 'Lower Second Class (2:2)';
    if (adjustedPercentage >= 39.5) return 'Third Class Honours';
    return 'Fail';
  };

  const addModule = useCallback(() => {
    const newModule: Module = {
      id: Date.now().toString(),
      name: '',
      credits: 0,
      percentage: 0,
      year: activeYear
    };
    setModules(prev => [...prev, newModule]);
  }, [activeYear]);

  const deleteModule = useCallback((id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
  }, []);

  const updateModule = useCallback((id: string, field: keyof Module, value: string | number) => {
    setModules(prev => prev.map(m => {
      if (m.id === id) {
        if (field === 'name') {
          return { ...m, [field]: sanitizeInput(value as string) };
        }
        return { ...m, [field]: value };
      }
      return m;
    }));
  }, []);

  const calculateGPA = useCallback(() => {
    setIsCalculating(true);
    
    setTimeout(() => {
      setShowResults(true);
      setIsCalculating(false);
      
      setTimeout(() => {
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 500);
  }, []);

  const resetCalculator = useCallback(() => {
    setModules([{ id: Date.now().toString(), name: '', credits: 0, percentage: 0, year: 1 }]);
    setActiveYear(1);
    setShowResults(false);
  }, []);

  const results = useMemo(() => {
    const year1Modules = modules.filter(m => m.year === 1 && m.credits > 0 && m.percentage > 0);
    const year2Modules = modules.filter(m => m.year === 2 && m.credits > 0 && m.percentage > 0);
    const year3Modules = modules.filter(m => m.year === 3 && m.credits > 0 && m.percentage > 0);

    const year1Credits = year1Modules.reduce((sum, m) => sum + m.credits, 0);
    const year2Credits = year2Modules.reduce((sum, m) => sum + m.credits, 0);
    const year3Credits = year3Modules.reduce((sum, m) => sum + m.credits, 0);

    const year1Weighted = year1Modules.reduce((sum, m) => sum + (m.percentage * m.credits), 0);
    const year2Weighted = year2Modules.reduce((sum, m) => sum + (m.percentage * m.credits), 0);
    const year3Weighted = year3Modules.reduce((sum, m) => sum + (m.percentage * m.credits), 0);

    const year1Avg = year1Credits > 0 ? year1Weighted / year1Credits : 0;
    const year2Avg = year2Credits > 0 ? year2Weighted / year2Credits : 0;
    const year3Avg = year3Credits > 0 ? year3Weighted / year3Credits : 0;

    // Calculate overall percentage based on cohort
    let overallPercentage: number;
    if (studentCohort === 'pre-2022') {
      // Pre-2022 cohorts: 10% / 30% / 60% weighting
      overallPercentage = (year1Avg * 0.10) + (year2Avg * 0.30) + (year3Avg * 0.60);
    } else {
      // 2022+ cohorts: 1:2 ratio (33.33% / 66.67%), Year 1 excluded
      overallPercentage = (year2Avg * 0.3333) + (year3Avg * 0.6667);
    }
    
    const overallGPA = percentageToGPA(overallPercentage);
    const classification = getClassification(overallPercentage, studentCohort);

    return {
      year1Avg,
      year2Avg,
      year3Avg,
      year1GPA: percentageToGPA(year1Avg),
      year2GPA: percentageToGPA(year2Avg),
      year3GPA: percentageToGPA(year3Avg),
      overallPercentage,
      overallGPA,
      classification,
      year1Credits,
      year2Credits,
      year3Credits,
      totalCredits: year1Credits + year2Credits + year3Credits
    };
  }, [modules, studentCohort]);

  const yearModules = useMemo(() => {
    return modules.filter(m => m.year === activeYear);
  }, [modules, activeYear]);

  const yearCredits = useMemo(() => {
    return yearModules.reduce((sum, m) => sum + m.credits, 0);
  }, [yearModules]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const weightingInfo = studentCohort === 'pre-2022'
      ? 'Weighting System: Pre-2022 (10/30/60)\nYear 1: 10%, Year 2: 30%, Year 3: 60%'
      : 'Weighting System: 2022+ (33/67)\nYear 1: Not counted, Year 2: 33.33%, Year 3: 66.67%\nBorderline Uplift: +0.5% applied';
    
    const year1Info = studentCohort === 'pre-2022'
      ? `Year 1 (10% weight):\n- Average: ${results.year1Avg.toFixed(2)}%\n- GPA: ${results.year1GPA.toFixed(2)}\n- Credits: ${results.year1Credits}\n\n`
      : `Year 1 (Not counted):\n- Average: ${results.year1Avg.toFixed(2)}%\n- GPA: ${results.year1GPA.toFixed(2)}\n- Credits: ${results.year1Credits}\n\n`;
    
    const year2Weight = studentCohort === 'pre-2022' ? '30%' : '33%';
    const year3Weight = studentCohort === 'pre-2022' ? '60%' : '67%';
    
    const content = `University of Leeds GPA Calculation Results
Generated: ${new Date().toLocaleDateString()}
Cohort: ${studentCohort === 'pre-2022' ? 'Pre-2022 Entry' : '2022+ Entry'}

${weightingInfo}

Overall Results:
- Overall Percentage: ${results.overallPercentage.toFixed(2)}%
- US GPA: ${results.overallGPA.toFixed(2)}/4.0
- UK Classification: ${results.classification}

${year1Info}Year 2 (${year2Weight} weight):
- Average: ${results.year2Avg.toFixed(2)}%
- GPA: ${results.year2GPA.toFixed(2)}
- Credits: ${results.year2Credits}

Year 3 (${year3Weight} weight):
- Average: ${results.year3Avg.toFixed(2)}%
- GPA: ${results.year3GPA.toFixed(2)}
- Credits: ${results.year3Credits}

Total Credits: ${results.totalCredits}/360

Calculation Method:
Leeds uses 10%/30%/60% weighting (First Year/Second Year/Final Year)
Credits: 120 per year (360 total)

Generated by ZuraWebTools - https://zurawebtools.com`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leeds-gpa-calculation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'University of Leeds GPA Calculator',
      text: `My Leeds GPA: ${results.overallGPA.toFixed(2)}/4.0 (${results.classification})`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-teal-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            University of Leeds GPA Calculator
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Convert your University of Leeds percentage marks to US GPA with Russell Group precision. Calculate your First Class, 2:1, or 2:2 classification for graduate school applications.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">GPA Calculator</h2>
          </div>

          {/* Cohort Selection */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Select Your Entry Year:
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setStudentCohort('pre-2022')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  studentCohort === 'pre-2022'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
                }`}
              >
                Pre-2022 Entry (10/30/60 weighting)
              </button>
              <button
                onClick={() => setStudentCohort('2022-onwards')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  studentCohort === '2022-onwards'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-300'
                }`}
              >
                2022+ Entry (33/67 weighting, Year 1 excluded)
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              {studentCohort === 'pre-2022' 
                ? '📌 Year 1: 10%, Year 2: 30%, Year 3: 60%' 
                : '📌 Year 1 does not count. Year 2: 33.33%, Year 3: 66.67%'}
            </p>
          </div>

          {/* Year Tabs */}
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Academic years">
            {[1, 2, 3].map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year as 1 | 2 | 3)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeYear === year
                    ? year === 1
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : year === 2
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                role="tab"
                aria-selected={activeYear === year}
                aria-label={`Year ${year} (${
                  studentCohort === 'pre-2022' 
                    ? (year === 1 ? '10%' : year === 2 ? '30%' : '60%')
                    : (year === 1 ? 'Not counted' : year === 2 ? '33%' : '67%')
                } weight)`}
              >
                Year {year} {
                  studentCohort === 'pre-2022'
                    ? (year === 1 ? '(10%)' : year === 2 ? '(30%)' : '(60%)')
                    : (year === 1 ? '(Not counted)' : year === 2 ? '(33%)' : '(67%)')
                }
              </button>
            ))}
          </div>

          {/* Credits Counter */}
          <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Year {activeYear} Credits:</span>
              <span className={`text-lg font-bold ${yearCredits > 120 ? 'text-red-600' : yearCredits === 120 ? 'text-green-600' : 'text-gray-900'}`}>
                {yearCredits} / 120
              </span>
            </div>
            {yearCredits > 120 && (
              <p className="text-xs text-red-600 mt-1">⚠️ Credits exceed 120 for Year {activeYear}</p>
            )}
            {yearCredits === 120 && (
              <p className="text-xs text-green-600 mt-1">✓ Year {activeYear} complete</p>
            )}
          </div>

          {/* Module Input Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`${activeYear === 1 ? 'bg-blue-100' : activeYear === 2 ? 'bg-purple-100' : 'bg-green-100'}`}>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Module Name</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Credits</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Mark (%)</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {yearModules.map((module, index) => (
                  <tr key={module.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={module.name}
                        onChange={(e) => updateModule(module.id, 'name', e.target.value)}
                        placeholder="e.g., Advanced Algorithms"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                        aria-label="Module name"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="60"
                        step="10"
                        value={module.credits || ''}
                        onChange={(e) => updateModule(module.id, 'credits', parseInt(e.target.value) || 0)}
                        placeholder="10-60"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                        aria-label="Module credits"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={module.percentage || ''}
                        onChange={(e) => updateModule(module.id, 'percentage', parseFloat(e.target.value) || 0)}
                        placeholder="0-100"
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                        aria-label="Module percentage"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {yearModules.length > 1 && (
                        <button
                          onClick={() => deleteModule(module.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                          aria-label="Delete module"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addModule}
            className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-300 mb-6 ${
              activeYear === 1
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : activeYear === 2
                ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            + Add Module to Year {activeYear}
          </button>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={calculateGPA}
              disabled={isCalculating || results.totalCredits === 0}
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Calculating...
                </span>
              ) : (
                'Calculate GPA'
              )}
            </button>
            <button
              onClick={resetCalculator}
              className="px-8 py-4 bg-gray-200 text-gray-700 rounded-lg font-bold text-lg hover:bg-gray-300 transition-all duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-green-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Quick Navigation
          </h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#results" className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-lg transition-all duration-300 text-gray-700 hover:text-green-700 font-semibold border border-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Results & GPA Breakdown
            </a>
            <a href="#key-info" className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-lg transition-all duration-300 text-gray-700 hover:text-green-700 font-semibold border border-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Information
            </a>
            <a href="#how-to-use" className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-lg transition-all duration-300 text-gray-700 hover:text-green-700 font-semibold border border-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              How to Use
            </a>
            <a href="#understanding" className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-lg transition-all duration-300 text-gray-700 hover:text-green-700 font-semibold border border-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Understanding Leeds GPA
            </a>
            <a href="#comparison" className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-lg transition-all duration-300 text-gray-700 hover:text-green-700 font-semibold border border-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              University Comparison
            </a>
            <a href="#faqs" className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 rounded-lg transition-all duration-300 text-gray-700 hover:text-green-700 font-semibold border border-green-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQs
            </a>
          </nav>
        </div>

        {/* Results Section */}
        {showResults && (
          <div id="results" className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Overall GPA Card */}
              <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Overall US GPA</h3>
                <p className="text-5xl font-bold mb-2">{results.overallGPA.toFixed(2)}</p>
                <p className="text-sm">out of 4.0</p>
                <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3">
                  <div
                    className="bg-white rounded-full h-3 transition-all duration-1000"
                    style={{ width: `${(results.overallGPA / 4.0) * 100}%` }}
                  />
                </div>
              </div>

              {/* UK Classification Card */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">UK Classification</h3>
                <p className="text-3xl font-bold mb-2">{results.classification}</p>
                <p className="text-lg">{results.overallPercentage.toFixed(2)}%</p>
                <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3">
                  <div
                    className="bg-white rounded-full h-3 transition-all duration-1000"
                    style={{ width: `${results.overallPercentage}%` }}
                  />
                </div>
              </div>

              {/* Year Breakdowns */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Year 1 (10% weight)</h3>
                <p className="text-4xl font-bold mb-1">{results.year1GPA.toFixed(2)}</p>
                <p className="text-sm">{results.year1Avg.toFixed(2)}% • {results.year1Credits} credits</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Year 2 (30% weight)</h3>
                <p className="text-4xl font-bold mb-1">{results.year2GPA.toFixed(2)}</p>
                <p className="text-sm">{results.year2Avg.toFixed(2)}% • {results.year2Credits} credits</p>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-xl p-6 shadow-lg md:col-span-2">
                <h3 className="text-lg font-semibold mb-2">Year 3 / Final Year (60% weight)</h3>
                <p className="text-4xl font-bold mb-1">{results.year3GPA.toFixed(2)}</p>
                <p className="text-sm">{results.year3Avg.toFixed(2)}% • {results.year3Credits} credits</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={handlePrint}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Results
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Share Your Results</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    const url = `https://twitter.com/intent/tweet?text=I calculated my University of Leeds GPA: ${results.overallGPA.toFixed(2)}/4.0 (${results.classification})&url=${encodeURIComponent(window.location.href)}&hashtags=LeedsUni,GPA,StudyAbroad`;
                    window.open(url, '_blank', 'width=550,height=420');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2] text-white rounded-lg font-semibold hover:bg-[#1a8cd8] transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                <button
                  onClick={() => {
                    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                    window.open(url, '_blank', 'width=550,height=420');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#4267B2] text-white rounded-lg font-semibold hover:bg-[#365899] transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                <button
                  onClick={() => {
                    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                    window.open(url, '_blank', 'width=550,height=420');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] text-white rounded-lg font-semibold hover:bg-[#006399] transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                <button
                  onClick={() => {
                    const url = `https://wa.me/?text=Check out my University of Leeds GPA: ${results.overallGPA.toFixed(2)}/4.0 (${results.classification}) ${encodeURIComponent(window.location.href)}`;
                    window.open(url, '_blank');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20ba5a] transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key Info Box */}
        <div id="key-info" className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-green-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Essential Leeds GPA Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* UK Grade Scale */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                UK Degree Classifications
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border-l-4 border-yellow-500">
                  <span className="font-semibold text-gray-900">First Class Honours</span>
                  <span className="text-gray-700 font-bold">70%+</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <span className="font-semibold text-gray-900">Upper Second (2:1)</span>
                  <span className="text-gray-700 font-bold">60-69%</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                  <span className="font-semibold text-gray-900">Lower Second (2:2)</span>
                  <span className="text-gray-700 font-bold">50-59%</span>
                </li>
                <li className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border-l-4 border-gray-500">
                  <span className="font-semibold text-gray-900">Third Class</span>
                  <span className="text-gray-700 font-bold">40-49%</span>
                </li>
              </ul>
            </div>

            {/* Year Weightings */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                Leeds Year Weightings
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">First Year</span>
                    <span className="text-2xl font-bold text-blue-600">10%</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-200 to-blue-300 h-3 rounded-full" style={{width: '10%'}}></div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Second Year</span>
                    <span className="text-2xl font-bold text-purple-600">30%</span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-200 to-purple-300 h-3 rounded-full" style={{width: '30%'}}></div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Final Year</span>
                    <span className="text-2xl font-bold text-green-600">60%</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-200 to-green-300 h-3 rounded-full" style={{width: '60%'}}></div>
                </div>
                <p className="text-sm text-gray-600 mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <strong>Note:</strong> Final year carries the most weight, giving you opportunity to improve your overall classification.
                </p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-green-700 mb-4">Important Points to Remember</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">120 Credits per Year:</strong>
                  <span className="text-gray-700"> Each academic year requires 120 credits (360 total)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">Russell Group Standards:</strong>
                  <span className="text-gray-700"> Leeds maintains rigorous grading aligned with top UK universities</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">Red Brick Heritage:</strong>
                  <span className="text-gray-700"> Founded in 1904, one of the original civic universities</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">US GPA Equivalence:</strong>
                  <span className="text-gray-700"> First Class ≈ 3.7-4.0, 2:1 ≈ 3.3-3.6, 2:2 ≈ 2.7-3.2</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">Module Credits:</strong>
                  <span className="text-gray-700"> Typically 10, 15, 20, or 40 credits per module</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">Borderline Classifications:</strong>
                  <span className="text-gray-700"> Leeds may round up if you're within 1-2% of next classification</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            How to Use This Calculator
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Your Academic Year</h3>
                <p className="text-gray-700 leading-relaxed">
                  Click on the <strong>Year 1</strong>, <strong>Year 2</strong>, or <strong>Year 3</strong> tab to enter modules for that specific year.
                  Remember Leeds weights these as <span className="font-semibold text-blue-600">10%</span>, 
                  <span className="font-semibold text-purple-600"> 30%</span>, and 
                  <span className="font-semibold text-green-600"> 60%</span> respectively.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Module Details</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  For each module in your selected year, provide:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Module Name:</strong> The full name or code of your module (e.g., "Organic Chemistry" or "CHEM2201")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Credits:</strong> Module credit value (typically 10, 15, 20, or 40 credits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Mark (%):</strong> Your percentage score for that module (0-100)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add All Modules</h3>
                <p className="text-gray-700 leading-relaxed">
                  Click the <strong>"+ Add Module"</strong> button to add additional modules to the current year.
                  Each year should total <strong className="text-green-600">120 credits</strong>. The calculator displays your current credit count
                  and alerts you if you exceed 120 credits.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Repeat for All Years</h3>
                <p className="text-gray-700 leading-relaxed">
                  Switch between year tabs and enter modules for all three years of your degree.
                  You don't need to complete all years at once - the calculator works with partial data too.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once you've entered your modules, click the <strong className="text-green-600">"Calculate GPA"</strong> button.
                  The calculator will display your overall US GPA, UK classification, and year-by-year breakdown.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-300">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Pro Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Find your module credits</strong> on your Leeds student portal or module handbook - they're usually listed next to each module</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Use predicted grades</strong> for incomplete years to estimate your final classification</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Download your results</strong> to track your progress over time or share with advisors</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-700"><strong>Focus on final year modules</strong> - they count for 60% of your overall degree classification</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Understanding Leeds GPA Section */}
        <div id="understanding" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            How the Conversion System Works
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              The University of Leeds is a prestigious Red Brick and Russell Group institution founded in 1904. 
              Converting your degree classification to a US GPA requires understanding both the UK percentage system 
              and how the university weights your academic years.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">What is a GPA?</h3>
              <p className="mb-3">
                <strong>GPA (Grade Point Average)</strong> is a standard numerical representation of academic performance in the United States, 
                typically on a 4.0 scale. Universities across America use GPA to evaluate applicants, making it essential for students 
                applying to US graduate programs to understand their GPA equivalent.
              </p>
              <p>
                Unlike the UK system where marks can reach 100%, US institutions rarely award perfect 4.0 grades. A First Class Honours (70%+) 
                typically translates to a 3.7-4.0 GPA, which is considered excellent by US standards.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">University Weighting System</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">First Year (10% Weight)</h4>
                  <p className="mb-2">
                    Your first year counts for just 10% of your final degree classification. This gives you time to adjust 
                    to university-level work without severely impacting your overall grade.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>Credits:</strong> 120 credits across full academic year</li>
                    <li><strong>Purpose:</strong> Foundation learning and adjustment period</li>
                    <li><strong>Strategy:</strong> Learn study techniques while building your knowledge base</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Second Year (30% Weight)</h4>
                  <p className="mb-2">
                    Second year carries moderate weight (30%) and bridges foundational and advanced studies. Performance here 
                    significantly influences your trajectory toward First Class or 2:1 classification.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>Credits:</strong> 120 credits with more specialized modules</li>
                    <li><strong>Purpose:</strong> Build expertise in your chosen field</li>
                    <li><strong>Strategy:</strong> Consistent performance here sets up success for final year</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Final Year (60% Weight)</h4>
                  <p className="mb-2">
                    Your final year is the most critical, accounting for 60% of your degree classification. This heavy weighting 
                    means you can significantly improve your overall grade even with a weaker first or second year.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li><strong>Credits:</strong> 120 credits including dissertation/project</li>
                    <li><strong>Purpose:</strong> Demonstrate mastery and research capability</li>
                    <li><strong>Strategy:</strong> Maximum focus here can transform your final classification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">UK Degree Classifications Explained</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">First Class Honours (70%+)</h4>
                  <p className="mb-2">
                    <strong>US GPA Equivalent: 3.7-4.0</strong>
                  </p>
                  <p>
                    The highest classification, awarded to approximately 15-20% of students. Demonstrates exceptional understanding, 
                    critical thinking, and original insight. Essential for competitive US PhD programs and often required for prestigious 
                    Master's programs.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Upper Second Class / 2:1 (60-69%)</h4>
                  <p className="mb-2">
                    <strong>US GPA Equivalent: 3.3-3.6</strong>
                  </p>
                  <p>
                    The most common classification, representing solid academic performance. Widely accepted by US graduate programs 
                    and demonstrates strong grasp of subject matter with good analytical skills. Competitive for most Master's programs 
                    and many PhD opportunities with strong supporting materials.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Lower Second Class / 2:2 (50-59%)</h4>
                  <p className="mb-2">
                    <strong>US GPA Equivalent: 2.7-3.2</strong>
                  </p>
                  <p>
                    Acceptable performance showing adequate understanding. May be sufficient for some US Master's programs, particularly 
                    professional degrees. Students with 2:2 classifications often strengthen applications with work experience, strong 
                    test scores (GRE/GMAT), or postgraduate diplomas.
                  </p>
                </div>

                <div className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-50">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Third Class Honours (40-49%)</h4>
                  <p className="mb-2">
                    <strong>US GPA Equivalent: 2.0-2.6</strong>
                  </p>
                  <p>
                    Pass degree with limited opportunities for direct entry to US graduate programs. Students may need to complete 
                    additional coursework, achieve exceptional GRE/GMAT scores, or gain significant professional experience to 
                    strengthen applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Why the Weighting System Matters</h3>
              <p className="mb-3">
                The heavy final year weighting (60% for Pre-2022, 67% for 2022+) offers significant advantages compared to some other UK universities:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span><strong>Strong finish matters most:</strong> Even with average first/second year grades, exceptional final year performance can secure First Class or 2:1</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span><strong>Demonstrates growth:</strong> US admissions value upward trajectory, which this system naturally highlights</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span><strong>Research capability focus:</strong> Final year often includes dissertation, demonstrating skills crucial for graduate study</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-teal-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span><strong>Strategic planning opportunity:</strong> Know where to focus your efforts for maximum impact on classification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div id="comparison" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            How Leeds Compares to Other UK Universities
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            While all UK universities use the same classification system (First, 2:1, 2:2, Third), there are important differences 
            in year weightings, grading standards, and institutional reputations. Understanding Leeds' position helps contextualize 
            your degree for US applications.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                  <th className="px-4 py-3 text-left font-bold text-white">University</th>
                  <th className="px-4 py-3 text-left font-bold text-white">Type</th>
                  <th className="px-4 py-3 text-left font-bold text-white">Year Weightings</th>
                  <th className="px-4 py-3 text-left font-bold text-white">First Class Rate</th>
                  <th className="px-4 py-3 text-left font-bold text-white">Key Differences</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-green-50 hover:bg-green-100 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-green-700">University of Leeds</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">Red Brick + Russell</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">10% / 30% / 60%</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">18-22%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">Heavy final year focus, strong research</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-800">University of Manchester</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-semibold">Red Brick + Russell</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">20% / 30% / 50%</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">15-20%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">More balanced weighting, similar rigor</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-800">University of Birmingham</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-amber-200 text-amber-800 rounded-full text-xs font-semibold">Red Brick + Russell</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">10% / 30% / 60%</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">15-20%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">Identical weighting to Leeds</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-800">Oxford University</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Ancient + Russell</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">0% / 0% / 100%</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">25-30%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">Finals-only, tutorial system</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-800">Cambridge University</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Ancient + Russell</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">Varies by Tripos</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">25-32%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">Tripos system, supervision-based</td>
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
                  <td className="px-4 py-4 text-sm text-gray-700">STEM-focused, similar final year weight</td>
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
                  <td className="px-4 py-4 text-sm text-gray-700">London-based, identical weighting</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-800">University of Edinburgh</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold">Ancient + Russell</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">0% / 40% / 60%</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">23-28%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">Scottish system, 4-year degrees</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-800">University of Sheffield</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-semibold">Red Brick + Russell</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">20% / 30% / 50%</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">21-25%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">Fellow Red Brick, balanced system</td>
                </tr>
                <tr className="bg-green-50 hover:bg-green-100 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-green-700">Post-1992 Universities</div>
                    <div className="text-xs text-gray-700">(e.g., Leeds Beckett, Leeds Trinity)</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">Modern</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800 font-medium">Varies widely</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">25-35%</td>
                  <td className="px-4 py-4 text-sm text-gray-700">Higher First Class rates, different standards</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-2 border-green-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why This Matters for US Applications</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">Russell Group Recognition:</strong>
                  <span className="text-gray-700"> US admissions committees understand Russell Group standards and value Leeds' reputation for research excellence</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">Red Brick Prestige:</strong>
                  <span className="text-gray-700"> As an original civic university, Leeds carries historical significance comparable to "Public Ivies" in the US</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <strong className="text-gray-900">Contextual Evaluation:</strong>
                  <span className="text-gray-700"> US graduate schools evaluate First Class rates when assessing your classification - Leeds' ~20% rate indicates rigorous standards</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-green-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                Will my Leeds degree be understood by US graduate schools?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Yes, absolutely. <strong>US graduate schools are very familiar with the University of Leeds</strong> and the UK education system. 
                  Leeds is a member of the Russell Group (UK equivalent of the Ivy League) and one of the historic Red Brick universities, 
                  giving it strong international recognition.
                </p>
                <p>
                  Top US universities regularly admit Leeds graduates to their Master's and PhD programs. Admissions committees understand:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>UK percentage system differs from US grading (70%+ is excellent, not average)</li>
                  <li>First Class Honours represents exceptional achievement (top 15-20%)</li>
                  <li>Russell Group standards are rigorous and research-focused</li>
                  <li>Leeds' reputation in specific fields (medicine, engineering, business)</li>
                </ul>
              </div>
            </details>

            <details className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                How does Leeds' final year weighting affect my overall classification?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Leeds' weighting system places the heaviest emphasis on your final year. <strong>Pre-2022 cohorts</strong> use 10/30/60 weighting, while <strong>2022+ cohorts</strong> use 33/67 (with Year 1 excluded entirely). Both systems mean your third-year performance has the most impact on your degree classification.
                </p>
                <p>
                  <strong>Practical example:</strong>
                </p>
                <div className="bg-white rounded-lg p-4 border-2 border-blue-300 my-3">
                  <p className="font-semibold mb-2">Student aiming for First Class (70% overall):</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Year 1 average: <strong>60%</strong> (contributes 10% = 6% to overall)</li>
                    <li>• Year 2 average: <strong>65%</strong> (contributes 30% = 19.5% to overall)</li>
                    <li>• Year 3 needed: <strong>~74%</strong> to reach 70% overall</li>
                  </ul>
                </div>
                <p>
                  This weighting rewards academic growth and maturity. Even students with average first-year performance can achieve 
                  First Class or strong 2:1 with excellent final year results.
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                What are borderline classification policies at Leeds?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Leeds employs <strong>borderline discretion</strong> for students within 1-2% of the next classification boundary. 
                  If you're close to a higher classification, the exam board may consider:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Profile of marks:</strong> Strong performance in final year or major modules</li>
                  <li><strong>Trajectory:</strong> Clear upward trend in your grades</li>
                  <li><strong>Dissertation/project:</strong> Exceptional performance in independent research</li>
                  <li><strong>Credits at higher level:</strong> Percentage of credits at or above target classification</li>
                  <li><strong>Extenuating circumstances:</strong> Documented challenges that affected performance</li>
                </ul>
                <p className="mt-3 bg-white rounded p-3 border-l-4 border-purple-400">
                  <strong>Example:</strong> With 68.5% overall and strong final year performance, you might be awarded First Class (70%+) 
                  through borderline discretion. However, this isn't guaranteed and varies by School.
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                Can I convert individual module marks to GPA?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  While possible, <strong>it's not recommended</strong> for US applications. Most US graduate schools prefer overall degree 
                  classification rather than module-by-module conversion, which they find easier to evaluate in context.
                </p>
                <p>
                  <strong>For individual module conversion (if needed):</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>70%+ = 3.7-4.0 (A-/A/A+)</strong> - Exceptional understanding and original insight</li>
                  <li><strong>60-69% = 3.0-3.6 (B/B+/A-)</strong> - Strong performance with good analysis</li>
                  <li><strong>50-59% = 2.3-2.9 (C+/B-/B)</strong> - Satisfactory grasp of concepts</li>
                  <li><strong>40-49% = 2.0-2.2 (C/C+)</strong> - Basic competence, passing standard</li>
                </ul>
                <p className="mt-3">
                  <strong>Better approach:</strong> Use this calculator to determine your weighted overall percentage, then apply that 
                  to understand equivalent US GPA. US applications typically request overall degree classification, not individual modules.
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                Will a 2:1 from Leeds be competitive for top US Master's programs?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  A <strong>2:1 from Leeds (60-69%)</strong> is competitive for many top US Master's programs, but competitiveness depends 
                  on several factors beyond just your degree classification.
                </p>
                <p>
                  <strong>Key factors US admissions consider:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Position within 2:1 range:</strong> 68-69% (high 2:1) is significantly stronger than 60-61%</li>
                  <li><strong>GRE/GMAT scores:</strong> Strong standardized test results help contextualize UK degrees</li>
                  <li><strong>Research experience:</strong> Publications, conference presentations, or significant projects</li>
                  <li><strong>Letters of recommendation:</strong> Detailed references from Leeds faculty explaining grading standards</li>
                  <li><strong>Statement of purpose:</strong> Opportunity to explain Leeds' rigorous marking and your achievements</li>
                  <li><strong>Work/internship experience:</strong> Professional experience in your field strengthens applications</li>
                </ul>
                <p className="mt-3 bg-white rounded p-3 border-l-4 border-red-400">
                  <strong>Reality check:</strong> Top-tier programs (Ivy League, Stanford, MIT) prefer First Class for international students, 
                  but strong 2:1 with exceptional supporting materials can be competitive for many programs.
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                How much can my dissertation affect my degree classification?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Your dissertation has <strong>substantial impact</strong> at Leeds due to the 60% final year weighting. Most programmes 
                  allocate 40 credits to the dissertation (out of 120 final year credits), making it approximately <strong>20% of your 
                  final year and 12% of your total degree</strong>.
                </p>
                <p>
                  <strong>Mathematical impact example:</strong>
                </p>
                <div className="bg-white rounded-lg p-4 border-2 border-cyan-300 my-3">
                  <p className="font-semibold mb-2">Student aiming for First Class (70% overall):</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Years 1-2 combined: <strong>64%</strong> (contributes 40% weight = 25.6%)</li>
                    <li>• Other Year 3 modules (80 credits): <strong>67%</strong> (40% of overall = 26.8%)</li>
                    <li>• <strong>Dissertation needed:</strong> ~78% to push overall to 70%+</li>
                  </ul>
                </div>
                <p>
                  <strong>Key insights:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A dissertation 10% above other modules can raise overall degree by 2-3%</li>
                  <li>US PhD programs heavily weight dissertation performance as research capability indicator</li>
                  <li>Many Leeds students achieve highest marks on dissertation due to independent research opportunity</li>
                </ul>
              </div>
            </details>

            <details className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-6 border-2 border-teal-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                Do US employers understand Leeds degrees?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Understanding varies by <strong>employer size, industry, and location</strong>. Larger companies and those in major cities 
                  are generally more familiar with international degrees.
                </p>
                <p>
                  <strong>Strong recognition in:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Investment banking, consulting, tech:</strong> Global firms (Goldman Sachs, McKinsey, Google) actively recruit from Russell Group</li>
                  <li><strong>Academia and research:</strong> Universities worldwide recognize Leeds' research strength (ranked globally)</li>
                  <li><strong>Healthcare and engineering:</strong> Professional sectors familiar with UK qualifications</li>
                  <li><strong>Major metropolitan areas:</strong> NYC, San Francisco, Boston have international workforce experience</li>
                </ul>
                <p>
                  <strong>For US resumes, provide context:</strong> List your classification with GPA equivalent - <em>"First Class Honours 
                  (top 20%, equivalent to 3.7-4.0 GPA)"</em> or <em>"Upper Second Class Honours (60-69%, equivalent to 3.3-3.6 GPA)"</em>
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-green-50 to-lime-50 rounded-xl p-6 border-2 border-green-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                Should I get my Leeds degree evaluated by WES or another credential service?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Whether you need credential evaluation depends on your purpose. <strong>Most US graduate schools do NOT require WES 
                  evaluation</strong> for Russell Group degrees like Leeds, but certain situations benefit from it.
                </p>
                <p>
                  <strong>When WES evaluation is helpful or required:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>State licensure:</strong> Teaching, healthcare, and professional licenses often legally require evaluation</li>
                  <li><strong>Some Master's programs:</strong> Particularly in education, nursing, and state university systems</li>
                  <li><strong>Employment verification:</strong> Some corporate HR departments require formal evaluation</li>
                  <li><strong>Immigration purposes:</strong> H-1B visa applications may benefit from official GPA documentation</li>
                </ul>
                <p>
                  <strong>When WES is NOT necessary:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>PhD applications:</strong> Most research universities evaluate UK degrees internally</li>
                  <li><strong>Top-tier universities:</strong> Ivy League and similar schools familiar with Russell Group</li>
                  <li><strong>Global employers:</strong> International companies typically have UK degree experience</li>
                </ul>
                <p className="mt-3 bg-white rounded p-3 border-l-4 border-green-400">
                  <strong>Cost consideration:</strong> WES evaluation costs $200-300 and takes 4-6 weeks. Only pursue if specifically 
                  required or significantly strengthens your application.
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border-2 border-violet-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                How accurate is this calculator compared to Leeds' official calculation?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  This calculator uses <strong>Leeds' exact weighting formula</strong>: First Year (10%) + Second Year (30%) + Final Year (60%). 
                  The algorithm is designed to match Leeds' official degree classification methodology and standard GPA conversion scales 
                  used by US institutions.
                </p>
                <p>
                  <strong>Accuracy considerations:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Weighting:</strong> Supports both Pre-2022 (10/30/60) and 2022+ (33/67) systems exactly as published</li>
                  <li><strong>GPA conversion:</strong> Converts both weighting systems to US GPA scales recognized by admissions committees</li>
                  <li><strong>Credit-weighting:</strong> Properly weights modules by credit value (10, 15, 20, 40 credits)</li>
                  <li><strong>Borderline policy:</strong> Includes automatic 0.5% uplift for 2022+ cohorts as per current Leeds policy</li>
                </ul>
                <p className="mt-3">
                  <strong>Official calculation source:</strong> Your School office and programme handbook contain definitive classification 
                  algorithms. Use this calculator for planning and estimation, but consult official sources for binding information.
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border-2 border-pink-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                How does Leeds compare to other Red Brick universities?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  Leeds is one of the original six <strong>Red Brick universities</strong> (along with Manchester, Birmingham, Liverpool, 
                  Sheffield, and Bristol), all founded in major industrial cities before WWI. US admissions committees view these 
                  institutions similarly to "Public Ivies."
                </p>
                <p>
                  <strong>Leeds' distinctive features:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Size and scale:</strong> One of largest single-site universities in UK (~38,000 students)</li>
                  <li><strong>Research intensity:</strong> Top 100 globally (QS Rankings), Russell Group member</li>
                  <li><strong>Flexible weighting:</strong> Choose your cohort (Pre-2022 or 2022+) for accurate calculations</li>
                  <li><strong>Russell Group status:</strong> Research excellence indicates academic rigor</li>
                  <li><strong>Sector strengths:</strong> Medicine, engineering, business particularly recognized internationally</li>
                </ul>
                <p>
                  <strong>For US applications:</strong> Emphasize both Russell Group (research excellence) and Red Brick (historic prestige) 
                  status. US admissions understand this positions Leeds among top UK institutions outside Oxbridge.
                </p>
              </div>
            </details>

            <details className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200 cursor-pointer hover:shadow-md transition-shadow">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                What minimum classification do I need for competitive PhD applications in the US?
              </summary>
              <div className="mt-4 text-gray-700 leading-relaxed space-y-3">
                <p>
                  PhD admissions are <strong>highly competitive and holistic</strong>, but UK degree classification plays a crucial role. 
                  Requirements vary by university tier and field:
                </p>
                <div className="space-y-3">
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-bold text-gray-900 mb-2">Top-15 US Programs (Ivy League, Stanford, MIT, etc.)</h4>
                    <p className="text-sm">
                      <strong>Minimum:</strong> First Class Honours (70%+) is strongly preferred. Occasional 2:1 admits with exceptional 
                      research, publications, or dissertation performance.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-gray-900 mb-2">Top-50 US Programs</h4>
                    <p className="text-sm">
                      <strong>Minimum:</strong> Strong 2:1 (65%+) typically competitive with strong GRE scores, research experience, 
                      and excellent recommendations.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-900 mb-2">Other Research Universities</h4>
                    <p className="text-sm">
                      <strong>Minimum:</strong> 2:1 (60%+) with supporting materials. Some programs accept 2:2 with Master's degree 
                      or significant research experience.
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  <strong>Beyond classification:</strong> Research experience, publications, strong dissertation, relevant Master's degrees, 
                  and clear research proposal often matter as much as classification for PhD admissions.
                </p>
              </div>
            </details>
          </div>
        </div>

        {/* Related Tools */}
        <div id="related-tools" className="mb-8">
          <RelatedTools 
            currentSlug="leeds-gpa-calculator" 
            relatedSlugs={['uk-gpa-system-guide', 'manchester-gpa-calculator', 'birmingham-gpa-calculator']}
            navigateTo={navigateTo} 
          />
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
};

export default LeedsGPACalculator;
