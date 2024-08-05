const products=require('../Models/productSchema')
// get all products
exports.getAllProducts=async(req,res)=>{
    try{
        const allProducts=await products.find()
        res.status(200).json(allProducts)

    }
    catch(err){
        res.status(404).json(err)
    }
}

// get particular product
exports.getProduct=async(req,res)=>{
    const{id}=req.params;
    try{
       const getAProduct=await products.findOne({id})
        res.status(200).json(getAProduct)
       

    }
    catch(err){
       res.status(404).json(err)

    }
    
}