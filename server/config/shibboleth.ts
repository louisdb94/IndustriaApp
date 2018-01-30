import * as saml2 from 'saml2-js';
import * as fs from 'fs';
import {app} from '../app';

// Create service provider
var sp_options = {
  entity_id: "http://industria-staging.cloud.interhostsolutions.be",
  private_key: fs.readFileSync("../saml2/sp.key").toString(),
  certificate: fs.readFileSync("../saml2/sp.crt").toString(),
  assert_endpoint: "https://industria-staging.cloud.interhostsolutions.be/assert"
};
var sp = new saml2.ServiceProvider(sp_options);


// Create identity provider
var idp_options = {
  issuer: "urn:mace:kuleuven.be:kulassoc:kuleuven.be",
  sso_login_url: "https://idp.kuleuven.be/idp/profile/SAML2/Redirect/SSO",
  sso_logout_url: "https://idp.kuleuven.be/idp/profile/SAML2/Redirect/SLO",
  certificates: [fs.readFileSync("../saml2/idp.crt").toString()]
};
var idp = new saml2.IdentityProvider(idp_options);


// ------ Define express endpoints ------

// Endpoint to retrieve metadata
app.get("/api/metadata.xml", function(req, res) {
  res.type('application/xml');
  console.log("login in with shibb")

  res.send(sp.create_metadata());
});

// Starting point for login
app.get("/api/login", function(req, res) {
  sp.create_login_request_url(idp, {}, function(err, login_url, request_id) {
    if (err != null)
      return res.send(500);
    console.log("login in with shibb")
    res.redirect(login_url);
  });
});

let name_id;
let session_index;

// Assert endpoint for when login completes
app.post("/api/assert", function(req, res) {
  var options = {request_body: req.body};
  sp.post_assert(idp, options, function(err, saml_response) {
    if (err != null)
      return res.send(500);

    // Save name_id and session_index for logout
    // Note:  In practice these should be saved in the user session, not globally.
    name_id = saml_response.user.name_id;
    session_index = saml_response.user.session_index;

    res.send("Hello #{saml_response.user.name_id}!");
  });
});

// Starting point for logout
app.get("/api/logout", function(req, res) {
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
