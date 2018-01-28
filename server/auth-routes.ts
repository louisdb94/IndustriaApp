import * as express from 'express';
import * as path from 'path';
import * as mime from 'mime';
import * as fs from 'fs';

import * as  mysql from 'mysql';
import * as passport from 'passport';

export default function setAuthRoutes(app) {

  const router = express.Router();




  router.route('/auth/provider').get(passport.authenticate('provider',
      { scope: ['username', 'email', 'realname']}
  ));


  router.route('/auth/provider/login/oauth').get(passport.authenticate('provider',
      { succesRedirect: 'https://localhost:4200',
        failureRedirect: ''
      }

  ));


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
