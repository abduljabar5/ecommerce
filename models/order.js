import {Schema, model, models} from "mongoose";

const itemSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: String,
        enum: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Sports'],
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    price: {
        type: Number,
        required: true
    },
    selectedSize: {
        type: String,
        required: true
    },
    selectedColor: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    discountedPrice: {
        type: String,
        required: false
    }
});

const orderSchema = new Schema({
    Data: [itemSchema]
});

const Order = models.Order || model('Order', orderSchema);

export default Order;
