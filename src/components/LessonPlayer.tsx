import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Button } from './Button';
import './LessonPlayer.css';

// ── COURSE DATA ────────────────────────────────────────────────────────────

type LessonType = 'video' | 'text';

interface Lesson {
  id: string;
  title: string;
  titleEm: string;
  type: LessonType;
  duration: string;
  moduleIndex: number;
  moduleTitle: string;
  content?: {
    body?: string[];
    pullQuote?: string;
    subhead?: string;
    bodyAfter?: string[];
  };
  gradient?: string;
}

interface Module {
  title: string;
  lessons: Lesson[];
}

const COURSE_MODULES: Record<string, Module[]> = {
  analytics: [
    {
      title: 'Reading charts without guessing',
      lessons: [
        { id: 'a1', title: 'Why most charts', titleEm: 'lie to you', type: 'video', duration: '8:12', moduleIndex: 0, moduleTitle: 'Reading charts without guessing', gradient: 'linear-gradient(135deg,#0d1a2a 0%,#1a2e40 100%)' },
        { id: 'a2', title: 'The anatomy of', titleEm: 'a good chart', type: 'text', duration: '6 min', moduleIndex: 0, moduleTitle: 'Reading charts without guessing', content: { body: ['A chart is an argument. Every design choice — the scale, the color, the baseline — is a claim about what matters. The best charts make this argument visible. The worst ones hide it.', 'Most managers encounter charts as finished objects, handed to them by analysts or embedded in slide decks. The instinct is to take them at face value. This is a mistake.'], pullQuote: 'Every axis that doesn\'t start at zero is making a decision about what you should feel.', subhead: 'Start with the axes', bodyAfter: ['Before reading any chart, look at the axes first. What is the baseline? Is the y-axis truncated? Is the scale linear or logarithmic? These choices shape the emotional impact of the data before you read a single number.'] } },
        { id: 'a3', title: 'Bar, line, scatter:', titleEm: 'when to use what', type: 'video', duration: '9:44', moduleIndex: 0, moduleTitle: 'Reading charts without guessing', gradient: 'linear-gradient(135deg,#1a2e1a 0%,#0f2010 100%)' },
      ]
    },
    {
      title: 'Sampling & bias',
      lessons: [
        { id: 'b1', title: 'Where your data', titleEm: 'comes from', type: 'video', duration: '7:30', moduleIndex: 1, moduleTitle: 'Sampling & bias', gradient: 'linear-gradient(135deg,#2a1a08 0%,#3d2010 100%)' },
        { id: 'b2', title: 'Survivorship bias', titleEm: 'in practice', type: 'text', duration: '5 min', moduleIndex: 1, moduleTitle: 'Sampling & bias', content: { body: ['You only see the companies that survived, the strategies that worked, the people who made it. The ones that didn\'t survive leave no data. This is survivorship bias, and it distorts almost every lesson we draw from success stories.', 'When a manager says "our best salespeople all have X trait," they\'re usually looking at survivors. They\'re not looking at the people with X trait who didn\'t make it — because those people aren\'t there anymore.'], pullQuote: 'The absence of data is itself data. You just have to learn to read it.', subhead: 'How to correct for it', bodyAfter: ['Ask what\'s missing. When presented with any analysis, ask explicitly: what population was excluded? What happened to the people, products, or strategies that aren\'t represented here?'] } },
      ]
    },
  ],
  people: [
    {
      title: 'Why clarity matters more than volume',
      lessons: [
        { id: 'p1', title: 'The clarity', titleEm: 'problem', type: 'video', duration: '8:00', moduleIndex: 0, moduleTitle: 'Why clarity matters more than volume', gradient: 'linear-gradient(135deg,#1a3a2a 0%,#0d2318 100%)' },
        { id: 'p2', title: 'Writing that', titleEm: 'actually lands', type: 'text', duration: '7 min', moduleIndex: 0, moduleTitle: 'Why clarity matters more than volume', content: { body: ['Most managers write too much. The instinct — inherited from years of school essays and performance reviews — is to demonstrate thoroughness through volume. A longer email feels more considered. A detailed Slack message signals effort. Neither is true.', 'The reader doesn\'t experience your effort. They experience the result. And the result of a long message is usually confusion, skimming, or a request for a summary.'], pullQuote: 'The most powerful thing you can do in writing is stop before you think you should.', subhead: 'The one-sentence rule', bodyAfter: ['Before writing anything to a direct report, ask: what is the single most important thing I need them to understand? Write that sentence first. Everything else is optional.'] } },
        { id: 'p3', title: 'Giving feedback', titleEm: 'that lands', type: 'video', duration: '9:24', moduleIndex: 0, moduleTitle: 'Why clarity matters more than volume', gradient: 'linear-gradient(135deg,#1a3a2a 0%,#162535 100%)' },
      ]
    },
    {
      title: 'Running 1:1s that actually work',
      lessons: [
        { id: 'p4', title: 'What a 1:1 is', titleEm: 'actually for', type: 'video', duration: '6:50', moduleIndex: 1, moduleTitle: 'Running 1:1s that actually work', gradient: 'linear-gradient(135deg,#2a1a3a 0%,#1a0d28 100%)' },
        { id: 'p5', title: 'Questions that', titleEm: 'open things up', type: 'text', duration: '6 min', moduleIndex: 1, moduleTitle: 'Running 1:1s that actually work', content: { body: ['The worst 1:1s are status updates. The manager asks what the person is working on, the person tells them, and nothing of consequence happens. Both parties leave with the same information they arrived with.', 'The best 1:1s surface things that wouldn\'t surface any other way — blockers, concerns, ambitions, frustrations. This requires questions that can\'t be answered with a task list.'], pullQuote: '"What\'s the thing you\'re least looking forward to this week?" — A question that actually opens something.', subhead: 'The questions worth asking', bodyAfter: ['Some questions reliably open things up: What are you finding harder than you expected? What would you do differently if you had more authority here? What am I not asking you about that I should be?'] } },
      ]
    },
  ],
  compliance: [
    {
      title: 'Q1 Compliance Overview',
      lessons: [
        { id: 'c1', title: 'What changed', titleEm: 'this quarter', type: 'video', duration: '5:20', moduleIndex: 0, moduleTitle: 'Q1 Compliance Overview', gradient: 'linear-gradient(135deg,#3d2010 0%,#2a1a08 100%)' },
        { id: 'c2', title: 'Your obligations', titleEm: 'and responsibilities', type: 'text', duration: '4 min', moduleIndex: 0, moduleTitle: 'Q1 Compliance Overview', content: { body: ['As a manager, you are responsible not just for your own compliance, but for ensuring your team understands and meets their obligations. This is not a passive role.', 'Compliance failures at the team level are frequently attributed to a lack of clarity from leadership — not intentional wrongdoing. The most common root cause is assumption: assuming people know something they don\'t.'], pullQuote: 'Compliance is a leadership problem before it is a policy problem.', subhead: 'What you need to do', bodyAfter: ['Review the updated policy document linked below. Confirm with each direct report that they have completed their required training. Document any concerns or edge cases and escalate to your compliance partner.'] } },
      ]
    },
  ],
};

