import Express,{Request,Response } from "express";
import { orders, OrderStore,order_products } from "../models/orders";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/auth";

dotenv.config();

const orderStore=new OrderStore();

const create = async (req: Request, res: Response) => {

    try {
        const order: orders = {
            id:1,
            user_id: req.body.user_id,
            status:req.body.status
            }
        
        const newOrder = await orderStore.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
        console.log(err)
    }
}

const add_product_to_order= async(req:Request,res:Response)=>{
    try{
        const add_new_prod_to_order:order_products={
            id:1,
            quantity:req.body.quantity,
            order_id:req.body.order_id,
            product_id:req.body.product_id,

        }
        const new_order = await orderStore.addProduct(add_new_prod_to_order)
        res.json(new_order)

    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const order_store_routes= (app:Express.Application)=>{
   
    app.post('/add_prod_order',verifyToken,add_product_to_order);
    app.post('/orders',verifyToken,create)
    
}

export default order_store_routes;