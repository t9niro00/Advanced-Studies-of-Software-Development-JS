const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../server');
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const serverAddress = "http://localhost:3000";
const weatherInfoArraySchema = require('../schemas/weatherInfoArray.schema.json');


describe('Weather API Tests', function() {

  before(function() {
    server.start();
  });

  after(function() {
    server.close();
  })

  describe('GET /weather', function() {
    it('should return all weather data', function(done) {
      // send http request
      chai.request(serverAddress)
        .get('/weather')
        .end(function(err, res) {
          expect(err).to.be.null;
          // check response status
          expect(res).to.have.status(200);

          // check response data structure
          expect(res.body).to.be.jsonSchema(weatherInfoArraySchema)
          done();
        })
    })
  })

  describe('Add new weather data', function() {

    it('should accept weather data when data is correct', function(done) {
      chai.request(serverAddress)
        .post('/weather')
        .send({
          sensorId: 1,
          cityCode: "2222",
          temperature: 10.6,
          windSpeed: 0.7
        })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        })
    })
    it('should reject request with missing fields from data structure', function(done) {
      chai.request(serverAddress)
        .post('/weather')
        .send({
          sensorId: 1,
          temperature: 10.6,
          windSpeed: 0.7
        })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
    it('should reject request with incorrect data types', function(done) {
      chai.request(serverAddress)
        .post('/weather')
        .send({
          sensorId: 1,
          cityCode: "222",
          temperature: null,
          windSpeed: 0.7
        })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
    it('should reject empty post requests', function(done) {
      chai.request(serverAddress)
        .post('/weather')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        })
    })
    it('should contain added weather data ', function(done) {
      chai.request(serverAddress)
        .get('/weather')
        .end(function(err, res) {
          expect(err).to.be.null;
          // check response status
          expect(res).to.have.status(200);

          // check response data structure
          let found = false;
          for(let i=0; i<res.body.length; i++) {
            if((res.body[i].sensorId == 1) &&
              (res.body[i].cityCode == "2222") &&
              (res.body[i].temperature == 10.6) &&
              (res.body[i].windSpeed == 0.7)) {
                found = true;
                break;
              }
          }

          if(found == false) {
            assert.fail('Data not saved');
          }
          done();
        })

    })

  })
})
