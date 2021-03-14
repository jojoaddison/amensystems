import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDigitalAsset } from 'app/shared/model/digital-asset.model';

type EntityResponseType = HttpResponse<IDigitalAsset>;
type EntityArrayResponseType = HttpResponse<IDigitalAsset[]>;

@Injectable({ providedIn: 'root' })
export class DigitalAssetService {
  public resourceUrl = SERVER_API_URL + 'api/digital-assets';

  constructor(protected http: HttpClient) {}

  create(digitalAsset: IDigitalAsset): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(digitalAsset);
    return this.http
      .post<IDigitalAsset>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(digitalAsset: IDigitalAsset): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(digitalAsset);
    return this.http
      .put<IDigitalAsset>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDigitalAsset>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDigitalAsset[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(digitalAsset: IDigitalAsset): IDigitalAsset {
    const copy: IDigitalAsset = Object.assign({}, digitalAsset, {
      createdDate: digitalAsset.createdDate && digitalAsset.createdDate.isValid() ? digitalAsset.createdDate.toJSON() : undefined,
      modifiedDate: digitalAsset.modifiedDate && digitalAsset.modifiedDate.isValid() ? digitalAsset.modifiedDate.toJSON() : undefined,
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
      res.body.forEach((digitalAsset: IDigitalAsset) => {
        digitalAsset.createdDate = digitalAsset.createdDate ? moment(digitalAsset.createdDate) : undefined;
        digitalAsset.modifiedDate = digitalAsset.modifiedDate ? moment(digitalAsset.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
