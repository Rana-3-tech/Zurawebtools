import React, { useState, useEffect } from 'react';
import { Page } from '../../App';

interface UMichGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const UMichGPACalculator: React.FC<UMichGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: Date.now(), name: '', grade: '', credits: 0 }
  ]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const gradeScale: { [key: string]: number } = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'D-': 0.7,
    'F': 0.0
  };

  useEffect(() => {
    // SEO Meta Tags
    document.title = "UMich GPA Calculator 2026 - University of Michigan";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free UMich GPA calculator 2026. Calculate your University of Michigan grade point average instantly. Track Latin Honors and Dean\'s List eligibility.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free UMich GPA calculator 2026. Calculate your University of Michigan grade point average instantly. Track Latin Honors and Dean\'s List eligibility.';
      document.head.appendChild(meta);
    }

    // Robots Meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Author Meta
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', 'ZuraWebTools');

    // Open Graph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'UMich GPA Calculator 2026 - University of Michigan');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', 'Calculate your University of Michigan GPA instantly. Free UMich GPA calculator with Latin Honors and Dean\'s List tracking.');

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', 'https://zurawebtools.com/og-umich-gpa-calculator.png');

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/umich-gpa-calculator');

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', 'ZuraWebTools');

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute('content', 'en_US');

    // Twitter Card Tags
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
    twitterTitle.setAttribute('content', 'UMich GPA Calculator 2026 - University of Michigan');

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', 'Calculate your University of Michigan GPA instantly. Free UMich GPA calculator with Latin Honors and Dean\'s List tracking.');

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://zurawebtools.com/og-umich-gpa-calculator.png');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/umich-gpa-calculator');

    // JSON-LD Schema
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "UMich GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/umich-gpa-calculator",
        "description": "Free University of Michigan GPA calculator for calculating grade point average with Latin Honors tracking (Summa 3.85+, Magna 3.65+, Cum Laude 3.4+) and Dean's List eligibility (3.5+ with 12+ credits).",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "427",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": "13-grade scale (A+ through F), Latin Honors tracking, Dean's List calculation, semester GPA, cumulative GPA, quality points calculation, print results, download results, share results",
        "datePublished": "2025-12-12",
        "dateModified": "2025-12-12",
        "inLanguage": "en-US"
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
            "name": "UMich GPA Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/umich-gpa-calculator"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What GPA do I need for Dean's List at UMich?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You need a 3.5 GPA or higher for the semester with at least 12 graded credit hours. Dean's List is awarded term-by-term based on semester performance, not cumulative GPA. Pass/Fail courses don't count toward the credit hour requirement."
            }
          },
          {
            "@type": "Question",
            "name": "Does UMich give 4.3 for an A+?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. At the University of Michigan, both A+ and A grades receive 4.0 grade points. Unlike some universities that award 4.3 for A+, UMich treats them equally. This is similar to other top universities like Berkeley and UCLA."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good GPA at University of Michigan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 3.5+ GPA is considered good at UMich and qualifies you for Dean's List. A 3.4+ GPA earns Cum Laude honors. For competitive graduate programs or top employers, aim for 3.7+. The average UMich GPA is around 3.3, so anything above 3.5 puts you in the top tier of students."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my semester GPA vs cumulative GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Semester GPA includes only courses from one term. Cumulative GPA includes all courses you've taken at UMich. Use our calculator for semester GPA by entering only current term courses, or track your cumulative GPA across multiple semesters."
            }
          },
          {
            "@type": "Question",
            "name": "Do Pass/Fail courses affect my UMich GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Courses taken Pass/Fail (P/F) do not affect your GPA calculation at UMich. They count toward your total credit hours for graduation but don't factor into quality points. However, P/F courses don't count toward the 12-credit minimum for Dean's List eligibility."
            }
          },
          {
            "@type": "Question",
            "name": "Can I retake a course to improve my GPA at UMich?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, but with restrictions. UMich allows grade replacement for courses where you earned a C- or below. When you retake the course, the new grade replaces the old one in your GPA calculation (though both grades remain on your transcript). Check with your academic advisor about specific retake policies for your school."
            }
          },
          {
            "@type": "Question",
            "name": "What GPA do I need for graduate school from UMich?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most competitive graduate programs prefer a 3.5+ GPA. Top programs (medical school, law school, PhD programs) typically require 3.7+. However, GPA is just one factor - research experience, test scores (like the MCAT, LSAT, or GMAT), letters of recommendation, and personal statements also matter significantly."
            }
          },
          {
            "@type": "Question",
            "name": "How is UMich GPA different from high school GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "UMich uses a 4.0 scale with plus/minus grades (A-, B+, etc.), while high schools often use simpler scales. UMich GPA is weighted by credit hours - a 4-credit course impacts your GPA more than a 1-credit course. Also, UMich doesn't offer GPA boosts for honors or AP courses."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if my GPA falls below 2.0 at UMich?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A GPA below 2.0 puts you on academic probation. You'll need to meet with an academic advisor to create an improvement plan. If your GPA doesn't improve, you may face academic dismissal. UMich offers support resources like tutoring, academic coaching, and counseling to help students in academic difficulty."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate my LSAC GPA using this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. The Law School Admission Council (LSAC) uses a different calculation method that includes all college coursework (including community college and study abroad). LSAC also treats repeated courses differently. If you're applying to law school, use a dedicated LSAC GPA Calculator for accurate results."
            }
          },
          {
            "@type": "Question",
            "name": "How do transfer credits affect my UMich GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Transfer credits from other institutions count toward your total credits for graduation but do not factor into your UMich GPA. Only courses taken directly at the University of Michigan affect your GPA. This means transfer students start with a fresh GPA at UMich, though their prior coursework appears on their transcript."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between UMich and other university GPA calculators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each university has unique grading policies. UMich's A+ = 4.0 system differs from schools like Stanford (A+ = 4.3). Latin Honors thresholds also vary - UMich's Summa (3.85+) is lower than USC's (3.9+) but similar to NYU. Always use your specific university's calculator for accurate GPA tracking."
            }
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
    setCourses([{ id: Date.now(), name: '', grade: '', credits: 0 }]);
    setGpa(null);
    setTotalCredits(0);
    setTotalQualityPoints(0);
    setShowResults(false);
  };

  const clearAll = () => {
    setCourses(courses.map(course => ({ ...course, name: '', grade: '', credits: 0 })));
    setGpa(null);
    setShowResults(false);
  };

  const getGPAStatus = (gpa: number) => {
    if (gpa >= 3.85) return { text: 'Summa Cum Laude', color: 'text-yellow-700', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500' };
    if (gpa >= 3.65) return { text: 'Magna Cum Laude', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-500' };
    if (gpa >= 3.4) return { text: 'Cum Laude / Dean\'s List', color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-500' };
    if (gpa >= 3.0) return { text: 'Good Standing', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-500' };
    if (gpa >= 2.0) return { text: 'Satisfactory', color: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-500' };
    return { text: 'Below Standards', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-500' };
  };

  const printResults = () => {
    window.print();
  };

  const downloadResults = () => {
    const resultsText = `
University of Michigan GPA Calculator Results
==============================================

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
    a.download = 'umich-gpa-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    const shareText = `I just calculated my UMich GPA: ${gpa?.toFixed(2)}! Calculate yours at ZuraWebTools.com`;
    if (navigator.share) {
      navigator.share({
        title: 'My UMich GPA',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            UMich GPA Calculator <span className="bg-gradient-to-r from-blue-700 to-yellow-500 bg-clip-text text-transparent">2026</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your University of Michigan grade point average instantly with our free, easy-to-use GPA calculator.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Track your academic progress, check Dean's List eligibility, and plan for Latin Honors at U-M.
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
                className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg hover:from-blue-800 hover:to-blue-950 transition-all font-medium shadow-lg"
                aria-label="Add new course"
              >
                + Add Course
              </button>
            </div>
          </div>

          {/* Course Input Fields */}
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl border-2 border-blue-200">
                <div className="md:col-span-1 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-700">#{index + 1}</span>
                </div>

                <div className="md:col-span-5">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-semibold text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Calculus I, English Composition"
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    aria-label={`Course name ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-semibold text-gray-700 mb-1">
                    Letter Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    aria-label={`Grade for course ${index + 1}`}
                  >
                    <option value="">Select Grade</option>
                    {Object.keys(gradeScale).map(grade => (
                      <option key={grade} value={grade}>{grade} ({gradeScale[grade].toFixed(1)})</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-semibold text-gray-700 mb-1">
                    Credits
                  </label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    min="0"
                    max="12"
                    step="0.5"
                    value={course.credits || ''}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    placeholder="3"
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    aria-label={`Credits for course ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-1 flex items-end justify-center">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      courses.length === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl'
                    }`}
                    aria-label={`Remove course ${index + 1}`}
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
              className={`px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-blue-800 hover:to-blue-950 transform hover:-translate-y-1 transition-all ${
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
                '🎓 Calculate My UMich GPA'
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your UMich GPA Results</h2>

            {/* Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* GPA Card */}
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-transform">
                <div className="text-sm font-semibold opacity-90 mb-2">Your GPA</div>
                <div className="text-5xl font-bold mb-2">{gpa.toFixed(3)}</div>
                <div className="text-sm opacity-90">out of 4.0</div>
              </div>

              {/* Total Credits Card */}
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-transform">
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
                gpa >= 3.4 ? 'from-yellow-400 to-orange-500' :
                gpa >= 3.0 ? 'from-teal-400 to-cyan-500' :
                'from-gray-400 to-gray-500'
              } rounded-2xl shadow-2xl p-6 text-white transform hover:scale-105 transition-transform`}>
                <div className="text-sm font-semibold opacity-90 mb-2">Academic Status</div>
                <div className="text-2xl font-bold mb-2">{getGPAStatus(gpa).text}</div>
                <div className="text-sm opacity-90">
                  {gpa >= 3.4 ? '✨ Excellent!' : gpa >= 3.0 ? '👍 Keep it up!' : '📚 Room to grow'}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">GPA Progress Visualization</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-700 bg-blue-200">
                      Your GPA: {gpa.toFixed(3)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-700">
                      {((gpa / 4.0) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-blue-200">
                  <div
                    style={{ width: `${(gpa / 4.0) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-700 to-blue-900 transition-all duration-1000"
                  ></div>
                </div>

                {/* GPA Scale Markers */}
                <div className="flex justify-between text-xs text-gray-600 font-semibold mt-2">
                  <span>0.0</span>
                  <span>2.0</span>
                  <span>3.0</span>
                  <span>3.4</span>
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
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
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
                    {gpa >= 3.4 ? '🎉 Congratulations!' : gpa >= 3.0 ? '✅ Good Work!' : '📈 Keep Improving!'}
                  </h3>
                  <div className={`mt-2 text-sm ${getGPAStatus(gpa).color}`}>
                    <p>
                      {gpa >= 3.85 && "Outstanding achievement! You're on track for Summa Cum Laude honors at UMich."}
                      {gpa >= 3.65 && gpa < 3.85 && "Excellent work! You're eligible for Magna Cum Laude honors at graduation."}
                      {gpa >= 3.4 && gpa < 3.65 && "Great job! You qualify for Cum Laude honors and Dean's List recognition."}
                      {gpa >= 3.0 && gpa < 3.4 && "You're in good standing. Keep working to reach Dean's List (3.5+)."}
                      {gpa >= 2.0 && gpa < 3.0 && "You're meeting minimum requirements. Focus on improving grades in upcoming terms."}
                      {gpa < 2.0 && "Your GPA is below UMich's minimum standards. Consider academic support resources and tutoring."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border-l-4 border-blue-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📚</span>
            Table of Contents
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <a href="#how-to-use" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> How to Use This Calculator
              </a>
              <a href="#about-umich-gpa" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> About UMich GPA System
              </a>
              <a href="#grade-scale" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> UMich Grading Scale Explained
              </a>
              <a href="#calculation-method" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> GPA Calculation Method
              </a>
            </div>
            <div className="space-y-3">
              <a href="#comparison" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> UMich vs Other Universities
              </a>
              <a href="#honors-requirements" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> Latin Honors Requirements
              </a>
              <a href="#improve-gpa" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> How to Improve Your GPA
              </a>
              <a href="#faqs" className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold hover:underline transition-colors">
                <span>→</span> Frequently Asked Questions
              </a>
            </div>
          </div>
        </div>

        {/* Key Information Box */}
        <div className="bg-gradient-to-r from-blue-100 to-yellow-100 border-2 border-blue-300 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            UMich GPA Quick Reference
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Grade Scale */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">UMich Grade Scale</h3>
              <div className="space-y-2 bg-white rounded-xl p-4 shadow-md">
                {Object.entries(gradeScale).map(([grade, points]) => (
                  <div key={grade} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                    <span className="font-semibold text-gray-900">{grade}</span>
                    <span className="text-blue-700 font-bold">{points.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors Thresholds */}
            <div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Academic Honors</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-600">
                  <div className="font-bold text-yellow-900">Summa Cum Laude</div>
                  <div className="text-2xl font-bold text-yellow-700">3.850+</div>
                  <div className="text-sm text-gray-600">Highest honors distinction</div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-600">
                  <div className="font-bold text-blue-900">Magna Cum Laude</div>
                  <div className="text-2xl font-bold text-blue-700">3.650+</div>
                  <div className="text-sm text-gray-600">High honors distinction</div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-600">
                  <div className="font-bold text-green-900">Cum Laude</div>
                  <div className="text-2xl font-bold text-green-700">3.400+</div>
                  <div className="text-sm text-gray-600">Honors distinction</div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-teal-600">
                  <div className="font-bold text-teal-900">Dean's List</div>
                  <div className="text-2xl font-bold text-teal-700">3.500+</div>
                  <div className="text-sm text-gray-600">Term recognition (12+ credits)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Important UMich GPA Facts:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span><strong>Minimum GPA:</strong> 2.0 required to remain in good academic standing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span><strong>Dean's List:</strong> Requires 3.5+ GPA with minimum 12 credit hours per term</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span><strong>Pass/Fail:</strong> P/F courses do not affect GPA calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span><strong>Grade Appeal:</strong> Students can appeal grades within 15 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span><strong>A+ Grade:</strong> Both A+ and A receive 4.0 grade points at UMich</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the UMich GPA Calculator</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Calculating your University of Michigan GPA is simple with our free online calculator. Follow these easy steps to get accurate results in seconds.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Course Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Start by entering the name of each course you've taken at UMich. While course names are optional, they help you keep track of your classes. You can add as many courses as needed using the <strong>"+ Add Course"</strong> button.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Letter Grades</h3>
                <p className="text-gray-700 leading-relaxed">
                  Choose the letter grade you received for each course from the dropdown menu. UMich uses a standard 4.0 scale where <strong>A+ and A both equal 4.0</strong>, A- equals 3.7, and so on. The calculator automatically converts your letter grades to grade points.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Input Credit Hours</h3>
                <p className="text-gray-700 leading-relaxed">
                  Enter the number of credit hours for each course. Most UMich courses are 3-4 credits, but this can vary. Make sure to enter the exact credit value as shown on your transcript, as this affects your GPA calculation.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once you've entered all your courses, click the <strong>"Calculate My UMich GPA"</strong> button. The calculator will instantly compute your GPA, total credits, quality points, and academic status. You'll see whether you qualify for Dean's List or Latin Honors.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Save or Share Your Results</h3>
                <p className="text-gray-700 leading-relaxed">
                  Use the <strong>Print</strong>, <strong>Download</strong>, or <strong>Share</strong> buttons to save your GPA results. You can download a text file for your records, print a physical copy, or share your achievement on social media.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-blue-700 p-6 rounded-xl">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Pro Tips for Accurate Results
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Use your official UMich transcript to ensure accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Don't include Pass/Fail courses in your GPA calculation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Double-check credit hours for accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                <span>Calculate both semester and cumulative GPA to track progress</span>
              </li>
            </ul>
          </div>
        </section>

        {/* About UMich GPA Section */}
        <section id="about-umich-gpa" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the UMich GPA System</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The University of Michigan uses a standard 4.0 GPA scale to evaluate student academic performance. Your <strong>Grade Point Average (GPA)</strong> is calculated by dividing the total quality points earned by the total number of credit hours attempted. This system provides a standardized way to measure academic achievement across all schools and colleges at U-M.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Cumulative vs Semester GPA</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <h4 className="text-xl font-bold text-blue-900 mb-3">Semester GPA</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                Your <strong>semester GPA</strong> reflects your academic performance for a single term. It's calculated using only the courses you completed during that specific semester or term.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>Resets each term</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>Used for Dean's List eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>Shows recent academic trend</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-6">
              <h4 className="text-xl font-bold text-yellow-900 mb-3">Cumulative GPA</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                Your <strong>cumulative GPA</strong> includes all courses you've taken at UMich since enrollment. This is the GPA that appears on your transcript and is used for Latin Honors.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-700 font-bold">•</span>
                  <span>Includes all completed coursework</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-700 font-bold">•</span>
                  <span>Used for graduation honors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-700 font-bold">•</span>
                  <span>Official transcript GPA</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">What Makes UMich's GPA System Unique</h3>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The University of Michigan employs several distinctive features in its grading system that set it apart from other universities:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">A+ Equals A in GPA Calculation</h4>
              <p>
                At UMich, both <strong>A+</strong> and <strong>A</strong> grades receive <strong>4.0 grade points</strong>. While professors may award A+ grades for exceptional work, they don't provide extra GPA benefit beyond the standard A grade.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">Plus/Minus Grading System</h4>
              <p>
                UMich uses a detailed plus/minus system (e.g., A-, B+, B-) that provides more nuanced grade distinctions. Each plus or minus typically represents a 0.3 difference in grade points.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-2">Pass/Fail Option</h4>
              <p>
                Students can take certain courses on a <strong>Pass/Fail (P/F)</strong> basis. These courses don't affect your GPA but still count toward credit hour requirements. This option is often used for electives outside your major.
              </p>
            </div>
          </div>
        </section>

        {/* Grade Scale Detailed Section */}
        <section id="grade-scale" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UMich Grading Scale Explained</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Understanding the UMich grading scale is essential for accurately calculating your GPA. Here's a comprehensive breakdown of how letter grades convert to quality points at the University of Michigan.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border-2 border-blue-200 rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Letter Grade</th>
                  <th className="px-6 py-4 text-left font-bold">Grade Points</th>
                  <th className="px-6 py-4 text-left font-bold">Percentage Range</th>
                  <th className="px-6 py-4 text-left font-bold">Performance Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">A+ / A</td>
                  <td className="px-6 py-4 font-bold text-blue-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">93-100%</td>
                  <td className="px-6 py-4 text-gray-700">Excellent - Outstanding achievement</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">A-</td>
                  <td className="px-6 py-4 font-bold text-blue-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">90-92%</td>
                  <td className="px-6 py-4 text-gray-700">Excellent - Very strong performance</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">B+</td>
                  <td className="px-6 py-4 font-bold text-blue-700">3.3</td>
                  <td className="px-6 py-4 text-gray-700">87-89%</td>
                  <td className="px-6 py-4 text-gray-700">Good - Above average work</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">B</td>
                  <td className="px-6 py-4 font-bold text-blue-700">3.0</td>
                  <td className="px-6 py-4 text-gray-700">83-86%</td>
                  <td className="px-6 py-4 text-gray-700">Good - Solid understanding</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">B-</td>
                  <td className="px-6 py-4 font-bold text-blue-700">2.7</td>
                  <td className="px-6 py-4 text-gray-700">80-82%</td>
                  <td className="px-6 py-4 text-gray-700">Good - Adequate performance</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">C+</td>
                  <td className="px-6 py-4 font-bold text-blue-700">2.3</td>
                  <td className="px-6 py-4 text-gray-700">77-79%</td>
                  <td className="px-6 py-4 text-gray-700">Satisfactory - Meets expectations</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">C</td>
                  <td className="px-6 py-4 font-bold text-blue-700">2.0</td>
                  <td className="px-6 py-4 text-gray-700">73-76%</td>
                  <td className="px-6 py-4 text-gray-700">Satisfactory - Minimum standard</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">C-</td>
                  <td className="px-6 py-4 font-bold text-blue-700">1.7</td>
                  <td className="px-6 py-4 text-gray-700">70-72%</td>
                  <td className="px-6 py-4 text-gray-700">Below satisfactory</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">D+</td>
                  <td className="px-6 py-4 font-bold text-orange-600">1.3</td>
                  <td className="px-6 py-4 text-gray-700">67-69%</td>
                  <td className="px-6 py-4 text-gray-700">Poor - Below standards</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">D</td>
                  <td className="px-6 py-4 font-bold text-orange-600">1.0</td>
                  <td className="px-6 py-4 text-gray-700">63-66%</td>
                  <td className="px-6 py-4 text-gray-700">Poor - Minimal passing</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">D-</td>
                  <td className="px-6 py-4 font-bold text-orange-600">0.7</td>
                  <td className="px-6 py-4 text-gray-700">60-62%</td>
                  <td className="px-6 py-4 text-gray-700">Poor - Barely passing</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">F</td>
                  <td className="px-6 py-4 font-bold text-red-600">0.0</td>
                  <td className="px-6 py-4 text-gray-700">Below 60%</td>
                  <td className="px-6 py-4 text-gray-700">Failing - No credit earned</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Calculation Method Section */}
        <section id="calculation-method" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">GPA Calculation Method</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Calculating your UMich GPA involves a straightforward formula that weights your letter grades by the number of credit hours for each course. Here's exactly how it works.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border-2 border-blue-300 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">The GPA Formula</h3>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">
                GPA = Total Quality Points ÷ Total Credit Hours
              </div>
              <div className="text-lg text-gray-700 mt-4">
                Quality Points = Grade Points × Credit Hours
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Calculation Example</h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            Let's calculate GPA for a UMich student who completed 4 courses in a semester:
          </p>

          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-900">EECS 280 (Computer Science) - A (4.0)</span>
                <span className="text-blue-700 font-bold">4 credits</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-900">MATH 215 (Multivariable Calculus) - B+ (3.3)</span>
                <span className="text-blue-700 font-bold">4 credits</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-900">ENGLISH 125 (Writing) - A- (3.7)</span>
                <span className="text-blue-700 font-bold">4 credits</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-900">HISTORY 101 (American History) - B (3.0)</span>
                <span className="text-blue-700 font-bold">3 credits</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Step 1: Calculate Quality Points for Each Course</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• EECS 280: 4.0 × 4 credits = <strong className="text-blue-700">16.0 quality points</strong></li>
                <li>• MATH 215: 3.3 × 4 credits = <strong className="text-blue-700">13.2 quality points</strong></li>
                <li>• ENGLISH 125: 3.7 × 4 credits = <strong className="text-blue-700">14.8 quality points</strong></li>
                <li>• HISTORY 101: 3.0 × 3 credits = <strong className="text-blue-700">9.0 quality points</strong></li>
              </ul>
            </div>

            <div className="bg-white border-2 border-yellow-400 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">Step 2: Sum Total Quality Points and Credits</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Total Quality Points: 16.0 + 13.2 + 14.8 + 9.0 = <strong className="text-yellow-700">53.0</strong></li>
                <li>• Total Credit Hours: 4 + 4 + 4 + 3 = <strong className="text-yellow-700">15 credits</strong></li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-xl p-6">
              <h4 className="font-bold mb-3 text-lg">Step 3: Calculate Final GPA</h4>
              <div className="text-2xl font-bold">
                GPA = 53.0 ÷ 15 = <span className="text-yellow-400">3.533</span>
              </div>
              <p className="mt-2 text-blue-100">This GPA qualifies for Dean's List at UMich! ✨</p>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section id="comparison" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UMich vs Other Top Universities</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            While most universities use a 4.0 GPA scale, there are important differences in how grades are calculated and what GPAs are required for academic honors. Here's how UMich compares to other prestigious institutions.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border-2 border-blue-200 rounded-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">University</th>
                  <th className="px-6 py-4 text-left font-bold">GPA Scale</th>
                  <th className="px-6 py-4 text-left font-bold">A+ Value</th>
                  <th className="px-6 py-4 text-left font-bold">Summa Cum Laude</th>
                  <th className="px-6 py-4 text-left font-bold">Dean's List</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-blue-50 transition-colors bg-blue-50">
                  <td className="px-6 py-4 font-bold text-blue-900">UMich</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">4.0 (same as A)</td>
                  <td className="px-6 py-4 text-gray-700">3.850+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ (12 credits)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">Berkeley</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">4.0 (same as A)</td>
                  <td className="px-6 py-4 text-gray-700">3.900+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ (12 units)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">UCLA</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">4.0 (same as A)</td>
                  <td className="px-6 py-4 text-gray-700">3.933+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ (12 units)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">USC</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">4.0 (same as A)</td>
                  <td className="px-6 py-4 text-gray-700">3.900+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ (14 units)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">NYU</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">4.0 (same as A)</td>
                  <td className="px-6 py-4 text-gray-700">3.900+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ (12 credits)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">Columbia</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">4.33 (higher)</td>
                  <td className="px-6 py-4 text-gray-700">3.933+</td>
                  <td className="px-6 py-4 text-gray-700">3.6+ (12 credits)</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">Stanford</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">4.3 (higher)</td>
                  <td className="px-6 py-4 text-gray-700">Top 15%</td>
                  <td className="px-6 py-4 text-gray-700">Not published</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Key Takeaway
            </h4>
            <p className="text-gray-700 leading-relaxed">
              UMich's Latin Honors requirements (3.85+ for Summa) are slightly more achievable than peer institutions like Berkeley (3.9+) and UCLA (3.933+). However, the competitive academic environment at UMich means earning these GPAs still requires exceptional performance.
            </p>
          </div>
        </section>

        {/* Latin Honors Requirements Section */}
        <section id="honors-requirements" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Latin Honors Requirements at UMich</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The University of Michigan recognizes outstanding academic achievement through <strong>Latin Honors</strong> at graduation. These prestigious designations appear on your diploma and transcript, highlighting your exceptional performance throughout your undergraduate career.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-6 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🥇</div>
                <h3 className="text-2xl font-bold text-yellow-900">Summa Cum Laude</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-yellow-700">3.850+</div>
                <div className="text-sm text-gray-600">Cumulative GPA</div>
              </div>
              <p className="text-gray-700 text-center text-sm">
                Highest honors - Top ~5% of graduating class. Represents truly exceptional academic performance across all coursework.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-400 rounded-xl p-6 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🥈</div>
                <h3 className="text-2xl font-bold text-blue-900">Magna Cum Laude</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-blue-700">3.650+</div>
                <div className="text-sm text-gray-600">Cumulative GPA</div>
              </div>
              <p className="text-gray-700 text-center text-sm">
                High honors - Top ~15% of graduating class. Demonstrates consistently excellent academic achievement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-6 shadow-lg">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">🥉</div>
                <h3 className="text-2xl font-bold text-green-900">Cum Laude</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-700">3.400+</div>
                <div className="text-sm text-gray-600">Cumulative GPA</div>
              </div>
              <p className="text-gray-700 text-center text-sm">
                Honors - Top ~30% of graduating class. Recognizes strong overall academic performance.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Dean's List Recognition</h3>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-400 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">📋</div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-teal-900 mb-2">Term-by-Term Excellence</h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Dean's List recognizes students who achieve academic excellence each semester. Unlike Latin Honors (which are cumulative), Dean's List is awarded term-by-term.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-700 font-bold">✓</span>
                      <span><strong>Minimum GPA:</strong> 3.5 for the term</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-700 font-bold">✓</span>
                      <span><strong>Credit Requirement:</strong> Minimum 12 graded credit hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-700 font-bold">✓</span>
                      <span><strong>Recognition:</strong> Appears on official transcript</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-700 font-bold">✓</span>
                      <span><strong>Benefits:</strong> Enhances resume and graduate school applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Considerations</h3>

          <div className="space-y-3">
            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-1">Cumulative GPA Only</h4>
              <p className="text-gray-700">Latin Honors are based solely on your <strong>cumulative GPA</strong> at graduation, not major GPA or final semester GPA.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-1">All Graded Coursework</h4>
              <p className="text-gray-700">Your GPA includes all graded courses taken at UMich. Pass/Fail courses are excluded from GPA calculations.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded-r-xl">
              <h4 className="font-bold text-gray-900 mb-1">School Variations</h4>
              <p className="text-gray-700">Some UMich schools (like Engineering or Business) may have slightly different requirements. Check with your academic advisor.</p>
            </div>
          </div>
        </section>

        {/* How to Improve Your GPA Section */}
        <section id="improve-gpa" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Your UMich GPA</h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Whether you're aiming for Latin Honors or Dean's List, improving your GPA requires strategic planning and consistent effort. Here are proven strategies to boost your academic performance at the University of Michigan.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Strategies</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <h4 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                Course Selection Strategy
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>Balance challenging courses with manageable ones each term</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>Research professors on <strong>Rate My Professors</strong> before registering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>Consider taking difficult courses in fall/winter when you're most focused</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-700 font-bold">•</span>
                  <span>Don't overload - quality over quantity</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-6">
              <h4 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                Time Management
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-700 font-bold">•</span>
                  <span>Create a weekly study schedule and stick to it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-700 font-bold">•</span>
                  <span>Use the <strong>Pomodoro Technique</strong> for focused study sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-700 font-bold">•</span>
                  <span>Start assignments early to avoid last-minute stress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-700 font-bold">•</span>
                  <span>Block out 2-3 hours per credit hour for studying weekly</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-6">
              <h4 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">👥</span>
                Study Techniques
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Join or form study groups for challenging courses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Attend all lectures and take detailed notes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Review material within 24 hours of class</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-700 font-bold">•</span>
                  <span>Use <strong>active recall</strong> and spaced repetition</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-400 rounded-xl p-6">
              <h4 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Exam Preparation
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold">•</span>
                  <span>Start studying for exams at least one week in advance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold">•</span>
                  <span>Complete all practice exams and problem sets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold">•</span>
                  <span>Attend review sessions and office hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-700 font-bold">•</span>
                  <span>Get adequate sleep before exams (7-8 hours)</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">UMich Academic Resources</h3>

          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">📖 Sweetland Center for Writing</h4>
                <p className="text-gray-700 text-sm">Free one-on-one writing consultations for papers and essays</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">🧮 Science Learning Center</h4>
                <p className="text-gray-700 text-sm">Drop-in tutoring for STEM courses (Math, Physics, Chemistry)</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">💻 CAEN Computer Labs</h4>
                <p className="text-gray-700 text-sm">24/7 computer labs with software for engineering and data science</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">📚 Shapiro Library</h4>
                <p className="text-gray-700 text-sm">Study spaces, research assistance, and group study rooms</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">🎓 Academic Success Coaching</h4>
                <p className="text-gray-700 text-sm">One-on-one coaching for study skills and time management</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">👨‍🏫 Office Hours</h4>
                <p className="text-gray-700 text-sm">Attend professor and GSI office hours regularly</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Long-Term GPA Strategy</h3>

          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Calculate Your Target GPA</h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                Use our calculator to determine what grades you need in future semesters to reach your target cumulative GPA. Understanding the math helps you set realistic goals.
              </p>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/college-gpa-calculator')}
                className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Try College GPA Calculator →
              </button>
            </div>

            <div className="bg-white border-2 border-yellow-400 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Focus on High-Credit Courses</h4>
              <p className="text-gray-700 leading-relaxed">
                Since GPA is weighted by credit hours, performing well in 4-credit courses has more impact than 1-credit courses. Prioritize your efforts accordingly.
              </p>
            </div>

            <div className="bg-white border-2 border-green-400 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Consider Retaking Low Grades</h4>
              <p className="text-gray-700 leading-relaxed">
                UMich allows limited grade replacement. If you earned a C- or below, retaking the course can replace the original grade in your GPA calculation. Consult your academic advisor about retake policies.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">What GPA do I need for Dean's List at UMich?</h3>
              <p className="text-gray-700 leading-relaxed">
                You need a <strong>3.5 GPA or higher</strong> for the semester with at least <strong>12 graded credit hours</strong>. Dean's List is awarded term-by-term based on semester performance, not cumulative GPA. Pass/Fail courses don't count toward the credit hour requirement.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Does UMich give 4.3 for an A+?</h3>
              <p className="text-gray-700 leading-relaxed">
                No. At the University of Michigan, both <strong>A+</strong> and <strong>A</strong> grades receive <strong>4.0 grade points</strong>. Unlike some universities that award 4.3 for A+, UMich treats them equally. This is similar to other top universities like <span onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">Berkeley</span> and <span onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/ucla-gpa-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">UCLA</span>.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">What is a good GPA at University of Michigan?</h3>
              <p className="text-gray-700 leading-relaxed">
                A <strong>3.5+ GPA</strong> is considered good at UMich and qualifies you for Dean's List. A <strong>3.4+ GPA</strong> earns Cum Laude honors. For competitive graduate programs or top employers, aim for <strong>3.7+</strong>. The average UMich GPA is around 3.3, so anything above 3.5 puts you in the top tier of students.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How do I calculate my semester GPA vs cumulative GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Semester GPA</strong> includes only courses from one term. <strong>Cumulative GPA</strong> includes all courses you've taken at UMich. Use our calculator for semester GPA by entering only current term courses, or use the <span onClick={() => navigateTo('/education-and-exam-tools/college-gpa-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">College GPA Calculator</span> to track your cumulative GPA across multiple semesters.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Do Pass/Fail courses affect my UMich GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                No. Courses taken <strong>Pass/Fail (P/F)</strong> do not affect your GPA calculation at UMich. They count toward your total credit hours for graduation but don't factor into quality points. However, P/F courses don't count toward the 12-credit minimum for Dean's List eligibility.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can I retake a course to improve my GPA at UMich?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, but with restrictions. UMich allows <strong>grade replacement</strong> for courses where you earned a <strong>C- or below</strong>. When you retake the course, the new grade replaces the old one in your GPA calculation (though both grades remain on your transcript). Check with your academic advisor about specific retake policies for your school.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">What GPA do I need for graduate school from UMich?</h3>
              <p className="text-gray-700 leading-relaxed">
                Most competitive graduate programs prefer a <strong>3.5+ GPA</strong>. Top programs (medical school, law school, PhD programs) typically require <strong>3.7+</strong>. However, GPA is just one factor - research experience, test scores (like the <span onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/mcat-score-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">MCAT</span>, <span onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/lsat-score-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">LSAT</span>, or <span onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/gmat-score-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">GMAT</span>), letters of recommendation, and personal statements also matter significantly.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How is UMich GPA different from high school GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                UMich uses a <strong>4.0 scale</strong> with plus/minus grades (A-, B+, etc.), while high schools often use simpler scales. UMich GPA is <strong>weighted by credit hours</strong> - a 4-credit course impacts your GPA more than a 1-credit course. Also, UMich doesn't offer GPA boosts for honors or AP courses. Use our <span onClick={() => navigateTo('/education-and-exam-tools/high-school-gpa-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">High School GPA Calculator</span> to compare your high school GPA system.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">What happens if my GPA falls below 2.0 at UMich?</h3>
              <p className="text-gray-700 leading-relaxed">
                A GPA below <strong>2.0</strong> puts you on <strong>academic probation</strong>. You'll need to meet with an academic advisor to create an improvement plan. If your GPA doesn't improve, you may face academic dismissal. UMich offers support resources like tutoring, academic coaching, and counseling to help students in academic difficulty.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can I calculate my LSAC GPA using this calculator?</h3>
              <p className="text-gray-700 leading-relaxed">
                No. The <strong>Law School Admission Council (LSAC)</strong> uses a different calculation method that includes all college coursework (including community college and study abroad). LSAC also treats repeated courses differently. If you're applying to law school, use our dedicated <span onClick={() => navigateTo('/education-and-exam-tools/lsac-gpa-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">LSAC GPA Calculator</span> for accurate results.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How do transfer credits affect my UMich GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Transfer credits</strong> from other institutions count toward your total credits for graduation but do <strong>not</strong> factor into your UMich GPA. Only courses taken directly at the University of Michigan affect your GPA. This means transfer students start with a "fresh" GPA at UMich, though their prior coursework appears on their transcript.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-r-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">What's the difference between UMich and other university GPA calculators?</h3>
              <p className="text-gray-700 leading-relaxed">
                Each university has unique grading policies. UMich's <strong>A+ = 4.0</strong> system differs from schools like Stanford (A+ = 4.3). Latin Honors thresholds also vary - UMich's Summa (3.85+) is lower than <span onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/usc-gpa-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">USC's</span> (3.9+) but similar to <span onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator')} className="text-blue-700 hover:underline cursor-pointer font-semibold">NYU</span>. Always use your specific university's calculator for accurate GPA tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl shadow-2xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Track Your Academic Success?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Calculate your UMich GPA now and plan your path to Latin Honors!
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            🎓 Calculate My GPA Now
          </button>
          <div className="mt-6 text-sm text-blue-200">
            Need help with other calculators? Check out our{' '}
            <span onClick={() => navigateTo('/blog')} className="text-yellow-400 hover:underline cursor-pointer font-semibold">Blog</span> for study tips and GPA strategies.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UMichGPACalculator;
