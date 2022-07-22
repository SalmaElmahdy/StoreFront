import client from "../database";
export type orders={
    id:Number;
    user_id:string;
    status:string;
    
}

export type order_products={
  id:Number;
  quantity:Number;
  order_id:string;
  product_id:string;
}

export class OrderStore{
    
    async create(u: orders): Promise<orders> {
        try {
          // @ts-ignore
          const conn = await client.connect()
          const sql = 'INSERT INTO orders ( user_id , status ) VALUES( $1 , $2 ) RETURNING *'
    
          const result = await conn.query(sql, [u.user_id,u.status])
          const user = result.rows[0]
    
          conn.release()
    
          return user
        } catch(err) {
          throw new Error(`unable create order : ${err}`)
        } 
      }

    async addProduct(p:order_products): Promise<order_products> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()
    
          const result = await conn
              .query(sql, [p.quantity, p.order_id, p.product_id])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${p.product_id} to order ${p.order_id}: ${err}`)
        }
      }

    
}

