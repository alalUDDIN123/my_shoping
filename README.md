## Categories 
1. `Electronics`
2. `accessories`
3. `clothing`

## Brands  
- Inside : `Electronics`
   - `Apple`
   - `ideaPad`

- Inside : `accessories`
   - `aldo`
   - `supcase`  

- Inside : `clothing`
   - `gopgan`
   - `adidas`     



## All API

#### Products
  - `Add` : http://localhost:8080/api/products/add (`admin only`)
  - `get` : http://localhost:8080/api/products/get
  - `get` : http://localhost:8080/api/products/get/:id

### SuperAdmin
   - `getAlluser`: http://localhost:8080/api/users/get
   - `getSingleUser` : http://localhost:8080/api/users/SuperAdmin/get/single
       - pass id like this in the body ==> user_id : `64231ac871ddf2f4e9c25edb`
   - `addUser` : http://localhost:8080/api/users/superAdmin/register
   - `updateUser` : http://localhost:8080/api/users/superAdmin/update
       - Note : To whom you are going update his user id pass like below
       
           - ` "update_user_id":"64231ac871ddf2f4e9c25edb",`    
   - `removeUser` : http://localhost:8080/api/users//SuperAdmin/remove
       - Note : To whom you are going remove/delete his user id pass like below
       
           - ` "remove_user_id":"64231ac871ddf2f4e9c25edb",`          
