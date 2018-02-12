import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TinyEditorComponent } from './index';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    imports: [ CommonModule, NgxEditorModule ],
    declarations: [ TinyEditorComponent ],
    exports: [ TinyEditorComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class WidgetsModule {
}
