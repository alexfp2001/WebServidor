const express = require("express")
const { registerCtrl,registerActivity, getCommerces,getCommerce,addText,uploadImage,rateCommerce,deleteCommerce,updateCommerce,deleteActivity,getUsersFromMyCity,getActivity,getActivityByCity,getActivityByCityAndActivity} = require("../controllers/commerce")
const {validatorRegister,validatorRegister2,validatorText,validatorReview,validatorCIF,validatorGetItem} = require("../validators/commerce")
const {authMiddleware2, authMiddleware} = require("../middleware/session")
const checkRol = require("../middleware/rol")
const uploadMiddleware=require("../utils/handleStorage")
const router = express.Router()

/**
 * @openapi
 * /api/commerce/register:
 *  post:
 *      tags:
 *      - Commerce
 *      summary: commerce creation
 *      description: commerce creation
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CommerceRegister"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/register",authMiddleware,checkRol(["admin"]), validatorRegister,registerCtrl)

/**
 * @openapi
 * /api/commerce/getActivitys:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get activitys in the System
 *      description: Get activitys in the System
 *      
 *      responses:
 *          '200':
 *              description: Returns the Activitys
 *          '500':
 *              description: Server error
 */  
router.get("/getActivitys", getCommerces)

/**
 * @openapi
 * /api/commerce/getActivitysFiltered/{city}:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get activitys by the city
 *      description: ''
 * 
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: city for filter de request
 *              required: true
 *              schema:
 *                  type: string
 *      
 *      responses:
 *          '200':
 *              description: Returns the Activitys
 *          '500':
 *              description: Server error
 */
router.get("/getActivitysFiltered/:city",getActivityByCity);

/**
 * @openapi
 * /api/commerce/getActivitysFiltered/{city}/{activity}:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get activitys by the city and the type of activity
 *      description: ''
 * 
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: city for filter de request
 *              required: true
 *              schema:
 *                  type: string
 *          -   name: activity
 *              in: path
 *              description: activity for filter de request
 *              required: true
 *              schema:
 *                  type: string
 *      
 *      responses:
 *          '200':
 *              description: Returns the Activitys
 *          '500':
 *              description: Server error
 */
router.get("/getActivitysFiltered/:city/:activity",getActivityByCityAndActivity);

/**
 * @openapi
 * /api/commerce/getActivitys/{id}:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get activitys by the id
 *      description: ''
 * 
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id for filter de request
 *              required: true
 *              schema:
 *                  type: string
 *      
 *      responses:
 *          '200':
 *              description: Returns the Activitys filtered
 *          '500':
 *              description: Server error
 */
router.get("/getActivitys/:id",validatorGetItem, getActivity)

/**
 * @openapi
 * /api/commerce/getCommerce/{id}:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get commerce by the id
 *      description: ''
 * 
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id for filter de request
 *              required: true
 *              schema:
 *                  type: string
 *      
 *      responses:
 *          '200':
 *              description: Returns the Activitys filtered
 *          '500':
 *              description: Server error
 *       security:
 *          - bearerAuth: []
 */
router.get("/getCommerce/:id",authMiddleware,checkRol(["admin"]),validatorGetItem, getCommerce)

/**
 * @openapi
 * /api/commerce/getUsersFromMyCity:
 *  get:
 *      tags:
 *      - Commerce
 *      summary: Get activitys of the city of the activity that want offers
 *      description: ''
 * 
 *     
 *      responses:
 *          '200':
 *              description: Returns the Activitys filtered
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/getUsersFromMyCity",authMiddleware2,getUsersFromMyCity);

/**
 * @openapi
 * /api/commerce/register/mainData:
 *  patch:
 *      tags:
 *      - Commerce
 *      summary: register the activity of your commerce
 *      description: register the activity of your commerce
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/registerActivityOfMyCommerce"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/register/mainData",authMiddleware2, validatorRegister2,registerActivity);

/**
 * @openapi
 * /api/commerce/register/mainData:
 *  delete:
 *      tags:
 *      - Commerce
 *      summary: delete the activity of your commerce
 *      description: ''
 * 
 *      responses:
 *          '200':
 *              description: Returns the Activitys filtered
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/register/mainData",authMiddleware2,deleteActivity);

/**
 * @openapi
 * /api/commerce/register/addText:
 *  post:
 *      tags:
 *      - Commerce
 *      summary: addText into your activity
 *      description: addText into your activity
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/uploadTextOnMyActivity"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/register/addText",authMiddleware2,validatorText,addText);

router.post("/register/addPhoto",authMiddleware2,uploadMiddleware.single("image"),uploadImage);

/**
 * @openapi
 * /api/commerce/rate/{cif}:
 *  post:
 *      tags:
 *      - Commerce
 *      summary: rate an activity
 *      description: rate activity
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/ReviewUser"
 *      parameters:
 *          -   name: cif
 *              in: path
 *              description: cif of the commerce of the review
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.post("/rate/:cif",authMiddleware,validatorReview,rateCommerce);

/**
 * @openapi
 * /api/commerce/deleteCommerce:
 *  delete:
 *      tags:
 *      - Commerce
 *      summary: Delete commerce by an admin
 *      description: Delete commerce by an admin
 * 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/deleteCommerce"    
 *      responses:
 *          '200':
 *              description: Returns the status
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/deleteCommerce",authMiddleware,checkRol(["admin"]),validatorCIF,deleteCommerce)


/**
 * @openapi
 * /api/commerce/updateCommerce/{id}:
 *  put:
 *      tags:
 *      - Commerce
 *      summary: update information of the commerce by an admin
 *      description: update information of the commerce by an admin
 * 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CommerceUpdate"
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id for the update the commerce
 *              required: true
 *              schema:
 *                  type: string    
 *      responses:
 *          '200':
 *              description: Returns the status
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/updateCommerce/:id",authMiddleware,checkRol(["admin"]), validatorGetItem,validatorRegister,updateCommerce)



module.exports = router