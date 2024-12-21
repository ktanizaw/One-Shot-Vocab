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
    <Box p={4} maxW="400px" mx="auto">
      <Center>
        <Image src={OneShotLogo} alt="one-shot-logo" width={150} height={150} />
      </Center>
      <Center>
        <Image src={HiroLogo} alt="Hiro" width={150} height={150} />
      </Center>
      <VStack spacing={4}>
        <Input
          placeholder="ユーザー名"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <Input
          placeholder="import { InfoOutlineIcon } from '@chakra-ui/icons';
 (例: Engineer)"
          value={profession}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProfession(e.target.value)
          }
        />
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
        <Input
          placeholder="メールアドレス"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          placeholder="パスワード"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button w="full" colorScheme="blue" onClick={handleRegister}>
          登録
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;
