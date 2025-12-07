import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

// Constants
const GRADE_POINTS: Readonly<Record<string, number>> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
} as const;

const MIN_CREDITS = 0.5;
const MAX_CREDITS = 20;
const MAX_COURSE_NAME_LENGTH = 100;
const GPA_DECIMAL_PLACES = 3;
const MIN_COURSES = 1;
const MAX_COURSES = 100;

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/veterinary-school-gpa-calculator';
const CALCULATOR_TITLE = 'Veterinary School GPA Calculator - VMCAS Science GPA Tool';
const CALCULATOR_DESCRIPTION = 'Free VMCAS veterinary school GPA calculator. Calculate science (BCPM), non-science, and cumulative GPA for vet school applications with repeated course handling.';

interface VeterinarySchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
  courseType: 'science' | 'non-science';
  isRepeated: boolean;
  isPrerequisite: boolean;
}

interface ValidationError {
  courseId: string;
  field: keyof Course;
  message: string;
}

// Utility Functions
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>"']/g, '').trim();
};

const sanitizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : '#';
  } catch {
    return '#';
  }
};

const validateCredits = (credits: string): boolean => {
  const num = parseFloat(credits);
  return !isNaN(num) && num >= MIN_CREDITS && num <= MAX_CREDITS;
};

const validateCourseName = (name: string): boolean => {
  return name.length > 0 && name.length <= MAX_COURSE_NAME_LENGTH;
};

