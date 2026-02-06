export type TreeOriginalNode = {
  label: React.ReactNode;
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
  childrenRank: number,  // 是它付元素的第几个元素
  selected: boolean,
  active: boolean
}

export interface Tree {
  data?: Array<TreeOriginalNode>;
  activable?: boolean;
  actived?: Array<TreeOriginalNode['key']>;
  defaultActived?: Array<TreeOriginalNode['key']>;
  activeMultiple?: boolean;
  checkable?: boolean;
  value?: Array<TreeOriginalNode['key']>;
  defaultValue?: Array<TreeOriginalNode['key']>;
  expandOnClickNode?: boolean;
  expandAll?: boolean;
  expandLevel?: number;
  onActive?: (nodes: TreeFlattenedNode[]) => void;
  onClickNode?: (node: TreeFlattenedNode) => void;
}
