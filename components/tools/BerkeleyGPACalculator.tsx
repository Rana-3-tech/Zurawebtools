import React, { useState, useMemo, useEffect } from 'react';
import TableOfContents, { TOCSection } from '../TableOfContents';

type Course = {
  name: string;
  grade: string;
  credits: number;
  isHonors: boolean;
};

// Small components for repetitive sections
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string; gradient: string }> = ({ icon, title, description, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-xl text-center`}>
    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-blue-100">{description}</p>
  </div>
);

const HowToStep: React.FC<{ step: number; title: string; description: string }> = ({ step, title, description }) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">{step}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const UseCaseCard: React.FC<{ icon: React.ReactNode; title: string; description: string; iconColor: string }> = ({ icon, title, description, iconColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
    <div className={`w-16 h-16 ${iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BerkeleyGPACalculator: React.FC = () => {
  // State Management
  const [courses, setCourses] = useState<Course[]>([
    { name: '', grade: 'A', credits: 0, isHonors: false }
  ]);

  const [isWeighted, setIsWeighted] = useState<boolean>(false);

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
      subtitle: 'Understanding',
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

  // Common UC Berkeley Courses
  const commonCourses = [
    'Select Course',
    'Math 1A - Calculus',
    'Math 1B - Calculus',
    'Math 53 - Multivariable Calculus',
    'Math 54 - Linear Algebra',
    'CS 61A - Structure and Interpretation of Computer Programs',
    'CS 61B - Data Structures',
    'CS 61C - Machine Structures',
    'CS 70 - Discrete Mathematics',
    'EECS 16A - Designing Information Devices and Systems I',
    'EECS 16B - Designing Information Devices and Systems II',
    'Physics 7A - Physics for Scientists and Engineers',
    'Physics 7B - Physics for Scientists and Engineers',
    'Physics 7C - Physics for Scientists and Engineers',
    'Chem 1A - General Chemistry',
    'Chem 1B - General Chemistry',
    'Chem 3A - Chemical Structure and Reactivity',
    'Chem 3B - Chemical Structure and Reactivity',
    'Bio 1A - General Biology',
    'Bio 1B - General Biology',
    'Econ 1 - Introduction to Economics',
    'Econ 2 - Introduction to Economics',
    'Econ 100A - Intermediate Microeconomics',
    'Econ 100B - Intermediate Macroeconomics',
    'English 1A - Reading and Composition',
    'English 1B - Reading and Composition',
    'History 7A - Introduction to the History of the United States',
    'History 7B - Introduction to the History of the United States',
    'Pol Sci 1 - Introduction to American Politics',
    'Pol Sci 2 - Introduction to Comparative Politics',
    'Psych 1 - General Psychology',
    'Psych 2 - Research and Data Analysis in Psychology',
    'Stat 20 - Introduction to Probability and Statistics',
    'Stat 21 - Introduction to Probability and Statistics',
    'ME 40 - Introduction to Micro/Nano Engineering',
    'CE 93 - Engineering Data Analysis',
    'Other - Custom Course'
  ];

  // Grade Points Configuration (UC Berkeley scale: A+ capped at 4.0)
  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };

  const weightedGradePoints: { [key: string]: number } = {
    'A+': 5.0, 'A': 5.0, 'A-': 4.7, 'B+': 4.3, 'B': 4.0, 'B-': 3.7,
    'C+': 3.3, 'C': 3.0, 'C-': 2.7, 'D+': 2.3, 'D': 2.0, 'F': 0.0,
  };

  // GPA Calculation Logic (Berkeley-specific: honors weighting, P/NP excluded)
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
    "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator#software",
    "name": "UC Berkeley GPA Calculator",
    "description": "UC Berkeley GPA Calculator using the official Berkeley grading scale with A+ capped at 4.0 and honors/AP weighting. Calculate your semester and cumulative GPA accurately for academic planning and college admissions.",
    "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator",
    "softwareVersion": "1.0",
    "applicationCategory": "EducationalApplication",
    "applicationSubCategory": "GPA Calculator Tool",
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
    "keywords": "UC Berkeley GPA calculator, Berkeley GPA scale, calculate Berkeley GPA, A+ capped GPA calculator, UC GPA calculator, Berkeley weighted GPA, Berkeley unweighted GPA, honors GPA Berkeley, UC Berkeley grade calculator, UC Berkeley GPA tool",
    "mentions": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator",
        "name": "LSAC GPA Calculator",
        "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator"
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
        "position": 4,
        "name": "UC Berkeley GPA Calculator",
        "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does UC Berkeley calculate GPA with A+ grades exceeding 4.0?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, UC Berkeley caps A+ grades at 4.0 in GPA calculations, unlike some other institutions that may assign 4.3. This ensures consistency in the 4.0 scale used by the UC system."
        }
      },
      {
        "@type": "Question",
        "name": "How are Pass/No Pass courses treated in UC Berkeley GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pass/No Pass courses are typically excluded from GPA calculations at UC Berkeley. Only letter-graded courses (A through F) contribute to your grade point average."
        }
      },
      {
        "@type": "Question",
        "name": "How does repeating a course affect GPA at Berkeley?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UC Berkeley's grade forgiveness policy allows undergraduates to repeat courses and have the original grade excluded from GPA calculations, provided certain conditions are met. Check with the registrar for specific rules."
        }
      },
      {
        "@type": "Question",
        "name": "What GPA is required for Dean's Honors at UC Berkeley?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dean's Honors typically requires a semester GPA of 3.5 or higher for full-time students. This varies by college within Berkeley, so consult your academic advisor for exact requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Can transfer students use this calculator for UC Berkeley GPA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, transfer students can use this calculator to estimate their UC Berkeley GPA. However, official GPA calculations may differ based on how previous coursework is evaluated by Berkeley's registrar."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert quarter GPA to semester GPA for Berkeley?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UC Berkeley operates on a semester system, but if transferring from a quarter system, GPA conversion involves adjusting credit hours. Generally, 1 semester unit equals 1.5 quarter units, but consult the registrar for precise conversions."
        }
      },
      {
        "@type": "Question",
        "name": "Does graduate school recalculate GPA for UC Berkeley applicants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some graduate programs recalculate undergraduate GPA using only relevant coursework. For UC Berkeley applicants, this means focusing on major-related courses, though policies vary by department."
        }
      }
    ]
  };

  // SEO Setup
  useEffect(() => {
    document.title = "UC Berkeley GPA Calculator - Free Academic Grade Point Average Calculator";
    
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

    setMetaTag('description', 'UC Berkeley GPA Calculator using the official Berkeley grading scale with A+ capped at 4.0 and honors/AP weighting. Calculate your semester and cumulative GPA accurately for academic planning and admissions.');
    setMetaTag('keywords', 'UC Berkeley GPA calculator, Berkeley GPA scale, calculate Berkeley GPA, A+ capped GPA calculator, UC GPA calculator, Berkeley weighted GPA, Berkeley unweighted GPA, honors GPA Berkeley, UC Berkeley grade calculator, UC Berkeley GPA tool');
    setMetaTag('robots', 'index,follow');
    setMetaTag('og:title', 'UC Berkeley GPA Calculator - Free Academic Grade Point Average Calculator', true);
    setMetaTag('og:description', 'UC Berkeley GPA Calculator using the official Berkeley grading scale with A+ capped at 4.0 and honors/AP weighting. Calculate your semester and cumulative GPA accurately for academic planning and college admissions.', true);
    setMetaTag('og:image', 'https://zurawebtools.com/images/berkeley-gpa-calculator-og.png', true);
    setMetaTag('og:url', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'UC Berkeley GPA Calculator - Free Academic Grade Point Average Calculator');
    setMetaTag('twitter:description', 'UC Berkeley GPA Calculator using the official Berkeley grading scale with A+ capped at 4.0 and honors/AP weighting. Calculate your semester and cumulative GPA accurately for academic planning and college admissions.');
    setMetaTag('twitter:image', 'https://zurawebtools.com/images/berkeley-gpa-calculator-og.png');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator');

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
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 bg-opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 bg-opacity-20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-blue-900 text-sm font-medium">UC Berkeley Academic Excellence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              UC Berkeley GPA Calculator
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6">
              Calculate your Grade Point Average instantly using UC Berkeley's official grading policies. Designed for current students, prospective applicants, and academic advisors who need accurate GPA tracking for college admissions and academic planning.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-yellow-400 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                🎓 UC Berkeley Scale
              </div>
              <div className="bg-yellow-400 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                📊 Honors Weighting
              </div>
              <div className="bg-yellow-400 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                🎯 College Ready
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-12">
          {/* Social Share Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate your UC Berkeley GPA instantly! 🎓')}`, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')}`, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')}`, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('Check out this UC Berkeley GPA Calculator: https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')}`, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label="Share on WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => navigator.clipboard.writeText('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label="Copy link to clipboard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </button>
          </div>

          {/* Main GPA Calculator Interface */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100 to-blue-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-yellow-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">UC Berkeley GPA Calculator</h2>
              </div>

              {/* GPA Type Toggle */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gpaType"
                      checked={!isWeighted}
                      onChange={() => setIsWeighted(false)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">Unweighted GPA (4.0 scale)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gpaType"
                      checked={isWeighted}
                      onChange={() => setIsWeighted(true)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">Weighted GPA (Honors/AP adjusted)</span>
                  </label>
                </div>
              </div>

              {/* Course Input Section */}
              <div className="space-y-4 mb-6">
                {courses.map((course, index) => (
                  <div key={index} className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <select
                        value={course.name}
                        onChange={(e) => updateCourse(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      >
                        {commonCourses.map((courseOption, optionIndex) => (
                          <option key={optionIndex} value={courseOption === 'Select Course' ? '' : courseOption}>
                            {courseOption}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      >
                        {Object.entries(gradePoints).map(([grade, value]) => (
                          <option key={grade} value={grade}>
                            {grade} ({value})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-20">
                      <input
                        type="number"
                        placeholder="Credits"
                        value={course.credits}
                        onChange={(e) => updateCourse(index, 'credits', Math.max(0, Number(e.target.value)))}
                        min="0"
                        max="10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                    {isWeighted && (
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={course.isHonors}
                          onChange={(e) => updateCourse(index, 'isHonors', e.target.checked)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        Honors/AP
                      </label>
                    )}
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove course"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Course Button */}
              <div className="mb-6">
                <button
                  onClick={addCourse}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Course
                </button>
              </div>

              {/* GPA Result */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-yellow-500 text-white p-8 rounded-3xl shadow-xl">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="text-xs font-medium">Your UC Berkeley GPA</span>
                  </div>
                  <p className="text-5xl font-bold mb-2">{computedGPA.toFixed(2)}</p>
                  <p className="text-blue-100 text-sm">
                    {isWeighted ? 'Weighted GPA (Honors/AP adjusted)' : 'Unweighted GPA (4.0 scale)'}
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
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Quick GPA Examples for UC Berkeley Students</h2>
              <p className="text-gray-600 text-lg">See how the calculator works with these common Berkeley scenarios</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">STEM Major with Labs</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Chemistry 1A (A):</span>
                    <span>4.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Math 1A (B+):</span>
                    <span>3.3</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">GPA:</span>
                    <span className="font-bold text-blue-600">3.65</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Humanities with Honors</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>English 1 (A-):</span>
                    <span>3.7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>History H1A (A):</span>
                    <span>4.0</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">GPA:</span>
                    <span className="font-bold text-green-600">3.85</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Graduate-Level Prep</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Economics 1 (A):</span>
                    <span>4.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statistics 2 (A+):</span>
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
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Use Our UC Berkeley GPA Calculator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BenefitCard
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                title="Accurate UC-Aligned GPA Insights"
                description="Get precise GPA calculations following UC Berkeley's official grading policies, including A+ caps and honors weighting for reliable academic performance tracking."
                gradient="from-blue-600 to-blue-700"
              />
              <BenefitCard
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                title="Berkeley-Specific Grade Tracking"
                description="Track your semester and cumulative GPA with UC Berkeley's unique grading scale, ensuring accurate results for Dean's Honors, scholarships, and graduate school applications."
                gradient="from-yellow-500 to-yellow-600"
              />
              <BenefitCard
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                title="College Admission Ready"
                description="Prepare for UC Berkeley admissions and transfer applications with detailed GPA reports that showcase your academic achievements and help meet scholarship requirements."
                gradient="from-indigo-600 to-indigo-700"
              />
            </div>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How to Calculate Your UC Berkeley GPA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <HowToStep
                step={1}
                title="Enter Course Information"
                description="Start by adding your courses one by one. Include the course name, grade received, and credit hours for each class. This forms the foundation of your UC Berkeley GPA calculation."
              />
              <HowToStep
                step={2}
                title="Select Grading Scale"
                description="Choose between weighted or unweighted GPA scales. Weighted scales apply extra points for honors or AP courses, while unweighted uses UC Berkeley's standard 4.0 scale with A+ capped at 4.0."
              />
              <HowToStep
                step={3}
                title="Input Grade Points"
                description="Convert your letter grades to grade points using UC Berkeley's scale: A+=4.0, A=4.0, B=3.0, etc. The calculator handles this automatically, but you can verify the conversions."
              />
              <HowToStep
                step={4}
                title="Calculate GPA"
                description="Click calculate to see your GPA instantly. The tool multiplies grade points by credit hours and divides by total credits to give you an accurate UC Berkeley GPA result."
              />
              <HowToStep
                step={5}
                title="Review and Adjust"
                description="Review your GPA results and see how different scenarios affect your score. Add or remove courses to see potential outcomes for future semesters at Berkeley."
              />
              <HowToStep
                step={6}
                title="Save and Track"
                description="Save your calculations for future reference. Track your academic progress over time and set goals for GPA improvement in upcoming terms."
              />
            </div>
          </div>

          {/* Use Cases */}
          <div id="use-cases" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Who Uses Our UC Berkeley GPA Calculator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <UseCaseCard
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                title="UC Berkeley Students"
                description="Track semester and cumulative GPA to maintain academic standing and prepare for Dean's Honors or graduate school applications."
                iconColor="bg-blue-100 text-blue-600"
              />
              <UseCaseCard
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" /></svg>}
                title="Prospective Applicants"
                description="Estimate your UC Berkeley GPA for admissions planning and understand how your transcript will be evaluated by the registrar."
                iconColor="bg-yellow-100 text-yellow-600"
              />
              <UseCaseCard
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                title="Academic Advisors"
                description="Help students understand their UC Berkeley GPA standing and create improvement plans for better academic outcomes."
                iconColor="bg-indigo-100 text-indigo-600"
              />
              <UseCaseCard
                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                title="Transfer Students"
                description="Calculate how your previous coursework translates to UC Berkeley's GPA system for accurate academic planning."
                iconColor="bg-green-100 text-green-600"
              />
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="mb-12 scroll-mt-24">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              UC Berkeley GPA Calculator Summary
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              This UC Berkeley GPA Calculator accurately computes semester and cumulative GPA using Berkeley's official grading rules, including the A+ cap at 4.0 and honors/AP weighting. Designed for students, applicants, and advisors, it provides detailed academic insights and GPA forecasting to support admissions, scholarships, and performance tracking.
            </p>
            <div className="bg-gradient-to-br from-white via-blue-50 to-yellow-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">About Our UC Berkeley GPA Calculator</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">UC Berkeley GPA Calculator Overview</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">UC Berkeley uses a specific grading system that caps A+ grades at 4.0 and applies weighted adjustments for approved honors or AP courses. This calculator follows Berkeley's official GPA policies so students, advisors, and applicants can accurately measure academic performance and plan future semesters.</p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Why UC Berkeley's GPA System Is Different</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">GPA is the core metric Berkeley uses to evaluate academic standing. The university enforces a strict 4.0 cap on A+ grades — unlike institutions that treat A+ as 4.3 — and applies weighting only to designated honors/AP courses. This approach keeps grade evaluation consistent across departments. If you want to compare GPA with standardized test readiness, the SAT Score Calculator is also available for reference.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-yellow-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How UC Berkeley GPA Is Calculated</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">This calculator multiplies each course's grade points by its credit hours, sums the results, and divides by total attempted credits. Berkeley's scale uses:</p>
                  <ul className="text-gray-600 text-lg leading-relaxed list-disc list-inside mb-4">
                    <li>A+=4.0</li>
                    <li>A=4.0</li>
                    <li>A−=3.7</li>
                    <li>B+=3.3</li>
                    <li>B=3.0 …and continues downward.</li>
                  </ul>
                  <p className="text-gray-600 text-lg leading-relaxed">This calculator also functions as a GPA conversion tool for students coming from different grading systems. Weighted GPA applies higher values to approved honors/AP courses. Pass/No Pass classes do not factor into GPA calculations. For alternative calculation formats, see the LSAC GPA Calculator.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How Students Actually Use This</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Berkeley students rely on GPA calculations to:</p>
                  <ul className="text-gray-600 text-lg leading-relaxed list-disc list-inside mb-4">
                    <li>check eligibility for Dean's Honors (usually 3.5+),</li>
                    <li>track semester or cumulative performance,</li>
                    <li>verify scholarship requirements,</li>
                    <li>prepare graduate school applications,</li>
                    <li>evaluate academic risks early.</li>
                  </ul>
                  <p className="text-gray-600 text-lg leading-relaxed">A clean GPA overview also helps during internship and job searches, where early-career employers frequently request GPA on applications.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Why This Calculator Is Better Than Generic GPA Tools</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Most GPA tools ignore Berkeley-specific rules. This one doesn't. It supports:</p>
                  <ul className="text-gray-600 text-lg leading-relaxed list-disc list-inside mb-4">
                    <li>A+ cap at 4.0,</li>
                    <li>honors/AP weighting,</li>
                    <li>P/NP exclusions,</li>
                    <li>semester + cumulative scenarios,</li>
                    <li>real-time GPA forecasting for future planning.</li>
                  </ul>
                  <p className="text-gray-600 text-lg leading-relaxed">For broader academic analysis, you can also use the LSAC GPA Calculator or SAT Score Calculator to understand how test performance aligns with GPA trends. University of Virginia students can use our <a href="/education-and-exam-tools/gpa-tools/uva-gpa-calculator" className="text-blue-600 hover:underline font-medium">UVA GPA Calculator</a> for institution-specific calculations with Latin honors tracking.</p>
                </div>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Learn More About UC Berkeley GPA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="https://en.wikipedia.org/wiki/Grading_in_the_United_States" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Grading Systems in the U.S.</h3>
                <p className="text-gray-600 mb-4">Explore different grading systems used across U.S. institutions and understand GPA equivalents.</p>
                <span className="text-blue-600 font-medium">Read on Wikipedia →</span>
              </a>
              <a href="https://registrar.berkeley.edu/grading-system/" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">UC Berkeley Registrar — Grading Policy</h3>
                <p className="text-gray-600 mb-4">Official UC Berkeley grading policies and GPA calculation guidelines from the registrar.</p>
                <span className="text-blue-600 font-medium">View Policy →</span>
              </a>
              <a href="https://developers.google.com/search/docs" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Google Developers — Structured Data</h3>
                <p className="text-gray-600 mb-4">Learn about implementing structured data for better search engine visibility.</p>
                <span className="text-blue-600 font-medium">Explore Docs →</span>
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
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">UC Berkeley GPA Calculator FAQs</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <FAQItem
                question="Does UC Berkeley calculate GPA with A+ grades exceeding 4.0?"
                answer="Nope, UC Berkeley keeps A+ grades capped at 4.0 when calculating GPA. Unlike some other schools that might bump it up to 4.3, Berkeley maintains a consistent 4.0 scale across the UC system."
              />
              <FAQItem
                question="How are Pass/No Pass courses treated in UC Berkeley GPA?"
                answer="Generally speaking, Pass/No Pass courses don't count toward your GPA at UC Berkeley. Only those letter grades from A to F will factor into your grade point average."
              />
              <FAQItem
                question="How does repeating a course affect GPA at Berkeley?"
                answer="UC Berkeley has a grade forgiveness policy that lets undergrads repeat courses and exclude the original grade from GPA calculations, as long as certain conditions are met. It's always a good idea to check with the registrar for the exact rules."
              />
              <FAQItem
                question="What GPA is required for Dean's Honors at UC Berkeley?"
                answer="To earn Dean's Honors at UC Berkeley, you'll typically need a semester GPA of 3.5 or higher if you're a full-time student. Keep in mind that requirements can vary by college, so chat with your academic advisor for the specifics."
              />
              <FAQItem
                question="Can transfer students use this calculator for UC Berkeley GPA?"
                answer="Absolutely, transfer students can use this calculator to get a rough estimate of their UC Berkeley GPA. Just remember that official calculations might differ depending on how Berkeley's registrar evaluates your previous coursework."
              />
              <FAQItem
                question="How to convert quarter GPA to semester GPA for Berkeley?"
                answer="Since UC Berkeley runs on a semester system, converting from a quarter GPA involves tweaking the credit hours. Roughly, 1 semester unit equals 1.5 quarter units, but for precise conversions, it's best to consult the registrar."
              />
              <FAQItem
                question="Does graduate school recalculate GPA for UC Berkeley applicants?"
                answer="Some graduate programs do recalculate undergraduate GPA, focusing only on relevant coursework. For UC Berkeley applicants, this often means highlighting major-related courses, though it can vary by department."
              />
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Related Academic Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">SAT Score Calculator</h3>
                <p className="text-gray-600 mb-4">Digital SAT raw to scaled score converter for 2025-2026. Calculate your total SAT score (400-1600) with percentile estimates and ACT concordance.</p>
                <a href="/education-and-exam-tools/test-score-tools/sat-score-calculator" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium block text-center">
                  Use SAT Calculator
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">LSAC GPA Calculator</h3>
                <p className="text-gray-600 mb-4">Free GPA calculator for students to calculate grade point average with weighted and unweighted options. Perfect for high school and college academic planning.</p>
                <a href="/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-medium block text-center">
                  Use LSAC GPA Calculator
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center">
            <p className="text-gray-500 text-sm">© 2025 ZuraWebTools — All rights reserved.</p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default BerkeleyGPACalculator;
