import React from 'react';

export interface TOCSection {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  hoverBorder: string;
  hoverText: string;
}

interface TableOfContentsProps {
  sections: TOCSection[];
  title?: string;
  description?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  sections, 
  title = "Quick Navigation",
  description = "Jump to any section below"
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-8 border border-gray-100">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            })}
            className={`group p-3 sm:p-4 bg-gradient-to-br ${section.gradientFrom} ${section.gradientTo} rounded-xl border-2 border-transparent hover:${section.hoverBorder} hover:shadow-md transition-all duration-200 text-left`}
          >
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{section.emoji}</div>
            <div className={`text-sm sm:text-base font-semibold text-gray-900 group-hover:${section.hoverText} transition-colors`}>
              {section.title}
            </div>
            <div className="text-xs text-gray-500 mt-1">{section.subtitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;
