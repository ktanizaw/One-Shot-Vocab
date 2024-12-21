'use client';

import { useState, ChangeEvent } from 'react';
import { Box, Button, Input, VStack, Text, Center } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseConfig';
import Image from 'next/image';
import HiroLogo from '@/app/assets/images/Hiro.png';
import OneShotLogo from '@/app/assets/images/one-shot.png';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfessionInput from '@/app/components/common/ProfessionInput';
import EnglishLevelSelect from '@/app/components/common/EnglishLevelSelect';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState<string>(searchParams.get('name') || '');
  const [email, setEmail] = useState<string>(searchParams.get('email') || '');
  const [password, setPassword] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [englishLevel, setEnglishLevel] = useState<string>('C2');
  const [error, setError] = useState<string | null>(null);

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
        <ProfessionInput
          profession={profession}
          setProfession={setProfession}
        />

        <EnglishLevelSelect
          englishLevel={englishLevel}
          setEnglishLevel={setEnglishLevel}
        />

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
