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
            className="group relative block rounded-xl p-0.5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl h-full text-left"
        >
            <div className="bg-white group-hover:bg-slate-50 p-6 rounded-lg h-full transition-colors duration-300">
                {icon && (
                    <div className="mb-4">
                        {icon}
                    </div>
                )}
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </a>
    );
};

export default ToolCard;