import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthComponent, CallbackComponent } from '@chatwidget/auth';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

const routesDomain1: Routes = [
  { path: '', component: AuthComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'chat', loadComponent: () =>
  import('@chatwidget/chat').then((m) => m.ChatComponent), 
  canActivate: [AuthGuard]},
  { path: 'add-channel', loadComponent: () =>
  import('@chatwidget/chat').then((m) => m.AddChannelComponent), 
  canActivate: [AuthGuard]},
  { path: 'consult', loadComponent: () =>
  import('@chatwidget/consult').then((m) => m.ConsultComponent), 
  canActivate: [AuthGuard]}
];

const routesDomain2: Routes = [
  { path: '', component: AuthComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'chat', loadComponent: () =>
  import('@chatwidget/chat').then((m) => m.ChatComponent), 
  canActivate: [AuthGuard]},
];

function dynamicRoutes(): Routes {
  if (window.location.hostname === 'localhost') {
    if (window.location.port === '4200') {
      return routesDomain1;
    } else if (window.location.port === '4201') {
      return routesDomain2;
    }
  }
  return [];
}

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(dynamicRoutes()),
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        redirect_uri: `${window.location.origin}/callback`,
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
