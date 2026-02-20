export const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-12 sm:py-20 px-4 sm:px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8 sm:gap-10">
                <div>
                    <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tighter mb-4 sm:mb-6">Let's create<br />something epic.</h2>
                    <a href="mailto:ahlawatabhay21@gmail.com" className="text-base sm:text-xl border-b border-white pb-1 hover:opacity-70 transition-opacity break-all">ahlawatabhay21@gmail.com</a>
                </div>
                <div className="flex gap-4 sm:gap-6 text-sm uppercase tracking-widest text-zinc-500 flex-wrap">
                    <a href="https://www.linkedin.com/in/abhay-ahlawat-a97b75229/" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://github.com/abhayahlawat" className="hover:text-white transition-colors">GitHub</a>
                    <a href="https://www.instagram.com/abhay_ahlawat533/" className="hover:text-white transition-colors">Instagram</a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 sm:mt-20 text-xs text-zinc-700 uppercase flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between">
                <span>© 2025 Abhay's Portfolio</span>
                <span>Designed & Built with React</span>
            </div>
        </footer>
    );
};
