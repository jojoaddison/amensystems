import { BaseEntity } from './../../shared';

export class Blog implements BaseEntity {
    constructor(
        public id?: string,
        public title?: string,
        public content?: any,
        public createdDate?: any,
        public modifiedDate?: any,
        public createdBy?: string,
        public modifiedBy?: string,
        public albumId?: string,
    ) {
    }
}
