import { React } from 'jimu-core';
import { type ColorResult, type ExportedColorProps } from './core';
import type { StandardComponentProps } from 'jimu-ui/lib/components/types';
export interface ColorSketchProps extends StandardComponentProps {
    color?: string;
    disableAlpha?: boolean;
    onChange?: (color: ColorResult) => void;
}
export declare const CompactColorSketch: React.ComponentClass<ColorSketchProps & ExportedColorProps, any>;
