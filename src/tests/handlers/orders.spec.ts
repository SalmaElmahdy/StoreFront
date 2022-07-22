import supertest from "supertest";
import { orders, OrderStore } from "../../models/orders";
import { product, ProductStore } from "../../models/product";
import { users, UserStore } from "../../models/users";
import app from "../../server";
import {drop_test_data} from "../../utilities/data_test_helper"


const request=supertest(app)
const store=new OrderStore()
const userStore=new UserStore()
const product_store=new ProductStore()

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
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdF9uYW1lIjoiYWhtZWQiLCJsYXN0X25hbWUiOiJBaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJGxmOE9oUnJzMzlrQnZHZzliMnBlQ2VBRWZVbW9wc09RZ1pwUlhNVUYub2RUeUdYeHBvelRxIn0sImlhdCI6MTY1Nzg5NTI3N30.7yqaO28u47BU7LsFbOalG51JftAoNpkdzn7IX_wptfQ"


describe("Check orders Handllers",()=>
{
    it("check add product to order",async()=>{
        await userStore.create(test_user);
        await store.create(test_order);
        await product_store.create(test_product);
        //Act
        const res= await request.post("/add_prod_order").set(
            'Authorization', 'Bearer ' + TOKEN).send({
            "id": 5,
            "quantity": 3,
            "order_id": "1",
            "product_id": "1"
        })
        //Assert
        expect(res.statusCode).toBe(200)
        await drop_test_data();
        

    })
    
    
}
)