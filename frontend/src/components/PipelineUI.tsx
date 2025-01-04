import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useStore } from "../store";
import { nodeTypes} from "../configs/nodeTypes";
import { NodeTypes } from '../configs/nodeConfigs';
import CustomConnectionLine from './ui/CustomConnectionLine';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const Flow = () => {
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore();

  const reactFlow = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      try {
        const bounds = reactFlowWrapper.current?.getBoundingClientRect();
        const appData = event.dataTransfer.getData("application/reactflow");

        if (!bounds || !appData) return;

        const { nodeType, config } = JSON.parse(appData);
        if (!nodeType || !(nodeType in nodeTypes)) return;

        const position = reactFlow.screenToFlowPosition({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
        });

        const newNode: Node = {
          id: getNodeID(nodeType),
          type: nodeType as NodeTypes,
          position,
          data: {
            config,
          },
        };

        addNode(newNode);
      } catch (error) {
        console.error("Error handling node drop:", error);
      }
    },
    [reactFlow, getNodeID, addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className="w-full h-[calc(100vh-8rem)] -mt-4 bg-white rounded-lg shadow-sm border border-gray-200 relative z-0"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        connectionLineComponent={CustomConnectionLine}
        proOptions={proOptions}
        snapToGrid
        snapGrid={[gridSize, gridSize]}
        defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
        minZoom={0.5}
        maxZoom={2}
      >
        <Background color="#94a3b8" gap={gridSize} size={1} />
        <div className="absolute bottom-4 right-[17rem] flex items-center gap-2 bg-white border border-gray-200 shadow-sm p-1 rounded">
          <Controls className="bg-white" />
        </div>
        <MiniMap className="bg-white border border-gray-200" />
      </ReactFlow>
    </div>
  );
};

export const PipelineUI = () => {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
};
