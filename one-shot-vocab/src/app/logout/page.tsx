'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebaseConfig';
import { Center } from '@chakra-ui/react';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await signOut(auth);
        console.log('ログアウト成功');
        router.push('/');
      } catch (error) {
        console.error('ログアウト失敗:', error);
      }
    };

    logout();
  }, [router]);

  return (
    <Center height="100vh">
      <p>ログアウト中...</p>
    </Center>
  );
}
