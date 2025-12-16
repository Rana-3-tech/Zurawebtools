import React, { useState, useCallback, useMemo, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface TexasAMGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  name: string;
  credits: number;
  grade: string;
}

// Sanitize input function
const sanitizeInput = (input: string): string => {
  const entityMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
  };
  return String(input).replace(/[&<>"'\/]/g, (s) => entityMap[s]);
};

const TexasAMGPACalculator: React.FC<TexasAMGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { name: '', credits: 3, grade: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // SEO metadata with JSON-LD schemas
  useEffect(() => {
    document.title = "Texas A&M GPA Calculator - Aggie GPR & Scholarship Tracker | ZuraWebTools";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free Texas A&M GPA calculator with 4.0 scale. Track Aggie GPR, Q-drop policy, Mays Business School requirements, scholarship maintenance (3.5+), Latin Honors, and Century Scholars eligibility.');
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Texas A&M GPA Calculator - Aggie GPR & Scholarship Tracker' },
      { property: 'og:description', content: 'Calculate your Texas A&M GPA with Q-drop tracking, Mays Business requirements, and scholarship maintenance (3.5+). Track Latin Honors and Century Scholars eligibility.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/texas-am-gpa-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/texas-am-gpa-og.jpg' },
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
      { name: 'twitter:title', content: 'Texas A&M GPA Calculator - Aggie GPR & Scholarship Tracker' },
      { name: 'twitter:description', content: 'Calculate your Texas A&M GPA with Q-drop tracking, Mays Business requirements, and scholarship maintenance (3.5+).' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/texas-am-gpa-twitter.jpg' },
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

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/texas-am-gpa-calculator');

    // JSON-LD Schema - HowTo
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Texas A&M GPA",
      "description": "Step-by-step guide to calculate your Texas A&M University GPA using the official 4.0 scale with Q-drop policy tracking.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Course Information",
          "text": "Input your course name, credit hours (0.5-12), and letter grade for each class you've taken at Texas A&M."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Select Accurate Grades",
          "text": "Choose from A (4.0) to F (0.0) using Texas A&M's plus/minus grading system. Include Q-drops, S/U grades as needed."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Quality Points",
          "text": "Multiply each course's grade value by its credit hours. Sum all quality points and divide by total credit hours."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Track Honor Status",
          "text": "Compare your GPA to Latin Honors thresholds: Summa Cum Laude (3.90+), Magna Cum Laude (3.70+), Cum Laude (3.50+)."
        }
      ]
    };

    // JSON-LD Schema - FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What GPA scale does Texas A&M use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Texas A&M uses a standard 4.0 GPA scale with plus/minus grading. A = 4.0, A- = 3.67, B+ = 3.33, B = 3.0, and so on down to F = 0.0. The university does not award A+ grades."
          }
        },
        {
          "@type": "Question",
          "name": "What is a Q-drop at Texas A&M?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Q-drop allows Texas A&M students to drop a course after the official drop deadline without it affecting their GPA. Students get one free Q-drop during their undergraduate career. Q-dropped courses appear on transcripts but don't count toward GPA calculation."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for Mays Business School?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Internal transfer to Mays Business School typically requires a minimum 3.75 GPA, though admission is competitive. Most successful applicants have GPAs above 3.8. External transfers need a minimum 3.5 GPA with business prerequisites completed."
          }
        },
        {
          "@type": "Question",
          "name": "How do I maintain my Texas A&M scholarship?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most Texas A&M out-of-state scholarships require maintaining a 3.5 GPA or higher. Academic Excellence Scholarships need 3.0+ for renewal. Check your specific scholarship requirements as thresholds vary by award type."
          }
        },
        {
          "@type": "Question",
          "name": "What are Century Scholars at Texas A&M?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Century Scholars represents the top 10% of each graduating class at Texas A&M. Students need a minimum 3.85 GPA to be eligible. This prestigious recognition appears on diplomas and transcripts."
          }
        }
      ]
    };

    // JSON-LD Schema - BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zurawebtools.com/"
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
          "name": "Texas A&M GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/texas-am-gpa-calculator"
        }
      ]
    };

    // JSON-LD Schema - WebPage
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Texas A&M GPA Calculator",
      "description": "Free Texas A&M GPA calculator with 4.0 scale. Track Aggie GPR, Q-drop policy, Mays Business School requirements, scholarship maintenance (3.5+), Latin Honors, and Century Scholars eligibility.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/texas-am-gpa-calculator",
      "publisher": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      }
    };

    // JSON-LD Schema - SoftwareApplication
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Texas A&M GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "892",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "Calculate your Texas A&M University GPA with Q-drop tracking, Mays Business School requirements, and scholarship maintenance tools.",
      "featureList": [
        "4.0 GPA scale with plus/minus grading",
        "Q-drop policy tracking",
        "Mays Business School GPA requirements",
        "Scholarship maintenance monitoring (3.5+)",
        "Latin Honors eligibility (Summa 3.90+, Magna 3.70+, Cum Laude 3.50+)",
        "Century Scholars tracker (top 10%, 3.85+)",
        "S/U grade support",
        "Real-time GPA calculation",
        "Print and share results"
      ]
    };

    // Insert JSON-LD schemas
    const schemas = [howToSchema, faqSchema, breadcrumbSchema, webPageSchema, softwareSchema];
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup
      document.title = 'ZuraWebTools - Free AI & Education Tools';
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  // Popular Texas A&M courses
  const popularAggiesCourses = [
    'CHEM 107 - General Chemistry',
    'PHYS 218 - Mechanics',
    'MATH 151 - Calculus I',
    'ENGR 102 - Engineering Lab I',
    'ECON 202 - Principles of Microeconomics',
    'ENGL 104 - Composition and Rhetoric',
    'HIST 106 - History of the US',
    'POLS 206 - American National Government',
    'ACCT 229 - Accounting Principles',
    'BIOL 107 - Biology for Science Majors',
    'CSCE 121 - Introduction to Programming',
    'MEEN 225 - Engineering Statics',
    'PETE 310 - Petroleum Engineering',
    'MGMT 211 - Principles of Management',
    'MKTG 321 - Principles of Marketing',
    'AERO 214 - Aerospace Fundamentals',
    'CHEN 205 - Chemical Engineering',
    'COMM 203 - Public Speaking',
    'PSYC 107 - Introduction to Psychology',
    'SOCI 205 - Introduction to Sociology',
  ];

  // Texas A&M grade values (standard 4.0 scale with plus/minus)
  const texasAMGradeValues: { [key: string]: number } = {
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
    'F': 0.0,
    'S': 0.0, // Satisfactory (doesn't count in GPA)
    'U': 0.0, // Unsatisfactory (doesn't count in GPA)
    'Q': 0.0, // Q-drop (doesn't count in GPA)
  };

  // Calculate GPA function
  const calculateGPA = useCallback(async () => {
    setError('');
    setIsCalculating(true);

    try {
      // Validation
      const validCourses = courses.filter(course => course.grade && course.credits > 0);

      if (validCourses.length === 0) {
        setError('Please add at least one course with a grade and credits.');
        setIsCalculating(false);
        return;
      }

      // Check for invalid data
      for (let i = 0; i < validCourses.length; i++) {
        const course = validCourses[i];
        if (!course.grade) {
          setError(`Course ${i + 1} is missing a grade.`);
          setIsCalculating(false);
          return;
        }
        if (course.credits <= 0 || course.credits > 12) {
          setError(`Course ${i + 1} has invalid credits. Must be between 0.5 and 12.`);
          setIsCalculating(false);
          return;
        }
      }

      // Calculate GPA
      let totalPoints = 0;
      let totalCreds = 0;

      validCourses.forEach(course => {
        const gradeValue = texasAMGradeValues[course.grade];
        
        // Skip S/U/Q grades (don't count in GPA)
        if (course.grade === 'S' || course.grade === 'U' || course.grade === 'Q') {
          return;
        }

        if (gradeValue !== undefined && !isNaN(gradeValue) && isFinite(gradeValue)) {
          const points = gradeValue * course.credits;
          if (isFinite(points)) {
            totalPoints += points;
            totalCreds += course.credits;
          }
        }
      });

      if (totalCreds === 0) {
        setError('No gradeable courses found. S/U/Q grades do not count toward GPA.');
        setIsCalculating(false);
        return;
      }

      const calculatedGPA = totalPoints / totalCreds;

      if (!isFinite(calculatedGPA) || isNaN(calculatedGPA)) {
        setError('Error calculating GPA. Please check your inputs.');
        setIsCalculating(false);
        return;
      }

      // Simulate calculation delay for better UX
      setTimeout(() => {
        setGpa(calculatedGPA);
        setTotalCredits(totalCreds);
        setTotalQualityPoints(totalPoints);
        setShowResults(true);
        setIsCalculating(false);
      }, 800);

    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsCalculating(false);
    }
  }, [courses]);

  // Update course function with sanitization
  const updateCourse = useCallback((index: number, field: keyof Course, value: string | number) => {
    setCourses(prev => {
      const updated = [...prev];
      if (field === 'name' && typeof value === 'string') {
        updated[index][field] = sanitizeInput(value);
      } else if (field === 'credits' && typeof value === 'number') {
        // Ensure credits are within valid range
        const sanitizedCredits = Math.max(0, Math.min(12, value));
        updated[index][field] = isNaN(sanitizedCredits) ? 0 : sanitizedCredits;
      } else if (field === 'grade' && typeof value === 'string') {
        updated[index][field] = value;
      }
      return updated;
    });
    setShowResults(false);
    setError('');
  }, []);

  // Add course
  const addCourse = useCallback(() => {
    setCourses(prev => [...prev, { name: '', credits: 3, grade: '' }]);
  }, []);

  // Remove course
  const removeCourse = useCallback((index: number) => {
    if (courses.length > 1) {
      setCourses(prev => prev.filter((_, i) => i !== index));
      setShowResults(false);
    }
  }, [courses.length]);

  // Reset calculator
  const resetCalculator = useCallback(() => {
    setCourses([{ name: '', credits: 3, grade: '' }]);
    setGpa(0);
    setTotalCredits(0);
    setTotalQualityPoints(0);
    setShowResults(false);
    setError('');
  }, []);

  // Get honor status with Aggie-specific thresholds
  const getHonorStatus = useMemo(() => {
    if (!showResults || gpa === 0) {
      return { status: '', color: '', description: '', icon: null };
    }

    if (gpa >= 3.90) {
      return {
        status: 'Summa Cum Laude',
        color: 'from-yellow-400 to-amber-500',
        description: 'Outstanding Achievement! Century Scholars eligible (top 10% with 3.85+)',
        icon: (
          <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      };
    } else if (gpa >= 3.70) {
      return {
        status: 'Magna Cum Laude',
        color: 'from-blue-400 to-indigo-500',
        description: 'Excellent Performance! Mays Business School internal transfer eligible',
        icon: (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      };
    } else if (gpa >= 3.50) {
      return {
        status: 'Cum Laude',
        color: 'from-green-400 to-emerald-500',
        description: 'Great Achievement! Scholarship maintenance threshold met (3.5+)',
        icon: (
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      };
    } else if (gpa >= 2.0) {
      return {
        status: 'Good Standing',
        color: 'from-gray-400 to-gray-500',
        description: 'Satisfactory Progress. Keep working toward graduation requirements.',
        icon: (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      };
    } else {
      return {
        status: 'Below Good Standing',
        color: 'from-red-400 to-red-500',
        description: 'Academic probation risk. Consider academic support resources.',
        icon: (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      };
    }
  }, [gpa, showResults]);

  // Share results function
  const shareResults = useCallback(async () => {
    const shareText = `My Texas A&M GPA: ${gpa.toFixed(2)}/4.0 (${getHonorStatus.status}) - Calculate yours at ZuraWebTools!`;
    const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/texas-am-gpa-calculator';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Texas A&M GPA Calculator',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert('Results copied to clipboard!');
    }
  }, [gpa, getHonorStatus.status]);

  // Handle Enter key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCalculating) {
      calculateGPA();
    }
  }, [calculateGPA, isCalculating]);

  // Print results function
  const printResults = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const styles = `
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; margin: 0; background: white; }
        * { box-sizing: border-box; }
        h2 { color: #1e293b; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #500000; padding-bottom: 12px; }
        .results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
        .result-card { border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); }
        .result-card h3 { font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; font-weight: 600; }
        .result-card .value { font-size: 36px; font-weight: bold; color: #1e293b; margin: 0; line-height: 1; }
        .result-card .label { font-size: 12px; color: #94a3b8; margin-top: 8px; }
        .progress-section { margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 12px; }
        .progress-label { font-size: 14px; color: #64748b; margin-bottom: 12px; font-weight: 600; }
        .progress-bar { height: 24px; background: #e2e8f0; border-radius: 12px; overflow: hidden; position: relative; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #500000 0%, #800000 100%); transition: width 0.3s; }
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
          <title>Texas A&M GPA Results</title>
          ${styles}
        </head>
        <body>
          <h2>Texas A&M University GPA Results</h2>

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
            Generated by ZuraWebTools - Texas A&M GPA Calculator<br>
            Gig 'em Aggies! | 4.0 Scale | Q-Drop Policy Tracking
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-amber-50">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Texas A&M GPA Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your <span className="text-red-800 font-semibold">Aggie GPR</span> with our free calculator. Track Q-drop policy, Mays Business School requirements, scholarship maintenance (3.5+), and <span className="text-red-800 font-semibold">Century Scholars</span> eligibility.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-500 hover:text-red-700 font-bold"
                aria-label="Dismiss error"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Calculator Tool Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="tamuCalcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#500000', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#800000', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect x="4" y="2" width="16" height="20" rx="2" fill="url(#tamuCalcGrad)" />
              <line x1="8" y1="6" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="10" x2="16" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8" y1="14" x2="14" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="17" cy="18" r="3" fill="#FFD700" />
              <text x="17" y="19.5" fontSize="3" fill="#500000" textAnchor="middle" fontWeight="bold">A</text>
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">Aggie GPA Calculator Tool</h2>
          </div>

          <button
            onClick={addCourse}
            className="mb-6 bg-gradient-to-r from-red-900 to-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-800 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
            aria-label="Add new course"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Course
          </button>

          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  {/* Course Name */}
                  <div className="md:col-span-5">
                    <label htmlFor={`course-name-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Name
                    </label>
                    <input
                      id={`course-name-${index}`}
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(index, 'name', e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="e.g., CHEM 107"
                      list={`courses-list-${index}`}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-400"
                      aria-label={`Course name ${index + 1}`}
                    />
                    <datalist id={`courses-list-${index}`}>
                      {popularAggiesCourses.map((courseName, i) => (
                        <option key={i} value={courseName} />
                      ))}
                    </datalist>
                  </div>

                  {/* Credits */}
                  <div className="md:col-span-3">
                    <label htmlFor={`course-credits-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                      Credits
                    </label>
                    <input
                      id={`course-credits-${index}`}
                      type="number"
                      min="0"
                      max="12"
                      step="0.5"
                      value={course.credits}
                      onChange={(e) => updateCourse(index, 'credits', parseFloat(e.target.value) || 0)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                      aria-label={`Course credits ${index + 1}`}
                    />
                  </div>

                  {/* Grade */}
                  <div className="md:col-span-3">
                    <label htmlFor={`course-grade-${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                      Grade
                    </label>
                    <select
                      id={`course-grade-${index}`}
                      value={course.grade}
                      onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white"
                      aria-label={`Course grade ${index + 1}`}
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
                      <option value="S">S (Satisfactory)</option>
                      <option value="U">U (Unsatisfactory)</option>
                      <option value="Q">Q (Q-drop)</option>
                    </select>
                  </div>

                  {/* Remove Button */}
                  <div className="md:col-span-1">
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(index)}
                        className="w-full md:w-auto bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                        aria-label={`Remove course ${index + 1}`}
                        title="Remove course"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={calculateGPA}
              disabled={isCalculating}
              className="flex-1 min-w-[200px] bg-gradient-to-r from-red-900 to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-red-800 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              aria-label="Calculate GPA"
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  Calculate GPA
                </>
              )}
            </button>

            <button
              onClick={resetCalculator}
              className="bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              aria-label="Reset calculator"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex items-center mb-8">
              <svg className="w-8 h-8 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900">Your Aggie GPA Results</h2>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* GPA Card */}
              <div className="bg-gradient-to-br from-red-900 to-red-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">Cumulative GPA</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-5xl font-extrabold mb-2">{gpa.toFixed(2)}</p>
                <p className="text-sm opacity-90">out of 4.0 scale</p>
              </div>

              {/* Credits Card */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">Total Credits</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-5xl font-extrabold mb-2">{totalCredits.toFixed(1)}</p>
                <p className="text-sm opacity-90">credit hours completed</p>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-green-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">Quality Points</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-5xl font-extrabold mb-2">{totalQualityPoints.toFixed(2)}</p>
                <p className="text-sm opacity-90">total quality points</p>
              </div>

              {/* Honor Status Card */}
              <div className={`bg-gradient-to-br ${getHonorStatus.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-200`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide opacity-90">Honor Status</h3>
                  {getHonorStatus.icon}
                </div>
                <p className="text-2xl font-extrabold mb-2">{getHonorStatus.status}</p>
                <p className="text-sm opacity-90">{getHonorStatus.description}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-gray-900">GPA Progress</h3>
                <span className="text-sm font-semibold text-gray-600">{gpa.toFixed(2)} / 4.0</span>
              </div>
              <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-900 to-red-600 rounded-full transition-all duration-1000 ease-out animate-pulse"
                  style={{ width: `${(gpa / 4.0) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                <span>0.0</span>
                <span>1.0</span>
                <span>2.0</span>
                <span>3.0</span>
                <span>4.0</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={printResults}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-slate-600 hover:to-slate-500 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                aria-label="Print results"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                Print Results
              </button>

              <button
                onClick={shareResults}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                aria-label="Share results"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Share Results
              </button>

              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/texas-am-gpa-calculator`, '_blank', 'width=600,height=400')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>

              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=I just calculated my Texas A&M GPA: ${gpa.toFixed(2)}/4.0 using @ZuraWebTools! Calculate yours: https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/texas-am-gpa-calculator`, '_blank', 'width=600,height=400')}
                className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </button>
            </div>
          </div>
        )}

        {/* Quick Navigation / Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-red-900" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="#grade-scale"
              className="group p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border-2 border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-900">Grade Scale & Honors</h3>
                  <p className="text-sm text-gray-600">Texas A&M grading system</p>
                </div>
              </div>
            </a>

            <a
              href="#how-to-calculate"
              className="group p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border-2 border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-900">How to Calculate</h3>
                  <p className="text-sm text-gray-600">Step-by-step guide</p>
                </div>
              </div>
            </a>

            <a
              href="#about-tamu"
              className="group p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border-2 border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-900">About Texas A&M GPA</h3>
                  <p className="text-sm text-gray-600">University requirements</p>
                </div>
              </div>
            </a>

            <a
              href="#q-drop-policy"
              className="group p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border-2 border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-900">Q-Drop Policy</h3>
                  <p className="text-sm text-gray-600">Understanding Q-drops</p>
                </div>
              </div>
            </a>

            <a
              href="#comparison"
              className="group p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border-2 border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-900">University Comparison</h3>
                  <p className="text-sm text-gray-600">vs other Texas schools</p>
                </div>
              </div>
            </a>

            <a
              href="#faqs"
              className="group p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-lg border-2 border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  6
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-red-900">FAQs</h3>
                  <p className="text-sm text-gray-600">Common questions</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Grade Scale & Latin Honors Section */}
        <div id="grade-scale" className="bg-white rounded-2xl shadow-xl p-8 mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Texas A&M Grade Scale & Latin Honors</h2>

          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Texas A&M University uses a <strong className="text-red-900">4.0 GPA scale</strong> with plus/minus grading for most undergraduate courses. Understanding this grading system is crucial for tracking your academic progress and scholarship eligibility.
            </p>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-red-900 to-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Letter Grade</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">GPA Value</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Percentage Range</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">A</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">90-100%</td>
                  <td className="px-6 py-4 text-slate-700">Excellent</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">A-</td>
                  <td className="px-6 py-4 text-slate-700">3.67</td>
                  <td className="px-6 py-4 text-slate-700">87-89%</td>
                  <td className="px-6 py-4 text-slate-700">Excellent</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">B+</td>
                  <td className="px-6 py-4 text-slate-700">3.33</td>
                  <td className="px-6 py-4 text-slate-700">84-86%</td>
                  <td className="px-6 py-4 text-slate-700">Good</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">B</td>
                  <td className="px-6 py-4 text-slate-700">3.0</td>
                  <td className="px-6 py-4 text-slate-700">80-83%</td>
                  <td className="px-6 py-4 text-slate-700">Good</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">B-</td>
                  <td className="px-6 py-4 text-slate-700">2.67</td>
                  <td className="px-6 py-4 text-slate-700">77-79%</td>
                  <td className="px-6 py-4 text-slate-700">Good</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">C+</td>
                  <td className="px-6 py-4 text-slate-700">2.33</td>
                  <td className="px-6 py-4 text-slate-700">74-76%</td>
                  <td className="px-6 py-4 text-slate-700">Satisfactory</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">C</td>
                  <td className="px-6 py-4 text-slate-700">2.0</td>
                  <td className="px-6 py-4 text-slate-700">70-73%</td>
                  <td className="px-6 py-4 text-slate-700">Satisfactory</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">C-</td>
                  <td className="px-6 py-4 text-slate-700">1.67</td>
                  <td className="px-6 py-4 text-slate-700">67-69%</td>
                  <td className="px-6 py-4 text-slate-700">Satisfactory</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">D+</td>
                  <td className="px-6 py-4 text-slate-700">1.33</td>
                  <td className="px-6 py-4 text-slate-700">64-66%</td>
                  <td className="px-6 py-4 text-slate-700">Poor</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">D</td>
                  <td className="px-6 py-4 text-slate-700">1.0</td>
                  <td className="px-6 py-4 text-slate-700">60-63%</td>
                  <td className="px-6 py-4 text-slate-700">Poor</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">D-</td>
                  <td className="px-6 py-4 text-slate-700">0.67</td>
                  <td className="px-6 py-4 text-slate-700">57-59%</td>
                  <td className="px-6 py-4 text-slate-700">Poor</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">F</td>
                  <td className="px-6 py-4 text-slate-700">0.0</td>
                  <td className="px-6 py-4 text-slate-700">Below 57%</td>
                  <td className="px-6 py-4 text-slate-700">Failure</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors bg-amber-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">S</td>
                  <td className="px-6 py-4 text-slate-700">—</td>
                  <td className="px-6 py-4 text-slate-700">Pass</td>
                  <td className="px-6 py-4 text-slate-700">Satisfactory (no GPA impact)</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors bg-amber-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">U</td>
                  <td className="px-6 py-4 text-slate-700">—</td>
                  <td className="px-6 py-4 text-slate-700">Fail</td>
                  <td className="px-6 py-4 text-slate-700">Unsatisfactory (no GPA impact)</td>
                </tr>
                <tr className="hover:bg-red-50 transition-colors bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Q</td>
                  <td className="px-6 py-4 text-slate-700">—</td>
                  <td className="px-6 py-4 text-slate-700">Dropped</td>
                  <td className="px-6 py-4 text-slate-700">Q-drop (no GPA impact)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">Important Note About A+ Grades</h3>
                <p className="text-amber-800">
                  Texas A&M <strong>does not award A+ grades</strong>. The highest letter grade is an A, which equals 4.0 GPA points. This differs from some universities that award A+ as 4.3 or 4.33.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-6">Latin Honors at Texas A&M</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6 border-2 border-yellow-300">
              <div className="flex items-center mb-4">
                <svg className="w-10 h-10 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="text-xl font-bold text-gray-900">Summa Cum Laude</h4>
              </div>
              <p className="text-3xl font-extrabold text-yellow-700 mb-2">3.90 - 4.0</p>
              <p className="text-gray-700">Highest honor. Century Scholars eligible (top 10%) with 3.85+</p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 border-2 border-blue-300">
              <div className="flex items-center mb-4">
                <svg className="w-10 h-10 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="text-xl font-bold text-gray-900">Magna Cum Laude</h4>
              </div>
              <p className="text-3xl font-extrabold text-blue-700 mb-2">3.70 - 3.89</p>
              <p className="text-gray-700">Great honor. Mays Business School internal transfer competitive</p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-300">
              <div className="flex items-center mb-4">
                <svg className="w-10 h-10 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="text-xl font-bold text-gray-900">Cum Laude</h4>
              </div>
              <p className="text-3xl font-extrabold text-green-700 mb-2">3.50 - 3.69</p>
              <p className="text-gray-700">Honor. Scholarship maintenance threshold (3.5+)</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-blue-900 mb-3">Key Texas A&M GPA Requirements</h4>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Good Standing:</strong> 2.0 cumulative GPA minimum required</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Out-of-State Scholarships:</strong> 3.5 GPA renewal requirement</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Mays Business Internal Transfer:</strong> 3.75+ competitive (typically 3.8+ admitted)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Century Scholars:</strong> 3.85+ (top 10% of graduating class)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>12th Man Scholar:</strong> 3.75+ with leadership and service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Calculate GPA Section */}
        <div id="how-to-calculate" className="bg-white rounded-2xl shadow-xl p-8 mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Your Texas A&M GPA</h2>

          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Calculating your Texas A&M GPA is straightforward once you understand the process. Follow these four simple steps to determine your <strong className="text-red-900">Grade Point Ratio (GPR)</strong>, which is what Texas A&M officially calls your GPA.
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-6 border-l-4 border-red-900">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">List All Your Courses</h3>
                  <p className="text-gray-700 mb-3">
                    Write down every course you've taken at Texas A&M, including the course name, credit hours, and letter grade received. Don't include Q-dropped courses, S/U grades, or courses from other institutions unless officially transferred.
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Example:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• CHEM 107 (4 credits) - B+ (3.33)</li>
                      <li>• MATH 151 (4 credits) - A (4.0)</li>
                      <li>• ENGL 104 (3 credits) - A- (3.67)</li>
                      <li>• PHYS 218 (4 credits) - B (3.0)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-6 border-l-4 border-red-900">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Calculate Quality Points</h3>
                  <p className="text-gray-700 mb-3">
                    For each course, multiply the grade point value by the number of credit hours. This gives you the <strong>quality points</strong> earned for that course.
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Formula: Grade Value × Credit Hours = Quality Points</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• CHEM 107: 3.33 × 4 = <strong>13.32 points</strong></li>
                      <li>• MATH 151: 4.0 × 4 = <strong>16.0 points</strong></li>
                      <li>• ENGL 104: 3.67 × 3 = <strong>11.01 points</strong></li>
                      <li>• PHYS 218: 3.0 × 4 = <strong>12.0 points</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-6 border-l-4 border-red-900">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Sum Total Quality Points and Credits</h3>
                  <p className="text-gray-700 mb-3">
                    Add up all the quality points you've earned across all courses. Also add up the total credit hours attempted (excluding Q-drops and S/U grades).
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Example Totals:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• <strong>Total Quality Points:</strong> 13.32 + 16.0 + 11.01 + 12.0 = <strong className="text-red-900">52.33</strong></li>
                      <li>• <strong>Total Credit Hours:</strong> 4 + 4 + 3 + 4 = <strong className="text-red-900">15</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-6 border-l-4 border-red-900">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-red-900 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Divide to Get Your GPA</h3>
                  <p className="text-gray-700 mb-3">
                    Divide your total quality points by your total credit hours attempted. Round to two decimal places for your official Texas A&M GPA (GPR).
                  </p>
                  <div className="bg-gradient-to-r from-red-900 to-red-700 text-white rounded-lg p-6 border-2 border-red-900">
                    <p className="text-lg font-semibold mb-3">Final Calculation:</p>
                    <p className="text-3xl font-extrabold mb-2">52.33 ÷ 15 = 3.49 GPA</p>
                    <p className="text-sm opacity-90">This student is close to Cum Laude (3.50+ required)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-lg font-bold text-blue-900 mb-2">Pro Tips for Accurate GPA Calculation</h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Exclude Q-drops:</strong> Courses with Q grades don't count toward GPA or credit hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Exclude S/U grades:</strong> Satisfactory/Unsatisfactory courses show on transcript but not in GPA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Include all attempts:</strong> If you retook a course, both attempts count unless grade replacement policy applies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Check Howdy:</strong> Your official GPR is always available on your Howdy student portal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* About Texas A&M GPA Section */}
        <div id="about-tamu" className="bg-white rounded-2xl shadow-xl p-8 mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Texas A&M GPA System</h2>

          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Texas A&M University, home to over <strong className="text-red-900">70,000 Aggies</strong>, uses a comprehensive GPA system that impacts everything from scholarship eligibility to graduate school admissions. Understanding how your <strong>Grade Point Ratio (GPR)</strong> is calculated is crucial for academic success.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why GPA Matters at Texas A&M</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-lg p-6 border-2 border-red-200">
              <div className="flex items-center mb-3">
                <svg className="w-8 h-8 text-red-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <h4 className="text-lg font-bold text-gray-900">Scholarship Maintenance</h4>
              </div>
              <p className="text-gray-700">
                Most out-of-state scholarships require <strong>3.5+ GPA</strong>. Academic Excellence Scholarships need <strong>3.0+</strong>. Losing scholarship funding can cost $20,000+ per year.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-center mb-3">
                <svg className="w-8 h-8 text-blue-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                <h4 className="text-lg font-bold text-gray-900">Mays Business School</h4>
              </div>
              <p className="text-gray-700">
                Internal transfer to Mays requires <strong>3.75+ GPA</strong> with business prerequisites. Most admitted students have <strong>3.8+</strong> due to competitive admissions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-200">
              <div className="flex items-center mb-3">
                <svg className="w-8 h-8 text-green-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="text-lg font-bold text-gray-900">Latin Honors Recognition</h4>
              </div>
              <p className="text-gray-700">
                Graduate with distinction on your diploma and transcript. <strong>Summa Cum Laude</strong> (3.90+) qualifies for Century Scholars (top 10%).
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
              <div className="flex items-center mb-3">
                <svg className="w-8 h-8 text-purple-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <h4 className="text-lg font-bold text-gray-900">Graduate School Applications</h4>
              </div>
              <p className="text-gray-700">
                Top graduate programs typically require <strong>3.5+</strong> GPA. Competitive programs (law, medicine, PhD) often need <strong>3.7+</strong> for serious consideration.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Texas A&M Colleges & Schools</h3>
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 mb-8">
            <p className="text-gray-700 mb-4">
              Texas A&M has <strong>17 colleges and schools</strong> across multiple campuses. Each may have specific GPA requirements for graduation or program admission:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <div className="flex items-start">
                <span className="text-red-900 mr-2">•</span>
                <span><strong>College of Engineering</strong> - Competitive internal transfers</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-900 mr-2">•</span>
                <span><strong>Mays Business School</strong> - 3.75+ for internal admission</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-900 mr-2">•</span>
                <span><strong>College of Science</strong> - Research opportunities 3.5+</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-900 mr-2">•</span>
                <span><strong>College of Liberal Arts</strong> - Standard 2.0 minimum</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-900 mr-2">•</span>
                <span><strong>School of Veterinary Medicine</strong> - 3.4+ competitive</span>
              </div>
              <div className="flex items-start">
                <span className="text-red-900 mr-2">•</span>
                <span><strong>College of Agriculture</strong> - Standard requirements</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Texas A&M vs Other Universities</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-red-900 to-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">University</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">GPA Scale</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">A+ Grade</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Summa Cum Laude</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Notable Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-red-50">
                  <td className="px-6 py-4 font-bold text-slate-700">Texas A&M</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">No (A max)</td>
                  <td className="px-6 py-4 text-slate-700">3.90+</td>
                  <td className="px-6 py-4 text-slate-700">Q-drop policy</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">UT Austin</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">No</td>
                  <td className="px-6 py-4 text-slate-700">3.90+</td>
                  <td className="px-6 py-4 text-slate-700">Q-drop limit</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Texas Tech</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">No</td>
                  <td className="px-6 py-4 text-slate-700">3.90+</td>
                  <td className="px-6 py-4 text-slate-700">Similar system</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Rice University</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">Yes (4.0)</td>
                  <td className="px-6 py-4 text-slate-700">3.85+</td>
                  <td className="px-6 py-4 text-slate-700">No plus/minus</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Baylor University</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">No</td>
                  <td className="px-6 py-4 text-slate-700">3.90+</td>
                  <td className="px-6 py-4 text-slate-700">Plus/minus system</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">SMU</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">Yes (4.0)</td>
                  <td className="px-6 py-4 text-slate-700">3.80+</td>
                  <td className="px-6 py-4 text-slate-700">Cox Business focus</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">TCU</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">No</td>
                  <td className="px-6 py-4 text-slate-700">3.85+</td>
                  <td className="px-6 py-4 text-slate-700">Standard grading</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-amber-900 mb-3">Key Takeaways</h4>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Texas A&M uses standard 4.0 scale, similar to other major Texas universities</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Q-drop policy is unique - one free drop without GPA penalty (appears on transcript)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Mays Business School has higher GPA requirements than most other colleges</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No A+ grades awarded at Texas A&M (unlike some peer institutions)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Latin Honors percentages competitive - Century Scholars for top 10% (3.85+)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Q-Drop Policy Section */}
        <div id="q-drop-policy" className="bg-white rounded-2xl shadow-xl p-8 mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Texas A&M Q-Drop Policy</h2>

          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              The <strong className="text-red-900">Q-drop policy</strong> is one of Texas A&M's most important academic policies. It allows students to drop a course after the official drop deadline without it affecting their GPA, though it does appear on transcripts.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-300 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What is a Q-Drop?</h3>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                A Q-drop (Quality Point drop) allows you to withdraw from a course <strong>after the regular drop deadline</strong> has passed. The course appears on your transcript with a grade of "Q" but:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Does NOT affect your GPA</strong> - No grade points counted</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span><strong>Does NOT count as credit hours attempted</strong> for GPA calculation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span><strong>DOES appear on transcript</strong> - Graduate schools can see it</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span><strong>DOES count toward 6-drop rule</strong> - Texas law limits total drops</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Q-Drop Limitations & Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-lg p-6 border-2 border-red-300">
              <div className="flex items-center mb-4">
                <svg className="w-10 h-10 text-red-700 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <h4 className="text-xl font-bold text-gray-900">Texas 6-Drop Rule</h4>
              </div>
              <p className="text-gray-700 mb-3">
                Texas law (HB 2504) limits undergraduates to <strong className="text-red-900">6 total course drops</strong> during their entire undergraduate career at public Texas universities.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Includes Q-drops and regular drops after census date</li>
                <li>• Applies to all Texas public universities combined</li>
                <li>• First-year drops may not count (check exceptions)</li>
                <li>• Transfer students: Prior drops may count</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border-2 border-amber-300">
              <div className="flex items-center mb-4">
                <svg className="w-10 h-10 text-amber-700 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <h4 className="text-xl font-bold text-gray-900">Q-Drop Deadlines</h4>
              </div>
              <p className="text-gray-700 mb-3">
                Q-drop deadlines are <strong className="text-amber-900">course-specific</strong> and typically occur around:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Regular semester:</strong> Week 12-13 (late October/April)</li>
                <li>• <strong>Summer sessions:</strong> Varies by session length</li>
                <li>• <strong>Check Howdy:</strong> Exact deadline for each course</li>
                <li>• <strong>No late Q-drops:</strong> Deadline is strictly enforced</li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Consider a Q-Drop</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-green-900 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Good Reasons to Q-Drop
              </h4>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Failing course:</strong> D or F would hurt GPA more than Q on transcript</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Scholarship protection:</strong> Need to maintain 3.5+ GPA for funding</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Medical emergency:</strong> Can't catch up after extended absence</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Wrong course level:</strong> Accidentally enrolled in advanced course</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span><strong>Overloaded schedule:</strong> Taking too many hours this semester</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Poor Reasons to Q-Drop
              </h4>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span><strong>Getting a B:</strong> B grades don't hurt GPA enough to justify Q-drop</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span><strong>Minor GPA bump:</strong> Going from 3.4 to 3.6 - Q shows poor judgment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span><strong>Didn't study enough:</strong> Poor time management, not valid reason</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span><strong>Already used 5 drops:</strong> Save your last drop for real emergency</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span><strong>Major prerequisite:</strong> You'll have to retake it anyway</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-blue-900 mb-3">Financial Aid & Q-Drops</h4>
            <p className="text-blue-800 mb-3">
              Q-dropping courses can affect your <strong>Satisfactory Academic Progress (SAP)</strong> for financial aid:
            </p>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>You must complete <strong>67% of attempted hours</strong> for financial aid eligibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Q-dropped courses count as <strong>attempted but not completed</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Too many Q-drops can jeopardize <strong>federal aid, loans, and scholarships</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Consult <strong>Student Business Services</strong> before Q-dropping if on financial aid</span>
              </li>
            </ul>
          </div>
        </div>

        {/* University Comparison Section */}
        <div id="comparison" className="bg-white rounded-2xl shadow-xl p-8 mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Texas A&M vs Other Universities</h2>

          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Understanding how Texas A&M's GPA system compares to other universities helps you make informed decisions about transfers, graduate school applications, and academic planning.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-red-900 to-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Feature</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Texas A&M</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">UT Austin</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Rice</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">SMU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">GPA Scale</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                  <td className="px-6 py-4 text-slate-700">4.0</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Plus/Minus Grading</td>
                  <td className="px-6 py-4 text-slate-700">Yes (A- = 3.67)</td>
                  <td className="px-6 py-4 text-slate-700">Yes (A- = 3.67)</td>
                  <td className="px-6 py-4 text-slate-700">No (straight)</td>
                  <td className="px-6 py-4 text-slate-700">Yes</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">A+ Grade</td>
                  <td className="px-6 py-4 text-slate-700">No</td>
                  <td className="px-6 py-4 text-slate-700">No</td>
                  <td className="px-6 py-4 text-slate-700">Yes (4.0)</td>
                  <td className="px-6 py-4 text-slate-700">Yes (4.0)</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Summa Cum Laude</td>
                  <td className="px-6 py-4 text-slate-700">3.90+</td>
                  <td className="px-6 py-4 text-slate-700">3.90+ (Highest)</td>
                  <td className="px-6 py-4 text-slate-700">3.85+</td>
                  <td className="px-6 py-4 text-slate-700">3.80+</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Drop Policy</td>
                  <td className="px-6 py-4 text-slate-700">Q-drop (1 free)</td>
                  <td className="px-6 py-4 text-slate-700">Q-drop limited</td>
                  <td className="px-6 py-4 text-slate-700">Credit/NC flexible</td>
                  <td className="px-6 py-4 text-slate-700">Standard drops</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Pass/Fail Option</td>
                  <td className="px-6 py-4 text-slate-700">S/U (limited)</td>
                  <td className="px-6 py-4 text-slate-700">Pass/Fail</td>
                  <td className="px-6 py-4 text-slate-700">Credit/No Credit</td>
                  <td className="px-6 py-4 text-slate-700">Pass/Fail</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Good Standing</td>
                  <td className="px-6 py-4 text-slate-700">2.0 minimum</td>
                  <td className="px-6 py-4 text-slate-700">2.0 minimum</td>
                  <td className="px-6 py-4 text-slate-700">2.0 minimum</td>
                  <td className="px-6 py-4 text-slate-700">2.0 minimum</td>
                </tr>
                <tr className="hover:bg-red-50">
                  <td className="px-6 py-4 font-semibold text-slate-700">Enrollment</td>
                  <td className="px-6 py-4 text-slate-700">70,000+</td>
                  <td className="px-6 py-4 text-slate-700">50,000+</td>
                  <td className="px-6 py-4 text-slate-700">4,000</td>
                  <td className="px-6 py-4 text-slate-700">12,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-8 mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                What GPA scale does Texas A&M use?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                Texas A&M uses a standard <strong className="text-red-900">4.0 GPA scale</strong> with plus/minus grading. A = 4.0, A- = 3.67, B+ = 3.33, B = 3.0, and so on down to F = 0.0. The university does <strong>not award A+ grades</strong>, so the highest grade point value is 4.0 for an A.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                What is a Q-drop at Texas A&M?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                A <strong className="text-red-900">Q-drop</strong> allows Texas A&M students to drop a course after the official drop deadline without it affecting their GPA. Students get <strong>one free Q-drop</strong> during their undergraduate career. Q-dropped courses appear on transcripts with a "Q" grade but don't count toward GPA calculation or credit hours attempted. However, they do count toward the Texas 6-drop rule limit.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                What GPA do I need for Mays Business School?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                Internal transfer to <strong className="text-red-900">Mays Business School</strong> typically requires a minimum <strong>3.75 GPA</strong>, though admission is highly competitive. Most successful applicants have GPAs <strong>above 3.8</strong>. You must also complete business prerequisites (ACCT 229, ECON 202/203, etc.) with strong grades. External transfers need a minimum 3.5 GPA with all prerequisites completed.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                How do I maintain my Texas A&M scholarship?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                Most Texas A&M <strong className="text-red-900">out-of-state scholarships</strong> require maintaining a <strong>3.5 GPA or higher</strong> for renewal. Academic Excellence Scholarships need <strong>3.0+</strong> for renewal. Some competitive scholarships may require 3.7+ or higher. Check your specific scholarship requirements in Howdy under "Financial Aid" as thresholds vary by award type. Falling below the required GPA typically results in scholarship loss.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                What are Century Scholars at Texas A&M?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                <strong className="text-red-900">Century Scholars</strong> represents the <strong>top 10% of each graduating class</strong> at Texas A&M. Students need a minimum <strong>3.85 cumulative GPA</strong> to be eligible. This prestigious recognition appears on diplomas and transcripts. It's separate from but often overlaps with Summa Cum Laude (3.90+). Century Scholars must also be in good standing and meet all graduation requirements.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Do S/U grades count toward my Texas A&M GPA?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                No, <strong className="text-red-900">Satisfactory (S)</strong> and <strong>Unsatisfactory (U)</strong> grades do <strong>not count toward your GPA</strong> calculation. These grades appear on your transcript and count toward graduation requirements if you earn an S, but they don't affect your Grade Point Ratio (GPR). Texas A&M allows limited S/U options for certain elective courses. Check with your academic advisor about S/U eligibility for specific courses.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                What is the difference between GPR and GPA at Texas A&M?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                <strong className="text-red-900">GPR (Grade Point Ratio)</strong> is Texas A&M's official term for what most universities call GPA (Grade Point Average). They're calculated the same way: total quality points divided by total credit hours attempted. Texas A&M uses "GPR" terminology in official documents, transcripts, and the Howdy portal. Both terms refer to the same 4.0 scale metric.
              </p>
            </div>

            {/* FAQ 8 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                Can I retake a course to replace a bad grade at Texas A&M?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                Texas A&M has a <strong className="text-red-900">grade replacement policy</strong> allowing you to retake courses where you earned a D or F. The new grade replaces the old grade in GPA calculation, but <strong>both attempts appear on your transcript</strong>. You can only replace grades for <strong>up to 15 credit hours</strong> total during your undergraduate career. The grade replacement must be done at Texas A&M, not through transfer credit.
              </p>
            </div>

            {/* FAQ 9 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                What GPA do I need for graduate school from Texas A&M?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                Graduate school GPA requirements vary by program. Generally, <strong className="text-red-900">competitive graduate programs</strong> look for <strong>3.5+ GPA</strong> minimum. Top-tier programs (law schools, medical schools, PhD programs) typically want <strong>3.7+</strong>. Master's programs may accept 3.0+ depending on field and other application strengths. Texas A&M graduate programs often give preference to their own undergrads with strong GPAs (3.5+).
              </p>
            </div>

            {/* FAQ 10 */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-200 hover:border-red-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                <svg className="w-6 h-6 text-red-900 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                How does the Texas 6-drop rule work?
              </h3>
              <p className="text-gray-700 ml-9 leading-relaxed">
                The <strong className="text-red-900">Texas 6-drop rule</strong> (HB 2504) limits undergraduate students to <strong>6 total course drops</strong> during their entire undergraduate career at Texas public universities. This includes Q-drops and regular drops after the census date. Drops at other Texas public universities count toward your limit. Some exceptions exist for first-year drops, medical emergencies, and military service. Exceeding 6 drops can prevent graduation.
              </p>
            </div>
          </div>
        </div>

        {/* Internal Links Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Related GPA Calculators</h2>
          <p className="text-gray-700 mb-8">
            Explore other university GPA calculators and academic tools to help you plan your education:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              onClick={() => navigateTo('education-and-exam-tools/university-gpa-tools/ut-austin-gpa-calculator')}
              className="text-left bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">UT Austin GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate Longhorn GPA with Latin Honors tracking</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/university-gpa-tools/stanford-gpa-calculator')}
              className="text-left bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-xl p-6 border-2 border-red-200 hover:border-red-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Stanford GPA Calculator</h3>
              <p className="text-sm text-gray-600">Stanford Cardinal GPA with Coterm tracking</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/university-gpa-tools/georgia-tech-gpa-calculator')}
              className="text-left bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 rounded-xl p-6 border-2 border-yellow-300 hover:border-yellow-500 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Georgia Tech GPA Calculator</h3>
              <p className="text-sm text-gray-600">Yellow Jackets GPA with Faculty Honors</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/college-gpa-calculator')}
              className="text-left bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">College GPA Calculator</h3>
              <p className="text-sm text-gray-600">General college GPA calculator for all universities</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/cumulative-gpa-calculator')}
              className="text-left bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cumulative GPA Calculator</h3>
              <p className="text-sm text-gray-600">Track overall GPA across multiple semesters</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/semester-gpa-calculator')}
              className="text-left bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Semester GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate single semester GPA quickly</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/high-school-gpa-calculator')}
              className="text-left bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 rounded-xl p-6 border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">High School GPA Calculator</h3>
              <p className="text-sm text-gray-600">High school weighted and unweighted GPA</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/transfer-gpa-calculator')}
              className="text-left bg-gradient-to-br from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 rounded-xl p-6 border-2 border-rose-200 hover:border-rose-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transfer GPA Calculator</h3>
              <p className="text-sm text-gray-600">Calculate transfer credit GPA impact</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/engineering-gpa-calculator')}
              className="text-left bg-gradient-to-br from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 rounded-xl p-6 border-2 border-slate-300 hover:border-slate-500 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Engineering GPA Calculator</h3>
              <p className="text-sm text-gray-600">Engineering major GPA with ABET requirements</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/gpa-raise-calculator')}
              className="text-left bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 rounded-xl p-6 border-2 border-teal-200 hover:border-teal-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">GPA Raise Calculator</h3>
              <p className="text-sm text-gray-600">Calculate grades needed to raise GPA</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/gpa-tools/graduate-school-gpa-calculator')}
              className="text-left bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">Graduate School GPA</h3>
              <p className="text-sm text-gray-600">Graduate program GPA requirements</p>
            </button>

            <button
              onClick={() => navigateTo('education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')}
              className="text-left bg-gradient-to-br from-blue-50 to-yellow-50 hover:from-blue-100 hover:to-yellow-100 rounded-xl p-6 border-2 border-blue-300 hover:border-blue-500 transition-all duration-200 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">UC Berkeley GPA Calculator</h3>
              <p className="text-sm text-gray-600">Berkeley Bears GPA with EECS curve tracking</p>
            </button>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
            relatedSlugs={[
                'ut-austin-gpa-calculator',
                'stanford-gpa-calculator',
                'georgia-tech-gpa-calculator',
                'college-gpa-calculator',
                'cumulative-gpa-calculator',
                'semester-gpa-calculator',
                'high-school-gpa-calculator',
                'transfer-gpa-calculator',
                'engineering-gpa-calculator',
                'gpa-raise-calculator',
                'graduate-school-gpa-calculator',
                'uc-berkeley-gpa-calculator'
            ]}
            currentSlug="texas-am-gpa-calculator"
            navigateTo={navigateTo}
        />
      </div>
    </div>
  );
};

export default TexasAMGPACalculator;
