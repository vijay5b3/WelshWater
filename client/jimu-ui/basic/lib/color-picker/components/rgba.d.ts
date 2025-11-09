import { React } from 'jimu-core';
import { type InjectedColorProps } from './core';
import type { StandardComponentProps } from 'jimu-ui';
export interface RgbaProps extends StandardComponentProps, InjectedColorProps {
    size?: 'lg' | 'sm' | 'default';
    disableAlpha?: boolean;
}
export declare class Rgba extends React.PureComponent<RgbaProps> {
    handleChange: (data: any) => void;
    render(): React.JSX.Element;
}
