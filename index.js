const path = require('path');
const express = require('express');

const port = process.env.PORT || 4200;

const app = express();

const distDir = path.join(__dirname, 'dist', 'tour-of-heroes');

app.use(express.static(distDir));

app.use('*', (_req, res) => res.status(200).sendFile(path.join(distDir, 'index.html')));

app.listen(port, () => console.log(`Server is up on port ${port}.`));
