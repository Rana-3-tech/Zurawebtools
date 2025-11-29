import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface UnweightedGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const UnweightedGPACalculator: React.FC<UnweightedGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '-', credits: 1 },
    { id: 2, name: '', grade: '-', credits: 1 },
    { id: 3, name: '', grade: '-', credits: 1 },
    { id: 4, name: '', grade: '-', credits: 1 },
  ]);
  const [unweightedGPA, setUnweightedGPA] = useState<number | null>(null);

  // Grade points map (standard 4.0 scale)
  const gradePoints = new Map<string, number>([
    ['A+', 4.0], ['A', 4.0], ['A-', 3.7],
    ['B+', 3.3], ['B', 3.0], ['B-', 2.7],
    ['C+', 2.3], ['C', 2.0], ['C-', 1.7],
    ['D+', 1.3], ['D', 1.0], ['D-', 0.7],
    ['F', 0.0]
  ]);

  // Add course
  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name: '', grade: '-', credits: 1 }]);
  };

  // Remove course
  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Update course
  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    // Validate credits range (0.5 to 10)
    if (field === 'credits' && typeof value === 'number' && (value < 0.5 || value > 10)) {
      return;
    }
    setCourses(courses.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  // Calculate GPA (standard 4.0 scale) - Memoized for performance
  const calculateGPA = useCallback(() => {
    const validCourses = courses.filter(c => c.grade !== '-' && c.credits > 0);
    
    if (validCourses.length === 0) {
      setUnweightedGPA(null);
      return;
    }

    // Calculate unweighted GPA
    const totalPoints = validCourses.reduce((sum, course) => {
      const gradePoint = gradePoints.get(course.grade) ?? 0;
      return sum + (gradePoint * course.credits);
    }, 0);

    const totalCredits = validCourses.reduce((sum, c) => sum + c.credits, 0);

    if (totalCredits > 0) {
      setUnweightedGPA(Math.round((totalPoints / totalCredits) * 100) / 100);
    }
  }, [courses]);

  // Reset
  const resetAll = () => {
    setCourses([
      { id: 1, name: '', grade: '-', credits: 1 },
      { id: 2, name: '', grade: '-', credits: 1 },
      { id: 3, name: '', grade: '-', credits: 1 },
      { id: 4, name: '', grade: '-', credits: 1 },
    ]);
    setUnweightedGPA(null);
  };

  // Print function
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const validCourses = courses.filter(c => c.grade !== '-' && c.credits > 0);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unweighted GPA Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .gpa-display { font-size: 24px; font-weight: bold; color: #3b82f6; text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .result { background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Unweighted GPA Calculator Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

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
              ${validCourses.map(course => {
                const gradePoint = gradePoints.get(course.grade) ?? 0;
                // Sanitize course name to prevent XSS
                const sanitizedName = (course.name || 'Unnamed Course').replace(/</g, "&lt;").replace(/>/g, "&gt;");
                return `
                <tr>
                  <td>${sanitizedName}</td>
                  <td>${course.grade}</td>
                  <td>${course.credits}</td>
                  <td>${gradePoint.toFixed(2)}</td>
                </tr>
              `}).join('')}
            </tbody>
          </table>

          <div class="result">
            <h2>Results</h2>
            ${unweightedGPA !== null ? `<div class="gpa-display">Unweighted GPA: ${unweightedGPA.toFixed(2)} / 4.0</div>` : ''}
          </div>

          <p style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            Generated by ZuraWebTools - Unweighted GPA Calculator
          </p>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  // Download function
  const handleDownload = () => {
    const validCourses = courses.filter(c => c.grade !== '-' && c.credits > 0);

    let textContent = `Unweighted GPA Calculator Report\n`;
    textContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    textContent += `=== Courses ===\n`;
    validCourses.forEach(course => {
      const gradePoint = gradePoints.get(course.grade) ?? 0;
      textContent += `- ${course.name || 'Unnamed Course'}: ${course.grade} (${course.credits} credits, ${gradePoint.toFixed(2)} points)\n`;
    });
    textContent += `\n`;

    textContent += `=== Results ===\n`;
    if (unweightedGPA !== null) textContent += `Unweighted GPA: ${unweightedGPA.toFixed(2)} / 4.0\n`;

    textContent += `\n---\nGenerated by ZuraWebTools - Unweighted GPA Calculator\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Unweighted_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SEO setup
  useEffect(() => {
    document.title = "Unweighted GPA Calculator - Standard 4.0 Scale | Free";

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

    setMeta('description', 'Calculate your unweighted GPA on standard 4.0 scale. Free GPA calculator for high school and college students. Instant results with print and download options.');
    setMeta('keywords', 'unweighted GPA calculator, calculate unweighted GPA, 4.0 scale GPA calculator, standard GPA calculator, high school GPA calculator, college GPA calculator, GPA calculator free, unweighted vs weighted GPA, grade point average calculator, academic GPA tool');

    // Open Graph tags
    setMeta('og:title', 'Unweighted GPA Calculator - Standard 4.0 Scale | Free Tool', true);
    setMeta('og:description', 'Free unweighted GPA calculator using standard 4.0 scale. Calculate GPA for high school and college instantly with print/download options.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/unweighted-gpa-calculator', true);
    setMeta('og:image', 'https://zurawebtools.com/og-unweighted-gpa-calculator.png', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Unweighted GPA Calculator - Standard 4.0 Scale');
    setMeta('twitter:description', 'Calculate your unweighted GPA using standard 4.0 scale. Free tool with instant results.');
    setMeta('twitter:image', 'https://zurawebtools.com/og-unweighted-gpa-calculator.png');

    // Canonical link (fixed to use absolute URL)
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/unweighted-gpa-calculator';

    // JSON-LD structured data
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Unweighted GPA Calculator",
      "description": "Calculate unweighted GPA using standard 4.0 scale. Free online calculator for high school and college students with instant results.",
      "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/unweighted-gpa-calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Standard 4.0 scale calculation",
        "No course weighting",
        "High school and college support",
        "Print and download reports",
        "Unlimited courses",
        "Mobile responsive design"
      ]
    });
    document.head.appendChild(schema);

    // Breadcrumb schema
    const breadcrumbSchema = document.createElement('script');
    breadcrumbSchema.type = 'application/ld+json';
    breadcrumbSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com/" },
        { "@type": "ListItem", "position": 2, "name": "Education & Exam Tools", "item": "https://zurawebtools.com/education-and-exam-tools" },
        { "@type": "ListItem", "position": 3, "name": "GPA Tools", "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools" },
        { "@type": "ListItem", "position": 4, "name": "Unweighted GPA Calculator", "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/unweighted-gpa-calculator" }
      ]
    });
    document.head.appendChild(breadcrumbSchema);

    // FAQ schema
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is unweighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unweighted GPA is calculated on a standard 4.0 scale where all courses are treated equally regardless of difficulty. An A equals 4.0, B equals 3.0, C equals 2.0, and so on, with no bonus points for advanced courses."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate unweighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To calculate unweighted GPA: 1) Assign grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0), 2) Multiply each grade point by the course credits, 3) Sum all grade points, 4) Divide by total credit hours taken."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between weighted and unweighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unweighted GPA uses a 4.0 scale with no extra points for advanced courses. Weighted GPA uses a 5.0 scale and adds bonus points for AP, Honors, and IB courses. Unweighted GPA provides a standard comparison across all students."
          }
        },
        {
          "@type": "Question",
          "name": "Do colleges prefer weighted or unweighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most colleges look at both. Unweighted GPA provides a standard comparison, while weighted GPA shows course rigor. Many colleges recalculate GPA using their own formula to ensure fair evaluation across different high schools."
          }
        },
        {
          "@type": "Question",
          "name": "Can unweighted GPA be higher than 4.0?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, unweighted GPA cannot exceed 4.0. The highest grade (A or A+) equals 4.0 points, making 4.0 the maximum possible unweighted GPA. Only weighted GPAs can exceed 4.0 due to bonus points for advanced courses."
          }
        },
        {
          "@type": "Question",
          "name": "Is a 3.5 unweighted GPA good?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, a 3.5 unweighted GPA is good and falls between a B+ and A- average. This GPA makes you competitive for many colleges and universities, though highly selective schools typically look for GPAs closer to 3.8-4.0."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA scale is used in UK, Australia, and Germany?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The UK uses percentage and classification systems (First Class, Upper Second, etc.). Australia uses a 7.0 GPA scale or HD/D/C/P system. Germany uses 1.0-5.0 scale (1.0 being best). Our 4.0 scale calculator is primarily for US educational institutions."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    // IndexNow notification
    notifyIndexNow('/education-and-exam-tools/gpa-tools/unweighted-gpa-calculator');

    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      schema.remove();
      breadcrumbSchema.remove();
      faqSchema.remove();
    };
  }, []);

  // Table of Contents
  const tocSections: TOCSection[] = [
    { id: 'calculator', title: 'Calculator', emoji: '🧮', subtitle: 'Calculate your unweighted GPA', gradientFrom: 'from-blue-50', gradientTo: 'to-cyan-50', hoverBorder: 'border-blue-400', hoverText: 'text-blue-600' },
    { id: 'quick-examples', title: 'Quick Examples', emoji: '⚡', subtitle: 'Instant value examples', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-400', hoverText: 'text-green-600' },
    { id: 'benefits', title: 'Benefits', emoji: '⭐', subtitle: 'Why use this tool', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
    { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-emerald-400', hoverText: 'text-emerald-600' },
    { id: 'use-cases', title: 'Use Cases', emoji: '👥', subtitle: 'Who uses this tool', gradientFrom: 'from-cyan-50', gradientTo: 'to-blue-50', hoverBorder: 'border-cyan-400', hoverText: 'text-cyan-600' },
    { id: 'about', title: 'About', emoji: '📚', subtitle: 'Understanding unweighted GPA', gradientFrom: 'from-indigo-50', gradientTo: 'to-purple-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
    { id: 'faq', title: 'FAQ', emoji: '❓', subtitle: 'Common questions', gradientFrom: 'from-rose-50', gradientTo: 'to-red-50', hoverBorder: 'border-rose-400', hoverText: 'text-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unweighted GPA Calculator
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate your unweighted GPA on the standard 4.0 scale. Free GPA calculator for high school and college students with instant results.
          </p>
        </div>

        {/* Calculator Section */}
        <section id="calculator" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Unweighted GPA</h2>

          {/* Course Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Course Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Credits</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        placeholder={`Course ${index + 1}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        aria-label={`Course ${index + 1} name`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        aria-label={`Course ${index + 1} grade`}
                      >
                        <option value="-">Select</option>
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
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                        min="0.5"
                        max="10"
                        step="0.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        aria-label={`Course ${index + 1} credits`}
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeCourse(course.id)}
                        disabled={courses.length === 1}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        aria-label={`Remove course ${index + 1}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Course Button */}
          <button
            onClick={addCourse}
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course
          </button>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={calculateGPA}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Calculate GPA
            </button>

            <button
              onClick={resetAll}
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All
            </button>
          </div>

          {/* Export Options */}
          {unweightedGPA !== null && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
                  aria-label="Print unweighted GPA report"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Report
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md"
                  aria-label="Download unweighted GPA report as text file"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Report
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Results Section */}
        {unweightedGPA !== null && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-blue-300">
            <h3 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide text-center">Your Unweighted GPA</h3>
            <div className="text-6xl font-bold text-blue-600 mb-3 text-center">
              {unweightedGPA.toFixed(2)}
            </div>
            <p className="text-lg text-blue-600 font-medium text-center">Out of 4.0 Scale</p>
            <div className="mt-6 pt-6 border-t border-blue-200">
              <p className="text-sm text-gray-600 text-center">Standard GPA calculation - all courses weighted equally</p>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Social Share Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Share This Tool</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Calculate your unweighted GPA on standard 4.0 scale&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
              aria-label="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              Facebook
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#006399] transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              LinkedIn
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied!'))}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Copy link"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples Section */}
        <section id="quick-examples" className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-6 mb-8 border-2 border-green-300 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            Quick GPA Examples
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
              <h4 className="font-bold text-blue-700 mb-2">All A's</h4>
              <p className="text-3xl font-bold text-blue-600">4.00</p>
              <p className="text-sm text-gray-600 mt-1">4 courses, all A grades</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200 shadow-sm">
              <h4 className="font-bold text-purple-700 mb-2">Mixed A's & B's</h4>
              <p className="text-3xl font-bold text-purple-600">3.50</p>
              <p className="text-sm text-gray-600 mt-1">2 A's and 2 B's</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200 shadow-sm">
              <h4 className="font-bold text-orange-700 mb-2">All B's</h4>
              <p className="text-3xl font-bold text-orange-600">3.00</p>
              <p className="text-sm text-gray-600 mt-1">4 courses, all B grades</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use Our Unweighted GPA Calculator?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Calculation</h3>
              <p className="text-gray-600">Get your unweighted GPA in seconds with real-time calculation on standard 4.0 scale.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Standard 4.0 Scale</h3>
              <p className="text-gray-600">Accurate calculation using the universally recognized 4.0 GPA scale used globally.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Optimized</h3>
              <p className="text-gray-600">Calculate GPA on any device - desktop, tablet, or smartphone with responsive design.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Export Reports</h3>
              <p className="text-gray-600">Print or download your GPA report for college applications and academic records.</p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Calculate Unweighted GPA</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Courses</h3>
                <p className="text-gray-700 leading-relaxed">
                  Add each course you're taking or have taken. Include the course name (optional), your letter grade, and credit hours for each course.
                </p>
                <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                  <p className="text-sm text-gray-700"><strong>💡 Tip:</strong> Most courses are worth 1.0 credit. Some electives or lab courses may be 0.5 credits.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Letter Grades</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Choose your letter grade for each course from the dropdown menu:
                </p>
                <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
                  <li><strong>A/A+ = 4.0</strong> | <strong>A- = 3.7</strong></li>
                  <li><strong>B+ = 3.3</strong> | <strong>B = 3.0</strong> | <strong>B- = 2.7</strong></li>
                  <li><strong>C+ = 2.3</strong> | <strong>C = 2.0</strong> | <strong>C- = 1.7</strong></li>
                  <li><strong>D+ = 1.3</strong> | <strong>D = 1.0</strong> | <strong>D- = 0.7</strong> | <strong>F = 0.0</strong></li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Click Calculate GPA</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Hit the "Calculate GPA" button to see your unweighted GPA on the standard 4.0 scale.
                </p>
                <div className="mt-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">📊 Calculation Example:</p>
                  <p className="text-sm text-gray-700">Course 1: English (A = 4.0) × 1 credit = 4.0 points</p>
                  <p className="text-sm text-gray-700">Course 2: Math (B+ = 3.3) × 1 credit = 3.3 points</p>
                  <p className="text-sm text-gray-700">Course 3: Science (A- = 3.7) × 1 credit = 3.7 points</p>
                  <p className="text-sm text-gray-700">Course 4: History (B = 3.0) × 1 credit = 3.0 points</p>
                  <p className="text-sm text-gray-700 mt-2 pt-2 border-t border-green-300"><strong>Total:</strong> 14.0 points ÷ 4 credits = <strong className="text-green-700">3.50 GPA</strong></p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Print or Download</h3>
                <p className="text-gray-700 leading-relaxed">
                  Use the export buttons to print your GPA report or download it as a text file for your records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Uses This Unweighted GPA Calculator?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">High School Students</h3>
                  <p className="text-gray-700">Track academic progress, understand GPA requirements for college admissions, and calculate cumulative GPA across multiple semesters.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🏫</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">College Students</h3>
                  <p className="text-gray-700">Monitor semester GPA, maintain scholarship eligibility, and track progress towards graduation requirements and academic standing.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🌍</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">International Students</h3>
                  <p className="text-gray-700">Convert grades to US 4.0 scale for university applications in USA, UK, Australia, Germany, and other countries requiring standardized GPA.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">👨‍👩‍👧</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Parents & Educators</h3>
                  <p className="text-gray-700">Help students understand their academic standing, verify report card calculations, and provide accurate GPA information for college planning.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-300 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Unweighted GPA Calculation</h2>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p className="text-lg">
              An <strong>unweighted GPA calculator</strong> is an essential academic tool for students worldwide to calculate their grade point average using the standard 4.0 scale. Unlike weighted GPA systems that add bonus points for advanced courses like AP, Honors, or IB classes, <strong>unweighted GPA</strong> treats all classes equally, providing a straightforward and fair measure of academic performance based purely on letter grades earned across all courses.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">What is the 4.0 GPA Scale?</h3>
            <p>
              The <strong>4.0 scale</strong> is the most widely recognized and universally accepted GPA system used in the United States, Canada, and many international educational institutions globally. In this standardized system, an A or A+ equals 4.0 points (excellent), a B equals 3.0 points (good), a C equals 2.0 points (average), a D equals 1.0 point (passing), and F (failing) receives 0.0 points. This consistent scale allows colleges, universities, graduate schools, and employers to compare student academic performance fairly across different high schools, institutions, and regions.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Free Unweighted GPA Calculator for Global Students</h3>
            <p>
              Our <strong>free unweighted GPA calculator</strong> is specifically designed for students from diverse educational backgrounds, including those in the UK (United Kingdom), Australia, Germany, and other countries where different grading systems and scales are used. Many international students need to convert their local grades to the US 4.0 scale when applying to American universities, Canadian institutions, or global programs that require standardized GPA reporting for college admissions. The calculator simplifies this conversion process by automatically computing your <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:text-blue-800 font-semibold underline">college GPA</a> or <strong>high school GPA</strong> based on course letter grades and credit hours.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Why Unweighted GPA Matters for College Admissions</h3>
            <p>
              Understanding your <strong>unweighted GPA</strong> is crucial for several academic and professional reasons. First, it provides an accurate baseline measurement of your academic achievement without the grade inflation that can come from weighted GPA systems. Many competitive colleges, universities, and scholarship programs evaluate both weighted and unweighted GPAs to get a complete picture of student performance and course rigor. Second, <strong>unweighted GPA</strong> is often used by schools to determine academic honors, eligibility for prestigious honor societies like National Honor Society (NHS), Beta Club, and graduation recognition distinctions such as cum laude, magna cum laude, or summa cum laude.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">How to Calculate Unweighted GPA: Step-by-Step Method</h3>
            <p>
              The <strong>GPA calculation</strong> methodology for unweighted GPA is straightforward and transparent: multiply each course's grade point value (A=4.0, B=3.0, etc.) by its credit hours, sum all quality points earned across all courses, and divide by the total number of credit hours attempted. This weighted average formula ensures that courses with more credit hours (typically 3-4 credits for college courses or 1.0 credit for high school courses) have proportionally greater impact on your overall cumulative GPA. Our online calculator handles all the complex mathematics automatically, allowing you to focus on understanding your <strong>academic standing</strong> and strategically planning future course selections to improve or maintain your <a href="/education-and-exam-tools/gpa-tools/semester-gpa-calculator" className="text-blue-600 hover:text-blue-800 font-semibold underline">semester GPA</a> effectively.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Unweighted vs Weighted GPA: Key Differences</h3>
            <p>
              The primary difference between <strong>unweighted vs weighted GPA</strong> is course difficulty consideration. Unweighted GPA uses the standard 4.0 scale maximum where all A's equal 4.0 regardless of whether you took regular, honors, or AP courses. In contrast, weighted GPA can exceed 4.0 (typically up to 5.0) by adding bonus points for advanced coursework. While weighted GPA shows academic rigor and challenge-seeking behavior valued by selective colleges, unweighted GPA provides a level playing field for comparing students from different schools with varying advanced course offerings. Most college admissions offices consider both metrics when evaluating applications holistically.
            </p>

            <div className="mt-8 p-6 bg-white rounded-lg border-2 border-indigo-400 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🌍 Global GPA Standards & Conversion Reference</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li><strong>United States:</strong> Standard 4.0 scale (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) - Most common system</li>
                <li><strong>United Kingdom:</strong> Percentage system (70%+ First Class, 60-69% Upper Second, 50-59% Lower Second, 40-49% Third) and degree classifications</li>
                <li><strong>Australia:</strong> 7.0 GPA scale or HD (High Distinction), D (Distinction), C (Credit), P (Pass), F (Fail) grading system</li>
                <li><strong>Germany:</strong> Reverse 1.0 to 5.0 scale where 1.0 is highest (excellent), 4.0 is minimum pass, and 5.0 is fail</li>
                <li><strong>Canada:</strong> Varies by province and institution, often uses 4.0 scale, 4.3 scale, or percentage scales (90-100% = A = 4.0)</li>
                <li><strong>India:</strong> Percentage system or 10-point CGPA scale (multiply by 0.4 to convert to approximate 4.0 scale)</li>
              </ul>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-700"><strong>💡 Pro Tip:</strong> When applying to US universities, always check specific GPA conversion requirements as some institutions have their own standardized conversion formulas for international transcripts.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">Using GPA Calculator for Scholarship Applications</h3>
            <p>
              Your <strong>unweighted GPA</strong> plays a critical role in scholarship eligibility and merit-based financial aid decisions. Many scholarships have minimum GPA requirements (commonly 3.0, 3.5, or 3.8) that are strictly enforced. By using our calculator regularly to track your <strong>cumulative GPA</strong>, you can identify when you're at risk of falling below scholarship thresholds and take corrective action through improved study habits, tutoring, or course selection strategies. Additionally, understanding how individual course grades impact your overall GPA helps you prioritize challenging classes where grade improvement would have the greatest positive effect on your academic record.
            </p>
          </div>
        </section>

        {/* External Links Section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.collegeboard.org/college-admission/applying/gpa-class-rank"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">College Board - GPA Information</h3>
                <p className="text-sm text-gray-600">Official guidance on GPA calculation for college admissions</p>
              </div>
            </a>

            <a
              href="https://www.nacac.org/knowledge-center/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">NACAC Knowledge Center</h3>
                <p className="text-sm text-gray-600">National Association for College Admission Counseling resources</p>
              </div>
            </a>

            <a
              href="https://www.ucas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">UCAS - UK Universities</h3>
                <p className="text-sm text-gray-600">UK university admissions service and grading information</p>
              </div>
            </a>

            <a
              href="https://www.studyinaustralia.gov.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Study in Australia</h3>
                <p className="text-sm text-gray-600">Australian education system and grading standards</p>
              </div>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="bg-gray-100 rounded-lg p-4 mb-8 text-center border border-gray-300">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Last Updated:</span> November 29, 2025 | 
            <span className="ml-2">Verified for 2025-2026 academic year</span>
          </p>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is unweighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Unweighted GPA is calculated on a standard 4.0 scale where all courses are treated equally regardless of difficulty. An A equals 4.0, B equals 3.0, C equals 2.0, and so on, with no bonus points for advanced courses like AP or Honors classes.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How do you calculate unweighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                To calculate unweighted GPA: 1) Assign grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0), 2) Multiply each grade point by the course credits, 3) Sum all grade points, 4) Divide by total credit hours taken.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is the difference between weighted and unweighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Unweighted GPA uses a 4.0 scale with no extra points for advanced courses. Weighted GPA uses a 5.0 scale and adds bonus points for AP, Honors, and IB courses. Unweighted GPA provides a standard comparison across all students regardless of course difficulty.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do colleges prefer weighted or unweighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Most colleges look at both. Unweighted GPA provides a standard comparison, while weighted GPA shows course rigor. Many colleges recalculate GPA using their own formula to ensure fair evaluation across different high schools with varying grading systems.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can unweighted GPA be higher than 4.0?</h3>
              <p className="text-gray-700 leading-relaxed">
                No, unweighted GPA cannot exceed 4.0. The highest grade (A or A+) equals 4.0 points, making 4.0 the maximum possible unweighted GPA. Only weighted GPAs can exceed 4.0 due to bonus points for advanced courses.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is a 3.5 unweighted GPA good?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, a 3.5 unweighted GPA is good and falls between a B+ and A- average. This GPA makes you competitive for many colleges and universities, though highly selective schools typically look for GPAs closer to 3.8-4.0.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What GPA scale is used in UK, Australia, and Germany?</h3>
              <p className="text-gray-700 leading-relaxed">
                The UK uses percentage and classification systems (First Class, Upper Second, etc.). Australia uses a 7.0 GPA scale or HD/D/C/P system. Germany uses 1.0-5.0 scale (1.0 being best). Our 4.0 scale calculator is primarily for US educational institutions but can be used for conversion reference.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools
          relatedSlugs={['weighted-gpa-calculator', 'college-gpa-calculator', 'semester-gpa-calculator', 'high-school-gpa-calculator']}
          currentSlug="unweighted-gpa-calculator"
          navigateTo={navigateTo}
        />
      </div>
    </div>
  );
};

export default UnweightedGPACalculator;
