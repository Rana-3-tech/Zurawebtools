import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
            setStatus('Please fill out all fields.');
            return;
        }
        const mailtoLink = `mailto:arrehman.eng15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
        setStatus('Your email client has been opened. Please send the message.');
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" placeholder="your@email.com" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" placeholder="What is this about?" />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue" placeholder="Your message..."></textarea>
                        </div>
                        <div className="mt-6 text-center">
                            <button type="submit" className="inline-block bg-brand-blue text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all">
                                Send Message
                            </button>
                        </div>
                        {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
