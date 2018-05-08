import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';

import { TweetService } from '../tweet.service';
import { Owner } from '../owner';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  tweets: Tweet[];

  private owner:string;

  constructor(private tweetService: TweetService, private loginService:LoginService) { }

  ngOnInit() {
    this.getTweets();
  }

  getLoggedInUser(){
    return this.loginService.getLoggedInUser();
  }

  getTweets(): void {
    this.tweetService.getTweets()
      .subscribe(tweets => this.tweets = tweets);
  }

  // add(content: string): void {
  //   content = content.trim();
  //   if (!content) { return; }
  //   this.tweetService.addTweet( {content: content , owner: localStorage.getItem("loggedInUserId"), date:new Date() })
  //     .subscribe(tweet => {
  //       this.tweets.push(tweet);
  //     });
  // }
  
  delete(tweet: Tweet): void {
    this.tweets = this.tweets.filter(h => h !== tweet);
    this.tweetService.deleteTweet(tweet).subscribe();
  }

}
