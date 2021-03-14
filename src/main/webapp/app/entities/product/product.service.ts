import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProduct } from 'app/shared/model/product.model';

type EntityResponseType = HttpResponse<IProduct>;
type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
  public resourceUrl = SERVER_API_URL + 'api/products';

  constructor(protected http: HttpClient) {}

  create(product: IProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .post<IProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(product: IProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .put<IProduct>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

<<<<<<< HEAD
    getProductsGroupedByCategory(): Observable<any> {
        const url = this.resourceUrl + '/grouped-by-category';
        return this.http.get(url)
                    .map((res: Response) => {
                        return res.json();
                    });
    }

    update(product: Product): Observable<Product> {
        const copy = this.convert(product);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
=======
  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
>>>>>>> jhipster_upgrade

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

<<<<<<< HEAD
    findByCategory(category: string): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/by-category/${category}`)
            .map((res: Response) => this.convertResponse(res));
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }
=======
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
>>>>>>> jhipster_upgrade

  protected convertDateFromClient(product: IProduct): IProduct {
    const copy: IProduct = Object.assign({}, product, {
      createdDate: product.createdDate && product.createdDate.isValid() ? product.createdDate.toJSON() : undefined,
      modifiedDate: product.modifiedDate && product.modifiedDate.isValid() ? product.modifiedDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.modifiedDate = res.body.modifiedDate ? moment(res.body.modifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((product: IProduct) => {
        product.createdDate = product.createdDate ? moment(product.createdDate) : undefined;
        product.modifiedDate = product.modifiedDate ? moment(product.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
