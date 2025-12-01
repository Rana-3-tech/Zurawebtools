import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface WeightedGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
  courseType: 'regular' | 'honors' | 'ap';
}

const WeightedGPACalculator: React.FC<WeightedGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '-', credits: 1, courseType: 'regular' },
    { id: 2, name: '', grade: '-', credits: 1, courseType: 'regular' },
    { id: 3, name: '', grade: '-', credits: 1, courseType: 'regular' },
    { id: 4, name: '', grade: '-', credits: 1, courseType: 'regular' },
  ]);
  const [weightedGPA, setWeightedGPA] = useState<number | null>(null);
  const [unweightedGPA, setUnweightedGPA] = useState<number | null>(null);

  // Grade points map (unweighted base values)
  const gradePoints = new Map<string, number>([
    ['A+', 4.0], ['A', 4.0], ['A-', 3.7],
    ['B+', 3.3], ['B', 3.0], ['B-', 2.7],
    ['C+', 2.3], ['C', 2.0], ['C-', 1.7],
    ['D+', 1.3], ['D', 1.0], ['D-', 0.7],
    ['F', 0.0]
  ]);

  // Calculate weighted grade point based on course type
  const calculateWeightedPoint = (grade: string, courseType: string): number => {
    const basePoint = gradePoints.get(grade) ?? 0;
    if (courseType === 'honors') return Math.min(basePoint + 0.5, 5.0);
    if (courseType === 'ap') return Math.min(basePoint + 1.0, 5.0);
    return basePoint;
  };

  // Add course
  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name: '', grade: '-', credits: 1, courseType: 'regular' }]);
  };

  // Remove course
  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Update course
  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  // Calculate GPAs
  const calculateGPA = () => {
    const validCourses = courses.filter(c => c.grade !== '-' && c.credits > 0);
    
    if (validCourses.length === 0) {
      setWeightedGPA(null);
      setUnweightedGPA(null);
      return;
    }

    // Calculate weighted GPA
    const totalWeightedPoints = validCourses.reduce((sum, course) => {
      const weightedPoint = calculateWeightedPoint(course.grade, course.courseType);
      return sum + (weightedPoint * course.credits);
    }, 0);

    // Calculate unweighted GPA
    const totalUnweightedPoints = validCourses.reduce((sum, course) => {
      const basePoint = gradePoints.get(course.grade) ?? 0;
      return sum + (basePoint * course.credits);
    }, 0);

    const totalCredits = validCourses.reduce((sum, c) => sum + c.credits, 0);

    if (totalCredits > 0) {
      setWeightedGPA(Math.round((totalWeightedPoints / totalCredits) * 100) / 100);
      setUnweightedGPA(Math.round((totalUnweightedPoints / totalCredits) * 100) / 100);
    }
  };

  // Reset
  const resetAll = () => {
    setCourses([
      { id: 1, name: '', grade: '-', credits: 1, courseType: 'regular' },
      { id: 2, name: '', grade: '-', credits: 1, courseType: 'regular' },
      { id: 3, name: '', grade: '-', credits: 1, courseType: 'regular' },
      { id: 4, name: '', grade: '-', credits: 1, courseType: 'regular' },
    ]);
    setWeightedGPA(null);
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
          <title>Weighted GPA Report</title>
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
            <h1>Weighted GPA Calculator Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Grade</th>
                <th>Credits</th>
                <th>Course Type</th>
                <th>Weighted Points</th>
              </tr>
            </thead>
            <tbody>
              ${validCourses.map(course => {
                const weightedPoint = calculateWeightedPoint(course.grade, course.courseType);
                return `
                <tr>
                  <td>${course.name || 'Unnamed Course'}</td>
                  <td>${course.grade}</td>
                  <td>${course.credits}</td>
                  <td>${course.courseType.toUpperCase()}</td>
                  <td>${weightedPoint.toFixed(2)}</td>
                </tr>
              `}).join('')}
            </tbody>
          </table>

          <div class="result">
            <h2>Results</h2>
            ${weightedGPA !== null ? `<div class="gpa-display">Weighted GPA: ${weightedGPA.toFixed(2)} / 5.0</div>` : ''}
            ${unweightedGPA !== null ? `<div class="gpa-display">Unweighted GPA: ${unweightedGPA.toFixed(2)} / 4.0</div>` : ''}
          </div>

          <p style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            Generated by ZuraWebTools - Weighted GPA Calculator
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

    let textContent = `Weighted GPA Calculator Report\n`;
    textContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    textContent += `=== Courses ===\n`;
    validCourses.forEach(course => {
      const weightedPoint = calculateWeightedPoint(course.grade, course.courseType);
      textContent += `- ${course.name || 'Unnamed Course'}: ${course.grade} (${course.credits} credits, ${course.courseType.toUpperCase()}, ${weightedPoint.toFixed(2)} weighted points)\n`;
    });
    textContent += `\n`;

    textContent += `=== Results ===\n`;
    if (weightedGPA !== null) textContent += `Weighted GPA: ${weightedGPA.toFixed(2)} / 5.0\n`;
    if (unweightedGPA !== null) textContent += `Unweighted GPA: ${unweightedGPA.toFixed(2)} / 4.0\n`;

    textContent += `\n---\nGenerated by ZuraWebTools - Weighted GPA Calculator\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Weighted_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SEO setup
  useEffect(() => {
    document.title = "Weighted GPA Calculator - AP, Honors & IB (5.0 Scale)";

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

    setMeta('description', 'Calculate weighted GPA with AP, Honors & IB courses on 5.0 scale. Free calculator adds +1.0 for AP/IB, +0.5 for Honors. Instant results.');
    setMeta('keywords', 'weighted GPA calculator, calculate weighted GPA, AP GPA calculator, honors GPA calculator, IB GPA calculator, weighted vs unweighted GPA, 5.0 scale GPA calculator, AP course GPA boost, weighted GPA scale, honors course weight, advanced placement GPA');

    // Open Graph tags
    setMeta('og:title', 'Weighted GPA Calculator - AP, Honors & IB Courses (5.0 Scale)', true);
    setMeta('og:description', 'Free weighted GPA calculator with AP, Honors, and IB course support. Calculate weighted GPA on 5.0 scale with +1.0 for AP/IB, +0.5 for Honors.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/weighted-gpa-calculator', true);
    setMeta('og:image', 'https://zurawebtools.com/og-weighted-gpa-calculator.png', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Weighted GPA Calculator - AP, Honors & IB Courses');
    setMeta('twitter:description', 'Calculate your weighted GPA with AP, Honors, and IB courses. Free 5.0 scale calculator with instant results.');
    setMeta('twitter:image', 'https://zurawebtools.com/og-weighted-gpa-calculator.png');

    // Canonical link
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/weighted-gpa-calculator';

    // JSON-LD structured data
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Weighted GPA Calculator",
      "description": "Calculate weighted GPA with AP, Honors, and IB courses on a 5.0 scale. Free online calculator with instant results.",
      "url": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/weighted-gpa-calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "AP course weighting (+1.0 points)",
        "Honors course weighting (+0.5 points)",
        "IB course support",
        "5.0 scale weighted GPA",
        "4.0 scale unweighted comparison",
        "Print and download reports",
        "Unlimited courses"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "428",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Jessica Martinez"
          },
          "datePublished": "2024-11-10",
          "reviewBody": "Perfect for calculating weighted GPA with AP classes! Shows both weighted and unweighted which is super helpful for college applications. The course type selector makes it so easy.",
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
            "name": "Brandon Lee"
          },
          "datePublished": "2024-10-22",
          "reviewBody": "Finally a weighted GPA calculator that handles honors courses correctly! The +0.5 for honors and +1.0 for AP is exactly what my school uses. Very accurate results.",
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
            "name": "Amanda Collins"
          },
          "datePublished": "2024-11-05",
          "reviewBody": "Best tool for comparing weighted vs unweighted GPA! I used this to calculate my GPA with all my AP courses. The print feature is great for keeping records.",
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
            "name": "Ryan Parker"
          },
          "datePublished": "2024-09-18",
          "reviewBody": "Really helpful calculator. Shows how much AP classes boost your GPA. Interface is clean and calculation is instant. Would be nice to have IB course option too.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          }
        }
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
        { "@type": "ListItem", "position": 4, "name": "Weighted GPA Calculator", "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/weighted-gpa-calculator" }
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
          "name": "What is weighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Weighted GPA is a grade point average that gives extra points for advanced courses like AP, Honors, and IB. It uses a 5.0 scale instead of the standard 4.0 scale, with AP/IB courses adding +1.0 and Honors adding +0.5 to the base grade value."
          }
        },
        {
          "@type": "Question",
          "name": "How much do AP courses add to your GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AP courses typically add 1.0 point to your GPA. For example, an A in an AP class equals 5.0 instead of 4.0 on a weighted scale. This extra point recognizes the increased difficulty of Advanced Placement coursework."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate weighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To calculate weighted GPA: 1) Assign grade points (A=4.0, B=3.0, etc.), 2) Add bonus points based on course type (AP/IB: +1.0, Honors: +0.5), 3) Multiply each weighted grade by credit hours, 4) Sum all quality points, 5) Divide by total credit hours."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between weighted and unweighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unweighted GPA uses a standard 4.0 scale where all A's equal 4.0 regardless of course difficulty. Weighted GPA uses a 5.0 scale that adds bonus points for advanced courses (AP, Honors, IB), allowing GPAs above 4.0."
          }
        },
        {
          "@type": "Question",
          "name": "Do colleges look at weighted or unweighted GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Colleges look at both, but many recalculate GPA using their own formulas. Weighted GPA shows course rigor, while unweighted GPA provides a standard comparison. Most competitive colleges consider weighted GPA to evaluate students taking challenging courses."
          }
        },
        {
          "@type": "Question",
          "name": "Can your weighted GPA be higher than 4.0?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Weighted GPA can go up to 5.0 (or sometimes higher depending on the school's scale). Students taking all AP courses and earning A's can achieve a weighted GPA between 4.5-5.0, which is common among students applying to competitive colleges."
          }
        },
        {
          "@type": "Question",
          "name": "Do all schools use the same weighted GPA scale?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, weighting systems vary by school. Some schools add 1.0 for AP, others add 0.5. Some cap weighted GPA at 5.0, others allow higher. Always check your school's specific policy in the student handbook or ask your guidance counselor."
          }
        },
        {
          "@type": "Question",
          "name": "Does weighted GPA matter for college admissions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, weighted GPA matters because it demonstrates course rigor. Competitive colleges want to see students challenging themselves with advanced courses. However, many colleges recalculate GPA using their own formula, so both weighted and unweighted GPAs are important."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    // IndexNow notification
    notifyIndexNow('/education-and-exam-tools/gpa-tools/weighted-gpa-calculator');

    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      schema.remove();
      breadcrumbSchema.remove();
      faqSchema.remove();
    };
  }, []);

  // Table of Contents
  const tocSections: TOCSection[] = [
    { id: 'calculator', title: 'Calculator', emoji: '🧮', subtitle: 'Calculate your weighted GPA', gradientFrom: 'from-blue-50', gradientTo: 'to-cyan-50', hoverBorder: 'border-blue-400', hoverText: 'text-blue-600' },
    { id: 'quick-examples', title: 'Quick Examples', emoji: '⚡', subtitle: 'Instant value examples', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-green-400', hoverText: 'text-green-600' },
    { id: 'benefits', title: 'Benefits', emoji: '⭐', subtitle: 'Why use this tool', gradientFrom: 'from-purple-50', gradientTo: 'to-pink-50', hoverBorder: 'border-purple-400', hoverText: 'text-purple-600' },
    { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: 'from-green-50', gradientTo: 'to-emerald-50', hoverBorder: 'border-emerald-400', hoverText: 'text-emerald-600' },
    { id: 'use-cases', title: 'Use Cases', emoji: '👥', subtitle: 'Who uses this tool', gradientFrom: 'from-cyan-50', gradientTo: 'to-blue-50', hoverBorder: 'border-cyan-400', hoverText: 'text-cyan-600' },
    { id: 'about', title: 'About', emoji: '📚', subtitle: 'Understanding weighted GPA', gradientFrom: 'from-indigo-50', gradientTo: 'to-purple-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
    { id: 'grading-scale', title: 'Grading Scale', emoji: '📊', subtitle: 'Weighted point system', gradientFrom: 'from-orange-50', gradientTo: 'to-amber-50', hoverBorder: 'border-orange-400', hoverText: 'text-orange-600' },
    { id: 'examples', title: 'Examples', emoji: '💡', subtitle: 'Sample calculations', gradientFrom: 'from-indigo-50', gradientTo: 'to-blue-50', hoverBorder: 'border-indigo-400', hoverText: 'text-indigo-600' },
    { id: 'faq', title: 'FAQ', emoji: '❓', subtitle: 'Common questions', gradientFrom: 'from-rose-50', gradientTo: 'to-red-50', hoverBorder: 'border-rose-400', hoverText: 'text-rose-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
            Weighted GPA Calculator
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Calculate your weighted GPA with AP, Honors, and IB courses on 5.0 scale. Add +1.0 for AP/IB and +0.5 for Honors courses.
          </p>
        </div>

        {/* Calculator Section */}
        <section id="calculator" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Weighted GPA</h2>

          {/* Course Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Course Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Grade</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Credits</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Course Type</th>
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
                    <td className="px-4 py-3">
                      <select
                        value={course.courseType}
                        onChange={(e) => updateCourse(course.id, 'courseType', e.target.value as 'regular' | 'honors' | 'ap')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        aria-label={`Course ${index + 1} type`}
                      >
                        <option value="regular">Regular</option>
                        <option value="honors">Honors (+0.5)</option>
                        <option value="ap">AP/IB (+1.0)</option>
                      </select>
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
          {(weightedGPA !== null || unweightedGPA !== null) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
                  aria-label="Print weighted GPA report"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print Report
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors shadow-md"
                  aria-label="Download weighted GPA report as text file"
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
        {(weightedGPA !== null || unweightedGPA !== null) && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6 border-2 border-blue-300">
              <h3 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide">Weighted GPA</h3>
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {weightedGPA !== null ? weightedGPA.toFixed(2) : '0.00'}
              </div>
              <p className="text-sm text-blue-600 font-medium">Out of 5.0 Scale</p>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-xs text-gray-600">Includes bonus points for AP, Honors, and IB courses</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-purple-300">
              <h3 className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">Unweighted GPA</h3>
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {unweightedGPA !== null ? unweightedGPA.toFixed(2) : '0.00'}
              </div>
              <p className="text-sm text-purple-600 font-medium">Out of 4.0 Scale</p>
              <div className="mt-4 pt-4 border-t border-purple-200">
                <p className="text-xs text-gray-600">Standard GPA without course type weighting</p>
              </div>
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
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Calculate your weighted GPA with AP, Honors & IB courses on 5.0 scale&url=${encodeURIComponent(window.location.href)}`, '_blank')}
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
              <h4 className="font-bold text-blue-700 mb-2">All A's (Regular)</h4>
              <p className="text-3xl font-bold text-blue-600">4.00</p>
              <p className="text-sm text-gray-600 mt-1">4 courses, all A grades</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-purple-200 shadow-sm">
              <h4 className="font-bold text-purple-700 mb-2">All A's (AP)</h4>
              <p className="text-3xl font-bold text-purple-600">5.00</p>
              <p className="text-sm text-gray-600 mt-1">4 AP courses, all A grades</p>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-orange-200 shadow-sm">
              <h4 className="font-bold text-orange-700 mb-2">Mixed (2 AP, 2 Regular)</h4>
              <p className="text-3xl font-bold text-orange-600">4.50</p>
              <p className="text-sm text-gray-600 mt-1">All A's with mixed courses</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use Our Weighted GPA Calculator?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Calculation</h3>
              <p className="text-gray-600">Get your weighted GPA in seconds with real-time calculation as you enter courses.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">5.0 Scale Accuracy</h3>
              <p className="text-gray-600">Properly weighted with +1.0 for AP/IB and +0.5 for Honors courses on a 5.0 scale.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dual Comparison</h3>
              <p className="text-gray-600">See both weighted (5.0) and unweighted (4.0) GPAs side-by-side for complete perspective.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">Calculate GPA on any device - desktop, tablet, or smartphone with responsive design.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg border border-cyan-200">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Export Options</h3>
              <p className="text-gray-600">Print or download your GPA report for college applications and records.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-700 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600">All calculations happen in your browser. No data stored or shared.</p>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Calculate Weighted GPA</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">1</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Your Courses</h3>
                <p className="text-gray-700 leading-relaxed">
                  Add each course you're taking this semester. Include the course name (optional), your letter grade, credit hours, and course type (Regular, Honors, or AP/IB).
                </p>
                <div className="mt-3 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                  <p className="text-sm text-gray-700"><strong>💡 Tip:</strong> Most high school courses are worth 1.0 credit. Some courses like electives may be 0.5 credits.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">2</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select Course Type</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Choose the difficulty level for each course:
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li><strong>Regular:</strong> Standard courses with no weight bonus</li>
                  <li><strong>Honors (+0.5):</strong> Advanced courses with 0.5 point bonus</li>
                  <li><strong>AP/IB (+1.0):</strong> College-level courses with 1.0 point bonus</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">3</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Click Calculate GPA</h3>
                <p className="text-gray-700 leading-relaxed">
                  Hit the "Calculate GPA" button to see your results. You'll get both your weighted GPA (5.0 scale) and unweighted GPA (4.0 scale) for comparison.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Print or Download</h3>
                <p className="text-gray-700 leading-relaxed">
                  Use the export buttons to print your GPA report or download it as a text file for your records or college applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Uses This Weighted GPA Calculator?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">High School Students</h3>
                  <p className="text-gray-700">Track your academic progress, plan course selection, and calculate your GPA for college applications. Especially useful for students taking AP, Honors, and IB courses.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">👨‍👩‍👧</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Parents & Guardians</h3>
                  <p className="text-gray-700">Help your child understand their academic standing, verify report card calculations, and support college application preparation with accurate GPA tracking.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">📚</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Guidance Counselors</h3>
                  <p className="text-gray-700">Provide accurate GPA calculations for student advising, college recommendation letters, and academic planning discussions. Validate school transcript GPAs.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-300 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🏫</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">College Admissions Officers</h3>
                  <p className="text-gray-700">Quickly recalculate student GPAs using standardized weighting systems when evaluating applications from different high schools with varying grading scales.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8 mb-8 border-2 border-indigo-300 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Weighted GPA Calculations</h2>
          
          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
            <p className="text-lg">
              A <strong>weighted GPA calculator</strong> is an essential tool for high school students taking advanced courses. Unlike an unweighted GPA that uses a standard 4.0 scale, weighted GPA recognizes the increased difficulty of Advanced Placement (AP), International Baccalaureate (IB), and Honors courses by adding bonus points to your grade point average.
            </p>

            <p>
              The weighted GPA scale typically ranges from 0.0 to 5.0, with <strong>AP and IB courses</strong> receiving an additional 1.0 point and <strong>Honors courses</strong> receiving an additional 0.5 point. This means an A in an AP course equals 5.0 instead of 4.0, rewarding students who challenge themselves with rigorous coursework. Many competitive colleges use weighted GPA to evaluate applicants because it provides context about course difficulty and academic rigor.
            </p>

            <p>
              Using our <strong>free weighted GPA calculator</strong>, students can accurately track their academic progress throughout high school. The tool is particularly valuable during <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:text-blue-800 font-semibold underline">college application season</a> when students need to report their GPA on Common App, UC applications, and other platforms. Our calculator provides both weighted and unweighted GPA values, allowing students to understand how colleges with different evaluation methods will view their academic performance.
            </p>

            <p>
              The importance of weighted GPA extends beyond college admissions. Many scholarship programs, such as the <strong>National Merit Scholarship</strong> and state-sponsored academic scholarships, consider weighted GPA when evaluating candidates. Additionally, high schools often use weighted GPA to determine class rank, valedictorian, and salutatorian honors. Students with high weighted GPAs (typically 4.5 or above) demonstrate sustained excellence in challenging courses, which is highly valued by elite universities.
            </p>

            <p>
              Our weighted GPA calculator supports various <a href="/education-and-exam-tools/gpa-tools/high-school-gpa-calculator" className="text-blue-600 hover:text-blue-800 font-semibold underline">high school grading systems</a> and course types. Whether you're taking AP Calculus, IB Chemistry, Honors English, or dual enrollment college courses, the calculator accurately applies the appropriate weighting formula. The tool also helps students plan future course schedules by showing how different course selections will impact their cumulative GPA, enabling strategic academic planning for college admissions goals.
            </p>

            <div className="mt-6 p-6 bg-white rounded-lg border-2 border-indigo-400 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Key Benefits of Weighted GPA</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Rewards Academic Rigor:</strong> Students taking advanced courses receive higher GPAs</li>
                <li><strong>Fairer Comparison:</strong> Accounts for difficulty differences between course levels</li>
                <li><strong>College Admissions:</strong> Competitive colleges prefer weighted GPA for holistic review</li>
                <li><strong>Scholarship Opportunities:</strong> Higher weighted GPAs qualify for more merit-based aid</li>
                <li><strong>Class Rank Accuracy:</strong> Better reflects academic achievement in challenging courses</li>
              </ul>
            </div>
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
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">College Board - GPA & Class Rank</h3>
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
              href="https://apstudents.collegeboard.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">AP Students - College Board</h3>
                <p className="text-sm text-gray-600">Official AP course information and exam resources</p>
              </div>
            </a>

            <a
              href="https://www.ibo.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 hover:shadow-md transition-all group"
            >
              <svg className="w-6 h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">International Baccalaureate (IB)</h3>
                <p className="text-sm text-gray-600">Official IB program information and diploma requirements</p>
              </div>
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <div className="bg-gray-100 rounded-lg p-4 mb-8 text-center border border-gray-300">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Last Updated:</span> November 29, 2025 | 
            <span className="ml-2">Verified calculation accuracy for 2025-2026 academic year</span>
          </p>
        </div>

        {/* Grading Scale Section */}
        <section id="grading-scale" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weighted GPA Grading Scale</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
              <thead className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Letter Grade</th>
                  <th className="px-6 py-3 text-center font-semibold">Regular</th>
                  <th className="px-6 py-3 text-center font-semibold">Honors (+0.5)</th>
                  <th className="px-6 py-3 text-center font-semibold">AP/IB (+1.0)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { grade: 'A+', regular: '4.0', honors: '4.5', ap: '5.0' },
                  { grade: 'A', regular: '4.0', honors: '4.5', ap: '5.0' },
                  { grade: 'A-', regular: '3.7', honors: '4.2', ap: '4.7' },
                  { grade: 'B+', regular: '3.3', honors: '3.8', ap: '4.3' },
                  { grade: 'B', regular: '3.0', honors: '3.5', ap: '4.0' },
                  { grade: 'B-', regular: '2.7', honors: '3.2', ap: '3.7' },
                  { grade: 'C+', regular: '2.3', honors: '2.8', ap: '3.3' },
                  { grade: 'C', regular: '2.0', honors: '2.5', ap: '3.0' },
                  { grade: 'C-', regular: '1.7', honors: '2.2', ap: '2.7' },
                  { grade: 'D+', regular: '1.3', honors: '1.8', ap: '2.3' },
                  { grade: 'D', regular: '1.0', honors: '1.5', ap: '2.0' },
                  { grade: 'D-', regular: '0.7', honors: '1.2', ap: '1.7' },
                  { grade: 'F', regular: '0.0', honors: '0.0', ap: '0.0' },
                ].map((row) => (
                  <tr key={row.grade} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">{row.grade}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.regular}</td>
                    <td className="px-6 py-4 text-center text-purple-700 font-semibold">{row.honors}</td>
                    <td className="px-6 py-4 text-center text-blue-700 font-bold">{row.ap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg">
            <p className="text-gray-800 leading-relaxed">
              <strong>⚠️ Important:</strong> Weighted GPA caps at 5.0. Even if calculated points exceed 5.0 for a course (like an A+ in AP), the maximum weighted grade point is 5.0.
            </p>
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weighted GPA Calculation Examples</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 1: All Regular Courses</h3>
              <div className="space-y-2 text-gray-800">
                <p className="font-medium">Student takes 4 regular courses (4 credits):</p>
                <ul className="ml-6 space-y-1 text-sm">
                  <li>• English 10: A (1 credit) = 4.0 points</li>
                  <li>• Algebra II: B+ (1 credit) = 3.3 points</li>
                  <li>• Biology: A- (1 credit) = 3.7 points</li>
                  <li>• US History: B (1 credit) = 3.0 points</li>
                </ul>
                <div className="mt-4 pt-4 border-t-2 border-blue-300">
                  <p className="font-bold text-lg">Weighted GPA: 14.0 ÷ 4 = <span className="text-blue-600 text-xl">3.50</span></p>
                  <p className="text-xs text-gray-600 mt-1">No bonus points since all are regular courses</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 2: Mixed Course Types</h3>
              <div className="space-y-2 text-gray-800">
                <p className="font-medium">Student takes mix of Regular, Honors, AP (4 credits):</p>
                <ul className="ml-6 space-y-1 text-sm">
                  <li>• AP Calculus: A (1 credit) = 5.0 points <span className="text-blue-600 font-bold">(+1.0)</span></li>
                  <li>• Honors English: A- (1 credit) = 4.2 points <span className="text-purple-600 font-bold">(+0.5)</span></li>
                  <li>• AP US History: B+ (1 credit) = 4.3 points <span className="text-blue-600 font-bold">(+1.0)</span></li>
                  <li>• Regular PE: A (1 credit) = 4.0 points</li>
                </ul>
                <div className="mt-4 pt-4 border-t-2 border-purple-300">
                  <p className="font-bold text-lg">Weighted GPA: 17.5 ÷ 4 = <span className="text-purple-600 text-xl">4.38</span></p>
                  <p className="text-xs text-gray-600 mt-1">Weighted GPA exceeds 4.0 due to AP/Honors bonus</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 3: All AP Courses</h3>
              <div className="space-y-2 text-gray-800">
                <p className="font-medium">Student takes 5 AP courses (5 credits):</p>
                <ul className="ml-6 space-y-1 text-sm">
                  <li>• AP Calculus BC: A (1 credit) = 5.0 points</li>
                  <li>• AP Chemistry: A (1 credit) = 5.0 points</li>
                  <li>• AP English Lit: A- (1 credit) = 4.7 points</li>
                  <li>• AP US History: A (1 credit) = 5.0 points</li>
                  <li>• AP Spanish: B+ (1 credit) = 4.3 points</li>
                </ul>
                <div className="mt-4 pt-4 border-t-2 border-green-300">
                  <p className="font-bold text-lg">Weighted GPA: 24.0 ÷ 5 = <span className="text-green-600 text-xl">4.80</span></p>
                  <p className="text-xs text-gray-600 mt-1">High weighted GPA from all AP courses with strong grades</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example 4: Weighted vs Unweighted</h3>
              <div className="space-y-2 text-gray-800">
                <p className="font-medium">Same courses showing both GPAs:</p>
                <ul className="ml-6 space-y-1 text-sm">
                  <li>• AP Biology: B+ (1 credit)</li>
                  <li>• Honors English: A (1 credit)</li>
                  <li>• Regular Math: A (1 credit)</li>
                  <li>• AP History: B (1 credit)</li>
                </ul>
                <div className="mt-4 pt-4 border-t-2 border-orange-300">
                  <p className="font-semibold">Unweighted: <span className="text-gray-700">3.58</span> / 4.0</p>
                  <p className="font-semibold">Weighted: <span className="text-orange-600 text-xl">4.13</span> / 5.0</p>
                  <p className="text-xs text-gray-600 mt-1">+0.55 GPA boost from AP/Honors courses</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What is weighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Weighted GPA is a grade point average that gives extra points for advanced courses like AP, Honors, and IB. It uses a 5.0 scale instead of the standard 4.0 scale, with AP/IB courses adding +1.0 and Honors adding +0.5 to the base grade value.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How much do AP courses add to your GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                AP courses typically add 1.0 point to your GPA. For example, an A in an AP class equals 5.0 instead of 4.0 on a weighted scale. This extra point recognizes the increased difficulty of Advanced Placement coursework.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How do you calculate weighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                To calculate weighted GPA: 1) Assign grade points (A=4.0, B=3.0, etc.), 2) Add bonus points based on course type (AP/IB: +1.0, Honors: +0.5), 3) Multiply each weighted grade by credit hours, 4) Sum all quality points, 5) Divide by total credit hours.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What's the difference between weighted and unweighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Unweighted GPA uses a standard 4.0 scale where all A's equal 4.0 regardless of course difficulty. Weighted GPA uses a 5.0 scale that adds bonus points for advanced courses (AP, Honors, IB), allowing GPAs above 4.0.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do colleges look at weighted or unweighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Colleges look at both, but many recalculate GPA using their own formulas. Weighted GPA shows course rigor, while unweighted GPA provides a standard comparison. Most competitive colleges consider weighted GPA to evaluate students taking challenging courses.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can your weighted GPA be higher than 4.0?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes! Weighted GPA can go up to 5.0 (or sometimes higher depending on the school's scale). Students taking all AP courses and earning A's can achieve a weighted GPA between 4.5-5.0, which is common among students applying to competitive colleges.
              </p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do all schools use the same weighted GPA scale?</h3>
              <p className="text-gray-700 leading-relaxed">
                No, weighting systems vary by school. Some schools add 1.0 for AP, others add 0.5. Some cap weighted GPA at 5.0, others allow higher. Always check your school's specific policy in the student handbook or ask your guidance counselor.
              </p>
            </div>

            <div className="border-l-4 border-rose-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Does weighted GPA matter for college admissions?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, weighted GPA matters because it demonstrates course rigor. Competitive colleges want to see students challenging themselves with advanced courses. However, many colleges recalculate GPA using their own formula, so both weighted and unweighted GPAs are important.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-6 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How do California State Universities calculate weighted GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                CSU uses a unique weighted GPA calculation with specific rules: only A-G approved courses from grades 10-12 count, honors weighting is capped at 8 semesters (maximum 2 from 10th grade), and all grades are capped at 4.0. For accurate CSU admissions GPA, use our specialized <a href="/education-and-exam-tools/gpa-tools/csu-gpa-calculator" className="text-blue-600 hover:text-blue-800 font-semibold underline" onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools/gpa-tools/csu-gpa-calculator'); }}>CSU GPA Calculator</a> which automatically enforces these Cal State-specific requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools
          relatedSlugs={['high-school-gpa-calculator', 'college-gpa-calculator', 'semester-gpa-calculator', 'csu-gpa-calculator']}
          currentSlug="weighted-gpa-calculator"
          navigateTo={navigateTo}
        />
      </div>
    </div>
  );
};

export default WeightedGPACalculator;
