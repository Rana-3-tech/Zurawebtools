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
                        Empowering students and educators worldwide with free, accurate academic tools.
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
                                Our mission is simple: to support students worldwide with accurate, free academic tools. We believe that every student—whether applying to college, tracking GPA, or preparing for standardized tests—deserves access to reliable calculators without paywalls or subscriptions. Education should be accessible to all.
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
                                ZuraWebTools started from a student's frustration: why are accurate GPA calculators so hard to find? As students ourselves, we experienced the stress of manually calculating grades and wondering if university-specific formulas were applied correctly.
                            </p>
                            <p>
                                We set out to create something different. A suite of education tools that is accurate, user-friendly, and completely free for every student. Each calculator is crafted with university-specific grading scales and official test scoring rubrics. We're driven by the student community we serve and constantly update our tools with the latest academic requirements.
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
                            <h3 className="text-2xl font-semibold mb-3 text-brand-blue">Accessibility for All</h3>
                            <p className="text-gray-600">100% free academic tools. No paywalls, no subscriptions. Every student deserves equal access to education resources.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                             <h3 className="text-2xl font-semibold mb-3 text-brand-blue">Academic Accuracy</h3>
                            <p className="text-gray-600">University-specific formulas, official test rubrics, verified grading scales. Every calculation is tested for precision.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                             <h3 className="text-2xl font-semibold mb-3 text-brand-blue">Constant Updates</h3>
                            <p className="text-gray-600">University requirements change. We monitor official sources and update our tools to reflect the latest academic standards.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;