const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-20 px-6 bg-black text-white min-h-screen flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-6xl font-bold mb-10">Get in touch</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Name" className="bg-transparent border-b border-white/50 py-4 focus:border-white outline-none transition-colors" />
                        <input type="email" placeholder="Email" className="bg-transparent border-b border-white/50 py-4 focus:border-white outline-none transition-colors" />
                    </div>
                    <textarea placeholder="Message" rows={4} className="w-full bg-transparent border-b border-white/50 py-4 focus:border-white outline-none transition-colors"></textarea>
                    <button
                        type="submit"
                        className="group relative px-8 py-3 bg-transparent border border-white text-white font-bold uppercase tracking-widest overflow-hidden rounded-full mt-4 transition-colors hover:text-black cursor-pointer"
                    >
                        <span className="relative z-10 transition-colors duration-300">Send Message</span>
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
