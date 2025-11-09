import { React } from 'jimu-core';
import { type ReferencePaletteColors, type ReferencePaletteColor } from 'jimu-theme';
import type { StandardComponentProps } from 'jimu-ui';
interface PaletteColorStripProps extends StandardComponentProps {
    value?: string;
    colors: ReferencePaletteColor;
    'aria-label'?: string;
    size?: 'default' | 'sm';
    name: ReferencePaletteColors;
    onChange?: (value: string) => void;
}
export declare const PaletteColorStrip: (props: PaletteColorStripProps) => React.JSX.Element;
export {};
