import { BaseEntity } from './../../shared';

export class News implements BaseEntity {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public slides?: string,
        public createdDate?: any,
        public modifiedDate?: any,
        public lastModifiedBy?: string,
    ) {
    }
}
