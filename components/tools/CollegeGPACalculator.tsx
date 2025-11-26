import React, { useEffect, useState } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';

interface CollegeGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string; // keep as string, validate/parse during calculation
}

const gradePoints40: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

const gradePoints43: { [key: string]: number } = {
  'A+': 4.3, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

const popularCourses = [
  'Mathematics', 'English Literature', 'Biology', 'Chemistry', 'Physics',
  'Computer Science', 'Psychology', 'History', 'Economics', 'Business Administration',
  'Accounting', 'Marketing', 'Political Science', 'Sociology', 'Engineering',
  'Statistics', 'Art History', 'Philosophy', 'Anthropology', 'Communications',
  'Calculus', 'Algebra', 'Geometry', 'Organic Chemistry', 'Microbiology',
  'Anatomy', 'Data Structures', 'Algorithms', 'Web Development', 'Databases',
  'Finance', 'Management', 'International Relations', 'American History', 'World History'
];

// Utility validators - STRICT validation, no silent failures
const isValidCreditsString = (s: string) => {
  const trimmed = s.trim();
  if (!trimmed) return false;
  // Only allow: digit or digit.digit (1 decimal max, no leading/trailing dot, max 6 credits)
  if (!/^\d+(\.\d)?$/.test(trimmed)) return false;
  const num = parseFloat(trimmed);
  return num > 0 && num <= 6;
};

const safeParseCredits = (s: string) => {
  if (!s.trim()) return NaN; // Empty = NaN (must be filled)
  if (!isValidCreditsString(s)) return NaN; // Invalid = NaN (error state)
  return parseFloat(s);
};

const uid = () => {
  // Prefer crypto random UUID when available
  try {
    // @ts-ignore
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      // @ts-ignore
      return crypto.randomUUID();
    }
  } catch (e) {
    // ignore
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
};

const CollegeGPACalculator: React.FC<CollegeGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: uid(), name: '', grade: 'A', credits: '3' }
  ]);
  const [semesterGPA, setSemesterGPA] = useState<number | null>(null);
  const [cumulativeGPA, setCumulativeGPA] = useState<string>('');
  const [cumulativeCredits, setCumulativeCredits] = useState<string>('');
  const [creditErrors, setCreditErrors] = useState<{ [key: string]: boolean }>({});
  const [totalGPA, setTotalGPA] = useState<number | null>(null);
  const [scale, setScale] = useState<'4.0' | '4.3'>('4.0');

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
      subtitle: 'Common scenarios',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-orange-400',
      hoverText: 'text-orange-600'
    },
    {
      id: 'about',
      emoji: 'ℹ️',
      title: 'About GPA',
      subtitle: 'Understanding',
      gradientFrom: 'from-cyan-50',
      gradientTo: 'to-blue-50',
      hoverBorder: 'border-cyan-400',
      hoverText: 'text-cyan-600'
    },
    {
      id: 'resources',
      emoji: '🔗',
      title: 'Resources',
      subtitle: 'External links',
      gradientFrom: 'from-red-50',
      gradientTo: 'to-rose-50',
      hoverBorder: 'border-red-400',
      hoverText: 'text-red-600'
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

  // --- Metadata (left as manual DOM manipulation per request) ---
  useEffect(() => {
    document.title = 'College GPA Calculator - Free & Accurate | ZuraWebTools';

    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const metaDescription = 'Calculate college GPA with credit hours. Free calculator for semester and cumulative GPA. Supports 4.0 & 4.3 scales with instant results.';
    setMetaTag('description', metaDescription);
    setMetaTag('robots', 'index, follow, max-image-preview:large');

    const ogTags = [
      { property: 'og:title', content: 'College GPA Calculator - Free & Accurate' },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-image.png' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property='${tag.property}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'College GPA Calculator - Free & Accurate' },
      { name: 'twitter:description', content: metaDescription },
    ];

    twitterTags.forEach(tag => setMetaTag(tag.name, tag.content));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator');

    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "College GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2850" },
      "description": "Free college GPA calculator with credit hours for calculating semester and cumulative GPA"
    };

    // Add WebPage schema with sections for TOC rich results
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "College GPA Calculator - Free & Accurate",
      "description": "Calculate college GPA with credit hours. Free calculator for semester and cumulative GPA. Supports 4.0 & 4.3 scales.",
      "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "College GPA Calculator"
      },
      "hasPart": [
        { "@type": "WebPageElement", "name": "GPA Calculator Tool", "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator#calculator" },
        { "@type": "WebPageElement", "name": "Quick Examples", "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator#examples" },
        { "@type": "WebPageElement", "name": "Why Use This Calculator", "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator#benefits" },
        { "@type": "WebPageElement", "name": "How to Use Guide", "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator#how-to-use" },
        { "@type": "WebPageElement", "name": "Common Use Cases", "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator#use-cases" },
        { "@type": "WebPageElement", "name": "About GPA Calculation", "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator#about" },
        { "@type": "WebPageElement", "name": "Frequently Asked Questions", "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator#faq" }
      ]
    };

    // Add FAQ schema for rich results
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I calculate my college GPA with this calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Enter your course names, select letter grades (A+, A, A-, B+, etc.), and input credit hours for each class. The calculator automatically computes your semester GPA in real-time as you type. For cumulative GPA, enter your previous GPA and completed credits—results update instantly without clicking any buttons."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between 4.0 and 4.3 GPA scales?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 4.0 scale is the most common system where A and A+ both equal 4.0 points. The 4.3 scale assigns 4.3 points to A+ grades, rewarding exceptional performance. Most colleges use the 4.0 scale, but some honors programs use 4.3."
          }
        },
        {
          "@type": "Question",
          "name": "How are credit hours weighted in GPA calculations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Credit hours determine the weight of each course in your GPA. A 4-credit course has more impact than a 1-credit course. The calculator multiplies each grade point by its credit hours to get quality points, then divides total quality points by total credit hours."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate my cumulative GPA across multiple semesters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Enter your current cumulative GPA and total completed credit hours in the optional section. Then add your current semester courses with grades and credits. The calculator automatically computes your new combined cumulative GPA in real-time."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for scholarships and honors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Many scholarships require maintaining a 3.0 GPA (B average), while competitive scholarships may need 3.5 or higher. Dean's List typically requires 3.5-3.7, and summa cum laude graduation honors usually need 3.8-4.0."
          }
        },
        {
          "@type": "Question",
          "name": "Is this GPA calculator accurate for all colleges?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator uses standard 4.0 and 4.3 grading scales adopted by most American colleges and universities. However, some institutions use unique grading systems. Always verify your calculated GPA against your official transcript."
          }
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    // Combine all schemas in array format
    scriptTag.textContent = JSON.stringify([schema, webPageSchema, faqSchema]);

    return () => {
      // minimal cleanup: reset title only (per original pattern)
      document.title = 'ZuraWebTools';
    };
  }, []);

  // Sync semester GPA calculation - no debounce to avoid race conditions
  useEffect(() => {
    calculateSemesterGPA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, scale]);

  const addCourse = () => {
    setCourses(prev => [...prev, { id: uid(), name: '', grade: 'A', credits: '3' }]);
  };

  const removeCourse = (id: string) => {
    setCourses(prev => {
      if (prev.length === 1) return prev;
      return prev.filter(c => c.id !== id);
    });

    // FIX: Remove stale error entry to prevent UI glitches
    setCreditErrors(prev => {
      if (!prev[id]) return prev;
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // Credit input handler - allow natural typing with sanitization
  const handleCreditChange = (id: string, value: string) => {
    // Allow user to type, but sanitize and normalize into a safe intermediate state.
    let sanitized = value.replace(/[^0-9.]/g, '');

    // Collapse extra dots: keep first two parts only
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      sanitized = parts[0] + '.' + parts.slice(1).join('');
    }

    // If starts with multiple zeros like "00" -> collapse to single "0" (allow "0.x")
    sanitized = sanitized.replace(/^0+(?=\d)/, '');

    // If leading '.' put a leading '0' to make it a valid partial number "0." -> better UX
    if (sanitized.startsWith('.')) sanitized = '0' + sanitized;

    // If decimal exists, limit to one digit after decimal (you required 1 dec)
    if (sanitized.includes('.')) {
      const [whole, decimal] = sanitized.split('.');
      sanitized = whole + '.' + (decimal ? decimal.slice(0, 1) : '');
    }

    // If numeric and > 6, clamp to '6' (or ignore update — clamping is friendlier)
    const numVal = parseFloat(sanitized);
    if (!isNaN(numVal) && numVal > 6) {
      sanitized = '6';
    }

    updateCourse(id, 'credits', sanitized);
  }

  const calculateSemesterGPA = () => {
    const gradePoints = scale === '4.3' ? gradePoints43 : gradePoints40;

    let totalPoints = 0;
    let totalCredits = 0;
    const errors: { [key: string]: boolean } = {};

    for (const course of courses) {
      const trimmed = course.credits.trim();
      
      // Skip completely empty courses (user might add extra rows)
      if (!trimmed) {
        continue; // Don't mark as error, just skip
      }
      
      // Mark invalid credits
      if (!isValidCreditsString(trimmed)) {
        errors[course.id] = true;
        continue;
      }
      
      const credits = parseFloat(trimmed);
      const gp = gradePoints[course.grade];
      
      // Validate grade exists in grading scale
      if (typeof gp !== 'number') {
        // Grade invalid or undefined - flag error
        errors[course.id] = true;
        continue;
      }
      
      if (credits > 0) {
        totalPoints += gp * credits;
        totalCredits += credits;
      }
    }

    setCreditErrors(errors);

    // Don't calculate if any filled course has invalid credits
    if (Object.keys(errors).length > 0 || totalCredits === 0) {
      setSemesterGPA(null);
      return;
    }

    const semGPA = totalPoints / totalCredits;
    setSemesterGPA(Number(semGPA.toFixed(2)));
  };

  const calculateCumulativeGPA = () => {
    const gradePoints = scale === '4.3' ? gradePoints43 : gradePoints40;

    // Validate previous cumulative inputs strictly
    if (cumulativeGPA.trim() === '' || cumulativeCredits.trim() === '') {
      setTotalGPA(null);
      return;
    }

    const prevGPA = parseFloat(cumulativeGPA);
    const prevCredits = parseFloat(cumulativeCredits);

    const maxScale = scale === '4.3' ? 4.3 : 4.0;

    // Strict validation - no NaN hiding
    if (isNaN(prevGPA) || isNaN(prevCredits) || prevGPA < 0 || prevGPA > maxScale || prevCredits < 0) {
      setTotalGPA(null);
      return;
    }

    // Cumulative credits must be whole number
    if (prevCredits !== Math.floor(prevCredits)) {
      setTotalGPA(null);
      return;
    }

    // Reuse semester calculation logic but compute totals explicitly
    let semesterPoints = 0;
    let semesterCredits = 0;

    for (const course of courses) {
      const trimmed = course.credits.trim();
      if (!trimmed) continue;
      
      if (!isValidCreditsString(trimmed)) {
        // Invalid course credits -> abort
        setTotalGPA(null);
        return;
      }
      
      const credits = parseFloat(trimmed);
      const gp = gradePoints[course.grade];
      
      // Validate grade exists
      if (typeof gp !== 'number') {
        // Invalid grade -> abort
        setTotalGPA(null);
        return;
      }
      
      if (credits > 0) {
        semesterPoints += gp * credits;
        semesterCredits += credits;
      }
    }

    const prevPoints = prevGPA * prevCredits;
    const combinedPoints = prevPoints + semesterPoints;
    const combinedCredits = prevCredits + semesterCredits;

    if (combinedCredits === 0) {
      setTotalGPA(null);
      return;
    }

    // Round cumulative GPA output to 2 decimals for consistency
    const cumulativeResult = combinedPoints / combinedCredits;
    setTotalGPA(Number(cumulativeResult.toFixed(2)));
  };

  // Auto-calculate cumulative GPA when inputs change - sync, no race conditions
  useEffect(() => {
    if (cumulativeGPA.trim() && cumulativeCredits.trim()) {
      calculateCumulativeGPA();
    } else {
      setTotalGPA(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeGPA, cumulativeCredits, courses, scale]);

  const resetCalculator = () => {
    setCourses([{ id: uid(), name: '', grade: 'A', credits: '3' }]);
    setCumulativeGPA('');
    setCumulativeCredits('');
    setSemesterGPA(null);
    setTotalGPA(null);
    setCreditErrors({}); // Clear all error states
  };

  const shareOnTwitter = () => {
    if (semesterGPA === null) return;
    const text = `Just calculated my college GPA using this free calculator! My semester GPA: ${semesterGPA.toFixed(2)}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator')}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator')}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator')}`, '_blank');
  };

  // Helpers for UI display
  const semesterCreditsTotal = courses.reduce((sum, c) => {
    const credits = safeParseCredits(c.credits);
    return sum + (isNaN(credits) ? 0 : credits);
  }, 0);

  const combinedCreditsDisplay = () => {
    const prev = parseFloat(cumulativeCredits);
    const prevVal = isNaN(prev) ? 0 : prev;
    const combined = prevVal + semesterCreditsTotal;
    // Show decimal if semester has fractional credits, otherwise show whole number
    return Number.isInteger(combined) ? combined.toString() : combined.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">College GPA Calculator</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">Calculate your academic performance with precision. Enter your courses, grades, and credit hours to instantly see your semester and cumulative results on both 4.0 and 4.3 scales.</p>
        </div>

        <div id="calculator" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Calculate Your GPA</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <label className="text-sm font-medium text-gray-700">GPA Scale:</label>
              <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                <button
                  onClick={() => setScale('4.0')}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${scale === '4.0' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                  4.0 Scale
                </button>
                <button
                  onClick={() => setScale('4.3')}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${scale === '4.3' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>
                  4.3 Scale (A+ = 4.3)
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="flex flex-wrap gap-3 items-end p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 w-full sm:min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input
                    list={`courses-list`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="Type or select course name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  />
                </div>

                <div className="w-full sm:w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  >
                    {Object.keys(scale === '4.3' ? gradePoints43 : gradePoints40).map(grade => {
                      const points = (scale === '4.3' ? gradePoints43 : gradePoints40)[grade];
                      return (
                        <option key={grade} value={grade}>{grade} ({points.toFixed(1)})</option>
                      );
                    })}
                  </select>
                </div>

                <div className="w-full sm:w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={course.credits}
                    onChange={(e) => handleCreditChange(course.id, e.target.value)}
                    min="0"
                    placeholder="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 ${
                      creditErrors[course.id] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                    }`}
                  />
                  {creditErrors[course.id] && (
                    <p className="text-xs text-red-600 mt-1">Invalid (max 6, 1 decimal digit)</p>
                  )}
                </div>

                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length === 1}
                  className="w-full sm:w-auto sm:mt-6 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Remove course"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}

            <datalist id="courses-list">
              {popularCourses.map(cn => <option key={cn} value={cn} />)}
            </datalist>
          </div>

          <button onClick={addCourse} className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">+ Add Another Course</button>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Previous Cumulative GPA (Optional)</h3>
            <p className="text-sm text-gray-600 mb-4">Enter your current cumulative GPA and total credits to instantly see how this semester affects your overall GPA. Results update automatically as you type!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Cumulative GPA</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={cumulativeGPA}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, '');
                    // Allow only valid GPA format
                    if (val === '' || /^\d*\.?\d{0,2}$/.test(val)) {
                      setCumulativeGPA(val);
                    }
                  }}
                  placeholder="e.g., 3.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Credits Completed (whole number)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cumulativeCredits}
                  onChange={(e) => {
                    // Only allow whole numbers for cumulative credits
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setCumulativeCredits(val);
                  }}
                  placeholder="e.g., 60"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="font-medium text-blue-800">Auto-Calculation Enabled</p>
              <p className="text-blue-700 mt-1">Your cumulative GPA will update automatically as you enter values above and add semester courses.</p>
            </div>
          </div>

          {semesterGPA !== null && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                  <p className="text-sm font-medium opacity-90 mb-2">Semester GPA</p>
                  <p className="text-4xl font-bold">{semesterGPA.toFixed(2)}</p>
                  <p className="text-sm opacity-75 mt-2">{semesterCreditsTotal.toFixed(1)} credits this semester</p>
                </div>

                {totalGPA !== null && (
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
                    <p className="text-sm font-medium opacity-90 mb-2">New Cumulative GPA</p>
                    <p className="text-4xl font-bold">{totalGPA.toFixed(2)}</p>
                    <p className="text-sm opacity-75 mt-2">{combinedCreditsDisplay()} total credits</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button onClick={resetCalculator} className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Reset Calculator</button>
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Calculator</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareOnTwitter} className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors">Twitter</button>
            <button onClick={shareOnFacebook} className="flex items-center gap-2 px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors">Facebook</button>
            <button onClick={shareOnLinkedIn} className="flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors">LinkedIn</button>
          </div>
        </div>

        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Example 1: Single Semester</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Math (A): 4 credits → 4.0 × 4 = 16 points</li>
                <li>• English (B+): 3 credits → 3.3 × 3 = 9.9 points</li>
                <li>• Biology (A-): 4 credits → 3.7 × 4 = 14.8 points</li>
                <li className="pt-2 font-bold text-indigo-600">Total: 40.7 points ÷ 11 credits = 3.70 GPA</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Example 2: Cumulative GPA</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Previous GPA: 3.5 with 60 credits</li>
                <li>• New Semester: 3.8 with 15 credits</li>
                <li>• Previous points: 3.5 × 60 = 210</li>
                <li>• New points: 3.8 × 15 = 57</li>
                <li className="pt-2 font-bold text-teal-600">New Cumulative: 267 ÷ 75 = 3.56 GPA</li>
              </ul>
            </div>
          </div>
        </div>

        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Use Our College GPA Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">Instant Calculations</h3>
              <p className="text-white/90">Get accurate GPA results in seconds with real-time calculations as you enter your grades and credits.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">100% Accurate</h3>
              <p className="text-white/90">Uses standard grading scales and proper credit weighting for mathematically precise GPA calculations.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl text-white">
              <h3 className="text-xl font-bold mb-2">Completely Free</h3>
              <p className="text-white/90">No sign-up, no hidden fees, no limitations. Calculate your GPA as many times as you need, forever free.</p>
            </div>
          </div>
        </div>

        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use This GPA Calculator</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Course Information</h3>
                <p className="text-gray-600">Add your courses by typing the course name or selecting from popular courses. Input the letter grade you received (A+, A, A-, B+, etc.) and the number of credit hours for each course.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your GPA Scale</h3>
                <p className="text-gray-600">Choose between 4.0 or 4.3 scale depending on your institution's grading system. Most colleges use 4.0 scale, but some honor programs use 4.3 where A+ equals 4.3 points.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">View Your Semester GPA</h3>
                <p className="text-gray-600">The calculator automatically computes your semester GPA as you enter courses. You'll see your grade point average and total credit hours in real-time.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Cumulative GPA (Optional)</h3>
                <p className="text-gray-600">Want to see your overall GPA? Simply enter your previous cumulative GPA and total completed credits. As soon as you type both values, your new combined cumulative GPA appears automatically—no button click needed!</p>
              </div>
            </div>
          </div>
        </div>

        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Current Students</h3>
              <p className="text-gray-600">Track your academic performance throughout the semester. Calculate your GPA after midterms or finals to monitor your progress and maintain scholarship requirements.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Academic Planning</h3>
              <p className="text-gray-600">Plan future semesters by testing different grade scenarios. See what grades you need to achieve your target cumulative GPA for graduation or graduate school applications.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transfer Students</h3>
              <p className="text-gray-600">Calculate your new cumulative GPA after transferring schools. Combine your previous institution's GPA with current semester grades to understand your standing.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">GPA Recovery</h3>
              <p className="text-gray-600">If you had a difficult semester, use this calculator to project how strong future performance can improve your cumulative GPA over time.</p>
            </div>
          </div>
        </div>

        <div id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About College GPA Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4 leading-relaxed">
            <p>This comprehensive tool helps students calculate their grade point average using credit hours. Whether you're tracking a single semester or your overall academic performance, get instant and precise results based on standard grading scales used by most colleges.</p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Understanding GPA Scales and Grading Systems</h3>
            <p>Most American colleges use a 4.0 scale where an A equals 4.0 grade points, B equals 3.0, C equals 2.0, and so on. Some institutions with honors programs use a 4.3 scale where A+ receives 4.3 points. This calculator supports both systems, letting you select the one your institution uses.</p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">How GPA Calculation Works</h3>
            <p>Your GPA is calculated by multiplying each course's grade points by its credit hours, summing these values (called quality points), and dividing by total credit hours. For example, an A (4.0) in a 3-credit course contributes 12 quality points. This weighted average ensures larger courses have proportional impact on your overall average.</p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Why GPA Matters</h3>
            <p>Your academic performance plays a crucial role in scholarship eligibility, honor society membership, and graduate school admissions. Many employers also consider it when evaluating recent graduates. Understanding how to track and improve your grades helps you make informed decisions about course selection and academic goals.</p>
            
            <p className="mt-6">For more tools to help with your academic journey, check out our <a href="/berkeley-gpa-calculator" className="text-indigo-600 hover:underline font-medium">Berkeley GPA Calculator</a> for UC-specific calculations, or explore our <a href="/sat-score-calculator" className="text-indigo-600 hover:underline font-medium">SAT Score Calculator</a> for standardized test planning.</p>
          </div>
        </div>

        <div id="resources" className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About GPA and College Academics</h2>
          <p className="text-gray-600 mb-6">Explore these authoritative resources for more information about GPA calculation and academic success:</p>
          <ul className="space-y-3">
            <li><a href="https://www.collegeboard.org/help/grade-point-average" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">College Board - Understanding Grade Point Average (Official Guide)</a></li>
            <li><a href="https://www.usnews.com/education/best-colleges/articles/what-is-a-good-college-gpa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">U.S. News & World Report - What Is a Good College GPA?</a></li>
            <li><a href="https://nces.ed.gov/fastfacts/display.asp?id=76" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">National Center for Education Statistics - Undergraduate Grading Policies</a></li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8 border border-gray-200">
          <p className="text-sm text-gray-600 text-center"><strong>Last Updated:</strong> November 15, 2025 | <span className="ml-2">Reviewed for accuracy and current academic standards</span></p>
        </div>

        <div id="faq" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I calculate my college GPA with this calculator?</h3>
              <p className="text-gray-600 leading-relaxed">Enter your course names, select letter grades (A+, A, A-, B+, etc.), and input credit hours for each class. The calculator automatically computes your semester GPA in real-time as you type. For cumulative GPA, enter your previous GPA and completed credits—results update instantly without clicking any buttons.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between 4.0 and 4.3 GPA scales?</h3>
              <p className="text-gray-600 leading-relaxed">The 4.0 scale is the most common system where A and A+ both equal 4.0 points. The 4.3 scale assigns 4.3 points to A+ grades, rewarding exceptional performance. Check your institution's grading policy to determine which scale applies to you. Most colleges use the 4.0 scale, but some honors programs use 4.3.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How are credit hours weighted in GPA calculations?</h3>
              <p className="text-gray-600 leading-relaxed">Credit hours determine the weight of each course in your GPA. A 4-credit course has more impact than a 1-credit course. The calculator multiplies each grade point by its credit hours to get quality points, then divides total quality points by total credit hours. This ensures larger courses appropriately influence your overall average.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I calculate my cumulative GPA across multiple semesters?</h3>
              <p className="text-gray-600 leading-relaxed">Yes! Enter your current cumulative GPA and total completed credit hours (whole number) in the optional section. Then add your current semester courses with grades and credits. The calculator automatically computes your new combined cumulative GPA in real-time by properly weighing all credits. Results update instantly as you type—perfect for tracking academic progress throughout your college career.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What GPA do I need for scholarships and honors?</h3>
              <p className="text-gray-600 leading-relaxed">Requirements vary by institution. Many scholarships require maintaining a 3.0 GPA (B average), while competitive scholarships may need 3.5 or higher. Dean's List typically requires 3.5-3.7, and summa cum laude graduation honors usually need 3.8-4.0. Check your school's specific requirements for accurate information.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do plus and minus grades affect my GPA?</h3>
              <p className="text-gray-600 leading-relaxed">Plus and minus grades create gradations between letter grades. A- equals 3.7, B+ equals 3.3, B equals 3.0, B- equals 2.7, and so on. These incremental differences can significantly impact your GPA over time. Our calculator includes all standard plus/minus grades for accurate calculations.</p>
            </div>
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Is this GPA calculator accurate for all colleges?</h3>
              <p className="text-gray-600 leading-relaxed">This calculator uses standard 4.0 and 4.3 grading scales adopted by most American colleges and universities. However, some institutions use unique grading systems or exclude certain courses from GPA calculations. Always verify your calculated GPA against your official transcript and consult your registrar's office for institution-specific policies.</p>
            </div>
          </div>
        </div>

        <RelatedTools 
          currentSlug="college-gpa-calculator" 
          relatedSlugs={["berkeley-gpa-calculator", "lsac-gpa-calculator", "sat-score-calculator"]} 
          navigateTo={navigateTo} 
        />

      </div>
    </div>
  );
};

export default CollegeGPACalculator;
