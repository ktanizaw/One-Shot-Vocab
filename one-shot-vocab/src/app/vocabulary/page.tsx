"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { Input, IconButton, SearchIcon } from "@/plugins/chakra-ui-modules";

export default function Vocabulary() {
  const [englishWord, setEnglishWord] = useState("");
  const handleChange = (event: any) => setEnglishWord(event.target.value);
  const searchEnglishWord = () => {
    console.log("searchEnglishWord");
  };

  return (
    <div className={styles.vocabularyContainer}>
      <div className={styles.searchField}>
        <Input
          value={englishWord}
          onChange={handleChange}
          placeholder="英単語を入力してください。"
        />
        <IconButton aria-label='SearchIcon' icon={<SearchIcon />} onClick={searchEnglishWord} />
      </div>
    </div>
  );
}
