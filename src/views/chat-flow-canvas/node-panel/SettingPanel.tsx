import React, { ReactNode } from 'react';

import { Box, Flex, IconButton, Text, theme } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa6';

import { SettingProps, TextSetting } from '@/components/NodeControllers';
import { NodeController } from '@/enums/nodeController';

import { SettingPanelProps } from './types';

type Map = {
  [key: string]: { heading: string; Component: (v: SettingProps) => ReactNode };
};

const settingsMap: Map = {
  [NodeController.TextMessage]: { heading: 'Message', Component: TextSetting },
};

const SettingPanel: React.FC<SettingPanelProps> = ({
  selectedNode,
  nodeChangingValue,
  controllerRef,
  setSelectedNode,
  setNodeChangingValue,
}) => {
  const selectedType = selectedNode?.type || NodeController.TextMessage;

  const { heading = '', Component } = settingsMap[selectedType];

  const onChange = (value: string) => {
    setNodeChangingValue(value);
  };

  return (
    <Box className='w-[100%]'>
      <Flex
        borderBottom={`1px solid ${theme.colors.gray[200]}`}
        className='w-[100%] items-center px-3 py-2'
      >
        <Box className='flex-1'>
          <IconButton
            aria-label='arrow-left'
            minW={0}
            maxH={0}
            onClick={() => setSelectedNode(null)}
          >
            <FaArrowLeft id='arrow-left' />
          </IconButton>
        </Box>
        <Text className='flex-[1.5] text-sm font-semibold'>{heading}</Text>
      </Flex>
      <Box className='p-3'>
        <Component
          value={nodeChangingValue}
          controlRef={controllerRef}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default SettingPanel;
