import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TweetComponent }      from './tweet/tweet.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TweetDetailComponent }  from './tweet-detail/tweet-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: TweetDetailComponent },
  { path: 'tweets', component: TweetComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}