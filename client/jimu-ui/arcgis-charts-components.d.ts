import { ArcgisChart } from '@arcgis/charts-components-react';
export type HTMLArcgisChartElement = HTMLElementTagNameMap['arcgis-chart'];
export type ArcgisChartProps = React.ComponentProps<typeof ArcgisChart>;
export type ChartElementLimit = ArcgisChartProps['chartLimits'];
export type ActionModes = ArcgisChartProps['actionMode'];
export type SelectionData = ArcgisChartProps['selectionData'];
export interface SelectionCompletePayload {
    selectionData: SelectionData;
    model: any;
}
export { ArcgisChart };
export * from '@arcgis/charts-spec';
export type { NoRenderPropChangePayload, SelectionTheme, ArcgisChartCustomEvent, DataProcessCompletePayload, AxesMinMaxChangePayload, LoaderColors } from '@arcgis/charts-components';
