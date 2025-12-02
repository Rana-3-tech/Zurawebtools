import React from 'react';
import { Page } from '../App';

interface NotFoundPageProps {
  navigateTo: (page: Page) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigateTo }) => {
  React.useEffect(() => {
    document.title = '404 - Page Not Found | ZuraWebTools';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The page you are looking for does not exist. Browse our free education tools for GPA calculators, test score calculators, and college admissions requirements.');
    }
  }, []);

  const popularTools = [
    { name: 'SAT Score Calculator', path: '/education-and-exam-tools/sat-score-calculator' },
    { name: 'ACT Score Calculator', path: '/education-and-exam-tools/act-score-calculator' },
    { name: 'College GPA Calculator', path: '/education-and-exam-tools/college-gpa-calculator' },
    { name: 'LSAT Score Calculator', path: '/education-and-exam-tools/lsat-score-calculator' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigateTo('/')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => navigateTo('/tools')}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg border border-slate-600"
          >
            Browse All Tools
          </button>
        </div>

        {/* Popular Tools */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
          <h3 className="text-xl font-semibold mb-6 text-cyan-400">
            Try Our Popular Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularTools.map((tool) => (
              <button
                key={tool.path}
                onClick={() => navigateTo(tool.path)}
                className="p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all text-left group"
              >
                <span className="text-white group-hover:text-cyan-400 transition-colors">
                  {tool.name}
                </span>
                <span className="ml-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-gray-400 text-sm">
          If you believe this is an error, please{' '}
          <button
            onClick={() => navigateTo('/contact')}
            className="text-cyan-400 hover:text-cyan-300 underline"
          >
            contact us
          </button>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
