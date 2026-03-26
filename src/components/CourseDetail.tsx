import React from 'react';
import type { CourseCategory } from './CourseCard';
import { Nav } from './Nav';
import { Button } from './Button';
import './CourseDetail.css';
import './Hero.css';

interface CourseModule {
  name: string;
  lessonCount: number;
  estMinutes: number;
}

const HERO_IMG_BY_CATEGORY: Record<CourseCategory, string> = {
  people: 'hero-img-resume',
  leadership: 'hero-img-resume',
  compliance: 'hero-img-featured',
  security: 'hero-img-recommended',
  analytics: 'hero-img-recommended',
  strategy: 'hero-img-featured',
};

const ACCENT_BY_CATEGORY: Record<CourseCategory, string> = {
  people: 'var(--v2)',
  leadership: '#c9a96e',
  compliance: '#c9a96e',
  security: '#7ab0d4',
  analytics: '#7ab0d4',
  strategy: '#c9a96e',
};

const MODULES_BY_CATEGORY: Record<CourseCategory, CourseModule[]> = {
  compliance: [
    { name: 'Regulatory landscape', lessonCount: 4, estMinutes: 38 },
    { name: 'Policy & escalation', lessonCount: 3, estMinutes: 27 },
    { name: 'Case simulations', lessonCount: 5, estMinutes: 52 },
    { name: 'Attestation & records', lessonCount: 2, estMinutes: 18 },
  ],
  analytics: [
    { name: 'Reading charts without guessing', lessonCount: 5, estMinutes: 44 },
    { name: 'Sampling & bias', lessonCount: 3, estMinutes: 31 },
    { name: 'Metrics that matter', lessonCount: 4, estMinutes: 36 },
    { name: 'From insight to decision', lessonCount: 4, estMinutes: 40 },
    { name: 'Team rituals', lessonCount: 2, estMinutes: 22 },
  ],
  leadership: [
    { name: 'Framing the problem', lessonCount: 3, estMinutes: 29 },
    { name: 'Options & trade-offs', lessonCount: 4, estMinutes: 35 },
    { name: 'Synthesis under ambiguity', lessonCount: 3, estMinutes: 33 },
    { name: 'Stakeholder narratives', lessonCount: 4, estMinutes: 41 },
    { name: 'Commit & communicate', lessonCount: 3, estMinutes: 28 },
  ],
  security: [
    { name: 'Threat model refresher', lessonCount: 4, estMinutes: 34 },
    { name: 'Access & least privilege', lessonCount: 3, estMinutes: 26 },
    { name: 'Phishing & social cues', lessonCount: 3, estMinutes: 24 },
    { name: 'Incident response walkthrough', lessonCount: 4, estMinutes: 45 },
  ],
  people: [
    { name: 'One-on-ones that land', lessonCount: 4, estMinutes: 37 },
    { name: 'Feedback mechanics', lessonCount: 5, estMinutes: 48 },
    { name: 'Coaching in the moment', lessonCount: 3, estMinutes: 30 },
    { name: 'Fair process & clarity', lessonCount: 3, estMinutes: 27 },
  ],
  strategy: [
    { name: 'Positioning the portfolio', lessonCount: 4, estMinutes: 40 },
    { name: 'Competitive moves', lessonCount: 3, estMinutes: 32 },
    { name: 'Roadmaps without fantasy', lessonCount: 4, estMinutes: 38 },
  ],
};

const CATEGORY_LABEL_BY_ID: Record<string, string> = {
  compliance: 'Compliance',
  analytics: 'Analytics & Data',
  leadership: 'Leadership',
  security: 'Security',
  people: 'People Development',
  strategy: 'Strategy',
};

const PROGRESS_PCT_BY_ID: Record<string, number> = {
  compliance: 0,
  analytics: 4,
  leadership: 0,
  security: 0,
  people: 100,
};

function formatDuration(totalMinutes: number): string {
  if (totalMinutes >= 60) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
  }
  return `${totalMinutes} min`;
}

interface CourseDetailProps {
  courseId: string;
  courseTitle: string;
  courseTitleEm: string;
  onBack: () => void;
  onStart: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({
  courseId,
  courseTitle,
  courseTitleEm,
  onBack,
  onStart,
}) => {
  const category = (courseId in HERO_IMG_BY_CATEGORY ? courseId : 'people') as CourseCategory;
  const categoryLabel = CATEGORY_LABEL_BY_ID[courseId] ?? CATEGORY_LABEL_BY_ID.people;
  const progressPct = PROGRESS_PCT_BY_ID[courseId] ?? 0;

  const imgClass = HERO_IMG_BY_CATEGORY[category];
  const accent = ACCENT_BY_CATEGORY[category];
  const modules = MODULES_BY_CATEGORY[category];
  const primaryStarted = progressPct > 0 && progressPct < 100;
  const primaryComplete = progressPct >= 100;

  const totalLessons = modules.reduce((s, m) => s + m.lessonCount, 0);
  const totalMinutes = modules.reduce((s, m) => s + m.estMinutes, 0);

  return (
    <div className="page">
      <Nav activeItem="my-learning" userInitials="ZK" onWordmarkClick={onBack} />
      <div className="course-detail-back-row">
        <Button verb="Back" context="Curriculum" variant="ink" onClick={onBack} />
      </div>
      <div className="hero-outer">
        <div className="hero-wrap">
          <div className="hero">
            <div className={`hero-img ${imgClass}`} />
            <div className="hero-grain" />
            <div className="hero-content">
              <div className="hero-eyebrow" style={{ color: accent }}>
                {categoryLabel}
              </div>
              <h1 className="hero-title">
                {courseTitle}
                {courseTitleEm && (
                  <>
                    <br />
                    <em style={{ color: accent }}>{courseTitleEm}</em>
                  </>
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="course-detail-body">
        <div className="course-detail-grid">
          <div className="course-detail-main">
            <div className="section-title course-detail-modules-head">Modules</div>
            <ul className="course-module-list">
              {modules.map((m, i) => (
                <li key={m.name} className="course-module-row">
                  <div className="course-module-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="course-module-name">{m.name}</div>
                  <div className="course-module-meta">
                    {m.lessonCount} lessons · {formatDuration(m.estMinutes)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="course-detail-summary" aria-label="Course summary">
            <div className="course-detail-summary-inner">
              <div className="course-summary-stat">
                <div className="course-summary-label">Total lessons</div>
                <div className="course-summary-value">{totalLessons}</div>
              </div>
              <div className="course-summary-stat">
                <div className="course-summary-label">Total time</div>
                <div className="course-summary-value">{formatDuration(totalMinutes)}</div>
              </div>
              {progressPct > 0 && (
                <div className="course-summary-stat">
                  <div className="course-summary-label">Your progress</div>
                  <div className="course-summary-value course-summary-progress">{progressPct}%</div>
                </div>
              )}
              <div className="course-summary-cta">
                {primaryComplete ? (
                  <Button verb="Review" context="Course" variant="ghost" />
                ) : primaryStarted ? (
                  <Button verb="Continue" context="Course" variant="ink" onClick={onStart} />
                ) : (
                  <Button verb="Start" context="Course" variant="ink" onClick={onStart} />
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
