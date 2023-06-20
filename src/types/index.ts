export interface IPortfolio {
  info: IInfo;
  contact: IContact;
  filters: IFilter[];
  projects: IProject[];
}

export interface IInfo {
  title: string;
  headline: string;
}

export interface IContact {
  linkedIn?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
}

export interface IFilter {
  name: string;
  title: string;
}

export interface IProject {
  title: string;
  platform: string;
  filter: string | string[];
  images: string[];
  description?: string | undefined;
  stack: string[];
  live?: boolean | undefined;
  demo?: string | undefined;
  source?: string | boolean | undefined;
  secure?: boolean | undefined;
  coverFocus?: string | undefined;
}

export interface IAppContext {
  popupContent: IProject | undefined;
  setPopupContent: Function;
  portfolio?: IPortfolio | undefined;
  setPortfolio?: Function;
  selectedFilter?: string | undefined;
  setSelectedFilter: Function;
}
