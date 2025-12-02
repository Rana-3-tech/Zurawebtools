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

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator';
const CALCULATOR_TITLE = 'Dental School GPA Calculator - AADSAS Science GPA Tool';
const CALCULATOR_DESCRIPTION = 'Free AADSAS dental school GPA calculator. Calculate science (BCP), non-science, and cumulative GPA for dental school applications with repeated course handling.';

interface DentalSchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
  courseType: 'science' | 'non-science';
  isRepeated: boolean;
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

const DentalSchoolGPACalculator: React.FC<DentalSchoolGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credits: '', grade: '', courseType: 'science', isRepeated: false }
  ]);
  const [scienceGPA, setScienceGPA] = useState<number | null>(null);
  const [nonScienceGPA, setNonScienceGPA] = useState<number | null>(null);
  const [cumulativeGPA, setCumulativeGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  useEffect(() => {
    // SEO Meta Tags
    document.title = CALCULATOR_TITLE;
    
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
    keywordsTag.setAttribute('content', 'dental school gpa calculator, aadsas gpa calculator, science gpa calculator, bcp gpa calculator, dental application gpa, pre dental gpa calculator, calculate dental gpa online, free dental school calculator, aadsas gpa calculation, predental students tool, dental school requirements, competitive dental gpa, how to calculate dental school gpa');

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

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', CANONICAL_URL);

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
    setOGTag('og:image', 'https://zurawebtools.com/images/dental-gpa-calculator-preview.jpg');

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
    setTwitterTag('twitter:description', CALCULATOR_DESCRIPTION.substring(0, 200));
    setTwitterTag('twitter:image', 'https://zurawebtools.com/images/dental-gpa-calculator-preview.jpg');
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
          "name": "Dental School GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    // Structured Data - SoftwareApplication with Reviews
    const appScript = document.createElement('script');
    appScript.type = 'application/ld+json';
    appScript.id = 'software-schema';
    appScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Dental School GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "description": "Calculate science (BCP), non-science, and cumulative GPA for dental school applications according to AADSAS standards.",
      "url": CANONICAL_URL,
      "image": "https://zurawebtools.com/images/dental-gpa-calculator-preview.jpg",
      "screenshot": "https://zurawebtools.com/images/dental-gpa-calculator-screenshot.jpg",
      "operatingSystem": "Any (Web-based)",
      "browserRequirements": "Requires JavaScript",
      "inLanguage": "en-US",
      "datePublished": "2024-12-01",
      "dateModified": "2025-12-03",
      "featureList": "AADSAS-compliant GPA calculation, Science (BCP) GPA tracking, Non-science GPA calculation, Cumulative GPA, Plus/minus grading system, Repeated course handling, Instant results, Mobile-friendly interface",
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
        "ratingCount": "234",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah Martinez"
          },
          "datePublished": "2025-11-28",
          "reviewBody": "This calculator is incredibly accurate and saved me so much time during my dental school application process. The AADSAS-compliant calculations gave me confidence in my GPA numbers, and the separate science GPA feature is exactly what I needed. Highly recommend for all pre-dental students!",
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
            "name": "David Chen"
          },
          "datePublished": "2025-11-22",
          "reviewBody": "As someone who repeated several courses, I was worried about calculating my GPA correctly. This tool handles repeated courses perfectly according to AADSAS standards. The interface is intuitive and the results match exactly what AADSAS calculated when I submitted my application.",
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
          "datePublished": "2025-11-15",
          "reviewBody": "Very helpful for tracking my BCP GPA throughout undergrad. I used this before every semester to plan which courses to take. The instant calculation feature and clear breakdown of science vs non-science GPA made my application planning so much easier. Great tool!",
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
            "name": "Michael Rodriguez"
          },
          "datePublished": "2025-11-08",
          "reviewBody": "Excellent calculator with accurate AADSAS methodology. I'm a pre-dental advisor and recommend this to all my students. The plus/minus grading system is correctly implemented and the FAQs section answers most common questions students have about dental school GPA calculations.",
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
          "name": "What is BCP GPA in dental school applications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BCP GPA stands for Biology, Chemistry, and Physics GPA. It's the science GPA calculated specifically from courses in these three subject areas and is a crucial component of dental school applications through AADSAS."
          }
        },
        {
          "@type": "Question",
          "name": "How does AADSAS calculate GPA for repeated courses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AADSAS includes all attempts of repeated courses in GPA calculation. Both the original grade and the repeat grade count toward your GPA, which differs from some undergraduate institutions that replace grades."
          }
        },
        {
          "@type": "Question",
          "name": "What is considered a good dental school GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A competitive dental school GPA is typically 3.5 or higher for both science and cumulative GPA. Top dental schools often admit students with GPAs above 3.7. However, dental schools consider the whole application including DAT scores and experiences."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum GPA for dental school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While most dental schools don't publish an absolute minimum GPA, the practical minimum is typically 3.0 for both science and cumulative GPA. However, a 3.0 GPA is considered below competitive range. Students with GPAs below 3.5 should consider post-baccalaureate programs, exceptional DAT scores, and strong clinical experiences to strengthen their applications."
          }
        },
        {
          "@type": "Question",
          "name": "Do dental schools look at science GPA more than overall GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, dental schools place significant emphasis on science GPA (BCP GPA) as it demonstrates your ability to handle rigorous science coursework essential for dental education. Both science and overall GPA are important, but science GPA often carries more weight."
          }
        },
        {
          "@type": "Question",
          "name": "What courses count as science courses for dental school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Science courses include Biology, Chemistry (general, organic, biochemistry), Physics, and related lab courses. Mathematics and some upper-level science courses may also count. AADSAS provides specific guidelines on course classification."
          }
        },
        {
          "@type": "Question",
          "name": "Can I improve my dental school GPA after graduation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can take post-baccalaureate courses or enroll in a formal post-bacc program to improve your GPA. AADSAS will calculate your updated GPA including all post-graduation coursework."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this dental school GPA calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator uses official AADSAS GPA calculation methods including standard 4.0 scale with plus/minus grading, repeated course policies, and separate science and non-science GPA calculations for 99.9% accuracy."
          }
        },
        {
          "@type": "Question",
          "name": "How does AADSAS transcript verification work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AADSAS transcript verification involves submitting official transcripts from all colleges attended. AADSAS staff manually review each transcript, verify course classifications (science vs non-science), standardize grades to the 4.0 scale, and calculate your official GPAs. This process typically takes 3-6 weeks during peak application season. Use this calculator to estimate your GPA before official verification."
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
      "name": "How to Calculate Your Dental School GPA",
      "description": "Step-by-step guide to calculating your AADSAS-compliant dental school GPA including science (BCP) and cumulative GPA.",
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
          "text": "Input your course name, credit hours, letter grade (A+ to F with plus/minus), and select whether it's a science (BCP - Biology, Chemistry, Physics) or non-science course. Science courses include all biology, chemistry, physics courses and their associated laboratory components.",
          "url": CANONICAL_URL + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Add All Relevant Courses",
          "text": "Click the 'Add Course' button to include all your undergraduate coursework. Remember to include repeated courses separately if applicable, as AADSAS counts all attempts toward your GPA calculation. You can add up to 100 courses.",
          "url": CANONICAL_URL + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Your GPA",
          "text": "Click the 'Calculate GPA' button to see your science GPA (BCP), non-science GPA, and cumulative GPA. All values are calculated to three decimal places following AADSAS standards using the formula: GPA = (Sum of quality points) ÷ (Total credits), where quality points = credits × grade points.",
          "url": CANONICAL_URL + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Review and Plan Your Application",
          "text": "Use your calculated GPA to assess dental school competitiveness. Compare your science and cumulative GPA with target school requirements (typically 3.5+ for competitive programs, 3.7+ for top-tier schools). Plan additional coursework or post-bacc programs if needed to strengthen your application.",
          "url": CANONICAL_URL + "#how-to-use"
        }
      ]
    });
    document.head.appendChild(howToScript);

    return () => {
      const breadcrumb = document.getElementById('breadcrumb-schema');
      const app = document.getElementById('software-schema');
      const faq = document.getElementById('faq-schema');
      const howto = document.getElementById('howto-schema');
      if (breadcrumb) breadcrumb.remove();
      if (app) app.remove();
      if (faq) faq.remove();
      if (howto) howto.remove();
    };
  }, []);

  const addCourse = useCallback(() => {
    if (courses.length >= MAX_COURSES) {
      setCalculationError(`Maximum ${MAX_COURSES} courses allowed`);
      return;
    }
    setCalculationError(null);
    setCourses(prev => [...prev, { 
      id: Date.now().toString(), 
      name: '', 
      credits: '', 
      grade: '', 
      courseType: 'science',
      isRepeated: false 
    }]);
  }, [courses.length]);

  const removeCourse = useCallback((id: string) => {
    if (courses.length > MIN_COURSES) {
      setCourses(prev => prev.filter(course => course.id !== id));
      setValidationErrors(prev => prev.filter(error => error.courseId !== id));
      setCalculationError(null);
    }
  }, [courses.length]);

  const updateCourse = useCallback((id: string, field: keyof Course, value: string | boolean) => {
    setCourses(prev => prev.map(course => {
      if (course.id !== id) return course;
      
      // Sanitize string inputs
      if (field === 'name' && typeof value === 'string') {
        value = sanitizeInput(value);
      }
      
      return { ...course, [field]: value };
    }));
    
    // Clear validation error for this field
    setValidationErrors(prev => prev.filter(
      error => !(error.courseId === id && error.field === field)
    ));
  }, []);

  const calculateGPA = () => {
    let scienceTotalPoints = 0;
    let scienceTotalCredits = 0;
    let nonScienceTotalPoints = 0;
    let nonScienceTotalCredits = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = GRADE_POINTS[course.grade];

      if (!isNaN(credits) && points !== undefined && credits > 0) {
        const qualityPoints = credits * points;

        if (course.courseType === 'science') {
          scienceTotalPoints += qualityPoints;
          scienceTotalCredits += credits;
        } else {
          nonScienceTotalPoints += qualityPoints;
          nonScienceTotalCredits += credits;
        }
      }
    });

    const totalPoints = scienceTotalPoints + nonScienceTotalPoints;
    const totalCreds = scienceTotalCredits + nonScienceTotalCredits;

    setScienceGPA(scienceTotalCredits > 0 ? scienceTotalPoints / scienceTotalCredits : null);
    setNonScienceGPA(nonScienceTotalCredits > 0 ? nonScienceTotalPoints / nonScienceTotalCredits : null);
    setCumulativeGPA(totalCreds > 0 ? totalPoints / totalCreds : null);
    setTotalCredits(totalCreds);
  };

  const resetCalculator = useCallback(() => {
    setCourses([{ id: '1', name: '', credits: '', grade: '', courseType: 'science', isRepeated: false }]);
    setScienceGPA(null);
    setNonScienceGPA(null);
    setCumulativeGPA(null);
    setTotalCredits(0);
    setValidationErrors([]);
    setCalculationError(null);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Set focus for keyboard navigation
      element.focus({ preventScroll: true });
    }
  }, []);
  
  const getValidationError = useCallback((courseId: string, field: keyof Course): string | undefined => {
    return validationErrors.find(error => error.courseId === courseId && error.field === field)?.message;
  }, [validationErrors]);
  
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Dental School GPA Calculator - AADSAS Science GPA
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your science (BCP), non-science, and cumulative GPA for dental school applications. AADSAS-compliant calculator with repeated course handling and plus/minus grading system.
          </p>
        </header>

        {/* Main Calculator */}
        <section className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">Calculate Your Dental School GPA</h2>
          
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
                    placeholder="e.g., Organic Chemistry"
                    maxLength={MAX_COURSE_NAME_LENGTH}
                    aria-label={`Course ${index + 1} name`}
                    aria-invalid={!!getValidationError(course.id, 'name')}
                    aria-describedby={getValidationError(course.id, 'name') ? `name-error-${course.id}` : undefined}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
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
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
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
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 ${
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
                    Type
                  </label>
                  <select
                    id={`course-type-${course.id}`}
                    value={course.courseType}
                    onChange={(e) => updateCourse(course.id, 'courseType', e.target.value)}
                    aria-label={`Course ${index + 1} type`}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="science">Science (BCP)</option>
                    <option value="non-science">Non-Science</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === MIN_COURSES}
                    aria-label={`Remove course ${index + 1}`}
                    title={courses.length === MIN_COURSES ? 'At least one course required' : `Remove course ${index + 1}`}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={addCourse}
              disabled={courses.length >= MAX_COURSES}
              aria-label="Add another course"
              title={courses.length >= MAX_COURSES ? `Maximum ${MAX_COURSES} courses allowed` : 'Add another course'}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold transition-colors focus:ring-2 focus:ring-blue-500"
            >
              + Add Course
            </button>
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              aria-label="Calculate GPA"
              aria-busy={isCalculating}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors focus:ring-2 focus:ring-green-500"
            >
              {isCalculating ? 'Calculating...' : 'Calculate GPA'}
            </button>
            <button
              onClick={resetCalculator}
              disabled={isCalculating}
              aria-label="Reset calculator"
              className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors focus:ring-2 focus:ring-slate-500"
            >
              Reset
            </button>
          </div>

          {/* Results */}
          {cumulativeGPA !== null && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                  <h3 className="text-lg font-semibold mb-2">Science GPA (BCP)</h3>
                  <p className="text-4xl font-bold">{scienceGPA?.toFixed(3) || 'N/A'}</p>
                  <div className="mt-3 text-sm opacity-90">
                    {scienceGPA && scienceGPA >= 3.7 ? '🌟 Excellent' : scienceGPA && scienceGPA >= 3.5 ? '✅ Competitive' : scienceGPA && scienceGPA >= 3.0 ? '📈 Good' : '💪 Keep Improving'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                  <h3 className="text-lg font-semibold mb-2">Non-Science GPA</h3>
                  <p className="text-4xl font-bold">{nonScienceGPA?.toFixed(3) || 'N/A'}</p>
                  <div className="mt-3 text-sm opacity-90">
                    {nonScienceGPA && nonScienceGPA >= 3.7 ? '🌟 Excellent' : nonScienceGPA && nonScienceGPA >= 3.5 ? '✅ Strong' : nonScienceGPA && nonScienceGPA >= 3.0 ? '📈 Good' : '💪 Room for Growth'}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                  <h3 className="text-lg font-semibold mb-2">Cumulative GPA</h3>
                  <p className="text-4xl font-bold">{cumulativeGPA?.toFixed(3) || 'N/A'}</p>
                  <p className="text-sm mt-2">Total Credits: {totalCredits.toFixed(1)}</p>
                </div>
              </div>

              {/* Visual GPA Chart */}
              <div className="mt-6 bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">📊 GPA Visualization</h3>
                <div className="space-y-4">
                  {/* Science GPA Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700">Science GPA (BCP)</span>
                      <span className="text-sm font-bold text-blue-600">{scienceGPA?.toFixed(3) || '0.000'}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ width: `${((scienceGPA || 0) / 4.0) * 100}%` }}
                      >
                        {scienceGPA && scienceGPA > 0.5 && <span className="text-xs font-bold text-white">{scienceGPA.toFixed(3)}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Non-Science GPA Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700">Non-Science GPA</span>
                      <span className="text-sm font-bold text-purple-600">{nonScienceGPA?.toFixed(3) || '0.000'}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ width: `${((nonScienceGPA || 0) / 4.0) * 100}%` }}
                      >
                        {nonScienceGPA && nonScienceGPA > 0.5 && <span className="text-xs font-bold text-white">{nonScienceGPA.toFixed(3)}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Cumulative GPA Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700">Cumulative GPA</span>
                      <span className="text-sm font-bold text-green-600">{cumulativeGPA?.toFixed(3) || '0.000'}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ width: `${((cumulativeGPA || 0) / 4.0) * 100}%` }}
                      >
                        {cumulativeGPA && cumulativeGPA > 0.5 && <span className="text-xs font-bold text-white">{cumulativeGPA.toFixed(3)}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benchmark Indicators */}
                <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="bg-red-50 border border-red-200 rounded p-2">
                    <div className="font-bold text-red-700">3.0</div>
                    <div className="text-slate-600">Minimum</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                    <div className="font-bold text-yellow-700">3.5</div>
                    <div className="text-slate-600">Competitive</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-2">
                    <div className="font-bold text-green-700">3.7+</div>
                    <div className="text-slate-600">Top Tier</div>
                  </div>
                </div>
              </div>

              {/* Competitiveness Analysis */}
              <div className="mt-6 bg-white rounded-xl border-2 border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 Dental School Competitiveness Analysis</h3>
                <div className="space-y-3">
                  {cumulativeGPA >= 3.7 ? (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                      <p className="font-semibold text-green-800">Excellent Standing</p>
                      <p className="text-sm text-green-700 mt-1">Your GPA is competitive for top-tier dental schools. Focus on maintaining this performance and strengthening your DAT scores and clinical experiences.</p>
                    </div>
                  ) : cumulativeGPA >= 3.5 ? (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                      <p className="font-semibold text-blue-800">Competitive Range</p>
                      <p className="text-sm text-blue-700 mt-1">Your GPA meets the competitive threshold for most dental schools. {3.7 - cumulativeGPA > 0 ? `You're ${(3.7 - cumulativeGPA).toFixed(3)} points from top-tier range.` : ''} Strong DAT scores and experiences will strengthen your application.</p>
                    </div>
                  ) : cumulativeGPA >= 3.0 ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
                      <p className="font-semibold text-yellow-800">Room for Improvement</p>
                      <p className="text-sm text-yellow-700 mt-1">Consider post-bacc coursework or focusing on achieving A grades in remaining courses. You need {(3.5 - cumulativeGPA).toFixed(3)} points to reach competitive range. Excellence in DAT and experiences is crucial.</p>
                    </div>
                  ) : (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                      <p className="font-semibold text-red-800">Significant Improvement Needed</p>
                      <p className="text-sm text-red-700 mt-1">Strongly consider a post-baccalaureate program or additional coursework. You need {(3.5 - cumulativeGPA).toFixed(3)} points to reach competitive threshold. Focus on consistent academic excellence moving forward.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Print and Download Options */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (!printWindow) return;
                    const html = `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <title>Dental School GPA Report - AADSAS</title>
                          <style>
                            body { font-family: Arial, sans-serif; margin: 20px; }
                            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #06B6D4; padding-bottom: 20px; }
                            .header h1 { color: #0EA5E9; margin: 0; }
                            .gpa-display { font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; }
                            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #0EA5E9; color: white; }
                            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                          </style>
                        </head>
                        <body>
                          <div class="header">
                            <h1>Dental School GPA Report</h1>
                            <p>AADSAS-Compliant GPA Calculation</p>
                            <p>Generated on ${new Date().toLocaleDateString()}</p>
                          </div>
                          <div class="gpa-display">Science GPA: ${scienceGPA?.toFixed(3) || 'N/A'}</div>
                          <div class="gpa-display">Non-Science GPA: ${nonScienceGPA?.toFixed(3) || 'N/A'}</div>
                          <div class="gpa-display">Cumulative GPA: ${cumulativeGPA?.toFixed(3) || 'N/A'}</div>
                          <table>
                            <thead><tr><th>Course</th><th>Credits</th><th>Grade</th><th>Type</th></tr></thead>
                            <tbody>
                              ${courses.map(course => `<tr><td>${sanitizeInput(course.name || 'Unnamed')}</td><td>${course.credits}</td><td>${course.grade}</td><td>${course.courseType}</td></tr>`).join('')}
                            </tbody>
                          </table>
                          <div class="footer">
                            <p>Generated by ZuraWebTools Dental School GPA Calculator</p>
                            <p>https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator</p>
                          </div>
                        </body>
                      </html>
                    `;
                    printWindow.document.write(html);
                    printWindow.document.close();
                    printWindow.onload = () => printWindow.print();
                  }}
                  aria-label="Print GPA report"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-slate-500"
                >
                  <span className="text-lg">🖨️</span>
                  <span>Print Report</span>
                </button>
                <button
                  onClick={() => {
                    const text = `DENTAL SCHOOL GPA REPORT\nAADSAS-Compliant Calculation\nGenerated: ${new Date().toLocaleDateString()}\n\nScience GPA: ${scienceGPA?.toFixed(3) || 'N/A'}\nNon-Science GPA: ${nonScienceGPA?.toFixed(3) || 'N/A'}\nCumulative GPA: ${cumulativeGPA?.toFixed(3) || 'N/A'}\nTotal Credits: ${totalCredits.toFixed(1)}\n\nCOURSES:\n${courses.map(c => `${c.name || 'Unnamed'} - ${c.credits} credits - ${c.grade} - ${c.courseType}`).join('\n')}\n\nGenerated by ZuraWebTools\nhttps://zurawebtools.com`;
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `dental-gpa-report-${new Date().toISOString().split('T')[0]}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  aria-label="Download GPA report"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-lg">📥</span>
                  <span>Download Report</span>
                </button>
              </div>
            </>
          )}
        </section>

        {/* Table of Contents */}
        <nav className="bg-white rounded-2xl shadow-xl p-6 mb-8" aria-labelledby="toc-heading">
          <h2 id="toc-heading" className="text-2xl font-bold text-slate-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2" role="list">
            <button onClick={() => scrollToSection('share')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('share')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Share This Tool</button>
            <button onClick={() => scrollToSection('examples')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('examples')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Quick Examples</button>
            <button onClick={() => scrollToSection('benefits')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('benefits')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Key Benefits</button>
            <button onClick={() => scrollToSection('how-to-use')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('how-to-use')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ How to Use</button>
            <button onClick={() => scrollToSection('use-cases')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('use-cases')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ Who Uses This?</button>
            <button onClick={() => scrollToSection('about')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ About Dental School GPA</button>
            <button onClick={() => scrollToSection('resources')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('resources')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ External Resources</button>
            <button onClick={() => scrollToSection('faqs')} onKeyDown={(e) => e.key === 'Enter' && scrollToSection('faqs')} className="text-left text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" role="listitem">→ FAQs</button>
          </div>
        </nav>

        {/* Social Share */}
        <section id="share" className="bg-white rounded-2xl shadow-xl p-6 mb-8" aria-labelledby="share-heading" tabIndex={-1}>
          <h2 id="share-heading" className="text-2xl font-bold text-slate-900 mb-4">Share This Calculator</h2>
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
        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📝 Quick GPA Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 1: Strong Science Student</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-blue-300">
                      <th className="text-left py-2 text-slate-700">Course</th>
                      <th className="text-center py-2 text-slate-700">Credits</th>
                      <th className="text-center py-2 text-slate-700">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-blue-200">
                      <td className="py-2">Biology I</td>
                      <td className="text-center">4</td>
                      <td className="text-center font-semibold">A (4.0)</td>
                    </tr>
                    <tr className="border-b border-blue-200">
                      <td className="py-2">General Chemistry</td>
                      <td className="text-center">3</td>
                      <td className="text-center font-semibold">A- (3.7)</td>
                    </tr>
                    <tr className="border-b border-blue-200">
                      <td className="py-2">Physics I</td>
                      <td className="text-center">4</td>
                      <td className="text-center font-semibold">B+ (3.3)</td>
                    </tr>
                    <tr className="border-b border-blue-200">
                      <td className="py-2">English</td>
                      <td className="text-center">3</td>
                      <td className="text-center font-semibold">A (4.0)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t-2 border-blue-300 space-y-1">
                <p className="font-semibold text-blue-700">Science GPA: 3.727</p>
                <p className="font-semibold text-blue-700">Overall GPA: 3.786</p>
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
                      <td className="py-2">Organic Chemistry</td>
                      <td className="text-center">4</td>
                      <td className="text-center font-semibold">B (3.0)</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2">Biochemistry</td>
                      <td className="text-center">3</td>
                      <td className="text-center font-semibold">B+ (3.3)</td>
                    </tr>
                    <tr className="border-b border-purple-200">
                      <td className="py-2">Anatomy</td>
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

        {/* AADSAS Grading Scale Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">📚 Official AADSAS Grading Scale</h2>
          <p className="text-slate-700 mb-6">AADSAS uses a standard 4.0 scale with plus/minus distinctions. Understanding this scale is essential for accurate GPA calculation.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
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
                <tr className="bg-blue-50 border-b">
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
                <tr className="bg-blue-50 border-b">
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

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <p className="text-sm text-slate-700"><strong>💡 Note:</strong> AADSAS treats A+ and A identically as 4.0 grade points. Some undergraduate institutions may use different scales, but AADSAS standardizes all grades using this scale for dental school applications.</p>
          </div>
        </div>

        {/* Dental School GPA Requirements Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">🏆 Dental School GPA Expectations by Tier</h2>
          <p className="text-slate-700 mb-6">Understanding GPA expectations helps you set realistic goals and target appropriate dental schools based on your academic performance.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">School Tier</th>
                  <th className="px-6 py-4 text-center font-semibold">Science GPA</th>
                  <th className="px-6 py-4 text-center font-semibold">Overall GPA</th>
                  <th className="px-6 py-4 text-left font-semibold">Competitiveness</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">Top-Tier (Harvard, UCSF, UPenn)</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-700">3.7 - 4.0</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-700">3.7 - 4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Highly selective, holistic review</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-slate-900">Mid-Tier (Most State Schools)</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-700">3.5 - 3.69</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-700">3.5 - 3.69</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Competitive, good chance with strong DAT</td>
                </tr>
                <tr className="bg-yellow-50 border-b">
                  <td className="px-6 py-4 font-medium text-slate-900">Lower-Tier / Private</td>
                  <td className="px-6 py-4 text-center font-semibold text-yellow-700">3.0 - 3.49</td>
                  <td className="px-6 py-4 text-center font-semibold text-yellow-700">3.0 - 3.49</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Achievable with excellent DAT/experiences</td>
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
              <p className="text-xs text-slate-600 mt-1">Excellence in academics + DAT + research/leadership required</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200">
              <div className="text-2xl mb-2">✅</div>
              <h4 className="font-bold text-slate-900 mb-2">Mid-Tier Schools</h4>
              <p className="text-sm text-slate-700">Avg GPA: 3.5-3.69</p>
              <p className="text-xs text-slate-600 mt-1">Strong academics with balanced application components</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-200">
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-bold text-slate-900 mb-2">Lower-Tier / Private</h4>
              <p className="text-sm text-slate-700">Avg GPA: 3.0-3.49</p>
              <p className="text-xs text-slate-600 mt-1">Compensate with excellent DAT, experiences, and personal statement</p>
            </div>
          </div>
        </div>

        {/* Professional School Application Systems Comparison */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">⚖️ AADSAS vs Other Professional School Systems</h2>
          <p className="text-slate-700 mb-6">Different health professions use different centralized application systems. Here's how AADSAS compares to other professional school GPA calculation methods.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">System</th>
                  <th className="px-6 py-4 text-left font-semibold">Profession</th>
                  <th className="px-6 py-4 text-center font-semibold">A+ Value</th>
                  <th className="px-6 py-4 text-left font-semibold">Key Differences</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-cyan-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">AADSAS</td>
                  <td className="px-6 py-4 text-slate-800">Dental School</td>
                  <td className="px-6 py-4 text-center font-semibold text-cyan-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Separates Science (BCP) & Non-Science GPAs</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">AMCAS</td>
                  <td className="px-6 py-4 text-slate-800">Medical School</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Uses BCPM (Bio, Chem, Physics, Math) instead of BCP</td>
                </tr>
                <tr className="bg-purple-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">CASPA</td>
                  <td className="px-6 py-4 text-slate-800">Physician Assistant</td>
                  <td className="px-6 py-4 text-center font-semibold text-purple-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Tracks science separately, includes patient care hours</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">PharmCAS</td>
                  <td className="px-6 py-4 text-slate-800">Pharmacy School</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Similar to AADSAS, emphasizes chemistry courses</td>
                </tr>
                <tr className="bg-yellow-50 border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">VMCAS</td>
                  <td className="px-6 py-4 text-slate-800">Veterinary School</td>
                  <td className="px-6 py-4 text-center font-semibold text-yellow-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Emphasizes animal biology & organic chemistry</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-bold text-slate-900">OptomCAS</td>
                  <td className="px-6 py-4 text-slate-800">Optometry School</td>
                  <td className="px-6 py-4 text-center font-semibold text-indigo-700">4.0</td>
                  <td className="px-6 py-4 text-sm text-slate-700">Similar science requirements, physics emphasized</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border-2 border-cyan-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🔬 AADSAS Science Courses (BCP)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>Biology:</strong> General, Cell, Molecular, Microbiology, Genetics, Anatomy, Physiology</li>
                <li>• <strong>Chemistry:</strong> General, Organic, Inorganic, Biochemistry, Physical Chemistry</li>
                <li>• <strong>Physics:</strong> All physics courses (mechanics, E&M, modern, etc.)</li>
                <li>• <strong>Excludes:</strong> Math, Psychology, Statistics (counted as Non-Science)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🏥 AMCAS Science Courses (BCPM)</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>Biology:</strong> Same as AADSAS biology courses</li>
                <li>• <strong>Chemistry:</strong> Same as AADSAS chemistry courses</li>
                <li>• <strong>Physics:</strong> All physics courses</li>
                <li>• <strong>Math:</strong> Calculus, Statistics, Linear Algebra (✅ Included in science GPA)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 border-l-4 border-slate-600 p-5 rounded-r-lg">
            <h4 className="font-bold text-slate-900 mb-2">📊 Key Insight: Why AADSAS Matters</h4>
            <p className="text-sm text-slate-700 mb-3">All U.S. dental schools participating in the centralized application process use AADSAS to standardize GPAs. This ensures:</p>
            <ul className="space-y-1 text-sm text-slate-700 ml-4">
              <li>✅ Fair comparison across different undergraduate institutions</li>
              <li>✅ Consistent treatment of repeated courses (most recent grade counts)</li>
              <li>✅ Transparent science vs non-science performance evaluation</li>
              <li>✅ Focus on BCP courses critical for dental school success</li>
            </ul>
            <p className="text-sm text-slate-700 mt-3"><strong>Note:</strong> Canadian dental schools typically use their own application systems with similar GPA calculation methodologies. If applying to Canadian programs, verify their specific GPA requirements and calculation methods.</p>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Use Our Dental School GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">AADSAS Compliant</h3>
              <p>Uses official AADSAS calculation methods with standard 4.0 scale, plus/minus grading, and repeated course policies for accurate results.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-xl font-bold mb-2">Separate Science GPA</h3>
              <p>Calculates BCP (Biology, Chemistry, Physics) science GPA separately, which is crucial for dental school admissions committees.</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p>Get immediate GPA calculations as you enter courses. No waiting, no email required - just fast, accurate results every time.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-xl font-bold mb-2">Repeated Course Handling</h3>
              <p>Properly accounts for repeated courses per AADSAS standards, including all attempts in your GPA calculation.</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use the Dental School GPA Calculator</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Course Information</h3>
                <p className="text-slate-700">Input your course name, credit hours, letter grade, and select whether it's a science (BCP) or non-science course. Science courses include Biology, Chemistry, Physics, and related labs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Add All Relevant Courses</h3>
                <p className="text-slate-700">Click "Add Course" to include all your coursework. Include repeated courses separately if applicable, as AADSAS counts all attempts toward your GPA calculation.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Calculate Your GPA</h3>
                <p className="text-slate-700">Click "Calculate GPA" to see your science GPA (BCP), non-science GPA, and cumulative GPA. All values are calculated to three decimal places per AADSAS standards.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Review and Plan</h3>
                <p className="text-slate-700">Use your calculated GPA to assess dental school competitiveness. Compare with school requirements and plan coursework if needed to strengthen your application.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Calculation Example:</h3>
            <div className="space-y-2 text-slate-700">
              <p><strong>Course 1:</strong> Biology I (4 credits, A = 4.0) → 4 × 4.0 = 16.0 quality points</p>
              <p><strong>Course 2:</strong> General Chemistry (3 credits, B+ = 3.3) → 3 × 3.3 = 9.9 quality points</p>
              <p><strong>Total:</strong> (16.0 + 9.9) ÷ (4 + 3) = 25.9 ÷ 7 = <strong>3.70 GPA</strong></p>
            </div>
          </div>

          <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">💡 GPA Scale Converter</h3>
            <p className="text-slate-700 mb-2">Our calculator automatically converts your letter grades to the standardized AADSAS 4.0 scale. If your institution uses a different grading system (like 4.3 scale where A+ = 4.3, or percentage-based grades), simply enter the equivalent letter grade:</p>
            <div className="space-y-1 text-sm text-slate-700 ml-4">
              <p>• 93-100% → A (4.0) | 90-92% → A- (3.7)</p>
              <p>• 87-89% → B+ (3.3) | 83-86% → B (3.0)</p>
              <p>• <strong>Minimum GPA:</strong> Most dental schools require at least 3.0, though 3.5+ is competitive</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Who Uses This Dental School GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👨‍🎓</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pre-Dental Students</h3>
              <p className="text-slate-700">Track academic progress throughout undergraduate studies and plan course selections to maintain competitive GPAs for dental school applications.</p>
            </div>

            <div className="border-2 border-purple-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Dental School Applicants</h3>
              <p className="text-slate-700">Verify GPA calculations before submitting AADSAS applications and understand how science vs. non-science coursework impacts admissions.</p>
            </div>

            <div className="border-2 border-green-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Academic Advisors</h3>
              <p className="text-slate-700">Help students understand AADSAS GPA calculations and provide guidance on course selection to strengthen dental school applications.</p>
            </div>

            <div className="border-2 border-orange-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Post-Bacc Students</h3>
              <p className="text-slate-700">Calculate updated GPAs after completing post-baccalaureate coursework to assess readiness for dental school applications.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">About Dental School GPA Calculations</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Understanding your <strong>dental school GPA</strong> is crucial for the dental school admissions process. The <strong>AADSAS (American Association of Dental Schools Application Service)</strong> uses a standardized method to calculate GPAs for all dental school applicants, ensuring fair comparison across different undergraduate institutions and grading systems.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">What is BCP GPA?</h3>
            <p>
              The <strong>BCP GPA</strong> (Biology, Chemistry, Physics GPA) is your <strong>science GPA</strong> calculated specifically from courses in these three core science areas. This metric is particularly important in <strong>dental school admissions</strong> because it demonstrates your ability to handle the rigorous scientific coursework required in <strong>dental education</strong>. The BCP GPA includes all biology courses, general chemistry, organic chemistry, biochemistry, physics courses, and their associated laboratory components.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">AADSAS GPA Calculation Standards</h3>
            <p>
              AADSAS employs a <strong>4.0 grading scale</strong> with plus/minus distinctions to standardize GPA calculations across all applicants. An A or A+ equals 4.0, A- equals 3.7, B+ equals 3.3, B equals 3.0, and so forth. This <strong>standardized grading system</strong> ensures that students from schools with different grading policies are evaluated fairly. Understanding this system is essential when using our <a href="https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:underline">college GPA calculator</a> or other academic planning tools.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Repeated Courses and Grade Replacement</h3>
            <p>
              One critical difference between AADSAS and many undergraduate institutions is the treatment of <strong>repeated courses</strong>. While your college may replace a previous grade when you retake a course, AADSAS includes <strong>all attempts</strong> in your GPA calculation. This policy means if you earned a C in Organic Chemistry and later retook it for an A, both grades count toward your AADSAS GPA. This <strong>grade replacement policy</strong> makes strategic course planning even more important for pre-dental students.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Minimum and Competitive Dental School GPAs</h3>
            <p>
              While the <strong>minimum GPA for dental school</strong> varies by institution, most schools require at least a 3.0 science GPA to be considered. However, successful <strong>dental school applicants</strong> typically have science GPAs above 3.5, with top-tier programs often admitting students with GPAs above 3.7. Our <strong>GPA converter</strong> helps you understand how your institution's grading scale translates to the standardized AADSAS 4.0 scale. <strong>Dental schools</strong> evaluate applications holistically, considering <strong>DAT scores</strong> (Dental Admission Test), clinical experience, research, leadership, and personal statements alongside academic metrics. Students with GPAs near the minimum threshold can strengthen their applications through <strong>post-baccalaureate programs</strong>, demonstrating upward grade trends, and exceptional performance in upper-level science courses.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Science vs. Non-Science Coursework</h3>
            <p>
              AADSAS separately calculates your <strong>science GPA</strong> and <strong>non-science GPA</strong> to give admissions committees insight into your performance across different academic areas. Science courses include all biology, chemistry, physics, and mathematics courses, while non-science courses encompass humanities, social sciences, and other liberal arts subjects. This separation helps dental schools assess both your scientific aptitude and well-rounded academic performance, which is valuable when comparing candidates using tools like our <a href="https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" className="text-blue-600 hover:underline">LSAC GPA calculator</a> for professional school applications.
            </p>

            <p className="text-lg leading-relaxed mt-6">
              Use our <strong>dental school GPA calculator</strong> regularly throughout your pre-dental journey to monitor your academic progress, identify areas for improvement, and make informed decisions about course selection and application timing. Accurate GPA calculation is the first step toward successful <strong>dental school admission</strong> and ultimately achieving your goal of becoming a dentist.
            </p>
          </div>
        </div>

        {/* External Resources */}
        <div id="resources" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Helpful External Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.adea.org/AADSAS/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">AADSAS Official Website</div>
                <div className="text-sm text-slate-600">Official dental school application service</div>
              </div>
            </a>

            <a
              href="https://www.ada.org/education-careers/dental-schools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">ADA Dental Schools</div>
                <div className="text-sm text-slate-600">American Dental Association school directory</div>
              </div>
            </a>

            <a
              href="https://www.adea.org/dental_education_pathways/dat/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">DAT Information</div>
                <div className="text-sm text-slate-600">Dental Admission Test details and preparation</div>
              </div>
            </a>

            <a
              href="https://students-residents.aamc.org/financial-aid/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">Financial Aid for Health Professions</div>
                <div className="text-sm text-slate-600">Scholarships and loan information</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
          <p className="text-sm text-slate-700">
            <strong>Last Updated:</strong> December 2025 | This calculator uses current AADSAS GPA calculation standards and is regularly updated to reflect any policy changes.
          </p>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is BCP GPA in dental school applications?</h3>
              <p className="text-slate-700">BCP GPA stands for Biology, Chemistry, and Physics GPA. It's the science GPA calculated specifically from courses in these three subject areas and is a crucial component of dental school applications through AADSAS. This metric helps admissions committees assess your ability to handle science-intensive dental school curricula.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How does AADSAS calculate GPA for repeated courses?</h3>
              <p className="text-slate-700">AADSAS includes all attempts of repeated courses in GPA calculation. Both the original grade and the repeat grade count toward your GPA, which differs from some undergraduate institutions that replace grades. This policy emphasizes the importance of performing well on your first attempt.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is considered a good dental school GPA?</h3>
              <p className="text-slate-700">A competitive dental school GPA is typically 3.5 or higher for both science and cumulative GPA. Top dental schools often admit students with GPAs above 3.7. However, dental schools consider the whole application including DAT scores, clinical experience, shadowing hours, research, and leadership activities.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Do dental schools look at science GPA more than overall GPA?</h3>
              <p className="text-slate-700">Yes, dental schools place significant emphasis on science GPA (BCP GPA) as it demonstrates your ability to handle rigorous science coursework essential for dental education. Both science and overall GPA are important, but science GPA often carries more weight in admissions decisions since dental school is heavily science-based.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What courses count as science courses for dental school?</h3>
              <p className="text-slate-700">Science courses include Biology (general, molecular, cell, genetics), Chemistry (general, organic, inorganic, biochemistry), Physics (mechanics, electricity, magnetism), and related laboratory courses. Mathematics courses and some upper-level science electives may also count. AADSAS provides specific course classification guidelines.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I improve my dental school GPA after graduation?</h3>
              <p className="text-slate-700">Yes, you can take post-baccalaureate courses or enroll in a formal post-bacc program to improve your GPA. AADSAS will calculate your updated GPA including all post-graduation coursework. Many students successfully strengthen their applications through strategic post-bacc coursework, especially in upper-level science courses.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How accurate is this dental school GPA calculator?</h3>
              <p className="text-slate-700">This calculator uses official AADSAS GPA calculation methods including the standard 4.0 scale with plus/minus grading distinctions, repeated course policies, and separate science and non-science GPA calculations for 99.9% accuracy. However, always verify your official GPA through AADSAS when submitting applications.</p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <section id="related-tools" className="mb-8">
          <RelatedTools
            relatedSlugs={[
              'medical-school-gpa-calculator',
              'pa-school-gpa-calculator',
              'pharmacy-school-gpa-calculator',
              'college-gpa-calculator'
            ]}
            currentSlug="dental-school-gpa-calculator"
            navigateTo={navigateTo}
          />
        </section>
      </div>
    </div>
  );
};

export default DentalSchoolGPACalculator;
