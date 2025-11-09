import { type IMState } from 'jimu-core';
export declare function getParentWidgetJson(layouts: {
    [key: string]: string;
}, state: IMState): import("seamless-immutable").ImmutableObject<import("jimu-core").WidgetJson>;
export declare function onExpandItemChange(layoutId: string, previousExpandedItems: string[], expandedItems: string[]): void;
