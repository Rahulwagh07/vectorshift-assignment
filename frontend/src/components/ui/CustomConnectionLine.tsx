import { ConnectionLineComponentProps } from 'reactflow';

const CustomConnectionLine = ({
  fromX,
  fromY,
  toX,
  toY,
}: ConnectionLineComponentProps) => {
  return (
    <g>
      <path
        fill="none"
        stroke="#3b82f6"
        strokeWidth={2}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#3b82f6"
        r={3}
        stroke="#2563eb"
        strokeWidth={1.5}
      />
    </g>
  );
};

export default CustomConnectionLine;