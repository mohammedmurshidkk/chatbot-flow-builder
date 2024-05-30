import { Dispatch, SetStateAction } from 'react';

import { Node } from 'reactflow';

import { NodeChangingValue } from '@/types/chatFlows';

export type SettingPanelProps = {
  selectedNode?: Node | null;
  nodeChangingValue?: NodeChangingValue;
  controllerRef?: React.LegacyRef<HTMLTextAreaElement> | null;
  setSelectedNode: Dispatch<SetStateAction<Node | null>>;
  setNodeChangingValue: Dispatch<SetStateAction<NodeChangingValue>>;
};
