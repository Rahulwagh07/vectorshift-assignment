import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

interface StoreState {
  nodes: Node[];
  edges: Edge[];
  nodeIDs: Record<string, number>;
  getNodeID: (type: string) => string;
  addNode: (node: Node) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  updateNodeHandles: (nodeId: string, newHandles: any[], oldHandles?: any[]) => void;
  connections: EdgeConnection[];
  addConnection: (connection: EdgeConnection) => void;
}

interface EdgeConnection {
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export const useStore = create<StoreState>((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  connections: [],

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    newIDs[type] = (newIDs[type] || 0) + 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set((state) => ({
      nodes: [...state.nodes, { ...node, data: node.data || {} }],
    }));
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (params) => {
    set((state) => {
      const newConnection = {
        source: params.source || '',
        target: params.target || '',
        sourceHandle: params.sourceHandle || '',
        targetHandle: params.targetHandle || ''
      };

      return {
        connections: [...state.connections, newConnection],
        edges: addEdge(params, state.edges)
      };
    });
  },

  updateNodeData: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },

  updateNodeHandles: (nodeId, newHandles = []) => {
    set((state) => {
      const newHandleIds = new Set(newHandles.map(h => h.id));

      const updatedEdges = state.edges.filter(edge => {
        if (edge.target === nodeId) {
          return newHandleIds.has(edge.targetHandle || '');
        }
        return true;
      });

      const updatedNodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              dynamicHandles: newHandles
            }
          };
        }
        return node;
      });

      return {
        edges: updatedEdges,
        nodes: updatedNodes
      };
    });
  },

  addConnection: (connection) => {
    set((state) => ({
      connections: [...state.connections, connection],
      edges: addEdge(connection, state.edges)
    }));
  },
}));

