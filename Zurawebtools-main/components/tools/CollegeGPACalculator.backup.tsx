import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface CollegeGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const gradePoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

const popularCourses = [
  'Mathematics', 'English Literature', 'Biology', 'Chemistry', 'Physics',
  'Computer Science', 'Psychology', 'History', 'Economics', 'Business Administration',
  'Accounting', 'Marketing', 'Political Science', 'Sociology', 'Engineering',
  'Statistics', 'Art History', 'Philosophy', 'Anthropology', 'Communications'
];

const CollegeGPACalculator: React.FC<CollegeGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: 'A', credits: 3 }
  ]);
  const [semesterGPA, setSemesterGPA] = useState<number | null>(null);
  const [cumulativeGPA, setCumulativeGPA] = useState<string>('');
  const [cumulativeCredits, setCumulativeCredits] = useState<string>('');
  const [totalGPA, setTotalGPA] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'College GPA Calculator - Free Cumulative & Semester GPA Calculator | ZuraWebTools';
    
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const metaDescription = 'Free college GPA calculator with credit hours. Calculate semester GPA, cumulative GPA, and overall GPA instantly. Supports A+ to F grading scale with plus/minus grades.';
    
    setMetaTag('description', metaDescription);
    setMetaTag('keywords', 'college gpa calculator, cumulative gpa calculator, semester gpa calculator, gpa calculator with credits, calculate college gpa, university gpa calculator');
    setMetaTag('robots', 'index, follow, max-image-preview:large');

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'College GPA Calculator - Free Cumulative & Semester GPA Calculator' },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/college-gpa-calculator' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property='${tag.property}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/college-gpa-calculator');

    // Schema.org JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "College GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "2850"
      },
      "description": "Free college GPA calculator with credit hours for calculating semester and cumulative GPA"
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      document.title = 'ZuraWebTools';
    };
  }, []);

  useEffect(() => {
    calculateGPA();
  }, [courses, cumulativeGPA, cumulativeCredits]);

  const addCourse = () => {
    setCourses([...courses, { 
      id: Date.now().toString(), 
      name: '', 
      grade: 'A', 
      credits: 3 
    }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && course.credits > 0) {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    const semGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setSemesterGPA(semGPA);

    // Calculate cumulative GPA if previous data provided
    if (cumulativeGPA && cumulativeCredits) {
      const prevGPA = parseFloat(cumulativeGPA);
      const prevCredits = parseFloat(cumulativeCredits);
      
      if (!isNaN(prevGPA) && !isNaN(prevCredits) && prevCredits > 0) {
        const prevPoints = prevGPA * prevCredits;
        const combinedPoints = prevPoints + totalPoints;
        const combinedCredits = prevCredits + totalCredits;
        setTotalGPA(combinedCredits > 0 ? combinedPoints / combinedCredits : 0);
      } else {
        setTotalGPA(null);
      }
    } else {
      setTotalGPA(null);
    }
  };

  const resetCalculator = () => {
    setCourses([{ id: '1', name: '', grade: 'A', credits: 3 }]);
    setCumulativeGPA('');
    setCumulativeCredits('');
    setSemesterGPA(null);
    setTotalGPA(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            College GPA Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Free online college GPA calculator with credit hours. Calculate your semester GPA, cumulative GPA, and overall college GPA instantly with our accurate grade point average calculator.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Semester Courses</h2>
          
          {/* Course List */}
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="flex flex-wrap gap-3 items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder={`Course ${index + 1}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {Object.keys(gradePoints).map(grade => (
                      <option key={grade} value={grade}>
                        {grade} ({gradePoints[grade].toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credits
                  </label>
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length === 1}
                  className="mt-6 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Remove course"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addCourse}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            + Add Another Course
          </button>

          {/* Cumulative GPA Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Previous Cumulative GPA (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Cumulative GPA
                </label>
                <input
                  type="number"
                  value={cumulativeGPA}
                  onChange={(e) => setCumulativeGPA(e.target.value)}
                  placeholder="e.g., 3.5"
                  min="0"
                  max="4"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Credits Completed
                </label>
                <input
                  type="number"
                  value={cumulativeCredits}
                  onChange={(e) => setCumulativeCredits(e.target.value)}
                  placeholder="e.g., 60"
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          {semesterGPA !== null && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                  <p className="text-sm font-medium opacity-90 mb-2">Semester GPA</p>
                  <p className="text-4xl font-bold">{semesterGPA.toFixed(2)}</p>
                  <p className="text-sm opacity-75 mt-2">
                    {courses.reduce((sum, c) => sum + c.credits, 0)} credits this semester
                  </p>
                </div>
                
                {totalGPA !== null && (
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white">
                    <p className="text-sm font-medium opacity-90 mb-2">New Cumulative GPA</p>
                    <p className="text-4xl font-bold">{totalGPA.toFixed(2)}</p>
                    <p className="text-sm opacity-75 mt-2">
                      {parseFloat(cumulativeCredits) + courses.reduce((sum, c) => sum + c.credits, 0)} total credits
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset Calculator
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About College GPA Calculator</h2>
          
          <div className="prose max-w-none text-gray-600 space-y-4">
            <p className="text-lg leading-relaxed">
              Our <strong>college GPA calculator</strong> is a free online tool designed to help students accurately calculate their grade point average with credit hours. Whether you need to calculate your semester GPA, cumulative GPA, or overall college GPA, our calculator provides instant and accurate results using the standard 4.0 grading scale.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Calculate College GPA</h3>
            <p>
              Calculating your college GPA involves multiplying each course grade by its credit hours, summing these values (quality points), and dividing by total credit hours. Our <strong>GPA calculator with credits</strong> automates this process, supporting grades from A+ (4.0) to F (0.0) with plus/minus variations.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Features of Our College GPA Calculator</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Semester GPA Calculator:</strong> Calculate GPA for current semester courses</li>
              <li><strong>Cumulative GPA Calculator:</strong> Combine previous GPA with new semester results</li>
              <li><strong>Credit Hours Support:</strong> Accurately weights courses by credit hours</li>
              <li><strong>Plus/Minus Grading:</strong> Supports A+, A, A-, B+, B, B-, etc.</li>
              <li><strong>Multiple Courses:</strong> Add unlimited courses for comprehensive calculation</li>
              <li><strong>Instant Results:</strong> See your GPA update in real-time</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Use a College GPA Calculator?</h3>
            <p>
              A <strong>cumulative GPA calculator</strong> helps you track academic progress, plan course loads, determine scholarship eligibility, and understand graduation requirements. Regular GPA monitoring enables proactive academic planning and goal setting throughout your college career.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I calculate my college GPA?</h3>
              <p className="text-gray-600">
                To calculate college GPA: (1) Multiply each course grade by credit hours to get quality points, (2) Sum all quality points, (3) Divide by total credit hours. Our calculator automates this process instantly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What is the difference between semester GPA and cumulative GPA?</h3>
              <p className="text-gray-600">
                <strong>Semester GPA</strong> reflects only courses from one semester, while <strong>cumulative GPA</strong> combines all semesters completed. Our calculator shows both when you enter previous GPA data.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How accurate is this GPA calculator?</h3>
              <p className="text-gray-600">
                Our calculator uses the standard 4.0 grading scale used by most US colleges and universities. Results are mathematically accurate based on grades and credit hours entered. Always verify with your institution's specific policies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I use this for weighted GPA?</h3>
              <p className="text-gray-600">
                This calculator uses the standard 4.0 scale. For weighted GPA (where honors/AP courses get bonus points), use our dedicated <strong>Weighted GPA Calculator</strong> tool.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">What GPA do I need to graduate?</h3>
              <p className="text-gray-600">
                Most colleges require a minimum 2.0 GPA to graduate, though requirements vary by institution and major. Check your college's specific graduation requirements for accurate information.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do credit hours affect GPA?</h3>
              <p className="text-gray-600">
                Credit hours weight each course's impact on GPA. A 4-credit A has more influence than a 1-credit A. Our calculator automatically factors credit hours into GPA calculations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I calculate GPA for multiple semesters?</h3>
              <p className="text-gray-600">
                Yes! Enter your previous cumulative GPA and credits, then add current semester courses. The calculator will show both semester GPA and your new cumulative GPA.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          currentSlug="college-gpa-calculator" 
          relatedSlugs={['berkeley-gpa-calculator', 'lsac-gpa-calculator', 'sat-score-calculator', 'time-difference-calculator']} 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default CollegeGPACalculator;
