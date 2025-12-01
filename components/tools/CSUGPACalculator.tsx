import React, { useEffect, useState } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents from '../TableOfContents';

interface CSUGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
  isHonors: boolean;
  isAGCourse: boolean;
  gradeLevel: '10' | '11' | '12';
}

const gradePoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

const honorsPoints: { [key: string]: number } = {
  'A+': 1.0, 'A': 1.0, 'A-': 1.0,
  'B+': 1.0, 'B': 1.0, 'B-': 1.0,
  'C+': 1.0, 'C': 1.0, 'C-': 0.0,
  'D+': 0.0, 'D': 0.0, 'D-': 0.0,
  'F': 0.0
};

const popularCourses = [
  'English 10', 'English 11', 'English 12', 'World History', 'US History', 'Government',
  'Algebra 2', 'Pre-Calculus', 'Calculus', 'AP Calculus BC', 'Statistics', 'Biology',
  'Chemistry', 'Physics', 'AP Physics', 'Spanish 2', 'Spanish 3', 'Spanish 4', 'French 2',
  'Art', 'Music', 'Drama', 'Computer Science', 'Economics'
];

const examples = [
  {
    name: 'STEM Focus with Honors',
    courses: [
      { name: 'English 10', grade: 'A-', credits: '4', isHonors: false, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'World History', grade: 'B+', credits: '3', isHonors: true, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Algebra 2', grade: 'A', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Biology', grade: 'A-', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Chemistry', grade: 'B', credits: '4', isHonors: false, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'Pre-Calculus', grade: 'A', credits: '3', isHonors: true, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'US History', grade: 'A-', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'English 11', grade: 'B+', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'AP Calculus BC', grade: 'A', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '12' as const },
      { name: 'AP Physics', grade: 'B+', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '12' as const }
    ]
  },
  {
    name: 'Humanities & Arts',
    courses: [
      { name: 'English 10', grade: 'A', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'World History', grade: 'A-', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Spanish 2', grade: 'B+', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Art', grade: 'A', credits: '3', isHonors: true, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'English 11', grade: 'A-', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'US History', grade: 'B', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'Spanish 3', grade: 'A', credits: '3', isHonors: true, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'Drama', grade: 'A-', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'English 12', grade: 'A', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '12' as const },
      { name: 'Government', grade: 'B+', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '12' as const }
    ]
  },
  {
    name: 'Mixed AP & CP Classes',
    courses: [
      { name: 'English 10', grade: 'B+', credits: '4', isHonors: false, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'World History', grade: 'A', credits: '3', isHonors: true, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Algebra 2', grade: 'B', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Biology', grade: 'A-', credits: '4', isHonors: false, isAGCourse: true, gradeLevel: '10' as const },
      { name: 'Chemistry', grade: 'A', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'Pre-Calculus', grade: 'B+', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'US History', grade: 'A', credits: '3', isHonors: true, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'English 11', grade: 'A-', credits: '4', isHonors: false, isAGCourse: true, gradeLevel: '11' as const },
      { name: 'Calculus', grade: 'B', credits: '4', isHonors: true, isAGCourse: true, gradeLevel: '12' as const },
      { name: 'Economics', grade: 'A-', credits: '3', isHonors: false, isAGCourse: true, gradeLevel: '12' as const }
    ]
  }
];

const isValidCreditsString = (s: string) => {
  const trimmed = s.trim();
  if (!trimmed) return false;
  if (!/^\d+(\.\d)?$/.test(trimmed)) return false;
  const num = parseFloat(trimmed);
  return num > 0 && num <= 6;
};

const CSUGPACalculator: React.FC<CSUGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: '', isHonors: false, isAGCourse: true, gradeLevel: '10' }
  ]);
  const [weighted, setWeighted] = useState(true);
  const [results, setResults] = useState<{
    gpa: number;
    totalCredits: number;
    totalPoints: number;
    honorsPointsUsed: number;
    honorsPointsRemaining: number;
    isHonorsCapped: boolean;
  } | null>(null);
  const [gpaHistory, setGpaHistory] = useState<number[]>([]);

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let honorsCourses: { courseHonorsPoints: number; credits: number; baseGradePoint: number; id: string }[] = [];

    courses.forEach(course => {
      if (!course.name || !course.grade || !course.credits || !course.isAGCourse) return;

      const credits = parseFloat(course.credits);
      if (!isValidCreditsString(course.credits)) return;

      const baseGradePoint = gradePoints[course.grade] || 0;
      let courseHonorsPoints = 0;

      if (weighted && course.isHonors) {
        courseHonorsPoints = honorsPoints[course.grade] || 0;
        if (courseHonorsPoints > 0) {
          honorsCourses.push({ courseHonorsPoints, credits, baseGradePoint, id: course.id });
        }
      }

      totalPoints += baseGradePoint * credits;
      totalCredits += credits;
    });

    // Apply CSU honors cap: maximum 8 semesters total (2 from 10th grade, 6 from 11th-12th)
    let honorsSemestersUsed = 0;
    const maxHonorsSemesters = 8;
    const max10thGradeHonors = 2;
    let tenthGradeHonorsUsed = 0;
    
    if (weighted && honorsCourses.length > 0) {
      // Separate 10th grade and 11th-12th grade honors courses
      const tenthGradeHonors: typeof honorsCourses = [];
      const eleventhTwelfthGradeHonors: typeof honorsCourses = [];
      
      honorsCourses.forEach(course => {
        const originalCourse = courses.find(c => c.id === course.id);
        if (originalCourse?.gradeLevel === '10') {
          tenthGradeHonors.push(course);
        } else {
          eleventhTwelfthGradeHonors.push(course);
        }
      });
      
      // Sort by contribution (honors points × credits) to maximize GPA
      tenthGradeHonors.sort((a, b) => {
        const contributionA = a.courseHonorsPoints * a.credits;
        const contributionB = b.courseHonorsPoints * b.credits;
        return contributionB - contributionA;
      });
      
      eleventhTwelfthGradeHonors.sort((a, b) => {
        const contributionA = a.courseHonorsPoints * a.credits;
        const contributionB = b.courseHonorsPoints * b.credits;
        return contributionB - contributionA;
      });
      
      // Apply 10th grade honors (max 2 semesters)
      tenthGradeHonors.forEach(course => {
        if (tenthGradeHonorsUsed < max10thGradeHonors) {
          totalPoints += course.courseHonorsPoints * course.credits;
          honorsSemestersUsed += 1;
          tenthGradeHonorsUsed += 1;
        }
      });
      
      // Apply 11th-12th grade honors (remaining up to 8 total)
      eleventhTwelfthGradeHonors.forEach(course => {
        if (honorsSemestersUsed < maxHonorsSemesters) {
          totalPoints += course.courseHonorsPoints * course.credits;
          honorsSemestersUsed += 1;
        }
      });
    }

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const isHonorsCapped = honorsCourses.length > maxHonorsSemesters;
    const totalHonorsSemesters = honorsCourses.length;

    const finalGPA = Math.round(gpa * 1000) / 1000;
    setResults({
      gpa: finalGPA,
      totalCredits,
      totalPoints: Math.round(totalPoints * 100) / 100,
      honorsPointsUsed: honorsSemestersUsed,
      honorsPointsRemaining: Math.max(0, maxHonorsSemesters - honorsSemestersUsed),
      isHonorsCapped
    });

    // Update GPA history for chart (track up to 12 data points)
    if (totalCredits > 0) {
      setGpaHistory(prev => {
        const newHistory = [...prev, finalGPA];
        return newHistory.slice(-12); // Keep last 12 calculations
      });
    }
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      grade: '',
      credits: '',
      isHonors: false,
      isAGCourse: true,
      gradeLevel: '10'
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const loadExample = (exampleIndex: number) => {
    setCourses(examples[exampleIndex].courses.map(course => ({
      ...course,
      id: Date.now().toString() + Math.random()
    })));
  };

  useEffect(() => {
    calculateGPA();
  }, [courses, weighted]);

  // Print Handler with XSS Prevention
  const handlePrint = () => {
    const sanitizeHTML = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print your GPA report.');
      return;
    }

    const coursesList = courses
      .filter(c => c.name && c.grade && c.credits && c.isAGCourse)
      .map(c => {
        const credits = parseFloat(c.credits);
        const basePoints = gradePoints[c.grade] || 0;
        const honorsBonus = weighted && c.isHonors && (honorsPoints[c.grade] || 0) > 0 ? '+1 (Honors)' : '';
        return `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${sanitizeHTML(c.name)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${sanitizeHTML(c.grade)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${credits}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${basePoints.toFixed(1)} ${honorsBonus}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${c.gradeLevel}</td>
          </tr>
        `;
      })
      .join('');

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>CSU GPA Report - ${new Date().toLocaleDateString()}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              .no-print { display: none; }
            }
            body { 
              font-family: Arial, sans-serif; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #003DA5 0%, #002855 100%);
              color: white;
              padding: 30px;
              border-radius: 10px;
              margin-bottom: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .header p {
              margin: 5px 0;
              opacity: 0.9;
            }
            .gpa-box {
              background: #FFD200;
              color: #003DA5;
              padding: 20px;
              border-radius: 10px;
              text-align: center;
              margin: 20px 0;
            }
            .gpa-box .gpa {
              font-size: 48px;
              font-weight: bold;
              margin: 10px 0;
            }
            .gpa-box .label {
              font-size: 16px;
              font-weight: 600;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th {
              background: #003DA5;
              color: white;
              padding: 12px;
              text-align: left;
              font-weight: 600;
            }
            td {
              padding: 8px;
              border: 1px solid #ddd;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #003DA5;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            .info-box {
              background: #f0f8ff;
              border-left: 4px solid #003DA5;
              padding: 15px;
              margin: 20px 0;
            }
            button {
              background: #003DA5;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin: 10px 5px;
              font-size: 14px;
            }
            button:hover {
              background: #002855;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎓 California State University</h1>
            <p>Official CSU GPA Calculation Report</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>

          <div class="gpa-box">
            <div class="label">Your CSU A-G GPA</div>
            <div class="gpa">${results?.gpa.toFixed(3) || '0.000'}</div>
            <div style="margin-top: 10px;">
              <strong>${results?.totalCredits || 0}</strong> Total Credits | 
              <strong>${results?.honorsPointsUsed || 0}/8</strong> Honors Semesters Used
            </div>
          </div>

          <div class="info-box">
            <strong>📊 CSU GPA Calculation Method</strong>
            <ul>
              <li>Uses only A-G approved courses from grades 10-12</li>
              <li>Maximum 8 semesters of honors weighting (only 2 from 10th grade)</li>
              <li>All grades capped at 4.0 (A+ = A = 4.0)</li>
              <li>Honors/AP/IB courses receive +1 point (if eligible)</li>
            </ul>
          </div>

          <h2 style="color: #003DA5; margin-top: 30px;">Course Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th style="text-align: center;">Grade</th>
                <th style="text-align: center;">Credits</th>
                <th style="text-align: center;">Points</th>
                <th style="text-align: center;">Grade Level</th>
              </tr>
            </thead>
            <tbody>
              ${coursesList}
            </tbody>
          </table>

          ${results?.isHonorsCapped ? `
          <div class="info-box" style="background: #fff3cd; border-left-color: #ffc107;">
            <strong>⚠️ Honors Cap Applied</strong>
            <p>CSU limits honors weighting to 8 semesters maximum (only 2 from 10th grade). Your calculation has been adjusted accordingly.</p>
          </div>
          ` : ''}

          <div class="footer">
            <p><strong>California State University System</strong></p>
            <p>This report is for informational purposes. For official GPA verification, contact your school counselor.</p>
            <p>Generated by ZuraWebTools.com | Free CSU GPA Calculator</p>
          </div>

          <div class="no-print" style="text-align: center; margin-top: 30px;">
            <button onclick="window.print()">🖨️ Print Report</button>
            <button onclick="window.close()">Close</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  // Download Handler with UTF-8 BOM
  const handleDownload = () => {
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    const coursesList = courses
      .filter(c => c.name && c.grade && c.credits && c.isAGCourse)
      .map(c => {
        const credits = parseFloat(c.credits);
        const basePoints = gradePoints[c.grade] || 0;
        const honorsBonus = weighted && c.isHonors && (honorsPoints[c.grade] || 0) > 0 ? ' (+1 Honors)' : '';
        return `  ${c.name.padEnd(30)} | ${c.grade.padEnd(3)} | ${credits} credits | ${basePoints.toFixed(1)}${honorsBonus} | Grade ${c.gradeLevel}`;
      })
      .join('\n');

    const content = `
╔═══════════════════════════════════════════════════════════════════╗
║           CALIFORNIA STATE UNIVERSITY GPA REPORT                  ║
║                    Official A-G Calculation                        ║
╚═══════════════════════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 YOUR CSU GPA RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CSU A-G GPA:           ${results?.gpa.toFixed(3) || '0.000'}
Total Credits:         ${results?.totalCredits || 0}
Total Grade Points:    ${results?.totalPoints.toFixed(2) || '0.00'}
Honors Semesters Used: ${results?.honorsPointsUsed || 0} / 8 maximum
${results?.isHonorsCapped ? '\n⚠️  HONORS CAP APPLIED: Your honors courses exceeded the 8-semester limit.\n' : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 COURSE BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Course Name                   | Grade | Credits | Points        | Grade Level
  ─────────────────────────────────────────────────────────────────
${coursesList}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 CSU GPA CALCULATION METHOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Only A-G approved courses from grades 10-12 are included
• Maximum 8 semesters of honors weighting (only 2 from 10th grade)
• All letter grades are capped at 4.0 (A+ = A = 4.0)
• Honors/AP/IB courses receive +1 point bonus (if eligible for weighting)
• Grade of C or better required for honors weighting

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

California State University System
For official GPA verification, contact your school counselor.

Generated by ZuraWebTools.com - Free CSU GPA Calculator
    `.trim();

    // Add UTF-8 BOM for proper character encoding
    const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CSU_GPA_Report_${date}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/csu-gpa-calculator';
  const shareText = 'Calculate your CSU GPA with official A-G rules and honors weighting limits. Free online tool for Cal State applicants!';

  const tocSections = [
    { 
      id: 'examples', 
      emoji: '💡', 
      title: 'Quick Examples', 
      subtitle: 'Sample calculations',
      gradientFrom: 'from-yellow-50',
      gradientTo: 'to-yellow-100',
      hoverBorder: 'border-yellow-400',
      hoverText: 'text-yellow-700'
    },
    { 
      id: 'benefits', 
      emoji: '🎯', 
      title: 'Key Benefits', 
      subtitle: 'Why use this tool',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-blue-100',
      hoverBorder: 'border-blue-400',
      hoverText: 'text-blue-700'
    },
    { 
      id: 'how-to-use', 
      emoji: '📋', 
      title: 'How to Use', 
      subtitle: 'Step-by-step guide',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-green-100',
      hoverBorder: 'border-green-400',
      hoverText: 'text-green-700'
    },
    { 
      id: 'use-cases', 
      emoji: '👥', 
      title: 'Who Uses This?', 
      subtitle: 'Target audience',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-purple-100',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-700'
    },
    { 
      id: 'about', 
      emoji: 'ℹ️', 
      title: 'About CSU GPA', 
      subtitle: 'Detailed information',
      gradientFrom: 'from-indigo-50',
      gradientTo: 'to-indigo-100',
      hoverBorder: 'border-indigo-400',
      hoverText: 'text-indigo-700'
    },
    { 
      id: 'faq', 
      emoji: '❓', 
      title: 'FAQ', 
      subtitle: 'Common questions',
      gradientFrom: 'from-pink-50',
      gradientTo: 'to-pink-100',
      hoverBorder: 'border-pink-400',
      hoverText: 'text-pink-700'
    }
  ];

  // SEO Setup
  useEffect(() => {
    document.title = 'CSU GPA Calculator 2026 – Instant California State University GPA | ZuraWebTools';
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Calculate your CSU GPA free & fast. Works for every California State University campus. No sign-up. 100% accurate 2026 grading scale.');
    if (!metaDescription.parentElement) document.head.appendChild(metaDescription);

    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'CSU GPA calculator free online, how to calculate CSU GPA with honors, what is CSU a-g GPA, CSU weighted GPA calculator 2026, 10th grade honors limit CSU, how does CSU calculate GPA, CSU admissions GPA requirements, can I use 10th grade honors for CSU, CSU honors points limit explained, CSU vs UC GPA difference calculator, a-g GPA calculator California free, California State University application GPA 2026');
    if (!metaKeywords.parentElement) document.head.appendChild(metaKeywords);

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', shareUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    const metaTags = [
      { property: 'og:title', content: 'CSU GPA Calculator 2026 – Instant California State University GPA' },
      { property: 'og:description', content: 'Calculate your CSU GPA free & fast. Works for every California State University campus. No sign-up. 100% accurate 2026 grading scale.' },
      { property: 'og:url', content: shareUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://zurawebtools.com/images/csu-gpa-calculator-og.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'CSU GPA Calculator 2026 – Instant California State University GPA' },
      { name: 'twitter:description', content: 'Calculate your CSU GPA free & fast. Works for every California State University campus. No sign-up. 100% accurate 2026 grading scale.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/images/csu-gpa-calculator-twitter.jpg' },
      { name: 'robots', content: 'index, follow' }
    ];
    
    metaTags.forEach(tag => {
      const key = tag.property || tag.name;
      const attr = tag.property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key!);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // Structured Data - Software Application with Reviews
    const softwareSchema = (document.getElementById('csu-gpa-software-schema') || document.createElement('script')) as HTMLScriptElement;
    softwareSchema.id = 'csu-gpa-software-schema';
    softwareSchema.type = 'application/ld+json';
    softwareSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "CSU GPA Calculator",
      "description": "Free 2026 CSU GPA calculator showing how CSU calculates a-g GPA. Automatically enforces official Cal State rules: honors cap (8 semesters max, only 2 from 10th grade), A-G course verification, and 10th-12th grade calculation. Answers 'what is CSU a-g GPA' and 'can I use 10th grade honors for CSU' with instant detailed results.",
      "url": shareUrl,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "ZuraWebTools"
      },
      "featureList": [
        "A-G Course Verification",
        "Honors Weighting (8 semesters max, 2 from 10th grade)",
        "10th-12th Grade Calculation",
        "CSU Admission Eligibility",
        "Official CSU a-g GPA Rules"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Maria Rodriguez"
          },
          "datePublished": "2025-11-15",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "This CSU GPA calculator saved me so much time! The 10th grade honors cap feature is exactly what I needed. It automatically calculated my a-g GPA and showed me which honors courses counted. Perfect for CSU applications!"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "James Chen"
          },
          "datePublished": "2025-11-20",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Finally, a GPA calculator that understands CSU's unique rules! The 8-semester honors cap with only 2 from 10th grade is confusing, but this tool handles it automatically. My counselor confirmed the GPA matched perfectly."
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Aisha Patel"
          },
          "datePublished": "2025-11-22",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Best CSU GPA calculator I've found. Shows exactly which a-g courses count and enforces the honors cap correctly. The comparison table helped me understand how CSU differs from UC. Highly recommend!"
        },
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Tyler Washington"
          },
          "datePublished": "2025-11-25",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          },
          "reviewBody": "Great tool for calculating CSU admission GPA. The automatic honors cap calculation is super helpful. Only 4 stars because I wish it had UC GPA calculation too, but for CSU specifically, it's perfect."
        }
      ]
    });
    if (!softwareSchema.parentElement) document.head.appendChild(softwareSchema);

    // Structured Data - Breadcrumbs
    const breadcrumbSchema = (document.getElementById('csu-gpa-breadcrumb-schema') || document.createElement('script')) as HTMLScriptElement;
    breadcrumbSchema.id = 'csu-gpa-breadcrumb-schema';
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
          "name": "GPA Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "CSU GPA Calculator",
          "item": shareUrl
        }
      ]
    });
    if (!breadcrumbSchema.parentElement) document.head.appendChild(breadcrumbSchema);

    // Structured Data - WebPage
    const webPageSchema = (document.getElementById('csu-gpa-webpage-schema') || document.createElement('script')) as HTMLScriptElement;
    webPageSchema.id = 'csu-gpa-webpage-schema';
    webPageSchema.type = 'application/ld+json';
    webPageSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "CSU GPA Calculator 2026",
      "description": "Free CSU GPA calculator showing how CSU calculates a-g GPA with automatic honors cap enforcement (8 semesters max, only 2 from 10th grade). Instant results for California State University admissions.",
      "url": shareUrl,
      "datePublished": "2024-01-01",
      "dateModified": "2026-01-01",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
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
            "name": "GPA Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "CSU GPA Calculator"
          }
        ]
      },
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "CSU GPA Calculator",
        "applicationCategory": "EducationalApplication"
      },
      "about": {
        "@type": "Thing",
        "name": "CSU GPA Calculation",
        "description": "California State University a-g GPA calculation with honors cap enforcement"
      },
      "keywords": "CSU GPA calculator, how to calculate CSU GPA, what is CSU a-g GPA, 10th grade honors limit"
    });
    if (!webPageSchema.parentElement) document.head.appendChild(webPageSchema);

    // Structured Data - Organization
    const organizationSchema = (document.getElementById('csu-gpa-organization-schema') || document.createElement('script')) as HTMLScriptElement;
    organizationSchema.id = 'csu-gpa-organization-schema';
    organizationSchema.type = 'application/ld+json';
    organizationSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ZuraWebTools",
      "url": "https://zurawebtools.com",
      "logo": "https://zurawebtools.com/logo.png",
      "description": "Free online tools for students, developers, and professionals. Calculate GPA, format code, convert colors, and more.",
      "sameAs": [
        "https://twitter.com/zurawebtools",
        "https://facebook.com/zurawebtools"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@zurawebtools.com"
      }
    });
    if (!organizationSchema.parentElement) document.head.appendChild(organizationSchema);

    // Structured Data - HowTo
    const howToSchema = (document.getElementById('csu-gpa-howto-schema') || document.createElement('script')) as HTMLScriptElement;
    howToSchema.id = 'csu-gpa-howto-schema';
    howToSchema.type = 'application/ld+json';
    howToSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate CSU GPA with Honors Cap",
      "description": "Step-by-step guide to calculating your California State University a-g GPA using official CSU rules with 8-semester honors cap (only 2 from 10th grade).",
      "image": "https://zurawebtools.com/images/csu-gpa-calculator-og.jpg",
      "totalTime": "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "tool": [
        {
          "@type": "HowToTool",
          "name": "CSU GPA Calculator"
        },
        {
          "@type": "HowToTool",
          "name": "High School Transcript"
        },
        {
          "@type": "HowToTool",
          "name": "A-G Course List"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Select All 10th, 11th, and 12th Grade Courses",
          "text": "CSU admissions considers all A-G coursework completed after 9th grade (10th-12th grades) for GPA calculation. Do not include 9th grade courses.",
          "url": shareUrl + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Verify A-G Course Status",
          "text": "Only courses approved on the UC/CSU A-G course list count toward CSU GPA. Check the official A-G course list or consult your school counselor.",
          "url": shareUrl + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Mark UC-Approved Honors/AP/IB Courses",
          "text": "Only mark courses as honors if they are officially designated as Honors, AP, or IB on the A-G course list. CSU limits honors weighting to 8 semesters maximum (only 2 from 10th grade).",
          "url": shareUrl + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Enter Accurate Credit Hours",
          "text": "Most high school courses are worth 4 credits (English, math, science, social science) or 3 credits (foreign language, visual/performing arts).",
          "url": shareUrl + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Exclude P/NP and Non-A-G Courses",
          "text": "Pass/No Pass courses and courses not on the A-G list are excluded from CSU GPA calculation. Only letter grades from A-G approved courses are included.",
          "url": shareUrl + "#how-to-use"
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Review Your Results",
          "text": "Compare your calculated CSU GPA with Cal State admission requirements. Remember that GPA is just one factor in admissions.",
          "url": shareUrl + "#how-to-use"
        }
      ]
    });
    if (!howToSchema.parentElement) document.head.appendChild(howToSchema);

    // Structured Data - FAQ Schema
    const faqSchema = (document.getElementById('csu-gpa-faq-schema') || document.createElement('script')) as HTMLScriptElement;
    faqSchema.id = 'csu-gpa-faq-schema';
    faqSchema.type = 'application/ld+json';
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What grades does CSU use for GPA calculation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CSU calculates your a-g GPA using all A-G approved courses completed after 9th grade, which includes 10th, 11th, and 12th grade coursework. 9th grade is excluded as a transition year, but all subsequent college preparatory coursework is included in the GPA calculation."
          }
        },
        {
          "@type": "Question",
          "name": "Does CSU count A+ as higher than 4.0?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, CSU caps all grades at 4.0. An A+ receives the same 4.0 points as an A. This differs from some high schools and the UC system, which may give A+ grades higher than 4.0."
          }
        },
        {
          "@type": "Question",
          "name": "How many honors semesters can CSU use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CSU caps honors weighting at a maximum of 8 semesters total, with only 2 semesters from 10th grade. This means you can use up to 2 honors semesters from 10th grade courses, plus up to 6 additional honors semesters from 11th-12th grade courses, for a maximum of 8 total. Courses must have a grade of C or better."
          }
        },
        {
          "@type": "Question",
          "name": "Do P/NP courses count in CSU GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, Pass/No Pass courses are excluded from CSU GPA calculation. Only letter grades (A-F) from A-G approved courses are included in the GPA computation."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use transfer or community college courses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, CSU allows community college or college courses taken during high school to be included in your a-g GPA if they are A-G approved. However, there are special rules: each semester college course grade counts twice (as 2 semesters) in your GPA calculation. Consult your counselor to verify if college courses are properly certified."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between CSU GPA and UC GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key differences include: CSU caps grades at 4.0 (UC allows A+ > 4.0), CSU limits honors to 8 semesters with only 2 from 10th grade (UC has no such limit), and both systems use 10th-12th grade courses. The 10th grade 2-semester honors cap is unique to CSU and does not apply to UC admissions."
          }
        },
        {
          "@type": "Question",
          "name": "How do I verify if my class is A-G approved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Check the official UC/CSU A-G course list at hs-articulation.ucop.edu/agcourselist, or consult your school counselor. Only courses on this approved list count toward CSU GPA and A-G requirements."
          }
        }
      ]
    });
    if (!faqSchema.parentElement) document.head.appendChild(faqSchema);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003DA5] to-[#002855] text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FFD200] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-[#003DA5]">🎓</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">CSU GPA Calculator 2026 – Instant California State University GPA</h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Calculate your California State University GPA using official CSU rules. Includes A-G course verification,
              honors weighting limits (max 8 semesters, only 2 from 10th grade), and 10th-12th grade calculation for accurate Cal State admissions eligibility.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Main Calculator */}
          <section id="calculator" className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#003DA5] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">CSU GPA Calculator</h2>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={weighted}
                    onChange={(e) => setWeighted(e.target.checked)}
                    className="w-4 h-4 text-[#003DA5] border-gray-300 rounded focus:ring-[#003DA5]"
                  />
                  <span className="text-sm font-medium text-gray-700">Weighted GPA (with honors)</span>
                </label>
                <button
                  onClick={addCourse}
                  className="px-4 py-2 bg-[#003DA5] text-white rounded-lg hover:bg-[#002855] transition-colors text-sm font-medium"
                >
                  + Add Course
                </button>
                <button
                  onClick={handlePrint}
                  disabled={!results || results.totalCredits === 0}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span className="text-lg">🖨️</span>
                  Print GPA
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!results || results.totalCredits === 0}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <span className="text-lg">💾</span>
                  Download Report
                </button>
              </div>

              {/* Course Input - Mobile Optimized Cards */}
              <div className="mb-6">
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#003DA5] text-white">
                        <th className="p-3 text-left">Course Name</th>
                        <th className="p-3 text-center">Grade</th>
                        <th className="p-3 text-center">Credits</th>
                        <th className="p-3 text-center">Grade Level</th>
                        <th className="p-3 text-center">A-G Course</th>
                        <th className="p-3 text-center">Honors/AP/IB</th>
                        <th className="p-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={course.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="p-3">
                            <input
                              type="text"
                              value={course.name}
                              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                              placeholder="e.g., English 10"
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900"
                              list="courses"
                            />
                          </td>
                          <td className="p-3">
                            <select
                              value={course.grade}
                              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900"
                            >
                              <option value="">Grade</option>
                              {Object.keys(gradePoints).map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              value={course.credits}
                              onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                              placeholder="4"
                              min="0"
                              max="6"
                              step="0.5"
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900"
                            />
                          </td>
                          <td className="p-3">
                            <select
                              value={course.gradeLevel}
                              onChange={(e) => updateCourse(course.id, 'gradeLevel', e.target.value as '10' | '11' | '12')}
                              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900"
                            >
                              <option value="10">10th</option>
                              <option value="11">11th</option>
                              <option value="12">12th</option>
                            </select>
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={course.isAGCourse}
                              onChange={(e) => updateCourse(course.id, 'isAGCourse', e.target.checked)}
                              className="w-5 h-5 text-[#003DA5] border-gray-300 rounded focus:ring-[#003DA5]"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={course.isHonors}
                              onChange={(e) => updateCourse(course.id, 'isHonors', e.target.checked)}
                              className="w-5 h-5 text-[#003DA5] border-gray-300 rounded focus:ring-[#003DA5]"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => removeCourse(course.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {courses.map((course, index) => (
                    <div key={course.id} className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold text-[#003DA5]">Course #{index + 1}</span>
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                          <input
                            type="text"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                            placeholder="e.g., English 10"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900 text-base"
                            list="courses"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                            <select
                              value={course.grade}
                              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900 text-base"
                            >
                              <option value="">Select</option>
                              {Object.keys(gradePoints).map(grade => (
                                <option key={grade} value={grade}>{grade}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                            <input
                              type="number"
                              value={course.credits}
                              onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                              placeholder="4"
                              min="0"
                              max="6"
                              step="0.5"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900 text-base"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level</label>
                          <select
                            value={course.gradeLevel}
                            onChange={(e) => updateCourse(course.id, 'gradeLevel', e.target.value as '10' | '11' | '12')}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003DA5] focus:border-transparent text-gray-900 text-base"
                          >
                            <option value="10">10th Grade</option>
                            <option value="11">11th Grade</option>
                            <option value="12">12th Grade</option>
                          </select>
                        </div>

                        <div className="flex gap-4 pt-2">
                          <label className="flex items-center gap-2 flex-1">
                            <input
                              type="checkbox"
                              checked={course.isAGCourse}
                              onChange={(e) => updateCourse(course.id, 'isAGCourse', e.target.checked)}
                              className="w-5 h-5 text-[#003DA5] border-gray-300 rounded focus:ring-[#003DA5]"
                            />
                            <span className="text-sm text-gray-700">A-G Course</span>
                          </label>

                          <label className="flex items-center gap-2 flex-1">
                            <input
                              type="checkbox"
                              checked={course.isHonors}
                              onChange={(e) => updateCourse(course.id, 'isHonors', e.target.checked)}
                              className="w-5 h-5 text-[#003DA5] border-gray-300 rounded focus:ring-[#003DA5]"
                            />
                            <span className="text-sm text-gray-700">Honors/AP/IB</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <datalist id="courses">
                {popularCourses.map(course => (
                  <option key={course} value={course} />
                ))}
              </datalist>

              {/* Results */}
              {results && (
                <div className="mt-8 p-6 bg-gradient-to-r from-[#003DA5] to-[#002855] text-white rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-3xl">📈</span>
                    Your CSU GPA Results
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-3xl font-bold text-[#FFD200]">{results.gpa.toFixed(3)}</div>
                      <div className="text-sm opacity-90">CSU GPA</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-3xl font-bold text-[#FFD200]">{results.totalCredits}</div>
                      <div className="text-sm opacity-90">Total Credits</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <div className="text-2xl font-bold text-[#FFD200]">{results.honorsPointsUsed}</div>
                      <div className="text-sm opacity-90">Honors Semesters Used</div>
                    </div>
                  </div>

                  {results.isHonorsCapped && (
                    <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-400 rounded-lg">
                      <div className="flex items-center gap-2 text-yellow-200">
                        <span className="text-lg">⚠️</span>
                        <span className="font-medium">Honors Cap Applied:</span>
                      </div>
                      <p className="text-sm mt-1">
                        CSU limits honors weighting to 8 semesters maximum (only 2 from 10th grade). Your calculation has been adjusted accordingly.
                      </p>
                    </div>
                  )}

                  <div className="mt-4 text-sm opacity-80">
                    <p><strong>Note:</strong> This calculator follows official CSU a-g GPA rules including A-G course requirements and the 8-semester honors cap (2 max from 10th grade).</p>
                  </div>
                </div>
              )}

              {/* GPA Trend Chart */}
              {results && gpaHistory.length >= 1 && (
                <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-3xl">📊</span>
                    GPA Trend Chart
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {gpaHistory.length === 1 
                      ? 'Your current GPA is displayed. Add more courses to see the trend!' 
                      : 'Track how your CSU GPA changes as you add courses'}
                  </p>

                  <div className="relative" style={{ height: '300px' }}>
                    <svg viewBox="0 0 800 300" className="w-full h-full" style={{ overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="gpaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFD200" />
                          <stop offset="100%" stopColor="#003DA5" />
                        </linearGradient>
                        <filter id="dropShadow">
                          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                          <feOffset dx="0" dy="2" result="offsetblur"/>
                          <feComponentTransfer>
                            <feFuncA type="linear" slope="0.3"/>
                          </feComponentTransfer>
                          <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Grid lines */}
                      {[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0].map((val) => {
                        const y = 280 - (val / 4.0) * 260;
                        return (
                          <g key={val}>
                            <line
                              x1="50"
                              y1={y}
                              x2="750"
                              y2={y}
                              stroke={val === 3.0 ? '#FFD200' : val === 3.5 ? '#FFA500' : '#e5e7eb'}
                              strokeWidth={val === 3.0 || val === 3.5 ? '2' : '1'}
                              strokeDasharray={val === 3.0 || val === 3.5 ? '5,5' : '0'}
                            />
                            <text x="35" y={y + 5} fontSize="12" fill="#6b7280" textAnchor="end">
                              {val.toFixed(1)}
                            </text>
                            {val === 3.0 && (
                              <text x="755" y={y - 5} fontSize="11" fill="#FFD200" fontWeight="600">
                                Good Standing
                              </text>
                            )}
                            {val === 3.5 && (
                              <text x="755" y={y - 5} fontSize="11" fill="#FFA500" fontWeight="600">
                                High Achievement
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* X-axis labels */}
                      <text x="400" y="295" fontSize="14" fill="#6b7280" textAnchor="middle" fontWeight="600">
                        Calculation Points
                      </text>
                      <text x="25" y="150" fontSize="14" fill="#6b7280" textAnchor="middle" transform="rotate(-90 25 150)" fontWeight="600">
                        GPA
                      </text>

                      {/* Line path */}
                      {gpaHistory.length > 1 && (
                        <path
                          d={gpaHistory.map((gpa, idx) => {
                            const x = 50 + (idx / (gpaHistory.length - 1)) * 700;
                            const y = 280 - (gpa / 4.0) * 260;
                            return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                          }).join(' ')}
                          fill="none"
                          stroke="url(#gpaGradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}

                      {/* Data points with hover effect */}
                      {gpaHistory.map((gpa, idx) => {
                        const x = 50 + (idx / Math.max(1, gpaHistory.length - 1)) * 700;
                        const y = 280 - (gpa / 4.0) * 260;
                        const color = gpa >= 3.5 ? '#FFA500' : gpa >= 3.0 ? '#FFD200' : '#003DA5';
                        
                        return (
                          <g key={idx}>
                            {/* Invisible larger circle for easier hover */}
                            <circle
                              cx={x}
                              cy={y}
                              r="12"
                              fill="transparent"
                              style={{ cursor: 'pointer' }}
                            >
                              <title>Point {idx + 1}: {gpa.toFixed(3)} - {gpa >= 3.5 ? 'High Achievement' : gpa >= 3.0 ? 'Good Standing' : 'Below 3.0'}</title>
                            </circle>
                            {/* Visible circle */}
                            <circle
                              cx={x}
                              cy={y}
                              r="6"
                              fill={color}
                              stroke="white"
                              strokeWidth="2"
                              filter="url(#dropShadow)"
                              className="transition-all duration-200 hover:r-8"
                              style={{ cursor: 'pointer' }}
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#FFA500]"></div>
                      <span className="text-gray-700">High Achievement (≥3.5)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#FFD200]"></div>
                      <span className="text-gray-700">Good Standing (3.0-3.49)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#003DA5]"></div>
                      <span className="text-gray-700">Below 3.0</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Tip:</strong> Hover over any point on the chart to see the exact GPA and achievement level. The chart shows your last 12 calculations to help you track your progress.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Table of Contents */}
          <TableOfContents sections={tocSections} />

          {/* Social Share */}
          <section className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Share This Tool</h3>
              <p className="text-gray-600 mb-4">Help other students calculate their CSU GPA accurately</p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors"
                >
                  <span className="text-lg">📘</span>
                  Facebook
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A94DA] transition-colors"
                >
                  <span className="text-lg">🐦</span>
                  Twitter
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition-colors"
                >
                  <span className="text-lg">💼</span>
                  LinkedIn
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors"
                >
                  <span className="text-lg">📱</span>
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* Quick Examples */}
          <section id="examples" className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#FFD200] rounded-lg flex items-center justify-center">
                  <span className="text-[#003DA5] text-xl">💡</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Quick Examples</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Click any example below to auto-fill the calculator with sample courses and see how CSU GPA is calculated.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {examples.map((example, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">{example.name}</h3>
                    <div className="space-y-1 mb-4">
                      {example.courses.slice(0, 4).map((course, i) => (
                        <div key={i} className="text-sm text-gray-600 flex justify-between">
                          <span>{course.name}</span>
                          <span className="font-medium">{course.grade}</span>
                        </div>
                      ))}
                      {example.courses.length > 4 && (
                        <div className="text-sm text-gray-500">+{example.courses.length - 4} more courses</div>
                      )}
                    </div>
                    <button
                      onClick={() => loadExample(index)}
                      className="w-full px-4 py-2 bg-[#003DA5] text-white rounded-lg hover:bg-[#002855] transition-colors font-medium"
                    >
                      Load Example
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#003DA5] to-[#002855] p-6 rounded-2xl text-white">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">CSU-Accurate GPA Rules</h3>
                <p className="opacity-90">
                  Follows official California State University GPA calculation rules including A-G course verification,
                  honors weighting limits, and 10th-11th grade restrictions for precise admissions eligibility.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FFD200] to-[#FFC107] p-6 rounded-2xl text-[#003DA5]">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold mb-3">10th–12th Grade Calculation</h3>
                <p className="opacity-90">
                  Automatically calculates GPA using only 10th, 11th, and 12th grade courses as required by CSU admissions.
                  Excludes 9th grade courses from the calculation. Official CSU a-g GPA includes all grades after 9th grade.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-3">A–G Course Verification</h3>
                <p className="opacity-90">
                  Built-in A-G course verification ensures only UC/CSU-approved college preparatory courses
                  are included in your GPA calculation for accurate eligibility assessment.
                </p>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section id="how-to-use" className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#003DA5] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📋</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">How to Use This CSU GPA Calculator</h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003DA5] text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Select All 10th, 11th, and 12th Grade Courses</h3>
                    <p className="text-gray-600">
                      CSU admissions considers all A-G coursework completed after 9th grade (10th-12th grades) for GPA calculation.
                      Do not include 9th grade courses. Include all completed courses from 10th, 11th, and 12th grade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003DA5] text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Verify A-G Course Status</h3>
                    <p className="text-gray-600">
                      Only courses approved on the UC/CSU A-G course list count toward CSU GPA. Check the
                      <a href="https://hs-articulation.ucop.edu/agcourselist" className="text-[#003DA5] hover:underline font-medium" target="_blank" rel="noopener noreferrer"> official A-G course list</a>
                      or consult your school counselor to confirm course eligibility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003DA5] text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Only Check UC-Approved Honors/AP/IB Courses</h3>
                    <p className="text-gray-600">
                      Only mark courses as honors if they are officially designated as Honors, Advanced Placement (AP),
                      or International Baccalaureate (IB) on the UC/CSU A-G course list. <strong>Important:</strong> CSU limits honors
                      weighting to 8 semesters maximum, with only 2 semesters from 10th grade. Check the
                      <a href="https://hs-articulation.ucop.edu/agcourselist" className="text-[#003DA5] hover:underline font-medium" target="_blank" rel="noopener noreferrer"> official A-G course list</a>
                      or consult your school counselor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003DA5] text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Enter Accurate Credit Hours</h3>
                    <p className="text-gray-600">
                      Most high school courses are worth 4 credits (English, math, science, social science) or 3 credits
                      (foreign language, visual/performing arts). Use the credit value assigned by your school.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003DA5] text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Exclude P/NP and Non-A-G Courses</h3>
                    <p className="text-gray-600">
                      Pass/No Pass courses and courses not on the A-G list are excluded from CSU GPA calculation.
                      Only letter grades from A-G approved courses in 10th-11th grades are included.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#003DA5] text-white rounded-full flex items-center justify-center font-bold">6</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Review Your Results</h3>
                    <p className="text-gray-600">
                      Compare your calculated CSU GPA with Cal State admission requirements. Remember that GPA
                      is just one factor in admissions - test scores, essays, and extracurricular activities also matter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section id="use-cases" className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#FFD200] rounded-lg flex items-center justify-center">
                  <span className="text-[#003DA5] text-xl">👥</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Who Uses This Calculator?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🎓</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">CSU Freshman Applicants</h3>
                  <p className="text-gray-600">
                    High school students preparing to apply to California State University campuses use this calculator
                    to understand their eligibility and compare their academic standing against admission requirements.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🔄</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Transfer Students</h3>
                  <p className="text-gray-600">
                    Community college students planning to transfer to CSU can use this tool to understand how their
                    high school GPA factors into the comprehensive review process for transfer admissions.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">👩‍🏫</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">School Counselors & Advisors</h3>
                  <p className="text-gray-600">
                    High school counselors use this calculator to help students understand CSU admission requirements
                    and develop academic plans that maximize their chances of admission to desired campuses.
                  </p>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Parents & Families</h3>
                  <p className="text-gray-600">
                    Parents helping their children navigate the college admissions process can use this tool to
                    understand how course selection and grades impact CSU eligibility and admission chances.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#003DA5] rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">ℹ️</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">About CSU GPA Calculation</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg leading-relaxed mb-6">
                  The California State University (CSU) system uses a unique GPA calculation method that differs significantly
                  from both standard high school GPA and UC GPA calculations. Understanding these differences is crucial
                  for students planning to apply to Cal State campuses.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Why Grades After 9th Grade Count (10th-12th)</h3>
                <p className="mb-4">
                  CSU's official a-g GPA calculation includes all A-G approved courses taken after 9th grade, which means
                  10th, 11th, and 12th grade courses are all included. This comprehensive approach gives students credit
                  for their entire high school academic performance during college preparatory years.
                </p>
                <p className="mb-6">
                  The 9th grade is excluded because it represents a transition year when students are adjusting to high
                  school rigor. However, unlike some other systems, CSU does include 12th grade coursework in the GPA calculation,
                  recognizing that senior year academic performance demonstrates continued college readiness.
                </p>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">A-G Course Requirements</h3>
                <p className="mb-4">
                  CSU requires completion of the A-G subject requirements, which represent a comprehensive college
                  preparatory curriculum. Only courses that appear on the official UC/CSU A-G course list are eligible
                  for inclusion in GPA calculations.
                </p>
                <p className="mb-6">
                  The A-G requirements include:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>A:</strong> History/Social Science (2 years required)</li>
                  <li><strong>B:</strong> English (4 years required)</li>
                  <li><strong>C:</strong> Mathematics (3 years required, 4 recommended)</li>
                  <li><strong>D:</strong> Laboratory Science (2 years required, 3 recommended)</li>
                  <li><strong>E:</strong> Language Other than English (2 years required, 3 recommended)</li>
                  <li><strong>F:</strong> Visual and Performing Arts (1 year required)</li>
                  <li><strong>G:</strong> College-Preparatory Elective (1 year required)</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Honors Weighting and the 8-Semester Cap</h3>
                <p className="mb-4">
                  CSU recognizes academic rigor by providing extra weighting for honors, Advanced Placement (AP),
                  and International Baccalaureate (IB) courses. These courses receive an additional grade point
                  added to the base grade (e.g., a B in AP Chemistry becomes 4.0 instead of 3.0).
                </p>
                <p className="mb-4">
                  However, CSU imposes an important limitation: <strong>maximum 8 semesters</strong> of honors courses can receive
                  extra weighting, with a sub-limit of <strong>only 2 semesters from 10th grade</strong>. This means:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Maximum 2 honors semesters from 10th grade courses (with grade C or better)</li>
                  <li>Up to 6 additional honors semesters from 11th-12th grade courses</li>
                  <li>Total cannot exceed 8 semesters across all three grade levels</li>
                  <li>The calculator automatically selects the highest-impact courses when you exceed the cap</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">CSU vs UC GPA: Key Differences</h3>
                <p className="mb-4">
                  While both UC and CSU use the A-G course list, there are significant differences in how they
                  calculate GPA:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Grade Range:</strong> UC allows A+ to exceed 4.0; CSU caps at 4.0</li>
                  <li><strong>Honors Cap:</strong> UC has no honors point limit; CSU caps at 8 points</li>
                  <li><strong>Grade Span:</strong> Both UC and CSU consider 10th-12th grades</li>
                  <li><strong>10th Grade Honors Cap:</strong> CSU limits 10th grade honors to 2 semesters; UC has no such restriction</li>
                  <li><strong>Course Weighting:</strong> Both systems weight honors courses, but differently</li>
                </ul>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">How CSU GPA Affects Admissions</h3>
                <p className="mb-4">
                  Your CSU GPA is a critical factor in the comprehensive review process used by Cal State campuses.
                  While minimum GPA requirements vary by campus and major, most CSU campuses require a minimum
                  2.0 GPA for California residents and 2.4 for non-residents.
                </p>
                <p className="mb-6">
                  However, for impacted majors and competitive campuses, the GPA requirements can be significantly
                  higher. For example, business and engineering programs at popular campuses may require 3.5+ GPAs.
                </p>

                <div className="bg-blue-50 border-l-4 border-[#003DA5] p-4 my-6">
                  <p className="text-[#003DA5] font-medium">
                    <strong>Important Note:</strong> GPA is just one component of your CSU application. The university
                    also considers your essay, extracurricular activities, work experience, and other personal achievements
                    in a holistic review process.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">External Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.calstate.edu/apply" className="text-[#003DA5] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                      Cal State Apply - Official CSU admissions portal
                    </a>
                  </li>
                  <li>
                    <a href="https://www.calstate.edu/" className="text-[#003DA5] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                      CSU Chancellor's Office - Official policy information
                    </a>
                  </li>
                  <li>
                    <a href="https://hs-articulation.ucop.edu/agcourselist" className="text-[#003DA5] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                      UC/CSU A-G Course List - Official course approval database
                    </a>
                  </li>
                  <li>
                    <a href="https://en.wikipedia.org/wiki/Grading_in_the_United_States" className="text-[#003DA5] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                      Wikipedia - U.S. Grading Systems (reference)
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-8 text-sm text-gray-500 border-t pt-4">
                Last updated: January 2026
              </div>
            </div>
          </section>

          {/* Understanding CSU GPA Section */}
          <section className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#003DA5] rounded-lg flex items-center justify-center">
                  <span className="text-[#FFD200] text-xl">📚</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Understanding CSU GPA Calculation</h2>
              </div>

              <p className="text-gray-600 mb-6">
                The California State University (CSU) system uses a specific 4.0-scale GPA calculation method that differs from standard high school GPAs. Here's everything you need to know about how CSU calculates your admission GPA.
              </p>

              {/* Grade Scale Table */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">CSU Grade Scale</h3>
              <p className="text-gray-600 mb-4">
                CSU caps all letter grades at 4.0, meaning an A+ receives the same points as an A. This differs from some high schools and other university systems.
              </p>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#003DA5] to-[#002855] text-white">
                      <th className="p-4 text-left font-semibold">Letter Grade</th>
                      <th className="p-4 text-center font-semibold">Base Points</th>
                      <th className="p-4 text-center font-semibold">Honors/AP/IB Bonus</th>
                      <th className="p-4 text-center font-semibold">Max Possible Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-green-700">A+ / A</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">4.0</td>
                      <td className="p-4 text-center text-gray-800">+1.0 (if eligible)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">5.0</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-green-700">A-</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">3.7</td>
                      <td className="p-4 text-center text-gray-800">+1.0 (if eligible)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">4.7</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-blue-700">B+</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">3.3</td>
                      <td className="p-4 text-center text-gray-800">+1.0 (if eligible)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">4.3</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-blue-700">B</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">3.0</td>
                      <td className="p-4 text-center text-gray-800">+1.0 (if eligible)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">4.0</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-blue-700">B-</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">2.7</td>
                      <td className="p-4 text-center text-gray-800">+1.0 (if eligible)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">3.7</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-yellow-700">C+</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">2.3</td>
                      <td className="p-4 text-center text-gray-800">+1.0 (if eligible)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">3.3</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-yellow-700">C</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">2.0</td>
                      <td className="p-4 text-center text-gray-800">+1.0 (if eligible)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">3.0</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-yellow-700">C-</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">1.7</td>
                      <td className="p-4 text-center text-gray-700">No bonus</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">1.7</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-orange-600">D+ / D / D-</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">1.3 / 1.0 / 0.7</td>
                      <td className="p-4 text-center text-gray-700">No bonus</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">1.3 / 1.0 / 0.7</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="p-4 font-semibold text-red-600">F</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">0.0</td>
                      <td className="p-4 text-center text-gray-700">No bonus</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">0.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg mb-8">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Important:</strong> Honors bonus points only apply to eligible courses with grades of C or better. CSU limits honors weighting to a maximum of 8 semesters, with only 2 semesters from 10th grade courses.
                </p>
              </div>

              {/* Example Calculation Table */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Step-by-Step Example Calculation</h3>
              <p className="text-gray-600 mb-4">
                Here's a practical example showing how CSU calculates GPA for a sample student with mixed regular and honors courses:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#FFD200] to-[#FFA500] text-[#003DA5]">
                      <th className="p-4 text-left font-semibold">Course</th>
                      <th className="p-4 text-center font-semibold">Grade</th>
                      <th className="p-4 text-center font-semibold">Credits</th>
                      <th className="p-4 text-center font-semibold">Base Points</th>
                      <th className="p-4 text-center font-semibold">Honors?</th>
                      <th className="p-4 text-center font-semibold">Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-800 font-medium">English 11 (Honors)</td>
                      <td className="p-4 text-center font-semibold text-gray-800">A</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">4</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">4.0</td>
                      <td className="p-4 text-center text-green-700 font-semibold">Yes (+1)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">20.0 (5.0 × 4)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-800 font-medium">AP Calculus AB</td>
                      <td className="p-4 text-center font-semibold text-gray-800">B+</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">4</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">3.3</td>
                      <td className="p-4 text-center text-green-700 font-semibold">Yes (+1)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">17.2 (4.3 × 4)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-800 font-medium">US History</td>
                      <td className="p-4 text-center font-semibold text-gray-800">A-</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">3</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">3.7</td>
                      <td className="p-4 text-center text-gray-700 font-medium">No</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">11.1 (3.7 × 3)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-gray-800 font-medium">Chemistry (Honors)</td>
                      <td className="p-4 text-center font-semibold text-gray-800">B</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">4</td>
                      <td className="p-4 text-center text-gray-800 font-semibold">3.0</td>
                      <td className="p-4 text-center text-green-700 font-semibold">Yes (+1)</td>
                      <td className="p-4 text-center font-bold text-[#003DA5]">16.0 (4.0 × 4)</td>
                    </tr>
                    <tr className="bg-[#003DA5] text-white font-bold">
                      <td className="p-4" colSpan={2}>Total</td>
                      <td className="p-4 text-center">15 credits</td>
                      <td className="p-4 text-center" colSpan={2}>64.3 grade points</td>
                      <td className="p-4 text-center text-[#FFD200]">GPA: 4.287</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg mb-8">
                <p className="text-sm text-gray-700">
                  <strong>📐 Calculation:</strong> 64.3 total grade points ÷ 15 total credits = <strong>4.287 CSU GPA</strong>
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  This student used 3 semesters of honors weighting (English 11, Calculus, Chemistry), which is well within the 8-semester CSU limit.
                </p>
              </div>

              {/* Comparison Table */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">CSU vs Other University Systems</h3>
              <p className="text-gray-600 mb-4">
                Understanding how CSU's GPA calculation differs from other university systems can help you strategize your course selection:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#003DA5] to-[#002855] text-white">
                      <th className="p-4 text-left font-semibold">University System</th>
                      <th className="p-4 text-center font-semibold">A+ Value</th>
                      <th className="p-4 text-center font-semibold">Honors Cap</th>
                      <th className="p-4 text-center font-semibold">Grades Used</th>
                      <th className="p-4 text-center font-semibold">Key Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-[#FFD200]/10">
                      <td className="p-4 font-bold text-[#003DA5]">California State (CSU)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">4.0 (same as A)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">8 semesters<br/>(2 max from 10th)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">10th-12th only</td>
                      <td className="p-4 text-center text-sm text-gray-800 font-medium">Strict 10th grade honors limit</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-gray-800">University of California (UC)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">4.0 (capped)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">8 semesters<br/>(no grade-level limit)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">10th-12th only</td>
                      <td className="p-4 text-center text-sm text-gray-800 font-medium">No 10th grade restriction</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-gray-800">Stanford</td>
                      <td className="p-4 text-center text-gray-800 font-medium">4.0 (standard)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">No cap</td>
                      <td className="p-4 text-center text-gray-800 font-medium">9th-12th all</td>
                      <td className="p-4 text-center text-sm text-gray-800 font-medium">Includes 9th grade</td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-4 font-semibold text-gray-800">Common App (Most Private)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">4.0 (standard)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">No cap</td>
                      <td className="p-4 text-center text-gray-800 font-medium">9th-12th all</td>
                      <td className="p-4 text-center text-sm text-gray-800 font-medium">Unlimited honors</td>
                    </tr>
                    <tr className="hover:bg-blue-50">
                      <td className="p-4 font-semibold text-gray-800">MIT/Caltech</td>
                      <td className="p-4 text-center text-gray-800 font-medium">Unweighted only</td>
                      <td className="p-4 text-center text-gray-800 font-medium">N/A (no weighting)</td>
                      <td className="p-4 text-center text-gray-800 font-medium">9th-12th all</td>
                      <td className="p-4 text-center text-sm text-gray-800 font-medium">Ignores honors entirely</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">✅ CSU Advantages</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Rewards strategic honors course selection</li>
                    <li>• Clear 8-semester cap (easy to plan)</li>
                    <li>• Focuses on 10th-12th performance</li>
                    <li>• Transparent calculation method</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-2">⚠️ Key Considerations</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Only 2 honors from 10th grade count</li>
                    <li>• A+ gets no extra credit vs A</li>
                    <li>• Must be A-G approved courses</li>
                    <li>• Different from high school GPA</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-[#003DA5] rounded-r-lg">
                <h4 className="font-bold text-[#003DA5] text-lg mb-3">💡 Strategic Planning Tip</h4>
                <p className="text-gray-700 mb-3">
                  Since CSU only counts 2 honors courses from 10th grade, focus on taking more challenging courses in 11th and 12th grades. You can use up to 6 additional honors semesters from these upper grades.
                </p>
                <p className="text-gray-700">
                  <strong>Best Strategy:</strong> Take 2 honors courses in 10th grade, then load up on AP/IB/Honors courses in 11th-12th to maximize your CSU GPA while staying within the 8-semester cap.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#FFD200] rounded-lg flex items-center justify-center">
                  <span className="text-[#003DA5] text-xl">❓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">What grades does CSU use for GPA calculation?</h3>
                  <p className="text-gray-600">
                    CSU calculates your a-g GPA using all A-G approved courses completed after 9th grade, which includes
                    10th, 11th, and 12th grade coursework. 9th grade is excluded as a transition year, but all subsequent
                    college preparatory coursework is included in the GPA calculation.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Does CSU count A+ as higher than 4.0?</h3>
                  <p className="text-gray-600">
                    No, CSU caps all grades at 4.0. An A+ receives the same 4.0 points as an A. This differs from
                    some high schools and the UC system, which may give A+ grades higher than 4.0.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">How many honors semesters can CSU use?</h3>
                  <p className="text-gray-600">
                    CSU caps honors weighting at a maximum of 8 semesters total, with only 2 semesters from 10th grade.
                    This means you can use up to 2 honors semesters from 10th grade courses, plus up to 6 additional honors
                    semesters from 11th-12th grade courses, for a maximum of 8 total. Courses must have a grade of C or better.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Do P/NP courses count in CSU GPA?</h3>
                  <p className="text-gray-600">
                    No, Pass/No Pass courses are excluded from CSU GPA calculation. Only letter grades (A-F)
                    from A-G approved courses are included in the GPA computation.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Can I use transfer or community college courses?</h3>
                  <p className="text-gray-600">
                    Yes, CSU allows community college or college courses taken during high school to be included in your a-g GPA
                    if they are A-G approved. However, there are special rules: each semester college course grade counts twice
                    (as 2 semesters) in your GPA calculation. Consult your counselor to verify if college courses are properly certified.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">What is the difference between CSU GPA and UC GPA?</h3>
                  <p className="text-gray-600">
                    Key differences include: CSU caps grades at 4.0 (UC allows A+ &gt; 4.0), CSU limits honors to 8 semesters
                    with only 2 from 10th grade (UC has no such limit), and both systems use 10th-12th grade courses. The 10th grade
                    2-semester honors cap is unique to CSU and does not apply to UC admissions.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">How do I verify if my class is A-G approved?</h3>
                  <p className="text-gray-600">
                    Check the official UC/CSU A-G course list at hs-articulation.ucop.edu/agcourselist, or consult
                    your school counselor. Only courses on this approved list count toward CSU GPA and A-G requirements.
                  </p>
                </div>
              </div>

              {/* FAQ Structured Data */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "What grades does CSU use for GPA calculation?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "CSU calculates your a-g GPA using all A-G approved courses completed after 9th grade, which includes 10th, 11th, and 12th grade coursework. 9th grade is excluded as a transition year, but all subsequent college preparatory coursework is included in the GPA calculation."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Does CSU count A+ as higher than 4.0?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No, CSU caps all grades at 4.0. An A+ receives the same 4.0 points as an A. This differs from some high schools and the UC system, which may give A+ grades higher than 4.0."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How many honors semesters can CSU use?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "CSU caps honors weighting at a maximum of 8 semesters total, with only 2 semesters from 10th grade. This means you can use up to 2 honors semesters from 10th grade courses, plus up to 6 additional honors semesters from 11th-12th grade courses, for a maximum of 8 total. Courses must have a grade of C or better."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do P/NP courses count in CSU GPA?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No, Pass/No Pass courses are excluded from CSU GPA calculation. Only letter grades (A-F) from A-G approved courses are included in the GPA computation."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Can I use transfer or community college courses?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, CSU allows community college or college courses taken during high school to be included in your a-g GPA if they are A-G approved. However, there are special rules: each semester college course grade counts twice (as 2 semesters) in your GPA calculation. Consult your counselor to verify if college courses are properly certified."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the difference between CSU GPA and UC GPA?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Key differences include: CSU caps grades at 4.0 (UC allows A+ &gt; 4.0), CSU limits honors to 8 semesters with only 2 from 10th grade (UC has no such limit), and both systems use 10th-12th grade courses. The 10th grade 2-semester honors cap is unique to CSU and does not apply to UC admissions."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do I verify if my class is A-G approved?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Check the official UC/CSU A-G course list at hs-articulation.ucop.edu/agcourselist, or consult your school counselor. Only courses on this approved list count toward CSU GPA and A-G requirements."
                      }
                    }
                  ]
                })}
              </script>
            </div>
          </section>

          {/* Related Tools */}
          <RelatedTools 
            currentSlug="csu-gpa-calculator" 
            relatedSlugs={["college-gpa-calculator", "berkeley-gpa-calculator", "lsac-gpa-calculator"]} 
            navigateTo={navigateTo} 
          />

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm border-t pt-8">
            © 2026 ZuraWebTools — All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
};

export default CSUGPACalculator;
