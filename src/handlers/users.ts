import Express,{Request,Response } from "express";
import { verifyToken } from "../middleware/auth";
import { users, UserStore } from "../models/users";
import dotenv from "dotenv";

dotenv.config();
const jwt = require('jsonwebtoken');

const userStore=new UserStore();


const index= async (_req:Request,res:Response,)=>{
    try{
        const allUsers= await userStore.index();
       res.json(allUsers);
    }
   catch(error){
     res.status(400);
     res.json(error);
     
   }
};

const show = async (req: Request, res: Response) => {
    try{
        const currentUser = await userStore.show(req.params.id)
        res.json(currentUser)
    }
   catch(error){
     res.status(400);
     res.json(error);
     
   }
    
 }


 const create = async (req: Request, res: Response) => {
    try {
        const new_user:users = {
            id:1,
            first_name: req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password
        }

        const newUser = await userStore.create(new_user)

        var token = jwt.sign({ user: newUser }, (process.env.TOKEN_SECRET as unknown)as string);
        

        res.json(token)
        
    } catch(err) {
        res.status(400)
        res.json(err)

        console.log("error in handlers create user:::::"+err);
    }
}

const user_store_routes= (app:Express.Application)=>{
    app.get('/users',verifyToken,index);
    app.get('/users/:id',verifyToken, show)
    app.post('/users', create)
    
}

export default user_store_routes;