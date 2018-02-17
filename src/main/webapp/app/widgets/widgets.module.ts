import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TinyEditorComponent, TileboxComponent } from './index';
import { NgxEditorModule } from 'ngx-editor';
import { NgxCarouselModule } from 'ngx-carousel';

@NgModule({
    imports: [ CommonModule, NgxEditorModule, NgxCarouselModule ],
    declarations: [ TinyEditorComponent, TileboxComponent ],
    exports: [ TinyEditorComponent, TileboxComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WidgetsModule {
}
