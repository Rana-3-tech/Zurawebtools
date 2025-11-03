import React from 'react';

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-lg transform transition-transform duration-300 hover:-translate-y-2">
        <div className="flex justify-center items-center w-16 h-16 mx-auto bg-slate-800 rounded-full mb-6">
            {icon}
        </div>
        <div className="text-center">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-slate-400">{description}</p>
        </div>
    </div>
);

const WhyChooseUs: React.FC = () => {
    const features = [
        {
            icon: <svg aria-hidden="true" className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
            title: 'AI-Powered',
            description: 'Leverage cutting-edge AI to get smarter, faster, and more accurate results for your tasks.'
        },
        {
            icon: <svg aria-hidden="true" className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"></path><path d="M12 12h.01"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12a5 5 0 0110 0v2a5 5 0 01-10 0v-2z"></path></svg>,
            title: 'Completely Free',
            description: 'All our tools are available for free, with no hidden charges or subscription fees.'
        },
        {
            icon: <svg aria-hidden="true" className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
            title: 'User-Friendly',
            description: 'Our tools are designed with a clean and intuitive interface, making them easy for anyone to use.'
        }
    ];

    return (
        <section className="py-20 bg-slate-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">Why Choose ZuraWebTools?</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        We provide powerful, reliable, and easy-to-use tools to help you succeed.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <Feature key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;