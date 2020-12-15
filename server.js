const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.set("view engine", "ejs");
// app.use(session({ cookie: { maxAge: 60000 }}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'blabla',
  cookie: {
    secure: false,
    maxAge: 2160000000,
    httpOnly: false
  },
  jwt: '',
  role: 'AnDanh',
}));
//Routing
app.use(require('./routes/index'));
app.use('/Authentication', require('./routes/Authentication'));
app.use('/BSQuanLy', require('./routes/BSQuanLy'));

app.listen(config.port, () =>
{
  console.log(`SERVER RUNNING AT PORT ${config.port}...`)
})



