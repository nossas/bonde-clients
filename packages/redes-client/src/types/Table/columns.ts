export interface Columns {
  accessor?: string
  Header: any;
  Cell?: (arg0: any) => string | JSX.Element | null;
  width?: number;
  className?: string;
  bold?: boolean;
  show?: boolean;
  Column?: any;
  columns?: Array<any>
}

export type valueString = {
  value: string;
  row?: any;
};

export type valueFirstName = {
  value: {
    firstName: string;
    lastName?: string;
    id?: number;
  };
};

export type valueAndRow = {
  value: string;
  row: {
    original: {
      id: number;
    };
  };
};
