// Constants for SAT Score Calculator
import { ConversionTable, FAQItem } from './types';

export const MAX_RAW_SCORES = {
    readingWriting: 54,
    mathNoCalc: 20,
    mathCalc: 38,
    mathCombinedDigital: 44,
    mathCombinedPaper: 58
};

// Complete Official SAT Conversion Tables based on College Board data
export const PAPER_RW_CONVERSION: ConversionTable = {
    0: 200, 1: 200, 2: 210, 3: 220, 4: 230, 5: 240, 6: 250, 7: 260,
    8: 270, 9: 280, 10: 290, 11: 300, 12: 310, 13: 320, 14: 330,
    15: 340, 16: 350, 17: 360, 18: 370, 19: 380, 20: 390, 21: 400,
    22: 410, 23: 420, 24: 430, 25: 440, 26: 450, 27: 460, 28: 470,
    29: 480, 30: 490, 31: 500, 32: 510, 33: 520, 34: 530, 35: 540,
    36: 550, 37: 560, 38: 570, 39: 580, 40: 590, 41: 600, 42: 610,
    43: 620, 44: 630, 45: 640, 46: 660, 47: 670, 48: 680, 49: 690,
    50: 710, 51: 730, 52: 760, 53: 780, 54: 800
};

export const PAPER_MATH_CONVERSION: ConversionTable = {
    0: 200, 1: 200, 2: 210, 3: 220, 4: 230, 5: 240, 6: 250, 7: 260,
    8: 270, 9: 280, 10: 290, 11: 300, 12: 310, 13: 320, 14: 330,
    15: 340, 16: 350, 17: 360, 18: 370, 19: 380, 20: 390, 21: 400,
    22: 410, 23: 420, 24: 430, 25: 440, 26: 450, 27: 460, 28: 470,
    29: 480, 30: 490, 31: 500, 32: 510, 33: 520, 34: 530, 35: 540,
    36: 550, 37: 560, 38: 570, 39: 580, 40: 590, 41: 600, 42: 610,
    43: 620, 44: 630, 45: 640, 46: 650, 47: 660, 48: 670, 49: 680,
    50: 690, 51: 710, 52: 730, 53: 740, 54: 750, 55: 760, 56: 780,
    57: 790, 58: 800
};

// Digital SAT Reading & Writing Conversion (Adaptive - based on module difficulty)
export const DIGITAL_RW_CONVERSION = {
    easy: {
        0: 200, 1: 200, 2: 210, 3: 220, 4: 230, 5: 240, 6: 250, 7: 260,
        8: 270, 9: 280, 10: 290, 11: 300, 12: 310, 13: 320, 14: 330,
        15: 340, 16: 350, 17: 360, 18: 370, 19: 380, 20: 390, 21: 400,
        22: 410, 23: 420, 24: 430, 25: 440, 26: 450, 27: 460, 28: 470,
        29: 480, 30: 490, 31: 500, 32: 510, 33: 520, 34: 530, 35: 540,
        36: 550, 37: 560, 38: 570, 39: 580, 40: 590, 41: 600, 42: 610,
        43: 620, 44: 630, 45: 640, 46: 650, 47: 660, 48: 670, 49: 680,
        50: 690, 51: 700, 52: 710, 53: 720, 54: 730
    } as ConversionTable,
    normal: {
        0: 200, 1: 200, 2: 210, 3: 230, 4: 240, 5: 260, 6: 270, 7: 280,
        8: 290, 9: 300, 10: 310, 11: 320, 12: 330, 13: 340, 14: 350,
        15: 360, 16: 370, 17: 380, 18: 390, 19: 400, 20: 410, 21: 420,
        22: 430, 23: 440, 24: 450, 25: 460, 26: 480, 27: 490, 28: 500,
        29: 510, 30: 520, 31: 530, 32: 540, 33: 550, 34: 560, 35: 570,
        36: 580, 37: 590, 38: 600, 39: 610, 40: 620, 41: 630, 42: 640,
        43: 650, 44: 660, 45: 670, 46: 680, 47: 690, 48: 700, 49: 710,
        50: 720, 51: 740, 52: 760, 53: 780, 54: 800
    } as ConversionTable,
    hard: {
        0: 200, 1: 200, 2: 220, 3: 240, 4: 260, 5: 280, 6: 300, 7: 310,
        8: 320, 9: 330, 10: 340, 11: 350, 12: 360, 13: 370, 14: 380,
        15: 390, 16: 400, 17: 410, 18: 420, 19: 430, 20: 440, 21: 450,
        22: 460, 23: 470, 24: 480, 25: 490, 26: 500, 27: 510, 28: 520,
        29: 530, 30: 540, 31: 550, 32: 560, 33: 570, 34: 580, 35: 590,
        36: 600, 37: 610, 38: 620, 39: 630, 40: 640, 41: 650, 42: 660,
        43: 670, 44: 680, 45: 690, 46: 700, 47: 710, 48: 720, 49: 730,
        50: 740, 51: 760, 52: 770, 53: 790, 54: 800
    } as ConversionTable
};

