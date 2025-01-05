import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  MarkerType,
} from "reactflow";
import { X } from "lucide-react";
import { useStore } from "../../store";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) => {
  const onEdgesChange = useStore((state) => state.onEdgesChange);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleEdgeRemove = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onEdgesChange([{ id, type: "remove" }]);
  };

  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const angle = Math.atan2(dy, dx);

  const arrowLength = 10;
  const arrowWidth = 6;

  const arrowTip = {
    x: targetX,
    y: targetY,
  };

  const arrowLeft = {
    x: targetX - arrowLength * Math.cos(angle) + arrowWidth * Math.sin(angle),
    y: targetY - arrowLength * Math.sin(angle) - arrowWidth * Math.cos(angle),
  };

  const arrowRight = {
    x: targetX - arrowLength * Math.cos(angle) - arrowWidth * Math.sin(angle),
    y: targetY - arrowLength * Math.sin(angle) + arrowWidth * Math.cos(angle),
  };

  return (
    <>
      <BaseEdge path={edgePath} style={style} markerEnd={MarkerType.Arrow} />

      <path
        d={`M ${arrowTip.x} ${arrowTip.y} L ${arrowLeft.x} ${arrowLeft.y} L ${arrowRight.x} ${arrowRight.y} Z`}
        fill="#6366f1"
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            zIndex: 10,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button
            onClick={handleEdgeRemove}
            className="p-1 bg-white group  text-indigo-500 border border-indigo-500 rounded-full shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            style={{
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              lineHeight: "12px",
            }}
          >
            <X
              size={12}
              className="font-bold text-indigo-500 group-hover:text-white"
            />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
