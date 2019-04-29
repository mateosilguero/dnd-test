import { expect } from 'chai';
import server from '../../utils/server.mock';
import Constants from '../../../app/config/constants';
import ItemFactory from '../../factories/item.factory';
import Item from '../../../app/models/item';

let url = `${Constants.apiPrefix}/items`;
let testItem;

describe(`DELETE ${url}`, () => {
  before(() => (
    Item.remove({})
      .then(() => Item.create(ItemFactory.generate()))
      .then(i => testItem = i)
  ));

  describe('#201', () => {
    it('deleted ok', done => {
      server.delete(`${url}/${testItem.id}`)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });
});
