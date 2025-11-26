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
import ToolsPage from './components/ToolsPage';
import CategoryPage from './components/CategoryPage';
import BlogPostPage from './components/BlogPostPage';
import BlogPage from './components/BlogPage';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SearchResultsPage from './components/SearchResultsPage';
import AboutUs from './components/AboutUs';
import LoadingSpinner from './components/LoadingSpinner';
import { toolCategories, Category, Tool } from './data/tools';
import { posts, Post } from './data/posts';
import NotFoundPage from './components/NotFoundPage';

// Lazy load tool pages for better performance - each tool loads only when needed
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
const SATScoreCalculator = lazy(() => import('./components/tools/SATScoreCalculator'));
const ACTScoreCalculator = lazy(() => import('./components/tools/ACTScoreCalculator'));
const IELTSBandScoreCalculator = lazy(() => import('./components/tools/IELTSBandScoreCalculator'));
const TOEFLScoreCalculator = lazy(() => import('./components/tools/TOEFLScoreCalculator'));
const LSATScoreCalculator = lazy(() => import('./components/tools/LSATScoreCalculator'));
const APUSHScoreCalculator = lazy(() => import('./components/tools/APUSHScoreCalculator'));
const MCATScoreCalculator = lazy(() => import('./components/tools/MCATScoreCalculator'));
const BerkeleyGPACalculator = lazy(() => import('./components/tools/BerkeleyGPACalculator'));
const UTAGPACalculator = lazy(() => import('./components/tools/UTAGPACalculator'));
const RutgersGPACalculator = lazy(() => import('./components/tools/RutgersGPACalculator'));
const UVAGPACalculator = lazy(() => import('./components/tools/UVAGPACalculator'));
const LSACGPA = lazy(() => import('./components/tools/LSACGPA'));
const FillDirtCalculator = lazy(() => import('./components/tools/FillDirtCalculator'));
const QuiltBackingCalculator = lazy(() => import('./components/tools/QuiltBackingCalculator'));
const PowerToMassRatioCalculator = lazy(() => import('./components/tools/PowerToMassRatioCalculator'));
const AudiobookSpeedCalculator = lazy(() => import('./components/tools/AudiobookSpeedCalculator'));
const ReverbCalculator = lazy(() => import('./components/tools/ReverbCalculator'));
const CodeSimilarityChecker = lazy(() => import('./components/tools/CodeSimilarityChecker'));
const CollegeGPACalculator = lazy(() => import('./components/tools/CollegeGPACalculator'));
const CSUGPACalculator = lazy(() => import('./components/tools/CSUGPACalculator'));
const GMATScoreCalculator = lazy(() => import('./components/tools/GMATScoreCalculator'));
const UCATScoreCalculator = lazy(() => import('./components/tools/UCATScoreCalculator'));
const PersonalStatementCharacterCounter = lazy(() => import('./components/tools/PersonalStatementCharacterCounter'));
const CommonAppEssayWordCounter = lazy(() => import('./components/tools/CommonAppEssayWordCounter'));
const UCASPointsCalculator = lazy(() => import('./components/tools/UCASPointsCalculator'));
const StudentVisaFeeCalculatorAustralia = lazy(() => import('./components/tools/StudentVisaFeeCalculatorAustralia'));
const CollegeAdmissionsCalculator = lazy(() => import('./components/tools/CollegeAdmissionsCalculator'));
const GREScoreCalculator = lazy(() => import('./components/tools/GREScoreCalculator'));
const ALevelScoreCalculator = lazy(() => import('./components/tools/ALevelScoreCalculator'));
const APCalculusScoreCalculator = lazy(() => import('./components/tools/APCalculusScoreCalculator'));

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

        // OLD URL REDIRECT LOGIC - Redirect old flat URLs to new category-based structure
        const oldToNewUrlMap: { [key: string]: string } = {
            'word-counter': '/text-and-writing-tools/word-counter',
            'remove-extra-spaces': '/text-and-writing-tools/remove-extra-spaces',
            'case-converter': '/text-and-writing-tools/case-converter',
            'lorem-ipsum-generator': '/text-and-writing-tools/lorem-ipsum-generator',
            'time-difference-calculator': '/math-and-calculation-tools/time-difference-calculator',
            'percentage-change-calculator': '/math-and-calculation-tools/percentage-change-calculator',
            'fabric-costing-tool': '/math-and-calculation-tools/fabric-costing-tool',
            'snow-day-calculator': '/math-and-calculation-tools/snow-day-calculator',
            'hex-to-rgb-converter': '/color-and-design-tools/hex-to-rgb-converter',
            'accessible-color-contrast-checker': '/color-and-design-tools/accessible-color-contrast-checker',
            'shadow-css-generator': '/color-and-design-tools/shadow-css-generator',
            'color-harmony-checker': '/color-and-design-tools/color-harmony-checker',
            'json-formatter': '/developer-tools/json-formatter',
            'code-similarity-checker': '/developer-tools/code-similarity-checker',
            'sat-score-calculator': '/education-and-exam-tools/sat-score-calculator',
            'act-score-calculator': '/education-and-exam-tools/test-score-tools/act-score-calculator',
            'berkeley-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator',
            'rutgers-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator',
            'uta-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/uta-gpa-calculator',
            'uva-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator',
            'lsac-gpa-calculator': '/education-and-exam-tools/gpa-tools/lsac-gpa-calculator',
            'college-gpa-calculator': '/education-and-exam-tools/gpa-tools/college-gpa-calculator',
            'csu-gpa-calculator': '/education-and-exam-tools/gpa-tools/csu-gpa-calculator',
            'fill-dirt-calculator': '/construction-and-engineering-tools/fill-dirt-calculator',
            'quilt-backing-calculator': '/construction-and-engineering-tools/quilt-backing-calculator',
            'power-to-mass-ratio-calculator': '/construction-and-engineering-tools/power-to-mass-ratio-calculator',
            'audiobook-speed-calculator': '/audio-and-media-tools/audiobook-speed-calculator',
            'reverb-calculator': '/audio-and-media-tools/reverb-calculator',
        };

        // Check if this is an old flat URL and redirect
        if (oldToNewUrlMap[path]) {
            console.log(`Redirecting from old URL: /${path} to new URL: ${oldToNewUrlMap[path]}`);
            navigateTo(oldToNewUrlMap[path]);
            return null; // Return null while redirecting
        }

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

        // Dynamic tool routing - supports both 2-level (category/tool) and 3-level (category/subcategory/tool) paths
        const toolComponentMap: { [key: string]: React.ComponentType<any> } = {
            'word-counter': WordCounter,
            'remove-extra-spaces': RemoveExtraSpaces,
            'case-converter': CaseConverter,
            'lorem-ipsum-generator': LoremIpsumGenerator,
            'time-difference-calculator': TimeDifferenceCalculator,
            'percentage-change-calculator': PercentageChangeCalculator,
            'fabric-costing-tool': FabricCostingTool,
            'snow-day-calculator': SnowDayCalculator,
            'hex-to-rgb-converter': HexToRGBConverter,
            'accessible-color-contrast-checker': AccessibleColorContrastChecker,
            'shadow-css-generator': ShadowCSSGenerator,
            'color-harmony-checker': ColorHarmonyChecker,
            'json-formatter': JSONFormatterValidator,
            'code-similarity-checker': CodeSimilarityChecker,
            'sat-score-calculator': SATScoreCalculator,
            'act-score-calculator': ACTScoreCalculator,
            'ielts-band-score-calculator': IELTSBandScoreCalculator,
            'toefl-score-calculator': TOEFLScoreCalculator,
            'lsat-score-calculator': LSATScoreCalculator,
            'apush-score-calculator': APUSHScoreCalculator,
            'mcat-score-calculator': MCATScoreCalculator,
            'berkeley-gpa-calculator': BerkeleyGPACalculator,
            'rutgers-gpa-calculator': RutgersGPACalculator,
            'uta-gpa-calculator': UTAGPACalculator,
            'uva-gpa-calculator': UVAGPACalculator,
            'lsac-gpa-calculator': LSACGPA,
            'college-gpa-calculator': CollegeGPACalculator,
            'csu-gpa-calculator': CSUGPACalculator,
            'fill-dirt-calculator': FillDirtCalculator,
            'quilt-backing-calculator': QuiltBackingCalculator,
            'power-to-mass-ratio-calculator': PowerToMassRatioCalculator,
            'audiobook-speed-calculator': AudiobookSpeedCalculator,
            'reverb-calculator': ReverbCalculator,
            'gmat-score-calculator': GMATScoreCalculator,
            'ucat-score-calculator': UCATScoreCalculator,
            'personal-statement-character-counter': PersonalStatementCharacterCounter,
            'common-app-essay-word-counter': CommonAppEssayWordCounter,
            'ucas-points-calculator': UCASPointsCalculator,
            'student-visa-fee-calculator-australia': StudentVisaFeeCalculatorAustralia,
            'college-admissions-calculator': CollegeAdmissionsCalculator,
            'gre-score-calculator': GREScoreCalculator,
            'a-level-score-calculator': ALevelScoreCalculator,
            'ap-calculus-score-calculator': APCalculusScoreCalculator,
        };

        // Extract tool slug from path (handles both 2-level and 3-level paths)
        const pathParts = path.split('/');
        const toolSlug = pathParts[pathParts.length - 1]; // Last segment is always the tool slug
        
        if (toolComponentMap[toolSlug]) {
            const ToolComponent = toolComponentMap[toolSlug];
            return (
                <Suspense fallback={<LoadingSpinner />}>
                    <ToolComponent navigateTo={navigateTo} />
                </Suspense>
            );
        }
        
        const category = toolCategories.find(cat => cat.slug === path);
        if (category) {
            return <CategoryPage category={category} navigateTo={navigateTo} />;
        }
        
        // Check for sub-category pages (e.g., /education-and-exam-tools/test-score-tools)
        const categoryPathParts = path.split('/');
        if (categoryPathParts.length === 2) {
            const parentCategory = toolCategories.find(cat => cat.slug === categoryPathParts[0]);
            if (parentCategory?.subCategories) {
                const subCategory = parentCategory.subCategories.find(sub => sub.slug === categoryPathParts[1]);
                if (subCategory) {
                    // Create a temporary category object for sub-category page
                    const subCategoryAsCategory: Category = {
                        slug: subCategory.slug,
                        title: subCategory.title,
                        description: `Explore ${subCategory.title} under ${parentCategory.title}`,
                        icon: parentCategory.icon,
                        tools: subCategory.tools
                    };
                    const fullPath = `${categoryPathParts[0]}/${categoryPathParts[1]}`;
                    return <CategoryPage category={subCategoryAsCategory} navigateTo={navigateTo} fullPath={fullPath} />;
                }
            }
        }
        
        const post = posts.find(p => p.slug === path);
        if (post) {
            return <BlogPostPage post={post} />;
        }

        // Show 404 page for unmatched routes (except root path)
        if (path !== '') {
            return <NotFoundPage navigateTo={navigateTo} />;
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