import client from "../database";
import bcrypt from'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const {
    SALT_ROUNDS,
    BCRYPT_PASSWORD
} = process.env 

export type users={
    id:Number;
    first_name:string;
    last_name:string;
    password:string;
}

export class UserStore{
    async index():Promise<users[]>{
        try{
            const conn=await client.connect();
            const sql='SELECT * FROM users';
            const result= await conn.query(sql);
            conn.release();
            return result.rows;

        }catch(err)
        {
            throw new Error(`can not get users: ${err}`);

        }
        
    }
    async create(u: users): Promise<users> {
        try {
          // @ts-ignore
          const conn = await client.connect()
          const sql = 'INSERT INTO users ( first_name , last_name , password ) VALUES( $1 , $2 , $3 ) RETURNING *'
    
          const hash = bcrypt.hashSync(
            u.password + BCRYPT_PASSWORD, 
            parseInt(SALT_ROUNDS as string)
         );
    
          const result = await conn.query(sql, [u.first_name,u.last_name, hash])
          const user = result.rows[0]
    
          conn.release()
    
          return user
        } catch(err) {
            console.log("wrong create user in models:::"+err);

          throw new Error(`unable create user (${u.first_name}): ${err}`)

          
        } 
      }

      async show(id:string): Promise<users> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot get user ${error}`);
        }
    }

      async Authentication(first_name:string, password:string):Promise<users|null>{
        const conn= client.connect();
        const sql="SELECT password FROM users WHERE first_name=($1)";
        const result=await (await conn).query(sql,[first_name]);

        if(result.rows.length){
            const user=result.rows[0];
            if(await bcrypt.compare(password+BCRYPT_PASSWORD,user.password))
            {
                return user; 
            }
        }

        return null;

      }
}