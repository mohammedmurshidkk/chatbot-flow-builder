import { Textarea } from '@chakra-ui/react';

import { NodeChangingValue } from '@/types/chatFlows';

export type SettingProps = {
  value?: NodeChangingValue;
  controlRef?: React.LegacyRef<HTMLTextAreaElement> | null;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextSetting: React.FC<SettingProps> = ({ value, controlRef, onChange }) => {
  return (
    <Textarea
      placeholder='Type something...'
      ref={controlRef}
      value={value as string}
      onChange={onChange}
    />
  );
};
