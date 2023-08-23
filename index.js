const express = require('express');
const app = express();
const PORT = 4252;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
