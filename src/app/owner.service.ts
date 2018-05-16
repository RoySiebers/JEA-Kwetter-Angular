import { Injectable } from '@angular/core';
import { Tweet } from './tweet';
import { Owner } from './owner';
import { TWEETS } from './mock-tweets';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OwnerService {
	private kwetterUserUrl = 'http://localhost:8080/JEA-Kwetter/api/users'; // URL to web api

	getOwners(): Observable<Owner[]> {
		return this.http
			.get<Owner[]>(this.kwetterUserUrl)
			.pipe(
				tap((owners) => this.log(`fetched Owners`)),
				catchError(this.handleError('getUser In owner service', []))
			);
	}

	constructor(private http: HttpClient, private messageService: MessageService) {}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add('OwnerService: ' + message);
	}
	/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** GET Owner by id. Will 404 if id not found */
	getOwner(id: number): Observable<Owner> {
		const url = `${this.kwetterUserUrl}/${id}`;
		return this.http
			.get<Owner>(url)
			.pipe(
				tap((_) => this.log(`fetched owner id=${id}`)),
				catchError(this.handleError<Owner>(`getOwner id=${id}`))
			);
	}

	getFollowing(id: number): Observable<Owner[]> {
		const url = `${this.kwetterUserUrl}/${id}/following`;
		return this.http
			.get<Owner[]>(url)
			.pipe(
				tap((_) => this.log(`fetched following for id=${id}`)),
				catchError(this.handleError<Owner[]>(`getFollowing for id=${id}`))
			);
	}

	getFollowers(id: number): Observable<Owner[]> {
		const url = `${this.kwetterUserUrl}/${id}/followers`;
		return this.http
			.get<Owner[]>(url)
			.pipe(
				tap((_) => this.log(`fetched followers for id=${id}`)),
				catchError(this.handleError<Owner[]>(`getFollowers for id=${id}`))
			);
	}

	followOwner(followerId: number, followingId: number): Observable<Owner> {
		const url = `${this.kwetterUserUrl}/follow/${followerId}/${followingId}`;
		return this.http
			.put<Owner>(url, httpOptions)
			.pipe(
				tap((_) => this.log(`${followerId} started following ${followingId}`)),
				catchError(this.handleError<Owner>(`followOwner ${followingId}`))
			);
	}

	unfollowOwner(followerId: number, followingId: number): Observable<Owner> {
		const url = `${this.kwetterUserUrl}/unfollow/${followerId}/${followingId}`;
		return this.http
			.put<Owner>(url, httpOptions)
			.pipe(
				tap((_) => this.log(`${followerId} is no longer following ${followingId}`)),
				catchError(this.handleError<Owner>(`unfollowOwner ${followingId}`))
			);
	}

	/* GET tweets whose owner contains search term */
	searchTweets(term: string): Observable<Tweet[]> {
		if (!term.trim()) {
			return of([]);
		}
		return this.http
			.get<Tweet[]>(`${this.kwetterUserUrl}/allTweetsUsername/${term}`)
			.pipe(
				tap((_) => this.log(`found tweets matching "${term}"`)),
				catchError(this.handleError<Tweet[]>('searchTweets', []))
			);
	}
}
