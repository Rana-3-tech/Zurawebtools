import React from 'react';



const WhyChooseUs: React.FC = () => {
    const features = [
        {
            icon: <svg aria-hidden="true" className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
            title: 'AI-Powered',
            number: '01',
            description: 'Leverage cutting-edge AI to get smarter, faster, and more accurate results for your tasks.',
            color: 'blue'
        },
        {
            icon: <svg aria-hidden="true" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path><path d="M12 12h.01"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12a5 5 0 0110 0v2a5 5 0 01-10 0v-2z"></path></svg>,
            title: 'Completely Free',
            number: '02',
            description: 'All our tools are available for free, with no hidden charges or subscription fees.',
            color: 'green'
        },
        {
            icon: <svg aria-hidden="true" className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
            title: 'User-Friendly',
            number: '03',
            description: 'Our tools are designed with a clean and intuitive interface, making them easy for anyone to use.',
            color: 'purple'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">Why Choose ZuraWebTools?</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Powerful, reliable, and easy-to-use tools to help you succeed
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <div key={feature.title} className="group relative bg-white p-8 rounded-2xl border-2 border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <div className="absolute top-6 right-6 text-6xl font-bold text-slate-100 group-hover:text-blue-50 transition-colors">{feature.number}</div>
                            <div className={`flex justify-center items-center w-16 h-16 mx-auto bg-${feature.color}-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <div className="text-center relative z-10">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;