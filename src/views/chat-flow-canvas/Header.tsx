import { Flex } from '@chakra-ui/react';

import AppButton from '@/core/components/app-button';

type Props = {
  onSave?: () => void;
};

const Header: React.FC<Props> = ({ onSave }) => {
  return (
    <Flex bg='#F3F3F3' justify='flex-end' pr={10} py={2}>
      <AppButton variant='outline' onClick={onSave}>
        Save Changes
      </AppButton>
    </Flex>
  );
};

export default Header;
