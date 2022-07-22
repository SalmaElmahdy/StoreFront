import { UserStore } from "../../models/users";
import bcrypt from'bcrypt'
import dotenv from 'dotenv'
import { drop_test_data } from "../../utilities/data_test_helper";


dotenv.config()
const {
    SALT_ROUNDS,
    BCRYPT_PASSWORD
} = process.env 


const store=new UserStore()


describe("UserStore Model",()=>{
    it("should have an index method",()=>{
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });


    it("index method should return list of users",async ()=>{
        const result=await store.index();
        expect(result).toEqual([]);

    });

    it('create method should add a user', async () => {
        const result = await store.create({
          id:1,
          first_name: "first_name_test",
          last_name:"last_name_test",
          password:"password"
        });
        
        expect(result.id).toEqual(1);
        expect(result.first_name).toEqual("first_name_test");
        expect(result.last_name).toEqual("last_name_test");
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("1");
        expect(result.id).toEqual(1);
        expect(result.first_name).toEqual("first_name_test");
        expect(result.last_name).toEqual("last_name_test");

        await drop_test_data();
      });
    

});