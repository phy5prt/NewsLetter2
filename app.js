//jshint esversion: 6

//functionals

var mailChimpApiKey = "";
var mailChimpListID =  "";
var mailChimpApiZone="";

//template functionals
// mailChimpApiZone = "";
// mailChimpApiKey = "";
// mailChimpListID =  "";

//delete functionals
mailChimpApiZone = "";
mailChimpApiKey = "";
mailChimpListID =  "";



//build secret url
var startChimpURL= "https://";
var middleChimpURL= ".api.mailchimp.com/3.0/lists/";
var mailChimpURL = startChimpURL + mailChimpApiZone + middleChimpURL + mailChimpListID;
var authorizationForChimp = "anyStringWillDoThenSpace " + mailChimpApiKey;

 // members not member because have to use the key word that fit the api of mail chimp so it can recognise what were posting setInterval(function () {
//this is why we need to have arrays aswell despite only sending one person worth of data
//it needs it as json too




//setup
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res){

res.sendFile(__dirname+"/signup.html");


} );

app.post("/", function(req,res){

var firstName = req.body.fName;
var secondName = req.body.sName;
var emailAddress = req.body.emailAddress;
  // console.log(firstName + secondName + emailAddress);


var data = {
  members: [
    {
      email_address: emailAddress,
      status: "subscribed",
      merge_fields:{
        "FNAME": firstName,
        "LNAME": secondName
      }

    }
  ]
  };
  var jsonData = JSON.stringify(data);

  var options = {
  url: mailChimpURL,
  method: "POST",
  headers:{
    "Authorization": authorizationForChimp,
  },


//comment out below to test the signup failure
  body: jsonData
};


//headers is the authentification


request(options,function(error,response,body){
if(error){
  res.sendFile(__dirname+"/failure.html");
}else{ if(response.statusCode ===200){
  res.sendFile(__dirname+"/success.html");
}else{
  res.sendFile(__dirname+"/failure.html");
}}

});
});

app.post("/failure",function(req,res){

res.redirect("/");

});
//commented is local process env allows horuku to do it
//the OR allows it to run local too
// app.listen(3000, function(){
app.listen(process.env.PORT || 3000, function(){
console.log("newsletter server started");

});
