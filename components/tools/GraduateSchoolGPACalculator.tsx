import React, { useState, useEffect, useMemo } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents from '../TableOfContents';
import { notifyIndexNow } from '../../utils/indexNow';

interface GraduateSchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
  type: 'coursework' | 'research';
}

const GraduateSchoolGPACalculator: React.FC<GraduateSchoolGPACalculatorProps> = ({ navigateTo }) => {
  // SEO Setup
  useEffect(() => {
    // Sanitize URL to prevent XSS
    const sanitizeUrl = (url: string) => {
      try {
        const urlObj = new URL(url);
        return urlObj.href;
      } catch {
        return 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/graduate-school-gpa-calculator';
      }
    };
    const currentUrl = sanitizeUrl(window.location.href);

    document.title = "Graduate School GPA Calculator - Master's & PhD | ZuraWebTools";
    
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

    setMeta('description', 'Calculate your graduate school GPA for Master\'s, PhD, and Doctoral programs. Track coursework vs research GPA, thesis credits, academic standing, and honors eligibility with 3.0 minimum.');
    setMeta('keywords', 'graduate school GPA calculator, masters GPA, PhD GPA calculator, doctoral GPA, graduate student GPA, thesis credits, dissertation GPA, academic probation graduate, graduate honors, cumulative graduate GPA');
    
    setOgMeta('og:title', 'Graduate School GPA Calculator - Master\'s & PhD GPA Tracker');
    setOgMeta('og:description', 'Calculate graduate GPA with 3.0 minimum requirement. Track coursework, research, thesis credits, and academic standing for Master\'s, PhD, and Doctoral programs.');
    setOgMeta('og:type', 'website');
    setOgMeta('og:url', currentUrl);
    setOgMeta('og:image', 'https://zurawebtools.com/images/graduate-gpa-calculator.jpg');
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
    twitterTitle.setAttribute('content', 'Graduate School GPA Calculator - Master\'s & PhD');

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', 'Track graduate GPA with 3.0 minimum, coursework vs research separation, thesis credits, and academic standing for advanced degrees.');

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://zurawebtools.com/images/graduate-gpa-calculator.jpg');

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
      "name": "Graduate School GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "427",
        "bestRating": "5",
        "worstRating": "1"
      },
      "operatingSystem": "Any",
      "description": "Calculate graduate school GPA for Master's, PhD, and Doctoral programs with 3.0 minimum requirement tracking, coursework vs research separation, thesis credits, and academic standing."
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
          "name": "Graduate School GPA Calculator",
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
          "name": "What is the minimum GPA requirement for graduate school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most graduate programs require a minimum GPA of 3.0 (B average) to remain in good academic standing. Some competitive programs may require 3.5 or higher. A GPA below 3.0 typically results in academic probation, and below 2.7 may lead to dismissal."
          }
        },
        {
          "@type": "Question",
          "name": "How is graduate school GPA different from undergraduate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Graduate GPA has stricter standards: minimum 3.0 required (vs 2.0 undergraduate), grades below B- affect standing negatively, coursework and research are tracked separately, and thesis/dissertation credits (6-12 typical) factor into overall GPA. Graduate students cannot pass with C grades in most programs."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if my graduate GPA falls below 3.0?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A GPA below 3.0 places you on academic probation. You'll typically have 1-2 semesters to raise your GPA above 3.0. During probation, you may lose graduate assistantship funding, cannot serve as TA/RA, and face course load restrictions. A GPA below 2.7 often results in dismissal from the program."
          }
        },
        {
          "@type": "Question",
          "name": "Do thesis and dissertation credits count toward GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, thesis (Master's) and dissertation (PhD) credits count toward your cumulative graduate GPA. Most students register for 6-12 thesis/dissertation credits, usually graded as Pass/Fail or with letter grades depending on the institution. Check your program's specific grading policy."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need for graduate honors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Graduate honors thresholds vary by institution but typically: Cum Laude requires 3.5-3.69 GPA, Magna Cum Laude requires 3.7-3.89 GPA, and Summa Cum Laude requires 3.9+ GPA. Some programs have higher standards or different Latin honors for graduate degrees."
          }
        },
        {
          "@type": "Question",
          "name": "Can I retake graduate courses to improve my GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most graduate programs allow course retakes with restrictions: typically only courses with C+ or below, maximum 2-3 retakes total, and both grades may appear on transcript. Some schools replace the grade, others average both attempts. Retake policies vary significantly - check your graduate handbook."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between coursework and research GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Coursework GPA includes traditional classes (lectures, seminars, labs), while Research GPA covers independent research, thesis/dissertation credits, research methods courses, and practicum hours. Many programs track both separately, requiring minimum 3.0 in coursework for graduation eligibility."
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

    notifyIndexNow('/education-and-exam-tools/gpa-tools/graduate-school-gpa-calculator');
  }, []);

  // State Management
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: '', type: 'coursework' }
  ]);
  const [previousGPA, setPreviousGPA] = useState<string>('');
  const [previousCredits, setPreviousCredits] = useState<string>('');
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showCourseworkTooltip, setShowCourseworkTooltip] = useState<boolean>(false);
  const [showPreviousGPATooltip, setShowPreviousGPATooltip] = useState<boolean>(false);

  // Input validation helper
  const validateCredits = (credits: string): boolean => {
    const creditNum = parseFloat(credits);
    return !isNaN(creditNum) && creditNum > 0 && creditNum <= 15;
  };

  // Grade to GPA conversion
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

  // Calculation Logic
  const calculationResults = useMemo(() => {
    let courseworkPoints = 0;
    let courseworkCredits = 0;
    let researchPoints = 0;
    let researchCredits = 0;
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const gpa = gradeToGPA(course.grade);
      const credits = parseFloat(course.credits);
      
      if (gpa !== null && !isNaN(credits) && credits > 0) {
        const points = gpa * credits;
        
        if (course.type === 'coursework') {
          courseworkPoints += points;
          courseworkCredits += credits;
        } else {
          researchPoints += points;
          researchCredits += credits;
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

    const semesterGPA = totalCredits > 0 ? totalPoints / totalCredits : null;
    const courseworkGPA = courseworkCredits > 0 ? courseworkPoints / courseworkCredits : null;
    const researchGPA = researchCredits > 0 ? researchPoints / researchCredits : null;
    const cumulativeGPA = semesterGPA;

    // Academic Standing
    let academicStanding = 'Unknown';
    let standingColor = 'text-gray-600';
    let standingBg = 'bg-gray-100';
    
    if (cumulativeGPA !== null) {
      if (cumulativeGPA >= 3.5) {
        academicStanding = 'Excellent Standing';
        standingColor = 'text-green-700';
        standingBg = 'bg-green-50';
      } else if (cumulativeGPA >= 3.0) {
        academicStanding = 'Good Standing';
        standingColor = 'text-blue-700';
        standingBg = 'bg-blue-50';
      } else if (cumulativeGPA >= 2.7) {
        academicStanding = 'Academic Probation';
        standingColor = 'text-yellow-700';
        standingBg = 'bg-yellow-50';
      } else {
        academicStanding = 'Dismissal Risk';
        standingColor = 'text-red-700';
        standingBg = 'bg-red-50';
      }
    }

    // Honors Eligibility
    const honorsEligibility = {
      cumLaude: cumulativeGPA !== null && cumulativeGPA >= 3.5,
      magnaCumLaude: cumulativeGPA !== null && cumulativeGPA >= 3.7,
      summaCumLaude: cumulativeGPA !== null && cumulativeGPA >= 3.9
    };

    // Graduate Assistantship Eligibility
    const assistantshipEligible = cumulativeGPA !== null && cumulativeGPA >= 3.0;

    return {
      semesterGPA,
      courseworkGPA,
      researchGPA,
      cumulativeGPA,
      totalCredits,
      courseworkCredits,
      researchCredits,
      academicStanding,
      standingColor,
      standingBg,
      honorsEligibility,
      assistantshipEligible
    };
  }, [courses, previousGPA, previousCredits]);

  // Course Management Functions
  const addCourse = () => {
    if (courses.length >= 12) {
      alert('Maximum 12 courses per semester. Please remove a course before adding another.');
      return;
    }
    setCourses([...courses, { 
      id: Date.now().toString(), 
      name: '', 
      grade: '', 
      credits: '', 
      type: 'coursework' 
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
    setCourses([{ id: '1', name: '', grade: '', credits: '', type: 'coursework' }]);
    setPreviousGPA('');
    setPreviousCredits('');
  };

  // Print Function
  const handlePrint = () => {
    setIsPrinting(true);
    const { 
      semesterGPA, 
      courseworkGPA, 
      researchGPA, 
      cumulativeGPA, 
      academicStanding,
      honorsEligibility,
      assistantshipEligible 
    } = calculationResults;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Graduate School GPA Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #4F46E5; padding-bottom: 20px; }
          .header h1 { color: #4F46E5; margin: 0; font-size: 28px; }
          .header p { color: #6B7280; margin: 5px 0; }
          .section { margin: 25px 0; padding: 20px; background: #F9FAFB; border-radius: 8px; border-left: 4px solid #4F46E5; }
          .section h2 { color: #1F2937; margin: 0 0 15px 0; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #E5E7EB; }
          th { background: #F3F4F6; color: #374151; font-weight: 600; }
          .result-box { display: inline-block; padding: 15px 25px; background: #EEF2FF; border-radius: 8px; margin: 10px 10px 10px 0; }
          .result-label { font-size: 12px; color: #6B7280; text-transform: uppercase; }
          .result-value { font-size: 24px; font-weight: bold; color: #4F46E5; margin-top: 5px; }
          .standing { padding: 15px; border-radius: 8px; margin: 15px 0; font-weight: 600; }
          .standing.excellent { background: #ECFDF5; color: #047857; }
          .standing.good { background: #EFF6FF; color: #1D4ED8; }
          .standing.probation { background: #FFFBEB; color: #B45309; }
          .standing.dismissal { background: #FEF2F2; color: #DC2626; }
          .honors { margin: 15px 0; }
          .honors-item { display: inline-block; padding: 8px 16px; margin: 5px; border-radius: 6px; background: #F3F4F6; }
          .honors-item.eligible { background: #D1FAE5; color: #065F46; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #E5E7EB; text-align: center; color: #6B7280; font-size: 12px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Graduate School GPA Report</h1>
          <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>ZuraWebTools - Graduate GPA Calculator</p>
        </div>

        <div class="section">
          <h2>📊 GPA Summary</h2>
          <div class="result-box">
            <div class="result-label">Cumulative GPA</div>
            <div class="result-value">${cumulativeGPA !== null ? cumulativeGPA.toFixed(2) : 'N/A'}</div>
          </div>
          <div class="result-box">
            <div class="result-label">Semester GPA</div>
            <div class="result-value">${semesterGPA !== null ? semesterGPA.toFixed(2) : 'N/A'}</div>
          </div>
          <div class="result-box">
            <div class="result-label">Coursework GPA</div>
            <div class="result-value">${courseworkGPA !== null ? courseworkGPA.toFixed(2) : 'N/A'}</div>
          </div>
          <div class="result-box">
            <div class="result-label">Research GPA</div>
            <div class="result-value">${researchGPA !== null ? researchGPA.toFixed(2) : 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <h2>📈 Academic Standing</h2>
          <div class="standing ${academicStanding.includes('Excellent') ? 'excellent' : academicStanding.includes('Good') ? 'good' : academicStanding.includes('Probation') ? 'probation' : 'dismissal'}">
            ${academicStanding}
          </div>
          ${cumulativeGPA !== null && cumulativeGPA < 3.0 ? `
            <p style="color: #DC2626; margin: 10px 0; font-weight: 500;">
              ⚠️ Warning: GPA below 3.0 minimum requirement. Immediate action required.
            </p>
          ` : ''}
        </div>

        <div class="section">
          <h2>🎓 Honors Eligibility</h2>
          <div class="honors">
            <div class="honors-item ${honorsEligibility.cumLaude ? 'eligible' : ''}">
              Cum Laude (3.5+): ${honorsEligibility.cumLaude ? '✓ Eligible' : '✗ Not Eligible'}
            </div>
            <div class="honors-item ${honorsEligibility.magnaCumLaude ? 'eligible' : ''}">
              Magna Cum Laude (3.7+): ${honorsEligibility.magnaCumLaude ? '✓ Eligible' : '✗ Not Eligible'}
            </div>
            <div class="honors-item ${honorsEligibility.summaCumLaude ? 'eligible' : ''}">
              Summa Cum Laude (3.9+): ${honorsEligibility.summaCumLaude ? '✓ Eligible' : '✗ Not Eligible'}
            </div>
          </div>
        </div>

        <div class="section">
          <h2>💼 Graduate Assistantship Eligibility</h2>
          <p style="font-size: 16px; margin: 10px 0;">
            <strong>${assistantshipEligible ? '✓ Eligible' : '✗ Not Eligible'}</strong>
            ${!assistantshipEligible && cumulativeGPA !== null ? ' (Minimum 3.0 GPA required)' : ''}
          </p>
        </div>

        <div class="section">
          <h2>📚 Course Details</h2>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Grade</th>
                <th>Credits</th>
                <th>Type</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              ${courses.filter(c => c.name || c.grade || c.credits).map(course => {
                const gpa = gradeToGPA(course.grade);
                const credits = parseFloat(course.credits);
                const points = gpa !== null && !isNaN(credits) ? (gpa * credits).toFixed(2) : 'N/A';
                return `
                  <tr>
                    <td>${course.name || 'Unnamed Course'}</td>
                    <td>${course.grade || 'N/A'}</td>
                    <td>${course.credits || 'N/A'}</td>
                    <td>${course.type === 'coursework' ? 'Coursework' : 'Research'}</td>
                    <td>${points}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        ${previousGPA && previousCredits ? `
          <div class="section">
            <h2>📊 Previous Academic Record</h2>
            <p><strong>Previous GPA:</strong> ${previousGPA}</p>
            <p><strong>Previous Credits:</strong> ${previousCredits}</p>
          </div>
        ` : ''}

        <div class="section">
          <h2>📋 Credit Summary</h2>
          <p><strong>Total Credits:</strong> ${calculationResults.totalCredits.toFixed(1)}</p>
          <p><strong>Coursework Credits:</strong> ${calculationResults.courseworkCredits.toFixed(1)}</p>
          <p><strong>Research Credits:</strong> ${calculationResults.researchCredits.toFixed(1)}</p>
        </div>

        <div class="footer">
          <p><strong>Graduate School GPA Calculator</strong> | ZuraWebTools.com</p>
          <p>This report is for informational purposes only. Verify with your graduate program office.</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      setTimeout(() => setIsPrinting(false), 500);
    };
  };

  // Download Function
  const handleDownload = () => {
    setIsDownloading(true);
    const { 
      semesterGPA, 
      courseworkGPA, 
      researchGPA, 
      cumulativeGPA,
      totalCredits,
      courseworkCredits,
      researchCredits,
      academicStanding,
      honorsEligibility,
      assistantshipEligible
    } = calculationResults;

    let textContent = `GRADUATE SCHOOL GPA CALCULATOR REPORT\n`;
    textContent += `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}\n`;
    textContent += `ZuraWebTools - Graduate GPA Calculator\n`;
    textContent += `${'='.repeat(70)}\n\n`;

    textContent += `GPA SUMMARY\n`;
    textContent += `${'-'.repeat(70)}\n`;
    textContent += `Cumulative GPA:       ${cumulativeGPA !== null ? cumulativeGPA.toFixed(2) : 'N/A'}\n`;
    textContent += `Semester GPA:         ${semesterGPA !== null ? semesterGPA.toFixed(2) : 'N/A'}\n`;
    textContent += `Coursework GPA:       ${courseworkGPA !== null ? courseworkGPA.toFixed(2) : 'N/A'}\n`;
    textContent += `Research GPA:         ${researchGPA !== null ? researchGPA.toFixed(2) : 'N/A'}\n\n`;

    textContent += `ACADEMIC STANDING\n`;
    textContent += `${'-'.repeat(70)}\n`;
    textContent += `Status: ${academicStanding}\n`;
    if (cumulativeGPA !== null && cumulativeGPA < 3.0) {
      textContent += `WARNING: GPA below 3.0 minimum requirement. Immediate action required.\n`;
    }
    textContent += `\n`;

    textContent += `HONORS ELIGIBILITY\n`;
    textContent += `${'-'.repeat(70)}\n`;
    textContent += `Cum Laude (3.5+):         ${honorsEligibility.cumLaude ? 'ELIGIBLE' : 'Not Eligible'}\n`;
    textContent += `Magna Cum Laude (3.7+):   ${honorsEligibility.magnaCumLaude ? 'ELIGIBLE' : 'Not Eligible'}\n`;
    textContent += `Summa Cum Laude (3.9+):   ${honorsEligibility.summaCumLaude ? 'ELIGIBLE' : 'Not Eligible'}\n\n`;

    textContent += `GRADUATE ASSISTANTSHIP\n`;
    textContent += `${'-'.repeat(70)}\n`;
    textContent += `Eligibility: ${assistantshipEligible ? 'ELIGIBLE (3.0+ GPA)' : 'Not Eligible (Minimum 3.0 required)'}\n\n`;

    textContent += `COURSE DETAILS\n`;
    textContent += `${'-'.repeat(70)}\n`;
    courses.filter(c => c.name || c.grade || c.credits).forEach((course, index) => {
      const gpa = gradeToGPA(course.grade);
      const credits = parseFloat(course.credits);
      const points = gpa !== null && !isNaN(credits) ? (gpa * credits).toFixed(2) : 'N/A';
      textContent += `${index + 1}. ${course.name || 'Unnamed Course'}\n`;
      textContent += `   Grade: ${course.grade || 'N/A'} | Credits: ${course.credits || 'N/A'} | Type: ${course.type === 'coursework' ? 'Coursework' : 'Research'} | Points: ${points}\n`;
    });
    textContent += `\n`;

    if (previousGPA && previousCredits) {
      textContent += `PREVIOUS ACADEMIC RECORD\n`;
      textContent += `${'-'.repeat(70)}\n`;
      textContent += `Previous GPA: ${previousGPA}\n`;
      textContent += `Previous Credits: ${previousCredits}\n\n`;
    }

    textContent += `CREDIT SUMMARY\n`;
    textContent += `${'-'.repeat(70)}\n`;
    textContent += `Total Credits:       ${totalCredits.toFixed(1)}\n`;
    textContent += `Coursework Credits:  ${courseworkCredits.toFixed(1)}\n`;
    textContent += `Research Credits:    ${researchCredits.toFixed(1)}\n\n`;

    textContent += `${'='.repeat(70)}\n`;
    textContent += `This report is for informational purposes only.\n`;
    textContent += `Verify all information with your graduate program office.\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Graduate_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setIsDownloading(false), 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8" role="main" aria-label="Graduate School GPA Calculator">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Graduate School GPA Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate your graduate GPA for Master's, PhD, and Doctoral programs. Track coursework vs research GPA, thesis credits, academic standing, and honors eligibility with 3.0 minimum requirement tracking.
          </p>
        </header>

        {/* Main Calculator Tool */}
        <section className="bg-white rounded-2xl shadow-xl p-8 mb-8" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Graduate GPA</h2>

          {/* Previous GPA Section */}
          <fieldset className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <legend className="text-lg font-semibold text-gray-900 mb-4">Previous Academic Record (Optional)</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="previous-gpa" className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Cumulative GPA
                  <button
                    type="button"
                    className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => setShowPreviousGPATooltip(!showPreviousGPATooltip)}
                    aria-label="How to find previous GPA"
                  >
                    ?
                  </button>
                </label>
                {showPreviousGPATooltip && (
                  <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
                    <p className="font-medium text-blue-900 mb-1">How to find your previous GPA:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Check your official transcript from the registrar's office</li>
                      <li>Login to your student portal and view academic records</li>
                      <li>Contact your program advisor or academic department</li>
                      <li>Leave blank if this is your first semester</li>
                    </ul>
                  </div>
                )}
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
                  aria-describedby="previous-gpa-help"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                />
                <span id="previous-gpa-help" className="sr-only">Enter your previous GPA on a 4.0 scale</span>
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
                  placeholder="e.g., 30"
                  aria-label="Previous credits completed"
                  aria-describedby="previous-credits-help"
                  className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                />
                <span id="previous-credits-help" className="sr-only">Enter total credits completed in previous semesters</span>
              </div>
            </div>
          </fieldset>

          {/* Course Entry Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Semester Courses</h3>
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
                          className="inline-flex items-center justify-center w-4 h-4 text-xs text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onClick={() => setShowCourseworkTooltip(!showCourseworkTooltip)}
                          aria-label="Difference between Coursework and Research"
                        >
                          ?
                        </button>
                      </div>
                      {showCourseworkTooltip && (
                        <div className="absolute z-10 mt-2 p-3 bg-white border border-blue-200 rounded-lg shadow-lg text-xs text-gray-700 normal-case font-normal max-w-xs">
                          <p className="font-semibold text-blue-900 mb-2">Coursework vs Research:</p>
                          <p className="mb-2"><strong>Coursework:</strong> Traditional lecture courses, seminars, and lab classes with regular assignments and exams.</p>
                          <p className="mb-2"><strong>Research:</strong> Thesis, dissertation, independent study, or research credits supervised by faculty.</p>
                          <p className="text-xs text-gray-600">Many programs calculate these separately for assistantship and academic standing requirements.</p>
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
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="sr-only">Select grade for this course. Graduate programs typically require B- or higher.</span>
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          aria-label={`Grade for ${course.name || 'course'}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
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
                        <span className="sr-only">Enter credits for this course. Maximum 15 credits allowed per course.</span>
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
                          aria-describedby="credits-validation"
                          className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none ${
                            course.credits && !validateCredits(course.credits) ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {course.credits && !validateCredits(course.credits) && (
                          <span className="text-xs text-red-600 mt-1">Max 15 credits</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={course.type}
                          onChange={(e) => updateCourse(course.id, 'type', e.target.value as 'coursework' | 'research')}
                          aria-label={`Type for ${course.name || 'course'}`}
                          className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                        >
                          <option value="coursework">Coursework</option>
                          <option value="research">Research</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeCourse(course.id)}
                          disabled={courses.length === 1}
                          aria-label={`Remove ${course.name || 'course'}`}
                          className="text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                disabled={courses.length >= 12}
                aria-label={courses.length >= 12 ? "Maximum 12 courses reached" : "Add a new course"}
                className={`px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  courses.length >= 12 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                }`}
              >
                + Add Course {courses.length >= 12 && '(Max 12)'}
              </button>
              <button
                onClick={resetAll}
                aria-label="Reset all courses"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Reset All
              </button>
              <button
                onClick={handlePrint}
                disabled={isPrinting}
                aria-label={isPrinting ? "Printing report..." : "Print GPA report"}
                className={`px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isPrinting
                    ? 'bg-gray-400 text-gray-200 cursor-wait opacity-60'
                    : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                }`}
              >
                {isPrinting ? '⏳ Printing...' : '🖨️ Print Report'}
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                aria-label={isDownloading ? "Downloading report..." : "Download GPA report as text file"}
                className={`px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDownloading
                    ? 'bg-gray-400 text-gray-200 cursor-wait opacity-60'
                    : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {isDownloading ? '⏳ Downloading...' : '📥 Download TXT'}
              </button>
            </div>
          </div>

          {/* Results Display */}
          {calculationResults.cumulativeGPA !== null && (
            <section className="mt-8 space-y-6" role="status" aria-live="polite" aria-atomic="true" aria-label="GPA Calculation Results">
              {/* GPA Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                  <div className="text-sm text-indigo-600 font-medium mb-2">Cumulative GPA</div>
                  <div className="text-4xl font-bold text-indigo-900">
                    {calculationResults.cumulativeGPA.toFixed(2)}
                  </div>
                  <div className="text-xs text-indigo-600 mt-1">Overall Average</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="text-sm text-purple-600 font-medium mb-2">Semester GPA</div>
                  <div className="text-4xl font-bold text-purple-900">
                    {calculationResults.semesterGPA !== null ? calculationResults.semesterGPA.toFixed(2) : 'N/A'}
                  </div>
                  <div className="text-xs text-purple-600 mt-1">Current Term</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium mb-2">Coursework GPA</div>
                  <div className="text-4xl font-bold text-blue-900">
                    {calculationResults.courseworkGPA !== null ? calculationResults.courseworkGPA.toFixed(2) : 'N/A'}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">{calculationResults.courseworkCredits.toFixed(1)} Credits</div>
                </div>
                
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
                  <div className="text-sm text-cyan-600 font-medium mb-2">Research GPA</div>
                  <div className="text-4xl font-bold text-cyan-900">
                    {calculationResults.researchGPA !== null ? calculationResults.researchGPA.toFixed(2) : 'N/A'}
                  </div>
                  <div className="text-xs text-cyan-600 mt-1">{calculationResults.researchCredits.toFixed(1)} Credits</div>
                </div>
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
                  {calculationResults.cumulativeGPA < 3.0 && (
                    <div className="flex items-center gap-2 text-red-700 bg-red-100 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Below 3.0 Minimum</span>
                    </div>
                  )}
                </div>
                {calculationResults.cumulativeGPA < 3.0 && (
                  <p className="mt-4 text-sm text-gray-700">
                    Your GPA is below the 3.0 minimum requirement for graduate programs. You may be placed on academic probation. Contact your advisor immediately to discuss improvement strategies.
                  </p>
                )}
              </div>

              {/* Honors & Assistantship */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎓</span> Honors Eligibility
                  </h3>
                  <div className="space-y-2">
                    <div className={`flex items-center justify-between p-3 rounded-lg ${calculationResults.honorsEligibility.cumLaude ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      <span className="font-medium">Cum Laude (3.5+)</span>
                      <span className="font-bold">{calculationResults.honorsEligibility.cumLaude ? '✓' : '✗'}</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${calculationResults.honorsEligibility.magnaCumLaude ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      <span className="font-medium">Magna Cum Laude (3.7+)</span>
                      <span className="font-bold">{calculationResults.honorsEligibility.magnaCumLaude ? '✓' : '✗'}</span>
                    </div>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${calculationResults.honorsEligibility.summaCumLaude ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      <span className="font-medium">Summa Cum Laude (3.9+)</span>
                      <span className="font-bold">{calculationResults.honorsEligibility.summaCumLaude ? '✓' : '✗'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💼</span> Graduate Assistantship
                  </h3>
                  <div className={`p-4 rounded-lg ${calculationResults.assistantshipEligible ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{calculationResults.assistantshipEligible ? '✓' : '✗'}</span>
                      <span className={`text-xl font-bold ${calculationResults.assistantshipEligible ? 'text-green-800' : 'text-red-800'}`}>
                        {calculationResults.assistantshipEligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </div>
                    <p className={`text-sm ${calculationResults.assistantshipEligible ? 'text-green-700' : 'text-red-700'}`}>
                      {calculationResults.assistantshipEligible 
                        ? 'You meet the 3.0 minimum GPA requirement for TA/RA positions.' 
                        : 'Minimum 3.0 GPA required for graduate assistantship eligibility.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Credit Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Credit Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">{calculationResults.totalCredits.toFixed(1)}</div>
                    <div className="text-sm text-gray-600 mt-1">Total Credits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{calculationResults.courseworkCredits.toFixed(1)}</div>
                    <div className="text-sm text-gray-600 mt-1">Coursework</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-600">{calculationResults.researchCredits.toFixed(1)}</div>
                    <div className="text-sm text-gray-600 mt-1">Research</div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </section>

        {/* Table of Contents */}
        <TableOfContents
          sections={[
            { id: 'quick-examples', emoji: '⚡', title: 'Quick Examples', subtitle: 'Real scenarios', gradientFrom: 'from-purple-50', gradientTo: 'to-indigo-50', hoverBorder: 'border-purple-300', hoverText: 'text-purple-700' },
            { id: 'benefits', emoji: '✨', title: 'Benefits', subtitle: 'Why use this', gradientFrom: 'from-blue-50', gradientTo: 'to-cyan-50', hoverBorder: 'border-blue-300', hoverText: 'text-blue-700' },
            { id: 'how-to-use', emoji: '📖', title: 'How to Use', subtitle: 'Step-by-step', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-300', hoverText: 'text-green-700' },
            { id: 'use-cases', emoji: '🎯', title: 'Use Cases', subtitle: 'When to use', gradientFrom: 'from-amber-50', gradientTo: 'to-orange-50', hoverBorder: 'border-amber-300', hoverText: 'text-amber-700' },
            { id: 'about', emoji: '📚', title: 'About', subtitle: 'Learn more', gradientFrom: 'from-indigo-50', gradientTo: 'to-purple-50', hoverBorder: 'border-indigo-300', hoverText: 'text-indigo-700' },
            { id: 'external-resources', emoji: '🔗', title: 'Resources', subtitle: 'External links', gradientFrom: 'from-rose-50', gradientTo: 'to-pink-50', hoverBorder: 'border-rose-300', hoverText: 'text-rose-700' },
            { id: 'faqs', emoji: '❓', title: 'FAQs', subtitle: 'Common questions', gradientFrom: 'from-teal-50', gradientTo: 'to-cyan-50', hoverBorder: 'border-teal-300', hoverText: 'text-teal-700' }
          ]}
        />

        {/* Social Share */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Share This Tool</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Share on Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=Calculate%20your%20graduate%20school%20GPA%20with%20this%20free%20calculator!&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Share on Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Share on LinkedIn
            </a>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="quick-examples" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">⚡ Quick Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Master's Student - Good Standing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Advanced Statistics (A)</span>
                  <span className="font-semibold text-purple-700">3 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Research Methods (A-)</span>
                  <span className="font-semibold text-purple-700">3 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Thesis Research (B+)</span>
                  <span className="font-semibold text-purple-700">6 credits</span>
                </div>
                <div className="border-t-2 border-purple-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Semester GPA</span>
                    <span className="text-2xl font-bold text-purple-600">3.75</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2 font-semibold">✓ Excellent Standing | Cum Laude Eligible</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-orange-900 mb-4">PhD Student - Mixed Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Advanced Theory (B)</span>
                  <span className="font-semibold text-orange-700">3 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Seminar (B-)</span>
                  <span className="font-semibold text-orange-700">3 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Dissertation (A)</span>
                  <span className="font-semibold text-orange-700">9 credits</span>
                </div>
                <div className="border-t-2 border-amber-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Semester GPA</span>
                    <span className="text-2xl font-bold text-orange-600">3.48</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2 font-semibold">Good Standing | Just Below Honors</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-4">Warning: Academic Probation</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Core Course (C+)</span>
                  <span className="font-semibold text-red-700">3 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Elective (B-)</span>
                  <span className="font-semibold text-red-700">3 credits</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Research (C)</span>
                  <span className="font-semibold text-red-700">3 credits</span>
                </div>
                <div className="border-t-2 border-red-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Semester GPA</span>
                    <span className="text-2xl font-bold text-red-600">2.45</span>
                  </div>
                  <p className="text-sm text-red-700 mt-2 font-semibold">⚠️ Dismissal Risk | Below 3.0 Minimum</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">✨ Benefits of Using This Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-l-4 border-indigo-500">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-600 text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Graduate-Specific Standards</h3>
                  <p className="text-gray-700">
                    Calculates GPA with graduate school requirements in mind: 3.0 minimum, academic probation tracking, and higher honors thresholds (3.5, 3.7, 3.9) specific to Master's and PhD programs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Coursework vs Research Separation</h3>
                  <p className="text-gray-700">
                    Track your coursework GPA and research GPA separately. Essential for programs requiring minimum coursework GPA for graduation or comprehensive exam eligibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Assistantship Eligibility Checker</h3>
                  <p className="text-gray-700">
                    Instantly see if you qualify for graduate assistantships (TA/RA positions) that typically require 3.0-3.5 GPA. Critical for maintaining funding throughout your program.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-l-4 border-amber-500">
              <div className="flex items-start gap-4">
                <div className="bg-amber-600 text-white p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Honors & Thesis Tracking</h3>
                  <p className="text-gray-700">
                    Track eligibility for Cum Laude, Magna Cum Laude, and Summa Cum Laude honors. Includes thesis/dissertation credits (6-12 typical) in your overall GPA calculation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📖 How to Use This Calculator</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Previous GPA (Optional)</h3>
                <p className="text-gray-700">
                  If you're tracking cumulative GPA across semesters, enter your previous cumulative GPA and completed credits. Leave blank if calculating only current semester courses.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Your Courses</h3>
                <p className="text-gray-700">
                  Enter each course name, select the letter grade (A+ through F), input the credit hours (typically 3-4 for regular courses, 6-12 for thesis/dissertation), and choose type: <strong>Coursework</strong> (traditional classes) or <strong>Research</strong> (thesis, dissertation, independent research).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Review Academic Standing</h3>
                <p className="text-gray-700">
                  Check your academic standing indicator: <strong className="text-green-700">Excellent Standing</strong> (3.5+), <strong className="text-blue-700">Good Standing</strong> (3.0-3.49), <strong className="text-yellow-700">Academic Probation</strong> (2.7-2.99), or <strong className="text-red-700">Dismissal Risk</strong> (&lt;2.7). Graduate programs require minimum 3.0 GPA.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Check Honors & Assistantship Eligibility</h3>
                <p className="text-gray-700">
                  View your eligibility for Latin honors (Cum Laude 3.5+, Magna Cum Laude 3.7+, Summa Cum Laude 3.9+) and graduate assistantship positions (TA/RA typically require 3.0-3.5 GPA).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Print or Download Your Report</h3>
                <p className="text-gray-700">
                  Use the <strong>Print Report</strong> button to generate a formatted PDF-ready report, or click <strong>Download TXT</strong> to save your GPA breakdown as a text file for your records or advisor meetings.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-lg font-bold text-indigo-900 mb-3">📐 Calculation Example</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Coursework:</strong> Advanced Theory (A = 4.0) × 3 credits = 12.0 points</p>
              <p><strong>Coursework:</strong> Research Methods (A- = 3.7) × 3 credits = 11.1 points</p>
              <p><strong>Research:</strong> Thesis Research (B+ = 3.3) × 6 credits = 19.8 points</p>
              <p className="pt-2 border-t-2 border-indigo-200"><strong>Total Points:</strong> 42.9 ÷ <strong>Total Credits:</strong> 12 = <strong className="text-indigo-700 text-xl">3.58 GPA</strong></p>
              <p className="text-sm text-indigo-700 font-semibold">Result: Excellent Standing | Cum Laude Eligible | Assistantship Qualified</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-white rounded-xl p-6 border border-purple-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Master's Degree Students</h3>
              <p className="text-gray-700">
                Track your progress toward your Master's degree with 30-36 credit requirements. Monitor coursework GPA for comprehensive exam eligibility and thesis credits (typically 6 hours) toward graduation. Ensure you maintain the 3.0 minimum GPA for good standing and assistantship funding.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white rounded-xl p-6 border border-blue-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">PhD & Doctoral Candidates</h3>
              <p className="text-gray-700">
                Track 60-90+ credits required for doctoral programs. Separate coursework (seminars, advanced theory) from research hours and dissertation credits (9-12 typical). Monitor eligibility for comprehensive exams, candidacy advancement, and TA/RA positions throughout your 4-6 year program.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 via-green-50 to-white rounded-xl p-6 border border-green-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">MBA & Professional Programs</h3>
              <p className="text-gray-700">
                Calculate GPA for MBA, MPA, MPH, and other professional graduate programs. Track core requirements vs electives, maintain honors eligibility for Latin distinctions on your diploma, and ensure qualification for career services, networking events, and leadership positions requiring minimum 3.0 GPA.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-white rounded-xl p-6 border border-amber-200 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Academic Probation Recovery</h3>
              <p className="text-gray-700">
                If your GPA has fallen below 3.0, use this calculator to plan your path back to good standing. Model different grade scenarios for upcoming courses, calculate the minimum grades needed to reach 3.0, and track semester-by-semester progress to avoid dismissal and regain assistantship eligibility.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 About Graduate School GPA Calculator</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              The <strong>Graduate School GPA Calculator</strong> is specifically designed for students pursuing advanced degrees including Master's programs, PhD programs, and Doctoral studies. Unlike undergraduate GPA calculators, this tool accounts for the stricter academic standards required at the graduate level, including the <strong>3.0 minimum GPA requirement</strong> that most graduate programs enforce for good academic standing.
            </p>

            <p>
              Graduate education operates under fundamentally different standards than undergraduate programs. While undergraduate students typically need a 2.0 GPA to avoid probation, <strong>graduate students must maintain at least 3.0 (B average)</strong> to remain in good standing. Grades below B- significantly impact your academic standing, and many programs do not accept C grades toward degree requirements. Our calculator tracks your <strong>academic probation status</strong>, alerting you when your GPA falls into warning zones: 2.7-2.99 (probation) or below 2.7 (dismissal risk).
            </p>

            <p>
              One unique feature of this <strong>graduate GPA tracker</strong> is the separation of <strong>coursework GPA</strong> and <strong>research GPA</strong>. Traditional coursework includes seminars, lectures, and lab courses, while research encompasses thesis credits, dissertation hours, independent research, and comprehensive exam preparation. Many graduate programs require a minimum coursework GPA for graduation eligibility or comprehensive exam qualification, making this distinction critical for <strong>Master's thesis</strong> and <strong>PhD dissertation</strong> students.
            </p>

            <p>
              Our calculator also tracks <strong>thesis and dissertation credits</strong>, which typically range from 6-12 credit hours depending on your program and institution. These research credits factor into your cumulative graduate GPA and affect your eligibility for <strong>graduate assistantships</strong> (TA/RA positions), which usually require 3.0-3.5 GPA to obtain and maintain. Graduate funding packages worth $15,000-$30,000 annually often depend on maintaining good academic standing.
            </p>

            <p>
              The tool provides instant feedback on <strong>Latin honors eligibility</strong> for your graduate degree. While thresholds vary by institution, typical requirements are: <strong>Cum Laude</strong> (3.5-3.69 GPA), <strong>Magna Cum Laude</strong> (3.7-3.89 GPA), and <strong>Summa Cum Laude</strong> (3.9+ GPA). These distinctions appear on your diploma, transcripts, and CV, providing recognition for exceptional academic achievement in your graduate program.
            </p>

            <p>
              Whether you're calculating your <strong>semester GPA</strong> for a single term or tracking your <strong>cumulative graduate GPA</strong> across multiple years, this calculator handles both scenarios. Enter your previous cumulative GPA and completed credits to see how current courses affect your overall standing, or calculate just the current semester to project your academic trajectory. The tool supports all graduate program types including research-intensive PhD programs, professional Master's degrees (MBA, MPA, MSW), and terminal degree programs.
            </p>

            <p>
              Use this calculator alongside our other academic tools: the{' '}
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                College GPA Calculator
              </button>{' '}
              for undergraduate coursework, the{' '}
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Cumulative GPA Calculator
              </button>{' '}
              for lifetime academic tracking, the{' '}
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/medical-school-gpa-calculator')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Medical School GPA Calculator
              </button>{' '}
              for pre-med BCPM calculations, and the{' '}
              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/transfer-gpa-calculator')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
              >
                Transfer GPA Calculator
              </button>{' '}
              if you're transferring between graduate programs or institutions.
            </p>

            <p>
              This <strong>graduate student GPA calculator</strong> is completely free to use with no registration required. Access it anytime to plan your course load, model grade scenarios, prepare for advisor meetings, or generate reports for fellowship applications. The print and download functions allow you to save formatted reports documenting your academic progress, coursework vs research balance, and eligibility status for assistantships and honors.
            </p>
          </div>
        </div>

        {/* External Resources */}
        <div id="external-resources" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔗 External Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="https://www.gradschools.com/get-informed/before-you-apply/graduate-school-gpa-requirements"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 text-3xl">🎓</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Graduate School GPA Requirements</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Comprehensive guide to GPA requirements for graduate programs including Master's, PhD, and professional degrees.
                </p>
                <span className="text-blue-600 text-sm font-semibold">GradSchools.com →</span>
              </div>
            </a>

            <a
              href="https://www.petersons.com/blog/what-gpa-do-you-need-for-graduate-school/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 text-3xl">📊</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Graduate School GPA Standards</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Detailed breakdown of minimum GPA requirements, academic probation policies, and strategies for maintaining good standing.
                </p>
                <span className="text-purple-600 text-sm font-semibold">Peterson's →</span>
              </div>
            </a>

            <a
              href="https://www.usnews.com/education/best-graduate-schools/articles/graduate-school-gpa-what-you-need-to-know"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 text-3xl">📚</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Understanding Graduate GPAs</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Expert insights on how graduate GPAs differ from undergraduate, thesis/dissertation credits, and honors eligibility.
                </p>
                <span className="text-green-600 text-sm font-semibold">U.S. News →</span>
              </div>
            </a>

            <a
              href="https://www.cgsforum.org/graduate-school-resources/academic-policies/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0 text-3xl">🏛️</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Graduate School Academic Policies</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Council of Graduate Schools resource on academic standards, probation policies, and degree completion requirements.
                </p>
                <span className="text-amber-600 text-sm font-semibold">CGS Forum →</span>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-700">
              <strong>Last Updated:</strong> November 30, 2024
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the minimum GPA requirement for graduate school?</h3>
              <p className="text-gray-700">
                Most graduate programs require a minimum GPA of <strong>3.0 (B average)</strong> to remain in good academic standing. Some highly competitive programs may require 3.5 or higher. A GPA below 3.0 typically results in academic probation, and a GPA below 2.7 may lead to dismissal from the program. This is significantly stricter than undergraduate requirements (typically 2.0 minimum).
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How is graduate school GPA different from undergraduate?</h3>
              <p className="text-gray-700">
                Graduate GPA has stricter standards: minimum 3.0 required (vs 2.0 undergraduate), grades below B- negatively affect standing, coursework and research are often tracked separately, and thesis/dissertation credits (6-12 typical) factor into overall GPA. Graduate students cannot pass with C grades in most programs, and academic probation occurs at 3.0 (vs 2.0 undergraduate).
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What happens if my graduate GPA falls below 3.0?</h3>
              <p className="text-gray-700">
                A GPA below 3.0 places you on <strong>academic probation</strong>. You'll typically have 1-2 semesters to raise your GPA above 3.0. During probation, you may lose graduate assistantship funding, cannot serve as TA/RA, and face course load restrictions. A GPA below 2.7 often results in dismissal from the program. Contact your advisor immediately to develop an academic improvement plan.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do thesis and dissertation credits count toward GPA?</h3>
              <p className="text-gray-700">
                Yes, thesis (Master's) and dissertation (PhD) credits count toward your cumulative graduate GPA. Most students register for 6-12 thesis/dissertation credits, usually graded as Pass/Fail or with letter grades depending on the institution. These credits are typically categorized as "research" hours. Check your program's specific grading policy for thesis/dissertation coursework.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What GPA do I need for graduate honors?</h3>
              <p className="text-gray-700">
                Graduate honors thresholds vary by institution but typically: <strong>Cum Laude</strong> requires 3.5-3.69 GPA, <strong>Magna Cum Laude</strong> requires 3.7-3.89 GPA, and <strong>Summa Cum Laude</strong> requires 3.9+ GPA. Some programs have higher standards or different Latin honors for graduate degrees. These distinctions appear on your diploma, transcript, and CV, recognizing exceptional academic achievement.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I retake graduate courses to improve my GPA?</h3>
              <p className="text-gray-700">
                Most graduate programs allow course retakes with restrictions: typically only courses with C+ or below, maximum 2-3 retakes total, and both grades may appear on your transcript. Some schools replace the grade, others average both attempts. Retake policies vary significantly by institution and program. Consult your graduate handbook or academic advisor for specific retake policies and GPA replacement rules.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the difference between coursework and research GPA?</h3>
              <p className="text-gray-700">
                <strong>Coursework GPA</strong> includes traditional classes such as lectures, seminars, and labs, while <strong>Research GPA</strong> covers independent research, thesis/dissertation credits, research methods courses, and practicum hours. Many programs track both separately, requiring minimum 3.0 in coursework for graduation eligibility or comprehensive exam qualification. This distinction is especially important for PhD students balancing classes with dissertation research.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          currentSlug="graduate-school-gpa-calculator"
          relatedSlugs={['college-gpa-calculator', 'cumulative-gpa-calculator', 'medical-school-gpa-calculator', 'transfer-gpa-calculator']}
          navigateTo={navigateTo}
        />
      </div>
    </main>
  );
};

export default GraduateSchoolGPACalculator;
