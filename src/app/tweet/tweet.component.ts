import { Component, OnInit, Input } from '@angular/core';
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

  @Input() tweets: Tweet[];

  private owner:string;

  constructor(private tweetService: TweetService, private loginService:LoginService) { }

  ngOnInit() {
  }

  getLoggedInUser(){
    return this.loginService.getLoggedInUser();
  }
  
  delete(tweet: Tweet): void {
    this.tweets = this.tweets.filter(h => h !== tweet);
    this.tweetService.deleteTweet(tweet).subscribe();
  }

}
