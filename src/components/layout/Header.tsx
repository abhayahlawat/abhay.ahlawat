interface HeaderProps {
    onMenuClick: () => void;
    isOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, isOpen }) => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white p-6 flex justify-between items-center">
            <div className="text-xl font-bold tracking-tighter">ABHAY AHLAWAT</div>

            <button
                onClick={onMenuClick}
                className="uppercase text-sm font-bold tracking-widest hover:opacity-70 z-50 relative overflow-hidden h-5 w-16 group cursor-pointer" // Fixed width for stability
            >
                <div className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
                    <span className="h-5 flex items-center justify-center">MENU</span>
                    <span className="h-5 flex items-center justify-center absolute top-full left-0 w-full">CLOSE</span>
                </div>
            </button>
        </header>
    );
};
