import styles from "./page.module.css";

import {Input, IconButton, SearchIcon } from "@/plugins/chakra-ui-modules";

export default function Vocabulary() {
  return (
    <div className={styles.searchField}>
      <Input placeholder="Basic usage" />
      <IconButton aria-label="Search database" icon={<SearchIcon />} />
    </div>
  );
}
