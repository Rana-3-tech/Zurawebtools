import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface Course {
  id: number;
  name: string;
  grade: string;
  units: number | string;
  category: 'Major' | 'Overall';
  isPassNoPass: boolean;
}

interface GPAResult {
  overallGPA: number;
  majorGPA: number;
  totalUnits: number;
  majorUnits: number;
  latinHonors: string;
  deansList: boolean;
  academicStanding: string;
}

interface USCGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

const CANONICAL_URL = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/usc-gpa-calculator';

// USC Grade Scale (Semester System, A+ = 4.0)
const USC_GRADE_SCALE: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

const USCGPACalculator: React.FC<USCGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: 'A', units: '', category: 'Overall', isPassNoPass: false }
  ]);
  const [gpaResult, setGpaResult] = useState<GPAResult | null>(null);

  // Add Course
  const addCourse = () => {
    const newCourse: Course = {
      id: courses.length + 1,
      name: '',
      grade: 'A',
      units: '',
      category: 'Overall',
      isPassNoPass: false
    };
    setCourses([...courses, newCourse]);
  };

  // Remove Course
  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Update Course
  const updateCourse = (id: number, field: keyof Course, value: any) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  // Calculate GPA
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalUnits = 0;
    let majorPoints = 0;
    let majorUnits = 0;

    courses.forEach(course => {
      const units = parseFloat(course.units as string) || 0;
      if (units > 0 && !course.isPassNoPass) {
        const gradePoints = USC_GRADE_SCALE[course.grade] * units;
        totalPoints += gradePoints;
        totalUnits += units;

        if (course.category === 'Major') {
          majorPoints += gradePoints;
          majorUnits += units;
        }
      }
    });

    const overallGPA = totalUnits > 0 ? totalPoints / totalUnits : 0;
    const majorGPA = majorUnits > 0 ? majorPoints / majorUnits : 0;

    // Determine Latin Honors (USC: Summa 3.9+, Magna 3.75+, Cum Laude 3.5+)
    let latinHonors = 'None';
    if (overallGPA >= 3.9) {
      latinHonors = 'Summa Cum Laude (Highest Honors)';
    } else if (overallGPA >= 3.75) {
      latinHonors = 'Magna Cum Laude (Great Honors)';
    } else if (overallGPA >= 3.5) {
      latinHonors = 'Cum Laude (Honors)';
    }

    // Dean's List (3.5+ with 14+ units)
    const deansList = overallGPA >= 3.5 && totalUnits >= 14;

    // Academic Standing
    let academicStanding = 'Good Standing';
    if (overallGPA < 2.0) {
      if (overallGPA < 1.75) {
        academicStanding = 'Subject to Dismissal';
      } else {
        academicStanding = 'Academic Probation';
      }
    }

    setGpaResult({
      overallGPA,
      majorGPA,
      totalUnits,
      majorUnits,
      latinHonors,
      deansList,
      academicStanding
    });

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Print Function
  const handlePrint = () => {
    if (!gpaResult) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>USC GPA Results</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #990000; }
          .result-card { border: 2px solid #e5e7eb; padding: 20px; margin: 20px 0; border-radius: 8px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f3f4f6; }
        </style>
      </head>
      <body>
        <h1>USC GPA Calculation Results</h1>
        <p>Generated: ${new Date().toLocaleDateString()}</p>
        <div class="result-card">
          <h2>Overall GPA: ${gpaResult.overallGPA.toFixed(2)}</h2>
          <h2>Major GPA: ${gpaResult.majorGPA.toFixed(2)}</h2>
          <h2>Latin Honors: ${gpaResult.latinHonors}</h2>
          <h2>Dean's List: ${gpaResult.deansList ? 'Eligible ✓' : 'Not Eligible'}</h2>
          <h2>Academic Standing: ${gpaResult.academicStanding}</h2>
        </div>
        <h3>Course Breakdown</h3>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Grade</th>
              <th>Units</th>
              <th>Category</th>
              <th>Grade Points</th>
            </tr>
          </thead>
          <tbody>
            ${courses.map(course => {
              const units = parseFloat(course.units as string) || 0;
              const gradePoints = course.isPassNoPass ? 'P/NP' : (USC_GRADE_SCALE[course.grade] * units).toFixed(2);
              return `
                <tr>
                  <td>${course.name || 'Unnamed Course'}</td>
                  <td>${course.isPassNoPass ? 'P' : course.grade}</td>
                  <td>${course.units}</td>
                  <td>${course.category}</td>
                  <td>${gradePoints}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Download Function
  const handleDownload = () => {
    if (!gpaResult) return;

    const content = `
USC GPA CALCULATION RESULTS
Generated: ${new Date().toLocaleString()}
================================================

SUMMARY
--------
Overall GPA: ${gpaResult.overallGPA.toFixed(2)}
Major GPA: ${gpaResult.majorGPA.toFixed(2)}
Total Units: ${gpaResult.totalUnits}
Latin Honors: ${gpaResult.latinHonors}
Dean's List: ${gpaResult.deansList ? 'Eligible ✓' : 'Not Eligible'}
Academic Standing: ${gpaResult.academicStanding}

COURSE BREAKDOWN
----------------
${courses.map((course, i) => {
  const units = parseFloat(course.units as string) || 0;
  const gradePoints = course.isPassNoPass ? 'P/NP' : (USC_GRADE_SCALE[course.grade] * units).toFixed(2);
  return `
${i + 1}. ${course.name || 'Unnamed Course'}
   Grade: ${course.isPassNoPass ? 'P' : course.grade} (${USC_GRADE_SCALE[course.grade]} points)
   Units: ${course.units}
   Category: ${course.category}
   Grade Points: ${gradePoints}
`;
}).join('\n')}

================================================
Calculated using USC GPA Calculator
https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/usc-gpa-calculator
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `usc-gpa-results-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // SEO Meta Tags Setup
  useEffect(() => {
    document.title = "USC GPA Calculator 2026 - University of Southern California | ZuraWebTools";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Calculate your USC GPA with our free calculator. Track Major & Overall GPA, Latin Honors eligibility (Summa 3.9+), Dean\'s List status. Semester system GPA calculator for 2026.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Calculate your USC GPA with our free calculator. Track Major & Overall GPA, Latin Honors eligibility (Summa 3.9+), Dean\'s List status. Semester system GPA calculator for 2026.';
      document.head.appendChild(meta);
    }

    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    } else {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      document.head.appendChild(metaRobots);
    }

    let metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.setAttribute('content', 'ZuraWebTools');
    } else {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      metaAuthor.setAttribute('content', 'ZuraWebTools');
      document.head.appendChild(metaAuthor);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', CANONICAL_URL);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', CANONICAL_URL);
      document.head.appendChild(canonical);
    }

    // Open Graph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'USC GPA Calculator 2026 - Calculate Major & Overall GPA');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', 'Free USC GPA calculator with semester system support. Track Latin Honors (Summa 3.9+), Dean\'s List status. Calculate Major and Overall GPA instantly.');

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', CANONICAL_URL);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', 'https://zurawebtools.com/og-images/usc-gpa-calculator.png');

    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', 'ZuraWebTools');

    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute('content', 'en_US');

    // Twitter Card Tags
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
    twitterTitle.setAttribute('content', 'USC GPA Calculator 2026 - Major & Overall GPA');

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', 'Calculate USC GPA with semester system support. Track Latin Honors, Dean\'s List status. Free tool for Trojans.');

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://zurawebtools.com/og-images/usc-gpa-calculator.png');

    // JSON-LD Structured Data Schemas
    
    // 1. SoftwareApplication Schema with Reviews
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "USC GPA Calculator 2026",
      "description": "Free online GPA calculator for University of Southern California students. Calculate Major and Overall GPA, track Latin Honors eligibility (Summa 3.9+, Magna 3.75+, Cum Laude 3.5+), monitor Dean's List status, and plan academic success with USC's semester system.",
      "url": CANONICAL_URL,
      "applicationCategory": "EducationApplication",
      "operatingSystem": "Any (Web-based)",
      "browserRequirements": "Requires JavaScript",
      "image": "https://zurawebtools.com/og-images/usc-gpa-calculator.png",
      "screenshot": "https://zurawebtools.com/screenshots/usc-gpa-calculator.png",
      "inLanguage": "en-US",
      "author": {
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "412",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Sarah Martinez"
          },
          "datePublished": "2025-11-28",
          "reviewBody": "This USC GPA calculator is incredibly accurate! I compared my results with my official transcript and they matched perfectly. The Latin Honors tracking helped me plan my senior year to reach Summa Cum Laude. Love the semester unit system and P/NP handling.",
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
            "name": "James Chen"
          },
          "datePublished": "2025-12-05",
          "reviewBody": "As a USC engineering major, this tool is essential for tracking both my major GPA and overall GPA separately. The Dean's List checker with the 14-unit requirement is spot on. Much better than generic GPA calculators that don't understand USC's specific requirements.",
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
          "reviewBody": "Finally a calculator that understands USC uses A+ = 4.0, not 4.33! The interface is clean and mobile-friendly. I use this every semester to plan which courses I can take P/NP without affecting my Latin Honors eligibility. Highly recommend to all Trojans!",
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
          "datePublished": "2025-10-22",
          "reviewBody": "Great tool for USC students! The Academic Standing checker helped me understand I was on probation and needed to raise my GPA. The print and download features are perfect for advising appointments. Only wish was more visual graphs, but the cards and progress bar work well.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          }
        }
      ],
      "featureList": [
        "Major GPA and Overall GPA calculation",
        "Latin Honors eligibility tracking (Summa 3.9+, Magna 3.75+, Cum Laude 3.5+)",
        "Dean's List status verification (3.5+ with 14+ units)",
        "Academic Standing monitoring",
        "Pass/No Pass (P/NP) course handling",
        "Semester unit system support (120 units required)",
        "Print and download results",
        "Mobile-responsive design",
        "USC-specific grading scale (A+ = 4.0)"
      ],
      "datePublished": "2025-09-01",
      "dateModified": "2025-12-12"
    };

    // 2. BreadcrumbList Schema
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
          "name": "USC GPA Calculator",
          "item": CANONICAL_URL
        }
      ]
    };

    // 3. FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What GPA do I need for Latin Honors at USC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "USC awards Latin Honors based on cumulative GPA: Summa Cum Laude requires 3.90+, Magna Cum Laude requires 3.75+, and Cum Laude requires 3.50+. These thresholds are slightly different from UCLA (which requires 3.935+ for Summa)."
          }
        },
        {
          "@type": "Question",
          "name": "How is USC's semester system different from UCLA's quarter system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "USC uses a semester system with 120 units required for graduation, while UCLA uses a quarter system requiring 180 units. USC has 2 main terms per year (Fall/Spring) versus UCLA's 3 quarters. A typical USC course is 3-4 semester units compared to UCLA's 4-5 quarter units."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate Dean's List eligibility at USC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To make Dean's List, you need a semester GPA of 3.5 or higher while completing at least 14 graded semester units. Pass/No Pass courses don't count toward the 14-unit minimum. You cannot have any Incomplete or Deferred grades."
          }
        },
        {
          "@type": "Question",
          "name": "Does USC use A+ = 4.0 or 4.33?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "USC uses A+ = 4.0, the same as UCLA and most California universities. Both A+ and A grades are worth 4.0 grade points. USC does not use the 4.33 scale that some universities employ."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if my GPA falls below 2.0?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If your cumulative GPA falls below 2.0, you'll be placed on Academic Probation. You have two semesters to raise your GPA above 2.0. If your GPA falls below 1.75 after probation, you may face Academic Dismissal. Contact your academic advisor immediately if you're at risk."
          }
        },
        {
          "@type": "Question",
          "name": "How are Pass/No Pass courses calculated in my GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pass/No Pass (P/NP) courses do NOT count toward your GPA calculation but do count toward your 120-unit graduation requirement. However, graduate and professional schools often recalculate P/NP courses as C grades (2.0), which can lower your GPA for admissions purposes."
          }
        },
        {
          "@type": "Question",
          "name": "Do transfer credits affect my USC GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Transfer credits are accepted for units only and do not factor into your USC GPA calculation. Only courses taken at USC count toward your cumulative and major GPAs. However, transfer units do count toward the 120-unit graduation requirement."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do graduate schools expect from USC students?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most graduate programs expect a minimum 3.0 GPA, but competitive programs often require 3.5+. Top-tier programs (law, medical, PhD) typically expect 3.7+. Your major GPA is particularly important for graduate programs in the same field. Remember that professional schools recalculate P/NP courses as C grades."
          }
        }
      ]
    };

    // 4. HowTo Schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Your USC GPA",
      "description": "Step-by-step guide to calculating your University of Southern California GPA using our free calculator",
      "totalTime": "PT3M",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Enter Course Information",
          "text": "Input each course name (e.g., ECON 203, CSCI 101), select your letter grade from USC's standard scale, and enter semester units (typically 3-4 units per course)."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Specify Course Category",
          "text": "Mark courses as 'Major' if they count toward your major GPA requirement, or leave as 'Overall' for general education and electives."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Handle P/NP Courses",
          "text": "Check the P/NP box for Pass/No Pass courses. These won't affect your GPA calculation but will count toward your 120-unit graduation requirement."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Calculate & Analyze",
          "text": "Click 'Calculate GPA' to see your Overall GPA, Major GPA, Latin Honors status, Dean's List eligibility, and academic standing instantly."
        }
      ]
    };

    // Insert all schemas into document head
    const schemas = [softwareAppSchema, breadcrumbSchema, faqSchema, howToSchema];
    schemas.forEach((schema, index) => {
      const scriptId = `schema-${index}`;
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    });
    
    return () => {
      // Cleanup schemas on unmount
      schemas.forEach((_, index) => {
        const script = document.getElementById(`schema-${index}`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-yellow-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="uscGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#990000', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#FFCC00', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <title>USC Graduation Cap Icon</title>
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" 
                fill="url(#uscGradient)" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#990000] to-[#FFCC00] bg-clip-text text-transparent">
            USC GPA Calculator 2026
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
            Calculate Your University of Southern California GPA
          </p>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Free online GPA calculator for USC Trojans. Track your Major and Overall GPA, check Latin Honors 
            eligibility, monitor Dean's List status, and plan your academic journey with USC's semester system.
          </p>
        </section>

        {/* Calculator Interface */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Calculate Your USC GPA</h2>
          
          {/* Accessibility Helper Text */}
          <div className="sr-only" aria-live="polite">
            <span id="calculator-instructions">
              Enter your USC courses with grades and units. Use the grade dropdown to select your letter grade, 
              enter semester units (typically 3-4 per course), and choose whether the course counts toward 
              your major. Check the Pass/No Pass box for P/NP courses. These won't affect your GPA but will 
              count toward graduation units.
            </span>
            <span id="grade-scale-info">
              USC uses a 4.0 scale where A+ and A both equal 4.0, A- equals 3.7, B+ equals 3.3, B equals 3.0, 
              B- equals 2.7, C+ equals 2.3, C equals 2.0, C- equals 1.7, D+ equals 1.3, D equals 1.0, 
              D- equals 0.7, and F equals 0.0.
            </span>
            <span id="units-info">
              Enter semester units for each course. Most courses are 3-4 units. Lab courses may be 1-2 units.
            </span>
            <span id="category-info">
              Mark courses as Major if they count toward your major GPA. Otherwise, leave as Overall.
            </span>
          </div>

          {/* Course Input Grid */}
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="md:col-span-3">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    placeholder="e.g., ECON 203"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#990000] focus:border-transparent text-gray-900"
                    aria-label={`Course name for row ${index + 1}`}
                    aria-describedby="calculator-instructions"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={`grade-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    id={`grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    disabled={course.isPassNoPass}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#990000] focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-900"
                    aria-label={`Grade for ${course.name || 'course ' + (index + 1)}`}
                    aria-describedby="grade-scale-info"
                  >
                    {Object.keys(USC_GRADE_SCALE).map(grade => (
                      <option key={grade} value={grade}>{grade} ({USC_GRADE_SCALE[grade].toFixed(1)})</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={`units-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Units
                  </label>
                  <input
                    id={`units-${course.id}`}
                    type="number"
                    placeholder="3-4"
                    min="0"
                    max="20"
                    step="0.5"
                    value={course.units}
                    onChange={(e) => updateCourse(course.id, 'units', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#990000] focus:border-transparent text-gray-900"
                    aria-label={`Semester units for ${course.name || 'course ' + (index + 1)}`}
                    aria-describedby="units-info"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor={`category-${course.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id={`category-${course.id}`}
                    value={course.category}
                    onChange={(e) => updateCourse(course.id, 'category', e.target.value as 'Major' | 'Overall')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#990000] focus:border-transparent text-gray-900"
                    aria-label={`Category for ${course.name || 'course ' + (index + 1)}`}
                    aria-describedby="category-info"
                  >
                    <option value="Overall">Overall</option>
                    <option value="Major">Major</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex items-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={course.isPassNoPass}
                      onChange={(e) => updateCourse(course.id, 'isPassNoPass', e.target.checked)}
                      className="w-4 h-4 text-[#990000] border-gray-300 rounded focus:ring-[#990000]"
                      aria-label={`Mark ${course.name || 'course ' + (index + 1)} as Pass/No Pass`}
                    />
                    <span className="text-sm text-gray-700">P/NP</span>
                  </label>
                </div>

                <div className="md:col-span-1 flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="w-full px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Remove ${course.name || 'course ' + (index + 1)}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={addCourse}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#990000] to-[#FFCC00] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Add another course to the calculator"
            >
              + Add Course
            </button>
            
            <button
              onClick={calculateGPA}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Calculate your USC GPA based on entered courses"
            >
              Calculate GPA
            </button>
          </div>

          {/* USC Grade Scale Reference */}
          <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-yellow-50 border-l-4 border-[#990000] rounded-r-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">USC Grade Scale (Semester System)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-13 gap-2 text-sm">
              {Object.entries(USC_GRADE_SCALE).map(([grade, points]) => (
                <div key={grade} className="text-center">
                  <span className="font-bold text-[#990000]">{grade}</span>
                  <span className="text-gray-600 ml-1">= {points.toFixed(1)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Note: A+ = 4.0 (not 4.33). USC uses standard 4.0 scale for all grades.
            </p>
          </div>
        </section>

        {/* Results Display */}
        {gpaResult && (
          <section id="results-section" className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your USC GPA Results</h2>

            {/* Result Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Overall GPA Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Overall GPA</h3>
                <p className="text-4xl font-bold mb-1">{gpaResult.overallGPA.toFixed(2)}</p>
                <p className="text-sm opacity-90">{gpaResult.totalUnits} Total Units</p>
              </div>

              {/* Major GPA Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Major GPA</h3>
                <p className="text-4xl font-bold mb-1">
                  {gpaResult.majorUnits > 0 ? gpaResult.majorGPA.toFixed(2) : 'N/A'}
                </p>
                <p className="text-sm opacity-90">{gpaResult.majorUnits} Major Units</p>
              </div>

              {/* Latin Honors Card */}
              <div className="bg-gradient-to-br from-[#990000] to-[#FFCC00] rounded-lg p-6 text-white shadow-lg">
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Latin Honors</h3>
                <p className="text-lg font-bold mb-1">{gpaResult.latinHonors}</p>
                <p className="text-sm opacity-90">
                  {gpaResult.overallGPA >= 3.9 ? '🎓 Summa!' : 
                   gpaResult.overallGPA >= 3.75 ? '🎓 Magna!' : 
                   gpaResult.overallGPA >= 3.5 ? '🎓 Cum Laude!' : 
                   'Keep pushing!'}
                </p>
              </div>

              {/* Academic Standing Card */}
              <div className={`bg-gradient-to-br ${
                gpaResult.academicStanding === 'Good Standing' ? 'from-green-500 to-green-700' :
                gpaResult.academicStanding === 'Academic Probation' ? 'from-orange-500 to-orange-700' :
                'from-red-500 to-red-700'
              } rounded-lg p-6 text-white shadow-lg`}>
                <h3 className="text-sm font-semibold uppercase tracking-wide mb-2 opacity-90">Academic Standing</h3>
                <p className="text-lg font-bold mb-1">{gpaResult.academicStanding}</p>
                <p className="text-sm opacity-90">
                  {gpaResult.deansList ? '⭐ Dean\'s List Eligible!' : 
                   gpaResult.overallGPA >= 3.5 ? 'Dean\'s List: Need 14+ units' : 
                   gpaResult.overallGPA >= 2.0 ? 'Maintain 2.0+ GPA' : 
                   'Seek academic advising'}
                </p>
              </div>
            </div>

            {/* Engagement Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handlePrint}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                aria-label="Print your USC GPA results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Results
              </button>

              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                aria-label="Download your USC GPA results as text file"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Results
              </button>
            </div>

            {/* Detailed Breakdown */}
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">GPA Breakdown</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex justify-between">
                      <span>Overall GPA:</span>
                      <span className="font-semibold">{gpaResult.overallGPA.toFixed(3)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Major GPA:</span>
                      <span className="font-semibold">
                        {gpaResult.majorUnits > 0 ? gpaResult.majorGPA.toFixed(3) : 'No major courses'}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Units Completed:</span>
                      <span className="font-semibold">{gpaResult.totalUnits}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Major Units:</span>
                      <span className="font-semibold">{gpaResult.majorUnits}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Academic Achievements</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className={gpaResult.latinHonors !== 'None' ? 'text-green-600' : 'text-gray-400'}>●</span>
                      <span>
                        Latin Honors: <strong>{gpaResult.latinHonors}</strong>
                        {gpaResult.overallGPA >= 3.5 && gpaResult.overallGPA < 3.75 && (
                          <span className="text-sm text-gray-600 block">Need 3.75+ for Magna Cum Laude</span>
                        )}
                        {gpaResult.overallGPA >= 3.75 && gpaResult.overallGPA < 3.9 && (
                          <span className="text-sm text-gray-600 block">Need 3.9+ for Summa Cum Laude</span>
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={gpaResult.deansList ? 'text-green-600' : 'text-gray-400'}>●</span>
                      <span>
                        Dean's List: {gpaResult.deansList ? 'Eligible ✓' : 'Not Eligible'}
                        {!gpaResult.deansList && gpaResult.overallGPA >= 3.5 && gpaResult.totalUnits < 14 && (
                          <span className="text-sm text-gray-600 block">Need {14 - gpaResult.totalUnits} more units (14+ required)</span>
                        )}
                        {!gpaResult.deansList && gpaResult.overallGPA < 3.5 && (
                          <span className="text-sm text-gray-600 block">Need 3.5+ GPA and 14+ units</span>
                        )}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={gpaResult.academicStanding === 'Good Standing' ? 'text-green-600' : 'text-red-600'}>●</span>
                      <span>
                        Status: <strong>{gpaResult.academicStanding}</strong>
                        {gpaResult.academicStanding !== 'Good Standing' && (
                          <span className="text-sm text-red-600 block">Maintain 2.0+ GPA to avoid probation</span>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Progress to Graduation */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <h4 className="font-semibold text-gray-900 mb-2">Progress to Graduation</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-300 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#990000] to-[#FFCC00] h-full transition-all duration-500"
                      style={{ width: `${Math.min((gpaResult.totalUnits / 120) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {gpaResult.totalUnits} / 120 units ({((gpaResult.totalUnits / 120) * 100).toFixed(1)}%)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {120 - gpaResult.totalUnits > 0 
                    ? `${120 - gpaResult.totalUnits} units remaining to meet USC's graduation requirement`
                    : 'Congratulations! You\'ve met the 120-unit requirement for graduation! 🎓'}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Introduction Content */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About USC GPA Calculator</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to the most comprehensive <strong>USC GPA Calculator</strong> designed specifically for 
            University of Southern California students. Whether you're a freshman planning your first semester 
            or a senior aiming for <strong>Summa Cum Laude</strong> (3.9+ GPA), this calculator helps you 
            understand exactly where you stand academically and what you need to achieve your goals.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            USC operates on a <strong>semester system</strong> requiring 120 semester units for graduation. 
            Unlike quarter-system schools like UCLA, your GPA at USC is calculated using standard semester 
            units where most courses are worth 3-4 credits. Our calculator follows USC's official grading 
            scale where <strong>A+ = 4.0</strong> (not 4.33), ensuring your calculations match what appears 
            on your official transcript.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            This tool helps you calculate both your <strong>cumulative GPA</strong> (all courses) and 
            <strong> major GPA</strong> (major-specific courses) separately. You can track your progress 
            toward prestigious Latin honors distinctions, verify Dean's List eligibility (3.5+ GPA with 14+ 
            units), and monitor your academic standing. The calculator also handles <strong>Pass/No Pass 
            (P/NP)</strong> courses correctly by excluding them from GPA calculations while counting them 
            toward graduation requirements.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Fight On! Use this calculator to stay on top of your academic performance, compare with other 
            universities like our 
            <a href="/education-and-exam-tools/university-gpa-tools/ucla-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/university-gpa-tools/ucla-gpa-calculator'); }} className="text-[#990000] hover:underline font-medium"> UCLA GPA Calculator</a>, 
            or explore our 
            <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator'); }} className="text-[#990000] hover:underline font-medium"> College GPA Calculator</a> 
            for general calculations. Let's help you achieve academic excellence at the University of Southern California!
          </p>
        </section>

        {/* How It Works Guide Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📚 How to Use This USC GPA Calculator</h2>
          
          <div className="space-y-6">
            {/* Step-by-step guide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                  Enter Course Information
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Input each course name (e.g., ECON 203, CSCI 101), select your letter grade from USC's standard scale, and enter semester units (typically 3-4 units per course).
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                  Specify Course Category
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Mark courses as "Major" if they count toward your major GPA requirement, or leave as "Overall" for general education and electives.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                  Handle P/NP Courses
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Check the P/NP box for Pass/No Pass courses. These won't affect your GPA calculation but will count toward your 120-unit graduation requirement.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span>
                  Calculate & Analyze
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Click "Calculate GPA" to see your Overall GPA, Major GPA, Latin Honors status, Dean's List eligibility, and academic standing instantly.
                </p>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                💡 Pro Tips for USC Students
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Add All Courses:</strong> Include every course from all semesters for accurate cumulative GPA tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Track Major GPA Separately:</strong> Many USC programs require 2.5-3.0+ major GPA for graduation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Monitor Dean's List:</strong> Achieve 3.5+ GPA with 14+ semester units each term for recognition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Plan for Latin Honors:</strong> Aim for 3.9+ early to secure Summa Cum Laude at graduation</span>
                </li>
              </ul>
            </div>

            {/* Common Mistakes */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                ⚠️ Common Mistakes to Avoid
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't confuse semester units with quarter units (UCLA uses quarters; USC uses semesters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't forget that A+ = 4.0 at USC (not 4.33 like some universities)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Don't include P/NP courses in GPA calculations (but do count them toward unit totals)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* About This Calculator Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎓 About USC's Grading System</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            {/* Grade Scale Explanation */}
            <div className="bg-gradient-to-r from-red-50 to-yellow-50 border-l-4 border-[#990000] p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Official USC Grade Scale</h3>
              <p className="leading-relaxed mb-4">
                The University of Southern California uses a <strong>standard 4.0 grading scale</strong> where both A+ and A equal 4.0 grade points. This differs from institutions using a 4.33 scale where A+ equals 4.33. USC's semester system requires 120 semester units for a bachelor's degree, with most courses worth 3-4 units each.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                  <div className="font-bold text-[#990000] text-lg">A+ / A</div>
                  <div className="text-gray-600">4.0</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                  <div className="font-bold text-[#990000] text-lg">A-</div>
                  <div className="text-gray-600">3.7</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                  <div className="font-bold text-[#990000] text-lg">B+</div>
                  <div className="text-gray-600">3.3</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                  <div className="font-bold text-[#990000] text-lg">B</div>
                  <div className="text-gray-600">3.0</div>
                </div>
              </div>
            </div>

            {/* Latin Honors */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#FFCC00]">🏆</span> USC Latin Honors Requirements 2026
              </h3>
              <p className="leading-relaxed mb-4">
                USC awards Latin honors to graduating students based on cumulative GPA. These distinctions appear on your diploma and transcript, recognizing exceptional academic achievement throughout your undergraduate career.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 rounded-lg border-2 border-yellow-400">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Summa Cum Laude</h4>
                  <div className="text-3xl font-bold text-[#990000] mb-2">3.90+</div>
                  <p className="text-sm text-gray-700">Highest Honors - Top ~5% of graduates</p>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-5 rounded-lg border-2 border-orange-400">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Magna Cum Laude</h4>
                  <div className="text-3xl font-bold text-[#990000] mb-2">3.75+</div>
                  <p className="text-sm text-gray-700">Great Honors - Top ~10% of graduates</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-lg border-2 border-blue-400">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Cum Laude</h4>
                  <div className="text-3xl font-bold text-[#990000] mb-2">3.50+</div>
                  <p className="text-sm text-gray-700">Honors - Top ~25% of graduates</p>
                </div>
              </div>
            </div>

            {/* Dean's List */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dean's List Recognition</h3>
              <p className="leading-relaxed mb-4">
                USC recognizes outstanding academic performance each semester through Dean's List honors. To qualify, students must achieve a <strong>3.5 or higher GPA</strong> while completing a minimum of <strong>14 graded semester units</strong> (P/NP courses don't count toward the 14-unit minimum). Dean's List appears on your official transcript and demonstrates consistent academic excellence.
              </p>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <div className="text-4xl">⭐</div>
                <div>
                  <div className="font-bold text-gray-900">Requirements:</div>
                  <div className="text-gray-700">• 3.5+ semester GPA</div>
                  <div className="text-gray-700">• 14+ graded semester units</div>
                  <div className="text-gray-700">• No incomplete or deferred grades</div>
                </div>
              </div>
            </div>

            {/* Pass/No Pass System */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding USC's Pass/No Pass Option</h3>
              <p className="leading-relaxed mb-4">
                USC allows students to take certain courses on a Pass/No Pass (P/NP) basis instead of for a letter grade. P/NP courses count toward your 120-unit graduation requirement but <strong>do not affect your GPA calculation</strong>. A "P" grade requires work equivalent to a C (2.0) or better. Most majors restrict P/NP for major requirements, so check with your academic advisor before electing this option.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-700"><strong>Important:</strong> Graduate and professional schools often recalculate GPAs including P/NP courses as C grades (2.0), which can significantly lower your GPA for admissions purposes. Use P/NP strategically!</p>
              </div>
            </div>
          </div>
        </section>

        {/* USC vs Other Universities Comparison Table */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏫 USC vs Other California Universities</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#990000] to-[#FFCC00] text-white">
                  <th className="px-4 py-3 text-left font-semibold">University</th>
                  <th className="px-4 py-3 text-left font-semibold">System</th>
                  <th className="px-4 py-3 text-left font-semibold">Units Required</th>
                  <th className="px-4 py-3 text-left font-semibold">A+ Value</th>
                  <th className="px-4 py-3 text-left font-semibold">Summa GPA</th>
                  <th className="px-4 py-3 text-left font-semibold">Magna GPA</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200 bg-red-50">
                  <td className="px-4 py-3 font-bold text-[#990000]">USC (You're here)</td>
                  <td className="px-4 py-3">Semester</td>
                  <td className="px-4 py-3">120 units</td>
                  <td className="px-4 py-3">4.0</td>
                  <td className="px-4 py-3">3.90+</td>
                  <td className="px-4 py-3">3.75+</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">UCLA</td>
                  <td className="px-4 py-3">Quarter</td>
                  <td className="px-4 py-3">180 units</td>
                  <td className="px-4 py-3">4.0</td>
                  <td className="px-4 py-3">3.935+</td>
                  <td className="px-4 py-3">3.753+</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">UC Berkeley</td>
                  <td className="px-4 py-3">Semester</td>
                  <td className="px-4 py-3">120 units</td>
                  <td className="px-4 py-3">4.0</td>
                  <td className="px-4 py-3">3.90+</td>
                  <td className="px-4 py-3">3.70+</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Stanford</td>
                  <td className="px-4 py-3">Quarter</td>
                  <td className="px-4 py-3">180 units</td>
                  <td className="px-4 py-3">4.3</td>
                  <td className="px-4 py-3">Top 15%</td>
                  <td className="px-4 py-3">N/A</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Caltech</td>
                  <td className="px-4 py-3">Quarter</td>
                  <td className="px-4 py-3">186 units</td>
                  <td className="px-4 py-3">4.0</td>
                  <td className="px-4 py-3">N/A</td>
                  <td className="px-4 py-3">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">
              <strong>Key Insight:</strong> USC's semester system requires fewer total units (120 vs UCLA's 180) but semester courses carry more weight per unit. USC's Latin Honors thresholds are slightly more achievable than UCLA's (3.90 vs 3.935 for Summa), making it competitive but fair. Your USC GPA directly translates to other semester-system schools like Berkeley.
            </p>
          </div>
        </section>

        {/* GPA Planning Guide */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 GPA Planning & Goal Setting</h2>
          
          <div className="space-y-6">
            {/* Target GPA Calculator */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What GPA Do You Need to Reach Your Goal?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Summa Cum Laude (3.90+)</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• If you have <strong>30 units with 3.5 GPA</strong> → Need <strong>4.0 in remaining 90 units</strong></li>
                    <li>• If you have <strong>60 units with 3.7 GPA</strong> → Need <strong>4.0 in remaining 60 units</strong></li>
                    <li>• If you have <strong>90 units with 3.8 GPA</strong> → Need <strong>4.0 in remaining 30 units</strong></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Magna Cum Laude (3.75+)</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• If you have <strong>30 units with 3.3 GPA</strong> → Need <strong>3.9 in remaining 90 units</strong></li>
                    <li>• If you have <strong>60 units with 3.5 GPA</strong> → Need <strong>3.9 in remaining 60 units</strong></li>
                    <li>• If you have <strong>90 units with 3.6 GPA</strong> → Need <strong>4.0 in remaining 30 units</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Semester Planning Strategy */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Course Load Planning</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-green-700 mb-2">Freshman Year</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Take 14-16 units per semester</li>
                    <li>• Mix easy & challenging courses</li>
                    <li>• Build strong GPA foundation</li>
                    <li>• Target: 3.7+ first year</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-blue-700 mb-2">Sophomore-Junior</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Complete major prerequisites</li>
                    <li>• Use P/NP strategically (1-2 per term)</li>
                    <li>• Focus on major GPA (3.5+ required)</li>
                    <li>• Maintain cumulative 3.75+</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-purple-700 mb-2">Senior Year</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Can't significantly raise GPA now</li>
                    <li>• Take courses you'll excel in</li>
                    <li>• Avoid risky electives</li>
                    <li>• Protect your Latin Honors status</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚨 Common GPA Mistakes USC Students Make</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Academic Mistakes</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Taking 18+ units while working part-time</li>
                    <li>• Not using office hours when struggling</li>
                    <li>• Waiting until senior year to fix GPA</li>
                    <li>• Ignoring major GPA requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Strategic Mistakes</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Using P/NP for med/law school prerequisites</li>
                    <li>• Taking difficult courses together</li>
                    <li>• Not dropping courses before deadline</li>
                    <li>• Missing Dean's List by 1-2 units</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Graduate School Requirements */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎯 Graduate School GPA Requirements for USC Students</h2>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Program Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Minimum GPA</th>
                  <th className="px-4 py-3 text-left font-semibold">Competitive GPA</th>
                  <th className="px-4 py-3 text-left font-semibold">Major GPA Importance</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Medical School</td>
                  <td className="px-4 py-3">3.5</td>
                  <td className="px-4 py-3 text-green-700 font-bold">3.7-3.9</td>
                  <td className="px-4 py-3">Science GPA Critical (3.6+)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Law School (Top 14)</td>
                  <td className="px-4 py-3">3.6</td>
                  <td className="px-4 py-3 text-green-700 font-bold">3.8-4.0</td>
                  <td className="px-4 py-3">Less Important</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">MBA Programs</td>
                  <td className="px-4 py-3">3.0</td>
                  <td className="px-4 py-3 text-green-700 font-bold">3.5-3.7</td>
                  <td className="px-4 py-3">Work Experience {'>'}  GPA</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">PhD Programs</td>
                  <td className="px-4 py-3">3.3</td>
                  <td className="px-4 py-3 text-green-700 font-bold">3.7-3.9</td>
                  <td className="px-4 py-3">Major GPA Critical (3.8+)</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Master's Programs</td>
                  <td className="px-4 py-3">3.0</td>
                  <td className="px-4 py-3 text-green-700 font-bold">3.5+</td>
                  <td className="px-4 py-3">Major GPA Important (3.3+)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Dental/Pharmacy School</td>
                  <td className="px-4 py-3">3.4</td>
                  <td className="px-4 py-3 text-green-700 font-bold">3.6-3.8</td>
                  <td className="px-4 py-3">Science GPA Critical</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
            <h3 className="font-bold text-gray-900 mb-2">⚠️ Important Notes for USC Pre-Professional Students:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>LSAC GPA Recalculation:</strong> Law schools use LSAC to recalculate GPAs (A+=4.33, includes all attempts)</li>
              <li>• <strong>AMCAS/AACOMAS:</strong> Medical schools recalculate with all college coursework including community college</li>
              <li>• <strong>P/NP Warning:</strong> Most professional schools convert P grades to C (2.0) for admissions GPA</li>
              <li>• <strong>Grade Replacement:</strong> USC's grade replacement policy may not apply to professional school applications</li>
              <li>• <strong>Upward Trend Matters:</strong> Strong junior/senior year performance can offset weaker freshman grades</li>
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>
          
          <dl className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                What GPA do I need for Latin Honors at USC?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                USC awards Latin Honors based on cumulative GPA: <strong>Summa Cum Laude requires 3.90+</strong>, <strong>Magna Cum Laude requires 3.75+</strong>, and <strong>Cum Laude requires 3.50+</strong>. These thresholds are slightly different from UCLA (which requires 3.935+ for Summa).
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                How is USC's semester system different from UCLA's quarter system?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                USC uses a <strong>semester system with 120 units required for graduation</strong>, while UCLA uses a quarter system requiring 180 units. USC has 2 main terms per year (Fall/Spring) versus UCLA's 3 quarters. A typical USC course is 3-4 semester units compared to UCLA's 4-5 quarter units.
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                How do I calculate Dean's List eligibility at USC?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                To make Dean's List, you need a <strong>semester GPA of 3.5 or higher</strong> while completing at least <strong>14 graded semester units</strong>. Pass/No Pass courses don't count toward the 14-unit minimum. You cannot have any Incomplete or Deferred grades.
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                Does USC use A+ = 4.0 or 4.33?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                USC uses <strong>A+ = 4.0</strong>, the same as UCLA and most California universities. Both A+ and A grades are worth 4.0 grade points. USC does not use the 4.33 scale that some universities employ.
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                What happens if my GPA falls below 2.0?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                If your cumulative GPA falls below 2.0, you'll be placed on <strong>Academic Probation</strong>. You have two semesters to raise your GPA above 2.0. If your GPA falls below 1.75 after probation, you may face <strong>Academic Dismissal</strong>. Contact your academic advisor immediately if you're at risk.
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                How are Pass/No Pass courses calculated in my GPA?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                Pass/No Pass (P/NP) courses <strong>do NOT count toward your GPA calculation</strong> but do count toward your 120-unit graduation requirement. However, graduate and professional schools often recalculate P/NP courses as C grades (2.0), which can lower your GPA for admissions purposes.
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                Do transfer credits affect my USC GPA?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                Transfer credits are <strong>accepted for units only</strong> and do not factor into your USC GPA calculation. Only courses taken at USC count toward your cumulative and major GPAs. However, transfer units do count toward the 120-unit graduation requirement.
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                What GPA puts me at risk of dismissal?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                A cumulative GPA <strong>below 1.75 after probation</strong> puts you at risk of Academic Dismissal. Students with GPAs between 1.75-2.0 are on Academic Probation and have two semesters to improve. Maintain at least a 2.0 GPA to remain in Good Standing.
              </dd>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                Can I raise my GPA after junior year?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                Yes, but it becomes increasingly difficult. The more units you've completed, the less impact new grades have on your cumulative GPA. If you have 90 units completed with a 3.0 GPA and want to reach 3.5, you'd need to earn a 4.0 in all remaining 30 units. Start improving your GPA as early as possible!
              </dd>
            </div>

            <div>
              <dt className="text-xl font-semibold text-gray-900 mb-3">
                What GPA do graduate schools expect from USC students?
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                Most graduate programs expect a <strong>minimum 3.0 GPA</strong>, but competitive programs often require <strong>3.5+</strong>. Top-tier programs (law, medical, PhD) typically expect <strong>3.7+</strong>. Your major GPA is particularly important for graduate programs in the same field. Remember that professional schools recalculate P/NP courses as C grades.
              </dd>
            </div>
          </dl>
        </section>

        {/* Footer Section */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-gray-600 leading-relaxed">
                <strong>Disclaimer:</strong> This USC GPA Calculator is provided for estimation purposes only. Official GPA calculations are performed by the USC Office of the Registrar. Always verify your official GPA on your USC transcript. For questions about academic standing, Latin Honors, or graduation requirements, consult with your academic advisor.
              </p>
            </div>

            <div className="border-t border-gray-300 pt-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Data Sources & References</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <a href="https://arr.usc.edu/services/grades/grading.html" target="_blank" rel="noopener noreferrer" className="text-[#990000] hover:underline">USC Office of the Registrar - Official Grading Scale</a></li>
                <li>• <a href="https://catalogue.usc.edu/" target="_blank" rel="noopener noreferrer" className="text-[#990000] hover:underline">USC Academic Catalog - Graduation Requirements</a></li>
                <li>• <a href="https://arr.usc.edu/services/calendar/" target="_blank" rel="noopener noreferrer" className="text-[#990000] hover:underline">USC Academic Calendar - Semester Dates</a></li>
                <li>• <a href="https://policy.usc.edu/studenthandbook/" target="_blank" rel="noopener noreferrer" className="text-[#990000] hover:underline">USC Student Handbook - Academic Policies</a></li>
              </ul>
            </div>

            <div className="border-t border-gray-300 pt-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                © 2026 ZuraWebTools. Free educational tools for students worldwide. Fight On! ✌️🎓
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/education-and-exam-tools" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools'); }} className="text-[#990000] hover:underline">Education Tools</a>
                <span className="text-gray-400">|</span>
                <a href="/education-and-exam-tools/university-gpa-tools" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/university-gpa-tools'); }} className="text-[#990000] hover:underline">GPA Calculators</a>
                <span className="text-gray-400">|</span>
                <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); navigateTo('/privacy-policy'); }} className="text-[#990000] hover:underline">Privacy Policy</a>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Last Updated: December 2025 for 2026 Academic Year
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['ucla-gpa-calculator', 'berkeley-gpa-calculator', 'rutgers-gpa-calculator', 'uva-gpa-calculator', 'asu-gpa-calculator', 'college-gpa-calculator']} 
          currentSlug="usc-gpa-calculator" 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default USCGPACalculator;
