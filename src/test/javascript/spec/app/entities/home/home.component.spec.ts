import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AmensystemTestModule } from '../../../test.module';
import { HomeComponent } from 'app/entities/home/home.component';
import { HomeService } from 'app/entities/home/home.service';
import { Home } from 'app/shared/model/home.model';

describe('Component Tests', () => {
  describe('Home Management Component', () => {
    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let service: HomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [HomeComponent],
      })
        .overrideTemplate(HomeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HomeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HomeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Home('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.homes && comp.homes[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
