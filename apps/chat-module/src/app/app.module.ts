import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthComponent, CallbackComponent } from '@chatwidget/auth';

import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  AuthHttpInterceptor,
  AuthModule,
} from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import {
  StreamChatModule,
  StreamAutocompleteTextareaModule,
} from 'stream-chat-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AddChannelComponent, ChatComponent } from '@chatwidget/chat';
import { ConsultComponent } from '@chatwidget/consult';

// Set of routes 1
const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  {
    path: 'add-channel',
    component: AddChannelComponent,
    canActivate: [AuthGuard],
  },
  { path: 'consult', component: ConsultComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // Auth0 setup
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
        audience: environment.audience,
      },
      // Allow Auth0 to send the token to the API
      httpInterceptor: {
        allowedList: [environment.api_url + '*'],
      },
    }),
    TranslateModule.forRoot(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    HttpClientModule,
  ],
  // Send Auth0 token with every request
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
