process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('Users', () => {


    describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.above(0);
              done();
            });
      });
    });

    let username = `jhon${Math.floor(Math.random() * 9000000000) + 1000000000}`

    describe('/POST user', () => {
        it('it should not POST a user', (done) => {
            const user = {
                username: username,
                first_name: "jhon",
                last_name: "doe",
                email: "jhondoe@gmail.com",
                phone_number: 112520000,
                address_street: "23 Fox Street",
                address_suburb: "Midrand",
                address_city: "Johannesburg",
                address_region: "Gautent",
                address_country: "South Africa",
                address_zip: 2220,
            }
          chai.request(server)
              .post('/api/users/')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
              });
        });
    });

    describe('/Filter user', () => {
        it('it should Filter a user by username', (done) => {
          chai.request(server)
              .get(`/api/user/${username}`)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
              });
        });
    });
  
});