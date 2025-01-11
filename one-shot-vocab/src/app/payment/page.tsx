'use client';

import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
// );

const PaymentPage = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const stripe = useStripe();
  //   const elements = useElements();

  //   const handleCardRegister = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     if (!stripe || !elements) return;

  //     const cardElement = elements.getElement(CardElement);
  //     if (cardElement) {
  //       const { token, error } = await stripe.createToken(cardElement);
  //       if (error) {
  //         console.error(error);
  //       } else {
  //         setCardInfo(token);
  //         alert('クレジットカードを登録しました。');
  //       }
  //     }
  //   };

  //   const handlePayment = async () => {
  //     if (!stripe || !cardInfo) return;

  //     // Stripe API経由で決済を行う
  //     try {
  //       const response = await fetch('/api/payment', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ token: cardInfo.id }),
  //       });

  //       const data = await response.json();
  //       if (data.success) {
  //         setIsPremium(true);
  //         alert('決済が完了しました。有料会員になりました。');
  //       } else {
  //         alert('決済に失敗しました。');
  //       }
  //     } catch (error) {
  //       console.error('決済エラー:', error);
  //       alert('決済に失敗しました。');
  //     }
  //   };

  const handleCancelSubscription = () => {
    onOpen();
  };

  const confirmCancelSubscription = () => {
    setIsPremium(false);
    onClose();
    alert('有料会員をキャンセルしました。');
  };

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Text fontSize="2xl" mb={4} textAlign="center">
        支払い情報
      </Text>
      <VStack spacing={4}>
        {!isPremium && (
          <form>
            <Text>クレジットカード情報の入力</Text>
            <Box
              border="1px"
              borderColor="gray.200"
              p={4}
              rounded="md"
              bg="white"
            >
              {/* <CardElement
                options={{ style: { base: { fontSize: '16px' } } }}
              /> */}
            </Box>
            <Button mt={4} colorScheme="blue" type="submit">
              クレジットカードを登録
            </Button>
          </form>
        )}

        {cardInfo && !isPremium && (
          <Button colorScheme="green">クレジットカードで決済</Button>
        )}

        {isPremium && (
          <Box>
            <Text>現在のステータス: 有料会員</Text>
            <Text>次回更新日: {new Date().toLocaleDateString()}</Text>
            <Button mt={4} colorScheme="red" onClick={handleCancelSubscription}>
              有料会員をキャンセル
            </Button>
          </Box>
        )}

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>キャンセル確認</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>本当に有料会員をキャンセルしますか？</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={confirmCancelSubscription}
              >
                はい
              </Button>
              <Button variant="ghost" onClick={onClose}>
                いいえ
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

const WrappedPaymentPage = () => (
  //   <Elements stripe={stripePromise}>
  <PaymentPage />
  //   </Elements>
);

export default WrappedPaymentPage;
