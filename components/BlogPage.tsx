import React from 'react';
import { Post } from '../data/posts';
import { Page } from '../App';

interface BlogPageProps {
    posts: Post[];
    navigateTo: (page: Page) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, navigateTo }) => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900">Our Blog</h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Insights, guides, and updates from the ZuraWebTools team.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.slug} className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1">
                            <div className="relative overflow-hidden">
                                <img loading="lazy" src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">Blog</span>
                                    {post.category && (
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">{post.category}</span>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <a
                                    href={`/${post.slug}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo(`/${post.slug}`); }}
                                    className="block"
                                >
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer">{post.title}</h3>
                                </a>
                                <p className="mt-3 text-slate-600 flex-grow">{post.excerpt}</p>
                                <div className="mt-6">
                                     <a
                                        href={`/${post.slug}`}
                                        onClick={(e) => { e.preventDefault(); navigateTo(`/${post.slug}`); }}
                                        className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-all group"
                                    >
                                        Read More
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPage;