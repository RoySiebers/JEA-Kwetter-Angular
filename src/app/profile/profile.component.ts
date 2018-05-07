import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';

import { TweetService } from '../tweet.service';
import { Owner } from '../owner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tweets: Tweet[];

  constructor(private tweetService: TweetService) { }

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
  add(content: string, owner: number): void {
    content = content.trim();
    if (!content) { return; }
    this.tweetService.addTweet({ id: 22, content: 'Dit is een tweet', owner: new Owner(), date: new Date() })
      .subscribe(tweet => {
        this.tweets.push(tweet);
      });
  }
}
