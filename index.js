const express = require('express')
const app = express()
var bodyParser = require("body-parser");
const request = require('request');
const uuidv4 = require('uuid/v4');

var cors = require('cors');
var port = process.env.PORT || 3000;

var subscriptionKey =  '5085fd39921f48a7ae74185c7210480e';
var endpoint = 'https://api.cognitive.microsofttranslator.com';
//'https://vijay.cognitiveservices.azure.com/sts/v1.0/issuetoken';


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    return res.status(201).json("Language API Working");
})

app.post('/translate', function (req, res) {

  let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'to': req.body.languages
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
          'text': req.body.text
    }],
    json: true,
};
request(options, function(err, body){
  if(body){
    return res.status(201).json(body);
  }
  else{
    return res.status(201).json(err);
  }
});
})

app.post('/detect', function (req, res) {
  console.log(req.body);
  let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'detect',
    qs: {
      'api-version': '3.0',
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
          'text': req.body.text
    }],
    json: true,
};
console.log(options);
 request(options, function(err, body){
  if(body){
    console.log(body);
    return res.status(201).json(body);
  }
  else{
    return res.status(201).json(err);
  }

});
  
})






app.listen(port);