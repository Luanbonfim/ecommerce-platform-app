import { AuthConfig } from 'angular-oauth2-oidc';

export const oauthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/oauth2-redirect.html',  // Must match Google Cloud's redirect URI
  clientId: '638805690450-t9n92g30lrmelit5qo6vtdk1drlaahe9.apps.googleusercontent.com', //process.env['GOOGLE_CLIENT_ID'],  // Replace with your Client ID from Google Cloud
  responseType: 'code',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
  useHttpBasicAuth: false,
  showDebugInformation: true,
};
