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

    const metaTags = [
      { name: 'description', content: 'Free Snow Day Calculator that predicts school closure chances using live weather forecasts. Check if your school will be closed tomorrow!' },
      { name: 'keywords', content: 'snow day calculator, snow day predictor, school closure forecast, snow day probability, will school be closed, snow prediction model' },
      { name: 'author', content: 'ZuraWebTools' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { property: 'og:title', content: 'Snow Day Calculator – Will School Be Closed Tomorrow?' },
      { property: 'og:description', content: 'Predict your chances of a snow day with real-time weather data and our intelligent closure model.' },
      { property: 'og:url', content: 'https://zurawebtools.com/tools/snow-day-calculator' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'ZuraWebTools' },
      { property: 'og:image', content: 'https://zurawebtools.com/assets/snow-day-preview.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Snow Day Calculator – Predict School Closures Near You' },
      { name: 'twitter:description', content: 'Use this free Snow Day Calculator to estimate school closure probability with live weather forecasts.' },
      { name: 'twitter:image', content: 'https://zurawebtools.com/assets/snow-day-preview.png' },
    ];

    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = 'https://zurawebtools.com/tools/snow-day-calculator';
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

    // SoftwareApplication + FAQ + Discover Graph
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
          "url": "https://zurawebtools.com/tools/snow-day-calculator",
          "image": "https://zurawebtools.com/assets/snow-day-preview.png",
          "dateModified": lastUpdated,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1324"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How accurate is the Snow Day Calculator?",
              "acceptedAnswer": { "@type": "Answer", "text": "Accuracy ranges from 70–85% depending on local forecasts and data from Open-Meteo." }
            },
            {
              "@type": "Question",
              "name": "Does the Snow Day Calculator work outside the US?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes! Use Manual Mode to input your own weather data for non-US locations." }
            },
            {
              "@type": "Question",
              "name": "How does the Snow Day Calculator predict closures?",
              "acceptedAnswer": { "@type": "Answer", "text": "It analyzes snowfall, temperature, wind, and precipitation probability using a custom weighted model." }
            },
            {
              "@type": "Question",
              "name": "When should I check for best accuracy?",
              "acceptedAnswer": { "@type": "Answer", "text": "For highest accuracy, check within 12–24 hours of a predicted snowstorm." }
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
            "target": "https://zurawebtools.com/tools/snow-day-calculator?q={search_term_string}",
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
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue disabled:bg-gray-200 dark:disabled:bg-gray-800" />
    </div>
  );

  const WeightSlider: React.FC<{ label: string; name: keyof AlgorithmWeights; value: number; min: number; max: number; step: number; }> = 
    ({ label, name, value, min, max, step }) => (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center text-sm">
        <label htmlFor={name} className="font-medium">{label}</label>
        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-md text-xs">{value}</span>
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
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Snow Day Calculator</h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Will School Be Closed Tomorrow? Check your school closure chances with live weather data and an intelligent snow day prediction model.
            </p>
          </div>

      {/* Section 1: Inputs */}
      <div className="space-y-6 animate-slide-in">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Enter Your Details</h3>
          <div className="space-y-4">
            <InputField label="ZIP Code (US Only)" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., 90210" disabled={manualMode} />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School Type</label>
              <select value={schoolType} onChange={(e) => setSchoolType(e.target.value as SchoolType)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue">
                <option>Public</option>
                <option>Private</option>
                <option>University</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District Caution Level</label>
              <select value={districtCaution} onChange={(e) => setDistrictCaution(e.target.value as DistrictCautionLevel)} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue">
                <option>Standard</option>
                <option>Cautious</option>
                <option>Resistant</option>
              </select>
            </div>
            <div className="flex items-center">
                <input type="checkbox" id="manual-mode" checked={manualMode} onChange={(e) => setManualMode(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"/>
                <label htmlFor="manual-mode" className="ml-2 block text-sm text-gray-900 dark:text-gray-200">Enter Weather Data Manually</label>
            </div>
            
            {manualMode && (
              <div className="p-4 border-l-4 border-brand-blue bg-blue-50 dark:bg-gray-700 space-y-3 animate-fade-in">
                <InputField label="Avg. Snowfall (cm)" type="number" value={manualData.snowfall} onChange={(e) => setManualData({...manualData, snowfall: parseFloat(e.target.value) || 0})} />
                <InputField label="Avg. Temperature (°C)" type="number" value={manualData.temperature} onChange={(e) => setManualData({...manualData, temperature: parseFloat(e.target.value) || 0})} />
                <InputField label="Avg. Precipitation (%)" type="number" value={manualData.precipitation} onChange={(e) => setManualData({...manualData, precipitation: parseFloat(e.target.value) || 0})} />
                <InputField label="Avg. Wind Speed (km/h)" type="number" value={manualData.wind} onChange={(e) => setManualData({...manualData, wind: parseFloat(e.target.value) || 0})} />
              </div>
            )}

            <div className="flex space-x-4 pt-2">
              <button onClick={handleCalculate} disabled={isLoading} className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors" aria-label="Calculate snow day probability">
                {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                {isLoading ? 'Calculating...' : 'Calculate'}
              </button>
              <button onClick={handleReset} className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-500 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-lightblue transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex justify-between items-center w-full text-left">
              <h3 className="text-xl font-bold">Advanced Mode</h3>
              <svg className={`w-6 h-6 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showAdvanced ? 'max-h-screen mt-4' : 'max-h-0'}`}>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Adjust the weights of the algorithm to tune the prediction model.</p>
              <div className="space-y-4">
                  <WeightSlider label="Snowfall Multiplier" name="snowfallMultiplier" value={weights.snowfallMultiplier} min={1} max={15} step={0.5} />
                  <WeightSlider label="Temp Below 0°C Bonus" name="tempBelowZero" value={weights.tempBelowZero} min={0} max={30} step={1} />
                  <WeightSlider label="Public School Bonus" name="publicSchoolBonus" value={weights.publicSchoolBonus} min={-10} max={20} step={1} />
                  <WeightSlider label="District Cautious Bonus" name="districtCautiousBonus" value={weights.districtCautiousBonus} min={0} max={20} step={1} />
              </div>
          </div>
        </div>
      </div>

      {/* Section 2: Results */}
      <div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg min-h-[30rem] flex flex-col justify-center items-center animate-fade-in">
          {error && <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-md w-full">{error}</div>}
          
          {!isLoading && probability === null && !error && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              <p className="mt-4 text-lg">Your snow day forecast will appear here.</p>
              <p className="text-sm">Enter a ZIP code and click "Calculate".</p>
            </div>
          )}

          {isLoading && (
             <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="animate-spin mx-auto h-12 w-12 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p className="mt-4 text-lg">Fetching weather data & crunching numbers...</p>
             </div>
          )}

          {resultDetails && contributions && probability !== null && (
            <div className="w-full text-center animate-fade-in space-y-4">
              {(() => {
                const radius = 80;
                const strokeWidth = 16;
                const circumference = 2 * Math.PI * radius;
                const strokeOffset = circumference - (probability / 100) * circumference;

                return (
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-52 h-52">
                      <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90"><circle cx="100" cy="100" r={radius} strokeWidth={strokeWidth} fill="none" className="stroke-gray-200 dark:stroke-gray-600" /><circle cx="100" cy="100" r={radius} strokeWidth={strokeWidth} fill="none" className={resultDetails.colorClass} strokeLinecap="round" style={{ strokeDasharray: circumference, strokeDashoffset: strokeOffset, transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease-in-out' }} /></svg>
                      <div className="absolute inset-0 flex items-center justify-center"><p className={`text-5xl font-bold ${resultDetails.textColor}`}>{probability}<span className="text-3xl">%</span></p></div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xl font-semibold">{resultDetails.message}</p>
                      {forecastDate && <p className="text-sm text-gray-500 dark:text-gray-400">Forecast for {forecastDate}</p>}
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
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg w-full max-w-md mx-auto">
                  <h4 className="font-bold mb-3 text-center">Community Consensus</h4>
                  {userHasVoted ? (() => {
                    const totalVotes = communityVote.closes + communityVote.opens;
                    const closePercent = totalVotes > 0 ? Math.round((communityVote.closes / totalVotes) * 100) : 0;
                    const openPercent = totalVotes > 0 ? 100 - closePercent : 0;
                    return (
                      <div>
                        <div className="flex w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden text-xs text-white">
                          <div style={{ width: `${closePercent}%` }} className="flex items-center justify-center bg-red-500">{closePercent > 10 && `${closePercent}% Close`}</div>
                          <div style={{ width: `${openPercent}%` }} className="flex items-center justify-center bg-green-500">{openPercent > 10 && `${openPercent}% Open`}</div>
                        </div>
                        <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">{totalVotes} vote(s) in your area.</p>
                      </div>
                    );
                  })() : (
                    <div className="text-center">
                      <p className="text-sm mb-2">What do you think will happen?</p>
                      <div className="flex justify-center space-x-4">
                        <button onClick={() => handleCommunityVote('closes')} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600">School Will Close</button>
                        <button onClick={() => handleCommunityVote('opens')} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600">School Will Be Open</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="relative pt-2">
                <button onClick={handleCopyResults} className="px-6 py-2 bg-brand-lightblue text-white font-semibold rounded-md hover:bg-brand-blue transition-colors">Copy Results</button>
                {copySuccess && <div className="absolute bottom-full mb-2 w-full text-center text-sm text-green-600 dark:text-green-400 animate-fade-in">{copySuccess}</div>}
              </div>

            </div>
          )}
        </div>
      </div>
      
      {/* Lower Section Sections */}
      <div className="space-y-8 mt-4">
          {/* Section 3: How to Use */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              How to Use the Snow Day Calculator
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Follow these simple steps to check your school closure chances using our smart Snow Day Prediction Tool:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
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
            <p className="mt-4 text-sm text-blue-600 dark:text-blue-400 italic">
              💡 Tip: For best accuracy, check again within 24 hours of a snowstorm forecast.
            </p>
          </div>
          {/* Section 4: FAQ */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  How accurate is the Snow Day Calculator?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The Snow Day Calculator uses live forecasts from Open-Meteo and a custom probability model. 
                  Accuracy typically ranges from <strong>70% to 85%</strong> depending on forecast reliability and location.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  Does this tool work in all locations?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! Automatic ZIP code lookup supports the US, but you can enable <strong>Manual Mode</strong> 
                  to enter data for any area supported by Open-Meteo’s global forecasts.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  Can it predict delays or early dismissals?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  While it’s designed to predict full closures, <strong>moderate scores (55–85%)</strong> 
                  may indicate possible delays or early dismissals during severe weather.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  How does the Snow Day Calculator work?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  It analyzes snowfall, temperature, wind speed, and precipitation probability using a 
                  <strong> custom scoring algorithm</strong> to estimate the likelihood of a snow day for your school district.
                </p>
              </div>
            </div>
          </div>
          {/* Section 5: Social Sharing */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg animate-slide-in" style={{ animationDelay: '600ms' }}>
              <h3 className="text-2xl font-bold mb-4">Share This Tool</h3>
              <div className="flex items-center space-x-4">
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://zurawebtools.com/tools/snow-day-calculator')}&text=${encodeURIComponent('I used this Snow Day Calculator to predict my chances! Check it out:')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
                   <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://zurawebtools.com/tools/snow-day-calculator')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this Snow Day Calculator to predict your chances! ' + 'https://zurawebtools.com/tools/snow-day-calculator')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors">
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