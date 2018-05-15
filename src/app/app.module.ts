import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"; // <-- NgModel lives here

import { AppComponent } from "./app.component";
import { TweetComponent } from "./tweet/tweet.component";
import { TweetDetailComponent } from "./tweet-detail/tweet-detail.component";
import { TweetService } from "./tweet.service";
import { MessagesComponent } from "./messages/messages.component";
import { MessageService } from "./message.service";
import { AppRoutingModule } from ".//app-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { TweetSearchComponent } from "./tweet-search/tweet-search.component";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./login.service";
import { ProfileComponent } from "./profile/profile.component";
import { OwnerService } from "./owner.service";
import { SocketService } from "./socket.service";

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    TweetDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TweetSearchComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
  ],
  providers: [
    TweetService,
    MessageService,
    LoginService,
    OwnerService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
