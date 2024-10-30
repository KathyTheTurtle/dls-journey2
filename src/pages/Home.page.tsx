import { Link } from 'react-router-dom';
import { Button, Stack, Title } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  return (
    <Stack align="center">
      <Welcome />
      <Button component={Link} to="/course/journey2">
        Journey 2
      </Button>
      <Button component={Link} to="/course/journey3">
        Journey 3
      </Button>
    </Stack>
  );
}
