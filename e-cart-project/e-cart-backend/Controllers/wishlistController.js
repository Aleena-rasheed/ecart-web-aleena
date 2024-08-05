const carts = require('../Models/cartSchema');
const wishlists=require('../Models/wishlistSchema')

// add to wishlist

exports.addWishlist=async(req,res)=>{
    // get a product id
    const {id,title,price,image}=req.body
console.log("Inside the add to wishlistcontroller");
    // get a user id
    const userId = req.payload
    // add deatsils of the product to the db
    try{
        const existingProduct = await wishlists.findOne({id})
        console.log(existingProduct);
        if(existingProduct){
            res.status(404).json("Product already Exists")
        
        }
        else{
            const newProduct=new wishlists({ id,title,price,image,userId  })
            await newProduct.save()
            res.status(200).json("Product Added Successfully")
        }
       
    }
    catch(err){
        res.status(500).json({error: err})
    }
}

// getwishlist
exports.getwishlist=async(req,res)=>{
    try{
        const products=await wishlists.find();
        if(products)
        {
         res.status(200).json(products)   
        }
        else{
            res.status(404).json("empty wishlist")
        }
    }
    catch(err)
    {
        res.status(500).json({error :err})
}
}

exports.deleteFromWishlist=async(req,res)=>{
    const{id}=req.params
    try{
        const deleteItem=await wishlists.deleteOne({id})
        if(deleteItem){
            const wishlistProduct=await wishlists.find()
           res.status(200).json(wishlistProduct)

        }
    }
    catch(err){
        res.status(500).json("error",err)
    }
}

   