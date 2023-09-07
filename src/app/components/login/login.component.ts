import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  accessToken!: string;

  constructor(
    public authService: AuthService,
    private oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    this.oauthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        this.accessToken = this.authService.getAccessToken();
        console.log(this.accessToken);
      }
    });
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.accessToken = '';
    this.authService.logout();
  }
}
