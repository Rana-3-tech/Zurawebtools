import React, { useEffect, useState } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents from '../TableOfContents';

interface RutgersGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
}

const gradePoints: { [key: string]: number } = {
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D': 1.0,
  'F': 0.0
};

const popularCourses = [
  'Calculus', 'Physics', 'Chemistry', 'Matlab', 'Intro Psych', 'Engineering Design',
  'Data Structures', 'Linear Algebra', 'Discrete Math', 'Computer Architecture',
  'Thermodynamics', 'Fluid Mechanics', 'Circuits', 'Statics', 'Dynamics',
  'Intro to Engineering', 'Technical Writing', 'Differential Equations'
];

const examples = [
  {
    name: 'Example from Official Site',
    courses: [
      { name: 'Physics', grade: 'B', credits: '2' },
      { name: 'Calculus', grade: 'B', credits: '4' },
      { name: 'Chemistry', grade: 'C', credits: '3' },
      { name: 'Matlab', grade: 'C+', credits: '3' },
      { name: 'Intro Psych', grade: 'D', credits: '3' }
    ],
    description: 'Student with 15 credits and 2.300 GPA',
    expectedGPA: 2.3
  },
  {
    name: 'Engineering Student - Semester 1',
    courses: [
      { name: 'Calculus I', grade: 'A', credits: '4' },
      { name: 'Physics I', grade: 'B+', credits: '3' },
      { name: 'Engineering Design', grade: 'A', credits: '3' },
      { name: 'Intro to Engineering', grade: 'B', credits: '3' },
      { name: 'Technical Writing', grade: 'B+', credits: '3' }
    ],
    description: 'Strong first semester with 3.594 GPA',
    expectedGPA: 3.594
  },
  {
    name: 'Pre-Med Student',
    courses: [
      { name: 'General Chemistry', grade: 'A', credits: '4' },
      { name: 'Biology I', grade: 'A', credits: '4' },
      { name: 'Calculus', grade: 'B+', credits: '4' },
      { name: 'Psychology', grade: 'A', credits: '3' },
      { name: 'English Composition', grade: 'B', credits: '3' }
    ],
    description: 'High achiever with 3.694 GPA',
    expectedGPA: 3.694
  }
];

const isValidCreditsString = (s: string) => {
  const trimmed = s.trim();
  if (!trimmed) return false;
  if (!/^\d+(\.\d)?$/.test(trimmed)) return false;
  const num = parseFloat(trimmed);
  return num > 0 && num <= 6;
};

