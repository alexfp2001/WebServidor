const request = require('supertest');
const app = require('../app'); // Importa la instancia de la aplicación de Express

describe('API Auth Endpoints', () => {
    let userToken = '';
    
    test('should register a user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Marco',
                age: 20,
                email: 'marco12@gmail.com',
                password: 'marquitos21',
                oferts: true,
                city: 'madrid',
                Interest: 'tecnologia'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toEqual('marco12@gmail.com')
    });

    test('should log in a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'marco12@gmail.com',
                password: 'marquitos21'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toEqual('marco12@gmail.com')
        userToken = res.body.token;
    });

    test('should update a user', async () => {
        const res = await request(app)
            .put('/api/auth/update')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                name: 'PabloCambio',
                age: 21
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual('marco12@gmail.com')
    });

    test('should delete a user', async () => {
        const res = await request(app)
            .delete('/api/auth/delete')
            .set('Authorization', `Bearer ${userToken}`);
        expect(res.statusCode).toEqual(200);
    });
});


const axios = require('axios');
const BASE_URL = 'http://localhost:3000/api';
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM1NTFlOTMwNzg5MjcyOGU0ZTUxMDYiLCJyb2xlIjpbImFkbWluIl0sImlhdCI6MTY4MTkwNTY5OSwiZXhwIjoyMDQxOTAyMDk5fQ.qcCll7XmXIOmXXKhaODePPOPeDF-jv60fCkb14zTmuY";
//const USER_TOKEN = generateToken('user');

describe('Comercio API', () => {
  let createdCommerceId = null;

  test('Registrar comercio', async () => {
    const response = await axios.post(`${BASE_URL}/commerce/register`, {
      name: 'PruebaComercio',
      cif: 'B13918572',
      address: 'Madrid, las Rozas',
      email: 'prueba@gmail.com',
      phone: '91245454365',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('commerce');
    expect(response.data.commerce.email).toEqual('prueba@gmail.com')
    createdCommerceId = response.data.commerce._id;
  });

  test('Actualizar comercio', async () => {
    const response = await axios.put(`${BASE_URL}/commerce/updateCommerce/${createdCommerceId}`, {
      name: 'PrubeaCambiadaNombre',
      cif: 'B13918572',
      address: 'LAs rozas cambiado',
      email: 'mailcambiado@gmail.com',
      phone: '112312323',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
      },
    });
    
    expect(response.data.email).toEqual('mailcambiado@gmail.com')
    expect(response.status).toBe(200);
  });

  test('Eliminar comercio', async () => {
    const response = await axios.delete(`${BASE_URL}/commerce/deleteCommerce`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
      },
      data: {
        cif: 'B13918572',
      },
    });

    expect(response.status).toBe(200);
  });

  // Aquí puedes continuar agregando las pruebas para los demás endpoints.
});


describe('API Commerce Activity Endpoints', () => {
    let authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM1NTFlOTMwNzg5MjcyOGU0ZTUxMDYiLCJyb2xlIjpbImFkbWluIl0sImlhdCI6MTY4MTkwOTczMiwiZXhwIjoyMDQxOTA2MTMyfQ.wVwdDK45FxvL9sl8i46aRhJuLX6huHZoAmAmwFBYup4';
    let authTokenCommerce="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZDNkMmFjYTIzYzFiZTM3YWY5NjciLCJpYXQiOjE2ODEzMTQ3NzAsImV4cCI6MjA0MTMxMTE3MH0.DqB0wiWYWMxhLP1qKwd7IXLgMZx75n38b3TbjUYbpbE";


    test('should get activitys', async () => {
        const res = await request(app).get('/api/commerce/getActivitys');
        expect(res.statusCode).toEqual(200);
        //expect(res.data[0]._id).toEqual('6436d3d2aca23c1be37af967');
    });

    test('should get activitys ordered by scoring', async () => {
        const res = await request(app).get('/api/commerce/getActivitys?scoring=true');
        expect(res.statusCode).toEqual(200);

    });

    test('should get activity by id', async () => {
        const res = await request(app).get('/api/commerce/getActivitys/64384de9f79ec0d35b63fba2');
        expect(res.statusCode).toEqual(200);
        const obj= JSON.parse(res.text);
        expect(obj._id).toEqual("64384de9f79ec0d35b63fba2");
        //expect(res.text).toHaveProperty("_id\");
        //expect(res.text._id).toEqual('64384de9f79ec0d35b63fba2');
       
    });

    test('should create the activity main data', async () => {
      const res = await request(app)
          .patch('/api/commerce/register/mainData')
          .set('Authorization', `Bearer ${authTokenCommerce}`)
          .send({
              city: 'madrid',
              activity: 'tecnologia',
              title: 'Venta de moviles',
              summary: 'vendemos los mejores productos'
          });
      expect(res.statusCode).toEqual(200);
      //expect(res.data.title).toEqual("Venta de moviles")
    
  });

    test('should get activitys by city', async () => {
        const res = await request(app).get('/api/commerce/getActivitysFiltered/madrid');
        expect(res.statusCode).toEqual(200);
      
    });

    test('should get activitys by city and activity', async () => {
        const res = await request(app).get('/api/commerce/getActivitysFiltered/madrid/tecnologia');
        expect(res.statusCode).toEqual(200);
        
    });

    test('should get commerce by id', async () => {
        const res = await request(app)
            .get('/api/commerce/getCommerce/6439436af25f8a08eb101e4e')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toEqual(200);
        const obj= JSON.parse(res.text);
        expect(obj._id).toEqual("6439436af25f8a08eb101e4e");
    });

  

    /**test('commerce upload photo', async () => {
        const res = await request(app)
          .post('/api/commerce/register/addPhoto')
          .set('Authorization', `Bearer ${authTokenCommerce}`)
          .attach('image', './image.jpg');
  
        expect(res.statusCode).toEqual(200);
      });**/

 

    test('should add text to activity', async () => {
        const res = await request(app)
            .post('/api/commerce/register/addText')
            .set('Authorization', `Bearer ${authTokenCommerce}`)
            .send({
                text: 'texto de prueba 2 para ver que esta bien'
            });
        expect(res.statusCode).toEqual(200);
       // expect(res.data).toHaveProperty(commerce)
        
    });

    test('should get users from the city of the activity', async () => {
        const res = await request(app)
            .get('/api/commerce/getUsersFromMyCity')
            .set('Authorization', `Bearer ${authTokenCommerce}`);
        expect(res.statusCode).toEqual(200);

   
    });

   

      test('hacer review en una actividad', async () => {
        const res = await request(app)
          .post('/api/commerce/rate/B12421267')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ review: 'Prueba de review de JEST', score: 5 });
  
        expect(res.statusCode).toEqual(200);
        const obj= JSON.parse(res.text);
        expect(obj._id).toEqual("6439436af25f8a08eb101e4e");
      });
      test('should delete the activity', async () => {
        const res = await request(app)
            .delete('/api/commerce/register/mainData')
            .set('Authorization', `Bearer ${authTokenCommerce}`);
        expect(res.statusCode).toEqual(200);
    });
});



// A continuación, sigue con las pruebas para los endpoints de comercios.
// Sería similar a lo que hemos hecho para los endpoints de autenticación,
// pero adaptándolo a las peticiones de comercio.


