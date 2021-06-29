('use strict');

const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);


describe('Server Test Group', ()=>{
  it('Handles bad route', async ()=>{
    const response = await request.get('/else');
    expect(response.status).toEqual(404);
  });

  it('Handles bad method', async ()=>{
    const response = await request.delete('/person?name=alaa');
    expect(response.status).toEqual(404);
  });

  it('Handles no name in query string', async ()=>{
    const response = await request.get('/person?name= ');
    expect(response.status).toEqual(500);
  });
  it('Handles correct name in query string', async ()=>{
    const response = await request.get('/person?name=alaa');
    expect(response.status).toEqual(200);
  });


  it('Handles the name given in the query string, the output object is correct', async ()=>{
    const response = await request.get('/person?name=amjad');
    expect(response.body).toEqual({ name: 'amjad' });
  });
});