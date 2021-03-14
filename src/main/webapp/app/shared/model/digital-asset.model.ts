import { Moment } from 'moment';

export interface IDigitalAsset {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  resourceContentType?: string;
  resource?: any;
  type?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  createdBy?: string;
  lastModifiedBy?: string;
}

export class DigitalAsset implements IDigitalAsset {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public url?: string,
    public resourceContentType?: string,
    public resource?: any,
    public type?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public createdBy?: string,
    public lastModifiedBy?: string
  ) {}
}
