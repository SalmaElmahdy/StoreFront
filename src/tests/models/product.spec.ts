import { product,ProductStore } from "../../models/product";
import client from "../../database";
import { drop_test_data } from "../../utilities/data_test_helper";

const store=new ProductStore()
const test_product:product={
    id:1,
    name:"product_test",
    price:200,
    category:"A"
}



describe("ProductStore Model",()=>{
    it("should have an index method",()=>{
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it("index method should return list of products",async ()=>{


        const result=await store.index();
        expect(result).toEqual([]);
    });

    
    it('create method should add a product', async () => {
        const result = await store.create({
          id:1,
          name: "productTest",
          price: 50,
          category:'A'
        });
        expect(result).toEqual({
            id:1,
            name: "productTest",
            price: 50,
            category:'A'
        });
    });
  
    it('show method should return the correct product', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id:1,
            name: "productTest",
            price: 50,
            category:'A'
        });

        await drop_test_data();
        
      });



     
    
      
      
});