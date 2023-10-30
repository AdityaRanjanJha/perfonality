const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    music:{
        type:Boolean,
        required:true
    },
    dogandcat:{
        type:Boolean,
        required:true
    },
    travel:{
        type:Boolean,
        required:true
    },
    datenight:{
        type:Boolean,
        required:true
    },
    relationship:{
        type:Boolean,
        required:true
    },
    smokeanddrink:{
        type:Boolean,
        required:true
    },
    outdoor:{
        type:Boolean,
        required:true
    },
});

Bool = mongoose.model('Data',dataSchema);
module.exports = Bool;
