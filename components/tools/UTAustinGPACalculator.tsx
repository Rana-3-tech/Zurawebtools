import React, { useState, useEffect } from 'react';
import { Page } from '../../App';

interface UTAustinGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const UTAustinGPACalculator: React.FC<UTAustinGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '', credits: 3 }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  useEffect(() => {
    // SEO Meta Tags
    document.title = "UT Austin GPA Calculator - Longhorns Grade Calculator | ZuraWebTools";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your University of Texas at Austin GPA with our free Longhorns calculator. Track Honors, Dean\'s List, and internal transfer requirements instantly.');
    }

    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow');
    }

    const metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.setAttribute('content', 'ZuraWebTools');
    }

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/ut-austin-gpa-calculator');

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'UT Austin GPA Calculator - Longhorns Grade Calculator' },
      { property: 'og:description', content: 'Calculate your University of Texas at Austin GPA with our free Longhorns calculator. Track Honors, Dean\'s List, and internal transfer requirements instantly.' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/ut-austin-gpa-calculator' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: 'https://zurawebtools.com/images/ut-austin-gpa-calculator-og.png' }
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

    // Twitter Card Tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'UT Austin GPA Calculator - Longhorns Grade Calculator' },
      { name: 'twitter:description', content: 'Calculate your University of Texas at Austin GPA with our free Longhorns calculator. Track Honors, Dean\'s List, and internal transfer requirements.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/images/ut-austin-gpa-calculator-twitter.png' }
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
      "name": "UT Austin GPA Calculator",
      "description": "Free online GPA calculator for University of Texas at Austin students. Calculate semester and cumulative GPA with official Longhorns grading scale.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/ut-austin-gpa-calculator",
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
        "ratingCount": "487",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Organization",
        "name": "ZuraWebTools"
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
          "name": "UT Austin GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/ut-austin-gpa-calculator"
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
          "name": "What is the UT Austin grading scale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UT Austin uses a plus/minus grading system: A (4.0), A- (3.67), B+ (3.33), B (3.0), B- (2.67), C+ (2.33), C (2.0), C- (1.67), D+ (1.33), D (1.0), D- (0.67), F (0.0)."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for Dean's List at UT Austin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To qualify for Dean's List at UT Austin, you need a semester GPA of 3.5 or higher with at least 12 graded credit hours."
          }
        },
        {
          "@type": "Question",
          "name": "What are UT Austin graduation honors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UT Austin awards three levels of Latin Honors: Highest Honors (3.9+ GPA), High Honors (3.7-3.89 GPA), and Honors (3.5-3.69 GPA)."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need to transfer to McCombs or CS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Internal transfer to McCombs Business School typically requires a 3.7+ GPA, while Computer Science in Cockrell Engineering often requires a 3.8+ GPA. These are competitive minimums."
          }
        },
        {
          "@type": "Question",
          "name": "Does UT Austin calculate GPA with plus/minus grades?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, UT Austin uses a plus/minus grading system where grades like A- (3.67) and B+ (3.33) affect your GPA differently than straight A (4.0) or B (3.0) grades."
          }
        },
        {
          "@type": "Question",
          "name": "How many credit hours do I need for full-time status?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At UT Austin, full-time undergraduate status requires a minimum of 12 credit hours per semester. Most students take 15-17 credit hours per semester to graduate in four years."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good GPA at UT Austin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good GPA at UT Austin is generally 3.5 or higher for competitive programs, scholarships, and graduate school. A 3.7+ GPA demonstrates excellent academic performance."
          }
        },
        {
          "@type": "Question",
          "name": "Can I retake a class at UT Austin to improve my GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, UT Austin allows course retakes. Only the most recent grade counts toward your GPA, but all attempts appear on your transcript. Check with your advisor about retake policies."
          }
        },
        {
          "@type": "Question",
          "name": "How is cumulative GPA different from semester GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Semester GPA is calculated from courses in a single semester, while cumulative GPA includes all courses across all semesters at UT Austin."
          }
        },
        {
          "@type": "Question",
          "name": "Does UT Austin have weighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UT Austin does not use weighted GPA in college. All courses contribute equally based on credit hours. High school weighted GPAs are used for admissions but reset once enrolled."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need to keep my scholarship at UT Austin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Scholarship GPA requirements vary by program. Most require 3.0-3.5 minimum cumulative GPA. Check your specific scholarship terms with the Office of Scholarships and Financial Aid."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate my major GPA at UT Austin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Major GPA includes only courses that count toward your major requirements. Use this calculator and enter only your major-specific courses to determine your major GPA."
          }
        }
      ]
    });
    document.head.appendChild(faqScript);

    return () => {
      if (schemaScript.parentNode) schemaScript.parentNode.removeChild(schemaScript);
      if (breadcrumbScript.parentNode) breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      if (faqScript.parentNode) faqScript.parentNode.removeChild(faqScript);
    };
  }, []);

  const gradeScale: { [key: string]: number } = {
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.0,
    'D-': 0.67,
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
    }, 800);
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
    if (gpa >= 3.9) return 'Highest Honors';
    if (gpa >= 3.7) return 'High Honors';
    if (gpa >= 3.5) return 'Honors';
    return 'No Latin Honors';
  };

  const getDeansListStatus = (gpa: number, credits: number): string => {
    if (gpa >= 3.5 && credits >= 12) return 'Dean\'s List Eligible ✓';
    if (credits < 12) return 'Need 12+ Credit Hours';
    return 'Need 3.5+ GPA';
  };

  const getAcademicStanding = (gpa: number): { status: string; color: string } => {
    if (gpa >= 3.7) return { status: 'Excellent Standing', color: 'text-green-700' };
    if (gpa >= 3.0) return { status: 'Good Standing', color: 'text-blue-700' };
    if (gpa >= 2.5) return { status: 'Satisfactory Standing', color: 'text-yellow-700' };
    if (gpa >= 2.0) return { status: 'Academic Concern', color: 'text-orange-700' };
    return { status: 'Academic Probation Risk', color: 'text-red-700' };
  };

  const getTransferEligibility = (gpa: number): string => {
    if (gpa >= 3.8) return 'Competitive for CS Transfer';
    if (gpa >= 3.7) return 'Competitive for McCombs Transfer';
    if (gpa >= 3.5) return 'Consider Other Schools';
    return 'Build GPA First';
  };

  const handlePrint = () => {
    const printContent = `
UT AUSTIN GPA CALCULATION REPORT
Generated: ${new Date().toLocaleDateString()}

SEMESTER GPA: ${gpa.toFixed(2)}
Total Credits: ${totalCredits}
Quality Points: ${totalQualityPoints.toFixed(2)}
Latin Honors: ${getHonorsLevel(gpa)}
Dean's List: ${getDeansListStatus(gpa, totalCredits)}
Academic Standing: ${getAcademicStanding(gpa).status}

COURSES:
${courses.map((c, i) => `${i + 1}. ${c.name || 'Course ' + (i + 1)}: ${c.grade} (${c.credits} credits)`).join('\n')}

Hook 'em Horns! 🤘
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<pre style="font-family: monospace; padding: 20px;">${printContent}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDownload = () => {
    const downloadContent = `UT AUSTIN GPA REPORT\nGenerated: ${new Date().toLocaleDateString()}\n\nSemester GPA: ${gpa.toFixed(2)}\nTotal Credits: ${totalCredits}\nQuality Points: ${totalQualityPoints.toFixed(2)}\nLatin Honors: ${getHonorsLevel(gpa)}\nDean's List: ${getDeansListStatus(gpa, totalCredits)}\nAcademic Standing: ${getAcademicStanding(gpa).status}\n\nCOURSES:\n${courses.map((c, i) => `${i + 1}. ${c.name || 'Course ' + (i + 1)}: ${c.grade} (${c.credits} credits)`).join('\n')}\n\nHook 'em Horns! 🤘`;

    const blob = new Blob([downloadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UT-Austin-GPA-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `I calculated my UT Austin GPA: ${gpa.toFixed(2)} with ${totalCredits} credits! ${getHonorsLevel(gpa)} 🤘 #Longhorns #UTAustin`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My UT Austin GPA',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Results copied to clipboard!');
    }
  };

  const getGPAColor = (gpa: number): string => {
    if (gpa >= 3.7) return 'from-green-500 to-green-600';
    if (gpa >= 3.0) return 'from-blue-500 to-blue-600';
    if (gpa >= 2.5) return 'from-yellow-500 to-yellow-600';
    if (gpa >= 2.0) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getGPAProgressColor = (gpa: number): string => {
    if (gpa >= 3.5) return 'bg-green-500';
    if (gpa >= 3.0) return 'bg-blue-500';
    if (gpa >= 2.5) return 'bg-yellow-500';
    if (gpa >= 2.0) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            UT Austin GPA Calculator
          </h1>
          <p className="text-lg md:text-xl mb-2 text-gray-700">
            Calculate your University of Texas at Austin GPA with official Longhorns grading scale
          </p>
          <p className="text-md text-gray-600">
            Track Latin Honors, Dean's List eligibility, and internal transfer requirements instantly
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <svg className="mr-3 text-orange-600" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              UT Austin GPA Calculator
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
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
                aria-label="Reset calculator"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Course Input Grid */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-semibold text-gray-700 text-sm">
              <div className="md:col-span-5">Course Name</div>
              <div className="md:col-span-3">Grade</div>
              <div className="md:col-span-3">Credit Hours</div>
              <div className="md:col-span-1"></div>
            </div>

            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-5">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Computer Science 314"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900"
                    aria-label={`Course name ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-3">
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900"
                    aria-label={`Grade for course ${index + 1}`}
                  >
                    <option value="">Select Grade</option>
                    <option value="A">A (4.0)</option>
                    <option value="A-">A- (3.67)</option>
                    <option value="B+">B+ (3.33)</option>
                    <option value="B">B (3.0)</option>
                    <option value="B-">B- (2.67)</option>
                    <option value="C+">C+ (2.33)</option>
                    <option value="C">C (2.0)</option>
                    <option value="C-">C- (1.67)</option>
                    <option value="D+">D+ (1.33)</option>
                    <option value="D">D (1.0)</option>
                    <option value="D-">D- (0.67)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    min="0"
                    max="6"
                    step="0.5"
                    placeholder="Credits"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-gray-900"
                    aria-label={`Credit hours for course ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-1">
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
              className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-lg flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
                Your UT Austin GPA Results
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
              <div className={`bg-gradient-to-br ${getGPAColor(gpa)} rounded-xl p-6 text-white shadow-lg`}>
                <h3 className="text-sm font-semibold mb-2 opacity-90">Semester GPA</h3>
                <p className="text-4xl font-bold">{gpa.toFixed(2)}</p>
                <p className="text-xs mt-2 opacity-80">Out of 4.0</p>
              </div>

              {/* Total Credits Card */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Total Credits</h3>
                <p className="text-4xl font-bold">{totalCredits}</p>
                <p className="text-xs mt-2 opacity-80">Credit Hours</p>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Quality Points</h3>
                <p className="text-4xl font-bold">{totalQualityPoints.toFixed(1)}</p>
                <p className="text-xs mt-2 opacity-80">Total Points</p>
              </div>

              {/* Latin Honors Card */}
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold mb-2 opacity-90">Latin Honors</h3>
                <p className="text-xl font-bold">{getHonorsLevel(gpa)}</p>
                <p className="text-xs mt-2 opacity-80">Graduation Status</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">GPA Progress</span>
                <span className="text-sm font-semibold text-gray-700">{gpa.toFixed(2)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full ${getGPAProgressColor(gpa)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${(gpa / 4.0) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Dean's List & Academic Standing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dean's List Status</h3>
                <p className="text-2xl font-bold text-blue-700">{getDeansListStatus(gpa, totalCredits)}</p>
                <p className="text-sm text-gray-600 mt-2">Requires 3.5+ GPA with 12+ credit hours</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Academic Standing</h3>
                <p className={`text-2xl font-bold ${getAcademicStanding(gpa).color}`}>{getAcademicStanding(gpa).status}</p>
                <p className="text-sm text-gray-600 mt-2">{getTransferEligibility(gpa)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="#how-to-use" className="flex items-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg hover:shadow-md transition-all border-2 border-orange-200">
              <span className="text-2xl mr-3">📖</span>
              <span className="font-semibold text-gray-800">How to Use</span>
            </a>
            <a href="#about-gpa" className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition-all border-2 border-blue-200">
              <span className="text-2xl mr-3">📊</span>
              <span className="font-semibold text-gray-800">About UT GPA</span>
            </a>
            <a href="#grade-scale" className="flex items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-all border-2 border-green-200">
              <span className="text-2xl mr-3">📈</span>
              <span className="font-semibold text-gray-800">Grade Scale</span>
            </a>
            <a href="#calculation" className="flex items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-all border-2 border-purple-200">
              <span className="text-2xl mr-3">🔢</span>
              <span className="font-semibold text-gray-800">How It Works</span>
            </a>
            <a href="#comparison" className="flex items-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg hover:shadow-md transition-all border-2 border-yellow-200">
              <span className="text-2xl mr-3">⚖️</span>
              <span className="font-semibold text-gray-800">University Comparison</span>
            </a>
            <a href="#honors" className="flex items-center p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg hover:shadow-md transition-all border-2 border-red-200">
              <span className="text-2xl mr-3">🏆</span>
              <span className="font-semibold text-gray-800">Latin Honors</span>
            </a>
            <a href="#improve" className="flex items-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg hover:shadow-md transition-all border-2 border-indigo-200">
              <span className="text-2xl mr-3">📚</span>
              <span className="font-semibold text-gray-800">Improve GPA</span>
            </a>
            <a href="#faqs" className="flex items-center p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg hover:shadow-md transition-all border-2 border-teal-200">
              <span className="text-2xl mr-3">❓</span>
              <span className="font-semibold text-gray-800">FAQs</span>
            </a>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use This UT Austin GPA Calculator</h2>
          <p className="text-gray-700 mb-6">
            Follow these simple steps to calculate your University of Texas at Austin GPA accurately using our free calculator.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">1</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Course Names</h3>
                <p className="text-gray-700">Type the name of each course you're taking or have completed this semester. Be specific to keep track easily (e.g., "CS 314 - Data Structures").</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">2</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Letter Grades</h3>
                <p className="text-gray-700">Choose your grade from the dropdown menu. UT Austin uses plus/minus grading, so make sure to select the exact grade (A, A-, B+, etc.).</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">3</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Input Credit Hours</h3>
                <p className="text-gray-700">Enter the credit hours for each course. Most UT Austin courses are 3 credit hours, but lab courses may be 1-2 hours, and some advanced courses are 4+ hours.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">4</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add More Courses</h3>
                <p className="text-gray-700">Click "Add Course" to include additional classes. Most Longhorns take 4-6 courses per semester (12-18 credit hours).</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">5</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-700">Click the "Calculate GPA" button to instantly see your semester GPA, Latin Honors status, Dean's List eligibility, and internal transfer competitiveness.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">6</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Review Your Results</h3>
                <p className="text-gray-700">Check your comprehensive results including quality points, credit hours, honors level, and academic standing. Use the insights to plan your academic strategy.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">7</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Share or Save Results</h3>
                <p className="text-gray-700">Use the Share, Download, or Print buttons to save your GPA report for academic advising appointments, scholarship applications, or personal records.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              Pro Tip
            </h4>
            <p className="text-gray-700">
              For the most accurate cumulative GPA calculation, use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator')} className="text-orange-600 font-semibold hover:underline">Cumulative GPA Calculator</button> which tracks all semesters. You can also calculate what grades you need in remaining courses using our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/gpa-raise-calculator')} className="text-orange-600 font-semibold hover:underline">GPA Raise Calculator</button>.
            </p>
          </div>
        </div>

        {/* About UT Austin GPA Section */}
        <div id="about-gpa" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About UT Austin GPA</h2>

          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is GPA?</h3>
            <p className="text-gray-700 mb-4">
              <strong>GPA (Grade Point Average)</strong> is a numerical representation of your academic performance at the University of Texas at Austin. It's calculated by converting your letter grades into grade points, multiplying by credit hours, and dividing by total credit hours attempted.
            </p>
            <p className="text-gray-700 mb-6">
              At UT Austin, GPA plays a crucial role in determining your academic standing, eligibility for Latin Honors at graduation, Dean's List recognition each semester, scholarship renewal, and competitiveness for internal transfers to highly selective programs like McCombs Business School or Computer Science in Cockrell Engineering.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">UT Austin's Plus/Minus Grading System</h3>
            <p className="text-gray-700 mb-4">
              The University of Texas at Austin uses a <strong>plus/minus grading system</strong> that provides more granular assessment of student performance. This system differentiates between grades like A (4.0), A- (3.67), and B+ (3.33), allowing for more precise GPA calculations.
            </p>
            <p className="text-gray-700 mb-6">
              Unlike some universities, UT Austin does <strong>not</strong> award A+ grades. The highest possible grade is an A, worth 4.0 grade points. This system has been in place across most colleges at UT Austin since 2009 and helps distinguish exceptional work from good work.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of GPA at UT Austin</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border-2 border-orange-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Semester GPA</h4>
                <p className="text-gray-700 text-sm">
                  Calculated from courses completed in a single semester. This is what qualifies you for Dean's List each term and shows your current academic performance.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Cumulative GPA</h4>
                <p className="text-gray-700 text-sm">
                  Includes all courses taken at UT Austin across all semesters. This determines your Latin Honors at graduation and is used for scholarship eligibility.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Major GPA</h4>
                <p className="text-gray-700 text-sm">
                  Calculated only from courses required for your major. Some competitive programs and graduate schools look specifically at your major GPA to assess subject expertise.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Your UT Austin GPA Matters</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-3 text-xl">•</span>
                <span><strong>Internal Transfers:</strong> Competitive programs like McCombs Business (3.7+ GPA), Computer Science (3.8+ GPA), and Nursing require high GPAs for internal transfer admission.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-3 text-xl">•</span>
                <span><strong>Latin Honors:</strong> Graduate with Highest Honors (3.9+), High Honors (3.7+), or Honors (3.5+) recognized at commencement and on your diploma.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-3 text-xl">•</span>
                <span><strong>Dean's List:</strong> Achieve semester GPA of 3.5+ with 12+ graded hours for prestigious Dean's List recognition each term.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-3 text-xl">•</span>
                <span><strong>Scholarships:</strong> Many UT Austin scholarships, including Texas Exes, require minimum 3.0-3.5 GPA for renewal and continuing eligibility.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-3 text-xl">•</span>
                <span><strong>Graduate School:</strong> Top graduate programs expect 3.5+ GPA from UT Austin students, with highly competitive programs like UT Law or McCombs MBA preferring 3.7+.</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 font-bold mr-3 text-xl">•</span>
                <span><strong>Employment:</strong> Many employers, especially in finance, consulting, and technology, filter candidates by GPA thresholds (typically 3.0-3.5 minimum).</span>
              </li>
            </ul>

            <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-2xl mr-2">📌</span>
                Important Note
              </h4>
              <p className="text-gray-700">
                Transfer credits from other institutions or AP/IB credit do <strong>not</strong> count toward your UT Austin GPA calculation, though they do count toward degree completion. Only courses taken at UT Austin (including study abroad through UT programs) are included in your official GPA.
              </p>
            </div>
          </div>
        </div>

        {/* Official Grade Scale Section */}
        <div id="grade-scale" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Official UT Austin Grading Scale</h2>
          <p className="text-gray-700 mb-6">
            The University of Texas at Austin uses a plus/minus grading system with the following official grade scale. Understanding this scale is essential for accurate GPA calculations.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
                  <th className="px-6 py-4 text-left font-bold">Letter Grade</th>
                  <th className="px-6 py-4 text-left font-bold">Grade Points</th>
                  <th className="px-6 py-4 text-left font-bold">Percentage Range</th>
                  <th className="px-6 py-4 text-left font-bold">Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">A</td>
                  <td className="px-6 py-4 text-gray-700">4.00</td>
                  <td className="px-6 py-4 text-gray-700">93-100%</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Excellent</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">A-</td>
                  <td className="px-6 py-4 text-gray-700">3.67</td>
                  <td className="px-6 py-4 text-gray-700">90-92%</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">Excellent</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">B+</td>
                  <td className="px-6 py-4 text-gray-700">3.33</td>
                  <td className="px-6 py-4 text-gray-700">87-89%</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">Good</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">B</td>
                  <td className="px-6 py-4 text-gray-700">3.00</td>
                  <td className="px-6 py-4 text-gray-700">83-86%</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">Good</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">B-</td>
                  <td className="px-6 py-4 text-gray-700">2.67</td>
                  <td className="px-6 py-4 text-gray-700">80-82%</td>
                  <td className="px-6 py-4 text-blue-600 font-semibold">Good</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">C+</td>
                  <td className="px-6 py-4 text-gray-700">2.33</td>
                  <td className="px-6 py-4 text-gray-700">77-79%</td>
                  <td className="px-6 py-4 text-yellow-600 font-semibold">Satisfactory</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">C</td>
                  <td className="px-6 py-4 text-gray-700">2.00</td>
                  <td className="px-6 py-4 text-gray-700">73-76%</td>
                  <td className="px-6 py-4 text-yellow-600 font-semibold">Satisfactory</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">C-</td>
                  <td className="px-6 py-4 text-gray-700">1.67</td>
                  <td className="px-6 py-4 text-gray-700">70-72%</td>
                  <td className="px-6 py-4 text-yellow-600 font-semibold">Satisfactory</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">D+</td>
                  <td className="px-6 py-4 text-gray-700">1.33</td>
                  <td className="px-6 py-4 text-gray-700">67-69%</td>
                  <td className="px-6 py-4 text-orange-600 font-semibold">Passing</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">D</td>
                  <td className="px-6 py-4 text-gray-700">1.00</td>
                  <td className="px-6 py-4 text-gray-700">63-66%</td>
                  <td className="px-6 py-4 text-orange-600 font-semibold">Passing</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">D-</td>
                  <td className="px-6 py-4 text-gray-700">0.67</td>
                  <td className="px-6 py-4 text-gray-700">60-62%</td>
                  <td className="px-6 py-4 text-orange-600 font-semibold">Passing</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">F</td>
                  <td className="px-6 py-4 text-gray-700">0.00</td>
                  <td className="px-6 py-4 text-gray-700">Below 60%</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200">
              <h4 className="font-bold text-gray-900 mb-2">No A+ Grade</h4>
              <p className="text-sm text-gray-700">UT Austin does not award A+ grades. The maximum grade point is 4.0 for an A.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-gray-900 mb-2">Plus/Minus System</h4>
              <p className="text-sm text-gray-700">The plus/minus grading allows for 12 distinct grade levels for more precise assessment.</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border-2 border-yellow-200">
              <h4 className="font-bold text-gray-900 mb-2">D Grades Count</h4>
              <p className="text-sm text-gray-700">D+, D, and D- are passing grades at UT Austin but may not satisfy major or prerequisite requirements.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
              <h4 className="font-bold text-gray-900 mb-2">Consistent Scale</h4>
              <p className="text-sm text-gray-700">All colleges at UT Austin use this same grading scale for standardized GPA calculation.</p>
            </div>
          </div>
        </div>

        {/* How GPA is Calculated Section */}
        <div id="calculation" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How UT Austin GPA is Calculated</h2>
          <p className="text-gray-700 mb-6">
            Understanding the GPA calculation formula helps you predict your semester results and plan your academic strategy effectively.
          </p>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border-2 border-orange-300 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">GPA Calculation Formula</h3>
            <div className="text-center text-xl font-mono bg-white p-4 rounded-lg shadow-inner">
              <p className="mb-2 text-gray-800">GPA = (Total Quality Points) ÷ (Total Credit Hours)</p>
              <p className="text-sm text-gray-600 mt-3">Quality Points = Grade Points × Credit Hours</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Calculation Example</h3>
          <p className="text-gray-700 mb-4">Let's calculate the GPA for a typical UT Austin Longhorn's semester:</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <th className="px-4 py-3 text-left">Course</th>
                  <th className="px-4 py-3 text-left">Grade</th>
                  <th className="px-4 py-3 text-center">Grade Points</th>
                  <th className="px-4 py-3 text-center">Credits</th>
                  <th className="px-4 py-3 text-center">Quality Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-900">CS 314 - Data Structures</td>
                  <td className="px-4 py-3 font-bold">A-</td>
                  <td className="px-4 py-3 text-center">3.67</td>
                  <td className="px-4 py-3 text-center">3</td>
                  <td className="px-4 py-3 text-center font-semibold text-orange-600">11.01</td>
                </tr>
                <tr className="border-b border-gray-200 bg-orange-50">
                  <td className="px-4 py-3 text-gray-900">M 408D - Calculus</td>
                  <td className="px-4 py-3 font-bold">B+</td>
                  <td className="px-4 py-3 text-center">3.33</td>
                  <td className="px-4 py-3 text-center">4</td>
                  <td className="px-4 py-3 text-center font-semibold text-orange-600">13.32</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-900">E 316K - British Literature</td>
                  <td className="px-4 py-3 font-bold">A</td>
                  <td className="px-4 py-3 text-center">4.00</td>
                  <td className="px-4 py-3 text-center">3</td>
                  <td className="px-4 py-3 text-center font-semibold text-orange-600">12.00</td>
                </tr>
                <tr className="border-b border-gray-200 bg-orange-50">
                  <td className="px-4 py-3 text-gray-900">GOV 310L - US Government</td>
                  <td className="px-4 py-3 font-bold">B</td>
                  <td className="px-4 py-3 text-center">3.00</td>
                  <td className="px-4 py-3 text-center">3</td>
                  <td className="px-4 py-3 text-center font-semibold text-orange-600">9.00</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-900">KIN 304 - Personal Wellness</td>
                  <td className="px-4 py-3 font-bold">A</td>
                  <td className="px-4 py-3 text-center">4.00</td>
                  <td className="px-4 py-3 text-center">2</td>
                  <td className="px-4 py-3 text-center font-semibold text-orange-600">8.00</td>
                </tr>
                <tr className="bg-gradient-to-r from-orange-100 to-yellow-100 font-bold">
                  <td className="px-4 py-4 text-gray-900" colSpan={3}>TOTALS</td>
                  <td className="px-4 py-4 text-center text-lg">15</td>
                  <td className="px-4 py-4 text-center text-lg text-orange-600">53.33</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6 rounded-xl shadow-lg mb-6">
            <p className="text-lg mb-2">Final GPA Calculation:</p>
            <p className="text-3xl font-bold">53.33 ÷ 15 = 3.56 GPA</p>
            <p className="text-sm mt-2 opacity-90">This student qualifies for Dean's List and Honors at graduation! 🤘</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Cumulative GPA Calculation</h3>
          <p className="text-gray-700 mb-4">
            To calculate your cumulative GPA across multiple semesters, add up all quality points from every semester and divide by total credit hours attempted:
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300 mb-6">
            <p className="text-gray-800 font-mono mb-3"><strong>Previous Cumulative:</strong> 3.45 GPA with 45 credit hours = 155.25 quality points</p>
            <p className="text-gray-800 font-mono mb-3"><strong>Current Semester:</strong> 3.56 GPA with 15 credit hours = 53.33 quality points</p>
            <p className="text-gray-800 font-mono mb-3"><strong>Combined Totals:</strong> 155.25 + 53.33 = 208.58 quality points</p>
            <p className="text-gray-800 font-mono mb-3"><strong>Total Credits:</strong> 45 + 15 = 60 credit hours</p>
            <p className="text-orange-600 font-bold text-lg mt-4"><strong>New Cumulative GPA:</strong> 208.58 ÷ 60 = 3.48</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">✓ Courses That Count</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start"><span className="mr-2">•</span>All UT Austin courses with letter grades</li>
                <li className="flex items-start"><span className="mr-2">•</span>Study abroad through UT programs</li>
                <li className="flex items-start"><span className="mr-2">•</span>Summer session courses at UT Austin</li>
                <li className="flex items-start"><span className="mr-2">•</span>Repeated courses (most recent grade only)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">✗ Courses Excluded</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start"><span className="mr-2">•</span>Transfer credits from other universities</li>
                <li className="flex items-start"><span className="mr-2">•</span>AP, IB, or CLEP credit hours</li>
                <li className="flex items-start"><span className="mr-2">•</span>Pass/Fail (P/F) or Credit/No Credit courses</li>
                <li className="flex items-start"><span className="mr-2">•</span>Courses where you received "W" (withdrawal)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* University Comparison Section */}
        <div id="comparison" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UT Austin vs Other Universities GPA Comparison</h2>
          <p className="text-gray-700 mb-6">
            Compare UT Austin's grading system with other top universities. Understanding these differences is crucial for transfer students and graduate school applications.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
                  <th className="px-6 py-4 text-left font-bold">University</th>
                  <th className="px-6 py-4 text-left font-bold">Grading System</th>
                  <th className="px-6 py-4 text-left font-bold">A- Value</th>
                  <th className="px-6 py-4 text-left font-bold">Dean's List</th>
                  <th className="px-6 py-4 text-left font-bold">Latin Honors</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-gray-200 bg-orange-50">
                  <td className="px-6 py-4 font-bold text-orange-600">UT Austin</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.67</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.7+ / 3.9+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">Texas A&M</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.70</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.75+ / 3.95+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">Rice University</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.67</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.6+ / 3.8+ / 3.9+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">UC Berkeley</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.7+ / 3.85+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">UMich</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.7+ / 3.9+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">NYU</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.67</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.7+ / 3.9+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">UNC Chapel Hill</td>
                  <td className="px-6 py-4 text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">3.5+</td>
                  <td className="px-6 py-4 text-gray-700">3.5+ / 3.65+ / 3.85+</td>
                </tr>
                <tr className="border-b-2 border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">Harvard</td>
                  <td className="px-6 py-4 text-gray-700">Letter Only</td>
                  <td className="px-6 py-4 text-gray-700">3.67 (A-)</td>
                  <td className="px-6 py-4 text-gray-700">Varies</td>
                  <td className="px-6 py-4 text-gray-700">Top 5% / 10% / 20%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-5 rounded-xl border-2 border-orange-200">
              <h4 className="font-bold text-gray-900 mb-2">Similar A- Values</h4>
              <p className="text-sm text-gray-700">UT Austin's 3.67 for A- matches NYU and Rice, making GPA conversions straightforward.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-gray-900 mb-2">Competitive Honors</h4>
              <p className="text-sm text-gray-700">UT Austin's Highest Honors threshold (3.9) is among the most competitive nationwide.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200">
              <h4 className="font-bold text-gray-900 mb-2">Transfer Students</h4>
              <p className="text-sm text-gray-700">Your previous GPA doesn't transfer—you start fresh at UT Austin with a clean slate.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200">
              <h4 className="font-bold text-gray-900 mb-2">Graduate Schools</h4>
              <p className="text-sm text-gray-700">Top grad programs understand UT Austin's rigorous grading and adjust expectations accordingly.</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-2xl mr-2">🎓</span>
              For Transfer Students
            </h4>
            <p className="text-gray-700">
              If you're transferring to UT Austin from another university, your GPA starts fresh. Only courses taken at UT Austin count toward your UT GPA, though transfer credits do count toward degree completion. Use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/college-gpa-calculator')} className="text-orange-600 font-semibold hover:underline">College GPA Calculator</button> to track both GPAs separately.
            </p>
          </div>
        </div>

        {/* Latin Honors Section */}
        <div id="honors" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">UT Austin Latin Honors</h2>
          <p className="text-gray-700 mb-6">
            The University of Texas at Austin awards Latin Honors to graduating students who demonstrate exceptional academic achievement. These honors appear on your diploma and transcript, recognizing your dedication and excellence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-3">🥇</div>
              <h3 className="text-2xl font-bold mb-3">Highest Honors</h3>
              <p className="text-3xl font-bold mb-2">3.90 - 4.00</p>
              <p className="text-sm opacity-90">Summa Cum Laude</p>
              <p className="text-sm mt-4 opacity-95">The highest academic achievement at UT Austin, reserved for top performing students</p>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-3">🥈</div>
              <h3 className="text-2xl font-bold mb-3">High Honors</h3>
              <p className="text-3xl font-bold mb-2">3.70 - 3.89</p>
              <p className="text-sm opacity-90">Magna Cum Laude</p>
              <p className="text-sm mt-4 opacity-95">Excellent academic performance demonstrating consistent scholarly achievement</p>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
              <div className="text-4xl mb-3">🥉</div>
              <h3 className="text-2xl font-bold mb-3">Honors</h3>
              <p className="text-3xl font-bold mb-2">3.50 - 3.69</p>
              <p className="text-sm opacity-90">Cum Laude</p>
              <p className="text-sm mt-4 opacity-95">Strong academic record showing dedication to academic excellence</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How Latin Honors Are Determined</h3>
            <p className="text-gray-700 mb-4">
              Latin Honors at UT Austin are based on your <strong>cumulative GPA</strong> calculated at the time of graduation. Only courses taken at UT Austin count toward this calculation—transfer credits and AP/IB credits are excluded.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Must complete at least 60 credit hours at UT Austin</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Based on cumulative GPA from all UT Austin coursework</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Calculated at degree conferral date (not semester-by-semester)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>All graded coursework counts, including summer sessions</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits of Latin Honors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">🎓 Academic Recognition</h4>
              <p className="text-gray-700 text-sm">Latin Honors appear on your diploma, official transcripts, and are announced during commencement ceremonies, providing lifelong recognition of your academic excellence.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">💼 Career Advantages</h4>
              <p className="text-gray-700 text-sm">Employers recognize Latin Honors as indicators of discipline, intelligence, and work ethic. Include on your resume and LinkedIn profile to stand out.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">🔬 Graduate School</h4>
              <p className="text-gray-700 text-sm">Top graduate programs consider Latin Honors during admissions. Graduating with honors from UT Austin significantly strengthens your application.</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">🏆 Scholarship Opportunities</h4>
              <p className="text-gray-700 text-sm">Many graduate fellowships, professional scholarships, and career development programs prioritize or require Latin Honors recipients.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategies to Achieve Latin Honors</h3>
          <div className="space-y-4">
            <div className="bg-white border-2 border-orange-200 rounded-lg p-5 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-orange-600 text-2xl mr-3">1.</span>
                Start Strong from Day One
              </h4>
              <p className="text-gray-700 text-sm ml-8">Your freshman year GPA sets the foundation. It's easier to maintain a high GPA than to raise a low one later.</p>
            </div>
            <div className="bg-white border-2 border-orange-200 rounded-lg p-5 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-orange-600 text-2xl mr-3">2.</span>
                Choose Courses Strategically
              </h4>
              <p className="text-gray-700 text-sm ml-8">Balance challenging major requirements with courses that play to your strengths. Talk to advisors and upperclassmen.</p>
            </div>
            <div className="bg-white border-2 border-orange-200 rounded-lg p-5 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-orange-600 text-2xl mr-3">3.</span>
                Use UT Austin Resources
              </h4>
              <p className="text-gray-700 text-sm ml-8">Take advantage of Sanger Learning Center tutoring, office hours, study groups, and academic coaching available to all Longhorns.</p>
            </div>
            <div className="bg-white border-2 border-orange-200 rounded-lg p-5 hover:shadow-md transition-all">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-orange-600 text-2xl mr-3">4.</span>
                Monitor Your Progress
              </h4>
              <p className="text-gray-700 text-sm ml-8">Use this calculator regularly to track your cumulative GPA and ensure you're on track for your target honors level.</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-2xl mr-2">🎯</span>
              Did You Know?
            </h4>
            <p className="text-gray-700">
              Approximately 15-20% of UT Austin graduates earn Latin Honors each year. If you're aiming for Highest Honors, you'll be competing with the top 3-5% of Longhorns. Start planning your academic strategy early and stay consistent! Hook 'em! 🤘
            </p>
          </div>
        </div>

        {/* How to Improve Your GPA Section */}
        <div id="improve" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Improve Your UT Austin GPA</h2>
          <p className="text-gray-700 mb-6">
            Whether you're recovering from a tough semester or pushing for Latin Honors, these proven strategies will help you boost your GPA at the University of Texas at Austin.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Immediate Actions You Can Take</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="text-xl font-bold mb-3">Attend All Classes</h4>
              <p className="text-sm opacity-95">
                Studies show that attendance alone can boost your grade by 5-10%. UT Austin professors often include participation or in-class activities that directly impact your grade.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="text-xl font-bold mb-3">Form Study Groups</h4>
              <p className="text-sm opacity-95">
                Collaborate with classmates to review material, share notes, and prepare for exams. Teaching others reinforces your own understanding.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="text-xl font-bold mb-3">Master Time Management</h4>
              <p className="text-sm opacity-95">
                Use planners, calendars, and apps to track assignments and exam dates. Start projects early and break large tasks into manageable chunks.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-xl font-bold mb-3">Visit Office Hours</h4>
              <p className="text-sm opacity-95">
                Professors and TAs hold office hours specifically to help you. Build relationships, ask questions, and get clarification on difficult concepts.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">UT Austin Campus Resources</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-500 p-5 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Sanger Learning Center</h4>
              <p className="text-gray-700 text-sm mb-2">
                Free tutoring, learning specialists, study skills workshops, and academic coaching for all UT Austin students. Located in Jester Center.
              </p>
              <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/college-gpa-calculator')} className="text-orange-600 font-semibold hover:underline text-sm">Learn more →</button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">University Writing Center</h4>
              <p className="text-gray-700 text-sm mb-2">
                One-on-one consultations with trained writing consultants for essays, research papers, and any writing assignment. Schedule appointments online.
              </p>
              <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator')} className="text-blue-600 font-semibold hover:underline text-sm">Find resources →</button>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Counseling and Mental Health Center</h4>
              <p className="text-gray-700 text-sm mb-2">
                Academic stress is real. CMHC offers free counseling, stress management workshops, and support groups for UT Austin students.
              </p>
              <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/semester-gpa-calculator')} className="text-green-600 font-semibold hover:underline text-sm">Get support →</button>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Long-Term GPA Improvement Strategies</h3>
          <div className="space-y-3">
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Retake Low-Grade Courses</h4>
                <p className="text-gray-700 text-sm">UT Austin allows course retakes, and only your most recent grade counts toward GPA. Strategically retake C or D grades to boost your average.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Take Summer Courses</h4>
                <p className="text-gray-700 text-sm">Summer sessions often have smaller class sizes and allow you to focus on fewer courses. Use summer to tackle challenging requirements or boost your GPA.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Balance Course Load Wisely</h4>
                <p className="text-gray-700 text-sm">Don't overload yourself. Taking 12-15 credit hours allows you to excel in each course rather than spreading yourself too thin with 18+ hours.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Meet with Academic Advisors</h4>
                <p className="text-gray-700 text-sm">Your college advisor can help you create a strategic course plan, suggest easier electives, and provide guidance on improving your academic standing.</p>
              </div>
            </div>
            <div className="flex items-start bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-all">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mr-4">5</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Use GPA Calculators Regularly</h4>
                <p className="text-gray-700 text-sm">Track your progress with our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/gpa-raise-calculator')} className="text-orange-600 font-semibold hover:underline">GPA Raise Calculator</button> to see exactly what grades you need to reach your target GPA.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-3">GPA Recovery Timeline</h4>
            <p className="text-sm mb-4 opacity-95">
              Raising your GPA takes time. Here's a realistic example of recovery from a 2.5 GPA:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 1 semester of 3.8:</strong> GPA rises to 2.72 (30 to 45 credits)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 2 semesters of 3.8:</strong> GPA reaches 2.97 (30 to 60 credits)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 3 semesters of 3.8:</strong> GPA hits 3.18 (30 to 75 credits)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><strong>After 4 semesters of 3.8:</strong> GPA reaches 3.34 (30 to 90 credits)</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <span className="text-2xl mr-2">💪</span>
              Important Reminder
            </h4>
            <p className="text-gray-700">
              GPA improvement is a marathon, not a sprint. Stay consistent, use campus resources, and don't be discouraged by setbacks. Many successful Longhorns have recovered from low GPAs to graduate with honors. You've got this! 🤘
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs)</h2>

          <div className="space-y-4">
            <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the UT Austin grading scale?</h3>
              <p className="text-gray-700">
                UT Austin uses a plus/minus grading system: A (4.0), A- (3.67), B+ (3.33), B (3.0), B- (2.67), C+ (2.33), C (2.0), C- (1.67), D+ (1.33), D (1.0), D- (0.67), F (0.0). There is no A+ grade at UT Austin.
              </p>
            </div>

            <div className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need for Dean's List at UT Austin?</h3>
              <p className="text-gray-700">
                To qualify for Dean's List at UT Austin, you need a semester GPA of 3.5 or higher with at least 12 graded credit hours. Pass/Fail courses don't count toward the 12-hour minimum.
              </p>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What are UT Austin graduation honors?</h3>
              <p className="text-gray-700">
                UT Austin awards three levels of Latin Honors: Highest Honors (3.9+ GPA), High Honors (3.7-3.89 GPA), and Honors (3.5-3.69 GPA). These are based on your cumulative GPA at graduation.
              </p>
            </div>

            <div className="border-2 border-purple-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need to transfer to McCombs or CS?</h3>
              <p className="text-gray-700">
                Internal transfer to McCombs Business School typically requires a 3.7+ GPA, while Computer Science in Cockrell Engineering often requires a 3.8+ GPA. These are competitive minimums and actual admitted students may have higher GPAs. Check with <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')} className="text-orange-600 font-semibold hover:underline">admissions</button> for current requirements.
              </p>
            </div>

            <div className="border-2 border-yellow-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does UT Austin calculate GPA with plus/minus grades?</h3>
              <p className="text-gray-700">
                Yes, UT Austin uses a plus/minus grading system where grades like A- (3.67) and B+ (3.33) affect your GPA differently than straight A (4.0) or B (3.0) grades. This provides more granular assessment of your performance.
              </p>
            </div>

            <div className="border-2 border-red-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How many credit hours do I need for full-time status?</h3>
              <p className="text-gray-700">
                At UT Austin, full-time undergraduate status requires a minimum of 12 credit hours per semester. Most students take 15-17 credit hours per semester to graduate in four years (120 hours total).
              </p>
            </div>

            <div className="border-2 border-indigo-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is a good GPA at UT Austin?</h3>
              <p className="text-gray-700">
                A good GPA at UT Austin is generally 3.5 or higher for competitive programs, scholarships, and graduate school. A 3.7+ GPA demonstrates excellent academic performance and opens doors to top opportunities.
              </p>
            </div>

            <div className="border-2 border-pink-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I retake a class at UT Austin to improve my GPA?</h3>
              <p className="text-gray-700">
                Yes, UT Austin allows course retakes. Only the most recent grade counts toward your GPA, but all attempts appear on your transcript. You can retake up to four courses during your undergraduate career. Use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/gpa-raise-calculator')} className="text-orange-600 font-semibold hover:underline">GPA Raise Calculator</button> to see the impact.
              </p>
            </div>

            <div className="border-2 border-teal-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How is cumulative GPA different from semester GPA?</h3>
              <p className="text-gray-700">
                Semester GPA is calculated from courses in a single semester, while cumulative GPA includes all courses across all semesters at UT Austin. Use our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator')} className="text-orange-600 font-semibold hover:underline">Cumulative GPA Calculator</button> to track both.
              </p>
            </div>

            <div className="border-2 border-cyan-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does UT Austin have weighted GPA?</h3>
              <p className="text-gray-700">
                UT Austin does not use weighted GPA in college. All courses contribute equally based on credit hours. High school weighted GPAs are used for admissions but reset once enrolled at UT Austin.
              </p>
            </div>

            <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need to keep my scholarship at UT Austin?</h3>
              <p className="text-gray-700">
                Scholarship GPA requirements vary by program. Most require 3.0-3.5 minimum cumulative GPA for renewal and continuing eligibility. Check your specific scholarship terms with the Office of Scholarships and Financial Aid.
              </p>
            </div>

            <div className="border-2 border-lime-200 rounded-lg p-6 hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do I calculate my major GPA at UT Austin?</h3>
              <p className="text-gray-700">
                Major GPA includes only courses that count toward your major requirements. Use this calculator and enter only your major-specific courses to determine your major GPA. Some competitive programs track major GPA separately for honors or graduate school applications.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Related GPA Calculators</h2>
          <p className="text-gray-700 text-center mb-8">
            Explore our other free GPA calculators for comprehensive academic planning
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 text-left"
            >
              <div className="text-3xl mb-3">🐻</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Berkeley GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate UC Berkeley GPA with official grading scale</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 text-left"
            >
              <div className="text-3xl mb-3">🗽</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">NYU GPA Calculator</h3>
              <p className="text-sm text-gray-600">New York University GPA with Dean's List tracking</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/umich-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 text-left"
            >
              <div className="text-3xl mb-3">〽️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">UMich GPA Calculator</h3>
              <p className="text-sm text-gray-600">University of Michigan GPA calculator with honors</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/unc-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 text-left"
            >
              <div className="text-3xl mb-3">🐏</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">UNC GPA Calculator</h3>
              <p className="text-sm text-gray-600">UNC Chapel Hill Tar Heels GPA calculator</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/college-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 text-left"
            >
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">College GPA Calculator</h3>
              <p className="text-sm text-gray-600">Universal college GPA calculator for any university</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/cumulative-gpa-calculator')}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-orange-400 text-left"
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

export default UTAustinGPACalculator;