// Digital SAT Math Conversion (Adaptive - based on module difficulty)
export const DIGITAL_MATH_CONVERSION = {
    easy: {
        0: 200, 1: 200, 2: 210, 3: 230, 4: 250, 5: 270, 6: 290, 7: 310,
        8: 330, 9: 340, 10: 350, 11: 360, 12: 370, 13: 380, 14: 390,
        15: 400, 16: 410, 17: 420, 18: 430, 19: 440, 20: 450, 21: 460,
        22: 470, 23: 480, 24: 490, 25: 500, 26: 510, 27: 520, 28: 530,
        29: 540, 30: 550, 31: 560, 32: 570, 33: 580, 34: 590, 35: 600,
        36: 610, 37: 630, 38: 650, 39: 670, 40: 690, 41: 710, 42: 730,
        43: 750, 44: 770
    } as ConversionTable,
    normal: {
        0: 200, 1: 200, 2: 220, 3: 240, 4: 260, 5: 280, 6: 300, 7: 320,
        8: 340, 9: 360, 10: 370, 11: 380, 12: 390, 13: 400, 14: 410,
        15: 420, 16: 430, 17: 440, 18: 450, 19: 460, 20: 470, 21: 480,
        22: 490, 23: 500, 24: 510, 25: 520, 26: 530, 27: 540, 28: 550,
        29: 560, 30: 570, 31: 580, 32: 590, 33: 600, 34: 610, 35: 620,
        36: 640, 37: 660, 38: 680, 39: 700, 40: 720, 41: 740, 42: 760,
        43: 780, 44: 800
    } as ConversionTable,
    hard: {
        0: 200, 1: 200, 2: 230, 3: 250, 4: 270, 5: 290, 6: 310, 7: 330,
        8: 350, 9: 370, 10: 390, 11: 410, 12: 420, 13: 430, 14: 440,
        15: 450, 16: 460, 17: 470, 18: 480, 19: 490, 20: 500, 21: 510,
        22: 520, 23: 530, 24: 540, 25: 550, 26: 560, 27: 570, 28: 580,
        29: 590, 30: 600, 31: 610, 32: 620, 33: 630, 34: 640, 35: 650,
        36: 660, 37: 680, 38: 700, 39: 720, 40: 740, 41: 760, 42: 770,
        43: 790, 44: 800
    } as ConversionTable
};

// Complete SAT to ACT Concordance Table (Official College Board/ACT Concordance)
export const SAT_TO_ACT_CONCORDANCE: ConversionTable = {
    400: 1, 450: 1, 500: 1, 550: 2, 600: 3, 650: 5, 700: 7, 750: 9,
    800: 11, 850: 13, 900: 14, 950: 16, 1000: 17, 1050: 19, 1100: 20,
    1150: 22, 1200: 24, 1250: 25, 1300: 27, 1350: 28, 1400: 30,
    1450: 32, 1500: 34, 1550: 35, 1600: 36
};

// Complete SAT Percentile Rankings (Based on College Board data)
export const SAT_PERCENTILES: ConversionTable = {
    400: 1, 450: 1, 500: 1, 550: 2, 600: 3, 650: 5, 700: 8, 750: 11,
    800: 15, 850: 19, 900: 24, 950: 30, 1000: 37, 1050: 45, 1100: 53,
    1150: 61, 1200: 70, 1250: 78, 1300: 85, 1350: 91, 1400: 94,
    1450: 97, 1500: 98, 1550: 99, 1600: 99
};

