import React from 'react';
import { Category } from '../data/tools';
import { Page } from '../App';
import ToolCard from './ToolCard';

interface ToolsPageProps {
    categories: Category[];
    navigateTo: (page: Page) => void;
}

const ToolsPage: React.FC<ToolsPageProps> = ({ categories, navigateTo }) => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900">All Tools</h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our full suite of AI-powered tools designed to supercharge your workflow.
                    </p>
                </div>
                <div className="space-y-16">
                    {categories.map(category => (
                        <div key={category.slug}>
                            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
                                 <div>
                                    <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                                    <p className="mt-2 text-lg text-gray-600">{category.description}</p>
                                 </div>
                                 <a 
                                    href={`/${category.slug}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo(`/${category.slug}`); }} 
                                    className="mt-4 md:mt-0 shrink-0 text-brand-blue font-semibold"
                                >
                                     View Category &rarr;
                                 </a>
                            </div>
                            {category.tools.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {category.tools.map(tool => (
                                        <ToolCard key={tool.title} {...tool} navigateTo={navigateTo} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                                    <p className="text-gray-500">More tools coming soon!</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsPage;