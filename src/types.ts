export interface Country {
  id: string;
  code: string;
  name: string;
  nameUn: string;
  continent: string;
  hasStates: boolean;
  align?: 'right';
  minWidth?: 170;
}

export type ColumnToCountryMap = {
  id: string;
  name: string;
  code: string;
  nameUn: string;
  continent: string;
  hasStates: boolean;
};

export interface Column {
  id:
    | 'id'
    | 'name'
    | 'code'
    | 'population'
    | 'size'
    | 'density'
    | 'nameUn'
    | 'continent'
    | 'hasStates';
  label: string;
  minWidth?: number;
  align?: 'right';
}
