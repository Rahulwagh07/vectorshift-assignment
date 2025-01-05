import React, { useCallback, useRef, useState } from "react";
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
import { edgeTypes, nodeTypes } from "../configs/nodeTypes";
import { NodeTypes } from "../configs/nodeConfigs";
import CustomConnectionLine from "./ui/CustomConnectionLine";
import { Button } from "./ui/Button";
import { submitPipeline } from "../services/api";

const gridSize = 15;
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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    await submitPipeline(nodes, edges);
    setLoading(false);
  }, [nodes, edges]);

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
        defaultEdgeOptions={{ type: "custom" }}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={[gridSize, gridSize]}
        defaultViewport={{ x: 0, y: 0, zoom: 0.9 }}
        minZoom={0.5}
        maxZoom={2}
      >
        <Background color="#94a3b8" gap={gridSize} size={1.2} />
        <div className="absolute bottom-4 right-[17rem]">
          <Controls className="bg-white" />
        </div>
        <MiniMap className="bg-white border border-gray-200" />
        <div className="absolute bottom-4 right-[17.5rem] z-10">
          <Button
            text="Submit"
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
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
