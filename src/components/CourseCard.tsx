import React from 'react';
import './CourseCard.css';

export type CourseCategory = 'people' | 'compliance' | 'security' | 'analytics' | 'strategy' | 'leadership';

const GRADIENTS: Record<CourseCategory, string> = {
  people:     'linear-gradient(to bottom, rgba(15,14,12,0.05) 0%, rgba(15,14,12,0.8) 100%), linear-gradient(135deg, #1a3a2a 0%, #0d2318 100%)',
  compliance: 'linear-gradient(to bottom, rgba(15,14,12,0.05) 0%, rgba(15,14,12,0.8) 100%), linear-gradient(135deg, #3d2010 0%, #2a1a08 100%)',
  security:   'linear-gradient(to bottom, rgba(15,14,12,0.05) 0%, rgba(15,14,12,0.8) 100%), linear-gradient(135deg, #1e3a5f 0%, #0d2040 100%)',
  analytics:  'linear-gradient(to bottom, rgba(15,14,12,0.05) 0%, rgba(15,14,12,0.8) 100%), linear-gradient(135deg, #0d1a2a 0%, #1a2e40 100%)',
  strategy:   'linear-gradient(to bottom, rgba(15,14,12,0.05) 0%, rgba(15,14,12,0.8) 100%), linear-gradient(135deg, #2a1a3a 0%, #1a0d28 100%)',
  leadership: 'linear-gradient(to bottom, rgba(15,14,12,0.05) 0%, rgba(15,14,12,0.8) 100%), linear-gradient(135deg, #1a2e1a 0%, #0f2010 100%)',
};

interface CourseCardProps {
  title: string;
  titleEm?: string;
  category: CourseCategory;
  categoryLabel: string;
  progressPct: number;
  badge?: { label: string; type: 'due' | 'new' };
  wide?: boolean;
  imageUrl?: string;
  onClick?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title, titleEm, category, categoryLabel,
  progressPct, badge, wide = false, imageUrl, onClick,
}) => (
  <div className={`course-card ${wide ? 'course-card-wide' : ''}`} onClick={onClick}>
    <div
      className="course-card-img"
      style={{ background: imageUrl
        ? `linear-gradient(to bottom, rgba(15,14,12,0.1) 0%, rgba(15,14,12,0.8) 100()), url(${imageUrl}) center/cover`
        : GRADIENTS[category] }}
    />
    {badge && <div className={`course-card-badge badge-${badge.type}`}>{badge.label}</div>}
    <div className="course-card-content">
      <div className="course-card-tag">{categoryLabel}</div>
      <div className="course-card-title">
        {title}{titleEm && <> <em>{titleEm}</em></>}
      </div>
      <div className="course-card-progress-row">
        <div className="course-card-track">
          <div className="course-card-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="course-card-pct">
          {progressPct === 0 ? 'Not started' : progressPct === 100 ? 'Complete' : `${progressPct}%`}
        </div>
      </div>
    </div>
  </div>
);
