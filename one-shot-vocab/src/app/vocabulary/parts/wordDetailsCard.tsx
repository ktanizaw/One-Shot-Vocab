'use client';

import {
  Center,
  Divider,
  Text,
  Stack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Heading,
} from '@chakra-ui/react';

interface WordDetails {
  pronunciation?: {
    all: string;
  };
  results: {
    partOfSpeech: string;
    definition: string;
    examples?: string[];
    synonyms?: string[];
    similarTo?: string[];
    antonyms?: string[];
    derivation?: string[];
  }[];
}

interface WordDetailsCardProps {
  englishWord: string;
  wordDetails: WordDetails | null;
}
const WordDetailsCard: React.FC<WordDetailsCardProps> = ({
  englishWord,
  wordDetails,
}) => {
  if (
    !wordDetails ||
    !wordDetails.results ||
    wordDetails.results.length === 0
  ) {
    return null; // wordDetails が存在しないか、results プロパティが空の場合は何も表示しない
  }

  return (
    <Center p={4}>
      <Card w={800} bg="gray.50">
        <CardHeader>
          <Heading size="md">{englishWord}</Heading>
          <Text>{wordDetails?.pronunciation?.all}</Text>
          <Text as="i">{wordDetails?.results[0]?.partOfSpeech}</Text>
        </CardHeader>

        <CardBody pt={0}>
          {wordDetails?.results.map((result: any, resultIndex: number) => (
            <Stack key={resultIndex}>
              <Text as="b">{resultIndex + 1}.</Text>
              <HStack>
                <Text fontSize="sm">意味:</Text>
                <Text>{result?.definition}</Text>
              </HStack>

              {result?.examples && (
                <HStack>
                  <Text fontSize="sm">例文:</Text>
                  {result.examples.map((example: string, index: number) => (
                    <Text key={index}>
                      {example}
                      {index < result?.examples.length - 1 && ' | '}
                    </Text>
                  ))}
                </HStack>
              )}

              {result?.synonyms && (
                <HStack>
                  <Text fontSize="sm">類義語:</Text>
                  {result.synonyms.map((synonym: string, index: number) => (
                    <Text key={index}>
                      {synonym}
                      {index < result.synonyms.length - 1 && ', '}
                    </Text>
                  ))}
                </HStack>
              )}

              {result?.similarTo && (
                <HStack>
                  <Text fontSize="sm">類似語: </Text>
                  {result.similarTo.map((similar: string, index: number) => (
                    <Text key={index}>
                      {similar}
                      {index < result.similarTo.length - 1 && ', '}
                    </Text>
                  ))}
                </HStack>
              )}

              {result?.antonyms && (
                <HStack>
                  <Text fontSize="sm">対義語:</Text>
                  {result.antonyms.map((antonym: string, index: number) => (
                    <Text key={index}>
                      {antonym}
                      {index < result.antonyms.length - 1 && ', '}
                    </Text>
                  ))}
                </HStack>
              )}

              {result?.derivation && (
                <HStack>
                  <Text fontSize="sm">派生語:</Text>
                  {result.derivation.map(
                    (derivation: string, index: number) => (
                      <Text key={index}>
                        {derivation}
                        {index < result.derivation.length - 1 && ', '}
                      </Text>
                    ),
                  )}
                </HStack>
              )}
              <Divider mb={2} />
            </Stack>
          ))}
        </CardBody>
      </Card>
    </Center>
  );
};

export default WordDetailsCard;
