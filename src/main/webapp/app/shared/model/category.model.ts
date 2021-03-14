export interface ICategory {
  id?: string;
  name?: string;
  description?: string;
  photoContentType?: string;
  photo?: any;
  thumbnail?: string;
  link?: string;
}

export class Category implements ICategory {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public photoContentType?: string,
    public photo?: any,
    public thumbnail?: string,
    public link?: string
  ) {}
}
