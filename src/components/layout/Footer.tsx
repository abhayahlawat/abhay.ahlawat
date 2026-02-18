export const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-20 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
                <div>
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">Let's create<br />something epic.</h2>
                    <a href="mailto:ahlawatabhay21@gmail.com" className="text-xl border-b border-white pb-1 hover:opacity-70 transition-opacity">ahlawatabhay21@gmail.com</a>
                </div>
                <div className="flex gap-6 text-sm uppercase tracking-widest text-zinc-500">
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 text-xs text-zinc-700 uppercase flex justify-between">
                <span>© 2025 Abhay's Portfolio</span>
                <span>Designed & Built with React</span>
            </div>
        </footer>
    );
};
