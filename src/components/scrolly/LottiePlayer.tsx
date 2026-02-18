import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottiePlayerProps {
    animationData: any;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ animationData, loop = true, autoplay = true, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop,
            autoplay,
            animationData
        });

        return () => anim.destroy();
    }, [animationData, loop, autoplay]);

    return <div ref={containerRef} className={className} />;
};

export default LottiePlayer;