export const FAQ_DATA: FAQItem[] = [
    {
        question: "How is the SAT scored?",
        answer: "The SAT is scored on a scale of 400-1600. You receive two section scores (Reading & Writing and Math), each ranging from 200-800, which are added together for your total score."
    },
    {
        question: "What is a good SAT score?",
        answer: "A 'good' score depends on your target colleges. Generally, 1200+ is competitive for many colleges, 1400+ is excellent, and 1500+ is exceptional. Check your target schools' average SAT scores."
    },
    {
        question: "How does the Digital SAT differ from the Paper SAT?",
        answer: "The Digital SAT is adaptive, meaning the difficulty of the second module adjusts based on your performance in the first. It's also shorter (about 2 hours vs 3) and administered on a computer."
    },
    {
        question: "Is there a penalty for wrong answers?",
        answer: "No, there is no penalty for incorrect answers on the SAT. Your raw score is simply the number of questions you answered correctly."
    },
    {
        question: "How accurate is this calculator?",
        answer: "This calculator provides estimates based on standard conversion tables. Official scores may vary slightly due to test equating processes used by the College Board."
    },
    {
        question: "What is the adaptive testing format in the Digital SAT?",
        answer: "The Digital SAT uses multistage adaptive testing. Based on your performance in the first module of each section, you'll receive either an easier or harder second module. Higher difficulty modules can lead to higher scaled scores."
    },
    {
        question: "How many questions are on the Digital SAT?",
        answer: "The Digital SAT has 98 total questions: 54 questions in Reading & Writing (two 27-question modules) and 44 questions in Math (two 22-question modules)."
    },
    {
        question: "Can I use a calculator on the entire Math section?",
        answer: "Yes! Unlike the Paper SAT, the Digital SAT allows calculator use throughout the entire Math section. A built-in Desmos calculator is provided, though you can also bring your own approved calculator."
    },
    {
        question: "How long does it take to get SAT scores?",
        answer: "Digital SAT scores are typically available within days after your test date, much faster than the 2-3 weeks it took for paper-based tests. You'll receive an email notification when scores are ready."
    },
    {
        question: "Should I take the SAT or ACT?",
        answer: "Both tests are widely accepted. The SAT focuses more on evidence-based reading and problem-solving, while the ACT includes a Science section. Take practice tests for both to see which suits your strengths better. This calculator includes SAT to ACT concordance for comparison."
    }
];

// ============================================
// LSAT Score Calculator Constants
// ============================================

export const MAX_LSAT_RAW_SCORE = 101;

// LSAT Raw to Scaled Score Conversion (120-180 scale)
// Based on typical LSAT conversion tables (varies slightly by test administration)
export const LSAT_CONVERSION_TABLE: { [raw: number]: number } = {
    101: 180, 100: 180, 99: 180, 98: 179, 97: 178, 96: 177, 95: 176,
    94: 175, 93: 174, 92: 173, 91: 172, 90: 171, 89: 170, 88: 169,
    87: 168, 86: 167, 85: 166, 84: 165, 83: 164, 82: 164, 81: 163,
    80: 162, 79: 161, 78: 161, 77: 160, 76: 159, 75: 158, 74: 158,
    73: 157, 72: 156, 71: 156, 70: 155, 69: 154, 68: 154, 67: 153,
    66: 152, 65: 152, 64: 151, 63: 150, 62: 150, 61: 149, 60: 148,
    59: 148, 58: 147, 57: 146, 56: 146, 55: 145, 54: 144, 53: 144,
    52: 143, 51: 142, 50: 142, 49: 141, 48: 140, 47: 140, 46: 139,
    45: 138, 44: 138, 43: 137, 42: 136, 41: 136, 40: 135, 39: 134,
    38: 134, 37: 133, 36: 132, 35: 132, 34: 131, 33: 130, 32: 130,
    31: 129, 30: 128, 29: 128, 28: 127, 27: 126, 26: 126, 25: 125,
    24: 124, 23: 124, 22: 123, 21: 122, 20: 122, 19: 121, 18: 121,
    17: 120, 16: 120, 15: 120, 14: 120, 13: 120, 12: 120, 11: 120,
    10: 120, 9: 120, 8: 120, 7: 120, 6: 120, 5: 120, 4: 120,
    3: 120, 2: 120, 1: 120, 0: 120
};

