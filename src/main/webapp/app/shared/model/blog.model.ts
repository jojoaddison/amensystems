import { Moment } from 'moment';

export interface IBlog {
  id?: string;
  title?: string;
  content?: any;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  modifiedBy?: string;
  albumId?: string;
}

export class Blog implements IBlog {
  constructor(
    public id?: string,
    public title?: string,
    public content?: any,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public modifiedBy?: string,
    public albumId?: string
  ) {}
}
