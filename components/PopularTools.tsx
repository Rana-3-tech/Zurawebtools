import React, { useState, useMemo } from 'react';
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

    const categoryColors: { [key: string]: { bg: string; text: string } } = {
        'text-and-writing-tools': { bg: 'bg-rose-100', text: 'text-rose-600' },
        'math-and-calculation-tools': { bg: 'bg-violet-100', text: 'text-violet-600' },
        'color-and-design-tools': { bg: 'bg-amber-100', text: 'text-amber-600' },
        'developer-tools': { bg: 'bg-sky-100', text: 'text-sky-600' },
    };
    
    const tabs = [
        { id: 'all', name: 'All Tools', icon: <GridIcon /> },
        { id: 'text-and-writing-tools', name: 'Text', icon: <TextIcon /> },
        { id: 'math-and-calculation-tools', name: 'Math', icon: <MathIcon /> },
        { id: 'color-and-design-tools', name: 'Color', icon: <ColorIcon /> },
        { id: 'developer-tools', name: 'Developer', icon: <DevIcon /> },
    ];
    
    const allTools: PopularTool[] = useMemo(() =>
        toolCategories.flatMap(category =>
            category.tools.map(tool => ({
                ...tool,
                categorySlug: category.slug,
                categoryTitle: category.title.replace(' Tools', ''),
            }))
        ), []);
        
    const popularToolLinks = [
        'word-counter', 'remove-extra-spaces', 'case-converter', 'lorem-ipsum-generator',
        'json-formatter', 'accessible-color-contrast-checker', 'hex-to-rgb-converter',
        'percentage-change-calculator', 'time-difference-calculator'
    ];

    const displayedTools = useMemo(() => {
        if (activeTab === 'all') {
            return allTools
                .filter(tool => popularToolLinks.includes(tool.link))
                .sort((a, b) => popularToolLinks.indexOf(a.link) - popularToolLinks.indexOf(b.link));
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
                                className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center justify-center transition-colors duration-300 ${activeTab === tab.id ? 'bg-brand-blue text-white shadow' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                   {displayedTools.slice(0, 12).map(tool => (
                        <ToolCardComponent key={tool.link} tool={tool} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularTools;