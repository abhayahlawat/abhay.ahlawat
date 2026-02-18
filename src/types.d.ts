declare module 'lenis' {
    const Lenis: any;
    export default Lenis;
}

declare module 'lenis/react' {
    import { ReactNode } from 'react';
    export const ReactLenis: any;
    export const useLenis: any;
}
