import { Position } from 'reactflow';

export interface NodeFieldBase {
  name: string;
  type: string;
  handleId?: string;
  placeholder?: string;
  initialValue?: string | string[];
  icon?: string;
  text?: string;
  variant?: 'primary' | 'secondary';
}

export interface NodeFieldSelect extends NodeFieldBase {
  type: 'select';
  options: string[];
  initialValue?: string;
}

export interface NodeFieldMultiSelect extends NodeFieldBase {
  type: 'multiSelect';
  options: string[];
  initialValue?: string[];
}

export interface NodeFieldCodeEditor extends NodeFieldBase {
  type: 'codeEditor';
  language?: string;
}

export interface NodeFieldButton extends NodeFieldBase {
  type: 'button';
  icon?: string;
  text?: string;
  variant?: 'primary' | 'secondary';
}

export interface NodeFieldRadio extends NodeFieldBase {
  type: 'radio';
  options: string[];
}

export type NodeFieldType = 
  | NodeFieldSelect 
  | NodeFieldMultiSelect 
  | NodeFieldCodeEditor 
  | NodeFieldButton 
  | NodeFieldRadio
  | NodeFieldBase;

export interface NodeHandleConfig {
  id: string;
  type: 'source' | 'target';
  position: Position;
  label: string;
  style?: React.CSSProperties;
}

export type NodeType = "text" | "input" | "output" | "llm" | "integration";

export interface NodeConfig {
  label: string;
  fields: NodeFieldType[];
  handles: NodeHandleConfig[];
  type: NodeType;
}

export interface NodeProps {
  id: string;
  data: Record<string, any>;
  type: string;
  config?: {
    label: string;
    fields: NodeFieldType[];
    handles: NodeHandleConfig[];
  };
  handles: NodeHandleConfig[];
  selected?: boolean;
}