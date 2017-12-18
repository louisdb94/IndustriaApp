import * as passport from 'passport';
import * as OAuth2Strategy from 'passport-oauth2';

// const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({

  //options for shibboleth

  authorizationURL: 'https://idp.industria.be/login',
  tokenURL: 'https://idp.industria.be/oauth/token',
  clientID: '19_2n9j2f34bfac0ggck0kwos8csg08s8s0004w4wsc0g04goc04w',
  clientSecret: '3x0a8cvkht8gwkwsko0ck0ogswg8sgc4okc84o844wk8c0ok4c',
  callbackURL: 'http://localhost:4200/api/auth/provider/login/oauth'
  // callbackURL: 'https://bedrijvenrelaties.industria.be'



},
function(accesToken, refreshToken, profile, done){

  console.log('shibboleth callback function: ');
  console.log(profile);

  //here make new user db from profile student if not exists
}
));
