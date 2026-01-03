import React, { useState, useEffect } from 'react';
import { Artifact } from './Artifact';
import type { StageType } from './Artifact';
import '../styles/layout.css';

/**
 * CAPSTONE: From Static Interfaces to Living Web Environments
 * ARCHITECTURE RESTORED: Single Persistent Artifact for Morphing
 * LAYOUT: Split-Screen Safe Zones for Text
 */

// --- UTILS ---

const useMousePosition = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return mousePos;
};

// --- COMPONENTS ---

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string; // For extra padding or background overrides
}

const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => {
    return (
        <section id={id} className={`section-container ${className}`}>
            {children}
        </section>
    );
};

export default function CapstonePage() {
    const [activeStage, setActiveStage] = useState<StageType>('hero');
    const mousePos = useMousePosition();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveStage(entry.target.id as StageType);
                    }
                });
            },
            { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
        );

        document.querySelectorAll('section').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const getBgStyle = (): string => {
        const styles: Record<StageType, string> = {
            hero: 'theme-hero',
            origins: 'theme-origins',
            feedback: 'theme-feedback',
            intent: 'theme-intent',
            'non-blocking': 'theme-fluid',
            probabilistic: 'theme-probabilistic',
            environment: 'theme-environment',
            footer: 'theme-footer'
        };
        return styles[activeStage] || 'theme-hero';
    };

    return (
        <div className={`capstone ${getBgStyle()}`}>

            {/* 
              SINGLE PERSISTENT ARTIFACT 
              It floats Fixed above the content, handled by CSS transitions.
              It changes 'stage' prop to morph.
            */}
            <Artifact stage={activeStage} mousePos={mousePos} />

            <main className="capstone-main">

                {/* 1. HERO SECTION (Centered) */}
                <Section id="hero">
                    <div className="section-content-centered">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                From Static Interfaces<br />
                                <span className="hero-subtitle-muted">to Living Environments</span>
                            </h1>
                            <div className="hero-divider"></div>
                            <p className="hero-tagline">A Narrative Exploration</p>
                        </div>
                    </div>
                </Section>

                {/* 2. ORIGINS (Text LEFT 50%) - Artifact will float RIGHT */}
                <Section id="origins">
                    <div className="section-content-left">
                        <div className="origins-box font-mono">
                            <h2 className="origins-title">1. ORIGINS</h2>
                            <p className="origins-text text-highlight">
                                In the beginning, the interface was explicit. <br />
                                A box. A border. A command.
                            </p>
                            <p className="origins-subtext">
                                Deterministic inputs yielding immediate outputs. <br />
                                The system waited for us.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 3. FEEDBACK (Text RIGHT 50%) - Artifact will float LEFT */}
                <Section id="feedback">
                    <div className="section-content-right">
                        <div className="feedback-content text-right ml-auto">
                            <h2 className="feedback-title">2. FEEDBACK</h2>
                            <div className="feedback-card ml-auto">
                                <p className="text-highlight">Then, the screen learned to acknowledge us.</p>
                                <p className="feedback-sub">
                                    Hover states. Clicks. Active confirmations. <br />
                                    Motion appeared, but only to explain what just happened.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 4. INTENT (Text LEFT 50%) - Artifact float RIGHT */}
                <Section id="intent">
                    <div className="section-content-left">
                        <div className="intent-box">
                            <h2 className="intent-title">3. INTENT</h2>
                            <p className="intent-highlight text-highlight">Motion began to anticipate.</p>
                            <p className="intent-text">
                                We stopped clicking and started swiping. The interface guided the eye,
                                revealing content before the action was complete.
                                <br /><br />
                                Transitions became a language of direction.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 5. FLUIDITY (Text RIGHT 50%) - Artifact float LEFT */}
                <Section id="non-blocking">
                    <div className="section-content-right">
                        <div className="fluid-box text-right ml-auto">
                            <h2 className="fluid-title">4. FLUIDITY</h2>
                            <p className="fluid-highlight text-highlight">The pause disappeared.</p>
                            <p className="fluid-text">
                                Loading screens dissolved into optimistic states.
                                The application ceased to be a series of stops and starts.
                                <br /><br />
                                Continuity became more important than raw speed.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* 6. PROBABILISTIC (Text LEFT 50%) - Artifact float RIGHT */}
                <Section id="probabilistic">
                    <div className="section-content-left">
                        <div className="prob-content">
                            <h2 className="prob-title">5. PROBABILISTIC</h2>
                            <div className="prob-card">
                                <p className="prob-highlight text-highlight">The interface became a participant.</p>
                                <p className="prob-text">
                                    It stopped waiting for explicit commands. It began inferring intent.
                                    Autofill, suggestions, context-awareness.
                                    <br /><br />
                                    It acts alongside us, adapting to unseen patterns.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 7. ENVIRONMENT (Centered Content) - Artifact is Fullscreen Background */}
                <Section id="environment" className="pb-32">
                    <div className="section-content-centered">
                        <div className="env-content" style={{ position: 'relative', zIndex: 10 }}>
                            <h2 className="env-title">6. ENVIRONMENT</h2>
                            <p className="env-highlight text-highlight">From static tools to lived-in spaces.</p>
                            <div className="env-card">
                                <p className="env-text">
                                    The modern interface breathes. It has gravity. It simulates presence.
                                    <br />
                                    <span className="env-cta">
                                        The web is no longer something we look at. <br />
                                        It is something we walk through.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 8. FOOTER (Centered) */}
                <Section id="footer">
                    <div className="section-content-centered">
                        <div className="footer-fade">
                            <p className="footer-text">The interface is no longer waiting.</p>
                        </div>
                    </div>
                </Section>

            </main>
        </div>
    );
}
