import React, { useState } from 'react';
import { LearnerHome } from './components/LearnerHome';
import { CourseDetail } from './components/CourseDetail';
import { LessonPlayer } from './components/LessonPlayer';
import { CompletionScreen } from './components/CompletionScreen';
import './styles/tokens.css';
import './styles/global.css';

// Course metadata — matches what's in CourseCard
const COURSE_META: Record<string, {
  title: string;
  titleEm: string;
  totalLessons: number;
  totalTime: string;
}> = {
  analytics: { title: 'Data', titleEm: 'Literacy for Managers', totalLessons: 8, totalTime: '2h 53m' },
  people:    { title: 'Communication', titleEm: 'Fundamentals', totalLessons: 8, totalTime: '1h 22m' },
  compliance:{ title: 'Q1 Compliance', titleEm: 'Training', totalLessons: 4, totalTime: '38m' },
  security:  { title: 'Security', titleEm: 'Refresher 2026', totalLessons: 5, totalTime: '55m' },
  leadership:{ title: 'Strategic', titleEm: 'Thinking', totalLessons: 6, totalTime: '1h 44m' },
};

type Screen = 'home' | 'course' | 'lesson' | 'complete';

interface NoteEntry {
  lessonId: string;
  lessonTitle: string;
  text: string;
}

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [activeCourseId, setActiveCourseId] = useState<string>('people');
  const [completionNotes, setCompletionNotes] = useState<NoteEntry[]>([]);

  const activeCourse = COURSE_META[activeCourseId] || COURSE_META.people;

  const goToCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setScreen('course');
  };

  const goToLesson = () => setScreen('lesson');

  const goToComplete = (notes: NoteEntry[]) => {
    setCompletionNotes(notes);
    setScreen('complete');
  };

  const goHome = () => {
    setScreen('home');
    setCompletionNotes([]);
  };

  if (screen === 'home') {
    return <LearnerHome onCourseClick={goToCourse} />;
  }

  if (screen === 'course') {
    return (
      <CourseDetail
        courseId={activeCourseId}
        courseTitle={activeCourse.title}
        courseTitleEm={activeCourse.titleEm}
        onBack={goHome}
        onStart={goToLesson}
      />
    );
  }

  if (screen === 'lesson') {
    return (
      <LessonPlayer
        courseId={activeCourseId}
        courseTitle={activeCourse.title}
        courseTitleEm={activeCourse.titleEm}
        onExit={() => setScreen('course')}
        onComplete={goToComplete}
      />
    );
  }

  if (screen === 'complete') {
    return (
      <CompletionScreen
        courseTitle={activeCourse.title}
        courseTitleEm={activeCourse.titleEm}
        userName="Andrew Zell"
        totalLessons={activeCourse.totalLessons}
        totalTime={activeCourse.totalTime}
        notes={completionNotes}
        onBack={goHome}
      />
    );
  }

  return null;
}

export default App;
