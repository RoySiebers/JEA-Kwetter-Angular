import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';

import { TweetService } from '../tweet.service';
import { Owner } from '../owner';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  tweets: Tweet[];

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets(): void {
    this.tweetService.getTweets()
      .subscribe(tweets => this.tweets = tweets);
  }

  add(content: string,owner:number): void {
    content = content.trim();
    if (!content) { return; }
    this.tweetService.addTweet( { id: 33, content: 'Dit is een tweet',owner: new Owner(),date:new Date() })
      .subscribe(tweet => {
        this.tweets.push(tweet);
      });
  }
  delete(tweet: Tweet): void {
    this.tweets = this.tweets.filter(h => h !== tweet);
    this.tweetService.deleteTweet(tweet).subscribe();
  }

}
