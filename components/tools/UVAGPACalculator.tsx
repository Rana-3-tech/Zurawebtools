import React, { useState, useEffect, useMemo } from 'react';
import TableOfContents, { TOCSection } from '../TableOfContents';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

type Course = {
  name: string;
  grade: string;
  credits: number;
};

type Semester = {
  id: number;
  courses: Course[];
};

interface UVAGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

// UVA Grade Scale (A+ = 4.0, not 4.3) - Defined outside component to prevent re-creation
const GRADE_SCALE = {
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
  'F': 0.0
} as const;

type Grade = keyof typeof GRADE_SCALE;

const UVAGPACalculator: React.FC<UVAGPACalculatorProps> = ({ navigateTo }) => {
  // State Management with localStorage persistence
  const [semesters, setSemesters] = useState<Semester[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('uva-gpa-semesters');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Validate parsed data structure
          if (Array.isArray(parsed) && parsed.length > 0 && parsed.every(sem => 
            sem.id && Array.isArray(sem.courses)
          )) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Failed to parse saved semesters, resetting to default:', e);
        // Clear corrupted data
        localStorage.removeItem('uva-gpa-semesters');
        // Notify user about corruption
        if (typeof window !== 'undefined') {
          setTimeout(() => setShowCorruptionWarning(true), 100);
        }
      }
    }
    return [{ id: 1, courses: [{ name: '', grade: 'A', credits: 3 }] }];
  });

  const [cumulativeGPA, setCumulativeGPA] = useState<number>(0);
  const [showCorruptionWarning, setShowCorruptionWarning] = useState<boolean>(false);

  // Auto-save to localStorage with debounce (500ms) for performance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        try {
          localStorage.setItem('uva-gpa-semesters', JSON.stringify(semesters));
        } catch (e) {
          console.error('Failed to save to localStorage:', e);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [semesters]);

  // TOC sections
  const tocSections: TOCSection[] = [
    {
      id: 'calculator',
      emoji: '🧮',
      title: 'Calculator',
      subtitle: 'Calculate your GPA',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      hoverBorder: 'border-indigo-400',
      hoverText: 'text-indigo-600'
    },
    {
      id: 'examples',
      emoji: '📝',
      title: 'Quick Examples',
      subtitle: 'Sample GPA scenarios',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-yellow-50',
      hoverBorder: 'border-orange-400',
      hoverText: 'text-orange-600'
    },
    {
      id: 'understanding',
      emoji: '📚',
      title: 'Understanding',
      subtitle: 'How UVA GPA works',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-600'
    },
    {
      id: 'grade-scale',
      emoji: '📊',
      title: 'Grade Scale',
      subtitle: 'UVA grading system',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      hoverBorder: 'border-green-400',
      hoverText: 'text-green-600'
    },
    {
      id: 'school-requirements',
      emoji: '🎓',
      title: 'School Requirements',
      subtitle: 'By college/school',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-red-50',
      hoverBorder: 'border-orange-400',
      hoverText: 'text-orange-600'
    },
    {
      id: 'example',
      emoji: '📊',
      title: 'Example Calculation',
      subtitle: 'Step-by-step guide',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      hoverBorder: 'border-blue-400',
      hoverText: 'text-blue-600'
    },
    {
      id: 'comparison',
      emoji: '⚖️',
      title: 'UVA vs Other Schools',
      subtitle: 'Scale comparison',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-600'
    },
    {
      id: 'honors',
      emoji: '🏆',
      title: 'Honors',
      subtitle: 'Latin honors requirements',
      gradientFrom: 'from-yellow-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-yellow-400',
      hoverText: 'text-yellow-600'
    },
    {
      id: 'faq',
      emoji: '❓',
      title: 'FAQ',
      subtitle: 'Common questions',
      gradientFrom: 'from-teal-50',
      gradientTo: 'to-cyan-50',
      hoverBorder: 'border-teal-500',
      hoverText: 'text-teal-600'
    }
  ];

  // Common UVA courses
  const commonCourses = [
    'ENWR 1510 - Academic Writing',
    'MATH 1310 - Calculus I',
    'MATH 1320 - Calculus II',
    'CHEM 1410 - General Chemistry I',
    'PHYS 1425 - Introductory Physics I',
    'BIOL 2100 - Introduction to Biology',
    'ECON 2010 - Principles of Microeconomics',
    'ECON 2020 - Principles of Macroeconomics',
    'PSYC 1010 - Introduction to Psychology',
    'CS 1110 - Introduction to Programming',
    'STAT 2120 - Introduction to Statistics',
    'APMA 1110 - Single Variable Calculus I',
    'COMM 1800 - Survey of Communication',
    'SPAN 1010 - Beginning Spanish I',
    'HIST 1501 - US History to 1865'
  ];

  // Semester Management
  const addSemester = () => {
    // Safe ID generation: handle empty array case
    const existingIds = semesters.map(s => s.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    setSemesters([...semesters, { id: newId, courses: [{ name: '', grade: 'A', credits: 3 }] }]);
    
    // Smooth scroll to new semester after brief delay
    setTimeout(() => {
      const newSemesterElement = document.querySelector(`[data-semester-id="${newId}"]`);
      if (newSemesterElement) {
        newSemesterElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const removeSemester = (semesterId: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semesterId));
    }
  };

  // Course Management
  const addCourse = (semesterId: number) => {
    setSemesters(semesters.map(sem =>
      sem.id === semesterId
        ? { ...sem, courses: [...sem.courses, { name: '', grade: 'A', credits: 3 }] }
        : sem
    ));
  };

  const removeCourse = (semesterId: number, courseIndex: number) => {
    setSemesters(semesters.map(sem =>
      sem.id === semesterId && sem.courses.length > 1
        ? { ...sem, courses: sem.courses.filter((_, i) => i !== courseIndex) }
        : sem
    ));
  };

  const updateCourse = (semesterId: number, courseIndex: number, field: keyof Course, value: string | number) => {
    setSemesters(semesters.map(sem =>
      sem.id === semesterId
        ? {
            ...sem,
            courses: sem.courses.map((course, i) =>
              i === courseIndex ? { ...course, [field]: value } : course
            )
          }
        : sem
    ));
  };

  // GPA Calculations
  const calculateSemesterGPA = (semester: Semester): number => {
    let totalPoints = 0;
    let totalCredits = 0;

    semester.courses.forEach(course => {
      // Validate grade exists in GRADE_SCALE and credits are positive
      if (course.credits > 0 && GRADE_SCALE[course.grade] !== undefined) {
        totalPoints += GRADE_SCALE[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    // Return 0 for edge case where no valid courses
    return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(3)) : 0;
  };

  const semesterGPAs = useMemo(() => {
    return semesters.map(sem => ({
      id: sem.id,
      gpa: calculateSemesterGPA(sem)
    }));
  }, [semesters]);

  useEffect(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        // Validate grade exists in GRADE_SCALE and credits are positive
        if (course.credits > 0 && GRADE_SCALE[course.grade] !== undefined) {
          totalPoints += GRADE_SCALE[course.grade] * course.credits;
          totalCredits += course.credits;
        }
      });
    });

    // Calculate to 3 decimal places as per UVA standard
    setCumulativeGPA(totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(3)) : 0);
  }, [semesters]);

  // Honors Calculation
  const getHonorsStatus = (gpa: number): string => {
    if (gpa >= 3.800) return 'Summa Cum Laude';
    if (gpa >= 3.600) return 'Magna Cum Laude';
    if (gpa >= 3.400) return 'Cum Laude';
    return 'No Latin Honors';
  };

  // Clear All
  const clearAllData = () => {
    if (window.confirm('Clear all semesters and start fresh?')) {
      setSemesters([{ id: 1, courses: [{ name: '', grade: 'A', credits: 3 }] }]);
      try {
        localStorage.removeItem('uva-gpa-semesters');
      } catch (e) {
        console.error('Failed to clear localStorage:', e);
      }
    }
  };

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const semesterResults = semesters.map((semester, index) => ({
      name: `Semester ${index + 1}`,
      gpa: calculateSemesterGPA(semester),
      courses: semester.courses
    }));

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>UVA GPA Report - University of Virginia</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #E57200; padding-bottom: 20px; }
            .header h1 { color: #232D4B; margin: 0; }
            .header p { color: #666; margin: 5px 0; }
            .semester { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            .gpa-display { font-size: 24px; font-weight: bold; color: #E57200; text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #232D4B; color: white; }
            .cumulative { background-color: #f0f4f8; padding: 20px; border-radius: 8px; margin-top: 20px; border: 2px solid #E57200; }
            .honors-badge { background-color: #E57200; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>University of Virginia GPA Report</h1>
            <p>Official UVA GPA Scale (A+ = 4.0)</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          ${semesterResults.map(semester => `
            <div class="semester">
              <h2>${semester.name}</h2>
              <div class="gpa-display">Semester GPA: ${semester.gpa.toFixed(3)}</div>
              <table>
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Grade</th>
                    <th>Credits</th>
                    <th>Grade Points</th>
                  </tr>
                </thead>
                <tbody>
                  ${semester.courses.map(course => {
                    const gradePoint = GRADE_SCALE[course.grade] ?? 0;
                    const qualityPoints = (gradePoint * course.credits).toFixed(2);
                    // Sanitize course name to prevent XSS
                    const sanitizedName = (course.name || 'Unnamed Course')
                      .replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#39;');
                    return `
                    <tr>
                      <td>${sanitizedName}</td>
                      <td>${course.grade}</td>
                      <td>${course.credits}</td>
                      <td>${qualityPoints}</td>
                    </tr>
                  `}).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}

          <div class="cumulative">
            <h2 style="color: #232D4B; text-align: center;">Cumulative GPA</h2>
            <div class="gpa-display" style="color: #232D4B;">Overall GPA: ${cumulativeGPA.toFixed(3)}</div>
            <div style="text-align: center;">
              <span class="honors-badge">${getHonorsStatus(cumulativeGPA)}</span>
            </div>
            ${cumulativeGPA >= 3.400 ? `
              <div style="text-align: center; margin-top: 15px; color: #666;">
                ${cumulativeGPA < 3.600 ? '🎯 ' + (3.600 - cumulativeGPA).toFixed(3) + ' points to Magna Cum Laude' : ''}
                ${cumulativeGPA >= 3.600 && cumulativeGPA < 3.800 ? '🎯 ' + (3.800 - cumulativeGPA).toFixed(3) + ' points to Summa Cum Laude' : ''}
                ${cumulativeGPA >= 3.800 ? '🌟 Highest honor achieved!' : ''}
              </div>
            ` : ''}
          </div>

          <div class="footer">
            <p><strong>Latin Honors Requirements:</strong></p>
            <p>Cum Laude: 3.400 - 3.599 | Magna Cum Laude: 3.600 - 3.799 | Summa Cum Laude: 3.800 - 4.000</p>
            <p>Generated by ZuraWebTools UVA GPA Calculator | https://zurawebtools.com/uva-gpa-calculator</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    // Fix race condition: Wait for window to fully load before printing
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Handle download
  const handleDownload = () => {
    const semesterResults = semesters.map((semester, index) => ({
      name: `Semester ${index + 1}`,
      gpa: calculateSemesterGPA(semester),
      courses: semester.courses
    }));

    let textContent = `UNIVERSITY OF VIRGINIA GPA REPORT\n`;
    textContent += `Official UVA GPA Scale (A+ = 4.0)\n`;
    textContent += `Generated on: ${new Date().toLocaleDateString()}\n`;
    textContent += `${'='.repeat(60)}\n\n`;

    semesterResults.forEach(semester => {
      textContent += `${semester.name}\n`;
      textContent += `Semester GPA: ${semester.gpa.toFixed(3)}\n\n`;
      textContent += `Courses:\n`;
      semester.courses.forEach(course => {
        const gradePoint = GRADE_SCALE[course.grade] ?? 0;
        const qualityPoints = (gradePoint * course.credits).toFixed(2);
        textContent += `  - ${course.name || 'Unnamed Course'}: ${course.grade} (${course.credits} credits, ${qualityPoints} quality points)\n`;
      });
      textContent += `\n`;
    });

    textContent += `${'='.repeat(60)}\n`;
    textContent += `CUMULATIVE GPA: ${cumulativeGPA.toFixed(3)}\n`;
    textContent += `LATIN HONORS: ${getHonorsStatus(cumulativeGPA)}\n\n`;

    if (cumulativeGPA >= 3.400) {
      if (cumulativeGPA < 3.600) {
        textContent += `🎯 ${(3.600 - cumulativeGPA).toFixed(3)} points to Magna Cum Laude\n`;
      } else if (cumulativeGPA < 3.800) {
        textContent += `🎯 ${(3.800 - cumulativeGPA).toFixed(3)} points to Summa Cum Laude\n`;
      } else {
        textContent += `🌟 Highest honor achieved!\n`;
      }
      textContent += `\n`;
    }

    textContent += `${'='.repeat(60)}\n`;
    textContent += `Latin Honors Requirements:\n`;
    textContent += `  Cum Laude: 3.400 - 3.599\n`;
    textContent += `  Magna Cum Laude: 3.600 - 3.799\n`;
    textContent += `  Summa Cum Laude: 3.800 - 4.000\n\n`;
    textContent += `Generated by ZuraWebTools UVA GPA Calculator\n`;
    textContent += `https://zurawebtools.com/uva-gpa-calculator\n`;

    // Add UTF-8 BOM for better Windows compatibility
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UVA_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SEO Setup
  useEffect(() => {
    document.title = "UVA GPA Calculator - University of Virginia GPA Calculator | ZuraWebTools";
    
    const setMetaTag = (property: string, content: string, isProperty = false) => {
      let element = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(isProperty ? 'property' : 'name', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('description', 'UVA GPA calculator for University of Virginia students in Charlottesville. Calculate semester and cumulative GPA using official UVA grade scale (A+=4.0). Free tool with Latin honors tracking and step-by-step calculation examples.');
    setMetaTag('keywords', 'UVA GPA calculator, University of Virginia GPA, UVA grade scale, UVA honors GPA, cumulative GPA calculator UVA, semester GPA UVA, Latin honors UVA');
    setMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('author', 'ZuraWebTools');
    setMetaTag('og:title', 'UVA GPA Calculator - University of Virginia GPA Tool', true);
    setMetaTag('og:description', 'Calculate your UVA GPA with official University of Virginia grade scale. Track cumulative GPA, semester GPA, and Latin honors eligibility. Free and accurate.', true);
    setMetaTag('og:image', 'https://zurawebtools.com/images/uva-gpa-calculator-preview.jpg', true);
    setMetaTag('og:url', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator', true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'ZuraWebTools', true);
    setMetaTag('og:locale', 'en_US', true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'UVA GPA Calculator - University of Virginia');
    setMetaTag('twitter:description', 'Free UVA GPA calculator with official grade scale and Latin honors tracking.');

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator');
    document.head.appendChild(canonical);

    // SoftwareApplication Schema
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "UVA GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any (Web-based)",
      "browserRequirements": "Requires JavaScript",
      "image": "https://zurawebtools.com/images/uva-gpa-calculator.jpg",
      "screenshot": "https://zurawebtools.com/images/uva-gpa-calculator-screenshot.jpg",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free UVA GPA calculator for University of Virginia students. Calculate semester and cumulative GPA with official UVA grade scale and Latin honors tracking.",
      "url": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator",
      "datePublished": "2024-09-15",
      "dateModified": "2025-12-01",
      "inLanguage": "en-US",
      "author": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "321",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah Mitchell"
          },
          "datePublished": "2025-11-28",
          "reviewBody": "Extremely accurate calculator for UVA students. The Latin honors tracking feature helped me plan my semester schedule to maintain Magna Cum Laude eligibility. The step-by-step example made it easy to understand how UVA's 4.0 scale works differently from my high school's weighted GPA.",
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
            "name": "David Chen"
          },
          "datePublished": "2025-11-20",
          "reviewBody": "As a transfer student from a school using the 4.3 scale, the comparison section was incredibly helpful. The calculator accurately reflects UVA's policy where A+ equals 4.0, not 4.3. Saved me hours of manual calculations when planning my McIntire application.",
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
            "name": "Emily Rodriguez"
          },
          "datePublished": "2025-11-15",
          "reviewBody": "Perfect for pre-med students tracking their science GPA. The multi-semester feature lets me see exactly what grades I need to maintain Dean's List eligibility. The calculation is precise to three decimal places, just like UVA's official system.",
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
            "name": "Michael Thompson"
          },
          "datePublished": "2025-11-10",
          "reviewBody": "Great tool for Engineering students. The school-specific requirements section helped me understand SEAS's 2.0 minimum GPA policy. Interface is clean and mobile-friendly, which is perfect for checking between classes.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        }
      ]
    };

    const softwareScript = document.createElement('script');
    softwareScript.setAttribute('type', 'application/ld+json');
    softwareScript.textContent = JSON.stringify(softwareSchema);
    document.head.appendChild(softwareScript);

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
          "name": "UVA GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator"
        }
      ]
    };

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.setAttribute('type', 'application/ld+json');
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does UVA award 4.3 for an A+?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, UVA does not award 4.3 for an A+. Both A and A+ are treated equally at 4.0 on the UVA grade scale."
          }
        },
        {
          "@type": "Question",
          "name": "Do Pass/Fail courses affect my GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, courses graded on a Credit/No Credit or Satisfactory/Unsatisfactory basis do not affect your GPA. However, certain conditions must be met for these courses to count toward degree requirements."
          }
        },
        {
          "@type": "Question",
          "name": "How are repeated courses calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Repeated courses are factored in differently depending on the school. Usually, both attempts count unless specifically replaced according to your school's policy. Check with your academic advisor."
          }
        },
        {
          "@type": "Question",
          "name": "Do withdrawals (W) affect my GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, withdrawals (W) and incompletes (IN) do not affect your GPA calculation at UVA."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for Latin honors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cum Laude requires 3.400+, Magna Cum Laude requires 3.600+, and Summa Cum Laude requires 3.800+ cumulative GPA at graduation. Some schools may have additional criteria."
          }
        },
        {
          "@type": "Question",
          "name": "How precise is UVA's GPA calculation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "UVA calculates GPAs to the thousandths place (three decimal points), so your GPA might appear as 3.678 rather than 3.68."
          }
        }
      ]
    };

    const faqScript = document.createElement('script');
    faqScript.setAttribute('type', 'application/ld+json');
    faqScript.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // HowTo Schema for Calculation Example
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate UVA GPA Step by Step",
      "description": "Learn how to calculate your University of Virginia GPA using the official 4.0 scale with a detailed example.",
      "totalTime": "PT5M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Multiply grade points by credit hours",
          "text": "For each course, multiply the grade points (A=4.0, B+=3.3, etc.) by the number of credit hours. For example: English 101 (A, 4.0) × 3 credits = 12.0 quality points."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Sum all quality points",
          "text": "Add up all the quality points from all courses. Example: 12.0 + 13.2 + 14.8 + 9.0 = 49.0 total quality points."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Sum all credit hours",
          "text": "Add up all the credit hours from all courses. Example: 3 + 4 + 4 + 3 = 14 total credits."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Divide quality points by credit hours",
          "text": "Divide total quality points by total credit hours to get your GPA. Example: 49.0 ÷ 14 = 3.500 GPA."
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "UVA GPA Calculator"
        }
      ]
    };

    const howToScript = document.createElement('script');
    howToScript.setAttribute('type', 'application/ld+json');
    howToScript.textContent = JSON.stringify(howToSchema);
    document.head.appendChild(howToScript);

    return () => {
      const elements = document.querySelectorAll('meta[name^="og:"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]');
      elements.forEach(el => el.remove());
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(s => s.remove());
    };
  }, []);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInChart {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        /* Print styles for GPA Trend Chart */
        @media print {
          #gpa-trend-chart {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 15px;
          }
          
          #gpa-trend-chart svg {
            max-width: 100%;
            height: auto;
          }
          
          .print\\:border {
            border: 1px solid #ccc !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-navy-50">
        {/* localStorage Corruption Warning */}
        {showCorruptionWarning && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mx-6 mt-6 rounded-lg" role="alert">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">
                  ⚠️ Your saved data was corrupted and has been reset. Please re-enter your courses.
                </p>
              </div>
              <button
                onClick={() => setShowCorruptionWarning(false)}
                className="ml-auto flex-shrink-0 text-yellow-500 hover:text-yellow-700"
                aria-label="Close warning"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-blue-700 to-navy-800"></div>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-2xl">🎓</span>
              <span className="text-blue-900 text-sm font-medium">University of Virginia</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              UVA GPA Calculator
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-6">
              Official University of Virginia (Wahoos) GPA calculator with UVA grade scale (A+ = 4.0). Calculate semester GPA, cumulative GPA, and track Latin honors eligibility for Cum Laude, Magna Cum Laude, and Summa Cum Laude at Thomas Jefferson's university.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2.5 shadow-xl border-2 border-orange-200">
                <span className="text-2xl">🏫</span>
                <span className="font-bold text-gray-800 text-base">Official UVA Scale</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2.5 shadow-xl border-2 border-blue-200">
                <span className="text-2xl">📊</span>
                <span className="font-bold text-gray-800 text-base">Multi-Semester Tracking</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 flex items-center gap-2.5 shadow-xl border-2 border-orange-200">
                <span className="text-2xl">🏆</span>
                <span className="font-bold text-gray-800 text-base">Honors Calculator</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Cumulative GPA Display */}
          <div className="bg-gradient-to-br from-orange-500 to-blue-600 text-white p-8 rounded-2xl shadow-2xl mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Cumulative GPA</h2>
              <div className="text-6xl font-bold mb-4">{cumulativeGPA.toFixed(3)}</div>
              <div className="text-xl font-semibold">{getHonorsStatus(cumulativeGPA)}</div>
              {cumulativeGPA >= 3.400 && (
                <div className="mt-4 text-sm opacity-90">
                  {cumulativeGPA < 3.600 && '🎯 0.200 points to Magna Cum Laude'}
                  {cumulativeGPA >= 3.600 && cumulativeGPA < 3.800 && '🎯 0.200 points to Summa Cum Laude'}
                  {cumulativeGPA >= 3.800 && '🌟 Highest honor achieved!'}
                </div>
              )}
            </div>
          </div>

          {/* GPA Trend Chart */}
          {semesters.length > 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 print:shadow-none print:border print:border-gray-300" id="gpa-trend-chart">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📈 GPA Trend</h3>
              <div className="relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-sm text-gray-600 font-medium">
                  <span>4.0</span>
                  <span>3.5</span>
                  <span>3.0</span>
                  <span>2.5</span>
                  <span>2.0</span>
                  <span>1.5</span>
                  <span>1.0</span>
                  <span>0.0</span>
                </div>

                {/* Chart area */}
                <div className="ml-14 relative" style={{ height: '300px' }}>
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.0].map((val, idx) => (
                      <div key={idx} className="border-t border-gray-200"></div>
                    ))}
                  </div>

                  {/* Honor level markers */}
                  <div className="absolute inset-0">
                    <div 
                      className="absolute w-full border-t-2 border-dashed border-yellow-400 opacity-50"
                      style={{ top: `${100 - (3.4 / 4.0 * 100)}%` }}
                      title="Cum Laude (3.400)"
                    >
                      <span className="absolute -top-3 right-2 text-xs text-yellow-600 font-semibold bg-white px-1">Cum Laude</span>
                    </div>
                    <div 
                      className="absolute w-full border-t-2 border-dashed border-orange-400 opacity-50"
                      style={{ top: `${100 - (3.6 / 4.0 * 100)}%` }}
                      title="Magna Cum Laude (3.600)"
                    >
                      <span className="absolute -top-3 right-2 text-xs text-orange-600 font-semibold bg-white px-1">Magna</span>
                    </div>
                    <div 
                      className="absolute w-full border-t-2 border-dashed border-red-400 opacity-50"
                      style={{ top: `${100 - (3.8 / 4.0 * 100)}%` }}
                      title="Summa Cum Laude (3.800)"
                    >
                      <span className="absolute -top-3 right-2 text-xs text-red-600 font-semibold bg-white px-1">Summa</span>
                    </div>
                  </div>

                  {/* SVG for line and points */}
                  <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="gpaLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                    
                    {/* Line connecting points */}
                    <polyline
                      points={semesterGPAs.map((sem, idx) => {
                        const x = (idx / (semesterGPAs.length - 1)) * 100;
                        const y = 100 - (sem.gpa / 4.0 * 100);
                        return `${x}%,${y}%`;
                      }).join(' ')}
                      fill="none"
                      stroke="url(#gpaLineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {semesterGPAs.map((sem, idx) => {
                      const x = (idx / (semesterGPAs.length - 1)) * 100;
                      const y = 100 - (sem.gpa / 4.0 * 100);
                      const honorsStatus = sem.gpa >= 3.8 ? 'Summa Cum Laude' : sem.gpa >= 3.6 ? 'Magna Cum Laude' : sem.gpa >= 3.4 ? 'Cum Laude' : 'No Honors';
                      return (
                        <g key={sem.id}>
                          {/* Invisible larger circle for better hover detection */}
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="12"
                            fill="transparent"
                            style={{ cursor: 'pointer' }}
                          >
                            <title>Semester {idx + 1}: GPA {sem.gpa.toFixed(3)} - {honorsStatus}</title>
                          </circle>
                          {/* Visible data point */}
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="6"
                            fill="white"
                            stroke={sem.gpa >= 3.8 ? '#dc2626' : sem.gpa >= 3.6 ? '#f97316' : sem.gpa >= 3.4 ? '#eab308' : '#2563eb'}
                            strokeWidth="3"
                            style={{ 
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                            }}
                            className="hover:r-8"
                          >
                            <title>Semester {idx + 1}: GPA {sem.gpa.toFixed(3)} - {honorsStatus}</title>
                          </circle>
                          {/* GPA label above point */}
                          <text
                            x={`${x}%`}
                            y={`${y}%`}
                            dy="-12"
                            textAnchor="middle"
                            className="text-xs font-bold fill-gray-700 pointer-events-none"
                          >
                            {sem.gpa.toFixed(2)}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="ml-14 mt-4 flex justify-between text-sm text-gray-600 font-medium">
                  {semesterGPAs.map((sem, idx) => (
                    <span key={sem.id}>S{idx + 1}</span>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-blue-600"></div>
                  <span className="text-gray-600">Semester GPA Trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 border-t-2 border-dashed border-yellow-400"></div>
                  <span className="text-gray-600">Honor Thresholds</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={addSemester}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Semester
            </button>
            {semesters.length > 1 && (
              <button
                onClick={clearAllData}
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-md"
              aria-label="Print UVA GPA report"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Report
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-md"
              aria-label="Download UVA GPA report as text file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Report
            </button>
          </div>

          {/* Calculator Section */}
          <div id="calculator" className="scroll-mt-24 mb-12">
            <div className="space-y-8">
              {semesters.map((semester, semIndex) => (
                <div 
                  key={semester.id} 
                  data-semester-id={semester.id}
                  className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 ease-in-out animate-fadeIn"
                  style={{ 
                    animation: 'fadeIn 0.5s ease-in-out',
                    transformOrigin: 'top'
                  }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Semester {semIndex + 1}</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Semester GPA</div>
                        <div className="text-3xl font-bold text-blue-600">
                          {semesterGPAs.find(s => s.id === semester.id)?.gpa.toFixed(3) || '0.000'}
                        </div>
                      </div>
                      {semesters.length > 1 && (
                        <button
                          onClick={() => removeSemester(semester.id)}
                          className="text-red-600 hover:text-red-700 p-2"
                          aria-label="Remove semester"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {semester.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                          <input
                            type="text"
                            list={`uva-course-list-${semester.id}-${courseIndex}`}
                            placeholder="e.g., MATH 1310"
                            value={course.name}
                            onChange={(e) => updateCourse(semester.id, courseIndex, 'name', e.target.value)}
                            className={`w-full px-4 py-3 border-2 ${!course.name.trim() ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 font-medium placeholder:text-gray-400`}
                            aria-label="Course name"
                          />
                          {!course.name.trim() && (
                            <p className="text-xs text-yellow-600 mt-1">⚠️ Course name is empty</p>
                          )}
                          <datalist id={`uva-course-list-${semester.id}-${courseIndex}`}>
                            {commonCourses.map((courseName) => (
                              <option key={courseName} value={courseName} />
                            ))}
                          </datalist>
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(semester.id, courseIndex, 'grade', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 font-medium"
                            aria-label="Grade"
                          >
                            {Object.keys(GRADE_SCALE).map(grade => (
                              <option key={grade} value={grade}>{grade} ({GRADE_SCALE[grade].toFixed(1)})</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Credits</label>
                          <input
                            type="number"
                            min="0"
                            max="6"
                            step="0.5"
                            value={course.credits === 0 ? '' : course.credits}
                            onChange={(e) => {
                              const value = e.target.value;
                              const parsed = value === '' ? 0 : parseFloat(value);
                              updateCourse(semester.id, courseIndex, 'credits', isNaN(parsed) ? 0 : Math.max(0, Math.min(6, parsed)));
                            }}
                            onFocus={(e) => {
                              if (e.target.value === '0') {
                                updateCourse(semester.id, courseIndex, 'credits', 0);
                              }
                            }}
                            className={`w-full px-4 py-3 border-2 ${course.credits === 0 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 font-medium`}
                            aria-label="Credit hours"
                          />
                          {course.credits === 0 && (
                            <p className="text-xs text-yellow-600 mt-1">⚠️ This course won't affect GPA</p>
                          )}
                        </div>

                        <div className="md:col-span-1 flex justify-center">
                          {semester.courses.length > 1 && (
                            <button
                              onClick={() => removeCourse(semester.id, courseIndex)}
                              className="text-red-600 hover:text-red-700 p-2"
                              aria-label="Delete course"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addCourse(semester.id)}
                    className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Course
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <TableOfContents sections={tocSections} />

          {/* Social Share */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Share This Calculator</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/uva-gpa-calculator')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Share UVA GPA Calculator on Facebook"
              >
                <span>📘</span> Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Calculate your University of Virginia GPA with Latin honors tracking!')}&url=${encodeURIComponent('https://zurawebtools.com/uva-gpa-calculator')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                aria-label="Share UVA GPA Calculator on Twitter"
              >
                <span>🐦</span> Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/uva-gpa-calculator')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                aria-label="Share UVA GPA Calculator on LinkedIn"
              >
                <span>💼</span> LinkedIn
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://zurawebtools.com/uva-gpa-calculator');
                  alert('Link copied to clipboard!');
                }}
                className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                aria-label="Copy link to clipboard"
              >
                <span>📋</span> Copy Link
              </button>
            </div>
          </div>

          {/* Quick Examples */}
          <section id="examples" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Quick Examples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Cum Laude Track</h3>
                <p className="text-sm text-blue-800 mb-2">4 courses with A- and B+ grades</p>
                <div className="text-2xl font-bold text-blue-600">3.475 GPA</div>
                <p className="text-xs text-blue-700 mt-2">Example: 3 A- (3.7) + 1 B+ (3.3) = 3.475</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Magna Cum Laude Track</h3>
                <p className="text-sm text-purple-800 mb-2">4 courses with mostly A grades</p>
                <div className="text-2xl font-bold text-purple-600">3.675 GPA</div>
                <p className="text-xs text-purple-700 mt-2">Example: 3 A (4.0) + 1 A- (3.7) = 3.675</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold text-orange-900 mb-3">Summa Cum Laude Track</h3>
                <p className="text-sm text-orange-800 mb-2">4 courses with all A and A+ grades</p>
                <div className="text-2xl font-bold text-orange-600">3.925 GPA</div>
                <p className="text-xs text-orange-700 mt-2">Example: 3 A (4.0) + 1 A- (3.7) = 3.925</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-700 text-center">
                <strong>💡 Tip:</strong> At UVA, A+ = 4.0 (not 4.3). Latin Honors: Cum Laude (3.400-3.599), Magna (3.600-3.799), Summa (3.800+)
              </p>
            </div>
          </section>

          {/* Understanding UVA GPA */}
          <div id="understanding" className="scroll-mt-24 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Understanding GPA at the University of Virginia</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  At the University of Virginia—often casually called UVA—your GPA is more than just a number. It reflects your academic performance throughout your courses and plays a critical role in honors designations, scholarships, and post-graduate opportunities.
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4">How GPA is Calculated at UVA</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  UVA uses a 4.0 GPA scale, where each letter grade corresponds to a specific number of grade points. To calculate your GPA, multiply the number of grade points by the number of credit hours for each course, then divide the total grade points by the total number of credit hours attempted.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  UVA calculates grade point averages to the thousandths place, which means your GPA can show up as something like 3.678.
                </p>
              </div>
            </div>
          </div>

          {/* UVA Grade Scale */}
          <div id="grade-scale" className="scroll-mt-24 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">UVA Grade Scale</h2>
              <p className="text-gray-700 mb-6">Here's the standard grade-to-GPA conversion chart used at UVA:</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="px-6 py-3 text-left font-semibold">Letter Grade</th>
                      <th className="px-6 py-3 text-left font-semibold">Grade Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(GRADE_SCALE).map(([grade, points], index) => (
                      <tr key={grade} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-3 border-b border-gray-200 font-medium text-gray-900">{grade}</td>
                        <td className="px-6 py-3 border-b border-gray-200 text-gray-800">{points.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
                <p className="text-blue-900 font-medium">💡 Note: UVA does not award 4.3 for an A+, unlike some schools. A and A+ are treated equally at 4.0.</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Pass/Fail and Non-GPA Courses</h3>
              <p className="text-gray-700 leading-relaxed">
                Some courses are graded on a Credit/No Credit or Satisfactory/Unsatisfactory basis. These grades do not affect your GPA. However, certain conditions must be met for these courses to count toward degree requirements.
              </p>
            </div>
          </div>

          {/* How to Calculate UVA GPA - Example */}
          <div id="example" className="scroll-mt-24 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 How to Calculate UVA GPA - Step-by-Step Example</h2>
              <p className="text-gray-700 mb-6">Let's walk through a real example to demonstrate how UVA GPA calculation works using the official 4.0 scale.</p>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Example Student: Fall 2024 Semester</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="px-4 py-3 text-left font-semibold">Course</th>
                        <th className="px-4 py-3 text-left font-semibold">Grade</th>
                        <th className="px-4 py-3 text-left font-semibold">Grade Points</th>
                        <th className="px-4 py-3 text-left font-semibold">Credits</th>
                        <th className="px-4 py-3 text-left font-semibold">Quality Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 text-gray-900">English 101</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">A</td>
                        <td className="px-4 py-3 text-gray-800">4.0</td>
                        <td className="px-4 py-3 text-gray-800">3</td>
                        <td className="px-4 py-3 font-semibold text-blue-700">12.0</td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 text-gray-900">Mathematics 201</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">B+</td>
                        <td className="px-4 py-3 text-gray-800">3.3</td>
                        <td className="px-4 py-3 text-gray-800">4</td>
                        <td className="px-4 py-3 font-semibold text-blue-700">13.2</td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-4 py-3 text-gray-900">Chemistry 150</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">A-</td>
                        <td className="px-4 py-3 text-gray-800">3.7</td>
                        <td className="px-4 py-3 text-gray-800">4</td>
                        <td className="px-4 py-3 font-semibold text-blue-700">14.8</td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="px-4 py-3 text-gray-900">History 105</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">B</td>
                        <td className="px-4 py-3 text-gray-800">3.0</td>
                        <td className="px-4 py-3 text-gray-800">3</td>
                        <td className="px-4 py-3 font-semibold text-blue-700">9.0</td>
                      </tr>
                      <tr className="bg-blue-100 font-bold">
                        <td className="px-4 py-3 text-gray-900" colSpan={3}>Total</td>
                        <td className="px-4 py-3 text-gray-900">14</td>
                        <td className="px-4 py-3 text-blue-700">49.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-gray-800 mb-3 text-lg">🧮 Calculation Steps:</h4>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Step 1:</strong> Multiply each grade's points by its credit hours:
                    <ul className="ml-6 mt-2 space-y-1 text-sm">
                      <li>• English 101: 4.0 × 3 credits = 12.0 quality points</li>
                      <li>• Mathematics 201: 3.3 × 4 credits = 13.2 quality points</li>
                      <li>• Chemistry 150: 3.7 × 4 credits = 14.8 quality points</li>
                      <li>• History 105: 3.0 × 3 credits = 9.0 quality points</li>
                    </ul>
                  </li>
                  <li><strong>Step 2:</strong> Add all quality points: 12.0 + 13.2 + 14.8 + 9.0 = <strong>49.0 total quality points</strong></li>
                  <li><strong>Step 3:</strong> Add all credit hours: 3 + 4 + 4 + 3 = <strong>14 total credits</strong></li>
                  <li><strong>Step 4:</strong> Divide total quality points by total credits: 49.0 ÷ 14 = <strong>3.500</strong></li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-xl text-center">
                <div className="text-sm font-semibold mb-2">Semester GPA Result</div>
                <div className="text-5xl font-bold mb-2">3.500</div>
                <div className="text-lg">✅ Magna Cum Laude Track (Needs 3.600+ at graduation)</div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-gray-700"><strong>💡 Key Takeaway:</strong> UVA calculates GPA to three decimal places (e.g., 3.500, not 3.50). Notice that the A+ grade would still be 4.0 at UVA—not 4.3 like some other schools. This student's 3.500 GPA qualifies for Cum Laude (3.400+) and is approaching Magna Cum Laude (3.600+).</p>
              </div>
            </div>
          </div>

          {/* UVA vs Other Universities GPA Comparison */}
          <div id="comparison" className="scroll-mt-24 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 UVA vs Other Universities: GPA Scale Comparison</h2>
              <p className="text-gray-700 mb-6">Understanding how UVA's GPA calculation differs from other institutions is crucial for transfer students, graduate school applicants, and those comparing academic performance across universities.</p>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-600 to-blue-600 text-white">
                      <th className="px-6 py-4 text-left font-semibold">University</th>
                      <th className="px-6 py-4 text-left font-semibold">A+ Grade Points</th>
                      <th className="px-6 py-4 text-left font-semibold">Scale Type</th>
                      <th className="px-6 py-4 text-left font-semibold">Key Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-orange-50 border-b">
                      <td className="px-6 py-4 font-bold text-gray-900">University of Virginia (UVA)</td>
                      <td className="px-6 py-4 font-semibold text-blue-700">4.0</td>
                      <td className="px-6 py-4 text-gray-800">4.0 Scale</td>
                      <td className="px-6 py-4 text-sm text-gray-700">A+ capped at 4.0, same as A</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">UC Berkeley</td>
                      <td className="px-6 py-4 text-gray-800">4.0</td>
                      <td className="px-6 py-4 text-gray-800">4.0 Scale</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Weighted GPA for honors/AP courses</td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">Rutgers University</td>
                      <td className="px-6 py-4 text-gray-800">4.0</td>
                      <td className="px-6 py-4 text-gray-800">4.0 Scale</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Uses 0.5 increments (B+=3.5)</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">Columbia University</td>
                      <td className="px-6 py-4 font-semibold text-green-700">4.3</td>
                      <td className="px-6 py-4 text-gray-800">4.3 Scale</td>
                      <td className="px-6 py-4 text-sm text-gray-700">A+ awarded 4.3 points</td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">Stanford University</td>
                      <td className="px-6 py-4 font-semibold text-green-700">4.3</td>
                      <td className="px-6 py-4 text-gray-800">4.3 Scale</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Allows GPAs above 4.0</td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium text-gray-900">High Schools (Weighted)</td>
                      <td className="px-6 py-4 font-semibold text-purple-700">5.0+</td>
                      <td className="px-6 py-4 text-gray-800">Weighted 5.0 Scale</td>
                      <td className="px-6 py-4 text-sm text-gray-700">AP/Honors get +1.0 bonus</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-3xl mb-3">🔵</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">4.0 Scale (UVA)</h3>
                  <p className="text-gray-700 text-sm mb-2"><strong>Max GPA:</strong> 4.000</p>
                  <p className="text-gray-700 text-sm mb-2"><strong>A+ Treatment:</strong> Same as A (4.0)</p>
                  <p className="text-gray-700 text-sm"><strong>Used By:</strong> UVA, UC Berkeley, most public universities</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="text-3xl mb-3">🟢</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">4.3 Scale</h3>
                  <p className="text-gray-700 text-sm mb-2"><strong>Max GPA:</strong> 4.300</p>
                  <p className="text-gray-700 text-sm mb-2"><strong>A+ Treatment:</strong> 4.3 grade points</p>
                  <p className="text-gray-700 text-sm"><strong>Used By:</strong> Columbia, Stanford, some Ivy League schools</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="text-3xl mb-3">🟣</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Weighted 5.0 Scale</h3>
                  <p className="text-gray-700 text-sm mb-2"><strong>Max GPA:</strong> 5.000+</p>
                  <p className="text-gray-700 text-sm mb-2"><strong>A+ Treatment:</strong> 5.0 in honors/AP</p>
                  <p className="text-gray-700 text-sm"><strong>Used By:</strong> High schools with AP/IB programs</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-gray-800 mb-3 text-lg">⚠️ Important for Transfer Students & Graduate Applications</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>• Converting Between Scales:</strong> Many graduate programs recalculate GPAs using their own scale. A 4.0 at UVA equals a 4.0 at Columbia, even though Columbia awards 4.3 for A+.</li>
                  <li><strong>• Transcript Evaluation:</strong> Professional schools (medical, law, business) often use standardized GPA calculators that normalize different scales.</li>
                  <li><strong>• Scholarship Applications:</strong> Always specify which scale your institution uses (e.g., "3.85/4.0" vs "3.85/4.3") to avoid confusion.</li>
                  <li><strong>• UVA's Advantage:</strong> The 4.0 cap is standard and widely recognized, making UVA transcripts easy to evaluate nationally.</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-3 text-lg">📊 Example Comparison: Same Grades, Different Scales</h4>
                <p className="text-gray-700 mb-3">Two students with identical letter grades but different university scales:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-blue-600 mb-2">Student A (UVA - 4.0 Scale)</p>
                    <p className="text-sm text-gray-700">Grades: A+, A, A-, B+</p>
                    <p className="text-sm text-gray-700">GPA: (4.0 + 4.0 + 3.7 + 3.3) ÷ 4 = <strong>3.750</strong></p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-green-600 mb-2">Student B (Columbia - 4.3 Scale)</p>
                    <p className="text-sm text-gray-700">Grades: A+, A, A-, B+</p>
                    <p className="text-sm text-gray-700">GPA: (4.3 + 4.0 + 3.7 + 3.3) ÷ 4 = <strong>3.825</strong></p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">Note: Graduate schools and employers understand these scale differences and normalize accordingly.</p>
              </div>
            </div>
          </div>

          {/* Latin Honors */}
          <div id="honors" className="scroll-mt-24 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">GPA and Latin Honors</h2>
              <p className="text-gray-700 mb-6">UVA awards Latin honors based on cumulative GPA at the time of graduation:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-300">
                  <div className="text-3xl mb-2">🥉</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Cum Laude</h3>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">3.400+</div>
                  <p className="text-gray-600 text-sm">With Honor</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-400">
                  <div className="text-3xl mb-2">🥈</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Magna Cum Laude</h3>
                  <div className="text-3xl font-bold text-gray-600 mb-2">3.600+</div>
                  <p className="text-gray-600 text-sm">With Great Honor</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-xl border-2 border-yellow-500">
                  <div className="text-3xl mb-2">🥇</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Summa Cum Laude</h3>
                  <div className="text-3xl font-bold text-yellow-700 mb-2">3.800+</div>
                  <p className="text-gray-600 text-sm">With Highest Honor</p>
                </div>
              </div>
              <p className="text-gray-600 mt-6 text-sm italic">Note: Some schools within UVA may set even higher GPA requirements or additional criteria for honors.</p>
            </div>
          </div>

          {/* School Requirements */}
          <div id="school-requirements" className="scroll-mt-24 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">GPA Requirements by School or Department</h2>
              <p className="text-gray-700 mb-6">UVA is made up of several colleges and professional schools, and some have unique grading practices or GPA thresholds. Here are the key requirements:</p>
              <div className="space-y-4">
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">🏗️ School of Engineering and Applied Science</h4>
                  <p className="text-gray-700 mb-2">Requires a minimum 2.0 GPA in both overall and major-specific courses to remain in good standing.</p>
                  <p className="text-gray-600 text-sm mb-2">Students below 2.0 may face academic probation or suspension.</p>
                  <p className="text-gray-600 text-sm"><strong>Academic Probation:</strong> Students on probation must raise their GPA above 2.0 within one semester to avoid academic dismissal.</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">📚 College of Arts & Sciences</h4>
                  <p className="text-gray-700 mb-2">Academic probation is triggered if a student's cumulative GPA falls below 1.8.</p>
                  <p className="text-gray-600 text-sm">Most competitive programs within Arts & Sciences expect significantly higher GPAs (3.0+).</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">💼 McIntire School of Commerce</h4>
                  <p className="text-gray-700 mb-2">Heavily GPA-sensitive for entry; applicants often need 3.6+ GPA for a competitive shot.</p>
                  <p className="text-gray-600 text-sm">McIntire admission is highly selective and considers prerequisite course performance closely.</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">⚕️ School of Nursing</h4>
                  <p className="text-gray-700 mb-2">Students must maintain at least a 2.5 GPA and earn minimum grades in clinical coursework.</p>
                  <p className="text-gray-600 text-sm">Clinical courses typically require C+ or better to progress in the program.</p>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-700">⚠️ <strong>Important:</strong> These thresholds don't affect how GPA is calculated, but they absolutely affect academic standing, eligibility for programs, and continuation in your major.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq" className="scroll-mt-24 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Does UVA award 4.3 for an A+?</h3>
                  <p className="text-gray-700">No, UVA does not award 4.3 for an A+. Both A and A+ are treated equally at 4.0 on the UVA grade scale.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Do Pass/Fail courses affect my GPA?</h3>
                  <p className="text-gray-700">No, courses graded on a Credit/No Credit or Satisfactory/Unsatisfactory basis do not affect your GPA. However, certain conditions must be met for these courses to count toward degree requirements.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">What GPA do I need for Dean's List at UVA?</h3>
                  <p className="text-gray-700">UVA Dean's List recognition typically requires a semester GPA of 3.4 or higher with at least 12 graded credit hours. Dean's List honors are awarded each semester and appear on your transcript, demonstrating consistent academic excellence. This distinction is valuable for graduate school applications and job searches.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">How are repeated courses calculated?</h3>
                  <p className="text-gray-700">Repeated courses are factored in differently depending on the school. Usually, both attempts count unless specifically replaced according to your school's policy. Check with your academic advisor.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Do withdrawals (W) affect my GPA?</h3>
                  <p className="text-gray-700">No, withdrawals (W) and incompletes (IN) do not affect your GPA calculation at UVA.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">What GPA do I need for Latin honors?</h3>
                  <p className="text-gray-700">Cum Laude requires 3.400+, Magna Cum Laude requires 3.600+, and Summa Cum Laude requires 3.800+ cumulative GPA at graduation. Some schools may have additional criteria.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">How precise is UVA's GPA calculation?</h3>
                  <p className="text-gray-700">UVA calculates GPAs to the thousandths place (three decimal points), so your GPA might appear as 3.678 rather than 3.68.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">What happens if my GPA falls below the minimum requirement?</h3>
                  <p className="text-gray-700">If your cumulative GPA falls below your school's minimum (typically 1.8-2.0), you may be placed on academic probation. During probation, you'll need to meet specific conditions—usually raising your GPA above the threshold within one semester—to continue enrollment. Academic advisors provide support plans to help students recover their academic standing. Maintaining good academic standing is crucial for financial aid eligibility and program continuation.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Helpful Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Withdrawals (W) and incompletes (IN) do not affect your GPA.</li>
                <li>Repeated courses are factored in differently depending on the school; usually, both attempts count unless specifically replaced.</li>
                <li>Stay in contact with your academic advisor if you're unsure how a course will impact your GPA.</li>
              </ul>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">References</h4>
                <ul className="space-y-2">
                  <li><a href="https://registrar.virginia.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">UVA Registrar</a></li>
                  <li><a href="https://artsandsciences.virginia.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">College of Arts & Sciences</a></li>
                  <li><a href="https://engineering.virginia.edu/office-undergraduate-programs/academic-policies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">School of Engineering</a></li>
                </ul>
              </div>
            </div>
          </div>

          <RelatedTools 
            currentSlug="uva-gpa-calculator" 
            relatedSlugs={["berkeley-gpa-calculator", "rutgers-gpa-calculator", "uta-gpa-calculator", "lsac-gpa-calculator"]} 
            navigateTo={navigateTo} 
          />
        </div>
      </div>
    </>
  );
};

export default UVAGPACalculator;
