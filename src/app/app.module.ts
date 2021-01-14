import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { ProposeQuestionsComponent } from './propose-questions/propose-questions.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategorySelectionComponent },
  { path: 'interview-questions', component: InterviewQuestionsComponent },
  { path: 'propose-questions', component: ProposeQuestionsComponent },

  { path: '**', component: LandingPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    LoginComponent,
    CategorySelectionComponent,
    InterviewQuestionsComponent,
    ManageQuestionsComponent,
    ProposeQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    FontAwesomeModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
