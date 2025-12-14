import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface CornellGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

// Utility function to sanitize user input and prevent XSS
const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  // Remove global flag - not needed for replace with function
  return input.replace(/[&<>"'/]/g, (match) => map[match] || match);
};

const CornellGPACalculator: React.FC<CornellGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // SEO metadata - Optimized for performance and memory management
  useEffect(() => {
    // Track created elements for proper cleanup
    const createdElements: HTMLElement[] = [];
    
    try {
      // Title: 50-60 characters
      document.title = "Cornell GPA Calculator | 4.3 Scale with A+ Grade";

      // Meta description: 150-160 characters
      let metaDescription = document.querySelector('meta[name="description"]');
      const safeDescription = 'Calculate Cornell University GPA with 4.3 scale (A+=4.3). Track Latin honors, semester GPA, and cumulative GPA across all seven colleges.';
      
      if (metaDescription) {
        metaDescription.setAttribute('content', safeDescription);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', safeDescription);
        document.head.appendChild(metaDescription);
        createdElements.push(metaDescription as HTMLElement);
      }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://zurawebtools.com/cornell-gpa-calculator');
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', 'https://zurawebtools.com/cornell-gpa-calculator');
      document.head.appendChild(canonicalLink);
      createdElements.push(canonicalLink as HTMLElement);
    }

    // Open Graph tags - Optimized with batch processing
    const ogTags = {
      'og:title': 'Cornell GPA Calculator | 4.3 Scale with A+ Grade',
      'og:description': 'Calculate Cornell University GPA with 4.3 scale (A+=4.3). Track Latin honors, semester GPA, and cumulative GPA across all seven colleges.',
      'og:url': 'https://zurawebtools.com/cornell-gpa-calculator',
      'og:type': 'website',
      'og:site_name': 'ZuraWebTools',
      'og:locale': 'en_US',
      'og:image': 'https://zurawebtools.com/images/cornell-gpa-calculator-og.jpg',
      'og:image:width': '1200',
      'og:image:height': '630'
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
        createdElements.push(ogTag as HTMLElement);
      }
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Cornell GPA Calculator | 4.3 Scale with A+ Grade',
      'twitter:description': 'Calculate Cornell University GPA with 4.3 scale (A+=4.3). Track Latin honors, semester GPA, and cumulative GPA.',
      'twitter:image': 'https://zurawebtools.com/images/cornell-gpa-calculator-twitter.jpg',
      'twitter:site': '@ZuraWebTools'
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
        createdElements.push(twitterTag as HTMLElement);
      }
    });

    // JSON-LD HowTo Schema
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Calculate Cornell University GPA',
      description: 'Step-by-step guide to calculating your Cornell GPA on the 4.3 scale',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Enter Course Information',
          text: 'List all your Cornell courses including the course name, credit hours, and letter grade received.',
          position: 1
        },
        {
          '@type': 'HowToStep',
          name: 'Convert Grades to Points',
          text: 'Use Cornell\'s 4.3 scale to convert letter grades: A+ = 4.3, A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, and so on.',
          position: 2
        },
        {
          '@type': 'HowToStep',
          name: 'Calculate Quality Points',
          text: 'Multiply each course\'s grade points by its credit hours to get quality points for each course.',
          position: 3
        },
        {
          '@type': 'HowToStep',
          name: 'Divide by Total Credits',
          text: 'Divide your total quality points by total credit hours attempted to get your Cornell cumulative GPA.',
          position: 4
        }
      ]
    };

    // JSON-LD FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the average GPA at Cornell University?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The average GPA at Cornell varies by college but typically ranges from 3.3 to 3.5. Engineering students often have slightly lower averages (3.2-3.4) due to rigorous coursework, while some liberal arts majors may see higher averages (3.4-3.6).'
          }
        },
        {
          '@type': 'Question',
          name: 'Does Cornell use plus/minus grading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Cornell uses a comprehensive plus/minus grading system on a 4.3 scale. The A+ grade is worth 4.3 points, making Cornell one of the few universities where students can achieve GPAs above 4.0.'
          }
        },
        {
          '@type': 'Question',
          name: 'What GPA do I need for Latin honors at Cornell?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cornell Latin honors cutoffs: Summa Cum Laude typically requires 3.5+ GPA (top 5%), Magna Cum Laude requires 3.3+ GPA (top 15%), and Cum Laude requires 3.0+ GPA (top 30%). Exact thresholds vary by graduating class.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do transfer credits count toward Cornell GPA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, transfer credits from other institutions do not factor into your Cornell GPA. Credits transfer and count toward graduation requirements, but only coursework completed at Cornell is included in your Cornell GPA calculation.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I retake courses to improve my Cornell GPA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Cornell allows course retakes. When you retake a course, both grades appear on your transcript, but only the most recent grade counts toward GPA calculation, allowing grade replacement.'
          }
        }
      ]
    };

    // JSON-LD Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://zurawebtools.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Education Tools',
          item: 'https://zurawebtools.com/education-tools'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Cornell GPA Calculator',
          item: 'https://zurawebtools.com/cornell-gpa-calculator'
        }
      ]
    };

    // JSON-LD WebPage Schema
    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Cornell GPA Calculator',
      description: 'Calculate Cornell University GPA with 4.3 scale (A+=4.3). Track Latin honors, semester GPA, and cumulative GPA across all seven colleges.',
      url: 'https://zurawebtools.com/cornell-gpa-calculator',
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'Cornell GPA Calculator',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        operatingSystem: 'Any'
      }
    };

    // Add JSON-LD schemas to head
    const schemaScript1 = document.createElement('script');
    schemaScript1.type = 'application/ld+json';
    schemaScript1.text = JSON.stringify(howToSchema);
    document.head.appendChild(schemaScript1);

    const schemaScript2 = document.createElement('script');
    schemaScript2.type = 'application/ld+json';
    schemaScript2.text = JSON.stringify(faqSchema);
    document.head.appendChild(schemaScript2);

    const schemaScript3 = document.createElement('script');
    schemaScript3.type = 'application/ld+json';
    schemaScript3.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(schemaScript3);

    const schemaScript4 = document.createElement('script');
    schemaScript4.type = 'application/ld+json';
    schemaScript4.text = JSON.stringify(webPageSchema);
    document.head.appendChild(schemaScript4);
    createdElements.push(schemaScript4);

      // Optimized cleanup - Only remove elements we created
      return () => {
        try {
          createdElements.forEach(element => {
            if (element && document.head.contains(element)) {
              document.head.removeChild(element);
            }
          });
          // Clear array to free memory
          createdElements.length = 0;
        } catch (cleanupErr) {
          console.error('SEO cleanup error:', cleanupErr);
        }
      };
    } catch (err) {
      // Clean up any elements created before error occurred
      createdElements.forEach(element => {
        try {
          if (element && document.head.contains(element)) {
            document.head.removeChild(element);
          }
        } catch (cleanupErr) {
          console.error('Error during error cleanup:', cleanupErr);
        }
      });
      setError('Failed to initialize SEO metadata');
      console.error('SEO setup error:', err);
    }
  }, []);

  // Popular Cornell courses for autocomplete
  const popularCornellCourses = [
    'CS 1110 - Introduction to Computing',
    'CS 2110 - Object-Oriented Programming',
    'MATH 1910 - Calculus for Engineers',
    'MATH 1920 - Multivariable Calculus',
    'PHYS 1112 - Physics I: Mechanics',
    'CHEM 2090 - General Chemistry',
    'ECON 1110 - Introductory Microeconomics',
    'ECON 1120 - Introductory Macroeconomics',
    'BIO 1440 - Introduction to Molecular Biology',
    'PSYCH 1101 - Introduction to Psychology',
    'ENGL 2700 - Creative Writing',
    'AEM 1200 - Business Management',
    'HADM 1150 - Introduction to Hospitality',
    'INFO 1200 - Information Ethics and Policy',
    'PAM 2000 - Social Science of Inequality',
    'GOVT 1111 - Introduction to American Politics',
    'ILRLR 1100 - Labor and Employment Law',
    'ARCH 1100 - Introduction to Architecture',
    'MUSIC 1301 - Music Theory I',
    'HIST 1510 - American History',
    'SPAN 1230 - Spanish Language and Culture',
    'MAE 2030 - Dynamics',
    'CEE 3040 - Uncertainty Analysis',
    'ECE 2100 - Introduction to Circuits',
    'BIOMG 3300 - Principles of Biochemistry'
  ];

  // Cornell grade scale (A+ = 4.3)
  const cornellGradeValues: { [key: string]: number } = {
    'A+': 4.3,
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
    'P': 0, // Pass (not counted in GPA)
    'S': 0  // Satisfactory (not counted in GPA)
  };

  // Validation function for Cornell grades
  const isValidCornellGrade = (grade: string): boolean => {
    return grade in cornellGradeValues;
  };

  // Calculate GPA with validation
  const calculateGPA = useCallback(() => {
    try {
      setIsCalculating(true);
      setError(null);
      
      // Simulate calculation delay for better UX
      setTimeout(() => {
        try {
          let totalPoints = 0;
          let totalCreds = 0;
          let hasValidCourse = false;

          courses.forEach((course, index) => {
            // Enhanced type safety and NaN protection
            const credits = Number(course.credits);
            const grade = course.grade?.trim() || '';

            // Comprehensive validation with detailed error messages
            if (!isFinite(credits) || isNaN(credits)) {
              throw new Error(`Course ${index + 1}: Invalid credit value (not a number)`);
            }
            if (credits < 0 || credits > 8) {
              throw new Error(`Course ${index + 1}: Credits must be between 0 and 8 (got ${credits})`);
            }

            // Validate course data
            if (credits > 0 && grade && isValidCornellGrade(grade)) {
              // Skip P/S grades in GPA calculation
              if (grade !== 'P' && grade !== 'S') {
                const gradeValue = cornellGradeValues[grade];
                // Double-check grade value validity
                if (typeof gradeValue !== 'number' || !isFinite(gradeValue) || isNaN(gradeValue)) {
                  throw new Error(`Course ${index + 1}: Invalid grade value for ${grade}`);
                }
                totalPoints += gradeValue * credits;
                totalCreds += credits;
                hasValidCourse = true;
              }
            }
          });

          if (hasValidCourse && totalCreds > 0) {
            const calculatedGPA = totalPoints / totalCreds;
            if (isNaN(calculatedGPA) || !isFinite(calculatedGPA)) {
              throw new Error('Invalid GPA calculation result');
            }
            setGpa(Number(calculatedGPA.toFixed(3)));
            setTotalCredits(totalCreds);
            setTotalQualityPoints(Number(totalPoints.toFixed(2)));
            setShowResults(true);
          } else {
            alert('Please enter at least one valid course with credits and grade.');
            setShowResults(false);
          }

          setIsCalculating(false);
        } catch (err) {
          setIsCalculating(false);
          setError(err instanceof Error ? err.message : 'Calculation error occurred');
          alert('Error calculating GPA. Please check your inputs.');
        }
      }, 800);
    } catch (err) {
      setIsCalculating(false);
      setError('Failed to start GPA calculation');
      console.error('Calculate GPA error:', err);
    }
  }, [courses]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculateGPA();
    }
  };

  // Update course with validation and error handling
  const updateCourse = useCallback((id: string, field: keyof Course, value: string | number) => {
    try {
      setCourses(prevCourses => 
        prevCourses.map(course => {
          if (course.id === id) {
            // Validate and sanitize inputs
            if (field === 'name' && typeof value === 'string') {
              const sanitized = sanitizeInput(value);
              if (sanitized.length > 200) {
                setError('Course name too long (max 200 characters)');
                return { ...course, name: sanitized.slice(0, 200) };
              }
              setError(null);
              return { ...course, name: sanitized.slice(0, 200) };
            } else if (field === 'credits' && typeof value === 'number') {
              // Enhanced NaN protection and bounds checking
              const numValue = Number(value);
              if (!isFinite(numValue) || isNaN(numValue)) {
                setError('Invalid credit value');
                return { ...course, credits: 0 }; // Safe fallback
              }
              if (numValue < 0 || numValue > 8) {
                setError('Credits must be between 0 and 8');
                const credits = Math.max(0, Math.min(8, numValue));
                return { ...course, credits };
              }
              setError(null);
              return { ...course, credits: numValue };
            } else if (field === 'grade' && typeof value === 'string') {
              if (value && !isValidCornellGrade(value)) {
                setError(`Invalid grade: ${value}`);
              } else {
                setError(null);
              }
              return { ...course, grade: value };
            }
          }
          return course;
        })
      );
    } catch (err) {
      setError('Error updating course');
      console.error('Update course error:', err);
    }
  }, []);

  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const resetCalculator = () => {
    try {
      setCourses([{ id: crypto.randomUUID(), name: '', credits: 0, grade: '' }]);
      setGpa(0);
      setTotalCredits(0);
      setTotalQualityPoints(0);
      setShowResults(false);
      setError(null);
    } catch (err) {
      setError('Error resetting calculator');
      console.error('Reset error:', err);
    }
  };

  // Get honor status based on GPA
  const getHonorStatus = useMemo(() => {
    if (gpa >= 3.5) {
      return {
        status: 'Summa Cum Laude Eligible',
        color: 'from-yellow-400 to-amber-500',
        textColor: 'text-yellow-900',
        description: 'Top-tier honors. Typically awarded to top 5% of graduating class.',
        icon: '🏆'
      };
    } else if (gpa >= 3.3) {
      return {
        status: 'Magna Cum Laude Eligible',
        color: 'from-blue-400 to-indigo-500',
        textColor: 'text-blue-900',
        description: 'High honors. Typically awarded to top 15% of graduating class.',
        icon: '🎖️'
      };
    } else if (gpa >= 3.0) {
      return {
        status: 'Cum Laude Eligible',
        color: 'from-green-400 to-emerald-500',
        textColor: 'text-green-900',
        description: 'Academic honors. Typically awarded to top 30% of graduating class.',
        icon: '🎓'
      };
    } else if (gpa >= 2.0) {
      return {
        status: 'Good Standing',
        color: 'from-gray-400 to-slate-500',
        textColor: 'text-gray-900',
        description: 'Meeting minimum academic requirements.',
        icon: '✓'
      };
    } else {
      return {
        status: 'Below Good Standing',
        color: 'from-red-400 to-rose-500',
        textColor: 'text-red-900',
        description: 'GPA below 2.0 may result in academic probation.',
        icon: '⚠️'
      };
    }
  }, [gpa]);

  // Print function with error handling
  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      setError('Print function unavailable');
      console.error('Print error:', err);
    }
  };

  // Copy results to clipboard with error handling
  const handleCopy = async () => {
    try {
      const text = `Cornell GPA: ${gpa.toFixed(2)}\nTotal Credits: ${totalCredits}\nQuality Points: ${totalQualityPoints}\nStatus: ${getHonorStatus.status}`;
      await navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    } catch (err) {
      setError('Failed to copy to clipboard');
      console.error('Copy error:', err);
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = `Cornell GPA: ${gpa.toFixed(2)}\nTotal Credits: ${totalCredits}\nQuality Points: ${totalQualityPoints}\nStatus: ${getHonorStatus.status}`;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert('Results copied to clipboard!');
      } catch (fallbackErr) {
        alert('Copy failed. Please copy manually.');
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Cornell GPA Calculator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Calculate your Cornell University GPA with the official 4.3 scale. Track Latin honors eligibility and academic standing across all seven colleges.
          </p>
          <p className="text-base text-slate-500 mt-3 max-w-2xl mx-auto">
            Accurate GPA calculation for Arts & Sciences, Engineering, Hotel Administration, Agriculture & Life Sciences, Human Ecology, ILR, and Architecture.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg" role="alert">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                aria-label="Close error message"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Calculator Tool Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-12 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              🎓 Enter Your Courses
            </h2>
            <button
              onClick={addCourse}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
              aria-label="Add new course"
            >
              + Add Course
            </button>
          </div>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200"
              >
                <div className="md:col-span-5">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-semibold text-slate-700 mb-2">
                    Course Name
                  </label>
                  <input
                    type="text"
                    id={`course-name-${course.id}`}
                    list={`cornell-courses-${course.id}`}
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., CS 1110"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label={`Course name for course ${index + 1}`}
                    maxLength={200}
                  />
                  <datalist id={`cornell-courses-${course.id}`}>
                    {popularCornellCourses.map((courseName, idx) => (
                      <option key={idx} value={courseName} />
                    ))}
                  </datalist>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-semibold text-slate-700 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    id={`course-credits-${course.id}`}
                    value={course.credits || ''}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    onKeyPress={handleKeyPress}
                    placeholder="3"
                    min="0"
                    max="8"
                    step="0.5"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label={`Credits for course ${index + 1}`}
                  />
                </div>

                <div className="md:col-span-4">
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-semibold text-slate-700 mb-2">
                    Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label={`Grade for course ${index + 1}`}
                  >
                    <option value="">Select Grade</option>
                    <option value="A+">A+ (4.3)</option>
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
                    disabled={courses.length === 1}
                    className="px-4 py-2.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Remove course ${index + 1}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Calculate Cornell GPA"
            >
              {isCalculating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Calculating...
                </span>
              ) : (
                '🎯 Calculate Cornell GPA'
              )}
            </button>

            <button
              onClick={resetCalculator}
              className="flex-1 px-8 py-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all duration-300 font-bold text-lg shadow-md hover:shadow-lg"
              aria-label="Reset calculator"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-12 border border-slate-200 print:shadow-none">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              📊 Your Cornell GPA Results
            </h2>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* GPA Card */}
              <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-sm font-semibold opacity-90 mb-2">Cornell GPA</div>
                <div className="text-4xl font-bold mb-2">{gpa.toFixed(2)}</div>
                <div className="text-xs opacity-80">Out of 4.3 Scale</div>
              </div>

              {/* Total Credits Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-sm font-semibold opacity-90 mb-2">Total Credits</div>
                <div className="text-4xl font-bold mb-2">{totalCredits}</div>
                <div className="text-xs opacity-80">Credit Hours</div>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="text-sm font-semibold opacity-90 mb-2">Quality Points</div>
                <div className="text-4xl font-bold mb-2">{totalQualityPoints}</div>
                <div className="text-xs opacity-80">Grade × Credits</div>
              </div>

              {/* Honor Status Card */}
              <div className={`bg-gradient-to-br ${getHonorStatus.color} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                <div className="text-sm font-semibold opacity-90 mb-2">Academic Status</div>
                <div className="text-2xl font-bold mb-2">{getHonorStatus.icon}</div>
                <div className="text-xs opacity-90 font-semibold">{getHonorStatus.status}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-700">GPA Progress</span>
                <span className="text-sm font-bold text-slate-900">{gpa.toFixed(2)} / 4.30</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-700 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((gpa / 4.3) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">{getHonorStatus.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handlePrint}
                className="flex-1 min-w-[200px] px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                aria-label="Print results"
              >
                🖨️ Print Results
              </button>
              <button
                onClick={handleCopy}
                className="flex-1 min-w-[200px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                aria-label="Copy results"
              >
                📋 Copy Results
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Share Your Results</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/cornell-gpa-calculator')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('I calculated my Cornell GPA!')}&url=${encodeURIComponent('https://zurawebtools.com/cornell-gpa-calculator')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/cornell-gpa-calculator')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this Cornell GPA Calculator: https://zurawebtools.com/cornell-gpa-calculator')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Quick Navigation / Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="#grade-scale" className="flex items-center p-4 rounded-lg hover:bg-red-50 transition-colors group border border-slate-200">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">1</span>
              <span className="text-slate-700 group-hover:text-red-600 transition-colors font-semibold">Grade Scale</span>
            </a>
            <a href="#how-to-calculate" className="flex items-center p-4 rounded-lg hover:bg-red-50 transition-colors group border border-slate-200">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">2</span>
              <span className="text-slate-700 group-hover:text-red-600 transition-colors font-semibold">How to Calculate</span>
            </a>
            <a href="#about-cornell-gpa" className="flex items-center p-4 rounded-lg hover:bg-red-50 transition-colors group border border-slate-200">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">3</span>
              <span className="text-slate-700 group-hover:text-red-600 transition-colors font-semibold">About Cornell GPA</span>
            </a>
            <a href="#comparison" className="flex items-center p-4 rounded-lg hover:bg-red-50 transition-colors group border border-slate-200">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">4</span>
              <span className="text-slate-700 group-hover:text-red-600 transition-colors font-semibold">University Comparison</span>
            </a>
            <a href="#specialized-calculators" className="flex items-center p-4 rounded-lg hover:bg-red-50 transition-colors group border border-slate-200">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">5</span>
              <span className="text-slate-700 group-hover:text-red-600 transition-colors font-semibold">Specialized Tools</span>
            </a>
            <a href="#faqs" className="flex items-center p-4 rounded-lg hover:bg-red-50 transition-colors group border border-slate-200">
              <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">6</span>
              <span className="text-slate-700 group-hover:text-red-600 transition-colors font-semibold">FAQs</span>
            </a>
          </div>
        </div>

        {/* Key Info Box - Grade Scale & Honors */}
        <div id="grade-scale" className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
            📚 Cornell University Grade Scale
          </h2>

          {/* Grade Scale Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <th className="px-6 py-3 text-left font-bold">Letter Grade</th>
                  <th className="px-6 py-3 text-center font-bold">Grade Points</th>
                  <th className="px-6 py-3 text-left font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">A+</td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">4.3</td>
                  <td className="px-6 py-3 text-slate-700">Exceptional Achievement</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">A</td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">4.0</td>
                  <td className="px-6 py-3 text-slate-700">Excellent</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">A-</td>
                  <td className="px-6 py-3 text-center font-bold text-green-600">3.7</td>
                  <td className="px-6 py-3 text-slate-700">Very Good</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">B+</td>
                  <td className="px-6 py-3 text-center font-bold text-blue-600">3.3</td>
                  <td className="px-6 py-3 text-slate-700">Good</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">B</td>
                  <td className="px-6 py-3 text-center font-bold text-blue-600">3.0</td>
                  <td className="px-6 py-3 text-slate-700">Above Average</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">B-</td>
                  <td className="px-6 py-3 text-center font-bold text-blue-500">2.7</td>
                  <td className="px-6 py-3 text-slate-700">Satisfactory</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">C+</td>
                  <td className="px-6 py-3 text-center font-bold text-yellow-600">2.3</td>
                  <td className="px-6 py-3 text-slate-700">Adequate</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">C</td>
                  <td className="px-6 py-3 text-center font-bold text-yellow-600">2.0</td>
                  <td className="px-6 py-3 text-slate-700">Fair</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">C-</td>
                  <td className="px-6 py-3 text-center font-bold text-yellow-500">1.7</td>
                  <td className="px-6 py-3 text-slate-700">Minimum Passing</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">D+</td>
                  <td className="px-6 py-3 text-center font-bold text-orange-600">1.3</td>
                  <td className="px-6 py-3 text-slate-700">Poor</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">D</td>
                  <td className="px-6 py-3 text-center font-bold text-orange-600">1.0</td>
                  <td className="px-6 py-3 text-slate-700">Very Poor</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">D-</td>
                  <td className="px-6 py-3 text-center font-bold text-orange-500">1.0</td>
                  <td className="px-6 py-3 text-slate-700">Barely Passing</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">F</td>
                  <td className="px-6 py-3 text-center font-bold text-red-600">0.0</td>
                  <td className="px-6 py-3 text-slate-700">Failing</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-slate-900">P / S</td>
                  <td className="px-6 py-3 text-center font-bold text-slate-600">—</td>
                  <td className="px-6 py-3 text-slate-700">Pass/Satisfactory (No GPA Impact)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Latin Honors Thresholds */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-300 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3 text-center">🏆</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Summa Cum Laude</h3>
              <p className="text-2xl font-bold text-center text-yellow-700 mb-2">3.5+ GPA</p>
              <p className="text-sm text-slate-700 text-center">Highest honors. Typically awarded to top 5% of graduating class.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3 text-center">🎖️</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Magna Cum Laude</h3>
              <p className="text-2xl font-bold text-center text-blue-700 mb-2">3.3+ GPA</p>
              <p className="text-sm text-slate-700 text-center">High honors. Typically awarded to top 15% of graduating class.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3 text-center">🎓</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Cum Laude</h3>
              <p className="text-2xl font-bold text-center text-green-700 mb-2">3.0+ GPA</p>
              <p className="text-sm text-slate-700 text-center">Academic honors. Typically awarded to top 30% of graduating class.</p>
            </div>
          </div>

          {/* Key Points */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📌 Important Notes</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>A+ is worth 4.3 points</strong> - Cornell is one of few universities that uses this scale</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>Pass/Fail courses</strong> do not impact your GPA calculation</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>Good academic standing</strong> requires a minimum 2.0 cumulative GPA</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>Latin honors cutoffs</strong> vary by college and may change annually</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-2">•</span>
                <span><strong>Transfer credits</strong> typically don't factor into Cornell GPA calculation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Calculate Section */}
        <div id="how-to-calculate" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            🧮 How to Calculate Your Cornell GPA
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Course Information</h3>
                <p className="text-slate-700 leading-relaxed">
                  List all your Cornell courses including the course name, credit hours, and letter grade received. Most Cornell courses are 3-4 credits, though some seminars may be 1-2 credits and labs can vary.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Convert Grades to Points</h3>
                <p className="text-slate-700 leading-relaxed">
                  Use Cornell's 4.3 scale to convert letter grades: A+ = 4.3, A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, and so on. Cornell is one of the few elite universities that includes A+ in their grading system.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Calculate Quality Points</h3>
                <p className="text-slate-700 leading-relaxed">
                  Multiply each course's grade points by its credit hours. For example, an A (4.0) in a 3-credit course equals 12.0 quality points. Sum all quality points across all courses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Divide by Total Credits</h3>
                <p className="text-slate-700 leading-relaxed">
                  Divide your total quality points by total credit hours attempted (excluding Pass/Fail courses). This gives you your Cornell cumulative GPA on the 4.3 scale.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">💡 Pro Tip</h3>
            <p className="text-slate-700 leading-relaxed">
              Cornell calculates both a semester GPA and cumulative GPA. Your semester GPA only includes courses from that term, while your cumulative GPA includes all completed Cornell coursework. Most academic decisions are based on cumulative GPA.
            </p>
          </div>
        </div>

        {/* About Cornell GPA Section */}
        <div id="about-cornell-gpa" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            📖 Understanding Cornell University GPA
          </h2>

          <div className="prose max-w-none">
            <h3 className="text-xl font-bold text-slate-900 mb-4">What is a Good GPA at Cornell?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h4 className="text-lg font-bold text-green-900 mb-2">3.5+ GPA - Exceptional</h4>
                <p className="text-slate-700 text-sm">
                  Summa Cum Laude range. Highly competitive for top graduate programs, prestigious fellowships, and elite consulting/finance positions. Top 5% of class.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="text-lg font-bold text-blue-900 mb-2">3.3-3.49 GPA - Excellent</h4>
                <p className="text-slate-700 text-sm">
                  Magna Cum Laude range. Very competitive for graduate school and professional opportunities. Demonstrates strong academic performance across rigorous Cornell curriculum.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                <h4 className="text-lg font-bold text-yellow-900 mb-2">3.0-3.29 GPA - Very Good</h4>
                <p className="text-slate-700 text-sm">
                  Cum Laude range. Solid academic standing. Eligible for most graduate programs and demonstrates consistent performance in challenging coursework.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg border border-slate-200">
                <h4 className="text-lg font-bold text-slate-900 mb-2">2.0-2.99 GPA - Good Standing</h4>
                <p className="text-slate-700 text-sm">
                  Meets Cornell's minimum academic requirements. Focus on improvement strategies and utilize Cornell's Academic Support resources for enhancement.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">Cornell's 4.3 GPA Scale Explained</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cornell University uses a <strong>4.3 GPA scale</strong>, which is relatively uncommon among universities. The key difference from the standard 4.0 scale is that Cornell awards 4.3 points for an A+ grade, allowing exceptional students to achieve GPAs above 4.0.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              This scale means your Cornell GPA calculation works as follows:
            </p>

            <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-red-600 mb-6">
              <p className="font-mono text-slate-900 mb-2">
                <strong>GPA Formula:</strong>
              </p>
              <p className="font-mono text-slate-700 mb-4">
                GPA = (Total Quality Points) ÷ (Total Credit Hours)
              </p>
              <p className="font-mono text-slate-900 mb-2">
                <strong>Quality Points Formula:</strong>
              </p>
              <p className="font-mono text-slate-700">
                Quality Points = (Grade Point Value) × (Course Credits)
              </p>
            </div>

            <h4 className="text-lg font-bold text-slate-900 mb-3">Example Calculation:</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Example:</strong> If you earn an A+ (4.3) in a 3-credit course and a B+ (3.3) in a 4-credit course:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700">
              <li>Course 1: 4.3 × 3 = 12.9 quality points</li>
              <li>Course 2: 3.3 × 4 = 13.2 quality points</li>
              <li>Total: 26.1 quality points ÷ 7 credits = <strong>3.729 GPA</strong></li>
            </ul>

            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">📚 Cornell Academic Resources</h4>
              <p className="text-slate-700 leading-relaxed mb-4">
                Cornell offers extensive academic support through the <a href="https://lsc.cornell.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Learning Strategies Center</a>, college-specific tutoring, supplemental instruction, and faculty office hours. Taking advantage of these resources can significantly impact your GPA trajectory.
              </p>
              <p className="text-slate-700 leading-relaxed">
                The <a href="https://academicintegrity.cornell.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-semibold">Office of Academic Integrity</a> also provides guidance on maintaining ethical standards while pursuing academic excellence.
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">How Cornell Colleges Differ in Grading</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Cornell's seven undergraduate colleges each have their own grading cultures and academic expectations:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">🏛️</span>
                <div>
                  <strong className="text-slate-900">College of Arts & Sciences:</strong>
                  <span className="text-slate-700"> Most traditional liberal arts grading. Wide range of difficulty across departments. STEM courses generally more challenging than humanities.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">⚙️</span>
                <div>
                  <strong className="text-slate-900">College of Engineering:</strong>
                  <span className="text-slate-700"> Known for rigorous grading standards. Engineering GPAs often 0.2-0.3 points lower than university average due to course difficulty.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">🏨</span>
                <div>
                  <strong className="text-slate-900">School of Hotel Administration:</strong>
                  <span className="text-slate-700"> Balanced mix of practical and theoretical coursework. Average GPAs tend to be slightly higher due to experiential learning components.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">🌾</span>
                <div>
                  <strong className="text-slate-900">College of Agriculture & Life Sciences:</strong>
                  <span className="text-slate-700"> Varies significantly by major. Pre-med biology courses are highly competitive, while some applied sciences have more generous curves.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">👥</span>
                <div>
                  <strong className="text-slate-900">College of Human Ecology:</strong>
                  <span className="text-slate-700"> Focus on human-centered sciences. Generally fair grading with emphasis on research and practical application.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">⚖️</span>
                <div>
                  <strong className="text-slate-900">School of Industrial & Labor Relations:</strong>
                  <span className="text-slate-700"> Professional school with balanced grading. Strong emphasis on writing and analytical skills reflected in assessment.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">🏛️</span>
                <div>
                  <strong className="text-slate-900">College of Architecture, Art, & Planning:</strong>
                  <span className="text-slate-700"> Portfolio-based assessment. Subjective grading in studio courses, though typically fair. Known for intense workload.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        <div id="comparison" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            📊 Cornell vs Other Ivy League GPA Scales
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
                  <th className="px-4 py-3 text-left font-bold">University</th>
                  <th className="px-4 py-3 text-center font-bold">GPA Scale</th>
                  <th className="px-4 py-3 text-center font-bold">A+ Value</th>
                  <th className="px-4 py-3 text-left font-bold">Latin Honors Threshold</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 bg-red-50">
                  <td className="px-4 py-3 font-bold text-slate-900">Cornell University</td>
                  <td className="px-4 py-3 text-center font-bold text-red-700">4.3</td>
                  <td className="px-4 py-3 text-center font-semibold text-green-700">4.3</td>
                  <td className="px-4 py-3 text-slate-700">Summa: 3.5+, Magna: 3.3+, Cum Laude: 3.0+</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">Harvard University</td>
                  <td className="px-4 py-3 text-center font-semibold">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-600">4.0</td>
                  <td className="px-4 py-3 text-slate-700">Top 5% (Summa), Top 15% (Magna), Top 50% (Cum Laude)</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">Yale University</td>
                  <td className="px-4 py-3 text-center font-semibold">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-600">4.0</td>
                  <td className="px-4 py-3 text-slate-700">Top 5% (Summa), Top 15% (Magna), Top 30% (Cum Laude)</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">Princeton University</td>
                  <td className="px-4 py-3 text-center font-semibold">4.3</td>
                  <td className="px-4 py-3 text-center font-semibold text-green-700">4.3</td>
                  <td className="px-4 py-3 text-slate-700">Top 2% (Summa), Top 10% (Magna), Top 25% (Cum Laude)</td>
                </tr>
                <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">Columbia University</td>
                  <td className="px-4 py-3 text-center font-semibold">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-600">4.0</td>
                  <td className="px-4 py-3 text-slate-700">Top 5% (Summa), Top 15% (Magna), Top 25% (Cum Laude)</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900">University of Pennsylvania</td>
                  <td className="px-4 py-3 text-center font-semibold">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-600">4.0</td>
                  <td className="px-4 py-3 text-slate-700">Top 5% (Summa), Top 15% (Magna), Top 30% (Cum Laude)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-slate-700">
              <strong>Note:</strong> Cornell and Princeton are the only Ivy League universities that use the 4.3 scale with A+ = 4.3. This can give Cornell students a slight advantage when applying to programs that consider maximum GPA potential. However, most graduate programs normalize GPAs during evaluation.
            </p>
          </div>
        </div>

        {/* Featured Snippet Section - SEO Optimization */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12 border-2 border-blue-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            💡 Quick Answers for Cornell Students
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What is the average GPA at Cornell?</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                The average Cornell GPA ranges from <strong>3.3 to 3.5</strong>, varying by college:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Engineering:</strong> 3.2-3.4 (rigorous STEM curriculum)</li>
                <li><strong>Arts & Sciences:</strong> 3.3-3.5 (varies by major)</li>
                <li><strong>Hotel Administration:</strong> 3.4-3.6 (experiential learning boost)</li>
                <li><strong>Agriculture & Life Sciences:</strong> 3.2-3.5 (pre-med competitive)</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How does Cornell calculate GPA?</h3>
              <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-red-600">
                <p className="font-mono text-slate-900 mb-2"><strong>Formula:</strong></p>
                <p className="font-mono text-slate-700 mb-3">GPA = (Total Quality Points) ÷ (Total Credit Hours)</p>
                <p className="font-mono text-slate-900 mb-2"><strong>Example:</strong></p>
                <p className="font-mono text-slate-700">A+ (4.3) × 3 credits = 12.9 points</p>
                <p className="font-mono text-slate-700">A (4.0) × 4 credits = 16.0 points</p>
                <p className="font-mono text-slate-700">Total: 28.9 ÷ 7 credits = <strong>4.13 GPA</strong></p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What GPA do you need for Cornell Latin honors?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300">
                  <p className="font-bold text-yellow-900 text-lg mb-1">Summa Cum Laude</p>
                  <p className="text-2xl font-bold text-yellow-700 mb-1">3.5+</p>
                  <p className="text-sm text-slate-600">Top 5% of class</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-300">
                  <p className="font-bold text-blue-900 text-lg mb-1">Magna Cum Laude</p>
                  <p className="text-2xl font-bold text-blue-700 mb-1">3.3+</p>
                  <p className="text-sm text-slate-600">Top 15% of class</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-300">
                  <p className="font-bold text-green-900 text-lg mb-1">Cum Laude</p>
                  <p className="text-2xl font-bold text-green-700 mb-1">3.0+</p>
                  <p className="text-sm text-slate-600">Top 30% of class</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Calculators Section */}
        <div id="specialized-calculators" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            🎯 Specialized Cornell GPA Calculators
          </h2>

          <div className="space-y-8">
            {/* Engineering GPA */}
            <div className="border-l-4 border-red-600 pl-6 py-4 bg-gradient-to-r from-red-50 to-transparent">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                <span className="text-2xl mr-3">⚙️</span>
                Cornell Engineering GPA Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                The <strong>College of Engineering</strong> is known for rigorous grading standards. Engineering GPAs typically run 0.2-0.3 points lower than the university average. This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                <li>Track your engineering coursework separately from liberal arts requirements</li>
                <li>Calculate major GPA for degree conferral (minimum 2.0 required)</li>
                <li>Monitor progress toward <strong>Dean's List</strong> (top 20% each semester)</li>
                <li>Plan course load strategically with typical engineering curves</li>
              </ul>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-slate-700">
                  <strong>Pro Tip:</strong> Many engineering employers and grad schools understand Cornell Engineering's rigor. A 3.3+ Engineering GPA is highly competitive and equivalent to 3.5+ at most institutions.
                </p>
              </div>
            </div>

            {/* Pre-Med GPA */}
            <div className="border-l-4 border-green-600 pl-6 py-4 bg-gradient-to-r from-green-50 to-transparent">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                <span className="text-2xl mr-3">🏥</span>
                Cornell Pre-Med GPA Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Medical school applications require both <strong>cumulative GPA</strong> and <strong>science GPA (sGPA)</strong>. Cornell pre-med students should track:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                <li><strong>BCPM GPA:</strong> Biology, Chemistry, Physics, Math courses only</li>
                <li><strong>Cumulative GPA:</strong> All Cornell coursework included</li>
                <li><strong>Competitive thresholds:</strong> 3.7+ cumulative, 3.6+ sGPA for top med schools</li>
                <li><strong>Grade trends:</strong> Upward trajectory valued in holistic review</li>
              </ul>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-slate-700">
                  <strong>Cornell Advantage:</strong> Cornell's Health Careers Advising provides transcript review and helps contextualize your GPA within Cornell's rigorous pre-med curriculum for medical school applications.
                </p>
              </div>
            </div>

            {/* Transfer Student GPA */}
            <div className="border-l-4 border-purple-600 pl-6 py-4 bg-gradient-to-r from-purple-50 to-transparent">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                <span className="text-2xl mr-3">🔄</span>
                Cornell Transfer Student GPA Calculator
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Transfer students to Cornell start with a <strong>clean GPA slate</strong>. Only Cornell coursework counts toward your Cornell GPA:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                <li><strong>Transfer credits:</strong> Count toward graduation requirements but not GPA</li>
                <li><strong>Fresh start:</strong> Your Cornell GPA begins at 0.00 with first Cornell course</li>
                <li><strong>Latin Honors eligibility:</strong> Must complete minimum 60 credits at Cornell</li>
                <li><strong>Transcript notation:</strong> Both transcripts sent for grad school/jobs</li>
              </ul>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-slate-700">
                  <strong>Strategy:</strong> Many transfer students see GPA improvement at Cornell after adjusting to academic rigor. Focus on building relationships with professors for strong recommendations.
                </p>
              </div>
            </div>

            {/* International Student GPA */}
            <div className="border-l-4 border-orange-600 pl-6 py-4 bg-gradient-to-r from-orange-50 to-transparent">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                <span className="text-2xl mr-3">🌍</span>
                International Student GPA Conversion for Cornell
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                International students applying to Cornell or planning graduate study need to understand GPA conversion:
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 px-3 py-2 text-left">Country/System</th>
                      <th className="border border-slate-300 px-3 py-2 text-left">Scale</th>
                      <th className="border border-slate-300 px-3 py-2 text-left">Cornell 4.3 Equivalent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-3 py-2">UK (First Class)</td>
                      <td className="border border-slate-300 px-3 py-2">70+/100</td>
                      <td className="border border-slate-300 px-3 py-2 font-semibold">3.8-4.3</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-3 py-2">Germany (Sehr Gut)</td>
                      <td className="border border-slate-300 px-3 py-2">1.0-1.5</td>
                      <td className="border border-slate-300 px-3 py-2 font-semibold">3.7-4.3</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-3 py-2">India (First Division)</td>
                      <td className="border border-slate-300 px-3 py-2">60+/100</td>
                      <td className="border border-slate-300 px-3 py-2 font-semibold">3.3-4.0</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 px-3 py-2">China (优秀)</td>
                      <td className="border border-slate-300 px-3 py-2">85+/100</td>
                      <td className="border border-slate-300 px-3 py-2 font-semibold">3.7-4.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-slate-700">
                  <strong>Note:</strong> Cornell's admissions office evaluates international transcripts in context. Use <a href="https://www.wes.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WES (World Education Services)</a> for official evaluations.
                </p>
              </div>
            </div>

            {/* Graduate School GPA */}
            <div className="border-l-4 border-indigo-600 pl-6 py-4 bg-gradient-to-r from-indigo-50 to-transparent">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                <span className="text-2xl mr-3">🎓</span>
                Cornell Graduate School GPA Requirements
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Cornell <strong>Graduate School</strong> maintains strict GPA requirements. Graduate students must track:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                <li><strong>Minimum GPA:</strong> 3.0 cumulative required for good standing</li>
                <li><strong>B- grade policy:</strong> Two grades below B- may trigger academic review</li>
                <li><strong>PhD candidacy:</strong> Most programs expect 3.5+ for advancement</li>
                <li><strong>Master's graduation:</strong> 3.0+ required for degree conferral</li>
              </ul>
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                <p className="text-sm text-slate-700">
                  <strong>Funding Impact:</strong> Teaching and Research Assistantships often require maintaining 3.3+ GPA. Check with your department's Director of Graduate Studies for specific requirements.
                </p>
              </div>
            </div>

            {/* College-Specific GPA */}
            <div className="border-l-4 border-teal-600 pl-6 py-4 bg-gradient-to-r from-teal-50 to-transparent">
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                <span className="text-2xl mr-3">🏛️</span>
                College-Specific GPA Considerations
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Each of Cornell's seven undergraduate colleges has unique GPA considerations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">🏨 Hotel Administration</h4>
                  <p className="text-sm text-slate-700">Balanced curriculum (theory + practice). Average GPA: 3.4-3.5. Dean's List: 3.5+</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">⚖️ ILR School</h4>
                  <p className="text-sm text-slate-700">Writing-intensive. Average GPA: 3.3-3.4. Strong analytical skills rewarded.</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">🌾 CALS (Agriculture)</h4>
                  <p className="text-sm text-slate-700">Varies by major. Pre-vet very competitive. Average: 3.2-3.5 depending on program.</p>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">👥 Human Ecology</h4>
                  <p className="text-sm text-slate-700">Research-focused. Average GPA: 3.3-3.4. Strong performance in methods courses critical.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Improve GPA Section */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12 border-2 border-green-300">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <span className="text-3xl mr-3">📈</span>
            How to Improve Your Cornell GPA
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Utilize Cornell's Learning Strategies Center</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                The <a href="https://lsc.cornell.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Learning Strategies Center (LSC)</a> offers free academic support:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Study skills workshops:</strong> Time management, note-taking, exam preparation</li>
                <li><strong>Individual consultations:</strong> Personalized strategies for challenging courses</li>
                <li><strong>Supplemental instruction:</strong> Peer-led study sessions for difficult classes</li>
                <li><strong>Writing support:</strong> Essay structure, thesis development, citation help</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Strategic Course Selection</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Balance challenging courses with manageable course loads:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>12-15 credits:</strong> Standard full-time load allows focus on each class</li>
                <li><strong>Mix difficulties:</strong> Pair tough STEM courses with liberal arts electives</li>
                <li><strong>Use P/F wisely:</strong> Take exploratory courses pass/fail to protect GPA</li>
                <li><strong>Summer sessions:</strong> Retake failed courses or take difficult courses solo in summer</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Office Hours Are Your Secret Weapon</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Cornell professors are accessible and want students to succeed:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Attend regularly:</strong> Build rapport before you need help desperately</li>
                <li><strong>Prepare questions:</strong> Come with specific problems, not "I don't understand anything"</li>
                <li><strong>Teaching assistants:</strong> Often more available than professors, equally helpful</li>
                <li><strong>Study groups:</strong> Form groups after office hours to reinforce concepts</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">4. Master Time Management</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Cornell's workload demands excellent time management:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>2:1 ratio rule:</strong> Expect 2 hours of work outside class for each credit hour</li>
                <li><strong>Block scheduling:</strong> Dedicate specific times for each course daily</li>
                <li><strong>Eliminate cramming:</strong> Distributed practice beats last-minute studying</li>
                <li><strong>Prioritize deadlines:</strong> Use syllabus to map major assignments at semester start</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-3">5. Course Retake Strategy</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                Cornell's grade replacement policy allows GPA recovery:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Retake low grades:</strong> D's and F's should be retaken when possible</li>
                <li><strong>Latest grade counts:</strong> Most recent attempt replaces old grade in GPA</li>
                <li><strong>Both appear on transcript:</strong> Graduate schools see all attempts</li>
                <li><strong>Strategic timing:</strong> Retake in lighter semester or summer for better focus</li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-400">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📊 GPA Improvement Calculator</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Want to see how many semesters it takes to reach your target GPA? Use our <button onClick={() => navigateTo('/gpa-raise-calculator')} className="text-blue-600 hover:underline font-bold">GPA Raise Calculator</button> to create a personalized improvement plan.
              </p>
              <p className="text-sm text-slate-600">
                Input your current GPA, credits completed, target GPA, and see exactly what grades you need in future courses to reach your goal.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            ❓ Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What is the average GPA at Cornell University?</h3>
              <p className="text-slate-700 leading-relaxed">
                The average GPA at Cornell varies by college but typically ranges from <strong>3.3 to 3.5</strong>. Engineering students often have slightly lower averages (3.2-3.4) due to rigorous coursework, while some liberal arts majors may see higher averages (3.4-3.6). Cornell maintains relatively strict grading standards compared to other Ivy League schools.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Does Cornell use plus/minus grading?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, Cornell uses a comprehensive plus/minus grading system on a <strong>4.3 scale</strong>. The A+ grade is worth 4.3 points, making Cornell one of the few universities where students can achieve GPAs above 4.0. The system includes: A+ (4.3), A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D (1.0), D- (1.0), and F (0.0).
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How are Pass/Fail courses treated in Cornell GPA?</h3>
              <p className="text-slate-700 leading-relaxed">
                Pass/Fail courses at Cornell do <strong>not impact your GPA calculation</strong>. They appear on your transcript as "P" (Pass) or "S" (Satisfactory) but are excluded from quality point calculations. Cornell allows students to take a limited number of courses pass/fail, particularly useful for exploring subjects outside your major without GPA risk.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What GPA do I need for Latin honors at Cornell?</h3>
              <p className="text-slate-700 leading-relaxed">
                Cornell Latin honors cutoffs vary by college and graduating class percentile: <strong>Summa Cum Laude</strong> typically requires 3.5+ GPA (top 5%), <strong>Magna Cum Laude</strong> requires 3.3+ GPA (top 15%), and <strong>Cum Laude</strong> requires 3.0+ GPA (top 30%). Exact thresholds are determined each year based on class performance.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Do transfer credits count toward Cornell GPA?</h3>
              <p className="text-slate-700 leading-relaxed">
                No, transfer credits from other institutions <strong>do not factor into your Cornell GPA</strong>. Credits transfer and count toward graduation requirements, but only coursework completed at Cornell is included in your Cornell GPA calculation. This means transfer students start with a "clean slate" for their Cornell GPA.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Can I retake courses to improve my Cornell GPA?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, Cornell allows course retakes. When you retake a course, <strong>both grades appear on your transcript</strong>, but only the most recent grade counts toward GPA calculation. This policy allows grade replacement, making it possible to improve your GPA through retaking poorly-performed courses.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What is Cornell's academic probation GPA threshold?</h3>
              <p className="text-slate-700 leading-relaxed">
                Cornell places students on academic probation if their <strong>cumulative GPA falls below 2.0</strong> or semester GPA is below 2.0. Students must return to good standing (above 2.0) within a specified timeframe or may face academic suspension or dismissal. Each college has additional support programs for students on probation.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How does Cornell calculate major/departmental GPA?</h3>
              <p className="text-slate-700 leading-relaxed">
                Cornell calculates both <strong>cumulative GPA</strong> (all courses) and <strong>major GPA</strong> (courses in your concentration). Major GPA includes only courses that count toward your major requirements. Many departments require a minimum major GPA (often 2.0-2.5) for graduation, and some honors programs require 3.5+ in major coursework.
              </p>
            </div>
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            🔗 Related GPA Calculators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigateTo('/harvard-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-red-700 transition-colors">Harvard GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate Harvard University GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/yale-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">📘</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">Yale GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate Yale University GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/princeton-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">🐯</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-orange-700 transition-colors">Princeton GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate Princeton GPA with 4.3 scale</p>
            </button>

            <button
              onClick={() => navigateTo('/columbia-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">🗽</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors">Columbia GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate Columbia University GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/upenn-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-red-50 to-blue-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">UPenn GPA Calculator</h3>
              <p className="text-sm text-slate-600">University of Pennsylvania GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/mit-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-gray-50 to-red-50 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">🔬</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-gray-700 transition-colors">MIT GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate MIT GPA with 5.0 scale</p>
            </button>

            <button
              onClick={() => navigateTo('/stanford-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200 hover:border-red-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">🌲</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-red-700 transition-colors">Stanford GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate Stanford University GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/college-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-green-700 transition-colors">College GPA Calculator</h3>
              <p className="text-sm text-slate-600">Universal college GPA calculator</p>
            </button>

            <button
              onClick={() => navigateTo('/high-school-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">High School GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate high school GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/cumulative-gpa-calculator')}
              className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-yellow-700 transition-colors">Cumulative GPA Calculator</h3>
              <p className="text-sm text-slate-600">Calculate overall cumulative GPA</p>
            </button>

            <button
              onClick={() => navigateTo('/gpa-raise-calculator')}
              className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200 hover:border-teal-400 transition-all duration-300 text-left hover:shadow-lg group"
            >
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">GPA Raise Calculator</h3>
              <p className="text-sm text-slate-600">Calculate how to raise your GPA</p>
            </button>
          </div>
        </div>

      </div>

      {/* Related Tools */}
      <RelatedTools 
        relatedSlugs={[
          'harvard-gpa-calculator',
          'yale-gpa-calculator', 
          'princeton-gpa-calculator',
          'duke-gpa-calculator',
          'columbia-gpa-calculator',
          'upenn-gpa-calculator',
          'college-gpa-calculator',
          'cumulative-gpa-calculator'
        ]}
        currentSlug="cornell-gpa-calculator"
        navigateTo={navigateTo}
      />
    </div>
  );
};

export default CornellGPACalculator;
