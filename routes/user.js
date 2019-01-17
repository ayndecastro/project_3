const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const db = require('../models/index');

require('dotenv').config();

const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

const checkScopes = jwtAuthz([ 'read:messages' ]);
const checkScopesAdmin = jwtAuthz([ 'write:messages' ]);
const checkScopeProfile = jwtAuthz([ 'openid' ]);
const checkScopeCreateTrip = jwtAuthz([ 'create:trip' ]);
const checkScopeDeleteTrip = jwtAuthz([ 'delete:trip' ]);
const checkScopeUpdateTrip = jwtAuthz([ 'update:trip' ]);
const checkScopeUpdateBudget = jwtAuthz([ 'update:budget' ]);
const checkScopeViewTrip = jwtAuthz([ 'view:trip' ]);
const checkScopeAddPhoto = jwtAuthz([ 'add:photo' ]);


    
module.exports = function (app) {
   

//get all trips user saved
  app.get('/api/viewTrip',checkJwt, checkScopeViewTrip, (req,res)=>{
    db.Trips.findAll()
        .sort({date: -1})
        .then(trip=>res.json(trip))
  });

//create a trip
  app.post('/api/createTrip',checkJwt, checkScopeCreateTrip, (req,res)=>{
    const newTrip = new db.Trips({
      country: req.body.country,
      date_leave: req.body.date_leave,
      date_back: req.body.date_back,
      budget: req.body.budget,
      user_id: req.header.user.split('|')[1]
    });
    newTrip.save().then(trip => res.json(trip));
  });

  //create a current trip
  app.post('/api/createTrip/current', checkJwt, checkScopeCreateTrip, (req,res) => {
    const current = new db.UserCurrent({
      
    })

    current.save().then(currentTrip=> res.json(current));
  })

  //update current budget
  app.post('/api/updateBudget/:budget', checkJwt, checkScopeUpdateBudget, (req,res)=>{
    db.UserCurrent.findOneAndUpdate()
  })

  //add to spending
  app.post('/api/updateBudget/:spending', checkJwt, checkScopeUpdateBudget, (req,res)=>{
    db.UserCurrent.findOneAndUpdate()
  })

  //add photos to current
  app.post('/api/addPhoto/:photo', checkJwt, checkScopeAddPhoto, (req,res)=>{
    db.UserCurrent.findOneAndUpdate()
  })

  //delete a trip
  app.delete('/api/deleteTrip/:id', checkJwt, checkScopeDeleteTrip, (req,res)=> {
    db.Trips.findbyId(req.params.id)
        .then(trip => trip.remove().then(()=> res.json({success:true})))
        .catch(err=> res.status(404).json({success: false}))
  })

    // app.get('/api/public', function(req, res) {
    //   res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
    // });
    
    // app.get('/api/private', checkJwt, checkScopes, function(req, res) {
    //   console.log(req.headers.user.split('|')[1])
    //   res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
    // });
  
  
  
    
    // app.post('/api/admin', checkJwt, checkScopesAdmin, function(req, res) {
    //   res.json({ message: "Hello from an admin endpoint! You need to be authenticated and have a scope of write:messages to see this." });
    // });


}
