import React from 'react';

const QuoteIcon = () => (
    <svg className="w-10 h-10 text-slate-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
);

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; avatar: string; rating: number; }> = ({ quote, name, role, avatar, rating }) => (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">✓ Verified</span>
        </div>
        <p className="text-slate-700 leading-relaxed flex-grow mb-6">"{quote}"</p>
        <div className="flex items-center">
            <div className="relative">
                <img loading="lazy" className="w-14 h-14 rounded-full object-cover border-2 border-blue-200" src={avatar} alt={name} />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="ml-4">
                <p className="font-bold text-slate-900">{name}</p>
                <p className="text-sm text-slate-500">{role}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            quote: "The UTA GPA Calculator saved me hours! It perfectly matches my university's grading scale with plus/minus grades. Got my exact GPA for scholarship applications.",
            name: 'Emily R.',
            role: 'University of Texas at Arlington Student',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
            rating: 5
        },
        {
            quote: "I use the SAT and ACT score calculators to help my students understand their college readiness. These tools are accurate and easy to use—perfect for guidance counselors.",
            name: 'Mr. David K.',
            role: 'High School Counselor',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
            rating: 5
        },
        {
            quote: "LSAC GPA Calculator is exactly what I needed for law school applications. The CAS GPA calculations matched my official report perfectly!",
            name: 'Jessica M.',
            role: 'Pre-Law Student',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1',
            rating: 5
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" style={{backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">Trusted by Students Nationwide</h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Real students, real results from our education calculators
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