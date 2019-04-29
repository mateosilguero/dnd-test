import * as chai from 'chai';
import server from '../utils/server.mock';
import Constants from '../../app/config/constants';

const expect = chai.expect;

let url = `${Constants.apiPrefix}`;

describe('GET /', () => {
  describe('#200', () => {
    it('should return json', (done) => {      
      server.get(url)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.type).to.eql('application/json');
          done();
        })
    });

    it('should return the API version', (done) => {
      server.get(url)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.version).to.eql(Constants.version);
          done();
        });
    });
  });
});

describe('GET /health', () => {
  describe('#200', () => {
    it('should return #200', (done) => {      
      server.get(url+'/health')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        })
    });
  });
});
