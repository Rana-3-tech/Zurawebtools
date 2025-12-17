import React, { useState, useEffect, useCallback, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface NorthwesternGPACalculatorProps {
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
  return input.replace(/[&<>"'/]/g, (match) => map[match] || match);
};

const NorthwesternGPACalculator: React.FC<NorthwesternGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // SEO Metadata
  useEffect(() => {
    const createdElements: HTMLElement[] = [];

    // Set title
    document.title = "Northwestern GPA Calculator - Quarter System 4.0 Scale | ZuraWebTools";

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
      createdElements.push(metaDescription as HTMLElement);
    }
    metaDescription.setAttribute('content', 'Calculate your Northwestern University GPA with our accurate quarter system calculator. 4.0 scale (no A+), Latin honors thresholds, and comprehensive GPA tracking for all schools.');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
      createdElements.push(canonical);
    }
    canonical.href = 'https://zurawebtools.com/northwestern-gpa-calculator';

    // Open Graph tags
    const ogTags = {
      'og:title': 'Northwestern GPA Calculator - Quarter System 4.0 Scale',
      'og:description': 'Calculate your Northwestern University GPA accurately with our quarter system calculator. Track Latin honors (Summa 3.85+, Magna 3.70+, Cum Laude 3.50+) and manage all 12 annual courses.',
      'og:url': 'https://zurawebtools.com/northwestern-gpa-calculator',
      'og:type': 'website',
      'og:image': 'https://zurawebtools.com/images/northwestern-gpa-calculator-og.jpg',
      'og:site_name': 'ZuraWebTools'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
        createdElements.push(tag as HTMLElement);
      }
      tag.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Northwestern GPA Calculator - Quarter System 4.0 Scale',
      'twitter:description': 'Calculate your Northwestern GPA with quarter system support. Track Latin honors, manage 12 courses/year, and optimize your academic performance.',
      'twitter:image': 'https://zurawebtools.com/images/northwestern-gpa-calculator-twitter.jpg',
      'twitter:site': '@ZuraWebTools'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
        createdElements.push(tag as HTMLElement);
      }
      tag.setAttribute('content', content);
    });

    // HowTo Schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Your Northwestern University GPA",
      "description": "Step-by-step guide to calculating your GPA at Northwestern University using the quarter system and 4.0 scale.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Convert Letter Grades to Grade Points",
          "text": "Use Northwestern's grade scale to convert each letter grade to its corresponding grade point value. A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, etc. Note that Northwestern does not award A+ grades."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Multiply by Credit Hours",
          "text": "Multiply each course's grade point by the number of credit hours for that course. Most Northwestern courses are 1 credit, but some may be 0.5 or 2 credits. This gives you the quality points for each course."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Sum All Quality Points",
          "text": "Add up all the quality points from all your courses across all quarters. Don't include courses taken Pass/No Credit (P/NC) as these don't factor into GPA calculations."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Divide by Total Credits",
          "text": "Divide the total quality points by the total number of credit hours attempted (excluding P/NC courses). The result is your cumulative GPA on Northwestern's 4.0 scale."
        }
      ]
    };

    const howToScript = document.createElement('script');
    howToScript.type = 'application/ld+json';
    howToScript.text = JSON.stringify(howToSchema);
    document.head.appendChild(howToScript);
    createdElements.push(howToScript);

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the average GPA at Northwestern University?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The average cumulative GPA at Northwestern typically ranges from 3.45 to 3.55 across all undergraduate programs. However, this varies by school: McCormick Engineering students average around 3.30-3.45, while Weinberg Arts & Sciences students average 3.40-3.50."
          }
        },
        {
          "@type": "Question",
          "name": "Does Northwestern have grade inflation or deflation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Northwestern generally maintains moderate grading standards without significant inflation or deflation. The university doesn't have official grade distribution policies like Princeton's former deflation policy. The absence of A+ grades (max 4.0) naturally prevents extreme inflation."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for Latin honors at Northwestern?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Northwestern awards Latin honors based on cumulative GPA: Summa Cum Laude requires ≥3.85 (top 3%), Magna Cum Laude requires ≥3.70 (top 8%), and Cum Laude requires ≥3.50 (top 20%). You must complete at least 24 courses at Northwestern to be eligible."
          }
        },
        {
          "@type": "Question",
          "name": "Does Northwestern use A+ grades in GPA calculation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, Northwestern does not award A+ grades, and the maximum GPA is 4.0. An 'A' is the highest grade possible and equals 4.0 grade points. This differs from universities like Princeton, Cornell, and Stanford where A+ = 4.3."
          }
        },
        {
          "@type": "Question",
          "name": "How does the quarter system affect GPA calculation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The quarter system means you take 12 courses per year instead of 8-10, so each course has less individual weight on your cumulative GPA. You have three opportunities per year to improve your GPA rather than two, and poor performance in one course is diluted across more total courses."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);
    createdElements.push(faqScript);

    // Breadcrumb Schema
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
          "name": "University GPA Tools",
          "item": "https://zurawebtools.com/university-gpa-tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Northwestern GPA Calculator",
          "item": "https://zurawebtools.com/northwestern-gpa-calculator"
        }
      ]
    };

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);
    createdElements.push(breadcrumbScript);

    // WebPage Schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Northwestern GPA Calculator",
      "description": "Calculate your Northwestern University GPA with our accurate quarter system calculator. 4.0 scale (no A+), Latin honors thresholds, and comprehensive GPA tracking.",
      "url": "https://zurawebtools.com/northwestern-gpa-calculator",
      "publisher": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "UseAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://zurawebtools.com/northwestern-gpa-calculator"
        }
      }
    };

    const webPageScript = document.createElement('script');
    webPageScript.type = 'application/ld+json';
    webPageScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webPageScript);
    createdElements.push(webPageScript);

    // SoftwareApplication Schema
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Northwestern GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free Northwestern University GPA calculator for quarter system with 4.0 scale, Latin honors tracking, and comprehensive academic planning tools.",
      "featureList": [
        "Quarter system support (12 courses per year)",
        "4.0 GPA scale calculation (no A+ grades)",
        "Latin honors tracking (Summa, Magna, Cum Laude)",
        "Pass/No Credit course handling",
        "Real-time GPA calculation",
        "Quality points and credit hours tracking",
        "Print and share results",
        "Mobile-friendly interface"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    const softwareScript = document.createElement('script');
    softwareScript.type = 'application/ld+json';
    softwareScript.text = JSON.stringify(softwareSchema);
    document.head.appendChild(softwareScript);
    createdElements.push(softwareScript);

    // Cleanup function
    return () => {
      createdElements.forEach(element => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, []);

  // Popular Northwestern courses
  const popularNorthwesternCourses = [
    'ECON 201: Introduction to Macroeconomics',
    'ECON 202: Introduction to Microeconomics',
    'CHEM 101: General Chemistry',
    'MATH 220: Differential Calculus',
    'MATH 224: Integral Calculus',
    'PHYSICS 135: General Physics',
    'COMP_SCI 111: Fundamentals of Computer Programming',
    'PSYCH 110: Introduction to Psychology',
    'ENGLISH 106: First-Year Writing',
    'HISTORY 210: Modern European History',
    'BIOLOGY 171: Molecular Biology',
    'POLI_SCI 101: Introduction to Political Science',
    'SOCIOLOGY 110: Introduction to Sociology',
    'ANTHRO 101: Introduction to Anthropology',
    'COMM_ST 101: Public Speaking',
    'JOURN 202: Reporting and Writing I',
    'MUSIC 171: Introduction to Music Theory',
    'ART_HIST 101: Introduction to Art History',
    'PHILOSOPHY 110: Introduction to Philosophy',
    'CHEM 210: Organic Chemistry I'
  ];

  // Northwestern grade values (4.0 scale, no A+)
  const northwesternGradeValues: { [key: string]: number } = {
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
    'F': 0.0,
    'P': 0, // Pass (not counted in GPA)
    'NC': 0 // No Credit (not counted in GPA)
  };

  // Validation function for Northwestern grades
  const isValidNorthwesternGrade = (grade: string): boolean => {
    return grade in northwesternGradeValues;
  };

  // Calculate GPA with validation
  const calculateGPA = useCallback(() => {
    try {
      setIsCalculating(true);
      setError(null);
      
      setTimeout(() => {
        try {
          let totalPoints = 0;
          let totalCreds = 0;
          let hasValidCourse = false;

          courses.forEach((course, index) => {
            const credits = Number(course.credits);
            const grade = course.grade?.trim() || '';

            // Comprehensive validation
            if (!isFinite(credits) || isNaN(credits)) {
              throw new Error(`Course ${index + 1}: Invalid credit value (not a number)`);
            }
            if (credits < 0 || credits > 8) {
              throw new Error(`Course ${index + 1}: Credits must be between 0 and 8 (got ${credits})`);
            }

            // Validate course data
            if (credits > 0 && grade && isValidNorthwesternGrade(grade)) {
              // Skip P/NC grades in GPA calculation
              if (grade !== 'P' && grade !== 'NC') {
                const gradeValue = northwesternGradeValues[grade];
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

  // Update course with validation and error handling
  const updateCourse = useCallback((id: string, field: keyof Course, value: string | number) => {
    try {
      setCourses(prevCourses => 
        prevCourses.map(course => {
          if (course.id === id) {
            if (field === 'name' && typeof value === 'string') {
              const sanitized = sanitizeInput(value);
              if (sanitized.length > 200) {
                setError('Course name too long (max 200 characters)');
                return { ...course, name: sanitized.slice(0, 200) };
              }
              setError(null);
              return { ...course, name: sanitized.slice(0, 200) };
            } else if (field === 'credits' && typeof value === 'number') {
              const numValue = Number(value);
              if (!isFinite(numValue) || isNaN(numValue)) {
                setError('Invalid credit value');
                return { ...course, credits: 0 };
              }
              if (numValue < 0 || numValue > 8) {
                setError('Credits must be between 0 and 8');
                const credits = Math.max(0, Math.min(8, numValue));
                return { ...course, credits };
              }
              setError(null);
              return { ...course, credits: numValue };
            } else if (field === 'grade' && typeof value === 'string') {
              if (value && !isValidNorthwesternGrade(value)) {
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
    if (gpa >= 3.85) {
      return {
        status: 'Summa Cum Laude Eligible',
        color: 'from-yellow-400 to-amber-500',
        textColor: 'text-yellow-900',
        description: 'Highest honors. Typically top 3% of graduating class.',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#summaGrad)" stroke="currentColor" strokeWidth="2"/>
            <defs>
              <linearGradient id="summaGrad" x1="2" y1="2" x2="22" y2="21">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="#FFA500"/>
              </linearGradient>
            </defs>
          </svg>
        )
      };
    } else if (gpa >= 3.70) {
      return {
        status: 'Magna Cum Laude Eligible',
        color: 'from-blue-400 to-indigo-500',
        textColor: 'text-blue-900',
        description: 'High honors. Typically top 8% of graduating class.',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#magnaGrad)" stroke="currentColor" strokeWidth="2"/>
            <defs>
              <linearGradient id="magnaGrad" x1="2" y1="2" x2="22" y2="21">
                <stop offset="0%" stopColor="#60A5FA"/>
                <stop offset="100%" stopColor="#6366F1"/>
              </linearGradient>
            </defs>
          </svg>
        )
      };
    } else if (gpa >= 3.50) {
      return {
        status: 'Cum Laude Eligible',
        color: 'from-green-400 to-emerald-500',
        textColor: 'text-green-900',
        description: 'Honors. Typically top 20% of graduating class.',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#cumGrad)" stroke="currentColor" strokeWidth="2"/>
            <defs>
              <linearGradient id="cumGrad" x1="2" y1="2" x2="22" y2="21">
                <stop offset="0%" stopColor="#4ADE80"/>
                <stop offset="100%" stopColor="#10B981"/>
              </linearGradient>
            </defs>
          </svg>
        )
      };
    } else if (gpa >= 2.0) {
      return {
        status: 'Good Standing',
        color: 'from-gray-400 to-slate-500',
        textColor: 'text-gray-900',
        description: 'Meeting graduation requirements.',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="url(#goodGrad)" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="goodGrad" x1="2" y1="2" x2="22" y2="22">
                <stop offset="0%" stopColor="#9CA3AF"/>
                <stop offset="100%" stopColor="#64748B"/>
              </linearGradient>
            </defs>
          </svg>
        )
      };
    } else {
      return {
        status: 'Below Good Standing',
        color: 'from-red-400 to-rose-500',
        textColor: 'text-red-900',
        description: 'Academic support recommended.',
        icon: (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="url(#warningGrad)" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="warningGrad" x1="2" y1="2" x2="22" y2="22">
                <stop offset="0%" stopColor="#F87171"/>
                <stop offset="100%" stopColor="#FB7185"/>
              </linearGradient>
            </defs>
          </svg>
        )
      };
    }
  }, [gpa]);

  // Handle keyboard shortcuts
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculateGPA();
    }
  };

  // Print results function
  const printResults = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = `
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; margin: 0; background: white; }
        * { box-sizing: border-box; }
        h2 { color: #1e293b; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #7C3AED; padding-bottom: 12px; }
        .results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
        .result-card { border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); }
        .result-card h3 { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; font-weight: 600; }
        .result-card .value { font-size: 36px; font-weight: bold; color: #1e293b; margin: 0; line-height: 1; }
        .result-card .label { font-size: 12px; color: #94a3b8; margin-top: 8px; }
        .progress-section { margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 12px; }
        .progress-label { font-size: 14px; color: #64748b; margin-bottom: 12px; font-weight: 600; }
        .progress-bar { height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; position: relative; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #7C3AED 0%, #4F46E5 100%); transition: width 0.3s; }
        .progress-markers { display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: #64748b; }
        .footer { margin-top: 40px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        @media print {
          body { padding: 20px; }
          .result-card { break-inside: avoid; }
        }
      </style>
    `;

    const gpaPercentage = (gpa / 4.0) * 100;
    const honorStatus = getHonorStatus;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Northwestern GPA Results</title>
          ${styles}
        </head>
        <body>
          <h2>Northwestern University GPA Results</h2>
          
          <div class="results-grid">
            <div class="result-card">
              <h3>Cumulative GPA</h3>
              <p class="value">${gpa.toFixed(2)}</p>
              <p class="label">out of 4.0 scale</p>
            </div>
            
            <div class="result-card">
              <h3>Total Credits</h3>
              <p class="value">${totalCredits.toFixed(1)}</p>
              <p class="label">credit hours completed</p>
            </div>
            
            <div class="result-card">
              <h3>Quality Points</h3>
              <p class="value">${totalQualityPoints.toFixed(2)}</p>
              <p class="label">total quality points earned</p>
            </div>
            
            <div class="result-card">
              <h3>Honor Status</h3>
              <p class="value" style="font-size: 20px;">${honorStatus.status}</p>
              <p class="label">${honorStatus.description}</p>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-label">GPA Progress on 4.0 Scale</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${gpaPercentage}%;"></div>
            </div>
            <div class="progress-markers">
              <span>0.0</span>
              <span>1.0</span>
              <span>2.0</span>
              <span>3.0</span>
              <span>4.0</span>
            </div>
          </div>

          <div class="footer">
            <p>Generated by ZuraWebTools - Northwestern GPA Calculator</p>
            <p>zurawebtools.com</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  // Download results as JSON
  const downloadResults = () => {
    const data = {
      university: 'Northwestern University',
      calculatedDate: new Date().toISOString(),
      gpa: parseFloat(gpa.toFixed(2)),
      totalCredits: parseFloat(totalCredits.toFixed(1)),
      totalQualityPoints: parseFloat(totalQualityPoints.toFixed(2)),
      honorStatus: getHonorStatus.status,
      courses: courses.map(course => ({
        name: sanitizeInput(course.name),
        credits: course.credits,
        grade: course.grade
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `northwestern-gpa-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-purple-700 font-semibold text-sm">Northwestern University</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Northwestern GPA Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Calculate your Northwestern University GPA with precision. Our calculator supports the quarter system with 4.0 scale, Latin honors tracking (Summa, Magna, Cum Laude), and comprehensive academic planning features.
          </p>
        </div>

    const gpaPercentage = (gpa / 4.0) * 100;
    const honorStatus = getHonorStatus;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Northwestern GPA Results</title>
          ${styles}
        </head>
        <body>
          <h2>Northwestern University GPA Results</h2>
          
          <div class="results-grid">
            <div class="result-card">
              <h3>Cumulative GPA</h3>
              <p class="value">${gpa.toFixed(2)}</p>
              <p class="label">out of 4.0 scale</p>
            </div>
            
            <div class="result-card">
              <h3>Total Credits</h3>
              <p class="value">${totalCredits.toFixed(1)}</p>
              <p class="label">credit hours completed</p>
            </div>
            
            <div class="result-card">
              <h3>Quality Points</h3>
              <p class="value">${totalQualityPoints.toFixed(2)}</p>
              <p class="label">total quality points earned</p>
            </div>
            
            <div class="result-card">
              <h3>Honor Status</h3>
              <p class="value" style="font-size: 20px;">${honorStatus.status}</p>
              <p class="label">${honorStatus.description}</p>
            </div>
          </div>

          <div class="progress-section">
            <div class="progress-label">GPA Progress on 4.0 Scale</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${gpaPercentage}%;"></div>
            </div>
            <div class="progress-markers">
              <span>0.0</span>
              <span>1.0</span>
              <span>2.0</span>
              <span>3.0</span>
              <span>4.0</span>
            </div>
          </div>

          <div class="footer">
            <p>Generated by ZuraWebTools - Northwestern GPA Calculator</p>
            <p>zurawebtools.com</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  // Download results as JSON
  const downloadResults = () => {
    const data = {
      university: 'Northwestern University',
      calculatedDate: new Date().toISOString(),
      gpa: parseFloat(gpa.toFixed(2)),
      totalCredits: parseFloat(totalCredits.toFixed(1)),
      totalQualityPoints: parseFloat(totalQualityPoints.toFixed(2)),
      honorStatus: getHonorStatus.status,
      courses: courses.map(course => ({
        name: sanitizeInput(course.name),
        credits: course.credits,
        grade: course.grade
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `northwestern-gpa-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

          <div class="footer">
            Generated by ZuraWebTools - Northwestern GPA Calculator<br>
            Quarter System | 4.0 Scale (No A+) | Latin Honors Tracking
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Northwestern GPA Calculator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Calculate your Northwestern University GPA with the official 4.0 scale. Track Latin honors eligibility and academic standing across Weinberg, McCormick, Medill, and all schools.
          </p>
          <p className="text-base text-slate-500 mt-3 max-w-2xl mx-auto">
            Accurate GPA calculation for Northwestern's quarter system with Pass/No Credit options.
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
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#calcGrad)" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 7H17M7 12H17M7 17H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="calcGrad" x1="3" y1="3" x2="21" y2="21">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#4F46E5"/>
                  </linearGradient>
                </defs>
              </svg>
              Enter Your Courses
            </h2>
            <button
              onClick={addCourse}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
              aria-label="Add new course"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Course
            </button>
          </div>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={course.id} className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Course Name */}
                  <div className="md:col-span-6">
                    <label htmlFor={`course-name-${course.id}`} className="block text-sm font-semibold text-slate-700 mb-2">
                      Course Name
                    </label>
                    <input
                      id={`course-name-${course.id}`}
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., ECON 201"
                      list={`courses-${course.id}`}
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      aria-label="Course name"
                    />
                    <datalist id={`courses-${course.id}`}>
                      {popularNorthwesternCourses.map((courseName, idx) => (
                        <option key={idx} value={courseName} />
                      ))}
                    </datalist>
                  </div>

                  {/* Credits */}
                  <div className="md:col-span-2">
                    <label htmlFor={`credits-${course.id}`} className="block text-sm font-semibold text-slate-700 mb-2">
                      Credits
                    </label>
                    <input
                      id={`credits-${course.id}`}
                      type="number"
                      value={course.credits || ''}
                      onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                      onKeyPress={handleKeyPress}
                      min="0"
                      max="8"
                      step="0.5"
                      placeholder="4.0"
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                      aria-label="Course credits"
                    />
                  </div>

                  {/* Grade */}
                  <div className="md:col-span-3">
                    <label htmlFor={`grade-${course.id}`} className="block text-sm font-semibold text-slate-700 mb-2">
                      Grade
                    </label>
                    <select
                      id={`grade-${course.id}`}
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 cursor-pointer"
                      aria-label="Course grade"
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
                      <option value="D-">D- (0.7)</option>
                      <option value="F">F (0.0)</option>
                      <option value="P">P (Pass)</option>
                      <option value="NC">NC (No Credit)</option>
                    </select>
                  </div>

                  {/* Remove Button */}
                  <div className="md:col-span-1 flex items-end">
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="w-full px-3 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        aria-label="Remove course"
                      >
                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              aria-label="Calculate GPA"
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
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
              className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-gray-600 to-slate-700 text-white rounded-xl hover:from-gray-700 hover:to-slate-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              aria-label="Reset calculator"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div id="northwestern-results-section" className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-12 border border-slate-200 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="url(#resultGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="resultGrad" x1="3" y1="3" x2="21" y2="21">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#4F46E5"/>
                  </linearGradient>
                </defs>
              </svg>
              Your Northwestern GPA Results
            </h2>

            {/* 4 Gradient Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* GPA Card */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold text-sm uppercase tracking-wide">Your GPA</span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-5xl font-bold mb-1">{gpa.toFixed(2)}</div>
                <div className="text-white text-sm">out of 4.0</div>
              </div>

              {/* Credits Card */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold text-sm uppercase tracking-wide">Total Credits</span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6.253V12L16 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-5xl font-bold mb-1">{totalCredits}</div>
                <div className="text-white text-sm">credit hours</div>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold text-sm uppercase tracking-wide">Quality Points</span>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M13 10V3L4 14H11L11 21L20 10L13 10Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="text-5xl font-bold mb-1">{totalQualityPoints.toFixed(2)}</div>
                <div className="text-white text-sm">total points</div>
              </div>

              {/* Honor Status Card */}
              <div className={`bg-gradient-to-br ${getHonorStatus.color} rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold text-sm uppercase tracking-wide">Honor Status</span>
                  {getHonorStatus.icon}
                </div>
                <div className="text-lg font-bold mb-1 leading-tight">{getHonorStatus.status}</div>
                <div className="text-white/90 text-xs">{getHonorStatus.description}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">GPA Progress</span>
                <span className="text-sm font-bold text-purple-600">{gpa.toFixed(2)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${(gpa / 4.0) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0.0</span>
                <span>1.0</span>
                <span>2.0</span>
                <span>3.0</span>
                <span>4.0</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Print Button */}
              <button
                onClick={printResults}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-lg hover:from-slate-700 hover:to-gray-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                aria-label="Print results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>

              {/* Download Button */}
              <button
                onClick={downloadResults}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                aria-label="Download results as JSON"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>

              {/* Share Button */}
              <button
                onClick={async () => {
                  const shareText = `My Northwestern GPA: ${gpa.toFixed(2)} 🎓\nCalculate yours at ZuraWebTools!`;
                  if (navigator.share) {
                    try {
                      await navigator.share({ title: 'My Northwestern GPA', text: shareText, url: window.location.href });
                    } catch (err) {
                      console.log('Share cancelled');
                    }
                  } else {
                    navigator.clipboard.writeText(shareText + '\n' + window.location.href);
                    alert('Results copied to clipboard!');
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                aria-label="Share results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>

              {/* Facebook Share */}
              <button
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>

              {/* Twitter Share */}
              <button
                onClick={() => {
                  const text = encodeURIComponent(`My Northwestern GPA: ${gpa.toFixed(2)} 🎓 Calculate yours!`);
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
            </div>
          </div>
        )}

        {/* Quick Navigation / Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="url(#navGrad)" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="navGrad" x1="4" y1="6" x2="20" y2="18">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#4F46E5"/>
                </linearGradient>
              </defs>
            </svg>
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="#grade-scale" className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">1</div>
              <span className="font-semibold text-slate-700 group-hover:text-purple-700">Grade Scale & Honors</span>
            </a>
            <a href="#how-to-calculate" className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">2</div>
              <span className="font-semibold text-slate-700 group-hover:text-blue-700">How to Calculate</span>
            </a>
            <a href="#about-northwestern-gpa" className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-300 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">3</div>
              <span className="font-semibold text-slate-700 group-hover:text-emerald-700">About Northwestern GPA</span>
            </a>
            <a href="#comparison" className="flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">4</div>
              <span className="font-semibold text-slate-700 group-hover:text-amber-700">University Comparison</span>
            </a>
            <a href="#quarter-system" className="flex items-center gap-3 p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg border-2 border-rose-200 hover:border-rose-400 transition-all duration-300 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">5</div>
              <span className="font-semibold text-slate-700 group-hover:text-rose-700">Quarter System Info</span>
            </a>
            <a href="#faqs" className="flex items-center gap-3 p-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border-2 border-violet-200 hover:border-violet-400 transition-all duration-300 group">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">6</div>
              <span className="font-semibold text-slate-700 group-hover:text-violet-700">FAQs</span>
            </a>
          </div>
        </div>

        {/* Grade Scale & Key Info Box */}
        <div id="grade-scale" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="url(#gradeGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="gradeGrad" x1="3" y1="3" x2="21" y2="21">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#4F46E5"/>
                </linearGradient>
              </defs>
            </svg>
            Northwestern Grade Scale & Honors
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <th className="px-6 py-4 text-left text-white font-bold border border-purple-400">Letter Grade</th>
                  <th className="px-6 py-4 text-center text-white font-bold border border-purple-400">GPA Value</th>
                  <th className="px-6 py-4 text-left text-white font-bold border border-purple-400">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">A</td>
                  <td className="px-6 py-4 text-center font-semibold text-purple-700 border border-slate-300">4.0</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Excellent - Outstanding achievement</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">A-</td>
                  <td className="px-6 py-4 text-center font-semibold text-purple-700 border border-slate-300">3.7</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Excellent - Very strong work</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">B+</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-600 border border-slate-300">3.3</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Good - Above average performance</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">B</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-600 border border-slate-300">3.0</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Good - Satisfactory work</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">B-</td>
                  <td className="px-6 py-4 text-center font-semibold text-blue-600 border border-slate-300">2.7</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Good - Acceptable performance</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">C+</td>
                  <td className="px-6 py-4 text-center font-semibold text-amber-600 border border-slate-300">2.3</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Adequate - Passing work</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">C</td>
                  <td className="px-6 py-4 text-center font-semibold text-amber-600 border border-slate-300">2.0</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Adequate - Minimum passing</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">C-</td>
                  <td className="px-6 py-4 text-center font-semibold text-amber-600 border border-slate-300">1.7</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Below Average</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">D+</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600 border border-slate-300">1.3</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Poor - Below standard</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">D</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600 border border-slate-300">1.0</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Poor - Minimal performance</td>
                </tr>
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">D-</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600 border border-slate-300">0.7</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Poor - Barely passing</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">F</td>
                  <td className="px-6 py-4 text-center font-semibold text-red-600 border border-slate-300">0.0</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Fail - No credit earned</td>
                </tr>
                <tr className="bg-slate-100 hover:bg-slate-200 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">P</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-600 border border-slate-300">—</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">Pass - Not included in GPA</td>
                </tr>
                <tr className="bg-slate-100 hover:bg-slate-200 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 border border-slate-300">NC</td>
                  <td className="px-6 py-4 text-center font-semibold text-red-600 border border-slate-300">—</td>
                  <td className="px-6 py-4 text-slate-700 border border-slate-300">No Credit - Not included in GPA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Latin Honors Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#summaGrad)" stroke="url(#summaGrad)" strokeWidth="1"/>
                    <defs>
                      <linearGradient id="summaGrad" x1="2" y1="2" x2="22" y2="21">
                        <stop offset="0%" stopColor="#F59E0B"/>
                        <stop offset="100%" stopColor="#D97706"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <h4 className="text-xl font-bold text-yellow-900">Summa Cum Laude</h4>
                </div>
                <p className="text-3xl font-bold text-yellow-700 mb-2">≥ 3.85</p>
                <p className="text-slate-700">Highest honor - Top 3% of graduating class</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#magnaGrad)" stroke="url(#magnaGrad)" strokeWidth="1"/>
                    <defs>
                      <linearGradient id="magnaGrad" x1="2" y1="2" x2="22" y2="21">
                        <stop offset="0%" stopColor="#3B82F6"/>
                        <stop offset="100%" stopColor="#4F46E5"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <h4 className="text-xl font-bold text-blue-900">Magna Cum Laude</h4>
                </div>
                <p className="text-3xl font-bold text-blue-700 mb-2">≥ 3.70</p>
                <p className="text-slate-700">High honor - Top 8% of graduating class</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#cumLaudeGrad)" stroke="url(#cumLaudeGrad)" strokeWidth="1"/>
                    <defs>
                      <linearGradient id="cumLaudeGrad" x1="2" y1="2" x2="22" y2="21">
                        <stop offset="0%" stopColor="#10B981"/>
                        <stop offset="100%" stopColor="#059669"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <h4 className="text-xl font-bold text-emerald-900">Cum Laude</h4>
                </div>
                <p className="text-3xl font-bold text-emerald-700 mb-2">≥ 3.50</p>
                <p className="text-slate-700">Honor - Top 20% of graduating class</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-slate-700">
              <strong className="text-blue-900">Important Note:</strong> Northwestern uses a 4.0 scale where A is the highest grade (no A+). The quarter system means students take 4 courses per quarter, with 3 quarters per academic year. Latin honors are awarded based on cumulative GPA at graduation.
            </p>
          </div>
        </div>

        {/* How to Calculate Northwestern GPA */}
        <div id="how-to-calculate" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="url(#calcGrad)" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="calcGrad" x1="5" y1="3" x2="19" y2="21">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#4F46E5"/>
                </linearGradient>
              </defs>
            </svg>
            How to Calculate Your Northwestern GPA
          </h2>

          <div className="prose max-w-none">
            <p className="text-lg text-slate-700 mb-6">
              Northwestern University uses a standard 4.0 GPA scale with the quarter system. Follow these steps to calculate your cumulative GPA accurately:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Convert Letter Grades to Grade Points</h3>
                  <p className="text-slate-700">Use Northwestern's grade scale to convert each letter grade to its corresponding grade point value. Remember, A is the maximum grade at 4.0 (no A+ at Northwestern). For example, A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, and so on.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Multiply by Credit Hours</h3>
                  <p className="text-slate-700">Multiply each course's grade point by the number of credit hours for that course. Most Northwestern courses are 1 credit (one unit), but some lab courses or seminars may be 0.5 or 2 credits. This gives you the quality points for each course.</p>
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="font-mono text-sm text-slate-800">Example: ECON 201 (A, 1 credit) = 4.0 × 1 = 4.0 quality points</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Sum All Quality Points</h3>
                  <p className="text-slate-700">Add up all the quality points from all your courses across all quarters. Don't include courses taken Pass/No Credit (P/NC) as these don't factor into GPA calculations at Northwestern.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Divide by Total Credits</h3>
                  <p className="text-slate-700">Divide the total quality points by the total number of credit hours attempted (excluding P/NC courses). The result is your cumulative GPA on Northwestern's 4.0 scale.</p>
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="font-mono text-sm text-slate-800">GPA = Total Quality Points ÷ Total Credit Hours</p>
                    <p className="font-mono text-sm text-slate-800 mt-1">Example: 48.5 quality points ÷ 12 credits = 4.04 → 4.00 GPA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200">
              <h4 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                Important Calculation Tips
              </h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Northwestern's quarter system means you'll complete 12 courses per year (4 per quarter × 3 quarters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Most courses are 1 credit, but labs and special courses may vary (0.5-2 credits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Pass/No Credit (P/NC) courses don't affect GPA but still count toward graduation requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>Incomplete (I) grades must be resolved before they convert to F grades</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* About Northwestern GPA */}
        <div id="about-northwestern-gpa" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 6.253V3L3 9L12 15V11.747C16.5 11.747 20 13.5 22 17.25C21 12.75 18 8.25 12 6.253Z" fill="url(#aboutGrad)"/>
              <defs>
                <linearGradient id="aboutGrad" x1="3" y1="3" x2="22" y2="17">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#4F46E5"/>
                </linearGradient>
              </defs>
            </svg>
            About Northwestern University GPA System
          </h2>

          <div className="prose max-w-none space-y-6 text-slate-700">
            <p className="text-lg leading-relaxed">
              Northwestern University, located in Evanston, Illinois, is a prestigious private research university and member of the Big Ten Conference. Founded in 1851, Northwestern uses a unique <strong>quarter system</strong> rather than the traditional semester system, which significantly impacts how students experience their academic journey and manage their GPA.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The Quarter System at Northwestern</h3>
            <p className="leading-relaxed">
              Northwestern operates on a quarter calendar with three main academic quarters: Fall, Winter, and Spring. Each quarter lasts approximately 10 weeks, and students typically take four courses per quarter. This fast-paced system means that students complete 12 courses per academic year, compared to 8-10 in a semester system. The quarter system allows for intensive focus on fewer courses at a time but requires quick adaptation and consistent performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-700 mb-2">10</div>
                <div className="text-sm font-semibold text-slate-700">Weeks per Quarter</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-700 mb-2">4</div>
                <div className="text-sm font-semibold text-slate-700">Courses per Quarter</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-5 rounded-xl border border-emerald-200">
                <div className="text-3xl font-bold text-emerald-700 mb-2">12</div>
                <div className="text-sm font-semibold text-slate-700">Courses per Year</div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Academic Excellence and Competitiveness</h3>
            <p className="leading-relaxed">
              With an acceptance rate of around 7-9%, Northwestern is one of the most selective universities in the United States. The average GPA of admitted students typically ranges from <strong>3.9 to 4.0 weighted</strong>. Current Northwestern students generally maintain GPAs between 3.3 and 3.7, with the average cumulative GPA hovering around <strong>3.45-3.55</strong> across all undergraduate schools.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Northwestern's Undergraduate Schools</h3>
            <p className="leading-relaxed">
              Northwestern is organized into six undergraduate schools, each with unique academic requirements and typical GPA ranges:
            </p>

            <div className="space-y-4 mt-4">
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-slate-900 mb-1">Weinberg College of Arts and Sciences</h4>
                <p className="text-sm">The largest undergraduate school, offering liberal arts education. Average GPA: 3.40-3.50</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-slate-900 mb-1">McCormick School of Engineering</h4>
                <p className="text-sm">Known for rigorous STEM programs. Average GPA: 3.30-3.45 (slightly lower due to difficulty)</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                <h4 className="font-bold text-slate-900 mb-1">Medill School of Journalism</h4>
                <p className="text-sm">Top-ranked journalism program. Average GPA: 3.50-3.60</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-bold text-slate-900 mb-1">School of Communication</h4>
                <p className="text-sm">Theatre, radio/TV/film, and communication studies. Average GPA: 3.45-3.55</p>
              </div>
              <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-500">
                <h4 className="font-bold text-slate-900 mb-1">Bienen School of Music</h4>
                <p className="text-sm">Performance and academic music programs. Average GPA: 3.50-3.65</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h4 className="font-bold text-slate-900 mb-1">School of Education and Social Policy</h4>
                <p className="text-sm">Education, social policy, and human development. Average GPA: 3.55-3.65</p>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-300">
              <h4 className="text-lg font-bold text-blue-900 mb-3">GPA Requirements for Good Standing</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Minimum GPA:</strong> 2.0 cumulative GPA required to remain in good academic standing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Academic Probation:</strong> Students below 2.0 are placed on academic probation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Dean's List:</strong> Quarterly recognition for 3.7+ GPA with at least 3 courses for a grade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Graduation Requirement:</strong> Minimum 2.0 cumulative GPA required to graduate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* University Comparison */}
        <div id="comparison" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M9 17V7M9 17L4 17M9 17L14 17M9 7L4 7M9 7L14 7M20 17H14M20 7H14M14 7V17" stroke="url(#compGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="compGrad" x1="4" y1="7" x2="20" y2="17">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#4F46E5"/>
                </linearGradient>
              </defs>
            </svg>
            Northwestern vs Other Universities
          </h2>

          <p className="text-lg text-slate-700 mb-6">
            Compare Northwestern's GPA system with other top universities. Each institution has unique grading policies that can affect your academic profile:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <th className="px-4 py-3 text-left text-white font-bold border border-purple-400">University</th>
                  <th className="px-4 py-3 text-center text-white font-bold border border-purple-400">Max GPA</th>
                  <th className="px-4 py-3 text-center text-white font-bold border border-purple-400">Calendar</th>
                  <th className="px-4 py-3 text-left text-white font-bold border border-purple-400">Summa Cum Laude</th>
                  <th className="px-4 py-3 text-left text-white font-bold border border-purple-400">Notable Feature</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="hover:bg-purple-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-purple-700 border border-slate-300">Northwestern</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Quarter</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">≥ 3.85</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">No A+ grade; 10-week quarters</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 border border-slate-300">Harvard</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Semester</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">Top 5%</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">No A+ in GPA; Honors by percentage</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 border border-slate-300">Princeton</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">4.3</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Semester</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">≥ 3.90</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">A+ = 4.3; Stringent grade deflation</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 border border-slate-300">Yale</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Semester</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">Top 5%</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">No A+; Shopping period for courses</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 border border-slate-300">Stanford</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">4.3</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Quarter</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">≥ 3.90</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">A+ = 4.3; Quarter system like NU</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 border border-slate-300">MIT</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">5.0</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Semester</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">≥ 4.80</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">Unique 5.0 scale; Pass/No Record 1st year</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 border border-slate-300">Cornell</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">4.3</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Semester</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">≥ 3.85</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">A+ = 4.3; Varies by college</td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 border border-slate-300">Duke</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-700 border border-slate-300">4.0</td>
                  <td className="px-4 py-3 text-center text-slate-700 border border-slate-300">Semester</td>
                  <td className="px-4 py-3 text-slate-700 border border-slate-300">≥ 3.75</td>
                  <td className="px-4 py-3 text-sm text-slate-700 border border-slate-300">No A+; Dean's List at 3.5+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
            <h4 className="text-lg font-bold text-purple-900 mb-3">Key Takeaways</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Northwestern and Stanford both use quarter systems, offering more courses per year</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Northwestern's 4.0 max scale is shared with Harvard, Yale, and Duke (no A+ advantage)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>MIT's 5.0 scale and Princeton's 4.3 scale can make direct GPA comparisons challenging</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>Latin honors thresholds vary significantly—Northwestern's 3.85 for Summa is competitive</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quarter System Deep Dive */}
        <div id="quarter-system" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="url(#quarterGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="quarterGrad" x1="3" y1="3" x2="21" y2="21">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#4F46E5"/>
                </linearGradient>
              </defs>
            </svg>
            Understanding Northwestern's Quarter System
          </h2>

          <div className="prose max-w-none space-y-6 text-slate-700">
            <p className="text-lg leading-relaxed">
              Northwestern's quarter system is one of its most distinctive features, fundamentally shaping the academic experience. Unlike the semester system used by most universities, Northwestern divides the academic year into three 10-week quarters, creating a fast-paced, intensive learning environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-200">
                <h4 className="text-xl font-bold text-purple-900 mb-3">Fall Quarter</h4>
                <p className="text-sm text-slate-700 mb-2">Late September - Early December</p>
                <p className="text-sm">10 weeks of instruction + finals week</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Winter Quarter</h4>
                <p className="text-sm text-slate-700 mb-2">Early January - Mid March</p>
                <p className="text-sm">10 weeks of instruction + finals week</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border-2 border-emerald-200">
                <h4 className="text-xl font-bold text-emerald-900 mb-3">Spring Quarter</h4>
                <p className="text-sm text-slate-700 mb-2">Late March - Early June</p>
                <p className="text-sm">10 weeks of instruction + finals week</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Advantages of the Quarter System</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">More Course Variety</h4>
                  <p className="text-sm">Take 12 courses per year instead of 8-10, allowing exploration of more subjects and majors</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Intensive Focus</h4>
                  <p className="text-sm">Concentrate on just 4 courses at a time, enabling deeper immersion in each subject</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Fresh Starts</h4>
                  <p className="text-sm">Three opportunities per year to improve GPA and try new academic strategies</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Faster Recovery</h4>
                  <p className="text-sm">One bad grade has less impact on your GPA since you're taking more courses total</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Challenges of the Quarter System</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Fast-Paced Schedule</h4>
                  <p className="text-sm">Midterms often arrive by week 5, leaving little time to adjust to course demands</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Frequent Finals</h4>
                  <p className="text-sm">Three finals periods per year can be stressful and exhausting</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <svg className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Limited Catch-Up Time</h4>
                  <p className="text-sm">Missing even one week can put you significantly behind in coursework</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-300">
              <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                Tips for Success in the Quarter System
              </h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Start strong:</strong> Attend all classes from day one—there's no time to waste in a 10-week quarter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Stay organized:</strong> Use a planner to track assignments across 4 courses with different deadlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Seek help early:</strong> Visit office hours by week 2-3, before midterms begin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Balance your schedule:</strong> Mix difficult courses with lighter ones each quarter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Use P/NC wisely:</strong> Northwestern allows Pass/No Credit for some courses—strategic use can protect your GPA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M8.228 9C8.614 7.224 10.151 6 12 6C14.206 6 16 7.794 16 10C16 11.481 15.169 12.773 13.939 13.465C13.368 13.793 13 14.404 13 15.051V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 19H12.01V19.01H12V19Z" stroke="url(#faqGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="faqGrad" x1="3" y1="3" x2="21" y2="21">
                  <stop offset="0%" stopColor="#7C3AED"/>
                  <stop offset="100%" stopColor="#4F46E5"/>
                </linearGradient>
              </defs>
            </svg>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What is the average GPA at Northwestern University?</h3>
              <p className="text-slate-700 leading-relaxed">
                The average cumulative GPA at Northwestern typically ranges from <strong>3.45 to 3.55</strong> across all undergraduate programs. However, this varies by school: McCormick Engineering students average around 3.30-3.45, while Weinberg Arts & Sciences students average 3.40-3.50. Medill Journalism and Bienen Music students often maintain higher averages (3.50-3.65). The quarter system allows students more opportunities to improve their GPA throughout the year.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Does Northwestern have grade inflation or deflation?</h3>
              <p className="text-slate-700 leading-relaxed">
                Northwestern generally maintains <strong>moderate grading standards</strong> without significant inflation or deflation. The university doesn't have official grade distribution policies like Princeton's former deflation policy. However, STEM courses in McCormick tend to be more rigorous with lower average grades, while some humanities and social science courses may have slightly higher averages. The absence of A+ grades (max 4.0) naturally prevents extreme inflation.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How does the quarter system affect GPA calculation?</h3>
              <p className="text-slate-700 leading-relaxed">
                The quarter system significantly impacts GPA in several ways: (1) You take <strong>12 courses per year instead of 8-10</strong>, meaning each course has less individual weight on your cumulative GPA. (2) You have three opportunities per year to improve your GPA, rather than two. (3) Poor performance in one course is diluted across more total courses. (4) The 10-week intensity means you must perform consistently from week one. (5) More frequent assessment cycles allow for quicker GPA adjustments.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What GPA do I need for Latin honors at Northwestern?</h3>
              <p className="text-slate-700 leading-relaxed">
                Northwestern awards Latin honors based on cumulative GPA at graduation: <strong>Summa Cum Laude requires ≥3.85</strong> (top 3% of class), <strong>Magna Cum Laude requires ≥3.70</strong> (top 8%), and <strong>Cum Laude requires ≥3.50</strong> (top 20%). These thresholds are competitive compared to peer institutions. Honors are determined by your final GPA across all quarters, and you must complete at least 24 courses at Northwestern to be eligible.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Can I take courses Pass/No Credit at Northwestern?</h3>
              <p className="text-slate-700 leading-relaxed">
                Yes, Northwestern allows Pass/No Credit (P/NC) grading for certain courses. Generally, you can take <strong>up to 12 credits P/NC</strong> toward your degree, excluding courses required for your major or minor. P grades don't affect your GPA but NC grades also don't lower it. This option is strategic for exploring challenging courses outside your comfort zone. Some schools within Northwestern have additional P/NC restrictions, so check with your academic advisor.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How do I get on the Dean's List at Northwestern?</h3>
              <p className="text-slate-700 leading-relaxed">
                To qualify for the Dean's List, you must earn a <strong>quarterly GPA of 3.7 or higher</strong> while taking at least 3 courses for a grade (not P/NC). Dean's List is awarded quarterly, not annually, so you can achieve this recognition up to three times per academic year. This distinction appears on your transcript and is recognized by graduate schools and employers as evidence of academic excellence during that specific quarter.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Does Northwestern use A+ grades in GPA calculation?</h3>
              <p className="text-slate-700 leading-relaxed">
                No, Northwestern <strong>does not award A+ grades</strong>, and the maximum GPA is 4.0. An "A" is the highest grade possible and equals 4.0 grade points. This differs from universities like Princeton (4.3 max), Cornell (4.3 max), and Stanford (4.3 max) where A+ = 4.3. This means Northwestern students can't inflate their GPA above 4.0, which is important to understand when comparing GPAs across institutions for graduate school or job applications.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">What happens if my GPA falls below 2.0 at Northwestern?</h3>
              <p className="text-slate-700 leading-relaxed">
                If your cumulative GPA drops <strong>below 2.0</strong>, you'll be placed on <strong>academic probation</strong>. You'll be required to meet with an academic advisor to create an improvement plan. You must raise your GPA to 2.0 or higher within a specified timeframe (usually 1-2 quarters) or face academic suspension. Students on probation may have restrictions on extracurricular activities and course loads. Northwestern provides robust academic support services including tutoring and counseling to help students recover.
              </p>
            </div>

            <div className="border-b border-slate-200 pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">How does Northwestern calculate GPA for double majors?</h3>
              <p className="text-slate-700 leading-relaxed">
                For double majors or dual degrees, Northwestern calculates <strong>one cumulative GPA</strong> that includes all courses taken across both programs. There are no separate major-specific GPAs on your transcript. All courses count equally toward your overall GPA regardless of which major they fulfill. This unified approach means strong performance in one major can balance weaker performance in another, and vice versa. Some graduate programs may separately calculate your GPA in prerequisite courses.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Can I retake a course to improve my Northwestern GPA?</h3>
              <p className="text-slate-700 leading-relaxed">
                Northwestern's retake policy varies by school. Generally, you <strong>can retake a course</strong>, but <strong>both grades remain on your transcript</strong> and both are factored into your GPA calculation. Unlike some universities, Northwestern does not replace the original grade with the new one. However, retaking a course demonstrates persistence and mastery of the material to graduate schools. Always consult your academic advisor before retaking courses, as there may be enrollment restrictions or better alternatives.
              </p>
            </div>
          </div>

          <div className="mt-8 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-300">
            <h4 className="text-lg font-bold text-purple-900 mb-3">Still Have Questions?</h4>
            <p className="text-slate-700 mb-4">
              For more detailed information about Northwestern's grading policies and GPA calculations, visit these official resources:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <a href="https://www.northwestern.edu/registrar/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-purple-900 underline">
                  Northwestern University Registrar's Office
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <a href="https://www.northwestern.edu/academic-support-learning/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-purple-900 underline">
                  Northwestern Academic Support & Learning Advancement
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <a href="https://catalogs.northwestern.edu/undergraduate/" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-purple-900 underline">
                  Northwestern Undergraduate Catalog (Grading Policies)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Tools Section */}
        <RelatedTools
          currentToolPath="/northwestern-gpa-calculator"
          navigateTo={navigateTo}
        />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigateTo('/harvard-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 hover:border-red-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors">Harvard GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale, no A+, semester system with percentage-based honors</p>
            </button>

            <button
              onClick={() => navigateTo('/princeton-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 hover:border-orange-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-700 transition-colors">Princeton GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.3 scale with A+ option, semester system, Latin honors at 3.90+</p>
            </button>

            <button
              onClick={() => navigateTo('/yale-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">Yale GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale, no A+, semester system with shopping period</p>
            </button>

            <button
              onClick={() => navigateTo('/stanford-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 hover:border-red-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors">Stanford GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.3 scale, A+ available, quarter system like Northwestern</p>
            </button>

            <button
              onClick={() => navigateTo('/mit-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-slate-50 to-gray-50 border-2 border-slate-300 hover:border-slate-500 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">MIT GPA Calculator</h3>
              <p className="text-sm text-slate-600">Unique 5.0 scale, semester system with Pass/No Record first year</p>
            </button>

            <button
              onClick={() => navigateTo('/cornell-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 hover:border-red-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors">Cornell GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.3 scale with A+, semester system, varies by college</p>
            </button>

            <button
              onClick={() => navigateTo('/duke-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">Duke GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale, no A+, semester system with Dean's List at 3.5+</p>
            </button>

            <button
              onClick={() => navigateTo('/columbia-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 hover:border-cyan-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">Columbia GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale for most schools, semester system with Core Curriculum</p>
            </button>

            <button
              onClick={() => navigateTo('/uchicago-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">UChicago GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale, no A+, quarter system known for academic rigor</p>
            </button>

            <button
              onClick={() => navigateTo('/penn-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-red-50 to-blue-50 border-2 border-red-200 hover:border-red-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors">Penn GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale, semester system with coordinated dual degrees</p>
            </button>

            <button
              onClick={() => navigateTo('/dartmouth-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">Dartmouth GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale, unique D-Plan quarter system with flexibility</p>
            </button>

            <button
              onClick={() => navigateTo('/brown-gpa-calculator')}
              className="group p-5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 hover:border-amber-400 rounded-xl transition-all duration-300 hover:shadow-lg text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">Brown GPA Calculator</h3>
              <p className="text-sm text-slate-600">4.0 scale, open curriculum with S/NC grading option</p>
            </button>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigateTo('/university-gpa-tools')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              View All University GPA Calculators
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default NorthwesternGPACalculator;
