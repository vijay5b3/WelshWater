/** @jsx jsx */
import { jsx, React, ReactRedux, type IMThemeVariables, type Size, AppMode, ImageDisplayQualityMode } from 'jimu-core';
/**
 * The ImageWithParam component props.
 */
export interface ImageWithParamProps extends Pick<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> {
    /**
     * The imageParam property contains the original url.
     */
    imageParam: ImageParam;
    /**
     * The toolTip of image
     */
    toolTip?: string;
    /**
     * The altText of image
     */
    altText?: string;
    /**
     * If `true`, useFadein
     */
    useFadein?: boolean;
    /** @ignore */
    theme?: IMThemeVariables;
    /** @ignore */
    size?: Size;
    /**
     * The fill mode for image.
     */
    imageFillMode?: ImageFillMode;
    /** @ignore */
    isAutoHeight?: boolean;
    /** @ignore */
    isAutoWidth?: boolean;
    /** @ignore */
    children?: any;
    imageDisplayQualityMode?: ImageDisplayQualityMode;
    /** @ignore */
    className?: string;
}
/**
 * The fill mode for image.
 */
export declare enum ImageFillMode {
    Fit = "FIT",
    Fill = "FILL"
}
/** @ignore */
export declare enum ImgSourceType {
    ByURL = "BY_URL",
    ByUpload = "BY_UPLOAD"
}
/**
 * The info for ImageParam.
 */
export interface ImageParam {
    /**
     * The url for image.
     * If the image comes from a image selector or the app resource manager, the URL has two formats:
     * 1. When an image is newly uploaded in the builder, the URL is in blob format, e.g., 'blob:https://......'.
     * 2. After saving the app, the URL is in the format: '${appResourceUrl}/images/widget_1/1641535897496.png'.
     *
     * The second format (${appResourceUrl}) can be converted to the final URL format, such as:
     * 'https://www.arcgis.com/sharing/rest/content/items/787381a21f7/resources/images/widget_1/1641535897496.png?token=...'
     * using `appConfigUtils.processResourceUrl`.
     *
     * Note:
     * - For `ImageWithParam` components, the URL is already converted, so no additional conversion is needed.
     * - For `<img>` tags or CSS `url()` properties, you must manually convert the URL using `appConfigUtils.processResourceUrl`.
     */
    url?: string;
    /** @ignore */
    originalId?: string;
    /** @ignore */
    originalUrl?: string;
    /**
     * The resource fileName for image, if it is stored as a resource.
     */
    fileName?: string;
    /**
     * The original fileName for image
     */
    originalName?: string;
    /**
     * The file format for image
     */
    fileFormat?: string;
    /** @ignore */
    imgSourceType?: ImgSourceType;
    /** @ignore */
    cropParam?: CropParam;
    /** The image original width that is from HTMLImageElement.naturalWidth. */
    originalWidth?: number;
    /** The image original height that is from HTMLImageElement.naturalHeight. */
    originalHeight?: number;
}
declare enum ImgLoadState {
    Loading = "LOADING",
    LoadOk = "LOADOK",
    LoadError = "LOADERROR"
}
interface States {
    picLoadResult: ImgLoadState;
    imageWidth?: number;
    imageHeight?: number;
    widgetWidth?: number;
    widgetHeight?: number;
    imageSrc: string;
    isRefresh: boolean;
}
/** @ignore */
export declare enum CropType {
    Real = "REAL",
    Fake = "FAKE"
}
/** @ignore */
export interface CropPosition {
    x: number;
    y: number;
}
interface CropPixel {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
/** @ignore */
export interface CropParam {
    cropPosition?: CropPosition;
    cropZoom?: number;
    svgViewBox?: string;
    svgPath?: string;
    cropShape?: string;
    cropPixel?: CropPixel;
    cropType?: CropType;
}
interface ExtraProps {
    appPath: string;
    queryObject: any;
    appMode: AppMode;
}
/** @ignore */
export declare class _ImageWithParam extends React.PureComponent<ImageWithParamProps & ExtraProps, States> {
    __unmount: boolean;
    imageParam: ImageParam;
    imageObject: HTMLImageElement;
    rootRef: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    getStyle(): import("jimu-core").SerializedStyles;
    getImageStyle(): import("jimu-core").SerializedStyles;
    static defaultProps: {
        imageParam: {};
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    getAdaptiveUrlFromImageParam: (imageParam: ImageParam) => string;
    preLoadCommonImage: (imageParam: ImageParam, mode: ImageDisplayQualityMode) => Promise<void>;
    preLoadImage: (imageParam: ImageParam, mode: ImageDisplayQualityMode) => Promise<void>;
    cancelPreLoadImage: () => void;
    getSnapshotBeforeUpdate(prevProps: ImageWithParamProps): boolean;
    componentDidUpdate(prevProps: ImageWithParamProps & ExtraProps, prevState: States, snapshot: any): void;
    standardUrl: (url: string) => string;
    onResize: ({ width, height }: {
        width: any;
        height: any;
    }) => void;
    getWidgetWidth: () => number;
    getWidgetHeight: () => number;
    parseImageSrc: (imageParam: ImageParam, mode?: ImageDisplayQualityMode) => Promise<string | null>;
    handleLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
    render(): jsx.JSX.Element;
}
/**
 * The ImageWithParam component is used to visualize the image, it provides fill mode.
 * It can be used at runtime or in the setting page.
 * It can cooperate with ImageSelector component(jimu-ui/advanced/resource-selector).
 */
export declare const ImageWithParam: ReactRedux.ConnectedComponent<React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & {
    theme?: IMThemeVariables;
}>, {
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
    imageParam: ImageParam;
    toolTip?: string;
    altText?: string;
    useFadein?: boolean;
    theme?: IMThemeVariables;
    size?: Size;
    imageFillMode?: ImageFillMode;
    isAutoHeight?: boolean;
    isAutoWidth?: boolean;
    children?: any;
    imageDisplayQualityMode?: ImageDisplayQualityMode;
    className?: string;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").UnknownAction>>;
    store?: import("redux").Store;
}>;
export {};
