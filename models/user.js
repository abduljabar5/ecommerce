import bcrypt from 'bcryptjs'
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_• ])(?!.*[_•]{2,})[a-zA-Z0-9._]+(?<![_•])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
    
});

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
  
UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = models.User || model("User", UserSchema);

export default User;
