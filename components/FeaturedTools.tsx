import React from 'react';
import { Page } from '../App';
import { toolCategories } from '../data/tools';
import ToolCard from './ToolCard';

interface FeaturedToolsProps {
    navigateTo: (page: Page) => void;
}

// Get first 3 tools from Education & Exam Tools category as featured
const featuredTools = toolCategories[0]?.tools.slice(0, 3) || [];

const FeaturedTools: React.FC<FeaturedToolsProps> = ({ navigateTo }) => {
    return (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">Popular Education Tools</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Most used calculators by students and educators
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredTools.map(tool => (
                        <div key={tool.title} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative">
                                <ToolCard {...tool} navigateTo={navigateTo} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                     <a
                        href="/tools"
                        onClick={(e) => { e.preventDefault(); navigateTo('/tools'); }}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        View All Tools
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedTools;