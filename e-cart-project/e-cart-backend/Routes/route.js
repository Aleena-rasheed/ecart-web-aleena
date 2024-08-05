const express=require('express')
const router=new express.Router()

const productController=require('../Controllers/productController')
const userController=require('../Controllers/userController')
const wishlistController=require('../Controllers/wishlistController')
const cartController=require('../Controllers/cartController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

//Get allProducts
router.get('/all-products',productController.getAllProducts)

//Register
router.post('/user/register',userController.register)

//Login
router.post('/user/login',userController.login)


// get a particulat product
router.get('/view-product/:id',productController.getProduct)

//Add to wishlist
router.post('/wishlist', jwtMiddleware,wishlistController.addWishlist)

// //Get a wishlist item
router.get('/get-wishlist',wishlistController.getwishlist)



//delete a wishlist Item
router.delete('/delete-wishlist/:id',jwtMiddleware,wishlistController.deleteFromWishlist)


//Add To Cart
router.post('/addtocart',jwtMiddleware,cartController.addToCart)

//Get All Cart Products
router.get('/get-cart',jwtMiddleware,cartController.getCart)

// delete Cart
router.delete('/delete-cart/:id',jwtMiddleware,cartController.deleteProduct)
// increment
router.get('/increment-cart/:id',jwtMiddleware,cartController.incrementCart)
// decrement
router.get('/decrement-cart/:id',jwtMiddleware,cartController.decrementCart)

module.exports=router
