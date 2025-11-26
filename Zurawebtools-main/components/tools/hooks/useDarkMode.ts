import { useState, useEffect } from 'react';

/**
 * Custom hook for dark mode management
 * Handles localStorage persistence and system preference detection
 */
export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return JSON.parse(saved);
        }
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

        // Cleanup function
        return () => {
            // No cleanup needed for classList operations
        };
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    return { isDarkMode, toggleDarkMode };
};
