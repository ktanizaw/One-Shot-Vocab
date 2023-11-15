"use client";

import styles from "./page.module.css";
import { useState } from "react";
import {
  Input,
  IconButton,
  Box,
  Wrap,
  WrapItem,
  HStack,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { customsearch_v1 } from "googleapis";
import Header from "@/app/common/header";
import WordDetailsCard from "@/app/vocabulary/wordDetailsCard";

export default function Vocabulary() {
  const [englishWord, setEnglishWord] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [wordDetails, setWordDetails] = useState<any>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEnglishWord(event.target.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchEnglishWord();
    }
  };

  const searchEnglishWord = async () => {
    // Step 1: Search images using Google Custom Search
    await getImages();

    // Step 2: Get word details using WordsAPI
    await getWordDetails();
  };

  const getImages = async () => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY;
      const CUSTOM_SEARCH_ENGINE_ID =
        process.env.NEXT_PUBLIC_CUSTOM_SEARCH_ENGINE_ID;

      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?q=${englishWord}&cx=${CUSTOM_SEARCH_ENGINE_ID}&key=${API_KEY}&searchType=image`
      );

      const items = response.data.items as customsearch_v1.Schema$Result[];
      console.log("customsearch", items);

      const imageUrls = items.map((item) => item.link || "");
      setImages(imageUrls);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
    }
  };

  const getWordDetails = async () => {
    try {
      const WORDS_API_KEY = process.env.NEXT_PUBLIC_WORDS_API_KEY;

      const response = await axios.get(
        `https://wordsapiv1.p.rapidapi.com/words/${englishWord}`,
        {
          headers: {
            "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
            "X-RapidAPI-Key": WORDS_API_KEY,
          },
        }
      );
      console.log("wordsAPI", response);

      const details = response.data;
      setWordDetails(details);
    } catch (error) {
      console.error("データの取得中にエラーが発生しました:", error);
    }
  };

  return (
    <Box>
      <Header />
      <Center p={4}>
        <HStack w={800}>
          <Input
            value={englishWord}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="英単語を入力してください。"
          />
          <IconButton
            aria-label="SearchIcon"
            icon={<SearchIcon />}
            onClick={searchEnglishWord}
          />
        </HStack>
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

    </Box>
  );
}
