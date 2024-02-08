// callback.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'chatwidget-callback',
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
