'use client';

import { useState, ChangeEvent } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseConfig';
import { useRouter } from 'next/navigation';

interface User {
  firebase_uid: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
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
      <Text fontSize="2xl" mb={4} textAlign="center">
        新規登録
      </Text>
      <VStack spacing={4}>
        <Input
          placeholder="名前"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
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
