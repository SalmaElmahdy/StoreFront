import supertest from "supertest";
import app from "../../server";
import {drop_test_data} from "../../utilities/data_test_helper"


const request=supertest(app)
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmaXJzdF9uYW1lIjoiYWhtZWQiLCJsYXN0X25hbWUiOiJBaG1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJGxmOE9oUnJzMzlrQnZHZzliMnBlQ2VBRWZVbW9wc09RZ1pwUlhNVUYub2RUeUdYeHBvelRxIn0sImlhdCI6MTY1Nzg5NTI3N30.7yqaO28u47BU7LsFbOalG51JftAoNpkdzn7IX_wptfQ"


describe("Check user Handllers",()=>
{
    it("check index users",async()=>{
        //Act
        const res= await request.get("/users").set(
            'Authorization', 'Bearer ' + TOKEN)
        //Assert
        expect(res.statusCode).toBe(200)
        

    })
    

    it("check create user",async()=>{
        
        //Act
        const res= await request.post("/users").send(
                {
                    "id":1,
                    "first_name":"test",
                    "last_name":"test",
                    "password":"test"
                }
            )
        //Assert
        expect(res.statusCode).toBe(200)
        

    })

    it("check show user",async()=>{
        //Act
        const res= await request.get("/products/1")
        //Assert
        expect(res.statusCode).toBe(200)
        await drop_test_data();
       

    })
    
}
)