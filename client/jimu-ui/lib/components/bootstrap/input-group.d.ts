import { React } from 'jimu-core';
import type { InputGroupProps as RSInputGroupProps } from 'reactstrap';
export type InputGroupProps = Omit<RSInputGroupProps, 'size'>;
export declare const InputGroup: (props: InputGroupProps) => React.JSX.Element;
