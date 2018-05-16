import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet';

import { TweetService } from '../tweet.service';
import { Owner } from '../owner';

import { LoginService } from '../login.service';
import { OwnerService } from '../owner.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	tweets: Tweet[];

	constructor(
		private tweetService: TweetService,
		private loginService: LoginService,
		private ownerService: OwnerService
	) {
		tweetService.tweets.subscribe((msg) => {
			console.log('Response from websocket: ' + JSON.stringify(msg));
			if (localStorage) {
				this.ownerService.getFollowing(+localStorage.getItem('LoggedInId')).subscribe((data) => {
					data.forEach((user) => {
						if (user.id == msg.owner.id) {
							this.tweets.unshift(msg);
						}
					});
				});
			} else this.tweets.unshift(msg);
		});
	}

	getTimeline(): void {
		if (localStorage.getItem('LoggedInId')) {
			let id = +localStorage.getItem('LoggedInId');
			this.tweetService.getTimeline(id).subscribe((tweets) => (this.tweets = tweets));
		} else this.tweetService.getTweets().subscribe((tweets) => (this.tweets = tweets));
	}

	delete(tweet: Tweet): void {
		this.tweets = this.tweets.filter((h) => h !== tweet);
		this.tweetService.deleteTweet(tweet).subscribe();
	}

	ngOnInit() {
		this.getTimeline();
	}

	add(content: string): void {
		content = content.trim();
		if (!content) {
			return;
		}
		let owner: Owner = new Owner();
		owner.id = localStorage.getItem('LoggedInId');
		owner.username = localStorage.getItem('LoggedIn');

		let newTweet: Tweet = new Tweet();
		newTweet.owner = owner;
		newTweet.content = content;

		this.tweetService.addTweet(newTweet).subscribe((tweet) => {
			this.getTimeline();
			this.tweets.push(tweet);
		});
	}

	getLoggedInUser() {
		return this.loginService.getLoggedInUser();
	}
}
