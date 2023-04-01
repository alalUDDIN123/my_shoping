const mongoose = require("mongoose");

const forgetPasswordSchema = mongoose.Schema({
    token: {
        type: String,
        trim: true,
       
    },
    expirationDate:{
        type: String,
        trim: true,
       
    },
    
},
    {
        versionKey: false
    })


// user modal 

const forgotModal = mongoose.model("forgetPasswordToken", forgetPasswordSchema);

module.exports = forgotModal

// token,
// expirationDate,