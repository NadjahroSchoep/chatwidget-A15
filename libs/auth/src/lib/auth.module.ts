import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CallbackComponent } from './callback/callback.component';
// import { AuthComponent } from './auth.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AuthModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  declarations: [],
})
export class AuthM {}
