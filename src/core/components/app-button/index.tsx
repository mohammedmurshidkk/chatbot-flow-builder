import { Button } from '@chakra-ui/react';

import { BaseButtonProps } from './types';

const AppButton: React.FC<BaseButtonProps> = ({
  variant = 'solid',
  colorScheme = 'brand',
  isLoading,
  loadingText = 'Loading...',
  spinnerPlacement = 'start',
  fontWeight = 'normal',
  fontSize = 'small',
  height = '35px',
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      colorScheme={colorScheme}
      isLoading={isLoading}
      loadingText={loadingText}
      spinnerPlacement={spinnerPlacement}
      fontWeight={fontWeight}
      fontSize={fontSize}
      height={height}
      {...rest}
    />
  );
};

export default AppButton;
