import supertest from "supertest";
import app from "../../server";
import {drop_test_data} from "../../utilities/data_test_helper"


const request=supertest(app)
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdF9uYW1lIjoiYWhtZWQiLCJsYXN0X25hbWUiOiJBaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJGxmOE9oUnJzMzlrQnZHZzliMnBlQ2VBRWZVbW9wc09RZ1pwUlhNVUYub2RUeUdYeHBvelRxIn0sImlhdCI6MTY1Nzg5NTI3N30.7yqaO28u47BU7LsFbOalG51JftAoNpkdzn7IX_wptfQ"


describe("Check Product Handllers",()=>
{
    it("check index product",async()=>{
        //Act
        const res= await request.get("/products")
        //Assert
        expect(res.statusCode).toBe(200)
        

    })
    it("check show product",async()=>{
        //Act
        const res= await request.get("/products/1")
        //Assert
        expect(res.statusCode).toBe(200)
       

    })

    it("check create product",async()=>{
        
        //Act
        const res= await request.post("/products").set(
            'Authorization', 'Bearer ' + TOKEN).send(
                {
                    "name": "test",
                    "price":300,
                    "category":"test"
                }
            )
        //Assert
        expect(res.statusCode).toBe(200)
        await drop_test_data();

       
        

    })
    
}
)