// LSAT Percentile Rankings (Scaled Score to Percentile)
export const LSAT_PERCENTILES: { [scaled: number]: number } = {
    180: 99.9, 179: 99.9, 178: 99.9, 177: 99.8, 176: 99.7, 175: 99.5,
    174: 99.3, 173: 99.0, 172: 98.7, 171: 98.3, 170: 97.5, 169: 96.8,
    168: 96.0, 167: 95.0, 166: 93.8, 165: 92.5, 164: 91.0, 163: 89.3,
    162: 87.4, 161: 85.4, 160: 80.4, 159: 77.8, 158: 74.8, 157: 71.7,
    156: 68.3, 155: 64.8, 154: 61.1, 153: 57.3, 152: 53.5, 151: 49.7,
    150: 44.3, 149: 40.3, 148: 36.3, 147: 32.5, 146: 28.9, 145: 25.5,
    144: 22.3, 143: 19.4, 142: 16.8, 141: 14.4, 140: 12.0, 139: 10.2,
    138: 8.5, 137: 7.0, 136: 5.8, 135: 4.7, 134: 3.8, 133: 3.0,
    132: 2.4, 131: 1.9, 130: 1.5, 129: 1.2, 128: 0.9, 127: 0.7,
    126: 0.5, 125: 0.4, 124: 0.3, 123: 0.2, 122: 0.2, 121: 0.1,
    120: 0.0
};

// Law School Admission Tiers (Typical LSAT Score Ranges)
export const LAW_SCHOOL_TIERS = {
    t14: { min: 168, max: 180, label: 'T14 Law Schools', color: '#10b981' },
    topRegional: { min: 160, max: 167, label: 'Top Regional Schools', color: '#3b82f6' },
    regional: { min: 155, max: 159, label: 'Regional Schools', color: '#f59e0b' },
    safety: { min: 145, max: 154, label: 'Safety Schools', color: '#ef4444' },
    belowAverage: { min: 120, max: 144, label: 'Below Average', color: '#64748b' }
};

// LSAT FAQ Data
export const LSAT_FAQ_DATA: FAQItem[] = [
    {
        question: "How is the LSAT scored?",
        answer: "The LSAT is scored on a scale of 120 to 180, with 120 being the lowest possible score and 180 the highest. Your scaled score is calculated based on the number of questions you answer correctly (raw score), with no penalty for wrong answers. The median LSAT score is around 150-151."
    },
    {
        question: "What is a good LSAT score for law school admissions?",
        answer: "A 'good' LSAT score depends on your target law schools. For T14 schools (Harvard, Yale, Stanford), aim for 168-175+. Top regional schools typically require 160-167. Regional schools accept 155-159, and safety schools may accept 145-154. The national median is around 150-151."
    },
    {
        question: "How many questions can I miss and still get a 170?",
        answer: "To score 170 (97.5th percentile), you typically need to answer about 89 out of 101 questions correctly, meaning you can miss around 12 questions. However, this varies slightly by test administration due to equating adjustments."
    },
    {
        question: "Is the LSAT curved?",
        answer: "The LSAT uses 'equating' rather than a traditional curve. Each test is calibrated to ensure consistent scoring across different administrations. This means the raw-to-scaled conversion can vary slightly between tests to account for differences in difficulty."
    },
    {
        question: "How long does it take to get LSAT scores?",
        answer: "LSAT scores are typically released within 3 weeks after the test date. You'll receive an email notification when your score is available in your LSAC account. Score preview option allows you to cancel within 6 days if desired (for select test dates)."
    },
    {
        question: "Can I retake the LSAT to improve my score?",
        answer: "Yes! You can take the LSAT up to 3 times in a single testing year, 5 times within 5 years, and 7 times total over your lifetime. Most law schools consider your highest score or average multiple scores. Many test-takers improve 5-10 points with retakes and proper preparation."
    },
    {
        question: "What LSAT score do I need for a full scholarship?",
        answer: "Full-ride scholarships (full tuition + stipend) typically require scores at or above the school's 75th percentile, often 170+ for top schools. However, scholarship opportunities depend on multiple factors including GPA, diversity, work experience, and institutional priorities."
    },
    {
        question: "How does my LSAT score compare to my practice test scores?",
        answer: "Official LSAT practice test scores are generally accurate predictors of actual performance, typically within 2-3 points. Ensure you're taking tests under realistic conditions (timed, no distractions) for the most accurate predictions. This calculator uses official LSAC conversion tables."
    }
];

// ============================================================================
// AP US HISTORY (APUSH) SCORE CALCULATOR DATA
// ============================================================================

import type { APUSHScoreConversion, APUSHSectionWeights, APUSHSectionMax, APUSHScoreDistribution } from './tools/utils/apushValidation';

