import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { ApiService } from '@chatwidget/api';

@Component({
  selector: 'chatwidget-auth',
  standalone: true,
  imports: [
    CommonModule,
    AuthModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  
  constructor(
    public auth: AuthService,
    private api: ApiService,
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