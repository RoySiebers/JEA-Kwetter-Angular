import { Component, OnInit,Input  } from '@angular/core';
import { Tweet } from '../tweet';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TweetService }  from '../tweet.service';


@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.css']
})

export class TweetDetailComponent implements OnInit {

  private tweets: Tweet[];
  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTweet();
  }
  getTweet(): void {
    const id = +this.route.snapshot.paramMap.get('id');
      this.tweetService.getTweetsFromOwner(id)
        .subscribe(tweets => this.tweets = tweets);
  }
  goBack(): void {
    this.location.back();
  }
  

}