const RutgersGPACalculator: React.FC<RutgersGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: '' }
  ]);
  const [results, setResults] = useState<{
    gpa: number;
    totalCredits: number;
    totalPoints: number;
  } | null>(null);

  // Scenario Calculator States
  const [currentGPA, setCurrentGPA] = useState('');
  const [currentCredits, setCurrentCredits] = useState('');
  const [targetGPA, setTargetGPA] = useState('');
  const [newCredits, setNewCredits] = useState('');
  const [requiredGPA, setRequiredGPA] = useState<number | null>(null);

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (!course.name || !course.grade || !course.credits) return;

      const credits = parseFloat(course.credits);
      if (!isValidCreditsString(course.credits)) return;

      const gradeValue = gradePoints[course.grade] || 0;
      const points = gradeValue * credits;

      totalPoints += points;
      totalCredits += credits;
    });

    if (totalCredits > 0) {
      const gpa = totalPoints / totalCredits;
      setResults({
        gpa: parseFloat(gpa.toFixed(3)),
        totalCredits: parseFloat(totalCredits.toFixed(1)),
        totalPoints: parseFloat(totalPoints.toFixed(1))
      });
    } else {
      setResults(null);
    }
  };

  const calculateRequiredGPA = () => {
    const cgpa = parseFloat(currentGPA);
    const ccredits = parseFloat(currentCredits);
    const tgpa = parseFloat(targetGPA);
    const ncredits = parseFloat(newCredits);

    if (isNaN(cgpa) || isNaN(ccredits) || isNaN(tgpa) || isNaN(ncredits)) {
      setRequiredGPA(null);
      return;
    }

    if (ccredits <= 0 || ncredits <= 0 || tgpa < 0 || tgpa > 4 || cgpa < 0 || cgpa > 4) {
      setRequiredGPA(null);
      return;
    }

    // Formula: (currentPoints + neededPoints) / (currentCredits + newCredits) = targetGPA
    // Solving for neededPoints: neededPoints = (targetGPA * totalCredits) - currentPoints
    const currentPoints = cgpa * ccredits;
    const totalCredits = ccredits + ncredits;
    const neededPoints = (tgpa * totalCredits) - currentPoints;
    const required = neededPoints / ncredits;

    setRequiredGPA(parseFloat(required.toFixed(3)));
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      grade: '',
      credits: ''
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  useEffect(() => {
    calculateRequiredGPA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGPA, currentCredits, targetGPA, newCredits]);

  const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator';
  const shareText = 'Calculate your Rutgers University GPA with official grade scales. Free online calculator for engineering students and all majors!';

  const tocSections = [
    { 
      id: 'calculator', 
      emoji: '🧮', 
      title: 'GPA Calculator', 
      subtitle: 'Calculate your GPA',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-blue-100',
      hoverBorder: 'border-blue-400',
      hoverText: 'text-blue-700'
    },
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
      id: 'scenario', 
      emoji: '🎯', 
      title: 'Scenario Planner', 
      subtitle: 'Predict required GPA',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-green-100',
      hoverBorder: 'border-green-400',
      hoverText: 'text-green-700'
    },
    { 
      id: 'how-to-use', 
      emoji: '📋', 
      title: 'How to Use', 
      subtitle: 'Step-by-step guide',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-purple-100',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-700'
    },
    { 
      id: 'about', 
      emoji: 'ℹ️', 
      title: 'About Rutgers GPA', 
      subtitle: 'Official rules',
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
    document.title = 'Rutgers GPA Calculator 2026 | Free Engineering & College GPA Calculator with Weighted Average | ZuraWebTools';
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', 'Free Rutgers University GPA calculator 2026 – Calculate your semester and cumulative GPA using official Rutgers grade scales (A=4.0, B+=3.5). Engineering GPA calculator with major average, scenario planner to reach 3.0 GPA, and honors graduation requirements. No login required.');
    if (!metaDescription.parentElement) document.head.appendChild(metaDescription);

    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    metaKeywords.setAttribute('content', 'Rutgers GPA calculator free online, how to calculate Rutgers GPA step by step, Rutgers engineering GPA calculator 2026, what is major average at Rutgers, Rutgers cumulative GPA vs major GPA difference, how does Rutgers calculate GPA with credits, Rutgers semester GPA calculator with scenario planner, Rutgers honors graduation GPA requirements 3.2, can I retake courses at Rutgers to improve GPA, Rutgers weighted average GPA calculation formula, Rutgers University official GPA scale A B+ B C+, how to raise Rutgers GPA above 3.0 calculator');
    if (!metaKeywords.parentElement) document.head.appendChild(metaKeywords);

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', shareUrl);
    if (!canonical.parentElement) document.head.appendChild(canonical);

    const metaTags = [
      { property: 'og:title', content: 'Rutgers GPA Calculator 2026 | Free Engineering & College GPA Calculator' },
      { property: 'og:description', content: 'Calculate your Rutgers University GPA using official grade scales (A=4.0, B+=3.5). Engineering major average calculator, scenario planner to reach 3.0 GPA, and honors graduation requirements (3.2+). Free online tool for all Rutgers students.' },
      { property: 'og:url', content: shareUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://zurawebtools.com/images/rutgers-gpa-calculator-og.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Rutgers GPA Calculator 2026 | Free Engineering & College GPA Calculator' },
      { name: 'twitter:description', content: 'Calculate your Rutgers University GPA using official grade scales (A=4.0, B+=3.5). Engineering major average calculator, scenario planner to reach 3.0 GPA, and honors graduation requirements (3.2+). Free online tool for all Rutgers students.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/images/rutgers-gpa-calculator-twitter.jpg' },
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

    // Structured Data - Software Application
    const softwareSchema = (document.getElementById('rutgers-gpa-software-schema') || document.createElement('script')) as HTMLScriptElement;
    softwareSchema.id = 'rutgers-gpa-software-schema';
    softwareSchema.type = 'application/ld+json';
    softwareSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Rutgers GPA Calculator",
      "description": "Free 2026 Rutgers University GPA calculator using official grade scales (A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0, D=1.0, F=0.0). Calculate semester GPA, cumulative GPA, major average, and predict required GPA for target goals. Includes scenario planner, retake course calculator, and honors graduation requirements (3.2+ for honors, 3.4+ for high honors, 3.65+ for highest honors).",
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
        "Official Rutgers Grade Scale (A=4.0 to F=0.0)",
        "Semester GPA Calculator",
        "Cumulative GPA Calculator",
        "Major Average Calculator",
        "Scenario Planner for Target GPA",
        "Retake Course Calculator",
        "Honors Graduation Requirements"
      ],
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student"
      }
    });
    if (!softwareSchema.parentElement) document.head.appendChild(softwareSchema);

    // Structured Data - Breadcrumbs
    const breadcrumbSchema = (document.getElementById('rutgers-gpa-breadcrumb-schema') || document.createElement('script')) as HTMLScriptElement;
    breadcrumbSchema.id = 'rutgers-gpa-breadcrumb-schema';
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
          "name": "University GPA Tools",
          "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Rutgers GPA Calculator",
          "item": shareUrl
        }
      ]
    });
    if (!breadcrumbSchema.parentElement) document.head.appendChild(breadcrumbSchema);

    // Structured Data - WebPage
    const webPageSchema = (document.getElementById('rutgers-gpa-webpage-schema') || document.createElement('script')) as HTMLScriptElement;
    webPageSchema.id = 'rutgers-gpa-webpage-schema';
    webPageSchema.type = 'application/ld+json';
    webPageSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Rutgers GPA Calculator 2026",
      "description": "Free Rutgers University GPA calculator using official grade scales. Calculate semester GPA, cumulative GPA, major average, and predict required GPA for academic goals.",
      "url": shareUrl,
      "datePublished": "2025-01-01",
      "dateModified": "2025-11-18",
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
            "name": "University GPA Tools",
            "item": "https://zurawebtools.com/education-and-exam-tools/university-gpa-tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Rutgers GPA Calculator"
          }
        ]
      },
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "Rutgers GPA Calculator",
        "applicationCategory": "EducationalApplication"
      },
      "about": {
        "@type": "Thing",
        "name": "Rutgers University GPA Calculation",
        "description": "Official Rutgers University grade point average calculation using weighted average method"
      },
      "keywords": "Rutgers GPA calculator, how to calculate Rutgers GPA, Rutgers engineering GPA, major average calculator"
    });
    if (!webPageSchema.parentElement) document.head.appendChild(webPageSchema);

    // Structured Data - Organization
    const organizationSchema = (document.getElementById('rutgers-gpa-organization-schema') || document.createElement('script')) as HTMLScriptElement;
    organizationSchema.id = 'rutgers-gpa-organization-schema';
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
    const howToSchema = (document.getElementById('rutgers-gpa-howto-schema') || document.createElement('script')) as HTMLScriptElement;
    howToSchema.id = 'rutgers-gpa-howto-schema';
    howToSchema.type = 'application/ld+json';
    howToSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Rutgers GPA Using Weighted Average Method",
      "description": "Step-by-step guide to calculating your Rutgers University GPA using the official weighted average method with grade values (A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0, D=1.0, F=0.0).",
      "image": "https://zurawebtools.com/images/rutgers-gpa-calculator-og.jpg",
      "totalTime": "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "List Your Courses",
          "text": "Write down all your courses with their letter grades and credit hours."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Convert Grades to Points",
          "text": "Use the Rutgers grade scale: A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0, D=1.0, F=0.0"
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Calculate Quality Points",
          "text": "Multiply each grade value by the number of credits for that course (Grade × Credits = Points)."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Sum Total Points and Credits",
          "text": "Add all quality points together and add all credits together."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Divide to Get GPA",
          "text": "Divide total quality points by total credits to get your GPA (Total Points ÷ Total Credits = GPA)."
        }
      ]
    });
    if (!howToSchema.parentElement) document.head.appendChild(howToSchema);

    // Structured Data - FAQPage
    const faqSchema = (document.getElementById('rutgers-gpa-faq-schema') || document.createElement('script')) as HTMLScriptElement;
    faqSchema.id = 'rutgers-gpa-faq-schema';
    faqSchema.type = 'application/ld+json';
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I calculate my Rutgers GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use the weighted average method: 1) List courses with grades and credits, 2) Convert grades to points (A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0, D=1.0, F=0.0), 3) Multiply grade value by credits for each course, 4) Sum all points and credits, 5) Divide total points by total credits."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between cumulative GPA and major average at Rutgers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cumulative GPA includes ALL courses except E-prefixed or Pass/No Credit courses. Major average only includes courses with an 'M' prefix on your unofficial transcript (for Engineering, all courses except 440:127 and 440:221). Both must be 2.0+ to graduate."
          }
        },
        {
          "@type": "Question",
          "name": "Can I retake courses at Rutgers to improve my GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can retake courses where you received below C (D or F grades). You cannot retake courses with C or better. You also cannot take equivalent courses you've already passed with C+ or take courses backwards in a sequence (e.g., retaking Calc 1 after completing Calc 4)."
          }
        },
        {
          "@type": "Question",
          "name": "What GPA do I need to graduate with honors at Rutgers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Honors: 3.200+ GPA, High Honors: 3.400+ GPA, Highest Honors: 3.650+ GPA. These are cumulative GPA requirements for graduation."
          }
        },
        {
          "@type": "Question",
          "name": "How can I raise my Rutgers GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1) Take additional courses outside your degree requirements (they count toward overall GPA), 2) Retake courses where you received D or F grades, 3) Use the scenario planner to calculate what semester GPA you need to reach your target cumulative GPA."
          }
        }
      ]
    });
    if (!faqSchema.parentElement) document.head.appendChild(faqSchema);

    return () => {
      // Cleanup schemas on unmount
      const schemas = [
        'rutgers-gpa-software-schema',
        'rutgers-gpa-breadcrumb-schema',
        'rutgers-gpa-webpage-schema',
        'rutgers-gpa-organization-schema',
        'rutgers-gpa-howto-schema',
        'rutgers-gpa-faq-schema'
      ];
      schemas.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Rutgers GPA Calculator
          </h1>
          <p className="text-xl text-red-100">
            Calculate your Rutgers University GPA using official grade scales. Free tool for engineering students and all majors.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Calculator Section */}
        <section id="calculator" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🧮</span>
            GPA Calculator
          </h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Rutgers Grade Scale</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-white p-2 rounded"><span className="font-semibold">A:</span> 4.0</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold">B+:</span> 3.5</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold">B:</span> 3.0</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold">C+:</span> 2.5</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold">C:</span> 2.0</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold">D:</span> 1.0</div>
              <div className="bg-white p-2 rounded"><span className="font-semibold">F:</span> 0.0</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={addCourse}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              + Add Course
            </button>
          </div>

          {/* Course Input - Mobile Optimized */}
          <div className="mb-6">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="p-3 text-left">Course Name</th>
                    <th className="p-3 text-center">Grade</th>
                    <th className="p-3 text-center">Credits</th>
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
                          placeholder="e.g., Calculus"
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                          list="courses"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
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
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
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
                    <span className="text-sm font-bold text-red-600">Course #{index + 1}</span>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
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
                        placeholder="e.g., Calculus"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-base text-gray-900"
                        list="courses"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-base text-gray-900"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-base text-gray-900"
                        />
                      </div>
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
            <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-4">Your GPA Results</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">GPA</div>
                  <div className="text-3xl font-bold text-red-600">{results.gpa.toFixed(3)}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Total Credits</div>
                  <div className="text-3xl font-bold text-gray-900">{results.totalCredits}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">Total Points</div>
                  <div className="text-3xl font-bold text-gray-900">{results.totalPoints}</div>
                </div>
              </div>
              
              {/* Honors Status */}
              <div className="mt-4 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Honors Status</h4>
                <div className="space-y-1 text-sm">
                  {results.gpa >= 3.65 && (
                    <div className="text-amber-600 font-semibold">🏆 Eligible for Highest Honors (3.650+)</div>
                  )}
                  {results.gpa >= 3.4 && results.gpa < 3.65 && (
                    <div className="text-amber-600 font-semibold">🥈 Eligible for High Honors (3.400+)</div>
                  )}
                  {results.gpa >= 3.2 && results.gpa < 3.4 && (
                    <div className="text-amber-600 font-semibold">🥉 Eligible for Honors (3.200+)</div>
                  )}
                  {results.gpa >= 2.0 && results.gpa < 3.2 && (
                    <div className="text-gray-600">Good standing (2.0+ required)</div>
                  )}
                  {results.gpa < 2.0 && (
                    <div className="text-red-600 font-semibold">⚠️ Below 2.0 minimum requirement</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Table of Contents */}
        <TableOfContents sections={tocSections} />

        {/* Examples Section */}
        <section id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">💡</span>
            Quick Examples
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-5 hover:border-red-400 transition-colors">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{example.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                <div className="text-2xl font-bold text-red-600 mb-4">
                  GPA: {example.expectedGPA.toFixed(3)}
                </div>
                <button
                  onClick={() => loadExample(index)}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Load Example
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Scenario Planner */}
        <section id="scenario" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            Scenario Planner
          </h2>
          
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-900">
              <strong>Example from Rutgers Official Site:</strong> If you have a 2.300 GPA with 15 credits and want to reach 3.0 by taking 14 new credits (after dropping a D course), you'll need a 3.321 semester GPA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Cumulative GPA</label>
              <input
                type="number"
                value={currentGPA}
                onChange={(e) => setCurrentGPA(e.target.value)}
                placeholder="2.300"
                min="0"
                max="4"
                step="0.001"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Total Credits</label>
              <input
                type="number"
                value={currentCredits}
                onChange={(e) => setCurrentCredits(e.target.value)}
                placeholder="15"
                min="0"
                step="0.5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target GPA</label>
              <input
                type="number"
                value={targetGPA}
                onChange={(e) => setTargetGPA(e.target.value)}
                placeholder="3.000"
                min="0"
                max="4"
                step="0.001"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Semester Credits</label>
              <input
                type="number"
                value={newCredits}
                onChange={(e) => setNewCredits(e.target.value)}
                placeholder="14"
                min="0"
                step="0.5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 text-gray-900"
              />
            </div>
          </div>

          {requiredGPA !== null && (
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-2">Required Semester GPA</h3>
              <div className="text-4xl font-bold text-green-600 mb-4">
                {requiredGPA.toFixed(3)}
              </div>
              {requiredGPA > 4.0 && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm">
                  ⚠️ Required GPA is above 4.0 - Your target may not be achievable with the specified credits.
                </div>
              )}
              {requiredGPA <= 4.0 && requiredGPA >= 0 && (
                <div className="p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-800 text-sm">
                  ✅ This target is achievable! Aim for a {requiredGPA.toFixed(3)} GPA in your {newCredits} credit semester.
                </div>
              )}
            </div>
          )}
        </section>

        {/* How to Use Section */}
        <section id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">📋</span>
            How to Use This Calculator
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Enter Your Courses</h3>
                <p className="text-gray-700">Add each course name, select the letter grade you received (A, B+, B, C+, C, D, or F), and enter the credit hours.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Review Instant Results</h3>
                <p className="text-gray-700">Your GPA is calculated automatically using the Rutgers weighted average method (Grade Value × Credits = Points, then Total Points ÷ Total Credits = GPA).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Use Scenario Planner</h3>
                <p className="text-gray-700">Plan your academic future by calculating what semester GPA you need to reach your target cumulative GPA.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Check Honors Eligibility</h3>
                <p className="text-gray-700">See if you qualify for honors (3.2+), high honors (3.4+), or highest honors (3.65+) graduation status.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">ℹ️</span>
            About Rutgers GPA Calculation
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Weighted Average Method</h3>
              <p className="mb-3">
                Rutgers University uses the <strong>Weighted Average</strong> method from mathematics to calculate GPA. Each letter grade corresponds to a numeric value (grade points):
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div><strong>A:</strong> 4.0</div>
                  <div><strong>B+:</strong> 3.5</div>
                  <div><strong>B:</strong> 3.0</div>
                  <div><strong>C+:</strong> 2.5</div>
                  <div><strong>C:</strong> 2.0</div>
                  <div><strong>D:</strong> 1.0</div>
                  <div><strong>F:</strong> 0.0</div>
                </div>
              </div>
              <p>
                To calculate your GPA: List courses with grades and credits → Multiply grade value by credits for each course (= Quality Points) → Add all points together → Add all credits together → Divide total points by total credits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cumulative GPA vs Major Average</h3>
              <p className="mb-3">
                <strong>Cumulative Average:</strong> Includes ALL courses except E-prefixed courses or Pass/No Credit courses. This is your overall GPA across all classes.
              </p>
              <p className="mb-3">
                <strong>Major Average:</strong> Calculated from a select list of courses specific to your major. For Engineering students, all engineering courses are included except 440:127 and 440:221. Major average courses are marked with an "M" prefix on unofficial transcripts.
              </p>
              <p>
                <strong>Graduation Requirement:</strong> Both your cumulative GPA and major average must be at least 2.0 to graduate.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Raising Your GPA</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Take courses outside your major - they count toward overall GPA</li>
                <li>Retake courses where you received a D or F (cannot retake C or better)</li>
                <li>You cannot take equivalent courses if you've already passed one with C or better</li>
                <li>You cannot go backwards in sequential courses (e.g., retake Calc 1 after completing Calc 4)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Honors Graduation Requirements</h3>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
                <ul className="space-y-2">
                  <li><strong>Honors:</strong> 3.200+ cumulative GPA</li>
                  <li><strong>High Honors:</strong> 3.400+ cumulative GPA</li>
                  <li><strong>Highest Honors:</strong> 3.650+ cumulative GPA</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-2">📚 Official Calculation Example</h4>
              <p className="text-sm text-blue-900 mb-3">
                From Rutgers official documentation:
              </p>
              <div className="bg-white p-4 rounded text-sm space-y-2">
                <div className="grid grid-cols-4 gap-2 font-bold border-b pb-2">
                  <div>Course</div>
                  <div>Grade</div>
                  <div>Credits</div>
                  <div>Points</div>
                </div>
                <div className="grid grid-cols-4 gap-2"><div>Physics</div><div>B (3.0)</div><div>2</div><div>6.0</div></div>
                <div className="grid grid-cols-4 gap-2"><div>Calculus</div><div>B (3.0)</div><div>4</div><div>12.0</div></div>
                <div className="grid grid-cols-4 gap-2"><div>Chemistry</div><div>C (2.0)</div><div>3</div><div>6.0</div></div>
                <div className="grid grid-cols-4 gap-2"><div>Matlab</div><div>C+ (2.5)</div><div>3</div><div>7.5</div></div>
                <div className="grid grid-cols-4 gap-2"><div>Intro Psych</div><div>D (1.0)</div><div>3</div><div>3.0</div></div>
                <div className="grid grid-cols-4 gap-2 font-bold border-t pt-2">
                  <div>Total:</div><div></div><div>15 cr</div><div>34.5 pts</div>
                </div>
                <div className="pt-2 font-bold text-red-600">
                  GPA = 34.5 ÷ 15 = 2.300
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">❓</span>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                How do I calculate my Rutgers GPA?
              </summary>
              <p className="mt-3 text-gray-700">
                Use the weighted average method: 1) List courses with letter grades and credits, 2) Convert grades to points using the Rutgers scale (A=4.0, B+=3.5, B=3.0, etc.), 3) Multiply each grade value by its credits to get quality points, 4) Sum all quality points and all credits, 5) Divide total points by total credits to get your GPA.
              </p>
            </details>

            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                What is the difference between cumulative GPA and major average at Rutgers?
              </summary>
              <p className="mt-3 text-gray-700">
                <strong>Cumulative GPA</strong> includes ALL courses except E-prefixed or Pass/No Credit courses. <strong>Major average</strong> only includes courses with an "M" prefix on your unofficial transcript (specific to your major). For Engineering, all courses except 440:127 and 440:221 count toward major average. Both must be 2.0+ to graduate, and the major average is used internally by departments.
              </p>
            </details>

            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                Can I retake courses at Rutgers to improve my GPA?
              </summary>
              <p className="mt-3 text-gray-700">
                Yes, but with restrictions: You can retake courses where you received a D or F grade. You <strong>cannot</strong> retake courses where you earned a C or better. You also cannot take equivalent courses if you've already passed one with C or better, and you cannot go backwards in sequential courses (e.g., retaking Calc 1 after completing Calc 4).
              </p>
            </details>

            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                What GPA do I need to graduate with honors at Rutgers?
              </summary>
              <p className="mt-3 text-gray-700">
                <strong>Honors:</strong> 3.200+ cumulative GPA<br/>
                <strong>High Honors:</strong> 3.400+ cumulative GPA<br/>
                <strong>Highest Honors:</strong> 3.650+ cumulative GPA<br/>
                These are final cumulative GPA requirements at graduation.
              </p>
            </details>

            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                How can I raise my Rutgers GPA?
              </summary>
              <p className="mt-3 text-gray-700">
                Three main strategies: 1) Take additional courses outside your degree requirements (they count toward overall GPA), 2) Retake courses where you received D or F grades to replace those grades, 3) Use the scenario planner tool above to calculate exactly what semester GPA you need to reach your target cumulative GPA.
              </p>
            </details>

            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                What if I want to repeat a course to remove a D from my GPA?
              </summary>
              <p className="mt-3 text-gray-700">
                When you retake a course, the D grade and its credits are removed from your GPA calculation. Use the scenario planner: subtract the D's points and credits from your current totals, then calculate what new semester GPA you need with your planned credits. Example: If you have 15cr/34.5pts (2.300 GPA) and repeat a 3cr D course (removing 3pts and 3cr), you'll have 12cr/31.5pts. To reach 3.0 with 14 new credits, you'd need a 3.321 semester GPA.
              </p>
            </details>

            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                Is this calculator accurate for all Rutgers schools?
              </summary>
              <p className="mt-3 text-gray-700">
                Yes! This calculator uses the official Rutgers grade scale and weighted average calculation method that applies to all schools within Rutgers University, including the School of Engineering, School of Arts and Sciences, Business School, and all other undergraduate programs.
              </p>
            </details>

            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                Where can I find my total points and credits?
              </summary>
              <p className="mt-3 text-gray-700">
                You can find your total quality points and total credits at the bottom of your official Rutgers transcript. These values are useful for using the scenario planner to predict what GPA you need to reach specific goals (like getting off probation, reaching 3.0, or qualifying for honors).
              </p>
            </details>
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools 
          currentSlug="rutgers-gpa-calculator"
          relatedSlugs={['berkeley-gpa-calculator', 'college-gpa-calculator', 'lsac-gpa-calculator', 'csu-gpa-calculator']}
          navigateTo={navigateTo}
        />
      </div>
    </div>
  );
};

export default RutgersGPACalculator;
