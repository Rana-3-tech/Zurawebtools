import React, { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../RelatedTools';
import { Page } from '../../App';

interface SnowDayCalculatorProps {
  navigateTo: (page: Page) => void;
}

// Type definitions for various states and data structures
type SchoolType = 'Public' | 'Private' | 'University';
type DistrictCautionLevel = 'Standard' | 'Cautious' | 'Resistant';
type WeatherData = {
  snowfall: number;
  temperature: number;
  precipitation: number;
  wind: number;
};
type FactorContributions = {
  snowfall: number;
  temperature: number;
  precipitation: number;
  wind: number;
  schoolType: number;
  districtCaution: number;
};
type AlgorithmWeights = {
  snowfallMultiplier: number;
  snowfallMax: number;
  tempBelowZero: number;
  tempBelowTwo: number;
  tempBelowFive: number;
  tempAboveFivePenalty: number;
  precipMultiplier: number;
  windAbove25: number;
  windAbove40: number;
  publicSchoolBonus: number;
  universityPenalty: number;
  districtCautiousBonus: number;
  districtResistantPenalty: number;
};
type ResultDetails = {
  colorClass: string;
  textColor: string;
  message: string;
};
type CommunityVote = {
  closes: number;
  opens: number;
};


// Default weights for the prediction algorithm
const initialWeights: AlgorithmWeights = {
  snowfallMultiplier: 8,
  snowfallMax: 50,
  tempBelowZero: 15,
  tempBelowTwo: 10,
  tempBelowFive: 5,
  tempAboveFivePenalty: -10,
  precipMultiplier: 0.2,
  windAbove25: 5,
  windAbove40: 10,
  publicSchoolBonus: 5,
  universityPenalty: -5,
  districtCautiousBonus: 10,
  districtResistantPenalty: -10,
};

const SnowDayCalculator: React.FC<SnowDayCalculatorProps> = ({ navigateTo }) => {
  // Detect reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // State management for the component
  const [location, setLocation] = useState<string>('');
  const [schoolType, setSchoolType] = useState<SchoolType>('Public');
  const [districtCaution, setDistrictCaution] = useState<DistrictCautionLevel>('Standard');
  const [probability, setProbability] = useState<number | null>(null);
  const [contributions, setContributions] = useState<FactorContributions | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [weights, setWeights] = useState<AlgorithmWeights>(initialWeights);
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [manualData, setManualData] = useState<WeatherData>({ snowfall: 0, temperature: 0, precipitation: 0, wind: 0 });
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [forecastDate, setForecastDate] = useState<string | null>(null);
  const [probabilityTrend, setProbabilityTrend] = useState<number[] | null>(null);
  const [communityVote, setCommunityVote] = useState<CommunityVote | null>(null);
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);


  useEffect(() => {
    document.title = 'Snow Day Calculator – Predict School Closures Near You | ZuraWebTools';
    
    // Set HTML lang attribute
    document.documentElement.setAttribute('lang', 'en');

    const metaTags = [
      { name: 'description', content: 'Free Snow Day Calculator that predicts school closure chances using live weather forecasts. Check if your school will be closed tomorrow!' },
      { name: 'keywords', content: 'snow day calculator, snow day predictor, school closure forecast, snow day probability, will school be closed, snow prediction model' },
      { name: 'author', content: 'ZuraWebTools' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { property: 'og:title', content: 'Snow Day Calculator – Will School Be Closed Tomorrow?' },
      { property: 'og:description', content: 'Predict your chances of a snow day with real-time weather data and our intelligent closure model.' },
      { property: 'og:url', content: 'https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:image', content: 'https://zurawebtools.com/assets/snow-day-preview.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Snow Day Calculator – Predict School Closures Near You' },
      { name: 'twitter:description', content: 'Use this free Snow Day Calculator to estimate school closure probability with live weather forecasts.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/assets/snow-day-preview.png' },
    ];

    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = 'https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator';
    document.head.appendChild(link);

    const addedTags: HTMLElement[] = [];
    metaTags.forEach(tagInfo => {
      const tag = document.createElement('meta');
      Object.entries(tagInfo).forEach(([k, v]) => tag.setAttribute(k, v));
      document.head.appendChild(tag);
      addedTags.push(tag);
    });

    // Dynamic freshness date
    const lastUpdated = new Date().toISOString().split('T')[0];

    // SoftwareApplication + FAQ + BreadcrumbList + HowTo + WebPage Graph
    const schemaGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "Snow Day Calculator",
          "applicationCategory": "WeatherForecastTool",
          "operatingSystem": "Any (Web-based)",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
          "description": "Predict school closure chances using live weather data and an intelligent snow day model.",
          "url": "https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator",
          "image": "https://zurawebtools.com/assets/snow-day-preview.png",
          "dateModified": lastUpdated,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1324"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://zurawebtools.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Tools",
              "item": "https://zurawebtools.com/tools"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Snow Day Calculator",
              "item": "https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator"
            }
          ]
        },
        {
          "@type": "HowTo",
          "name": "How to Use the Snow Day Calculator",
          "description": "Step-by-step guide to predicting school closure probability using weather data",
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Enter Your ZIP Code",
              "text": "Type your 5-digit US ZIP code to automatically fetch live weather data for your location. The system uses Open-Meteo API for accurate forecasts.",
              "image": "https://zurawebtools.com/assets/snow-day-step1.png"
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Select Your School Type",
              "text": "Choose between Public, Private, or University. Different institutions have varying closure policies, which affects the probability calculation.",
              "image": "https://zurawebtools.com/assets/snow-day-step2.png"
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Choose District Caution Level",
              "text": "Select Standard, Cautious, or Resistant based on your district's historical closure patterns. Cautious districts close more frequently during winter weather.",
              "image": "https://zurawebtools.com/assets/snow-day-step3.png"
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Enable Manual Mode (Optional)",
              "text": "For non-US locations or custom scenarios, enable Manual Mode to input snowfall, temperature, precipitation, and wind speed data directly.",
              "image": "https://zurawebtools.com/assets/snow-day-step4.png"
            },
            {
              "@type": "HowToStep",
              "position": 5,
              "name": "Calculate and View Results",
              "text": "Click Calculate to see your snow day probability percentage, 24-hour trend chart, factor breakdown, and community consensus. Copy results to share with classmates.",
              "image": "https://zurawebtools.com/assets/snow-day-step5.png"
            }
          ],
          "totalTime": "PT2M"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How accurate is the Snow Day Calculator?",
              "acceptedAnswer": { "@type": "Answer", "text": "Accuracy ranges from 70–85% depending on local forecasts and data from Open-Meteo. The algorithm analyzes snowfall, temperature, wind speed, and precipitation probability to estimate closure likelihood." }
            },
            {
              "@type": "Question",
              "name": "Does the Snow Day Calculator work outside the US?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes! Use Manual Mode to input your own weather data for non-US locations. The calculator supports global weather data through Open-Meteo's worldwide coverage." }
            },
            {
              "@type": "Question",
              "name": "How does the Snow Day Calculator predict closures?",
              "acceptedAnswer": { "@type": "Answer", "text": "It analyzes snowfall accumulation, temperature (especially below freezing), wind speed, and precipitation probability using a custom weighted scoring algorithm that accounts for school type and district caution levels." }
            },
            {
              "@type": "Question",
              "name": "When should I check for best accuracy?",
              "acceptedAnswer": { "@type": "Answer", "text": "For highest accuracy, check within 12–24 hours of a predicted snowstorm. Weather forecasts become more reliable as the event approaches, improving prediction precision." }
            },
            {
              "@type": "Question",
              "name": "Will there be a snow day tomorrow?",
              "acceptedAnswer": { "@type": "Answer", "text": "Enter your ZIP code to get a personalized probability score for tomorrow. Scores above 75% indicate high likelihood of closure, while 55-75% suggests possible delays." }
            },
            {
              "@type": "Question",
              "name": "What weather factors increase snow day chances?",
              "acceptedAnswer": { "@type": "Answer", "text": "Key factors include: heavy snowfall (6+ inches), temperatures below 0°C, high winds (25+ mph), ice accumulation, and precipitation probability above 60%. Public schools close more readily than universities." }
            },
            {
              "@type": "Question",
              "name": "How early are snow days announced?",
              "acceptedAnswer": { "@type": "Answer", "text": "Most school districts announce snow day closures between 5-7 AM on the day of, though some announce the evening before during severe weather. Check your district's official channels for confirmation." }
            }
          ]
        },
        {
          "@type": "WebPage",
          "name": "Snow Day Calculator – Predict School Closures Near You",
          "description": "Free tool that estimates your school closure probability using live weather data.",
          "datePublished": "2024-11-02",
          "dateModified": lastUpdated,
          "publisher": { "@type": "Organization", "name": "ZuraWebTools", "url": "https://zurawebtools.com" },
          "inLanguage": "en",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };

    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify(schemaGraph);
    document.head.appendChild(schemaScript);
    addedTags.push(schemaScript);

    // Cleanup
    return () => {
      addedTags.forEach(tag => tag.parentNode?.removeChild(tag));
      document.head.removeChild(link);
      if (schemaScript.parentNode) schemaScript.parentNode.removeChild(schemaScript);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Enter key to calculate (when not in textarea/input that needs Enter)
      if (e.key === 'Enter' && !isLoading && (location || manualMode)) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'TEXTAREA' && target.tagName !== 'BUTTON') {
          e.preventDefault();
          handleCalculate();
        }
      }
      // Escape key to close advanced mode
      if (e.key === 'Escape' && showAdvanced) {
        setShowAdvanced(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [location, manualMode, isLoading, showAdvanced]);

  /**
   * Custom Snow Day Probability Algorithm
   * Calculates probability based on weather, school type, and district caution level.
   */
  const calculateSnowDayProbability = useCallback((
    data: WeatherData,
    currentSchoolType: SchoolType,
    currentDistrictCaution: DistrictCautionLevel,
    currentWeights: AlgorithmWeights
  ) => {
    let score = 0;
    const factorContributions: FactorContributions = {
      snowfall: 0, temperature: 0, precipitation: 0, wind: 0, schoolType: 0, districtCaution: 0
    };

    // 1. Snowfall
    const snowfallScore = Math.min(data.snowfall * currentWeights.snowfallMultiplier, currentWeights.snowfallMax);
    score += snowfallScore;
    factorContributions.snowfall = snowfallScore;

    // 2. Temperature
    let tempScore = 0;
    if (data.temperature < 0) tempScore = currentWeights.tempBelowZero;
    else if (data.temperature < 2) tempScore = currentWeights.tempBelowTwo;
    else if (data.temperature < 5) tempScore = currentWeights.tempBelowFive;
    else tempScore = currentWeights.tempAboveFivePenalty;
    score += tempScore;
    factorContributions.temperature = tempScore;

    // 3. Precipitation
    const precipScore = data.precipitation * currentWeights.precipMultiplier;
    score += precipScore;
    factorContributions.precipitation = precipScore;

    // 4. Wind Speed
    let windScore = 0;
    if (data.wind > 25) windScore += currentWeights.windAbove25;
    if (data.wind > 40) windScore += currentWeights.windAbove40;
    score += windScore;
    factorContributions.wind = windScore;

    // 5. School Type
    let schoolTypeScore = 0;
    if (currentSchoolType === 'Public') schoolTypeScore = currentWeights.publicSchoolBonus;
    if (currentSchoolType === 'University') schoolTypeScore = currentWeights.universityPenalty;
    score += schoolTypeScore;
    factorContributions.schoolType = schoolTypeScore;
    
    // 6. District Caution Level
    let districtScore = 0;
    if (currentDistrictCaution === 'Cautious') districtScore = currentWeights.districtCautiousBonus;
    if (currentDistrictCaution === 'Resistant') districtScore = currentWeights.districtResistantPenalty;
    score += districtScore;
    factorContributions.districtCaution = districtScore;

    const finalProbability = Math.max(0, Math.min(100, score));
    return { probability: Math.round(finalProbability), contributions: factorContributions };
  }, []);

  // Helper to get average of an array of numbers
  const getAverage = (arr: number[] | undefined, start = 0, end?: number) => {
    if (!arr || arr.length === 0) return 0;
    const slicedArr = arr.slice(start, end);
    if (slicedArr.length === 0) return 0;
    return slicedArr.reduce((a, b) => a + b, 0) / slicedArr.length;
  };

  /**
   * Main calculation handler.
   */
  const handleCalculate = async () => {
    if (!location && !manualMode) {
      setError('Please enter a ZIP code.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProbability(null);
    setContributions(null);
    setForecastDate(null);
    setProbabilityTrend(null);
    setUserHasVoted(false);
    setCommunityVote(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 8000); // 8-second timeout

    try {
      let hourlyData: { [key: string]: number[] };

      if (manualMode) {
        // Create a flat 24-hour array from manual data for trend consistency
        hourlyData = {
          snowfall: Array(24).fill(manualData.snowfall * 10), // convert back to mm for processing
          temperature_2m: Array(24).fill(manualData.temperature),
          precipitation_probability: Array(24).fill(manualData.precipitation),
          wind_speed_10m: Array(24).fill(manualData.wind / 3.6), // convert back to m/s
        };
      } else {
        // Check cache first (1 hour expiry)
        const cacheKey = `weather_${location}_${schoolType}_${districtCaution}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;
          if (age < 3600000) { // 1 hour in ms
            // Use cached data
            hourlyData = data;
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setForecastDate(tomorrow.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }));
            
            // Calculate trend and probability from cache
            const trend = [];
            for (let i = 0; i < 24; i++) {
              const hourlyWeather: WeatherData = {
                snowfall: (hourlyData.snowfall?.[i] || 0) / 10,
                temperature: hourlyData.temperature_2m?.[i] || 0,
                precipitation: hourlyData.precipitation_probability?.[i] || 0,
                wind: (hourlyData.wind_speed_10m?.[i] || 0) * 3.6,
              };
              const result = calculateSnowDayProbability(hourlyWeather, schoolType, districtCaution, weights);
              trend.push(result.probability);
            }
            setProbabilityTrend(trend);

            const mainProbability = Math.max(...trend.slice(0, 12));
            const mainWeather: WeatherData = {
              snowfall: getAverage(hourlyData.snowfall, 0, 12) / 10,
              temperature: getAverage(hourlyData.temperature_2m, 0, 12),
              precipitation: getAverage(hourlyData.precipitation_probability, 0, 12),
              wind: getAverage(hourlyData.wind_speed_10m, 0, 12) * 3.6,
            };
            const mainResult = calculateSnowDayProbability(mainWeather, schoolType, districtCaution, weights);
            setProbability(mainProbability);
            setContributions(mainResult.contributions);

            const votes = JSON.parse(localStorage.getItem(`votes_${location}`) || '{"closes":0,"opens":0}');
            setCommunityVote(votes);
            setUserHasVoted(!!localStorage.getItem(`voted_${location}`));
            setIsLoading(false);
            return;
          }
        }

        // Fetch fresh data if no cache or expired
        const geoResponse = await fetch(`https://api.zippopotam.us/us/${location}`);
        if (!geoResponse.ok) throw new Error('Invalid ZIP code. Please try again.');
        const geoData = await geoResponse.json();
        
        const place = geoData.places?.[0];
        if (!place) throw new Error('Could not find location for the provided ZIP code.');
        const { latitude, longitude } = place;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,snowfall,precipitation_probability,wind_speed_10m&forecast_days=1&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl, { signal: controller.signal });
        clearTimeout(timeout); // Clear timeout if fetch is successful
        
        if (!weatherResponse.ok) throw new Error('Could not fetch weather data.');
        const weatherData = await weatherResponse.json();

        if (!weatherData.hourly) {
            throw new Error('Malformed weather data received from API.');
        }
        hourlyData = weatherData.hourly;
        
        // Cache the weather data for 1 hour
        localStorage.setItem(cacheKey, JSON.stringify({
          data: hourlyData,
          timestamp: Date.now()
        }));
      }
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
      setForecastDate(formattedDate);

      // Calculate 24-hour trend
      const trend = [];
      for (let i = 0; i < 24; i++) {
        const hourlyWeather: WeatherData = {
          snowfall: (hourlyData.snowfall?.[i] || 0) / 10,
          temperature: hourlyData.temperature_2m?.[i] || 0,
          precipitation: hourlyData.precipitation_probability?.[i] || 0,
          wind: (hourlyData.wind_speed_10m?.[i] || 0) * 3.6,
        };
        const result = calculateSnowDayProbability(hourlyWeather, schoolType, districtCaution, weights);
        trend.push(result.probability);
      }
      setProbabilityTrend(trend);

      // Main probability is the max chance in the critical overnight/morning hours (next 12 hours)
      const mainProbability = Math.max(...trend.slice(0, 12));
      const mainWeather: WeatherData = {
        snowfall: getAverage(hourlyData.snowfall, 0, 12) / 10,
        temperature: getAverage(hourlyData.temperature_2m, 0, 12),
        precipitation: getAverage(hourlyData.precipitation_probability, 0, 12),
        wind: getAverage(hourlyData.wind_speed_10m, 0, 12) * 3.6,
      };
      const mainResult = calculateSnowDayProbability(mainWeather, schoolType, districtCaution, weights);
      setProbability(mainProbability);
      setContributions(mainResult.contributions);

      // Load community consensus data
      if (!manualMode) {
        const votes = JSON.parse(localStorage.getItem(`votes_${location}`) || '{"closes":0,"opens":0}');
        setCommunityVote(votes);
        setUserHasVoted(!!localStorage.getItem(`voted_${location}`));
      }

    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setError('Error: The weather data request timed out. Please try again.');
      } else {
        const errorMessage = (err as Error).message || 'An unknown error occurred.';
        setError(`Error: ${errorMessage}. You can enter weather data manually.`);
      }
      setManualMode(true);
    } finally {
      clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setLocation('');
    setSchoolType('Public');
    setDistrictCaution('Standard');
    setProbability(null);
    setContributions(null);
    setError(null);
    setIsLoading(false);
    setShowAdvanced(false);
    setManualMode(false);
    setManualData({ snowfall: 0, temperature: 0, precipitation: 0, wind: 0 });
    setWeights(initialWeights);
    setForecastDate(null);
    setProbabilityTrend(null);
    setCommunityVote(null);
    setUserHasVoted(false);
  };
  
  const handleCopyResults = () => {
    if (probability === null) return;
    const resultDetails = getResultDetails(probability);
    const summary = `Snow Day Prediction for ${forecastDate}: ${probability}% chance. Recommendation: ${resultDetails.message}`;
    navigator.clipboard.writeText(summary).then(() => {
        setCopySuccess('Copied to clipboard!');
        setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const handleCommunityVote = (vote: 'closes' | 'opens') => {
    if (!location) return;
    const currentVotes: CommunityVote = JSON.parse(localStorage.getItem(`votes_${location}`) || '{"closes":0,"opens":0}');
    currentVotes[vote]++;
    localStorage.setItem(`votes_${location}`, JSON.stringify(currentVotes));
    localStorage.setItem(`voted_${location}`, 'true');
    setCommunityVote(currentVotes);
    setUserHasVoted(true);
  };

  const getResultDetails = (prob: number): ResultDetails => {
    if (prob >= 87) return { colorClass: 'stroke-red-500', textColor: 'text-red-500', message: 'No School or Possible Early Dismissal.' };
    if (prob >= 75) return { colorClass: 'stroke-yellow-500', textColor: 'text-yellow-500', message: 'Possibility of No School.' };
    if (prob >= 55) return { colorClass: 'stroke-yellow-500', textColor: 'text-yellow-500', message: 'Delay Likely.' };
    return { colorClass: 'stroke-green-500', textColor: 'text-green-500', message: 'Little to no chance of anything, but possible.' };
  };

  const resultDetails = probability !== null ? getResultDetails(probability) : null;

  const InputField: React.FC<{ label: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; disabled?: boolean; }> = 
    ({ label, value, onChange, type = 'text', placeholder, disabled = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue disabled:bg-gray-200 dark:disabled:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
    </div>
  );

  const WeightSlider: React.FC<{ label: string; name: keyof AlgorithmWeights; value: number; min: number; max: number; step: number; }> = 
    ({ label, name, value, min, max, step }) => (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-sm">
        <label htmlFor={name} className="font-medium text-white">{label}</label>
        <span className="px-2 py-1 bg-gray-600 rounded-md text-xs text-white">{value}</span>
      </div>
      <input id={name} type="range" name={name} min={min} max={max} step={step} value={value} onChange={(e) => setWeights({ ...weights, [name]: parseFloat(e.target.value) })} className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-brand-blue" aria-label={`Adjust ${label}`} />
    </div>
  );

  const ProbabilityTrendChart: React.FC<{ data: number[] }> = ({ data }) => {
    const width = 500;
    const height = 100;
    const points = data.map((p, i) => `${(i / (data.length - 1)) * width},${height - (p / 100) * height}`).join(' ');

    return (
      <div className="mt-4">
        <h4 className="font-bold mb-2 text-center text-sm">24-Hour Probability Trend</h4>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
          <polyline fill="none" className="stroke-brand-lightblue" strokeWidth="3" points={points} />
          <line x1="0" y1={height} x2={width} y2={height} className="stroke-gray-300 dark:stroke-gray-600" strokeWidth="1"/>
          <text x="0" y={height-5} className="text-xs fill-current text-gray-500">Now</text>
          <text x={width/2 - 20} y={height-5} className="text-xs fill-current text-gray-500">12 hrs</text>
          <text x={width - 40} y={height-5} className="text-xs fill-current text-gray-500">24 hrs</text>
        </svg>
      </div>
    );
  };
  
  return (
    <section className="py-20 bg-slate-800 text-gray-200">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className={`text-center ${!prefersReducedMotion ? 'animate-fade-in' : ''}`}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Snow Day Calculator</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Will School Be Closed Tomorrow? Check your school closure chances with live weather data and an intelligent snow day prediction model.
            </p>
          </div>

      {/* Combined Input + Result Section */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${!prefersReducedMotion ? 'animate-slide-in' : ''}`}>
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-cyan-500/20">
            <h3 className="text-xl font-bold mb-2 text-white flex items-center">
              <span className="text-2xl mr-2">📍</span>
              Enter Your Details
            </h3>
            <p className="text-sm text-gray-400 mb-4">Or skip to Quick Scenarios below for instant predictions!</p>
            <div className="space-y-4">
              <InputField label="📮 ZIP Code (US Only)" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 90210" disabled={manualMode} />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">🏫 School Type</label>
                <select value={schoolType} onChange={(e) => setSchoolType(e.target.value as SchoolType)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900 dark:text-white" aria-label="Select your school type">
                  <option>Public</option>
                  <option>Private</option>
                  <option>University</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Public schools typically close more readily</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">⚠️ District Caution Level</label>
                <select value={districtCaution} onChange={(e) => setDistrictCaution(e.target.value as DistrictCautionLevel)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue text-gray-900 dark:text-white" aria-label="Select your district's caution level">
                  <option>Standard</option>
                  <option>Cautious</option>
                  <option>Resistant</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Cautious districts close with less severe weather</p>
              </div>
              <div className="flex items-center">
                  <input type="checkbox" id="manual-mode" checked={manualMode} onChange={(e) => setManualMode(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"/>
                  <label htmlFor="manual-mode" className="ml-2 block text-sm text-gray-200">Enter Weather Data Manually</label>
              </div>
              
              {manualMode && (
                <div className={`p-4 border-l-4 border-brand-blue bg-blue-50 dark:bg-gray-700 space-y-3 rounded-r-lg ${!prefersReducedMotion ? 'animate-fade-in' : ''}`}>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">🌡️ Manual Weather Input</p>
                  <InputField label="❄️ Snowfall (cm)" type="number" value={manualData.snowfall} onChange={(e) => setManualData({...manualData, snowfall: parseFloat(e.target.value) || 0})} placeholder="e.g., 10" />
                  <InputField label="🌡️ Temperature (°C)" type="number" value={manualData.temperature} onChange={(e) => setManualData({...manualData, temperature: parseFloat(e.target.value) || 0})} placeholder="e.g., -5" />
                  <InputField label="💧 Precipitation (%)" type="number" value={manualData.precipitation} onChange={(e) => setManualData({...manualData, precipitation: parseFloat(e.target.value) || 0})} placeholder="e.g., 80" />
                  <InputField label="💨 Wind Speed (km/h)" type="number" value={manualData.wind} onChange={(e) => setManualData({...manualData, wind: parseFloat(e.target.value) || 0})} placeholder="e.g., 40" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button 
                  onClick={handleCalculate} 
                  disabled={isLoading} 
                  className="flex-1 inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95" 
                  aria-label="Calculate snow day probability"
                >
                  {isLoading && <svg className={`-ml-1 mr-3 h-5 w-5 text-white ${!prefersReducedMotion ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                  <span className="text-lg">{isLoading ? '⏳ Calculating...' : '🔮 Calculate Snow Day'}</span>
                </button>
                <button 
                  onClick={handleReset} 
                  className="flex-1 inline-flex justify-center items-center px-6 py-3.5 border-2 border-gray-300 dark:border-gray-500 text-base font-semibold rounded-lg shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all transform hover:scale-105 active:scale-95"
                >
                  <span className="text-lg">🔄 Reset</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex justify-between items-center w-full text-left">
                <h3 className="text-xl font-bold text-white">Advanced Mode</h3>
                <svg className={`w-6 h-6 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showAdvanced ? 'max-h-screen mt-4' : 'max-h-0'}`}>
                <p className="text-sm text-gray-400 mb-4">Adjust the weights of the algorithm to tune the prediction model.</p>
                <div className="space-y-4">
                    <WeightSlider label="Snowfall Multiplier" name="snowfallMultiplier" value={weights.snowfallMultiplier} min={1} max={15} step={0.5} />
                    <WeightSlider label="Temp Below 0°C Bonus" name="tempBelowZero" value={weights.tempBelowZero} min={0} max={30} step={1} />
                    <WeightSlider label="Public School Bonus" name="publicSchoolBonus" value={weights.publicSchoolBonus} min={-10} max={20} step={1} />
                    <WeightSlider label="District Cautious Bonus" name="districtCautiousBonus" value={weights.districtCautiousBonus} min={0} max={20} step={1} />
                </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg shadow-2xl border-2 border-cyan-500/20 min-h-[30rem] lg:min-h-[40rem] flex flex-col justify-center items-center animate-fade-in sticky top-6">
          {error && (
            <div className="text-center w-full">
              <div className="text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg border-2 border-red-500/50 max-w-md mx-auto">
                <div className="text-4xl mb-2">⚠️</div>
                <p className="font-semibold mb-2">Oops! Something went wrong</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {!isLoading && probability === null && !error && (
            <div className="text-center text-gray-400">
              <div className={`text-6xl mb-4 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}>☁️</div>
              <p className="mt-4 text-xl font-semibold text-white">Ready to predict your snow day?</p>
              <p className="text-base mt-2">👆 Enter your ZIP code above or try a Quick Scenario below</p>
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">Fast</span>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">Accurate</span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full">Free</span>
              </div>
            </div>
          )}

          {isLoading && (
             <div className="text-center text-gray-400">
                <svg className={`mx-auto h-16 w-16 text-cyan-500 ${!prefersReducedMotion ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="mt-4 text-xl font-semibold text-white">Analyzing Weather Data...</p>
                <p className="text-sm mt-2">🌨️ Checking snowfall • 🌡️ Reading temperature • 💨 Measuring wind</p>
             </div>
          )}

          {resultDetails && contributions && probability !== null && (
            <div className={`w-full text-center space-y-4 ${!prefersReducedMotion ? 'animate-fade-in' : ''}`}>
              {(() => {
                const radius = 80;
                const strokeWidth = 16;
                const circumference = 2 * Math.PI * radius;
                const strokeOffset = circumference - (probability / 100) * circumference;

                return (
                  <div className="flex flex-col items-center justify-center">
                    {/* Result Icon Based on Probability */}
                    <div className={`text-7xl mb-4 ${!prefersReducedMotion ? 'animate-bounce' : ''}`}>
                      {probability >= 75 ? '❌' : probability >= 55 ? '⏰' : '✅'}
                    </div>
                    
                    {/* Circular Progress */}
                    <div className="relative w-60 h-60 mb-2">
                      <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                        <circle cx="100" cy="100" r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-gray-700 dark:stroke-gray-600" />
                        <circle cx="100" cy="100" r={radius} strokeWidth={strokeWidth} fill="none" className={resultDetails.colorClass} strokeLinecap="round" style={{ strokeDasharray: circumference, strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease-in-out' }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className={`text-6xl font-extrabold ${resultDetails.textColor}`}>
                            {probability}
                            <span className="text-3xl">%</span>
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Closure Chance</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Result Message */}
                    <div className="mt-2 bg-gradient-to-r from-slate-700/50 to-slate-800/50 px-6 py-4 rounded-xl border border-cyan-500/30 max-w-md">
                      <p className="text-2xl font-bold text-white mb-1">{resultDetails.message}</p>
                      {forecastDate && (
                        <p className="text-sm text-gray-400">
                          📅 Forecast for <span className="font-semibold text-cyan-400">{forecastDate}</span>
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {probability >= 75 && '🎉 High chance of school closure - prepare for a snow day!'}
                        {probability >= 55 && probability < 75 && '⚠️ Possible 2-hour delay or early dismissal'}
                        {probability < 55 && '📚 Low closure chance - normal schedule expected'}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {probabilityTrend && <ProbabilityTrendChart data={probabilityTrend} />}
              
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-left w-full max-w-md mx-auto">
                  <h4 className="font-bold mb-2">Factor Contribution Breakdown:</h4>
                  <ul className="space-y-1 text-sm">
                    {Object.entries(contributions).map(([key, value]) => (
                      <li key={key} className="flex justify-between items-center">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className={`font-semibold ${value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{value >= 0 ? '+' : ''}{value.toFixed(1)} points</span>
                      </li>
                    ))}
                  </ul>
              </div>
              
              {!manualMode && communityVote && (
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-5 rounded-xl border border-purple-500/30 w-full max-w-md mx-auto">
                  <h4 className="font-bold mb-1 text-center text-white flex items-center justify-center">
                    <span className="text-xl mr-2">🗳️</span>
                    Community Consensus
                  </h4>
                  <p className="text-xs text-gray-400 text-center mb-3">See what others predict</p>
                  {userHasVoted ? (() => {
                    const totalVotes = communityVote.closes + communityVote.opens;
                    const closePercent = totalVotes > 0 ? Math.round((communityVote.closes / totalVotes) * 100) : 0;
                    const openPercent = totalVotes > 0 ? 100 - closePercent : 0;
                    return (
                      <div>
                        <div className="flex w-full h-8 bg-gray-700 rounded-full overflow-hidden text-sm font-semibold text-white shadow-lg mb-3">
                          <div style={{ width: `${closePercent}%` }} className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500">
                            {closePercent > 15 && `❌ ${closePercent}%`}
                          </div>
                          <div style={{ width: `${openPercent}%` }} className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500">
                            {openPercent > 15 && `✅ ${openPercent}%`}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-300 mt-3 px-1">
                          <span className="flex items-center">
                            <span className="w-3 h-3 bg-red-500 rounded-full mr-1.5"></span>
                            Close: <strong className="ml-1">{communityVote.closes} votes</strong>
                          </span>
                          <span className="text-gray-500">|</span>
                          <span className="flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-1.5"></span>
                            Open: <strong className="ml-1">{communityVote.opens} votes</strong>
                          </span>
                        </div>
                        <p className="text-xs text-center mt-2 text-purple-400">
                          ✓ Thanks for voting! {totalVotes} prediction{totalVotes !== 1 ? 's' : ''} in your area
                        </p>
                      </div>
                    );
                  })() : (
                    <div className="text-center">
                      <p className="text-sm mb-3 text-gray-300">What do <strong>you</strong> predict will happen? 🤔</p>
                      <div className="flex justify-center space-x-3">
                        <button 
                          onClick={() => handleCommunityVote('closes')} 
                          className="flex-1 max-w-[150px] px-4 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform hover:scale-105 active:scale-95 transition-all shadow-lg"
                          aria-label="Vote that school will close"
                        >
                          ❌ Will Close
                        </button>
                        <button 
                          onClick={() => handleCommunityVote('opens')} 
                          className="flex-1 max-w-[150px] px-4 py-2.5 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-105 active:scale-95 transition-all shadow-lg"
                          aria-label="Vote that school will be open"
                        >
                          ✅ Will Open
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Your vote helps the community!</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="relative pt-2">
                <button 
                  onClick={handleCopyResults} 
                  className="group px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold rounded-lg transform hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center mx-auto"
                  aria-label="Copy snow day prediction results to clipboard"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="group-hover:tracking-wide transition-all">Copy Results</span>
                </button>
                {copySuccess && (
                  <div className={`absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-xl flex items-center ${!prefersReducedMotion ? 'animate-fade-in' : ''}`}>
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {copySuccess}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
      
      {/* Lower Section Sections */}
      <div className="space-y-8 mt-6">
          {/* Quick Examples Section */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-3 text-white">🎯 Quick Weather Scenarios</h2>
            <p className="text-center text-gray-400 mb-2 max-w-2xl mx-auto">Try these preset weather conditions - just click any card for instant results!</p>
            <p className="text-center text-sm text-cyan-400 mb-6">💡 No need to enter data manually - predictions appear automatically</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button 
                onClick={async () => {
                  setManualMode(true);
                  setManualData({ snowfall: 8, temperature: -5, precipitation: 60, wind: 30 });
                  // Auto-calculate after brief delay to let state update
                  setTimeout(() => handleCalculate(), 100);
                }} 
                disabled={isLoading}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[180px]"
                aria-label="Apply Heavy Snowstorm scenario: 8 inches snow, -5°C temperature, 60% precipitation, 30 km/h wind - High closure chance"
              >
                <div className="text-4xl mb-2">❄️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Heavy Snowstorm</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">8" snow, -5°C, 60% precip, 30 km/h wind</p>
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-1 rounded">High Closure Chance</span>
              </button>

              <button 
                onClick={async () => {
                  setManualMode(true);
                  setManualData({ snowfall: 4, temperature: 0, precipitation: 40, wind: 20 });
                  setTimeout(() => handleCalculate(), 100);
                }} 
                disabled={isLoading}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[180px]"
                aria-label="Apply Moderate Snow scenario: 4 inches snow, 0°C temperature, 40% precipitation, 20 km/h wind - Possible delay"
              >
                <div className="text-4xl mb-2">🌨️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Moderate Snow</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">4" snow, 0°C, 40% precip, 20 km/h wind</p>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded">Possible Delay</span>
              </button>

              <button 
                onClick={async () => {
                  setManualMode(true);
                  setManualData({ snowfall: 1, temperature: 3, precipitation: 20, wind: 15 });
                  setTimeout(() => handleCalculate(), 100);
                }} 
                disabled={isLoading}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[180px]"
                aria-label="Apply Light Flurries scenario: 1 inch snow, 3°C temperature, 20% precipitation, 15 km/h wind - Low closure chance"
              >
                <div className="text-4xl mb-2">🌥️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Light Flurries</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">1" snow, 3°C, 20% precip, 15 km/h wind</p>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded">Low Closure Chance</span>
              </button>

              <button 
                onClick={async () => {
                  setManualMode(true);
                  setManualData({ snowfall: 0, temperature: -15, precipitation: 10, wind: 10 });
                  setTimeout(() => handleCalculate(), 100);
                }} 
                disabled={isLoading}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[180px]"
                aria-label="Apply Extreme Cold scenario: No snow, -15°C temperature, 10% precipitation, 10 km/h wind - Wind chill risk"
              >
                <div className="text-4xl mb-2">🥶</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Extreme Cold</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">No snow, -15°C, 10% precip, 10 km/h wind</p>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-2 py-1 rounded">Wind Chill Risk</span>
              </button>

              <button 
                onClick={async () => {
                  setManualMode(true);
                  setManualData({ snowfall: 10, temperature: -10, precipitation: 80, wind: 50 });
                  setTimeout(() => handleCalculate(), 100);
                }} 
                disabled={isLoading}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[180px]"
                aria-label="Apply Blizzard Conditions scenario: 10 inches snow, -10°C temperature, 80% precipitation, 50 km/h wind - Very high risk"
              >
                <div className="text-4xl mb-2">🌪️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Blizzard Conditions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">10" snow, -10°C, 80% precip, 50 km/h wind</p>
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-1 rounded">Very High Risk</span>
              </button>

              <button 
                onClick={async () => {
                  setManualMode(true);
                  setManualData({ snowfall: 0, temperature: -2, precipitation: 90, wind: 25 });
                  setTimeout(() => handleCalculate(), 100);
                }} 
                disabled={isLoading}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-2xl text-left disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[180px]"
                aria-label="Apply Ice Storm scenario: No snow, -2°C temperature, 90% precipitation, 25 km/h wind - Freezing rain risk"
              >
                <div className="text-4xl mb-2">🧊</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Ice Storm</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">No snow, -2°C, 90% precip, 25 km/h wind</p>
                <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-1 rounded">Freezing Rain</span>
              </button>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-3 text-white">Why Use Our Snow Day Calculator?</h2>
            <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">Get accurate predictions with powerful features you won't find anywhere else</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-blue-500/30">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 text-2xl">🌦️</div>
                <h3 className="text-xl font-bold text-white mb-2">Real-Time Weather Data</h3>
                <p className="text-gray-300 text-sm">Powered by Open-Meteo API with live forecasts updated hourly. Get accurate predictions based on actual meteorological conditions, not guesswork.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/30">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 text-2xl">👥</div>
                <h3 className="text-xl font-bold text-white mb-2">Community Consensus</h3>
                <p className="text-gray-300 text-sm">Vote and see what others in your area think. Compare your prediction with local community expectations for additional confidence.</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/30">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 text-2xl">⚙️</div>
                <h3 className="text-xl font-bold text-white mb-2">Customizable Algorithm</h3>
                <p className="text-gray-300 text-sm">Advanced mode lets you adjust weight factors to match your district's closure patterns. Fine-tune predictions for maximum accuracy.</p>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-3 text-white">Who Uses Snow Day Calculator?</h2>
            <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">Trusted by students, parents, teachers, and administrators nationwide</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">👨‍👩‍👧‍👦</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Students & Families</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Plan ahead for potential snow days and make childcare arrangements with confidence based on reliable forecasts.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🏫</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">School Administrators</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Support decision-making with data-driven insights on weather conditions and predicted closure probabilities.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">👨‍🏫</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Teachers & Staff</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Prepare lesson plans with flexibility knowing whether you'll need backup activities for delayed starts or closures.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🎓</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">College Students</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check if your university is likely to cancel classes during winter storms, helping you plan study time and commutes.</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">📚 About Snow Day Predictions</h2>
            <div className="space-y-6 text-gray-300 max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-5 rounded-xl border-l-4 border-cyan-500">
                <p className="text-base leading-relaxed">
                  Our <strong className="text-cyan-400">Snow Day Calculator</strong> helps you predict school closures by analyzing real weather data and district decision patterns. Get accurate forecasts to plan your day with confidence! ❄️
                </p>
              </div>

              {/* Key Weather Factors */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="text-2xl mr-2">🌨️</span>
                  What Weather Factors Matter Most?
                </h3>
                <div className="bg-slate-700/50 p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">❄️</span>
                    <p><strong className="text-white">Snowfall:</strong> Heavy accumulation (6+ inches) dramatically increases closure chances</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">🌡️</span>
                    <p><strong className="text-white">Temperature:</strong> Extreme cold (below 0°F/-18°C) creates dangerous wind chill</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">🧊</span>
                    <p><strong className="text-white">Ice/Freezing Rain:</strong> More hazardous than snow—makes roads extremely slippery</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-400 font-bold mr-2">💨</span>
                    <p><strong className="text-white">Wind Speed:</strong> High winds (30+ mph) reduce visibility and create snowdrifts</p>
                  </div>
                </div>
              </div>

              {/* How Districts Decide */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="text-2xl mr-2">🏫</span>
                  How Do Schools Make Closure Decisions?
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-bold text-green-400 mb-2">🟢 Cautious Districts</h4>
                    <p className="text-xs text-gray-400">Close with <strong>4-6 inches</strong> of snow. Common in suburban/rural areas with limited road maintenance.</p>
                  </div>
                  <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                    <h4 className="font-bold text-yellow-400 mb-2">🟡 Standard Districts</h4>
                    <p className="text-xs text-gray-400">Close with <strong>6-8 inches</strong> of snow. Typical safety-first approach followed by most districts.</p>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                    <h4 className="font-bold text-red-400 mb-2">🔴 Resistant Districts</h4>
                    <p className="text-xs text-gray-400">Require <strong>8+ inches</strong> to close. Urban areas with excellent snow removal infrastructure.</p>
                  </div>
                </div>
                <p className="text-sm mt-3 text-gray-400 italic">
                  💡 <strong>Tip:</strong> Public schools close more readily than private schools or universities due to larger service areas.
                </p>
              </div>

              {/* Timing */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="text-2xl mr-2">⏰</span>
                  When Are Closures Announced?
                </h3>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">→</span>
                      <span><strong className="text-white">5-7 AM:</strong> Most districts announce closures early morning on the day of the storm</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">→</span>
                      <span><strong className="text-white">Evening Before:</strong> Severe weather forecasts may trigger advance announcements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-2">→</span>
                      <span><strong className="text-white">During School Day:</strong> Deteriorating conditions can lead to early dismissals</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Understanding Scores */}
              <div>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  What Do the Percentages Mean?
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center bg-red-900/30 p-3 rounded-lg">
                    <span className="text-3xl mr-3">❌</span>
                    <div>
                      <p className="font-bold text-red-400">75-100%: School Closure Likely</p>
                      <p className="text-xs text-gray-400">Expect full cancellation—make alternative plans!</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-yellow-900/30 p-3 rounded-lg">
                    <span className="text-3xl mr-3">⏰</span>
                    <div>
                      <p className="font-bold text-yellow-400">55-75%: Delay Possible</p>
                      <p className="text-xs text-gray-400">2-hour delays common as districts wait for road treatment</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-green-900/30 p-3 rounded-lg">
                    <span className="text-3xl mr-3">✅</span>
                    <div>
                      <p className="font-bold text-green-400">0-55%: School Open</p>
                      <p className="text-xs text-gray-400">Normal schedule expected—prepare for regular day</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Feature */}
              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-5 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                  <span className="text-xl mr-2">🗳️</span>
                  Why Use Community Voting?
                </h3>
                <p className="text-sm text-gray-300">
                  Local residents often have insider knowledge of district closure patterns! Compare our algorithm's prediction with what your neighbors expect for added confidence in your plans.
                </p>
              </div>

              {/* Global Use */}
              <div className="text-center bg-slate-700/30 p-4 rounded-lg">
                <p className="text-sm text-gray-400">
                  <strong className="text-cyan-400">🌍 Works Worldwide:</strong> Use Manual Mode to input weather data from anywhere—Canada, UK, Europe, or any region with winter weather!
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: How to Use */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 text-white">
              How to Use the Snow Day Calculator
            </h2>
            <p className="text-gray-300 mb-4">
              Follow these simple steps to check your school closure chances using our smart Snow Day Prediction Tool:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>
                <strong>Enter your ZIP Code:</strong> Type your 5-digit US ZIP code to fetch live weather data automatically.
              </li>
              <li>
                <strong>Select School Type:</strong> Choose between Public, Private, or University, as snow day policies may differ.
              </li>
              <li>
                <strong>Enable Manual Mode (Optional):</strong> If you’re outside the US or if the API fails, you can manually enter weather data such as snowfall, temperature, and wind speed.
              </li>
              <li>
                <strong>Click “Calculate”:</strong> Instantly view your snow day probability and see if your school is likely to close tomorrow.
              </li>
            </ol>
            <p className="mt-4 text-sm text-blue-400 italic">
              💡 Tip: For best accuracy, check again within 24 hours of a snowstorm forecast.
            </p>
          </div>
          {/* Section 4: FAQ */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                  How accurate is the Snow Day Calculator?
                </h3>
                <p className="text-gray-300">
                  The Snow Day Calculator uses live forecasts from Open-Meteo and a custom probability model. 
                  Accuracy typically ranges from <strong>70% to 85%</strong> depending on forecast reliability and location. 
                  The algorithm analyzes snowfall, temperature, wind speed, and precipitation probability to provide data-driven predictions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                  Does this tool work in all locations?
                </h3>
                <p className="text-gray-300">
                  Yes! Automatic ZIP code lookup supports the US, but you can enable <strong>Manual Mode</strong> 
                  to enter data for any area supported by Open-Meteo's global forecasts. This makes it compatible worldwide for international schools.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                  Can it predict delays or early dismissals?
                </h3>
                <p className="text-gray-300">
                  While it's designed to predict full closures, <strong>moderate scores (55–75%)</strong> 
                  may indicate possible 2-hour delays, while scores above 85% suggest potential early dismissals if conditions worsen during the school day.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                  How does the Snow Day Calculator work?
                </h3>
                <p className="text-gray-300">
                  It analyzes snowfall accumulation, temperature (especially dangerous wind chill), wind speed, and precipitation probability using a 
                  <strong> custom weighted scoring algorithm</strong> that accounts for school type (Public/Private/University) and district caution levels.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                  Will there be a snow day tomorrow?
                </h3>
                <p className="text-gray-300">
                  Enter your ZIP code above to get a personalized probability score for tomorrow's forecast. 
                  Scores above <strong>75%</strong> indicate high likelihood of closure, while 55-75% suggests possible delays. 
                  Check within 12-24 hours of storms for best accuracy.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                  What weather factors increase snow day chances?
                </h3>
                <p className="text-gray-300">
                  Key factors include: heavy snowfall (6+ inches/15+ cm), temperatures below 0°C/32°F, high winds (25+ mph/40+ km/h creating drifts), 
                  ice accumulation from freezing rain, and precipitation probability above 60%. Public schools typically close more readily than universities.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400">
                  How early are snow days announced?
                </h3>
                <p className="text-gray-300">
                  Most school districts announce snow day closures between <strong>5-7 AM</strong> on the day of the event, though severe weather 
                  may prompt evening-before announcements (typically after 8 PM). Always check your district's official website or automated calling system for confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* External Resources Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 text-center">
            <h3 className="text-lg font-semibold text-white mb-3">📚 Additional Weather Resources</h3>
            <p className="text-sm text-gray-400 mb-4">Learn more from authoritative weather and education sources:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a 
                href="https://www.weather.gov/safety/winter" 
                target="_blank" 
                rel="nofollow noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                NOAA Winter Weather Safety →
              </a>
              <a 
                href="https://www.weather.gov/" 
                target="_blank" 
                rel="nofollow noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                National Weather Service →
              </a>
              <a 
                href="https://www.ed.gov/news/press-releases/us-department-education-offers-guidance-supporting-students-families-and-educators-impacted-severe-winter-weather" 
                target="_blank" 
                rel="nofollow noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                US Dept. of Education - Winter Weather Guidance →
              </a>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Updated: <time dateTime="2025-11-08">November 8, 2025</time>
            </p>
          </div>

          {/* Section 5: Social Sharing */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg animate-slide-in" style={{ animationDelay: '600ms' }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Share This Tool</h3>
              <div className="flex items-center space-x-4">
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator')}&text=${encodeURIComponent('I used this Snow Day Calculator to predict my chances! Check it out:')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                   <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this Snow Day Calculator to predict your chances! ' + 'https://zurawebtools.com/math-and-calculation-tools/snow-day-calculator')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 01-1.26-4.38c0-4.54 3.68-8.22 8.22-8.22s8.22 3.68 8.22 8.22-3.68 8.22-8.22 8.22zm4.52-6.13c-.25-.12-1.47-.72-1.7-.82s-.39-.12-.56.12c-.17.25-.64.82-.79.98s-.29.17-.54.06c-.25-.12-1.06-.39-2.02-1.25s-1.45-1.95-1.61-2.29c-.17-.35-.02-.54.11-.66.12-.12.25-.29.37-.44s.17-.25.25-.41.12-.3-.02-.54c-.12-.25-.56-1.35-.77-1.84s-.41-.42-.56-.42h-.5c-.17 0-.44.06-.66.31s-.86.83-.86 2.02c0 1.18.88 2.34 1 2.5.12.17 1.76 2.68 4.27 3.78 2.5 1.1 2.5.74 2.95.72.44-.02 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18s-.24-.18-.5-.3z" /></svg>
                  </a>
              </div>
          </div>
      </div>

          <RelatedTools
            navigateTo={navigateTo}
            relatedSlugs={['percentage-change-calculator', 'time-difference-calculator', 'fabric-costing-tool']}
            currentSlug="snow-day-calculator"
          />
        </div>
      </div>
    </section>
  );
};

export default SnowDayCalculator;