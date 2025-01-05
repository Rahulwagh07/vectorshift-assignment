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

export enum NodeField {
  Select = "select",
  MultiSelect = "multiSelect",
  TextEditor = "textEditor",
  Button = "button",
  Radio = "radio",
  Base = "base",
  Text = "text",
  TextArea = "textArea"
}

export type NodeFieldType = NodeFieldBase | NodeFieldSelect | NodeFieldMultiSelect | NodeFieldButton | NodeFieldRadio;

export interface NodeHandleConfig {
  id: string;
  type: 'source' | 'target';
  position: Position;
  label: string;
  style?: React.CSSProperties;
}


export enum NodeType {
  Text = "text",
  Input = "input",
  Output = "output",
  Llm = "llm",
  Integration = "integration"
}

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