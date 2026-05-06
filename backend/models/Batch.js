import mongoose from "mongoose"; 

const measurementSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    sugarLevel: Number,
    temperature: Number,
    actionType: {
        type: String,
        enum: ['measured', 'added_water', 'added_yeast', 'racked', 'bottled'],
        default: 'measured'
    },
    note: String,
});

const batchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['wine', 'mead', 'cider', 'other'],
        default: 'wine'
    },
    baseIngredient: String, 
    targetStyle: {
        type: String,
        enum: ['dry', 'semi-sweet', 'sweet'],
        default: 'dry'
    },
    volumeLiters: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['fermenting', 'aging', 'bottled', 'archived'],
        default: 'fermenting'
    },
    measurements: [measurementSchema],
}, {
    timestamps: true
});

export default mongoose.model('Batch', batchSchema)