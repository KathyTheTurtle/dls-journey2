import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, ComboboxItem, Group, NativeSelect, Radio, Stack, Title } from '@mantine/core';
import data from '../data.json';
import { TranslationDirection } from '../types';

export function VocabBuilderQuizMenuPage() {
  const [chapters, setChapters] = useState<ComboboxItem[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<ComboboxItem | null>(null);
  const [translationDirection, setTranslationDirection] = useState<TranslationDirection>(
    TranslationDirection.ThaiToEnglish
  );

  const { courseId } = useParams();

  useEffect(() => {
    const course = data.courses.find((course) => course.id === courseId);
    if (course) {
      const chapters = course.chapters
        .filter((chapter) => chapter.vocabBuilder && chapter.vocabBuilder.length > 0)
        .map(
          (chapter) =>
            ({
              label: chapter.name,
              value: chapter.id,
            }) as ComboboxItem
        );
      setChapters(chapters);
      setSelectedChapter(chapters[0]);
    }
  }, [courseId]);

  return (
    chapters.length > 0 && (
      <Stack align="center" gap="lg" mt={100}>
        <Title>Quiz</Title>
        <NativeSelect
          label="Select chapter"
          value={selectedChapter?.value}
          onChange={(event) =>
            setSelectedChapter(
              chapters.find((chapter) => chapter.value === event.currentTarget.value)!
            )
          }
          data={chapters}
        />
        <Radio.Group
          label="Select type"
          value={TranslationDirection[translationDirection]}
          onChange={(value) =>
            setTranslationDirection(
              TranslationDirection[value as keyof typeof TranslationDirection]
            )
          }
        >
          <Stack gap="xs" mt="xs">
            <Radio value="ThaiToEnglish" label="Thai to English" />
            <Radio value="EnglishToThai" label="English to Thai" />
          </Stack>
        </Radio.Group>
        <Group>
          <Button component={Link} to="./.." variant="default">
            Back to Course Menu
          </Button>
          <Button
            component={Link}
            to={`${selectedChapter!.value}/${TranslationDirection[translationDirection]}`}
          >
            Start
          </Button>
        </Group>
      </Stack>
    )
  );
}
