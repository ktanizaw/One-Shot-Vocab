'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const AccountPage = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // ユーザー情報の取得
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name);
          setEmail(userData.email);
        } else {
          setError('ユーザー情報が見つかりません。');
        }
      }
    };

    fetchUserData();
  }, [user]);

  // ユーザー情報の更新
  const handleUpdate = async () => {
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          name: name,
          email: email,
          updated_at: new Date(),
        });
        alert('ユーザー情報を更新しました。');
      } catch (err) {
        console.error(err);
        setError('更新に失敗しました。');
      }
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Box p={4} maxW="400px" mx="auto">
      <Text fontSize="2xl" mb={4} textAlign="center">
        アカウント情報
      </Text>
      {error && <Text color="red.500">{error}</Text>}
      <VStack spacing={4}>
        <Input
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="メールアドレス"
          value={email}
          isReadOnly
        />
        <Button w="full" colorScheme="blue" onClick={handleUpdate}>
          更新
        </Button>
      </VStack>
    </Box>
  );
};

export default AccountPage;
