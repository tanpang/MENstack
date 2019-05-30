import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: String,
    userName: String,
    password: String,
});

export default mongoose.model('user', userSchema);