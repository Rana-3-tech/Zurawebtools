import React from 'react';

// FIX: Define and export the 'Tool' interface from this central data file.
// This resolves circular dependency issues and provides a single source of truth for the type.
export interface Tool {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode;
    gradientColors?: { from: string; to: string };
}


// Category Icons (with colorful gradients)
const TextWritingIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="textWritingIconTitle">
    <title id="textWritingIconTitle">Text and Writing Tools Icon</title>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
    </defs>
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12H16V14H8V12ZM8 16H12V18H8V16Z" fill="url(#grad1)"/>
  </svg>
);
const MathCalculationIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="mathCalcIconTitle">
      <title id="mathCalcIconTitle">Math and Calculation Tools Icon</title>
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 17H7V15H17V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="url(#grad2)"/>
    </svg>
);
const ColorDesignIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="colorDesignIconTitle">
        <title id="colorDesignIconTitle">Color and Design Tools Icon</title>
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M12 3C17.52 3 22 6.58 22 11C22 15.42 17.52 19 12 19C6.48 19 2 15.42 2 11C2 6.58 6.48 3 12 3ZM12 5C8.13 5 5 7.68 5 11C5 14.32 8.13 17 12 17C15.87 17 19 14.32 19 11C19 7.68 15.87 5 12 5Z" fill="url(#grad3)" />
        <path d="M12 5C8.13 5 5 7.68 5 11C6.34 8.04 8.94 6 12 5.5V5Z" fill="url(#grad3)"/>
    </svg>
);
const DeveloperIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="devIconTitle">
    <title id="devIconTitle">Developer Tools Icon</title>
    <defs>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
    </defs>
    <path d="M7.41 16.59L2.83 12L7.41 7.41L6 6L0 12L6 18L7.41 16.59ZM16.59 16.59L21.17 12L16.59 7.41L18 6L24 12L18 18L16.59 16.59Z" fill="url(#grad4)" />
  </svg>
);

const EducationExamIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="educationIconTitle">
    <title id="educationIconTitle">Education & Exam Tools Icon</title>
    <defs>
        <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#001BB7" />
            <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
    </defs>
    <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#grad5)" />
  </svg>
);

const ConstructionEngineeringIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="constructionIconTitle">
    <title id="constructionIconTitle">Construction & Engineering Tools Icon</title>
    <defs>
        <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
    </defs>
    <path d="M22.61 18.97L13.54 9.9L15.66 7.78L14.24 6.36L12.12 8.48L10.59 6.95L12.71 4.83L11.29 3.41L9.17 5.53L7.29 3.66C6.11 2.47 4.21 2.47 3.03 3.66C1.84 4.84 1.84 6.74 3.03 7.93L4.9 9.8L2.78 11.92L4.2 13.34L6.32 11.22L7.85 12.75L5.73 14.87L7.15 16.29L9.27 14.17L18.34 23.24C19.13 24.03 20.4 24.03 21.19 23.24L23.24 21.19C24.03 20.4 24.03 19.13 23.24 18.34L22.61 18.97ZM4.44 7.93C3.65 7.14 3.65 5.88 4.44 5.09C5.23 4.3 6.49 4.3 7.28 5.09L9.15 6.96L5.73 10.38L4.44 7.93Z" fill="url(#grad6)" />
  </svg>
);

const AudioMediaIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="audioMediaIconTitle">
    <title id="audioMediaIconTitle">Audio & Media Tools Icon</title>
    <defs>
        <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
    </defs>
    <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12ZM10 19C8.9 19 8 18.1 8 17C8 15.9 8.9 15 10 15C11.1 15 12 15.9 12 17C12 18.1 11.1 19 10 19Z" fill="url(#grad7)" />
  </svg>
);

