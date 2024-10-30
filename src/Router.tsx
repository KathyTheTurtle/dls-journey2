import { createHashRouter, RouterProvider } from 'react-router-dom';
import { CoreVocabQuizPage } from './pages/CoreVocabQuiz.page';
import { CoreVocabQuizMenuPage } from './pages/CoreVocabQuizMenu.page';
import { CourseMenuPage } from './pages/CourseMenu.page';
import { HomePage } from './pages/Home.page';
import { VocabBuilderQuizPage } from './pages/VocabBuilderQuiz.page';
import { VocabBuilderQuizMenuPage } from './pages/VocabBuilderQuizMenu.page';

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/course/:courseId',
    element: <CourseMenuPage />,
  },
  {
    path: '/course/:courseId/core-vocab-quiz',
    element: <CoreVocabQuizMenuPage />,
  },
  {
    path: '/course/:courseId/vocab-builder-quiz',
    element: <VocabBuilderQuizMenuPage />,
  },
  {
    path: '/course/:courseId/core-vocab-quiz/:chapterId/:translationDirection',
    element: <CoreVocabQuizPage />,
  },
  {
    path: '/course/:courseId/vocab-builder-quiz/:chapterId/:translationDirection',
    element: <VocabBuilderQuizPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
