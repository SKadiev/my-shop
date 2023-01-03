const { csrfSync } = require("csrf-sync");

module.exports = csrfSync({
  getTokenFromState: (req) => {
    return req.session.csrfToken;
  }, // Used to retrieve the token from state.
  getTokenFromRequest: (req) => {
    return req.body['CSRFToken'];
  }, // Used to retrieve the token submitted by the user in a form
  storeTokenInState: (req, token) => {
    req.session.csrfToken = token;
  }, // Used to store the token in state.
  size: 128, // The size of the generated tokens in bits
});