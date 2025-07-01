import { Component, AfterViewInit, EventEmitter, OnDestroy, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';

import * as tinymce from 'tinymce';

/* import * as modern from 'tinymce/themes/modern'; */

@Component({
  selector: 'jhi-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class TinyEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() elementId: String = 'editor';
  @Input() tmHeight = 250;
  @Input() content: String;
  @Input() name: String;
  editor: any;
  @Input() baseUrl = '/content/tinymce/';
  @Output() onDataChanged = new EventEmitter<any>();
  @Output() onDataBlur = new EventEmitter<any>();
  @Output() onKeyup = new EventEmitter<any>();
  isLoading = false;
  @Input() config: {} = {
    baseURL: this.baseUrl,
    selector: '#' + this.elementId,
    plugins: ['link', 'paste', 'table', 'image', 'codesample', 'lists', 'imagetools', 'fullscreen', 'fullpage'],
    skin_url: this.baseUrl + 'skins/lightgray',
    min_height: this.tmHeight,
    toolbar_items_size: 'small',
    toolbar: ['fontselect, fontsizeselect, bold, italic, paste, numlist bullist, link, table, image, codesample, source'],
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'CSS', value: 'css' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
      { text: 'Typescript', value: 'typescript' },
    ],
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    style_formats: [
      {
        title: 'Image Left',
        selector: 'img',
        styles: {
          float: 'left',
          margin: '0 10px 0 10px',
        },
      },
      {
        title: 'Image Right',
        selector: 'img',
        styles: {
          float: 'right',
          margin: '0 0 10px 10px',
        },
      },
    ],
    style_formats_merge: true,
    branding: false,
    file_picker_callback: (callback, value, meta) => this.fileUploadCallback(callback, value, meta),
    setup: editor => this.setup(editor),
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    tinymce.baseURL = this.baseUrl;
    tinymce.init(this.config);
    this.editor.setContent(this.content || '');
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  private fileUploadCallback(callback, value, meta) {
    if (meta.filetype === 'image') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.onchange = event => {
        new Promise((resolve, reject) => {
          this.isLoading = true;
          this.cd.detectChanges();

          const target: any = event.target;
          const file: File = target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            callback(reader.result, {
              title: file.name,
            });
            resolve(file);
          };

          reader.onerror = () => {
            return reject();
          };

          reader.readAsDataURL(file);
        }).then(() => {
          this.isLoading = false;
          this.cd.detectChanges();
        });
      };

      input.click();
    }
  }

  private setup(editor) {
    this.editor = editor;
    editor.on('blur', () => {
      this.content = editor.getContent();
      this.onDataBlur.emit(this.content);
    });
    editor.on('keyup', () => {
      this.content = editor.getContent();
      this.onKeyup.emit(this.content);
    });
    editor.on('change', () => {
      this.content = editor.getContent();
      this.onDataChanged.emit(this.content);
    });
  }
}
