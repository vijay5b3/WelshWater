/** @jsx jsx */
import { jsx, type ImmutableArray } from 'jimu-core';
import { type SearchDataConfig } from '../type/type';
interface SearchOptionsProps {
    datasourceConfig: ImmutableArray<SearchDataConfig>;
    dsStatusChange: (dsId: string, isDsCreateSuccess?: boolean) => void;
}
declare const CreateDataSource: (props: SearchOptionsProps) => jsx.JSX.Element;
export default CreateDataSource;
