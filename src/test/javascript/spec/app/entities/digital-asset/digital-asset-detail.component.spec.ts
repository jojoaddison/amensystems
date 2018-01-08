/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AmensystemTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DigitalAssetDetailComponent } from '../../../../../../main/webapp/app/entities/digital-asset/digital-asset-detail.component';
import { DigitalAssetService } from '../../../../../../main/webapp/app/entities/digital-asset/digital-asset.service';
import { DigitalAsset } from '../../../../../../main/webapp/app/entities/digital-asset/digital-asset.model';

describe('Component Tests', () => {

    describe('DigitalAsset Management Detail Component', () => {
        let comp: DigitalAssetDetailComponent;
        let fixture: ComponentFixture<DigitalAssetDetailComponent>;
        let service: DigitalAssetService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AmensystemTestModule],
                declarations: [DigitalAssetDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DigitalAssetService,
                    JhiEventManager
                ]
            }).overrideTemplate(DigitalAssetDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DigitalAssetDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DigitalAssetService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DigitalAsset('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.digitalAsset).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
