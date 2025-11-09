import type { SharedThemeElementsVariables } from 'jimu-core';
import type { ColorScheme } from '../color-scheme';
export interface HeaderVars {
    color?: string;
    bg?: string;
}
export type FooterVars = HeaderVars;
export interface ThemeMixin {
    sharedTheme?: SharedThemeElementsVariables;
    header?: HeaderVars;
    footer?: FooterVars;
}
export interface ThemeMixinOptions extends Omit<ThemeMixin, 'sharedTheme'> {
}
export declare const createMixin: (options: ThemeMixinOptions, inputMixin: ThemeMixin, color: ColorScheme) => ThemeMixin;
