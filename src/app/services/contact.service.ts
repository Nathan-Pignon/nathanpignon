import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {ContactModel} from "../models/contact.model";
import {environmentProd} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  public sendMail(body: ContactModel): Observable<string> {
    return this.http.post<string>(`${environmentProd.apiURL}/send-email`, body).pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      }));
  }

}
