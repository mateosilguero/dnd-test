import BaseController from './base.controller';
import Item from '../models/item';

class ItemController extends BaseController {

  enableList = [ ];

  getAll = async (req, res, next) => {
    try {      
      let items = await Item.find();
      res.json(items);
    } catch(err) {
      next(err);
    }
  }

  getByID = async (req, res, next) => {
    const { id } = req.params;
    try {
      let item = await Item.findById(id);

      if (!item) {
        const err = new Error('Not found.');
        err.status = 404;
        throw err;
      }

      res.json(item);
    } catch(err) {
      next(err);
    }
  }

  create = async (req, res, next) => {
    let newItem = new Item({
      ...req.body,
      index: req.body.index || await Item.count()
    });
    try {
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch(err) {
      err.status = 400;
      next(err);
    }
  }

  update = async (req, res, next) => {
    const { id } = req.params;
    try {
      let updated = await Item.findOneAndUpdate({ _id: id }, { ...req.body });
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }

  delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      let item = await Item.remove({ _id: id });
      res.status(201).json(item);
    } catch(err) {
      err.status = 400;
      next(err);
    }
  }

}

export default new ItemController();
