import { Auth0Client } from "@auth0/auth0-spa-js";

const auth0 = new Auth0Client({
  domain: "YOUR_AUTH0_DOMAIN",
  client_id: "YOUR_AUTH0_CLIENT_ID",
  redirect_uri: "YOUR_REDIRECT_URI",
  audience: "YOUR_AUTH0_AUDIENCE",
  scope: "openid profile email",
});

export default auth0;
//need to replace YOUR_AUTH0_DOMAIN, YOUR_AUTH0_CLIENT_ID, YOUR_REDIRECT_URI,
//and YOUR_AUTH0_AUDIENCE with the appropriate values from Auth0 app
