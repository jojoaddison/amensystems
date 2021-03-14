import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AmensystemTestModule } from '../../../test.module';
import { HomeUpdateComponent } from 'app/entities/home/home-update.component';
import { HomeService } from 'app/entities/home/home.service';
import { Home } from 'app/shared/model/home.model';

describe('Component Tests', () => {
  describe('Home Management Update Component', () => {
    let comp: HomeUpdateComponent;
    let fixture: ComponentFixture<HomeUpdateComponent>;
    let service: HomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AmensystemTestModule],
        declarations: [HomeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(HomeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HomeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HomeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Home('123');
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
        const entity = new Home();
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
