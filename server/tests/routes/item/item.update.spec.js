import { expect } from 'chai';
import server from '../../utils/server.mock';
import Constants from '../../../app/config/constants';
import ItemFactory from '../../factories/item.factory';
import Item from '../../../app/models/item';

let url = `${Constants.apiPrefix}/items`;
let testItem;

describe(`PUT ${url}`, () => {
  before(() => (
    Item.remove({})
      .then(() => Item.create(ItemFactory.generate()))
      .then(i => testItem = i)
  ));

  describe('#201', () => {
    it('deleted ok', done => {
      let updatedObject = { ...defaultBrandPayload };
      updatedObject.description = 'differentValue';
      server.delete(`${url}/${testItem.id}`)
        .send(updatedObject)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(defaultBrandPayload.description).to.not.equal(res.body.description);
          done();
        });
    });
  });
});
