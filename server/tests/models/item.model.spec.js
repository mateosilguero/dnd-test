import { expect } from 'chai';
import server from '../utils/server.mock';
import Item from '../../app/models/item';
import ItemFactory from '../factories/item.factory';

let savedBrand;
let defaultItem = ItemFactory.generate();

describe('Model: Item', () => {
  before(done => {
    try {
      let item = new Item(defaultItem);        
      item.save();
      done()
    } catch(err) {      
      done(err);
    }
  });
});