const getCategoryFromCourseId = (courseId: string): string => {
  if (courseId.includes('data') || courseId.includes('analytics')) return 'analytics';
  if (courseId.includes('compliance')) return 'compliance';
  return 'people';
};

const getAllLessons = (courseId: string): Lesson[] => {
  const category = getCategoryFromCourseId(courseId);
  const modules = COURSE_MODULES[category] || COURSE_MODULES.people;
  return modules.flatMap(m => m.lessons);
};

// ── NOTES HOOK ─────────────────────────────────────────────────────────────

interface NoteEntry {
  lessonId: string;
  lessonTitle: string;
  text: string;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimer = useRef<NodeJS.Timeout>();

  const updateNote = useCallback((lessonId: string, text: string) => {
    setSaveStatus('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setNotes(prev => ({ ...prev, [lessonId]: text }));
      setSaveStatus('saved');
    }, 700);
  }, []);

  const getNoteEntries = (lessons: Lesson[]): NoteEntry[] =>
    lessons
      .filter(l => notes[l.id]?.trim())
      .map(l => ({ lessonId: l.id, lessonTitle: `${l.title} ${l.titleEm}`, text: notes[l.id] }));

  return { notes, updateNote, saveStatus, getNoteEntries };
};

// ── PROPS ──────────────────────────────────────────────────────────────────

