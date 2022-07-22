### instructions for setting up and running the project:
scripts:
for run : npm run start
for test: npm run test_DB

instructions:
1- create user by using create user route
2- take token that generated
3- create product/s by using create product route and add token  in the headers
4- create order using create order route 
5- add product/s to order using add_prod_order route 

# the port used for backend 3000

# port for database default port 5432 and set automatically by database

# Database setup and connection:
## Create User
CREATE USER shopping_user WITH PASSWORD 'password123'
## Create Databases for dev and testing
CREATE DATABASE shopping
CREATE DATABASE shopping_test
## Grant user all PRIVILEGES on both Databases
GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;





