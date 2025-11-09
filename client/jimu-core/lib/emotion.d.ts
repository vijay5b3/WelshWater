import { withTheme as _withTheme, jsx, css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
/**
 * @deprecated
 * `ThemeContext` was transferred to `jimu-theme`.
 */
declare const ThemeContext: import("react").Context<import("@emotion/react").Theme>;
/**
 * @deprecated
 * `ThemeProvider` was transferred to `jimu-theme`.
 */
declare const ThemeProvider: (props: import("@emotion/react").ThemeProviderProps) => React.JSX.Element;
/**
 * @deprecated
 * `useTheme` was transferred to `jimu-theme`.
 */
declare const useTheme: () => import("@emotion/react").Theme;
/**
 * @deprecated
 * `withTheme` was transferred to `jimu-theme`.
 */
declare const withTheme: typeof _withTheme;
/**
 * @deprecated
 * `styled` was transferred to `jimu-theme`.
 */
declare const styled: import("@emotion/styled").CreateStyled;
/**
 * @deprecated
 * `CacheProvider` was transferred to `jimu-theme`.
 */
declare const CacheProvider: import("react").Provider<import("@emotion/react").EmotionCache>;
/**
 * @deprecated
 * `Global` was transferred to `jimu-theme`.
 */
declare const Global: import("react").FC<import("@emotion/react").GlobalProps & import("react").RefAttributes<any>> | import("react").ForwardRefExoticComponent<import("@emotion/react").GlobalProps & import("react").RefAttributes<any>>;
/**
 * @deprecated
 * `createEmotionCache` was transferred to `jimu-theme`.
 */
declare const createEmotionCache: (options: import("@emotion/cache").Options) => import("@emotion/react").EmotionCache;
export { ThemeProvider, ThemeContext, CacheProvider, useTheme, withTheme, styled, createEmotionCache, jsx, css, Global };
export type { SerializedStyles };
