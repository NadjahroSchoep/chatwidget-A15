import { CommonModule, DOCUMENT } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AuthConfigService, AuthHttpInterceptor, AuthModule, AuthService } from '@auth0/auth0-angular';
import { getAuth0Config } from './auth.config';

@Component({
  selector: 'chatwidget-auth',
  // standalone: true,
  // imports: [
  //   CommonModule,
  //   HttpClientModule,
  //   AuthModule,
  // ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthHttpInterceptor,
  //     multi: true,
  //   },
    // Provide AuthConfigService using a factory function
    // {
    //   provide: AuthConfigService,
    //   useFactory: () => getAuth0Config(),
    // },
  // ],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
    ) {}

    isAuthenticated$ = this.auth.isAuthenticated$

  login(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/chat',
      },
      authorizationParams: {
        prompt: 'login',
      },
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }

  signup(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
}