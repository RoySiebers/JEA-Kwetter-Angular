import { Injectable } from '@angular/core';
import { Tweet } from './tweet';
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
export class TweetService { 

  private tweetsUrl = 'http://localhost:8080/JEA-Kwetter/api/tweets';  // URL to web api

  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetsUrl)
      .pipe(
        tap(tweets => this.log(`fetched Tweets`)),
        catchError(this.handleError('getTweets In tweet service', [])))
  }
  getTweetsFromOwner(id: number):Observable<Tweet[]>{
    const url = `http://localhost:8080/JEA-Kwetter/api/tweets/allTweets/${id}`;
    return this.http.get<Tweet[]>(url)
      .pipe(
        tap(tweets => this.log(`fetched Tweets from user ${id} `)),
        catchError(this.handleError('getTweets In tweet service', [])))
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('TweetService: ' + message);
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

  /** GET tweet by id. Will 404 if id not found */
  getTweet(id: number): Observable<Tweet> {
    const url = `${this.tweetsUrl}/${id}`;
    return this.http.get<Tweet>(url).pipe(
      tap(_ => this.log(`fetched tweet id=${id}`)),
      catchError(this.handleError<Tweet>(`getTweet id=${id}`))
    );
  }

  getTimeline(id: number): Observable<Tweet[]> {
    const url = `${this.tweetsUrl}/timeline/${id}`;
    return this.http.get<Tweet[]>(url).pipe(
      tap(_ => this.log(`fetched timeline for id=${id}`)),
      catchError(this.handleError<Tweet[]>(`getTimeline id=${id}`))
    );
  }
  /** PUT: update the tweet on the server */
  updateTweet(tweet: Tweet): Observable<any> {
    return this.http.put(this.tweetsUrl, tweet, httpOptions).pipe(
      tap(_ => this.log(`updated Tweet id=${tweet.id}`)),
      catchError(this.handleError<any>('updateTweet'))
    );
  }

  /** POST: add a new tweet to the server */
  addTweet(tweet: Tweet): Observable<Tweet> {
    const url = 'http://localhost:8080/JEA-Kwetter/api/tweets/post';
    return this.http.post<Tweet>(url, tweet, httpOptions).pipe(
      tap((rtweet: Tweet) => this.log(`added tweet w/ id=${rtweet.content}`)),
      catchError(this.handleError<Tweet>('addTweet'))
    );  
  }

  /** DELETE: delete the tweet from the server */
  deleteTweet(tweet: Tweet | number): Observable<Tweet> {
    const id = typeof tweet === 'number' ? tweet : tweet.id;
    const url = `${this.tweetsUrl}/${id}`;

    return this.http.delete<Tweet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Tweet id=${id}`)),
      catchError(this.handleError<Tweet>('deleteTweet'))
    );
  }
  /* GET tweets whose owner contains search term */
  searchTweets(term: string): Observable<Tweet[]> {
    if (!term.trim()) {
 
      return of([]);
    }
    return this.http.get<Tweet[]>(`${this.tweetsUrl}/allTweetsUsername/${term}`).pipe(
      tap(_ => this.log(`found tweets matching "${term}"`)),
      catchError(this.handleError<Tweet[]>('searchTweets', []))
    );
  }
}
