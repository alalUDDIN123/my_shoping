function validateProduct(req, res, next) {
    const { title, description, image, images, price, category, brand, Stock } = req.body;
  
    if (typeof title !== "string" && title) {
      return res.status(400).json({ error: "Title must be a string" });
    }
  
    if (typeof description !== "string" && description) {
      return res.status(400).json({ error: "Description must be a string" });
    }
  
    if (typeof image !== "string" && image) {
      return res.status(400).json({ error: "Single image link must be a string" });
    }
  
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "Multiple images link must be an array" });
    }
  
    if (typeof category !== "string" && category) {
      return res.status(400).json({ error: "Category must be a string" });
    }
  
    if (typeof brand !== "string" && brand) {
      return res.status(400).json({ error: "Brand must be a string" });
    }
  
    if (price && (typeof price !== "number" || isNaN(price) || price <= 0)) {
      return res.status(400).json({ error: "Invalid price value" });
    }
  
    if (Stock && (typeof Stock !== "number" || isNaN(Stock) || Stock <= 0 || Stock > 5)) {
      return res.status(400).json({ error: "Invalid stock value" });
    }
  
    // if (reviews && reviews.length > 0) {
    //   for (let i = 0; i < reviews.length; i++) {
    //     const { rating } = reviews[i];
    //     if (rating && (typeof rating !== "number" || isNaN(rating) || rating <= 0 || rating > 5)) {
    //       return res.status(400).json({ error: "Invalid rating value" });
    //     }
    //   }
    // }
  
    if (!title) {
      return res.status(400).json({ error: "Please provide product title" });
    }
  
    if (!description) {
      return res.status(400).json({ error: "Please provide product description" });
    }
  
    if (!image) {
      return res.status(400).json({ error: "Please provide product single image link" });
    }
  
    if (!category) {
      return res.status(400).json({ error: "Please provide product category" });
    }
  
    if (!brand) {
      return res.status(400).json({ error: "Please provide product brand" });
    }
    if (!Stock) {
        return res.status(400).json({ error: "Please provide stock number of product" });
      }
    next();
  }
  
  module.exports = validateProduct;
  