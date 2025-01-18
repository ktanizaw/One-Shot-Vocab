import { ChangeEvent } from 'react';
import { HStack, Select, Tooltip, Icon } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface EnglishLevelSelectProps {
  englishLevel: string;
  setEnglishLevel: (value: string) => void;
}

const EnglishLevelSelect = ({
  englishLevel,
  setEnglishLevel,
}: EnglishLevelSelectProps) => {
  return (
    <HStack width="400px">
      <Select
        id="englishLevel"
        placeholder="英語レベルを選択"
        value={englishLevel}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setEnglishLevel(e.target.value)
        }
      >
        <option value="A2">A2</option>
        <option value="B1">B1</option>
        <option value="B2">B2</option>
        <option value="C1">C1</option>
      </Select>
      <Tooltip
        label={
          <>
            英語レベルは以下のスコアを目安に選択してください：
            <ul>
              <li>A2: 英検準2級 / TOEIC L&R ~550点</li>
              <li>B1: 英検2級 / TOEFL iBT ~71点 / TOEIC L&R ~785点</li>
              <li>B2: 英検準1級 / TOEFL iBT ~94点 / TOEIC L&R ~945点</li>
              <li>C1: 英検1級 / TOEFL iBT ~120点 / TOEIC L&R ~990点</li>
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

export default EnglishLevelSelect;
