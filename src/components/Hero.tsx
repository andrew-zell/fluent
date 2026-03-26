import React, { useState } from 'react';
import { Button } from './Button';
import './Hero.css';

export type HeroState = 'resume' | 'featured' | 'recommended';

interface HeroStateConfig {
  eyebrowColor: string;
  eyebrowLabel: string;
  slateTag: string;
  title: string;
  titleEm: string;
  body: string;
  statValue: string;
  statLabel: string;
  statColor?: string;
  showProgress?: boolean;
  progressPct?: number;
  progressLabel?: string;
  primaryVerb: string;
  primaryContext: string;
  secondaryVerb: string;
  secondaryContext: string;
  imgClass: string;
}

const STATES: Record<HeroState, HeroStateConfig> = {
  resume: {
    eyebrowColor: 'var(--v2)',
    eyebrowLabel: 'Pick up where you left off',
    slateTag: 'Module 03 of 06 · People Development',
    title: 'Communication',
    titleEm: 'Fundamentals',
    body: "You're on lesson 4 — Giving feedback that lands. 42 minutes remaining in this module.",
    statValue: '38%',
    statLabel: 'Complete',
    showProgress: true,
    progressPct: 38,
    progressLabel: '3 of 8 lessons',
    primaryVerb: 'Continue',
    primaryContext: 'Lesson 04',
    secondaryVerb: 'View',
    secondaryContext: 'All lessons',
    imgClass: 'hero-img-resume',
  },
  featured: {
    eyebrowColor: '#c9a96e',
    eyebrowLabel: 'Featured course',
    slateTag: 'New this quarter · Leadership',
    title: 'The Art of',
    titleEm: 'Strategic Thinking',
    body: 'A new course for senior managers navigating complexity, ambiguity, and long-horizon decisions.',
    statValue: '6',
    statLabel: 'Modules',
    statColor: '#c9a96e',
    showProgress: false,
    primaryVerb: 'Explore',
    primaryContext: 'Course',
    secondaryVerb: 'Add',
    secondaryContext: 'To my list',
    imgClass: 'hero-img-featured',
  },
  recommended: {
    eyebrowColor: '#7ab0d4',
    eyebrowLabel: 'Recommended for you',
    slateTag: 'Based on your role · Analytics',
    title: 'Data',
    titleEm: 'Literacy for Managers',
    body: 'Most managers in your cohort have completed this. Builds quantitative confidence for data-informed teams.',
    statValue: '94%',
    statLabel: 'Completion rate',
    statColor: '#7ab0d4',
    showProgress: false,
    primaryVerb: 'Start',
    primaryContext: 'Course',
    secondaryVerb: 'Preview',
    secondaryContext: 'Syllabus',
    imgClass: 'hero-img-recommended',
  },
};

const STATE_LABELS: Record<HeroState, string> = {
  resume: '↩ Resume',
  featured: '★ Featured',
  recommended: '◎ Recommended',
};

interface HeroProps {
  initialState?: HeroState;
}

export const Hero: React.FC<HeroProps> = ({ initialState = 'resume' }) => {
  const [active, setActive] = useState<HeroState>(initialState);
  const c = STATES[active];

  return (
    <div className="hero-outer">
      <div className="hero-state-bar">
        {(Object.keys(STATES) as HeroState[]).map((s) => (
          <button
            key={s}
            className={`hero-state-btn ${active === s ? 'active' : ''}`}
            onClick={() => setActive(s)}
          >
            {STATE_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="hero-wrap">
        <div className="hero">
          <div className={`hero-img ${c.imgClass}`} />
          <div className="hero-grain" />

          <div className="hero-top">
            <div className="hero-slate">{c.slateTag}</div>
            <div className="hero-float-stat">
              <div className="hero-stat-n" style={{ color: c.statColor ?? 'var(--p0)' }}>
                {c.statValue}
              </div>
              <div className="hero-stat-l">{c.statLabel}</div>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-eyebrow" style={{ color: c.eyebrowColor }}>
              {c.eyebrowLabel}
            </div>
            <div className="hero-title">
              {c.title}<br />
              <em style={{ color: c.eyebrowColor }}>{c.titleEm}</em>
            </div>
            <div className="hero-body">{c.body}</div>

            {c.showProgress && (
              <div className="hero-progress-row">
                <div className="hero-track">
                  <div className="hero-fill" style={{ width: `${c.progressPct}%` }} />
                  <div className="hero-pip" style={{ left: `${c.progressPct}%` }} />
                </div>
                <div className="hero-progress-label">{c.progressLabel}</div>
              </div>
            )}

            <div className="hero-actions">
              <Button verb={c.primaryVerb} context={c.primaryContext} variant="parch" />
              <Button verb={c.secondaryVerb} context={c.secondaryContext} variant="ghost-light" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
