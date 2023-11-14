"use client";

import { Text, Input, Select, HStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Header() {
  const [profession, setProfession] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProfession(event.target.value);

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value);
  };

  return (
    <HStack
      as="header"
      h={20}
      justify="center"
      borderBottom="1px"
      borderColor="gray.200"
      bg="blue.100"
    >
      <HStack spacing={20}>
        <HStack>
          <Text as="b">Profession:</Text>
          <Input
            value={profession}
            onChange={handleChange}
            placeholder="職種を入力してください。"
            bg="white"
            boxShadow="base"
          />
        </HStack>
        <HStack>
          <Text as="b">Level:</Text>
          <Select 
          value={selectedLevel}
          onChange={(e) => handleLevelChange(e.target.value)}
          placeholder="Level"
          bg="white"
          boxShadow="base"
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </Select>
        </HStack>
      </HStack>
    </HStack>
  );
}
