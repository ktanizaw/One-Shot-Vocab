'use client';

import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import {
  Input,
  IconButton,
  Box,
  Wrap,
  WrapItem,
  HStack,
  Center,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { customsearch_v1 } from 'googleapis';
import AppHeader from '@/app/components/common/AppHeader';
import AppFooter from '@/app/components/common/AppFooter';
import WordDetailsCard from '@/app/search/WordDetailsCard';
import ChatgptCard from '@/app/search/ChatgptCard';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { errorHandling } from '@/app/utils/errorHandling';
import type { WordDetails } from '@/app/search/WordDetailsCard';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Search() {
  const [user, loading] = useAuthState(auth);
  const [profession, setProfession] = useState('');
  const [englishLevel, setEnglishLevel] = useState('C2');
  const [englishWord, setEnglishWord] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [wordDetails, setWordDetails] = useState<Maybe<WordDetails>>(null);
  const [prompt, setPrompt] = useState('');
  const isDisabled = !profession || !englishWord || !englishLevel;
  const [isShowPlayPhraseButton, setIsShowPlayPhraseButton] = useState(false);

  useEffect(() => {
    const initialPrompt = `You are a ${profession}.\nGive me 5 affirmative sentences and 5 question sentences with a vocabulary "${englishWord}" within 10 words in English, by only using vocabularies up to ${englishLevel} level.`;
    setPrompt(initialPrompt);
  }, [profession, englishWord, englishLevel]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfession(userData.profession || '');
          setEnglishLevel(userData.englishLevel || 'C2');
        } else {
          console.error('ユーザーデータが見つかりません');
        }
      }
    };

    fetchUserData();
  }, [user]);

  const [chatGptImages, setChatGptImages] = useState<
    { url: string; text: string }[]
  >([]);
  const [mockChatGptImages, setMockChatGptImages] = useState<
    { url: string; text: string }[]
  >([]);

  const [chatGptAnswer, setChatGptAnswer] = useState('');
  const [mockChatGPTResponse, setMockChatGPTResponse] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEnglishWord(event.target.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) {
      return;
    }

    if (event.key === 'Enter') {
      searchEnglishWord();
    }
  };

  const searchEnglishWord = async () => {
    await getChatgptImages();
    await getImages();
    await getWordDetails();
    await getChatgptText();
    setIsShowPlayPhraseButton(true);
  };

  const getChatgptImages = async () => {
    setMockChatGptImages([
      {
        url: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        text: 'test sentence test sentence test sentence test sentence test sentence.',
      },
      {
        url: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
        text: 'test sentence test sentence test sentence test sentence test sentence.',
      },
    ]);
    // TODO：英語レベルがA1かA2の場合は和訳をつける実装
    // const prompt =
    //   englishLevel === 'A1' || englishLevel === 'A2'
    //     ? `Give me 2 simple English example phrases using a vocabulary "${englishWord}" and also translate the example phrases to Japanese.`
    //     : `Give me 2 simple English example phrases using a vocabulary "${englishWord}"`;

    // const prompt = `Give me 2 simple English example phrases using a vocabulary "${englishWord}"`;

    // await errorHandling(async () => {
    //   const response = await axios.get('/api/openai/', { params: { prompt } });

    //   const imagePrompt = `Please generate one image for each of the following sentences: ${response.data.data}`;

    //   const imageResponse = await axios.get('/api/dalle/', {
    //     params: { imagePrompt },
    //   });

    //   const sentences = response.data.data
    //     .split('\n')
    //     .filter((sentence: string) => sentence.trim() !== '');

    //   const chatGptImages = sentences.map((sentence: string, index: number) => {
    //     return {
    //       url: imageResponse.data.data[index].url,
    //       text: sentence,
    //     };
    //   });

    //   setChatGptImages(chatGptImages);
    // });
  };

  const getImages = async () => {
    await errorHandling(async () => {
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
      const CUSTOM_SEARCH_ENGINE_ID =
        process.env.NEXT_PUBLIC_CUSTOM_SEARCH_ENGINE_ID;

      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${englishWord}&cx=${CUSTOM_SEARCH_ENGINE_ID}&key=${API_KEY}&searchType=image`,
      );

      const items = response.data.items as customsearch_v1.Schema$Result[];

      const imageUrls = items.map((item) => item.link || '');

      setImages(imageUrls);
    });
  };

  const getWordDetails = async () => {
    await errorHandling(async () => {
      const WORDS_API_KEY = process.env.NEXT_PUBLIC_WORDS_API_KEY;

      const response = await axios.get(
        `https://wordsapiv1.p.rapidapi.com/words/${englishWord}`,
        {
          headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': WORDS_API_KEY,
          },
        },
      );

      const details = response.data;
      setWordDetails(details);
    });
  };

  const getChatgptText = async () => {
    await errorHandling(async () => {
      setMockChatGPTResponse(
        "Affirmative sentences:\n1. Let's simplify the user interface to improve the user experience.\n2. We were able to simplify the code by removing unnecessary functions.\n3. The new algorithm simplified the complex mathematical calculations.\n4. Simplifying the login process will make it easier for users.\n5. We simplified the data structure to enhance system performance.\n\nQuestion sentences:\n1. Can you simplify this code to make it more efficient?\n2. Could you explain how this feature simplifies the workflow?\n3. How can we simplify the data entry process for users?\n4. Can you provide some tips to simplify the software deployment?\n5. In what ways can we simplify the user interface design?",
      );
      // const response = await axios.get('/api/openai/', { params: { prompt } });
      // setChatGptAnswer(response.data.data);
    });
  };

  const convertToSearchQuery = (inputString: string) => {
    return inputString.replace(/ /g, '+');
  };

  const toPlayPhraseMe = () => {
    const query = convertToSearchQuery(englishWord);
    const playPhraseMeUrl = `https://www.playphrase.me/#/search?q=${query}`;
    window.open(playPhraseMeUrl, '_blank');
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppHeader
        profession={profession}
        setProfession={setProfession}
        englishLevel={englishLevel}
        setEnglishLevel={setEnglishLevel}
      />
      <Box flex={1}>
        <Center p={4}>
          <HStack w={800}>
            <Input
              value={englishWord}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="英単語を入力してください。"
              pattern="[A-Za-z0-9]*"
            />
            <IconButton
              aria-label="SearchIcon"
              icon={<SearchIcon />}
              isDisabled={isDisabled}
              onClick={searchEnglishWord}
            />
          </HStack>
        </Center>

        <Center p={4}>
          <Wrap w={1280} justify="center" spacingX={20}>
            {mockChatGptImages.map((item, index) => (
              <WrapItem key={index} w={250}>
                <VStack>
                  <img
                    src={item.url}
                    alt={`ai-image ${index}`}
                    className={styles.aiImage}
                  />
                  <Box>{item.text}</Box>
                </VStack>
              </WrapItem>
            ))}
          </Wrap>
        </Center>

        <Center p={4}>
          <Wrap w={1280} justify="center">
            {images.map((imageUrl, index) => (
              <WrapItem key={index}>
                <img
                  src={imageUrl}
                  alt={`画像 ${index}`}
                  className={styles.image}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Center>

        <WordDetailsCard englishWord={englishWord} wordDetails={wordDetails} />

        <ChatgptCard
          prompt={prompt}
          text={mockChatGPTResponse ? mockChatGPTResponse : chatGptAnswer}
          englishWord={englishWord}
        />

        {isShowPlayPhraseButton && (
          <Center p={4}>
            <Button
              maxWidth="380px"
              h="60px"
              rightIcon={<ExternalLinkIcon />}
              colorScheme="blue"
              variant="outline"
              onClick={toPlayPhraseMe}
              whiteSpace="unset"
            >
              <Text overflowWrap="break-word">
                &quot;{englishWord}&quot;が使われるシーンを確認する
              </Text>
            </Button>
          </Center>
        )}
      </Box>
      <AppFooter />
    </Box>
  );
}
