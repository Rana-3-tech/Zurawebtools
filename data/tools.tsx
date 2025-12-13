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

const CumulativeGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cumulativeGPAIconTitle">
        <title id="cumulativeGPAIconTitle">Cumulative GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradCumulativeGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradCumulativeGPA)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradCumulativeGPA)" opacity="0.8" />
        <circle cx="12" cy="9" r="2" fill="#ffffff" opacity="0.9" />
        <path d="M8 13 L12 11 L16 13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
);

const LetterGradeGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="letterGradeGPAIconTitle">
        <title id="letterGradeGPAIconTitle">Letter Grade GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradLetterGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#toolGradLetterGPA)" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">A</text>
        <path d="M8 20 L12 18 L16 20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
);

const NursingSchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="nursingGPAIconTitle">
        <title id="nursingGPAIconTitle">Nursing School GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradNursingGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f43f5e" /><stop offset="50%" stopColor="#ec4899" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" fill="url(#toolGradNursingGPA)" opacity="0.2"/>
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="url(#toolGradNursingGPA)" strokeWidth="2" fill="none"/>
        <path d="M12 7v10M7 12h10" stroke="url(#toolGradNursingGPA)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const MedicalSchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="medicalGPAIconTitle">
        <title id="medicalGPAIconTitle">Medical School GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradMedicalGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6" /><stop offset="50%" stopColor="#6366F1" /><stop offset="100%" stopColor="#8B5CF6" /></linearGradient></defs>
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" fill="url(#toolGradMedicalGPA)" opacity="0.2"/>
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="url(#toolGradMedicalGPA)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TransferGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="transferGPAIconTitle">
        <title id="transferGPAIconTitle">Transfer GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradTransferGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366F1" /><stop offset="50%" stopColor="#8B5CF6" /><stop offset="100%" stopColor="#A855F7" /></linearGradient></defs>
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="url(#toolGradTransferGPA)" opacity="0.2"/>
        <path d="M13 7h8m0 0l-3-3m3 3l-3 3M11 17H3m0 0l3 3m-3-3l3-3" stroke="url(#toolGradTransferGPA)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const GraduateSchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="graduateSchoolGPAIconTitle">
        <title id="graduateSchoolGPAIconTitle">Graduate School GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradGraduateGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#4F46E5" /><stop offset="50%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#9333EA" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradGraduateGPA)" opacity="0.3"/>
        <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="url(#toolGradGraduateGPA)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" fill="url(#toolGradGraduateGPA)" opacity="0.7"/>
        <circle cx="16" cy="8" r="2" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5"/>
        <text x="16" y="9.5" fontSize="2.5" fontWeight="bold" fill="#78350F" textAnchor="middle">3.0</text>
    </svg>
);

const PharmacySchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pharmacySchoolGPAIconTitle">
        <title id="pharmacySchoolGPAIconTitle">Pharmacy School GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradPharmacyGPA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#14B8A6" /><stop offset="50%" stopColor="#06B6D4" /><stop offset="100%" stopColor="#0EA5E9" /></linearGradient></defs>
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" fill="url(#toolGradPharmacyGPA)" opacity="0.3"/>
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="url(#toolGradPharmacyGPA)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17" cy="7" r="2.5" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
        <text x="17" y="8.5" fontSize="2.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">3.0</text>
    </svg>
);

const PASchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="paSchoolGPAIconTitle">
        <title id="paSchoolGPAIconTitle">PA School GPA Calculator Icon</title>
        <defs>
            <linearGradient id="toolGradPASchoolGPA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
        </defs>
        <path d="M12 2C10.9 2 10 2.9 10 4V5C8.34 5 7 6.34 7 8V15C7 16.66 8.34 18 10 18H14C15.66 18 17 16.66 17 15V8C17 6.34 15.66 5 14 5V4C14 2.9 13.1 2 12 2ZM12 4C12 4 12 4 12 4C12 4 12 4 12 4Z" fill="url(#toolGradPASchoolGPA)" fillOpacity="0.3"/>
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke="url(#toolGradPASchoolGPA)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17" cy="7" r="2.5" fill="#10B981" stroke="#059669" strokeWidth="1.5"/>
        <text x="17" y="8.5" fontSize="2.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">3.0</text>
    </svg>
);

const DentalSchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="dentalGPAIconTitle">
        <title id="dentalGPAIconTitle">Dental School GPA Calculator Icon</title>
        <defs>
            <linearGradient id="toolGradDentalGPA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#toolGradDentalGPA)" opacity="0.2"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="url(#toolGradDentalGPA)" strokeWidth="2" fill="none"/>
        <circle cx="9" cy="10" r="1.5" fill="url(#toolGradDentalGPA)"/>
        <circle cx="15" cy="10" r="1.5" fill="url(#toolGradDentalGPA)"/>
        <path d="M8 14 Q12 17 16 14" stroke="url(#toolGradDentalGPA)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M9.5 15 L10 18 M14.5 15 L14 18" stroke="url(#toolGradDentalGPA)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const VeterinarySchoolGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="veterinaryGPAIconTitle">
        <title id="veterinaryGPAIconTitle">Veterinary School GPA Calculator Icon</title>
        <defs>
            <linearGradient id="toolGradVeterinaryGPA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#toolGradVeterinaryGPA)" opacity="0.15"/>
        <path d="M12 8c-1.1 0-2 .9-2 2v1c0 .55-.45 1-1 1s-1-.45-1-1V8.5C8 7.67 8.67 7 9.5 7S11 7.67 11 8.5V9c0-.55.45-1 1-1s1 .45 1 1v-.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-1.1-.9-2-2-2z" fill="url(#toolGradVeterinaryGPA)"/>
        <circle cx="9" cy="10" r="1" fill="url(#toolGradVeterinaryGPA)"/>
        <circle cx="15" cy="10" r="1" fill="url(#toolGradVeterinaryGPA)"/>
        <path d="M12 14c-2 0-3.5 1-4 2h8c-.5-1-2-2-4-2z" fill="url(#toolGradVeterinaryGPA)" opacity="0.7"/>
        <path d="M6 15c.5.5 1.5 1 2 1M18 15c-.5.5-1.5 1-2 1" stroke="url(#toolGradVeterinaryGPA)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const EngineeringGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="engineeringGPAIconTitle">
        <title id="engineeringGPAIconTitle">Engineering GPA Calculator Icon</title>
        <defs>
            <linearGradient id="toolGradEngineeringGPA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
        </defs>
        {/* Graduation cap */}
        <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L23 9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradEngineeringGPA)" opacity="0.2"/>
        {/* Gear/cog symbol */}
        <path d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12C14 13.1 13.1 14 12 14Z" fill="url(#toolGradEngineeringGPA)"/>
        {/* Engineering blueprint lines */}
        <line x1="4" y1="19" x2="20" y2="19" stroke="url(#toolGradEngineeringGPA)" strokeWidth="0.5" strokeDasharray="2,1"/>
        <line x1="4" y1="21" x2="20" y2="21" stroke="url(#toolGradEngineeringGPA)" strokeWidth="0.5" strokeDasharray="2,1"/>
    </svg>
);

const GPARaiseIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="gpaRaiseIconTitle">
        <title id="gpaRaiseIconTitle">GPA Raise Calculator Icon</title>
        <defs>
            <linearGradient id="toolGradGPARaise" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
            </linearGradient>
        </defs>
        {/* Upward arrow/trend line */}
        <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="url(#toolGradGPARaise)"/>
        {/* Progress bars */}
        <rect x="3" y="20" width="4" height="2" fill="url(#toolGradGPARaise)" opacity="0.4"/>
        <rect x="8" y="18" width="4" height="4" fill="url(#toolGradGPARaise)" opacity="0.6"/>
        <rect x="13" y="16" width="4" height="6" fill="url(#toolGradGPARaise)" opacity="0.8"/>
        <rect x="18" y="14" width="4" height="8" fill="url(#toolGradGPARaise)"/>
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

const ClassRankIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="classRankIconTitle">
        <title id="classRankIconTitle">Class Rank Calculator Icon</title>
        <defs><linearGradient id="toolGradClassRank" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="50%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#toolGradClassRank)" />
        <circle cx="12" cy="10.5" r="2.5" fill="white" />
        <text x="12" y="11.8" fontSize="2.5" fill="#6366f1" textAnchor="middle" fontWeight="bold">1</text>
    </svg>
);

const CoalitionAppWordCounterIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="coalitionAppIconTitle">
        <title id="coalitionAppIconTitle">Coalition App Word Counter Icon</title>
        <defs><linearGradient id="toolGradCoalitionApp" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316" /><stop offset="50%" stopColor="#ea580c" /><stop offset="100%" stopColor="#dc2626" /></linearGradient></defs>
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="url(#toolGradCoalitionApp)" />
        <path d="M14 2V8H20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="13" r="3.5" fill="white" />
        <path d="M9 13L10.5 14.5L13.5 11.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="16" width="7" height="5" rx="1" fill="#10b981" />
        <text x="17.5" y="19.5" fontSize="3.5" fill="white" textAnchor="middle" fontWeight="bold">650</text>
    </svg>
);

const CollegeApplicationFeeCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="collegeFeeCalcIconTitle">
        <title id="collegeFeeCalcIconTitle">College Application Fee Calculator Icon</title>
        <defs><linearGradient id="toolGradCollegeFeeCalc" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2563eb" /><stop offset="50%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#0ea5e9" /></linearGradient></defs>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="url(#toolGradCollegeFeeCalc)" />
        <path d="M12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="url(#toolGradCollegeFeeCalc)" />
        <text x="12" y="9" fontSize="3" fill="#2563eb" textAnchor="middle" fontWeight="bold">$</text>
        <circle cx="18" cy="6" r="3" fill="#10b981" />
        <path d="M17 6L17.5 6.5L19 5" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CollegeEssayLengthCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="essayLengthCalcIconTitle">
        <title id="essayLengthCalcIconTitle">College Essay Length Calculator Icon</title>
        <defs><linearGradient id="toolGradEssayLength" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="50%" stopColor="#ec4899" /><stop offset="100%" stopColor="#f97316" /></linearGradient></defs>
        <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#toolGradEssayLength)" opacity="0.2" />
        <path d="M9 7H15M9 11H15M9 15H13" stroke="url(#toolGradEssayLength)" strokeWidth="2" strokeLinecap="round" />
        <rect x="16" y="14" width="5" height="7" rx="1" fill="url(#toolGradEssayLength)" />
        <text x="18.5" y="18" fontSize="3" fill="white" textAnchor="middle" fontWeight="bold">650</text>
        <circle cx="6" cy="7" r="1" fill="#8b5cf6" />
        <circle cx="6" cy="11" r="1" fill="#ec4899" />
        <circle cx="6" cy="15" r="1" fill="#f97316" />
    </svg>
);

const CSSProfileCostCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cssProfileIconTitle">
        <title id="cssProfileIconTitle">CSS Profile Cost Calculator Icon</title>
        <defs><linearGradient id="toolGradCSSProfile" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
        <circle cx="12" cy="12" r="9" fill="url(#toolGradCSSProfile)" opacity="0.2" />
        <path d="M12 6V12L16 14" stroke="url(#toolGradCSSProfile)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20C8 20 7 19 7 17C7 15 8 14 8 14M16 20C16 20 17 19 17 17C17 15 16 14 16 14" stroke="url(#toolGradCSSProfile)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="15" y="3" width="7" height="5" rx="1" fill="#10b981" />
        <text x="18.5" y="6.5" fontSize="3.5" fill="white" textAnchor="middle" fontWeight="bold">$25</text>
        <circle cx="5" cy="12" r="2" fill="#3b82f6" />
        <text x="5" y="13" fontSize="2" fill="white" textAnchor="middle" fontWeight="bold">$</text>
    </svg>
);

const EarlyDecisionActionCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="edEaIconTitle">
        <title id="edEaIconTitle">Early Decision vs Early Action Calculator Icon</title>
        <defs><linearGradient id="toolGradEDEA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="50%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#ec4899" /></linearGradient></defs>
        <rect x="2" y="4" width="9" height="16" rx="1.5" fill="url(#toolGradEDEA)" opacity="0.3" />
        <rect x="13" y="4" width="9" height="16" rx="1.5" fill="url(#toolGradEDEA)" opacity="0.3" />
        <path d="M2 9H11M13 9H22" stroke="url(#toolGradEDEA)" strokeWidth="1.5" />
        <text x="6.5" y="7.5" fontSize="3" fill="#3b82f6" textAnchor="middle" fontWeight="bold">ED</text>
        <text x="17.5" y="7.5" fontSize="3" fill="#ec4899" textAnchor="middle" fontWeight="bold">EA</text>
        <circle cx="6.5" cy="13" r="2.5" fill="#3b82f6" />
        <text x="6.5" y="14.5" fontSize="3" fill="white" textAnchor="middle" fontWeight="bold">✓</text>
        <circle cx="17.5" cy="13" r="2.5" fill="#ec4899" />
        <text x="17.5" y="14.5" fontSize="3" fill="white" textAnchor="middle" fontWeight="bold">✓</text>
        <rect x="3" y="17" width="7" height="2" rx="0.5" fill="#10b981" />
        <rect x="14" y="17" width="7" height="2" rx="0.5" fill="#fbbf24" />
    </svg>
);

const WaitlistAcceptanceCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="waitlistIconTitle">
        <title id="waitlistIconTitle">Waitlist Acceptance Calculator Icon</title>
        <defs><linearGradient id="toolGradWaitlist" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="50%" stopColor="#ec4899" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <rect x="3" y="4" width="18" height="16" rx="2" fill="url(#toolGradWaitlist)" opacity="0.2" />
        <path d="M3 8h18M3 12h18M3 16h18" stroke="url(#toolGradWaitlist)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7" cy="8" r="1.5" fill="#8b5cf6" />
        <circle cx="7" cy="12" r="1.5" fill="#ec4899" />
        <circle cx="7" cy="16" r="1.5" fill="#3b82f6" />
        <path d="M10 7h8M10 11h8M10 15h8" stroke="#6b7280" strokeWidth="1" strokeLinecap="round" />
        <circle cx="19" cy="19" r="3.5" fill="#10b981" />
        <path d="M17.5 19l1 1 2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

const DemonstratedInterestCalculatorIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="demonstratedInterestIconTitle">
        <title id="demonstratedInterestIconTitle">Demonstrated Interest Calculator Icon</title>
        <defs><linearGradient id="toolGradDemonstratedInterest" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#14b8a6" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
        <rect x="3" y="4" width="18" height="16" rx="2" fill="url(#toolGradDemonstratedInterest)" />
        <path d="M7 9L10 12L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="4" fill="#10b981" stroke="white" strokeWidth="1.5" />
        <path d="M16.5 18L17.5 19L19.5 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UCLAGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="uclaGPAIconTitle">
        <title id="uclaGPAIconTitle">UCLA GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradUCLA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2774AE" /><stop offset="100%" stopColor="#FFD100" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradUCLA)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradUCLA)" opacity="0.8" />
        <circle cx="12" cy="9" r="2.5" fill="#FFD100" />
        <text x="12" y="10.5" fontSize="3" fill="#2774AE" textAnchor="middle" fontWeight="bold">A</text>
    </svg>
);

const USCGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="uscGPAIconTitle">
        <title id="uscGPAIconTitle">USC GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradUSC" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#990000" /><stop offset="100%" stopColor="#FFCC00" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradUSC)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradUSC)" opacity="0.8" />
        <circle cx="12" cy="9" r="2.5" fill="#FFCC00" />
        <text x="12" y="10.5" fontSize="3" fill="#990000" textAnchor="middle" fontWeight="bold">A</text>
    </svg>
);

const NYUGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="nyuGPAIconTitle">
        <title id="nyuGPAIconTitle">NYU GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradNYU" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#57068C" /><stop offset="100%" stopColor="#8900E1" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradNYU)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradNYU)" opacity="0.8" />
        <circle cx="12" cy="9" r="2.5" fill="#8900E1" />
        <text x="12" y="10.5" fontSize="3" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">A</text>
    </svg>
);

const UMichGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="umichGPAIconTitle">
        <title id="umichGPAIconTitle">UMich GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradUMich" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00274C" /><stop offset="100%" stopColor="#FFCB05" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradUMich)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradUMich)" opacity="0.8" />
        <circle cx="12" cy="9" r="2.5" fill="#FFCB05" />
        <text x="12" y="10.5" fontSize="3" fill="#00274C" textAnchor="middle" fontWeight="bold">M</text>
    </svg>
);

const UNCGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="uncGPAIconTitle">
        <title id="uncGPAIconTitle">UNC Chapel Hill GPA Calculator Icon</title>
        <defs><linearGradient id="toolGradUNC" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#13294B" /><stop offset="50%" stopColor="#7BAFD4" /><stop offset="100%" stopColor="#4B9CD3" /></linearGradient></defs>
        <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9Z" fill="url(#toolGradUNC)" />
        <path d="M17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="url(#toolGradUNC)" opacity="0.8" />
        <circle cx="12" cy="9" r="2.5" fill="#7BAFD4" />
        <text x="12" y="10.5" fontSize="3" fill="#13294B" textAnchor="middle" fontWeight="bold">A</text>
    </svg>
);

// UT Austin GPA Icon - Burnt Orange gradient with Longhorns theme
const UTAustinGPAIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="utAustinIconTitle">
        <title id="utAustinIconTitle">UT Austin GPA Calculator</title>
        <defs>
            <linearGradient id="utAustinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BF5700" />
                <stop offset="50%" stopColor="#FF8C42" />
                <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
        </defs>
        <rect x="4" y="3" width="16" height="18" rx="1" stroke="url(#utAustinGrad)" strokeWidth="1.5" fill="none"/>
        <path d="M4 7 L20 7" stroke="url(#utAustinGrad)" strokeWidth="1.5"/>
        <circle cx="12" cy="14" r="5" fill="url(#utAustinGrad)"/>
        <text x="12" y="10.5" fontSize="3" fill="#BF5700" textAnchor="middle" fontWeight="bold">A</text>
        <path d="M10 14 L11.5 16 L14 12" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
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
        slug: 'education-and-exam-tools',
        title: 'Education & Exam Tools',
        description: 'Essential calculators and tools for students, teachers, and academic professionals.',
        icon: <EducationExamIcon />,
        tools: [],
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
                    {
                        title: 'Cumulative GPA Calculator',
                        description: 'Free cumulative GPA calculator to track overall academic performance across multiple semesters. Calculate lifetime GPA with total credits earned for college and high school students.',
                        link: 'education-and-exam-tools/gpa-tools/cumulative-gpa-calculator',
                        icon: <CumulativeGPAIcon />,
                        gradientColors: { from: '#10b981', to: '#3b82f6' },
                    },
                    {
                        title: 'GPA Calculator with Letter Grades',
                        description: 'Convert letter grades (A, B, C) to GPA on standard 4.0 scale. Free online calculator supporting A+, A-, B+ grades with credit hours for college and high school students.',
                        link: 'education-and-exam-tools/gpa-tools/letter-grade-gpa-calculator',
                        icon: <LetterGradeGPAIcon />,
                        gradientColors: { from: '#8b5cf6', to: '#ec4899' },
                    },
                    {
                        title: 'Nursing School GPA Calculator',
                        description: 'Calculate nursing school prerequisite GPA, science GPA, and overall GPA for BSN and ADN applications. Free calculator with competitive analysis and program requirements guide.',
                        link: 'education-and-exam-tools/gpa-tools/nursing-school-gpa-calculator',
                        icon: <NursingSchoolGPAIcon />,
                        gradientColors: { from: '#f43f5e', to: '#a855f7' },
                    },
                    {
                        title: 'Medical School GPA Calculator (AMCAS)',
                        description: 'Calculate AMCAS GPA for medical school applications with separate BCPM (Biology, Chemistry, Physics, Math) and AO tracking. Includes retake policy and competitive analysis for MD and DO programs.',
                        link: 'education-and-exam-tools/gpa-tools/medical-school-gpa-calculator',
                        icon: <MedicalSchoolGPAIcon />,
                        gradientColors: { from: '#3B82F6', to: '#8B5CF6' },
                    },
                    {
                        title: 'Transfer GPA Calculator',
                        description: 'Calculate transfer GPA when moving between colleges with multiple institutional policies: Fresh Start (GPA resets), Combined (both institutions), or Weighted (transferred credits only). Track transfer credit limits.',
                        link: 'education-and-exam-tools/gpa-tools/transfer-gpa-calculator',
                        icon: <TransferGPAIcon />,
                        gradientColors: { from: '#6366F1', to: '#A855F7' },
                    },
                    {
                        title: 'Graduate School GPA Calculator',
                        description: 'Calculate graduate GPA for Master\'s, PhD, and Doctoral programs with 3.0 minimum requirement. Track coursework vs research GPA, thesis credits, academic standing, honors eligibility, and assistantship qualification.',
                        link: 'education-and-exam-tools/gpa-tools/graduate-school-gpa-calculator',
                        icon: <GraduateSchoolGPAIcon />,
                        gradientColors: { from: '#4F46E5', to: '#7C3AED' },
                    },
                    {
                        title: 'Pharmacy School GPA Calculator',
                        description: 'Calculate PharmD and pre-pharmacy GPA with BCPM science courses separation. Track NAPLEX eligibility (3.0+), Rho Chi Honor Society qualification, and pharmacy residency competitiveness for PharmD programs.',
                        link: 'education-and-exam-tools/gpa-tools/pharmacy-school-gpa-calculator',
                        icon: <PharmacySchoolGPAIcon />,
                        gradientColors: { from: '#14B8A6', to: '#06B6D4' },
                    },
                    {
                        title: 'PA School GPA Calculator',
                        description: 'Free PA school GPA calculator. Calculate CASPA GPA with science BCPM and overall cumulative GPA for physician assistant programs. Track patient care hours.',
                        link: 'education-and-exam-tools/gpa-tools/pa-school-gpa-calculator',
                        icon: <PASchoolGPAIcon />,
                        gradientColors: { from: '#3b82f6', to: '#8b5cf6' },
                    },
                    {
                        title: 'Dental School GPA Calculator',
                        description: 'Free AADSAS dental school GPA calculator. Calculate science (BCP), non-science, and cumulative GPA for dental school applications with repeated course handling.',
                        link: 'education-and-exam-tools/gpa-tools/dental-school-gpa-calculator',
                        icon: <DentalSchoolGPAIcon />,
                        gradientColors: { from: '#06B6D4', to: '#3B82F6' },
                    },
                    {
                        title: 'Veterinary School GPA Calculator',
                        description: 'Free VMCAS veterinary school GPA calculator. Calculate science BCPM, non-science, cumulative, last 45 credits, and prerequisite GPA for veterinary medicine programs.',
                        link: 'education-and-exam-tools/gpa-tools/veterinary-school-gpa-calculator',
                        icon: <VeterinarySchoolGPAIcon />,
                        gradientColors: { from: '#10b981', to: '#14b8a6' },
                    },
                    {
                        title: 'Engineering GPA Calculator',
                        description: 'Free engineering GPA calculator for all disciplines. Calculate Major, Technical, Non-Technical, Cumulative, and Last 60 Credits GPA. ABET-compliant with graduate school readiness tracking.',
                        link: 'education-and-exam-tools/gpa-tools/engineering-gpa-calculator',
                        icon: <EngineeringGPAIcon />,
                        gradientColors: { from: '#1e40af', to: '#3b82f6' },
                    },
                    {
                        title: 'GPA Raise Calculator',
                        description: 'Free GPA improvement calculator. Calculate what grades you need to raise your GPA to target level. Get realistic scenarios, semester planning, and actionable steps for academic success.',
                        link: 'education-and-exam-tools/gpa-tools/gpa-raise-calculator',
                        icon: <GPARaiseIcon />,
                        gradientColors: { from: '#10b981', to: '#059669' },
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
                    {
                        title: 'UCLA GPA Calculator',
                        description: 'UCLA Bruins GPA calculator with official UCLA grading scale (A+ = 4.0). Calculate quarterly GPA, major GPA, and track Latin Honors eligibility (Summa Cum Laude, Magna Cum Laude, Cum Laude). Supports UCLA\'s Pass/No Pass system and Dean\'s List requirements.',
                        link: 'education-and-exam-tools/university-gpa-tools/ucla-gpa-calculator',
                        icon: <UCLAGPAIcon />,
                        gradientColors: { from: '#2774AE', to: '#FFD100' },
                    },
                    {
                        title: 'USC GPA Calculator',
                        description: 'USC Trojans GPA calculator with official USC grading scale (A+ = 4.0). Calculate semester GPA, major GPA, and track Latin Honors eligibility (Summa 3.9+, Magna 3.75+, Cum Laude 3.5+). Supports USC\'s Pass/No Pass system and Dean\'s List requirements (3.5+ with 14+ units).',
                        link: 'education-and-exam-tools/university-gpa-tools/usc-gpa-calculator',
                        icon: <USCGPAIcon />,
                        gradientColors: { from: '#990000', to: '#FFCC00' },
                    },
                    {
                        title: 'NYU GPA Calculator',
                        description: 'NYU Violets GPA calculator with official NYU grading scale (A = 4.0). Calculate semester GPA, cumulative GPA, and track Latin Honors eligibility (Summa 3.9+, Magna 3.7+, Cum Laude 3.5+). Supports NYU\'s plus/minus grading system and Dean\'s List requirements (3.5+ with 12+ credits).',
                        link: 'education-and-exam-tools/university-gpa-tools/nyu-gpa-calculator',
                        icon: <NYUGPAIcon />,
                        gradientColors: { from: '#57068C', to: '#8900E1' },
                    },
                    {
                        title: 'UMich GPA Calculator',
                        description: 'University of Michigan Wolverines GPA calculator with official UMich grading scale (A+ = 4.0). Calculate semester GPA, cumulative GPA, and track Latin Honors eligibility (Summa 3.85+, Magna 3.65+, Cum Laude 3.4+). Supports UMich\'s plus/minus grading system and Dean\'s List requirements (3.5+ with 12+ credits).',
                        link: 'education-and-exam-tools/university-gpa-tools/umich-gpa-calculator',
                        icon: <UMichGPAIcon />,
                        gradientColors: { from: '#00274C', to: '#FFCB05' },
                    },
                    {
                        title: 'UNC Chapel Hill GPA Calculator',
                        description: 'UNC Chapel Hill Tar Heels GPA calculator with official UNC grading scale (A+ = 4.0). Calculate semester GPA, cumulative GPA, and track Latin Honors eligibility (Summa 3.85+, Magna 3.65+, Cum Laude 3.5+). Supports UNC\'s plus/minus grading system and Dean\'s List requirements (3.5+ with 12+ credits).',
                        link: 'education-and-exam-tools/university-gpa-tools/unc-gpa-calculator',
                        icon: <UNCGPAIcon />,
                        gradientColors: { from: '#13294B', to: '#7BAFD4' },
                    },
                    {
                        title: 'UT Austin GPA Calculator',
                        description: 'UT Austin Longhorns GPA calculator with official UT grading scale (A = 4.0, A- = 3.67). Track Latin Honors (Highest 3.9+, High 3.7+, Honors 3.5+), Dean\'s List, and internal transfer requirements for McCombs and CS.',
                        link: 'education-and-exam-tools/university-gpa-tools/ut-austin-gpa-calculator',
                        icon: <UTAustinGPAIcon />,
                        gradientColors: { from: '#BF5700', to: '#FF8C42' },
                    },
                ],
            },
            {
                slug: 'admission-tools',
                title: 'Admission Tools',
                tools: [
                    {
                        title: 'College Application Fee Calculator',
                        description: 'Free college application fee calculator 2026. Calculate total costs including application fees ($50-$90), SAT/ACT score sending ($12-$15), transcripts, and CSS Profile. Check fee waiver eligibility instantly.',
                        link: 'education-and-exam-tools/admission-tools/college-application-fee-calculator',
                        icon: <CollegeApplicationFeeCalculatorIcon />,
                        gradientColors: { from: '#2563eb', to: '#06b6d4' },
                    },
                    {
                        title: 'College Essay Length Calculator',
                        description: 'Free college essay length calculator 2026. Track word & character limits for Common App (650 words), Coalition (250-650), UC PIQs (350 words), ApplyTexas, UCAS (4000 chars). Compare all platform requirements instantly.',
                        link: 'education-and-exam-tools/admission-tools/college-essay-length-calculator',
                        icon: <CollegeEssayLengthCalculatorIcon />,
                        gradientColors: { from: '#8b5cf6', to: '#f97316' },
                    },
                    {
                        title: 'CSS Profile Cost Calculator',
                        description: 'Free CSS Profile cost calculator 2026. Calculate College Board CSS Profile fees ($25 + $16 per school), check fee waiver eligibility by income, compare with FAFSA. 400+ schools require CSS Profile for financial aid.',
                        link: 'education-and-exam-tools/admission-tools/css-profile-cost-calculator',
                        icon: <CSSProfileCostCalculatorIcon />,
                        gradientColors: { from: '#10b981', to: '#8b5cf6' },
                    },
                    {
                        title: 'Early Decision vs Early Action Calculator',
                        description: 'Free Early Decision vs Early Action calculator 2026. Compare ED EA acceptance rates (2-4x higher than RD), deadlines, binding policies. Should you apply early decision or early action? Get personalized recommendations based on your situation.',
                        link: 'education-and-exam-tools/admission-tools/early-decision-action-calculator',
                        icon: <EarlyDecisionActionCalculatorIcon />,
                        gradientColors: { from: '#3b82f6', to: '#ec4899' },
                    },
                    {
                        title: 'Waitlist Acceptance Calculator',
                        description: 'Free college waitlist acceptance calculator 2026. Calculate your chances of getting off a waitlist with real data from 50+ top schools. Get personalized probability based on LOCI quality, demonstrated interest, academic profile. Includes Harvard, Stanford, MIT, Duke waitlist statistics.',
                        link: 'education-and-exam-tools/admission-tools/waitlist-acceptance-calculator',
                        icon: <WaitlistAcceptanceCalculatorIcon />,
                        gradientColors: { from: '#8b5cf6', to: '#3b82f6' },
                    },
                    {
                        title: 'Demonstrated Interest Calculator',
                        description: 'Free demonstrated interest calculator 2026. Calculate how campus visits, email engagement, interviews, and social media impact your college admissions chances. Track interest for 100+ schools. Find which colleges track interest (Emory, WashU, Case Western) vs. don\'t track (MIT, UCs). Get personalized interest score 0-100.',
                        link: 'education-and-exam-tools/admission-tools/demonstrated-interest-calculator',
                        icon: <DemonstratedInterestCalculatorIcon />,
                        gradientColors: { from: '#10b981', to: '#3b82f6' },
                    },
                    {
                        title: 'Coalition App Word Counter',
                        description: 'Free Coalition App essay word counter 2026. Track 250-650 word limits with real-time character count for Coalition Application essays. Supports all essay types for 150+ member colleges.',
                        link: 'education-and-exam-tools/admission-tools/coalition-app-word-counter',
                        icon: <CoalitionAppWordCounterIcon />,
                        gradientColors: { from: '#f97316', to: '#dc2626' },
                    },
                    {
                        title: 'Class Rank Calculator',
                        description: 'Free class rank calculator 2026. Calculate your percentile, decile, and quartile ranking instantly. Determine scholarship eligibility and college competitiveness. Used by 10,000+ students monthly.',
                        link: 'education-and-exam-tools/admission-tools/class-rank-calculator',
                        icon: <ClassRankIcon />,
                        gradientColors: { from: '#6366f1', to: '#a855f7' },
                    },
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
];
