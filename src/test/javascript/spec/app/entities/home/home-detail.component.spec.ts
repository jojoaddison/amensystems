import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AmensystemTestModule } from '../../../test.module';
import { HomeDetailComponent } from 'app/entities/home/home-detail.component';
import { Home } from 'app/shared/model/home.model';

describe('Component Tests', () => {
  describe('Home Management Detail Component', () => {
    let comp: HomeDetailComponent;
    let fixture: ComponentFixture<HomeDetailComponent>;
    const route = ({ data: of({ home: new Home('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [HomeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(HomeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HomeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load home on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.home).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
