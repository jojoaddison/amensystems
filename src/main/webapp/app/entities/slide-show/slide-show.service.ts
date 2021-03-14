import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISlideShow } from 'app/shared/model/slide-show.model';

type EntityResponseType = HttpResponse<ISlideShow>;
type EntityArrayResponseType = HttpResponse<ISlideShow[]>;

@Injectable({ providedIn: 'root' })
export class SlideShowService {
  public resourceUrl = SERVER_API_URL + 'api/slide-shows';

  constructor(protected http: HttpClient) {}

  create(slideShow: ISlideShow): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slideShow);
    return this.http
      .post<ISlideShow>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(slideShow: ISlideShow): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slideShow);
    return this.http
      .put<ISlideShow>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ISlideShow>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISlideShow[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(slideShow: ISlideShow): ISlideShow {
    const copy: ISlideShow = Object.assign({}, slideShow, {
      createdDate: slideShow.createdDate && slideShow.createdDate.isValid() ? slideShow.createdDate.toJSON() : undefined,
      modifiedDate: slideShow.modifiedDate && slideShow.modifiedDate.isValid() ? slideShow.modifiedDate.toJSON() : undefined,
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
      res.body.forEach((slideShow: ISlideShow) => {
        slideShow.createdDate = slideShow.createdDate ? moment(slideShow.createdDate) : undefined;
        slideShow.modifiedDate = slideShow.modifiedDate ? moment(slideShow.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
