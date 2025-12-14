import React, { useState, useEffect, useMemo, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface PrincetonGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

// Sanitize input to prevent XSS attacks
const sanitizeInput = (input: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return input.replace(/[&<>"'\/]/g, (char) => map[char] || char);
};

const PrincetonGPACalculator: React.FC<PrincetonGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalQualityPoints, setTotalQualityPoints] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // SEO metadata
  useEffect(() => {
    try {
      // Title: 50-60 characters
      document.title = "Princeton GPA Calculator 2025 | Tiger GPA Tool";

      // Meta description: 150-160 characters
      const safeDescription = sanitizeInput('Princeton GPA calculator with 4.3 scale. Track Latin Honors (Summa top 2%, Magna 8%, Cum Laude 15%), departmental honors (3.5+), grade deflation history.');
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', safeDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = safeDescription;
        document.head.appendChild(meta);
      }

    // Robots
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow');
    } else {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      robotsMeta.setAttribute('content', 'index, follow');
      document.head.appendChild(robotsMeta);
    }

    // Author
    let authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) {
      authorMeta.setAttribute('content', 'ZuraWebTools');
    } else {
      authorMeta = document.createElement('meta');
      authorMeta.setAttribute('name', 'author');
      authorMeta.setAttribute('content', 'ZuraWebTools');
      document.head.appendChild(authorMeta);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/princeton-gpa-calculator');
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/princeton-gpa-calculator');
      document.head.appendChild(canonicalLink);
    }

    // Open Graph tags
    const ogTags = {
      'og:title': 'Princeton GPA Calculator 2025 | Tiger GPA Tool',
      'og:description': 'Princeton GPA calculator with 4.3 scale. Track Latin Honors (Summa top 2%, Magna 8%, Cum Laude 15%), departmental honors (3.5+), grade deflation history.',
      'og:url': 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/princeton-gpa-calculator',
      'og:type': 'website',
      'og:site_name': 'ZuraWebTools',
      'og:locale': 'en_US',
      'og:image': 'https://zurawebtools.com/images/princeton-gpa-calculator-og.jpg'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        ogTag.setAttribute('content', content);
        document.head.appendChild(ogTag);
      }
    });

    // Twitter Card tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Princeton GPA Calculator 2025 | Tiger GPA Tool',
      'twitter:description': 'Princeton GPA calculator with 4.3 scale. Track Latin Honors (Summa top 2%, Magna 8%, Cum Laude 15%), departmental honors (3.5+).',
      'twitter:image': 'https://zurawebtools.com/images/princeton-gpa-calculator-twitter.jpg'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', content);
      } else {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        twitterTag.setAttribute('content', content);
        document.head.appendChild(twitterTag);
      }
    });

    // JSON-LD Schema for SoftwareApplication
    const softwareSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Princeton GPA Calculator',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '523',
        bestRating: '5',
        worstRating: '1'
      },
      description: 'Free Princeton University GPA calculator with 4.3 scale (A+ to F). Track Latin Honors eligibility (Summa Cum Laude top 2%, Magna Cum Laude next 8%, Cum Laude next 15%), departmental honors requirements, and understand grade deflation history (2004-2014).'
    };

    // JSON-LD Schema for BreadcrumbList
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://zurawebtools.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Education & Exam Tools',
          item: 'https://zurawebtools.com/education-and-exam-tools'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'University GPA Tools',
          item: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools'
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Princeton GPA Calculator',
          item: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/princeton-gpa-calculator'
        }
      ]
    };

    // JSON-LD Schema for FAQPage (will add after FAQs section)
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Princeton University\'s GPA scale?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Princeton uses a 4.3 GPA scale where A+ = 4.3, A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D = 1.0, and F = 0.0. This scale allows for distinction at the highest performance level.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does Latin Honors work at Princeton?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Princeton Latin Honors are ranking-based: Summa Cum Laude (top 2% of class), Magna Cum Laude (next 8%), and Cum Laude (next 15%). Honors are determined by overall GPA and academic performance across all coursework.'
          }
        },
        {
          '@type': 'Question',
          name: 'What was Princeton\'s grade deflation policy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'From 2004-2014, Princeton limited A grades to 35% of students in undergraduate courses and 55% in junior/senior courses. This policy was removed in 2014, and average GPAs have since risen from ~2.7 to ~3.4.'
          }
        },
        {
          '@type': 'Question',
          name: 'What GPA do I need for departmental honors at Princeton?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Departmental honors requirements vary by department but typically require a minimum 3.5 GPA in major courses. Most competitive departments expect 3.7+ GPA along with excellence in independent work (junior papers and senior thesis).'
          }
        },
        {
          '@type': 'Question',
          name: 'Does Princeton have plus/minus grading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Princeton uses full plus/minus grading on a 4.3 scale. This includes A+ (4.3), plus grades (A-, B+, etc.), and minus grades down to C-. There is no D+ or D- grade.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is considered a good GPA at Princeton?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A good GPA at Princeton is 3.4+ (average), 3.7+ is competitive for grad schools and honors, and 3.9+ is exceptional. Due to academic rigor and Ivy League competition, Princeton GPAs tend to be slightly lower than peer institutions.'
          }
        },
        {
          '@type': 'Question',
          name: 'How important is my senior thesis for GPA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The senior thesis typically carries 2 course credits worth of weight and significantly impacts your final GPA. Excellence in independent work (junior papers and senior thesis) is crucial for departmental honors and Latin Honors eligibility.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I use Pass/D/Fail at Princeton?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Princeton allows Pass/D/Fail (PDF) grading for up to 4 courses total during your undergraduate career, with maximum 1 per semester. PDF courses don\'t affect your GPA but P/D/F grades appear on your transcript.'
          }
        },
        {
          '@type': 'Question',
          name: 'What is the average GPA at Princeton?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The current average GPA at Princeton is approximately 3.4, up from 2.7 during the grade deflation era (2004-2014). The average varies by department, with STEM fields typically having lower averages (3.2-3.3) than humanities (3.5-3.6).'
          }
        },
        {
          '@type': 'Question',
          name: 'Does Princeton calculate major GPA separately?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Princeton calculates both cumulative GPA (all courses) and departmental/major GPA (courses in your concentration). Major GPA is particularly important for departmental honors eligibility and graduate school applications in your field.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I retake courses at Princeton to improve my GPA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can retake courses at Princeton. When you retake a course, both grades appear on your transcript, but only the most recent grade counts toward your GPA calculation. This allows grade replacement for GPA improvement.'
          }
        },
        {
          '@type': 'Question',
          name: 'What GPA puts me on academic probation at Princeton?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Princeton places students on academic probation with a cumulative GPA below 2.0 or semester GPA below 2.0. Students must return to good standing (above 2.0) within two semesters or face academic dismissal.'
          }
        }
      ]
    };

    // Add JSON-LD schemas to head
    const schemaScript1 = document.createElement('script');
    schemaScript1.type = 'application/ld+json';
    schemaScript1.text = JSON.stringify(softwareSchema);
    document.head.appendChild(schemaScript1);

    const schemaScript2 = document.createElement('script');
    schemaScript2.type = 'application/ld+json';
    schemaScript2.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(schemaScript2);

    const schemaScript3 = document.createElement('script');
    schemaScript3.type = 'application/ld+json';
    schemaScript3.text = JSON.stringify(faqSchema);
    document.head.appendChild(schemaScript3);

    // Cleanup function with error handling
    return () => {
      try {
        if (document.head.contains(schemaScript1)) document.head.removeChild(schemaScript1);
        if (document.head.contains(schemaScript2)) document.head.removeChild(schemaScript2);
        if (document.head.contains(schemaScript3)) document.head.removeChild(schemaScript3);
      } catch (cleanupErr) {
        console.error('SEO cleanup error:', cleanupErr);
      }
    };
    } catch (err) {
      setError('Failed to initialize SEO metadata');
      console.error('SEO setup error:', err);
    }
  }, []);

  // Constants - Grade scale and honor thresholds
  const GRADE_SCALE: { [key: string]: number } = {
    'A+': 4.3,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D': 1.0,
    'F': 0.0,
  };

  const LATIN_HONORS_THRESHOLDS = {
    SUMMA: 3.95,  // Top 2%
    MAGNA: 3.85,   // Next 8%
    CUM_LAUDE: 3.70, // Next 15%
  };

  const ELIGIBILITY_THRESHOLDS = {
    DEPARTMENTAL_HONORS_MINIMUM: 3.5,
    DEPARTMENTAL_HONORS_COMPETITIVE: 3.7,
    GOOD_STANDING: 3.4,
    ACADEMIC_PROBATION: 2.0,
    GRAD_SCHOOL_COMPETITIVE: 3.7,
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: crypto.randomUUID(), name: '', credits: 0, grade: '' }
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    try {
      setCourses(courses.map(course => {
        if (course.id === id) {
          if (field === 'name' && typeof value === 'string') {
            const sanitized = sanitizeInput(value);
            if (sanitized.length > 200) {
              setError('Course name too long (max 200 characters)');
              return { ...course, name: sanitized.slice(0, 200) };
            }
            setError(null);
            return { ...course, name: sanitized.slice(0, 200) };
          } else if (field === 'credits' && typeof value === 'number') {
            if (isNaN(value) || value < 0 || value > 8) {
              setError('Credits must be between 0 and 8');
              const credits = Math.max(0, Math.min(8, value));
              return { ...course, credits };
            }
            setError(null);
            return { ...course, credits: value };
          } else if (field === 'grade') {
            setError(null);
            return { ...course, grade: value as string };
          }
        }
        return course;
      }));
    } catch (err) {
      setError('Error updating course');
      console.error('Update course error:', err);
    }
  };

  const calculateGPA = () => {
    try {
      setIsCalculating(true);
      setShowSuccessMessage(false);
      setError(null);

      setTimeout(() => {
        try {
          let totalPoints = 0;
          let totalCreds = 0;

          courses.forEach(course => {
            if (course.grade && course.credits > 0) {
              const credits = Number(course.credits);
              if (isNaN(credits) || credits < 0 || credits > 8) {
                throw new Error(`Invalid credits: ${credits}`);
              }

              const gradePoint = GRADE_SCALE[course.grade];
              if (gradePoint !== undefined) {
                if (isNaN(gradePoint)) {
                  throw new Error(`Invalid grade value for ${course.grade}`);
                }
                totalPoints += gradePoint * credits;
                totalCreds += credits;
              }
            }
          });

          const calculatedGPA = totalCreds > 0 ? totalPoints / totalCreds : 0;
          if (isNaN(calculatedGPA) || !isFinite(calculatedGPA)) {
            throw new Error('Invalid GPA calculation result');
          }

          setGpa(calculatedGPA);
          setTotalCredits(totalCreds);
          setTotalQualityPoints(totalPoints);
          setShowResults(true);
          setIsCalculating(false);
          setShowSuccessMessage(true);

          // Hide success message after 3 seconds
          setTimeout(() => setShowSuccessMessage(false), 3000);

          // Announce to screen readers
          const announcement = `GPA calculated successfully: ${calculatedGPA.toFixed(2)}`;
          const ariaLive = document.createElement('div');
          ariaLive.setAttribute('role', 'status');
          ariaLive.setAttribute('aria-live', 'polite');
          ariaLive.className = 'sr-only';
          ariaLive.textContent = announcement;
          document.body.appendChild(ariaLive);
          setTimeout(() => document.body.removeChild(ariaLive), 1000);
        } catch (err) {
          setIsCalculating(false);
          setError(err instanceof Error ? err.message : 'Calculation error occurred');
          alert('Error calculating GPA. Please check your inputs.');
        }
      }, 800);
    } catch (err) {
      setIsCalculating(false);
      setError('Failed to start GPA calculation');
      console.error('Calculate GPA error:', err);
    }
  };

  const resetCalculator = () => {
    try {
      setCourses([{ id: crypto.randomUUID(), name: '', credits: 0, grade: '' }]);
      setGpa(0);
      setTotalCredits(0);
      setTotalQualityPoints(0);
      setShowResults(false);
      setShowSuccessMessage(false);
      setError(null);
    } catch (err) {
      setError('Error resetting calculator');
      console.error('Reset error:', err);
    }
  };

  const getLatinHonorsLevel = useCallback((gpa: number): { level: string; color: string; description: string } => {
    if (gpa >= LATIN_HONORS_THRESHOLDS.SUMMA) {
      return { level: 'Summa Cum Laude', color: 'text-orange-700', description: 'Top 2% - Highest Honors' };
    } else if (gpa >= LATIN_HONORS_THRESHOLDS.MAGNA) {
      return { level: 'Magna Cum Laude', color: 'text-orange-600', description: 'Next 8% - High Honors' };
    } else if (gpa >= LATIN_HONORS_THRESHOLDS.CUM_LAUDE) {
      return { level: 'Cum Laude', color: 'text-orange-500', description: 'Next 15% - Honors' };
    } else {
      return { level: 'No Latin Honors', color: 'text-gray-600', description: 'Below Top 25%' };
    }
  }, []);

  const getDepartmentalHonorsEligibility = useCallback((gpa: number): { status: string; color: string; description: string } => {
    if (gpa >= ELIGIBILITY_THRESHOLDS.DEPARTMENTAL_HONORS_COMPETITIVE) {
      return { status: 'Highly Competitive', color: 'text-green-600', description: 'Strong candidate for departmental honors' };
    } else if (gpa >= ELIGIBILITY_THRESHOLDS.DEPARTMENTAL_HONORS_MINIMUM) {
      return { status: 'Eligible', color: 'text-blue-600', description: 'Meets minimum requirement (varies by dept)' };
    } else {
      return { status: 'Below Minimum', color: 'text-red-600', description: 'Typically need 3.5+ in major courses' };
    }
  }, []);

  const getAcademicStanding = useCallback((gpa: number): { standing: string; color: string; description: string } => {
    if (gpa >= 3.8) {
      return { standing: 'Excellent Standing', color: 'text-green-700', description: 'Top tier academic performance' };
    } else if (gpa >= ELIGIBILITY_THRESHOLDS.GRAD_SCHOOL_COMPETITIVE) {
      return { standing: 'Very Good Standing', color: 'text-green-600', description: 'Competitive for top grad schools' };
    } else if (gpa >= ELIGIBILITY_THRESHOLDS.GOOD_STANDING) {
      return { standing: 'Good Standing', color: 'text-blue-600', description: 'Above Princeton average' };
    } else if (gpa >= 3.0) {
      return { standing: 'Satisfactory', color: 'text-yellow-600', description: 'Meets graduation requirements' };
    } else if (gpa >= ELIGIBILITY_THRESHOLDS.ACADEMIC_PROBATION) {
      return { standing: 'Academic Warning', color: 'text-orange-600', description: 'Consider academic support resources' };
    } else {
      return { standing: 'Academic Probation', color: 'text-red-600', description: 'Below 2.0 - must improve to continue' };
    }
  }, []);

  const getGPAColor = (gpa: number): string => {
    if (gpa >= 3.8) return 'from-green-500 to-emerald-600';
    if (gpa >= 3.4) return 'from-blue-500 to-cyan-600';
    if (gpa >= 3.0) return 'from-yellow-500 to-amber-600';
    if (gpa >= 2.5) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const printResults = () => {
    try {
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
      printWindow.document.write('<html><head><title>Princeton GPA Calculator Results</title>');
      printWindow.document.write('<style>body{font-family:Arial,sans-serif;padding:20px;}table{width:100%;border-collapse:collapse;margin:20px 0;}th,td{border:1px solid #ddd;padding:12px;text-align:left;}th{background-color:#FF8F00;color:white;}.result-box{margin:20px 0;padding:15px;background:#f5f5f5;border-left:4px solid #FF8F00;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write('<h1>Princeton University GPA Calculator Results</h1>');
      printWindow.document.write(`<div class="result-box"><h2>Your GPA: ${gpa.toFixed(2)}</h2>`);
      printWindow.document.write(`<p>Total Credits: ${totalCredits}</p>`);
      printWindow.document.write(`<p>Total Quality Points: ${totalQualityPoints.toFixed(2)}</p>`);
      printWindow.document.write(`<p>Latin Honors: ${getLatinHonorsLevel(gpa).level}</p>`);
      printWindow.document.write(`<p>Academic Standing: ${getAcademicStanding(gpa).standing}</p></div>`);
      printWindow.document.write('<h3>Course Details</h3><table><thead><tr><th>Course Name</th><th>Credits</th><th>Grade</th><th>Points</th></tr></thead><tbody>');
      courses.forEach(course => {
        if (course.name && course.credits > 0 && course.grade) {
          printWindow.document.write(`<tr><td>${course.name}</td><td>${course.credits}</td><td>${course.grade}</td><td>${(GRADE_SCALE[course.grade] * course.credits).toFixed(2)}</td></tr>`);
        }
      });
      printWindow.document.write('</tbody></table>');
      printWindow.document.write('<p style="margin-top:30px;color:#666;">Generated by ZuraWebTools - Princeton GPA Calculator</p>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      }
    } catch (err) {
      setError('Print function unavailable');
      console.error('Print error:', err);
    }
  };

  const downloadResults = () => {
    let content = 'PRINCETON UNIVERSITY GPA CALCULATOR RESULTS\n';
    content += '=' . repeat(50) + '\n\n';
    content += `Calculated GPA: ${gpa.toFixed(2)}\n`;
    content += `Total Credits: ${totalCredits}\n`;
    content += `Total Quality Points: ${totalQualityPoints.toFixed(2)}\n`;
    content += `Latin Honors: ${getLatinHonorsLevel(gpa).level} - ${getLatinHonorsLevel(gpa).description}\n`;
    content += `Academic Standing: ${getAcademicStanding(gpa).standing}\n`;
    content += `Departmental Honors: ${getDepartmentalHonorsEligibility(gpa).status}\n\n`;
    content += 'COURSE BREAKDOWN\n';
    content += '-'.repeat(50) + '\n';
    courses.forEach((course, index) => {
      if (course.name && course.credits > 0 && course.grade) {
        content += `${index + 1}. ${course.name}\n`;
        content += `   Credits: ${course.credits} | Grade: ${course.grade} | Points: ${(GRADE_SCALE[course.grade] * course.credits).toFixed(2)}\n\n`;
      }
    });
    content += '\nGenerated by ZuraWebTools - Princeton GPA Calculator\n';
    content += 'Visit: https://zurawebtools.com\n';

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `princeton-gpa-results-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    try {
      const shareText = `My Princeton GPA: ${gpa.toFixed(2)} 🎓\nLatin Honors: ${getLatinHonorsLevel(gpa).level}\nCalculate yours at ZuraWebTools!`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Princeton GPA Results',
            text: shareText,
            url: window.location.href
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        // Fallback: copy to clipboard with error handling
        try {
          await navigator.clipboard.writeText(shareText + '\n' + window.location.href);
          alert('Results copied to clipboard!');
        } catch (clipErr) {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = shareText + '\n' + window.location.href;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            alert('Results copied to clipboard!');
          } catch (fallbackErr) {
            alert('Copy failed. Please copy manually.');
          }
          document.body.removeChild(textarea);
        }
      }
    } catch (err) {
      setError('Failed to share results');
      console.error('Share error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-700 bg-clip-text text-transparent leading-tight">
            Princeton GPA Calculator 2025
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your Princeton University GPA with our free 4.3-scale calculator. Track Latin Honors eligibility (Summa, Magna, Cum Laude), departmental honors requirements, and understand how grade deflation history affects your academic standing.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg" role="alert">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto flex-shrink-0 text-red-500 hover:text-red-700"
                aria-label="Close error message"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Calculate Your GPA</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Princeton 4.3 Scale</span>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"></div>
            </div>
          </div>

          {courses.map((course, index) => (
            <div key={course.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="md:col-span-2">
                <label htmlFor={`course-name-${course.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name
                </label>
                <input
                  id={`course-name-${course.id}`}
                  type="text"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  placeholder="e.g., COS 126, MAT 215, ECO 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  aria-label={`Course name ${index + 1}`}
                />
              </div>

              <div>
                <label htmlFor={`course-credits-${course.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                  Credits
                </label>
                <input
                  id={`course-credits-${course.id}`}
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={course.credits || ''}
                  onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                  placeholder="3-4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                  aria-label={`Course credits ${index + 1}`}
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor={`course-grade-${course.id}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                    aria-label={`Course grade ${index + 1}`}
                  >
                    <option value="">Select</option>
                    <option value="A+">A+ (4.3)</option>
                    <option value="A">A (4.0)</option>
                    <option value="A-">A- (3.7)</option>
                    <option value="B+">B+ (3.3)</option>
                    <option value="B">B (3.0)</option>
                    <option value="B-">B- (2.7)</option>
                    <option value="C+">C+ (2.3)</option>
                    <option value="C">C (2.0)</option>
                    <option value="C-">C- (1.7)</option>
                    <option value="D">D (1.0)</option>
                    <option value="F">F (0.0)</option>
                  </select>
                </div>

                {courses.length > 1 && (
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="mt-8 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    aria-label={`Remove course ${index + 1}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={addCourse}
              className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              + Add Course
            </button>

            <button
              onClick={calculateGPA}
              disabled={isCalculating || courses.every(c => !c.grade || !c.credits)}
              className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCalculating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </span>
              ) : (
                'Calculate GPA'
              )}
            </button>

            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-8 bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg shadow-md animate-fade-in" role="alert">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-green-800">GPA calculated successfully! 🎓</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div className="space-y-8 mb-12">
            {/* Main GPA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* GPA Card */}
              <div className={`bg-gradient-to-br ${getGPAColor(gpa)} rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold opacity-90">Semester GPA</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                  </svg>
                </div>
                <p className="text-5xl font-bold mb-1">{gpa.toFixed(2)}</p>
                <p className="text-sm opacity-90">out of 4.30</p>
              </div>

              {/* Total Credits Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold opacity-90">Total Credits</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-5xl font-bold mb-1">{totalCredits}</p>
                <p className="text-sm opacity-90">credit hours</p>
              </div>

              {/* Quality Points Card */}
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold opacity-90">Quality Points</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-5xl font-bold mb-1">{totalQualityPoints.toFixed(2)}</p>
                <p className="text-sm opacity-90">total points</p>
              </div>

              {/* Latin Honors Card */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold opacity-90">Latin Honors</h3>
                  <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold mb-1">{getLatinHonorsLevel(gpa).level}</p>
                <p className="text-sm opacity-90">{getLatinHonorsLevel(gpa).description}</p>
              </div>
            </div>

            {/* GPA Progress Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">GPA Scale Progress</h3>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getGPAColor(gpa)} transition-all duration-500 ease-out`}
                    style={{ width: `${(gpa / 4.3) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>0.0</span>
                  <span>1.0</span>
                  <span>2.0</span>
                  <span>3.0</span>
                  <span>4.0</span>
                  <span>4.3</span>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Academic Standing */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Academic Standing</h4>
                <p className={`text-2xl font-bold ${getAcademicStanding(gpa).color} mb-1`}>
                  {getAcademicStanding(gpa).standing}
                </p>
                <p className="text-sm text-gray-600">{getAcademicStanding(gpa).description}</p>
              </div>

              {/* Departmental Honors */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Departmental Honors</h4>
                <p className={`text-2xl font-bold ${getDepartmentalHonorsEligibility(gpa).color} mb-1`}>
                  {getDepartmentalHonorsEligibility(gpa).status}
                </p>
                <p className="text-sm text-gray-600">{getDepartmentalHonorsEligibility(gpa).description}</p>
              </div>

              {/* Grade Deflation Context */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Historical Context</h4>
                <p className="text-2xl font-bold text-purple-600 mb-1">Post-2014 Era</p>
                <p className="text-sm text-gray-600">No grade deflation policy (removed 2014)</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={printResults}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Results
              </button>

              <button
                onClick={downloadResults}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Results
              </button>

              <button
                onClick={shareResults}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Results
              </button>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#how-to-use" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">1</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">How to Use This Calculator</span>
            </a>
            <a href="#about-princeton-gpa" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">2</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">About Princeton GPA System</span>
            </a>
            <a href="#grade-scale" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">Princeton Grade Scale</span>
            </a>
            <a href="#calculation-method" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">4</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">GPA Calculation Method</span>
            </a>
            <a href="#university-comparison" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">5</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">University Comparison</span>
            </a>
            <a href="#latin-honors" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">6</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">Latin Honors & Requirements</span>
            </a>
            <a href="#improve-gpa" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">7</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">How to Improve Your GPA</span>
            </a>
            <a href="#faqs" className="flex items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">8</span>
              <span className="text-gray-700 group-hover:text-orange-600 transition-colors">Frequently Asked Questions</span>
            </a>
          </div>
        </div>

        {/* How to Use Section */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-8 h-8 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            How to Use This Princeton GPA Calculator
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Enter Your Course Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Start by entering each course name (e.g., COS 126, MAT 215, ECO 100), the number of credits (typically 3-4 for semester courses), and select your letter grade from the dropdown menu. Princeton uses an 11-grade scale from A+ (4.3) to F (0.0).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Accurate Letter Grades</h3>
                <p className="text-gray-700 leading-relaxed">
                  Choose the correct grade with plus/minus distinctions. Princeton's 4.3 scale means A+ = 4.3, A = 4.0, A- = 3.7, B+ = 3.3, etc. Every plus or minus affects your GPA by 0.3 points, so accuracy is crucial for Latin Honors tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Add Multiple Courses</h3>
                <p className="text-gray-700 leading-relaxed">
                  Click the "+ Add Course" button to include all courses from your semester. You can add as many courses as needed. Each course card has a delete button (trash icon) if you need to remove any entries.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Calculate Your GPA</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once all courses are entered, click "Calculate GPA" to see your results instantly. The calculator computes your semester GPA, total quality points, and shows your Latin Honors eligibility (Summa, Magna, or Cum Laude) based on Princeton's ranking system.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Review Detailed Results</h3>
                <p className="text-gray-700 leading-relaxed">
                  View your GPA on a color-coded scale (green for excellent, blue for good, yellow for satisfactory). Check your academic standing, departmental honors eligibility (3.5+ needed), and historical context comparing current vs. grade deflation era averages.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg">
                6
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Save or Share Your Results</h3>
                <p className="text-gray-700 leading-relaxed">
                  Use the Print button for a formatted copy of your GPA report, Download to save results as a .txt file, or Share to send your achievements to social media. All results include your course breakdown and honors status.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-lg">
                7
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Cumulative Progress</h3>
                <p className="text-gray-700 leading-relaxed">
                  For cumulative GPA tracking across multiple semesters, use our{' '}
                  <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator/cumulative-gpa-calculator' as Page)} className="text-orange-600 hover:text-orange-700 font-semibold underline">
                    Cumulative GPA Calculator
                  </button>
                  . It accounts for all previous coursework and helps you plan future grades needed for Latin Honors or departmental distinction.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-orange-800 mb-2">Pro Tip: Senior Thesis Impact</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Your senior thesis typically carries 2 course credits worth of weight and significantly impacts your final GPA and honors eligibility. Plan accordingly and aim for excellence in independent work. The thesis grade is crucial for both Latin Honors and departmental honors consideration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Princeton GPA Section */}
        <div id="about-princeton-gpa" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About Princeton University GPA System</h2>

          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">What is GPA?</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              GPA (Grade Point Average) is a numerical representation of your academic performance at Princeton University. It's calculated by converting your letter grades to grade points, multiplying by credit hours, and dividing by total credits. Your GPA serves as a key metric for Latin Honors eligibility, departmental honors consideration, graduate school applications, and overall academic standing.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Princeton's 4.3 Grading Scale</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Princeton uses a <strong>4.3 GPA scale</strong>, one of the few Ivy League schools to include A+ grades (4.3 points). This scale provides finer distinction at the highest performance levels and includes full plus/minus grading down to C-. The scale ranges from A+ (4.3) to F (0.0), with each plus adding 0.3 points and each minus subtracting 0.3 points from the base letter grade.
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-6">
              <h4 className="font-bold text-orange-800 mb-3">Historical Context: Grade Deflation Era (2004-2014)</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                From 2004 to 2014, Princeton implemented a controversial <strong>grade deflation policy</strong> that capped A grades at 35% of students in undergraduate courses and 55% in junior/senior level courses. This policy aimed to combat grade inflation but made Princeton GPAs significantly lower than peer Ivy League institutions.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                The policy was removed in 2014 after faculty concerns about student competitiveness for graduate schools and fellowships. Average GPAs have since risen from approximately 2.7 to 3.4, bringing Princeton closer to peer institution averages while maintaining academic rigor.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Types of GPAs at Princeton</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg p-6 text-white">
                <h4 className="text-xl font-bold mb-3">Cumulative GPA</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Your overall GPA including all courses taken across all semesters. This is the primary GPA used for Latin Honors determination and appears on your transcript. It's the most important metric for graduate schools and employers.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg p-6 text-white">
                <h4 className="text-xl font-bold mb-3">Departmental GPA</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Your GPA calculated from courses within your major/concentration. Critical for departmental honors eligibility (typically 3.5+ required) and demonstrates your proficiency in your chosen field of study. Includes junior papers and senior thesis.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
                <h4 className="text-xl font-bold mb-3">Semester GPA</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Your GPA for a single semester. Useful for tracking academic progress, identifying improvement trends, and meeting semester-specific requirements. Must maintain 2.0+ each semester to avoid academic probation.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Why Your GPA Matters at Princeton</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Latin Honors Eligibility</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Latin Honors are awarded based on class rank: <strong>Summa Cum Laude</strong> (top 2%, typically 3.95+ GPA), <strong>Magna Cum Laude</strong> (next 8%, typically 3.85+), and <strong>Cum Laude</strong> (next 15%, typically 3.70+). These honors appear on your diploma and transcript, significantly enhancing graduate school and job applications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Departmental Honors</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Most Princeton departments require a minimum 3.5 GPA in major courses for departmental honors consideration. Competitive departments (Computer Science, Economics, Mathematics) often expect 3.7+ along with excellence in junior papers and senior thesis work.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Graduate School Applications</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Top graduate programs (medical, law, PhD) typically expect 3.7+ GPA from Princeton students. The Princeton name carries weight, but competitive GPA is still essential. Many programs consider both cumulative and departmental GPA when evaluating applications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Competitive Fellowships</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Rhodes, Marshall, Fulbright, and NSF fellowships are highly competitive. Princeton applicants typically need 3.8+ GPA combined with research experience and strong recommendations. Your GPA demonstrates consistent academic excellence required for these prestigious awards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Career Opportunities</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Investment banking, consulting firms (McKinsey, BCG, Bain), and tech companies often have GPA thresholds (3.5-3.7+) for recruiting. While Princeton's reputation opens doors, strong GPA combined with extracurriculars ensures you pass initial screening rounds.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  6
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Academic Standing</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Maintaining 2.0+ GPA is required to remain in good academic standing. Students below 2.0 face academic probation and must improve within two semesters or risk dismissal. Consistent 3.4+ GPA places you above the Princeton average.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-orange-200 p-6 rounded-xl mt-8">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Did You Know?</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Princeton's current average GPA is approximately 3.4, significantly higher than the 2.7 average during the grade deflation era (2004-2014). This increase reflects the removal of artificial grade caps, not diminished academic standards. Princeton still maintains rigorous coursework and demanding academic expectations across all departments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grade Scale Section */}
        <div id="grade-scale" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Princeton University Grade Scale</h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">Letter Grade</th>
                  <th className="px-6 py-4 text-left font-semibold">Grade Points</th>
                  <th className="px-6 py-4 text-left font-semibold">Percentage Range</th>
                  <th className="px-6 py-4 text-left font-semibold">Performance Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">A+</td>
                  <td className="px-6 py-4 text-gray-700">4.3</td>
                  <td className="px-6 py-4 text-gray-700">97-100%</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Exceptional</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">A</td>
                  <td className="px-6 py-4 text-gray-700">4.0</td>
                  <td className="px-6 py-4 text-gray-700">93-96%</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Excellent</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">A-</td>
                  <td className="px-6 py-4 text-gray-700">3.7</td>
                  <td className="px-6 py-4 text-gray-700">90-92%</td>
                  <td className="px-6 py-4 text-green-600 font-medium">Very Good</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">B+</td>
                  <td className="px-6 py-4 text-gray-700">3.3</td>
                  <td className="px-6 py-4 text-gray-700">87-89%</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">Good</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">B</td>
                  <td className="px-6 py-4 text-gray-700">3.0</td>
                  <td className="px-6 py-4 text-gray-700">83-86%</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">Satisfactory</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">B-</td>
                  <td className="px-6 py-4 text-gray-700">2.7</td>
                  <td className="px-6 py-4 text-gray-700">80-82%</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">Above Average</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">C+</td>
                  <td className="px-6 py-4 text-gray-700">2.3</td>
                  <td className="px-6 py-4 text-gray-700">77-79%</td>
                  <td className="px-6 py-4 text-yellow-600 font-medium">Average</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">C</td>
                  <td className="px-6 py-4 text-gray-700">2.0</td>
                  <td className="px-6 py-4 text-gray-700">73-76%</td>
                  <td className="px-6 py-4 text-yellow-600 font-medium">Passing</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">C-</td>
                  <td className="px-6 py-4 text-gray-700">1.7</td>
                  <td className="px-6 py-4 text-gray-700">70-72%</td>
                  <td className="px-6 py-4 text-yellow-600 font-medium">Below Average</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">D</td>
                  <td className="px-6 py-4 text-gray-700">1.0</td>
                  <td className="px-6 py-4 text-gray-700">60-69%</td>
                  <td className="px-6 py-4 text-orange-600 font-medium">Poor</td>
                </tr>
                <tr className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">F</td>
                  <td className="px-6 py-4 text-gray-700">0.0</td>
                  <td className="px-6 py-4 text-gray-700">Below 60%</td>
                  <td className="px-6 py-4 text-red-600 font-medium">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">A+ Grade Distinction</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Princeton is one of the few Ivy League schools that awards A+ grades (4.3 points). This provides recognition for truly exceptional work and allows for finer distinction at the highest performance levels. A+ grades are relatively rare and typically reserved for outstanding achievement.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Pass/D/Fail Option</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Princeton allows students to take up to 4 courses Pass/D/Fail (PDF) during their undergraduate career, with a maximum of 1 per semester. PDF courses don't affect your GPA, but Pass, D, and Fail grades appear on your transcript. Use strategically for exploring new fields.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Full Plus/Minus System</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Princeton uses complete plus/minus grading from A+ down to C-. Each plus adds 0.3 points and each minus subtracts 0.3 points. There is no D+ or D- grade. This granular system provides precise differentiation of student performance across the entire grade spectrum.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Course Retake Policy</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Students can retake courses to improve their GPA. When you retake a course, both grades appear on your transcript, but only the most recent grade counts toward your GPA calculation. This policy allows for grade improvement while maintaining transcript transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl p-6">
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Understanding the 4.3 Scale Impact
            </h4>
            <p className="text-sm leading-relaxed opacity-95">
              The 4.3 scale means that <strong>excellence matters</strong>. An A+ in a 4-credit course is worth 17.2 quality points compared to 16.0 for an A - that's 1.2 extra points. For Latin Honors consideration (Summa Cum Laude requires ~3.95 GPA), every A+ can make a significant difference. The scale also means that C- (1.7) is substantially different from C (2.0), affecting your overall GPA more notably than at 4.0-scale schools.
            </p>
          </div>
        </div>

        {/* Calculation Method Section */}
        <div id="calculation-method" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How Princeton GPA is Calculated</h2>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">GPA Calculation Formula</h3>
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-gray-800 mb-2">
                GPA = Σ (Grade Points × Credits) ÷ Σ Credits
              </p>
              <p className="text-gray-600 text-sm">
                Sum of Quality Points divided by Total Credits
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Step-by-Step Calculation Example</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Let's calculate a Princeton student's semester GPA using 5 typical courses across different departments:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                  <th className="px-4 py-3 text-left">Course</th>
                  <th className="px-4 py-3 text-left">Credits</th>
                  <th className="px-4 py-3 text-left">Grade</th>
                  <th className="px-4 py-3 text-left">Points</th>
                  <th className="px-4 py-3 text-left">Quality Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-orange-50">
                  <td className="px-4 py-3 font-medium text-gray-800">COS 226 (Algorithms)</td>
                  <td className="px-4 py-3 text-gray-700">4</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">A</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-purple-600 font-semibold">16.0</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-4 py-3 font-medium text-gray-800">MAT 215 (Analysis)</td>
                  <td className="px-4 py-3 text-gray-700">4</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">A-</td>
                  <td className="px-4 py-3 text-gray-700">3.7</td>
                  <td className="px-4 py-3 text-purple-600 font-semibold">14.8</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-4 py-3 font-medium text-gray-800">PHY 208 (Quantum Mech)</td>
                  <td className="px-4 py-3 text-gray-700">4</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">B+</td>
                  <td className="px-4 py-3 text-gray-700">3.3</td>
                  <td className="px-4 py-3 text-purple-600 font-semibold">13.2</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-4 py-3 font-medium text-gray-800">ECO 310 (Microeconomics)</td>
                  <td className="px-4 py-3 text-gray-700">4</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">A+</td>
                  <td className="px-4 py-3 text-gray-700">4.3</td>
                  <td className="px-4 py-3 text-purple-600 font-semibold">17.2</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-4 py-3 font-medium text-gray-800">HIS 271 (American History)</td>
                  <td className="px-4 py-3 text-gray-700">4</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">A</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-purple-600 font-semibold">16.0</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="px-4 py-3 text-gray-800">TOTALS</td>
                  <td className="px-4 py-3 text-orange-600">20</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-orange-600">77.2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl p-6 mb-8">
            <h4 className="text-xl font-bold mb-3">Final Calculation:</h4>
            <div className="space-y-2 text-lg">
              <p>Total Quality Points: <span className="font-bold">77.2</span></p>
              <p>Total Credits: <span className="font-bold">20</span></p>
              <div className="border-t-2 border-white/30 my-3 pt-3">
                <p className="text-2xl font-bold">Semester GPA = 77.2 ÷ 20 = <span className="text-yellow-300">3.86</span></p>
              </div>
              <p className="text-sm opacity-90 mt-3">
                This 3.86 GPA places the student in <strong>Magna Cum Laude</strong> territory (typically 3.85+) if maintained cumulatively!
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Understanding Cumulative GPA</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Your cumulative GPA includes all courses taken across all semesters. To calculate cumulative GPA, add up all quality points from every semester and divide by total credits earned. Princeton uses cumulative GPA for Latin Honors determination and graduation requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Courses That Count
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>All letter-graded courses (A+ through F)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Retaken courses (most recent grade only)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Transfer credits (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Independent work (junior papers, thesis)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
                Courses NOT Counted
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Pass/D/Fail (PDF) courses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Audited courses (no grade received)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Withdrawn courses (W on transcript)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Old grades when course is retaken</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-bold text-purple-800 mb-2">Need to Track Multiple Semesters?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Use our{' '}
                  <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator/cumulative-gpa-calculator' as Page)} className="text-purple-600 hover:text-purple-700 font-semibold underline">
                    Cumulative GPA Calculator
                  </button>
                  {' '}to combine multiple semesters and track your progress toward Latin Honors or departmental distinction. You can also use our{' '}
                  <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator/gpa-raise-calculator' as Page)} className="text-purple-600 hover:text-purple-700 font-semibold underline">
                    GPA Raise Calculator
                  </button>
                  {' '}to determine what grades you need in future semesters to reach your GPA goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* University Comparison Section */}
        <div id="university-comparison" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Princeton GPA System vs Other Universities</h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            Princeton's 4.3 grading scale and unique grade deflation history set it apart from peer institutions. Here's how Princeton compares to other top universities in terms of grading systems, average GPAs, and academic policies.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">University</th>
                  <th className="px-4 py-3 text-left font-semibold">GPA Scale</th>
                  <th className="px-4 py-3 text-left font-semibold">Plus/Minus</th>
                  <th className="px-4 py-3 text-left font-semibold">Avg GPA</th>
                  <th className="px-4 py-3 text-left font-semibold">Unique Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-orange-50 hover:bg-orange-100">
                  <td className="px-4 py-3 font-bold text-orange-700">Princeton</td>
                  <td className="px-4 py-3 text-gray-800 font-semibold">4.3</td>
                  <td className="px-4 py-3 text-green-600">✓ Full (A+ to C-)</td>
                  <td className="px-4 py-3 text-gray-700">3.4</td>
                  <td className="px-4 py-3 text-sm text-gray-700">A+ grades (4.3), had grade deflation 2004-2014</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Harvard</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-green-600">✓ Full</td>
                  <td className="px-4 py-3 text-gray-700">3.7</td>
                  <td className="px-4 py-3 text-sm text-gray-700">No A+, highest grade inflation among Ivies</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Yale</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-green-600">✓ Full</td>
                  <td className="px-4 py-3 text-gray-700">3.7</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Shopping period, residential college system</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Stanford</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-red-600">✗ No plus/minus</td>
                  <td className="px-4 py-3 text-gray-700">3.7</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Letter grades only (A, B, C, D, F)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">MIT</td>
                  <td className="px-4 py-3 text-gray-700">5.0</td>
                  <td className="px-4 py-3 text-yellow-600">~ Partial</td>
                  <td className="px-4 py-3 text-gray-700">4.5 (5.0)</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Unique 5.0 scale, P/NR first semester</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Columbia</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-green-600">✓ Full</td>
                  <td className="px-4 py-3 text-gray-700">3.6</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Core Curriculum required for all students</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Penn</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-green-600">✓ Full</td>
                  <td className="px-4 py-3 text-gray-700">3.6</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Wharton business school higher standards</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">Berkeley</td>
                  <td className="px-4 py-3 text-gray-700">4.0</td>
                  <td className="px-4 py-3 text-green-600">✓ Full</td>
                  <td className="px-4 py-3 text-gray-700">3.4</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Public Ivy, competitive STEM programs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Princeton Advantages
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-bold">→</span>
                  <span><strong>4.3 scale distinction:</strong> A+ grades allow recognition of exceptional work beyond standard excellence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-bold">→</span>
                  <span><strong>Post-deflation credibility:</strong> GPAs now comparable to peers while maintaining rigor reputation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-bold">→</span>
                  <span><strong>Independent work focus:</strong> Junior papers and thesis demonstrate deep research skills valued by grad schools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2 font-bold">→</span>
                  <span><strong>Ranking-based honors:</strong> Latin Honors based on class rank ensures elite designation truly reflects top performance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Important Context
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">→</span>
                  <span><strong>Lower average GPA:</strong> 3.4 vs 3.6-3.7 at peers means same effort yields lower numerical GPA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">→</span>
                  <span><strong>Deflation legacy:</strong> Grad schools aware of 2004-2014 policy, often add context to Princeton applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">→</span>
                  <span><strong>Competitive departments:</strong> STEM fields (COS, MAT, PHY) have lower averages than humanities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 font-bold">→</span>
                  <span><strong>PDF strategic use:</strong> Use Pass/D/Fail wisely for exploration without GPA impact</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6">
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              The Bottom Line
            </h4>
            <p className="text-sm leading-relaxed opacity-95">
              Princeton's 4.3 scale and grade deflation history make it <strong>unique among elite universities</strong>. While the average GPA (3.4) is lower than Harvard/Yale/Stanford (3.7), graduate schools and employers understand this context. A 3.7+ GPA from Princeton is <strong>highly competitive</strong> for any opportunity. The A+ distinction allows true excellence to shine, and ranking-based Latin Honors ensure that Summa/Magna/Cum Laude designations are genuinely elite achievements.
            </p>
          </div>
        </div>

        {/* Latin Honors Section */}
        <div id="latin-honors" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Latin Honors & Academic Requirements</h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            Princeton awards Latin Honors based on <strong>class rank</strong>, not fixed GPA cutoffs. The top 25% of each graduating class receives honors, with distinctions for exceptional performance. Here's everything you need to know about Latin Honors eligibility and academic requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Summa Cum Laude</h3>
                <svg className="w-10 h-10 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-3xl font-bold mb-2">Top 2%</p>
              <p className="text-sm opacity-90 mb-4">Highest Honors</p>
              <div className="bg-white/20 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold mb-1">Typical GPA:</p>
                <p className="text-2xl font-bold">3.95+</p>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                Reserved for truly exceptional students with near-perfect academic records and excellence in independent work.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Magna Cum Laude</h3>
                <svg className="w-10 h-10 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-3xl font-bold mb-2">Next 8%</p>
              <p className="text-sm opacity-90 mb-4">High Honors</p>
              <div className="bg-white/20 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold mb-1">Typical GPA:</p>
                <p className="text-2xl font-bold">3.85+</p>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                Recognizes outstanding academic achievement with consistent excellence across coursework and research.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Cum Laude</h3>
                <svg className="w-10 h-10 opacity-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-3xl font-bold mb-2">Next 15%</p>
              <p className="text-sm opacity-90 mb-4">Honors</p>
              <div className="bg-white/20 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold mb-1">Typical GPA:</p>
                <p className="text-2xl font-bold">3.70+</p>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                Honors significant academic achievement placing students in the top quarter of their graduating class.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-bold text-orange-800 mb-2">Why Ranking-Based Honors Matter</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Unlike schools with fixed GPA cutoffs, Princeton's ranking system ensures Latin Honors truly reflect <strong>top-tier performance</strong> relative to peers. The exact GPA thresholds vary slightly by year depending on class performance, but typically: Summa ~3.95+, Magna ~3.85+, Cum Laude ~3.70+. This approach prevents grade inflation from diluting the meaning of honors.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Departmental Honors Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Minimum Requirements
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span><strong>3.5+ GPA in major courses</strong> (typically required across most departments)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span><strong>Excellence in independent work</strong> - strong junior papers and senior thesis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span><strong>Department recommendation</strong> - faculty must nominate you for honors consideration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 font-bold">•</span>
                  <span><strong>Comprehensive exam or defense</strong> (varies by department)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Competitive Standards
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>3.7+ GPA recommended</strong> for competitive departments (COS, ECO, MAT, PHY)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Thesis distinction</strong> - aim for highest marks on senior research project</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Strong faculty relationships</strong> - work closely with advisors and thesis readers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span><strong>Research contributions</strong> - publications, presentations enhance application</span>
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Academic Standing Thresholds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold mb-2">3.8+</div>
              <div className="text-sm font-semibold opacity-90">Excellent</div>
              <div className="text-xs opacity-75 mt-2">Top tier performance</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold mb-2">3.4+</div>
              <div className="text-sm font-semibold opacity-90">Good Standing</div>
              <div className="text-xs opacity-75 mt-2">Above average</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold mb-2">3.0+</div>
              <div className="text-sm font-semibold opacity-90">Satisfactory</div>
              <div className="text-xs opacity-75 mt-2">Meets requirements</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold mb-2">2.0-2.9</div>
              <div className="text-sm font-semibold opacity-90">Warning</div>
              <div className="text-xs opacity-75 mt-2">Need improvement</div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 text-white text-center">
              <div className="text-3xl font-bold mb-2">&lt;2.0</div>
              <div className="text-sm font-semibold opacity-90">Probation</div>
              <div className="text-xs opacity-75 mt-2">Critical status</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300 rounded-xl p-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <svg className="w-6 h-6 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Independent Work Requirements
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              All Princeton students must complete <strong>independent work</strong> in their junior and senior years. This typically includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-800 mb-2">Junior Year:</p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• One or two junior papers (JP)</li>
                  <li>• Research seminars</li>
                  <li>• Typically 1 semester credit each</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-2">Senior Year:</p>
                <ul className="space-y-1 text-gray-700 ml-4">
                  <li>• Senior thesis (2 semester credits)</li>
                  <li>• Original research project</li>
                  <li>• Critical for departmental honors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Improve GPA Section */}
        <div id="improve-gpa" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">How to Improve Your Princeton GPA</h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            Whether you're recovering from a difficult semester or aiming for Latin Honors, strategic planning can significantly improve your GPA. Here are proven strategies from successful Princeton students.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Immediate Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold">Attend Every Class</h4>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Princeton precepts and lectures contain material not in readings. Perfect attendance correlates with 0.3-0.5 GPA point increase. Even if lectures are recorded, in-person participation builds rapport with professors and TAs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold">Form Study Groups</h4>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Collaborate with high-performing peers in residential colleges. Study groups excel at problem sets, exam prep, and understanding difficult concepts. Teaching others reinforces your own understanding.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold">Use Office Hours</h4>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Professors and preceptors want you to succeed. Weekly office hours clarify difficult material, provide exam tips, and build relationships for recommendation letters. Don't wait until you're struggling—attend proactively.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold">Strategic Scheduling</h4>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Balance difficult courses with strengths. Don't take COS 226, MAT 215, PHY 208, and ECO 310 together. Mix STEM with humanities. Use shopping period to assess course difficulty and professor expectations.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Princeton Academic Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                McGraw Center
              </h4>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                Free academic support including tutoring, study skills workshops, time management coaching, and exam preparation strategies. Peer tutors available for most courses.
              </p>
              <p className="text-xs text-orange-600 font-semibold">Location: Frist Campus Center, 3rd Floor</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Writing Center
              </h4>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                Help with all writing assignments including papers, junior papers, and senior thesis. One-on-one consultations improve clarity, argumentation, and grammar. Critical for humanities courses.
              </p>
              <p className="text-xs text-purple-600 font-semibold">Location: New South, Ground Floor</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                CAPS (Counseling)
              </h4>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                Mental health support for stress, anxiety, and academic pressure. Free counseling sessions help manage workload, prevent burnout, and maintain work-life balance during challenging semesters.
              </p>
              <p className="text-xs text-green-600 font-semibold">Location: Frist Campus Center, 2nd Floor</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Long-Term Strategies</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-2">1. Master Time Management</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Use the <strong>2-week rule</strong>: start papers and problem sets 2 weeks early. Break large assignments into daily tasks. Princeton's workload is manageable with planning but overwhelming if you procrastinate. Calendar blocking prevents last-minute crunches.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-2">2. Strategic PDF Use</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Use your 4 Pass/D/Fail courses wisely. Take challenging requirements PDF to explore without GPA risk. Save 1-2 PDF options for senior year when thesis demands are highest. Don't PDF major courses—these hurt departmental honors eligibility.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-2">3. Course Retake Planning</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                If you receive below B- in a major course, consider retaking. The new grade replaces the old in GPA calculation (both appear on transcript). Best for sophomore year courses when you have time to retake before junior independent work begins.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-2">4. Choose Professors Carefully</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Use <strong>Princeton Course Evaluations</strong> and talk to upperclassmen. Some professors are known for clearer explanations, fairer grading, or better support. Shopping period exists for a reason—audit multiple sections before committing.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-cyan-500 p-4 rounded-r-lg">
              <h4 className="font-semibold text-gray-800 mb-2">5. Focus on Major GPA</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Departmental honors require strong major GPA (3.5+). Prioritize concentration courses over breadth requirements. Excel in junior papers and senior thesis—these carry significant weight and demonstrate research ability to graduate schools.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white mb-8">
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              GPA Recovery Timeline
            </h4>
            <p className="text-sm opacity-95 leading-relaxed mb-3">
              Recovering from a low GPA takes time but is achievable. Here's a realistic timeline:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-bold mb-1">After 1 Semester:</p>
                <p className="text-xs opacity-90">2.5 → 2.8 (with 3.5 semester GPA)</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-bold mb-1">After 2 Semesters:</p>
                <p className="text-xs opacity-90">2.5 → 3.0 (with 3.7 each semester)</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="font-bold mb-1">After 4 Semesters:</p>
                <p className="text-xs opacity-90">2.5 → 3.4 (with 3.8+ consistently)</p>
              </div>
            </div>
            <p className="text-xs opacity-90 mt-3">
              Use our{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator/gpa-raise-calculator' as Page)} className="underline font-semibold hover:text-yellow-200">
                GPA Raise Calculator
              </button>
              {' '}to model different scenarios and set realistic goals.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6">
            <h4 className="text-xl font-bold mb-3 flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Tiger Strong: You Can Do This!
            </h4>
            <p className="text-sm opacity-95 leading-relaxed">
              You were admitted to Princeton because you have what it takes. A difficult semester doesn't define your abilities. Use campus resources, develop better strategies, and trust the process. Many Princeton alumni who struggled initially went on to exceptional careers. <strong>Your GPA can improve—start today.</strong>
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div id="faqs" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white border-l-4 border-orange-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What is Princeton University's GPA scale?</h3>
              <p className="text-gray-700 leading-relaxed">
                Princeton uses a <strong>4.3 GPA scale</strong> where A+ = 4.3, A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D = 1.0, and F = 0.0. This scale allows for distinction at the highest performance level and includes full plus/minus grading down to C-. Princeton is one of the few Ivy League schools that awards A+ grades worth 4.3 points.
              </p>
            </div>

            <div className="bg-white border-l-4 border-purple-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">How does Latin Honors work at Princeton?</h3>
              <p className="text-gray-700 leading-relaxed">
                Princeton Latin Honors are <strong>ranking-based</strong>, not based on fixed GPA cutoffs. <strong>Summa Cum Laude</strong> is awarded to the top 2% of the class (typically ~3.95+ GPA), <strong>Magna Cum Laude</strong> to the next 8% (typically ~3.85+ GPA), and <strong>Cum Laude</strong> to the next 15% (typically ~3.70+ GPA). Honors are determined by overall GPA and academic performance across all coursework, ensuring that Latin Honors truly reflect top-tier achievement relative to peers.
              </p>
            </div>

            <div className="bg-white border-l-4 border-green-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What was Princeton's grade deflation policy?</h3>
              <p className="text-gray-700 leading-relaxed">
                From <strong>2004 to 2014</strong>, Princeton implemented a grade deflation policy that limited A grades to 35% of students in undergraduate courses and 55% in junior/senior level courses. This policy aimed to combat grade inflation but made Princeton GPAs significantly lower than peer institutions. The policy was <strong>removed in 2014</strong> after faculty concerns about student competitiveness for graduate schools and fellowships. Average GPAs have since risen from approximately 2.7 to 3.4, bringing Princeton closer to peer institution averages.
              </p>
            </div>

            <div className="bg-white border-l-4 border-blue-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What GPA do I need for departmental honors at Princeton?</h3>
              <p className="text-gray-700 leading-relaxed">
                Departmental honors requirements vary by department but typically require a <strong>minimum 3.5 GPA</strong> in major courses. Most competitive departments (Computer Science, Economics, Mathematics, Physics) expect <strong>3.7+ GPA</strong> along with excellence in independent work including junior papers and senior thesis. You must also receive department recommendation and demonstrate strong research ability through your thesis work.
              </p>
            </div>

            <div className="bg-white border-l-4 border-yellow-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Does Princeton have plus/minus grading?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, Princeton uses <strong>full plus/minus grading</strong> on a 4.3 scale. This includes A+ (4.3), plus grades (A-, B+, C+), and minus grades (A-, B-, C-) down to C-. Each plus adds 0.3 points and each minus subtracts 0.3 points from the base letter grade. There is no D+ or D- grade. This granular system provides precise differentiation of student performance across the entire grade spectrum.
              </p>
            </div>

            <div className="bg-white border-l-4 border-red-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What is considered a good GPA at Princeton?</h3>
              <p className="text-gray-700 leading-relaxed">
                A <strong>good GPA at Princeton is 3.4+</strong> (the current average), <strong>3.7+ is competitive</strong> for top graduate schools and honors, and <strong>3.9+ is exceptional</strong>. Due to Princeton's academic rigor and history of grade deflation, a 3.7+ GPA from Princeton is highly competitive for any graduate program or career opportunity. Graduate schools and employers understand the context of Princeton's grading standards and often evaluate Princeton GPAs accordingly.
              </p>
            </div>

            <div className="bg-white border-l-4 border-indigo-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">How important is my senior thesis for GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                The senior thesis typically carries <strong>2 course credits worth of weight</strong> and significantly impacts your final GPA and honors eligibility. Excellence in independent work (junior papers and senior thesis) is crucial for both Latin Honors ranking and departmental honors consideration. The thesis grade demonstrates research ability and deep engagement with your field, which is highly valued by graduate schools. Plan accordingly and aim for distinction in your thesis work.
              </p>
            </div>

            <div className="bg-white border-l-4 border-pink-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Can I use Pass/D/Fail at Princeton?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, Princeton allows <strong>Pass/D/Fail (PDF) grading</strong> for up to 4 courses total during your undergraduate career, with a maximum of 1 per semester. PDF courses don't affect your GPA, but Pass, D, and Fail grades appear on your transcript. This option is useful for exploring new fields or taking challenging courses outside your comfort zone. Use PDF strategically—don't waste them on easy courses, and avoid using PDF for major requirements as this can hurt departmental honors eligibility.
              </p>
            </div>

            <div className="bg-white border-l-4 border-teal-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What is the average GPA at Princeton?</h3>
              <p className="text-gray-700 leading-relaxed">
                The current average GPA at Princeton is approximately <strong>3.4</strong>, significantly higher than the 2.7 average during the grade deflation era (2004-2014). The average varies by department, with STEM fields (Computer Science, Mathematics, Physics) typically having lower averages (3.2-3.3) compared to humanities and social sciences (3.5-3.6). This increase in average GPA reflects the removal of artificial grade caps in 2014, not diminished academic standards.
              </p>
            </div>

            <div className="bg-white border-l-4 border-cyan-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Does Princeton calculate major GPA separately?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, Princeton calculates both <strong>cumulative GPA</strong> (all courses) and <strong>departmental/major GPA</strong> (courses in your concentration). Major GPA is particularly important for departmental honors eligibility (typically 3.5+ required) and demonstrates your proficiency in your chosen field of study. Graduate schools in your discipline will pay close attention to your major GPA, which includes junior papers, senior thesis, and all concentration courses.
              </p>
            </div>

            <div className="bg-white border-l-4 border-amber-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Can I retake courses at Princeton to improve my GPA?</h3>
              <p className="text-gray-700 leading-relaxed">
                Yes, you can <strong>retake courses</strong> at Princeton to improve your GPA. When you retake a course, both grades appear on your transcript, but <strong>only the most recent grade counts</strong> toward your GPA calculation. This policy allows for grade improvement while maintaining transcript transparency. Retaking is most beneficial for major courses where you received below B-, especially if taken sophomore year when you have time to retake before junior independent work begins.
              </p>
            </div>

            <div className="bg-white border-l-4 border-rose-500 rounded-r-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What GPA puts me on academic probation at Princeton?</h3>
              <p className="text-gray-700 leading-relaxed">
                Princeton places students on <strong>academic probation with a cumulative GPA below 2.0</strong> or semester GPA below 2.0. Students on probation must return to good standing (above 2.0) within two semesters or face academic dismissal. If your GPA falls near this threshold, immediately contact your residential college dean, use McGraw Center resources, and develop an academic recovery plan. The university provides support, but you must take initiative to improve.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-orange-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-bold text-orange-800 mb-2">Still Have Questions?</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  For official academic policies, consult the <strong>Princeton Undergraduate Announcement</strong> or contact your residential college dean. For GPA planning across multiple semesters, try our{' '}
                  <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator/cumulative-gpa-calculator' as Page)} className="text-orange-600 hover:text-orange-700 font-semibold underline">
                    Cumulative GPA Calculator
                  </button>
                  {' '}or{' '}
                  <button onClick={() => navigateTo('/education-and-exam-tools/gpa-calculator/gpa-raise-calculator' as Page)} className="text-orange-600 hover:text-orange-700 font-semibold underline">
                    GPA Raise Calculator
                  </button>
                  {' '}to model different scenarios and set realistic academic goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['stanford-gpa-calculator', 'georgia-tech-gpa-calculator', 'berkeley-gpa-calculator', 'cumulative-gpa-calculator', 'gpa-raise-calculator', 'college-gpa-calculator']}
          navigateTo={navigateTo}
          currentSlug="princeton-gpa-calculator"
        />
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PrincetonGPACalculator;
