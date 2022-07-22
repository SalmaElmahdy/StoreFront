import express, { Request, Response } from 'express'

import { DashboardQueries } from '../services/dashboard'
import { verifyToken } from "../middleware/auth";

import dotenv from "dotenv";

dotenv.config();

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders/:id', verifyToken,productsInOrders)
}

const dashboard = new DashboardQueries()

const productsInOrders = async (_req: Request, res: Response) => {
  try{
    const products = await dashboard.current_order_by_user(_req.params.id)
  res.json(products)}
  catch(error){
    res.status(400);
    res.json(error);
    
  }
}

export default dashboardRoutes