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


export interface Category {
    slug: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    tools: Tool[];
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
                link: 'word-counter',
                icon: <WordCounterIcon />,
                gradientColors: { from: '#3b82f6', to: '#22d3ee' }, // Blue to Cyan
            },
            {
                title: 'Remove Extra Spaces from Text',
                description: 'Clean up your text by automatically removing unnecessary spaces, tabs, and line breaks. A simple tool for tidying up copied content.',
                link: 'remove-extra-spaces',
                icon: <RemoveSpacesIcon />,
                gradientColors: { from: '#10b981', to: '#14b8a6' }, // Green to Teal
            },
            {
                title: 'Online Case Converter',
                description: 'Easily convert text between UPPERCASE, lowercase, Title Case, and Sentence case with a single click.',
                link: 'case-converter',
                icon: <CaseConverterIcon />,
                gradientColors: { from: '#8b5cf6', to: '#ec4899' }, // Purple to Pink
            },
             {
                title: 'Lorem Ipsum Generator',
                description: 'Generate placeholder text for your design mockups and layouts. Customize by paragraphs, sentences, or words.',
                link: 'lorem-ipsum-generator',
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
                link: 'time-difference-calculator',
                icon: <TimeDifferenceIcon />,
                gradientColors: { from: '#d946ef', to: '#8b5cf6' }, // Fuchsia to Purple
            },
            {
                title: 'Percentage Change Calculator',
                description: 'Quickly calculate the percentage increase or decrease between two numbers. Ideal for finance, business, and math.',
                link: 'percentage-change-calculator',
                icon: <PercentageChangeIcon />,
                gradientColors: { from: '#22c55e', to: '#3b82f6' }, // Green to Blue
            },
            {
                title: 'Fabric Costing Calculator',
                description: 'Professional fabric costing tool for textile engineers. Calculate warp/weft weight, yarn consumption, and per-meter pricing with accurate cost breakdown.',
                link: 'fabric-costing-tool',
                icon: <FabricCostingIcon />,
                gradientColors: { from: '#f59e0b', to: '#ef4444' }, // Amber to Red
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
                link: 'hex-to-rgb-converter',
                icon: <HexToRgbIcon />,
                gradientColors: { from: '#ef4444', to: '#f59e0b' }, // Red to Amber
            },
            {
                title: 'Accessible Color Contrast Checker',
                description: 'Check color contrast ratios for accessibility compliance (WCAG AA/AAA). Essential for creating inclusive web designs.',
                link: 'accessible-color-contrast-checker',
                icon: <ContrastCheckerIcon />,
                gradientColors: { from: '#6366f1', to: '#a855f7' }, // Indigo to Purple
            },
            {
                title: 'CSS Shadow Generator',
                description: 'Create realistic box-shadow and text-shadow effects with live preview. Perfect for modern UI design and neumorphism.',
                link: 'shadow-css-generator',
                icon: <ShadowGeneratorIcon />,
                gradientColors: { from: '#8b5cf6', to: '#06b6d4' }, // Purple to Cyan
            },
            {
                title: 'Color Harmony Checker',
                description: 'Generate beautiful color palettes and harmonies using color theory. Perfect for designers creating cohesive color schemes.',
                link: 'color-harmony-checker',
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
                link: 'json-formatter',
                icon: <JsonFormatterIcon />,
                gradientColors: { from: '#06b6d4', to: '#3b82f6' }, // Cyan to Blue
            },
        ]
    },
];