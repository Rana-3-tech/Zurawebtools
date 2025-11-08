// FIX: Implement the main App component to provide a valid module and application structure.
// This resolves the "not a module" errors in other files that import from App.tsx.
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PopularTools from './components/PopularTools';
import FeaturedTools from './components/FeaturedTools';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';
import { toolCategories, Category, Tool } from './data/tools';
import { posts, Post } from './data/posts';

// Lazy load page components
const ToolsPage = lazy(() => import('./components/ToolsPage'));
const CategoryPage = lazy(() => import('./components/CategoryPage'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const Contact = lazy(() => import('./components/Contact'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const SearchResultsPage = lazy(() => import('./components/SearchResultsPage'));
const AboutUs = lazy(() => import('./components/AboutUs'));

// Lazy load tool pages
const WordCounter = lazy(() => import('./components/tools/WordCounter'));
const RemoveExtraSpaces = lazy(() => import('./components/tools/RemoveExtraSpaces'));
const CaseConverter = lazy(() => import('./components/tools/CaseConverter'));
const LoremIpsumGenerator = lazy(() => import('./components/tools/LoremIpsumGenerator'));
const TimeDifferenceCalculator = lazy(() => import('./components/tools/TimeDifferenceCalculator'));
const PercentageChangeCalculator = lazy(() => import('./components/tools/PercentageChangeCalculator'));
const HexToRGBConverter = lazy(() => import('./components/tools/HexToRGBConverter'));
const AccessibleColorContrastChecker = lazy(() => import('./components/tools/AccessibleColorContrastChecker'));
const JSONFormatterValidator = lazy(() => import('./components/tools/JSONFormatterValidator'));
const ShadowCSSGenerator = lazy(() => import('./components/tools/ShadowCSSGenerator'));
const ColorHarmonyChecker = lazy(() => import('./components/tools/ColorHarmonyChecker'));
const FabricCostingTool = lazy(() => import('./components/tools/FabricCostingTool'));
const SnowDayCalculator = lazy(() => import('./components/tools/SnowDayCalculator'));
const ProRVLoanCalculator = lazy(() => import('./components/tools/ProRVLoanCalculator'));
const SATScoreCalculator = lazy(() => import('./components/tools/SATScoreCalculator'));

// This type will be used by other components
export type Page = string; // Represents a URL path, e.g., '/', '/tools', '/word-counter'

// Helper function for fuzzy searching
const fuzzyMatch = (pattern: string, text: string): boolean => {
    pattern = pattern.toLowerCase();
    text = text.toLowerCase();
    let patternIndex = 0;
    let textIndex = 0;

    while (patternIndex < pattern.length && textIndex < text.length) {
        if (pattern[patternIndex] === text[textIndex]) {
            patternIndex++;
        }
        textIndex++;
    }

    return patternIndex === pattern.length;
};

const allTools = toolCategories.flatMap(cat => cat.tools);

// Loading component for Suspense fallback
const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center min-h-[60vh] bg-slate-800">
        <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
            <p className="mt-4 text-gray-300 text-lg">Loading...</p>
        </div>
    </div>
);

const App: React.FC = () => {
    const [currentPath, setCurrentPath] = useState<Page>(window.location.pathname);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<{ tools: Tool[], categories: Category[], posts: Post[] }>({ tools: [], categories: [], posts: [] });

    const navigateTo = (path: Page) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    
    const handleSearch = (query: string) => {
        if (!query.trim()) {
            setSearchResults({ tools: [], categories: [], posts: [] });
            return;
        }

        const filteredCategories = toolCategories.filter(cat => 
            fuzzyMatch(query, cat.title) ||
            fuzzyMatch(query, cat.description)
        );

        const filteredTools = allTools.filter(tool =>
            fuzzyMatch(query, tool.title) ||
            fuzzyMatch(query, tool.description)
        );

        const filteredPosts = posts.filter(post =>
            fuzzyMatch(query, post.title) ||
            fuzzyMatch(query, post.excerpt)
        );
        
        setSearchQuery(query);
        setSearchResults({
            tools: filteredTools,
            categories: filteredCategories,
            posts: filteredPosts
        });
        navigateTo('/search');
    };
    
    const renderPage = () => {
        const path = currentPath === '/' ? 'home' : currentPath.substring(1);

        if (path === 'home') {
            return (
                <>
                    <Hero navigateTo={navigateTo} onSearch={handleSearch} />
                    <PopularTools navigateTo={navigateTo} />
                    <FeaturedTools navigateTo={navigateTo} />
                    <WhyChooseUs />
                    <Testimonials />
                    <Blog navigateTo={navigateTo} />
                </>
            );
        }

        // Wrap lazy-loaded components in Suspense
        return (
            <Suspense fallback={<LoadingSpinner />}>
                {path === 'tools' && <ToolsPage categories={toolCategories} navigateTo={navigateTo} />}
                {path === 'blog' && <BlogPage posts={posts} navigateTo={navigateTo} />}
                {path === 'contact' && <Contact />}
                {path === 'about' && <AboutUs />}
                {path === 'privacy' && <PrivacyPolicy />}
                {path === 'terms' && <TermsOfService />}
                {path === 'search' && <SearchResultsPage query={searchQuery} results={searchResults} navigateTo={navigateTo} />}
                
                {/* Tool pages */}
                {path === 'word-counter' && <WordCounter navigateTo={navigateTo} />}
                {path === 'remove-extra-spaces' && <RemoveExtraSpaces navigateTo={navigateTo} />}
                {path === 'case-converter' && <CaseConverter navigateTo={navigateTo} />}
                {path === 'lorem-ipsum-generator' && <LoremIpsumGenerator navigateTo={navigateTo} />}
                {path === 'time-difference-calculator' && <TimeDifferenceCalculator navigateTo={navigateTo} />}
                {path === 'percentage-change-calculator' && <PercentageChangeCalculator navigateTo={navigateTo} />}
                {path === 'hex-to-rgb-converter' && <HexToRGBConverter navigateTo={navigateTo} />}
                {path === 'accessible-color-contrast-checker' && <AccessibleColorContrastChecker navigateTo={navigateTo} />}
                {path === 'json-formatter' && <JSONFormatterValidator navigateTo={navigateTo} />}
                {path === 'shadow-css-generator' && <ShadowCSSGenerator navigateTo={navigateTo} />}
                {path === 'color-harmony-checker' && <ColorHarmonyChecker navigateTo={navigateTo} />}
                {path === 'fabric-costing-tool' && <FabricCostingTool navigateTo={navigateTo} />}
                {path === 'snow-day-calculator' && <SnowDayCalculator navigateTo={navigateTo} />}
                {path === 'pro-rv-loan-calculator' && <ProRVLoanCalculator navigateTo={navigateTo} />}
                {path === 'sat-score-calculator' && <SATScoreCalculator />}
                
                {/* Category pages */}
                {toolCategories.find(cat => cat.slug === path) && (
                    <CategoryPage category={toolCategories.find(cat => cat.slug === path)!} navigateTo={navigateTo} />
                )}
                
                {/* Blog post pages */}
                {posts.find(p => p.slug === path) && (
                    <BlogPostPage post={posts.find(p => p.slug === path)!} />
                )}
                
                {/* Fallback to home if no match */}
                {!['tools', 'blog', 'contact', 'about', 'privacy', 'terms', 'search', 
                    'word-counter', 'remove-extra-spaces', 'case-converter', 'lorem-ipsum-generator',
                    'time-difference-calculator', 'percentage-change-calculator', 'hex-to-rgb-converter',
                    'accessible-color-contrast-checker', 'json-formatter', 'shadow-css-generator',
                    'color-harmony-checker', 'fabric-costing-tool', 'snow-day-calculator',
                    'pro-rv-loan-calculator', 'sat-score-calculator'].includes(path) &&
                    !toolCategories.find(cat => cat.slug === path) &&
                    !posts.find(p => p.slug === path) && (
                    <>
                        <Hero navigateTo={navigateTo} onSearch={handleSearch} />
                        <PopularTools navigateTo={navigateTo} />
                        <FeaturedTools navigateTo={navigateTo} />
                        <WhyChooseUs />
                        <Testimonials />
                        <Blog navigateTo={navigateTo} />
                    </>
                )}
            </Suspense>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header navigateTo={navigateTo} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer navigateTo={navigateTo} />
        </div>
    );
};

export default App;