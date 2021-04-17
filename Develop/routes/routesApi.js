const fs = require('fs');
const path = require('path');
const { db } = require('../db');

module.exports = function (app) {
  app.get('/api/notes', (req, res) => {
    db
      .getAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  });

  app.post('/api/notes', (req, res) => {
    db
      .getAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  });

  // app.post('/api/clear', (req, res) => {
  //   Promise.all([tables.clear(), waitingList.clear()])
  //     .then(() => res.json({ ok: true }))
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(500).end();
  //     });
  // });
};
