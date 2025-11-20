import { useMemo } from 'react';
import { APUSH_SCORE_CONVERSION, APUSH_SECTION_WEIGHTS, APUSH_SCORE_DISTRIBUTION } from '../../constants';

export interface APUSHCalculationResult {
    composite: number;
    apScore: number;
    percentile: number;
    distribution: typeof APUSH_SCORE_DISTRIBUTION[number];
    mcqScore: number;
    saqScore: number;
    dbqScore: number;
    leqScore: number;
    mcqPoints: number;
    saqPoints: number;
    dbqPoints: number;
    leqPoints: number;
}

export interface APUSHScoreInputs {
    mcqScore: number;
    saqScore: number;
    dbqScore: number;
    leqScore: number;
}

/**
 * Custom hook for APUSH score calculation
 * Calculates composite score and converts to AP score (1-5)
 */
export const useAPUSHCalculator = ({ mcqScore, saqScore, dbqScore, leqScore }: APUSHScoreInputs): APUSHCalculationResult => {
    return useMemo(() => {
        // Calculate weighted points for each section
        const mcqPoints = mcqScore * APUSH_SECTION_WEIGHTS.mcq;
        const saqPoints = saqScore * APUSH_SECTION_WEIGHTS.saq;
        const dbqPoints = dbqScore * APUSH_SECTION_WEIGHTS.dbq;
        const leqPoints = leqScore * APUSH_SECTION_WEIGHTS.leq;

        // Calculate composite score
        const composite = mcqPoints + saqPoints + dbqPoints + leqPoints;

        // Find AP score based on composite
        const scoreData = APUSH_SCORE_CONVERSION.find(
            s => composite >= s.min && composite <= s.max
        ) || APUSH_SCORE_CONVERSION[0];

        const distribution = APUSH_SCORE_DISTRIBUTION[scoreData.score];

        return {
            composite: Math.round(composite * 10) / 10,
            apScore: scoreData.score,
            percentile: scoreData.percentile,
            distribution,
            mcqScore,
            saqScore,
            dbqScore,
            leqScore,
            mcqPoints: Math.round(mcqPoints * 10) / 10,
            saqPoints: Math.round(saqPoints * 10) / 10,
            dbqPoints: Math.round(dbqPoints * 10) / 10,
            leqPoints: Math.round(leqPoints * 10) / 10
        };
    }, [mcqScore, saqScore, dbqScore, leqScore]);
};
