import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthComponent, CallbackComponent } from '@chatwidget/auth';

import { RouterModule, Routes } from '@angular/router';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'chat', loadComponent: () =>
  import('@chatwidget/chat').then((m) => m.ChatComponent), },
];

@NgModule({
  declarations: [AppComponent, AuthComponent, CallbackComponent,],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        redirect_uri: environment.callback_url,
        audience: environment.audience
      },
      httpInterceptor: {
        allowedList: [environment.api_url+'*'],
      },
      // useRefreshTokens: true,
    }),
    TranslateModule.forRoot(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    HttpClientModule
  ],
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
