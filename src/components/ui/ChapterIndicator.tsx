import { useEffect, useState } from 'react';

const chapters = [
    { id: 'hero', number: '01', title: 'THE SPARK' },
    { id: 'story', number: '02', title: 'THE PHILOSOPHY' },
    { id: 'work', number: '03', title: 'THE CREATION' },
    { id: 'services', number: '04', title: 'THE CAPABILITIES' },
    { id: 'process', number: '05', title: 'THE METHOD' },
    { id: 'highlights', number: '06', title: 'THE PLAYGROUND' },
    { id: 'contact', number: '07', title: 'THE CONNECTION' }
];

const ChapterIndicator: React.FC = () => {
    const [currentChapter, setCurrentChapter] = useState(chapters[0]);

    useEffect(() => {
        const handleScroll = () => {
            const center = window.innerHeight / 2;
            const scrollY = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            // Check if at the bottom
            if (scrollY + windowHeight >= documentHeight - 50) {
                setCurrentChapter(chapters[chapters.length - 1]);
                return;
            }

            // Check if at the top
            if (scrollY < 100) {
                setCurrentChapter(chapters[0]);
                return;
            }

            // Check which chapter is currently in view
            for (const chapter of chapters) {
                const el = document.getElementById(chapter.id);
                if (el) {
                    const rect = el.getBoundingClientRect();

                    // Update if the element covers the center line
                    if (rect.top <= center && rect.bottom >= center) {
                        setCurrentChapter(chapter);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Call once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 mix-blend-difference text-white font-bold tracking-widest text-xs sm:text-sm md:text-base pointer-events-none">
            <span>{currentChapter.number}</span>
            <span className="mx-1 sm:mx-2">—</span>
            <span className="hidden sm:inline">{currentChapter.title}</span>
        </div>
    );
};

export default ChapterIndicator;
