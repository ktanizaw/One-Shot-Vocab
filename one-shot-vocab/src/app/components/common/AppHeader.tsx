import {
  Text,
  Input,
  Select,
  HStack,
  VStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
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
  const toPayment = () => {
    router.push('/payment');
  };
  const toLogout = () => {
    router.push('/logout');
  };
  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProfession(event.target.value);

  const handleEnglishLevelChange = (value: string) => {
    setEnglishLevel(value);
  };

  const englishLevelOptions = ['A2', 'B1', 'B2', 'C1'];

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
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          size="sm"
          mr="10"
        />
        <MenuList>
          <MenuItem onClick={toAccount}>ユーザー情報</MenuItem>
          <MenuItem onClick={toPayment}>お支払い情報</MenuItem>
        </MenuList>
      </Menu>
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
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            size="sm"
          />
          <MenuList>
            <MenuItem onClick={toAccount}>ユーザー情報</MenuItem>
            <MenuItem onClick={toPayment}>お支払い情報</MenuItem>
            <MenuItem onClick={toLogout}>ログアウト</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default AppHeader;
