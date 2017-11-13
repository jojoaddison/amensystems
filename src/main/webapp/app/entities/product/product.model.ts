import { BaseEntity } from './../../shared';

export class Product implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public quantity?: string,
        public price?: number,
        public photoContentType?: string,
        public photo?: any,
        public category?: string,
        public createdDate?: any,
        public modifiedDate?: any,
        public lastModifiedBy?: string,
    ) {
    }
}
