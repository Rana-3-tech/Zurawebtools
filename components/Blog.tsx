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
        <section className="py-20 bg-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">From Our Blog</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        Get the latest tips and tricks on SEO, content marketing, and more.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {recentPosts.map(post => (
                        <div key={post.slug} className="group bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-700 transition-all duration-300 hover:shadow-2xl hover:border-brand-blue">
                            <div className="overflow-hidden">
                                <img loading="lazy" src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white">{post.title}</h3>
                                <p className="mt-3 text-slate-400">{post.excerpt}</p>
                                <a
                                    href={`/${post.slug}`}
                                    onClick={(e) => { e.preventDefault(); navigateTo(`/${post.slug}`); }}
                                    className="mt-6 inline-block font-semibold text-brand-blue hover:text-brand-cyan transition-colors"
                                >
                                    Read More &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <a
                        href="/blog"
                        onClick={(e) => { e.preventDefault(); navigateTo('/blog'); }}
                        className="inline-block bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:opacity-90 transform hover:-translate-y-1 transition-all"
                    >
                        View All Posts
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Blog;