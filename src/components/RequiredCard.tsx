import React from 'react';
import { Button } from './Button';
import './RequiredCard.css';

export type RequiredUrgency = 'urgent' | 'pending' | 'done';

interface RequiredCardProps {
  index: number;
  category: string;
  dueLabel: string;
  title: string;
  titleEm?: string;
  urgency: RequiredUrgency;
  timeLabel: string;
}

export const RequiredCard: React.FC<RequiredCardProps> = ({
  index, category, dueLabel, title, titleEm, urgency, timeLabel,
}) => (
  <div className={`req-card req-${urgency}`}>
    <div className="req-bg-n">{String(index).padStart(2, '0')}</div>
    <div className="req-eye">{category} · {dueLabel}</div>
    <div className="req-title">
      {title}{titleEm && <> <em>{titleEm}</em></>}
    </div>
    <div className="req-footer">
      {urgency === 'done'
        ? <Button verb="Review" context="Course" variant="ghost" size="sm" />
        : <Button verb="Start" context={urgency === 'urgent' ? 'Now' : 'Course'} variant="ink" size="sm" />
      }
      <div className={`req-time req-time-${urgency}`}>{timeLabel}</div>
    </div>
  </div>
);
