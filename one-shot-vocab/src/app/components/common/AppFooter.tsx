import { Text, HStack } from '@chakra-ui/react';

const AppFooter: React.FC = () => {
  return (
    <HStack as="footer" justify="center" h={20}>
      <Text fontSize={14}>© 2024 One Shot Vocab</Text>
    </HStack>
  );
};

export default AppFooter;
