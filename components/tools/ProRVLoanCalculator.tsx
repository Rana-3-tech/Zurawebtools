import React, { useState, useMemo, useEffect, useCallback, FC, useRef } from 'react';

// TYPES
type Currency = 'USD' | 'CAD' | 'EUR' | 'GBP';
type DownPaymentType = 'amount' | 'percent';
type LoanTermType = 'years' | 'months';
type ActiveTab = 'summary' | 'amortization' | 'charts' | 'compare';

interface AmortizationRow {
  paymentNumber: number;
  paymentDate: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Add types for window-injected libraries
declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

// SVG ICONS (self-contained components)
const ShareIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);
const CopyIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);
const CloseIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const FacebookIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);
const TwitterIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);
const LinkedInIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);
const WhatsAppIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.12l-1.149 4.184 4.281-1.137zm9.865-6.948c-.273-.136-1.612-.799-1.865-.891-.252-.092-.435-.136-.617.136-.182.272-.703.891-.865 1.064-.163.173-.325.195-.601.06-.276-.135-1.157-.426-2.204-1.359- .817-.719-1.365-1.611-1.531-1.887-.165-.276-.021-.428.115-.563.121-.122.273-.318.41-.463.136-.145.182-.252.273-.422.092-.17.046-.318-.023-.453-.069-.136-.617-1.475-.845-2.015-.227-.54-.454-.463-.617-.463-.163 0-.347-.023-.53-.023-.182 0-.477.068-.72.34-.244.271-.935.91-1.136 2.219-.201 1.308.291 2.569.331 2.748.04.182.633 1.96 3.06 3.593 2.427 1.632 3.053 1.301 3.593 1.156.54-.145 1.612-.663 1.838-.918.228-.254.228-.472.163-.618z"/>
    </svg>
);
const MortgageIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const AutoLoanIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
const InvestmentIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

