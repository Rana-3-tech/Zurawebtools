import React, { useState, useEffect, useMemo } from 'react';

type Course = {
  name: string;
  grade: string;
  credits: number;
  isHonors: boolean;
};

const ISACGPACalculator: React.FC = () => {
  // State Management
  const [courses, setCourses] = useState<Course[]>([
    { name: '', grade: 'A', credits: 0, isHonors: false }
  ]);

  const [gpa, setGpa] = useState<number>(0);
  const [isWeighted, setIsWeighted] = useState<boolean>(false);

  // Grade Points Configuration
  const gradePoints: { [key: string]: number } = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };

  const weightedGradePoints: { [key: string]: number } = {
    'A': 5.0, 'A-': 4.7, 'B+': 4.3, 'B': 4.0, 'B-': 3.7,
    'C+': 3.3, 'C': 3.0, 'C-': 2.7, 'D+': 2.3, 'D': 2.0, 'F': 0.0,
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
    "name": "ISAC GPA Calculator",
    "description": "Free GPA calculator for students to calculate grade point average with weighted and unweighted options. Perfect for high school and college academic planning.",
    "url": "https://zurawebtools.com/tools/isac-gpa-calculator",
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
    "features": [
      "weighted GPA calculator",
      "unweighted GPA calculator",
      "cumulative GPA calculator",
      "semester GPA calculation",
      "grade point conversion",
      "credit hour weighted GPA",
      "academic performance tracker"
    ],
    "keywords": "ISAC GPA Calculator, GPA calculator, calculate GPA, semester GPA calculator, cumulative GPA calculator, weighted vs unweighted GPA, how to calculate GPA, GPA improvement calculator, high school GPA calculator, college GPA calculator, ISAC GPA tool",
    "mentions": [
       {
         "@type": "SoftwareApplication",
         "@id": "https://zurawebtools.com/tools/berkeley-gpa-calculator",
         "name": "UC Berkeley GPA Calculator",
         "url": "https://zurawebtools.com/tools/berkeley-gpa-calculator"
       },
       {
         "@type": "SoftwareApplication",
         "@id": "https://zurawebtools.com/tools/sat-score-calculator",
         "name": "SAT Score Calculator",
         "url": "https://zurawebtools.com/tools/sat-score-calculator"
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
        "name": "ISAC GPA Calculator",
        "item": "https://zurawebtools.com/tools/isac-gpa-calculator"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
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
    document.title = "ISAC GPA Calculator - Free Academic Grade Point Average Calculator";
    
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

    setMetaTag('description', 'Free GPA calculator for students to calculate grade point average with weighted and unweighted options. Perfect for high school and college academic planning.');
    setMetaTag('keywords', 'ISAC GPA Calculator, GPA calculator, how to calculate GPA, semester GPA calculator, cumulative GPA calculator, weighted GPA calculator, unweighted GPA calculator, GPA step by step, credit hour GPA calculator, college GPA calculator, high school GPA calculator, GPA forecasting tool, GPA conversion calculator, calculate GPA with honors, ISAC GPA tool');
    setMetaTag('og:title', 'ISAC GPA Calculator - Free Academic Grade Point Average Calculator', true);
    setMetaTag('og:description', 'Free GPA calculator for students to calculate grade point average with weighted and unweighted options. Perfect for high school and college academic planning.', true);
    setMetaTag('og:image', 'https://zurawebtools.com/images/gpa-calculator-og.png', true);
    setMetaTag('og:url', 'https://zurawebtools.com/tools/isac-gpa-calculator', true);
    setMetaTag('og:type', 'website', true);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/tools/isac-gpa-calculator');

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
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-white text-sm font-medium">Academic Excellence Tool</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              ISAC GPA Calculator
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6">
              Calculate your Grade Point Average instantly with our intelligent academic calculator. Designed for high school and college students who need accurate GPA tracking for academic planning and college admissions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                🎓 Academic Performance
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                📊 Instant Calculations
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                🎯 College Ready
              </div>
            </div>
          </div>
        </div>

        {/* ISAC GPA Calculator Summary */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            ISAC GPA Calculator Summary
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            The ISAC GPA Calculator helps high school and college students calculate semester GPA, cumulative GPA, weighted GPA, and unweighted GPA with accurate credit-hour weighting. It's designed for academic planning, scholarship eligibility, admissions preparation, and GPA forecasting.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Social Share Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate your GPA instantly with ISAC GPA Calculator! 🎓')}`, '_blank')}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/tools/isac-gpa-calculator')}`, '_blank')}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Share
            </button>
            <button
              onClick={() => navigator.clipboard.writeText('https://zurawebtools.com/tools/isac-gpa-calculator')}
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
                    <span className="text-gray-700 font-medium">Weighted GPA (5.0 scale)</span>
                  </label>
                </div>
              </div>

              {/* Course Input Section */}
              <div className="space-y-4 mb-6">
                {courses.map((course, index) => (
                  <div key={index} className="flex gap-4 items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Course Name"
                        value={course.name}
                        onChange={(e) => updateCourse(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
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
                        onChange={(e) => updateCourse(index, 'credits', Number(e.target.value))}
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
              <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white p-8 rounded-3xl shadow-xl">
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

          {/* Quick Examples */}
          <div className="mb-12">
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
          <div className="mb-12">
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
          <div className="mb-12">
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
          <div className="mb-12">
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
          <div className="mb-12">
            <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full mb-6">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">About Our Tool</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Understanding ISAC GPA Calculations for Academic Success</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Master the fundamentals of grade point average calculations and take control of your academic journey</p>
              </div>

              <div className="max-w-4xl mx-auto space-y-8">
                <div className="max-w-4xl mx-auto mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    The ISAC GPA Calculator helps high school and college students calculate semester GPA, cumulative GPA, weighted GPA, and unweighted GPA with accurate credit-hour weighting. It's designed for academic planning, scholarship eligibility, admissions preparation, and GPA forecasting. For UC-specific grade policies, see our UC Berkeley GPA Calculator.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">What Is the ISAC GPA Calculator?</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">The ISAC GPA Calculator is a precision-grade academic tool that calculates semester GPA, cumulative GPA, weighted GPA, and unweighted GPA using the standard 4.0 scale. It converts letter grades into grade points, applies credit-hour weighting, and generates accurate results for students who need reliable GPA evaluation for scholarships, admissions, and academic planning. If you need UC-specific calculations like A+ caps and honors weighting rules, check out our <a href="/tools/berkeley-gpa-calculator" className="text-blue-600 hover:text-blue-800 font-semibold underline">UC Berkeley GPA Calculator</a>.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How GPA Works and Why It Matters</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">GPA (Grade Point Average) is calculated by converting letter grades into numerical grade points (A=4.0, B=3.0, etc.) and multiplying them by each course's credit hours. This weighted calculation produces a standardized score that colleges, scholarship committees, and employers use to evaluate academic readiness. Understanding your GPA is essential for improving grades, forecasting academic outcomes, and meeting eligibility requirements for competitive programs.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-purple-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How the ISAC GPA Calculator Computes GPA</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">The ISAC GPA Calculator uses an academically accurate, multi-step GPA calculation method designed for high school and college students:</p>
                  <ul className="text-gray-600 text-lg leading-relaxed list-disc list-inside mb-4">
                    <li>converts letter grades to numerical grade points</li>
                    <li>multiplies grade points by course credit hours</li>
                    <li>calculates semester GPA and cumulative GPA</li>
                    <li>supports weighted GPA for Honors/AP/Advanced courses</li>
                    <li>includes unweighted GPA on the 4.0 scale</li>
                    <li>offers future GPA forecasting for "what-if" scenarios</li>
                    <li>provides credit-hour impact analysis for academic planning</li>
                  </ul>
                  <p className="text-gray-600 text-lg leading-relaxed">This makes it far more precise than generic GPA tools that ignore grading scale differences or credit-weight effects.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-orange-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Why GPA Matters for Academic Success</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Students rely on GPA for honors program eligibility, scholarships, admissions requirements, graduate school competitiveness, academic standing, and early-career opportunities. Accurate GPA calculation helps students stay on track and evaluate their progress realistically.</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">How Students Use the ISAC GPA Calculator</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">Students use the ISAC tool to track semester performance, calculate cumulative GPA, forecast future GPA, estimate grade impact, and plan strategically for academic goals. For standardized test preparation alongside GPA insights, try our <a href="/tools/sat-score-calculator" className="text-blue-600 hover:text-blue-800 font-semibold underline">SAT Score Calculator</a>.</p>
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
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">GPA Calculator FAQs</h2>
            <div className="max-w-4xl mx-auto space-y-6">
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
                <a href="/tools/sat-score-calculator" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium block text-center">
                  Use SAT Calculator
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Percentage Change Calculator</h3>
                <p className="text-gray-600 mb-4">Calculate percentage increases or decreases for academic grade analysis.</p>
                <a href="/tools/percentage-change-calculator" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-medium block text-center">
                  Use Percentage Calculator
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Word Counter Tool</h3>
                <p className="text-gray-600 mb-4">Count words, characters, and reading time for essays and academic papers.</p>
                <a href="/tools/word-counter" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors font-medium block text-center">
                  Use Word Counter
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">© 2025 ZuraWebTools — All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ISACGPACalculator;