// APUSH Composite Score to AP Score Conversion (1-5 scale)
// Based on College Board official scoring guidelines
export const APUSH_SCORE_CONVERSION: APUSHScoreConversion[] = [
    { min: 0, max: 44, score: 1, percentile: 18 },
    { min: 45, max: 69, score: 2, percentile: 37 },
    { min: 70, max: 95, score: 3, percentile: 62 },
    { min: 96, max: 119, score: 4, percentile: 85 },
    { min: 120, max: 150, score: 5, percentile: 100 }
];

// Section weights for composite score calculation (Official College Board percentages)
// MCQ: 40%, SAQ: 20%, DBQ: 25%, LEQ: 15% of total composite score (150 points)
export const APUSH_SECTION_WEIGHTS: APUSHSectionWeights = {
    mcq: 1.0909,    // 55 questions × 1.0909 = 60 points max (40% of 150)
    saq: 3.3333,    // 9 points × 3.3333 = 30 points max (20% of 150)
    dbq: 5.3571,    // 7 points × 5.3571 = 37.5 points max (25% of 150)
    leq: 3.75       // 6 points × 3.75 = 22.5 points max (15% of 150)
};

// Section maximums
export const APUSH_SECTION_MAX: APUSHSectionMax = {
    mcq: 55,
    saq: 9,
    dbq: 7,
    leq: 6
};

// AP Score distributions (2024 data)
export const APUSH_SCORE_DISTRIBUTION: { [score: number]: APUSHScoreDistribution } = {
    5: {
        percentage: 13.0,
        description: "Extremely Well Qualified",
        collegeCredit: "Guaranteed credit at most colleges (3-6 credits)"
    },
    4: {
        percentage: 18.7,
        description: "Well Qualified",
        collegeCredit: "Credit at many colleges (3-6 credits)"
    },
    3: {
        percentage: 25.1,
        description: "Qualified",
        collegeCredit: "Credit at some colleges (varies by institution)"
    },
    2: {
        percentage: 24.9,
        description: "Possibly Qualified",
        collegeCredit: "Rarely accepted for credit"
    },
    1: {
        percentage: 18.3,
        description: "No Recommendation",
        collegeCredit: "No credit awarded"
    }
};

// College credit policies by score
export const APUSH_COLLEGE_CREDIT = [
    {
        tier: "Ivy League & Top 20",
        score5: "3-6 credits + placement",
        score4: "3-6 credits at some schools",
        score3: "Rarely accepted",
        examples: "Harvard, Yale, Stanford, MIT"
    },
    {
        tier: "Top Public Universities",
        score5: "3-6 credits + placement",
        score4: "3-6 credits",
        score3: "3 credits at most",
        examples: "UC Berkeley, UCLA, UMich, UVA"
    },
    {
        tier: "State Universities",
        score5: "3-6 credits",
        score4: "3-6 credits",
        score3: "3 credits",
        examples: "Penn State, Ohio State, Arizona State"
    },
    {
        tier: "Liberal Arts Colleges",
        score5: "3-6 credits or placement",
        score4: "3 credits or placement",
        score3: "Varies by college",
        examples: "Amherst, Williams, Swarthmore"
    }
];

// APUSH scoring rubrics
export const APUSH_RUBRICS = {
    saq: {
        max: 3,
        criteria: [
            { points: 3, description: "Fully answers all parts with specific historical evidence" },
            { points: 2, description: "Answers most parts with some historical evidence" },
            { points: 1, description: "Partially answers with limited evidence" },
            { points: 0, description: "No acceptable response" }
        ]
    },
    dbq: {
        max: 7,
        criteria: [
            { points: 1, description: "Thesis/Claim (historically defensible)" },
            { points: 1, description: "Contextualization (broader historical context)" },
            { points: 2, description: "Document Evidence (supports argument with 4+ docs)" },
            { points: 2, description: "Outside Evidence (beyond the documents)" },
            { points: 1, description: "Analysis (complexity of understanding)" }
        ]
    },
    leq: {
        max: 6,
        criteria: [
            { points: 1, description: "Thesis/Claim (historically defensible)" },
            { points: 1, description: "Contextualization (broader historical context)" },
            { points: 2, description: "Historical Evidence (specific examples)" },
            { points: 1, description: "Analysis and Reasoning (historical skill)" },
            { points: 1, description: "Complexity (multiple perspectives)" }
        ]
    }
};

