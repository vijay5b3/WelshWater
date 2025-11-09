import { React } from 'jimu-core';
import type { TableProps as RSTableProps } from 'reactstrap';
export type TableProps = Omit<RSTableProps, 'striped' | 'dark' | 'borderless'>;
export declare const Table: (props: TableProps) => React.JSX.Element;