interface LessonPlayerProps {
  courseId: string;
  courseTitle: string;
  courseTitleEm: string;
  onExit: () => void;
  onComplete: (notes: NoteEntry[]) => void;
}

// ── COMPONENT ──────────────────────────────────────────────────────────────

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  courseId,
  courseTitle,
  courseTitleEm,
  onExit,
  onComplete,
}) => {
  const lessons = getAllLessons(courseId);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [noteInputValue, setNoteInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { notes, updateNote, saveStatus, getNoteEntries } = useNotes();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [lessonIndex, showTransition]);

  const currentLesson = lessons[lessonIndex];
  const totalLessons = lessons.length;
  const progressPct = ((lessonIndex) / totalLessons) * 100;

  // sync textarea value when switching lessons
  useEffect(() => {
    setNoteInputValue(notes[currentLesson?.id] || '');
  }, [currentLesson?.id, notes]);

  const toggleNotes = () => {
    setNotesOpen(prev => {
      if (!prev) setTimeout(() => textareaRef.current?.focus(), 300);
      return !prev;
    });
  };

  const handleNoteInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteInputValue(e.target.value);
    updateNote(currentLesson.id, e.target.value);
  };

  const goNext = () => {
    // check if crossing module boundary
    const current = lessons[lessonIndex];
    const next = lessons[lessonIndex + 1];

    if (!next) {
      // last lesson — go to completion
      onComplete(getNoteEntries(lessons));
      return;
    }

    if (next && next.moduleIndex !== current.moduleIndex) {
      setShowTransition(true);
      return;
    }

    setLessonIndex(i => i + 1);
    setNotesOpen(false);
  };

  const goPrev = () => {
    if (lessonIndex > 0) {
      setLessonIndex(i => i - 1);
      setNotesOpen(false);
      setShowTransition(false);
    }
  };

  const continueFromTransition = () => {
    setLessonIndex(i => i + 1);
    setShowTransition(false);
    setNotesOpen(false);
  };

  const savedNoteForLesson = notes[currentLesson?.id]?.trim();
  const nextLesson = lessons[lessonIndex + 1];

  const saveLabel =
    saveStatus === 'saving' ? 'Saving...' :
    saveStatus === 'saved' ? 'Saved' : '';

  if (!currentLesson) return null;

  // ── CHAPTER TRANSITION ──────────────────────────────────────────────────
  if (showTransition && nextLesson) {
    return (
      <div className="player">
        <div className="player-nav">
          <div className="player-wordmark" onClick={onExit}>Fluent<span>.</span></div>
          <div className="player-course">{courseTitle} {courseTitleEm}</div>
          <div className="player-exit" onClick={onExit}>✕ Exit</div>
        </div>

        <div className="chapter-transition">
          <div className="chapter-transition-bg" />
          <div className="chapter-transition-grain" />
          <div className="chapter-transition-content">
            <div className="chapter-transition-label">Up next — Module {nextLesson.moduleIndex + 1}</div>
            <div className="chapter-transition-divider" />
            <div className="chapter-transition-title">
              {nextLesson.moduleTitle.split(' ').slice(0, -1).join(' ')}{' '}
              <em>{nextLesson.moduleTitle.split(' ').slice(-1)[0]}</em>
            </div>
            <div className="chapter-transition-meta">
              {lessons.filter(l => l.moduleIndex === nextLesson.moduleIndex).length} lessons
            </div>
            <div className="chapter-transition-actions">
              <Button verb="Begin" context={`Module ${nextLesson.moduleIndex + 1}`} variant="parch" onClick={continueFromTransition} />
              <Button verb="View" context="All modules" variant="ghost-light" size="sm" onClick={onExit} />
            </div>
          </div>
        </div>

        <div className="progress-thread">
          <div className="thread-label">Module {currentLesson.moduleIndex + 1} complete</div>
          <div className="thread-track">
            <div className="thread-fill" style={{ width: `${progressPct}%` }} />
            <div className="thread-dots">
              {lessons.map((_, i) => (
                <div
                  key={i}
                  className={`thread-dot ${i < lessonIndex ? 'done' : i === lessonIndex ? 'current' : ''}`}
                />
              ))}
            </div>
          </div>
          <div className="thread-counter">{lessonIndex + 1} / {totalLessons}</div>
        </div>
      </div>
    );
  }

  // ── LESSON PLAYER ───────────────────────────────────────────────────────
  return (
    <div className="player">

      {/* MAIN NAV */}
      <div className="player-nav">
        <div className="player-wordmark" onClick={onExit}>Fluent<span>.</span></div>
        <div className="player-course">{courseTitle} {courseTitleEm}</div>
        <div className="player-exit" onClick={onExit}>✕ Exit</div>
      </div>

      {/* NOTES SUB-NAV */}
      <div className={`notes-bar ${notesOpen ? 'open' : ''}`} onClick={toggleNotes}>
        <div className="notes-bar-trigger-wrap">
          {savedNoteForLesson && !notesOpen && (
            <div className="notes-bar-preview">
              {savedNoteForLesson.slice(0, 60)}{savedNoteForLesson.length > 60 ? '...' : ''}
            </div>
          )}
          <div className="notes-bar-trigger">
            <div className="notes-bar-label">Notes</div>
            <div className="notes-bar-chevron" />
          </div>
          {saveLabel && (
            <div className={`notes-bar-save ${saveStatus === 'saved' ? 'saved' : ''}`}>
              {saveLabel}
            </div>
          )}
        </div>

        <div className="notes-expanded">
          <div className="notes-expanded-inner">
            <textarea
              ref={textareaRef}
              className="notes-textarea"
              placeholder="What's worth remembering from this lesson..."
              value={noteInputValue}
              onClick={e => e.stopPropagation()}
              onChange={handleNoteInput}
            />
            <div className="notes-lesson-tag">
              {currentLesson.title} {currentLesson.titleEm} · {currentLesson.moduleTitle}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="player-content">
        <div className="lesson-header">
          <div className="lesson-eyebrow">
            Module {currentLesson.moduleIndex + 1} · Lesson {lessonIndex + 1}
          </div>
          <div className="lesson-title">
            {currentLesson.title} <em>{currentLesson.titleEm}</em>
          </div>
        </div>

        {currentLesson.type === 'video' ? (
          <div className="video-block">
            <div className="video-surface">
              <div
                className="video-surface-bg"
                style={{ background: currentLesson.gradient || 'linear-gradient(135deg,#1a3a2a,#0d2318)' }}
              />
              <div className="video-play">
                <div className="video-play-triangle" />
              </div>
              <div className="video-duration">{currentLesson.duration}</div>
            </div>
            <div className="video-scrub">
              <div className="video-scrub-fill" />
            </div>
          </div>
        ) : (
          <div className="text-block">
            {currentLesson.content?.body?.map((p, i) => (
              <p key={i} className="text-body">{p}</p>
            ))}
            {currentLesson.content?.pullQuote && (
              <div className="text-pull">
                <p>"{currentLesson.content.pullQuote}"</p>
              </div>
            )}
            {currentLesson.content?.subhead && (
              <div className="text-subhead">{currentLesson.content.subhead}</div>
            )}
            {currentLesson.content?.bodyAfter?.map((p, i) => (
              <p key={i} className="text-body">{p}</p>
            ))}
          </div>
        )}

        <div className="lesson-actions">
          <Button
            verb="Previous"
            context={`Lesson ${String(lessonIndex).padStart(2, '0')}`}
            variant="ghost-light"
            onClick={goPrev}
          />
          <Button
            verb={lessonIndex === totalLessons - 1 ? 'Complete' : 'Next'}
            context={lessonIndex === totalLessons - 1 ? 'Course' : `Lesson ${String(lessonIndex + 2).padStart(2, '0')}`}
            variant="ghost-light"
            onClick={goNext}
          />
        </div>
      </div>

      {/* PROGRESS THREAD */}
      <div className="progress-thread">
        <div className="thread-label">Lesson {lessonIndex + 1} of {totalLessons}</div>
        <div className="thread-track">
          <div className="thread-fill" style={{ width: `${progressPct}%` }} />
          <div className="thread-dots">
            {lessons.map((_, i) => (
              <div
                key={i}
                className={`thread-dot ${i < lessonIndex ? 'done' : i === lessonIndex ? 'current' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="thread-counter">{lessonIndex + 1} / {totalLessons}</div>
      </div>

    </div>
  );
};
