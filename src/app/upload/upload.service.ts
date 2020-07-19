import { HttpClient } from  '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // backend: string = "http://192.168.99.101:5000/";
  backend: string = "http://localhost:5000/";

  predEmitter = new EventEmitter<{sentences: Array<string>, beamSize: number, model: string}>();
  loadEmitter = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  public upload(formData, beam_size: number, model_name: string) {
    return this.httpClient.post<any>(this.backend + "image-upload?beam_size="
               + beam_size + "&model_name=" + model_name, formData);
  }

  public uploadFile(file, beam_size: number, model_name: string) {
    const formData = new FormData();
    formData.append('file', file);

    this.loadEmitter.emit(true);

    this.upload(formData, beam_size, model_name)
    .subscribe((data) => {
      data.beamSize = beam_size;
      data.model = model_name;
      this.predEmitter.emit(data);
      this.loadEmitter.emit(false)
    }, (error) => {
      this.loadEmitter.emit(false)
      console.log(error);
      const mssg = "Something went wrong! Please try later.";
      const errorSnackbar = this.snackBar.open(mssg, null, {duration: 5 * 1000});
      // const errorObservable = errorSnackbar.onAction();
      // errorObservable.subscribe(() => {});
    });
  }
}
