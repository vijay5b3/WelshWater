/** @jsx jsx */
import { React, jsx, type ImmutableObject } from 'jimu-core';
import { JimuSymbolType } from 'jimu-ui/advanced/map';
import type { MeasurementsRuntimeInfo, MeasurementsUnitsInfo } from '../constraints';
export interface MeasurementsSettingProps {
    predefinedJimuSymbolType: JimuSymbolType;
    currentJimuSymbolType: JimuSymbolType;
    measurementsRuntimeInfo: ImmutableObject<MeasurementsRuntimeInfo>;
    measurementsUnitsInfos: MeasurementsUnitsInfo[];
    onMInfoSingletonChanged: (measurementsRuntimeInfo: ImmutableObject<MeasurementsRuntimeInfo>) => void;
}
export declare enum UnitsSettingMode {
    Coord = "coord",
    Linear = "linear",
    Areal = "areal",
    Perimeter = "perimeter"
}
export declare const SettingPanel: React.MemoExoticComponent<(props: (MeasurementsSettingProps)) => jsx.JSX.Element>;