// Individual Tool Icons (with colorful gradients)
const WordCounterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="wordCounterIconTitle">
      <title id="wordCounterIconTitle">Word Counter Icon</title>
      <defs><linearGradient id="toolGrad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2563eb" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
      <path d="M17 5H7C5.9 5 5 5.9 5 7V17C5 18.1 5.9 19 7 19H17C18.1 19 19 18.1 19 17V7C19 5.9 18.1 5 17 5ZM9 15H15V17H9V15ZM9 11H15V13H9V11ZM9 7H15V9H9V7Z" fill="url(#toolGrad1)"/>
    </svg>
);
const RemoveSpacesIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="removeSpacesIconTitle">
      <title id="removeSpacesIconTitle">Remove Extra Spaces Icon</title>
      <defs><linearGradient id="toolGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#14b8a6" /></linearGradient></defs>
      <path d="M22 11V3H14V5H16V9H18V5H20V11H22ZM2 3V11H4V5H6V9H8V5H10V11H12V3H2ZM10 15H2V13H10V15ZM22 13H14V15H22V13ZM2 17H10V19H2V17ZM14 17H22V19H14V17Z" fill="url(#toolGrad2)" />
    </svg>
);
const CaseConverterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="caseConverterIconTitle">
      <title id="caseConverterIconTitle">Case Converter Icon</title>
      <defs><linearGradient id="toolGrad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
      <path d="M6.5 20L3 16.5L6.5 13H10V3H12V13H15.5L12 16.5L15.5 20H12V22H10V20H6.5ZM17.5 8V4H19.5V8H21.5L18.5 12L15.5 8H17.5Z" fill="url(#toolGrad3)" />
    </svg>
);
const LoremIpsumIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="loremIpsumIconTitle">
      <title id="loremIpsumIconTitle">Lorem Ipsum Generator Icon</title>
      <defs><linearGradient id="toolGrad4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs>
      <path d="M4 6H20V8H4V6ZM4 10H20V12H4V10ZM4 14H14V16H4V14Z" fill="url(#toolGrad4)" />
    </svg>
);
const TimeDifferenceIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="timeDiffIconTitle">
        <title id="timeDiffIconTitle">Time Difference Calculator Icon</title>
        <defs><linearGradient id="toolGrad5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d946ef" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="url(#toolGrad5)" />
    </svg>
);
const PercentageChangeIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="percentChangeIconTitle">
        <title id="percentChangeIconTitle">Percentage Change Calculator Icon</title>
        <defs><linearGradient id="toolGrad6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <path d="M16 4H8C6.9 4 6 4.9 6 6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V6C18 4.9 17.1 4 16 4ZM8.5 7.5C9.33 7.5 10 8.17 10 9C10 9.83 9.33 10.5 8.5 10.5C7.67 10.5 7 9.83 7 9C7 8.17 7.67 7.5 8.5 7.5ZM15.5 16.5C14.67 16.5 14 15.83 14 15C14 14.17 14.67 13.5 15.5 13.5C16.33 13.5 17 14.17 17 15C17 15.83 16.33 16.5 15.5 16.5ZM16 12H8V10L16 6V8H8V10H16V12Z" fill="url(#toolGrad6)" />
    </svg>
);
const FabricCostingIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fabricCostingIconTitle">
        <title id="fabricCostingIconTitle">Fabric Costing Calculator Icon</title>
        <defs><linearGradient id="toolGrad12" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
        <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17L12 12L2 17ZM2 12L12 17L22 12L12 7L2 12Z" fill="url(#toolGrad12)" />
    </svg>
);
const HexToRgbIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hexToRgbIconTitle">
        <title id="hexToRgbIconTitle">Hex to RGB Converter Icon</title>
        <defs><linearGradient id="toolGrad7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs>
        <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12C1.5 17.8 6.2 22.5 12 22.5C17.8 22.5 22.5 17.8 22.5 12C22.5 6.2 17.8 1.5 12 1.5ZM12 20.5C7.3 20.5 3.5 16.7 3.5 12C3.5 7.3 7.3 3.5 12 3.5C16.7 3.5 20.5 7.3 20.5 12C20.5 16.7 16.7 20.5 12 20.5Z M12 5.5L6.5 15.5H17.5L12 5.5Z" fill="url(#toolGrad7)" />
    </svg>
);
const ContrastCheckerIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="contrastCheckerIconTitle">
        <title id="contrastCheckerIconTitle">Color Contrast Checker Icon</title>
        <defs><linearGradient id="toolGrad8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="url(#toolGrad8)" />
    </svg>
);
const JsonFormatterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="jsonFormatterIconTitle">
        <title id="jsonFormatterIconTitle">JSON Formatter Icon</title>
        <defs><linearGradient id="toolGrad9" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z" fill="url(#toolGrad9)" />
    </svg>
);
const ShadowGeneratorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="shadowGeneratorIconTitle">
        <title id="shadowGeneratorIconTitle">CSS Shadow Generator Icon</title>
        <defs><linearGradient id="toolGrad10" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <path d="M12 2L13.41 4.17L16 3L15.17 5.59L18 6L16.83 8.41L18 11L15.17 10.41L16 13L13.41 11.83L12 14L10.59 11.83L8 13L8.83 10.41L6 11L7.17 8.41L6 6L8.83 5.59L8 3L10.59 4.17L12 2ZM12 8C10.89 8 10 8.89 10 10S10.89 12 12 12 14 11.11 14 10 13.11 8 12 8Z" fill="url(#toolGrad10)" />
    </svg>
);
const ColorHarmonyIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="colorHarmonyIconTitle">
        <title id="colorHarmonyIconTitle">Color Harmony Checker Icon</title>
        <defs><linearGradient id="toolGrad11" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ff6b6b" /><stop offset="100%" stopColor="#4ecdc4" /></linearGradient></defs>
        <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 6L15.09 9.09L18 6L21 9L18 12L15.09 14.91L12 18L8.91 14.91L6 12L9 9L12 6Z" fill="url(#toolGrad11)" />
    </svg>
);
const SnowDayCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="snowDayCalculatorIconTitle">
        <title id="snowDayCalculatorIconTitle">Snow Day Calculator Icon</title>
        <defs><linearGradient id="toolGrad13" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <path d="M12 2L8.5 8.5L2 12L8.5 15.5L12 22L15.5 15.5L22 12L15.5 8.5L12 2ZM12 6L14 10L18 12L14 14L12 18L10 14L6 12L10 10L12 6Z" fill="url(#toolGrad13)" />
    </svg>
);
const SATScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="satScoreCalculatorIconTitle">
        <title id="satScoreCalculatorIconTitle">SAT Score Calculator Icon</title>
        <defs><linearGradient id="toolGrad14" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#001BB7" /><stop offset="100%" stopColor="#60A5FA" /></linearGradient></defs>
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="url(#toolGrad14)" />
    </svg>
);
const ACTScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="actScoreCalculatorIconTitle">
        <title id="actScoreCalculatorIconTitle">ACT Score Calculator Icon</title>
        <defs><linearGradient id="toolGradACT" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="url(#toolGradACT)" opacity="0.3" />
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17H7V14H10V17ZM10 12H7V9H10V12ZM14 17H11V14H14V17ZM14 12H11V9H14V12ZM17 17H15V14H17V17ZM17 12H15V9H17V12Z" fill="url(#toolGradACT)" />
    </svg>
);

const IELTSBandScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ieltsScoreCalculatorIconTitle">
        <title id="ieltsScoreCalculatorIconTitle">IELTS Band Score Calculator Icon</title>
        <defs><linearGradient id="toolGradIELTS" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <circle cx="12" cy="12" r="9" stroke="url(#toolGradIELTS)" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="url(#toolGradIELTS)"/>
        <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z" fill="url(#toolGradIELTS)"/>
        <circle cx="12" cy="8" r="1" fill="url(#toolGradIELTS)"/>
        <circle cx="12" cy="16" r="1" fill="url(#toolGradIELTS)"/>
        <circle cx="8" cy="12" r="1" fill="url(#toolGradIELTS)"/>
        <circle cx="16" cy="12" r="1" fill="url(#toolGradIELTS)"/>
    </svg>
);

const TOEFLScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="toeflScoreCalculatorIconTitle">
        <title id="toeflScoreCalculatorIconTitle">TOEFL Score Calculator Icon</title>
        <defs><linearGradient id="toolGradTOEFL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#14b8a6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="url(#toolGradTOEFL)" strokeWidth="2" fill="none" opacity="0.3"/>
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="url(#toolGradTOEFL)" opacity="0.2"/>
        <path d="M8 8H16V10H8V8Z" fill="url(#toolGradTOEFL)"/>
        <path d="M8 12H16V14H8V12Z" fill="url(#toolGradTOEFL)"/>
        <path d="M8 16H13V18H8V16Z" fill="url(#toolGradTOEFL)"/>
        <circle cx="18" cy="17" r="1.5" fill="url(#toolGradTOEFL)"/>
    </svg>
);

const LSATScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lsatScoreCalculatorIconTitle">
        <title id="lsatScoreCalculatorIconTitle">LSAT Score Calculator Icon</title>
        <defs><linearGradient id="toolGradLSAT" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="url(#toolGradLSAT)" />
        <path d="M14 10H10V14H14V10Z" fill="url(#toolGradLSAT)" opacity="0.6" />
    </svg>
);
const APUSHScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="apushScoreCalculatorIconTitle">
        <title id="apushScoreCalculatorIconTitle">APUSH Score Calculator Icon</title>
        <defs><linearGradient id="toolGradAPUSH" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#dc2626" /><stop offset="100%" stopColor="#2563eb" /></linearGradient></defs>
        <path d="M12 2L1 21H23L12 2ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="url(#toolGradAPUSH)" opacity="0.2" />
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H10V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="url(#toolGradAPUSH)" />
    </svg>
);
const BerkeleyGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="berkeleyGPAIconTitle">
        <title id="berkeleyGPAIconTitle">Berkeley GPA Calculator Icon</title>
        <defs><linearGradient id="toolGrad15" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0033A0" /><stop offset="100%" stopColor="#FDB515" /></linearGradient></defs>
        <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18ZM12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="url(#toolGrad15)" />
    </svg>
);
const UVAGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="uvaGPAIconTitle">
        <title id="uvaGPAIconTitle">UVA GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradUVA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E57200" /><stop offset="100%" stopColor="#232D4B" /></linearGradient></defs>
        <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18ZM12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="url(#toolGradUVA)" />
    </svg>
);
const ASUGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="asuGPAIconTitle">
        <title id="asuGPAIconTitle">ASU GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradASU" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8C1D40" /><stop offset="100%" stopColor="#FFC627" /></linearGradient></defs>
        <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18ZM12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="url(#toolGradASU)" />
    </svg>
);
const LSACGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="lsacGPAIconTitle">
        <title id="lsacGPAIconTitle">LSAC GPA Calculator Icon</title>
        <defs><linearGradient id="toolGrad16" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#toolGrad16)" />
    </svg>
);
const FillDirtIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="fillDirtIconTitle">
        <title id="fillDirtIconTitle">Fill Dirt Calculator Icon</title>
        <defs><linearGradient id="toolGrad17" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#92400e" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs>
        <path d="M19 12H22L12 3L2 12H5V20H19V12ZM7.21 10H16.79L12 5.52L7.21 10ZM17 18H7V12H17V18Z" fill="url(#toolGrad17)" />
    </svg>
);
const QuiltBackingIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="quiltBackingIconTitle">
        <title id="quiltBackingIconTitle">Quilt Backing Calculator Icon</title>
        <defs><linearGradient id="toolGrad18" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs>
        <path d="M4 4H11V11H4V4ZM13 4H20V11H13V4ZM4 13H11V20H4V13ZM13 13H20V20H13V13Z" fill="url(#toolGrad18)" />
    </svg>
);
const AudiobookSpeedIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="audiobookSpeedIconTitle">
        <title id="audiobookSpeedIconTitle">Audiobook Speed Calculator Icon</title>
        <defs><linearGradient id="toolGrad19" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
        <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM19 11H9V9H19V11ZM15 15H9V13H15V15ZM19 7H9V5H19V7Z" fill="url(#toolGrad19)" />
    </svg>
);
const ReverbIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="reverbIconTitle">
        <title id="reverbIconTitle">Reverb Calculator Icon</title>
        <defs><linearGradient id="toolGrad20" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="url(#toolGrad20)" />
    </svg>
);
const CodeSimilarityIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="codeSimilarityIconTitle">
        <title id="codeSimilarityIconTitle">Code Similarity Checker Icon</title>
        <defs><linearGradient id="toolGrad21" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z" fill="url(#toolGrad21)" />
    </svg>
);
const PowerToMassIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="powerToMassIconTitle">
        <title id="powerToMassIconTitle">Power to Mass Ratio Calculator Icon</title>
        <defs><linearGradient id="toolGrad22" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs>
        <path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill="url(#toolGrad22)" />
    </svg>
);
const CollegeGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="collegeGPAIconTitle">
        <title id="collegeGPAIconTitle">College GPA Calculator Icon</title>
        <defs><linearGradient id="toolGrad23" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGrad23)" />
    </svg>
);

const CSUGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="csuGPAIconTitle">
        <title id="csuGPAIconTitle">CSU GPA Calculator Icon</title>
        <defs><linearGradient id="toolGrad24" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#dc2626" /><stop offset="100%" stopColor="#ea580c" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGrad24)" />
    </svg>
);

const HighSchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="highSchoolGPAIconTitle">
        <title id="highSchoolGPAIconTitle">High School GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradHSGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradHSGPA)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradHSGPA)" opacity="0.7" />
        <circle cx="12" cy="9" r="2" fill="#ffffff" opacity="0.9" />
    </svg>
);

const SemesterGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="semesterGPAIconTitle">
        <title id="semesterGPAIconTitle">Semester GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradSemesterGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradSemesterGPA)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradSemesterGPA)" opacity="0.8" />
        <rect x="8" y="6" width="8" height="1" fill="#ffffff" opacity="0.9" />
        <rect x="8" y="8" width="6" height="1" fill="#ffffff" opacity="0.9" />
    </svg>
);

const WeightedGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="weightedGPAIconTitle">
        <title id="weightedGPAIconTitle">Weighted GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradWeightedGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradWeightedGPA)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradWeightedGPA)" opacity="0.8" />
        <circle cx="12" cy="9" r="2" fill="#fbbf24" />
        <path d="M12 7L12.5 8.5L14 9L12.5 9.5L12 11L11.5 9.5L10 9L11.5 8.5Z" fill="#ffffff" />
    </svg>
);

const UnweightedGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="unweightedGPAIconTitle">
        <title id="unweightedGPAIconTitle">Unweighted GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradUnweightedGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradUnweightedGPA)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradUnweightedGPA)" opacity="0.8" />
        <rect x="9" y="8" width="6" height="1.5" rx="0.5" fill="#ffffff" opacity="0.9" />
        <rect x="9" y="10.5" width="6" height="1.5" rx="0.5" fill="#ffffff" opacity="0.9" />
    </svg>
);

const RutgersGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="rutgersGPAIconTitle">
        <title id="rutgersGPAIconTitle">Rutgers GPA Calculator Icon</title>
        <defs><linearGradient id="toolGrad25" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#cc0033" /><stop offset="100%" stopColor="#ff0000" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGrad25)" />
    </svg>
);

const UTAGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="utaGPAIconTitle">
        <title id="utaGPAIconTitle">UTA GPA Calculator Icon</title>
        <defs><linearGradient id="toolGrad26" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF8200" /><stop offset="100%" stopColor="#0064B0" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGrad26)" />
    </svg>
);

const GMATScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gmatScoreCalculatorIconTitle">
        <title id="gmatScoreCalculatorIconTitle">GMAT Score Calculator Icon</title>
        <defs><linearGradient id="toolGradGMAT" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1e40af" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#toolGradGMAT)" />
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H10V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="url(#toolGradGMAT)" opacity="0.8" />
    </svg>
);

const UCATScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ucatScoreCalculatorIconTitle">
        <title id="ucatScoreCalculatorIconTitle">UCAT Score Calculator Icon</title>
        <defs><linearGradient id="toolGradUCAT" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#059669" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#toolGradUCAT)" />
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H10V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="url(#toolGradUCAT)" opacity="0.8" />
    </svg>
);

const GREScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="greScoreCalculatorIconTitle">
        <title id="greScoreCalculatorIconTitle">GRE Score Calculator Icon</title>
        <defs><linearGradient id="toolGradGRE" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#toolGradGRE)" />
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H10V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="url(#toolGradGRE)" opacity="0.8" />
    </svg>
);

const ALevelScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="aLevelScoreCalculatorIconTitle">
        <title id="aLevelScoreCalculatorIconTitle">A-Level Score Calculator Icon</title>
        <defs><linearGradient id="toolGradALevel" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
        <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" fill="url(#toolGradALevel)" />
        <circle cx="12" cy="12" r="4" fill="#fbbf24" opacity="0.9" />
        <text x="12" y="14.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">A*</text>
    </svg>
);

const APCalculusScoreCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="apCalculusScoreCalculatorIconTitle">
        <title id="apCalculusScoreCalculatorIconTitle">AP Calculus Score Calculator Icon</title>
        <defs><linearGradient id="toolGradAPCalc" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <circle cx="12" cy="12" r="10" fill="url(#toolGradAPCalc)" />
        <path d="M7 9L12 4L17 9M17 15L12 20L7 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <text x="12" y="14" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">∫dx</text>
    </svg>
);

const CommonAppWordCounterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="commonAppWordCounterIconTitle">
        <title id="commonAppWordCounterIconTitle">Common App Essay Word Counter Icon</title>
        <defs><linearGradient id="toolGradCommonApp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="url(#toolGradCommonApp)" />
        <path d="M14 2V8H20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="4" fill="#059669" />
        <text x="18" y="20" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">W</text>
    </svg>
);

const UCASPointsIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ucasPointsIconTitle">
        <title id="ucasPointsIconTitle">UCAS Points Calculator Icon</title>
        <defs><linearGradient id="toolGradUCAS" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#toolGradUCAS)" />
        <path d="M7 8H17M7 12H17M7 16H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="16" r="3.5" fill="#f59e0b" />
        <text x="17" y="18" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">UK</text>
    </svg>
);

const StudentVisaFeeCalculatorAustraliaIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="visaFeeIconTitle">
        <title id="visaFeeIconTitle">Australia Student Visa Fee Calculator Icon</title>
        <defs><linearGradient id="toolGradVisa" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#14b8a6" /></linearGradient></defs>
        <rect x="2" y="5" width="20" height="14" rx="2" fill="url(#toolGradVisa)" />
        <path d="M2 9H22" stroke="white" strokeWidth="1.5" />
        <circle cx="7" cy="14" r="2" fill="#fbbf24" />
        <text x="7" y="15.5" fontSize="3" fill="white" textAnchor="middle" fontWeight="bold">$</text>
        <path d="M12 12H19M12 15H17" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const CollegeAdmissionsCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="collegeAdmissionsIconTitle">
        <title id="collegeAdmissionsIconTitle">College Admissions Calculator Icon</title>
        <defs><linearGradient id="toolGradCollegeAdm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
        <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L23 9L12 3Z" fill="url(#toolGradCollegeAdm)" />
        <circle cx="12" cy="12" r="3" fill="#fbbf24" />
        <text x="12" y="13.5" fontSize="3.5" fill="white" textAnchor="middle" fontWeight="bold">A</text>
    </svg>
);

const PersonalStatementCounterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="personalStatementIconTitle">
        <title id="personalStatementIconTitle">Personal Statement Character Counter Icon</title>
        <defs><linearGradient id="toolGradPersonalStatement" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="url(#toolGradPersonalStatement)" />
        <path d="M14 2V8H20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 13H16M8 17H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="15" y="15" width="6" height="6" rx="1" fill="#10b981" />
        <text x="18" y="19.5" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">4K</text>
    </svg>
);


export interface SubCategory {
    slug: string;
    title: string;
    tools: Tool[];
}

export interface Category {
    slug: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    tools: Tool[];
    subCategories?: SubCategory[];
}

