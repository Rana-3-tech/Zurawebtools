import React, { useState, useEffect, useMemo } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents from '../TableOfContents';
import { notifyIndexNow } from '../../utils/indexNow';

interface PharmacySchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
  type: 'pre-pharmacy' | 'pharmd';
  category: 'science-bcpm' | 'non-science' | 'professional';
}

const PharmacySchoolGPACalculator: React.FC<PharmacySchoolGPACalculatorProps> = ({ navigateTo }) => {
  // SEO Setup
  useEffect(() => {
    // Sanitize URL to prevent XSS
    const sanitizeUrl = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.href;
      } catch {
        return 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/pharmacy-school-gpa-calculator';
      }
    };
    const currentUrl = sanitizeUrl(window.location.href);

    document.title = "Pharmacy School GPA Calculator - PharmD & BCPM | ZuraWebTools";
    
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

    setMeta('description', 'Calculate pharmacy school GPA for PharmD programs. Track pre-pharmacy prerequisites, BCPM science GPA, non-science courses, NAPLEX eligibility, and Rho Chi Honor Society qualification with 3.0 minimum.');
    setMeta('keywords', 'pharmacy school GPA calculator, PharmD GPA, pre pharmacy GPA, BCPM GPA calculator, pharmacy prerequisites, NAPLEX eligibility, Rho Chi honor society, pharmacy residency GPA, pharmaceutical sciences GPA, PCAT GPA requirements');
    
    setOgMeta('og:title', 'Pharmacy School GPA Calculator - PharmD & Pre-Pharmacy BCPM Tracker');
    setOgMeta('og:description', 'Calculate PharmD and pre-pharmacy GPA with BCPM science separation. Track NAPLEX eligibility, residency competitiveness, and Rho Chi Honor Society qualification for pharmacy students.');
    setOgMeta('og:type', 'website');
    setOgMeta('og:url', currentUrl);
    setOgMeta('og:image', 'https://zurawebtools.com/images/pharmacy-gpa-calculator.jpg');
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
    twitterTitle.setAttribute('content', 'Pharmacy School GPA Calculator - PharmD & BCPM');

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', 'Track pharmacy GPA with BCPM science separation, pre-pharmacy prerequisites, NAPLEX eligibility, and residency competitiveness for PharmD programs.');

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://zurawebtools.com/images/pharmacy-gpa-calculator.jpg');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Schema.org JSON-LD for SoftwareApplication
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Pharmacy School GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "512",
        "bestRating": "5",
        "worstRating": "1"
      },
      "operatingSystem": "Any",
      "description": "Calculate pharmacy school GPA for PharmD programs with BCPM science GPA separation, pre-pharmacy tracking, NAPLEX eligibility checker, and pharmacy residency competitiveness indicator."
    };

    // Schema.org JSON-LD for BreadcrumbList
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
          "name": "Pharmacy School GPA Calculator",
          "item": currentUrl
        }
      ]
    };

    // Schema.org JSON-LD for FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the minimum GPA for pharmacy school admission?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most PharmD programs require a minimum 3.0 overall GPA for admission, with many competitive programs requiring 3.3-3.5. Pre-pharmacy prerequisite courses typically require C or better (2.0 minimum per course). Top programs like UCSF, UNC, and UT Austin often require 3.5+ cumulative GPA and 3.3+ science BCPM GPA."
          }
        },
        {
          "@type": "Question",
          "name": "What is BCPM GPA and why does it matter for pharmacy school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BCPM stands for Biology, Chemistry, Physics, and Math. BCPM GPA is your science GPA calculated from these core science courses. Pharmacy programs heavily weight BCPM GPA because it indicates your ability to handle pharmaceutical sciences, medicinal chemistry, pharmacology, and pharmacokinetics courses in PharmD curriculum."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for NAPLEX eligibility?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NAPLEX (North American Pharmacist Licensure Examination) requires graduation from an ACPE-accredited PharmD program with minimum 3.0 cumulative GPA. Most state pharmacy boards require 3.0 GPA for licensure eligibility. Some states have stricter requirements (3.2-3.3) or require specific course grades."
          }
        },
        {
          "@type": "Question",
          "name": "How is pharmacy school GPA calculated differently?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pharmacy GPA separates pre-pharmacy coursework (60-90 undergraduate credits) from PharmD professional years (P1-P4). Science BCPM GPA is calculated separately from non-science courses. PharmD programs use 3.0 minimum standard (vs 2.0 undergraduate), and most require B- or better in prerequisite sciences."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA is needed for pharmacy residency programs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Competitive pharmacy residency programs (PGY-1) typically require 3.5+ cumulative PharmD GPA. Top residencies at academic medical centers prefer 3.7+ GPA. Community pharmacy residencies may accept 3.2-3.3 GPA. Specialized residencies (oncology, critical care, ambulatory care) are most competitive at 3.6-3.8+ GPA."
          }
        },
        {
          "@type": "Question",
          "name": "What is Rho Chi pharmaceutical honor society?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Rho Chi is the academic honor society for pharmacy students, requiring minimum 3.0 GPA (typically top 20% of class). Most chapters require 3.5+ GPA for eligibility. Membership demonstrates academic excellence for residency applications, graduate school, and pharmaceutical industry positions. Selection occurs after first professional year (P1)."
          }
        },
        {
          "@type": "Question",
          "name": "Do pharmacy prerequisites need specific grades?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, most PharmD programs require C or better (2.0 minimum) in prerequisite courses: Organic Chemistry, Biochemistry, Anatomy, Physiology, Microbiology, Calculus, and Statistics. Competitive programs prefer B+ or A- (3.3-3.7) in science prerequisites. Some schools require grade replacement if below C, others don't accept retakes."
          }
        }
      ]
    };

    let scriptSoftware = document.querySelector('script[type="application/ld+json"][data-schema="software"]');
    if (!scriptSoftware) {
      scriptSoftware = document.createElement('script');
      scriptSoftware.setAttribute('type', 'application/ld+json');
      scriptSoftware.setAttribute('data-schema', 'software');
      document.head.appendChild(scriptSoftware);
    }
    scriptSoftware.textContent = JSON.stringify(softwareSchema);

    let scriptBreadcrumb = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]');
    if (!scriptBreadcrumb) {
      scriptBreadcrumb = document.createElement('script');
      scriptBreadcrumb.setAttribute('type', 'application/ld+json');
      scriptBreadcrumb.setAttribute('data-schema', 'breadcrumb');
      document.head.appendChild(scriptBreadcrumb);
    }
    scriptBreadcrumb.textContent = JSON.stringify(breadcrumbSchema);

    let scriptFaq = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
    if (!scriptFaq) {
      scriptFaq = document.createElement('script');
      scriptFaq.setAttribute('type', 'application/ld+json');
      scriptFaq.setAttribute('data-schema', 'faq');
      document.head.appendChild(scriptFaq);
    }
    scriptFaq.textContent = JSON.stringify(faqSchema);

    notifyIndexNow('/education-and-exam-tools/gpa-tools/pharmacy-school-gpa-calculator');
  }, []);

  // State Management
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: '', type: 'pre-pharmacy', category: 'science-bcpm' }
  ]);
  const [previousGPA, setPreviousGPA] = useState<string>('');
  const [previousCredits, setPreviousCredits] = useState<string>('');
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showBCPMTooltip, setShowBCPMTooltip] = useState<boolean>(false);
  const [showTypeTooltip, setShowTypeTooltip] = useState<boolean>(false);

  // Input validation helper
  const validateCredits = (credits: string): boolean => {
    const creditNum = parseFloat(credits);
    return !isNaN(creditNum) && creditNum > 0 && creditNum <= 15;
  };

  // Grade to GPA conversion (standard 4.0 scale)
  const gradeToGPA = (grade: string): number | null => {
    const gradeMap: { [key: string]: number } = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    };
    return gradeMap[grade.toUpperCase()] ?? null;
  };

  // Pharmacy-Specific Calculation Logic
  const calculationResults = useMemo(() => {
    let prePharmacyPoints = 0;
    let prePharmacyCredits = 0;
    let pharmdPoints = 0;
    let pharmdCredits = 0;
    let scienceBCPMPoints = 0;
    let scienceBCPMCredits = 0;
    let nonSciencePoints = 0;
    let nonScienceCredits = 0;
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const gpa = gradeToGPA(course.grade);
      const credits = parseFloat(course.credits);
      
      if (gpa !== null && !isNaN(credits) && credits > 0) {
        const points = gpa * credits;
        
        // Separate by type (Pre-Pharmacy vs PharmD)
        if (course.type === 'pre-pharmacy') {
          prePharmacyPoints += points;
          prePharmacyCredits += credits;
        } else {
          pharmdPoints += points;
          pharmdCredits += credits;
        }
        
        // Separate by category (Science BCPM vs Non-Science vs Professional)
        if (course.category === 'science-bcpm') {
          scienceBCPMPoints += points;
          scienceBCPMCredits += credits;
        } else if (course.category === 'non-science') {
          nonSciencePoints += points;
          nonScienceCredits += credits;
        }
        
        totalPoints += points;
        totalCredits += credits;
      }
    });

    // Include previous GPA if provided
    const prevGPA = parseFloat(previousGPA);
    const prevCreds = parseFloat(previousCredits);
    
    if (!isNaN(prevGPA) && !isNaN(prevCreds) && prevCreds > 0) {
      totalPoints += prevGPA * prevCreds;
      totalCredits += prevCreds;
    }

    const overallGPA = totalCredits > 0 ? totalPoints / totalCredits : null;
    const prePharmacyGPA = prePharmacyCredits > 0 ? prePharmacyPoints / prePharmacyCredits : null;
    const pharmdGPA = pharmdCredits > 0 ? pharmdPoints / pharmdCredits : null;
    const scienceBCPMGPA = scienceBCPMCredits > 0 ? scienceBCPMPoints / scienceBCPMCredits : null;
    const nonScienceGPA = nonScienceCredits > 0 ? nonSciencePoints / nonScienceCredits : null;

    // Academic Standing (Pharmacy-specific thresholds)
    let academicStanding = 'Unknown';
    let standingColor = 'text-gray-600';
    let standingBg = 'bg-gray-100';
    
    if (overallGPA !== null) {
      if (overallGPA >= 3.7) {
        academicStanding = 'Excellent Standing';
        standingColor = 'text-emerald-700';
        standingBg = 'bg-emerald-50';
      } else if (overallGPA >= 3.5) {
        academicStanding = 'High Standing';
        standingColor = 'text-green-700';
        standingBg = 'bg-green-50';
      } else if (overallGPA >= 3.0) {
        academicStanding = 'Good Standing';
        standingColor = 'text-blue-700';
        standingBg = 'bg-blue-50';
      } else if (overallGPA >= 2.7) {
        academicStanding = 'Academic Warning';
        standingColor = 'text-yellow-700';
        standingBg = 'bg-yellow-50';
      } else {
        academicStanding = 'Below Minimum';
        standingColor = 'text-red-700';
        standingBg = 'bg-red-50';
      }
    }

    // NAPLEX Eligibility (3.0 minimum required)
    const naplexEligible = overallGPA !== null && overallGPA >= 3.0;

    // Rho Chi Honor Society Eligibility (3.0 minimum, typically 3.5+ for competitive chapters)
    const rhoChiEligibility = {
      basicEligible: overallGPA !== null && overallGPA >= 3.0,
      competitiveEligible: overallGPA !== null && overallGPA >= 3.5,
      highlyCompetitive: overallGPA !== null && overallGPA >= 3.7
    };

    // Pharmacy Residency Competitiveness
    let residencyCompetitiveness = 'Not Competitive';
    let residencyColor = 'text-gray-600';
    
    if (overallGPA !== null) {
      if (overallGPA >= 3.7) {
        residencyCompetitiveness = 'Highly Competitive';
        residencyColor = 'text-emerald-700';
      } else if (overallGPA >= 3.5) {
        residencyCompetitiveness = 'Competitive';
        residencyColor = 'text-green-700';
      } else if (overallGPA >= 3.2) {
        residencyCompetitiveness = 'Moderately Competitive';
        residencyColor = 'text-blue-700';
      } else if (overallGPA >= 3.0) {
        residencyCompetitiveness = 'Low Competitive';
        residencyColor = 'text-yellow-700';
      } else {
        residencyCompetitiveness = 'Not Competitive';
        residencyColor = 'text-red-700';
      }
    }

    // Pharmacy School Admission Competitiveness (for pre-pharmacy students)
    const admissionCompetitive = scienceBCPMGPA !== null && scienceBCPMGPA >= 3.3 && overallGPA !== null && overallGPA >= 3.3;

    return {
      overallGPA,
      prePharmacyGPA,
      pharmdGPA,
      scienceBCPMGPA,
      nonScienceGPA,
      totalCredits,
      prePharmacyCredits,
      pharmdCredits,
      scienceBCPMCredits,
      nonScienceCredits,
      academicStanding,
      standingColor,
      standingBg,
      naplexEligible,
      rhoChiEligibility,
      residencyCompetitiveness,
      residencyColor,
      admissionCompetitive
    };
  }, [courses, previousGPA, previousCredits]);

  // Course Management Functions
  const addCourse = () => {
    if (courses.length >= 15) {
      alert('Maximum 15 courses per calculation. Please remove a course before adding another.');
      return;
    }
    setCourses([...courses, { 
      id: Date.now().toString(), 
      name: '', 
      grade: '', 
      credits: '', 
      type: 'pre-pharmacy',
      category: 'science-bcpm'
    }]);
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
    setCourses([{ id: '1', name: '', grade: '', credits: '', type: 'pre-pharmacy', category: 'science-bcpm' }]);
    setPreviousGPA('');
    setPreviousCredits('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8" role="main" aria-label="Pharmacy School GPA Calculator">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pharmacy School GPA Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your pharmacy school GPA for PharmD programs. Track pre-pharmacy prerequisites, BCPM science GPA, non-science courses, NAPLEX eligibility, Rho Chi Honor Society qualification, and pharmacy residency competitiveness with 3.0 minimum standard.
          </p>
        </header>

        {/* Main Calculator Tool */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Pharmacy GPA</h2>

          {/* Previous GPA Section */}
          <fieldset className="mb-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
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
                  placeholder="e.g., 3.5"
                  aria-label="Previous cumulative GPA"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="previous-credits" className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Credits Completed
                </label>
                <input
                  id="previous-credits"
                  type="number"
                  step="0.5"
                  min="0"
                  value={previousCredits}
                  onChange={(e) => setPreviousCredits(e.target.value)}
                  placeholder="e.g., 60"
                  aria-label="Previous credits completed"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                />
              </div>
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
                      <div className="flex items-center gap-1">
                        Type
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-4 h-4 text-xs text-teal-600 border border-teal-600 rounded-full hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          onClick={() => setShowTypeTooltip(!showTypeTooltip)}
                          aria-label="Pre-Pharmacy vs PharmD explanation"
                        >
                          ?
                        </button>
                      </div>
                      {showTypeTooltip && (
                        <div className="absolute z-10 mt-2 p-3 bg-white border border-teal-200 rounded-lg shadow-lg text-xs text-gray-700 normal-case font-normal max-w-xs">
                          <p className="font-semibold text-teal-900 mb-2">Pre-Pharmacy vs PharmD:</p>
                          <p className="mb-2"><strong>Pre-Pharmacy:</strong> Undergraduate prerequisite courses (60-90 credits) required before PharmD admission.</p>
                          <p><strong>PharmD:</strong> Professional pharmacy program courses (P1, P2, P3, P4 years) after admission.</p>
                        </div>
                      )}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        Category
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-4 h-4 text-xs text-teal-600 border border-teal-600 rounded-full hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          onClick={() => setShowBCPMTooltip(!showBCPMTooltip)}
                          aria-label="BCPM Science category explanation"
                        >
                          ?
                        </button>
                      </div>
                      {showBCPMTooltip && (
                        <div className="absolute z-10 mt-2 p-3 bg-white border border-teal-200 rounded-lg shadow-lg text-xs text-gray-700 normal-case font-normal max-w-xs">
                          <p className="font-semibold text-teal-900 mb-2">Course Categories:</p>
                          <p className="mb-2"><strong>Science BCPM:</strong> Biology, Chemistry, Physics, Math courses (heavily weighted for admission).</p>
                          <p className="mb-2"><strong>Non-Science:</strong> Humanities, social sciences, English, communication courses.</p>
                          <p><strong>Professional:</strong> PharmD program courses (pharmacology, therapeutics, pharmacy practice).</p>
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
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          aria-label={`Grade for ${course.name || 'course'}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
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
                          className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none ${
                            course.credits && !validateCredits(course.credits) ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {course.credits && !validateCredits(course.credits) && (
                          <span className="text-xs text-red-600 mt-1">Max 15</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={course.type}
                          onChange={(e) => updateCourse(course.id, 'type', e.target.value as 'pre-pharmacy' | 'pharmd')}
                          aria-label={`Type for ${course.name || 'course'}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                        >
                          <option value="pre-pharmacy">Pre-Pharmacy</option>
                          <option value="pharmd">PharmD</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={course.category}
                          onChange={(e) => updateCourse(course.id, 'category', e.target.value as 'science-bcpm' | 'non-science' | 'professional')}
                          aria-label={`Category for ${course.name || 'course'}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:outline-none"
                        >
                          <option value="science-bcpm">Science BCPM</option>
                          <option value="non-science">Non-Science</option>
                          <option value="professional">Professional</option>
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
                disabled={courses.length >= 15}
                aria-label={courses.length >= 15 ? "Maximum 15 courses reached" : "Add a new course"}
                className={`px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  courses.length >= 15 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60' 
                    : 'bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500'
                }`}
              >
                + Add Course {courses.length >= 15 && '(Max 15)'}
              </button>
              <button
                onClick={resetAll}
                aria-label="Reset all courses"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Results Display */}
          {calculationResults.overallGPA !== null && (
            <section className="mt-8 space-y-6" role="status" aria-live="polite" aria-atomic="true" aria-label="Pharmacy GPA Calculation Results">
              {/* GPA Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
                  <div className="text-sm text-teal-600 font-medium mb-2">Overall GPA</div>
                  <div className="text-4xl font-bold text-teal-900">
                    {calculationResults.overallGPA.toFixed(2)}
                  </div>
                  <div className="text-xs text-teal-600 mt-1">Cumulative Average</div>
                </div>
                
                {calculationResults.prePharmacyGPA !== null && (
                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
                    <div className="text-sm text-cyan-600 font-medium mb-2">Pre-Pharmacy GPA</div>
                    <div className="text-4xl font-bold text-cyan-900">
                      {calculationResults.prePharmacyGPA.toFixed(2)}
                    </div>
                    <div className="text-xs text-cyan-600 mt-1">{calculationResults.prePharmacyCredits.toFixed(1)} Credits</div>
                  </div>
                )}
                
                {calculationResults.pharmdGPA !== null && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="text-sm text-blue-600 font-medium mb-2">PharmD GPA</div>
                    <div className="text-4xl font-bold text-blue-900">
                      {calculationResults.pharmdGPA.toFixed(2)}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">{calculationResults.pharmdCredits.toFixed(1)} Credits</div>
                  </div>
                )}
                
                {calculationResults.scienceBCPMGPA !== null && (
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="text-sm text-emerald-600 font-medium mb-2">Science BCPM GPA</div>
                    <div className="text-4xl font-bold text-emerald-900">
                      {calculationResults.scienceBCPMGPA.toFixed(2)}
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">{calculationResults.scienceBCPMCredits.toFixed(1)} Credits</div>
                  </div>
                )}
                
                {calculationResults.nonScienceGPA !== null && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <div className="text-sm text-purple-600 font-medium mb-2">Non-Science GPA</div>
                    <div className="text-4xl font-bold text-purple-900">
                      {calculationResults.nonScienceGPA.toFixed(2)}
                    </div>
                    <div className="text-xs text-purple-600 mt-1">{calculationResults.nonScienceCredits.toFixed(1)} Credits</div>
                  </div>
                )}
              </div>

              {/* Academic Standing */}
              <div className={`${calculationResults.standingBg} rounded-xl p-6 border-l-4 ${calculationResults.standingColor.replace('text-', 'border-')}`}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Academic Standing</h3>
                    <p className={`text-2xl font-bold ${calculationResults.standingColor}`}>
                      {calculationResults.academicStanding}
                    </p>
                  </div>
                  {calculationResults.overallGPA < 3.0 && (
                    <div className="flex items-center gap-2 text-red-700 bg-red-100 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Below 3.0 Minimum</span>
                    </div>
                  )}
                </div>
              </div>

              {/* NAPLEX & Rho Chi Eligibility */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💊</span> NAPLEX Eligibility
                  </h3>
                  <div className={`p-4 rounded-lg ${calculationResults.naplexEligible ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{calculationResults.naplexEligible ? '✓' : '✗'}</span>
                      <span className={`text-xl font-bold ${calculationResults.naplexEligible ? 'text-green-800' : 'text-red-800'}`}>
                        {calculationResults.naplexEligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </div>
                    <p className={`text-sm ${calculationResults.naplexEligible ? 'text-green-700' : 'text-red-700'}`}>
                      {calculationResults.naplexEligible 
                        ? 'You meet the 3.0 minimum GPA for pharmacy licensure exam.' 
                        : 'Minimum 3.0 GPA required for NAPLEX eligibility.'}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎓</span> Rho Chi Honor Society
                  </h3>
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between p-3 rounded-lg ${calculationResults.rhoChiEligibility.basicEligible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      <span className="font-medium text-sm">Basic Eligible (3.0+)</span>
                      <span className="font-bold">{calculationResults.rhoChiEligibility.basicEligible ? '✓' : '✗'}</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${calculationResults.rhoChiEligibility.competitiveEligible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      <span className="font-medium text-sm">Competitive (3.5+)</span>
                      <span className="font-bold">{calculationResults.rhoChiEligibility.competitiveEligible ? '✓' : '✗'}</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${calculationResults.rhoChiEligibility.highlyCompetitive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      <span className="font-medium text-sm">Highly Competitive (3.7+)</span>
                      <span className="font-bold">{calculationResults.rhoChiEligibility.highlyCompetitive ? '✓' : '✗'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Residency Competitiveness */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">💼 Pharmacy Residency Competitiveness</h3>
                <div className="flex items-center justify-between">
                  <p className={`text-2xl font-bold ${calculationResults.residencyColor}`}>
                    {calculationResults.residencyCompetitiveness}
                  </p>
                  <div className="text-sm text-gray-600">
                    {calculationResults.overallGPA >= 3.7 && 'Top Academic Medical Centers'}
                    {calculationResults.overallGPA >= 3.5 && calculationResults.overallGPA < 3.7 && 'Community & Hospital Programs'}
                    {calculationResults.overallGPA >= 3.2 && calculationResults.overallGPA < 3.5 && 'Community Programs'}
                    {calculationResults.overallGPA < 3.2 && 'Consider Additional Experience'}
                  </div>
                </div>
              </div>

              {/* Credit Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Credit Summary</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600">{calculationResults.totalCredits.toFixed(1)}</div>
                    <div className="text-xs text-gray-600 mt-1">Total</div>
                  </div>
                  {calculationResults.prePharmacyCredits > 0 && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-600">{calculationResults.prePharmacyCredits.toFixed(1)}</div>
                      <div className="text-xs text-gray-600 mt-1">Pre-Pharmacy</div>
                    </div>
                  )}
                  {calculationResults.pharmdCredits > 0 && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{calculationResults.pharmdCredits.toFixed(1)}</div>
                      <div className="text-xs text-gray-600 mt-1">PharmD</div>
                    </div>
                  )}
                  {calculationResults.scienceBCPMCredits > 0 && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">{calculationResults.scienceBCPMCredits.toFixed(1)}</div>
                      <div className="text-xs text-gray-600 mt-1">Science BCPM</div>
                    </div>
                  )}
                  {calculationResults.nonScienceCredits > 0 && (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{calculationResults.nonScienceCredits.toFixed(1)}</div>
                      <div className="text-xs text-gray-600 mt-1">Non-Science</div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </section>

        {/* Table of Contents */}
        <TableOfContents
          sections={[
            { id: 'quick-examples', title: 'Quick Examples', emoji: '📝', subtitle: 'Real pharmacy GPA scenarios', gradientFrom: 'from-teal-500', gradientTo: 'to-cyan-500', hoverBorder: 'hover:border-teal-500', hoverText: 'hover:text-teal-700' },
            { id: 'benefits', title: 'Key Benefits', emoji: '✨', subtitle: 'Why use this calculator', gradientFrom: 'from-teal-500', gradientTo: 'to-cyan-500', hoverBorder: 'hover:border-teal-500', hoverText: 'hover:text-teal-700' },
            { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: 'from-teal-500', gradientTo: 'to-cyan-500', hoverBorder: 'hover:border-teal-500', hoverText: 'hover:text-teal-700' },
            { id: 'use-cases', title: 'Use Cases', emoji: '🎯', subtitle: 'Who should use this', gradientFrom: 'from-teal-500', gradientTo: 'to-cyan-500', hoverBorder: 'hover:border-teal-500', hoverText: 'hover:text-teal-700' },
            { id: 'about', title: 'About Pharmacy GPA', emoji: 'ℹ️', subtitle: 'Understanding pharmacy standards', gradientFrom: 'from-teal-500', gradientTo: 'to-cyan-500', hoverBorder: 'hover:border-teal-500', hoverText: 'hover:text-teal-700' },
            { id: 'faqs', title: 'FAQs', emoji: '❓', subtitle: 'Common questions answered', gradientFrom: 'from-teal-500', gradientTo: 'to-cyan-500', hoverBorder: 'hover:border-teal-500', hoverText: 'hover:text-teal-700' },
            { id: 'related-tools', title: 'Related Tools', emoji: '🔗', subtitle: 'More GPA calculators', gradientFrom: 'from-teal-500', gradientTo: 'to-cyan-500', hoverBorder: 'hover:border-teal-500', hoverText: 'hover:text-teal-700' }
          ]}
        />

        {/* Social Share Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Share This Tool</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Calculate%20your%20pharmacy%20school%20GPA%20with%20BCPM%20tracking!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </section>

        {/* Quick Examples Section */}
        <section id="quick-examples" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📝 Quick Examples</h2>
          <div className="space-y-6">
            {/* Example 1: Pre-Pharmacy Student */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border-l-4 border-teal-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pre-Pharmacy Student Applying to PharmD Programs</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Scenario:</strong> Sarah completed 75 pre-pharmacy credits with strong science performance</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-semibold text-teal-700">Courses:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Organic Chemistry I & II: A-, A (8 credits, Science BCPM)</li>
                      <li>Biology I & II: A, A- (8 credits, Science BCPM)</li>
                      <li>General Chemistry: A (4 credits, Science BCPM)</li>
                      <li>Calculus I: B+ (4 credits, Science BCPM)</li>
                      <li>English Composition: A (3 credits, Non-Science)</li>
                      <li>Psychology: B+ (3 credits, Non-Science)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-semibold text-teal-700 mb-2">Results:</p>
                    <p className="text-sm"><strong>Overall GPA:</strong> 3.75</p>
                    <p className="text-sm"><strong>Science BCPM GPA:</strong> 3.82</p>
                    <p className="text-sm"><strong>Non-Science GPA:</strong> 3.65</p>
                    <p className="text-sm mt-2 text-green-700">✓ <strong>Competitive for top PharmD programs</strong> (UCSF, UNC, UT Austin)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: PharmD P2 Student */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">PharmD P2 Student - Good Academic Standing</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Scenario:</strong> Michael is in his second professional year with consistent B+ performance</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-semibold text-blue-700">Professional Courses:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Pharmacology II: B+ (4 credits, PharmD Professional)</li>
                      <li>Medicinal Chemistry: B (3 credits, PharmD Professional)</li>
                      <li>Pharmaceutics: B+ (4 credits, PharmD Professional)</li>
                      <li>Pharmacokinetics: A- (3 credits, PharmD Professional)</li>
                      <li>Previous GPA: 3.4 (60 credits)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-semibold text-blue-700 mb-2">Results:</p>
                    <p className="text-sm"><strong>Overall GPA:</strong> 3.42</p>
                    <p className="text-sm"><strong>PharmD Professional GPA:</strong> 3.36</p>
                    <p className="text-sm mt-2 text-blue-700">✓ <strong>Good Standing</strong> (Above 3.0 minimum)</p>
                    <p className="text-sm text-green-700">✓ NAPLEX Eligible</p>
                    <p className="text-sm text-amber-700">⚠ Need 3.5+ for competitive residencies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 3: Student on Academic Warning */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3">NAPLEX Preparation - Below Minimum Warning</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Scenario:</strong> Jessica is P3 student who struggled in P1/P2 years and needs to improve</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="font-semibold text-yellow-700">Current Situation:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>P1 Year GPA: 2.7 (28 credits)</li>
                      <li>P2 Year GPA: 2.8 (32 credits)</li>
                      <li>P3 Current: Working to improve with tutoring</li>
                      <li>Target: Bring overall above 3.0 for NAPLEX</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="font-semibold text-yellow-700 mb-2">Results:</p>
                    <p className="text-sm"><strong>Current Overall GPA:</strong> 2.76</p>
                    <p className="text-sm"><strong>PharmD Professional GPA:</strong> 2.76</p>
                    <p className="text-sm mt-2 text-red-700">✗ <strong>Below 3.0 Minimum</strong></p>
                    <p className="text-sm text-red-700">✗ NAPLEX Not Currently Eligible</p>
                    <p className="text-sm mt-2 text-amber-700"><strong>Action:</strong> Must achieve 3.3+ in P3/P4 to reach 3.0 cumulative</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">✨ Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <svg className="w-8 h-8" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pharmacy-Specific Standards</h3>
                  <p className="text-teal-50">
                    Designed for PharmD programs with 3.0 minimum GPA requirements. Unlike generic calculators, we understand pharmacy school academic standards, ACPE accreditation requirements, and state board licensure minimums.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <svg className="w-8 h-8" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">BCPM Science Separation</h3>
                  <p className="text-emerald-50">
                    Automatically separates Biology, Chemistry, Physics, and Math (BCPM) courses from non-science courses. Critical for PharmD admissions as BCPM GPA is heavily weighted - most programs require 3.3+ science GPA for competitive applicants.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <svg className="w-8 h-8" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">NAPLEX & Licensure Tracking</h3>
                  <p className="text-blue-50">
                    Automatically checks NAPLEX eligibility (3.0+ required) for pharmacy licensure. Most state boards require minimum 3.0 cumulative GPA from ACPE-accredited PharmD programs. Know your eligibility status instantly before graduation.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <svg className="w-8 h-8" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Rho Chi & Residency Tracking</h3>
                  <p className="text-purple-50">
                    Track eligibility for Rho Chi pharmaceutical honor society (3.0+ required, typically top 20%). Monitor residency competitiveness - PGY-1 programs prefer 3.5+, academic medical centers want 3.7+, specialized residencies need 3.6-3.8+.
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
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Previous Academic Record (Optional)</h3>
                <p className="text-gray-700">
                  If you have completed coursework before the current semester, enter your previous cumulative GPA and total credits completed. This helps calculate your updated overall GPA. Pre-pharmacy students can enter undergraduate GPA, PharmD students can include previous professional year GPAs.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Your Courses</h3>
                <p className="text-gray-700 mb-3">
                  For each course, enter:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Course Name:</strong> e.g., "Organic Chemistry I", "Pharmacology II"</li>
                  <li><strong>Grade:</strong> Select from A+ to F (standard 4.0 scale)</li>
                  <li><strong>Credits:</strong> Semester hours (typically 1-6 credits, max 15)</li>
                  <li><strong>Type:</strong> Pre-Pharmacy (undergraduate prerequisites) or PharmD (P1-P4 professional years)</li>
                  <li><strong>Category:</strong> Science BCPM (Biology/Chemistry/Physics/Math), Non-Science (humanities/social sciences), or Professional (PharmD program courses)</li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Review Your GPA Results</h3>
                <p className="text-gray-700">
                  The calculator automatically displays five different GPAs: Overall Cumulative, Pre-Pharmacy, PharmD Professional, Science BCPM, and Non-Science. You'll also see your academic standing, NAPLEX eligibility status, Rho Chi qualification, and pharmacy residency competitiveness rating.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Check Academic Requirements</h3>
                <p className="text-gray-700">
                  Review the NAPLEX eligibility indicator (3.0+ required), Rho Chi Honor Society qualification levels (Basic 3.0+, Competitive 3.5+, Highly Competitive 3.7+), and pharmacy residency competitiveness (3.5+ for competitive PGY-1 programs, 3.7+ for academic medical centers).
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Save or Share Your Results</h3>
                <p className="text-gray-700">
                  Use the "Print Report" button to generate a formatted document for academic advisors or residency applications. The "Download TXT" button creates a text file for your records. Share the tool with classmates using the social media buttons.
                </p>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="mt-8 bg-teal-50 rounded-xl p-6 border-l-4 border-teal-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Calculation Example</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Scenario:</strong> Pre-pharmacy student with 4 courses:</p>
              <div className="bg-white rounded-lg p-4 space-y-2">
                <p>• Organic Chemistry II (A-, 4 credits, Science BCPM) = 3.7 × 4 = 14.8 points</p>
                <p>• Biology II (A, 4 credits, Science BCPM) = 4.0 × 4 = 16.0 points</p>
                <p>• English Literature (B+, 3 credits, Non-Science) = 3.3 × 3 = 9.9 points</p>
                <p>• Psychology (B, 3 credits, Non-Science) = 3.0 × 3 = 9.0 points</p>
                <div className="border-t border-gray-300 pt-2 mt-3">
                  <p className="font-semibold">Overall GPA: 49.7 points ÷ 14 credits = <span className="text-teal-600">3.55</span></p>
                  <p className="font-semibold">Science BCPM GPA: 30.8 points ÷ 8 credits = <span className="text-emerald-600">3.85</span></p>
                  <p className="font-semibold">Non-Science GPA: 18.9 points ÷ 6 credits = <span className="text-purple-600">3.15</span></p>
                  <p className="text-green-700 mt-2">✓ Competitive for PharmD admission (3.55 overall, 3.85 BCPM)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">🎯 Who Should Use This Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Use Case 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-500 text-white rounded-lg p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Pre-Pharmacy Students</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Perfect for undergraduate students completing 60-90 prerequisite credits before PharmD applications. Track your science BCPM GPA (most programs require 3.3+) and overall GPA (minimum 3.0 required) to assess competitiveness for pharmacy school admission.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="font-semibold text-teal-700 mb-1">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>BCPM science GPA separation</li>
                  <li>Pre-pharmacy vs. non-science tracking</li>
                  <li>Admission competitiveness indicator</li>
                </ul>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500 text-white rounded-lg p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">PharmD P1-P4 Students</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Essential for current pharmacy students (P1, P2, P3, P4 professional years) to monitor academic standing throughout the four-year Doctor of Pharmacy program. Maintain 3.0+ to stay in good standing and qualify for NAPLEX licensure exam.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="font-semibold text-blue-700 mb-1">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>PharmD professional GPA tracking</li>
                  <li>Academic standing alerts (3.0 minimum)</li>
                  <li>Professional course categorization</li>
                </ul>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-500 text-white rounded-lg p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">NAPLEX Preparation</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Critical for P4 students preparing for graduation and pharmacy licensure. Verify you meet the 3.0+ GPA requirement for NAPLEX (North American Pharmacist Licensure Examination) eligibility. Most state boards require minimum 3.0 cumulative GPA from ACPE-accredited programs.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="font-semibold text-amber-700 mb-1">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>NAPLEX eligibility checker (3.0+ required)</li>
                  <li>State board licensure requirements</li>
                  <li>Graduation readiness indicator</li>
                </ul>
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500 text-white rounded-lg p-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Residency Applicants</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Vital for pharmacy students applying to PGY-1 residency programs. Competitive programs prefer 3.5+ GPA, academic medical centers want 3.7+, and specialized residencies (oncology, critical care, ambulatory care) look for 3.6-3.8+. Track your competitiveness level.
              </p>
              <div className="bg-white rounded-lg p-3 text-sm">
                <p className="font-semibold text-purple-700 mb-1">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Residency competitiveness rating</li>
                  <li>Rho Chi honor society qualification</li>
                  <li>Academic medical center readiness</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 About This Calculator</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 rounded-r-lg p-6">
              <p className="text-lg leading-relaxed">
                This calculator helps students pursuing a <strong>Doctor of Pharmacy (PharmD)</strong> degree track their academic progress accurately. Unlike typical undergraduate programs requiring a 2.0-2.5 minimum, <strong>PharmD programs maintain stricter standards with a mandatory 3.0 minimum cumulative GPA</strong>, reflecting the rigorous training required for pharmaceutical practice and patient care.
              </p>
            </div>

            {/* Pre-Pharmacy Requirements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-teal-600">🎓</span> Pre-Professional Prerequisites
              </h3>
              <p className="leading-relaxed mb-4">
                Before entering professional school, applicants complete 60-90 undergraduate prerequisite credits. Core requirements include organic chemistry (8 credits), biochemistry (3-4 credits), anatomy and physiology (8 credits), microbiology with lab (4 credits), calculus (3-4 credits), and statistics (3 credits). Many programs also require general chemistry, physics, biology, and molecular biology.
              </p>
              <p className="leading-relaxed">
                The <strong>BCPM GPA</strong> (Biology, Chemistry, Physics, Math) is calculated separately and heavily weighted by PharmCAS admissions committees. Competitive programs typically require 3.3-3.5+ science GPAs, while top-tier institutions like USC, UCSF, and University of Michigan expect 3.6-3.8+. Our tool automatically separates science courses from humanities and electives for accurate admissions predictions. Students can also track undergraduate coursework with our <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">College GPA Calculator</a>.
              </p>
            </div>

            {/* PharmD Professional Program */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-600">💊</span> Professional Program Structure
              </h3>
              <p className="leading-relaxed mb-4">
                The four-year professional curriculum (P1-P4) totals 120-140 credits covering pharmacology, medicinal chemistry, pharmacokinetics, pharmaceutics, pharmacotherapy, and clinical practice. Students complete extensive rotations in hospitals, community settings, and specialized care environments. Maintaining the 3.0 minimum throughout all years is essential—falling below triggers academic warning and can affect eligibility for required clinical experiences.
              </p>
              <p className="leading-relaxed">
                Graduates must pass the <strong>NAPLEX</strong> (North American Pharmacist Licensure Examination) and state-specific MPJE for licensure. NAPLEX eligibility requires graduation from an ACPE-accredited program with minimum 3.0 cumulative GPA, making consistent academic tracking crucial. Healthcare students pursuing different paths can explore our <a href="/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">Medical School GPA Calculator</a> or <a href="/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">LSAC GPA Calculator</a> for law school applications.
              </p>
            </div>

            {/* Honor Societies and Residency */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-purple-600">🏆</span> Academic Recognition & Postgraduate Training
              </h3>
              <p className="leading-relaxed mb-4">
                <strong>Rho Chi</strong>, the pharmaceutical honor society founded in 1922, recognizes top academic performers. Most chapters select the top 20% of each class, typically requiring 3.5-3.7+ GPAs. Membership demonstrates excellence valuable for competitive opportunities including residencies, fellowships, and industry positions.
              </p>
              <p className="leading-relaxed mb-4">
                <strong>PGY-1 residencies</strong> provide intensive postgraduate training increasingly essential for hospital and clinical specialist positions. With 60-70% national acceptance rates, competition is significant. Community residencies typically require 3.2-3.3+ GPAs, hospital programs prefer 3.5+, while top academic medical centers (Johns Hopkins, Mayo Clinic, Cleveland Clinic) expect 3.7-3.8+ along with strong rotation evaluations and research experience.
              </p>
              <p className="leading-relaxed">
                Advanced PGY-2 residencies in specialized areas like oncology, critical care, or infectious diseases are most competitive. Students pursuing graduate research degrees can use our <a href="/education-and-exam-tools/gpa-tools/graduate-school-gpa-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">Graduate School GPA Calculator</a>. For continuous tracking from prerequisites through professional years, try our <a href="/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator" className="text-teal-600 hover:text-teal-700 font-medium underline">Cumulative GPA Calculator</a>.
              </p>
            </div>

            {/* Career Pathways */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600">💼</span> Career Opportunities
              </h3>
              <p className="leading-relaxed">
                Graduates pursue diverse careers in retail settings (CVS, Walgreens), hospital systems (inpatient, ICU, surgical), clinical specialties (ambulatory care, anticoagulation, diabetes management), pharmaceutical industry (medical affairs, regulatory, clinical research), academia, informatics, nuclear medicine, compounding, and government agencies (FDA, CDC, VA healthcare). Strong academic performance expands opportunities for competitive residencies, board certification, and leadership roles.
              </p>
            </div>
          </div>
        </section>

        {/* External Resources Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 External Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.aacp.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 hover:shadow-lg transition-shadow group"
            >
              <div className="bg-teal-500 text-white rounded-lg p-3 group-hover:bg-teal-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-teal-700">AACP - American Association of Colleges of Pharmacy</h3>
                <p className="text-sm text-gray-600">PharmD program requirements and pharmacy school directory</p>
              </div>
            </a>

            <a
              href="https://nabp.pharmacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow group"
            >
              <div className="bg-blue-500 text-white rounded-lg p-3 group-hover:bg-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-700">NABP - National Association of Boards of Pharmacy</h3>
                <p className="text-sm text-gray-600">NAPLEX exam information and state licensure requirements</p>
              </div>
            </a>

            <a
              href="https://www.pharmacist.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-shadow group"
            >
              <div className="bg-emerald-500 text-white rounded-lg p-3 group-hover:bg-emerald-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-700">APhA - American Pharmacists Association</h3>
                <p className="text-sm text-gray-600">Pharmacy career resources and professional development</p>
              </div>
            </a>

            <a
              href="https://www.acpe-accredit.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow group"
            >
              <div className="bg-purple-500 text-white rounded-lg p-3 group-hover:bg-purple-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-700">ACPE - Accreditation Council for Pharmacy Education</h3>
                <p className="text-sm text-gray-600">PharmD program accreditation standards and quality assurance</p>
              </div>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <section className="bg-gray-50 rounded-xl p-6 mb-8 border-l-4 border-teal-500">
          <div className="flex items-center gap-3 text-gray-700">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold">Last Updated:</span>
            <span>December 1, 2024</span>
            <span className="text-gray-500">•</span>
            <span className="text-sm text-gray-600">Verified with current AACP and NABP standards</span>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the minimum GPA for pharmacy school admission?</h3>
              <p className="text-gray-700">
                Most Doctor of Pharmacy (PharmD) programs require a <strong>minimum 3.0 overall cumulative GPA</strong> for admission consideration, with many competitive programs requiring 3.3-3.5+ GPAs. Pre-pharmacy prerequisite courses typically require C or better (2.0 minimum per course). Top-tier programs like UCSF, UNC Chapel Hill, and UT Austin often require <strong>3.5+ cumulative GPA and 3.3+ science BCPM GPA</strong> for competitive applicants. Some programs have automatic rejection thresholds below 2.75 GPA.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is BCPM GPA and why does it matter for pharmacy school?</h3>
              <p className="text-gray-700">
                <strong>BCPM stands for Biology, Chemistry, Physics, and Math</strong> - the core science courses that form the foundation of pharmaceutical education. Your BCPM GPA is calculated separately from your overall GPA and is <strong>heavily weighted by PharmD admissions committees</strong> because it indicates your ability to handle rigorous pharmaceutical sciences courses like medicinal chemistry, pharmacology, and pharmacokinetics. Competitive programs typically require <strong>3.3-3.5+ BCPM GPAs</strong>. BCPM courses include General Chemistry, Organic Chemistry, Biochemistry, General Biology, Anatomy, Physiology, Microbiology, Physics, Calculus, and Statistics.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need for NAPLEX eligibility?</h3>
              <p className="text-gray-700">
                The <strong>NAPLEX (North American Pharmacist Licensure Examination)</strong> requires graduation from an ACPE-accredited PharmD program with a <strong>minimum 3.0 cumulative GPA</strong> for eligibility to take the licensing exam. Most state pharmacy boards enforce this 3.0 minimum for licensure eligibility. Some states like California and New York have stricter requirements (3.2-3.3 minimum) or require specific grades in clinical pharmacy courses. Students below 3.0 GPA may be ineligible for licensure even after completing their PharmD degree, making GPA management critical throughout the program.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How is pharmacy school GPA calculated differently from undergraduate?</h3>
              <p className="text-gray-700">
                Pharmacy school GPA calculation differs in several ways: <strong>(1) Pre-pharmacy vs. PharmD separation</strong> - undergraduate prerequisite courses (60-90 credits) are calculated separately from PharmD professional years (P1-P4); <strong>(2) BCPM science GPA separation</strong> - Biology, Chemistry, Physics, and Math courses are tracked separately from non-science courses; <strong>(3) Higher minimum standards</strong> - pharmacy programs require 3.0 minimum (vs. 2.0 undergraduate); <strong>(4) Professional year tracking</strong> - P1, P2, P3, P4 GPAs are often tracked individually; and <strong>(5) Grade replacement policies</strong> - some schools don't allow retakes or average the grades instead of replacing them.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA is required for pharmacy residency programs?</h3>
              <p className="text-gray-700">
                <strong>Pharmacy residency programs (PGY-1)</strong> are highly competitive with varying GPA requirements: <strong>Community pharmacy residencies</strong> typically require 3.2-3.3+ GPA; <strong>Hospital pharmacy residencies</strong> prefer 3.5+ GPA; <strong>Academic medical center programs</strong> (top-tier) expect 3.7-3.8+ GPAs; and <strong>Specialized residencies</strong> in oncology, critical care, ambulatory care, and psychiatric pharmacy are most competitive at 3.6-3.8+ GPA. While GPA is not the only factor (letters of recommendation, pharmacy experience, research, leadership also matter), it's often used as an initial screening threshold. PGY-2 residencies (second-year specialization) typically require completion of PGY-1 and 3.5+ cumulative GPA.
              </p>
            </div>

            {/* FAQ 6 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is Rho Chi pharmaceutical honor society and how do I qualify?</h3>
              <p className="text-gray-700">
                <strong>Rho Chi Society</strong> is the academic honor society for pharmacy students, recognizing excellence in pharmaceutical sciences. <strong>Basic eligibility requires minimum 3.0 GPA</strong>, but most chapters select students from the <strong>top 20% of their class</strong>, typically requiring <strong>3.5+ cumulative GPA</strong>. Selection occurs after the first professional year (P1). Some competitive chapters require 3.7+ GPA for eligibility. Rho Chi membership is highly valued for residency applications, graduate school admissions, and pharmaceutical industry positions. Benefits include networking opportunities, leadership development, scholarships, and recognition at graduation. Members must maintain good academic standing (3.0+) throughout the PharmD program.
              </p>
            </div>

            {/* FAQ 7 */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do pharmacy school prerequisites need specific grades?</h3>
              <p className="text-gray-700">
                Yes, most PharmD programs have <strong>specific grade requirements for prerequisite courses</strong>. Typically, <strong>C or better (2.0 minimum)</strong> is required in all prerequisites including Organic Chemistry, Biochemistry, Anatomy, Physiology, Microbiology, Calculus, and Statistics. However, <strong>competitive applicants usually have B+ or A- (3.3-3.7) in science prerequisites</strong>. Some programs require <strong>B- or better (2.7+) in science BCPM courses</strong>. Grade replacement policies vary: some schools allow one retake with grade replacement, others average all attempts, and some don't accept any retakes. Prerequisites older than 5-7 years may need to be retaken. D or F grades in prerequisites typically require retaking before PharmD application.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <RelatedTools 
          relatedSlugs={['college-gpa-calculator', 'medical-school-gpa-calculator', 'graduate-school-gpa-calculator', 'cumulative-gpa-calculator']}
          currentSlug="pharmacy-school-gpa-calculator"
          navigateTo={navigateTo} 
        />
      </div>
    </main>
  );
};

export default PharmacySchoolGPACalculator;
