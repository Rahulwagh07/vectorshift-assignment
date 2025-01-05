import axios from 'axios';
import { Node, Edge } from 'reactflow';
import { customToast } from '../components/ui/Toast';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export const submitPipeline = async (nodes: Node[], edges: Edge[]) => {
  const adjacencyList: Record<string, string[]> = {};

  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });

  edges.forEach(edge => {
    if (edge.source && edge.target) {
      if (!adjacencyList[edge.source]) {
        adjacencyList[edge.source] = [];
      }
      adjacencyList[edge.source].push(edge.target);
    }
  });

  try {
    const response = await axios.post(`${BACKEND_URL}/pipelines/parse`,
      { pipeline: adjacencyList },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = response.data;

    customToast({
      message: 'Pipeline Analysis',
      description: `Number of Nodes:   ${data?.num_nodes}\n` +
        `Number of Edges:   ${data?.num_edges}\n` +
        `Is DAG:  ${data.is_dag ? 'Yes' : 'No'}`,
      icon: 'GoCheckCircleFill'
    });

  } catch (error) {
    customToast({
      message: 'Request failed',
      description: 'Please try again.',
      icon: 'BiSolidErrorCircle'
    });
    console.log('Error analyzing pipeline:', error);
  }
}; 