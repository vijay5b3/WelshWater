import { React, type ImmutableObject } from 'jimu-core';
import type { WebChart, ArcgisChartProps } from 'arcgis-charts-components';
import { type UnprivilegedChart } from './utils';
export interface ChartProps extends Omit<ArcgisChartProps, 'model'> {
    /**
     * Defines the class names added to the component.
     */
    className?: string;
    /**
     * ArcGIS Chart Specification that defines the chart component
     */
    config?: WebChart | ImmutableObject<WebChart>;
}
export declare const Chart: React.MemoExoticComponent<React.ForwardRefExoticComponent<Omit<ChartProps, "ref"> & React.RefAttributes<UnprivilegedChart>>>;
export * from './utils';
export * from 'arcgis-charts-components';
