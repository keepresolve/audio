var EventEmitter = require('events')
 
var ee = new EventEmitter()
ee.on('message', function (text) {
  console.log(text)
})
ee.emit('message', 'hello world')
console.log('I have sent the message')