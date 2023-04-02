// middleware/deliveryAddressMiddleware.js

function deliveryAddressValidation(req, res, next) {
    const address = req.body;

    if (!address.addressLine1) {
      return res.status(400).json({ error: "addressLine1 is required." });
    }

    if (!address.city) {
      return res.status(400).json({ error: "city is required." });
    }
  
    if (!address.state) {
      return res.status(400).json({ error: "state is required." });
    }

    if (!address.country) {
      return res.status(400).json({ error: "country is required." });
    }

    if (!address.postalCode) {
      return res.status(400).json({ error: "postalCode is required." });
    }
  
    next();
  }
  
  module.exports = deliveryAddressValidation;
  