import { React } from 'jimu-core';
import { type BrandFunctionColors, type SchemeColor } from 'jimu-theme';
import type { StandardComponentProps } from 'jimu-ui/lib/components/types';
interface SchemeColorStripProps extends StandardComponentProps {
    value?: string;
    colors: SchemeColor;
    'aria-label'?: string;
    name: BrandFunctionColors;
    onChange?: (value: string) => void;
}
export declare const SchemeColorStrip: (props: SchemeColorStripProps) => React.JSX.Element;
export {};
