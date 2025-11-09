import { React } from 'jimu-core';
import { type StandardComponentProps } from 'jimu-ui';
export interface EditableInputProps extends StandardComponentProps {
    size?: 'lg' | 'sm' | 'default';
    'aria-label'?: string;
    placeholder?: string;
    label?: string;
    hideLabel?: boolean;
    value?: number;
    arrowOffset?: number;
    max?: number;
    onChange?: (value: any) => void;
}
interface State {
    value: string;
}
export declare class EditableInput extends React.PureComponent<EditableInputProps, State> {
    static defaultProps: Partial<EditableInputProps>;
    input: React.RefObject<HTMLInputElement>;
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: EditableInputProps): void;
    getOutValue(value: any): any;
    handleBlur: () => void;
    handleKeyup: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
    getArrowOffset(): number;
    handleKeyDown: (e: any) => void;
    changeValue(value: any): void;
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    render(): React.ReactElement;
}
export {};
