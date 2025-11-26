import React, { useState, useEffect } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';
import { notifyIndexNow } from '../../utils/indexNow';

interface CollegeAdmissionsCalculatorProps {
  navigateTo: (page: Page) => void;
}

const CollegeAdmissionsCalculator: React.FC<CollegeAdmissionsCalculatorProps> = ({ navigateTo }) => {
  // State management
  const [gpa, setGpa] = useState<number | ''>('');
  const [testType, setTestType] = useState<'SAT' | 'ACT'>('SAT');
  const [satScore, setSatScore] = useState<number | ''>('');
  const [actScore, setActScore] = useState<number | ''>('');
  const [ecScore, setEcScore] = useState<number | ''>('');
  
  // Additional factors for enhanced accuracy
  const [apIbCourses, setApIbCourses] = useState<number | ''>('');
  const [isFirstGen, setIsFirstGen] = useState<boolean>(false);
  const [isLegacy, setIsLegacy] = useState<boolean>(false);
  const [essayQuality, setEssayQuality] = useState<number>(5);
  
  // Validation warnings
  const [gpaWarning, setGpaWarning] = useState<string>('');
  const [testWarning, setTestWarning] = useState<string>('');

  // Enhanced validation with warnings
  useEffect(() => {
    if (typeof gpa === 'number') {
      if (gpa < 2.0) {
        setGpaWarning('⚠️ GPA below 2.0 is very low. Consider community college or focus on improvement.');
      } else if (gpa < 2.5) {
        setGpaWarning('⚠️ GPA below 2.5 may limit college options significantly.');
      } else {
        setGpaWarning('');
      }
    }
  }, [gpa]);

  useEffect(() => {
    if (testType === 'SAT' && typeof satScore === 'number') {
      if (satScore < 800) {
        setTestWarning('⚠️ SAT score below 800 is below average. Consider retaking the test.');
      } else if (satScore < 1000) {
        setTestWarning('⚠️ SAT score below 1000 may limit admission to selective colleges.');
      } else {
        setTestWarning('');
      }
    } else if (testType === 'ACT' && typeof actScore === 'number') {
      if (actScore < 15) {
        setTestWarning('⚠️ ACT score below 15 is below average. Consider retaking the test.');
      } else if (actScore < 20) {
        setTestWarning('⚠️ ACT score below 20 may limit admission to selective colleges.');
      } else {
        setTestWarning('');
      }
    }
  }, [testType, satScore, actScore]);

  // Calculate Academic Score (0-100) with enhanced factors
  const calculateAcademicScore = (): number => {
    const numGpa = typeof gpa === 'number' ? gpa : 0;
    const numSat = typeof satScore === 'number' ? satScore : 0;
    const numAct = typeof actScore === 'number' ? actScore : 0;
    const numEc = typeof ecScore === 'number' ? ecScore : 0;
    const numApIb = typeof apIbCourses === 'number' ? apIbCourses : 0;

    // GPA contribution (25 points max - reduced to make room for rigor)
    let gpaScore = (numGpa / 4.0) * 25;

    // Course rigor multiplier (5 points max) - AP/IB courses boost
    const rigorBonus = Math.min(5, (numApIb / 10) * 5);
    gpaScore += rigorBonus;

    // Test score contribution (25 points max)
    let testScore = 0;
    if (testType === 'SAT' && numSat > 0) {
      testScore = (numSat / 1600) * 25;
    } else if (testType === 'ACT' && numAct > 0) {
      testScore = (numAct / 36) * 25;
    }

    // Extracurricular contribution (35 points max)
    const ecContribution = (numEc / 10) * 35;

    // Essay quality contribution (5 points max)
    const essayContribution = (essayQuality / 10) * 5;

    // Demographic factors bonus (up to 5 points)
    let demographicBonus = 0;
    if (isFirstGen) demographicBonus += 3;
    if (isLegacy) demographicBonus += 2;

    const baseScore = gpaScore + testScore + ecContribution + essayContribution;
    return Math.min(100, baseScore + demographicBonus);
  };

  const academicScore = calculateAcademicScore();

  // Determine admission chances category
  const getAdmissionCategory = (score: number) => {
    if (score >= 85) {
      return { label: 'Excellent', color: 'from-green-500 to-emerald-600', textColor: 'text-green-600', description: 'Strong candidate for highly selective colleges' };
    }
    if (score >= 70) {
      return { label: 'Good', color: 'from-blue-500 to-cyan-600', textColor: 'text-blue-600', description: 'Competitive for selective colleges' };
    }
    if (score >= 55) {
      return { label: 'Average', color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-600', description: 'Good fit for moderately selective colleges' };
    }
    if (score >= 40) {
      return { label: 'Fair', color: 'from-orange-500 to-red-500', textColor: 'text-orange-600', description: 'Consider less selective colleges' };
    }
    return { label: 'Developing', color: 'from-red-500 to-pink-500', textColor: 'text-red-600', description: 'Focus on improving academic profile' };
  };

  const category = getAdmissionCategory(academicScore);

  // College selectivity zones
  const getCollegeZones = (score: number) => {
    return {
      safety: Math.max(0, score - 15),
      match: score,
      reach: Math.min(100, score + 15)
    };
  };

  const zones = getCollegeZones(academicScore);

  useEffect(() => {
    document.title = 'College Admissions Calculator - Calculate Your Admission Chances';

    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', 'Free college admissions calculator to calculate admission chances based on GPA, SAT/ACT scores, and extracurriculars. Instant results for safety, match, and reach schools.');
    setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('author', 'ZuraWebTools');

    // Open Graph Tags
    setMeta('og:title', 'College Admissions Calculator - Calculate Your Chances');
    setMeta('og:description', 'Calculate your college admission chances with GPA, SAT/ACT, and extracurriculars. Free tool for students and counselors.');
    setMeta('og:image', 'https://zurawebtools.com/images/college-admissions-calculator-og.jpg');
    setMeta('og:url', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator');
    setMeta('og:type', 'website');
    setMeta('og:site_name', 'ZuraWebTools');

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'College Admissions Calculator - Calculate Admission Chances');
    setMeta('twitter:description', 'Free tool to calculate college admission chances based on GPA, SAT/ACT, and extracurricular activities.');
    setMeta('twitter:image', 'https://zurawebtools.com/images/college-admissions-calculator-twitter.jpg');
    setMeta('twitter:site', '@ZuraWebTools');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator');
      document.head.appendChild(canonical);
    }

    // Notify search engines
    notifyIndexNow('/education-and-exam-tools/admission-tools/college-admissions-calculator');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 print:hidden" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center text-sm text-gray-600 space-x-2">
          <li><button onClick={() => navigateTo('/')} className="hover:text-blue-600">Home</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li><button onClick={() => navigateTo('/education-and-exam-tools')} className="hover:text-blue-600">Education & Exam</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li><button onClick={() => navigateTo('/education-and-exam-tools/admission-tools')} className="hover:text-blue-600">Admission Tools</button></li>
          <li><span className="text-gray-400">/</span></li>
          <li className="text-gray-900 font-medium">College Admissions Calculator</li>
        </ol>
      </nav>

      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 font-sans print:p-0">
        {/* H1 + Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            College Admissions Calculator - Calculate Your Admission Chances
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Use our free college admissions calculator to calculate your college admission chances based on GPA, SAT/ACT scores, and extracurricular activities. Get instant insights into your academic strength and find the right colleges for your profile.
          </p>
        </div>

        {/* Main Calculator Tool */}
        <div id="top" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20" role="main" aria-label="College Admissions Calculator">
          <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">College Admissions Calculator - Interactive Tool</h2>
          
          {/* Academic Score Display */}
          <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white text-center mb-8 shadow-xl`}>
            <div className="text-6xl font-bold mb-2">{academicScore.toFixed(1)}/100</div>
            <div className="text-xl font-medium mb-1">Academic Score</div>
            <div className="text-sm opacity-90">{category.label} - {category.description}</div>
          </div>

          {/* Calculator Inputs */}
          <div className="space-y-6">
            {/* GPA Input */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">
                Unweighted GPA (0.0 - 4.0) *
              </label>
              <input
                type="number"
                min="0"
                max="4.0"
                step="0.01"
                value={gpa}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setGpa('');
                  } else {
                    const num = parseFloat(val);
                    if (!isNaN(num)) {
                      setGpa(Math.max(0, Math.min(4.0, num)));
                    }
                  }
                }}
                placeholder="e.g., 3.75"
                className="w-full p-3 border-2 border-indigo-200 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <p className="text-xs text-slate-600 mt-1">Enter your unweighted GPA on a 4.0 scale</p>
              {gpaWarning && (
                <div className="mt-2 p-2 bg-amber-50 border border-amber-300 rounded text-sm text-amber-800">
                  {gpaWarning}
                </div>
              )}
            </div>

            {/* AP/IB Course Rigor */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">
                AP/IB/Honors Courses Taken (Optional)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={apIbCourses}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setApIbCourses('');
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      setApIbCourses(Math.max(0, Math.min(30, num)));
                    }
                  }
                }}
                placeholder="e.g., 8"
                className="w-full p-3 border-2 border-indigo-200 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <p className="text-xs text-slate-600 mt-1">Total number of Advanced Placement, International Baccalaureate, or Honors courses</p>
            </div>

            {/* Test Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">
                Standardized Test Type
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setTestType('SAT')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    testType === 'SAT'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}
                >
                  SAT
                </button>
                <button
                  onClick={() => setTestType('ACT')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    testType === 'ACT'
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}
                >
                  ACT
                </button>
              </div>
            </div>

            {/* SAT/ACT Score Input */}
            {testType === 'SAT' ? (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  SAT Score (400 - 1600) *
                </label>
                <input
                  type="number"
                  min="400"
                  max="1600"
                  value={satScore}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setSatScore('');
                    } else {
                      const num = parseInt(val);
                      if (!isNaN(num)) {
                        setSatScore(Math.max(400, Math.min(1600, num)));
                      }
                    }
                  }}
                  placeholder="e.g., 1350"
                  className="w-full p-3 border-2 border-indigo-200 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <p className="text-xs text-slate-600 mt-1">Total SAT score (Evidence-Based Reading & Writing + Math)</p>
                {testWarning && testType === 'SAT' && (
                  <div className="mt-2 p-2 bg-amber-50 border border-amber-300 rounded text-sm text-amber-800">
                    {testWarning}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  ACT Composite Score (1 - 36) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  value={actScore}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setActScore('');
                    } else {
                      const num = parseInt(val);
                      if (!isNaN(num)) {
                        setActScore(Math.max(1, Math.min(36, num)));
                      }
                    }
                  }}
                  placeholder="e.g., 28"
                  className="w-full p-3 border-2 border-indigo-200 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <p className="text-xs text-slate-600 mt-1">Your ACT composite score</p>
                {testWarning && testType === 'ACT' && (
                  <div className="mt-2 p-2 bg-amber-50 border border-amber-300 rounded text-sm text-amber-800">
                    {testWarning}
                  </div>
                )}
              </div>
            )}

            {/* Extracurricular Score */}
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-900">
                Extracurricular Score (1 - 10) *
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={ecScore}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') {
                    setEcScore('');
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) {
                      setEcScore(Math.max(1, Math.min(10, num)));
                    }
                  }
                }}
                placeholder="e.g., 7"
                className="w-full p-3 border-2 border-indigo-200 rounded-lg bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <div className="mt-3 p-4 bg-indigo-50 rounded-lg text-sm text-slate-700">
                <p className="font-semibold mb-2">EC Score Guide:</p>
                <ul className="space-y-1">
                  <li>• <strong>1-3:</strong> Passive participation (inactive club member)</li>
                  <li>• <strong>4-6:</strong> Active involvement with minor roles (team member, volunteer)</li>
                  <li>• <strong>7-8:</strong> Leadership positions with achievements (club president, state awards)</li>
                  <li>• <strong>9-10:</strong> Elite level with national/international impact (founded organization, published research)</li>
                </ul>
              </div>
            </div>

            {/* Additional Factors Section */}
            <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Additional Factors (Optional)</h3>
              <div className="space-y-4">
                {/* Essay Quality Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-900">
                    Essay Quality Rating (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={essayQuality}
                    onChange={(e) => setEssayQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1">
                    <span>Poor (1)</span>
                    <span className="font-semibold text-purple-700">Rating: {essayQuality}/10</span>
                    <span>Excellent (10)</span>
                  </div>
                  <div className="mt-3 p-3 bg-white rounded-lg border border-purple-200 text-xs text-slate-700">
                    <p className="font-semibold mb-2">Essay Quality Guide:</p>
                    <ul className="space-y-1">
                      <li>• <strong>1-3:</strong> Generic topic, grammatical errors, lacks personal voice</li>
                      <li>• <strong>4-6:</strong> Clear writing, addresses prompt, some personal insight</li>
                      <li>• <strong>7-8:</strong> Compelling narrative, strong voice, meaningful reflection</li>
                      <li>• <strong>9-10:</strong> Exceptional storytelling, unique perspective, professionally edited</li>
                    </ul>
                    <p className="mt-2 text-amber-700"><strong>Tip:</strong> Ask teachers or counselors for objective feedback before rating.</p>
                  </div>
                </div>

                {/* Demographic Factors */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="firstGen"
                      checked={isFirstGen}
                      onChange={(e) => setIsFirstGen(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="firstGen" className="text-sm text-slate-700 cursor-pointer">
                      <strong>First-Generation College Student</strong> - Neither parent has a 4-year degree (+3 points)
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="legacy"
                      checked={isLegacy}
                      onChange={(e) => setIsLegacy(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="legacy" className="text-sm text-slate-700 cursor-pointer">
                      <strong>Legacy Status</strong> - Parent or sibling attended target college (+2 points)
                    </label>
                  </div>
                </div>

                <div className="mt-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200 text-xs text-slate-700 space-y-2">
                  <p className="font-semibold text-indigo-900">Why These Factors Matter:</p>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-indigo-800">First-Generation Status:</strong>
                      <p>Colleges value students who will be the first in their family to earn a 4-year degree. This demonstrates resilience, determination, and ability to overcome educational barriers. Many institutions have special programs and support systems for first-gen students.</p>
                    </div>
                    <div>
                      <strong className="text-indigo-800">Legacy Status:</strong>
                      <p>Having a parent or sibling who attended the college shows family connection and tradition. While less important than academics, it can provide a slight advantage during holistic review, especially at private institutions. Some colleges publicly disclose legacy admit rates.</p>
                    </div>
                  </div>
                  <p className="mt-2 pt-2 border-t border-indigo-200 text-amber-700">
                    <strong>Important:</strong> These are only two of many "soft factors" colleges consider. Geographic diversity, intended major, demonstrated interest, athletic recruitment, and socioeconomic background also play roles in holistic admissions.
                  </p>
                </div>
              </div>
            </div>

            {/* College Zones Visual */}
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Your College Admission Zones</h3>
              <div className="space-y-4">
                {/* Safety Zone */}
                <div className="flex items-center gap-3">
                  <div className="w-24 text-sm font-medium text-slate-700">Safety:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-500 h-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ width: `${zones.safety}%` }}
                    >
                      {zones.safety > 10 && `${zones.safety.toFixed(0)}%`}
                    </div>
                  </div>
                </div>

                {/* Match Zone */}
                <div className="flex items-center gap-3">
                  <div className="w-24 text-sm font-medium text-slate-700">Match:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ width: `${zones.match}%` }}
                    >
                      {zones.match > 10 && `${zones.match.toFixed(0)}%`}
                    </div>
                  </div>
                </div>

                {/* Reach Zone */}
                <div className="flex items-center gap-3">
                  <div className="w-24 text-sm font-medium text-slate-700">Reach:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-red-400 to-pink-400 h-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ width: `${zones.reach}%` }}
                    >
                      {zones.reach > 10 && `${zones.reach.toFixed(0)}%`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-600">
                <p><strong>Safety Schools:</strong> Colleges where your score exceeds typical requirements</p>
                <p><strong>Match Schools:</strong> Colleges that align well with your academic profile</p>
                <p><strong>Reach Schools:</strong> More competitive colleges that require stronger credentials</p>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-900">Detailed Score Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">GPA Base (25 max):</span>
                  <span className="font-semibold text-slate-900">{((typeof gpa === 'number' ? gpa : 0) / 4.0 * 25).toFixed(1)} points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Course Rigor Bonus (5 max):</span>
                  <span className="font-semibold text-slate-900">{Math.min(5, ((typeof apIbCourses === 'number' ? apIbCourses : 0) / 10) * 5).toFixed(1)} points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">{testType} Score (25 max):</span>
                  <span className="font-semibold text-slate-900">
                    {testType === 'SAT' 
                      ? ((typeof satScore === 'number' ? satScore : 0) / 1600 * 25).toFixed(1)
                      : ((typeof actScore === 'number' ? actScore : 0) / 36 * 25).toFixed(1)
                    } points
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Extracurriculars (35 max):</span>
                  <span className="font-semibold text-slate-900">{((typeof ecScore === 'number' ? ecScore : 0) / 10 * 35).toFixed(1)} points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Essay Quality (5 max):</span>
                  <span className="font-semibold text-slate-900">{(essayQuality / 10 * 5).toFixed(1)} points</span>
                </div>
                {(isFirstGen || isLegacy) && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Demographic Factors:</span>
                    <span className="font-semibold text-purple-600">+{(isFirstGen ? 3 : 0) + (isLegacy ? 2 : 0)} bonus</span>
                  </div>
                )}
                <div className="pt-3 border-t-2 border-blue-300 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total Academic Score:</span>
                  <span className={`text-2xl font-bold ${category.textColor}`}>{academicScore.toFixed(1)}/100</span>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="font-semibold text-yellow-900">Important Note:</p>
                  <p className="text-sm text-yellow-800 mt-1">
                    This calculator provides estimates based on academic metrics. Actual college admissions consider many factors including essays, recommendations, demonstrated interest, and holistic review. Use these results as a general guide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6 md:p-8 rounded-2xl shadow-lg border-2 border-indigo-300 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Quick Navigation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <a 
              href="#social-share" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">1</span>
              <span className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors text-sm md:text-base">Share This Tool</span>
            </a>

            <a 
              href="#quick-examples" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">2</span>
              <span className="text-slate-700 font-medium group-hover:text-purple-600 transition-colors text-sm md:text-base">Quick Examples</span>
            </a>

            <a 
              href="#benefits" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">3</span>
              <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors text-sm md:text-base">Benefits & Features</span>
            </a>

            <a 
              href="#how-to-use" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:bg-pink-600 group-hover:text-white transition-colors">4</span>
              <span className="text-slate-700 font-medium group-hover:text-pink-600 transition-colors text-sm md:text-base">How to Use</span>
            </a>

            <a 
              href="#use-cases" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">5</span>
              <span className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors text-sm md:text-base">Use Cases</span>
            </a>

            <a 
              href="#about" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">6</span>
              <span className="text-slate-700 font-medium group-hover:text-purple-600 transition-colors text-sm md:text-base">About Calculator</span>
            </a>

            <a 
              href="#external-resources" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">7</span>
              <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors text-sm md:text-base">External Resources</span>
            </a>

            <a 
              href="#faqs" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-pink-200 hover:border-pink-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 font-bold text-sm group-hover:bg-pink-600 group-hover:text-white transition-colors">8</span>
              <span className="text-slate-700 font-medium group-hover:text-pink-600 transition-colors text-sm md:text-base">FAQs</span>
            </a>

            <a 
              href="#related-tools" 
              className="flex items-center gap-3 p-3 md:p-4 bg-white rounded-xl border border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              <span className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">9</span>
              <span className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors text-sm md:text-base">Related Tools</span>
            </a>

            <a 
              href="#top" 
              className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all group"
            >
              <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:bg-white/30 transition-colors">↑</span>
              <span className="font-medium text-sm md:text-base">Back to Calculator</span>
            </a>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div id="social-share" className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Share This Tool</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Calculate%20your%20college%20admission%20chances%20with%20this%20free%20tool!&url=https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator&title=College%20Admissions%20Calculator`, '_blank')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText('https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator');
                alert('Link copied to clipboard!');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy Link
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div id="quick-examples" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Quick Examples - College Admission Profiles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900">Strong Candidate</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>GPA:</strong> 3.9/4.0</li>
                <li><strong>SAT:</strong> 1520/1600</li>
                <li><strong>EC Score:</strong> 8/10</li>
                <li><strong>Academic Score:</strong> 89.3/100</li>
                <li className="text-green-700 font-semibold pt-2">Competitive for Ivy League and top-tier universities</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900">Good Candidate</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>GPA:</strong> 3.5/4.0</li>
                <li><strong>ACT:</strong> 28/36</li>
                <li><strong>EC Score:</strong> 6/10</li>
                <li><strong>Academic Score:</strong> 73.5/100</li>
                <li className="text-blue-700 font-semibold pt-2">Excellent fit for state universities and selective colleges</li>
              </ul>
            </div>
            <div className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900">Average Candidate</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>GPA:</strong> 3.0/4.0</li>
                <li><strong>SAT:</strong> 1100/1600</li>
                <li><strong>EC Score:</strong> 4/10</li>
                <li><strong>Academic Score:</strong> 57.6/100</li>
                <li className="text-orange-700 font-semibold pt-2">Good match for regional and moderately selective colleges</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div id="benefits" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Benefits of Using Our College Admissions Calculator Tool</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Realistic Assessment</h3>
                <p className="text-slate-700">Our college admissions calculator provides an honest evaluation of your college admission chances based on key academic metrics and extracurricular involvement used by admissions committees.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Strategic College List</h3>
                <p className="text-slate-700">The college admissions calculator helps you identify safety, match, and reach schools that align with your academic profile, helping you build a balanced college application list.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Improvement Roadmap</h3>
                <p className="text-slate-700">Understand which areas need strengthening - whether it's GPA, test scores, or extracurricular activities - to enhance your admission prospects.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Time & Money Saver</h3>
                <p className="text-slate-700">Avoid wasting application fees on colleges where you're unlikely to gain admission, and focus your efforts on institutions that match your qualifications.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Guide */}
        <div id="how-to-use" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">How to Use the College Admissions Calculator</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Enter Your Unweighted GPA</h3>
                <p className="text-slate-700">Input your cumulative unweighted GPA on a 4.0 scale. This should reflect your grades without any weighted bonuses for honors or AP classes. If your school uses a different scale, convert it to 4.0 before entering.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Select Test Type and Enter Score</h3>
                <p className="text-slate-700">Choose between SAT or ACT, then enter your highest composite score. For SAT, enter the total score (400-1600). For ACT, enter your composite score (1-36). Use your best score if you've taken the test multiple times.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Rate Your Extracurricular Activities</h3>
                <p className="text-slate-700">Assess your extracurricular involvement on a 1-10 scale. Consider leadership positions, depth of commitment, awards received, and impact of your activities. Use the EC Score Guide provided to accurately evaluate your involvement level.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Review Your Academic Score</h3>
                <p className="text-slate-700">The calculator instantly computes your Academic Score (0-100) based on weighted contributions from GPA (30%), test scores (30%), and extracurriculars (40%). This score helps you understand your overall academic strength.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Analyze Your College Zones</h3>
                <p className="text-slate-700">View the visual breakdown of your Safety, Match, and Reach zones. Safety schools are those where you exceed typical requirements, Match schools align with your profile, and Reach schools are more competitive options.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                6
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">Build Your College List</h3>
                <p className="text-slate-700">Use your results to create a balanced college list with 2-3 safety schools, 3-5 match schools, and 2-3 reach schools. Research specific colleges within each category that match your interests and goals.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div id="use-cases" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Use Cases - Who Benefits from This Calculator?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900">High School Students</h3>
              <p className="text-slate-700">Junior and senior year students planning college applications can use this college admissions calculator to evaluate their admission chances early, set realistic goals, and identify areas for improvement before application deadlines.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900">College Counselors</h3>
              <p className="text-slate-700">School counselors and independent advisors can use this college calculator tool to provide data-driven guidance to students, help them set realistic expectations, and build balanced college application lists using accurate admission predictions.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900">Parents and Guardians</h3>
              <p className="text-slate-700">Parents can understand their child's competitive position in the college admissions landscape and have informed discussions about college choices, application strategies, and academic preparation.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <h3 className="text-lg font-bold mb-3 text-slate-900">Transfer Students</h3>
              <p className="text-slate-700">Community college students planning to transfer to four-year institutions can assess their transfer admission chances and determine which schools align with their academic credentials.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl border-2 border-indigo-300 mb-8 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">About Our College Admissions Calculator</h2>
          </div>
          
          <div className="space-y-6">
            {/* Introduction Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">1</span>
                Comprehensive Free Tool for College Planning
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Our college admissions calculator is a comprehensive free tool designed to help students and families navigate the complex college application process by providing realistic assessments of college admission chances. In today's competitive higher education landscape, understanding where you stand academically is crucial for making informed decisions about college applications. This tool works seamlessly alongside our <button onClick={() => navigateTo('/education-and-exam-tools/test-score-tools/sat-score-calculator')} className="text-indigo-600 hover:text-indigo-800 underline font-medium">SAT Score Calculator</button> and <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools/berkeley-gpa-calculator')} className="text-indigo-600 hover:text-indigo-800 underline font-medium">GPA Calculator tools</button> for complete academic assessment.
              </p>
            </div>

            {/* Algorithm Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">2</span>
                Sophisticated Multi-Factor Algorithm
              </h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                This college calculator uses a sophisticated algorithm that evaluates multiple critical components of college applications: <strong>academic performance (GPA with course rigor)</strong>, <strong>standardized test scores (SAT or ACT)</strong>, <strong>extracurricular involvement</strong>, <strong>essay quality</strong>, and <strong>demographic factors</strong>. The enhanced formula considers AP/IB course rigor, first-generation status, and legacy connections to provide a more accurate assessment.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <p className="text-sm text-slate-700">
                  <strong className="text-purple-900">Score Components:</strong> GPA Base (25 pts) + Course Rigor (5 pts) + Test Scores (25 pts) + Extracurriculars (35 pts) + Essay Quality (5 pts) + Demographic Bonuses (up to 5 pts) = Academic Score 0-100
                </p>
              </div>
            </div>

            {/* Extracurricular Assessment Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-pink-200">
              <h3 className="text-xl font-semibold text-pink-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-sm">3</span>
                Holistic Extracurricular Assessment
              </h3>
              <p className="text-slate-700 leading-relaxed">
                The extracurricular score is particularly important as colleges increasingly value well-rounded students who demonstrate leadership, commitment, and impact beyond the classroom. Our detailed EC Score Guide helps students accurately assess their involvement level, from passive participation to elite achievements with national or international recognition. This nuanced evaluation ensures that students get credit for the depth and quality of their extracurricular engagement, which can be as important as your <button onClick={() => navigateTo('/education-and-exam-tools/gpa-tools')} className="text-pink-600 hover:text-pink-800 underline font-medium">GPA calculation</button>.
              </p>
            </div>

            {/* Visual Insights Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">4</span>
                Actionable Visual Insights
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Beyond generating a numerical score, our college admission calculator provides actionable insights through visual college zone representations. The <strong className="text-green-700">Safety</strong>, <strong className="text-yellow-700">Match</strong>, and <strong className="text-red-700">Reach</strong> zones help students build balanced application lists that maximize their chances of acceptance while still aiming for aspirational institutions. Using this admissions calculator strategically prevents students from either selling themselves short or wasting resources on unrealistic applications. Pair these insights with our <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools/ucas-points-calculator')} className="text-indigo-600 hover:text-indigo-800 underline font-medium">UCAS Points Calculator</button> for international applications.
              </p>
            </div>

            {/* Holistic Context Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl shadow-md border-2 border-amber-300">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Important: Holistic Admissions Context</h3>
                  <p className="text-slate-700 leading-relaxed">
                    It's important to understand that while this calculator provides valuable guidance based on academic metrics, actual college admissions decisions are holistic and consider many additional factors. Essays, recommendation letters, demonstrated interest, legacy status, geographic diversity, and institutional priorities all play significant roles in admissions outcomes. Therefore, use this tool as a starting point for building your college list and understanding your competitive position, not as a definitive predictor of admission decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Audience & Use Cases Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">5</span>
                Essential Resource for Data-Driven Planning
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Whether you're a high school sophomore beginning to explore college options, a junior finalizing your application strategy, or a counselor guiding multiple students, this college admissions calculator serves as an essential resource for data-driven college planning. By providing clear, immediate feedback on academic standing, our free calculator empowers students to make strategic decisions about where to apply, how to improve their profiles, and how to allocate their time and resources during the college application process. Explore our complete suite of <button onClick={() => navigateTo('/education-and-exam-tools/admission-tools')} className="text-purple-600 hover:text-purple-800 underline font-medium">admission tools</button> for comprehensive college preparation.
              </p>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div id="external-resources" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Helpful College Admissions Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.commonapp.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900">Common Application</div>
                <div className="text-sm text-slate-600">Official application platform for 900+ colleges</div>
              </div>
            </a>
            <a href="https://www.collegedata.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900">CollegeData</div>
                <div className="text-sm text-slate-600">Comprehensive college search and admissions data</div>
              </div>
            </a>
            <a href="https://bigfuture.collegeboard.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900">College Board BigFuture</div>
                <div className="text-sm text-slate-600">College planning and scholarship search tools</div>
              </div>
            </a>
            <a href="https://nces.ed.gov/collegenavigator/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900">College Navigator</div>
                <div className="text-sm text-slate-600">US Department of Education college database</div>
              </div>
            </a>
            <a href="https://www.nacac.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900">NACAC</div>
                <div className="text-sm text-slate-600">National Association for College Admission Counseling</div>
              </div>
            </a>
            <a href="https://www.fafsa.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <div>
                <div className="font-semibold text-slate-900">FAFSA</div>
                <div className="text-sm text-slate-600">Free Application for Federal Student Aid</div>
              </div>
            </a>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <div className="text-sm text-slate-600">Last Updated</div>
                <div className="font-semibold text-slate-900">November 22, 2025</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-sm text-slate-600">Status</div>
                <div className="font-semibold text-green-700">Verified & Accurate</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div id="faqs" className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-200 mb-8 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">How accurate is the College Admissions Calculator?</h3>
              <p className="text-slate-700">Our college admissions calculator provides estimates based on key academic metrics that colleges consider. However, actual admissions decisions involve holistic reviews including essays, recommendations, demonstrated interest, and institutional priorities. Use this admissions calculator as a guide for building your college list, not as a definitive prediction. Accuracy is highest when you honestly assess your extracurricular involvement.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">Should I use weighted or unweighted GPA?</h3>
              <p className="text-slate-700">Always enter your unweighted GPA on a 4.0 scale. While many schools offer weighted GPAs that account for honors and AP classes, colleges typically recalculate GPAs on an unweighted basis for fair comparison across different high schools. If your school uses a different scale (like 5.0 or 100-point), convert it to a 4.0 scale first.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">Can I use both SAT and ACT scores?</h3>
              <p className="text-slate-700">The calculator is designed to use one test type at a time. If you've taken both tests, use whichever score is stronger relative to the test's scale. Most colleges accept either test equally, and there are conversion charts available online to compare SAT and ACT scores if you're unsure which to report.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">How do I determine my extracurricular score?</h3>
              <p className="text-slate-700">Use the EC Score Guide provided in the calculator. Consider leadership roles, depth of commitment (years involved), recognition (awards, publications), and impact (community benefit, organizational growth). Be honest - a rating of 7-8 represents significant regional achievements and leadership, while 9-10 is reserved for truly exceptional national or international accomplishments.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">How does course rigor affect my admission chances?</h3>
              <p className="text-slate-700">Taking AP, IB, or Honors courses demonstrates academic challenge and college readiness. Our calculator adds up to 5 bonus points for course rigor, with maximum benefit at 10+ advanced courses. Colleges value students who challenge themselves with the most rigorous curriculum available at their school.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">What's the difference between Safety, Match, and Reach schools?</h3>
              <p className="text-slate-700">Safety schools are institutions where your academic credentials exceed the typical admitted student profile, giving you a high probability of acceptance. Match schools align closely with your qualifications, offering good admission chances. Reach schools are more selective institutions where your credentials may be below average for admitted students, making acceptance less likely but still possible.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">How many colleges should I apply to?</h3>
              <p className="text-slate-700">Most counselors recommend applying to 8-12 colleges: 2-3 safety schools, 4-6 match schools, and 2-3 reach schools. This balanced approach maximizes your chances of acceptance while ensuring you have options that fit your academic profile. Quality matters more than quantity - apply to schools you'd genuinely be happy attending.</p>
            </div>
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">Does this calculator work for international students?</h3>
              <p className="text-slate-700">Yes, the calculator works for international students applying to US colleges. However, international applicants face additional considerations including English proficiency tests (TOEFL/IELTS), financial documentation, visa requirements, and often more competitive admission standards. International students should also research each college's specific requirements and acceptance rates for international applicants.</p>
            </div>
            <div className="pb-6">
              <h3 className="text-lg font-semibold mb-3 text-slate-900">How should I rate my essay quality objectively?</h3>
              <p className="text-slate-700">To avoid over or underestimating your essay quality, seek objective feedback from teachers, school counselors, or college advisors who review many college essays. Compare your essay against successful examples from your target colleges (many publish admitted student essays). Consider whether your essay: tells a unique story, reveals your personality, demonstrates growth or insight, uses vivid specific details, and is grammatically flawless. Most students honestly rate themselves 5-7; ratings of 9-10 should be reserved for professionally edited, publication-quality essays with exceptional storytelling.</p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div id="related-tools" className="scroll-mt-20">
          <RelatedTools currentSlug="college-admissions-calculator" relatedSlugs={['sat-score-calculator', 'berkeley-gpa-calculator', 'isac-gpa-calculator']} navigateTo={navigateTo} />
        </div>
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "College Admissions Calculator",
          "description": "Calculate your college admission chances based on GPA, SAT/ACT scores, and extracurricular activities. Free tool for students and counselors.",
          "url": "https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "creator": {
            "@type": "Organization",
            "name": "ZuraWebTools"
          }
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
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
              "name": "Admission Tools",
              "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "College Admissions Calculator",
              "item": "https://zurawebtools.com/education-and-exam-tools/admission-tools/college-admissions-calculator"
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How accurate is the College Admissions Calculator?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The calculator provides estimates based on key academic metrics that colleges consider. However, actual admissions decisions involve holistic reviews including essays, recommendations, demonstrated interest, and institutional priorities. Use this as a guide for building your college list, not as a definitive prediction."
              }
            },
            {
              "@type": "Question",
              "name": "Should I use weighted or unweighted GPA?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Always enter your unweighted GPA on a 4.0 scale. While many schools offer weighted GPAs that account for honors and AP classes, colleges typically recalculate GPAs on an unweighted basis for fair comparison across different high schools."
              }
            },
            {
              "@type": "Question",
              "name": "How do I determine my extracurricular score?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use the EC Score Guide provided in the calculator. Consider leadership roles, depth of commitment (years involved), recognition (awards, publications), and impact (community benefit, organizational growth). Be honest in your assessment."
              }
            },
            {
              "@type": "Question",
              "name": "What's the difference between Safety, Match, and Reach schools?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Safety schools are institutions where your academic credentials exceed the typical admitted student profile. Match schools align closely with your qualifications. Reach schools are more selective institutions where your credentials may be below average for admitted students."
              }
            },
            {
              "@type": "Question",
              "name": "How many colleges should I apply to?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most counselors recommend applying to 8-12 colleges: 2-3 safety schools, 4-6 match schools, and 2-3 reach schools. This balanced approach maximizes your chances of acceptance while ensuring you have options that fit your academic profile."
              }
            },
            {
              "@type": "Question",
              "name": "Can I use both SAT and ACT scores?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The calculator is designed to use one test type at a time. If you've taken both tests, use whichever score is stronger relative to the test's scale. Most colleges accept either test equally."
              }
            },
            {
              "@type": "Question",
              "name": "Does this calculator work for international students?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, the calculator works for international students applying to US colleges. However, international applicants face additional considerations including English proficiency tests (TOEFL/IELTS), financial documentation, visa requirements, and often more competitive admission standards."
              }
            },
            {
              "@type": "Question",
              "name": "How should I rate my essay quality objectively?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To avoid over or underestimating your essay quality, seek objective feedback from teachers, school counselors, or college advisors. Compare your essay against successful examples from target colleges. Consider whether your essay tells a unique story, reveals personality, demonstrates growth, and is grammatically flawless. Most students rate themselves 5-7; ratings of 9-10 are reserved for exceptional, professionally edited essays."
              }
            }
          ]
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Use College Admissions Calculator",
          "description": "Step-by-step guide to calculating your college admission chances",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Enter Your Unweighted GPA",
              "text": "Input your cumulative unweighted GPA on a 4.0 scale. This should reflect your grades without any weighted bonuses for honors or AP classes."
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Select Test Type and Enter Score",
              "text": "Choose between SAT or ACT, then enter your highest composite score. For SAT, enter the total score (400-1600). For ACT, enter your composite score (1-36)."
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Rate Your Extracurricular Activities",
              "text": "Assess your extracurricular involvement on a 1-10 scale. Consider leadership positions, depth of commitment, awards received, and impact of your activities."
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Review Your Academic Score",
              "text": "The calculator instantly computes your Academic Score (0-100) based on weighted contributions from GPA (30%), test scores (30%), and extracurriculars (40%)."
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Analyze Your College Zones",
              "text": "View the visual breakdown of your Safety, Match, and Reach zones to understand which colleges align with your academic profile."
            },
            {
              "@type": "HowToStep",
              "position": 6,
              "name": "Build Your College List",
              "text": "Use your results to create a balanced college list with 2-3 safety schools, 3-5 match schools, and 2-3 reach schools."
            }
          ]
        })}
      </script>
    </div>
  );
};

export default CollegeAdmissionsCalculator;
