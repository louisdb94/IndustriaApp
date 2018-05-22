var jwt = require('jsonwebtoken');

export class Authorization {

      verifyToken(req, res, next){
        console.log("verifyToken")
      var token = req.headers.authorization;
      // console.log("token", token);
      if (!token){
        return res.status(403).send({ auth: false, message: 'No token provided.' });
      }else{
        jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        // if everything good, save to request for use in other routes
        next();
      });
    }
    }

      checkAccessAdmin(req, res, next){
        console.log("checkAccesAdmin")

      var token = req.headers.authorization;
      if (!token){
        return res.status(403).send({ auth: false, message: 'No token provided.' });
      }else{
        jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.admin = 0){res.status(403).send({ auth: false, message: 'No token provided.' });}else{next()}
        // if everything good, save to request for use in other routes
      //  next();
      });
    }
    }

    checkAccessAdminORStudent(req, res, next){

    var token = req.headers.authorization;
    if (!token){
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }else{
      jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
      if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
      console.log("decided",decoded);
      if(decoded.admin = 0 || decoded.studentId == 0){res.status(403).send({ auth: false, message: 'No token provided.' });}else{next()}
      // if everything good, save to request for use in other routes
    //  next();
    });
  }
  }
  //delete route student
  checkAccessAdminORStudentZelf(req, res, next){

  var token = req.headers.authorization;
  if (!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }else{
    jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
    if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
    console.log("decided",decoded);
    if(decoded.admin = 0 || decoded.studentId != req.params.student_fk){res.status(403).send({ auth: false, message: 'No token provided.' });}else{next()}
    // if everything good, save to request for use in other routes
  //  next();
  });
}
}

  checkAccessAdminORCompany(req, res, next){

  var token = req.headers.authorization;
  if (!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }else{
    jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
    if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
    console.log("decided",decoded);
    if(decoded.admin = 0 || decoded.studentId != 0){res.status(403).send({ auth: false, message: 'No token provided.' });}else{next()}
    // if everything good, save to request for use in other routes
  //  next();
  });
}
}
checkAccessCompanyORStudentZelf(req, res, next){

var token = req.headers.authorization;
if (!token){
  return res.status(403).send({ auth: false, message: 'No token provided.' });
}else{
  jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
  if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
  console.log("decided",decoded);
  if(decoded.studentId != req.params.student_fk || decoded.role != 'Student'){res.status(403).send({ auth: false, message: 'No token provided.' });}else{next()}
  // if everything good, save to request for use in other routes
//  next();
});
}
}



}
