import { Flex, theme } from '@chakra-ui/react';

import NodeSettings from './NodeSettings';
import SettingPanel from './SettingPanel';
import { SettingPanelProps } from './types';

type Props = SettingPanelProps;

const NodePanel: React.FC<Props> = (props) => {
  const { selectedNode } = props;

  return (
    <Flex w='20%' border={`1px solid ${theme.colors.gray[300]}`}>
      {selectedNode ? <SettingPanel {...props} /> : <NodeSettings />}
    </Flex>
  );
};

export default NodePanel;
