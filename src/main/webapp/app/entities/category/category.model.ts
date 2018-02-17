import { BaseEntity } from './../../shared';
import { Product } from '../product';
import { Tile } from '../../widgets';

export class Category implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public photoContentType?: string,
        public photo?: any,
        public thumbnail?: string,
        public link?: string,
        public products?: Tile[]
    ) {
    }
}
