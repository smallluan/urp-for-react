export type TreeOriginalNode = {
  label: string;
  key: string;
  value?: string | number;
  children: Array<TreeOriginalNode>;
}

export type TreeFlattenedNode = {
  key: string;
  label: string;
  value?: string | number;
  level: number;
  hasChildren: boolean;
  parentNode: null | TreeFlattenedNode;
  children: TreeOriginalNode[],
  isOpen: boolean,
  isFirstChild: boolean,
  selected: boolean,
  active: boolean
}

export interface Tree {
  data?: Array<TreeOriginalNode>;
  activable?: boolean;
  actived?: Array<TreeOriginalNode['key']>;
  activeMultiple?: boolean;
  checkable?: boolean;
  value?: Array<TreeOriginalNode['key']>;
  defaultValue: Array<TreeOriginalNode['key']>;
  expandOnClickNode?: boolean;
  expandAll?: boolean;
  expandLevel: number;
  onActive?: (nodes: TreeFlattenedNode[]) => void;
}
