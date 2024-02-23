"use client";
import {
  Box,
  Divider,
  Avatar,
  Center,
  Text,
  HStack,
  Tag,
} from "@chakra-ui/react";

interface ChatgptCardProps {
  prompt: string;
  text: string;
}

const ChatgptCard: React.FC<ChatgptCardProps> = ({ prompt, text }) => {
  if (!text) {
    return null;
  }

  return (
    <Center p={4}>
      <Box>
        <Tag mb="4" size="lg" key="lg" variant="solid" colorScheme="teal">
          AI生成例文
        </Tag>
        <Box maxW={{ base: "100%", md: "800px" }}>
          <HStack spacing={4}>
            <Box>
              <Avatar src="/face.svg" />
            </Box>
            <Box whiteSpace="pre-wrap">
              <Text>{prompt}</Text>
            </Box>
          </HStack>
          <Divider mt={4} mb={4} />
          <HStack spacing={4}>
            <Box>
              <Avatar src="/robot.svg" />
            </Box>
            <Box whiteSpace="pre-wrap">
              <Text>{text}</Text>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Center>
  );
};

export default ChatgptCard;