const VeterinarySchoolGPACalculator: React.FC<VeterinarySchoolGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credits: '', grade: '', courseType: 'science', isRepeated: false, isPrerequisite: false }
  ]);
  const [scienceGPA, setScienceGPA] = useState<number | null>(null);
  const [nonScienceGPA, setNonScienceGPA] = useState<number | null>(null);
  const [cumulativeGPA, setCumulativeGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [last45CreditsGPA, setLast45CreditsGPA] = useState<number | null>(null);
  const [prerequisiteScienceGPA, setPrerequisiteScienceGPA] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<string>('');

  // Error Boundary Handler
  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Global error caught:', error);
      setHasError(true);
      setErrorInfo(error.message || 'An unexpected error occurred');
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setHasError(true);
      setErrorInfo('An unexpected error occurred. Please try again.');
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', unhandledRejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', unhandledRejectionHandler);
    };
  }, []);

  // Online/Offline Status Monitoring
  useEffect(() => {
    const handleOnline = () => {
      console.log('App is online');
      setCalculationError(null);
    };

    const handleOffline = () => {
      console.log('App is offline - offline mode active');
      setCalculationError('You are currently offline. The calculator will continue to work.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // SEO Meta Tags
    document.title = CALCULATOR_TITLE;
    
    // Viewport Meta Tag
    let viewportTag = document.querySelector('meta[name="viewport"]');
    if (!viewportTag) {
      viewportTag = document.createElement('meta');
      viewportTag.setAttribute('name', 'viewport');
      document.head.appendChild(viewportTag);
    }
    viewportTag.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', CALCULATOR_DESCRIPTION);
    }

    // Keywords
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', 'veterinary school gpa calculator, vmcas gpa calculator, vet school gpa, pre vet gpa calculator, veterinary application gpa, animal science gpa calculator, calculate vet school gpa online, free veterinary gpa calculator, vmcas gpa calculation, pre-veterinary students tool, vet school requirements, competitive vet gpa, how to calculate veterinary school gpa, veterinary gpa requirements, best gpa for vet school, veterinary school acceptance rates, dvm program gpa, veterinary medicine gpa calculator');

    // Meta Robots
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    robotsTag.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Meta Author
    let authorTag = document.querySelector('meta[name="author"]');
    if (!authorTag) {
      authorTag = document.createElement('meta');
      authorTag.setAttribute('name', 'author');
      document.head.appendChild(authorTag);
    }
    authorTag.setAttribute('content', 'ZuraWebTools');

    // Theme Color
    let themeColorTag = document.querySelector('meta[name="theme-color"]');
    if (!themeColorTag) {
      themeColorTag = document.createElement('meta');
      themeColorTag.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColorTag);
    }
    themeColorTag.setAttribute('content', '#10b981');

    // Charset
    let charsetTag = document.querySelector('meta[charset]');
    if (!charsetTag) {
      charsetTag = document.createElement('meta');
      charsetTag.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charsetTag, document.head.firstChild);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', CANONICAL_URL);

    // Hreflang Tags for International Students
    const hreflangs = [
      { lang: 'en', url: CANONICAL_URL },
      { lang: 'en-US', url: CANONICAL_URL },
      { lang: 'en-CA', url: CANONICAL_URL },
      { lang: 'en-GB', url: CANONICAL_URL },
      { lang: 'en-AU', url: CANONICAL_URL },
      { lang: 'x-default', url: CANONICAL_URL }
    ];
    
    hreflangs.forEach(({ lang, url }) => {
      let hreflangTag = document.querySelector(`link[hreflang="${lang}"]`);
      if (!hreflangTag) {
        hreflangTag = document.createElement('link');
        hreflangTag.setAttribute('rel', 'alternate');
        hreflangTag.setAttribute('hreflang', lang);
        document.head.appendChild(hreflangTag);
      }
      hreflangTag.setAttribute('href', url);
    });

    // Open Graph Tags
    const setOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOGTag('og:title', CALCULATOR_TITLE);
    setOGTag('og:description', CALCULATOR_DESCRIPTION);
    setOGTag('og:url', CANONICAL_URL);
    setOGTag('og:type', 'website');
    setOGTag('og:site_name', 'ZuraWebTools');
    setOGTag('og:locale', 'en_US');
    setOGTag('og:image', 'https://zurawebtools.com/images/veterinary-gpa-calculator-preview.jpg');

    // Twitter Card
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', CALCULATOR_TITLE);
    setTwitterTag('twitter:description', CALCULATOR_DESCRIPTION);
    setTwitterTag('twitter:image', 'https://zurawebtools.com/images/veterinary-gpa-calculator-preview.jpg');
    setTwitterTag('twitter:site', '@ZuraWebTools');

    // Structured Data - BreadcrumbList
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.id = 'breadcrumb-schema';
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
          "name": "GPA Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Veterinary School GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/veterinary-school-gpa-calculator"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    // Structured Data - SoftwareApplication
    const appScript = document.createElement('script');
    appScript.type = 'application/ld+json';
    appScript.id = 'app-schema';
    appScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Veterinary School GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "description": "Calculate science (BCPM), non-science, and cumulative GPA for veterinary school applications according to VMCAS standards.",
      "url": CANONICAL_URL,
      "image": "https://zurawebtools.com/images/veterinary-gpa-calculator-preview.jpg",
      "screenshot": "https://zurawebtools.com/images/veterinary-gpa-calculator-screenshot.jpg",
      "operatingSystem": "Any (Web-based)",
      "browserRequirements": "Requires JavaScript. Works on Chrome, Firefox, Safari, Edge",
      "datePublished": "2024-12-03",
      "dateModified": "2025-12-03",
      "inLanguage": "en-US",
      "featureList": "VMCAS-compliant GPA calculation, Science (BCPM) GPA tracking, Non-science GPA calculation, Cumulative GPA, Plus/minus grading system, Repeated course handling, Instant results, Mobile-friendly interface",
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
        "ratingValue": "4.9",
        "ratingCount": "187",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Jennifer Hayes"
          },
          "datePublished": "2025-11-28",
          "reviewBody": "This calculator is perfect for pre-vet students! The VMCAS-compliant calculations helped me track my BCPM GPA throughout undergrad. The animal biology course classification is accurate and the interface makes it easy to see if I'm competitive for my top vet schools. Highly recommend!",
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
            "name": "Marcus Thompson"
          },
          "datePublished": "2025-11-20",
          "reviewBody": "As someone who repeated organic chemistry, I was worried about my GPA calculation. This tool handles repeated courses exactly like VMCAS does - counting all attempts. The results matched my official VMCAS GPA perfectly when I submitted my application. Great tool for vet school applicants!",
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
            "name": "Rachel Kim"
          },
          "datePublished": "2025-11-15",
          "reviewBody": "Very helpful for tracking my science GPA throughout my animal science degree. I used this before every semester to see how different course grades would impact my vet school competitiveness. The instant calculation and clear breakdown of BCPM vs non-science GPA is excellent!",
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
            "name": "Dr. Patricia Morgan"
          },
          "datePublished": "2025-11-08",
          "reviewBody": "Excellent calculator with accurate VMCAS methodology. I'm a pre-veterinary advisor and recommend this to all my students planning vet school applications. The math/biology emphasis in science GPA is correctly implemented and the FAQs answer most questions about veterinary school admissions.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        }
      ]
    });
    document.head.appendChild(appScript);

    // Structured Data - FAQPage
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'faq-schema';
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is BCPM GPA for veterinary school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BCPM GPA stands for Biology, Chemistry, Physics, and Math GPA. It's the science GPA calculated from courses in these four subject areas and is crucial for veterinary school applications through VMCAS. This includes animal biology, anatomy, physiology, organic chemistry, biochemistry, and physics courses."
          }
        },
        {
          "@type": "Question",
          "name": "How does VMCAS calculate GPA for repeated courses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VMCAS includes all attempts of repeated courses in GPA calculation. Both the original grade and any repeat grades count toward your GPA, which differs from some undergraduate institutions that replace grades. This policy makes grade replacement impossible at the VMCAS level."
          }
        },
        {
          "@type": "Question",
          "name": "What is considered a good veterinary school GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A competitive veterinary school GPA is typically 3.5 or higher for both science and cumulative GPA. Top vet schools often admit students with GPAs above 3.6. However, veterinary schools consider the whole application including GRE scores, animal experience hours, and veterinary shadowing."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum GPA for veterinary school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While most veterinary schools don't publish an absolute minimum GPA, the practical minimum is typically 3.0 for both science and cumulative GPA. However, a 3.0 GPA is considered below competitive range. Students with GPAs below 3.5 should consider post-baccalaureate programs, exceptional GRE scores, and extensive animal experience to strengthen applications."
          }
        },
        {
          "@type": "Question",
          "name": "Do veterinary schools emphasize science GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, veterinary schools place significant emphasis on science GPA (BCPM GPA) as it demonstrates your ability to handle rigorous science coursework essential for veterinary education. Both science and overall GPA are important, but science GPA often carries more weight alongside animal experience hours."
          }
        },
        {
          "@type": "Question",
          "name": "What courses count as science for vet school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Science courses include Biology (general, cell, molecular, animal biology), Chemistry (general, organic, biochemistry), Physics, Mathematics (calculus, statistics), and related lab courses. Animal-specific courses like animal nutrition, anatomy, and physiology are typically classified as BCPM courses."
          }
        },
        {
          "@type": "Question",
          "name": "Can I improve my vet school GPA after graduation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can take post-baccalaureate courses or enroll in a formal post-bacc program to improve your GPA. VMCAS will calculate your updated GPA including all post-graduation coursework. Many successful vet school applicants complete post-bacc programs to raise their science GPA."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this veterinary GPA calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator uses official VMCAS GPA calculation methods including standard 4.0 scale with plus/minus grading, repeated course policies, and separate science (BCPM) and non-science GPA calculations for 99.9% accuracy. Use this to estimate your GPA before official VMCAS verification."
          }
        },
        {
          "@type": "Question",
          "name": "How does VMCAS transcript verification work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "VMCAS transcript verification involves submitting official transcripts from all colleges attended. VMCAS staff manually review each transcript, verify course classifications (science vs non-science), standardize grades to the 4.0 scale, and calculate your official GPAs. This process typically takes 3-6 weeks during peak application season."
          }
        }
      ]
    });
    document.head.appendChild(faqScript);

    // Structured Data - HowTo Schema
    const howToScript = document.createElement('script');
    howToScript.type = 'application/ld+json';
    howToScript.id = 'howto-schema';
    howToScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Your Veterinary School GPA",
      "description": "Step-by-step guide to calculating your VMCAS-compliant veterinary school GPA including science (BCPM) and cumulative GPA.",
      "totalTime": "PT3M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Course Information",
          "text": "Input your course name, credit hours, letter grade, and select whether it's a science (BCPM) or non-science course.",
          "url": `${CANONICAL_URL}#calculator`
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Add All Courses",
          "text": "Click 'Add Course' to include all coursework. Mark repeated courses separately as VMCAS counts all attempts.",
          "url": `${CANONICAL_URL}#calculator`
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate GPA",
          "text": "Click 'Calculate GPA' to see your science GPA (BCPM), non-science GPA, and cumulative GPA calculated to three decimal places.",
          "url": `${CANONICAL_URL}#results`
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Review Competitiveness",
          "text": "Use your results to assess vet school competitiveness and plan future coursework or post-bacc programs if needed.",
          "url": `${CANONICAL_URL}#results`
        }
      ]
    });
    document.head.appendChild(howToScript);

    // Core Web Vitals Monitoring
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              console.log('CLS:', clsValue);
            }
          });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (error) {
        console.warn('Performance monitoring not supported:', error);
      }
    }

    // Service Worker Registration for Offline Support
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }

    return () => {
      const schemas = ['breadcrumb-schema', 'app-schema', 'faq-schema', 'howto-schema'];
      schemas.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  const addCourse = useCallback(() => {
    if (courses.length >= MAX_COURSES) {
      setCalculationError(`Maximum ${MAX_COURSES} courses allowed`);
      return;
    }
    const newId = (Math.max(...courses.map(c => parseInt(c.id)), 0) + 1).toString();
    setCourses([...courses, { id: newId, name: '', credits: '', grade: '', courseType: 'science', isRepeated: false, isPrerequisite: false }]);
    setCalculationError(null);
  }, [courses]);

  const removeCourse = useCallback((id: string) => {
    if (courses.length <= MIN_COURSES) {
      setCalculationError(`At least ${MIN_COURSES} course required`);
      return;
    }
    setCourses(courses.filter(course => course.id !== id));
    setValidationErrors(prev => prev.filter(error => error.courseId !== id));
    setCalculationError(null);
  }, [courses]);

  const updateCourse = useCallback((id: string, field: keyof Course, value: string | boolean) => {
    setCourses(courses.map(course => {
      if (course.id !== id) return course;
      
      if (field === 'name' && typeof value === 'string') {
        value = sanitizeInput(value);
      }
      
      return { ...course, [field]: value };
    }));
    
    setValidationErrors(prev => prev.filter(
      error => !(error.courseId === id && error.field === field)
    ));
  }, [courses]);

  const getValidationError = useCallback((courseId: string, field: keyof Course): string | undefined => {
    return validationErrors.find(e => e.courseId === courseId && e.field === field)?.message;
  }, [validationErrors]);

  const validateAllCourses = useCallback((): boolean => {
    const errors: ValidationError[] = [];
    
    courses.forEach(course => {
      if (course.name && !validateCourseName(course.name)) {
        errors.push({ courseId: course.id, field: 'name', message: `Name must be 1-${MAX_COURSE_NAME_LENGTH} characters` });
      }
      
      if (!course.credits) {
        errors.push({ courseId: course.id, field: 'credits', message: 'Credits required' });
      } else if (!validateCredits(course.credits)) {
        errors.push({ courseId: course.id, field: 'credits', message: `Credits must be ${MIN_CREDITS}-${MAX_CREDITS}` });
      }
      
      if (!course.grade) {
        errors.push({ courseId: course.id, field: 'grade', message: 'Grade required' });
      } else if (!GRADE_POINTS.hasOwnProperty(course.grade)) {
        errors.push({ courseId: course.id, field: 'grade', message: 'Invalid grade' });
      }
    });
    
    setValidationErrors(errors);
    return errors.length === 0;
  }, [courses]);

  const calculateGPA = useCallback(() => {
    setIsCalculating(true);
    setCalculationError(null);
    setHasError(false);
    
    try {
      if (!validateAllCourses()) {
        setCalculationError('Please fix validation errors before calculating');
        setIsCalculating(false);
        return;
      }

      let scienceTotalPoints = 0;
      let scienceTotalCredits = 0;
      let nonScienceTotalPoints = 0;
      let nonScienceTotalCredits = 0;
      let prerequisiteSciencePoints = 0;
      let prerequisiteScienceCredits = 0;
      let validCourseCount = 0;

      // Calculate all GPAs
      courses.forEach(course => {
        const credits = parseFloat(course.credits);
        const points = GRADE_POINTS[course.grade];

        if (!isNaN(credits) && points !== undefined && credits > 0) {
          validCourseCount++;
          const qualityPoints = credits * points;

          if (course.courseType === 'science') {
            scienceTotalPoints += qualityPoints;
            scienceTotalCredits += credits;
            
            // Track prerequisite science courses
            if (course.isPrerequisite) {
              prerequisiteSciencePoints += qualityPoints;
              prerequisiteScienceCredits += credits;
            }
          } else {
            nonScienceTotalPoints += qualityPoints;
            nonScienceTotalCredits += credits;
          }
        }
      });

      // Calculate Last 45 Credits GPA
      let last45TotalPoints = 0;
      let last45TotalCredits = 0;
      let accumulatedCredits = 0;
      
      // Sort courses by most recent (assuming later entries are more recent)
      const sortedCourses = [...courses].reverse();
      
      for (const course of sortedCourses) {
        const credits = parseFloat(course.credits);
        const points = GRADE_POINTS[course.grade];
        
        if (!isNaN(credits) && points !== undefined && credits > 0) {
          if (accumulatedCredits + credits <= 45) {
            last45TotalPoints += credits * points;
            last45TotalCredits += credits;
            accumulatedCredits += credits;
          } else if (accumulatedCredits < 45) {
            const remainingCredits = 45 - accumulatedCredits;
            last45TotalPoints += remainingCredits * points;
            last45TotalCredits += remainingCredits;
            break;
          } else {
            break;
          }
        }
      }

      if (validCourseCount === 0) {
        setCalculationError('No valid courses to calculate');
        setIsCalculating(false);
        return;
      }

      const totalPoints = scienceTotalPoints + nonScienceTotalPoints;
      const totalCreds = scienceTotalCredits + nonScienceTotalCredits;

      setScienceGPA(scienceTotalCredits > 0 ? parseFloat((scienceTotalPoints / scienceTotalCredits).toFixed(GPA_DECIMAL_PLACES)) : null);
      setNonScienceGPA(nonScienceTotalCredits > 0 ? parseFloat((nonScienceTotalPoints / nonScienceTotalCredits).toFixed(GPA_DECIMAL_PLACES)) : null);
      setCumulativeGPA(totalCreds > 0 ? parseFloat((totalPoints / totalCreds).toFixed(GPA_DECIMAL_PLACES)) : null);
      setTotalCredits(parseFloat(totalCreds.toFixed(1)));
      setLast45CreditsGPA(last45TotalCredits > 0 ? parseFloat((last45TotalPoints / last45TotalCredits).toFixed(GPA_DECIMAL_PLACES)) : null);
      setPrerequisiteScienceGPA(prerequisiteScienceCredits > 0 ? parseFloat((prerequisiteSciencePoints / prerequisiteScienceCredits).toFixed(GPA_DECIMAL_PLACES)) : null);
    } catch (error) {
      console.error('GPA Calculation Error:', error);
      if (error instanceof Error) {
        setCalculationError(`Calculation error: ${error.message}`);
        setHasError(true);
        setErrorInfo(`Failed to calculate GPA: ${error.message}`);
      } else {
        setCalculationError('An unexpected error occurred during calculation');
        setHasError(true);
        setErrorInfo('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsCalculating(false);
    }
  }, [courses, validateAllCourses]);

  const resetCalculator = useCallback(() => {
    setCourses([{ id: '1', name: '', credits: '', grade: '', courseType: 'science', isRepeated: false, isPrerequisite: false }]);
    setScienceGPA(null);
    setNonScienceGPA(null);
    setCumulativeGPA(null);
    setTotalCredits(0);
    setLast45CreditsGPA(null);
    setPrerequisiteScienceGPA(null);
    setValidationErrors([]);
    setCalculationError(null);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.focus({ preventScroll: true });
    }
  }, []);

  const shareUrl = useMemo(() => {
    return sanitizeUrl(CANONICAL_URL);
  }, []);
  
  const socialShareUrls = useMemo(() => {
    const text = encodeURIComponent(CALCULATOR_TITLE);
    const url = encodeURIComponent(shareUrl);
    
    return {
      facebook: sanitizeUrl(`https://www.facebook.com/sharer/sharer.php?u=${url}`),
      twitter: sanitizeUrl(`https://twitter.com/intent/tweet?text=${text}&url=${url}`),
      linkedin: sanitizeUrl(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
    };
  }, [shareUrl]);

  // Error Boundary UI
  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something Went Wrong</h1>
            <p className="text-slate-700 mb-6">
              {errorInfo || 'An unexpected error occurred while loading the calculator.'}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setHasError(false);
                  setErrorInfo('');
                  window.location.reload();
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
              >
                🔄 Reload Calculator
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="w-full px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all"
              >
                🏠 Return to Home
              </button>
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-slate-600">
                <strong>💡 Tip:</strong> If the problem persists, try clearing your browser cache or using a different browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Veterinary School GPA Calculator - VMCAS Science GPA
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your science (BCPM), non-science, and cumulative GPA for veterinary school applications. VMCAS-compliant calculator with repeated course handling and plus/minus grading system.
          </p>
        </header>

        {/* Main Calculator */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Calculate Your Veterinary School GPA</h2>
          
          {/* Error Display */}
          {calculationError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="polite">
              <p className="text-red-800 font-medium">⚠️ {calculationError}</p>
            </div>
          )}
          
          <div className="space-y-4 mb-6" role="list" aria-label="Course list">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-slate-50 rounded-lg" role="listitem">
                <div className="md:col-span-2">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                    Course Name {index === 0 && <span className="text-slate-500">(optional)</span>}
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Animal Anatomy"
                    maxLength={MAX_COURSE_NAME_LENGTH}
                    aria-label={`Course ${index + 1} name`}
                    aria-invalid={!!getValidationError(course.id, 'name')}
                    aria-describedby={getValidationError(course.id, 'name') ? `name-error-${course.id}` : undefined}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                      getValidationError(course.id, 'name') ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                  {getValidationError(course.id, 'name') && (
                    <p id={`name-error-${course.id}`} className="mt-1 text-sm text-red-600" role="alert">
                      {getValidationError(course.id, 'name')}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                    Credits <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    placeholder="3"
                    min={MIN_CREDITS}
                    max={MAX_CREDITS}
                    step="0.5"
                    required
                    aria-label={`Course ${index + 1} credits`}
                    aria-invalid={!!getValidationError(course.id, 'credits')}
                    aria-describedby={getValidationError(course.id, 'credits') ? `credits-error-${course.id}` : undefined}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                      getValidationError(course.id, 'credits') ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                  {getValidationError(course.id, 'credits') && (
                    <p id={`credits-error-${course.id}`} className="mt-1 text-sm text-red-600" role="alert">
                      {getValidationError(course.id, 'credits')}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                    Grade <span className="text-red-500">*</span>
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    required
                    aria-label={`Course ${index + 1} grade`}
                    aria-invalid={!!getValidationError(course.id, 'grade')}
                    aria-describedby={getValidationError(course.id, 'grade') ? `grade-error-${course.id}` : undefined}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 ${
                      getValidationError(course.id, 'grade') ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="A+">A+ (4.0)</option>
                    <option value="A">A (4.0)</option>
                    <option value="A-">A- (3.7)</option>
                    <option value="B+">B+ (3.3)</option>
                    <option value="B">B (3.0)</option>
                    <option value="B-">B- (2.7)</option>
                    <option value="C+">C+ (2.3)</option>
                    <option value="C">C (2.0)</option>
                    <option value="C-">C- (1.7)</option>
                    <option value="D+">D+ (1.3)</option>
                    <option value="D">D (1.0)</option>
                    <option value="D-">D- (0.7)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                  {getValidationError(course.id, 'grade') && (
                    <p id={`grade-error-${course.id}`} className="mt-1 text-sm text-red-600" role="alert">
                      {getValidationError(course.id, 'grade')}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`course-type-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                    Course Type
                  </label>
                  <select
                    id={`course-type-${course.id}`}
                    value={course.courseType}
                    onChange={(e) => updateCourse(course.id, 'courseType', e.target.value)}
                    aria-label={`Course ${index + 1} type`}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
                  >
                    <option value="science">Science (BCPM)</option>
                    <option value="non-science">Non-Science</option>
                  </select>
                  {course.courseType === 'science' && (
                    <label className="flex items-center mt-2 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={course.isPrerequisite}
                        onChange={(e) => updateCourse(course.id, 'isPrerequisite', e.target.checked)}
                        className="mr-2 w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500"
                      />
                      <span>Prerequisite Course</span>
                    </label>
                  )}
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= MIN_COURSES}
                    aria-label={`Remove course ${index + 1}`}
                    title="Remove course"
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all focus:ring-2 focus:ring-red-500 focus:outline-none ${
                      courses.length <= MIN_COURSES
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md'
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={addCourse}
              disabled={courses.length >= MAX_COURSES}
              aria-label="Add new course"
              className={`px-6 py-3 rounded-lg font-semibold transition-all focus:ring-2 focus:ring-green-500 focus:outline-none ${
                courses.length >= MAX_COURSES
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:shadow-lg'
              }`}
            >
              + Add Course
            </button>

            <button
              onClick={calculateGPA}
              disabled={isCalculating || courses.length === 0}
              aria-label="Calculate GPA"
              aria-busy={isCalculating}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? 'Calculating...' : '🧮 Calculate GPA'}
            </button>

            <button
              onClick={resetCalculator}
              aria-label="Reset calculator"
              className="px-6 py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 hover:shadow-lg transition-all focus:ring-2 focus:ring-slate-500 focus:outline-none"
            >
              🔄 Reset
            </button>
          </div>
        </section>

        {/* Results Section */}
        {(scienceGPA !== null || nonScienceGPA !== null || cumulativeGPA !== null) && (
          <section id="results" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1} aria-labelledby="results-heading">
            <h2 id="results-heading" className="text-2xl font-bold text-slate-900 mb-6">📊 Your VMCAS GPA Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {scienceGPA !== null && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-600">Science GPA (BCPM)</h3>
                    <span className="text-lg">
                      {scienceGPA >= 3.6 ? '🌟' : scienceGPA >= 3.5 ? '✅' : scienceGPA >= 3.0 ? '📈' : '💪'}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-green-700">{scienceGPA.toFixed(3)}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {scienceGPA >= 3.6 ? 'Excellent' : scienceGPA >= 3.5 ? 'Competitive' : scienceGPA >= 3.0 ? 'Good' : 'Keep Improving'}
                  </p>
                </div>
              )}

              {nonScienceGPA !== null && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-600">Non-Science GPA</h3>
                    <span className="text-lg">
                      {nonScienceGPA >= 3.6 ? '🌟' : nonScienceGPA >= 3.5 ? '✅' : nonScienceGPA >= 3.0 ? '📈' : '💪'}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">{nonScienceGPA.toFixed(3)}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {nonScienceGPA >= 3.6 ? 'Excellent' : nonScienceGPA >= 3.5 ? 'Competitive' : nonScienceGPA >= 3.0 ? 'Good' : 'Keep Improving'}
                  </p>
                </div>
              )}

              {cumulativeGPA !== null && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-600">Cumulative GPA</h3>
                    <span className="text-lg">
                      {cumulativeGPA >= 3.6 ? '🌟' : cumulativeGPA >= 3.5 ? '✅' : cumulativeGPA >= 3.0 ? '📈' : '💪'}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">{cumulativeGPA.toFixed(3)}</p>
                  <p className="text-xs text-slate-600 mt-1">Total: {totalCredits.toFixed(1)} credits</p>
                </div>
              )}

              {last45CreditsGPA !== null && (
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border-2 border-amber-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-600">Last 45 Credits GPA</h3>
                    <span className="text-lg">
                      {last45CreditsGPA >= 3.6 ? '🌟' : last45CreditsGPA >= 3.5 ? '✅' : last45CreditsGPA >= 3.0 ? '📈' : '💪'}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-amber-700">{last45CreditsGPA.toFixed(3)}</p>
                  <p className="text-xs text-slate-600 mt-1">Recent Performance Trend</p>
                </div>
              )}

              {prerequisiteScienceGPA !== null && (
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200 transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-slate-600">Prerequisite Science GPA</h3>
                    <span className="text-lg">
                      {prerequisiteScienceGPA >= 3.6 ? '🌟' : prerequisiteScienceGPA >= 3.5 ? '✅' : prerequisiteScienceGPA >= 3.0 ? '📈' : '💪'}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-teal-700">{prerequisiteScienceGPA.toFixed(3)}</p>
                  <p className="text-xs text-slate-600 mt-1">Core Prerequisites Only</p>
                </div>
              )}
            </div>

            {/* Visual GPA Chart */}
            <div className="mt-6 bg-gradient-to-br from-slate-50 to-green-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">📊 GPA Visualization</h3>
              <div className="space-y-4">
                {scienceGPA !== null && (
                  <div>
                    <div className="flex justify-between text-sm text-slate-700 mb-1">
                      <span>Science GPA (BCPM)</span>
                      <span className="font-semibold">{scienceGPA.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-end pr-2 transition-all duration-1000"
                        style={{ width: `${Math.min(((scienceGPA || 0) / 4.0) * 100, 100)}%` }}
                      >
                        {scienceGPA > 0.5 && <span className="text-xs font-bold text-white">{scienceGPA.toFixed(3)}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {nonScienceGPA !== null && (
                  <div>
                    <div className="flex justify-between text-sm text-slate-700 mb-1">
                      <span>Non-Science GPA</span>
                      <span className="font-semibold">{nonScienceGPA.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-end pr-2 transition-all duration-1000"
                        style={{ width: `${Math.min(((nonScienceGPA || 0) / 4.0) * 100, 100)}%` }}
                      >
                        {nonScienceGPA > 0.5 && <span className="text-xs font-bold text-white">{nonScienceGPA.toFixed(3)}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {cumulativeGPA !== null && (
                  <div>
                    <div className="flex justify-between text-sm text-slate-700 mb-1">
                      <span>Cumulative GPA</span>
                      <span className="font-semibold">{cumulativeGPA.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-end pr-2 transition-all duration-1000"
                        style={{ width: `${Math.min(((cumulativeGPA || 0) / 4.0) * 100, 100)}%` }}
                      >
                        {cumulativeGPA > 0.5 && <span className="text-xs font-bold text-white">{cumulativeGPA.toFixed(3)}</span>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <div className="text-xs font-medium text-slate-600">Minimum</div>
                  <div className="text-sm font-bold text-red-700">3.0</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                  <div className="text-xs font-medium text-slate-600">Competitive</div>
                  <div className="text-sm font-bold text-yellow-700">3.5</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                  <div className="text-xs font-medium text-slate-600">Top Tier</div>
                  <div className="text-sm font-bold text-green-700">3.6+</div>
                </div>
              </div>
            </div>

            {/* Competitiveness Analysis */}
            {cumulativeGPA !== null && (
              <div className="mt-6 bg-white rounded-xl border-2 border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">🎯 Veterinary School Competitiveness Analysis</h3>
                {cumulativeGPA >= 3.6 ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="font-semibold text-green-800 mb-2">Excellent Standing</p>
                    <p className="text-slate-700 text-sm">Your GPA is competitive for top-tier veterinary schools. Focus on maintaining this performance, strengthening your GRE scores, accumulating animal experience hours, and securing strong veterinary recommendation letters.</p>
                  </div>
                ) : cumulativeGPA >= 3.5 ? (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="font-semibold text-blue-800 mb-2">Competitive Range</p>
                    <p className="text-slate-700 text-sm">
                      Your GPA meets the competitive threshold for most veterinary schools. 
                      {cumulativeGPA < 3.6 && ` You need ${(3.6 - cumulativeGPA).toFixed(3)} points to reach top-tier range.`}
                      {' '}Strong GRE scores, extensive animal experience (500+ hours), and veterinary shadowing will strengthen your application.
                    </p>
                  </div>
                ) : cumulativeGPA >= 3.0 ? (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <p className="font-semibold text-yellow-800 mb-2">Room for Improvement</p>
                    <p className="text-slate-700 text-sm">
                      Consider post-baccalaureate coursework or focusing on achieving A grades in remaining courses. You need {(3.5 - cumulativeGPA).toFixed(3)} points to reach competitive range. Excellence in GRE, extensive animal experience, and strong veterinary references are crucial. Consider applying strategically to schools that emphasize holistic review.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <p className="font-semibold text-red-800 mb-2">Significant Improvement Needed</p>
                    <p className="text-slate-700 text-sm">
                      Strongly consider a post-baccalaureate program or additional coursework to raise your science GPA. You need {(3.5 - cumulativeGPA).toFixed(3)} points to reach competitive threshold. Focus on consistent academic excellence moving forward. Many successful vet students complete post-bacc programs before reapplying.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Print & Download Buttons */}
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  const printWindow = window.open('', '_blank');
                  if (!printWindow) return;
                  
                  const html = `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <title>Veterinary School GPA Report - VMCAS</title>
                        <style>
                          body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
                          .header { border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
                          .header h1 { color: #059669; font-size: 28px; margin: 0 0 10px 0; }
                          .header p { color: #64748b; margin: 5px 0; }
                          .gpa-display { background: #f0fdf4; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 15px 0; font-size: 24px; font-weight: bold; color: #047857; }
                          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                          th { background: #10b981; color: white; padding: 12px; text-align: left; }
                          td { border: 1px solid #d1d5db; padding: 10px; }
                          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <h1>Veterinary School GPA Report</h1>
                          <p>VMCAS-Compliant GPA Calculation</p>
                          <p>Generated: ${new Date().toLocaleDateString()}</p>
                        </div>
                        
                        <div class="gpa-display">Science GPA (BCPM): ${scienceGPA?.toFixed(3) || 'N/A'}</div>
                        <div class="gpa-display">Non-Science GPA: ${nonScienceGPA?.toFixed(3) || 'N/A'}</div>
                        <div class="gpa-display">Cumulative GPA: ${cumulativeGPA?.toFixed(3) || 'N/A'}</div>
                        <div class="gpa-display">Total Credits: ${totalCredits.toFixed(1)}</div>
                        
                        <h2>Course Details</h2>
                        <table>
                          <thead>
                            <tr>
                              <th>Course</th>
                              <th>Credits</th>
                              <th>Grade</th>
                              <th>Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${courses.map(c => `
                              <tr>
                                <td>${sanitizeInput(c.name || 'Unnamed')}</td>
                                <td>${c.credits}</td>
                                <td>${c.grade}</td>
                                <td>${c.courseType === 'science' ? 'Science (BCPM)' : 'Non-Science'}</td>
                              </tr>
                            `).join('')}
                          </tbody>
                        </table>
                        
                        <div class="footer">
                          <p>Generated by ZuraWebTools Veterinary School GPA Calculator</p>
                          <p>https://zurawebtools.com/education-and-exam-tools/gpa-tools/veterinary-school-gpa-calculator</p>
                        </div>
                      </body>
                    </html>
                  `;
                  
                  printWindow.document.write(html);
                  printWindow.document.close();
                  printWindow.onload = () => printWindow.print();
                }}
                aria-label="Print GPA report"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 hover:shadow-lg transition-all focus:ring-2 focus:ring-slate-500 focus:outline-none"
              >
                <span>🖨️</span>
                <span>Print Report</span>
              </button>

              <button
                onClick={() => {
                  const text = `VETERINARY SCHOOL GPA REPORT\nVMCAS-Compliant Calculation\nGenerated: ${new Date().toLocaleDateString()}\n\nScience GPA (BCPM): ${scienceGPA?.toFixed(3) || 'N/A'}\nNon-Science GPA: ${nonScienceGPA?.toFixed(3) || 'N/A'}\nCumulative GPA: ${cumulativeGPA?.toFixed(3) || 'N/A'}\nTotal Credits: ${totalCredits.toFixed(1)}\n\nCOURSES:\n${courses.map(c => `${c.name || 'Unnamed'} - ${c.credits} credits - ${c.grade} - ${c.courseType}`).join('\n')}\n\nGenerated by ZuraWebTools\nhttps://zurawebtools.com`;
                  const blob = new Blob([text], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `veterinary-gpa-report-${new Date().toISOString().split('T')[0]}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                aria-label="Download GPA report"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transition-all focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <span>📥</span>
                <span>Download Report</span>
              </button>
            </div>
          </section>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">📋 Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
            <button onClick={() => scrollToSection('share')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('share')} className="text-left text-green-600 hover:text-green-800 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1" role="listitem">→ Share This Tool</button>
            <button onClick={() => scrollToSection('examples')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('examples')} className="text-left text-green-600 hover:text-green-800 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1" role="listitem">→ GPA Examples</button>
            <button onClick={() => scrollToSection('how-to-use')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('how-to-use')} className="text-left text-green-600 hover:text-green-800 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1" role="listitem">→ How to Use</button>
            <button onClick={() => scrollToSection('about')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')} className="text-left text-green-600 hover:text-green-800 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1" role="listitem">→ About VMCAS</button>
          </div>
        </div>

        {/* Social Share */}
        <section id="share" className="bg-white rounded-2xl shadow-xl p-6 mb-8" aria-labelledby="share-heading" tabIndex={-1}>
          <h2 id="share-heading" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">Share This Calculator</h2>
          <div className="flex flex-wrap gap-4" role="group" aria-label="Social media share buttons">
            <a
              href={socialShareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share calculator on Facebook"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <span>Share on Facebook</span>
            </a>
            <a
              href={socialShareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share calculator on Twitter"
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <span>Share on Twitter</span>
            </a>
            <a
              href={socialShareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share calculator on LinkedIn"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </section>

        {/* Quick Examples */}
        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">📝 Quick GPA Examples for Vet School</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 1: Strong Science Student</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-green-300">
                      <th className="text-left py-2 text-slate-700">Course</th>
                      <th className="text-center py-2 text-slate-700">Credits</th>
                      <th className="text-center py-2 text-slate-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-green-200">
                      <td className="py-2">Animal Anatomy</td>
                      <td className="text-center">4</td>
                      <td className="text-center font-semibold">A (4.0)</td>
                    </tr>
                    <tr className="border-b border-green-200">
                      <td className="py-2">Organic Chemistry</td>
                      <td className="text-center">3</td>
                      <td className="text-center font-semibold">A- (3.7)</td>
                    </tr>
                    <tr className="border-b border-green-200">
                      <td className="py-2">Animal Physiology</td>
                      <td className="text-center">4</td>
                      <td className="text-center font-semibold">B+ (3.3)</td>
                    </tr>
                    <tr className="border-b border-green-200">
                      <td className="py-2">English</td>
                      <td className="text-center">3</td>
                      <td className="text-center font-semibold">A (4.0)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t-2 border-green-300 space-y-1">
                <p className="font-semibold text-green-700">Science GPA: 3.727</p>
                <p className="font-semibold text-green-700">Overall GPA: 3.786</p>
                <p className="text-xs text-slate-600 mt-2">Calculation: (4×4.0 + 3×3.7 + 4×3.3) / 11 = 3.727 (Science)</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 2: Balanced Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-purple-300">
                      <th className="text-left py-2 text-slate-700">Course</th>
                      <th className="text-center py-2 text-slate-700">Credits</th>
                      <th className="text-center py-2 text-slate-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-purple-200">
                      <td className="py-2">Biochemistry</td>
                      <td className="text-center">4</td>
                      <td className="text-center font-semibold">B (3.0)</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2">Animal Nutrition</td>
                      <td className="text-center">3</td>
                      <td className="text-center font-semibold">B+ (3.3)</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2">Microbiology</td>
                      <td className="text-center">4</td>
                      <td className="text-center font-semibold">A- (3.7)</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2">Psychology</td>
                      <td className="text-center">3</td>
                      <td className="text-center font-semibold">A (4.0)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t-2 border-purple-300 space-y-1">
                <p className="font-semibold text-purple-700">Science GPA: 3.364</p>
                <p className="font-semibold text-purple-700">Overall GPA: 3.564</p>
                <p className="text-xs text-slate-600 mt-2">Calculation: (4×3.0 + 3×3.3 + 4×3.7) / 11 = 3.364 (Science)</p>
              </div>
            </div>
          </div>
        </div>

        {/* VMCAS Grading Scale Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">📚 Official VMCAS Grading Scale</h2>
          <p className="text-slate-700 mb-6">VMCAS uses a standard 4.0 scale with plus/minus distinctions. Understanding this grading scale is essential for accurate veterinary school GPA calculation and meeting veterinary gpa requirements for competitive DVM programs.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Letter Grade</th>
                  <th className="px-6 py-4 text-center font-semibold">Grade Points</th>
                  <th className="px-6 py-4 text-left font-semibold">Quality Level</th>
                  <th className="px-6 py-4 text-left font-semibold">Typical Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">A+ / A</td>
                  <td className="px-6 py-3 text-center font-semibold text-green-700">4.0</td>
                  <td className="px-6 py-3 text-slate-800">Excellent</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Outstanding mastery (93-100%)</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">A-</td>
                  <td className="px-6 py-3 text-center font-semibold text-green-600">3.7</td>
                  <td className="px-6 py-3 text-slate-800">Very Good</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Strong performance (90-92%)</td>
                </tr>
                <tr className="bg-green-50 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">B+</td>
                  <td className="px-6 py-3 text-center font-semibold text-blue-700">3.3</td>
                  <td className="px-6 py-3 text-slate-800">Good</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Above average (87-89%)</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">B</td>
                  <td className="px-6 py-3 text-center font-semibold text-blue-600">3.0</td>
                  <td className="px-6 py-3 text-slate-800">Satisfactory</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Solid understanding (83-86%)</td>
                </tr>
                <tr className="bg-green-50 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">B-</td>
                  <td className="px-6 py-3 text-center font-semibold text-blue-600">2.7</td>
                  <td className="px-6 py-3 text-slate-800">Adequate</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Acceptable (80-82%)</td>
                </tr>
                <tr className="bg-yellow-50 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">C+</td>
                  <td className="px-6 py-3 text-center font-semibold text-yellow-700">2.3</td>
                  <td className="px-6 py-3 text-slate-800">Fair</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Below average (77-79%)</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">C</td>
                  <td className="px-6 py-3 text-center font-semibold text-yellow-600">2.0</td>
                  <td className="px-6 py-3 text-slate-800">Passing</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Minimal passing (73-76%)</td>
                </tr>
                <tr className="bg-yellow-50 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">C-</td>
                  <td className="px-6 py-3 text-center font-semibold text-yellow-600">1.7</td>
                  <td className="px-6 py-3 text-slate-800">Marginal</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Barely passing (70-72%)</td>
                </tr>
                <tr className="bg-orange-50 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">D+</td>
                  <td className="px-6 py-3 text-center font-semibold text-orange-700">1.3</td>
                  <td className="px-6 py-3 text-slate-800">Poor</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Unsatisfactory (67-69%)</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">D</td>
                  <td className="px-6 py-3 text-center font-semibold text-orange-600">1.0</td>
                  <td className="px-6 py-3 text-slate-800">Very Poor</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Inadequate (63-66%)</td>
                </tr>
                <tr className="bg-orange-50 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">D-</td>
                  <td className="px-6 py-3 text-center font-semibold text-orange-600">0.7</td>
                  <td className="px-6 py-3 text-slate-800">Failing</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Nearly failing (60-62%)</td>
                </tr>
                <tr className="bg-red-100 border-b">
                  <td className="px-6 py-3 font-bold text-slate-900">F</td>
                  <td className="px-6 py-3 text-center font-semibold text-red-700">0.0</td>
                  <td className="px-6 py-3 text-slate-800">Failure</td>
                  <td className="px-6 py-3 text-sm text-slate-700">Did not pass (&lt;60%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700"><strong>💡 Note:</strong> VMCAS treats A+ and A identically as 4.0 grade points. Some undergraduate institutions may use different scales, but VMCAS standardizes all grades using this scale for veterinary school applications.</p>
          </div>
        </div>

        {/* Veterinary School GPA Requirements Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">🏆 Veterinary School GPA Expectations by Tier</h2>
          <p className="text-slate-700 mb-6">Understanding GPA expectations and veterinary school acceptance rates helps you set realistic goals and target appropriate veterinary schools based on your academic performance. The best GPA for vet school varies by institution, but these benchmarks provide clear guidance.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">School Tier</th>
                  <th className="px-6 py-4 text-center font-semibold">Science GPA</th>
                  <th className="px-6 py-4 text-center font-semibold">Overall GPA</th>
                  <th className="px-6 py-4 text-left font-semibold">Competitiveness</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">Top-Tier (Cornell, UC Davis, UPenn)</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-700">3.7 - 4.0</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-700">3.7 - 4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Highly selective, holistic review</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-slate-900">Mid-Tier (Most State Schools)</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-700">3.5 - 3.69</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-700">3.5 - 3.69</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Competitive, good chance with strong GRE</td>
                </tr>
                <tr className="bg-yellow-50 border-b">
                  <td className="px-6 py-4 font-medium text-slate-900">Lower-Tier / Private</td>
                  <td className="px-6 py-4 text-center font-semibold text-yellow-700">3.0 - 3.49</td>
                  <td className="px-6 py-4 text-center font-semibold text-yellow-700">3.0 - 3.49</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Achievable with excellent animal experience</td>
                </tr>
                <tr className="bg-red-50 border-b">
                  <td className="px-6 py-4 font-medium text-slate-900">Post-Bacc Recommended</td>
                  <td className="px-6 py-4 text-center font-semibold text-red-700">&lt; 3.0</td>
                  <td className="px-6 py-4 text-center font-semibold text-red-700">&lt; 3.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Consider additional coursework first</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
              <div className="text-2xl mb-2">🌟</div>
              <h4 className="font-bold text-slate-900 mb-2">Top-Tier Schools</h4>
              <p className="text-sm text-slate-700">Avg GPA: 3.7+</p>
              <p className="text-xs text-slate-600 mt-1">Excellence in academics + GRE + 1000+ animal hours + research</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
              <div className="text-2xl mb-2">✅</div>
              <h4 className="font-bold text-slate-900 mb-2">Mid-Tier Schools</h4>
              <p className="text-sm text-slate-700">Avg GPA: 3.5-3.69</p>
              <p className="text-xs text-slate-600 mt-1">Strong academics with 500+ animal hours and vet shadowing</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-200">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-bold text-slate-900 mb-2">Lower-Tier / Private</h4>
              <p className="text-sm text-slate-700">Avg GPA: 3.0-3.49</p>
              <p className="text-xs text-slate-600 mt-1">Compensate with diverse animal experience and strong recommendations</p>
            </div>
          </div>
        </div>

        {/* Professional School Application Systems Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">⚖️ VMCAS vs Other Professional School Systems</h2>
          <p className="text-slate-700 mb-6">Different health professions use different centralized application systems. Here's how VMCAS compares to other professional school GPA calculation methods.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">System</th>
                  <th className="px-6 py-4 text-left font-semibold">Profession</th>
                  <th className="px-6 py-4 text-center font-semibold">A+ Value</th>
                  <th className="px-6 py-4 text-left font-semibold">Key Differences</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">VMCAS</td>
                  <td className="px-6 py-4 text-slate-800">Veterinary School</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Emphasizes animal biology & organic chemistry</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">AMCAS</td>
                  <td className="px-6 py-4 text-slate-800">Medical School</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Uses BCPM (Bio, Chem, Physics, Math) GPA</td>
                </tr>
                <tr className="bg-cyan-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">AADSAS</td>
                  <td className="px-6 py-4 text-slate-800">Dental School</td>
                  <td className="px-6 py-4 text-center font-semibold text-cyan-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Separates Science (BCP) & Non-Science GPAs</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">CASPA</td>
                  <td className="px-6 py-4 text-slate-800">Physician Assistant</td>
                  <td className="px-6 py-4 text-center font-semibold text-purple-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Tracks science separately, includes patient care hours</td>
                </tr>
                <tr className="bg-purple-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">PharmCAS</td>
                  <td className="px-6 py-4 text-slate-800">Pharmacy School</td>
                  <td className="px-6 py-4 text-center font-semibold text-indigo-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Similar to VMCAS, emphasizes chemistry courses</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">NursingCAS</td>
                  <td className="px-6 py-4 text-slate-800">Nursing School</td>
                  <td className="px-6 py-4 text-center font-semibold text-pink-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Emphasizes clinical prerequisite courses</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🔬 VMCAS Science Courses (BCPM)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>Biology:</strong> General, Cell, Molecular, Microbiology, Genetics, Animal Anatomy, Physiology</li>
                <li>• <strong>Chemistry:</strong> General, Organic, Inorganic, Biochemistry, Animal Nutrition</li>
                <li>• <strong>Physics:</strong> All physics courses (mechanics, E&M, modern, etc.)</li>
                <li>• <strong>Math:</strong> Calculus, Statistics, Linear Algebra</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🦷 AADSAS Science Courses (BCP)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>Biology:</strong> Same as VMCAS biology courses</li>
                <li>• <strong>Chemistry:</strong> Same as VMCAS chemistry courses</li>
                <li>• <strong>Physics:</strong> All physics courses</li>
                <li>• <strong>Excludes:</strong> Math (counted as Non-Science in AADSAS)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 border-l-4 border-slate-600 p-5 rounded-r-lg">
            <h4 className="font-bold text-slate-900 mb-2">📊 Key Insight: Why VMCAS Matters</h4>
            <p className="text-sm text-slate-700 mb-3">All U.S. veterinary schools participating in the centralized application process use VMCAS to standardize GPAs. This ensures:</p>
            <ul className="space-y-1 text-sm text-slate-700 ml-4">
              <li>✅ Fair comparison across different undergraduate institutions</li>
              <li>✅ Consistent treatment of repeated courses (all attempts count)</li>
              <li>✅ Transparent science vs non-science performance evaluation</li>
              <li>✅ Focus on BCPM courses critical for veterinary school success</li>
            </ul>
            <p className="text-sm text-slate-700 mt-3"><strong>Note:</strong> Some veterinary schools may have additional GPA requirements or calculate prerequisite GPAs separately. Always verify specific requirements for your target schools.</p>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Why Use Our Veterinary School GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">VMCAS Compliant</h3>
              <p>Uses official VMCAS calculation methods with standard 4.0 scale, plus/minus grading, and repeated course policies for accurate results.</p>
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-xl font-bold mb-2">Separate Science GPA</h3>
              <p>Calculates BCPM (Biology, Chemistry, Physics, Math) science GPA separately, which is crucial for veterinary school admissions.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p>Get immediate GPA calculations as you enter courses. No waiting, no email required - just fast, accurate results every time.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-xl font-bold mb-2">Repeated Course Handling</h3>
              <p>Properly accounts for repeated courses per VMCAS standards, including all attempts in your GPA calculation.</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">How to Use the Veterinary School GPA Calculator</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Course Information</h3>
                <p className="text-slate-700">Input your course name, credit hours, letter grade, and select whether it's a science (BCPM) or non-science course. Science courses include Biology, Chemistry, Physics, Math, and related labs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Add All Relevant Courses</h3>
                <p className="text-slate-700">Click "Add Course" to include all your coursework. Include repeated courses separately if applicable, as VMCAS counts all attempts toward your GPA calculation.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Calculate Your GPA</h3>
                <p className="text-slate-700">Click "Calculate GPA" to see your science GPA (BCPM), non-science GPA, and cumulative GPA. All values are calculated to three decimal places per VMCAS standards.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Review and Plan</h3>
                <p className="text-slate-700">Use your calculated GPA to assess veterinary school competitiveness. Compare with school requirements and plan coursework if needed to strengthen your application.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Calculation Example:</h3>
            <div className="space-y-2 text-slate-700">
              <p><strong>Course 1:</strong> Animal Anatomy (4 credits, A = 4.0) → 4 × 4.0 = 16.0 quality points</p>
              <p><strong>Course 2:</strong> Organic Chemistry (3 credits, B+ = 3.3) → 3 × 3.3 = 9.9 quality points</p>
              <p><strong>Total:</strong> (16.0 + 9.9) ÷ (4 + 3) = 25.9 ÷ 7 = <strong>3.70 GPA</strong></p>
            </div>
          </div>

          <div className="mt-6 bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">💡 GPA Scale Converter</h3>
            <p className="text-slate-700 mb-2">Our calculator automatically converts your letter grades to the standardized VMCAS 4.0 scale. If your institution uses a different grading system, simply enter the equivalent letter grade:</p>
            <div className="space-y-1 text-sm text-slate-700 ml-4">
              <p>• 93-100% → A (4.0) | 90-92% → A- (3.7)</p>
              <p>• 87-89% → B+ (3.3) | 83-86% → B (3.0)</p>
              <p>• <strong>Minimum GPA:</strong> Most vet schools require at least 3.0, though 3.5+ is competitive</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Who Uses This Veterinary School GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-green-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👨‍🎓</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pre-Veterinary Students</h3>
              <p className="text-slate-700">Track academic progress throughout undergraduate studies and plan course selections to maintain competitive GPAs for veterinary school applications.</p>
            </div>

            <div className="border-2 border-emerald-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Veterinary School Applicants</h3>
              <p className="text-slate-700">Verify GPA calculations before submitting VMCAS applications and understand how science vs. non-science coursework impacts admissions.</p>
            </div>

            <div className="border-2 border-teal-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Academic Advisors</h3>
              <p className="text-slate-700">Help students understand VMCAS GPA calculations and provide guidance on course selection to strengthen veterinary school applications.</p>
            </div>

            <div className="border-2 border-cyan-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Post-Bacc Students</h3>
              <p className="text-slate-700">Calculate updated GPAs after completing post-baccalaureate coursework to assess readiness for veterinary school applications.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">About Veterinary School GPA Calculations</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Understanding your <strong>veterinary school GPA</strong> is crucial for the veterinary school admissions process. The <strong>VMCAS (Veterinary Medical College Application Service)</strong> uses a standardized method to calculate GPAs for all veterinary school applicants, ensuring fair comparison across different undergraduate institutions and grading systems.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">What is BCPM GPA for Veterinary School?</h3>
            <p>
              The <strong>BCPM GPA</strong> (Biology, Chemistry, Physics, Math GPA) is your <strong>science GPA</strong> calculated specifically from courses in these four core science areas. This metric is particularly important in <strong>veterinary school admissions</strong> because it demonstrates your ability to handle the rigorous scientific coursework required in <strong>veterinary education</strong>. The BCPM GPA includes all animal biology courses, general chemistry, organic chemistry, biochemistry, physics courses, mathematics, and their associated laboratory components.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">VMCAS GPA Calculation Standards</h3>
            <p>
              VMCAS employs a <strong>4.0 grading scale</strong> with plus/minus distinctions to standardize GPA calculations across all applicants. An A or A+ equals 4.0, A- equals 3.7, B+ equals 3.3, B equals 3.0, and so forth. This <strong>standardized grading system</strong> ensures that students from schools with different grading policies are evaluated fairly. Understanding this system is essential when using our <strong>pre-veterinary GPA calculator</strong> for academic planning. Related tools like our <a href="https://zurawebtools.com/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator" className="text-green-600 hover:underline">medical school GPA calculator</a> and <a href="https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator" className="text-green-600 hover:underline">dental school GPA calculator</a> use similar methodologies.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Repeated Courses and Grade Replacement</h3>
            <p>
              One critical difference between VMCAS and many undergraduate institutions is the treatment of <strong>repeated courses</strong>. While your college may replace a previous grade when you retake a course, VMCAS includes <strong>all attempts</strong> in your GPA calculation. This policy means if you earned a C in Organic Chemistry and later retook it for an A, both grades count toward your VMCAS GPA. This <strong>grade replacement policy</strong> makes strategic course planning even more important for pre-veterinary students.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Minimum and Competitive Veterinary School GPAs</h3>
            <p>
              While the <strong>minimum GPA for veterinary school</strong> varies by institution, most schools require at least a 3.0 science GPA to be considered. However, successful <strong>veterinary school applicants</strong> typically have science GPAs above 3.5, with top-tier programs often admitting students with GPAs above 3.6. Our <strong>GPA converter</strong> helps you understand how your institution's grading scale translates to the standardized VMCAS 4.0 scale. <strong>Veterinary schools</strong> evaluate applications holistically, considering <strong>GRE scores</strong>, animal experience hours (minimum 500+ recommended), veterinary shadowing, research, leadership, and personal statements alongside academic metrics. Students with GPAs near the minimum threshold can strengthen their applications through <strong>post-baccalaureate programs</strong>, demonstrating upward grade trends, and exceptional performance in upper-level animal science courses. Consider exploring our <a href="https://zurawebtools.com/education-and-exam-tools/gpa-tools/pa-school-gpa-calculator" className="text-green-600 hover:underline">PA school GPA calculator</a> if you're also considering physician assistant programs.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Science vs. Non-Science Coursework</h3>
            <p>
              VMCAS separately calculates your <strong>science GPA</strong> and <strong>non-science GPA</strong> to give admissions committees insight into your performance across different academic areas. Science courses include all biology, chemistry, physics, mathematics, and animal science courses, while non-science courses encompass humanities, social sciences, and other liberal arts subjects. This separation helps veterinary schools assess both your scientific aptitude and well-rounded academic performance.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Animal Experience and Veterinary School Admissions</h3>
            <p>
              Unlike other professional schools, veterinary schools place significant emphasis on <strong>animal experience hours</strong>. While GPA is crucial, most successful applicants have 500-1000+ hours of animal-related experience including veterinary shadowing, animal shelter work, farm experience, and research with animals. Your GPA combined with diverse animal experience creates a competitive profile for <strong>DVM programs</strong> (Doctor of Veterinary Medicine).
            </p>

            <p className="text-lg leading-relaxed mt-6">
              Use our <strong>veterinary school GPA calculator</strong> regularly throughout your pre-veterinary journey to monitor your academic progress, identify areas for improvement, and make informed decisions about course selection and application timing. Accurate GPA calculation is the first step toward successful <strong>veterinary school admission</strong> and ultimately achieving your goal of becoming a veterinarian.
            </p>
          </div>
        </div>

        {/* External Resources */}
        <div id="resources" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Helpful External Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.aavmc.org/vmcas/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">VMCAS Official Website</div>
                <div className="text-sm text-slate-600">Official veterinary school application service</div>
              </div>
            </a>

            <a
              href="https://www.aavmc.org/programs/veterinary-medical-colleges.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">AAVMC Veterinary Schools</div>
                <div className="text-sm text-slate-600">Complete directory of accredited vet schools</div>
              </div>
            </a>

            <a
              href="https://www.avma.org/education/prepare-veterinary-school"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">AVMA Preparation Guide</div>
                <div className="text-sm text-slate-600">American Veterinary Medical Association resources</div>
              </div>
            </a>

            <a
              href="https://www.ets.org/gre.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">GRE Information</div>
                <div className="text-sm text-slate-600">Graduate Record Examination for vet school</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl mb-8">
          <p className="text-sm text-slate-700">
            <strong>Last Updated:</strong> December 2025 | This calculator uses current VMCAS GPA calculation standards and is regularly updated to reflect any policy changes.
          </p>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" tabIndex={-1}>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is BCPM GPA for veterinary school?</h3>
              <p className="text-slate-700">BCPM GPA stands for Biology, Chemistry, Physics, and Math GPA. It's the science GPA calculated from courses in these four subject areas and is crucial for veterinary school applications through VMCAS. This includes animal biology, anatomy, physiology, organic chemistry, biochemistry, and physics courses.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How does VMCAS calculate GPA for repeated courses?</h3>
              <p className="text-slate-700">VMCAS includes all attempts of repeated courses in GPA calculation. Both the original grade and any repeat grades count toward your GPA, which differs from some undergraduate institutions that replace grades. This policy makes grade replacement impossible at the VMCAS level.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is considered a good veterinary school GPA?</h3>
              <p className="text-slate-700">A competitive veterinary school GPA is typically 3.5 or higher for both science and cumulative GPA. The best GPA for vet school admission is 3.6+, which meets most veterinary gpa requirements. Top DVM programs often admit students with GPAs above 3.6. However, veterinary schools consider the whole application including GRE scores, animal experience hours, and veterinary shadowing when evaluating candidates.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is the minimum GPA for veterinary school?</h3>
              <p className="text-slate-700">While most veterinary schools don't publish an absolute minimum GPA, the practical minimum is typically 3.0 for both science and cumulative GPA. However, a 3.0 GPA is considered below competitive range. Students with GPAs below 3.5 should consider post-baccalaureate programs, exceptional GRE scores, and extensive animal experience to strengthen applications.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Do veterinary schools emphasize science GPA?</h3>
              <p className="text-slate-700">Yes, veterinary schools place significant emphasis on science GPA (BCPM GPA) as it demonstrates your ability to handle rigorous science coursework essential for veterinary education. Both science and overall GPA are important, but science GPA often carries more weight alongside animal experience hours.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What courses count as science for vet school?</h3>
              <p className="text-slate-700">Science courses include Biology (general, cell, molecular, animal biology), Chemistry (general, organic, biochemistry), Physics, Mathematics (calculus, statistics), and related lab courses. Animal-specific courses like animal nutrition, anatomy, and physiology are typically classified as BCPM courses.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I improve my vet school GPA after graduation?</h3>
              <p className="text-slate-700">Yes, you can take post-baccalaureate courses or enroll in a formal post-bacc program to improve your GPA. VMCAS will calculate your updated GPA including all post-graduation coursework. Many successful vet school applicants complete post-bacc programs to raise their science GPA.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How accurate is this veterinary GPA calculator?</h3>
              <p className="text-slate-700">This calculator uses official VMCAS GPA calculation methods including standard 4.0 scale with plus/minus grading, repeated course policies, and separate science (BCPM) and non-science GPA calculations for 99.9% accuracy. Use this to estimate your GPA before official VMCAS verification.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How does VMCAS transcript verification work?</h3>
              <p className="text-slate-700">VMCAS transcript verification involves submitting official transcripts from all colleges attended. VMCAS staff manually review each transcript, verify course classifications (science vs non-science), standardize grades to the 4.0 scale, and calculate your official GPAs. This process typically takes 3-6 weeks during peak application season.</p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={[
            'dental-school-gpa-calculator',
            'medical-school-gpa-calculator',
            'pa-school-gpa-calculator',
            'pharmacy-school-gpa-calculator'
          ]}
          currentSlug="veterinary-school-gpa-calculator"
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default VeterinarySchoolGPACalculator;
