import React from 'react';
import { Category } from '../data/tools';
import ToolCard from './ToolCard';
import { Page } from '../App';

interface CategoryPageProps {
    category: Category;
    navigateTo: (page: Page) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, navigateTo }) => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center w-20 h-20 mx-auto bg-blue-100 rounded-full mb-6">
                        {category.icon}
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900">{category.title}</h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        {category.description}
                    </p>
                </div>

                {category.tools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {category.tools.map(tool => (
                            <ToolCard key={tool.title} {...tool} navigateTo={navigateTo} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold text-gray-700">Coming Soon!</h3>
                        <p className="mt-4 text-gray-500">
                            We're working hard to bring you new tools in this category. Stay tuned!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoryPage;
