/** @jsx jsx */
import { type PopperProps } from 'jimu-ui';
import { React, ReactRedux, type BrowserSizeMode, type IMThemeVariables, jsx } from 'jimu-core';
interface StateToPopperProps {
    pageId: string;
    sizemode: BrowserSizeMode;
    dispatch?: any;
}
declare class PageAwarePopper extends React.PureComponent<PopperProps & StateToPopperProps & {
    theme?: IMThemeVariables;
}> {
    componentDidUpdate(prevProps: PopperProps & StateToPopperProps): void;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): jsx.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof PageAwarePopper, {
    zIndex?: number;
    offset?: [number, number];
    theme?: IMThemeVariables;
    role?: React.AriaRole;
    children: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    open: boolean;
    key?: React.Key | null | undefined;
    version?: number;
    ref?: React.LegacyRef<PageAwarePopper>;
    toggle?: (evt?: React.MouseEvent<any> | React.TouchEvent<any> | React.KeyboardEvent<any>, reason?: import("jimu-ui").OverlayDismissReason) => any;
    avoidNestedToggle?: boolean;
    autoFocus?: boolean;
    className?: string;
    tabIndex?: number;
    'aria-modal'?: boolean;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    placement?: import("jimu-ui").Placement | import("jimu-ui").AutoPlacement;
    modifiers?: any[];
    shiftOptions?: boolean | {
        padding?: import("@floating-ui/utils").Padding;
        mainAxis?: boolean;
        crossAxis?: boolean;
        limiter?: {
            fn: (state: import("@floating-ui/core").MiddlewareState) => import("@floating-ui/utils").Coords;
            options?: any;
        };
        rootBoundary?: import("@floating-ui/core").RootBoundary;
        elementContext?: import("@floating-ui/core").ElementContext;
        altBoundary?: boolean;
        boundary?: import("@floating-ui/dom").Boundary;
    };
    offsetOptions?: import("jimu-ui").OffsetOptions | [number, number] | boolean;
    flipOptions?: boolean | {
        padding?: import("@floating-ui/utils").Padding;
        mainAxis?: boolean;
        crossAxis?: boolean;
        rootBoundary?: import("@floating-ui/core").RootBoundary;
        elementContext?: import("@floating-ui/core").ElementContext;
        altBoundary?: boolean;
        fallbackPlacements?: Array<import("jimu-ui").Placement>;
        fallbackStrategy?: "bestFit" | "initialPlacement";
        fallbackAxisSideDirection?: "none" | "start" | "end";
        flipAlignment?: boolean;
        boundary?: import("@floating-ui/dom").Boundary;
    };
    disablePortal?: boolean;
    reference: import("jimu-ui").TargetType;
    strategy?: import("jimu-ui").Strategy;
    arrowOptions?: import("jimu-ui").ArrowStyleOptions | boolean;
    openOverlayOnMount?: boolean;
    unstyled?: boolean;
    disableActivateOverlay?: boolean;
    disableOverlayManager?: boolean;
    autoUpdate?: boolean;
    inlineOptions?: import("@floating-ui/core").InlineOptions | boolean;
    hideOptions?: boolean | {
        padding?: import("@floating-ui/utils").Padding;
        strategy?: "referenceHidden" | "escaped";
        rootBoundary?: import("@floating-ui/core").RootBoundary;
        elementContext?: import("@floating-ui/core").ElementContext;
        altBoundary?: boolean;
        boundary?: import("@floating-ui/dom").Boundary;
    } | {
        padding?: import("@floating-ui/utils").Padding;
        strategy?: "referenceHidden" | "escaped";
        rootBoundary?: import("@floating-ui/core").RootBoundary;
        elementContext?: import("@floating-ui/core").ElementContext;
        altBoundary?: boolean;
        boundary?: import("@floating-ui/dom").Boundary;
    }[];
    autoPlacementOptions?: boolean | {
        padding?: import("@floating-ui/utils").Padding;
        alignment?: import("@floating-ui/utils").Alignment | null;
        crossAxis?: boolean;
        rootBoundary?: import("@floating-ui/core").RootBoundary;
        elementContext?: import("@floating-ui/core").ElementContext;
        altBoundary?: boolean;
        autoAlignment?: boolean;
        allowedPlacements?: Array<import("jimu-ui").Placement>;
        boundary?: import("@floating-ui/dom").Boundary;
    };
    sizeOptions?: boolean | {
        padding?: import("@floating-ui/utils").Padding;
        rootBoundary?: import("@floating-ui/core").RootBoundary;
        elementContext?: import("@floating-ui/core").ElementContext;
        altBoundary?: boolean;
        boundary?: import("@floating-ui/dom").Boundary;
        apply?: (args: import("@floating-ui/dom").MiddlewareState & {
            availableWidth: number;
            availableHeight: number;
        }) => void | Promise<void>;
    };
    middleware?: import("@floating-ui/dom").Middleware[];
    keepMount?: boolean;
    delayToggle?: number;
    showArrow?: boolean;
    arrowStyle?: import("jimu-ui").ArrowStyle;
    trapFocus?: boolean;
    forceLatestFocusElements?: boolean;
    referenceHiddenVisibility?: boolean;
    flipPlacement?: boolean;
    popperNodeRef?: React.Ref<HTMLDivElement>;
    listenContextPopperVersion?: boolean;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").UnknownAction>>;
    store?: import("redux").Store;
}>;
export default _default;
