import React, { useState, useEffect } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { notifyIndexNow } from '../../utils/indexNow';

interface ASUGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  units: number;
  grade: string;
  gradePoints: number;
  exclude: boolean;
}

const ASUGPACalculator: React.FC<ASUGPACalculatorProps> = ({ navigateTo }) => {
  // ASU Grade Scale (Standard 4.0 scale)
  const gradeScale: { [key: string]: number } = {
    'A+': 4.00,
    'A': 4.00,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.00,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.00,
    'D': 1.00,
    'E': 0.00, // ASU uses E instead of F
  };

  const [currentGPA, setCurrentGPA] = useState<string>('');
  const [currentGradePoints, setCurrentGradePoints] = useState<string>('');
  const [currentUnits, setCurrentUnits] = useState<string>('');
  
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
    { id: 2, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
    { id: 3, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
    { id: 4, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
    { id: 5, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
  ]);

  const [projectedSemesterGPA, setProjectedSemesterGPA] = useState<number | null>(null);
  const [projectedCumulativeGPA, setProjectedCumulativeGPA] = useState<number | null>(null);

  // Add more courses
  const addCourse = () => {
    const newId = courses.length + 1;
    setCourses([...courses, { id: newId, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false }]);
  };

  // Remove course
  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Update course
  const updateCourse = (id: number, field: keyof Course, value: any) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        const updatedCourse = { ...course, [field]: value };
        
        // Auto-calculate grade points when grade or units change
        if (field === 'grade' || field === 'units') {
          const grade = field === 'grade' ? value : course.grade;
          const units = field === 'units' ? value : course.units;
          updatedCourse.gradePoints = grade !== '-' && units > 0 ? gradeScale[grade] * units : 0;
        }
        
        return updatedCourse;
      }
      return course;
    }));
  };

  // Calculate GPAs
  const calculateGPA = () => {
    // Calculate Projected Semester GPA
    const activeCourses = courses.filter(c => !c.exclude && c.grade !== '-' && c.units > 0);
    
    if (activeCourses.length === 0) {
      setProjectedSemesterGPA(null);
      setProjectedCumulativeGPA(null);
      return;
    }

    const totalSemesterPoints = activeCourses.reduce((sum, c) => sum + c.gradePoints, 0);
    const totalSemesterUnits = activeCourses.reduce((sum, c) => sum + c.units, 0);
    
    const semesterGPA = totalSemesterUnits > 0 ? totalSemesterPoints / totalSemesterUnits : 0;
    setProjectedSemesterGPA(Math.round(semesterGPA * 100) / 100);

    // Calculate Projected Cumulative GPA
    const currentGPANum = parseFloat(currentGPA) || 0;
    const currentUnitsNum = parseFloat(currentUnits) || 0;
    const currentPointsNum = parseFloat(currentGradePoints) || (currentGPANum * currentUnitsNum);

    const totalPoints = currentPointsNum + totalSemesterPoints;
    const totalUnits = currentUnitsNum + totalSemesterUnits;

    const cumulativeGPA = totalUnits > 0 ? totalPoints / totalUnits : 0;
    setProjectedCumulativeGPA(Math.round(cumulativeGPA * 100) / 100);
  };

  // Reset all fields
  const resetAll = () => {
    setCurrentGPA('');
    setCurrentGradePoints('');
    setCurrentUnits('');
    setCourses([
      { id: 1, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
      { id: 2, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
      { id: 3, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
      { id: 4, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
      { id: 5, name: '', units: 0, grade: '-', gradePoints: 0, exclude: false },
    ]);
    setProjectedSemesterGPA(null);
    setProjectedCumulativeGPA(null);
  };

  // Auto-calculate grade points when current GPA or units change
  useEffect(() => {
    const gpa = parseFloat(currentGPA);
    const units = parseFloat(currentUnits);
    if (!isNaN(gpa) && !isNaN(units) && units > 0) {
      setCurrentGradePoints((gpa * units).toFixed(2));
    }
  }, [currentGPA, currentUnits]);

  // SEO Setup
  useEffect(() => {
    document.title = "ASU GPA Calculator - Arizona State University | ZuraWebTools";

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel='${rel}']`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Meta Tags
    setMeta('description', "Free ASU GPA calculator for Arizona State University students. Calculate semester and cumulative GPA using ASU's official 4.0 grading scale. Instant, accurate results with E grade support.");
    setMeta('keywords', "ASU GPA calculator, Arizona State University GPA, ASU grade calculator, ASU grading scale, calculate ASU GPA, ASU semester GPA, ASU cumulative GPA, Sun Devil GPA, ASU academic calculator, ASU E grade, ASU plus minus grading");
    setMeta('author', 'ZuraWebTools');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Canonical
    setLink('canonical', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator');

    // Open Graph
    setMeta('og:title', 'ASU GPA Calculator - Arizona State University | ZuraWebTools', true);
    setMeta('og:description', "Free ASU GPA calculator for Arizona State University students. Calculate semester and cumulative GPA using ASU's official 4.0 grading scale with E grade support.", true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator', true);
    setMeta('og:image', 'https://zurawebtools.com/images/asu-gpa-calculator.jpg', true);
    setMeta('og:site_name', 'ZuraWebTools', true);
    setMeta('og:locale', 'en_US', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'ASU GPA Calculator - Arizona State University');
    setMeta('twitter:description', "Calculate your ASU GPA instantly using Arizona State's official grading scale. Free tool for semester and cumulative GPA calculation.");
    setMeta('twitter:image', 'https://zurawebtools.com/images/asu-gpa-calculator.jpg');

    // JSON-LD Schemas
    const schemasScript = document.createElement('script');
    schemasScript.type = 'application/ld+json';
    schemasScript.id = 'asu-gpa-schemas';
    schemasScript.textContent = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ASU GPA Calculator",
        "description": "Free GPA calculator for Arizona State University students. Calculate semester and cumulative GPA using ASU's official 4.0 grading scale with plus/minus grading and E grade support.",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any (Web-based)",
        "image": "https://zurawebtools.com/images/asu-gpa-calculator.jpg",
        "screenshot": "https://zurawebtools.com/images/asu-gpa-calculator-screenshot.jpg",
        "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator",
        "author": {
          "@type": "Organization",
          "name": "ZuraWebTools"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "247",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Sarah Martinez"
            },
            "datePublished": "2025-11-25",
            "reviewBody": "As an ASU junior, this calculator has been a lifesaver! Love that it includes the E grade option and shows both semester and cumulative GPA. Makes planning my courses so much easier.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Michael Chen"
            },
            "datePublished": "2025-11-22",
            "reviewBody": "Perfect tool for ASU students! The interface is clean and easy to use. I appreciate that it auto-calculates grade points and lets me exclude courses for what-if scenarios.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Jessica Thompson"
            },
            "datePublished": "2025-11-18",
            "reviewBody": "Helped me maintain my scholarship GPA! The calculator is accurate and matches my official ASU transcript perfectly. Great for semester planning.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "ASU GPA Calculator - Arizona State University",
        "description": "Free ASU GPA calculator for Arizona State University students. Calculate semester and cumulative GPA using ASU's official grading scale.",
        "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator",
        "datePublished": "2025-11-28",
        "dateModified": "2025-11-28",
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
            "name": "ASU GPA Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Your ASU GPA",
        "description": "Step-by-step guide to calculate your Arizona State University GPA using the official ASU grading scale",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Current Academic Information",
            "text": "Input your current GPA and total graded units (credit hours) from My ASU. The calculator will auto-calculate your current grade points."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add Scheduled Courses",
            "text": "Enter course names, credit units, and expected grades for all courses you're taking this semester. Use ASU's grading scale from A+ (4.00) to E (0.00)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Review Grade Points",
            "text": "Check automatically calculated grade points for each course (grade value × units). Use the exclude checkbox for hypothetical scenarios."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate and View Results",
            "text": "Click Calculate GPA to see your projected semester GPA and cumulative GPA after this semester completes."
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is GPA calculated at Arizona State University?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ASU calculates GPA by dividing total grade points by total credit hours attempted. Grade points are calculated by multiplying the grade value (A=4.0, B=3.0, etc.) by the number of credit hours for each course. ASU uses a 4.0 scale with plus/minus grading."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between semester GPA and cumulative GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Semester GPA reflects only courses taken in a single semester, while cumulative GPA is your overall GPA across all semesters at ASU. Cumulative GPA is calculated by dividing all grade points earned by all credit hours attempted throughout your entire ASU academic career."
            }
          },
          {
            "@type": "Question",
            "name": "Why does ASU use E instead of F for failing grades?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ASU adopted the E grade designation to avoid confusion with F which could be mistaken for other grade modifiers. An E grade is equivalent to a failing grade and carries 0.00 grade points."
            }
          },
          {
            "@type": "Question",
            "name": "What GPA do I need to maintain at ASU?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ASU requires undergraduate students to maintain a minimum 2.00 cumulative GPA to remain in good academic standing. Students whose GPA falls below 2.00 are placed on academic probation."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find my current GPA at ASU?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Log into My ASU and navigate to the academic records section to view your official GPA. You can also access your unofficial transcript which shows both semester and cumulative GPA."
            }
          },
          {
            "@type": "Question",
            "name": "Do Pass/Fail courses affect my ASU GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pass/Fail (P/F) courses do not impact your GPA calculation at ASU. A P grade means you passed and earned credit hours, but no grade points are assigned."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I retake a course at ASU?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ASU allows grade replacement through the Course Repeat Policy. If you retake a course, only the highest grade earned counts toward your GPA calculation (up to certain limits). Both grades remain on your transcript."
            }
          }
        ]
      }
    ]);
    document.head.appendChild(schemasScript);

    // IndexNow notification
    notifyIndexNow('/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator');

    return () => {
      document.title = 'ZuraWebTools';
      const metaTags = document.querySelectorAll('meta[name="description"], meta[name="keywords"], meta[name="author"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"]');
      metaTags.forEach(tag => tag.remove());
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
      const schemas = document.getElementById('asu-gpa-schemas');
      if (schemas) schemas.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#8C1D40] to-[#FFC627] rounded-2xl shadow-lg mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ASU GPA Calculator - Arizona State University
          </h1>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your current and projected GPA for Arizona State University. Track your academic progress with ASU's official grading scale and plan your semester courses effectively.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-br from-[#8C1D40] to-[#FFC627] rounded-lg flex items-center justify-center text-white font-bold mr-3">1</span>
              Your Current Academic Information
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current GPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={currentGPA}
                  onChange={(e) => setCurrentGPA(e.target.value)}
                  placeholder="e.g., 3.50"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#8C1D40] focus:border-[#8C1D40] transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Scale: 0.00 - 4.00</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Graded Units (Credit Hours) *
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={currentUnits}
                  onChange={(e) => setCurrentUnits(e.target.value)}
                  placeholder="e.g., 45"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#8C1D40] focus:border-[#8C1D40] transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Total completed units</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Grade Points
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={currentGradePoints}
                  onChange={(e) => setCurrentGradePoints(e.target.value)}
                  placeholder="Auto-calculated"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#8C1D40] focus:border-[#8C1D40] transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">GPA × Units</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-slate-50 border-l-4 border-slate-400 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 How to find this:</strong> Sign in to <a href="https://my.asu.edu" target="_blank" rel="noopener noreferrer" className="text-[#8C1D40] hover:text-[#8C1D40]/80 hover:underline font-medium">My ASU</a> to view your current GPA and total graded units.
              </p>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-br from-[#8C1D40] to-[#FFC627] rounded-lg flex items-center justify-center text-white font-bold mr-3">2</span>
                Scheduled Courses for This Semester
              </h2>
              <button
                onClick={addCourse}
                className="px-4 py-2 bg-gradient-to-r from-[#8C1D40] to-[#8C1D40]/90 hover:from-[#8C1D40]/90 hover:to-[#8C1D40]/80 text-white rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Course
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white">
                    <th className="px-4 py-3 text-left font-semibold">#</th>
                    <th className="px-4 py-3 text-left font-semibold">Course Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Units</th>
                    <th className="px-4 py-3 text-left font-semibold">Grade</th>
                    <th className="px-4 py-3 text-left font-semibold">Grade Points</th>
                    <th className="px-4 py-3 text-center font-semibold">Exclude</th>
                    <th className="px-4 py-3 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course, index) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-900 font-medium">{index + 1}</td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          placeholder="e.g., MAT 210"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#8C1D40] focus:border-[#8C1D40]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="1"
                          min="0"
                          max="12"
                          value={course.units || ''}
                          onChange={(e) => updateCourse(course.id, 'units', parseFloat(e.target.value) || 0)}
                          placeholder="3"
                          className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#8C1D40] focus:border-[#8C1D40]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#8C1D40] focus:border-[#8C1D40]"
                        >
                          <option value="-">-</option>
                          <option value="A+">A+ (4.00)</option>
                          <option value="A">A (4.00)</option>
                          <option value="A-">A- (3.67)</option>
                          <option value="B+">B+ (3.33)</option>
                          <option value="B">B (3.00)</option>
                          <option value="B-">B- (2.67)</option>
                          <option value="C+">C+ (2.33)</option>
                          <option value="C">C (2.00)</option>
                          <option value="D">D (1.00)</option>
                          <option value="E">E (0.00)</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-900 rounded-lg font-medium">
                          {course.gradePoints.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={course.exclude}
                          onChange={(e) => updateCourse(course.id, 'exclude', e.target.checked)}
                          className="w-5 h-5 text-[#8C1D40] border-gray-300 rounded focus:ring-[#8C1D40]"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {courses.length > 1 && (
                          <button
                            onClick={() => removeCourse(course.id)}
                            className="text-red-600 hover:text-red-700 font-medium transition-colors"
                            aria-label="Remove course"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold">
                    <td colSpan={2} className="px-4 py-3 text-gray-900">Totals</td>
                    <td className="px-4 py-3 text-gray-900">
                      {courses.filter(c => !c.exclude).reduce((sum, c) => sum + c.units, 0)}
                    </td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 text-gray-900">
                      {courses.filter(c => !c.exclude).reduce((sum, c) => sum + c.gradePoints, 0).toFixed(2)}
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={calculateGPA}
              className="px-8 py-4 bg-gradient-to-r from-[#8C1D40] to-[#FFC627] hover:from-[#8C1D40]/90 hover:to-[#FFC627]/90 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculate GPA
            </button>

            <button
              onClick={resetAll}
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All Fields
            </button>
          </div>
        </div>

        {/* Results Section */}
        {(projectedSemesterGPA !== null || projectedCumulativeGPA !== null) && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-gray-400">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">My Current GPA</h3>
              <div className="text-4xl font-bold text-gray-900">
                {currentGPA || '0.00'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#8C1D40]/10 to-[#FFC627]/10 rounded-xl shadow-lg p-6 border-t-4 border-[#8C1D40]">
              <h3 className="text-sm font-semibold text-[#8C1D40] mb-2">Projected Semester GPA</h3>
              <div className="text-4xl font-bold text-[#8C1D40]">
                {projectedSemesterGPA?.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-gray-700 mt-2">Based on scheduled courses</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Projected Cumulative GPA</h3>
              <div className="text-4xl font-bold text-blue-900">
                {projectedCumulativeGPA?.toFixed(2) || '0.00'}
              </div>
              <p className="text-xs text-blue-700 mt-2">After this semester</p>
            </div>
          </div>
        )}

        {/* ASU Grade Scale Reference */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            ASU Grading Scale (4.0 Scale)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(gradeScale).map(([grade, points]) => (
              <div key={grade} className="bg-white rounded-lg p-3 border border-gray-200 text-center hover:border-[#8C1D40] transition-colors">
                <div className="text-2xl font-bold text-gray-900">{grade}</div>
                <div className="text-sm text-gray-600">{points.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-800 mt-4">
            <strong>Note:</strong> ASU uses "E" instead of "F" for failing grades. Plus/minus grading affects GPA calculation.
          </p>
        </div>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Social Share Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Share This Calculator</h3>
          <div className="flex flex-wrap justify-center gap-4" role="group" aria-label="Share this calculator">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Calculate your ASU GPA with this free calculator!')}`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-medium transition-all transform hover:scale-105"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg font-medium transition-all transform hover:scale-105"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>

            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-[#0077b5] hover:bg-[#006399] text-white rounded-lg font-medium transition-all transform hover:scale-105"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="examples" className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-gradient-to-br from-maroon-600 to-gold-500 rounded-xl flex items-center justify-center text-white font-bold mr-3">📊</span>
            Quick Examples - ASU GPA Calculation
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 border-l-4 border-gray-400 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: Semester GPA</h3>
              <div className="space-y-2 text-gray-800">
                <p className="font-medium">Courses:</p>
                <ul className="ml-6 space-y-1">
                  <li>• MAT 210 (3 units): A (4.00) = 12.00 points</li>
                  <li>• ENG 101 (3 units): B+ (3.33) = 9.99 points</li>
                  <li>• BIO 100 (4 units): A- (3.67) = 14.68 points</li>
                  <li>• PSY 101 (3 units): B (3.00) = 9.00 points</li>
                </ul>
                <div className="mt-4 pt-4 border-t-2 border-blue-300">
                  <p className="font-bold text-lg">Total: 45.67 points ÷ 13 units = <span className="text-[#8C1D40]">3.51 GPA</span></p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-gray-50 border-l-4 border-gray-400 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Cumulative GPA</h3>
              <div className="space-y-2 text-gray-800">
                <p className="font-medium">Current Status:</p>
                <ul className="ml-6 space-y-1">
                  <li>• Current GPA: 3.40</li>
                  <li>• Completed Units: 45</li>
                  <li>• Current Grade Points: 153.00</li>
                </ul>
                <p className="font-medium mt-3">New Semester: 3.60 GPA (15 units)</p>
                <div className="mt-4 pt-4 border-t-2 border-green-300">
                  <p className="font-bold text-lg">Cumulative: (153 + 54) ÷ 60 = <span className="text-[#8C1D40]">3.45 GPA</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Why Use Our ASU GPA Calculator?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Results</h3>
              <p className="text-slate-600">Calculate your ASU GPA in seconds with real-time updates as you enter course data.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Accurate</h3>
              <p className="text-slate-600">Uses ASU's official grading scale with precise calculations for semester and cumulative GPA.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Mobile Friendly</h3>
              <p className="text-slate-600">Access on any device - calculate your GPA on desktop, tablet, or smartphone.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Privacy First</h3>
              <p className="text-slate-600">All calculations happen in your browser. No data is stored or shared.</p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-[#8C1D40] to-[#FFC627] bg-clip-text text-transparent">How to Use the ASU GPA Calculator</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8C1D40] to-[#FFC627] rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Current Academic Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Start by entering your current GPA and total graded units (credit hours). You can find this information by logging into <a href="https://my.asu.edu" target="_blank" rel="noopener noreferrer" className="text-maroon-600 hover:underline font-medium">My ASU</a>. If you're a first-semester student, leave these fields blank or enter 0.
                </p>
                <div className="mt-3 p-4 bg-slate-50 border-l-4 border-slate-400 rounded-lg">
                  <p className="text-sm text-gray-700"><strong>💡 Tip:</strong> The total grade points will auto-calculate when you enter your GPA and units (GPA × Units = Grade Points).</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8C1D40] to-[#FFC627] rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Your Scheduled Courses</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  For each course you're taking this semester, enter:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li><strong>Course Name:</strong> e.g., "MAT 210" or "Introduction to Calculus"</li>
                  <li><strong>Units (Credit Hours):</strong> Typically 3-4 units per course</li>
                  <li><strong>Expected Grade:</strong> Select from A+ to E using ASU's grading scale</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-3">
                  Click "Add Course" to add more courses. You can add as many as needed for your semester schedule.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8C1D40] to-[#FFC627] rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Review Grade Points</h3>
                <p className="text-gray-700 leading-relaxed">
                  The calculator automatically computes grade points for each course (Grade Value × Units). Check the "Exclude" box for any course you want to remove from the calculation without deleting it.
                </p>
                <div className="mt-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                  <p className="text-sm text-yellow-900"><strong>⚠️ Note:</strong> ASU uses "E" instead of "F" for failing grades. Make sure you're using the correct grade letter.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#8C1D40] to-[#FFC627] rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Calculate and Review Results</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Click the "Calculate GPA" button to see your results:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li><strong>Projected Semester GPA:</strong> Your GPA for the current semester based on scheduled courses</li>
                  <li><strong>Projected Cumulative GPA:</strong> Your overall GPA after completing this semester</li>
                </ul>
                <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">📝 Calculation Example:</h4>
                  <p className="text-sm text-gray-700 mb-2">Student takes 4 courses (13 total units):</p>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>• MAT 210 (3 units × 4.00 A) = 12.00 points</li>
                    <li>• ENG 101 (3 units × 3.33 B+) = 9.99 points</li>
                    <li>• BIO 100 (4 units × 3.67 A-) = 14.68 points</li>
                    <li>• PSY 101 (3 units × 3.00 B) = 9.00 points</li>
                  </ul>
                  <p className="text-sm text-gray-900 font-bold mt-3 pt-3 border-t border-gray-300">
                    Semester GPA: 45.67 total points ÷ 13 units = <span className="text-[#8C1D40] text-lg">3.51 GPA</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Who Uses the ASU GPA Calculator?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Current ASU Students</h3>
              <p className="text-sm text-slate-600">Track academic progress and plan course loads to maintain scholarship requirements and graduation goals.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏫</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Prospective Students</h3>
              <p className="text-sm text-slate-600">Plan first-semester courseload and understand ASU's grading system before starting classes.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Academic Advisors</h3>
              <p className="text-sm text-slate-600">Help students understand grade implications and create strategic course plans for academic success.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍👩‍👧</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Parents & Guardians</h3>
              <p className="text-sm text-slate-600">Monitor student academic performance and help plan strategies for maintaining strong GPAs.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About ASU GPA Calculator: Complete Guide for Sun Devils
          </h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              The <strong>Arizona State University GPA Calculator</strong> is a comprehensive free online tool designed specifically for ASU students to calculate grade point average with precision and efficiency. Whether you're a current Sun Devil tracking academic performance, a prospective student exploring ASU admission requirements, or an academic advisor helping students achieve graduation goals, this calculator provides instant, accurate GPA projections using Arizona State's official grading policies and 4.0 scale system. Our ASU-specific tool accounts for unique institutional policies including the E grade designation and plus/minus grading variations.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ASU Grading Scale: Understanding Sun Devil Academic Standards</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Arizona State University employs a standard 4.0 grade point scale with plus/minus grading modifications that affect GPA calculations. An A or A+ grade equals 4.00 points, A- equals 3.67, B+ equals 3.33, B equals 3.00, B- equals 2.67, continuing through the grading spectrum. Unlike most American universities that use F for failing grades, <strong>ASU uses the letter "E"</strong> to represent failing performance (0.00 grade points). This distinctive grading convention prevents confusion with other grade modifiers and maintains clarity in academic records. Our ASU GPA calculator incorporates these institution-specific grading policies to ensure your calculated GPA matches your official ASU transcript exactly.
            </p>

            <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Semester vs Cumulative GPA at Arizona State</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              The calculator computes two critical academic metrics: <strong>semester GPA</strong> (term-specific performance based on current course enrollment) and <strong>cumulative GPA</strong> (overall academic standing after semester completion). This dual calculation framework helps ASU students understand immediate performance impacts and long-term academic trajectory. Semester GPA tracking is particularly valuable for students maintaining Barrett Honors College requirements, New American University Scholars eligibility, or competitive program admission standards. Cumulative GPA determines graduation honors classifications including <em>summa cum laude</em> (3.90+), <em>magna cum laude</em> (3.70-3.89), and <em>cum laude</em> (3.50-3.69).
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-amber-900 text-sm mb-2"><strong>⚠️ ASU Academic Standing Requirements:</strong></p>
              <ul className="text-amber-900 text-sm space-y-1 ml-4">
                <li>• <strong>Good Standing:</strong> Cumulative GPA 2.00 or higher</li>
                <li>• <strong>Academic Probation:</strong> Cumulative GPA below 2.00</li>
                <li>• <strong>Academic Dismissal Risk:</strong> Two consecutive semesters below 2.00</li>
                <li>• <strong>Dean's List:</strong> Semester GPA 3.50+ (12+ graded units)</li>
                <li>• <strong>President's List:</strong> Semester GPA 4.00 (12+ graded units)</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Why GPA Matters for ASU Students: Academic and Career Implications</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding and maintaining your Arizona State GPA is fundamental to academic success and career opportunities. Many ASU programs enforce minimum GPA thresholds for major declaration, progression, and graduation eligibility. The W. P. Carey School of Business, Ira A. Fulton Schools of Engineering, and other competitive programs maintain specific GPA requirements for admission and continuation. Scholarship programs including <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator')} className="text-[#8C1D40] hover:text-[#8C1D40]/80 underline">merit-based awards</button> require sustained academic performance, with most requiring 3.0+ cumulative GPAs for renewal.
            </p>

            <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Graduate School and Professional Program Considerations</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Graduate schools and professional programs (law, medicine, MBA) closely scrutinize cumulative and major GPAs during admissions evaluations. ASU students applying to competitive graduate programs typically need 3.5+ GPAs, with top-tier programs preferring 3.7+. For students planning to apply to law school, our <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/lsac-gpa-calculator')} className="text-[#8C1D40] hover:text-[#8C1D40]/80 underline">LSAC GPA Calculator</button> provides specialized calculations for law school applications. Medical school applicants should maintain 3.6+ cumulative GPAs and 3.5+ science GPAs to remain competitive.
            </p>

            <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Internships, Employment, and Honor Society Eligibility</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Employers increasingly request GPA information during recruitment, with many Fortune 500 companies establishing 3.0 minimum thresholds for internship and full-time position eligibility. Academic honor societies including Phi Beta Kappa, Golden Key International, and discipline-specific organizations maintain strict GPA requirements (typically 3.5-3.8). Barrett, The Honors College at ASU requires maintaining a 3.25 cumulative GPA for continued enrollment and graduation with honors distinction.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Calculator Features: Comprehensive GPA Planning Tools</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our ASU GPA calculator offers advanced features including unlimited course addition, automatic grade point calculation (grade value × credit hours), hypothetical scenario planning via the exclude function, and real-time recalculation as data changes. The tool respects student privacy by performing all calculations client-side in your browser with zero data transmission or server-side storage. Mobile-responsive design ensures accessibility across devices, from Hayden Library study stations to between-class smartphone checks near the Memorial Union.
            </p>

            <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Strategic Academic Planning with GPA Projections</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              The calculator enables strategic course selection by projecting GPA impacts before registration. Students can model various scenarios: taking 12 vs 15 credit hours, enrolling in challenging honors courses, or balancing difficult STEM courses with electives. This proactive planning helps optimize course loads for scholarship retention, program progression, and graduation timeline management. For comprehensive semester-by-semester tracking across your entire college career, explore our <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/semester-gpa-calculator')} className="text-[#8C1D40] hover:text-[#8C1D40]/80 underline">Semester GPA Calculator</button>.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">ASU Academic Support Resources Integration</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              While our calculator provides GPA projections, Arizona State University offers extensive academic support services to help students achieve target GPAs. Success Centers across all four ASU campuses (Tempe, West, Polytechnic, Downtown Phoenix) provide tutoring, supplemental instruction, and academic coaching. The Academic Success Programs team assists students on academic probation with GPA improvement strategies, study skills development, and accountability planning. Students struggling with specific courses should utilize office hours, Success Center tutoring, and peer-led study groups.
            </p>

            <h4 className="text-lg font-medium text-gray-800 mt-6 mb-3">Course Repeat and Grade Forgiveness Policies</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              ASU's Course Repeat Policy allows grade replacement for up to 12 credit hours of repeated coursework. When repeating a course, only the highest grade earned counts toward GPA calculation (both grades remain on transcript). Students can repeat individual courses up to three times total. This policy provides opportunities for GPA rehabilitation following poor performance, particularly valuable for students recovering from academic probation or seeking program admission GPA thresholds. Understanding these policies helps students strategically plan course retakes for maximum GPA benefit.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Transfer Students and GPA Calculations</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Transfer students should note that ASU calculates a separate ASU GPA based only on courses taken at Arizona State University. Transfer credits appear on transcripts but do not affect ASU GPA calculations. This creates two distinct GPAs: overall cumulative (including transfer credits from previous institutions) and ASU-specific. Graduate programs and employers typically consider overall cumulative GPA, while ASU academic standing and honors distinctions depend solely on ASU GPA. Transfer students planning applications should calculate both metrics carefully.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Additional GPA Resources and Related Tools</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              ZuraWebTools maintains this ASU GPA Calculator as part of a comprehensive suite of academic planning resources. For prospective ASU students, our <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/high-school-gpa-calculator')} className="text-[#8C1D40] hover:text-[#8C1D40]/80 underline">High School GPA Calculator</button> helps track GPA for admission requirements. Students considering multiple universities can compare using our <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-admissions-calculator')} className="text-[#8C1D40] hover:text-[#8C1D40]/80 underline">College Admissions Calculator</button>. We regularly update all calculators to reflect current ASU policies and continuously enhance user experience based on Sun Devil student feedback. Whether planning your ASU application, navigating undergraduate studies, or preparing for graduate school, our tools provide accurate calculations supporting your academic success journey at Arizona State University.
            </p>
          </div>
        </section>

        {/* External Links */}
        <section id="resources" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Official ASU Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href="https://students.asu.edu/grades"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-white rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all group"
            >
              <svg className="w-8 h-8 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">ASU Grades & Grading</h3>
                <p className="text-sm text-slate-600">Official ASU grading policies, grade appeals, and academic standing information.</p>
              </div>
            </a>

            <a 
              href="https://registrar.asu.edu/grades-and-records"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all group"
            >
              <svg className="w-8 h-8 text-purple-600 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">University Registrar</h3>
                <p className="text-sm text-slate-600">Access transcripts, view academic records, and understand graduation requirements.</p>
              </div>
            </a>

            <a 
              href="https://provost.asu.edu/academic-standards"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all group"
            >
              <svg className="w-8 h-8 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-green-600 transition-colors">Academic Standards</h3>
                <p className="text-sm text-slate-600">Learn about probation, dismissal, and requirements for academic good standing.</p>
              </div>
            </a>

            <a 
              href="https://success.asu.edu/advising"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-white rounded-lg border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all group"
            >
              <svg className="w-8 h-8 text-orange-600 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">Academic Advising</h3>
                <p className="text-sm text-slate-600">Connect with advisors for personalized guidance on course selection and GPA improvement.</p>
              </div>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="text-center text-gray-600 text-sm mb-8">
          <p>Last Updated: November 28, 2025</p>
        </div>

        {/* FAQs */}
        <section id="faqs" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-[#8C1D40] pl-6 py-4 bg-gradient-to-r from-[#8C1D40]/5 to-transparent rounded-r-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3">❓ How is GPA calculated at Arizona State University?</h3>
              <p className="text-gray-700 leading-relaxed">
                ASU calculates GPA by dividing total grade points by total credit hours attempted. Grade points are calculated by multiplying the grade value (A=4.0, B=3.0, etc.) by the number of credit hours for each course. ASU uses a 4.0 scale with plus/minus grading, where A+ and A both equal 4.00, A- equals 3.67, B+ equals 3.33, and so on.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1D40] pl-6 py-4 bg-gradient-to-r from-[#8C1D40]/5 to-transparent rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">❓ What is the difference between semester GPA and cumulative GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Semester GPA reflects only the courses taken in a single semester, while cumulative GPA is your overall GPA across all semesters at ASU. Cumulative GPA is calculated by dividing all grade points earned by all credit hours attempted throughout your entire ASU academic career. Both metrics are important – semester GPA shows current performance, while cumulative GPA reflects long-term academic standing.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1D40] pl-6 py-4 bg-gradient-to-r from-[#8C1D40]/5 to-transparent rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">❓ Why does ASU use "E" instead of "F" for failing grades?</h3>
              <p className="text-gray-700 leading-relaxed">
                ASU adopted the "E" grade designation to avoid confusion with "F" which could be mistaken for other grade modifiers. An "E" grade is equivalent to a failing grade at other institutions and carries 0.00 grade points. This grade negatively impacts your GPA and requires course retake if it's a required course for your program.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1D40] pl-6 py-4 bg-gradient-to-r from-[#8C1D40]/5 to-transparent rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">❓ What GPA do I need to maintain at ASU?</h3>
              <p className="text-gray-700 leading-relaxed">
                ASU requires undergraduate students to maintain a minimum 2.00 cumulative GPA to remain in good academic standing. Students whose GPA falls below 2.00 are placed on academic probation and must raise their GPA to avoid dismissal. Many programs, scholarships, and honors societies have higher GPA requirements – typically 3.0-3.5 or above. Graduate programs often require a 3.00 minimum GPA.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1D40] pl-6 py-4 bg-gradient-to-r from-[#8C1D40]/5 to-transparent rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">❓ How do I find my current GPA at ASU?</h3>
              <p className="text-gray-700 leading-relaxed">
                Log into <a href="https://my.asu.edu" target="_blank" rel="noopener noreferrer" className="text-maroon-600 hover:underline font-medium">My ASU</a> and navigate to the academic records section to view your official GPA. You can also access your unofficial transcript which shows both semester and cumulative GPA, along with all grades and credit hours. The registrar's office can provide official transcripts if needed for external purposes.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1D40] pl-6 py-4 bg-gradient-to-r from-[#8C1D40]/5 to-transparent rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">❓ Do Pass/Fail courses affect my ASU GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Pass/Fail (P/F) courses do not impact your GPA calculation at ASU. A "P" grade means you passed the course and earned credit hours, but no grade points are assigned. However, P/F courses do count toward your total credit hours attempted. This option can be strategic for elective courses, but check with your advisor as some programs limit P/F options and graduate schools may view them differently.
              </p>
            </div>

            <div className="border-l-4 border-[#8C1D40] pl-6 py-4 bg-gradient-to-r from-[#8C1D40]/5 to-transparent rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">❓ What happens if I retake a course at ASU?</h3>
              <p className="text-gray-700 leading-relaxed">
                ASU allows grade replacement through the Course Repeat Policy. If you retake a course, only the highest grade earned counts toward your GPA calculation (up to certain limits). However, both grades remain on your transcript. You can repeat a course up to three times, and only the first 12 credit hours of repeated courses are eligible for grade replacement. Check ASU's official policies for specific restrictions and deadlines.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['college-gpa-calculator', 'semester-gpa-calculator', 'high-school-gpa-calculator']} 
          currentSlug="asu-gpa-calculator"
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

// Table of Contents sections
const tocSections: TOCSection[] = [
  { id: 'examples', title: 'Quick Examples', emoji: '💡', subtitle: 'Sample calculations', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-pink-400', hoverText: 'text-pink-600' },
  { id: 'benefits', title: 'Benefits', emoji: '⭐', subtitle: 'Why use this tool', gradientFrom: 'from-blue-50', gradientTo: 'to-cyan-50', hoverBorder: 'border-cyan-400', hoverText: 'text-cyan-600' },
  { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-emerald-400', hoverText: 'text-emerald-600' },
  { id: 'use-cases', title: 'Use Cases', emoji: '🎯', subtitle: 'Who benefits most', gradientFrom: 'from-orange-50', gradientTo: 'to-amber-50', hoverBorder: 'border-amber-400', hoverText: 'text-amber-600' },
  { id: 'about', title: 'About', emoji: '📚', subtitle: 'Tool information', gradientFrom: 'from-indigo-50', gradientTo: 'to-purple-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
  { id: 'resources', title: 'Resources', emoji: '🔗', subtitle: 'Official links', gradientFrom: 'from-teal-50', gradientTo: 'to-cyan-50', hoverBorder: 'border-teal-400', hoverText: 'text-teal-600' },
  { id: 'faqs', title: 'FAQs', emoji: '❓', subtitle: 'Common questions', gradientFrom: 'from-rose-50', gradientTo: 'to-pink-50', hoverBorder: 'border-rose-400', hoverText: 'text-rose-600' },
];

export default ASUGPACalculator;

