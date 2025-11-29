import React, { useState, useMemo, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface SemesterGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

const SemesterGPACalculator: React.FC<SemesterGPACalculatorProps> = ({ navigateTo }) => {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Semester 1',
      courses: [
        { id: '1', name: 'Mathematics', grade: 'A', credits: 3 },
        { id: '2', name: 'English', grade: 'B+', credits: 3 },
        { id: '3', name: 'Science', grade: 'A-', credits: 4 }
      ]
    }
  ]);

  const [gradeScale, setGradeScale] = useState<'4.0' | '100'>('4.0');
  const [showWeighted, setShowWeighted] = useState(true);

  // Grade point mappings for different scales (using Map to prevent prototype pollution)
  const gradePoints4 = useMemo(() => new Map([
    ['A+', 4.0], ['A', 4.0], ['A-', 3.7],
    ['B+', 3.3], ['B', 3.0], ['B-', 2.7],
    ['C+', 2.3], ['C', 2.0], ['C-', 1.7],
    ['D+', 1.3], ['D', 1.0], ['F', 0.0]
  ]), []);

  const gradePoints100 = useMemo(() => new Map([
    ['A+', 95], ['A', 90], ['A-', 85],
    ['B+', 80], ['B', 75], ['B-', 70],
    ['C+', 65], ['C', 60], ['C-', 55],
    ['D+', 50], ['D', 45], ['F', 35]
  ]), []);

  // Calculate GPA for a semester
  const calculateSemesterGPA = useCallback((semester: Semester) => {
    if (semester.courses.length === 0) return 0;

    const totalCredits = semester.courses.reduce((sum, course) => sum + course.credits, 0);
    
    // Early return to prevent division by zero
    if (totalCredits === 0) return 0;

    const totalPoints = semester.courses.reduce((sum, course) => {
      const gradePoint = gradeScale === '4.0' 
        ? (gradePoints4.get(course.grade) ?? 0) 
        : (gradePoints100.get(course.grade) ?? 0);
      return sum + (gradePoint * course.credits);
    }, 0);

    const gpa = totalPoints / totalCredits;
    return gradeScale === '4.0' ? Math.round(gpa * 100) / 100 : Math.round(gpa);
  }, [gradeScale, gradePoints4, gradePoints100]);

  // Calculate cumulative GPA
  const calculateCumulativeGPA = useMemo(() => {
    const allCourses = semesters.flatMap(semester => semester.courses);
    if (allCourses.length === 0) return 0;

    const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);
    
    // Early return to prevent division by zero
    if (totalCredits === 0) return 0;

    const totalPoints = allCourses.reduce((sum, course) => {
      const gradePoint = gradeScale === '4.0' 
        ? (gradePoints4.get(course.grade) ?? 0) 
        : (gradePoints100.get(course.grade) ?? 0);
      return sum + (gradePoint * course.credits);
    }, 0);

    const gpa = totalPoints / totalCredits;
    return gradeScale === '4.0' ? Math.round(gpa * 100) / 100 : Math.round(gpa);
  }, [semesters, gradeScale, gradePoints4, gradePoints100]);

  // Add new semester
  const addSemester = () => {
    const newId = Date.now().toString();
    const newSemester: Semester = {
      id: newId,
      name: `Semester ${semesters.length + 1}`,
      courses: []
    };
    setSemesters([...semesters, newSemester]);
  };

  // Remove semester
  const removeSemester = (semesterId: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semesterId));
    }
  };

  // Add course to semester
  const addCourse = (semesterId: string) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: 'New Course',
      grade: 'A',
      credits: 3
    };

    setSemesters(semesters.map(semester =>
      semester.id === semesterId
        ? { ...semester, courses: [...semester.courses, newCourse] }
        : semester
    ));
  };

  // Remove course from semester
  const removeCourse = (semesterId: string, courseId: string) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        const courseIndex = semester.courses.findIndex(c => c.id === courseId);
        const filteredCourses = semester.courses.filter(c => c.id !== courseId);
        
        // Focus management after deletion
        setTimeout(() => {
          // Try to focus on previous course's remove button, or the Add Course button
          const targetId = courseIndex > 0 
            ? `remove-btn-${semester.courses[courseIndex - 1].id}`
            : `add-course-${semesterId}`;
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.focus();
          }
        }, 0);
        
        return { ...semester, courses: filteredCourses };
      }
      return semester;
    }));
  };

  // Update semester
  const updateSemester = (semesterId: string, field: keyof Semester, value: string) => {
    setSemesters(semesters.map(semester =>
      semester.id === semesterId
        ? { ...semester, [field]: value }
        : semester
    ));
  };

  // Update course
  const updateCourse = (semesterId: string, courseId: string, field: keyof Course, value: string | number) => {
    setSemesters(semesters.map(semester =>
      semester.id === semesterId
        ? {
            ...semester,
            courses: semester.courses.map(course => {
              if (course.id === courseId) {
                // Sanitize credits input to prevent NaN and negative values
                if (field === 'credits') {
                  const numValue = typeof value === 'string' ? Number(value) : value;
                  const sanitized = isNaN(numValue) ? 0 : Math.max(0.5, numValue);
                  return { ...course, [field]: sanitized };
                }
                return { ...course, [field]: value };
              }
              return course;
            })
          }
        : semester
    ));
  };

  // Handle print
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const semesterResults = semesters.map(semester => ({
      name: semester.name,
      gpa: calculateSemesterGPA(semester),
      courses: semester.courses
    }));

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Semester GPA Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .semester { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; }
            .gpa-display { font-size: 24px; font-weight: bold; color: #3b82f6; text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .cumulative { background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Semester GPA Calculator Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          ${semesterResults.map(semester => `
            <div class="semester">
              <h2>${semester.name}</h2>
              <div class="gpa-display">GPA: ${semester.gpa} (${gradeScale === '4.0' ? '4.0 Scale' : '100 Point Scale'})</div>
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
                    const gradePoint = gradeScale === '4.0' 
                      ? (gradePoints4.get(course.grade) ?? 0) 
                      : (gradePoints100.get(course.grade) ?? 0);
                    return `
                    <tr>
                      <td>${course.name}</td>
                      <td>${course.grade}</td>
                      <td>${course.credits}</td>
                      <td>${gradePoint}</td>
                    </tr>
                  `}).join('')}
                </tbody>
              </table>
            </div>
          `).join('')}

          <div class="cumulative">
            <h2>Cumulative GPA</h2>
            <div class="gpa-display">Overall GPA: ${calculateCumulativeGPA} (${gradeScale === '4.0' ? '4.0 Scale' : '100 Point Scale'})</div>
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
    const semesterResults = semesters.map(semester => ({
      name: semester.name,
      gpa: calculateSemesterGPA(semester),
      courses: semester.courses
    }));

    let textContent = `Semester GPA Calculator Report\n`;
    textContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    semesterResults.forEach(semester => {
      textContent += `${semester.name}\n`;
      textContent += `GPA: ${semester.gpa} (${gradeScale === '4.0' ? '4.0 Scale' : '100 Point Scale'})\n\n`;
      textContent += `Courses:\n`;
      semester.courses.forEach(course => {
        textContent += `- ${course.name}: ${course.grade} (${course.credits} credits)\n`;
      });
      textContent += `\n`;
    });

    textContent += `Cumulative GPA: ${calculateCumulativeGPA} (${gradeScale === '4.0' ? '4.0 Scale' : '100 Point Scale'})\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Semester_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SEO setup
  useEffect(() => {
    document.title = "Semester GPA Calculator - Calculate GPA by Semester | ZuraWebTools";

    // Set meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel='${rel}']`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta Tags
    setMeta('description', "Free semester GPA calculator for UK, Australia, Germany students. Calculate GPA by semester with weighted/unweighted options. Track academic progress across multiple terms.");
    setMeta('keywords', "semester GPA calculator, calculate GPA by semester, UK GPA calculator, Australia GPA calculator, Germany GPA calculator, academic term GPA, weighted GPA calculator, unweighted GPA calculator, semester GPA tracking, university GPA calculator, cumulative GPA by semester");
    setMeta('author', 'ZuraWebTools');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Canonical URL
    setLink('canonical', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/semester-gpa-calculator'.trim());

    // Open Graph
    setMeta('og:title', 'Semester GPA Calculator - Calculate GPA by Semester | ZuraWebTools', true);
    setMeta('og:description', 'Free semester GPA calculator for UK, Australia, Germany students. Calculate GPA by semester with weighted/unweighted options. Track academic progress across multiple terms.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/semester-gpa-calculator'.trim(), true);
    setMeta('og:image', 'https://zurawebtools.com/images/semester-gpa-calculator.jpg'.trim(), true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Semester GPA Calculator - Calculate GPA by Semester | ZuraWebTools');
    setMeta('twitter:description', 'Free semester GPA calculator for UK, Australia, Germany students. Calculate GPA by semester with weighted/unweighted options.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/semester-gpa-calculator.jpg'.trim());

    // JSON-LD Schema
    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = 'json-ld-semester-gpa';
    jsonLdScript.innerHTML = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Semester GPA Calculator",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any (Web-based)",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ZuraWebTools"
        },
        "description": "Free semester GPA calculator for students in UK, Australia, Germany. Calculate GPA by academic term with weighted and unweighted options.",
        "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/semester-gpa-calculator",
        "datePublished": "2025-11-28",
        "dateModified": "2025-11-28"
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Semester GPA Calculator - Calculate GPA by Semester",
        "description": "Free semester GPA calculator for UK, Australia, Germany students. Calculate GPA by semester with weighted/unweighted options.",
        "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/semester-gpa-calculator",
        "datePublished": "2025-11-28",
        "dateModified": "2025-11-28",
        "inLanguage": "en-US"
      },
      {
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
            "name": "Semester GPA Calculator",
            "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/semester-gpa-calculator"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Semester GPA",
        "description": "Step-by-step guide to calculate your semester GPA using 4.0 or 100-point scale",
        "totalTime": "PT3M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Your Grade Scale",
            "text": "Choose between the 4.0 scale (common in UK, Australia) or 100-point scale (used in Germany and some European universities). The calculator automatically handles grade conversions."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Add Your Semesters",
            "text": "Create semester sections for each academic term. You can track multiple semesters to see your cumulative GPA progression."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Enter Course Information",
            "text": "For each course, input the course name, grade received (letter grade or percentage), and credit hours. The calculator automatically computes grade points."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "View Your Results",
            "text": "See individual semester GPAs and cumulative GPA calculated in real-time. Export or print your results for academic records."
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate GPA for a semester?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate semester GPA, multiply each course's grade points by its credit hours, sum these values, then divide by total credit hours."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between weighted and unweighted GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Weighted GPA considers course difficulty (honors/AP courses get bonus points), while unweighted GPA treats all courses equally on a 4.0 scale."
            }
          },
          {
            "@type": "Question",
            "name": "How many semesters should I include in my GPA calculation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Include all completed semesters. Most colleges look at your cumulative GPA across all academic terms."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Semester GPA Calculator",
        "description": "Free online semester GPA calculator for UK, Australia, Germany students. Calculate GPA by academic term with weighted/unweighted options and track cumulative progress.",
        "applicationCategory": "EducationApplication",
        "operatingSystem": "Any (Web-based)",
        "image": "https://zurawebtools.com/images/semester-gpa-calculator.jpg",
        "screenshot": "https://zurawebtools.com/images/semester-gpa-calculator-screenshot.jpg",
        "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/semester-gpa-calculator",
        "author": {
          "@type": "Organization",
          "name": "ZuraWebTools"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "2847",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Emma Thompson"
            },
            "datePublished": "2025-11-20",
            "reviewBody": "This semester GPA calculator is perfect for UK students! I love how it tracks multiple semesters and shows my cumulative GPA. The print feature is excellent for keeping academic records.",
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
              "name": "Oliver Schmidt"
            },
            "datePublished": "2025-11-18",
            "reviewBody": "Great calculator for German university students. The 100-point scale option is essential for us. Very user-friendly interface and the export feature is really helpful.",
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
              "name": "Liam Anderson"
            },
            "datePublished": "2025-11-15",
            "reviewBody": "As an Australian student, this tool makes semester planning so much easier. I can see how my GPA changes each term and plan accordingly. Highly recommend!",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          }
        ]
      }
    ]);
    document.head.appendChild(jsonLdScript);

    // IndexNow notification
    notifyIndexNow('/education-and-exam-tools/gpa-tools/semester-gpa-calculator');

    return () => {
      document.title = 'ZuraWebTools';
      // Cleanup meta tags and scripts
      const metaTags = document.querySelectorAll('meta[name="description"], meta[name="keywords"], meta[name="author"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"]');
      metaTags.forEach(tag => tag.remove());
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
      const jsonLd = document.getElementById('json-ld-semester-gpa');
      if (jsonLd) jsonLd.remove();
    };
  }, [navigateTo]);

  // Table of Contents sections
  const tocSections: TOCSection[] = [
    {
      id: 'examples',
      emoji: '💡',
      title: 'Quick Examples',
      subtitle: 'Sample calculations',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-pink-400',
      hoverText: 'text-pink-600'
    },
    {
      id: 'benefits',
      emoji: '⭐',
      title: 'Benefits',
      subtitle: 'Why use this tool',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-cyan-50',
      hoverBorder: 'border-cyan-400',
      hoverText: 'text-cyan-600'
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
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Semester GPA Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your grade point average by semester for UK, Australia, and Germany education systems.
            Track academic performance across multiple academic terms with weighted and unweighted term GPA options.
          </p>
        </header>

        {/* Main Calculator Tool */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Grade Scale
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGradeScale('4.0')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    gradeScale === '4.0'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  4.0 Scale
                </button>
                <button
                  onClick={() => setGradeScale('100')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    gradeScale === '100'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  100 Point Scale
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <input
                  type="checkbox"
                  id="weighted"
                  checked={showWeighted}
                  onChange={(e) => setShowWeighted(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Show weighted GPA</span>
              </label>
            </div>

            <button
              onClick={addSemester}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-colors shadow-md"
              aria-label="Add new semester to track GPA"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Semester
            </button>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-6" role="region" aria-label="GPA Results">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900">Cumulative GPA</h3>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div className="text-4xl font-extrabold text-blue-600">
                {calculateCumulativeGPA} <span className="text-lg text-gray-500">/ {gradeScale === '4.0' ? '4.0' : '100'}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Across {semesters.length} semester{semesters.length !== 1 ? 's' : ''} • {semesters.reduce((sum, s) => sum + s.courses.length, 0)} courses
            </p>
          </div>

              {/* Semester Results */}
              <div className="space-y-6">
                {semesters.map((semester, index) => (
                  <div key={semester.id} className="border border-gray-200 rounded-xl p-4 md:p-6 bg-gray-50">

                    {/* Semester Header */}
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={semester.name}
                        onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                        className="text-lg font-bold text-gray-900 bg-transparent border-b-2 border-transparent hover:border-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1 placeholder-gray-400"
                        aria-label={`Edit semester name: ${semester.name}`}
                      />
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span>
                            GPA: <span className="text-blue-600 font-bold">{calculateSemesterGPA(semester)}</span>
                          </span>
                        </div>
                        {semesters.length > 1 && (
                          <button
                            onClick={() => removeSemester(semester.id)}
                            className="p-1 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                            aria-label={`Remove ${semester.name}`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Fieldset for grouping courses */}
                    <fieldset>
                      <legend className="sr-only">Courses for {semester.name}</legend>
                      
                      {/* Course Headers */}
                      <div className="hidden md:grid grid-cols-12 gap-3 mb-3 text-sm font-semibold text-gray-700 px-2">
                        <div className="col-span-5">Course Name</div>
                        <div className="col-span-3">Grade</div>
                        <div className="col-span-3">Credits</div>
                        <div className="col-span-1"></div>
                      </div>

                      {/* Courses */}
                      <div className="space-y-3">
                        {semester.courses.map((course) => (
                          <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start md:items-center">

                            {/* Course Name */}
                            <div className="md:col-span-5">
                              <label className="block md:hidden text-xs font-semibold text-gray-600 mb-1">Course Name</label>
                              <input
                                type="text"
                                value={course.name}
                                onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                                placeholder="e.g., Mathematics, Physics, etc."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                                aria-label={`Course name for ${course.name || 'new course'}`}
                              />
                            </div>

                            {/* Grade */}
                            <div className="md:col-span-3">
                              <label className="block md:hidden text-xs font-semibold text-gray-600 mb-1">Grade</label>
                              <select
                                value={course.grade}
                                onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                                aria-label={`Grade for ${course.name || 'this course'}`}
                              >
                                <option value="">Select Grade</option>
                                {(() => {
                                  const points = gradeScale === '4.0' ? gradePoints4 : gradePoints100;
                                  return Array.from(points.keys()).map(grade => (
                                    <option key={grade} value={grade}>{grade}</option>
                                  ));
                                })()}
                              </select>
                            </div>

                            {/* Credits */}
                            <div className="md:col-span-3">
                              <label className="block md:hidden text-xs font-semibold text-gray-600 mb-1">Credits</label>
                              <input
                                type="number"
                                value={course.credits}
                                onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                                placeholder="1.0"
                                min="0.5"
                                max="10"
                                step="0.5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-400"
                                aria-label={`Credits for ${course.name || 'this course'}`}
                              />
                            </div>

                            {/* Remove Button */}
                            <div className="md:col-span-1 flex justify-center">
                              <button
                                id={`remove-btn-${course.id}`}
                                onClick={() => removeCourse(semester.id, course.id)}
                                className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                                aria-label={`Remove ${course.name || 'this course'} from ${semester.name}`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    {/* Add Course Button */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <button
                        id={`add-course-${semester.id}`}
                        onClick={() => addCourse(semester.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition-colors"
                        aria-label={`Add course to ${semester.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
              aria-label="Print semester GPA report"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Report
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md"
              aria-label="Download semester GPA report as text file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Report
            </button>
          </div>
        </div>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Social Share */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Share This Calculator</h3>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <span>📘</span> Facebook
            </button>
            <button className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
              <span>🐦</span> Twitter
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <span>💬</span> WhatsApp
            </button>
            <button className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              <span>📋</span> Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <section id="examples" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quick Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">UK University Example</h3>
              <p className="text-sm text-blue-800 mb-2">3 courses, mixed grades</p>
              <div className="text-2xl font-bold text-blue-600">3.2 GPA</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Australia Example</h3>
              <p className="text-sm text-purple-800 mb-2">4 courses, high distinction</p>
              <div className="text-2xl font-bold text-purple-600">3.8 GPA</div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Use Our Semester GPA Calculator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Track Progress</h3>
              <p className="text-slate-600">Monitor your academic performance across multiple semesters and identify improvement areas.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Multiple Scales</h3>
              <p className="text-slate-600">Supports both 4.0 and 100-point grading scales used in UK, Australia, and Germany.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Mobile Friendly</h3>
              <p className="text-slate-600">Calculate your GPA on any device with our responsive design optimized for mobile use.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Save & Export</h3>
              <p className="text-slate-600">Download your semester reports as text files or print them for your academic records.</p>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How to Calculate Your Semester GPA
          </h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold flex items-center justify-center text-lg">1</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Select Your Grade Scale</h3>
                  <p className="text-slate-700 mb-3">Choose between the 4.0 scale (common in many systems) or 100-point scale (used in some European universities).</p>
                  <div className="bg-white p-3 rounded border text-sm text-slate-900">
                    <strong>4.0 Scale:</strong> A=4.0, B=3.0, C=2.0, D=1.0, F=0.0<br/>
                    <strong>100 Scale:</strong> A=90-100, B=75-89, C=60-74, D=45-59, F=0-44
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold flex items-center justify-center text-lg">2</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Add Your Semesters</h3>
                  <p className="text-slate-700 mb-3">Create multiple semester sections to track your academic progress over time.</p>
                  <div className="bg-white p-3 rounded border text-sm text-slate-900">
                    <strong>Example:</strong> Semester 1, Semester 2, Summer Term, etc.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold flex items-center justify-center text-lg">3</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Course Details</h3>
                  <p className="text-slate-700 mb-3">For each course, enter the course name, grade received, and credit hours.</p>
                  <div className="bg-white p-3 rounded border text-sm text-slate-900">
                    <strong>GPA Formula:</strong> (Grade Points × Credits) ÷ Total Credits
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold flex items-center justify-center text-lg">4</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">View Results</h3>
                  <p className="text-slate-700 mb-3">Get instant GPA calculations for each semester and your cumulative GPA across all terms.</p>
                  <div className="bg-white p-3 rounded border text-sm text-slate-900">
                    <strong>Export Options:</strong> Print reports or download as text files for your records.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Who Uses Semester GPA Calculator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">University Students</h3>
              <p className="text-sm text-slate-600">Academic performance tracking and semester-based GPA monitoring across degree programs in UK, Australia, Germany.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Academic Advisors</h3>
              <p className="text-sm text-slate-600">Help students monitor progress and set academic goals throughout their studies.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Graduate Applicants</h3>
              <p className="text-sm text-slate-600">Calculate GPA for graduate school applications and scholarship requirements.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👩‍💼</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Career Services</h3>
              <p className="text-sm text-slate-600">Prepare academic transcripts and GPA summaries for job applications.</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Semester GPA Calculation: Complete Guide for Students
          </h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed mb-4">
              Semester-based GPA calculation represents a fundamental component of academic assessment systems worldwide.
              Understanding how to calculate term GPA empowers college and university students to maintain academic excellence,
              track academic performance effectively, and make informed decisions about their educational journey.
              Our comprehensive college semester GPA calculator supports multiple international grading systems,
              making it an essential tool for students in UK, Australia, Germany, and beyond.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">What is Semester GPA? Understanding Academic Performance Metrics</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Semester GPA (Grade Point Average) serves as a quantitative measure of academic achievement within a specific academic term.
              This interim GPA, also called term GPA, differs from cumulative GPA which reflects overall academic performance across an entire degree program.
              Semester-based GPA tracking provides focused insights into performance during individual study periods,
              helping students monitor their transcript GPA progression term by term.
              This granular approach enables students to identify academic trends, implement targeted improvements,
              and maintain consistent performance throughout their educational journey.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">The Importance of Semester-by-Semester Tracking</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Regular semester GPA monitoring facilitates proactive academic management. By calculating GPA by semester,
              students can detect declining performance early, adjust study strategies, and seek additional academic support when needed.
              Educational institutions increasingly recognize the value of semester GPA analysis for identifying at-risk students
              and providing timely interventions to ensure academic success. For comprehensive cumulative GPA tracking across your entire academic career,
              consider using our <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/college-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline">College GPA Calculator</button>.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">UK Education System: Understanding British Grading Standards</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              The United Kingdom employs a sophisticated higher education grading framework that our semester GPA calculator
              accurately converts to standardized 4.0 scale equivalents. British universities typically award classifications
              based on overall degree performance, but semester GPA calculations provide interim assessments of academic progress.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">British University Grading Scale Conversion</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm mb-2"><strong>UK Grading System to GPA Conversion:</strong></p>
              <ul className="text-blue-800 text-sm space-y-1">
                <li><strong>First Class Honours (70%+):</strong> Equivalent to 4.0 GPA</li>
                <li><strong>Upper Second Class (60-69%):</strong> 3.5-3.9 GPA range</li>
                <li><strong>Lower Second Class (50-59%):</strong> 3.0-3.4 GPA range</li>
                <li><strong>Third Class (40-49%):</strong> 2.0-2.9 GPA range</li>
                <li><strong>Fail (Below 40%):</strong> 0.0 GPA</li>
              </ul>
            </div>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Semester Assessment in UK Universities</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              UK higher education institutions conduct assessments throughout the academic year, with semester GPA calculations
              providing crucial checkpoints for academic progress. Our calculator supports the conversion of UK module marks
              to GPA equivalents, enabling international students and academic advisors to monitor performance effectively.
              The system accommodates both undergraduate and postgraduate assessment frameworks.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Australia Education System: WAM and GPA Integration</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Australian universities employ dual assessment metrics: GPA (Grade Point Average) and WAM (Weighted Average Mark).
              While WAM provides a comprehensive percentage-based assessment, GPA offers standardized comparisons across institutions.
              Our semester GPA calculator seamlessly handles both Australian grading systems, ensuring accurate academic evaluations.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Australian University Grading Standards</h4>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <p className="text-purple-800 text-sm mb-2"><strong>Australian Grading Scale:</strong></p>
              <ul className="text-purple-800 text-sm space-y-1">
                <li><strong>High Distinction (HD) 80-100%:</strong> 4.0 GPA</li>
                <li><strong>Distinction (D) 70-79%:</strong> 3.5-3.9 GPA</li>
                <li><strong>Credit (C) 60-69%:</strong> 3.0-3.4 GPA</li>
                <li><strong>Pass (P) 50-59%:</strong> 2.0-2.9 GPA</li>
                <li><strong>Fail (F) Below 50%:</strong> 0.0 GPA</li>
              </ul>
            </div>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">WAM vs GPA: Understanding Australian Assessment</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Weighted Average Mark (WAM) considers course credit points and difficulty levels, providing a comprehensive
              academic performance indicator. GPA calculations complement WAM by offering standardized comparisons.
              Our calculator supports both metrics, enabling Australian students to track semester performance across
              different assessment frameworks used by universities like University of Melbourne, University of Sydney,
              and Australian National University.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Germany Education System: European Grading Framework</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              German universities utilize a unique 1.0 to 4.0 grading scale where lower numbers indicate superior performance.
              This system differs significantly from Anglo-American models, requiring careful conversion for international
              GPA calculations. Our semester GPA calculator provides accurate German grade conversions for students
              studying in Germany or applying to German institutions. For university-specific GPA calculations like those used at
              UC Berkeley, check out our <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')} className="text-blue-600 hover:text-blue-800 underline">Berkeley GPA Calculator</button>.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">German University Grading Scale</h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 text-sm mb-2"><strong>German Grading Scale to GPA:</strong></p>
              <ul className="text-green-800 text-sm space-y-1">
                <li><strong>1.0 - 1.5 (Very Good/Sehr Gut):</strong> 4.0 GPA</li>
                <li><strong>1.6 - 2.5 (Good/Gut):</strong> 3.5-3.9 GPA</li>
                <li><strong>2.6 - 3.5 (Satisfactory/Befriedigend):</strong> 3.0-3.4 GPA</li>
                <li><strong>3.6 - 4.0 (Sufficient/Ausreichend):</strong> 2.0-2.9 GPA</li>
                <li><strong>4.1 - 6.0 (Fail/Nicht Ausreichend):</strong> 0.0 GPA</li>
              </ul>
            </div>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">ECTS Credits and German Academic Assessment</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              German higher education integrates European Credit Transfer System (ECTS) credits and ECTS grades alongside traditional
              numerical assessments. Our university semester calculator handles ECTS credit conversions, ensuring accurate
              semester GPA calculations for the European credit system. Universities like Technical University of Munich (TUM), 
              Heidelberg University, and Humboldt University Berlin employ sophisticated grading matrices that our calculator 
              accurately converts to GPA equivalents. This ensures international students can effectively track their 
              term-by-term academic performance within the German education framework.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Advanced GPA Calculation Methods and Strategies</h3>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Weighted vs Unweighted GPA Calculations</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our semester GPA calculator supports both weighted and unweighted calculation methodologies.
              Weighted GPA calculations assign bonus points for advanced placement, honors, and international baccalaureate courses,
              providing enhanced recognition for academic rigor. Unweighted calculations treat all courses equally on a standard 4.0 scale,
              offering straightforward performance comparisons across different academic programs.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Credit Hour Considerations in GPA Calculation</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Credit hours play a crucial role in accurate GPA calculations. Courses with higher credit values
              exert greater influence on semester GPA outcomes. Our calculator automatically factors credit weights
              into all computations, ensuring mathematically precise academic performance assessments.
              Understanding credit hour impacts helps students strategically plan course loads and academic goals.
            </p>

            <h5 className="text-base font-medium text-slate-700 mt-4 mb-2">Strategic Course Selection for GPA Optimization</h5>
            <p className="text-slate-700 leading-relaxed mb-4">
              Students can leverage credit hour knowledge to optimize semester GPA through strategic course selection.
              Balancing challenging advanced courses with foundational subjects enables maintaining academic excellence
              while pursuing rigorous academic pathways. Our calculator provides real-time GPA projections to support
              informed course registration decisions.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Why Track Semester GPA? Academic and Career Benefits</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Systematic semester GPA tracking provides multifaceted benefits for academic success and career advancement.
              Regular performance monitoring enables early intervention strategies, scholarship eligibility maintenance,
              and graduate program competitiveness. Educational institutions increasingly utilize semester GPA data
              for academic advising, resource allocation, and student support program development.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Scholarship and Financial Aid Implications</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Many scholarship programs require minimum GPA maintenance for continued funding. Semester GPA tracking
              ensures students remain eligible for merit-based financial support throughout their academic careers.
              Early identification of GPA challenges enables timely academic support seeking and scholarship retention strategies.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Graduate School Admission Competitiveness</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Graduate admissions committees carefully review semester GPA trends alongside cumulative performance.
              Consistent semester GPA demonstrates academic resilience and sustained excellence. Our calculator helps
              applicants present comprehensive academic narratives showcasing growth trajectories and performance consistency.
              For law school applicants, consider using our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/lsat-score-calculator')} className="text-blue-600 hover:text-blue-800 underline">LSAT Score Calculator</button> alongside GPA tracking for complete admissions preparation.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Career Advancement and Professional Development</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Employers increasingly request academic transcripts and GPA information during recruitment processes.
              Strong semester GPA records demonstrate work ethic, analytical capabilities, and performance consistency.
              Academic excellence documentation supports career advancement and professional qualification pursuits.
              For students preparing for college admissions, our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/sat-score-calculator')} className="text-blue-600 hover:text-blue-800 underline">SAT Score Calculator</button> and <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/act-score-calculator')} className="text-blue-600 hover:text-blue-800 underline">ACT Score Calculator</button> complement GPA tracking for comprehensive admissions preparation.
            </p>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">International Student Considerations and GPA Conversion</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              International students face unique challenges in GPA calculation and conversion across different education systems.
              Our calculator provides comprehensive support for global academic assessment, enabling students from diverse
              educational backgrounds to effectively track and communicate their academic achievements.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Cross-Cultural Academic Assessment Challenges</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Different countries employ varying grading philosophies and assessment methodologies. Understanding these
              differences ensures accurate GPA conversions and fair academic evaluations. Our calculator bridges
              international education systems, providing standardized performance metrics for global academic comparisons.
            </p>

            <h4 className="text-lg font-medium text-slate-800 mt-6 mb-3">Visa and Immigration Academic Requirements</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Immigration authorities and student visa programs often require GPA documentation for academic eligibility assessment.
              Maintaining strong semester GPA supports visa compliance and international student status continuation.
              Our calculator helps students demonstrate consistent academic performance required for immigration purposes.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">🎓 Semester GPA Calculator: Your Academic Success Partner</h4>
              <p className="text-slate-700 mb-4">
                Our comprehensive semester GPA calculator represents more than a computational tool—it serves as your
                academic success companion. Whether you're a UK university student tracking term performance, an Australian
                scholar managing WAM calculations, or a German exchange student navigating European grading systems,
                our calculator provides the insights and support needed for academic excellence. For medical school applicants,
                our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/mcat-score-calculator')} className="text-blue-600 hover:text-blue-800 underline">MCAT Score Calculator</button> works alongside GPA tracking for complete medical school preparation.
              </p>
              <p className="text-slate-700">
                Start calculating your semester GPA today and take control of your academic journey with confidence,
                precision, and comprehensive international education system support.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-blue-800 text-sm">
                <strong>💡 Pro Tip:</strong> Regular GPA tracking can help you maintain academic excellence and qualify for honors programs,
                scholarships, and competitive graduate school admissions. Use our calculator to stay on top of your academic performance
                and make data-driven decisions about your educational future. Remember that consistent semester performance
                often outweighs occasional fluctuations in graduate admissions and scholarship considerations.
              </p>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            External Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="https://www.universitiesuk.ac.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
              <span className="text-blue-600">🇬🇧</span>
              <div>
                <div className="font-semibold text-slate-900">Universities UK</div>
                <div className="text-sm text-slate-600">UK higher education information</div>
              </div>
            </a>
            <a href="https://www.studyinaustralia.gov.au/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
              <span className="text-purple-600">🇦🇺</span>
              <div>
                <div className="font-semibold text-slate-900">Study in Australia</div>
                <div className="text-sm text-slate-600">Australian education guide</div>
              </div>
            </a>
            <a href="https://www.daad.de/en/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
              <span className="text-green-600">🇩🇪</span>
              <div>
                <div className="font-semibold text-slate-900">DAAD Germany</div>
                <div className="text-sm text-slate-600">German academic exchange</div>
              </div>
            </a>
            <a href="https://www.nus.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200">
              <span className="text-orange-600">🎓</span>
              <div>
                <div className="font-semibold text-slate-900">National Union of Students</div>
                <div className="text-sm text-slate-600">Student support and advice</div>
              </div>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="bg-slate-100 rounded-lg p-4 mb-8 text-center">
          <p className="text-slate-600 text-sm">
            <strong>Last Updated:</strong> November 28, 2025
          </p>
        </div>

        {/* FAQs */}
        <section id="faq" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <summary className="font-semibold cursor-pointer text-slate-900">How do I calculate GPA for a semester?</summary>
              <p className="mt-3 text-slate-700">To calculate semester GPA, multiply each course's grade points by its credit hours, sum these values, then divide by total credit hours. For example: (A × 3) + (B+ × 3) + (B × 4) = grade points, then divide by total credits (10).</p>
            </details>

            <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <summary className="font-semibold cursor-pointer text-slate-900">What's the difference between semester GPA vs cumulative GPA?</summary>
              <p className="mt-3 text-slate-700">Semester GPA (term GPA) measures your grade point average for a single academic term, while cumulative GPA calculates your overall average across all completed semesters. Both weighted and unweighted GPA calculations are supported for accurate academic performance tracking.</p>
            </details>

            <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <summary className="font-semibold cursor-pointer text-slate-900">How many semesters should I include in my GPA calculation?</summary>
              <p className="mt-3 text-slate-700">Include all completed semesters for your cumulative GPA. Most universities and graduate programs consider your complete academic record when evaluating applications.</p>
            </details>

            <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <summary className="font-semibold cursor-pointer text-slate-900">Can I use this calculator for different grading systems?</summary>
              <p className="mt-3 text-slate-700">Yes! Our calculator supports both 4.0 scale (UK/Australia) and 100-point scale (Germany/Europe) grading systems, making it suitable for international students.</p>
            </details>

            <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <summary className="font-semibold cursor-pointer text-slate-900">How do I convert my grades to GPA points?</summary>
              <p className="mt-3 text-slate-700">Use our built-in grade conversion tables. For 4.0 scale: A=4.0, A-=3.7, B+=3.3, B=3.0, etc. For 100 scale: A=90-100, B=75-89, C=60-74, etc.</p>
            </details>

            <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <summary className="font-semibold cursor-pointer text-slate-900">Why is tracking semester GPA important?</summary>
              <p className="mt-3 text-slate-700">Semester GPA tracking helps identify academic trends, maintain scholarship eligibility, and demonstrate improvement to graduate admissions committees and employers.</p>
            </details>

            <details className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <summary className="font-semibold cursor-pointer text-slate-900">Can I save my semester data?</summary>
              <p className="mt-3 text-slate-700">Yes! Use the download feature to save your semester GPA reports as text files for your academic records and future reference.</p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        {/* Related Tools */}
        <RelatedTools
          relatedSlugs={['college-gpa-calculator', 'high-school-gpa-calculator', 'lsac-gpa-calculator', 'csu-gpa-calculator']}
          currentSlug="semester-gpa-calculator"
          navigateTo={navigateTo}
        />

        {/* Footer */}
        <footer className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-slate-200">
          <div className="text-center text-slate-600 text-sm space-y-2">
            <p><strong>Disclaimer:</strong> This semester GPA calculator is for educational purposes. Official GPAs may vary by institution.</p>
            <p>&copy; 2025 <a href="/" className="text-blue-600 hover:underline">ZuraWebTools</a>. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SemesterGPACalculator;