import { BaseEntity } from './../../shared';

export class Category implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public photoContentType?: string,
        public photo?: any,
        public thumbnail?: string,
        public link?: string,
    ) {
    }
}
