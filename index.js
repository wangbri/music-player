const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .get('/cool', (req, res) => res.send(cool()));

// app.get('/times', (req, res) => {
//   let result = ''
//   const times = process.env.TIMES || 5
//   for (i = 0; i < times; i++) {
//     result += i + ' '
//   }
//   res.send(result)
// })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