export const toolCategories: Category[] = [
    {
        slug: 'text-and-writing-tools',
        title: 'Text & Writing Tools',
        description: 'Enhance your writing with tools for content generation, grammar checking, and text analysis.',
        icon: <TextWritingIcon />,
        tools: [
            {
                title: 'Online Word & Character Counter Tool',
                description: 'Instantly count words, characters, sentences, and paragraphs in your text. Perfect for essays, social media posts, and SEO content.',
                link: 'text-and-writing-tools/word-counter',
                icon: <WordCounterIcon />,
                gradientColors: { from: '#3b82f6', to: '#22d3ee' }, // Blue to Cyan
            },
            {
                title: 'Remove Extra Spaces from Text',
                description: 'Clean up your text by automatically removing unnecessary spaces, tabs, and line breaks. A simple tool for tidying up copied content.',
                link: 'text-and-writing-tools/remove-extra-spaces',
                icon: <RemoveSpacesIcon />,
                gradientColors: { from: '#10b981', to: '#14b8a6' }, // Green to Teal
            },
            {
                title: 'Online Case Converter',
                description: 'Easily convert text between UPPERCASE, lowercase, Title Case, and Sentence case with a single click.',
                link: 'text-and-writing-tools/case-converter',
                icon: <CaseConverterIcon />,
                gradientColors: { from: '#8b5cf6', to: '#ec4899' }, // Purple to Pink
            },
             {
                title: 'Lorem Ipsum Generator',
                description: 'Generate placeholder text for your design mockups and layouts. Customize by paragraphs, sentences, or words.',
                link: 'text-and-writing-tools/lorem-ipsum-generator',
                icon: <LoremIpsumIcon />,
                gradientColors: { from: '#f97316', to: '#f59e0b' }, // Orange to Amber
            },
        ]
    },
    {
        slug: 'math-and-calculation-tools',
        title: 'Math & Calculation Tools',
        description: 'Perform complex calculations, conversions, and mathematical analyses with our handy tools.',
        icon: <MathCalculationIcon />,
        tools: [
            {
                title: 'Date Difference Calculator',
                description: 'Calculate the exact duration between two dates, broken down into years, months, and days.',
                link: 'math-and-calculation-tools/time-difference-calculator',
                icon: <TimeDifferenceIcon />,
                gradientColors: { from: '#d946ef', to: '#8b5cf6' }, // Fuchsia to Purple
            },
            {
                title: 'Percentage Change Calculator',
                description: 'Quickly calculate the percentage increase or decrease between two numbers. Ideal for finance, business, and math.',
                link: 'math-and-calculation-tools/percentage-change-calculator',
                icon: <PercentageChangeIcon />,
                gradientColors: { from: '#22c55e', to: '#3b82f6' }, // Green to Blue
            },
            {
                title: 'Fabric Costing Calculator',
                description: 'Professional fabric costing tool for textile engineers. Calculate warp/weft weight, yarn consumption, and per-meter pricing with accurate cost breakdown.',
                link: 'math-and-calculation-tools/fabric-costing-tool',
                icon: <FabricCostingIcon />,
                gradientColors: { from: '#f59e0b', to: '#ef4444' }, // Amber to Red
            },
            {
                title: 'Snow Day Calculator',
                description: 'Predict the likelihood of school closures due to weather conditions. Advanced algorithm analyzes snowfall, temperature, wind, and school district policies.',
                link: 'math-and-calculation-tools/snow-day-calculator',
                icon: <SnowDayCalculatorIcon />,
                gradientColors: { from: '#3b82f6', to: '#06b6d4' }, // Blue to Cyan
            },
        ]
    },
    {
        slug: 'color-and-design-tools',
        title: 'Color & Design Tools',
        description: 'Find the perfect color palettes, generate gradients, and get design inspiration for your projects.',
        icon: <ColorDesignIcon />,
        tools: [
            {
                title: 'Hex to RGB Color Converter',
                description: 'Instantly convert Hex color codes to RGB values with a live color preview. A must-have tool for designers and developers.',
                link: 'color-and-design-tools/hex-to-rgb-converter',
                icon: <HexToRgbIcon />,
                gradientColors: { from: '#ef4444', to: '#f59e0b' }, // Red to Amber
            },
            {
                title: 'Accessible Color Contrast Checker',
                description: 'Check color contrast ratios for accessibility compliance (WCAG AA/AAA). Essential for creating inclusive web designs.',
                link: 'color-and-design-tools/accessible-color-contrast-checker',
                icon: <ContrastCheckerIcon />,
                gradientColors: { from: '#6366f1', to: '#a855f7' }, // Indigo to Purple
            },
            {
                title: 'CSS Shadow Generator',
                description: 'Create realistic box-shadow and text-shadow effects with live preview. Perfect for modern UI design and neumorphism.',
                link: 'color-and-design-tools/shadow-css-generator',
                icon: <ShadowGeneratorIcon />,
                gradientColors: { from: '#8b5cf6', to: '#06b6d4' }, // Purple to Cyan
            },
            {
                title: 'Color Harmony Checker',
                description: 'Generate beautiful color palettes and harmonies using color theory. Perfect for designers creating cohesive color schemes.',
                link: 'color-and-design-tools/color-harmony-checker',
                icon: <ColorHarmonyIcon />,
                gradientColors: { from: '#ff6b6b', to: '#4ecdc4' }, // Red to Teal
            },
        ]
    },
    {
        slug: 'developer-tools',
        title: 'Developer Tools',
        description: 'A collection of utilities for developers, including code formatters, JSON validators, and more.',
        icon: <DeveloperIcon />,
        tools: [
            {
                title: 'JSON Formatter & Validator',
                description: 'Format, beautify, and validate your JSON data. A crucial tool for checking API responses and cleaning up JSON files.',
                link: 'developer-tools/json-formatter',
                icon: <JsonFormatterIcon />,
                gradientColors: { from: '#06b6d4', to: '#3b82f6' }, // Cyan to Blue
            },
            {
                title: 'Code Similarity Checker',
                description: 'Compare two code snippets and detect similarities. Perfect for checking code duplication and plagiarism detection.',
                link: 'developer-tools/code-similarity-checker',
                icon: <CodeSimilarityIcon />,
                gradientColors: { from: '#10b981', to: '#06b6d4' }, // Green to Cyan
            },
        ]
    },
    {
        slug: 'education-and-exam-tools',
        title: 'Education & Exam Tools',
        description: 'Essential calculators and tools for students, teachers, and academic professionals.',
        icon: <EducationExamIcon />,
        tools: [
            {
                title: 'SAT Score Calculator',
                description: 'Digital SAT raw to scaled score converter for 2024-2025. Calculate your total SAT score (400-1600) with percentile estimates and ACT concordance.',
                link: 'education-and-exam-tools/test-score-tools/sat-score-calculator',
                icon: <SATScoreCalculatorIcon />,
                gradientColors: { from: '#001BB7', to: '#60A5FA' }, // Deep Blue to Light Blue
            },
            {
                title: 'LSAT Score Calculator',
                description: 'Free LSAT raw to scaled score converter for law school admissions. Calculate your LSAT score (120-180) with percentile rankings and law school target analysis.',
                link: 'education-and-exam-tools/test-score-tools/lsat-score-calculator',
                icon: <LSATScoreCalculatorIcon />,
                gradientColors: { from: '#6366f1', to: '#8b5cf6' }, // Indigo to Purple
            },
            {
                title: 'APUSH Score Calculator',
                description: 'Free AP US History score calculator for 2026. Convert MCQ, SAQ, DBQ, and LEQ scores to AP scores (1-5) with percentile rankings and college credit information.',
                link: 'education-and-exam-tools/test-score-tools/apush-score-calculator',
                icon: <APUSHScoreCalculatorIcon />,
                gradientColors: { from: '#dc2626', to: '#2563eb' }, // Red to Blue (American colors)
            },
            {
                title: 'MCAT Score Calculator',
                description: 'Medical College Admission Test score calculator for 2026. Convert raw section scores to scaled scores (118-132) with total score, percentile rankings, and medical school competitiveness analysis.',
                link: 'education-and-exam-tools/test-score-tools/mcat-score-calculator',
                icon: <APUSHScoreCalculatorIcon />,
                gradientColors: { from: '#0ea5e9', to: '#06b6d4' }, // Medical blue/cyan
            },
            {
                title: 'Berkeley GPA Calculator',
                description: 'Calculate your UC Berkeley GPA with accurate grade point conversions. Supports letter grades, plus/minus system, and weighted courses.',
                link: 'education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator',
                icon: <BerkeleyGPAIcon />,
                gradientColors: { from: '#0033A0', to: '#FDB515' }, // Berkeley Blue to Gold
            },
            {
                title: 'Rutgers GPA Calculator',
                description: 'Calculate your Rutgers University GPA using official grade scales. Engineering major average calculator with scenario planner and honors graduation requirements.',
                link: 'education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator',
                icon: <RutgersGPAIcon />,
                gradientColors: { from: '#cc0033', to: '#ff0000' }, // Rutgers Scarlet Red
            },
            {
                title: 'UTA GPA Calculator',
                description: 'University of Texas at Arlington GPA calculator with Grade Point Deficiency (GPD) computation. Calculate semester GPA, raise cumulative GPA, and plan academic probation removal.',
                link: 'education-and-exam-tools/university-gpa-tools/uta-gpa-calculator',
                icon: <UTAGPAIcon />,
                gradientColors: { from: '#FF8200', to: '#0064B0' }, // UTA Orange and Blue
            },
            {
                title: 'UVA GPA Calculator',
                description: 'University of Virginia GPA calculator with official UVA grade scale (A+ = 4.0). Calculate semester GPA, cumulative GPA, and track Latin honors eligibility for Cum Laude, Magna Cum Laude, and Summa Cum Laude.',
                link: 'education-and-exam-tools/university-gpa-tools/uva-gpa-calculator',
                icon: <UVAGPAIcon />,
                gradientColors: { from: '#E57200', to: '#232D4B' }, // UVA Orange and Navy Blue
            },
            {
                title: 'ASU GPA Calculator',
                description: 'Arizona State University GPA calculator with official ASU grading scale. Calculate current GPA, projected semester GPA, and cumulative GPA. Supports ASU\'s unique E grade system.',
                link: 'education-and-exam-tools/university-gpa-tools/asu-gpa-calculator',
                icon: <ASUGPAIcon />,
                gradientColors: { from: '#8C1D40', to: '#FFC627' }, // ASU Maroon and Gold
            },
            {
                title: 'LSAC GPA Calculator',
                description: 'Calculate your Law School Admission Council (LSAC) CAS GPA for law school applications. Official LSAC grade conversion with A+ (4.33) support.',
                link: 'education-and-exam-tools/gpa-tools/lsac-gpa-calculator',
                icon: <LSACGPAIcon />,
                gradientColors: { from: '#6366f1', to: '#ec4899' }, // Indigo to Pink
            },
            {
                title: 'CSU GPA Calculator',
                description: 'Official California State University GPA calculator with A-G course verification. Calculate your CSU eligibility GPA with honors weighting caps and 10th-11th grade restrictions.',
                link: 'education-and-exam-tools/gpa-tools/csu-gpa-calculator',
                icon: <CSUGPAIcon />,
                gradientColors: { from: '#dc2626', to: '#ea580c' }, // Red to Orange
            },
        ],
        subCategories: [
            {
                slug: 'test-score-tools',
                title: 'Test Score Tools',
                tools: [
                    {
                        title: 'ACT Score Calculator',
                        description: 'Free ACT score calculator for 2026. Convert raw scores to scaled scores (1-36) for English, Math, Reading, and Science sections. Calculate your ACT composite score instantly.',
                        link: 'education-and-exam-tools/test-score-tools/act-score-calculator',
                        icon: <ACTScoreCalculatorIcon />,
                        gradientColors: { from: '#8b5cf6', to: '#ec4899' },
                    },
                    {
                        title: 'IELTS Band Score Calculator',
                        description: 'Free IELTS band score calculator for 2026. Calculate overall IELTS band score from Listening, Reading, Writing, and Speaking section scores. Instant results with official IELTS rounding rules.',
                        link: 'education-and-exam-tools/test-score-tools/ielts-band-score-calculator',
                        icon: <IELTSBandScoreCalculatorIcon />,
                        gradientColors: { from: '#3b82f6', to: '#8b5cf6' },
                    },
                    {
                        title: 'TOEFL Score Calculator',
                        description: 'Free TOEFL iBT score calculator for 2026. Calculate total TOEFL score (0-120) from Reading, Listening, Speaking, and Writing section scores. Instant results for university admissions.',
                        link: 'education-and-exam-tools/test-score-tools/toefl-score-calculator',
                        icon: <TOEFLScoreCalculatorIcon />,
                        gradientColors: { from: '#14b8a6', to: '#06b6d4' },
                    },
                    {
                        title: 'SAT Score Calculator',
                        description: 'Digital SAT raw to scaled score converter for 2025-2026. Calculate your total SAT score (400-1600) with percentile estimates and ACT concordance.',
                        link: 'education-and-exam-tools/test-score-tools/sat-score-calculator',
                        icon: <SATScoreCalculatorIcon />,
                        gradientColors: { from: '#001BB7', to: '#60A5FA' },
                    },
                    {
                        title: 'LSAT Score Calculator',
                        description: 'Free LSAT raw to scaled score converter for law school admissions. Calculate your LSAT score (120-180) with percentile rankings and law school target analysis.',
                        link: 'education-and-exam-tools/test-score-tools/lsat-score-calculator',
                        icon: <LSATScoreCalculatorIcon />,
                        gradientColors: { from: '#6366f1', to: '#8b5cf6' },
                    },
                    {
                        title: 'MCAT Score Calculator',
                        description: 'Medical College Admission Test score calculator for 2026. Convert raw section scores to scaled scores (118-132) with total score, percentile rankings, and medical school competitiveness analysis.',
                        link: 'education-and-exam-tools/test-score-tools/mcat-score-calculator',
                        icon: <APUSHScoreCalculatorIcon />,
                        gradientColors: { from: '#0ea5e9', to: '#06b6d4' },
                    },
                    {
                        title: 'APUSH Score Calculator',
                        description: 'Free AP US History score calculator for 2026. Convert MCQ, SAQ, DBQ, and LEQ scores to AP scores (1-5) with percentile rankings and college credit information.',
                        link: 'education-and-exam-tools/test-score-tools/apush-score-calculator',
                        icon: <APUSHScoreCalculatorIcon />,
                        gradientColors: { from: '#dc2626', to: '#2563eb' },
                    },
                    {
                        title: 'GMAT Score Calculator',
                        description: 'Free GMAT score calculator for 2026. Estimate your total GMAT score from Quantitative, Verbal, and Data Insights section scores with percentile rankings.',
                        link: 'education-and-exam-tools/test-score-tools/gmat-score-calculator',
                        icon: <GMATScoreCalculatorIcon />,
                        gradientColors: { from: '#1e40af', to: '#3b82f6' },
                    },
                    {
                        title: 'UCAT Score Calculator 2026',
                        description: 'Free UCAT cognitive total calculator for 2026. Convert raw scores from Verbal Reasoning, Decision Making, Quantitative Reasoning, and Abstract Reasoning to scaled scores (300-900) with total cognitive score (1200-3600) and SJT band analysis.',
                        link: 'education-and-exam-tools/test-score-tools/ucat-score-calculator',
                        icon: <UCATScoreCalculatorIcon />,
                        gradientColors: { from: '#059669', to: '#10b981' },
                    },
                    {
                        title: 'GRE Score Calculator 2026',
                        description: 'Free GRE score calculator for 2026. Predict your Verbal and Quantitative scores (130-170) from correct answers with percentile rankings. Instant results for graduate school admissions.',
                        link: 'education-and-exam-tools/test-score-tools/gre-score-calculator',
                        icon: <GREScoreCalculatorIcon />,
                        gradientColors: { from: '#6366f1', to: '#8b5cf6' },
                    },
                    {
                        title: 'A-Level Score Calculator 2026',
                        description: 'Free A-Level grade calculator and UCAS points converter. Calculate your total points instantly for UK, Australia, and Germany university admissions. Convert grades to UCAS tariff points accurately.',
                        link: 'education-and-exam-tools/test-score-tools/a-level-score-calculator',
                        icon: <ALevelScoreCalculatorIcon />,
                        gradientColors: { from: '#8b5cf6', to: '#ec4899' },
                    },
                    {
                        title: 'AP Calculus Score Calculator (AB/BC) 2026',
                        description: 'Free AP Calculus AB and BC score calculator for 2026. Convert MCQ and FRQ scores to AP scores (1-5) instantly. Calculate composite scores with percentile rankings for college credit predictions. Exam: May 5, 2026.',
                        link: 'education-and-exam-tools/test-score-tools/ap-calculus-score-calculator',
                        icon: <APCalculusScoreCalculatorIcon />,
                        gradientColors: { from: '#3b82f6', to: '#8b5cf6' },
                    },
                ]
            },
            {
                slug: 'gpa-tools',
                title: 'GPA Tools',
                tools: [
                    {
                        title: 'College GPA Calculator',
                        description: 'Free college GPA calculator with credit hours. Calculate semester GPA, cumulative GPA, and overall college GPA instantly with accurate grade point average calculator.',
                        link: 'education-and-exam-tools/gpa-tools/college-gpa-calculator',
                        icon: <CollegeGPAIcon />,
                        gradientColors: { from: '#3b82f6', to: '#8b5cf6' },
                    },
                    {
                        title: 'LSAC CAS GPA Calculator',
                        description: 'Official Law School Admission Council (LSAC) GPA calculator with A+ (4.33) support. Calculate your CAS GPA for law school applications.',
                        link: 'education-and-exam-tools/gpa-tools/lsac-gpa-calculator',
                        icon: <LSACGPAIcon />,
                        gradientColors: { from: '#6366f1', to: '#ec4899' },
                    },
                    {
                        title: 'CSU GPA Calculator',
                        description: 'Official California State University GPA calculator with A-G course verification. Calculate your CSU eligibility GPA with honors weighting caps and 10th-11th grade restrictions.',
                        link: 'education-and-exam-tools/gpa-tools/csu-gpa-calculator',
                        icon: <CSUGPAIcon />,
                        gradientColors: { from: '#dc2626', to: '#ea580c' },
                    },
                    {
                        title: 'High School GPA Calculator',
                        description: 'Free high school GPA calculator with weighted & unweighted options. Calculate semester GPA with AP, Honors courses. Track multiple semesters instantly.',
                        link: 'education-and-exam-tools/gpa-tools/high-school-gpa-calculator',
                        icon: <HighSchoolGPAIcon />,
                        gradientColors: { from: '#3b82f6', to: '#a855f7' },
                    },
                    {
                        title: 'Semester GPA Calculator',
                        description: 'Free semester GPA calculator for UK, Australia, Germany. Calculate semester GPA, cumulative GPA with accurate grade point conversions. Multi-semester tracking with print/download reports.',
                        link: 'education-and-exam-tools/gpa-tools/semester-gpa-calculator',
                        icon: <SemesterGPAIcon />,
                        gradientColors: { from: '#10b981', to: '#06b6d4' },
                    },
                    {
                        title: 'Weighted GPA Calculator',
                        description: 'Free weighted GPA calculator with AP, Honors, and IB course support. Calculate weighted GPA on 5.0 scale with +1.0 for AP/IB, +0.5 for Honors. Instant results with unweighted comparison.',
                        link: 'education-and-exam-tools/gpa-tools/weighted-gpa-calculator',
                        icon: <WeightedGPAIcon />,
                        gradientColors: { from: '#8b5cf6', to: '#ec4899' },
                    },
                    {
                        title: 'Unweighted GPA Calculator',
                        description: 'Free unweighted GPA calculator on standard 4.0 scale. Calculate GPA for high school and college with instant results. Used globally in UK, Australia, Germany, and USA.',
                        link: 'education-and-exam-tools/gpa-tools/unweighted-gpa-calculator',
                        icon: <UnweightedGPAIcon />,
                        gradientColors: { from: '#3b82f6', to: '#06b6d4' },
                    },
                ]
            },
            {
                slug: 'university-gpa-tools',
                title: 'University GPA Tools',
                tools: [
                    {
                        title: 'Berkeley GPA Calculator',
                        description: 'Calculate your UC Berkeley GPA with accurate grade point conversions. Supports letter grades, plus/minus system, and weighted courses.',
                        link: 'education-and-exam-tools/university-gpa-tools/berkeley-gpa-calculator',
                        icon: <BerkeleyGPAIcon />,
                        gradientColors: { from: '#0033A0', to: '#FDB515' },
                    },
                    {
                        title: 'Rutgers GPA Calculator',
                        description: 'Calculate your Rutgers University GPA using official grade scales. Engineering major average calculator with scenario planner and honors graduation requirements.',
                        link: 'education-and-exam-tools/university-gpa-tools/rutgers-gpa-calculator',
                        icon: <RutgersGPAIcon />,
                        gradientColors: { from: '#cc0033', to: '#ff0000' },
                    },
                    {
                        title: 'UTA GPA Calculator',
                        description: 'University of Texas at Arlington GPA calculator with Grade Point Deficiency (GPD) computation. Calculate semester GPA, raise cumulative GPA, and plan academic probation removal.',
                        link: 'education-and-exam-tools/university-gpa-tools/uta-gpa-calculator',
                        icon: <UTAGPAIcon />,
                        gradientColors: { from: '#FF8200', to: '#0064B0' },
                    },
                    {
                        title: 'UVA GPA Calculator',
                        description: 'University of Virginia GPA calculator with official UVA grade scale (A+ = 4.0). Calculate semester GPA, cumulative GPA, and track Latin honors eligibility for Cum Laude, Magna Cum Laude, and Summa Cum Laude.',
                        link: 'education-and-exam-tools/university-gpa-tools/uva-gpa-calculator',
                        icon: <UVAGPAIcon />,
                        gradientColors: { from: '#E57200', to: '#232D4B' },
                    },
                    {
                        title: 'ASU GPA Calculator',
                        description: 'Arizona State University GPA calculator with official ASU grading scale. Calculate current GPA, projected semester GPA, and cumulative GPA. Supports ASU\'s unique E grade system.',
                        link: 'education-and-exam-tools/university-gpa-tools/asu-gpa-calculator',
                        icon: <ASUGPAIcon />,
                        gradientColors: { from: '#8C1D40', to: '#FFC627' },
                    },
                ],
            },
            {
                slug: 'admission-tools',
                title: 'Admission Tools',
                tools: [
                    {
                        title: 'Personal Statement Character Counter',
                        description: 'Free character counter for UCAS personal statements and college applications. Track 4000-character limit, word count, line count instantly for UK university applications.',
                        link: 'education-and-exam-tools/admission-tools/personal-statement-character-counter',
                        icon: <PersonalStatementCounterIcon />,
                        gradientColors: { from: '#ec4899', to: '#8b5cf6' },
                    },
                    {
                        title: 'Common App Essay Word Counter',
                        description: 'Free Common App essay word counter 2026. Track 650-word limit with real-time character count, sentence analysis, and reading time for college application personal statements.',
                        link: 'education-and-exam-tools/admission-tools/common-app-essay-word-counter',
                        icon: <CommonAppWordCounterIcon />,
                        gradientColors: { from: '#3b82f6', to: '#8b5cf6' },
                    },
                    {
                        title: 'UCAS Points Calculator 2026',
                        description: 'Free UCAS points calculator for UK university admissions. Convert A-Levels, BTEC, IB, Scottish Highers, T-Levels to UCAS tariff points instantly. Official 2026 system.',
                        link: 'education-and-exam-tools/admission-tools/ucas-points-calculator',
                        icon: <UCASPointsIcon />,
                        gradientColors: { from: '#10b981', to: '#3b82f6' },
                    },
                    {
                        title: 'Australia Student Visa Fee Calculator 2026',
                        description: 'Free Australia student visa fee calculator for 2026. Calculate Subclass 500 visa costs including application fees, biometrics, health checks, OSHC insurance. Accurate cost estimator.',
                        link: 'education-and-exam-tools/admission-tools/student-visa-fee-calculator-australia',
                        icon: <StudentVisaFeeCalculatorAustraliaIcon />,
                        gradientColors: { from: '#10b981', to: '#14b8a6' },
                    },
                    {
                        title: 'College Admissions Calculator',
                        description: 'Free college admissions calculator. Calculate admission chances based on GPA, SAT/ACT scores, and extracurriculars. Find safety, match, and reach schools instantly.',
                        link: 'education-and-exam-tools/admission-tools/college-admissions-calculator',
                        icon: <CollegeAdmissionsCalculatorIcon />,
                        gradientColors: { from: '#6366f1', to: '#a855f7' },
                    },
                ]
            },
        ]
    },
    {
        slug: 'construction-and-engineering-tools',
        title: 'Construction & Engineering Tools',
        description: 'Professional calculators for construction projects, engineering calculations, and DIY home improvements.',
        icon: <ConstructionEngineeringIcon />,
        tools: [
            {
                title: 'Fill Dirt Calculator',
                description: 'Calculate the amount of fill dirt needed for your landscaping or construction project. Supports various measurement units and provides cost estimates.',
                link: 'construction-and-engineering-tools/fill-dirt-calculator',
                icon: <FillDirtIcon />,
                gradientColors: { from: '#92400e', to: '#f59e0b' }, // Brown to Amber
            },
            {
                title: 'Quilt Backing Calculator',
                description: 'Calculate fabric requirements for quilt backing. Perfect for quilters to determine backing sizes and fabric yardage needed.',
                link: 'construction-and-engineering-tools/quilt-backing-calculator',
                icon: <QuiltBackingIcon />,
                gradientColors: { from: '#ec4899', to: '#f59e0b' }, // Pink to Amber
            },
            {
                title: 'Power to Mass Ratio Calculator',
                description: 'Calculate power-to-weight ratio for vehicles, engines, and machinery. Essential for performance analysis and engineering calculations.',
                link: 'construction-and-engineering-tools/power-to-mass-ratio-calculator',
                icon: <PowerToMassIcon />,
                gradientColors: { from: '#ef4444', to: '#f59e0b' }, // Red to Amber
            },
        ]
    },
    {
        slug: 'audio-and-media-tools',
        title: 'Audio & Media Tools',
        description: 'Powerful tools for audio processing, media calculations, and content creation.',
        icon: <AudioMediaIcon />,
        tools: [
            {
                title: 'Audiobook Speed Calculator',
                description: 'Calculate how long it takes to finish an audiobook at different playback speeds. Save time with optimized listening schedules.',
                link: 'audio-and-media-tools/audiobook-speed-calculator',
                icon: <AudiobookSpeedIcon />,
                gradientColors: { from: '#a855f7', to: '#ec4899' }, // Purple to Pink
            },
            {
                title: 'Reverb Calculator',
                description: 'Calculate optimal reverb time (RT60) for rooms and recording studios. Essential tool for acoustics and audio engineering.',
                link: 'audio-and-media-tools/reverb-calculator',
                icon: <ReverbIcon />,
                gradientColors: { from: '#06b6d4', to: '#8b5cf6' }, // Cyan to Purple
            },
        ]
    },
];
