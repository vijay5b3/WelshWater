import type { ArcadeScriptResult, IMArcadeContentConfig } from '../types/arcade-content';
import type { DuplicateContext } from '../types/common';
import type { IMWidgetJson } from '../types/app-config';
/**
 * There are two cases this method return true.
 * Case1: widgetId is the id of text/button. text/button is placed in list widget.
 * Case2: widgetId is list widget id.
 * @param widgetId
 * @returns
 */
export declare function doesWidgetHaveRepeatDataSource(widgetId: string): boolean;
/**
 * Make sure user can only add up to 10 Arcade expressions with $dataSources per page.
 */
export declare function canAddNewDataSourcesProfileArcadeContent(widgetId: string): boolean;
/**
 * Gets the number of Arcade contents remaining available for the widget.
 * If a positive number n is returned, it means that the widget can add n more Arcade contents.
 * If 0 or a negative number is returned, it means that the widget can not add Arcade contents.
 * If Infinity is returned, it means that the widget can add any Arcade contents.
 */
export declare function getWidgetRestAvailableArcadeContentCount(widgetId: string): number;
export declare function getCopiedArcadeContentConfig(contentMap: DuplicateContext, sourceWidgetJson: IMWidgetJson, arcadeContentConfig: IMArcadeContentConfig): IMArcadeContentConfig;
export declare function getCopiedArcadeContentScript(contentMap: DuplicateContext, sourceWidgetJson: IMWidgetJson, scriptContent: string): string;
export interface ArcadeScriptResultValidationResult {
    valid: boolean;
    invalidKeys: string[];
    validValue: ArcadeScriptResult;
}
export declare function validateArcadeScriptResult(arcadeScriptResult: ArcadeScriptResult, keepKeys?: string[]): ArcadeScriptResultValidationResult;
