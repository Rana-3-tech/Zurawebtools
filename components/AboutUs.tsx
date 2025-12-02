import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero Section */}
            <section className="relative bg-slate-800 text-white text-center py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-cyan/10 rounded-full blur-3xl"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
                        About ZuraWebTools
                    </h1>
                    <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
                        Empowering creators, marketers, and developers with free, powerful AI-driven tools.
                    </p>
                </div>
            </section>

            {/* Mission & Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="prose lg:prose-lg">
                            <h2 className="text-4xl font-bold text-gray-900 !mb-4">Our Mission</h2>
                            <p className="text-gray-600">
                                Our mission is simple: to democratize access to high-quality digital tools. We believe that everyone—from students learning the ropes to seasoned professionals scaling their business—should have the resources they need to succeed online without facing a paywall.
                            </p>
                        </div>
                        <div>
                            <img 
                                loading="lazy"
                                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                alt="A diverse team collaborating in a modern office" 
                                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="prose lg:prose-lg max-w-3xl mx-auto text-gray-600">
                            <p>
                                ZuraWebTools started as a small side project, born from a simple observation: while premium tools offered powerful features, free alternatives were often cluttered with ads, had poor user experiences, or lacked reliability.
                            </p>
                            <p>
                                We set out to create something different. A suite of tools that is clean, user-friendly, powerful, and completely free for everyone. Each tool is crafted with care, focusing on solving real-world problems for creators and developers. We're driven by the community we serve and are constantly working to improve and expand our offerings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Core Values Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                            <h3 className="text-2xl font-semibold mb-3 text-brand-blue">Accessibility</h3>
                            <p className="text-gray-600">We believe powerful tools should be available to everyone, regardless of their budget. That's why our tools are, and always will be, free.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                             <h3 className="text-2xl font-semibold mb-3 text-brand-blue">User-Focused</h3>
                            <p className="text-gray-600">Your workflow is our priority. We design intuitive, ad-free interfaces so you can get the job done without distractions.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                             <h3 className="text-2xl font-semibold mb-3 text-brand-blue">Innovation</h3>
                            <p className="text-gray-600">We leverage the latest in AI and web technology to build smart, efficient tools that make a real difference in your productivity.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;