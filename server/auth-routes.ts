import * as express from 'express';
import {UsersController} from './controllers/users/users.controller';
import {Authorization} from './auth/verify-token';

export default function setRoutes(app) {
  const router = express.Router();

  const usersCtrl = new UsersController();
  const authorization = new Authorization();

  router.route('/user-getadmin').get(usersCtrl.getAdmins);

  // Apply the routes to our application with the prefix /api
  app.use('/api', authorization.checkAccess, authorization.verifyToken , router);


}
