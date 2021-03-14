import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AmensystemTestModule } from '../../../test.module';
import { SlideShowComponent } from 'app/entities/slide-show/slide-show.component';
import { SlideShowService } from 'app/entities/slide-show/slide-show.service';
import { SlideShow } from 'app/shared/model/slide-show.model';

describe('Component Tests', () => {
  describe('SlideShow Management Component', () => {
    let comp: SlideShowComponent;
    let fixture: ComponentFixture<SlideShowComponent>;
    let service: SlideShowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [SlideShowComponent],
      })
        .overrideTemplate(SlideShowComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SlideShowComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SlideShowService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SlideShow('123')],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.slideShows && comp.slideShows[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
