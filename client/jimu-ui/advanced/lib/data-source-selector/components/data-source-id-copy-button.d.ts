/** @jsx jsx */
import { React, type IntlShape, jsx } from 'jimu-core';
interface State {
    isTooltipOpen: boolean;
}
export declare class DataSourceIdCopyButton extends React.PureComponent<{
    dataSourceId: string;
    intl: IntlShape;
}, State> {
    renameInput: HTMLInputElement;
    constructor(props: any);
    copyDataId: (e: any) => Promise<void>;
    render(): jsx.JSX.Element;
}
export {};
