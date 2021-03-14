import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AmensystemTestModule } from '../../../test.module';
import { SlideShowDetailComponent } from 'app/entities/slide-show/slide-show-detail.component';
import { SlideShow } from 'app/shared/model/slide-show.model';

describe('Component Tests', () => {
  describe('SlideShow Management Detail Component', () => {
    let comp: SlideShowDetailComponent;
    let fixture: ComponentFixture<SlideShowDetailComponent>;
    const route = ({ data: of({ slideShow: new SlideShow('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [SlideShowDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SlideShowDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SlideShowDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load slideShow on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.slideShow).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
