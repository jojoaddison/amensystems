import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INews } from 'app/shared/model/news.model';

type EntityResponseType = HttpResponse<INews>;
type EntityArrayResponseType = HttpResponse<INews[]>;

@Injectable({ providedIn: 'root' })
export class NewsService {
  public resourceUrl = SERVER_API_URL + 'api/news';

  constructor(protected http: HttpClient) {}

  create(news: INews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(news);
    return this.http
      .post<INews>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(news: INews): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(news);
    return this.http
      .put<INews>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<INews>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INews[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(news: INews): INews {
    const copy: INews = Object.assign({}, news, {
      createdDate: news.createdDate && news.createdDate.isValid() ? news.createdDate.toJSON() : undefined,
      modifiedDate: news.modifiedDate && news.modifiedDate.isValid() ? news.modifiedDate.toJSON() : undefined,
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
      res.body.forEach((news: INews) => {
        news.createdDate = news.createdDate ? moment(news.createdDate) : undefined;
        news.modifiedDate = news.modifiedDate ? moment(news.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
