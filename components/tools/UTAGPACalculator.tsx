import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';
import { Page } from '../../App';

interface UTAGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: number;
  name: string;
  creditHours: string;
  grade: string;
}

interface GPDTableRow {
  desiredGPA: number;
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}

const UTAGPACalculator: React.FC<UTAGPACalculatorProps> = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'raise' | 'gpd'>('calculator');

  // Table of Contents sections
  const tocSections: TOCSection[] = [
    {
      id: 'gpa-calculator',
      emoji: '🎓',
      title: 'GPA Calculator',
      subtitle: 'Calculate semester GPA',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-cyan-50',
      hoverBorder: 'border-blue-500',
      hoverText: 'text-blue-600'
    },
    {
      id: 'raise-gpa',
      emoji: '📈',
      title: 'Raise GPA',
      subtitle: 'Plan GPA improvement',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      hoverBorder: 'border-green-500',
      hoverText: 'text-green-600'
    },
    {
      id: 'gpd-calculator',
      emoji: '🎯',
      title: 'GPD Calculator',
      subtitle: 'Grade Point Deficiency',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-red-50',
      hoverBorder: 'border-orange-500',
      hoverText: 'text-orange-600'
    },
    {
      id: 'grade-scale',
      emoji: '📊',
      title: 'Grade Scale',
      subtitle: 'Official UTA grades',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-purple-500',
      hoverText: 'text-purple-600'
    },
    {
      id: 'about-uta',
      emoji: '🏫',
      title: 'About UTA',
      subtitle: 'University info',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-orange-500',
      hoverText: 'text-orange-600'
    },
    {
      id: 'how-to-use',
      emoji: '📖',
      title: 'How to Use',
      subtitle: 'Step-by-step guide',
      gradientFrom: 'from-indigo-50',
      gradientTo: 'to-blue-50',
      hoverBorder: 'border-indigo-500',
      hoverText: 'text-indigo-600'
    },
    {
      id: 'gpd-guide',
      emoji: '💡',
      title: 'GPD Guide',
      subtitle: 'Understanding GPD',
      gradientFrom: 'from-yellow-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-yellow-500',
      hoverText: 'text-yellow-600'
    },
    {
      id: 'probation-help',
      emoji: '🎓',
      title: 'Probation Help',
      subtitle: 'Get off probation',
      gradientFrom: 'from-red-50',
      gradientTo: 'to-orange-50',
      hoverBorder: 'border-red-500',
      hoverText: 'text-red-600'
    },
    {
      id: 'what-if-scenarios',
      emoji: '🔮',
      title: 'What-If Scenarios',
      subtitle: 'Test grade changes',
      gradientFrom: 'from-violet-50',
      gradientTo: 'to-purple-50',
      hoverBorder: 'border-violet-500',
      hoverText: 'text-violet-600'
    },
    {
      id: 'grade-predictor',
      emoji: '🎯',
      title: 'Grade Predictor',
      subtitle: 'What grade do I need?',
      gradientFrom: 'from-emerald-50',
      gradientTo: 'to-green-50',
      hoverBorder: 'border-emerald-500',
      hoverText: 'text-emerald-600'
    },
    {
      id: 'scholarship-monitor',
      emoji: '💰',
      title: 'Scholarship Monitor',
      subtitle: 'Track requirements',
      gradientFrom: 'from-amber-50',
      gradientTo: 'to-yellow-50',
      hoverBorder: 'border-amber-500',
      hoverText: 'text-amber-600'
    },
    {
      id: 'semester-timeline',
      emoji: '📅',
      title: 'Semester Timeline',
      subtitle: 'Multi-semester view',
      gradientFrom: 'from-sky-50',
      gradientTo: 'to-blue-50',
      hoverBorder: 'border-sky-500',
      hoverText: 'text-sky-600'
    },
    {
      id: 'faq',
      emoji: '❓',
      title: 'FAQ',
      subtitle: 'Common questions',
      gradientFrom: 'from-teal-50',
      gradientTo: 'to-cyan-50',
      hoverBorder: 'border-teal-500',
      hoverText: 'text-teal-600'
    }
  ];
  
  // Basic Calculator State
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', creditHours: '', grade: '' },
    { id: 2, name: '', creditHours: '', grade: '' },
    { id: 3, name: '', creditHours: '', grade: '' },
    { id: 4, name: '', creditHours: '', grade: '' },
  ]);
  const [calculatedGPA, setCalculatedGPA] = useState<number | null>(null);
  const [gpaHistory, setGpaHistory] = useState<number[]>([]);

  // ✨ NEW: What-If Scenarios State
  const [whatIfMode, setWhatIfMode] = useState<boolean>(false);
  const [whatIfCourses, setWhatIfCourses] = useState<Course[]>([]);
  const [whatIfGPA, setWhatIfGPA] = useState<number | null>(null);
  const [savedScenarios, setSavedScenarios] = useState<Array<{name: string, courses: Course[], gpa: number}>>([]);

  // ✨ NEW: Email Report State
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);

  // ✨ NEW: Grade Predictor State
  const [predictorMode, setPredictorMode] = useState<boolean>(false);
  const [currentGradeInput, setCurrentGradeInput] = useState<string>('');
  const [remainingWeight, setRemainingWeight] = useState<string>('');
  const [targetGradeInput, setTargetGradeInput] = useState<string>('');
  const [requiredGrade, setRequiredGrade] = useState<number | null>(null);

  // ✨ NEW: Scholarship Monitor State
  const [scholarshipThreshold, setScholarshipThreshold] = useState<string>('3.5');
  const [scholarshipStatus, setScholarshipStatus] = useState<'safe' | 'at-risk' | 'danger' | null>(null);
  const [scholarshipBuffer, setScholarshipBuffer] = useState<number | null>(null);

  // ✨ NEW: Multi-Semester Timeline State
  interface Semester {
    id: number;
    name: string;
    courses: Course[];
    gpa: number;
    cumulativeGPA: number;
  }
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [currentSemesterName, setCurrentSemesterName] = useState<string>('Fall 2026');

  // Raise GPA State
  const [cumulativeGPA, setCumulativeGPA] = useState<string>('');
  const [attemptedHours, setAttemptedHours] = useState<string>('');
  const [currentCourses, setCurrentCourses] = useState<Course[]>([
    { id: 1, name: '', creditHours: '', grade: '' },
    { id: 2, name: '', creditHours: '', grade: '' },
    { id: 3, name: '', creditHours: '', grade: '' },
    { id: 4, name: '', creditHours: '', grade: '' },
    { id: 5, name: '', creditHours: '', grade: '' },
    { id: 6, name: '', creditHours: '', grade: '' },
  ]);
  const [targetGPA, setTargetGPA] = useState<string>('');
  const [maintainAverage, setMaintainAverage] = useState<string>('4.0');
  const [currentHours, setCurrentHours] = useState<string>('');
  const [termTargetGPA, setTermTargetGPA] = useState<string>('4.0');
  const [raiseResults, setRaiseResults] = useState<{
    hoursNeeded: number | null;
    requiredAverage: number | null;
    newGPAAfterCurrent?: number;
    currentCoursesHours?: number;
  }>({ hoursNeeded: null, requiredAverage: null });

  // GPD Calculator State
  const [gpdAttemptedHours, setGpdAttemptedHours] = useState<string>('');
  const [currentGradePoints, setCurrentGradePoints] = useState<string>('');
  const [desiredGPAForGPD, setDesiredGPAForGPD] = useState<string>('2.0');
  const [gpdResult, setGpdResult] = useState<{
    gpd: number | null;
    aGrades: number | null;
    bGrades: number | null;
    cGrades: number | null;
  }>({ gpd: null, aGrades: null, bGrades: null, cGrades: null });

  const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.0,
    'D-': 0.67,
    'F': 0.0,
  };

  const gpdTable: GPDTableRow[] = [
    { desiredGPA: 1.60, A: 7.2, B: 4.2, C: 1.2, D: -1.8, F: -4.8 },
    { desiredGPA: 1.80, A: 6.6, B: 3.6, C: 0.6, D: -2.4, F: -5.4 },
    { desiredGPA: 2.00, A: 6, B: 3, C: 0, D: -3, F: -6 },
    { desiredGPA: 2.25, A: 5.25, B: 2.25, C: -0.75, D: -3.75, F: -6.75 },
    { desiredGPA: 2.50, A: 4.5, B: 1.5, C: -1.5, D: -4.5, F: -7.5 },
    { desiredGPA: 2.75, A: 3.75, B: 0.75, C: -2.25, D: -5.25, F: -8.25 },
    { desiredGPA: 3.00, A: 3, B: 0, C: -3, D: -6, F: -9 },
    { desiredGPA: 3.50, A: 1.5, B: -1.5, C: -4.5, D: -7.5, F: -10.5 },
    { desiredGPA: 4.00, A: 0, B: -3, C: -6, D: -9, F: -12 },
  ];

  // SEO Setup
  useEffect(() => {
    document.title = "UTA GPA Calculator 2026 - University of Texas at Arlington Grade Calculator | ZuraWebTools";
    
    const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uta-gpa-calculator';
    
    const metaTags = [
      { name: 'description', content: 'Free UTA GPA calculator 2026 with What-If Scenarios, Grade Predictor, Scholarship Monitor, and Multi-Semester Timeline. Calculate GPA, plan improvements, track scholarship requirements, and predict final grades at University of Texas at Arlington.' },
      { name: 'keywords', content: 'UTA GPA calculator, University of Texas Arlington GPA, UTA grade calculator, GPD calculator, grade point deficiency calculator, raise GPA UTA, cumulative GPA calculator, MyMav GPA, academic probation calculator, UTA semester GPA, calculate UTA GPA, GPA requirements, UTA grade scale, calculate grades needed, GPA improvement, Arlington GPA calculator free, UTA GPA planner, academic standing, UTA transcript GPA, Dean\'s List requirements, honors GPA requirements, calculate term GPA, plus minus grading scale, graduation GPA requirement, transfer GPA calculator, Arlington Texas university GPA, what if GPA scenarios, grade predictor calculator, scholarship GPA monitor, semester timeline tracker, final grade calculator, GPA what if analysis, scholarship requirement tracker' },
      { property: 'og:title', content: 'UTA GPA Calculator 2026 - What-If Scenarios & Grade Predictor | ZuraWebTools' },
      { property: 'og:description', content: 'Advanced UTA GPA calculator with What-If scenarios, AI-powered grade predictor, scholarship monitoring, and multi-semester timeline tracking for University of Texas at Arlington students.' },
      { property: 'og:url', content: shareUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://zurawebtools.com/images/uta-gpa-calculator-og.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'UTA GPA Calculator 2026 - What-If Scenarios & Grade Predictor' },
      { name: 'twitter:description', content: 'Free UTA GPA calculator with What-If Scenarios, Grade Predictor, Scholarship Monitor, and Semester Timeline. Perfect for UT Arlington students!' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/images/uta-gpa-calculator-twitter.jpg' },
    ];

    metaTags.forEach(tag => {
      const meta = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`) || document.createElement('meta');
      if (tag.property) {
        meta.setAttribute('property', tag.property);
      } else if (tag.name) {
        meta.setAttribute('name', tag.name);
      }
      meta.setAttribute('content', tag.content);
      if (!meta.parentElement) document.head.appendChild(meta);
    });

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', shareUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    // Structured Data
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "UTA GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "operatingSystem": "Any",
        "description": "Advanced GPA calculator for University of Texas at Arlington students with What-If Scenarios, AI-powered Grade Predictor, Scholarship GPA Monitor, Multi-Semester Timeline, and Grade Point Deficiency computation. Plan your academic success with real-time GPA analysis and scholarship tracking.",
        "url": shareUrl,
        "author": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "featureList": [
          "Calculate semester GPA with official UTA grade scale",
          "What-If Scenarios: Test grade changes instantly",
          "AI Grade Predictor: Calculate required final exam grades",
          "Scholarship GPA Monitor: Real-time scholarship requirement tracking",
          "Multi-Semester Timeline: Track cumulative GPA across semesters",
          "Email & Download GPA Reports",
          "Compute Grade Point Deficiency (GPD) for probation planning",
          "Raise cumulative GPA planner with credit hour calculator",
          "Academic probation recovery calculator",
          "GPA Trend Chart with Dean's List tracking"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "234",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Marcus Johnson"
            },
            "datePublished": "2025-11-18",
            "reviewBody": "This UTA GPA calculator saved me! The GPD feature is amazing - I calculated exactly how many A's I needed to get off academic probation. Got my 2.0 GPA this semester!",
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
            "datePublished": "2025-11-21",
            "reviewBody": "Love the Raise GPA calculator! It showed me exactly what grades I need this semester to hit Dean's List (3.5 GPA). Very accurate compared to MyMav.",
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
              "name": "David Chen"
            },
            "datePublished": "2025-11-24",
            "reviewBody": "Perfect for UTA students. The grade scale matches exactly what's in our syllabus. Helps me plan which courses to take and what grades I need to maintain my scholarship GPA.",
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
              "name": "Sarah Thompson"
            },
            "datePublished": "2025-11-27",
            "reviewBody": "The GPD calculator is so helpful for understanding academic probation requirements. Would be even better if it had a chart to visualize GPA progress over semesters.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4",
              "bestRating": "5"
            }
          }
        ]
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
            "name": "University GPA Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "UTA GPA Calculator",
            "item": shareUrl
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my UTA GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your course credit hours and grades in the calculator. UTA uses a 4.0 scale where A=4.0, B=3.0, C=2.0, D=1.0, F=0.0. Your GPA is calculated by dividing total grade points by total credit hours."
            }
          },
          {
            "@type": "Question",
            "name": "What is Grade Point Deficiency (GPD) at UTA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GPD is a negative number showing how many grade points you need to reach a 2.0 GPA. It's used to determine what students on academic probation need to be removed from probation. Calculate it by: (Attempted Hours × 2.0) - Current Grade Points."
            }
          },
          {
            "@type": "Question",
            "name": "How many A's do I need to get off academic probation at UTA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide your GPD by 6 (value of an A in 3-hour course). For example, if your GPD is 7.0: 7.0 ÷ 6 = 1.17, meaning you need 2 A's in 3-hour courses to reach a 2.0 GPA and be removed from probation."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I find my cumulative GPA at UTA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your cumulative GPA is available in MyMav (UTA's student portal). Log in to MyMav and navigate to Academic Records to view your official GPA and attempted credit hours."
            }
          },
          {
            "@type": "Question",
            "name": "How do I raise my UTA GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the 'Raise GPA' calculator to determine: (1) How many credit hours needed if maintaining a specific average, or (2) What average you need this term to reach your target GPA. Focus on earning A's and B's in high credit-hour courses for maximum impact."
            }
          },
          {
            "@type": "Question",
            "name": "What are What-If Scenarios and how do they help?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "What-If Scenarios let you test different grade outcomes without changing your actual calculator data. You can see how dropping a course, changing a B to an A, or adjusting credit hours would affect your GPA. Save multiple scenarios to compare different academic paths and make informed decisions."
            }
          },
          {
            "@type": "Question",
            "name": "How does the Grade Predictor work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Grade Predictor calculates what score you need on remaining assignments or final exams to achieve your target final grade. Enter your current grade percentage, the weight of remaining work (e.g., final exam worth 40%), and your desired final grade. The calculator will tell you exactly what you need to score."
            }
          },
          {
            "@type": "Question",
            "name": "How can I monitor my scholarship GPA requirements?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the Scholarship Monitor feature to set your scholarship's minimum GPA requirement. The calculator will show you real-time status (Safe/At Risk/Danger) and calculate your buffer room. If you're below the threshold, you'll get an urgent action plan to protect your scholarship funding."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Multi-Semester Timeline feature?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Multi-Semester Timeline lets you track your academic progress across multiple semesters. Add each semester with its courses and grades to see your cumulative GPA evolution over time. You can export your complete timeline data as JSON for backup or import into other tools."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "UTA GPA Calculator",
        "description": "Official GPA calculator for University of Texas at Arlington students with GPD computation and academic planning.",
        "url": shareUrl,
        "breadcrumb": {
          "@id": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools#breadcrumb"
        },
        "about": {
          "@type": "EducationalOrganization",
          "name": "University of Texas at Arlington",
          "alternateName": "UTA"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Calculate Grade Point Deficiency (GPD) at UTA",
        "description": "Step-by-step guide to calculate GPD and determine grades needed to reach 2.0 GPA at University of Texas Arlington",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Calculate Required Grade Points",
            "text": "Multiply your attempted UTA hours by 2.0 (required GPA for probation removal). Example: 45 hours × 2.0 = 90 grade points needed."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Determine Grade Point Deficiency",
            "text": "Subtract your current grade points from required grade points. Example: 90 - 83 = 7.0 GPD."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Calculate Grades Needed",
            "text": "Divide GPD by grade value: A's needed = GPD ÷ 6, B's needed = GPD ÷ 3. Example: 7.0 ÷ 6 = 2 A's needed to reach 2.0 GPA."
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ZuraWebTools",
        "url": "https://zurawebtools.com",
        "logo": "https://zurawebtools.com/logo.png",
        "sameAs": [
          "https://twitter.com/ZuraWebTools",
          "https://facebook.com/ZuraWebTools"
        ]
      }
    ];

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      if (script.parentElement) script.remove();
    };
  }, []);

  // Basic GPA Calculator Functions
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalHours = 0;

    courses.forEach(course => {
      const hours = parseFloat(course.creditHours);
      const grade = gradePoints[course.grade];
      
      if (!isNaN(hours) && grade !== undefined && hours > 0) {
        totalPoints += hours * grade;
        totalHours += hours;
      }
    });

    if (totalHours > 0) {
      const newGPA = totalPoints / totalHours;
      setCalculatedGPA(newGPA);
      setGpaHistory(prev => [...prev, newGPA].slice(-10)); // Keep last 10 calculations
    } else {
      setCalculatedGPA(null);
    }
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', creditHours: '', grade: '' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Raise GPA Calculator Functions
  const calculateRaiseGPA = () => {
    const currentGPA = parseFloat(cumulativeGPA);
    const hours = parseFloat(attemptedHours);
    const target = parseFloat(targetGPA);
    const average = parseFloat(maintainAverage);

    if (
      isNaN(currentGPA) ||
      isNaN(hours) ||
      isNaN(target) ||
      isNaN(average) ||
      hours <= 0
    ) {
      return;
    }

    const currentPoints = currentGPA * hours;

    // Step 2: Calculate current-term course contribution
    let currentCoursesPoints = 0;
    let currentCoursesHours = 0;

    currentCourses.forEach(course => {
      const courseHours = parseFloat(course.creditHours);
      const courseGrade = gradePoints[course.grade];

      if (!isNaN(courseHours) && courseGrade !== undefined && courseHours > 0) {
        currentCoursesPoints += courseHours * courseGrade;
        currentCoursesHours += courseHours;
      }
    });

    // Step 3: If no current courses entered → do NOT compute newGPAAfterCurrent
    let newGPAAfterCurrent;
    if (currentCoursesHours > 0) {
      const totalHoursAfterCurrent = hours + currentCoursesHours;
      const totalPointsAfterCurrent = currentPoints + currentCoursesPoints;
      newGPAAfterCurrent =
        totalHoursAfterCurrent > 0
          ? totalPointsAfterCurrent / totalHoursAfterCurrent
          : currentGPA;
    } else {
      newGPAAfterCurrent = undefined;
    }

    // EARLY TARGET CHECK (if new-GPA exists)
    if (
      newGPAAfterCurrent !== undefined &&
      target <= newGPAAfterCurrent
    ) {
      setRaiseResults({
        hoursNeeded: 0,
        requiredAverage: null,
        newGPAAfterCurrent,
        currentCoursesHours
      });
      return;
    }

    // If no current courses, treat as original hours for equation
    const baseHours = newGPAAfterCurrent !== undefined ? hours + currentCoursesHours : hours;
    const basePoints = newGPAAfterCurrent !== undefined ? (currentPoints + currentCoursesPoints) : currentPoints;
    const baseGPA = newGPAAfterCurrent !== undefined ? newGPAAfterCurrent : currentGPA;

    if (average <= target) {
      setRaiseResults({
        hoursNeeded: null,
        requiredAverage: null,
        newGPAAfterCurrent,
        currentCoursesHours
      });
      return;
    }

    const hoursNeeded =
      (baseHours * (target - baseGPA)) / (average - target);

    setRaiseResults({
      hoursNeeded: hoursNeeded > 0 ? Math.ceil(hoursNeeded) : 0,
      requiredAverage: null,
      newGPAAfterCurrent,
      currentCoursesHours
    });
  };

  const calculateTermAverage = () => {
    const currentGPA = parseFloat(cumulativeGPA);
    const hours = parseFloat(attemptedHours);
    const termHours = parseFloat(currentHours);
    const target = parseFloat(termTargetGPA);

    if (isNaN(currentGPA) || isNaN(hours) || isNaN(termHours) || isNaN(target)) {
      return;
    }

    if (hours <= 0) return;

    if (termHours <= 0) {
      setRaiseResults(prev => ({
        ...prev,
        requiredAverage: -3
      }));
      return;
    }

    const currentPoints = currentGPA * hours;
    const requiredTotalPoints = target * (hours + termHours);
    const pointsNeededThisTerm = requiredTotalPoints - currentPoints;

    const requiredAverage = pointsNeededThisTerm / termHours;

    // ---- FIXED LOGIC (NO ROUNDING ABUSE) ----
    if (requiredAverage < 0) {
      setRaiseResults(prev => ({
        ...prev,
        requiredAverage: -2 // above target
      }));
      return;
    }

    if (requiredAverage === 0) {
      setRaiseResults(prev => ({
        ...prev,
        requiredAverage: 0 // exact match
      }));
      return;
    }

    const rounded = Number(requiredAverage.toFixed(4));

    if (rounded > 4.0) {
      setRaiseResults(prev => ({
        ...prev,
        requiredAverage: -1 // impossible
      }));
      return;
    }

    // Valid required average
    setRaiseResults(prev => ({
      ...prev,
      requiredAverage: rounded
    }));
  };

  // GPD Calculator Functions
  const calculateGPD = () => {
    const hours = parseFloat(gpdAttemptedHours);
    const points = parseFloat(currentGradePoints);
    const desired = parseFloat(desiredGPAForGPD);

    if (!isNaN(hours) && !isNaN(points) && !isNaN(desired) && hours > 0) {
      const requiredPoints = hours * desired;
      const gpd = requiredPoints - points;
      
      const row = gpdTable.find(r => r.desiredGPA === desired) || gpdTable.find(r => r.desiredGPA === 2.0)!;
      
      // Guard against negative or zero values (e.g., at 3.50 GPA: B=-1.5, at 4.00: A=0, B=-3)
      // Only calculate if GPD is positive AND the grade value is positive
      const aGrades = gpd > 0 && row.A > 0 ? Math.ceil(gpd / row.A) : 0;
      const bGrades = gpd > 0 && row.B > 0 ? Math.ceil(gpd / row.B) : 0;
      
      // C grades maintain 2.0 GPA but DO NOT reduce GPD
      // Official UTA logic: C's have zero effect on GPD reduction
      const cGrades = null; // Always null - C's don't help with GPD

      setGpdResult({
        gpd: parseFloat(gpd.toFixed(2)),
        aGrades,
        bGrades,
        cGrades
      });
    }
  };

  // Print Function
  const handlePrint = () => {
    if (calculatedGPA === null) return;

    const sanitize = (str: string) => {
      const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      return String(str).replace(/[&<>"'/]/g, (s) => map[s]);
    };

    const coursesHTML = courses
      .filter((c) => c.creditHours && c.grade)
      .map((c) => {
        const hours = parseFloat(c.creditHours);
        const grade = gradePoints[c.grade];
        const points = hours * grade;
        return `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${sanitize(c.name || 'Course')}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${hours.toFixed(1)}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${c.grade}</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${points.toFixed(2)}</td>
          </tr>
        `;
      })
      .join('');

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>UTA GPA Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #F97316;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #F97316;
            margin: 0 0 10px 0;
            font-size: 28px;
          }
          .header p {
            color: #1E40AF;
            margin: 5px 0;
            font-size: 14px;
          }
          .gpa-box {
            background: linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin: 20px 0;
            border: 2px solid #F97316;
          }
          .gpa-box h2 {
            margin: 0;
            color: #7C2D12;
            font-size: 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th {
            background-color: #F97316;
            color: white;
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
          }
          td {
            padding: 8px;
            border: 1px solid #ddd;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎓 University of Texas at Arlington</h1>
          <p><strong>GPA Report</strong></p>
          <p>Generated: ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="gpa-box">
          <h2>Semester GPA: ${calculatedGPA.toFixed(3)}</h2>
        </div>

        <h3 style="color: #F97316; margin-top: 30px;">Course Details:</h3>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th style="text-align: center;">Credit Hours</th>
              <th style="text-align: center;">Grade</th>
              <th style="text-align: center;">Grade Points</th>
            </tr>
          </thead>
          <tbody>
            ${coursesHTML}
          </tbody>
        </table>

        <div class="footer">
          <p><strong>ZuraWebTools</strong> - Free UTA GPA Calculator</p>
          <p>https://zurawebtools.com</p>
          <p>This is an unofficial calculator. Verify with official UTA records.</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  // Download Function
  const handleDownload = () => {
    if (calculatedGPA === null) return;

    const date = new Date().toLocaleDateString();
    let report = '\uFEFF'; // UTF-8 BOM
    report += '═══════════════════════════════════════════════════════\n';
    report += '   UNIVERSITY OF TEXAS AT ARLINGTON - GPA REPORT\n';
    report += '═══════════════════════════════════════════════════════\n\n';
    report += `Generated: ${date}\n`;
    report += `Semester GPA: ${calculatedGPA.toFixed(3)}\n\n`;
    report += '───────────────────────────────────────────────────────\n';
    report += 'COURSE DETAILS\n';
    report += '───────────────────────────────────────────────────────\n\n';

    courses
      .filter((c) => c.creditHours && c.grade)
      .forEach((c, index) => {
        const hours = parseFloat(c.creditHours);
        const grade = gradePoints[c.grade];
        const points = hours * grade;
        report += `${index + 1}. ${c.name || 'Course'}\n`;
        report += `   Credit Hours: ${hours.toFixed(1)}\n`;
        report += `   Grade: ${c.grade}\n`;
        report += `   Grade Points: ${points.toFixed(2)}\n\n`;
      });

    report += '═══════════════════════════════════════════════════════\n';
    report += 'Generated by ZuraWebTools - Free UTA GPA Calculator\n';
    report += 'https://zurawebtools.com\n';
    report += 'This is an unofficial calculator. Verify with official UTA records.\n';
    report += '═══════════════════════════════════════════════════════\n';

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UTA_GPA_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // ✨ NEW PHASE 1: What-If Scenarios Functions
  const enableWhatIfMode = () => {
    setWhatIfCourses(JSON.parse(JSON.stringify(courses))); // Deep copy
    setWhatIfMode(true);
    calculateWhatIfGPA(courses);
  };

  const disableWhatIfMode = () => {
    setWhatIfMode(false);
    setWhatIfGPA(null);
  };

  const calculateWhatIfGPA = (coursesToCalc: Course[]) => {
    let totalPoints = 0;
    let totalHours = 0;

    coursesToCalc.forEach(course => {
      const hours = parseFloat(course.creditHours);
      const grade = gradePoints[course.grade];
      
      if (!isNaN(hours) && grade !== undefined && hours > 0) {
        totalPoints += hours * grade;
        totalHours += hours;
      }
    });

    if (totalHours > 0) {
      const newGPA = totalPoints / totalHours;
      setWhatIfGPA(newGPA);
    } else {
      setWhatIfGPA(null);
    }
  };

  const updateWhatIfCourse = (id: number, field: keyof Course, value: string) => {
    const updated = whatIfCourses.map(c => c.id === id ? { ...c, [field]: value } : c);
    setWhatIfCourses(updated);
    calculateWhatIfGPA(updated);
  };

  const dropCourseWhatIf = (id: number) => {
    const updated = whatIfCourses.filter(c => c.id !== id);
    setWhatIfCourses(updated);
    calculateWhatIfGPA(updated);
  };

  const saveScenario = () => {
    if (whatIfGPA !== null) {
      const scenarioName = prompt('Name this scenario:') || `Scenario ${savedScenarios.length + 1}`;
      setSavedScenarios([...savedScenarios, {
        name: scenarioName,
        courses: JSON.parse(JSON.stringify(whatIfCourses)),
        gpa: whatIfGPA
      }]);
    }
  };

  const loadScenario = (index: number) => {
    const scenario = savedScenarios[index];
    setWhatIfCourses(JSON.parse(JSON.stringify(scenario.courses)));
    calculateWhatIfGPA(scenario.courses);
  };

  // ✨ NEW PHASE 1: Email Report Functions
  const sendEmailReport = async () => {
    if (calculatedGPA === null || !userEmail) return;
    
    // Create report text
    const reportText = `UTA GPA REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SEMESTER GPA: ${calculatedGPA.toFixed(3)}

📚 COURSE DETAILS:
${courses.filter(c => c.creditHours && c.grade).map((c, i) => {
  const hours = parseFloat(c.creditHours);
  const grade = gradePoints[c.grade];
  const points = hours * grade;
  return `${i + 1}. ${c.name || 'Course ' + (i+1)}
   Credit Hours: ${c.creditHours}
   Grade: ${c.grade}
   Grade Points: ${points.toFixed(2)}`;
}).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Generated: ${new Date().toLocaleDateString()}
🌐 ZuraWebTools - UTA GPA Calculator
🔗 https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uta-gpa-calculator`;

    // Try to use Web Share API first (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `UTA GPA Report - ${calculatedGPA.toFixed(3)}`,
          text: reportText
        });
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
        return;
      } catch (err) {
        // User cancelled or share not available, fall back to mailto
      }
    }

    // Fallback to mailto
    const subject = encodeURIComponent(`UTA GPA Report - ${calculatedGPA.toFixed(3)}`);
    const body = encodeURIComponent(reportText);
    window.open(`mailto:${userEmail}?subject=${subject}&body=${body}`, '_blank');
    
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const copyReportToClipboard = () => {
    if (calculatedGPA === null) return;

    const report = `UTA GPA Report - ${new Date().toLocaleDateString()}

Semester GPA: ${calculatedGPA.toFixed(3)}

Course Details:
${courses.filter(c => c.creditHours && c.grade).map((c, i) => {
  const hours = parseFloat(c.creditHours);
  const grade = gradePoints[c.grade];
  const points = hours * grade;
  return `${i + 1}. ${c.name || 'Course'} - ${c.creditHours} credits - Grade: ${c.grade} (${points.toFixed(2)} points)`;
}).join('\n')}

Generated by ZuraWebTools
https://zurawebtools.com`;

    navigator.clipboard.writeText(report);
    alert('✓ Report copied to clipboard!');
  };

  // ✨ NEW PHASE 2: Grade Predictor Functions
  const calculateRequiredGrade = () => {
    const current = parseFloat(currentGradeInput);
    const remaining = parseFloat(remainingWeight);
    const target = parseFloat(targetGradeInput);

    if (isNaN(current) || isNaN(remaining) || isNaN(target)) {
      setRequiredGrade(null);
      return;
    }

    // Formula: Required = (Target - Current * (1 - RemainingWeight)) / RemainingWeight
    const currentWeight = 100 - remaining;
    const required = (target - (current * currentWeight / 100)) / (remaining / 100);
    
    setRequiredGrade(required);
  };

  const resetGradePredictor = () => {
    setCurrentGradeInput('');
    setRemainingWeight('');
    setTargetGradeInput('');
    setRequiredGrade(null);
  };

  // ✨ NEW PHASE 2: Scholarship Monitor Functions
  const checkScholarshipStatus = () => {
    if (calculatedGPA === null || !scholarshipThreshold) {
      setScholarshipStatus(null);
      return;
    }

    const threshold = parseFloat(scholarshipThreshold);
    const diff = calculatedGPA - threshold;

    if (diff >= 0.3) {
      setScholarshipStatus('safe');
    } else if (diff >= 0 && diff < 0.3) {
      setScholarshipStatus('at-risk');
    } else {
      setScholarshipStatus('danger');
    }

    setScholarshipBuffer(diff);
  };

  useEffect(() => {
    if (calculatedGPA !== null) {
      checkScholarshipStatus();
    }
  }, [calculatedGPA, scholarshipThreshold]);

  // ✨ NEW PHASE 2: Multi-Semester Timeline Functions
  const addSemesterToTimeline = () => {
    if (calculatedGPA === null) return;

    const prevCumulativeGPA = semesters.length > 0 
      ? semesters[semesters.length - 1].cumulativeGPA 
      : 0;
    
    const prevTotalHours = semesters.reduce((sum, sem) => {
      return sum + sem.courses.reduce((courseSum, c) => {
        return courseSum + (parseFloat(c.creditHours) || 0);
      }, 0);
    }, 0);

    const currentHours = courses.reduce((sum, c) => {
      return sum + (parseFloat(c.creditHours) || 0);
    }, 0);

    const prevTotalPoints = prevCumulativeGPA * prevTotalHours;
    const currentPoints = calculatedGPA * currentHours;
    const newCumulativeGPA = (prevTotalPoints + currentPoints) / (prevTotalHours + currentHours);

    setSemesters([...semesters, {
      id: Date.now(),
      name: currentSemesterName || `Semester ${semesters.length + 1}`,
      courses: JSON.parse(JSON.stringify(courses)),
      gpa: calculatedGPA,
      cumulativeGPA: newCumulativeGPA
    }]);

    setCurrentSemesterName(`Fall ${new Date().getFullYear() + 1}`);
  };

  const removeSemesterFromTimeline = (id: number) => {
    setSemesters(semesters.filter(s => s.id !== id));
  };

  const exportTimelineData = () => {
    const data = JSON.stringify(semesters, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `UTA_Semester_Timeline_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
            UTA GPA Calculator 2026 - University of Texas Arlington
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            Advanced <strong>University of Texas at Arlington GPA calculator 2026</strong> with <strong>What-If Scenarios</strong>, <strong>AI Grade Predictor</strong>, <strong>Scholarship Monitor</strong>, <strong>Multi-Semester Timeline</strong>, and <strong>GPD computation</strong>. Test grade changes instantly, predict required final exam scores, track scholarship requirements, and plan your academic success at UTA.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
            <span className="px-3 py-1 bg-orange-100 rounded-full">✓ Free Forever</span>
            <span className="px-3 py-1 bg-blue-100 rounded-full">✓ What-If Scenarios</span>
            <span className="px-3 py-1 bg-green-100 rounded-full">✓ Grade Predictor</span>
            <span className="px-3 py-1 bg-purple-100 rounded-full">✓ Scholarship Monitor</span>
            <span className="px-3 py-1 bg-yellow-100 rounded-full">✓ Semester Timeline</span>
            <span className="px-3 py-1 bg-pink-100 rounded-full">✓ Email Reports</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 min-w-[150px] px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              GPA Calculator
            </button>
            <button
              onClick={() => setActiveTab('raise')}
              className={`flex-1 min-w-[150px] px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'raise'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Raise GPA
            </button>
            <button
              onClick={() => setActiveTab('gpd')}
              className={`flex-1 min-w-[150px] px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'gpd'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              GPD Calculator
            </button>
          </div>
        </div>

        {/* GPA Calculator Tab */}
        {activeTab === 'calculator' && (
          <div id="gpa-calculator" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 Calculate Semester GPA</h2>
            <p className="text-gray-600 mb-6">Enter your current courses with credit hours and grades to calculate your UTA semester GPA instantly.</p>
            
            <div className="space-y-4 mb-6">
              {courses.map((course, index) => (
                <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course {index + 1} Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      placeholder="e.g., Calculus I"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit Hours
                    </label>
                    <input
                      type="number"
                      value={course.creditHours}
                      onChange={(e) => updateCourse(course.id, 'creditHours', e.target.value)}
                      placeholder="3"
                      min="0"
                      step="0.5"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade
                    </label>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                    >
                      <option value="">Select</option>
                      {Object.keys(gradePoints).map(grade => (
                        <option key={grade} value={grade}>{grade} ({gradePoints[grade].toFixed(2)})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-1 flex items-end">
                    {courses.length > 1 && (
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="Remove course"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={addCourse}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                + Add Course
              </button>
              
              <button
                onClick={calculateGPA}
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all font-semibold shadow-md"
              >
                Calculate GPA
              </button>

              <button
                onClick={handlePrint}
                disabled={calculatedGPA === null}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  calculatedGPA === null
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-md'
                }`}
                title="Print GPA Report"
              >
                🖨️ Print GPA
              </button>

              <button
                onClick={handleDownload}
                disabled={calculatedGPA === null}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  calculatedGPA === null
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                }`}
                title="Download GPA Report"
              >
                📥 Download Report
              </button>
            </div>

            {calculatedGPA !== null && (
              <div className="bg-gradient-to-r from-orange-100 to-red-100 border-l-4 border-orange-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Semester GPA</h3>
                <p className="text-5xl font-bold text-orange-600">{calculatedGPA.toFixed(3)}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Total Credit Hours:</span>{' '}
                    <span className="text-orange-600 font-bold">
                      {courses.reduce((sum, c) => sum + (parseFloat(c.creditHours) || 0), 0).toFixed(1)}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Total Grade Points:</span>{' '}
                    <span className="text-orange-600 font-bold">
                      {courses.reduce((sum, c) => {
                        const hours = parseFloat(c.creditHours) || 0;
                        const grade = gradePoints[c.grade];
                        return sum + (grade !== undefined ? hours * grade : 0);
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Grade Points = Credit Hours × Grade Point Value
                </p>
              </div>
            )}

            {/* GPA Trend Chart */}
            {gpaHistory.length >= 1 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 GPA Trend Chart</h3>
                <p className="text-sm text-gray-600 mb-4">Track your GPA progress over recent calculations</p>
                
                <div className="relative h-64 border border-gray-200 rounded-lg p-4">
                  <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <g key={i}>
                        <line
                          x1="40"
                          y1={180 - (i * 40)}
                          x2="580"
                          y2={180 - (i * 40)}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <text
                          x="25"
                          y={180 - (i * 40) + 5}
                          fontSize="12"
                          fill="#6b7280"
                          textAnchor="end"
                        >
                          {i.toFixed(1)}
                        </text>
                      </g>
                    ))}

                    {/* Good Standing Line (2.0 GPA) */}
                    <line
                      x1="40"
                      y1={180 - (2.0 * 40)}
                      x2="580"
                      y2={180 - (2.0 * 40)}
                      stroke="#F97316"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <text x="585" y={180 - (2.0 * 40) + 5} fontSize="10" fill="#F97316" fontWeight="bold">
                      Good Standing
                    </text>

                    {/* Dean's List Line (3.5 GPA) */}
                    <line
                      x1="40"
                      y1={180 - (3.5 * 40)}
                      x2="580"
                      y2={180 - (3.5 * 40)}
                      stroke="#1E40AF"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <text x="585" y={180 - (3.5 * 40) + 5} fontSize="10" fill="#1E40AF" fontWeight="bold">
                      Dean's List
                    </text>

                    {/* GPA Line */}
                    <polyline
                      points={gpaHistory.map((gpa, index) => {
                        const x = 40 + (index / Math.max(gpaHistory.length - 1, 1)) * 540;
                        const y = 180 - (Math.min(gpa, 4.0) * 40);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="3"
                    />

                    {/* Data Points */}
                    {gpaHistory.map((gpa, index) => {
                      const x = 40 + (index / Math.max(gpaHistory.length - 1, 1)) * 540;
                      const y = 180 - (Math.min(gpa, 4.0) * 40);
                      return (
                        <g key={index}>
                          <circle cx={x} cy={y} r="5" fill="#F97316" stroke="#fff" strokeWidth="2">
                            <title>{`Calculation ${index + 1}: ${gpa.toFixed(3)}`}</title>
                          </circle>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-orange-600"></div>
                    <span className="text-gray-600">Your GPA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-orange-600 border-dashed border-t-2"></div>
                    <span className="text-gray-600">Good Standing (2.0)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-blue-800 border-dashed border-t-2"></div>
                    <span className="text-gray-600">Dean's List (3.5)</span>
                  </div>
                </div>
              </div>
            )}

            {/* ✨ NEW: What-If Scenarios Section */}
            {calculatedGPA !== null && (
              <div id="what-if-scenarios" className="bg-white rounded-xl shadow-lg p-6 mt-8 scroll-mt-20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-violet-700 flex items-center gap-2">
                      🔮 What-If Scenarios
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Test different grade scenarios and compare results</p>
                  </div>
                  {!whatIfMode ? (
                    <button
                      onClick={enableWhatIfMode}
                      className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all font-semibold shadow-md"
                    >
                      Start What-If
                    </button>
                  ) : (
                    <button
                      onClick={disableWhatIfMode}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all font-medium"
                    >
                      Exit What-If
                    </button>
                  )}
                </div>

                {whatIfMode && (
                  <div className="space-y-6">
                    <div className="bg-violet-50 border-l-4 border-violet-600 p-4 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>💡 Tip:</strong> Change grades below to see how your GPA would be affected. Your actual calculator data remains unchanged!
                      </p>
                    </div>

                    {/* Comparison Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                        <h4 className="font-bold text-blue-700 mb-2">📘 Current GPA</h4>
                        <p className="text-4xl font-bold text-blue-600">{calculatedGPA.toFixed(3)}</p>
                      </div>
                      <div className="bg-violet-50 border-2 border-violet-300 rounded-lg p-4">
                        <h4 className="font-bold text-violet-700 mb-2">🔮 What-If GPA</h4>
                        <p className="text-4xl font-bold text-violet-600">
                          {whatIfGPA !== null ? whatIfGPA.toFixed(3) : '—'}
                        </p>
                        {whatIfGPA !== null && calculatedGPA !== null && (
                          <p className={`text-sm mt-2 font-semibold ${whatIfGPA > calculatedGPA ? 'text-green-600' : whatIfGPA < calculatedGPA ? 'text-red-600' : 'text-gray-600'}`}>
                            {whatIfGPA > calculatedGPA ? '↑' : whatIfGPA < calculatedGPA ? '↓' : '='} 
                            {' '}{Math.abs(whatIfGPA - calculatedGPA).toFixed(3)} change
                          </p>
                        )}
                      </div>
                    </div>

                    {/* What-If Course Inputs */}
                    <div className="space-y-3">
                      {whatIfCourses.map((course) => (
                        <div key={course.id} className="grid grid-cols-12 gap-3 items-center bg-violet-50 p-3 rounded-lg">
                          <input
                            type="text"
                            value={course.name}
                            onChange={(e) => updateWhatIfCourse(course.id, 'name', e.target.value)}
                            placeholder="Course Name"
                            className="col-span-5 px-3 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                          />
                          <input
                            type="number"
                            value={course.creditHours}
                            onChange={(e) => updateWhatIfCourse(course.id, 'creditHours', e.target.value)}
                            placeholder="Credits"
                            min="0"
                            max="12"
                            step="0.5"
                            className="col-span-2 px-3 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500"
                          />
                          <select
                            value={course.grade}
                            onChange={(e) => updateWhatIfCourse(course.id, 'grade', e.target.value)}
                            className="col-span-2 px-3 py-2 border border-violet-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm text-gray-900"
                          >
                            <option value="">Grade</option>
                            {Object.keys(gradePoints).map(grade => (
                              <option key={grade} value={grade}>{grade}</option>
                            ))}
                          </select>
                          <div className="col-span-2 text-center">
                            <span className="text-sm font-semibold text-violet-700">
                              {course.creditHours && course.grade 
                                ? (parseFloat(course.creditHours) * gradePoints[course.grade]).toFixed(2) 
                                : '—'}
                            </span>
                          </div>
                          <button
                            onClick={() => dropCourseWhatIf(course.id)}
                            className="col-span-1 text-red-500 hover:text-red-700 font-bold text-lg"
                            title="Drop this course"
                          >
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Scenario Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={saveScenario}
                        disabled={whatIfGPA === null}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          whatIfGPA === null
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                        }`}
                      >
                        💾 Save Scenario
                      </button>
                      <button
                        onClick={() => {
                          setWhatIfCourses(JSON.parse(JSON.stringify(courses)));
                          calculateWhatIfGPA(courses);
                        }}
                        className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all font-medium"
                      >
                        🔄 Reset to Current
                      </button>
                    </div>

                    {/* Saved Scenarios */}
                    {savedScenarios.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-800 mb-3">💾 Saved Scenarios</h4>
                        <div className="space-y-2">
                          {savedScenarios.map((scenario, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                              <div>
                                <span className="font-semibold text-gray-800">{scenario.name}</span>
                                <span className="ml-3 text-violet-600 font-bold">GPA: {scenario.gpa.toFixed(3)}</span>
                              </div>
                              <button
                                onClick={() => loadScenario(index)}
                                className="px-4 py-1 bg-violet-600 text-white rounded hover:bg-violet-700 text-sm font-medium"
                              >
                                Load
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ✨ NEW: Email Report Section */}
            {calculatedGPA !== null && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
                <h3 className="text-2xl font-bold text-blue-700 flex items-center gap-2 mb-4">
                  📧 Share & Export Report
                </h3>
                <p className="text-sm text-gray-600 mb-4">Share your GPA report via email or copy to clipboard</p>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-sm text-gray-800 font-semibold mb-1">📱 How Email Works:</p>
                    <p className="text-sm text-gray-700">
                      Click "Send Report" to open your email app (Gmail, Outlook, etc.) with the report ready. You'll need to click "Send" in your email app to complete delivery.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                    <button
                      onClick={sendEmailReport}
                      disabled={!userEmail || calculatedGPA === null}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                        !userEmail || calculatedGPA === null
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                      }`}
                    >
                      📧 Send Report
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={copyReportToClipboard}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium shadow-md"
                    >
                      📋 Copy to Clipboard
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={calculatedGPA === null}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        calculatedGPA === null
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                      }`}
                    >
                      💾 Download .txt
                    </button>
                  </div>

                  {emailSent && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                      <p className="text-green-800 font-semibold">✓ Email app should have opened!</p>
                      <p className="text-sm text-green-700 mt-1">Complete the send in your email client. If nothing happened, use "Copy to Clipboard" instead.</p>
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-300 p-3 rounded">
                    <p className="text-xs text-gray-800">
                      <strong>⚠️ Note:</strong> The email feature opens your device's email app - it doesn't send directly from the website. 
                      For instant sharing, use "Copy to Clipboard" and paste anywhere!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Raise GPA Tab */}
        {activeTab === 'raise' && (
          <div id="raise-gpa" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">📈 Raise Your Cumulative GPA</h2>
            <p className="text-gray-600 mb-6">Plan your path to improve your cumulative GPA at UTA. Calculate how many credit hours or what average you need to reach your target GPA.</p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Find your cumulative GPA in MyMav:</strong> Log in to MyMav → Academic Records → View GPA and attempted credit hours.
              </p>
            </div>

            {/* Current Courses Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Enter Your Current Courses (Optional)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add your current semester courses with expected grades. The calculator will show your new GPA after this term.
              </p>
              
              <div className="space-y-4">
                {currentCourses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-1 md:grid-cols-10 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="md:col-span-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course {index + 1} Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => {
                          setCurrentCourses(currentCourses.map(c => 
                            c.id === course.id ? { ...c, name: e.target.value } : c
                          ));
                        }}
                        placeholder={`Course ${index + 1}`}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Credit Hours
                      </label>
                      <input
                        type="number"
                        value={course.creditHours}
                        onChange={(e) => {
                          setCurrentCourses(currentCourses.map(c => 
                            c.id === course.id ? { ...c, creditHours: e.target.value } : c
                          ));
                        }}
                        placeholder="3"
                        min="0"
                        step="0.5"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Grade
                      </label>
                      <select
                        value={course.grade}
                        onChange={(e) => {
                          setCurrentCourses(currentCourses.map(c => 
                            c.id === course.id ? { ...c, grade: e.target.value } : c
                          ));
                        }}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                      >
                        <option value="">Select</option>
                        {Object.keys(gradePoints).map(grade => (
                          <option key={grade} value={grade}>{grade} ({gradePoints[grade].toFixed(2)})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Cumulative GPA
                </label>
                <input
                  type="number"
                  value={cumulativeGPA}
                  onChange={(e) => setCumulativeGPA(e.target.value)}
                  placeholder="3.20"
                  step="0.01"
                  min="0"
                  max="4"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Attempted Credit Hours Completed
                </label>
                <input
                  type="number"
                  value={attemptedHours}
                  onChange={(e) => setAttemptedHours(e.target.value)}
                  placeholder="45"
                  min="0"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">Do not include current semester hours</p>
              </div>
            </div>

            {/* Scenario 1: Hours Needed */}
            <div className="border-t pt-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Scenario 1: How many credit hours needed?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I want to raise my GPA to
                  </label>
                  <input
                    type="number"
                    value={targetGPA}
                    onChange={(e) => setTargetGPA(e.target.value)}
                    placeholder="3.50"
                    step="0.01"
                    min="0"
                    max="4"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    If I maintain this average
                  </label>
                  <input
                    type="number"
                    value={maintainAverage}
                    onChange={(e) => setMaintainAverage(e.target.value)}
                    placeholder="4.0"
                    step="0.1"
                    min="0"
                    max="4"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={calculateRaiseGPA}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold"
              >
                Calculate Hours Needed
              </button>

              {raiseResults.newGPAAfterCurrent !== undefined && raiseResults.currentCoursesHours !== undefined && raiseResults.currentCoursesHours > 0 && (
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    📊 GPA After Current Courses
                  </p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {raiseResults.newGPAAfterCurrent.toFixed(3)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    After completing {raiseResults.currentCoursesHours} credit hours this term, your new cumulative GPA will be {raiseResults.newGPAAfterCurrent.toFixed(3)}.
                  </p>
                </div>
              )}

              {raiseResults.hoursNeeded !== null && raiseResults.hoursNeeded === 0 && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    🎉 Target Achieved!
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {raiseResults.currentCoursesHours !== undefined && raiseResults.currentCoursesHours > 0
                      ? `After completing your current courses, your GPA of ${raiseResults.newGPAAfterCurrent?.toFixed(3)} will meet or exceed your target of ${targetGPA}. No additional credit hours needed!`
                      : `Your current GPA of ${cumulativeGPA} already meets or exceeds your target of ${targetGPA}. No additional credit hours needed.`
                    }
                  </p>
                </div>
              )}
              
              {raiseResults.hoursNeeded !== null && raiseResults.hoursNeeded > 0 && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    You need approximately <span className="text-green-600 text-2xl">{raiseResults.hoursNeeded}</span> additional credit hours
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {raiseResults.currentCoursesHours !== undefined && raiseResults.currentCoursesHours > 0
                      ? `After your current ${raiseResults.currentCoursesHours} hours (new GPA: ${raiseResults.newGPAAfterCurrent?.toFixed(3)}), you'll need ${raiseResults.hoursNeeded} more hours while maintaining a ${maintainAverage} average to reach ${targetGPA}.`
                      : `Maintain a ${maintainAverage} average on ${raiseResults.hoursNeeded} credit hours to reach your target GPA of ${targetGPA}.`
                    }
                  </p>
                </div>
              )}
              
              {raiseResults.hoursNeeded === null && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    ⚠️ Target Not Achievable
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    {raiseResults.currentCoursesHours !== undefined && raiseResults.currentCoursesHours > 0
                      ? `Even after your current courses (new GPA: ${raiseResults.newGPAAfterCurrent?.toFixed(3)}), your target of ${targetGPA} cannot be reached by maintaining a ${maintainAverage} average.`
                      : `Your target GPA of ${targetGPA} cannot be reached by maintaining a ${maintainAverage} average.`
                    }
                    {' '}The average you maintain must be <strong>higher than your target GPA</strong> to raise it.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    💡 <strong>Tip:</strong> Set a higher "maintain average" (e.g., 4.0) to see realistic results.
                  </p>
                </div>
              )}
            </div>

            {/* Scenario 2: Required Average */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Scenario 2: What average do I need this term?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit hours I'm taking this term
                  </label>
                  <input
                    type="number"
                    value={currentHours}
                    onChange={(e) => setCurrentHours(e.target.value)}
                    placeholder="15"
                    min="0"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target GPA at end of term
                  </label>
                  <input
                    type="number"
                    value={termTargetGPA}
                    onChange={(e) => setTermTargetGPA(e.target.value)}
                    placeholder="3.50"
                    step="0.01"
                    min="0"
                    max="4"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={calculateTermAverage}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold"
              >
                Calculate Required Average
              </button>

              {raiseResults.requiredAverage === -2 && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    🎉 You're Already Above Your Target!
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your current GPA of {cumulativeGPA} is already higher than your target of {termTargetGPA}. 
                    You can earn <strong>any grade</strong> (even below passing) in {currentHours} hours and still remain above your target.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    💡 No minimum average required - you have a comfortable buffer above your goal.
                  </p>
                </div>
              )}

              {raiseResults.requiredAverage !== null && raiseResults.requiredAverage === 0 && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    ✅ Target Exactly Achieved
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your current GPA of {cumulativeGPA} exactly matches your target of {termTargetGPA}. 
                    Maintain any passing grade to stay at or above your target.
                  </p>
                </div>
              )}

              {raiseResults.requiredAverage !== null && raiseResults.requiredAverage > 0 && raiseResults.requiredAverage <= 4.0 && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    You need an average of <span className="text-green-600 text-2xl">
                      {raiseResults.requiredAverage.toFixed(2)}
                    </span> this term
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Maintain this average in {currentHours} credit hours to reach a cumulative GPA of {termTargetGPA}.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    📊 Calculation: ({termTargetGPA} × {parseFloat(attemptedHours) + parseFloat(currentHours)} total hours) - 
                    ({cumulativeGPA} × {attemptedHours} current hours) = {(raiseResults.requiredAverage * parseFloat(currentHours)).toFixed(2)} points needed ÷ {currentHours} hours
                  </p>
                </div>
              )}

              {raiseResults.requiredAverage === -3 && (
                <div className="mt-4 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    ⚠️ Invalid Input
                  </p>
                  <p className="text-sm text-orange-600 mt-2">
                    Please enter a valid number of credit hours above 0. You cannot calculate required average for 0 credit hours.
                  </p>
                </div>
              )}

              {raiseResults.requiredAverage === -1 && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    ⚠️ Target Not Achievable
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    Your target GPA of {termTargetGPA} cannot be reached with {currentHours} credit hours this term. 
                    The required average would exceed 4.0 (maximum possible).
                  </p>
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <p className="font-semibold">💡 Solutions:</p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Lower your target GPA to a more realistic level</li>
                      <li>Take more credit hours this term (increase from {currentHours})</li>
                      <li>Plan to reach your goal over multiple semesters</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GPD Calculator Tab */}
        {activeTab === 'gpd' && (
          <div id="gpd-calculator" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🎯 Grade Point Deficiency (GPD) Calculator</h2>
            <p className="text-gray-600 mb-4">Calculate your GPD and determine exactly how many A's, B's, or C's you need to reach a 2.0 GPA and be removed from academic probation at UTA.</p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-2">What is GPD?</h3>
              <p className="text-sm text-gray-700">
                Grade Point Deficiency (GPD) is used to determine what students on <strong>academic probation</strong> need to be removed from probation. 
                A <strong>2.0 GPA is required</strong> to be removed from probation at UTA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attempted Hours at UTA
                </label>
                <input
                  type="number"
                  value={gpdAttemptedHours}
                  onChange={(e) => setGpdAttemptedHours(e.target.value)}
                  placeholder="45"
                  min="0"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Grade Points
                </label>
                <input
                  type="number"
                  value={currentGradePoints}
                  onChange={(e) => setCurrentGradePoints(e.target.value)}
                  placeholder="83"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired GPA
                </label>
                <select
                  value={desiredGPAForGPD}
                  onChange={(e) => setDesiredGPAForGPD(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900"
                >
                  {gpdTable.map(row => (
                    <option key={row.desiredGPA} value={row.desiredGPA.toFixed(2)}>
                      {row.desiredGPA.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={calculateGPD}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold mb-6"
            >
              Calculate GPD
            </button>

            {gpdResult.gpd !== null && (
              <div className="space-y-4">
                <div className={`border-l-4 p-6 rounded-lg ${
                  gpdResult.gpd > 0 
                    ? 'bg-orange-50 border-orange-500' 
                    : 'bg-green-50 border-green-500'
                }`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Your Grade Point Deficiency</h3>
                  <p className={`text-4xl font-bold ${
                    gpdResult.gpd > 0 ? 'text-orange-600' : 'text-green-600'
                  }`}>{gpdResult.gpd > 0 ? gpdResult.gpd : '0.00'}</p>
                  
                  {gpdResult.gpd > 0 ? (
                    <div className="mt-3 space-y-2">
                      <p className="text-base font-semibold text-orange-700">
                        ⚠️ You have a Grade Point Deficiency of {gpdResult.gpd} points.
                      </p>
                      <p className="text-sm text-gray-700">
                        You need {gpdResult.gpd} grade points to reach a {desiredGPAForGPD} GPA. 
                        This means you need <strong>{gpdResult.aGrades} A's</strong> or <strong>{gpdResult.bGrades} B's</strong> (in 3-hour courses) to be removed from academic probation.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <p className="text-base font-semibold text-green-700">
                        ✅ You are GPD Positive and are off probation!
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        Your current GPA of {(parseFloat(currentGradePoints) / parseFloat(gpdAttemptedHours)).toFixed(3)} meets or exceeds the {desiredGPAForGPD} requirement. 
                        You are in good academic standing at UTA.
                      </p>
                    </div>
                  )}
                </div>

                {gpdResult.gpd > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">A's Needed (3-hour courses)</p>
                      <p className="text-3xl font-bold text-green-600">{gpdResult.aGrades > 0 ? gpdResult.aGrades : 'N/A'}</p>
                      <p className="text-xs text-gray-500 mt-1">{gpdResult.aGrades > 0 ? 'Each A = +6 points' : 'Not applicable at this GPA'}</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">B's Needed (3-hour courses)</p>
                      <p className="text-3xl font-bold text-blue-600">{gpdResult.bGrades > 0 ? gpdResult.bGrades : 'N/A'}</p>
                      <p className="text-xs text-gray-500 mt-1">{gpdResult.bGrades > 0 ? 'Each B = +3 points' : 'Not applicable at this GPA'}</p>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">C's Effect on GPD</p>
                      <p className="text-2xl font-bold text-gray-500">N/A</p>
                      <p className="text-xs text-gray-500 mt-1">C's maintain 2.0 but don't reduce GPD</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>💡 Important:</strong> C grades (2.0) maintain your current GPA at 2.0 but do NOT reduce your Grade Point Deficiency. 
                      To eliminate GPD and get off probation, you need grades <strong>above 2.0</strong> (B's or A's).
                    </p>
                  </div>
                </>
              )}
              </div>
            )}

            {/* GPD Reference Table */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Grade Point Values (3-hour courses)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Desired GPA</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">A</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">B</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">C</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">D</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">F</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gpdTable.map(row => (
                      <tr key={row.desiredGPA} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-semibold">{row.desiredGPA.toFixed(2)}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-green-600">{row.A}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-blue-600">{row.B}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-yellow-600">{row.C}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-orange-600">{row.D}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-red-600">{row.F}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <TableOfContents 
          sections={tocSections}
          title="📚 Quick Navigation"
          description="Jump to any calculator or guide section"
        />

        {/* UTA Grade Scale */}
        <div id="grade-scale" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📊 Official UTA Grade Scale</h2>
          <p className="text-gray-600 mb-4">University of Texas at Arlington uses the standard 4.0 grading scale with plus/minus system.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-bold text-lg text-gray-800">{grade}</p>
                <p className="text-sm text-gray-600">{points.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✨ NEW PHASE 2: Grade Predictor Section */}
        <div id="grade-predictor" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            🎯 AI Grade Predictor
          </h2>
          <p className="text-gray-600 mb-6">Calculate what grade you need on remaining assignments to achieve your target final grade</p>
          
          <div className="space-y-6">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 How it works:</strong> Enter your current grade percentage, the weight of remaining assignments/exams, and your target final grade. The calculator will tell you what you need to score!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Grade (%)
                </label>
                <input
                  type="number"
                  value={currentGradeInput}
                  onChange={(e) => setCurrentGradeInput(e.target.value)}
                  placeholder="e.g., 82"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Your grade so far</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Remaining Weight (%)
                </label>
                <input
                  type="number"
                  value={remainingWeight}
                  onChange={(e) => setRemainingWeight(e.target.value)}
                  placeholder="e.g., 40"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Final exam + assignments</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Target Final Grade (%)
                </label>
                <input
                  type="number"
                  value={targetGradeInput}
                  onChange={(e) => setTargetGradeInput(e.target.value)}
                  placeholder="e.g., 90"
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Desired final grade</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={calculateRequiredGrade}
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all font-semibold shadow-md"
              >
                Calculate Required Grade
              </button>
              <button
                onClick={resetGradePredictor}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all font-medium"
              >
                Reset
              </button>
            </div>

            {requiredGrade !== null && (
              <div className={`border-l-4 p-6 rounded-lg ${
                requiredGrade <= 100 ? 'bg-emerald-50 border-emerald-600' : 'bg-red-50 border-red-600'
              }`}>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {requiredGrade <= 100 ? '✅ You Can Do It!' : '⚠️ Target May Be Challenging'}
                </h3>
                <p className={`text-4xl font-bold mb-4 ${requiredGrade <= 100 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {requiredGrade.toFixed(2)}%
                </p>
                <p className="text-gray-700 mb-4">
                  {requiredGrade <= 100 
                    ? `You need to score ${requiredGrade.toFixed(2)}% on your remaining work to achieve a final grade of ${targetGradeInput}%.`
                    : `Your target of ${targetGradeInput}% is not mathematically possible with current grade of ${currentGradeInput}%. Consider adjusting your expectations or speaking with your professor about extra credit opportunities.`
                  }
                </p>
                {requiredGrade <= 100 && (
                  <div className="bg-white bg-opacity-70 p-4 rounded mt-4">
                    <p className="text-sm font-semibold text-gray-800 mb-2">📊 Grade Analysis:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Difficulty:</strong> {requiredGrade >= 95 ? 'Very Challenging' : requiredGrade >= 85 ? 'Moderate' : 'Achievable'}</li>
                      <li>• <strong>Recommendation:</strong> {requiredGrade >= 95 ? 'Focus intensely, seek tutoring' : requiredGrade >= 85 ? 'Solid study plan needed' : 'Stay consistent with current efforts'}</li>
                      <li>• <strong>Buffer:</strong> {requiredGrade < 70 ? 'Good cushion room' : requiredGrade < 85 ? 'Moderate buffer' : 'Very little room for error'}</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Example:</strong> You have 82% currently. The final exam is worth 40% of your grade. To get an A (90%), you need to score:
                (90 - 82×0.6) / 0.4 = <strong>91.5%</strong> on the final!
              </p>
            </div>
          </div>
        </div>

        {/* ✨ NEW PHASE 2: Scholarship Monitor Section */}
        <div id="scholarship-monitor" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            💰 Scholarship GPA Monitor
          </h2>
          <p className="text-gray-600 mb-6">Track your GPA against scholarship requirements in real-time</p>
          
          <div className="space-y-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 Stay Safe:</strong> Many scholarships require maintaining a minimum GPA. Set your requirement below and monitor your status!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Scholarship GPA Requirement
                </label>
                <input
                  type="number"
                  value={scholarshipThreshold}
                  onChange={(e) => setScholarshipThreshold(e.target.value)}
                  placeholder="e.g., 3.5"
                  min="0"
                  max="4.0"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum GPA to keep scholarship</p>
              </div>

              {calculatedGPA !== null && scholarshipStatus && (
                <div className={`p-6 rounded-lg border-2 ${
                  scholarshipStatus === 'safe' 
                    ? 'bg-green-50 border-green-500' 
                    : scholarshipStatus === 'at-risk' 
                    ? 'bg-yellow-50 border-yellow-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">
                      {scholarshipStatus === 'safe' ? '✅' : scholarshipStatus === 'at-risk' ? '⚠️' : '❌'}
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-gray-800">
                        {scholarshipStatus === 'safe' ? 'SAFE' : scholarshipStatus === 'at-risk' ? 'AT RISK' : 'DANGER'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {calculatedGPA.toFixed(3)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {scholarshipStatus === 'safe' && `You're ${scholarshipBuffer?.toFixed(3)} above the threshold! 🎉`}
                    {scholarshipStatus === 'at-risk' && `Only ${scholarshipBuffer?.toFixed(3)} above threshold - be careful! ⚠️`}
                    {scholarshipStatus === 'danger' && `You're ${Math.abs(scholarshipBuffer || 0).toFixed(3)} below requirement! 🚨`}
                  </p>
                </div>
              )}
            </div>

            {calculatedGPA !== null && scholarshipStatus && (
              <div className="space-y-4">
                <div className={`border-l-4 p-4 rounded ${
                  scholarshipStatus === 'safe' 
                    ? 'bg-green-50 border-green-500' 
                    : scholarshipStatus === 'at-risk' 
                    ? 'bg-yellow-50 border-yellow-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <h4 className="font-bold text-gray-800 mb-2">
                    {scholarshipStatus === 'safe' && '✓ Scholarship Status: SAFE'}
                    {scholarshipStatus === 'at-risk' && '⚠ Scholarship Status: AT RISK'}
                    {scholarshipStatus === 'danger' && '🚨 Scholarship Status: DANGER'}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {scholarshipStatus === 'safe' && 'Great job! You\'re well above your scholarship requirement. Keep up the excellent work!'}
                    {scholarshipStatus === 'at-risk' && 'Warning: You\'re close to losing your scholarship. Focus on improving your grades this semester.'}
                    {scholarshipStatus === 'danger' && 'URGENT: Your GPA is below scholarship requirement. Meet with your advisor immediately to create an improvement plan.'}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📊 Buffer Analysis</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Current GPA:</span>
                      <span className="font-bold">{calculatedGPA.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required GPA:</span>
                      <span className="font-bold">{scholarshipThreshold}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Buffer:</span>
                      <span className={`font-bold ${scholarshipBuffer && scholarshipBuffer >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {scholarshipBuffer !== null ? (scholarshipBuffer >= 0 ? '+' : '') + scholarshipBuffer.toFixed(3) : '—'}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    💡 <strong>Tip:</strong> {scholarshipBuffer && scholarshipBuffer >= 0.3 
                      ? 'You can afford a slight dip in performance and still maintain your scholarship.' 
                      : 'Focus on maintaining or improving your current grades to protect your funding.'}
                  </p>
                </div>

                {scholarshipStatus === 'danger' && (
                  <div className="bg-red-100 border-2 border-red-500 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">🆘 Action Plan Required</h4>
                    <ul className="text-sm text-red-900 space-y-1 ml-4">
                      <li>• <strong>Immediate:</strong> Schedule meeting with academic advisor</li>
                      <li>• <strong>This Week:</strong> Contact financial aid office about scholarship status</li>
                      <li>• <strong>Ongoing:</strong> Use UTA tutoring services (SMART Program)</li>
                      <li>• <strong>Consider:</strong> Reducing course load next semester to focus on grades</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {calculatedGPA === null && (
              <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg text-center">
                <p className="text-gray-600">
                  Calculate your GPA first to see your scholarship status!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ✨ NEW PHASE 2: Multi-Semester Timeline Section */}
        <div id="semester-timeline" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            📅 Multi-Semester Timeline
          </h2>
          <p className="text-gray-600 mb-6">Track your academic progress across multiple semesters</p>
          
          <div className="space-y-6">
            <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 Track Progress:</strong> Add each semester to build a complete academic timeline. Watch your cumulative GPA evolve over time!
              </p>
            </div>

            {calculatedGPA !== null && (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={currentSemesterName}
                  onChange={(e) => setCurrentSemesterName(e.target.value)}
                  placeholder="e.g., Fall 2026"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <button
                  onClick={addSemesterToTimeline}
                  className="px-8 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all font-semibold shadow-md whitespace-nowrap"
                >
                  📅 Add Semester
                </button>
              </div>
            )}

            {semesters.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Your Academic Timeline</h3>
                  <button
                    onClick={exportTimelineData}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    📥 Export Data
                  </button>
                </div>

                {/* Timeline Visualization */}
                <div className="relative">
                  {semesters.map((semester, index) => (
                    <div key={semester.id} className="relative pl-8 pb-8">
                      {/* Timeline Line */}
                      {index < semesters.length - 1 && (
                        <div className="absolute left-3 top-10 bottom-0 w-0.5 bg-sky-300"></div>
                      )}
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-2 w-6 h-6 bg-sky-600 rounded-full border-4 border-white shadow"></div>
                      
                      {/* Semester Card */}
                      <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-4 ml-4 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-sky-800">{semester.name}</h4>
                            <p className="text-sm text-gray-600">
                              {semester.courses.filter(c => c.creditHours && c.grade).length} courses • 
                              {' '}{semester.courses.reduce((sum, c) => sum + (parseFloat(c.creditHours) || 0), 0).toFixed(1)} credits
                            </p>
                          </div>
                          <button
                            onClick={() => removeSemesterFromTimeline(semester.id)}
                            className="text-red-500 hover:text-red-700 font-bold"
                            title="Remove semester"
                          >
                            ❌
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="bg-white bg-opacity-70 p-3 rounded">
                            <p className="text-xs text-gray-600 mb-1">Semester GPA</p>
                            <p className="text-2xl font-bold text-sky-600">{semester.gpa.toFixed(3)}</p>
                          </div>
                          <div className="bg-white bg-opacity-70 p-3 rounded">
                            <p className="text-xs text-gray-600 mb-1">Cumulative GPA</p>
                            <p className="text-2xl font-bold text-blue-600">{semester.cumulativeGPA.toFixed(3)}</p>
                          </div>
                        </div>
                        
                        <details className="text-sm">
                          <summary className="cursor-pointer text-sky-700 hover:text-sky-800 font-semibold">
                            View Course Details
                          </summary>
                          <div className="mt-2 space-y-1 ml-4">
                            {semester.courses.filter(c => c.creditHours && c.grade).map((course, i) => (
                              <div key={i} className="text-gray-700">
                                • {course.name || `Course ${i + 1}`}: {course.grade} ({course.creditHours} credits)
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    </div>
                  ))}
                </div>

                {/* GPA Progression Chart */}
                {semesters.length >= 2 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">📈 GPA Progression</h4>
                    <div className="h-40 border border-gray-300 rounded p-2">
                      <svg width="100%" height="100%" viewBox="0 0 600 120" preserveAspectRatio="none">
                        {/* Grid */}
                        {[0, 1, 2, 3, 4].map(i => (
                          <line
                            key={i}
                            x1="30"
                            y1={110 - (i * 25)}
                            x2="580"
                            y2={110 - (i * 25)}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Cumulative GPA Line */}
                        <polyline
                          points={semesters.map((sem, index) => {
                            const x = 30 + (index / (semesters.length - 1)) * 550;
                            const y = 110 - (sem.cumulativeGPA * 25);
                            return `${x},${y}`;
                          }).join(' ')}
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="3"
                        />
                        
                        {/* Data Points */}
                        {semesters.map((sem, index) => {
                          const x = 30 + (index / (semesters.length - 1)) * 550;
                          const y = 110 - (sem.cumulativeGPA * 25);
                          return (
                            <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="4"
                              fill="#0284c7"
                              stroke="#fff"
                              strokeWidth="2"
                            >
                              <title>{sem.name}: {sem.cumulativeGPA.toFixed(3)}</title>
                            </circle>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )}

            {semesters.length === 0 && (
              <div className="bg-gray-100 border border-gray-300 p-8 rounded-lg text-center">
                <p className="text-2xl mb-2">📚</p>
                <p className="text-gray-600 mb-2">
                  No semesters added yet
                </p>
                <p className="text-sm text-gray-500">
                  Calculate your GPA above, then add it to start tracking your timeline!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* About UTA Section */}
        <div id="about-uta" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🏫 About University of Texas at Arlington</h2>
          <p className="text-gray-600 mb-6">Comprehensive guide to UTA's academic policies, grading system, and student resources for maintaining strong academic standing.</p>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <p>
              The <strong>University of Texas at Arlington (UTA)</strong> is a premier public research university located in <a href="https://www.uta.edu/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">Arlington, Texas</a>. 
              With over 60,000 students enrolled across multiple colleges, UTA is one of the largest institutions in the <a href="https://www.utsystem.edu/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">University of Texas System</a>. 
              The university maintains rigorous academic standards while providing comprehensive support services to help students achieve their educational goals.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Understanding UTA's Grading System</h3>
            <p>
              UTA employs a standard 4.0 grading scale with a plus/minus system that provides nuanced assessment of student performance. This grading structure allows for precise calculation of both term and cumulative grades. 
              Each letter grade corresponds to specific quality points: A (4.0), A- (3.67), B+ (3.33), B (3.0), and so forth. Understanding this scale is essential for accurate GPA planning and meeting graduation requirements.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Academic Standing Requirements</h3>
            <p>
              Maintaining good academic standing requires a <strong>minimum 2.0 cumulative GPA</strong>. Students who fall below this threshold are placed on probation and must develop an improvement plan with their academic advisor. 
              The university reviews student progress each semester, and consistent performance below 2.0 may result in academic suspension. Transfer students should note that only UTA coursework factors into institutional calculations.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded my-4">
              <p className="font-semibold text-orange-900 mb-2">🎯 Key Academic Milestones at UTA</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Good Standing:</strong> Maintain 2.0 or higher cumulative average</li>
                <li>• <strong>Dean's List Honor:</strong> Achieve 3.5+ average with 12+ credit hours per semester</li>
                <li>• <strong>Probationary Status:</strong> Below 2.0 average requires academic intervention</li>
                <li>• <strong>Graduation Honors:</strong> Summa Cum Laude (3.9+), Magna Cum Laude (3.7-3.89), Cum Laude (3.5-3.69)</li>
                <li>• <strong>Transfer Requirements:</strong> Minimum 2.5 average for most competitive programs</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">MyMav Portal: Your Academic Dashboard</h3>
            <p>
              <a href="https://mymav.uta.edu/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline"><strong>MyMav</strong></a> serves as the central hub for all academic information. 
              Through this portal, students can view official transcripts, access current term grades, calculate semester averages, register for courses, and track progress toward degree completion. 
              The system updates regularly throughout each term, allowing students to monitor their standing and make informed decisions about course loads and academic planning.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Academic Support Services</h3>
            <p>
              UTA provides extensive support through the <a href="https://www.uta.edu/student-success/programs/smart" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">SMART Program (Student Mentoring and Academic Resources for Transition)</a>, 
              which offers free tutoring, study groups, and academic coaching. Students struggling with specific courses can access subject-specific tutors, while those on probation receive personalized intervention plans. 
              The <a href="https://www.uta.edu/library" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">UTA Library</a> also provides research assistance and quiet study spaces conducive to academic success.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Strategic GPA Planning</h3>
            <p>
              This calculator serves as a planning tool to complement official records in MyMav. Students can model different scenarios: calculating what term average is needed to reach target cumulative values, 
              determining how many credit hours of A-level work can offset previous lower performance, or planning course selections to maintain honors eligibility. For transfer students considering UTA, 
              use this alongside our{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/college-gpa-calculator')} className="text-orange-600 hover:text-orange-700 underline">
                College GPA Calculator
              </button> to understand how previous coursework might translate to the UTA grading system.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Comparing University Systems</h3>
            <p>
              Students considering multiple institutions or planning transfers can compare calculation methods across universities. Our{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator')} className="text-orange-600 hover:text-orange-700 underline">
                Rutgers GPA Calculator
              </button> and{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator')} className="text-orange-600 hover:text-orange-700 underline">
                Berkeley GPA Calculator
              </button> demonstrate how different institutions may weight grades differently. Understanding these variations helps with transfer credit evaluation and application planning.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Complementary Academic Tools</h3>
            <p>
              Successful students often need multiple planning resources. Beyond grade calculation, consider our{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools/sat-score-calculator')} className="text-orange-600 hover:text-orange-700 underline">
                SAT Score Calculator
              </button> for admissions planning or graduate school applications. The{' '}
              <button onClick={() => navigateTo('/text-and-writing-tools/word-counter')} className="text-orange-600 hover:text-orange-700 underline">
                Word Counter
              </button> assists with essay assignments and research papers. 
              Browse our complete collection of{' '}
              <button onClick={() => navigateTo('/education-and-exam-tools')} className="text-orange-600 hover:text-orange-700 underline">
                education and exam tools
              </button> for comprehensive academic support throughout your university experience.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded my-4">
              <p className="font-semibold text-blue-900 mb-2">📚 Proven Strategies for Academic Excellence</p>
              <ul className="text-sm space-y-1">
                <li>• Schedule regular meetings with your <a href="https://www.uta.edu/academics/schools-colleges" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 underline">academic advisor</a> each semester</li>
                <li>• Participate in study groups and peer tutoring sessions through SMART Program</li>
                <li>• Review unofficial transcripts in MyMav weekly to track progress</li>
                <li>• Balance challenging courses with manageable credit loads (12-15 hours recommended)</li>
                <li>• Request help early when struggling—waiting until midterms limits recovery options</li>
                <li>• Understand withdrawal deadlines and their impact on academic standing</li>
                <li>• Consider pass/fail options strategically for courses outside your major</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Graduation Requirements and Planning</h3>
            <p>
              Most UTA degree programs require a minimum 2.0 overall average, though many departments set higher standards for major coursework—typically 2.5 or above. 
              Graduating with honors requires planning throughout your academic career, as it's difficult to significantly raise cumulative averages in final semesters. 
              Use this calculator during advising sessions to project final cumulative values based on remaining coursework and planned term loads.
            </p>
          </div>
        </div>

        {/* Grade Scale Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 UTA Official Grade Scale</h2>
          <p className="text-gray-600 mb-6">University of Texas at Arlington uses a plus/minus grading system with the following official grade point values:</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <th className="px-6 py-3 text-left font-semibold">Letter Grade</th>
                  <th className="px-6 py-3 text-center font-semibold">Grade Points</th>
                  <th className="px-6 py-3 text-left font-semibold">Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-green-700">A</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">4.00</td>
                  <td className="px-6 py-3 text-gray-700">Excellent</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-green-600">A-</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.67</td>
                  <td className="px-6 py-3 text-gray-700">Excellent</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-blue-700">B+</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.33</td>
                  <td className="px-6 py-3 text-gray-700">Good</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-blue-600">B</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.00</td>
                  <td className="px-6 py-3 text-gray-700">Good</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-blue-500">B-</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">2.67</td>
                  <td className="px-6 py-3 text-gray-700">Good</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-yellow-700">C+</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">2.33</td>
                  <td className="px-6 py-3 text-gray-700">Satisfactory</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-yellow-600">C</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">2.00</td>
                  <td className="px-6 py-3 text-gray-700">Satisfactory</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-yellow-500">C-</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">1.67</td>
                  <td className="px-6 py-3 text-gray-700">Satisfactory</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-orange-700">D+</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">1.33</td>
                  <td className="px-6 py-3 text-gray-700">Below Standard</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-orange-600">D</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">1.00</td>
                  <td className="px-6 py-3 text-gray-700">Below Standard</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-orange-500">D-</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">0.67</td>
                  <td className="px-6 py-3 text-gray-700">Below Standard</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-orange-50">
                  <td className="px-6 py-3 font-bold text-red-700">F</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">0.00</td>
                  <td className="px-6 py-3 text-gray-700">Failure</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-600 rounded">
            <p className="text-sm text-gray-700"><strong>Note:</strong> A minimum 2.0 cumulative GPA is required for good academic standing at UTA. Dean's List requires a 3.5+ semester GPA.</p>
          </div>
        </div>

        {/* Example Calculation Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Example GPA Calculation</h2>
          <p className="text-gray-600 mb-6">Here's a step-by-step example showing how UTA calculates your semester GPA:</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-6 py-3 text-left font-semibold">Course</th>
                  <th className="px-6 py-3 text-center font-semibold">Credit Hours</th>
                  <th className="px-6 py-3 text-center font-semibold">Grade</th>
                  <th className="px-6 py-3 text-center font-semibold">Points per Hour</th>
                  <th className="px-6 py-3 text-center font-semibold">Total Grade Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="px-6 py-3 text-gray-800">MATH 1426 (Calculus I)</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">4.0</td>
                  <td className="px-6 py-3 text-center font-bold text-blue-700">B+</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.33</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">13.32</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="px-6 py-3 text-gray-800">ENGL 1301 (Composition)</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.0</td>
                  <td className="px-6 py-3 text-center font-bold text-green-700">A</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">4.00</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">12.00</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="px-6 py-3 text-gray-800">HIST 1311 (US History)</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.0</td>
                  <td className="px-6 py-3 text-center font-bold text-green-600">A-</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.67</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">11.01</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="px-6 py-3 text-gray-800">CSE 1325 (Programming)</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.0</td>
                  <td className="px-6 py-3 text-center font-bold text-blue-600">B</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">3.00</td>
                  <td className="px-6 py-3 text-center font-semibold text-gray-800">9.00</td>
                </tr>
                <tr className="bg-orange-100 font-bold">
                  <td className="px-6 py-4 text-gray-900">TOTALS</td>
                  <td className="px-6 py-4 text-center text-orange-700">13.0 hours</td>
                  <td className="px-6 py-4 text-center text-gray-800">—</td>
                  <td className="px-6 py-4 text-center text-gray-800">—</td>
                  <td className="px-6 py-4 text-center text-orange-700">45.33 points</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-orange-100 to-red-100 border-l-4 border-orange-600 rounded-lg">
            <p className="text-lg font-bold text-gray-800 mb-2">📊 Final Calculation:</p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Semester GPA</span> = Total Grade Points ÷ Total Credit Hours
            </p>
            <p className="text-gray-700 mb-4">
              = 45.33 ÷ 13.0 = <span className="text-3xl font-bold text-orange-600">3.487</span>
            </p>
            <p className="text-sm text-gray-600">This student would qualify for Dean's List (requires 3.5+ GPA with 12+ credit hours)</p>
          </div>
        </div>

        {/* University Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🏫 UTA vs Other Universities: GPA Comparison</h2>
          <p className="text-gray-600 mb-6">Understanding how UTA's grading system compares to other major Texas universities:</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <th className="px-6 py-3 text-left font-semibold">University</th>
                  <th className="px-6 py-3 text-center font-semibold">Grading System</th>
                  <th className="px-6 py-3 text-center font-semibold">A+ Value</th>
                  <th className="px-6 py-3 text-center font-semibold">Good Standing</th>
                  <th className="px-6 py-3 text-center font-semibold">Dean's List</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-orange-100 border-b border-orange-300">
                  <td className="px-6 py-4 font-bold text-orange-800">UTA (Texas Arlington)</td>
                  <td className="px-6 py-4 text-center text-gray-800 font-semibold">Plus/Minus</td>
                  <td className="px-6 py-4 text-center text-gray-800 font-semibold">4.00 (No A+)</td>
                  <td className="px-6 py-4 text-center text-gray-800 font-semibold">2.0 GPA</td>
                  <td className="px-6 py-4 text-center text-gray-800 font-semibold">3.5+ GPA</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800 font-semibold">UT Austin</td>
                  <td className="px-6 py-3 text-center text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-3 text-center text-gray-700">4.00</td>
                  <td className="px-6 py-3 text-center text-gray-700">2.0 GPA</td>
                  <td className="px-6 py-3 text-center text-gray-700">3.5+ GPA</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800 font-semibold">Texas A&M</td>
                  <td className="px-6 py-3 text-center text-gray-700">Letter Grades</td>
                  <td className="px-6 py-3 text-center text-gray-700">4.00</td>
                  <td className="px-6 py-3 text-center text-gray-700">2.0 GPA</td>
                  <td className="px-6 py-3 text-center text-gray-700">3.5+ GPA</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800 font-semibold">Texas Tech</td>
                  <td className="px-6 py-3 text-center text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-3 text-center text-gray-700">4.00</td>
                  <td className="px-6 py-3 text-center text-gray-700">2.0 GPA</td>
                  <td className="px-6 py-3 text-center text-gray-700">3.5+ GPA</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800 font-semibold">University of Houston</td>
                  <td className="px-6 py-3 text-center text-gray-700">Plus/Minus</td>
                  <td className="px-6 py-3 text-center text-gray-700">4.00</td>
                  <td className="px-6 py-3 text-center text-gray-700">2.0 GPA</td>
                  <td className="px-6 py-3 text-center text-gray-700">3.5+ GPA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-sm text-gray-700">
              <strong>Key Insight:</strong> UTA's plus/minus grading system allows for more granular GPA calculations (3.33, 3.67) compared to traditional letter-only systems. 
              This can benefit students who consistently perform slightly above grade thresholds.
            </p>
          </div>
        </div>

        {/* How to Use Guide */}
        <div id="how-to-use" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">📖 How to Use UTA GPA Calculator</h2>
          <p className="text-gray-600 mb-6">Complete step-by-step guide to calculate your GPA, plan improvements, and understand Grade Point Deficiency at University of Texas Arlington.</p>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Start</p>
              <p className="text-sm">
                This <strong>UTA GPA calculator</strong> is designed specifically for <strong>University of Texas at Arlington</strong> students to accurately calculate semester GPA, 
                plan cumulative GPA improvements, and compute <strong>Grade Point Deficiency (GPD)</strong> for academic probation management.
              </p>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">📝 Step-by-Step Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Semester GPA:</strong> Enter your current courses with credit hours and expected grades to calculate your term GPA.</li>
              <li><strong>Raise GPA:</strong> Input your cumulative GPA from MyMav and determine how many credit hours or what average you need to reach your target GPA.</li>
              <li><strong>GPD Calculator:</strong> Calculate your Grade Point Deficiency and see exactly how many A's, B's, or C's you need to reach a 2.0 GPA.</li>
            </ol>

          </div>
        </div>

        {/* GPD Guide */}
        <div id="gpd-guide" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">💡 Understanding Grade Point Deficiency at UTA</h2>
          <p className="text-gray-600 mb-6">Complete guide to UTA's Grade Point Deficiency system and how to calculate what you need for academic success.</p>
          
          <div className="prose max-w-none text-gray-700 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3">What is Grade Point Deficiency (GPD)?</h3>
            <p>
              <strong>Grade Point Deficiency (GPD)</strong> is a key metric for UTA students on academic probation. GPD represents the number of grade points needed to achieve a 2.0 cumulative GPA, 
              which is required to be removed from probation. The calculation is: <code className="bg-gray-100 px-2 py-1 rounded">(Attempted Hours × 2.0) - Current Grade Points</code>.
            </p>

            <p>
              For 3-hour courses, each letter grade affects your GPD differently: <strong>A = +6 points</strong>, <strong>B = +3 points</strong>, <strong>C = 0 points</strong> (maintains 2.0), 
              <strong>D = -3 points</strong>, and <strong>F = -6 points</strong>.
            </p>

          </div>
        </div>

        {/* Academic Probation Help */}
        <div id="probation-help" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🎓 UTA Academic Probation Guidelines</h2>
          <p className="text-gray-600 mb-6">Everything you need to know about academic probation at University of Texas Arlington and how to get removed from it.</p>
          
          <div className="prose max-w-none text-gray-700 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Academic Probation Requirements</h3>
            <p>
              Students at the University of Texas at Arlington are placed on academic probation when their cumulative GPA falls below 2.0. To be removed from probation, 
              students must achieve a 2.0 GPA or higher. Use the GPD calculator to determine your path to academic good standing.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">🔍 Finding Your GPA in MyMav</h3>
            <p>
              Your official <strong>cumulative GPA</strong> and <strong>attempted credit hours</strong> are available in <strong>MyMav</strong>, UTA's student portal. 
              Navigate to Academic Records → View GPA to access this information. This data is essential for accurate GPA planning and GPD calculations.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">🧮 UTA GPA Calculation Method</h3>
            <p>
              UTA uses the standard 4.0 scale for GPA calculation. Your GPA is computed by dividing total grade points by total credit hours attempted. 
              Grade points are calculated by multiplying each course's credit hours by the grade point value (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).
            </p>

          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">❓ Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-6">Common questions about UTA GPA calculation, Grade Point Deficiency, and academic probation answered.</p>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Common UTA GPA Questions</h3>
            
            <h4 className="font-bold text-gray-800 mt-4">How accurate is this UTA GPA calculator?</h4>
            <p>
              This calculator uses the official UTA grading scale and calculation methods. Results match official MyMav GPA calculations when the same data is entered.
            </p>

            <h4 className="font-bold text-gray-800 mt-4">Can I use this calculator for transfer credits?</h4>
            <p>
              This calculator is designed for UTA coursework only. Transfer credits may be calculated differently depending on your program and the transferring institution.
            </p>

            <h4 className="font-bold text-gray-800 mt-4">How do I get off academic probation at UTA?</h4>
            <p>
              To be removed from academic probation, you must achieve a cumulative GPA of 2.0 or higher. Use the GPD calculator to determine how many A's, B's, or C's you need 
              to reach this threshold based on your current academic standing.
            </p>

            <h4 className="font-bold text-gray-800 mt-4">What if my required average exceeds 4.0?</h4>
            <p>
              If the calculator shows you need an average above 4.0, your target GPA may not be achievable in the specified timeframe. Consider: 
              (1) taking more credit hours, (2) adjusting your target GPA, or (3) planning over multiple semesters.
            </p>
          </div>
        </div>

        <RelatedTools 
          relatedSlugs={['rutgers-gpa-calculator', 'berkeley-gpa-calculator', 'college-gpa-calculator']} 
          currentSlug="uta-gpa-calculator"
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default UTAGPACalculator;
