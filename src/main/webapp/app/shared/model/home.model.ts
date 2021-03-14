import { Moment } from 'moment';
import { StateType } from 'app/shared/model/enumerations/state-type.model';

export interface IHome {
  id?: string;
  slides?: string;
  advert?: string;
  category?: string;
  state?: StateType;
  version?: number;
  createdBy?: string;
  createdDate?: Moment;
  modifiedBy?: string;
  modifiedDate?: Moment;
}

export class Home implements IHome {
  constructor(
    public id?: string,
    public slides?: string,
    public advert?: string,
    public category?: string,
    public state?: StateType,
    public version?: number,
    public createdBy?: string,
    public createdDate?: Moment,
    public modifiedBy?: string,
    public modifiedDate?: Moment
  ) {}
}
