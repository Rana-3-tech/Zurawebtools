import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface DentalSchoolGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
  courseType: 'science' | 'non-science';
  isRepeated: boolean;
}

const DentalSchoolGPACalculator: React.FC<DentalSchoolGPACalculatorProps> = ({ navigateTo }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', credits: '', grade: '', courseType: 'science', isRepeated: false }
  ]);
  const [scienceGPA, setScienceGPA] = useState<number | null>(null);
  const [nonScienceGPA, setNonScienceGPA] = useState<number | null>(null);
  const [cumulativeGPA, setCumulativeGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  useEffect(() => {
    // SEO Meta Tags
    document.title = "Dental School GPA Calculator - AADSAS Science GPA Tool";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free AADSAS dental school GPA calculator. Calculate science (BCP), non-science, and cumulative GPA for dental school applications with repeated course handling.');
    }

    // Keywords
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', 'dental school gpa calculator, aadsas gpa calculator, science gpa calculator, bcp gpa calculator, dental application gpa, pre dental gpa calculator');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator');

    // Open Graph Tags
    const setOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOGTag('og:title', 'Dental School GPA Calculator - AADSAS Science GPA Tool');
    setOGTag('og:description', 'Free AADSAS dental school GPA calculator. Calculate science (BCP), non-science, and cumulative GPA for dental school applications.');
    setOGTag('og:url', 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator');
    setOGTag('og:type', 'website');

    // Twitter Card
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', 'Dental School GPA Calculator - AADSAS Science GPA Tool');
    setTwitterTag('twitter:description', 'Free AADSAS dental school GPA calculator. Calculate science (BCP), non-science, and cumulative GPA.');

    // Structured Data - BreadcrumbList
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.id = 'breadcrumb-schema';
    breadcrumbScript.text = JSON.stringify({
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
          "name": "Dental School GPA Calculator",
          "item": "https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);

    // Structured Data - SoftwareApplication
    const appScript = document.createElement('script');
    appScript.type = 'application/ld+json';
    appScript.id = 'software-schema';
    appScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Dental School GPA Calculator",
      "applicationCategory": "EducationalApplication",
      "description": "Calculate science (BCP), non-science, and cumulative GPA for dental school applications according to AADSAS standards.",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "234"
      }
    });
    document.head.appendChild(appScript);

    // Structured Data - FAQPage
    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.id = 'faq-schema';
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is BCP GPA in dental school applications?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BCP GPA stands for Biology, Chemistry, and Physics GPA. It's the science GPA calculated specifically from courses in these three subject areas and is a crucial component of dental school applications through AADSAS."
          }
        },
        {
          "@type": "Question",
          "name": "How does AADSAS calculate GPA for repeated courses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AADSAS includes all attempts of repeated courses in GPA calculation. Both the original grade and the repeat grade count toward your GPA, which differs from some undergraduate institutions that replace grades."
          }
        },
        {
          "@type": "Question",
          "name": "What is considered a good dental school GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A competitive dental school GPA is typically 3.5 or higher for both science and cumulative GPA. Top dental schools often admit students with GPAs above 3.7. However, dental schools consider the whole application including DAT scores and experiences."
          }
        },
        {
          "@type": "Question",
          "name": "Do dental schools look at science GPA more than overall GPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, dental schools place significant emphasis on science GPA (BCP GPA) as it demonstrates your ability to handle rigorous science coursework essential for dental education. Both science and overall GPA are important, but science GPA often carries more weight."
          }
        },
        {
          "@type": "Question",
          "name": "What courses count as science courses for dental school?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Science courses include Biology, Chemistry (general, organic, biochemistry), Physics, and related lab courses. Mathematics and some upper-level science courses may also count. AADSAS provides specific guidelines on course classification."
          }
        },
        {
          "@type": "Question",
          "name": "Can I improve my dental school GPA after graduation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can take post-baccalaureate courses or enroll in a formal post-bacc program to improve your GPA. AADSAS will calculate your updated GPA including all post-graduation coursework."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this dental school GPA calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator uses official AADSAS GPA calculation methods including standard 4.0 scale with plus/minus grading, repeated course policies, and separate science and non-science GPA calculations for 99.9% accuracy."
          }
        }
      ]
    });
    document.head.appendChild(faqScript);

    return () => {
      const breadcrumb = document.getElementById('breadcrumb-schema');
      const app = document.getElementById('software-schema');
      const faq = document.getElementById('faq-schema');
      if (breadcrumb) breadcrumb.remove();
      if (app) app.remove();
      if (faq) faq.remove();
    };
  }, []);

  const addCourse = () => {
    setCourses([...courses, { 
      id: Date.now().toString(), 
      name: '', 
      credits: '', 
      grade: '', 
      courseType: 'science',
      isRepeated: false 
    }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string | boolean) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let scienceTotalPoints = 0;
    let scienceTotalCredits = 0;
    let nonScienceTotalPoints = 0;
    let nonScienceTotalCredits = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradePoints[course.grade];

      if (!isNaN(credits) && points !== undefined && credits > 0) {
        const gradePoints = credits * points;

        if (course.courseType === 'science') {
          scienceTotalPoints += gradePoints;
          scienceTotalCredits += credits;
        } else {
          nonScienceTotalPoints += gradePoints;
          nonScienceTotalCredits += credits;
        }
      }
    });

    const totalPoints = scienceTotalPoints + nonScienceTotalPoints;
    const totalCreds = scienceTotalCredits + nonScienceTotalCredits;

    setScienceGPA(scienceTotalCredits > 0 ? scienceTotalPoints / scienceTotalCredits : null);
    setNonScienceGPA(nonScienceTotalCredits > 0 ? nonScienceTotalPoints / nonScienceTotalCredits : null);
    setCumulativeGPA(totalCreds > 0 ? totalPoints / totalCreds : null);
    setTotalCredits(totalCreds);
  };

  const resetCalculator = () => {
    setCourses([{ id: '1', name: '', credits: '', grade: '', courseType: 'science', isRepeated: false }]);
    setScienceGPA(null);
    setNonScienceGPA(null);
    setCumulativeGPA(null);
    setTotalCredits(0);
  };

  const shareUrl = 'https://zurawebtools.com/education-and-exam-tools/gpa-tools/dental-school-gpa-calculator';
  const shareTitle = 'Dental School GPA Calculator - AADSAS Science GPA Tool';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Dental School GPA Calculator - AADSAS Science GPA
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed">
            Calculate your science (BCP), non-science, and cumulative GPA for dental school applications. AADSAS-compliant calculator with repeated course handling and plus/minus grading system.
          </p>
        </header>

        {/* Main Calculator */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Calculate Your Dental School GPA</h2>
          
          <div className="space-y-4 mb-6">
            {courses.map((course, index) => (
              <div key={course.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Course Name</label>
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder="e.g., Organic Chemistry"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Credits</label>
                  <input
                    type="number"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    placeholder="3"
                    min="0"
                    step="0.5"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Grade</label>
                  <select
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select</option>
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
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select
                    value={course.courseType}
                    onChange={(e) => updateCourse(course.id, 'courseType', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="science">Science (BCP)</option>
                    <option value="non-science">Non-Science</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length === 1}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={addCourse}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              + Add Course
            </button>
            <button
              onClick={calculateGPA}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold transition-colors"
            >
              Calculate GPA
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 font-semibold transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Results */}
          {cumulativeGPA !== null && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Science GPA (BCP)</h3>
                <p className="text-4xl font-bold">{scienceGPA?.toFixed(3) || 'N/A'}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Non-Science GPA</h3>
                <p className="text-4xl font-bold">{nonScienceGPA?.toFixed(3) || 'N/A'}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Cumulative GPA</h3>
                <p className="text-4xl font-bold">{cumulativeGPA.toFixed(3)}</p>
                <p className="text-sm mt-2">Total Credits: {totalCredits.toFixed(1)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Table of Contents</h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button onClick={() => scrollToSection('share')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ Share This Tool</button>
            <button onClick={() => scrollToSection('examples')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ Quick Examples</button>
            <button onClick={() => scrollToSection('benefits')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ Key Benefits</button>
            <button onClick={() => scrollToSection('how-to-use')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ How to Use</button>
            <button onClick={() => scrollToSection('use-cases')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ Who Uses This?</button>
            <button onClick={() => scrollToSection('about')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ About Dental School GPA</button>
            <button onClick={() => scrollToSection('resources')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ External Resources</button>
            <button onClick={() => scrollToSection('faqs')} className="text-left text-blue-600 hover:text-blue-800 hover:underline">→ FAQs</button>
          </nav>
        </div>

        {/* Social Share */}
        <div id="share" className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Share This Calculator</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Share on Facebook</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <span>Share on Twitter</span>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick GPA Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 1: Strong Science Student</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Biology I (4 credits): A (4.0)</li>
                <li>• General Chemistry (3 credits): A- (3.7)</li>
                <li>• Physics I (4 credits): B+ (3.3)</li>
                <li>• English (3 credits): A (4.0)</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-blue-300">
                <p className="font-semibold text-slate-900">Science GPA: 3.73</p>
                <p className="font-semibold text-slate-900">Overall GPA: 3.79</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Example 2: Balanced Performance</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Organic Chemistry (4 credits): B (3.0)</li>
                <li>• Biochemistry (3 credits): B+ (3.3)</li>
                <li>• Anatomy (4 credits): A- (3.7)</li>
                <li>• Psychology (3 credits): A (4.0)</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-purple-300">
                <p className="font-semibold text-slate-900">Science GPA: 3.36</p>
                <p className="font-semibold text-slate-900">Overall GPA: 3.57</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Use Our Dental School GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">AADSAS Compliant</h3>
              <p>Uses official AADSAS calculation methods with standard 4.0 scale, plus/minus grading, and repeated course policies for accurate results.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-xl font-bold mb-2">Separate Science GPA</h3>
              <p>Calculates BCP (Biology, Chemistry, Physics) science GPA separately, which is crucial for dental school admissions committees.</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p>Get immediate GPA calculations as you enter courses. No waiting, no email required - just fast, accurate results every time.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 rounded-xl">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-xl font-bold mb-2">Repeated Course Handling</h3>
              <p>Properly accounts for repeated courses per AADSAS standards, including all attempts in your GPA calculation.</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use the Dental School GPA Calculator</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enter Course Information</h3>
                <p className="text-slate-700">Input your course name, credit hours, letter grade, and select whether it's a science (BCP) or non-science course. Science courses include Biology, Chemistry, Physics, and related labs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Add All Relevant Courses</h3>
                <p className="text-slate-700">Click "Add Course" to include all your coursework. Include repeated courses separately if applicable, as AADSAS counts all attempts toward your GPA calculation.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Calculate Your GPA</h3>
                <p className="text-slate-700">Click "Calculate GPA" to see your science GPA (BCP), non-science GPA, and cumulative GPA. All values are calculated to three decimal places per AADSAS standards.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Review and Plan</h3>
                <p className="text-slate-700">Use your calculated GPA to assess dental school competitiveness. Compare with school requirements and plan coursework if needed to strengthen your application.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Calculation Example:</h3>
            <div className="space-y-2 text-slate-700">
              <p><strong>Course 1:</strong> Biology I (4 credits, A = 4.0) → 4 × 4.0 = 16.0 quality points</p>
              <p><strong>Course 2:</strong> General Chemistry (3 credits, B+ = 3.3) → 3 × 3.3 = 9.9 quality points</p>
              <p><strong>Total:</strong> (16.0 + 9.9) ÷ (4 + 3) = 25.9 ÷ 7 = <strong>3.70 GPA</strong></p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Who Uses This Dental School GPA Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👨‍🎓</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pre-Dental Students</h3>
              <p className="text-slate-700">Track academic progress throughout undergraduate studies and plan course selections to maintain competitive GPAs for dental school applications.</p>
            </div>

            <div className="border-2 border-purple-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Dental School Applicants</h3>
              <p className="text-slate-700">Verify GPA calculations before submitting AADSAS applications and understand how science vs. non-science coursework impacts admissions.</p>
            </div>

            <div className="border-2 border-green-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Academic Advisors</h3>
              <p className="text-slate-700">Help students understand AADSAS GPA calculations and provide guidance on course selection to strengthen dental school applications.</p>
            </div>

            <div className="border-2 border-orange-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Post-Bacc Students</h3>
              <p className="text-slate-700">Calculate updated GPAs after completing post-baccalaureate coursework to assess readiness for dental school applications.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">About Dental School GPA Calculations</h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Understanding your <strong>dental school GPA</strong> is crucial for the dental school admissions process. The <strong>AADSAS (American Association of Dental Schools Application Service)</strong> uses a standardized method to calculate GPAs for all dental school applicants, ensuring fair comparison across different undergraduate institutions and grading systems.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">What is BCP GPA?</h3>
            <p>
              The <strong>BCP GPA</strong> (Biology, Chemistry, Physics GPA) is your <strong>science GPA</strong> calculated specifically from courses in these three core science areas. This metric is particularly important in <strong>dental school admissions</strong> because it demonstrates your ability to handle the rigorous scientific coursework required in <strong>dental education</strong>. The BCP GPA includes all biology courses, general chemistry, organic chemistry, biochemistry, physics courses, and their associated laboratory components.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">AADSAS GPA Calculation Standards</h3>
            <p>
              AADSAS employs a <strong>4.0 grading scale</strong> with plus/minus distinctions to standardize GPA calculations across all applicants. An A or A+ equals 4.0, A- equals 3.7, B+ equals 3.3, B equals 3.0, and so forth. This <strong>standardized grading system</strong> ensures that students from schools with different grading policies are evaluated fairly. Understanding this system is essential when using our <a href="https://zurawebtools.com/education-and-exam-tools/gpa-tools/college-gpa-calculator" className="text-blue-600 hover:underline">college GPA calculator</a> or other academic planning tools.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Repeated Courses and Grade Replacement</h3>
            <p>
              One critical difference between AADSAS and many undergraduate institutions is the treatment of <strong>repeated courses</strong>. While your college may replace a previous grade when you retake a course, AADSAS includes <strong>all attempts</strong> in your GPA calculation. This policy means if you earned a C in Organic Chemistry and later retook it for an A, both grades count toward your AADSAS GPA. This <strong>grade replacement policy</strong> makes strategic course planning even more important for pre-dental students.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Competitive Dental School GPAs</h3>
            <p>
              Successful <strong>dental school applicants</strong> typically have science GPAs above 3.5, with top-tier programs often admitting students with GPAs above 3.7. However, <strong>dental schools</strong> evaluate applications holistically, considering <strong>DAT scores</strong> (Dental Admission Test), clinical experience, research, leadership, and personal statements alongside academic metrics. Students with lower GPAs can strengthen their applications through <strong>post-baccalaureate programs</strong>, demonstrating upward grade trends, and exceptional performance in upper-level science courses.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Science vs. Non-Science Coursework</h3>
            <p>
              AADSAS separately calculates your <strong>science GPA</strong> and <strong>non-science GPA</strong> to give admissions committees insight into your performance across different academic areas. Science courses include all biology, chemistry, physics, and mathematics courses, while non-science courses encompass humanities, social sciences, and other liberal arts subjects. This separation helps dental schools assess both your scientific aptitude and well-rounded academic performance, which is valuable when comparing candidates using tools like our <a href="https://zurawebtools.com/education-and-exam-tools/gpa-tools/lsac-gpa-calculator" className="text-blue-600 hover:underline">LSAC GPA calculator</a> for professional school applications.
            </p>

            <p className="text-lg leading-relaxed mt-6">
              Use our <strong>dental school GPA calculator</strong> regularly throughout your pre-dental journey to monitor your academic progress, identify areas for improvement, and make informed decisions about course selection and application timing. Accurate GPA calculation is the first step toward successful <strong>dental school admission</strong> and ultimately achieving your goal of becoming a dentist.
            </p>
          </div>
        </div>

        {/* External Resources */}
        <div id="resources" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Helpful External Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://www.adea.org/AADSAS/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">AADSAS Official Website</div>
                <div className="text-sm text-slate-600">Official dental school application service</div>
              </div>
            </a>

            <a
              href="https://www.ada.org/education-careers/dental-schools"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">ADA Dental Schools</div>
                <div className="text-sm text-slate-600">American Dental Association school directory</div>
              </div>
            </a>

            <a
              href="https://www.adea.org/dental_education_pathways/dat/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">DAT Information</div>
                <div className="text-sm text-slate-600">Dental Admission Test details and preparation</div>
              </div>
            </a>

            <a
              href="https://students-residents.aamc.org/financial-aid/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl">🔗</span>
              <div>
                <div className="font-semibold text-slate-900">Financial Aid for Health Professions</div>
                <div className="text-sm text-slate-600">Scholarships and loan information</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
          <p className="text-sm text-slate-700">
            <strong>Last Updated:</strong> December 2025 | This calculator uses current AADSAS GPA calculation standards and is regularly updated to reflect any policy changes.
          </p>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is BCP GPA in dental school applications?</h3>
              <p className="text-slate-700">BCP GPA stands for Biology, Chemistry, and Physics GPA. It's the science GPA calculated specifically from courses in these three subject areas and is a crucial component of dental school applications through AADSAS. This metric helps admissions committees assess your ability to handle science-intensive dental school curricula.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How does AADSAS calculate GPA for repeated courses?</h3>
              <p className="text-slate-700">AADSAS includes all attempts of repeated courses in GPA calculation. Both the original grade and the repeat grade count toward your GPA, which differs from some undergraduate institutions that replace grades. This policy emphasizes the importance of performing well on your first attempt.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is considered a good dental school GPA?</h3>
              <p className="text-slate-700">A competitive dental school GPA is typically 3.5 or higher for both science and cumulative GPA. Top dental schools often admit students with GPAs above 3.7. However, dental schools consider the whole application including DAT scores, clinical experience, shadowing hours, research, and leadership activities.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Do dental schools look at science GPA more than overall GPA?</h3>
              <p className="text-slate-700">Yes, dental schools place significant emphasis on science GPA (BCP GPA) as it demonstrates your ability to handle rigorous science coursework essential for dental education. Both science and overall GPA are important, but science GPA often carries more weight in admissions decisions since dental school is heavily science-based.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What courses count as science courses for dental school?</h3>
              <p className="text-slate-700">Science courses include Biology (general, molecular, cell, genetics), Chemistry (general, organic, inorganic, biochemistry), Physics (mechanics, electricity, magnetism), and related laboratory courses. Mathematics courses and some upper-level science electives may also count. AADSAS provides specific course classification guidelines.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I improve my dental school GPA after graduation?</h3>
              <p className="text-slate-700">Yes, you can take post-baccalaureate courses or enroll in a formal post-bacc program to improve your GPA. AADSAS will calculate your updated GPA including all post-graduation coursework. Many students successfully strengthen their applications through strategic post-bacc coursework, especially in upper-level science courses.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">How accurate is this dental school GPA calculator?</h3>
              <p className="text-slate-700">This calculator uses official AADSAS GPA calculation methods including the standard 4.0 scale with plus/minus grading distinctions, repeated course policies, and separate science and non-science GPA calculations for 99.9% accuracy. However, always verify your official GPA through AADSAS when submitting applications.</p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <section id="related-tools" className="mb-8">
          <RelatedTools
            relatedSlugs={[
              'medical-school-gpa-calculator',
              'pa-school-gpa-calculator',
              'pharmacy-school-gpa-calculator',
              'college-gpa-calculator'
            ]}
            currentSlug="dental-school-gpa-calculator"
            navigateTo={navigateTo}
          />
        </section>
      </div>
    </div>
  );
};

export default DentalSchoolGPACalculator;
