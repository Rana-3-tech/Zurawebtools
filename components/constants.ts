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
