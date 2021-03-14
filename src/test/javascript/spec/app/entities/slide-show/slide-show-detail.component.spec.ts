/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AmensystemTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SlideShowDetailComponent } from '../../../../../../main/webapp/app/entities/slide-show/slide-show-detail.component';
import { SlideShowService } from '../../../../../../main/webapp/app/entities/slide-show/slide-show.service';
import { SlideShow } from '../../../../../../main/webapp/app/entities/slide-show/slide-show.model';

describe('Component Tests', () => {

    describe('SlideShow Management Detail Component', () => {
        let comp: SlideShowDetailComponent;
        let fixture: ComponentFixture<SlideShowDetailComponent>;
        let service: SlideShowService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AmensystemTestModule],
                declarations: [SlideShowDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SlideShowService,
                    JhiEventManager
                ]
            }).overrideTemplate(SlideShowDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SlideShowDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SlideShowService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new SlideShow('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.slideShow).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
