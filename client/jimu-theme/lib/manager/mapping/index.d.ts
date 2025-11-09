import { type IMThemeVariables, type ImmutableObject, type ThemeVariables, type IMSharedThemeVariables, type ThemeButton } from 'jimu-core';
import type { MixedRawThemeOptions, StyleFunctions, ThemeModule } from '../theme-module';
import { type ThemeOptions } from '../../system';
import { type ShadeOptions } from './color';
import * as utils from './utils';
import * as palette from './palette';
import * as typeface from './typeface';
import * as color from './color';
import * as typography from './typography';
import * as shadow from './shadow';
import * as shape from './shape';
import * as spacing from './spacing';
import * as components from './components';
export declare const createShadeOptions: (uri: string, isDark?: boolean) => ImmutableObject<ShadeOptions>;
/**
 * Create a mapped new theme options based on the classic theme.
 */
export declare const createMappedThemeOption: (classicTheme: ThemeVariables, compStyles: StyleFunctions, shadeOptions: ShadeOptions, sharedThemeButtonVars?: ThemeButton) => ThemeOptions;
/**
 * Check whether the input uri is a new theme.
 * Note: It can be used in builder and only valid for the app themes.
 */
export declare const whetherIsNewTheme: (module: ThemeModule) => boolean;
/**
 * Create mixed theme variables compatible with classic theme and new theme.
 */
export declare const createMixedTheme: (module?: ThemeModule, inputThemeOptions?: ImmutableObject<MixedRawThemeOptions>, sharedThemeVariables?: IMSharedThemeVariables) => IMThemeVariables;
export { palette, typeface, color, typography, shadow, shape, spacing, components, utils };
export type { ShadeOptions } from './color';
export { TypographyVariantsMap } from './typography';
