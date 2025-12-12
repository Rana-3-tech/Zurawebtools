import React, { useState, useEffect } from 'react';
import { Page } from '../../App';

interface NYUGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const NYUGPACalculator: React.FC<NYUGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '', credits: 0 }
  ]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // NYU Grade Scale
  const gradeScale: { [key: string]: number } = {
    'A': 4.0,
    'A-': 3.667,
    'B+': 3.333,
    'B': 3.0,
    'B-': 2.667,
    'C+': 2.333,
    'C': 2.0,
    'C-': 1.667,
    'D+': 1.333,
    'D': 1.0,
    'F': 0.0
  };

  useEffect(() => {
    // SEO Meta Tags
    document.title = "NYU GPA Calculator 2026 - Calculate Your New York University GPA";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free NYU GPA calculator for 2026. Calculate your New York University grade point average instantly with our easy-to-use tool. Track Dean\'s List eligibility and honors.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free NYU GPA calculator for 2026. Calculate your New York University grade point average instantly with our easy-to-use tool. Track Dean\'s List eligibility and honors.';
      document.head.appendChild(meta);
    }

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'NYU GPA Calculator 2026 - Calculate Your New York University GPA');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', 'Free NYU GPA calculator for 2025. Calculate your New York University grade point average instantly with our easy-to-use tool. Track Dean\'s List eligibility and honors.');

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator');

    // Twitter Card tags
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', 'NYU GPA Calculator 2026 - Calculate Your New York University GPA');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator');

    // JSON-LD Schema
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "NYU GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free NYU GPA calculator for 2025. Calculate your New York University grade point average instantly.",
        "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator"
      },
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
            "name": "Education Tools",
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
            "name": "NYU GPA Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator"
          }
        ]
      }
    ];

    schemas.forEach((schema, index) => {
      const scriptId = `schema-${index}`;
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    });

    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`schema-${index}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', grade: '', credits: 0 }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let totalPoints = 0;
      let totalCreds = 0;

      courses.forEach(course => {
        if (course.grade && course.credits > 0) {
          const gradePoint = gradeScale[course.grade] || 0;
          totalPoints += gradePoint * course.credits;
          totalCreds += course.credits;
        }
      });

      const calculatedGPA = totalCreds > 0 ? totalPoints / totalCreds : 0;
      
      setGpa(calculatedGPA);
      setTotalCredits(totalCreds);
      setTotalQualityPoints(totalPoints);
      setShowResults(true);
      setIsCalculating(false);
    }, 500);
  };

  const resetCalculator = () => {
    setCourses([{ id: 1, name: '', grade: '', credits: 0 }]);
    setGpa(null);
    setTotalCredits(0);
    setTotalQualityPoints(0);
    setShowResults(false);
  };

  const clearAll = () => {
    setCourses(courses.map(course => ({ ...course, name: '', grade: '', credits: 0 })));
    setShowResults(false);
  };

  const getGPAStatus = (gpa: number) => {
    if (gpa >= 3.9) return { text: 'Summa Cum Laude', color: 'text-purple-700', bgColor: 'bg-purple-50', borderColor: 'border-purple-500' };
    if (gpa >= 3.7) return { text: 'Magna Cum Laude', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-500' };
    if (gpa >= 3.5) return { text: 'Cum Laude / Dean\'s List', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-500' };
    if (gpa >= 3.0) return { text: 'Good Standing', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-500' };
    if (gpa >= 2.0) return { text: 'Satisfactory', color: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500' };
    return { text: 'Below Standards', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-500' };
  };

  const printResults = () => {
    window.print();
  };

  const downloadResults = () => {
    const resultsText = `
NYU GPA Calculator Results
==========================

Your GPA: ${gpa?.toFixed(3)}
Total Credits: ${totalCredits}
Total Quality Points: ${totalQualityPoints.toFixed(2)}
Status: ${gpa ? getGPAStatus(gpa).text : 'N/A'}

Courses:
${courses.map((c, i) => `${i + 1}. ${c.name || 'Course ' + (i + 1)} - Grade: ${c.grade}, Credits: ${c.credits}`).join('\n')}

