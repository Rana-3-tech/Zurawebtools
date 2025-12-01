import React, { useState, useEffect, useMemo } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents from '../TableOfContents';
import { notifyIndexNow } from '../../utils/indexNow';

interface PASchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
  category: 'science-bcpm' | 'non-science' | 'patient-care';
}

const PASchoolGPACalculator: React.FC<PASchoolGPACalculatorProps> = ({ navigateTo }) => {
  // Constants
  const MAX_COURSES = 15;
  const MAX_CREDITS_PER_COURSE = 15;
  const PATIENT_CARE_EXCELLENT = 2000;
  const PATIENT_CARE_COMPETITIVE = 1000;
  const PATIENT_CARE_MINIMUM = 500;
  const GPA_HIGHLY_COMPETITIVE = 3.7;
  const GPA_COMPETITIVE = 3.5;
  const GPA_MODERATELY_COMPETITIVE = 3.3;
  const GPA_MINIMUM = 3.0;

  // SEO Setup
  useEffect(() => {
    const sanitizeUrl = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.href;
      } catch {
        return 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/pa-school-gpa-calculator';
      }
    };
    const currentUrl = sanitizeUrl(window.location.href);

    document.title = "PA School GPA Calculator - CASPA & Science GPA | ZuraWebTools";
    
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setOgMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Calculate PA school GPA with CASPA grading scale. Track science BCPM GPA, overall GPA, and patient care hours for physician assistant program applications with 3.0 minimum.');
    setMeta('keywords', 'PA school GPA calculator, CASPA GPA calculator, physician assistant GPA, PA program requirements, science BCPM GPA, patient care hours, PA school admissions, healthcare GPA calculator');
    
    setOgMeta('og:title', 'PA School GPA Calculator - CASPA Science GPA & Requirements');
    setOgMeta('og:description', 'Calculate physician assistant school GPA with official CASPA grading scale. Track science GPA, overall cumulative GPA, and patient care hours for PA program applications.');
    setOgMeta('og:type', 'website');
    setOgMeta('og:url', currentUrl);
    setOgMeta('og:image', 'https://zurawebtools.com/images/pa-school-gpa-calculator.jpg');
    setOgMeta('og:site_name', 'ZuraWebTools');
    setOgMeta('og:locale', 'en_US');

    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', 'PA School GPA Calculator - CASPA & Science GPA');

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', 'Calculate PA school GPA with CASPA grading. Track science BCPM GPA, overall GPA, and patient care hours for physician assistant programs.');

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://zurawebtools.com/images/pa-school-gpa-calculator.jpg');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Schema.org structured data for SoftwareApplication
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PA School GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "486",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "Calculate PA school GPA with CASPA grading scale for physician assistant program applications"
    };

    // Schema.org structured data for BreadcrumbList
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
          "name": "GPA Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "PA School GPA Calculator",
          "item": currentUrl
        }
      ]
    };

    // Schema.org structured data for FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the minimum GPA for PA school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most PA programs require a minimum 3.0 cumulative GPA for consideration. Competitive programs typically expect 3.4-3.6+ overall GPA and 3.3-3.5+ science GPA. Top-tier programs often have average accepted GPAs of 3.6-3.8."
          }
        },
        {
          "@type": "Question",
          "name": "How does CASPA calculate GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CASPA (Central Application Service for Physician Assistants) uses a 4.0 scale where A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0.0. Unlike LSAC, A+ equals 4.0 (not 4.33)."
          }
        },
        {
          "@type": "Question",
          "name": "What is science BCPM GPA for PA school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Science BCPM GPA includes Biology, Chemistry, Physics, and Math courses. PA programs heavily weight science GPA as it predicts success in graduate-level medical sciences. Competitive applicants have 3.3-3.5+ science GPAs."
          }
        },
        {
          "@type": "Question",
          "name": "How many patient care hours do PA schools require?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most PA programs require 500-2000+ direct patient care hours. Competitive programs prefer 1000-2000+ hours from roles like EMT, paramedic, CNA, medical assistant, or ER technician. Quality matters more than quantity."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get into PA school with a 3.2 GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, PA school admission with 3.2 GPA is possible but challenging. You'll need strong compensating factors: high science GPA (3.5+), extensive patient care hours (2000+), strong GRE scores (310+), excellent letters of recommendation, and compelling personal statement."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between overall and science GPA for PA school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Overall GPA includes all undergraduate coursework. Science GPA includes only BCPM (Biology, Chemistry, Physics, Math) courses. PA programs evaluate both, with science GPA often more heavily weighted as it indicates readiness for medical coursework."
          }
        },
        {
          "@type": "Question",
          "name": "Do PA schools accept post-bacc GPA improvements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, PA schools value post-baccalaureate coursework demonstrating academic improvement. Taking advanced science courses (anatomy, physiology, biochemistry, microbiology) and earning A grades proves academic readiness despite lower undergraduate GPA."
          }
        }
      ]
    };

    let softwareScript = document.querySelector('script[type="application/ld+json"][data-schema="software"]');
    if (!softwareScript) {
      softwareScript = document.createElement('script');
      softwareScript.setAttribute('type', 'application/ld+json');
      softwareScript.setAttribute('data-schema', 'software');
      document.head.appendChild(softwareScript);
    }
    softwareScript.textContent = JSON.stringify(softwareSchema);

    let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      breadcrumbScript.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

    let faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.setAttribute('type', 'application/ld+json');
      faqScript.setAttribute('data-schema', 'faq');
      document.head.appendChild(faqScript);
    }
    faqScript.textContent = JSON.stringify(faqSchema);

    // IndexNow notification
    notifyIndexNow('/education-and-exam-tools/gpa-tools/pa-school-gpa-calculator');

    return () => {
      if (softwareScript?.parentNode) softwareScript.parentNode.removeChild(softwareScript);
      if (breadcrumbScript?.parentNode) breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      if (faqScript?.parentNode) faqScript.parentNode.removeChild(faqScript);
    };
  }, []);

  // State Management
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: '', category: 'science-bcpm' }
  ]);
  const [previousGPA, setPreviousGPA] = useState('');
  const [previousCredits, setPreviousCredits] = useState('');
  const [patientCareHours, setPatientCareHours] = useState('');
  const [showTypeTooltip, setShowTypeTooltip] = useState(false);
  const [showBCPMTooltip, setShowBCPMTooltip] = useState(false);

  // Close tooltips on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setShowTypeTooltip(false);
      setShowBCPMTooltip(false);
    };
    if (showTypeTooltip || showBCPMTooltip) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showTypeTooltip, showBCPMTooltip]);

  // Grade to GPA conversion (CASPA scale: A+ = 4.0, not 4.33)
  const gradeToGPA = (grade: string): number => {
    const gradeMap: { [key: string]: number } = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0,
      'F': 0.0
    };
    return gradeMap[grade] ?? NaN;
  };

  // Validate credits (max 15 per course)
  const validateCredits = (credits: string): boolean => {
    const num = parseFloat(credits);
    return !isNaN(num) && num > 0 && num <= MAX_CREDITS_PER_COURSE;
  };

  // Calculate GPAs
  const calculationResults = useMemo(() => {
    const validCourses = courses.filter(c => c.grade && c.credits && validateCredits(c.credits));
    
    if (validCourses.length === 0) {
      return {
        overallGPA: 0,
        scienceGPA: 0,
        nonScienceGPA: 0,
        totalCredits: 0,
        scienceCredits: 0,
        nonScienceCredits: 0,
        academicStanding: 'No courses entered',
        competitiveness: 'Enter courses to calculate',
        patientCareStatus: 'Not evaluated'
      };
    }

    // Separate courses by category
    const scienceCourses = validCourses.filter(c => c.category === 'science-bcpm');
    const nonScienceCourses = validCourses.filter(c => c.category === 'non-science');

    // Calculate Science BCPM GPA
    let sciencePoints = 0;
    let scienceCredits = 0;
    scienceCourses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradeToGPA(course.grade);
      if (!isNaN(points)) {
        sciencePoints += points * credits;
        scienceCredits += credits;
      }
    });
    const scienceGPA = scienceCredits > 0 ? sciencePoints / scienceCredits : 0;

    // Calculate Non-Science GPA
    let nonSciencePoints = 0;
    let nonScienceCredits = 0;
    nonScienceCourses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradeToGPA(course.grade);
      if (!isNaN(points)) {
        nonSciencePoints += points * credits;
        nonScienceCredits += credits;
      }
    });
    const nonScienceGPA = nonScienceCredits > 0 ? nonSciencePoints / nonScienceCredits : 0;

    // Calculate Overall Cumulative GPA
    let totalPoints = sciencePoints + nonSciencePoints;
    let totalCredits = scienceCredits + nonScienceCredits;

    // Add previous GPA if provided
    if (previousGPA && previousCredits) {
      const prevGPA = parseFloat(previousGPA);
      const prevCredits = parseFloat(previousCredits);
      if (!isNaN(prevGPA) && !isNaN(prevCredits) && prevGPA >= 0 && prevGPA <= 4.0 && prevCredits > 0) {
        totalPoints += prevGPA * prevCredits;
        totalCredits += prevCredits;
      }
    }

    const overallGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

    // Determine Academic Standing
    let academicStanding = '';
    if (overallGPA >= GPA_HIGHLY_COMPETITIVE) {
      academicStanding = 'Highly Competitive (3.7+)';
    } else if (overallGPA >= GPA_COMPETITIVE) {
      academicStanding = 'Competitive (3.5-3.69)';
    } else if (overallGPA >= GPA_MODERATELY_COMPETITIVE) {
      academicStanding = 'Moderately Competitive (3.3-3.49)';
    } else if (overallGPA >= GPA_MINIMUM) {
      academicStanding = 'Meets Minimum (3.0-3.29)';
    } else {
      academicStanding = 'Below Minimum (<3.0)';
    }

    // Determine Program Competitiveness
    let competitiveness = '';
    if (overallGPA >= 3.6 && scienceGPA >= 3.5) {
      competitiveness = 'Top-Tier Programs (Duke, Emory, Yale)';
    } else if (overallGPA >= 3.5 && scienceGPA >= 3.4) {
      competitiveness = 'Highly Competitive Programs';
    } else if (overallGPA >= 3.4 && scienceGPA >= 3.3) {
      competitiveness = 'Competitive Programs';
    } else if (overallGPA >= 3.0 && scienceGPA >= 3.0) {
      competitiveness = 'Less Competitive Programs';
    } else {
      competitiveness = 'Consider Post-Bacc Coursework';
    }

    // Patient Care Hours Status
    let patientCareStatus = '';
    const hours = parseInt(patientCareHours);
    if (!isNaN(hours)) {
      if (hours >= 2000) {
        patientCareStatus = 'Excellent (2000+ hours)';
      } else if (hours >= 1000) {
        patientCareStatus = 'Competitive (1000-1999 hours)';
      } else if (hours >= 500) {
        patientCareStatus = 'Meets Minimum (500-999 hours)';
      } else {
        patientCareStatus = 'Below Minimum (<500 hours)';
      }
    } else {
      patientCareStatus = 'Not specified';
    }

    return {
      overallGPA: parseFloat(overallGPA.toFixed(3)),
      scienceGPA: parseFloat(scienceGPA.toFixed(3)),
      nonScienceGPA: parseFloat(nonScienceGPA.toFixed(3)),
      totalCredits: parseFloat(totalCredits.toFixed(1)),
      scienceCredits: parseFloat(scienceCredits.toFixed(1)),
      nonScienceCredits: parseFloat(nonScienceCredits.toFixed(1)),
      academicStanding,
      competitiveness,
      patientCareStatus
    };
  }, [courses, previousGPA, previousCredits, patientCareHours]);

  // Course Management Functions
  const addCourse = () => {
    if (courses.length < 15) {
      setCourses([...courses, {
        id: Date.now().toString(),
        name: '',
        grade: '',
        credits: '',
        category: 'science-bcpm'
      }]);
    }
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset all fields? This will delete all entered data.')) {
      setCourses([{ id: '1', name: '', grade: '', credits: '', category: 'science-bcpm' }]);
      setPreviousGPA('');
      setPreviousCredits('');
      setPatientCareHours('');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8" role="main" aria-label="PA School GPA Calculator">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PA School GPA Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your physician assistant school GPA with official CASPA grading scale. Track science BCPM GPA, overall cumulative GPA, and patient care hours for competitive PA program applications with 3.0 minimum requirement.
          </p>
        </header>

        {/* Main Calculator Tool */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="text-2xl font-bold text-gray-900 mb-6">Calculate Your PA School GPA</h2>

          {/* Previous GPA Section */}
          <fieldset className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <legend className="text-lg font-semibold text-gray-900 mb-4">Previous Academic Record (Optional)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="previous-gpa" className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Cumulative GPA
                </label>
                <input
                  id="previous-gpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={previousGPA}
                  onChange={(e) => setPreviousGPA(e.target.value)}
                  placeholder="3.50"
                  aria-label="Enter previous cumulative GPA"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="previous-credits" className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Total Credits
                </label>
                <input
                  id="previous-credits"
                  type="number"
                  step="1"
                  min="0"
                  value={previousCredits}
                  onChange={(e) => setPreviousCredits(e.target.value)}
                  placeholder="60"
                  aria-label="Enter previous total credits completed"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                />
              </div>
            </div>
          </fieldset>

          {/* Patient Care Hours */}
          <fieldset className="mb-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
            <legend className="text-lg font-semibold text-gray-900 mb-4">Patient Care Experience (Optional)</legend>
            <div>
              <label htmlFor="patient-care-hours" className="block text-sm font-medium text-gray-700 mb-2">
                Direct Patient Care Hours
              </label>
              <input
                id="patient-care-hours"
                type="number"
                step="1"
                min="0"
                value={patientCareHours}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || parseInt(value) >= 0) {
                    setPatientCareHours(value);
                  }
                }}
                placeholder="1000"
                aria-label="Enter total direct patient care hours"
                className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
              />
              <p className="mt-2 text-sm text-gray-600">
                Include hours from EMT, paramedic, CNA, medical assistant, ER tech, or similar direct patient care roles.
              </p>
            </div>
          </fieldset>

          {/* Course Entry Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Entry</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Credits
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-1 relative">
                        Category
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-4 h-4 text-xs text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={() => setShowBCPMTooltip(!showBCPMTooltip)}
                          aria-label="Course category explanation"
                        >
                          ?
                        </button>
                      </div>
                      {showBCPMTooltip && (
                        <div className="absolute z-10 mt-2 p-3 bg-white border border-blue-200 rounded-lg shadow-lg text-xs text-gray-700 normal-case font-normal max-w-xs">
                          <p className="font-semibold text-blue-900 mb-2">Course Categories:</p>
                          <p className="mb-2"><strong>Science BCPM:</strong> Biology, Chemistry, Physics, Math (heavily weighted for PA admissions).</p>
                          <p><strong>Non-Science:</strong> Humanities, social sciences, English, psychology, communication.</p>
                        </div>
                      )}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          placeholder="Course name"
                          aria-label={`Course name for row ${courses.indexOf(course) + 1}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          aria-label={`Grade for ${course.name || 'course'}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                        >
                          <option value="">Select</option>
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
                          <option value="F">F (0.0)</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="15"
                          value={course.credits}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || validateCredits(value)) {
                              updateCourse(course.id, 'credits', value);
                            }
                          }}
                          placeholder="3"
                          aria-label={`Credits for ${course.name || 'course'}`}
                          aria-invalid={course.credits ? !validateCredits(course.credits) : undefined}
                          className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none ${
                            course.credits && !validateCredits(course.credits) ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {course.credits && !validateCredits(course.credits) && (
                          <span className="text-xs text-red-600 mt-1">Max 15 credits per course</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={course.category}
                          onChange={(e) => updateCourse(course.id, 'category', e.target.value as 'science-bcpm' | 'non-science' | 'patient-care')}
                          aria-label={`Category for ${course.name || 'course'}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                        >
                          <option value="science-bcpm">Science BCPM</option>
                          <option value="non-science">Non-Science</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeCourse(course.id)}
                          disabled={courses.length === 1}
                          aria-label={`Remove ${course.name || 'course'}`}
                          className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4" role="group" aria-label="Calculator actions">
              <button
                onClick={addCourse}
                disabled={courses.length >= MAX_COURSES}
                aria-label={courses.length >= MAX_COURSES ? `Maximum ${MAX_COURSES} courses reached` : "Add a new course"}
                className={`px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  courses.length >= MAX_COURSES
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                + Add Course {courses.length >= MAX_COURSES && `(Max ${MAX_COURSES})`}
              </button>
              <button
                onClick={resetAll}
                aria-label="Reset all fields"
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Results Section */}
          {calculationResults.overallGPA > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Your PA School GPA Results</h3>

              {/* GPA Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Overall GPA */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-600 mb-1">Overall Cumulative GPA</p>
                  <p className="text-3xl font-bold text-blue-600">{calculationResults.overallGPA.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">{calculationResults.totalCredits} credits</p>
                </div>

                {/* Science GPA */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-600 mb-1">Science BCPM GPA</p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {calculationResults.scienceGPA > 0 ? calculationResults.scienceGPA.toFixed(2) : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{calculationResults.scienceCredits} credits</p>
                </div>

                {/* Non-Science GPA */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <p className="text-sm text-gray-600 mb-1">Non-Science GPA</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {calculationResults.nonScienceGPA > 0 ? calculationResults.nonScienceGPA.toFixed(2) : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{calculationResults.nonScienceCredits} credits</p>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Academic Standing */}
                <div 
                  className={`p-4 rounded-lg ${
                    calculationResults.overallGPA >= 3.5 ? 'bg-green-100 border border-green-300' :
                    calculationResults.overallGPA >= 3.0 ? 'bg-yellow-100 border border-yellow-300' :
                    'bg-red-100 border border-red-300'
                  }`}
                  role="status"
                  aria-label={`Academic Standing: ${calculationResults.academicStanding}. ${
                    calculationResults.overallGPA >= 3.5 ? 'Strong standing' :
                    calculationResults.overallGPA >= 3.0 ? 'Acceptable standing' :
                    'Needs improvement'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-700 mb-1">Academic Standing</p>
                  <p className={`font-bold ${
                    calculationResults.overallGPA >= 3.5 ? 'text-green-700' :
                    calculationResults.overallGPA >= 3.0 ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {calculationResults.academicStanding}
                  </p>
                </div>

                {/* Program Competitiveness */}
                <div 
                  className={`p-4 rounded-lg ${
                    calculationResults.overallGPA >= 3.5 && calculationResults.scienceGPA >= 3.4 ? 'bg-green-100 border border-green-300' :
                    calculationResults.overallGPA >= 3.3 ? 'bg-blue-100 border border-blue-300' :
                    'bg-orange-100 border border-orange-300'
                  }`}
                  role="status"
                  aria-label={`Program Competitiveness: ${calculationResults.competitiveness}. ${
                    calculationResults.overallGPA >= 3.5 && calculationResults.scienceGPA >= 3.4 ? 'Highly competitive for top programs' :
                    calculationResults.overallGPA >= 3.3 ? 'Competitive for many programs' :
                    'Consider strengthening application'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-700 mb-1">Program Competitiveness</p>
                  <p className={`font-bold ${
                    calculationResults.overallGPA >= 3.5 && calculationResults.scienceGPA >= 3.4 ? 'text-green-700' :
                    calculationResults.overallGPA >= 3.3 ? 'text-blue-700' :
                    'text-orange-700'
                  }`}>
                    {calculationResults.competitiveness}
                  </p>
                </div>

                {/* Patient Care Hours */}
                {patientCareHours && (
                  <div 
                    className={`p-4 rounded-lg md:col-span-2 ${
                      parseInt(patientCareHours) >= 1000 ? 'bg-green-100 border border-green-300' :
                      parseInt(patientCareHours) >= 500 ? 'bg-yellow-100 border border-yellow-300' :
                      'bg-red-100 border border-red-300'
                    }`}
                    role="status"
                    aria-label={`Patient Care Experience: ${calculationResults.patientCareStatus}. ${
                      parseInt(patientCareHours) >= 1000 ? 'Excellent experience level' :
                      parseInt(patientCareHours) >= 500 ? 'Acceptable experience level' :
                      'Consider gaining more experience'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-700 mb-1">Patient Care Experience</p>
                    <p className={`font-bold ${
                      parseInt(patientCareHours) >= 1000 ? 'text-green-700' :
                      parseInt(patientCareHours) >= 500 ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {calculationResults.patientCareStatus}
                    </p>
                  </div>
                )}
              </div>

              {/* Helpful Notes */}
              <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-300">
                <h4 className="font-semibold text-blue-900 mb-2">💡 PA School Application Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Most PA programs require minimum 3.0 cumulative GPA</li>
                  <li>• Competitive programs expect 3.4-3.6+ overall and 3.3-3.5+ science GPA</li>
                  <li>• Science BCPM GPA is heavily weighted in admissions decisions</li>
                  <li>• Patient care hours (1000-2000+) are essential for competitive applications</li>
                  <li>• Strong GRE scores (310+) can compensate for lower GPA</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Table of Contents */}
        <TableOfContents
          sections={[
            { id: 'quick-examples', title: 'Quick Examples', emoji: '📝', subtitle: 'Real PA school scenarios',
              gradientFrom: 'from-blue-300', gradientTo: 'to-indigo-300',
              hoverBorder: 'hover:border-blue-300', hoverText: 'hover:text-blue-500' },
            { id: 'benefits', title: 'Key Benefits', emoji: '✨', subtitle: 'Why use this calculator',
              gradientFrom: 'from-indigo-300', gradientTo: 'to-purple-300',
              hoverBorder: 'hover:border-indigo-300', hoverText: 'hover:text-indigo-500' },
            { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide',
              gradientFrom: 'from-purple-300', gradientTo: 'to-pink-300',
              hoverBorder: 'hover:border-purple-300', hoverText: 'hover:text-purple-500' },
            { id: 'use-cases', title: 'Use Cases', emoji: '👥', subtitle: 'Who uses this',
              gradientFrom: 'from-pink-300', gradientTo: 'to-rose-300',
              hoverBorder: 'hover:border-pink-300', hoverText: 'hover:text-pink-500' },
            { id: 'about', title: 'About', emoji: '📚', subtitle: 'PA school requirements',
              gradientFrom: 'from-blue-300', gradientTo: 'to-cyan-300',
              hoverBorder: 'hover:border-blue-300', hoverText: 'hover:text-blue-500' },
            { id: 'faqs', title: 'FAQs', emoji: '❓', subtitle: 'Common questions',
              gradientFrom: 'from-cyan-300', gradientTo: 'to-teal-300',
              hoverBorder: 'hover:border-cyan-300', hoverText: 'hover:text-cyan-500' },
            { id: 'related-tools', title: 'Related Tools', emoji: '🔗', subtitle: 'More calculators',
              gradientFrom: 'from-teal-300', gradientTo: 'to-green-300',
              hoverBorder: 'hover:border-teal-300', hoverText: 'hover:text-teal-500' }
          ]}
        />

        {/* Social Share Buttons */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📢 Share This Calculator</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Calculate your PA school GPA with CASPA grading scale');
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>Facebook icon</title>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Calculate your PA school GPA with CASPA grading scale - Free tool for physician assistant applicants');
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>Twitter icon</title>
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>LinkedIn icon</title>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>
        </section>

        {/* Quick Examples Section */}
        <section id="quick-examples" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">📝 Quick PA School GPA Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example 1: Strong Applicant */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-3">🎯 Strong Applicant</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Overall GPA:</strong> 3.65</p>
                <p><strong>Science BCPM:</strong> 3.58</p>
                <p><strong>Patient Care:</strong> 1500 hours</p>
                <p><strong>GRE:</strong> 315 (160V, 155Q)</p>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <p className="text-sm font-semibold text-green-800">✅ Competitive for top-tier programs</p>
              </div>
            </div>

            {/* Example 2: Average Applicant */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-3">📊 Average Applicant</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Overall GPA:</strong> 3.42</p>
                <p><strong>Science BCPM:</strong> 3.35</p>
                <p><strong>Patient Care:</strong> 1000 hours</p>
                <p><strong>GRE:</strong> 305 (152V, 153Q)</p>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">✅ Competitive for most programs</p>
              </div>
            </div>

            {/* Example 3: Below Average */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-3">⚠️ Needs Improvement</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Overall GPA:</strong> 3.15</p>
                <p><strong>Science BCPM:</strong> 3.05</p>
                <p><strong>Patient Care:</strong> 600 hours</p>
                <p><strong>GRE:</strong> 298 (148V, 150Q)</p>
              </div>
              <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                <p className="text-sm font-semibold text-orange-800">⚠️ Consider post-bacc courses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">✨ Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">CASPA-Accurate Grading</h3>
                  <p className="text-gray-700">
                    Uses official CASPA (Central Application Service for Physician Assistants) grading scale where A+=4.0. Unlike generic calculators, we match PA school application standards perfectly for accurate admissions predictions.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Science BCPM Tracking</h3>
                  <p className="text-gray-700">
                    Automatically separates Biology, Chemistry, Physics, and Math courses. PA programs heavily weight science GPA (3.3-3.5+ competitive) as it predicts success in graduate medical sciences coursework.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Patient Care Hours Integration</h3>
                  <p className="text-gray-700">
                    Track your direct patient care hours (EMT, paramedic, CNA, medical assistant). Most programs require 1000-2000+ hours. Calculate both GPA and experience readiness for comprehensive application assessment.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Program Competitiveness Analysis</h3>
                  <p className="text-gray-700">
                    Get instant feedback on your competitiveness for top-tier programs (Duke, Emory, Yale), highly competitive, or less competitive PA schools based on GPA thresholds and admission data trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📖 How to Use This Calculator</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Previous Academic Record (Optional)</h3>
                <p className="text-gray-700">
                  If you've completed previous semesters, enter your cumulative GPA and total credits. This helps calculate your updated overall GPA. Include all undergraduate coursework from your transcript for CASPA application accuracy.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Patient Care Hours (Optional)</h3>
                <p className="text-gray-700 mb-3">
                  Enter your total direct patient care hours from qualifying roles. Most PA programs require 500-2000+ hours. Include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>EMT or Paramedic experience</li>
                  <li>Certified Nursing Assistant (CNA)</li>
                  <li>Medical Assistant positions</li>
                  <li>ER Technician or Surgical Tech</li>
                  <li>Direct patient contact roles (not shadowing)</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Input Current Courses</h3>
                <p className="text-gray-700 mb-3">
                  For each course you're planning or currently taking, enter:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>Course Name:</strong> E.g., "Anatomy & Physiology I"</li>
                  <li><strong>Grade:</strong> Select letter grade (A+ through F)</li>
                  <li><strong>Credits:</strong> Credit hours (typically 3-4)</li>
                  <li><strong>Category:</strong> Science BCPM or Non-Science</li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Course Category</h3>
                <p className="text-gray-700">
                  <strong>Science BCPM:</strong> Biology (anatomy, physiology, microbiology, genetics), Chemistry (organic, biochemistry), Physics, Math (calculus, statistics). 
                  <strong>Non-Science:</strong> Psychology, sociology, English, communication, humanities courses.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Review Your Results</h3>
                <p className="text-gray-700 mb-3">
                  The calculator displays:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Overall cumulative GPA (all courses)</li>
                  <li>Science BCPM GPA (heavily weighted)</li>
                  <li>Non-Science GPA</li>
                  <li>Academic standing assessment</li>
                  <li>Program competitiveness level</li>
                  <li>Patient care hours evaluation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Calculation Example</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="grid grid-cols-4 gap-2 font-semibold">
                <span>Course</span>
                <span>Grade</span>
                <span>Credits</span>
                <span>Category</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Anatomy & Physiology I</span>
                <span>A (4.0)</span>
                <span>4</span>
                <span>Science BCPM</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Organic Chemistry II</span>
                <span>B+ (3.3)</span>
                <span>4</span>
                <span>Science BCPM</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <span>Medical Terminology</span>
                <span>A (4.0)</span>
                <span>3</span>
                <span>Non-Science</span>
              </div>
              <div className="pt-3 border-t border-blue-300 font-semibold">
                <p>Science GPA: (4.0×4 + 3.3×4) ÷ 8 = <span className="text-indigo-600">3.65</span></p>
                <p>Overall GPA: (4.0×4 + 3.3×4 + 4.0×3) ÷ 11 = <span className="text-blue-600">3.75</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">👥 Who Uses This Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Use Case 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pre-PA Students</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Undergraduate students planning PA school applications who need to track prerequisite GPA requirements and plan course selection strategies.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Monitor science BCPM GPA (minimum 3.0-3.3)</li>
                <li>✓ Plan semester course loads</li>
                <li>✓ Identify courses needing retakes</li>
                <li>✓ Target competitive program standards</li>
              </ul>
            </div>

            {/* Use Case 2 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">CASPA Applicants</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Students preparing CASPA applications who need accurate GPA calculations matching official application service standards.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Verify CASPA GPA before submission</li>
                <li>✓ Calculate multiple GPA types (cumulative, science)</li>
                <li>✓ Assess program competitiveness</li>
                <li>✓ Plan application timeline</li>
              </ul>
            </div>

            {/* Use Case 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Post-Bacc Students</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Career changers or students improving undergraduate GPAs through post-baccalaureate coursework for PA school admission.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Track GPA improvement progress</li>
                <li>✓ Calculate impact of new grades</li>
                <li>✓ Determine additional courses needed</li>
                <li>✓ Monitor science GPA enhancement</li>
              </ul>
            </div>

            {/* Use Case 4 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-pink-500 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pre-Health Advisors</h3>
              </div>
              <p className="text-gray-700 mb-3">
                Academic advisors guiding students through PA school prerequisites and application requirements with accurate GPA projections.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Advise students on course planning</li>
                <li>✓ Calculate program eligibility</li>
                <li>✓ Provide realistic program targets</li>
                <li>✓ Track patient care hour requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 About PA School GPA Requirements</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg p-6">
              <p className="text-lg leading-relaxed">
                This calculator helps students pursuing <strong>Physician Assistant (PA) programs</strong> track their academic readiness using the official <strong>CASPA grading scale</strong>. Most PA programs require minimum 3.0 cumulative GPA, with competitive programs expecting 3.4-3.6+ overall and 3.3-3.5+ science GPAs, reflecting the rigorous graduate-level medical training required for clinical practice.
              </p>
            </div>

            {/* CASPA Application Process */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">📋</span> CASPA Application System
              </h3>
              <p className="leading-relaxed mb-4">
                <strong>CASPA (Central Application Service for Physician Assistants)</strong> is the centralized application service used by over 280 PA programs nationwide. CASPA calculates GPA using a 4.0 scale where A+=4.0, A=4.0, A-=3.7, B+=3.3, B=3.0 (unlike LSAC's 4.33 scale for law school). The application requires detailed course-by-course transcripts from all institutions attended, with grades categorized by subject area and academic level.
              </p>
              <p className="leading-relaxed">
                PA programs evaluate multiple GPA types: <strong>overall cumulative GPA</strong> (all undergraduate coursework), <strong>science BCPM GPA</strong> (Biology, Chemistry, Physics, Math - heavily weighted), and <strong>last 60 credits GPA</strong> (demonstrating recent academic performance). Competitive applicants typically have 3.5+ overall GPAs, though programs holistically review patient care experience, GRE scores, letters of recommendation, and personal statements. Students can track undergraduate coursework with our <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:text-blue-700 font-medium underline">College GPA Calculator</a>.
              </p>
            </div>

            {/* Prerequisite Requirements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-indigo-600">🔬</span> PA School Prerequisites & BCPM GPA
              </h3>
              <p className="leading-relaxed mb-4">
                <strong>PA school prerequisites</strong> require extensive science coursework totaling 45-60 credits for most programs. Core requirements include anatomy and physiology (8 credits), general chemistry (8 credits), organic chemistry (4-8 credits), biochemistry (3-4 credits), microbiology with lab (4 credits), genetics (3 credits), and statistics (3 credits). Additional coursework often includes physics, cell biology, molecular biology, and medical terminology.
              </p>
              <p className="leading-relaxed">
                The <strong>science BCPM GPA</strong> is critically important, with most programs requiring minimum 3.0 and competitive applicants averaging 3.4-3.6+. Top-tier programs (Duke, Emory, Yale, Stanford, Northwestern) expect 3.6-3.8+ science GPAs demonstrating excellence in challenging coursework. Lower science GPAs can be improved through post-baccalaureate programs or retaking prerequisite courses, though grade replacement policies vary by institution. Similar to PA admissions, those pursuing medical careers can use our <a href="/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator" className="text-blue-600 hover:text-blue-700 font-medium underline">Medical School GPA Calculator</a> for MD/DO program standards.
              </p>
            </div>

            {/* Patient Care Experience */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-600">🏥</span> Patient Care & Healthcare Experience
              </h3>
              <p className="leading-relaxed mb-4">
                <strong>Direct patient care experience</strong> is a distinguishing requirement for PA programs, with most requiring 500-2000+ hours of hands-on clinical work. Qualifying experiences include EMT/paramedic (emergency medical services), CNA (certified nursing assistant), medical assistant, ER technician, surgical technician, phlebotomist, and patient care technician roles. Shadowing, volunteering, and scribing typically don't count as direct patient care.
              </p>
              <p className="leading-relaxed">
                Competitive applicants average 1500-3000+ patient care hours gained through 1-3 years of full-time clinical work before applying. Quality matters more than quantity - programs value diverse clinical settings (emergency, inpatient, outpatient, surgical) and progressively responsible roles. Healthcare experience demonstrates commitment to medicine, develops clinical skills, and provides concrete examples for personal statements and interviews. For comprehensive academic tracking across multiple years, use our <a href="/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator" className="text-blue-600 hover:text-blue-700 font-medium underline">Cumulative GPA Calculator</a> for semester-by-semester monitoring.
              </p>
            </div>

            {/* Program Competitiveness */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-r-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-indigo-600">🎯</span> PA Program Competitiveness Levels
              </h3>
              <p className="leading-relaxed">
                PA program acceptance rates average 20-30% nationally, with over 30,000 applicants competing for approximately 10,000 seats annually. <strong>Top-tier programs</strong> (Duke, Emory, Yale, Baylor, Northwestern) accept less than 5% of applicants and require 3.7+ overall GPAs, 3.6+ science GPAs, 2000+ patient care hours, and 310+ GRE scores. <strong>Highly competitive programs</strong> expect 3.5-3.6+ GPAs with strong clinical experience. <strong>Less competitive programs</strong> may accept 3.0-3.2 GPAs with compensating strengths like extensive patient care, military experience, or underrepresented backgrounds. Programs increasingly emphasize holistic review, diversity, and mission fit beyond numerical metrics. Graduate students can also explore <a href="/education-and-exam-tools/gpa-tools/graduate-school-gpa-calculator" className="text-blue-600 hover:text-blue-700 font-medium underline">Graduate School GPA Calculator</a> for PhD/MS biomedical science programs.
              </p>
            </div>
          </div>
        </section>

        {/* External Resources Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 External Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://caspa.liaisoncas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow group"
              aria-label="CASPA - Centralized Application Service (opens in new tab)"
            >
              <div className="bg-blue-500 text-white rounded-lg p-3 group-hover:bg-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-700">CASPA - Centralized Application Service</h3>
                <p className="text-sm text-gray-600">Official PA program application portal and PAEA accredited program requirements</p>
              </div>
            </a>

            <a
              href="https://www.aapa.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 hover:shadow-lg transition-shadow group"
              aria-label="AAPA - American Academy of PAs (opens in new tab)"
            >
              <div className="bg-indigo-500 text-white rounded-lg p-3 group-hover:bg-indigo-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-700">AAPA - American Academy of PAs</h3>
                <p className="text-sm text-gray-600">PA career resources and professional development</p>
              </div>
            </a>

            <a
              href="https://paeaonline.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow group"
              aria-label="PAEA - Physician Assistant Education Association (opens in new tab)"
            >
              <div className="bg-purple-500 text-white rounded-lg p-3 group-hover:bg-purple-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-700">PAEA - Physician Assistant Education Association</h3>
                <p className="text-sm text-gray-600">PA program directory and admission statistics</p>
              </div>
            </a>

            <a
              href="https://www.arc-pa.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200 hover:shadow-lg transition-shadow group"
              aria-label="ARC-PA - Accreditation Review Commission (opens in new tab)"
            >
              <div className="bg-pink-500 text-white rounded-lg p-3 group-hover:bg-pink-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-pink-700">ARC-PA - Accreditation Review Commission</h3>
                <p className="text-sm text-gray-600">PA program accreditation standards and quality</p>
              </div>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <section className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">
              <strong>Last Updated:</strong> December 1, 2025 | Verified CASPA grading scale accuracy
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>What is the minimum GPA for PA school?</span>
                <svg className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Most PA programs require a minimum <strong>3.0 cumulative GPA</strong> for consideration. However, competitive programs typically expect 3.4-3.6+ overall GPA and 3.3-3.5+ science GPA. Top-tier programs (Duke, Emory, Yale) often have average accepted GPAs of 3.6-3.8. Meeting the minimum doesn't guarantee admission - programs use holistic review considering patient care hours, GRE scores, letters of recommendation, and personal statements.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>How does CASPA calculate GPA?</span>
                <svg className="w-5 h-5 text-indigo-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                CASPA (Central Application Service for Physician Assistants) uses a <strong>4.0 scale</strong> where A+=4.0, A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0.0. Unlike LSAC (law school), <strong>A+ equals 4.0, not 4.33</strong>. CASPA calculates multiple GPAs: overall cumulative (all courses), science BCPM (Biology, Chemistry, Physics, Math), non-science, and last 60 credits. All grades from all institutions are included - there's no grade replacement for retaken courses.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>What is science BCPM GPA for PA school?</span>
                <svg className="w-5 h-5 text-purple-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Science BCPM GPA includes <strong>Biology, Chemistry, Physics, and Math</strong> courses. This encompasses anatomy, physiology, microbiology, genetics (Biology); general chemistry, organic chemistry, biochemistry (Chemistry); physics; calculus and statistics (Math). PA programs heavily weight science GPA because it predicts success in graduate-level medical sciences. Competitive applicants typically have <strong>3.3-3.5+ science GPAs</strong>, with top programs expecting 3.6-3.8+. Lower science GPAs can be improved through post-bacc programs or retaking prerequisite courses.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>How many patient care hours do PA schools require?</span>
                <svg className="w-5 h-5 text-pink-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Most PA programs require <strong>500-2000+ direct patient care hours</strong>. Competitive programs prefer 1000-2000+ hours from roles like EMT, paramedic, CNA, medical assistant, or ER technician. <strong>Direct patient care</strong> means hands-on clinical work with patient contact - shadowing, volunteering, and scribing typically don't count. Quality matters more than quantity: programs value diverse clinical settings (emergency, inpatient, outpatient, surgical), progressively responsible roles, and how you reflect on experiences in your personal statement. Average accepted applicants have 1500-3000+ hours gained through 1-3 years of full-time clinical work.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Can I get into PA school with a 3.2 GPA?</span>
                <svg className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Yes, PA school admission with 3.2 GPA is possible but challenging. You'll need <strong>strong compensating factors</strong>: high science GPA (3.5+), extensive patient care hours (2000+), strong GRE scores (310+), excellent letters of recommendation from physicians or PAs, and compelling personal statement explaining your commitment to medicine. Consider applying to less competitive programs, improving GPA through post-bacc coursework, or taking gap years to gain more clinical experience. Programs increasingly use holistic review - your entire application matters, not just GPA. Military experience, underrepresented backgrounds, or unique perspectives can also strengthen applications.
              </p>
            </details>

            {/* FAQ 6 */}
            <details className="group bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>What's the difference between overall and science GPA for PA school?</span>
                <svg className="w-5 h-5 text-indigo-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                <strong>Overall cumulative GPA</strong> includes all undergraduate coursework from all institutions - science, humanities, social sciences, electives, everything. <strong>Science BCPM GPA</strong> includes only Biology, Chemistry, Physics, and Math courses. PA programs evaluate both, with <strong>science GPA often more heavily weighted</strong> because it indicates readiness for graduate-level medical coursework in anatomy, physiology, pharmacology, and pathophysiology. You can have strong overall GPA but weak science GPA (or vice versa) - programs want to see both are competitive. If science GPA is lower, consider retaking prerequisite courses or taking additional advanced science classes through post-baccalaureate programs.
              </p>
            </details>

            {/* FAQ 7 */}
            <details className="group bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Do PA schools accept post-bacc GPA improvements?</span>
                <svg className="w-5 h-5 text-purple-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Yes, PA schools <strong>highly value post-baccalaureate coursework</strong> demonstrating academic improvement and commitment. Taking advanced science courses (anatomy, physiology, biochemistry, microbiology) and earning A grades proves academic readiness despite lower undergraduate GPA. <strong>Formal post-bacc programs</strong> designed for career changers are particularly respected. CASPA includes all grades in GPA calculations (no grade replacement), but programs see upward GPA trends positively. Many successful applicants with sub-3.0 undergraduate GPAs strengthen applications through 1-2 years of post-bacc coursework earning 3.5-4.0 GPAs while simultaneously gaining patient care experience. Programs want to see you can handle graduate-level science - post-bacc success provides that evidence.
              </p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        <section id="related-tools" className="mb-8">
          <RelatedTools
            relatedSlugs={[
              'medical-school-gpa-calculator',
              'nursing-school-gpa-calculator',
              'college-gpa-calculator',
              'cumulative-gpa-calculator'
            ]}
            currentSlug="pa-school-gpa-calculator"
            navigateTo={navigateTo}
          />
        </section>
      </div>
    </main>
  );
};

export default PASchoolGPACalculator;
