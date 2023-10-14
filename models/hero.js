import  {Schema, model, models} from "mongoose";

const heroSchema = new Schema({
    creator: {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    type: {
        type: String,
        require: false,
    },
    title: {
        type: String,
        require: [true, 'title is required.'],
    },
    desc: {
        type: String,
        require: [true, 'Description is requires.'],
    },
    image: {
        type: String,
        required: [true, 'At least one image is required.'],
    },
    bgimage: {
        type: String,
        required: false,
    },
    button: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Sports'], // Enum to restrict the category to certain values
        required: false,
    }
});
const Hero = models.hero || model('Hero', heroSchema);

export default Hero;