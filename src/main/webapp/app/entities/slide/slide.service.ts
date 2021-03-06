import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISlide } from 'app/shared/model/slide.model';

type EntityResponseType = HttpResponse<ISlide>;
type EntityArrayResponseType = HttpResponse<ISlide[]>;

@Injectable({ providedIn: 'root' })
export class SlideService {
  public resourceUrl = SERVER_API_URL + 'api/slides';

  constructor(protected http: HttpClient) {}

  create(slide: ISlide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slide);
    return this.http
      .post<ISlide>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

<<<<<<< HEAD
    create(slide: Slide): Observable<Slide> {
        // slide.createdDate = new Date();
        // slide.lastModified = new Date();
        const copy = this.convert(slide);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(slide: Slide): Observable<Slide> {
        // slide.lastModified = new Date();
        const copy = this.convert(slide);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
=======
  update(slide: ISlide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slide);
    return this.http
      .put<ISlide>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ISlide>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
>>>>>>> jhipster_upgrade

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISlide[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(slide: ISlide): ISlide {
    const copy: ISlide = Object.assign({}, slide, {
      createdDate: slide.createdDate && slide.createdDate.isValid() ? slide.createdDate.toJSON() : undefined,
      modifiedDate: slide.modifiedDate && slide.modifiedDate.isValid() ? slide.modifiedDate.toJSON() : undefined,
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
     * Convert a returned JSON object to Slide.
     */
    private convertItemFromServer(json: any): Slide {
        const entity: Slide = Object.assign(new Slide(), json);
        entity.createdDate = this.dateUtils
            .convertDateTimeFromServer(json.createdDate);
        entity.lastModified = this.dateUtils
            .convertDateTimeFromServer(json.lastModified);
        return entity;
    }

    /**
     * Convert a Slide to a JSON which can be sent to the server.
     */
    private convert(slide: Slide): Slide {
        const copy: Slide = Object.assign({}, slide);

        copy.createdDate = this.dateUtils.toDate(slide.createdDate);

        copy.lastModified = this.dateUtils.toDate(slide.lastModified);
        return copy;
=======
  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((slide: ISlide) => {
        slide.createdDate = slide.createdDate ? moment(slide.createdDate) : undefined;
        slide.modifiedDate = slide.modifiedDate ? moment(slide.modifiedDate) : undefined;
      });
>>>>>>> jhipster_upgrade
    }
    return res;
  }
}
