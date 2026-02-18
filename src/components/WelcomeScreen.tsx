import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface WelcomeScreenProps {
    onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);

    const name = "ABHAY AHLAWAT";

    useEffect(() => {
        document.body.classList.add('scroll-locked');

        const ctx = gsap.context(() => {
            const letters = nameRef.current?.querySelectorAll('.welcome-letter');
            if (!letters) return;

            const tl = gsap.timeline({
                onComplete: () => {
                    // Exit animation
                    const exitTl = gsap.timeline({
                        onComplete: () => {
                            document.body.classList.remove('scroll-locked');
                            onComplete();
                        }
                    });

                    exitTl
                        .to(taglineRef.current, {
                            opacity: 0,
                            y: -20,
                            duration: 0.3,
                            ease: "power2.in"
                        })
                        .to(lineRef.current, {
                            scaleX: 0,
                            duration: 0.3,
                            ease: "power2.in"
                        }, "<")
                        .to(letters, {
                            y: -30,
                            opacity: 0,
                            stagger: 0.02,
                            duration: 0.3,
                            ease: "power2.in"
                        }, "<0.1")
                        .to(overlayRef.current, {
                            clipPath: "inset(0 0 100% 0)",
                            duration: 0.8,
                            ease: "power4.inOut"
                        }, "-=0.1");
                }
            });

            // Phase 1: Staggered letter reveal
            tl.from(letters, {
                y: 80,
                opacity: 0,
                rotateX: -90,
                duration: 0.8,
                stagger: 0.04,
                ease: "power3.out"
            });

            // Phase 2: Line expand + tagline
            tl.fromTo(lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
                "-=0.2"
            );

            tl.fromTo(taglineRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                "-=0.3"
            );

            // Hold for a beat
            tl.to({}, { duration: 0.6 });

        }, overlayRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
            style={{ clipPath: "inset(0 0 0 0)" }}
        >
            {/* Subtle dot grid texture */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            />

            {/* Name */}
            <div ref={nameRef} className="relative z-10 flex flex-wrap justify-center gap-x-[0.02em] sm:gap-x-[0.05em] overflow-hidden px-3 sm:px-4 max-w-[95vw] sm:max-w-none">
                {name.split('').map((char, i) => (
                    <span
                        key={i}
                        className="welcome-letter inline-block text-white font-black tracking-tighter leading-none"
                        style={{
                            fontSize: 'clamp(1.5rem, 7vw, 7rem)',
                            transformOrigin: 'bottom center',
                            ...(char === ' ' ? { width: '0.25em' } : {})
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </div>

            {/* Divider line */}
            <div
                ref={lineRef}
                className="relative z-10 w-16 sm:w-24 h-px bg-white/40 mt-4 sm:mt-6 mb-3 sm:mb-4 origin-center"
                style={{ transform: 'scaleX(0)' }}
            />

            {/* Tagline */}
            <p
                ref={taglineRef}
                className="relative z-10 text-white/60 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.3em] uppercase font-light opacity-0"
            >
                Creative Developer
            </p>
        </div>
    );
};

export default WelcomeScreen;
