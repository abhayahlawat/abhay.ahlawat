const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-black text-white min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-10">Get in touch</h2>
                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative z-0 w-full group">
                            <input type="text" name="name" id="name" className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-white/50 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-colors" placeholder=" " required />
                            <label htmlFor="name" className="absolute text-base text-white/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text">Name</label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input type="email" name="email" id="email" className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-white/50 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-colors" placeholder=" " required />
                            <label htmlFor="email" className="absolute text-base text-white/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text">Email</label>
                        </div>
                    </div>
                    <div className="relative z-0 w-full group">
                        <textarea name="message" id="message" rows={4} className="block py-3 px-0 w-full text-base text-white bg-transparent border-0 border-b border-white/50 appearance-none focus:outline-none focus:ring-0 focus:border-white peer transition-colors resize-none" placeholder=" " required></textarea>
                        <label htmlFor="message" className="absolute text-base text-white/50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 cursor-text">Message</label>
                    </div>
                    <button
                        type="submit"
                        className="group relative px-6 sm:px-8 py-3 bg-transparent border border-white text-white font-bold uppercase tracking-widest overflow-hidden rounded-full mt-8 transition-colors hover:text-black cursor-pointer text-sm sm:text-base inline-block"
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
