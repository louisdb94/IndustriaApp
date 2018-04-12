import * as express from 'express';

import UsersCtrl from './controllers_mysql/users';

var VerifyToken = require('./auth/verify-token');

export default function setRoutes(app) {
  const router = express.Router();

  const usersCtrl = new UsersCtrl();

  router.route('/user-getadmin').get(usersCtrl.getAdmins);

  // Apply the routes to our application with the prefix /api
  app.use('/api', VerifyToken, router);
}
