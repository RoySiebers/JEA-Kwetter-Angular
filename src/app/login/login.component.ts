import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService){ }
  loggedInUser : boolean;

  ngOnInit() {
    this.loggedInUser = false;
  }

  authenticate(username:string, password:string){
    this.loginService.authenticate(username, password);
  }

  getLoggedInUser(){
    return this.loginService.getLoggedInUser();
  }

  logOut(){
    this.loginService.logOut();
  }

  echo(){
    this.loginService.echo();
  }

}
