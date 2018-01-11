import { BaseEntity } from './../../shared';

export class SlideShow implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public slides?: string,
        public createdDate?: any,
        public modifiedDate?: any,
        public lastModifiedBy?: string,
    ) {
    }
}
