'use strict';

const express = require('express');
const router = express.Router();

const Server = require('../server/home');
const { success, error } = require('../utils/home').response;
const PlatzivideoServer = new Server;

router.get('/', async (req, res) => {
  const { section } = req.query;
  const response = await PlatzivideoServer.get(section);
  // console.log(response);
  return success(req, res, 'Home', 200, response);
});

router.get('/:name', async (req, res) => {
  const { section } = req.query;
  const { name } = req.params;
  console.log(name);
  const responseFiltered = await PlatzivideoServer.getOne(section, name, error, req, res);
  return success(req, res, 'Home', 200, responseFiltered);
});

router.post('/', async (req, res) => {
  const { section } = req.query;
  const { name, img } = req.body;
  const response = await PlatzivideoServer.get(section);
  let conditionName;
  let conditionImg;
  if (!name || !section) {
    return error(req, res, 'Home', 400, 'Debe ingresar un nombre');
  }
  response.forEach((properties) => {
    conditionName = properties.name;
    conditionImg = properties.img;
    return {
      properties
    }
  });
  if (conditionName === name) {
    return error(req, res, 'Home', 400, 'Ya existe una película con ese nombre');
  }
  const created = await PlatzivideoServer.create(section, { name, img });
  return success(req, res, 'Home', 201, created);
});

router.put('/:id', async (req, res) => {
  const { section } = req.query;
  const { id } = req.params;
  const { name, img } = req.body;

  const updated = await PlatzivideoServer.update(section, { id, name, img });
  return success(req, res, 'Home', 201, updated);
});

router.delete('/:id', async (req, res) => {
  const { section } = req.query;
  const { id } = req.params;
  const responseFiltered = await PlatzivideoServer.getOne(section, id);
  if (!responseFiltered) {
    return error(req, res, 'Home', 400, 'No existe el elemento');
  }
  const deleted = await PlatzivideoServer.delete(section, id);
  return success(req, res, 'Home', 200, deleted.id, 'Eliminado con éxito el objeto con el id:');
});

module.exports = router;
