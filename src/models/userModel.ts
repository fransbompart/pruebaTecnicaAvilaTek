import { Document, Model, Schema, model} from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
}

export const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true    
    },
    password: {
        type: String,
        required: true        
    },
    isLoggedIn: {
        type: Boolean,
        required: true
    }
});

export const userModel: Model<IUser> = model<IUser>('User', UserSchema);