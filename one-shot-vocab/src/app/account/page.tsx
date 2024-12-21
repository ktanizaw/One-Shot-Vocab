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
  FormLabel,
} from '@chakra-ui/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/app/lib/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProfessionInput from '@/app/components/common/ProfessionInput';
import EnglishLevelSelect from '@/app/components/common/EnglishLevelSelect';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

const AccountPage = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [englishLevel, setEnglishLevel] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  // ユーザー情報の取得
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name || '');
            setEmail(userData.email || '');
            setProfession(userData.profession || '');
            setEnglishLevel(userData.englishLevel || '');
          } else {
            setError('ユーザー情報が見つかりません。');
          }
        } catch (err) {
          console.error(err);
          setError('データの取得に失敗しました。');
        }
      }
    };

    fetchUserData();
  }, [user]);

  // ユーザー情報の更新
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: name,
        email: email,
        profession: profession,
        englishLevel: englishLevel,
        updated_at: new Date(),
      });

      if (currentPassword && newPassword) {
        if (!email) {
          throw new Error('メールアドレスが見つかりません。');
        }
        const credential = EmailAuthProvider.credential(email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }

      setCurrentPassword('');
      setNewPassword('');
      alert('ユーザー情報を更新しました。');
    } catch (err) {
      console.error(err);
      setError('更新に失敗しました。');
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
    <Box p={4} maxW="1000px" mx="auto">
      <Text fontSize="2xl" mb={4} textAlign="center">
        アカウント情報
      </Text>
      <form onSubmit={handleUpdate}>
        <VStack spacing={4} w="400px" mx="auto">
          <Box w="full">
            <FormLabel htmlFor="name" fontSize={14}>
              名前
            </FormLabel>
            <Input
              id="name"
              placeholder="名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </Box>

          <Box w="full">
            <FormLabel htmlFor="profession" fontSize={14}>
              職業
            </FormLabel>
            <ProfessionInput
              profession={profession}
              setProfession={setProfession}
            />
          </Box>

          <Box w="full">
            <FormLabel htmlFor="englishLevel" fontSize={14}>
              英語レベル
            </FormLabel>
            <EnglishLevelSelect
              englishLevel={englishLevel}
              setEnglishLevel={setEnglishLevel}
            />
          </Box>

          <Box w="full">
            <FormLabel htmlFor="email" fontSize={14}>
              メールアドレス
            </FormLabel>
            <Input
              id="email"
              placeholder="メールアドレス"
              value={email}
              isReadOnly
              autoComplete="email"
            />
          </Box>

          <Box w="full">
            <FormLabel htmlFor="current-password" fontSize={14}>
              現在のパスワード
            </FormLabel>
            <Input
              id="current-password"
              placeholder="現在のパスワード"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Box>

          <Box w="full">
            <FormLabel htmlFor="new-password" fontSize={14}>
              新しいパスワード
            </FormLabel>
            <Input
              id="new-password"
              placeholder="新しいパスワード"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </Box>

          <Button w="full" colorScheme="blue" type="submit">
            更新
          </Button>
          {error && <Text color="red.500">{error}</Text>}
        </VStack>
      </form>
    </Box>
  );
};

export default AccountPage;
