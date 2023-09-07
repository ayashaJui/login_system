import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../config/auth-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
    this.isAuthenticated = !this.isAuthenticated;
  }

  logout() {
    this.oauthService.logOut();
    this.isAuthenticated = !this.isAuthenticated;
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  getRefreshToken() {
    return this.oauthService.getRefreshToken();
  }
}
