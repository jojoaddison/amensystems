/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { AmensystemTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { HomeDetailComponent } from '../../../../../../main/webapp/app/entities/home/home-detail.component';
import { HomeService } from '../../../../../../main/webapp/app/entities/home/home.service';
import { Home } from '../../../../../../main/webapp/app/entities/home/home.model';

describe('Component Tests', () => {

    describe('Home Management Detail Component', () => {
        let comp: HomeDetailComponent;
        let fixture: ComponentFixture<HomeDetailComponent>;
        let service: HomeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AmensystemTestModule],
                declarations: [HomeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    HomeService,
                    JhiEventManager
                ]
            }).overrideTemplate(HomeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HomeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HomeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Home('aaa')));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.home).toEqual(jasmine.objectContaining({id: 'aaa'}));
            });
        });
    });

});
