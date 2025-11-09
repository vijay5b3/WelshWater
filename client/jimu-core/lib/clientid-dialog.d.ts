import { jsx } from '@emotion/react';
import { type IntlShape } from 'react-intl';
import type { IMThemeVariables } from './types/theme';
import type { PortalNeedToRegisterClientId } from './types/state';
export interface ClientIdDialogProps {
    intl: IntlShape;
    theme: IMThemeVariables;
    portalInfo: PortalNeedToRegisterClientId;
}
export declare function ClientIdDialog(props: ClientIdDialogProps): jsx.JSX.Element;
