import { NodeProps, NodeTypes as ReactFlowNodeTypes } from "reactflow";
import { BaseNode } from "../components/nodes/BaseNode";
import { nodeConfigs } from "./nodeConfigs";
import {
  NodeConfig,
  NodeFieldType,
  NodeHandleConfig,
  NodeType,
} from "../types/node";
import CustomEdge from "../components/ui/CustomEdge";

const createNodeTypes = () => {
  return (Object.keys(nodeConfigs) as NodeType[]).reduce((acc, key) => {
    const config: NodeConfig = {
      type: key,
      label: nodeConfigs[key].label,
      fields: nodeConfigs[key].fields as NodeFieldType[],
      handles: nodeConfigs[key].handles as NodeHandleConfig[],
    };

    acc[key] = (props: NodeProps) => (
      <BaseNode
        {...props}
        config={config}
        handles={[
          ...(props.data?.dynamicHandles || []),
          ...nodeConfigs[key].handles,
        ]}
      />
    );
    return acc;
  }, {} as ReactFlowNodeTypes);
};

export const nodeTypes = createNodeTypes();

export const edgeTypes = {
  custom: CustomEdge,
};