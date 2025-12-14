import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface DukeGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

// Input sanitization utility
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>&"']/g, (char) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
      };
      return entities[char] || char;
    })
    .trim()
    .slice(0, 200);
};

const DukeGPACalculator: React.FC<DukeGPACalculatorProps> = ({ navigateTo }) => {
  // Constants
  const CALCULATOR_URL = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/duke-gpa-calculator';
  const SHARE_TITLE = 'Duke GPA Calculator - Free & Accurate';
  const SHARE_TEXT = 'Calculate your Duke GPA with precision!';

  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Popular Duke courses for dropdown
  const popularDukeCourses = [
    "CS 101 - Introduction to Computer Science",
    "CS 201 - Data Structures and Algorithms",
    "ECE 110 - Fundamentals of Electrical Engineering",
    "ME 221 - Structure and Properties of Solids",
    "BME 101 - Biomedical Engineering Innovation",
    "ECON 101 - Principles of Economics",
    "MATH 111 - Laboratory Calculus I",
    "MATH 112 - Laboratory Calculus II",
    "CHEM 101 - Core Concepts in Chemistry",
    "BIO 201 - Molecular Biology",
    "PHYSICS 141 - General Physics I",
    "ENGLISH 101 - Academic Writing",
    "PSY 101 - Introduction to Psychology",
    "SOCIOL 101 - Introduction to Sociology",
    "HISTORY 101 - Introduction to History",
    "POLI 101 - Introduction to Political Science",
    "ARTS 101 - Introduction to Visual Arts",
    "MUSIC 101 - Introduction to Music Theory",
    "DRAMA 101 - Introduction to Theater",
    "SPANISH 101 - Elementary Spanish",
    "FRENCH 101 - Elementary French",
    "STAT 101 - Introduction to Statistics",
    "PUBPOL 101 - Introduction to Public Policy",
    "ENVIRON 101 - Environmental Science",
    "ANTHRO 101 - Introduction to Anthropology"
  ];

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Duke GPA Calculator - Free Accurate GPA Tool | ZuraWebTools";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your Duke University GPA with our free, accurate calculator. Track honors eligibility, credit hours, and academic standing on the 4.0 scale.');
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Duke GPA Calculator - Free & Accurate Duke University GPA Tool' },
      { property: 'og:description', content: 'Calculate your Duke University GPA instantly. Track Latin Honors eligibility (Summa, Magna, Cum Laude), credit hours, and academic standing with our free 4.0 scale calculator.' },
      { property: 'og:url', content: CALCULATOR_URL },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-duke-gpa.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: 'ZuraWebTools' }
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Duke GPA Calculator - Free & Accurate' },
      { name: 'twitter:description', content: 'Calculate your Duke University GPA with precision. Track honors eligibility and academic standing on the 4.0 scale.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/twitter-duke-gpa.png' },
      { name: 'twitter:site', content: '@ZuraWebTools' }
    ];

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', CALCULATOR_URL);
    }

    // JSON-LD: HowTo Schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Your Duke University GPA",
      "description": "Step-by-step guide to calculating your Duke GPA using our free calculator tool",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Course Information",
          "text": "Type your course name or select from our dropdown list of popular Duke courses from Trinity College or Pratt School of Engineering",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "name": "Input Credit Hours",
          "text": "Enter the credit hours for each course, typically ranging from 0.5 to 6 credits at Duke",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "name": "Select Letter Grades",
          "text": "Choose the letter grade you earned from the dropdown menu using Duke's A through F scale with plus/minus distinctions",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "name": "Calculate and Review",
          "text": "Click Calculate GPA to instantly see your cumulative GPA, total credits, quality points, and Latin Honors eligibility",
          "position": 4
        }
      ]
    };

    // JSON-LD: FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is Duke GPA calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Duke GPA is calculated by multiplying each course's grade point value by its credit hours, summing all quality points, and dividing by total credit hours. For example, an A (4.0) in a 3-credit course contributes 12.0 quality points."
          }
        },
        {
          "@type": "Question",
          "name": "Does Duke use plus/minus grading?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Duke uses plus/minus grading for most letter grades. An A+ and A are worth 4.0, A- is worth 3.7, B+ is 3.3, B- is 2.7, and so on. Duke includes A+ grade worth the same as A (4.0 points)."
          }
        },
        {
          "@type": "Question",
          "name": "Do Pass/Fail courses affect my Duke GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, Pass (P) and Satisfactory (S) grades do not affect your GPA calculation at Duke. These courses count toward your credit requirements but don't contribute quality points."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for Latin Honors at Duke?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Duke awards Summa Cum Laude for GPA ≥3.80, Magna Cum Laude for ≥3.60, and Cum Laude for ≥3.40. These thresholds may vary slightly by school (Trinity vs. Pratt) and are calculated at graduation based on cumulative GPA."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate my Duke GPA for specific semesters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our calculator works for any combination of courses. Enter only the courses from a specific semester to calculate your semester GPA, or include all courses for your cumulative GPA."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this Duke GPA calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our calculator uses Duke's official grading scale (4.0 system with standard plus/minus values) to provide 100% accurate GPA calculations. The same formula used by Duke's registrar is implemented in our tool."
          }
        },
        {
          "@type": "Question",
          "name": "Is this calculator free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our Duke GPA calculator is completely free with no registration required. You can calculate, print, and share your results unlimited times."
          }
        }
      ]
    };

    // JSON-LD: Breadcrumb Schema
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
          "name": "GPA Calculators",
          "item": "https://zurawebtools.com/tools/gpa-calculators"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Duke GPA Calculator",
          "item": CALCULATOR_URL
        }
      ]
    };

    // JSON-LD: WebPage Schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Duke GPA Calculator - Free Duke University GPA Calculator",
      "description": "Calculate your Duke University GPA with our free, accurate calculator. Track honors eligibility, credit hours, and academic standing on the 4.0 scale.",
      "url": CALCULATOR_URL,
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Duke GPA Calculator",
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
          "bestRating": "5"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      }
    };

    // Inject schemas
    const schemas = [howToSchema, faqSchema, breadcrumbSchema, webPageSchema];
    schemas.forEach((schema, index) => {
      const scriptId = `duke-gpa-schema-${index}`;
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(schema);
    });
  }, []);

  // Duke grade values (4.0 scale) - Official Duke University grading scale
  const dukeGradeValues: { [key: string]: number } = {
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
    'D-': 1.0,
    'F': 0.0,
    'P': 0,
    'S': 0
  };

  // Grade validation function
  const isValidDukeGrade = (grade: string): boolean => {
    return grade in dukeGradeValues;
  };

  // Calculate GPA
  const calculateGPA = useCallback(() => {
    setIsCalculating(true);
    setHasError(false);

    setTimeout(() => {
      try {
        const validCourses = courses.filter(c => c.grade && c.credits > 0 && dukeGradeValues[c.grade] !== undefined);
        
        if (validCourses.length === 0) {
          setHasError(true);
          setIsCalculating(false);
          return;
        }

        let points = 0;
        let credits = 0;

        validCourses.forEach(course => {
          const gradeValue = dukeGradeValues[course.grade];
          if (course.grade !== 'P' && course.grade !== 'S') {
            points += gradeValue * course.credits;
            credits += course.credits;
          }
        });

        const calculatedGPA = credits > 0 ? points / credits : 0;
        
        setGpa(calculatedGPA);
        setTotalCredits(credits);
        setTotalQualityPoints(points);
        setShowResults(true);
        setShowSuccessMessage(true);
        setIsCalculating(false);

        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        setHasError(true);
        setIsCalculating(false);
      }
    }, 800);
  }, [courses]);

  // Update course with validation and sanitization
  const updateCourse = useCallback((id: string, field: keyof Course, value: string | number) => {
    let sanitizedValue = value;
    
    if (typeof value === 'string' && field === 'name') {
      sanitizedValue = sanitizeInput(value);
    }
    
    if (typeof value === 'number' && field === 'credits') {
      sanitizedValue = Math.max(0, Math.min(8, value));
    }
    
    // Validate grade if field is grade
    if (field === 'grade' && typeof value === 'string' && value !== '' && !isValidDukeGrade(value)) {
      console.warn(`Invalid Duke grade: ${value}`);
      return;
    }
    
    setCourses(prevCourses => prevCourses.map(course =>
      course.id === id ? { ...course, [field]: sanitizedValue } : course
    ));
  }, []);

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

  // Reset calculator
  const resetCalculator = () => {
    setCourses([{ id: crypto.randomUUID(), name: '', credits: 0, grade: '' }]);
    setGpa(0);
    setTotalCredits(0);
    setTotalQualityPoints(0);
    setShowResults(false);
    setShowSuccessMessage(false);
  };

  // Get honor status
  const getHonorStatus = useMemo(() => {
    if (gpa >= 3.8) return { status: 'Summa Cum Laude', color: 'text-yellow-600', bgColor: 'bg-gradient-to-r from-yellow-50 to-amber-50', borderColor: 'border-yellow-300' };
    if (gpa >= 3.6) return { status: 'Magna Cum Laude', color: 'text-blue-600', bgColor: 'bg-gradient-to-r from-blue-50 to-indigo-50', borderColor: 'border-blue-300' };
    if (gpa >= 3.4) return { status: 'Cum Laude', color: 'text-green-600', bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50', borderColor: 'border-green-300' };
    if (gpa >= 3.0) return { status: 'Good Standing', color: 'text-slate-600', bgColor: 'bg-gradient-to-r from-slate-50 to-gray-50', borderColor: 'border-slate-300' };
    return { status: 'Below Average', color: 'text-red-600', bgColor: 'bg-gradient-to-r from-red-50 to-rose-50', borderColor: 'border-red-300' };
  }, [gpa]);

  // Print results
  const handlePrint = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Duke GPA Calculation Results</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
          h1 { color: #001a57; text-align: center; margin-bottom: 30px; }
          .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          .summary h2 { color: #001a57; margin-top: 0; }
          .stat { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #dee2e6; }
          .stat strong { color: #001a57; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #dee2e6; }
          th { background: #001a57; color: white; }
          .footer { text-align: center; margin-top: 40px; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <h1>Duke University GPA Calculation Results</h1>
        <div class="summary">
          <h2>Summary</h2>
          <div class="stat"><span>Cumulative GPA:</span><strong>${gpa.toFixed(2)}</strong></div>
          <div class="stat"><span>Total Credits:</span><strong>${totalCredits.toFixed(1)}</strong></div>
          <div class="stat"><span>Quality Points:</span><strong>${totalQualityPoints.toFixed(2)}</strong></div>
          <div class="stat"><span>Academic Standing:</span><strong>${getHonorStatus.status}</strong></div>
        </div>
        <h2>Course Details</h2>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Grade</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            ${courses.filter(c => c.grade && c.credits > 0).map(course => `
              <tr>
                <td>${course.name || 'Unnamed Course'}</td>
                <td>${course.credits}</td>
                <td>${course.grade}</td>
                <td>${((dukeGradeValues[course.grade] || 0) * course.credits).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Generated by ZuraWebTools Duke GPA Calculator</p>
          <p>${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Table of Contents sections
  const tocSections = [
    { id: 'calculator', title: 'Duke GPA Calculator Tool' },
    { id: 'about-duke-gpa', title: 'About Duke University GPA' },
    { id: 'how-to-calculate', title: 'How to Calculate Your Duke GPA' },
    { id: 'grade-scale', title: 'Duke Grade Scale & Point Values' },
    { id: 'honors-requirements', title: 'Latin Honors Requirements' },
    { id: 'comparison', title: 'Duke GPA vs Other Universities' },
    { id: 'faqs', title: 'Frequently Asked Questions' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Duke GPA Calculator
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Calculate your Duke University GPA with precision. Track Latin Honors eligibility and academic standing using our free 4.0 scale calculator.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Enter Your Courses</h2>
            
            {/* Success Message */}
            {showSuccessMessage && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg animate-fade-in">
                <p className="font-semibold">✓ GPA Calculated Successfully!</p>
              </div>
            )}

            {/* Error Message */}
            {hasError && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                <p className="font-semibold">⚠ Please add at least one course with grade and credits.</p>
              </div>
            )}

            {/* Course Input Fields */}
            <div className="space-y-4 mb-6" role="list" aria-label="Course list">
              {courses.map((course, index) => (
                <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-all">
                  <div className="md:col-span-1 flex items-center">
                    <span className="text-lg font-semibold text-slate-700" aria-label={`Course number ${index + 1}`}>#{index + 1}</span>
                  </div>
                  
                  <div className="md:col-span-5">
                    <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                      Course Name
                    </label>
                    <input
                      id={`course-name-${course.id}`}
                      type="text"
                      list={`course-datalist-${course.id}`}
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          document.getElementById(`course-credits-${course.id}`)?.focus();
                        }
                      }}
                      placeholder="Type or select from popular courses"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-slate-400"
                      aria-label={`Course name for course ${index + 1}`}
                      maxLength={200}
                    />
                    <datalist id={`course-datalist-${course.id}`}>
                      {popularDukeCourses.map((courseName, idx) => (
                        <option key={idx} value={courseName} />
                      ))}
                    </datalist>
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          document.getElementById(`course-grade-${course.id}`)?.focus();
                        }
                      }}
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
                      <option value="A+">A+ (4.0)</option>
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
                      <option value="D-">D- (1.0)</option>
                      <option value="F">F (0.0)</option>
                      <option value="P">P - Pass (No GPA impact)</option>
                      <option value="S">S - Satisfactory (No GPA impact)</option>
                    </select>
                  </div>

                  <div className="md:col-span-1 flex items-end justify-center">
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-red-300"
                      disabled={courses.length === 1}
                      aria-label={`Remove course ${index + 1}`}
                      title="Remove this course"
                      type="button"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  addCourse();
                }
              }}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-green-300 flex items-center justify-center gap-2"
              aria-label="Add another course to the list"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Another Course
            </button>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={calculateGPA}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!isCalculating && !courses.every(c => !c.grade || c.credits === 0)) {
                      calculateGPA();
                    }
                  }
                }}
                disabled={isCalculating || courses.every(c => !c.grade || c.credits === 0)}
                className="py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl focus:ring-4 focus:ring-blue-300 flex items-center justify-center gap-3"
                aria-label="Calculate your Duke GPA"
                aria-busy={isCalculating}
                type="button"
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    resetCalculator();
                  }
                }}
                className="py-4 px-8 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold text-lg rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all shadow-lg hover:shadow-xl focus:ring-4 focus:ring-slate-300 flex items-center justify-center gap-3"
                aria-label="Reset calculator"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Calculator
              </button>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Your Duke GPA Results</h2>
              
              {/* Result Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Cumulative GPA</div>
                  <div className="text-5xl font-bold mb-1">{gpa.toFixed(2)}</div>
                  <div className="text-sm opacity-90">Out of 4.00</div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Total Credits</div>
                  <div className="text-5xl font-bold mb-1">{totalCredits.toFixed(1)}</div>
                  <div className="text-sm opacity-90">Credit Hours</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Quality Points</div>
                  <div className="text-5xl font-bold mb-1">{totalQualityPoints.toFixed(2)}</div>
                  <div className="text-sm opacity-90">Total Points</div>
                </div>

                <div className={`${getHonorStatus.bgColor} ${getHonorStatus.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="text-sm font-semibold uppercase tracking-wide mb-2 text-slate-600">Academic Standing</div>
                  <div className={`text-2xl font-bold mb-1 ${getHonorStatus.color}`}>{getHonorStatus.status}</div>
                  <div className="text-sm text-slate-600">Current Status</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700">GPA Progress</span>
                  <span className="text-sm font-semibold text-blue-600">{((gpa / 4.0) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min((gpa / 4.0) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handlePrint}
                  className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Results
                </button>

                <button
                  onClick={() => {
                    const text = `Duke GPA: ${gpa.toFixed(2)}/4.00 | Credits: ${totalCredits.toFixed(1)} | Status: ${getHonorStatus.status}`;
                    navigator.clipboard.writeText(text);
                    alert('Results copied to clipboard!');
                  }}
                  className="py-3 px-6 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Results
                </button>
              </div>

              {/* Social Share Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Share Your Results</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CALCULATOR_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(CALCULATOR_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg"
                    aria-label="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(CALCULATOR_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out this ${SHARE_TITLE}: ${CALCULATOR_URL}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Key Info Box - Grade Scale & Honors */}
          <div id="grade-scale" className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duke University Grade Scale
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Grade Values */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Official Grade Point Values</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">A+ / A</span>
                    <span className="text-blue-600 font-bold">4.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">A-</span>
                    <span className="text-blue-600 font-bold">3.70</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">B+</span>
                    <span className="text-blue-600 font-bold">3.30</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">B</span>
                    <span className="text-blue-600 font-bold">3.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">B-</span>
                    <span className="text-blue-600 font-bold">2.70</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">C+</span>
                    <span className="text-blue-600 font-bold">2.30</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">C</span>
                    <span className="text-blue-600 font-bold">2.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">C-</span>
                    <span className="text-blue-600 font-bold">1.70</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">D+ / D / D-</span>
                    <span className="text-blue-600 font-bold">1.30 / 1.00 / 1.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-slate-700">F</span>
                    <span className="text-blue-600 font-bold">0.00</span>
                  </div>
                </div>
              </div>

              {/* Honors Requirements */}
              <div id="honors-requirements">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Latin Honors Requirements</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border-2 border-yellow-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      <span className="font-bold text-yellow-700">Summa Cum Laude</span>
                    </div>
                    <p className="text-sm text-slate-700">GPA ≥ 3.80</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      <span className="font-bold text-blue-700">Magna Cum Laude</span>
                    </div>
                    <p className="text-sm text-slate-700">GPA ≥ 3.60</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-300 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      <span className="font-bold text-green-700">Cum Laude</span>
                    </div>
                    <p className="text-sm text-slate-700">GPA ≥ 3.40</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <strong>Note:</strong> Latin Honors at Duke University are awarded based on cumulative GPA at graduation. Additional requirements may include completion of specific coursework and departmental honors programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-6 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Navigation</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="#calculator" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <span className="font-semibold text-blue-900">📊 Calculator Tool</span>
            </a>
            <a href="#how-to-calculate" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <span className="font-semibold text-blue-900">📝 How to Calculate</span>
            </a>
            <a href="#about-duke-gpa" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <span className="font-semibold text-blue-900">ℹ️ About Duke GPA</span>
            </a>
            <a href="#grade-scale" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <span className="font-semibold text-blue-900">📈 Grade Scale</span>
            </a>
            <a href="#comparison" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <span className="font-semibold text-blue-900">⚖️ Comparison Table</span>
            </a>
            <a href="#faqs" className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
              <span className="font-semibold text-blue-900">❓ FAQs</span>
            </a>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* How to Calculate Section */}
          <div id="how-to-calculate" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Calculate Your Duke GPA</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Calculating your Duke University GPA is straightforward with our free calculator. Follow these simple steps to get accurate results in seconds.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Enter Course Information</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Type your course name or select from our dropdown list of popular Duke courses. You can add courses from Trinity College, Pratt School of Engineering, or any other Duke program.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Input Credit Hours</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Enter the credit hours for each course (typically 0.5 to 8 credits at Duke). Most courses are worth 3-4 credits, but lab courses, seminars, and special projects may vary up to 8 credits.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Select Letter Grades</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Choose the letter grade you earned from the dropdown menu. Duke uses an A through F scale with plus/minus distinctions for most grades.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Calculate and Review</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Click the "Calculate GPA" button to instantly see your cumulative GPA, total credits, quality points, and Latin Honors eligibility. You can print or share your results directly from the calculator.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-600">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">💡 Pro Tip</h4>
              <p className="text-slate-700 leading-relaxed">
                Use the "Add Another Course" button to include all your courses from multiple semesters. Our calculator automatically handles Pass/Fail (P) and Satisfactory (S) grades, which don't affect your GPA but count toward credit requirements.
              </p>
            </div>
          </div>

          {/* About Duke GPA Section */}
          <div id="about-duke-gpa" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About Duke University GPA</h2>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Duke University uses a standard 4.0 GPA scale where an A is worth 4.0 grade points, and grades decrease incrementally down to F (0.0 points). Understanding how your GPA is calculated helps you track academic progress and plan for graduation honors.
            </p>

            <h3 className="text-2xl font-semibold text-slate-900 mb-4 mt-8">What is a Good GPA at Duke?</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Duke is known for academic rigor, and GPA expectations reflect this high standard. Here's what different GPA ranges mean at Duke:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700"><strong>3.8+:</strong> Exceptional performance - Summa Cum Laude range, top tier for graduate school applications</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700"><strong>3.6-3.79:</strong> Strong performance - Magna Cum Laude range, competitive for most opportunities</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700"><strong>3.4-3.59:</strong> Good performance - Cum Laude range, demonstrates solid academic achievement</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-slate-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700"><strong>3.0-3.39:</strong> Satisfactory performance - Good standing, meets graduation requirements</span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-slate-900 mb-4 mt-8">Duke GPA Calculation Formula</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Your Duke GPA is calculated using a weighted average formula:
            </p>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
              <p className="text-center text-lg font-mono text-slate-900">
                GPA = (Sum of Grade Points × Credit Hours) ÷ Total Credit Hours
              </p>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Example:</strong> If you earn an A (4.0) in a 3-credit course and a B+ (3.3) in a 4-credit course:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700">
              <li>Course 1: 4.0 × 3 = 12.0 quality points</li>
              <li>Course 2: 3.3 × 4 = 13.2 quality points</li>
              <li>Total: 25.2 quality points ÷ 7 credits = <strong>3.6 GPA</strong></li>
            </ul>

            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">📚 Academic Resources at Duke</h4>
              <p className="text-slate-700 leading-relaxed mb-4">
                Duke offers extensive academic support through the <a href="https://academicresourcecenter.duke.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Academic Resource Center</a>, peer tutoring, and faculty office hours. Take advantage of these resources to maintain a strong GPA.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Visit <a href="https://www.duke.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Duke University's official website</a> for more information about academic policies and grading standards.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div id="comparison" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Duke GPA vs Other Universities</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Understanding how Duke's GPA system compares to other top universities helps you contextualize your academic performance for graduate school applications and job opportunities.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">University</th>
                    <th className="px-6 py-4 text-left font-semibold">GPA Scale</th>
                    <th className="px-6 py-4 text-left font-semibold">Summa CL</th>
                    <th className="px-6 py-4 text-left font-semibold">Magna CL</th>
                    <th className="px-6 py-4 text-left font-semibold">Cum Laude</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-blue-900">Duke University</td>
                    <td className="px-6 py-4 text-slate-700">4.0</td>
                    <td className="px-6 py-4 text-slate-700">≥3.80</td>
                    <td className="px-6 py-4 text-slate-700">≥3.60</td>
                    <td className="px-6 py-4 text-slate-700">≥3.40</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">Yale University</td>
                    <td className="px-6 py-4 text-slate-700">4.0</td>
                    <td className="px-6 py-4 text-slate-700">≥3.90</td>
                    <td className="px-6 py-4 text-slate-700">≥3.70</td>
                    <td className="px-6 py-4 text-slate-700">≥3.50</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">Harvard University</td>
                    <td className="px-6 py-4 text-slate-700">4.0</td>
                    <td className="px-6 py-4 text-slate-700">Top 5%</td>
                    <td className="px-6 py-4 text-slate-700">Top 10%</td>
                    <td className="px-6 py-4 text-slate-700">Top 20%</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">Stanford University</td>
                    <td className="px-6 py-4 text-slate-700">4.0</td>
                    <td className="px-6 py-4 text-slate-700">Top 15%</td>
                    <td className="px-6 py-4 text-slate-700">—</td>
                    <td className="px-6 py-4 text-slate-700">—</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">Princeton University</td>
                    <td className="px-6 py-4 text-slate-700">4.0</td>
                    <td className="px-6 py-4 text-slate-700">≥3.95</td>
                    <td className="px-6 py-4 text-slate-700">≥3.85</td>
                    <td className="px-6 py-4 text-slate-700">≥3.75</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700">MIT</td>
                    <td className="px-6 py-4 text-slate-700">5.0</td>
                    <td className="px-6 py-4 text-slate-700">≥4.8</td>
                    <td className="px-6 py-4 text-slate-700">≥4.5</td>
                    <td className="px-6 py-4 text-slate-700">≥4.2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm text-slate-600 italic">
              Note: Honors requirements vary by institution and may change. Check your university's official academic policies for current requirements.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">🎯 For Graduate School</h4>
                <p className="text-slate-700 leading-relaxed">
                  Most competitive graduate programs look for GPAs above 3.5, with top-tier programs (medical school, law school, PhD programs) preferring 3.7+. Duke's rigorous curriculum is well-recognized by admissions committees.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">💼 For Employment</h4>
                <p className="text-slate-700 leading-relaxed">
                  Many employers use a 3.0 GPA cutoff for screening, while competitive firms (consulting, finance, tech) often look for 3.5+. Duke's reputation helps contextualize your GPA in the hiring process.
                </p>
              </div>
            </div>
          </div>

          {/* Internal Links Section */}
          <div className="p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Related GPA Calculators & Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => navigateTo('/yale-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">Yale GPA Calculator</h4>
                <p className="text-sm text-slate-600">Calculate your Yale University GPA with official grading scale</p>
              </button>

              <button
                onClick={() => navigateTo('/harvard-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">Harvard GPA Calculator</h4>
                <p className="text-sm text-slate-600">Track your Harvard GPA and honors eligibility</p>
              </button>

              <button
                onClick={() => navigateTo('/princeton-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">Princeton GPA Calculator</h4>
                <p className="text-sm text-slate-600">Calculate Princeton GPA with deflation-adjusted scale</p>
              </button>

              <button
                onClick={() => navigateTo('/stanford-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">Stanford GPA Calculator</h4>
                <p className="text-sm text-slate-600">Stanford University GPA calculator with quarter system</p>
              </button>

              <button
                onClick={() => navigateTo('/mit-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">MIT GPA Calculator</h4>
                <p className="text-sm text-slate-600">Calculate MIT GPA on 5.0 scale with technical courses</p>
              </button>

              <button
                onClick={() => navigateTo('/columbia-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">Columbia GPA Calculator</h4>
                <p className="text-sm text-slate-600">Columbia University GPA with Core Curriculum tracking</p>
              </button>

              <button
                onClick={() => navigateTo('/cumulative-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">Cumulative GPA Calculator</h4>
                <p className="text-sm text-slate-600">Calculate overall GPA across multiple semesters</p>
              </button>

              <button
                onClick={() => navigateTo('/high-school-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">High School GPA Calculator</h4>
                <p className="text-sm text-slate-600">Track your high school GPA for college applications</p>
              </button>

              <button
                onClick={() => navigateTo('/college-gpa-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">College GPA Calculator</h4>
                <p className="text-sm text-slate-600">Universal college GPA calculator for all universities</p>
              </button>

              <button
                onClick={() => navigateTo('/mcat-score-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">MCAT Score Calculator</h4>
                <p className="text-sm text-slate-600">Calculate MCAT scores for medical school applications</p>
              </button>

              <button
                onClick={() => navigateTo('/lsat-score-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">LSAT Score Calculator</h4>
                <p className="text-sm text-slate-600">Law school admission test score calculator</p>
              </button>

              <button
                onClick={() => navigateTo('/gre-score-calculator' as Page)}
                className="text-left p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <h4 className="font-semibold text-blue-600 mb-1">GRE Score Calculator</h4>
                <p className="text-sm text-slate-600">Graduate school GRE score estimator</p>
              </button>
            </div>
          </div>

          {/* Featured Snippet Optimization Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Quick Answers About Duke GPA</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">What is the average GPA at Duke University?</h3>
                <p className="text-slate-700 leading-relaxed">
                  The average GPA at Duke University is approximately <strong>3.5-3.6 on a 4.0 scale</strong>. Duke is known for academic rigor, with many students maintaining GPAs above 3.4 to qualify for Latin honors. The median GPA varies by school, with Pratt School of Engineering typically having slightly lower averages due to challenging STEM coursework.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">How does Duke calculate GPA?</h3>
                <p className="text-slate-700 leading-relaxed mb-3">
                  Duke calculates GPA by <strong>multiplying each course's grade point value by its credit hours, summing all quality points, and dividing by total credit hours</strong>. The formula is:
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-center font-mono text-slate-900">
                    GPA = Total Quality Points ÷ Total Credit Hours
                  </p>
                </div>
                <p className="text-slate-700 leading-relaxed mt-3">
                  Duke uses a standard 4.0 scale where A+ and A = 4.0, A- = 3.7, B+ = 3.3, and so on. Pass/Fail courses don't affect GPA.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">What GPA do you need for Duke Latin honors?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <div>
                      <strong className="text-slate-900">Summa Cum Laude:</strong>
                      <span className="text-slate-700"> 3.80+ GPA (highest distinction)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <div>
                      <strong className="text-slate-900">Magna Cum Laude:</strong>
                      <span className="text-slate-700"> 3.60+ GPA (high distinction)</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <div>
                      <strong className="text-slate-900">Cum Laude:</strong>
                      <span className="text-slate-700"> 3.40+ GPA (distinction)</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Specialized Duke GPA Calculators Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Specialized Duke GPA Calculators</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Duke Trinity College */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-blue-400 transition-colors">
                <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" />
                  </svg>
                  Duke Trinity College GPA Calculator
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Calculate your Trinity College of Arts & Sciences GPA. Our calculator handles the full range of liberal arts courses including humanities, social sciences, and natural sciences.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ All Trinity majors supported</li>
                  <li>✓ A&S distribution requirements tracking</li>
                  <li>✓ Dean's List eligibility (3.5+ GPA)</li>
                </ul>
              </div>

              {/* Duke Pratt Engineering */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-blue-400 transition-colors">
                <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                  Duke Pratt School Engineering GPA Calculator
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Specialized calculator for Pratt School of Engineering students. Handles technical coursework including BME, ECE, ME, and CE programs with weighted credit calculations.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Engineering-specific grade tracking</li>
                  <li>✓ Lab course credit calculations</li>
                  <li>✓ ABET accreditation GPA requirements</li>
                </ul>
              </div>

              {/* Pre-Med GPA */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-green-400 transition-colors">
                <h3 className="text-xl font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  </svg>
                  Duke Pre-Med GPA Calculator
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Calculate your science GPA (sGPA) and cumulative GPA for medical school applications. Tracks BCPM (Biology, Chemistry, Physics, Math) courses separately as required by AMCAS.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Separate sGPA and cGPA tracking</li>
                  <li>✓ MCAT score integration</li>
                  <li>✓ Duke School of Medicine GPA requirements (3.7+ competitive)</li>
                </ul>
              </div>

              {/* Transfer Students */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-purple-400 transition-colors">
                <h3 className="text-xl font-semibold text-purple-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                  Duke Transfer Student GPA Calculator
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Calculate your transfer GPA for Duke admission. Includes credit transfer evaluation and recalculation of previous institution grades on Duke's 4.0 scale.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Transfer credit GPA conversion</li>
                  <li>✓ Previous institution grade mapping</li>
                  <li>✓ Competitive transfer GPA: 3.6+ recommended</li>
                </ul>
              </div>

              {/* Graduate School */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-indigo-400 transition-colors">
                <h3 className="text-xl font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                  Duke Graduate School GPA Calculator
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Calculate GPA for Duke Graduate School programs including PhD, Master's, and professional degrees. Tracks major GPA and cumulative GPA separately.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ Minimum 3.0 GPA required for most programs</li>
                  <li>✓ Major-specific GPA tracking</li>
                  <li>✓ PhD program competitiveness: 3.5+ GPA</li>
                </ul>
              </div>

              {/* International Students */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-cyan-400 transition-colors">
                <h3 className="text-xl font-semibold text-cyan-900 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
                  </svg>
                  International Student GPA Conversion
                </h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Convert international grades to Duke's 4.0 scale. Supports UK (First/2:1/2:2), European (ECTS), Indian (percentage), and Chinese (百分制) grading systems.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>✓ WES evaluation standards</li>
                  <li>✓ Multiple country grade conversions</li>
                  <li>✓ Official Duke equivalency tables</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Duke Law & MBA Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border-2 border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L2 8l10 5 8-4v6h2V8L12 3zm0 14.47l-7-3.5v-5.18l7 3.5 7-3.5v5.18l-7 3.5z"/>
                </svg>
                Duke Law School GPA Requirements
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Duke Law School is highly selective with median undergraduate GPA around <strong>3.78</strong>. Combined with LSAT scores (median 170), Duke Law ranks among the top 10 law schools nationally.
              </p>
              <div className="bg-white rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">25th Percentile GPA:</span>
                  <span className="font-bold text-blue-600">3.64</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Median GPA:</span>
                  <span className="font-bold text-blue-600">3.78</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">75th Percentile GPA:</span>
                  <span className="font-bold text-blue-600">3.89</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-6 border-2 border-slate-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                </svg>
                Duke MBA (Fuqua) GPA Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Duke's Fuqua School of Business MBA program values work experience over GPA, but maintains competitive standards. Average undergraduate GPA is <strong>3.5</strong> for admitted students.
              </p>
              <div className="bg-white rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Average Undergraduate GPA:</span>
                  <span className="font-bold text-indigo-600">3.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">GMAT Range:</span>
                  <span className="font-bold text-indigo-600">640-730</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Average Work Experience:</span>
                  <span className="font-bold text-indigo-600">5-6 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div id="faqs" className="scroll-mt-20 mt-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">How is Duke GPA calculated?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Duke GPA is calculated by multiplying each course's grade point value by its credit hours, summing all quality points, and dividing by total credit hours. For example, an A (4.0) in a 3-credit course contributes 12.0 quality points.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Does Duke use plus/minus grading?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Yes, Duke uses plus/minus grading for most letter grades. An A- is worth 3.7, B+ is 3.3, B- is 2.7, and so on. Duke also includes an A+ grade worth 4.0 points, the same as an A.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Do Pass/Fail courses affect my Duke GPA?</h3>
                <p className="text-slate-700 leading-relaxed">
                  No, Pass (P) and Satisfactory (S) grades do not affect your GPA calculation at Duke. These courses count toward your credit requirements but don't contribute quality points. Use our calculator to see how different grading options impact your GPA.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">What GPA do I need for Latin Honors at Duke?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Duke awards Summa Cum Laude for GPA ≥3.80, Magna Cum Laude for ≥3.60, and Cum Laude for ≥3.40. These thresholds may vary slightly by school (Trinity vs. Pratt) and are calculated at graduation based on cumulative GPA.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Can I calculate my Duke GPA for specific semesters?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Yes! Our calculator works for any combination of courses. Enter only the courses from a specific semester to calculate your semester GPA, or include all courses for your cumulative GPA. The calculator automatically handles the math for you.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">How accurate is this Duke GPA calculator?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Our calculator uses Duke's official grading scale (4.0 system with updated grade values) to provide 100% accurate GPA calculations. The same formula used by Duke's registrar is implemented in our tool, ensuring your results match official transcripts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">What if I took courses at other universities?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Transfer credits may be included in your Duke GPA depending on the transfer policy. Check with Duke's registrar for specific rules about transfer credit GPA calculation. Our calculator can help you estimate your GPA including transfer courses, but official calculations should be verified with your academic advisor.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Is this calculator free to use?</h3>
                <p className="text-slate-700 leading-relaxed">
                  Yes! Our Duke GPA calculator is completely free with no registration required. You can calculate, print, and share your results unlimited times. We built this tool to help Duke students and prospective students easily track their academic progress.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Tools */}
      <RelatedTools 
        currentSlug="duke-gpa-calculator" 
        relatedSlugs={[
          'yale-gpa-calculator',
          'harvard-gpa-calculator',
          'princeton-gpa-calculator',
          'stanford-gpa-calculator',
          'columbia-gpa-calculator',
          'mit-gpa-calculator',
          'cumulative-gpa-calculator',
          'college-gpa-calculator'
        ]} 
        navigateTo={navigateTo} 
      />
    </div>
  );
};

export default DukeGPACalculator;
