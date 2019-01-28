const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const db = require('../models/index');
const express = require ('express');
const router = express.Router();


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


    
 // testing post route
 router.post('/admin', (req, res)=> {
   db.Users.create(req.body).then(trips => console.log(res.json(trips)))
    .catch(err => res.status(422).json(err));
});

  // pushing to trips
  // router.post('/admin', (req, res)=> {
  //   db.Users.findOneAndUpdate({user_id: 108926452875239060000},
  //    {"$push" :{
  //     trips:[{
  //       country: "Philipples",
  //     date_leave: "01/27/2019",
  //     date_back: "01/30/2019",
  //     totalCost: 5000,
  //     }]
  //    }},{"upsert": true }
  //   ) .then(trips => console.log(res.json(trips)))
  //   .catch(err => res.status(422).json(err));
  // });

  //updating current trips
  // router.post('/admin', (req, res)=> {
  //   db.Users.findOneAndUpdate({user_id: 108926452875239060000},
  //    {
  //     current: [
  //       {
  //         country: "philippnes",
  //         date_leave: "01/20/2019",
  //         date_back: "01/26/2019",
  //         budget: 3000,
  //         budgetToUpdate: 3000,
  //         user_id: 108926452875239055842,
  //         totalCost: 3000,
  //         spending: [{
  //           spending: 3,
  //           spendingName:'iceCream',
  //         user_id: 108926452875239055842,
  //         }],
  //       }
  //     ]
  //    }
  //   ) .then(trips => console.log(res.json(trips)))
  //   .catch(err => res.status(422).json(err));
  // });

  // updating spending
  // router.post('/admin', (req, res)=> {
  //     db.Users.findOneAndUpdate({user_id: 108926452875239060000},
  //       {"$push":{
  //         spending: [{
  //           spending: 1,
  //           spendingName: 'candy'
  //         }]
  //       }},{"upsert": true }
  //     ) .then(trips => console.log(res.json(trips)))
  //     .catch(err => res.status(422).json(err));
  //   }); 



  //get all trips user saved
  router.get('/viewTrip/:user_id',checkJwt,checkScopeViewTrip, (req,res)=>{
    // const user_id = req.params.user_id;
    // console.log(userId)
    db.Users.find({user_Id:req.query.user_id})
        .sort({date: -1})
        .then(user=>res.json(user))
        .catch(err => res.status(422).json(err));
  });
   

//get all trips user saved
  router.get('/viewTrip/:user_id',checkJwt,checkScopeViewTrip, (req,res)=>{
    // const user_id = req.params.user_id;
    // console.log(userId)
    db.Users.find({user_Id:req.query.user_id})
        .sort({date: -1})
        .then(trip=>res.json(trip))
        .catch(err => res.status(422).json(err));
  });

  //get current trip
  router.get('/viewCurrent/:id',checkJwt,checkScopeViewTrip, (req,res)=>{
    db.UserCurrent.find({current:true})
        .sort({date: -1})
        .then(trip=>res.json(trip))
        .catch(err => res.status(422).json(err));
  });



//create a trip
  router.post('/createTrips', checkJwt, checkScopeCreateTrip, (req,res)=>{
    db.Users.create(req.body)
    .then(trips => console.log(res.json(trips)))
    .catch(err => res.status(422).json(err));
  });

  //create a current trip
  router.post('/createTrip/current', checkJwt, checkScopeCreateTrip, (req,res) => {
    db.UserCurrent.create(req.body)
    .then(trips => console.log(res.json(trips)))
    .catch(err => res.status(422).json(err));
  })

 

  //add photos and spendings budget of current
  router.put('/updateCurrent/:id', checkJwt, checkScopeAddPhoto, checkScopeUpdateTrip, (req,res)=>{
    db.UserCurrent.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })

  //update progress
  router.put('/tripProgress/:id', checkJwt, checkScopeUpdateTrip, (req,res)=>{
    db.Trips.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })


  //edit current
  router.patch('/updateCurrent/:id', checkJwt, checkScopeUpdateTrip, (req,res)=>{
    db.UserCurrent.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })

  router.patch('/updateTrip/:id', checkJwt, checkScopeUpdateTrip, (req,res)=>{
    db.Trips.findOneAndUpdate({_id: req.params.id},req.body, (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
    })
  })

  //edit Trips
  router.patch('/editTrip/:id', checkJwt, checkScopeUpdateTrip, (req,res)=>{
    db.Trip.findOneAndUpdate({_id: req.params.id},req.body)
    .then(UserCurrent=> res.json(UserCurrent))
    .catch(err=>res.status(422).json(err));
  })

  //delete a trip
  router.delete('/deleteTrip/:id', checkJwt, checkScopeDeleteTrip, (req,res)=> {
    db.Trips.findbyId(req.params.id)
        .then(trip => trip.remove().then(()=> res.json({success:true})))
        .catch(err=> res.status(404).json({success: false}))
  });

  module.exports = router;
