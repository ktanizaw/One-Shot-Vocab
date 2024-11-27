'use client';

import { useState, ChangeEvent } from 'react';
import { Box, Button, Input, VStack, Text, Center } from '@chakra-ui/react';
import HiroLogo from '@/app/assets/images/Hiro.png';
import OneShotLogo from '@/app/assets/images/one-shot.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebaseConfig';

export default function Home() {
  const router = useRouter();
  const toRegister = () => {
    router.push('/register');
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<void> => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('ログイン成功:', userCredential.user);
    } catch (err: any) {
      setError(err.message || 'ログインに失敗しました');
    }
  };

  return (
    <Box p={4} maxW="1000px" mx="auto" mb={10}>
      <Center>
        <Image src={OneShotLogo} alt="one-shot-logo" width={150} height={150} />
      </Center>
      <Center>
        <Image src={HiroLogo} alt="Hiro" width={150} height={150} />
      </Center>
      <Text fontWeight="bold">One-Shot Vocabへようこそ！</Text>
      <Text mt={6}>本サービスは、</Text>
      <div className="bold">
        ・日本語での仕事上のコミュニケーションを英語でもできるようになりたい
        <br />
        ・外資系企業に就職/転職したい
        <br />
        ・海外キャリアを目指したい
        <br />
      </div>
      <Text mt={2}>
        という夢を追いかけている方をサポートすることを目的とした、英語ボキャブラリー学習特化型ツールです。
      </Text>
      <Text>
        一般的な英単語帳とは異なり、AIプロンプトを活用して「あなたが実際に現場で使用するボキャブラリー」に焦点をあて、1語ずつ多角度から学習できる設計になっています。
      </Text>
      <Text mt={4}>
        <Text as="span" fontWeight="bold">
          １．{' '}
        </Text>
        あなたの現在の英語レベルに基づき、
        「全職種必須ボキャブラリー」+「あなた自身の職業に応じて個別生成されたボキャブラリー」をリスト化して学習/復習が可能な
        <Text as="span" color="red" fontWeight="bold">
          ”リスト機能”
        </Text>
      </Text>
      <Text>
        <Text as="span" fontWeight="bold">
          ２．{' '}
        </Text>
        普段の生活の中で気になった単語を能動的に検索し、そのままシームレスに学習できる
        <Text as="span" color="red" fontWeight="bold">
          ”サーチ機能”
        </Text>
      </Text>
      <div>の2機能で構成されています。</div>
      <Text mt={6}>
        One-Shot Vocab One-Shot Vocab に初めてご登録いただいた方は、
        <Text as="span" color="red" fontWeight="bold">
          ”リスト機能”
        </Text>
        2セッション分、または
        <Text as="span" color="red" fontWeight="bold">
          ”サーチ機能”
        </Text>
        5回分の学習を無料でご体験いただけます。
      </Text>
      <div>
        無料ご利用枠終了後は、月額500円にてこれらの機能を無制限でご利用いただけます。
      </div>
      <VStack spacing={4} maxW="600px" mx="auto" mt={10}>
        <Button w="full" colorScheme="blue" variant="outline">
          Continue with Google
        </Button>
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
        <Button w="full" colorScheme="blue" onClick={handleLogin}>
          ログイン
        </Button>
        <Text mt={6}>アカウントをお持ちでない方は</Text>
        <Button w="full" colorScheme="teal" onClick={toRegister}>
          新規登録
        </Button>
      </VStack>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }
      `}</style>
    </Box>
  );
}
