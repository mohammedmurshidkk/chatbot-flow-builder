'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Flex, useToast } from '@chakra-ui/react';
import {
  addEdge,
  Connection,
  MarkerType,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  XYPosition,
} from 'reactflow';

import { NodeController } from '@/enums/nodeController';
import { useDebounce } from '@/hooks/useDebounce';
import { NodeChangingValue } from '@/types/chatFlows';
import { checkIsAllNodeConnected } from '@/utils/validator';

import Canvas from './Canvas';
import Header from './Header';
import NodePanel from './node-panel';

// ** Initial node data
const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: NodeController.TextMessage,
    position: { x: 0, y: 0 },
    data: { content: 'Welcome !' },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const ChatFlowCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [reactFlowInstance, setReactFlowInstance] = useState<null | ReactFlowInstance>(null);
  const [selectedNode, setSelectedNode] = useState<null | Node>(null);
  const [nodeChangingValue, setNodeChangingValue] = useState<NodeChangingValue>(null);

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<HTMLTextAreaElement | null>(null);
  const toast = useToast();

  const onInit = (reactFlowInstance: ReactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();

    const type = e.dataTransfer.getData('application/reactflow');
    const content = e.dataTransfer.getData('content');

    const position = reactFlowInstance?.project({
      x: e.clientX - (reactFlowBounds?.left || 0),
      y: e.clientY - (reactFlowBounds?.top || 0),
    });

    const newNode = {
      id: getId(),
      type,
      position: position as XYPosition,
      selected: true, // Setting selected true initially for edit text on panel
      data: { content },
    };

    setNodes((es) => {
      return es.map((e) => ({ ...e, selected: false })).concat(newNode);
    });
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceNodeEdges = edges.filter((edge) => edge.source === params.source);

      // ** Allow only one edge from each source handle
      if (sourceNodeEdges.length === 0) {
        setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
      }
    },
    [edges, setEdges],
  );

  const onSave = useCallback(() => {
    const isAllNodeConnected = checkIsAllNodeConnected(nodes, edges);

    if (isAllNodeConnected) toast({ title: 'Saved Successfully', position: 'top' });
    else
      toast({
        title: 'Error: More than one node has empty target handles.',
        position: 'top',
        status: 'error',
      });
  }, [nodes, edges]);

  useEffect(() => {
    const node = nodes.filter((node) => node.selected);

    if (node[0]) {
      setSelectedNode(node[0]);
      setNodeChangingValue(node[0].data?.content);
      controllerRef?.current?.focus();
    } else {
      setSelectedNode(null);
    }
  }, [nodes]);

  const debouncedNodeChangingValue = useDebounce(nodeChangingValue, 400);

  useEffect(() => {
    setNodes((prvValue) => {
      return prvValue?.map((node) => {
        if (node?.id === selectedNode?.id && node.data.content !== debouncedNodeChangingValue) {
          node.data = {
            ...node.data,
            content: debouncedNodeChangingValue,
          };
        }
        return node;
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNodeChangingValue]);

  return (
    <>
      <Header onSave={onSave} />
      <Flex h='95%' overflow='hidden' justifyContent='space-between'>
        <ReactFlowProvider>
          <Canvas
            nodes={nodes}
            edges={edges}
            reactFlowWrapper={reactFlowWrapper}
            onDrop={onDrop}
            onInit={onInit}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onEdgeChange={onEdgesChange}
            onNodesChange={onNodesChange}
          />
          <NodePanel
            selectedNode={selectedNode}
            controllerRef={controllerRef}
            nodeChangingValue={nodeChangingValue}
            setNodeChangingValue={setNodeChangingValue}
            setSelectedNode={setSelectedNode}
          />
        </ReactFlowProvider>
      </Flex>
    </>
  );
};

export default ChatFlowCanvas;
