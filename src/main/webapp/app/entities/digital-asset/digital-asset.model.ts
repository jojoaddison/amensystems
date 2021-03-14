import { BaseEntity } from './../../shared';

export class DigitalAsset implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public url?: string,
        public resourceContentType?: string,
        public resource?: any,
        public type?: string,
        public createdDate?: any,
        public modifiedDate?: any,
        public createdBy?: string,
        public lastModifiedBy?: string,
    ) {
    }
}
