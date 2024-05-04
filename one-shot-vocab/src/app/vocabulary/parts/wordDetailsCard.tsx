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
  Wrap,
  WrapItem,
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
                <Text fontSize="sm" minWidth={12}>
                  意味:
                </Text>
                <Text>{result?.definition}</Text>
              </HStack>

              {result?.examples && (
                <HStack>
                  <Text fontSize="sm" minWidth={12}>
                    例文:
                  </Text>
                  <Wrap>
                    {result.examples.map((example: string, index: number) => (
                      <WrapItem key={index}>
                        {example}
                        {index < result?.examples.length - 1 && ' | '}
                      </WrapItem>
                    ))}
                  </Wrap>
                </HStack>
              )}

              {result?.synonyms && (
                <HStack>
                  <Text fontSize="sm" minWidth={12}>
                    類義語:
                  </Text>
                  <Wrap>
                    {result.synonyms.map((synonym: string, index: number) => (
                      <WrapItem key={index}>
                        {synonym}
                        {index < result.synonyms.length - 1 && ', '}
                      </WrapItem>
                    ))}
                  </Wrap>
                </HStack>
              )}

              {result?.similarTo && (
                <HStack>
                  <Text fontSize="sm" minWidth={12}>
                    類似語:{' '}
                  </Text>
                  <Wrap>
                    {result.similarTo.map((similar: string, index: number) => (
                      <WrapItem key={index}>
                        {similar}
                        {index < result.similarTo.length - 1 && ', '}
                      </WrapItem>
                    ))}
                  </Wrap>
                </HStack>
              )}

              {result?.antonyms && (
                <HStack>
                  <Text fontSize="sm" minWidth={12}>
                    対義語:
                  </Text>
                  <Wrap>
                    {result.antonyms.map((antonym: string, index: number) => (
                      <WrapItem key={index}>
                        {antonym}
                        {index < result.antonyms.length - 1 && ', '}
                      </WrapItem>
                    ))}
                  </Wrap>
                </HStack>
              )}

              {result?.derivation && (
                <HStack>
                  <Text fontSize="sm" minWidth={12}>
                    派生語:
                  </Text>
                  <Wrap>
                    {result.derivation.map(
                      (derivation: string, index: number) => (
                        <WrapItem key={index}>
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
    </Center>
  );
};

export default WordDetailsCard;