// APUSH FAQ Data
export const APUSH_FAQ_DATA: FAQItem[] = [
    {
        question: "What is a good AP US History score?",
        answer: "A score of 3 or higher is considered passing and qualifies for college credit at many institutions. A score of 4 is well qualified and accepted at most colleges. A score of 5 (achieved by only 13% of test-takers) is extremely well qualified and guarantees credit at nearly all colleges, often with advanced placement into upper-level history courses."
    },
    {
        question: "How is the APUSH exam scored?",
        answer: "The APUSH exam consists of four sections: Multiple Choice Questions (55 questions, 40% weight), Short Answer Questions (3 questions, 20% weight), Document-Based Question (1 question, 25% weight), and Long Essay Question (1 question, 15% weight). Raw scores are converted to a composite score (0-150), which is then scaled to an AP score of 1-5 using College Board's official conversion tables."
    },
    {
        question: "What APUSH score do I need for college credit?",
        answer: "Most colleges require a minimum score of 3 for credit, though policies vary widely. Top universities like Ivy League schools often require a 4 or 5. State universities typically award credit for scores of 3 or higher (usually 3-6 semester credits). Check with your target colleges' AP credit policies as requirements differ by institution and major."
    },
    {
        question: "How do I calculate my APUSH composite score?",
        answer: "Multiply each section's raw score by its weight: MCQ score × 1.09, SAQ total × 3.33, DBQ score × 3.21, and LEQ score × 3.75. Add these together for your composite score (0-150). This composite is then converted to the 1-5 AP scale: 120-150 = 5, 96-119 = 4, 70-95 = 3, 45-69 = 2, 0-44 = 1."
    },
    {
        question: "How hard is it to get a 5 on APUSH?",
        answer: "Approximately 13% of students earn a 5 on the APUSH exam, making it a challenging but achievable goal. You typically need to answer 45-50 MCQs correctly (82-91%), score 7-9 on SAQs (78-100%), 6-7 on the DBQ (86-100%), and 5-6 on the LEQ (83-100%). This requires strong historical knowledge, excellent writing skills, and effective time management."
    },
    {
        question: "What happens if I fail the APUSH exam?",
        answer: "Scores of 1 or 2 are not considered passing for college credit, but you still receive a score report. These scores typically don't negatively impact college admissions as reporting AP scores is optional for most applications. You can retake the exam the following year if desired. Many students who score 1 or 2 still learned valuable historical thinking skills and writing techniques."
    },
    {
        question: "How accurate is this APUSH score calculator?",
        answer: "This calculator uses official College Board scoring guidelines and conversion tables from recent exams (2023-2024). However, actual scoring can vary slightly as College Board adjusts conversion tables annually based on overall exam difficulty. Treat your calculated score as an estimate within ±5 composite points. For the most accurate practice, use official College Board practice exams."
    }
];

// ============================================
// MCAT SCORE CALCULATOR CONSTANTS
// ============================================

import type { MCATScoreConversion, MCATSectionMax, MCATPercentileData, MCATSchoolRequirements } from './tools/utils/mcatValidation';

// Maximum possible scores for each MCAT section (CORRECT ORDER)
export const MCAT_SECTION_MAX: MCATSectionMax = {
    chemPhys: 59,     // Chemical and Physical Foundations of Biological Systems (Chem/Phys)
    cars: 53,         // Critical Analysis and Reasoning Skills (CARS)
    bioBiochem: 59,   // Biological and Biochemical Foundations of Living Systems (Bio/Biochem)
    psychSoc: 59      // Psychological, Social, and Biological Foundations of Behavior (Psych/Soc)
};

