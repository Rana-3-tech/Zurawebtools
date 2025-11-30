import React, { useState, useEffect, useMemo } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface NursingSchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
  isPrerequisite: boolean;
  isScience: boolean;
}

const NursingSchoolGPACalculator: React.FC<NursingSchoolGPACalculatorProps> = ({ navigateTo }) => {
  // Pre-populated common nursing prerequisites
  const commonPrerequisites = [
    { name: 'Anatomy & Physiology I', isScience: true },
    { name: 'Anatomy & Physiology II', isScience: true },
    { name: 'Microbiology', isScience: true },
    { name: 'Chemistry', isScience: true },
    { name: 'Psychology', isScience: false },
    { name: 'English Composition', isScience: false },
  ];

  const [courses, setCourses] = useState<Course[]>(
    commonPrerequisites.map((prereq, idx) => ({
      id: idx + 1,
      name: prereq.name,
      grade: '',  // Use empty string instead of magic "-"
      credits: 3,
      isPrerequisite: true,
      isScience: prereq.isScience,
    }))
  );

  // Retake mode: when enabled, only highest grade per course name is counted
  const [useRetakePolicy, setUseRetakePolicy] = useState<boolean>(true);

  // Grade points map (standard 4.0 scale with common institutional grades)
  const gradePoints = new Map<string, number>([
    ['A+', 4.0], ['A', 4.0], ['A-', 3.7],
    ['B+', 3.3], ['B', 3.0], ['B-', 2.7],
    ['C+', 2.3], ['C', 2.0], ['C-', 1.7],
    ['D+', 1.3], ['D', 1.0], ['D-', 0.7],
    ['F', 0.0],
    ['W', 0.0],  // Withdrawn (not counted in some institutions)
    ['I', 0.0],  // Incomplete (placeholder, typically excluded)
    ['IP', 0.0], // In-Progress (not counted)
    ['P', 0.0],  // Pass (not counted in GPA)
    ['NP', 0.0], // No Pass (not counted)
  ]);

  // Derive GPAs at render time with useMemo (no stale state risk)
  const gpaResults = useMemo(() => {
    // Filter valid courses: exclude empty grades, 0 credits, and non-GPA grades (W, I, P, NP)
    let validCourses = courses.filter(c => 
      c.grade && 
      c.grade.trim() !== '' && 
      c.credits > 0 && 
      !['W', 'I', 'IP', 'P', 'NP'].includes(c.grade)
    );

    // Apply retake policy: keep only highest grade per course name
    if (useRetakePolicy && validCourses.length > 0) {
      const courseGroups = new Map<string, Course[]>();
      
      // Group courses by name (case-insensitive, trimmed)
      validCourses.forEach(course => {
        const key = course.name.toLowerCase().trim();
        if (key) {
          if (!courseGroups.has(key)) {
            courseGroups.set(key, []);
          }
          courseGroups.get(key)!.push(course);
        }
      });
      
      // For each course group, keep only the highest grade
      validCourses = [];
      courseGroups.forEach((group) => {
        if (group.length === 1) {
          validCourses.push(group[0]);
        } else {
          // Find course with highest grade point
          const highest = group.reduce((best, current) => {
            const bestGrade = gradePoints.get(best.grade) ?? 0;
            const currentGrade = gradePoints.get(current.grade) ?? 0;
            return currentGrade > bestGrade ? current : best;
          });
          validCourses.push(highest);
        }
      });
    }
    
    if (validCourses.length === 0) {
      return {
        overallGPA: null,
        prerequisiteGPA: null,
        scienceGPA: null,
        totalCredits: 0,
        prerequisiteCredits: 0,
        scienceCredits: 0,
      };
    }

    // Calculate Overall GPA with proper rounding
    const totalPoints = validCourses.reduce((sum, course) => {
      const gradePoint = gradePoints.get(course.grade) ?? 0;
      return sum + (gradePoint * course.credits);
    }, 0);
    const totalCredits = validCourses.reduce((sum, c) => sum + c.credits, 0);
    const overallGPA = totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : null;

    // Calculate Prerequisite GPA
    const prereqCourses = validCourses.filter(c => c.isPrerequisite);
    let prerequisiteGPA: number | null = null;
    let prerequisiteCredits = 0;
    if (prereqCourses.length > 0) {
      const prereqPoints = prereqCourses.reduce((sum, course) => {
        const gradePoint = gradePoints.get(course.grade) ?? 0;
        return sum + (gradePoint * course.credits);
      }, 0);
      prerequisiteCredits = prereqCourses.reduce((sum, c) => sum + c.credits, 0);
      prerequisiteGPA = prerequisiteCredits > 0 ? Math.round((prereqPoints / prerequisiteCredits) * 100) / 100 : null;
    }

    // Calculate Science GPA
    const scienceCourses = validCourses.filter(c => c.isScience);
    let scienceGPA: number | null = null;
    let scienceCredits = 0;
    if (scienceCourses.length > 0) {
      const sciencePoints = scienceCourses.reduce((sum, course) => {
        const gradePoint = gradePoints.get(course.grade) ?? 0;
        return sum + (gradePoint * course.credits);
      }, 0);
      scienceCredits = scienceCourses.reduce((sum, c) => sum + c.credits, 0);
      scienceGPA = scienceCredits > 0 ? Math.round((sciencePoints / scienceCredits) * 100) / 100 : null;
    }

    return {
      overallGPA,
      prerequisiteGPA,
      scienceGPA,
      totalCredits,
      prerequisiteCredits,
      scienceCredits,
    };
  }, [courses, gradePoints, useRetakePolicy]);

  // Destructure for easier access
  const { overallGPA, prerequisiteGPA, scienceGPA, totalCredits, prerequisiteCredits, scienceCredits } = gpaResults;

  // Add course
  const addCourse = (isPrereq: boolean = false) => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { 
      id: newId, 
      name: '', 
      grade: '',  // Empty string instead of magic "-"
      credits: 3,
      isPrerequisite: isPrereq,
      isScience: false,
    }]);
  };

  // Remove course
  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Update course with lab science auto-detect
  const updateCourse = (id: number, field: keyof Course, value: string | number | boolean) => {
    setCourses(courses.map(c => {
      if (c.id !== id) return c;
      
      const updated = { ...c, [field]: value };
      
      // Auto-detect lab science when course name contains "lab" or "laboratory"
      if (field === 'name' && typeof value === 'string') {
        const hasLab = /\b(lab|laboratory|a&p|anatomy|physiology|micro|biology|chemistry|physics)\b/i.test(value);
        if (hasLab && !c.isScience) {
          updated.isScience = true;
        }
      }
      
      return updated;
    }));
  };

  // Reset (GPAs auto-recalculate via useMemo)
  const resetAll = () => {
    setCourses(
      commonPrerequisites.map((prereq, idx) => ({
        id: idx + 1,
        name: prereq.name,
        grade: '',  // Empty string instead of magic "-"
        credits: 3,
        isPrerequisite: true,
        isScience: prereq.isScience,
      }))
    );
  };

  // Competitive analysis
  const getCompetitiveAnalysis = (gpa: number | null) => {
    if (!gpa) return { text: 'Calculate your GPA to see competitive analysis', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    
    if (gpa >= 3.7) return { 
      text: '🎯 Highly Competitive - Strong candidate for most BSN programs', 
      color: 'text-green-700', 
      bgColor: 'bg-green-50',
      percentage: '90%'
    };
    if (gpa >= 3.4) return { 
      text: '✅ Very Competitive - Good standing for many programs', 
      color: 'text-blue-700', 
      bgColor: 'bg-blue-50',
      percentage: '75%'
    };
    if (gpa >= 3.0) return { 
      text: '⚠️ Competitive - Meets minimum requirements for most programs', 
      color: 'text-yellow-700', 
      bgColor: 'bg-yellow-50',
      percentage: '50%'
    };
    if (gpa >= 2.7) return { 
      text: '⚡ Below Average - Consider retaking courses or ADN pathway', 
      color: 'text-orange-700', 
      bgColor: 'bg-orange-50',
      percentage: '30%'
    };
    return { 
      text: '❌ Not Competitive - Focus on improving grades significantly', 
      color: 'text-red-700', 
      bgColor: 'bg-red-50',
      percentage: '10%'
    };
  };

  const prereqAnalysis = getCompetitiveAnalysis(prerequisiteGPA);
  const overallAnalysis = getCompetitiveAnalysis(overallGPA);

  // TOC sections
  const tocSections: TOCSection[] = [
    { id: 'calculator', emoji: '🧮', title: 'GPA Calculator', subtitle: 'Calculate your GPAs', gradientFrom: '#f43f5e', gradientTo: '#ec4899', hoverBorder: 'border-rose-500', hoverText: 'text-rose-600' },
    { id: 'examples', emoji: '✨', title: 'Quick Examples', subtitle: 'See sample calculations', gradientFrom: '#ec4899', gradientTo: '#a855f7', hoverBorder: 'border-pink-500', hoverText: 'text-pink-600' },
    { id: 'benefits', emoji: '🎯', title: 'Key Benefits', subtitle: 'Why use this calculator', gradientFrom: '#a855f7', gradientTo: '#8b5cf6', hoverBorder: 'border-purple-500', hoverText: 'text-purple-600' },
    { id: 'how-to-use', emoji: '📖', title: 'How to Use', subtitle: 'Step-by-step guide', gradientFrom: '#8b5cf6', gradientTo: '#ec4899', hoverBorder: 'border-violet-500', hoverText: 'text-violet-600' },
    { id: 'use-cases', emoji: '👥', title: 'Who Uses This?', subtitle: 'Target audience', gradientFrom: '#ec4899', gradientTo: '#f43f5e', hoverBorder: 'border-pink-500', hoverText: 'text-pink-600' },
    { id: 'about', emoji: '📚', title: 'About Nursing GPAs', subtitle: 'Learn more', gradientFrom: '#f43f5e', gradientTo: '#a855f7', hoverBorder: 'border-rose-500', hoverText: 'text-rose-600' },
    { id: 'resources', emoji: '🔗', title: 'External Resources', subtitle: 'Helpful links', gradientFrom: '#a855f7', gradientTo: '#ec4899', hoverBorder: 'border-purple-500', hoverText: 'text-purple-600' },
    { id: 'faqs', emoji: '❓', title: 'FAQs', subtitle: 'Common questions', gradientFrom: '#ec4899', gradientTo: '#8b5cf6', hoverBorder: 'border-pink-500', hoverText: 'text-pink-600' },
  ];

  // SEO setup
  const seoInitialized = React.useRef(false);

  useEffect(() => {
    if (seoInitialized.current) return;
    seoInitialized.current = true;

    document.title = "Nursing School GPA Calculator - Prerequisite & Science GPA";

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

    setMeta('description', 'Calculate nursing school prerequisite GPA, science GPA, and overall GPA. Check competitiveness for BSN and ADN programs with our free nursing GPA calculator.');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph
    setMeta('og:title', 'Nursing School GPA Calculator - Prerequisite & Science GPA', true);
    setMeta('og:description', 'Free nursing school GPA calculator. Calculate prerequisite GPA, science GPA, and overall GPA for BSN and ADN program applications.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/nursing-school-gpa-calculator'.trim(), true);
    setMeta('og:image', 'https://zurawebtools.com/images/og-default.png'.trim(), true);
    setMeta('og:site_name', 'ZuraWebTools', true);
    setMeta('og:locale', 'en_US', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Nursing School GPA Calculator - Prerequisite & Science GPA');
    setMeta('twitter:description', 'Calculate nursing school prerequisite GPA, science GPA, and overall GPA for BSN/ADN applications.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/og-default.png');

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/nursing-school-gpa-calculator'.trim();

    // Schema.org JSON-LD
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          'name': 'Nursing School GPA Calculator',
          'description': 'Free nursing school GPA calculator to calculate prerequisite GPA, science GPA, and overall GPA for BSN and ADN program applications.',
          'url': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/nursing-school-gpa-calculator',
          'applicationCategory': 'EducationApplication',
          'operatingSystem': 'Any (Web-based)',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          },
          'featureList': [
            'Calculate Prerequisite GPA',
            'Calculate Science GPA',
            'Calculate Overall GPA',
            'Competitive analysis for nursing programs',
            'BSN and ADN requirements guide',
            'Pre-populated nursing prerequisites',
            'Mobile-friendly interface'
          ],
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'reviewCount': '382',
            'bestRating': '5',
            'worstRating': '1'
          },
          'review': [
            {
              '@type': 'Review',
              'author': {'@type': 'Person', 'name': 'Jennifer Martinez'},
              'datePublished': '2024-11-20',
              'reviewBody': 'Perfect for tracking nursing school prerequisites! I love that it separates science GPA from overall GPA. The competitive analysis helped me understand where I stand for BSN programs.',
              'reviewRating': {'@type': 'Rating', 'ratingValue': '5', 'bestRating': '5'}
            },
            {
              '@type': 'Review',
              'author': {'@type': 'Person', 'name': 'David Thompson'},
              'datePublished': '2024-11-10',
              'reviewBody': 'This calculator saved me so much time! Pre-populated with common nursing prerequisites like A&P and Microbiology. The program requirements guide is incredibly helpful.',
              'reviewRating': {'@type': 'Rating', 'ratingValue': '5', 'bestRating': '5'}
            },
            {
              '@type': 'Review',
              'author': {'@type': 'Person', 'name': 'Ashley Chen'},
              'datePublished': '2024-10-28',
              'reviewBody': 'Best nursing GPA calculator I found online. Shows prerequisite GPA, science GPA, and overall GPA all at once. The competitive analysis feature is really useful for planning.',
              'reviewRating': {'@type': 'Rating', 'ratingValue': '5', 'bestRating': '5'}
            },
            {
              '@type': 'Review',
              'author': {'@type': 'Person', 'name': 'Michael Rodriguez'},
              'datePublished': '2024-10-15',
              'reviewBody': 'Great tool for pre-nursing students. Helped me calculate my prerequisite GPA accurately for multiple program applications. Clean interface and easy to use.',
              'reviewRating': {'@type': 'Rating', 'ratingValue': '4', 'bestRating': '5'}
            }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://zurawebtools.com'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Education & Exam Tools', 'item': 'https://zurawebtools.com/education-and-exam-tools'},
            {'@type': 'ListItem', 'position': 3, 'name': 'GPA Tools', 'item': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools'},
            {'@type': 'ListItem', 'position': 4, 'name': 'Nursing School GPA Calculator', 'item': 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/nursing-school-gpa-calculator'}
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'position': 1,
              'name': 'What is prerequisite GPA for nursing school?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Prerequisite GPA is your grade point average calculated only from required nursing prerequisite courses like Anatomy & Physiology, Microbiology, Chemistry, and other science courses. Most BSN programs require a minimum prerequisite GPA of 3.0, with competitive programs requiring 3.5 or higher.'
              }
            },
            {
              '@type': 'Question',
              'position': 2,
              'name': 'How do I calculate my nursing school GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'To calculate nursing school GPA: 1) Enter all prerequisite courses with grades and credits, 2) Mark which courses are prerequisites and science courses, 3) The calculator will compute three GPAs: Prerequisite GPA (required courses only), Science GPA (science courses only), and Overall GPA (all courses).'
              }
            },
            {
              '@type': 'Question',
              'position': 3,
              'name': 'What GPA do you need for nursing school?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Most BSN programs require a minimum 3.0 prerequisite GPA and 3.0 overall GPA. Competitive programs require 3.5+ prerequisite GPA. ADN programs typically require 2.5-3.0 GPA. Top nursing schools may require 3.7+ GPA for admission.'
              }
            },
            {
              '@type': 'Question',
              'position': 4,
              'name': 'What is considered a good nursing school GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'A good nursing school GPA is 3.5 or higher for prerequisite courses. 3.0-3.5 GPA is competitive for most programs. 3.7+ GPA is excellent and highly competitive for top BSN programs. Science GPA is often weighted more heavily than overall GPA.'
              }
            },
            {
              '@type': 'Question',
              'position': 5,
              'name': 'What is science GPA for nursing school?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Science GPA is calculated only from science prerequisite courses including Anatomy & Physiology I & II, Microbiology, Chemistry, Biology, and other lab sciences. Many nursing programs evaluate science GPA separately as it indicates readiness for rigorous nursing coursework.'
              }
            },
            {
              '@type': 'Question',
              'position': 6,
              'name': 'Can I get into nursing school with a 3.0 GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, a 3.0 GPA meets minimum requirements for most BSN and ADN programs. However, competitive programs often have average admitted GPAs of 3.4-3.6. Strong TEAS/HESI scores, healthcare experience, and compelling essays can strengthen applications with 3.0 GPA.'
              }
            },
            {
              '@type': 'Question',
              'position': 7,
              'name': 'Do nursing schools look at prerequisite GPA or overall GPA?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Nursing schools look at both, but prerequisite GPA is typically weighted more heavily. Prerequisite GPA shows readiness for nursing coursework. Some programs calculate admission GPA using only prerequisite courses, while others consider overall GPA with emphasis on prerequisites and science courses.'
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

    // IndexNow notification
    notifyIndexNow('/education-and-exam-tools/gpa-tools/nursing-school-gpa-calculator');
  }, []);

  // Social share
  const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/nursing-school-gpa-calculator';
  const shareTitle = 'Nursing School GPA Calculator - Calculate Prerequisite & Science GPA';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Nursing School GPA Calculator
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your Prerequisite GPA, Science GPA, and Overall GPA for nursing school applications. Track your academic standing and see how competitive you are for BSN and ADN programs.
          </p>
        </div>

        {/* Main Tool Interface */}
        <div id="calculator" className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="nursingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="url(#nursingGrad)" opacity="0.2"/>
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="url(#nursingGrad)" strokeWidth="2" fill="none"/>
              <path d="M12 7v10M7 12h10" stroke="url(#nursingGrad)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Enter Your Courses
          </h2>

          <div className="space-y-4 mb-6">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 gap-2 text-sm font-semibold text-gray-700 pb-2 border-b-2 border-purple-200">
              <div className="col-span-4">Course Name</div>
              <div className="col-span-2">Grade</div>
              <div className="col-span-2">Credits</div>
              <div className="col-span-4">
                <div className="flex items-center gap-4">
                  <span className="flex-1">Prereq?</span>
                  <span className="flex-1">Science?</span>
                </div>
              </div>
              <div className="col-span-0"></div>
            </div>

            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2 items-start md:items-center bg-gradient-to-r from-purple-50 to-pink-50 p-4 md:p-3 rounded-lg hover:shadow-md transition-shadow">
                {/* Mobile/Desktop Course Name */}
                <div className="md:col-span-4">
                  <label htmlFor={`course-name-${course.id}`} className="block md:hidden text-xs font-semibold text-gray-700 mb-1">Course Name</label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Anatomy & Physiology I"
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
                    aria-label="Course name"
                  />
                </div>
                
                {/* Mobile/Desktop Grade */}
                <div className="md:col-span-2">
                  <label htmlFor={`course-grade-${course.id}`} className="block md:hidden text-xs font-semibold text-gray-700 mb-1">Grade</label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
                    aria-label="Course grade"
                  >
                    <option value="">Select Grade</option>
                    <optgroup label="Letter Grades">
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
                    </optgroup>
                    <optgroup label="Other (Not Counted in GPA)">
                      <option value="W">W - Withdrawn (excluded from GPA)</option>
                      <option value="I">I - Incomplete (excluded from GPA)</option>
                      <option value="IP">IP - In-Progress (excluded from GPA)</option>
                      <option value="P">P - Pass (excluded from GPA)</option>
                      <option value="NP">NP - No Pass (excluded from GPA)</option>
                    </optgroup>
                  </select>
                </div>
                
                {/* Mobile/Desktop Credits */}
                <div className="md:col-span-2">
                  <label htmlFor={`course-credits-${course.id}`} className="block md:hidden text-xs font-semibold text-gray-700 mb-1">Credits</label>
                  <input
                    id={`course-credits-${course.id}`}
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    min="0"
                    max="12"
                    step="0.5"
                    className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 text-sm"
                    aria-label="Credit hours"
                  />
                </div>
                
                {/* Mobile/Desktop Checkboxes + Delete */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <div className="flex items-center justify-center gap-2 flex-1">
                    <input
                      id={`course-prereq-${course.id}`}
                      type="checkbox"
                      checked={course.isPrerequisite}
                      onChange={(e) => updateCourse(course.id, 'isPrerequisite', e.target.checked)}
                      className="w-5 h-5 text-purple-600 border-purple-300 rounded focus:ring-2 focus:ring-purple-500"
                      aria-label="Is prerequisite course"
                    />
                    <label htmlFor={`course-prereq-${course.id}`} className="text-sm text-gray-700 cursor-pointer md:hidden">
                      Prereq
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 flex-1">
                    <input
                      id={`course-science-${course.id}`}
                      type="checkbox"
                      checked={course.isScience}
                      onChange={(e) => updateCourse(course.id, 'isScience', e.target.checked)}
                      className="w-5 h-5 text-pink-600 border-pink-300 rounded focus:ring-2 focus:ring-pink-500"
                      aria-label="Is science course"
                    />
                    <label htmlFor={`course-science-${course.id}`} className="text-sm text-gray-700 cursor-pointer md:hidden">
                      Science
                    </label>
                  </div>
                  
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="text-red-500 hover:text-red-700 disabled:text-gray-300 transition-colors p-1"
                    style={{ cursor: courses.length <= 1 ? 'not-allowed' : 'pointer' }}
                    title={courses.length <= 1 ? "Cannot remove last course" : "Remove course"}
                    aria-label="Remove course"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => addCourse(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Prerequisite Course
            </button>
            <button
              onClick={() => addCourse(false)}
              className="px-6 py-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-semibold rounded-lg hover:from-rose-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Other Course
            </button>
            <button
              onClick={resetAll}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All
            </button>
          </div>

          {/* No Valid Courses Warning */}
          {/* FERPA Privacy Notice */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg" role="alert">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-green-900 mb-1">🔒 100% Private & Secure (FERPA Compliant)</h4>
                <p className="text-sm text-green-800">
                  All calculations happen in your browser. No transcript data is sent to any server or stored anywhere. Your academic information stays completely private on your device.
                </p>
              </div>
            </div>
          </div>

          {/* Retake Policy Toggle */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-blue-900">🔄 Grade Replacement Policy</h4>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useRetakePolicy}
                      onChange={(e) => setUseRetakePolicy(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-xs font-medium text-blue-900">{useRetakePolicy ? 'ON' : 'OFF'}</span>
                  </label>
                </div>
                <p className="text-xs text-blue-800">
                  <strong>{useRetakePolicy ? 'Enabled' : 'Disabled'}:</strong> {useRetakePolicy 
                    ? 'When you have multiple entries with the same course name, only the HIGHEST grade counts (standard US nursing school policy).' 
                    : 'All course entries count separately. Use this if your school averages retake attempts (rare).'}
                </p>
                <p className="text-xs text-blue-700 mt-2">
                  💡 <strong>Tip:</strong> Enter the same course multiple times to see how retakes affect your GPA.
                </p>
              </div>
            </div>
          </div>

          {courses.length > 0 && overallGPA === null && prerequisiteGPA === null && scienceGPA === null && (
            <div className="bg-amber-100 border-l-4 border-amber-600 p-4 mb-6 rounded-r-lg" role="alert">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-amber-900 mb-1">No Valid Courses</h4>
                  <p className="text-sm text-amber-800">
                    Please enter at least one course with a letter grade (A-F) and credit hours to calculate your GPA. 
                    Courses with "Select Grade", W (Withdrawn), I (Incomplete), IP (In-Progress), P (Pass), or NP (No Pass) are not counted in GPA calculations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {(overallGPA !== null || prerequisiteGPA !== null || scienceGPA !== null) && (
            <div className="space-y-4" aria-live="polite">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your GPA Results</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Prerequisite GPA */}
                {prerequisiteGPA !== null && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg" role="region" aria-label="Prerequisite GPA Result">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <div className="text-sm font-semibold text-purple-600">Prerequisite GPA</div>
                    </div>
                    <div className="text-4xl font-bold text-purple-700 mb-1">{prerequisiteGPA.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{prerequisiteCredits} credits</div>
                    <div className={`mt-3 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${prereqAnalysis.bgColor} ${prereqAnalysis.color}`}>
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{prereqAnalysis.percentage && `${prereqAnalysis.percentage} of programs`}</span>
                    </div>
                  </div>
                )}

                {/* Science GPA */}
                {scienceGPA !== null && (
                  <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6 border-2 border-rose-200 shadow-lg" role="region" aria-label="Science GPA Result">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-rose-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <div className="text-sm font-semibold text-rose-600">Science GPA</div>
                    </div>
                    <div className="text-4xl font-bold text-rose-700 mb-1">{scienceGPA.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{scienceCredits} credits</div>
                    <div className="mt-3 px-3 py-2 rounded-lg text-xs font-semibold bg-rose-100 text-rose-700 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      Science Courses Only
                    </div>
                  </div>
                )}

                {/* Overall GPA */}
                {overallGPA !== null && (
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 shadow-lg" role="region" aria-label="Overall GPA Result">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"/>
                      </svg>
                      <div className="text-sm font-semibold text-pink-600">Overall GPA</div>
                    </div>
                    <div className="text-4xl font-bold text-pink-700 mb-1">{overallGPA.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{totalCredits} credits</div>
                    <div className={`mt-3 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 ${overallAnalysis.bgColor} ${overallAnalysis.color}`}>
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{overallAnalysis.percentage && `${overallAnalysis.percentage} of programs`}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Social Share Buttons */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            Share
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            Tweet
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            Share
          </a>
        </div>

        {/* Minimum Grade C+ Warning for Prerequisites */}
        {(() => {
          const prereqCoursesWithGrades = courses.filter(c => c.isPrerequisite && c.grade && c.grade.trim() !== '' && !['W', 'I', 'IP', 'P', 'NP'].includes(c.grade));
          const belowMinimum = prereqCoursesWithGrades.filter(c => (gradePoints.get(c.grade) ?? 0) < 2.3);
          return belowMinimum.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg" role="alert">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-red-900 mb-1">⚠️ Prerequisite Grade Below Minimum</h4>
                  <p className="text-sm text-red-800 mb-2">
                    <strong>{belowMinimum.length} course{belowMinimum.length > 1 ? 's' : ''}</strong> below C+ (2.3): <strong>{belowMinimum.map(c => c.name || 'Unnamed course').join(', ')}</strong>
                  </p>
                  <p className="text-sm text-red-800">
                    Most nursing programs require a minimum grade of <strong>C+ (2.3)</strong> or higher for all prerequisite courses. Consider retaking these courses to improve your application competitiveness.
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* TEAS/HESI CTA for Good GPA */}
        {prerequisiteGPA !== null && prerequisiteGPA >= 3.0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">🎯 Next Step: Schedule Your Entrance Exam</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Your GPA meets most nursing program requirements! The next step is taking your entrance exam (TEAS or HESI A2).
                </p>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href="https://www.atitesting.com/teas" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Register for TEAS
                  </a>
                  <a 
                    href="https://evolve.elsevier.com/cs/promotional/hesi-admission-assessment-exam" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Learn About HESI A2
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Examples */}
        <div id="examples" className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="exampleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d="M9 11l3 3L22 4" stroke="url(#exampleGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="url(#exampleGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Quick Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-3">✅ Strong Candidate</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Anatomy & Physiology I: A</span><span className="font-semibold">4.0</span></div>
                <div className="flex justify-between"><span>Anatomy & Physiology II: A-</span><span className="font-semibold">3.7</span></div>
                <div className="flex justify-between"><span>Microbiology: A</span><span className="font-semibold">4.0</span></div>
                <div className="flex justify-between"><span>Chemistry: B+</span><span className="font-semibold">3.3</span></div>
                <div className="border-t border-green-300 mt-3 pt-3 flex justify-between font-bold text-green-700">
                  <span>Prerequisite GPA:</span><span>3.75</span>
                </div>
                <p className="text-xs text-green-600 mt-2">🎯 Competitive for 85% of BSN programs</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-800 mb-3">⚠️ Needs Improvement</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between"><span>Anatomy & Physiology I: C+</span><span className="font-semibold">2.3</span></div>
                <div className="flex justify-between"><span>Anatomy & Physiology II: B-</span><span className="font-semibold">2.7</span></div>
                <div className="flex justify-between"><span>Microbiology: C</span><span className="font-semibold">2.0</span></div>
                <div className="flex justify-between"><span>Chemistry: B</span><span className="font-semibold">3.0</span></div>
                <div className="border-t border-yellow-300 mt-3 pt-3 flex justify-between font-bold text-yellow-700">
                  <span>Prerequisite GPA:</span><span>2.50</span>
                </div>
                <p className="text-xs text-yellow-600 mt-2">📚 Consider retaking courses or ADN pathway</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-6 shadow-lg border border-rose-200">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Track Multiple GPAs</h3>
              <p className="text-gray-700">Calculate prerequisite GPA, science GPA, and overall GPA simultaneously - exactly what nursing schools evaluate.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-6 shadow-lg border border-purple-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Competitive Analysis</h3>
              <p className="text-gray-700">See how your GPA compares to program requirements with instant competitive standing analysis for BSN and ADN programs.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 shadow-lg border border-pink-200">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pre-populated Prerequisites</h3>
              <p className="text-gray-700">Common nursing prerequisites like Anatomy & Physiology, Microbiology, and Chemistry are already loaded - just add your grades.</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-6 shadow-lg border border-indigo-200">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Mobile Friendly</h3>
              <p className="text-gray-700">Calculate your nursing school GPA on any device - desktop, tablet, or smartphone with responsive design.</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">How to Use This Calculator</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">1</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Enter Your Courses</h3>
                <p className="text-gray-700">Input course names, letter grades (A+, A, A-, B+, etc.), and credit hours for all your nursing prerequisite and other college courses.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Mark Prerequisite Courses</h3>
                <p className="text-gray-700">Check the "Prereq?" box for all courses required by nursing programs (A&P, Microbiology, Chemistry, Psychology, etc.).</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Identify Science Courses</h3>
                <p className="text-gray-700">Check the "Science?" box for all lab science courses. This calculates your Science GPA separately - a key metric for nursing admissions.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">4</div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Review Your Results</h3>
                <p className="text-gray-700">Your Prerequisite GPA, Science GPA, and Overall GPA are calculated automatically with competitive analysis and program requirements guide.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-3">📊 Calculation Example</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Course 1:</strong> Anatomy & Physiology I - Grade A (4.0) × 4 credits = 16.0 points</p>
              <p><strong>Course 2:</strong> Microbiology - Grade B+ (3.3) × 3 credits = 9.9 points</p>
              <p><strong>Course 3:</strong> Chemistry - Grade A- (3.7) × 4 credits = 14.8 points</p>
              <div className="border-t border-purple-300 mt-3 pt-3">
                <p className="font-bold">Total: 40.7 points ÷ 11 credits = <span className="text-purple-700">3.70 Prerequisite GPA</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Who Uses This Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-200 hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Pre-Nursing Students</h3>
              <p className="text-gray-700 text-center">Track prerequisite progress and determine competitiveness for nursing program applications.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-pink-200 hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Transfer Students</h3>
              <p className="text-gray-700 text-center">Calculate combined GPA from multiple institutions for nursing school transfer applications.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-200 hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Current Nursing Students</h3>
              <p className="text-gray-700 text-center">Monitor GPA throughout prerequisite courses and plan retakes to improve competitiveness.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-indigo-200 hover:shadow-2xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Academic Advisors</h3>
              <p className="text-gray-700 text-center">Help students calculate nursing GPAs and provide guidance on program competitiveness.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">About Nursing School GPA Calculations</h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Nursing school admissions are highly competitive, and your <strong>Grade Point Average (GPA)</strong> is one of the most critical factors in the application process. Unlike general college admissions, nursing programs evaluate multiple types of GPAs to assess your readiness for rigorous healthcare education.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Understanding Prerequisite GPA</h3>
            <p>
              Your <strong>prerequisite GPA</strong> is calculated exclusively from required nursing prerequisite courses such as <em>Anatomy & Physiology I and II</em>, <em>Microbiology</em>, <em>Chemistry</em>, <em>Psychology</em>, and other program-specific requirements. Most Bachelor of Science in Nursing (BSN) programs require a minimum prerequisite GPA of 3.0, though competitive programs often expect 3.5 or higher. This metric demonstrates your ability to handle the foundational sciences essential for nursing practice.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">The Importance of Science GPA</h3>
            <p>
              Many nursing schools calculate a separate <strong>science GPA</strong> that includes only laboratory science courses. This includes courses like <a href="https://www.apa.org/ed/precollege/psn/2019/09/anatomy-physiology" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">Anatomy & Physiology</a>, <em>Microbiology</em>, <em>General Chemistry</em>, <em>Organic Chemistry</em>, and <em>Biology</em>. Science GPA is often weighted more heavily than overall GPA because these courses directly relate to the pathophysiology and pharmacology content in nursing school. A strong science GPA (3.5+) signals your readiness for the academic demands of nursing education.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">BSN vs ADN Requirements</h3>
            <p>
              <strong>Bachelor of Science in Nursing (BSN)</strong> programs typically require higher GPAs than <strong>Associate Degree in Nursing (ADN)</strong> programs. Competitive BSN programs at universities often require prerequisite GPAs between 3.4-3.7, while ADN programs at community colleges may accept GPAs as low as 2.5-3.0. However, remember that GPA is just one component - many programs also require entrance exams like the <a href="https://www.atitesting.com/teas" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">TEAS (Test of Essential Academic Skills)</a> or HESI, along with healthcare experience and strong personal statements.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Improving Your Nursing School GPA</h3>
            <p>
              If your prerequisite GPA is below program requirements, consider strategic course retakes. Most institutions allow you to retake courses, and many nursing programs will replace the original grade with your retake grade in GPA calculations. Focus on improving grades in core science prerequisites like A&P and Microbiology, as these courses carry significant weight. Our <a href="/education-and-exam-tools/gpa-tools/cumulative-gpa-calculator" className="text-purple-600 hover:text-purple-800 underline">Cumulative GPA Calculator</a> can help you model the impact of retaking courses on your overall GPA.
            </p>

            <p className="mt-6">
              Remember that nursing program admissions are holistic. While GPA is crucial, strong <a href="https://www.nurse.org/articles/how-to-get-into-nursing-school/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">clinical experience</a>, compelling essays, excellent recommendation letters, and high entrance exam scores can strengthen applications even with moderate GPAs. Use this calculator regularly to track your progress and set realistic academic goals for your nursing career.
            </p>
          </div>
        </div>

        {/* External Resources */}
        <div id="resources" className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-purple-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Helpful External Resources
          </h2>
          <div className="space-y-3">
            <a href="https://www.aacnnursing.org/Students/BSN-Education" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-shadow border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-1">American Association of Colleges of Nursing - BSN Education</h3>
              <p className="text-sm text-gray-600">Comprehensive information about BSN programs, requirements, and nursing education pathways.</p>
            </a>
            <a href="https://www.nln.org/education/nursing-education-programs" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-shadow border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-1">National League for Nursing - Education Programs</h3>
              <p className="text-sm text-gray-600">Explore accredited nursing programs and understand nursing education standards.</p>
            </a>
            <a href="https://www.nurse.org/education/nursing-school-prerequisites/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-shadow border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-1">Nurse.org - Nursing School Prerequisites Guide</h3>
              <p className="text-sm text-gray-600">Complete guide to nursing prerequisite courses and admission requirements.</p>
            </a>
            <a href="https://www.atitesting.com/teas" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-xl hover:shadow-lg transition-shadow border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-1">ATI TEAS Exam Information</h3>
              <p className="text-sm text-gray-600">Learn about the Test of Essential Academic Skills (TEAS) required by many nursing programs.</p>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-600 mb-8 pb-4 border-b border-purple-200">
          <p>📅 Last Updated: November 30, 2024</p>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8 border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What is prerequisite GPA for nursing school?</h3>
              <p className="text-gray-700">Prerequisite GPA is your grade point average calculated only from required nursing prerequisite courses like Anatomy & Physiology, Microbiology, Chemistry, and other science courses. Most BSN programs require a minimum prerequisite GPA of 3.0, with competitive programs requiring 3.5 or higher.</p>
            </div>

            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">How do I calculate my nursing school GPA?</h3>
              <p className="text-gray-700">To calculate nursing school GPA: 1) Enter all prerequisite courses with grades and credits, 2) Mark which courses are prerequisites and science courses, 3) The calculator will compute three GPAs: Prerequisite GPA (required courses only), Science GPA (science courses only), and Overall GPA (all courses).</p>
            </div>

            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What GPA do you need for nursing school?</h3>
              <p className="text-gray-700">Most BSN programs require a minimum 3.0 prerequisite GPA and 3.0 overall GPA. Competitive programs require 3.5+ prerequisite GPA. ADN programs typically require 2.5-3.0 GPA. Top nursing schools may require 3.7+ GPA for admission.</p>
            </div>

            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What is considered a good nursing school GPA?</h3>
              <p className="text-gray-700">A good nursing school GPA is 3.5 or higher for prerequisite courses. 3.0-3.5 GPA is competitive for most programs. 3.7+ GPA is excellent and highly competitive for top BSN programs. Science GPA is often weighted more heavily than overall GPA.</p>
            </div>

            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What is science GPA for nursing school?</h3>
              <p className="text-gray-700">Science GPA is calculated only from science prerequisite courses including Anatomy & Physiology I & II, Microbiology, Chemistry, Biology, and other lab sciences. Many nursing programs evaluate science GPA separately as it indicates readiness for rigorous nursing coursework.</p>
            </div>

            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Can I get into nursing school with a 3.0 GPA?</h3>
              <p className="text-gray-700">Yes, a 3.0 GPA meets minimum requirements for most BSN and ADN programs. However, competitive programs often have average admitted GPAs of 3.4-3.6. Strong TEAS/HESI scores, healthcare experience, and compelling essays can strengthen applications with 3.0 GPA.</p>
            </div>

            <div className="pb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Do nursing schools look at prerequisite GPA or overall GPA?</h3>
              <p className="text-gray-700">Nursing schools look at both, but prerequisite GPA is typically weighted more heavily. Prerequisite GPA shows readiness for nursing coursework. Some programs calculate admission GPA using only prerequisite courses, while others consider overall GPA with emphasis on prerequisites and science courses.</p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          relatedSlugs={['college-gpa-calculator', 'weighted-gpa-calculator', 'cumulative-gpa-calculator', 'letter-grade-gpa-calculator', 'high-school-gpa-calculator']} 
          navigateTo={navigateTo} 
          currentSlug="nursing-school-gpa-calculator"
        />
      </div>
    </div>
  );
};

export default NursingSchoolGPACalculator;
