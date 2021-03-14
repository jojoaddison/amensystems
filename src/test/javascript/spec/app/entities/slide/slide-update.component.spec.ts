import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AmensystemTestModule } from '../../../test.module';
import { SlideUpdateComponent } from 'app/entities/slide/slide-update.component';
import { SlideService } from 'app/entities/slide/slide.service';
import { Slide } from 'app/shared/model/slide.model';

describe('Component Tests', () => {
  describe('Slide Management Update Component', () => {
    let comp: SlideUpdateComponent;
    let fixture: ComponentFixture<SlideUpdateComponent>;
    let service: SlideService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [SlideUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SlideUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SlideUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SlideService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Slide('123');
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
        const entity = new Slide();
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
