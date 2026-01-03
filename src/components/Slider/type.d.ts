import { Tooltip } from "../Tooltip/type"

export interface Slider {
  className?: string;
  style?: React.CSSProperties;
  layout?: 'horizontal' | 'vertical';
  max?: number;
  min?: number;
  value?: number;
  defaultValue?: number;
  tooltipProps?: Tooltip;
  step?: number;
  range?: boolean;
  onChange?: (value: number) => void;
  onComplete?: (value: number) => void;
}
