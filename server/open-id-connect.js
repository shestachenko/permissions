const { ExpressOIDC } = require('@okta/oidc-middleware');

// const oidc = new ExpressOIDC({
//   issuer: 'https://known-aim-dev-336354/oauth2/default',
//   client_id: '0oa2bwxsorcxXRWzV4x6',
//   client_secret: 'hd_w5Z3zYCAINxGLP2jEXmJwfYIQrVuXhrWMq9EB',
//   redirect_uri: 'http://localhost:3000/',
//   scope: 'openid profile'
// });


const oidc = new ExpressOIDC({
  issuer: 'https://dev-336354.okta.com/oauth2/default',
  client_id: '0oa2bwxsorcxXRWzV4x6',
  client_secret: 'hd_w5Z3zYCAINxGLP2jEXmJwfYIQrVuXhrWMq9EB',
  appBaseUrl: 'http://localhost:3000',
  scope: 'openid profile',
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  routes: {
    login: {
      path: '/users/login'
    },
    callback: {
      path: '/users/callback',
      defaultRedirect: '/dashboard'
    }
  }
});



module.exports = oidc;
