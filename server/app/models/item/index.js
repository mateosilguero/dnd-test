import mongoose, { Schema } from 'mongoose';
import attributes from './attributes';

const ItemSchema = new Schema({
	...attributes
}, { timestamps: true });

ItemSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  },
});

/**
 * Item Methods
 */
ItemSchema.methods = {
  
};

/**
 * Item Static Methods
 */
ItemSchema.statics = {
  
};

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;