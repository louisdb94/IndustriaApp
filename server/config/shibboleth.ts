import * as saml2 from 'saml2-js';
import * as fs from 'fs';
import * as express from 'express';
import {app, pool} from '../app';

export default function setAuthRoutes(app) {

const router = express.Router();
var name_id;
var session_index;

//student parameters
var student_exist = false;
var user_fk;
var student_fk;

// Create service provider
var sp_options = {
  entity_id: "http://industria-staging.cloud.interhostsolutions.be",
  private_key: fs.readFileSync("./saml2/sp.key").toString(),
  certificate: fs.readFileSync("./saml2/sp.crt").toString(),
  assert_endpoint: "https://industria-staging.cloud.interhostsolutions.be/assert"
};
var sp = new saml2.ServiceProvider(sp_options);


// Create identity provider
var idp_options = {
  issuer: "urn:mace:kuleuven.be:kulassoc:kuleuven.be",
  sso_login_url: "https://idp.kuleuven.be/idp/profile/SAML2/Redirect/SSO",
  sso_logout_url: "https://idp.kuleuven.be/idp/profile/SAML2/Redirect/SLO",
  certificates: [fs.readFileSync("./saml2/idp.crt").toString()]
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


// Assert endpoint for when login completes
router.route('/assert').post(function(req,res){
  var options = {request_body: req.body};
  sp.post_assert(idp, options, function(err, saml_response) {
    if (err != null){return res.send(500);}

    // Save name_id and session_index for logout
    // Note:  In practice these should be saved in the user session, not globally.
    name_id = saml_response.user.name_id;
    session_index = saml_response.user.session_index;

    // //search user with this rnumber
    // //if found set currentUser
    // baseShibb.checkStudent(name_id);
    // if(student_exist){
    //   //setCurrentUser
    // }
    // else{
    //   // user - student
    //     //education - experiences - language - socalmedia x4 - professional - skills - contact
    //   baseShibb.addUser(name_id);
    //   //setCurrentUser
    // }

    res.send("Hello #{saml_response.user.name_id}!");
  });
});

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
function checkStudent(rnumber){
    const sql = `SELECT id FROM user WHERE rnumber = '${rnumber}'`;
    pool.getConnection(function (error, connection) {
        connection.query(sql, (err, result) => {
            if (err) {throw err;}
            if(result.rnumber = rnumber){
              student_exist = true;
            }
            connection.release();
        })
    });
}

function addUser(rnumber) {
    const sql = `INSERT INTO user SET rnumber = '${rnumber}'`;
    pool.getConnection(function (error, connection) {
        connection.query(sql, (err, result) => {
            if (err) {throw err;}
            user_fk = result.id;

            const sql1 = `INSERT INTO students SET rnumber = '${rnumber}', user_fk = '${user_fk}'`;
            connection.query(sql1, (err, result1) => {
                if (err) {throw err;}
                student_fk = result1.id;

                const sql2 = `INSERT INTO education SET student_fk = '${student_fk}'`;
                this.executeQuery(sql2);
                const sql3 = `INSERT INTO experiences SET student_fk = '${student_fk}'`;
                this.executeQuery(sql3);
                const sql4 = `INSERT INTO language SET student_fk = '${student_fk}'`;
                this.executeQuery(sql4);
                const sql5 = `INSERT INTO socialmedia SET student_fk = '${student_fk}'`;
                this.executeQuery(sql5);
                this.executeQuery(sql5);
                this.executeQuery(sql5);
                this.executeQuery(sql5);
                const sql6 = `INSERT INTO professional SET student_fk = '${student_fk}'`;
                this.executeQuery(sql6);
                const sql7 = `INSERT INTO skills SET student_fk = '${student_fk}'`;
                this.executeQuery(sql7);
                const sql8 = `INSERT INTO contact SET student_fk = '${student_fk}'`;
                this.executeQuery(sql8);

            });
        });

        connection.release();
    });

}

 function executeQuery(sql) {
    pool.getConnection(function (error, connection) {
            connection.query(sql, (err, result) => {
                if (err) {throw err;}
                connection.release();
            });
    });
}


  app.use('/api', router);

}
