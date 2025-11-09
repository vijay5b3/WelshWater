/** @jsx jsx */
import { React, jsx, type IMHeaderJson } from 'jimu-core';
import type * as PortalComponentsTypes from 'jimu-ui/advanced/portal-components';
export declare function ClassificationBannerWrapper(props: Omit<PortalComponentsTypes.BannerProps, 'portalItemId'> & {
    showClassification: boolean;
}): jsx.JSX.Element;
interface Props {
    headerJson: IMHeaderJson;
    showClassification: boolean;
    classification?: __esri.PortalItem['classification'];
    children?: React.ReactNode;
}
export declare function PageHeaderWrapper(props: Props): string | number | boolean | Iterable<React.ReactNode> | jsx.JSX.Element;
export {};
