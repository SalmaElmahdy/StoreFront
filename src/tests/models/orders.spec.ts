import { OrderStore } from "../../models/orders";
import { UserStore,users } from "../../models/users";
import { ProductStore,product } from "../../models/product";
import { drop_test_data } from "../../utilities/data_test_helper";


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




describe("ordersStore Model",()=>{
    
   
    it("should have an add product method",async()=>{
        expect(store.addProduct).toBeDefined();
        const r1=await userStore.create(test_user);

    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a order', async () => {
        
        const result = await store.create({
                id:1,
                user_id:'1',
                status:'completed'
              });
              
              expect(result).toEqual({
                  id:1,
                  user_id:'1',
                  status:'completed'
              });

    

    });

    it('add product to order', async () => {
        const r1=await product_store.create(test_product);
        const result = await store.addProduct({
            id:1,
            quantity:3,
            order_id:'1',
            product_id:'1'
            });
        
        expect(result).toEqual({
            id:1,
            quantity:3,
            order_id:'1',
            product_id:'1'

        });
        await drop_test_data();

    
    
    });

});

    