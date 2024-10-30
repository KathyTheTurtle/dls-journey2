import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Group, Radio, Stack, Text, Title } from '@mantine/core';
import { CoreVocab, TranslationDirection } from '@/types';
import data from '../data.json';

const NUM_MULTIPLE_CHOICES = 4;

export function CoreVocabQuizPage() {
  const [coreVocab, setCoreVocab] = useState<CoreVocab[]>([]);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [numCorrect, setNumCorrect] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correct, setCorrect] = useState<Boolean | null>(null);
  const [multipleChoiceIndexes, setMultipleChoiceIndexes] = useState<number[] | null>(null);
  const [translationDirection, setTranslationDirection] = useState<TranslationDirection>(
    TranslationDirection.ThaiToEnglish
  );

  const { courseId, chapterId, translationDirection: translationDirectionParam } = useParams();

  useEffect(() => {
    const course = data.courses.find((course) => course.id === courseId);
    const chapter = course?.chapters.find((chapter) => chapter.id === chapterId);
    setCoreVocab(shuffle(chapter?.coreVocab || []));
    setTranslationDirection(
      TranslationDirection[translationDirectionParam as keyof typeof TranslationDirection]
    );
  }, [courseId, chapterId, translationDirection]);

  const currentVocab = coreVocab[vocabIndex];

  useEffect(() => {
    setMultipleChoiceIndexes(
      randomNumsIncludingNum(vocabIndex, NUM_MULTIPLE_CHOICES, coreVocab.length)
    );
  }, [vocabIndex, coreVocab.length]);

  const checkAnswer = (selectedAnswer: number, correctAnswer: number) => {
    if (selectedAnswer === correctAnswer) {
      setCorrect(true);
      setNumCorrect((current) => current + 1);
    } else {
      setCorrect(false);
    }
  };

  if (coreVocab.length < 1) {
    return;
  }

  return vocabIndex < coreVocab.length ? (
    <Stack align="center">
      <Title mt={100}>
        {translationDirection === TranslationDirection.ThaiToEnglish
          ? currentVocab.transliteration
          : currentVocab.english}
      </Title>
      {correct !== null &&
        (correct ? (
          <Text mt={15} size="lg" c="green">
            Correct!
          </Text>
        ) : (
          <Text mt={15} size="lg" c="red">
            Incorrect, answer was{' '}
            <Text component="span" fw={700}>
              {translationDirection === TranslationDirection.ThaiToEnglish
                ? currentVocab.english
                : currentVocab.transliteration}
            </Text>
          </Text>
        ))}
      <Radio.Group value={selectedAnswer} onChange={setSelectedAnswer}>
        {multipleChoiceIndexes?.map((index) => (
          <Radio
            disabled={correct !== null}
            key={index}
            value={String(index)}
            label={
              translationDirection === TranslationDirection.ThaiToEnglish
                ? coreVocab[index].english
                : coreVocab[index].transliteration
            }
            mt={15}
          />
        ))}
      </Radio.Group>
      <Group mt={15}>
        <Button component={Link} to="./../.." variant="default">
          Back to Quiz Menu
        </Button>
        {correct === null ? (
          <Button
            onClick={() => checkAnswer(Number(selectedAnswer), vocabIndex)}
            disabled={selectedAnswer === null}
          >
            Check
          </Button>
        ) : (
          <Button
            onClick={() => {
              setCorrect(null);
              setSelectedAnswer(null);
              setVocabIndex((current) => current + 1);
            }}
          >
            Next
          </Button>
        )}
      </Group>
    </Stack>
  ) : (
    <Stack align="center" mt={100}>
      <Title>Finished!</Title>
      <Text>You got {`${numCorrect} out of ${vocabIndex}`} correct!</Text>
      <Button component={Link} to="./../.." variant="default">
        Back to Quiz Menu
      </Button>
    </Stack>
  );
}

function randomNumsIncludingNum(num: number, size: number, maxNum: number): number[] {
  const rangeWithoutNum = [...Array(maxNum).keys()].filter((item) => item !== num);
  const randomWithoutNum = shuffle(rangeWithoutNum).slice(0, size - 1);

  return shuffle([num].concat(randomWithoutNum));
}

function shuffle(unshuffled: any[]): any[] {
  return unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
