import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import './SingularityHeader.css';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const SingularityHeader = ({
    title = "Ali Raza",
    subtitle = "Software Architect & Innovator",
    alias = "a.k.a amrshah",
    showBranding = true
}) => {
    const singularityRef = useRef(null);

    useEffect(() => {
        const els = singularityRef.current.querySelectorAll('.el');

        // Color & Border animation
        const colorInterval = setInterval(() => {
            els.forEach((el) => {
                const randomColor = '#' + Math.floor(Math.random() * 0x607D8B << 4).toString(16).padStart(6, '0');
                const randomBg = '#' + Math.floor(Math.random() * 0x607D8B << 11).toString(16).padStart(6, '0');
                const randomBorder = '#' + Math.floor(Math.random() * 0xFFFFFF << 2).toString(16).padStart(6, '0');

                el.style.color = randomColor;
                el.style.backgroundColor = randomBg;
                el.style.border = `solid 1px ${randomBorder}`;
            });
        }, 200);

        // KeepOnTop animation (Scaling & Rotation)
        const keepOnTop = animate(els, {
            scale: (el, i, l) => {
                const r = random(1, 20);
                if (r > 10) {
                    el.style.borderRadius = (l / 10 - (i * 0.09) + 0.35 + (i * 7)) + '%';
                } else {
                    el.style.borderRadius = (parseFloat(el.style.borderRadius) || 0 - 13 * (l / 10 + (i * 0.09) - 0.35 + (i - 7))) + '%';
                }
                return l / 10 - (i * 0.09) + 0.35;
            },
            rotate: () => random(-360, 360) / Math.random(),
            duration: () => random(500, 1500),
            delay: () => random(0, 3000),
            direction: 'alternate',
            easing: 'linear',
            loop: true,
            autoplay: true
        });

        // KeepOnPage animation (Random scattering)
        const keepOnPage = animate(els, {
            translateX: (el, i) => {
                return ((Math.random() * 10 + i) + 1) + (35 * i) + (parseInt(el.getAttribute('data-x')) || 0);
            },
            translateY: (el, i) => {
                return (Math.random() * 50) + (-10 * i);
            },
            rotate: () => random(-360, 360),
            duration: () => random(800, 2400),
            delay: () => random(0, 3000),
            direction: 'alternate',
            easing: 'easeInOutQuad',
            loop: true,
            autoplay: false
        });

        // Play switching logic
        const animSwitch = setInterval(() => {
            if (Math.random() > 0.7) {
                if (keepOnPage.paused) keepOnPage.play();
                else keepOnPage.pause();
            }
        }, 2000);

        return () => {
            clearInterval(colorInterval);
            clearInterval(animSwitch);
            if (keepOnTop && keepOnTop.pause) keepOnTop.pause();
            if (keepOnPage && keepOnPage.pause) keepOnPage.pause();
        };
    }, []);

    const letters = "Singularity-sekirtS".split("");

    return (
        <header className="singularity-header" style={{ background: '#161d37e3', borderBottom: '1px solid #30363d' }}>
            <div id="header1" className="w3-full w3-container w3-center" style={{ padding: '60px 20px 40px', minHeight: '150px' }}>
                <div id="singularity" ref={singularityRef}>
                    {letters.map((char, index) => (
                        <div key={index} className="line" style={{ display: 'inline-block' }}>
                            <div
                                data-x={index * 20}
                                className={`small square el ${index > 11 ? 'right' : 'left'}`}
                                style={{ margin: '2px' }}
                            >
                                {char}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showBranding && (
                <div className="branding w3-center" style={{ paddingBottom: '80px' }}>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '800', margin: '0', color: '#fff', letterSpacing: '-0.03em', lineHeight: '1' }}>{title}</h1>
                    <h6 style={{ color: '#58a6ff', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '6px', marginTop: '15px' }}>{subtitle}</h6>
                    <p style={{ color: '#8b949e', fontStyle: 'italic', marginTop: '10px', fontSize: '1.1rem' }}>{alias}</p>
                </div>
            )}
        </header>
    );
};

export default SingularityHeader;
