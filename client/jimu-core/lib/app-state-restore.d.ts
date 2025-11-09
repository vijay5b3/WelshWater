/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/react';
import type { IMThemeVariables } from './types/theme';
interface AppStateRestoreProps {
    theme: IMThemeVariables;
}
export declare const AppStateRestore: React.MemoExoticComponent<(props: AppStateRestoreProps) => jsx.JSX.Element>;
export {};
