import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  backend: string = "http://127.0.0.1:5000";
  api: string = "/image-upload";

  predEmitter = new EventEmitter<{sentences: Array<string>, beamSize: number}>();

  constructor(private httpClient: HttpClient) {}

  public upload(formData, beam_size: number, model_name: string) {
    return this.httpClient.post<any>(this.backend + this.api + "?beam_size="
               + beam_size + "&model_name=" + model_name, formData);
  }

  public uploadFile(file, beam_size: number, model_name: string) {
    const formData = new FormData();
    formData.append('file', file);

    this.upload(formData, beam_size, model_name)
    .subscribe((data) => {
      data.beamSize = beam_size;
      this.predEmitter.emit(data);
    });
  }
}
