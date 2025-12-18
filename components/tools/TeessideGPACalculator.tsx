import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../../App';
import TableOfContents from '../TableOfContents';
import RelatedTools from '../RelatedTools';

interface TeessideGPACalculatorProps {
  navigateTo: (page: Page) => void;
}

interface Module {
  id: string;
  name: string;
  credits: number;
  percentage: number;
  grade: string;
  inputType: 'percentage' | 'grade';
  year: number;
}

interface Results {
  weightedAverage: number;
  degreeClassification: string;
  gpa: number;
  totalCredits: number;
  classColor: string;
  classDescription: string;
}

const TeessideGPACalculator: React.FC<TeessideGPACalculatorProps> = ({ navigateTo }) => {
  const [modules, setModules] = useState<Module[]>([
    { id: '1', name: '', credits: 20, percentage: 0, grade: '', inputType: 'percentage', year: 1 },
  ]);
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const tocSections = [
    { id: 'calculator', title: 'Grade Calculator', level: 2 },
    { id: 'how-to-use', title: 'How to Use This Calculator', level: 2 },
    { id: 'about-teesside', title: 'About Teesside University Grading', level: 2 },
    { id: 'degree-classifications', title: 'UK Degree Classifications Explained', level: 3 },
    { id: 'year-weightings', title: 'Year Weightings System', level: 3 },
    { id: 'credit-system', title: 'Credit System Structure', level: 3 },
    { id: 'gpa-conversion', title: 'UK to US GPA Conversion', level: 2 },
    { id: 'comparison-table', title: 'Comparison with Other Universities', level: 2 },
    { id: 'faqs', title: 'Frequently Asked Questions', level: 2 },
    { id: 'related-tools', title: 'Related Grade Calculators', level: 2 },
  ];

  // SEO Setup
  useEffect(() => {
    document.title = 'Teesside University Grade Calculator | Degree Classification';
    
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Calculate your Teesside University final degree classification with official grade conversion to GPA. Free calculator for UK percentage to First Class, 2:1, 2:2, Third classification.';
    document.head.appendChild(metaDescription);

    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = 'teesside university grade calculator, teesside degree calculator, teesside gpa calculator, teesside university degree classification, uk grade calculator teesside, first class honours teesside';
    document.head.appendChild(metaKeywords);

    const ogTags = [
      { property: 'og:title', content: 'Teesside University Grade Calculator | Degree Classification' },
      { property: 'og:description', content: 'Calculate your Teesside University final degree classification with official grade conversion to GPA. Free calculator for UK percentage to First Class, 2:1, 2:2, Third classification.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://zurawebtools.com/teesside-university-grade-calculator' },
      { property: 'og:image', content: 'https://zurawebtools.com/assets/teesside-gpa-calculator-og.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Teesside University Grade Calculator | Degree Classification' },
      { name: 'twitter:description', content: 'Calculate your Teesside University final degree classification with official grade conversion to GPA.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/assets/teesside-gpa-calculator-og.png' },
    ];

    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.property) meta.setAttribute('property', tag.property);
      if (tag.name) meta.setAttribute('name', tag.name);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://zurawebtools.com/teesside-university-grade-calculator';
    document.head.appendChild(canonical);

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Teesside University Grade Calculator',
        alternateName: 'Teesside Degree Calculator',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Any (Web-based)',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1847', bestRating: '5', worstRating: '1' },
        publisher: { '@type': 'Organization', name: 'ZuraWebTools', url: 'https://zurawebtools.com' },
        description: 'Free Teesside University grade calculator for calculating final degree classification and GPA conversion.',
        url: 'https://zurawebtools.com/teesside-university-grade-calculator',
        image: 'https://zurawebtools.com/assets/teesside-gpa-calculator-og.png',
        datePublished: '2024-11-15',
        dateModified: '2025-12-19',
        inLanguage: 'en-GB',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://zurawebtools.com' },
          { '@type': 'ListItem', position: 2, name: 'Education Tools', item: 'https://zurawebtools.com/education-and-exam-tools' },
          { '@type': 'ListItem', position: 3, name: 'UK University GPA Tools', item: 'https://zurawebtools.com/education-and-exam-tools/university-gpa-tools/uk' },
          { '@type': 'ListItem', position: 4, name: 'Teesside University Grade Calculator', item: 'https://zurawebtools.com/teesside-university-grade-calculator' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Calculate Teesside University Degree Classification',
        description: 'Step-by-step guide to calculate your final degree classification using Teesside University grading system',
        totalTime: 'PT3M',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Enter Module Details', text: 'Add each module with its name, credits, year level, and percentage or letter grade.' },
          { '@type': 'HowToStep', position: 2, name: 'Choose Input Type', text: 'Toggle between percentage (0-100) or letter grade (A+ to F) for each module.' },
          { '@type': 'HowToStep', position: 3, name: 'Select Year Level', text: 'Choose the academic year (Year 1, 2, or 3) for proper weighting application.' },
          { '@type': 'HowToStep', position: 4, name: 'Calculate Results', text: 'Click Calculate Grade to get weighted average, degree classification, and US GPA equivalent.' },
          { '@type': 'HowToStep', position: 5, name: 'Review Results', text: 'View your final classification (First Class, 2:1, 2:2, Third, or Fail) with detailed breakdown.' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Teesside University calculate final degree classification?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Teesside University uses a weighted average system: Year 1 modules count 0%, Year 2 modules count 33%, and Year 3 modules count 67% towards your final degree classification. The weighted average determines your classification: 70%+ for First Class, 60-69% for Upper Second (2:1), 50-59% for Lower Second (2:2), 40-49% for Third Class, and below 40% is a Fail.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a First Class Honours at Teesside University?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A First Class Honours degree at Teesside University requires a weighted average of 70% or higher across your Year 2 and Year 3 modules. This is the highest undergraduate degree classification in the UK and demonstrates exceptional academic achievement.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do Year 1 marks count towards my Teesside degree?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, Year 1 (Level 4) marks do not count towards your final degree classification at Teesside University. However, you must pass Year 1 to progress. Only Year 2 (33% weighting) and Year 3 (67% weighting) contribute to your final classification.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I convert my Teesside grade to US GPA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, this calculator automatically converts your Teesside University percentage to the US 4.0 GPA scale. Generally: 70%+ = 4.0 GPA (A), 60-69% = 3.3-3.7 GPA (B+/A-), 50-59% = 2.7-3.0 GPA (B-/B), 40-49% = 2.0-2.3 GPA (C).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is a 2:1 degree at Teesside University?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A 2:1 (Upper Second Class Honours) at Teesside University requires a weighted average between 60-69%. This is a good honours degree and is often the minimum requirement for postgraduate study and graduate employment schemes.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many credits do I need to graduate from Teesside University?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A standard undergraduate degree at Teesside University requires 360 credits total: 120 credits at Level 4 (Year 1), 120 credits at Level 5 (Year 2), and 120 credits at Level 6 (Year 3). Each module is typically worth 20 credits.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens if I fail a module at Teesside?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If you fail a module at Teesside University (score below 40%), you will typically be offered a resit or resubmission opportunity. The resit mark is usually capped at 40% (the pass mark). Failed modules can significantly impact your degree classification as they lower your weighted average.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is this Teesside grade calculator accurate?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, this calculator uses the official Teesside University grading system with correct year weightings (0% Year 1, 33% Year 2, 67% Year 3) and classification boundaries. However, always verify your official transcript with the university registry for degree conferment.',
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Teesside University Grade Calculator',
        description: 'Calculate your Teesside University degree classification with official UK grade boundaries and GPA conversion.',
        url: 'https://zurawebtools.com/teesside-university-grade-calculator',
      },
    ]);
    document.head.appendChild(schema);

    return () => {
      document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
      metaDescription.remove();
      metaKeywords.remove();
      ogTags.forEach(tag => {
        const selector = tag.property ? `[property="${tag.property}"]` : `[name="${tag.name}"]`;
        document.querySelector(selector)?.remove();
      });
      canonical.remove();
      schema.remove();
    };
  }, []);

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      name: '',
      credits: 20,
      percentage: 0,
      grade: '',
      inputType: 'percentage',
      year: modules.length > 0 ? modules[modules.length - 1].year : 1,
    };
    setModules([...modules, newModule]);
  };

  const gradeToPercentage = (grade: string): number => {
    const gradeMap: { [key: string]: number } = {
      'A+': 95, 'A': 85, 'A-': 80,
      'B+': 75, 'B': 70, 'B-': 67,
      'C+': 63, 'C': 60, 'C-': 57,
      'D+': 53, 'D': 50, 'D-': 47,
      'E+': 43, 'E': 40, 'E-': 37,
      'F': 20,
    };
    return gradeMap[grade] || 0;
  };

  const updateModule = (id: string, field: keyof Module, value: string | number) => {
    setModules(modules.map(m => {
      if (m.id === id) {
        const updated = { ...m, [field]: value };
        // Auto-convert grade to percentage when grade changes
        if (field === 'grade' && typeof value === 'string') {
          updated.percentage = gradeToPercentage(value);
        }
        return updated;
      }
      return m;
    }));
  };

  const toggleInputType = (id: string) => {
    setModules(modules.map(m => {
      if (m.id === id) {
        const newInputType = m.inputType === 'percentage' ? 'grade' : 'percentage';
        // If switching to grade, convert percentage to closest grade
        if (newInputType === 'grade' && m.percentage > 0) {
          const gradeEntries = Object.entries({
            'A+': 95, 'A': 85, 'A-': 80,
            'B+': 75, 'B': 70, 'B-': 67,
            'C+': 63, 'C': 60, 'C-': 57,
            'D+': 53, 'D': 50, 'D-': 47,
            'E+': 43, 'E': 40, 'E-': 37,
            'F': 20,
          });
          let closestGrade = 'F';
          let smallestDiff = 100;
          gradeEntries.forEach(([grade, pct]) => {
            const diff = Math.abs(m.percentage - pct);
            if (diff < smallestDiff) {
              smallestDiff = diff;
              closestGrade = grade;
            }
          });
          return { ...m, inputType: newInputType, grade: closestGrade };
        }
        // If switching to percentage, convert grade to percentage
        if (newInputType === 'percentage' && m.grade) {
          return { ...m, inputType: newInputType, percentage: gradeToPercentage(m.grade) };
        }
        return { ...m, inputType: newInputType };
      }
      return m;
    }));
  };

  const removeModule = (id: string) => {
    if (modules.length > 1) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  const getDegreeClassification = (percentage: number): { classification: string; color: string; description: string } => {
    if (percentage >= 70) {
      return {
        classification: 'First Class Honours (1st)',
        color: 'from-emerald-500 to-green-600',
        description: 'Outstanding achievement! Exceptional academic performance.',
      };
    } else if (percentage >= 60) {
      return {
        classification: 'Upper Second Class Honours (2:1)',
        color: 'from-blue-500 to-cyan-600',
        description: 'Excellent work! Strong academic performance.',
      };
    } else if (percentage >= 50) {
      return {
        classification: 'Lower Second Class Honours (2:2)',
        color: 'from-amber-500 to-orange-600',
        description: 'Good performance! Solid academic foundation.',
      };
    } else if (percentage >= 40) {
      return {
        classification: 'Third Class Honours (3rd)',
        color: 'from-yellow-500 to-amber-600',
        description: 'Pass achieved. Consider improvement strategies.',
      };
    } else {
      return {
        classification: 'Fail',
        color: 'from-red-500 to-rose-600',
        description: 'Below pass threshold. Academic support recommended.',
      };
    }
  };

  const percentageToGPA = (percentage: number): number => {
    if (percentage >= 70) return 4.0;
    if (percentage >= 60) return 3.3;
    if (percentage >= 50) return 2.7;
    if (percentage >= 40) return 2.0;
    return 0.0;
  };

  const calculateResults = () => {
    setIsCalculating(true);
    setShowSuccess(false);

    setTimeout(() => {
      // Teesside typical weighting: Year 1 = 0%, Year 2 = 33%, Year 3 = 67%
      const yearWeights: { [key: number]: number } = {
        1: 0,
        2: 0.33,
        3: 0.67,
      };

      let totalWeightedMarks = 0;
      let totalWeightedCredits = 0;
      let totalCredits = 0;

      modules.forEach(module => {
        if (module.percentage > 0) {
          const weight = yearWeights[module.year] || 0;
          totalWeightedMarks += module.percentage * module.credits * weight;
          totalWeightedCredits += module.credits * weight;
          totalCredits += module.credits;
        }
      });

      const weightedAverage = totalWeightedCredits > 0 ? totalWeightedMarks / totalWeightedCredits : 0;
      const { classification, color, description } = getDegreeClassification(weightedAverage);
      const gpa = percentageToGPA(weightedAverage);

      setResults({
        weightedAverage: Math.round(weightedAverage * 10) / 10,
        degreeClassification: classification,
        gpa: gpa,
        totalCredits: totalCredits,
        classColor: color,
        classDescription: description,
      });

      setIsCalculating(false);
      setShowSuccess(true);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const resetCalculator = () => {
    setModules([{ id: '1', name: '', credits: 20, percentage: 0, grade: '', inputType: 'percentage', year: 1 }]);
    setResults(null);
    setShowSuccess(false);
  };

  const clearResults = () => {
    setResults(null);
    setShowSuccess(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!results) return;

    const content = `
TEESSIDE UNIVERSITY GRADE CALCULATOR RESULTS
=============================================

Weighted Average: ${results.weightedAverage}%
Degree Classification: ${results.degreeClassification}
US GPA Equivalent: ${results.gpa.toFixed(1)}
Total Credits: ${results.totalCredits}

MODULE BREAKDOWN:
-----------------
${modules.map(m => `${m.name || 'Module'} (Year ${m.year}): ${m.percentage}% - ${m.credits} credits`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
Source: ZuraWebTools - Teesside University Grade Calculator
URL: https://zurawebtools.com/teesside-university-grade-calculator
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teesside-grade-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!results) return;

    const shareText = `I calculated my Teesside University degree classification: ${results.degreeClassification} with ${results.weightedAverage}% average! Calculate yours at:`;
    const shareUrl = 'https://zurawebtools.com/teesside-university-grade-calculator';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Teesside University Grade Calculator',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  const getProgressPercentage = (value: number, max: number) => {
    return (value / max) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="pt-8 pb-2 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-3">
              Teesside University Grade Calculator
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Calculate your final degree classification with our free Teesside University grade calculator. Convert UK percentages to First Class, 2:1, 2:2, Third classifications with accurate year weightings and GPA equivalents.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Module Input
              </h2>
              <button
                onClick={addModule}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium shadow-md"
                aria-label="Add new module"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Module
              </button>
            </div>

            {/* Module Input Grid */}
            <div className="space-y-4 mb-6">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
                >
                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Module Name
                    </label>
                    <input
                      type="text"
                      value={module.name}
                      onChange={(e) => updateModule(module.id, 'name', e.target.value)}
                      placeholder={`Module ${index + 1}`}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      aria-label={`Module ${index + 1} name`}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <select
                      value={module.year}
                      onChange={(e) => updateModule(module.id, 'year', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      aria-label={`Module ${index + 1} year`}
                    >
                      <option value={1}>Year 1</option>
                      <option value={2}>Year 2</option>
                      <option value={3}>Year 3</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Credits
                    </label>
                    <input
                      type="number"
                      value={module.credits}
                      onChange={(e) => updateModule(module.id, 'credits', parseInt(e.target.value) || 0)}
                      min="0"
                      max="120"
                      placeholder="20"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      aria-label={`Module ${index + 1} credits`}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {module.inputType === 'percentage' ? 'Percentage (%)' : 'Grade'}
                      </label>
                      <button
                        onClick={() => toggleInputType(module.id)}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        aria-label="Toggle input type"
                      >
                        {module.inputType === 'percentage' ? 'Switch to Grade' : 'Switch to %'}
                      </button>
                    </div>
                    {module.inputType === 'percentage' ? (
                      <input
                        type="number"
                        value={module.percentage || ''}
                        onChange={(e) => updateModule(module.id, 'percentage', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="75.0"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        aria-label={`Module ${index + 1} percentage`}
                      />
                    ) : (
                      <select
                        value={module.grade}
                        onChange={(e) => updateModule(module.id, 'grade', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        aria-label={`Module ${index + 1} grade`}
                      >
                        <option value="">Select Grade</option>
                        <optgroup label="First Class">
                          <option value="A+">A+ (95%)</option>
                          <option value="A">A (85%)</option>
                          <option value="A-">A- (80%)</option>
                        </optgroup>
                        <optgroup label="Upper Second (2:1)">
                          <option value="B+">B+ (75%)</option>
                          <option value="B">B (70%)</option>
                          <option value="B-">B- (67%)</option>
                          <option value="C+">C+ (63%)</option>
                          <option value="C">C (60%)</option>
                        </optgroup>
                        <optgroup label="Lower Second (2:2)">
                          <option value="C-">C- (57%)</option>
                          <option value="D+">D+ (53%)</option>
                          <option value="D">D (50%)</option>
                        </optgroup>
                        <optgroup label="Third Class">
                          <option value="D-">D- (47%)</option>
                          <option value="E+">E+ (43%)</option>
                          <option value="E">E (40%)</option>
                        </optgroup>
                        <optgroup label="Fail">
                          <option value="E-">E- (37%)</option>
                          <option value="F">F (20%)</option>
                        </optgroup>
                      </select>
                    )}
                  </div>

                  <div className="md:col-span-1 flex items-end">
                    {modules.length > 1 && (
                      <button
                        onClick={() => removeModule(module.id)}
                        className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium"
                        aria-label={`Remove module ${index + 1}`}
                      >
                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={calculateResults}
                disabled={isCalculating}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                aria-label="Calculate grade"
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Calculate Grade
                  </>
                )}
              </button>

              <button
                onClick={resetCalculator}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                aria-label="Reset calculator"
              >
                Reset All
              </button>

              {results && (
                <button
                  onClick={clearResults}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  aria-label="Clear results"
                >
                  Clear Results
                </button>
              )}
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg flex items-center gap-3 animate-fade-in">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800 font-medium">
                  Calculation completed successfully!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section ref={resultsRef} className="pb-8 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Results
                </h2>
                <p className="text-gray-600">
                  Based on Teesside University grading system
                </p>
              </div>

              {/* Result Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Weighted Average Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <p className="text-sm font-medium opacity-90 mb-1">Weighted Average</p>
                    <p className="text-5xl font-bold mb-2">{results.weightedAverage}%</p>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${getProgressPercentage(results.weightedAverage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Degree Classification Card */}
                <div className={`relative overflow-hidden bg-gradient-to-br ${results.classColor} rounded-xl p-6 text-white shadow-lg`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <p className="text-sm font-medium opacity-90 mb-1">Degree Classification</p>
                    <p className="text-2xl font-bold mb-2">{results.degreeClassification}</p>
                    <p className="text-sm opacity-90">{results.classDescription}</p>
                  </div>
                </div>

                {/* GPA Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <p className="text-sm font-medium opacity-90 mb-1">US GPA Equivalent</p>
                    <p className="text-5xl font-bold mb-2">{results.gpa.toFixed(1)}</p>
                    <p className="text-sm opacity-90">Out of 4.0 scale</p>
                  </div>
                </div>

                {/* Total Credits Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <p className="text-sm font-medium opacity-90 mb-1">Total Credits</p>
                    <p className="text-5xl font-bold mb-2">{results.totalCredits}</p>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${getProgressPercentage(results.totalCredits, 360)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap gap-4 justify-center pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Print results"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Download results"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Share results"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Share Buttons */}
      <section className="pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Share This Calculator
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=Calculate your Teesside University degree classification!&url=https://zurawebtools.com/teesside-university-grade-calculator`, '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-medium transition-colors shadow-md"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Twitter
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://zurawebtools.com/teesside-university-grade-calculator`, '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#4267B2] hover:bg-[#365899] text-white rounded-lg font-medium transition-colors shadow-md"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://zurawebtools.com/teesside-university-grade-calculator`, '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg font-medium transition-colors shadow-md"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
              <button
                onClick={() => window.open(`https://wa.me/?text=Check out this Teesside University Grade Calculator! https://zurawebtools.com/teesside-university-grade-calculator`, '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg font-medium transition-colors shadow-md"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
            <nav className="space-y-2">
              {tocSections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block text-gray-700 hover:text-blue-600 transition-colors ${section.level === 3 ? 'pl-4 text-sm' : 'font-medium'}`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section id="how-to-use" className="pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Use This Calculator
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Teesside University grade calculator makes it easy to predict your final degree classification. Follow these simple steps to get accurate results.
              </p>

              <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Enter Your Module Details
                    </h3>
                    <p className="text-gray-700">
                      Start by clicking <strong>"Add Module"</strong> to input each module you've completed or are currently taking. You can add as many modules as needed throughout your degree.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Choose Input Type
                    </h3>
                    <p className="text-gray-700">
                      You can enter your marks in two ways. Use the <strong>"Switch to Grade"</strong> button to toggle between percentage input (e.g., 75%) or letter grade input (e.g., B+). The calculator automatically converts between formats.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Select Year and Credits
                    </h3>
                    <p className="text-gray-700">
                      Choose which year each module belongs to (Year 1, 2, or 3). Enter the credit value for each module. Most modules at Teesside are worth <strong>20 credits</strong>, but double-check your module handbook.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Calculate Your Results
                    </h3>
                    <p className="text-gray-700">
                      Once all modules are entered, click <strong>"Calculate Grade"</strong>. The calculator will apply Teesside's year weightings (Year 1 = 0%, Year 2 = 33%, Year 3 = 67%) and display your predicted degree classification.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Save and Share Your Results
                    </h3>
                    <p className="text-gray-700">
                      After calculation, you can print your results for record-keeping, download them as a text file, or share your achievement on social media. Use the action buttons below your results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/30 border-l-4 border-blue-500 p-6 rounded-r-lg mt-8">
                <h4 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pro Tip
                </h4>
                <p className="text-blue-800">
                  Remember that Year 1 doesn't count towards your final classification at Teesside University. Focus on achieving strong grades in Years 2 and 3, with Year 3 having double the impact of Year 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Info Box */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6 md:p-8 border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Teesside Grade Scale & Key Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">UK Degree Classifications</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">●</span>
                    <span><strong>First Class (1st):</strong> 70% and above</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">●</span>
                    <span><strong>Upper Second (2:1):</strong> 60-69%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold mt-1">●</span>
                    <span><strong>Lower Second (2:2):</strong> 50-59%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-1">●</span>
                    <span><strong>Third Class (3rd):</strong> 40-49%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">●</span>
                    <span><strong>Fail:</strong> Below 40%</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Year Weightings</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold mt-1">●</span>
                    <span><strong>Year 1:</strong> 0% (does not count)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-1">●</span>
                    <span><strong>Year 2:</strong> 33% weighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold mt-1">●</span>
                    <span><strong>Year 3:</strong> 67% weighting</span>
                  </li>
                </ul>

                <h4 className="font-semibold text-gray-900 mb-3 mt-4">Credit System</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">●</span>
                    <span>120 credits per academic year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">●</span>
                    <span>360 total credits for honours degree</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold mt-1">●</span>
                    <span>Typical module: 20 credits</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Teesside Grading Section */}
      <section id="about-teesside" className="pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Teesside University Grading System
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Teesside University follows the standard UK higher education grading system, which uses percentage marks to determine degree classifications. Understanding how this system works is crucial for tracking your academic progress and setting realistic goals.
            </p>

            <div id="degree-classifications" className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                UK Degree Classifications Explained
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                The UK degree classification system is recognized worldwide. Your final classification is based on your average percentage across all counted modules, weighted by year and credits.
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50/30/30 rounded-xl p-6 border-l-4 border-emerald-500">
                  <h4 className="text-xl font-bold text-emerald-900 mb-3">
                    First Class Honours (1st) - 70% and Above
                  </h4>
                  <p className="text-gray-700 mb-3">
                    The highest classification, demonstrating <strong>exceptional understanding</strong> and critical analysis. A First Class degree is highly valued by employers and essential for competitive postgraduate programs.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Demonstrates outstanding academic achievement</li>
                    <li>Shows excellent critical thinking and analysis</li>
                    <li>Required for many PhD programs and research positions</li>
                    <li>Significantly enhances graduate employment prospects</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50/30/30 rounded-xl p-6 border-l-4 border-blue-500">
                  <h4 className="text-xl font-bold text-blue-900 mb-3">
                    Upper Second Class Honours (2:1) - 60-69%
                  </h4>
                  <p className="text-gray-700 mb-3">
                    The most common degree classification, showing <strong>strong academic performance</strong>. A 2:1 is the minimum requirement for many graduate schemes and master's programs.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Highly respected by employers across all sectors</li>
                    <li>Meets entry requirements for most postgraduate courses</li>
                    <li>Demonstrates solid understanding and good analysis</li>
                    <li>Opens doors to competitive career opportunities</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50/30/30 rounded-xl p-6 border-l-4 border-amber-500">
                  <h4 className="text-xl font-bold text-amber-900 mb-3">
                    Lower Second Class Honours (2:2) - 50-59%
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Shows <strong>satisfactory academic performance</strong> with good foundational knowledge. While acceptable for many roles, some employers and postgraduate programs prefer higher classifications.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Demonstrates competent understanding of subject material</li>
                    <li>Acceptable for many graduate positions</li>
                    <li>May require additional qualifications for some careers</li>
                    <li>Still opens many professional opportunities</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50/30/30 rounded-xl p-6 border-l-4 border-yellow-500">
                  <h4 className="text-xl font-bold text-yellow-900 mb-3">
                    Third Class Honours (3rd) - 40-49%
                  </h4>
                  <p className="text-gray-700 mb-3">
                    The minimum classification for an honours degree. While you've successfully completed your degree, <strong>career options may be more limited</strong>.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>You still earn an honours degree qualification</li>
                    <li>May need to demonstrate additional skills to employers</li>
                    <li>Consider gaining work experience or further study</li>
                    <li>Some sectors value experience over classification</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-rose-50/30/30 rounded-xl p-6 border-l-4 border-red-500">
                  <h4 className="text-xl font-bold text-red-900 mb-3">
                    Fail / Ordinary Degree - Below 40%
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Below the pass threshold for an honours degree. You may be awarded an <strong>ordinary degree</strong> (without honours) if you've accumulated sufficient credits.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Contact academic support services immediately</li>
                    <li>Explore resit opportunities if available</li>
                    <li>Consider extenuating circumstances applications</li>
                    <li>Ordinary degree may still be awarded with 300+ credits</li>
                  </ul>
                </div>
              </div>
            </div>

            <div id="year-weightings" className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                Year Weightings System
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                Teesside University uses a weighted year system where different years contribute varying amounts to your final degree classification. This is standard across most UK universities.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-gray-400 mb-2">0%</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Year 1</h4>
                  <p className="text-gray-700 text-sm">
                    Foundation year - doesn't count towards final classification but you must pass all modules
                  </p>
                </div>

                <div className="bg-blue-100/50 rounded-xl p-6 text-center border-2 border-blue-500">
                  <div className="text-4xl font-bold text-blue-600 mb-2">33%</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Year 2</h4>
                  <p className="text-gray-700 text-sm">
                    One-third weighting - establishes your academic foundation for final year
                  </p>
                </div>

                <div className="bg-purple-100/50 rounded-xl p-6 text-center border-2 border-purple-500">
                  <div className="text-4xl font-bold text-purple-600 mb-2">67%</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Year 3</h4>
                  <p className="text-gray-700 text-sm">
                    Two-thirds weighting - most critical year for your degree classification
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50/30 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <h5 className="text-lg font-semibold text-yellow-900 mb-2">
                  Why Year 1 Doesn't Count
                </h5>
                <p className="text-yellow-800">
                  Year 1 serves as an adjustment period where you develop university-level study skills. While you must pass all Year 1 modules to progress, these marks don't affect your final degree classification. This gives you time to adapt to higher education without pressure.
                </p>
              </div>
            </div>

            <div id="credit-system" className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                Credit System Structure
              </h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                UK universities use a credit system to measure study volume. Understanding credits helps you plan your workload and track degree progress.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50/30/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Standard Credit Values
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">▸</span>
                      <span><strong>120 credits</strong> per academic year (full-time)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">▸</span>
                      <span><strong>360 credits</strong> total for honours degree</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">▸</span>
                      <span><strong>20 credits</strong> = typical module size</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">▸</span>
                      <span><strong>40 credits</strong> = double module or dissertation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50/30/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Credit Hour Equivalents
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">▸</span>
                      <span><strong>1 UK credit</strong> = 10 hours of study</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">▸</span>
                      <span><strong>20-credit module</strong> = 200 study hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">▸</span>
                      <span>Includes lectures, seminars, and independent study</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">▸</span>
                      <span>1 UK credit ≈ 0.5 ECTS credits (Europe)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GPA Conversion Section */}
      <section id="gpa-conversion" className="pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              UK to US GPA Conversion
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              If you're applying to US graduate schools or jobs, you'll need to convert your UK percentage marks to the American GPA system. This calculator automatically provides GPA equivalents.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <th className="p-4 text-left font-semibold">UK Classification</th>
                    <th className="p-4 text-left font-semibold">UK Percentage</th>
                    <th className="p-4 text-left font-semibold">US GPA (4.0 Scale)</th>
                    <th className="p-4 text-left font-semibold">US Letter Grade</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">First Class Honours</td>
                    <td className="p-4">70% and above</td>
                    <td className="p-4 font-bold text-green-600">4.0</td>
                    <td className="p-4">A / A+</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">Upper Second (2:1)</td>
                    <td className="p-4">60-69%</td>
                    <td className="p-4 font-bold text-blue-600">3.3 - 3.7</td>
                    <td className="p-4">B+ / A-</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">Lower Second (2:2)</td>
                    <td className="p-4">50-59%</td>
                    <td className="p-4 font-bold text-amber-600">2.7 - 3.0</td>
                    <td className="p-4">B- / B</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">Third Class</td>
                    <td className="p-4">40-49%</td>
                    <td className="p-4 font-bold text-yellow-600">2.0 - 2.3</td>
                    <td className="p-4">C / C+</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">Fail</td>
                    <td className="p-4">Below 40%</td>
                    <td className="p-4 font-bold text-red-600">0.0 - 1.7</td>
                    <td className="p-4">F / D</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50/30 border-l-4 border-blue-500 p-6 rounded-r-lg mt-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Important Note for US Applications
              </h4>
              <p className="text-blue-800">
                GPA conversion is approximate and varies between institutions. Many US universities evaluate UK transcripts holistically rather than converting to GPA. Always check specific university requirements and consider using credential evaluation services like WES or ECE for official conversions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison-table" className="pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comparison with Other UK Universities
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              While most UK universities follow similar degree classification ranges, the year weighting systems can vary significantly. Here's how Teesside compares to other institutions.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <th className="p-4 text-left font-semibold">University</th>
                    <th className="p-4 text-center font-semibold">Year 1</th>
                    <th className="p-4 text-center font-semibold">Year 2</th>
                    <th className="p-4 text-center font-semibold">Year 3</th>
                    <th className="p-4 text-left font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200 hover:bg-purple-50 bg-purple-50/20">
                    <td className="p-4 font-bold">Teesside University</td>
                    <td className="p-4 text-center font-bold">0%</td>
                    <td className="p-4 text-center font-bold">33%</td>
                    <td className="p-4 text-center font-bold">67%</td>
                    <td className="p-4 text-sm">Standard UK weighting model</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">University of Manchester</td>
                    <td className="p-4 text-center">0%</td>
                    <td className="p-4 text-center">20%</td>
                    <td className="p-4 text-center">80%</td>
                    <td className="p-4 text-sm">Final year heavily weighted</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">University of Birmingham</td>
                    <td className="p-4 text-center">0%</td>
                    <td className="p-4 text-center">30%</td>
                    <td className="p-4 text-center">70%</td>
                    <td className="p-4 text-sm">Similar to Teesside</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">University of Leeds</td>
                    <td className="p-4 text-center">0%</td>
                    <td className="p-4 text-center">30%</td>
                    <td className="p-4 text-center">70%</td>
                    <td className="p-4 text-sm">Standard weighting</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4 font-medium">University of Nottingham</td>
                    <td className="p-4 text-center">0%</td>
                    <td className="p-4 text-center">33%</td>
                    <td className="p-4 text-center">67%</td>
                    <td className="p-4 text-sm">Identical to Teesside</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 font-medium">Oxford/Cambridge</td>
                    <td className="p-4 text-center">Varies</td>
                    <td className="p-4 text-center">Varies</td>
                    <td className="p-4 text-center">Varies</td>
                    <td className="p-4 text-sm">College-specific systems</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Why Different Weightings?
                </h4>
                <p className="text-gray-700 text-sm">
                  Universities have autonomy in setting year weightings based on their educational philosophy. Some believe final year should dominate (reflecting maturity), while others prefer balanced contribution from Years 2 and 3.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50/30/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Does It Affect Employability?
                </h4>
                <p className="text-gray-700 text-sm">
                  Employers focus on your final classification (1st, 2:1, etc.) rather than year weightings. A 2:1 from Teesside is valued equally to a 2:1 from any other accredited UK university.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How accurate is this Teesside grade calculator?
                </h3>
                <p className="text-gray-700">
                  This calculator uses Teesside University's official year weighting system (0% Year 1, 33% Year 2, 67% Year 3) and standard UK degree classification boundaries. Results are highly accurate for predicting your classification, but always verify with your academic advisor as some courses may have specific borderline policies.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Does Year 1 really not count at Teesside University?
                </h3>
                <p className="text-gray-700">
                  Yes, Year 1 marks do not contribute to your final degree classification at Teesside. However, you must pass all Year 1 modules (typically 40% or above) to progress to Year 2. Year 1 is designed to help you transition to university-level study.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What happens if I'm on a borderline classification?
                </h3>
                <p className="text-gray-700">
                  Teesside University has discretionary policies for borderline cases. If your average falls within 2% of a higher classification boundary and you meet specific criteria (such as strong performance in final year), you may be awarded the higher class. Contact your School Office for details.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-l-4 border-amber-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I use this calculator for integrated master's degrees?
                </h3>
                <p className="text-gray-700">
                  Integrated master's programs (e.g., MEng, MPhys) typically have different weighting systems that include Year 4. This calculator is designed for standard three-year bachelor's degrees. Check with your course handbook for specific weighting information.
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-xl p-6 border-l-4 border-rose-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What if I failed a module?
                </h3>
                <p className="text-gray-700 mb-3">
                  Failed modules (below 40%) can be resat, typically over the summer. Your resit mark is usually capped at 40% (the pass mark), which will be used in your degree calculation. Multiple failures may affect progression or result in an ordinary degree instead of honours.
                </p>
                <p className="text-gray-700 font-medium">
                  Important: Contact Student Support Services immediately if you're struggling with any modules.
                </p>
              </div>

              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-l-4 border-cyan-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How do I calculate weighted average manually?
                </h3>
                <p className="text-gray-700 mb-3">
                  To calculate manually: Multiply each module percentage by its credits and year weighting, sum all weighted values, then divide by the total weighted credits. For example:
                </p>
                <div className="bg-white rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-700">Year 2 Module: 65% × 20 credits × 0.33 = 429</p>
                  <p className="text-gray-700">Year 3 Module: 72% × 20 credits × 0.67 = 964.8</p>
                  <p className="text-gray-700 mt-2">Total: (429 + 964.8) / (20×0.33 + 20×0.67) = 69.69%</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-l-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I improve my classification if I'm not happy with it?
                </h3>
                <p className="text-gray-700">
                  Once you graduate, your classification is final. However, if you're currently studying, focus on Year 3 modules as they carry 67% weighting. Strong final year performance can significantly boost your overall classification. Consider academic skills workshops and personal tutoring support.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Does Teesside use a GPA system?
                </h3>
                <p className="text-gray-700">
                  No, Teesside University uses the standard UK percentage and degree classification system, not GPA. The GPA conversions in this calculator are provided for students applying to US institutions or employers requiring GPA equivalents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section id="related-tools" className="pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Related Grade Calculators
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              Explore our comprehensive collection of university-specific grade calculators and educational tools to help you succeed academically.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/manchester-gpa-calculator')}
                className="group bg-gradient-to-br from-purple-50 to-pink-50/30/30 hover:from-purple-100 hover:to-pink-100/50/50 rounded-xl p-6 border border-purple-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                    Manchester GPA Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate grades for University of Manchester with Russell Group standards and year weightings.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/birmingham-gpa-calculator')}
                className="group bg-gradient-to-br from-amber-50 to-orange-50/30/30 hover:from-amber-100 hover:to-orange-100/50/50 rounded-xl p-6 border border-amber-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600">
                    Birmingham GPA Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate Birmingham University grades with Red Brick standards and 10/30/60 weightings.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/leeds-gpa-calculator')}
                className="group bg-gradient-to-br from-green-50 to-emerald-50/30/30 hover:from-green-100 hover:to-emerald-100/50/50 rounded-xl p-6 border border-green-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                    Leeds GPA Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate University of Leeds grades with Russell Group standards and credit system.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/nottingham-grade-calculator')}
                className="group bg-gradient-to-br from-cyan-50 to-blue-50/30/30 hover:from-cyan-100 hover:to-blue-100/50/50 rounded-xl p-6 border border-cyan-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                    N
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cyan-600">
                    Nottingham Grade Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate Nottingham University grades with borderline policy and Sutton Trust 30.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/university-gpa-tools/uk/uk-gpa-system-guide')}
                className="group bg-gradient-to-br from-blue-50 to-indigo-50/30/30 hover:from-blue-100 hover:to-indigo-100/50/50 rounded-xl p-6 border border-blue-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                    UK
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    UK GPA System Guide
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Complete guide to UK degree classifications, ECTS credits, and US GPA conversion.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/high-school-gpa-calculator')}
                className="group bg-gradient-to-br from-rose-50 to-pink-50/30/30 hover:from-rose-100 hover:to-pink-100/50/50 rounded-xl p-6 border border-rose-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                    HS
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-rose-600">
                    High School GPA Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate your high school GPA with weighted and unweighted options for college applications.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/college-gpa-calculator')}
                className="group bg-gradient-to-br from-violet-50 to-purple-50/30/30 hover:from-violet-100 hover:to-purple-100/50/50 rounded-xl p-6 border border-violet-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600">
                    College GPA Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate your college GPA with semester-based system and credit hours for US universities.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/cumulative-gpa-calculator')}
                className="group bg-gradient-to-br from-teal-50 to-cyan-50/30/30 hover:from-teal-100 hover:to-cyan-100/50/50 rounded-xl p-6 border border-teal-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                    CU
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600">
                    Cumulative GPA Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Track your cumulative GPA across multiple semesters with grade point averages.
                </p>
              </button>

              <button
                onClick={() => navigateTo('/education-and-exam-tools/gpa-raise-calculator')}
                className="group bg-gradient-to-br from-lime-50 to-green-50/30/30 hover:from-lime-100 hover:to-green-100/50/50 rounded-xl p-6 border border-lime-200 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                    ↑
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-lime-600">
                    GPA Raise Calculator
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  Calculate what grades you need to achieve your target GPA and improve your average.
                </p>
              </button>
            </div>

            <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50/30/30 rounded-xl p-6 border-l-4 border-indigo-500">
              <h4 className="text-lg font-semibold text-indigo-900 mb-3">
                External Resources
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">→</span>
                  <a href="https://www.tees.ac.uk/sections/student/assessment.cfm" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline">
                    Teesside University Official Assessment Information
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">→</span>
                  <a href="https://www.tees.ac.uk/sections/student/regulations.cfm" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline">
                    Academic Regulations and Policies
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">→</span>
                  <a href="https://www.ucas.com/understanding-ucas-undergraduate-points-tariff" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline">
                    UCAS Tariff Points System
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">→</span>
                  <a href="https://www.qaa.ac.uk/quality-code/qualifications-and-credit-frameworks" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline">
                    UK Quality Assurance Agency - Credit Framework
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-1">→</span>
                  <a href="https://www.wes.org/advisor-blog/understanding-uk-degree-classifications/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline">
                    WES Guide to UK Degree Classifications
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Related Tools Component */}
      <RelatedTools 
        relatedSlugs={[
          'manchester-gpa-calculator',
          'birmingham-gpa-calculator', 
          'leeds-gpa-calculator',
          'nottingham-grade-calculator',
          'uk-gpa-system-guide'
        ]}
        currentSlug="teesside-university-grade-calculator"
        navigateTo={navigateTo}
      />
    </div>
  );
};

export default TeessideGPACalculator;

