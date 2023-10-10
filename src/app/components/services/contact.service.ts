import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConatct } from '../models/IContact';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:9000`;

  constructor(private httpclient: HttpClient) {}

  public getAllContacts() {
    let dataURL: string = `${this.serverUrl}/contacts`;

    return this.httpclient.get<IConatct[]>(dataURL).pipe();
  }

  public handleEroor(error: HttpErrorResponse) {
    let errorMessage: String = '';
    if (error.error instanceof ErrorEvent) {
      // Client Error

      errorMessage = `Error : ${error.error.message}`;
    } else {
      // server Error
      errorMessage = `Status : ${error.status} \n Message: ${error.message} `;
    }
    return throwError(errorMessage);
  }
}
