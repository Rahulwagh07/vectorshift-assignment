import { memo, useEffect, useMemo } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import { useStore } from "../../store";
import { X } from "lucide-react";
import { Icons } from "../../configs/icons";
import { nodes } from "../../configs/nodeData";
import { NodeHandleConfig, NodeProps } from "../../types/node";
import { RenderField } from "./RenderField";
import { IconRenderer } from "../ui/RenderIcon";
import { NodeHandle } from "./NodeHandle";
import { useConnectedHandles } from "../../hooks/useConnectedHandles";
import { useNodeData } from "../../hooks/useNodeData";

export const BaseNode = memo(
  ({ id, data, type, handles, config, selected }: NodeProps) => {
    const updateNodeInternals = useUpdateNodeInternals();
    const onNodesChange = useStore((state) => state.onNodesChange);
    const { localData, handleChange, previousHandles } = useNodeData(
      id,
      data,
      handles
    );
    const { isHandleConnected } = useConnectedHandles(id);

    const handleRemoveNode = () => {
      onNodesChange([{ type: "remove", id }]);
    };

    const nodeConfig = nodes.find((node) => node.label === config?.label);
    const IconComponent = nodeConfig ? Icons[nodeConfig.icon] : null;

    const handlesByFieldId = useMemo(
      () =>
        handles.reduce<Record<string, any>>((acc, handle) => {
          acc[handle.id] = handle;
          return acc;
        }, {}),
      [handles]
    );

    const dynamicHandlesElements = useMemo(
      () =>
        localData?.dynamicHandles?.map(
          (handle: NodeHandleConfig, index: number) => (
            <div key={`dynamic-${handle.id}-${index}`} className="mb-2">
              <Handle
                type={handle.type}
                position={handle.position}
                id={handle.id}
                style={{ top: `${index * 30}px`, ...handle.style }}
                className={`handle ${
                  isHandleConnected(handle.id) ? "connected" : ""
                }`}
              />
            </div>
          )
        ),
      [localData?.dynamicHandles, isHandleConnected]
    );

    const fieldHandleIds = useMemo(
      () =>
        new Set(
          config?.fields?.map((field) => field.handleId).filter(Boolean) || []
        ),
      [config?.fields]
    );

    const defaultHandles = useMemo(
      () => handles.filter((handle) => !fieldHandleIds.has(handle.id)),
      [handles, fieldHandleIds]
    );

    const defaultHandlesElements = useMemo(
      () =>
        defaultHandles.map((handle, index) => (
          <NodeHandle
            key={`remaining-${handle.id}-${index}`}
            handle={handle}
            isConnected={isHandleConnected(handle.id)}
            handleType="default"
          />
        )),
      [defaultHandles, isHandleConnected]
    );

    useEffect(() => {
      updateNodeInternals(id);
    }, [id, updateNodeInternals, previousHandles]);

    return (
      <div
        className={`bg-white border min-w-[180px] rounded-lg shadow-sm relative min-h-[100px] transition-all !important
      ${
        selected
          ? "!border-indigo-800 !shadow-lg !ring-2 !ring-indigo-300"
          : "!border-indigo-400 !shadow-md !ring-2 !ring-indigo-200"
      }`}
      >
        <div
          className={`flex items-center justify-between px-3 py-2 border-b transition-colors
        ${selected ? "!border-blue-200" : "!border-gray-100"}`}
        >
          <div className="flex items-center justify-center">
            {IconComponent && (
              <IconRenderer
                icon={IconComponent}
                className="w-4 h-4 text-gray-600 mr-2"
              />
            )}
            <span className="text-xs font-medium text-gray-700">
              {config?.label || type}
            </span>
          </div>
          <button
            onClick={handleRemoveNode}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Remove node"
          >
            <X size={12} />
          </button>
        </div>

        {dynamicHandlesElements}
        {defaultHandlesElements}

        <div className="p-3 space-y-3">
          {config?.fields?.map((field, index) => (
            <div
              key={`${field.name}-${index}`}
              className="flex flex-col gap-1 relative"
            >
              <label className="text-xs text-start text-gray-500">
                {field.name}
              </label>
              {field.handleId && handlesByFieldId[field.handleId] && (
                <NodeHandle
                  handle={handlesByFieldId[field.handleId]}
                  isConnected={isHandleConnected(
                    handlesByFieldId[field.handleId].id
                  )}
                  handleType="field"
                />
              )}
              {RenderField(
                field,
                localData[field.name] || field.initialValue || "",
                (value) => handleChange(field.name, value)
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

BaseNode.displayName = "BaseNode";
