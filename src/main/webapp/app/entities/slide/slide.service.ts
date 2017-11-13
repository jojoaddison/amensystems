import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Slide } from './slide.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SlideService {

    private resourceUrl = SERVER_API_URL + 'api/slides';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

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

    find(id: string): Observable<Slide> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: string): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

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
    }
}
