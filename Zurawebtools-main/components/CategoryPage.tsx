import React, { useEffect } from 'react';
import { Category } from '../data/tools';
import ToolCard from './ToolCard';
import { Page } from '../App';

interface CategoryPageProps {
    category: Category;
    navigateTo: (page: Page) => void;
    fullPath?: string; // Optional full path for subcategories
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, navigateTo, fullPath }) => {
    const categoryUrl = fullPath ? `https://zurawebtools.com/${fullPath}` : `https://zurawebtools.com/${category.slug}`;

    useEffect(() => {
        // Set page title
        document.title = `${category.title} - Free Online Tools | ZuraWebTools`;

        // Set meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', category.description);
        }

        // Build breadcrumb items - handle subcategories
        const breadcrumbItems = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://zurawebtools.com"
            }
        ];

        // Check if this is a subcategory (fullPath contains /)
        if (fullPath && fullPath.includes('/')) {
            const pathParts = fullPath.split('/');
            // Add parent category
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": 2,
                "name": pathParts[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                "item": `https://zurawebtools.com/${pathParts[0]}`
            });
            // Add current subcategory
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": 3,
                "name": category.title,
                "item": categoryUrl
            });
        } else {
            // Regular category
            breadcrumbItems.push({
                "@type": "ListItem",
                "position": 2,
                "name": category.title,
                "item": categoryUrl
            });
        }

        // Add BreadcrumbList structured data (only if items exist)
        if (breadcrumbItems.length > 0) {
            const breadcrumbScript = document.createElement('script');
            breadcrumbScript.type = 'application/ld+json';
            breadcrumbScript.id = 'category-breadcrumb-schema';
            breadcrumbScript.text = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "@id": `${categoryUrl}#breadcrumb`,
                "itemListElement": breadcrumbItems
            });
            document.head.appendChild(breadcrumbScript);
        }

        // Add CollectionPage structured data
        const collectionScript = document.createElement('script');
        collectionScript.type = 'application/ld+json';
        collectionScript.id = 'category-collection-schema';
        collectionScript.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": category.title,
            "description": category.description,
            "url": categoryUrl
        });
        document.head.appendChild(collectionScript);

        // Cleanup on unmount
        return () => {
            const breadcrumb = document.getElementById('category-breadcrumb-schema');
            const collection = document.getElementById('category-collection-schema');
            if (breadcrumb) breadcrumb.remove();
            if (collection) collection.remove();
        };
    }, [category, categoryUrl]);

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

                {/* Show subcategories if they exist */}
                {category.subCategories && category.subCategories.length > 0 ? (
                    <div className="space-y-16">
                        {category.subCategories.map(subCategory => (
                            <div key={subCategory.slug}>
                                <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-brand-blue">
                                    {subCategory.title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                    {subCategory.tools.map(tool => (
                                        <ToolCard key={tool.title} {...tool} navigateTo={navigateTo} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : category.tools.length > 0 ? (
                    /* Show tools directly if no subcategories */
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
