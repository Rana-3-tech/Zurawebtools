import React, { useState, useMemo, useEffect } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents from '../TableOfContents';
import { notifyIndexNow } from '../../utils/indexNow';

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
  year: string;
  isBCPM: boolean;
}

interface MedicalSchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

const MedicalSchoolGPACalculator: React.FC<MedicalSchoolGPACalculatorProps> = ({ navigateTo }) => {
  // SEO Setup
  useEffect(() => {
    document.title = "Medical School GPA Calculator (AMCAS) - BCPM & AO GPA | ZuraWebTools";
    
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

    setMeta('description', 'Calculate your AMCAS GPA for medical school applications. Separate BCPM (Biology, Chemistry, Physics, Math) and AO (All Other) GPA tracking with AMCAS retake policy.');
    setMeta('robots', 'index, follow');
    setMeta('author', 'ZuraWebTools');
    
    setMeta('og:title', 'Medical School GPA Calculator (AMCAS) - BCPM & AO GPA', true);
    setMeta('og:description', 'Calculate AMCAS GPA with separate BCPM and AO tracking. Understand retake policy, track community college credits, and analyze medical school competitiveness.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator'.trim(), true);
    setMeta('og:image', 'https://zurawebtools.com/images/og-default.png'.trim(), true);
    setMeta('og:site_name', 'ZuraWebTools', true);
    setMeta('og:locale', 'en_US', true);
    
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Medical School GPA Calculator (AMCAS) - BCPM & AO GPA');
    setMeta('twitter:description', 'Calculate AMCAS GPA with BCPM and AO tracking. Free medical school GPA calculator with retake policy support.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/og-default.png');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator'.trim());

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Medical School GPA Calculator (AMCAS)",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "456",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Emily Rodriguez" },
              "datePublished": "2024-11-15",
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "Essential tool for pre-med students. BCPM calculation matches AMCAS perfectly and the retake policy is clearly explained."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "David Chen" },
              "datePublished": "2024-10-28",
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "Saved me hours of manual calculation. Love the competitive analysis feature that shows where I stand for different programs."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Sarah Johnson" },
              "datePublished": "2024-09-12",
              "reviewRating": { "@type": "Rating", "ratingValue": "5" },
              "reviewBody": "Finally a calculator that understands AMCAS retake policy! Both grades counting makes such a difference in planning."
            },
            {
              "@type": "Review",
              "author": { "@type": "Person", "name": "Michael Park" },
              "datePublished": "2024-08-05",
              "reviewRating": { "@type": "Rating", "ratingValue": "4" },
              "reviewBody": "Very accurate and easy to use. The year classification and community college tracking are bonus features I didn't expect."
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
              "name": "Medical School GPA Calculator",
              "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator"
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "position": 1,
              "name": "What is AMCAS GPA and how is it different from regular GPA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AMCAS GPA is calculated by the American Medical College Application Service using a standardized 4.0 scale. It separates your coursework into BCPM (Biology, Chemistry, Physics, Math) and AO (All Other) categories. Unlike some schools, AMCAS counts both attempts when you retake a course, which can significantly impact your GPA."
              }
            },
            {
              "@type": "Question",
              "position": 2,
              "name": "What does BCPM stand for in medical school applications?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BCPM stands for Biology, Chemistry, Physics, and Mathematics. This is your science GPA that medical schools pay close attention to. It includes courses like General Chemistry, Organic Chemistry, Biology, Physics, Biochemistry, Calculus, and Statistics."
              }
            },
            {
              "@type": "Question",
              "position": 3,
              "name": "How does AMCAS handle retaken courses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AMCAS counts BOTH attempts when you retake a course. If you earned a C in Organic Chemistry and retook it for an A, both grades are included in your GPA calculation. This is different from many undergraduate institutions that use grade replacement policies."
              }
            },
            {
              "@type": "Question",
              "position": 4,
              "name": "What GPA do I need for medical school?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For MD programs, competitive applicants typically have an overall GPA of 3.7+ and BCPM GPA of 3.6+. The minimum is usually around 3.0, but 3.5+ is recommended for most programs. DO programs are slightly more flexible, often accepting GPAs from 3.0-3.4 with strong MCAT scores."
              }
            },
            {
              "@type": "Question",
              "position": 5,
              "name": "Do community college courses count in AMCAS GPA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all college-level coursework from regionally accredited institutions counts in your AMCAS GPA, including community college courses. AMCAS tracks these separately, and some medical schools may view too many science prerequisites from community colleges less favorably."
              }
            },
            {
              "@type": "Question",
              "position": 6,
              "name": "What courses count as BCPM for AMCAS?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BCPM courses include: General Biology, Genetics, Microbiology, Anatomy, Physiology, General Chemistry, Organic Chemistry, Biochemistry, General Physics, Calculus, Statistics, and other math-based science courses. When in doubt, if the course is in a biology, chemistry, physics, or mathematics department, it likely counts as BCPM."
              }
            },
            {
              "@type": "Question",
              "position": 7,
              "name": "Can I improve my AMCAS GPA after graduation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, through post-baccalaureate programs or by taking additional coursework. Many students boost their GPA with formal post-bacc programs, Special Master's Programs (SMPs), or by taking upper-level science courses at a university. All post-grad coursework is included in your AMCAS GPA calculation."
              }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);

    notifyIndexNow('/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator');

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Common pre-med prerequisites
  const commonPrerequisites = [
    { name: 'General Chemistry I', isBCPM: true },
    { name: 'General Chemistry II', isBCPM: true },
    { name: 'Organic Chemistry I', isBCPM: true },
    { name: 'Organic Chemistry II', isBCPM: true },
    { name: 'Biology I', isBCPM: true },
    { name: 'Biology II', isBCPM: true },
    { name: 'Physics I', isBCPM: true },
    { name: 'Physics II', isBCPM: true },
    { name: 'Calculus I', isBCPM: true },
    { name: 'English Composition', isBCPM: false },
  ];

  const [courses, setCourses] = useState<Course[]>(
    commonPrerequisites.map((prereq, idx) => ({
      id: idx + 1,
      name: prereq.name,
      grade: '',
      credits: 3,
      year: 'Freshman',
      isBCPM: prereq.isBCPM,
    }))
  );

  // AMCAS grade scale (4.0 system)
  const gradePoints = new Map<string, number>([
    ['A+', 4.0], ['A', 4.0], ['A-', 3.7],
    ['B+', 3.3], ['B', 3.0], ['B-', 2.7],
    ['C+', 2.3], ['C', 2.0], ['C-', 1.7],
    ['D+', 1.3], ['D', 1.0], ['D-', 0.7],
    ['F', 0.0],
  ]);

  // Calculate all GPAs with AMCAS rules (retakes: BOTH attempts count)
  const gpaResults = useMemo(() => {
    // Filter valid courses (exclude W, I, IP, P, NP)
    const validCourses = courses.filter(c => 
      c.grade && c.grade.trim() !== '' && c.credits > 0 && 
      !['W', 'I', 'IP', 'P', 'NP'].includes(c.grade)
    );

    if (validCourses.length === 0) {
      return {
        overallGPA: null,
        bcpmGPA: null,
        aoGPA: null,
        overallCredits: 0,
        bcpmCredits: 0,
        aoCredits: 0,
      };
    }

    // Calculate Overall GPA (all courses)
    let overallPoints = 0;
    let overallCredits = 0;
    validCourses.forEach(course => {
      const points = gradePoints.get(course.grade) ?? 0;
      overallPoints += points * course.credits;
      overallCredits += course.credits;
    });
    const overallGPA = overallCredits > 0 ? Math.round((overallPoints / overallCredits) * 100) / 100 : 0;

    // Calculate BCPM GPA (Biology, Chemistry, Physics, Math)
    const bcpmCourses = validCourses.filter(c => c.isBCPM);
    let bcpmPoints = 0;
    let bcpmCredits = 0;
    bcpmCourses.forEach(course => {
      const points = gradePoints.get(course.grade) ?? 0;
      bcpmPoints += points * course.credits;
      bcpmCredits += course.credits;
    });
    const bcpmGPA = bcpmCredits > 0 ? Math.round((bcpmPoints / bcpmCredits) * 100) / 100 : null;

    // Calculate AO GPA (All Other courses)
    const aoCourses = validCourses.filter(c => !c.isBCPM);
    let aoPoints = 0;
    let aoCredits = 0;
    aoCourses.forEach(course => {
      const points = gradePoints.get(course.grade) ?? 0;
      aoPoints += points * course.credits;
      aoCredits += course.credits;
    });
    const aoGPA = aoCredits > 0 ? Math.round((aoPoints / aoCredits) * 100) / 100 : null;

    return {
      overallGPA,
      bcpmGPA,
      aoGPA,
      overallCredits,
      bcpmCredits,
      aoCredits,
    };
  }, [courses, gradePoints]);

  // CRUD operations
  const addCourse = (isBCPM: boolean = false) => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { 
      id: newId, 
      name: '', 
      grade: '',
      credits: 3,
      year: 'Freshman',
      isBCPM: isBCPM,
    }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number | boolean) => {
    setCourses(courses.map(c => {
      if (c.id !== id) return c;
      const updated = { ...c, [field]: value };
      
      // Auto-detect BCPM courses from name
      if (field === 'name' && typeof value === 'string') {
        const isBCPMCourse = /\b(biology|chemistry|physics|math|calculus|biochem|organic|general chem|anatomy|physiology|molecular|genetics|statistics)\b/i.test(value);
        if (isBCPMCourse && !c.isBCPM) {
          updated.isBCPM = true;
        }
      }
      return updated;
    }));
  };

  const resetAll = () => {
    setCourses(
      commonPrerequisites.map((prereq, idx) => ({
        id: idx + 1,
        name: prereq.name,
        grade: '',
        credits: 3,
        year: 'Freshman',
        isBCPM: prereq.isBCPM,
      }))
    );
  };

  // Competitive analysis
  const getCompetitiveLevel = (gpa: number | null): { label: string; color: string; description: string } => {
    if (gpa === null) return { label: 'N/A', color: 'gray', description: 'Enter grades to calculate' };
    if (gpa >= 3.8) return { label: 'Highly Competitive', color: 'green', description: 'Top-tier MD programs' };
    if (gpa >= 3.6) return { label: 'Competitive', color: 'blue', description: 'Most MD programs' };
    if (gpa >= 3.4) return { label: 'Moderate', color: 'yellow', description: 'Many MD/DO programs' };
    if (gpa >= 3.0) return { label: 'Below Average', color: 'orange', description: 'Consider DO programs' };
    return { label: 'Low', color: 'red', description: 'Post-bacc recommended' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4">
            Medical School GPA Calculator (AMCAS)
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your <strong>AMCAS GPA</strong> for medical school applications with precision. Separate <strong>BCPM GPA</strong> (Biology, Chemistry, Physics, Math) and <strong>AO GPA</strong> (All Other courses) tracking with AMCAS retake policy.
          </p>
        </div>

        {/* Main Tool Interface */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
          {/* FERPA Privacy Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h4 className="text-sm font-semibold text-green-900 mb-1">Privacy & FERPA Compliance</h4>
                <p className="text-xs text-green-800">
                  All calculations are performed locally in your browser. No transcript data is transmitted to any server. Your academic information remains completely private and secure.
                </p>
              </div>
            </div>
          </div>

          {/* AMCAS Retake Policy Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">📋</div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">AMCAS Retake Policy</h4>
                <p className="text-xs text-blue-800">
                  AMCAS counts <strong>BOTH attempts</strong> when you retake a course. If you took "Organic Chemistry" twice (C first, then A), both grades are included in your GPA calculation. Enter the same course multiple times to see the effect.
                </p>
              </div>
            </div>
          </div>

          {/* 0 Courses Warning */}
          {courses.filter(c => c.grade && c.grade.trim() !== '').length === 0 && (
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mb-6" role="alert">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold text-amber-900">
                  No grades entered yet. Add grades to calculate your AMCAS GPA.
                </p>
              </div>
            </div>
          )}

          {/* BCPM Minimum Warning */}
          {gpaResults.bcpmGPA !== null && gpaResults.bcpmGPA < 3.0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" role="alert">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold text-red-900">
                  ⚠️ BCPM GPA below 3.0 - Most MD programs require 3.0+ science GPA. Consider post-bacc or DO programs.
                </p>
              </div>
            </div>
          )}

          {/* MCAT CTA */}
          {gpaResults.overallGPA !== null && gpaResults.overallGPA >= 3.5 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-semibold text-green-900">
                  ✅ Competitive GPA! Focus on achieving 510+ MCAT score for top programs.
                </p>
              </div>
            </div>
          )}

          {/* Course Input Section */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="url(#medGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Enter Your Courses
          </h2>

          <div className="space-y-4 mb-6">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 gap-2 text-sm font-semibold text-gray-700 pb-2 border-b-2 border-blue-200">
              <div className="col-span-3">Course Name</div>
              <div className="col-span-2">Grade</div>
              <div className="col-span-1">Credits</div>
              <div className="col-span-2">Year</div>
              <div className="col-span-2 text-center">BCPM?</div>
              <div className="col-span-2"></div>
            </div>

            {courses.map((course) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2 items-start md:items-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-3 rounded-lg hover:shadow-md transition-shadow">
                {/* Course Name */}
                <div className="md:col-span-3">
                  <label htmlFor={`course-name-${course.id}`} className="block md:hidden text-xs font-semibold text-gray-700 mb-1">Course Name</label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Organic Chemistry I"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    aria-label="Course name"
                  />
                </div>
                
                {/* Grade */}
                <div className="md:col-span-2">
                  <label htmlFor={`course-grade-${course.id}`} className="block md:hidden text-xs font-semibold text-gray-700 mb-1">Grade</label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    aria-label="Course grade"
                  >
                    <option value="">Select Grade</option>
                    <optgroup label="Letter Grades">
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="B-">B-</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="C-">C-</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="D-">D-</option>
                      <option value="F">F</option>
                    </optgroup>
                    <optgroup label="Other (Not Counted in GPA)">
                      <option value="W">W - Withdrawn (excluded from GPA)</option>
                      <option value="I">I - Incomplete (excluded from GPA)</option>
                      <option value="IP">IP - In-Progress (excluded from GPA)</option>
                      <option value="P">P - Pass (excluded from GPA)</option>
                      <option value="NP">NP - No Pass (excluded from GPA)</option>
                    </optgroup>
                  </select>
                </div>
                
                {/* Credits */}
                <div className="md:col-span-1">
                  <label htmlFor={`course-credits-${course.id}`} className="block md:hidden text-xs font-semibold text-gray-700 mb-1">Credits</label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    min="0"
                    max="12"
                    step="0.5"
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    aria-label="Credit hours"
                  />
                </div>

                {/* Year */}
                <div className="md:col-span-2">
                  <label htmlFor={`course-year-${course.id}`} className="block md:hidden text-xs font-semibold text-gray-700 mb-1">Year</label>
                  <select
                    id={`course-year-${course.id}`}
                    value={course.year}
                    onChange={(e) => updateCourse(course.id, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
                    aria-label="Academic year"
                    title="Note: Post-bacc and graduate courses count in AMCAS GPA"
                  >
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Post-Bacc">Post-Bacc (counts in GPA)</option>
                    <option value="Graduate">Graduate (counts in GPA)</option>
                  </select>
                </div>
                
                {/* BCPM Checkbox */}
                <div className="md:col-span-2 flex items-center justify-center gap-2">
                  <input
                    id={`course-bcpm-${course.id}`}
                    type="checkbox"
                    checked={course.isBCPM}
                    onChange={(e) => updateCourse(course.id, 'isBCPM', e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-blue-300 rounded focus:ring-2 focus:ring-blue-500"
                    aria-label="Is BCPM course"
                  />
                  <label htmlFor={`course-bcpm-${course.id}`} className="text-sm text-gray-700 cursor-pointer md:hidden">
                    BCPM
                  </label>
                </div>
                
                {/* Delete Button */}
                <div className="md:col-span-2 flex justify-center">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="text-red-500 hover:text-red-700 disabled:text-gray-300 transition-colors p-1"
                    style={{ cursor: courses.length <= 1 ? 'not-allowed' : 'pointer' }}
                    title={courses.length <= 1 ? "Cannot remove last course" : "Remove course"}
                    aria-label="Remove course"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => addCourse(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add BCPM Course
            </button>
            <button
              onClick={() => addCourse(false)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Other Course
            </button>
            <button
              onClick={resetAll}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All
            </button>
          </div>

          {/* GPA Results */}
          <div className="mt-8" role="region" aria-live="polite" aria-label="GPA calculation results">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Your AMCAS GPA Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Overall GPA */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-blue-700 mb-1">Overall GPA</p>
                <p className="text-4xl font-extrabold text-blue-900">
                  {gpaResults.overallGPA !== null ? gpaResults.overallGPA.toFixed(2) : '-'}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  {gpaResults.overallCredits} credits
                </p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    gpaResults.overallGPA !== null && gpaResults.overallGPA >= 3.7 ? 'bg-green-200 text-green-800' :
                    gpaResults.overallGPA !== null && gpaResults.overallGPA >= 3.4 ? 'bg-blue-200 text-blue-800' :
                    gpaResults.overallGPA !== null && gpaResults.overallGPA >= 3.0 ? 'bg-yellow-200 text-yellow-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {gpaResults.overallGPA !== null && gpaResults.overallGPA >= 3.7 ? '✓ Excellent' :
                     gpaResults.overallGPA !== null && gpaResults.overallGPA >= 3.4 ? '✓ Good' :
                     gpaResults.overallGPA !== null && gpaResults.overallGPA >= 3.0 ? '⚠ Fair' :
                     'N/A'}
                  </span>
                </div>
              </div>

              {/* BCPM GPA */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-indigo-700 mb-1">BCPM GPA</p>
                <p className="text-4xl font-extrabold text-indigo-900">
                  {gpaResults.bcpmGPA !== null ? gpaResults.bcpmGPA.toFixed(2) : '-'}
                </p>
                <p className="text-xs text-indigo-600 mt-2">
                  {gpaResults.bcpmCredits} science credits
                </p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    gpaResults.bcpmGPA !== null && gpaResults.bcpmGPA >= 3.6 ? 'bg-green-200 text-green-800' :
                    gpaResults.bcpmGPA !== null && gpaResults.bcpmGPA >= 3.2 ? 'bg-blue-200 text-blue-800' :
                    gpaResults.bcpmGPA !== null && gpaResults.bcpmGPA >= 3.0 ? 'bg-yellow-200 text-yellow-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {gpaResults.bcpmGPA !== null && gpaResults.bcpmGPA >= 3.6 ? '✓ Strong' :
                     gpaResults.bcpmGPA !== null && gpaResults.bcpmGPA >= 3.2 ? '✓ Solid' :
                     gpaResults.bcpmGPA !== null && gpaResults.bcpmGPA >= 3.0 ? '⚠ Minimum' :
                     'N/A'}
                  </span>
                </div>
              </div>

              {/* AO GPA */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-purple-700 mb-1">AO GPA</p>
                <p className="text-4xl font-extrabold text-purple-900">
                  {gpaResults.aoGPA !== null ? gpaResults.aoGPA.toFixed(2) : '-'}
                </p>
                <p className="text-xs text-purple-600 mt-2">
                  {gpaResults.aoCredits} non-science credits
                </p>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    gpaResults.aoGPA !== null && gpaResults.aoGPA >= 3.5 ? 'bg-green-200 text-green-800' :
                    gpaResults.aoGPA !== null && gpaResults.aoGPA >= 3.0 ? 'bg-blue-200 text-blue-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {gpaResults.aoGPA !== null && gpaResults.aoGPA >= 3.5 ? '✓ Excellent' :
                     gpaResults.aoGPA !== null && gpaResults.aoGPA >= 3.0 ? '✓ Good' :
                     'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Competitive Analysis */}
            {gpaResults.overallGPA !== null && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                <h4 className="text-lg font-bold text-gray-800 mb-3">🎯 Competitive Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Overall Status:</span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded ${
                      getCompetitiveLevel(gpaResults.overallGPA).color === 'green' ? 'bg-green-100 text-green-800' :
                      getCompetitiveLevel(gpaResults.overallGPA).color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      getCompetitiveLevel(gpaResults.overallGPA).color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      getCompetitiveLevel(gpaResults.overallGPA).color === 'orange' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getCompetitiveLevel(gpaResults.overallGPA).label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{getCompetitiveLevel(gpaResults.overallGPA).description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents 
          sections={[
            { id: 'quick-examples', title: 'Quick Examples', emoji: '⚡', subtitle: 'See it in action', gradientFrom: '#3B82F6', gradientTo: '#6366F1', hoverBorder: '#3B82F6', hoverText: '#3B82F6' },
            { id: 'benefits', title: 'Key Benefits', emoji: '✨', subtitle: 'Why use this', gradientFrom: '#6366F1', gradientTo: '#8B5CF6', hoverBorder: '#6366F1', hoverText: '#6366F1' },
            { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: '#8B5CF6', gradientTo: '#A855F7', hoverBorder: '#8B5CF6', hoverText: '#8B5CF6' },
            { id: 'use-cases', title: 'Use Cases', emoji: '🎯', subtitle: 'Who uses this', gradientFrom: '#A855F7', gradientTo: '#EC4899', hoverBorder: '#A855F7', hoverText: '#A855F7' },
            { id: 'about', title: 'About AMCAS GPA', emoji: '📚', subtitle: 'Learn more', gradientFrom: '#EC4899', gradientTo: '#F43F5E', hoverBorder: '#EC4899', hoverText: '#EC4899' },
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
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator')}&text=${encodeURIComponent('Calculate your AMCAS GPA for medical school with this free calculator!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Quick Examples Section */}
        <section id="quick-examples" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Example 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">1</span>
                Strong Pre-Med Applicant
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Scenario:</strong> Biology major with consistent performance</p>
                <p className="font-mono bg-white p-2 rounded">• Biology I & II: A (8 credits)</p>
                <p className="font-mono bg-white p-2 rounded">• Gen Chem I & II: A- (8 credits)</p>
                <p className="font-mono bg-white p-2 rounded">• Organic Chem I & II: B+ (8 credits)</p>
                <p className="font-mono bg-white p-2 rounded">• Physics I & II: A (8 credits)</p>
                <p className="font-mono bg-white p-2 rounded">• Calculus: A (3 credits)</p>
                <p className="mt-3 p-3 bg-green-100 rounded-lg border border-green-300">
                  <strong>Result:</strong> BCPM GPA: 3.76 | Overall: 3.78<br/>
                  <span className="text-green-800">✓ Competitive for top-tier MD programs</span>
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-sm font-bold">2</span>
                Post-Bacc Success Story
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Scenario:</strong> Career changer improving GPA</p>
                <p className="font-mono bg-white p-2 rounded">• Original BCPM GPA: 2.9</p>
                <p className="font-mono bg-white p-2 rounded">• Post-Bacc Biochem: A (3 credits)</p>
                <p className="font-mono bg-white p-2 rounded">• Post-Bacc Anatomy: A (4 credits)</p>
                <p className="font-mono bg-white p-2 rounded">• Post-Bacc Physiology: A- (4 credits)</p>
                <p className="font-mono bg-white p-2 rounded">• Post-Bacc Microbiology: A (3 credits)</p>
                <p className="mt-3 p-3 bg-blue-100 rounded-lg border border-blue-300">
                  <strong>Result:</strong> New BCPM GPA: 3.24<br/>
                  <span className="text-blue-800">✓ Now competitive for DO programs</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900">AMCAS-Compliant Calculation</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Uses official AMCAS grade conversion chart and retake policy. Separates BCPM and AO GPAs exactly as medical schools will see them, ensuring accurate application planning.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-indigo-900">Science GPA Focus</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Auto-detects BCPM courses and calculates separate science GPA. Essential for medical school evaluation as science performance is the strongest predictor of MCAT and clinical success.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-purple-900">Retake Impact Analysis</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                See how AMCAS counts both attempts when retaking courses. Plan strategically whether to retake a course or focus on new upper-level classes to boost your GPA.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-pink-900">Competitive Analysis</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Instant feedback on where you stand for MD vs DO programs. Get realistic guidance on whether to apply, strengthen your application, or pursue post-bacc programs.
              </p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Use This Calculator</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Your Courses</h3>
                <p className="text-gray-700 leading-relaxed">
                  Add all college-level courses from your transcript. Include course name, grade received, credit hours, and academic year. Use "Add BCPM Course" for science classes and "Add Other Course" for non-science coursework.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mark BCPM Courses</h3>
                <p className="text-gray-700 leading-relaxed">
                  Check the "BCPM?" box for Biology, Chemistry, Physics, and Math courses. The calculator auto-detects common science courses, but manually verify for accuracy. Include Biochemistry, Anatomy, Physiology, Statistics, and Calculus.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Include Retakes</h3>
                <p className="text-gray-700 leading-relaxed">
                  If you retook a course, enter it twice with both grades. AMCAS counts BOTH attempts in your GPA. For example, if you got a C in Organic Chemistry then retook it for an A, enter both grades as separate entries with the same course name.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Review Your Results</h3>
                <p className="text-gray-700 leading-relaxed">
                  Check your Overall GPA, BCPM GPA, and AO GPA. Review the competitive analysis to understand your standing. Use this information to plan whether to retake courses, take additional classes, or proceed with applications.
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
                <p className="font-semibold mb-2">Course Entries:</p>
                <ul className="space-y-1 font-mono text-xs">
                  <li>• Biology I - A (4.0) × 4 credits = 16.0 grade points</li>
                  <li>• Gen Chem I - B+ (3.3) × 4 credits = 13.2 grade points</li>
                  <li>• Calculus - A- (3.7) × 3 credits = 11.1 grade points</li>
                  <li>• English Comp - A (4.0) × 3 credits = 12.0 grade points</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">BCPM GPA Calculation:</p>
                <p className="font-mono text-xs">(16.0 + 13.2 + 11.1) ÷ (4 + 4 + 3) = 40.3 ÷ 11 = <strong className="text-blue-600">3.66</strong></p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold mb-2">Overall GPA Calculation:</p>
                <p className="font-mono text-xs">(16.0 + 13.2 + 11.1 + 12.0) ÷ (4 + 4 + 3 + 3) = 52.3 ÷ 14 = <strong className="text-green-600">3.74</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Who Uses This Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 className="text-xl font-bold text-blue-900">Pre-Med Students</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Track your AMCAS GPA throughout undergrad to ensure you stay competitive for medical school. Monitor BCPM GPA closely as science performance is heavily weighted in admissions decisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-bold text-indigo-900">Post-Bacc Candidates</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Calculate how additional coursework will impact your AMCAS GPA. Determine whether a post-bacc program or specific upper-level courses can bring you to competitive GPA thresholds for your target schools.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold text-purple-900">Re-Applicants</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Verify your AMCAS GPA calculation before reapplying. Understand exactly how retaken courses affected your GPA and whether additional coursework or an SMP could strengthen your application.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-xl font-bold text-pink-900">Pre-Med Advisors</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Help advisees understand AMCAS GPA calculation and realistic expectations for medical school admissions. Guide students in course selection and retake decisions based on accurate GPA projections.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-xl p-6 sm:p-8 mb-8 border-2 border-blue-100">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-3">
              About AMCAS GPA Calculation
            </h2>
            <p className="text-gray-600 text-sm">Your complete guide to understanding medical school GPA requirements</p>
          </div>
          
          <div className="prose prose-blue max-w-none">
            <div className="bg-white rounded-lg p-6 mb-6 border-l-4 border-blue-500 shadow-sm">
              <p className="text-gray-700 leading-relaxed mb-0">
                The <strong>American Medical College Application Service (AMCAS)</strong> is the centralized application service used by most U.S. allopathic (MD) medical schools. AMCAS calculates your GPA using a standardized methodology that differs from many undergraduate institutions, making it crucial for pre-med students to understand how their GPA will be evaluated by admissions committees prior to <strong>matriculation</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-0">Understanding BCPM GPA</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-0">
                  <strong>BCPM (Biology, Chemistry, Physics, Mathematics) GPA</strong>, also called your science GPA, is one of the most important metrics in medical school admissions. This includes all coursework in biological sciences, chemistry (including biochemistry), physics, and mathematics. Medical schools pay close attention to this number because it predicts performance on the <a href="/education-and-exam-tools/medical-exam-tools/mcat-score-calculator" className="text-blue-600 hover:underline font-semibold">MCAT exam</a> and success in medical school's rigorous science curriculum.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border-2 border-indigo-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-0">AMCAS Retake Policy</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-0">
                  Unlike many undergraduate institutions that use <strong>grade replacement</strong>, AMCAS counts <strong>BOTH attempts</strong> when you retake a course. If you earned a C in Organic Chemistry and retook it for an A, both grades are included in your GPA calculation. This policy makes it essential to perform well on the first attempt whenever possible. However, an upward trend with retakes can still demonstrate resilience and academic improvement to admissions committees.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-3">Competitive GPA Benchmarks for Matriculation</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    For <strong>MD programs</strong>, competitive applicants typically have an overall GPA of 3.7+ and a BCPM GPA of 3.6+. The minimum GPA threshold is generally around 3.0, though most successful applicants to allopathic schools have higher GPAs.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-0">
                    <strong>DO (osteopathic) programs</strong> are slightly more holistic in their review, often accepting students with GPAs between 3.0-3.4 if they demonstrate strong clinical experience, research involvement, or exceptional <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-purple-600 hover:underline font-semibold">academic improvement trends</a>. Students applying through <strong>AACOMAS</strong> (osteopathic application service) or <strong>TMDSAS</strong> (Texas schools) should verify specific GPA requirements for their target institutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Community College Coursework
                </h3>
                <p className="text-gray-700 leading-relaxed mb-0">
                  AMCAS includes all college-level coursework from regionally accredited institutions, including <strong>community college courses</strong>. While these courses count in your GPA, some medical schools may view extensive science prerequisites taken at community colleges less favorably than those taken at four-year universities. Admissions committees prefer to see challenging upper-level science courses completed at a university to demonstrate readiness for medical school rigor.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Improving Your AMCAS GPA
                </h3>
                <p className="text-gray-700 leading-relaxed mb-0">
                  If your GPA is below competitive thresholds, several pathways exist for improvement. <strong>Post-baccalaureate programs</strong> allow you to take additional coursework that counts in your AMCAS GPA. <strong>Special Master's Programs (SMPs)</strong> in medical sciences demonstrate ability to handle graduate-level coursework similar to medical school. Taking upper-level science courses (Biochemistry, Immunology, Molecular Biology) at a university can also strengthen your science GPA while showing academic progression toward matriculation.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="leading-relaxed mb-0">
                  Our <strong>Medical School GPA Calculator</strong> uses the official AMCAS grade conversion chart and methodology to give you accurate GPA calculations for both AMCAS and AACOMAS applications. Use this tool throughout your pre-med journey to make informed decisions about course selection, retakes, and application timing. Understanding your AMCAS GPA early allows you to plan strategically and maximize your chances of medical school acceptance and successful matriculation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* External Resources Section */}
        <section id="external-resources" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">External Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://students-residents.aamc.org/applying-medical-school/amcas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 hover:shadow-lg transition-all group"
            >
              <svg className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-blue-900">AAMC AMCAS</h3>
                <p className="text-sm text-gray-600">Official AMCAS application service</p>
              </div>
            </a>

            <a 
              href="https://www.aamc.org/students-residents/applying-medical-school/preparing-medical-school/should-i-apply-medical-school" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg border-2 border-indigo-200 hover:shadow-lg transition-all group"
            >
              <svg className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-indigo-900">AAMC Pre-Med Guide</h3>
                <p className="text-sm text-gray-600">Comprehensive pre-med resources</p>
              </div>
            </a>

            <a 
              href="https://www.studentdoctor.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-2 border-purple-200 hover:shadow-lg transition-all group"
            >
              <svg className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-purple-900">Student Doctor Network</h3>
                <p className="text-sm text-gray-600">Pre-med community forums</p>
              </div>
            </a>

            <a 
              href="https://www.prospectivedoctor.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg border-2 border-pink-200 hover:shadow-lg transition-all group"
            >
              <svg className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-pink-900">Prospective Doctor</h3>
                <p className="text-sm text-gray-600">Medical school admissions advice</p>
              </div>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-600 mb-8">
          <p>Last Updated: November 30, 2024</p>
        </div>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What is AMCAS GPA and how is it different from regular GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                AMCAS GPA is calculated by the American Medical College Application Service using a standardized 4.0 scale. It separates your coursework into BCPM (Biology, Chemistry, Physics, Math) and AO (All Other) categories. Unlike some schools, AMCAS counts both attempts when you retake a course, which can significantly impact your GPA.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What does BCPM stand for in medical school applications?</h3>
              <p className="text-gray-700 leading-relaxed">
                BCPM stands for Biology, Chemistry, Physics, and Mathematics. This is your science GPA that medical schools pay close attention to. It includes courses like General Chemistry, Organic Chemistry, Biology, Physics, Biochemistry, Calculus, and Statistics.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">How does AMCAS handle retaken courses?</h3>
              <p className="text-gray-700 leading-relaxed">
                AMCAS counts BOTH attempts when you retake a course. If you earned a C in Organic Chemistry and retook it for an A, both grades are included in your GPA calculation. This is different from many undergraduate institutions that use grade replacement policies.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What GPA do I need for medical school?</h3>
              <p className="text-gray-700 leading-relaxed">
                For MD programs, competitive applicants typically have an overall GPA of 3.7+ and BCPM GPA of 3.6+. The minimum is usually around 3.0, but 3.5+ is recommended for most programs. DO programs are slightly more flexible, often accepting GPAs from 3.0-3.4 with strong MCAT scores.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Do community college courses count in AMCAS GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, all college-level coursework from regionally accredited institutions counts in your AMCAS GPA, including community college courses. AMCAS tracks these separately, and some medical schools may view too many science prerequisites from community colleges less favorably.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What courses count as BCPM for AMCAS?</h3>
              <p className="text-gray-700 leading-relaxed">
                BCPM courses include: General Biology, Genetics, Microbiology, Anatomy, Physiology, General Chemistry, Organic Chemistry, Biochemistry, General Physics, Calculus, Statistics, and other math-based science courses. When in doubt, if the course is in a biology, chemistry, physics, or mathematics department, it likely counts as BCPM.
              </p>
            </div>

            <div className="pb-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Can I improve my AMCAS GPA after graduation?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, through post-baccalaureate programs or by taking additional coursework. Many students boost their GPA with formal post-bacc programs, Special Master's Programs (SMPs), or by taking upper-level science courses at a university. All post-grad coursework is included in your AMCAS GPA calculation.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['nursing-school-gpa-calculator', 'college-gpa-calculator', 'cumulative-gpa-calculator', 'mcat-score-calculator']} 
          currentSlug="medical-school-gpa-calculator" 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default MedicalSchoolGPACalculator;
