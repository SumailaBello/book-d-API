import mongoose, { SchemaTypeOptions } from "mongoose";
// import { uuidv4 } from 'uuid';

const {Schema, model} = mongoose;

// const emailSchema = Schema({
//     type: String,
//     required: true,
//     lowercase: true,
//     minLength: 3,
//     validate: {
//         validator: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v.toLowerCase()),
//         message: "Provided email is invalid",
//     }
// })

const userSchema = new Schema({ 
    uuid: {
        required: true,
        type: String,
        // default: uuidv4.
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
        validate: {
            validator: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v.toLowerCase()),
            message: "Provided email is invalid",
        },
        trim: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
    },
    verified: {
        type: Boolean,
        // required: true,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    sales: {
        type: Number,
        default: 0,
    },
    availability: [Date],

});

//ADDING A MIDDLEWARE BEFORE AN ACTION
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next() // move to next middleware
})

// //ADDING METHODS TO THE SCHEMA
// userSchema.methods.sayHi = function() {
//     console.log(`Hi my name is ${this.name}`);  //works only on schema
// }

// //ADDING METHOD TO THE MODEL ITSELF VIA STATIC METHOD
// userSchema.statics.findByName = function(name) {
//     return this.find({name: new RegExp(name, i)})
// }

// userSchema.query.byName = function (name) {
//     return this.where({name: new RegExp(name, "i")})
// }

// //ADDING A VIRTUAL PROPERTY
// userSchema.virtual('namedEmail').get(function () {
//     return `${this.name} <${this.email}>`
// })

//ADDING A MIDDLEWARE AFTER AN ACTION
// userSchema.post('save', function(doc, next) {
//     // doc represents object that has been saved
//     doc.sayHi();
//     this.updatedAt = Date.now();
//     next() // move to next middleware function
// })

export const userModel = model("User", userSchema);

// EXAMPLE OF USING ABOVE CUSTOM METHODS
// userModel.findByName('Kyle') //works directly on the model 

// userModel.find().byName('') // requires a query to call it