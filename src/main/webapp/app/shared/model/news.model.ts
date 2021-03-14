import { Moment } from 'moment';

export interface INews {
  id?: string;
  title?: string;
  content?: string;
  slides?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
}

export class News implements INews {
  constructor(
    public id?: string,
    public title?: string,
    public content?: string,
    public slides?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public lastModifiedBy?: string
  ) {}
}
