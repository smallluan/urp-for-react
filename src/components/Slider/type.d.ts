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
  showLabel?: boolean;
  onChange?: (endValue: number, startValue?: number) => void;
  onComplete?: (endValue: number, startValue?: number) => void;
}

export interface SliderButton {
  isDragging: boolean;
  value: number;
  min: number;
  max: number;
  showLabel?: boolean;
}
