'use client'

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// NOTE: SplitText is a premium GSAP plugin. 
// If you don't have a GSAP license, we can fallback to a custom character-based split logic.
// For now, we will use a simplified character split that works with base GSAP if the plugin is not present.
// However, the original React Bits code depends on GSAPSplitText.

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string | ((t: number) => number);
    splitType?: 'chars' | 'words' | 'lines';
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    textAlign?: React.CSSProperties['textAlign'];
    onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = '',
    delay = 50,
    duration = 1.25,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px',
    tag = 'p',
    textAlign = 'center',
    onLetterAnimationComplete
}) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const animationCompletedRef = useRef(false);
    const onCompleteRef = useRef(onLetterAnimationComplete);

    // Keep callback ref updated
    useEffect(() => {
        onCompleteRef.current = onLetterAnimationComplete;
    }, [onLetterAnimationComplete]);

    useGSAP(
        () => {
            if (!ref.current || !text) return;
            if (animationCompletedRef.current) return;

            const el = ref.current;

            // Simple character splitting logic as a fallback if the premium SplitText plugin is missing
            // This ensures the component works for most users while maintaining the React Bits interface.
            const content = el.innerText;
            el.innerHTML = '';

            const allChars: HTMLSpanElement[] = [];
            const words = content.split(/(\s+)/);

            words.forEach((segment) => {
                if (/^\s+$/.test(segment)) {
                    // Whitespace — render as a space inline-block
                    const space = document.createElement('span');
                    space.innerHTML = '&nbsp;';
                    space.style.display = 'inline-block';
                    space.style.willChange = 'transform, opacity';
                    el.appendChild(space);
                    allChars.push(space);
                } else {
                    // Word — wrap chars in a nowrap container
                    const wordWrap = document.createElement('span');
                    wordWrap.style.display = 'inline-block';
                    wordWrap.style.whiteSpace = 'nowrap';
                    segment.split('').forEach((char) => {
                        const charSpan = document.createElement('span');
                        charSpan.innerText = char;
                        charSpan.style.display = 'inline-block';
                        charSpan.style.willChange = 'transform, opacity';
                        wordWrap.appendChild(charSpan);
                        allChars.push(charSpan);
                    });
                    el.appendChild(wordWrap);
                }
            });

            const startPct = (1 - threshold) * 100;
            const start = `top ${startPct}%`;

            gsap.fromTo(
                allChars,
                { ...from },
                {
                    ...to,
                    duration,
                    ease,
                    stagger: delay / 1000,
                    scrollTrigger: {
                        trigger: el,
                        start,
                        once: true,
                    },
                    onComplete: () => {
                        animationCompletedRef.current = true;
                        onCompleteRef.current?.();
                    },
                }
            );
        },
        {
            dependencies: [text, delay, duration, ease, splitType, threshold, rootMargin],
            scope: ref
        }
    );

    const Tag = (tag || 'p') as React.ElementType;

    return (
        <Tag
            ref={ref}
            style={{ textAlign, wordWrap: 'break-word' }}
            className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
        >
            {text}
        </Tag>
    );
};

export default SplitText;
