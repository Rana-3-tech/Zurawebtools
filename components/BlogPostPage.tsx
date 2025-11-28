import React, { useEffect, useState } from 'react';
import { Post } from '../data/posts';

interface BlogPostPageProps {
    post: Post;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);

    useEffect(() => {
        // Load counts from localStorage
        const savedLikes = localStorage.getItem(`post-${post.slug}-likes`);
        const savedDislikes = localStorage.getItem(`post-${post.slug}-dislikes`);
        const userLiked = localStorage.getItem(`post-${post.slug}-user-liked`);
        const userDisliked = localStorage.getItem(`post-${post.slug}-user-disliked`);

        if (savedLikes) setLikeCount(parseInt(savedLikes));
        if (savedDislikes) setDislikeCount(parseInt(savedDislikes));
        if (userLiked === 'true') setLiked(true);
        if (userDisliked === 'true') setDisliked(true);
    }, [post.slug]);

    const handleLike = () => {
        if (liked) {
            // Unlike
            const newCount = Math.max(0, likeCount - 1);
            setLikeCount(newCount);
            setLiked(false);
            localStorage.setItem(`post-${post.slug}-likes`, newCount.toString());
            localStorage.setItem(`post-${post.slug}-user-liked`, 'false');
        } else {
            // Like
            const newCount = likeCount + 1;
            setLikeCount(newCount);
            setLiked(true);
            localStorage.setItem(`post-${post.slug}-likes`, newCount.toString());
            localStorage.setItem(`post-${post.slug}-user-liked`, 'true');

            // Remove dislike if present
            if (disliked) {
                const newDislikeCount = Math.max(0, dislikeCount - 1);
                setDislikeCount(newDislikeCount);
                setDisliked(false);
                localStorage.setItem(`post-${post.slug}-dislikes`, newDislikeCount.toString());
                localStorage.setItem(`post-${post.slug}-user-disliked`, 'false');
            }
        }
    };

    const handleDislike = () => {
        if (disliked) {
            // Remove dislike
            const newCount = Math.max(0, dislikeCount - 1);
            setDislikeCount(newCount);
            setDisliked(false);
            localStorage.setItem(`post-${post.slug}-dislikes`, newCount.toString());
            localStorage.setItem(`post-${post.slug}-user-disliked`, 'false');
        } else {
            // Dislike
            const newCount = dislikeCount + 1;
            setDislikeCount(newCount);
            setDisliked(true);
            localStorage.setItem(`post-${post.slug}-dislikes`, newCount.toString());
            localStorage.setItem(`post-${post.slug}-user-disliked`, 'true');

            // Remove like if present
            if (liked) {
                const newLikeCount = Math.max(0, likeCount - 1);
                setLikeCount(newLikeCount);
                setLiked(false);
                localStorage.setItem(`post-${post.slug}-likes`, newLikeCount.toString());
                localStorage.setItem(`post-${post.slug}-user-liked`, 'false');
            }
        }
    };
    useEffect(() => {
        // Set document title
        document.title = `${post.title} | ZuraWebTools`;

        // Meta description
        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', post.excerpt);
        document.head.appendChild(metaDescription);

        // Meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', 'how to calculate gpa, gpa calculation formula, weighted vs unweighted gpa, college gpa calculator, high school gpa, semester gpa, cumulative gpa, grade point average, gpa scale, credit hours calculation');
        document.head.appendChild(metaKeywords);

        // Open Graph tags
        const ogTags = [
            { property: 'og:title', content: post.title },
            { property: 'og:description', content: post.excerpt },
            { property: 'og:image', content: post.imageUrl },
            { property: 'og:url', content: `https://zurawebtools.com/${post.slug}` },
            { property: 'og:type', content: 'article' },
            { property: 'article:published_time', content: new Date(post.date).toISOString() },
            { property: 'article:author', content: post.author },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: post.title },
            { name: 'twitter:description', content: post.excerpt },
            { name: 'twitter:image', content: post.imageUrl },
        ];

        ogTags.forEach(tag => {
            const metaTag = document.createElement('meta');
            Object.entries(tag).forEach(([key, value]) => metaTag.setAttribute(key, value));
            document.head.appendChild(metaTag);
        });

        // Canonical URL
        const canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', `https://zurawebtools.com/${post.slug}`);
        document.head.appendChild(canonical);

        // JSON-LD Schema - Article
        const articleSchema = document.createElement('script');
        articleSchema.type = 'application/ld+json';
        articleSchema.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.imageUrl,
            "author": {
                "@type": "Person",
                "name": post.author
            },
            "publisher": {
                "@type": "Organization",
                "name": "ZuraWebTools",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://zurawebtools.com/logo.png"
                }
            },
            "datePublished": new Date(post.date).toISOString(),
            "dateModified": new Date(post.date).toISOString(),
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://zurawebtools.com/${post.slug}`
            }
        });
        document.head.appendChild(articleSchema);

        // JSON-LD Schema - BreadcrumbList
        const breadcrumbSchema = document.createElement('script');
        breadcrumbSchema.type = 'application/ld+json';
        breadcrumbSchema.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://zurawebtools.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://zurawebtools.com/blog"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": post.title,
                    "item": `https://zurawebtools.com/${post.slug}`
                }
            ]
        });
        document.head.appendChild(breadcrumbSchema);

        // JSON-LD Schema - FAQ (for GPA guide)
        const faqSchema = document.createElement('script');
        faqSchema.type = 'application/ld+json';
        faqSchema.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Can I calculate my GPA myself without a calculator?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! Follow the step-by-step formulas in this guide. However, using a free GPA calculator saves time and reduces calculation errors, especially with many courses or credit hours."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do pass/fail classes affect my GPA?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Typically no—pass/fail courses usually don't factor into GPA calculations. However, they do count toward credit hours earned. Check your school's specific policy, as some institutions handle this differently."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How can I raise my GPA?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Focus on earning higher grades in future courses, especially high-credit classes. Retaking failed courses (if allowed) and maintaining straight A's can gradually improve your cumulative GPA."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What's the difference between weighted and unweighted GPA?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Unweighted GPA uses a standard 4.0 scale where all A's equal 4.0. Weighted GPA adds bonus points (0.5 for Honors, 1.0 for AP/IB), allowing GPAs above 4.0. Most competitive colleges recalculate using their own system."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do colleges recalculate your GPA?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, many colleges recalculate GPAs using their own formulas. They may remove non-academic courses (PE, health), apply their own weighting system, or focus only on core academic subjects (math, English, science, social studies, foreign language)."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How is college GPA different from high school GPA?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "College GPAs use credit hours to weight each course's impact, while high school GPAs often treat all courses equally (unless weighted). A 4-credit college course affects your GPA more than a 1-credit course, even with the same grade."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What GPA do I need for scholarships?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Most merit-based scholarships require a minimum GPA of 3.0-3.5, with highly competitive scholarships expecting 3.7+. Requirements vary by scholarship program, so always check specific eligibility criteria."
                    }
                }
            ]
        });
        document.head.appendChild(faqSchema);

        // JSON-LD Schema - HowTo (for step-by-step guide)
        const howToSchema = document.createElement('script');
        howToSchema.type = 'application/ld+json';
        howToSchema.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Calculate Your GPA",
            "description": "Step-by-step guide to calculating weighted, unweighted, semester, and cumulative GPA with examples and formulas.",
            "image": post.imageUrl,
            "totalTime": "PT10M",
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Convert Letter Grades to Numbers",
                    "text": "Convert each of your letter grades to their corresponding numerical value using the 4.0 scale. For example: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0",
                    "position": 1
                },
                {
                    "@type": "HowToStep",
                    "name": "Add All Grade Points Together",
                    "text": "Sum up all the numerical values you assigned to each class. This gives you your total grade points.",
                    "position": 2
                },
                {
                    "@type": "HowToStep",
                    "name": "Divide by Number of Classes",
                    "text": "Take the total grade points and divide by the total number of classes you took. The result is your GPA on a 4.0 scale.",
                    "position": 3
                },
                {
                    "@type": "HowToStep",
                    "name": "For College GPA: Multiply by Credit Hours",
                    "text": "In college, multiply each grade point by the course's credit hours to get quality points. Add all quality points together and divide by total credit hours.",
                    "position": 4
                }
            ]
        });
        document.head.appendChild(howToSchema);

        // Cleanup function
        return () => {
            document.title = 'ZuraWebTools | Free AI Tools for SEO & Social Media Growth';
            metaDescription.remove();
            metaKeywords.remove();
            ogTags.forEach(() => {
                const metas = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
                metas.forEach(meta => meta.remove());
            });
            canonical.remove();
            articleSchema.remove();
            breadcrumbSchema.remove();
            faqSchema.remove();
            howToSchema.remove();
        };
    }, [post]);

    return (
        <section className="py-20 bg-white">
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg">
                Skip to main content
            </a>
            <div className="container mx-auto px-6">
                {/* Breadcrumb Navigation */}
                <nav className="mb-8 max-w-4xl mx-auto">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li><a href="/" className="hover:text-blue-600">Home</a></li>
                        <li><span className="mx-2">/</span></li>
                        <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
                        {post.slug.startsWith('education-guides/') && (
                            <>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-gray-600 hover:text-blue-600">Education Guides</li>
                            </>
                        )}
                        <li><span className="mx-2">/</span></li>
                        <li className="text-gray-900 font-semibold truncate">{post.title}</li>
                    </ol>
                </nav>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">{post.title}</h1>
                    <div className="mt-6 text-center text-gray-500">
                        <span>By {post.author}</span> &bull; <span>{post.date}</span>
                        {post.lastUpdated && post.lastUpdated !== post.date && (
                            <span> &bull; Updated: {post.lastUpdated}</span>
                        )}
                    </div>
                    <img loading="lazy" src={post.imageUrl} alt={post.title} className="mt-12 w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
                    
                    {/* Like/Dislike Buttons */}
                    <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                        <p className="text-center text-gray-700 font-medium mb-4">Was this guide helpful? Let us know!</p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                    liked
                                        ? 'bg-blue-600 text-white shadow-md scale-105'
                                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm'
                                }`}
                            >
                                <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                                <span>{likeCount > 0 ? likeCount : 'Helpful'}</span>
                            </button>
                            
                            <button
                                onClick={handleDislike}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                    disliked
                                        ? 'bg-red-600 text-white shadow-md scale-105'
                                        : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-sm'
                                }`}
                            >
                                <svg className="w-4 h-4" fill={disliked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                </svg>
                                <span>{dislikeCount > 0 ? dislikeCount : 'Not Helpful'}</span>
                            </button>
                        </div>
                    </div>

                    <div id="main-content" className="mt-12 prose lg:prose-lg max-w-none prose-h3:text-gray-800">
                        {post.content}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogPostPage;