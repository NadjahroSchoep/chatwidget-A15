import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'chatwidget-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chatwidget';

  constructor(
    private router: Router, 
    private auth: AuthService,
    ) {} 

  // Redirect to chat if user is authenticated
  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      this.router.navigate(['/chat']);
    } else {
      this.router.navigate(['']);
    }
  }
}