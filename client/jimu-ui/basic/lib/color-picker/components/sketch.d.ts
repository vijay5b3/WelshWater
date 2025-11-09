import { React } from 'jimu-core';
import { type ColorResult, type ExportedColorProps, type InjectedColorProps } from './core';
import type { StandardComponentProps } from 'jimu-ui/lib/components/types';
export interface SketchProps extends StandardComponentProps, ExportedColorProps, InjectedColorProps {
    hsv?: any;
    oldHue?: any;
    disableAlpha?: boolean;
    onChange?: (color: ColorResult) => void;
}
export declare const Sketch: React.ComponentClass<SketchProps & ExportedColorProps, any>;
