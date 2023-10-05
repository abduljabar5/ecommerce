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
    image: {
        type: String,
        require: [true, 'Image is requires.'],
    },
    price: {
        type: Number,
        require: [true, 'Price is requires.'],
    },
    discount: {
        type: Number,
    },
    category: {
        type: String,
        enum: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Sports'], // Enum to restrict the category to certain values
        required: [true, 'Category is required.'],
    }
});
const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;