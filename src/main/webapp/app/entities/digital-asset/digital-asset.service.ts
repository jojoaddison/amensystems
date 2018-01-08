import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DigitalAsset } from './digital-asset.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DigitalAssetService {

    private resourceUrl = SERVER_API_URL + 'api/digital-assets';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(digitalAsset: DigitalAsset): Observable<DigitalAsset> {
        const copy = this.convert(digitalAsset);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(digitalAsset: DigitalAsset): Observable<DigitalAsset> {
        const copy = this.convert(digitalAsset);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: string): Observable<DigitalAsset> {
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
     * Convert a returned JSON object to DigitalAsset.
     */
    private convertItemFromServer(json: any): DigitalAsset {
        const entity: DigitalAsset = Object.assign(new DigitalAsset(), json);
        entity.createdDate = this.dateUtils
            .convertDateTimeFromServer(json.createdDate);
        entity.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(json.modifiedDate);
        return entity;
    }

    /**
     * Convert a DigitalAsset to a JSON which can be sent to the server.
     */
    private convert(digitalAsset: DigitalAsset): DigitalAsset {
        const copy: DigitalAsset = Object.assign({}, digitalAsset);

        copy.createdDate = this.dateUtils.toDate(digitalAsset.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(digitalAsset.modifiedDate);
        return copy;
    }
}
