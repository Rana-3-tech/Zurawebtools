import React, { useState, useEffect } from 'react';
import { Page } from '../../App';

interface GeorgiaTechGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const GeorgiaTechGPACalculator: React.FC<GeorgiaTechGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([{ id: Date.now(), name: '', grade: '', credits: 3 }]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // SEO and metadata
  useEffect(() => {
    document.title = "Georgia Tech GPA Calculator - Yellow Jackets Grade Calculator | ZuraWebTools";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Georgia Tech GPA calculator with official GT 4.0 grading scale. Track Faculty Honors (top 5%), Highest Honors (3.8+ GPA), Dean\'s List (3.0+), and co-op requirements for engineering students.');
    }

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow');
    }

    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.setAttribute('content', 'ZuraWebTools');
    }

    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator');
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Georgia Tech GPA Calculator - Yellow Jackets Grade Calculator' },
      { property: 'og:description', content: 'Calculate your Georgia Tech GPA with official GT grading scale. Track Faculty Honors, Highest Honors, Dean\'s List, and co-op eligibility for engineering programs.' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://zurawebtools.com/images/georgia-tech-gpa-calculator-og.jpg' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Georgia Tech GPA Calculator - Yellow Jackets Grade Calculator' },
      { name: 'twitter:description', content: 'Calculate your Georgia Tech GPA with official GT grading scale. Track Faculty Honors, Highest Honors, and co-op eligibility.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/images/georgia-tech-gpa-calculator-twitter.jpg' },
    ];

    twitterTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // JSON-LD Schema for SoftwareApplication
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Georgia Tech GPA Calculator",
      "description": "Calculate your Georgia Tech GPA with official GT 4.0 grading scale. Track Faculty Honors (top 5%), Highest Honors (3.8+ GPA), Dean's List (3.0+), and co-op eligibility.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "523",
        "bestRating": "5",
        "worstRating": "1"
      }
    });
    document.head.appendChild(schemaScript);

    // JSON-LD Schema for BreadcrumbList
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
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
          "name": "Georgia Tech GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    // JSON-LD Schema for FAQPage
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Georgia Tech grading scale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Georgia Tech uses a 4.0 grading scale with straight letter grades: A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. There are no plus/minus grades at Georgia Tech, making it a simpler system than many universities."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for Faculty Honors at Georgia Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Faculty Honors at Georgia Tech is awarded to the top 5% of students in each college. While the exact GPA varies by college and year, it typically requires a GPA of 3.8 or higher. This is Georgia Tech's highest academic distinction."
          }
        },
        {
          "@type": "Question",
          "name": "What is the Dean's List requirement at Georgia Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To make the Dean's List at Georgia Tech, you must achieve a semester GPA of 3.0 or higher while completing at least 12 credit hours of graded coursework. This recognition appears on your transcript and demonstrates consistent academic achievement."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for a co-op at Georgia Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most Georgia Tech co-op programs require a minimum GPA of 2.7 to participate. However, more competitive co-op positions and companies may require 3.0 or higher. Maintaining a strong GPA is essential for securing top engineering co-ops."
          }
        },
        {
          "@type": "Question",
          "name": "How do I transfer into Computer Science at Georgia Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Transferring into the CS program at Georgia Tech is highly competitive. While there's no official minimum GPA, successful transfers typically have a 3.7 or higher GPA. You must also complete required coursework with strong grades and demonstrate commitment to the field."
          }
        },
        {
          "@type": "Question",
          "name": "Does Georgia Tech use plus/minus grading?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, Georgia Tech does not use plus/minus grading. The university uses straight letter grades (A, B, C, D, F) with whole number GPA values. This makes GPA calculation simpler compared to schools that use A-, B+, etc."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need to graduate with Highest Honors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To graduate with Highest Honors from Georgia Tech, you need a cumulative GPA of 3.8 or higher. This is the most prestigious graduation honor and appears prominently on your diploma and transcript."
          }
        },
        {
          "@type": "Question",
          "name": "How is cumulative GPA calculated at Georgia Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cumulative GPA at Georgia Tech is calculated by dividing total quality points by total credit hours attempted. Quality points are earned by multiplying each course's grade value (A=4.0, B=3.0, etc.) by its credit hours."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if my GPA falls below 2.0 at Georgia Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If your cumulative GPA falls below 2.0, you'll be placed on academic probation. You'll have one semester to raise your GPA above 2.0. Failure to do so may result in academic dismissal. Georgia Tech offers academic support resources to help students improve."
          }
        },
        {
          "@type": "Question",
          "name": "Can I retake courses to improve my Georgia Tech GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Georgia Tech allows grade substitution for retaken courses. If you retake a course, the new grade replaces the old grade in your GPA calculation, though both grades remain on your transcript. This policy helps students recover from poor grades."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for graduate school from Georgia Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For competitive graduate programs, aim for a 3.5+ GPA. Top engineering graduate schools typically look for 3.3 or higher from Georgia Tech students. However, research experience and strong letters often matter as much as GPA."
          }
        },
        {
          "@type": "Question",
          "name": "Does Georgia Tech calculate institutional and overall GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Georgia Tech maintains both institutional GPA (courses taken at GT only) and overall GPA (including transfer credits). For honors and academic standing, institutional GPA is typically used. Both GPAs appear on your official transcript."
          }
        }
      ]
    });
    document.head.appendChild(faqScript);

    return () => {
      document.head.removeChild(schemaScript);
      document.head.removeChild(breadcrumbScript);
      document.head.removeChild(faqScript);
    };
  }, []);

  // Grade scale mapping
  const gradeScale: { [key: string]: number } = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', grade: '', credits: 3 }]);
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
      let qualityPoints = 0;
      let credits = 0;

      courses.forEach(course => {
        if (course.grade && course.credits > 0) {
          const gradeValue = gradeScale[course.grade] || 0;
          qualityPoints += gradeValue * course.credits;
          credits += course.credits;
        }
      });

      const calculatedGPA = credits > 0 ? qualityPoints / credits : 0;
      setGpa(parseFloat(calculatedGPA.toFixed(2)));
      setTotalCredits(credits);
      setTotalQualityPoints(parseFloat(qualityPoints.toFixed(2)));
      setShowResults(true);
      setIsCalculating(false);
    }, 500);
  };

  const resetCalculator = () => {
    setCourses([{ id: Date.now(), name: '', grade: '', credits: 3 }]);
    setGpa(0);
    setTotalCredits(0);
    setTotalQualityPoints(0);
    setShowResults(false);
  };

  const getHonorsLevel = (gpa: number): string => {
    if (gpa >= 3.8) return "Highest Honors";
    if (gpa >= 3.5) return "High Honors";
    if (gpa >= 3.25) return "Honors";
    return "Not Eligible";
  };

  const getDeansListStatus = (gpa: number, credits: number): string => {
    if (gpa >= 3.0 && credits >= 12) return "Eligible";
    if (gpa < 3.0 && credits >= 12) return `Need ${(3.0 - gpa).toFixed(2)} more GPA points`;
    if (gpa >= 3.0 && credits < 12) return `Need ${12 - credits} more credits`;
    return "Not Eligible";
  };

  const getAcademicStanding = (gpa: number): { status: string; color: string } => {
    if (gpa >= 3.5) return { status: "Excellent Standing", color: "text-green-600" };
    if (gpa >= 3.0) return { status: "Good Standing", color: "text-blue-600" };
    if (gpa >= 2.0) return { status: "Satisfactory Standing", color: "text-yellow-600" };
    return { status: "Academic Probation", color: "text-red-600" };
  };

  const getCoopEligibility = (gpa: number): string => {
    if (gpa >= 3.0) return "Eligible (Competitive for Top Co-ops)";
    if (gpa >= 2.7) return "Eligible (Minimum Requirement Met)";
    return `Not Eligible (Need ${(2.7 - gpa).toFixed(2)} more GPA points)`;
  };

  const getCSTransferEligibility = (gpa: number): string => {
    if (gpa >= 3.7) return "Competitive for CS Transfer";
    if (gpa >= 3.3) return "Consider Strengthening Application";
    return `Below Typical CS Transfer Range (${(3.7 - gpa).toFixed(2)} points needed)`;
  };

  const handlePrint = () => {
    const printContent = `
GEORGIA TECH GPA CALCULATOR - RESULTS
=====================================

Semester GPA: ${gpa.toFixed(2)}
Total Credits: ${totalCredits}
Quality Points: ${totalQualityPoints}

COURSE BREAKDOWN:
${courses.filter(c => c.grade && c.credits > 0).map((c, i) => 
  `${i + 1}. ${c.name || 'Course ' + (i + 1)}: ${c.grade} (${c.credits} credits) - ${(gradeScale[c.grade] * c.credits).toFixed(2)} quality points`
).join('\n')}

ACADEMIC STATUS:
- Graduation Honors: ${getHonorsLevel(gpa)}
- Dean's List: ${getDeansListStatus(gpa, totalCredits)}
- Academic Standing: ${getAcademicStanding(gpa).status}
- Co-op Eligibility: ${getCoopEligibility(gpa)}
- CS Transfer Status: ${getCSTransferEligibility(gpa)}

Generated by ZuraWebTools - Georgia Tech GPA Calculator
https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator
    `.trim();

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<pre>' + printContent + '</pre>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownload = () => {
    const downloadContent = `GEORGIA TECH GPA CALCULATOR - RESULTS
=====================================

Semester GPA: ${gpa.toFixed(2)}
Total Credits: ${totalCredits}
Quality Points: ${totalQualityPoints}

COURSE BREAKDOWN:
${courses.filter(c => c.grade && c.credits > 0).map((c, i) => 
  `${i + 1}. ${c.name || 'Course ' + (i + 1)}: ${c.grade} (${c.credits} credits) - ${(gradeScale[c.grade] * c.credits).toFixed(2)} quality points`
).join('\n')}

ACADEMIC STATUS:
- Graduation Honors: ${getHonorsLevel(gpa)}
- Dean's List: ${getDeansListStatus(gpa, totalCredits)}
- Academic Standing: ${getAcademicStanding(gpa).status}
- Co-op Eligibility: ${getCoopEligibility(gpa)}
- CS Transfer Status: ${getCSTransferEligibility(gpa)}

Generated by ZuraWebTools - Georgia Tech GPA Calculator
https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator`;

    const blob = new Blob([downloadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `georgia-tech-gpa-${gpa.toFixed(2)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `I calculated my Georgia Tech GPA: ${gpa.toFixed(2)} 🎓 Check your GPA at ZuraWebTools!`;
    const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Georgia Tech GPA Calculator',
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  const getGPAColor = (gpa: number): string => {
    if (gpa >= 3.5) return 'from-green-500 to-emerald-600';
    if (gpa >= 3.0) return 'from-blue-500 to-cyan-600';
    if (gpa >= 2.5) return 'from-yellow-500 to-amber-600';
    if (gpa >= 2.0) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  const getGPAProgressColor = (gpa: number): string => {
    if (gpa >= 3.5) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (gpa >= 3.0) return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    if (gpa >= 2.5) return 'bg-gradient-to-r from-yellow-500 to-amber-600';
    if (gpa >= 2.0) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-red-500 to-rose-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-blue-700 bg-clip-text text-transparent">
            Georgia Tech GPA Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Calculate your Yellow Jackets GPA with the official Georgia Tech 4.0 grading scale
          </p>
          <p className="text-lg text-gray-500">
            Track Faculty Honors, Highest Honors, Dean's List status, and co-op eligibility for engineering programs
          </p>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Your Courses</h2>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="md:col-span-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2" aria-label="Course Name">
                    Course Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., CS 1331 - Intro to OOP"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    aria-label={`Course name ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2" aria-label="Letter Grade">
                    Letter Grade
                  </label>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    aria-label={`Grade for course ${index + 1}`}
                  >
                    <option value="">Select Grade</option>
                    <option value="A">A (4.0)</option>
                    <option value="B">B (3.0)</option>
                    <option value="C">C (2.0)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2" aria-label="Credit Hours">
                    Credit Hours
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    step="0.5"
                    placeholder="3"
                    value={course.credits || ''}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    aria-label={`Credit hours for course ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="w-full px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    aria-label={`Remove course ${index + 1}`}
                    disabled={courses.length === 1}
                  >
                    <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={addCourse}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-blue-600 text-white rounded-lg hover:from-yellow-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Course
              </span>
            </button>

            <button
              onClick={calculateGPA}
              disabled={isCalculating || courses.every(c => !c.grade)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calculate GPA
                </span>
              )}
            </button>

            <button
              onClick={resetCalculator}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Georgia Tech GPA Results</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className={`bg-gradient-to-br ${getGPAColor(gpa)} p-6 rounded-xl shadow-lg text-white`}>
                <div className="text-sm font-semibold mb-2 opacity-90">Semester GPA</div>
                <div className="text-4xl font-bold">{gpa.toFixed(2)}</div>
                <div className="text-sm mt-2 opacity-90">{getHonorsLevel(gpa)}</div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-xl shadow-lg text-white">
                <div className="text-sm font-semibold mb-2 opacity-90">Total Credits</div>
                <div className="text-4xl font-bold">{totalCredits}</div>
                <div className="text-sm mt-2 opacity-90">Credit Hours</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl shadow-lg text-white">
                <div className="text-sm font-semibold mb-2 opacity-90">Quality Points</div>
                <div className="text-4xl font-bold">{totalQualityPoints}</div>
                <div className="text-sm mt-2 opacity-90">Total Earned</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
                <div className="text-sm font-semibold mb-2 opacity-90">Dean's List</div>
                <div className="text-2xl font-bold">{getDeansListStatus(gpa, totalCredits)}</div>
                <div className="text-sm mt-2 opacity-90">3.0+ GPA Required</div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">GPA Progress</span>
                <span className="text-sm font-semibold text-gray-700">{gpa.toFixed(2)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${getGPAProgressColor(gpa)} transition-all duration-500`}
                  style={{ width: `${(gpa / 4.0) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-800 mb-2">Academic Standing</h3>
                <p className={`text-lg font-bold ${getAcademicStanding(gpa).color}`}>
                  {getAcademicStanding(gpa).status}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-800 mb-2">Co-op Eligibility</h3>
                <p className="text-gray-700">{getCoopEligibility(gpa)}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-800 mb-2">Graduation Honors</h3>
                <p className="text-gray-700">{getHonorsLevel(gpa)}</p>
                <p className="text-sm text-gray-600 mt-1">Highest: 3.8+ | High: 3.5+ | Honors: 3.25+</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-gray-800 mb-2">CS Transfer Status</h3>
                <p className="text-gray-700">{getCSTransferEligibility(gpa)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleShare}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Results
                </span>
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Report
                </span>
              </button>

              <button
                onClick={handlePrint}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Report
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#how-to-use" className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all">
              <span className="text-2xl mr-3">📖</span>
              <span className="font-semibold text-gray-800">How to Use This Calculator</span>
            </a>
            <a href="#about-gt-gpa" className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-all">
              <span className="text-2xl mr-3">🎓</span>
              <span className="font-semibold text-gray-800">About Georgia Tech GPA</span>
            </a>
            <a href="#grade-scale" className="flex items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg hover:from-green-100 hover:to-teal-100 transition-all">
              <span className="text-2xl mr-3">📊</span>
              <span className="font-semibold text-gray-800">GT Grading Scale</span>
            </a>
            <a href="#calculation-method" className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all">
              <span className="text-2xl mr-3">🧮</span>
              <span className="font-semibold text-gray-800">GPA Calculation Method</span>
            </a>
            <a href="#comparison" className="flex items-center p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg hover:from-red-100 hover:to-rose-100 transition-all">
              <span className="text-2xl mr-3">⚖️</span>
              <span className="font-semibold text-gray-800">Compare Universities</span>
            </a>
            <a href="#honors" className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg hover:from-indigo-100 hover:to-blue-100 transition-all">
              <span className="text-2xl mr-3">🏆</span>
              <span className="font-semibold text-gray-800">Graduation Honors</span>
            </a>
            <a href="#improve-gpa" className="flex items-center p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg hover:from-amber-100 hover:to-yellow-100 transition-all">
              <span className="text-2xl mr-3">📈</span>
              <span className="font-semibold text-gray-800">How to Improve Your GPA</span>
            </a>
            <a href="#faqs" className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg hover:from-teal-100 hover:to-green-100 transition-all">
              <span className="text-2xl mr-3">❓</span>
              <span className="font-semibold text-gray-800">Frequently Asked Questions</span>
            </a>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Use the Georgia Tech GPA Calculator</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Enter Your Course Information</h3>
                <p className="text-gray-600">
                  Start by entering each course name (optional), selecting the letter grade you earned (A, B, C, D, or F), and entering the credit hours for that course. Most Georgia Tech courses are 3 credit hours, but some labs and seminars may vary.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Multiple Courses</h3>
                <p className="text-gray-600">
                  Click the "Add Course" button to add more courses to your calculation. You can add as many courses as you need for an accurate semester or cumulative GPA calculation. Georgia Tech students typically take 12-18 credit hours per semester.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Official GT Letter Grades</h3>
                <p className="text-gray-600">
                  Choose from the official Georgia Tech grading scale: A (4.0), B (3.0), C (2.0), D (1.0), or F (0.0). Remember, Georgia Tech does not use plus/minus grades, making the system simpler than many other universities.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-600">
                  Once you've entered all your courses, click the "Calculate GPA" button. The calculator will instantly compute your semester GPA, total credit hours, and quality points using the official Georgia Tech formula.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">View Your Academic Status</h3>
                <p className="text-gray-600">
                  Review your detailed results including graduation honors eligibility (Highest Honors, High Honors, or Honors), Dean's List status, co-op eligibility, and CS transfer competitiveness. Each status is clearly explained with specific GPA requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                6
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Your Progress Visually</h3>
                <p className="text-gray-600">
                  Use the color-coded progress bar and gradient cards to visualize your academic performance. Green indicates excellent standing (3.5+), blue shows good standing (3.0+), yellow represents satisfactory (2.5+), and red indicates areas needing improvement.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                7
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Share, Download, or Print Your Results</h3>
                <p className="text-gray-600">
                  Save your GPA calculation by downloading a text report, printing a formatted summary, or sharing your achievement with friends. All options preserve your complete course breakdown and academic status information.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-blue-50 rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Pro Tip for Yellow Jackets</h3>
            <p className="text-gray-700">
              Use this calculator at the beginning of each semester to set GPA goals, then recalculate after midterms to track your progress. For cumulative GPA tracking, try our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator' as Page)} className="text-blue-600 hover:text-blue-700 underline font-semibold">Cumulative GPA Calculator</button> to plan your path to Faculty Honors or Dean's List throughout your entire Georgia Tech career.
            </p>
          </div>
        </div>

        {/* About Georgia Tech GPA Section */}
        <div id="about-gt-gpa" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Georgia Tech GPA</h2>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is GPA at Georgia Tech?</h3>
          <p className="text-gray-600 mb-4">
            Your Grade Point Average (GPA) at Georgia Institute of Technology is a numerical representation of your academic performance. Georgia Tech uses a straightforward 4.0 scale with letter grades only—no plus or minus designations.
          </p>
          <p className="text-gray-600 mb-6">
            This makes the GT grading system simpler and more transparent than many peer institutions. An A is always 4.0, a B is always 3.0, and so on. Your GPA is calculated by dividing total quality points by total credit hours attempted.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Georgia Tech's 4.0 Grading System</h3>
          <p className="text-gray-600 mb-4">
            Georgia Tech's grading philosophy emphasizes clarity and consistency. The straight letter grade system (A, B, C, D, F) without plus/minus variations ensures that faculty across all colleges use the same standards.
          </p>
          <p className="text-gray-600 mb-6">
            This system is particularly well-suited for Georgia Tech's rigorous STEM curriculum, where objective assessment standards are paramount. The 4.0 scale has been used at GT for decades and is well-understood by graduate schools and employers.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Types of GPA at Georgia Tech</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Institutional GPA</h4>
              <p className="text-gray-600">
                Includes only courses taken at Georgia Tech. This is the primary GPA used for honors, Dean's List, and academic standing decisions. Most internal GT programs reference this GPA.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Overall GPA</h4>
              <p className="text-gray-600">
                Combines all coursework, including transfer credits from other institutions. Graduate schools and employers typically review this comprehensive GPA when evaluating applications.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Major GPA</h4>
              <p className="text-gray-600">
                Calculated from courses specifically required for your major. Some competitive programs (like CS) and graduate schools pay special attention to your major GPA to assess technical competency.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Your Georgia Tech GPA Matters</h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Co-op and Internship Opportunities</h4>
                <p className="text-gray-600">
                  Georgia Tech's co-op program is one of the largest and most prestigious in the nation. Most positions require a minimum 2.7 GPA, while competitive placements at top tech companies often seek 3.0 or higher. Your GPA opens doors to invaluable work experience.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Internal Transfer and Program Changes</h4>
                <p className="text-gray-600">
                  Want to switch to Computer Science or another competitive major? Internal transfers at Georgia Tech are highly competitive, typically requiring 3.7+ GPAs for CS and 3.3+ for other engineering disciplines. Your GPA is the primary factor in transfer decisions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Graduate School Admissions</h4>
                <p className="text-gray-600">
                  Whether you're pursuing a master's degree or PhD, your Georgia Tech GPA is a critical factor. Top engineering graduate programs typically expect 3.5+ GPAs, while a Georgia Tech degree with strong grades carries significant weight in admissions.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Scholarships and Financial Aid</h4>
                <p className="text-gray-600">
                  Many GT scholarships require maintaining specific GPA thresholds (often 3.0 or 3.3). The Presidential Scholarship, Stamps Scholarship, and department-specific awards all have GPA requirements that must be maintained annually.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Dean's List and Faculty Honors Recognition</h4>
                <p className="text-gray-600">
                  Dean's List (3.0+ semester GPA with 12+ credits) and Faculty Honors (top 5% of college) are prestigious recognitions that appear on your transcript. These honors significantly enhance your resume and demonstrate academic excellence at a top engineering school.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-1">
                ✓
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">Career Opportunities and Recruiting</h4>
                <p className="text-gray-600">
                  Many employers recruiting at Georgia Tech career fairs set GPA cutoffs (typically 3.0+) for interviews. Tech giants, consulting firms, and finance companies often use GPA as an initial screening criterion. A strong GT GPA signals you can handle challenging technical work.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-blue-500">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">📌 Important Note for Transfer Students</h4>
            <p className="text-gray-700">
              If you transferred to Georgia Tech, your institutional GPA starts fresh at GT. Transfer credits count toward graduation but don't affect your GT GPA. However, your overall GPA (combining all institutions) is calculated for some purposes like graduate school applications. For accurate cumulative tracking across schools, use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator' as Page)} className="text-blue-600 hover:text-blue-700 underline font-semibold">Cumulative GPA Calculator</button>.
            </p>
          </div>
        </div>

        {/* Grade Scale Section */}
        <div id="grade-scale" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Georgia Tech Grading Scale</h2>

          <p className="text-gray-600 mb-6">
            Georgia Tech uses a straightforward 4.0 grading scale with letter grades only—no plus or minus designations. This makes the GT grading system simpler and more transparent than many peer institutions. Here's the complete breakdown of how grades translate to GPA points.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-yellow-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Letter Grade</th>
                  <th className="px-6 py-4 text-left font-bold">GPA Value</th>
                  <th className="px-6 py-4 text-left font-bold">Percentage Range</th>
                  <th className="px-6 py-4 text-left font-bold">Quality Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-green-50 hover:bg-green-100 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">A</td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">4.0</td>
                  <td className="px-6 py-4 text-gray-700">90-100%</td>
                  <td className="px-6 py-4 text-gray-700">Excellent</td>
                </tr>
                <tr className="bg-blue-50 hover:bg-blue-100 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">B</td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">3.0</td>
                  <td className="px-6 py-4 text-gray-700">80-89%</td>
                  <td className="px-6 py-4 text-gray-700">Good</td>
                </tr>
                <tr className="bg-yellow-50 hover:bg-yellow-100 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">C</td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">2.0</td>
                  <td className="px-6 py-4 text-gray-700">70-79%</td>
                  <td className="px-6 py-4 text-gray-700">Satisfactory</td>
                </tr>
                <tr className="bg-orange-50 hover:bg-orange-100 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">D</td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">1.0</td>
                  <td className="px-6 py-4 text-gray-700">60-69%</td>
                  <td className="px-6 py-4 text-gray-700">Passing</td>
                </tr>
                <tr className="bg-red-50 hover:bg-red-100 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">F</td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">0.0</td>
                  <td className="px-6 py-4 text-gray-700">Below 60%</td>
                  <td className="px-6 py-4 text-gray-700">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border-2 border-yellow-300">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-2xl mr-2">✓</span>
                No Plus/Minus
              </h4>
              <p className="text-sm text-gray-700">Georgia Tech doesn't use A-, B+, etc. An A is always 4.0, making calculations simple and consistent.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Whole Numbers
              </h4>
              <p className="text-sm text-gray-700">All GPA values are whole numbers (4.0, 3.0, 2.0, 1.0, 0.0), making it easier to calculate and predict your GPA.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-2xl mr-2">📐</span>
                Consistent Scale
              </h4>
              <p className="text-sm text-gray-700">All colleges at Georgia Tech use the same grading scale, ensuring fairness across engineering, computing, and sciences.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-2xl mr-2">🔄</span>
                Grade Substitution
              </h4>
              <p className="text-sm text-gray-700">GT allows retaking courses, and the new grade replaces the old in GPA calculations (both remain on transcript).</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-blue-50 border-l-4 border-yellow-600 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Key Points About GT Grading</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3 text-lg">•</span>
                <span><strong>Pass/Fail Option:</strong> Some courses can be taken P/F, but these don't count toward GPA calculations. Required courses for your major typically cannot be taken P/F.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 font-bold mr-3 text-lg">•</span>
                <span><strong>Withdrawal (W):</strong> Withdrawing from a course shows a W on your transcript but doesn't affect GPA. However, too many Ws can raise concerns for graduate schools or employers.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 font-bold mr-3 text-lg">•</span>
                <span><strong>Incomplete (I):</strong> An incomplete grade must be resolved within one year or it converts to an F. Plan accordingly to avoid GPA damage.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-700 font-bold mr-3 text-lg">•</span>
                <span><strong>Transfer Credits:</strong> Grades from other institutions don't transfer to GT—only credits count. Your institutional GPA at Georgia Tech starts at 0.00.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* GPA Calculation Method Section */}
        <div id="calculation-method" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How Georgia Tech GPA is Calculated</h2>

          <p className="text-gray-600 mb-6">
            Understanding how your GPA is calculated at Georgia Tech helps you plan strategically and set realistic academic goals. The calculation is straightforward with the 4.0 letter grade system—no complex plus/minus math required.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">The GPA Formula</h3>

          <div className="bg-gradient-to-r from-yellow-50 to-blue-50 p-8 rounded-xl border-2 border-yellow-300 mb-8">
            <div className="text-center mb-4">
              <p className="text-gray-700 mb-2 text-lg">Your GPA is calculated using this formula:</p>
              <div className="bg-white p-6 rounded-lg shadow-md inline-block">
                <p className="text-3xl font-bold text-gray-900 mb-2">GPA = Total Quality Points ÷ Total Credit Hours</p>
                <p className="text-sm text-gray-600 mt-4">Where: <strong>Quality Points</strong> = Grade Value × Credit Hours</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Step-by-Step Calculation Example</h3>

          <p className="text-gray-600 mb-4">
            Let's calculate GPA for a typical Georgia Tech engineering student taking 5 courses:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-yellow-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Course</th>
                  <th className="px-6 py-4 text-left font-bold">Grade</th>
                  <th className="px-6 py-4 text-left font-bold">Credits</th>
                  <th className="px-6 py-4 text-left font-bold">Grade Value</th>
                  <th className="px-6 py-4 text-left font-bold">Quality Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">CS 1331 - Intro to OOP</td>
                  <td className="px-6 py-4 font-bold text-green-600">A</td>
                  <td className="px-6 py-4 text-gray-700">3</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">12.0</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">MATH 2552 - Diff Equations</td>
                  <td className="px-6 py-4 font-bold text-blue-600">B</td>
                  <td className="px-6 py-4 text-gray-700">4</td>
                  <td className="px-6 py-4 text-gray-700">3.0</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">12.0</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">PHYS 2212 - Physics II</td>
                  <td className="px-6 py-4 font-bold text-green-600">A</td>
                  <td className="px-6 py-4 text-gray-700">4</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">16.0</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">ECE 2020 - Digital Systems</td>
                  <td className="px-6 py-4 font-bold text-blue-600">B</td>
                  <td className="px-6 py-4 text-gray-700">3</td>
                  <td className="px-6 py-4 text-gray-700">3.0</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">9.0</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">ENGL 1102 - English Comp II</td>
                  <td className="px-6 py-4 font-bold text-green-600">A</td>
                  <td className="px-6 py-4 text-gray-700">3</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">12.0</td>
                </tr>
                <tr className="bg-yellow-50 font-bold border-t-4 border-yellow-600">
                  <td className="px-6 py-4 text-gray-900">TOTALS</td>
                  <td className="px-6 py-4 text-gray-700">—</td>
                  <td className="px-6 py-4 text-gray-900" colSpan={2}>17 Credits</td>
                  <td className="px-6 py-4 text-gray-900">61.0 Points</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg mb-8">
            <h4 className="text-2xl font-bold mb-3">Final Calculation:</h4>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-xl mb-2">GPA = 61.0 Quality Points ÷ 17 Credit Hours</p>
              <p className="text-3xl font-bold">GPA = 3.59</p>
            </div>
            <p className="text-sm mt-4 opacity-95">This student qualifies for High Honors (3.5+) and is on track for competitive co-op placements!</p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cumulative GPA Calculation</h3>

          <p className="text-gray-600 mb-4">
            Your cumulative GPA at Georgia Tech combines all semesters. Here's how it works:
          </p>

          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-300 mb-6">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Current Cumulative Status:</p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Previous semesters: 45 credits with 3.4 GPA = 153 quality points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Current semester: 17 credits with 3.59 GPA = 61 quality points</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">New Cumulative GPA:</p>
                <p className="text-gray-700">(153 + 61) ÷ (45 + 17) = 214 ÷ 62 = <strong className="text-green-600 text-xl">3.45</strong></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-300">
              <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                <span className="text-2xl mr-2">✓</span>
                Courses That Count
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>All graded courses (A, B, C, D, F)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Repeated courses (most recent grade)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Summer session courses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <span>Study abroad GT courses</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-300">
              <h4 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                <span className="text-2xl mr-2">✗</span>
                Courses NOT Counted
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Pass/Fail courses (don't affect GPA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Transfer credits from other schools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>AP/IB credit (credit only, no grade)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Withdrawn courses (W on transcript)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-blue-50 border-l-4 border-yellow-600 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              Pro Tip for Grade Planning
            </h4>
            <p className="text-gray-700">
              Use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/gpa-raise-calculator' as Page)} className="text-blue-600 hover:text-blue-700 underline font-semibold">GPA Raise Calculator</button> to see exactly what grades you need in future semesters to reach your target GPA for Faculty Honors, co-op eligibility, or CS transfer. Strategic course planning with GPA goals in mind is key to success at Georgia Tech!
            </p>
          </div>
        </div>

        {/* University Comparison Section */}
        <div id="comparison" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Compare Georgia Tech to Other Universities</h2>

          <p className="text-gray-600 mb-6">
            Every university uses slightly different grading scales and GPA calculation methods. Understanding these differences helps if you're considering transferring, applying to graduate school, or comparing academic performance across institutions.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gradient-to-r from-yellow-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">University</th>
                  <th className="px-6 py-4 text-left font-bold">Grading System</th>
                  <th className="px-6 py-4 text-left font-bold">A- Value</th>
                  <th className="px-6 py-4 text-left font-bold">Dean's List</th>
                  <th className="px-6 py-4 text-left font-bold">Graduation Honors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-yellow-50 border-l-4 border-yellow-600 hover:bg-yellow-100">
                  <td className="px-6 py-4 font-bold text-gray-900">Georgia Tech</td>
                  <td className="px-6 py-4 text-gray-700">Letter Only (No +/-)</td>
                  <td className="px-6 py-4 text-gray-700">N/A (No A-)</td>
                  <td className="px-6 py-4 text-gray-700">3.0+</td>
                  <td className="px-6 py-4 text-gray-700">3.25+ / 3.5+ / 3.8+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">MIT</td>
                  <td className="px-6 py-4 text-gray-700">Letter Only (No +/-)</td>
                  <td className="px-6 py-4 text-gray-700">N/A (5.0 scale)</td>
                  <td className="px-6 py-4 text-gray-700">4.5+</td>
                  <td className="px-6 py-4 text-gray-700">Top 5%</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">Stanford</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">Top 15%</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">Carnegie Mellon</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.67</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.75+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">UC Berkeley</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.7+ / 3.85+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">UMich Engineering</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.7+ / 3.9+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">UT Austin</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.67</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.7+ / 3.9+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">Caltech</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">Varies</td>
                  <td className="px-6 py-4 text-gray-700">Top 5%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border-2 border-yellow-300">
              <h4 className="font-bold text-gray-900 mb-2">Simple System</h4>
              <p className="text-sm text-gray-700">GT's letter-only grading makes GPA calculation straightforward—no confusing plus/minus math required.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300">
              <h4 className="font-bold text-gray-900 mb-2">Competitive Honors</h4>
              <p className="text-sm text-gray-700">GT's Highest Honors (3.8+) is on par with top engineering schools like MIT and Caltech.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300">
              <h4 className="font-bold text-gray-900 mb-2">Transfer Students</h4>
              <p className="text-sm text-gray-700">Your previous GPA doesn't transfer—you start fresh at Georgia Tech with a clean institutional GPA.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300">
              <h4 className="font-bold text-gray-900 mb-2">Graduate Schools</h4>
              <p className="text-sm text-gray-700">Top programs know GT's rigorous STEM curriculum and adjust GPA expectations accordingly.</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-2xl mr-2">🎓</span>
              For Transfer Students
            </h4>
            <p className="text-gray-700">
              If you're transferring to Georgia Tech from another university, your GPA starts fresh. Only courses taken at GT count toward your institutional GPA, though transfer credits do count toward degree completion. Use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/college-gpa-calculator' as Page)} className="text-blue-600 hover:text-blue-700 underline font-semibold">College GPA Calculator</button> to track both GPAs separately.
            </p>
          </div>
        </div>

        {/* Graduation Honors Section */}
        <div id="honors" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Georgia Tech Graduation Honors</h2>
          <p className="text-gray-600 mb-6">
            Georgia Tech recognizes outstanding academic achievement through multiple honor programs. These distinctions appear on your diploma and transcript, showcasing your dedication to the rigorous Yellow Jacket academic experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-3">🥇</div>
              <h3 className="text-2xl font-bold mb-3">Highest Honors</h3>
              <p className="text-3xl font-bold mb-2">3.80 - 4.00</p>
              <p className="text-sm opacity-90">Top Tier Recognition</p>
              <p className="text-sm mt-4 opacity-95">The highest academic achievement at Georgia Tech, reserved for exceptional scholars</p>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-3">🥈</div>
              <h3 className="text-2xl font-bold mb-3">High Honors</h3>
              <p className="text-3xl font-bold mb-2">3.50 - 3.79</p>
              <p className="text-sm opacity-90">Distinguished Achievement</p>
              <p className="text-sm mt-4 opacity-95">Excellent academic performance demonstrating consistent scholarly excellence</p>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-3">🥉</div>
              <h3 className="text-2xl font-bold mb-3">Honors</h3>
              <p className="text-3xl font-bold mb-2">3.25 - 3.49</p>
              <p className="text-sm opacity-90">Commendable Performance</p>
              <p className="text-sm mt-4 opacity-95">Strong academic record showing dedication to academic excellence</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Faculty Honors - The Ultimate Achievement</h3>
            <p className="text-gray-700 mb-4">
              <strong>Faculty Honors</strong> is Georgia Tech's most prestigious undergraduate recognition, awarded to the <strong>top 5% of students</strong> in each college. This honor is determined by ranking, not a fixed GPA threshold.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Awarded by individual colleges (Computing, Engineering, Sciences, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Based on institutional GPA ranking within your college</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Typically requires 3.8+ GPA, but varies by college competitiveness</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span>Appears prominently on diploma and transcripts</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Dean's List Recognition</h3>
          <div className="bg-gradient-to-r from-yellow-50 to-blue-50 p-6 rounded-xl border-2 border-yellow-300 mb-8">
            <p className="text-gray-700 mb-4">
              The <strong>Dean's List</strong> recognizes students who achieve a <strong>3.0 GPA or higher</strong> in a semester while completing at least <strong>12 credit hours</strong> of graded coursework.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Requirements:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Minimum 3.0 semester GPA</li>
                  <li>✓ At least 12 graded credit hours</li>
                  <li>✓ No incomplete (I) grades</li>
                  <li>✓ Enrolled as degree-seeking student</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Benefits:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>✓ Appears on official transcript</li>
                  <li>✓ Resume and LinkedIn credential</li>
                  <li>✓ Demonstrates consistency</li>
                  <li>✓ Graduate school advantage</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Benefits of Graduation Honors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">🎓 Career Advantages</h4>
              <p className="text-gray-700 text-sm">Top tech companies, consulting firms, and engineering employers actively recruit GT honors graduates. Your honors distinction sets you apart in competitive job markets.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">🔬 Graduate School Edge</h4>
              <p className="text-gray-700 text-sm">Elite graduate programs value GT honors highly. Combined with GT's reputation, honors recognition significantly strengthens PhD and master's applications.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">🏆 Lifelong Recognition</h4>
              <p className="text-gray-700 text-sm">Honors appear on your diploma forever, announced at commencement, and remain on official transcripts. It's a permanent testament to your GT achievement.</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">💰 Scholarship Opportunities</h4>
              <p className="text-gray-700 text-sm">Many graduate fellowships (NSF, Fulbright, etc.) and professional scholarships prioritize or require honors graduates from top institutions like GT.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 to-blue-700 text-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-3">🎯 Did You Know?</h4>
            <p className="text-sm opacity-95">
              Approximately 10-15% of Georgia Tech graduates earn graduation honors each year. Faculty Honors is even more selective at top 5%. If you're aiming for these distinctions, start strong freshman year and use this calculator regularly to track your progress. The rigorous GT curriculum makes every honor well-earned! 🐝
            </p>
          </div>
        </div>

        {/* How to Improve Your GPA Section */}
        <div id="improve-gpa" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Improve Your Georgia Tech GPA</h2>
          <p className="text-gray-600 mb-6">
            Whether you're recovering from a challenging semester or pushing for Faculty Honors, these proven strategies will help you boost your GPA in Georgia Tech's rigorous academic environment.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Immediate Actions You Can Take</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="text-xl font-bold mb-3">Attend All Classes & Office Hours</h4>
              <p className="text-sm opacity-95">
                GT professors design courses assuming attendance. Missing lectures means missing crucial problem-solving approaches and exam hints. Office hours provide 1-on-1 help.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="text-xl font-bold mb-3">Form Study Groups</h4>
              <p className="text-sm opacity-95">
                Collaborate with classmates to tackle problem sets, review for exams, and share notes. Teaching others reinforces your understanding of complex STEM concepts.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="text-xl font-bold mb-3">Master Time Management</h4>
              <p className="text-sm opacity-95">
                Use planners and apps to track assignments, projects, and exams. Start problem sets early. Break large projects into manageable daily tasks.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">📖</div>
              <h4 className="text-xl font-bold mb-3">Use Campus Resources</h4>
              <p className="text-sm opacity-95">
                GT offers free tutoring, academic coaching, and peer learning. Don't wait until you're struggling—use resources proactively from day one.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Georgia Tech Campus Resources</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-l-4 border-yellow-600 p-5 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">PLUS (Peer-Led Undergraduate Study)</h4>
              <p className="text-gray-700 text-sm mb-2">
                Free peer tutoring for challenging STEM courses like Calc, Physics, and CS. Led by students who excelled in those courses. Sessions held multiple times weekly.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 p-5 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Communication Center</h4>
              <p className="text-gray-700 text-sm mb-2">
                Help with technical writing, lab reports, and presentations. Especially valuable for international students and engineering students improving communication skills.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-600 p-5 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">CARE Center (Counseling)</h4>
              <p className="text-gray-700 text-sm mb-2">
                Academic stress is real at GT. Free counseling, stress management workshops, and support groups help maintain mental health during challenging semesters.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Long-Term GPA Improvement Strategies</h3>
          <div className="space-y-3 mb-8">
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Use Grade Substitution Wisely</h4>
                <p className="text-gray-700 text-sm">GT allows retaking courses with grade replacement in GPA calculation. Strategically retake C or D grades to boost your average significantly.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Take Summer Courses</h4>
                <p className="text-gray-700 text-sm">Summer sessions have smaller class sizes and let you focus on fewer courses. Use summer to tackle challenging requirements or boost GPA.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Balance Course Load Strategically</h4>
                <p className="text-gray-700 text-sm">Don't overload. Taking 12-15 credit hours allows you to excel in each course rather than spreading yourself thin with 18+ hours of GT rigor.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Choose Professors Carefully</h4>
                <p className="text-gray-700 text-sm">Use Rate My Professors and ask upperclassmen. Teaching quality varies significantly. A good professor makes difficult material manageable.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-400 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Track Progress with GPA Calculators</h4>
                <p className="text-gray-700 text-sm">Use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/gpa-raise-calculator' as Page)} className="text-blue-600 font-semibold hover:underline">GPA Raise Calculator</button> to see what grades you need to reach Faculty Honors or co-op requirements.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 to-blue-700 text-white p-6 rounded-xl shadow-lg mb-8">
            <h4 className="text-xl font-bold mb-3">GPA Recovery Timeline at GT</h4>
            <p className="text-sm mb-4 opacity-95">
              Raising your GPA at Georgia Tech takes time and consistent effort. Here's a realistic recovery example starting from 2.5 GPA:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 1 semester of all As (4.0):</strong> GPA rises to 2.82 (assuming 30 to 45 credits)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 2 semesters of all As:</strong> GPA reaches 3.10 (30 to 60 credits)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 3 semesters of all As:</strong> GPA hits 3.29 (30 to 75 credits)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 4 semesters of all As:</strong> GPA reaches 3.43 (30 to 90 credits)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-2xl mr-2">💪</span>
              Remember, Yellow Jackets Don't Quit
            </h4>
            <p className="text-gray-700">
              GPA improvement at Georgia Tech is challenging but achievable. Many successful GT engineers and computer scientists have recovered from low GPAs to graduate with honors. Stay consistent, use every resource available, and don't be discouraged by setbacks. Together We Swarm! 🐝
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions (FAQs)</h2>

          <div className="space-y-4">
            <div className="border-2 border-yellow-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the Georgia Tech grading scale?</h3>
              <p className="text-gray-700">
                Georgia Tech uses a 4.0 grading scale with straight letter grades: A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. There are no plus/minus grades at Georgia Tech, making it a simpler system than many universities.
              </p>
            </div>

            <div className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need for Faculty Honors at Georgia Tech?</h3>
              <p className="text-gray-700">
                Faculty Honors at Georgia Tech is awarded to the top 5% of students in each college. While the exact GPA varies by college and year, it typically requires a GPA of 3.8 or higher. This is Georgia Tech's highest academic distinction.
              </p>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the Dean's List requirement at Georgia Tech?</h3>
              <p className="text-gray-700">
                To make the Dean's List at Georgia Tech, you must achieve a semester GPA of 3.0 or higher while completing at least 12 credit hours of graded coursework. This recognition appears on your transcript and demonstrates consistent academic achievement.
              </p>
            </div>

            <div className="border-2 border-purple-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need for a co-op at Georgia Tech?</h3>
              <p className="text-gray-700">
                Most Georgia Tech co-op programs require a minimum GPA of 2.7 to participate. However, more competitive co-op positions and companies may require 3.0 or higher. Maintaining a strong GPA is essential for securing top engineering co-ops.
              </p>
            </div>

            <div className="border-2 border-red-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do I transfer into Computer Science at Georgia Tech?</h3>
              <p className="text-gray-700">
                Transferring into the CS program at Georgia Tech is highly competitive. While there's no official minimum GPA, successful transfers typically have a 3.7 or higher GPA. You must also complete required coursework with strong grades and demonstrate commitment to the field.
              </p>
            </div>

            <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does Georgia Tech use plus/minus grading?</h3>
              <p className="text-gray-700">
                No, Georgia Tech does not use plus/minus grading. The university uses straight letter grades (A, B, C, D, F) with whole number GPA values. This makes GPA calculation simpler compared to schools that use A-, B+, etc.
              </p>
            </div>

            <div className="border-2 border-pink-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need to graduate with Highest Honors?</h3>
              <p className="text-gray-700">
                To graduate with Highest Honors from Georgia Tech, you need a cumulative GPA of 3.8 or higher. This is the most prestigious graduation honor and appears prominently on your diploma and transcript.
              </p>
            </div>

            <div className="border-2 border-teal-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How is cumulative GPA calculated at Georgia Tech?</h3>
              <p className="text-gray-700">
                Cumulative GPA at Georgia Tech is calculated by dividing total quality points by total credit hours attempted. Quality points are earned by multiplying each course's grade value (A=4.0, B=3.0, etc.) by its credit hours.
              </p>
            </div>

            <div className="border-2 border-indigo-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What happens if my GPA falls below 2.0 at Georgia Tech?</h3>
              <p className="text-gray-700">
                If your cumulative GPA falls below 2.0, you'll be placed on academic probation. You'll have one semester to raise your GPA above 2.0. Failure to do so may result in academic dismissal. Georgia Tech offers academic support resources to help students improve.
              </p>
            </div>

            <div className="border-2 border-cyan-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I retake courses to improve my Georgia Tech GPA?</h3>
              <p className="text-gray-700">
                Yes, Georgia Tech allows grade substitution for retaken courses. If you retake a course, the new grade replaces the old grade in your GPA calculation, though both grades remain on your transcript. This policy helps students recover from poor grades.
              </p>
            </div>

            <div className="border-2 border-lime-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need for graduate school from Georgia Tech?</h3>
              <p className="text-gray-700">
                For competitive graduate programs, aim for a 3.5+ GPA. Top engineering graduate schools typically look for 3.3 or higher from Georgia Tech students. However, research experience and strong letters often matter as much as GPA.
              </p>
            </div>

            <div className="border-2 border-amber-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does Georgia Tech calculate institutional and overall GPA?</h3>
              <p className="text-gray-700">
                Yes, Georgia Tech maintains both institutional GPA (courses taken at GT only) and overall GPA (including transfer credits). For honors and academic standing, institutional GPA is typically used. Both GPAs appear on your official transcript.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Related GPA Calculators</h2>
          <p className="text-gray-600 text-center mb-8">
            Explore our other free GPA calculators for comprehensive academic planning
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator' as Page)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-400 text-left"
            >
              <div className="text-3xl mb-3">🐻</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Berkeley GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate UC Berkeley GPA with official grading scale</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/mit-gpa-calculator' as Page)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-400 text-left"
            >
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">MIT GPA Calculator</h3>
              <p className="text-sm text-gray-600">Massachusetts Institute of Technology 5.0 scale calculator</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/umich-gpa-calculator' as Page)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-400 text-left"
            >
              <div className="text-3xl mb-3">〽️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">UMich GPA Calculator</h3>
              <p className="text-sm text-gray-600">University of Michigan GPA calculator with honors</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/ut-austin-gpa-calculator' as Page)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-400 text-left"
            >
              <div className="text-3xl mb-3">🤘</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">UT Austin GPA Calculator</h3>
              <p className="text-sm text-gray-600">University of Texas Longhorns GPA with Latin Honors</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/college-gpa-calculator' as Page)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-400 text-left"
            >
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">College GPA Calculator</h3>
              <p className="text-sm text-gray-600">Universal college GPA calculator for any university</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator' as Page)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-yellow-400 text-left"
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cumulative GPA Calculator</h3>
              <p className="text-sm text-gray-600">Track your GPA across multiple semesters</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeorgiaTechGPACalculator;
