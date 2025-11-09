/** @jsx jsx */
import { jsx, type DataSource } from 'jimu-core';
export interface EditArcadePopperProps {
    mainDataSource: DataSource;
    isOpen: boolean;
    toggle: () => void;
}
export declare function EditAcradePopup(props: EditArcadePopperProps): jsx.JSX.Element;
