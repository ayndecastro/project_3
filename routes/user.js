
const checkScopes = jwtAuthz([ 'read:messages' ]);
const checkScopesAdmin = jwtAuthz([ 'write:messages' ]);
const checkScopeProfile = jwtAuthz([ 'openid' ])
    
module.exports = function (app) {
   

    app.get('/api/public', function(req, res) {
      res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
    });
    
    app.get('/api/private', checkJwt, checkScopes, function(req, res) {
      console.log(req.headers.user.split('|')[1])
      res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
    });
  
  
  
    
    app.post('/api/admin', checkJwt, checkScopesAdmin, function(req, res) {
      res.json({ message: "Hello from an admin endpoint! You need to be authenticated and have a scope of write:messages to see this." });
    });


}
