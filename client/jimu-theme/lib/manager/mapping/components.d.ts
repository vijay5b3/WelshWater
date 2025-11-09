import type { ThemeButton, ThemeVariables } from 'jimu-core';
import type { ThemeStylesOptions, ThemeCompOptions } from '../../system';
import type { MixedThemeStylesOptions } from '../theme-module';
export declare const getMappedComponentStyles: (styles: MixedThemeStylesOptions) => ThemeStylesOptions;
export declare const getMappedComponents: (classicTheme: ThemeVariables, inputStyles: MixedThemeStylesOptions, sharedThemeButtonVars?: ThemeButton) => ThemeCompOptions;
