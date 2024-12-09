import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointKeys, endpoints, Lambda } from './endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getUserList():Observable<any>{
    return this.http.get(endpoints['userList']);
  }

  request<T = any>(url : EndpointKeys,method : string, payload? : object, urlParams? : any):Observable<T>{
    let finalUrl : string;
    if(!urlParams){
      finalUrl = <string>endpoints[url];
    }else{
      finalUrl = (<Lambda>endpoints[url])(urlParams);
    }
    return !payload
      ? this.http.request<T>(method, finalUrl)
      : this.http.request<T>(method, finalUrl, {body:payload});
  }
}
