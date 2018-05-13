import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from '../tweet';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TweetService } from '../tweet.service';
import { Owner } from '../owner';
import { OwnerService } from '../owner.service';
import { LoginService } from '../login.service';

@Component({
	selector: 'app-tweet-detail',
	templateUrl: './tweet-detail.component.html',
	styleUrls: [ './tweet-detail.component.css' ]
})
export class TweetDetailComponent implements OnInit {
	private tweets: Tweet[];
	private isCurrentUserFollowing: boolean;
	@Input() owner: Owner;
	constructor(
		private route: ActivatedRoute,
		private tweetService: TweetService,
		private ownerService: OwnerService,
		private location: Location,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.getTweets();
		this.getOwner();
	}
	getTweets(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.tweetService.getTweetsFromOwner(id).subscribe((tweets) => (this.tweets = tweets));
	}
	getOwner(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.ownerService.getOwner(id).subscribe((owner) => {
			this.owner = owner;
			this.isLoggedInUserFollowing(+owner.id);
		});
	}
	goBack(): void {
		this.location.back();
	}

	getLoggedInUser() {
		return this.loginService.getLoggedInUser();
	}

	isLoggedInUserFollowing(userId: number): void {
		this.ownerService.getFollowing(userId).subscribe((data) => {
			data.forEach((user) => {
				if (user.username == this.getLoggedInUser()) {
					this.isCurrentUserFollowing = true;
				}
			});
		});
		this.isCurrentUserFollowing = true;
	}
}
