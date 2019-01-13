const request = require('request')



module.exports = function(app) {

 

  // Get detailed cost of specific stuff example - taxi cost
  app.get("/costs/countryhighlights/:country_code", function(req,res){
    console.log("/costs/countryhighlights/" +req.params.country_code)
    request.get({
      url: "https://www.budgetyourtrip.com/api/v3/costs/countryhighlights/" + req.params.country_code,
      headers: {"x-api-key": "vincentayndecastro"}
    }, function(error,response,body){

      res.json(JSON.parse(body))
    })
  })

  //gives a suggested budget for specific category. reference /categories
  app.get("/costs/countryinfo/:country_code", function(req,res){
    console.log("/costs/countryinfo/country_code/" +req.params.country_code)
    request.get({
      url: "https://www.budgetyourtrip.com/api/v3/costs/countryinfo/" + req.params.country_code,
      headers: {"x-api-key": "vincentayndecastro"}
    }, function(error,response,body){

      res.json(JSON.parse(body))
    })
  })

  //search data about locations even with partial search
  app.get("/search/location/:name", function(req,res){
    console.log("/search/location/" +req.params.name)
    request.get({
      url: "https://www.budgetyourtrip.com/api/v3/search/location/" + req.params.name,
      headers: {"x-api-key": "vincentayndecastro"}
    }, function(error,response,body){

      res.json(JSON.parse(body))
    })
  })

    //search specific location data
    app.get("/search/locationdata/:name", function(req,res){
      console.log("/search/locationdata/" +req.params.name)
      request.get({
        url: "https://www.budgetyourtrip.com/api/v3/search/locationdata/" + req.params.name,
        headers: {"x-api-key": "vincentayndecastro"}
      }, function(error,response,body){
  
        res.json(JSON.parse(body))

        // request.get({
        //   url: "https://www.budgetyourtrip.com/api/v3/search/locationdata/" + body.data.latitude + "/" + body.data.longitude,
        //   headers: {"x-api-key": "vincentayndecastro"}
        // }, function(error,response,body2){
        //   res.json(JSON.parse(body2));
        // })

        
      })
    })

    // Retrieves a list of accommodation options near the specified coordinates using lat and long
    app.get("/search/locationdata/:latitude/:longitue", function(req,res){
      console.log("/search/locationdata/" + req.params.latitude + "/" + req.params.longitude)
      request.get({
          url: "https://www.budgetyourtrip.com/api/v3/search/locationdata/" + req.params.latitude + "/" + req.params.longitude,
          headers: {"x-api-key": "vincentayndecastro"}
        }, function(error,response,body){
          res.json(JSON.parse(body));
        })
    })

    // Retrieves a list of accommodation options near the specified searched location
    app.get("/accommodation/search/:name", function(req,res){
      console.log("/search/locationdata/" + req.params.name)
      request.get({
          url: "https://www.budgetyourtrip.com/api/v3/accommodation/search/" + req.params.name,
          headers: {"x-api-key": "vincentayndecastro"}
        }, function(error,response,body){
          res.json(JSON.parse(body));
        })
    })


  
  
  //get travel cost categories
  app.get("/categories", function(req,res){
    console.log("/categories")
    request.get({
      url: "https://www.budgetyourtrip.com/api/v3/categories",
      headers: {"x-api-key": "vincentayndecastro"}
    }, function(error,response,body){

      res.json(JSON.parse(body))
    })
  })

  
  
  
  //get travel cost categories
  app.get("/search/country/:name", function(req,res){
    console.log("/search/country/" + req.params.name)
    request.get({
      url: "https://www.budgetyourtrip.com/api/v3/search/country/" + req.params.name,
      headers: {"x-api-key": "vincentayndecastro"}
    }, function(error,response,body){

      res.json(JSON.parse(body))
    })
  })

  //currency converter
  app.get("/currencies/convert/:from/:to/:amount", function(req,res){
    console.log("/currencies/convert/" + req.params.from + "/" + req.params.to + "/" + req.params.amount)
    request.get({
        url: "https://www.budgetyourtrip.com/api/v3/currencies/convert/" + req.params.from + "/" + req.params.to + "/" + req.params.amount,
        headers: {"x-api-key": "vincentayndecastro"}
      }, function(error,response,body){
        res.json(JSON.parse(body));
      })
  })


};