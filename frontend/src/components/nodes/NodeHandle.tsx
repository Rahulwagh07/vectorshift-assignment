import React from "react";
import { Handle, Position } from "reactflow";
import { NodeHandleConfig } from "../../types/node";
import { CSSProperties } from "react";

interface NodeHandleProps {
  handle: NodeHandleConfig;
  isConnected: boolean;
  handleType: "field" | "dynamic" | "default";
  index?: number;
}

export const NodeHandle: React.FC<NodeHandleProps> = ({
  handle,
  isConnected,
  handleType,
  index,
}) => {
  const getHandleStyles = (index: number): CSSProperties => {
    const baseStyles: CSSProperties = {
      ...handle.style,
    };
    switch (handleType) {
      case "field":
        return {
          ...baseStyles,
          top: "70%",
          transform: "translateY(-50%)",
          ...(handle.position === Position.Left
            ? { left: "-20px" }
            : { right: "-20px" }),
        };
      case "dynamic":
        return {
          ...baseStyles,
          top: `${index * 30}px`,
          transform: "translateY(-50%)",
          ...(handle.position === Position.Left
            ? { left: "-7px" }
            : { right: "-7px" }),
        };
      default:
        return {
          ...baseStyles,
          top: handle.style?.top || "50%",
          transform: "translateY(-50%)",
          ...(handle.position === Position.Left
            ? { left: "-7px" }
            : { right: "-7px" }),
        };
    }
  };

  const getLabelStyles = (index: number): CSSProperties => {
    const baseStyles: CSSProperties = {
      ...handle.style,
    };

    switch (handleType) {
      case "field":
        return {
          ...baseStyles,
          top: "65%",
          ...(handle.position === Position.Left
            ? { left: "-55px", textAlign: "right" }
            : { right: "-55px", textAlign: "left" }),
        };
      case "dynamic":
        return {
          ...baseStyles,
          top: `${index * 30}px`,
          ...(handle.position === Position.Left
            ? { left: "-60px" }
            : { right: "-60px" }),
          transform: "translateY(-50%)",
        };
      default:
        return {
          ...baseStyles,
          top: "55%",
          transform: "translateY(-50%)",
          ...(handle.position === Position.Left
            ? { left: "-40px", textAlign: "right" }
            : { right: "-40px", textAlign: "left" }),
        };
    }
  };

  return (
    <React.Fragment>
      <Handle
        type={handle.type}
        position={handle.position}
        id={handle.id}
        className={`${isConnected ? "connected" : ""}`}
        style={getHandleStyles(index || 0)}
      />
      {handle.label && (
        <span
          className="absolute text-[10px] text-gray-400"
          style={getLabelStyles(index || 0)}
        >
          {handle.label}
        </span>
      )}
    </React.Fragment>
  );
};
