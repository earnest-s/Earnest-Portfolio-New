import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './cursor.css';

export const MagneticCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        if (!dot) return;

        // Use quickTo for super-smooth lag following
        const xTo = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3' });
        const yTo = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3' });

        const onMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onEnterLink = () => {
            gsap.to(dot, {
                width: 40,
                height: 40,
                opacity: 0.3,
                duration: 0.25,
                ease: 'power2.out',
            });
        };

        const onLeaveLink = () => {
            gsap.to(dot, {
                width: 8,
                height: 8,
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
            });
        };

        const links = document.querySelectorAll('a, button, [role="button"]');
        links.forEach(link => {
            link.addEventListener('mouseenter', onEnterLink);
            link.addEventListener('mouseleave', onLeaveLink);
        });

        window.addEventListener('mousemove', onMove);

        return () => {
            window.removeEventListener('mousemove', onMove);
            links.forEach(link => {
                link.removeEventListener('mouseenter', onEnterLink);
                link.removeEventListener('mouseleave', onLeaveLink);
            });
        };
    }, []);

    return <div ref={dotRef} className="magnetic-cursor-dot" />;
};
