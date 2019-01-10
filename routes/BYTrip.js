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


};