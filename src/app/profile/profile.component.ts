import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';

import { TweetService } from '../tweet.service';
import { Owner } from '../owner';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tweets: Tweet[];

  constructor(private tweetService: TweetService, private loginService: LoginService) { }

  getTweets(): void {
    this.tweetService.getTweets()
      .subscribe(tweets => this.tweets = tweets);
  }
  delete(tweet: Tweet): void {
    this.tweets = this.tweets.filter(h => h !== tweet);
    this.tweetService.deleteTweet(tweet).subscribe();
  }
  ngOnInit() {
    this.getTweets();
  }
  add(content: string): void {
    content = content.trim();
    if (!content) { return; }
    let owner:Owner = new Owner();
    owner.id = localStorage.getItem("LoggedInId");
    owner.username = localStorage.getItem("LoggedIn");

    let newTweet:Tweet = new Tweet();
    newTweet.owner = owner;
    newTweet.content = content;

    this.tweetService.addTweet( newTweet ).subscribe((tweet)=>{
      this.getTweets();
      this.tweets.push(tweet);
    });
  }
  getLoggedInUser(){
    return this.loginService.getLoggedInUser();
  }
}
