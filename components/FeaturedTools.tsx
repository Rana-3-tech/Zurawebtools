import React from 'react';
import { Page } from '../App';
import { toolCategories } from '../data/tools';
import ToolCard from './ToolCard';

interface FeaturedToolsProps {
    navigateTo: (page: Page) => void;
}

// Get first tool from first two categories as featured
const featuredTools = [
    ...toolCategories[0].tools.slice(0, 2),
    ...toolCategories[1].tools.slice(0, 1)
];

const FeaturedTools: React.FC<FeaturedToolsProps> = ({ navigateTo }) => {
    return (
        <section className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">Featured Tools</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        Get started with some of our most popular AI-powered tools.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredTools.map(tool => (
                        <ToolCard key={tool.title} {...tool} navigateTo={navigateTo} />
                    ))}
                </div>
                <div className="text-center mt-12">
                     <a
                        href="/tools"
                        onClick={(e) => { e.preventDefault(); navigateTo('/tools'); }}
                        className="inline-block bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transform hover:-translate-y-1 transition-all"
                    >
                        View All Tools
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedTools;