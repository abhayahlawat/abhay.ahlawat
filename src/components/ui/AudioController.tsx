import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const AMBIENT_AUDIO_URL = "/ambient.mp3";

const AudioController = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    // An arbitrary proxy object to track volume for GSAP to animate
    const volumeProxy = useRef({ volume: 0 });

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0; // Start at 0 for fade in
        }

    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            // Fade Out
            gsap.to(volumeProxy.current, {
                volume: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (audioRef.current) audioRef.current.volume = volumeProxy.current.volume;
                },
                onComplete: () => {
                    if (audioRef.current) audioRef.current.pause();
                    setIsPlaying(false);
                }
            });
        } else {
            // Play then Fade In
            setIsPlaying(true);
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
            
            gsap.to(volumeProxy.current, {
                volume: 0.4, // Max volume 40% so it's subtle ambient
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => {
                    if (audioRef.current) audioRef.current.volume = volumeProxy.current.volume;
                }
            });
        }
    };

    return (
        <>
            <audio ref={audioRef} src={AMBIENT_AUDIO_URL} preload="auto" loop />
            <button
                onClick={toggleAudio}
                className="fixed bottom-8 right-8 z-[100] flex items-center gap-3 mix-blend-difference text-white uppercase text-xs font-bold tracking-widest overflow-hidden group"
                aria-label="Toggle ambient audio"
            >
                <div className="flex items-center gap-[2px] h-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`w-[2px] bg-white transition-all duration-300 origin-bottom`}
                            style={{
                                height: isPlaying ? `${Math.random() * 60 + 40}%` : '20%',
                                animation: isPlaying ? `soundwave ${0.5 + i * 0.1}s ease-in-out infinite alternate` : 'none'
                            }}
                        />
                    ))}
                </div>
                
                {/* Slide reveal text on hover - hidden on mobile to prevent overflow */}
                <div className="overflow-hidden relative hidden sm:block">
                    <span className="block translate-y-0 opacity-100 transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0 absolute left-0">
                        {isPlaying ? 'ON' : 'OFF'}
                    </span>
                    <span className="block translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 min-w-[80px]">
                        SOUND: {isPlaying ? 'ON' : 'OFF'}
                    </span>
                </div>

                <style>{`
                    @keyframes soundwave {
                        0% { height: 20%; }
                        100% { height: 100%; }
                    }
                `}</style>
            </button>
        </>
    );
};

export default AudioController;
