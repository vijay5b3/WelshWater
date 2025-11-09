import { React } from 'jimu-core';
import type { ColorItem } from './core';
import type { StandardComponentProps } from 'jimu-ui';
export interface ColorStripProps extends StandardComponentProps {
    role?: React.AriaRole;
    'aria-label'?: string;
    color?: string;
    colors?: ColorItem[];
    fill?: boolean;
    size?: 'default' | 'sm';
    shape?: 'circular' | 'square';
    onChange?: (value: string) => void;
}
export declare const PRESET_COLORS: {
    label: string;
    value: string;
    color: string;
}[];
export declare const ColorStrip: (props: ColorStripProps) => React.JSX.Element;
