/** @jsx jsx */
import { React, ReactRedux, jsx, type ImmutableArray, type ActionSettingProps, MessageType, type UseDataSource } from 'jimu-core';
interface Config {
    sectionId: string;
    viewId: string;
    useDataSources?: UseDataSource[];
}
interface StateExtraProps {
    views: ImmutableArray<string>;
}
interface State {
    useCustomData: boolean;
}
declare class _ChangeViewActionSetting extends React.PureComponent<ActionSettingProps<Config> & StateExtraProps, State> {
    constructor(props: any);
    handleViewChange: (_evt: any, viewId: string) => void;
    handleDataChange: (useDataSources: UseDataSource[]) => void;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof _ChangeViewActionSetting, {
    config?: Config;
    widgetId?: string;
    sectionId?: string;
    key?: React.Key | null | undefined;
    useDataSources?: UseDataSource[];
    ref?: React.LegacyRef<_ChangeViewActionSetting>;
    intl?: import("jimu-core").IntlShape;
    messageWidgetId: string;
    messageType: MessageType;
    onSettingChange: import("jimu-core").ActionSettingChangeFunction;
    actionId: string;
    onDisableDoneBtn?: (isDisable: boolean) => void;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").UnknownAction>>;
    store?: import("redux").Store;
}>;
export default _default;
