const deliveryAddressModel = require("../modals/DeliveryOrderAddress.modal");


const createDeliveryAddress = async (req, res) => {
  const { addressLine1, city, state, country, postalCode } = req.body;

  try {
    const deliveryAddress = new deliveryAddressModel({
      addressLine1,
      city,
      state,
      country,
      postalCode
    });

    await deliveryAddress.save();
    res.status(201).send({ message: "Delivery address created successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports =  createDeliveryAddress ;
