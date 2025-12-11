import React, { useState, useEffect, useMemo } from 'react';
import TableOfContents, { TOCSection } from '../TableOfContents';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

type Course = {
  name: string;
  grade: string;
  credits: number;
  isHonors: boolean;
};

interface LSACGPAProps {
  navigateTo: (page: Page) => void;
}

const LSACGPA: React.FC<LSACGPAProps> = ({ navigateTo }) => {
  // State Management with localStorage persistence
  const [courses, setCourses] = useState<Course[]>(() => {
    // Load saved courses from localStorage on initial mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lsac-gpa-courses');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved courses:', e);
        }
      }
    }
    return [{ name: '', grade: 'A', credits: 0, isHonors: false }];
  });

  const [gpa, setGpa] = useState<number>(0);
  const [isWeighted, setIsWeighted] = useState<boolean>(() => {
    // Load weighted setting from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lsac-gpa-weighted');
      return saved === 'true';
    }
    return false;
  });

  // TOC sections configuration
  const tocSections: TOCSection[] = [
    {
      id: 'examples',
      emoji: '📝',
      title: 'Examples',
      subtitle: 'Sample calculations',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      hoverBorder: 'border-indigo-400',
      hoverText: 'text-indigo-600'
    },
    {
      id: 'benefits',
      emoji: '⭐',
      title: 'Benefits',
      subtitle: 'Why use this',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-600'
    },
    {
      id: 'how-to-use',
      emoji: '📖',
      title: 'How to Use',
      subtitle: 'Step-by-step',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      hoverBorder: 'border-green-400',
      hoverText: 'text-green-600'
    },
    {
      id: 'use-cases',
      emoji: '💡',
      title: 'Use Cases',
      subtitle: 'Who uses this',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-orange-400',
      hoverText: 'text-orange-600'
    },
    {
      id: 'about',
      emoji: 'ℹ️',
      title: 'About',
      subtitle: 'Understanding GPA',
      gradientFrom: 'from-cyan-50',
      gradientTo: 'to-blue-50',
      hoverBorder: 'border-cyan-400',
      hoverText: 'text-cyan-600'
    },
    {
      id: 'faq',
      emoji: '❓',
      title: 'FAQs',
      subtitle: 'Common questions',
      gradientFrom: 'from-violet-50',
      gradientTo: 'to-purple-50',
      hoverBorder: 'border-violet-400',
      hoverText: 'text-violet-600'
    }
  ];

  // LSAC CAS Official Grade Points Configuration
  const gradePoints: { [key: string]: number } = {
    'A+': 4.33, 'A': 4.0, 'A-': 3.67, 'B+': 3.33, 'B': 3.0, 'B-': 2.67,
    'C+': 2.33, 'C': 2.0, 'C-': 1.67, 'D+': 1.33, 'D': 1.0, 'D-': 0.67, 'F': 0.0,
  };

  const weightedGradePoints: { [key: string]: number } = {
    'A+': 5.33, 'A': 5.0, 'A-': 4.67, 'B+': 4.33, 'B': 4.0, 'B-': 3.67,
    'C+': 3.33, 'C': 3.0, 'C-': 2.67, 'D+': 2.33, 'D': 2.0, 'D-': 1.67, 'F': 0.0,
  };

  // GPA Calculation Logic
  const computedGPA = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(({ grade, credits, isHonors }) => {
      if (credits > 0) {
        const scale = isWeighted && isHonors ? weightedGradePoints : gradePoints;
        const points = scale[grade] || 0;
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });

    return totalCredits ? totalPoints / totalCredits : 0;
  }, [courses, isWeighted]);

  useEffect(() => {
    setGpa(computedGPA);
  }, [computedGPA]);

  // Auto-save courses to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lsac-gpa-courses', JSON.stringify(courses));
    }
  }, [courses]);

  // Auto-save weighted setting to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lsac-gpa-weighted', String(isWeighted));
    }
  }, [isWeighted]);

  // Common course names for LSAC undergraduate transcripts
  const commonCourses = [
    'English Composition',
    'Calculus I',
    'Calculus II',
    'Statistics',
    'General Chemistry',
    'Organic Chemistry',
    'General Biology',
    'Physics I',
    'Physics II',
    'Microeconomics',
    'Macroeconomics',
    'American History',
    'World History',
    'Psychology',
    'Philosophy',
    'Political Science',
    'Sociology',
    'Public Speaking',
    'Business Law',
    'Constitutional Law',
    'Spanish I',
    'Spanish II',
    'French I',
    'Computer Science',
    'Art History',
    'Music Theory'
  ];

  // Course Management Functions
  const addCourse = () => {
    setCourses([...courses, { name: '', grade: 'A', credits: 0, isHonors: false }]);
  };

  const updateCourse = (index: number, field: keyof Course, value: string | number | boolean) => {
    const updatedCourses = courses.map((course, i) =>
      i === index ? { ...course, [field]: value } : course
    );
    setCourses(updatedCourses);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  // SEO Schemas
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LSAC CAS GPA Calculator",
    "description": "Official LSAC CAS GPA Calculator using Law School Admission Council grade scale. Calculate your law school application GPA with A+ (4.33) conversion for accurate LSAC credential assembly service GPA.",
    "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator",
    "applicationCategory": "EducationalApplication",
    "applicationSubCategory": "LSAC GPA Calculator",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "ZuraWebTools"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ZuraWebTools",
      "url": "https://zurawebtools.com"
    },
    "features": [
      "LSAC CAS GPA calculator",
      "Law school GPA calculator",
      "A+ grade 4.33 conversion",
      "LSAC official grade scale",
      "Credential Assembly Service GPA",
      "Law school application GPA",
      "LSAT GPA calculator"
    ],
    "keywords": "LSAC GPA Calculator, CAS GPA calculator, Law School GPA, LSAC grade conversion, A+ 4.33 GPA, law school admission GPA, credential assembly service GPA, LSAT GPA calculator, law school application GPA, LSAC official scale, how to calculate LSAC GPA",
    "mentions": [
       {
         "@type": "SoftwareApplication",
         "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator",
         "name": "UC Berkeley GPA Calculator",
         "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator"
       },
       {
         "@type": "SoftwareApplication",
         "@id": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator",
         "name": "SAT Score Calculator",
         "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/sat-score-calculator"
       }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zurawebtools.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://zurawebtools.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Education & Exam Tools",
        "item": "https://zurawebtools.com/education-exam-tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "LSAC CAS GPA Calculator",
        "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is LSAC CAS GPA and why is it different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LSAC CAS (Credential Assembly Service) GPA is the official GPA calculated by the Law School Admission Council for all law school applications. It differs from college GPA because LSAC uses a unique scale that awards A+ grades 4.33 points and includes D- (0.67) grades. LSAC recalculates your entire undergraduate transcript using this standardized scale."
        }
      },
      {
        "@type": "Question",
        "name": "Why does LSAC use 4.33 for A+ grades?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LSAC awards 4.33 grade points for A+ to recognize exceptional academic performance and create more differentiation at the top of the grading scale. This official LSAC scale rewards students who earned A+ grades by giving them credit above the standard 4.0 scale, which can significantly boost their CAS GPA."
        }
      },
      {
        "@type": "Question",
        "name": "Do all law schools only use LSAC CAS GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all ABA-approved law schools in the United States require applicants to submit transcripts through LSAC's Credential Assembly Service. Law schools use your LSAC CAS GPA (not your college GPA) for admissions decisions, scholarship awards, and statistical reporting."
        }
      },
      {
        "@type": "Question",
        "name": "How is LSAC GPA calculated differently from college GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LSAC recalculates your GPA by converting all letter grades to the official LSAC scale (A+=4.33, A=4.00, A-=3.67), multiplying each grade by credit hours and dividing by total credits. LSAC includes A+ at 4.33, uses precise decimals, excludes graduate coursework, and counts all undergraduate courses including repeated classes."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between weighted and unweighted GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Weighted GPA gives extra points for honors, AP, or IB courses (typically 5.0 scale), while unweighted GPA uses the standard 4.0 scale. Weighted GPA better reflects course difficulty."
        }
      },
      {
        "@type": "Question",
        "name": "How do colleges view GPA in admissions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Colleges consider GPA as a key academic metric alongside test scores and extracurriculars. A strong GPA demonstrates consistent academic performance and study skills."
        }
      },
      {
        "@type": "Question",
        "name": "Can I improve my GPA after graduation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once graduated, your GPA is final. However, you can highlight improvements in graduate school applications or explain circumstances in personal statements."
        }
      },
      {
        "@type": "Question",
        "name": "What GPA do I need for scholarships?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Scholarship requirements vary, but many require 3.0+ GPA. Academic scholarships often need 3.5-4.0. Check specific scholarship criteria for exact requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I calculate my GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calculate after each semester to track progress. Regular monitoring helps identify areas for improvement and ensures you're meeting academic goals."
        }
      },
      {
        "@type": "Question",
        "name": "Does GPA include pass/fail courses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pass/fail courses typically don't affect GPA unless they have grade points assigned. Some institutions exclude them from GPA calculations entirely."
        }
      },
      {
        "@type": "Question",
        "name": "What if my school uses a different grading scale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculator supports multiple scales. Convert your grades to the 4.0 system or use percentage-based calculations for accurate GPA determination."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate GPA step by step?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate GPA step by step, convert each course grade into grade points, multiply by credit hours, add all grade points, and divide by the total credits."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between semester GPA and cumulative GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Semester GPA is calculated from one term's grades only, while cumulative GPA includes all completed semesters for an overall academic average."
        }
      }
    ]
  };

  // SEO Setup
  useEffect(() => {
    document.title = "LSAC CAS GPA Calculator - Official Law School GPA with A+ (4.33) | ZuraWebTools";
    
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('description', 'Official LSAC CAS GPA Calculator for law school applications. Uses authentic LSAC grade scale with A+ (4.33) conversion. Calculate your credential assembly service GPA accurately for law school admissions.');
    setMetaTag('keywords', 'LSAC GPA Calculator, CAS GPA calculator, Law School GPA, LSAC grade conversion, A+ 4.33 GPA, law school admission GPA, credential assembly service GPA, LSAT GPA calculator, law school application GPA, LSAC official scale, how to calculate LSAC GPA, law school CAS GPA, LSAC GPA conversion chart');
    setMetaTag('og:title', 'LSAC CAS GPA Calculator - Official Law School GPA Calculator | ZuraWebTools', true);
    setMetaTag('og:description', 'Free LSAC CAS GPA calculator using official Law School Admission Council grade scale. Calculate your law school application GPA with A+ (4.33) conversion for accurate credential assembly service GPA.', true);
    setMetaTag('og:image', 'https://zurawebtools.com/images/gpa-calculator-og.png', true);
    setMetaTag('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator', true);
    setMetaTag('og:type', 'website', true);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator');

    const schemas = [softwareSchema, breadcrumbSchema, faqSchema];
    schemas.forEach((schema, index) => {
      let script = document.querySelector(`script[type="application/ld+json"]:nth-of-type(${index + 1})`) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    });
  }, [softwareSchema, breadcrumbSchema, faqSchema]);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* SEO Setup */}

        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 bg-opacity-20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 mb-6 shadow-xl border-2 border-yellow-200">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-gray-800 text-sm md:text-base font-bold">Academic Excellence Tool</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              LSAC CAS GPA Calculator
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6">
              Official LSAC Credential Assembly Service (CAS) GPA Calculator using Law School Admission Council grade scale with A+ (4.33) conversion for accurate law school application GPA.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-sm">
              <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-xl border-2 border-blue-200">
                <span className="text-xl">🎓</span>
                <span className="font-bold text-gray-800 text-sm md:text-base">Law School Application</span>
              </div>
              <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-xl border-2 border-purple-200">
                <span className="text-xl">📊</span>
                <span className="font-bold text-gray-800 text-sm md:text-base">Official LSAC Scale</span>
              </div>
              <div className="bg-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-xl border-2 border-blue-200">
                <span className="text-xl">⚖️</span>
                <span className="font-bold text-gray-800 text-sm md:text-base">A+ Support (4.33)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Social Share Buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate your law school GPA with LSAC CAS GPA Calculator! Perfect for law school applications 🎓⚖️')}`, '_blank')}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator')}`, '_blank')}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => navigator.clipboard.writeText('https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator')}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm md:text-base"
              aria-label="Copy link to clipboard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </button>
          </div>

          {/* Main GPA Calculator Interface */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8 mb-12 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">GPA Calculator</h2>
              </div>

              {/* GPA Type Toggle */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gpaType"
                      checked={!isWeighted}
                      onChange={() => setIsWeighted(false)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium text-sm md:text-base">Unweighted GPA (4.0 scale)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gpaType"
                      checked={isWeighted}
                      onChange={() => setIsWeighted(true)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium text-sm md:text-base">Weighted GPA (5.0 scale)</span>
                  </label>
                </div>
              </div>

              {/* Course Input Section */}
              <div className="space-y-4 mb-6">
                {courses.map((course, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1 md:hidden">Course Name</label>
                      <input
                        type="text"
                        list={`course-list-${index}`}
                        placeholder="Course Name (type or select)"
                        value={course.name}
                        onChange={(e) => updateCourse(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                        aria-label="Course name"
                      />
                      <datalist id={`course-list-${index}`}>
                        {commonCourses.map((courseName) => (
                          <option key={courseName} value={courseName} />
                        ))}
                      </datalist>
                    </div>
                    <div className="w-full md:w-32">
                      <label className="block text-xs font-medium text-gray-600 mb-1 md:hidden">Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                        aria-label="Grade"
                      >
                        {Object.entries(gradePoints).map(([grade, value]) => (
                          <option key={grade} value={grade}>
                            {grade} ({value})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full md:w-24">
                      <label className="block text-xs font-medium text-gray-600 mb-1 md:hidden">Credits</label>
                      <input
                        type="number"
                        placeholder="Credits"
                        value={course.credits === 0 ? '' : course.credits}
                        onChange={(e) => {
                          const value = e.target.value;
                          const parsed = value === '' ? 0 : parseFloat(value);
                          updateCourse(index, 'credits', isNaN(parsed) ? 0 : Math.max(0, parsed));
                        }}
                        min="0"
                        max="10"
                        step="1"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium"
                        aria-label="Credit hours"
                      />
                    </div>
                    {isWeighted && (
                      <div className="w-full md:w-auto">
                        <label className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={course.isHonors}
                            onChange={(e) => updateCourse(index, 'isHonors', e.target.checked)}
                            className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                            aria-label="Mark as Honors or AP course"
                          />
                          <span>Honors/AP</span>
                        </label>
                      </div>
                    )}
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(index)}
                        className="p-2 md:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-center md:self-auto"
                        aria-label="Remove course"
                      >
                        <svg className="w-6 h-6 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Course Button */}
              <div className="mb-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={addCourse}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm md:text-base"
                  aria-label="Add new course"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Course
                </button>
                {courses.length > 1 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all courses and start fresh?')) {
                        setCourses([{ name: '', grade: 'A', credits: 0, isHonors: false }]);
                        localStorage.removeItem('lsac-gpa-courses');
                      }
                    }}
                    className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm md:text-base"
                    aria-label="Clear all courses"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear All
                  </button>
                )}
              </div>

              {/* GPA Result */}
              <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-xs font-medium">Your GPA</span>
                  </div>
                  <p className="text-5xl font-bold mb-2">{gpa.toFixed(2)}</p>
                  <p className="text-emerald-100 text-sm">
                    {isWeighted ? 'Weighted GPA (5.0 scale, Honors/AP adjusted)' : 'Unweighted GPA (4.0 scale)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <TableOfContents sections={tocSections} />

          {/* Quick Examples */}
          <div id="examples" className="mb-12 scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick GPA Examples</h2>
              <p className="text-gray-600 text-lg">See how the calculator works with these common scenarios</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">High School Freshman</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>English (A):</span>
                    <span>4.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Math (B+):</span>
                    <span>3.3</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">GPA:</span>
                    <span className="font-bold text-blue-600">3.65</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">College Sophomore</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Calculus (B):</span>
                    <span>3.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Physics (A-):</span>
                    <span>3.7</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">GPA:</span>
                    <span className="font-bold text-green-600">3.35</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Graduate Student</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Research Methods (A):</span>
                    <span>4.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thesis (A+):</span>
                    <span>4.0</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">GPA:</span>
                    <span className="font-bold text-purple-600">4.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div id="benefits" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Use Our GPA Calculator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Instant Academic Insights</h3>
                <p className="text-blue-100">Get immediate feedback on your academic performance with precise GPA calculations that help you understand your standing and plan for improvement.</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Accurate Grade Tracking</h3>
                <p className="text-green-100">Track your semester and cumulative GPA with industry-standard grading scales, ensuring reliable results for college applications and academic planning.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">College Admission Ready</h3>
                <p className="text-purple-100">Prepare for college admissions with detailed GPA reports that showcase your academic achievements and help you meet scholarship requirements.</p>
              </div>
            </div>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How to Calculate Your GPA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter Course Information</h3>
                <p className="text-gray-600">Start by adding your courses one by one. Include the course name, grade received, and credit hours for each class. This forms the foundation of your GPA calculation.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Grading Scale</h3>
                <p className="text-gray-600">Choose between weighted or unweighted GPA scales. Weighted scales give extra points for honors or AP courses, while unweighted uses standard 4.0 scale.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Input Grade Points</h3>
                <p className="text-gray-600">Convert your letter grades to grade points: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. The calculator handles this automatically, but you can verify the conversions.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Calculate GPA</h3>
                <p className="text-gray-600">Click calculate to see your GPA instantly. The tool multiplies grade points by credit hours and divides by total credits to give you an accurate result.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">5</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Review and Adjust</h3>
                <p className="text-gray-600">Review your GPA results and see how different scenarios affect your score. Add or remove courses to see potential outcomes for future semesters.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">6</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Save and Track</h3>
                <p className="text-gray-600">Save your calculations for future reference. Track your academic progress over time and set goals for GPA improvement in upcoming terms.</p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div id="use-cases" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Who Uses Our GPA Calculator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">High School Students</h3>
                <p className="text-gray-600">Track semester and cumulative GPA to maintain academic standing and prepare for college applications.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">College Students</h3>
                <p className="text-gray-600">Monitor academic progress and calculate the GPA needed for scholarships, honors programs, and graduation requirements.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Academic Advisors</h3>
                <p className="text-gray-600">Help students understand their academic standing and create improvement plans for better GPA outcomes.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Parents & Guardians</h3>
                <p className="text-gray-600">Support children's academic goals by understanding GPA calculations and helping with study planning.</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="mb-12 scroll-mt-24">
            <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">About Our Tool</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Understanding LSAC CAS GPA for Law School Admissions</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Master the official LSAC grade conversion scale and calculate your law school application GPA accurately</p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                <div className="max-w-4xl mx-auto mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    The LSAC CAS GPA Calculator uses the official Law School Admission Council (LSAC) Credential Assembly Service grade conversion scale for law school applications. Unlike standard calculators, this tool recognizes A+ (4.33) and D- (0.67) grades according to LSAC's official conversion chart used by all ABA-approved law schools.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">What Is the LSAC CAS GPA Calculator?</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">The LSAC CAS GPA Calculator uses the official Law School Admission Council (LSAC) Credential Assembly Service grade conversion scale to calculate your law school application GPA. Unlike standard 4.0 scales, LSAC recognizes <strong>A+ grades as 4.33</strong> and includes D- (0.67) in its grading system. This calculator is essential for law school applicants who need to accurately predict their CAS GPA before applying through LSAC. All calculations follow the official LSAC grade conversion chart used by law schools nationwide for admissions decisions.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How GPA Works and Why It Matters</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">GPA (Grade Point Average) is calculated by converting letter grades into numerical grade points (A=4.0, B=3.0, etc.) and multiplying them by each course's credit hours. This weighted calculation produces a standardized score that colleges, scholarship committees, and employers use to evaluate academic readiness. Understanding your GPA is essential for improving grades, forecasting academic outcomes, and meeting eligibility requirements for competitive programs.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How the LSAC CAS GPA Calculator Works</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">The LSAC CAS GPA Calculator uses the official Law School Admission Council grade conversion method. Unlike standard calculators, LSAC's system:</p>
                  <ul className="text-gray-600 text-lg leading-relaxed list-disc list-inside mb-4">
                    <li>Recognizes A+ grades as 4.33 (most schools cap at 4.0)</li>
                    <li>Includes D- (0.67) in the official LSAC grade scale</li>
                    <li>Uses precise decimal values (3.67, 2.67) instead of rounded numbers</li>
                    <li>Converts all undergraduate coursework to a standardized scale</li>
                    <li>Calculates the official CAS GPA used by ABA-approved law schools</li>
                    <li>Provides accurate predictions for law school application GPA</li>
                    <li>Follows the same formula used in LSAC's official grade conversion</li>
                  </ul>
                  <p className="text-gray-600 text-lg leading-relaxed">This official LSAC scale ensures your calculated GPA matches exactly what law schools will see on your LSAC CAS report.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Why GPA Matters for Academic Success</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Students rely on GPA for honors program eligibility, scholarships, admissions requirements, graduate school competitiveness, academic standing, and early-career opportunities. Accurate GPA calculation helps students stay on track and evaluate their progress realistically.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How Law School Applicants Use LSAC CAS GPA Calculator</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Pre-law students use this LSAC CAS GPA Calculator to predict their official law school application GPA before submitting transcripts to LSAC. This helps with realistic law school selection, understanding admissions competitiveness, and identifying which grades have the most impact on CAS GPA. Since LSAC's A+ (4.33) bonus can significantly boost your GPA, this calculator helps you understand your true academic standing for law school admissions.</p>
                </div>

              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Learn More About GPA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="https://en.wikipedia.org/wiki/Grading_systems_by_country" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Grading Systems Worldwide</h3>
                <p className="text-gray-600 mb-4">Explore different grading systems used globally and understand international GPA equivalents.</p>
                <span className="text-blue-600 font-medium">Read on Wikipedia →</span>
              </a>
              <a href="https://moz.com/learn/seo" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Academic Planning Resources</h3>
                <p className="text-gray-600 mb-4">Comprehensive guides for academic success and career planning from educational experts.</p>
                <span className="text-blue-600 font-medium">Explore Resources →</span>
              </a>
              <a href="https://developers.google.com/search/docs" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Education Technology Trends</h3>
                <p className="text-gray-600 mb-4">Latest developments in educational technology and assessment tools.</p>
                <span className="text-blue-600 font-medium">View Trends →</span>
              </a>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Last updated: November 13, 2024</span>
            </div>
          </div>

          {/* FAQs */}
          <div id="faq" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">LSAC CAS GPA Calculator FAQs</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What is LSAC CAS GPA and why is it different?</h3>
                <p className="text-gray-600">LSAC CAS (Credential Assembly Service) GPA is the official GPA calculated by the Law School Admission Council for all law school applications. It differs from college GPA because LSAC uses a unique scale that awards A+ grades 4.33 points (instead of capping at 4.0) and includes D- (0.67) grades. LSAC recalculates your entire undergraduate transcript using this standardized scale, which is why your LSAC GPA may differ from your college GPA.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Why does LSAC use 4.33 for A+ grades?</h3>
                <p className="text-gray-600">LSAC awards 4.33 grade points for A+ to recognize exceptional academic performance and create more differentiation at the top of the grading scale. This official LSAC scale rewards students who earned A+ grades (typically 97-100%) by giving them credit above the standard 4.0 scale. This is particularly beneficial for law school applicants with multiple A+ grades, as it can significantly boost their CAS GPA above what their college transcript shows.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Do all law schools only use LSAC CAS GPA?</h3>
                <p className="text-gray-600">Yes, all ABA-approved law schools in the United States require applicants to submit transcripts through LSAC's Credential Assembly Service. Law schools use your LSAC CAS GPA (not your college GPA) for admissions decisions, scholarship awards, and statistical reporting. This standardized system ensures fair comparison across applicants from different undergraduate institutions with varying grading policies.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How is LSAC GPA calculated differently from college GPA?</h3>
                <p className="text-gray-600">LSAC recalculates your GPA by converting all letter grades to the official LSAC scale (A+=4.33, A=4.00, A-=3.67, B+=3.33, etc.), then multiplying each grade by credit hours and dividing by total credits. Key differences: LSAC includes A+ at 4.33, uses precise decimals (3.67 not 3.7), excludes graduate coursework, and counts all undergraduate courses including repeated classes. Your LSAC GPA appears on your LSAC CAS report sent to law schools.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What is the difference between weighted and unweighted GPA?</h3>
                <p className="text-gray-600">Weighted GPA gives extra points for honors, AP, or IB courses (typically 5.0 scale), while unweighted GPA uses the standard 4.0 scale. Weighted GPA better reflects course difficulty.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How do colleges view GPA in admissions?</h3>
                <p className="text-gray-600">Colleges consider GPA as a key academic metric alongside test scores and extracurriculars. A strong GPA demonstrates consistent academic performance and study skills.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Can I improve my GPA after graduation?</h3>
                <p className="text-gray-600">Once graduated, your GPA is final. However, you can highlight improvements in graduate school applications or explain circumstances in personal statements.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What GPA do I need for scholarships?</h3>
                <p className="text-gray-600">Scholarship requirements vary, but many require 3.0+ GPA. Academic scholarships often need 3.5-4.0. Check specific scholarship criteria for exact requirements.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How often should I calculate my GPA?</h3>
                <p className="text-gray-600">Calculate after each semester to track progress. Regular monitoring helps identify areas for improvement and ensures you're meeting academic goals.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Does GPA include pass/fail courses?</h3>
                <p className="text-gray-600">Pass/fail courses typically don't affect GPA unless they have grade points assigned. Some institutions exclude them from GPA calculations entirely.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What if my school uses a different grading scale?</h3>
                <p className="text-gray-600">Our calculator supports multiple scales. Convert your grades to the 4.0 system or use percentage-based calculations for accurate GPA determination.</p>
              </div>
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Related Academic Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">SAT Score Calculator</h3>
                <p className="text-gray-600 mb-4">Calculate your SAT scores and percentile rankings for college admissions preparation.</p>
                <a href="/education-and-exam-tools/test-score-tools/sat-score-calculator" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium block text-center">
                  Use SAT Calculator
                </a>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">© 2025 ZuraWebTools — All rights reserved.</p>
          </div>
        </div>

        <RelatedTools 
          currentSlug="lsac-gpa-calculator" 
          relatedSlugs={["berkeley-gpa-calculator", "college-gpa-calculator", "sat-score-calculator"]} 
          navigateTo={navigateTo} 
        />
      </div>
    </>
  );
};

export default LSACGPA;
