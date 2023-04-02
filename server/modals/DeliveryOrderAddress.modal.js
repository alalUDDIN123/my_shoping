const mongoose = require("mongoose")


const deliveryAddressSchema = mongoose.Schema({
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
});

const deliveryAddressModel= mongoose.model("deliveryAddres",deliveryAddressSchema)
module.exports=deliveryAddressModel