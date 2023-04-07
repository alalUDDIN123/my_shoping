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

### Account Registration and Access
  - `Registration`
     - Required format
     - `API`: http://localhost:8080/api/users/register
     - `method` : POST 
      ```  
       "name": "",
       "email": "", email should validate in Regex form that is after @.(com|net|org|edu|gov|mil|info|biz)
       "password": "", min length 6, one UPPERCASE and one lowercase letter should have, should also need to have at least one digit and special character (@,#,%,&,^,(,),/?)
       "mobile": type number and length stricly 10
       "role": if role && ["user", "admin", "superAdmin"] then any of these only
      ```
  - `login`
     - Required format
     - `API`: http://localhost:8080/api/users/login
      - `method` : POST 
     ```
      "email": "",
      "password": ""
     ```  
  - `Change password`  
     - Required format
     - `API`: http://localhost:8080/api/users/change/password
     - `method` : POST 
     ```
     "email":"", registered email
     "password":"", old password
     "newPassword":"" new password

  - `forget password`  
     - Required format
     - `API`: http://localhost:8080/api/users/forget/password
     - `method` : POST 
     ```
     "email":"", registered email
     "checkMail":""
     ```  
  - `reset forget password`
      - Required format
      - `API`: http://localhost:8080/api/users/reset_password?token=783456df4bcdf5bbb2d08c2ac43d3ffac773c2c2
      - `method` : POST 
      ```
       "first-received-token" : should have validate
       "newPassword": should validate as like register password
      ```

#### Products
  - `get` : http://localhost:8080/api/products/get
  - `get/single` : http://localhost:8080/api/products/get/:id
  - `addReview`:
      - `Required format`
      - `API` : http://localhost:8080/api/products/review
      - `method` : POST 
      ```
      login: true
      rating : required and must be number in between 1 to 5
      comment: required and letters can not exceed 500
      ```
   - `getAllReviews`:
       - `Required format`
       - `API` : http://localhost:8080/api/products/reviews
        - `method` : GET
       ```
       productId: required
       ```
   - `getSingleReviews`:
       - `Required format`
       - `API` : http://localhost:8080/api/products/review/:reviwedId
        - `method` : GET
       ```
       productId: required
       ```    


---
### admin
 - `Add` : http://localhost:8080/api/products/add  
     - `Required format`
     - `method` : POST 
     ```
       {
        "title": ,
        "description": ",
        "image": "",
        "images": [
           img1,
           img2
        ],
        "originalPrice": (type number),
        "discountPrice":  (type number),,
        "category": ",
        "brand": "",
        "ratings":  (type number),,
        "Stock":  (type number and in and range 5) ,
    }
     ```
 - `update` : http://localhost:8080/api/products/update
     - `Required format`
     - `method` : patch 
     ```
     if request body contain any of these : images, originalPrice, discountPrice, ratings, Stock then ⏬

     images:[img1]
     originalPrice: type number minimum 1
     discountPrice: type number minimum 1
     ratings: type number range (1-5)
     Stock:type number range (1-5)
     ```
- `delete` : http://localhost:8080/api/products/delete   
    - `Required format`
    - `method` : delete
      - "product_id":  ""

---
### SuperAdmin
   - `getAlluser`: http://localhost:8080/api/users/get
   - `method` : get

   - `getSingleUser` : http://localhost:8080/api/users/SuperAdmin/get/single
       - `Required format`
       - `method` : get
          - user_id : ""

   - `addUser` : http://localhost:8080/api/users/superAdmin/register
      - `Required format`
      - `method` : POST 
        - As same as `registration`

   - `updateUser` : http://localhost:8080/api/users/superAdmin/update
      - `Required format`
      - `method` : patch
          - ` "update_user_id":"",` 
          - `key-name` : "value"

   - `removeUser` : http://localhost:8080/api/users//SuperAdmin/remove
      - `Required format`
      - `method` : delete
         - ` "remove_user_id":"64231ac871ddf2f4e9c25edb",` 

   - `AllOrders`:-
       - api : http://localhost:8080/api/order/get/all 
       - `method` : get   

   - `updateOrderStatus` :
       - `Required format`
       - `method` : patch
       - api : `http://localhost:8080/api/order/updateStatus`
       ```
        "orderId":"642a61e58a6d40527b17c469",
        "newOrderStatus": ""
       ```     
       - `value should includes` : "pending", "packed", "dispatch", "cancelled","delivered"
       - `already exits status` :  can not `newOrderStatus`   
       - `can't update` : when status `delivered`  

   - `total delivered count/toalAmount`  
      - api : http://localhost:8080/api/order/deiveredCount
      - `method` : get  
   - `deleteReview`
       - `Required format`
       - `API` : http://localhost:8080/api/products/review/remove
       - `method` : delete
       ```
      "productId":required
      "reviewId":required
       ```   
