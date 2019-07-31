import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  //private apiUrl = "http://192.168.0.11:7825/bin/interceptor";
  private apiUrl = "http://192.168.0.11:7825/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded' //'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  addHotel(value: any): Promise<any> {
    console.log(value);
    var dataValue = {
      'function': 'AddHotel',
      'onkar': 'raje',
      'onffkar': 'raje',
      'fdsf': 'raje',
      'oenkar': 'raje',
      'owwnkar': 'raje',
      'hotel_token': ''
    }

    const params = new HttpParams()
    .set('function','AddHotel')
    .set('hotel_token', '')
    .set('args', value);

    // for (const key in value) {
    //   if (value.hasOwnProperty(key)) {
    //     const element = value[key];
    //     dataValue[key] = element;
    //   }
    // }

    console.log(dataValue);



    return this.http.post(this.apiUrl, params, this.httpOptions)
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




