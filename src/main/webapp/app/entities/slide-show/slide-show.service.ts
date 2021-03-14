import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SlideShow } from './slide-show.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SlideShowService {

    private resourceUrl = SERVER_API_URL + 'api/slide-shows';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(slideShow: SlideShow): Observable<SlideShow> {
        const copy = this.convert(slideShow);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(slideShow: SlideShow): Observable<SlideShow> {
        const copy = this.convert(slideShow);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<SlideShow> {
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
     * Convert a returned JSON object to SlideShow.
     */
    private convertItemFromServer(json: any): SlideShow {
        const entity: SlideShow = Object.assign(new SlideShow(), json);
        entity.createdDate = this.dateUtils
            .convertDateTimeFromServer(json.createdDate);
        entity.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(json.modifiedDate);
        return entity;
    }

    /**
     * Convert a SlideShow to a JSON which can be sent to the server.
     */
    private convert(slideShow: SlideShow): SlideShow {
        const copy: SlideShow = Object.assign({}, slideShow);

        copy.createdDate = this.dateUtils.toDate(slideShow.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(slideShow.modifiedDate);
        return copy;
    }
}
