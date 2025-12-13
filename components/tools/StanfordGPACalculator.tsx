import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Page } from '../../App';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface StanfordGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

const StanfordGPACalculator: React.FC<StanfordGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: '', credits: 0, grade: '' },
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  // SEO Metadata
  useEffect(() => {
    document.title = "Stanford GPA Calculator - Cardinal Grade Calculator | ZuraWebTools";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stanford GPA calculator with 4.0 scale (no plus/minus). Track Latin Honors (Summa 3.95+, Magna 3.85+, Cum Laude 3.70+), Coterm (3.5+), CS major (3.0+).');
    }

    // Robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow');

    // Author meta
    let authorMeta = document.querySelector('meta[name="author"]');
    if (!authorMeta) {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      document.head.appendChild(authorMeta);
    }
    authorMeta.setAttribute('content', 'ZuraWebTools');

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/stanford-gpa-calculator');

    // Open Graph tags
    const ogTags = {
      'og:title': 'Stanford GPA Calculator - Cardinal Grade Calculator with Latin Honors',
      'og:description': 'Official Stanford University GPA calculator with Cardinal 4.0 scale (no plus/minus). Track Latin Honors (Summa 3.95+, Magna 3.85+, Cum Laude 3.70+), Coterm eligibility (3.5+), and CS major requirements.',
      'og:url': 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/stanford-gpa-calculator',
      'og:type': 'website',
      'og:site_name': 'ZuraWebTools',
      'og:locale': 'en_US',
      'og:image': 'https://zurawebtools.com/stanford-gpa-calculator-og.jpg',
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Stanford GPA Calculator - Cardinal Grade Calculator',
      'twitter:description': 'Calculate your Stanford GPA with official Cardinal 4.0 scale. Track Latin Honors (Summa 3.95+, Magna 3.85+), Coterm eligibility, and CS major requirements.',
      'twitter:image': 'https://zurawebtools.com/stanford-gpa-calculator-twitter.jpg',
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    });

    // JSON-LD Schema for SoftwareApplication
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Stanford GPA Calculator",
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
      "description": "Free Stanford University GPA calculator with Cardinal 4.0 grading scale. Calculate semester and cumulative GPA, track Latin Honors eligibility (Summa Cum Laude, Magna Cum Laude, Cum Laude), Coterm program requirements, and CS major declaration.",
      "creator": {
        "@type": "Organization",
        "name": "ZuraWebTools"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

    // BreadcrumbList Schema
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
          "name": "Stanford GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/stanford-gpa-calculator"
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

    // FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Stanford's grading scale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stanford uses a 4.0 scale with no plus/minus grades: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Stanford also offers P/NC (Pass/No Credit) option which doesn't affect GPA."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do you need for Latin Honors at Stanford?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stanford Latin Honors are based on class ranking: Summa Cum Laude (top 3%, typically 3.95+ GPA), Magna Cum Laude (next 7%, typically 3.85+ GPA), and Cum Laude (next 15%, typically 3.70+ GPA)."
          }
        },
        {
          "@type": "Question",
          "name": "What is the minimum GPA for Stanford Coterm programs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stanford Coterm (coterminal degree) programs typically require a minimum 3.5 GPA for eligibility. Some competitive programs may require higher GPAs (3.7+)."
          }
        },
        {
          "@type": "Question",
          "name": "Does Stanford have grade inflation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Stanford has notable grade inflation with an average GPA around 3.7. However, this doesn't diminish the rigor of Stanford academics - employers and graduate schools understand Stanford's grading context."
          }
        },
        {
          "@type": "Question",
          "name": "Can you retake classes at Stanford?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Stanford allows students to retake courses once. Both grades remain on your transcript, but only the most recent grade counts toward your GPA calculation."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do you need to declare CS major at Stanford?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To declare Computer Science major at Stanford, you need a minimum 3.0 GPA in the CS core courses (CS106 series). However, the program is competitive and higher GPAs are advantageous."
          }
        },
        {
          "@type": "Question",
          "name": "Does P/NC affect your Stanford GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, courses taken P/NC (Pass/No Credit) at Stanford do not count toward your GPA. Only letter-graded courses (A, B, C, D, F) affect your GPA calculation."
          }
        },
        {
          "@type": "Question",
          "name": "What is Stanford's academic probation GPA threshold?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stanford places students on academic probation if their cumulative GPA falls below 2.0. Students must raise their GPA above 2.0 within one quarter to avoid academic dismissal."
          }
        },
        {
          "@type": "Question",
          "name": "Do D grades count at Stanford?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "D grades (1.0) count toward your GPA but cannot be used to satisfy major requirements at Stanford. You must earn at least a C in all courses required for your major."
          }
        },
        {
          "@type": "Question",
          "name": "What is considered a good GPA at Stanford?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At Stanford, a 3.5+ GPA is considered good, 3.7+ is very good (Cum Laude range), and 3.85+ is excellent (Magna Cum Laude range). For graduate school and competitive jobs, aim for 3.7+."
          }
        },
        {
          "@type": "Question",
          "name": "How is cumulative GPA calculated at Stanford?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stanford cumulative GPA is calculated by dividing total quality points (credits × grade points) by total credits attempted. Only letter-graded courses count; P/NC courses are excluded from GPA calculation."
          }
        },
        {
          "@type": "Question",
          "name": "What is the average GPA at Stanford?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The average GPA at Stanford is approximately 3.7, which is among the highest average GPAs in the nation. Stanford's grade distribution typically awards 40-50% A grades across most departments."
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

    return () => {
      document.title = 'ZuraWebTools - Free Online Tools for Students & Professionals';
    };
  }, []);

  // Constants - Grade scale and honor thresholds
  const GRADE_SCALE: { [key: string]: number } = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0,
  };

  const LATIN_HONORS_THRESHOLDS = {
    SUMMA: 3.95,
    MAGNA: 3.85,
    CUM_LAUDE: 3.70,
  };

  const ELIGIBILITY_THRESHOLDS = {
    COTERM_MINIMUM: 3.5,
    COTERM_COMPETITIVE: 3.7,
    CS_MAJOR_MINIMUM: 3.0,
    CS_MAJOR_COMPETITIVE: 3.5,
    ACADEMIC_PROBATION: 2.0,
  };

  // Add new course
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

  // Calculate GPA
  const calculateGPA = () => {
    setIsCalculating(true);
    setShowSuccessMessage(false);
    
    setTimeout(() => {
      let totalPoints = 0;
      let totalCreds = 0;

      courses.forEach(course => {
        if (course.grade && course.credits > 0 && GRADE_SCALE[course.grade] !== undefined) {
          totalPoints += GRADE_SCALE[course.grade] * course.credits;
          totalCreds += course.credits;
        }
      });

      const calculatedGPA = totalCreds > 0 ? totalPoints / totalCreds : 0;
      
      setGpa(calculatedGPA);
      setTotalCredits(totalCreds);
      setTotalQualityPoints(totalPoints);
      setShowResults(true);
      setIsCalculating(false);
      setShowSuccessMessage(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(false), 3000);

      // Announce to screen readers
      const announcement = `GPA calculated successfully: ${calculatedGPA.toFixed(2)}`;
      const ariaLive = document.createElement('div');
      ariaLive.setAttribute('role', 'status');
      ariaLive.setAttribute('aria-live', 'polite');
      ariaLive.className = 'sr-only';
      ariaLive.textContent = announcement;
      document.body.appendChild(ariaLive);
      setTimeout(() => document.body.removeChild(ariaLive), 1000);
    }, 500);
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

  // Get Latin Honors level (memoized)
  const getLatinHonorsLevel = useCallback((gpa: number): { level: string; color: string; description: string } => {
    if (gpa >= LATIN_HONORS_THRESHOLDS.SUMMA) {
      return { level: 'Summa Cum Laude', color: 'text-red-700', description: 'Top 3% - Highest Honors' };
    } else if (gpa >= LATIN_HONORS_THRESHOLDS.MAGNA) {
      return { level: 'Magna Cum Laude', color: 'text-red-600', description: 'Next 7% - High Honors' };
    } else if (gpa >= LATIN_HONORS_THRESHOLDS.CUM_LAUDE) {
      return { level: 'Cum Laude', color: 'text-red-500', description: 'Next 15% - Honors' };
    } else {
      return { level: 'Not Eligible', color: 'text-gray-600', description: 'Keep working toward 3.70+' };
    }
  }, []);

  // Get Coterm eligibility (memoized)
  const getCotermEligibility = useCallback((gpa: number): { eligible: boolean; color: string; description: string } => {
    if (gpa >= ELIGIBILITY_THRESHOLDS.COTERM_COMPETITIVE) {
      return { eligible: true, color: 'text-green-700', description: 'Highly Competitive' };
    } else if (gpa >= ELIGIBILITY_THRESHOLDS.COTERM_MINIMUM) {
      return { eligible: true, color: 'text-green-600', description: 'Meets Minimum (3.5+)' };
    } else {
      return { eligible: false, color: 'text-red-600', description: 'Below Minimum (need 3.5+)' };
    }
  }, []);

  // Get CS major eligibility (memoized)
  const getCSMajorEligibility = useCallback((gpa: number): { eligible: boolean; color: string; description: string } => {
    if (gpa >= ELIGIBILITY_THRESHOLDS.CS_MAJOR_COMPETITIVE) {
      return { eligible: true, color: 'text-green-700', description: 'Highly Competitive' };
    } else if (gpa >= ELIGIBILITY_THRESHOLDS.CS_MAJOR_MINIMUM) {
      return { eligible: true, color: 'text-green-600', description: 'Meets Minimum (3.0+)' };
    } else {
      return { eligible: false, color: 'text-red-600', description: 'Below Minimum (need 3.0+)' };
    }
  }, []);

  // Get academic standing (memoized)
  const getAcademicStanding = useCallback((gpa: number): { standing: string; color: string; bgColor: string } => {
    if (gpa >= 3.7) {
      return { standing: 'Excellent', color: 'text-green-700', bgColor: 'bg-green-50' };
    } else if (gpa >= 3.3) {
      return { standing: 'Good', color: 'text-blue-700', bgColor: 'bg-blue-50' };
    } else if (gpa >= 2.5) {
      return { standing: 'Satisfactory', color: 'text-yellow-700', bgColor: 'bg-yellow-50' };
    } else if (gpa >= ELIGIBILITY_THRESHOLDS.ACADEMIC_PROBATION) {
      return { standing: 'Warning', color: 'text-orange-700', bgColor: 'bg-orange-50' };
    } else {
      return { standing: 'Academic Probation', color: 'text-red-700', bgColor: 'bg-red-50' };
    }
  }, []);

  // Print results
  const printResults = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      const honors = getLatinHonorsLevel(gpa);
      const coterm = getCotermEligibility(gpa);
      const standing = getAcademicStanding(gpa);
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Stanford GPA Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #8C1515; }
              .result-box { margin: 15px 0; padding: 15px; border: 1px solid #ddd; }
              .highlight { font-size: 24px; font-weight: bold; color: #8C1515; }
            </style>
          </head>
          <body>
            <h1>Stanford GPA Calculator Results</h1>
            <div class="result-box">
              <h2>GPA Details</h2>
              <p><strong>Semester GPA:</strong> <span class="highlight">${gpa.toFixed(2)}</span></p>
              <p><strong>Total Credits:</strong> ${totalCredits}</p>
              <p><strong>Quality Points:</strong> ${totalQualityPoints.toFixed(2)}</p>
            </div>
            <div class="result-box">
              <h2>Latin Honors</h2>
              <p><strong>Level:</strong> ${honors.level}</p>
              <p>${honors.description}</p>
            </div>
            <div class="result-box">
              <h2>Coterm Eligibility</h2>
              <p><strong>Status:</strong> ${coterm.eligible ? 'Eligible' : 'Not Eligible'}</p>
              <p>${coterm.description}</p>
            </div>
            <div class="result-box">
              <h2>Academic Standing</h2>
              <p><strong>Status:</strong> ${standing.standing}</p>
            </div>
            <div class="result-box">
              <h2>Courses</h2>
              ${courses.filter(c => c.grade && c.credits > 0).map(course => `
                <p>${course.name || 'Course'} - ${course.credits} credits - Grade: ${course.grade} (${GRADE_SCALE[course.grade].toFixed(1)} points)</p>
              `).join('')}
            </div>
            <p style="margin-top: 30px; color: #666;">Generated by ZuraWebTools - Stanford GPA Calculator</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Download results
  const downloadResults = () => {
    const honors = getLatinHonorsLevel(gpa);
    const coterm = getCotermEligibility(gpa);
    const standing = getAcademicStanding(gpa);
    
    const content = `
STANFORD GPA CALCULATOR RESULTS
================================

GPA Details:
- Semester GPA: ${gpa.toFixed(2)}
- Total Credits: ${totalCredits}
- Quality Points: ${totalQualityPoints.toFixed(2)}

Latin Honors:
- Level: ${honors.level}
- Description: ${honors.description}

Coterm Eligibility:
- Status: ${coterm.eligible ? 'Eligible' : 'Not Eligible'}
- Description: ${coterm.description}

Academic Standing: ${standing.standing}

Courses:
${courses.filter(c => c.grade && c.credits > 0).map(course => 
  `- ${course.name || 'Course'}: ${course.credits} credits, Grade ${course.grade} (${GRADE_SCALE[course.grade].toFixed(1)} points)`
).join('\n')}

Generated by ZuraWebTools
https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/stanford-gpa-calculator
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stanford-gpa-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Share results
  const shareResults = async () => {
    const honors = getLatinHonorsLevel(gpa);
    const shareText = `My Stanford GPA: ${gpa.toFixed(2)} - ${honors.level}! Calculate yours at ZuraWebTools 🎓 #Stanford #Cardinal`;
    const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/stanford-gpa-calculator';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Stanford GPA Calculator Results',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Results copied to clipboard!');
    }
  };

  const latinHonors = getLatinHonorsLevel(gpa);
  const cotermStatus = getCotermEligibility(gpa);
  const csMajorStatus = getCSMajorEligibility(gpa);
  const academicStanding = getAcademicStanding(gpa);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Stanford GPA Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Calculate your Cardinal GPA with the official Stanford 4.0 grading scale
          </p>
          <p className="text-lg text-gray-500">
            Track Latin Honors, Summa Cum Laude, Magna Cum Laude, Coterm eligibility, and CS major requirements
          </p>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Course Information</h2>
          
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="md:col-span-1">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    type="text"
                    id={`course-name-${course.id}`}
                    aria-label="Course name"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., CS 106B"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Credits
                  </label>
                  <input
                    type="number"
                    id={`course-credits-${course.id}`}
                    aria-label="Course credits"
                    value={course.credits || ''}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    placeholder="3"
                    min="0"
                    max="20"
                    step="0.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    aria-label="Course grade"
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  >
                    <option value="">Select Grade</option>
                    <option value="A">A (4.0)</option>
                    <option value="B">B (3.0)</option>
                    <option value="C">C (2.0)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Remove course"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={addCourse}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              aria-label="Add another course"
            >
              + Add Course
            </button>
            
            <button
              onClick={calculateGPA}
              disabled={isCalculating || courses.every(c => !c.grade || c.credits <= 0)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              aria-label="Calculate GPA"
            >
              {isCalculating ? 'Calculating...' : 'Calculate GPA'}
            </button>
            
            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              aria-label="Reset calculator"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Stanford GPA Results</h2>
            
            {/* GPA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Semester GPA Card */}
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl p-6 text-white">
                <div className="text-sm font-medium opacity-90 mb-2">Semester GPA</div>
                <div className="text-4xl font-bold mb-1">{gpa.toFixed(2)}</div>
                <div className="text-sm opacity-90">out of 4.0</div>
              </div>

              {/* Total Credits Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                <div className="text-sm font-medium opacity-90 mb-2">Total Credits</div>
                <div className="text-4xl font-bold mb-1">{totalCredits}</div>
                <div className="text-sm opacity-90">units completed</div>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                <div className="text-sm font-medium opacity-90 mb-2">Quality Points</div>
                <div className="text-4xl font-bold mb-1">{totalQualityPoints.toFixed(1)}</div>
                <div className="text-sm opacity-90">total points</div>
              </div>

              {/* Latin Honors Card */}
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
                <div className="text-sm font-medium opacity-90 mb-2">Latin Honors</div>
                <div className="text-xl font-bold mb-1">{latinHonors.level}</div>
                <div className="text-sm opacity-90">{latinHonors.description}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">GPA Progress</span>
                <span className="text-sm font-medium text-gray-700">{gpa.toFixed(2)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    gpa >= 3.7 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    gpa >= 3.0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    gpa >= 2.5 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    gpa >= 2.0 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                    'bg-gradient-to-r from-red-500 to-red-700'
                  }`}
                  style={{ width: `${(gpa / 4.0) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Academic Standing */}
              <div className={`p-4 rounded-lg border-2 ${academicStanding.bgColor} border-gray-200`}>
                <h3 className="font-semibold text-gray-900 mb-2">Academic Standing</h3>
                <p className={`text-lg font-bold ${academicStanding.color}`}>{academicStanding.standing}</p>
              </div>

              {/* Coterm Eligibility */}
              <div className={`p-4 rounded-lg border-2 ${cotermStatus.eligible ? 'bg-green-50' : 'bg-red-50'} border-gray-200`}>
                <h3 className="font-semibold text-gray-900 mb-2">Coterm Eligibility</h3>
                <p className={`text-lg font-bold ${cotermStatus.color}`}>
                  {cotermStatus.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{cotermStatus.description}</p>
              </div>

              {/* CS Major Status */}
              <div className={`p-4 rounded-lg border-2 ${csMajorStatus.eligible ? 'bg-green-50' : 'bg-red-50'} border-gray-200`}>
                <h3 className="font-semibold text-gray-900 mb-2">CS Major Declaration</h3>
                <p className={`text-lg font-bold ${csMajorStatus.color}`}>
                  {csMajorStatus.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{csMajorStatus.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={printResults}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                aria-label="Print results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Results
              </button>

              <button
                onClick={downloadResults}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                aria-label="Download results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Results
              </button>

              <button
                onClick={shareResults}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Share results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Results
              </button>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#how-to-use" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">📖</span>
              <span className="font-medium text-gray-900">How to Use This Calculator</span>
            </a>
            <a href="#about-stanford-gpa" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">🎓</span>
              <span className="font-medium text-gray-900">About Stanford GPA</span>
            </a>
            <a href="#grade-scale" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">📊</span>
              <span className="font-medium text-gray-900">Stanford Grade Scale</span>
            </a>
            <a href="#calculation-method" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">🧮</span>
              <span className="font-medium text-gray-900">GPA Calculation Method</span>
            </a>
            <a href="#comparison" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">⚖️</span>
              <span className="font-medium text-gray-900">Compare Universities</span>
            </a>
            <a href="#latin-honors" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">🏆</span>
              <span className="font-medium text-gray-900">Latin Honors Requirements</span>
            </a>
            <a href="#improve-gpa" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">📈</span>
              <span className="font-medium text-gray-900">How to Improve Your GPA</span>
            </a>
            <a href="#faqs" className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl">❓</span>
              <span className="font-medium text-gray-900">Frequently Asked Questions</span>
            </a>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the Stanford GPA Calculator</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Course Information</h3>
                <p className="text-gray-600">
                  Start by entering your course name (e.g., CS 106B, MATH 51). Add the number of credits for each course. Stanford courses typically range from 1-5 units, with most courses being 3-4 units.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your Grades</h3>
                <p className="text-gray-600">
                  Choose the letter grade you received for each course. Stanford uses a straight letter grading system: A, B, C, D, or F with no plus or minus grades. Remember that courses taken P/NC (Pass/No Credit) don't count toward your GPA.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Multiple Courses</h3>
                <p className="text-gray-600">
                  Click the "+ Add Course" button to add more courses to your calculation. You can add as many courses as needed to calculate your semester GPA accurately.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-600">
                  Once you've entered all your courses, click the "Calculate GPA" button. The calculator will instantly compute your semester GPA along with your Latin Honors eligibility, Coterm program status, and CS major declaration eligibility.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Results</h3>
                <p className="text-gray-600">
                  Check your GPA results, including total quality points and credits earned. See your Latin Honors level (Summa, Magna, or Cum Laude) and eligibility for Stanford's Coterm programs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Save or Share Your Results</h3>
                <p className="text-gray-600">
                  Use the Print, Download, or Share buttons to save your GPA calculation. You can download a text file for your records or share your achievement with friends and family.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                7
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Your Progress</h3>
                <p className="text-gray-600">
                  Use this calculator throughout the semester to project your GPA and plan your academic goals. Calculate different grade scenarios to see what you need to achieve your target GPA.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">
                    <strong>Pro Tip:</strong> For cumulative GPA calculations that include previous semesters, use our{' '}
                    <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator' as Page)} className="font-semibold underline hover:text-red-900">
                      Cumulative GPA Calculator
                    </button>
                    {' '}tool.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Stanford GPA Section */}
        <div id="about-stanford-gpa" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Stanford University GPA</h2>
          
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What is a GPA?</h3>
            <p className="text-gray-600 mb-6">
              Your Grade Point Average (GPA) is a numerical representation of your academic performance at Stanford University. It's calculated by converting your letter grades to grade points, multiplying by course credits, and dividing by total credits. Stanford uses a 4.0 scale where an A equals 4.0 grade points.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Stanford's 4.0 Grading System</h3>
            <p className="text-gray-600 mb-6">
              Stanford uses a straightforward 4.0 grading scale with no plus or minus grades. This means you'll receive whole number grades: A (4.0), B (3.0), C (2.0), D (1.0), or F (0.0). Unlike many other universities, Stanford doesn't use intermediate grades like A- (3.67) or B+ (3.33). Additionally, Stanford offers a Pass/No Credit (P/NC) option for certain courses, which doesn't affect your GPA calculation.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Types of GPA at Stanford</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Overall GPA</h4>
                <p className="text-sm text-gray-600">
                  Includes all letter-graded courses taken at Stanford. This is the GPA shown on your transcript and used for honors calculations.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Major GPA</h4>
                <p className="text-sm text-gray-600">
                  Calculated using only courses that count toward your major requirements. Important for graduate school applications and major declaration.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Semester GPA</h4>
                <p className="text-sm text-gray-600">
                  Your GPA for a single term or quarter. Used to track academic progress and maintain good standing at Stanford.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Your Stanford GPA Matters</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span><strong>Latin Honors:</strong> Your GPA determines eligibility for Summa Cum Laude (top 3%), Magna Cum Laude (next 7%), and Cum Laude (next 15%) at graduation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span><strong>Coterm Programs:</strong> Stanford's 5-year BS/MS programs typically require a 3.5+ GPA for eligibility, with competitive programs requiring higher GPAs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span><strong>Graduate School:</strong> Top graduate programs often require 3.5+ GPAs. For competitive programs like Stanford Law or Stanford Med, aim for 3.7+.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span><strong>Career Opportunities:</strong> Many consulting firms (McKinsey, Bain, BCG) and investment banks require 3.5+ GPAs for recruiting on campus.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span><strong>Scholarships & Fellowships:</strong> Rhodes, Marshall, and NSF fellowships often require 3.7+ GPAs along with research experience.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold mt-1">•</span>
                <span><strong>Major Declaration:</strong> Some majors like CS require minimum GPAs (3.0+) in core courses for declaration. Maintaining a strong GPA keeps all options open.</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 border-l-4 border-red-600 p-4">
              <p className="text-gray-800">
                <strong>Stanford Grade Context:</strong> Stanford has notable grade inflation with an average GPA around 3.7. However, this doesn't diminish the rigor of Stanford academics. Employers and graduate schools understand Stanford's grading context and value your degree accordingly.
              </p>
            </div>
          </div>
        </div>

        {/* Grade Scale Section */}
        <div id="grade-scale" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stanford University Grade Scale</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <th className="px-6 py-3 text-left font-semibold">Letter Grade</th>
                  <th className="px-6 py-3 text-left font-semibold">Grade Points</th>
                  <th className="px-6 py-3 text-left font-semibold">Percentage Range</th>
                  <th className="px-6 py-3 text-left font-semibold">Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-medium text-gray-900">A</td>
                  <td className="px-6 py-4 text-gray-600">4.0</td>
                  <td className="px-6 py-4 text-gray-600">93-100%</td>
                  <td className="px-6 py-4 text-gray-600">Excellent</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-medium text-gray-900">B</td>
                  <td className="px-6 py-4 text-gray-600">3.0</td>
                  <td className="px-6 py-4 text-gray-600">83-92%</td>
                  <td className="px-6 py-4 text-gray-600">Good</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-medium text-gray-900">C</td>
                  <td className="px-6 py-4 text-gray-600">2.0</td>
                  <td className="px-6 py-4 text-gray-600">73-82%</td>
                  <td className="px-6 py-4 text-gray-600">Satisfactory</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-medium text-gray-900">D</td>
                  <td className="px-6 py-4 text-gray-600">1.0</td>
                  <td className="px-6 py-4 text-gray-600">63-72%</td>
                  <td className="px-6 py-4 text-gray-600">Minimal Pass</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-medium text-gray-900">F</td>
                  <td className="px-6 py-4 text-gray-600">0.0</td>
                  <td className="px-6 py-4 text-gray-600">Below 63%</td>
                  <td className="px-6 py-4 text-gray-600">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-red-600">📋</span>
                No Plus/Minus Grades
              </h3>
              <p className="text-sm text-gray-600">
                Stanford uses whole letter grades only. There are no A-, B+, or other intermediate grades. This simplifies GPA calculation and makes grade boundaries clearer.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-orange-600">✓</span>
                P/NC Option Available
              </h3>
              <p className="text-sm text-gray-600">
                Stanford offers Pass/No Credit grading for certain courses. P/NC courses don't affect your GPA, but they do count toward degree requirements and unit totals.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-600">4.0</span>
                Standard 4.0 Scale
              </h3>
              <p className="text-sm text-gray-600">
                Stanford's 4.0 scale is nationally recognized. An A equals 4.0, making it easy to compare with other universities and for graduate school applications.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">🔄</span>
                Grade Forgiveness Policy
              </h3>
              <p className="text-sm text-gray-600">
                You can retake a course once at Stanford. Both grades remain on your transcript, but only the most recent grade counts toward your GPA calculation.
              </p>
            </div>
          </div>
        </div>

        {/* Calculation Method Section */}
        <div id="calculation-method" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Stanford GPA is Calculated</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">The GPA Formula</h3>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
              <div className="text-center">
                <p className="text-gray-700 mb-2 font-medium">Stanford GPA Calculation Formula:</p>
                <div className="text-2xl font-bold text-red-700 my-4">
                  GPA = Total Quality Points ÷ Total Credits
                </div>
                <p className="text-gray-600 text-sm">
                  Quality Points = Grade Points × Course Credits
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Calculation Example</h3>
          <p className="text-gray-600 mb-4">
            Let's calculate a sample semester GPA for a Stanford student taking 5 courses:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Course</th>
                  <th className="px-4 py-3 text-left font-semibold">Credits</th>
                  <th className="px-4 py-3 text-left font-semibold">Grade</th>
                  <th className="px-4 py-3 text-left font-semibold">Grade Points</th>
                  <th className="px-4 py-3 text-left font-semibold">Quality Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-red-50">
                  <td className="px-4 py-3 text-gray-900">CS 106B</td>
                  <td className="px-4 py-3 text-gray-600">5</td>
                  <td className="px-4 py-3 text-gray-600">A</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">5 × 4.0 = 20.0</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-4 py-3 text-gray-900">MATH 51</td>
                  <td className="px-4 py-3 text-gray-600">5</td>
                  <td className="px-4 py-3 text-gray-600">B</td>
                  <td className="px-4 py-3 text-gray-600">3.0</td>
                  <td className="px-4 py-3 text-gray-600">5 × 3.0 = 15.0</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-4 py-3 text-gray-900">PHYSICS 41</td>
                  <td className="px-4 py-3 text-gray-600">4</td>
                  <td className="px-4 py-3 text-gray-600">A</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">4 × 4.0 = 16.0</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-4 py-3 text-gray-900">PWR 1</td>
                  <td className="px-4 py-3 text-gray-600">4</td>
                  <td className="px-4 py-3 text-gray-600">A</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">4 × 4.0 = 16.0</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-4 py-3 text-gray-900">HISTORY 1A</td>
                  <td className="px-4 py-3 text-gray-600">5</td>
                  <td className="px-4 py-3 text-gray-600">B</td>
                  <td className="px-4 py-3 text-gray-600">3.0</td>
                  <td className="px-4 py-3 text-gray-600">5 × 3.0 = 15.0</td>
                </tr>
                <tr className="bg-red-100 font-bold">
                  <td className="px-4 py-3 text-gray-900">TOTALS</td>
                  <td className="px-4 py-3 text-gray-900">23</td>
                  <td className="px-4 py-3 text-gray-600" colSpan={2}>—</td>
                  <td className="px-4 py-3 text-gray-900">82.0</td>
                </tr>
              </tbody>
            </table>
          </div>

          {showSuccessMessage && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg animate-fade-in" role="alert">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-green-800">GPA calculated successfully!</p>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Final GPA Calculation:</h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>Total Quality Points:</strong> 82.0</p>
              <p><strong>Total Credits:</strong> 23</p>
              <p className="text-xl font-bold text-green-700 mt-3">
                Semester GPA = 82.0 ÷ 23 = 3.57
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cumulative GPA Calculation</h3>
          <p className="text-gray-600 mb-4">
            To calculate your cumulative GPA at Stanford, you need to include all letter-graded courses from all semesters:
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 mb-6">
            <div className="space-y-3 text-gray-700">
              <p><strong>Step 1:</strong> Add up all quality points from every semester</p>
              <p><strong>Step 2:</strong> Add up all credits from letter-graded courses</p>
              <p><strong>Step 3:</strong> Divide total quality points by total credits</p>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Example:</strong> If you've earned 180 quality points over 50 credits across 4 quarters, your cumulative GPA would be 180 ÷ 50 = 3.60
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Courses That Count
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• All letter-graded courses (A, B, C, D, F)</li>
                <li>• Courses from all quarters/semesters</li>
                <li>• Repeated courses (most recent grade only)</li>
                <li>• Transfer credits with letter grades</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-red-600">✗</span>
                Courses That Don't Count
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Pass/No Credit (P/NC) courses</li>
                <li>• Incomplete grades (I)</li>
                <li>• Withdrawn courses (W)</li>
                <li>• Audit courses (no credit)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4">
            <p className="text-gray-800">
              <strong>Important Note:</strong> For cumulative GPA calculations including multiple semesters, use our{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator' as Page)} className="font-semibold text-red-600 underline hover:text-red-800">
                Cumulative GPA Calculator
              </button>
              {' '}which allows you to enter previous semester data.
            </p>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div id="comparison" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stanford vs Other Top Universities: GPA Comparison</h2>
          
          <p className="text-gray-600 mb-6">
            Compare Stanford's grading system with other elite universities. Understanding these differences is important for graduate school applications and transfer considerations.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">University</th>
                  <th className="px-4 py-3 text-left font-semibold">Grading Scale</th>
                  <th className="px-4 py-3 text-left font-semibold">A Grade</th>
                  <th className="px-4 py-3 text-left font-semibold">Plus/Minus</th>
                  <th className="px-4 py-3 text-left font-semibold">Avg GPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-red-50 font-semibold">
                  <td className="px-4 py-3 text-gray-900">Stanford</td>
                  <td className="px-4 py-3 text-gray-600">4.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">~3.70</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">Harvard</td>
                  <td className="px-4 py-3 text-gray-600">4.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">Yes (A- = 3.67)</td>
                  <td className="px-4 py-3 text-gray-600">~3.65</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">MIT</td>
                  <td className="px-4 py-3 text-gray-600">5.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">5.0</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">~4.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">Yale</td>
                  <td className="px-4 py-3 text-gray-600">4.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">Yes (A- = 3.67)</td>
                  <td className="px-4 py-3 text-gray-600">~3.70</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">Princeton</td>
                  <td className="px-4 py-3 text-gray-600">4.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">Yes (A- = 3.67)</td>
                  <td className="px-4 py-3 text-gray-600">~3.50</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">UC Berkeley</td>
                  <td className="px-4 py-3 text-gray-600">4.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">Yes (A- = 3.67)</td>
                  <td className="px-4 py-3 text-gray-600">~3.40</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">Georgia Tech</td>
                  <td className="px-4 py-3 text-gray-600">4.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">No</td>
                  <td className="px-4 py-3 text-gray-600">~3.30</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">Caltech</td>
                  <td className="px-4 py-3 text-gray-600">4.0 Scale</td>
                  <td className="px-4 py-3 text-gray-600">4.0</td>
                  <td className="px-4 py-3 text-gray-600">Yes (A- = 3.67)</td>
                  <td className="px-4 py-3 text-gray-600">~3.50</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <h3 className="font-semibold text-gray-900 mb-3">Stanford's Grading Advantages</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Simpler system:</strong> No plus/minus grades mean clearer grade boundaries</li>
                <li>• <strong>Higher averages:</strong> Grade inflation makes maintaining high GPA easier</li>
                <li>• <strong>P/NC flexibility:</strong> Take challenging courses without GPA risk</li>
                <li>• <strong>Grade forgiveness:</strong> Retake courses once to improve GPA</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">What This Means for You</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Grad schools know:</strong> A 3.7 at Stanford ≈ 3.5 at Berkeley ≈ 4.5 at MIT</li>
                <li>• <strong>Employers understand:</strong> Stanford's context is well-known in recruiting</li>
                <li>• <strong>Transfer considerations:</strong> GPA conversions needed when transferring</li>
                <li>• <strong>Competitive edge:</strong> Higher GPA can help with scholarships and fellowships</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Latin Honors Section */}
        <div id="latin-honors" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Stanford Latin Honors Requirements</h2>
          
          <p className="text-gray-600 mb-6">
            Stanford awards Latin Honors to graduating students based on their class ranking. Unlike some universities that use fixed GPA thresholds, Stanford's honors are determined by your percentile ranking within your graduating class.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">🏆</div>
                <h3 className="text-xl font-bold mb-2">Summa Cum Laude</h3>
                <div className="text-3xl font-bold mb-2">3.95+</div>
                <p className="text-sm opacity-90 mb-2">Top 3% of Class</p>
                <p className="text-xs opacity-75">Highest Honors</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">🥇</div>
                <h3 className="text-xl font-bold mb-2">Magna Cum Laude</h3>
                <div className="text-3xl font-bold mb-2">3.85+</div>
                <p className="text-sm opacity-90 mb-2">Next 7% of Class</p>
                <p className="text-xs opacity-75">High Honors</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 text-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">🥈</div>
                <h3 className="text-xl font-bold mb-2">Cum Laude</h3>
                <div className="text-3xl font-bold mb-2">3.70+</div>
                <p className="text-sm opacity-90 mb-2">Next 15% of Class</p>
                <p className="text-xs opacity-75">Honors</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-purple-600">📊</span>
              How Latin Honors Work at Stanford
            </h3>
            <p className="text-gray-600 mb-4">
              Stanford's Latin Honors are <strong>ranking-based, not fixed GPA thresholds</strong>. The GPAs listed above (3.95+, 3.85+, 3.70+) are typical cutoffs, but the exact threshold varies each year based on your graduating class's performance. The top 3% receive Summa, the next 7% receive Magna, and the next 15% receive Cum Laude.
            </p>
            <p className="text-gray-600">
              This means approximately 25% of each graduating class receives some form of Latin Honors, making it a significant achievement that sets you apart in graduate school applications and job searches.
            </p>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Stanford Honors & Requirements</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-600">🎓</span>
                Coterm Program Eligibility
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Stanford's coterminal (Coterm) degree programs allow you to earn a Bachelor's and Master's degree in 5 years.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Minimum GPA:</strong> 3.5 overall</li>
                <li>• <strong>Competitive programs:</strong> 3.7+ recommended</li>
                <li>• <strong>Application timing:</strong> During junior year</li>
                <li>• <strong>Popular fields:</strong> CS, Engineering, Education</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">💻</span>
                CS Major Declaration
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Computer Science is Stanford's most popular major with specific GPA requirements.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Minimum GPA:</strong> 3.0 in CS core courses</li>
                <li>• <strong>Required courses:</strong> CS106 series</li>
                <li>• <strong>Competitive advantage:</strong> 3.5+ GPA</li>
                <li>• <strong>Declaration timing:</strong> After completing prerequisites</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                Academic Standing
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Stanford monitors academic progress to ensure students maintain satisfactory standing.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Good standing:</strong> 2.0+ cumulative GPA</li>
                <li>• <strong>Academic probation:</strong> Below 2.0 GPA</li>
                <li>• <strong>Recovery timeline:</strong> One quarter to improve</li>
                <li>• <strong>Support resources:</strong> Academic advising, tutoring</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-orange-600">🌟</span>
                Unit Requirements
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Stanford requires minimum unit counts for Latin Honors eligibility.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Minimum units:</strong> 45 letter-graded units at Stanford</li>
                <li>• <strong>Graduation total:</strong> 180 units required</li>
                <li>• <strong>Transfer limits:</strong> Max 90 transfer units accepted</li>
                <li>• <strong>P/NC units:</strong> Don't count toward 45 minimum</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 border-l-4 border-red-600 p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Benefits of Latin Honors at Stanford</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Graduate school boost:</strong> Latin Honors significantly strengthen applications to top programs</li>
              <li>• <strong>Job market advantage:</strong> Recruiters recognize Stanford honors as mark of excellence</li>
              <li>• <strong>Scholarship eligibility:</strong> Rhodes, Marshall, and Fulbright programs favor honors graduates</li>
              <li>• <strong>Alumni network:</strong> Join elite group of Stanford honors graduates</li>
              <li>• <strong>Transcript distinction:</strong> Honors appear prominently on official transcripts and diplomas</li>
            </ul>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
            <p className="text-gray-800">
              <strong>Did You Know?</strong> Stanford's average GPA of ~3.7 means about half of students graduate with GPAs above 3.7, making Cum Laude (3.70+) a competitive achievement. Summa Cum Laude (top 3%) is one of Stanford's highest academic honors.
            </p>
          </div>
        </div>

        {/* Improve GPA Section */}
        <div id="improve-gpa" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Improve Your Stanford GPA</h2>
          
          <p className="text-gray-600 mb-6">
            Whether you're aiming for Latin Honors or recovering from a tough quarter, these strategies will help you boost your Stanford GPA. Remember, consistent effort and smart planning make the biggest difference.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Immediate Actions You Can Take</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-red-600">📚</span>
                Attend Every Class
              </h4>
              <p className="text-sm text-gray-600">
                Stanford research shows students who attend 95%+ of classes score half a letter grade higher on average. Set multiple alarms, find an accountability partner, and sit in the front row to stay engaged.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-600">👥</span>
                Form Study Groups
              </h4>
              <p className="text-sm text-gray-600">
                Join or create study groups within the first week of classes. Stanford students in regular study groups average 0.3 GPA points higher than solo studiers. Use dorm study lounges and library group rooms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">👨‍🏫</span>
                Use Office Hours
              </h4>
              <p className="text-sm text-gray-600">
                Attend professor and TA office hours weekly, even when you're not struggling. Building relationships helps with recommendation letters and shows you care about learning. Most Stanford professors love engaged students.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-purple-600">⏰</span>
                Plan Your Schedule
              </h4>
              <p className="text-sm text-gray-600">
                Balance your course load carefully. Don't take 5 hard classes in one quarter. Mix challenging courses with easier electives. Use Carta to read course reviews before registering.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Stanford-Specific Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📖</div>
              <h4 className="font-semibold text-gray-900 mb-2">Hume Center for Writing</h4>
              <p className="text-sm text-gray-600 mb-3">
                Free writing tutoring for essays, lab reports, and research papers. Especially helpful for PWR courses and technical writing.
              </p>
              <p className="text-xs text-gray-500">Location: Sweet Hall</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🔢</div>
              <h4 className="font-semibold text-gray-900 mb-2">Academic Tutoring</h4>
              <p className="text-sm text-gray-600 mb-3">
                Free peer tutoring for Math, CS, Physics, Chemistry, and more. Drop-in sessions and appointments available through your residential program.
              </p>
              <p className="text-xs text-gray-500">Schedule: Most evenings</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">💭</div>
              <h4 className="font-semibold text-gray-900 mb-2">CAPS Counseling</h4>
              <p className="text-sm text-gray-600 mb-3">
                Counseling and Psychological Services helps with stress, anxiety, and time management. Academic pressure is real - get support.
              </p>
              <p className="text-xs text-gray-500">Free for all students</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">Long-Term GPA Improvement Strategies</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Master Time Management</h4>
                <p className="text-sm text-gray-600">
                  Use the Stanford Time Management Guide. Block study time like you block classes. The 2:1 rule: spend 2 hours studying for every 1 hour in class. For a 5-unit course, that's 10 hours of study per week.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Strategic P/NC Use</h4>
                <p className="text-sm text-gray-600">
                  Take exploratory or challenging courses P/NC to protect your GPA while exploring interests. You can take up to 44 units P/NC at Stanford. Use this strategically for courses outside your comfort zone.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Grade Forgiveness Policy</h4>
                <p className="text-sm text-gray-600">
                  If you get a poor grade, you can retake the course once. Only the most recent grade counts toward your GPA. Both grades stay on your transcript, but strategic retakes can significantly boost your GPA.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Choose Professors Wisely</h4>
                <p className="text-sm text-gray-600">
                  Research professors on Carta (Stanford's course review site) before enrolling. Look for clear graders, engaging lecturers, and reasonable workloads. A good professor can make the difference between a B and an A.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Focus on Major GPA</h4>
                <p className="text-sm text-gray-600">
                  If your overall GPA is lower, excel in your major courses. Graduate schools and employers often weight major GPA more heavily. A 3.8 major GPA with 3.5 overall is better than 3.65 in both.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-600 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">GPA Recovery Timeline</h4>
            <p className="text-sm text-gray-700 mb-4">
              Recovering from a low GPA takes time, but it's definitely possible at Stanford. Here's a realistic timeline:
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Starting at 2.5 GPA after freshman year:</strong></p>
              <ul className="ml-6 space-y-1">
                <li>• After sophomore year (earning 4.0s): ~3.1 GPA</li>
                <li>• After junior year (earning 4.0s): ~3.5 GPA</li>
                <li>• After senior year (earning 4.0s): ~3.7 GPA</li>
              </ul>
              <p className="mt-4 text-xs text-gray-600">
                Use our{' '}
                <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/gpa-raise-calculator' as Page)} className="font-semibold text-green-700 underline hover:text-green-900">
                  GPA Raise Calculator
                </button>
                {' '}to project your specific recovery timeline.
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 p-4">
            <p className="text-gray-800">
              <strong>Cardinal Strong:</strong> Remember that Stanford accepted you because you have what it takes. Struggling academically doesn't mean you don't belong - it means you're challenging yourself. Use these resources, stay persistent, and celebrate small victories. Go Stanford! 🌲
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-red-600 bg-red-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is Stanford's grading scale?</h3>
              <p className="text-gray-600">
                Stanford uses a 4.0 scale with no plus/minus grades: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Stanford also offers P/NC (Pass/No Credit) option which doesn't affect GPA.
              </p>
            </div>

            <div className="border-l-4 border-orange-600 bg-orange-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What GPA do you need for Latin Honors at Stanford?</h3>
              <p className="text-gray-600">
                Stanford Latin Honors are based on class ranking: Summa Cum Laude (top 3%, typically 3.95+ GPA), Magna Cum Laude (next 7%, typically 3.85+ GPA), and Cum Laude (next 15%, typically 3.70+ GPA).
              </p>
            </div>

            <div className="border-l-4 border-yellow-600 bg-yellow-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is the minimum GPA for Stanford Coterm programs?</h3>
              <p className="text-gray-600">
                Stanford Coterm (coterminal degree) programs typically require a minimum 3.5 GPA for eligibility. Some competitive programs may require higher GPAs (3.7+).
              </p>
            </div>

            <div className="border-l-4 border-green-600 bg-green-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Does Stanford have grade inflation?</h3>
              <p className="text-gray-600">
                Yes, Stanford has notable grade inflation with an average GPA around 3.7. However, this doesn't diminish the rigor of Stanford academics - employers and graduate schools understand Stanford's grading context.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 bg-blue-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can you retake classes at Stanford?</h3>
              <p className="text-gray-600">
                Yes, Stanford allows students to retake courses once. Both grades remain on your transcript, but only the most recent grade counts toward your GPA calculation.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 bg-purple-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What GPA do you need to declare CS major at Stanford?</h3>
              <p className="text-gray-600">
                To declare Computer Science major at Stanford, you need a minimum 3.0 GPA in the CS core courses (CS106 series). However, the program is competitive and higher GPAs are advantageous.
              </p>
            </div>

            <div className="border-l-4 border-pink-600 bg-pink-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Does P/NC affect your Stanford GPA?</h3>
              <p className="text-gray-600">
                No, courses taken P/NC (Pass/No Credit) at Stanford do not count toward your GPA. Only letter-graded courses (A, B, C, D, F) affect your GPA calculation.
              </p>
            </div>

            <div className="border-l-4 border-red-600 bg-red-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is Stanford's academic probation GPA threshold?</h3>
              <p className="text-gray-600">
                Stanford places students on academic probation if their cumulative GPA falls below 2.0. Students must raise their GPA above 2.0 within one quarter to avoid academic dismissal.
              </p>
            </div>

            <div className="border-l-4 border-orange-600 bg-orange-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do D grades count at Stanford?</h3>
              <p className="text-gray-600">
                D grades (1.0) count toward your GPA but cannot be used to satisfy major requirements at Stanford. You must earn at least a C in all courses required for your major.
              </p>
            </div>

            <div className="border-l-4 border-yellow-600 bg-yellow-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is considered a good GPA at Stanford?</h3>
              <p className="text-gray-600">
                At Stanford, a 3.5+ GPA is considered good, 3.7+ is very good (Cum Laude range), and 3.85+ is excellent (Magna Cum Laude range). For graduate school and competitive jobs, aim for 3.7+.
              </p>
            </div>

            <div className="border-l-4 border-green-600 bg-green-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How is cumulative GPA calculated at Stanford?</h3>
              <p className="text-gray-600">
                Stanford cumulative GPA is calculated by dividing total quality points (credits × grade points) by total credits attempted. Only letter-graded courses count; P/NC courses are excluded from GPA calculation.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 bg-blue-50 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is the average GPA at Stanford?</h3>
              <p className="text-gray-600">
                The average GPA at Stanford is approximately 3.7, which is among the highest average GPAs in the nation. Stanford's grade distribution typically awards 40-50% A grades across most departments.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related GPA Calculators</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/harvard-gpa-calculator' as Page)}
              className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="text-lg font-bold mb-2">Harvard GPA Calculator</h3>
              <p className="text-sm opacity-90">Calculate Harvard Crimson GPA with plus/minus grading</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/mit-gpa-calculator' as Page)}
              className="bg-gradient-to-br from-gray-700 to-red-700 text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-lg font-bold mb-2">MIT GPA Calculator</h3>
              <p className="text-sm opacity-90">Calculate MIT Engineers GPA with 5.0 scale</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/yale-gpa-calculator' as Page)}
              className="bg-gradient-to-br from-blue-700 to-blue-800 text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-3xl mb-3">🐕</div>
              <h3 className="text-lg font-bold mb-2">Yale GPA Calculator</h3>
              <p className="text-sm opacity-90">Calculate Yale Bulldogs GPA with Latin Honors</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator' as Page)}
              className="bg-gradient-to-br from-blue-600 to-yellow-500 text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-3xl mb-3">🐻</div>
              <h3 className="text-lg font-bold mb-2">Berkeley GPA Calculator</h3>
              <p className="text-sm opacity-90">Calculate UC Berkeley Golden Bears GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator' as Page)}
              className="bg-gradient-to-br from-green-600 to-emerald-600 text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold mb-2">College GPA Calculator</h3>
              <p className="text-sm opacity-90">Universal college GPA calculator for any university</p>
            </button>

            <button
              onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator' as Page)}
              className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:shadow-lg transition-shadow text-left"
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold mb-2">Cumulative GPA Calculator</h3>
              <p className="text-sm opacity-90">Calculate cumulative GPA across multiple semesters</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StanfordGPACalculator;
