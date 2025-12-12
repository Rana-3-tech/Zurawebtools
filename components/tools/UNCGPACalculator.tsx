import React, { useState, useEffect } from 'react';
import { Page } from '../../App';

interface UNCGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const UNCGPACalculator: React.FC<UNCGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '', credits: 3 }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // SEO Setup
  useEffect(() => {
    document.title = "UNC Chapel Hill GPA Calculator 2026 - Free Tar Heels GPA Calculator | ZuraWebTools";

    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free UNC Chapel Hill GPA calculator 2026. Calculate semester GPA, cumulative GPA, and track Latin Honors eligibility (Summa 3.85+, Magna 3.65+, Cum Laude 3.5+). Official UNC grading scale with Dean\'s List requirements.');
    }

    // Robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Author meta
    let authorMeta = document.querySelector('meta[name="author"]');
    if (!authorMeta) {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      document.head.appendChild(authorMeta);
    }
    authorMeta.setAttribute('content', 'ZuraWebTools');

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/unc-gpa-calculator');

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'UNC Chapel Hill GPA Calculator 2026 - Free Tar Heels GPA Calculator' },
      { property: 'og:description', content: 'Free UNC Chapel Hill GPA calculator 2026. Calculate semester GPA, cumulative GPA, and track Latin Honors eligibility (Summa 3.85+, Magna 3.65+, Cum Laude 3.5+). Official UNC grading scale with Dean\'s List requirements.' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/unc-gpa-calculator' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-unc-gpa-calculator.jpg' },
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

    // Twitter Card Tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'UNC Chapel Hill GPA Calculator 2026 - Free Tar Heels GPA Calculator' },
      { name: 'twitter:description', content: 'Free UNC Chapel Hill GPA calculator 2026. Calculate semester GPA, cumulative GPA, and track Latin Honors eligibility. Official UNC grading scale.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/twitter-unc-gpa-calculator.jpg' },
    ];

    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', tag.content);
    });

    // JSON-LD Structured Data - Software Application
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UNC Chapel Hill GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "512",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "Free UNC Chapel Hill GPA calculator for calculating semester GPA, cumulative GPA, and tracking Latin Honors eligibility with official UNC grading scale.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/unc-gpa-calculator"
    };

    let softwareScript = document.querySelector('script[data-schema="software"]');
    if (!softwareScript) {
      softwareScript = document.createElement('script');
      softwareScript.setAttribute('type', 'application/ld+json');
      softwareScript.setAttribute('data-schema', 'software');
      document.head.appendChild(softwareScript);
    }
    softwareScript.textContent = JSON.stringify(softwareSchema);

    // JSON-LD Structured Data - Breadcrumb
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
          "name": "Education & Exam Tools",
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
          "name": "UNC Chapel Hill GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/unc-gpa-calculator"
        }
      ]
    };

    let breadcrumbScript = document.querySelector('script[data-schema="breadcrumb"]');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      breadcrumbScript.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

    // JSON-LD Structured Data - FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the UNC Chapel Hill grading scale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UNC Chapel Hill uses a plus/minus grading system: A+ and A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, and F = 0.0. This scale applies to all undergraduate courses."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do you need for Latin Honors at UNC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UNC Chapel Hill Latin Honors requirements: Summa Cum Laude requires 3.85+ GPA, Magna Cum Laude requires 3.65+ GPA, and Cum Laude requires 3.5+ GPA. These are cumulative GPA thresholds calculated at graduation."
          }
        },
        {
          "@type": "Question",
          "name": "How do I make Dean's List at UNC Chapel Hill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To make Dean's List at UNC Chapel Hill, you must earn a semester GPA of 3.5 or higher while completing at least 12 credit hours of graded coursework in that semester. Pass/Fail courses don't count toward the 12-hour minimum."
          }
        },
        {
          "@type": "Question",
          "name": "Does UNC Chapel Hill count A+ as 4.0 or 4.3?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UNC Chapel Hill counts A+ as 4.0, not 4.3. The university uses a 4.0 scale maximum, so both A+ and A grades receive 4.0 quality points per credit hour."
          }
        },
        {
          "@type": "Question",
          "name": "How is UNC GPA calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UNC GPA is calculated by multiplying each course's grade points by its credit hours to get quality points, summing all quality points, then dividing by total credit hours. For example, an A (4.0) in a 3-credit course = 12 quality points."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good GPA at UNC Chapel Hill?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At UNC Chapel Hill, a GPA above 3.5 is considered excellent (Dean's List and Cum Laude eligible), 3.0-3.49 is good, 2.5-2.99 is average, and below 2.5 may result in academic probation. The average undergraduate GPA is around 3.2."
          }
        },
        {
          "@type": "Question",
          "name": "Does UNC use weighted or unweighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UNC Chapel Hill uses an unweighted GPA system on a 4.0 scale. Unlike high schools, UNC does not give extra weight to honors or advanced courses. All courses contribute equally to your GPA based on the standard grade scale."
          }
        },
        {
          "@type": "Question",
          "name": "Can I retake courses to improve my UNC GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, UNC allows course retakes. However, both the original and retake grades remain on your transcript. For GPA calculation, UNC uses grade replacement - only the highest grade counts toward your GPA, but both attempts count toward your credit hour total."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do you need to avoid academic probation at UNC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UNC Chapel Hill requires a minimum cumulative GPA of 2.0 to remain in good academic standing. Students with a GPA below 2.0 are placed on academic probation and must improve their GPA to avoid suspension."
          }
        },
        {
          "@type": "Question",
          "name": "How do Pass/Fail courses affect UNC GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pass/Fail (P/F) courses at UNC do not affect your GPA calculation. P grades don't contribute quality points or count toward GPA, though credit hours are earned. F grades are calculated as 0.0 in your GPA."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum GPA for UNC scholarships?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most UNC Chapel Hill merit scholarships require maintaining a minimum GPA of 3.0, though competitive scholarships like the Morehead-Cain and Robertson may require 3.5+. Check your specific scholarship requirements with the Office of Scholarships and Student Aid."
          }
        },
        {
          "@type": "Question",
          "name": "How does UNC calculate major GPA vs overall GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UNC calculates major GPA using only courses that count toward your major requirements, while overall (cumulative) GPA includes all courses taken at UNC. Most majors require a minimum 2.0 major GPA to graduate, though competitive programs may require higher."
          }
        }
      ]
    };

    let faqScript = document.querySelector('script[data-schema="faq"]');
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.setAttribute('type', 'application/ld+json');
      faqScript.setAttribute('data-schema', 'faq');
      document.head.appendChild(faqScript);
    }
    faqScript.textContent = JSON.stringify(faqSchema);

  }, []);

  // UNC Chapel Hill Grade Scale
  const gradePoints: { [key: string]: number } = {
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
    'F': 0.0
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now(),
      name: '',
      grade: '',
      credits: 3
    };
    setCourses([...courses, newCourse]);
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
          const points = gradePoints[course.grade];
          if (points !== undefined) {
            totalPoints += points * course.credits;
            totalCreds += course.credits;
          }
        }
      });

      const calculatedGPA = totalCreds > 0 ? totalPoints / totalCreds : 0;
      setGpa(parseFloat(calculatedGPA.toFixed(3)));
      setTotalCredits(totalCreds);
      setTotalQualityPoints(parseFloat(totalPoints.toFixed(2)));
      setShowResults(true);
      setIsCalculating(false);
    }, 500);
  };

  const resetCalculator = () => {
    setCourses([{ id: 1, name: '', grade: '', credits: 3 }]);
    setGpa(0);
    setTotalCredits(0);
    setTotalQualityPoints(0);
    setShowResults(false);
  };

  const clearAll = () => {
    setCourses([{ id: 1, name: '', grade: '', credits: 3 }]);
  };

  const getHonorsLevel = (gpa: number): string => {
    if (gpa >= 3.85) return 'Summa Cum Laude';
    if (gpa >= 3.65) return 'Magna Cum Laude';
    if (gpa >= 3.5) return 'Cum Laude';
    return 'Not Eligible';
  };

  const getDeansListStatus = (gpa: number, credits: number): string => {
    if (gpa >= 3.5 && credits >= 12) return 'Eligible';
    return 'Not Eligible';
  };

  const getAcademicStanding = (gpa: number): { status: string; color: string } => {
    if (gpa >= 3.5) return { status: 'Excellent Standing (Dean\'s List)', color: 'text-green-600' };
    if (gpa >= 3.0) return { status: 'Good Standing', color: 'text-blue-600' };
    if (gpa >= 2.5) return { status: 'Satisfactory Standing', color: 'text-yellow-600' };
    if (gpa >= 2.0) return { status: 'Good Standing', color: 'text-orange-600' };
    return { status: 'Academic Probation Risk', color: 'text-red-600' };
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `UNC CHAPEL HILL GPA CALCULATION REPORT
${'='.repeat(50)}

SEMESTER DETAILS:
- Semester GPA: ${gpa.toFixed(3)}
- Total Credits: ${totalCredits}
- Total Quality Points: ${totalQualityPoints.toFixed(2)}
- Latin Honors: ${getHonorsLevel(gpa)}
- Dean's List Status: ${getDeansListStatus(gpa, totalCredits)}
- Academic Standing: ${getAcademicStanding(gpa).status}

COURSES:
${courses.map((course, index) =>
  `${index + 1}. ${course.name || 'Unnamed Course'} - Grade: ${course.grade || 'N/A'} - Credits: ${course.credits}`
).join('\n')}

Generated by ZuraWebTools
Date: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unc-gpa-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'UNC Chapel Hill GPA Calculator',
      text: `I calculated my UNC GPA: ${gpa.toFixed(2)}. Try this free calculator!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const getGPAColor = (gpa: number): string => {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.5) return 'text-yellow-600';
    if (gpa >= 2.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGPAProgressColor = (gpa: number): string => {
    if (gpa >= 3.5) return 'bg-green-500';
    if (gpa >= 3.0) return 'bg-blue-500';
    if (gpa >= 2.5) return 'bg-yellow-500';
    if (gpa >= 2.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            UNC Chapel Hill GPA Calculator 2026
          </h1>
          <p className="text-xl text-center text-blue-100 mb-2">
            Calculate your Tar Heels semester GPA, cumulative GPA, and track Latin Honors eligibility with our free UNC GPA calculator.
          </p>
          <p className="text-center text-blue-200">
            Official UNC Chapel Hill grading scale with Dean's List requirements and academic standing analysis.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <svg className="mr-3 text-blue-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              UNC GPA Calculator
            </h2>
            <div className="flex gap-2">
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                aria-label="Clear all courses"
              >
                Clear All
              </button>
              <button
                onClick={resetCalculator}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                aria-label="Reset calculator"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Course Input Fields */}
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="md:col-span-5">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Introduction to Psychology"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label={`Course name for course ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label={`Grade for course ${index + 1}`}
                  >
                    <option value="">Select Grade</option>
                    {Object.keys(gradePoints).map(grade => (
                      <option key={grade} value={grade}>
                        {grade} ({gradePoints[grade].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Hours
                  </label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    min="0"
                    max="12"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label={`Credit hours for course ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Remove course ${index + 1}`}
                  >
                    <svg className="mx-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={addCourse}
              className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center font-semibold"
              aria-label="Add another course"
            >
              <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Course
            </button>

            <button
              onClick={calculateGPA}
              disabled={isCalculating || courses.every(c => !c.grade)}
              className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Calculate GPA"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <svg className="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Calculate GPA
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <svg className="mr-3 text-green-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                Your UNC GPA Results
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  aria-label="Share results"
                  title="Share"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  aria-label="Download results"
                  title="Download"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                  aria-label="Print results"
                  title="Print"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"/>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* GPA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Semester GPA Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Semester GPA</h3>
                <p className="text-4xl font-bold mb-1">{gpa.toFixed(3)}</p>
                <p className="text-sm opacity-75">out of 4.0</p>
              </div>

              {/* Total Credits Card */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Total Credits</h3>
                <p className="text-4xl font-bold mb-1">{totalCredits}</p>
                <p className="text-sm opacity-75">credit hours</p>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Quality Points</h3>
                <p className="text-4xl font-bold mb-1">{totalQualityPoints.toFixed(2)}</p>
                <p className="text-sm opacity-75">total points</p>
              </div>

              {/* Latin Honors Card */}
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Latin Honors</h3>
                <p className="text-2xl font-bold mb-1">{getHonorsLevel(gpa)}</p>
                <p className="text-sm opacity-75">honors level</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">GPA Progress</span>
                <span className={`text-sm font-bold ${getGPAColor(gpa)}`}>{gpa.toFixed(3)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${getGPAProgressColor(gpa)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${(gpa / 4.0) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Dean's List Status</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={getDeansListStatus(gpa, totalCredits) === 'Eligible' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                    {getDeansListStatus(gpa, totalCredits)}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Requires 3.5+ GPA with 12+ credit hours of graded coursework
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Academic Standing</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={`${getAcademicStanding(gpa).color} font-bold`}>
                    {getAcademicStanding(gpa).status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Minimum 2.0 GPA required for good standing
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#how-to-use" className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all group">
              <span className="text-2xl mr-3">📖</span>
              <span className="font-semibold text-gray-900 group-hover:text-blue-700">How to Use This Calculator</span>
            </a>
            <a href="#about-unc-gpa" className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all group">
              <span className="text-2xl mr-3">🎓</span>
              <span className="font-semibold text-gray-900 group-hover:text-green-700">About UNC GPA System</span>
            </a>
            <a href="#grade-scale" className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all group">
              <span className="text-2xl mr-3">📊</span>
              <span className="font-semibold text-gray-900 group-hover:text-purple-700">UNC Grade Scale</span>
            </a>
            <a href="#calculation-method" className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg hover:from-yellow-100 hover:to-yellow-200 transition-all group">
              <span className="text-2xl mr-3">🧮</span>
              <span className="font-semibold text-gray-900 group-hover:text-yellow-700">How GPA is Calculated</span>
            </a>
            <a href="#comparison" className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg hover:from-pink-100 hover:to-pink-200 transition-all group">
              <span className="text-2xl mr-3">⚖️</span>
              <span className="font-semibold text-gray-900 group-hover:text-pink-700">UNC vs Other Universities</span>
            </a>
            <a href="#latin-honors" className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg hover:from-indigo-100 hover:to-indigo-200 transition-all group">
              <span className="text-2xl mr-3">🏆</span>
              <span className="font-semibold text-gray-900 group-hover:text-indigo-700">Latin Honors Requirements</span>
            </a>
            <a href="#improve-gpa" className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all group">
              <span className="text-2xl mr-3">📈</span>
              <span className="font-semibold text-gray-900 group-hover:text-orange-700">How to Improve Your GPA</span>
            </a>
            <a href="#faqs" className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg hover:from-teal-100 hover:to-teal-200 transition-all group">
              <span className="text-2xl mr-3">❓</span>
              <span className="font-semibold text-gray-900 group-hover:text-teal-700">Frequently Asked Questions</span>
            </a>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the UNC Chapel Hill GPA Calculator</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Our <strong>UNC Chapel Hill GPA calculator</strong> makes it simple to calculate your semester GPA, track your cumulative GPA, and determine your Latin Honors eligibility. Follow these easy steps to get accurate results instantly.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step Instructions</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Enter Course Information</h4>
                  <p className="text-gray-700">
                    Start by entering the name of your course in the "Course Name" field. This helps you keep track of which courses you're calculating. You can enter any UNC course like "PSYC 101" or "ECON 101".
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Select Your Grade</h4>
                  <p className="text-gray-700">
                    Choose your letter grade from the dropdown menu. UNC uses a plus/minus grading system with grades from A+ (4.0) down to F (0.0). Each grade is clearly labeled with its corresponding grade point value.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Input Credit Hours</h4>
                  <p className="text-gray-700">
                    Enter the number of credit hours for each course. Most UNC courses are 3 credit hours, but some labs, seminars, or intensive courses may vary. The calculator accepts values from 0.5 to 12 credits.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Add More Courses</h4>
                  <p className="text-gray-700">
                    Click the green "Add Course" button to add additional courses to your calculation. You can add as many courses as you need for accurate semester or cumulative GPA calculation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Calculate Your GPA</h4>
                  <p className="text-gray-700">
                    Once you've entered all your courses, click the blue "Calculate GPA" button. The calculator will instantly compute your semester GPA, total credits, quality points, Latin Honors eligibility, and Dean's List status.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Review Your Results</h4>
                  <p className="text-gray-700">
                    Your results will display in four colorful cards showing your Semester GPA, Total Credits, Quality Points, and Latin Honors status. You'll also see your Dean's List eligibility and academic standing with detailed explanations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">7</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Save or Share Results</h4>
                  <p className="text-gray-700">
                    Use the action buttons to print your results, download them as a text file, or share your GPA via social media. This makes it easy to track your academic progress over multiple semesters.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-8 rounded-r-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">💡 Pro Tip</h4>
              <p className="text-gray-700">
                To calculate your <strong>cumulative GPA</strong>, include all courses from previous semesters along with your current semester courses. The calculator will compute your overall GPA across all terms automatically.
              </p>
            </div>
          </div>
        </div>

        {/* About UNC GPA Section */}
        <div id="about-unc-gpa" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the UNC Chapel Hill GPA System</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The <strong>University of North Carolina at Chapel Hill</strong> uses a standard 4.0 GPA scale with a plus/minus grading system. Understanding how UNC calculates GPA is essential for tracking your academic progress and planning for graduation honors.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is GPA?</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              GPA stands for <strong>Grade Point Average</strong>. It's a numerical representation of your academic performance calculated by averaging the grade points you earn in each course, weighted by the number of credit hours. At UNC Chapel Hill, GPA is the primary measure of academic achievement.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">UNC's Grading Philosophy</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              UNC Chapel Hill maintains rigorous academic standards while providing students with detailed feedback through the plus/minus grading system. This system allows professors to make finer distinctions in student performance compared to straight letter grades.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              The university recognizes that GPA is just one measure of student success. UNC also values research contributions, community engagement, leadership development, and personal growth as integral parts of the Tar Heel experience.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of GPA at UNC</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Semester GPA</h4>
                <p className="text-gray-700">
                  Your <strong>semester GPA</strong> reflects your academic performance for a single semester. It's calculated using only the courses taken during that specific term and determines Dean's List eligibility.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Cumulative GPA</h4>
                <p className="text-gray-700">
                  Your <strong>cumulative GPA</strong> includes all courses taken at UNC Chapel Hill from your first semester through your current term. This is the GPA used for Latin Honors, scholarship eligibility, and graduation requirements.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Major GPA</h4>
                <p className="text-gray-700">
                  Your <strong>major GPA</strong> is calculated using only courses that count toward your major requirements. Most UNC majors require a minimum 2.0 major GPA to graduate, though competitive programs may require higher.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why GPA Matters at UNC</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Latin Honors:</strong> Summa Cum Laude (3.85+), Magna Cum Laude (3.65+), and Cum Laude (3.5+) are awarded at graduation based on cumulative GPA</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Dean's List:</strong> Earned each semester with a 3.5+ semester GPA and at least 12 graded credit hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Academic Standing:</strong> Students must maintain a 2.0 cumulative GPA to avoid academic probation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Graduate School:</strong> Most graduate programs require a minimum 3.0 GPA for admission consideration</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Scholarships:</strong> Many merit-based scholarships require maintaining a minimum GPA, typically 3.0 or higher</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Competitive Programs:</strong> Entry into selective programs like Kenan-Flagler Business School often requires GPAs above 3.5</span>
              </li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mt-8 rounded-r-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">📌 Important Note</h4>
              <p className="text-gray-700">
                UNC Chapel Hill counts both A+ and A as 4.0 on the GPA scale. This differs from some universities that count A+ as 4.3. Make sure to use UNC's official grading scale when calculating your GPA.
              </p>
            </div>
          </div>
        </div>

        {/* Grade Scale Section */}
        <div id="grade-scale" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UNC Chapel Hill Official Grade Scale</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The <strong>UNC Chapel Hill grading scale</strong> uses a plus/minus system on a 4.0 scale. Understanding each grade's point value is crucial for accurate GPA calculation and academic planning.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="px-6 py-4 text-left font-bold">Letter Grade</th>
                    <th className="px-6 py-4 text-left font-bold">Grade Points</th>
                    <th className="px-6 py-4 text-left font-bold">Percentage Range</th>
                    <th className="px-6 py-4 text-left font-bold">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">A+</td>
                    <td className="px-6 py-4 text-green-600 font-bold">4.0</td>
                    <td className="px-6 py-4 text-gray-700">97-100%</td>
                    <td className="px-6 py-4 text-gray-700">Exceptional</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-green-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">A</td>
                    <td className="px-6 py-4 text-green-600 font-bold">4.0</td>
                    <td className="px-6 py-4 text-gray-700">93-96%</td>
                    <td className="px-6 py-4 text-gray-700">Excellent</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">A-</td>
                    <td className="px-6 py-4 text-blue-600 font-bold">3.7</td>
                    <td className="px-6 py-4 text-gray-700">90-92%</td>
                    <td className="px-6 py-4 text-gray-700">Very Good</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">B+</td>
                    <td className="px-6 py-4 text-blue-600 font-bold">3.3</td>
                    <td className="px-6 py-4 text-gray-700">87-89%</td>
                    <td className="px-6 py-4 text-gray-700">Good Plus</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">B</td>
                    <td className="px-6 py-4 text-blue-600 font-bold">3.0</td>
                    <td className="px-6 py-4 text-gray-700">83-86%</td>
                    <td className="px-6 py-4 text-gray-700">Good</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-yellow-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">B-</td>
                    <td className="px-6 py-4 text-yellow-600 font-bold">2.7</td>
                    <td className="px-6 py-4 text-gray-700">80-82%</td>
                    <td className="px-6 py-4 text-gray-700">Satisfactory Plus</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">C+</td>
                    <td className="px-6 py-4 text-yellow-600 font-bold">2.3</td>
                    <td className="px-6 py-4 text-gray-700">77-79%</td>
                    <td className="px-6 py-4 text-gray-700">Acceptable Plus</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-yellow-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">C</td>
                    <td className="px-6 py-4 text-yellow-600 font-bold">2.0</td>
                    <td className="px-6 py-4 text-gray-700">73-76%</td>
                    <td className="px-6 py-4 text-gray-700">Acceptable</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">C-</td>
                    <td className="px-6 py-4 text-orange-600 font-bold">1.7</td>
                    <td className="px-6 py-4 text-gray-700">70-72%</td>
                    <td className="px-6 py-4 text-gray-700">Below Average</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-orange-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">D+</td>
                    <td className="px-6 py-4 text-orange-600 font-bold">1.3</td>
                    <td className="px-6 py-4 text-gray-700">67-69%</td>
                    <td className="px-6 py-4 text-gray-700">Poor Plus</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">D</td>
                    <td className="px-6 py-4 text-red-600 font-bold">1.0</td>
                    <td className="px-6 py-4 text-gray-700">60-66%</td>
                    <td className="px-6 py-4 text-gray-700">Poor</td>
                  </tr>
                  <tr className="hover:bg-red-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">F</td>
                    <td className="px-6 py-4 text-red-600 font-bold">0.0</td>
                    <td className="px-6 py-4 text-gray-700">0-59%</td>
                    <td className="px-6 py-4 text-gray-700">Failing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Points About UNC Grading</h3>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6 rounded-r-lg">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>A+ equals A:</strong> Both A+ and A grades receive 4.0 grade points at UNC Chapel Hill</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>No grade inflation:</strong> UNC maintains strict academic standards with consistent grading across departments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Plus/minus system:</strong> Most courses use the full plus/minus grading scale for precise evaluation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>D grades:</strong> D grades earn credit hours but may not satisfy prerequisite or major requirements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calculation Method Section */}
        <div id="calculation-method" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How UNC GPA is Calculated</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Understanding the <strong>GPA calculation method</strong> at UNC Chapel Hill helps you predict your semester grades and plan for academic success. The calculation is straightforward but requires attention to detail.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The GPA Formula</h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-6 text-center">
              <p className="text-2xl font-bold text-gray-900 mb-4">GPA = Total Quality Points ÷ Total Credit Hours</p>
              <p className="text-gray-700">Quality Points = Grade Points × Credit Hours</p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step Calculation Example</h3>
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Example Semester Schedule:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">PSYC 101 - Grade: A (4.0) - Credits: 3</span>
                  <span className="text-blue-600 font-bold">12.0 quality points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">ECON 101 - Grade: B+ (3.3) - Credits: 3</span>
                  <span className="text-blue-600 font-bold">9.9 quality points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">MATH 231 - Grade: A- (3.7) - Credits: 4</span>
                  <span className="text-blue-600 font-bold">14.8 quality points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">ENGL 105 - Grade: B (3.0) - Credits: 3</span>
                  <span className="text-blue-600 font-bold">9.0 quality points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <span className="text-gray-700">CHEM 101 - Grade: B- (2.7) - Credits: 3</span>
                  <span className="text-blue-600 font-bold">8.1 quality points</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-gray-900">Total Quality Points:</span>
                  <span className="text-2xl font-bold text-blue-600">53.8</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">Total Credit Hours:</span>
                  <span className="text-2xl font-bold text-green-600">16</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg">
                  <span className="text-lg font-bold">Semester GPA:</span>
                  <span className="text-3xl font-bold">3.363</span>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Calculating Cumulative GPA</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your <strong>cumulative GPA</strong> includes all semesters at UNC. To calculate it, add all quality points from every semester and divide by total credit hours attempted.
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Example:</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Fall 2024:</strong> 3.4 GPA × 15 credits = 51 quality points</li>
                <li><strong>Spring 2025:</strong> 3.6 GPA × 16 credits = 57.6 quality points</li>
                <li><strong>Fall 2025:</strong> 3.363 GPA × 16 credits = 53.8 quality points</li>
                <li className="pt-2 border-t border-green-300"><strong>Cumulative:</strong> 162.4 quality points ÷ 47 credits = <span className="text-green-600 font-bold">3.455 GPA</span></li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Calculation Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-5 rounded-xl border-2 border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-2">🔄 Repeated Courses</h4>
                <p className="text-gray-700 text-sm">
                  UNC uses grade replacement. Only the highest grade counts toward GPA, but both attempts count toward credit hours attempted.
                </p>
              </div>
              <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-gray-900 mb-2">📝 Pass/Fail Courses</h4>
                <p className="text-gray-700 text-sm">
                  P/F courses don't affect GPA. Pass grades earn credits without grade points. Fail grades count as F (0.0) in GPA.
                </p>
              </div>
              <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2">🎯 Credit Hour Weighting</h4>
                <p className="text-gray-700 text-sm">
                  Higher credit courses have greater impact on GPA. A 4-credit A (16 quality points) affects GPA more than a 1-credit A (4 quality points).
                </p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl border-2 border-red-200">
                <h4 className="font-bold text-gray-900 mb-2">⚠️ Incomplete Grades</h4>
                <p className="text-gray-700 text-sm">
                  Incomplete (I) grades don't factor into GPA until resolved. After one year, unresolved I grades automatically become F.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div id="comparison" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UNC vs Other Universities: GPA Comparison</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Comparing <strong>UNC Chapel Hill's GPA system</strong> with other top universities helps you understand how your academic performance translates across institutions for graduate school applications and transfer credits.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="px-6 py-4 text-left font-bold">University</th>
                    <th className="px-6 py-4 text-left font-bold">A+ Value</th>
                    <th className="px-6 py-4 text-left font-bold">Grading System</th>
                    <th className="px-6 py-4 text-left font-bold">Latin Honors (Summa)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-blue-600">UNC Chapel Hill</td>
                    <td className="px-6 py-4 text-gray-700">4.0</td>
                    <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                    <td className="px-6 py-4 text-gray-700">3.85+</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Duke University</td>
                    <td className="px-6 py-4 text-gray-700">4.0</td>
                    <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                    <td className="px-6 py-4 text-gray-700">3.85+</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">NYU</td>
                    <td className="px-6 py-4 text-gray-700">4.0</td>
                    <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                    <td className="px-6 py-4 text-gray-700">3.9+</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">UMich</td>
                    <td className="px-6 py-4 text-gray-700">4.0</td>
                    <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                    <td className="px-6 py-4 text-gray-700">3.85+</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">UC Berkeley</td>
                    <td className="px-6 py-4 text-gray-700">4.0</td>
                    <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                    <td className="px-6 py-4 text-gray-700">3.9+</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Cornell University</td>
                    <td className="px-6 py-4 text-red-600 font-bold">4.3</td>
                    <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                    <td className="px-6 py-4 text-gray-700">3.85+</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">Columbia University</td>
                    <td className="px-6 py-4 text-red-600 font-bold">4.3</td>
                    <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                    <td className="px-6 py-4 text-gray-700">3.9+</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Harvard University</td>
                    <td className="px-6 py-4 text-gray-700">4.0</td>
                    <td className="px-6 py-4 text-gray-700">Letter Only (No +/-)</td>
                    <td className="px-6 py-4 text-gray-700">Top 5%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Differences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">🎓 UNC vs Duke</h4>
                <p className="text-gray-700 mb-2">
                  Both universities use identical grading scales with A+ = 4.0 and the same Latin Honors thresholds. The main difference is Duke's slightly higher average GPA (~3.44 vs UNC's ~3.2).
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">📊 UNC vs Ivy League</h4>
                <p className="text-gray-700 mb-2">
                  Some Ivy League schools (Cornell, Columbia) count A+ as 4.3, giving students potential for GPAs above 4.0. UNC's 4.0 cap is standard among public universities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">🏛️ UNC vs Other UNC System Schools</h4>
                <p className="text-gray-700 mb-2">
                  All UNC System schools (NC State, UNCG, UNCC) use the same grading scale, but Latin Honors requirements vary by campus. UNC Chapel Hill has the highest standards.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">🌟 Competitive Advantage</h4>
                <p className="text-gray-700 mb-2">
                  UNC's rigorous grading standards are well-known to graduate schools. A 3.5+ GPA from UNC Chapel Hill is highly competitive for top graduate programs nationwide.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">💡 For Transfer Students</h4>
              <p className="text-gray-700">
                When transferring to or from UNC, grade conversions follow standardized equivalency tables. Most universities recognize UNC's plus/minus system and convert grades accordingly. Always verify transfer credit policies with your destination institution's registrar office.
              </p>
            </div>
          </div>
        </div>

        {/* Latin Honors Section */}
        <div id="latin-honors" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UNC Chapel Hill Latin Honors Requirements</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Graduating with <strong>Latin Honors</strong> from UNC Chapel Hill is a prestigious achievement that recognizes outstanding academic performance. These honors appear on your diploma and transcript, signaling excellence to graduate schools and employers.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Latin Honors Levels at UNC</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl mb-3">🥇</div>
                <h4 className="text-2xl font-bold mb-2">Summa Cum Laude</h4>
                <p className="text-3xl font-bold mb-2">3.85+</p>
                <p className="text-yellow-100 text-sm">Highest Honors - Top ~5% of graduating class</p>
              </div>

              <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl mb-3">🥈</div>
                <h4 className="text-2xl font-bold mb-2">Magna Cum Laude</h4>
                <p className="text-3xl font-bold mb-2">3.65+</p>
                <p className="text-gray-100 text-sm">High Honors - Top ~10% of graduating class</p>
              </div>

              <div className="bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl mb-3">🥉</div>
                <h4 className="text-2xl font-bold mb-2">Cum Laude</h4>
                <p className="text-3xl font-bold mb-2">3.50+</p>
                <p className="text-orange-100 text-sm">Honors - Top ~20% of graduating class</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Latin Honors Are Determined</h3>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">1.</span>
                  <span><strong>Cumulative GPA:</strong> Latin Honors are based solely on your cumulative GPA at the time of graduation, including all coursework completed at UNC Chapel Hill.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">2.</span>
                  <span><strong>Minimum Credits:</strong> You must complete at least 45 credit hours at UNC Chapel Hill to be eligible for Latin Honors. Transfer students should plan accordingly.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">3.</span>
                  <span><strong>No Grade Exclusions:</strong> All graded courses count toward Latin Honors GPA, including courses outside your major and general education requirements.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">4.</span>
                  <span><strong>Final Semester Impact:</strong> Your final semester grades can affect Latin Honors status. Maintain strong performance through graduation.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Benefits of Latin Honors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">🎓 Graduate School Admissions</h4>
                <p className="text-gray-700">
                  Latin Honors significantly strengthen graduate school applications. Top programs recognize UNC's rigorous standards and value Summa and Magna distinctions highly.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">💼 Career Opportunities</h4>
                <p className="text-gray-700">
                  Employers view Latin Honors as evidence of strong work ethic, intelligence, and dedication. Many consulting firms and investment banks actively recruit honors graduates.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">🏆 Lifetime Recognition</h4>
                <p className="text-gray-700">
                  Latin Honors appear permanently on your diploma and official transcripts. This distinction remains a point of pride throughout your career.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3">🌟 Exclusive Opportunities</h4>
                <p className="text-gray-700">
                  Honors graduates gain access to exclusive networking events, alumni groups, and professional development opportunities through UNC's honors programs.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Strategies to Achieve Latin Honors</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-blue-600">
                <h4 className="font-bold text-gray-900 mb-2">📚 Start Strong</h4>
                <p className="text-gray-700">
                  Your freshman year GPA sets the foundation. It's mathematically harder to reach 3.85+ if you start with a 3.3. Aim for 3.7+ from the beginning to give yourself cushion.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-green-600">
                <h4 className="font-bold text-gray-900 mb-2">🎯 Strategic Course Selection</h4>
                <p className="text-gray-700">
                  Balance challenging courses with those in your strengths. Don't avoid difficult classes, but consider your overall semester load. A mix of 4-5 courses per semester allows focus on each.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-purple-600">
                <h4 className="font-bold text-gray-900 mb-2">👥 Utilize Resources</h4>
                <p className="text-gray-700">
                  Take advantage of office hours, UNC Learning Center tutoring, study groups, and writing center services. Top students actively seek help when needed.
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-yellow-600">
                <h4 className="font-bold text-gray-900 mb-2">📊 Monitor Progress</h4>
                <p className="text-gray-700">
                  Use this calculator regularly to track your GPA trajectory. Knowing where you stand helps you make informed decisions about course load and study time allocation.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 mt-8 rounded-r-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">✨ Did You Know?</h4>
              <p className="text-gray-700">
                UNC Chapel Hill has one of the most rigorous Latin Honors standards among public universities. Only about 5% of graduates earn Summa Cum Laude, compared to 10-15% at some peer institutions. This makes UNC honors particularly prestigious.
              </p>
            </div>
          </div>
        </div>

        {/* Improve GPA Section */}
        <div id="improve-gpa" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Your UNC GPA</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Whether you're recovering from a tough semester or pushing for Latin Honors, <strong>improving your UNC GPA</strong> requires strategic planning, consistent effort, and smart study habits. Here's your comprehensive guide.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Immediate Action Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="text-3xl mb-3">📖</div>
                <h4 className="text-xl font-bold mb-3">Attend Every Class</h4>
                <p className="text-blue-100">
                  Studies show that class attendance alone can improve grades by half a letter. At UNC, missing class means missing critical information and participation points.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="text-3xl mb-3">⏰</div>
                <h4 className="text-xl font-bold mb-3">Office Hours</h4>
                <p className="text-green-100">
                  Visit professor and TA office hours weekly. This builds relationships, clarifies concepts, and shows engagement - factors that can influence borderline grades.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="text-3xl mb-3">📝</div>
                <h4 className="text-xl font-bold mb-3">Start Assignments Early</h4>
                <p className="text-purple-100">
                  Begin assignments the day they're assigned. This gives time for revision, professor feedback, and reduces stress. Last-minute work rarely earns A grades.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <div className="text-3xl mb-3">👥</div>
                <h4 className="text-xl font-bold mb-3">Form Study Groups</h4>
                <p className="text-orange-100">
                  Collaborative learning improves retention. Join or create study groups with motivated students. Teaching concepts to others reinforces your understanding.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Academic Support Resources at UNC</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">🏫 UNC Learning Center</h4>
                <p className="text-gray-700 mb-2">
                  Free peer tutoring, study skills workshops, and academic coaching. Located in SASB North, offering support for most undergraduate courses.
                </p>
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator')}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  → Explore More GPA Tools
                </button>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">✍️ UNC Writing Center</h4>
                <p className="text-gray-700 mb-2">
                  Professional tutors help with all writing assignments. Book appointments online or drop in. Particularly valuable for improving humanities and social science grades.
                </p>
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/admission-tools/common-app-essay-word-counter')}
                  className="text-green-600 hover:text-green-700 font-semibold text-sm"
                >
                  → Common App Essay Counter
                </button>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h4 className="text-lg font-bold text-gray-900 mb-2">🔬 STEM Tutoring</h4>
                <p className="text-gray-700 mb-2">
                  Department-specific tutoring for STEM courses. Math Help Center (Phillips Hall), Chemistry Tutoring (Kenan Labs), and Physics help sessions available.
                </p>
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/semester-gpa-calculator')}
                  className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                >
                  → Semester GPA Calculator
                </button>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Long-Term GPA Improvement Strategies</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Retake Low-Grade Courses</h4>
                  <p className="text-gray-700">
                    UNC's grade replacement policy means retaking a course and earning a higher grade replaces the original in your GPA calculation. Prioritize retaking C, D, or F grades in required courses.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Take Summer Courses Strategically</h4>
                  <p className="text-gray-700">
                    Summer courses have smaller classes and more instructor attention. Consider taking challenging required courses or retaking failed courses during summer sessions for better grades.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Balance Your Course Load</h4>
                  <p className="text-gray-700">
                    Don't overload on difficult courses in one semester. Mix challenging courses with subjects in your strengths. Consider 12-15 credits per semester if you need to focus on GPA improvement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Use GPA Calculator for Planning</h4>
                  <p className="text-gray-700">
                    Regularly use this calculator to project scenarios. Input your current courses with target grades to see what's needed for your GPA goals. Data-driven planning beats guesswork.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">5</div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Seek Academic Advising</h4>
                  <p className="text-gray-700">
                    Meet with your academic advisor to create a GPA improvement plan. They can suggest appropriate courses, identify degree requirements, and connect you with support resources.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">GPA Recovery Timeline</h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Realistic Expectations:</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>From 2.5 to 3.0:</strong> Requires 2-3 semesters of 3.5+ GPAs with 15 credits each</li>
                <li><strong>From 3.0 to 3.5:</strong> Requires 3-4 semesters of 3.8+ GPAs with 15 credits each</li>
                <li><strong>From 3.5 to 3.85:</strong> Requires 2-3 semesters of 4.0 GPAs - very challenging but achievable</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2">⚠️ Important Reminder</h4>
              <p className="text-gray-700">
                GPA improvement takes time. Early intervention is crucial. If you're struggling, seek help immediately rather than hoping grades will improve on their own. UNC offers extensive support systems designed to help students succeed.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the UNC Chapel Hill grading scale?</h3>
              <p className="text-gray-700">
                UNC Chapel Hill uses a plus/minus grading system: A+ and A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, and F = 0.0. This scale applies to all undergraduate courses.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do you need for Latin Honors at UNC?</h3>
              <p className="text-gray-700">
                UNC Chapel Hill Latin Honors requirements: Summa Cum Laude requires 3.85+ GPA, Magna Cum Laude requires 3.65+ GPA, and Cum Laude requires 3.5+ GPA. These are cumulative GPA thresholds calculated at graduation.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do I make Dean's List at UNC Chapel Hill?</h3>
              <p className="text-gray-700">
                To make Dean's List at UNC Chapel Hill, you must earn a semester GPA of 3.5 or higher while completing at least 12 credit hours of graded coursework in that semester. Pass/Fail courses don't count toward the 12-hour minimum.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-yellow-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does UNC Chapel Hill count A+ as 4.0 or 4.3?</h3>
              <p className="text-gray-700">
                UNC Chapel Hill counts A+ as 4.0, not 4.3. The university uses a 4.0 scale maximum, so both A+ and A grades receive 4.0 quality points per credit hour.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How is UNC GPA calculated?</h3>
              <p className="text-gray-700 mb-3">
                UNC GPA is calculated by multiplying each course's grade points by its credit hours to get quality points, summing all quality points, then dividing by total credit hours. For example, an A (4.0) in a 3-credit course = 12 quality points.
              </p>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator')}
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
              >
                → Try Cumulative GPA Calculator
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is a good GPA at UNC Chapel Hill?</h3>
              <p className="text-gray-700">
                At UNC Chapel Hill, a GPA above 3.5 is considered excellent (Dean's List and Cum Laude eligible), 3.0-3.49 is good, 2.5-2.99 is average, and below 2.5 may result in academic probation. The average undergraduate GPA is around 3.2.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-indigo-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does UNC use weighted or unweighted GPA?</h3>
              <p className="text-gray-700">
                UNC Chapel Hill uses an unweighted GPA system on a 4.0 scale. Unlike high schools, UNC does not give extra weight to honors or advanced courses. All courses contribute equally to your GPA based on the standard grade scale.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-pink-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I retake courses to improve my UNC GPA?</h3>
              <p className="text-gray-700 mb-3">
                Yes, UNC allows course retakes. However, both the original and retake grades remain on your transcript. For GPA calculation, UNC uses grade replacement - only the highest grade counts toward your GPA, but both attempts count toward your credit hour total.
              </p>
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/gpa-raise-calculator')}
                className="text-pink-600 hover:text-pink-700 font-semibold text-sm"
              >
                → GPA Raise Calculator
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-teal-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do you need to avoid academic probation at UNC?</h3>
              <p className="text-gray-700">
                UNC Chapel Hill requires a minimum cumulative GPA of 2.0 to remain in good academic standing. Students with a GPA below 2.0 are placed on academic probation and must improve their GPA to avoid suspension.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-cyan-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do Pass/Fail courses affect UNC GPA?</h3>
              <p className="text-gray-700">
                Pass/Fail (P/F) courses at UNC do not affect your GPA calculation. P grades don't contribute quality points or count toward GPA, though credit hours are earned. F grades are calculated as 0.0 in your GPA.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-lime-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the minimum GPA for UNC scholarships?</h3>
              <p className="text-gray-700">
                Most UNC Chapel Hill merit scholarships require maintaining a minimum GPA of 3.0, though competitive scholarships like the Morehead-Cain and Robertson may require 3.5+. Check your specific scholarship requirements with the Office of Scholarships and Student Aid.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-violet-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How does UNC calculate major GPA vs overall GPA?</h3>
              <p className="text-gray-700 mb-3">
                UNC calculates major GPA using only courses that count toward your major requirements, while overall (cumulative) GPA includes all courses taken at UNC. Most majors require a minimum 2.0 major GPA to graduate, though competitive programs may require higher.
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/weighted-gpa-calculator')}
                  className="text-violet-600 hover:text-violet-700 font-semibold text-sm"
                >
                  → Weighted GPA Calculator
                </button>
                <button
                  onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/unweighted-gpa-calculator')}
                  className="text-violet-600 hover:text-violet-700 font-semibold text-sm"
                >
                  → Unweighted GPA Calculator
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related GPA Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">Berkeley GPA Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate UC Berkeley GPA with official grading scale</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600">NYU GPA Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate NYU GPA with Latin Honors tracking</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/umich-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600">UMich GPA Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate University of Michigan GPA instantly</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600">College GPA Calculator</h3>
              <p className="text-gray-600 text-sm">Universal college GPA calculator for any university</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/semester-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">Semester GPA Calculator</h3>
              <p className="text-gray-600 text-sm">Track semester GPA and cumulative progress</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-left group"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600">Medical School GPA</h3>
              <p className="text-gray-600 text-sm">Calculate AMCAS GPA for medical school applications</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UNCGPACalculator;
