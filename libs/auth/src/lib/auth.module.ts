import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback/callback.component';
import { AuthComponent } from './auth.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CommonModule,
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
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    // Provide AuthConfigService using a factory function
    // {
    //   provide: AuthConfigService,
    //   useFactory: () => getAuth0Config(),
    // },
    // Auth0Client
  ],
  declarations: [AuthComponent, CallbackComponent],
})
export class AuthM {}
