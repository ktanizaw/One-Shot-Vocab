import {
  Center,
  Divider,
  Text,
  Stack,
  HStack,
  VStack,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Wrap,
  WrapItem,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

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
  wordDetails: Maybe<WordDetails>;
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
    return null;
  }

  const [showAllResults, setShowAllResults] = useState(false);
  const toggleShowAllResults = () => {
    setShowAllResults(!showAllResults);
  };

  return (
    <Center p={4}>
      <VStack spacing={4}>
        <Card w={{ base: '100%', md: 800 }} bg="gray.50">
          <CardHeader>
            <Heading size={{ base: 'sm', md: 'md' }}>{englishWord}</Heading>
            <Text fontSize={{ base: 'sm', md: 'md' }}>
              {wordDetails?.pronunciation?.all}
            </Text>
          </CardHeader>
          <CardBody pt={0}>
            {wordDetails?.results
              .slice(0, showAllResults ? undefined : 3)
              .map((result: any, resultIndex: number) => (
                <Stack key={resultIndex}>
                  <Text as="b" fontSize={{ base: 'sm', md: 'md' }}>
                    {resultIndex + 1}.
                  </Text>
                  <HStack>
                    <Text fontSize={{ base: 'xs', md: 'sm' }} minWidth={12}>
                      品詞:
                    </Text>
                    <Text as="i" fontSize={{ base: 'sm', md: 'md' }}>
                      {result?.partOfSpeech}
                    </Text>
                  </HStack>

                  <HStack>
                    <Text fontSize={{ base: 'xs', md: 'sm' }} minWidth={12}>
                      意味:
                    </Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>
                      {result?.definition}
                    </Text>
                  </HStack>

                  {result?.examples && (
                    <HStack>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} minWidth={12}>
                        例文:
                      </Text>
                      <Wrap>
                        {result.examples.map(
                          (example: string, index: number) => (
                            <WrapItem
                              key={index}
                              fontSize={{ base: 'sm', md: 'md' }}
                            >
                              {example}
                              {index < result?.examples.length - 1 && ' | '}
                            </WrapItem>
                          ),
                        )}
                      </Wrap>
                    </HStack>
                  )}

                  {result?.synonyms && (
                    <HStack>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} minWidth={12}>
                        類義語:
                      </Text>
                      <Wrap>
                        {result.synonyms.map(
                          (synonym: string, index: number) => (
                            <WrapItem
                              key={index}
                              fontSize={{ base: 'sm', md: 'md' }}
                            >
                              {synonym}
                              {index < result.synonyms.length - 1 && ', '}
                            </WrapItem>
                          ),
                        )}
                      </Wrap>
                    </HStack>
                  )}

                  {result?.similarTo && (
                    <HStack>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} minWidth={12}>
                        類似語:{' '}
                      </Text>
                      <Wrap>
                        {result.similarTo.map(
                          (similar: string, index: number) => (
                            <WrapItem
                              key={index}
                              fontSize={{ base: 'sm', md: 'md' }}
                            >
                              {similar}
                              {index < result.similarTo.length - 1 && ', '}
                            </WrapItem>
                          ),
                        )}
                      </Wrap>
                    </HStack>
                  )}

                  {result?.antonyms && (
                    <HStack>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} minWidth={12}>
                        対義語:
                      </Text>
                      <Wrap>
                        {result.antonyms.map(
                          (antonym: string, index: number) => (
                            <WrapItem
                              key={index}
                              fontSize={{ base: 'sm', md: 'md' }}
                            >
                              {antonym}
                              {index < result.antonyms.length - 1 && ', '}
                            </WrapItem>
                          ),
                        )}
                      </Wrap>
                    </HStack>
                  )}

                  {result?.derivation && (
                    <HStack>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} minWidth={12}>
                        派生語:
                      </Text>
                      <Wrap>
                        {result.derivation.map(
                          (derivation: string, index: number) => (
                            <WrapItem
                              key={index}
                              fontSize={{ base: 'sm', md: 'md' }}
                            >
                              {derivation}
                              {index < result.derivation.length - 1 && ', '}
                            </WrapItem>
                          ),
                        )}
                      </Wrap>
                    </HStack>
                  )}
                  <Divider mb={2} />
                </Stack>
              ))}
          </CardBody>
        </Card>
        {wordDetails?.results.length > 3 && (
          <Button
            colorScheme="blue"
            variant={showAllResults ? 'outline' : 'solid'}
            onClick={toggleShowAllResults}
          >
            {showAllResults ? '閉じる' : 'もっと見る'}
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default WordDetailsCard;