// HELPER FUNCTIONS
const formatCurrency = (value: number, currency: Currency): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const ProRVLoanCalculator: React.FC = () => {
  // STATE MANAGEMENT
  const [rvPrice, setRvPrice] = useState<number>(75000);
  const [downPayment, setDownPayment] = useState<number>(15000);
  const [downPaymentType, setDownPaymentType] = useState<DownPaymentType>('amount');
  const [tradeInValue, setTradeInValue] = useState<number>(5000);
  const [salesTax, setSalesTax] = useState<number>(7);
  const [fees, setFees] = useState<number>(1500);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(15);
  const [loanTermType, setLoanTermType] = useState<LoanTermType>('years');
  const [balloonPayment, setBalloonPayment] = useState<number>(0);
  const [extraPayment, setExtraPayment] = useState<number>(100);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [activeTab, setActiveTab] = useState<ActiveTab>('summary');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [liveRegionMessage, setLiveRegionMessage] = useState<string>('');
  const isInitialMount = useRef(true);
  
  // PRESETS
  const presets = {
    standard: { price: 50000, down: 10000, rate: 7.5, term: 12 },
    luxury: { price: 150000, down: 30000, rate: 6.0, term: 20 },
    camper: { price: 35000, down: 7000, rate: 8.0, term: 10 },
  };

  const applyPreset = (preset: keyof typeof presets) => {
    const { price, down, rate, term } = presets[preset];
    setRvPrice(price);
    setDownPayment(down);
    setDownPaymentType('amount');
    setInterestRate(rate);
    setLoanTerm(term);
    setLoanTermType('years');
  };
  
    // URL PARAMS EFFECT (Read on load)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const getParam = (key: string, parser: (val: string) => any, setter: (val: any) => void) => {
            if (params.has(key)) {
                setter(parser(params.get(key)!));
            }
        };
        getParam('price', Number, setRvPrice);
        getParam('dp', Number, setDownPayment);
        getParam('dpType', (val) => val as DownPaymentType, setDownPaymentType);
        getParam('trade', Number, setTradeInValue);
        getParam('tax', Number, setSalesTax);
        getParam('fees', Number, setFees);
        getParam('rate', Number, setInterestRate);
        getParam('term', Number, setLoanTerm);
        getParam('termType', (val) => val as LoanTermType, setLoanTermType);
        getParam('balloon', Number, setBalloonPayment);
        getParam('extra', Number, setExtraPayment);
        getParam('start', String, setStartDate);
        getParam('currency', (val) => val as Currency, setCurrency);
    }, []);

  // SEO & JSON-LD EFFECT
  useEffect(() => {
    // Title
    document.title = 'Pro RV Loan Calculator – Monthly Payments, Interest & Amortization | ZuraFinanceTools';

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Use the free Pro RV Loan Calculator to estimate RV financing costs, amortization schedules, interest, and balloon payments. Compare scenarios and export your report instantly.');

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'rv loan calculator, rv loan amortization, rv loan interest, rv payment calculator, camper van loan, motorhome financing, balloon rv loan, rv refinance calculator');


    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://zurafinancetools.com/tools/pro-rv-loan-calculator');

    // Open Graph (for Facebook, LinkedIn)
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'Pro RV Loan Calculator | Estimate RV Payments & Interest Instantly');

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', 'Use the free Pro RV Loan Calculator to calculate monthly RV payments, total loan costs, and interest — including balloon payments and extra principal reductions.');

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', 'https://zurafinancetools.com/tools/pro-rv-loan-calculator');

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    // JSON-LD Schema
    const schemas = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Pro RV Loan Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any (Web)",
            "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "1280"
            },
            "publisher": {"@type": "Organization", "name": "ZuraFinanceTools", "url": "https://zurafinancetools.com"},
            "description": "Free online RV loan calculator with amortization, extra payments, and balloon payment support. Export reports and compare refinancing options.",
            "url": "https://zurafinancetools.com/tools/pro-rv-loan-calculator"
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How do I calculate my RV monthly payment?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The calculator uses the standard amortization formula, factoring in loan amount, APR, and term, with optional taxes and fees."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I reduce my RV loan interest?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, increasing your down payment or making extra payments can reduce the total interest significantly."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What’s a balloon payment?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A balloon payment is a large final payment that lowers monthly installments but increases the final payoff."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is this calculator accurate for all RV types?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, you can use it for motorhomes, camper vans, or luxury RVs — just adjust purchase price and interest rate accordingly."
                    }
                }
            ]
        }
    ];

    const scriptIds = ['json-ld-software', 'json-ld-faq'];
    scriptIds.forEach((id, index) => {
        let script = document.getElementById(id) as HTMLScriptElement | null;
        if (!script) {
            script = document.createElement('script');
            script.id = id;
            document.head.appendChild(script);
        }
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemas[index]);
    });

    // Cleanup on unmount
    return () => {
      document.title = 'ZuraFinanceTools'; // Set a more appropriate default title
      if (metaDesc) metaDesc.remove();
      if (metaKeywords) metaKeywords.remove();
      if (canonicalLink) canonicalLink.remove();
      if (ogTitle) ogTitle.remove();
      if (ogDesc) ogDesc.remove();
      if (ogUrl) ogUrl.remove();
      if (ogType) ogType.remove();
      scriptIds.forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  // MEMOIZED CALCULATIONS
  const calculations = useMemo(() => {
    // Sanitize inputs
    const price = rvPrice > 0 ? rvPrice : 0;
    const dp = downPayment > 0 ? downPayment : 0;
    const tradeIn = tradeInValue > 0 ? tradeInValue : 0;
    const taxRate = salesTax > 0 ? salesTax / 100 : 0;
    const extraFees = fees > 0 ? fees : 0;
    const rate = interestRate > 0 ? interestRate / 100 : 0;
    const termYears = loanTermType === 'years' ? (loanTerm > 0 ? loanTerm : 0) : (loanTerm > 0 ? loanTerm / 12 : 0);
    const balloon = balloonPayment > 0 ? balloonPayment : 0;
    const extra = extraPayment > 0 ? extraPayment : 0;

    // Derived values
    const downPaymentAmount = downPaymentType === 'percent' ? price * (dp / 100) : dp;
    const taxableAmount = price - tradeIn;
    const totalSalesTax = taxableAmount > 0 ? taxableAmount * taxRate : 0;
    const totalLoanAmount = price + totalSalesTax + extraFees - downPaymentAmount - tradeIn;

    const n = termYears * 12; // total number of payments
    const r = rate / 12; // monthly interest rate

    if (totalLoanAmount <= 0 || n <= 0 || r <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalCost: 0, amortization: [], amortizationWithExtra: [], interestSaved: 0, earlyPayoffDate: '', downPaymentAmount, totalLoanAmount: 0, totalSalesTax };
    }

    // Amortization Formula: M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
    // Adjusted for balloon payment: M = (P - (B / (1+r)^n)) * [r(1 + r)^n] / [(1 + r)^n - 1]
    const pvFactor = Math.pow(1 + r, n);
    const monthlyPayment = (totalLoanAmount - (balloon / pvFactor)) * (r * pvFactor) / (pvFactor - 1);
    
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid + balloon - totalLoanAmount;
    const totalCost = price + totalSalesTax + extraFees + totalInterest;

    // Generate Amortization Schedules
    const generateSchedule = (extraMonthly: number): { schedule: AmortizationRow[], finalInterest: number, finalDate: string } => {
      const schedule: AmortizationRow[] = [];
      let balance = totalLoanAmount;
      let totalInterestPaid = 0;
      const basePaymentDate = new Date(startDate);
      // Set to noon to avoid DST/timezone issues with midnight
      basePaymentDate.setHours(12, 0, 0, 0);

      for (let i = 1; i <= n && balance > 0; i++) {
        const paymentDate = new Date(basePaymentDate);
        paymentDate.setMonth(basePaymentDate.getMonth() + i);
        
        const interestForMonth = balance * r;
        const totalPaymentForMonth = monthlyPayment + extraMonthly;
        let principal = totalPaymentForMonth - interestForMonth;

        if (balance - principal < 0) {
          principal = balance;
        }

        balance -= principal;
        totalInterestPaid += interestForMonth;

        schedule.push({
          paymentNumber: i,
          paymentDate: paymentDate.toLocaleDateString(),
          payment: totalPaymentForMonth,
          principal: principal,
          interest: interestForMonth,
          remainingBalance: balance < 0.01 ? 0 : balance,
        });

        if (balance <= 0) break;
      }
      const finalDate = schedule.length > 0 ? schedule[schedule.length - 1].paymentDate : '';
      return { schedule, finalInterest: totalInterestPaid, finalDate };
    };

    const baseAmortizationResult = generateSchedule(0);
    const extraAmortizationResult = generateSchedule(extra);

    const interestSaved = baseAmortizationResult.finalInterest - extraAmortizationResult.finalInterest;
    const earlyPayoffDate = extra > 0 ? extraAmortizationResult.finalDate : '';

    return {
      monthlyPayment,
      totalLoanAmount,
      totalInterest,
      totalCost,
      downPaymentAmount,
      totalSalesTax,
      amortization: baseAmortizationResult.schedule,
      amortizationWithExtra: extraAmortizationResult.schedule,
      interestSaved,
      earlyPayoffDate,
    };
  }, [rvPrice, downPayment, downPaymentType, tradeInValue, salesTax, fees, interestRate, loanTerm, loanTermType, balloonPayment, extraPayment, startDate]);

  // Effect for ARIA Live Region
  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
    } else {
        const timer = setTimeout(() => {
            setLiveRegionMessage(`Calculation updated. New monthly payment is ${formatCurrency(calculations.monthlyPayment, currency)}.`);
        }, 300); // Small delay for screen reader to catch up
        return () => clearTimeout(timer);
    }
  }, [calculations.monthlyPayment, currency]);

    // Share Scenario Logic
    const generateShareableLink = useCallback(() => {
        const params = new URLSearchParams();
        params.set('price', rvPrice.toString());
        params.set('dp', downPayment.toString());
        params.set('dpType', downPaymentType);
        params.set('trade', tradeInValue.toString());
        params.set('tax', salesTax.toString());
        params.set('fees', fees.toString());
        params.set('rate', interestRate.toString());
        params.set('term', loanTerm.toString());
        params.set('termType', loanTermType);
        params.set('balloon', balloonPayment.toString());
        params.set('extra', extraPayment.toString());
        params.set('start', startDate);
        params.set('currency', currency);
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    }, [rvPrice, downPayment, downPaymentType, tradeInValue, salesTax, fees, interestRate, loanTerm, loanTermType, balloonPayment, extraPayment, startDate, currency]);


  // HANDLERS
  const handleReset = () => {
    // Clear URL params
    const url = new URL(window.location.href);
    url.search = '';
    window.history.pushState({}, '', url);

    setRvPrice(75000);
    setDownPayment(15000);
    setDownPaymentType('amount');
    setTradeInValue(5000);
    setSalesTax(7);
    setFees(1500);
    setInterestRate(6.5);
    setLoanTerm(15);
    setLoanTermType('years');
    setBalloonPayment(0);
    setExtraPayment(100);
    setStartDate(new Date().toISOString().split('T')[0]);
    setCurrency('USD');
    setActiveTab('summary');
  };

  const copySummaryToClipboard = () => {
    const summary = `
Pro RV Loan Calculator Summary
--------------------------------
RV Purchase Price: ${formatCurrency(rvPrice, currency)}
Down Payment: ${formatCurrency(calculations.downPaymentAmount, currency)}
Total Loan Amount: ${formatCurrency(calculations.totalLoanAmount, currency)}
Monthly Payment: ${formatCurrency(calculations.monthlyPayment, currency)}
Total Interest Paid: ${formatCurrency(calculations.totalInterest, currency)}
Total Cost of Loan: ${formatCurrency(calculations.totalCost, currency)}
    `;
    navigator.clipboard.writeText(summary.trim()).then(() => alert('Summary copied to clipboard!'));
  };
  
  const downloadAmortizationCSV = () => {
    const schedule = extraPayment > 0 ? calculations.amortizationWithExtra : calculations.amortization;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Payment #,Date,Payment,Principal,Interest,Remaining Balance\n";
    schedule.forEach(row => {
      const csvRow = [
        row.paymentNumber,
        row.paymentDate,
        row.payment.toFixed(2),
        row.principal.toFixed(2),
        row.interest.toFixed(2),
        row.remainingBalance.toFixed(2)
      ].join(",");
      csvContent += csvRow + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "amortization_schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLoanTermTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'years' || value === 'months') {
      setLoanTermType(value as LoanTermType);
    }
  };

  const generatePDFReport = async () => {
    setIsGeneratingPDF(true);
    
    if (!window.jspdf || !window.html2canvas) {
        alert("PDF generation libraries could not be loaded. Please check your internet connection and try again.");
        setIsGeneratingPDF(false);
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

        // --- Page 1: Header and Summary ---
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor('#1e3a8a'); // brand-primary
        doc.text('Pro RV Loan Report', 40, 60);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor('#374151'); // gray-700
        doc.text(`Report generated on: ${new Date().toLocaleDateString()}`, 40, 75);

        const summaryData = [
            ['RV Purchase Price', formatCurrency(rvPrice, currency)],
            ['Down Payment', formatCurrency(calculations.downPaymentAmount, currency)],
            ['Trade-in Value', formatCurrency(tradeInValue, currency)],
            ['Fees & Taxes', formatCurrency(calculations.totalSalesTax + fees, currency)],
            ['Total Loan Amount', formatCurrency(calculations.totalLoanAmount, currency)],
            ['Interest Rate (APR)', `${interestRate.toFixed(2)}%`],
            ['Loan Term', `${loanTerm} ${loanTermType}`],
            ['Monthly Payment', formatCurrency(calculations.monthlyPayment, currency)],
            ['Total Interest Paid', formatCurrency(calculations.totalInterest, currency)],
            ['Total Cost of RV', formatCurrency(calculations.totalCost, currency)],
        ];
        
        if (balloonPayment > 0) {
            summaryData.push(['Balloon Payment Due', formatCurrency(balloonPayment, currency)]);
        }
        if (extraPayment > 0) {
            summaryData.push(['Interest Saved w/ Extra Payments', formatCurrency(calculations.interestSaved, currency)]);
        }

        doc.autoTable({
            startY: 100,
            head: [['Summary Metric', 'Value']],
            body: summaryData,
            theme: 'grid',
            headStyles: { fillColor: '#1e40af' /* brand-dark */, textColor: '#ffffff' },
            styles: { font: 'helvetica', fontSize: 10 },
            columnStyles: { 0: { fontStyle: 'bold' } },
        });
        
        // --- Page 2: Charts ---
        const chartContainer = document.getElementById('pdf-chart-container');
        if (chartContainer) {
            doc.addPage();
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.setTextColor('#1e3a8a');
            doc.text('Visual Breakdown', 40, 60);
            
            const canvas = await window.html2canvas(chartContainer, { 
                scale: 3, // Higher scale for better quality
                useCORS: true,
            });
            const imgData = canvas.toDataURL('image/png');
            
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const margin = 40;
            const availableWidth = pdfWidth - 2 * margin;
            const aspect = imgProps.height / imgProps.width;
            const imgWidth = availableWidth;
            const imgHeight = imgWidth * aspect;

            doc.addImage(imgData, 'PNG', margin, 80, imgWidth, imgHeight);
        }

        // --- Page 3+: Amortization Schedule ---
        const schedule = extraPayment > 0 ? calculations.amortizationWithExtra : calculations.amortization;
        if (schedule.length > 0) {
            doc.addPage();
            
            const tableHead = [['#', 'Date', 'Payment', 'Principal', 'Interest', 'Balance']];
            const tableBody = schedule.map(row => [
                row.paymentNumber,
                row.paymentDate,
                formatCurrency(row.payment, currency),
                formatCurrency(row.principal, currency),
                formatCurrency(row.interest, currency),
                formatCurrency(row.remainingBalance, currency)
            ]);
            
            doc.autoTable({
                head: tableHead,
                body: tableBody,
                startY: 60,
                theme: 'striped',
                styles: { fontSize: 8, cellPadding: 4 },
                headStyles: { fillColor: '#1e40af' /* brand-dark */, textColor: '#ffffff' },
                didDrawPage: (data: any) => {
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(18);
                    doc.setTextColor('#1e3a8a');
                    doc.text('Amortization Schedule', 40, 40);
                }
            });
        }

        doc.save('Pro_RV_Loan_Report.pdf');

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Sorry, there was an error generating the PDF report.");
    } finally {
        setIsGeneratingPDF(false);
    }
  };
  
  // Custom Donut Chart Component (SVG only)
  const DonutChart = ({ data }: { data: { name: string, value: number, color: string }[] }) => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    if (total === 0) return <div className="flex items-center justify-center h-full text-gray-500">No data to display</div>;
    
    let cumulative = 0;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="relative flex items-center justify-center w-64 h-64">
            <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r={radius} fill="transparent" strokeWidth="30" className="text-gray-200 dark:text-gray-700" stroke="currentColor" />
                {data.map((item, index) => {
                    const dashArray = (item.value / total) * circumference;
                    const dashOffset = (cumulative / total) * circumference;
                    cumulative += item.value;
                    return (
                        <circle
                            key={index}
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="transparent"
                            strokeWidth="30"
                            strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                            strokeDashoffset={-dashOffset}
                            transform="rotate(-90 100 100)"
                            style={{ stroke: item.color, transition: 'all 0.5s ease-in-out' }}
                        />
                    );
                })}
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Cost</span>
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{formatCurrency(calculations.totalCost, currency)}</span>
            </div>
        </div>
    );
};

