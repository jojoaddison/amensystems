import { BaseEntity } from './../../shared';

export class Slide implements BaseEntity {
    constructor(
        public id?: string,
        public url?: string,
        public title?: string,
        public description?: string,
        public photoContentType?: string,
        public photo?: any,
        public createdDate?: any,
        public modifiedDate?: any,
        public createdBy?: string,
        public modifiedBy?: string,
    ) {
    }
}