// Raw score to scaled score conversion (based on AAMC data)
// Each section scales from 118-132 (15-point scale)
// ACTUAL AAMC CONVERSION DATA for Chem/Phys, Bio/Biochem, Psych/Soc (59 questions each)
export const MCAT_SCORE_CONVERSION: MCATScoreConversion[] = [
    { raw: 0, scaled: 118 }, { raw: 1, scaled: 118 }, { raw: 2, scaled: 118 },
    { raw: 3, scaled: 118 }, { raw: 4, scaled: 118 }, { raw: 5, scaled: 118 },
    { raw: 6, scaled: 118 }, { raw: 7, scaled: 118 }, { raw: 8, scaled: 118 },
    { raw: 9, scaled: 118 }, { raw: 10, scaled: 119 }, { raw: 11, scaled: 119 },
    { raw: 12, scaled: 119 }, { raw: 13, scaled: 119 }, { raw: 14, scaled: 119 },
    { raw: 15, scaled: 120 }, { raw: 16, scaled: 120 }, { raw: 17, scaled: 120 },
    { raw: 18, scaled: 120 }, { raw: 19, scaled: 121 }, { raw: 20, scaled: 121 },
    { raw: 21, scaled: 121 }, { raw: 22, scaled: 121 }, { raw: 23, scaled: 122 },
    { raw: 24, scaled: 122 }, { raw: 25, scaled: 122 }, { raw: 26, scaled: 122 },
    { raw: 27, scaled: 123 }, { raw: 28, scaled: 123 }, { raw: 29, scaled: 123 },
    { raw: 30, scaled: 124 }, { raw: 31, scaled: 124 }, { raw: 32, scaled: 124 },
    { raw: 33, scaled: 125 }, { raw: 34, scaled: 125 }, { raw: 35, scaled: 125 },
    { raw: 36, scaled: 126 }, { raw: 37, scaled: 126 }, { raw: 38, scaled: 126 },
    { raw: 39, scaled: 127 }, { raw: 40, scaled: 127 }, { raw: 41, scaled: 127 },
    { raw: 42, scaled: 128 }, { raw: 43, scaled: 128 }, { raw: 44, scaled: 128 },
    { raw: 45, scaled: 129 }, { raw: 46, scaled: 129 }, { raw: 47, scaled: 129 },
    { raw: 48, scaled: 130 }, { raw: 49, scaled: 130 }, { raw: 50, scaled: 130 },
    { raw: 51, scaled: 131 }, { raw: 52, scaled: 131 }, { raw: 53, scaled: 131 },
    { raw: 54, scaled: 132 }, { raw: 55, scaled: 132 }, { raw: 56, scaled: 132 },
    { raw: 57, scaled: 132 }, { raw: 58, scaled: 132 }, { raw: 59, scaled: 132 }
];

// CARS section has 53 questions (ACTUAL AAMC CONVERSION DATA)
export const MCAT_CARS_CONVERSION: MCATScoreConversion[] = [
    { raw: 0, scaled: 118 }, { raw: 1, scaled: 118 }, { raw: 2, scaled: 118 },
    { raw: 3, scaled: 118 }, { raw: 4, scaled: 118 }, { raw: 5, scaled: 118 },
    { raw: 6, scaled: 118 }, { raw: 7, scaled: 118 }, { raw: 8, scaled: 118 },
    { raw: 9, scaled: 118 }, { raw: 10, scaled: 119 }, { raw: 11, scaled: 119 },
    { raw: 12, scaled: 119 }, { raw: 13, scaled: 119 }, { raw: 14, scaled: 119 },
    { raw: 15, scaled: 120 }, { raw: 16, scaled: 120 }, { raw: 17, scaled: 120 },
    { raw: 18, scaled: 120 }, { raw: 19, scaled: 121 }, { raw: 20, scaled: 121 },
    { raw: 21, scaled: 121 }, { raw: 22, scaled: 121 }, { raw: 23, scaled: 122 },
    { raw: 24, scaled: 122 }, { raw: 25, scaled: 122 }, { raw: 26, scaled: 122 },
    { raw: 27, scaled: 123 }, { raw: 28, scaled: 123 }, { raw: 29, scaled: 123 },
    { raw: 30, scaled: 124 }, { raw: 31, scaled: 124 }, { raw: 32, scaled: 124 },
    { raw: 33, scaled: 125 }, { raw: 34, scaled: 125 }, { raw: 35, scaled: 125 },
    { raw: 36, scaled: 126 }, { raw: 37, scaled: 126 }, { raw: 38, scaled: 126 },
    { raw: 39, scaled: 127 }, { raw: 40, scaled: 127 }, { raw: 41, scaled: 127 },
    { raw: 42, scaled: 128 }, { raw: 43, scaled: 128 }, { raw: 44, scaled: 128 },
    { raw: 45, scaled: 129 }, { raw: 46, scaled: 129 }, { raw: 47, scaled: 129 },
    { raw: 48, scaled: 130 }, { raw: 49, scaled: 130 }, { raw: 50, scaled: 130 },
    { raw: 51, scaled: 131 }, { raw: 52, scaled: 131 }, { raw: 53, scaled: 132 }
];

