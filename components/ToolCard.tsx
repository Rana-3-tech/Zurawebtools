import React from 'react';
import { Page } from '../App';
import { Tool } from '../data/tools'; // Import from central data file

// Update props to include navigateTo function
interface ToolCardProps extends Tool {
    navigateTo: (page: Page) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, link, icon, gradientColors, navigateTo }) => {
    
    const isExternal = link.startsWith('http') || link.startsWith('//');
    const isPlaceholder = link === '#';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isExternal || isPlaceholder) {
            if (isPlaceholder) e.preventDefault();
            return;
        }
        e.preventDefault();
        // Link now contains full path (e.g., "category/tool" or "category/subcategory/tool")
        navigateTo(`/${link}`);
    };

    const defaultColors = { from: '#22d3ee', to: '#3b82f6' };
    const { from, to } = gradientColors || defaultColors;

    const cardStyle = {
        background: `linear-gradient(to bottom right, ${from}, ${to})`,
    };

    return (
        <a 
            href={isExternal || isPlaceholder ? link : `/${link}`}
            onClick={handleClick}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            style={cardStyle}
            className="group relative block rounded-2xl p-0.5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl aspect-square text-left overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            <div className="relative bg-white group-hover:bg-slate-50 p-4 rounded-2xl h-full transition-colors duration-300 flex flex-col">
                {icon && (
                    <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {icon}
                    </div>
                )}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 flex-shrink-0 leading-tight">{title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-snug flex-grow line-clamp-4">{description}</p>
                <div className="mt-2 flex items-center text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" style={{color: from}}>
                    Try it
                    <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </a>
    );
};

export default ToolCard;