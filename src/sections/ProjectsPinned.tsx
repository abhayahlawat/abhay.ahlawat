import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import projects from '../data/projects.json';

const ProjectsPinned: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>('.project-card');

            cards.forEach((card, i) => {
                const nextCard = cards[i + 1];
                if (!nextCard) return;

                gsap.to(card, {
                    scale: 0.9,
                    filter: "brightness(0.5)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: nextCard,
                        start: "top top",
                        end: "top top",
                        scrub: true
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="work" className="bg-white text-black py-20">
            <div className="px-6 mb-20">
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter">SELECTED<br />WORKS</h2>
            </div>

            <div className="relative">
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="project-card min-h-screen flex flex-col md:flex-row border-t border-black sticky top-0 bg-white origin-top transition-transform will-change-transform"
                        style={{ top: 0, zIndex: i + 1 }}
                    >
                        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center min-h-[60vh] md:h-screen">
                            <div>
                                <span className="text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">{project.year} — {project.role}</span>
                                <h3 className="text-3xl sm:text-5xl md:text-8xl font-black mb-4 sm:mb-6 tracking-tighter leading-none">{project.title}</h3>
                                <p className="text-base sm:text-xl max-w-md leading-relaxed">{project.summary}</p>
                            </div>
                            <div className="flex gap-2 mt-6 sm:mt-10 flex-wrap">
                                {project.tags.map(tag => (
                                    <span key={tag} className="group relative border border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs uppercase font-bold overflow-hidden cursor-pointer transition-colors hover:text-white">
                                        <span className="relative z-10">{tag}</span>
                                        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    </span>
                                ))}
                            </div>
                            {(project as any).liveUrl && (
                                <a
                                    href={(project as any).liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 mt-6 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-0.5 hover:opacity-50 transition-opacity w-fit"
                                >
                                    Live Site
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </a>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 bg-zinc-100 h-[40vh] md:h-screen overflow-hidden relative">
                            <img src={project.cover} alt={project.title} className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsPinned;
