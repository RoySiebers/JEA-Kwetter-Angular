import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  private authUrl = 'http://localhost:8080/JEA-Kwetter/api/authentication';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  authenticate(username:string, password:string){
    const payload = JSON.parse('{ "username":"' + username + '" , "password":"' + password + '"}');
    const url = `${this.authUrl}`;
    this.http.post(url,payload).subscribe((response : any) => console.log(response.headers.get('Authorization')));
  }

}
