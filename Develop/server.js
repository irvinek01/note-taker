const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require('./routes/routesApi')(app);
require('./routes/routesHtml')(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});