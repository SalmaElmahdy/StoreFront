
import client from "../database"
export async function  drop_test_data():Promise<void>{
    try{

    const conn=await client.connect();
    
    await conn.query('delete from order_products');
    await conn.query('delete from product');
    await conn.query('delete from orders');
    await conn.query('delete from users');
    await conn.query('ALTER SEQUENCE product_id_seq RESTART 1');
    await conn.query('ALTER SEQUENCE orders_id_seq RESTART 1');
    await conn.query('ALTER SEQUENCE users_id_seq RESTART 1');
    await conn.query('ALTER SEQUENCE order_products_id_seq RESTART 1');

    conn.release();

    }catch(err)
    {
        console.log("there something error at orders.spec.ts::"+err);

    }
    
}
