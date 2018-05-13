import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JEA-Kwetter';

  constructor(private tweetService: TweetService, private loginService:LoginService) { }

  getLoggedInUser(){
    return this.loginService.getLoggedInUser();
  }
}
