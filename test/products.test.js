/* eslint-disable no-undef */
import request from 'supertest';

import app from '../src/app';

let stock;

beforeEach(() => {
  stock = [{
    brand: "jotaPê",
    buyPrice: 12,
    model: "Tinto Seco"
  },{
    brand: "San Martin",
    buyPrice: 14,
    model: "Suave"
  }
  ]
});

test('Deve ser possível adicionar um novo produto', async () => {
  const response = await request(app)
    .post('/stock')
    .send(stock[0]);

    expect(response.body).toMatchObject({
      ...stock[0]})
});

test('O status code de um produto devera ser 201', async()=>{
  const response = await request(app)
  .post('/stock')
  .send(stock[0]);

  expect(201)
})

test('Deve ser possível atualizar dados de um produto', async () => {
  const response = await request(app)
    .post('/stock')
    .send(stock[0]);

  const updateProduct = {
    ...stock[0],
    brand: 'Sangue de Boi',
  };
  
  const responseUpdate = await request(app)
    .put(`/stock/${response.body.id}`)
    .send(updateProduct);

  expect(responseUpdate.body).toMatchObject(updateProduct);
});


test('Não deve ser possível atualizar um produto inexistente', async () => {
  await request(app)
    .put('/stock/9198123')
    .expect(400);
});


test('Não deve ser possível remover um produto inexistente', async () => {
  await request(app)
    .delete('/stock/9198123')
    .expect(400);
});

