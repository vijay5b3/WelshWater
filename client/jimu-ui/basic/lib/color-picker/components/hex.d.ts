import { React } from 'jimu-core';
import { type EditableInputProps } from './editable-input';
import { type InjectedColorProps } from './core';
export interface HexProps extends EditableInputProps, Omit<InjectedColorProps, 'onChange'> {
    size?: 'lg' | 'sm' | 'default';
}
export declare class Hex extends React.PureComponent<HexProps> {
    handleChange: (data: any) => void;
    render(): React.JSX.Element;
}
