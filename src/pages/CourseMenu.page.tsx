import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Center, Stack, Text, Title } from '@mantine/core';
import data from '../data.json';

export function CourseMenuPage() {
  const [courseName, setCourseName] = useState<string | null>();
  const { courseId } = useParams();

  useEffect(() => {
    setCourseName(data.courses.find((course) => course.id === courseId)?.name);
  }, [courseId, courseName]);

  return (
    <Stack align="center" mt={100}>
      <Title>{courseName}</Title>
      <Button component={Link} to="core-vocab-quiz">
        Core Vocab Quiz
      </Button>
      <Button component={Link} to="vocab-builder-quiz">
        Vocab Builder Quiz
      </Button>
      <Button disabled>Glossary (coming soon!)</Button>
      <Button component={Link} to="/" variant="default">
        Back to Home
      </Button>
    </Stack>
  );
}
