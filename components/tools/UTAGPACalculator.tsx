import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
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
  
  // Basic Calculator State
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', creditHours: '', grade: '' },
    { id: 2, name: '', creditHours: '', grade: '' },
    { id: 3, name: '', creditHours: '', grade: '' },
    { id: 4, name: '', creditHours: '', grade: '' },
  ]);
  const [calculatedGPA, setCalculatedGPA] = useState<number | null>(null);

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
    document.title = "UTA GPA Calculator - University of Texas at Arlington Grade Calculator | ZuraWebTools";
    
    const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uta-gpa-calculator';
    
    const metaTags = [
      { name: 'description', content: 'Free UTA GPA calculator for University of Texas at Arlington students. Calculate semester GPA, raise cumulative GPA, and compute Grade Point Deficiency (GPD) with official UTA grade scales.' },
      { name: 'keywords', content: 'UTA GPA calculator, University of Texas Arlington GPA, UTA grade calculator, GPD calculator, grade point deficiency UTA, raise GPA UTA, UTA cumulative GPA, MyMav GPA, UTA academic probation calculator, UT Arlington GPA tool' },
      { property: 'og:title', content: 'UTA GPA Calculator - University of Texas at Arlington | ZuraWebTools' },
      { property: 'og:description', content: 'Calculate your UTA GPA, determine Grade Point Deficiency (GPD), and plan how to raise your cumulative GPA at University of Texas Arlington.' },
      { property: 'og:url', content: shareUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://zurawebtools.com/images/uta-gpa-calculator-og.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'UTA GPA Calculator - University of Texas at Arlington' },
      { name: 'twitter:description', content: 'Free GPA calculator for UTA students with GPD computation and academic planning tools.' },
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
        "description": "Free GPA calculator for University of Texas at Arlington students with Grade Point Deficiency computation.",
        "url": shareUrl,
        "author": {
          "@type": "Organization",
          "name": "ZuraWebTools",
          "url": "https://zurawebtools.com"
        },
        "featureList": [
          "Calculate semester GPA",
          "Compute Grade Point Deficiency (GPD)",
          "Raise cumulative GPA planner",
          "Academic probation calculator",
          "UTA official grade scale"
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
      setCalculatedGPA(totalPoints / totalHours);
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

    if (!isNaN(currentGPA) && !isNaN(hours) && !isNaN(target) && !isNaN(average) && hours > 0) {
      const currentPoints = currentGPA * hours;
      const hoursNeeded = Math.ceil((target * hours - currentPoints) / (average - target));
      setRaiseResults(prev => ({ ...prev, hoursNeeded: hoursNeeded > 0 ? hoursNeeded : 0 }));
    }
  };

  const calculateTermAverage = () => {
    const currentGPA = parseFloat(cumulativeGPA);
    const hours = parseFloat(attemptedHours);
    const termHours = parseFloat(currentHours);
    const target = parseFloat(termTargetGPA);

    if (!isNaN(currentGPA) && !isNaN(hours) && !isNaN(termHours) && !isNaN(target) && hours > 0 && termHours > 0) {
      const currentPoints = currentGPA * hours;
      const requiredPoints = target * (hours + termHours);
      const neededPoints = requiredPoints - currentPoints;
      const requiredAverage = neededPoints / termHours;
      
      setRaiseResults(prev => ({ ...prev, requiredAverage: requiredAverage }));
    }
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
      
      const aGrades = gpd > 0 ? Math.ceil(gpd / row.A) : 0;
      const bGrades = gpd > 0 ? Math.ceil(gpd / row.B) : 0;
      const cGrades = row.C > 0 ? Math.ceil(gpd / row.C) : 0;

      setGpdResult({
        gpd: parseFloat(gpd.toFixed(2)),
        aGrades,
        bGrades,
        cGrades: cGrades > 0 ? cGrades : null
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
            UTA GPA Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Official <strong>University of Texas at Arlington</strong> GPA calculator. Calculate semester GPA, raise cumulative GPA, and compute <strong>Grade Point Deficiency (GPD)</strong> for academic probation planning.
          </p>
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
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Semester GPA</h2>
            
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grade
                    </label>
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            </div>

            {calculatedGPA !== null && (
              <div className="bg-gradient-to-r from-orange-100 to-red-100 border-l-4 border-orange-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Semester GPA</h3>
                <p className="text-5xl font-bold text-orange-600">{calculatedGPA.toFixed(3)}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Total Credit Hours: {courses.reduce((sum, c) => sum + (parseFloat(c.creditHours) || 0), 0).toFixed(1)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Raise GPA Tab */}
        {activeTab === 'raise' && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Raise Your Cumulative GPA</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Find your cumulative GPA in MyMav:</strong> Log in to MyMav → Academic Records → View GPA and attempted credit hours.
              </p>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button
                onClick={calculateRaiseGPA}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold"
              >
                Calculate Hours Needed
              </button>

              {raiseResults.hoursNeeded !== null && (
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800">
                    You need approximately <span className="text-green-600 text-2xl">{raiseResults.hoursNeeded}</span> additional credit hours
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    This assumes you maintain a {maintainAverage} average on all future courses.
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button
                onClick={calculateTermAverage}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-semibold"
              >
                Calculate Required Average
              </button>

              {raiseResults.requiredAverage !== null && (
                <div className={`mt-4 border-l-4 p-4 rounded-lg ${
                  raiseResults.requiredAverage <= 4.0 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <p className="text-lg font-bold text-gray-800">
                    You need an average of <span className={`text-2xl ${raiseResults.requiredAverage <= 4.0 ? 'text-green-600' : 'text-red-600'}`}>
                      {raiseResults.requiredAverage.toFixed(2)}
                    </span> this term
                  </p>
                  {raiseResults.requiredAverage > 4.0 && (
                    <p className="text-sm text-red-600 mt-2">
                      ⚠️ This target is not achievable (exceeds 4.0). Consider adjusting your target GPA or taking more credit hours.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GPD Calculator Tab */}
        {activeTab === 'gpd' && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Grade Point Deficiency (GPD) Calculator</h2>
            
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired GPA
                </label>
                <select
                  value={desiredGPAForGPD}
                  onChange={(e) => setDesiredGPAForGPD(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Your Grade Point Deficiency</h3>
                  <p className="text-4xl font-bold text-orange-600">{gpdResult.gpd}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {gpdResult.gpd > 0 
                      ? `You need ${gpdResult.gpd} grade points to reach a ${desiredGPAForGPD} GPA`
                      : 'You have met or exceeded your target GPA!'}
                  </p>
                </div>

                {gpdResult.gpd > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">A's Needed (3-hour courses)</p>
                      <p className="text-3xl font-bold text-green-600">{gpdResult.aGrades}</p>
                      <p className="text-xs text-gray-500 mt-1">Each A = +6 points</p>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">B's Needed (3-hour courses)</p>
                      <p className="text-3xl font-bold text-blue-600">{gpdResult.bGrades}</p>
                      <p className="text-xs text-gray-500 mt-1">Each B = +3 points</p>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">C's Impact</p>
                      <p className="text-3xl font-bold text-yellow-600">0</p>
                      <p className="text-xs text-gray-500 mt-1">C's maintain 2.0 GPA</p>
                    </div>
                  </div>
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

        {/* UTA Grade Scale */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Official UTA Grade Scale</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="font-bold text-lg text-gray-800">{grade}</p>
                <p className="text-sm text-gray-600">{points.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About UTA GPA Calculator</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              This <strong>UTA GPA calculator</strong> is designed specifically for <strong>University of Texas at Arlington</strong> students to accurately calculate semester GPA, 
              plan cumulative GPA improvements, and compute <strong>Grade Point Deficiency (GPD)</strong> for academic probation management.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">How to Use the UTA GPA Calculator</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Semester GPA:</strong> Enter your current courses with credit hours and expected grades to calculate your term GPA.</li>
              <li><strong>Raise GPA:</strong> Input your cumulative GPA from MyMav and determine how many credit hours or what average you need to reach your target GPA.</li>
              <li><strong>GPD Calculator:</strong> Calculate your Grade Point Deficiency and see exactly how many A's, B's, or C's you need to reach a 2.0 GPA.</li>
            </ol>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Understanding Grade Point Deficiency at UTA</h3>
            <p>
              <strong>Grade Point Deficiency (GPD)</strong> is a key metric for UTA students on academic probation. GPD represents the number of grade points needed to achieve a 2.0 cumulative GPA, 
              which is required to be removed from probation. The calculation is: <code className="bg-gray-100 px-2 py-1 rounded">(Attempted Hours × 2.0) - Current Grade Points</code>.
            </p>

            <p>
              For 3-hour courses, each letter grade affects your GPD differently: <strong>A = +6 points</strong>, <strong>B = +3 points</strong>, <strong>C = 0 points</strong> (maintains 2.0), 
              <strong>D = -3 points</strong>, and <strong>F = -6 points</strong>.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">UTA Academic Probation Guidelines</h3>
            <p>
              Students at the University of Texas at Arlington are placed on academic probation when their cumulative GPA falls below 2.0. To be removed from probation, 
              students must achieve a 2.0 GPA or higher. Use the GPD calculator to determine your path to academic good standing.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Finding Your GPA in MyMav</h3>
            <p>
              Your official <strong>cumulative GPA</strong> and <strong>attempted credit hours</strong> are available in <strong>MyMav</strong>, UTA's student portal. 
              Navigate to Academic Records → View GPA to access this information. This data is essential for accurate GPA planning and GPD calculations.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">UTA GPA Calculation Method</h3>
            <p>
              UTA uses the standard 4.0 scale for GPA calculation. Your GPA is computed by dividing total grade points by total credit hours attempted. 
              Grade points are calculated by multiplying each course's credit hours by the grade point value (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">Frequently Asked Questions</h3>
            
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
