'use strict';

module.exports = {
  response: {
    success(req, res, Site, state, data, messageOptional) {
      switch (req.method) {
        case 'GET':
          return res.status(state).send(data);
        case 'POST':
          return res.status(state).send(data);
        case 'PUT':
          return res.status(state).send(data);
        case 'DELETE':
          return res.status(state).send(`${messageOptional} ${data}`);
        default:
          break;
      }
    },
    error(req, res, Site, state, message) {
      switch (state) {
        case 400:
          console.log(message);
          return res.status(state).send('Mala implementación 👎');
        case 500: 
          console.log(message);
          return res.status(state).send('Error en el servidor 👎');
        default:
          return res.send('Error en el servidor');
      }
    }
  }
}