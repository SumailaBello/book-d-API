import mongoose, {Schema} from 'mongoose';

const uri = "mongodb+srv://sumailabello:TfaDK8RTcnTpqia6@cluster0.trbyjlf.mongodb.net/?retryWrites=true&w=majority";
export const connectToDb = async ()=> {
    try {
        await mongoose.connect(uri);
        console.log("connected to mongodb");
    } 
    catch (err) {
        console.log(err);
    }
}

// const userSchema = new Schema({
//     username: String,
//     password: String,
// })

// connectToDb();

// export const UserModel = mongoose.model("User", userSchema);