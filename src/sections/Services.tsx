import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const services = [
    { title: "Digital Strategy", description: "Defining the roadmap for digital transformation." },
    { title: "UI/UX Design", description: "Crafting intuitive and engaging user experiences." },
    { title: "Web Development", description: "Building robust, scalable, and performant applications." },
    { title: "Motion Direction", description: "Adding life and narrative through motion." }
];

const Services: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray<HTMLElement>('.service-item');

            items.forEach((item) => {
                const line = item.querySelector('.service-line');
                const title = item.querySelector('h3');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "top 60%",
                        scrub: 1
                    }
                });

                tl.fromTo(title, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
                    .fromTo(line, { width: "0%" }, { width: "100%", duration: 1 }, "<");
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="services" ref={containerRef} className="py-16 sm:py-32 px-4 sm:px-6 bg-zinc-950 text-white min-h-screen flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-sm font-bold tracking-widest uppercase mb-10 sm:mb-20 text-zinc-500">04 — The Services</h2>

                <div className="space-y-10">
                    {services.map((service, i) => (
                        <div key={i} className="service-item group">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
                                <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter group-hover:text-zinc-300 transition-colors">{service.title}</h3>
                                <p className="text-base sm:text-lg text-zinc-500 md:max-w-xs text-left md:text-right mt-2 sm:mt-4 md:mt-0">{service.description}</p>
                            </div>
                            <div className="h-[1px] bg-zinc-800 w-full relative">
                                <div className="service-line absolute left-0 top-0 h-full bg-white w-0"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
