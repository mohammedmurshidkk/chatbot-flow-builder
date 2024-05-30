'use client';

import { ChakraProvider } from '@chakra-ui/react';

import appTheme from '@/core/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={appTheme}>{children}</ChakraProvider>;
}
