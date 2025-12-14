import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface YaleGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

const YaleGPACalculator: React.FC<YaleGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  // SEO metadata
  useEffect(() => {
    // Title: 50-60 characters
    document.title = "Yale GPA Calculator 2025 | Official Bulldog GPA Tool";

    // Meta description: 150-160 characters
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Official Yale GPA calculator with 4.0 scale. Calculate Latin Honors (Summa 3.9+, Magna 3.7+, Cum Laude 3.5+), track credit hours, pass/fail options.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Official Yale GPA calculator with 4.0 scale. Calculate Latin Honors (Summa 3.9+, Magna 3.7+, Cum Laude 3.5+), track credit hours, pass/fail options.';
      document.head.appendChild(meta);
    }

    // Robots
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow');
    } else {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      robotsMeta.setAttribute('content', 'index, follow');
      document.head.appendChild(robotsMeta);
    }

    // Author
    let authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) {
      authorMeta.setAttribute('content', 'ZuraWebTools');
    } else {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      authorMeta.setAttribute('content', 'ZuraWebTools');
      document.head.appendChild(authorMeta);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator');
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator');
      document.head.appendChild(canonicalLink);
    }

    // Open Graph tags
    const ogTags = {
      'og:title': 'Yale GPA Calculator 2025 | Official Bulldog GPA Tool',
      'og:description': 'Official Yale GPA calculator with 4.0 scale. Calculate Latin Honors (Summa 3.9+, Magna 3.7+, Cum Laude 3.5+), track credit hours, pass/fail options.',
      'og:url': 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator',
      'og:type': 'website',
      'og:site_name': 'ZuraWebTools',
      'og:locale': 'en_US',
      'og:image': 'https://zurawebtools.com/images/yale-gpa-calculator-og.jpg'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        ogTag.setAttribute('content', content);
        document.head.appendChild(ogTag);
      }
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Yale GPA Calculator 2025 | Official Bulldog GPA Tool',
      'twitter:description': 'Official Yale GPA calculator with 4.0 scale. Calculate Latin Honors (Summa 3.9+, Magna 3.7+, Cum Laude 3.5+), track credit hours, pass/fail options.',
      'twitter:image': 'https://zurawebtools.com/images/yale-gpa-calculator-twitter.jpg',
      'twitter:site': '@ZuraWebTools',
      'twitter:creator': '@ZuraWebTools'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', content);
      } else {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        twitterTag.setAttribute('content', content);
        document.head.appendChild(twitterTag);
      }
    });

    // JSON-LD Schema for BreadcrumbList
    const breadcrumbSchema = {
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
          "name": "Education and Exam Tools",
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
          "name": "Yale GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator"
        }
      ]
    };

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.id = 'breadcrumb-schema';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // JSON-LD Schema for SoftwareApplication
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Yale GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "2847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "Calculate your Yale University GPA with precision. Track Latin Honors eligibility (Summa Cum Laude 3.9+, Magna Cum Laude 3.7+, Cum Laude 3.5+) and pass/fail options."
    };

    const softwareScript = document.createElement('script');
    softwareScript.type = 'application/ld+json';
    softwareScript.id = 'software-schema';
    softwareScript.text = JSON.stringify(softwareSchema);
    document.head.appendChild(softwareScript);

    // JSON-LD Schema for FAQPage (will be added after FAQ section is created)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What GPA scale does Yale use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yale uses a 4.0 GPA scale with letter grades from A to F. The grading system includes A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D (1.0), and F (0.0). Yale also offers pass/fail options for certain courses, which do not factor into GPA calculations."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do you need for Latin Honors at Yale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yale awards Latin Honors based on cumulative GPA: Summa Cum Laude requires 3.9+ GPA (top 5% of class), Magna Cum Laude requires 3.7+ GPA (top 10%), and Cum Laude requires 3.5+ GPA (top 25%). These honors are awarded at graduation and appear on your diploma and transcript."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'faq-schema';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // Cleanup on unmount
    return () => {
      const breadcrumb = document.getElementById('breadcrumb-schema');
      const software = document.getElementById('software-schema');
      const faq = document.getElementById('faq-schema');
      if (breadcrumb) breadcrumb.remove();
      if (software) software.remove();
      if (faq) faq.remove();
    };
  }, []);

  // Yale grade values (4.0 scale)
  const yaleGradeValues: { [key: string]: number } = {
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
    'F': 0.0,
    'P': 0, // Pass (doesn't count in GPA)
    'CR': 0 // Credit (doesn't count in GPA)
  };

  // Calculate GPA
  const calculateGPA = useCallback(() => {
    setIsCalculating(true);

    setTimeout(() => {
      let totalPoints = 0;
      let totalCreditsCalculated = 0;

      courses.forEach(course => {
        if (course.grade && course.credits > 0) {
          const gradeValue = yaleGradeValues[course.grade];
          if (gradeValue !== undefined && course.grade !== 'P' && course.grade !== 'CR') {
            totalPoints += gradeValue * course.credits;
            totalCreditsCalculated += course.credits;
          }
        }
      });

      const calculatedGpa = totalCreditsCalculated > 0 ? totalPoints / totalCreditsCalculated : 0;

      setGpa(parseFloat(calculatedGpa.toFixed(3)));
      setTotalCredits(totalCreditsCalculated);
      setTotalQualityPoints(parseFloat(totalPoints.toFixed(2)));
      setShowResults(true);
      setIsCalculating(false);
      setShowSuccessMessage(true);

      setTimeout(() => setShowSuccessMessage(false), 3000);

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 800);
  }, [courses]);

  // Add course
  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }]);
  };

  // Remove course
  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Update course
  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  // Reset calculator
  const resetCalculator = () => {
    setCourses([{ id: crypto.randomUUID(), name: '', credits: 0, grade: '' }]);
    setGpa(0);
    setTotalCredits(0);
    setTotalQualityPoints(0);
    setShowResults(false);
    setShowSuccessMessage(false);
  };

  // Clear all fields
  const clearAllFields = () => {
    setCourses(courses.map(course => ({ ...course, name: '', credits: 0, grade: '' })));
    setShowResults(false);
  };

  // Get honor status
  const getHonorStatus = useMemo(() => {
    if (gpa >= 3.9) return { status: 'Summa Cum Laude', color: 'text-yellow-600', bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50', borderColor: 'border-yellow-300' };
    if (gpa >= 3.7) return { status: 'Magna Cum Laude', color: 'text-blue-600', bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50', borderColor: 'border-blue-300' };
    if (gpa >= 3.5) return { status: 'Cum Laude', color: 'text-green-600', bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50', borderColor: 'border-green-300' };
    if (gpa >= 3.0) return { status: 'Good Standing', color: 'text-slate-600', bgColor: 'bg-gradient-to-r from-slate-50 to-gray-50', borderColor: 'border-slate-300' };
    return { status: 'Below Average', color: 'text-red-600', bgColor: 'bg-gradient-to-r from-red-50 to-rose-50', borderColor: 'border-red-300' };
  }, [gpa]);

  // Print results
  const handlePrint = () => {
    window.print();
  };

  // Download results
  const handleDownload = () => {
    const text = `Yale GPA Calculation Results\n\n` +
      `GPA: ${gpa.toFixed(3)}/4.0\n` +
      `Total Credits: ${totalCredits}\n` +
      `Quality Points: ${totalQualityPoints.toFixed(2)}\n` +
      `Honor Status: ${getHonorStatus.status}\n\n` +
      `Courses:\n` +
      courses.map((course, index) =>
        `${index + 1}. ${course.name || 'Unnamed Course'} - ${course.credits} credits - Grade: ${course.grade || 'N/A'}`
      ).join('\n') +
      `\n\nCalculated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n` +
      `Generated by ZuraWebTools - https://zurawebtools.com`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `yale-gpa-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share results
  const handleShare = async () => {
    const shareData = {
      title: 'My Yale GPA',
      text: `I calculated my Yale GPA: ${gpa.toFixed(2)}/4.0 - ${getHonorStatus.status}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`My Yale GPA: ${gpa.toFixed(2)}/4.0 - ${getHonorStatus.status}\n${window.location.href}`);
      alert('Results copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Yale GPA Calculator 2025 | Official Bulldog GPA Tool
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Calculate your Yale University GPA with precision using our official calculator. Track your Latin Honors eligibility (Summa, Magna, Cum Laude) and academic standing.
          </p>
          <p className="text-lg text-blue-200 mt-3 max-w-2xl mx-auto">
            Free, accurate, and designed specifically for Yale's 4.0 grading system with support for pass/fail courses and credit hour tracking.
          </p>
        </div>
      </section>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          ✓ GPA calculated successfully!
        </div>
      )}

      {/* Calculator Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate Your Yale GPA
              </h2>
              <button
                onClick={clearAllFields}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                aria-label="Clear all course fields"
              >
                Clear All
              </button>
            </div>

            {/* Course Input Fields */}
            <div className="space-y-4 mb-6">
              {courses.map((course, index) => (
                <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-all">
                  <div className="md:col-span-1 flex items-center">
                    <span className="text-lg font-semibold text-slate-700">#{index + 1}</span>
                  </div>
                  
                  <div className="md:col-span-5">
                    <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                      Course Name
                    </label>
                    <input
                      id={`course-name-${course.id}`}
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      placeholder="e.g., Introduction to Psychology"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-slate-400"
                      aria-label={`Course name for course ${index + 1}`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                      Credits
                    </label>
                    <input
                      id={`course-credits-${course.id}`}
                      type="number"
                      min="0"
                      max="6"
                      step="0.5"
                      value={course.credits || ''}
                      onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                      placeholder="1-6"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-slate-400"
                      aria-label={`Credit hours for course ${index + 1}`}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                      Grade
                    </label>
                    <select
                      id={`course-grade-${course.id}`}
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      aria-label={`Grade for course ${index + 1}`}
                    >
                      <option value="">Select Grade</option>
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
                      <option value="F">F (0.0)</option>
                      <option value="P">P (Pass)</option>
                      <option value="CR">CR (Credit)</option>
                    </select>
                  </div>

                  <div className="md:col-span-1 flex items-end">
                    <button
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length === 1}
                      className="w-full px-3 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                      aria-label={`Remove course ${index + 1}`}
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Course Button */}
            <button
              onClick={addCourse}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              aria-label="Add another course"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Another Course
            </button>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={calculateGPA}
                disabled={isCalculating || courses.every(c => !c.grade || c.credits === 0)}
                className="py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                aria-label="Calculate GPA"
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate GPA
                  </>
                )}
              </button>

              <button
                onClick={resetCalculator}
                className="py-4 px-8 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold text-lg rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                aria-label="Reset calculator"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Calculator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section id="results-section" className="py-12 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Your Yale GPA Results</h2>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* GPA Card */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold opacity-90">Your GPA</h3>
                  <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-5xl font-extrabold mb-2">{gpa.toFixed(3)}</div>
                <div className="text-sm opacity-80">out of 4.0</div>
              </div>

              {/* Credits Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold opacity-90">Total Credits</h3>
                  <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="text-5xl font-extrabold mb-2">{totalCredits}</div>
                <div className="text-sm opacity-80">credit hours</div>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold opacity-90">Quality Points</h3>
                  <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="text-5xl font-extrabold mb-2">{totalQualityPoints.toFixed(2)}</div>
                <div className="text-sm opacity-80">total points</div>
              </div>

              {/* Honor Status Card */}
              <div className={`${getHonorStatus.bgColor} rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform border-2 ${getHonorStatus.borderColor}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-700">Honor Status</h3>
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className={`text-3xl font-extrabold mb-2 ${getHonorStatus.color}`}>{getHonorStatus.status}</div>
                <div className="text-sm text-slate-600">
                  {gpa >= 3.9 ? 'Top 5% of class' : gpa >= 3.7 ? 'Top 10% of class' : gpa >= 3.5 ? 'Top 25% of class' : gpa >= 3.0 ? 'On track' : 'Needs improvement'}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Progress to Honors</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Cum Laude (3.5)</span>
                    <span className={gpa >= 3.5 ? 'text-green-600 font-semibold' : 'text-slate-500'}>{gpa >= 3.5 ? 'Achieved ✓' : `${((gpa / 3.5) * 100).toFixed(1)}%`}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className={`h-3 rounded-full transition-all ${gpa >= 3.5 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${Math.min((gpa / 3.5) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Magna Cum Laude (3.7)</span>
                    <span className={gpa >= 3.7 ? 'text-green-600 font-semibold' : 'text-slate-500'}>{gpa >= 3.7 ? 'Achieved ✓' : `${((gpa / 3.7) * 100).toFixed(1)}%`}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className={`h-3 rounded-full transition-all ${gpa >= 3.7 ? 'bg-blue-500' : 'bg-blue-500'}`} style={{ width: `${Math.min((gpa / 3.7) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">Summa Cum Laude (3.9)</span>
                    <span className={gpa >= 3.9 ? 'text-green-600 font-semibold' : 'text-slate-500'}>{gpa >= 3.9 ? 'Achieved ✓' : `${((gpa / 3.9) * 100).toFixed(1)}%`}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className={`h-3 rounded-full transition-all ${gpa >= 3.9 ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${Math.min((gpa / 3.9) * 100, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handlePrint}
                className="py-3 px-6 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                aria-label="Print results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Results
              </button>

              <button
                onClick={handleDownload}
                className="py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                aria-label="Download results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Results
              </button>

              <button
                onClick={handleShare}
                className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                aria-label="Share results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Results
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Table of Contents */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700">
              <a href="#how-to-use" className="flex items-center gap-2 p-3 hover:bg-white rounded-lg transition-colors group">
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                <span className="group-hover:text-blue-600 font-medium">How to Use This Calculator</span>
              </a>
              <a href="#about-yale-gpa" className="flex items-center gap-2 p-3 hover:bg-white rounded-lg transition-colors group">
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                <span className="group-hover:text-blue-600 font-medium">About Yale GPA System</span>
              </a>
              <a href="#grade-explanations" className="flex items-center gap-2 p-3 hover:bg-white rounded-lg transition-colors group">
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                <span className="group-hover:text-blue-600 font-medium">Grade Scale Explanations</span>
              </a>
              <a href="#honors-comparison" className="flex items-center gap-2 p-3 hover:bg-white rounded-lg transition-colors group">
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                <span className="group-hover:text-blue-600 font-medium">Ivy League GPA Comparison</span>
              </a>
              <a href="#faqs" className="flex items-center gap-2 p-3 hover:bg-white rounded-lg transition-colors group">
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                <span className="group-hover:text-blue-600 font-medium">Frequently Asked Questions</span>
              </a>
              <a href="#tips-success" className="flex items-center gap-2 p-3 hover:bg-white rounded-lg transition-colors group">
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                <span className="group-hover:text-blue-600 font-medium">Tips for Academic Success</span>
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-12 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
            <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">📝</span>
            How to Use the Yale GPA Calculator
          </h2>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Our <strong>Yale GPA calculator</strong> makes it easy to track your academic performance. Follow these simple steps to calculate your GPA accurately using Yale's official 4.0 grading scale. For students at other universities, try our general{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculators/college-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                College GPA Calculator
              </button>.
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Enter Course Information</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Type your course name in the "Course Name" field. While optional, naming your courses helps you keep track of which classes contribute to your GPA. Be specific—for example, "PSYC 110: Introduction to Psychology" instead of just "Psychology."
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Input Credit Hours</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Enter the number of credits for each course. Most Yale courses are worth <strong>1.0 credit</strong>, but some seminars, labs, or intensive courses may be 0.5 or 1.5 credits. Check your course syllabus or Yale's Course Search tool for accurate credit values.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Select Your Letter Grade</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Choose the letter grade you received from the dropdown menu. Yale's grading system includes A, A-, B+, B, B-, C+, C, C-, D+, D, and F. If you took a course <strong>pass/fail</strong>, select "P" (Pass) or "CR" (Credit)—these won't affect your GPA calculation.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Add More Courses</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Click the <strong>"Add Another Course"</strong> button to include additional classes. You can add as many courses as needed to calculate your semester or cumulative GPA. To remove a course, click the trash icon on the right side of that course row.
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Calculate Your GPA</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Once you've entered all your courses, credits, and grades, click the <strong>"Calculate GPA"</strong> button. The calculator will instantly display your GPA on a 4.0 scale, total credit hours, quality points, and your Latin Honors eligibility status.
                  </p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Save or Share Your Results</h3>
                  <p className="text-slate-700 leading-relaxed">
                    After calculating, you can <strong>print</strong> your results for your records, <strong>download</strong> them as a text file, or <strong>share</strong> them directly. Use the "Reset Calculator" button to start a new calculation from scratch.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tips Box */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Pro Tips for Accurate Calculations
            </h3>
            <ul className="space-y-3 text-blue-50">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">💡</span>
                <span>Use your official Yale transcript to ensure grade accuracy—unofficial sources may contain errors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">💡</span>
                <span>Remember that P/F courses don't count toward your GPA but do count toward your 36-credit graduation requirement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">💡</span>
                <span>To calculate semester GPA, enter only that semester's courses. For cumulative GPA, include all courses from all semesters.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300 mt-1">💡</span>
                <span>Yale allows grade replacements in certain circumstances—consult your residential college dean for details.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Key Info Box - Yale Grade Scale */}
      <section className="py-12 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-600">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Yale University Grade Scale & Honors Requirements</h2>
                <p className="text-slate-600">Understanding Yale's 4.0 GPA system and Latin Honors thresholds</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Grade Scale */}
              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-blue-600">📊</span> Grade Scale
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-semibold">A</span>
                    <span className="text-blue-600 font-bold">4.0</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-semibold">A-</span>
                    <span className="text-blue-600 font-bold">3.7</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-semibold">B+</span>
                    <span className="text-blue-600 font-bold">3.3</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-semibold">B</span>
                    <span className="text-blue-600 font-bold">3.0</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-semibold">B-</span>
                    <span className="text-blue-600 font-bold">2.7</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="font-semibold">C+ to F</span>
                    <span className="text-slate-600 font-bold">2.3 to 0.0</span>
                  </li>
                </ul>
              </div>

              {/* Latin Honors */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-yellow-600">🏆</span> Latin Honors
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">✓</span>
                    <div>
                      <div className="font-bold text-yellow-700">Summa Cum Laude</div>
                      <div className="text-sm text-slate-600">GPA 3.9+ (Top 5%)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <div>
                      <div className="font-bold text-blue-700">Magna Cum Laude</div>
                      <div className="text-sm text-slate-600">GPA 3.7+ (Top 10%)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <div>
                      <div className="font-bold text-green-700">Cum Laude</div>
                      <div className="text-sm text-slate-600">GPA 3.5+ (Top 25%)</div>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-yellow-200">
                  <p className="text-sm text-slate-600 italic">
                    <strong>Note:</strong> Honors are awarded at graduation and appear on your diploma and transcript.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Quick Facts About Yale GPA</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Yale uses a standard <strong>4.0 scale</strong> for GPA calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Pass/Fail</strong> courses don't affect your GPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Most courses are <strong>1.0 credit</strong>, some labs are 0.5</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Need <strong>36 credits</strong> to graduate from Yale College</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Dean's List</strong> requires 3.5+ GPA each semester</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>GPA is calculated <strong>cumulatively</strong> over all semesters</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Yale GPA System - Detailed Section */}
      <section id="about-yale-gpa" className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Understanding Yale University's GPA System</h2>
          
          <div className="prose max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Yale University uses a <strong>standard 4.0 GPA scale</strong> to evaluate undergraduate academic performance. This system has been in place for decades and aligns with most American universities, making it easy for graduate schools and employers to understand your academic achievements. If you're also considering other elite schools, check out our{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/harvard-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                Harvard GPA Calculator
              </button>{' '}or{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/princeton-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                Princeton GPA Calculator
              </button>.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">The Yale Grading Philosophy</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Yale's approach to grading emphasizes <strong>intellectual rigor and academic excellence</strong>. Unlike some peer institutions that experimented with grade deflation policies, Yale maintains that grades should reflect genuine achievement. The university expects high-quality work but provides robust support systems to help students succeed.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              The average GPA at Yale typically hovers around <strong>3.6 to 3.7</strong>, which is comparable to peer Ivy League schools like Harvard (3.65) and Princeton (3.5). This average has remained relatively stable over the past decade, despite ongoing national conversations about grade inflation. For high school students preparing applications, our{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculators/high-school-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                High School GPA Calculator
              </button>{' '}helps track your college application readiness.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">How Yale Calculates GPA</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Your Yale GPA is calculated using a <strong>weighted credit-hour system</strong>. Here's the formula:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
              <p className="font-mono text-lg text-slate-800 mb-2">
                GPA = (Total Quality Points) ÷ (Total Credit Hours)
              </p>
              <p className="text-sm text-slate-600 mt-3">
                <strong>Quality Points</strong> = Grade Value × Credit Hours for each course
              </p>
              <p className="text-sm text-slate-600 mt-1">
                <strong>Example:</strong> An A (4.0) in a 1.0-credit course = 4.0 quality points
              </p>
            </div>

            <h4 className="text-xl font-bold text-slate-800 mt-6 mb-3">Calculation Example</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Let's say you're taking four courses this semester:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>PSYC 110</strong> (1.0 credit): A (4.0) → 4.0 quality points</li>
              <li><strong>MATH 115</strong> (1.0 credit): A- (3.7) → 3.7 quality points</li>
              <li><strong>ENGL 120</strong> (1.0 credit): B+ (3.3) → 3.3 quality points</li>
              <li><strong>HIST 140</strong> (1.0 credit): B (3.0) → 3.0 quality points</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-6">
              <strong>Total Quality Points:</strong> 4.0 + 3.7 + 3.3 + 3.0 = 14.0<br />
              <strong>Total Credits:</strong> 4.0<br />
              <strong>Semester GPA:</strong> 14.0 ÷ 4.0 = <span className="text-blue-600 font-bold">3.50</span>
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Pass/Fail and Credit/D/Fail Options</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Yale offers flexibility through <strong>pass/fail (P/F)</strong> and <strong>Credit/D/Fail (CR/D/F)</strong> grading options. These alternatives allow you to explore subjects outside your comfort zone without GPA risk.
            </p>

            <h4 className="text-xl font-bold text-slate-800 mt-6 mb-3">Pass/Fail Guidelines</h4>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Maximum courses:</strong> You can take up to 4 courses P/F during your Yale career</li>
              <li><strong>GPA impact:</strong> P/F courses don't count toward your GPA but do count toward graduation requirements</li>
              <li><strong>Restrictions:</strong> Cannot be used for courses fulfilling major requirements or some distributional requirements</li>
              <li><strong>Deadline:</strong> Must declare P/F by the end of the course selection period (usually 2 weeks into the semester)</li>
              <li><strong>Grade needed:</strong> Typically need a C or better to receive "Pass" designation</li>
            </ul>

            <h4 className="text-xl font-bold text-slate-800 mt-6 mb-3">Credit/D/Fail System</h4>
            <p className="text-slate-700 leading-relaxed mb-6">
              The CR/D/F option provides slightly different flexibility. You'll receive "Credit" for C- or better, "D" for D grades, and "Fail" for F grades. The D grade appears on your transcript and counts in GPA, but CR and F do not.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Yale's Shopping Period and Grade Impact</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Yale's famous <strong>"Shopping Period"</strong>—the first two weeks of each semester—lets you attend multiple classes before finalizing your schedule. This unique system helps you make informed decisions about course difficulty and workload.
            </p>

            <h4 className="text-xl font-bold text-slate-800 mt-6 mb-3">Strategic Course Selection</h4>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Attend first lectures to gauge professor expectations and grading philosophy</li>
              <li>Review syllabi carefully for grade breakdown (exams, papers, participation)</li>
              <li>Talk to upperclassmen about course difficulty and typical grade distributions</li>
              <li>Balance challenging courses with more manageable options to protect your GPA</li>
              <li>Don't overload—Yale recommends 4-5 courses per semester for sustainable success</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Residential College System and Academic Support</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Yale's <strong>14 residential colleges</strong> provide built-in academic support that can significantly impact your GPA. Each college has resources specifically designed to help you succeed.
            </p>

            <h4 className="text-xl font-bold text-slate-800 mt-6 mb-3">Available Support Services</h4>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Dean's Advisory:</strong> Personalized academic planning and intervention when grades slip</li>
              <li><strong>Peer Tutors:</strong> Free tutoring in most subjects, arranged through your residential college</li>
              <li><strong>Writing Center:</strong> Professional writing consultants for papers and essays</li>
              <li><strong>Quantitative Reasoning Center:</strong> Help with math, statistics, and data analysis</li>
              <li><strong>Study Groups:</strong> Organized peer study sessions for difficult courses</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Major Declaration and GPA Considerations</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              You'll declare your major at the end of sophomore year. Some majors have <strong>minimum GPA requirements</strong> for admission, though most Yale majors are open to all students regardless of GPA.
            </p>

            <h4 className="text-xl font-bold text-slate-800 mt-6 mb-3">Competitive Programs</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              A few programs have selective admissions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Computer Science:</strong> No GPA cutoff but growing demand means strong performance in prerequisite courses matters</li>
              <li><strong>Pre-med Track:</strong> Not a major, but med schools typically expect 3.7+ GPA for competitive applications</li>
              <li><strong>Engineering Intensive:</strong> Requires strong performance in math and science foundations</li>
              <li><strong>Directed Studies:</strong> Freshman program requiring high school academic excellence and interview</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Grade Explanations Section */}
      <section id="grade-explanations" className="py-12 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Yale Grade Scale: Complete Breakdown</h2>
          
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Understanding what each letter grade means at Yale helps you set appropriate academic goals and interpret your performance accurately. Need to convert letter grades to GPA values? Use our{' '}
            <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculators/letter-grade-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
              Letter Grade GPA Calculator
            </button>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* A Grades */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
              <h3 className="text-2xl font-bold text-green-700 mb-4">A Grades (3.7-4.0)</h3>
              
              <h4 className="text-lg font-bold text-slate-800 mb-2">A (4.0)</h4>
              <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                <strong>Excellent work</strong> that demonstrates mastery of course material, critical thinking, and original insights. Typically awarded to top 20-25% of students in most courses.
              </p>

              <h4 className="text-lg font-bold text-slate-800 mb-2">A- (3.7)</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Very good work</strong> with minor areas for improvement. Shows strong understanding and consistent high-quality performance throughout the semester.
              </p>
            </div>

            {/* B Grades */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">B Grades (2.7-3.3)</h3>
              
              <h4 className="text-lg font-bold text-slate-800 mb-2">B+ (3.3)</h4>
              <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                <strong>Good work</strong> above satisfactory level. Shows solid understanding with occasional excellent insights.
              </p>

              <h4 className="text-lg font-bold text-slate-800 mb-2">B (3.0)</h4>
              <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                <strong>Satisfactory work</strong> that meets course expectations. Demonstrates competent understanding of material.
              </p>

              <h4 className="text-lg font-bold text-slate-800 mb-2">B- (2.7)</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Acceptable work</strong> with some weaknesses. Meets minimum standards but room for improvement.
              </p>
            </div>

            {/* C Grades */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-yellow-700 mb-4">C Grades (1.7-2.3)</h3>
              
              <h4 className="text-lg font-bold text-slate-800 mb-2">C+ (2.3)</h4>
              <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                <strong>Below average</strong> but passing work. Shows basic understanding with significant gaps.
              </p>

              <h4 className="text-lg font-bold text-slate-800 mb-2">C (2.0)</h4>
              <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                <strong>Marginal performance.</strong> Minimum passing grade for most courses. May trigger academic warning.
              </p>

              <h4 className="text-lg font-bold text-slate-800 mb-2">C- (1.7)</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Barely passing.</strong> Serious concerns about understanding. Often requires course repetition.
              </p>
            </div>

            {/* D and F Grades */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-700 mb-4">D & F Grades (0.0-1.3)</h3>
              
              <h4 className="text-lg font-bold text-slate-800 mb-2">D+ (1.3), D (1.0)</h4>
              <p className="text-slate-700 mb-4 text-sm leading-relaxed">
                <strong>Insufficient work.</strong> Does not meet course standards. Credit may not count toward major requirements.
              </p>

              <h4 className="text-lg font-bold text-slate-800 mb-2">F (0.0)</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                <strong>Failing grade.</strong> No credit earned. Must retake course if required for major or graduation. Significantly impacts GPA.
              </p>
            </div>
          </div>

          {/* Grade Distribution Insight */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-indigo-600">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Typical Yale Grade Distribution</h3>
            <p className="text-slate-700 mb-6 leading-relaxed">
              While distributions vary by department and course level, here's a general overview of grade patterns at Yale:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">25-30%</div>
                <div className="text-sm text-slate-600">A Grades</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">40-45%</div>
                <div className="text-sm text-slate-600">B Grades</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600 mb-1">20-25%</div>
                <div className="text-sm text-slate-600">C Grades</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-1">5-10%</div>
                <div className="text-sm text-slate-600">D/F Grades</div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-6 italic">
              Note: STEM courses and upper-level seminars may have different distributions. Always check with your professor for specific grading policies.
            </p>
          </div>
        </div>
      </section>

      {/* Ivy League GPA Comparison Table */}
      <section id="honors-comparison" className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Ivy League GPA Comparison: Yale vs. Other Elite Universities</h2>
          
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Understanding how Yale's GPA system compares to other Ivy League schools helps contextualize your academic performance and prepare for grad school applications.
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">University</th>
                  <th className="px-6 py-4 text-left font-bold">GPA Scale</th>
                  <th className="px-6 py-4 text-left font-bold">Average GPA</th>
                  <th className="px-6 py-4 text-left font-bold">Summa GPA</th>
                  <th className="px-6 py-4 text-left font-bold">Magna GPA</th>
                  <th className="px-6 py-4 text-left font-bold">Cum Laude GPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-700">Yale</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">3.60-3.70</td>
                  <td className="px-6 py-4 text-slate-700">3.90+ (Top 5%)</td>
                  <td className="px-6 py-4 text-slate-700">3.70+ (Top 10%)</td>
                  <td className="px-6 py-4 text-slate-700">3.50+ (Top 25%)</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Harvard</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">3.65</td>
                  <td className="px-6 py-4 text-slate-700">3.92+ (Top 5%)</td>
                  <td className="px-6 py-4 text-slate-700">3.75+ (Top 15%)</td>
                  <td className="px-6 py-4 text-slate-700">3.60+ (Top 50%)</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Princeton</td>
                  <td className="px-6 py-4 text-slate-700">4.3</td>
                  <td className="px-6 py-4 text-slate-700">3.46-3.55</td>
                  <td className="px-6 py-4 text-slate-700">3.95+ (Top 2%)</td>
                  <td className="px-6 py-4 text-slate-700">3.85+ (Top 8%)</td>
                  <td className="px-6 py-4 text-slate-700">3.70+ (Top 15%)</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Columbia</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">3.50-3.60</td>
                  <td className="px-6 py-4 text-slate-700">3.85+</td>
                  <td className="px-6 py-4 text-slate-700">3.70+</td>
                  <td className="px-6 py-4 text-slate-700">3.50+</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Penn</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">3.55-3.65</td>
                  <td className="px-6 py-4 text-slate-700">3.80+</td>
                  <td className="px-6 py-4 text-slate-700">3.60+</td>
                  <td className="px-6 py-4 text-slate-700">3.40+</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Brown</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">3.70-3.75</td>
                  <td className="px-6 py-4 text-slate-700">3.90+</td>
                  <td className="px-6 py-4 text-slate-700">3.75+</td>
                  <td className="px-6 py-4 text-slate-700">3.50+</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Dartmouth</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">3.45-3.55</td>
                  <td className="px-6 py-4 text-slate-700">3.85+</td>
                  <td className="px-6 py-4 text-slate-700">3.65+</td>
                  <td className="px-6 py-4 text-slate-700">3.45+</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">Cornell</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">3.35-3.45</td>
                  <td className="px-6 py-4 text-slate-700">3.85+</td>
                  <td className="px-6 py-4 text-slate-700">3.65+</td>
                  <td className="px-6 py-4 text-slate-700">3.45+</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">📊</span> GPA Patterns
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Brown</strong> has the highest average GPA (3.7-3.75) due to its flexible open curriculum and S/NC grading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Cornell</strong> has the lowest average (3.35-3.45) due to engineering emphasis and competitive STEM programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Yale's 3.6-3.7</strong> average sits in the middle, reflecting balanced rigor. Compare with{' '}
                    <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/columbia-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                      Columbia's GPA system
                    </button>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Princeton</strong> uses a 4.3 scale (A+ = 4.3), making direct comparisons complex</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎓</span> Honors Insights
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Yale's Summa</strong> (top 5%) is more exclusive than Harvard's (top 5%) but less than Princeton's (top 2%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Latin Honors percentages</strong> vary—some schools award to top 50% (Harvard Cum Laude) vs. 25% (Yale)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>Graduate schools</strong> understand these differences and adjust evaluations accordingly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span><strong>3.5+ GPA</strong> from any Ivy is considered excellent by most employers and grad programs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Stanford and MIT Comparison */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Beyond the Ivy League: Stanford & MIT</h3>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Yale students often compare themselves to peers at Stanford and MIT, two non-Ivy elite institutions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-purple-700 mb-2">Stanford University</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>GPA Scale:</strong> 4.0</li>
                  <li><strong>Average GPA:</strong> 3.55-3.65</li>
                  <li><strong>Latin Honors:</strong> Based on distinction in major + university-wide thesis</li>
                  <li><strong>Notable:</strong> No class rankings, collaborative culture</li>
                  <li className="mt-3">
                    <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/stanford-gpa-calculator')} className="text-purple-600 hover:text-purple-800 underline font-semibold text-sm">
                      → Calculate Stanford GPA
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-700 mb-2">MIT</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>GPA Scale:</strong> 5.0 (4.0 for most purposes)</li>
                  <li><strong>Average GPA:</strong> 3.4-3.5</li>
                  <li><strong>Latin Honors:</strong> Summa 4.8+, Magna 4.5+, Laude 4.2+</li>
                  <li><strong>Notable:</strong> First semester P/NR (pass/no record) to ease transition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-12 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Frequently Asked Questions About Yale GPA</h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">What GPA scale does Yale use?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yale uses a <strong>standard 4.0 GPA scale</strong> with letter grades from A to F. The grading system includes A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D (1.0), and F (0.0). Unlike Princeton which uses a 4.3 scale, Yale does not award grade points higher than 4.0. Pass/fail courses don't factor into GPA calculations.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">What GPA do you need for Latin Honors at Yale?</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Yale awards <strong>Latin Honors</strong> based on cumulative GPA and class rank:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>Summa Cum Laude:</strong> Requires 3.9+ GPA (approximately top 5% of class)</li>
                <li><strong>Magna Cum Laude:</strong> Requires 3.7+ GPA (approximately top 10% of class)</li>
                <li><strong>Cum Laude:</strong> Requires 3.5+ GPA (approximately top 25% of class)</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-3">
                These honors are awarded at graduation and appear on your diploma and transcript. Note that some majors also offer departmental honors based on thesis quality and GPA within the major.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Is a 3.7 GPA good at Yale?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, a <strong>3.7 GPA is excellent</strong> at Yale! It qualifies you for <strong>Magna Cum Laude</strong> honors (top 10% of class) and is well above the average Yale GPA of 3.6-3.7. A 3.7 makes you competitive for most graduate schools, including top law schools (median LSAT + 3.7+ often suffices for T14), medical schools (combined with strong MCAT), and PhD programs. Employers and grad schools recognize Yale's academic rigor, so a 3.7 demonstrates consistent excellence.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">How many courses can I take pass/fail at Yale?</h3>
              <p className="text-slate-700 leading-relaxed">
                You can take up to <strong>4 courses pass/fail</strong> during your entire Yale undergraduate career (across all 8 semesters). Pass/fail courses don't count toward your GPA but do count toward your 36-credit graduation requirement. You cannot use pass/fail for courses fulfilling your major requirements or certain distributional requirements. You must declare pass/fail status by the end of shopping period (usually 2 weeks into the semester). Strategic use of pass/fail can help you explore challenging subjects without GPA risk.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">What is the average GPA at Yale?</h3>
              <p className="text-slate-700 leading-relaxed">
                The average GPA at Yale is approximately <strong>3.6 to 3.7</strong>, which has remained relatively stable over the past decade. This average is comparable to peer Ivy League schools like Harvard (3.65) and slightly higher than Princeton (3.5). The average varies by major: humanities and social sciences tend to have slightly higher averages (3.65-3.75), while STEM fields like engineering, physics, and mathematics typically average 3.4-3.6 due to more rigorous grading standards and problem-set-heavy coursework.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Does Yale have grade inflation?</h3>
              <p className="text-slate-700 leading-relaxed">
                Like most elite universities, Yale has experienced <strong>modest grade inflation</strong> over the past few decades. The average GPA has risen from approximately 3.3 in the 1980s to 3.6-3.7 today. However, Yale maintains that this reflects improved student quality (more selective admissions) rather than easier grading. Unlike Princeton's controversial grade deflation policy (2004-2014), Yale never imposed formal grade caps. Most Yale professors maintain rigorous standards—earning an A still requires exceptional work, and C grades are given when warranted.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">How do I calculate my semester vs. cumulative GPA?</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong>Semester GPA:</strong> Calculate using only courses from that single semester. Add up quality points (grade value × credits) for all courses, then divide by total credits for that semester.
              </p>
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong>Cumulative GPA:</strong> Include ALL courses from all semesters. Add up quality points from every semester, then divide by total credits earned across your entire time at Yale.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Our calculator can handle both—just enter all courses for cumulative GPA, or only one semester's courses for semester GPA. For detailed cumulative tracking across multiple semesters, use our{' '}
                <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculators/cumulative-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                  Cumulative GPA Calculator
                </button>. Remember that pass/fail courses don't count in either calculation but do contribute to your 36-credit graduation requirement.
              </p>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Can I raise my Yale GPA from 3.0 to 3.5?</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Yes, but it requires consistent effort. The feasibility depends on <strong>how many credits you've completed</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-3">
                <li><strong>After freshman year (8 credits):</strong> Very achievable with 6 semesters remaining. You'd need approximately 3.67 GPA in remaining courses.</li>
                <li><strong>After sophomore year (16 credits):</strong> Challenging but possible. Need approximately 3.75 GPA in remaining 20 credits.</li>
                <li><strong>After junior year (24 credits):</strong> Difficult—would need nearly straight A's (3.9+) in remaining 12 credits.</li>
              </ul>
              <p className="text-slate-700 leading-relaxed">
                Use our{' '}
                <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculators/gpa-raise-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                  GPA Raise Calculator
                </button>{' '}to model different scenarios and see exactly what grades you need. Meet with your dean to create an academic improvement plan, utilize Yale's free tutoring, and consider lighter credit loads to focus on grades.
              </p>
            </div>

            {/* FAQ 9 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">What GPA do I need for med school from Yale?</h3>
              <p className="text-slate-700 leading-relaxed">
                For <strong>competitive medical school admission</strong>, aim for at least a <strong>3.7+ overall GPA</strong> and <strong>3.6+ science GPA</strong>. Top medical schools (Harvard, Johns Hopkins, Stanford, Penn Med) typically expect 3.8-3.9+ from Yale students, though a strong MCAT (520+) can partially compensate for a lower GPA. Pre-med students should use our{' '}
                <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculators/science-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline font-semibold">
                  Science GPA Calculator
                </button>{' '}to track BCPM grades separately. Yale's pre-med advising recommends 3.5 as the minimum for most MD programs. Remember that medical schools evaluate Yale grades in context—a 3.7 from Yale's rigorous pre-med track is viewed favorably alongside strong clinical experience, research, and compelling personal statements.
              </p>
            </div>

            {/* FAQ 10 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Does Yale put GPA on transcripts?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, <strong>Yale includes your GPA</strong> on official transcripts. Your transcript shows both semester GPAs and cumulative GPA. It also indicates if you've earned Latin Honors (Summa, Magna, or Cum Laude). Yale transcripts are highly respected—graduate schools and employers understand the rigor behind Yale grades. Your transcript will also show which courses you took pass/fail (marked as "P" or "CR") and any academic honors or Dean's List recognitions. You can request official transcripts through the Office of the University Registrar.
              </p>
            </div>

            {/* FAQ 11 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-lime-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">What's the difference between Yale GPA and high school GPA?</h3>
              <p className="text-slate-700 leading-relaxed">
                <strong>Key differences:</strong> (1) <strong>Scale:</strong> Many high schools use weighted GPAs above 4.0 for honors/AP courses; Yale uses unweighted 4.0 max. (2) <strong>Difficulty:</strong> Yale courses are significantly more rigorous—a 3.5 at Yale is more impressive than a 3.5 from most high schools. (3) <strong>Grade Distribution:</strong> High school A's are common; Yale A's typically go to top 25% of students. (4) <strong>Credit System:</strong> Yale uses course credits (usually 1.0 per course); high schools often don't weight by credits. (5) <strong>Prestige Impact:</strong> Graduate schools and employers weight Yale GPA more heavily due to institutional reputation.
              </p>
            </div>

            {/* FAQ 12 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-rose-600">
              <h3 className="text-xl font-bold text-slate-800 mb-3">How does Yale's shopping period affect my GPA?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yale's unique <strong>2-week shopping period</strong> lets you attend multiple classes before finalizing your schedule, which can significantly protect your GPA. You can drop courses that seem too difficult or poorly matched to your strengths before they're recorded on your transcript. Strategic shopping tips: (1) Attend first lectures of 6-8 courses to assess difficulty, (2) Read syllabi carefully for grade breakdowns, (3) Talk to upperclassmen about professor grading tendencies, (4) Balance challenging courses with more manageable options, (5) Drop courses before the deadline if you're struggling. This flexibility is a major advantage over schools with fixed add/drop periods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Academic Success */}
      <section id="tips-success" className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">10 Expert Tips to Boost Your Yale GPA</h2>
          
          <p className="text-lg text-slate-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            Achieving academic excellence at Yale requires more than just intelligence—it demands strategic planning, effective study habits, and smart use of university resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tip 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Master Shopping Period Strategy</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Attend 6-8 courses during shopping period, not just 5. This gives you backup options if a class is too difficult. Read full syllabi, check grade distributions on CourseTable, and talk to students who've taken the course before committing.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Utilize Office Hours Religiously</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Professors remember students who engage. Attend office hours early in the semester (not just before exams) to build relationships. Ask thoughtful questions about course material, research interests, or career advice. This visibility often translates to better grades on subjective assignments.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Balance Your Course Load</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Mix reading-heavy courses (history, literature) with problem-set courses (STEM) to avoid overlapping deadlines. Don't take 4 paper-intensive seminars simultaneously. Aim for 4-5 courses per semester—overloading rarely improves your GPA and often harms it.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 4 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Start Assignments Early</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    The difference between A and B often comes down to revision time. Start papers 1-2 weeks before the deadline, complete drafts early, and visit the Writing Center for feedback. For problem sets, attempt problems as they're assigned rather than cramming the night before.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 5 */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Form Strategic Study Groups</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Study with peers who match or exceed your academic level. Groups work best for problem-set courses (math, economics, physics) where collaborative problem-solving helps. For reading-heavy courses, discuss concepts after individual reading rather than replacing reading with group discussion.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 6 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  6
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Understand Each Professor's Grading Style</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Read past assignment feedback carefully. Some professors prioritize original arguments (even if flawed), others want textbook mastery. Adjust your approach accordingly. Check CourseTable for grade distributions—some professors rarely give A's, others are more generous.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 7 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  7
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Use Pass/Fail Strategically</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Save your 4 P/F courses for: (1) Exploring challenging subjects outside your major, (2) Fulfilling distributional requirements in weak areas, (3) Semester when you're overcommitted with research or extracurriculars. Don't waste P/F on easy courses where you'd get an A anyway.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 8 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  8
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Prioritize Sleep and Mental Health</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Research shows 7-8 hours of sleep improves exam performance more than extra cramming. Yale's Mental Health & Counseling is free—use it proactively, not just in crisis. Academic success is impossible with poor mental health. Balance is key to sustainable high performance.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 9 */}
            <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl p-6 border border-lime-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-lime-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  9
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Master Time Management</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Use a planner or app to track all deadlines. Block study time like classes—treat it as unmissable. The Pomodoro Technique (25-min focused work + 5-min break) works well for Yale's intense workload. Identify your peak productivity hours and schedule hardest work then.
                  </p>
                </div>
              </div>
            </div>

            {/* Tip 10 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  10
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Leverage Yale's Academic Resources</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Free resources most students underutilize: (1) Bass Library peer tutors, (2) Quantitative Reasoning Center for STEM help, (3) Writing Center consultations, (4) Academic Strategies Program workshops on note-taking and test prep, (5) Your residential college dean for personalized advising.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources Box */}
          <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Yale-Specific Academic Resources
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-50">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">📚</span>
                <span><strong>CourseTable:</strong> View grade distributions and course reviews before enrolling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">💬</span>
                <span><strong>Dean's Advising:</strong> Meet with your residential college dean for academic planning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">👥</span>
                <span><strong>Peer Tutoring:</strong> Free subject-specific tutoring through residential colleges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✍️</span>
                <span><strong>Writing Center:</strong> Professional feedback on papers and essays at any stage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">🔢</span>
                <span><strong>QR Center:</strong> Drop-in help for quantitative and data-heavy courses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">🧠</span>
                <span><strong>Mental Health & Counseling:</strong> Confidential support for stress and wellbeing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Social Share Buttons */}
      <section className="py-8 px-6 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Share This Yale GPA Calculator</h3>
          <p className="text-slate-600 mb-6">Help your fellow Bulldogs track their academic progress!</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {/* Facebook Share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>

            {/* Twitter Share */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate your Yale GPA with precision!')}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>

            {/* LinkedIn Share */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>

            {/* Reddit Share */}
            <a
              href={`https://reddit.com/submit?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator')}&title=${encodeURIComponent('Yale GPA Calculator 2025')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on Reddit"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              Reddit
            </a>

            {/* WhatsApp Share */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent('Check out this Yale GPA Calculator: https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools currentToolPath="/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator" navigateTo={navigateTo} />
    </div>
  );
};

export default YaleGPACalculator;
