import Express,{Request,Response } from "express";
import { verifyToken } from "../middleware/auth";
import { product, ProductStore } from "../models/product";
import dotenv from "dotenv";

dotenv.config();
const jwt = require('jsonwebtoken');

const store=new ProductStore();

const index= async (_req:Request,res:Response)=>{

    try{
        const products= await store.index();
    res.json(products);
    }
   catch(error){
     res.status(400);
     res.json(error);
     
   }
    
};

const show = async (req: Request, res: Response) => {

    try{
        const product = await store.show(req.params.id)
    res.json(product)
    }
   catch(error){
     res.status(400);
     res.json(error);
     
   }
    
 }

 const create = async (req: Request, res: Response) => {

    try {
        const prod: product = {
            id:1,
            name: req.body.name,
            price:req.body.price,
            category:req.body.category}
        
        const newProduct = await store.create(prod)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
        console.log(err)
    }
}


const product_store_routes= (app:Express.Application)=>{
    app.get('/products',index);
    app.get('/products/:id', show)
    app.post('/products',verifyToken, create)
   
}

export default product_store_routes;