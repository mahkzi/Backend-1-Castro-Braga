const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'productos'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

const CartModel = mongoose.model('carts', cartSchema);
module.exports = CartModel;