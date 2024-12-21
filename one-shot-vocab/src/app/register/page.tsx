'use client';

import { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Select,
  Center,
  Tooltip,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HiroLogo from '@/app/assets/images/Hiro.png';
import OneShotLogo from '@/app/assets/images/one-shot.png';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface User {
  firebase_uid: string;
  name: string;
  profession: string;
  englishLevel: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [englishLevel, setEnglishLevel] = useState<string>('C2');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toSearch = () => {
    router.push('/search');
  };

  const handleRegister = async (): Promise<void> => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Firestoreにユーザー情報を保存
      const newUser: User = {
        firebase_uid: user.uid,
        name,
        profession,
        englishLevel,
        email,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      await setDoc(doc(db, 'users', user.uid), newUser);
      toSearch();
      console.log('登録成功:', user);
    } catch (err: any) {
      setError(err.message || '登録に失敗しました');
    }
  };

  return (
    <Box p={4} maxW="1000px" mx="auto">
      <Center>
        <Image src={OneShotLogo} alt="one-shot-logo" width={150} height={150} />
      </Center>
      <Center>
        <Image src={HiroLogo} alt="Hiro" width={150} height={150} />
      </Center>
      <VStack spacing={4}>
        <Input
          w="400px"
          placeholder="ユーザー名"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <Text textAlign="center" mt={6} fontSize="12px">
          ご自身の職業を入力し、現在の英語レベルを選択してください。
          <br />
          入力内容に基づいてボキャブラリーリストが生成されます。
        </Text>
        <HStack width="400px">
          <Input
            placeholder="職業"
            value={profession}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProfession(e.target.value)
            }
          />
          <Tooltip
            label={
              <>
                以下の例のようにご自身の職業を英語で具体的に記載してください：
                <ul>
                  <li>例）</li>
                  <li>Software Engineer for health app project</li>
                  <li>Marketing manager at internet service provider</li>
                  <li>Sales manager for air conditioning system</li>
                  <li>Product manager at travel agency</li>
                </ul>
              </>
            }
            placement="right"
            hasArrow
          >
            <Icon as={InfoOutlineIcon} />
          </Tooltip>
        </HStack>
        <HStack w="400px">
          <Select
            placeholder="英語レベルを選択"
            value={englishLevel}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setEnglishLevel(e.target.value)
            }
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </Select>
          <Tooltip
            label={
              <>
                英語レベルは以下のスコアを目安に選択してください：
                <ul>
                  <li>A2: 英検準2級 / TOEIC L&R ~550点</li>
                  <li>B1: 英検2級 / TOEFL iBT ~71点 / TOEIC L&R ~785点</li>
                  <li>B2: 英検準1級 / TOEFL iBT ~94点 / TOEIC L&R ~945点</li>
                  <li>C1: 英検1級 / TOEFL iBT ~120点 / TOEIC L&R ~990点</li>
                </ul>
              </>
            }
            placement="right"
            hasArrow
          >
            <Icon as={InfoOutlineIcon} />
          </Tooltip>
        </HStack>

        <Input
          w="400px"
          placeholder="メールアドレス"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          w="400px"
          placeholder="パスワード"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button w="400px" colorScheme="blue" onClick={handleRegister}>
          設定を保存する
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
