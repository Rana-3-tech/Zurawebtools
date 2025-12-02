import React from 'react';
import { Page } from '../App';
import { posts } from '../data/posts';

interface BlogProps {
    navigateTo: (page: Page) => void;
}

const Blog: React.FC<BlogProps> = ({ navigateTo }) => {
    // Show the two most recent posts
    const recentPosts = posts.slice(0, 2);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">From Our Blog</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Latest guides and tips for students on GPA calculations, test scores, and college admissions
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {recentPosts.map(post => (
                        <div key={post.slug} className="group bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1">
                            <div className="relative overflow-hidden">
                                <img loading="lazy" src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">Blog</span>
                                    {post.category && (
                                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">{post.category}</span>
                                    )}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Nov 2025
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        5 min read
                                    </span>
                                </div>
                                <a
                                    href={`/${post.slug}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo(`/${post.slug}`); }}
                                    className="block"
                                >
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer">{post.title}</h3>
                                </a>
                                <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
                                <a
                                    href={`/${post.slug}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo(`/${post.slug}`); }}
                                    className="inline-flex items-center gap-2 font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all group"
                                >
                                    Read More
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <a
                        href="/blog"
                        onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        View All Posts
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Blog;