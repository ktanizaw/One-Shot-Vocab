import { Avatar, Text, Input, Select, HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

type AppHeaderProps = {
  profession: string;
  setProfession: React.Dispatch<React.SetStateAction<string>>;
  englishLevel: string;
  setEnglishLevel: React.Dispatch<React.SetStateAction<string>>;
};

const AppHeader: React.FC<AppHeaderProps> = ({
  profession,
  setProfession,
  englishLevel,
  setEnglishLevel,
}) => {
  const router = useRouter();
  const toAccount = () => {
    router.push('/account');
  };
  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProfession(event.target.value);

  const handleEnglishLevelChange = (value: string) => {
    setEnglishLevel(value);
  };

  const englishLevelOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <HStack
      as="header"
      h={{ base: 32, md: 20 }}
      borderBottom="1px"
      borderColor="gray.200"
      bg="blue.100"
      w="full"
    >
      <HStack
        spacing={20}
        display={{ base: 'none', md: 'flex' }}
        marginX="auto"
      >
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
            bg="white"
            boxShadow="base"
          >
            {englishLevelOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
      <Avatar
        display={{ base: 'none', md: 'flex' }}
        src="https://bit.ly/broken-link"
        cursor="pointer"
        size="sm"
        mr="10"
        onClick={toAccount}
      />
      <HStack marginX="auto" display={{ base: 'flex', md: 'none' }}>
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
              bg="white"
              boxShadow="base"
            >
              {englishLevelOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </HStack>
        </VStack>
        <Avatar
          src="https://bit.ly/broken-link"
          cursor="pointer"
          size="sm"
          onClick={toAccount}
          display={{ base: 'flex', md: 'none' }}
        />
      </HStack>
    </HStack>
  );
};

export default AppHeader;
