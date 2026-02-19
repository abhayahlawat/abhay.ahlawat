import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const StoryStrip: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const texts = gsap.utils.toArray<HTMLElement>('.reveal-text');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%", // Pin duration
                    pin: true,
                    scrub: 1,
                    refreshPriority: 1 // Calculation priority
                }
            });

            // Hide all texts initially
            gsap.set(texts, { opacity: 0, y: 50 });

            texts.forEach((text, i) => {
                const isLast = i === texts.length - 1;

                tl.to(text, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
                    .to(text, { opacity: isLast ? 1 : 0, y: isLast ? 0 : -50, duration: 1, ease: "power2.in" }, "+=0.5"); // Delay fade out
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="story" className="bg-black">
            <section ref={containerRef} className="h-screen text-white flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden relative">
                {/* Perspective Grid Background */}
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-0 overflow-hidden">
                    <div
                        className="w-[200%] h-[60%]"
                        style={{
                            perspective: '400px',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                transformStyle: 'preserve-3d',
                                transform: 'rotateX(60deg)',
                                backgroundImage:
                                    'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
                                backgroundSize: '60px 60px',
                                maskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 85%)',
                                WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 40%, transparent 85%)',
                            }}
                        />
                    </div>
                </div>

                <div ref={textRef} className="max-w-4xl text-center relative w-full h-full flex justify-center items-center z-10">
                    {/* Position absolute so they overlap in the center */}
                    <p className="reveal-text absolute text-2xl sm:text-4xl md:text-7xl font-medium leading-tight opacity-0">
                        I believe that every pixel tells a story.
                    </p>
                    <p className="reveal-text absolute text-2xl sm:text-4xl md:text-7xl font-medium leading-tight text-zinc-400 opacity-0">
                        From concept to code, I craft digital experiences that resonate and engage.
                    </p>
                    <p className="reveal-text absolute text-2xl sm:text-4xl md:text-7xl font-medium leading-tight text-white opacity-0">
                        Building the future, one scroll at a time.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default StoryStrip;
