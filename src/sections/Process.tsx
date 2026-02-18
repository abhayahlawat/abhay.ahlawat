import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const steps = [
    { number: '01', title: 'Discovery', desc: 'Understanding the core vision and objectives.' },
    { number: '02', title: 'Strategy', desc: 'Planning the user journey and technical architecture.' },
    { number: '03', title: 'Design', desc: 'Crafting the visual language and interaction patterns.' },
    { number: '04', title: 'Development', desc: 'Building with clean, performant, and scalable code.' },
    { number: '05', title: 'Launch', desc: 'Deploying to the world with precision and care.' }
];

const Process: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current,
                { translateX: 0 },
                {
                    translateX: "-300vw",
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "+=2000",
                        scrub: 0.6,
                        pin: true,
                        refreshPriority: 1 // Calculation priority
                    }
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="process">
            <section ref={triggerRef} className="overflow-hidden">
                {/* The container that gets pinned */}
                <div className="h-screen w-full flex items-center bg-white text-black">
                    {/* The moving track */}
                    <div ref={sectionRef} className="flex flex-nowrap h-full">
                        {steps.map((step) => (
                            <div key={step.number} className="w-screen h-full flex flex-col justify-center px-10 md:px-32 shrink-0 border-r border-zinc-200">
                                <span className="text-9xl font-black text-transparent stroke-black stroke-2 opacity-10" style={{ WebkitTextStroke: '2px black' }}>
                                    {step.number}
                                </span>
                                <h4 className="text-6xl md:text-8xl font-black -mt-10 mb-6">{step.title}</h4>
                                <p className="text-2xl md:text-3xl max-w-2xl font-light text-zinc-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Process;
