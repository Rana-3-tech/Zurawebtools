/**
 * TypeScript interfaces and types for APUSH Score Calculator
 */

export interface APUSHScoreConversion {
    min: number;
    max: number;
    score: number;
    percentile: number;
}

export interface APUSHSectionWeights {
    mcq: number;
    saq: number;
    dbq: number;
    leq: number;
}

export interface APUSHSectionMax {
    mcq: number;
    saq: number;
    dbq: number;
    leq: number;
}

export interface APUSHScoreDistribution {
    percentage: number;
    description: string;
    collegeCredit: string;
}

export interface APUSHCollegeCreditTier {
    tier: string;
    institutions: string;
    score5: string;
    score4: string;
    score3: string;
    examples: string;
}

export interface APUSHRubricCriteria {
    level: number;
    description: string;
}

export interface APUSHRubric {
    maxPoints: number;
    criteria: APUSHRubricCriteria[];
}

export interface APUSHRubrics {
    saq: APUSHRubric;
    dbq: APUSHRubric;
    leq: APUSHRubric;
}

export interface ValidationResult {
    isValid: boolean;
    value: number;
    error?: string;
}

export interface InputError {
    mcq?: string;
    saq?: string;
    dbq?: string;
    leq?: string;
}

/**
 * Validates and clamps a numeric input value
 * @param input - The input value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param fieldName - Name of the field for error messages
 * @returns ValidationResult object
 */
export const validateScore = (
    input: string | number,
    min: number,
    max: number,
    fieldName: string
): ValidationResult => {
    // Handle empty input
    if (input === '' || input === null || input === undefined) {
        return { isValid: true, value: 0 };
    }

    // Convert to number
    const numValue = typeof input === 'string' ? parseFloat(input) : input;

    // Check for NaN
    if (isNaN(numValue)) {
        return {
            isValid: false,
            value: 0,
            error: `${fieldName} must be a valid number`
        };
    }

    // Check for negative values
    if (numValue < 0) {
        return {
            isValid: false,
            value: 0,
            error: `${fieldName} cannot be negative`
        };
    }

    // Clamp value between min and max
    const clampedValue = Math.min(max, Math.max(min, Math.floor(numValue)));

    // Check if clamping was necessary
    if (numValue > max) {
        return {
            isValid: false,
            value: clampedValue,
            error: `${fieldName} cannot exceed ${max}`
        };
    }

    return {
        isValid: true,
        value: clampedValue
    };
};

/**
 * Safely parses a numeric input with proper NaN handling
 * @param value - The input value to parse
 * @param defaultValue - Default value if parsing fails
 * @returns Parsed number or default value
 */
export const safeParseInt = (value: string | number, defaultValue: number = 0): number => {
    if (value === '' || value === null || value === undefined) {
        return defaultValue;
    }

    const parsed = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Validates if all APUSH score weights sum to correct percentages
 * @param weights - The section weights object
 * @param maxScores - The maximum scores object
 * @returns Object with validation result and percentage breakdown
 */
export const validateWeights = (
    weights: APUSHSectionWeights,
    maxScores: APUSHSectionMax
): {
    isValid: boolean;
    total: number;
    percentages: { [key: string]: number };
    errors: string[];
} => {
    const mcqPoints = weights.mcq * maxScores.mcq;
    const saqPoints = weights.saq * maxScores.saq;
    const dbqPoints = weights.dbq * maxScores.dbq;
    const leqPoints = weights.leq * maxScores.leq;
    
    const total = mcqPoints + saqPoints + dbqPoints + leqPoints;
    
    const percentages = {
        mcq: (mcqPoints / total) * 100,
        saq: (saqPoints / total) * 100,
        dbq: (dbqPoints / total) * 100,
        leq: (leqPoints / total) * 100
    };

    const errors: string[] = [];
    
    // Official College Board percentages
    const expectedPercentages = {
        mcq: 40,
        saq: 20,
        dbq: 25,
        leq: 15
    };

    // Allow 1% tolerance for rounding
    const tolerance = 1;
    
    Object.entries(expectedPercentages).forEach(([section, expected]) => {
        const actual = percentages[section as keyof typeof percentages];
        const diff = Math.abs(actual - expected);
        
        if (diff > tolerance) {
            errors.push(
                `${section.toUpperCase()} weight is ${actual.toFixed(2)}% but should be ${expected}%`
            );
        }
    });

    return {
        isValid: errors.length === 0,
        total,
        percentages,
        errors
    };
};
