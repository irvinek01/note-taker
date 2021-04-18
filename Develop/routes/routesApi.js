const { noteList } = require('../db');
var uniqueId = Math.floor(Math.random() * 99) * Math.floor(Math.random() * 20);

module.exports = function (app) {
  app.get('/api/notes', (req, res) => {
    noteList
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
    let obj = req.body;
    obj.id = uniqueId;
    noteList
      .getAll()
      .then(() => {
        noteList.push(obj);
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).end();
      });
  });

  app.delete("/api/notes/:id", (req, res) => {
    noteList
      .getAll()
      .then(notesObj => {
        for (var i = 0; i < notesObj.length; i++) {
          if (notesObj[i].id == req.params.id) {
            notesObj.splice(i, 1);
          }
        }
        noteList.write(notesObj);
      })
      .then(response => res.json(response))
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      });
  });

};
