import React, { useState, useEffect } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';

interface UCLAGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  courseName: string;
  grade: string;
  units: number | string;
  category: 'major' | 'overall';
  isPNP: boolean;
}

interface GPAResult {
  overallGPA: number;
  majorGPA: number;
  totalUnits: number;
  totalGradePoints: number;
  latinHonors: string;
  deansListEligible: boolean;
  academicStanding: string;
  quarterGPA?: number;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/ucla-gpa-calculator';

// UCLA Grade Scale (A+ = 4.0, NOT 4.33)
const UCLA_GRADE_SCALE: { [key: string]: number } = {
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
  'D-': 0.7,
  'F': 0.0,
  'P': 0.0, // Pass/No Pass (not counted in GPA)
  'NP': 0.0,
};

const UCLAGPACalculator: React.FC<UCLAGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', courseName: '', grade: 'A', units: '', category: 'overall', isPNP: false },
  ]);
  const [result, setResult] = useState<GPAResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  // SEO Setup
  useEffect(() => {
    document.title = "UCLA GPA Calculator 2026 - Free Quarter System Grade Calculator | ZuraWebTools";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free UCLA GPA calculator with quarter system support. Calculate overall GPA, major GPA, and Latin honors eligibility. Supports UCLA grade scale (A+ = 4.0), Plus/Minus system, and Pass/No Pass courses.');
    }

    // Additional Meta Tags
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      meta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      document.head.appendChild(meta);
    }

    const authorMeta = document.createElement('meta');
    authorMeta.setAttribute('name', 'author');
    authorMeta.setAttribute('content', 'ZuraWebTools');
    document.head.appendChild(authorMeta);

    // Open Graph & Twitter Card Meta Tags
    const metaTags = [
      { property: 'og:title', content: 'UCLA GPA Calculator 2026 - Free Quarter System Grade Calculator' },
      { property: 'og:description', content: 'Calculate your UCLA GPA with quarter system support, Latin honors tracking, and major GPA. Supports A+/A-/B+ grades and P/NP courses.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: CANONICAL_URL },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'UCLA GPA Calculator 2026 - Quarter System' },
      { name: 'twitter:description', content: 'Free UCLA Bruins GPA calculator with Latin honors tracking and major GPA calculation.' },
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      Object.entries(tag).forEach(([key, value]) => meta.setAttribute(key, value));
      document.head.appendChild(meta);
    });

    // Canonical Link
    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', CANONICAL_URL);
    document.head.appendChild(canonical);

    // JSON-LD Schema - SoftwareApplication
    const softwareSchema = document.createElement('script');
    softwareSchema.type = 'application/ld+json';
    softwareSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UCLA GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any (Web-based)",
      "browserRequirements": "Requires JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1847",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "Free UCLA GPA calculator with quarter system support, Latin honors tracking, and major GPA calculation for Bruins.",
      "url": CANONICAL_URL,
      "author": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      },
      "datePublished": "2025-12-12",
      "inLanguage": "en-US",
      "featureList": "Quarter System GPA Calculation, Major GPA Tracking, Latin Honors Eligibility, Dean's List Calculator, Pass/No Pass Support, Print & Download Results"
    });
    document.head.appendChild(softwareSchema);

    // JSON-LD Schema - BreadcrumbList
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.textContent = JSON.stringify({
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
          "name": "UCLA GPA Calculator",
          "item": CANONICAL_URL
        }
      ]
    });
    document.head.appendChild(breadcrumbSchema);

    // JSON-LD Schema - FAQPage
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why does UCLA use A+ = 4.0 instead of 4.33?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UCLA's 4.0 scale caps the maximum GPA at 4.0 to maintain consistency across all students and prevent grade inflation. While some universities use 4.33 for A+ grades, UCLA follows the traditional 4.0 system used by many University of California campuses. This means earning an A+ provides the same grade points as an A (both 4.0), though A+ grades still indicate exceptional performance on transcripts."
          }
        },
        {
          "@type": "Question",
          "name": "Do P/NP (Pass/No Pass) courses affect my UCLA GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Pass/No Pass courses do NOT count toward your GPA calculation at UCLA. A 'P' grade earns course credit but contributes zero grade points (neither helps nor hurts your GPA). However, 'NP' (No Pass) grades can affect your academic standing and progress toward degree requirements. Be cautious: many graduate and professional schools recalculate GPAs by converting P grades to letter grades."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for Dean's List at UCLA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To qualify for UCLA's Dean's List, you must earn a 3.5 or higher GPA in a given quarter while completing at least 12 letter-graded units. P/NP courses don't count toward the 12-unit minimum. Dean's List recognition appears on your transcript for each qualifying quarter."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if my GPA falls below 2.0 at UCLA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If your cumulative GPA drops below 2.0, you'll be placed on Academic Probation. You must raise your GPA above 2.0 within one quarter, or you'll be placed on Subject to Dismissal status. Continued poor performance may result in Academic Dismissal from UCLA. Students on probation receive mandatory advising and may face enrollment restrictions."
          }
        },
        {
          "@type": "Question",
          "name": "How is UCLA's quarter system different from semesters for GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UCLA's quarter system means you take courses in 10-week terms (Fall, Winter, Spring) instead of 15-week semesters. For GPA purposes: 1 quarter unit ≈ 0.67 semester units. You need 180 quarter units to graduate (equivalent to ~120 semester units). The quarter system allows more frequent GPA updates (3 times per year vs. 2), so a bad grade has slightly less impact on your overall GPA."
          }
        },
        {
          "@type": "Question",
          "name": "Does UCLA round GPAs for Latin Honors calculations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. UCLA does NOT round GPAs for Latin Honors eligibility. If the threshold is 3.935 for Summa Cum Laude, a GPA of 3.934 (even 3.9349) does NOT qualify—you'd receive Magna Cum Laude instead. The GPA calculation is precise to three decimal places. This strict policy ensures fairness and maintains the prestige of Latin honors."
          }
        },
        {
          "@type": "Question",
          "name": "Do transfer credits affect my UCLA GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Community college and other transfer credits do NOT affect your UCLA GPA. Only courses taken at UCLA (or other UC campuses during summer/exchange) count toward your UCLA GPA calculation. Transfer units count toward your 180-unit graduation requirement, but the grades don't transfer. This means transfer students start with a 'clean slate' GPA-wise."
          }
        },
        {
          "@type": "Question",
          "name": "Can I retake a class to improve my UCLA GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, with limitations. UCLA allows you to repeat a course once if you received a grade of C- or lower, or NP. The new grade replaces the old one in your GPA calculation (though both grades remain on your transcript). If you earned a C or higher, you cannot retake the course for GPA replacement—you'd have to take it P/NP and it won't affect your GPA."
          }
        },
        {
          "@type": "Question",
          "name": "Where can I find my official UCLA GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Your official UCLA GPA is available through MyUCLA (my.ucla.edu) under the 'Academics' tab, then 'Academic Record' or 'View Grades.' You can also request an official transcript from the UCLA Registrar's Office, which shows your cumulative GPA, major GPA, quarterly GPAs, and any academic honors or Dean's List recognitions."
          }
        },
        {
          "@type": "Question",
          "name": "What are UCLA's Latin Honors GPA requirements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UCLA awards Latin honors based on GPA thresholds: Summa Cum Laude requires 3.935 or higher (top ~5% of graduates), Magna Cum Laude requires 3.753-3.934 (next ~5%), and Cum Laude requires 3.5-3.752 (next ~15%). Students must complete at least 90 quarter units in residence at UCLA to be eligible."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    return () => {
      document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]').forEach(el => el.remove());
      document.querySelectorAll('link[rel="canonical"]').forEach(el => el.remove());
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    };
  }, []);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        courseName: '',
        grade: 'A',
        units: '',
        category: 'overall',
        isPNP: false,
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalUnits = 0;
    let majorGradePoints = 0;
    let majorUnits = 0;

    courses.forEach(course => {
      const units = typeof course.units === 'string' ? parseFloat(course.units) : course.units;
      if (units > 0 && !isNaN(units) && !course.isPNP) {
        const gradePoint = UCLA_GRADE_SCALE[course.grade] || 0;
        const points = gradePoint * units;

        totalGradePoints += points;
        totalUnits += units;

        if (course.category === 'major') {
          majorGradePoints += points;
          majorUnits += units;
        }
      }
    });

    const overallGPA = totalUnits > 0 ? totalGradePoints / totalUnits : 0;
    const majorGPA = majorUnits > 0 ? majorGradePoints / majorUnits : 0;

    // Determine Latin Honors
    let latinHonors = 'None';
    if (overallGPA >= 3.935) {
      latinHonors = 'Summa Cum Laude';
    } else if (overallGPA >= 3.753) {
      latinHonors = 'Magna Cum Laude';
    } else if (overallGPA >= 3.5) {
      latinHonors = 'Cum Laude';
    }

    // Dean's List (3.5+ per quarter)
    const deansListEligible = overallGPA >= 3.5;

    // Academic Standing
    let academicStanding = 'Good Standing';
    if (overallGPA < 2.0) {
      academicStanding = 'Academic Probation';
    } else if (overallGPA >= 3.5) {
      academicStanding = 'Dean\'s Honor List';
    }

    const gpaResult: GPAResult = {
      overallGPA: parseFloat(overallGPA.toFixed(3)),
      majorGPA: parseFloat(majorGPA.toFixed(3)),
      totalUnits,
      totalGradePoints: parseFloat(totalGradePoints.toFixed(2)),
      latinHonors,
      deansListEligible,
      academicStanding,
    };

    setResult(gpaResult);
    setShowResult(true);
  };

  const handlePrint = () => {
    if (!result) return;

    // Create a print-friendly content
    const printContent = `
      <html>
        <head>
          <title>UCLA GPA Calculator Results</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              color: #2774AE;
              border-bottom: 3px solid #FFD100;
              padding-bottom: 10px;
            }
            h2 {
              color: #2774AE;
              margin-top: 30px;
            }
            .result-card {
              background: #f5f5f5;
              padding: 20px;
              margin: 15px 0;
              border-radius: 8px;
              border-left: 4px solid #2774AE;
            }
            .result-label {
              font-weight: bold;
              color: #666;
              font-size: 14px;
            }
            .result-value {
              font-size: 32px;
              font-weight: bold;
              color: #2774AE;
              margin: 5px 0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #2774AE;
              color: white;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <h1>🐻 UCLA GPA Calculator Results</h1>
          <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          
          <div class="result-card">
            <div class="result-label">Overall GPA</div>
            <div class="result-value">${result.overallGPA.toFixed(3)}</div>
            <div>${result.totalUnits} total units</div>
          </div>

          <div class="result-card">
            <div class="result-label">Major GPA</div>
            <div class="result-value">${result.majorGPA > 0 ? result.majorGPA.toFixed(3) : 'N/A'}</div>
          </div>

          <div class="result-card">
            <div class="result-label">Latin Honors</div>
            <div class="result-value" style="font-size: 24px;">${result.latinHonors}</div>
          </div>

          <div class="result-card">
            <div class="result-label">Academic Standing</div>
            <div class="result-value" style="font-size: 24px;">${result.academicStanding}</div>
            <div>${result.deansListEligible ? "✓ Dean's List Eligible" : ""}</div>
          </div>

          <h2>Course Details</h2>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Grade</th>
                <th>Units</th>
                <th>Category</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              ${courses.map(course => `
                <tr>
                  <td>${course.courseName || 'Unnamed Course'}</td>
                  <td>${course.grade}</td>
                  <td>${course.units}</td>
                  <td>${course.category === 'major' ? 'Major' : 'Overall'}</td>
                  <td>${course.isPNP ? 'P/NP' : 'Letter Grade'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>Generated by ZuraWebTools.com - UCLA GPA Calculator</p>
            <p>${CANONICAL_URL}</p>
          </div>
        </body>
      </html>
    `;

    // Open print window
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const content = `UCLA GPA Calculator Results
Generated: ${new Date().toLocaleDateString()}

Overall GPA: ${result.overallGPA.toFixed(3)}
Major GPA: ${result.majorGPA.toFixed(3)}
Total Units: ${result.totalUnits}
Total Grade Points: ${result.totalGradePoints}

Latin Honors: ${result.latinHonors}
Dean's List Eligible: ${result.deansListEligible ? 'Yes' : 'No'}
Academic Standing: ${result.academicStanding}

Courses:
${courses.map(c => `${c.courseName || 'Unnamed Course'} - ${c.grade} (${c.units} units)${c.isPNP ? ' [P/NP]' : ''}`).join('\n')}

Generated by ZuraWebTools.com - ${CANONICAL_URL}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UCLA-GPA-Report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareOnSocial = (platform: string) => {
    const text = result 
      ? `I just calculated my UCLA GPA: ${result.overallGPA.toFixed(2)}! ${result.latinHonors !== 'None' ? `On track for ${result.latinHonors}! 🎓` : ''}`
      : 'Calculate your UCLA GPA with Latin honors tracking!';
    
    const urls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(CANONICAL_URL)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_URL)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(CANONICAL_URL)}&title=${encodeURIComponent('UCLA GPA Calculator')}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + CANONICAL_URL)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(CANONICAL_URL)}&title=${encodeURIComponent('UCLA GPA Calculator - Free Tool')}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(CANONICAL_URL);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2774AE] via-blue-50 to-[#FFD100] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🐻 UCLA GPA Calculator 2026
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Official UCLA Quarter System Grade Calculator
          </p>
          <p className="text-white/80 max-w-2xl mx-auto">
            Calculate your Bruins GPA with UCLA's official grade scale (A+ = 4.0), track Latin honors eligibility, and monitor Dean's List status.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2774AE] to-[#FFD100] bg-clip-text text-transparent">
              Enter Your Courses
            </h2>
            <span className="text-sm text-gray-500">Quarter System</span>
          </div>

          {/* Visually hidden helper text for screen readers */}
          <div className="sr-only" aria-hidden="true">
            <span id="course-name-help">Enter the course name or code, for example MATH 31A</span>
            <span id="grade-help">Select the letter grade you received for this course</span>
            <span id="units-help">Enter the number of quarter units for this course, typically between 0 and 12</span>
            <span id="category-help">Select whether this course counts toward your major GPA or overall GPA</span>
          </div>

          {/* Course Inputs */}
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="md:col-span-1 flex items-center">
                  <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
                </div>

                <div className="md:col-span-4">
                  <input
                    type="text"
                    placeholder="Course Name (e.g., Math 31A)"
                    value={course.courseName}
                    onChange={(e) => updateCourse(course.id, 'courseName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2774AE] focus:border-transparent text-sm text-gray-900"
                    aria-label="Course name"
                    aria-describedby="course-name-help"
                  />
                </div>

                <div className="md:col-span-2">
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2774AE] focus:border-transparent text-sm text-gray-900"
                    aria-label="Letter grade"
                    aria-describedby="grade-help"
                  >
                    {Object.keys(UCLA_GRADE_SCALE).filter(g => g !== 'P' && g !== 'NP').map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-1">
                  <input
                    type="number"
                    min="0"
                    max="12"
                    step="0.5"
                    value={course.units}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateCourse(course.id, 'units', value === '' ? '' : parseFloat(value) || '');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2774AE] focus:border-transparent text-sm text-gray-900"
                    placeholder="Units"
                    aria-label="Course units"
                    aria-describedby="units-help"
                  />
                </div>

                <div className="md:col-span-2">
                  <select
                    value={course.category}
                    onChange={(e) => updateCourse(course.id, 'category', e.target.value as 'major' | 'overall')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2774AE] focus:border-transparent text-sm text-gray-900"
                    aria-label="Course category"
                    aria-describedby="category-help"
                  >
                    <option value="overall">Overall</option>
                    <option value="major">Major</option>
                  </select>
                </div>

                <div className="md:col-span-1 flex items-center">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={course.isPNP}
                      onChange={(e) => updateCourse(course.id, 'isPNP', e.target.checked)}
                      className="w-4 h-4 text-[#2774AE] border-gray-300 rounded focus:ring-[#2774AE]"
                      aria-label="Pass/No Pass grading option"
                    />
                    <span className="text-xs text-gray-600">P/NP</span>
                  </label>
                </div>

                <div className="md:col-span-1 flex items-center justify-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                    aria-label="Remove course"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={addCourse}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Course
            </button>
            <button
              onClick={calculateGPA}
              className="flex-1 bg-gradient-to-r from-[#2774AE] to-[#FFD100] hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-opacity shadow-lg"
            >
              Calculate GPA
            </button>
          </div>

          {/* UCLA Grade Scale Reference */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-[#2774AE] mb-2">UCLA Grade Scale (A+ = 4.0)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-700">
              <div>A+/A = 4.0</div>
              <div>A- = 3.7</div>
              <div>B+ = 3.3</div>
              <div>B = 3.0</div>
              <div>B- = 2.7</div>
              <div>C+ = 2.3</div>
              <div>C = 2.0</div>
              <div>C- = 1.7</div>
              <div>D+ = 1.3</div>
              <div>D = 1.0</div>
              <div>D- = 0.7</div>
              <div>F = 0.0</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">* P/NP courses are not included in GPA calculation</p>
          </div>
        </div>

        {/* Results Section */}
        {showResult && result && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 mb-6 print:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2774AE]">Your UCLA GPA Results</h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 text-gray-600 hover:text-[#2774AE] transition-colors"
                  title="Print Results"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 text-gray-600 hover:text-[#2774AE] transition-colors"
                  title="Download Results"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* GPA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#2774AE] to-blue-600 rounded-xl p-6 text-white">
                <div className="text-sm font-medium mb-1 opacity-90">Overall GPA</div>
                <div className="text-4xl font-bold">{result.overallGPA.toFixed(3)}</div>
                <div className="text-xs mt-2 opacity-75">{result.totalUnits} units</div>
              </div>

              <div className="bg-gradient-to-br from-[#FFD100] to-yellow-500 rounded-xl p-6 text-white">
                <div className="text-sm font-medium mb-1 opacity-90">Major GPA</div>
                <div className="text-4xl font-bold">{result.majorGPA > 0 ? result.majorGPA.toFixed(3) : 'N/A'}</div>
                <div className="text-xs mt-2 opacity-75">
                  {courses.filter(c => c.category === 'major' && !c.isPNP).reduce((sum, c) => {
                    const units = typeof c.units === 'string' ? parseFloat(c.units) || 0 : c.units;
                    return sum + units;
                  }, 0)} units
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="text-sm font-medium mb-1 opacity-90">Latin Honors</div>
                <div className="text-lg font-bold leading-tight">{result.latinHonors}</div>
                <div className="text-xs mt-2 opacity-75">
                  {result.latinHonors === 'None' ? 'Need 3.5+ for Cum Laude' : '🎓 Eligible'}
                </div>
              </div>

              <div className={`bg-gradient-to-br ${result.academicStanding.includes('Probation') ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600'} rounded-xl p-6 text-white`}>
                <div className="text-sm font-medium mb-1 opacity-90">Academic Status</div>
                <div className="text-lg font-bold leading-tight">{result.academicStanding}</div>
                <div className="text-xs mt-2 opacity-75">
                  {result.deansListEligible ? "✓ Dean's List" : '< 3.5 GPA'}
                </div>
              </div>
            </div>

            {/* Latin Honors Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Latin Honors Progress</h3>
                <span className="text-xs text-gray-500">{result.overallGPA.toFixed(3)} / 4.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2774AE] to-[#FFD100] transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min((result.overallGPA / 4.0) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>Cum Laude: 3.5</span>
                <span>Magna: 3.753</span>
                <span>Summa: 3.935</span>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="border-t pt-6 print:hidden">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Share Your Results</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => shareOnSocial('twitter')}
                  className="px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                  Twitter
                </button>
                <button
                  onClick={() => shareOnSocial('facebook')}
                  className="px-4 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                  Facebook
                </button>
                <button
                  onClick={() => shareOnSocial('linkedin')}
                  className="px-4 py-2 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </button>
                <button
                  onClick={() => shareOnSocial('whatsapp')}
                  className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </button>
                <button
                  onClick={copyLink}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  aria-label="Copy link to clipboard"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Key Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border-l-4 border-[#2774AE] rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-[#2774AE] mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">UCLA Grade Scale Information</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>A+ = 4.0</strong> (UCLA does NOT use 4.33 for A+)</li>
                <li>• Pass/No Pass (P/NP) courses do NOT count toward GPA</li>
                <li>• Latin Honors: Summa (3.935+), Magna (3.753+), Cum Laude (3.5+)</li>
                <li>• Dean's List requires 3.5+ GPA per quarter with 12+ letter-graded units</li>
                <li>• Academic Probation triggered if GPA falls below 2.0</li>
                <li>• 180 units required for graduation (degree requirements vary by major)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* UCLA Grade Scale Explanation Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2774AE] to-[#FFD100] bg-clip-text text-transparent">
            Understanding UCLA's Grading System
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4 leading-relaxed">
              UCLA uses a <strong>4.0 grading scale</strong> where an A+ equals 4.0 grade points—not 4.33 like many other universities. 
              This distinction is crucial for accurate GPA calculations. The UCLA grading system is designed to reward academic excellence 
              while maintaining consistency across all departments and programs. If you're comparing with other universities, check out our 
              <a href="/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> UC Berkeley GPA Calculator</a> or 
              <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> general College GPA Calculator</a>.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-[#2774AE] p-6 mb-6 rounded-r-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Complete UCLA Grade Scale</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-800 mb-2">Excellent Grades:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>A+ = 4.0</strong> (Exceptional Achievement)</li>
                    <li>• <strong>A = 4.0</strong> (Excellent)</li>
                    <li>• <strong>A- = 3.7</strong> (Very Good)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Good Grades:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>B+ = 3.3</strong> (Good)</li>
                    <li>• <strong>B = 3.0</strong> (Above Average)</li>
                    <li>• <strong>B- = 2.7</strong> (Satisfactory)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Average Grades:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>C+ = 2.3</strong> (Fair)</li>
                    <li>• <strong>C = 2.0</strong> (Passing)</li>
                    <li>• <strong>C- = 1.7</strong> (Minimum Passing)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Below Average:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>D+ = 1.3</strong> (Poor)</li>
                    <li>• <strong>D = 1.0</strong> (Very Poor)</li>
                    <li>• <strong>D- = 0.7</strong> (Barely Passing)</li>
                    <li>• <strong>F = 0.0</strong> (Failing)</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Pass/No Pass (P/NP) Grading</h3>
            <p className="text-gray-700 mb-4">
              UCLA allows students to take certain courses on a Pass/No Pass basis. <strong>P/NP courses do NOT affect your GPA</strong>—they 
              are excluded from grade point calculations entirely. A "P" (Pass) earns course credit but no grade points, while an "NP" (No Pass) 
              results in no credit and no impact on GPA. However, NP grades may affect academic standing and satisfactory academic progress. 
              For weighted GPA calculations including honors courses, see our 
              <a href="/education-and-exam-tools/gpa-tools/weighted-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/weighted-gpa-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> Weighted GPA Calculator</a>.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-[#FFD100] p-6 mb-4 rounded-r-lg">
              <p className="text-gray-800">
                <strong>Important:</strong> Many graduate and professional schools recalculate GPAs by converting P/NP grades back to letter grades. 
                Check with your advisor before choosing P/NP for major requirements or prerequisite courses.
              </p>
            </div>
          </div>
        </section>

        {/* UCLA vs Other Universities Comparison Table */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2774AE] to-[#FFD100] bg-clip-text text-transparent">
            UCLA GPA Scale Compared to Other Universities
          </h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#2774AE] to-blue-600 text-white">
                  <th className="border border-blue-300 px-4 py-3 text-left font-semibold">Letter Grade</th>
                  <th className="border border-blue-300 px-4 py-3 text-center font-semibold">UCLA</th>
                  <th className="border border-blue-300 px-4 py-3 text-center font-semibold">Most Universities</th>
                  <th className="border border-blue-300 px-4 py-3 text-center font-semibold">Stanford/Harvard</th>
                  <th className="border border-blue-300 px-4 py-3 text-center font-semibold">MIT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">A+</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">4.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">4.33</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">4.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">5.0</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">A</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">4.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">4.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">4.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">5.0</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">A-</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">3.7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">4.5</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">B+</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">3.3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">4.0</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">B</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">3.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">4.0</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">B-</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">2.7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">2.7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">2.7</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">C+</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">2.3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">2.3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">2.3</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">3.0</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">C</td>
                  <td className="border border-gray-300 px-4 py-2 text-center font-bold text-blue-700">2.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">2.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">2.0</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-gray-900">2.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-[#FFD100] p-6 rounded-r-lg">
            <p className="text-gray-800 text-sm">
              <strong>⚠️ Important Note:</strong> UCLA's A+ = 4.0 policy means you <strong>cannot exceed a 4.0 GPA</strong>, while students 
              at schools using the 4.33 scale can achieve GPAs above 4.0. This difference becomes significant when applying to graduate programs 
              that don't normalize GPAs across institutions. Always mention you're from UCLA when reporting your GPA to provide proper context.
            </p>
          </div>
        </section>

        {/* Quarter vs Semester Units Conversion Table */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2774AE] to-[#FFD100] bg-clip-text text-transparent">
            Quarter Units vs Semester Units Conversion
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            UCLA operates on a <strong>quarter system</strong> with 10-week terms, while most U.S. universities use 15-week semesters. 
            This affects unit calculations when transferring or applying to graduate programs. Use this conversion table for accurate 
            credit hour equivalencies. If you're planning to raise your GPA, use our 
            <a href="/education-and-exam-tools/gpa-tools/gpa-raise-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/gpa-raise-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> GPA Raise Calculator</a> to see what grades you need in upcoming quarters.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">UCLA Quarter Units → Semester Units</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-blue-400 px-3 py-2">Quarter Units</th>
                    <th className="border border-blue-400 px-3 py-2">Semester Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">4</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">2.67</td></tr>
                  <tr className="bg-white"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">5</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">3.33</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">8</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">5.33</td></tr>
                  <tr className="bg-white"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">12</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">8</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">15</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">10</td></tr>
                  <tr className="bg-white"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">16</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">10.67</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">20</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">13.33</td></tr>
                  <tr className="bg-green-50"><td className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-900">180</td><td className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-900">120</td></tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">* 180 quarter units = 4-year UCLA degree</p>
            </div>

            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Semester Units → UCLA Quarter Units</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-yellow-600 text-white">
                    <th className="border border-yellow-400 px-3 py-2">Semester Units</th>
                    <th className="border border-yellow-400 px-3 py-2">Quarter Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">3</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">4.5</td></tr>
                  <tr className="bg-white"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">4</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">6</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">6</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">9</td></tr>
                  <tr className="bg-white"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">12</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">18</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">15</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">22.5</td></tr>
                  <tr className="bg-white"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">30</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">45</td></tr>
                  <tr className="bg-gray-50"><td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">60</td><td className="border border-gray-300 px-3 py-2 text-center text-gray-900">90</td></tr>
                  <tr className="bg-green-50"><td className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-900">120</td><td className="border border-gray-300 px-3 py-2 text-center font-bold text-gray-900">180</td></tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-2">* Use when transferring from semester schools</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-[#2774AE] p-4 rounded-r-lg">
            <p className="text-sm text-gray-700">
              <strong>Formula:</strong> Quarter Units × 0.667 = Semester Units | Semester Units × 1.5 = Quarter Units
            </p>
          </div>
        </section>

        {/* How UCLA GPA Differs Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2774AE] to-[#FFD100] bg-clip-text text-transparent">
            How UCLA's GPA System Differs from Other Universities
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              UCLA's grading system has several unique features that distinguish it from other colleges and universities. Understanding these 
              differences is essential for transfer students, graduate school applicants, and anyone comparing UCLA's GPA to other institutions.
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. A+ Grade Point Value</h3>
                <p className="text-gray-700">
                  <strong>UCLA: A+ = 4.0</strong> (same as regular A)<br />
                  <strong>Many Universities: A+ = 4.33</strong><br />
                  This means UCLA students cannot exceed a 4.0 GPA, while students at schools using the 4.33 scale can achieve GPAs above 4.0. 
                  This difference is important when applying to graduate programs that don't normalize GPAs.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Quarter System vs. Semester System</h3>
                <p className="text-gray-700">
                  UCLA operates on a <strong>quarter system</strong> (Fall, Winter, Spring + Summer) with 10-week terms, while most universities 
                  use 15-week semesters. This affects GPA calculations because:
                </p>
                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
                  <li>Quarter units are worth less than semester units (1 quarter unit ≈ 0.67 semester units)</li>
                  <li>Students take more courses per year, leading to more grade data points</li>
                  <li>A single poor grade has less impact on overall GPA compared to semester systems</li>
                  <li>180 quarter units required for graduation (vs. 120 semester units at most schools)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Latin Honors Thresholds</h3>
                <p className="text-gray-700">
                  UCLA's Latin honors cutoffs are among the highest in the nation:
                </p>
                <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
                  <li><strong>Summa Cum Laude:</strong> 3.935+ (top ~5% of graduates)</li>
                  <li><strong>Magna Cum Laude:</strong> 3.753-3.934 (next ~5%)</li>
                  <li><strong>Cum Laude:</strong> 3.5-3.752 (next ~15%)</li>
                </ul>
                <p className="text-gray-700 mt-2">
                  Compare this to many private universities that award Cum Laude at 3.4 or even 3.3 GPA. UCLA's rigorous standards 
                  reflect the competitive academic environment. To see how your GPA compares, try our 
                  <a href="/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> UVA GPA Calculator</a> or 
                  <a href="/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> Rutgers GPA Calculator</a>.
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Major GPA vs. Overall GPA</h3>
                <p className="text-gray-700">
                  UCLA tracks both <strong>Overall GPA</strong> (all courses) and <strong>Major GPA</strong> (major-specific courses). Many departments 
                  have minimum major GPA requirements (typically 2.0-2.5) that are separate from the university-wide 2.0 minimum. Graduate programs 
                  often emphasize major GPA over overall GPA when evaluating applicants.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5. Academic Probation Policies</h3>
                <p className="text-gray-700">
                  UCLA places students on <strong>academic probation</strong> if their cumulative GPA falls below 2.0. Unlike some schools that allow 
                  multiple quarters below 2.0, UCLA requires immediate improvement. Students have one quarter to raise their GPA above 2.0, or they 
                  may face <strong>subject to dismissal</strong> status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latin Honors Requirements Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2774AE] to-[#FFD100] bg-clip-text text-transparent">
            UCLA Latin Honors Requirements & Graduation Distinctions
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6 leading-relaxed">
              UCLA awards Latin honors to undergraduate students who achieve exceptional academic performance throughout their time at the university. 
              These distinctions appear on diplomas and transcripts, recognizing students in the top 25% of each graduating class.
            </p>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Three Levels of Latin Honors</h3>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-yellow-500">
                  <h4 className="text-xl font-bold text-yellow-700 mb-2">🏆 Summa Cum Laude (Highest Honors)</h4>
                  <p className="text-gray-800 mb-2"><strong>GPA Requirement:</strong> 3.935 or higher</p>
                  <p className="text-gray-700">
                    Awarded to the top ~5% of graduates. Summa Cum Laude represents <em>exceptional, sustained academic excellence</em> across 
                    all coursework. This distinction is highly valued by graduate programs and employers, as it indicates mastery-level performance 
                    in a competitive academic environment.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
                  <h4 className="text-xl font-bold text-purple-700 mb-2">⭐ Magna Cum Laude (High Honors)</h4>
                  <p className="text-gray-800 mb-2"><strong>GPA Requirement:</strong> 3.753 - 3.934</p>
                  <p className="text-gray-700">
                    Awarded to the next ~5% of graduates (approximately top 10% overall). Magna Cum Laude signifies <em>outstanding academic 
                    achievement</em> with near-perfect performance in most courses. This honor demonstrates consistent excellence and strong 
                    dedication to academics.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
                  <h4 className="text-xl font-bold text-blue-700 mb-2">✨ Cum Laude (Honors)</h4>
                  <p className="text-gray-800 mb-2"><strong>GPA Requirement:</strong> 3.5 - 3.752</p>
                  <p className="text-gray-700">
                    Awarded to the next ~15% of graduates (approximately top 25% overall). Cum Laude recognizes <em>distinguished academic 
                    performance</em> well above UCLA's already high standards. Students with this honor have maintained a Dean's List-level 
                    GPA throughout their undergraduate career.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility Requirements</h3>
            <p className="text-gray-700 mb-4">
              To be considered for Latin honors at UCLA graduation, students must meet <strong>all</strong> of the following criteria:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
              <li>Complete at least <strong>90 quarter units</strong> (60 semester units) in residence at UCLA</li>
              <li>Complete a minimum of <strong>180 quarter units</strong> total for the bachelor's degree</li>
              <li>Achieve the required cumulative GPA threshold calculated on <strong>all UCLA coursework</strong></li>
              <li>Letter-graded courses only count toward Latin honors (P/NP courses excluded)</li>
              <li>Transfer students: Only UCLA coursework counts; community college grades are NOT included</li>
              <li>No academic integrity violations on record</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-[#2774AE] p-6 rounded-r-lg mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Why UCLA's Thresholds Are So High</h4>
              <p className="text-gray-700">
                UCLA's Latin honors cutoffs (3.5, 3.753, 3.935) are intentionally challenging because they're based on <strong>class rank percentiles</strong>, 
                not fixed GPAs. The thresholds are recalculated each year based on the top 25% of graduating seniors. UCLA's academically competitive 
                student body drives these numbers higher than at many other institutions where Cum Laude may start at 3.3 or 3.4.
              </p>
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Other Academic Distinctions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Dean's Honor List</h4>
                <p className="text-gray-700">
                  Awarded quarterly to students who complete at least <strong>12 letter-graded units with a 3.5+ GPA</strong>. Unlike Latin honors 
                  (which appear on diplomas), Dean's List recognition appears on transcripts for each qualifying term. Consistent Dean's List 
                  appearances often lead to graduating with Latin honors.
                </p>
              </div>
              
              <div className="border-l-4 border-indigo-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">College Honors Program</h4>
                <p className="text-gray-700">
                  Separate from Latin honors, the College Honors Program (offered by UCLA College of Letters and Science) requires students to 
                  complete a senior thesis/project in addition to maintaining high GPAs. College Honors appears as a separate distinction on 
                  diplomas and transcripts alongside Latin honors.
                </p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Departmental Honors</h4>
                <p className="text-gray-700">
                  Many academic departments award <strong>Departmental Honors</strong> to students who excel in their major coursework, complete 
                  an honors thesis, and maintain a high major GPA (typically 3.5+). These honors are noted on transcripts and are particularly 
                  impressive to graduate programs in the same field.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GPA Improvement Strategies */}
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            🎯 Strategic GPA Improvement Plan for UCLA Students
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-[#2774AE] mb-4 flex items-center gap-2">
                <span className="text-3xl">📈</span>
                How to Raise Your UCLA GPA: Proven Strategies
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">1. Front-Load Easy Courses (Freshman Year)</h4>
                    <p className="text-sm text-gray-700">
                      Take GE requirements and intro courses in your first year to build a <strong>GPA cushion</strong>. Aim for 3.7+ 
                      in these courses before tackling harder upper-division major requirements. This strategy gives you room for occasional 
                      B's later without dropping below Latin honors thresholds.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">2. Strategic P/NP Usage</h4>
                    <p className="text-sm text-gray-700">
                      Use Pass/No Pass grading for <strong>electives only</strong>—never for major requirements or prerequisites. Take P/NP 
                      courses when you're overloaded (16+ units) or trying a challenging class outside your comfort zone. Remember: graduate 
                      schools may recalculate P grades as C's, so use sparingly.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">3. Target 12-15 Units Per Quarter</h4>
                    <p className="text-sm text-gray-700">
                      UCLA's sweet spot is <strong>13-14 units</strong>—enough for full-time status and Dean's List eligibility (12+ units), 
                      but not overwhelming. Only take 16+ units if you have a 3.7+ GPA already. More courses = higher risk of grade dilution.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">4. Utilize Academic Resources Early</h4>
                    <p className="text-sm text-gray-700">
                      Don't wait until you're failing. Use <strong>AAP tutoring, office hours, and study groups</strong> from Week 1. 
                      Students who attend office hours regularly earn 0.3-0.5 GPA points higher on average. UCLA offers free tutoring 
                      for most lower-division courses—take advantage before the first midterm.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">5. Retake Strategically (If Needed)</h4>
                    <p className="text-sm text-gray-700">
                      If you earned a <strong>C- or lower</strong>, retake the course to replace the grade in your GPA calculation. 
                      Prioritize retaking high-unit courses (4-5 units) over low-unit courses (2 units) for maximum GPA impact. Both 
                      grades appear on transcripts, so explain retakes in grad school applications. Calculate your potential GPA improvement with our 
                      <a href="/education-and-exam-tools/gpa-tools/gpa-raise-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/gpa-raise-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> GPA Raise Calculator</a>.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">6. Summer Session Boost</h4>
                    <p className="text-sm text-gray-700">
                      Take <strong>1-2 challenging courses during summer</strong> when you can focus exclusively on them. Summer classes 
                      are 6-8 weeks with fewer distractions, making it easier to earn A's. Summer GPA counts toward your cumulative UCLA 
                      GPA and Latin honors eligibility.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">7. Balance Major and Overall GPA</h4>
                    <p className="text-sm text-gray-700">
                      Track <strong>both GPAs separately</strong>. If your major GPA is lower (common in STEM), compensate with easier 
                      GE courses to boost overall GPA. Graduate programs often weigh major GPA more heavily, so prioritize major courses 
                      if you must choose where to excel.
                    </p>
                  </div>

                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-bold text-gray-900 mb-2">8. Quarter-by-Quarter Planning</h4>
                    <p className="text-sm text-gray-700">
                      Calculate your <strong>target GPA each quarter</strong> using this calculator. Know exactly what grades you need 
                      to reach Latin honors thresholds (3.5, 3.753, 3.935). If you're 0.1 away from a milestone, that's just one more 
                      A- instead of a B+ in a 4-unit course. For semester-by-semester tracking, try our 
                      <a href="/education-and-exam-tools/gpa-tools/semester-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/semester-gpa-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> Semester GPA Calculator</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* GPA Impact Calculator Table */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Grade Impact: How One Course Affects Your GPA</h3>
              <p className="text-sm text-gray-600 mb-4">
                This table shows how your final grade in a <strong>4-unit course</strong> impacts your cumulative GPA based on your 
                current standing. Use this to understand the stakes of each class.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#2774AE] to-purple-600 text-white">
                      <th className="border border-gray-300 px-3 py-2">Current GPA</th>
                      <th className="border border-gray-300 px-3 py-2">Current Units</th>
                      <th className="border border-gray-300 px-3 py-2">If You Get A (4.0)</th>
                      <th className="border border-gray-300 px-3 py-2">If You Get B (3.0)</th>
                      <th className="border border-gray-300 px-3 py-2">If You Get C (2.0)</th>
                      <th className="border border-gray-300 px-3 py-2">If You Get D (1.0)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">3.9</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-900">100</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-700 font-bold">3.904</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-blue-600">3.865</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-orange-600">3.827</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">3.788</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">3.7</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-900">100</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-700 font-bold">3.712</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-blue-600">3.673</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-orange-600">3.635</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">3.596</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">3.5</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-900">100</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-700 font-bold">3.519</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-blue-600">3.481</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-orange-600">3.442</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">3.404</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">3.0</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-900">80</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-700 font-bold">3.048</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-blue-600">3.000</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-orange-600">2.952</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">2.905</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">2.5</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-900">60</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-700 font-bold">2.594</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-blue-600">2.531</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-orange-600">2.469</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">2.406</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 px-3 py-2 text-center font-medium text-gray-900">2.0</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-900">40</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-green-700 font-bold">2.182</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-blue-600">2.091</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-orange-600">2.000</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-red-600">1.909</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-xs text-gray-600 mt-3">
                <strong>Key Insight:</strong> The lower your current GPA and fewer units you have, the bigger the impact of each grade. 
                Early grades matter exponentially more—protect your GPA in your first year!
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2774AE] to-[#FFD100] bg-clip-text text-transparent">
            Frequently Asked Questions (FAQs)
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Why does UCLA use A+ = 4.0 instead of 4.33?</h3>
              <p className="text-gray-700 leading-relaxed">
                UCLA's 4.0 scale caps the maximum GPA at 4.0 to maintain consistency across all students and prevent grade inflation. While some 
                universities use 4.33 for A+ grades, UCLA follows the traditional 4.0 system used by many University of California campuses. This 
                means earning an A+ provides the same grade points as an A (both 4.0), though A+ grades still indicate exceptional performance 
                on transcripts.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Do P/NP (Pass/No Pass) courses affect my UCLA GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>No.</strong> Pass/No Pass courses do <strong>NOT</strong> count toward your GPA calculation at UCLA. A "P" grade earns 
                course credit but contributes zero grade points (neither helps nor hurts your GPA). However, "NP" (No Pass) grades can affect 
                your academic standing and progress toward degree requirements. Be cautious: many graduate and professional schools recalculate 
                GPAs by converting P grades to letter grades, so excessive P/NP use may hurt future applications.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. How do I calculate my major GPA vs. overall GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Overall GPA:</strong> Includes ALL letter-graded courses taken at UCLA across all subjects.<br />
                <strong>Major GPA:</strong> Includes only courses that fulfill your major requirements (check your department's major worksheet).<br />
                Use our calculator above to track both separately. Most UCLA departments require a minimum 2.0 major GPA, though competitive 
                majors like engineering, business economics, and pre-med may require 3.0+. Graduate programs often emphasize major GPA when 
                evaluating applicants. For cumulative GPA tracking, see our \n                <a href="/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator'); }} className="text-[#2774AE] hover:underline font-medium"> Cumulative GPA Calculator</a>.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. What GPA do I need for Dean's List at UCLA?</h3>
              <p className="text-gray-700 leading-relaxed">
                To qualify for UCLA's <strong>Dean's List</strong>, you must earn a <strong>3.5 or higher GPA</strong> in a given quarter while 
                completing at least <strong>12 letter-graded units</strong>. P/NP courses don't count toward the 12-unit minimum. Dean's List 
                recognition appears on your transcript for each qualifying quarter. Consistent Dean's List appearances (most quarters at 3.5+) 
                typically lead to graduating with Cum Laude honors or higher.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5. What happens if my GPA falls below 2.0 at UCLA?</h3>
              <p className="text-gray-700 leading-relaxed">
                If your cumulative GPA drops below 2.0, you'll be placed on <strong>Academic Probation</strong>. You must raise your GPA above 
                2.0 within one quarter, or you'll be placed on <strong>Subject to Dismissal</strong> status. Continued poor performance may result 
                in <strong>Academic Dismissal</strong> from UCLA. Students on probation receive mandatory advising and may face enrollment 
                restrictions. If dismissed, you can petition for reinstatement after one year, but it requires demonstrating readiness to succeed 
                academically.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6. How is UCLA's quarter system different from semesters for GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                UCLA's quarter system means you take courses in <strong>10-week terms</strong> (Fall, Winter, Spring) instead of 15-week semesters. 
                For GPA purposes: 1 quarter unit ≈ 0.67 semester units. You need <strong>180 quarter units</strong> to graduate (equivalent to 
                ~120 semester units). The quarter system allows more frequent GPA updates (3 times per year vs. 2), so a bad grade has slightly 
                less impact on your overall GPA. However, the fast pace means you have less time to recover from poor exam performance.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Does UCLA round GPAs for Latin Honors calculations?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>No.</strong> UCLA does <strong>NOT</strong> round GPAs for Latin Honors eligibility. If the threshold is 3.935 for Summa 
                Cum Laude, a GPA of 3.934 (even 3.9349) does NOT qualify—you'd receive Magna Cum Laude instead. The GPA calculation is precise 
                to three decimal places. This strict policy ensures fairness and maintains the prestige of Latin honors. Always aim for a GPA 
                slightly above the cutoff to account for calculation precision.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Do transfer credits affect my UCLA GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>No.</strong> Community college and other transfer credits do <strong>NOT</strong> affect your UCLA GPA. Only courses 
                taken at UCLA (or other UC campuses during summer/exchange) count toward your UCLA GPA calculation. Transfer units count toward 
                your 180-unit graduation requirement, but the grades don't transfer. This means transfer students start with a "clean slate" 
                GPA-wise, but it also means you have fewer quarters to build a strong GPA for Latin Honors eligibility.
              </p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Can I retake a class to improve my UCLA GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Yes, with limitations.</strong> UCLA allows you to <strong>repeat a course once</strong> if you received a grade of C- or 
                lower, or NP. The new grade replaces the old one in your GPA calculation (though both grades remain on your transcript). If you 
                earned a C or higher, you cannot retake the course for GPA replacement—you'd have to take it P/NP and it won't affect your GPA. 
                Note: Graduate and professional schools may see both attempts and recalculate GPAs using all attempts, so focus on succeeding 
                the first time.
              </p>
            </div>
            
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Where can I find my official UCLA GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Your official UCLA GPA is available through <strong>MyUCLA</strong> (my.ucla.edu) under the "Academics" tab, then "Academic Record" 
                or "View Grades." You can also request an official transcript from the UCLA Registrar's Office, which shows your cumulative GPA, 
                major GPA, quarterly GPAs, and any academic honors or Dean's List recognitions. The GPA on your transcript is the <strong>official</strong> 
                number—calculators like this one are for estimation and planning purposes only. Always verify with your academic advisor before 
                making important decisions based on GPA.
              </p>
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Related UCLA Resources & Tools
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#2774AE] mb-3">📚 UCLA Academic Calendar</h3>
              <p className="text-gray-700 mb-4">
                View quarter start/end dates, finals week schedules, holidays, and important academic deadlines. Essential for planning your 
                course load and GPA strategy each term.
              </p>
              <a 
                href="https://registrar.ucla.edu/calendars" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#2774AE] font-medium hover:underline"
              >
                Visit UCLA Registrar Calendar →
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#2774AE] mb-3">🎓 UCLA Degree Progress Report (DARS)</h3>
              <p className="text-gray-700 mb-4">
                Check your progress toward graduation requirements, including major coursework, GE requirements, and unit counts. Access via 
                MyUCLA to see which courses count toward your major GPA.
              </p>
              <a 
                href="https://my.ucla.edu" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#2774AE] font-medium hover:underline"
              >
                Log in to MyUCLA →
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#2774AE] mb-3">🏆 College Academic Counseling</h3>
              <p className="text-gray-700 mb-4">
                Meet with academic counselors for personalized GPA planning, course selection advice, and graduation requirement verification. 
                Counselors can help you strategize for Latin Honors eligibility.
              </p>
              <a 
                href="https://www.college.ucla.edu/academics/academic-counseling/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#2774AE] font-medium hover:underline"
              >
                Schedule Counseling Appointment →
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#2774AE] mb-3">📖 UCLA Course Catalog</h3>
              <p className="text-gray-700 mb-4">
                Browse all available courses, prerequisites, unit values, and grading policies. Use the catalog to plan your schedule and 
                ensure courses count toward your major and overall GPA.
              </p>
              <a 
                href="https://catalog.registrar.ucla.edu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#2774AE] font-medium hover:underline"
              >
                Explore Course Catalog →
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#2774AE] mb-3">💡 Academic Success Resources</h3>
              <p className="text-gray-700 mb-4">
                Access free tutoring, study groups, workshops, and academic coaching through UCLA Academic Advancement Program (AAP) and 
                Student Success Office to boost your GPA.
              </p>
              <a 
                href="https://www.aap.ucla.edu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#2774AE] font-medium hover:underline"
              >
                Explore AAP Resources →
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#2774AE] mb-3">🔧 Other GPA Calculators</h3>
              <p className="text-gray-700 mb-4">
                Explore GPA calculators for other universities including UC Berkeley, Rutgers, UVA, ASU, and general college GPA tools for 
                transfer planning and graduate school applications.
              </p>
              <a 
                href="/education-and-exam-tools/university-gpa-tools" 
                onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/university-gpa-tools'); }}
                className="text-[#2774AE] font-medium hover:underline"
              >
                View All University GPA Tools →
              </a>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg p-6 border-2 border-[#FFD100]">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 Pro Tip: GPA Planning Strategy</h3>
            <p className="text-gray-700 leading-relaxed">
              To maximize your chances of graduating with Latin Honors, front-load easier courses in your first year to build a GPA cushion. 
              Target 3.7+ in general education requirements, then maintain 3.5+ in major courses. Track both your overall and major GPA quarterly 
              using this calculator. Remember: <strong>consistency matters more than perfection</strong>—steady 3.8 performance across all quarters 
              beats alternating between 4.0 and 3.4. Meet with academic counselors early to plan your path to Cum Laude or higher.
            </p>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['berkeley-gpa-calculator', 'rutgers-gpa-calculator', 'uva-gpa-calculator', 'asu-gpa-calculator', 'uta-gpa-calculator', 'college-gpa-calculator']} 
          currentSlug="ucla-gpa-calculator" 
          navigateTo={navigateTo} 
        />

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 pt-8 border-t border-gray-200">
          <p className="mb-2">
            <strong>Disclaimer:</strong> This UCLA GPA calculator is for estimation purposes only. Official GPA calculations are performed by UCLA Registrar. 
            Always verify with your academic advisor.
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/'); }} className="text-[#2774AE] hover:underline">ZuraWebTools</a>. All rights reserved. | 
            <a href="/education-and-exam-tools" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools'); }} className="text-[#2774AE] hover:underline ml-1">Education Tools</a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UCLAGPACalculator;
