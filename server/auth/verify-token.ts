var jwt = require('jsonwebtoken');

export class Authorization {

  verifyToken(req, res, next){
      var token = req.headers.authorization;
      if (!token){
        return res.status(403).send({ auth: false, message: 'No token provided.' });
      }else{
        jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        next();
      });
    }
  }

  checkAccessAdmin(req, res, next){
    var token = req.headers.authorization;
    if (!token){
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }else{
      jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.user.admin = 0){res.status(403).send({ auth: false, message: 'No token provided.' });}else{next()}
      });
    }
  }

  checkAccessStudentZelfInsertOrUpdate(req, res, next){
    var token = req.headers.authorization;
    if (!token){
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }else{
      jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        var student_fk = req.body.student_fk;
        if(student_fk == undefined){
          student_fk = req.body.id;
        }
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.user.studentId == student_fk){next()}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
      });
    }
  }

  checkAccessCompanyZelfInsertOrUpdate(req, res, next){
    var token = req.headers.authorization;
    if (!token){
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }else{
      jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        var company_fk = req.body.company_fk;
        if(company_fk == undefined){
          company_fk = req.body.id;
        }
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.user.companyId == company_fk){next()}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
      });
    }
  }

  checkAccessCompanyZelfOrAdminInsertOrUpdate(req, res, next){
    var token = req.headers.authorization;
    if (!token){
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }else{
      jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        var company_fk = req.body.company_fk;
        if(company_fk == undefined){
          company_fk = req.body.id;
        }
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.user.companyId == company_fk || decoded.user.admin == 1){next()}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
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
        if(decoded.user.admin != 0 || decoded.user.studentId != 0){next()}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
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
        var student_fk = req.originalUrl.match(/\d+/g).map(Number);
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.user.admin != 0 || decoded.user.studentId == student_fk){next()}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
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
    if(decoded.user.admin != 0 || decoded.user.studentId == 0){next();}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
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
        var student_fk = req.originalUrl.match(/\d+/g).map(Number);
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.user.studentId == student_fk || decoded.user.role == 'Company'){next()}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
      });
    }
  }

  checkAccessCompanyORStudentZelfORAdmin(req, res, next){
    var token = req.headers.authorization;
    if (!token){
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }else{
      jwt.verify(token, process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', function(err, decoded) {
        var student_fk = req.originalUrl.match(/\d+/g).map(Number);
        if (err){return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });}
        if(decoded.user.studentId == student_fk || decoded.user.role == 'Company' || decoded.user.admin == 1){next()}else{res.status(403).send({ auth: false, message: 'No token provided.' });}
      });
    }
  }




}
