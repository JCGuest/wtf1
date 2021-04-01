const express = require('express');
const app = express();

///////////////////
// const { createProxyMiddleware } = require('http-proxy-middleware');

// app.use(
//   '/routes',
//   createProxyMiddleware({
//     target: 'http://localhost:5000/',
//     changeOrigin: true
//   })
// );
/////////////////
const cors = require('cors');

// app.use(cors({ origin: 'http:localhost:3000' }));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
////////////////

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(express.json());

app.use(
  '/search',
  cors({ origin: 'http://localhost:3000' }),
  require('./routes/search')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
