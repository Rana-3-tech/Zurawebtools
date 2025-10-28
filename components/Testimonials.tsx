import React from 'react';

const QuoteIcon = () => (
    <svg className="w-10 h-10 text-slate-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
);

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; avatar: string; }> = ({ quote, name, role, avatar }) => (
    <div className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700 h-full flex flex-col">
        <div className="mb-4">
            <QuoteIcon />
        </div>
        <p className="text-slate-400 italic flex-grow">"{quote}"</p>
        <div className="flex items-center mt-6">
            <img loading="lazy" className="w-12 h-12 rounded-full object-cover border-2 border-brand-cyan" src={avatar} alt={name} />
            <div className="ml-4">
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-slate-500">{role}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            quote: "The YouTube Tag Generator is a game-changer! My video views have increased by 50% since I started using it. Highly recommended.",
            name: 'Sarah L.',
            role: 'Content Creator',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1'
        },
        {
            quote: "I love how simple and effective these tools are. As a small business owner, ZuraWebTools saves me a ton of time on my SEO tasks.",
            name: 'Mark T.',
            role: 'Digital Marketer',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1'
        },
        {
            quote: "Finally, a collection of web tools that are actually free and work great. The Meta Title checker is my go-to for on-page SEO.",
            name: 'Jessica P.',
            role: 'SEO Specialist',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1'
        }
    ];

    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">What Our Users Say</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        Real stories from satisfied users who have boosted their online presence.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <TestimonialCard key={testimonial.name} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;