// FIX: Implement the Header component to resolve the "Cannot find name" errors.
import React, { useState } from 'react';
import { Page } from '../App';
import { toolCategories } from '../data/tools';

interface HeaderProps {
    navigateTo: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
    const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
    const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
    const [expandedMobileCategorySlug, setExpandedMobileCategorySlug] = useState<string | null>(null);

    const ChevronDownIcon = () => (
        <svg aria-hidden="true" className="w-4 h-4 ml-1 text-gray-500 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    );

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: Page) => {
        e.preventDefault();
        navigateTo(path);
    };

    const handleMobileNavClick = (path: Page) => {
        navigateTo(path);
        setIsMenuOpen(false);
    };

    const handleMobileCatClick = (path: Page) => {
        navigateTo(path);
        setIsMenuOpen(false);
        setIsMobileToolsOpen(false);
    };
    
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-2xl font-bold tracking-normal cursor-pointer" style={{fontFamily: 'Poppins, sans-serif'}}>
                    <span className="text-slate-900">Zura</span><span style={{color: '#007BFF'}}>WebTools</span>
                </a>
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-gray-600 hover:text-brand-blue font-semibold transition-colors">
                        Home
                    </a>
                    
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsToolsDropdownOpen(true)}
                        onMouseLeave={() => {
                            setIsToolsDropdownOpen(false);
                            setHoveredCategorySlug(null);
                        }}
                    >
                        <a href="/education-and-exam-tools" onClick={(e) => handleNavClick(e, '/education-and-exam-tools')} className="text-gray-600 hover:text-brand-blue font-semibold transition-colors flex items-center">
                            Education & Exam <ChevronDownIcon />
                        </a>
                        {isToolsDropdownOpen && (
                            <div 
                                className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-lg shadow-xl pt-4 pb-2 z-50 border border-gray-100"
                                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                                onMouseLeave={() => {
                                    setIsToolsDropdownOpen(false);
                                    setHoveredCategorySlug(null);
                                }}
                            >
                                {toolCategories[0]?.subCategories?.map(subCat => (
                                    <div 
                                        key={subCat.slug}
                                        className="relative group"
                                        onMouseEnter={() => setHoveredCategorySlug(subCat.slug)}
                                        onMouseLeave={() => setHoveredCategorySlug(null)}
                                    >
                                        <a 
                                            href={`/education-and-exam-tools/${subCat.slug}`}
                                            onClick={(e) => { 
                                                e.preventDefault(); 
                                                navigateTo(`/education-and-exam-tools/${subCat.slug}`); 
                                                setIsToolsDropdownOpen(false);
                                                setHoveredCategorySlug(null);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-brand-blue transition-colors flex items-center justify-between"
                                        >
                                            <span>{subCat.title}</span>
                                            {subCat.subCategories && subCat.subCategories.length > 0 && (
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                </svg>
                                            )}
                                        </a>
                                        {/* Nested subcategories dropdown */}
                                        {subCat.subCategories && subCat.subCategories.length > 0 && hoveredCategorySlug === subCat.slug && (
                                            <div 
                                                className="absolute left-full top-0 ml-1 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                                                onMouseEnter={() => setHoveredCategorySlug(subCat.slug)}
                                                onMouseLeave={() => setHoveredCategorySlug(null)}
                                            >
                                                {subCat.subCategories.map(nestedSub => (
                                                    <a 
                                                        key={nestedSub.slug}
                                                        href={`/education-and-exam-tools/${subCat.slug}/${nestedSub.slug}`}
                                                        onClick={(e) => { 
                                                            e.preventDefault(); 
                                                            navigateTo(`/education-and-exam-tools/${subCat.slug}/${nestedSub.slug}`); 
                                                            setIsToolsDropdownOpen(false);
                                                            setHoveredCategorySlug(null);
                                                        }}
                                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors text-sm"
                                                    >
                                                        {nestedSub.title}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 my-2"></div>
                                <a 
                                    href="/education-and-exam-tools"
                                    onClick={(e) => { e.preventDefault(); navigateTo('/education-and-exam-tools'); setIsToolsDropdownOpen(false); }}
                                    className="block w-full text-left px-4 py-2 font-semibold text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                                >
                                    View All Tools →
                                </a>
                            </div>
                        )}
                    </div>

                    <a href="/blog" onClick={(e) => handleNavClick(e, '/blog')} className="text-gray-600 hover:text-brand-blue font-semibold transition-colors">
                        Blog
                    </a>
                    <a href="/about" onClick={(e) => handleNavClick(e, '/about')} className="text-gray-600 hover:text-brand-blue font-semibold transition-colors">
                        About Us
                    </a>
                    <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="text-gray-600 hover:text-brand-blue font-semibold transition-colors">
                        Contact
                    </a>
                </nav>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle mobile menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white py-4 border-t border-gray-200">
                     <a href="/" onClick={(e) => { e.preventDefault(); handleMobileNavClick('/'); }} className="block w-full text-left px-6 py-2 text-gray-600 hover:bg-gray-100">
                         Home
                     </a>

                     <div>
                        <button onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)} className="w-full text-left px-6 py-2 flex justify-between items-center text-gray-600 hover:bg-gray-100">
                           <span>Education & Exam</span>
                           <svg className={`w-5 h-5 transition-transform ${isMobileToolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {isMobileToolsOpen && (
                            <div className="pl-8 bg-gray-50">
                                {toolCategories[0]?.subCategories?.map(subCat => (
                                    <a 
                                        key={subCat.slug}
                                        href={`/education-and-exam-tools/${subCat.slug}`}
                                        onClick={(e) => { e.preventDefault(); handleMobileCatClick(`/education-and-exam-tools/${subCat.slug}`); }}
                                        className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-200"
                                    >
                                        {subCat.title}
                                    </a>
                                ))}
                                <a href="/education-and-exam-tools" onClick={(e) => { e.preventDefault(); handleMobileCatClick('/education-and-exam-tools'); }} className="block w-full text-left px-4 py-2 font-semibold text-gray-700 hover:bg-blue-50 hover:text-brand-blue">
                                    View All Tools →
                                </a>
                            </div>
                        )}
                     </div>

                     <a href="/blog" onClick={(e) => { e.preventDefault(); handleMobileNavClick('/blog'); }} className="block w-full text-left px-6 py-2 text-gray-600 hover:bg-gray-100">
                         Blog
                     </a>
                     <a href="/about" onClick={(e) => { e.preventDefault(); handleMobileNavClick('/about'); }} className="block w-full text-left px-6 py-2 text-gray-600 hover:bg-gray-100">
                         About Us
                     </a>
                     <a href="/contact" onClick={(e) => { e.preventDefault(); handleMobileNavClick('/contact'); }} className="block w-full text-left px-6 py-2 text-gray-600 hover:bg-gray-100">
                         Contact
                     </a>
                </div>
            )}
        </header>
    );
};

export default Header;