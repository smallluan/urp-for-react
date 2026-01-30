import { Pagination } from "../Pagination/type"

export interface ColType {
  key: string;  // 列唯一标识
  type: string;  // 该列的组件类型
  props?: Record<string, any>;  // 该列组件的通用属性（透传至对应的组件）
  title?: string;  // 列标题
  white?: string | number;
}

export interface FieldValue {
  value: any,
  props: Record<string, any>;
  render: React.ReactNode;
}

export interface DataItem {
  id: number;
  [key: string]: FieldValue;
}

export type DataType = DataItem[];

export interface OnChangeEmit {
  changed: {
    index: {
      rowIndex: number,
      colIndex: number
    }
    value: {
      oldValue: any,
      newValue: any
    }
  },
  value: DataType[]
}

export interface TableType {
  className?: string;
  style?: React.CSSProperties;
  data?: DataType;
  columns?: ColType[];
  bordered?: boolean;
  stripe?: boolean;
  hover?: boolean;
  showHeader?: boolean;
  showIndex?: boolean;
  pagination?: Pagination | undefined;
  status?: 'editable' | 'readOnly' | 'disabled';
  onChange?: (params:OnChangeEmit) => void;
}
