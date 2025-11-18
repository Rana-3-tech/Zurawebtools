import React, { useState } from 'react';
import { Page } from '../App';

interface HeroProps {
    navigateTo: (page: Page) => void;
    onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo, onSearch }) => {
    const [query, setQuery] = useState('');
    const heroTitle = "Free AI-Powered Web Tools";

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };
    
    return (
        <section className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-brand-blue/10 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight" style={{background: 'linear-gradient(to right, #007BFF, #00C6FF)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent'}}>
                    {heroTitle}
                </h1>
                <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto">
                    Boost your productivity and online presence with our collection of smart, free-to-use tools for SEO, content creation, and more.
                </p>
                <div className="mt-10 max-w-2xl mx-auto">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for a tool (e.g., 'Word Counter')"
                            className="w-full px-6 py-4 text-lg text-slate-200 bg-slate-800/80 border-2 border-slate-700 rounded-full shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all duration-300"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity transform hover:scale-105 duration-300">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero;