import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'image-descriptor';
  isLoading: boolean = false;

  constructor(private uploadService: UploadService) {
    this.uploadService.checkBackend();
  }

  ngOnInit() {
    this.uploadService.loadEmitter.subscribe(loading => this.isLoading = loading);
  }
}
