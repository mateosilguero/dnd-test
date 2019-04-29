import { expect } from 'chai';
import server from '../../utils/server.mock';
import Constants from '../../../app/config/constants';
import ItemFactory from '../../factories/item.factory';

let url = `${Constants.apiPrefix}/items`;

describe(`POST ${url}`, () => {
  describe('#201', () => {
    it('saved ok', done => {
      server.post(url)
        .send(UserFactory.generate())
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.description).to.be.defined;
          done();
        });
    });
  });
});
