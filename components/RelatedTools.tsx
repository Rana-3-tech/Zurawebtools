import React from 'react';
import { Page } from '../App';
import { toolCategories } from '../data/tools';

interface RelatedToolsProps {
    relatedSlugs: string[];
    navigateTo: (page: Page) => void;
    currentSlug: string;
}

const allTools = toolCategories.flatMap(cat => cat.tools);

const RelatedTools: React.FC<RelatedToolsProps> = ({ relatedSlugs, navigateTo, currentSlug }) => {
    const relatedTools = allTools.filter(tool => relatedSlugs.includes(tool.link) && tool.link !== currentSlug).slice(0, 3);
    
    if (relatedTools.length === 0) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools.map(tool => (
                    <a 
                        key={tool.link}
                        href={`/${tool.link}`}
                        onClick={(e) => { e.preventDefault(); navigateTo(`/${tool.link}`); }}
                        className="bg-slate-900/40 p-6 rounded-xl border border-slate-700 hover:bg-slate-700/50 hover:border-cyan-400 transition-all duration-300 text-left h-full flex flex-col items-start"
                    >
                        <div className="flex-shrink-0">{tool.icon}</div>
                        <div className="mt-4 flex-grow">
                            <h3 className="font-bold text-white">{tool.title}</h3>
                            <p className="text-sm text-slate-400 mt-2">{tool.description.split('.')[0] + '.'}</p>
                        </div>
                        <div className="mt-4 text-sm font-semibold text-cyan-400">
                            Use Tool &rarr;
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default RelatedTools;