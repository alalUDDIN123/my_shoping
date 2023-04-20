const deliveryAddressModel = require("../modals/DeliveryOrderAddress.modal");


const createDeliveryAddress = async (req, res) => {
  const { addressLine1, addressLine2, city, state, country, postalCode,userId } = req.body;

  try {
    const deliveryAddress = new deliveryAddressModel({
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
      user:userId
    });

    await deliveryAddress.save();
    res.status(201).send({ message: "Delivery address created successfully",hint:"deSuces"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports =  createDeliveryAddress ;
