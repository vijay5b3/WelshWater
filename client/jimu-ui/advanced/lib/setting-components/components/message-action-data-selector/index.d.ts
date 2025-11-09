import { React, type MessageType } from 'jimu-core';
import { type DataSourceSelectorProps } from 'jimu-ui/advanced/data-source-selector';
interface MessageActionDataSelectorProps extends Omit<DataSourceSelectorProps, 'fromRootDsIds' | 'fromDsIds'> {
    messageWidgetId: string;
    messageType: MessageType;
    clearInvalid?: boolean;
    defaultSelectAll?: boolean;
}
export declare const MessageActionDataSelector: React.MemoExoticComponent<(props: MessageActionDataSelectorProps) => React.JSX.Element>;
export {};
