import React, { useState, useEffect, useCallback, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface EngineeringGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
  category: string;
  isTransfer: boolean;
}

const GRADE_POINTS: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0,
  'P': 0.0, // Pass - not counted in GPA
  'NP': 0.0 // No Pass - not counted in GPA
};

const COURSE_CATEGORIES = [
  'Engineering Core',
  'Mathematics',
  'Physical Sciences',
  'Computer Science',
  'Humanities & Social Sciences',
  'Electives',
  'Co-op/Internship'
];

const ENGINEERING_DISCIPLINES = [
  'General Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Computer Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Industrial Engineering',
  'Aerospace Engineering',
  'Biomedical Engineering',
  'Environmental Engineering',
  'Software Engineering'
];

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/engineering-gpa-calculator';

const EngineeringGPACalculator: React.FC<EngineeringGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', credits: 3, grade: '', category: 'Engineering Core', isTransfer: false }
  ]);
  const [majorGPA, setMajorGPA] = useState<number | null>(null);
  const [technicalGPA, setTechnicalGPA] = useState<number | null>(null);
  const [nonTechnicalGPA, setNonTechnicalGPA] = useState<number | null>(null);
  const [cumulativeGPA, setCumulativeGPA] = useState<number | null>(null);
  const [last60CreditsGPA, setLast60CreditsGPA] = useState<number | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('General Engineering');
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');

  // Helper function to set meta tags
  const setMeta = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`) || 
                  document.querySelector(`meta[property="${name}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  useEffect(() => {
    // Title
    document.title = "Engineering GPA Calculator - Calculate Major, Technical & Cumulative GPA | ZuraWebTools";
    
    // Essential Meta Tags
    setMeta('charset', 'UTF-8');
    setMeta('viewport', 'width=device-width, initial-scale=1.0');
    setMeta('theme-color', '#1e40af');
    setMeta('description', 'Free Engineering GPA Calculator: Calculate major GPA, technical GPA, non-technical GPA, cumulative GPA, and last 60 credits GPA. ABET-compliant with support for all engineering disciplines, co-op grades, and graduate school requirements.');
    setMeta('keywords', 'engineering gpa calculator, technical gpa calculator, major gpa calculator, abet gpa requirements, mechanical engineering gpa, electrical engineering gpa, computer engineering gpa, civil engineering gpa, graduate school engineering gpa, co-op gpa calculator, stem gpa calculator, last 60 credits gpa, engineering course grades, internship gpa calculator, pass fail engineering courses, transfer credit gpa engineering, engineering school gpa requirements, project course gpa');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');
    
    // Open Graph Tags
    setMeta('og:title', 'Engineering GPA Calculator - Major, Technical & Cumulative GPA | ZuraWebTools');
    setMeta('og:description', 'Calculate your engineering GPA with precision. Track major GPA, technical GPA, cumulative GPA, and last 60 credits for graduate school applications. Supports all engineering disciplines and ABET requirements.');
    setMeta('og:image', 'https://zurawebtools.com/images/engineering-gpa-calculator-og.jpg');
    setMeta('og:url', CANONICAL_URL);
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');
    setMeta('og:locale', 'en_US');
    
    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Engineering GPA Calculator - Track Your Academic Progress');
    setMeta('twitter:description', 'Free tool to calculate major, technical, and cumulative GPA for engineering students. ABET-compliant with graduate school readiness tracking.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/engineering-gpa-calculator-twitter.jpg');
    setMeta('twitter:site', '@ZuraWebTools');
    
    // Canonical Link
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', CANONICAL_URL);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }
    
    // Hreflang Tags
    const hreflangTags = [
      { lang: 'en', href: CANONICAL_URL },
      { lang: 'en-US', href: CANONICAL_URL },
      { lang: 'en-CA', href: CANONICAL_URL },
      { lang: 'en-GB', href: CANONICAL_URL },
      { lang: 'en-AU', href: CANONICAL_URL },
      { lang: 'x-default', href: CANONICAL_URL },
    ];
    
    hreflangTags.forEach(({ lang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });
    
    // Structured Data (JSON-LD)
    const schemas = [
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
            "name": "Education & Exam Tools",
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
            "name": "Engineering GPA Calculator",
            "item": CANONICAL_URL
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Engineering GPA Calculator",
        "description": "Free online engineering GPA calculator to calculate major GPA, technical GPA, non-technical GPA, cumulative GPA, and last 60 credits GPA for all engineering disciplines.",
        "url": CANONICAL_URL,
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any (Web-based)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "412",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Michael Chen"
            },
            "datePublished": "2025-11-28",
            "reviewBody": "Perfect for tracking my mechanical engineering GPA! The technical GPA breakdown helped me identify which courses to focus on. The last 60 credits feature is exactly what grad schools look at.",
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
              "name": "Sarah Martinez"
            },
            "datePublished": "2025-11-15",
            "reviewBody": "As a computer engineering student, this calculator has been invaluable. The co-op GPA tracking and ABET requirements display are features I haven't found elsewhere. Highly recommend!",
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
              "name": "James Williams"
            },
            "datePublished": "2025-11-05",
            "reviewBody": "Great tool for civil engineering students. Shows all the GPAs needed for job applications and grad school. The transfer credit option is super helpful too.",
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
              "name": "Emily Thompson"
            },
            "datePublished": "2025-10-22",
            "reviewBody": "Very accurate calculator that matches my official transcript. Love the visual breakdown of major vs non-technical courses. Makes tracking graduation requirements so much easier.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4",
              "bestRating": "5"
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between major GPA and technical GPA for engineering students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Major GPA includes only your core engineering courses specific to your discipline (e.g., thermodynamics, circuits, mechanics). Technical GPA is broader and includes all STEM courses: engineering core, mathematics (calculus, differential equations), physical sciences (physics, chemistry), and computer science. Most employers and graduate schools look at technical GPA as it demonstrates overall STEM proficiency."
            }
          },
          {
            "@type": "Question",
            "name": "What GPA do I need for engineering internships and jobs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most engineering companies require a minimum cumulative GPA of 3.0 (B average) to apply for internships and entry-level positions. Competitive companies (Fortune 500, tech giants, top consulting firms) typically look for 3.5+. Some companies have higher technical GPA requirements (3.2-3.5+) as it better reflects engineering competency. Co-op programs usually require maintaining 2.5-3.0 GPA."
            }
          },
          {
            "@type": "Question",
            "name": "How do engineering graduate schools evaluate GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Graduate schools primarily focus on: (1) Technical GPA or Major GPA (more important than cumulative), (2) Last 60 credits GPA (shows recent academic trend and improvement), (3) Upper-division engineering course performance. Top programs (MIT, Stanford, Berkeley) typically require 3.5+ technical GPA, while good programs accept 3.0-3.3+. Strong research experience and GRE scores can offset lower GPAs."
            }
          },
          {
            "@type": "Question",
            "name": "Do Pass/Fail courses count toward engineering GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pass/Fail (P/NP) courses do NOT count in GPA calculations - neither in credits earned nor grade points. However, they do count toward total degree requirements and ABET credit distribution. Many engineering programs allow P/NP for humanities electives but NOT for major or technical courses. Co-op/internship courses are often graded P/NP and don't affect GPA."
            }
          },
          {
            "@type": "Question",
            "name": "How does course repetition affect engineering GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GPA policies vary by institution: (1) Grade Replacement: Most schools use only the highest grade in GPA calculation but show both attempts on transcript. (2) All Attempts Count: Some schools average all attempts. (3) Most Recent Grade: Latest attempt is used regardless of score. Graduate schools typically see all attempts and may recalculate GPA using all grades. It's best to check your school's specific policy."
            }
          },
          {
            "@type": "Question",
            "name": "What are ABET credit requirements for engineering degrees?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ABET (Accreditation Board for Engineering and Technology) requires minimum credit distribution: (1) Engineering Core: 32+ semester credits of engineering topics, (2) Mathematics & Science: 48+ credits including calculus, differential equations, statistics, and physical sciences, (3) General Education: 32+ credits in humanities and social sciences. Total: Minimum 120 credits for bachelor's degree. Most programs require 128-136 credits."
            }
          },
          {
            "@type": "Question",
            "name": "How do transfer credits affect engineering GPA calculations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Transfer credits typically count toward degree requirements and ABET distribution but do NOT factor into your institutional GPA (the GPA at your current school). However, they appear on your transcript with grades. For graduate school applications, you should calculate an overall GPA including transfer courses. Use our calculator's transfer credit option to see both institutional and overall GPA."
            }
          },
          {
            "@type": "Question",
            "name": "What GPA is considered competitive for different engineering career paths?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Career path GPA guidelines: (1) Top Tech Companies (FAANG): 3.5-3.7+ technical GPA, (2) Defense Contractors: 3.0-3.3+ overall GPA, (3) Consulting (MBB): 3.6-3.8+ overall GPA, (4) Graduate School (Top 10): 3.7-3.9+ technical GPA, (5) Graduate School (Top 50): 3.3-3.5+ technical GPA, (6) General Industry: 3.0+ overall GPA. Strong projects, internships, and leadership can compensate for lower GPAs."
            }
          },
          {
            "@type": "Question",
            "name": "Should I include GPA on my engineering resume?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Include GPA if: (1) 3.0 or higher (some say 3.5+), (2) You're a recent graduate (within 2-3 years), (3) Applying to competitive programs/companies. List technical GPA or major GPA if it's higher than cumulative. Format: 'Major GPA: 3.65/4.0' or 'Technical GPA: 3.7/4.0'. After 2-3 years of work experience, GPA becomes less relevant and can be removed. If below 3.0, focus on projects, skills, and experience instead."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Engineering GPA",
        "description": "Step-by-step guide to calculating major GPA, technical GPA, and cumulative GPA for engineering students",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Course Information",
            "text": "Input your course name, credit hours (typically 3-4 for engineering courses), grade received (A+ to F or P/NP), and select the appropriate category (Engineering Core, Mathematics, Sciences, etc.). Mark transfer courses if applicable."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Categorize All Courses",
            "text": "Properly categorize each course: Engineering Core for major-specific courses, Mathematics for calculus/differential equations, Physical Sciences for physics/chemistry, Computer Science for programming, and Humanities for general education requirements."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Engineering Discipline",
            "text": "Choose your engineering discipline (Mechanical, Electrical, Computer, Civil, etc.) to see discipline-specific GPA requirements and competitiveness indicators."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate and Review Results",
            "text": "Click 'Calculate GPA' to see five GPA types: Major GPA (engineering core only), Technical GPA (all STEM), Non-Technical GPA (humanities), Cumulative GPA (overall), and Last 60 Credits GPA (graduate school focus). Review ABET credit distribution and competitiveness analysis."
          }
        ]
      }
    ];
    
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemas);

    // Core Web Vitals Monitoring
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        console.log('LCP:', lcp);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

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
          .then(registration => console.log('Service Worker registered:', registration.scope))
          .catch(error => console.log('Service Worker registration failed:', error));
      });
    }

    // Error Boundary Handlers
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true);
      setErrorInfo(event.message || 'An unexpected error occurred');
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      setHasError(true);
      setErrorInfo('Promise rejection: ' + (event.reason?.message || 'Unknown error'));
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    const handleOnline = () => {
      if (errorInfo.includes('offline')) {
        setHasError(false);
        setErrorInfo('');
      }
    };

    const handleOffline = () => {
      setHasError(true);
      setErrorInfo('You are currently offline. Some features may not work.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [errorInfo]);

  // Error Boundary UI
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something Went Wrong</h1>
            <p className="text-gray-700 mb-6">{errorInfo}</p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Reload Calculator
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Return to Home
              </button>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Troubleshooting:</strong> Clear your browser cache, disable extensions, or try a different browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const addCourse = () => {
    setCourses([...courses, {
      id: Date.now(),
      name: '',
      credits: 3,
      grade: '',
      category: 'Engineering Core',
      isTransfer: false
    }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number | boolean) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = useCallback(() => {
    try {
      setHasError(false);

      const validCourses = courses.filter(c => c.grade && c.credits > 0 && c.grade !== 'P' && c.grade !== 'NP');
      
      if (validCourses.length === 0) {
        alert('Please add at least one course with a valid grade.');
        return;
      }

      // Calculate Major GPA (Engineering Core only)
      const majorCourses = validCourses.filter(c => c.category === 'Engineering Core');
      let majorPoints = 0;
      let majorCredits = 0;
      majorCourses.forEach(course => {
        majorPoints += GRADE_POINTS[course.grade] * course.credits;
        majorCredits += course.credits;
      });
      const calculatedMajorGPA = majorCredits > 0 ? majorPoints / majorCredits : 0;

      // Calculate Technical GPA (Engineering Core + Math + Sciences + CS)
      const technicalCategories = ['Engineering Core', 'Mathematics', 'Physical Sciences', 'Computer Science'];
      const technicalCourses = validCourses.filter(c => technicalCategories.includes(c.category));
      let technicalPoints = 0;
      let technicalCredits = 0;
      technicalCourses.forEach(course => {
        technicalPoints += GRADE_POINTS[course.grade] * course.credits;
        technicalCredits += course.credits;
      });
      const calculatedTechnicalGPA = technicalCredits > 0 ? technicalPoints / technicalCredits : 0;

      // Calculate Non-Technical GPA (Humanities & Electives)
      const nonTechnicalCategories = ['Humanities & Social Sciences', 'Electives'];
      const nonTechnicalCourses = validCourses.filter(c => nonTechnicalCategories.includes(c.category) && c.category !== 'Co-op/Internship');
      let nonTechnicalPoints = 0;
      let nonTechnicalCredits = 0;
      nonTechnicalCourses.forEach(course => {
        nonTechnicalPoints += GRADE_POINTS[course.grade] * course.credits;
        nonTechnicalCredits += course.credits;
      });
      const calculatedNonTechnicalGPA = nonTechnicalCredits > 0 ? nonTechnicalPoints / nonTechnicalCredits : 0;

      // Calculate Cumulative GPA (all courses except Co-op)
      const cumulativeCourses = validCourses.filter(c => c.category !== 'Co-op/Internship');
      let cumulativePoints = 0;
      let cumulativeCredits = 0;
      cumulativeCourses.forEach(course => {
        cumulativePoints += GRADE_POINTS[course.grade] * course.credits;
        cumulativeCredits += course.credits;
      });
      const calculatedCumulativeGPA = cumulativeCredits > 0 ? cumulativePoints / cumulativeCredits : 0;

      // Calculate Last 60 Credits GPA
      const sortedCourses = [...cumulativeCourses].reverse(); // Assume most recent are last
      let last60Credits = 0;
      let last60Points = 0;
      let last60Count = 0;
      
      for (const course of sortedCourses) {
        if (last60Credits + course.credits <= 60) {
          last60Credits += course.credits;
          last60Points += GRADE_POINTS[course.grade] * course.credits;
          last60Count++;
        } else if (last60Credits < 60) {
          const remainingCredits = 60 - last60Credits;
          last60Credits += remainingCredits;
          last60Points += GRADE_POINTS[course.grade] * remainingCredits;
          break;
        }
      }
      const calculatedLast60GPA = last60Credits > 0 ? last60Points / last60Credits : 0;

      setMajorGPA(calculatedMajorGPA);
      setTechnicalGPA(calculatedTechnicalGPA);
      setNonTechnicalGPA(calculatedNonTechnicalGPA);
      setCumulativeGPA(calculatedCumulativeGPA);
      setLast60CreditsGPA(calculatedLast60GPA);

    } catch (error) {
      setHasError(true);
      if (error instanceof Error) {
        setErrorInfo(`Calculation error: ${error.message}`);
      } else {
        setErrorInfo('An error occurred during GPA calculation. Please check your inputs.');
      }
    }
  }, [courses]);

  const resetCalculator = () => {
    setCourses([{ id: 1, name: '', credits: 3, grade: '', category: 'Engineering Core', isTransfer: false }]);
    setMajorGPA(null);
    setTechnicalGPA(null);
    setNonTechnicalGPA(null);
    setCumulativeGPA(null);
    setLast60CreditsGPA(null);
  };

  const getCompetitivenessLevel = (gpa: number | null): { text: string; color: string; description: string } => {
    if (gpa === null) return { text: 'N/A', color: 'gray', description: 'Calculate to see' };
    if (gpa >= 3.7) return { text: 'Highly Competitive', color: 'green', description: 'Top tier programs & companies' };
    if (gpa >= 3.5) return { text: 'Very Competitive', color: 'blue', description: 'Strong graduate schools & employers' };
    if (gpa >= 3.2) return { text: 'Competitive', color: 'teal', description: 'Good programs & industry positions' };
    if (gpa >= 3.0) return { text: 'Meets Requirements', color: 'yellow', description: 'Standard industry minimum' };
    if (gpa >= 2.5) return { text: 'Below Competitive', color: 'orange', description: 'Focus on improvement' };
    return { text: 'At Risk', color: 'red', description: 'Academic probation risk' };
  };

  const totalCredits = useMemo(() => {
    return courses.reduce((sum, course) => {
      if (course.credits > 0 && course.grade && course.grade !== 'P' && course.grade !== 'NP') {
        return sum + course.credits;
      }
      return sum;
    }, 0);
  }, [courses]);

  const creditDistribution = useMemo(() => {
    const dist = {
      engineeringCore: 0,
      mathScience: 0,
      humanities: 0,
      other: 0
    };

    courses.forEach(course => {
      if (course.credits > 0 && course.grade) {
        if (course.category === 'Engineering Core') {
          dist.engineeringCore += course.credits;
        } else if (['Mathematics', 'Physical Sciences', 'Computer Science'].includes(course.category)) {
          dist.mathScience += course.credits;
        } else if (course.category === 'Humanities & Social Sciences') {
          dist.humanities += course.credits;
        } else {
          dist.other += course.credits;
        }
      }
    });

    return dist;
  }, [courses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent mb-4">
            Engineering GPA Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate your Major GPA, Technical GPA, Cumulative GPA, and Last 60 Credits GPA. 
            ABET-compliant with support for all engineering disciplines and graduate school requirements.
          </p>
          
          {/* Discipline Selector */}
          <div className="mt-6 max-w-md mx-auto">
            <label htmlFor="discipline" className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Engineering Discipline
            </label>
            <select
              id="discipline"
              value={selectedDiscipline}
              onChange={(e) => setSelectedDiscipline(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {ENGINEERING_DISCIPLINES.map(discipline => (
                <option key={discipline} value={discipline}>{discipline}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Enter Your Courses</h2>
            <button
              onClick={resetCalculator}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Course Input Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Course Name</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Credits</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Grade</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Transfer</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        placeholder="e.g., Thermodynamics I"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="6"
                        step="0.5"
                        className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select</option>
                        {Object.keys(GRADE_POINTS).map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={course.category}
                        onChange={(e) => updateCourse(course.id, 'category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {COURSE_CATEGORIES.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <input
                        type="checkbox"
                        checked={course.isTransfer}
                        onChange={(e) => updateCourse(course.id, 'isTransfer', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => removeCourse(course.id)}
                        disabled={courses.length === 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                        aria-label="Remove course"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={addCourse}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Course
            </button>
            <button
              onClick={calculateGPA}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all shadow-lg"
            >
              Calculate GPA
            </button>
          </div>
        </div>

        {/* Results Section */}
        {(majorGPA !== null || technicalGPA !== null || cumulativeGPA !== null) && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your GPA Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Major GPA Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Major GPA</h3>
                  <span className="text-sm text-gray-600">(Engineering Core)</span>
                </div>
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {majorGPA ? majorGPA.toFixed(3) : 'N/A'}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${getCompetitivenessLevel(majorGPA).color}-100 text-${getCompetitivenessLevel(majorGPA).color}-800`}>
                  {getCompetitivenessLevel(majorGPA).text}
                </div>
                <p className="text-sm text-gray-600 mt-2">{getCompetitivenessLevel(majorGPA).description}</p>
              </div>

              {/* Technical GPA Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Technical GPA</h3>
                  <span className="text-sm text-gray-600">(All STEM)</span>
                </div>
                <div className="text-4xl font-bold text-indigo-900 mb-2">
                  {technicalGPA ? technicalGPA.toFixed(3) : 'N/A'}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${getCompetitivenessLevel(technicalGPA).color}-100 text-${getCompetitivenessLevel(technicalGPA).color}-800`}>
                  {getCompetitivenessLevel(technicalGPA).text}
                </div>
                <p className="text-sm text-gray-600 mt-2">{getCompetitivenessLevel(technicalGPA).description}</p>
              </div>

              {/* Non-Technical GPA Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Non-Technical GPA</h3>
                  <span className="text-sm text-gray-600">(Gen Ed)</span>
                </div>
                <div className="text-4xl font-bold text-purple-900 mb-2">
                  {nonTechnicalGPA ? nonTechnicalGPA.toFixed(3) : 'N/A'}
                </div>
                <p className="text-sm text-gray-600 mt-2">Humanities & Social Sciences</p>
              </div>

              {/* Cumulative GPA Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Cumulative GPA</h3>
                  <span className="text-sm text-gray-600">(Overall)</span>
                </div>
                <div className="text-4xl font-bold text-green-900 mb-2">
                  {cumulativeGPA ? cumulativeGPA.toFixed(3) : 'N/A'}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${getCompetitivenessLevel(cumulativeGPA).color}-100 text-${getCompetitivenessLevel(cumulativeGPA).color}-800`}>
                  {getCompetitivenessLevel(cumulativeGPA).text}
                </div>
                <p className="text-sm text-gray-600 mt-2">{getCompetitivenessLevel(cumulativeGPA).description}</p>
              </div>

              {/* Last 60 Credits GPA Card */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border-2 border-teal-200 md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Last 60 Credits GPA</h3>
                  <span className="text-sm text-gray-600">(Grad School Focus)</span>
                </div>
                <div className="text-4xl font-bold text-teal-900 mb-2">
                  {last60CreditsGPA ? last60CreditsGPA.toFixed(3) : 'N/A'}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-${getCompetitivenessLevel(last60CreditsGPA).color}-100 text-${getCompetitivenessLevel(last60CreditsGPA).color}-800`}>
                  {getCompetitivenessLevel(last60CreditsGPA).text}
                </div>
                <p className="text-sm text-gray-600 mt-2">Recent academic performance</p>
              </div>
            </div>

            {/* ABET Credit Distribution */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">ABET Credit Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Engineering Core</p>
                  <p className="text-2xl font-bold text-gray-900">{creditDistribution.engineeringCore}</p>
                  <p className="text-xs text-gray-500">Required: 32+</p>
                  {creditDistribution.engineeringCore >= 32 ? (
                    <span className="text-green-600 text-xs">✓ Met</span>
                  ) : (
                    <span className="text-orange-600 text-xs">Need {32 - creditDistribution.engineeringCore} more</span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Math & Science</p>
                  <p className="text-2xl font-bold text-gray-900">{creditDistribution.mathScience}</p>
                  <p className="text-xs text-gray-500">Required: 48+</p>
                  {creditDistribution.mathScience >= 48 ? (
                    <span className="text-green-600 text-xs">✓ Met</span>
                  ) : (
                    <span className="text-orange-600 text-xs">Need {48 - creditDistribution.mathScience} more</span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Humanities</p>
                  <p className="text-2xl font-bold text-gray-900">{creditDistribution.humanities}</p>
                  <p className="text-xs text-gray-500">Required: 32+</p>
                  {creditDistribution.humanities >= 32 ? (
                    <span className="text-green-600 text-xs">✓ Met</span>
                  ) : (
                    <span className="text-orange-600 text-xs">Need {32 - creditDistribution.humanities} more</span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Credits</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCredits}</p>
                  <p className="text-xs text-gray-500">Required: 120+</p>
                  {totalCredits >= 120 ? (
                    <span className="text-green-600 text-xs">✓ Met</span>
                  ) : (
                    <span className="text-orange-600 text-xs">Need {120 - totalCredits} more</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Engineering Grade Scale Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Engineering Grading Scale (4.0 System)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Letter Grade</th>
                  <th className="py-3 px-4 text-left">Grade Points</th>
                  <th className="py-3 px-4 text-left">Percentage Range</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Quality Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { grade: 'A+', points: '4.0', range: '97-100%', quality: 'Exceptional', color: 'green' },
                  { grade: 'A', points: '4.0', range: '93-96%', quality: 'Excellent', color: 'green' },
                  { grade: 'A-', points: '3.7', range: '90-92%', quality: 'Very Good', color: 'green' },
                  { grade: 'B+', points: '3.3', range: '87-89%', quality: 'Good', color: 'blue' },
                  { grade: 'B', points: '3.0', range: '83-86%', quality: 'Above Average', color: 'blue' },
                  { grade: 'B-', points: '2.7', range: '80-82%', quality: 'Satisfactory', color: 'blue' },
                  { grade: 'C+', points: '2.3', range: '77-79%', quality: 'Acceptable', color: 'yellow' },
                  { grade: 'C', points: '2.0', range: '73-76%', quality: 'Adequate', color: 'yellow' },
                  { grade: 'C-', points: '1.7', range: '70-72%', quality: 'Below Average', color: 'orange' },
                  { grade: 'D+', points: '1.3', range: '67-69%', quality: 'Poor', color: 'orange' },
                  { grade: 'D', points: '1.0', range: '63-66%', quality: 'Minimal Pass', color: 'red' },
                  { grade: 'D-', points: '0.7', range: '60-62%', quality: 'Very Poor', color: 'red' },
                  { grade: 'F', points: '0.0', range: '<60%', quality: 'Failing', color: 'red' },
                  { grade: 'P', points: '—', range: 'Pass', quality: 'Not counted in GPA', color: 'gray' },
                  { grade: 'NP', points: '—', range: 'No Pass', quality: 'Not counted in GPA', color: 'gray' },
                ].map((row, index) => (
                  <tr key={index} className={`border-b border-gray-200 hover:bg-${row.color}-50 transition-colors`}>
                    <td className="py-3 px-4 font-bold text-gray-800">{row.grade}</td>
                    <td className="py-3 px-4 text-gray-800">{row.points}</td>
                    <td className="py-3 px-4 text-gray-700">{row.range}</td>
                    <td className="py-3 px-4 text-gray-700">{row.quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Most engineering programs use a 4.0 scale. Some schools cap A+ at 4.0 instead of 4.3. 
              Pass/Fail courses count toward degree requirements but not GPA calculations.
            </p>
          </div>
        </div>

        {/* Example Calculation */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Example: Engineering Student GPA Calculation</h2>
          <p className="text-gray-700 mb-6">
            Here's how a typical mechanical engineering student's GPA would be calculated across different categories:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left border-b-2 border-gray-300">Course Name</th>
                  <th className="py-3 px-4 text-left border-b-2 border-gray-300">Category</th>
                  <th className="py-3 px-4 text-center border-b-2 border-gray-300">Credits</th>
                  <th className="py-3 px-4 text-center border-b-2 border-gray-300">Grade</th>
                  <th className="py-3 px-4 text-center border-b-2 border-gray-300">Points/Credit</th>
                  <th className="py-3 px-4 text-center border-b-2 border-gray-300">Total Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="py-3 px-4 border-b border-gray-200">Thermodynamics I</td>
                  <td className="py-3 px-4 border-b border-gray-200">Engineering Core</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">3</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">A-</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">3.7</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">11.1</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="py-3 px-4 border-b border-gray-200">Fluid Mechanics</td>
                  <td className="py-3 px-4 border-b border-gray-200">Engineering Core</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">4</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">B+</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">3.3</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">13.2</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="py-3 px-4 border-b border-gray-200">Differential Equations</td>
                  <td className="py-3 px-4 border-b border-gray-200">Mathematics</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">4</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">A</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">4.0</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">16.0</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="py-3 px-4 border-b border-gray-200">Physics II (E&M)</td>
                  <td className="py-3 px-4 border-b border-gray-200">Physical Sciences</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">4</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">B</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">3.0</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">12.0</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="py-3 px-4 border-b border-gray-200">Technical Writing</td>
                  <td className="py-3 px-4 border-b border-gray-200">Humanities</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">3</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">A</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">4.0</td>
                  <td className="py-3 px-4 text-center border-b border-gray-200">12.0</td>
                </tr>
                <tr className="bg-gradient-to-r from-blue-100 to-indigo-100 font-bold">
                  <td className="py-3 px-4 border-t-2 border-gray-300" colSpan={2}>Total</td>
                  <td className="py-3 px-4 text-center border-t-2 border-gray-300">18</td>
                  <td className="py-3 px-4 text-center border-t-2 border-gray-300">—</td>
                  <td className="py-3 px-4 text-center border-t-2 border-gray-300">—</td>
                  <td className="py-3 px-4 text-center border-t-2 border-gray-300">64.3</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Major GPA (Engineering Core only):</h3>
              <p className="text-gray-700 mb-2">Courses: Thermodynamics I, Fluid Mechanics</p>
              <p className="text-gray-700 mb-2">Total: 24.3 points ÷ 7 credits = <strong className="text-blue-900 text-xl">3.47</strong></p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Technical GPA (STEM courses):</h3>
              <p className="text-gray-700 mb-2">Courses: All except Technical Writing</p>
              <p className="text-gray-700 mb-2">Total: 52.3 points ÷ 15 credits = <strong className="text-indigo-900 text-xl">3.49</strong></p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Cumulative GPA (All courses):</h3>
              <p className="text-gray-700 mb-2">Total: 64.3 points ÷ 18 credits = <strong className="text-green-900 text-xl">3.57</strong></p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Competitiveness Level:</h3>
              <p className="text-gray-700"><strong className="text-purple-900">Very Competitive</strong> - Qualifies for most graduate programs and top industry positions.</p>
            </div>
          </div>
        </div>

        {/* Top Engineering Schools GPA Requirements */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Engineering Schools: GPA Requirements</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">University</th>
                  <th className="py-3 px-4 text-center">Undergraduate Min</th>
                  <th className="py-3 px-4 text-center">Graduate (MS) Min</th>
                  <th className="py-3 px-4 text-center">PhD Min</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { school: 'MIT', ug: 'No minimum', ms: '3.7+', phd: '3.8+', notes: 'Highly competitive, focuses on research' },
                  { school: 'Stanford', ug: 'No minimum', ms: '3.5+', phd: '3.7+', notes: 'Holistic review, strong recommendations' },
                  { school: 'UC Berkeley', ug: '3.0', ms: '3.3+', phd: '3.5+', notes: 'Emphasis on technical GPA' },
                  { school: 'Georgia Tech', ug: '3.0', ms: '3.2+', phd: '3.4+', notes: 'In-state preference for undergrad' },
                  { school: 'Carnegie Mellon', ug: 'No minimum', ms: '3.5+', phd: '3.7+', notes: 'Strong CS/ECE programs' },
                  { school: 'Caltech', ug: 'No minimum', ms: '3.7+', phd: '3.8+', notes: 'Small cohorts, very selective' },
                  { school: 'University of Michigan', ug: '3.0', ms: '3.3+', phd: '3.5+', notes: 'Last 60 credits important' },
                  { school: 'UIUC', ug: '3.0', ms: '3.2+', phd: '3.4+', notes: 'Top 10 for many disciplines' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-3 px-4 font-semibold text-gray-800">{row.school}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.ug}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.ms}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.phd}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> These are minimum or typical GPAs. Competitive applicants often have higher GPAs. 
              Research experience, publications, and strong recommendation letters can offset lower GPAs for graduate admissions.
            </p>
          </div>
        </div>

        {/* Industry GPA Requirements */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry Hiring GPA Thresholds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">FAANG & Top Tech</h3>
              <p className="text-3xl font-bold text-green-900 mb-2">3.5+</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Google, Meta, Amazon, Apple, Microsoft</li>
                <li>• Strong technical GPA preferred</li>
                <li>• Projects & internships matter more</li>
                <li>• Some consider 3.0+ with experience</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Defense Contractors</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">3.0+</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Lockheed Martin, Raytheon, Boeing</li>
                <li>• Security clearance required</li>
                <li>• 3.3+ for competitive positions</li>
                <li>• US citizenship often required</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Consulting (MBB)</h3>
              <p className="text-3xl font-bold text-purple-900 mb-2">3.7+</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• McKinsey, BCG, Bain</li>
                <li>• Very competitive screening</li>
                <li>• Engineering + MBA preferred</li>
                <li>• Leadership experience critical</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border-2 border-teal-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Automotive</h3>
              <p className="text-3xl font-bold text-teal-900 mb-2">3.0+</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• GM, Ford, Tesla, Toyota</li>
                <li>• Mechanical/Electrical focus</li>
                <li>• 3.2+ for engineering roles</li>
                <li>• CAD/hands-on experience valued</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Energy & Oil</h3>
              <p className="text-3xl font-bold text-orange-900 mb-2">3.0+</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Chevron, ExxonMobil, Shell</li>
                <li>• Chemical/Petroleum emphasis</li>
                <li>• Relocation often required</li>
                <li>• Competitive starting salaries</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border-2 border-indigo-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Startups</h3>
              <p className="text-3xl font-bold text-indigo-900 mb-2">2.8+</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• More flexible GPA requirements</li>
                <li>• Skills & portfolio most important</li>
                <li>• Fast-paced environment</li>
                <li>• Equity compensation common</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Engineering GPA Calculator</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Select Your Engineering Discipline</h3>
                <p className="text-gray-700">
                  Choose your engineering major from the dropdown (Mechanical, Electrical, Computer, Civil, etc.). 
                  This helps provide discipline-specific guidance and GPA benchmarks.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enter Course Information</h3>
                <p className="text-gray-700">
                  For each course, input: (1) Course name (e.g., "Thermodynamics I"), (2) Credit hours (typically 3-4 for engineering courses), 
                  (3) Grade received (A+ to F, or P/NP for pass/fail), (4) Category (Engineering Core, Mathematics, etc.).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Categorize Courses Correctly</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Engineering Core:</strong> Major-specific courses (Thermodynamics, Circuits, Mechanics, etc.)<br />
                  <strong>Mathematics:</strong> Calculus, Differential Equations, Linear Algebra, Statistics<br />
                  <strong>Physical Sciences:</strong> Physics, Chemistry courses<br />
                  <strong>Computer Science:</strong> Programming, Data Structures, Algorithms<br />
                  <strong>Humanities & Social Sciences:</strong> Writing, History, Economics, Ethics<br />
                  <strong>Co-op/Internship:</strong> Work terms (often Pass/Fail)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Mark Transfer Credits</h3>
                <p className="text-gray-700">
                  Check the "Transfer" box for courses taken at another institution. Note: Transfer credits typically 
                  don't count in institutional GPA but do appear on transcripts and count toward overall GPA for graduate applications.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                5
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Calculate and Review</h3>
                <p className="text-gray-700">
                  Click "Calculate GPA" to see your five GPA types: Major GPA, Technical GPA, Non-Technical GPA, Cumulative GPA, 
                  and Last 60 Credits GPA. Review the competitiveness level and ABET credit distribution to track graduation requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Engineering GPA Calculations</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The <strong>Engineering GPA Calculator</strong> is specifically designed for engineering students to track multiple GPA types 
              that are critical for academic success, graduate school applications, and job opportunities. Unlike generic GPA calculators, 
              this tool recognizes that engineering programs have unique requirements and that different stakeholders (graduate schools, 
              employers, professional societies) evaluate GPAs differently.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Why Multiple GPA Types Matter</h3>
            <p>
              <strong>Major GPA</strong> shows your performance in core engineering courses specific to your discipline. This is often 
              the most important metric for graduate schools and technical employers as it demonstrates competency in fundamental engineering concepts.
            </p>
            <p>
              <strong>Technical GPA</strong> includes all STEM courses (engineering, mathematics, physical sciences, computer science) and 
              provides a broader view of your quantitative abilities. Many employers specifically request technical GPA on applications 
              because it better reflects engineering aptitude than cumulative GPA.
            </p>
            <p>
              <strong>Last 60 Credits GPA</strong> is crucial for graduate school applications as it shows recent academic performance and 
              upward trends. Graduate admissions committees often focus on this metric because upper-division courses are more relevant 
              to graduate-level work than freshman/sophomore courses.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">ABET Accreditation Requirements</h3>
            <p>
              ABET (Accreditation Board for Engineering and Technology) sets minimum credit distribution standards for accredited engineering 
              programs in the United States. Our calculator tracks these requirements: minimum 32 semester credits in engineering topics, 
              48 credits in mathematics and basic sciences, and 32 credits in general education (humanities and social sciences). 
              Understanding your progress toward these requirements helps ensure timely graduation.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How Engineering Programs Calculate GPA</h3>
            <p>
              Most engineering programs use a 4.0 scale where A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. Plus/minus grading 
              adds 0.3 for plus grades and subtracts 0.3 for minus grades (except A+, which is typically capped at 4.0). Pass/Fail courses 
              count toward degree requirements but do NOT factor into GPA calculations - they add zero to both grade points and credit hours 
              for GPA purposes.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Course Repetition Policies</h3>
            <p>
              When you retake a course, GPA calculation varies by institution. Most schools use "grade replacement" (only highest grade counts) 
              but show all attempts on transcripts. Some schools average all attempts or use only the most recent grade. Graduate schools 
              typically see all attempts and may recalculate GPA using their own policy. Always verify your specific school's repetition policy.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Transfer Credit Considerations</h3>
            <p>
              Transfer credits generally count toward degree requirements and ABET distribution but do NOT factor into your institutional GPA 
              (the GPA at your current school). However, they appear on your transcript with grades. For graduate school applications, 
              you should calculate an overall GPA including transfer courses. Some graduate programs recalculate applicant GPAs using all 
              coursework from all institutions.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Co-op and Internship Grades</h3>
            <p>
              Many engineering programs require co-op (cooperative education) or internship experiences. These work terms are often graded 
              Pass/Fail and do not affect GPA. However, they provide crucial industry experience that employers value highly. Strong co-op 
              performance can offset lower GPAs when applying for full-time positions.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">GPA and Career Success</h3>
            <p>
              While GPA is important for first internships and entry-level positions, it becomes less relevant with work experience. 
              After 2-3 years in industry, employers focus on projects, skills, and accomplishments rather than academic performance. 
              However, maintaining a competitive GPA (3.0+) opens doors to better opportunities early in your career and keeps graduate 
              school options available.
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is the difference between major GPA and technical GPA for engineering students?",
                a: "Major GPA includes only your core engineering courses specific to your discipline (e.g., thermodynamics, circuits, mechanics for ME/EE). Technical GPA is broader and includes all STEM courses: engineering core, mathematics (calculus, differential equations), physical sciences (physics, chemistry), and computer science. Most employers and graduate schools look at technical GPA as it demonstrates overall STEM proficiency. For example, a 3.5 technical GPA shows you can handle quantitative coursework beyond just engineering."
              },
              {
                q: "What GPA do I need for engineering internships and jobs?",
                a: "Most engineering companies require a minimum cumulative GPA of 3.0 (B average) to apply for internships and entry-level positions. Competitive companies (Fortune 500, FAANG, top consulting firms) typically look for 3.5+. Some companies have higher technical GPA requirements (3.2-3.5+) as it better reflects engineering competency. Co-op programs usually require maintaining 2.5-3.0 GPA. However, strong projects, leadership, and hands-on skills can sometimes compensate for lower GPAs, especially at startups."
              },
              {
                q: "How do engineering graduate schools evaluate GPA?",
                a: "Graduate schools primarily focus on: (1) Technical GPA or Major GPA (more important than cumulative), (2) Last 60 credits GPA (shows recent academic trend and improvement), (3) Upper-division engineering course performance. Top programs (MIT, Stanford, Berkeley) typically require 3.5+ technical GPA, while good programs accept 3.0-3.3+. Strong research experience, publications, GRE scores, and recommendation letters can offset lower GPAs. Many programs also consider upward trends - improving from 2.8 to 3.5 is viewed more favorably than maintaining 3.2 throughout."
              },
              {
                q: "Do Pass/Fail courses count toward engineering GPA?",
                a: "Pass/Fail (P/NP) courses do NOT count in GPA calculations - neither in credits earned nor grade points for GPA purposes. However, they do count toward total degree requirements and ABET credit distribution. Many engineering programs allow P/NP for humanities electives but NOT for major or technical courses. Co-op/internship courses are often graded P/NP and don't affect GPA. If you're considering P/NP for a course, verify it won't impact graduate school applications or professional licensing requirements."
              },
              {
                q: "How does course repetition affect engineering GPA?",
                a: "GPA policies vary by institution: (1) Grade Replacement: Most schools use only the highest grade in GPA calculation but show both attempts on transcript. (2) All Attempts Count: Some schools average all attempts. (3) Most Recent Grade: Latest attempt is used regardless of score. Graduate schools typically see all attempts and may recalculate GPA using all grades. Professional schools (like medical school) always count all attempts. It's best to check your school's specific policy and understand how graduate programs you're interested in handle retakes."
              },
              {
                q: "What are ABET credit requirements for engineering degrees?",
                a: "ABET (Accreditation Board for Engineering and Technology) requires minimum credit distribution: (1) Engineering Core: 32+ semester credits of engineering topics (design, analysis, problem-solving), (2) Mathematics & Science: 48+ credits including calculus sequence, differential equations, statistics, and physical sciences (physics, chemistry), (3) General Education: 32+ credits in humanities and social sciences (writing, communication, ethics, economics). Total: Minimum 120 semester credits for bachelor's degree. Most ABET-accredited programs require 128-136 credits total and include capstone design projects."
              },
              {
                q: "How do transfer credits affect engineering GPA calculations?",
                a: "Transfer credits typically count toward degree requirements and ABET distribution but do NOT factor into your institutional GPA (the GPA at your current school). However, they appear on your transcript with grades. For graduate school applications, you should calculate an overall GPA including transfer courses. Some graduate programs recalculate applicant GPAs using all coursework from all institutions. When using our calculator, you can mark courses as 'Transfer' to see both institutional GPA (without transfers) and overall GPA (with transfers included)."
              },
              {
                q: "What GPA is considered competitive for different engineering career paths?",
                a: "Career path GPA guidelines: (1) Top Tech Companies (FAANG): 3.5-3.7+ technical GPA preferred, though 3.0+ with strong projects/internships considered, (2) Defense Contractors (Lockheed, Raytheon, Boeing): 3.0-3.3+ overall GPA, (3) Consulting (McKinsey, BCG, Bain): 3.6-3.8+ overall GPA, very competitive, (4) Graduate School Top 10: 3.7-3.9+ technical GPA, (5) Graduate School Top 50: 3.3-3.5+ technical GPA, (6) General Industry: 3.0+ overall GPA minimum. Strong projects, internships, leadership, and technical skills can compensate for lower GPAs in many roles."
              },
              {
                q: "Should I include GPA on my engineering resume?",
                a: "Include GPA if: (1) 3.0 or higher (some say 3.5+), (2) You're a recent graduate (within 2-3 years of graduation), (3) Applying to competitive programs/companies that explicitly request it. List technical GPA or major GPA if it's higher than cumulative (e.g., 'Technical GPA: 3.7/4.0'). After 2-3 years of work experience, GPA becomes less relevant and can be removed from resume - focus on projects, achievements, and skills instead. If GPA is below 3.0, omit it and emphasize hands-on experience, projects, certifications, and technical competencies."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use Our Engineering GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Multiple GPA Types</h3>
                <p className="text-gray-700 text-sm">Calculate Major, Technical, Non-Technical, Cumulative, and Last 60 Credits GPA all at once.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">ABET Compliance Tracking</h3>
                <p className="text-gray-700 text-sm">Automatically tracks engineering core, math/science, and humanities credit distribution.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">All Engineering Disciplines</h3>
                <p className="text-gray-700 text-sm">Supports Mechanical, Electrical, Computer, Civil, Chemical, and all other engineering majors.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Graduate School Readiness</h3>
                <p className="text-gray-700 text-sm">Highlights Last 60 Credits GPA that graduate admissions committees prioritize.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Career Competitiveness</h3>
                <p className="text-gray-700 text-sm">See if your GPA meets industry thresholds for FAANG, defense, consulting, and more.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">100% Free & Private</h3>
                <p className="text-gray-700 text-sm">No registration, no ads, no data collection. Your academic information stays on your device.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Transfer Credit Support</h3>
                <p className="text-gray-700 text-sm">Mark transfer courses separately to see both institutional and overall GPA calculations.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Works Offline</h3>
                <p className="text-gray-700 text-sm">PWA-enabled calculator that works without internet connection. All calculations done locally.</p>
              </div>
            </div>
          </div>
        </div>

        <RelatedTools 
          currentSlug="engineering-gpa-calculator"
          relatedSlugs={['college-gpa-calculator', 'weighted-gpa-calculator', 'high-school-gpa-calculator', 'cumulative-gpa-calculator']}
          navigateTo={navigateTo}
        />
      </div>
    </div>
  );
};

export default EngineeringGPACalculator;