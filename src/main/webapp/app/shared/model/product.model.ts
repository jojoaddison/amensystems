import { Moment } from 'moment';

export interface IProduct {
  id?: string;
  name?: string;
  quantity?: string;
  price?: number;
  photoContentType?: string;
  photo?: any;
  category?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
}

export class Product implements IProduct {
  constructor(
    public id?: string,
    public name?: string,
    public quantity?: string,
    public price?: number,
    public photoContentType?: string,
    public photo?: any,
    public category?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public lastModifiedBy?: string
  ) {}
}
