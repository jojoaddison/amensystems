/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AmensystemTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NewsDetailComponent } from '../../../../../../main/webapp/app/entities/news/news-detail.component';
import { NewsService } from '../../../../../../main/webapp/app/entities/news/news.service';
import { News } from '../../../../../../main/webapp/app/entities/news/news.model';

describe('Component Tests', () => {

    describe('News Management Detail Component', () => {
        let comp: NewsDetailComponent;
        let fixture: ComponentFixture<NewsDetailComponent>;
        let service: NewsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AmensystemTestModule],
                declarations: [NewsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NewsService,
                    JhiEventManager
                ]
            }).overrideTemplate(NewsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NewsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NewsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new News('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.news).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
