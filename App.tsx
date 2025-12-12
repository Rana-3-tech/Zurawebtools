// FIX: Implement the main App component to provide a valid module and application structure.
// This resolves the "not a module" errors in other files that import from App.tsx.
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PopularTools from './components/PopularTools';
import HowItWorks from './components/HowItWorks';
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
const SATScoreCalculator = lazy(() => import('./components/tools/SATScoreCalculator'));
const ACTScoreCalculator = lazy(() => import('./components/tools/ACTScoreCalculator'));
const IELTSBandScoreCalculator = lazy(() => import('./components/tools/IELTSBandScoreCalculator'));
const TOEFLScoreCalculator = lazy(() => import('./components/tools/TOEFLScoreCalculator'));
const LSATScoreCalculator = lazy(() => import('./components/tools/LSATScoreCalculator'));
const APUSHScoreCalculator = lazy(() => import('./components/tools/APUSHScoreCalculator'));
const MCATScoreCalculator = lazy(() => import('./components/tools/MCATScoreCalculator'));
const BerkeleyGPACalculator = lazy(() => import('./components/tools/BerkeleyGPACalculator'));
const USCGPACalculator = lazy(() => import('./components/tools/USCGPACalculator'));
const UTAGPACalculator = lazy(() => import('./components/tools/UTAGPACalculator'));
const RutgersGPACalculator = lazy(() => import('./components/tools/RutgersGPACalculator'));
const UVAGPACalculator = lazy(() => import('./components/tools/UVAGPACalculator'));
const ASUGPACalculator = lazy(() => import('./components/tools/ASUGPACalculator'));
const LSACGPA = lazy(() => import('./components/tools/LSACGPA'));
const CollegeGPACalculator = lazy(() => import('./components/tools/CollegeGPACalculator'));
const CSUGPACalculator = lazy(() => import('./components/tools/CSUGPACalculator'));
const GMATScoreCalculator = lazy(() => import('./components/tools/GMATScoreCalculator'));
const UCATScoreCalculator = lazy(() => import('./components/tools/UCATScoreCalculator'));
const PersonalStatementCharacterCounter = lazy(() => import('./components/tools/PersonalStatementCharacterCounter'));
const CommonAppEssayWordCounter = lazy(() => import('./components/tools/CommonAppEssayWordCounter'));
const CoalitionAppWordCounter = lazy(() => import('./components/tools/CoalitionAppWordCounter'));
const CollegeApplicationFeeCalculator = lazy(() => import('./components/tools/CollegeApplicationFeeCalculator'));
const CollegeEssayLengthCalculator = lazy(() => import('./components/tools/CollegeEssayLengthCalculator'));
const CSSProfileCostCalculator = lazy(() => import('./components/tools/CSSProfileCostCalculator'));
const EarlyDecisionActionCalculator = lazy(() => import('./components/tools/EarlyDecisionActionCalculator'));
const WaitlistAcceptanceCalculator = lazy(() => import('./components/tools/WaitlistAcceptanceCalculator'));
const DemonstratedInterestCalculator = lazy(() => import('./components/tools/DemonstratedInterestCalculator'));
const UCASPointsCalculator = lazy(() => import('./components/tools/UCASPointsCalculator'));
const StudentVisaFeeCalculatorAustralia = lazy(() => import('./components/tools/StudentVisaFeeCalculatorAustralia'));
const CollegeAdmissionsCalculator = lazy(() => import('./components/tools/CollegeAdmissionsCalculator'));
const ClassRankCalculator = lazy(() => import('./components/tools/ClassRankCalculator'));
const GREScoreCalculator = lazy(() => import('./components/tools/GREScoreCalculator'));
const ALevelScoreCalculator = lazy(() => import('./components/tools/ALevelScoreCalculator'));
const APCalculusScoreCalculator = lazy(() => import('./components/tools/APCalculusScoreCalculator'));
const HighSchoolGPACalculator = lazy(() => import('./components/tools/HighSchoolGPACalculator'));
const SemesterGPACalculator = lazy(() => import('./components/tools/SemesterGPACalculator'));
const WeightedGPACalculator = lazy(() => import('./components/tools/WeightedGPACalculator'));
const UnweightedGPACalculator = lazy(() => import('./components/tools/UnweightedGPACalculator'));
const CumulativeGPACalculator = lazy(() => import('./components/tools/CumulativeGPACalculator'));
const LetterGradeGPACalculator = lazy(() => import('./components/tools/LetterGradeGPACalculator'));
const NursingSchoolGPACalculator = lazy(() => import('./components/tools/NursingSchoolGPACalculator'));
const MedicalSchoolGPACalculator = lazy(() => import('./components/tools/MedicalSchoolGPACalculator'));
const TransferGPACalculator = lazy(() => import('./components/tools/TransferGPACalculator'));
const GraduateSchoolGPACalculator = lazy(() => import('./components/tools/GraduateSchoolGPACalculator'));
const PharmacySchoolGPACalculator = lazy(() => import('./components/tools/PharmacySchoolGPACalculator'));
const PASchoolGPACalculator = lazy(() => import('./components/tools/PASchoolGPACalculator'));
const DentalSchoolGPACalculator = lazy(() => import('./components/tools/DentalSchoolGPACalculator'));
const VeterinarySchoolGPACalculator = lazy(() => import('./components/tools/VeterinarySchoolGPACalculator'));
const EngineeringGPACalculator = lazy(() => import('./components/tools/EngineeringGPACalculator'));
const GPARaiseCalculator = lazy(() => import('./components/tools/GPARaiseCalculator'));
const UCLAGPACalculator = lazy(() => import('./components/tools/UCLAGPACalculator'));
const NYUGPACalculator = lazy(() => import('./components/tools/NYUGPACalculator'));
const UMichGPACalculator = lazy(() => import('./components/tools/UMichGPACalculator'));
const UNCGPACalculator = lazy(() => import('./components/tools/UNCGPACalculator'));

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

        // OLD URL REDIRECT LOGIC - Redirect old flat URLs and /tools/ prefix to new category-based structure
        const oldToNewUrlMap: { [key: string]: string } = {
            // Math and Calculation Tools
            // Education - Test Score Tools
            'sat-score-calculator': '/education-and-exam-tools/test-score-tools/sat-score-calculator',
            'tools/sat-score-calculator': '/education-and-exam-tools/test-score-tools/sat-score-calculator',
            'act-score-calculator': '/education-and-exam-tools/test-score-tools/act-score-calculator',
            'tools/act-score-calculator': '/education-and-exam-tools/test-score-tools/act-score-calculator',
            'lsat-score-calculator': '/education-and-exam-tools/test-score-tools/lsat-score-calculator',
            'tools/lsat-score-calculator': '/education-and-exam-tools/test-score-tools/lsat-score-calculator',
            'mcat-score-calculator': '/education-and-exam-tools/test-score-tools/mcat-score-calculator',
            'tools/mcat-score-calculator': '/education-and-exam-tools/test-score-tools/mcat-score-calculator',
            'apush-score-calculator': '/education-and-exam-tools/test-score-tools/apush-score-calculator',
            'tools/apush-score-calculator': '/education-and-exam-tools/test-score-tools/apush-score-calculator',
            'gmat-score-calculator': '/education-and-exam-tools/test-score-tools/gmat-score-calculator',
            'tools/gmat-score-calculator': '/education-and-exam-tools/test-score-tools/gmat-score-calculator',
            'ucat-score-calculator': '/education-and-exam-tools/test-score-tools/ucat-score-calculator',
            'tools/ucat-score-calculator': '/education-and-exam-tools/test-score-tools/ucat-score-calculator',
            'gre-score-calculator': '/education-and-exam-tools/test-score-tools/gre-score-calculator',
            'tools/gre-score-calculator': '/education-and-exam-tools/test-score-tools/gre-score-calculator',
            'a-level-score-calculator': '/education-and-exam-tools/test-score-tools/a-level-score-calculator',
            'tools/a-level-score-calculator': '/education-and-exam-tools/test-score-tools/a-level-score-calculator',
            'ap-calculus-score-calculator': '/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator',
            'tools/ap-calculus-score-calculator': '/education-and-exam-tools/test-score-tools/ap-calculus-score-calculator',
            'ielts-band-score-calculator': '/education-and-exam-tools/test-score-tools/ielts-band-score-calculator',
            'tools/ielts-band-score-calculator': '/education-and-exam-tools/test-score-tools/ielts-band-score-calculator',
            'toefl-score-calculator': '/education-and-exam-tools/test-score-tools/toefl-score-calculator',
            'tools/toefl-score-calculator': '/education-and-exam-tools/test-score-tools/toefl-score-calculator',
            
            // Education - University GPA Tools
            'berkeley-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator',
            'tools/berkeley-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator',
            'rutgers-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator',
            'tools/rutgers-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator',
            'uta-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/uta-gpa-calculator',
            'tools/uta-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/uta-gpa-calculator',
            'uva-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator',
            'tools/uva-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/uva-gpa-calculator',
            'asu-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator',
            'tools/asu-gpa-calculator': '/education-and-exam-tools/university-gpa-tools/asu-gpa-calculator',
            
            // Education - GPA Tools
            'lsac-gpa-calculator': '/education-and-exam-tools/gpa-tools/lsac-gpa-calculator',
            'tools/lsac-gpa-calculator': '/education-and-exam-tools/gpa-tools/lsac-gpa-calculator',
            'college-gpa-calculator': '/education-and-exam-tools/gpa-tools/college-gpa-calculator',
            'tools/college-gpa-calculator': '/education-and-exam-tools/gpa-tools/college-gpa-calculator',
            'csu-gpa-calculator': '/education-and-exam-tools/gpa-tools/csu-gpa-calculator',
            'tools/csu-gpa-calculator': '/education-and-exam-tools/gpa-tools/csu-gpa-calculator',
            
            // Education - Admission Tools
            'personal-statement-character-counter': '/education-and-exam-tools/admission-tools/personal-statement-character-counter',
            'tools/personal-statement-character-counter': '/education-and-exam-tools/admission-tools/personal-statement-character-counter',
            'common-app-essay-word-counter': '/education-and-exam-tools/admission-tools/common-app-essay-word-counter',
            'tools/common-app-essay-word-counter': '/education-and-exam-tools/admission-tools/common-app-essay-word-counter',
            'coalition-app-word-counter': '/education-and-exam-tools/admission-tools/coalition-app-word-counter',
            'tools/coalition-app-word-counter': '/education-and-exam-tools/admission-tools/coalition-app-word-counter',
            'college-application-fee-calculator': '/education-and-exam-tools/admission-tools/college-application-fee-calculator',
            'tools/college-application-fee-calculator': '/education-and-exam-tools/admission-tools/college-application-fee-calculator',
            'ucas-points-calculator': '/education-and-exam-tools/admission-tools/ucas-points-calculator',
            'tools/ucas-points-calculator': '/education-and-exam-tools/admission-tools/ucas-points-calculator',
            'student-visa-fee-calculator-australia': '/education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia',
            'tools/student-visa-fee-calculator-australia': '/education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia',
            'college-admissions-calculator': '/education-and-exam-tools/admission-tools/college-admissions-calculator',
            'tools/college-admissions-calculator': '/education-and-exam-tools/admission-tools/college-admissions-calculator',
            'class-rank-calculator': '/education-and-exam-tools/admission-tools/class-rank-calculator',
            'tools/class-rank-calculator': '/education-and-exam-tools/admission-tools/class-rank-calculator',
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
                    <HowItWorks />
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
            'sat-score-calculator': SATScoreCalculator,
            'act-score-calculator': ACTScoreCalculator,
            'ielts-band-score-calculator': IELTSBandScoreCalculator,
            'toefl-score-calculator': TOEFLScoreCalculator,
            'lsat-score-calculator': LSATScoreCalculator,
            'apush-score-calculator': APUSHScoreCalculator,
            'mcat-score-calculator': MCATScoreCalculator,
            'berkeley-gpa-calculator': BerkeleyGPACalculator,
            'usc-gpa-calculator': USCGPACalculator,
            'nyu-gpa-calculator': NYUGPACalculator,
            'umich-gpa-calculator': UMichGPACalculator,
            'unc-gpa-calculator': UNCGPACalculator,
            'rutgers-gpa-calculator': RutgersGPACalculator,
            'uta-gpa-calculator': UTAGPACalculator,
            'asu-gpa-calculator': ASUGPACalculator,
            'uva-gpa-calculator': UVAGPACalculator,
            'lsac-gpa-calculator': LSACGPA,
            'college-gpa-calculator': CollegeGPACalculator,
            'csu-gpa-calculator': CSUGPACalculator,
            'high-school-gpa-calculator': HighSchoolGPACalculator,
            'semester-gpa-calculator': SemesterGPACalculator,
            'weighted-gpa-calculator': WeightedGPACalculator,
            'unweighted-gpa-calculator': UnweightedGPACalculator,
            'cumulative-gpa-calculator': CumulativeGPACalculator,
            'letter-grade-gpa-calculator': LetterGradeGPACalculator,
            'nursing-school-gpa-calculator': NursingSchoolGPACalculator,
            'medical-school-gpa-calculator': MedicalSchoolGPACalculator,
            'transfer-gpa-calculator': TransferGPACalculator,
            'graduate-school-gpa-calculator': GraduateSchoolGPACalculator,
            'pharmacy-school-gpa-calculator': PharmacySchoolGPACalculator,
            'pa-school-gpa-calculator': PASchoolGPACalculator,
            'dental-school-gpa-calculator': DentalSchoolGPACalculator,
            'veterinary-school-gpa-calculator': VeterinarySchoolGPACalculator,
            'engineering-gpa-calculator': EngineeringGPACalculator,
            'gpa-raise-calculator': GPARaiseCalculator,
            'ucla-gpa-calculator': UCLAGPACalculator,
            'gmat-score-calculator': GMATScoreCalculator,
            'ucat-score-calculator': UCATScoreCalculator,
            'personal-statement-character-counter': PersonalStatementCharacterCounter,
            'common-app-essay-word-counter': CommonAppEssayWordCounter,
            'coalition-app-word-counter': CoalitionAppWordCounter,
            'college-application-fee-calculator': CollegeApplicationFeeCalculator,
            'college-essay-length-calculator': CollegeEssayLengthCalculator,
            'css-profile-cost-calculator': CSSProfileCostCalculator,
            'early-decision-action-calculator': EarlyDecisionActionCalculator,
            'waitlist-acceptance-calculator': WaitlistAcceptanceCalculator,
            'demonstrated-interest-calculator': DemonstratedInterestCalculator,
            'ucas-points-calculator': UCASPointsCalculator,
            'student-visa-fee-calculator-australia': StudentVisaFeeCalculatorAustralia,
            'college-admissions-calculator': CollegeAdmissionsCalculator,
            'class-rank-calculator': ClassRankCalculator,
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
        
        // Check for blog posts (supports category/slug pattern)
        let post = posts.find(p => p.slug === path);
        if (!post && pathParts.length === 2) {
            // Try to find post with category/slug pattern
            post = posts.find(p => p.slug === `${pathParts[0]}/${pathParts[1]}`);
        }
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
                <HowItWorks />
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