// Custom Line Chart Component (SVG only)
const LineChart = ({ data }: { data: AmortizationRow[] }) => {
    if (!data || data.length === 0) return <div className="flex items-center justify-center h-full text-gray-500">No data to display</div>;
    
    const width = 500;
    const height = 300;
    const padding = 50;

    const maxX = data.length;
    const maxY = Math.max(...data.map(d => d.remainingBalance)) || 1;

    const getX = (val: number) => padding + (val / maxX) * (width - 2 * padding);
    const getY = (val: number) => height - padding - (val / maxY) * (height - 2 * padding);
    
    const path = data.map((point, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(point.remainingBalance)}`).join(' ');

    return (
        <div className="w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Y Axis */}
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} className="stroke-gray-300 dark:stroke-gray-600" />
                {[...Array(5)].map((_, i) => (
                    <g key={i}>
                        <text x={padding - 10} y={getY(i * maxY / 4)} textAnchor="end" alignmentBaseline="middle" className="text-xs fill-current text-gray-500 dark:text-gray-400">
                           {formatCurrency(i * maxY / 4, currency).replace(/[^0-9.,]/g, '')}
                        </text>
                        <line x1={padding} y1={getY(i * maxY / 4)} x2={width-padding} y2={getY(i * maxY / 4)} className="stroke-gray-200 dark:stroke-gray-700 stroke-dasharray-2"/>
                    </g>
                ))}
                
                {/* X Axis */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} className="stroke-gray-300 dark:stroke-gray-600" />
                 {[...Array(5)].map((_, i) => {
                    const paymentNum = Math.round(i * maxX / 4);
                    return (
                    <g key={i}>
                        <text x={getX(paymentNum)} y={height - padding + 20} textAnchor="middle" className="text-xs fill-current text-gray-500 dark:text-gray-400">
                           {paymentNum}
                        </text>
                    </g>
                )})}
                <text x={width/2} y={height-10} textAnchor="middle" className="text-sm fill-current text-gray-600 dark:text-gray-300">Payments (Months)</text>


                <path d={path} fill="none" className="stroke-brand-secondary" strokeWidth="2" style={{ transition: 'd 0.5s ease-in-out' }}/>
            </svg>
        </div>
    );
};

  const renderContent = () => {
    switch(activeTab) {
      case 'summary':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-300">Monthly Payment</div>
                <div className="text-4xl font-bold text-brand-primary dark:text-brand-secondary transition-all duration-300">{formatCurrency(calculations.monthlyPayment, currency)}</div>
            </div>
            <div className="p-6 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="text-sm text-green-600 dark:text-green-300">Total Interest Paid</div>
                <div className="text-4xl font-bold text-green-800 dark:text-green-400 transition-all duration-300">{formatCurrency(calculations.totalInterest, currency)}</div>
            </div>
            <div className="col-span-1 md:col-span-2 space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md"><span>Total Loan Amount</span><span className="font-semibold">{formatCurrency(calculations.totalLoanAmount, currency)}</span></div>
                <div className="flex justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md"><span>Total Cost of RV</span><span className="font-semibold">{formatCurrency(calculations.totalCost, currency)}</span></div>
                {balloonPayment > 0 && <div className="flex justify-between p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-md text-yellow-800 dark:text-yellow-300"><span>Balloon Payment Due</span><span className="font-semibold">{formatCurrency(balloonPayment, currency)}</span></div>}
                {extraPayment > 0 && 
                  <div className="flex justify-between p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-md text-indigo-800 dark:text-indigo-300">
                    <span>Interest Saved w/ Extra Payments</span>
                    <span className="font-semibold">{formatCurrency(calculations.interestSaved, currency)}</span>
                  </div>
                }
            </div>
          </div>
        );
      case 'amortization':
        const schedule = extraPayment > 0 ? calculations.amortizationWithExtra : calculations.amortization;
        return (
            <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Amortization Schedule</h3>
                    <button onClick={downloadAmortizationCSV} className="px-4 py-2 text-sm font-medium text-white bg-brand-secondary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Download CSV
                    </button>
                </div>
                <div className="overflow-auto max-h-96 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                            <tr>
                                {['#', 'Date', 'Payment', 'Principal', 'Interest', 'Balance'].map(header => (
                                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {schedule.map(row => (
                                <tr key={row.paymentNumber} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{row.paymentNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{row.paymentDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatCurrency(row.payment, currency)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{formatCurrency(row.principal, currency)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">{formatCurrency(row.interest, currency)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-300">{formatCurrency(row.remainingBalance, currency)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
      case 'charts':
        const chartData = [
            { name: 'Principal', value: calculations.totalLoanAmount, color: '#3b82f6' }, // blue-500
            { name: 'Interest', value: calculations.totalInterest, color: '#10b981' },   // emerald-500
            { name: 'Fees & Taxes', value: calculations.totalSalesTax + fees, color: '#f97316' }, // orange-500
        ];
        return (
          <div className="animate-fade-in space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-center mb-4">Loan Cost Breakdown</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <DonutChart data={chartData} />
                <div className="space-y-2">
                    {chartData.map(item => (
                        <div key={item.name} className="flex items-center">
                            <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                            <span>{item.name}:</span>
                            <span className="font-semibold ml-2">{formatCurrency(item.value, currency)}</span>
                        </div>
                    ))}
                </div>
              </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-center mb-4">Loan Balance Over Time</h3>
                <LineChart data={calculations.amortization} />
            </div>
          </div>
        );
      default: return null;
    }
  };

  const chartDataForPDF = [
    { name: 'Principal', value: calculations.totalLoanAmount, color: '#3b82f6' },
    { name: 'Interest', value: calculations.totalInterest, color: '#10b981' },
    { name: 'Fees & Taxes', value: calculations.totalSalesTax + fees, color: '#f97316' },
  ];

  // Share Modal Component
  const ShareModal = () => {
    if (!isShareModalOpen) return null;

    const shareableLink = generateShareableLink();
    const shareText = "Check out this RV loan scenario I calculated on ZuraFinanceTools!";
    const shareTitle = "Pro RV Loan Calculator";

    const copyLink = () => {
        navigator.clipboard.writeText(shareableLink).then(() => {
            alert('Link copied to clipboard!');
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md m-4 relative">
                <button onClick={() => setIsShareModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Share Scenario</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Copy this link to save or share your current RV loan calculation.
                </p>
                <div className="flex">
                    <input type="text" readOnly value={shareableLink} className="flex-grow bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md px-3 text-sm" />
                    <button onClick={copyLink} className="px-4 py-2 bg-brand-secondary text-white rounded-r-md hover:bg-blue-600 flex items-center gap-2">
                        <CopyIcon className="w-5 h-5" />
                        <span>Copy</span>
                    </button>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400">Share on social media:</p>
                    <div className="flex justify-center items-center gap-6 mt-3">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`} target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                            <FacebookIcon className="w-9 h-9 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors" />
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableLink)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" title="Share on Twitter">
                            <TwitterIcon className="w-8 h-8 text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-400 transition-colors" />
                        </a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareableLink)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
                            <LinkedInIcon className="w-8 h-8 text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 transition-colors" />
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareableLink)}`} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp">
                            <WhatsAppIcon className="w-8 h-8 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
  };


  return (
    <>
      <ShareModal />
      {/* ARIA Live Region for screen reader announcements */}
      <div aria-live="polite" className="sr-only">
        {liveRegionMessage}
      </div>
      {/* Hidden container for PDF chart generation */}
      <div style={{ position: 'absolute', left: '-9999px', width: '700px', background: 'white', padding: '1rem', color: '#111827', zIndex: -1 }}>
        <div id="pdf-chart-container">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-center mb-4">Loan Cost Breakdown</h3>
                <div className="flex flex-row items-center justify-center gap-8">
                  <DonutChart data={chartDataForPDF} />
                  <div className="space-y-2">
                      {chartDataForPDF.map(item => (
                          <div key={item.name} className="flex items-center">
                              <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                              <span>{item.name}:</span>
                              <span className="font-semibold ml-2">{formatCurrency(item.value, currency)}</span>
                          </div>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                  <h3 className="text-lg font-semibold text-center mb-4">Loan Balance Over Time</h3>
                  <LineChart data={calculations.amortization} />
              </div>
            </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary dark:text-brand-secondary">Pro RV Loan Calculator</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Estimate your RV financing costs, amortization schedules, and total interest with our advanced calculator. Perfect for planning your motorhome, camper van, or luxury RV purchase.
          </p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Loan Details</h2>
            <div className="space-y-4">
                {/* RV Price */}
                <div>
                  <label htmlFor="rvPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">RV Purchase Price</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{currency}</div>
                      <input id="rvPrice" type="number" value={rvPrice} onChange={e => setRvPrice(Number(e.target.value))} className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-brand-secondary focus:border-brand-secondary" />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Down Payment</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                      <input id="downPayment" type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-brand-secondary focus:border-brand-secondary" />
                      <button onClick={() => setDownPaymentType(downPaymentType === 'amount' ? 'percent' : 'amount')} className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-sm">
                          {downPaymentType === 'amount' ? currency : '%'}
                      </button>
                  </div>
                </div>

                {/* Trade-in, Tax, Fees */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label htmlFor="tradeInValue" className="block text-sm font-medium">Trade-in Value</label><input id="tradeInValue" type="number" value={tradeInValue} onChange={e => setTradeInValue(Number(e.target.value))} className="mt-1 w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" /></div>
                    <div><label htmlFor="salesTax" className="block text-sm font-medium">Sales Tax (%)</label><input id="salesTax" type="number" value={salesTax} onChange={e => setSalesTax(Number(e.target.value))} className="mt-1 w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" /></div>
                    <div><label htmlFor="fees" className="block text-sm font-medium">Fees</label><input id="fees" type="number" value={fees} onChange={e => setFees(Number(e.target.value))} className="mt-1 w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" /></div>
                </div>

                {/* Interest Rate & Loan Term */}
                <div>
                  <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (APR)</label>
                  <input id="interestRate" type="number" step="0.01" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="mt-1 w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" />
                </div>

                <div>
                  <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Term</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                      <input id="loanTerm" type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-brand-secondary focus:border-brand-secondary" />
                      <select value={loanTermType} onChange={handleLoanTermTypeChange} className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-sm focus:ring-brand-secondary focus:border-brand-secondary">
                          <option value="years">Years</option>
                          <option value="months">Months</option>
                      </select>
                  </div>
                </div>
                
                {/* Optional Fields */}
                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Optional</h3>
                    <div><label htmlFor="balloonPayment" className="block text-sm font-medium">Balloon Payment</label><input id="balloonPayment" type="number" value={balloonPayment} onChange={e => setBalloonPayment(Number(e.target.value))} className="mt-1 w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" /></div>
                    <div><label htmlFor="extraPayment" className="block text-sm font-medium">Extra Monthly Payment</label><input id="extraPayment" type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} className="mt-1 w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" /></div>
                    <div><label htmlFor="startDate" className="block text-sm font-medium">Start Date</label><input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md" /></div>
                </div>

                {/* Presets */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Presets</h3>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => applyPreset('standard')} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900">Standard RV</button>
                    <button onClick={() => applyPreset('luxury')} className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:hover:bg-green-900">Luxury RV</button>
                    <button onClick={() => applyPreset('camper')} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:hover:bg-yellow-900">Camper Van</button>
                  </div>
                </div>
            </div>
          </div>
          
          {/* Results Panel */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col h-full">
                  <div className="border-b border-gray-200 dark:border-gray-700">
                      <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                          {[{id: 'summary', name: 'Summary'}, {id: 'amortization', name: 'Amortization'}, {id: 'charts', name: 'Charts'}].map(tab => (
                               <button key={tab.id} onClick={() => setActiveTab(tab.id as ActiveTab)}
                                  className={`${activeTab === tab.id ? 'border-brand-secondary text-brand-primary dark:text-brand-secondary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none transition-colors`}>
                                  {tab.name}
                              </button>
                          ))}
                      </nav>
                  </div>
                  <div className="flex-grow py-6">
                      {renderContent()}
                  </div>
                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 justify-end">
                      <button onClick={() => setIsShareModalOpen(true)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                          <ShareIcon className="w-4 h-4" />
                          <span>Share</span>
                      </button>
                      <button onClick={copySummaryToClipboard} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Copy</button>
                      <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-900">Reset</button>
                      <button 
                        onClick={generatePDFReport} 
                        disabled={isGeneratingPDF}
                        className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {isGeneratingPDF ? 'Generating...' : 'Print Report'}
                      </button>
                  </div>
              </div>
          </div>
        </main>

        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">RV Loan Guide: Understanding, Tips & Smart Financing</h2>
          
          <div className="max-w-4xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
            <div className="text-lg leading-relaxed">
              <p className="mb-4">
                Financing an RV is a major financial decision — much like purchasing a car or a home. 
                Using a professional RV loan calculator helps you make an informed choice by breaking down monthly payments, 
                showing how interest accumulates, and revealing the long-term cost of ownership.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">1. How APR and Loan Term Affect Your Payments</h3>
                <p className="mb-4 leading-relaxed">
                  The Annual Percentage Rate (APR) and loan term are two key factors that determine both your monthly payment 
                  and total loan cost.
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div><strong className="text-gray-800 dark:text-gray-100">APR (Interest Rate):</strong> A lower APR means you pay less interest over the life of your RV loan. Even a 1% difference can save you thousands of dollars.</div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div><strong className="text-gray-800 dark:text-gray-100">Loan Term:</strong> A longer term (e.g., 15–20 years) results in lower monthly payments but higher overall interest. Shorter terms increase monthly cost but reduce total financing expense.</div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">2. The Power of Extra Payments</h3>
                <p className="leading-relaxed">
                  Making extra payments directly toward your loan principal can dramatically reduce interest 
                  and shorten your loan term. Even small additional payments each month can save you years 
                  on your loan and thousands in interest.
                </p>
                <p className="mt-3 leading-relaxed">
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mr-2">💡 Tip:</span>
                  Use the calculator's "Extra Payment" field to test how much you could save.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">3. What Is a Balloon Payment?</h3>
                <p className="leading-relaxed mb-3">
                  A <strong className="text-gray-800 dark:text-gray-100">balloon payment</strong> is a large lump-sum payment due at the end of your loan term. 
                  It lowers your regular monthly installments because part of the principal is deferred.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                    <strong>Important:</strong> You must be prepared to pay this large final amount or refinance when it becomes due. 
                    Balloon payments are best suited for borrowers who expect a significant cash inflow later.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">4. Expert Tips to Reduce Your RV Financing Cost</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">💳 Improve Your Credit Score</h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">Higher credit scores qualify you for lower interest rates.</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💰 Make a Larger Down Payment</h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">Paying more upfront reduces the principal and total interest cost.</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">⏰ Choose a Shorter Loan Term</h4>
                    <p className="text-purple-700 dark:text-purple-300 text-sm">If your budget allows, pick a shorter loan term to minimize interest.</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🤝 Negotiate the RV Price</h4>
                    <p className="text-orange-700 dark:text-orange-300 text-sm">Every dollar saved on purchase price lowers your loan balance — and your total cost.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Pro Tip</h4>
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      Use this calculator regularly to compare multiple scenarios — 
                      such as different APRs, loan terms, and down payments — to find the most affordable financing plan for your RV.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-6">How to Use the Pro RV Loan Calculator</h2>

          <div className="max-w-3xl mx-auto space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Our <strong>Pro RV Loan Calculator</strong> helps you estimate your monthly payments, total loan cost, and interest over time — perfect for planning your RV purchase smartly.
            </p>

            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>Enter RV Purchase Price:</strong>  
                Add the total price of the RV you want to finance. This is your starting loan value before any deductions.
              </li>

              <li>
                <strong>Set Down Payment:</strong>  
                Enter the amount or percentage you plan to pay upfront. Click the toggle (<em>$ / %</em>) to switch between dollar and percent values.
              </li>

              <li>
                <strong>Include Trade-in, Sales Tax, and Fees:</strong>  
                If you're trading in an old RV, enter its value. Then adjust sales tax (%) and additional fees to see your total financed amount update automatically.
              </li>

              <li>
                <strong>Adjust Interest Rate and Loan Term:</strong>  
                Enter the APR (interest rate) offered by your lender and select your loan term — either in years or months.
              </li>

              <li>
                <strong>Optional Settings:</strong>  
                Add an <em>extra monthly payment</em> or a <em>balloon payment</em> to see how it affects your total cost and loan duration.
              </li>

              <li>
                <strong>View Results:</strong>  
                Use the tabs at the top:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li><strong>Summary</strong> – See total payments, interest, and costs.</li>
                  <li><strong>Amortization</strong> – View month-by-month payment schedule.</li>
                  <li><strong>Charts</strong> – Visual breakdown of costs and balance over time.</li>
                </ul>
              </li>

              <li>
                <strong>Export or Share:</strong>  
                Use the <em>Print Report</em> button to generate a PDF,  
                or click <em>Share</em> to get a shareable link for your calculation.
              </li>
            </ol>

            <p className="pt-4 border-t border-gray-200 dark:border-gray-700">
              💡 <strong>Pro Tip:</strong> Try different interest rates and down payments to compare financing options and see how much you can save by making extra payments.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-lg">1. How do I calculate my RV monthly payment?</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">The calculator uses the standard amortization formula, factoring in loan amount (purchase price minus down payment/trade-in plus taxes and fees), APR, and loan term to determine your monthly installment.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">2. Can I reduce my RV loan interest?</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Yes, increasing your down payment, choosing a shorter loan term, or making extra monthly payments toward the principal can significantly reduce the total interest paid over the life of the loan.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">3. What’s a balloon payment?</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">A balloon payment is a large final payment that lowers your monthly installments. It's the remaining balance of the loan that's due in a lump sum at the end of the term, which can be risky if you're not prepared for it.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">4. Is this calculator accurate for all RV types?</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Yes, you can use it for any type of recreational vehicle, including motorhomes, camper vans, fifth wheels, or luxury RVs. Simply adjust the purchase price, interest rate, and other variables to match your specific scenario.</p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-center mb-8">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <a href="/tools/percentage-change-calculator" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-brand-secondary dark:hover:border-brand-secondary transition-all duration-300 group">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg mb-4">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs><linearGradient id="percentGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
                            <path d="M16 4H8C6.9 4 6 4.9 6 6V18C6 19.1 6.9 20 8 20H16C17.1 20 18 19.1 18 18V6C18 4.9 17.1 4 16 4ZM8.5 7.5C9.33 7.5 10 8.17 10 9C10 9.83 9.33 10.5 8.5 10.5C7.67 10.5 7 9.83 7 9C7 8.17 7.67 7.5 8.5 7.5ZM15.5 16.5C14.67 16.5 14 15.83 14 15C14 14.17 14.67 13.5 15.5 13.5C16.33 13.5 17 14.17 17 15C17 15.83 16.33 16.5 15.5 16.5ZM16 12H8V10L16 6V8H8V10H16V12Z" fill="url(#percentGrad)"/>
                        </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-brand-primary dark:group-hover:text-brand-secondary">Percentage Change Calculator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate percentage increase or decrease between two numbers.</p>
                </a>
                <a href="/tools/time-difference-calculator" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-brand-secondary dark:hover:border-brand-secondary transition-all duration-300 group">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg mb-4">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs><linearGradient id="timeGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d946ef" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="url(#timeGrad)" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-brand-primary dark:group-hover:text-brand-secondary">Date Difference Calculator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate exact duration between two dates in years, months, and days.</p>
                </a>
                <a href="/tools/fabric-costing-tool" className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-brand-secondary dark:hover:border-brand-secondary transition-all duration-300 group">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg mb-4">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs><linearGradient id="fabricGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
                            <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17L12 12L2 17ZM2 12L12 17L22 12L12 7L2 12Z" fill="url(#fabricGrad)" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 group-hover:text-brand-primary dark:group-hover:text-brand-secondary">Fabric Costing Calculator</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Professional fabric costing tool with yarn consumption calculations.</p>
                </a>
            </div>
        </section>

      </div>
    </>
  );
};

export default ProRVLoanCalculator;
