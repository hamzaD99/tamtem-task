const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const lumie = require("lumie");
const path = require("path");
const permissions = require('./permissions');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(express.urlencoded({ extended: false }))

lumie.load(app, {
  preURL: '',
  verbose: true,
  ignore: ['*.spec', '*.action', 'helper'],
  permissions,
  controllers_path: path.join(__dirname, 'controllers')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
