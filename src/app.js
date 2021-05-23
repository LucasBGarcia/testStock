/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

let stock = [];

app.get('/stock', (request, response) => {
  response.json(stock);
});

app.post('/stock', (request, response) => {
  // TODO: Desenvolver registro no array stock
  const {
    code, brand, buyPrice, model
  } = request.body;
  const p = stock.find((v) => v.code == code);
    const product = {
      id: uuid(),
      brand,
      buyPrice,
      model,
};
stock.push(product);
response.status(201).json(product);
});

app.put('/stock/:id', (request, response) => {
  // TODO: Desenvolver atualização de produto por ID
  const { id } = request.params;

  const {
    brand, buyPrice, model,
  } = request.body;

  const p = stock.find((v) => v.id == id);

  if (p) {
    p.brand = brand;
    p.buyPrice = buyPrice;
    p.model = model;

    response.json(p);
  } else {
    response.status(400).send();
  }
});

app.delete('/stock/:code', (request, response) => {
  const { code } = request.params;
  const index = stock.findIndex((v) => v.code == code);

  if (index == -1) {
    response.status(400).send();
  } else {
    stock = stock.filter((v) => v.code != code);
    response.status(204).send();
  }
});

export default app;
