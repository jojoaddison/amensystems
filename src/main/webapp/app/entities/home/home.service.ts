import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHome } from 'app/shared/model/home.model';

type EntityResponseType = HttpResponse<IHome>;
type EntityArrayResponseType = HttpResponse<IHome[]>;

@Injectable({ providedIn: 'root' })
export class HomeService {
  public resourceUrl = SERVER_API_URL + 'api/homes';

  constructor(protected http: HttpClient) {}

  create(home: IHome): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(home);
    return this.http
      .post<IHome>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

<<<<<<< HEAD
    getCurrentHome(): Observable<Home>  {
        const url = this.resourceUrl + '/current';
        return this.http.get(url).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    create(home: Home): Observable<Home> {
        const copy = this.convert(home);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
=======
  update(home: IHome): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(home);
    return this.http
      .put<IHome>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
>>>>>>> jhipster_upgrade

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IHome>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHome[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(home: IHome): IHome {
    const copy: IHome = Object.assign({}, home, {
      createdDate: home.createdDate && home.createdDate.isValid() ? home.createdDate.toJSON() : undefined,
      modifiedDate: home.modifiedDate && home.modifiedDate.isValid() ? home.modifiedDate.toJSON() : undefined,
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

<<<<<<< HEAD
    /**
     * Convert a returned JSON object to Home.
     */
    private convertItemFromServer(json: any): Home {
        const entity: Home = Object.assign(new Home(), json);
        entity.createdDate = this.dateUtils
            .convertDateTimeFromServer(json.createdDate);
        entity.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(json.modifiedDate);
        return entity;
    }

    /**
     * Convert a Home to a JSON which can be sent to the server.
     */
    private convert(home: Home): Home {
        const copy: Home = Object.assign({}, home);
        if (home.createdDate != null) {
            copy.createdDate = new Date(home.createdDate).toISOString();
        }
        copy.modifiedDate = null;
        return copy;
=======
  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((home: IHome) => {
        home.createdDate = home.createdDate ? moment(home.createdDate) : undefined;
        home.modifiedDate = home.modifiedDate ? moment(home.modifiedDate) : undefined;
      });
>>>>>>> jhipster_upgrade
    }
    return res;
  }
}
