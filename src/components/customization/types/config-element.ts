import { RefType } from "./ref";

export interface ConfigElement {
  _id: string;
  title: string;
  description?: string;
  refs: RefType[];
  isMultiSelection: boolean;
  isBase?: boolean;
}
