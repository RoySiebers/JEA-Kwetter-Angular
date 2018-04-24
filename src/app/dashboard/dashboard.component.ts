import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tweets: Tweet[] = [];
 
  constructor(private tweetService: TweetService) { }
 
  ngOnInit() {
    this.getTweets();
  }
 
  getTweets(): void {
    this.tweetService.getTweets()
      .subscribe(tweets => this.tweets = tweets.slice(0, 4));
  }

}
