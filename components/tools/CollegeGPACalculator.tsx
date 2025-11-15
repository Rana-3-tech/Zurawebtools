import React, { useEffect, useState } from 'react';
import { Page } from '../../App';

interface CollegeGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string; // keep as string, validate/parse during calculation
}

// --- Local fallback for RelatedTools ---
// The original project expected a ../RelatedTools import which may not exist
// in every environment. To avoid build-time errors, provide a minimal local
// implementation here. If you have a real RelatedTools component, remove
// this local stub and import the real one instead.
const RelatedTools: React.FC<{ currentSlug: string; relatedSlugs: string[]; navigateTo: (p: Page) => void }> = ({ currentSlug, relatedSlugs, navigateTo }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-900 mb-2">Related Tools</h4>
      <ul className="text-sm text-gray-700 space-y-1">
        {relatedSlugs.map(slug => (
          <li key={slug}>
            <button
              onClick={() => navigateTo?.((slug as unknown) as Page)}
              className="text-indigo-600 hover:underline"
            >
              {slug.replace(/-/g, ' ')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

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

// Utility validators
const isValidCreditsString = (s: string) => {
  const trimmed = s.trim();
  if (!trimmed) return false;
  return /^\d+(?:\.\d+)?$/.test(trimmed);
};

const safeParseCredits = (s: string) => {
  if (!isValidCreditsString(s)) return NaN;
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
  const [totalGPA, setTotalGPA] = useState<number | null>(null);
  const [scale, setScale] = useState<'4.0' | '4.3'>('4.0');

  // --- Metadata (left as manual DOM manipulation per request) ---
  useEffect(() => {
    document.title = 'College GPA Calculator - Free Cumulative & Semester GPA Calculator | ZuraWebTools';

    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const metaDescription = 'Free college GPA calculator with credit hours. Calculate semester GPA, cumulative GPA, and overall GPA instantly. Supports A+ to F grading scale with plus/minus grades.';
    setMetaTag('description', metaDescription);
    setMetaTag('keywords', 'college gpa calculator, cumulative gpa calculator, semester gpa calculator, gpa calculator with credits, calculate college gpa, university gpa calculator, academic performance, grade point average, college grades, quality points, credit hours');
    setMetaTag('robots', 'index, follow, max-image-preview:large');

    const ogTags = [
      { property: 'og:title', content: 'College GPA Calculator - Free Cumulative & Semester GPA Calculator' },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/college-gpa-calculator' },
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
      { name: 'twitter:title', content: 'College GPA Calculator - Free Cumulative & Semester GPA Calculator' },
      { name: 'twitter:description', content: metaDescription },
    ];

    twitterTags.forEach(tag => setMetaTag(tag.name, tag.content));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/college-gpa-calculator');

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

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      // minimal cleanup: reset title only (per original pattern)
      document.title = 'ZuraWebTools';
    };
  }, []);

  // Debounced semester GPA calculation: waits until user pauses typing
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateSemesterGPA();
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, scale]);

  const addCourse = () => {
    setCourses(prev => [...prev, { id: uid(), name: '', grade: 'A', credits: '3' }]);
  };

  const removeCourse = (id: string) => {
    setCourses(prev => (prev.length > 1 ? prev.filter(c => c.id !== id) : prev));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // Improved credit input handler with sanitization
  const handleCreditChange = (id: string, value: string) => {
    // Allow only numbers and one decimal point
    const sanitized = value.replace(/[^0-9.]/g, '');
    // Remove multiple decimal points
    const parts = sanitized.split('.');
    const finalValue = parts.length > 2 
      ? parts[0] + '.' + parts.slice(1).join('') 
      : sanitized;
    
    updateCourse(id, 'credits', finalValue);
  };

  const calculateSemesterGPA = () => {
    const gradePoints = scale === '4.3' ? gradePoints43 : gradePoints40;

    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const credits = safeParseCredits(course.credits);
      if (course.grade && !isNaN(credits) && credits > 0) {
        const gp = gradePoints[course.grade];
        if (typeof gp === 'number') {
          totalPoints += gp * credits;
          totalCredits += credits;
        }
      } else if (course.credits.trim() !== '' && !isValidCreditsString(course.credits)) {
        // invalid credit string => don't compute; keep semesterGPA null and exit
        setSemesterGPA(null);
        return;
      }
    }

    if (totalCredits === 0) {
      // No valid credits entered yet
      setSemesterGPA(null);
      return;
    }

    const semGPA = totalPoints / totalCredits;
    // Better error handling
    if (totalCredits > 0 && !isNaN(semGPA) && isFinite(semGPA)) {
      setSemesterGPA(Number(semGPA.toFixed(2)));
    } else {
      setSemesterGPA(null);
    }
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

    if (isNaN(prevGPA) || isNaN(prevCredits) || prevGPA < 0 || prevGPA > maxScale || prevCredits < 0) {
      setTotalGPA(null);
      return;
    }

    // Reuse semester calculation logic but compute totals explicitly
    let semesterPoints = 0;
    let semesterCredits = 0;

    for (const course of courses) {
      const credits = safeParseCredits(course.credits);
      if (course.credits.trim() !== '' && !isValidCreditsString(course.credits)) {
        // invalid course credits -> abort
        setTotalGPA(null);
        return;
      }
      if (!isNaN(credits) && credits > 0) {
        const gp = gradePoints[course.grade];
        if (typeof gp === 'number') {
          semesterPoints += gp * credits;
          semesterCredits += credits;
        }
      }
    }

    const prevPoints = prevGPA * prevCredits;
    const combinedPoints = prevPoints + semesterPoints;
    const combinedCredits = prevCredits + semesterCredits;

    if (combinedCredits === 0) {
      setTotalGPA(null);
      return;
    }

    setTotalGPA(Number.isFinite(combinedPoints / combinedCredits) ? combinedPoints / combinedCredits : null);
  };

  // Auto-calculate cumulative GPA when inputs change
  useEffect(() => {
    if (cumulativeGPA.trim() && cumulativeCredits.trim()) {
      const timer = setTimeout(() => {
        calculateCumulativeGPA();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cumulativeGPA, cumulativeCredits, courses, scale]);

  const resetCalculator = () => {
    setCourses([{ id: uid(), name: '', grade: 'A', credits: '3' }]);
    setCumulativeGPA('');
    setCumulativeCredits('');
    setSemesterGPA(null);
    setTotalGPA(null);
  };

  const shareOnTwitter = () => {
    if (!semesterGPA) return;
    const text = `Just calculated my college GPA using this free calculator! My semester GPA: ${semesterGPA.toFixed(2)}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/college-gpa-calculator')}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/college-gpa-calculator')}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/college-gpa-calculator')}`, '_blank');
  };

  // Helpers for UI display
  const semesterCreditsTotal = courses.reduce((sum, c) => {
    const credits = safeParseCredits(c.credits);
    return sum + (isNaN(credits) ? 0 : credits);
  }, 0);

  const combinedCreditsDisplay = () => {
    const prev = parseFloat(cumulativeCredits);
    const prevVal = isNaN(prev) ? 0 : prev;
    return (prevVal + semesterCreditsTotal).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">College GPA Calculator</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">Free online college GPA calculator with credit hours. Calculate your semester GPA, cumulative GPA, and overall college GPA instantly with our accurate grade point average calculator.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Calculate Your GPA</h2>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">GPA Scale:</label>
              <div className="flex bg-gray-100 rounded-lg p-1">
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
              <div key={course.id} className="flex flex-wrap gap-3 items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input
                    list={`courses-list`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="Type or select course name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  />
                </div>

                <div className="w-32">
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

                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={course.credits}
                    onChange={(e) => handleCreditChange(course.id, e.target.value)}
                    min="0"
                    placeholder="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  />
                </div>

                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length === 1}
                  className="mt-6 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="text-sm text-gray-600 mb-4">Enter your current cumulative GPA and click Calculate to see how this semester affects your overall GPA.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Cumulative GPA</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={cumulativeGPA}
                  onChange={(e) => setCumulativeGPA(e.target.value)}
                  placeholder="e.g., 3.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Credits Completed</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cumulativeCredits}
                  onChange={(e) => setCumulativeCredits(e.target.value)}
                  placeholder="e.g., 60"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                />
              </div>
            </div>

            <button
              onClick={calculateCumulativeGPA}
              disabled={cumulativeGPA.trim() === '' || cumulativeCredits.trim() === ''}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Cumulative GPA
            </button>
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

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Calculator</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareOnTwitter} className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors">Twitter</button>
            <button onClick={shareOnFacebook} className="flex items-center gap-2 px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors">Facebook</button>
            <button onClick={shareOnLinkedIn} className="flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors">LinkedIn</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
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

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
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

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About College GPA Calculator</h2>
          <div className="prose max-w-none text-gray-700 space-y-4 leading-relaxed">
            <p>Our <strong>college GPA calculator</strong> is a comprehensive free tool designed to help students accurately calculate their <strong>grade point average</strong> using credit hours. Whether you need a <strong>semester GPA calculator</strong> or want to compute your <strong>cumulative GPA</strong>, this tool provides instant, precise calculations based on commonly used grading scales.</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Understanding GPA Scales and Grading Systems</h3>
            <p>Many institutions use a 4.0 scale; some use a 4.3 scale where A+ = 4.3. This calculator supports both via the GPA Scale toggle above.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-gray-200">
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

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I calculate my college GPA with this calculator?</h3>
              <p className="text-gray-600 leading-relaxed">Enter courses, choose letter grades, input credit hours (or select popular courses), then use the Calculate Cumulative button if you want to include previous credits. The calculator validates inputs and shows results when values are valid.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <RelatedTools currentSlug="college-gpa-calculator" relatedSlugs={["berkeley-gpa-calculator", "isac-gpa-calculator", "sat-score-calculator"]} navigateTo={navigateTo} />
        </div>

      </div>
    </div>
  );
};

export default CollegeGPACalculator;
