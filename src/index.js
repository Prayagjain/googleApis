const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json());

app.use(require('./routes/routes'));

app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});