const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
        version: "0.1.0",
        description:
          "This is a CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "u-tad",
          url: "https://u-tad.com",
          email: "ricardo.palacios@u-tad.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
              userRegister: {
                type: "object",
                required: ["name", "age", "email", "password","oferts","city","Interest"],
                properties: {
                    name: {
                        type: "string",
                        example: "Menganito"
                    },
                    age: {
                        type: "integer",
                        example: 20
                    },
                    email: {
                        type: "string",
                        example: "swaggerprueba@google.com"
                    },
                    password: {
                        type: "string",
                        example: "swaggerCont"
                    },
                    oferts: {
                      type: "boolean",
                      example: true
                    },
                    city:{
                      type: "string",
                      example: "madird"
                    },
                    Interest:{
                      type: "string",
                      example: "coche"
                    },
                },
            },
            Userlogin: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    example: "admins8@test.com"
                  },
                password: {
                    type: "string",
                    example: "HolsaMundo.01"
                  },
                }
            },
            UserUpdate: {
              type: "object",
              required: ["name", "age"],
              properties: {
                name: {
                  type: "string",
                  example:"pablo"
                },
                age: {
                  type: "integer",
                  example: 20
                },
              }
          },
        CommerceRegister: {
          type: "object",
          required: ["name", "cif", "addres", "email","phone"],
          properties: {
              name: {
                  type: "string",
                  example: "PruebaComemrcioSwagger"
              },
              cif: {
                  type: "string",
                  example: "B12345678"
              },
              address: {
                  type: "string",
                  example: "Las Rozas"
              },
              email: {
                  type: "string",
                  example: "swaggerComercio@gmial.com",
              },
              phone: {
                type: "string",
                example: "931232424"
              },
          },
        },
        CommerceUpdate: {
          type: "object",
          required: ["name", "cif", "addres", "email","phone"],
          properties: {
              name: {
                  type: "string",
                  example: "SwaggerUpdatedName"
              },
              cif: {
                  type: "string",
                  example: "B12345678"
              },
              address: {
                  type: "string",
                  example:"Majadahonda"
              },
              email: {
                  type: "string",
                  example: "asd@gmial.com",
              },
              phone: {
                type: "string",
                example:"913214324"
              },
          },
        },
        deleteCommerce: {
          type: "object",
          required: ["cif"],
          properties: {
            cif: {
              type: "string",
              example: "B12345678"
            },
          }
        },
        registerActivityOfMyCommerce: {
          type: "object",
          required: ["city", "activity", "title", "summary"],
          properties: {
              city: {
                  type: "string",
                  example: "Madrid"
              },
              activity: {
                  type: "string",
                  example: "Tencnologia"
              },
              title: {
                  type: "string",
              },
              summary: {
                  type: "string",
              },
          },
        },
        uploadTextOnMyActivity: {
          type: "object",
          required: ["text"],
          properties: {
            text: {
              type: "string",
            },
          }
        },
        ReviewUser: {
          type: "object",
          required: ["review","score"],
          properties: {
            review: {
              type: "string",
            },
            score: {
              type: "integer",
            },
          }
        },
        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)