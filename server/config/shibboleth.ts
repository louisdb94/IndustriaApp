import * as saml2 from 'saml2-js';
import * as fs from 'fs';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as localStorage from 'localStorage';
import {app, pool} from '../app';

export default function setShibbRoutes(app) {

const router = express.Router();
var name_id;
var session_index;

//student parameters
var student_exist = false;
var user_fk;
var student_fk;

// Create service provider
var sp_options = {
  entity_id: "https://bedrijvenrelaties-industria.be",
  private_key: fs.readFileSync(process.cwd() + "/saml2/sp.key").toString(),
  certificate: fs.readFileSync(process.cwd() + "/saml2/sp.crt").toString(),
  assert_endpoint: "https://bedrijvenrelaties-industria.be/api/assert"
};
var sp = new saml2.ServiceProvider(sp_options);


// Create identity provider
var idp_options = {
  issuer: "urn:mace:kuleuven.be:kulassoc:kuleuven.be",
  sso_login_url: "https://idp.kuleuven.be/idp/profile/SAML2/Redirect/SSO",
  sso_logout_url: "https://idp.kuleuven.be/idp/profile/SAML2/Redirect/SLO",
  certificates: [fs.readFileSync(process.cwd() + '/saml2/idp.crt').toString()]
};
var idp = new saml2.IdentityProvider(idp_options);


// ------ Define express endpoints ------

// Endpoint to retrieve metadata
router.route('/metadata.xml').get(function(req,res){
    res.type('application/xml');
    res.send(sp.create_metadata());
});

// Starting point for login
router.route('/login').get(function(req,res){
    sp.create_login_request_url(idp, {}, function(err, login_url, request_id) {
      if (err != null)
        return res.send(500);
      res.redirect(login_url);
    });
});


// // Assert endpoint for when login completes
// router.route('/assert').post(function(req,res){
//   var options = {
//     request_body: {
//         RelayState: req.body.RelayState,
//         SAMLResponse: req.body.SAMLResponse,
//     },
//     ignore_signature: true,
//   };
//   sp.post_assert(idp, options, function (err, saml_response) {
//       if (err != null) {
//           return res.send(500);
//       }
//       name_id = saml_response.user.name_id;
//       session_index = saml_response.user.session_index;
//       var email = saml_response.user.attributes["urn:mace:kuleuven.be:dir:attribute-def:KULAssocMigrateID"][0];
//       var rnumber = email.substr(0,8);
//       checkStudent(rnumber, res);
//   });
// });

// Assert endpoint for when login completes
router.route('/assert').get(function(req,res){

    var rnumber = '0202020';
    checkStudent(rnumber, res);
  //res.redirect('http://localhost:4200/home-students/'+ token);

});


router.route('/shibbolethstudent').get(function(req,res){
  const user_json = localStorage.getItem('user');
  if(user_json){
    const user = JSON.parse(user_json);
    const token = jwt.sign({ user: user },
    process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'mytoken' ); // , { expiresIn: 10 } seconds
    res.status(200).json({ token: token });
  }
  else{
    res.json("");
  }
})

// Starting point for logout
router.route('/logout').get(function(req,res){
    var options = {
      name_id: name_id,
      session_index: session_index
    };

    sp.create_logout_request_url(idp, options, function(err, logout_url) {
      if (err != null)
        return res.send(500);
      res.redirect(logout_url);
    });
});


//functies om student aan te maken
function checkStudent(rnumber, res){
    const sql = `SELECT * FROM user WHERE rnumber = '${rnumber}'`;
    pool.getConnection(function (error, connection) {
        connection.query(sql, (err, result) => {
            if (err) {
              connection.release();
              throw err;
            }

            else if(result.length > 0){
                  var user_value = { id: 0, email: '', rnumber: '', role: '', studentId: 0 , companyId: 0, admin: ''};
                  student_exist = true;
                  user_value.id = result[0].id;
                  user_value.rnumber = result[0].rnumber;
                  user_value.role = result[0].role;
                  user_value.admin = result[0].admin;
                  user_value.email = result[0].email;

                  const token = jwt.sign({ user: user_value },
                  process.env.SECRET_TOKEN ? process.env.SECRET_TOKEN : 'supersecret', {
                    expiresIn: 86400 // expires in 24 hours
                  });
                //  res.status(200).json({ token: token });
                  res.redirect('http://localhost:4200/home-students/'+ token);
                  //res.redirect('https://bedrijvenrelaties-industria.be/home-students/' + token);

                }
                else{
                  addUser(rnumber,res);
                }
            connection.release();
        })
    });
}

function addUser(rnumber,res) {
    const sql = `INSERT INTO user SET rnumber = '${rnumber}', email = '${rnumber}@kuleuven.be', role = 'Student'`;
    pool.getConnection(function (error, connection) {
        connection.query(sql, (err, result) => {
            if (err) {connection.release(); throw err;}
            user_fk = result.insertId;

            const sql1 = `INSERT INTO students SET rnumber = '${rnumber}', user_fk = '${user_fk}'`;
              connection.query(sql1, (err, result1) => {
                  if (err) {throw err;}
                  student_fk = result1.insertId;
                  const sql2 = `INSERT INTO education SET student_fk = '${student_fk}'`;
                  executeQuery(sql2);
                  const sql3 = `INSERT INTO experiences SET student_fk = '${student_fk}'`;
                  executeQuery(sql3);
                  const sql4 = `INSERT INTO language SET student_fk = '${student_fk}'`;
                  executeQuery(sql4);
                  const sql5 = `INSERT INTO socialmedia SET student_fk = '${student_fk}'`;
                  executeQuery(sql5);
                  executeQuery(sql5);
                  executeQuery(sql5);
                  executeQuery(sql5);
                  const sql6 = `INSERT INTO professional SET student_fk = '${student_fk}'`;
                  executeQuery(sql6);
                  const sql7 = `INSERT INTO skills SET student_fk = '${student_fk}'`;
                  executeQuery(sql7);
                  const sql8 = `INSERT INTO contact SET student_fk = '${student_fk}'`;
                  executeQuery(sql8);

                  checkStudent(rnumber,res);
            });
            connection.release();
        });
    });
}

 function executeQuery(sql) {
    pool.getConnection(function (error, connection) {
            connection.query(sql, (err, result) => {
                if (err) {connection.release(); throw err;}
                connection.release();
            });
    });
}


  app.use('/api', router);

}
