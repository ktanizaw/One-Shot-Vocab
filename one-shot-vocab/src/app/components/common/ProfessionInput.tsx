import { ChangeEvent } from 'react';
import { HStack, Input, Tooltip, Icon } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface ProfessionInputProps {
  profession: string;
  setProfession: (value: string) => void;
}

const ProfessionInput = ({
  profession,
  setProfession,
}: ProfessionInputProps) => {
  return (
    <HStack width="400px">
      <Input
        id="profession"
        placeholder="職業"
        value={profession}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setProfession(e.target.value)
        }
      />
      <Tooltip
        label={
          <>
            以下の例のようにご自身の職業を英語で具体的に記載してください：
            <ul>
              <li>例）</li>
              <li>Software Engineer for health app project</li>
              <li>Marketing manager at internet service provider</li>
              <li>Sales manager for air conditioning system</li>
              <li>Product manager at travel agency</li>
            </ul>
          </>
        }
        placement="right"
        hasArrow
      >
        <Icon as={InfoOutlineIcon} />
      </Tooltip>
    </HStack>
  );
};

export default ProfessionInput;
