import type { Theme } from '../create-theme';
import type { ComponentsVarsOverridesJson, ComponentsStyleOverrides, ComponentsOverrides, ComponentOverridesRules } from './overrides';
import type { ComponentNameToPartKey } from './parts';
import type { ComponentsStyleStateList } from './style-states';
import type { ComponentsVarsList } from './vars';
export interface ThemeComponents<T = Theme> extends ComponentsOverrides<T> {
}
export type { ComponentNameToPartKey, ComponentsVarsList, ComponentsStyleStateList, ComponentOverridesRules };
export interface ThemeCompOptions extends ThemeComponents {
}
export interface ThemeVariableCompOptions extends ComponentsVarsOverridesJson {
}
export type ThemeStylesOptions<T = Theme> = ComponentsStyleOverrides<T>;
export type * from './overrides';
