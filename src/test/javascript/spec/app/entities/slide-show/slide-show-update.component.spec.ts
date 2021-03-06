import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AmensystemTestModule } from '../../../test.module';
import { SlideShowUpdateComponent } from 'app/entities/slide-show/slide-show-update.component';
import { SlideShowService } from 'app/entities/slide-show/slide-show.service';
import { SlideShow } from 'app/shared/model/slide-show.model';

describe('Component Tests', () => {
  describe('SlideShow Management Update Component', () => {
    let comp: SlideShowUpdateComponent;
    let fixture: ComponentFixture<SlideShowUpdateComponent>;
    let service: SlideShowService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [SlideShowUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SlideShowUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SlideShowUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SlideShowService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SlideShow('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SlideShow();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
