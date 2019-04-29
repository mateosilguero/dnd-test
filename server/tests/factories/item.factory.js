import faker from 'faker';

class BrandFactory {
  generateList(count, attrs = {}) {
    let list = []
    while(count) {
      list.push(this.generate(attrs));
      count--;
    }
    return list;
  }

  generate(attrs) {
    return Object.assign({}, {
      description: 'item desc'
    }, attrs);
  }
}

export default new BrandFactory();
