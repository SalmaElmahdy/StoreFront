import Client from '../database'

export class DashboardQueries {
  // Get all products that have been included in orders
  async current_order_by_user(user_id:string): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect()
      const sql = `select * from product inner join order_products on order_products.product_id=product.id where order_products.order_id=(select id from orders where user_id=${user_id} and status='active')`

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }
}