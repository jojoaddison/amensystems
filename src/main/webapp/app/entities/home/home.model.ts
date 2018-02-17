import { BaseEntity } from './../../shared';
import { Product } from '../product';
import { Slide } from '../slide';
import { Category } from '../category';

export const enum StateType {
    'CURRENT',
    'UNPUBLISH',
    'PUBLISH'
}

export class Home implements BaseEntity {
    constructor(
        public id?: string,
        public slides?: Slide[],
        public advert?: Product[],
        public category?: Category[],
        public state?: StateType,
        public version?: number,
        public createdBy?: string,
        public createdDate?: any,
        public modifiedBy?: string,
        public modifiedDate?: any,
    ) {
    }
}
