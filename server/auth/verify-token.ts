var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  var token = req.headers['x-access_token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes

    console.log(req);
    req.id = decoded.id;
    next();
  });
}
module.exports = verifyToken;
