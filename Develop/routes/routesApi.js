const fs = require('fs');
const path = require('path');
const { notes } = require('../data');

// This module exports a function which accepts an Express app object and
// and sets up the api routes.
module.exports = function (app) {
  app.get('/api/tables', (req, res) => {
    // read tables data from file
    tables
      .getAll()
      .then((data) => {
        // send table data json in response
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        // send an error response
        return res.status(500).end();
      });
  });

  app.get('/api/waitlist', (req, res) => {
    waitingList
      .getAll()
      .then((data) => {
        // send waiting list data json in response
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        // send an error response
        return res.status(500).end();
      });
  });

  app.post('/api/tables', (req, res) => {
    let isTableReserved = false;
    tables
      .getAll()
      .then((tableData) => {
        // check if table maximum has been reached
        isTableReserved = tableData.length < 5;
        if (isTableReserved) {
          // add to tables and return promise
          return tables.push(req.body);
        }
        // add to waiting list and return promise
        return waitingList.push(req.body);
      })
      .then(() => {
        res.json(isTableReserved);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  });

  // This code isn't part of the assignment. This route was added to easily
  // clear out all the table data to facilitate demonstration. Don"t worry about
  // it!
  app.post('/api/clear', (req, res) => {
    Promise.all([tables.clear(), waitingList.clear()])
      .then(() => res.json({ ok: true }))
      .catch((error) => {
        console.log(error);
        res.status(500).end();
      });
  });
};
