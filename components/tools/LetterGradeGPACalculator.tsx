import React, { useState, useEffect, useCallback, useRef } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface LetterGradeGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const LetterGradeGPACalculator: React.FC<LetterGradeGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '-', credits: 3 },
    { id: 2, name: '', grade: '-', credits: 3 },
    { id: 3, name: '', grade: '-', credits: 3 },
    { id: 4, name: '', grade: '-', credits: 3 },
  ]);
  const [gpa, setGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  // Grade points map (standard 4.0 scale with letter grades)
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
    setCourses([...courses, { id: newId, name: '', grade: '-', credits: 3 }]);
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

  // Calculate GPA
  const calculateGPA = useCallback(() => {
    const validCourses = courses.filter(c => c.grade !== '-' && c.credits > 0);
    
    if (validCourses.length === 0) {
      setGPA(null);
      setTotalCredits(0);
      return;
    }

    const totalPoints = validCourses.reduce((sum, course) => {
      const gradePoint = gradePoints.get(course.grade) ?? 0;
      return sum + (gradePoint * course.credits);
    }, 0);

    const credits = validCourses.reduce((sum, c) => sum + c.credits, 0);
    setTotalCredits(credits);

    if (credits > 0) {
      setGPA(parseFloat((totalPoints / credits).toFixed(2)));
    }
  }, [courses]);

  // Reset
  const resetAll = () => {
    setCourses([
      { id: 1, name: '', grade: '-', credits: 3 },
      { id: 2, name: '', grade: '-', credits: 3 },
      { id: 3, name: '', grade: '-', credits: 3 },
      { id: 4, name: '', grade: '-', credits: 3 },
    ]);
    setGPA(null);
    setTotalCredits(0);
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
          <title>GPA Report - Letter Grades</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .gpa-display { font-size: 24px; font-weight: bold; color: #8b5cf6; text-align: center; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .result { background-color: #ede9fe; padding: 20px; border-radius: 8px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>GPA Report - Letter Grades</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Letter Grade</th>
                <th>Credits</th>
                <th>Grade Points</th>
              </tr>
            </thead>
            <tbody>
              ${validCourses.map(course => {
                const sanitizedName = (course.name || 'Unnamed Course').replace(/</g, "&lt;").replace(/>/g, "&gt;");
                const gradePoint = gradePoints.get(course.grade) ?? 0;
                const qualityPoints = gradePoint * course.credits;
                return `
                <tr>
                  <td>${sanitizedName}</td>
                  <td>${course.grade}</td>
                  <td>${course.credits}</td>
                  <td>${qualityPoints.toFixed(2)}</td>
                </tr>
              `}).join('')}
            </tbody>
          </table>

          <div class="result">
            <h2>Results</h2>
            ${gpa !== null ? `
              <div class="gpa-display">GPA: ${gpa.toFixed(2)} / 4.0</div>
              <p style="text-align: center;"><strong>Total Credits:</strong> ${totalCredits}</p>
            ` : ''}
          </div>

          <p style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            Generated by ZuraWebTools - GPA Calculator with Letter Grades
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

    let textContent = `GPA Calculator with Letter Grades Report\n`;
    textContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    textContent += `=== Courses ===\n`;
    validCourses.forEach(course => {
      const gradePoint = gradePoints.get(course.grade) ?? 0;
      const qualityPoints = gradePoint * course.credits;
      textContent += `- ${course.name || 'Unnamed Course'}: Grade ${course.grade} (${course.credits} credits, ${qualityPoints.toFixed(2)} grade points)\n`;
    });
    textContent += `\n`;

    textContent += `=== Results ===\n`;
    if (gpa !== null) {
      textContent += `GPA: ${gpa.toFixed(2)} / 4.0\n`;
      textContent += `Total Credits: ${totalCredits}\n`;
    }

    textContent += `\n---\nGenerated by ZuraWebTools - GPA Calculator with Letter Grades\n`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Letter_Grade_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // SEO setup with useRef guard
  const seoInitialized = useRef(false);

  useEffect(() => {
    if (seoInitialized.current) return;
    seoInitialized.current = true;

    document.title = "GPA Calculator with Letter Grades - Convert Grades to GPA Free";

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

    setMeta('description', 'Free letter grade GPA calculator. Convert A, B, C letter grades to GPA on 4.0 scale instantly. Calculate college GPA with A+, A-, B+ grades online.');
    setMeta('keywords', 'letter grade GPA calculator, convert letter grades to GPA, grade to GPA converter, A B C grade calculator, letter grade calculator, GPA from letter grades, grade point calculator, 4.0 scale GPA calculator, college letter grade GPA, high school grade calculator');

    // Open Graph tags
    setMeta('og:title', 'GPA Calculator with Letter Grades - Convert Grades to GPA | Free', true);
    setMeta('og:description', 'Convert letter grades (A+, A, A-, B+, B, etc.) to GPA on 4.0 scale. Free online letter grade GPA calculator for college and high school students.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/letter-grade-gpa-calculator', true);
    setMeta('og:image', 'https://zurawebtools.com/og-letter-grade-gpa-calculator.png', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'GPA Calculator with Letter Grades - Convert Grades to GPA');
    setMeta('twitter:description', 'Convert letter grades to GPA on 4.0 scale instantly. Free calculator for students.');
    setMeta('twitter:image', 'https://zurawebtools.com/og-letter-grade-gpa-calculator.png');

    // Canonical link
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/letter-grade-gpa-calculator';

    // JSON-LD structured data
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'GPA Calculator with Letter Grades',
          'description': 'Free online calculator to convert letter grades (A, B, C) to GPA on standard 4.0 scale for college and high school students.',
          'url': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/letter-grade-gpa-calculator',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'Any',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'featureList': [
            'Convert letter grades to GPA',
            'Support for A+, A, A-, B+, B grades',
            'Standard 4.0 GPA scale',
            'Credit hours calculation',
            'Print GPA reports',
            'Download results',
            'Mobile-friendly interface'
          ]
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://zurawebtools.com'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Education & Exam Tools',
              'item': 'https://zurawebtools.com/education-and-exam-tools'
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': 'GPA Tools',
              'item': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools'
            },
            {
              '@type': 'ListItem',
              'position': 4,
              'name': 'GPA Calculator with Letter Grades',
              'item': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/letter-grade-gpa-calculator'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How do I convert letter grades to GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'To convert letter grades to GPA: Enter your course letter grades (A+, A, A-, B+, B, etc.) and credit hours. The calculator converts each letter grade to grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) and calculates your GPA by dividing total grade points by total credits.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is the letter grade to GPA conversion scale?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Standard letter grade to GPA conversion: A+ and A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0 on the 4.0 scale.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I calculate GPA with plus and minus grades?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, our calculator supports all plus and minus letter grades including A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, and F. Each grade has a specific point value on the 4.0 scale for accurate GPA calculation.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is this letter grade calculator free to use?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, our letter grade GPA calculator is completely free with no registration required. Calculate your GPA from letter grades instantly with unlimited uses for college, high school, or graduate courses.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is a good GPA from letter grades?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'A GPA of 3.0 (B average) or higher is generally considered good. A 3.5+ GPA (A- average) is excellent for scholarships and competitive programs. A 4.0 GPA means straight A grades in all courses.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How accurate is the letter grade to GPA calculator?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Our calculator uses the standard 4.0 GPA scale with precise grade point conversions for all letter grades. Results are accurate for most US colleges and universities. Some schools may use slightly different scales, so verify with your institution.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I use this for college and high school GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, this letter grade GPA calculator works for both college and high school students. It uses the standard unweighted 4.0 scale. For weighted GPA with AP/Honors courses, use our weighted GPA calculator instead.'
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    // Notify search engines
    notifyIndexNow('/education-and-exam-tools/gpa-tools/letter-grade-gpa-calculator');

    return () => {
      const metas = document.querySelectorAll('meta[name^="description"], meta[name^="keywords"], meta[property^="og:"], meta[name^="twitter:"]');
      metas.forEach(meta => meta.remove());
      if (canonical) canonical.remove();
      if (script) script.remove();
    };
  }, []);

  // Table of Contents sections
  const tocSections: TOCSection[] = [
    { id: 'calculator', title: 'GPA Calculator', emoji: '🎓', subtitle: 'Convert letter grades', gradientFrom: '#8b5cf6', gradientTo: '#ec4899', hoverBorder: 'border-purple-500', hoverText: 'text-purple-600' },
    { id: 'examples', title: 'Quick Examples', emoji: '⚡', subtitle: 'Sample calculations', gradientFrom: '#3b82f6', gradientTo: '#06b6d4', hoverBorder: 'border-blue-500', hoverText: 'text-blue-600' },
    { id: 'benefits', title: 'Benefits', emoji: '✨', subtitle: 'Why use this tool', gradientFrom: '#10b981', gradientTo: '#3b82f6', hoverBorder: 'border-green-500', hoverText: 'text-green-600' },
    { id: 'how-to-use', title: 'How to Use', emoji: '📖', subtitle: 'Step-by-step guide', gradientFrom: '#f59e0b', gradientTo: '#ef4444', hoverBorder: 'border-orange-500', hoverText: 'text-orange-600' },
    { id: 'use-cases', title: 'Use Cases', emoji: '🎯', subtitle: 'Who uses this', gradientFrom: '#06b6d4', gradientTo: '#8b5cf6', hoverBorder: 'border-cyan-500', hoverText: 'text-cyan-600' },
    { id: 'about', title: 'About', emoji: '📚', subtitle: 'Understanding letter grades', gradientFrom: '#ec4899', gradientTo: '#f59e0b', hoverBorder: 'border-pink-500', hoverText: 'text-pink-600' },
    { id: 'faq', title: 'FAQs', emoji: '❓', subtitle: 'Common questions', gradientFrom: '#ef4444', gradientTo: '#10b981', hoverBorder: 'border-red-500', hoverText: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
            GPA Calculator with Letter Grades
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Convert your letter grades to GPA instantly with our free online calculator. Enter A, B, C grades 
            with credit hours and calculate your GPA on the standard 4.0 scale. Perfect for college and high 
            school students tracking academic performance.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div id="calculator" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="text-3xl">🎓</span>
            Calculate Your GPA from Letter Grades
          </h2>

          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Course Name
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white text-gray-900"
                    placeholder="e.g., English Literature"
                    aria-label={`Course ${index + 1} name`}
                  />
                </div>

                <div className="w-full md:w-40">
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Letter Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white text-gray-900"
                    aria-label={`Course ${index + 1} grade`}
                  >
                    <option value="-">Select Grade</option>
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
                    <option value="D-">D- (0.7)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>

                <div className="w-full md:w-32">
                  <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Credits
                  </label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white text-gray-900"
                    aria-label={`Course ${index + 1} credits`}
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                    aria-label={`Remove course ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={addCourse}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all font-medium"
            >
              + Add Course
            </button>
            <button
              onClick={calculateGPA}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all font-medium shadow-md"
            >
              Calculate GPA
            </button>
            <button
              onClick={resetAll}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-all font-medium"
            >
              Reset
            </button>
          </div>

          {gpa !== null && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white">
              <div className="text-center">
                <p className="text-lg font-medium mb-2">Your GPA</p>
                <p className="text-5xl font-bold mb-2">{gpa.toFixed(2)}</p>
                <p className="text-xl">out of 4.0</p>
                <div className="mt-4 pt-4 border-t border-white/30">
                  <p className="text-lg">
                    <span className="font-semibold">Total Credits:</span> {totalCredits}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  🖨️ Print Report
                </button>
                <button
                  onClick={handleDownload}
                  className="px-5 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  📥 Download TXT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <div className="mb-8">
          <TableOfContents sections={tocSections} />
        </div>

        {/* Social Share Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Share This Tool
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Convert letter grades to GPA with this free calculator!&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] focus:ring-2 focus:ring-[#1DA1F2] focus:ring-offset-2 transition-all font-medium"
              aria-label="Share on Twitter (opens in new tab)"
            >
              🐦 Share on Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] focus:ring-2 focus:ring-[#4267B2] focus:ring-offset-2 transition-all font-medium"
              aria-label="Share on Facebook (opens in new tab)"
            >
              📘 Share on Facebook
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-6 py-3 bg-[#0077b5] text-white rounded-lg hover:bg-[#006399] focus:ring-2 focus:ring-[#0077b5] focus:ring-offset-2 transition-all font-medium"
              aria-label="Share on LinkedIn (opens in new tab)"
            >
              💼 Share on LinkedIn
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-all font-medium"
              aria-label="Copy link to clipboard"
            >
              🔗 Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="examples" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ⚡ Quick Examples
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">3.70</div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">A- Average Student</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Math: A- (3 credits)<br/>
                English: A (3 credits)<br/>
                Science: A- (4 credits)<br/>
                = 3.70 GPA
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3.00</div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">B Average Student</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                History: B+ (3 credits)<br/>
                Biology: B (3 credits)<br/>
                Chemistry: B- (3 credits)<br/>
                = 3.00 GPA
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">4.00</div>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Straight A Student</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                All courses: A or A+<br/>
                Total: 15 credits<br/>
                Perfect GPA<br/>
                = 4.00 GPA
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div id="benefits" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ✨ Benefits of Using This Calculator
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Easy Letter Grade Input</h3>
              <p>Simply select your letter grades (A+, A, A-, B+, B, etc.) from dropdowns. No manual conversion needed - the calculator automatically converts to GPA points.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Standard 4.0 Scale</h3>
              <p>Uses the widely-accepted 4.0 GPA scale recognized by most US colleges and universities. Get accurate GPA calculations that match your transcript.</p>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-teal-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-2">Track Academic Performance</h3>
              <p>Monitor your semester GPA by entering all course grades and credits. Identify trends, set improvement goals, and stay on top of your academic progress.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-red-400 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
              <p>Calculate GPA from letter grades on any device. Our responsive design works perfectly on smartphones, tablets, and desktop computers for on-the-go calculations.</p>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            📖 How to Use the GPA Calculator with Letter Grades
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Enter Course Names</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Type the name of each course you want to include in your GPA calculation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Select Letter Grades</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Choose the letter grade you received from the dropdown menu for each course.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Input Credit Hours</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Enter the number of credit hours for each course (typically 1-5 credits).
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Calculate GPA</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Click "Calculate GPA" to see your result and download or print your report.
              </p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📐 Calculation Example</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="font-semibold">Example: Calculate GPA for 4 courses</p>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2 font-mono text-sm">
                <p>English (A): 4.0 × 3 credits = 12.0 grade points</p>
                <p>Math (B+): 3.3 × 4 credits = 13.2 grade points</p>
                <p>Science (A-): 3.7 × 3 credits = 11.1 grade points</p>
                <p>History (B): 3.0 × 3 credits = 9.0 grade points</p>
                <p className="border-t border-gray-300 dark:border-gray-600 pt-2">Total: 45.3 grade points ÷ 13 credits</p>
                <p className="text-purple-600 dark:text-purple-400 font-bold text-lg">GPA = 3.48</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div id="use-cases" className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🎯 Who Uses This Calculator?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">🎓</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">College Students</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Calculate semester GPA by entering course letter grades and credit hours. Essential for tracking 
                academic standing, scholarship eligibility, and maintaining good academic progress for graduation.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">📚</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">High School Students</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Convert report card letter grades to GPA for college applications. Quickly see how As, Bs, and Cs 
                translate to your overall GPA on the standard 4.0 scale required by universities.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">👨‍🎓</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Graduate Students</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor graduate program GPA requirements by converting letter grades to numerical GPA. Many programs 
                require maintaining a minimum 3.0 GPA for continued enrollment and degree completion.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">👨‍🏫</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Parents & Teachers</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Help students understand how letter grades impact GPA. Use this calculator to demonstrate grade 
                expectations, set academic goals, and show the relationship between grades and GPA scores.
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            📚 Understanding Letter Grade to GPA Conversion
          </h2>
          
          <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A <strong>letter grade GPA calculator</strong> is an essential educational tool that converts traditional 
              letter grades (A, B, C, D, F) into numerical grade point average on the standard 4.0 scale. This conversion 
              is fundamental for students tracking academic performance, applying to colleges, qualifying for scholarships, 
              and meeting program requirements across American educational institutions.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              What is Letter Grade to GPA Conversion?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Letter grade conversion assigns numerical values to alphabetical grades: <strong>A = 4.0</strong>, 
              <strong> B = 3.0</strong>, <strong>C = 2.0</strong>, <strong>D = 1.0</strong>, and <strong>F = 0.0</strong>. 
              Most schools also use plus/minus modifiers, where <strong>A- = 3.7</strong>, <strong>B+ = 3.3</strong>, 
              <strong>B- = 2.7</strong>, and so on. Our <a href="/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">college GPA calculator</a> supports 
              all standard letter grade variations for accurate academic calculations.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              How Letter Grades Convert to Grade Points
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The <strong>grade point scale</strong> uses these standard conversions: A+ and A earn 4.0 points, 
              A- earns 3.7, B+ earns 3.3, B earns 3.0, B- earns 2.7, C+ earns 2.3, C earns 2.0, C- earns 1.7, 
              D+ earns 1.3, D earns 1.0, D- earns 0.7, and F earns 0.0 points. To calculate GPA, multiply each 
              grade's point value by its credit hours, sum all grade points, then divide by total credits. This 
              <strong> weighted average method</strong> ensures courses with more credit hours have proportionally 
              greater impact on your final GPA calculation.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Why Use a Letter Grade GPA Calculator?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Manual GPA calculations from letter grades are time-consuming and error-prone, especially with 
              multiple courses using plus/minus grading. Our <strong>free GPA calculator</strong> eliminates 
              calculation mistakes, saves valuable time, and provides instant accurate results. Students use it 
              for <strong>semester GPA tracking</strong>, <a href="/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">cumulative GPA monitoring</a>, 
              scholarship applications requiring minimum GPA thresholds, and strategic planning to reach target 
              GPAs for graduation honors or graduate school admission.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Letter Grade Systems in American Education
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The <strong>alphabetical grading system</strong> has been standard in US schools since the late 1800s, 
              providing intuitive performance feedback through familiar letters. Most high schools and colleges use 
              the A-F letter scale with plus/minus modifiers for gradation. Some institutions assign slightly different 
              point values to letter grades, but the 4.0 scale remains most common. Understanding your school's specific 
              <strong> grading policy</strong> ensures accurate GPA calculations matching official transcripts and academic records.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 mt-8 border-l-4 border-purple-500">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Letter Grade Standards</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <p className="font-semibold mb-1">🎓 Standard Scale:</p>
                  <p>A (4.0), B (3.0), C (2.0), D (1.0), F (0.0)</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">📊 Plus/Minus System:</p>
                  <p>A- (3.7), B+ (3.3), B- (2.7), C+ (2.3)</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                <strong>Note:</strong> Some schools don't award A+ grades or may use different point values. 
                Always verify your institution's specific grading scale for official GPA calculations.
              </p>
            </div>
          </div>
        </div>

        {/* External Links Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🔗 External Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://www.collegeboard.org/admission-and-aid/understanding-gpa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">📖</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">College Board - Understanding GPA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Official guide to GPA systems</div>
              </div>
            </a>

            <a
              href="https://www.usnews.com/education/best-colleges/articles/what-is-a-good-college-gpa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">US News - Good College GPA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">GPA benchmarks and standards</div>
              </div>
            </a>

            <a
              href="https://www.princetonreview.com/college-advice/gpa-scale"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">🎓</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Princeton Review - GPA Scale</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Understanding GPA calculations</div>
              </div>
            </a>

            <a
              href="https://www.nacac.org/knowledge-center/college-planning-resources/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-2xl">📚</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">NACAC College Planning</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Academic planning resources</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          Last Updated: November 29, 2025
        </div>

        {/* FAQ Section */}
        <div id="faq" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ❓ Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                How do I convert letter grades to GPA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To convert letter grades to GPA: Enter your course letter grades (A+, A, A-, B+, B, etc.) and credit 
                hours. The calculator converts each letter grade to grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) 
                and calculates your GPA by dividing total grade points by total credits.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                What is the letter grade to GPA conversion scale?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Standard letter grade to GPA conversion: A+ and A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, 
                C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, F = 0.0 on the 4.0 scale.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Can I calculate GPA with plus and minus grades?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, our calculator supports all plus and minus letter grades including A+, A, A-, B+, B, B-, C+, C, C-, 
                D+, D, D-, and F. Each grade has a specific point value on the 4.0 scale for accurate GPA calculation.
              </p>
            </div>

            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Is this letter grade calculator free to use?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, our letter grade GPA calculator is completely free with no registration required. Calculate your GPA 
                from letter grades instantly with unlimited uses for college, high school, or graduate courses.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                What is a good GPA from letter grades?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                A GPA of 3.0 (B average) or higher is generally considered good. A 3.5+ GPA (A- average) is excellent 
                for scholarships and competitive programs. A 4.0 GPA means straight A grades in all courses.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                How accurate is the letter grade to GPA calculator?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our calculator uses the standard 4.0 GPA scale with precise grade point conversions for all letter grades. 
                Results are accurate for most US colleges and universities. Some schools may use slightly different scales, 
                so verify with your institution.
              </p>
            </div>

            <div className="border-l-4 border-cyan-500 pl-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Can I use this for college and high school GPA?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, this letter grade GPA calculator works for both college and high school students. It uses the standard 
                unweighted 4.0 scale. For weighted GPA with AP/Honors courses, use our weighted GPA calculator instead.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mb-8">
          <RelatedTools 
            relatedSlugs={['college-gpa-calculator', 'unweighted-gpa-calculator', 'weighted-gpa-calculator', 'cumulative-gpa-calculator']} 
            navigateTo={navigateTo} 
            currentSlug="letter-grade-gpa-calculator"
          />
        </div>

      </div>
    </div>
  );
};

export default LetterGradeGPACalculator;
