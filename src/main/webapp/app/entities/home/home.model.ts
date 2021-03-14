import { BaseEntity } from './../../shared';

export const enum StateType {
    'CURRENT',
    'UNPUBLISH',
    'PUBLISH'
}

export class Home implements BaseEntity {
    constructor(
        public id?: string,
        public slides?: string,
        public advert?: string,
        public category?: string,
        public state?: StateType,
        public version?: number,
        public createdBy?: string,
        public createdDate?: any,
        public modifiedBy?: string,
        public modifiedDate?: any,
    ) {
    }
}
