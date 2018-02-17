import { BaseEntity } from './../../shared';
import { Slide } from '../slide';

export class News implements BaseEntity {
    constructor(
        public id?: string,
        public title?: string,
        public content?: string,
        public slides?: Slide[],
        public createdDate?: any,
        public modifiedDate?: any,
        public lastModifiedBy?: string,
    ) {
    }
}
