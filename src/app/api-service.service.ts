import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = "http://192.168.0.20:7825/interceptor.go";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded' ,
      'Accept': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  addHotel(value: any): Promise<any> {
    console.log(value);
    const dataValue = {
      'function': 'AddHotel',
      'args': value,
      'hotel_token': ''
    }

    return this.http.post(this.apiUrl, JSON.stringify(dataValue),  this.httpOptions)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleErrorObservable);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleErrorObservable (error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }
}




