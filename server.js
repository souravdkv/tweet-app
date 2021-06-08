const express = require('express');

var compression = require('compression')

const app = express();

app.use(compression())



app.use(express.static('./dist/tweet-app'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/tweet-app'})
})

app.get('/events', function (req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
   
    
    var timer = setInterval(function () {
      res.write('data: ping\n\n')
   
     
      res.flush()
    }, 2000)
   
    res.on('close', function () {
      clearInterval(timer)
    })
  })

app.listen(process.env.PORT || 8080);