import React from 'react';
import { Page } from '../App';

interface FooterProps {
    navigateTo: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: Page) => {
        e.preventDefault();
        navigateTo(path);
    };

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-xl font-bold tracking-normal cursor-pointer" style={{fontFamily: 'Poppins, sans-serif'}}>
                            <span className="text-slate-900">Zura</span><span style={{color: '#007BFF'}}>WebTools</span>
                        </a>
                        <p className="mt-4 text-gray-600">
                            Free AI-powered tools to improve visibility, rankings, and engagement.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-gray-900">Quick Links</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="/" onClick={(e) => handleNavClick(e, '/')} className="text-gray-600 hover:text-brand-blue">Home</a></li>
                            <li><a href="/tools" onClick={(e) => handleNavClick(e, '/tools')} className="text-gray-600 hover:text-brand-blue">All Tools</a></li>
                            <li><a href="/blog" onClick={(e) => handleNavClick(e, '/blog')} className="text-gray-600 hover:text-brand-blue">Blog</a></li>
                            <li><a href="/about" onClick={(e) => handleNavClick(e, '/about')} className="text-gray-600 hover:text-brand-blue">About Us</a></li>
                            <li><a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="text-gray-600 hover:text-brand-blue">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg text-gray-900">Legal</h4>
                        <ul className="mt-4 space-y-2">
                            <li><a href="/privacy" onClick={(e) => handleNavClick(e, '/privacy')} className="text-gray-600 hover:text-brand-blue">Privacy Policy</a></li>
                            <li><a href="/terms" onClick={(e) => handleNavClick(e, '/terms')} className="text-gray-600 hover:text-brand-blue">Terms of Service</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-gray-900">Connect</h4>
                        <p className="mt-4 text-gray-600">
                           Follow us on social media for updates. (Links coming soon)
                        </p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ZuraWebTools. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;