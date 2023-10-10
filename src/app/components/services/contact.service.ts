import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../models/IContact';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:9000`;

  constructor(private httpclient: HttpClient) {}

  public getAllContacts() {
    let dataURL: string = `${this.serverUrl}/contacts`;

    return this.httpclient
      .get<IContact[]>(dataURL)
      .pipe(catchError(this.handleEroor));
  }
  // Get single Contact
  public getContact(contactId: string): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpclient
      .get<IContact>(dataURL)
      .pipe(catchError(this.handleEroor));
  }

  // Create Contact
  public createContact(contact: IContact): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpclient
      .post<IContact>(dataURL, contact)
      .pipe(catchError(this.handleEroor));
  }
  // Update Contact
  public updateContact(
    contact: IContact,
    contactId: string
  ): Observable<IContact> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpclient
      .put<IContact>(dataURL, contact)
      .pipe(catchError(this.handleEroor));
  }
  // Delete Contact
  public deleteContact(contactId: string): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpclient
      .delete<{}>(dataURL)
      .pipe(catchError(this.handleEroor));
  }

  // Error Response Handling
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
