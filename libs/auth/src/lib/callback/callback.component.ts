// callback.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthModule, AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'chatwidget-callback',
  standalone: true,
  imports: [
    CommonModule,
    AuthModule,
  ],
  template: '<div>Logging in...</div>',
})
export class CallbackComponent implements OnInit {
  
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log('Called back');
    this.auth
      .handleRedirectCallback()
      // .subscribe(
      //   () => {
      // //   // Redirect to the home page or any desired route
      //   window.location.href = '/';
      // }
      // );
  }
}
