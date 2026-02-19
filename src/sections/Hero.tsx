import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import LottiePlayer from '../components/scrolly/LottiePlayer';
import circleAnimation from '../assets/circle.json';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const prologueRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    scrub: 2,
                    refreshPriority: 1
                }
            });


            tl.to(prologueRef.current, { opacity: 0, scale: 0.8, duration: 0.6, ease: "power2.inOut" })
                .fromTo(titleRef.current,
                    { opacity: 0, scale: 1.15, filter: "blur(12px)" },
                    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
                    "-=0.2"
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="hero">
            <section ref={containerRef} className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-white text-black px-6">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <LottiePlayer animationData={circleAnimation} className="w-full h-full object-cover" />
                </div>

                {/* Prologue State */}
                <div ref={prologueRef} className="absolute inset-0 flex items-center justify-center z-20 bg-white">
                    <p className="text-lg sm:text-xl md:text-3xl font-light italic tracking-widest text-zinc-500">
                        Chapter 01 <br />
                        <span className="not-italic font-bold text-black mt-2 block">The Spark</span>
                    </p>
                </div>

                {/* Main Title State */}
                <div ref={titleRef} className="z-10 text-center opacity-0">
                    <h1 className="text-[12vw] leading-[0.85] sm:leading-[0.9] font-black tracking-tighter mix-blend-exclusion text-black">
                        VISUAL<br />STORYTELLER
                    </h1>
                    <p className="mt-4 sm:mt-8 text-base sm:text-xl max-w-md mx-auto font-medium px-2">
                        Bridging the gap between cinematic narrative and digital product design.
                    </p>
                </div>

                {/* Scroll indicator */}
                <a href="#story" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30 opacity-50 hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
                    <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </a>
            </section>
        </div>
    );
};

export default Hero;
