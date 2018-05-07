import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetComponent }      from './tweet/tweet.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TweetDetailComponent }  from './tweet-detail/tweet-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: TweetDetailComponent },
  { path: 'tweets', component: TweetComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}