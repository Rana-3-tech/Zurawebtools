// Type definitions for SAT Score Calculator

export interface ScoreState {
    readingWriting: number | null;
    mathNoCalc: number | null;
    mathCalc: number | null;
    mathCombined: number | null;
}

export interface ScaledScores {
    readingWriting: number;
    math: number;
    total: number;
}

export type TestMode = 'digital' | 'paper';
export type Difficulty = 'auto' | 'easy' | 'normal' | 'hard';
export type Preset = '1200' | '1400' | '1500';

export interface FAQItem {
    question: string;
    answer: string;
}

export type ConversionTable = Record<number, number>;
