/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AmensystemTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SlideDetailComponent } from '../../../../../../main/webapp/app/entities/slide/slide-detail.component';
import { SlideService } from '../../../../../../main/webapp/app/entities/slide/slide.service';
import { Slide } from '../../../../../../main/webapp/app/entities/slide/slide.model';

describe('Component Tests', () => {

    describe('Slide Management Detail Component', () => {
        let comp: SlideDetailComponent;
        let fixture: ComponentFixture<SlideDetailComponent>;
        let service: SlideService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AmensystemTestModule],
                declarations: [SlideDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SlideService,
                    JhiEventManager
                ]
            }).overrideTemplate(SlideDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SlideDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SlideService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Slide('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.slide).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
