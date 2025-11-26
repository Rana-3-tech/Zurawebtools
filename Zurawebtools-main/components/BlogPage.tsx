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
                        <div key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <img loading="lazy" src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-gray-900">{post.title}</h3>
                                <p className="mt-3 text-gray-600 flex-grow">{post.excerpt}</p>
                                <div className="mt-6">
                                     <a
                                        href={`/${post.slug}`}
                                        onClick={(e) => { e.preventDefault(); navigateTo(`/${post.slug}`); }}
                                        className="font-semibold text-brand-blue hover:text-blue-700"
                                    >
                                        Read More &rarr;
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