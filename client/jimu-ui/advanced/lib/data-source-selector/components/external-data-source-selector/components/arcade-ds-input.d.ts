/** @jsx jsx */
import { jsx } from 'jimu-core';
import { type ArcadeDataSourceResult } from 'jimu-data-source';
interface ArcadeDataSourceInputProps {
    script?: string;
    onAddDataSource: (name: string, script: string, result: ArcadeDataSourceResult) => void;
}
export declare function ArcadeDataSourceInput(props: ArcadeDataSourceInputProps): jsx.JSX.Element;
export {};
