'use client';

import { ComponentType, LegacyRef } from 'react';

import { Box } from '@chakra-ui/react';
import ReactFlow, {
  Background,
  Edge,
  Node,
  NodeProps,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from 'reactflow';

import { NodeController } from '@/enums/nodeController';

import TextNode from '../../components/nodes/TextNode';

type Props = {
  nodes: Node[];
  edges: Edge[];
  reactFlowWrapper: LegacyRef<HTMLDivElement> | null;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onInit: (reactFlowInstance: ReactFlowInstance) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onConnect: OnConnect;
  onNodesChange: OnNodesChange;
  onEdgeChange: OnEdgesChange;
};

const nodeTypes: { [key: string]: ComponentType<NodeProps> } = {
  [NodeController.TextMessage]: TextNode,
};

const Canvas: React.FC<Props> = ({
  nodes,
  edges,
  reactFlowWrapper,
  onConnect,
  onNodesChange,
  onDragOver,
  onDrop,
  onInit,
  onEdgeChange,
}) => {
  return (
    <Box flexGrow={1} className='bg-slate-100' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onInit={onInit}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onEdgesChange={onEdgeChange}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background />
      </ReactFlow>
    </Box>
  );
};

export default Canvas;
