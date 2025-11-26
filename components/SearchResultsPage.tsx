// FIX: Implement the SearchResultsPage component to resolve the "Cannot find name" errors.
import React from 'react';
// FIX: Import 'Tool' type from the central data file instead of from ToolCard.
import { Category, Tool } from '../data/tools';
import { Post } from '../data/posts';
import { Page } from '../App';
// FIX: Import only the default export from ToolCard.
import ToolCard from './ToolCard';

interface SearchResultsPageProps {
    query: string;
    results: {
        tools: Tool[];
        categories: Category[];
        posts: Post[];
    };
    navigateTo: (page: Page) => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query, results, navigateTo }) => {
    const { tools, categories, posts } = results;
    const totalResults = tools.length + categories.length + posts.length;

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Search Results for "{query}"
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Found {totalResults} result{totalResults !== 1 ? 's' : ''}.
                    </p>

                    {totalResults === 0 ? (
                        <div className="mt-12 text-center bg-white p-12 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-gray-700">No Results Found</h3>
                            <p className="mt-4 text-gray-500">
                                We couldn't find anything matching your search. Try a different keyword.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-12 space-y-12">
                            {categories.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tool Categories</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {categories.map(cat => (
                                            <a key={cat.slug} href={`/${cat.slug}`} onClick={(e) => { e.preventDefault(); navigateTo(`/${cat.slug}`); }} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left h-full flex flex-col">
                                                <div className="flex items-center mb-4">
                                                    <div className="p-3 bg-blue-100 rounded-full">{cat.icon}</div>
                                                    <h3 className="ml-4 text-xl font-bold text-gray-900">{cat.title}</h3>
                                                </div>
                                                <p className="text-gray-600 flex-grow">{cat.description}</p>
                                                <div className="mt-4 text-brand-blue font-semibold">View Category &rarr;</div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tools.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Tools</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {tools.map(tool => (
                                            <ToolCard key={tool.title} {...tool} navigateTo={navigateTo} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {posts.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Blog Posts</h2>
                                    <div className="space-y-6">
                                        {posts.map(post => (
                                            <a key={post.slug} href={`/${post.slug}`} onClick={(e) => { e.preventDefault(); navigateTo(`/${post.slug}`); }} className="w-full text-left bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center">
                                                <img loading="lazy" src={post.imageUrl} alt={post.title} className="w-32 h-20 object-cover rounded-md" />
                                                <div className="ml-6">
                                                    <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                                                    <p className="mt-1 text-gray-600">{post.excerpt}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SearchResultsPage;