Generated by ZuraWebTools.com
    `.trim();

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nyu-gpa-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    const shareText = `I just calculated my NYU GPA: ${gpa?.toFixed(2)}! Calculate yours at ZuraWebTools.com`;
    if (navigator.share) {
      navigator.share({
        title: 'My NYU GPA',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            NYU GPA Calculator <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">2026</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your New York University grade point average instantly with our free, easy-to-use GPA calculator.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Track your academic progress, check Dean's List eligibility, and plan for Latin Honors at NYU.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Enter Your Courses</h2>
            <div className="flex gap-3">
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                aria-label="Clear all course entries"
              >
                Clear All
              </button>
              <button
                onClick={addCourse}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all font-medium shadow-lg"
                aria-label="Add new course"
              >
                + Add Course
              </button>
            </div>
          </div>

          {/* Course Input Fields */}
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                <div className="md:col-span-5">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Name
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    placeholder="e.g., Introduction to Psychology"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full px-4 py-3 text-gray-900 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    aria-label={`Course name for entry ${index + 1}`}
                  />
                </div>
                
                <div className="md:col-span-3">
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Letter Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-3 text-gray-900 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    aria-label={`Letter grade for entry ${index + 1}`}
                  >
                    <option value="">Select Grade</option>
                    {Object.keys(gradeScale).map(grade => (
                      <option key={grade} value={grade}>{grade} ({gradeScale[grade].toFixed(3)})</option>
                    ))}
                  </select>
                </div>
                
                <div className="md:col-span-3">
                  <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-semibold text-gray-700 mb-2">
                    Credit Hours
                  </label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    min="0"
                    max="12"
                    step="0.5"
                    placeholder="3"
                    value={course.credits || ''}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 text-gray-900 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    aria-label={`Credit hours for entry ${index + 1}`}
                  />
                </div>
                
                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className={`w-full px-3 py-3 rounded-lg font-medium transition-all ${
                      courses.length === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                    aria-label={`Remove course entry ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all ${
                isCalculating ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Calculate GPA"
            >
              {isCalculating ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </span>
              ) : (
                '🎓 Calculate My NYU GPA'
              )}
            </button>
            
            <button
              onClick={resetCalculator}
              className="px-8 py-4 bg-gray-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-gray-700 transform hover:-translate-y-1 transition-all"
              aria-label="Reset calculator"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Results Display Section */}
        {showResults && gpa !== null && (
          <div className="space-y-6 mb-12 animate-fadeIn">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your NYU GPA Results</h2>
            
            {/* Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* GPA Card */}
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="text-sm font-semibold opacity-90 mb-2">Your GPA</div>
                <div className="text-5xl font-bold mb-2">{gpa.toFixed(3)}</div>
                <div className="text-sm opacity-90">out of 4.0</div>
              </div>

              {/* Total Credits Card */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="text-sm font-semibold opacity-90 mb-2">Total Credits</div>
                <div className="text-5xl font-bold mb-2">{totalCredits}</div>
                <div className="text-sm opacity-90">credit hours</div>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="text-sm font-semibold opacity-90 mb-2">Quality Points</div>
                <div className="text-5xl font-bold mb-2">{totalQualityPoints.toFixed(2)}</div>
                <div className="text-sm opacity-90">total points</div>
              </div>

              {/* Status Card */}
              <div className={`bg-gradient-to-br ${
                gpa >= 3.5 ? 'from-yellow-400 to-orange-500' : 
                gpa >= 3.0 ? 'from-teal-400 to-cyan-500' : 
                'from-gray-400 to-gray-500'
              } rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-transform`}>
                <div className="text-sm font-semibold opacity-90 mb-2">Academic Status</div>
                <div className="text-2xl font-bold mb-2">{getGPAStatus(gpa).text}</div>
                <div className="text-sm opacity-90">
                  {gpa >= 3.5 ? '✨ Excellent!' : gpa >= 3.0 ? '👍 Keep it up!' : '📚 Room to grow'}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">GPA Progress Visualization</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                      Your GPA: {gpa.toFixed(3)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      {((gpa / 4.0) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-purple-200">
                  <div
                    style={{ width: `${(gpa / 4.0) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-violet-600 transition-all duration-1000"
                  ></div>
                </div>
                
                {/* GPA Scale Markers */}
                <div className="flex justify-between text-xs text-gray-600 font-semibold mt-2">
                  <span>0.0</span>
                  <span>2.0</span>
                  <span>3.0</span>
                  <span>3.5</span>
                  <span>4.0</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <button
                  onClick={printResults}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  aria-label="Print results"
                >
                  🖨️ Print Results
                </button>
                <button
                  onClick={downloadResults}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  aria-label="Download results"
                >
                  📥 Download Results
                </button>
                <button
                  onClick={shareResults}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  aria-label="Share results"
                >
                  📤 Share Results
                </button>
              </div>
            </div>

            {/* Success Message */}
            <div className={`${getGPAStatus(gpa).bgColor} border-l-4 ${getGPAStatus(gpa).borderColor} p-6 rounded-xl`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className={`h-6 w-6 ${getGPAStatus(gpa).color}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className={`text-lg font-bold ${getGPAStatus(gpa).color}`}>
                    {gpa >= 3.5 ? '🎉 Congratulations!' : gpa >= 3.0 ? '✅ Good Work!' : '📈 Keep Improving!'}
                  </h3>
                  <div className={`mt-2 text-sm ${getGPAStatus(gpa).color}`}>
                    <p>
                      {gpa >= 3.9 && "Outstanding achievement! You're on track for Summa Cum Laude honors at NYU."}
                      {gpa >= 3.7 && gpa < 3.9 && "Excellent work! You're eligible for Magna Cum Laude honors at graduation."}
                      {gpa >= 3.5 && gpa < 3.7 && "Great job! You qualify for Cum Laude honors and Dean's List recognition."}
                      {gpa >= 3.0 && gpa < 3.5 && "You're in good standing. Keep working to reach Dean's List (3.5+)."}
                      {gpa >= 2.0 && gpa < 3.0 && "You're meeting minimum requirements. Focus on improving grades in upcoming semesters."}
                      {gpa < 2.0 && "Your GPA is below NYU's minimum standards. Consider academic support resources and tutoring."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📚</span>
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <a href="#how-to-use" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> How to Use This Calculator
              </a>
              <a href="#about-nyu-gpa" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> About NYU GPA System
              </a>
              <a href="#grade-scale" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> NYU Grading Scale Explained
              </a>
              <a href="#calculation-method" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> GPA Calculation Method
              </a>
            </div>
            <div className="space-y-3">
              <a href="#comparison" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> NYU vs Other Universities
              </a>
              <a href="#honors-requirements" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> Latin Honors Requirements
              </a>
              <a href="#improve-gpa" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> How to Improve Your GPA
              </a>
              <a href="#faqs" className="flex items-center gap-2 text-purple-700 hover:text-purple-900 font-semibold hover:underline transition-colors">
                <span>→</span> Frequently Asked Questions
              </a>
            </div>
          </div>
        </div>

        {/* Key Information Box */}
        <div className="bg-gradient-to-r from-purple-100 to-violet-100 border-2 border-purple-300 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            NYU GPA Quick Reference
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Grade Scale */}
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-4">NYU Grade Scale</h3>
              <div className="space-y-2 bg-white rounded-xl p-4 shadow-md">
                {Object.entries(gradeScale).map(([grade, points]) => (
                  <div key={grade} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                    <span className="font-semibold text-gray-900">{grade}</span>
                    <span className="text-purple-700 font-bold">{points.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors Thresholds */}
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-4">Academic Honors</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-600">
                  <div className="font-bold text-purple-900">Summa Cum Laude</div>
                  <div className="text-2xl font-bold text-purple-700">3.900+</div>
                  <div className="text-sm text-gray-600">Highest honors distinction</div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-600">
                  <div className="font-bold text-blue-900">Magna Cum Laude</div>
                  <div className="text-2xl font-bold text-blue-700">3.700+</div>
                  <div className="text-sm text-gray-600">High honors distinction</div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-600">
                  <div className="font-bold text-green-900">Cum Laude</div>
                  <div className="text-2xl font-bold text-green-700">3.500+</div>
                  <div className="text-sm text-gray-600">Honors distinction</div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-teal-600">
                  <div className="font-bold text-teal-900">Dean's List</div>
                  <div className="text-2xl font-bold text-teal-700">3.500+</div>
                  <div className="text-sm text-gray-600">Semester recognition (12+ credits)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Important NYU GPA Facts:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Minimum GPA:</strong> 2.0 required to remain in good academic standing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Dean's List:</strong> Requires 3.5+ GPA with minimum 12 credit hours per semester</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Study Abroad:</strong> Credits earned abroad are typically included in cumulative GPA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Pass/Fail:</strong> P/F courses do not affect GPA calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Grade Replacement:</strong> NYU allows limited grade replacement - check with your advisor</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the NYU GPA Calculator</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Calculating your New York University GPA is simple with our free online calculator. Follow these easy steps to get accurate results in seconds.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Course Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Start by entering the name of each course you've taken at NYU. While course names are optional, they help you keep track of your classes. You can add as many courses as needed using the <strong>"+ Add Course"</strong> button.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Letter Grades</h3>
                <p className="text-gray-700 leading-relaxed">
                  Choose the letter grade you received for each course from the dropdown menu. NYU uses a detailed grading scale including plus/minus grades (A, A-, B+, B, B-, etc.). The calculator automatically converts your letter grade to the corresponding grade point value.
                </p>
                <div className="mt-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Tip:</strong> Make sure to select the exact grade from your transcript, as plus/minus differences affect your GPA significantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Input Credit Hours</h3>
                <p className="text-gray-700 leading-relaxed">
                  Enter the number of credit hours for each course. Most NYU courses are 2-4 credits, but some may be more or less. Credit hours determine how much weight each course has in your overall GPA calculation.
                </p>
                <div className="mt-3 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>📌 Common Credit Hours at NYU:</strong>
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700 ml-4">
                    <li>• Standard lecture course: 4 credits</li>
                    <li>• Seminar or lab: 2-3 credits</li>
                    <li>• Writing intensive course: 4 credits</li>
                    <li>• Independent study: 1-4 credits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-700 leading-relaxed">
                  Click the <strong>"Calculate My NYU GPA"</strong> button to instantly see your results. The calculator will display your cumulative GPA, total credits earned, quality points, and your academic standing status.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Save or Share Your Results</h3>
                <p className="text-gray-700 leading-relaxed">
                  Use the <strong>Print</strong>, <strong>Download</strong>, or <strong>Share</strong> buttons to save your GPA calculation for future reference or share it with advisors, family, or friends.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-300">
            <h3 className="text-lg font-bold text-green-900 mb-3">✅ Pro Tips for Accurate Calculations</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">→</span>
                <span>Use your official NYU transcript to ensure accurate grades and credit hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">→</span>
                <span>Include all courses, even those with lower grades, for an accurate cumulative GPA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">→</span>
                <span>Exclude Pass/Fail courses as they don't count toward your GPA at NYU</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold mt-1">→</span>
                <span>Calculate your GPA each semester to track your academic progress over time</span>
              </li>
            </ul>
          </div>
        </section>

        {/* About NYU GPA System */}
        <section id="about-nyu-gpa" className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the NYU GPA System</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            New York University uses a standard 4.0 GPA scale with detailed plus/minus grading. Understanding how NYU calculates your GPA is essential for tracking your academic progress and planning your educational goals.
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What is GPA?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>GPA (Grade Point Average)</strong> is a numerical representation of your academic performance at NYU. It's calculated by converting your letter grades to grade points, multiplying by credit hours, and dividing by total credits attempted.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Your NYU GPA appears on your transcript and is used for determining academic standing, Dean's List eligibility, graduation honors, graduate school applications, and scholarship opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600">
              <h4 className="text-xl font-bold text-purple-900 mb-3">Cumulative GPA</h4>
              <p className="text-gray-700 leading-relaxed">
                Your <strong>cumulative GPA</strong> includes all courses you've taken at NYU across all semesters. This is the most important GPA for honors, graduation requirements, and grad school applications.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Semester GPA</h4>
              <p className="text-gray-700 leading-relaxed">
                Your <strong>semester GPA</strong> reflects only the courses from a single term. This is used for Dean's List determination and monitoring semester-by-semester progress.
              </p>
            </div>
          </div>
        </section>

        {/* NYU Grading Scale Explained */}
        <section id="grade-scale" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">NYU Grading Scale Explained</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            NYU uses a detailed letter grading system with plus/minus modifiers. Each letter grade corresponds to a specific grade point value used in GPA calculations.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Letter Grade</th>
                  <th className="px-6 py-4 text-left font-bold">Grade Points</th>
                  <th className="px-6 py-4 text-left font-bold">Percentage Range</th>
                  <th className="px-6 py-4 text-left font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">A</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">4.000</td>
                  <td className="px-6 py-4 text-gray-800">93-100%</td>
                  <td className="px-6 py-4 text-gray-800">Excellent</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">A-</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">3.667</td>
                  <td className="px-6 py-4 text-gray-800">90-92%</td>
                  <td className="px-6 py-4 text-gray-800">Excellent</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">B+</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">3.333</td>
                  <td className="px-6 py-4 text-gray-800">87-89%</td>
                  <td className="px-6 py-4 text-gray-800">Good</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">B</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">3.000</td>
                  <td className="px-6 py-4 text-gray-800">83-86%</td>
                  <td className="px-6 py-4 text-gray-800">Good</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">B-</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">2.667</td>
                  <td className="px-6 py-4 text-gray-800">80-82%</td>
                  <td className="px-6 py-4 text-gray-800">Good</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">C+</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">2.333</td>
                  <td className="px-6 py-4 text-gray-800">77-79%</td>
                  <td className="px-6 py-4 text-gray-800">Satisfactory</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">C</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">2.000</td>
                  <td className="px-6 py-4 text-gray-800">73-76%</td>
                  <td className="px-6 py-4 text-gray-800">Satisfactory</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">C-</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">1.667</td>
                  <td className="px-6 py-4 text-gray-800">70-72%</td>
                  <td className="px-6 py-4 text-gray-800">Satisfactory</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">D+</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">1.333</td>
                  <td className="px-6 py-4 text-gray-800">67-69%</td>
                  <td className="px-6 py-4 text-gray-800">Passing</td>
                </tr>
                <tr className="border-b border-purple-200">
                  <td className="px-6 py-4 font-bold text-gray-900">D</td>
                  <td className="px-6 py-4 font-semibold text-purple-700">1.000</td>
                  <td className="px-6 py-4 text-gray-800">65-66%</td>
                  <td className="px-6 py-4 text-gray-800">Passing</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-gray-900">F</td>
                  <td className="px-6 py-4 font-semibold text-red-700">0.000</td>
                  <td className="px-6 py-4 text-gray-800">Below 65%</td>
                  <td className="px-6 py-4 text-gray-800">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
            <h4 className="text-lg font-bold text-yellow-900 mb-2">⚠️ Important Notes About NYU Grades</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span><strong>Pass/Fail courses</strong> do not affect your GPA calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span><strong>Incomplete (I) grades</strong> must be resolved within one year or they convert to F</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span><strong>Withdrawal (W) grades</strong> appear on your transcript but don't affect GPA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold mt-1">•</span>
                <span><strong>Study abroad grades</strong> are typically included in your cumulative GPA</span>
              </li>
            </ul>
          </div>
        </section>

        {/* GPA Calculation Method */}
        <section id="calculation-method" className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How NYU Calculates Your GPA</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Understanding the math behind GPA calculations helps you predict how future grades will impact your cumulative average. Here's the step-by-step formula NYU uses.
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The GPA Formula</h3>
            
            <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-6 mb-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                GPA = Total Quality Points ÷ Total Credit Hours
              </div>
              <p className="text-gray-700">Where: Quality Points = Grade Points × Credit Hours</p>
            </div>

            <h4 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Example:</h4>
            
            <div className="space-y-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                <p className="font-bold text-gray-900 mb-2">Course 1: Intro to Psychology</p>
                <p className="text-gray-700">Grade: A (4.0) × Credits: 4 = <strong>16.0 quality points</strong></p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                <p className="font-bold text-gray-900 mb-2">Course 2: Calculus I</p>
                <p className="text-gray-700">Grade: B+ (3.333) × Credits: 4 = <strong>13.332 quality points</strong></p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                <p className="font-bold text-gray-900 mb-2">Course 3: English Composition</p>
                <p className="text-gray-700">Grade: A- (3.667) × Credits: 3 = <strong>11.001 quality points</strong></p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                <p className="font-bold text-gray-900 mb-2">Course 4: Economics 101</p>
                <p className="text-gray-700">Grade: B (3.0) × Credits: 3 = <strong>9.0 quality points</strong></p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Final Calculation:</h4>
              <div className="space-y-2 text-gray-900">
                <p><strong>Total Quality Points:</strong> 16.0 + 13.332 + 11.001 + 9.0 = <span className="text-purple-700 font-bold">49.333</span></p>
                <p><strong>Total Credit Hours:</strong> 4 + 4 + 3 + 3 = <span className="text-purple-700 font-bold">14</span></p>
                <p className="text-xl font-bold mt-4"><strong>GPA:</strong> 49.333 ÷ 14 = <span className="text-purple-700">3.524</span></p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Why Credit Hours Matter</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Credit hours act as <strong>weights</strong> in your GPA calculation. A 4-credit course has more impact on your GPA than a 2-credit course, even with the same letter grade.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2">High-Credit Course Impact</h4>
                <p className="text-sm text-gray-700">A 4-credit course with an A (4.0) adds 16 quality points to your GPA.</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">Low-Credit Course Impact</h4>
                <p className="text-sm text-gray-700">A 1-credit course with an A (4.0) only adds 4 quality points to your GPA.</p>
              </div>
            </div>
          </div>
        </section>

        {/* NYU vs Other Universities Comparison */}
        <section id="comparison" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">NYU vs Other Universities: GPA System Comparison</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            While most universities use a 4.0 scale, there are differences in how plus/minus grades are calculated. Here's how NYU's GPA system compares to other top institutions.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-violet-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">University</th>
                  <th className="px-6 py-4 text-left font-bold">A Grade</th>
                  <th className="px-6 py-4 text-left font-bold">A- Grade</th>
                  <th className="px-6 py-4 text-left font-bold">B+ Grade</th>
                  <th className="px-6 py-4 text-left font-bold">Scale Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-purple-50">
                  <td className="px-6 py-4 font-bold text-gray-900">NYU</td>
                  <td className="px-6 py-4 text-gray-800">4.000</td>
                  <td className="px-6 py-4 text-gray-800">3.667</td>
                  <td className="px-6 py-4 text-gray-800">3.333</td>
                  <td className="px-6 py-4 text-gray-800">Standard 4.0</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Columbia</td>
                  <td className="px-6 py-4 text-gray-800">4.000</td>
                  <td className="px-6 py-4 text-gray-800">3.667</td>
                  <td className="px-6 py-4 text-gray-800">3.333</td>
                  <td className="px-6 py-4 text-gray-800">Standard 4.0</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Harvard</td>
                  <td className="px-6 py-4 text-gray-800">4.000</td>
                  <td className="px-6 py-4 text-gray-800">3.667</td>
                  <td className="px-6 py-4 text-gray-800">3.333</td>
                  <td className="px-6 py-4 text-gray-800">Standard 4.0</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">USC</td>
                  <td className="px-6 py-4 text-gray-800">4.000</td>
                  <td className="px-6 py-4 text-gray-800">3.700</td>
                  <td className="px-6 py-4 text-gray-800">3.300</td>
                  <td className="px-6 py-4 text-gray-800">Modified 4.0</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Berkeley (UC)</td>
                  <td className="px-6 py-4 text-gray-800">4.000</td>
                  <td className="px-6 py-4 text-gray-800">3.700</td>
                  <td className="px-6 py-4 text-gray-800">3.300</td>
                  <td className="px-6 py-4 text-gray-800">Modified 4.0</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Stanford</td>
                  <td className="px-6 py-4 text-gray-800">4.000</td>
                  <td className="px-6 py-4 text-gray-800">3.700</td>
                  <td className="px-6 py-4 text-gray-800">3.300</td>
                  <td className="px-6 py-4 text-gray-800">Modified 4.0</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">MIT</td>
                  <td className="px-6 py-4 text-gray-800">5.000</td>
                  <td className="px-6 py-4 text-gray-800">4.500</td>
                  <td className="px-6 py-4 text-gray-800">4.000</td>
                  <td className="px-6 py-4 text-gray-800">5.0 Scale</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-purple-900 mb-3">NYU's Approach</h3>
              <p className="text-gray-700 leading-relaxed">
                NYU uses the <strong>standard 4.0 scale</strong> with detailed plus/minus grading (A- = 3.667, B+ = 3.333). This provides more granular assessment of student performance compared to simple letter grades.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Why It Matters</h3>
              <p className="text-gray-700 leading-relaxed">
                When transferring credits or applying to graduate schools, understanding different GPA scales helps you contextualize your academic record. Most grad schools convert all GPAs to a standard scale for fair comparison.
              </p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-400">
            <h3 className="text-lg font-bold text-yellow-900 mb-3">🔄 Calculate Your GPA at Other Schools:</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/usc-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all border-2 border-red-300"
              >
                USC GPA Calculator →
              </button>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all border-2 border-blue-300"
              >
                Berkeley GPA Calculator →
              </button>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all border-2 border-red-300"
              >
                Rutgers GPA Calculator →
              </button>
            </div>
          </div>
        </section>

        {/* Latin Honors Requirements */}
        <section id="honors-requirements" className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Latin Honors & Academic Recognition at NYU</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            NYU recognizes outstanding academic achievement through Latin Honors at graduation and Dean's List recognition each semester. Understanding these requirements helps you set clear academic goals.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Graduation Honors */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🎓</span>
                Graduation Honors
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-lg p-4 border-l-4 border-purple-600">
                  <h4 className="text-lg font-bold text-purple-900 mb-1">Summa Cum Laude</h4>
                  <p className="text-2xl font-bold text-purple-700 mb-2">3.900 - 4.000</p>
                  <p className="text-sm text-gray-700">Highest honor - Top ~5% of graduating class</p>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 border-l-4 border-blue-600">
                  <h4 className="text-lg font-bold text-blue-900 mb-1">Magna Cum Laude</h4>
                  <p className="text-2xl font-bold text-blue-700 mb-2">3.700 - 3.899</p>
                  <p className="text-sm text-gray-700">High honor - Top ~10% of graduating class</p>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4 border-l-4 border-green-600">
                  <h4 className="text-lg font-bold text-green-900 mb-1">Cum Laude</h4>
                  <p className="text-2xl font-bold text-green-700 mb-2">3.500 - 3.699</p>
                  <p className="text-sm text-gray-700">Honor - Top ~25% of graduating class</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Latin Honors are calculated using your cumulative GPA at the time of graduation. Some schools within NYU may have additional requirements.
                </p>
              </div>
            </div>

            {/* Dean's List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">⭐</span>
                Dean's List
              </h3>
              
              <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg p-6 border-l-4 border-teal-600 mb-4">
                <h4 className="text-lg font-bold text-teal-900 mb-2">Requirements:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold mt-1">✓</span>
                    <span><strong>Semester GPA:</strong> 3.500 or higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold mt-1">✓</span>
                    <span><strong>Credit Hours:</strong> Minimum 12 credits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold mt-1">✓</span>
                    <span><strong>Letter Grades:</strong> No P/F courses counted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold mt-1">✓</span>
                    <span><strong>Good Standing:</strong> No academic warnings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2">Benefits of Dean's List:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Appears on official transcript</li>
                  <li>• Recognition letter from Dean</li>
                  <li>• Enhances resume/CV</li>
                  <li>• Shows consistent academic excellence</li>
                  <li>• Considered for scholarships</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Standing Requirements</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                <h4 className="font-bold text-green-900 mb-2">Good Standing</h4>
                <p className="text-2xl font-bold text-green-700 mb-1">2.000+</p>
                <p className="text-sm text-gray-700">Minimum to remain enrolled</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                <h4 className="font-bold text-yellow-900 mb-2">Academic Warning</h4>
                <p className="text-2xl font-bold text-yellow-700 mb-1">1.500 - 1.999</p>
                <p className="text-sm text-gray-700">Probationary status</p>
              </div>

              <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                <h4 className="font-bold text-red-900 mb-2">Academic Probation</h4>
                <p className="text-2xl font-bold text-red-700 mb-1">Below 1.500</p>
                <p className="text-sm text-gray-700">Risk of dismissal</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Improve Your GPA */}
        <section id="improve-gpa" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Your NYU GPA</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Whether you're recovering from a rough semester or aiming for Latin Honors, these strategies can help you boost your GPA at NYU.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-purple-900 mb-4">📚 Academic Strategies</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">1.</span>
                  <span><strong>Focus on high-credit courses:</strong> A grades in 4-credit courses have maximum impact on your GPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">2.</span>
                  <span><strong>Retake failed courses:</strong> NYU allows grade replacement for select courses - check with your advisor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">3.</span>
                  <span><strong>Take manageable course loads:</strong> Don't overload - focus on quality over quantity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">4.</span>
                  <span><strong>Withdraw strategically:</strong> Use the W option before deadlines to avoid F grades</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-blue-900 mb-4">🎯 Success Resources at NYU</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>NYU Tutoring Services:</strong> Free peer tutoring for most courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Writing Center:</strong> One-on-one help with essays and papers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Office Hours:</strong> Meet with professors regularly for clarification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Study Groups:</strong> Collaborate with classmates for better understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Academic Advisors:</strong> Get personalized guidance on course selection</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-400">
            <h3 className="text-xl font-bold text-green-900 mb-4">💡 Quick GPA Improvement Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Short-Term (This Semester):</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Attend every class and participate actively</li>
                  <li>✓ Submit all assignments on time</li>
                  <li>✓ Start studying for exams 2 weeks early</li>
                  <li>✓ Use professor office hours weekly</li>
                  <li>✓ Form study groups with top performers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Long-Term (Future Semesters):</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Choose courses that align with your strengths</li>
                  <li>✓ Balance difficult and easier courses each semester</li>
                  <li>✓ Maintain consistent study schedule</li>
                  <li>✓ Track your GPA after each semester</li>
                  <li>✓ Set specific GPA goals (e.g., Dean's List)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
            <p className="text-gray-700">
              <strong>Need help planning your GPA strategy?</strong> Use our{' '}
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator' as Page)}
                className="text-purple-700 font-bold hover:underline"
              >
                College GPA Calculator
              </button>
              {' '}to project future GPAs based on different grade scenarios.
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs)</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: What GPA do I need to get into NYU?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> NYU's average admitted student GPA is around <strong>3.7-3.9</strong> (unweighted). However, admission is holistic and considers test scores, essays, extracurriculars, and recommendations. Some competitive programs like Stern Business School or Tisch Arts may require even higher GPAs. Use our{' '}
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/admission-tools/college-admissions-calculator' as Page)}
                  className="text-purple-700 font-bold hover:underline"
                >
                  College Admissions Calculator
                </button>
                {' '}to estimate your chances.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: Does NYU use weighted or unweighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> NYU uses an <strong>unweighted 4.0 scale</strong> for its own GPA calculations. However, for admissions, they consider both weighted and unweighted high school GPAs to account for honors, AP, and IB courses. Your NYU transcript will only show unweighted GPAs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: How do I calculate my semester GPA vs cumulative GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> Your <strong>semester GPA</strong> includes only courses from one term, while your <strong>cumulative GPA</strong> includes all courses from all semesters. Both use the same formula (total quality points ÷ total credits). Use our{' '}
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/semester-gpa-calculator' as Page)}
                  className="text-purple-700 font-bold hover:underline"
                >
                  Semester GPA Calculator
                </button>
                {' '}to calculate individual semester GPAs.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: Can I retake courses at NYU to improve my GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> Yes, but with restrictions. NYU allows <strong>limited grade replacement</strong> for courses where you earned a C or lower. Both grades remain on your transcript, but only the higher grade counts toward your GPA. Check with your academic advisor about specific policies for your school (CAS, Stern, Tandon, etc.).
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: Do Pass/Fail courses affect my NYU GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> No. Courses taken <strong>Pass/Fail (P/F)</strong> do not factor into your GPA calculation at NYU. The credits count toward graduation requirements, but P grades don't contribute quality points. This is useful for exploring courses outside your major without GPA risk.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: What happens if my GPA falls below 2.0 at NYU?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> A GPA below 2.0 puts you on <strong>academic probation</strong>. You'll receive academic warning and must meet with an advisor to create an improvement plan. Continued low performance may result in <strong>academic dismissal</strong>. NYU provides support services including tutoring, counseling, and reduced course loads to help students recover.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: How does study abroad affect my NYU GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> For <strong>NYU-sponsored study abroad programs</strong> (including NYU Abu Dhabi, Shanghai, and other global sites), grades typically transfer and are included in your cumulative GPA. For external programs, grade transfer policies vary by your school within NYU. Always confirm with your advisor before studying abroad.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: What GPA do I need for Dean's List at NYU?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> You need a <strong>semester GPA of 3.5 or higher</strong> with a minimum of <strong>12 graded credit hours</strong> to make Dean's List. P/F courses don't count toward the 12-credit minimum. Dean's List designation appears on your official transcript and is determined each semester.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: How do plus/minus grades work at NYU?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> NYU uses <strong>plus/minus grading</strong> where A- = 3.667, B+ = 3.333, B- = 2.667, etc. Note that there is <strong>no A+ grade</strong> at NYU (maximum is A = 4.0). This system provides more precise GPA calculations compared to schools using only letter grades. The plus/minus difference can significantly impact your GPA, especially in high-credit courses.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: What GPA do I need for graduate school from NYU?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> GPA requirements vary by graduate program:
              </p>
              <ul className="mt-3 space-y-2 text-gray-700 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Medical School:</strong> 3.7+ (competitive), 3.5+ minimum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Law School (Top 14):</strong> 3.8+ for Harvard/Yale, 3.5+ for most</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>MBA Programs:</strong> 3.3+ average for top schools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>PhD Programs:</strong> 3.5+ typically required, 3.7+ competitive</span>
                </li>
              </ul>
              <p className="mt-3 text-gray-700">
                Use our{' '}
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/mcat-score-calculator' as Page)}
                  className="text-purple-700 font-bold hover:underline"
                >
                  MCAT Score Calculator
                </button>
                ,{' '}
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/lsat-score-calculator' as Page)}
                  className="text-purple-700 font-bold hover:underline"
                >
                  LSAT Calculator
                </button>
                , or{' '}
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/gmat-score-calculator' as Page)}
                  className="text-purple-700 font-bold hover:underline"
                >
                  GMAT Calculator
                </button>
                {' '}for grad school test prep.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: Is this NYU GPA calculator official?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> This calculator uses NYU's official grading scale (as published on NYU.edu) for accurate GPA calculations. However, it is <strong>not an official NYU tool</strong>. Always verify your official GPA on Albert (NYU's student portal) or your official transcript. Our calculator is designed for planning, estimation, and tracking purposes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Q: How can I check my official NYU GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>A:</strong> Log into <strong>Albert</strong> (NYU's student information system) and navigate to "Student Center" {'->'} "My Academics" {'->'} "View Unofficial Transcript". Your cumulative and semester GPAs appear at the bottom of your transcript. For official transcripts (required for applications), request through the Registrar's Office via Albert.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl border-2 border-blue-400">
            <h3 className="text-xl font-bold text-blue-900 mb-4">🔗 Related GPA Calculators & Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/high-school-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                High School GPA →
              </button>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                College GPA →
              </button>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/semester-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Semester GPA →
              </button>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/csu-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-red-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                CSU GPA →
              </button>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-orange-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                UVA GPA →
              </button>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/lsac-gpa-calculator' as Page)}
                className="px-4 py-3 bg-white text-indigo-700 font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                LSAC GPA →
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Calculate Your NYU GPA?</h2>
          <p className="text-xl mb-6 opacity-90">
            Use our free calculator above to instantly see your Grade Point Average, track Dean's List eligibility, and plan for Latin Honors at graduation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              ⬆️ Back to Calculator
            </button>
            <button
              onClick={() => navigateTo('/blog' as Page)}
              className="px-8 py-4 bg-purple-800 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:bg-purple-900 transform hover:-translate-y-1 transition-all"
            >
              📚 Read Our GPA Guides
            </button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Free • Accurate • No Registration Required • Updated for 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default NYUGPACalculator;
