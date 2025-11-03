import React from 'react';
import { Post } from '../data/posts';

interface BlogPostPageProps {
    post: Post;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">{post.title}</h1>
                    <div className="mt-6 text-center text-gray-500">
                        <span>By {post.author}</span> &bull; <span>{post.date}</span>
                    </div>
                    <img loading="lazy" src={post.imageUrl} alt={post.title} className="mt-12 w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                    <div className="mt-12 prose lg:prose-lg max-w-none prose-h3:text-gray-800">
                        {post.content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogPostPage;