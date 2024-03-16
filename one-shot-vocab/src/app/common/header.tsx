'use client';

import {
  Text,
  Input,
  Select,
  HStack,
  VStack,
  useBreakpoint,
} from '@chakra-ui/react';

interface HeaderProps {
  profession: string;
  setProfession: React.Dispatch<React.SetStateAction<string>>;
  englishLevel: string;
  setEnglishLevel: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  profession,
  setProfession,
  englishLevel,
  setEnglishLevel,
}) => {
  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProfession(event.target.value);

  const handleEnglishLevelChange = (value: string) => {
    setEnglishLevel(value);
  };

  const bp = useBreakpoint();

  console.log(bp);

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
        <div>{bp}</div>
        <HStack>
          <Text as="b">Profession:</Text>
          <Input
            value={profession}
            onChange={handleProfessionChange}
            placeholder="職種を入力してください。"
            bg="white"
            boxShadow="base"
          />
        </HStack>
        <HStack>
          <Text as="b">EnglishLevel:</Text>
          <Select
            value={englishLevel}
            onChange={(e) => handleEnglishLevelChange(e.target.value)}
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
      <VStack align="stretch">
        <HStack>
          <Text as="b">Profession:</Text>
          <Input
            value={profession}
            onChange={handleProfessionChange}
            placeholder="職種を入力してください。"
            bg="white"
            boxShadow="base"
          />
        </HStack>
        <HStack>
          <Text as="b">EnglishLevel:</Text>
          <Select
            value={englishLevel}
            onChange={(e) => handleEnglishLevelChange(e.target.value)}
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
      </VStack>
    </HStack>
  );
};

export default Header;
