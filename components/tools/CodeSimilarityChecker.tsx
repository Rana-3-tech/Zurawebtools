import React, { useState, useEffect } from 'react';

// Levenshtein distance calculation for similarity
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

// Calculate similarity percentage
function calculateSimilarity(code1: string, code2: string): number {
  if (!code1.trim() && !code2.trim()) return 100;
  if (!code1.trim() || !code2.trim()) return 0;

  const distance = levenshteinDistance(code1, code2);
  const maxLength = Math.max(code1.length, code2.length);
  const similarity = ((maxLength - distance) / maxLength) * 100;

  return Math.round(Math.max(0, Math.min(100, similarity)));
}

// Normalize code for better comparison (remove extra whitespace, comments, etc.)
function normalizeCode(code: string, language: string): string {
  let normalized = code.trim();

  // Remove comments based on language
  switch (language.toLowerCase()) {
    case 'javascript':
    case 'typescript':
    case 'java':
    case 'c':
    case 'cpp':
    case 'csharp':
    case 'php':
      // Remove single-line comments
      normalized = normalized.replace(/\/\/.*$/gm, '');
      // Remove multi-line comments
      normalized = normalized.replace(/\/\*[\s\S]*?\*\//g, '');
      break;
    case 'python':
      normalized = normalized.replace(/#.*$/gm, '');
      normalized = normalized.replace(/"""[\s\S]*?"""/g, '');
      normalized = normalized.replace(/'''[\s\S]*?'''/g, '');
      break;
    case 'html':
      normalized = normalized.replace(/<!--[\s\S]*?-->/g, '');
      break;
    case 'css':
      normalized = normalized.replace(/\/\*[\s\S]*?\*\//g, '');
      break;
  }

  // Normalize whitespace
  normalized = normalized.replace(/\s+/g, ' ');
  normalized = normalized.replace(/\n+/g, '\n');

  return normalized.trim();
}

const CodeSimilarityChecker: React.FC = () => {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [similarity, setSimilarity] = useState(0);
  const [normalize, setNormalize] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'php', label: 'PHP' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'text', label: 'Plain Text' }
  ];

  useEffect(() => {
    const codeToCompare1 = normalize ? normalizeCode(code1, language) : code1;
    const codeToCompare2 = normalize ? normalizeCode(code2, language) : code2;
    const similarityScore = calculateSimilarity(codeToCompare1, codeToCompare2);
    setSimilarity(similarityScore);
  }, [code1, code2, language, normalize]);

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return 'text-red-500';
    if (score >= 60) return 'text-orange-500';
    if (score >= 40) return 'text-yellow-500';
    if (score >= 20) return 'text-blue-500';
    return 'text-green-500';
  };

  const getSimilarityLabel = (score: number) => {
    if (score >= 80) return 'Very High Similarity';
    if (score >= 60) return 'High Similarity';
    if (score >= 40) return 'Moderate Similarity';
    if (score >= 20) return 'Low Similarity';
    return 'Very Low Similarity';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Code Similarity Checker</h1>
        <p className="text-gray-600">
          Compare two pieces of code to check for similarity and potential plagiarism.
          Supports multiple programming languages with optional code normalization.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="language" className="text-sm font-medium text-gray-700">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="normalize"
            checked={normalize}
            onChange={(e) => setNormalize(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="normalize" className="text-sm font-medium text-gray-700">
            Normalize Code (remove comments & extra whitespace)
          </label>
        </div>
      </div>

      {/* Similarity Result */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-800">Similarity Score:</span>
          <span className={`text-2xl font-bold ${getSimilarityColor(similarity)}`}>
            {similarity}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              similarity >= 80 ? 'bg-red-500' :
              similarity >= 60 ? 'bg-orange-500' :
              similarity >= 40 ? 'bg-yellow-500' :
              similarity >= 20 ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{ width: `${similarity}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{getSimilarityLabel(similarity)}</p>
      </div>

      {/* Code Input Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code 1 */}
        <div className="space-y-2">
          <label htmlFor="code1" className="block text-sm font-medium text-gray-700">
            Code 1
          </label>
          <textarea
            id="code1"
            value={code1}
            onChange={(e) => setCode1(e.target.value)}
            placeholder="Paste your first code snippet here..."
            className="w-full h-80 p-4 border border-gray-300 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
          <div className="text-xs text-gray-500">
            Characters: {code1.length} | Lines: {code1.split('\n').length}
          </div>
        </div>

        {/* Code 2 */}
        <div className="space-y-2">
          <label htmlFor="code2" className="block text-sm font-medium text-gray-700">
            Code 2
          </label>
          <textarea
            id="code2"
            value={code2}
            onChange={(e) => setCode2(e.target.value)}
            placeholder="Paste your second code snippet here..."
            className="w-full h-80 p-4 border border-gray-300 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
          <div className="text-xs text-gray-500">
            Characters: {code2.length} | Lines: {code2.split('\n').length}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Use</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Paste your code snippets in the two text areas above</li>
          <li>• Select the appropriate programming language for better normalization</li>
          <li>• Enable "Normalize Code" to ignore comments and formatting differences</li>
          <li>• The similarity score will update automatically as you type</li>
          <li>• Higher scores indicate more similar code (80%+ may indicate plagiarism)</li>
        </ul>
      </div>

      {/* Sample Data Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            setCode1(`function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum(5, 3));`);
            setCode2(`function addNumbers(x, y) {
  return x + y;
}

console.log(addNumbers(5, 3));`);
            setLanguage('javascript');
          }}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-md hover:from-blue-600 hover:to-cyan-600 transition-colors duration-200 font-medium"
        >
          Load Sample Code
        </button>
      </div>
    </div>
  );
};

export default CodeSimilarityChecker;