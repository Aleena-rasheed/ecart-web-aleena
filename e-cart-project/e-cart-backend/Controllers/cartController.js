const carts = require('../Models/cartSchema')

exports.addToCart = async (req, res) => {
    // get a product id
    const { id, title, price, image, quantity } = req.body

    // get a user id
    const userId = req.payload
    console.log(userId);
    // add deatsils of the product to the db
    try {
        const cartitem = await carts.findOne({ id })
        console.log(cartitem);
        if (cartitem) {
            cartitem.quantity += 1
            cartitem.grandTotal = cartitem.quantity * cartitem.price
            res.status(200).json("Product updated successfully")

        }
        else {
            grandTotal=price;
            const newProduct = new carts({ id, title, price, image, quantity,grandTotal })
            await newProduct.save()
            res.status(200).json("Product Added Successfully")
        }

    }
    catch (err) {
        console.log("Add To Cart :", err);
        res.status(404).json({ error: err })
    }

}
exports.getCart = async (req, res) => {
    try {

        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)
    }
    catch (err) {
        res.status(402).json(err)

    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        const deleteItem = await carts.deleteOne({ id })
        if (deleteItem) {
            const cartProducts = await carts.find()
            res.status(200).json(cartProducts)

        }
    }
    catch (err) {
        res.status(404).json(err)
    }
}
exports.incrementCart = async (req, res) => {
    const { id } = req.params
    try {
        const incrementCartProduct = await carts.findOne({ id })
        if (incrementCartProduct) {
            incrementCartProduct.quantity += 1
            incrementCartProduct.grandTotal = incrementCartProduct.price * incrementCartProduct.quantity
            await incrementCartProduct.save()
            const allCartProducts = await carts.find()
            res.status(200).json(allCartProducts)
        }
        else {
            res.status(402).json("Item not Found")
        }
    }
    catch (err) {
        res.status(404).json(err)
    }

}
exports.decrementCart = async (req, res) => {
    const { id } = req.params
    try {
        //check if product already exists
        const decrementCartProduct = await carts.findOne({ id })
        //if product already exists, then decrement product quantity by 1 and update the price accordingly
        if (decrementCartProduct) {
            decrementCartProduct.quantity -= 1
            if (decrementCartProduct.quantity == 0) {
                //if product quantity is 0, then delete product from cart
                const deleteCartProduct = await carts.deleteOne({ id })
                if (deleteCartProduct) {
                    const allCartProducts = await carts.find()
                    res.status(200).json(allCartProducts)
                }
            }
            else {
                //if product quantity is not 0, then update price accordingly
                decrementCartProduct.grandTotal = decrementCartProduct.price * decrementCartProduct.quantity
                //if its updated,then stored to mongodb
                await decrementCartProduct.save()
                //get all the products item details after updating
                const allCartProducts = await carts.find()
                res.status(200).json(allCartProducts)
            }
        }
        else {
            res.status(402).json("item not found")
        }
    }
    catch (err) {
        res.status(404).json(err)
    }

}