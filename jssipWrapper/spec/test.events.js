var EventEmitter = require('events')

var ee = new EventEmitter()
ee.on('message', function(text) {
    console.log(text)
})
ee.emit('message', 'hello world')
console.log('I have sent the message')

function foo() {
    //return
    return {
        bar: 'foobar'
    }
}

let bar = foo()
console.log(bar)
console.log(bar.bar)

let bar2 = (function foo() {
    return
    {
        bar: 'foobar'
    }
})()

console.log(bar2) // undefined!

var a = 0,
    b = 1,
    c = 2

a = b
++c
console.log(`a = ${a} and c = ${c}`)

a = b + c
console.log(`a = ${a} and c = ${c}`)
