import { React } from 'jimu-core';
import type { ListGroupProps as RSListGroupProps } from 'reactstrap';
export type ListGroupProps = Omit<RSListGroupProps, 'flush'>;
export declare const ListGroup: (props: ListGroupProps) => React.JSX.Element;
