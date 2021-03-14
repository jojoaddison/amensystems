import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { News } from './news.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NewsService {

    private resourceUrl = SERVER_API_URL + 'api/news';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(news: News): Observable<News> {
        const copy = this.convert(news);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(news: News): Observable<News> {
        const copy = this.convert(news);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<News> {
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
     * Convert a returned JSON object to News.
     */
    private convertItemFromServer(json: any): News {
        const entity: News = Object.assign(new News(), json);
        entity.createdDate = this.dateUtils
            .convertDateTimeFromServer(json.createdDate);
        entity.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(json.modifiedDate);
        return entity;
    }

    /**
     * Convert a News to a JSON which can be sent to the server.
     */
    private convert(news: News): News {
        const copy: News = Object.assign({}, news);

        copy.createdDate = this.dateUtils.toDate(news.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(news.modifiedDate);
        return copy;
    }
}
