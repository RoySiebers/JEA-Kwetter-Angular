import { Component, OnInit } from "@angular/core";
import { Tweet } from "../tweet";
import { TweetService } from "../tweet.service";
import { SocketService } from "../socket.service";
import { OwnerService } from "../owner.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  tweets: Tweet[] = [];

  constructor(
    private tweetService: TweetService,
    private userService: OwnerService
  ) {
    tweetService.tweets.subscribe(msg => {
      console.log("Response from websocket: " + JSON.stringify(msg));
      this.tweets.unshift(msg);
    });
  }

  ngOnInit() {
    this.getTweets();
  }

  getTweets(): void {
    this.tweetService
      .getTweets()
      .subscribe(tweets => (this.tweets = tweets.slice(0, 4)));
  }
}
