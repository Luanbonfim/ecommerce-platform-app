import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../../environments/environment';

export const oauthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/oauth2-redirect.html',  // Must match Google Cloud's redirect URI
  clientId: environment.googleClientId, 
  responseType: 'code',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
  useHttpBasicAuth: false,
  showDebugInformation: true,
};
