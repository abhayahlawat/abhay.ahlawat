import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Orb from '../components/bits/Orb';

const experiences = [
    {
        id: 1,
        title: "Software Development Engineer 1",
        company: "KampusHR",
        location: "Remote",
        period: "June 2025 - Feb 2026",
        description: "Worked as a full-stack developer building HR technology solutions, contributing to product features and platform improvements.",
        achievements: [
            "Developed and maintained full-stack features for the HR platform",
            "Collaborated with cross-functional teams to deliver product milestones",
            "Implemented scalable solutions using modern web technologies"
        ]
    },
    {
        id: 2,
        title: "Relationship Manager",
        company: "Realty Assistant",
        location: "Noida, IN",
        period: "Jan 2025 - June 2025",
        description: "Collaborated with clients to understand business needs and suggested digital-first solutions, including property listing platforms and CRM tools.",
        achievements: [
            "Managed product catalogs and online listings similar to Shopify e-commerce platforms",
            "Streamlined workflows through CRM, website integrations, and lead management platforms",
            "Specialized in client requirement gathering and translating business goals into technical solutions"
        ]
    },
    {
        id: 3,
        title: "Software Development Intern",
        company: "IBM",
        location: "Noida, IN",
        period: "June - July 2024",
        description: "Participated in software development projects and gained exposure to enterprise-level development practices and methodologies.",
        achievements: [
            "Contributed to software development projects using modern technologies",
            "Learned enterprise development practices and agile methodologies",
            "Collaborated with senior developers on code reviews and best practices"
        ]
    },
    {
        id: 4,
        title: "Freelance Web Developer",
        company: "Self-Employed",
        location: "Remote",
        period: "Jan 2022 - June 2024",
        description: "Provided web development services to small businesses and startups. Specialized in creating modern, responsive websites and web applications.",
        achievements: [
            "Delivered 7+ successful projects for various clients",
            "Maintained 100% client satisfaction rate",
            "Established long-term partnerships with repeat clients"
        ]
    }
];

const Experience: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const orbWrapperRef = useRef<HTMLDivElement>(null);
    const orbTextRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Phase 1 → 2: Orb zoom-in portal effect (pinned)
            const portalTl = gsap.timeline({
                scrollTrigger: {
                    trigger: portalRef.current,
                    start: "top top",
                    end: "+=80%",
                    pin: true,
                    scrub: 3,
                    refreshPriority: 1,
                }
            });

            // Scale orb massively and fade text
            portalTl
                .to(orbTextRef.current, {
                    scale: 2.5,
                    opacity: 0,
                    duration: 0.25,
                    ease: "power3.in"
                })
                .to(orbWrapperRef.current, {
                    scale: 20,
                    opacity: 0,
                    duration: 0.75,
                    ease: "power3.inOut"
                }, "<0.05");

            // Phase 3: Timeline content reveal
            const items = gsap.utils.toArray<HTMLElement>('.exp-card');
            items.forEach((item) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            end: "top 65%",
                            scrub: 1,
                        }
                    }
                );
            });

            // Animate the timeline line
            if (timelineRef.current) {
                gsap.fromTo(timelineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 80%",
                            end: "bottom 50%",
                            scrub: 1,
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="experience" ref={sectionRef}>
            {/* Portal / Orb Phase */}
            <section
                ref={portalRef}
                className="h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden"
            >
                {/* Orb */}
                <div
                    ref={orbWrapperRef}
                    className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]"
                    style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                >
                    <Orb
                        hoverIntensity={0.15}
                        rotateOnHover
                        hue={0}
                        forceHoverState={false}
                        backgroundColor="#000000"
                    />
                    {/* Text overlaid on the orb */}
                    <div
                        ref={orbTextRef}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                    >
                        {/* Glow ring behind text */}
                        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/5 blur-3xl" />
                        <h2
                            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.3em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                            style={{ textShadow: '0 0 60px rgba(255,255,255,0.15)' }}
                        >
                            Experience
                        </h2>
                    </div>
                </div>

                {/* Scroll cue */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Scroll to enter</span>
                    <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>
            </section>

            {/* Timeline Content Phase */}
            <section
                ref={contentRef}
                className="bg-black text-white py-16 sm:py-24 px-4 sm:px-6 min-h-screen relative"
            >
                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical timeline line */}
                    <div
                        ref={timelineRef}
                        className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-zinc-700 origin-top hidden sm:block"
                        style={{ transform: 'scaleY(0)' }}
                    />

                    {/* Experience cards */}
                    <div className="space-y-12 sm:space-y-16">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className={`exp-card relative flex flex-col md:flex-row gap-4 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="hidden sm:block absolute left-4 sm:left-8 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 bg-white rounded-full z-10 ring-4 ring-black" />

                                {/* Period badge (mobile: inline, desktop: timeline side) */}
                                <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
                                    <div className="pl-10 sm:pl-20 md:pl-0">
                                        <span className="text-xs sm:text-sm font-mono text-zinc-500 tracking-wider">{exp.period}</span>
                                        <span className="block text-xs text-zinc-600 mt-1">{exp.location}</span>
                                    </div>
                                </div>

                                {/* Content card */}
                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                                    <div className="pl-10 sm:pl-20 md:pl-0 border-l border-zinc-800 sm:border-none">
                                        <div className="pl-4 sm:pl-0">
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{exp.title}</h3>
                                            <span className="text-sm sm:text-base text-zinc-400 font-medium block mt-1">{exp.company}</span>
                                            <p className="text-sm sm:text-base text-zinc-500 mt-3 leading-relaxed">{exp.description}</p>

                                            {/* Achievements */}
                                            <ul className="mt-4 space-y-2">
                                                {exp.achievements.map((achievement, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                                                        <span className="text-white mt-1 shrink-0">→</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Experience;