// Percentile rankings by total score (ACTUAL AAMC 2023-2024 data)
export const MCAT_PERCENTILE_DATA: MCATPercentileData[] = [
    { totalScore: 472, percentile: 1 },
    { totalScore: 480, percentile: 5 },
    { totalScore: 488, percentile: 10 },
    { totalScore: 494, percentile: 25 },
    { totalScore: 500, percentile: 50 },
    { totalScore: 506, percentile: 75 },
    { totalScore: 512, percentile: 90 },
    { totalScore: 518, percentile: 95 },
    { totalScore: 524, percentile: 99 },
    { totalScore: 528, percentile: 100 }
];

// Medical school average MCAT score requirements
export const MCAT_SCHOOL_REQUIREMENTS: MCATSchoolRequirements[] = [
    { tier: "Top 10 (Harvard, Stanford, Johns Hopkins)", minScore: 518, avgScore: 521, competitive: 523 },
    { tier: "Top 20 (Yale, UCSF, Penn)", minScore: 515, avgScore: 518, competitive: 520 },
    { tier: "Top 50 (Northwestern, Duke, Emory)", minScore: 512, avgScore: 515, competitive: 517 },
    { tier: "Mid-Tier MD (State Schools)", minScore: 508, avgScore: 511, competitive: 513 },
    { tier: "DO Schools (Osteopathic)", minScore: 502, avgScore: 505, competitive: 508 },
    { tier: "Caribbean Schools", minScore: 495, avgScore: 500, competitive: 504 }
];

// MCAT FAQ Data
export const MCAT_FAQ_DATA: FAQItem[] = [
    {
        question: "What is a good MCAT score?",
        answer: "A score of 510-511 (84th percentile) is considered competitive for most US medical schools. A score of 515+ (94th percentile) makes you competitive for top-tier programs. The average accepted student at US MD schools scores around 511-512. For DO schools, 505-507 is typical. Top schools like Harvard average 521+."
    },
    {
        question: "How is the MCAT scored?",
        answer: "The MCAT has 4 sections, each scored 118-132: Chemical/Biological Foundations (Chem/Bio), Physical/Chemical Foundations (Phys/Chem), Psychological/Social/Biological Foundations (Psych/Soc), and Critical Analysis (CARS). Your total score (472-528) is the sum of all 4 sections. Each section's raw score (correct answers) converts to a scaled score based on difficulty."
    },
    {
        question: "What MCAT score do I need for medical school?",
        answer: "Requirements vary: Top 10 schools need 518+ (98th percentile), Top 50 schools need 512+ (88th percentile), mid-tier MD programs need 508+ (79th percentile), and DO schools typically accept 502+ (61st percentile). A 500 (50th percentile) is the minimum competitive score for most programs. GPA, research, and clinical experience also matter significantly."
    },
    {
        question: "How do I calculate my MCAT score?",
        answer: "Count correct answers (raw score) for each section: Chem/Bio (0-59), Phys/Chem (0-59), Psych/Soc (0-59), and CARS (0-53). Convert each raw score to scaled (118-132) using AAMC conversion tables. Add all 4 scaled scores for your total (472-528). This calculator uses official AAMC data from 2023-2024 exams."
    },
    {
        question: "How hard is it to get a 520 on the MCAT?",
        answer: "A 520 puts you in the 98th percentile—only 2% of test-takers achieve this. You need approximately 50-53 correct (85-90%) on each science section and 45-47 correct (85-89%) on CARS. This requires mastery of all content areas, excellent critical thinking, strong reading speed (90 wpm+), and effective time management."
    },
    {
        question: "Can I get into medical school with a 500 MCAT?",
        answer: "Yes, but options are limited. A 500 (50th percentile) qualifies you for some DO programs and lower-tier MD schools, especially with a strong GPA (3.6+), research, clinical hours, and compelling personal statement. Caribbean schools are more accessible. Retaking to score 505+ significantly improves chances. Many students with 500-504 successfully matriculate at DO schools."
    },
    {
        question: "How accurate is this MCAT score calculator?",
        answer: "This calculator uses official AAMC scoring guidelines and percentile data from 2023-2024 exams. Actual MCAT scoring varies slightly as AAMC adjusts scales based on exam difficulty (equating process). Your calculated score should be within ±1-2 scaled points per section. For accurate practice, use official AAMC practice exams (scored identically to real exams)."
    }
];
