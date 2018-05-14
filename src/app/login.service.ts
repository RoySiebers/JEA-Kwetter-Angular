import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Owner } from './owner';
import { OwnerService } from './owner.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const authHttpOptions = {
	headers: new HttpHeaders()
};

@Injectable()
export class LoginService {
	private authUrl = 'http://localhost:8080/JEA-Kwetter/api/authentication'; // URL to web api
	private echoUrl = 'http://localhost:8080/JEA-Kwetter/api/echo/jwt?message=';

	constructor(private http: HttpClient, private messageService: MessageService, private ownerService: OwnerService) {}

	authenticate(username: string, password: string) {
		const payload = JSON.parse(
			'{ "username":"' + username + '" , "password":"' + password + '", "observe":"response" }'
		);
		const url = `${this.authUrl}`;
		this.http.post<any>(url, payload, httpOptions).subscribe((response) => {
			if (response) {
				localStorage.setItem('LoggedIn', response.username);
				localStorage.setItem('LoggedInId', response.userId);
				localStorage.setItem('AuthToken', response.AuthToken);
			}
		});
	}

	getLoggedInUser() {
		if (localStorage) {
			return localStorage.getItem('LoggedIn');
		}
	}

	getLoggedInUserId() {
		if (localStorage) {
			return localStorage.getItem('LoggedInId');
		}
	}

	logOut() {
		if (localStorage) {
			localStorage.clear();
		}
	}

	echo() {
		let token = localStorage.getItem('AuthToken');
		if (token) {
			let headers = new HttpHeaders();
			headers = headers.append('Authorization', 'Bearer ' + token);

			authHttpOptions.headers = headers;
			const url = `${this.echoUrl}` + localStorage.getItem('LoggedIn');
			this.http.get(url, authHttpOptions).subscribe((response) => {
				console.log(response);
			});
		} else console.log('Currently not logged in');
	}
}
