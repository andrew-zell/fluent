import React from 'react';
import { Button } from './Button';
import './CompletionScreen.css';

interface NoteEntry {
  lessonId: string;
  lessonTitle: string;
  text: string;
}

interface CompletionScreenProps {
  courseTitle: string;
  courseTitleEm: string;
  userName: string;
  totalLessons: number;
  totalTime: string;
  notes: NoteEntry[];
  onBack: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  courseTitle,
  courseTitleEm,
  userName,
  totalLessons,
  totalTime,
  notes,
  onBack,
}) => {
  const firstName = userName.split(' ')[0];
  const visibleNotes = notes.slice(0, 2);
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="completion">
      <div className="completion-grain" />
      <div className="completion-grid" />

      {/* NAV */}
      <div className="completion-nav">
        <button type="button" className="completion-wordmark completion-wordmark-btn" onClick={onBack}>
          Fluent<span>.</span>
        </button>
        <div className="completion-nav-label">Course complete</div>
      </div>

      {/* BODY */}
      <div className="completion-body">

        {/* LEFT */}
        <div className="completion-left">
          <div className="completion-kicker">You finished it.</div>
          <div className="completion-headline">
            Well done,<br />
            <em>{firstName}.</em>
          </div>
          <div className="completion-body-text">
            You've completed {courseTitle} {courseTitleEm}.{' '}
            {totalLessons} lessons, {totalTime}.
            {notes.length > 0
              ? ` Your ${notes.length} note${notes.length === 1 ? '' : 's'} have been saved to your profile.`
              : ' Your certificate is ready to download.'}
          </div>

          {/* STATS */}
          <div className="completion-stats">
            <div className="completion-stat">
              <div className="cs-label">Lessons</div>
              <div className="cs-value">{totalLessons}</div>
            </div>
            <div className="completion-stat">
              <div className="cs-label">Time</div>
              <div className="cs-value">{totalTime}</div>
            </div>
            {notes.length > 0 && (
              <div className="completion-stat">
                <div className="cs-label">Notes</div>
                <div className="cs-value">{notes.length}</div>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="completion-actions">
            <Button verb="Download" context="Certificate" variant="parch" />
            <Button verb="Back" context="To curriculum" variant="ghost-light" onClick={onBack} />
          </div>

          {/* NOTES PANEL */}
          {notes.length > 0 && (
            <div className="completion-notes">
              <div className="completion-notes-head">
                <div className="completion-notes-label">Your notes from this course</div>
                <div className="completion-notes-count">{notes.length} saved</div>
              </div>
              {visibleNotes.map((note, i) => (
                <div key={i} className="completion-note-item">
                  <div className="completion-note-lesson">{note.lessonTitle}</div>
                  <div className="completion-note-text">{note.text}</div>
                </div>
              ))}
              {notes.length > 2 && (
                <div className="completion-notes-cta">
                  <div className="completion-notes-cta-text">
                    View all {notes.length} notes in profile →
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — CERTIFICATE */}
        <div className="completion-right">
          <div className="certificate">
            <div className="cert-top">
              <div className="cert-wordmark">Fluent<span>.</span></div>
              <div className="cert-tag">Certificate of completion</div>
            </div>
            <div className="cert-presents">This certifies that</div>
            <div className="cert-name">{userName}</div>
            <div className="cert-course-label">Has completed</div>
            <div className="cert-course-title">
              {courseTitle} <em>{courseTitleEm}</em>
            </div>
            <div className="cert-footer">
              <div className="cert-date">{today}</div>
              <div className="cert-seal">
                <div className="cert-seal-inner">
                  <div className="cert-seal-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
