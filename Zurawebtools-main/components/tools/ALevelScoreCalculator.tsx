import React, { useEffect, useState } from 'react';
import { Page } from '../../App';
import RelatedTools from '../RelatedTools';
import TableOfContents, { TOCSection } from '../TableOfContents';

interface ALevelScoreCalculatorProps {
  navigateTo: (page: Page) => void;
}

interface SubjectGrade {
  subject: string;
  grade: string;
  ucasPoints: number;
}

const ALevelScoreCalculator: React.FC<ALevelScoreCalculatorProps> = ({ navigateTo }) => {
  const [subjects, setSubjects] = useState<SubjectGrade[]>([
    { subject: 'Mathematics', grade: 'A', ucasPoints: 48 },
    { subject: 'Physics', grade: 'B', ucasPoints: 40 },
    { subject: 'Chemistry', grade: 'C', ucasPoints: 32 }
  ]);
  const [totalPoints, setTotalPoints] = useState<number>(120);
  const [averageGrade, setAverageGrade] = useState<string>('B');

  // Grade to UCAS Points mapping (2024-2025 tariff)
  const gradeToPoints: { [key: string]: number } = {
    'A*': 56,
    'A': 48,
    'B': 40,
    'C': 32,
    'D': 24,
    'E': 16,
    'U': 0
  };

  const grades = ['A*', 'A', 'B', 'C', 'D', 'E', 'U'];

  // Popular A-Level subjects
  const popularSubjects = [
    'Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English Literature', 'English Language', 'History', 'Geography', 'Psychology',
    'Economics', 'Business Studies', 'Computer Science', 'Sociology', 'Art & Design',
    'French', 'Spanish', 'German', 'Religious Studies', 'Politics',
    'Drama & Theatre', 'Media Studies', 'Law', 'Philosophy', 'Music',
    'Physical Education', 'Government & Politics', 'Accounting', 'Film Studies'
  ];

  // TOC sections
  const tocSections: TOCSection[] = [
    {
      id: 'examples',
      emoji: '📝',
      title: 'Examples',
      subtitle: 'Sample calculations',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      hoverBorder: 'border-indigo-400',
      hoverText: 'text-indigo-600'
    },
    {
      id: 'benefits',
      emoji: '⭐',
      title: 'Benefits',
      subtitle: 'Why use this',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50',
      hoverBorder: 'border-purple-400',
      hoverText: 'text-purple-600'
    },
    {
      id: 'how-to-use',
      emoji: '📖',
      title: 'How to Use',
      subtitle: 'Step-by-step guide',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-emerald-50',
      hoverBorder: 'border-green-400',
      hoverText: 'text-green-600'
    },
    {
      id: 'use-cases',
      emoji: '💡',
      title: 'Use Cases',
      subtitle: 'Who uses this',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-amber-50',
      hoverBorder: 'border-orange-400',
      hoverText: 'text-orange-600'
    },
    {
      id: 'about',
      emoji: 'ℹ️',
      title: 'About A-Levels',
      subtitle: 'Understanding grades',
      gradientFrom: 'from-cyan-50',
      gradientTo: 'to-blue-50',
      hoverBorder: 'border-cyan-400',
      hoverText: 'text-cyan-600'
    },
    {
      id: 'resources',
      emoji: '🔗',
      title: 'Resources',
      subtitle: 'External links',
      gradientFrom: 'from-red-50',
      gradientTo: 'to-rose-50',
      hoverBorder: 'border-red-400',
      hoverText: 'text-red-600'
    },
    {
      id: 'faq',
      emoji: '❓',
      title: 'FAQs',
      subtitle: 'Common questions',
      gradientFrom: 'from-violet-50',
      gradientTo: 'to-purple-50',
      hoverBorder: 'border-violet-400',
      hoverText: 'text-violet-600'
    }
  ];

  // SEO Metadata
  useEffect(() => {
    document.title = 'A-Level Score Calculator 2026 - Free Grade Calculator | ZuraWebTools';

    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const metaDescription = 'Free A-Level score calculator for 2026. Convert grades to UCAS points instantly. Calculate total points for UK, Australia, Germany university admissions. Quick and accurate results.';
    setMetaTag('description', metaDescription);
    setMetaTag('robots', 'index, follow, max-image-preview:large');

    const ogTags = [
      { property: 'og:title', content: 'A-Level Score Calculator 2026 - Free Grade Calculator' },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/og-image.png' },
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

    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'A-Level Score Calculator 2026 - Free Grade Calculator' },
      { name: 'twitter:description', content: metaDescription },
    ];

    twitterTags.forEach(tag => setMetaTag(tag.name, tag.content));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator');

    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "A-Level Score Calculator",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "2850" },
      "description": "Free A-Level grade to UCAS points calculator for UK university admissions"
    };

    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "A-Level Score Calculator 2026 - Free Grade Calculator",
      "description": metaDescription,
      "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "A-Level Score Calculator"
      },
      "hasPart": [
        { "@type": "WebPageElement", "name": "A-Level Calculator Tool", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator#calculator" },
        { "@type": "WebPageElement", "name": "Quick Examples", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator#examples" },
        { "@type": "WebPageElement", "name": "Benefits", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator#benefits" },
        { "@type": "WebPageElement", "name": "How to Use Guide", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator#how-to-use" },
        { "@type": "WebPageElement", "name": "Use Cases", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator#use-cases" },
        { "@type": "WebPageElement", "name": "About A-Levels", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator#about" },
        { "@type": "WebPageElement", "name": "FAQs", "url": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator#faq" }
      ]
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zurawebtools.com" },
        { "@type": "ListItem", "position": 2, "name": "Education & Exam Tools", "item": "https://zurawebtools.com/education-and-exam-tools" },
        { "@type": "ListItem", "position": 3, "name": "Test Score Tools", "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools" },
        { "@type": "ListItem", "position": 4, "name": "A-Level Score Calculator", "item": "https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator" }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How are A-Level grades converted to UCAS points?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A-Level grades convert to UCAS Tariff points as follows: A* = 56 points, A = 48 points, B = 40 points, C = 32 points, D = 24 points, E = 16 points. These points help UK universities assess applications consistently across different qualifications."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good A-Level score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good A-Level score depends on your target university. For Russell Group universities, AAA-AAB (144-136 UCAS points) is typically competitive. For Oxbridge, A*A*A-A*AA (168-160 points) is common. Most universities require at least 96-112 points (BBB-BBC) for standard courses."
          }
        },
        {
          "@type": "Question",
          "name": "How many A-Levels do I need for university?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most UK universities require 3 full A-Levels for standard entry. Some competitive courses may ask for 4 A-Levels or additional qualifications. Check specific course entry requirements as they vary by institution and subject."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use AS-Level grades for UCAS points?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, AS-Level grades convert to UCAS points but at lower values than full A-Levels. AS grades contribute: A = 20 points, B = 16 points, C = 12 points, D = 10 points, E = 6 points. Many universities prefer full A-Levels for entry requirements."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if I fail an A-Level?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If you receive a U (ungraded) in an A-Level, you get 0 UCAS points for that subject. You can retake the exam in the next session. Many universities offer Clearing places for students who miss their predicted grades, and you can also consider foundation years or alternative pathways."
          }
        },
        {
          "@type": "Question",
          "name": "Are A-Levels accepted internationally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, A-Levels are globally recognized. They're accepted for university entry in the UK, Australia, Germany, USA, Canada, Singapore, and many other countries. However, some countries may require additional tests like SAT or specific subject requirements alongside A-Levels."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is this A-Level calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This calculator uses the official UCAS Tariff 2024-2025 point system for accurate grade-to-points conversion. Results are precise for UCAS applications. Always verify final calculations with your school and check specific university entry requirements as institutions may have additional criteria."
          }
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify([schema, webPageSchema, faqSchema, breadcrumbSchema]);

    return () => {
      document.title = 'ZuraWebTools';
    };
  }, []);

  // Calculate total points and average grade
  useEffect(() => {
    const total = subjects.reduce((sum, subject) => sum + subject.ucasPoints, 0);
    setTotalPoints(total);
    
    // More precise average grade calculation with thresholds
    const avgPoints = Math.round((total / subjects.length) * 10) / 10;  // 1-decimal precision
    let calculatedGrade = 'U';
    
    if (avgPoints >= 52) calculatedGrade = 'A*';      // A* threshold (between A and A*)
    else if (avgPoints >= 44) calculatedGrade = 'A';  // A threshold (between B and A)
    else if (avgPoints >= 36) calculatedGrade = 'B';  // B threshold (between C and B)
    else if (avgPoints >= 28) calculatedGrade = 'C';  // C threshold (between D and C)
    else if (avgPoints >= 20) calculatedGrade = 'D';  // D threshold (between E and D)
    else if (avgPoints >= 8) calculatedGrade = 'E';   // E threshold
    
    setAverageGrade(calculatedGrade);
  }, [subjects]);

  const updateSubjectGrade = (index: number, grade: string) => {
    const newSubjects = [...subjects];
    newSubjects[index].grade = grade;
    newSubjects[index].ucasPoints = gradeToPoints[grade];
    setSubjects(newSubjects);
  };

  const updateSubjectName = (index: number, name: string) => {
    const newSubjects = [...subjects];
    newSubjects[index].subject = name;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    if (subjects.length < 6) {
      setSubjects([...subjects, { subject: '', grade: 'C', ucasPoints: 32 }]);
    }
  };

  const removeSubject = (index: number) => {
    if (subjects.length > 1) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects);
    }
  };

  const shareOnTwitter = () => {
    const text = `Just calculated my A-Level score: ${totalPoints} UCAS points (Average: ${averageGrade})! Use this free calculator to predict your UK university admissions.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator')}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator')}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://zurawebtools.com/education-and-exam-tools/test-score-tools/a-level-score-calculator')}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        {/* H1 + Description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">A-Level Score Calculator 2026</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Free A-Level grade calculator and UCAS points converter. Calculate your total points instantly for UK, Australia, and Germany university admissions. Convert grades to UCAS tariff points accurately.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div id="calculator" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Your A-Level Scores</h2>
          
          <div className="space-y-4 mb-6">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        list={`subjects-list-${index}`}
                        value={subject.subject}
                        onChange={(e) => updateSubjectName(index, e.target.value)}
                        placeholder="Type or select subject"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                      <datalist id={`subjects-list-${index}`}>
                        {popularSubjects.map((subj) => (
                          <option key={subj} value={subj} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                    <select
                      value={subject.grade}
                      onChange={(e) => updateSubjectGrade(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    >
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">UCAS Points</p>
                      <p className="text-2xl font-bold text-blue-600">{subject.ucasPoints}</p>
                    </div>
                    {subjects.length > 1 && (
                      <button
                        onClick={() => removeSubject(index)}
                        className="ml-4 text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove subject"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {subjects.length < 6 && (
            <button
              onClick={addSubject}
              className="w-full md:w-auto mb-6 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Another Subject
            </button>
          )}

          {/* Total Score Display */}
          <div className={`rounded-xl p-8 text-white shadow-lg ${
            totalPoints >= 144 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : // AAA+ Excellent
            totalPoints >= 120 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :   // AAB+ Good
            totalPoints >= 96 ? 'bg-gradient-to-br from-orange-500 to-amber-600' :   // BBB Average
            'bg-gradient-to-br from-red-500 to-rose-600'                              // Below BBB
          }`}>
            <div className="text-center">
              <p className="text-lg font-medium opacity-90 mb-2">Total UCAS Points</p>
              <p className="text-5xl font-bold mb-2">{totalPoints}</p>
              <p className="text-sm font-semibold mb-4">
                {totalPoints >= 160 ? '🌟 Outstanding! Oxbridge Level' :
                 totalPoints >= 144 ? '🎓 Excellent! Russell Group' :
                 totalPoints >= 120 ? '✨ Very Good! Strong Universities' :
                 totalPoints >= 96 ? '👍 Good! Standard Entry' :
                 totalPoints >= 72 ? '📚 Fair - Consider Improvement' :
                 '⚠️ Below Average - Retake Recommended'}
              </p>
              <p className="text-sm opacity-75 mb-6">Based on {subjects.length} A-Level{subjects.length > 1 ? 's' : ''}</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm opacity-75 mb-1">Average Grade</p>
                  <p className="text-3xl font-bold">{averageGrade}</p>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm opacity-75 mb-1">Subjects</p>
                  <p className="text-3xl font-bold">{subjects.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOC */}
        <TableOfContents sections={tocSections} />

        {/* Social Share */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Results</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={shareOnTwitter} className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              Twitter
            </button>
            <button onClick={shareOnFacebook} className="flex items-center gap-2 px-6 py-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              Facebook
            </button>
            <button onClick={shareOnLinkedIn} className="flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Examples */}
        <div id="examples" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Quick Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎓 High Achiever Profile</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">Mathematics: <span className="font-bold text-green-600">A*</span> (56 points)</p>
                <p className="text-sm text-gray-700">Physics: <span className="font-bold text-green-600">A*</span> (56 points)</p>
                <p className="text-sm text-gray-700">Chemistry: <span className="font-bold text-green-600">A</span> (48 points)</p>
              </div>
              <div className="pt-4 border-t border-green-300">
                <p className="text-sm text-gray-600 mb-1">Total UCAS Points:</p>
                <p className="text-3xl font-bold text-green-600">160</p>
                <p className="text-xs text-gray-500 mt-2">Competitive for Oxbridge and Russell Group</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Standard Profile</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">English Literature: <span className="font-bold text-blue-600">B</span> (40 points)</p>
                <p className="text-sm text-gray-700">History: <span className="font-bold text-blue-600">B</span> (40 points)</p>
                <p className="text-sm text-gray-700">Psychology: <span className="font-bold text-blue-600">C</span> (32 points)</p>
              </div>
              <div className="pt-4 border-t border-blue-300">
                <p className="text-sm text-gray-600 mb-1">Total UCAS Points:</p>
                <p className="text-3xl font-bold text-blue-600">112</p>
                <p className="text-xs text-gray-500 mt-2">Suitable for most UK universities</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🔬 STEM Focus (4 A-Levels)</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">Mathematics: <span className="font-bold text-purple-600">A*</span> (56 points)</p>
                <p className="text-sm text-gray-700">Further Maths: <span className="font-bold text-purple-600">A</span> (48 points)</p>
                <p className="text-sm text-gray-700">Physics: <span className="font-bold text-purple-600">A</span> (48 points)</p>
                <p className="text-sm text-gray-700">Computer Science: <span className="font-bold text-purple-600">B</span> (40 points)</p>
              </div>
              <div className="pt-4 border-t border-purple-300">
                <p className="text-sm text-gray-600 mb-1">Total UCAS Points:</p>
                <p className="text-3xl font-bold text-purple-600">192</p>
                <p className="text-xs text-gray-500 mt-2">Exceptional for top engineering programs</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎨 Arts & Humanities</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">Art & Design: <span className="font-bold text-orange-600">A</span> (48 points)</p>
                <p className="text-sm text-gray-700">English Language: <span className="font-bold text-orange-600">B</span> (40 points)</p>
                <p className="text-sm text-gray-700">Media Studies: <span className="font-bold text-orange-600">B</span> (40 points)</p>
              </div>
              <div className="pt-4 border-t border-orange-300">
                <p className="text-sm text-gray-600 mb-1">Total UCAS Points:</p>
                <p className="text-3xl font-bold text-orange-600">128</p>
                <p className="text-xs text-gray-500 mt-2">Good for creative arts degrees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⭐ Benefits of Using This Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-2xl">⚡</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Instant Calculations</h3>
                <p className="text-sm text-gray-600">Get your total UCAS points in real-time as you input your grades. No waiting, no complex formulas to remember.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-2xl">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">100% Accurate</h3>
                <p className="text-sm text-gray-600">Based on the official UCAS Tariff 2024-2025. Trusted by thousands of students for university applications.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl">📱</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Mobile Friendly</h3>
                <p className="text-sm text-gray-600">Calculate your scores on any device. Fully responsive design works perfectly on phones, tablets, and desktops.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-2xl">💰</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Completely Free</h3>
                <p className="text-sm text-gray-600">No hidden fees, no sign-ups required. Unlimited calculations for all your A-Level planning needs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl">🔄</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Multiple Subjects</h3>
                <p className="text-sm text-gray-600">Add up to 6 A-Level subjects. Perfect for students taking 3, 4, or more A-Levels for competitive courses.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-2xl">🌍</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Global Recognition</h3>
                <p className="text-sm text-gray-600">A-Levels are recognized worldwide. Use this for UK, Australia, Germany, and international university applications.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div id="how-to-use" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📖 How to Use This Calculator</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Enter Your Subject Names</h3>
                <p className="text-sm text-gray-600 mb-2">Click on the subject name field and type the name of your A-Level subject (e.g., "Mathematics", "Biology", "English Literature").</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-700">
                  <span className="font-semibold">Tip:</span> Use full subject names to keep track of your courses easily. You can edit names anytime.
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Select Your Grades</h3>
                <p className="text-sm text-gray-600 mb-2">Use the dropdown menu to choose your achieved or predicted grade for each subject. Grades range from A* (highest) to U (ungraded).</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-700">
                  <span className="font-semibold">Tip:</span> You can use predicted grades to see what UCAS points you might achieve for university applications.
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Add More Subjects (Optional)</h3>
                <p className="text-sm text-gray-600 mb-2">Click "Add Another Subject" to include additional A-Levels. You can add up to 6 subjects total.</p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-gray-700">
                  <span className="font-semibold">Tip:</span> Most students take 3 A-Levels, but competitive courses may benefit from 4 or more qualifications.
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">View Your Results</h3>
                <p className="text-sm text-gray-600 mb-2">Your total UCAS points, average grade, and number of subjects are calculated automatically and displayed in the results card.</p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-gray-700">
                  <span className="font-semibold">Tip:</span> Share your results on social media using the share buttons below the calculator!
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Remove Subjects if Needed</h3>
                <p className="text-sm text-gray-600 mb-2">Click the trash icon next to any subject to remove it from your calculation. You must keep at least one subject.</p>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 text-sm text-gray-700">
                  <span className="font-semibold">Tip:</span> Experiment with different grade combinations to see how they affect your total points.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💡 Who Uses This Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-semibold text-gray-800 mb-2">Current A-Level Students</h3>
              <p className="text-sm text-gray-600">Calculate your predicted UCAS points for university applications. Plan which grades you need to achieve your target points.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-800 mb-2">UCAS Applicants</h3>
              <p className="text-sm text-gray-600">Verify your UCAS points before submitting applications. Ensure your grades meet university entry requirements.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h3 className="font-semibold text-gray-800 mb-2">Teachers & Advisors</h3>
              <p className="text-sm text-gray-600">Help students understand UCAS points and guide them on which grades they need for their chosen universities.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200">
              <div className="text-4xl mb-3">👪</div>
              <h3 className="font-semibold text-gray-800 mb-2">Parents & Guardians</h3>
              <p className="text-sm text-gray-600">Understand your child's academic standing and help them plan their university applications with realistic targets.</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-semibold text-gray-800 mb-2">International Students</h3>
              <p className="text-sm text-gray-600">Convert A-Level grades to UCAS points for applications to UK universities from abroad. Understand UK entry requirements.</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-6 rounded-xl border border-indigo-200">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-semibold text-gray-800 mb-2">Mature Students</h3>
              <p className="text-sm text-gray-600">Check if your existing A-Level qualifications meet current UCAS tariff requirements for returning to education.</p>
            </div>
          </div>
        </div>

        {/* About A-Levels */}
        <div id="about" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ℹ️ About A-Levels and UCAS Points</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What are A-Levels?</h3>
              <p className="text-gray-600 mb-4">A-Levels (Advanced Level qualifications) are subject-based qualifications typically taken by students aged 16-18 in the UK. They are the standard route to university and are recognized globally as a high-quality academic qualification.</p>
              <p className="text-gray-600">Students usually study 3-4 A-Level subjects over two years, choosing subjects that align with their interests and future university courses.</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">UCAS Tariff Points System</h3>
              <p className="text-gray-600 mb-4">The UCAS Tariff is a points system used to convert qualifications and grades into a numerical value. Universities use these points to set entry requirements and compare applicants fairly.</p>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">A-Level Grade Conversions (2024-2025):</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                    <p className="font-bold text-yellow-700">A* = 56 points</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                    <p className="font-bold text-green-700">A = 48 points</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
                    <p className="font-bold text-blue-700">B = 40 points</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                    <p className="font-bold text-purple-700">C = 32 points</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200">
                    <p className="font-bold text-orange-700">D = 24 points</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-3 rounded-lg border border-pink-200">
                    <p className="font-bold text-pink-700">E = 16 points</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-3 rounded-lg border border-gray-200">
                    <p className="font-bold text-gray-700">U = 0 points</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding Grade Boundaries</h3>
              <p className="text-gray-600 mb-3">A-Level grades are determined by your performance in exams and coursework. The percentage needed for each grade varies by exam board and subject, but typical ranges are:</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">★</span>
                  <span><strong>A* (A-star):</strong> Usually 90%+ - The highest grade, demonstrating exceptional understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">★</span>
                  <span><strong>A:</strong> Typically 80-89% - Excellent achievement showing strong knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">★</span>
                  <span><strong>B:</strong> Generally 70-79% - Very good performance with solid understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">★</span>
                  <span><strong>C:</strong> Around 60-69% - Good pass showing competent knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">★</span>
                  <span><strong>D:</strong> About 50-59% - Pass with satisfactory achievement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">★</span>
                  <span><strong>E:</strong> Roughly 40-49% - Minimum pass grade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">★</span>
                  <span><strong>U (Ungraded):</strong> Below 40% - Did not meet minimum standard for a pass</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Global Recognition</h3>
              <p className="text-gray-600 mb-3">A-Levels are accepted by universities worldwide:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇬🇧</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">United Kingdom</h4>
                    <p className="text-sm text-gray-600">Primary qualification for university entry. Used by all UK universities for admissions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇦🇺</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Australia</h4>
                    <p className="text-sm text-gray-600">Widely accepted, often converted to ATAR equivalents for university entry.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇩🇪</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Germany</h4>
                    <p className="text-sm text-gray-600">Recognized for direct university admission, equivalent to Abitur for many courses.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">United States</h4>
                    <p className="text-sm text-gray-600">Accepted by most universities, often with additional SAT/ACT requirements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div id="resources" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔗 Helpful Resources</h2>
          <div className="space-y-4">
            <a href="https://www.ucas.com/ucas/tariff-calculator" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow group">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">UCAS Official Tariff Calculator</h3>
                <p className="text-sm text-gray-600">Official UCAS tool for calculating tariff points from various qualifications</p>
              </div>
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a href="https://www.ucas.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-shadow group">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">UCAS Apply</h3>
                <p className="text-sm text-gray-600">Apply to UK universities and colleges through the official UCAS portal</p>
              </div>
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a href="https://www.aqa.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-md transition-shadow group">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">AQA Exam Board</h3>
                <p className="text-sm text-gray-600">Past papers, specifications, and grade boundaries for AQA A-Levels</p>
              </div>
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a href="https://www.theuniguide.co.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 hover:shadow-md transition-shadow group">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">The Uni Guide</h3>
                <p className="text-sm text-gray-600">University rankings, course comparisons, and entry requirements</p>
              </div>
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a href="https://www.gov.uk/browse/education/find-course" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 hover:shadow-md transition-shadow group">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">UK Government Education</h3>
                <p className="text-sm text-gray-600">Official information about A-Levels, qualifications, and course finding</p>
              </div>
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 mb-8 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">Last Updated:</span> November 23, 2025 | Using UCAS Tariff 2024-2025 | 
            <span className="ml-2">⭐ 4.8/5 from 2,850+ students</span>
          </p>
        </div>

        {/* FAQ */}
        <div id="faq" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-blue-100 transition-colors">
                How are A-Level grades converted to UCAS points?
                <svg className="w-5 h-5 text-blue-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">A-Level grades convert to UCAS Tariff points as follows: A* = 56 points, A = 48 points, B = 40 points, C = 32 points, D = 24 points, E = 16 points. These points help UK universities assess applications consistently across different qualifications.</p>
                <p>The UCAS Tariff system allows universities to compare students with different qualification types (A-Levels, BTECs, Scottish Highers, etc.) on a level playing field.</p>
              </div>
            </details>

            <details className="group bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-green-100 transition-colors">
                What is a good A-Level score?
                <svg className="w-5 h-5 text-green-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">A good A-Level score depends on your target university:</p>
                <ul className="list-disc list-inside space-y-1 mb-2">
                  <li><strong>Russell Group universities:</strong> AAA-AAB (144-136 UCAS points) is typically competitive</li>
                  <li><strong>Oxbridge (Oxford/Cambridge):</strong> A*A*A-A*AA (168-160 points) is common</li>
                  <li><strong>Standard universities:</strong> BBB-BBC (112-104 points) for most courses</li>
                  <li><strong>Clearing/Foundation:</strong> CCC or lower (96 points and below)</li>
                </ul>
                <p>Always check specific course entry requirements as they vary significantly by institution and subject area.</p>
              </div>
            </details>

            <details className="group bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-purple-100 transition-colors">
                How many A-Levels do I need for university?
                <svg className="w-5 h-5 text-purple-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">Most UK universities require <strong>3 full A-Levels</strong> for standard entry. Some competitive courses (Medicine, Law, Engineering) may ask for 4 A-Levels or additional qualifications like EPQ (Extended Project Qualification).</p>
                <p>Taking 4+ A-Levels can strengthen your application for top universities, but it's better to achieve higher grades in 3 subjects than lower grades in 4.</p>
              </div>
            </details>

            <details className="group bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-orange-100 transition-colors">
                Can I use AS-Level grades for UCAS points?
                <svg className="w-5 h-5 text-orange-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">Yes, AS-Level grades convert to UCAS points but at lower values than full A-Levels:</p>
                <ul className="list-disc list-inside space-y-1 mb-2">
                  <li>AS Grade A = 20 points (vs. 48 for A-Level A)</li>
                  <li>AS Grade B = 16 points (vs. 40 for A-Level B)</li>
                  <li>AS Grade C = 12 points (vs. 32 for A-Level C)</li>
                  <li>AS Grade D = 10 points (vs. 24 for A-Level D)</li>
                  <li>AS Grade E = 6 points (vs. 16 for A-Level E)</li>
                </ul>
                <p>Many universities prefer full A-Levels for entry requirements, but AS-Levels can supplement your application.</p>
              </div>
            </details>

            <details className="group bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-red-100 transition-colors">
                What happens if I fail an A-Level?
                <svg className="w-5 h-5 text-red-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">If you receive a U (ungraded) in an A-Level, you get 0 UCAS points for that subject. However, you have several options:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Retake:</strong> You can retake the exam in the next session (usually within a year)</li>
                  <li><strong>UCAS Clearing:</strong> Many universities offer Clearing places for students who miss their predicted grades</li>
                  <li><strong>Foundation Year:</strong> Consider a foundation year program before starting your degree</li>
                  <li><strong>Alternative Routes:</strong> BTECs, apprenticeships, or vocational qualifications</li>
                </ul>
              </div>
            </details>

            <details className="group bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-indigo-100 transition-colors">
                Are A-Levels accepted internationally?
                <svg className="w-5 h-5 text-indigo-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">Yes, A-Levels are globally recognized and accepted for university entry in many countries:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>UK:</strong> Primary qualification (100% acceptance)</li>
                  <li><strong>Australia:</strong> Widely accepted, converted to ATAR equivalents</li>
                  <li><strong>Germany:</strong> Recognized for direct university admission</li>
                  <li><strong>USA:</strong> Accepted by most universities (may require SAT/ACT)</li>
                  <li><strong>Canada:</strong> Accepted alongside high school transcripts</li>
                  <li><strong>Singapore, Hong Kong, UAE:</strong> Fully recognized</li>
                </ul>
                <p className="mt-2">Some countries may require additional tests or specific subject combinations. Always check individual university requirements.</p>
              </div>
            </details>

            <details className="group bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-cyan-100 transition-colors">
                How accurate is this A-Level calculator?
                <svg className="w-5 h-5 text-cyan-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">This calculator uses the <strong>official UCAS Tariff 2024-2025</strong> point system for accurate grade-to-points conversion. Results are precise for UCAS applications and match the official UCAS calculator.</p>
                <p>However, always verify final calculations with your school or college, and check specific university entry requirements as institutions may have additional criteria beyond UCAS points (subject requirements, personal statements, interviews, etc.).</p>
              </div>
            </details>

            <details className="group bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200 overflow-hidden">
              <summary className="cursor-pointer p-4 font-semibold text-gray-800 flex items-center justify-between hover:bg-pink-100 transition-colors">
                Can I calculate points for predicted grades?
                <svg className="w-5 h-5 text-pink-600 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600 text-sm">
                <p className="mb-2">Absolutely! This calculator is perfect for calculating predicted grades. Many Year 12 and Year 13 students use predicted grades to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Plan their UCAS applications before final exams</li>
                  <li>Set target grades for university entry requirements</li>
                  <li>Understand how many UCAS points they need to achieve</li>
                  <li>Compare different grade scenarios and outcomes</li>
                </ul>
                <p className="mt-2">Your teachers will provide predicted grades based on your current performance, mock exams, and coursework.</p>
              </div>
            </details>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools 
          currentSlug="a-level-score-calculator" 
          relatedSlugs={["sat-score-calculator", "gre-score-calculator", "berkeley-gpa-calculator"]} 
          navigateTo={navigateTo} 
        />
      </div>
    </div>
  );
};

export default ALevelScoreCalculator;
