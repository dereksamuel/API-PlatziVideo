'use strict';

const { getAll, createOne, getOneObject, updateOne, deleteOne } = require('../fixture/home.js');

const handleErrror = (error) => {
  console.error(error);
}

module.exports = class Server {
  get(section) {
    return getAll(section).then((data) => data).catch(handleErrror);
  }
  getOne(section, name, error, req, res) {
    return getOneObject(section, name).then((data) => data).catch((err => error(req, res, 'Home', 400, err)));
  }
  create(section, { name, img }) {
    return createOne(section, { name, img }).then((info) => info).catch(handleErrror);
  }
  update(section, { id, name, img }) {
    return updateOne(section, { id, name, img }).then((info) => info).catch(handleErrror);
  }
  delete(section, id) {
    return deleteOne(section, id).then((info) => info).catch(handleErrror);
  }
}
