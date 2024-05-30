import { Edge, Node } from 'reactflow';

export const checkIsAllNodeConnected = (nodes: Node[], edges: Edge[]): boolean => {
  // If there are 0 or 1 nodes, they are inherently "connected"
  if (nodes.length <= 1) {
    return true;
  }

  // Find nodes with no incoming edges
  const nodesWithEmptyTargets = nodes.filter(
    (node) => !edges.some((edge) => edge.target === node.id),
  );

  // Check if more than one node has no incoming edges
  return nodesWithEmptyTargets.length <= 1;
};
