import React from 'react';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { CourseCard } from './CourseCard';
import { RequiredCard } from './RequiredCard';
import './LearnerHome.css';

interface LearnerHomeProps {
  onCourseClick: (courseId: string) => void;
}

export const LearnerHome: React.FC<LearnerHomeProps> = ({ onCourseClick }) => (
  <div className="page">
    <Nav activeItem="my-learning" userInitials="ZK" />
    <Hero initialState="resume" />

    <section className="curriculum-section">
      <div className="section-head">
        <div className="section-title">Your curriculum</div>
        <div className="section-hint">Scroll to explore →</div>
      </div>
      <div className="cards-scroll">
        <CourseCard title="Q1 Compliance" titleEm="Training" category="compliance" categoryLabel="Compliance" progressPct={0} badge={{ label: 'Due Apr 1', type: 'due' }} onClick={() => onCourseClick('compliance')} />
        <CourseCard title="Data" titleEm="Literacy for Managers" category="analytics" categoryLabel="Analytics & Data" progressPct={4} wide onClick={() => onCourseClick('analytics')} />
        <CourseCard title="Strategic" titleEm="Thinking" category="leadership" categoryLabel="Leadership" progressPct={0} badge={{ label: 'New', type: 'new' }} onClick={() => onCourseClick('leadership')} />
        <CourseCard title="Security" titleEm="Refresher 2026" category="security" categoryLabel="Security" progressPct={0} onClick={() => onCourseClick('security')} />
        <CourseCard title="Manager" titleEm="Effectiveness" category="people" categoryLabel="People Development" progressPct={100} onClick={() => onCourseClick('people')} />
      </div>
    </section>

    <section className="required-section">
      <div className="section-head">
        <div className="section-title">Required this quarter</div>
      </div>
      <div className="required-grid">
        <RequiredCard index={1} category="Compliance" dueLabel="Due Apr 1" title="Q1 Compliance" titleEm="Training" urgency="urgent" timeLabel="7 days left" />
        <RequiredCard index={2} category="Security" dueLabel="Due Jun 30" title="Security" titleEm="Refresher 2026" urgency="pending" timeLabel="97 days left" />
        <RequiredCard index={3} category="People Dev" dueLabel="Completed" title="Manager" titleEm="Effectiveness" urgency="done" timeLabel="✓ Done" />
      </div>
    </section>
  </div>
);
