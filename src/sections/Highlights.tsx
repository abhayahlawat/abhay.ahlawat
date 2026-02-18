import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const archiveItems = [
    { id: '01', title: 'Generative Grid', category: 'WebGL', year: '2024', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop' },
    { id: '02', title: 'Fluid Typography', category: 'Interaction', year: '2024', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop' },
    { id: '03', title: 'Physics Engine', category: 'Simulation', year: '2023', image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=600&auto=format&fit=crop' },
    { id: '04', title: 'Audio Reactive', category: 'Sound', year: '2023', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop' },
    { id: '05', title: 'Data Sonification', category: 'Data', year: '2022', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop' },
    { id: '06', title: 'Neural Style', category: 'AI', year: '2022', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop' }
];

const Highlights: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeItem, setActiveItem] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal list items
            const items = gsap.utils.toArray<HTMLElement>('.archive-row');
            gsap.fromTo(items,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%"
                    }
                }
            );

            // Cursor follower
            const moveCursor = (e: MouseEvent) => {
                if (!cursorRef.current) return;
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: "power3.out"
                });
            };

            window.addEventListener('mousemove', moveCursor);
            return () => window.removeEventListener('mousemove', moveCursor);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Handle hover states
    useEffect(() => {
        if (!cursorRef.current) return;

        if (activeItem !== null) {
            gsap.to(cursorRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
        } else {
            gsap.to(cursorRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.3
            });
        }
    }, [activeItem]);

    return (
        <section id="highlights" ref={sectionRef} className="py-16 sm:py-32 px-4 sm:px-6 bg-zinc-950 text-zinc-300 min-h-screen relative cursor-default">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10 sm:mb-20 border-b border-zinc-800 pb-6 flex justify-between items-end">
                <div>
                    <span className="block text-xs font-mono text-zinc-500 mb-2">CHAPTER 06</span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-wide sm:tracking-widest uppercase">The Archive</h2>
                </div>
                <div className="hidden md:block text-right">
                    <span className="block text-xs font-mono text-zinc-500">SELECTED EXPERIMENTS</span>
                    <span className="block text-xs font-mono text-zinc-500">2022 — 2024</span>
                </div>
            </div>

            {/* List */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col">
                    {archiveItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="archive-row group relative py-8 border-b border-zinc-900 flex justify-between items-center transition-colors hover:bg-zinc-900/50 px-4 cursor-pointer"
                            onMouseEnter={() => setActiveItem(index)}
                            onMouseLeave={() => setActiveItem(null)}
                        >
                            <div className="flex items-center gap-3 sm:gap-8">
                                <span className="font-mono text-xs text-zinc-600 group-hover:text-white transition-colors hidden sm:inline">EXP_{item.id}</span>
                                <h3 className="text-lg sm:text-2xl md:text-4xl font-bold text-zinc-400 group-hover:text-white transition-colors">{item.title}</h3>
                            </div>
                            <div className="flex gap-8 text-sm font-mono text-zinc-600">
                                <span className="hidden md:inline-block group-hover:text-zinc-400 transition-colors">{item.category}</span>
                                <span className="group-hover:text-zinc-400 transition-colors">{item.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Preview Window (Fixed to viewport, moves with mouse) */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-80 h-56 pointer-events-none z-50 overflow-hidden rounded-lg shadow-2xl opacity-0 hidden md:block"
                style={{ transform: 'translate(-50%, -50%)' }}
            >
                {/* Content changes based on active item */}
                <div className="w-full h-full bg-zinc-900 relative">
                    {activeItem !== null && (
                        <img
                            src={archiveItems[activeItem].image}
                            alt={archiveItems[activeItem].title}
                            className="w-full h-full object-cover grayscale"
                        />
                    )}
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-white">
                        PREVIEW
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Highlights;
