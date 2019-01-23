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

  //testing post route
  app.post('/api/admin', checkJwt, checkScopesAdmin, function(req, res) {
    const newTrip = new db.Trips({
      country: "canada",
      date_leave: "01/20/2019",
      date_back: "01/26/2019",
      budget: 3000,
      user_id: 108926452875239055842
    });
    newTrip.save().then(trip => res.json(trip));
  });
   

//get all trips user saved
  app.get('/api/viewTrip',checkJwt, checkScopeViewTrip, (req,res)=>{
    db.Trips.find(req.query)
        .sort({date: -1})
        .then(trip=>res.json(trip))
        .catch(err => res.status(422).json(err));
  });

  //get current trip
  app.get('/api/currentTrip',checkJwt, checkScopeViewTrip, (req,res)=>{
    db.Trips.find(req.query)
        .then(trip=>res.json(trip))
        .catch(err => res.status(422).json(err));
  });


//create a trip
  app.post('/api/createTrip',checkJwt, checkScopeCreateTrip, (req,res)=>{
    const newTrip = new db.Trips({
      country: req.body.country,
      date_leave: req.body.date_leave,
      date_back: req.body.date_back,
      budget: req.body.budget,
      user_id: req.header.user.split('|')[1],
    });
    newTrip.save().then(trip => res.json(trip));
  });

  //create a current trip
  app.post('/api/createTrip/current', checkJwt, checkScopeCreateTrip, (req,res) => {
    const current = new db.UserCurrent({
      country: req.body.country,
      user_id: req.header.user.split('|')[1],
      date_leave: req.body.date_leave,
      date_back: req.body.date_back,
      budget: req.body.budget,
      spendings: req.body.spendings,
      current: true,
      trip_photo: req.body.trip_photo

    })

    current.save( function (err){
if (err) return hndleError(err);

let spending = new db.Spending({
  spendingName: req.body.spendingName,
  spending: req.body.spending,
  spendingId: current._id
});

spending.save(function(err){ 
  if (err) return hndleError(err);
})
    }).then(currentTrip=> res.json(currentTrip));
  })

  //add photos and spendings budget of current
  app.put('/api/updateCurrent/:id', checkJwt, checkScopeAddPhoto, checkScopeUpdateTrip, (req,res)=>{
    db.UserCurrent.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })

  //update progress
  app.put('/api/tripProgress/:id', checkJwt, checkScopeUpdateTrip, (req,res)=>{
    db.Trips.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })


  //edit current
  app.patch('/api/updateCurrent/:id', checkJwt, checkScopeUpdateTrip, (req,res)=>{
    db.UserCurrent.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })

  //edit Trips
  app.patch('/api/editTrip/:id', checkJwt, checkScopeUpdateTrip, (req,res)=>{
    db.Trip.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })

  //delete a trip
  app.delete('/api/deleteTrip/:id', checkJwt, checkScopeDeleteTrip, (req,res)=> {
    db.Trips.findbyId(req.params.id)
        .then(trip => trip.remove().then(()=> res.json({success:true})))
        .catch(err=> res.status(404).json({success: false}))
  })
}
