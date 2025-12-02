import React, { useState, useMemo, useRef } from 'react';
import { Page } from '../App';
import { toolCategories, Tool } from '../data/tools';

interface PopularToolsProps {
    navigateTo: (page: Page) => void;
}

// Icons for Tabs
const GridIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const TextIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
const MathIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm3-6h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm3-6h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008ZM6 18V7.5a2.25 2.25 0 0 1 2.25-2.25h9.75a2.25 2.25 0 0 1 2.25 2.25V18" /></svg>;
const ColorIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.118A5.25 5.25 0 0 0 7.5 21a5.25 5.25 0 0 0 5.25-5.25c0-1.55-.832-2.94-2.122-3.878Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M11.399 16.27a3 3 0 0 0-5.78-1.128 2.25 2.25 0 0 1-2.475-2.118 5.25 5.25 0 0 0 9.255-2.133 5.25 5.25 0 0 0-5.25-5.25 5.25 5.25 0 0 0-5.25 5.25c0 1.55.832 2.94 2.122 3.878a3 3 0 0 0 5.78 1.128Z" /></svg>;
const DevIcon = () => <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

interface PopularTool extends Tool {
    categorySlug: string;
    categoryTitle: string;
}

const PopularTools: React.FC<PopularToolsProps> = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState('all');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const categoryColors: { [key: string]: { bg: string; text: string } } = {
        'education-and-exam-tools': { bg: 'bg-blue-100', text: 'text-blue-600' },
    };
    
    const tabs = [
        { id: 'all', name: 'All Tools', icon: <GridIcon /> },
        { id: 'education-and-exam-tools', name: 'Education', icon: <TextIcon /> },
    ];
    
    const allTools: PopularTool[] = useMemo(() => {
        const tools: PopularTool[] = [];
        
        toolCategories.forEach(category => {
            // Add main category tools
            category.tools.forEach(tool => {
                tools.push({
                    ...tool,
                    categorySlug: category.slug,
                    categoryTitle: category.title.replace(' Tools', '').replace(' & ', ' and '),
                });
            });
            
            // Add subcategory tools if they exist
            if (category.subCategories) {
                category.subCategories.forEach(subCategory => {
                    subCategory.tools.forEach(tool => {
                        tools.push({
                            ...tool,
                            categorySlug: category.slug,
                            categoryTitle: category.title.replace(' Tools', '').replace(' & ', ' and '),
                        });
                    });
                });
            }
        });
        
        return tools;
    }, []);
        
    const popularToolSlugs = [
        'sat-score-calculator', 'act-score-calculator', 'lsat-score-calculator',
        'college-gpa-calculator', 'uta-gpa-calculator', 'csu-gpa-calculator',
        'gmat-score-calculator', 'gre-score-calculator', 'ielts-band-score-calculator'
    ];

    const displayedTools = useMemo(() => {
        if (activeTab === 'all') {
            return allTools
                .filter(tool => {
                    // Extract the tool slug from the full path (last segment)
                    const toolSlug = tool.link.split('/').pop() || '';
                    return popularToolSlugs.includes(toolSlug);
                })
                .sort((a, b) => {
                    const slugA = a.link.split('/').pop() || '';
                    const slugB = b.link.split('/').pop() || '';
                    return popularToolSlugs.indexOf(slugA) - popularToolSlugs.indexOf(slugB);
                });
        }
        return allTools.filter(tool => tool.categorySlug === activeTab);
    }, [activeTab, allTools]);

    const ToolCardComponent: React.FC<{ tool: PopularTool }> = ({ tool }) => {
        const colors = categoryColors[tool.categorySlug] || { bg: 'bg-slate-100', text: 'text-slate-500' };
        
        return (
            <a
                href={`/${tool.link}`}
                onClick={(e) => { e.preventDefault(); navigateTo(`/${tool.link}`); }}
                className="bg-white rounded-xl p-5 text-left shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 h-full flex flex-col"
            >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                    {tool.icon}
                </div>
                <div className="flex-grow mt-4">
                    <h3 className="font-bold text-slate-800 leading-tight">{tool.title.replace('Online ', '').replace(' Tool', '').replace('from Text', '')}</h3>
                    <p className={`text-xs font-bold ${colors.text} mt-1`}>{tool.categoryTitle}</p>
                    <p className="text-sm text-slate-500 mt-2">{tool.description.split('.')[0] + '.'}</p>
                </div>
            </a>
        );
    };

    return (
        <section className="py-20" style={{background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)'}}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">Our Most Popular Tools</h2>
                    <p className="mt-3 text-lg text-slate-600">
                        We present the best of the best. All free, no catch
                    </p>
                </div>

                <div className="flex justify-center mb-10">
                    <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-slate-200 flex flex-wrap justify-center gap-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center justify-center transition-colors duration-300 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden lg:block"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Slider Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4 scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {displayedTools.map(tool => (
                            <div key={tool.link} className="flex-shrink-0 w-64">
                                <ToolCardComponent tool={tool} />
                            </div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden lg:block"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularTools;