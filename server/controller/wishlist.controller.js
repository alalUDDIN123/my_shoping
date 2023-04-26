
const Wishlist = require("../modals/wishlist.modal");

// create wislist or add to wishlist 👍👍👍👍


const addToWishList = async (req, res) => {
    const { userId, productId } = req.body;

    if (!productId) {
        return res.status(400).json({ msg: "productId required" });
    }

    try {
        // Find all the user's wishlists
        const wishlists = await Wishlist.find({ userId });

        // Check if the product is already in any of the user's wishlists
        let productExists = false;
        for (let i = 0; i < wishlists.length; i++) {
            const wishlist = wishlists[i];
            if (wishlist.products.some(p => p.productId.toString() === productId.toString())) {
                productExists = true;
                break;
            }
        }

        if (productExists) {
            return res.status(400).json({ msg: "Product already in wishlist" });
        }

        // If the product is not in any of the user's wishlists, create a new wishlist 
        const newWishlist = new Wishlist({
            userId,
            products: [
                {
                    productId: productId
                }
            ],
        });
        await newWishlist.save();
        return res.status(201).json({ msg: "Wishlist created" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", err: error.message });
    }
};


// get wishlist 👍👍👍👍
const getWishlist = async (req, res) => {
    const { userId } = req.body

    try {
        // Find the user's wishlist and populate 
        const wishlist = await Wishlist
            .find({ userId })
            .populate({
                path: 'products.productId',
                model: 'product'
            })
            .lean();

        //  console.log("wishlist::-",wishlist);   
        if (!wishlist || wishlist.length === 0 ) {
            return res.status(404).send({ msg: 'Wishlist not found' });
        } else {
            return res.status(200).json({ wishlist });
        }
    } catch (error) {
        res.status(500).json({ msg: "Server error", err: error.message });
    }
}


// remove wishlist 👍👍👍👍

const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;

    if(!productId){
        return res.status(400).json({ msg: "productId required" });
    }

    try {
        // Find all wishlists of the user
        const wishlists = await Wishlist.find({ userId });
       

        // Check if the user has any wishlists
        if (!wishlists || wishlists.length === 0 || wishlists[0].products.length === 0) {
            return res.status(404).send({ msg: 'Wishlist not found' });
        }

        // Loop through all wishlists to find the product to remove
        for (let i = 0; i < wishlists.length; i++) {
            // console.log("wishlists of i",wishlists[i]);
            const wishlist = wishlists[i];
            const productIndex = wishlist.products.findIndex(p => p.productId.toString() === productId.toString());

            if (productIndex !== -1) {
                // Remove the product from the wishlist
                wishlist.products.splice(productIndex, 1);
                await wishlist.save();

                return res.status(200).json({ msg: "Product removed from wishlist", hint: "reSuc" });
            }else{
                return res.status(404).json({ msg: "Product not found in wishlist" });
            }
        }
  

    } catch (error) {
        res.status(500).json({ msg: "Server error", err: error.message });
    }
};



module.exports = {
    addToWishList,
    getWishlist,
    removeFromWishlist
}