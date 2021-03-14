import { Moment } from 'moment';

export interface ISlideShow {
  id?: string;
  name?: string;
  slides?: string;
  createdDate?: Moment;
  modifiedDate?: Moment;
  lastModifiedBy?: string;
}

export class SlideShow implements ISlideShow {
  constructor(
    public id?: string,
    public name?: string,
    public slides?: string,
    public createdDate?: Moment,
    public modifiedDate?: Moment,
    public lastModifiedBy?: string
  ) {}
}
