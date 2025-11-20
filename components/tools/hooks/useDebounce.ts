import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for debouncing input values
 * Helps improve performance by delaying updates until user stops typing
 */
export const useDebounce = <T,>(initialValue: T, delay: number = 300) => {
    const [value, setValue] = useState<T>(initialValue);
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateValue = useCallback((newValue: T) => {
        setValue(newValue);
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(newValue);
        }, delay);
    }, [delay]);

    // Cleanup timeout on unmount
    const cleanup = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    return { value, debouncedValue, updateValue, cleanup };
};
