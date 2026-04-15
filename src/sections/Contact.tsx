import React, { useState, type FormEvent } from 'react';

const Contact: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        setStatus('loading');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus('success');
            (e.target as HTMLFormElement).reset();
            
            // Set back to idle after a few seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-black text-white min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-10">Get in touch</h2>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative z-0 w-full group">
                            <input type="text" name="name" id="name" disabled={status === 'loading'} className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-white/50 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-colors disabled:opacity-50" placeholder=" " required />
                            <label htmlFor="name" className="absolute text-base text-white/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text">Name</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="email" name="email" id="email" disabled={status === 'loading'} className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-white/50 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-colors disabled:opacity-50" placeholder=" " required />
                            <label htmlFor="email" className="absolute text-base text-white/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text">Email</label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full group">
                        <textarea name="message" id="message" rows={4} disabled={status === 'loading'} className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-white/50 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-colors resize-none disabled:opacity-50" placeholder=" " required></textarea>
                        <label htmlFor="message" className="absolute text-base text-white/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text">Message</label>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="group relative px-6 sm:px-8 py-3 bg-transparent border border-white text-white font-bold uppercase tracking-widest overflow-hidden rounded-full transition-colors hover:text-black cursor-pointer text-sm sm:text-base inline-block disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 transition-colors duration-300">
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </button>

                        {status === 'success' && (
                            <p className="text-sm xl:text-base text-green-400 font-medium">Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className="text-sm xl:text-base text-red-400 font-medium">Failed to send message. Please try again.</p>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
