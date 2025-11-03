// FIX: Implement the main App component to provide a valid module and application structure.
// This resolves the "not a module" errors in other files that import from App.tsx.
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PopularTools from './components/PopularTools';
import FeaturedTools from './components/FeaturedTools';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';
import ToolsPage from './components/ToolsPage';
import CategoryPage from './components/CategoryPage';
import BlogPostPage from './components/BlogPostPage';
import BlogPage from './components/BlogPage';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SearchResultsPage from './components/SearchResultsPage';
import AboutUs from './components/AboutUs';
import { toolCategories, Category, Tool } from './data/tools';
import { posts, Post } from './data/posts';


// Import tool pages
import WordCounter from './components/tools/WordCounter';
import RemoveExtraSpaces from './components/tools/RemoveExtraSpaces';
import CaseConverter from './components/tools/CaseConverter';
import LoremIpsumGenerator from './components/tools/LoremIpsumGenerator';
import TimeDifferenceCalculator from './components/tools/TimeDifferenceCalculator';
import PercentageChangeCalculator from './components/tools/PercentageChangeCalculator';
import HexToRGBConverter from './components/tools/HexToRGBConverter';
import AccessibleColorContrastChecker from './components/tools/AccessibleColorContrastChecker';
import JSONFormatterValidator from './components/tools/JSONFormatterValidator';
import ShadowCSSGenerator from './components/tools/ShadowCSSGenerator';
import ColorHarmonyChecker from './components/tools/ColorHarmonyChecker';
import FabricCostingTool from './components/tools/FabricCostingTool';
import SnowDayCalculator from './components/tools/SnowDayCalculator';
import ProRVLoanCalculator from './components/tools/ProRVLoanCalculator';

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

        if (path === 'tools') {
            return <ToolsPage categories={toolCategories} navigateTo={navigateTo} />;
        }
        
        if (path === 'blog') {
            return <BlogPage posts={posts} navigateTo={navigateTo} />;
        }

        if (path === 'contact') {
            return <Contact />;
        }
        
        if (path === 'about') {
            return <AboutUs />;
        }
        
        if (path === 'privacy') {
            return <PrivacyPolicy />;
        }
        
        if (path === 'terms') {
            return <TermsOfService />;
        }
        
        if (path === 'search') {
            return <SearchResultsPage query={searchQuery} results={searchResults} navigateTo={navigateTo} />;
        }

        // Check for individual tool pages
        if (path === 'word-counter') {
            return <WordCounter navigateTo={navigateTo} />;
        }
        if (path === 'remove-extra-spaces') {
            return <RemoveExtraSpaces navigateTo={navigateTo} />;
        }
        if (path === 'case-converter') {
            return <CaseConverter navigateTo={navigateTo} />;
        }
        if (path === 'lorem-ipsum-generator') {
            return <LoremIpsumGenerator navigateTo={navigateTo} />;
        }
        if (path === 'time-difference-calculator') {
            return <TimeDifferenceCalculator navigateTo={navigateTo} />;
        }
        if (path === 'percentage-change-calculator') {
            return <PercentageChangeCalculator navigateTo={navigateTo} />;
        }
        if (path === 'hex-to-rgb-converter') {
            return <HexToRGBConverter navigateTo={navigateTo} />;
        }
        if (path === 'accessible-color-contrast-checker') {
            return <AccessibleColorContrastChecker navigateTo={navigateTo} />;
        }
        if (path === 'json-formatter') {
            return <JSONFormatterValidator navigateTo={navigateTo} />;
        }
        if (path === 'shadow-css-generator') {
            return <ShadowCSSGenerator navigateTo={navigateTo} />;
        }
        if (path === 'color-harmony-checker') {
            return <ColorHarmonyChecker navigateTo={navigateTo} />;
        }
        if (path === 'fabric-costing-tool') {
            return <FabricCostingTool navigateTo={navigateTo} />;
        }
        if (path === 'snow-day-calculator') {
            return <SnowDayCalculator navigateTo={navigateTo} />;
        }
        if (path === 'pro-rv-loan-calculator') {
            return <ProRVLoanCalculator navigateTo={navigateTo} />;
        }
        
        const category = toolCategories.find(cat => cat.slug === path);
        if (category) {
            return <CategoryPage category={category} navigateTo={navigateTo} />;
        }
        
        const post = posts.find(p => p.slug === path);
        if (post) {
            return <BlogPostPage post={post} />;
        }

        // Fallback to home page if no route matches
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