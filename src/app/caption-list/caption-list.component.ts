import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload/upload.service';

@Component({
  selector: 'app-caption-list',
  templateUrl: './caption-list.component.html',
  styleUrls: ['./caption-list.component.css']
})
export class CaptionListComponent implements OnInit {

  sentences: Array<string> = []
  beamSize: number = null;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    this.uploadService.predEmitter.subscribe(data => {
      this.beamSize = data.beamSize;
      this.sentences = data.sentences;
    });
  }

}
