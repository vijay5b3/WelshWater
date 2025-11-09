/** @jsx jsx */
import * as React from 'react';
import type { IntlShape } from 'react-intl';
import { jsx } from '@emotion/react';
import type { IMThemeVariables } from './types/theme';
interface BottomRightBannersProps {
    theme: IMThemeVariables;
    intl: IntlShape;
    noPermissionResourceChangedFlag: string;
}
export declare const BottomRightBanners: React.MemoExoticComponent<(props: BottomRightBannersProps) => jsx.JSX.Element>;
export {};
