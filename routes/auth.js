const express = require("express")
const { registerCtrl, loginCtrl,updateUser, deleteUser} = require("../controllers/auth")
const {validatorRegister, validatorLogin} = require("../validators/auth")
const {authMiddleware} = require("../middleware/session")
const router = express.Router()

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - User
 *      summary: User login
 *      description: user login
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/userRegister"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/register", validatorRegister, registerCtrl)

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - User
 *      summary: User login
 *      description: login user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Userlogin"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/login", validatorLogin, loginCtrl) 

/**
 * @openapi
 * /api/auth/update:
 *  put:
 *      tags:
 *      - User
 *      summary: User register
 *      description: update the data of the user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/UserUpdate"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/update",authMiddleware,updateUser)

/**
 * @openapi
 * /api/auth/delete:
 *  delete:
 *      tags:
 *      - User
 *      summary: Delete user
 *      description: Delete a user by his self
 *    
 *      responses:
 *          '200':
 *              description: Returns the status
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/delete",authMiddleware,deleteUser)//como le indicamos


module.exports = router
