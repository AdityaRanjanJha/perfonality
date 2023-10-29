const mongoose = require('mongoose');

//outodoor
/* music
dog cat
travel
date night
looking for relationship
smoke or drink
 */

const dataSchema = new mongoose.Schema({
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
