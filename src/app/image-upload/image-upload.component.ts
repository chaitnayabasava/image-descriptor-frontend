import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { UploadService } from '../upload/upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  imgUrl:string|ArrayBuffer = "";
  beam_size:number = 5;
  file = null;
  models = [
    {value: 'lstm', viewValue: 'LSTM'},
    {value: 'attention', viewValue: 'Attention'}
  ];

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

  beamFormControl = new FormControl('', [
    Validators.required,
    Validators.min(5),
    Validators.max(10)
  ]);
  modelFormControl = new FormControl('', [Validators.required])

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void { }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      if(file) {
        this.file = file;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.imgUrl = reader.result;
        }
      }
    };
    fileUpload.click();
  }

  analyse() {
    const beam_size = this.beamFormControl.value;
    const model_name = this.modelFormControl.value;
    this.uploadService.uploadFile(this.file, beam_size, model_name);
  }

}
