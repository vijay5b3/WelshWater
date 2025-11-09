/** @jsx jsx */
/** @jsxFrag */
import { jsx } from 'jimu-core';
export interface BannerProps {
    className?: string;
    portalItemId: string;
    classification?: __esri.PortalItem['classification'];
    position: 'top' | 'bottom';
    needSticky?: boolean;
    onReady?: () => void;
}
export declare const ClassificationBanner: (props: BannerProps) => jsx.JSX.Element;
