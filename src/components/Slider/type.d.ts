import { Tooltip } from "../Tooltip/type"

type SliderMark = {
  value: number;
  label: React.ReactNode;
}

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
  marks?: Array<SliderMark>;
  onChange?: (value: number) => void;
  onComplete?: (value: number) => void;
}

export interface SliderButton {
  isDragging: boolean;
  value: number;
  min: number;
  max: number;
}
