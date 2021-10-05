const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const Ajv = require('ajv');
const ajv = new Ajv();
const port = 3000

app.use(bodyParser.json());

const weatherInfoSchema = require('./schemas/weatherInfo.schema.json');
const weatherInfoValidator = ajv.compile(weatherInfoSchema);

const weatherInfoValidateMw = function(req, res, next) {
  const validationResult = weatherInfoValidator(req.body);
  if(validationResult == true) {
    next();
  } else {
    console.log(weatherInfoValidator.errors);
    res.status(400).json({
      errorDescription: weatherInfoValidator.errors[0].message,
      errorInfo: weatherInfoValidator.errors[0].instancePath
    });
  }
}

const weatherData = [
  {
    "sensorId": 457722345732,
    "cityCode": "234gf334636",
    "temperature": 23.4,
    "windSpeed": 3.4
  }
];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/weather', (req, res) => {
  res.json(weatherData);
})

app.post('/weather', weatherInfoValidateMw, (req, res) => {
  weatherData.push({
    sensorId: req.body.sensorId,
    cityCode: req.body.cityCode,
    temperature: req.body.temperature,
    windSpeed: req.body.windSpeed
  });
  res.sendStatus(201);
})

app.use(function (err, req, res, next) {
  console.log(err);
  console.log('---');
  console.error(err.stack)
  res.status(500).send({ errorMessage: err.message });
})




module.exports = {
  start: function (){
    serverInstance = app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  },
  close: function (){
    serverInstance.close()
  }
}