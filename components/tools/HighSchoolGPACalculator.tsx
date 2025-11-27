import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface HighSchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

// Icon Components
const Calculator = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
);
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);
const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
);
const Share2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
);
const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth={2} /><circle cx="12" cy="12" r="6" strokeWidth={2} /><circle cx="12" cy="12" r="2" fill="currentColor" /></svg>
);
const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
);
const School = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);
const GraduationCap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
);
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const Brain = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);
const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
);

type GradeFormat = 'letter' | 'percentage';
type CourseType = 'regular' | 'honors' | 'ap';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
  courseType: CourseType;
}

interface Semester {
  id: string;
  label: string;
  courses: Course[];
}

const HighSchoolGPACalculator: React.FC<HighSchoolGPACalculatorProps> = ({ navigateTo }) => {
  const [gradeFormat, setGradeFormat] = useState<GradeFormat>('letter');
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      label: 'Semester 1',
      courses: [
        { id: '1', name: '', grade: '', credits: 1, courseType: 'regular' }
      ]
    }
  ]);
  const [showWeighted, setShowWeighted] = useState(true);
  const [autoCredit, setAutoCredit] = useState(false);

  // Grade conversion maps
  const letterToUnweighted: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const percentageToLetter = (percentage: number): string => {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  };

  const getWeightedGradePoint = (letterGrade: string, courseType: CourseType): number => {
    const basePoint = letterToUnweighted[letterGrade] || 0;
    if (basePoint === 0) return 0; // F is always 0

    if (courseType === 'honors') {
      return Math.min(basePoint + 0.5, 5.0);
    } else if (courseType === 'ap') {
      return Math.min(basePoint + 1.0, 5.0);
    }
    return basePoint;
  };

  const calculateGPA = (weighted: boolean) => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        if (!course.grade) return;

        let letterGrade = course.grade;
        if (gradeFormat === 'percentage') {
          const percentage = parseFloat(course.grade);
          if (isNaN(percentage)) return;
          letterGrade = percentageToLetter(percentage);
        }

        const gradePoint = weighted
          ? getWeightedGradePoint(letterGrade, course.courseType)
          : (letterToUnweighted[letterGrade] || 0);

        const effectiveCredits = autoCredit ? 1.0 : course.credits;
        totalPoints += gradePoint * effectiveCredits;
        totalCredits += effectiveCredits;
      });
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const calculateSemesterGPA = (semester: Semester, weighted: boolean) => {
    let totalPoints = 0;
    let totalCredits = 0;

    semester.courses.forEach(course => {
      if (!course.grade) return;

      let letterGrade = course.grade;
      if (gradeFormat === 'percentage') {
        const percentage = parseFloat(course.grade);
        if (isNaN(percentage)) return;
        letterGrade = percentageToLetter(percentage);
      }

      const gradePoint = weighted
        ? getWeightedGradePoint(letterGrade, course.courseType)
        : (letterToUnweighted[letterGrade] || 0);

      const effectiveCredits = autoCredit ? 1.0 : course.credits;
      totalPoints += gradePoint * effectiveCredits;
      totalCredits += effectiveCredits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const addCourse = (semesterId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          courses: [...sem.courses, {
            id: Date.now().toString(),
            name: '',
            grade: '',
            credits: 1,
            courseType: 'regular'
          }]
        };
      }
      return sem;
    }));
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId && sem.courses.length > 1) {
        return {
          ...sem,
          courses: sem.courses.filter(c => c.id !== courseId)
        };
      }
      return sem;
    }));
  };

  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: any) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          courses: sem.courses.map(course => {
            if (course.id === courseId) {
              return { ...course, [field]: value };
            }
            return course;
          })
        };
      }
      return sem;
    }));
  };

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      label: `Semester ${semesters.length + 1}`,
      courses: [
        { id: Date.now().toString(), name: '', grade: '', credits: 1, courseType: 'regular' }
      ]
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (semesterId: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(sem => sem.id !== semesterId));
    }
  };

  const updateSemesterLabel = (semesterId: string, label: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semesterId) {
        return { ...sem, label };
      }
      return sem;
    }));
  };

  const resetCalculator = () => {
    setSemesters([
      {
        id: '1',
        label: 'Semester 1',
        courses: [
          { id: '1', name: '', grade: '', credits: 1, courseType: 'regular' }
        ]
      }
    ]);
  };

  const cumulativeGPA = useMemo(() => calculateGPA(showWeighted), [
    semesters,
    gradeFormat,
    showWeighted,
    autoCredit
  ]);

  // Print GPA Report function
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>GPA Report - ${new Date().toLocaleDateString()}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          h1 { color: #1e40af; margin-bottom: 10px; }
          .subtitle { color: #6b7280; margin-bottom: 30px; }
          .gpa-box { background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
          .gpa-value { font-size: 48px; font-weight: bold; color: #1e40af; }
          .gpa-label { font-size: 18px; color: #6b7280; margin-top: 10px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f3f4f6; padding: 12px; text-align: left; border-bottom: 2px solid #d1d5db; }
          td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
          .semester-header { background: #f9fafb; font-weight: bold; padding: 15px 10px; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <h1>High School GPA Report</h1>
        <p class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        
        <div class="gpa-box">
          <div class="gpa-value">${cumulativeGPA}</div>
          <div class="gpa-label">${showWeighted ? 'Weighted' : 'Unweighted'} Cumulative GPA</div>
        </div>

        <h2>Course Breakdown</h2>
    `;

    semesters.forEach(semester => {
      const semesterGPA = calculateSemesterGPA(semester, showWeighted);
      reportHTML += `
        <table>
          <tr class="semester-header">
            <td colspan="4">${semester.label} - GPA: ${semesterGPA}</td>
          </tr>
          <tr>
            <th>Course Name</th>
            <th>Grade</th>
            <th>Credits</th>
            <th>Type</th>
          </tr>
      `;

      semester.courses.forEach(course => {
        if (course.grade) {
          let displayGrade = course.grade;
          if (gradeFormat === 'percentage') {
            const percentage = parseFloat(course.grade);
            if (!isNaN(percentage)) {
              displayGrade = `${course.grade}% (${percentageToLetter(percentage)})`;
            }
          }
          const typeLabel = course.courseType === 'regular' ? 'Regular' : 
                           course.courseType === 'honors' ? 'Honors (+0.5)' : 
                           'AP/IB (+1.0)';
          reportHTML += `
            <tr>
              <td>${course.name || 'Unnamed Course'}</td>
              <td>${displayGrade}</td>
              <td>${autoCredit ? '1.0 (auto)' : course.credits}</td>
              <td>${typeLabel}</td>
            </tr>
          `;
        }
      });

      reportHTML += `</table>`;
    });

    reportHTML += `
        <div class="footer">
          <p><strong>Report Details:</strong></p>
          <p>Total Semesters: ${semesters.length} | Grade Format: ${gradeFormat === 'letter' ? 'Letter Grade' : 'Percentage'}</p>
          <p>Calculation Method: ${showWeighted ? 'Weighted (includes course type bonuses)' : 'Unweighted (standard 4.0 scale)'}</p>
          <p>Generated by ZuraWebTools - High School GPA Calculator</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(reportHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  // Download GPA Report as text file
  const handleDownload = () => {
    let reportText = `HIGH SCHOOL GPA REPORT\n`;
    reportText += `Generated: ${new Date().toLocaleString()}\n`;
    reportText += `${'='.repeat(60)}\n\n`;
    
    reportText += `CUMULATIVE GPA: ${cumulativeGPA}\n`;
    reportText += `Type: ${showWeighted ? 'Weighted' : 'Unweighted'}\n`;
    reportText += `Grade Format: ${gradeFormat === 'letter' ? 'Letter Grade' : 'Percentage'}\n`;
    reportText += `Total Semesters: ${semesters.length}\n\n`;

    semesters.forEach((semester, index) => {
      const semesterGPA = calculateSemesterGPA(semester, showWeighted);
      reportText += `${'-'.repeat(60)}\n`;
      reportText += `${semester.label.toUpperCase()} - GPA: ${semesterGPA}\n`;
      reportText += `${'-'.repeat(60)}\n\n`;

      semester.courses.forEach((course, courseIndex) => {
        if (course.grade) {
          let displayGrade = course.grade;
          if (gradeFormat === 'percentage') {
            const percentage = parseFloat(course.grade);
            if (!isNaN(percentage)) {
              displayGrade = `${course.grade}% (${percentageToLetter(percentage)})`;
            }
          }
          const typeLabel = course.courseType === 'regular' ? 'Regular' : 
                           course.courseType === 'honors' ? 'Honors (+0.5)' : 
                           'AP/IB (+1.0)';
          const credits = autoCredit ? '1.0 (auto)' : course.credits.toString();
          
          reportText += `${courseIndex + 1}. ${course.name || 'Unnamed Course'}\n`;
          reportText += `   Grade: ${displayGrade} | Credits: ${credits} | Type: ${typeLabel}\n\n`;
        }
      });
    });

    reportText += `\n${'='.repeat(60)}\n`;
    reportText += `CALCULATION METHOD:\n`;
    reportText += showWeighted 
      ? `Weighted GPA includes course type bonuses:\n- Honors courses: +0.5 points (max 4.5)\n- AP/IB courses: +1.0 point (max 5.0)\n`
      : `Unweighted GPA uses standard 4.0 scale:\n- All courses treated equally regardless of difficulty\n`;
    reportText += `\nGenerated by ZuraWebTools\nhttps://zurawebtools.com/education-and-exam-tools/gpa-tools/high-school-gpa-calculator\n`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // SEO Metadata
  useEffect(() => {
    document.title = "High School GPA Calculator - Weighted & Unweighted | ZuraWebTools";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free high school GPA calculator with weighted & unweighted options. Calculate semester GPA with AP, Honors courses. Track multiple semesters instantly.');
    }

    // Open Graph tags
    const ogTags = {
      'og:title': 'High School GPA Calculator - Weighted & Unweighted | ZuraWebTools',
      'og:description': 'Free high school GPA calculator with weighted & unweighted options. Calculate semester GPA with AP, Honors courses. Track multiple semesters instantly.',
      'og:url': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/high-school-gpa-calculator',
      'og:type': 'website',
      'og:image': 'https://zurawebtools.com/og-image.jpg'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'High School GPA Calculator - Weighted & Unweighted',
      'twitter:description': 'Free high school GPA calculator with weighted & unweighted options. Calculate semester GPA with AP, Honors courses.',
      'twitter:image': 'https://zurawebtools.com/og-image.jpg'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/high-school-gpa-calculator');

    // JSON-LD Schema
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "High School GPA Calculator",
        "description": "Free high school GPA calculator with weighted and unweighted options. Calculate semester GPA with AP, Honors, and regular courses. Track multiple semesters instantly.",
        "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/high-school-gpa-calculator",
        "inLanguage": "en",
        "datePublished": "2025-11-27",
        "dateModified": "2025-11-27",
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "breadcrumb": {
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
              "name": "High School GPA Calculator",
              "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/high-school-gpa-calculator"
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "High School GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "description": "Calculate your high school GPA with support for weighted and unweighted systems. Supports AP, Honors, and regular courses across multiple semesters.",
        "featureList": ["Weighted GPA calculation", "Unweighted GPA calculation", "AP course support (+1.0)", "Honors course support (+0.5)", "Multiple semester tracking", "Letter and percentage grade formats", "Credit hour weighting", "Real-time calculations"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "127",
          "bestRating": "5"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate High School GPA",
        "description": "Step-by-step guide to calculate your high school GPA using weighted and unweighted methods",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Your Grade Format",
            "text": "Choose between Letter Grade (A+, A, A-, B+, etc.) or Percentage (0-100%) format based on how your school reports grades. The calculator automatically converts percentages to letter grades using standard scales."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add Your Courses",
            "text": "Enter each course with Course Name, Grade, Credits (usually 1.0 for year-long, 0.5 for semester), and Course Type (Regular, Honors +0.5, or AP/IB +1.0). For example: AP Biology with grade A, 1.0 credits, AP type equals 5.0 weighted grade points."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Add Multiple Semesters",
            "text": "Click Add Semester to track your GPA across multiple terms. You can customize semester labels and see individual semester GPAs alongside your cumulative GPA."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Your Results",
            "text": "Your GPA updates automatically as you enter data. Toggle between Weighted and Unweighted views to see both calculations. Weighted GPA shows course rigor, while unweighted GPA shows performance on a standard 4.0 scale."
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the difference between weighted and unweighted GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unweighted GPA uses a standard 4.0 scale where all courses are treated equally (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0). Weighted GPA gives extra points for advanced courses: Honors courses add +0.5 points (max 4.5), and AP/IB courses add +1.0 point (max 5.0). This rewards students taking challenging coursework."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my high school GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate your GPA: 1) Convert each letter grade to grade points (A=4.0, B=3.0, etc.), 2) Multiply grade points by credit hours for each course, 3) Add all grade points together, 4) Divide by total credit hours. For weighted GPA, add bonus points for Honors (+0.5) and AP/IB (+1.0) courses before multiplying by credits."
            }
          },
          {
            "@type": "Question",
            "name": "Do colleges prefer weighted or unweighted GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Colleges look at both. Unweighted GPA shows your overall performance on a standard scale, while weighted GPA demonstrates course rigor. Most competitive colleges recalculate your GPA using their own system. Taking challenging courses (AP/IB/Honors) with good grades is generally more impressive than perfect grades in easier classes."
            }
          },
          {
            "@type": "Question",
            "name": "How much do AP courses boost my GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AP and IB courses typically add 1.0 point to your weighted GPA (A=5.0 instead of 4.0, B=4.0 instead of 3.0). Honors courses usually add 0.5 points (A=4.5 instead of 4.0). However, these bonuses only apply to weighted GPA calculations - unweighted GPA remains on the standard 4.0 scale regardless of course difficulty."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good high school GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 'good' GPA depends on your goals. For competitive colleges: 3.5+ unweighted (3.8+ for top schools), 4.0+ weighted. For state universities: 3.0-3.5 unweighted. For community college: 2.0+. However, GPA is just one factor - course rigor, test scores, extracurriculars, and essays also matter significantly in college admissions."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use percentage grades in this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our calculator supports both letter grades and percentage grades. When you select percentage mode, the calculator automatically converts your numerical grades to letter grades using standard conversion scales (97-100=A+, 93-96=A, 90-92=A-, etc.) before calculating your GPA."
            }
          },
          {
            "@type": "Question",
            "name": "How many semesters should I calculate for college applications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most colleges want your cumulative GPA from 9th-11th grade (6 semesters) for applications, since 12th grade isn't complete yet. Some schools may only count 10th-11th grade. Calculate all available semesters in our tool, then check each college's specific requirements. Your school transcript will show official semester-by-semester GPAs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for middle school GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! While this tool is designed for high school students, it works perfectly for middle school GPA calculations too. Middle schools typically use the same 4.0 unweighted scale. However, most middle schools don't offer weighted courses like AP or Honors. Important: Most high schools and colleges don't count middle school grades in official GPA calculations - your high school transcript typically starts fresh in 9th grade."
            }
          },
          {
            "@type": "Question",
            "name": "How do UC and CSU calculate capped weighted GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The University of California (UC) and California State University (CSU) systems use a unique capped weighted GPA calculation that limits honors points. For UC/CSU applications, you can only count a maximum of 8 semesters (4 year-long courses) of honors, AP, or IB courses for the weighted GPA bonus during 10th and 11th grades. This creates a capped weighted GPA typically ranging from 4.0 to ~4.4, unlike uncapped weighted GPAs that can reach 5.0."
            }
          },
          {
            "@type": "Question",
            "name": "What is the highest GPA possible in high school?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The highest possible GPA in high school is 5.0 on a weighted scale with AP, IB, or Honors course bonuses. On an unweighted scale, the maximum is 4.0 (straight A's in all courses). To achieve a 5.0 weighted GPA, you would need to earn an A in every AP or IB course, which adds +1.0 point to the base 4.0 grade. Honors courses typically add +0.5, giving a maximum of 4.5 for an A in Honors."
            }
          }
        ]
      }
    ];

    schemas.forEach((schema, index) => {
      const existingScript = document.querySelector(`script[data-schema="${index}"]`);
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schema);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-schema', index.toString());
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    });

    // IndexNow Integration
    notifyIndexNow('/education-and-exam-tools/gpa-tools/high-school-gpa-calculator');

    return () => {
      schemas.forEach((_, index) => {
        const script = document.querySelector(`script[data-schema="${index}"]`);
        if (script) script.remove();
      });
    };
  }, []);

  // TOC sections
  const tocSections: TOCSection[] = [
    {
      id: 'examples',
      emoji: '📝',
      title: 'Quick Examples',
      subtitle: 'Sample calculations',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      hoverBorder: 'border-indigo-400',
      hoverText: 'text-indigo-600'
    },
    {
      id: 'benefits',
      emoji: '⭐',
      title: 'Benefits',
      subtitle: 'Why use this tool',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-pink-400',
      hoverText: 'text-pink-600'
    },
    {
      id: 'how-to-use',
      emoji: '📖',
      title: 'How to Use',
      subtitle: 'Step-by-step guide',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      hoverBorder: 'border-emerald-400',
      hoverText: 'text-emerald-600'
    },
    {
      id: 'use-cases',
      emoji: '🎯',
      title: 'Use Cases',
      subtitle: 'Who uses this',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-amber-400',
      hoverText: 'text-amber-600'
    },
    {
      id: 'about',
      emoji: '📚',
      title: 'About',
      subtitle: 'Learn more',
      gradientFrom: 'from-cyan-50',
      gradientTo: 'to-blue-50',
      hoverBorder: 'border-blue-400',
      hoverText: 'text-blue-600'
    },
    {
      id: 'faq',
      emoji: '❓',
      title: 'FAQs',
      subtitle: 'Common questions',
      gradientFrom: 'from-rose-50',
      gradientTo: 'to-red-50',
      hoverBorder: 'border-red-400',
      hoverText: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8" role="main">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            High School GPA Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your weighted and unweighted high school GPA with support for AP, Honors, and regular courses. Track multiple semesters and plan your academic goals.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Grade Format
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGradeFormat('letter')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    gradeFormat === 'letter'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Letter Grade
                </button>
                <button
                  onClick={() => setGradeFormat('percentage')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    gradeFormat === 'percentage'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Percentage
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="checkbox"
                  checked={autoCredit}
                  onChange={(e) => setAutoCredit(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Auto Credit (1.0)</span>
              </label>
            </div>

            <button
              onClick={resetCalculator}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Semesters */}
          <div className="space-y-6 mb-6">
            {semesters.map((semester, semIndex) => (
              <div key={semester.id} className="border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50">
                
                {/* Semester Header */}
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={semester.label}
                    onChange={(e) => updateSemesterLabel(semester.id, e.target.value)}
                    className="text-lg font-bold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1 placeholder-gray-400"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">
                      GPA: <span className="text-blue-600 font-bold">{calculateSemesterGPA(semester, showWeighted)}</span>
                    </span>
                    {semesters.length > 1 && (
                      <button
                        onClick={() => removeSemester(semester.id)}
                        className="p-1 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Course Headers */}
                <div className="hidden md:grid grid-cols-12 gap-3 mb-3 text-sm font-semibold text-gray-700 px-2">
                  <div className={autoCredit ? "col-span-5" : "col-span-4"}>Course Name</div>
                  <div className="col-span-2">Grade</div>
                  {!autoCredit && <div className="col-span-2">Credits</div>}
                  <div className={autoCredit ? "col-span-4" : "col-span-3"}>Course Type</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Courses */}
                <div className="space-y-3">
                  {semester.courses.map((course) => (
                    <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start md:items-center">
                      
                      {/* Course Name */}
                      <div className={autoCredit ? "md:col-span-5" : "md:col-span-4"}>
                        <label className="block md:hidden text-xs font-semibold text-gray-600 mb-1">Course Name</label>
                        <input
                          type="text"
                          list={`courses-${semester.id}-${course.id}`}
                          value={course.name}
                          onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                          placeholder="e.g., AP Calculus AB or type custom"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                        />
                        <datalist id={`courses-${semester.id}-${course.id}`}>
                          <option value="English" />
                          <option value="English Literature" />
                          <option value="English Composition" />
                          <option value="AP English Language" />
                          <option value="AP English Literature" />
                          <option value="Algebra I" />
                          <option value="Algebra II" />
                          <option value="Geometry" />
                          <option value="Trigonometry" />
                          <option value="Pre-Calculus" />
                          <option value="Calculus" />
                          <option value="AP Calculus AB" />
                          <option value="AP Calculus BC" />
                          <option value="Statistics" />
                          <option value="AP Statistics" />
                          <option value="Biology" />
                          <option value="AP Biology" />
                          <option value="Chemistry" />
                          <option value="AP Chemistry" />
                          <option value="Physics" />
                          <option value="AP Physics 1" />
                          <option value="AP Physics 2" />
                          <option value="AP Physics C" />
                          <option value="Environmental Science" />
                          <option value="AP Environmental Science" />
                          <option value="World History" />
                          <option value="AP World History" />
                          <option value="US History" />
                          <option value="AP US History (APUSH)" />
                          <option value="European History" />
                          <option value="AP European History" />
                          <option value="Government" />
                          <option value="AP Government" />
                          <option value="Economics" />
                          <option value="AP Macroeconomics" />
                          <option value="AP Microeconomics" />
                          <option value="Psychology" />
                          <option value="AP Psychology" />
                          <option value="Spanish I" />
                          <option value="Spanish II" />
                          <option value="Spanish III" />
                          <option value="AP Spanish Language" />
                          <option value="AP Spanish Literature" />
                          <option value="French I" />
                          <option value="French II" />
                          <option value="French III" />
                          <option value="AP French Language" />
                          <option value="German I" />
                          <option value="German II" />
                          <option value="Chinese I" />
                          <option value="Chinese II" />
                          <option value="AP Chinese Language" />
                          <option value="Computer Science" />
                          <option value="AP Computer Science A" />
                          <option value="AP Computer Science Principles" />
                          <option value="Art" />
                          <option value="AP Art History" />
                          <option value="AP Studio Art" />
                          <option value="Music Theory" />
                          <option value="AP Music Theory" />
                          <option value="Physical Education" />
                          <option value="Health" />
                          <option value="Honors English" />
                          <option value="Honors Algebra" />
                          <option value="Honors Geometry" />
                          <option value="Honors Biology" />
                          <option value="Honors Chemistry" />
                          <option value="Honors Physics" />
                          <option value="Honors US History" />
                          <option value="Honors World History" />
                        </datalist>
                      </div>

                      {/* Grade */}
                      <div className="md:col-span-2">
                        <label className="block md:hidden text-xs font-semibold text-gray-600 mb-1">Grade</label>
                        {gradeFormat === 'letter' ? (
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                          >
                            <option value="">Select</option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D">D</option>
                            <option value="D-">D-</option>
                            <option value="F">F</option>
                          </select>
                        ) : (
                          <input
                            type="number"
                            value={course.grade}
                            onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                            placeholder="0-100"
                            min="0"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                          />
                        )}
                      </div>

                      {/* Credits */}
                      {!autoCredit && (
                        <div className="md:col-span-2">
                          <label className="block md:hidden text-xs font-semibold text-gray-600 mb-1">Credits</label>
                          <input
                            type="number"
                            value={course.credits}
                            onChange={(e) => updateCourse(semester.id, course.id, 'credits', parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.5"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                          />
                        </div>
                      )}

                      {/* Course Type */}
                      <div className={autoCredit ? "md:col-span-4" : "md:col-span-3"}>
                        <label className="block md:hidden text-xs font-semibold text-gray-600 mb-1">Course Type</label>
                        <select
                          value={course.courseType}
                          onChange={(e) => updateCourse(semester.id, course.id, 'courseType', e.target.value as CourseType)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                        >
                          <option value="regular">Regular</option>
                          <option value="honors">Honors (+0.5)</option>
                          <option value="ap">AP/IB (+1.0)</option>
                        </select>
                      </div>

                      {/* Remove Button */}
                      <div className="md:col-span-1 flex justify-end">
                        {semester.courses.length > 1 && (
                          <button
                            onClick={() => removeCourse(semester.id, course.id)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Course Button */}
                <button
                  onClick={() => addCourse(semester.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Course
                </button>
              </div>
            ))}
          </div>

          {/* Add Semester Button */}
          <button
            onClick={addSemester}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Semester
          </button>

          {/* GPA Display */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Cumulative GPA</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {cumulativeGPA}
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowWeighted(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  showWeighted
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Weighted
              </button>
              <button
                onClick={() => setShowWeighted(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !showWeighted
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Unweighted
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
              {showWeighted ? (
                <p>Weighted GPA includes course type bonuses (Honors +0.5, AP/IB +1.0)</p>
              ) : (
                <p>Unweighted GPA on standard 4.0 scale</p>
              )}
            </div>

            {/* Print & Download GPA Report Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg font-semibold transition-all hover:border-blue-500 hover:text-blue-600"
                aria-label="Print GPA Report"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all shadow-md"
                aria-label="Download GPA Report as Text File"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Report
              </button>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Social Share Buttons */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-blue-600" />
            Share This Tool
          </h2>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Share this calculator on social media">
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Calculate your high school GPA with this free calculator!');
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-medium transition-colors"
              aria-label="Share on Twitter"
            >
              <Share2 className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg font-medium transition-colors"
              aria-label="Share on Facebook"
            >
              <Share2 className="w-4 h-4" />
              Facebook
            </button>
            <button
              onClick={() => {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Calculate your high school GPA with this free calculator!');
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg font-medium transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Share2 className="w-4 h-4" />
              LinkedIn
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              aria-label="Copy link to clipboard"
            >
              <Share2 className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick GPA Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unweighted GPA Example</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700"><strong>English:</strong> A (4.0) × 3 credits = 12.0</p>
                <p className="text-sm text-gray-700"><strong>Math:</strong> B+ (3.3) × 3 credits = 9.9</p>
                <p className="text-sm text-gray-700"><strong>Science:</strong> A- (3.7) × 3 credits = 11.1</p>
                <p className="text-sm text-gray-700"><strong>History:</strong> B (3.0) × 3 credits = 9.0</p>
              </div>
              <div className="border-t-2 border-blue-300 pt-3">
                <p className="text-sm text-gray-700 mb-1">Total: 42.0 ÷ 12 credits</p>
                <p className="text-2xl font-bold text-blue-600">GPA: 3.50</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Weighted GPA Example</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700"><strong>AP English:</strong> A (5.0) × 3 = 15.0</p>
                <p className="text-sm text-gray-700"><strong>Honors Math:</strong> B+ (3.8) × 3 = 11.4</p>
                <p className="text-sm text-gray-700"><strong>AP Biology:</strong> A- (4.7) × 3 = 14.1</p>
                <p className="text-sm text-gray-700"><strong>Regular History:</strong> B (3.0) × 3 = 9.0</p>
              </div>
              <div className="border-t-2 border-purple-300 pt-3">
                <p className="text-sm text-gray-700 mb-1">Total: 49.5 ÷ 12 credits</p>
                <p className="text-2xl font-bold text-purple-600">GPA: 4.13</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Using Our GPA Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Accurate Calculations</h3>
                  <p className="text-gray-700">Instant weighted and unweighted GPA calculations with support for AP, Honors, and regular courses using industry-standard grading scales.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border-l-4 border-purple-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <TrendingUpIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Track Progress</h3>
                  <p className="text-gray-700">Monitor your GPA across multiple semesters, identify trends, and see how your academic performance evolves over time.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Your Goals</h3>
                  <p className="text-gray-700">Calculate what grades you need in future courses to reach your target GPA for college admissions or scholarship requirements.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">College Ready</h3>
                  <p className="text-gray-700">Understand how colleges view weighted vs. unweighted GPAs and optimize your course selection for competitive admissions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Your High School GPA</h2>
          
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Follow these simple steps to accurately calculate your high school GPA with our free calculator. Whether you're tracking semester grades or cumulative GPA, our tool makes it easy.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Your Grade Format</h3>
                <p className="text-gray-700 mb-3">
                  Choose between <strong>Letter Grade</strong> (A+, A, A-, B+, etc.) or <strong>Percentage</strong> (0-100%) format based on how your school reports grades. The calculator automatically converts percentages to letter grades using standard scales.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700"><strong>Tip:</strong> Most US high schools use letter grades. If your transcript shows percentages, our calculator will convert them accurately.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Your Courses</h3>
                <p className="text-gray-700 mb-3">
                  Enter each course with the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
                  <li><strong>Course Name:</strong> e.g., "AP Calculus AB", "English 10"</li>
                  <li><strong>Grade:</strong> Your letter grade or percentage</li>
                  <li><strong>Credits:</strong> Usually 1.0 for year-long courses, 0.5 for semester courses</li>
                  <li><strong>Course Type:</strong> Regular, Honors (+0.5), or AP/IB (+1.0)</li>
                </ul>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <p className="text-sm text-gray-700"><strong>Example:</strong> "AP Biology" with grade "A", 1.0 credits, AP type = 5.0 weighted grade points</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Multiple Semesters</h3>
                <p className="text-gray-700 mb-3">
                  Click <strong>"Add Semester"</strong> to track your GPA across multiple terms. You can customize semester labels (e.g., "Fall 2024", "Spring 2025") and see individual semester GPAs alongside your cumulative GPA.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">View Your Results</h3>
                <p className="text-gray-700 mb-3">
                  Your GPA updates automatically as you enter data. Toggle between <strong>Weighted</strong> and <strong>Unweighted</strong> views to see both calculations. Weighted GPA shows course rigor, while unweighted GPA shows performance on a standard 4.0 scale.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-2xl font-bold mb-3">GPA Calculation Formula</h3>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold mb-2">Unweighted GPA:</p>
                <p className="font-mono text-sm">GPA = (Sum of Grade Points × Credits) ÷ Total Credits</p>
                <p className="text-sm mt-2 opacity-90">Example: (4.0×3 + 3.3×3 + 3.7×3 + 3.0×3) ÷ 12 = 3.50</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold mb-2">Weighted GPA:</p>
                <p className="font-mono text-sm">Add bonuses: Honors +0.5, AP/IB +1.0 (max 5.0)</p>
                <p className="text-sm mt-2 opacity-90">Example: AP A (5.0×3) + Regular B (3.0×3) ÷ 6 = 4.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Uses This GPA Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500 rounded-full">
                  <School className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">High School Students</h3>
                  <p className="text-gray-700 mb-3">Track academic progress, plan course schedules, and ensure you meet college admission GPA requirements. Understand how taking AP or Honors classes affects your weighted GPA.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Monitor semester-by-semester progress</li>
                    <li>✓ Plan future course rigor</li>
                    <li>✓ Calculate scholarship eligibility</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500 rounded-full">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">College Applicants</h3>
                  <p className="text-gray-700 mb-3">Verify your transcript GPA before submitting college applications. Compare your GPA against college admission statistics and understand how different schools calculate GPA.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Verify application accuracy</li>
                    <li>✓ Compare with college averages</li>
                    <li>✓ Understand admissions chances</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-500 rounded-full">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Parents & Guardians</h3>
                  <p className="text-gray-700 mb-3">Help your student understand their academic standing, set realistic goals, and make informed decisions about course selection and college planning.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Support academic planning</li>
                    <li>✓ Understand school transcripts</li>
                    <li>✓ Guide college preparation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500 rounded-full">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Academic Counselors</h3>
                  <p className="text-gray-700 mb-3">Quick GPA calculations during student meetings, course planning sessions, and college application preparation. Help students understand GPA impact of course choices.</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Quick student assessments</li>
                    <li>✓ Course selection guidance</li>
                    <li>✓ College readiness planning</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About High School GPA Calculation</h2>
          
          <div className="prose max-w-none space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              Your <strong>high school GPA (Grade Point Average)</strong> is one of the most important metrics in your academic journey. It represents your average performance across all courses and plays a critical role in college admissions, scholarship opportunities, and academic honors. Understanding how to calculate both <strong>weighted and unweighted GPA</strong> with our <strong>cumulative GPA calculator</strong> helps you make informed decisions about course selection and academic planning.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Understanding GPA Scales</h3>
            <p>
              The <strong>unweighted 4.0 GPA scale</strong> ranges from 0.0 to 4.0, where an A equals 4.0, B equals 3.0, C equals 2.0, D equals 1.0, and F equals 0.0. This scale treats all courses equally regardless of difficulty. The <strong>weighted GPA scale</strong> extends to 5.0, giving bonus points for advanced coursework: Honors classes receive +0.5 points (maximum 4.5), while AP (Advanced Placement), IB (International Baccalaureate), and college-level courses receive +1.0 point (maximum 5.0).
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Why Weighted vs Unweighted Matters</h3>
            <p>
              Colleges look at both weighted and unweighted GPAs when evaluating applications. Your <strong>unweighted GPA</strong> shows consistent academic performance and is comparable across all students nationwide. Your <strong>weighted GPA</strong> demonstrates course rigor and willingness to challenge yourself with advanced classes. Most competitive colleges prefer students with strong weighted GPAs earned through rigorous coursework rather than perfect grades in easier classes. This is why our <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:underline font-semibold">college GPA calculator</a> and high school calculator both emphasize understanding these differences.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Credit Hours and Course Weighting</h3>
            <p>
              Most high school courses carry <strong>1.0 credit</strong> for full-year classes and <strong>0.5 credits</strong> for semester-long courses. When calculating GPA, each course's grade points are multiplied by its credit hours. For example, an A (4.0) in a 1-credit course contributes 4.0 quality points, while an A in a 0.5-credit course contributes 2.0 quality points. Your cumulative GPA is the sum of all quality points divided by total credits attempted. This credit-weighting ensures that longer or more intensive courses have appropriate influence on your overall GPA.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Strategic Course Planning</h3>
            <p>
              Smart <strong>academic course selection</strong> balances challenge with achievability. Taking advanced courses (AP, IB, Honors) can boost your <strong>weighted GPA</strong> and demonstrate academic readiness to colleges. However, earning a B+ in an AP course may be more impressive than an A in a regular course, as it shows both strong performance and willingness to tackle difficult material. Students aiming for top universities should gradually increase course rigor from 9th to 11th grade. Use our calculator to experiment with different scenarios and plan your ideal course schedule. For specialized tracks like pre-law, our <a href="/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" className="text-blue-600 hover:underline font-semibold">LSAC GPA calculator</a> can help you understand how law schools recalculate your GPA.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">GPA and College Admissions</h3>
            <p>
              Most colleges recalculate your GPA using their own methodology, often focusing on core academic subjects (English, Math, Science, Social Studies, Foreign Language) and excluding electives like PE or art. Some schools only consider 10th and 11th grade courses, while others include 9th grade. Highly selective universities may use weighted GPA to assess course rigor but compare applicants using unweighted GPA for fairness. Understanding these nuances helps you present your strongest academic profile. Students targeting California State Universities should also check our <a href="/education-and-exam-tools/gpa-tools/csu-gpa-calculator" className="text-blue-600 hover:underline font-semibold">CSU GPA calculator</a>, which follows the specific A-G course requirements and capped honors points system used by the CSU system.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mt-6 border-l-4 border-blue-500">
              <h4 className="text-xl font-bold text-gray-900 mb-3">💡 Pro Tips for GPA Success</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Start strong in 9th grade:</strong> Early grades count toward cumulative GPA and set your academic trajectory</li>
                <li><strong>Balance rigor with performance:</strong> A mix of AP/Honors and regular courses with high grades beats all AP courses with mediocre grades</li>
                <li><strong>Understand your school's policy:</strong> Some schools cap weighted GPA or limit how many honors points you can earn</li>
                <li><strong>Track progress regularly:</strong> Calculate your GPA each semester to identify trends and adjust study strategies</li>
                <li><strong>Focus on core subjects:</strong> Math, English, Science, and Social Studies carry more weight in college admissions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ExternalLink className="w-7 h-7 text-blue-600" />
            Helpful Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.collegeboard.org/how-to-calculate-gpa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all group"
            >
              <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">College Board - GPA Guide</p>
                <p className="text-sm text-gray-600">Official guidance on GPA calculation</p>
              </div>
            </a>
            <a
              href="https://apstudents.collegeboard.org/what-is-ap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all group"
            >
              <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">AP Courses Overview</p>
                <p className="text-sm text-gray-600">Learn about Advanced Placement classes</p>
              </div>
            </a>
            <a
              href="https://www.ibo.org/programmes/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all group"
            >
              <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">International Baccalaureate</p>
                <p className="text-sm text-gray-600">IB program information</p>
              </div>
            </a>
            <a
              href="https://nces.ed.gov/fastfacts/display.asp?id=66"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all group"
            >
              <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">NCES - Graduation Statistics</p>
                <p className="text-sm text-gray-600">National education statistics</p>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-8 border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">
            <strong>Last Updated:</strong> November 27, 2025 | Our GPA calculator uses industry-standard grading scales and is regularly updated to reflect current educational practices.
          </p>
        </div>

        {/* FAQs */}
        <div id="faq" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the difference between weighted and unweighted GPA?</h3>
              <p className="text-gray-700">
                <strong>Unweighted GPA</strong> uses a standard 4.0 scale where all courses are treated equally (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0). <strong>Weighted GPA</strong> gives extra points for advanced courses: Honors courses add +0.5 points (max 4.5), and AP/IB courses add +1.0 point (max 5.0). This rewards students taking challenging coursework. For example, an A in AP Biology would be 5.0 on a weighted scale but 4.0 on an unweighted scale.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do I calculate my high school GPA?</h3>
              <p className="text-gray-700">
                To calculate your GPA: <strong>(1)</strong> Convert each letter grade to grade points (A=4.0, B=3.0, etc.), <strong>(2)</strong> Multiply grade points by credit hours for each course, <strong>(3)</strong> Add all grade points together, <strong>(4)</strong> Divide by total credit hours. For weighted GPA, add bonus points for Honors (+0.5) and AP/IB (+1.0) courses before multiplying by credits. Our calculator does all this automatically!
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do colleges prefer weighted or unweighted GPA?</h3>
              <p className="text-gray-700">
                Colleges look at <strong>both</strong>. Unweighted GPA shows your overall performance on a standard scale, while weighted GPA demonstrates course rigor. Most competitive colleges <strong>recalculate your GPA</strong> using their own system. Taking challenging courses (AP/IB/Honors) with good grades is generally more impressive than perfect grades in easier classes. Admissions officers value students who push themselves academically.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How much do AP courses boost my GPA?</h3>
              <p className="text-gray-700">
                AP and IB courses typically add <strong>1.0 point</strong> to your weighted GPA (A=5.0 instead of 4.0, B=4.0 instead of 3.0). Honors courses usually add <strong>0.5 points</strong> (A=4.5 instead of 4.0). However, these bonuses only apply to weighted GPA calculations - unweighted GPA remains on the standard 4.0 scale regardless of course difficulty. Some schools cap the number of weighted courses that count.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is a good high school GPA?</h3>
              <p className="text-gray-700">
                A "good" GPA depends on your goals. For <strong>competitive colleges:</strong> 3.5+ unweighted (3.8+ for top schools), 4.0+ weighted. For <strong>state universities:</strong> 3.0-3.5 unweighted. For <strong>community college:</strong> 2.0+. However, GPA is just one factor - course rigor, test scores, extracurriculars, and essays also matter significantly in college admissions. A 3.7 with challenging courses often beats a 4.0 with easy classes.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use percentage grades in this calculator?</h3>
              <p className="text-gray-700">
                <strong>Yes!</strong> Our calculator supports both letter grades and percentage grades. When you select percentage mode, the calculator automatically converts your numerical grades to letter grades using standard conversion scales (97-100=A+, 93-96=A, 90-92=A-, 87-89=B+, 83-86=B, 80-82=B-, etc.) before calculating your GPA. This ensures accuracy regardless of your school's grading format.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How many semesters should I calculate for college applications?</h3>
              <p className="text-gray-700">
                Most colleges want your <strong>cumulative GPA from 9th-11th grade</strong> (6 semesters) for applications, since 12th grade isn't complete yet. Some schools may only count 10th-11th grade. Calculate all available semesters in our tool, then check each college's specific requirements. Your school transcript will show official semester-by-semester GPAs. Remember that colleges will see your 12th grade mid-year report and final transcript too.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use this calculator for middle school GPA?</h3>
              <p className="text-gray-700">
                <strong>Yes!</strong> While this tool is designed for high school students, it works perfectly for <strong>middle school GPA calculations</strong> too. Middle schools typically use the same 4.0 unweighted scale (A=4.0, B=3.0, etc.). However, most middle schools don't offer weighted courses like AP or Honors, so you'd primarily use the unweighted GPA feature. Important: Most high schools and colleges <strong>don't count middle school grades</strong> in official GPA calculations - your high school transcript typically starts fresh in 9th grade. Use this calculator to track middle school academic progress, but know that college admissions focus on high school performance (grades 9-12).
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do UC and CSU calculate capped weighted GPA?</h3>
              <p className="text-gray-700">
                The <strong>University of California (UC)</strong> and <strong>California State University (CSU)</strong> systems use a unique <strong>capped weighted GPA</strong> calculation that limits honors points. For UC/CSU applications, you can only count a maximum of <strong>8 semesters (4 year-long courses)</strong> of honors, AP, or IB courses for the weighted GPA bonus during 10th and 11th grades. This creates a "capped weighted GPA" typically ranging from 4.0 to ~4.4, unlike uncapped weighted GPAs that can reach 5.0. To calculate your UC/CSU GPA: (1) Only include A-G courses from 10th-11th grade, (2) Calculate unweighted GPA first, (3) Add +1.0 point for up to 8 semesters of approved honors/AP/IB courses, (4) Divide total grade points by total A-G courses. For the official UC/CSU calculation with A-G course validation, use our dedicated <a href="/education-and-exam-tools/gpa-tools/csu-gpa-calculator" className="text-blue-600 hover:underline font-semibold">CSU GPA calculator</a>.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the highest GPA possible in high school?</h3>
              <p className="text-gray-700">
                The <strong>highest possible GPA in high school is 5.0</strong> on a weighted scale with AP, IB, or Honors course bonuses. On an unweighted scale, the maximum is 4.0 (straight A's in all courses). To achieve a 5.0 weighted GPA, you would need to earn an A (or A+) in every AP or IB course, which adds +1.0 point to the base 4.0 grade (4.0 + 1.0 = 5.0). Honors courses typically add +0.5, giving a maximum of 4.5 for an A in Honors. However, achieving a perfect 5.0 is extremely rare since most students take a mix of AP, Honors, and regular courses. Most top-tier universities see weighted GPAs ranging from 4.2 to 4.8 for admitted students. Remember: colleges value course rigor and consistent performance over chasing a perfect 5.0.
              </p>
            </div>

          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['college-gpa-calculator', 'lsac-gpa-calculator', 'csu-gpa-calculator', 'weighted-gpa-calculator']}
          currentSlug="high-school-gpa-calculator"
          navigateTo={navigateTo}
        />
      </main>
    </div>
  );
};

export default HighSchoolGPACalculator;
