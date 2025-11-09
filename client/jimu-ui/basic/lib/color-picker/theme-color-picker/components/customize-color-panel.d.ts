import { React, type IMThemeVariables } from 'jimu-core';
import { type SketchProps } from '../../color-picker';
interface CustomizeColorPanelProps extends Omit<SketchProps, 'color'> {
    value?: string;
    onBack?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    specificTheme?: IMThemeVariables;
    onRecentChange?: () => void;
    disableAlpha?: boolean;
    backBtnRef?: React.Ref<HTMLButtonElement>;
}
export declare const CustomizeColorPanel: (props: CustomizeColorPanelProps) => React.ReactElement;
export {};
