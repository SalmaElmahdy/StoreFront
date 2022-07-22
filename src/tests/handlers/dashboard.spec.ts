import supertest from "supertest";
import { orders, OrderStore, order_products } from "../../models/orders";
import { product, ProductStore } from "../../models/product";
import { users, UserStore } from "../../models/users";
import app from "../../server";
import {drop_test_data} from "../../utilities/data_test_helper"


const request=supertest(app)
const store=new OrderStore()
const userStore=new UserStore()
const product_store=new ProductStore()
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdF9uYW1lIjoiYWhtZWQiLCJsYXN0X25hbWUiOiJBaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJGxmOE9oUnJzMzlrQnZHZzliMnBlQ2VBRWZVbW9wc09RZ1pwUlhNVUYub2RUeUdYeHBvelRxIn0sImlhdCI6MTY1Nzg5NTI3N30.7yqaO28u47BU7LsFbOalG51JftAoNpkdzn7IX_wptfQ"


const test_user:users={
    id:1,
    first_name:"test_user",
    last_name:"test_user",
    password:"password"
}

const test_product:product={
    id:1,
    name:"product_test",
    price:200,
    category:"A"
}

const test_order:orders={
    id:1,
    user_id:"1",
    status:"test"

}

const test_order_product:order_products={
    id:1,
    quantity:3,
    order_id:'1',
    product_id:'1'
}

describe("Check dashboard Handllers",()=>
{
    it("check list products in order for user",async()=>{
        await userStore.create(test_user);
        await store.create(test_order);
        await product_store.create(test_product);
        await store.addProduct(test_order_product);
        //Act
        const res= await request.get("/products_in_orders/1").set(
            'Authorization', 'Bearer ' + TOKEN)
        //Assert
        expect(res.statusCode).toBe(200)
        await drop_test_data();
        

    })
    
    
}
)