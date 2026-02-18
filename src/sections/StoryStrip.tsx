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
            <section ref={containerRef} className="h-screen text-white flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden">
                <div ref={textRef} className="max-w-4xl text-center relative w-full h-full flex justify-center items-center">
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
