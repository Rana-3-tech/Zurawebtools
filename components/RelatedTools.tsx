import React from 'react';
import { Page } from '../App';
import { toolCategories } from '../data/tools';

interface RelatedToolsProps {
    relatedSlugs: string[];
    navigateTo: (page: Page) => void;
    currentSlug: string;
}

const allTools = toolCategories.flatMap(cat => {
    const categoryTools = cat.tools || [];
    const subCategoryTools = cat.subCategories?.flatMap(sub => sub.tools || []) || [];
    return [...categoryTools, ...subCategoryTools];
});

const RelatedTools: React.FC<RelatedToolsProps> = ({ relatedSlugs, navigateTo, currentSlug }) => {
    const relatedTools = allTools.filter(tool => {
        const toolSlug = tool.link.split('/').pop() || '';
        return relatedSlugs.includes(toolSlug) && toolSlug !== currentSlug;
    }).slice(0, 3);
    
    if (relatedTools.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools.map(tool => (
                    <a 
                        key={tool.link}
                        href={`/${tool.link}`}
                        onClick={(e) => { e.preventDefault(); navigateTo(`/${tool.link}`); }}
                        className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 text-left h-full flex flex-col items-start group"
                    >
                        <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                        <div className="mt-4 flex-grow">
                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{tool.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{tool.description.split('.')[0] + '.'}</p>
                        </div>
                        <div className="mt-4 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                            Use Tool 
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default RelatedTools;