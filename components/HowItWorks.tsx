import React from 'react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: '1',
            title: 'Enter Your Grades',
            description: 'Input your course grades, credit hours, and grade scale. Our calculators support weighted grades, plus/minus systems, and university-specific grading policies.',
            icon: (
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            color: 'from-blue-500 to-cyan-500'
        },
        {
            number: '2',
            title: 'Calculate Instantly',
            description: 'Click calculate and our advanced algorithms process your data using official formulas. Get accurate GPA, test scores, and admission requirements in seconds.',
            icon: (
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            color: 'from-purple-500 to-pink-500'
        },
        {
            number: '3',
            title: 'View Your Results',
            description: 'See detailed breakdowns with cumulative GPA, semester averages, percentile rankings, and personalized recommendations for improvement.',
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: 'from-green-500 to-emerald-500'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" style={{backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
            
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Calculate your GPA and test scores in three simple steps
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            {/* Connector Line (hidden on mobile, shown between cards on desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-slate-200 -translate-x-1/2 z-0">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-slate-300"></div>
                                </div>
                            )}

                            {/* Step Card */}
                            <div className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200">
                                {/* Step Number Badge */}
                                <div className={`absolute -top-5 -left-5 w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="mb-6 mt-4">
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
                        <a 
                            href="/education-and-exam-tools"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Get Started - It's Free!
                        </a>
                        <p className="text-slate-600">
                            ✓ No signup required · ✓ 100% accurate · ✓ Instant results
                        </p>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                        <div className="text-sm text-slate-600">Students Trust Us</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">37+</div>
                        <div className="text-sm text-slate-600">Specialized Calculators</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                        <div className="text-sm text-slate-600">Accuracy Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
                        <div className="text-sm text-slate-600">Free Forever</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
