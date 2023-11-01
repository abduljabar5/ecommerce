import  {Schema, model,models} from "mongoose";

const promptSchema = new Schema({
    creator: {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    name: {
        type: String,
        require: [true, 'name is required.'],
    },
    desc: {
        type: String,
        require: [true, 'Description is requires.'],
    },
    images: [{
        type: String,
        required: [true, 'At least one image is required.'],
    }],
    price: {
        type: Number,
        require: [true, 'Price is requires.'],
    },
    discount: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Sports'],
        required: [true, 'Category is required.'],
    }
});
const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;