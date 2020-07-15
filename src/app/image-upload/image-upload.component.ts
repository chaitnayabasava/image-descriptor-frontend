import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { UploadService } from '../upload/upload.service';

interface FileData {
  data,
  inProgress,
  progress
}

interface Model {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  imgUrl:string|ArrayBuffer = "";
  beam_size:number = 5;
  file:FileData = {data:null, inProgress: false, progress: 0};
  models: Model[] = [
    {value: 'normal-lstm', viewValue: 'LSTM'},
    {value: 'attention-lstm', viewValue: 'Attention'}
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
    if(this.beamFormControl.errors != null || this.modelFormControl.errors != null) return;

    const beam_size = this.beamFormControl.value;
    const model_name = this.modelFormControl.value;

    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      if(file) {
        this.file = { data: file, inProgress: false, progress: 0};

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.imgUrl = reader.result;
        }

        this.uploadService.uploadFile(this.file, beam_size, model_name);
      }
    };
    fileUpload.click();
  }

}
