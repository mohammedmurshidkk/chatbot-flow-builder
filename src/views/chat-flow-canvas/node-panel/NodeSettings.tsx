import React from 'react';

import { Box, Flex, Icon } from '@chakra-ui/react';
import { BiMessageRoundedDetail } from 'react-icons/bi';

import AppButton from '@/core/components/app-button';
import { NodeController } from '@/enums/nodeController';

const { TextMessage } = NodeController;

// ** Node definitions with type, icon, and initial value
const nodes = [
  { label: 'Message', icon: BiMessageRoundedDetail, type: TextMessage, initialValue: '' },
  // **
  //   { label: 'Voice Message', icon: MdOutlineSettingsVoice, type: TextMessage, initialValue: '' },
  // **
];

const NodeSettings: React.FC = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    node: NodeController,
    content: string,
  ) => {
    e.dataTransfer.setData('application/reactflow', node);
    e.dataTransfer.setData('content', content);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box className='p-3 w-[100%] h-[100%] overflow-auto'>
      <div className='flex flex-wrap gap-4 mb-4'>
        {nodes?.map((node, i) => {
          return (
            <AppButton
              key={i}
              draggable
              onDragStart={(e) => onDragStart(e, node.type, node.initialValue)}
              color='blue.600'
              border='1px'
              borderColor='blue.400'
              rounded='sm'
              py={8}
              variant='text'
              minW='45%'
              flex={1}
            >
              <Flex direction='column' alignItems='center'>
                <Icon as={node?.icon} fontSize='1.3rem' />
                <label>{node?.label}</label>
              </Flex>
            </AppButton>
          );
        })}
      </div>
    </Box>
  );
};

export default NodeSettings;
